var boundingElementMaxWidthRatio = 1.2;
var boundingElementMaxHeightRatio = 1.1;
var boundingElementOffset = {x: 10, y: 0};
var invalidBoundingTags = new Set(['TD', 'TR', 'FORM']);

/**
 * Searches for input fields within a node and applies functionality.
 * @param {Element} [node] - The node within which to search for input fields.
 * @returns {void} No return value.
 */
function checkForPasswordField(node) {
    "use strict";

    node = node || document.body;

    const inputs = getInputFields(node);

    for (const node of inputs) {
        if (node.matches('.form-element.underlinedText')) {
            continue;
        }
        if (treatedInputs.has(node) || node.disabled === true || node.ariaHidden === 'true') {
            observeNode(node);
            observeAttributes(node);
            continue;
        }

        if (node.offsetHeight === 0 || node.offsetWidth === 0) {
            observeAttributes(node);
            setTimeout(() => {
                if (!treatedInputs.has(node) && (node.offsetHeight !== 0 || node.offsetWidth !== 0)) {
                    createContainer(node);
                }
            }, 2000);
        }
        else {
            createContainer(node);
        }
    }
}

function getInputFields(node) {
    "use strict";

    let specialSelector = '';
    let negativeSelector = '';
    if (specialWebsite) {
        if (specialWebsite.inputSelector) {
            ({inputSelector: specialSelector} = specialWebsite);
        }
        if (specialWebsite.negativeSelector) {
            ({negativeSelector} = specialWebsite);
        }
    }

    specialSelector = specialSelector === '' ? '' : `, ${specialSelector}`;
    negativeSelector = negativeSelector === '' ? '' : `, ${negativeSelector}`;
    negativeSelector = `[readonly], [disabled], [type="checkbox"], [type="search"], [type="radio"]${negativeSelector}`;
    negativeSelector = `[name*="code"], [name*="mfa"], [name*="2fa"], ${negativeSelector}`;
    negativeSelector = `:not(${negativeSelector})`;

    let selector = `input:is(${idSelector}, ${passwordSelector}${specialSelector})`;
    selector += negativeSelector;
    return node.querySelectorAll(selector);
}

/**
 *
 * @param {HTMLElement} node - The reference element for positioning the icon container.
 * @param {string} nodeId - UUID attributed to the input to link it to the right icon
 * @returns {{iconContainer: HTMLElement, maybeParent: HTMLElement}}
 */
function calcParent(node, nodeId) {
    "use strict";

    const maybeParent = findMaxParent(node);
    let iconContainer = null;

    if (node === maybeParent) {
        iconContainer =
            maybeParent.parentElement.querySelector(`.mega-pm-container:is([data-input-link="${nodeId}"])`);
        if (!iconContainer) {
            iconContainer = document.createElement("div");
            iconContainer.className = 'mega-pm-container';
            node.autocomplete = "off";
            node.parentElement.insertBefore(iconContainer, node);
        }
    }
    else {
        iconContainer = maybeParent.querySelector(`.mega-pm-container:is([data-input-link="${nodeId}"])`);
        if (!iconContainer) {
            iconContainer = document.createElement("div");
            iconContainer.className = 'mega-pm-container';
            node.autocomplete = "off";
            maybeParent.insertBefore(iconContainer, maybeParent.firstElementChild);
        }
    }

    return {maybeParent, iconContainer};
}

/**
 * Creates an icon container element and inserts it into the DOM relative to the provided
 * node and its bounding input element.
 *
 * @function createContainer
 * @param {HTMLElement} node - The reference element for positioning the icon container.
 * @returns {void}
 */
function createContainer(node) {
    "use strict";

    // Seems setting is not loaded let's await for settings to be loaded
    if (!settings) {
        loadStorage.then(() => createContainer(node));
        return;
    }

    const form = node.closest('form');
    const nodeId = node.dataset.inputLink || makeUUID();

    if (settings.autofill === true) {
        const {maybeParent, iconContainer} = calcParent(node, nodeId);
        let iconContainerShadow = iconContainer.shadowRoot;

        if (!iconContainerShadow) {
            iconContainerShadow = iconContainer.attachShadow({mode: "open"});
            injectScriptToShadow(iconContainerShadow);
            iconContainer.className = 'mega-pm-container mega-pm-icon-container mega-shadow-dom';
            iconContainer.dataset.inputLink = nodeId;
            node.dataset.inputLink = nodeId;

            // Node seems under Shadow DOM and using slot to positioned
            if (node.slot) {
                const slot = document.createElement('slot');
                slot.name = 'mega-pm-icon-container';
                iconContainer.slot = 'mega-pm-icon-container';
                node.assignedSlot.parentNode.insertBefore(slot, node.assignedSlot);
            }
        }
        node.autocomplete = "off";

        if (node === maybeParent) {
            node.parentElement.insertBefore(iconContainer, node);
        }
        else {
            maybeParent.insertBefore(iconContainer, maybeParent.firstElementChild);
        }

        let shadowWrap = iconContainerShadow.querySelector('.mega-shadow-wrap');

        if (!shadowWrap) {
            shadowWrap = document.createElement('div');
            shadowWrap.className = 'mega-shadow-wrap';
            iconContainerShadow.append(shadowWrap);
        }
        treatedInputs.add(node);
        setTimeout(() => {
            placeIcon(node, maybeParent, shadowWrap, form);
        }, specialWebsite && specialWebsite.recalcIconDelay || 0);

        // this node already has events, lets skip adding them again
        if (node.attributes['mega-pwm-event']) {
            return;
        }

        addPwmEvent(node, 'focus', handleDialogOpen.bind(maybeParent));
        addPwmEvent(node, 'input', () => {
            closeContentDialog();
            if (specialWebsite && specialWebsite.keepRecalcIconPos) {
                reCalcIcon(node);
            }
        });
        addPwmEvent(node, 'keydown', (e) => {
            if (e.key === 'Tab') {
                closeContentDialog();
            }
            if (dialogOpen && e.key === 'ArrowDown') {
                const firstElement = document.querySelector('.mega-shadow-dom.mega-shadow-dialog')
                    .shadowRoot.querySelector('.mega-pm-dialog-elem');
                firstElement.focus();
            }
            if (specialWebsite && specialWebsite.keepRecalcIconPos) {
                reCalcIcon(node);
            }
        });
        addPwmEvent(window, 'resize', () => {
            reCalcIcon(node);
        });

        if (specialWebsite) {
            if (specialWebsite.seperateClearInputBtn) {

                const btnSel = specialWebsite.seperateClearInputBtn;
                const watching = document.querySelectorAll(typeof btnSel === 'string' ? btnSel : btnSel[0]);
                watching.forEach(btn => addPwmEvent(btn, 'click', (e) => {
                    if (typeof btnSel === 'string' || e.target.matches(btnSel[1]) || e.target.closest(btnSel[1])) {
                        reCalcIcon(node);
                    }
                }));
            }
            if (specialWebsite.triggerRecalcIconPos) {
                if (specialWebsite.triggerRecalcIconPos.click) {
                    document.querySelectorAll(specialWebsite.triggerRecalcIconPos.click)
                        .forEach(btn => addPwmEvent(btn, 'click', () => reCalcIcon(node)));
                }
                if (specialWebsite.triggerRecalcIconPos.enter) {
                    document.querySelectorAll(specialWebsite.triggerRecalcIconPos.enter)
                        .forEach(form => addPwmEvent(form, 'keydown', e => {
                            if (e.key === 'Enter') {
                                reCalcIcon(node);
                            }
                        }));
                }
            }
        }

        node.setAttribute('mega-pwm-event', true);
    }

    if (settings.autosave === true) {
        const isPassword = node.matches(`input:is(${passwordSelector})`);

        addPwmEvent(node, 'change', (event) => {
            (isPassword => saveInput(event, isPassword))(isPassword)
            if (specialWebsite && specialWebsite.keepRecalcIconPos) {
                reCalcIcon(node);
            }
        });

        let submitBtn = null;

        if (form) {
            const buttons = form.querySelectorAll('button');

            submitBtn = buttons.length === 1 ?
                buttons.item(0) :
                form.querySelector('button[type="submit"], input[type="submit"]');

            addPwmEvent(form, 'submit', submitFormHandler);
        }

        if (specialWebsite && specialWebsite.submitBtn) {
            ({submitBtn} = specialWebsite);
            submitBtn = document.querySelector(submitBtn);

            if (specialWebsite.watchDescendantBtn) {
                const toWatch = document.querySelector(specialWebsite.watchDescendantBtn);
                toWatch.addEventListener('click', (event) => {
                    let t = event.target;

                    if (t.matches(specialWebsite.submitBtn)) {
                        submitFormHandler(event);
                    }
                    else {
                        while (!t.matches(specialWebsite.submitBtn) && t !== toWatch) {
                            t = t.parentElement;
                            if (t.matches(specialWebsite.submitBtn)) {
                                submitFormHandler(event);
                            }
                        }
                    }
                }, true);
            }
        }

        if (submitBtn) {
            addPwmEvent(submitBtn, 'click', submitFormHandler);
        }
    }
}

/**
 * Creates and positions an icon element next to an input field,
 * taking into account potential overlaps with other elements.
 *
 * @function placeIcon
 * @param {HTMLInputElement} node - The input element to place the icon next to.
 * @param {HTMLElement} parent - The bounding box element for positioning reference.
 * @param {HTMLElement} iconContainer - The container element to hold the icon.
 * @param {HTMLFormElement} [form] - The form element containing the input and icon (optional).
 * @returns {void}
 */
function placeIcon(node, parent, iconContainer, form) {
    "use strict";

    // Early return if input is not displayed
    if (node.offsetHeight === 0 || node.offsetWidth === 0) {
        return;
    }

    let paddingRight = 12;
    const iconMinSize = 16;
    const {right, top, height} = node.getBoundingClientRect();
    const {top: parentTop, height: parentMaxHeight, right: parentRight} = parent.getBoundingClientRect();
    const {top: containerTop, right: containerRight} = iconContainer.getBoundingClientRect();
    let iconSize = Math.max(iconMinSize, parentMaxHeight / 2);

    // Get the overlapping element (if any)
    let inputButtonWidth = 0;

    const _evadeBlock = (x, y) => {
        const inputButton =
            getBlockedElement(x, y, iconSize, node, parent, form);
        if (inputButton) {
            const {offset: inputButtonOffset} =
                getComputedDimensions(createStyleCompute(inputButton), inputButton, 'inner');
            inputButtonWidth = parentRight - inputButton.getBoundingClientRect().left - inputButtonOffset.left;
            paddingRight = 6;

            // For case even after evading there is another blocking element
            _evadeBlock(x - inputButtonWidth, y);
        }
    };

    _evadeBlock(right - iconSize / 2 - paddingRight, top + height / 2);

    const getBoxStyle = createStyleCompute(parent);
    const containerInParent = parent !== node;
    const {
        value: boxSize,
        offset: boxOffset
    } = getComputedDimensions(getBoxStyle, parent, containerInParent ? 'inner' : 'outer');

    let icon = iconContainer.querySelector('.mega-pm-icon');

    if (!icon) {
        icon = document.createElement('i');
        icon.className = sid ? 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension' :
            'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension-disabled';
        mega.ui.setTheme(iconContainer);
        iconContainer.append(icon);
        addPwmEvent(icon, 'click', iconClick.bind(parent));
        watchTreatedInputs(node);

        // This is to prevent show password trick break password selector
        if (node.matches(passwordSelector)) {
            node.setAttribute('mega-pass-type', 'password');
        }
    }

    let pT = 0;
    let iconRight = 0;

    if (specialWebsite) {
        if (specialWebsite.iconSize) {
            iconSize = specialWebsite.iconSize;
        }

        if (specialWebsite.adjustIconPos) {
            iconRight += specialWebsite.adjustIconPos[0];
            pT += specialWebsite.adjustIconPos[1];
        }
    }
    pT += parentTop - containerTop + boxOffset.top + (boxSize.height - iconSize) / 2;
    iconRight += containerRight - right - boxOffset.left - boxOffset.right + paddingRight + inputButtonWidth;

    icon.style.right = `${iconRight}px`;
    icon.style.setProperty('--icon-size', `${iconSize}px`);
    icon.style.top = `${pT}px`;
}

function reCalcIcon(node) {
    "use strict";

    if (settings.autofill === true) {
        setTimeout(() => {
            const nodeId = node.dataset.inputLink;
            const form = node.closest('form');
            const {maybeParent, iconContainer} = calcParent(node, nodeId);
            const iconContainerShadow = iconContainer.shadowRoot;

            if (iconContainerShadow) {
                const shadowWrap = iconContainerShadow.querySelector('.mega-shadow-wrap');
                placeIcon(node, maybeParent, shadowWrap, form);
            }
        }, specialWebsite && specialWebsite.recalcIconDelay || 0);
    }
}

/**
 * Re-renders the icon when the theme or style settings change.
 * @param {HTMLInputElement} node - The input field whose associated icon needs to be updated.
 * @returns {void}
 */
function reRenderIcon(node) {
    "use strict";

    if (node.parentNode) {
        const {iconContainer} = calcParent(node, node.dataset.inputLink);
        const icon = iconContainer.shadowRoot.querySelector('.mega-pm-icon');
        if (icon) {
            icon.className = iconClasses;
        }
        mega.ui.setTheme(icon.parentElement);
    }
}

/**
 * Finds the bounding input element for a given element by traversing up its parent hierarchy.
 *
 * @function findMaxParent
 * @param {HTMLElement} curr - The starting element from which to find the bounding input element.
 * @param {Object} [options] - Optional configuration options:
 *   - {HTMLInputElement} input - The input element to find a bounding box for (defaults to `curr`).
 *   - {number} minHeight - The minimum height of the bounding box.
 *   - {number} maxWidth - The maximum width of the bounding box.
 *   - {number} maxHeight - The maximum height of the bounding box.
 * @returns {HTMLElement} The bounding input element or the original element if no suitable bounding box is found.
 */
function findMaxParent(curr, options) {
    "use strict";

    const currentBound = curr.getBoundingClientRect();

    const optionsRef = {
        input: curr,
        minHeight: currentBound.height,
        maxWidth: currentBound.width * boundingElementMaxWidthRatio,
        maxHeight: currentBound.height * boundingElementMaxHeightRatio,
        ...options
    };
    const {input, minHeight, maxWidth, maxHeight} = optionsRef;

    // Check if the current element is an input with a border or a valid label
    if (isInputWithBorder(curr, input) || isValidInputLabel(curr, input, minHeight)) {
        return curr;
    }

    // Check for invalid parent candidates
    if (isInvalidParent(curr)) {
        return curr;
    }

    // Check for valid parent based on size, content, and child overlap
    const parent = curr.parentElement;
    if (isPotentialParent(parent, minHeight, maxWidth, maxHeight)) {
        return findMaxParent(parent, optionsRef);
    }

    return curr;
}

/**
 * Checks if a given parent element is a valid candidate to be a bounding input element.
 *
 * @function isPotentialParent
 * @param {HTMLElement} parent - The parent element to check.
 * @param {number} minHeight - The minimum height required for a valid parent.
 * @param {number} maxWidth - The maximum width allowed for a valid parent.
 * @param {number} maxHeight - The maximum height allowed for a valid parent.
 * @returns {boolean} True if the parent is a valid candidate, otherwise false.
 */
function isPotentialParent(parent, minHeight, maxWidth, maxHeight) {
    "use strict";
    const {height: parentHeight, width: parentWidth} = parent.getBoundingClientRect();
    const hasTextNode = containsTextNode(parent);
    const hasOneChild = parent.childElementCount === 1;
    const childrenOverlap = allChildrenOverlap(parent, boundingElementOffset);

    return parentHeight > 0 &&
        parentHeight >= minHeight &&
        parentWidth <= maxWidth &&
        parentHeight <= maxHeight &&
        !hasTextNode &&
        (hasOneChild || childrenOverlap);
}

/**
 * Determines if all visible child elements of an element overlap, taking an offset into account.
 *
 * @function allChildrenOverlap
 * @param {HTMLElement} el - The parent element to check the overlap of its children.
 * @param {Object} offset - The offset to apply to each child element's bounding rectangle.
 *   - {number} offset.x - Horizontal offset.
 *   - {number} offset.y - Vertical offset.
 * @returns {boolean} True if all visible children overlap (with the given offset), false otherwise.
 */
function allChildrenOverlap(el, offset) {
    "use strict";

    const children = [...el.children];
    const starter = children[children[0].classList.contains('mega-pm-container') ? 1 : 0];

    if (children.length <= 1 || !starter) {
        return true;
    }

    let combinedRect = rectOffset(starter.getBoundingClientRect(), offset);

    for (let i = 1; i < children.length; i++) {
        if (children[i] === starter) {
            continue;
        }
        const childRect = rectOffset(children[i].getBoundingClientRect(), offset);
        if (!rectanglesOverlap(childRect, combinedRect)) {
            return false; // Early return if no overlap
        }
        combinedRect = combineRectangles(combinedRect, childRect);
    }

    return true;
}

/**
 * Adjusts a rectangle's position by applying an offset.
 *
 * @function rectOffset
 * @param {DOMRect} rect - The original rectangle.
 * @param {Object} offset - The offset to apply.
 * @param {number} offset.x - The x-axis offset.
 * @param {number} offset.y - The y-axis offset.
 * @returns {{top:number,right:number,bottom:number,left:number}} - The adjusted rectangle.
 */
function rectOffset(rect, offset) {
    "use strict";

    return {
        top: rect.top - offset.y,    // Subtract y offset from top
        right: rect.right + offset.x,  // Add x offset to right
        bottom: rect.bottom + offset.y,  // Add y offset to bottom
        left: rect.left - offset.x    // Subtract x offset from left
    };
}

/**
 * Helper function to check if two rectangles overlap.
 *
 * @param {{top:number,right:number,bottom:number,left:number}} rect1 - The first rectangle.
 * @param {{top:number,right:number,bottom:number,left:number}} rect2 - The second rectangle.
 * @returns {boolean} True if the rectangles overlap, false otherwise.
 */
function rectanglesOverlap(rect1, rect2) {
    "use strict";

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

/**
 * Helper function to combine two rectangles into a larger one that encompasses both.
 *
 * @param {{top:number,right:number,bottom:number,left:number}} rect1 - The first rectangle.
 * @param {{top:number,right:number,bottom:number,left:number}} rect2 - The second rectangle.
 * @returns {{top:number,right:number,bottom:number,left:number}} The combined rectangle.
 */
function combineRectangles(rect1, rect2) {
    "use strict";

    return {
        top: Math.min(rect1.top, rect2.top),
        right: Math.max(rect1.right, rect2.right),
        bottom: Math.max(rect1.bottom, rect2.bottom),
        left: Math.min(rect1.left, rect2.left)
    };
}

/**
 * Creates a function that retrieves computed style properties for a specific element.
 *
 * @function createStyleCompute
 * @param {HTMLElement} el - The HTML element to get computed styles from.
 * @returns {function} A function with the following signature:
 *   - (property: string, transformer?: function): string | any
 *      - property: The name of the CSS property to retrieve.
 *      - transformer (optional): A function to apply to the retrieved value.
 *      - Returns: The computed property value (transformed if a transformer is provided).
 */
function createStyleCompute(el) {
    "use strict";

    const style = getComputedStyle(el);

    return function(property, transformer) {
        const value = style.getPropertyValue(property);
        return transformer ? transformer(value) : value;
    };
}

/**
 * Finds the HTML element that is directly overlayed at the specified coordinates
 * within the given form and input box context.
 *
 * @function getBlockedElement
 * @param {number} x - The x-coordinate of the point to check.
 * @param {number} y - The y-coordinate of the point to check.
 * @param {number} iconSize - The size of the icon to be placed.
 * @param {HTMLElement} input - The input element for reference.
 * @param {HTMLElement} inputBox - The input box element for reference.
 * @param {HTMLElement} form - The form element containing the overlayed element.
 * @returns {HTMLElement|null} The overlayed HTMLElement if found, otherwise null.
 */
function getBlockedElement(x, y, iconSize, input, inputBox, form) {
    "use strict";

    if (isNaN(x) || isNaN(y)) {
        return null;
    }

    const maxWidth = inputBox.offsetWidth;
    const overlays = new Set([
        ...document.elementsFromPoint(x + iconSize / 2, y),
        ...document.elementsFromPoint(x, y)
    ]);

    let res = null;

    for (const el of overlays) {
        if (form && !form.contains(el)) {
            continue;
        }
        if (el === input) {
            continue;
        }
        // Exclude non-HTMLElement and SVG elements
        if (!(el instanceof HTMLElement || el instanceof SVGSVGElement) || el.matches('svg *')) {
            continue;
        }

        // Exclude our own injected elements
        if (el.matches('.mega-pm-container, .mega-pm-icon')) {
            continue;
        }

        // Exclude "placeholder" overlays
        if (el.offsetWidth === 0 || el.offsetWidth >= maxWidth * 0.85) {
            continue;
        }

        res = el;
    }

    return res;
}

/**
 * Calculates the computed dimensions (height and width) of an element,
 * taking into account box-sizing, padding, and border.
 *
 * @function getComputedDimensions
 * @param {function} boundCompute - A function that retrieves computed style properties of the element.
 * @param {HTMLElement} node - The HTML element to calculate dimensions for.
 * @param {'inner' | 'outer'} mode - The mode for calculating dimensions:
 *   - 'inner': Includes only the content area (excluding padding and border).
 *   - 'outer': Includes content, padding, and border.
 * @returns {Object} An object containing the computed dimensions and offsets:
 *   - value: { height: number, width: number } - The computed height and width values.
 *   - offset: { top: number, bottom: number, left: number, right: number } - The top, bottom, left, and right offsets
 *   (including padding and border) in pixels.
 */
function getComputedDimensions(boundCompute, node, mode) {
    "use strict";

    const isContentBox = boundCompute('box-sizing') === 'content-box';

    const dimensions = {
        height: boundCompute('height', (height) =>
            height === 'auto' || !height ? node.offsetHeight : parseSize(height)
        ),
        width: boundCompute('width', (width) =>
            width === 'auto' || !width ? node.offsetWidth : parseSize(width)
        )
    };

    // Get padding and border values (assuming you have parseSize function)
    const padding = {
        top: boundCompute('padding-top', parseSize),
        bottom: boundCompute('padding-bottom', parseSize),
        left: boundCompute('padding-left', parseSize),
        right: boundCompute('padding-right', parseSize)
    };
    const border = {
        top: boundCompute('border-top', parseSize),
        bottom: boundCompute('border-bottom', parseSize),
        left: boundCompute('border-left', parseSize),
        right: boundCompute('border-right', parseSize)
    };

    const offset = {
        height: padding.top + border.top + padding.bottom + border.bottom,
        width: padding.left + border.left + padding.right + border.right
    };

    // Calculate height and width based on box-sizing and mode
    return {
        value: {
            height: isContentBox ?
                dimensions.height + (mode === 'outer' ? offset.height : 0) :
                dimensions.height - (mode === 'inner' ? offset.height : 0),
            width: isContentBox ?
                dimensions.width + (mode === 'outer' ? offset.width : 0) :
                dimensions.width - (mode === 'inner' ? offset.width : 0)
        },
        offset: {
            top: mode === 'outer' ? 0 : padding.top + border.top,
            bottom: mode === 'outer' ? 0 : padding.bottom + border.bottom,
            left: mode === 'outer' ? 0 : padding.left + border.left,
            right: mode === 'outer' ? 0 : padding.right + border.right
        }
    };
}

/**
 * Checks if an element has at least one non-empty text node as a child.
 *
 * @function containsTextNode
 * @param {HTMLElement} element - The element to check for text nodes.
 * @returns {boolean} - True if the element contains a non-empty text node, otherwise false.
 */
function containsTextNode(element) {
    "use strict";

    return [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '');
}

/**
 * Checks if an input element has a bottom border.
 *
 * @function isInputWithBorder
 * @param {HTMLElement} element - The element to check.
 * @param {HTMLInputElement} input - The input element reference.
 * @returns {boolean} - True if the element is the input and has a bottom border, otherwise false.
 */
function isInputWithBorder(element, input) {
    "use strict";
    return element === input && parseSize(getComputedStyle(element).borderBottomWidth) !== 0;
}

/**
 * Checks if an element is a valid input label.
 *
 * @function isValidInputLabel
 * @param {HTMLElement} element - The element to check.
 * @param {HTMLInputElement} input - The input element reference.
 * @param {number} minHeight - The minimum height required for the label.
 * @returns {boolean} - True if the element is a valid input label, otherwise false.
 */
function isValidInputLabel(element, input, minHeight) {
    "use strict";
    if (element !== input) {
        return false;
    }
    const label = element.closest('label');
    return label &&
        label.querySelectorAll('input:not([type="hidden"])').length === 1 &&
        label.getBoundingClientRect().height >= minHeight &&
        allChildrenOverlap(label, boundingElementOffset);
}

/**
 * Checks if an element's parent is considered an invalid bounding element.
 *
 * @function isInvalidParent
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} - True if the element's parent is invalid, otherwise false.
 */
function isInvalidParent(element) {
    "use strict";
    const parent = element.parentElement;
    return invalidBoundingTags.has(parent.tagName);
}

/**
 * Parses a CSS size string (e.g., "10px") into a number representing the pixel value.
 *
 * @function parseSize
 * @param {string} value - The CSS size string to parse.
 * @returns {number} - The pixel value of the size.
 */
function parseSize(value) {
    "use strict";
    return parseFloat(value.replace('px', '')) || 0;
}

// function that remove all injected elements from the DOM
function removeInjectedElements() {
    "use strict";
    const megaPmElements = document.querySelectorAll('.mega-pm-container');
    megaPmElements.forEach((el) => el.parentNode.removeChild(el));
}
