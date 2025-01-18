(() => {
    var __webpack_modules__ = {
        901: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                ZP: () => __WEBPACK_DEFAULT_EXPORT__,
                cW: () => nodeExistsInAxeTree
            });
            function ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable;
                    }))), t.push.apply(t, o);
                }
                return t;
            }
            function _objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                        _defineProperty(e, r, t[r]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }));
                }
                return e;
            }
            function _defineProperty(e, r, t) {
                return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function _toPropertyKey(t) {
                var i = _toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function _toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            const trees = new Map;
            const resultHandler = results => 1 === results.length ? results[0] : results;
            const __WEBPACK_DEFAULT_EXPORT__ = {
                sanitize(str) {
                    const axe = getAxe();
                    return axe.commons.text.sanitize(str);
                },
                sanitizeContext,
                isValidLang(lang) {
                    const axe = getAxe();
                    if (!lang) return false;
                    return axe.utils.isValidLang(lang);
                },
                hasContent(node) {
                    const axe = getAxe(node);
                    const vnode = getVirtualNode(axe, node);
                    if (!vnode) return false;
                    return axe.commons.dom.hasContentVirtual(vnode);
                },
                getRequiredContext(role) {
                    const axe = getAxe();
                    if (!role) return [];
                    return axe.commons.aria.requiredContext(role);
                },
                isOffscreen(...nodes) {
                    return resultHandler(nodes.map(isOffscreen));
                },
                isHidden(...nodes) {
                    return resultHandler(nodes.map(isHidden));
                },
                isVisible(node, verifyTree = false) {
                    if (!node.ownerDocument.defaultView) return false;
                    return resultHandler(isVisible(node, verifyTree));
                },
                isSRVisible(...nodes) {
                    return resultHandler(nodes.map(isSRVisible));
                },
                name(...nodes) {
                    return resultHandler(nodes.map(accessibleTextVirtual));
                },
                isOpaque(...nodes) {
                    return resultHandler(nodes.map(isOpaque));
                },
                getRoleType(...nodes) {
                    return resultHandler(nodes.map(getRoleType));
                },
                getRole(...nodes) {
                    return resultHandler(nodes.map(getRole));
                },
                getContrast(...nodes) {
                    return resultHandler(nodes.map(getContrast));
                },
                runContrastAnalysis(nodes) {
                    return runContrastAnalysis(nodes);
                },
                isWidgetRole(role) {
                    const axe = getAxe();
                    return axe.commons.aria.lookupTable.rolesOfType.widget.includes(role);
                },
                isFocusable(...nodes) {
                    return resultHandler(nodes.map(isFocusable));
                },
                getTabbableElements(node) {
                    return getTabbableElements(node);
                },
                getFlattenedTree,
                getSource(element) {
                    const axe = getAxe();
                    return new axe.utils.DqElement(element).source;
                },
                getSelector(element) {
                    const axe = getAxe();
                    if (!axe._selectorData) axe._selectorData = axe.utils.getSelectorData(axe.utils.getFlattenedTree());
                    return axe.utils.getSelector(element);
                },
                getElementStack(element, rebuildTree = true) {
                    const axe = getAxe();
                    if (rebuildTree) {
                        axe.teardown();
                        axe.setup();
                    }
                    return axe.commons.dom.getElementStack(element);
                },
                idrefs(element, attr) {
                    const axe = getAxe(element);
                    return axe.commons.dom.idrefs(element, attr);
                },
                table: {
                    isRowHeader(element) {
                        const axe = getAxe(element);
                        return axe.commons.table.isRowHeader(element);
                    },
                    isColumnHeader(element) {
                        const axe = getAxe(element);
                        return axe.commons.table.isColumnHeader(element);
                    },
                    toGrid(element) {
                        const axe = getAxe(element);
                        axe.teardown();
                        axe.setup();
                        return axe.commons.table.toGrid(element);
                    },
                    isDataTable(element) {
                        const axe = getAxe(element);
                        return axe.commons.table.isDataTable(element);
                    },
                    getCellPosition(element, tableGrid) {
                        const axe = getAxe(element);
                        return axe.commons.table.getCellPosition(element, tableGrid);
                    },
                    traverse(direction, startPosition, tableGrid, callback) {
                        var _tableGrid$;
                        if (!(null !== (_tableGrid$ = tableGrid[0]) && void 0 !== _tableGrid$ && _tableGrid$[0])) return;
                        const axe = getAxe(tableGrid[0][0]);
                        return axe.commons.table.traverse(direction, startPosition, tableGrid, callback);
                    }
                },
                setupTrees,
                cleanupTrees,
                isAxeSetUp(element) {
                    const axe = getAxe(element);
                    return !!axe._tree;
                }
            };
            function getFlattenedTree(node) {
                const axe = getAxe();
                const tree = axe.utils.getFlattenedTree(node.ownerDocument);
                trees.set(axe, tree);
                return tree;
            }
            function sanitizeContext(ctx) {
                if (!ctx.ownerDocument || ctx.ownerDocument === document) return ctx;
                const axe = getAxe();
                axe._selectorData = axe.utils.getSelectorData(axe.utils.getFlattenedTree());
                const selector = [ axe.utils.getSelector(ctx) ];
                let iframe = ctx.ownerDocument.defaultView.frameElement;
                while (iframe) {
                    selector.unshift(axe.utils.getSelector(iframe));
                    iframe = iframe.contentWindow.parent.frameElement;
                }
                return selector.flat();
            }
            function getAxe(node = document.documentElement, verifyTree = false) {
                var _trees$get;
                const doc = node.ownerDocument;
                const context = doc.defaultView;
                if (!context) throw new ReferenceError("no context was found for this node");
                const axe = context.axe;
                if (!axe) throw new ReferenceError("axe was not found in this context");
                const root = null === (_trees$get = trees.get(axe)) || void 0 === _trees$get ? void 0 : _trees$get[0];
                if (verifyTree || !trees.has(axe) || root && !axe.utils.getNodeFromTree(root, node)) trees.set(axe, axe.utils.getFlattenedTree(doc));
                return axe;
            }
            function nodeExistsInAxeTree(node) {
                const axe = getAxe(node);
                return !!axe.utils.getNodeFromTree(node);
            }
            function accessibleTextVirtual(node) {
                const axe = getAxe(node);
                const vnode = getVirtualNode(axe, node);
                if (!vnode) return "";
                return axe.commons.text.accessibleTextVirtual(vnode);
            }
            function isOffscreen(node) {
                const axe = getAxe(node);
                return axe.commons.dom.isOffscreen(node);
            }
            function isHidden(node) {
                const axe = getAxe(node);
                return axe.commons.utils.isHidden(node);
            }
            function isVisible(node, verifyTree) {
                const axe = getAxe(node, verifyTree);
                if (verifyTree) {
                    axe.teardown();
                    axe.setup();
                }
                return axe.commons.dom.isVisible(node, false, true);
            }
            function isSRVisible(node) {
                const axe = getAxe(node);
                return axe.commons.dom.isVisible(node, true, false);
            }
            function implicitRole(node) {
                const axe = getAxe(node);
                return axe.commons.aria.implicitRole(node);
            }
            function getRoleType(node) {
                const axe = getAxe(node);
                const role = implicitRole(node);
                const tableRole = axe.commons.aria.lookupTable.role[role];
                return tableRole && tableRole.type;
            }
            function getRole(node) {
                const axe = getAxe(node);
                return nodeExistsInAxeTree(node) ? axe.commons.aria.getRole(node) : null;
            }
            function getContrast(node) {
                const axe = getAxe(node);
                let contrast;
                try {
                    const foregroundColor = axe.commons.color.getForegroundColor(node);
                    const backgroundColor = axe.commons.color.getBackgroundColor(node);
                    contrast = axe.commons.color.getContrast(backgroundColor, foregroundColor);
                } catch (ex) {
                    console.error(ex);
                }
                return contrast;
            }
            async function runContrastAnalysis(nodes) {
                const axe = getAxe();
                cleanupTrees();
                try {
                    var _axeResults$violation, _axeResults$violation2, _resultNodes$map;
                    const axeResults = await axe.run(Array.isArray(nodes) ? nodes.map(sanitizeContext) : sanitizeContext(nodes), {
                        runOnly: [ "color-contrast" ],
                        restoreScroll: true,
                        pingWaitTime: 5e3,
                        resultTypes: [ "violations" ]
                    });
                    const resultNodes = null === axeResults || void 0 === axeResults ? void 0 : null === (_axeResults$violation = axeResults.violations) || void 0 === _axeResults$violation ? void 0 : null === (_axeResults$violation2 = _axeResults$violation[0]) || void 0 === _axeResults$violation2 ? void 0 : _axeResults$violation2.nodes;
                    return (null === resultNodes || void 0 === resultNodes ? void 0 : null === (_resultNodes$map = resultNodes.map) || void 0 === _resultNodes$map ? void 0 : _resultNodes$map.call(resultNodes, (resultNode => {
                        const issue = resultNode.any[0];
                        const relevantProperties = [ "fgColor", "bgColor", "contrastRatio", "expectedContrastRatio" ];
                        const fontSize = parseInt(issue.data.fontSize.split(" ")[0]);
                        const isBold = "bold" === issue.data.fontWeight;
                        return {
                            data: _objectSpread(_objectSpread({}, Object.fromEntries(Object.entries(issue.data).filter((([key]) => relevantProperties.includes(key))))), {}, {
                                fontSize,
                                isBold
                            }),
                            selector: resultNode.target
                        };
                    }))) || [];
                } catch (ex) {
                    console.error(ex);
                } finally {
                    getFlattenedTree(document.body);
                }
                return [];
            }
            function getVirtualNode(axe, node) {
                let tree = trees.get(axe);
                if (!tree) {
                    tree = axe.utils.getFlattenedTree(node.ownerDocument);
                    trees.set(axe, tree);
                }
                return axe.utils.getNodeFromTree(tree[0], node);
            }
            function isOpaque(node) {
                const axe = getAxe(node);
                return axe.commons.dom.isOpaque(node);
            }
            function isFocusable(node) {
                const axe = getAxe(node);
                return nodeExistsInAxeTree(node) ? axe.commons.dom.isFocusable(node) : void 0;
            }
            function getTabbableElements(node) {
                const axe = getAxe(node, true);
                const virtualNode = getVirtualNode(axe, node);
                return axe.commons.dom.getTabbableElements(virtualNode).map((({actualNode}) => actualNode));
            }
            function setupTrees() {
                cleanupTrees();
                trees.clear();
            }
            function cleanupTrees() {
                trees.forEach(((flattenedTree, axe) => {
                    axe.teardown();
                    trees.delete(axe);
                }));
            }
        },
        1180: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, {
                TOOLTIP_MAX_WIDTH: () => TOOLTIP_MAX_WIDTH,
                clearHighlights: () => clearHighlights,
                createHighlighter: () => createHighlighter,
                emitter: () => emitter,
                findExistingHighlighterNode: () => findExistingHighlighterNode,
                hideHighlights: () => hideHighlights,
                highlightHidden: () => highlightHidden,
                highlightPosition: () => highlightPosition,
                highlighterExists: () => highlighterExists,
                highlighters: () => highlighters,
                showHighlights: () => showHighlights,
                tagName: () => tagName,
                updateHighlighters: () => updateHighlighters
            });
            var get_element_layout = __webpack_require__(4043);
            function throttle(fn, delay) {
                let timeout;
                return function(...args) {
                    if (!timeout) timeout = setTimeout((() => {
                        fn(...args);
                        timeout = null;
                    }), delay);
                };
            }
            var axe_adapter = __webpack_require__(901);
            const {getRole, getContrast, name: getAccessibleName, isHidden} = axe_adapter.ZP;
            const violationIcon = '<svg overflow="visible" preserveAspectRatio="none" viewBox="0 0 24 24" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31A7.902 7.902 0 0112 20zm6.31-3.1L7.1 5.69A7.902 7.902 0 0112 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" vector-effect="non-scaling-stroke" fill="#d93251"></path></svg>';
            const okIcon = '<svg overflow="visible" preserveAspectRatio="none" viewBox="0 0 24 24" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" vector-effect="non-scaling-stroke" fill="#32a852"></path></svg>';
            function getContrastCheck(target) {
                const contrast = getContrast(target);
                if (!contrast) return;
                const truncatedContrast = Math.floor(100 * contrast) / 100;
                return {
                    name: `Contrast`,
                    value: `\n      <span class="contrast-aa">AA</span> ${truncatedContrast}\n      ${contrast < 4.5 ? violationIcon : okIcon}\n    `
                };
            }
            function getRoleCheck(target) {
                const role = getRole(target);
                if (!role) return;
                return {
                    name: `Role`,
                    value: role
                };
            }
            function getAccessibleNameCheck(target) {
                const name = getAccessibleName(target);
                return {
                    name: `Accessible Text`,
                    value: isHidden(target) ? "<em>hidden</em>" : name || "<em>empty</em>"
                };
            }
            function checks(target) {
                const checksMap = new Map;
                try {
                    const contrast = getContrastCheck(target);
                    const role = getRoleCheck(target);
                    const accessibleName = role && getAccessibleNameCheck(target);
                    const checkResults = [ contrast, role, accessibleName ];
                    checkResults.filter(Boolean).forEach((({name, value}) => {
                        checksMap.set(name, value);
                    }));
                } catch (ex) {
                    console.error(ex);
                }
                return checksMap;
            }
            var highlighter = __webpack_require__(8289);
            var highlighter_default = __webpack_require__.n(highlighter);
            var tooltip = __webpack_require__(6288);
            var tooltip_default = __webpack_require__.n(tooltip);
            var themes = __webpack_require__(1867);
            var themes_default = __webpack_require__.n(themes);
            function _defineProperty(e, r, t) {
                return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function _toPropertyKey(t) {
                var i = _toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function _toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            const template = document.createElement("template");
            template.innerHTML = `\n  <style>\n    ${themes_default()}\n    ${highlighter_default()}\n    ${tooltip_default()}\n  </style>\n  <style id="position"></style>\n  <div id="axe-highlight" class="theme--high-contrast">\n    <div id="margin">\n      <div id="border">\n        <div id="content"></div>\n      </div>\n    </div>\n  </div>\n  <div id="tooltip" style="display: none"></div>\n`;
            const tooltipPosition = {
                top: "tooltip--top",
                bottom: "tooltip--bottom",
                left: "tooltip--left",
                right: "tooltip--right",
                fullscreen: "tooltip--fullscreen",
                offscreen: "tooltip--offscreen"
            };
            const highlightPosition = {
                fullpage: "highlight--fullpage",
                offscreen: "highlight--offscreen"
            };
            const highlightHidden = "highlight--hide";
            const TOOLTIP_MAX_WIDTH = 320;
            const dimensionsToBorder = ({top, right, bottom, left}) => `\n    border-top-width: ${Math.max(top, 0)}px;\n    border-right-width: ${Math.max(right, 0)}px;\n    border-bottom-width: ${Math.max(bottom, 0)}px;\n    border-left-width: ${Math.max(left, 0)}px;\n  `.replace(/[\s\n]/g, "");
            const tagName = "axe-highlighter";
            class HighlighterEventEmitter {
                constructor() {
                    this.target = new EventTarget;
                }
                on(eventName, callback) {
                    this.target.addEventListener(eventName, callback);
                }
                remove(eventName, callback) {
                    this.target.removeEventListener(eventName, callback);
                }
                emit(eventName) {
                    this.target.dispatchEvent(new CustomEvent(eventName));
                }
            }
            const emitter = new HighlighterEventEmitter;
            const throttledEmit = throttle(emitter.emit.bind(emitter), 50);
            const handleHighlighterChange = highlighter => {
                if ("selection" === highlighter.theme || !highlighter.theme) return;
                throttledEmit("highlighter:change");
            };
            class Highlighter {
                constructor(element, selector = null) {
                    if (!element) return;
                    const doc = element.ownerDocument || document;
                    this.target = element;
                    this.selector = selector;
                    this.axeHighlighter = doc.createElement(Highlighter.tagName);
                    let shadowRoot;
                    try {
                        shadowRoot = this.axeHighlighter.attachShadow({
                            mode: "open"
                        });
                    } catch (ex) {
                        shadowRoot = this.axeHighlighter.shadowRoot;
                    }
                    this.axeHighlighter.style.setProperty("--axe-highlight-counter", highlighters.size + 1);
                    shadowRoot.appendChild(template.content.cloneNode(true));
                    this.position = shadowRoot.getElementById("position");
                    this.highlight = shadowRoot.getElementById("axe-highlight");
                    this.tooltip = shadowRoot.getElementById("tooltip");
                    this.cachedLayout = element.layout || (0, get_element_layout.Z)(element);
                }
                updatePosition() {
                    const {target} = this;
                    if (!target.isConnected && !target.frameId) return;
                    const {width, height, margin, border, padding, hidden, offViewport, offscreen, fullscreen} = this.cachedLayout = target.layout || (0, 
                    get_element_layout.Z)(target);
                    let {top, left} = this.cachedLayout;
                    const {position} = this;
                    const {height: viewportHeight, width: viewportWidth, pageTop, pageLeft} = window.visualViewport || {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        pageTop: window.pageYOffset,
                        pageLeft: window.pageXOffset
                    };
                    const flipTooltipY = top + height / 2 > viewportHeight / 2 + pageTop;
                    const flipTooltipX = left > viewportWidth - TOOLTIP_MAX_WIDTH + pageLeft;
                    const offsetParent = this.axeHighlighter.offsetParent;
                    if (offsetParent && "static" !== getComputedStyle(offsetParent).getPropertyValue("position")) {
                        const offsetRect = offsetParent.getBoundingClientRect();
                        top -= offsetRect.top + pageTop;
                        left -= offsetRect.left + pageLeft;
                    }
                    position.textContent = `\n      #axe-highlight {\n        top: ${top - Math.max(margin.top, 0)}px;\n        left: ${left - Math.max(margin.left, 0)}px;\n      }\n\n      #tooltip {\n        top: ${!flipTooltipY ? `${height + (top + Math.max(margin.bottom, 0))}px` : "auto"};\n        bottom: ${flipTooltipY ? `${-(top - Math.max(margin.top, 0))}px` : "auto"};\n        left: ${!flipTooltipX ? `${left}px` : "auto"};\n        right: ${flipTooltipX ? `${viewportWidth - left}px` : "auto"};\n      }\n\n      #margin {\n        ${dimensionsToBorder(margin)}\n        height: ${height}px;\n        width: ${width}px;\n      }\n\n      #border {\n        ${dimensionsToBorder(border)}\n      }\n\n      #content {\n        ${dimensionsToBorder(padding)}\n      }\n    `;
                    let isOffViewport = offViewport && !fullscreen;
                    let isOffscreen = offscreen && !fullscreen;
                    if (target.frameId && target.layout) {
                        const {layout} = target;
                        isOffViewport = layout.top + layout.height < pageTop || layout.top > pageTop + viewportHeight;
                    }
                    this.highlight.classList.toggle(highlightPosition.fullpage, fullscreen);
                    this.highlight.classList.toggle(highlightPosition.offscreen, isOffViewport || isOffscreen);
                    this.showTooltip({
                        offViewport: isOffViewport,
                        offscreen: isOffscreen,
                        showTooltip: isOffscreen ? true : this.options.showTooltip,
                        hidden,
                        flipY: flipTooltipY,
                        flipX: flipTooltipX
                    });
                }
                setTheme(theme, options) {
                    const {classList} = this.highlight;
                    classList.remove(...classList);
                    classList.add(`theme--${theme}`);
                    const {badgeContent} = options;
                    if (badgeContent) this.axeHighlighter.style.setProperty("--axe-highlight-badge-content", `'${badgeContent}'`);
                    this.theme = theme;
                    handleHighlighterChange(this);
                }
                setOptions(options) {
                    this.options = options;
                }
                showTooltip({hidden = false, offViewport = false, offscreen = false, showTooltip = false, flipX = false, flipY = false} = {}) {
                    var _target$getAttribute, _target$attributes;
                    const {target, tooltip, cachedLayout, options} = this;
                    const {showMetadata} = options;
                    if (!showTooltip) {
                        tooltip.innerHTML = "";
                        tooltip.style.display = "none";
                        return;
                    }
                    const {offscreenTop = false, offscreenLeft = false, offscreenBottom = false, offscreenRight = false, top, left, height, width, fullscreen} = cachedLayout;
                    const tooltipTop = `${top - (window.scrollY || window.pageYOffset)}px`;
                    const tooltipLeft = `${left - (window.scrollX || window.pageXOffset)}px`;
                    const targetTagName = target.tagName.toLowerCase();
                    const id = (null === (_target$getAttribute = target.getAttribute) || void 0 === _target$getAttribute ? void 0 : _target$getAttribute.call(target, "id")) || (null === (_target$attributes = target.attributes) || void 0 === _target$attributes ? void 0 : _target$attributes.id);
                    const classes = Array.from(target.classList).join(".");
                    const tagIdentifier = id ? `#${id}` : classes.length ? `.${classes}` : "";
                    if (showMetadata && !this.checks && !target.frameId) this.checks = checks(target);
                    const attributesList = this.checks && Array.from(this.checks.entries()).map((([name, value]) => `<dt>${name}</dt><dd>${value}</dd>`));
                    tooltip.innerHTML = `\n      <div id="tag">\n        <strong id="tag-name">${targetTagName}</strong><span id="tag-identifier">${tagIdentifier}</span>\n        ${hidden ? `<span id="tag-visibility">(hidden)</span>` : ""}\n        <span id="tag-dimensions">${parseFloat(width.toFixed(2))} x ${parseFloat(height.toFixed(2))}</span>\n      </div>\n      ${attributesList && attributesList.length ? `<dl id="attributes">${attributesList.join("")}</d>` : ""}\n    `;
                    tooltip.style.display = "block";
                    let position = tooltipPosition.bottom;
                    requestAnimationFrame((() => {
                        if (offscreen) {
                            this.tooltip.style.position = "fixed";
                            if (offscreenTop) {
                                this.tooltip.style.top = "0";
                                this.tooltip.style.bottom = "auto";
                                position = tooltipPosition.bottom;
                            } else {
                                this.tooltip.style.top = tooltipTop;
                                this.tooltip.style.bottom = "auto";
                            }
                            if (offscreenBottom) {
                                this.tooltip.style.bottom = "0";
                                this.tooltip.style.top = "auto";
                                position = tooltipPosition.top;
                            }
                            if (offscreenLeft) {
                                this.tooltip.style.left = "0";
                                this.tooltip.style.right = "auto";
                                position = tooltipPosition.left;
                            } else {
                                this.tooltip.style.left = tooltipLeft;
                                this.tooltip.style.right = "auto";
                            }
                            if (offscreenRight) {
                                this.tooltip.style.right = "0";
                                this.tooltip.style.left = "auto";
                                position = tooltipPosition.right;
                            }
                        } else {
                            if (offViewport) {
                                this.tooltip.style.position = "fixed";
                                if (flipY) {
                                    this.tooltip.style.top = "auto";
                                    this.tooltip.style.bottom = "0";
                                } else this.tooltip.style.top = "0";
                            } else {
                                this.tooltip.style.position = "";
                                this.tooltip.style.top = "";
                                this.tooltip.style.bottom = "";
                            }
                            if (flipY) position = tooltipPosition.top;
                            position += ` ${flipX ? tooltipPosition.right : tooltipPosition.left}`;
                        }
                        tooltip.classList.toggle(tooltipPosition.fullscreen, fullscreen);
                        tooltip.classList.remove(tooltipPosition.top, tooltipPosition.bottom, tooltipPosition.left, tooltipPosition.right);
                        tooltip.classList.add(...position.split(" "));
                    }));
                }
                hide() {
                    this.axeHighlighter.classList.add(highlightHidden);
                    handleHighlighterChange(this);
                }
                show() {
                    this.axeHighlighter.classList.remove(highlightHidden);
                    handleHighlighterChange(this);
                }
                scrollIntoView({behavior = "smooth"} = {}) {
                    var _this$target, _this$target$scrollIn;
                    const opts = {
                        block: "center",
                        behavior,
                        inline: "nearest"
                    };
                    null === (_this$target = this.target) || void 0 === _this$target ? void 0 : null === (_this$target$scrollIn = _this$target.scrollIntoView) || void 0 === _this$target$scrollIn ? void 0 : _this$target$scrollIn.call(_this$target, opts);
                }
                destroy() {
                    var _this$axeHighlighter$;
                    null === (_this$axeHighlighter$ = this.axeHighlighter.parentNode) || void 0 === _this$axeHighlighter$ ? void 0 : _this$axeHighlighter$.removeChild(this.axeHighlighter);
                    highlighters.delete(this.target);
                    handleHighlighterChange(this);
                }
            }
            _defineProperty(Highlighter, "tagName", tagName);
            const highlighters = new Map;
            const findExistingHighlighterNode = element => Array.from(highlighters.keys()).find((highlightNode => {
                var _highlightNode$select, _element$selector;
                return (null === (_highlightNode$select = highlightNode.selector) || void 0 === _highlightNode$select ? void 0 : _highlightNode$select.flat().join()) === (null === (_element$selector = element.selector) || void 0 === _element$selector ? void 0 : _element$selector.flat().join());
            }));
            const highlighterExists = element => highlighters.has(element) || !!(element.selector && findExistingHighlighterNode(element));
            let initializedEvents = false;
            let requestAnimationFrameScheduled = false;
            function updateHighlighters() {
                if (!requestAnimationFrameScheduled) {
                    window.requestAnimationFrame((() => {
                        highlighters.forEach((highlighter => highlighter.updatePosition()));
                        requestAnimationFrameScheduled = false;
                    }));
                    requestAnimationFrameScheduled = true;
                }
            }
            function clearHighlights() {
                Array.from(highlighters.values()).forEach((highlighter => highlighter.destroy()));
            }
            function showHighlights() {
                Array.from(highlighters.values()).forEach((highlighter => highlighter.show()));
            }
            function hideHighlights() {
                Array.from(highlighters.values()).forEach((highlighter => highlighter.hide()));
            }
            function createHighlighter(element, selector = null) {
                let highlighter = null;
                if (!initializedEvents) {
                    window.addEventListener("resize", updateHighlighters);
                    window.addEventListener("scroll", updateHighlighters, true);
                    window.addEventListener("beforeunload", (() => {
                        window.removeEventListener("resize", updateHighlighters);
                        window.removeEventListener("scroll", updateHighlighters, true);
                    }));
                    initializedEvents = true;
                }
                function highlight({theme = "high-contrast", themeOptions = {}, showMetadata = true, showTooltip = true} = {}) {
                    const cachedHighlighter = highlighters.get(element);
                    const existingHighlighterVNode = findExistingHighlighterNode(element);
                    highlighter = cachedHighlighter || new Highlighter(element, selector);
                    highlighter.setTheme(theme, themeOptions);
                    highlighter.setOptions({
                        showTooltip,
                        showMetadata
                    });
                    if (existingHighlighterVNode && element.selector) {
                        const existingHighlighter = highlighters.get(existingHighlighterVNode);
                        existingHighlighter.destroy();
                    }
                    if (!cachedHighlighter) {
                        highlighters.set(element, highlighter);
                        document.body.appendChild(highlighter.axeHighlighter);
                    }
                    handleHighlighterChange(this || {
                        theme
                    });
                    highlighter.updatePosition();
                    return highlighter;
                }
                function destroy() {
                    if (highlighter) {
                        highlighter.destroy();
                        highlighter = null;
                    }
                }
                return {
                    highlight,
                    destroy,
                    scrollIntoView: opts => {
                        var _highlighter;
                        return null === (_highlighter = highlighter) || void 0 === _highlighter ? void 0 : _highlighter.scrollIntoView(opts);
                    }
                };
            }
        },
        4043: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                Z: () => getElementLayout
            });
            function getOffViewportRect(rect, viewport = window.visualViewport || {
                width: window.innerWidth,
                height: window.innerWidth
            }) {
                return {
                    top: rect.top + rect.height < 0,
                    bottom: rect.top > viewport.height,
                    left: rect.left + rect.width < 0,
                    right: rect.left > viewport.width
                };
            }
            function getOffscreenRect(rect, screen = {
                height: document.documentElement.scrollHeight,
                width: document.documentElement.scrollWidth
            }) {
                return {
                    top: rect.top + rect.height + (window.scrollY || window.pageYOffset) < 0,
                    bottom: rect.top > screen.height,
                    left: rect.left + rect.width + (window.scrollX || window.pageXOffset) < 0,
                    right: rect.left > screen.width
                };
            }
            function getElementLayout(element, traverseFrames = true) {
                const win = element.ownerDocument.defaultView;
                const isTopWindow = win === window.top;
                let targetElement = element;
                let rect = targetElement.getBoundingClientRect();
                let hidden = false;
                while (targetElement.parentElement && (!rect.height || !rect.width)) {
                    hidden = true;
                    targetElement = targetElement.parentElement;
                    rect = targetElement.getBoundingClientRect();
                }
                const computedStyle = win.getComputedStyle(targetElement) || {};
                let currentFrame = win.frameElement;
                let currentRect = rect;
                let offsetTop = currentRect.top + (isTopWindow ? win.pageYOffset : 0);
                let offsetLeft = currentRect.left + (isTopWindow ? win.pageXOffset : 0);
                let top = offsetTop;
                let left = offsetLeft;
                if (currentFrame) {
                    top = currentRect.top;
                    left = currentRect.left;
                    offsetTop = currentRect.top;
                    offsetLeft = currentRect.left;
                    while (currentFrame && traverseFrames) {
                        const {frameElement, pageYOffset, pageXOffset} = currentFrame.ownerDocument.defaultView;
                        const frameWindowIsTop = currentFrame.ownerDocument.defaultView === window.top;
                        const style = window.getComputedStyle(currentFrame);
                        const borderLeft = Math.max(parseFloat(style.borderLeftWidth), 0);
                        const borderTop = Math.max(parseFloat(style.borderTopWidth), 0);
                        currentRect = currentFrame.getBoundingClientRect();
                        top += currentRect.top + borderTop + (frameWindowIsTop ? pageYOffset : 0);
                        left += currentRect.left + borderLeft + (frameWindowIsTop ? pageXOffset : 0);
                        currentFrame = frameElement;
                    }
                }
                const offscreenRect = win.frameElement ? {
                    top: top - window.pageYOffset,
                    left: left - window.pageXOffset,
                    height: rect.height,
                    width: rect.width
                } : rect;
                const offViewport = getOffViewportRect(offscreenRect);
                const offscreen = getOffscreenRect(offscreenRect);
                const px = style => +(null === style || void 0 === style ? void 0 : style.replace("px", "")) || 0;
                const {height: viewportHeight, width: viewportWidth} = win.visualViewport || {
                    width: win.innerWidth,
                    height: win.innerHeight
                };
                return {
                    hidden,
                    offViewport: offViewport.top || offViewport.bottom || offViewport.left || offViewport.right,
                    offscreen: offscreen.top || offscreen.bottom || offscreen.left || offscreen.right,
                    offscreenTop: offscreen.top,
                    offscreenBottom: offscreen.bottom,
                    offscreenLeft: offscreen.left,
                    offscreenRight: offscreen.right,
                    fullscreen: top <= 0 && left <= 0 && rect.width >= viewportWidth && rect.height >= viewportHeight,
                    top,
                    left,
                    offsetTop,
                    offsetLeft,
                    width: rect.width,
                    height: rect.height,
                    margin: {
                        top: px(computedStyle.marginTop),
                        right: px(computedStyle.marginRight),
                        bottom: px(computedStyle.marginBottom),
                        left: px(computedStyle.marginLeft)
                    },
                    border: {
                        top: px(computedStyle.borderTopWidth),
                        right: px(computedStyle.borderRightWidth),
                        bottom: px(computedStyle.borderBottomWidth),
                        left: px(computedStyle.borderLeftWidth)
                    },
                    padding: {
                        top: px(computedStyle.paddingTop),
                        right: px(computedStyle.paddingRight),
                        bottom: px(computedStyle.paddingBottom),
                        left: px(computedStyle.paddingLeft)
                    }
                };
            }
        },
        5236: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
            "use strict";
            var src_browser = __webpack_require__(6292);
            var browser_default = __webpack_require__.n(src_browser);
            function ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable;
                    }))), t.push.apply(t, o);
                }
                return t;
            }
            function _objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                        _defineProperty(e, r, t[r]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }));
                }
                return e;
            }
            function _defineProperty(e, r, t) {
                return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function _toPropertyKey(t) {
                var i = _toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function _toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            const debug = browser_default()("bridge");
            const debugMessage = browser_default()("bridge:message");
            const debugResponse = browser_default()("bridge:response");
            const BridgeContext = {
                devtools: "devtools",
                content: "content-script",
                background: "background",
                unknown: "unknown"
            };
            const ERR_COULD_NOT_ESTABLISH_CONNECTION = "Could not establish connection. Receiving end does not exist.";
            class Bridge {
                constructor() {
                    _defineProperty(this, "listener", ((msg, sender) => {
                        const {origin, context, topic, message, options} = msg;
                        const {tab, frameId} = sender;
                        const tabId = tab && -1 !== tab.id ? tab.id : null === options || void 0 === options ? void 0 : options.tabId;
                        if (!origin) return;
                        if (this.context === BridgeContext.background && context === BridgeContext.content) return this.send(context, topic, message, {
                            tabId: options.tabId || tabId,
                            frameId: options.frameId,
                            allFrames: options.allFrames
                        });
                        const devtoolsContextMatchesTabId = this.context !== BridgeContext.devtools || browser.devtools.inspectedWindow.tabId === tabId;
                        if (context !== this.context || !devtoolsContextMatchesTabId) return;
                        debugMessage(`[${topic}] ${origin} → ${this.context}: %O`, "undefined" !== typeof message ? message : "");
                        const listeners = this.getListeners(topic);
                        const onError = ex => {
                            console.error(ex);
                        };
                        try {
                            for (var listener of listeners) {
                                const response = listener({
                                    context,
                                    topic,
                                    message,
                                    origin,
                                    tabId,
                                    frameId
                                });
                                if (!listener.isGlobal && "undefined" !== typeof response) return Promise.resolve(response).catch(onError);
                            }
                        } catch (ex) {
                            onError(ex);
                        }
                    }));
                    const {context: _context} = this;
                    this.messageListeners = new Map;
                    if (_context === BridgeContext.unknown) return;
                    if (!_context) throw new Error(`Unsupported bridge context: ${_context}`);
                    this.attachListener();
                }
                attachListener() {
                    const {context, listener} = this;
                    const hasListener = browser.runtime.onMessage.hasListener(listener);
                    if (!hasListener) {
                        debug("bridge initialized with context %s", context);
                        browser.runtime.onMessage.addListener(listener);
                    }
                    if (true) {
                        window.addEventListener("pageshow", (event => {
                            if (event.persisted && !browser.runtime.onMessage.hasListener(listener)) {
                                debug("bridge initialized with context %s (cached page)", context);
                                browser.runtime.onMessage.addListener(listener);
                            }
                        }));
                        window.addEventListener("beforeunload", (() => {
                            browser.runtime.onMessage.removeListener(listener);
                        }));
                    }
                }
                get context() {
                    if ("undefined" === typeof browser) return BridgeContext.unknown;
                    if (browser && browser.devtools) return BridgeContext.devtools;
                    if (browser && browser.tabs) return BridgeContext.background;
                    if (browser && browser.storage) return BridgeContext.content;
                }
                async send(context, topic, message, {tabId, frameId = 0, allFrames = false} = {}) {
                    if ("undefined" === typeof browser) return;
                    if (!tabId && this.context === BridgeContext.devtools) tabId = browser.devtools.inspectedWindow.tabId;
                    let sendMessage = browser.runtime.sendMessage;
                    if (context === BridgeContext.content && "undefined" !== typeof browser.tabs) {
                        const tabOptions = {
                            frameId: allFrames ? null : frameId
                        };
                        sendMessage = messageToSend => browser.tabs.sendMessage(tabId, _objectSpread(_objectSpread({}, messageToSend), {}, {
                            options: _objectSpread(_objectSpread({}, messageToSend.options), tabOptions)
                        }), tabOptions);
                    }
                    const origin = `${this.context}${this.context === BridgeContext.devtools ? `:${tabId}` : ""}`;
                    const destination = `${context}${[ context, this.context ].includes(BridgeContext.content) && tabId ? `:${tabId}` : ""}`;
                    debugMessage(`[${topic}] ${origin} → ${destination}: %O`, "undefined" !== typeof message ? message : "");
                    const args = {
                        origin,
                        context,
                        topic,
                        message,
                        options: context === BridgeContext.content ? {
                            tabId,
                            frameId,
                            allFrames
                        } : {
                            tabId
                        }
                    };
                    let response = null;
                    try {
                        response = await sendMessage(args);
                    } catch (ex) {
                        if (ex.message !== ERR_COULD_NOT_ESTABLISH_CONNECTION) throw ex;
                    }
                    if (null !== response) debugResponse(`[${topic}] ${destination} → ${origin}: %O`, response);
                    return response;
                }
                getListeners(topic) {
                    const {messageListeners} = this;
                    if (!topic || "*" === topic) return messageListeners.get("*") || [];
                    return [ ...messageListeners.get(topic) || [], ...messageListeners.get("*") || [] ];
                }
                listen(topic, handler) {
                    const {messageListeners} = this;
                    const listeners = messageListeners.get(topic) || [];
                    if ("function" === typeof topic) {
                        handler = topic;
                        topic = "*";
                    }
                    if ("*" === topic) handler.isGlobal = true;
                    if ("function" !== typeof handler) return;
                    if (!listeners.length) messageListeners.set(topic, [ handler ]); else messageListeners.set(topic, [ ...listeners, handler ]);
                }
                unlisten(topic, handler) {
                    const {messageListeners} = this;
                    if ("function" === typeof topic) {
                        handler = topic;
                        topic = "*";
                    }
                    if ("function" !== typeof handler) return;
                    const listeners = messageListeners.get(topic) || [];
                    const handlers = listeners.filter((fn => fn !== handler));
                    if (handlers.length) messageListeners.set(topic, handlers); else messageListeners.delete(topic);
                }
            }
            const bridge = new Bridge;
            const context = BridgeContext;
            var node_modules_uuid = __webpack_require__(1719);
            var uuid_default = __webpack_require__.n(node_modules_uuid);
            const frame_messenger_debug = browser_default()("frameMessenger");
            async function frameMessenger(frameWindow, topic, message, {timeout = 500} = {}) {
                if (frameWindow === window.top) throw new Error("FrameMessager on top level window is not supported.");
                const uuid = uuid_default()();
                const frameMessengerTopic = `frame-messenger:${uuid}`;
                const {frameId} = await new Promise(((resolve, reject) => {
                    const timeoutInterval = setTimeout((() => {
                        bridge.unlisten(frameMessengerTopic, listener);
                        reject(`No response received from frame within timeout of ${timeout}ms.`);
                    }), timeout);
                    const listener = ({message: childFrameId}) => {
                        clearTimeout(timeoutInterval);
                        bridge.unlisten(frameMessengerTopic, listener);
                        resolve(childFrameId);
                    };
                    bridge.listen(frameMessengerTopic, listener);
                    frameWindow.postMessage({
                        uuid,
                        originFrameId: window.frameId,
                        source: "frame-messenger"
                    }, "*");
                }));
                return bridge.send(context.content, topic, message, {
                    frameId
                });
            }
            function isValidPostMessage(data) {
                return data.uuid && data.originFrameId >= 0 && "frame-messenger" === data.source;
            }
            function init() {
                bridge.send(context.background, "identify-content-frame").then((frameId => {
                    window.frameId = frameId;
                }));
                if (window.top !== window) window.addEventListener("message", (({data}) => {
                    if (!isValidPostMessage(data)) return;
                    frame_messenger_debug(`originFrame:${data.originFrameId} → childFrame:${window.frameId} [${window.location.href}]`);
                    bridge.send(context.content, `frame-messenger:${data.uuid}`, {
                        frameId: window.frameId
                    }, {
                        frameId: data.originFrameId
                    });
                }));
            }
            function postMessageToOrigin(message, url) {
                if (!(url instanceof URL)) url = new URL(url);
                if (url.origin !== window.location.origin) return;
                window.postMessage(message, url.origin);
            }
            bridge.listen("init", (({message}) => {
                if (false) ;
            }));
            const axe_versions_versions = {
                4.8: "4.8.4",
                4.9: "4.9.1",
                "4.9.1": "4.9.1",
                "4.9.0": "4.9.0",
                "4.8.4": "4.8.4",
                "4.10": "4.10.0",
                "4.10.0": "4.10.0"
            };
            function getAxe(axeVersion = "latest") {
                if ("latest" === axeVersion || !axeVersion) return window.axe;
                const matchingVersion = axe_versions_versions[axeVersion];
                return window.axeVersions[matchingVersion] || window.axe;
            }
            var axe_adapter = __webpack_require__(901);
            __webpack_require__(8873);
            __webpack_require__(2663);
            const package_namespaceObject = JSON.parse('{"HO":{"md":"^4.10.0"}}');
            function isValidAxeVersion(axeVersion) {
                return Object.keys(axe_versions_versions).includes(null === axeVersion || void 0 === axeVersion ? void 0 : axeVersion.toString());
            }
            const isEdge = "false" === "true";
            const isFirefox = "true" === "true";
            const isCoconut = "false" === "true";
            const brand = "axe";
            let application;
            if (isCoconut) application = "coconut"; else application = isFirefox ? "AxeFirefox" : isEdge ? "AxeEdge" : "AxeChrome";
            const latestAxeVersion = package_namespaceObject.HO.md.match(/(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/).groups;
            function isLatestAxeVersion(axeVersion) {
                return !axeVersion || "latest" === axeVersion || axeVersion === `${latestAxeVersion.major}.${latestAxeVersion.minor}` || axeVersion === `${latestAxeVersion.major}.${latestAxeVersion.minor}.${latestAxeVersion.patch}`;
            }
            async function injectAxeVersion(axeVersion) {
                let axe;
                globalThis.define = (id, dependencies, factory) => {
                    if ("axe-core" === id) axe = factory();
                };
                globalThis.define.amd = true;
                const matchingVersion = axe_versions_versions[axeVersion];
                const importAxe = async () => await import(browser.runtime.getURL(`axe-versions/${"latest" === axeVersion ? axeVersion : matchingVersion}/axe.js`));
                window.axeVersions = window.axeVersions || {};
                if ("latest" === axeVersion) await importAxe(); else if (!window.axeVersions[matchingVersion]) {
                    const cachedAxe = window.axe;
                    await importAxe();
                    window.axe = cachedAxe;
                    window.axeVersions[matchingVersion] = axe;
                }
                delete globalThis.define;
                return axe;
            }
            async function waitForFrames(axeVersion) {
                if (window.frames.length > 0) {
                    const AXE_FRAME_TIMEOUT = 500;
                    const pingFrames = Promise.all(Array.from(window.frames).map((frameWindow => frameMessenger(frameWindow, "axe:ping", axeVersion).catch((() => {})))));
                    const timeout = new Promise((resolve => setTimeout(resolve, AXE_FRAME_TIMEOUT)));
                    await Promise.race([ pingFrames, timeout ]);
                }
            }
            async function addAxeVersion(axeVersion) {
                var _window$axeVersions, _axe, _axe2, _axe3, _axe4, _axe4$frameMessenger;
                const isLatestVersion = isLatestAxeVersion(axeVersion);
                if (!isLatestVersion && !isValidAxeVersion(axeVersion)) return false;
                if (isLatestVersion && "axe" in window || !!(null !== (_window$axeVersions = window.axeVersions) && void 0 !== _window$axeVersions && _window$axeVersions[axe_versions_versions[axeVersion]])) {
                    await waitForFrames(axeVersion);
                    return true;
                }
                let axe;
                try {
                    axe = await injectAxeVersion(isLatestVersion ? "latest" : axeVersion);
                } catch (ex) {
                    return false;
                }
                const tagsToEnable = [ "wcag22aaa", "wcag22aa", "wcag22a", "wcag21aaa", "wcag2aaa" ];
                const disabledRuleIdsToEnable = [];
                if ("function" === typeof (null === (_axe = axe) || void 0 === _axe ? void 0 : _axe.getRules)) for (const {ruleId} of axe.getRules(tagsToEnable)) {
                    const rule = axe.utils.getRule(ruleId);
                    if (!rule.enabled) disabledRuleIdsToEnable.push(ruleId);
                }
                null === (_axe2 = axe) || void 0 === _axe2 ? void 0 : _axe2.configure({
                    branding: {
                        brand,
                        application
                    },
                    rules: disabledRuleIdsToEnable.map((ruleId => ({
                        id: ruleId,
                        enabled: true
                    })))
                });
                const frameMessengerTopic = isLatestVersion || !(null !== (_axe3 = axe) && void 0 !== _axe3 && _axe3.version) ? "axe-frame-messenger" : `axe-frame-messenger@${axe.version}`;
                null === (_axe4 = axe) || void 0 === _axe4 ? void 0 : null === (_axe4$frameMessenger = _axe4.frameMessenger) || void 0 === _axe4$frameMessenger ? void 0 : _axe4$frameMessenger.call(_axe4, {
                    post: async (frameWindow, message, callback) => {
                        const response = await frameMessenger(frameWindow, frameMessengerTopic, message, {
                            timeout: "axe.ping" === message.topic ? 5e3 : 6e4
                        });
                        callback(response);
                    },
                    open: listener => {
                        const handleAxeFrameMessage = async ({message}) => {
                            const response = await new Promise((resolve => {
                                const handleResponse = res => {
                                    resolve(JSON.parse(JSON.stringify(res)));
                                };
                                listener(message, handleResponse);
                            }));
                            return response;
                        };
                        bridge.listen(frameMessengerTopic, handleAxeFrameMessage);
                    }
                });
                await waitForFrames(axeVersion);
                return true;
            }
            async function getHighlighter() {
                await addAxeVersion("latest");
                if (true) return __webpack_require__(1180);
                const highlightPath = __webpack_require__.g.browser.runtime.getURL("highlighter.js");
                return await import(highlightPath);
            }
            function getNodeFromSelector(selector) {
                return selector.map((s => {
                    if (Array.isArray(s)) return s.filter((v => "shadow-root" !== v));
                    return "shadow-root" === s ? "" : s;
                })).flat().reduce(((context, s) => {
                    const ctx = (null === context || void 0 === context ? void 0 : context.contentDocument) || (null === context || void 0 === context ? void 0 : context.shadowRoot) || context;
                    return null === ctx || void 0 === ctx ? void 0 : ctx.querySelector(s);
                }), document);
            }
            async function getAxeServerUrl() {
                const {axeServerURL} = await browser.storage.local.get("axeServerURL");
                return !axeServerURL || "default" === axeServerURL ? "https://axe.deque.com" : axeServerURL;
            }
            function convert_groot_selector_to_axe_selector(selector) {
                if (!Array.isArray(selector)) return selector;
                const result = [];
                let shadowRootFound = false;
                let shadowElements = [];
                for (let index = selector.length - 1; index >= 0; index--) {
                    const selectorElement = selector[index];
                    if (Array.isArray(selectorElement)) {
                        if ("shadow-root" === selectorElement[0]) {
                            shadowRootFound = true;
                            shadowElements.push(selectorElement[1]);
                        }
                    } else if (true === shadowRootFound) {
                        shadowElements.push(selectorElement);
                        shadowRootFound = false;
                        shadowElements.reverse();
                        result.push(shadowElements);
                        shadowElements = [];
                    } else result.push(selectorElement);
                }
                return result.reverse();
            }
            function checkForCrossOriginIframeChildren(vnode) {
                if (vnode && vnode.children) for (const child of vnode.children) {
                    var _child$children$;
                    if (child.isFrame && null !== (_child$children$ = child.children[0]) && void 0 !== _child$children$ && _child$children$.isCrossOrigin || checkForCrossOriginIframeChildren(child)) return true;
                }
                return false;
            }
            function scopeHasCrossOriginIframes(scopedVNode) {
                return scopedVNode ? checkForCrossOriginIframeChildren(scopedVNode) : false;
            }
            function checkAnalyticsTreeForCrossOriginIframes(fullTreeForAnalytics) {
                return fullTreeForAnalytics ? fullTreeForAnalytics.flat.some((vnode => vnode.isCrossOrigin)) : false;
            }
            function getVnodeFromAnalyticsTree(fullTreeForAnalytics, selector) {
                if (!fullTreeForAnalytics || !selector) return null;
                const element = fullTreeForAnalytics.querySelector(selector);
                const scopedVNode = fullTreeForAnalytics.get(element);
                return scopedVNode || null;
            }
            function axe_ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable;
                    }))), t.push.apply(t, o);
                }
                return t;
            }
            function axe_objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? axe_ownKeys(Object(t), !0).forEach((function(r) {
                        axe_defineProperty(e, r, t[r]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : axe_ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }));
                }
                return e;
            }
            function axe_defineProperty(e, r, t) {
                return (r = axe_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function axe_toPropertyKey(t) {
                var i = axe_toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function axe_toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            function _objectWithoutProperties(e, t) {
                if (null == e) return {};
                var o, r, i = _objectWithoutPropertiesLoose(e, t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
                }
                return i;
            }
            function _objectWithoutPropertiesLoose(r, e) {
                if (null == r) return {};
                var t = {};
                for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
                    if (e.includes(n)) continue;
                    t[n] = r[n];
                }
                return t;
            }
            let axeProEvents;
            let recorder;
            if (false) ;
            const sendWalkthroughScannedMessage = async () => {
                try {
                    const axeServerURL = await getAxeServerUrl();
                    postMessageToOrigin({
                        message: "walkthrough:scanned"
                    }, axeServerURL);
                } catch (e) {}
            };
            bridge.listen("axe:add-version", (({message: {axeVersion, enableRecorder}}) => {
                const addedAxeVersionPromise = addAxeVersion(axeVersion).then((addedAxeVersion => {
                    if (addedAxeVersion && enableRecorder && recorder) {
                        const axe = getAxe(axeVersion);
                        if (axe) recorder.addRecorderToAxe(axe);
                    }
                    return addedAxeVersion;
                }));
                if (window.top === window) return addedAxeVersionPromise;
            }));
            bridge.listen("axe:run", (async _ref => {
                let {message: {include, axeVersion, enableExperimentalRules, enableAdvancedRules = false}} = _ref, options = _objectWithoutProperties(_ref.message, [ "include", "axeVersion", "enableExperimentalRules", "enableAdvancedRules" ]);
                const axe = getAxe(axeVersion);
                const toggleRules = (rules, enabled) => rules.reduce(((ruleMap, rule) => {
                    ruleMap[rule.ruleId] = {
                        enabled
                    };
                    return ruleMap;
                }), {});
                const experimentalRules = enableExperimentalRules ? toggleRules(axe.getRules([ "experimental" ]), true) : {};
                const advancedRules = toggleRules(axe.getRules([ "advanced" ]), enableAdvancedRules);
                const {clearHighlights} = await getHighlighter();
                clearHighlights();
                try {
                    var _axeRunContextElement, _axeRunContextElement2, _axeRunContextElement3;
                    axe_adapter.ZP.cleanupTrees();
                    let currentScrollPositionX, currentScrollPositionY;
                    if (enableAdvancedRules && window.top === window) {
                        currentScrollPositionX = document.documentElement.scrollLeft;
                        currentScrollPositionY = document.documentElement.scrollTop;
                        window.scrollTo(currentScrollPositionX, 0);
                    }
                    let axeRunContext;
                    let axeRunContextElement;
                    if (options.includeCrossOrigin) {
                        var _axeProEvents, _axeProEvents$getScop;
                        axeRunContext = include ? include : (null === (_axeProEvents = axeProEvents) || void 0 === _axeProEvents ? void 0 : null === (_axeProEvents$getScop = _axeProEvents.getScopeVNode()) || void 0 === _axeProEvents$getScop ? void 0 : _axeProEvents$getScop.selector) || document;
                        axeRunContext = convert_groot_selector_to_axe_selector(axeRunContext);
                    } else {
                        var _axeProEvents2;
                        axeRunContextElement = include ? getNodeFromSelector(include) : (null === (_axeProEvents2 = axeProEvents) || void 0 === _axeProEvents2 ? void 0 : _axeProEvents2.getScope()) || document;
                        axeRunContext = null === axe_adapter.ZP || void 0 === axe_adapter.ZP ? void 0 : axe_adapter.ZP.sanitizeContext(axeRunContextElement);
                    }
                    const axeResult = await axe.run([ axeRunContext ], axe_objectSpread(axe_objectSpread({
                        restoreScroll: true,
                        pingWaitTime: 5e3,
                        resultTypes: [ "violations", "incomplete" ]
                    }, options), {}, {
                        rules: axe_objectSpread(axe_objectSpread(axe_objectSpread({}, experimentalRules), advancedRules), options.rules)
                    }));
                    if ("number" === typeof currentScrollPositionX && "number" === typeof currentScrollPositionY) window.scrollTo(currentScrollPositionX, currentScrollPositionY);
                    axe_adapter.ZP.getFlattenedTree((null === (_axeRunContextElement = axeRunContextElement) || void 0 === _axeRunContextElement ? void 0 : _axeRunContextElement.documentElement) || (null === (_axeRunContextElement2 = axeRunContextElement) || void 0 === _axeRunContextElement2 ? void 0 : null === (_axeRunContextElement3 = _axeRunContextElement2.ownerDocument) || void 0 === _axeRunContextElement3 ? void 0 : _axeRunContextElement3.documentElement) || document.documentElement);
                    if (!enableAdvancedRules && null !== axeResult && void 0 !== axeResult && axeResult.advancedRuleInput) delete axeResult.advancedRuleInput;
                    sendWalkthroughScannedMessage();
                    return axeResult;
                } catch (err) {
                    return {
                        error: true,
                        message: err.message || "Unknown Error",
                        stack: err.stack || ""
                    };
                }
            }));
            bridge.listen("axe:get-analytics", (async ({message}) => {
                var _axeProEvents3;
                let isCrossOrigin = false;
                let hasCrossOriginIframes = false;
                let treeForAnalytics;
                let scopedVNode = null === (_axeProEvents3 = axeProEvents) || void 0 === _axeProEvents3 ? void 0 : _axeProEvents3.getScopeVNode();
                if (!scopedVNode && message.include) {
                    var _axeProEvents4;
                    treeForAnalytics = await (null === (_axeProEvents4 = axeProEvents) || void 0 === _axeProEvents4 ? void 0 : _axeProEvents4.buildTreeForAnalytics());
                    scopedVNode = getVnodeFromAnalyticsTree(treeForAnalytics, message.include);
                }
                if (scopedVNode) {
                    var _scopedVNode$children;
                    isCrossOrigin = scopedVNode.isCrossOrigin || !!scopedVNode.isFrame && (null === (_scopedVNode$children = scopedVNode.children[0]) || void 0 === _scopedVNode$children ? void 0 : _scopedVNode$children.isCrossOrigin);
                    hasCrossOriginIframes = scopeHasCrossOriginIframes(scopedVNode);
                } else {
                    if (!treeForAnalytics) {
                        var _axeProEvents5;
                        treeForAnalytics = await (null === (_axeProEvents5 = axeProEvents) || void 0 === _axeProEvents5 ? void 0 : _axeProEvents5.buildTreeForAnalytics());
                    }
                    hasCrossOriginIframes = checkAnalyticsTreeForCrossOriginIframes(treeForAnalytics);
                }
                return {
                    isCrossOrigin,
                    hasCrossOriginIframes
                };
            }));
            bridge.listen("axe:configure", (_ref2 => {
                let {message: {axeVersion}} = _ref2, data = _objectWithoutProperties(_ref2.message, [ "axeVersion" ]);
                const axe = getAxe(axeVersion);
                return null === axe || void 0 === axe ? void 0 : axe.configure(data);
            }));
            bridge.listen("axe:version", (() => {
                const axe = getAxe();
                return axe.version;
            }));
            bridge.listen("axe:ping", (({message: axeVersion}) => {
                const AXE_PING_TIMEOUT = 500;
                return new Promise((resolve => {
                    setTimeout((() => {
                        resolve(false);
                        clearInterval(intervalId);
                    }), AXE_PING_TIMEOUT);
                    const intervalId = setInterval((() => {
                        const axe = getAxe(axeVersion);
                        if (axe) {
                            resolve(true);
                            clearInterval(intervalId);
                            clearTimeout(resolve);
                        }
                    }), 100);
                }));
            }));
            bridge.listen("get-document-metadata", (() => {
                var _document, _document2, _document3;
                return {
                    contentType: null === (_document = document) || void 0 === _document ? void 0 : _document.contentType,
                    title: null === (_document2 = document) || void 0 === _document2 ? void 0 : _document2.title,
                    url: null === (_document3 = document) || void 0 === _document3 ? void 0 : _document3.URL,
                    scoped: !!axeProEvents && axeProEvents.getScope() !== document
                };
            }));
            bridge.listen("extension:logout", (async () => {
                const {axeServerURL} = await browser.storage.local.get("axeServerURL");
                const axeUrl = !axeServerURL || "default" === axeServerURL ? "https://axe.deque.com" : axeServerURL;
                postMessageToOrigin({
                    message: "extension:logout"
                }, axeUrl);
            }));
            var debounce = __webpack_require__(6415);
            var debounce_default = __webpack_require__.n(debounce);
            var get_element_layout = __webpack_require__(4043);
            function get_vnode_from_selector_ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable;
                    }))), t.push.apply(t, o);
                }
                return t;
            }
            function get_vnode_from_selector_objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? get_vnode_from_selector_ownKeys(Object(t), !0).forEach((function(r) {
                        get_vnode_from_selector_defineProperty(e, r, t[r]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : get_vnode_from_selector_ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }));
                }
                return e;
            }
            function get_vnode_from_selector_defineProperty(e, r, t) {
                return (r = get_vnode_from_selector_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function get_vnode_from_selector_toPropertyKey(t) {
                var i = get_vnode_from_selector_toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function get_vnode_from_selector_toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            const getVNodeFromSelector = async selector => {
                if (!selector || 0 === selector.length) return null;
                const contexts = await bridge.send(context.content, "selector:identify", {
                    selector
                });
                if (!Array.isArray(contexts) || !(null !== contexts && void 0 !== contexts && contexts.length)) return null;
                const targetContext = contexts.pop();
                const vnode = await bridge.send(context.content, "highlight:get-node-metadata", {
                    selector: targetContext.selector
                }, {
                    frameId: targetContext.frameId
                });
                if (!vnode) return null;
                const [layout, ...offsets] = await Promise.all([ targetContext, ...contexts ].map((ctx => bridge.send(context.content, "highlight:get-element-layout", {
                    selector: ctx.selector
                }, {
                    frameId: ctx.frameId
                }))));
                const combinedOffset = offsets.reduce(((offset, current) => ({
                    top: offset.top + current.offsetTop + current.border.top,
                    left: offset.left + current.offsetLeft + current.border.left
                })), {
                    top: 0,
                    left: 0
                });
                return get_vnode_from_selector_objectSpread(get_vnode_from_selector_objectSpread({}, vnode), {}, {
                    selector,
                    frameId: targetContext.frameId,
                    layout: get_vnode_from_selector_objectSpread(get_vnode_from_selector_objectSpread({}, layout), {}, {
                        top: layout.top + combinedOffset.top,
                        left: layout.left + combinedOffset.left
                    })
                });
            };
            const get_vnode_from_selector = getVNodeFromSelector;
            bridge.listen("highlight", (async ({message: opts = {}}) => {
                const {createHighlighter, clearHighlights} = await getHighlighter();
                let selector = null;
                if (opts && opts.selector) selector = opts.selector; else if (Array.isArray(opts)) selector = opts;
                clearHighlights();
                if (selector) {
                    const node = getNodeFromSelector(selector);
                    let vnode = null;
                    if (!node && selector.length > 1) {
                        vnode = await get_vnode_from_selector(selector);
                        if (!vnode) return false;
                    } else if (!node) return false;
                    const highlighter = createHighlighter(node || vnode, selector);
                    const {highlightTheme} = await browser.storage.local.get("highlightTheme");
                    highlighter.highlight({
                        theme: highlightTheme || "high-contrast"
                    });
                    if (opts.scrollIntoView) if (node) highlighter.scrollIntoView(); else await bridge.send(context.content, "highlight:scrollIntoView", {
                        selector: [ selector[selector.length - 1] ]
                    }, {
                        frameId: vnode.frameId
                    });
                    return true;
                }
                return false;
            }));
            const clearHighlights = async () => {
                const highlighter = await getHighlighter();
                highlighter.clearHighlights();
            };
            const hideHighlights = async () => {
                const highlighter = await getHighlighter();
                highlighter.hideHighlights();
            };
            const showHighlights = async () => {
                const highlighter = await getHighlighter();
                highlighter.showHighlights();
            };
            bridge.listen("highlight:hide", hideHighlights);
            bridge.listen("highlight:show", showHighlights);
            bridge.listen("highlight:clear", clearHighlights);
            bridge.listen("devtools:close", clearHighlights);
            bridge.listen("highlight:get-element-layout", (({message: {selector}}) => {
                const node = getNodeFromSelector(selector);
                if (!node) return {
                    top: 0,
                    left: 0
                };
                return (0, get_element_layout.Z)(node, false);
            }));
            if (window.top !== window) {
                const updateHighlighters = debounce_default()((() => bridge.send(context.content, "highlight:update")), 100);
                window.addEventListener("scroll", updateHighlighters, true);
                window.addEventListener("beforeunload", (() => {
                    window.removeEventListener("scroll", updateHighlighters);
                }));
                bridge.listen("highlight:get-node-metadata", (async ({message: {selector}}) => {
                    const node = getNodeFromSelector(selector);
                    if (!node) return {
                        tagName: "unknown",
                        classList: [],
                        attributes: {}
                    };
                    return {
                        tagName: node.tagName,
                        classList: Array.from(node.classList),
                        attributes: {
                            id: node.getAttribute("id")
                        }
                    };
                }));
                bridge.listen("highlight:scrollIntoView", (({message: {selector}}) => {
                    const node = getNodeFromSelector(selector);
                    null === node || void 0 === node ? void 0 : node.scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                        inline: "nearest"
                    });
                }));
            }
            bridge.listen("highlight:update", (async () => {
                const {highlighters, updateHighlighters} = await getHighlighter();
                const vnodes = Array.from(highlighters.keys()).filter((node => node.frameId));
                if (!highlighters.size) return;
                await Promise.all(vnodes.map((async vnode => {
                    const updatedVnode = await get_vnode_from_selector(vnode.selector);
                    if (updatedVnode) {
                        const highlighter = highlighters.get(vnode);
                        highlighter.target = updatedVnode;
                        highlighters.set(updatedVnode, highlighter);
                    }
                    highlighters.delete(vnode);
                })));
                updateHighlighters();
            }));
            if (window.top === window) (async () => {
                const {emitter, highlightHidden} = await getHighlighter();
                emitter.on("highlighter:change", (async () => {
                    const {highlighters} = await getHighlighter();
                    const tree = globalThis.tree;
                    const highlights = Array.from(highlighters).map((([element, highlighter]) => {
                        var _tree$get;
                        return {
                            vnodeId: null === tree || void 0 === tree ? void 0 : null === (_tree$get = tree.get(element)) || void 0 === _tree$get ? void 0 : _tree$get.vnodeId,
                            selector: highlighter.selector,
                            theme: highlighter.theme,
                            hidden: highlighter.axeHighlighter.classList.contains(highlightHidden)
                        };
                    }));
                    bridge.send(context.devtools, "highlight:changed", highlights);
                }));
            })();
            const attach = async () => {
                const {axeServerURL} = await browser.storage.local.get("axeServerURL");
                const axeUrl = !axeServerURL || "default" === axeServerURL ? "https://axe.deque.com" : axeServerURL;
                window.addEventListener("message", (e => {
                    if ("extension:healthcheck" !== e.data.message) return;
                    postMessageToOrigin({
                        message: "extension:healthcheck:response"
                    }, axeUrl);
                }));
            };
            attach();
            function getNodeAndResidual(selector) {
                const split = selector.reduce(((r, s) => {
                    if (r.done) {
                        r.residual.push(s);
                        return r;
                    }
                    if (Array.isArray(s) && "shadow-root" === s[0]) r.selector.push(s[1]); else if (!r.selector.length) r.selector.push(s); else {
                        r.residual.push(s);
                        r.done = true;
                    }
                    return r;
                }), {
                    selector: [],
                    residual: [],
                    done: false
                });
                const node = split.selector.flat().reduce(((context, s) => {
                    const ctx = (null === context || void 0 === context ? void 0 : context.shadowRoot) || context;
                    return null === ctx || void 0 === ctx ? void 0 : ctx.querySelector(s);
                }), document);
                return {
                    node,
                    context: split.selector,
                    residual: split.residual
                };
            }
            bridge.listen("node:exists", (async ({message}) => {
                const {selector} = message;
                const node = getNodeFromSelector(selector);
                return null !== node && void 0 !== node;
            }));
            bridge.listen("nodes:exist-in-axe-tree", (async ({message}) => {
                const {nodes} = message;
                return Object.fromEntries(nodes.map((({vnodeId, selector}) => {
                    const node = getNodeFromSelector(selector);
                    return [ vnodeId, node ? (0, axe_adapter.cW)(node) : false ];
                })));
            }));
            bridge.listen("node:get-info", (async ({message: {selector}}) => {
                const node = getNodeFromSelector(selector);
                return {
                    name: axe_adapter.ZP.name(node),
                    role: axe_adapter.ZP.getRole(node)
                };
            }));
            bridge.listen("node:color-contrast", (async ({message}) => {
                const {nodes} = message;
                const vNodeElementMap = new Map;
                for (const {selector, vnodeId} of nodes) vNodeElementMap.set(getNodeFromSelector(selector), vnodeId);
                const {clearHighlights} = await getHighlighter();
                clearHighlights();
                const results = await axe_adapter.ZP.runContrastAnalysis(Object.values(vNodeElementMap));
                const keyedResults = {};
                for (const {selector, data} of results) {
                    const vnodeId = vNodeElementMap.get(getNodeFromSelector(selector));
                    keyedResults[vnodeId] = data;
                }
                return keyedResults;
            }));
            const isFrameElement = node => "contentWindow" in node;
            const unknownBoundingBox = {
                x: 0,
                y: 0,
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
            const scrollNodeIntoView = (node, options) => {
                if (null !== options && void 0 !== options && options.scrollIntoView) {
                    const elementStyleCache = new Map;
                    const scrollBehavior = {
                        key: "scroll-behavior",
                        value: "auto"
                    };
                    let currentAncestor = node.parentElement;
                    while (currentAncestor) {
                        const styles = window.getComputedStyle(currentAncestor);
                        if (styles.scrollBehavior && styles.scrollBehavior !== scrollBehavior.value) {
                            const style = currentAncestor.style.getPropertyValue(scrollBehavior.key);
                            const priority = currentAncestor.style.getPropertyPriority(scrollBehavior.key);
                            elementStyleCache.set(currentAncestor, {
                                style,
                                priority
                            });
                            currentAncestor.style.setProperty(scrollBehavior.key, scrollBehavior.value, "important");
                        }
                        currentAncestor = currentAncestor.parentElement;
                    }
                    node.scrollIntoView("object" === typeof options.scrollIntoView ? options.scrollIntoView : {
                        behavior: "auto",
                        block: "center",
                        inline: "center"
                    });
                    for (const [element, cache] of elementStyleCache) element.style.setProperty(scrollBehavior.key, cache.style, cache.priority);
                }
            };
            const getNestedFrameRect = (node, rect, nestedRect) => {
                const style = window.getComputedStyle(node);
                const borderLeft = Math.max(parseFloat(style.borderLeftWidth), 0);
                const borderTop = Math.max(parseFloat(style.borderTopWidth), 0);
                const paddingLeft = Math.max(parseFloat(style.paddingLeft), 0);
                const paddingTop = Math.max(parseFloat(style.paddingTop), 0);
                return {
                    x: rect.x + nestedRect.x + borderLeft + paddingLeft,
                    y: rect.y + nestedRect.y + borderTop + paddingTop,
                    left: rect.left + nestedRect.left + borderLeft + paddingLeft,
                    top: rect.top + nestedRect.top + borderTop + paddingTop,
                    height: nestedRect.height,
                    width: nestedRect.width
                };
            };
            bridge.listen("node:bounding-box", (async ({message}) => {
                const {selector, options} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return unknownBoundingBox;
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) {
                    const nestedRect = await frameMessenger(node.contentWindow, "node:bounding-box", {
                        selector: residual,
                        options
                    });
                    return getNestedFrameRect(node, node.getBoundingClientRect(), nestedRect);
                }
                scrollNodeIntoView(node, options);
                return node.getBoundingClientRect();
            }));
            bridge.listen("node:get-text-selector", (async ({message}) => {
                const {selector} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return selector;
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) return [ ...selector, ...await frameMessenger(node.contentWindow, "node:get-text-selector", {
                    selector: residual
                }) ];
                const isSelect = element => "SELECT" === element.tagName && "options" in element;
                if (isSelect(node)) {
                    const elementStack = axe_adapter.ZP.getElementStack(node);
                    if (elementStack[0] === node) return selector;
                    const value = node.options[node.selectedIndex].text || node.options[node.selectedIndex].value;
                    for (const element of elementStack) {
                        var _element$innerText;
                        if ("innerText" in element && (null === (_element$innerText = element.innerText) || void 0 === _element$innerText ? void 0 : _element$innerText.trim()) === value) return [ axe_adapter.ZP.getSelector(element) ];
                    }
                }
                return selector;
            }));
            bridge.listen("node:bounding-box-text", (async ({message}) => {
                const {selector, options} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return unknownBoundingBox;
                scrollNodeIntoView(node, options);
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) {
                    const rect = node.getBoundingClientRect();
                    const nestedRect = await frameMessenger(node.contentWindow, "node:bounding-box-text", {
                        selector: residual,
                        options
                    });
                    return getNestedFrameRect(node, rect, nestedRect);
                }
                const range = document.createRange();
                range.selectNodeContents(node);
                const rect = range.getBoundingClientRect();
                return rect;
            }));
            bridge.listen("node:computed-text-color", (async ({message}) => {
                const {selector} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) return await frameMessenger(node.contentWindow, "node:computed-text-color", {
                    selector: residual
                });
                return window.getComputedStyle(node).color;
            }));
            const nodeStyleCache = new WeakMap;
            const nodeStylePriorityCache = new WeakMap;
            const nodeStyleProperties = {
                color: "transparent"
            };
            const nodeTransitionProperties = {
                webkitTransition: "none",
                transition: "none"
            };
            bridge.listen("node:set-transparent-text", (async ({message}) => {
                const {selector} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return;
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) await frameMessenger(node.contentWindow, "node:set-transparent-text", {
                    selector: residual
                }); else {
                    const styleCache = {};
                    const stylePriorityCache = {};
                    const hideTextOnNode = async _node => {
                        for (const [key] of Object.entries(nodeTransitionProperties)) {
                            styleCache[key] = _node.style.getPropertyValue(key);
                            stylePriorityCache[key] = _node.style.getPropertyPriority(key);
                        }
                        for (const [key, value] of Object.entries(nodeTransitionProperties)) _node.style.setProperty(key, value, "important");
                        await new Promise((resolve => setTimeout((() => {
                            for (const [key, value] of Object.entries(nodeStyleProperties)) {
                                styleCache[key] = _node.style.getPropertyValue(key);
                                stylePriorityCache[key] = _node.style.getPropertyPriority(key);
                                _node.style.setProperty(key, value, "important");
                            }
                            resolve();
                        }), 1)));
                        const computedStyle = window.getComputedStyle(_node);
                        const backgroundProperties = [ "background", "backgroundImage" ];
                        if ("text" === computedStyle.webkitBackgroundClip || "text" === computedStyle.backgroundClip) for (const key of backgroundProperties) {
                            styleCache[key] = _node.style.getPropertyValue(key);
                            stylePriorityCache[key] = _node.style.getPropertyPriority(key);
                            _node.style.setProperty(key, "none", "important");
                        }
                        nodeStyleCache.set(_node, styleCache);
                        nodeStylePriorityCache.set(_node, stylePriorityCache);
                    };
                    await hideTextOnNode(node);
                    for (const childNode of Array.from(node.children)) await hideTextOnNode(childNode);
                }
            }));
            bridge.listen("node:set-transparent-text-reset", (async ({message}) => {
                const {selector} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return;
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) await frameMessenger(node.contentWindow, "node:set-transparent-text-reset", {
                    selector: residual
                }); else {
                    const restoreTextOnNode = async _node => {
                        const properties = nodeStyleCache.get(_node) || {};
                        const priorityProperties = nodeStylePriorityCache.get(_node) || {};
                        for (const key of Object.keys(properties)) if (!(key in nodeTransitionProperties)) _node.style.setProperty(key, properties[key], priorityProperties[key]);
                        await new Promise((resolve => setTimeout((() => {
                            for (const key of Object.keys(nodeTransitionProperties)) if (key in properties) _node.style.setProperty(key, properties[key], priorityProperties[key]);
                            resolve();
                        }), 1)));
                    };
                    await restoreTextOnNode(node);
                    for (const childNode of Array.from(node.children)) await restoreTextOnNode(childNode);
                }
            }));
            bridge.listen("node:is-valid-auto-cc-target", (async ({message: {selector}}) => {
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return;
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) return frameMessenger(node.contentWindow, "node:is-valid-auto-cc-target", {
                    selector: residual
                }); else {
                    if (!node.children.length) return true;
                    const nodeColor = window.getComputedStyle(node).color;
                    return !Array.from(node.children).find((childNode => window.getComputedStyle(childNode).color !== nodeColor));
                }
            }));
            bridge.listen("node:focus", (async ({message}) => {
                const {selector, timeout = 5e3} = message;
                const {node, residual} = getNodeAndResidual(selector);
                if (null === node || void 0 === node) return;
                if (isFrameElement(node) && null !== residual && void 0 !== residual && residual.length) await frameMessenger(node.contentWindow, "node:focus", {
                    selector: residual
                }); else await Promise.race([ Promise.all([ node.focus(), ...node.getAnimations({
                    subtree: true
                }).map((animation => animation.finished)) ]), new Promise((resolve => setTimeout(resolve, timeout))) ]);
            }));
            bridge.listen("node:reset-focus", (() => {
                if (document.activeElement) document.activeElement.blur();
            }));
            bridge.listen("selector:identify", (async ({message}) => {
                const {selector} = message;
                const {node, context, residual} = getNodeAndResidual(selector);
                const contentWindow = node.contentWindow;
                const selectorContext = [ {
                    selector: context,
                    frameId: window.frameId,
                    frameURL: window.location.href
                } ];
                if (contentWindow && null !== residual && void 0 !== residual && residual.length) {
                    const childContext = await frameMessenger(contentWindow, "selector:identify", {
                        selector: residual
                    });
                    selectorContext.push(...childContext);
                }
                return selectorContext;
            }));
            bridge.listen("control:viewport", (() => ({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                dpr: window.devicePixelRatio,
                url: window.location.href
            })));
            bridge.listen("control:currentScroll", (() => document.documentElement.scrollTop));
            bridge.listen("control:scrollToTop", (({message}) => {
                window.scrollTo((null === message || void 0 === message ? void 0 : message.x) || 0, (null === message || void 0 === message ? void 0 : message.y) || 0);
            }));
            const boundingBoxFromSelector = async ({message}) => {
                let result = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                if (!(null !== message && void 0 !== message && message.selector)) return result;
                const {node, residual} = getNodeAndResidual(message.selector);
                if (!node) return result;
                const bb = node.getBoundingClientRect();
                result = {
                    x: bb.x,
                    y: bb.y,
                    width: bb.width,
                    height: bb.height
                };
                if (!(null !== residual && void 0 !== residual && residual.length)) return result;
                const frameResult = await frameMessenger(node.contentWindow, "control:boundingbox:content", {
                    selector: residual
                });
                if (!frameResult) return result;
                const s = window.getComputedStyle(node);
                result.x += frameResult.x + Math.max(parseFloat(s.borderLeftWidth), 0);
                result.y += frameResult.y + Math.max(parseFloat(s.borderTopWidth), 0);
                result.width = frameResult.width;
                result.height = frameResult.height;
                return result;
            };
            if (window.top === window) bridge.listen("control:boundingbox:top", boundingBoxFromSelector); else bridge.listen("control:boundingbox:content", boundingBoxFromSelector);
            var highlighter = __webpack_require__(1180);
            const isTop = window === window.top;
            const elementIsAxeHighlighter = element => {
                var _element$tagName, _element$getRootNode, _element$getRootNode$;
                return (null === (_element$tagName = element.tagName) || void 0 === _element$tagName ? void 0 : _element$tagName.toLowerCase()) === highlighter.tagName || (null === (_element$getRootNode = element.getRootNode()) || void 0 === _element$getRootNode ? void 0 : null === (_element$getRootNode$ = _element$getRootNode.host) || void 0 === _element$getRootNode$ ? void 0 : _element$getRootNode$.tagName.toLowerCase()) === highlighter.tagName;
            };
            const isChangeSignificant = records => {
                if (records.find((record => ![ "childList", "attributes" ].includes(record.type)))) return true;
                const childListChanges = records.filter((record => "childList" === record.type));
                const attributeChanges = records.filter((record => "attributes" === record.type));
                return isChildListChangeSignificant(childListChanges) || isAttributeChangeSignificant(attributeChanges);
            };
            const isChildListChangeSignificant = records => !!records.flatMap((record => [ ...Array.from(record.addedNodes), ...Array.from(record.removedNodes) ])).find((node => !elementIsAxeHighlighter(node)));
            const isAttributeChangeSignificant = records => !!records.find((record => !elementIsAxeHighlighter(record.target)));
            const handleMutations = async records => {
                if (!isChangeSignificant(records)) return;
                await bridge.send(context.devtools, "page-observer:mutated", {
                    isTop
                });
            };
            let observer = null;
            bridge.listen("page-observer:start", (async () => {
                if (observer) return;
                observer = new MutationObserver(handleMutations);
                observer.observe(document.body, {
                    attributes: true,
                    subtree: true,
                    childList: true
                });
            }));
            bridge.listen("page-observer:end", (async () => {
                var _observer;
                null === (_observer = observer) || void 0 === _observer ? void 0 : _observer.disconnect();
                observer = null;
            }));
            document.addEventListener("beforeunload", (() => {
                observer.disconnect();
                observer = null;
            }));
            init();
            const getAxeUrl = async () => {
                let axeUrl;
                const {axeServerURL} = await browser.storage.local.get([ "axeServerURL" ]);
                try {
                    axeUrl = new URL(!axeServerURL || "default" === axeServerURL ? "https://axe.deque.com" : axeServerURL);
                } catch (ex) {
                    axeUrl = new URL("https://axe.deque.com");
                }
                return axeUrl;
            };
            const sendMessageToAccountPortal = async message => {
                const axeUrl = await getAxeUrl();
                try {
                    postMessageToOrigin({
                        message
                    }, axeUrl);
                } catch {}
            };
            const onMessage = async e => {
                const axeUrl = await getAxeUrl();
                const originUrl = new URL(e.origin);
                if (axeUrl.origin !== originUrl.origin) return;
                switch (e.data.message) {
                  case "app:logout":
                    bridge.send(context.background, "app:logout");
                    break;

                  case "app:plan:change":
                    bridge.send(context.background, "app:plan:change");
                    break;

                  case "walkthrough:check:open":
                    {
                        const isOpened = await bridge.send(context.devtools, "panel:is:open");
                        if (isOpened) sendMessageToAccountPortal("walkthrough:opened");
                        break;
                    }
                }
            };
            const bindWalkthroughEvents = () => {
                bridge.listen("walkthrough:panel-open:status", (() => {
                    sendMessageToAccountPortal("walkthrough:opened");
                }));
                bridge.listen("walkthrough:test-saved:status", (() => {
                    sendMessageToAccountPortal("walkthrough:saved");
                }));
                bridge.listen("walkthrough:igt-completed:status", (() => {
                    sendMessageToAccountPortal("walkthrough:igt:completed");
                }));
            };
            if (window.top === window) {
                window.addEventListener("message", onMessage);
                bindWalkthroughEvents();
            }
        },
        2825: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ":host {\n  --base-font-size: 12px;\n  pointer-events: none !important;\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  height: 0 !important;\n  width: 100% !important;\n  /* \n  * Prevent client scripts from hiding highlights.\n  * See:\n  *   - https://github.com/dequelabs/axe-extension/issues/4242\n  *   - https://github.com/dequelabs/axe-extension/issues/5263\n  */\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n\n:host(.highlight--hide) {\n  display: none !important;\n}\n\n#axe-highlight {\n  position: absolute;\n  pointer-events: none;\n  z-index: 2147483647;\n  display: flex;\n  flex: 1;\n}\n\n#border {\n  border-color: var(--theme--border-color, transparent);\n  border-style: solid;\n  display: flex;\n  flex: 1;\n}\n\n#margin {\n  border-color: var(--theme--margin-color, transparent);\n  border-style: solid;\n  display: flex;\n  flex: 1;\n}\n\n#content {\n  background-color: var(--theme--content-color, transparent);\n  background-clip: content-box;\n  border-color: var(--theme--padding-color, transparent);\n  border-style: solid;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  display: flex;\n  flex: 1;\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        3523: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(9146);
            var ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__(2490);
            var ___CSS_LOADER_AT_RULE_IMPORT_2___ = __webpack_require__(7821);
            var ___CSS_LOADER_AT_RULE_IMPORT_3___ = __webpack_require__(9577);
            var ___CSS_LOADER_AT_RULE_IMPORT_4___ = __webpack_require__(2944);
            var ___CSS_LOADER_AT_RULE_IMPORT_5___ = __webpack_require__(3545);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
            ___CSS_LOADER_EXPORT___.i(___CSS_LOADER_AT_RULE_IMPORT_1___);
            ___CSS_LOADER_EXPORT___.i(___CSS_LOADER_AT_RULE_IMPORT_2___);
            ___CSS_LOADER_EXPORT___.i(___CSS_LOADER_AT_RULE_IMPORT_3___);
            ___CSS_LOADER_EXPORT___.i(___CSS_LOADER_AT_RULE_IMPORT_4___);
            ___CSS_LOADER_EXPORT___.i(___CSS_LOADER_AT_RULE_IMPORT_5___);
            ___CSS_LOADER_EXPORT___.push([ module.id, "\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        442: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ":host {\n  --tooltip-background-color: #f9f9f9;\n  --tooltip-border-color: #333;\n  --tooltip-shadow-color: rgba(0, 0, 0, 0.2);\n  --tooltip-tag-name-color: #2e40a0;\n  --tooltip-tag-identifier-color: #c53406;\n  --tooltip-text-color: #02101a;\n  --tooltip-label-color: #666;\n  --tooltip-text-accent-color: #4d4d4d;\n}\n\n#tooltip {\n  position: absolute;\n  white-space: nowrap;\n  margin: 0.5rem 0;\n  font-family: monospace;\n  font-size: var(--base-font-size);\n  padding: 0.6rem;\n  background: var(--tooltip-background-color);\n  color: var(--tooltip-text-color);\n  box-shadow: 0 0 6px var(--tooltip-shadow-color);\n  border: 3px solid var(--tooltip-border-color);\n  z-index: 2147483647;\n  max-width: 20rem;\n  border-radius: 3px;\n}\n\n#tooltip p {\n  margin: 0;\n}\n\n#tooltip svg {\n  height: 13px;\n  width: 13px;\n  margin-bottom: -2px;\n}\n\n#tooltip:before,\n#tooltip:after {\n  content: '';\n  display: block;\n  position: absolute;\n  border-width: 0.5rem;\n  border-style: solid;\n  border-color: transparent;\n  border-top: none;\n  border-bottom: 0.5rem solid var(--tooltip-background-color);\n}\n\n#tooltip:after {\n  z-index: 2;\n  top: 0;\n  transform: translateY(1px) translateY(-100%);\n}\n\n#tooltip:before {\n  top: 0;\n  transform: translateY(-3px) translateY(-100%);\n  border-bottom: 0.5rem solid var(--tooltip-border-color);\n  z-index: 1;\n}\n\n#tooltip.tooltip--top:before {\n  top: 100%;\n  transform: rotate(180deg) translateY(-3px);\n}\n\n#tooltip.tooltip--top:after {\n  top: 100%;\n  transform: rotate(180deg) translateY(1px);\n}\n\n#tooltip.tooltip--right {\n  margin-right: -1.3rem;\n}\n\n#tooltip.tooltip--right:before {\n  right: 0.6rem;\n}\n\n#tooltip.tooltip--right:after {\n  right: 0.6rem;\n}\n\n#tooltip.tooltip--left:before {\n  left: 0.6rem;\n}\n\n#tooltip.tooltip--left:after {\n  left: 0.6rem;\n}\n\n#tooltip.tooltip--fullscreen {\n  position: fixed !important;\n  top: 10px !important;\n  left: 10px !important;\n  bottom: auto !important;\n  transform: none;\n  margin: 0;\n}\n\n#tooltip.tooltip--fullscreen:before,\n#tooltip.tooltip--fullscreen:after {\n  display: none;\n}\n\n#tag {\n  display: grid;\n  grid-template-columns: max-content auto 1fr min-content;\n}\n\n#tag-name {\n  color: var(--tooltip-tag-name-color);\n}\n\n#tag-identifier {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n  white-space: normal;\n  overflow: hidden;\n  color: var(--tooltip-tag-identifier-color);\n}\n\n#tag-visibility {\n  font-style: italic;\n  color: var(--tooltip-text-accent-color);\n  margin-left: 1em;\n}\n\n#tag-offscreen {\n  margin-left: 1em;\n}\n\n#tag-dimensions {\n  font-family: monospace;\n  color: var(--tooltip-text-accent-color);\n  margin-left: 1em;\n  justify-self: right;\n}\n\n#hidden-eye {\n  position: relative;\n}\n\n#hidden-eye:before {\n  position: absolute;\n  content: '';\n  display: block;\n  height: 1px;\n  width: 16px;\n  background-color: #02101a;\n  top: 7px;\n  left: -1px;\n  z-index: 1;\n  transform: rotate(-45deg);\n  border: 1px solid #fff;\n}\n\n#accessible-text {\n  color: var(--tooltip-text-accent-color);\n  white-space: normal;\n}\n\n#attributes {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  grid-column-gap: 1rem;\n  grid-row-gap: 0.2rem;\n  grid-auto-rows: minmax(1.6em, auto);\n  align-items: center;\n  margin: 0;\n  padding: 0;\n  border-top: 1px solid #ccc;\n  padding-top: 0.6rem;\n  margin-top: 0.6rem;\n  font-family: sans-serif;\n}\n\n#attributes dl,\n#attributes dd {\n  margin: 0;\n}\n\n#attributes dt {\n  color: var(--tooltip-label-color);\n}\n\n#attributes dd {\n  justify-self: right;\n  text-align: right;\n  white-space: normal;\n  -webkit-line-clamp: 3;\n  /* autoprefixer: ignore next */\n  -webkit-box-orient: vertical;\n}\n\n.contrast-aa {\n  color: #4d4d4d;\n  line-height: 1em;\n  display: inline-block;\n  padding: 2px;\n  border: 1px solid #4d4d4d;\n  font-size: 9px;\n  vertical-align: text-bottom;\n  font-family: monospace;\n}\n\n/* make sure to show the full tooltip for an offscreen element */\n#tooltip.tooltip--offscreen.tooltip--top {\n  /* to account for a possible horizontal scrollbar */\n  margin-bottom: 1.2rem;\n}\n\n#tooltip.tooltip--offscreen.tooltip--right {\n  margin-right: 0.6rem;\n}\n\n#tooltip.tooltip--offscreen.tooltip--left {\n  margin-left: 0.6rem;\n}\n\n/* make tooltip points to different directions according to its location */\n#tooltip.tooltip--offscreen.tooltip--right:before {\n  top: 0.6rem;\n  transform: rotate(90deg) translateY(-24px);\n}\n\n#tooltip.tooltip--offscreen.tooltip--right:after {\n  top: 0.6rem;\n  transform: rotate(90deg) translateY(-20px);\n}\n\n#tooltip.tooltip--offscreen.tooltip--left:before {\n  top: 0.6rem;\n  transform: rotate(-90deg) translateY(-24px);\n}\n\n#tooltip.tooltip--offscreen.tooltip--left:after {\n  top: 0.6rem;\n  transform: rotate(-90deg) translateY(-20px);\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        2944: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ":host {\n  --badge-color-outline: #3c7aae;\n}\n\n.theme--badge:before {\n  position: absolute;\n  content: '';\n  display: block;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border: 3px solid var(--badge-color-outline);\n}\n\n.theme--badge:after {\n  counter-reset: badge var(--axe-highlight-counter);\n  content: var(--axe-highlight-badge-content, counter(badge));\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  border: 3px solid #fff;\n  color: #fff;\n  font-weight: 500;\n  background-color: var(--badge-color-outline);\n  display: flex;\n  height: 1.5em;\n  min-width: 1.5em;\n  align-items: center;\n  justify-content: center;\n  font-family: monospace;\n  font-size: 13px;\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        2490: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ".theme--devtools {\n  --theme--border-color: rgba(255, 255, 50, 0.45);\n  --theme--margin-color: rgba(255, 150, 0, 0.5);\n  --theme--padding-color: rgba(35, 180, 80, 0.35);\n  --theme--content-color: rgba(30, 60, 255, 0.4);\n}\n\n.theme--devtools.highlight--fullpage {\n  position: fixed !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  transform: none;\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        9146: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ":host {\n  --high-contrast-color-outline: #c11bde;\n  --high-contrast-color-shadow: #e267ff;\n}\n\n.theme--high-contrast {\n  transform: translate(-6px, -6px);\n  padding: 3px;\n  border: 3px solid var(--high-contrast-color-outline);\n  box-shadow: 0 0 10px 4px var(--high-contrast-color-shadow);\n  max-width: calc(100% - 6px);\n}\n\n.theme--high-contrast.highlight--fullpage {\n  position: fixed !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  transform: none;\n  border: 3px solid var(--high-contrast-color-outline);\n}\n\n.theme--high-contrast:not(.highlight--offscreen):not(.highlight--fullpage)\n  + #tooltip.tooltip--bottom {\n  transform: translateY(6px);\n}\n\n.theme--high-contrast:not(.highlight--offscreen):not(.highlight--fullpage)\n  + #tooltip.tooltip--top {\n  transform: translateY(-6px);\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        3545: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(1678);
            var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(6130);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
            ___CSS_LOADER_EXPORT___.push([ module.id, ".theme--ml:before {\n  position: absolute;\n  content: '';\n  display: block;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border: 3px solid var(--high-contrast-color-outline);\n}\n\n.theme--ml:after {\n  content: '';\n  position: absolute;\n  top: -5px;\n  left: -5px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n  width: 29px;\n  height: 29px;\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        9577: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ".theme--selected:before {\n  position: absolute;\n  content: '';\n  display: block;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border: 3px solid var(--high-contrast-color-outline);\n}\n\n.theme--selected.highlight--page {\n  position: fixed !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  transform: none;\n  border: 3px solid var(--high-contrast-color-outline);\n}\n\n.theme--selected.highlight--page:before {\n  display: none;\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        7821: (module, __unused_webpack_exports, __webpack_require__) => {
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3476);
            var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, ".theme--selection:before {\n  position: absolute;\n  content: '';\n  display: block;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border: 3px dashed var(--high-contrast-color-outline);\n}\n\n.theme--selection.highlight--page {\n  position: fixed !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  transform: none;\n  border: 3px dashed var(--high-contrast-color-outline);\n}\n\n.theme--selection.highlight--page:before {\n  display: none;\n}\n", "" ]);
            module.exports = ___CSS_LOADER_EXPORT___;
        },
        3476: module => {
            "use strict";
            module.exports = function(cssWithMappingToString) {
                var list = [];
                list.toString = function() {
                    return this.map((function(item) {
                        var content = cssWithMappingToString(item);
                        if (item[2]) return "@media ".concat(item[2], " {").concat(content, "}");
                        return content;
                    })).join("");
                };
                list.i = function(modules, mediaQuery, dedupe) {
                    if ("string" === typeof modules) modules = [ [ null, modules, "" ] ];
                    var alreadyImportedModules = {};
                    if (dedupe) for (var i = 0; i < this.length; i++) {
                        var id = this[i][0];
                        if (null != id) alreadyImportedModules[id] = true;
                    }
                    for (var _i = 0; _i < modules.length; _i++) {
                        var item = [].concat(modules[_i]);
                        if (dedupe && alreadyImportedModules[item[0]]) continue;
                        if (mediaQuery) if (!item[2]) item[2] = mediaQuery; else item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                        list.push(item);
                    }
                };
                return list;
            };
        },
        1678: module => {
            "use strict";
            module.exports = function(url, options) {
                if (!options) options = {};
                if (!url) return url;
                url = String(url.__esModule ? url.default : url);
                if (/^['"].*['"]$/.test(url)) url = url.slice(1, -1);
                if (options.hash) url += options.hash;
                if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) return '"'.concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"');
                return url;
            };
        },
        2663: (module, __unused_webpack_exports, __webpack_require__) => {
            const SemVer = __webpack_require__(9510);
            const Range = __webpack_require__(7374);
            const minSatisfying = (versions, range, options) => {
                let min = null;
                let minSV = null;
                let rangeObj = null;
                try {
                    rangeObj = new Range(range, options);
                } catch (er) {
                    return null;
                }
                versions.forEach((v => {
                    if (rangeObj.test(v)) if (!min || 1 === minSV.compare(v)) {
                        min = v;
                        minSV = new SemVer(min, options);
                    }
                }));
                return min;
            };
            module.exports = minSatisfying;
        },
        8289: (module, __unused_webpack_exports, __webpack_require__) => {
            var result = __webpack_require__(2825);
            if ("string" === typeof result) module.exports = result; else module.exports = result.toString();
        },
        1867: (module, __unused_webpack_exports, __webpack_require__) => {
            var result = __webpack_require__(3523);
            if ("string" === typeof result) module.exports = result; else module.exports = result.toString();
        },
        6288: (module, __unused_webpack_exports, __webpack_require__) => {
            var result = __webpack_require__(442);
            if ("string" === typeof result) module.exports = result; else module.exports = result.toString();
        },
        1719: (module, __unused_webpack_exports, __webpack_require__) => {
            var v1 = __webpack_require__(2998);
            var v4 = __webpack_require__(6541);
            var uuid = v4;
            uuid.v1 = v1;
            uuid.v4 = v4;
            module.exports = uuid;
        },
        6130: module => {
            "use strict";
            module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQuNSIgY3k9IjE0LjUiIHI9IjEzLjUiIGZpbGw9IiMwYjE0MWMiIHN0cm9rZT0iI2Q0ZGRlMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTYuMjMgMTIuNThoLjkydjUuNTFoLS45MmEuOTEuOTEgMCAwMS0uOTItLjkxVjEzLjVhLjkyLjkyIDAgMDEuOTItLjkyem0xNC43LTEuMzhWMTlhMS44NCAxLjg0IDAgMDEtMS44NCAxLjg0SDkuOTFBMS44NCAxLjg0IDAgMDE4LjA3IDE5di03LjhhMi4yOSAyLjI5IDAgMDEyLjI5LTIuMjloMy4yMlY3LjA3YS45Mi45MiAwIDAxMS44NCAwdjEuODRoMy4yMmEyLjI5IDIuMjkgMCAwMTIuMjkgMi4yOXptLTggMi4zYTEuMTUgMS4xNSAwIDEwLTEuMTUgMS4xNSAxLjE1IDEuMTUgMCAwMDEuMTUtMS4xNXptLS4yMyAzLjY4aC0xLjg4di45MWgxLjg0em0yLjc2IDBoLTEuODh2LjkxaDEuODR6bTMtMy42OGExLjE1IDEuMTUgMCAxMC0xLjE1IDEuMTUgMS4xNiAxLjE2IDAgMDAxLjE1LTEuMTV6bS0uMjMgMy42OGgtMS44OXYuOTFoMS44NHptNS41MS0zLjY4djMuNjhhLjkyLjkyIDAgMDEtLjkyLjkxaC0uOTJ2LTUuNTFoLjkyYS45Mi45MiAwIDAxLjkyLjkyeiIgZmlsbD0iIzc2Y2ZlOCIvPjwvc3ZnPg==";
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            loaded: false,
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = __webpack_modules__;
    (() => {
        __webpack_require__.amdO = {};
    })();
    (() => {
        var deferred = [];
        __webpack_require__.O = (result, chunkIds, fn, priority) => {
            if (chunkIds) {
                priority = priority || 0;
                for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
                deferred[i] = [ chunkIds, fn, priority ];
                return;
            }
            var notFulfilled = 1 / 0;
            for (i = 0; i < deferred.length; i++) {
                var [chunkIds, fn, priority] = deferred[i];
                var fulfilled = true;
                for (var j = 0; j < chunkIds.length; j++) if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key => __webpack_require__.O[key](chunkIds[j])))) chunkIds.splice(j--, 1); else {
                    fulfilled = false;
                    if (priority < notFulfilled) notFulfilled = priority;
                }
                if (fulfilled) {
                    deferred.splice(i--, 1);
                    var r = fn();
                    if (void 0 !== r) result = r;
                }
            }
            return result;
        };
    })();
    (() => {
        __webpack_require__.n = module => {
            var getter = module && module.__esModule ? () => module["default"] : () => module;
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.g = function() {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" === typeof window) return window;
            }
        }();
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        __webpack_require__.r = exports => {
            if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    (() => {
        __webpack_require__.nmd = module => {
            module.paths = [];
            if (!module.children) module.children = [];
            return module;
        };
    })();
    (() => {
        __webpack_require__.j = 998;
    })();
    (() => {
        var installedChunks = {
            998: 0
        };
        __webpack_require__.O.j = chunkId => 0 === installedChunks[chunkId];
        var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
            var [chunkIds, moreModules, runtime] = data;
            var moduleId, chunkId, i = 0;
            if (chunkIds.some((id => 0 !== installedChunks[id]))) {
                for (moduleId in moreModules) if (__webpack_require__.o(moreModules, moduleId)) __webpack_require__.m[moduleId] = moreModules[moduleId];
                if (runtime) var result = runtime(__webpack_require__);
            }
            if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
            for (;i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) installedChunks[chunkId][0]();
                installedChunks[chunkId] = 0;
            }
            return __webpack_require__.O(result);
        };
        var chunkLoadingGlobal = this["webpackChunk"] = this["webpackChunk"] || [];
        chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
        chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    })();
    var __webpack_exports__ = __webpack_require__.O(void 0, [ 736 ], (() => __webpack_require__(5236)));
    __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})();