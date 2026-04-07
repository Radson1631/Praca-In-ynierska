// =========================
// CORE.JS — RADSTROWO
// =========================

// ===== GLOBALNE REFERENCJE DOM – WYPEŁNIANE W ui.js =====
let modal, setBtn, canvas, widthInput, heightInput;
let toolbar, title, menu, shapeButton, shapeOptions, wrapper, brushToolBtn;
let mainLayout, fileInput, openFileBtn, newFileBtn;
let strokeColorInput, fillColorInput, pipetteTool;
let toolbarToggle;
let layerBlendModeSelect, layerOpacityInput, layerOpacityValue;
let layerFillInput, layerFillValue;
let activeLayerNameBar;
let layerPreviewRefreshRafId = 0;
let lastLayerPreviewRefreshAt = 0;
const LAYER_PREVIEW_REFRESH_MS = 120;

// ===== STAN APLIKACJI =====

// 0 = najniższa warstwa, ostatnia = najwyższa
// kind: 'raster' | 'image' | 'text' | 'shape-rect' | 'shape-roundRect' | 'shape-ellipse' | 'shape-line'
let layers = [];
let activeLayerIndex = 0;
let layerIdCounter = 1;

// aktualnie edytowana warstwa tekstowa (lub null)
let currentTextEditLayerIndex = null;

// Rysowanie / narzędzia
let selectedShape = null; // null = pędzel, 'rectangle' | 'roundRect' | 'ellipse' | 'line'
let drawing = false;
let drawingStarted = false;
let startX = 0;
let startY = 0;

let isMoveMode = false;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

let isPipetteMode = false;

// Zaznaczenie prostokątne / lasso
let isSelectMode = false;
let selectMode = "rect"; // "rect" | "lasso"

let isDrawingSelection = false;
let selectionRect = null;

let selectionOverlayCanvas = null;
let selectionOverlayCtx = null;

// LASSO
let lassoPoints = [];
let isLassoDrawing = false;
let hasLassoSelection = false;
let lassoSelectionPoints = null;
let lassoLastDX = 0;
let lassoLastDY = 0;
let isMovingSelection = false;
let selectionMoveStartX = 0;
let selectionMoveStartY = 0;
let selectionImageData = null;
let selectionOriginalRect = null;
let layerBeforeMoveCanvas = null;
let lassoSelectionCanvas = null;

// Kadrowanie
let isCropMode = false;
let isDrawingCrop = false;
let cropRect = null;

// Tekst (overlay textarea)
let isTextMode = false;
let isDrawingTextBox = false;
let textBoxRect = null;
let textOverlay = null;

// Undo/redo (aktywny ctx)
const undoStack = [];
const redoStack = [];
const documentUndoStack = [];
const documentRedoStack = [];
let isRestoringDocumentState = false;

// ===== ZOOM WIDOKU (wrapper transform) =====
let isZoomMode = false;
let zoomMode = "in"; // "in" | "out"

let viewScale = 1;
let viewOffsetX = 0;
let viewOffsetY = 0;

function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}

const BLEND_MODE_TO_CSS = {
	normal: "normal",
	dissolve: "normal",
	darken: "darken",
	multiply: "multiply",
	colorBurn: "color-burn",
	linearBurn: "multiply",
	darkerColor: "darken",
	lighten: "lighten",
	screen: "screen",
	colorDodge: "color-dodge",
	linearDodge: "screen",
	lighterColor: "lighten",
	overlay: "overlay",
	softLight: "soft-light",
	hardLight: "hard-light",
	vividLight: "hard-light",
	linearLight: "hard-light",
	pinLight: "hard-light",
	hardMix: "hard-light",
	difference: "difference",
	exclusion: "exclusion",
	subtract: "difference",
	divide: "screen",
	hue: "hue",
	saturation: "saturation",
	color: "color",
	luminosity: "luminosity",
};

const BLEND_MODE_TO_CANVAS = {
	normal: "source-over",
	dissolve: "source-over",
	darken: "darken",
	multiply: "multiply",
	colorBurn: "color-burn",
	linearBurn: "multiply",
	darkerColor: "darken",
	lighten: "lighten",
	screen: "screen",
	colorDodge: "color-dodge",
	linearDodge: "screen",
	lighterColor: "lighten",
	overlay: "overlay",
	softLight: "soft-light",
	hardLight: "hard-light",
	vividLight: "hard-light",
	linearLight: "hard-light",
	pinLight: "hard-light",
	hardMix: "hard-light",
	difference: "difference",
	exclusion: "exclusion",
	subtract: "difference",
	divide: "screen",
	hue: "hue",
	saturation: "saturation",
	color: "color",
	luminosity: "luminosity",
};

function normalizeBlendMode(mode) {
	return BLEND_MODE_TO_CSS[mode] ? mode : "normal";
}

function ensureLayerVisualDefaults(layer) {
	if (!layer) return;
	layer.opacity = clamp(Number(layer.opacity ?? 100), 0, 100);
	layer.fillOpacity = clamp(Number(layer.fillOpacity ?? 100), 0, 100);
	layer.blendMode = normalizeBlendMode(layer.blendMode);
	if (typeof layer.visible !== "boolean") layer.visible = true;
}

function getLayerEffectiveAlpha(layer) {
	ensureLayerVisualDefaults(layer);
	return (layer.opacity / 100) * (layer.fillOpacity / 100);
}

function updateActiveLayerNameBar() {
	if (!activeLayerNameBar) {
		activeLayerNameBar = document.getElementById("activeLayerNameBar");
	}
	if (!activeLayerNameBar) return;

	const active = layers[activeLayerIndex];
	activeLayerNameBar.textContent = active?.name || "-";
}

function syncLayerControlsFromActive() {
	updateActiveLayerNameBar();
	if (!layers.length) return;
	if (!layerBlendModeSelect || !layerOpacityInput || !layerFillInput) return;
	const layer = layers[activeLayerIndex];
	if (!layer) return;
	ensureLayerVisualDefaults(layer);

	const disabled = !!layer.locked;
	layerBlendModeSelect.value = normalizeBlendMode(layer.blendMode);
	layerOpacityInput.value = `${Math.round(layer.opacity)}`;
	layerFillInput.value = `${Math.round(layer.fillOpacity)}`;
	if (layerOpacityValue) layerOpacityValue.textContent = `${Math.round(layer.opacity)}%`;
	if (layerFillValue) layerFillValue.textContent = `${Math.round(layer.fillOpacity)}%`;

	layerBlendModeSelect.disabled = disabled;
	layerOpacityInput.disabled = disabled;
	layerFillInput.disabled = disabled;
}

function bindLayersPanelControls() {
	layerBlendModeSelect = document.getElementById("layerBlendModeSelect");
	layerOpacityInput = document.getElementById("layerOpacityInput");
	layerOpacityValue = document.getElementById("layerOpacityValue");
	layerFillInput = document.getElementById("layerFillInput");
	layerFillValue = document.getElementById("layerFillValue");
	activeLayerNameBar = document.getElementById("activeLayerNameBar");
	if (!layerBlendModeSelect || !layerOpacityInput || !layerFillInput) return;
	if (layerBlendModeSelect.dataset.bound === "1") {
		syncLayerControlsFromActive();
		return;
	}

	layerBlendModeSelect.dataset.bound = "1";
	const stopEvent = e => e.stopPropagation();
	[layerBlendModeSelect, layerOpacityInput, layerFillInput].forEach(el => {
		el.addEventListener("click", stopEvent);
		el.addEventListener("mousedown", stopEvent);
		el.addEventListener("pointerdown", stopEvent);
	});

	layerBlendModeSelect.addEventListener("change", () => {
		const layer = layers[activeLayerIndex];
		if (!layer || layer.locked) {
			syncLayerControlsFromActive();
			return;
		}
		layer.blendMode = normalizeBlendMode(layerBlendModeSelect.value);
		applyLayerCanvasVisualState(layer);
		updateLayerList();
	});

	layerOpacityInput.addEventListener("input", () => {
		const layer = layers[activeLayerIndex];
		if (!layer || layer.locked) {
			syncLayerControlsFromActive();
			return;
		}
		layer.opacity = clamp(Number(layerOpacityInput.value || 100), 0, 100);
		applyLayerCanvasVisualState(layer);
		if (layerOpacityValue) layerOpacityValue.textContent = `${Math.round(layer.opacity)}%`;
	});

	layerFillInput.addEventListener("input", () => {
		const layer = layers[activeLayerIndex];
		if (!layer || layer.locked) {
			syncLayerControlsFromActive();
			return;
		}
		layer.fillOpacity = clamp(Number(layerFillInput.value || 100), 0, 100);
		applyLayerCanvasVisualState(layer);
		if (layerFillValue) layerFillValue.textContent = `${Math.round(layer.fillOpacity)}%`;
	});

	syncLayerControlsFromActive();
}

function applyViewTransform() {
	if (!wrapper) return;
	wrapper.style.transformOrigin = "0 0";
	wrapper.style.transform = `translate(${viewOffsetX}px, ${viewOffsetY}px) scale(${viewScale})`;
}

function setZoomMode(mode) {
	isZoomMode = true;
	zoomMode = mode === "out" ? "out" : "in";
}

function disableZoomMode() {
	isZoomMode = false;
}

function zoomAtClientPoint(clientX, clientY, factor) {
	if (!wrapper || !canvas) return;

	const rect = wrapper.getBoundingClientRect();
	const px = clientX - rect.left;
	const py = clientY - rect.top;

	// punkt w układzie "przed skalą"
	const contentX = (px - viewOffsetX) / viewScale;
	const contentY = (py - viewOffsetY) / viewScale;

	const newScale = clamp(viewScale * factor, 0.25, 8);

	viewOffsetX = px - contentX * newScale;
	viewOffsetY = py - contentY * newScale;
	viewScale = newScale;

	applyViewTransform();
}

// eksport dla ui.js
window.setZoomMode = setZoomMode;
window.disableZoomMode = disableZoomMode;
window.zoomAtClientPoint = zoomAtClientPoint;

// ===== POMOCNICZE =====

function getActiveCtx() {
	return layers[activeLayerIndex]?.ctx || null;
}

function isActiveLayerLocked() {
	const layer = layers[activeLayerIndex];
	if (!layer) return false;
	// Warstwa tekstowa chroniona przed innymi operacjami niż edycja tekstu i przesuwanie
	if (layer.kind === "text" && !isTextMode && !isMoveMode) return true;
	return !!layer.locked;
}

function rgbToHex(r, g, b) {
	return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

function normalizeRect(r) {
	if (!r) return r;
	const x = Math.min(r.x, r.x + r.w);
	const y = Math.min(r.y, r.y + r.h);
	const w = Math.abs(r.w);
	const h = Math.abs(r.h);
	return { x, y, w, h };
}

function pointInRect(x, y, r) {
	return !!r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

// ===== OVERLAY (zaznaczenie) =====

function ensureSelectionOverlay() {
	if (!canvas || !wrapper) return;
	if (!selectionOverlayCanvas) {
		selectionOverlayCanvas = document.createElement("canvas");
		selectionOverlayCanvas.classList.add("selection-overlay");
		selectionOverlayCanvas.style.position = "absolute";
		selectionOverlayCanvas.style.top = "0";
		selectionOverlayCanvas.style.left = "0";
		selectionOverlayCanvas.style.pointerEvents = "none";
		selectionOverlayCanvas.style.zIndex = "1200";
		wrapper.appendChild(selectionOverlayCanvas);
		selectionOverlayCtx = selectionOverlayCanvas.getContext("2d");
	}
	selectionOverlayCanvas.width = canvas.width;
	selectionOverlayCanvas.height = canvas.height;
	selectionOverlayCanvas.style.width = canvas.style.width;
	selectionOverlayCanvas.style.height = canvas.style.height;
}

function clearSelectionOverlay() {
	if (!selectionOverlayCtx) return;
	selectionOverlayCtx.clearRect(
		0,
		0,
		selectionOverlayCtx.canvas.width,
		selectionOverlayCtx.canvas.height,
	);
}

function drawSelectionRect(rect) {
	if (!rect) return;
	ensureSelectionOverlay();
	clearSelectionOverlay();

	selectionOverlayCtx.save();
	selectionOverlayCtx.strokeStyle = "rgba(0,0,0,0.9)";
	selectionOverlayCtx.lineWidth = 1;
	selectionOverlayCtx.setLineDash([6, 4]);
	selectionOverlayCtx.strokeRect(rect.x, rect.y, rect.w, rect.h);
	selectionOverlayCtx.restore();
}

function drawLassoPath(points, dx = 0, dy = 0, close = true) {
	if (!points || points.length < 2) return;
	ensureSelectionOverlay();
	clearSelectionOverlay();

	selectionOverlayCtx.save();
	selectionOverlayCtx.strokeStyle = "rgba(0,0,0,0.9)";
	selectionOverlayCtx.lineWidth = 1;
	selectionOverlayCtx.setLineDash([6, 4]);

	selectionOverlayCtx.beginPath();
	selectionOverlayCtx.moveTo(points[0].x + dx, points[0].y + dy);
	for (let i = 1; i < points.length; i++) {
		selectionOverlayCtx.lineTo(points[i].x + dx, points[i].y + dy);
	}
	if (close) selectionOverlayCtx.closePath();
	selectionOverlayCtx.stroke();

	selectionOverlayCtx.restore();
}

function buildLassoPath(ctx, points, dx = 0, dy = 0, close = true) {
	if (!ctx || !points || points.length < 2) return;
	ctx.beginPath();
	ctx.moveTo(points[0].x + dx, points[0].y + dy);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x + dx, points[i].y + dy);
	}
	if (close) ctx.closePath();
}

// point in polygon
function pointInPolygon(x, y, points) {
	let inside = false;
	for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
		const xi = points[i].x,
			yi = points[i].y;
		const xj = points[j].x,
			yj = points[j].y;
		const intersect =
			yi > y !== yj > y &&
			x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

// ===== RESETY =====

function resetSelection() {
	isSelectMode = false;
	isDrawingSelection = false;

	selectionRect = null;

	isLassoDrawing = false;
	hasLassoSelection = false;
	lassoPoints = [];
	lassoSelectionPoints = null;
	lassoLastDX = 0;
	lassoLastDY = 0;
	lassoSelectionCanvas = null;

	isMovingSelection = false;
	selectionImageData = null;
	selectionOriginalRect = null;
	layerBeforeMoveCanvas = null;

	isCropMode = false;
	isDrawingCrop = false;
	cropRect = null;

	isTextMode = false;
	isDrawingTextBox = false;
	textBoxRect = null;

	clearSelectionOverlay();
}

function setCurrentTextEditLayerIndex(index) {
	if (
		typeof index === "number" &&
		index >= 0 &&
		index < layers.length &&
		layers[index].kind === "text"
	) {
		currentTextEditLayerIndex = index;
	} else {
		currentTextEditLayerIndex = null;
	}
}
window.setCurrentTextEditLayerIndex = setCurrentTextEditLayerIndex;

// ===== WARSTWY =====

function updateCanvasZOrder() {
	layers.forEach((layer, i) => {
		if (layer.canvas) {
			layer.canvas.style.zIndex = 100 + i;
		}
	});

	// Selection overlay zawsze na wierzchu
	const overlay = wrapper ? wrapper.querySelector(".selection-overlay") : null;
	if (overlay) {
		overlay.style.zIndex = 100 + layers.length + 10;
	}
}

function setActiveLayer(i) {
	if (i < 0 || i >= layers.length) return;
	activeLayerIndex = i;
	ensureLayerPreviewLoop();
	refreshVisibleLayerPreviews();
	syncLayerControlsFromActive();
}

function applyLayerCanvasVisualState(layer) {
	if (!layer || !layer.canvas) return;
	ensureLayerVisualDefaults(layer);
	const tx = Number(layer.offsetX || 0);
	const ty = Number(layer.offsetY || 0);
	const displayScaleX =
		canvas?.width > 0 ? (parseFloat(canvas.style.width) || canvas.width) / canvas.width : 1;
	const displayScaleY =
		canvas?.height > 0 ? (parseFloat(canvas.style.height) || canvas.height) / canvas.height : 1;
	layer.canvas.style.opacity = `${getLayerEffectiveAlpha(layer)}`;
	layer.canvas.style.mixBlendMode = BLEND_MODE_TO_CSS[layer.blendMode] || "normal";
	layer.canvas.style.display = layer.visible ? "block" : "none";
	layer.canvas.style.transform =
		tx || ty ? `translate(${tx * displayScaleX}px, ${ty * displayScaleY}px)` : "none";
}

function drawLayerPreview(layer, previewCanvas) {
	if (!layer?.canvas || !previewCanvas) return;
	const pctx = previewCanvas.getContext("2d");
	if (!pctx) return;

	const pw = previewCanvas.width;
	const ph = previewCanvas.height;
	pctx.clearRect(0, 0, pw, ph);

	// Szachownica tla dla przezroczystosci.
	const tile = 6;
	for (let y = 0; y < ph; y += tile) {
		for (let x = 0; x < pw; x += tile) {
			const dark = ((x / tile + y / tile) & 1) === 0;
			pctx.fillStyle = dark ? "#d8d8d8" : "#f0f0f0";
			pctx.fillRect(x, y, tile, tile);
		}
	}

	const srcW = layer.canvas.width || 1;
	const srcH = layer.canvas.height || 1;
	const scale = Math.min(pw / srcW, ph / srcH);
	const dw = Math.max(1, Math.floor(srcW * scale));
	const dh = Math.max(1, Math.floor(srcH * scale));
	const dx = Math.floor((pw - dw) / 2);
	const dy = Math.floor((ph - dh) / 2);
	pctx.drawImage(layer.canvas, dx, dy, dw, dh);
}

function refreshVisibleLayerPreviews() {
	const list = document.getElementById("layerList");
	if (!list) return;
	const previewCanvases = list.querySelectorAll("canvas.layer-preview");
	if (!previewCanvases.length) return;

	for (let i = 0; i < previewCanvases.length; i++) {
		const previewCanvas = previewCanvases[i];
		const layerId = Number(previewCanvas.dataset.layerId);
		if (!Number.isFinite(layerId)) continue;
		const layer = layers.find(l => l.id === layerId);
		if (!layer) continue;
		drawLayerPreview(layer, previewCanvas);
	}
}

function ensureLayerPreviewLoop() {
	if (layerPreviewRefreshRafId) return;
	const tick = timestamp => {
		const panel = document.querySelector(".layers-panel");
		if (
			panel &&
			!panel.classList.contains("hidden") &&
			timestamp - lastLayerPreviewRefreshAt >= LAYER_PREVIEW_REFRESH_MS
		) {
			refreshVisibleLayerPreviews();
			lastLayerPreviewRefreshAt = timestamp;
		}
		layerPreviewRefreshRafId = requestAnimationFrame(tick);
	};
	layerPreviewRefreshRafId = requestAnimationFrame(tick);
}

function createLayer(name = null, kind = "raster") {
	if (!wrapper || !canvas) {
		console.warn("createLayer: workspace nie jest gotowy.");
		return null;
	}

	const layerCanvas = document.createElement("canvas");
	layerCanvas.className = "layer-canvas";
	layerCanvas.width = canvas.width;
	layerCanvas.height = canvas.height;

	layerCanvas.style.position = "absolute";
	layerCanvas.style.top = "0";
	layerCanvas.style.left = "0";
	layerCanvas.style.width = canvas.style.width;
	layerCanvas.style.height = canvas.style.height;
	layerCanvas.style.pointerEvents = "none";

	const ctx = layerCanvas.getContext("2d");
	if (!ctx) {
		console.error("createLayer: nie można uzyskać kontekstu 2D.");
		return null;
	}

	const layerName = name || `Warstwa ${layers.length + 1}`;

	const newLayer = {
		id: layerIdCounter++,
		canvas: layerCanvas,
		ctx,
		name: layerName,
		visible: true,
		opacity: 100,
		fillOpacity: 100,
		blendMode: "normal",
		locked: false,
		kind,
		adjustmentData: null,
		textData: null,
		shapeData: null,
		offsetX: 0,
		offsetY: 0,
	};

	layers.push(newLayer);
	activeLayerIndex = layers.length - 1;

	// Wstaw canvas PRZED selection overlay, żeby zaznaczenie było zawsze na wierzchu
	const overlay = wrapper.querySelector(".selection-overlay");
	if (overlay) {
		wrapper.insertBefore(layerCanvas, overlay);
	} else {
		wrapper.appendChild(layerCanvas);
	}
	applyLayerCanvasVisualState(newLayer);

	updateCanvasZOrder();
	updateLayerList();

	return newLayer;
}

function beginLayerNameEdit(layer, nameSpan) {
	if (!layer || !nameSpan) return;
	const parent = nameSpan.parentElement;
	if (!parent) return;

	const input = document.createElement("input");
	input.type = "text";
	input.className = "layer-name-input";
	input.value = layer.name || "";
	input.maxLength = 120;
	input.spellcheck = false;

	parent.replaceChild(input, nameSpan);
	input.focus();
	input.select();

	let finished = false;
	const finish = commit => {
		if (finished) return;
		finished = true;
		const nextName = (input.value || "").trim();
		if (commit && nextName) {
			layer.name = nextName;
		}
		updateLayerList();
	};

	const stop = e => e.stopPropagation();
	input.addEventListener("click", stop);
	input.addEventListener("mousedown", stop);
	input.addEventListener("pointerdown", stop);

	input.addEventListener("keydown", e => {
		stop(e);
		if (e.key === "Enter") {
			e.preventDefault();
			finish(true);
		} else if (e.key === "Escape") {
			e.preventDefault();
			finish(false);
		}
	});

	input.addEventListener("blur", () => finish(true));
}

function updateLayerList() {
	const list = document.getElementById("layerList");
	if (!list) return;

	list.innerHTML = "";

	// Renderujemy od góry (najwyższa warstwa pierwsza)
	for (let i = layers.length - 1; i >= 0; i--) {
		const layer = layers[i];
		ensureLayerVisualDefaults(layer);
		applyLayerCanvasVisualState(layer);
		const li = document.createElement("li");
		li.className = "layer-item";
		li.draggable = true;
		li.dataset.layerId = String(layer.id);
		const selectedLayerIds =
			typeof window.getSelectedLayerIds === "function"
				? window.getSelectedLayerIds()
				: [];
		if (Array.isArray(selectedLayerIds) && selectedLayerIds.includes(layer.id)) {
			li.classList.add("selected");
		}

		if (i === activeLayerIndex) li.classList.add("active");
		if (layer.locked) li.classList.add("locked-layer");

		// ── lewa strona: kłódka + nazwa ──
		const leftBox = document.createElement("div");
		leftBox.className = "layer-left";
		const preview = document.createElement("canvas");
		preview.className = "layer-preview";
		preview.width = 44;
		preview.height = 28;
		preview.dataset.layerId = String(layer.id);
		drawLayerPreview(layer, preview);
		leftBox.appendChild(preview);

		const lockBtn = document.createElement("button");
		lockBtn.type = "button";
		lockBtn.className = "layer-lock-btn" + (layer.locked ? " locked" : "");
		lockBtn.title = layer.locked ? "Odblokuj warstwę" : "Zablokuj warstwę";
		lockBtn.addEventListener("click", e => {
			e.stopPropagation();
			layer.locked = !layer.locked;
			updateLayerList();
		});

		const nameSpan = document.createElement("span");
		nameSpan.className = "layer-name-label";
		nameSpan.textContent = layer.name;
		nameSpan.title = "Dwuklik aby zmienić nazwę";
		nameSpan.addEventListener("dblclick", e => {
			e.stopPropagation();
			beginLayerNameEdit(layer, nameSpan);
		});

		leftBox.appendChild(lockBtn);
		leftBox.appendChild(nameSpan);

		// ── prawa strona: oko + kosz ──
		const actions = document.createElement("div");
		actions.className = "layer-actions";

		const eyeBtn = document.createElement("button");
		eyeBtn.type = "button";
		eyeBtn.className = "layer-eye-btn" + (!layer.visible ? " hidden-eye" : "");
		eyeBtn.title = layer.visible ? "Ukryj warstwę" : "Pokaż warstwę";
		eyeBtn.addEventListener("click", e => {
			e.stopPropagation();
			layer.visible = !layer.visible;
			applyLayerCanvasVisualState(layer);
			updateLayerList();
		});

		const trashBtn = document.createElement("button");
		trashBtn.type = "button";
		trashBtn.className = "layer-trash-btn";
		trashBtn.title = "Usuń warstwę";
		trashBtn.addEventListener("click", e => {
			e.stopPropagation();
			removeLayer(i);
		});

		actions.appendChild(eyeBtn);
		actions.appendChild(trashBtn);
		const mainRow = document.createElement("div");
		mainRow.className = "layer-main";
		mainRow.appendChild(leftBox);
		mainRow.appendChild(actions);
		li.appendChild(mainRow);

		// kliknięcie w wiersz = aktywna warstwa
		li.addEventListener("click", e => {
			if (typeof window.handleLayerItemClick === "function") {
				const handled = window.handleLayerItemClick(e, {
					layerId: layer.id,
					layerIndex: i,
				});
				if (handled) return;
			}
			const listEl = li.parentElement;
			if (listEl) {
				listEl
					.querySelectorAll("li.layer-item.active")
					.forEach(el => el.classList.remove("active"));
				li.classList.add("active");
			}
			setActiveLayer(i);
		});

		list.appendChild(li);
	}
	ensureLayerPreviewLoop();
	refreshVisibleLayerPreviews();
	syncLayerControlsFromActive();
}

function removeLayer(index) {
	if (layers.length <= 1) {
		console.warn("removeLayer: nie można usunąć ostatniej warstwy.");
		return;
	}
	if (index < 0 || index >= layers.length) return;

	const removed = layers.splice(index, 1)[0];
	if (removed?.canvas) removed.canvas.remove();

	// Napraw currentTextEditLayerIndex
	if (currentTextEditLayerIndex === index) {
		currentTextEditLayerIndex = null;
	} else if (currentTextEditLayerIndex > index) {
		currentTextEditLayerIndex--;
	}

	// Napraw activeLayerIndex
	if (activeLayerIndex >= layers.length) {
		activeLayerIndex = layers.length - 1;
	}

	updateCanvasZOrder();
	updateLayerList();
}

// ===== UNDO / REDO =====

function saveState() {
	if (isActiveLayerLocked()) return;
	const ctx = getActiveCtx();
	if (!ctx) return;
	undoStack.push(ctx.canvas.toDataURL());
	if (undoStack.length > 50) undoStack.shift();
	redoStack.length = 0;
	documentRedoStack.length = 0;
}

function cloneImageDataSafe(imageData) {
	if (!(imageData instanceof ImageData)) return imageData;
	return new ImageData(
		new Uint8ClampedArray(imageData.data),
		imageData.width,
		imageData.height,
	);
}

function deepCloneDocumentValue(value) {
	if (value == null) return value;
	if (value instanceof ImageData) return cloneImageDataSafe(value);
	if (typeof structuredClone === "function") {
		try {
			return structuredClone(value);
		} catch (_) {
			// fallback poniżej
		}
	}
	if (Array.isArray(value)) return value.map(v => deepCloneDocumentValue(v));
	if (typeof value === "object") {
		const out = {};
		Object.keys(value).forEach(key => {
			out[key] = deepCloneDocumentValue(value[key]);
		});
		return out;
	}
	return value;
}

function snapshotDocumentState() {
	if (!canvas) return null;
	return {
		activeLayerIndex,
		layerIdCounter,
		currentTextEditLayerIndex,
		layers: layers.map(layer => ({
			id: layer.id,
			name: layer.name,
			visible: layer.visible,
			opacity: layer.opacity,
			fillOpacity: layer.fillOpacity,
			blendMode: layer.blendMode,
			locked: layer.locked,
			kind: layer.kind,
			adjustmentData: deepCloneDocumentValue(layer.adjustmentData),
			textData: deepCloneDocumentValue(layer.textData),
			shapeData: deepCloneDocumentValue(layer.shapeData),
			offsetX: layer.offsetX || 0,
			offsetY: layer.offsetY || 0,
			canvasWidth: layer.canvas?.width || canvas.width,
			canvasHeight: layer.canvas?.height || canvas.height,
			imageDataURL: layer.canvas ? layer.canvas.toDataURL() : null,
		})),
	};
}

function loadImageFromDataURL(dataURL) {
	return new Promise(resolve => {
		if (!dataURL) {
			resolve(null);
			return;
		}
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => resolve(null);
		img.src = dataURL;
	});
}

async function restoreDocumentState(snapshot) {
	if (!snapshot || !wrapper || !canvas || isRestoringDocumentState) return;
	isRestoringDocumentState = true;
	try {
		wrapper.querySelectorAll(".layer-canvas").forEach(c => c.remove());
		const overlay = wrapper.querySelector(".selection-overlay");
		const rebuiltLayers = [];

		for (let i = 0; i < snapshot.layers.length; i++) {
			const src = snapshot.layers[i];
			const layerCanvas = document.createElement("canvas");
			layerCanvas.className = "layer-canvas";
			layerCanvas.width = Math.max(1, Number(src.canvasWidth || canvas.width));
			layerCanvas.height = Math.max(1, Number(src.canvasHeight || canvas.height));
			layerCanvas.style.position = "absolute";
			layerCanvas.style.top = "0";
			layerCanvas.style.left = "0";
			const displayScaleX =
				canvas.width > 0 ? (parseFloat(canvas.style.width) || canvas.width) / canvas.width : 1;
			const displayScaleY =
				canvas.height > 0
					? (parseFloat(canvas.style.height) || canvas.height) / canvas.height
					: 1;
			layerCanvas.style.width = `${layerCanvas.width * displayScaleX}px`;
			layerCanvas.style.height = `${layerCanvas.height * displayScaleY}px`;
			layerCanvas.style.pointerEvents = "none";

			const ctx = layerCanvas.getContext("2d");
			if (!ctx) continue;

			const img = await loadImageFromDataURL(src.imageDataURL);
			if (img) {
				ctx.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
				ctx.drawImage(img, 0, 0);
			}

			const layer = {
				id: src.id,
				canvas: layerCanvas,
				ctx,
				name: src.name,
				visible: src.visible !== false,
				opacity: Number.isFinite(src.opacity) ? src.opacity : 100,
				fillOpacity: Number.isFinite(src.fillOpacity) ? src.fillOpacity : 100,
				blendMode: src.blendMode || "normal",
				locked: !!src.locked,
				kind: src.kind || "raster",
				adjustmentData: deepCloneDocumentValue(src.adjustmentData),
				textData: deepCloneDocumentValue(src.textData),
				shapeData: deepCloneDocumentValue(src.shapeData),
				offsetX: src.offsetX || 0,
				offsetY: src.offsetY || 0,
			};

			if (overlay) {
				wrapper.insertBefore(layerCanvas, overlay);
			} else {
				wrapper.appendChild(layerCanvas);
			}
			applyLayerCanvasVisualState(layer);
			rebuiltLayers.push(layer);
		}

		layers = rebuiltLayers;
		if (!layers.length) {
			createLayer();
		}

		const maxLayerId = layers.reduce((max, l) => Math.max(max, l.id || 0), 0);
		layerIdCounter = Math.max(snapshot.layerIdCounter || 1, maxLayerId + 1);
		activeLayerIndex = Math.max(0, Math.min(layers.length - 1, snapshot.activeLayerIndex || 0));
		if (
			typeof snapshot.currentTextEditLayerIndex === "number" &&
			snapshot.currentTextEditLayerIndex >= 0 &&
			snapshot.currentTextEditLayerIndex < layers.length
		) {
			currentTextEditLayerIndex = snapshot.currentTextEditLayerIndex;
		} else {
			currentTextEditLayerIndex = null;
		}

		updateCanvasZOrder();
		updateLayerList();
	} finally {
		isRestoringDocumentState = false;
	}
}

function saveDocumentState() {
	const snapshot = snapshotDocumentState();
	if (!snapshot) return;
	documentUndoStack.push(snapshot);
	if (documentUndoStack.length > 50) documentUndoStack.shift();
	documentRedoStack.length = 0;
}

function loadImage(dataURL) {
	const img = new Image();
	img.onload = () => {
		const ctx = getActiveCtx();
		if (!ctx || isActiveLayerLocked()) return;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(img, 0, 0);
	};
	img.src = dataURL;
}

function undo() {
	if (isRestoringDocumentState) return;
	if (documentUndoStack.length > 0) {
		const current = snapshotDocumentState();
		if (current) {
			documentRedoStack.push(current);
			if (documentRedoStack.length > 50) documentRedoStack.shift();
		}
		restoreDocumentState(documentUndoStack.pop());
		return;
	}
	const ctx = getActiveCtx();
	if (!ctx) return;
	if (undoStack.length > 0) {
		redoStack.push(ctx.canvas.toDataURL());
		loadImage(undoStack.pop());
	}
}

function redo() {
	if (isRestoringDocumentState) return;
	if (documentRedoStack.length > 0) {
		const current = snapshotDocumentState();
		if (current) {
			documentUndoStack.push(current);
			if (documentUndoStack.length > 50) documentUndoStack.shift();
		}
		restoreDocumentState(documentRedoStack.pop());
		return;
	}
	const ctx = getActiveCtx();
	if (!ctx) return;
	if (redoStack.length > 0) {
		undoStack.push(ctx.canvas.toDataURL());
		loadImage(redoStack.pop());
	}
}

// ===== INICJALIZACJA OBSZARU =====

function initWorkspace(width, height) {
	canvas.width = width;
	canvas.height = height;

	const maxWidth = window.innerWidth * 0.8;
	const maxHeight = window.innerHeight * 0.8;
	const scale = Math.min(maxWidth / width, maxHeight / height, 1);

	canvas.style.width = width * scale + "px";
	canvas.style.height = height * scale + "px";

	wrapper.style.width = canvas.style.width;
	wrapper.style.height = canvas.style.height;

	// reset zoomu
	viewScale = 1;
	viewOffsetX = 0;
	viewOffsetY = 0;
	applyViewTransform();

	// wyczyść warstwy
	wrapper.querySelectorAll(".layer-canvas").forEach(c => c.remove());
	layers = [];
	activeLayerIndex = 0;
	layerIdCounter = 1;
	currentTextEditLayerIndex = null;

	undoStack.length = 0;
	redoStack.length = 0;
	documentUndoStack.length = 0;
	documentRedoStack.length = 0;

	resetSelection();
	ensureSelectionOverlay();

	modal.style.display = "none";
	mainLayout.classList.remove("hidden");
	toolbar.classList.remove("hidden");
	title.classList.remove("hidden");
	menu.classList.remove("hidden");
	document.querySelector(".layers-panel")?.classList.remove("hidden");
	if (toolbarToggle) toolbarToggle.classList.remove("hidden");
	bindLayersPanelControls();

	createLayer(); // Warstwa 1
	updateCanvasZOrder();
	saveState();
	updateLayerList();
}


// ===== RYSOWANIE / NARZĘDZIA =====

function drawBrushStroke(ctx, x, y) {
	const sizeEl = document.getElementById("brushSize");
	const size = sizeEl ? parseInt(sizeEl.value, 10) : 8;
	ctx.lineWidth = size;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = strokeColorInput?.value || "#000";
	ctx.beginPath();
	ctx.lineTo(x, y);
	ctx.stroke();
}

function createShapeLayer() {
	const kindMap = {
		rectangle: { kind: "shape-rect", label: "Prostokąt" },
		roundRect: { kind: "shape-roundRect", label: "Zaokrąglony prostokąt" },
		ellipse: { kind: "shape-ellipse", label: "Elipsa" },
		line: { kind: "shape-line", label: "Linia" },
	};
	const info = kindMap[selectedShape] || { kind: "shape", label: "Kształt" };
	const count = layers.filter(l => l.kind === info.kind).length + 1;
	return createLayer(`${info.label} ${count}`, info.kind);
}

function renderShapeLayer(layer) {
	if (!layer || !layer.ctx || !layer.shapeData) return;

	const ctx = layer.ctx;
	const data = layer.shapeData;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	const lineWidth = data.lineWidth || 2;
	const strokeColor = data.strokeColor || "#000000";
	const fillColor = data.fillColor || "#ffffff";

	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	const type = data.type;

	if (type === "rectangle") {
		ctx.beginPath();
		ctx.rect(data.x, data.y, data.w, data.h);
		ctx.fill();
		ctx.stroke();
		return;
	}

	if (type === "roundRect") {
		const r = Math.max(0, Math.min(data.radius || 0, Math.min(data.w / 2, data.h / 2)));
		const x = data.x;
		const y = data.y;
		const w = data.w;
		const h = data.h;

		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		return;
	}

	if (type === "ellipse") {
		ctx.beginPath();
		const cx = data.x + data.w / 2;
		const cy = data.y + data.h / 2;
		ctx.ellipse(cx, cy, Math.abs(data.w / 2), Math.abs(data.h / 2), 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		return;
	}

	if (type === "line") {
		ctx.beginPath();
		ctx.moveTo(data.x1, data.y1);
		ctx.lineTo(data.x2, data.y2);
		ctx.stroke();
		return;
	}
}

function drawShape(x1, y1, x2, y2) {
	if (!selectedShape) return;
	const layer = createShapeLayer();
	const ctx = layer?.ctx;
	if (!ctx) return;

	saveState();

	const strokeColor = strokeColorInput?.value || "#000000";
	const fillColor = fillColorInput?.value || "#ffffff";
	const sizeEl = document.getElementById("brushSize");
	const lineWidth = sizeEl ? parseInt(sizeEl.value, 10) : 2;

	const minX = Math.min(x1, x2);
	const minY = Math.min(y1, y2);
	const w = Math.abs(x2 - x1);
	const h = Math.abs(y2 - y1);

	const baseData = {
		lineWidth,
		strokeColor,
		fillColor,
	};

	if (selectedShape === "rectangle") {
		layer.shapeData = {
			...baseData,
			type: "rectangle",
			x: minX,
			y: minY,
			w,
			h,
		};
	} else if (selectedShape === "roundRect") {
		const r = Math.min(20, w / 5, h / 5);
		layer.shapeData = {
			...baseData,
			type: "roundRect",
			x: minX,
			y: minY,
			w,
			h,
			radius: r,
		};
	} else if (selectedShape === "ellipse") {
		layer.shapeData = {
			...baseData,
			type: "ellipse",
			x: minX,
			y: minY,
			w,
			h,
		};
	} else if (selectedShape === "line") {
		layer.shapeData = {
			...baseData,
			type: "line",
			x1,
			y1,
			x2,
			y2,
		};
	}

	renderShapeLayer(layer);

	if (window.showShapePanelForLayer) {
		window.showShapePanelForLayer(layer.id);
	}
}

// ===== TEKST OVERLAY =====

function removeTextOverlay() {
	if (textOverlay) {
		textOverlay.remove();
		textOverlay = null;
	}
}

function isEventOnTextOverlay(e) {
	return !!(
		e?.target &&
		(e.target === textOverlay || e.target.closest?.(".text-overlay"))
	);
}

function findTextLayerAtCanvasPos(x, y) {
	for (let i = layers.length - 1; i >= 0; i--) {
		const layer = layers[i];
		if (layer.kind !== "text" || !layer.textData) continue;
		const r = layer.textData.rect;
		if (r && pointInRect(x, y, r)) return { index: i, layer, rect: r };
	}
	return null;
}

function createTextOverlayForRect(rect, initialText = "") {
	removeTextOverlay();
	if (!wrapper) return;

	textOverlay = document.createElement("textarea");
	textOverlay.className = "text-overlay";
	textOverlay.style.position = "absolute";
	textOverlay.style.left = rect.x + "px";
	textOverlay.style.top = rect.y + "px";
	textOverlay.style.width = rect.w + "px";
	textOverlay.style.height = rect.h + "px";
	textOverlay.style.zIndex = 2000;

	textOverlay.value = initialText;

	wrapper.appendChild(textOverlay);
	textOverlay.focus();
}

function commitTextOverlayToLayer() {
	if (!textOverlay) return;
	const text = textOverlay.value || "";
	if (!textBoxRect) return;

	// twórz warstwę tekstową
	const count = layers.filter(l => l.kind === "text").length + 1;
	createLayer(`Tekst ${count}`, "text");
	const layer = layers[activeLayerIndex];

	layer.textData = {
		text,
		rect: { ...textBoxRect },
		fontFamily: document.getElementById("fontFamily")?.value || "Segoe UI",
		fontSize: parseInt(document.getElementById("fontSize")?.value || "24", 10),
		color: document.getElementById("textColor")?.value || "#000000",
		align: "left",
	};

	const ctx = layer.ctx;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = layer.textData.color;
	ctx.textBaseline = "top";
	ctx.textAlign = "left";
	ctx.font = `${layer.textData.fontSize}px ${layer.textData.fontFamily}`;

	// prosty render (bez łamania na słowa)
	const padding = 4;
	const lines = text.split("\n");
	let yy = textBoxRect.y + padding;
	for (const line of lines) {
		ctx.fillText(line, textBoxRect.x + padding, yy);
		yy += layer.textData.fontSize + 4;
	}

	removeTextOverlay();
	textBoxRect = null;
	saveState();
	updateLayerList();
}

function buildCanvasFont(options = {}) {
	const size = Math.max(1, parseInt(options.fontSize, 10) || 24);
	const baseFamily = options.fontFamily || "Segoe UI";
	const weight = options.bold ? 700 : 400;
	const style = options.italic ? "italic" : "normal";
	const variant = options.smallCaps ? "small-caps" : "normal";
	return { fontString: `${style} ${variant} ${weight} ${size}px ${baseFamily}`, size };
}

function applyTextBox(rect, rawText, options = {}) {
	if (!canvas || !wrapper) return;

	const norm = normalizeRect(rect);
	if (!norm || norm.w < 1 || norm.h < 1) return;

	const text = (rawText ?? "").replace(/\r\n/g, "\n");
	if (!text.trim()) return;

	let targetIndex =
		typeof options.layerIndex === "number" ? options.layerIndex : null;
	let layer = null;

	if (
		targetIndex !== null &&
		layers[targetIndex] &&
		layers[targetIndex].kind === "text" &&
		!layers[targetIndex].locked
	) {
		layer = layers[targetIndex];
		activeLayerIndex = targetIndex;
	} else {
		const count = layers.filter(l => l.kind === "text").length + 1;
		layer = createLayer(`Tekst ${count}`, "text");
	}

	if (!layer || !layer.ctx) return;

	const ctx = layer.ctx;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	const { fontString, size } = buildCanvasFont(options);
	const align = options.align || "left";
	const color = options.color || "#000000";
	const lineHeight =
		typeof options.lineHeight === "number" && options.lineHeight > 0
			? options.lineHeight
			: size + 4;
	const padding = 4;
	const scaleX = (options.scaleX || 100) / 100;
	const scaleY = (options.scaleY || 100) / 100;

	ctx.save();
	ctx.fillStyle = color;
	ctx.textBaseline = "top";
	ctx.textAlign = align;
	ctx.font = fontString;

	// transform so the text respects scale sliders
	ctx.translate(norm.x, norm.y);
	ctx.scale(scaleX, scaleY);

	let y = padding;
	const lines = text.split("\n");
	for (const line of lines) {
		const x = align === "center" ? norm.w / 2 : align === "right" ? norm.w - padding : padding;
		ctx.fillText(line, x, y);
		y += lineHeight;
	}

	ctx.restore();

	layer.kind = "text";
	layer.textData = {
		text,
		rect: { ...norm },
		fontFamily: options.fontFamily || "Segoe UI",
		fontSize: size,
		color,
		align,
		options: { ...options },
	};

	saveState();
	updateLayerList();
}

// ===== KADROWANIE =====

function cropToRect(r) {
	if (!r) return;
	const rect = normalizeRect(r);
	if (rect.w < 5 || rect.h < 5) return;

	// Kadrujemy każdą warstwę do prostokąta
	const newW = Math.floor(rect.w);
	const newH = Math.floor(rect.h);

	canvas.width = newW;
	canvas.height = newH;

	const maxWidth = window.innerWidth * 0.8;
	const maxHeight = window.innerHeight * 0.8;
	const scale = Math.min(maxWidth / newW, maxHeight / newH, 1);

	canvas.style.width = newW * scale + "px";
	canvas.style.height = newH * scale + "px";
	wrapper.style.width = canvas.style.width;
	wrapper.style.height = canvas.style.height;

	layers.forEach(layer => {
		const old = layer.canvas;
		const tmp = document.createElement("canvas");
		tmp.width = newW;
		tmp.height = newH;
		const tctx = tmp.getContext("2d");
		tctx.drawImage(old, rect.x, rect.y, rect.w, rect.h, 0, 0, newW, newH);

		old.width = newW;
		old.height = newH;
		old.style.width = canvas.style.width;
		old.style.height = canvas.style.height;

		const ctx = old.getContext("2d");
		ctx.clearRect(0, 0, newW, newH);
		ctx.drawImage(tmp, 0, 0);
		layer.ctx = ctx;
	});

	ensureSelectionOverlay();
	clearSelectionOverlay();
	isCropMode = false;
	isDrawingCrop = false;
	cropRect = null;

	// reset zoom po cropie
	viewScale = 1;
	viewOffsetX = 0;
	viewOffsetY = 0;
	applyViewTransform();

	saveState();
	updateLayerList();
}

// ===== PUBLIC API (dla menu HTML onclick) =====
window.initWorkspace = initWorkspace;
window.createLayer = createLayer;
window.updateLayerList = updateLayerList;
window.updateCanvasZOrder = updateCanvasZOrder;
window.saveState = saveState;
window.saveDocumentState = saveDocumentState;
window.undo = undo;
window.redo = redo;
window.applyTextBox = applyTextBox;
window.exportDocumentSnapshot = snapshotDocumentState;
window.importDocumentSnapshot = restoreDocumentState;

window.clearCanvas = function () {
	const ctx = getActiveCtx();
	if (!ctx) return;
	if (isActiveLayerLocked()) return;
	saveState();
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

window.fillWithColor = function () {
	const ctx = getActiveCtx();
	if (!ctx) return;
	if (isActiveLayerLocked()) return;
	saveState();
	ctx.fillStyle = fillColorInput?.value || "#ffffff";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function compositeLayersToContext(targetCtx) {
	if (!targetCtx || !canvas) return;
	targetCtx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < layers.length; i++) {
		const layer = layers[i];
		if (!layer?.canvas || !layer.visible) continue;
		ensureLayerVisualDefaults(layer);
		targetCtx.save();
		targetCtx.globalCompositeOperation =
			BLEND_MODE_TO_CANVAS[layer.blendMode] || "source-over";
		targetCtx.globalAlpha = getLayerEffectiveAlpha(layer);
		targetCtx.drawImage(
			layer.canvas,
			Math.round(Number(layer.offsetX || 0)),
			Math.round(Number(layer.offsetY || 0)),
		);
		targetCtx.restore();
	}
}

window.saveImage = function () {
	// zapis do localStorage pełnego "spłaszczenia"
	const tmp = document.createElement("canvas");
	tmp.width = canvas.width;
	tmp.height = canvas.height;
	const tctx = tmp.getContext("2d");
	compositeLayersToContext(tctx);
	localStorage.setItem("radstrowo_image", tmp.toDataURL("image/png"));
};

window.downloadImage = function () {
	const tmp = document.createElement("canvas");
	tmp.width = canvas.width;
	tmp.height = canvas.height;
	const tctx = tmp.getContext("2d");
	compositeLayersToContext(tctx);
	const a = document.createElement("a");
	a.href = tmp.toDataURL("image/png");
	a.download = "radstrowo.png";
	a.click();
};

window.createLayer = createLayer;
window.updateLayerList = updateLayerList;
window.updateCanvasZOrder = updateCanvasZOrder;
window.removeLayer = removeLayer;
window.renderShapeLayer = renderShapeLayer;
window.getLayerById = function (id) {
	return layers.find(l => l.id === id) || null;
};
