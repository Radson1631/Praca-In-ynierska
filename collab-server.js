/* eslint-disable no-console */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const childProcess = require("child_process");
const { WebSocketServer } = require("ws");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8787);
const ROOT_DIR = process.cwd();

const MIME_TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
};

const rooms = new Map();

const sanitizeRoom = value => {
	const room = String(value || "default").trim().slice(0, 80);
	return room || "default";
};

const sendJson = (ws, payload) => {
	if (!ws || ws.readyState !== 1) return;
	ws.send(JSON.stringify(payload));
};

const roomSet = room => {
	if (!rooms.has(room)) rooms.set(room, new Set());
	return rooms.get(room);
};

const broadcastPeerCount = room => {
	const peers = roomSet(room);
	const count = peers.size;
	for (const peer of peers) {
		sendJson(peer, { type: "peer-count", room, count });
	}
};

const leaveRoom = ws => {
	if (!ws._room) return;
	const peers = rooms.get(ws._room);
	if (!peers) return;
	peers.delete(ws);
	if (!peers.size) {
		rooms.delete(ws._room);
	} else {
		broadcastPeerCount(ws._room);
	}
	ws._room = null;
	ws._clientId = null;
};

const joinRoom = (ws, room, clientId) => {
	leaveRoom(ws);
	ws._room = sanitizeRoom(room);
	ws._clientId = String(clientId || "").trim().slice(0, 120) || `anon-${Date.now()}`;
	roomSet(ws._room).add(ws);
	sendJson(ws, { type: "joined", room: ws._room, clientId: ws._clientId });
	broadcastPeerCount(ws._room);
};

const VIRTUAL_ADAPTER_PATTERNS = [
	/virtual/i,
	/vmware/i,
	/vbox/i,
	/host-?only/i,
	/hyper-?v/i,
	/wsl/i,
	/docker/i,
	/loopback/i,
	/tailscale/i,
	/zerotier/i,
	/hamachi/i,
	/\btun\b/i,
	/\btap\b/i,
];

const PHYSICAL_ADAPTER_PATTERNS = [/wi-?fi/i, /\bwlan\b/i, /ethernet/i, /\blan\b/i];

const isVirtualAdapterName = name => {
	const normalized = String(name || "");
	return VIRTUAL_ADAPTER_PATTERNS.some(pattern => pattern.test(normalized));
};

const isPhysicalPreferredAdapterName = name => {
	const normalized = String(name || "");
	return PHYSICAL_ADAPTER_PATTERNS.some(pattern => pattern.test(normalized));
};

const getLanIpv4Entries = () => {
	const interfaces = os.networkInterfaces();
	const entries = [];
	for (const [adapterName, records] of Object.entries(interfaces)) {
		if (!Array.isArray(records)) continue;
		for (const entry of records) {
			if (!entry || entry.internal) continue;
			if (entry.family === "IPv4" || entry.family === 4) {
				entries.push({
					address: entry.address,
					adapterName,
					isVirtual: isVirtualAdapterName(adapterName),
					isPhysicalPreferred: isPhysicalPreferredAdapterName(adapterName),
				});
			}
		}
	}
	const seen = new Set();
	return entries.filter(item => {
		if (!item.address || seen.has(item.address)) return false;
		seen.add(item.address);
		return true;
	});
};

const isPrivateIpv4 = ip => {
	const octets = String(ip || "")
		.split(".")
		.map(value => Number(value));
	if (octets.length !== 4 || octets.some(value => !Number.isInteger(value))) {
		return false;
	}
	if (octets[0] === 10) return true;
	if (octets[0] === 192 && octets[1] === 168) return true;
	if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true;
	return false;
};

const getWindowsGatewayIpv4Candidates = () => {
	if (process.platform !== "win32") return [];
	try {
		const psRaw = childProcess.execSync(
			'powershell -NoProfile -Command "(Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.IPv4Address -ne $null } | ForEach-Object { $_.IPv4Address.IPAddress })"',
			{
				encoding: "utf8",
				stdio: ["ignore", "pipe", "ignore"],
			},
		);
		const psIps = String(psRaw || "")
			.split(/\r?\n/)
			.map(line => line.trim())
			.filter(Boolean)
			.filter(ip => isPrivateIpv4(ip));
		if (psIps.length) return Array.from(new Set(psIps));
	} catch (_) {}

	try {
		const raw = childProcess.execSync("ipconfig", {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"],
		});
		const blocks = String(raw || "")
			.split(/\r?\n\r?\n+/)
			.map(chunk => chunk.trim())
			.filter(Boolean);

		const results = [];
		for (const block of blocks) {
			if (/media disconnected/i.test(block)) continue;
			const ipv4Match = block.match(/IPv4[^:\n]*:\s*([0-9.]+)/i);
			if (!ipv4Match) continue;
			const gatewayMatch = block.match(/Default Gateway[^:\n]*:\s*([0-9.]+)/i);
			if (!gatewayMatch) continue;
			const ip = String(ipv4Match[1] || "").trim();
			const gateway = String(gatewayMatch[1] || "").trim();
			if (!ip || !gateway) continue;
			results.push(ip);
		}
		const privateResults = results.filter(ip => isPrivateIpv4(ip));
		return Array.from(new Set(privateResults.length ? privateResults : results));
	} catch (_) {
		return [];
	}
};

const getCollabInfo = () => {
	const lanEntries = getLanIpv4Entries();
	const gatewayIps = getWindowsGatewayIpv4Candidates();
	const privateEntries = lanEntries.filter(entry => isPrivateIpv4(entry.address));
	const privateNonVirtual = privateEntries.filter(entry => !entry.isVirtual);
	const privatePhysical = privateNonVirtual.filter(entry => entry.isPhysicalPreferred);
	const anyNonVirtual = lanEntries.filter(entry => !entry.isVirtual);
	const gatewayPreferred =
		lanEntries.find(entry => gatewayIps.includes(entry.address)) || null;

	const preferredEntry =
		gatewayPreferred ||
		privatePhysical[0] ||
		privateNonVirtual[0] ||
		privateEntries[0] ||
		anyNonVirtual[0] ||
		lanEntries[0] ||
		null;

	const lanIps = lanEntries.map(entry => entry.address);
	const preferredLanIp = preferredEntry?.address || "";
	return {
		lanIps,
		preferredLanIp,
		preferredAdapter: preferredEntry?.adapterName || "",
		gatewayIps,
		port: PORT,
		wsPath: "/ws",
	};
};

const serveStatic = (req, res) => {
	const reqPath = decodeURIComponent((req.url || "/").split("?")[0]);
	if (reqPath === "/__collab_info") {
		res.writeHead(200, {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
			"Access-Control-Allow-Origin": "*",
		});
		res.end(JSON.stringify(getCollabInfo()));
		return;
	}

	const fallback = path.join(ROOT_DIR, "index.html");
	const targetPath = reqPath === "/" ? fallback : path.resolve(ROOT_DIR, `.${reqPath}`);

	if (!targetPath.startsWith(ROOT_DIR)) {
		res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
		res.end("Forbidden");
		return;
	}

	fs.readFile(targetPath, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
			res.end("Not found");
			return;
		}
		const ext = path.extname(targetPath).toLowerCase();
		res.writeHead(200, {
			"Content-Type": MIME_TYPES[ext] || "application/octet-stream",
			"Cache-Control": "no-store",
		});
		res.end(data);
	});
};

const server = http.createServer(serveStatic);

const wss = new WebSocketServer({
	server,
	path: "/ws",
	maxPayload: 100 * 1024 * 1024,
});

wss.on("connection", ws => {
	ws.on("message", data => {
		let msg = null;
		try {
			msg = JSON.parse(String(data || ""));
		} catch (_) {
			sendJson(ws, { type: "error", message: "Niepoprawny JSON" });
			return;
		}

		if (!msg || typeof msg !== "object") return;

		if (msg.type === "join") {
			joinRoom(ws, msg.room, msg.clientId);
			return;
		}

		if (msg.type === "snapshot") {
			if (!ws._room) {
				sendJson(ws, { type: "error", message: "Najpierw dolacz do pokoju" });
				return;
			}
			const peers = rooms.get(ws._room);
			if (!peers) return;
			const payload = {
				type: "snapshot",
				room: ws._room,
				clientId: ws._clientId || "",
				ts: Number(msg.ts || Date.now()),
				snapshot: msg.snapshot || null,
			};
			for (const peer of peers) {
				if (peer === ws) continue;
				sendJson(peer, payload);
			}
		}
	});

	ws.on("close", () => {
		leaveRoom(ws);
	});

	ws.on("error", () => {
		leaveRoom(ws);
	});
});

server.listen(PORT, HOST, () => {
	console.log(`Collab server listening on http://${HOST}:${PORT}`);
	console.log(`WebSocket endpoint: ws://<IP_LAN>:${PORT}/ws`);
});
