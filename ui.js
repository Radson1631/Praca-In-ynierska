	// PODSTAWOWE REFERENCJE Z DOM
	modal = document.getElementById("dimensionModal");
	setBtn = document.getElementById("setDimensions");
	canvas = document.getElementById("canvas");
	widthInput = document.getElementById("width");
	heightInput = document.getElementById("height");

	toolbar = document.querySelector(".toolbar-panel");
	title = document.querySelector(".left-title");
	menu = document.querySelector(".menu-bar");
	const mobileMenuToggle = document.getElementById("mobileMenuToggle");
	shapeButton = document.getElementById("shapeButton");
	shapeOptions = document.querySelector(".shape-options");
	wrapper = canvas.parentElement;
	const centerPanel = document.querySelector(".center-panel");
	brushToolBtn = document.getElementById("brushTool");
	const canvasGrid = document.getElementById("canvasGrid");
	const workspaceRulers = document.getElementById("workspaceRulers");
	const rulerTop = document.getElementById("rulerTop");
	const rulerLeft = document.getElementById("rulerLeft");
	const workspaceContextMenu = document.getElementById("workspaceContextMenu");
	const toggleGridMenuItem = document.getElementById("toggleGridMenuItem");
	const toggleRulerMenuItem = document.getElementById("toggleRulerMenuItem");
	let createSelectionFromPenMenuItem = null;
	let clearSelectionMenuItem = null;

	mainLayout = document.querySelector(".main-layout");
	fileInput = document.getElementById("fileInput");
	openFileBtn = document.getElementById("openFileBtn");
	newFileBtn = document.getElementById("newFile");

	strokeColorInput = document.getElementById("strokeColor");
	fillColorInput = document.getElementById("fillColor");
	pipetteTool = document.getElementById("pipetteTool");

	const selectToolBtn = document.getElementById("selectTool");
	const selectOptions = document.querySelector(".select-options");
	const zoomToolBtn = document.getElementById("zoomTool");
	const zoomOptions = document.querySelector(".zoom-options");
	const repairToolBtn = document.getElementById("repairTool");
	const repairOptions = document.querySelector(".repair-options");
	const penToolBtn = document.getElementById("penTool");
	const penOptions = document.querySelector(".pen-options");
	const brushOptions = document.querySelector(".brush-options");
	const cropBtn = document.getElementById("cropTool");
	const textToolBtn = document.getElementById("textTool");
	const workspaceSizeToolBtn = document.getElementById("workspaceSizeTool");
	const layerListEl = document.getElementById("layerList");
	const layersPanel = document.querySelector(".layers-panel");
	const layersHeader = document.querySelector(".layers-header");
	const layersPanelCloseBtn = document.getElementById("layersPanelClose");
	const layersContextMenu = document.getElementById("layersContextMenu");
	const mergeSelectedLayersMenuItem = document.getElementById("mergeSelectedLayersMenuItem");

	// PANEL FIGURY
	const shapePanel = document.getElementById("shapePanel");
	const shapePanelCloseBtn = document.getElementById("shapePanelClose");
	const shapePanelHeader = shapePanel
		? shapePanel.querySelector(".shape-panel-header")
		: null;
	const shapeStrokeWidthInput = document.getElementById("shapeStrokeWidth");
	const shapeCornerRadiusInput = document.getElementById("shapeCornerRadius");
	let currentShapeLayerId = null;

	// MENU OKNO -> TYPOGRAFIA
	const menuTypografia = document.getElementById("menuTypografia");
	const menuWarstwy = document.getElementById("menuWarstwy");
	const menuPedzel = document.getElementById("menuPedzel");
	const menuKorektor = document.getElementById("menuKorektor");
	const menuFigura = document.getElementById("menuFigura");
	const menuCompactMode = document.getElementById("menuCompactMode");
	const COMPACT_MODE_STORAGE_KEY = "radstrowo.compactMode";
	let compactModeEnabled = false;
	const transformScaleMenuItem = document.getElementById("transformScale");
	const transformRotateMenuItem = document.getElementById("transformRotate");
	const transformRotate90MenuItem = document.getElementById("transformRotate90");
	const transformRotate180MenuItem = document.getElementById("transformRotate180");
	const transformSkewMenuItem = document.getElementById("transformSkew");
	const transformFlipHMenuItem = document.getElementById("transformFlipH");
	const transformFlipVMenuItem = document.getElementById("transformFlipV");
	const transformScaleModal = document.getElementById("transformScaleModal");
	const transformScaleXInput = document.getElementById("transformScaleXInput");
	const transformScaleYInput = document.getElementById("transformScaleYInput");
	const transformScaleLock = document.getElementById("transformScaleLock");
	const transformScaleApplyBtn = document.getElementById("transformScaleApply");
	const transformScaleCancelBtn = document.getElementById("transformScaleCancel");
	const transformScaleManualBtn = document.getElementById("transformScaleManual");
	const transformRotateModal = document.getElementById("transformRotateModal");
	const transformRotateAngleInput = document.getElementById("transformRotateAngleInput");
	const transformRotateAngleRange = document.getElementById("transformRotateAngleRange");
	const transformRotateApplyBtn = document.getElementById("transformRotateApply");
	const transformRotateCancelBtn = document.getElementById("transformRotateCancel");
	const transformRotateManualBtn = document.getElementById("transformRotateManual");

	// PANEL TEKSTU
	const textPanel = document.getElementById("textPanel");
	const textPanelHeader = textPanel
		? textPanel.querySelector(".text-panel-header")
		: null;
	const textPanelCloseBtn = document.getElementById("textPanelClose");
	const fontFamilySelect = document.getElementById("fontFamily");
	const fontSizeInput = document.getElementById("fontSize");
	const fontStyleSelect = document.getElementById("fontStyleSelect");
	const lineHeightInput = document.getElementById("lineHeight");
	const kerningSelect = document.getElementById("kerning");
	const letterSpacingInput = document.getElementById("letterSpacing");
	const baselineShiftInput = document.getElementById("baselineShift");
	const scaleXInput = document.getElementById("scaleX");
	const scaleYInput = document.getElementById("scaleY");
	const textColorInput = document.getElementById("textColor");
	const alignButtons = document.querySelectorAll(".align-buttons button");
	const styleToggleButtons = document.querySelectorAll("[data-toggle-style]");
	let currentAlign = "left";
	const fontFallbackStack =
		'Calibri, Cambria, "Trebuchet MS", Tahoma, "Century Gothic", Garamond, Arial, sans-serif';

	// PANEL PÄDZLA
	const brushPanel = document.getElementById("brushPanel");
	const brushPanelCloseBtn = document.getElementById("brushPanelClose");
	const brushSizeControl = document.getElementById("brushSizeControl");
	const brushHardnessControl = document.getElementById("brushHardnessControl");
	const brushSpacingControl = document.getElementById("brushSpacing");
	const brushAngleControl = document.getElementById("brushAngle");
	const brushRoundnessControl = document.getElementById("brushRoundness");
	const brushSmoothingControl = document.getElementById("brushSmoothing");
	const brushKeepTextureControl = document.getElementById("brushKeepTexture");
	const brushFlipXControl = document.getElementById("brushFlipX");
	const brushFlipYControl = document.getElementById("brushFlipY");
	const brushPreviewCanvas = document.getElementById("brushPreview");
	const brushPresets = document.querySelectorAll(".preset");
	const brushTypeButtons = document.querySelectorAll(".brush-type-btn");
	const brushPanelHeader = brushPanel
		? brushPanel.querySelector(".brush-panel-header")
		: null;
	const toolbarBrushSize = document.getElementById("brushSize");

	// PANEL KOREKT
	const adjustPanel = document.getElementById("adjustPanel");
	const adjustPanelCloseBtn = document.getElementById("adjustPanelClose");
	const adjustPanelHeader = adjustPanel
		? adjustPanel.querySelector(".adjust-panel-header")
		: null;
	const adjustButtons = document.querySelectorAll(".adjust-btn");
	const adjustValueInput = document.getElementById("adjustValue");
	const adjustValueLabel = document.getElementById("adjustValueLabel");
	const adjustValueText = document.getElementById("adjustValueText");
	const adjustControlRow2 = document.getElementById("adjustControlRow2");
	const adjustValueInput2 = document.getElementById("adjustValue2");
	const adjustValueLabel2 = document.getElementById("adjustValueLabel2");
	const adjustValueText2 = document.getElementById("adjustValueText2");
	const adjustCurvesWrap = document.getElementById("adjustCurvesWrap");
	const adjustCurvesCanvas = document.getElementById("adjustCurvesCanvas");
	const adjustCurvesResetBtn = document.getElementById("adjustCurvesReset");
	const adjustCurvesChannelSelect = document.getElementById("adjustCurvesChannelSelect");
	const adjustExposureWrap = document.getElementById("adjustExposureWrap");
	const adjustExposureInput = document.getElementById("adjustExposureValue");
	const adjustExposureText = document.getElementById("adjustExposureText");
	const adjustOffsetInput = document.getElementById("adjustOffsetValue");
	const adjustOffsetText = document.getElementById("adjustOffsetText");
	const adjustGammaInput = document.getElementById("adjustGammaValue");
	const adjustGammaText = document.getElementById("adjustGammaText");
	const adjustHueWrap = document.getElementById("adjustHueWrap");
	const adjustHuePresetSelect = document.getElementById("adjustHuePresetSelect");
	const adjustHueRangeSelect = document.getElementById("adjustHueRangeSelect");
	const adjustHueInput = document.getElementById("adjustHueValue");
	const adjustHueText = document.getElementById("adjustHueText");
	const adjustHueSaturationInput = document.getElementById("adjustHueSaturationValue");
	const adjustHueSaturationText = document.getElementById("adjustHueSaturationText");
	const adjustHueLightnessInput = document.getElementById("adjustHueLightnessValue");
	const adjustHueLightnessText = document.getElementById("adjustHueLightnessText");
	const adjustColorBalanceWrap = document.getElementById("adjustColorBalanceWrap");
	const adjustColorBalanceTone = document.getElementById("adjustColorBalanceTone");
	const adjustColorBalanceCyanRedInput = document.getElementById("adjustColorBalanceCyanRed");
	const adjustColorBalanceCyanRedText = document.getElementById(
		"adjustColorBalanceCyanRedText",
	);
	const adjustColorBalanceMagentaGreenInput = document.getElementById(
		"adjustColorBalanceMagentaGreen",
	);
	const adjustColorBalanceMagentaGreenText = document.getElementById(
		"adjustColorBalanceMagentaGreenText",
	);
	const adjustColorBalanceYellowBlueInput = document.getElementById(
		"adjustColorBalanceYellowBlue",
	);
	const adjustColorBalanceYellowBlueText = document.getElementById(
		"adjustColorBalanceYellowBlueText",
	);
	const adjustColorBalancePreserveLuminosityInput = document.getElementById(
		"adjustColorBalancePreserveLuminosity",
	);
	const adjustBlackWhiteWrap = document.getElementById("adjustBlackWhiteWrap");
	const adjustBlackWhitePresetSelect = document.getElementById(
		"adjustBlackWhitePresetSelect",
	);
	const adjustBlackWhiteTintEnabledInput = document.getElementById(
		"adjustBlackWhiteTintEnabled",
	);
	const adjustBlackWhiteTintColorInput = document.getElementById(
		"adjustBlackWhiteTintColor",
	);
	const adjustBwRedsInput = document.getElementById("adjustBwReds");
	const adjustBwRedsText = document.getElementById("adjustBwRedsText");
	const adjustBwYellowsInput = document.getElementById("adjustBwYellows");
	const adjustBwYellowsText = document.getElementById("adjustBwYellowsText");
	const adjustBwGreensInput = document.getElementById("adjustBwGreens");
	const adjustBwGreensText = document.getElementById("adjustBwGreensText");
	const adjustBwCyansInput = document.getElementById("adjustBwCyans");
	const adjustBwCyansText = document.getElementById("adjustBwCyansText");
	const adjustBwBluesInput = document.getElementById("adjustBwBlues");
	const adjustBwBluesText = document.getElementById("adjustBwBluesText");
	const adjustBwMagentasInput = document.getElementById("adjustBwMagentas");
	const adjustBwMagentasText = document.getElementById("adjustBwMagentasText");
	const adjustLut3DWrap = document.getElementById("adjustLut3DWrap");
	const adjustLut3DSelect = document.getElementById("adjustLut3DSelect");
	const adjustLut3DFileInput = document.getElementById("adjustLut3DFile");
	const adjustLut3DInfo = document.getElementById("adjustLut3DInfo");
	const adjustGradientMapWrap = document.getElementById("adjustGradientMapWrap");
	const adjustGradientMapPreview = document.getElementById("adjustGradientMapPreview");
	const adjustGradientStartColorInput = document.getElementById("adjustGradientStartColor");
	const adjustGradientStartOpacityInput = document.getElementById("adjustGradientStartOpacity");
	const adjustGradientStartOpacityText = document.getElementById("adjustGradientStartOpacityText");
	const adjustGradientEndColorInput = document.getElementById("adjustGradientEndColor");
	const adjustGradientEndOpacityInput = document.getElementById("adjustGradientEndOpacity");
	const adjustGradientEndOpacityText = document.getElementById("adjustGradientEndOpacityText");
	const adjustGradientAddStopBtn = document.getElementById("adjustGradientAddStop");
	const adjustGradientExtraStops = document.getElementById("adjustGradientExtraStops");
	const adjustGradientExtraStopTemplate = document.getElementById(
		"adjustGradientExtraStopTemplate",
	);
	const adjustGradientDitherInput = document.getElementById("adjustGradientDither");
	const adjustGradientReverseInput = document.getElementById("adjustGradientReverse");
	const adjustApplyBtn = document.getElementById("adjustApply");
	const adjustCancelBtn = document.getElementById("adjustCancel");

	// TEXTAREA NA OBRAZIE
	textOverlay = null;
	let brushLastX = null;
	let brushLastY = null;
	let brushSmoothX = null;
	let brushSmoothY = null;
	let brushDistanceSinceLastStamp = 0;
	let currentBrushType = "round";
	let currentAdjustType = "brightnessContrast";
	let adjustSourceImageData = null;
	let adjustOriginalLayerImageData = null;
	let currentRepairTool = null;
	let currentPenTool = null;
	let lastPaintBrushType = "round";
	let penPathPoints = [];
	let isFreePenDrawing = false;
	let freePenStrokePoints = [];
	let isDraggingPenPoint = false;
	let draggingPenPointIndex = -1;
	let activeRectSelectionMode = "rect";
	let isRepairPainting = false;
	let repairBrushSource = null;
	let repairSourceOffsetX = 0;
	let repairSourceOffsetY = 0;
	let repairLastX = null;
	let repairLastY = null;
	let repairDistanceSinceLastStamp = 0;
	let repairSourceMarkerEl = null;
	let repairPointerCanvasPos = null;
	let repairSourceImageData = null;
	let repairWorkingImageData = null;
	let patchSelectionPoints = null;
	let patchDraftPoints = [];
	let isPatchSelecting = false;
	let isPatchMovingSelection = false;
	let isPatchRedirecting = false;
	let patchDragStart = null;
	let patchSelectionMoveStartX = 0;
	let patchSelectionMoveStartY = 0;
	let patchSelectionBasePoints = null;
	let isGridVisible = false;
	let isRulerVisible = false;
	const selectedLayerIds = new Set();
	let editingAdjustmentLayerId = null;
	let currentCurveChannel = "master";
	const curveChannelKeys = ["master", "red", "green", "blue"];
	let curvePointsByChannel = createDefaultCurvePointsByChannel();
	let activeCurvePointIndex = -1;
	let isDraggingCurvePoint = false;
	const huePresets = {
		default: { range: "master", hue: 0, saturation: 0, lightness: 0 },
		cyanotype: { range: "cyans", hue: -30, saturation: -20, lightness: 4 },
		boostedVibrance: { range: "master", hue: 0, saturation: 45, lightness: 2 },
		saturationBoost: { range: "master", hue: 0, saturation: 25, lightness: 0 },
		oldStyle: { range: "master", hue: 8, saturation: -20, lightness: 6 },
		redBoost: { range: "reds", hue: 5, saturation: 32, lightness: 2 },
		sepiaTone: { range: "yellows", hue: 18, saturation: 22, lightness: 4 },
		strongSaturation: { range: "master", hue: 0, saturation: 60, lightness: 0 },
		yellowBoost: { range: "yellows", hue: -8, saturation: 35, lightness: 3 },
	};
	const colorBalanceDefaults = {
		tone: "midtones",
		cyanRed: 0,
		magentaGreen: 0,
		yellowBlue: 0,
		preserveLuminosity: true,
	};
	const blackWhitePresets = {
		default: {
			reds: 40,
			yellows: 60,
			greens: 40,
			cyans: 60,
			blues: 20,
			magentas: 80,
			tintEnabled: false,
			tintColor: "#e1d3b3",
		},
		highContrastRed: {
			reds: 120,
			yellows: 80,
			greens: 20,
			cyans: -20,
			blues: -60,
			magentas: 40,
			tintEnabled: false,
			tintColor: "#e1d3b3",
		},
		highContrastBlue: {
			reds: -40,
			yellows: -20,
			greens: 10,
			cyans: 90,
			blues: 150,
			magentas: 120,
			tintEnabled: false,
			tintColor: "#d4d8e1",
		},
		infrared: {
			reds: 190,
			yellows: 120,
			greens: -50,
			cyans: 80,
			blues: -100,
			magentas: 60,
			tintEnabled: false,
			tintColor: "#e1d3b3",
		},
	};
	const lut3DStore = new Map();
	let lastLut3DKey = "none";
	const lut3DPresetDefs = [
		{ key: "preset:2strip", label: "2Strip.look", style: "2strip" },
		{ key: "preset:3strip", label: "3Strip.look", style: "3strip" },
		{ key: "preset:bleach", label: "Bleach Bypass.look", style: "bleach" },
		{ key: "preset:candle", label: "Candlelight.CUBE", style: "candle" },
		{ key: "preset:crispwarm", label: "Crisp_Warm.look", style: "crispwarm" },
		{ key: "preset:crispwinter", label: "Crisp_Winter.look", style: "crispwinter" },
		{ key: "preset:dropblues", label: "DropBlues.3DL", style: "dropblues" },
		{ key: "preset:edgyamber", label: "EdgyAmber.3DL", style: "edgyamber" },
		{ key: "preset:foggynight", label: "FoggyNight.3DL", style: "foggynight" },
		{ key: "preset:futuristic", label: "FuturisticBleak.3DL", style: "futuristic" },
		{ key: "preset:horrorblue", label: "HorrorBlue.3DL", style: "horrorblue" },
		{ key: "preset:latesunset", label: "LateSunset.3DL", style: "latesunset" },
		{ key: "preset:moonlight", label: "Moonlight.3DL", style: "moonlight" },
		{ key: "preset:nightfromday", label: "NightFromDay.CUBE", style: "nightfromday" },
		{ key: "preset:softwarming", label: "Soft_Warming.look", style: "softwarming" },
		{ key: "preset:tealorange", label: "TealOrangePlusContrast.3DL", style: "tealorange" },
		{ key: "preset:tensiongreen", label: "TensionGreen.3DL", style: "tensiongreen" },
	];

	// indeks edytowanej warstwy tekstowej (albo null = nowy tekst)
	let editingTextLayerIndex = null;

	toolbarToggle = document.getElementById("toolbarToggle");



	// ===== POMOCNICZE =====

	function closeAllToolDropdowns() {
		const shapeOpts = document.querySelector(".shape-options");
		if (shapeOpts) shapeOpts.classList.add("hidden");
		const selOpts = document.querySelector(".select-options");
		if (selOpts) selOpts.classList.add("hidden");
		if (zoomOptions) zoomOptions.classList.add("hidden");
		if (repairOptions) repairOptions.classList.add("hidden");
		if (penOptions) penOptions.classList.add("hidden");
		if (brushOptions) brushOptions.classList.add("hidden");
	}

	function positionDropdownUnderButton(triggerBtn, dropdownEl) {
		if (!triggerBtn || !dropdownEl) return;
		const btnRect = triggerBtn.getBoundingClientRect();
		const menuRect = dropdownEl.getBoundingClientRect();
		const menuWidth = dropdownEl.offsetWidth || menuRect.width;
		if (!menuWidth) return;

		const desiredViewportLeft = btnRect.left + btnRect.width / 2 - menuWidth / 2;
		const maxViewportLeft = Math.max(8, window.innerWidth - menuWidth - 8);
		const clampedViewportLeft = Math.max(8, Math.min(desiredViewportLeft, maxViewportLeft));
		const menuHeight = dropdownEl.offsetHeight || menuRect.height || 0;
		const desiredViewportTop = btnRect.bottom + 10;
		const maxViewportTop = Math.max(8, window.innerHeight - menuHeight - 8);
		const clampedViewportTop = Math.max(8, Math.min(desiredViewportTop, maxViewportTop));

		dropdownEl.style.position = "fixed";
		dropdownEl.style.left = `${clampedViewportLeft}px`;
		dropdownEl.style.right = "auto";
		dropdownEl.style.top = `${clampedViewportTop}px`;
		dropdownEl.style.bottom = "auto";
		dropdownEl.style.transform = "none";
	}

	function updateWorkspaceMenuLabels() {
		if (toggleGridMenuItem) {
			toggleGridMenuItem.textContent = isGridVisible ? "Ukryj siatkę" : "Pokaż siatkę";
		}
		if (toggleRulerMenuItem) {
			toggleRulerMenuItem.textContent = isRulerVisible ? "Ukryj miarkę" : "Pokaż miarkę";
		}
	}

	function renderRulerTicks(el, length, vertical = false, step = 10, major = 100) {
		if (!el) return;
		el.innerHTML = "";
		const frag = document.createDocumentFragment();
		for (let p = 0; p <= length; p += step) {
			const tick = document.createElement("span");
			const isMajor = p % major === 0;
			const isMid = p % 50 === 0 && !isMajor;
			tick.className = "ruler-tick";
			if (vertical) {
				tick.style.left = isMajor ? "0px" : isMid ? "8px" : "12px";
				tick.style.top = `${p}px`;
				tick.style.width = isMajor ? "18px" : isMid ? "10px" : "6px";
				tick.style.height = "1px";
			} else {
				tick.style.top = isMajor ? "0px" : isMid ? "8px" : "12px";
				tick.style.left = `${p}px`;
				tick.style.height = isMajor ? "18px" : isMid ? "10px" : "6px";
				tick.style.width = "1px";
			}
			frag.appendChild(tick);

			if (isMajor) {
				const label = document.createElement("span");
				label.className = `ruler-label${vertical ? " vertical" : ""}`;
				label.textContent = `${p}`;
				if (vertical) {
					label.style.left = "2px";
					label.style.top = `${p + 14}px`;
				} else {
					label.style.left = `${p + 2}px`;
					label.style.top = "2px";
				}
				frag.appendChild(label);
			}
		}
		el.appendChild(frag);
	}

	function updateRulerLayout() {
		if (!workspaceRulers || !wrapper || !centerPanel || !rulerTop || !rulerLeft) return;
		if (!isRulerVisible) return;

		const panelRect = centerPanel.getBoundingClientRect();
		const wrapRect = wrapper.getBoundingClientRect();
		const offsetLeft = wrapRect.left - panelRect.left;
		const offsetTop = wrapRect.top - panelRect.top;
		const w = Math.max(1, Math.round(wrapRect.width));
		const h = Math.max(1, Math.round(wrapRect.height));

		const corner = workspaceRulers.querySelector(".ruler-corner");
		if (corner) {
			corner.style.left = `${offsetLeft - 22}px`;
			corner.style.top = `${offsetTop - 22}px`;
		}
		rulerTop.style.left = `${offsetLeft}px`;
		rulerTop.style.top = `${offsetTop - 22}px`;
		rulerTop.style.width = `${w}px`;
		rulerLeft.style.left = `${offsetLeft - 22}px`;
		rulerLeft.style.top = `${offsetTop}px`;
		rulerLeft.style.height = `${h}px`;

		renderRulerTicks(rulerTop, w, false);
		renderRulerTicks(rulerLeft, h, true);
	}

	function setGridVisible(nextVisible) {
		isGridVisible = !!nextVisible;
		if (canvasGrid) {
			canvasGrid.classList.toggle("hidden", !isGridVisible);
		}
		updateWorkspaceMenuLabels();
	}

	function setRulerVisible(nextVisible) {
		isRulerVisible = !!nextVisible;
		if (workspaceRulers) {
			workspaceRulers.classList.toggle("hidden", !isRulerVisible);
		}
		if (isRulerVisible) {
			updateRulerLayout();
		}
		updateWorkspaceMenuLabels();
	}

	function hideWorkspaceContextMenu() {
		if (workspaceContextMenu) {
			workspaceContextMenu.classList.add("hidden");
		}
	}

	function getSelectedLayerIdsArray() {
		return [...selectedLayerIds];
	}

	function pruneSelectedLayerIds() {
		const existing = new Set(layers.map(l => l.id));
		selectedLayerIds.forEach(id => {
			if (!existing.has(id)) selectedLayerIds.delete(id);
		});
		if (!selectedLayerIds.size && layers[activeLayerIndex]) {
			selectedLayerIds.add(layers[activeLayerIndex].id);
		}
	}

	function selectSingleLayer(layerId) {
		selectedLayerIds.clear();
		if (Number.isFinite(layerId)) selectedLayerIds.add(layerId);
	}

	function toggleLayerSelection(layerId) {
		if (!Number.isFinite(layerId)) return;
		if (selectedLayerIds.has(layerId)) {
			if (selectedLayerIds.size > 1) selectedLayerIds.delete(layerId);
		} else {
			selectedLayerIds.add(layerId);
		}
	}

	function hideLayersContextMenu() {
		if (layersContextMenu) {
			layersContextMenu.classList.add("hidden");
		}
	}

	function showLayersContextMenu(clientX, clientY) {
		if (!layersContextMenu) return;
		pruneSelectedLayerIds();
		const selected = getSelectedLayerIdsArray();
		if (mergeSelectedLayersMenuItem) {
			mergeSelectedLayersMenuItem.disabled = selected.length < 2;
			mergeSelectedLayersMenuItem.textContent =
				selected.length < 2
					? "Scal wybrane warstwy"
					: `Scal wybrane warstwy (${selected.length})`;
		}
		layersContextMenu.classList.remove("hidden");
		const menuWidth = layersContextMenu.offsetWidth || 190;
		const menuHeight = layersContextMenu.offsetHeight || 70;
		const x = Math.max(8, Math.min(window.innerWidth - menuWidth - 8, clientX));
		const y = Math.max(8, Math.min(window.innerHeight - menuHeight - 8, clientY));
		layersContextMenu.style.left = `${x}px`;
		layersContextMenu.style.top = `${y}px`;
	}

	function getCanvasBlendMode(layer) {
		if (!layer) return "source-over";
		if (typeof BLEND_MODE_TO_CANVAS !== "undefined" && BLEND_MODE_TO_CANVAS[layer.blendMode]) {
			return BLEND_MODE_TO_CANVAS[layer.blendMode];
		}
		return "source-over";
	}

	function mergeSelectedLayers() {
		pruneSelectedLayerIds();
		const selected = getSelectedLayerIdsArray();
		if (selected.length < 2) return;

		const selectedLayers = layers.filter(l => selected.includes(l.id));
		if (selectedLayers.some(l => l.locked)) {
			alert("Najpierw odblokuj zaznaczone warstwy, aby je scalić.");
			return;
		}

		const selectedIndices = layers
			.map((l, idx) => (selected.includes(l.id) ? idx : -1))
			.filter(idx => idx >= 0)
			.sort((a, b) => a - b);
		if (selectedIndices.length < 2) return;

		const topIndex = selectedIndices[selectedIndices.length - 1];
		const targetLayer = layers[topIndex];
		if (!targetLayer?.ctx) return;
		if (typeof window.saveDocumentState === "function") {
			window.saveDocumentState();
		}

		const tempCanvas = document.createElement("canvas");
		tempCanvas.width = targetLayer.ctx.canvas.width;
		tempCanvas.height = targetLayer.ctx.canvas.height;
		const tempCtx = tempCanvas.getContext("2d");
		if (!tempCtx) return;

		selectedIndices.forEach(idx => {
			const layer = layers[idx];
			if (!layer?.canvas || !layer.visible) return;
			const alpha =
				Math.max(0, Math.min(100, Number(layer.opacity ?? 100))) / 100 *
				(Math.max(0, Math.min(100, Number(layer.fillOpacity ?? 100))) / 100);
			tempCtx.save();
			tempCtx.globalCompositeOperation = getCanvasBlendMode(layer);
			tempCtx.globalAlpha = alpha;
			tempCtx.drawImage(
				layer.canvas,
				Math.round(Number(layer.offsetX || 0)),
				Math.round(Number(layer.offsetY || 0)),
			);
			tempCtx.restore();
		});

		targetLayer.ctx.clearRect(0, 0, targetLayer.ctx.canvas.width, targetLayer.ctx.canvas.height);
		targetLayer.ctx.drawImage(tempCanvas, 0, 0);
		const mergedBaseName = "Scalona warstwa";
		const mergedLayerCount = layers.filter(l => {
			const name = (l?.name || "").trim();
			return name === mergedBaseName || name.startsWith(`${mergedBaseName} `);
		}).length;
		targetLayer.name =
			mergedLayerCount > 0 ? `${mergedBaseName} ${mergedLayerCount + 1}` : mergedBaseName;
		targetLayer.opacity = 100;
		targetLayer.fillOpacity = 100;
		targetLayer.blendMode = "normal";
		targetLayer.visible = true;
		targetLayer.locked = false;
		targetLayer.offsetX = 0;
		targetLayer.offsetY = 0;
		applyLayerCanvasVisualState(targetLayer);

		for (let i = selectedIndices.length - 1; i >= 0; i--) {
			const idx = selectedIndices[i];
			if (idx === topIndex) continue;
			const layer = layers[idx];
			if (layer?.canvas) layer.canvas.remove();
			layers.splice(idx, 1);
		}

		activeLayerIndex = layers.indexOf(targetLayer);
		selectSingleLayer(targetLayer.id);
		updateCanvasZOrder();
		updateLayerList();
		hideLayersContextMenu();
	}

	window.getSelectedLayerIds = () => {
		pruneSelectedLayerIds();
		return getSelectedLayerIdsArray();
	};
	window.handleLayerItemClick = (event, info = {}) => {
		const layerId = Number(info.layerId);
		const layerIndex = Number(info.layerIndex);
		if (!Number.isFinite(layerId) || !Number.isFinite(layerIndex)) return false;
		const isMultiSelect = !!(event && (event.shiftKey || event.ctrlKey || event.metaKey));
		if (isMultiSelect) {
			toggleLayerSelection(layerId);
			activeLayerIndex = layerIndex;
			updateLayerList();
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			return true;
		}
		selectSingleLayer(layerId);
		return false;
	};

	function showWorkspaceContextMenu(clientX, clientY) {
		if (!workspaceContextMenu) return;
		if (!clearSelectionMenuItem) {
			clearSelectionMenuItem = document.createElement("button");
			clearSelectionMenuItem.type = "button";
			clearSelectionMenuItem.id = "clearSelectionMenuItem";
			clearSelectionMenuItem.textContent = "Usuń zaznaczenie";
			clearSelectionMenuItem.addEventListener("click", e => {
				e.preventDefault();
				clearActiveSelection();
				hideWorkspaceContextMenu();
			});
			workspaceContextMenu.insertBefore(clearSelectionMenuItem, workspaceContextMenu.firstChild);
		}
		if (!createSelectionFromPenMenuItem) {
			createSelectionFromPenMenuItem = document.createElement("button");
			createSelectionFromPenMenuItem.type = "button";
			createSelectionFromPenMenuItem.id = "createSelectionFromPenMenuItem";
			createSelectionFromPenMenuItem.textContent = "Utwórz zaznaczenie";
			createSelectionFromPenMenuItem.addEventListener("click", e => {
				e.preventDefault();
				createSelectionFromPenPath();
				hideWorkspaceContextMenu();
			});
			workspaceContextMenu.insertBefore(
				createSelectionFromPenMenuItem,
				workspaceContextMenu.firstChild,
			);
		}
		clearSelectionMenuItem.style.display = hasAnyActiveSelection() ? "block" : "none";
		createSelectionFromPenMenuItem.style.display = canCreateSelectionFromPenPath()
			? "block"
			: "none";
		updateWorkspaceMenuLabels();
		workspaceContextMenu.classList.remove("hidden");
		const menuWidth = workspaceContextMenu.offsetWidth || 170;
		const menuHeight = workspaceContextMenu.offsetHeight || 170;
		const x = Math.max(8, Math.min(window.innerWidth - menuWidth - 8, clientX));
		const y = Math.max(8, Math.min(window.innerHeight - menuHeight - 8, clientY));
		workspaceContextMenu.style.left = `${x}px`;
		workspaceContextMenu.style.top = `${y}px`;
	}

	function ensureRepairSourceMarker() {
		if (repairSourceMarkerEl || !wrapper) return;
		const el = document.createElement("div");
		el.className = "repair-source-marker hidden";
		wrapper.appendChild(el);
		repairSourceMarkerEl = el;
	}

	function hideRepairSourceMarker() {
		if (!repairSourceMarkerEl) return;
		repairSourceMarkerEl.classList.add("hidden");
		repairSourceMarkerEl.classList.remove("pending");
	}

	function showRepairSourceMarker(x, y, pending = false) {
		if (!wrapper || !canvas) return;
		ensureRepairSourceMarker();
		if (!repairSourceMarkerEl) return;
		const scaleX = wrapper.clientWidth / canvas.width;
		const scaleY = wrapper.clientHeight / canvas.height;
		repairSourceMarkerEl.style.left = `${x * scaleX}px`;
		repairSourceMarkerEl.style.top = `${y * scaleY}px`;
		repairSourceMarkerEl.classList.toggle("pending", !!pending);
		repairSourceMarkerEl.classList.remove("hidden");
	}

	function refreshSpotSourceMarker(ctrlHeld = false) {
		if (currentRepairTool !== "spot") {
			hideRepairSourceMarker();
			return;
		}
		if (ctrlHeld && repairPointerCanvasPos) {
			showRepairSourceMarker(repairPointerCanvasPos.x, repairPointerCanvasPos.y, true);
			return;
		}
		if (repairBrushSource) {
			showRepairSourceMarker(repairBrushSource.x, repairBrushSource.y, false);
			return;
		}
		hideRepairSourceMarker();
	}

	function clearPenPreviewOverlay() {
		if (typeof clearSelectionOverlay === "function") clearSelectionOverlay();
	}

	function hasAnyActiveSelection() {
		const hasRectSelection =
			!!selectionRect &&
			Math.abs(Number(selectionRect.w || 0)) > 0 &&
			Math.abs(Number(selectionRect.h || 0)) > 0;
		const hasLasso =
			!!hasLassoSelection &&
			Array.isArray(lassoSelectionPoints) &&
			lassoSelectionPoints.length > 2;
		const hasPenPath = Array.isArray(penPathPoints) && penPathPoints.length > 0;
		return hasRectSelection || hasLasso || hasPenPath;
	}

	function clearActiveSelection() {
		selectionRect = null;
		isDrawingSelection = false;
		isLassoDrawing = false;
		hasLassoSelection = false;
		lassoPoints = [];
		lassoSelectionPoints = null;
		lassoLastDX = 0;
		lassoLastDY = 0;
		isMovingSelection = false;
		selectionImageData = null;
		selectionOriginalRect = null;
		layerBeforeMoveCanvas = null;
		lassoSelectionCanvas = null;

		isFreePenDrawing = false;
		freePenStrokePoints = [];
		isDraggingPenPoint = false;
		draggingPenPointIndex = -1;
		penPathPoints = [];
		activeRectSelectionMode = "rect";

		clearSelectionOverlay();
	}

	function getNormalizedActiveSelectionRect() {
		if (!selectionRect) return null;
		const x = Number(selectionRect.x || 0);
		const y = Number(selectionRect.y || 0);
		const w = Number(selectionRect.w || 0);
		const h = Number(selectionRect.h || 0);
		if (Math.abs(w) <= 0 || Math.abs(h) <= 0) return null;
		const nx = w >= 0 ? x : x + w;
		const ny = h >= 0 ? y : y + h;
		return { x: nx, y: ny, w: Math.abs(w), h: Math.abs(h) };
	}

	function drawRectSelectionOverlay(rect) {
		const norm = normalizeRect(rect);
		if (!norm || norm.w <= 0 || norm.h <= 0) {
			clearSelectionOverlay();
			return;
		}
		if (activeRectSelectionMode !== "ellipse") {
			drawSelectionRect(norm);
			return;
		}
		ensureSelectionOverlay();
		clearSelectionOverlay();
		const cx = norm.x + norm.w / 2;
		const cy = norm.y + norm.h / 2;
		selectionOverlayCtx.save();
		selectionOverlayCtx.strokeStyle = "rgba(0,0,0,0.9)";
		selectionOverlayCtx.lineWidth = 1;
		selectionOverlayCtx.setLineDash([6, 4]);
		selectionOverlayCtx.beginPath();
		selectionOverlayCtx.ellipse(cx, cy, norm.w / 2, norm.h / 2, 0, 0, Math.PI * 2);
		selectionOverlayCtx.stroke();
		selectionOverlayCtx.restore();
	}

	function redrawActiveSelectionOverlay() {
		if (hasLassoSelection && Array.isArray(lassoSelectionPoints) && lassoSelectionPoints.length > 2) {
			drawLassoPath(lassoSelectionPoints, 0, 0, true);
			return;
		}
		const rect = getNormalizedActiveSelectionRect();
		if (rect) {
			selectionRect = rect;
			drawRectSelectionOverlay(rect);
			return;
		}
		clearSelectionOverlay();
	}

	function withActiveSelectionClip(ctx, drawFn) {
		if (!ctx || typeof drawFn !== "function") return;
		const hasLasso =
			hasLassoSelection &&
			Array.isArray(lassoSelectionPoints) &&
			lassoSelectionPoints.length > 2;
		const rect = getNormalizedActiveSelectionRect();
		if (!hasLasso && !rect) {
			drawFn();
			return;
		}
		ctx.save();
		ctx.beginPath();
		if (hasLasso) {
			buildLassoPath(ctx, lassoSelectionPoints, 0, 0, true);
		} else if (activeRectSelectionMode === "ellipse") {
			const cx = rect.x + rect.w / 2;
			const cy = rect.y + rect.h / 2;
			ctx.ellipse(cx, cy, rect.w / 2, rect.h / 2, 0, 0, Math.PI * 2);
		} else {
			ctx.rect(rect.x, rect.y, rect.w, rect.h);
		}
		ctx.clip();
		drawFn();
		ctx.restore();
	}

	function canCreateSelectionFromPenPath() {
		return !!currentPenTool && Array.isArray(penPathPoints) && penPathPoints.length > 2;
	}

	function createSelectionFromPenPath() {
		if (!canCreateSelectionFromPenPath()) return false;
		const points = penPathPoints.map(p => ({ x: p.x, y: p.y }));
		currentPenTool = null;
		isFreePenDrawing = false;
		isDraggingPenPoint = false;
		draggingPenPointIndex = -1;
		if (penOptions) penOptions.classList.add("hidden");
		isSelectMode = true;
		selectMode = "lasso";
		isLassoDrawing = false;
		hasLassoSelection = true;
		lassoPoints = [];
		lassoSelectionPoints = points;
		lassoLastDX = 0;
		lassoLastDY = 0;
		isMovingSelection = false;
		drawLassoPath(lassoSelectionPoints, 0, 0, true);
		return true;
	}

	function drawPenPreviewOverlay(points = penPathPoints) {
		if (typeof ensureSelectionOverlay !== "function") return;
		ensureSelectionOverlay();
		clearSelectionOverlay();
		if (!selectionOverlayCtx) return;
		if (!Array.isArray(points) || points.length === 0) return;

		const octx = selectionOverlayCtx;
		octx.save();
		octx.strokeStyle = "rgba(0, 190, 255, 0.95)";
		octx.fillStyle = "rgba(0, 190, 255, 0.95)";
		octx.lineWidth = 1.5;
		octx.setLineDash([6, 4]);
		octx.beginPath();
		octx.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			octx.lineTo(points[i].x, points[i].y);
		}
		if (points.length > 2) octx.closePath();
		octx.stroke();
		octx.setLineDash([]);

		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			octx.beginPath();
			octx.arc(p.x, p.y, 3, 0, Math.PI * 2);
			octx.fill();
		}
		octx.restore();
	}

	function drawSplineFromPoints(ctx, points, tension = 6) {
		if (!ctx || !Array.isArray(points) || points.length < 2) return;
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[i - 1] || points[i];
			const p1 = points[i];
			const p2 = points[i + 1];
			const p3 = points[i + 2] || p2;
			const cp1x = p1.x + (p2.x - p0.x) / tension;
			const cp1y = p1.y + (p2.y - p0.y) / tension;
			const cp2x = p2.x - (p3.x - p1.x) / tension;
			const cp2y = p2.y - (p3.y - p1.y) / tension;
			ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
		}
		ctx.stroke();
	}

	function strokePenPathToLayer(points, mode = "pen") {
		const ctx = getActiveCtx();
		if (!ctx || !Array.isArray(points) || points.length < 2) return false;
		const brush = getBrushSettings();
		ctx.save();
		ctx.strokeStyle = brush.color;
		ctx.lineWidth = Math.max(1, brush.size);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		if (mode === "pen") {
			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);
			for (let i = 1; i < points.length; i++) {
				ctx.lineTo(points[i].x, points[i].y);
			}
			ctx.stroke();
		} else {
			const tension = mode === "curvaturePen" ? 4 : 6;
			drawSplineFromPoints(ctx, points, tension);
		}
		ctx.restore();
		return true;
	}

	function commitPenPath() {
		createSelectionFromPenPath();
	}

	function findNearestPenPointIndex(x, y, radius = 12) {
		if (!penPathPoints.length) return -1;
		const r2 = radius * radius;
		let best = -1;
		let bestD2 = Number.POSITIVE_INFINITY;
		for (let i = 0; i < penPathPoints.length; i++) {
			const dx = penPathPoints[i].x - x;
			const dy = penPathPoints[i].y - y;
			const d2 = dx * dx + dy * dy;
			if (d2 <= r2 && d2 < bestD2) {
				best = i;
				bestD2 = d2;
			}
		}
		return best;
	}

	function addPenPointOnNearestSegment(x, y) {
		if (penPathPoints.length < 2) {
			penPathPoints.push({ x, y });
			return;
		}
		let bestInsert = 1;
		let bestD2 = Number.POSITIVE_INFINITY;
		for (let i = 0; i < penPathPoints.length - 1; i++) {
			const a = penPathPoints[i];
			const b = penPathPoints[i + 1];
			const abx = b.x - a.x;
			const aby = b.y - a.y;
			const ab2 = abx * abx + aby * aby || 1;
			let t = ((x - a.x) * abx + (y - a.y) * aby) / ab2;
			t = Math.max(0, Math.min(1, t));
			const px = a.x + abx * t;
			const py = a.y + aby * t;
			const dx = x - px;
			const dy = y - py;
			const d2 = dx * dx + dy * dy;
			if (d2 < bestD2) {
				bestD2 = d2;
				bestInsert = i + 1;
			}
		}
		penPathPoints.splice(bestInsert, 0, { x, y });
	}

	function removeNearestPenPoint(x, y) {
		const idx = findNearestPenPointIndex(x, y);
		if (idx >= 0) penPathPoints.splice(idx, 1);
	}

	function disablePenTool() {
		currentPenTool = null;
		isFreePenDrawing = false;
		freePenStrokePoints = [];
		isDraggingPenPoint = false;
		draggingPenPointIndex = -1;
		penPathPoints = [];
		clearPenPreviewOverlay();
		if (penOptions) penOptions.classList.add("hidden");
	}

	function activatePenTool(tool = "pen") {
		disableZoomTool();
		disableRepairTool();
		resetSelection();
		hideTextPanel();
		selectedShape = null;
		isPipetteMode = false;
		isMoveMode = false;
		isSelectMode = false;
		isCropMode = false;
		isTextMode = false;
		wrapper.classList.remove("move-cursor");
		currentPenTool = tool;
		if (penToolBtn) {
			const labels = {
				pen: "Pióro",
				freePen: "Pióro dowolne",
				curvaturePen: "Pióro krzywizny",
				addPoint: "Dodawanie punktów kontrolnych",
				removePoint: "Usuwanie punktów kontrolnych",
			};
			penToolBtn.title = labels[tool] || "Pióro";
		}
		if (tool !== "freePen" || penPathPoints.length) {
			drawPenPreviewOverlay();
		} else {
			clearPenPreviewOverlay();
		}
	}

	function disableZoomTool() {
		if (typeof window.disableZoomMode === "function") {
			window.disableZoomMode();
		}
		if (zoomOptions) {
			zoomOptions.classList.add("hidden");
		}
		if (wrapper) {
			wrapper.classList.remove("zoom-in-mode", "zoom-out-mode");
		}
	}

	function disableRepairTool() {
		currentRepairTool = null;
		isRepairPainting = false;
		repairBrushSource = null;
		repairSourceOffsetX = 0;
		repairSourceOffsetY = 0;
		repairLastX = null;
		repairLastY = null;
		repairDistanceSinceLastStamp = 0;
		repairSourceImageData = null;
		repairWorkingImageData = null;
		patchSelectionPoints = null;
		patchDraftPoints = [];
		isPatchSelecting = false;
		isPatchMovingSelection = false;
		isPatchRedirecting = false;
		patchDragStart = null;
		patchSelectionMoveStartX = 0;
		patchSelectionMoveStartY = 0;
		patchSelectionBasePoints = null;
		repairPointerCanvasPos = null;
		hideRepairSourceMarker();
		clearSelectionOverlay();
		if (repairOptions) {
			repairOptions.classList.add("hidden");
		}
	}

	function activateZoomTool(mode = "in") {
		disablePenTool();
		disableRepairTool();
		resetSelection();
		hideTextPanel();
		selectedShape = null;
		isPipetteMode = false;
		isMoveMode = false;
		isSelectMode = false;
		isCropMode = false;
		isTextMode = false;
		wrapper.classList.remove("move-cursor");
		if (typeof window.setZoomMode === "function") {
			window.setZoomMode(mode);
		}
		if (wrapper) {
			wrapper.classList.remove("zoom-in-mode", "zoom-out-mode");
			wrapper.classList.add(mode === "out" ? "zoom-out-mode" : "zoom-in-mode");
		}
	}

	function activateRepairTool(tool = "spot") {
		disablePenTool();
		disableZoomTool();
		resetSelection();
		hideTextPanel();
		drawing = false;
		drawingStarted = false;
		isRepairPainting = false;
		repairLastX = null;
		repairLastY = null;
		repairDistanceSinceLastStamp = 0;
		repairSourceImageData = null;
		repairWorkingImageData = null;
		isPatchSelecting = false;
		isPatchMovingSelection = false;
		isPatchRedirecting = false;
		patchDragStart = null;
		patchSelectionMoveStartX = 0;
		patchSelectionMoveStartY = 0;
		patchSelectionBasePoints = null;
		patchSelectionPoints = null;
		patchDraftPoints = [];
		repairPointerCanvasPos = null;
		clearSelectionOverlay();
		selectedShape = null;
		isPipetteMode = false;
		isMoveMode = false;
		isSelectMode = false;
		isCropMode = false;
		isTextMode = false;
		wrapper.classList.remove("move-cursor");
		currentRepairTool = tool;
		if (repairToolBtn) {
			const labels = {
				spot: "Punktowy pędzel korygujący (Ctrl+klik: punkt źródła)",
				heal: "Pędzel korygujący (automatyczne próbkowanie otoczenia)",
				patch: "Łatka (lasso, Ctrl+przeciągnij: przesuń zaznaczenie)",
			};
			repairToolBtn.title = labels[tool] || "Korekta";
		}
		refreshSpotSourceMarker(false);
	}

	function removeTextOverlay() {
		if (textOverlay && textOverlay.parentNode) {
			textOverlay.parentNode.removeChild(textOverlay);
		}
		textOverlay = null;
	}

	function hideTextPanel() {
		if (textPanel) textPanel.classList.add("hidden");
		removeTextOverlay();
	}

function hideShapePanel() {
	if (shapePanel) shapePanel.classList.add("hidden");
	currentShapeLayerId = null;
}

	function updateCompactModeMenuLabel() {
		if (!menuCompactMode) return;
		menuCompactMode.textContent = compactModeEnabled
			? "Tryb compact: włączony"
			: "Tryb compact: wyłączony";
	}

	function setCompactMode(enabled) {
		compactModeEnabled = Boolean(enabled);
		document.body.classList.toggle("compact-mode", compactModeEnabled);
		updateCompactModeMenuLabel();
		if (compactModeEnabled) closePanelsForCompact("");
		// Po zmianie gęstości UI zmieniają się wymiary paska narzędzi,
		// więc uchwyt musi być przeliczony ponownie.
		requestAnimationFrame(() => {
			positionToolbarToggle();
			requestAnimationFrame(() => positionToolbarToggle());
		});
		try {
			window.localStorage.setItem(
				COMPACT_MODE_STORAGE_KEY,
				compactModeEnabled ? "1" : "0",
			);
		} catch (err) {}
	}

	function closePanelsForCompact(exceptPanel = "") {
		if (!compactModeEnabled) return;
		const shouldCompact = window.matchMedia("(max-width: 900px)").matches;
		if (!shouldCompact) return;
		if (exceptPanel !== "text") hideTextPanel();
		if (exceptPanel !== "shape") hideShapePanel();
		if (exceptPanel !== "layers") hideLayersPanel();
		if (exceptPanel !== "brush") hideBrushPanel();
		if (exceptPanel !== "adjust") hideAdjustPanel();
	}

	function showLayersPanel() {
		closePanelsForCompact("layers");
		if (layersPanel) layersPanel.classList.remove("hidden");
	}

	function hideLayersPanel() {
		if (!layersPanel) return;
		layersPanel.classList.add("hidden");
		isDraggingLayersPanel = false;
		document.body.style.userSelect = "";
	}

	function toggleLayersPanel() {
		if (!layersPanel) return;
		if (layersPanel.classList.contains("hidden")) {
			showLayersPanel();
		} else {
			hideLayersPanel();
		}
	}

	function closeTypographyPanel() {
		restoreEditingLayerOpacity();
		textBoxRect = null;
		hideTextPanel();
		clearSelectionOverlay();
		isTextMode = false;
		editingTextLayerIndex = null;
		window.setCurrentTextEditLayerIndex(null);
	}

	function showShapePanelForLayer(id) {
		closePanelsForCompact("shape");
	if (!shapePanel) return;
	const layer = window.getLayerById ? window.getLayerById(id) : null;
	if (!layer || !layer.shapeData) return;

	currentShapeLayerId = id;

	const data = layer.shapeData;

	if (shapeStrokeWidthInput) {
		shapeStrokeWidthInput.value = data.lineWidth || 2;
	}

	if (shapeCornerRadiusInput) {
		if (data.type === "roundRect") {
			shapeCornerRadiusInput.disabled = false;
			shapeCornerRadiusInput.value =
				typeof data.radius === "number" ? data.radius : 20;
		} else {
			shapeCornerRadiusInput.disabled = true;
		}
	}

	shapePanel.classList.remove("hidden");
}

window.showShapePanelForLayer = showShapePanelForLayer;

	// sprawdza, czy event jest na textarea od edycji tekstu
	function isEventOnTextOverlay(e) {
		return e.target && e.target.closest(".text-overlay");
	}

	// znajdź warstwę tekstową, której prostokąt zawiera punkt (x,y)
	function findTextLayerAtCanvasPos(x, y) {
		for (let i = layers.length - 1; i >= 0; i--) {
			const layer = layers[i];
			if (
				layer.kind === "text" &&
				layer.visible &&
				layer.textData &&
				layer.textData.rect
			) {
				const r = normalizeRect(layer.textData.rect);
				if (pointInRect(x, y, r)) {
					return { layer, index: i, rect: r };
				}
			}
		}
		return null;
	}

	function createTextOverlayForRect(rect) {
    if (!wrapper || !canvas) return;
    const norm = normalizeRect(rect);
    if (norm.w <= 0 || norm.h <= 0) return;

    removeTextOverlay();

    const scaleX = wrapper.clientWidth  / canvas.width;
    const scaleY = wrapper.clientHeight / canvas.height;

    textOverlay = document.createElement("textarea");
    textOverlay.className = "text-overlay";

    textOverlay.style.left          = (norm.x * scaleX) + "px";
    textOverlay.style.top           = (norm.y * scaleY) + "px";
    textOverlay.style.width         = (norm.w * scaleX) + "px";
    textOverlay.style.height        = (norm.h * scaleY) + "px";
    textOverlay.style.zIndex        = "9999";
    textOverlay.style.pointerEvents = "all";
    textOverlay.style.position      = "absolute";

    applyOverlayFontStyles();

    // blokujemy propagację zdarzeń myszy z textarea,
    // ale zostawiamy zdarzenia klawiatury, żeby Enter / Shift+Enter
    // były obsługiwane w globalnym handlerze
    ["mousedown", "mouseup", "mousemove", "click"].forEach(ev => {
        textOverlay.addEventListener(ev, e => e.stopPropagation());
    });

    wrapper.appendChild(textOverlay);

    requestAnimationFrame(() => {
        if (textOverlay) {
            textOverlay.focus();
            const len = textOverlay.value.length;
            textOverlay.setSelectionRange(len, len);
        }
    });
}

function commitTextFromOverlay() {
	// Jeśli nie ma overlay ani prostokąta — nic nie rób
	if (!textOverlay || !textBoxRect) {
		removeTextOverlay();
		return;
	}

	const text = textOverlay.value;

	// Pusty tekst = anuluj bez zapisu
	if (!text || !text.trim()) {
		restoreEditingLayerOpacity();
		textBoxRect = null;
		hideTextPanel();
		clearSelectionOverlay();
		isTextMode = false;
		editingTextLayerIndex = null;
		window.setCurrentTextEditLayerIndex(null);
		removeTextOverlay();
		return;
	}

	const options = collectTypographyOptions();

	// Zapisz na canvas
	window.applyTextBox(textBoxRect, text, options);

	restoreEditingLayerOpacity();

	textBoxRect = null;
	editingTextLayerIndex = null;
	window.setCurrentTextEditLayerIndex(null);

	// Usuń overlay PRZED hideTextPanel żeby nie wywołać blur drugi raz
	const old = textOverlay;
	textOverlay = null;
	if (old && old.parentNode) old.parentNode.removeChild(old);

	hideTextPanel();
	clearSelectionOverlay();
	isTextMode = false;
}
	function getFontStyleInfo(value) {
		switch (value) {
			case "light":
				return { weight: 300, style: "normal" };
			case "semi-bold":
				return { weight: 600, style: "normal" };
			case "bold":
				return { weight: 700, style: "normal" };
			case "black":
				return { weight: 800, style: "normal" };
			case "italic":
				return { weight: 400, style: "italic" };
			case "bold-italic":
				return { weight: 700, style: "italic" };
			default:
				return { weight: 400, style: "normal" };
		}
	}

	function isToggleActive(key) {
		const btn = textPanel
			? textPanel.querySelector(`[data-toggle-style="${key}"]`)
			: null;
		return !!(btn && btn.classList.contains("active"));
	}

	function setToggleState(key, active) {
		const btn = textPanel
			? textPanel.querySelector(`[data-toggle-style="${key}"]`)
			: null;
		if (!btn) return;
		btn.classList.toggle("active", !!active);
	}

	function applyOverlayFontStyles() {
		if (!textOverlay) return;
		const size = parseInt(fontSizeInput.value, 10) || 24;
		const baseFamily = fontFamilySelect.value || "Segoe UI";
		const variant = getFontStyleInfo(
			fontStyleSelect ? fontStyleSelect.value : "regular",
		);
		const weight = isToggleActive("bold")
			? Math.max(700, variant.weight)
			: variant.weight;
		const style =
			isToggleActive("italic") || variant.style === "italic"
				? "italic"
				: "normal";
		const letterSpacing = parseFloat(letterSpacingInput?.value) || 0;
		const lineHeightVal = parseFloat(lineHeightInput?.value);
		const lineHeight = lineHeightVal > 0 ? lineHeightVal : size * 1.2;
		const scaleX = Math.max(10, parseFloat(scaleXInput?.value) || 100);
		const scaleY = Math.max(10, parseFloat(scaleYInput?.value) || 100);
		const colorVal = textColorInput?.value || "#000000";

		textOverlay.style.fontFamily = `${baseFamily}, ${fontFallbackStack}`;
		textOverlay.style.fontSize = size + "px";
		textOverlay.style.fontWeight = weight;
		textOverlay.style.fontStyle = style;
		textOverlay.style.fontVariant = isToggleActive("smallCaps")
			? "small-caps"
			: "normal";
		textOverlay.style.lineHeight = lineHeight + "px";
		textOverlay.style.letterSpacing = letterSpacing + "px";
		textOverlay.style.color = colorVal;
		textOverlay.style.textTransform = isToggleActive("caps")
			? "uppercase"
			: "none";

		const decorations = [];
		if (isToggleActive("underline")) decorations.push("underline");
		if (isToggleActive("strike")) decorations.push("line-through");
		textOverlay.style.textDecoration = decorations.join(" ");
		textOverlay.style.textAlign = currentAlign;

		textOverlay.style.transformOrigin = "top left";
		textOverlay.style.transform = `scale(${scaleX / 100}, ${scaleY / 100})`;
	}

	function collectTypographyOptions() {
		const lineHeightVal = parseFloat(lineHeightInput?.value);
		const lineHeight =
			!isNaN(lineHeightVal) && lineHeightVal > 0 ? lineHeightVal : 0;
		return {
			fontFamily: fontFamilySelect ? fontFamilySelect.value : "Segoe UI",
			fontSize: parseInt(fontSizeInput?.value, 10) || 24,
			align: currentAlign,
			fontStyle: fontStyleSelect ? fontStyleSelect.value : "regular",
			lineHeight,
			kerning: kerningSelect ? kerningSelect.value : "auto",
			letterSpacing: parseFloat(letterSpacingInput?.value) || 0,
			baselineShift: parseFloat(baselineShiftInput?.value) || 0,
			scaleX: parseFloat(scaleXInput?.value) || 100,
			scaleY: parseFloat(scaleYInput?.value) || 100,
			color: textColorInput ? textColorInput.value : "#000000",
			bold: isToggleActive("bold"),
			italic: isToggleActive("italic"),
			underline: isToggleActive("underline"),
			strike: isToggleActive("strike"),
			allCaps: isToggleActive("caps"),
			smallCaps: isToggleActive("smallCaps"),
			layerIndex: editingTextLayerIndex,
		};
	}

	function loadTypographyOptions(opts = {}) {
		if (fontFamilySelect && opts.fontFamily)
			fontFamilySelect.value = opts.fontFamily;
		if (fontSizeInput && opts.fontSize) fontSizeInput.value = opts.fontSize;
		if (fontStyleSelect && opts.fontStyle)
			fontStyleSelect.value = opts.fontStyle;
		if (lineHeightInput) lineHeightInput.value = opts.lineHeight || 0;
		if (kerningSelect && opts.kerning) kerningSelect.value = opts.kerning;
		if (letterSpacingInput && typeof opts.letterSpacing === "number")
			letterSpacingInput.value = opts.letterSpacing;
		if (baselineShiftInput && typeof opts.baselineShift === "number")
			baselineShiftInput.value = opts.baselineShift;
		if (scaleXInput && opts.scaleX) scaleXInput.value = opts.scaleX;
		if (scaleYInput && opts.scaleY) scaleYInput.value = opts.scaleY;
		if (textColorInput && opts.color) textColorInput.value = opts.color;

		setToggleState("bold", !!opts.bold);
		setToggleState("italic", !!opts.italic);
		setToggleState("underline", !!opts.underline);
		setToggleState("strike", !!opts.strike);
		setToggleState("caps", !!opts.allCaps);
		setToggleState("smallCaps", !!opts.smallCaps);

		if (opts.align) {
			currentAlign = opts.align;
			alignButtons.forEach(b =>
				b.classList.toggle("active", b.dataset.align === opts.align),
			);
		}
		applyOverlayFontStyles();
	}

	// zmiana fontu / rozmiaru fontu aktualizuje overlay
	[
		fontFamilySelect,
		fontSizeInput,
		fontStyleSelect,
		lineHeightInput,
		kerningSelect,
		letterSpacingInput,
		baselineShiftInput,
		scaleXInput,
		scaleYInput,
		textColorInput,
	].forEach(el => {
		if (!el) return;
		el.addEventListener("input", () => applyOverlayFontStyles());
	});

	styleToggleButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			btn.classList.toggle("active");
			applyOverlayFontStyles();
		});
	});

	// ===== PANEL USTAWIEN PĘDZLA =====

	function updateBrushLabels() {
		const sizeVal = parseInt(
			brushSizeControl?.value || toolbarBrushSize?.value || 1,
			10,
		);
		const hardnessVal = parseInt(brushHardnessControl?.value || 100, 10);
		const spacingVal = parseInt(brushSpacingControl?.value || 5, 10);
		const angleVal = parseInt(brushAngleControl?.value || 0, 10);
		const roundnessVal = parseInt(brushRoundnessControl?.value || 100, 10);

		const sizeLabel = document.getElementById("brushSizeValue");
		const hardLabel = document.getElementById("brushHardnessValue");
		const spacingLabel = document.getElementById("brushSpacingValue");
		const angleLabel = document.getElementById("brushAngleValue");
		const roundLabel = document.getElementById("brushRoundnessValue");

		if (sizeLabel) sizeLabel.textContent = `${sizeVal} px`;
		if (hardLabel) hardLabel.textContent = `${hardnessVal}%`;
		if (spacingLabel) spacingLabel.textContent = `${spacingVal}%`;
		if (angleLabel) angleLabel.textContent = `${angleVal}°`;
		if (roundLabel) roundLabel.textContent = `${roundnessVal}%`;
	}

	function updateAnglePreview(angleDeg) {
		const dot = brushPanel?.querySelector(".angle-dot");
		if (!dot) return;
		const radius = 28;
		dot.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) translateY(-${radius}px)`;
	}

	function drawBrushPreview() {
		if (!brushPreviewCanvas) return;
		const ctx = brushPreviewCanvas.getContext("2d");
		if (!ctx) return;

		const size = Math.max(
			1,
			parseInt(brushSizeControl?.value || toolbarBrushSize?.value || 15, 10),
		);
		const hardness = Math.min(
			1,
			Math.max(
				0.05,
				(parseInt(brushHardnessControl?.value || 100, 10) || 0) / 100,
			),
		);
		const spacingPercent = Math.max(
			1,
			parseInt(brushSpacingControl?.value || 5, 10),
		);
		const angleDeg = parseInt(brushAngleControl?.value || 0, 10);
		const roundness = Math.max(
			5,
			parseInt(brushRoundnessControl?.value || 100, 10),
		);
		const smoothing = !!brushSmoothingControl?.checked;
		const keepTexture = !!brushKeepTextureControl?.checked;
		const brushType = currentBrushType;
		const isEraser = brushType === "eraser";
		const previewBrushType = isEraser ? "round" : brushType;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (isEraser) {
			ctx.fillStyle = "rgba(255,255,255,0.18)";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}

		const centerY = ctx.canvas.height / 2;
		const spacingPx = Math.max(2, (spacingPercent / 100) * size * 2.2);
		const angleRad = (angleDeg * Math.PI) / 180;

		let phase = 0;
		for (let x = 18; x < ctx.canvas.width - 18; x += spacingPx) {
			const wobble = smoothing ? Math.sin(phase) * 3 : 0;
			const y = centerY + wobble;
			const previewColor = isEraser ? "#121212" : "#ffffff";
			stampBrush(ctx, x, y, size, hardness * 100, previewColor, {
				roundness,
				angleDeg: (angleRad * 180) / Math.PI,
				flipX: false,
				flipY: false,
				keepTexture,
				brushType: previewBrushType,
			});
			phase += 0.5;
		}

		updateAnglePreview(angleDeg);
	}

	function setBrushSize(value) {
		const val = Math.max(1, parseInt(value || 1, 10));
		if (brushSizeControl) brushSizeControl.value = val;
		if (toolbarBrushSize) toolbarBrushSize.value = val;
		updateBrushLabels();
		drawBrushPreview();
	}

	function setBrushHardness(value) {
		const val = Math.min(100, Math.max(0, parseInt(value || 0, 10)));
		if (brushHardnessControl) brushHardnessControl.value = val;
		updateBrushLabels();
		drawBrushPreview();
	}

	function setBrushType(type) {
		currentBrushType = type || "round";
		if (currentBrushType !== "eraser") {
			lastPaintBrushType = currentBrushType;
		}
		if (brushToolBtn) {
			brushToolBtn.title = currentBrushType === "eraser" ? "Gumka" : "Pędzel";
		}
		brushTypeButtons.forEach(btn =>
			btn.classList.toggle("active", btn.dataset.brushType === currentBrushType),
		);
		drawBrushPreview();
	}

	function activateBrushMode(mode = "paint") {
		disableZoomTool();
		disableRepairTool();
		disablePenTool();
		hideTextPanel();
		isMoveMode = false;
		isPipetteMode = false;
		isSelectMode = false;
		isDrawingSelection = false;
		isLassoDrawing = false;
		isMovingSelection = false;
		isCropMode = false;
		isTextMode = false;
		wrapper.classList.remove("move-cursor");
		selectedShape = null;
		redrawActiveSelectionOverlay();
		if (mode === "eraser") {
			setBrushType("eraser");
			if (brushToolBtn) brushToolBtn.title = "Gumka";
		} else {
			setBrushType(lastPaintBrushType || "round");
			if (brushToolBtn) brushToolBtn.title = "Pędzel";
		}
	}

	function getBrushSettings() {
		const size = Math.max(
			1,
			parseInt(brushSizeControl?.value || toolbarBrushSize?.value || 1, 10),
		);
		const hardness = Math.max(
			0,
			Math.min(100, parseInt(brushHardnessControl?.value || 100, 10)),
		);
		const spacingPercent = Math.max(
			1,
			parseInt(brushSpacingControl?.value || 5, 10),
		);
		const roundness = Math.max(
			1,
			Math.min(100, parseInt(brushRoundnessControl?.value || 100, 10)),
		);
		const angleDeg = parseInt(brushAngleControl?.value || 0, 10);
		const flipX = !!brushFlipXControl?.checked;
		const flipY = !!brushFlipYControl?.checked;
		const smoothing = !!brushSmoothingControl?.checked;
		const keepTexture = !!brushKeepTextureControl?.checked;
		const color = strokeColorInput?.value || "#000000";

		return {
			size,
			hardness,
			spacingPercent,
			color,
			smoothing,
			brushShape: {
				roundness,
				angleDeg,
				flipX,
				flipY,
				keepTexture,
				brushType: currentBrushType,
			},
		};
	}

	function hexToRgba(hex, alpha = 1) {
		if (typeof hex !== "string") return `rgba(0,0,0,${alpha})`;
		const v = hex.trim();
		const short = /^#([0-9a-fA-F]{3})$/;
		const long = /^#([0-9a-fA-F]{6})$/;
		if (short.test(v)) {
			const [, s] = v.match(short);
			const r = parseInt(s[0] + s[0], 16);
			const g = parseInt(s[1] + s[1], 16);
			const b = parseInt(s[2] + s[2], 16);
			return `rgba(${r},${g},${b},${alpha})`;
		}
		if (long.test(v)) {
			const [, s] = v.match(long);
			const r = parseInt(s.slice(0, 2), 16);
			const g = parseInt(s.slice(2, 4), 16);
			const b = parseInt(s.slice(4, 6), 16);
			return `rgba(${r},${g},${b},${alpha})`;
		}
		return v;
	}

	function stampBrush(ctx, x, y, size, hardness, color, options = {}) {
		const radius = Math.max(0.5, size / 2);
		const hard = Math.max(0, Math.min(1, hardness / 100));
		const roundness = Math.max(
			0.01,
			Math.min(1, (options.roundness ?? 100) / 100),
		);
		const angleRad = ((options.angleDeg ?? 0) * Math.PI) / 180;
		const scaleX = options.flipX ? -1 : 1;
		const scaleY = (options.flipY ? -1 : 1) * roundness;
		const keepTexture = !!options.keepTexture;
		const brushType = options.brushType || "round";

		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angleRad);
		ctx.scale(scaleX, scaleY);
		if (brushType === "spray") {
			const density = Math.max(10, Math.round(radius * 2.3));
			ctx.fillStyle = hexToRgba(color, Math.max(0.08, hard * 0.6));
			for (let i = 0; i < density; i++) {
				const a = Math.random() * Math.PI * 2;
				const rr = Math.pow(Math.random(), 1.7) * radius;
				const sx = Math.cos(a) * rr;
				const sy = Math.sin(a) * rr;
				const dotR = Math.max(0.4, radius * 0.05 * (0.6 + Math.random()));
				ctx.beginPath();
				ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
				ctx.fill();
			}
		} else if (brushType === "square") {
			const side = radius * 2;
			const soft = Math.max(0, (1 - hard) * radius);
			if (soft > 0.01) {
				ctx.shadowColor = color;
				ctx.shadowBlur = soft * 1.6;
			}
			ctx.fillStyle = color;
			ctx.fillRect(-radius, -radius, side, side);
			ctx.shadowBlur = 0;
		} else if (brushType === "calligraphy") {
			const penRoundness = Math.max(0.06, Math.min(0.55, roundness * 0.55));
			ctx.scale(1, penRoundness);
			const solidRadius = Math.max(0, radius * hard);
			const grad = ctx.createRadialGradient(0, 0, solidRadius, 0, 0, radius);
			const hold = Math.max(0.01, Math.min(0.98, hard));
			grad.addColorStop(0, hexToRgba(color, 1));
			grad.addColorStop(hold, hexToRgba(color, 1));
			grad.addColorStop(1, hexToRgba(color, 0));
			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, Math.PI * 2);
			ctx.fill();
		} else {
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, Math.PI * 2);

			if (hard >= 0.99) {
				ctx.fillStyle = color;
				ctx.fill();
				ctx.restore();
				return;
			}

			const solidRadius = Math.max(0, radius * hard);
			const grad = ctx.createRadialGradient(0, 0, solidRadius, 0, 0, radius);
			const hold = Math.max(0.01, Math.min(0.98, hard));
			grad.addColorStop(0, hexToRgba(color, 1));
			grad.addColorStop(hold, hexToRgba(color, 1));
			grad.addColorStop(1, hexToRgba(color, 0));
			ctx.fillStyle = grad;
			ctx.fill();
		}

		if (keepTexture) {
			ctx.save();
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = "rgba(0,0,0,0.16)";
			const grains = Math.max(8, Math.round(radius * 2));
			for (let i = 0; i < grains; i++) {
				const a = Math.random() * Math.PI * 2;
				const rr = Math.sqrt(Math.random()) * radius;
				const gx = Math.cos(a) * rr;
				const gy = Math.sin(a) * rr;
				const gr = Math.max(0.4, Math.random() * 1.2);
				ctx.beginPath();
				ctx.arc(gx, gy, gr, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();
		}
		ctx.restore();
	}

	function paintBrushStroke(ctx, fromX, fromY, toX, toY, settings = null) {
		const opts = settings || getBrushSettings();
		const { size, hardness, spacingPercent, color, brushShape } = opts;
		const isEraser = brushShape?.brushType === "eraser";
		const stampBrushShape = isEraser ? { ...brushShape, brushType: "round" } : brushShape;
		const step = Math.max(0.5, (size * spacingPercent) / 100);

		const dx = toX - fromX;
		const dy = toY - fromY;
		const dist = Math.hypot(dx, dy);

		if (dist <= 0.0001) return;

		ctx.save();
		if (isEraser) {
			ctx.globalCompositeOperation = "destination-out";
		}

		let traveled = 0;
		while (brushDistanceSinceLastStamp + (dist - traveled) >= step) {
			const need = step - brushDistanceSinceLastStamp;
			traveled += need;
			const t = traveled / dist;
			const sx = fromX + dx * t;
			const sy = fromY + dy * t;
			stampBrush(ctx, sx, sy, size, hardness, color, stampBrushShape);
			brushDistanceSinceLastStamp = 0;
		}

		brushDistanceSinceLastStamp += dist - traveled;
		ctx.restore();
	}

	function clampByte(v) {
		return Math.max(0, Math.min(255, Math.round(v)));
	}

	function sampleRingAverage(data, width, height, cx, cy, innerR, outerR) {
		const x0 = Math.max(0, Math.floor(cx - outerR));
		const x1 = Math.min(width - 1, Math.ceil(cx + outerR));
		const y0 = Math.max(0, Math.floor(cy - outerR));
		const y1 = Math.min(height - 1, Math.ceil(cy + outerR));
		const inner2 = innerR * innerR;
		const outer2 = outerR * outerR;
		let r = 0;
		let g = 0;
		let b = 0;
		let count = 0;
		for (let yy = y0; yy <= y1; yy++) {
			for (let xx = x0; xx <= x1; xx++) {
				const dx = xx - cx;
				const dy = yy - cy;
				const d2 = dx * dx + dy * dy;
				if (d2 < inner2 || d2 > outer2) continue;
				const idx = (yy * width + xx) * 4;
				r += data[idx];
				g += data[idx + 1];
				b += data[idx + 2];
				count++;
			}
		}
		if (!count) {
			const sx = Math.max(0, Math.min(width - 1, Math.round(cx)));
			const sy = Math.max(0, Math.min(height - 1, Math.round(cy)));
			const idx = (sy * width + sx) * 4;
			return { r: data[idx], g: data[idx + 1], b: data[idx + 2] };
		}
		return { r: r / count, g: g / count, b: b / count };
	}

	function sampleNeighborhoodStats(data, width, height, cx, cy, radius) {
		const x0 = Math.max(0, Math.floor(cx - radius));
		const x1 = Math.min(width - 1, Math.ceil(cx + radius));
		const y0 = Math.max(0, Math.floor(cy - radius));
		const y1 = Math.min(height - 1, Math.ceil(cy + radius));
		const r2 = radius * radius;
		let sr = 0;
		let sg = 0;
		let sb = 0;
		let srr = 0;
		let sgg = 0;
		let sbb = 0;
		let count = 0;
		for (let yy = y0; yy <= y1; yy++) {
			for (let xx = x0; xx <= x1; xx++) {
				const dx = xx - cx;
				const dy = yy - cy;
				if (dx * dx + dy * dy > r2) continue;
				const i = (yy * width + xx) * 4;
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				sr += r;
				sg += g;
				sb += b;
				srr += r * r;
				sgg += g * g;
				sbb += b * b;
				count++;
			}
		}
		if (!count) {
			return {
				mean: { r: 0, g: 0, b: 0 },
				std: { r: 1, g: 1, b: 1 },
				lumaStd: 1,
			};
		}
		const mr = sr / count;
		const mg = sg / count;
		const mb = sb / count;
		const vr = Math.max(1, srr / count - mr * mr);
		const vg = Math.max(1, sgg / count - mg * mg);
		const vb = Math.max(1, sbb / count - mb * mb);
		const lumaStd = Math.sqrt((vr + vg + vb) / 3);
		return {
			mean: { r: mr, g: mg, b: mb },
			std: { r: Math.sqrt(vr), g: Math.sqrt(vg), b: Math.sqrt(vb) },
			lumaStd,
		};
	}

	function sampleRingStats(data, width, height, cx, cy, innerR, outerR) {
		const x0 = Math.max(0, Math.floor(cx - outerR));
		const x1 = Math.min(width - 1, Math.ceil(cx + outerR));
		const y0 = Math.max(0, Math.floor(cy - outerR));
		const y1 = Math.min(height - 1, Math.ceil(cy + outerR));
		const inner2 = innerR * innerR;
		const outer2 = outerR * outerR;
		let sr = 0;
		let sg = 0;
		let sb = 0;
		let srr = 0;
		let sgg = 0;
		let sbb = 0;
		let count = 0;
		for (let yy = y0; yy <= y1; yy++) {
			for (let xx = x0; xx <= x1; xx++) {
				const dx = xx - cx;
				const dy = yy - cy;
				const d2 = dx * dx + dy * dy;
				if (d2 < inner2 || d2 > outer2) continue;
				const i = (yy * width + xx) * 4;
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				sr += r;
				sg += g;
				sb += b;
				srr += r * r;
				sgg += g * g;
				sbb += b * b;
				count++;
			}
		}
		if (!count) {
			return sampleNeighborhoodStats(data, width, height, cx, cy, Math.max(2, outerR));
		}
		const mr = sr / count;
		const mg = sg / count;
		const mb = sb / count;
		const vr = Math.max(1, srr / count - mr * mr);
		const vg = Math.max(1, sgg / count - mg * mg);
		const vb = Math.max(1, sbb / count - mb * mb);
		return {
			mean: { r: mr, g: mg, b: mb },
			std: { r: Math.sqrt(vr), g: Math.sqrt(vg), b: Math.sqrt(vb) },
			lumaStd: Math.sqrt((vr + vg + vb) / 3),
		};
	}

	function findBestAutoRepairSource(data, width, height, cx, cy, radius) {
		const target = sampleRingStats(data, width, height, cx, cy, radius * 0.8, radius * 2.15);
		const minDist = Math.max(3, radius * 1.1);
		const maxDist = Math.max(minDist + 1, radius * 3.4);
		let best = null;
		const radialSamples = 3;
		const angleSamples = 16;
		for (let rStep = 0; rStep < radialSamples; rStep++) {
			const t = radialSamples > 1 ? rStep / (radialSamples - 1) : 0;
			const dist = minDist + (maxDist - minDist) * t;
			for (let i = 0; i < angleSamples; i++) {
				const angle = (Math.PI * 2 * i) / angleSamples;
				const sx = Math.round(cx + Math.cos(angle) * dist);
				const sy = Math.round(cy + Math.sin(angle) * dist);
				if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue;
				const candidate = sampleNeighborhoodStats(
					data,
					width,
					height,
					sx,
					sy,
					Math.max(2, radius * 1.05),
				);
				const meanDiff =
					Math.abs(candidate.mean.r - target.mean.r) +
					Math.abs(candidate.mean.g - target.mean.g) +
					Math.abs(candidate.mean.b - target.mean.b);
				const stdDiff =
					Math.abs(candidate.std.r - target.std.r) +
					Math.abs(candidate.std.g - target.std.g) +
					Math.abs(candidate.std.b - target.std.b);
				const lumaDiff = Math.abs(candidate.lumaStd - target.lumaStd);
				const score = meanDiff + stdDiff * 0.8 + lumaDiff * 0.6;
				if (!best || score < best.score) {
					best = { x: sx, y: sy, score };
				}
			}
		}
		return best ? { x: best.x, y: best.y } : null;
	}

	function adaptiveRepairRadius(data, width, height, x, y, size) {
		const base = Math.max(2, size * 0.5);
		const stats = sampleNeighborhoodStats(data, width, height, x, y, base * 1.3);
		const factor = Math.max(0.75, Math.min(1.45, stats.lumaStd / 24));
		return Math.max(2, Math.min(base * 1.55, base * factor));
	}

	function brushMaskAlpha(dx, dy, radius, hardness01 = 0.6) {
		const dist = Math.hypot(dx, dy);
		if (dist > radius) return 0;
		const hardRadius = radius * Math.max(0.05, Math.min(1, hardness01));
		if (dist <= hardRadius) return 1;
		const t = (dist - hardRadius) / Math.max(0.001, radius - hardRadius);
		return 1 - t;
	}

	function applySpotRepairStamp(work, source, cx, cy, size, hardness = 70) {
		if (!work || !source) return;
		const width = work.width;
		const height = work.height;
		const dst = work.data;
		const src = source.data;
		const radius = adaptiveRepairRadius(dst, width, height, cx, cy, size);
		const hard = Math.max(0.05, Math.min(1, hardness / 100));
		const autoSource = findBestAutoRepairSource(src, width, height, cx, cy, radius);
		if (autoSource) {
			applyHealingStamp(
				work,
				source,
				cx,
				cy,
				autoSource.x,
				autoSource.y,
				size,
				Math.max(55, hardness),
			);
			return;
		}
		const avg = sampleRingAverage(src, width, height, cx, cy, radius * 0.65, radius * 2.0);
		const aroundStats = sampleNeighborhoodStats(dst, width, height, cx, cy, radius * 1.25);
		const x0 = Math.max(0, Math.floor(cx - radius));
		const x1 = Math.min(width - 1, Math.ceil(cx + radius));
		const y0 = Math.max(0, Math.floor(cy - radius));
		const y1 = Math.min(height - 1, Math.ceil(cy + radius));
		for (let yy = y0; yy <= y1; yy++) {
			for (let xx = x0; xx <= x1; xx++) {
				const a = brushMaskAlpha(xx - cx, yy - cy, radius, hard) * 0.9;
				if (a <= 0) continue;
				const i = (yy * width + xx) * 4;
				const tr = avg.r * 0.7 + aroundStats.mean.r * 0.3;
				const tg = avg.g * 0.7 + aroundStats.mean.g * 0.3;
				const tb = avg.b * 0.7 + aroundStats.mean.b * 0.3;
				dst[i] = clampByte(dst[i] * (1 - a) + tr * a);
				dst[i + 1] = clampByte(dst[i + 1] * (1 - a) + tg * a);
				dst[i + 2] = clampByte(dst[i + 2] * (1 - a) + tb * a);
			}
		}
	}

	function applyHealingStamp(work, source, dstX, dstY, srcX, srcY, size, hardness = 70) {
		if (!work || !source) return;
		const width = work.width;
		const height = work.height;
		const dst = work.data;
		const src = source.data;
		const radius = adaptiveRepairRadius(dst, width, height, dstX, dstY, size);
		const hard = Math.max(0.05, Math.min(1, hardness / 100));
		const dstStats = sampleNeighborhoodStats(dst, width, height, dstX, dstY, radius * 1.2);
		const srcStats = sampleNeighborhoodStats(src, width, height, srcX, srcY, radius * 1.2);
		const x0 = Math.max(0, Math.floor(dstX - radius));
		const x1 = Math.min(width - 1, Math.ceil(dstX + radius));
		const y0 = Math.max(0, Math.floor(dstY - radius));
		const y1 = Math.min(height - 1, Math.ceil(dstY + radius));
		for (let yy = y0; yy <= y1; yy++) {
			for (let xx = x0; xx <= x1; xx++) {
				const a = brushMaskAlpha(xx - dstX, yy - dstY, radius, hard) * 0.78;
				if (a <= 0) continue;
				const sx = Math.max(0, Math.min(width - 1, Math.round(srcX + (xx - dstX))));
				const sy = Math.max(0, Math.min(height - 1, Math.round(srcY + (yy - dstY))));
				const di = (yy * width + xx) * 4;
				const si = (sy * width + sx) * 4;
				const srcR = src[si];
				const srcG = src[si + 1];
				const srcB = src[si + 2];
				const nr =
					((srcR - srcStats.mean.r) / Math.max(1, srcStats.std.r)) * dstStats.std.r +
					dstStats.mean.r;
				const ng =
					((srcG - srcStats.mean.g) / Math.max(1, srcStats.std.g)) * dstStats.std.g +
					dstStats.mean.g;
				const nb =
					((srcB - srcStats.mean.b) / Math.max(1, srcStats.std.b)) * dstStats.std.b +
					dstStats.mean.b;
				const lumDst = 0.299 * dst[di] + 0.587 * dst[di + 1] + 0.114 * dst[di + 2];
				const lumSrc = 0.299 * nr + 0.587 * ng + 0.114 * nb;
				const dl = lumDst - lumSrc;
				dst[di] = clampByte(dst[di] * (1 - a) + (nr + dl) * a);
				dst[di + 1] = clampByte(dst[di + 1] * (1 - a) + (ng + dl) * a);
				dst[di + 2] = clampByte(dst[di + 2] * (1 - a) + (nb + dl) * a);
			}
		}
	}

	function getPolygonBounds(points = []) {
		if (!points.length) return null;
		let minX = Number.POSITIVE_INFINITY;
		let minY = Number.POSITIVE_INFINITY;
		let maxX = Number.NEGATIVE_INFINITY;
		let maxY = Number.NEGATIVE_INFINITY;
		points.forEach(p => {
			minX = Math.min(minX, p.x);
			minY = Math.min(minY, p.y);
			maxX = Math.max(maxX, p.x);
			maxY = Math.max(maxY, p.y);
		});
		return {
			x: Math.floor(minX),
			y: Math.floor(minY),
			w: Math.max(1, Math.ceil(maxX - minX)),
			h: Math.max(1, Math.ceil(maxY - minY)),
		};
	}

	function distancePointToSegment(px, py, ax, ay, bx, by) {
		const abx = bx - ax;
		const aby = by - ay;
		const apx = px - ax;
		const apy = py - ay;
		const ab2 = abx * abx + aby * aby || 1;
		const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / ab2));
		const qx = ax + abx * t;
		const qy = ay + aby * t;
		return Math.hypot(px - qx, py - qy);
	}

	function distanceToPolygonEdge(px, py, points = []) {
		if (!points.length) return 0;
		let minDist = Number.POSITIVE_INFINITY;
		for (let i = 0; i < points.length; i++) {
			const a = points[i];
			const b = points[(i + 1) % points.length];
			const d = distancePointToSegment(px, py, a.x, a.y, b.x, b.y);
			if (d < minDist) minDist = d;
		}
		return minDist;
	}

	function samplePolygonStats(data, width, height, polygon, offsetX = 0, offsetY = 0) {
		const bounds = getPolygonBounds(polygon);
		if (!bounds) {
			return {
				mean: { r: 0, g: 0, b: 0 },
				std: { r: 1, g: 1, b: 1 },
				lumaStd: 1,
			};
		}
		const x0 = Math.max(0, bounds.x);
		const y0 = Math.max(0, bounds.y);
		const x1 = Math.min(width - 1, bounds.x + bounds.w);
		const y1 = Math.min(height - 1, bounds.y + bounds.h);
		let sr = 0;
		let sg = 0;
		let sb = 0;
		let srr = 0;
		let sgg = 0;
		let sbb = 0;
		let count = 0;
		for (let dy = y0; dy <= y1; dy++) {
			for (let dx = x0; dx <= x1; dx++) {
				if (!pointInPolygon(dx + 0.5, dy + 0.5, polygon)) continue;
				const sx = Math.round(dx + offsetX);
				const sy = Math.round(dy + offsetY);
				if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue;
				const i = (sy * width + sx) * 4;
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				sr += r;
				sg += g;
				sb += b;
				srr += r * r;
				sgg += g * g;
				sbb += b * b;
				count++;
			}
		}
		if (!count) {
			return {
				mean: { r: 0, g: 0, b: 0 },
				std: { r: 1, g: 1, b: 1 },
				lumaStd: 1,
			};
		}
		const mr = sr / count;
		const mg = sg / count;
		const mb = sb / count;
		const vr = Math.max(1, srr / count - mr * mr);
		const vg = Math.max(1, sgg / count - mg * mg);
		const vb = Math.max(1, sbb / count - mb * mb);
		return {
			mean: { r: mr, g: mg, b: mb },
			std: { r: Math.sqrt(vr), g: Math.sqrt(vg), b: Math.sqrt(vb) },
			lumaStd: Math.sqrt((vr + vg + vb) / 3),
		};
	}

	function applyPatchFromPolygon(work, source, dstPolygon, offsetX, offsetY) {
		if (!work || !source || !Array.isArray(dstPolygon) || dstPolygon.length < 3) return;
		const width = work.width;
		const height = work.height;
		const dst = work.data;
		const src = source.data;
		const bounds = getPolygonBounds(dstPolygon);
		if (!bounds) return;
		const feather = Math.max(5, Math.round(Math.min(bounds.w, bounds.h) * 0.14));
		const dstStats = samplePolygonStats(dst, width, height, dstPolygon, 0, 0);
		const srcStats = samplePolygonStats(src, width, height, dstPolygon, offsetX, offsetY);
		const x0 = Math.max(0, bounds.x);
		const y0 = Math.max(0, bounds.y);
		const x1 = Math.min(width - 1, bounds.x + bounds.w);
		const y1 = Math.min(height - 1, bounds.y + bounds.h);
		for (let dy = y0; dy <= y1; dy++) {
			for (let dx = x0; dx <= x1; dx++) {
				if (!pointInPolygon(dx + 0.5, dy + 0.5, dstPolygon)) continue;
				const sx = Math.round(dx + offsetX);
				const sy = Math.round(dy + offsetY);
				if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue;
				const edgeDist = distanceToPolygonEdge(dx + 0.5, dy + 0.5, dstPolygon);
				const a = Math.min(1, edgeDist / feather) * 0.95;
				if (a <= 0) continue;
				const di = (dy * width + dx) * 4;
				const si = (sy * width + sx) * 4;
				const srcR = src[si];
				const srcG = src[si + 1];
				const srcB = src[si + 2];
				const nr =
					((srcR - srcStats.mean.r) / Math.max(1, srcStats.std.r)) * dstStats.std.r +
					dstStats.mean.r;
				const ng =
					((srcG - srcStats.mean.g) / Math.max(1, srcStats.std.g)) * dstStats.std.g +
					dstStats.mean.g;
				const nb =
					((srcB - srcStats.mean.b) / Math.max(1, srcStats.std.b)) * dstStats.std.b +
					dstStats.mean.b;
				const lumDst = 0.299 * dst[di] + 0.587 * dst[di + 1] + 0.114 * dst[di + 2];
				const lumSrc = 0.299 * nr + 0.587 * ng + 0.114 * nb;
				const dl = (lumDst - lumSrc) * 0.55;
				dst[di] = clampByte(dst[di] * (1 - a) + (nr + dl) * a);
				dst[di + 1] = clampByte(dst[di + 1] * (1 - a) + (ng + dl) * a);
				dst[di + 2] = clampByte(dst[di + 2] * (1 - a) + (nb + dl) * a);
			}
		}
	}

	function paintRepairStroke(fromX, fromY, toX, toY, size, spacingPercent, stampFn) {
		const step = Math.max(0.5, (size * Math.max(1, spacingPercent)) / 100);
		const dx = toX - fromX;
		const dy = toY - fromY;
		const dist = Math.hypot(dx, dy);
		if (dist <= 0.0001) return;
		let traveled = 0;
		while (repairDistanceSinceLastStamp + (dist - traveled) >= step) {
			const need = step - repairDistanceSinceLastStamp;
			traveled += need;
			const t = traveled / dist;
			stampFn(fromX + dx * t, fromY + dy * t);
			repairDistanceSinceLastStamp = 0;
		}
		repairDistanceSinceLastStamp += dist - traveled;
	}

	function setActivePreset(btn) {
		brushPresets.forEach(p => p.classList.remove("active"));
		if (btn) btn.classList.add("active");
	}

	function showBrushPanel() {
		if (!brushPanel) return;
		closePanelsForCompact("brush");
		brushPanel.classList.remove("hidden");
		updateBrushLabels();
		drawBrushPreview();
	}

	function hideBrushPanel() {
		if (!brushPanel) return;
		brushPanel.classList.add("hidden");
	}

	function toggleBrushPanel() {
		if (!brushPanel) return;
		if (brushPanel.classList.contains("hidden")) {
			showBrushPanel();
		} else {
			hideBrushPanel();
		}
	}

	function getAdjustConfig(type) {
		switch (type) {
			case "curves":
				return { label: "Krzywe", min: 0, max: 0, value: 0, unit: "" };
			case "brightnessContrast":
				return {
					label: "Jasność",
					min: -100,
					max: 100,
					value: 0,
					unit: "%",
					second: {
						label: "Kontrast",
						min: -100,
						max: 100,
						value: 0,
						unit: "%",
					},
				};
			case "contrast":
				return { label: "Kontrast", min: -100, max: 100, value: 0, unit: "%" };
			case "saturation":
				return {
					label: "Jaskrawość",
					min: -100,
					max: 100,
					value: 0,
					unit: "%",
					second: {
						label: "Nasycenie",
						min: -100,
						max: 100,
						value: 0,
						unit: "%",
					},
				};
			case "hue":
				return { label: "Barwa", min: -180, max: 180, value: 0, unit: "°" };
			case "exposure":
				return { label: "Ekspozycja", min: -500, max: 500, value: 0, unit: " EV/100" };
			case "threshold":
				return { label: "Próg", min: 0, max: 255, value: 128, unit: "" };
			case "invert":
				return { label: "Negatyw", min: 0, max: 100, value: 100, unit: "%" };
			case "colorLookup3D":
				return { label: "Szukaj kolorów", min: 0, max: 0, value: 0, unit: "" };
			case "gradientMap":
				return { label: "Mapa gradientu", min: 0, max: 0, value: 0, unit: "" };
			case "reverseTone":
				return { label: "Odwróć", min: 0, max: 100, value: 100, unit: "%" };
			case "blackWhite":
			case "grayscale":
				return { label: "Czarno-białe", min: 0, max: 0, value: 0, unit: "" };
			case "colorBalance":
				return { label: "Balans kolorów", min: 0, max: 0, value: 0, unit: "" };
			default:
				return { label: "Jasność", min: -100, max: 100, value: 0, unit: "%" };
		}
	}

	function resetCurvePoints() {
		curvePointsByChannel[currentCurveChannel] = createDefaultCurvePoints();
	}

	function createDefaultCurvePoints() {
		return [
			{ x: 0, y: 0, fixed: true },
			{ x: 128, y: 128, fixed: false },
			{ x: 255, y: 255, fixed: true },
		];
	}

	function createDefaultCurvePointsByChannel() {
		return {
			master: createDefaultCurvePoints(),
			red: createDefaultCurvePoints(),
			green: createDefaultCurvePoints(),
			blue: createDefaultCurvePoints(),
		};
	}

	function sanitizeCurvePoints(points) {
		if (!Array.isArray(points) || points.length < 2) {
			return createDefaultCurvePoints();
		}
		const sanitized = points
			.map(p => ({
				x: Math.max(0, Math.min(255, Math.round(Number(p?.x ?? 0)))),
				y: Math.max(0, Math.min(255, Math.round(Number(p?.y ?? 0)))),
				fixed: !!p?.fixed,
			}))
			.sort((a, b) => a.x - b.x);
		sanitized[0] = { x: 0, y: sanitized[0]?.y ?? 0, fixed: true };
		sanitized[sanitized.length - 1] = {
			x: 255,
			y: sanitized[sanitized.length - 1]?.y ?? 255,
			fixed: true,
		};
		for (let i = 1; i < sanitized.length - 1; i++) {
			sanitized[i].x = Math.max(sanitized[i - 1].x + 1, sanitized[i].x);
			if (sanitized[i].x >= 255) {
				sanitized.splice(i, sanitized.length - i - 1);
				break;
			}
		}
		return sanitized;
	}

	function normalizeCurvePointsByChannel(curves) {
		if (Array.isArray(curves)) {
			return {
				...createDefaultCurvePointsByChannel(),
				master: sanitizeCurvePoints(curves),
			};
		}
		const normalized = createDefaultCurvePointsByChannel();
		curveChannelKeys.forEach(key => {
			normalized[key] = sanitizeCurvePoints(curves?.[key]);
		});
		return normalized;
	}

	function cloneCurvePointsByChannel(curves = curvePointsByChannel) {
		const out = {};
		curveChannelKeys.forEach(key => {
			out[key] = (curves?.[key] || []).map(p => ({ ...p }));
		});
		return out;
	}

	function getCurrentCurvePoints() {
		const points = curvePointsByChannel[currentCurveChannel];
		if (!Array.isArray(points)) {
			curvePointsByChannel[currentCurveChannel] = createDefaultCurvePoints();
		}
		return curvePointsByChannel[currentCurveChannel];
	}

	function setCurrentCurveChannel(channel) {
		if (!curveChannelKeys.includes(channel)) channel = "master";
		currentCurveChannel = channel;
		if (adjustCurvesChannelSelect && adjustCurvesChannelSelect.value !== channel) {
			adjustCurvesChannelSelect.value = channel;
		}
		activeCurvePointIndex = -1;
	}

	function getCurveChannelColors(channel) {
		switch (channel) {
			case "red":
				return { line: "#ff6f6f", active: "#ff6f6f", point: "#f3f4f7" };
			case "green":
				return { line: "#72d683", active: "#72d683", point: "#f3f4f7" };
			case "blue":
				return { line: "#6aa8ff", active: "#6aa8ff", point: "#f3f4f7" };
			default:
				return { line: "#f3f4f7", active: "#f3f4f7", point: "#f3f4f7" };
		}
	}

	function sortCurvePoints() {
		const points = getCurrentCurvePoints();
		points.sort((a, b) => a.x - b.x);
	}

	function toCurveCanvasX(x) {
		return (x / 255) * (adjustCurvesCanvas?.width || 240);
	}

	function toCurveCanvasY(y) {
		const h = adjustCurvesCanvas?.height || 240;
		return h - (y / 255) * h;
	}

	function fromCurveCanvasX(px) {
		const w = adjustCurvesCanvas?.width || 240;
		return Math.max(0, Math.min(255, (px / w) * 255));
	}

	function fromCurveCanvasY(py) {
		const h = adjustCurvesCanvas?.height || 240;
		return Math.max(0, Math.min(255, ((h - py) / h) * 255));
	}

	function getCurveCanvasPointFromEvent(e) {
		if (!adjustCurvesCanvas) return null;
		const rect = adjustCurvesCanvas.getBoundingClientRect();
		const px = ((e.clientX - rect.left) * adjustCurvesCanvas.width) / rect.width;
		const py = ((e.clientY - rect.top) * adjustCurvesCanvas.height) / rect.height;
		return {
			px: Math.max(0, Math.min(adjustCurvesCanvas.width, px)),
			py: Math.max(0, Math.min(adjustCurvesCanvas.height, py)),
		};
	}

	function findCurvePointAt(px, py, radius = 7) {
		const points = getCurrentCurvePoints();
		let idx = -1;
		let minDist = Number.POSITIVE_INFINITY;
		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			const cx = toCurveCanvasX(p.x);
			const cy = toCurveCanvasY(p.y);
			const d = Math.hypot(px - cx, py - cy);
			if (d <= radius && d < minDist) {
				minDist = d;
				idx = i;
			}
		}
		return idx;
	}

	function buildCurvesLut(points) {
		const lut = new Uint8ClampedArray(256);
		const pts = points.map(p => ({ ...p })).sort((a, b) => a.x - b.x);
		let seg = 0;
		for (let x = 0; x <= 255; x++) {
			while (seg < pts.length - 2 && x > pts[seg + 1].x) seg++;
			const a = pts[seg];
			const b = pts[Math.min(seg + 1, pts.length - 1)];
			const span = Math.max(1, b.x - a.x);
			const t = Math.max(0, Math.min(1, (x - a.x) / span));
			lut[x] = Math.max(0, Math.min(255, Math.round(a.y + (b.y - a.y) * t)));
		}
		return lut;
	}

	function drawCurvesEditor() {
		if (!adjustCurvesCanvas) return;
		const points = getCurrentCurvePoints();
		const curveColors = getCurveChannelColors(currentCurveChannel);
		const ctx = adjustCurvesCanvas.getContext("2d");
		if (!ctx) return;
		const w = adjustCurvesCanvas.width;
		const h = adjustCurvesCanvas.height;

		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = "#23252c";
		ctx.fillRect(0, 0, w, h);

		ctx.strokeStyle = "rgba(255,255,255,0.10)";
		ctx.lineWidth = 1;
		for (let i = 1; i < 4; i++) {
			const x = (w / 4) * i;
			const y = (h / 4) * i;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}

		ctx.strokeStyle = "rgba(180,183,192,0.45)";
		ctx.beginPath();
		ctx.moveTo(0, h);
		ctx.lineTo(w, 0);
		ctx.stroke();

		sortCurvePoints();
		ctx.strokeStyle = curveColors.line;
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(toCurveCanvasX(points[0].x), toCurveCanvasY(points[0].y));
		for (let i = 1; i < points.length; i++) {
			ctx.lineTo(toCurveCanvasX(points[i].x), toCurveCanvasY(points[i].y));
		}
		ctx.stroke();

		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			const cx = toCurveCanvasX(p.x);
			const cy = toCurveCanvasY(p.y);
			ctx.beginPath();
			ctx.fillStyle = i === activeCurvePointIndex ? curveColors.active : curveColors.point;
			ctx.strokeStyle = "#16171b";
			ctx.lineWidth = 1;
			ctx.arc(cx, cy, 4.2, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
		}
	}

	function clamp255(v) {
		return Math.max(0, Math.min(255, v));
	}

	function clamp01(v) {
		return Math.max(0, Math.min(1, v));
	}

	function formatWithComma(v, decimals) {
		return Number(v).toFixed(decimals).replace(".", ",");
	}

	function cloneImageData(src) {
		if (!src) return null;
		return new ImageData(new Uint8ClampedArray(src.data), src.width, src.height);
	}

	function getHueControlValues() {
		return {
			range: adjustHueRangeSelect?.value || "master",
			hue: parseFloat(adjustHueInput?.value || 0),
			saturation: parseFloat(adjustHueSaturationInput?.value || 0),
			lightness: parseFloat(adjustHueLightnessInput?.value || 0),
		};
	}

	function setHueControlValues(values = {}) {
		const nextRange = values.range || "master";
		const nextHue = Number(values.hue ?? 0);
		const nextSaturation = Number(values.saturation ?? 0);
		const nextLightness = Number(values.lightness ?? 0);

		if (adjustHueRangeSelect) adjustHueRangeSelect.value = nextRange;
		if (adjustHueInput) adjustHueInput.value = `${nextHue}`;
		if (adjustHueSaturationInput) adjustHueSaturationInput.value = `${nextSaturation}`;
		if (adjustHueLightnessInput) adjustHueLightnessInput.value = `${nextLightness}`;
		if (adjustHueText) adjustHueText.textContent = `${Math.round(nextHue)}`;
		if (adjustHueSaturationText) {
			adjustHueSaturationText.textContent = `${Math.round(nextSaturation)}%`;
		}
		if (adjustHueLightnessText) {
			adjustHueLightnessText.textContent = `${Math.round(nextLightness)}%`;
		}
	}

	function detectHuePresetKey(values = getHueControlValues()) {
		const keys = Object.keys(huePresets);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const preset = huePresets[key];
			if (
				preset.range === values.range &&
				preset.hue === values.hue &&
				preset.saturation === values.saturation &&
				preset.lightness === values.lightness
			) {
				return key;
			}
		}
		return "custom";
	}

	function syncHuePresetWithControls() {
		if (!adjustHuePresetSelect) return;
		adjustHuePresetSelect.value = detectHuePresetKey();
	}

	function setHuePreset(presetKey, options = {}) {
		const { render = true } = options;
		if (!adjustHuePresetSelect) return;
		const key = presetKey && (huePresets[presetKey] || presetKey === "custom")
			? presetKey
			: "default";
		adjustHuePresetSelect.value = key;
		if (key !== "custom" && huePresets[key]) {
			setHueControlValues(huePresets[key]);
		}
		if (render) renderAdjustPreview();
	}

	function getColorBalanceControlValues() {
		return {
			tone: adjustColorBalanceTone?.value || colorBalanceDefaults.tone,
			cyanRed: parseFloat(adjustColorBalanceCyanRedInput?.value || 0),
			magentaGreen: parseFloat(adjustColorBalanceMagentaGreenInput?.value || 0),
			yellowBlue: parseFloat(adjustColorBalanceYellowBlueInput?.value || 0),
			preserveLuminosity:
				adjustColorBalancePreserveLuminosityInput?.checked ??
				colorBalanceDefaults.preserveLuminosity,
		};
	}

	function setColorBalanceControlValues(values = {}) {
		const tone = values.tone || colorBalanceDefaults.tone;
		const cyanRed = Number(values.cyanRed ?? colorBalanceDefaults.cyanRed);
		const magentaGreen = Number(
			values.magentaGreen ?? colorBalanceDefaults.magentaGreen,
		);
		const yellowBlue = Number(
			values.yellowBlue ?? colorBalanceDefaults.yellowBlue,
		);
		const preserveLuminosity =
			values.preserveLuminosity ?? colorBalanceDefaults.preserveLuminosity;

		if (adjustColorBalanceTone) adjustColorBalanceTone.value = tone;
		if (adjustColorBalanceCyanRedInput) {
			adjustColorBalanceCyanRedInput.value = `${cyanRed}`;
		}
		if (adjustColorBalanceMagentaGreenInput) {
			adjustColorBalanceMagentaGreenInput.value = `${magentaGreen}`;
		}
		if (adjustColorBalanceYellowBlueInput) {
			adjustColorBalanceYellowBlueInput.value = `${yellowBlue}`;
		}
		if (adjustColorBalanceCyanRedText) {
			adjustColorBalanceCyanRedText.textContent = `${Math.round(cyanRed)}`;
		}
		if (adjustColorBalanceMagentaGreenText) {
			adjustColorBalanceMagentaGreenText.textContent = `${Math.round(magentaGreen)}`;
		}
		if (adjustColorBalanceYellowBlueText) {
			adjustColorBalanceYellowBlueText.textContent = `${Math.round(yellowBlue)}`;
		}
		if (adjustColorBalancePreserveLuminosityInput) {
			adjustColorBalancePreserveLuminosityInput.checked =
				!!preserveLuminosity;
		}
	}

	function getBlackWhiteControlValues() {
		return {
			reds: parseFloat(adjustBwRedsInput?.value || 40),
			yellows: parseFloat(adjustBwYellowsInput?.value || 60),
			greens: parseFloat(adjustBwGreensInput?.value || 40),
			cyans: parseFloat(adjustBwCyansInput?.value || 60),
			blues: parseFloat(adjustBwBluesInput?.value || 20),
			magentas: parseFloat(adjustBwMagentasInput?.value || 80),
			tintEnabled: !!adjustBlackWhiteTintEnabledInput?.checked,
			tintColor: adjustBlackWhiteTintColorInput?.value || "#e1d3b3",
			preset: adjustBlackWhitePresetSelect?.value || "default",
		};
	}

	function setBlackWhiteControlValues(values = {}) {
		const next = {
			...blackWhitePresets.default,
			...values,
		};
		if (adjustBwRedsInput) adjustBwRedsInput.value = `${next.reds}`;
		if (adjustBwYellowsInput) adjustBwYellowsInput.value = `${next.yellows}`;
		if (adjustBwGreensInput) adjustBwGreensInput.value = `${next.greens}`;
		if (adjustBwCyansInput) adjustBwCyansInput.value = `${next.cyans}`;
		if (adjustBwBluesInput) adjustBwBluesInput.value = `${next.blues}`;
		if (adjustBwMagentasInput) adjustBwMagentasInput.value = `${next.magentas}`;
		if (adjustBwRedsText) adjustBwRedsText.textContent = `${Math.round(next.reds)}`;
		if (adjustBwYellowsText) {
			adjustBwYellowsText.textContent = `${Math.round(next.yellows)}`;
		}
		if (adjustBwGreensText) adjustBwGreensText.textContent = `${Math.round(next.greens)}`;
		if (adjustBwCyansText) adjustBwCyansText.textContent = `${Math.round(next.cyans)}`;
		if (adjustBwBluesText) adjustBwBluesText.textContent = `${Math.round(next.blues)}`;
		if (adjustBwMagentasText) {
			adjustBwMagentasText.textContent = `${Math.round(next.magentas)}`;
		}
		if (adjustBlackWhiteTintEnabledInput) {
			adjustBlackWhiteTintEnabledInput.checked = !!next.tintEnabled;
		}
		if (adjustBlackWhiteTintColorInput) {
			adjustBlackWhiteTintColorInput.value = next.tintColor || "#e1d3b3";
			adjustBlackWhiteTintColorInput.disabled = !next.tintEnabled;
		}
		if (adjustBlackWhitePresetSelect) {
			adjustBlackWhitePresetSelect.value = next.preset || "default";
		}
	}

	function detectBlackWhitePreset(values = getBlackWhiteControlValues()) {
		const keys = Object.keys(blackWhitePresets);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const preset = blackWhitePresets[key];
			if (
				preset.reds === values.reds &&
				preset.yellows === values.yellows &&
				preset.greens === values.greens &&
				preset.cyans === values.cyans &&
				preset.blues === values.blues &&
				preset.magentas === values.magentas &&
				!!preset.tintEnabled === !!values.tintEnabled &&
				(preset.tintColor || "#e1d3b3").toLowerCase() ===
					(values.tintColor || "#e1d3b3").toLowerCase()
			) {
				return key;
			}
		}
		return "custom";
	}

	function syncBlackWhitePreset() {
		if (!adjustBlackWhitePresetSelect) return;
		adjustBlackWhitePresetSelect.value = detectBlackWhitePreset();
	}

	function applyBlackWhitePreset(presetKey, options = {}) {
		const { render = true } = options;
		if (!adjustBlackWhitePresetSelect) return;
		const key =
			presetKey && (blackWhitePresets[presetKey] || presetKey === "custom")
				? presetKey
				: "default";
		adjustBlackWhitePresetSelect.value = key;
		if (key !== "custom") {
			setBlackWhiteControlValues({
				...blackWhitePresets[key],
				preset: key,
			});
		}
		if (render) renderAdjustPreview();
	}

	function collectCurrentAdjustmentParams() {
		const params = { type: currentAdjustType };
		if (currentAdjustType === "exposure") {
			params.exposure = parseFloat(adjustExposureInput?.value || 0);
			params.offset = parseFloat(adjustOffsetInput?.value || 0);
			params.gamma = parseFloat(adjustGammaInput?.value || 100);
			return params;
		}
		if (currentAdjustType === "hue") {
			params.range = adjustHueRangeSelect?.value || "master";
			params.hue = parseFloat(adjustHueInput?.value || 0);
			params.saturation = parseFloat(adjustHueSaturationInput?.value || 0);
			params.lightness = parseFloat(adjustHueLightnessInput?.value || 0);
			params.huePreset = adjustHuePresetSelect?.value || detectHuePresetKey();
			return params;
		}
		if (currentAdjustType === "colorBalance") {
			const values = getColorBalanceControlValues();
			params.tone = values.tone;
			params.cyanRed = values.cyanRed;
			params.magentaGreen = values.magentaGreen;
			params.yellowBlue = values.yellowBlue;
			params.preserveLuminosity = values.preserveLuminosity;
			return params;
		}
		if (currentAdjustType === "blackWhite") {
			const values = getBlackWhiteControlValues();
			params.reds = values.reds;
			params.yellows = values.yellows;
			params.greens = values.greens;
			params.cyans = values.cyans;
			params.blues = values.blues;
			params.magentas = values.magentas;
			params.tintEnabled = values.tintEnabled;
			params.tintColor = values.tintColor;
			params.preset = values.preset || detectBlackWhitePreset(values);
			return params;
		}
		if (currentAdjustType === "colorLookup3D") {
			const key = adjustLut3DSelect?.value || "none";
			const lut = lut3DStore.get(key) || getOrBuildPresetLut3DByKey(key) || null;
			params.lutKey = key;
			params.lutLabel = adjustLut3DSelect?.selectedOptions?.[0]?.textContent || key;
			if (lut) params.lut = lut;
			return params;
		}
		if (currentAdjustType === "gradientMap") {
			const values = getGradientMapControlValues();
			params.startColor = values.startColor;
			params.endColor = values.endColor;
			params.startOpacity = values.startOpacity;
			params.endOpacity = values.endOpacity;
			params.extraStops = values.extraStops;
			params.dither = values.dither;
			params.reverse = values.reverse;
			return params;
		}
		if (currentAdjustType === "curves") {
			params.curveChannel = currentCurveChannel;
			params.curvePointsByChannel = cloneCurvePointsByChannel();
			params.curvePoints = params.curvePointsByChannel.master.map(p => ({ ...p }));
			return params;
		}
		params.value = parseFloat(adjustValueInput?.value || 0);
		params.value2 = parseFloat(adjustValueInput2?.value || 0);
		return params;
	}

	function applyAdjustmentParamsToControls(params) {
		if (!params) return;
		if (currentAdjustType === "exposure") {
			if (adjustExposureInput) adjustExposureInput.value = `${params.exposure ?? 0}`;
			if (adjustOffsetInput) adjustOffsetInput.value = `${params.offset ?? 0}`;
			if (adjustGammaInput) adjustGammaInput.value = `${params.gamma ?? 100}`;
			return;
		}
		if (currentAdjustType === "hue") {
			if (adjustHueRangeSelect) adjustHueRangeSelect.value = params.range || "master";
			if (adjustHueInput) adjustHueInput.value = `${params.hue ?? 0}`;
			if (adjustHueSaturationInput) {
				adjustHueSaturationInput.value = `${params.saturation ?? 0}`;
			}
			if (adjustHueLightnessInput) {
				adjustHueLightnessInput.value = `${params.lightness ?? 0}`;
			}
			if (adjustHuePresetSelect) {
				const presetKey = params.huePreset || detectHuePresetKey({
					range: params.range || "master",
					hue: Number(params.hue ?? 0),
					saturation: Number(params.saturation ?? 0),
					lightness: Number(params.lightness ?? 0),
				});
				adjustHuePresetSelect.value = presetKey;
			}
			return;
		}
		if (currentAdjustType === "colorBalance") {
			setColorBalanceControlValues({
				tone: params.tone ?? colorBalanceDefaults.tone,
				cyanRed: params.cyanRed ?? colorBalanceDefaults.cyanRed,
				magentaGreen: params.magentaGreen ?? colorBalanceDefaults.magentaGreen,
				yellowBlue: params.yellowBlue ?? colorBalanceDefaults.yellowBlue,
				preserveLuminosity:
					params.preserveLuminosity ?? colorBalanceDefaults.preserveLuminosity,
			});
			return;
		}
		if (currentAdjustType === "blackWhite") {
			setBlackWhiteControlValues({
				reds: params.reds ?? blackWhitePresets.default.reds,
				yellows: params.yellows ?? blackWhitePresets.default.yellows,
				greens: params.greens ?? blackWhitePresets.default.greens,
				cyans: params.cyans ?? blackWhitePresets.default.cyans,
				blues: params.blues ?? blackWhitePresets.default.blues,
				magentas: params.magentas ?? blackWhitePresets.default.magentas,
				tintEnabled: params.tintEnabled ?? blackWhitePresets.default.tintEnabled,
				tintColor: params.tintColor ?? blackWhitePresets.default.tintColor,
				preset: params.preset || "custom",
			});
			syncBlackWhitePreset();
			return;
		}
		if (currentAdjustType === "colorLookup3D") {
			const key = params.lutKey || "none";
			if (params.lut) {
				lut3DStore.set(key, params.lut);
				ensureLut3DOption(key, params.lutLabel || key);
			}
			if (adjustLut3DSelect) {
				adjustLut3DSelect.value = key;
			}
			lastLut3DKey = key;
			return;
		}
		if (currentAdjustType === "gradientMap") {
			setGradientMapControlValues({
				startColor: params.startColor || "#111111",
				endColor: params.endColor || "#f4f4f4",
				startOpacity: Number(params.startOpacity ?? 100),
				endOpacity: Number(params.endOpacity ?? 100),
				extraStops: Array.isArray(params.extraStops) ? params.extraStops : [],
				dither: !!params.dither,
				reverse: !!params.reverse,
			});
			return;
		}
		if (currentAdjustType === "curves") {
			const curveSet = params.curvePointsByChannel || params.curvePoints || null;
			curvePointsByChannel = normalizeCurvePointsByChannel(curveSet);
			setCurrentCurveChannel(params.curveChannel || "master");
			sortCurvePoints();
			return;
		}
		if (adjustValueInput && typeof params.value === "number") {
			adjustValueInput.value = `${params.value}`;
		}
		if (adjustValueInput2 && typeof params.value2 === "number") {
			adjustValueInput2.value = `${params.value2}`;
		}
	}

	function renderAdjustmentFromParams(sourceImageData, type, params = {}) {
		if (!sourceImageData) return null;
		if (type === "exposure") {
			return applyAdjustmentToImageData(
				sourceImageData,
				type,
				Number(params.exposure ?? 0),
				Number(params.offset ?? 0),
				Number(params.gamma ?? 100),
			);
		}
		if (type === "hue") {
			return applyAdjustmentToImageData(
				sourceImageData,
				type,
				Number(params.hue ?? 0),
				Number(params.saturation ?? 0),
				Number(params.lightness ?? 0),
				params.range || "master",
			);
		}
		if (type === "colorBalance") {
			return applyAdjustmentToImageData(
				sourceImageData,
				type,
				Number(params.cyanRed ?? 0),
				Number(params.magentaGreen ?? 0),
				Number(params.yellowBlue ?? 0),
				params.tone || "midtones",
				params.preserveLuminosity !== false,
			);
		}
		if (type === "blackWhite" || type === "grayscale") {
			return applyAdjustmentToImageData(sourceImageData, type, {
				reds: Number(params.reds ?? blackWhitePresets.default.reds),
				yellows: Number(params.yellows ?? blackWhitePresets.default.yellows),
				greens: Number(params.greens ?? blackWhitePresets.default.greens),
				cyans: Number(params.cyans ?? blackWhitePresets.default.cyans),
				blues: Number(params.blues ?? blackWhitePresets.default.blues),
				magentas: Number(params.magentas ?? blackWhitePresets.default.magentas),
				tintEnabled: !!params.tintEnabled,
				tintColor: params.tintColor || blackWhitePresets.default.tintColor,
			});
		}
		if (type === "colorLookup3D") {
			const key = params.lutKey || "none";
			const lut =
				params.lut ||
				lut3DStore.get(key) ||
				getOrBuildPresetLut3DByKey(key) ||
				null;
			return applyAdjustmentToImageData(sourceImageData, type, { lut });
		}
		if (type === "gradientMap") {
			return applyAdjustmentToImageData(sourceImageData, type, {
				startColor: params.startColor || "#111111",
				endColor: params.endColor || "#f4f4f4",
				startOpacity: Number(params.startOpacity ?? 100),
				endOpacity: Number(params.endOpacity ?? 100),
				extraStops: Array.isArray(params.extraStops) ? params.extraStops : [],
				dither: !!params.dither,
				reverse: !!params.reverse,
			});
		}
		if (type === "curves") {
			const originalCurveSet = cloneCurvePointsByChannel();
			const originalCurveChannel = currentCurveChannel;
			const curveSet = params.curvePointsByChannel || params.curvePoints || null;
			if (curveSet) {
				curvePointsByChannel = normalizeCurvePointsByChannel(curveSet);
			}
			setCurrentCurveChannel(params.curveChannel || "master");
			const out = applyAdjustmentToImageData(sourceImageData, type, 0, 0);
			curvePointsByChannel = originalCurveSet;
			setCurrentCurveChannel(originalCurveChannel);
			return out;
		}
		return applyAdjustmentToImageData(
			sourceImageData,
			type,
			Number(params.value ?? 0),
			Number(params.value2 ?? 0),
		);
	}

	function rgbToHsl(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0;
		let s = 0;
		const l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				default:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return [h, s, l];
	}

	function hslToRgb(h, s, l) {
		let r, g, b;
		if (s === 0) {
			r = g = b = l;
		} else {
			const hue2rgb = (p, q, t) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}
		return [r * 255, g * 255, b * 255];
	}

	function getHueRangeCenter(range) {
		switch (range) {
			case "reds":
				return 0;
			case "yellows":
				return 60;
			case "greens":
				return 120;
			case "cyans":
				return 180;
			case "blues":
				return 240;
			case "magentas":
				return 300;
			default:
				return null;
		}
	}

	function getHueRangeMask(range, hue01, saturation01) {
		if (!range || range === "master") return 1;
		const center = getHueRangeCenter(range);
		if (center == null) return 1;
		const hueDeg = ((hue01 * 360) % 360 + 360) % 360;
		const diff = Math.abs(((hueDeg - center + 540) % 360) - 180);
		const fullInfluence = 35;
		const featherEnd = 75;
		if (diff >= featherEnd) return 0;
		const base = diff <= fullInfluence ? 1 : (featherEnd - diff) / (featherEnd - fullInfluence);
		// Low-saturated pixels should be affected less for natural behavior.
		const satInfluence = clamp01((saturation01 - 0.03) / 0.2);
		return base * satInfluence;
	}

	function smoothstep(edge0, edge1, x) {
		const t = clamp01((x - edge0) / Math.max(0.00001, edge1 - edge0));
		return t * t * (3 - 2 * t);
	}

	function getToneWeight(luma01, tone) {
		const l = clamp01(luma01);
		if (tone === "shadows") {
			return smoothstep(0, 1, 1 - l * 1.6);
		}
		if (tone === "highlights") {
			return smoothstep(0, 1, l * 1.6 - 0.6);
		}
		const mid = 1 - Math.abs(l - 0.5) * 2;
		return smoothstep(0, 1, mid);
	}

	function parseHexColor(hex) {
		if (!hex || typeof hex !== "string") return { r: 225, g: 211, b: 179 };
		const s = hex.trim().replace(/^#/, "");
		if (s.length === 3) {
			return {
				r: parseInt(s[0] + s[0], 16),
				g: parseInt(s[1] + s[1], 16),
				b: parseInt(s[2] + s[2], 16),
			};
		}
		if (s.length === 6) {
			return {
				r: parseInt(s.slice(0, 2), 16),
				g: parseInt(s.slice(2, 4), 16),
				b: parseInt(s.slice(4, 6), 16),
			};
		}
		return { r: 225, g: 211, b: 179 };
	}

	function getGradientMapControlValues() {
		const extraStops = [];
		if (adjustGradientExtraStops) {
			const rows = adjustGradientExtraStops.querySelectorAll(".adjust-gradient-stop-row");
			rows.forEach(row => {
				const color = row.querySelector(".gradient-stop-color")?.value || "#ff8a00";
				const posRaw = row.querySelector(".gradient-stop-position")?.value || 50;
				const opacityRaw = row.querySelector(".gradient-stop-opacity")?.value || 100;
				extraStops.push({
					color,
					position: clampPercent(posRaw, 50),
					opacity: clampPercent(opacityRaw, 100),
				});
			});
		}
		return {
			startColor: adjustGradientStartColorInput?.value || "#111111",
			endColor: adjustGradientEndColorInput?.value || "#f4f4f4",
			startOpacity: clampPercent(adjustGradientStartOpacityInput?.value, 100),
			endOpacity: clampPercent(adjustGradientEndOpacityInput?.value, 100),
			extraStops,
			dither: !!adjustGradientDitherInput?.checked,
			reverse: !!adjustGradientReverseInput?.checked,
		};
	}

	function rgbToHex(r, g, b) {
		const c = (typeof r === "object" && r)
			? { r: r.r, g: r.g, b: r.b }
			: { r, g, b };
		const toHex = v => Math.max(0, Math.min(255, Number(v) || 0)).toString(16).padStart(2, "0");
		return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
	}

	function clampPercent(v, fallback = 0) {
		const n = Number(v);
		if (!Number.isFinite(n)) return fallback;
		return Math.max(0, Math.min(100, n));
	}

	function normalizeGradientStops(values = {}) {
		const stops = [];
		stops.push({
			position: 0,
			color: values.startColor || "#111111",
			opacity: clampPercent(values.startOpacity, 100) / 100,
		});
		const extras = Array.isArray(values.extraStops) ? values.extraStops : [];
		extras.forEach(stop => {
			stops.push({
				position: clampPercent(stop?.position, 50),
				color: stop?.color || "#ff8a00",
				opacity: clampPercent(stop?.opacity, 100) / 100,
			});
		});
		stops.push({
			position: 100,
			color: values.endColor || "#f4f4f4",
			opacity: clampPercent(values.endOpacity, 100) / 100,
		});
		stops.sort((a, b) => a.position - b.position);
		return stops;
	}

	function createGradientExtraStopElement(stop = {}) {
		const root = adjustGradientExtraStopTemplate?.content?.firstElementChild
			? adjustGradientExtraStopTemplate.content.firstElementChild.cloneNode(true)
			: document.createElement("div");
		if (!root.classList.contains("adjust-gradient-stop-row")) {
			root.className = "adjust-gradient-stop-row";
			root.innerHTML = `
				<input type="color" class="gradient-stop-color" value="#ff8a00" />
				<label>Pozycja</label>
				<div class="adjust-gradient-position">
					<input type="range" class="gradient-stop-position" min="0" max="100" value="50" />
					<div class="adjust-gradient-position-number">
						<input type="number" class="gradient-stop-position-number" min="0" max="100" value="50" />
						<span>%</span>
					</div>
				</div>
				<label>Widoczność</label>
				<div class="adjust-gradient-strength">
					<input type="range" class="gradient-stop-opacity" min="0" max="100" value="100" />
					<span class="gradient-stop-opacity-text">100%</span>
				</div>
				<button type="button" class="gradient-stop-remove">Usuń</button>
			`;
		}
		const color = stop.color || "#ff8a00";
		const position = clampPercent(stop.position, 50);
		const opacity = clampPercent(stop.opacity, 100);
		const colorInput = root.querySelector(".gradient-stop-color");
		const posRange = root.querySelector(".gradient-stop-position");
		const posNumber = root.querySelector(".gradient-stop-position-number");
		const opacityRange = root.querySelector(".gradient-stop-opacity");
		const opacityText = root.querySelector(".gradient-stop-opacity-text");
		if (colorInput) colorInput.value = color;
		if (posRange) posRange.value = `${position}`;
		if (posNumber) posNumber.value = `${position}`;
		if (opacityRange) opacityRange.value = `${opacity}`;
		if (opacityText) opacityText.textContent = `${Math.round(opacity)}%`;
		return root;
	}

	function renderGradientExtraStops(stops = []) {
		if (!adjustGradientExtraStops) return;
		adjustGradientExtraStops.innerHTML = "";
		stops.forEach(stop => {
			adjustGradientExtraStops.appendChild(createGradientExtraStopElement(stop));
		});
	}

	function syncGradientExtraStopRow(row, source = "range") {
		if (!row) return;
		const posRange = row.querySelector(".gradient-stop-position");
		const posNumber = row.querySelector(".gradient-stop-position-number");
		const opacityRange = row.querySelector(".gradient-stop-opacity");
		const opacityText = row.querySelector(".gradient-stop-opacity-text");
		if (posRange && posNumber) {
			const raw = source === "number" ? posNumber.value : posRange.value;
			const nextPos = clampPercent(raw, 50);
			posRange.value = `${nextPos}`;
			posNumber.value = `${nextPos}`;
		}
		if (opacityRange && opacityText) {
			const nextOpacity = clampPercent(opacityRange.value, 100);
			opacityRange.value = `${nextOpacity}`;
			opacityText.textContent = `${Math.round(nextOpacity)}%`;
		}
	}

	function sampleGradientStops(stops, t) {
		if (!stops.length) {
			return { r: 0, g: 0, b: 0, a: 1 };
		}
		const tPos = clampPercent(t * 100, 0);
		let left = stops[0];
		let right = stops[stops.length - 1];
		for (let i = 0; i < stops.length - 1; i++) {
			const a = stops[i];
			const b = stops[i + 1];
			if (tPos >= a.position && tPos <= b.position) {
				left = a;
				right = b;
				break;
			}
		}
		const span = Math.max(0.0001, right.position - left.position);
		const k = clamp01((tPos - left.position) / span);
		const c1 = left.rgb || parseHexColor(left.color);
		const c2 = right.rgb || parseHexColor(right.color);
		const a1 = Number(left.opacity ?? 1);
		const a2 = Number(right.opacity ?? 1);
		return {
			r: c1.r + (c2.r - c1.r) * k,
			g: c1.g + (c2.g - c1.g) * k,
			b: c1.b + (c2.b - c1.b) * k,
			a: a1 + (a2 - a1) * k,
		};
	}

	function updateGradientOpacityTexts(values = {}) {
		if (adjustGradientStartOpacityText) {
			adjustGradientStartOpacityText.textContent =
				`${Math.round(clampPercent(values.startOpacity, 100))}%`;
		}
		if (adjustGradientEndOpacityText) {
			adjustGradientEndOpacityText.textContent =
				`${Math.round(clampPercent(values.endOpacity, 100))}%`;
		}
	}

	function setGradientMapControlValues(values = {}) {
		const startColor = values.startColor || "#111111";
		const endColor = values.endColor || "#f4f4f4";
		const startOpacity = clampPercent(values.startOpacity, 100);
		const endOpacity = clampPercent(values.endOpacity, 100);
		const extraStops = Array.isArray(values.extraStops) ? values.extraStops : [];
		const dither = !!values.dither;
		const reverse = !!values.reverse;
		if (adjustGradientStartColorInput) adjustGradientStartColorInput.value = startColor;
		if (adjustGradientEndColorInput) adjustGradientEndColorInput.value = endColor;
		if (adjustGradientStartOpacityInput) adjustGradientStartOpacityInput.value = `${startOpacity}`;
		if (adjustGradientEndOpacityInput) adjustGradientEndOpacityInput.value = `${endOpacity}`;
		if (adjustGradientDitherInput) adjustGradientDitherInput.checked = dither;
		if (adjustGradientReverseInput) adjustGradientReverseInput.checked = reverse;
		renderGradientExtraStops(extraStops);
		updateGradientOpacityTexts({ startOpacity, endOpacity });
		if (adjustGradientMapPreview) {
			const stops = normalizeGradientStops({
				startColor,
				endColor,
				startOpacity,
				endOpacity,
				extraStops,
			});
			const gradientStops = stops
				.map(stop => {
					const rgb = parseHexColor(stop.color);
					return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.max(0, Math.min(1, stop.opacity))}) ${stop.position}%`;
				})
				.join(", ");
			const checker =
				"linear-gradient(45deg, #2b2e36 25%, #242730 25%, #242730 50%, #2b2e36 50%, #2b2e36 75%, #242730 75%, #242730 100%)";
			adjustGradientMapPreview.style.backgroundImage =
				`linear-gradient(90deg, ${gradientStops}), ${checker}`;
			adjustGradientMapPreview.style.backgroundSize = "100% 100%, 12px 12px";
		}
	}

	function ensureLut3DOption(key, label) {
		if (!adjustLut3DSelect || !key) return;
		const exists = [...adjustLut3DSelect.options].some(o => o.value === key);
		if (exists) return;
		const opt = document.createElement("option");
		opt.value = key;
		opt.textContent = label || key;
		adjustLut3DSelect.appendChild(opt);
	}

	function registerLut3DPresetOptions() {
		if (!adjustLut3DSelect) return;
		lut3DPresetDefs.forEach(def => {
			ensureLut3DOption(def.key, def.label);
		});
	}

	function buildProceduralLut3D(styleId, size = 17) {
		const lutData = new Float32Array(size * size * size * 3);
		const clamp = v => Math.max(0, Math.min(1, v));
		const style = String(styleId || "").toLowerCase();
		let idx = 0;
		for (let ri = 0; ri < size; ri++) {
			for (let gi = 0; gi < size; gi++) {
				for (let bi = 0; bi < size; bi++) {
					let r = ri / (size - 1);
					let g = gi / (size - 1);
					let b = bi / (size - 1);
					let rr = r;
					let gg = g;
					let bb = b;
					const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
					const [h0, s0, l0] = rgbToHsl(r * 255, g * 255, b * 255);

					switch (style) {
						case "2strip":
							rr = clamp(lum * 1.08 + 0.10);
							gg = clamp(lum * 0.92 + 0.02);
							bb = clamp(lum * 0.68 - 0.08);
							break;
						case "3strip":
							rr = clamp(r * 1.12 + 0.04);
							gg = clamp(g * 1.03 + 0.01);
							bb = clamp(b * 0.90 - 0.02);
							break;
						case "bleach":
							rr = clamp(lum * 0.45 + r * 0.7 + 0.02);
							gg = clamp(lum * 0.45 + g * 0.7 + 0.02);
							bb = clamp(lum * 0.45 + b * 0.7 + 0.02);
							break;
						case "candle":
							rr = clamp(r * 1.12 + 0.08);
							gg = clamp(g * 0.96 + 0.03);
							bb = clamp(b * 0.78 - 0.04);
							break;
						case "crispwarm":
							rr = clamp(Math.pow(r, 0.9) * 1.05 + 0.03);
							gg = clamp(Math.pow(g, 0.95) * 1.00 + 0.01);
							bb = clamp(Math.pow(b, 1.08) * 0.92);
							break;
						case "crispwinter":
							rr = clamp(r * 0.92 + 0.01);
							gg = clamp(g * 1.00 + 0.01);
							bb = clamp(b * 1.10 + 0.04);
							break;
						case "dropblues":
							rr = clamp(r * 1.04 + 0.02);
							gg = clamp(g * 1.03 + 0.01);
							bb = clamp(b * 0.70 - 0.05);
							break;
						case "edgyamber":
							rr = clamp(r * 1.10 + 0.05);
							gg = clamp(g * 0.97 + 0.02);
							bb = clamp(b * 0.80 - 0.04);
							break;
						case "foggynight":
							rr = clamp(r * 0.86 + lum * 0.12 + 0.02);
							gg = clamp(g * 0.90 + lum * 0.10 + 0.02);
							bb = clamp(b * 0.96 + lum * 0.12 + 0.03);
							break;
						case "futuristic":
							rr = clamp(r * 0.90 + 0.01);
							gg = clamp(g * 0.97 + 0.02);
							bb = clamp(b * 1.09 + 0.03);
							break;
						case "horrorblue":
							rr = clamp(r * 0.84);
							gg = clamp(g * 0.92 + 0.01);
							bb = clamp(b * 1.14 + 0.05);
							break;
						case "latesunset":
							rr = clamp(r * 1.14 + 0.05);
							gg = clamp(g * 1.00 + 0.02);
							bb = clamp(b * 0.84 - 0.02);
							break;
						case "moonlight":
							rr = clamp(r * 0.88 + 0.01);
							gg = clamp(g * 0.95 + 0.01);
							bb = clamp(b * 1.08 + 0.03);
							break;
						case "nightfromday":
							rr = clamp(0.05 + Math.pow(r, 1.2) * 0.55);
							gg = clamp(0.06 + Math.pow(g, 1.2) * 0.55);
							bb = clamp(0.12 + Math.pow(b, 1.1) * 0.72);
							break;
						case "softwarming":
							rr = clamp(r * 1.05 + 0.03);
							gg = clamp(g * 1.01 + 0.015);
							bb = clamp(b * 0.95);
							break;
						case "tealorange": {
							const warm = clamp((h0 < 0.14 || h0 > 0.94) ? 1 : 0);
							const cool = clamp(h0 > 0.42 && h0 < 0.62 ? 1 : 0);
							rr = clamp(r * (1 + 0.12 * warm - 0.04 * cool) + 0.01);
							gg = clamp(g * (1 + 0.04 * cool));
							bb = clamp(b * (1 + 0.14 * cool - 0.06 * warm) + 0.01);
							break;
						}
						case "tensiongreen":
							rr = clamp(r * 0.92 + 0.01);
							gg = clamp(g * 1.12 + 0.03);
							bb = clamp(b * 0.90 + 0.01);
							break;
						default:
							break;
					}

					let [h1, s1, l1] = rgbToHsl(rr * 255, gg * 255, bb * 255);
					if (style === "bleach") {
						s1 = clamp(s1 * 0.55);
						l1 = clamp(l1 * 1.05);
					} else if (style === "foggynight") {
						s1 = clamp(s1 * 0.72);
						l1 = clamp(l1 * 0.9 + 0.03);
					} else if (style === "horrorblue" || style === "nightfromday") {
						s1 = clamp(s1 * 0.9 + 0.05);
					} else if (style === "tealorange") {
						s1 = clamp(s1 * 1.08 + 0.02);
						l1 = clamp(l1 * 1.02);
					} else {
						s1 = clamp(s1 * 1.02);
					}
					[rr, gg, bb] = hslToRgb(h1, s1, l1).map(v => clamp(v / 255));

					lutData[idx++] = rr;
					lutData[idx++] = gg;
					lutData[idx++] = bb;
				}
			}
		}
		return {
			size,
			domainMin: [0, 0, 0],
			domainMax: [1, 1, 1],
			data: lutData,
		};
	}

	function getOrBuildPresetLut3DByKey(key) {
		if (!key || !key.startsWith("preset:")) return null;
		const cached = lut3DStore.get(key);
		if (cached) return cached;
		const def = lut3DPresetDefs.find(p => p.key === key);
		if (!def) return null;
		const lut = buildProceduralLut3D(def.style, 17);
		lut3DStore.set(key, lut);
		return lut;
	}

	function parseCubeLut3D(text) {
		const lines = String(text || "")
			.split(/\r?\n/)
			.map(l => l.trim())
			.filter(l => l && !l.startsWith("#"));
		let size = 0;
		let domainMin = [0, 0, 0];
		let domainMax = [1, 1, 1];
		const values = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const upper = line.toUpperCase();
			if (upper.startsWith("TITLE")) continue;
			if (upper.startsWith("LUT_3D_SIZE")) {
				const n = parseInt(line.split(/\s+/)[1] || "0", 10);
				size = Number.isFinite(n) ? n : 0;
				continue;
			}
			if (upper.startsWith("DOMAIN_MIN")) {
				const p = line.split(/\s+/).slice(1).map(Number);
				if (p.length >= 3) domainMin = [p[0], p[1], p[2]];
				continue;
			}
			if (upper.startsWith("DOMAIN_MAX")) {
				const p = line.split(/\s+/).slice(1).map(Number);
				if (p.length >= 3) domainMax = [p[0], p[1], p[2]];
				continue;
			}
			const nums = line.split(/\s+/).map(Number);
			if (nums.length >= 3 && nums.every(Number.isFinite)) {
				values.push(nums[0], nums[1], nums[2]);
			}
		}

		if (!size || values.length !== size * size * size * 3) {
			return null;
		}

		return {
			size,
			domainMin,
			domainMax,
			data: new Float32Array(values),
		};
	}

	function getLut3DColor(lut, r, g, b) {
		if (!lut || !lut.data || !lut.size) return [r, g, b];
		const size = lut.size;
		const min = lut.domainMin || [0, 0, 0];
		const max = lut.domainMax || [1, 1, 1];
		const toNorm = (v, i) => {
			const span = (max[i] ?? 1) - (min[i] ?? 0);
			if (Math.abs(span) < 1e-6) return 0;
			return Math.max(0, Math.min(1, (v / 255 - (min[i] ?? 0)) / span));
		};
		const rf = toNorm(r, 0) * (size - 1);
		const gf = toNorm(g, 1) * (size - 1);
		const bf = toNorm(b, 2) * (size - 1);
		const r0 = Math.floor(rf);
		const g0 = Math.floor(gf);
		const b0 = Math.floor(bf);
		const r1 = Math.min(size - 1, r0 + 1);
		const g1 = Math.min(size - 1, g0 + 1);
		const b1 = Math.min(size - 1, b0 + 1);
		const tr = rf - r0;
		const tg = gf - g0;
		const tb = bf - b0;
		const idx = (ri, gi, bi) => ((ri * size + gi) * size + bi) * 3;
		const c = (ri, gi, bi) => {
			const i = idx(ri, gi, bi);
			return [lut.data[i], lut.data[i + 1], lut.data[i + 2]];
		};
		const c000 = c(r0, g0, b0);
		const c001 = c(r0, g0, b1);
		const c010 = c(r0, g1, b0);
		const c011 = c(r0, g1, b1);
		const c100 = c(r1, g0, b0);
		const c101 = c(r1, g0, b1);
		const c110 = c(r1, g1, b0);
		const c111 = c(r1, g1, b1);
		const lerp = (a, b, t) => a + (b - a) * t;
		const mix = (a, b, t) => [
			lerp(a[0], b[0], t),
			lerp(a[1], b[1], t),
			lerp(a[2], b[2], t),
		];
		const c00 = mix(c000, c001, tb);
		const c01 = mix(c010, c011, tb);
		const c10 = mix(c100, c101, tb);
		const c11 = mix(c110, c111, tb);
		const c0 = mix(c00, c01, tg);
		const c1 = mix(c10, c11, tg);
		return mix(c0, c1, tr);
	}

	function applyAdjustmentToImageData(
		source,
		type,
		value,
		value2 = 0,
		value3 = 100,
		value4 = "master",
		value5 = true,
	) {
		const result = new ImageData(
			new Uint8ClampedArray(source.data),
			source.width,
			source.height,
		);
		const d = result.data;
		const curvesLut =
			type === "curves"
				? {
						master: buildCurvesLut(curvePointsByChannel.master),
						red: buildCurvesLut(curvePointsByChannel.red),
						green: buildCurvesLut(curvePointsByChannel.green),
						blue: buildCurvesLut(curvePointsByChannel.blue),
					}
				: null;
		const gradientStops =
			type === "gradientMap"
				? normalizeGradientStops(
						(value && typeof value === "object")
							? value
							: { startColor: "#111111", endColor: "#f4f4f4", startOpacity: 100, endOpacity: 100, extraStops: [] },
					).map(stop => ({
						...stop,
						rgb: parseHexColor(stop.color),
					}))
				: null;
		const bwOpts =
			type === "blackWhite" || type === "grayscale"
				? (typeof value === "object" && value
						? value
						: {
								reds: 40,
								yellows: 60,
								greens: 40,
								cyans: 60,
								blues: 20,
								magentas: 80,
								tintEnabled: false,
								tintColor: "#e1d3b3",
							})
				: null;
		let bwTintHS = null;
		if (bwOpts?.tintEnabled) {
			const tint = parseHexColor(bwOpts.tintColor || "#e1d3b3");
			const [hTint, sTint] = rgbToHsl(tint.r, tint.g, tint.b);
			bwTintHS = { h: hTint, s: sTint };
		}

		for (let i = 0; i < d.length; i += 4) {
			let r = d[i];
			let g = d[i + 1];
			let b = d[i + 2];

			if (type === "brightnessContrast") {
				const offset = (value / 100) * 255;
				r = clamp255(r + offset);
				g = clamp255(g + offset);
				b = clamp255(b + offset);
				const c2 = Math.max(-100, Math.min(100, value2));
				const f2 = (259 * (c2 + 255)) / (255 * (259 - c2));
				r = clamp255(f2 * (r - 128) + 128);
				g = clamp255(f2 * (g - 128) + 128);
				b = clamp255(f2 * (b - 128) + 128);
			} else if (type === "brightness") {
				const offset = (value / 100) * 255;
				r = clamp255(r + offset);
				g = clamp255(g + offset);
				b = clamp255(b + offset);
			} else if (type === "contrast") {
				const c = Math.max(-100, Math.min(100, value));
				const f = (259 * (c + 255)) / (255 * (259 - c));
				r = clamp255(f * (r - 128) + 128);
				g = clamp255(f * (g - 128) + 128);
				b = clamp255(f * (b - 128) + 128);
			} else if (type === "saturation") {
				const vibrance = Math.max(-100, Math.min(100, value)) / 100;
				const saturation = Math.max(-100, Math.min(100, value2)) / 100;
				let [h, s, l] = rgbToHsl(r, g, b);

				if (vibrance >= 0) {
					s += vibrance * (1 - s);
				} else {
					s *= 1 + vibrance;
				}

				s *= 1 + saturation;
				s = clamp01(s);
				[r, g, b] = hslToRgb(h, s, l);
			} else if (type === "hue") {
				const [h0, s0, l0] = rgbToHsl(r, g, b);
				let h = h0;
				let s = s0;
				let l = l0;
				const hueShift = Math.max(-180, Math.min(180, value));
				const satAdjust = Math.max(-100, Math.min(100, value2)) / 100;
				const lightAdjust = Math.max(-100, Math.min(100, value3)) / 100;
				const mask = getHueRangeMask(value4, h0, s0);

				h = (h + hueShift / 360) % 1;
				if (h < 0) h += 1;

				// "Barwa" ma byc widoczna takze na slabo nasyconych partiach.
				if (Math.abs(hueShift) > 0.001 && s < 0.02 && satAdjust >= 0) {
					s = 0.12;
				}
				if (satAdjust >= 0) {
					s = clamp01(s + satAdjust * (1 - s));
				} else {
					s = clamp01(s * (1 + satAdjust));
				}
				l = clamp01(l + lightAdjust);
				const [nr, ng, nb] = hslToRgb(h, s, l);
				r = clamp255(r * (1 - mask) + nr * mask);
				g = clamp255(g * (1 - mask) + ng * mask);
				b = clamp255(b * (1 - mask) + nb * mask);
			} else if (type === "exposure") {
				const ev = value / 100;
				const offset = value2 / 10000;
				const gammaCorr = Math.max(0.01, value3 / 100);
				const factor = Math.pow(2, ev);

				const rf = clamp01(Math.pow(r / 255, 2.2) * factor + offset);
				const gf = clamp01(Math.pow(g / 255, 2.2) * factor + offset);
				const bf = clamp01(Math.pow(b / 255, 2.2) * factor + offset);

				r = clamp255(255 * Math.pow(Math.pow(rf, 1 / gammaCorr), 1 / 2.2));
				g = clamp255(255 * Math.pow(Math.pow(gf, 1 / gammaCorr), 1 / 2.2));
				b = clamp255(255 * Math.pow(Math.pow(bf, 1 / gammaCorr), 1 / 2.2));
			} else if (type === "threshold") {
				const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				const v = gray >= value ? 255 : 0;
				r = g = b = v;
			} else if (type === "invert") {
				const a = Math.max(0, Math.min(100, value)) / 100;
				r = clamp255(r * (1 - a) + (255 - r) * a);
				g = clamp255(g * (1 - a) + (255 - g) * a);
				b = clamp255(b * (1 - a) + (255 - b) * a);
			} else if (type === "colorLookup3D") {
				const lut = value && typeof value === "object" ? value.lut : null;
				if (lut) {
					const [lr, lg, lb] = getLut3DColor(lut, r, g, b);
					r = clamp255(lr * 255);
					g = clamp255(lg * 255);
					b = clamp255(lb * 255);
				}
			} else if (type === "gradientMap") {
				const opts = (value && typeof value === "object") ? value : {};
				let t = clamp01((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255);
				if (opts.reverse) t = 1 - t;
				if (opts.dither) {
					const noise = (Math.random() - 0.5) * (1 / 255) * 8;
					t = clamp01(t + noise);
				}
				const sampled = sampleGradientStops(gradientStops || [], t);
				const alpha = clamp01(sampled.a);
				r = clamp255(r * (1 - alpha) + sampled.r * alpha);
				g = clamp255(g * (1 - alpha) + sampled.g * alpha);
				b = clamp255(b * (1 - alpha) + sampled.b * alpha);
			} else if (type === "blackWhite" || type === "grayscale") {
				const opts = bwOpts;
				const [h0, s0] = rgbToHsl(r, g, b);
				const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				const redW = getHueRangeMask("reds", h0, s0);
				const yellowW = getHueRangeMask("yellows", h0, s0);
				const greenW = getHueRangeMask("greens", h0, s0);
				const cyanW = getHueRangeMask("cyans", h0, s0);
				const blueW = getHueRangeMask("blues", h0, s0);
				const magentaW = getHueRangeMask("magentas", h0, s0);
				const totalW =
					redW + yellowW + greenW + cyanW + blueW + magentaW;
				const mix =
					redW * (Number(opts.reds ?? 40) / 100) +
					yellowW * (Number(opts.yellows ?? 60) / 100) +
					greenW * (Number(opts.greens ?? 40) / 100) +
					cyanW * (Number(opts.cyans ?? 60) / 100) +
					blueW * (Number(opts.blues ?? 20) / 100) +
					magentaW * (Number(opts.magentas ?? 80) / 100);
				const neutralMix = 0.6;
				const factor = totalW > 0.0001 ? mix / totalW : neutralMix;
				const gray = clamp255(luma * (0.35 + factor));

				r = gray;
				g = gray;
				b = gray;

				if (opts.tintEnabled && bwTintHS) {
					[r, g, b] = hslToRgb(bwTintHS.h, bwTintHS.s, gray / 255);
				}
			} else if (type === "colorBalance") {
				const tone = value4 || "midtones";
				const preserveLuminosity = value5 !== false;
				const cyanRed = Math.max(-100, Math.min(100, value));
				const magentaGreen = Math.max(-100, Math.min(100, value2));
				const yellowBlue = Math.max(-100, Math.min(100, value3));
				const [, , origL] = rgbToHsl(r, g, b);
				const luma =
					(0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
				const toneWeight = getToneWeight(luma, tone);
				const strength = toneWeight * 0.85;

				r = clamp255(r + cyanRed * strength);
				g = clamp255(g + magentaGreen * strength);
				b = clamp255(b + yellowBlue * strength);

				if (preserveLuminosity) {
					let [h2, s2] = rgbToHsl(r, g, b);
					[r, g, b] = hslToRgb(h2, s2, origL);
				}
			} else if (type === "reverseTone") {
				const a = Math.max(0, Math.min(100, value)) / 100;
				const [h, s, l] = rgbToHsl(r, g, b);
				const invL = 1 - l;
				const nextL = l * (1 - a) + invL * a;
				[r, g, b] = hslToRgb(h, s, nextL);
			} else if (type === "curves") {
				r = curvesLut.red[curvesLut.master[r]];
				g = curvesLut.green[curvesLut.master[g]];
				b = curvesLut.blue[curvesLut.master[b]];
			}

			d[i] = clamp255(r);
			d[i + 1] = clamp255(g);
			d[i + 2] = clamp255(b);
		}

		return result;
	}

	function beginAdjustSession() {
		if (isActiveLayerLocked()) {
			alert("Aktywna warstwa jest zablokowana.");
			return false;
		}
		const ctx = getActiveCtx();
		if (!ctx) return false;

		// Przy przełączaniu typu korekty nie nakładaj poprzedniego podglądu.
		// Bazujemy zawsze na obrazie źródłowym z początku sesji.
		if (!adjustSourceImageData) {
			adjustSourceImageData = ctx.getImageData(
				0,
				0,
				ctx.canvas.width,
				ctx.canvas.height,
			);
		}
		if (!adjustOriginalLayerImageData) {
			adjustOriginalLayerImageData = ctx.getImageData(
				0,
				0,
				ctx.canvas.width,
				ctx.canvas.height,
			);
		}

		ctx.putImageData(adjustSourceImageData, 0, 0);
		return true;
	}

	function renderAdjustPreview() {
		if (!adjustSourceImageData || !adjustValueInput) return;
		const ctx = getActiveCtx();
		if (!ctx) return;

		if (currentAdjustType === "exposure") {
			const exposure = parseFloat(adjustExposureInput?.value || 0);
			const offset = parseFloat(adjustOffsetInput?.value || 0);
			const gamma = parseFloat(adjustGammaInput?.value || 100);

			if (adjustExposureText) {
				adjustExposureText.textContent = formatWithComma(exposure / 100, 2);
			}
			if (adjustOffsetText) {
				adjustOffsetText.textContent = formatWithComma(offset / 10000, 4);
			}
			if (adjustGammaText) {
				adjustGammaText.textContent = formatWithComma(gamma / 100, 2);
			}

			const out = applyAdjustmentToImageData(
				adjustSourceImageData,
				currentAdjustType,
				exposure,
				offset,
				gamma,
			);
			ctx.putImageData(out, 0, 0);
			return;
		}
		if (currentAdjustType === "hue") {
			const hue = parseFloat(adjustHueInput?.value || 0);
			const saturation = parseFloat(adjustHueSaturationInput?.value || 0);
			const lightness = parseFloat(adjustHueLightnessInput?.value || 0);
			const range = adjustHueRangeSelect?.value || "master";

			if (adjustHueText) {
				adjustHueText.textContent = `${Math.round(hue)}`;
			}
			if (adjustHueSaturationText) {
				adjustHueSaturationText.textContent = `${Math.round(saturation)}%`;
			}
			if (adjustHueLightnessText) {
				adjustHueLightnessText.textContent = `${Math.round(lightness)}%`;
			}
			syncHuePresetWithControls();

			const out = applyAdjustmentToImageData(
				adjustSourceImageData,
				currentAdjustType,
				hue,
				saturation,
				lightness,
				range,
			);
			ctx.putImageData(out, 0, 0);
			return;
		}
		if (currentAdjustType === "colorBalance") {
			const values = getColorBalanceControlValues();
			setColorBalanceControlValues(values);

			const out = applyAdjustmentToImageData(
				adjustSourceImageData,
				currentAdjustType,
				values.cyanRed,
				values.magentaGreen,
				values.yellowBlue,
				values.tone,
				values.preserveLuminosity,
			);
			ctx.putImageData(out, 0, 0);
			return;
		}
		if (currentAdjustType === "blackWhite") {
			const values = getBlackWhiteControlValues();
			setBlackWhiteControlValues(values);
			syncBlackWhitePreset();
			const out = applyAdjustmentToImageData(
				adjustSourceImageData,
				currentAdjustType,
				values,
			);
			ctx.putImageData(out, 0, 0);
			return;
		}
		if (currentAdjustType === "colorLookup3D") {
			const key = adjustLut3DSelect?.value || "none";
			lastLut3DKey = key;
			const lut = lut3DStore.get(key) || getOrBuildPresetLut3DByKey(key) || null;
			if (adjustLut3DInfo) {
				adjustLut3DInfo.textContent =
					lut && key !== "none"
						? `Aktywny LUT 3D: ${adjustLut3DSelect?.selectedOptions?.[0]?.textContent || key}`
						: "Brak aktywnego LUT 3D.";
			}
			const out = applyAdjustmentToImageData(
				adjustSourceImageData,
				currentAdjustType,
				{ lut },
			);
			ctx.putImageData(out, 0, 0);
			return;
		}
		if (currentAdjustType === "gradientMap") {
			const values = getGradientMapControlValues();
			setGradientMapControlValues(values);
			const out = applyAdjustmentToImageData(
				adjustSourceImageData,
				currentAdjustType,
				values,
			);
			ctx.putImageData(out, 0, 0);
			return;
		}

		const value = parseFloat(adjustValueInput.value || 0);
		const value2 = parseFloat(adjustValueInput2?.value || 0);
		const cfg = getAdjustConfig(currentAdjustType);
		if (adjustValueText) {
			adjustValueText.textContent = `${Math.round(value)}${cfg.unit}`;
		}
		if (adjustValueText2 && cfg.second) {
			adjustValueText2.textContent = `${Math.round(value2)}${cfg.second.unit}`;
		}
		const out = applyAdjustmentToImageData(
			adjustSourceImageData,
			currentAdjustType,
			value,
			value2,
		);
		ctx.putImageData(out, 0, 0);
	}

	function setAdjustType(type, options = {}) {
		const { skipBeginSession = false, presetParams = null } = options;
		if (type === "sepia") type = "colorBalance";
		if (type === "grayscale") type = "blackWhite";
		currentAdjustType = type || "brightnessContrast";
		adjustButtons.forEach(btn =>
			btn.classList.toggle("active", btn.dataset.adjust === currentAdjustType),
		);
		const cfg = getAdjustConfig(currentAdjustType);
		if (adjustValueLabel) adjustValueLabel.textContent = cfg.label;
		if (adjustValueInput) {
			adjustValueInput.min = cfg.min;
			adjustValueInput.max = cfg.max;
			adjustValueInput.value = cfg.value;
		}
		if (adjustValueText) {
			adjustValueText.textContent = `${cfg.value}${cfg.unit}`;
		}
		const isCurves = currentAdjustType === "curves";
		const isExposure = currentAdjustType === "exposure";
		const isHue = currentAdjustType === "hue";
		const isColorBalance = currentAdjustType === "colorBalance";
		const isBlackWhite = currentAdjustType === "blackWhite";
		const isColorLookup3D = currentAdjustType === "colorLookup3D";
		const isGradientMap = currentAdjustType === "gradientMap";
		const firstControlRow = adjustValueInput?.closest(".adjust-control-row");
		if (firstControlRow) {
			firstControlRow.classList.toggle(
				"hidden",
				isCurves ||
					isExposure ||
					isHue ||
					isColorBalance ||
					isBlackWhite ||
					isColorLookup3D ||
					isGradientMap,
			);
		}
		if (adjustControlRow2) {
			adjustControlRow2.classList.toggle(
				"hidden",
				!cfg.second ||
					isCurves ||
					isExposure ||
					isHue ||
					isColorBalance ||
					isBlackWhite ||
					isColorLookup3D ||
					isGradientMap,
			);
		}
		if (adjustCurvesWrap) {
			adjustCurvesWrap.classList.toggle("hidden", !isCurves);
		}
		if (adjustExposureWrap) {
			adjustExposureWrap.classList.toggle("hidden", !isExposure);
		}
		if (adjustHueWrap) {
			adjustHueWrap.classList.toggle("hidden", !isHue);
		}
		if (adjustColorBalanceWrap) {
			adjustColorBalanceWrap.classList.toggle("hidden", !isColorBalance);
		}
		if (adjustBlackWhiteWrap) {
			adjustBlackWhiteWrap.classList.toggle("hidden", !isBlackWhite);
		}
		if (adjustLut3DWrap) {
			adjustLut3DWrap.classList.toggle("hidden", !isColorLookup3D);
		}
		if (adjustGradientMapWrap) {
			adjustGradientMapWrap.classList.toggle("hidden", !isGradientMap);
		}

		if (isExposure) {
			if (adjustExposureInput && adjustExposureInput.value === "") {
				adjustExposureInput.value = "0";
			}
			if (adjustOffsetInput && adjustOffsetInput.value === "") {
				adjustOffsetInput.value = "0";
			}
			if (adjustGammaInput && adjustGammaInput.value === "") {
				adjustGammaInput.value = "100";
			}
		}
		if (isHue) {
			setHueControlValues(huePresets.default);
			if (adjustHuePresetSelect) {
				adjustHuePresetSelect.value = "default";
			}
		}
		if (isColorBalance) {
			setColorBalanceControlValues(colorBalanceDefaults);
		}
		if (isBlackWhite) {
			setBlackWhiteControlValues({
				...blackWhitePresets.default,
				preset: "default",
			});
			if (adjustBlackWhiteTintColorInput && adjustBlackWhiteTintEnabledInput) {
				adjustBlackWhiteTintColorInput.disabled =
					!adjustBlackWhiteTintEnabledInput.checked;
			}
		}
		if (isColorLookup3D && adjustLut3DSelect) {
			adjustLut3DSelect.value = lastLut3DKey || "none";
		}
		if (isGradientMap) {
			setGradientMapControlValues({
				startColor: "#111111",
				endColor: "#f4f4f4",
				startOpacity: 100,
				endOpacity: 100,
				extraStops: [],
				dither: false,
				reverse: false,
			});
		}
		if (cfg.second) {
			if (adjustValueLabel2) adjustValueLabel2.textContent = cfg.second.label;
			if (adjustValueInput2) {
				adjustValueInput2.min = cfg.second.min;
				adjustValueInput2.max = cfg.second.max;
				adjustValueInput2.value = cfg.second.value;
			}
			if (adjustValueText2) {
				adjustValueText2.textContent = `${cfg.second.value}${cfg.second.unit}`;
			}
		}
		applyAdjustmentParamsToControls(presetParams);
		if (isCurves) {
			setCurrentCurveChannel(currentCurveChannel);
			drawCurvesEditor();
		}
		if (!skipBeginSession && !beginAdjustSession()) return;
		renderAdjustPreview();
	}

	function showAdjustPanel() {
		if (!adjustPanel) return;
		closePanelsForCompact("adjust");
		editingAdjustmentLayerId = null;
		adjustPanel.classList.remove("hidden");
		setAdjustType(currentAdjustType);
	}

	function showAdjustPanelForLayerAdjustment(layer) {
		if (!layer?.adjustmentData) return;
		const ctx = getActiveCtx();
		if (!ctx) return;
		const src = layer.adjustmentData.sourceImageData;
		if (!src) return;

		closePanelsForCompact("adjust");
		editingAdjustmentLayerId = layer.id;
		adjustOriginalLayerImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		adjustSourceImageData = cloneImageData(src);
		adjustPanel.classList.remove("hidden");
		setAdjustType(layer.adjustmentData.type, {
			skipBeginSession: true,
			presetParams: layer.adjustmentData.params || null,
		});
	}

	function hideAdjustPanel() {
		if (!adjustPanel) return;
		adjustPanel.classList.add("hidden");
		adjustSourceImageData = null;
		adjustOriginalLayerImageData = null;
		editingAdjustmentLayerId = null;
	}

	function cancelAdjustments() {
		const restore = adjustOriginalLayerImageData || adjustSourceImageData;
		if (restore) {
			const ctx = getActiveCtx();
			if (ctx) {
				ctx.putImageData(restore, 0, 0);
			}
		}
		adjustSourceImageData = null;
		adjustOriginalLayerImageData = null;
		editingAdjustmentLayerId = null;
	}

	function applyAdjustments() {
		if (!adjustSourceImageData) return;
		const ctx = getActiveCtx();
		if (!ctx) return;

		const previewBase = adjustOriginalLayerImageData || adjustSourceImageData;
		const previewSnapshot = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		const params = collectCurrentAdjustmentParams();
		const after = (currentAdjustType === "blackWhite" || currentAdjustType === "grayscale")
			? previewSnapshot
			: (
					renderAdjustmentFromParams(adjustSourceImageData, currentAdjustType, params) ||
					previewSnapshot
				);
		// Podglad byl rysowany na aktywnej warstwie, wiec najpierw przywroc stan sprzed panelu.
		ctx.putImageData(previewBase, 0, 0);

		if (editingAdjustmentLayerId && typeof window.getLayerById === "function") {
			const editingLayer = window.getLayerById(editingAdjustmentLayerId);
			if (editingLayer?.ctx) {
				saveState();
				editingLayer.ctx.putImageData(after, 0, 0);
				editingLayer.adjustmentData = {
					type: currentAdjustType,
					params,
					sourceImageData: cloneImageData(adjustSourceImageData),
				};
				adjustSourceImageData = cloneImageData(after);
				adjustOriginalLayerImageData = cloneImageData(after);
				updateLayerList();
				return;
			}
		}

		const adjustLayerNames = {
			brightnessContrast: "Jasnosc + Kontrast",
			saturation: "Jaskrawosc i nasycenie",
			hue: "Barwa",
			exposure: "Ekspozycja",
			threshold: "Prog",
			invert: "Negatyw",
			colorLookup3D: "Szukaj kolorów",
			gradientMap: "Mapa gradientu",
			reverseTone: "Odwróć",
			blackWhite: "Czarno-białe",
			grayscale: "Czarno-białe",
			colorBalance: "Balans kolorów",
			curves: "Krzywe",
		};
		const baseName = adjustLayerNames[currentAdjustType] || "Korekta";
		const sameTypeLayers = layers.filter(l => {
			const name = (l?.name || "").trim();
			return name === baseName || name.startsWith(`${baseName} `);
		}).length;
		const layerName = sameTypeLayers > 0 ? `${baseName} ${sameTypeLayers + 1}` : baseName;
		const newLayer = typeof createLayer === "function"
			? createLayer(layerName, "image")
			: null;

		if (!newLayer?.ctx) {
			// Fallback, gdyby tworzenie warstwy nie bylo dostepne.
			saveState();
			ctx.putImageData(after, 0, 0);
			adjustSourceImageData = cloneImageData(after);
			adjustOriginalLayerImageData = cloneImageData(after);
			return;
		}

		saveState();
		newLayer.ctx.clearRect(0, 0, newLayer.ctx.canvas.width, newLayer.ctx.canvas.height);
		newLayer.ctx.putImageData(after, 0, 0);
		newLayer.adjustmentData = {
			type: currentAdjustType,
			params,
			sourceImageData: cloneImageData(adjustSourceImageData),
		};
		updateLayerList();
		adjustSourceImageData = cloneImageData(after);
		adjustOriginalLayerImageData = cloneImageData(after);
	}

	// ===== OPACTIY WARSTWY TEKSTU =====

	function restoreEditingLayerOpacity() {
		if (
			editingTextLayerIndex !== null &&
			typeof editingTextLayerIndex === "number" &&
			layers[editingTextLayerIndex] &&
			layers[editingTextLayerIndex].canvas
		) {
			const layer = layers[editingTextLayerIndex];
			const opacityPercent = Math.max(0, Math.min(100, Number(layer.opacity ?? 100)));
			const fillPercent = Math.max(0, Math.min(100, Number(layer.fillOpacity ?? 100)));
			layer.canvas.style.opacity = `${(opacityPercent * fillPercent) / 10000}`;
		}
	}

	if (textPanelCloseBtn) {
		textPanelCloseBtn.addEventListener("click", () => {
			closeTypographyPanel();
		});
	}

if (shapePanelCloseBtn) {
	shapePanelCloseBtn.addEventListener("click", () => {
		hideShapePanel();
	});
}

	if (brushPanelCloseBtn) {
		brushPanelCloseBtn.addEventListener("click", () => {
			hideBrushPanel();
		});
	}

	if (layersPanelCloseBtn) {
		layersPanelCloseBtn.addEventListener("click", () => {
			hideLayersPanel();
		});
	}

	// ===== OTWIERANIE TYPOGRAFII Z MENU "OKNO" =====

	function openTypographyForCurrentTextLayer() {
		closePanelsForCompact("text");
		restoreEditingLayerOpacity();

		let idx = currentTextEditLayerIndex;

		if (
			typeof idx !== "number" ||
			idx < 0 ||
			idx >= layers.length ||
			!layers[idx] ||
			layers[idx].kind !== "text" ||
			!layers[idx].textData ||
			!layers[idx].textData.rect
		) {
			idx = null;
			for (let i = layers.length - 1; i >= 0; i--) {
				const l = layers[i];
				if (l.kind === "text" && l.visible && l.textData && l.textData.rect) {
					idx = i;
					break;
				}
			}
		}

		if (idx === null) {
			alert(
				"Brak tekstu do edycji.\nNajpierw utwórz tekst na obszarze roboczym.",
			);
			return;
		}

		const layer = layers[idx];
		const td = layer.textData;
		if (!td || !td.rect) {
			alert("Ta warstwa tekstowa nie ma zdefiniowanego obszaru.");
			return;
		}
		if (layer.locked) {
			alert(
				"Ta warstwa tekstowa jest zablokowana. Odblokuj ja, aby ja edytowac.",
			);
			return;
		}

		activeLayerIndex = idx;
		updateLayerList();

		isTextMode = true;
		isSelectMode = false;
		isCropMode = false;
		isMoveMode = false;
		isPipetteMode = false;

		textBoxRect = { ...td.rect };
		drawSelectionRect(textBoxRect);

		if (layer.canvas) layer.canvas.style.opacity = 0;

		createTextOverlayForRect(textBoxRect);
		if (textOverlay) textOverlay.value = td.text || "";

		if (td.options) {
			loadTypographyOptions(td.options);
		} else {
			loadTypographyOptions({ align: currentAlign });
		}

		textPanel.classList.remove("hidden");

		editingTextLayerIndex = idx;
		window.setCurrentTextEditLayerIndex(idx);
	}

	// ===== ENTER / ESC DLA TEKSTU =====
	document.addEventListener("keydown", e => {
		if (!textOverlay) return;

		// Enter bez Shift = zapisz tekst, Shift+Enter = nowy wiersz
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			commitTextFromOverlay();
			return;
		}

		if (e.key === "Escape") {
			// Esc = anuluj
			e.preventDefault();
			closeTypographyPanel();
		}
	});

	// ===== PRZECIĄGANIE PANELU WARSTW I PANELU TEKSTU =====

	let isDraggingLayersPanel = false;
	let panelOffsetX = 0;
	let panelOffsetY = 0;

	let isDraggingTextPanel = false;
	let textPanelOffsetX = 0;
	let textPanelOffsetY = 0;
	let isDraggingBrushPanel = false;
	let brushPanelOffsetX = 0;
	let brushPanelOffsetY = 0;
	let isDraggingShapePanel = false;
	let shapePanelOffsetX = 0;
	let shapePanelOffsetY = 0;
	let isDraggingAdjustPanel = false;
	let adjustPanelOffsetX = 0;
	let adjustPanelOffsetY = 0;

	if (layersHeader && layersPanel) {
		layersHeader.addEventListener("mousedown", e => {
			if (window.innerWidth <= 700) return;
			if (e.target.closest("button")) return;

			isDraggingLayersPanel = true;

			const rect = layersPanel.getBoundingClientRect();
			panelOffsetX = e.clientX - rect.left;
			panelOffsetY = e.clientY - rect.top;

			layersPanel.style.left = rect.left + "px";
			layersPanel.style.top = rect.top + "px";
			layersPanel.style.right = "auto";
			document.body.style.userSelect = "none";
		});
	}

	if (textPanel && textPanelHeader) {
		textPanelHeader.style.cursor = "move";
		textPanelHeader.addEventListener("mousedown", e => {
			if (window.innerWidth <= 700) return;
			if (e.target.closest(".text-panel-close")) return;
			isDraggingTextPanel = true;

			const rect = textPanel.getBoundingClientRect();
			textPanelOffsetX = e.clientX - rect.left;
			textPanelOffsetY = e.clientY - rect.top;

			textPanel.style.left = rect.left + "px";
			textPanel.style.top = rect.top + "px";
			textPanel.style.right = "auto";
			document.body.style.userSelect = "none";
		});
	}

	if (brushPanel && brushPanelHeader) {
		brushPanelHeader.style.cursor = "move";
		brushPanelHeader.addEventListener("mousedown", e => {
			if (window.innerWidth <= 700) return;
			if (e.target.closest("button")) return;
			isDraggingBrushPanel = true;

			const rect = brushPanel.getBoundingClientRect();
			brushPanelOffsetX = e.clientX - rect.left;
			brushPanelOffsetY = e.clientY - rect.top;

			brushPanel.style.left = rect.left + "px";
			brushPanel.style.top = rect.top + "px";
			brushPanel.style.right = "auto";
			document.body.style.userSelect = "none";
		});
	}

	if (shapePanel && shapePanelHeader) {
		shapePanelHeader.style.cursor = "move";
		shapePanelHeader.addEventListener("mousedown", e => {
			if (window.innerWidth <= 700) return;
			if (e.target.closest("button")) return;
			isDraggingShapePanel = true;

			const rect = shapePanel.getBoundingClientRect();
			shapePanelOffsetX = e.clientX - rect.left;
			shapePanelOffsetY = e.clientY - rect.top;

			shapePanel.style.left = rect.left + "px";
			shapePanel.style.top = rect.top + "px";
			shapePanel.style.right = "auto";
			document.body.style.userSelect = "none";
		});
	}

	if (adjustPanel && adjustPanelHeader) {
		adjustPanelHeader.style.cursor = "move";
		adjustPanelHeader.addEventListener("mousedown", e => {
			if (window.innerWidth <= 700) return;
			if (e.target.closest("button")) return;
			isDraggingAdjustPanel = true;

			const rect = adjustPanel.getBoundingClientRect();
			adjustPanelOffsetX = e.clientX - rect.left;
			adjustPanelOffsetY = e.clientY - rect.top;

			adjustPanel.style.left = rect.left + "px";
			adjustPanel.style.top = rect.top + "px";
			adjustPanel.style.right = "auto";
			document.body.style.userSelect = "none";
		});
	}

	document.addEventListener("mousemove", e => {
		const menuBar = document.querySelector(".menu-bar");
		const menuHeight = menuBar ? menuBar.offsetHeight : 44;
		const margin = 10;
		const draggingAnyPanel =
			isDraggingLayersPanel ||
			isDraggingTextPanel ||
			isDraggingBrushPanel ||
			isDraggingShapePanel ||
			isDraggingAdjustPanel;

		// Zabezpieczenie przed "odrzutem":
		// jeśli przycisk myszy nie jest wciśnięty, anuluj przeciąganie
		// zanim policzymy nową pozycję paneli.
		if (draggingAnyPanel && (e.buttons & 1) !== 1) {
			isDraggingLayersPanel = false;
			isDraggingTextPanel = false;
			isDraggingBrushPanel = false;
			isDraggingShapePanel = false;
			isDraggingAdjustPanel = false;
			document.body.style.userSelect = "";
			return;
		}

		if (isDraggingLayersPanel && layersPanel) {
			const panelRect = layersPanel.getBoundingClientRect();
			const panelWidth = panelRect.width;
			const panelHeight = panelRect.height;

			let x = e.clientX - panelOffsetX;
			let y = e.clientY - panelOffsetY;

			const minX = margin;
			const maxX = window.innerWidth - panelWidth - margin;
			if (x < minX) x = minX;
			if (x > maxX) x = maxX;

			const minY = menuHeight + margin;
			const maxY = window.innerHeight - panelHeight - margin;
			if (y < minY) y = minY;
			if (y > maxY) y = maxY;

			layersPanel.style.left = x + "px";
			layersPanel.style.top = y + "px";
		}

		if (isDraggingTextPanel && textPanel) {
			const panelRect = textPanel.getBoundingClientRect();
			const panelWidth = panelRect.width;
			const panelHeight = panelRect.height;

			let x = e.clientX - textPanelOffsetX;
			let y = e.clientY - textPanelOffsetY;

			const minX = margin;
			const maxX = window.innerWidth - panelWidth - margin;
			if (x < minX) x = minX;
			if (x > maxX) x = maxX;

			const minY = menuHeight + margin;
			const maxY = window.innerHeight - panelHeight - margin;
			if (y < minY) y = minY;
			if (y > maxY) y = maxY;

			textPanel.style.left = x + "px";
			textPanel.style.top = y + "px";
		}

		if (isDraggingBrushPanel && brushPanel) {
			const panelRect = brushPanel.getBoundingClientRect();
			const panelWidth = panelRect.width;
			const panelHeight = panelRect.height;

			let x = e.clientX - brushPanelOffsetX;
			let y = e.clientY - brushPanelOffsetY;

			const minX = margin;
			const maxX = window.innerWidth - panelWidth - margin;
			if (x < minX) x = minX;
			if (x > maxX) x = maxX;

			const minY = menuHeight + margin;
			const maxY = window.innerHeight - panelHeight - margin;
			if (y < minY) y = minY;
			if (y > maxY) y = maxY;

			brushPanel.style.left = x + "px";
			brushPanel.style.top = y + "px";
		}

		if (isDraggingShapePanel && shapePanel) {
			const panelRect = shapePanel.getBoundingClientRect();
			const panelWidth = panelRect.width;
			const panelHeight = panelRect.height;

			let x = e.clientX - shapePanelOffsetX;
			let y = e.clientY - shapePanelOffsetY;

			const minX = margin;
			const maxX = window.innerWidth - panelWidth - margin;
			if (x < minX) x = minX;
			if (x > maxX) x = maxX;

			const minY = menuHeight + margin;
			const maxY = window.innerHeight - panelHeight - margin;
			if (y < minY) y = minY;
			if (y > maxY) y = maxY;

			shapePanel.style.left = x + "px";
			shapePanel.style.top = y + "px";
		}

		if (isDraggingAdjustPanel && adjustPanel) {
			const panelRect = adjustPanel.getBoundingClientRect();
			const panelWidth = panelRect.width;
			const panelHeight = panelRect.height;

			let x = e.clientX - adjustPanelOffsetX;
			let y = e.clientY - adjustPanelOffsetY;

			const minX = margin;
			const maxX = window.innerWidth - panelWidth - margin;
			if (x < minX) x = minX;
			if (x > maxX) x = maxX;

			const minY = menuHeight + margin;
			const maxY = window.innerHeight - panelHeight - margin;
			if (y < minY) y = minY;
			if (y > maxY) y = maxY;

			adjustPanel.style.left = x + "px";
			adjustPanel.style.top = y + "px";
		}
	});

	document.addEventListener("mouseup", () => {
		if (
			isDraggingLayersPanel ||
			isDraggingTextPanel ||
			isDraggingBrushPanel ||
			isDraggingShapePanel ||
			isDraggingAdjustPanel
		) {
			document.body.style.userSelect = "";
		}
		isDraggingLayersPanel = false;
		isDraggingTextPanel = false;
		isDraggingBrushPanel = false;
		isDraggingShapePanel = false;
		isDraggingAdjustPanel = false;
	});

	// ===== DRAG & DROP WARSTW =====

	function getDragAfterElement(container, y) {
		const draggableElements = [
			...container.querySelectorAll("li.layer-item:not(.dragging)"),
		];

		return draggableElements.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = y - box.top - box.height / 2;
				if (offset < 0 && offset > closest.offset) {
					return { offset, element: child };
				} else {
					return closest;
				}
			},
			{ offset: Number.NEGATIVE_INFINITY, element: null },
		).element;
	}

	function applyLayerOrderFromDOM() {
		if (!layerListEl) return;
		const items = [...layerListEl.querySelectorAll("li.layer-item")];
		if (!items.length) return;

		const oldLayers = layers.slice();
		const activeLayerObj = layers[activeLayerIndex];

		const newLayers = [];

		for (let k = items.length - 1; k >= 0; k--) {
			const id = items[k].dataset.layerId;
			const layer = oldLayers.find(l => String(l.id) === id);
			if (layer) newLayers.push(layer);
		}

		if (!newLayers.length) return;

		layers = newLayers;
		activeLayerIndex = layers.indexOf(activeLayerObj);
		if (activeLayerIndex < 0) activeLayerIndex = layers.length - 1;

		updateCanvasZOrder();
		updateLayerList();
	}

	let draggedLayerId = null;

	if (layerListEl) {
		layerListEl.addEventListener("click", e => {
			const li = e.target.closest("li.layer-item");
			if (!li) return;
			if (e.shiftKey || e.ctrlKey || e.metaKey) return;
			if (
				e.target.closest(".layer-lock-btn") ||
				e.target.closest(".layer-eye-btn") ||
				e.target.closest(".layer-trash-btn") ||
				e.target.closest(".layer-opacity-wrap") ||
				e.target.closest(".layer-opacity-range")
			) {
				return;
			}
			if (selectedLayerIds.size > 1) return;
			const layerId = parseInt(li.dataset.layerId || "", 10);
			if (!Number.isFinite(layerId) || typeof window.getLayerById !== "function") return;
			const layer = window.getLayerById(layerId);
			if (!layer?.adjustmentData) return;
			if (layer.locked) return;
			showAdjustPanelForLayerAdjustment(layer);
		});

		layerListEl.addEventListener("contextmenu", e => {
			e.preventDefault();
			const li = e.target.closest("li.layer-item");
			if (li) {
				const layerId = Number(li.dataset.layerId || "");
				if (Number.isFinite(layerId) && !selectedLayerIds.has(layerId)) {
					selectSingleLayer(layerId);
					const idx = layers.findIndex(l => l.id === layerId);
					if (idx >= 0) activeLayerIndex = idx;
					updateLayerList();
				}
			}
			showLayersContextMenu(e.clientX, e.clientY);
		});

		layerListEl.addEventListener("dragstart", e => {
			const li = e.target.closest("li.layer-item");
			if (!li) return;

			draggedLayerId = li.dataset.layerId || null;
			li.classList.add("dragging");

			if (e.dataTransfer) {
				e.dataTransfer.effectAllowed = "move";
				e.dataTransfer.setData("text/plain", draggedLayerId || "");
			}
		});

		layerListEl.addEventListener("dragend", e => {
			const li = e.target.closest("li.layer-item");
			if (li) li.classList.remove("dragging");
			draggedLayerId = null;
			applyLayerOrderFromDOM();
		});

		layerListEl.addEventListener("dragover", e => {
			if (!draggedLayerId) return;
			e.preventDefault();

			if (e.dataTransfer) {
				e.dataTransfer.dropEffect = "move";
			}

			const afterElement = getDragAfterElement(layerListEl, e.clientY);
			const dragging = layerListEl.querySelector("li.layer-item.dragging");
			if (!dragging) return;

			if (afterElement == null) {
				layerListEl.appendChild(dragging);
			} else {
				layerListEl.insertBefore(dragging, afterElement);
			}
		});

		layerListEl.addEventListener("drop", e => {
			e.preventDefault();
			applyLayerOrderFromDOM();
		});
	}

	// ===== POZYCJA UCHWYTU PASKA =====

	function positionToolbarToggle() {
		if (!toolbar || !toolbarToggle) return;
		if (window.innerWidth <= 700) return;
		if (toolbar.classList.contains("hidden")) return;

		const toolbarRect = toolbar.getBoundingClientRect();
		if (toolbarRect.width < 8 || toolbarRect.height < 8) return;

		const toggleHeight = toolbarToggle.offsetHeight || 72;
		const firstToolBtn = toolbar.querySelector(".tool-button");
		const offsetDown = 50; // niżej, aby uchwyt nie nachodził na górę paska

		let top;
		if (firstToolBtn) {
			const btnRect = firstToolBtn.getBoundingClientRect();
			top = btnRect.top + btnRect.height / 2 - toggleHeight / 2 + offsetDown;
		} else {
			top = toolbarRect.top + 20 + offsetDown;
		}
		toolbarToggle.style.top = top + "px";

		// Uchwyt ma być zawsze dosunięty do prawej krawędzi panelu (bez pustej przerwy).
		const desiredLeft = Math.round(toolbarRect.right);
		const maxLeft = Math.max(
			0,
			window.innerWidth - (toolbarToggle.offsetWidth || 32) - 4,
		);
		toolbarToggle.style.left = Math.max(0, Math.min(desiredLeft, maxLeft)) + "px";
	}

	if (toolbarToggle) {
		toolbarToggle.addEventListener("click", () => {
			const collapsed = toolbar.classList.toggle("collapsed");
			toolbarToggle.classList.toggle("collapsed", collapsed);
			toolbarToggle.textContent = collapsed ? "›" : "‹";

			if (collapsed) {
				closeAllToolDropdowns();
				hideTextPanel();
			}

			positionToolbarToggle();
			setTimeout(() => positionToolbarToggle(), 280);
		});
	}

	if (toolbar) {
		toolbar.addEventListener("transitionend", e => {
			if (e.propertyName === "transform") positionToolbarToggle();
		});
	}

	window.addEventListener("resize", () => {
		positionToolbarToggle();
		updateRulerLayout();
		refreshManualTransformOverlayIfNeeded();
	});

	if (toolbar && toolbarToggle && typeof ResizeObserver !== "undefined") {
		const toolbarResizeObserver = new ResizeObserver(() => {
			positionToolbarToggle();
		});
		toolbarResizeObserver.observe(toolbar);
	}

	if (toolbar && toolbarToggle && typeof MutationObserver !== "undefined") {
		const toolbarMutationObserver = new MutationObserver(() => {
			positionToolbarToggle();
		});
		toolbarMutationObserver.observe(toolbar, {
			attributes: true,
			attributeFilter: ["class", "style"],
		});
	}

	function setupTopMenuInteractions() {
		if (!menu) return;
		const topMainMenu = menu.querySelector("#topMainMenu");
		const getEventTargetElement = event => {
			if (event.target instanceof Element) return event.target;
			return event.target?.parentElement || null;
		};
		const getDirectSubmenu = item => {
			if (!item) return null;
			for (const child of item.children) {
				if (child && child.tagName === "UL") return child;
			}
			return null;
		};
		const closeSiblingMenuItems = item => {
			const parentList = item?.parentElement;
			if (!parentList) return;
			Array.from(parentList.children).forEach(sibling => {
				if (!(sibling instanceof HTMLElement) || sibling === item) return;
				sibling.classList.remove("menu-open");
				sibling
					.querySelectorAll(".menu-open")
					.forEach(el => el.classList.remove("menu-open"));
			});
		};

		const closeAllMenuItems = () => {
			menu.querySelectorAll(".menu-open").forEach(el => el.classList.remove("menu-open"));
		};

		const syncClickMode = () => {
			const hasOpenMenu = Boolean(menu.querySelector(".menu-open"));
			menu.classList.toggle("menu-click-active", hasOpenMenu);
		};
		const setClickMode = enabled => {
			menu.classList.toggle("menu-click-active", Boolean(enabled));
		};

		menu.addEventListener("click", e => {
			const targetEl = getEventTargetElement(e);
			if (!targetEl) return;
			const anchor = targetEl.closest("a");
			if (!anchor || !menu.contains(anchor)) return;
			const parent = anchor.closest("li");
			if (!parent) return;
			const submenu = getDirectSubmenu(parent);
			const isTopLevel = Boolean(topMainMenu && parent.parentElement === topMainMenu);

			if (submenu) {
				e.preventDefault();
				e.stopPropagation();
				setClickMode(true);
				if (isTopLevel) {
					const wasOpen = parent.classList.contains("menu-open");
					closeAllMenuItems();
					parent.classList.toggle("menu-open", !wasOpen);
					if (wasOpen && typeof anchor.blur === "function") anchor.blur();
				} else {
					const wasOpen = parent.classList.contains("menu-open");
					closeSiblingMenuItems(parent);
					parent.classList.toggle("menu-open", !wasOpen);
					if (wasOpen && typeof anchor.blur === "function") anchor.blur();
				}
				setClickMode(true);
				return;
			}

			if (anchor.getAttribute("href") === "#") e.preventDefault();
			closeAllMenuItems();
			setClickMode(false);
		});

		document.addEventListener("click", e => {
			if (!e.target.closest(".menu-bar")) {
				closeAllMenuItems();
				setClickMode(false);
			}
		});

		document.addEventListener("keydown", e => {
			if (e.key !== "Escape") return;
			closeAllMenuItems();
			setClickMode(false);
		});
	}

	setupTopMenuInteractions();

	function setupMobileMenuToggle() {
		if (!menu || !mobileMenuToggle) return;
		const isMobileWidth = () => window.matchMedia("(max-width: 700px)").matches;
		const getEventTargetElement = event => {
			if (event.target instanceof Element) return event.target;
			return event.target?.parentElement || null;
		};
		const getDirectSubmenu = item => {
			if (!item) return null;
			for (const child of item.children) {
				if (child && child.tagName === "UL") return child;
			}
			return null;
		};
		const closeAllMenuItems = () => {
			menu.querySelectorAll(".menu-open").forEach(el => el.classList.remove("menu-open"));
		};
		const closeMobileMenu = () => {
			menu.classList.remove("menu-expanded");
			menu.classList.remove("menu-click-active");
			mobileMenuToggle.setAttribute("aria-expanded", "false");
			closeAllMenuItems();
		};
		const syncMode = () => {
			if (!isMobileWidth()) {
				closeMobileMenu();
			}
		};

		mobileMenuToggle.addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();
			const isExpanded = menu.classList.toggle("menu-expanded");
			mobileMenuToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
			if (!isExpanded) {
				menu.classList.remove("menu-click-active");
				closeAllMenuItems();
			}
		});

		menu.addEventListener("click", e => {
			if (!isMobileWidth()) return;
			const targetEl = getEventTargetElement(e);
			if (!targetEl) return;
			const anchor = targetEl.closest("a");
			if (!anchor || !menu.contains(anchor)) return;
			const parent = anchor.closest("li");
			const hasSubmenu = Boolean(getDirectSubmenu(parent));
			if (hasSubmenu) return;
			window.setTimeout(closeMobileMenu, 0);
		});

		document.addEventListener("click", e => {
			if (!isMobileWidth()) return;
			if (!e.target.closest(".menu-bar")) closeMobileMenu();
		});

		document.addEventListener("keydown", e => {
			if (!isMobileWidth()) return;
			if (e.key === "Escape") closeMobileMenu();
		});

		window.addEventListener("resize", syncMode);
		syncMode();
	}

	setupMobileMenuToggle();

	try {
		const savedCompactMode = window.localStorage.getItem(COMPACT_MODE_STORAGE_KEY);
		setCompactMode(savedCompactMode === "1");
	} catch (err) {
		setCompactMode(false);
	}

	if (menuCompactMode) {
		menuCompactMode.addEventListener("click", e => {
			e.preventDefault();
			setCompactMode(!compactModeEnabled);
		});
	}

	// ===== MENU PLIK =====

	function getActiveLayerForTransform() {
		if (!Array.isArray(layers) || !layers.length) {
			alert("Brak warstw do przekształcenia.");
			return null;
		}
		const layer = layers[activeLayerIndex];
		if (!layer || !layer.ctx || !layer.canvas) {
			alert("Nie udało się odczytać aktywnej warstwy.");
			return null;
		}
		if (layer.locked) {
			alert("Aktywna warstwa jest zablokowana.");
			return null;
		}
		return layer;
	}

	function cloneLayerCanvas(layer) {
		const copy = document.createElement("canvas");
		copy.width = layer.canvas.width;
		copy.height = layer.canvas.height;
		const copyCtx = copy.getContext("2d");
		copyCtx.drawImage(layer.canvas, 0, 0);
		return copy;
	}

	function applyTransformToActiveLayer(drawFn) {
		const layer = getActiveLayerForTransform();
		if (!layer) return;
		const sourceCanvas = cloneLayerCanvas(layer);
		const ctx = layer.ctx;
		const w = layer.canvas.width;
		const h = layer.canvas.height;

		saveState();
		resetSelection();
		hideTextPanel();
		hideShapePanel();

		ctx.clearRect(0, 0, w, h);
		ctx.save();
		drawFn(ctx, sourceCanvas, w, h);
		ctx.restore();

		if (layer.kind !== "image") {
			layer.kind = "image";
			layer.textData = null;
			layer.shapeData = null;
			layer.adjustmentData = null;
		}
		updateLayerList();
	}

	function makeTransformWindowDraggable(windowEl) {
		if (!windowEl) return;
		const handle = windowEl.querySelector(".transform-window-title");
		if (!handle || handle.dataset.dragBound === "1") return;
		handle.dataset.dragBound = "1";

		let dragging = false;
		let offsetX = 0;
		let offsetY = 0;

		handle.addEventListener("mousedown", e => {
			if (e.button !== 0) return;
			const rect = windowEl.getBoundingClientRect();
			windowEl.style.left = `${rect.left}px`;
			windowEl.style.top = `${rect.top}px`;
			windowEl.style.right = "auto";
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;
			dragging = true;
			document.body.style.userSelect = "none";
			e.preventDefault();
		});

		document.addEventListener("mousemove", e => {
			if (!dragging) return;
			const margin = 8;
			const maxX = Math.max(
				margin,
				window.innerWidth - windowEl.offsetWidth - margin,
			);
			const maxY = Math.max(
				margin,
				window.innerHeight - windowEl.offsetHeight - margin,
			);
			const nextX = Math.max(margin, Math.min(maxX, e.clientX - offsetX));
			const nextY = Math.max(margin, Math.min(maxY, e.clientY - offsetY));
			windowEl.style.left = `${nextX}px`;
			windowEl.style.top = `${nextY}px`;
		});

		document.addEventListener("mouseup", () => {
			if (!dragging) return;
			dragging = false;
			document.body.style.userSelect = "";
		});
	}

	let manualTransformState = {
		mode: null,
		active: false,
		dragging: false,
		savedForDrag: false,
		changedManually: false,
		layer: null,
		sourceCanvas: null,
		baseBounds: null,
		params: { scaleX: 1, scaleY: 1, rotate: 0, skewX: 0, skewY: 0 },
		drag: null,
	};
	let manualTransformOverlay = null;
	let manualTransformFrame = null;
	const manualTransformHandles = {};

	function ensureManualTransformOverlay() {
		if (!wrapper || manualTransformOverlay) return;
		manualTransformOverlay = document.createElement("div");
		manualTransformOverlay.className = "manual-transform-overlay hidden";
		manualTransformFrame = document.createElement("div");
		manualTransformFrame.className = "manual-transform-frame";
		manualTransformOverlay.appendChild(manualTransformFrame);
		wrapper.appendChild(manualTransformOverlay);
	}

	function setManualHandle(name, className) {
		const h = document.createElement("div");
		h.className = `manual-transform-handle ${className || ""}`.trim();
		h.dataset.transformHandle = name;
		h.addEventListener("mousedown", e => {
			if (!manualTransformState.active || e.button !== 0) return;
			e.preventDefault();
			e.stopPropagation();
			const layer = manualTransformState.layer;
			if (!layer || layer.locked) return;
			manualTransformState.dragging = true;
			manualTransformState.savedForDrag = false;
			const rect = wrapper.getBoundingClientRect();
			const cx = manualTransformState.baseBounds.x + manualTransformState.baseBounds.w / 2;
			const cy = manualTransformState.baseBounds.y + manualTransformState.baseBounds.h / 2;
			const sx = canvas.width / rect.width;
			const sy = canvas.height / rect.height;
			const startX = (e.clientX - rect.left) * sx;
			const startY = (e.clientY - rect.top) * sy;
			const pointerAngle = Math.atan2(startY - cy, startX - cx);
			manualTransformState.drag = {
				handle: name,
				startX,
				startY,
				startPointerAngle: pointerAngle,
				startParams: { ...manualTransformState.params },
			};
		});
		manualTransformOverlay.appendChild(h);
		manualTransformHandles[name] = h;
	}

	function initManualTransformHandles() {
		ensureManualTransformOverlay();
		if (manualTransformHandles.nw) return;
		setManualHandle("nw");
		setManualHandle("ne");
		setManualHandle("sw");
		setManualHandle("se");
		setManualHandle("rotate", "rotate");
		setManualHandle("skewX", "skew");
		setManualHandle("skewY", "skew");
	}

	function getLayerContentBounds(layer) {
		if (!layer?.ctx?.canvas) return null;
		const w = layer.ctx.canvas.width;
		const h = layer.ctx.canvas.height;
		const data = layer.ctx.getImageData(0, 0, w, h).data;
		let minX = w;
		let minY = h;
		let maxX = -1;
		let maxY = -1;
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				if (data[(y * w + x) * 4 + 3] > 0) {
					if (x < minX) minX = x;
					if (y < minY) minY = y;
					if (x > maxX) maxX = x;
					if (y > maxY) maxY = y;
				}
			}
		}
		if (maxX < minX || maxY < minY) return { x: 0, y: 0, w, h };
		return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
	}

	function transformPointByParams(x, y, bounds, params) {
		const cx = bounds.x + bounds.w / 2;
		const cy = bounds.y + bounds.h / 2;
		const vx = x - cx;
		const vy = y - cy;
		const sx = vx * params.scaleX;
		const sy = vy * params.scaleY;
		const cosA = Math.cos(params.rotate);
		const sinA = Math.sin(params.rotate);
		const rx = sx * cosA - sy * sinA;
		const ry = sx * sinA + sy * cosA;
		const kx = rx + params.skewX * ry;
		const ky = params.skewY * rx + ry;
		return { x: cx + kx, y: cy + ky };
	}

	function getTransformedBounds(bounds, params) {
		const pts = [
			transformPointByParams(bounds.x, bounds.y, bounds, params),
			transformPointByParams(bounds.x + bounds.w, bounds.y, bounds, params),
			transformPointByParams(bounds.x, bounds.y + bounds.h, bounds, params),
			transformPointByParams(bounds.x + bounds.w, bounds.y + bounds.h, bounds, params),
		];
		const minX = Math.min(...pts.map(p => p.x));
		const minY = Math.min(...pts.map(p => p.y));
		const maxX = Math.max(...pts.map(p => p.x));
		const maxY = Math.max(...pts.map(p => p.y));
		return { minX, minY, maxX, maxY, pts };
	}

	function renderManualTransformOverlay() {
		if (!manualTransformState.active || !manualTransformOverlay || !wrapper || !canvas) return;
		const bounds = manualTransformState.baseBounds;
		const t = getTransformedBounds(bounds, manualTransformState.params);
		const scaleX = wrapper.clientWidth / canvas.width;
		const scaleY = wrapper.clientHeight / canvas.height;
		const left = t.minX * scaleX;
		const top = t.minY * scaleY;
		const width = Math.max(1, (t.maxX - t.minX) * scaleX);
		const height = Math.max(1, (t.maxY - t.minY) * scaleY);

		manualTransformFrame.style.left = `${left}px`;
		manualTransformFrame.style.top = `${top}px`;
		manualTransformFrame.style.width = `${width}px`;
		manualTransformFrame.style.height = `${height}px`;

		const cx = (bounds.x + bounds.w / 2) * scaleX;
		const cy = (bounds.y + bounds.h / 2) * scaleY;

		const place = (name, px, py, show) => {
			const h = manualTransformHandles[name];
			if (!h) return;
			h.style.display = show ? "block" : "none";
			if (!show) return;
			h.style.left = `${px}px`;
			h.style.top = `${py}px`;
		};

		const mode = manualTransformState.mode;
		const inset = 8;
		place("nw", left + inset, top + inset, mode === "scale");
		place("ne", left + width - inset, top + inset, mode === "scale");
		place("sw", left + inset, top + height - inset, mode === "scale");
		place("se", left + width - inset, top + height - inset, mode === "scale");
		// Uchwyty wewnątrz ramki, żeby były dostępne także przy pełnym ekranie.
		place("rotate", cx, top + 8, mode === "rotate");
		place("skewX", cx, top + 8, mode === "skew");
		place("skewY", left + width - 8, cy, mode === "skew");
	}

	function applyManualTransformPreview() {
		const layer = manualTransformState.layer;
		const src = manualTransformState.sourceCanvas;
		if (!layer?.ctx || !src) return;
		const ctx = layer.ctx;
		const b = manualTransformState.baseBounds;
		const p = manualTransformState.params;
		const cx = b.x + b.w / 2;
		const cy = b.y + b.h / 2;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.save();
		ctx.translate(cx, cy);
		ctx.transform(1, p.skewY, p.skewX, 1, 0, 0);
		ctx.rotate(p.rotate);
		ctx.scale(p.scaleX, p.scaleY);
		ctx.translate(-cx, -cy);
		ctx.drawImage(src, 0, 0);
		ctx.restore();
		renderManualTransformOverlay();
	}

	function deactivateManualTransform() {
		manualTransformState.active = false;
		manualTransformState.dragging = false;
		manualTransformState.mode = null;
		manualTransformState.changedManually = false;
		manualTransformState.layer = null;
		manualTransformState.sourceCanvas = null;
		manualTransformState.baseBounds = null;
		manualTransformState.drag = null;
		manualTransformState.params = { scaleX: 1, scaleY: 1, rotate: 0, skewX: 0, skewY: 0 };
		if (manualTransformOverlay) manualTransformOverlay.classList.add("hidden");
	}

	function activateManualTransform(mode) {
		const layer = getActiveLayerForTransform();
		if (!layer) return;
		initManualTransformHandles();
		disableZoomTool();
		disableRepairTool();
		resetSelection();
		hideTextPanel();
		isMoveMode = false;
		isPipetteMode = false;
		isSelectMode = false;
		isCropMode = false;
		isTextMode = false;
		selectedShape = null;
		wrapper.classList.remove("move-cursor");
		manualTransformState.active = true;
		manualTransformState.mode = mode;
		manualTransformState.layer = layer;
		manualTransformState.sourceCanvas = cloneLayerCanvas(layer);
		manualTransformState.baseBounds = getLayerContentBounds(layer);
		manualTransformState.changedManually = false;
		manualTransformState.params = { scaleX: 1, scaleY: 1, rotate: 0, skewX: 0, skewY: 0 };
		manualTransformState.drag = null;
		if (manualTransformOverlay) manualTransformOverlay.classList.remove("hidden");
		renderManualTransformOverlay();
	}

	function refreshManualTransformOverlayIfNeeded() {
		if (!manualTransformState.active) return;
		if (!manualTransformState.layer || manualTransformState.layer !== layers[activeLayerIndex]) {
			deactivateManualTransform();
			return;
		}
		renderManualTransformOverlay();
	}

	function closeTransformScaleModal() {
		transformScaleModal?.classList.add("hidden");
	}

	function openTransformScaleModal() {
		const layer = getActiveLayerForTransform();
		if (!layer) return;
		if (!transformScaleModal || !transformScaleXInput || !transformScaleYInput) {
			return;
		}
		transformScaleXInput.value = "100";
		transformScaleYInput.value = "100";
		if (transformScaleLock) transformScaleLock.checked = true;
		transformScaleModal.classList.remove("hidden");
		transformScaleXInput.focus();
		transformScaleXInput.select();
		activateManualTransform("scale");
	}

	function closeTransformRotateModal() {
		transformRotateModal?.classList.add("hidden");
	}

	function openTransformRotateModal() {
		const layer = getActiveLayerForTransform();
		if (!layer) return;
		if (!transformRotateModal || !transformRotateAngleInput) return;
		transformRotateAngleInput.value = "90";
		if (transformRotateAngleRange) transformRotateAngleRange.value = "90";
		transformRotateModal.classList.remove("hidden");
		transformRotateAngleInput.focus();
		transformRotateAngleInput.select();
		activateManualTransform("rotate");
	}

	function askNumber(message, fallback) {
		const raw = prompt(message, String(fallback));
		if (raw === null) return null;
		const value = Number(String(raw).replace(",", "."));
		if (!Number.isFinite(value)) return null;
		return value;
	}

	function transformScaleLayer() {
		if (
			manualTransformState.active &&
			manualTransformState.mode === "scale" &&
			manualTransformState.changedManually
		) {
			deactivateManualTransform();
			closeTransformScaleModal();
			return;
		}
		const sxPercent = Number(transformScaleXInput?.value || 0);
		const syPercent = Number(transformScaleYInput?.value || 0);
		if (!Number.isFinite(sxPercent) || !Number.isFinite(syPercent)) {
			alert("Podaj poprawne liczby dla skali.");
			return;
		}
		const sx = sxPercent / 100;
		const sy = syPercent / 100;
		if (sx <= 0 || sy <= 0) {
			alert("Skala musi być większa od 0%.");
			return;
		}
		applyTransformToActiveLayer((ctx, src, w, h) => {
			ctx.translate(w / 2, h / 2);
			ctx.scale(sx, sy);
			ctx.drawImage(src, -w / 2, -h / 2);
		});
		closeTransformScaleModal();
	}

	function transformRotateLayer() {
		if (
			manualTransformState.active &&
			manualTransformState.mode === "rotate" &&
			manualTransformState.changedManually
		) {
			deactivateManualTransform();
			closeTransformRotateModal();
			return;
		}
		const angleDeg = Number(transformRotateAngleInput?.value || 0);
		transformRotateByDegrees(angleDeg, { closeModal: true });
	}

	function transformRotateByDegrees(angleDeg, options = {}) {
		if (manualTransformState.active && !manualTransformState.dragging) {
			deactivateManualTransform();
		}
		if (!Number.isFinite(angleDeg)) {
			alert("Podaj poprawną wartość kąta.");
			return;
		}
		const angleRad = (angleDeg * Math.PI) / 180;
		applyTransformToActiveLayer((ctx, src, w, h) => {
			ctx.translate(w / 2, h / 2);
			ctx.rotate(angleRad);
			ctx.drawImage(src, -w / 2, -h / 2);
		});
		if (options.closeModal !== false) closeTransformRotateModal();
	}

	function transformSkewLayer() {
		const skewXDeg = askNumber("Zniekształcenie X (stopnie, np. 15)", 15);
		if (skewXDeg === null) return;
		const skewYDeg = askNumber("Zniekształcenie Y (stopnie, np. 0)", 0);
		if (skewYDeg === null) return;
		if (Math.abs(skewXDeg) >= 89 || Math.abs(skewYDeg) >= 89) {
			alert("Podaj wartości z zakresu od -88 do 88 stopni.");
			return;
		}
		const skewX = Math.tan((skewXDeg * Math.PI) / 180);
		const skewY = Math.tan((skewYDeg * Math.PI) / 180);
		applyTransformToActiveLayer((ctx, src, w, h) => {
			ctx.translate(w / 2, h / 2);
			ctx.transform(1, skewY, skewX, 1, 0, 0);
			ctx.drawImage(src, -w / 2, -h / 2);
		});
	}

	function transformFlipHorizontalLayer() {
		applyTransformToActiveLayer((ctx, src, w, h) => {
			ctx.translate(w, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(src, 0, 0);
		});
	}

	function transformFlipVerticalLayer() {
		applyTransformToActiveLayer((ctx, src, w, h) => {
			ctx.translate(0, h);
			ctx.scale(1, -1);
			ctx.drawImage(src, 0, 0);
		});
	}

	function openWorkspaceSizeModal(event = null) {
		if (event) event.preventDefault();
		widthInput.value = canvas.width || 512;
		heightInput.value = canvas.height || 512;
		resetSelection();
		hideTextPanel();
		modal.style.display = "flex";
	}

	newFileBtn.addEventListener("click", e => {
		openWorkspaceSizeModal(e);
	});

	if (workspaceSizeToolBtn) {
		workspaceSizeToolBtn.addEventListener("click", e => {
			openWorkspaceSizeModal(e);
		});
	}

	// MENU OKNO -> TYPOGRAFIA
	if (menuTypografia) {
		menuTypografia.addEventListener("click", e => {
			e.preventDefault();
			openTypographyForCurrentTextLayer();
			hideShapePanel();
		});
	}

	if (menuWarstwy) {
		menuWarstwy.addEventListener("click", e => {
			e.preventDefault();
			toggleLayersPanel();
			hideShapePanel();
		});
	}

	if (menuPedzel) {
		menuPedzel.addEventListener("click", e => {
			e.preventDefault();
			hideTextPanel();
			toggleBrushPanel();
			hideShapePanel();
		});
	}

	if (menuKorektor) {
		menuKorektor.addEventListener("click", e => {
			e.preventDefault();
			hideTextPanel();
			hideShapePanel();
			showAdjustPanel();
		});
	}

	if (menuFigura) {
		menuFigura.addEventListener("click", e => {
			e.preventDefault();
			hideTextPanel();
			if (shapePanel.classList.contains("hidden")) {
				closePanelsForCompact("shape");
				shapePanel.classList.remove("hidden");
			} else {
				hideShapePanel();
			}
		});
	}

	if (brushSizeControl && toolbarBrushSize) {
		brushSizeControl.value = toolbarBrushSize.value;
		updateBrushLabels();
		drawBrushPreview();
		brushSizeControl.addEventListener("input", e =>
			setBrushSize(e.target.value),
		);
		toolbarBrushSize.addEventListener("input", e =>
			setBrushSize(e.target.value),
		);
	}

	[
		brushHardnessControl,
		brushSpacingControl,
		brushAngleControl,
		brushRoundnessControl,
	].forEach(ctrl => {
		if (!ctrl) return;
		ctrl.addEventListener("input", () => {
			updateBrushLabels();
			drawBrushPreview();
		});
	});

	[
		brushSmoothingControl,
		brushKeepTextureControl,
		brushFlipXControl,
		brushFlipYControl,
	].forEach(ctrl => {
		if (!ctrl) return;
		ctrl.addEventListener("change", () => {
			drawBrushPreview();
		});
	});

	if (brushAngleControl) {
		brushAngleControl.addEventListener("input", e => {
			const val = parseInt(e.target.value || 0, 10);
			updateAnglePreview(val);
		});
	}

	if (brushPresets && brushPresets.length) {
		brushPresets.forEach(btn => {
			btn.addEventListener("click", () => {
				setBrushSize(btn.dataset.size);
				setBrushHardness(btn.dataset.hardness);
				setActivePreset(btn);
			});
		});
	}

	[
		[transformScaleMenuItem, openTransformScaleModal],
		[transformRotateMenuItem, openTransformRotateModal],
		[transformRotate90MenuItem, () => transformRotateByDegrees(90, { closeModal: false })],
		[transformRotate180MenuItem, () => transformRotateByDegrees(180, { closeModal: false })],
		[transformSkewMenuItem, () => activateManualTransform("skew")],
		[transformFlipHMenuItem, transformFlipHorizontalLayer],
		[transformFlipVMenuItem, transformFlipVerticalLayer],
	].forEach(([menuItem, handler]) => {
		if (!menuItem) return;
		menuItem.addEventListener("click", e => {
			e.preventDefault();
			handler();
		});
	});

	makeTransformWindowDraggable(transformScaleModal);
	makeTransformWindowDraggable(transformRotateModal);

	if (transformScaleXInput && transformScaleYInput) {
		let internalSync = false;
		const syncFromX = () => {
			if (!transformScaleLock?.checked || internalSync) return;
			internalSync = true;
			transformScaleYInput.value = transformScaleXInput.value;
			internalSync = false;
		};
		const syncFromY = () => {
			if (!transformScaleLock?.checked || internalSync) return;
			internalSync = true;
			transformScaleXInput.value = transformScaleYInput.value;
			internalSync = false;
		};
		transformScaleXInput.addEventListener("input", syncFromX);
		transformScaleYInput.addEventListener("input", syncFromY);
		transformScaleLock?.addEventListener("change", () => {
			if (!transformScaleLock.checked) return;
			transformScaleYInput.value = transformScaleXInput.value;
		});
	}

	transformScaleApplyBtn?.addEventListener("click", transformScaleLayer);
	transformScaleCancelBtn?.addEventListener("click", closeTransformScaleModal);
	transformScaleManualBtn?.addEventListener("click", () => activateManualTransform("scale"));

	if (transformRotateAngleInput && transformRotateAngleRange) {
		transformRotateAngleInput.addEventListener("input", () => {
			const val = Number(transformRotateAngleInput.value || 0);
			if (!Number.isFinite(val)) return;
			const clamped = Math.max(-180, Math.min(180, val));
			transformRotateAngleRange.value = String(clamped);
		});
		transformRotateAngleRange.addEventListener("input", () => {
			transformRotateAngleInput.value = transformRotateAngleRange.value;
		});
	}

	transformRotateApplyBtn?.addEventListener("click", transformRotateLayer);
	transformRotateCancelBtn?.addEventListener("click", closeTransformRotateModal);
	transformRotateManualBtn?.addEventListener("click", () => activateManualTransform("rotate"));

	window.editorTransform = {
		scale: openTransformScaleModal,
		rotate: openTransformRotateModal,
		rotate90: () => transformRotateByDegrees(90, { closeModal: false }),
		rotate180: () => transformRotateByDegrees(180, { closeModal: false }),
		skew: () => activateManualTransform("skew"),
		flipHorizontal: transformFlipHorizontalLayer,
		flipVertical: transformFlipVerticalLayer,
	};

	if (brushTypeButtons && brushTypeButtons.length) {
		brushTypeButtons.forEach(btn => {
			btn.addEventListener("click", () => {
				setBrushType(btn.dataset.brushType);
			});
		});
	}

	const brushTabs = brushPanel
		? brushPanel.querySelectorAll(".brush-tabs button")
		: [];
	brushTabs.forEach(btn => {
		btn.addEventListener("click", () => {
			brushTabs.forEach(b => b.classList.remove("active"));
			btn.classList.add("active");
		});
	});

	document.addEventListener("keydown", e => {
		if (
			e.altKey &&
			!e.ctrlKey &&
			!e.metaKey &&
			!e.shiftKey &&
			currentAdjustType === "curves" &&
			adjustPanel &&
			!adjustPanel.classList.contains("hidden") &&
			adjustCurvesChannelSelect
		) {
			const map = {
				"2": "master",
				"3": "red",
				"4": "green",
				"5": "blue",
			};
			const nextChannel = map[e.key];
			if (nextChannel) {
				setCurrentCurveChannel(nextChannel);
				drawCurvesEditor();
				renderAdjustPreview();
				e.preventDefault();
				return;
			}
		}

		if (
			e.altKey &&
			!e.ctrlKey &&
			!e.metaKey &&
			!e.shiftKey &&
			currentAdjustType === "hue" &&
			adjustPanel &&
			!adjustPanel.classList.contains("hidden") &&
			adjustHueRangeSelect
		) {
			const map = {
				"2": "master",
				"3": "reds",
				"4": "yellows",
				"5": "greens",
				"6": "cyans",
				"7": "blues",
				"8": "magentas",
			};
			const nextRange = map[e.key];
			if (nextRange) {
				adjustHueRangeSelect.value = nextRange;
				renderAdjustPreview();
				e.preventDefault();
				return;
			}
		}

		if (e.key === "Escape") {
			deactivateManualTransform();
			closeTransformScaleModal();
			closeTransformRotateModal();
			hideBrushPanel();
			cancelAdjustments();
			hideAdjustPanel();
		}
	});

	document.addEventListener("keydown", e => {
		if (currentPenTool && e.key === "Enter") {
			e.preventDefault();
			commitPenPath();
			return;
		}
		if (currentPenTool && e.key === "Escape") {
			e.preventDefault();
			isFreePenDrawing = false;
			isDraggingPenPoint = false;
			draggingPenPointIndex = -1;
			freePenStrokePoints = [];
			penPathPoints = [];
			clearPenPreviewOverlay();
			return;
		}
		if (e.key !== "Enter") return;
		if (
			manualTransformState.active &&
			manualTransformState.mode === "skew"
		) {
			e.preventDefault();
			deactivateManualTransform();
			return;
		}
		if (transformScaleModal && !transformScaleModal.classList.contains("hidden")) {
			e.preventDefault();
			transformScaleLayer();
			return;
		}
		if (transformRotateModal && !transformRotateModal.classList.contains("hidden")) {
			e.preventDefault();
			transformRotateLayer();
		}
	});

	document.addEventListener("mousemove", e => {
		if (!manualTransformState.dragging || !manualTransformState.active) return;
		const drag = manualTransformState.drag;
		const b = manualTransformState.baseBounds;
		if (!drag || !b || !wrapper || !canvas) return;
		const rect = wrapper.getBoundingClientRect();
		const px = ((e.clientX - rect.left) * canvas.width) / rect.width;
		const py = ((e.clientY - rect.top) * canvas.height) / rect.height;
		const dx = px - drag.startX;
		const dy = py - drag.startY;
		const p = { ...drag.startParams };
		if (drag.handle === "rotate") {
			const cx = b.x + b.w / 2;
			const cy = b.y + b.h / 2;
			const angle = Math.atan2(py - cy, px - cx);
			p.rotate = angle - drag.startPointerAngle + drag.startParams.rotate;
		} else if (drag.handle === "skewX") {
			p.skewX = Math.max(-2, Math.min(2, drag.startParams.skewX + dx / Math.max(10, b.h)));
		} else if (drag.handle === "skewY") {
			p.skewY = Math.max(-2, Math.min(2, drag.startParams.skewY + dy / Math.max(10, b.w)));
		} else if (["nw", "ne", "sw", "se"].includes(drag.handle)) {
			const signX = drag.handle.includes("w") ? -1 : 1;
			const signY = drag.handle.includes("n") ? -1 : 1;
			const nextScaleX = Math.max(
				0.05,
				drag.startParams.scaleX + (signX * dx) / Math.max(10, b.w / 2),
			);
			const nextScaleY = Math.max(
				0.05,
				drag.startParams.scaleY + (signY * dy) / Math.max(10, b.h / 2),
			);
			if (transformScaleLock?.checked && manualTransformState.mode === "scale") {
				const dominant =
					Math.abs(nextScaleX - drag.startParams.scaleX) >=
					Math.abs(nextScaleY - drag.startParams.scaleY)
						? nextScaleX
						: nextScaleY;
				p.scaleX = dominant;
				p.scaleY = dominant;
			} else {
				p.scaleX = nextScaleX;
				p.scaleY = nextScaleY;
			}
		}
		manualTransformState.params = p;
		manualTransformState.changedManually = true;
		if (!manualTransformState.savedForDrag) {
			saveState();
			manualTransformState.savedForDrag = true;
		}
		applyManualTransformPreview();
	});

	document.addEventListener("mouseup", () => {
		if (!manualTransformState.dragging) return;
		manualTransformState.dragging = false;
		manualTransformState.savedForDrag = false;
		if (!manualTransformState.active || !manualTransformState.layer) return;
		manualTransformState.sourceCanvas = cloneLayerCanvas(manualTransformState.layer);
		manualTransformState.baseBounds = getLayerContentBounds(manualTransformState.layer);
		manualTransformState.params = { scaleX: 1, scaleY: 1, rotate: 0, skewX: 0, skewY: 0 };
		renderManualTransformOverlay();
		updateLayerList();
	});

	if (adjustPanelCloseBtn) {
		adjustPanelCloseBtn.addEventListener("click", () => {
			cancelAdjustments();
			hideAdjustPanel();
		});
	}

	if (adjustButtons && adjustButtons.length) {
		adjustButtons.forEach(btn => {
			btn.addEventListener("click", () => {
				setAdjustType(btn.dataset.adjust);
			});
		});
	}

	if (adjustValueInput) {
		adjustValueInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}

	if (adjustValueInput2) {
		adjustValueInput2.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}

	if (adjustExposureInput) {
		adjustExposureInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}

	if (adjustOffsetInput) {
		adjustOffsetInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}

	if (adjustGammaInput) {
		adjustGammaInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustHueInput) {
		adjustHueInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustHuePresetSelect) {
		adjustHuePresetSelect.addEventListener("change", () => {
			setHuePreset(adjustHuePresetSelect.value, { render: true });
		});
	}
	if (adjustHueRangeSelect) {
		adjustHueRangeSelect.addEventListener("change", () => {
			renderAdjustPreview();
		});
	}
	if (adjustHueSaturationInput) {
		adjustHueSaturationInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustHueLightnessInput) {
		adjustHueLightnessInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustColorBalanceTone) {
		adjustColorBalanceTone.addEventListener("change", () => {
			renderAdjustPreview();
		});
	}
	if (adjustColorBalanceCyanRedInput) {
		adjustColorBalanceCyanRedInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustColorBalanceMagentaGreenInput) {
		adjustColorBalanceMagentaGreenInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustColorBalanceYellowBlueInput) {
		adjustColorBalanceYellowBlueInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustColorBalancePreserveLuminosityInput) {
		adjustColorBalancePreserveLuminosityInput.addEventListener("change", () => {
			renderAdjustPreview();
		});
	}
	if (adjustBlackWhitePresetSelect) {
		adjustBlackWhitePresetSelect.addEventListener("change", () => {
			applyBlackWhitePreset(adjustBlackWhitePresetSelect.value, { render: true });
		});
	}
	if (adjustLut3DSelect) {
		registerLut3DPresetOptions();
		adjustLut3DSelect.addEventListener("change", () => {
			const next = adjustLut3DSelect.value || "none";
			if (next === "__load__") {
				adjustLut3DSelect.value = lastLut3DKey || "none";
				adjustLut3DFileInput?.click();
				return;
			}
			lastLut3DKey = next;
			if (next.startsWith("preset:")) {
				const lut = getOrBuildPresetLut3DByKey(next);
				if (adjustLut3DInfo) {
					adjustLut3DInfo.textContent = lut
						? `Aktywny LUT 3D: ${adjustLut3DSelect.selectedOptions?.[0]?.textContent || next}`
						: "Nie udaĹ‚o siÄ™ wygenerowaÄ‡ presetu LUT 3D.";
				}
			}
			renderAdjustPreview();
		});
	}
	if (adjustLut3DFileInput) {
		adjustLut3DFileInput.addEventListener("change", () => {
			const file = adjustLut3DFileInput.files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = () => {
				const text = String(reader.result || "");
				const lut = parseCubeLut3D(text);
				if (!lut) {
					alert("Nie udaĹ‚o siÄ™ wczytaÄ‡ LUT 3D. ObsĹ‚ugiwany format: .cube (LUT_3D_SIZE).");
					adjustLut3DFileInput.value = "";
					return;
				}
				const key = `lut3d:${Date.now()}:${file.name}`;
				lut3DStore.set(key, lut);
				ensureLut3DOption(key, file.name);
				if (adjustLut3DSelect) adjustLut3DSelect.value = key;
				lastLut3DKey = key;
				if (adjustLut3DInfo) {
					adjustLut3DInfo.textContent = `ZaĹ‚adowano LUT 3D: ${file.name}`;
				}
				renderAdjustPreview();
				adjustLut3DFileInput.value = "";
			};
			reader.readAsText(file);
		});
	}
	if (adjustGradientStartColorInput) {
		adjustGradientStartColorInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustGradientStartOpacityInput) {
		adjustGradientStartOpacityInput.addEventListener("input", () => {
			updateGradientOpacityTexts({
				startOpacity: adjustGradientStartOpacityInput.value,
				endOpacity: adjustGradientEndOpacityInput?.value,
			});
			renderAdjustPreview();
		});
	}
	if (adjustGradientEndColorInput) {
		adjustGradientEndColorInput.addEventListener("input", () => {
			renderAdjustPreview();
		});
	}
	if (adjustGradientEndOpacityInput) {
		adjustGradientEndOpacityInput.addEventListener("input", () => {
			updateGradientOpacityTexts({
				startOpacity: adjustGradientStartOpacityInput?.value,
				endOpacity: adjustGradientEndOpacityInput.value,
			});
			renderAdjustPreview();
		});
	}
	if (adjustGradientAddStopBtn) {
		adjustGradientAddStopBtn.addEventListener("click", () => {
			if (!adjustGradientExtraStops) return;
			adjustGradientExtraStops.appendChild(
				createGradientExtraStopElement({ color: "#ff8a00", position: 50, opacity: 100 }),
			);
			renderAdjustPreview();
		});
	}
	if (adjustGradientExtraStops) {
		adjustGradientExtraStops.addEventListener("click", e => {
			const target = e.target;
			if (!(target instanceof Element)) return;
			if (target.classList.contains("gradient-stop-remove")) {
				const row = target.closest(".adjust-gradient-stop-row");
				if (row) row.remove();
				renderAdjustPreview();
			}
		});
		adjustGradientExtraStops.addEventListener("input", e => {
			const target = e.target;
			if (!(target instanceof Element)) return;
			const row = target.closest(".adjust-gradient-stop-row");
			if (!row) return;
			if (
				target.classList.contains("gradient-stop-position") ||
				target.classList.contains("gradient-stop-position-number")
			) {
				syncGradientExtraStopRow(
					row,
					target.classList.contains("gradient-stop-position-number") ? "number" : "range",
				);
			}
			if (target.classList.contains("gradient-stop-opacity")) {
				syncGradientExtraStopRow(row, "range");
			}
			renderAdjustPreview();
		});
	}
	if (adjustGradientDitherInput) {
		adjustGradientDitherInput.addEventListener("change", () => {
			renderAdjustPreview();
		});
	}
	if (adjustGradientReverseInput) {
		adjustGradientReverseInput.addEventListener("change", () => {
			renderAdjustPreview();
		});
	}
	updateGradientOpacityTexts(getGradientMapControlValues());
	if (adjustBlackWhiteTintEnabledInput) {
		adjustBlackWhiteTintEnabledInput.addEventListener("change", () => {
			if (adjustBlackWhiteTintColorInput) {
				adjustBlackWhiteTintColorInput.disabled =
					!adjustBlackWhiteTintEnabledInput.checked;
			}
			syncBlackWhitePreset();
			renderAdjustPreview();
		});
	}
	if (adjustBlackWhiteTintColorInput) {
		adjustBlackWhiteTintColorInput.addEventListener("input", () => {
			syncBlackWhitePreset();
			renderAdjustPreview();
		});
	}
	[
		adjustBwRedsInput,
		adjustBwYellowsInput,
		adjustBwGreensInput,
		adjustBwCyansInput,
		adjustBwBluesInput,
		adjustBwMagentasInput,
	].forEach(ctrl => {
		if (!ctrl) return;
		ctrl.addEventListener("input", () => {
			syncBlackWhitePreset();
			renderAdjustPreview();
		});
	});

	if (adjustCurvesResetBtn) {
		adjustCurvesResetBtn.addEventListener("click", () => {
			resetCurvePoints();
			activeCurvePointIndex = -1;
			drawCurvesEditor();
			renderAdjustPreview();
		});
	}

	if (adjustCurvesCanvas) {
		const handleCurvesPointerDown = e => {
			if (currentAdjustType !== "curves") return;
			const points = getCurrentCurvePoints();
			const pt = getCurveCanvasPointFromEvent(e);
			if (!pt) return;
			const hit = findCurvePointAt(pt.px, pt.py);
			if (hit >= 0) {
				activeCurvePointIndex = hit;
			} else {
				const np = {
					x: Math.round(fromCurveCanvasX(pt.px)),
					y: Math.round(fromCurveCanvasY(pt.py)),
					fixed: false,
				};
				points.push(np);
				sortCurvePoints();
				activeCurvePointIndex = points.indexOf(np);
				if (points.length > 12) {
					points.splice(1, points.length - 3);
				}
			}
			isDraggingCurvePoint = true;
			drawCurvesEditor();
			renderAdjustPreview();
			e.preventDefault();
		};

		adjustCurvesCanvas.addEventListener("mousedown", handleCurvesPointerDown);
		adjustCurvesCanvas.addEventListener(
			"touchstart",
			e => {
				const touch = e.changedTouches?.[0] || e.touches?.[0];
				if (!touch) return;
				handleCurvesPointerDown({
					clientX: touch.clientX,
					clientY: touch.clientY,
					preventDefault: () => e.preventDefault(),
				});
			},
			{ passive: false },
		);

		adjustCurvesCanvas.addEventListener("dblclick", e => {
			if (currentAdjustType !== "curves") return;
			const points = getCurrentCurvePoints();
			const pt = getCurveCanvasPointFromEvent(e);
			if (!pt) return;
			const hit = findCurvePointAt(pt.px, pt.py);
			if (hit > 0 && hit < points.length - 1) {
				points.splice(hit, 1);
				activeCurvePointIndex = -1;
				drawCurvesEditor();
				renderAdjustPreview();
			}
		});
	}

	const handleCurvesPointerMove = e => {
		if (!isDraggingCurvePoint || currentAdjustType !== "curves") return;
		if (!adjustCurvesCanvas) return;
		const points = getCurrentCurvePoints();
		const pt = getCurveCanvasPointFromEvent(e);
		if (!pt || activeCurvePointIndex < 0 || !points[activeCurvePointIndex]) return;

		const p = points[activeCurvePointIndex];
		p.y = Math.round(fromCurveCanvasY(pt.py));

		if (!p.fixed) {
			const prev = points[activeCurvePointIndex - 1];
			const next = points[activeCurvePointIndex + 1];
			const minX = prev ? prev.x + 1 : 0;
			const maxX = next ? next.x - 1 : 255;
			p.x = Math.round(Math.max(minX, Math.min(maxX, fromCurveCanvasX(pt.px))));
		}

		sortCurvePoints();
		drawCurvesEditor();
		renderAdjustPreview();
	};

	const handleCurvesPointerUp = () => {
		isDraggingCurvePoint = false;
	};

	document.addEventListener("mousemove", handleCurvesPointerMove);
	document.addEventListener("mouseup", handleCurvesPointerUp);
	document.addEventListener(
		"touchmove",
		e => {
			const touch = e.changedTouches?.[0] || e.touches?.[0];
			if (!touch) return;
			if (isDraggingCurvePoint) e.preventDefault();
			handleCurvesPointerMove({ clientX: touch.clientX, clientY: touch.clientY });
		},
		{ passive: false },
	);
	document.addEventListener("touchend", handleCurvesPointerUp, { passive: true });
	document.addEventListener("touchcancel", handleCurvesPointerUp, { passive: true });

	if (adjustCurvesChannelSelect) {
		adjustCurvesChannelSelect.addEventListener("change", () => {
			setCurrentCurveChannel(adjustCurvesChannelSelect.value);
			drawCurvesEditor();
			renderAdjustPreview();
		});
	}

	if (adjustCancelBtn) {
		adjustCancelBtn.addEventListener("click", () => {
			cancelAdjustments();
			hideAdjustPanel();
		});
	}

	if (adjustApplyBtn) {
		adjustApplyBtn.addEventListener("click", () => {
			applyAdjustments();
			hideAdjustPanel();
		});
	}

	// GLOBALNE SKRĂ“TY: Cofnij / PonĂłw
	document.addEventListener("keydown", e => {
		const tag = (e.target && e.target.tagName) || "";
		const type = (e.target && e.target.type) || "";
		const isTextInput =
			tag === "TEXTAREA" ||
			(tag === "INPUT" &&
				[
					"text",
					"number",
					"email",
					"search",
					"password",
					"tel",
					"url",
				].includes(type)) ||
			(e.target && e.target.isContentEditable);
		if (isTextInput) return;

		const key = (e.key || "").toLowerCase();
		const isStandardBrushMode =
			!currentRepairTool &&
			selectedShape === null &&
			!isMoveMode &&
			!isPipetteMode &&
			!isSelectMode &&
			!isCropMode &&
			!isTextMode;
		if ((currentRepairTool || isStandardBrushMode) && (key === "[" || key === "]")) {
			e.preventDefault();
			const currentSize = Number(brushSizeControl?.value || toolbarBrushSize?.value || 8);
			const delta = key === "]" ? 2 : -2;
			setBrushSize(Math.max(1, Math.min(160, currentSize + delta)));
			return;
		}
		if (key === "control") {
			refreshSpotSourceMarker(true);
		}
		if (key === "z" && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			if (e.shiftKey) {
				redo();
			} else {
				undo();
			}
		} else if (key === "y" && (e.ctrlKey || e.metaKey)) {
			// klasyczne Ctrl+Y na Windows
			e.preventDefault();
			redo();
		}
	});

	document.addEventListener("mousedown", e => {
		if (!brushPanel || brushPanel.classList.contains("hidden")) return;
		const insidePanel = e.target.closest("#brushPanel");
		const clickedToggle = e.target.closest("#menuPedzel");
		const clickedWorkspace = wrapper && wrapper.contains(e.target);
		if (!insidePanel && !clickedToggle && !clickedWorkspace) {
			hideBrushPanel();
		}
	});

	document.addEventListener("keyup", e => {
		if ((e.key || "").toLowerCase() === "control") {
			refreshSpotSourceMarker(false);
		}
	});

	document.addEventListener("mousedown", e => {
		if (!zoomOptions || zoomOptions.classList.contains("hidden")) return;
		if (!e.target.closest(".zoom-dropdown")) {
			zoomOptions.classList.add("hidden");
		}
	});

	document.addEventListener("mousedown", e => {
		if (!repairOptions || repairOptions.classList.contains("hidden")) return;
		if (!e.target.closest(".repair-dropdown")) {
			repairOptions.classList.add("hidden");
		}
	});

	document.addEventListener("mousedown", e => {
		if (!penOptions || penOptions.classList.contains("hidden")) return;
		if (!e.target.closest(".pen-dropdown")) {
			penOptions.classList.add("hidden");
		}
	});

	document.addEventListener("mousedown", e => {
		if (!brushOptions || brushOptions.classList.contains("hidden")) return;
		if (!e.target.closest(".brush-dropdown")) {
			brushOptions.classList.add("hidden");
		}
	});

	document.addEventListener("mousedown", e => {
		if (!workspaceContextMenu || workspaceContextMenu.classList.contains("hidden")) return;
		if (!e.target.closest("#workspaceContextMenu")) {
			hideWorkspaceContextMenu();
		}
	});

	document.addEventListener("mousedown", e => {
		if (!layersContextMenu || layersContextMenu.classList.contains("hidden")) return;
		if (!e.target.closest("#layersContextMenu")) {
			hideLayersContextMenu();
		}
	});

	document.addEventListener("mousedown", e => {
		if (!manualTransformState.active || !wrapper) return;
		if (wrapper.contains(e.target)) return;
		deactivateManualTransform();
	});

	if (transformScaleModal) {
		transformScaleModal.addEventListener("mousedown", e => {
			if (e.target === transformScaleModal) closeTransformScaleModal();
		});
	}

	if (transformRotateModal) {
		transformRotateModal.addEventListener("mousedown", e => {
			if (e.target === transformRotateModal) closeTransformRotateModal();
		});
	}

	openFileBtn.addEventListener("click", e => {
		e.preventDefault();
		resetSelection();
		hideTextPanel();
		fileInput.click();
	});

function applyShapeStrokeWidth(value) {
	if (!currentShapeLayerId || !window.getLayerById || !window.renderShapeLayer)
		return;
	const layer = window.getLayerById(currentShapeLayerId);
	if (!layer || !layer.shapeData) return;
	const v = Math.max(1, parseInt(value || 1, 10));
	layer.shapeData.lineWidth = v;
	window.renderShapeLayer(layer);
}

function applyShapeCornerRadius(value) {
	if (!currentShapeLayerId || !window.getLayerById || !window.renderShapeLayer)
		return;
	const layer = window.getLayerById(currentShapeLayerId);
	if (!layer || !layer.shapeData) return;
	if (layer.shapeData.type !== "roundRect") return;
	const v = Math.max(0, parseInt(value || 0, 10));
	layer.shapeData.radius = v;
	window.renderShapeLayer(layer);
}

function applyShapeColorsFromPickers() {
	if (!currentShapeLayerId || !window.getLayerById || !window.renderShapeLayer)
		return;
	const layer = window.getLayerById(currentShapeLayerId);
	if (!layer || !layer.shapeData) return;
	if (strokeColorInput) layer.shapeData.strokeColor = strokeColorInput.value;
	if (fillColorInput) layer.shapeData.fillColor = fillColorInput.value;
	window.renderShapeLayer(layer);
}

if (shapeStrokeWidthInput) {
	shapeStrokeWidthInput.addEventListener("input", e =>
		applyShapeStrokeWidth(e.target.value),
	);
}

if (shapeCornerRadiusInput) {
	shapeCornerRadiusInput.addEventListener("input", e =>
		applyShapeCornerRadius(e.target.value),
	);
}

if (strokeColorInput) {
	strokeColorInput.addEventListener("input", applyShapeColorsFromPickers);
}

if (fillColorInput) {
	fillColorInput.addEventListener("input", applyShapeColorsFromPickers);
}

	// OTWIERANIE OBRAZU = NOWA WARSTWA
	fileInput.addEventListener("change", event => {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = function (e) {
			const img = new Image();
			img.onload = () => {
				const layerName = `Obraz ${
					layers.filter(l => l.kind === "image").length + 1
				}`;
				createLayer(layerName, "image");
				const layer = layers[activeLayerIndex];
				if (!layer || !layer.canvas) return;
				const displayScaleX =
					canvas?.width > 0 ? (parseFloat(canvas.style.width) || canvas.width) / canvas.width : 1;
				const displayScaleY =
					canvas?.height > 0
						? (parseFloat(canvas.style.height) || canvas.height) / canvas.height
						: 1;
				layer.canvas.width = img.width;
				layer.canvas.height = img.height;
				layer.canvas.style.width = `${img.width * displayScaleX}px`;
				layer.canvas.style.height = `${img.height * displayScaleY}px`;
				layer.ctx = layer.canvas.getContext("2d");
				applyLayerCanvasVisualState(layer);
				const ctx = layer.ctx;
				if (!ctx) return;

				saveState();
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				// Zachowaj caĹ‚y obraz; fragmenty poza workspace sÄ… tylko ukryte przez maskÄ™ wrappera.
				ctx.drawImage(img, 0, 0);
				updateLayerList();
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(file);
	});

	setBtn.addEventListener("click", () => {
		const width = parseInt(widthInput.value, 10);
		const height = parseInt(heightInput.value, 10);
		if (width >= 100 && height >= 100) {
			initWorkspace(width, height);
			positionToolbarToggle();
			updateRulerLayout();
			if (layers[activeLayerIndex]) {
				selectSingleLayer(layers[activeLayerIndex].id);
				updateLayerList();
			}
		}
	});

	// ===== NARZÄDZIA PASKA =====

	shapeButton.addEventListener("click", e => {
		e.preventDefault();
		e.stopPropagation();
		disableZoomTool();
		disableRepairTool();
		disablePenTool();
		resetSelection();
		hideTextPanel();
		const shouldOpen = shapeOptions.classList.contains("hidden");
		closeAllToolDropdowns();
		if (shouldOpen) {
			shapeOptions.classList.remove("hidden");
			positionDropdownUnderButton(shapeButton, shapeOptions);
		}
	});

	shapeOptions.querySelectorAll("button").forEach(btn => {
		btn.addEventListener("click", () => {
			disableZoomTool();
			disableRepairTool();
			disablePenTool();
			resetSelection();
			hideTextPanel();
			isMoveMode = false;
			isPipetteMode = false;
			isSelectMode = false;
			isCropMode = false;
			isTextMode = false;
			wrapper.classList.remove("move-cursor");
			selectedShape = btn.dataset.shape;
			shapeOptions.classList.add("hidden");
		});
	});

	brushToolBtn.addEventListener("click", e => {
		e.preventDefault();
		e.stopPropagation();
		if (!brushOptions) {
			activateBrushMode("paint");
			return;
		}
		const shouldOpen = brushOptions.classList.contains("hidden");
		closeAllToolDropdowns();
		if (shouldOpen) {
			brushOptions.classList.remove("hidden");
			positionDropdownUnderButton(brushToolBtn, brushOptions);
		}
	});

	document.getElementById("moveTool").addEventListener("click", () => {
		disableZoomTool();
		disableRepairTool();
		disablePenTool();
		resetSelection();
		hideTextPanel();
		selectedShape = null;
		isPipetteMode = false;
		isMoveMode = true;
		isSelectMode = false;
		isCropMode = false;
		isTextMode = false;
		wrapper.classList.add("move-cursor");
	});

	pipetteTool.addEventListener("click", () => {
		disableZoomTool();
		disableRepairTool();
		disablePenTool();
		resetSelection();
		hideTextPanel();
		isPipetteMode = true;
		isMoveMode = false;
		isSelectMode = false;
		isCropMode = false;
		isTextMode = false;
		selectedShape = null;
		wrapper.classList.remove("move-cursor");
	});

	selectToolBtn.addEventListener("click", e => {
		e.preventDefault();
		e.stopPropagation();
		disableZoomTool();
		disableRepairTool();
		disablePenTool();
		const shouldOpen = selectOptions.classList.contains("hidden");
		closeAllToolDropdowns();
		if (shouldOpen) {
			selectOptions.classList.remove("hidden");
			positionDropdownUnderButton(selectToolBtn, selectOptions);
		}
	});

	selectOptions.querySelectorAll("button").forEach(btn => {
		btn.addEventListener("click", () => {
			disableZoomTool();
			disableRepairTool();
			disablePenTool();
			selectMode = btn.dataset.select;
			activeRectSelectionMode = selectMode === "ellipse" ? "ellipse" : "rect";
			selectOptions.classList.add("hidden");

			resetSelection();
			isSelectMode = true;
			isMoveMode = false;
			isPipetteMode = false;
			isCropMode = false;
			isTextMode = false;
			selectedShape = null;
			hideTextPanel();
			wrapper.classList.remove("move-cursor");
		});
	});

	if (cropBtn) {
		cropBtn.addEventListener("click", () => {
			disableZoomTool();
			disableRepairTool();
			disablePenTool();
			resetSelection();
			hideTextPanel();
			isCropMode = true;
			isMoveMode = false;
			isPipetteMode = false;
			isSelectMode = false;
			isTextMode = false;
			selectedShape = null;
			wrapper.classList.remove("move-cursor");
		});
	}

	// klikniÄ™cie narzÄ™dzia TEKST
	if (textToolBtn) {
		textToolBtn.addEventListener("click", () => {
			disableZoomTool();
			disableRepairTool();
			disablePenTool();
			resetSelection();
			restoreEditingLayerOpacity();
			isTextMode = true;
			isMoveMode = false;
			isPipetteMode = false;
			isSelectMode = false;
			isCropMode = false;
			selectedShape = null;
			hideTextPanel();
			wrapper.classList.remove("move-cursor");
		});
	}

	alignButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			currentAlign = btn.dataset.align;
			alignButtons.forEach(b => b.classList.remove("active"));
			btn.classList.add("active");
			applyOverlayFontStyles();
		});
	});

	document.getElementById("addLayer").addEventListener("click", () => {
		resetSelection();
		hideTextPanel();
		createLayer();
		saveState();
		positionToolbarToggle();
	});

	if (zoomToolBtn && zoomOptions) {
		zoomToolBtn.addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();
			const shouldOpen = zoomOptions.classList.contains("hidden");
			closeAllToolDropdowns();
			if (shouldOpen) {
				zoomOptions.classList.remove("hidden");
				positionDropdownUnderButton(zoomToolBtn, zoomOptions);
			}
		});

		zoomOptions.querySelectorAll("button[data-zoom]").forEach(btn => {
			btn.addEventListener("click", e => {
				e.preventDefault();
				e.stopPropagation();
				const mode = btn.dataset.zoom === "out" ? "out" : "in";
				activateZoomTool(mode);
				zoomOptions.classList.add("hidden");
			});
		});
	}

	if (toggleGridMenuItem) {
		toggleGridMenuItem.addEventListener("click", e => {
			e.preventDefault();
			setGridVisible(!isGridVisible);
			hideWorkspaceContextMenu();
		});
	}
	if (toggleRulerMenuItem) {
		toggleRulerMenuItem.addEventListener("click", e => {
			e.preventDefault();
			setRulerVisible(!isRulerVisible);
			hideWorkspaceContextMenu();
		});
	}
	if (mergeSelectedLayersMenuItem) {
		mergeSelectedLayersMenuItem.addEventListener("click", e => {
			e.preventDefault();
			mergeSelectedLayers();
		});
	}
	if (wrapper) {
		wrapper.addEventListener("contextmenu", e => {
			e.preventDefault();
			showWorkspaceContextMenu(e.clientX, e.clientY);
		});
	}

	if (repairToolBtn && repairOptions) {
		repairToolBtn.addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();
			const shouldOpen = repairOptions.classList.contains("hidden");
			closeAllToolDropdowns();
			if (shouldOpen) {
				repairOptions.classList.remove("hidden");
				positionDropdownUnderButton(repairToolBtn, repairOptions);
			}
		});

		repairOptions.querySelectorAll("button[data-repair]").forEach(btn => {
			btn.addEventListener("click", e => {
				e.preventDefault();
				e.stopPropagation();
				const tool = btn.dataset.repair || "spot";
				activateRepairTool(tool);
				repairOptions.classList.add("hidden");
			});
		});
	}

	if (penToolBtn && penOptions) {
		penToolBtn.addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();
			const shouldOpen = penOptions.classList.contains("hidden");
			closeAllToolDropdowns();
			if (shouldOpen) {
				penOptions.classList.remove("hidden");
				positionDropdownUnderButton(penToolBtn, penOptions);
			}
		});

		penOptions.querySelectorAll("button[data-pen]").forEach(btn => {
			btn.addEventListener("click", e => {
				e.preventDefault();
				e.stopPropagation();
				const tool = btn.dataset.pen || "pen";
				activatePenTool(tool);
				penOptions.classList.add("hidden");
			});
		});
	}

	if (brushOptions) {
		brushOptions.querySelectorAll("button[data-brush-mode]").forEach(btn => {
			btn.addEventListener("click", e => {
				e.preventDefault();
				e.stopPropagation();
				const mode = btn.dataset.brushMode || "paint";
				activateBrushMode(mode);
				brushOptions.classList.add("hidden");
			});
		});
	}

	// ===== ZDARZENIA WSKAĹąNIKA NA OBSZARZE (MYSZ + DOTYK) =====

	function toTouchLikeMouseEvent(touchEvent) {
		const touch =
			touchEvent.changedTouches?.[0] || touchEvent.touches?.[0] || null;
		if (!touch) return null;
		return {
			target: touchEvent.target,
			clientX: touch.clientX,
			clientY: touch.clientY,
			button: 0,
			buttons: touchEvent.type === "touchend" ? 0 : 1,
			ctrlKey: touchEvent.ctrlKey || false,
			altKey: touchEvent.altKey || false,
			shiftKey: touchEvent.shiftKey || false,
			metaKey: touchEvent.metaKey || false,
			detail: 1,
			preventDefault: () => {
				if (typeof touchEvent.preventDefault === "function") touchEvent.preventDefault();
			},
		};
	}

	const handleWorkspacePointerDown = e => {
		// klikniÄ™cie w textarea â€“ nie dotykamy logiki rysowania
		function isEventOnTextOverlay(e) {
			if (!textOverlay) return false;
			// SprawdĹş czy event pochodzi z textarea lub jej rodzica .text-overlay
			return e.target === textOverlay || textOverlay.contains(e.target);
		}

		if (manualTransformState.active) {
			if (!e.target.closest(".manual-transform-handle")) {
				deactivateManualTransform();
			}
			return;
		}

		if (!layers.length) return;
		if (e.button !== 0) return;

		const rect = wrapper.getBoundingClientRect();
		const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
		const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

		if (typeof isZoomMode !== "undefined" && isZoomMode) {
			const factor =
				typeof zoomMode !== "undefined" && zoomMode === "out" ? 0.8 : 1.25;
			if (typeof window.zoomAtClientPoint === "function") {
				window.zoomAtClientPoint(e.clientX, e.clientY, factor);
			}
			updateRulerLayout();
			return;
		}

		if (currentPenTool) {
			if (isActiveLayerLocked()) return;
			const canDragPoint =
				currentPenTool !== "removePoint" && penPathPoints.length > 0;
			if (canDragPoint) {
				const dragIdx = findNearestPenPointIndex(x, y, 10);
				if (dragIdx >= 0) {
					isDraggingPenPoint = true;
					draggingPenPointIndex = dragIdx;
					drawPenPreviewOverlay();
					return;
				}
			}
			if (currentPenTool === "freePen" || currentPenTool === "curvaturePen") {
				isFreePenDrawing = true;
				freePenStrokePoints = [{ x, y }];
				drawPenPreviewOverlay(freePenStrokePoints);
				return;
			}
			if (currentPenTool === "addPoint") {
				addPenPointOnNearestSegment(x, y);
				drawPenPreviewOverlay();
				return;
			}
			if (currentPenTool === "removePoint") {
				removeNearestPenPoint(x, y);
				drawPenPreviewOverlay();
				return;
			}
			if (e.detail >= 2 && penPathPoints.length > 2) {
				commitPenPath();
				return;
			}
			penPathPoints.push({ x, y });
			drawPenPreviewOverlay();
			return;
		}

		// TEKST â€“ najpierw prĂłba edycji istniejÄ…cego
		if (isTextMode) {
			restoreEditingLayerOpacity();

			const hit = findTextLayerAtCanvasPos(x, y);
			if (hit) {
				if (hit.layer && hit.layer.locked) {
					activeLayerIndex = hit.index;
					updateLayerList();
					alert(
						"Ta warstwa tekstowa jest zablokowana. Odblokuj ja, aby ja edytowac.",
					);
					return;
				}
				// EDYCJA ISTNIEJÄ„CEGO TEKSTU
				activeLayerIndex = hit.index;
				updateLayerList();

				textBoxRect = { ...hit.rect };
				drawSelectionRect(textBoxRect);

				if (hit.layer && hit.layer.canvas) {
					hit.layer.canvas.style.opacity = 0;
				}

				createTextOverlayForRect(textBoxRect);

				if (textOverlay) textOverlay.value = hit.layer.textData.text || "";

				if (hit.layer.textData.options) {
					loadTypographyOptions(hit.layer.textData.options);
				} else {
					loadTypographyOptions({ align: currentAlign });
				}

				textPanel.classList.remove("hidden");

				editingTextLayerIndex = hit.index;
				window.setCurrentTextEditLayerIndex(hit.index);
				return;
			}

			// NOWY TEKST
			editingTextLayerIndex = null;
			window.setCurrentTextEditLayerIndex(null);

			isDrawingTextBox = true;
			textBoxRect = { x, y, w: 0, h: 0 };
			drawSelectionRect(textBoxRect);
			return;
		}

		if (isCropMode) {
			cropRect = { x, y, w: 0, h: 0 };
			isDrawingCrop = true;
			drawSelectionRect(cropRect);
			return;
		}

		if (isSelectMode) {
			if (selectMode === "lasso") {
				const ctx = getActiveCtx();
				if (!ctx) return;

				if (hasLassoSelection && lassoSelectionPoints && !isLassoDrawing) {
					if (
						pointInPolygon(x, y, lassoSelectionPoints) &&
						!isActiveLayerLocked()
					) {
						saveState();

						layerBeforeMoveCanvas = document.createElement("canvas");
						layerBeforeMoveCanvas.width = ctx.canvas.width;
						layerBeforeMoveCanvas.height = ctx.canvas.height;
						const backupCtx = layerBeforeMoveCanvas.getContext("2d");
						backupCtx.drawImage(ctx.canvas, 0, 0);

						lassoSelectionCanvas = document.createElement("canvas");
						lassoSelectionCanvas.width = ctx.canvas.width;
						lassoSelectionCanvas.height = ctx.canvas.height;
						const selCtx = lassoSelectionCanvas.getContext("2d");
						selCtx.clearRect(0, 0, selCtx.canvas.width, selCtx.canvas.height);

						selCtx.save();
						buildLassoPath(selCtx, lassoSelectionPoints, 0, 0, true);
						selCtx.clip();
						selCtx.drawImage(backupCtx.canvas, 0, 0);
						selCtx.restore();

						backupCtx.save();
						buildLassoPath(backupCtx, lassoSelectionPoints, 0, 0, true);
						backupCtx.clip();
						backupCtx.clearRect(
							0,
							0,
							backupCtx.canvas.width,
							backupCtx.canvas.height,
						);
						backupCtx.restore();

						ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
						ctx.drawImage(backupCtx.canvas, 0, 0);

						selectionMoveStartX = x;
						selectionMoveStartY = y;
						lassoLastDX = 0;
						lassoLastDY = 0;
						isMovingSelection = true;
						return;
					}
				}

				isLassoDrawing = true;
				hasLassoSelection = false;
				lassoPoints = [{ x, y }];
				clearSelectionOverlay();
				drawLassoPath(lassoPoints, 0, 0, false);
				return;
			}

			if (selectionRect) {
				const norm = normalizeRect(selectionRect);
				selectionRect = norm;
				if (
					activeRectSelectionMode === "rect" &&
					pointInRect(x, y, norm) &&
					!isActiveLayerLocked()
				) {
					const ctx = getActiveCtx();
					if (!ctx) return;

					saveState();

					layerBeforeMoveCanvas = document.createElement("canvas");
					layerBeforeMoveCanvas.width = ctx.canvas.width;
					layerBeforeMoveCanvas.height = ctx.canvas.height;
					const backupCtx = layerBeforeMoveCanvas.getContext("2d");
					backupCtx.drawImage(ctx.canvas, 0, 0);

					selectionImageData = backupCtx.getImageData(
						norm.x,
						norm.y,
						norm.w,
						norm.h,
					);
					backupCtx.clearRect(norm.x, norm.y, norm.w, norm.h);

					selectionOriginalRect = { ...norm };
					selectionMoveStartX = x;
					selectionMoveStartY = y;
					isMovingSelection = true;
					return;
				}
			}

			isMovingSelection = false;
			if (selectMode === "singleRow") {
				activeRectSelectionMode = "rect";
				selectionRect = { x: 0, y: Math.floor(y), w: canvas.width, h: 1 };
				drawRectSelectionOverlay(selectionRect);
				return;
			}
			if (selectMode === "singleColumn") {
				activeRectSelectionMode = "rect";
				selectionRect = { x: Math.floor(x), y: 0, w: 1, h: canvas.height };
				drawRectSelectionOverlay(selectionRect);
				return;
			}
			activeRectSelectionMode = selectMode === "ellipse" ? "ellipse" : "rect";
			isDrawingSelection = true;
			selectionRect = { x, y, w: 0, h: 0 };
			drawRectSelectionOverlay(selectionRect);
			return;
		}

		if (isPipetteMode) {
			let px = Math.floor(Math.min(Math.max(x, 0), canvas.width - 1));
			let py = Math.floor(Math.min(Math.max(y, 0), canvas.height - 1));

			const ctx = getActiveCtx();
			if (!ctx) return;

			const pixel = ctx.getImageData(px, py, 1, 1).data;
			strokeColorInput.value = rgbToHex(pixel[0], pixel[1], pixel[2]);

			isPipetteMode = false;
			return;
		}

		if (isMoveMode) {
			if (isActiveLayerLocked()) return;
			isDragging = true;
			offsetX = e.clientX;
			offsetY = e.clientY;
			if (typeof window.saveDocumentState === "function") {
				window.saveDocumentState();
			}
			return;
		}

		if (currentRepairTool) {
			if (isActiveLayerLocked()) return;
			const ctx = getActiveCtx();
			if (!ctx) return;
			const brush = getBrushSettings();

			if (currentRepairTool === "spot" && e.ctrlKey) {
				repairBrushSource = { x, y };
				refreshSpotSourceMarker(false);
				return;
			}

			if (currentRepairTool === "patch") {
				if (
					patchSelectionPoints &&
					patchSelectionPoints.length > 2 &&
					pointInPolygon(x, y, patchSelectionPoints)
				) {
					if (e.ctrlKey) {
						isPatchMovingSelection = true;
						patchSelectionMoveStartX = x;
						patchSelectionMoveStartY = y;
						patchSelectionBasePoints = patchSelectionPoints.map(p => ({ ...p }));
						return;
					}
					saveState();
					const snapshot = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
					repairSourceImageData = new ImageData(
						new Uint8ClampedArray(snapshot.data),
						snapshot.width,
						snapshot.height,
					);
					repairWorkingImageData = snapshot;
					isPatchRedirecting = true;
					patchDragStart = { x, y };
					return;
				}
				isPatchSelecting = true;
				isPatchMovingSelection = false;
				isPatchRedirecting = false;
				patchDraftPoints = [{ x, y }];
				drawLassoPath(patchDraftPoints, 0, 0, false);
				return;
			}

			saveState();
			const snapshot = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
			repairSourceImageData = new ImageData(
				new Uint8ClampedArray(snapshot.data),
				snapshot.width,
				snapshot.height,
			);
			repairWorkingImageData = snapshot;
			isRepairPainting = true;
			repairLastX = x;
			repairLastY = y;
			repairDistanceSinceLastStamp = 0;

			if (currentRepairTool === "spot") {
				const src = repairBrushSource || { x, y };
				repairSourceOffsetX = src.x - x;
				repairSourceOffsetY = src.y - y;
				applyHealingStamp(
					repairWorkingImageData,
					repairSourceImageData,
					x,
					y,
					x + repairSourceOffsetX,
					y + repairSourceOffsetY,
					brush.size,
					brush.hardness,
				);
				ctx.putImageData(repairWorkingImageData, 0, 0);
				return;
			}

			if (currentRepairTool === "heal") {
				applySpotRepairStamp(
					repairWorkingImageData,
					repairSourceImageData,
					x,
					y,
					brush.size,
					brush.hardness,
				);
				ctx.putImageData(repairWorkingImageData, 0, 0);
				return;
			}

			return;
		}

		if (isActiveLayerLocked()) return;

		drawing = true;
		drawingStarted = false;
		startX = x;
		startY = y;

		if (selectedShape === null) {
			const ctx = getActiveCtx();
			if (ctx) {
				const brushSettings = getBrushSettings();
				const isEraser = brushSettings?.brushShape?.brushType === "eraser";
				const stampBrushShape = isEraser
					? { ...brushSettings.brushShape, brushType: "round" }
					: brushSettings.brushShape;
				saveState();
				drawingStarted = true;
				withActiveSelectionClip(ctx, () => {
					ctx.save();
					if (isEraser) {
						ctx.globalCompositeOperation = "destination-out";
					}
					stampBrush(
						ctx,
						x,
						y,
						brushSettings.size,
						brushSettings.hardness,
						brushSettings.color,
						stampBrushShape,
					);
					ctx.restore();
				});
				brushDistanceSinceLastStamp = 0;
			}
			brushLastX = x;
			brushLastY = y;
			brushSmoothX = x;
			brushSmoothY = y;
		}
	};

	const handleWorkspacePointerUp = e => {
		if (manualTransformState.active) return;
		// nie reagujemy, jeĹ›li puszczamy przycisk na textarea
		if (isEventOnTextOverlay(e)) return;
		const rect = wrapper.getBoundingClientRect();
		const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
		const y = ((e.clientY - rect.top) * canvas.height) / rect.height;
		repairPointerCanvasPos = { x, y };
		if (currentRepairTool === "spot") {
			refreshSpotSourceMarker(e.ctrlKey);
		}

		if (currentPenTool && isDraggingPenPoint) {
			isDraggingPenPoint = false;
			draggingPenPointIndex = -1;
			drawPenPreviewOverlay();
			return;
		}

		if (
			(currentPenTool === "freePen" || currentPenTool === "curvaturePen") &&
			isFreePenDrawing
		) {
			isFreePenDrawing = false;
			if (freePenStrokePoints.length > 1) {
				penPathPoints = freePenStrokePoints.slice();
			}
			freePenStrokePoints = [];
			drawPenPreviewOverlay();
			return;
		}

		if (isTextMode && isDrawingTextBox && textBoxRect) {
			isDrawingTextBox = false;
			textBoxRect = normalizeRect(textBoxRect);
			if (textBoxRect.w < 5 || textBoxRect.h < 5) {
				textBoxRect = null;
				clearSelectionOverlay();
				removeTextOverlay();
				return;
			}

			if (!fontSizeInput.value) fontSizeInput.value = 24;
			if (!fontFamilySelect.value) fontFamilySelect.value = "Segoe UI";

			createTextOverlayForRect(textBoxRect);
			textPanel.classList.remove("hidden");
			return;
		}

		if (isCropMode && isDrawingCrop && cropRect) {
			isDrawingCrop = false;
			cropRect = normalizeRect(cropRect);
			cropToRect(cropRect);
			return;
		}

		if (isSelectMode && selectMode === "lasso") {
			if (isLassoDrawing) {
				isLassoDrawing = false;
				if (lassoPoints.length > 2) {
					hasLassoSelection = true;
					lassoSelectionPoints = lassoPoints.slice();
					drawLassoPath(lassoSelectionPoints, 0, 0, true);
				} else {
					hasLassoSelection = false;
					lassoSelectionPoints = null;
					clearSelectionOverlay();
				}
				return;
			}

			if (isMovingSelection) {
				isMovingSelection = false;
				if (hasLassoSelection && lassoSelectionPoints) {
					lassoSelectionPoints = lassoSelectionPoints.map(p => ({
						x: p.x + lassoLastDX,
						y: p.y + lassoLastDY,
					}));
					drawLassoPath(lassoSelectionPoints, 0, 0, true);
				}
				layerBeforeMoveCanvas = null;
				return;
			}
		}

		if (isSelectMode && isMovingSelection) {
			isMovingSelection = false;
			layerBeforeMoveCanvas = null;
			return;
		}

		if (isSelectMode && isDrawingSelection) {
			isDrawingSelection = false;
			if (selectionRect) {
				selectionRect = normalizeRect(selectionRect);
				drawRectSelectionOverlay(selectionRect);
			}
			return;
		}

		if (isMoveMode) {
			isDragging = false;
			return;
		}

		if (currentRepairTool === "patch" && isPatchSelecting) {
			isPatchSelecting = false;
			if (patchDraftPoints.length > 2) {
				patchSelectionPoints = patchDraftPoints.map(p => ({ ...p }));
				const bounds = getPolygonBounds(patchSelectionPoints);
				if (!bounds || bounds.w < 4 || bounds.h < 4) {
					patchSelectionPoints = null;
					clearSelectionOverlay();
				} else {
					drawLassoPath(patchSelectionPoints, 0, 0, true);
				}
			}
			patchDraftPoints = [];
			return;
		}

		if (currentRepairTool === "patch" && isPatchMovingSelection) {
			isPatchMovingSelection = false;
			patchSelectionBasePoints = null;
			if (patchSelectionPoints && patchSelectionPoints.length > 2) {
				drawLassoPath(patchSelectionPoints, 0, 0, true);
			} else {
				clearSelectionOverlay();
				patchSelectionPoints = null;
			}
			return;
		}

		if (currentRepairTool === "patch" && isPatchRedirecting) {
			const ctx = getActiveCtx();
			const sel = patchSelectionPoints;
			if (
				ctx &&
				sel &&
				sel.length > 2 &&
				repairSourceImageData &&
				patchDragStart
			) {
				const dx = x - patchDragStart.x;
				const dy = y - patchDragStart.y;
				repairWorkingImageData = cloneImageData(repairSourceImageData);
				if (repairWorkingImageData) {
					applyPatchFromPolygon(repairWorkingImageData, repairSourceImageData, sel, dx, dy);
					ctx.putImageData(repairWorkingImageData, 0, 0);
				}
			}
			isPatchRedirecting = false;
			repairWorkingImageData = null;
			repairSourceImageData = null;
			patchDragStart = null;
			clearSelectionOverlay();
			patchSelectionPoints = null;
			patchDraftPoints = [];
			return;
		}

		if (isRepairPainting && currentRepairTool) {
			isRepairPainting = false;
			repairLastX = null;
			repairLastY = null;
			repairDistanceSinceLastStamp = 0;
			repairWorkingImageData = null;
			repairSourceImageData = null;
			patchDragStart = null;
			return;
		}

		if (!drawing) return;

		const endX = x;
		const endY = y;

		if (selectedShape !== null) {
			drawShape(startX, startY, endX, endY);
		}

		drawing = false;
		drawingStarted = false;
		brushLastX = null;
		brushLastY = null;
		brushSmoothX = null;
		brushSmoothY = null;
		brushDistanceSinceLastStamp = 0;
	};

	const handleWorkspacePointerMove = e => {
		if (manualTransformState.active) return;
		// ruch myszy nad textarea â€“ ignorujemy
		if (isEventOnTextOverlay(e)) return;

		if (!layers.length) return;

		const rect = wrapper.getBoundingClientRect();
		const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
		const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

		if (currentPenTool && isDraggingPenPoint && draggingPenPointIndex >= 0) {
			penPathPoints[draggingPenPointIndex] = { x, y };
			drawPenPreviewOverlay();
			return;
		}

		if (
			(currentPenTool === "freePen" || currentPenTool === "curvaturePen") &&
			isFreePenDrawing
		) {
			const last = freePenStrokePoints[freePenStrokePoints.length - 1];
			if (!last) {
				freePenStrokePoints.push({ x, y });
			} else {
				const dx = x - last.x;
				const dy = y - last.y;
				if (dx * dx + dy * dy >= 4) {
					freePenStrokePoints.push({ x, y });
				}
			}
			drawPenPreviewOverlay(freePenStrokePoints);
			return;
		}

		if (isTextMode && isDrawingTextBox && textBoxRect) {
			textBoxRect.w = x - textBoxRect.x;
			textBoxRect.h = y - textBoxRect.y;
			drawSelectionRect(textBoxRect);
			return;
		}

		if (isCropMode && isDrawingCrop && cropRect) {
			cropRect.w = x - cropRect.x;
			cropRect.h = y - cropRect.y;
			drawSelectionRect(cropRect);
			return;
		}

		if (isSelectMode && selectMode === "lasso") {
			const ctx = getActiveCtx();

			if (isLassoDrawing) {
				lassoPoints.push({ x, y });
				drawLassoPath(lassoPoints, 0, 0, false);
				return;
			}

			if (
				isMovingSelection &&
				lassoSelectionCanvas &&
				layerBeforeMoveCanvas &&
				ctx
			) {
				const dx = x - selectionMoveStartX;
				const dy = y - selectionMoveStartY;
				lassoLastDX = dx;
				lassoLastDY = dy;

				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				ctx.drawImage(layerBeforeMoveCanvas, 0, 0);
				ctx.drawImage(lassoSelectionCanvas, dx, dy);

				drawLassoPath(lassoSelectionPoints, dx, dy, true);
				return;
			}
		}

		if (
			isSelectMode &&
			isMovingSelection &&
			selectionOriginalRect &&
			selectionImageData &&
			layerBeforeMoveCanvas
		) {
			const dx = x - selectionMoveStartX;
			const dy = y - selectionMoveStartY;

			const newRect = {
				x: selectionOriginalRect.x + dx,
				y: selectionOriginalRect.y + dy,
				w: selectionOriginalRect.w,
				h: selectionOriginalRect.h,
			};

			const ctx = getActiveCtx();
			if (!ctx) return;

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.drawImage(layerBeforeMoveCanvas, 0, 0);
			ctx.putImageData(selectionImageData, newRect.x, newRect.y);

			selectionRect = newRect;
			drawRectSelectionOverlay(selectionRect);
			return;
		}

		if (isSelectMode && isDrawingSelection && selectionRect) {
			selectionRect.w = x - selectionRect.x;
			selectionRect.h = y - selectionRect.y;
			drawRectSelectionOverlay(selectionRect);
			return;
		}

		if (currentRepairTool === "patch" && isPatchSelecting) {
			patchDraftPoints.push({ x, y });
			drawLassoPath(patchDraftPoints, 0, 0, false);
			return;
		}

		if (currentRepairTool === "patch" && isPatchMovingSelection && patchSelectionBasePoints) {
			const dx = x - patchSelectionMoveStartX;
			const dy = y - patchSelectionMoveStartY;
			patchSelectionPoints = patchSelectionBasePoints.map(p => ({
				x: p.x + dx,
				y: p.y + dy,
			}));
			drawLassoPath(patchSelectionPoints, 0, 0, true);
			return;
		}

		if (currentRepairTool === "patch" && isPatchRedirecting && patchSelectionPoints && patchDragStart) {
			const dx = x - patchDragStart.x;
			const dy = y - patchDragStart.y;
			const ctx = getActiveCtx();
			if (ctx && repairSourceImageData) {
				repairWorkingImageData = cloneImageData(repairSourceImageData);
				if (repairWorkingImageData) {
					applyPatchFromPolygon(
						repairWorkingImageData,
						repairSourceImageData,
						patchSelectionPoints,
						dx,
						dy,
					);
					ctx.putImageData(repairWorkingImageData, 0, 0);
				}
			}
			drawLassoPath(patchSelectionPoints, dx, dy, true);
			return;
		}

		if (isRepairPainting && currentRepairTool) {
			const ctx = getActiveCtx();
			if (!ctx || !repairWorkingImageData || !repairSourceImageData) return;
			const brush = getBrushSettings();

			const fromX = repairLastX ?? x;
			const fromY = repairLastY ?? y;
			paintRepairStroke(
				fromX,
				fromY,
				x,
				y,
				brush.size,
				brush.spacingPercent,
				(sx, sy) => {
					if (currentRepairTool === "spot") {
						applyHealingStamp(
							repairWorkingImageData,
							repairSourceImageData,
							sx,
							sy,
							sx + repairSourceOffsetX,
							sy + repairSourceOffsetY,
							brush.size,
							brush.hardness,
						);
						return;
					}
					if (currentRepairTool === "heal") {
						applySpotRepairStamp(
							repairWorkingImageData,
							repairSourceImageData,
							sx,
							sy,
							brush.size,
							brush.hardness,
						);
					}
				},
			);
			repairLastX = x;
			repairLastY = y;
			ctx.putImageData(repairWorkingImageData, 0, 0);
			return;
		}

		if (isMoveMode && isDragging) {
			if (isActiveLayerLocked()) return;

			const dx = e.clientX - offsetX;
			const dy = e.clientY - offsetY;
			offsetX = e.clientX;
			offsetY = e.clientY;
			const activeLayer = layers[activeLayerIndex];
			if (activeLayer && typeof applyLayerCanvasVisualState === "function") {
				const zoomScale = Number(viewScale) || 1;
				const displayScaleX =
					canvas?.width > 0 ? (parseFloat(canvas.style.width) || canvas.width) / canvas.width : 1;
				const displayScaleY =
					canvas?.height > 0
						? (parseFloat(canvas.style.height) || canvas.height) / canvas.height
						: 1;
				activeLayer.offsetX =
					Number(activeLayer.offsetX || 0) + dx / (zoomScale * displayScaleX);
				activeLayer.offsetY =
					Number(activeLayer.offsetY || 0) + dy / (zoomScale * displayScaleY);
				applyLayerCanvasVisualState(activeLayer);
				updateLayerList();
				return;
			}
		}

		if (!drawing || selectedShape !== null || isActiveLayerLocked()) return;

		const ctx = getActiveCtx();
		if (!ctx) return;

		if (!drawingStarted) {
			saveState();
			drawingStarted = true;
		}

		const brushSettings = getBrushSettings();
		let targetX = x;
		let targetY = y;

		if (brushSettings.smoothing) {
			const alpha = 0.35;
			if (brushSmoothX === null || brushSmoothY === null) {
				brushSmoothX = brushLastX ?? x;
				brushSmoothY = brushLastY ?? y;
			}
			brushSmoothX += (x - brushSmoothX) * alpha;
			brushSmoothY += (y - brushSmoothY) * alpha;
			targetX = brushSmoothX;
			targetY = brushSmoothY;
		} else {
			brushSmoothX = x;
			brushSmoothY = y;
		}

		const fromX = brushLastX ?? targetX;
		const fromY = brushLastY ?? targetY;
		withActiveSelectionClip(ctx, () =>
			paintBrushStroke(ctx, fromX, fromY, targetX, targetY, brushSettings),
		);
		brushLastX = targetX;
		brushLastY = targetY;
	};

	wrapper.addEventListener("mousedown", handleWorkspacePointerDown);
	wrapper.addEventListener("mouseup", handleWorkspacePointerUp);
	wrapper.addEventListener("mousemove", handleWorkspacePointerMove);

	wrapper.addEventListener(
		"touchstart",
		e => {
			const touchLike = toTouchLikeMouseEvent(e);
			if (!touchLike) return;
			handleWorkspacePointerDown(touchLike);
		},
		{ passive: false },
	);

	wrapper.addEventListener(
		"touchmove",
		e => {
			const touchLike = toTouchLikeMouseEvent(e);
			if (!touchLike) return;
			handleWorkspacePointerMove(touchLike);
		},
		{ passive: false },
	);

	wrapper.addEventListener(
		"touchend",
		e => {
			const touchLike = toTouchLikeMouseEvent(e);
			if (!touchLike) return;
			handleWorkspacePointerUp(touchLike);
		},
		{ passive: false },
	);

	wrapper.addEventListener(
		"touchcancel",
		e => {
			const touchLike = toTouchLikeMouseEvent(e);
			if (!touchLike) return;
			handleWorkspacePointerUp(touchLike);
		},
		{ passive: false },
	);

	wrapper.addEventListener(
		"wheel",
		e => {
			if (!currentRepairTool) return;
			e.preventDefault();
			const currentSize = Number(brushSizeControl?.value || toolbarBrushSize?.value || 8);
			const step = e.ctrlKey ? 4 : 1;
			const delta = e.deltaY < 0 ? step : -step;
			setBrushSize(Math.max(1, Math.min(160, currentSize + delta)));
		},
		{ passive: false },
	);

	// START â€“ pokaĹĽ modal wymiarĂłw
	setGridVisible(false);
	setRulerVisible(false);
	updateBrushLabels();
	drawBrushPreview();
	modal.style.display = "flex";
	positionToolbarToggle();
