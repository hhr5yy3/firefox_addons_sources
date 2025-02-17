// smoothscroll - custom adjusted for the need of LanguageTool
(function () {
	"use strict";

	/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

	var __assign = function () {
		__assign =
			Object.assign ||
			function __assign(t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};

	function __values(o) {
		var s = typeof Symbol === "function" && Symbol.iterator,
			m = s && o[s],
			i = 0;
		if (m) return m.call(o);
		if (o && typeof o.length === "number")
			return {
				next: function () {
					if (o && i >= o.length) o = void 0;
					return { value: o && o[i++], done: !o };
				},
			};
		throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}
	var ease = function (k) {
		return 0.5 * (1 - Math.cos(Math.PI * k));
	};
	var DURATION = 500;
	var now = function () {
		return Date.now();
	};
	var step = function (context) {
		var currentTime = now();
		var elapsed = (currentTime - context.timeStamp) / (context.duration || DURATION);
		if (elapsed > 1) {
			context.method(context.targetX, context.targetY);
			context.callback();
			return;
		}

		var value = (context.timingFunc || ease)(elapsed);
		var currentX = context.startX + (context.targetX - context.startX) * value;
		var currentY = context.startY + (context.targetY - context.startY) * value;
		context.method(currentX, currentY);
		context.rafId = requestAnimationFrame(function () {
			step(context);
		});
	};

	var $original;
	var getOriginalFunc = function () {
		if ($original === undefined) {
			$original =
				Element.prototype.scroll ||
				Element.prototype.scrollTo ||
				function (x, y) {
					this.scrollLeft = x;
					this.scrollTop = y;
				};
		}
		return $original;
	};
	var elementScroll = function (element, options, callback) {
		var originalBoundFunc = getOriginalFunc().bind(element);
		if (options.left === undefined && options.top === undefined) {
			return;
		}
		var startX = element.scrollLeft;
		var startY = element.scrollTop;
		var _a = options.left,
			targetX = _a === void 0 ? startX : _a,
			_b = options.top,
			targetY = _b === void 0 ? startY : _b;
		if (options.behavior !== "smooth") {
			return originalBoundFunc(targetX, targetY);
		}

		var originalScrollBehavior = element.style.scrollBehavior;
		element.style.scrollBehavior = "auto";

		var clear = function () {
			window.removeEventListener("wheel", cancelScroll);
			window.removeEventListener("touchmove", cancelScroll);
			element.style.scrollBehavior = originalScrollBehavior;
		};
		var context = {
			timeStamp: now(),
			duration: options.duration,
			startX: startX,
			startY: startY,
			targetX: targetX,
			targetY: targetY,
			rafId: 0,
			method: originalBoundFunc,
			timingFunc: options.timingFunc,
			callback: function () {
				clear();
				if (callback) {
					callback();
				}
			},
		};
		var cancelScroll = function () {
			cancelAnimationFrame(context.rafId);
			clear();
		};

		window.addEventListener("wheel", cancelScroll, {
			passive: true,
			once: true,
		});
		window.addEventListener("touchmove", cancelScroll, {
			passive: true,
			once: true,
		});
		step(context);
	};

	// https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/dom/element.cc?l=647-681&rcl=02a6466f4efa021e4e198f373eccda3cfc56142b
	var toPhysicalAlignment = function (options, axis, isHorizontalWritingMode, isFlippedBlocksMode) {
		var alignment =
			(axis === 0 /* HorizontalScroll */ && isHorizontalWritingMode) ||
			(axis === 1 /* VerticalScroll */ && !isHorizontalWritingMode)
				? options.inline
				: options.block;
		if (alignment === "center") {
			return 1 /* AlignCenterAlways */;
		}
		if (alignment === "nearest") {
			return 0 /* AlignToEdgeIfNeeded */;
		}
		if (alignment === "start") {
			return axis === 0 /* HorizontalScroll */
				? isFlippedBlocksMode
					? 5 /* AlignRightAlways */
					: 4 /* AlignLeftAlways */
				: 2 /* AlignTopAlways */;
		}
		if (alignment === "end") {
			return axis === 0 /* HorizontalScroll */
				? isFlippedBlocksMode
					? 4 /* AlignLeftAlways */
					: 5 /* AlignRightAlways */
				: 3 /* AlignBottomAlways */;
		}
		// Default values
		if (isHorizontalWritingMode) {
			return axis === 0 /* HorizontalScroll */ ? 0 /* AlignToEdgeIfNeeded */ : 2 /* AlignTopAlways */;
		}
		return axis === 0 /* HorizontalScroll */ ? 4 /* AlignLeftAlways */ : 0 /* AlignToEdgeIfNeeded */;
	};
	// code from stipsan/compute-scroll-into-view
	// https://github.com/stipsan/compute-scroll-into-view/blob/5396c6b78af5d0bbce11a7c4e93cc3146546fcd3/src/index.ts
	/**
	 * Find out which edge to align against when logical scroll position is "nearest"
	 * Interesting fact: "nearest" works similarily to "if-needed", if the element is fully visible it will not scroll it
	 *
	 * Legends:
	 * ┌────────┐ ┏ ━ ━ ━ ┓
	 * │ target │   frame
	 * └────────┘ ┗ ━ ━ ━ ┛
	 */
	function alignNearest(
		scrollingEdgeStart,
		scrollingEdgeEnd,
		scrollingSize,
		scrollingBorderStart,
		scrollingBorderEnd,
		elementEdgeStart,
		elementEdgeEnd,
		elementSize
	) {
		/**
		 * If element edge A and element edge B are both outside scrolling box edge A and scrolling box edge B
		 *
		 *          ┌──┐
		 *        ┏━│━━│━┓
		 *          │  │
		 *        ┃ │  │ ┃        do nothing
		 *          │  │
		 *        ┗━│━━│━┛
		 *          └──┘
		 *
		 *  If element edge C and element edge D are both outside scrolling box edge C and scrolling box edge D
		 *
		 *    ┏ ━ ━ ━ ━ ┓
		 *   ┌───────────┐
		 *   │┃         ┃│        do nothing
		 *   └───────────┘
		 *    ┗ ━ ━ ━ ━ ┛
		 */
		if (
			(elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd) ||
			(elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd)
		) {
			return 0;
		}
		/**
		 * If element edge A is outside scrolling box edge A and element height is less than scrolling box height
		 *
		 *          ┌──┐
		 *        ┏━│━━│━┓         ┏━┌━━┐━┓
		 *          └──┘             │  │
		 *  from  ┃      ┃     to  ┃ └──┘ ┃
		 *
		 *        ┗━ ━━ ━┛         ┗━ ━━ ━┛
		 *
		 * If element edge B is outside scrolling box edge B and element height is greater than scrolling box height
		 *
		 *        ┏━ ━━ ━┓         ┏━┌━━┐━┓
		 *                           │  │
		 *  from  ┃ ┌──┐ ┃     to  ┃ │  │ ┃
		 *          │  │             │  │
		 *        ┗━│━━│━┛         ┗━│━━│━┛
		 *          │  │             └──┘
		 *          │  │
		 *          └──┘
		 *
		 * If element edge C is outside scrolling box edge C and element width is less than scrolling box width
		 *
		 *       from                 to
		 *    ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
		 *  ┌───┐                 ┌───┐
		 *  │ ┃ │       ┃         ┃   │     ┃
		 *  └───┘                 └───┘
		 *    ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
		 *
		 * If element edge D is outside scrolling box edge D and element width is greater than scrolling box width
		 *
		 *       from                 to
		 *    ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
		 *        ┌───────────┐   ┌───────────┐
		 *    ┃   │     ┃     │   ┃         ┃ │
		 *        └───────────┘   └───────────┘
		 *    ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
		 */
		if (
			(elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize) ||
			(elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize)
		) {
			return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
		}
		/**
		 * If element edge B is outside scrolling box edge B and element height is less than scrolling box height
		 *
		 *        ┏━ ━━ ━┓         ┏━ ━━ ━┓
		 *
		 *  from  ┃      ┃     to  ┃ ┌──┐ ┃
		 *          ┌──┐             │  │
		 *        ┗━│━━│━┛         ┗━└━━┘━┛
		 *          └──┘
		 *
		 * If element edge A is outside scrolling box edge A and element height is greater than scrolling box height
		 *
		 *          ┌──┐
		 *          │  │
		 *          │  │             ┌──┐
		 *        ┏━│━━│━┓         ┏━│━━│━┓
		 *          │  │             │  │
		 *  from  ┃ └──┘ ┃     to  ┃ │  │ ┃
		 *                           │  │
		 *        ┗━ ━━ ━┛         ┗━└━━┘━┛
		 *
		 * If element edge C is outside scrolling box edge C and element width is greater than scrolling box width
		 *
		 *           from                 to
		 *        ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
		 *  ┌───────────┐           ┌───────────┐
		 *  │     ┃     │   ┃       │ ┃         ┃
		 *  └───────────┘           └───────────┘
		 *        ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
		 *
		 * If element edge D is outside scrolling box edge D and element width is less than scrolling box width
		 *
		 *           from                 to
		 *        ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
		 *                ┌───┐             ┌───┐
		 *        ┃       │ ┃ │       ┃     │   ┃
		 *                └───┘             └───┘
		 *        ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
		 *
		 */
		if (
			(elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize) ||
			(elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize)
		) {
			return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
		}
		return 0;
	}
	var canOverflow = function (overflow) {
		return overflow !== "visible" && overflow !== "clip";
	};
	var isScrollable = function (element) {
		if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
			var style = getComputedStyle(element);
			return canOverflow(style.overflowY) || canOverflow(style.overflowX);
		}
		return false;
	};
	var parentElement = function (element) {
		var parentNode = element.parentNode;
		return parentNode && (parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parentNode.host : parentNode);
	};
	var getIframeParent = function (element) {
		return Array.from(window.top.document.querySelectorAll("iframe, frame")).find(
			(iframe) => iframe.contentDocument === element.ownerDocument
		);
	};
	var isInView = function (range) {
		try {
			const targetElement =
				range.startContainer.nodeType === Node.TEXT_NODE
					? range.startContainer.parentElement
					: range.startContainer;

			const iframeElement = getIframeParent(targetElement);
			if (!iframeElement) {
				return false;
			}

			const width = window.top.innerWidth || window.top.document.documentElement.clientWidth;
			const height = window.top.innerHeight || window.top.document.documentElement.clientHeight;
			const iframeRect = iframeElement.getBoundingClientRect();
			const rangeRect = range.getBoundingClientRect();
			const left = iframeRect.left + rangeRect.left;
			const top = iframeRect.top + rangeRect.top;
			const right = iframeRect.left + rangeRect.left + rangeRect.width;
			const bottom = iframeRect.top + rangeRect.top + rangeRect.height;
			return top >= 0 && bottom <= height && left >= 0 && right <= width;
		} catch (e) {
			return false;
		}
	};

	var scrollRangeIntoView = function (range, options, callback) {
		var e_1, _a;
		// On Chrome and Firefox, document.scrollingElement will return the <html> element.
		// Safari, document.scrollingElement will return the <body> element.
		// On Edge, document.scrollingElement will return the <body> element.
		// IE11 does not support document.scrollingElement, but you can assume its <html>.
		// Used to handle the top most element that can be scrolled
		var scrollingElement = document.scrollingElement || document.documentElement;
		// Collect all the scrolling boxes, as defined in the spec: https://drafts.csswg.org/cssom-view/#scrolling-box
		var frames = [];
		var element = range.startContainer;
		for (var cursor = parentElement(element); cursor !== null; cursor = parentElement(cursor)) {
			// Stop when we reach the viewport
			if (cursor === scrollingElement) {
				frames.push(cursor);
				break;
			}
			// Skip document.body if it's not the scrollingElement and documentElement isn't independently scrollable
			if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
				continue;
			}
			// Now we check if the element is scrollable,
			// this code only runs if the loop haven't already hit the viewport or a custom boundary
			if (isScrollable(cursor)) {
				frames.push(cursor);
			}
		}
		// Support pinch-zooming properly, making sure elements scroll into the visual viewport
		// Browsers that don't support visualViewport
		// will report the layout viewport dimensions on document.documentElement.clientWidth/Height
		// and viewport dimensions on window.innerWidth/Height
		// https://www.quirksmode.org/mobile/viewports2.html
		// https://bokand.github.io/viewport/index.html
		var viewportWidth = window.visualViewport ? window.visualViewport.width : innerWidth;
		var viewportHeight = window.visualViewport ? window.visualViewport.height : innerHeight;
		// Newer browsers supports scroll[X|Y], page[X|Y]Offset is
		var viewportX = window.scrollX || window.pageXOffset;
		var viewportY = window.scrollY || window.pageYOffset;
		var _b = range.getBoundingClientRect(),
			targetHeight = _b.height,
			targetWidth = _b.width,
			targetTop = _b.top,
			targetRight = _b.right,
			targetBottom = _b.bottom,
			targetLeft = _b.left;
		var computedStyle = getComputedStyle(element instanceof HTMLElement ? element : element.parentNode);
		var writingMode =
			computedStyle.writingMode ||
			computedStyle.webkitWritingMode ||
			computedStyle.getPropertyValue("-ms-writing-mode") ||
			"horizontal-tb";
		var isHorizontalWritingMode = ["horizontal-tb", "lr", "lr-tb", "rl"].some(function (mode) {
			return mode === writingMode;
		});
		var isFlippedBlocksWritingMode = ["vertical-rl", "tb-rl"].some(function (mode) {
			return mode === writingMode;
		});
		var alignX = toPhysicalAlignment(
			options,
			0 /* HorizontalScroll */,
			isHorizontalWritingMode,
			isFlippedBlocksWritingMode
		);
		var alignY = toPhysicalAlignment(
			options,
			1 /* VerticalScroll */,
			isHorizontalWritingMode,
			isFlippedBlocksWritingMode
		);
		var targetBlock = (function () {
			switch (alignY) {
				case 2 /* AlignTopAlways */:
				case 0 /* AlignToEdgeIfNeeded */:
					return targetTop;
				case 3 /* AlignBottomAlways */:
					return targetBottom;
				// case ScrollAlignment.AlignCenterAlways:
				default:
					return targetTop + targetHeight / 2;
			}
		})();
		var targetInline = (function () {
			switch (alignX) {
				case 1 /* AlignCenterAlways */:
					return targetLeft + targetWidth / 2;
				case 5 /* AlignRightAlways */:
					return targetRight;
				// case ScrollAlignment.AlignLeftAlways:
				// case ScrollAlignment.AlignToEdgeIfNeeded:
				default:
					return targetLeft;
			}
		})();
		var actions = [];
		var _loop_1 = function (frame) {
			var _a = frame.getBoundingClientRect(),
				height = _a.height,
				width = _a.width,
				top_1 = _a.top,
				right = _a.right,
				bottom = _a.bottom,
				left = _a.left;
			var frameStyle = getComputedStyle(frame);
			var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
			var borderTop = parseInt(frameStyle.borderTopWidth, 10);
			var borderRight = parseInt(frameStyle.borderRightWidth, 10);
			var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
			var blockScroll = 0;
			var inlineScroll = 0;
			// The property existance checks for offfset[Width|Height] is because only HTMLElement objects have them,
			// but any Element might pass by here
			// @TODO find out if the "as HTMLElement" overrides can be dropped
			var scrollbarWidth =
				"offsetWidth" in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
			var scrollbarHeight =
				"offsetHeight" in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;
			if (scrollingElement === frame) {
				// Handle viewport logic (document.documentElement or document.body)
				switch (alignY) {
					case 2 /* AlignTopAlways */: {
						blockScroll = targetBlock;
						break;
					}
					case 3 /* AlignBottomAlways */: {
						blockScroll = targetBlock - viewportHeight;
						break;
					}
					case 1 /* AlignCenterAlways */: {
						blockScroll = targetBlock - viewportHeight / 2;
						break;
					}
					case 0 /* AlignToEdgeIfNeeded */: {
						blockScroll = alignNearest(
							viewportY,
							viewportY + viewportHeight,
							viewportHeight,
							borderTop,
							borderBottom,
							viewportY + targetBlock,
							viewportY + targetBlock + targetHeight,
							targetHeight
						);
						break;
					}
				}
				switch (alignX) {
					case 4 /* AlignLeftAlways */: {
						inlineScroll = targetInline;
						break;
					}
					case 5 /* AlignRightAlways */: {
						inlineScroll = targetInline - viewportWidth;
						break;
					}
					case 1 /* AlignCenterAlways */: {
						inlineScroll = targetInline - viewportWidth / 2;
						break;
					}
					case 0 /* AlignToEdgeIfNeeded */: {
						inlineScroll = alignNearest(
							viewportX,
							viewportX + viewportWidth,
							viewportWidth,
							borderLeft,
							borderRight,
							viewportX + targetInline,
							viewportX + targetInline + targetWidth,
							targetWidth
						);
						break;
					}
				}
				// Apply scroll position offsets and ensure they are within bounds
				blockScroll = Math.max(0, blockScroll + viewportY);
				inlineScroll = Math.max(0, inlineScroll + viewportX);
			} else {
				// Handle each scrolling frame that might exist between the target and the viewport
				switch (alignY) {
					case 2 /* AlignTopAlways */: {
						blockScroll = targetBlock - top_1 - borderTop;
						break;
					}
					case 3 /* AlignBottomAlways */: {
						blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
						break;
					}
					case 1 /* AlignCenterAlways */: {
						blockScroll = targetBlock - (top_1 + height / 2) + scrollbarHeight / 2;
						break;
					}
					case 0 /* AlignToEdgeIfNeeded */: {
						blockScroll = alignNearest(
							top_1,
							bottom,
							height,
							borderTop,
							borderBottom + scrollbarHeight,
							targetBlock,
							targetBlock + targetHeight,
							targetHeight
						);
						break;
					}
				}
				switch (alignX) {
					case 4 /* AlignLeftAlways */: {
						inlineScroll = targetInline - left - borderLeft;
						break;
					}
					case 5 /* AlignRightAlways */: {
						inlineScroll = targetInline - right + borderRight + scrollbarWidth;
						break;
					}
					case 1 /* AlignCenterAlways */: {
						inlineScroll = targetInline - (left + width / 2) + scrollbarWidth / 2;
						break;
					}
					case 0 /* AlignToEdgeIfNeeded */: {
						inlineScroll = alignNearest(
							left,
							right,
							width,
							borderLeft,
							borderRight + scrollbarWidth,
							targetInline,
							targetInline + targetWidth,
							targetWidth
						);
						break;
					}
				}
				var scrollLeft = frame.scrollLeft,
					scrollTop = frame.scrollTop;
				// Ensure scroll coordinates are not out of bounds while applying scroll offsets
				blockScroll = Math.max(
					0,
					Math.min(scrollTop + blockScroll, frame.scrollHeight - height + scrollbarHeight)
				);
				inlineScroll = Math.max(
					0,
					Math.min(scrollLeft + inlineScroll, frame.scrollWidth - width + scrollbarWidth)
				);
				// Cache the offset so that parent frames can scroll this into view correctly
				targetBlock += scrollTop - blockScroll;
				targetInline += scrollLeft - inlineScroll;
			}

			actions.push(function (callback) {
				return elementScroll(
					frame,
					__assign(__assign({}, options), { top: blockScroll, left: inlineScroll }),
					callback
				);
			});
		};
		try {
			for (
				var frames_1 = __values(frames), frames_1_1 = frames_1.next();
				!frames_1_1.done;
				frames_1_1 = frames_1.next()
			) {
				var frame = frames_1_1.value;
				_loop_1(frame);
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (frames_1_1 && !frames_1_1.done && (_a = frames_1.return)) _a.call(frames_1);
			} finally {
				if (e_1) throw e_1.error;
			}
		}

		const isInIframe = (function () {
			try {
				return window.self !== window.top;
			} catch (e) {
				return true;
			}
		})();

		let callbackLength = actions.length;
		actions.forEach(function (run) {
			return run(function () {
				if (--callbackLength === 0) {
					if (isInIframe) {
						setTimeout(() => {
							if (!isInView(range)) {
								const targetElement =
									range.startContainer.nodeType === Node.TEXT_NODE
										? range.startContainer.parentElement
										: range.startContainer;

								targetElement.scrollIntoView({ behavior: "auto" });
								setTimeout(callback, 0);
							} else {
								callback();
							}
						});
					} else {
						callback();
					}
				}
			});
		});
	};

	window.scrollRangeIntoView = scrollRangeIntoView;
})();
