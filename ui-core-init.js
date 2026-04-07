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

	// PANEL PĘDZLA
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



