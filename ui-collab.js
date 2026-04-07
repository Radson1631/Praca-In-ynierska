(function () {
	"use strict";

	const menuCollaborate = document.getElementById("menuCollaborate");
	const collabModal = document.getElementById("collabModal");
	const collabStatus = document.getElementById("collabStatus");
	const collabHostStart = document.getElementById("collabHostStart");
	const collabHostOfferOut = document.getElementById("collabHostOfferOut");
	const collabHostOfferCopy = document.getElementById("collabHostOfferCopy");
	const collabHostAnswerIn = document.getElementById("collabHostAnswerIn");
	const collabHostAnswerPaste = document.getElementById(
		"collabHostAnswerPaste",
	);
	const collabHostApplyAnswer = document.getElementById(
		"collabHostApplyAnswer",
	);
	const collabGuestOfferIn = document.getElementById("collabGuestOfferIn");
	const collabGuestOfferPaste = document.getElementById(
		"collabGuestOfferPaste",
	);
	const collabGuestCreateAnswer = document.getElementById(
		"collabGuestCreateAnswer",
	);
	const collabGuestAnswerOut = document.getElementById("collabGuestAnswerOut");
	const collabGuestAnswerCopy = document.getElementById(
		"collabGuestAnswerCopy",
	);
	const collabSyncNow = document.getElementById("collabSyncNow");
	const collabDisconnect = document.getElementById("collabDisconnect");
	const collabClose = document.getElementById("collabClose");
	const collabStateGenerate = document.getElementById("collabStateGenerate");
	const collabStateCopy = document.getElementById("collabStateCopy");
	const collabStateOut = document.getElementById("collabStateOut");
	const collabStatePaste = document.getElementById("collabStatePaste");
	const collabStateApply = document.getElementById("collabStateApply");
	const collabStateIn = document.getElementById("collabStateIn");
	const collabServerUrl = document.getElementById("collabServerUrl");
	const collabRoomId = document.getElementById("collabRoomId");
	const collabConnectWs = document.getElementById("collabConnectWs");
	const collabDisconnectWs = document.getElementById("collabDisconnectWs");
	const collabDetectLanIpv4 = document.getElementById("collabDetectLanIpv4");
	const collabPeerCount = document.getElementById("collabPeerCount");
	const collabCopyInviteUrl = document.getElementById("collabCopyInviteUrl");
	const collabInviteUrl = document.getElementById("collabInviteUrl");

	if (!collabModal || !collabStatus) return;

	const normalizeBase64Input = input => {
		const compact = String(input || "")
			.replace(/\s+/g, "")
			.replace(/-/g, "+")
			.replace(/_/g, "/");
		const pad = compact.length % 4;
		return pad ? compact + "=".repeat(4 - pad) : compact;
	};

	const bytesToBase64 = bytes => {
		let binary = "";
		const chunkSize = 0x8000;
		for (let i = 0; i < bytes.length; i += chunkSize) {
			const chunk = bytes.subarray(i, i + chunkSize);
			binary += String.fromCharCode(...chunk);
		}
		return btoa(binary);
	};

	const base64ToBytes = base64 => {
		const normalized = normalizeBase64Input(base64);
		const binary = atob(normalized);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		return bytes;
	};

	const utf8ToBase64 = text => bytesToBase64(new TextEncoder().encode(text));
	const base64ToUtf8 = base64 =>
		new TextDecoder().decode(base64ToBytes(base64));

	const gzipStringToBase64 = async text => {
		const stream = new CompressionStream("gzip");
		const writer = stream.writable.getWriter();
		await writer.write(new TextEncoder().encode(text));
		await writer.close();
		const compressed = new Uint8Array(
			await new Response(stream.readable).arrayBuffer(),
		);
		return bytesToBase64(compressed);
	};

	const gunzipBase64ToString = async base64 => {
		const stream = new DecompressionStream("gzip");
		const writer = stream.writable.getWriter();
		await writer.write(base64ToBytes(base64));
		await writer.close();
		const decompressed = new Uint8Array(
			await new Response(stream.readable).arrayBuffer(),
		);
		return new TextDecoder().decode(decompressed);
	};

	const encodeStateCode = async snapshot => {
		const json = JSON.stringify(snapshot);
		if (typeof CompressionStream === "function") {
			try {
				const compressed = await gzipStringToBase64(json);
				return `gz:${compressed}`;
			} catch (_) {}
		}
		return `b64:${utf8ToBase64(json)}`;
	};

	const decodeStateCode = async code => {
		const cleaned = String(code || "")
			.trim()
			.replace(/\s+/g, "");
		if (!cleaned) return null;
		if (cleaned.startsWith("gz:")) {
			const payload = cleaned.slice(3);
			if (!payload) return null;
			if (typeof DecompressionStream !== "function") {
				throw new Error("ten kod wymaga nowszej przegladarki (gzip)");
			}
			const json = await gunzipBase64ToString(payload);
			return JSON.parse(json);
		}
		if (cleaned.startsWith("b64:")) {
			return JSON.parse(base64ToUtf8(cleaned.slice(4)));
		}
		// zgodnosc wstecz ze starszym formatem bez prefiksu
		return JSON.parse(base64ToUtf8(cleaned));
	};

	const getLayerCount = snapshot =>
		Array.isArray(snapshot?.layers) ? snapshot.layers.length : 0;

	// Uproszczony tryb: tylko kod stanu (bez WebRTC host/guest).
	const isSimpleMode = Boolean(
		collabServerUrl &&
		collabConnectWs &&
		collabDisconnectWs &&
		!collabHostStart &&
		!collabGuestCreateAnswer,
	);
	if (isSimpleMode) {
		const setStatusSimple = text => {
			collabStatus.textContent = `Status: ${text}`;
		};
		const openSimple = event => {
			if (event) event.preventDefault();
			collabModal.classList.remove("hidden");
		};
		const closeSimple = () => {
			collabModal.classList.add("hidden");
		};
		const copyTextSimple = async text => {
			if (!text) return false;
			try {
				await navigator.clipboard.writeText(text);
				return true;
			} catch (_) {
				return false;
			}
		};
		const clientId = `client-${Math.random().toString(36).slice(2, 10)}`;
		const SYNC_DEBOUNCE_MS = 350;
		let ws = null;
		let wsRoom = "default";
		let wsConnected = false;
		let isApplyingRemote = false;
		let localSyncTimer = null;

		const updatePeerCount = value => {
			if (!collabPeerCount) return;
			const count = Number(value);
			collabPeerCount.textContent =
				Number.isFinite(count) && count >= 0 ? String(count) : "0";
		};

		const getDefaultServerUrl = () => {
			const { protocol, host, hostname } = window.location;
			if (host) {
				const wsProtocol = protocol === "https:" ? "wss" : "ws";
				return `${wsProtocol}://${host}/ws`;
			}
			return "ws://127.0.0.1:8787/ws";
		};

		const normalizeRoom = value => {
			const room = String(value || "")
				.trim()
				.slice(0, 80);
			return room || "default";
		};

		const isWsScheme = value =>
			String(value || "").startsWith("ws://") ||
			String(value || "").startsWith("wss://");

		const isPrivateIpv4Host = host =>
			/^10\./.test(host) ||
			/^192\.168\./.test(host) ||
			/^172\.(1[6-9]|2\d|3[0-1])\./.test(host);

		const isLoopbackHost = host => {
			const normalized = String(host || "").trim().toLowerCase();
			return (
				normalized === "localhost" ||
				normalized === "127.0.0.1" ||
				normalized === "::1" ||
				normalized === "[::1]"
			);
		};

		const isLocalOnlyHost = host => {
			const normalized = String(host || "").trim().toLowerCase();
			if (!normalized) return true;
			return isLoopbackHost(normalized) || isPrivateIpv4Host(normalized);
		};

		const buildBaseHttpUrlFromWs = wsUrl => {
			try {
				const parsed = new URL(wsUrl);
				if (parsed.protocol !== "ws:" && parsed.protocol !== "wss:") return "";
				const httpProtocol = parsed.protocol === "wss:" ? "https:" : "http:";
				return `${httpProtocol}//${parsed.host}`;
			} catch (_) {
				return "";
			}
		};

		const buildInviteUrl = () => {
			const room = normalizeRoom(collabRoomId?.value || "default");
			const wsUrl = String(collabServerUrl?.value || "").trim();
			const current = new URL(window.location.href);
			let inviteBase = `${current.protocol}//${current.host}`;
			if (
				(current.protocol === "file:" || isLocalOnlyHost(current.hostname)) &&
				wsUrl &&
				isWsScheme(wsUrl)
			) {
				const wsBase = buildBaseHttpUrlFromWs(wsUrl);
				if (wsBase) inviteBase = wsBase;
			}
			const invite = new URL(inviteBase);
			invite.search = "";
			invite.hash = "";
			invite.searchParams.set("room", room);
			if (wsUrl && isWsScheme(wsUrl) && wsUrl !== getDefaultServerUrl()) {
				invite.searchParams.set("ws", wsUrl);
			}
			return invite.toString();
		};

		const refreshInviteUrl = () => {
			if (!collabInviteUrl) return "";
			const inviteUrl = buildInviteUrl();
			collabInviteUrl.value = inviteUrl;
			return inviteUrl;
		};

		const detectLanIpv4 = async () => {
			const pickBestHostFromInfo = info => {
				const preferred = String(info?.preferredLanIp || "").trim();
				const lanIps = Array.isArray(info?.lanIps)
					? info.lanIps.map(value => String(value || "").trim()).filter(Boolean)
					: [];
				const all = [];
				if (preferred) all.push(preferred);
				for (const ip of lanIps) {
					if (!all.includes(ip)) all.push(ip);
				}
				if (!all.length) return "";
				const privateNonHostOnly = all.filter(
					ip => isPrivateIpv4Host(ip) && !/^192\.168\.56\./.test(ip),
				);
				if (privateNonHostOnly.length) return privateNonHostOnly[0];
				const privateIps = all.filter(ip => isPrivateIpv4Host(ip));
				if (privateIps.length) return privateIps[0];
				return all[0];
			};

			const candidates = [];
			const currentHost = String(window.location.hostname || "").trim();
			if (currentHost) {
				candidates.push(`/__collab_info`);
				candidates.push(`http://${currentHost}:8787/__collab_info`);
			}
			candidates.push("http://127.0.0.1:8787/__collab_info");
			candidates.push("http://localhost:8787/__collab_info");

			for (const url of candidates) {
				try {
					const response = await fetch(url, { cache: "no-store" });
					if (!response.ok) continue;
					const info = await response.json();
					const host = pickBestHostFromInfo(info);
					const port = Number(info?.port || 8787) || 8787;
					if (!host) continue;
					if (collabServerUrl) collabServerUrl.value = `ws://${host}:${port}/ws`;
					refreshInviteUrl();
					setStatusSimple(`ustawiono IPv4 LAN: ${host}`);
					return true;
				} catch (_) {}
			}
			setStatusSimple("nie wykryto IPv4 LAN (uruchom serwer na komputerze A)");
			return false;
		};

		const wsCanSend = () => ws && ws.readyState === WebSocket.OPEN;

		const exportSnapshot = () => {
			if (typeof window.exportDocumentSnapshot !== "function") return null;
			return window.exportDocumentSnapshot();
		};

		const sendSnapshotWs = () => {
			if (!wsCanSend() || isApplyingRemote) return;
			const snapshot = exportSnapshot();
			if (!snapshot) return;
			ws.send(
				JSON.stringify({
					type: "snapshot",
					room: wsRoom,
					clientId,
					ts: Date.now(),
					snapshot,
				}),
			);
		};

		const scheduleSnapshotWs = () => {
			if (!wsConnected || isApplyingRemote) return;
			window.clearTimeout(localSyncTimer);
			localSyncTimer = window.setTimeout(sendSnapshotWs, SYNC_DEBOUNCE_MS);
		};

		const closeWs = () => {
			if (ws) {
				try {
					ws.close();
				} catch (_) {}
			}
			ws = null;
			wsConnected = false;
			updatePeerCount(0);
		};

		const applyRemoteSnapshot = async snapshot => {
			if (!snapshot || typeof window.importDocumentSnapshot !== "function")
				return;
			if (isApplyingRemote) return;
			isApplyingRemote = true;
			try {
				await window.importDocumentSnapshot(snapshot);
				setStatusSimple(
					`synchronizacja odebrana (warstwy: ${getLayerCount(snapshot)})`,
				);
			} catch (err) {
				setStatusSimple(`blad synchronizacji: ${err?.message || err}`);
			} finally {
				window.setTimeout(() => {
					isApplyingRemote = false;
				}, 250);
			}
		};

		const connectWs = () => {
			if (typeof WebSocket !== "function") {
				setStatusSimple("ta przegladarka nie obsluguje WebSocket");
				return;
			}
			closeWs();

			const serverUrl =
				String(collabServerUrl?.value || "").trim() || getDefaultServerUrl();
			wsRoom = normalizeRoom(collabRoomId?.value || "default");
			if (collabRoomId) collabRoomId.value = wsRoom;
			if (collabServerUrl && !collabServerUrl.value.trim())
				collabServerUrl.value = serverUrl;

			try {
				ws = new WebSocket(serverUrl);
			} catch (err) {
				setStatusSimple(`blad laczenia: ${err?.message || err}`);
				return;
			}

			ws.addEventListener("open", () => {
				wsConnected = true;
				ws.send(JSON.stringify({ type: "join", room: wsRoom, clientId }));
				setStatusSimple(`polaczono z serwerem, pokoj: ${wsRoom}`);
				sendSnapshotWs();
			});

			ws.addEventListener("close", () => {
				wsConnected = false;
				updatePeerCount(0);
				setStatusSimple("rozlaczono z serwerem");
			});

			ws.addEventListener("error", () => {
				setStatusSimple("blad WebSocket (sprawdz adres serwera)");
			});

			ws.addEventListener("message", async event => {
				let msg = null;
				try {
					msg = JSON.parse(String(event.data || ""));
				} catch (_) {
					return;
				}
				if (!msg || typeof msg !== "object") return;

				if (msg.type === "peer-count") {
					updatePeerCount(msg.count);
					return;
				}
				if (msg.type === "error") {
					setStatusSimple(`blad serwera: ${msg.message || "nieznany"}`);
					return;
				}
				if (msg.type === "snapshot") {
					if (msg.clientId === clientId) return;
					await applyRemoteSnapshot(msg.snapshot);
				}
			});
		};

		menuCollaborate?.addEventListener("click", openSimple);
		collabClose?.addEventListener("click", closeSimple);
		collabDetectLanIpv4?.addEventListener("click", async () => {
			await detectLanIpv4();
		});
		collabConnectWs?.addEventListener("click", () => {
			connectWs();
		});
		collabDisconnectWs?.addEventListener("click", () => {
			closeWs();
			setStatusSimple("rozlaczono");
		});
		collabSyncNow?.addEventListener("click", () => {
			if (!wsConnected) {
				setStatusSimple("brak stalego polaczenia");
				return;
			}
			sendSnapshotWs();
			setStatusSimple("wyslano stan");
		});
		collabCopyInviteUrl?.addEventListener("click", async () => {
			const inviteUrl = refreshInviteUrl();
			const ok = await copyTextSimple(inviteUrl);
			if (!ok) {
				setStatusSimple("nie udalo sie skopiowac linku");
				return;
			}
			try {
				const wsUrl = String(collabServerUrl?.value || "").trim();
				if (wsUrl) {
					const wsParsed = new URL(wsUrl);
					if (isLoopbackHost(wsParsed.hostname)) {
						setStatusSimple("link skopiowany, ale WS jest lokalny (ustaw publiczny serwer)");
						return;
					}
				}
			} catch (_) {}
			try {
				const invite = new URL(inviteUrl);
				if (isLocalOnlyHost(invite.hostname)) {
					setStatusSimple("link skopiowany, ale jest lokalny (ustaw publiczny adres serwera WS)");
					return;
				}
			} catch (_) {}
			setStatusSimple("link zaproszenia skopiowany");
		});
		collabServerUrl?.addEventListener("input", () => {
			refreshInviteUrl();
		});
		collabRoomId?.addEventListener("input", () => {
			refreshInviteUrl();
		});
		document.addEventListener("keyup", scheduleSnapshotWs);
		document.addEventListener("mouseup", scheduleSnapshotWs);
		document.addEventListener("touchend", scheduleSnapshotWs, {
			passive: true,
		});

		if (collabServerUrl && !collabServerUrl.value.trim()) {
			collabServerUrl.value = getDefaultServerUrl();
		}
		try {
			const params = new URLSearchParams(window.location.search || "");
			const roomFromUrl = normalizeRoom(params.get("room") || "");
			const wsFromUrl = String(params.get("ws") || "").trim();
			if (collabRoomId && roomFromUrl) collabRoomId.value = roomFromUrl;
			if (collabServerUrl && wsFromUrl && isWsScheme(wsFromUrl)) {
				collabServerUrl.value = wsFromUrl;
			}
		} catch (_) {}
		refreshInviteUrl();
		updatePeerCount(0);
		setStatusSimple("gotowe");
		return;
	}

	const STUN_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];
	const MAX_CHUNK_SIZE = 12000;
	const LOCAL_CHANGE_DEBOUNCE_MS = 350;
	const REMOTE_APPLY_COOLDOWN_MS = 300;

	let role = null; // "host" | "guest"
	let pc = null;
	let dc = null;
	let localChangeTimer = null;
	let applyingRemoteSnapshot = false;
	let suppressLocalBroadcast = false;
	const incomingChunks = new Map();

	const setStatus = text => {
		collabStatus.textContent = `Status: ${text}`;
	};

	const toCode = obj => JSON.stringify(obj, null, 2);

	const parseBase64Json = input => {
		const compact = input
			.replace(/\s+/g, "")
			.replace(/-/g, "+")
			.replace(/_/g, "/");
		const pad = compact.length % 4;
		const normalized = pad ? compact + "=".repeat(4 - pad) : compact;
		const decoded = decodeURIComponent(escape(atob(normalized)));
		return JSON.parse(decoded);
	};

	const extractJsonObjectText = text => {
		const start = text.indexOf("{");
		const end = text.lastIndexOf("}");
		if (start >= 0 && end > start) {
			return text.slice(start, end + 1);
		}
		return text;
	};

	const fromCode = code => {
		const trimmed = (code || "").trim();
		if (!trimmed) return null;
		const cleaned = trimmed
			.replace(/^```(?:json)?/i, "")
			.replace(/```$/i, "")
			.trim();
		const jsonLike = extractJsonObjectText(cleaned);

		try {
			return JSON.parse(jsonLike);
		} catch (_) {}

		return parseBase64Json(cleaned);
	};

	const copyText = async text => {
		if (!text) return false;
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (_) {
			return false;
		}
	};

	const pasteTo = async textarea => {
		if (!textarea) return;
		try {
			const text = await navigator.clipboard.readText();
			if (text) textarea.value = text;
		} catch (_) {
			setStatus("brak dostępu do schowka (wklej ręcznie)");
		}
	};

	const openCollabModal = event => {
		if (event) event.preventDefault();
		collabModal.classList.remove("hidden");
	};

	const closeCollabModal = () => {
		collabModal.classList.add("hidden");
	};

	const closeConnection = () => {
		try {
			if (dc) dc.close();
		} catch (_) {}
		try {
			if (pc) pc.close();
		} catch (_) {}
		pc = null;
		dc = null;
		role = null;
		incomingChunks.clear();
		setStatus("rozłączono");
	};

	const waitForIceGatheringComplete = (peer, timeoutMs = 3000) =>
		new Promise(resolve => {
			if (!peer || peer.iceGatheringState === "complete") {
				resolve();
				return;
			}
			let done = false;
			const finish = () => {
				if (done) return;
				done = true;
				peer.removeEventListener("icegatheringstatechange", onState);
				resolve();
			};
			const onState = () => {
				if (peer.iceGatheringState === "complete") {
					finish();
				}
			};
			peer.addEventListener("icegatheringstatechange", onState);
			window.setTimeout(finish, timeoutMs);
		});

	const buildPeerConnection = nextRole => {
		closeConnection();
		role = nextRole;
		pc = new RTCPeerConnection({ iceServers: STUN_SERVERS });

		pc.addEventListener("connectionstatechange", () => {
			const state = pc?.connectionState || "unknown";
			setStatus(state);
			if (state === "connected" && role === "host") {
				window.setTimeout(() => sendCurrentSnapshot(), 200);
			}
		});

		pc.addEventListener("iceconnectionstatechange", () => {
			const state = pc?.iceConnectionState || "unknown";
			if (
				state === "failed" ||
				state === "disconnected" ||
				state === "closed"
			) {
				setStatus(`ICE: ${state}`);
			}
		});

		pc.addEventListener("datachannel", event => {
			attachDataChannel(event.channel);
		});

		if (nextRole === "host") {
			const channel = pc.createDataChannel("radstrowo-sync", { ordered: true });
			attachDataChannel(channel);
		}
	};

	const sendObject = obj => {
		if (!dc || dc.readyState !== "open") return;
		const json = JSON.stringify(obj);
		if (json.length <= MAX_CHUNK_SIZE) {
			dc.send(json);
			return;
		}
		const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
		const total = Math.ceil(json.length / MAX_CHUNK_SIZE);
		dc.send(JSON.stringify({ type: "chunk-start", id, total }));
		for (let i = 0; i < total; i++) {
			const start = i * MAX_CHUNK_SIZE;
			const piece = json.slice(start, start + MAX_CHUNK_SIZE);
			dc.send(
				JSON.stringify({ type: "chunk-part", id, index: i, data: piece }),
			);
		}
		dc.send(JSON.stringify({ type: "chunk-end", id }));
	};

	const sendCurrentSnapshot = () => {
		if (suppressLocalBroadcast || applyingRemoteSnapshot) return;
		if (typeof window.exportDocumentSnapshot !== "function") return;
		const snapshot = window.exportDocumentSnapshot();
		if (!snapshot) return;
		sendObject({ type: "snapshot", snapshot, ts: Date.now() });
	};

	const scheduleSnapshotBroadcast = () => {
		if (suppressLocalBroadcast || applyingRemoteSnapshot) return;
		if (!dc || dc.readyState !== "open") return;
		window.clearTimeout(localChangeTimer);
		localChangeTimer = window.setTimeout(
			sendCurrentSnapshot,
			LOCAL_CHANGE_DEBOUNCE_MS,
		);
	};

	const applyRemoteSnapshot = async snapshot => {
		if (!snapshot || typeof window.importDocumentSnapshot !== "function")
			return;
		if (applyingRemoteSnapshot) return;
		applyingRemoteSnapshot = true;
		suppressLocalBroadcast = true;
		try {
			await window.importDocumentSnapshot(snapshot);
		} catch (err) {
			setStatus(`błąd synchronizacji: ${err?.message || err}`);
		} finally {
			window.setTimeout(() => {
				suppressLocalBroadcast = false;
			}, REMOTE_APPLY_COOLDOWN_MS);
			applyingRemoteSnapshot = false;
		}
	};

	const handlePayloadObject = async msg => {
		if (!msg || typeof msg !== "object") return;

		if (msg.type === "snapshot") {
			await applyRemoteSnapshot(msg.snapshot);
			return;
		}

		if (msg.type === "request-snapshot") {
			sendCurrentSnapshot();
			return;
		}
	};

	const handleIncomingString = async text => {
		let msg = null;
		try {
			msg = JSON.parse(text);
		} catch (_) {
			return;
		}
		if (!msg || typeof msg !== "object") return;

		if (msg.type === "chunk-start") {
			incomingChunks.set(msg.id, {
				total: Number(msg.total) || 0,
				parts: [],
			});
			return;
		}

		if (msg.type === "chunk-part") {
			const slot = incomingChunks.get(msg.id);
			if (!slot) return;
			slot.parts[msg.index] = String(msg.data || "");
			return;
		}

		if (msg.type === "chunk-end") {
			const slot = incomingChunks.get(msg.id);
			incomingChunks.delete(msg.id);
			if (!slot || !slot.total) return;
			if (slot.parts.filter(Boolean).length !== slot.total) return;
			const joined = slot.parts.join("");
			await handleIncomingString(joined);
			return;
		}

		await handlePayloadObject(msg);
	};

	const attachDataChannel = channel => {
		dc = channel;
		dc.addEventListener("open", () => {
			setStatus("połączono");
			sendObject({ type: "request-snapshot" });
			if (role === "host") {
				sendCurrentSnapshot();
			}
		});
		dc.addEventListener("close", () => {
			setStatus("kanał zamknięty");
		});
		dc.addEventListener("message", async event => {
			const data =
				typeof event.data === "string" ? event.data : String(event.data || "");
			await handleIncomingString(data);
		});
	};

	const wrapMutationFunctions = () => {
		const names = [
			"saveState",
			"saveDocumentState",
			"initWorkspace",
			"undo",
			"redo",
			"clearCanvas",
			"fillWithColor",
			"applyTextBox",
			"createLayer",
			"removeLayer",
		];
		names.forEach(name => {
			const original = window[name];
			if (typeof original !== "function" || original.__collabWrapped) return;
			const wrapped = function (...args) {
				const result = original.apply(this, args);
				scheduleSnapshotBroadcast();
				return result;
			};
			wrapped.__collabWrapped = true;
			window[name] = wrapped;
		});
	};

	const startAsHost = async () => {
		try {
			buildPeerConnection("host");
			const offer = await pc.createOffer();
			await pc.setLocalDescription(offer);
			await waitForIceGatheringComplete(pc);
			const local = pc.localDescription;
			collabHostOfferOut.value = toCode(local);
			setStatus("host: kod zaproszenia gotowy");
		} catch (err) {
			setStatus(`błąd hosta: ${err?.message || err}`);
		}
	};

	const applyHostAnswer = async () => {
		try {
			if (!pc || role !== "host") {
				setStatus("najpierw kliknij: Utwórz kod zaproszenia");
				return;
			}
			const answerObj = fromCode(collabHostAnswerIn.value);
			if (!answerObj) {
				setStatus("wklej poprawny kod odpowiedzi");
				return;
			}
			await pc.setRemoteDescription(new RTCSessionDescription(answerObj));
			setStatus("host: oczekiwanie na połączenie");
		} catch (err) {
			setStatus(`błąd odpowiedzi: ${err?.message || err}`);
		}
	};

	const createGuestAnswer = async () => {
		try {
			const offerObj = fromCode(collabGuestOfferIn.value);
			if (!offerObj) {
				setStatus("wklej poprawny kod zaproszenia");
				return;
			}

			buildPeerConnection("guest");
			await pc.setRemoteDescription(new RTCSessionDescription(offerObj));
			const answer = await pc.createAnswer();
			await pc.setLocalDescription(answer);
			setStatus("gość: generowanie odpowiedzi...");
			await waitForIceGatheringComplete(pc, 3000);
			collabGuestAnswerOut.value = toCode(pc.localDescription);
			setStatus("gość: kod odpowiedzi gotowy");
		} catch (err) {
			setStatus(`błąd gościa: ${err?.message || err}`);
		}
	};

	const bindEvents = () => {
		menuCollaborate?.addEventListener("click", openCollabModal);
		collabClose?.addEventListener("click", closeCollabModal);
		collabDisconnect?.addEventListener("click", closeConnection);
		collabHostStart?.addEventListener("click", startAsHost);
		collabHostApplyAnswer?.addEventListener("click", applyHostAnswer);
		collabGuestCreateAnswer?.addEventListener("click", createGuestAnswer);
		collabSyncNow?.addEventListener("click", sendCurrentSnapshot);
		collabHostOfferCopy?.addEventListener("click", async () => {
			const ok = await copyText(collabHostOfferOut?.value || "");
			setStatus(ok ? "kod zaproszenia skopiowany" : "nie udało się skopiować");
		});
		collabGuestAnswerCopy?.addEventListener("click", async () => {
			const ok = await copyText(collabGuestAnswerOut?.value || "");
			setStatus(ok ? "kod odpowiedzi skopiowany" : "nie udało się skopiować");
		});
		collabHostAnswerPaste?.addEventListener("click", () =>
			pasteTo(collabHostAnswerIn),
		);
		collabGuestOfferPaste?.addEventListener("click", () =>
			pasteTo(collabGuestOfferIn),
		);
		collabStateGenerate?.addEventListener("click", async () => {
			try {
				if (typeof window.exportDocumentSnapshot !== "function") {
					setStatus("brak eksportu snapshotu");
					return;
				}
				const snapshot = window.exportDocumentSnapshot();
				if (!snapshot) {
					setStatus("brak danych stanu");
					return;
				}
				const code = await encodeStateCode(snapshot);
				if (collabStateOut) collabStateOut.value = code;
				setStatus(
					`kod stanu gotowy (warstwy: ${getLayerCount(snapshot)}, znaki: ${code.length})`,
				);
			} catch (err) {
				setStatus(`błąd kodu stanu: ${err?.message || err}`);
			}
		});
		collabStateCopy?.addEventListener("click", async () => {
			const ok = await copyText(collabStateOut?.value || "");
			setStatus(ok ? "kod stanu skopiowany" : "nie udało się skopiować");
		});
		collabStatePaste?.addEventListener("click", () => pasteTo(collabStateIn));
		collabStateApply?.addEventListener("click", async () => {
			try {
				if (typeof window.importDocumentSnapshot !== "function") {
					setStatus("brak importu snapshotu");
					return;
				}
				const snapshot = await decodeStateCode(collabStateIn?.value || "");
				if (!snapshot) {
					setStatus("wklej poprawny kod stanu");
					return;
				}
				await window.importDocumentSnapshot(snapshot);
				setStatus(`stan wczytany (warstwy: ${getLayerCount(snapshot)})`);
			} catch (err) {
				setStatus(`błąd wczytywania stanu: ${err?.message || err}`);
			}
		});

		document.addEventListener("keyup", scheduleSnapshotBroadcast);
		document.addEventListener("mouseup", scheduleSnapshotBroadcast);
		document.addEventListener("touchend", scheduleSnapshotBroadcast, {
			passive: true,
		});
	};

	wrapMutationFunctions();
	bindEvents();
	setStatus("rozłączono");
})();
