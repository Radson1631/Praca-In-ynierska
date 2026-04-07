window.createAdjustmentsController = function (opts = {}) {
	const {
		adjustPanel,
		adjustPanelCloseBtn,
		adjustButtons,
		adjustValueInput,
		adjustValueLabel,
		adjustValueText,
		adjustControlRow2,
		adjustValueInput2,
		adjustValueLabel2,
		adjustValueText2,
		adjustCurvesWrap,
		adjustCurvesCanvas,
		adjustCurvesResetBtn,
		adjustExposureWrap,
		adjustExposureInput,
		adjustExposureText,
		adjustOffsetInput,
		adjustOffsetText,
		adjustGammaInput,
		adjustGammaText,
		adjustApplyBtn,
		adjustCancelBtn,
		getActiveCtx,
		isActiveLayerLocked,
		saveState,
	} = opts;

	let currentAdjustType = "brightnessContrast";
	let adjustSourceImageData = null;
	let curvePoints = [
		{ x: 0, y: 0, fixed: true },
		{ x: 128, y: 128, fixed: false },
		{ x: 255, y: 255, fixed: true },
	];
	let activeCurvePointIndex = -1;
	let isDraggingCurvePoint = false;

	function clamp255(v) {
		return Math.max(0, Math.min(255, v));
	}

	function clamp01(v) {
		return Math.max(0, Math.min(1, v));
	}

	function formatWithComma(v, decimals) {
		return Number(v).toFixed(decimals).replace(".", ",");
	}

	function getAdjustConfig(type) {
		switch (type) {
			case "curves":
				return { label: "Krzywe", min: 0, max: 0, value: 0, unit: "" };
			case "brightnessContrast":
				return {
					label: "Jasnosc",
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
			case "saturation":
				return {
					label: "Jaskrawosc",
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
				return {
					label: "Ekspozycja",
					min: -500,
					max: 500,
					value: 0,
					unit: " EV/100",
				};
			case "threshold":
				return { label: "Prog", min: 0, max: 255, value: 128, unit: "" };
			case "invert":
				return { label: "Negatyw", min: 0, max: 100, value: 100, unit: "%" };
			case "grayscale":
				return {
					label: "Skala szarosci",
					min: 0,
					max: 100,
					value: 100,
					unit: "%",
				};
			case "sepia":
				return { label: "Sepia", min: 0, max: 100, value: 100, unit: "%" };
			default:
				return {
					label: "Jasnosc",
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
		}
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

	function resetCurvePoints() {
		curvePoints = [
			{ x: 0, y: 0, fixed: true },
			{ x: 128, y: 128, fixed: false },
			{ x: 255, y: 255, fixed: true },
		];
	}

	function sortCurvePoints() {
		curvePoints.sort((a, b) => a.x - b.x);
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
		const px =
			((e.clientX - rect.left) * adjustCurvesCanvas.width) / rect.width;
		const py =
			((e.clientY - rect.top) * adjustCurvesCanvas.height) / rect.height;
		return {
			px: Math.max(0, Math.min(adjustCurvesCanvas.width, px)),
			py: Math.max(0, Math.min(adjustCurvesCanvas.height, py)),
		};
	}

	function findCurvePointAt(px, py, radius = 7) {
		let idx = -1;
		let minDist = Number.POSITIVE_INFINITY;
		for (let i = 0; i < curvePoints.length; i++) {
			const p = curvePoints[i];
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
			lut[x] = clamp255(Math.round(a.y + (b.y - a.y) * t));
		}
		return lut;
	}

	function drawCurvesEditor() {
		if (!adjustCurvesCanvas) return;
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
		ctx.strokeStyle = "#f3f4f7";
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(
			toCurveCanvasX(curvePoints[0].x),
			toCurveCanvasY(curvePoints[0].y),
		);
		for (let i = 1; i < curvePoints.length; i++) {
			ctx.lineTo(
				toCurveCanvasX(curvePoints[i].x),
				toCurveCanvasY(curvePoints[i].y),
			);
		}
		ctx.stroke();

		for (let i = 0; i < curvePoints.length; i++) {
			const p = curvePoints[i];
			const cx = toCurveCanvasX(p.x);
			const cy = toCurveCanvasY(p.y);
			ctx.beginPath();
			ctx.fillStyle = i === activeCurvePointIndex ? "#a64ca6" : "#f3f4f7";
			ctx.strokeStyle = "#16171b";
			ctx.lineWidth = 1;
			ctx.arc(cx, cy, 4.2, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
		}
	}

	function applyAdjustmentToImageData(
		source,
		type,
		value,
		value2 = 0,
		value3 = 100,
	) {
		const result = new ImageData(
			new Uint8ClampedArray(source.data),
			source.width,
			source.height,
		);
		const d = result.data;
		const curvesLut = type === "curves" ? buildCurvesLut(curvePoints) : null;

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
				let [h, s, l] = rgbToHsl(r, g, b);
				const hueShift = Math.max(-180, Math.min(180, value));
				const satAdjust = Math.max(-100, Math.min(100, value2)) / 100;
				const lightAdjust = Math.max(-100, Math.min(100, value3)) / 100;

				h = (h + hueShift / 360) % 1;
				if (h < 0) h += 1;

				if (Math.abs(hueShift) > 0.001 && s < 0.02 && satAdjust >= 0) {
					s = 0.12;
				}
				if (satAdjust >= 0) {
					s = clamp01(s + satAdjust * (1 - s));
				} else {
					s = clamp01(s * (1 + satAdjust));
				}
				l = clamp01(l + lightAdjust);
				[r, g, b] = hslToRgb(h, s, l);
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
			} else if (type === "grayscale") {
				const a = Math.max(0, Math.min(100, value)) / 100;
				const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				r = clamp255(r * (1 - a) + gray * a);
				g = clamp255(g * (1 - a) + gray * a);
				b = clamp255(b * (1 - a) + gray * a);
			} else if (type === "sepia") {
				const a = Math.max(0, Math.min(100, value)) / 100;
				const sr = clamp255(0.393 * r + 0.769 * g + 0.189 * b);
				const sg = clamp255(0.349 * r + 0.686 * g + 0.168 * b);
				const sb = clamp255(0.272 * r + 0.534 * g + 0.131 * b);
				r = clamp255(r * (1 - a) + sr * a);
				g = clamp255(g * (1 - a) + sg * a);
				b = clamp255(b * (1 - a) + sb * a);
			} else if (type === "curves") {
				r = curvesLut[r];
				g = curvesLut[g];
				b = curvesLut[b];
			}

			d[i] = clamp255(r);
			d[i + 1] = clamp255(g);
			d[i + 2] = clamp255(b);
		}

		return result;
	}

	function beginAdjustSession() {
		if (typeof isActiveLayerLocked === "function" && isActiveLayerLocked()) {
			alert("Aktywna warstwa jest zablokowana.");
			return false;
		}
		const ctx = typeof getActiveCtx === "function" ? getActiveCtx() : null;
		if (!ctx) return false;
		adjustSourceImageData = ctx.getImageData(
			0,
			0,
			ctx.canvas.width,
			ctx.canvas.height,
		);
		return true;
	}

	function renderAdjustPreview() {
		if (!adjustSourceImageData || !adjustValueInput) return;
		const ctx = typeof getActiveCtx === "function" ? getActiveCtx() : null;
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

		const value = parseFloat(adjustValueInput.value || 0);
		const value2 = parseFloat(adjustValueInput2?.value || 0);
		const cfg = getAdjustConfig(currentAdjustType);
		if (adjustValueText)
			adjustValueText.textContent = `${Math.round(value)}${cfg.unit}`;
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

	function setAdjustType(type) {
		currentAdjustType = type || "brightnessContrast";
		adjustButtons?.forEach(btn =>
			btn.classList.toggle("active", btn.dataset.adjust === currentAdjustType),
		);

		const cfg = getAdjustConfig(currentAdjustType);
		if (adjustValueLabel) adjustValueLabel.textContent = cfg.label;
		if (adjustValueInput) {
			adjustValueInput.min = cfg.min;
			adjustValueInput.max = cfg.max;
			adjustValueInput.value = cfg.value;
		}
		if (adjustValueText)
			adjustValueText.textContent = `${cfg.value}${cfg.unit}`;

		const isCurves = currentAdjustType === "curves";
		const isExposure = currentAdjustType === "exposure";
		const firstControlRow = adjustValueInput?.closest(".adjust-control-row");
		if (firstControlRow) {
			firstControlRow.classList.toggle("hidden", isCurves || isExposure);
		}
		if (adjustControlRow2) {
			adjustControlRow2.classList.toggle(
				"hidden",
				!cfg.second || isCurves || isExposure,
			);
		}
		if (adjustCurvesWrap)
			adjustCurvesWrap.classList.toggle("hidden", !isCurves);
		if (adjustExposureWrap) {
			adjustExposureWrap.classList.toggle("hidden", !isExposure);
		}

		if (cfg.second) {
			if (adjustValueLabel2) adjustValueLabel2.textContent = cfg.second.label;
			if (adjustValueInput2) {
				adjustValueInput2.min = cfg.second.min;
				adjustValueInput2.max = cfg.second.max;
				adjustValueInput2.value = cfg.second.value;
			}
			if (adjustValueText2)
				adjustValueText2.textContent = `${cfg.second.value}${cfg.second.unit}`;
		}

		if (isCurves) drawCurvesEditor();
		if (!beginAdjustSession()) return;
		renderAdjustPreview();
	}

	function showAdjustPanel() {
		if (!adjustPanel) return;
		adjustPanel.classList.remove("hidden");
		setAdjustType(currentAdjustType);
	}

	function hideAdjustPanel() {
		if (!adjustPanel) return;
		adjustPanel.classList.add("hidden");
		adjustSourceImageData = null;
	}

	function cancelAdjustments() {
		if (adjustSourceImageData) {
			const ctx = typeof getActiveCtx === "function" ? getActiveCtx() : null;
			if (ctx) ctx.putImageData(adjustSourceImageData, 0, 0);
		}
		adjustSourceImageData = null;
	}

	function applyAdjustments() {
		if (!adjustSourceImageData) return;
		const ctx = typeof getActiveCtx === "function" ? getActiveCtx() : null;
		if (!ctx) return;
		const before = adjustSourceImageData;
		const after = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		// Podglad byl rysowany na aktywnej warstwie, wiec najpierw przywroc oryginal.
		ctx.putImageData(before, 0, 0);

		const adjustLayerNames = {
			brightnessContrast: "Jasnosc + Kontrast",
			saturation: "Jaskrawosc i nasycenie",
			hue: "Barwa",
			exposure: "Ekspozycja",
			threshold: "Prog",
			invert: "Negatyw",
			grayscale: "Skala szarosci",
			sepia: "Sepia",
			curves: "Krzywe",
		};
		const baseName = adjustLayerNames[currentAdjustType] || "Korekta";
		const sameTypeLayers =
			typeof layers !== "undefined"
				? layers.filter(l => {
						const name = (l?.name || "").trim();
						return name === baseName || name.startsWith(`${baseName} `);
					}).length
				: 0;
		const layerName =
			sameTypeLayers > 0 ? `${baseName} ${sameTypeLayers + 1}` : baseName;
		const newLayer =
			typeof createLayer === "function"
				? createLayer(layerName, "image")
				: null;

		if (!newLayer?.ctx) {
			if (typeof saveState === "function") saveState();
			ctx.putImageData(after, 0, 0);
			adjustSourceImageData = ctx.getImageData(
				0,
				0,
				ctx.canvas.width,
				ctx.canvas.height,
			);
			return;
		}

		if (typeof saveState === "function") saveState();
		newLayer.ctx.clearRect(
			0,
			0,
			newLayer.ctx.canvas.width,
			newLayer.ctx.canvas.height,
		);
		newLayer.ctx.putImageData(after, 0, 0);
		if (typeof updateLayerList === "function") updateLayerList();
		adjustSourceImageData = newLayer.ctx.getImageData(
			0,
			0,
			newLayer.ctx.canvas.width,
			newLayer.ctx.canvas.height,
		);
	}

	adjustPanelCloseBtn?.addEventListener("click", () => {
		cancelAdjustments();
		hideAdjustPanel();
	});

	adjustButtons?.forEach(btn => {
		btn.addEventListener("click", () => {
			setAdjustType(btn.dataset.adjust);
		});
	});

	adjustValueInput?.addEventListener("input", () => renderAdjustPreview());
	adjustValueInput2?.addEventListener("input", () => renderAdjustPreview());
	adjustExposureInput?.addEventListener("input", () => renderAdjustPreview());
	adjustOffsetInput?.addEventListener("input", () => renderAdjustPreview());
	adjustGammaInput?.addEventListener("input", () => renderAdjustPreview());

	adjustCurvesResetBtn?.addEventListener("click", () => {
		resetCurvePoints();
		activeCurvePointIndex = -1;
		drawCurvesEditor();
		renderAdjustPreview();
	});

	const handleCurvesPointerDown = e => {
		if (currentAdjustType !== "curves") return;
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
			curvePoints.push(np);
			sortCurvePoints();
			activeCurvePointIndex = curvePoints.indexOf(np);
			if (curvePoints.length > 12) {
				curvePoints.splice(1, curvePoints.length - 3);
			}
		}
		isDraggingCurvePoint = true;
		drawCurvesEditor();
		renderAdjustPreview();
		e.preventDefault();
	};

	adjustCurvesCanvas?.addEventListener("mousedown", handleCurvesPointerDown);
	adjustCurvesCanvas?.addEventListener(
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

	adjustCurvesCanvas?.addEventListener("dblclick", e => {
		if (currentAdjustType !== "curves") return;
		const pt = getCurveCanvasPointFromEvent(e);
		if (!pt) return;
		const hit = findCurvePointAt(pt.px, pt.py);
		if (hit > 0 && hit < curvePoints.length - 1) {
			curvePoints.splice(hit, 1);
			activeCurvePointIndex = -1;
			drawCurvesEditor();
			renderAdjustPreview();
		}
	});

	const handleCurvesPointerMove = e => {
		if (!isDraggingCurvePoint || currentAdjustType !== "curves") return;
		const pt = getCurveCanvasPointFromEvent(e);
		if (!pt || activeCurvePointIndex < 0 || !curvePoints[activeCurvePointIndex])
			return;

		const p = curvePoints[activeCurvePointIndex];
		p.y = Math.round(fromCurveCanvasY(pt.py));
		if (!p.fixed) {
			const prev = curvePoints[activeCurvePointIndex - 1];
			const next = curvePoints[activeCurvePointIndex + 1];
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

	adjustCancelBtn?.addEventListener("click", () => {
		cancelAdjustments();
		hideAdjustPanel();
	});

	adjustApplyBtn?.addEventListener("click", () => {
		applyAdjustments();
		hideAdjustPanel();
	});

	return {
		showAdjustPanel,
		hideAdjustPanel,
		cancelAdjustments,
		applyAdjustments,
		setAdjustType,
		renderAdjustPreview,
	};
};
