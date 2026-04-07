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
						: "Nie udało się wygenerować presetu LUT 3D.";
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
					alert("Nie udało się wczytać LUT 3D. Obsługiwany format: .cube (LUT_3D_SIZE).");
					adjustLut3DFileInput.value = "";
					return;
				}
				const key = `lut3d:${Date.now()}:${file.name}`;
				lut3DStore.set(key, lut);
				ensureLut3DOption(key, file.name);
				if (adjustLut3DSelect) adjustLut3DSelect.value = key;
				lastLut3DKey = key;
				if (adjustLut3DInfo) {
					adjustLut3DInfo.textContent = `Załadowano LUT 3D: ${file.name}`;
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

	// GLOBALNE SKRÓTY: Cofnij / Ponów
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
				// Zachowaj cały obraz; fragmenty poza workspace są tylko ukryte przez maskę wrappera.
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

	// ===== NARZĘDZIA PASKA =====

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

	// kliknięcie narzędzia TEKST
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

	// ===== ZDARZENIA WSKAŹNIKA NA OBSZARZE (MYSZ + DOTYK) =====

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
		// kliknięcie w textarea – nie dotykamy logiki rysowania
		function isEventOnTextOverlay(e) {
			if (!textOverlay) return false;
			// Sprawdź czy event pochodzi z textarea lub jej rodzica .text-overlay
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

		// TEKST – najpierw próba edycji istniejącego
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
				// EDYCJA ISTNIEJĄCEGO TEKSTU
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
		// nie reagujemy, jeśli puszczamy przycisk na textarea
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
		// ruch myszy nad textarea – ignorujemy
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
					if (currentRepairTool === "heal") {
						applySpotRepairStamp(
							repairWorkingImageData,
							repairSourceImageData,
							sx,
							sy,
							brush.size,
							brush.hardness,
						);
						return;
					}
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

	// START – pokaż modal wymiarów
	setGridVisible(false);
	setRulerVisible(false);
	updateBrushLabels();
	drawBrushPreview();
	modal.style.display = "flex";
	positionToolbarToggle();
