import { d as defineComponent, s as script$9, r as resolveComponent, w as withDirectives, v as vShow, c as createElementBlock, a as createBlock, b as withCtx, e as resolveDynamicComponent, f as createBaseVNode, g as createVNode, n as normalizeClass, h as withModifiers, t as toDisplayString$1, i as normalizeStyle, j as createCommentVNode, k as createApp, l as i18n, o as openBlock, m as createTextVNode, T as Transition } from '../chunks/AutStylesheet-2c420ffc.js';
import { s as script$7, u as useShortcut } from '../chunks/AutButton-9a5afc83.js';
import { s as script$4$1, a as script$3$1, b as script$2$1, c as script$5$1, d as script$6$1, e as script$7$1, f as script$a } from '../chunks/AutTooltip-eab14967.js';
import { c as config } from '../chunks/config-93ca10ad.js';
import { s as syncedStorage, e as eventBus } from '../chunks/event-bus-eb77ec2c.js';
import { s as script$8 } from '../chunks/AutLogo-574084e3.js';

var script$6 = defineComponent({
    render: () => null,
    emits: [
        'manufacture-article-number-hover',
        'manufacture-article-number-leave',
        'password-field-detection',
        'order-reference-detection',
        'article-number-detection',
        'portal-detection',
        'cart-detection',
        'vin-detection',
    ],
    data() {
        return {
            defaults: {
                manufacturerArticleNumberStyleModifier: {
                    display: 'inline-block',
                    padding: '3px 6px',
                    margin: '-3px 6px -3px -6px',
                    borderBottom: '2px dashed #21DB6B',
                },
            },
            config,
            debounce: null,
            hoverTimeout: null,
            debugHashes: {},
        };
    },
    mounted() {
        this.hookIntoPageStructure();
    },
    methods: {
        /**
         * Retrieves the configuration value.
         * @param {T | T[]} value - The value to be retrieved from the configuration.
         * @return {T[]} - The retrieved value.
         */
        getConfigValue(value) {
            return !Array.isArray(value)
                ? [value]
                : value;
        },
        /**
         * Retrieves the password field configuration for the current site.
         * @returns {PasswordFieldConfig | undefined} The password field configuration for the current site, or undefined if not found.
         */
        getPasswordFieldConfigForCurrentSite() {
            return this.config.passwordField.find((passwordField) => {
                return this.getConfigValue(passwordField.whitelistRegex).filter((whitelistRegex) => {
                    if (whitelistRegex.test(window.location.href)) {
                        return true;
                    }
                }).length;
            });
        },
        /**
         * Retrieves the product detail configuration for the current site.
         * @returns {ProductDetailConfig[]} The product detail configurations for the current site.
         */
        getProductDetailConfigForCurrentSite() {
            return this.config.productDetail.filter((productDetail) => {
                return this.getConfigValue(productDetail.whitelistRegex).filter((whitelistRegex) => {
                    if (whitelistRegex.test(window.location.href)) {
                        return true;
                    }
                }).length;
            });
        },
        /**
         * Retrieves the cart configuration for the current site.
         * @returns {CartConfig[]} An array of cart configurations that match the current site.
         */
        getCartConfigForCurrentSite() {
            return this.config.cart.filter((cart) => {
                return this.getConfigValue(cart.whitelistRegex).filter((whitelistRegex) => {
                    if (whitelistRegex.test(window.location.href)) {
                        return true;
                    }
                }).length;
            });
        },
        /**
         * Returns an array of HTMLElements that represent password fields within the provided root element.
         * @param {HTMLElement} rootElement - The root element to search within.
         * @return {ElementWithSelector[]} - An array of objects, where each object contains an HTMLElement and its selector.
         */
        getPasswordFieldElements(rootElement) {
            const selector = 'input[type="password"]';
            const elements = this.deepQuerySelectorAll(rootElement, selector);
            return elements.map((element) => ({ element, selector }));
        },
        /**
         * Retrieves an array of HTMLElements with their corresponding AttributeSelectors for the given manufacturer article number configuration.
         * @param {AbstractConfig} config - The configuration object.
         * @param {HTMLElement} rootElement - The root element to search for matching elements.
         * @return {ElementWithSelector[]} - An array of objects, each containing an element and its selector.
         */
        getManufactureArticleNumberElements(config, rootElement) {
            return this.getConfigValue(config.manufacturerArticleNumber)
                .flatMap((selector) => this.getElementsWithSelector(rootElement, selector).elements)
                .filter((element) => !!element);
        },
        /**
         * Retrieves the manufacturer article number from the given element based on the provided configuration.
         * @param {CartConfig} config - The cart configuration object.
         * @param {ElementWithSelector} elementWithSelector - The element and selector to retrieve the article number from.
         * @returns {string|null} - The manufacturer article number or null if it cannot be determined.
         */
        getManufactureArticleNumber(config, { element, selector }) {
            let value = this.getElementValue(element, selector);
            if (config.manufacturerArticleNumberRegex) {
                value = this.extractRegexMatches(value, config.manufacturerArticleNumberRegex);
            }
            return value;
        },
        /**
         * Retrieves brand elements based on the provided configuration and manufacturer article number element.
         * @param {CartConfig} config - The configuration object containing the brand details.
         * @param {HTMLElement} manufacturerArticleNumber - The HTML element representing the manufacturer article number.
         * @return {ElementWithSelector[]} - An array of objects, each containing an element and its selector.
         */
        getBrandElements(config, manufacturerArticleNumber) {
            if (!config.brand)
                return [];
            return this.getConfigValue(config.brand)
                .map((selector) => this.getClosestElements(manufacturerArticleNumber.element, selector))
                .sort((a, b) => a.level - b.level)
                .flatMap(({ items, selector }) => items.map((item) => ({ element: item, selector })))
                .filter((element) => !!element);
        },
        /**
         * Retrieves the brand from the given configuration and manufacturer article number element.
         * @param {CartConfig} config - The configuration object.
         * @param {ElementWithSelector} manufacturerArticleNumber - The manufacturer article number element.
         * @returns {string | null} - The brand value or null if not found.
         */
        getBrand(config, manufacturerArticleNumber) {
            return this.getBrandElements(config, manufacturerArticleNumber)
                ?.map(({ element, selector }) => {
                let value = this.getElementValue(element, selector);
                if (config.brandRegex) {
                    value = this.getConfigValue(config.brandRegex)
                        .map((brandRegex) => value.match(brandRegex)?.groups?.value)
                        .filter((value) => !!value)?.[0] || '';
                }
                return value;
            })?.map(this.sanitizeValue)?.filter((vin) => !!vin)?.[0] || null;
        },
        /**
         * Retrieves an array of HTMLElements that match the given configuration and manufacturerArticleNumberElement.
         * @param {AbstractConfig} config - The configuration object.
         * @param {ElementWithSelector} manufacturerArticleNumber - The element used to find matching elements.
         * @return {ElementWithSelector[]} - An array of objects, each containing an element and its selector.
         */
        getQuantityElements(config, manufacturerArticleNumber) {
            if (!config.quantity)
                return [];
            return this.getConfigValue(config.quantity)
                .map((selector) => this.getClosestElements(manufacturerArticleNumber.element, selector))
                .sort((a, b) => a.level - b.level)
                .flatMap(({ items, selector }) => items.map((item) => ({ element: item, selector })))
                .filter((element) => !!element);
        },
        /**
         * Retrieves the quantity of a product based on the given configuration and manufacturer article number element.
         * @param {AbstractConfig} config - The configuration object for retrieving the quantity.
         * @param {ElementWithSelector} manufacturerArticleNumber - The element representing the manufacturer article number.
         * @return {number | null} - The quantity of the product as a number, or null if the quantity cannot be determined.
         */
        getQuantity(config, manufacturerArticleNumber) {
            return this.getQuantityElements(config, manufacturerArticleNumber)
                ?.map(({ element, selector }) => {
                let value = this.getElementValue(element, selector);
                if (config.quantityRegex) {
                    value = this.getConfigValue(config.quantityRegex)
                        .map((quantityRegex) => value.match(quantityRegex)?.groups?.value)
                        .filter((value) => !!value)?.[0] || '1';
                }
                return parseInt(value?.replace(/,/g, '.') || '1');
            })?.filter((vin) => !!vin)?.[0] || null;
        },
        /**
         * Retrieves category elements based on the provided configuration and manufacturer article number.
         * @param {CartConfig} config - The configuration for the cart.
         * @param {ElementWithSelector} manufacturerArticleNumber - The element with selector for the manufacturer article number.
         * @returns {ElementWithSelector[]} - An array of category elements.
         */
        getCategoryElements(config, manufacturerArticleNumber) {
            if (!config.category)
                return [];
            return this.getConfigValue(config.category)
                .map((selector) => this.getClosestElements(manufacturerArticleNumber.element, selector))
                .sort((a, b) => a.level - b.level)
                .flatMap(({ items, selector }) => items.map((item) => ({ element: item, selector })))
                .filter((element) => !!element);
        },
        /**
         * Retrieves the category for a given configuration and manufacturer article number.
         * @param {CartConfig} config - The configuration object.
         * @param {ElementWithSelector} manufacturerArticleNumber - The manufacturer article number.
         * @returns {string | null} The category, or null if not found.
         */
        getCategory(config, manufacturerArticleNumber) {
            return this.getCategoryElements(config, manufacturerArticleNumber)
                ?.map(({ element, selector }) => {
                let value = this.getElementValue(element, selector);
                if (config.categoryRegex) {
                    value = this.getConfigValue(config.categoryRegex)
                        .map((categoryRegex) => value.match(categoryRegex)?.groups?.value)
                        .filter((value) => !!value)?.[0] || '';
                }
                return value;
            })?.map(this.sanitizeValue)?.filter((vin) => !!vin)?.[0] || null;
        },
        /**
         * Retrieves vehicle identification number elements based on the provided configuration.
         * @param {AbstractConfig} config - The configuration object containing the vehicle identification number.
         * @return {ElementWithSelector[]} - An array of objects, each containing an element and its selector.
         */
        getVehicleIdentificationNumberElements(config) {
            if (!config.vehicleIdentificationNumber)
                return [];
            return this.getConfigValue(config.vehicleIdentificationNumber)
                .flatMap((selector) => this.getElementsWithSelector(document.body, selector).elements)
                .filter((element) => !!element);
        },
        /**
         * Retrieves an array of HTML elements based on the provided configuration.
         * @param {CartConfig} config - The configuration object.
         * @return {ElementWithSelector[]} - An array of objects, each containing an element and its selector.
         */
        getOrderReferenceElements(config) {
            if (!config.orderReference)
                return [];
            return this.getConfigValue(config.orderReference)
                .flatMap((selector) => this.getElementsWithSelector(document.body, selector).elements)
                .filter((element) => !!element);
        },
        /**
         * Retrieves the Vehicle Identification Number (VIN) based on the given configuration.
         * @param {AbstractConfig} config - The configuration object used to retrieve the VIN.
         * @returns {string | null} - The VIN value if found, or null if not found.
         */
        getVehicleIdentificationNumber(config) {
            // Try to find VIN in dom elements.
            let matchingVehicleIdentificationNumber = this.getVehicleIdentificationNumberElements(config)
                ?.map(({ element, selector }) => this.getElementValue(element, selector))
                ?.map((vin) => this.extractRegexMatches(vin, config.vehicleIdentificationNumberRegex))
                ?.filter((vin) => !!vin && vin?.match(this.config.vinRegex))?.[0] || null;
            if (!matchingVehicleIdentificationNumber && config.vehicleIdentificationNumberUrlRegex) {
                // Collect all urls of current page.
                const urls = [window.location.href, ...['src', 'href'].flatMap((type) => {
                        return this.deepQuerySelectorAll(document, `[${type}]`)
                            .map((element) => element.getAttribute(type));
                    })];
                // Try to find matching VIN in urls.
                matchingVehicleIdentificationNumber = this.getConfigValue(config.vehicleIdentificationNumberUrlRegex)
                    .flatMap((regex) => urls.flatMap((url) => url?.match(regex)?.groups?.value))
                    .filter((value, index, self) => !!value && self.indexOf(value) === index)?.[0] || null;
            }
            return matchingVehicleIdentificationNumber;
        },
        /**
         * Returns the first non-empty order reference value from the given configuration.
         * If no order reference value is found, it returns null.
         * @param {CartConfig} config - The configuration object containing the order reference elements.
         * @return {string | null} - The first non-empty order reference value, or null if not found.
         */
        getOrderReference(config) {
            return this.getOrderReferenceElements(config)
                ?.map(({ element, selector }) => {
                let value = this.getElementValue(element, selector);
                if (config.orderReferenceRegex) {
                    value = this.getConfigValue(config.orderReferenceRegex)
                        .map((orderReferenceRegex) => value.match(orderReferenceRegex)?.groups?.value)
                        .filter((value) => !!value)?.[0] || '';
                }
                // Clean up the value by removing empty, undefined or whitespace-only parts, and join the remaining parts.
                value = value.split('\n').map((v) => v.trim()).filter((v) => v && v !== 'undefined').join(' ');
                return value;
            })?.filter((orderReference) => !!orderReference)?.[0] || null;
        },
        /**
         * Extracts regex matches from a given string value.
         * @param {string} value - The string value to search for matches.
         * @param {RegExp | RegExp[]} regexConfig - The regular expression(s) to match against the value.
         * @return {string} - The extracted value from the match(s). If no match is found, returns the original value.
         */
        extractRegexMatches(value, regexConfig) {
            if (!regexConfig)
                return value;
            let extractedValue = value;
            for (const regex of this.getConfigValue(regexConfig)) {
                extractedValue = regex && extractedValue?.match(regex)?.groups?.value || extractedValue;
            }
            return extractedValue;
        },
        /**
         * Sanitizes the given value by replacing newline characters, tab characters,
         * and extra spaces with a single space, and then trims the resulting string.
         * @param {string} value - The value to be sanitized.
         * @return {string} The sanitized value.
         */
        sanitizeValue(value) {
            return value
                .replace(/[\n\t ]/g, ' ')
                .replace(/ {2,}/g, ' ')
                .trim();
        },
        /**
         * Returns the value of an HTML element.
         * @param {HTMLElement} element - The HTML element.
         * @param {AttributeSelector} [selector] - An optional attribute selector to narrow down the search.
         * @returns {string} The value of the element, or null if no value is found.
         */
        getElementValue(element, selector) {
            if (selector?.attribute)
                return element.getAttribute(selector.attribute)?.trim() || '';
            const isFormElement = element instanceof HTMLInputElement || element instanceof HTMLSelectElement;
            if (isFormElement)
                return element.value.trim();
            return element.innerText.trim();
        },
        /**
         * Retrieves the closest elements to the given element based on a selector.
         * @param {HTMLElement} element - The element to start the search from.
         * @param {string} selector - The selector used to find the closest elements.
         * @param {number} [level=0] - The current level of closeness (used for recursion).
         * @return {ClosestElementResponse} - An object containing the level of closeness and an array of closest elements.
         */
        getClosestElements(element, selector, level = 0) {
            // Get parent element if available.
            const parentElement = element?.parentElement;
            const elementsWithSelector = this.getElementsWithSelector(document, selector);
            const matchingElements = elementsWithSelector.elements.map(({ element }) => element);
            const matchingSelector = elementsWithSelector.selector || selector;
            if (!parentElement)
                return { level, items: matchingElements, selector: matchingSelector };
            // Helper function to get the previous sibling element first.
            const getChildElementOfPreviousSibling = (element, selector) => {
                const previousElement = element?.previousElementSibling;
                if (!previousElement)
                    return [];
                const previousChildElements = this.getElementsWithSelector(previousElement, selector);
                if (previousChildElements.elements.length)
                    return previousChildElements.elements.map(({ element }) => element);
                if (previousElement)
                    return getChildElementOfPreviousSibling(previousElement, selector);
                return [];
            };
            // Check if child elements are closest elements.
            const childElements = this.getElementsWithSelector(parentElement, selector);
            const matchingChildElements = childElements.elements.map(({ element }) => element);
            const matchingChildSelector = childElements.selector || selector;
            const previousChildElements = getChildElementOfPreviousSibling(element, selector);
            if (previousChildElements.length)
                return { level, items: previousChildElements, selector };
            if (childElements.elements.length)
                return { level, items: matchingChildElements, selector: matchingChildSelector };
            // As long as parent element is available repeat the process.
            return this.getClosestElements(parentElement, selector, ++level);
        },
        /**
         * Hooks into the page structure to observe any changes in the DOM.
         * @return {void}
         */
        hookIntoPageStructure() {
            if (this.getPasswordFieldConfigForCurrentSite() ||
                this.getProductDetailConfigForCurrentSite().length ||
                this.getCartConfigForCurrentSite().length) {
                // Initial parse of the element structure.
                this.parseElementStructure(document.body);
                // Parse element structure for all input and textarea changes.
                this.deepQuerySelectorAll(document, 'input, textarea').forEach((element) => {
                    element.addEventListener('change', () => this.parseElementStructure(document.body));
                });
                // Observe changes in the DOM.
                const mutationObserver = new MutationObserver(this.observeDomChanges);
                mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
            }
        },
        /**
         * Observes changes in the DOM and parses the element structure of mutated records.
         * @param {MutationRecord[]} records - The array of mutated records.
         * @return {void}
         */
        observeDomChanges(records) {
            // Get mutated records which are not related to auteon plugin.
            const mutatedRecords = records.filter((record) => {
                if (record.type === 'characterData')
                    return true;
                const target = record?.target;
                return target instanceof HTMLElement &&
                    !document.querySelector('#app-auteon-plugin')?.contains(target) &&
                    !target?.id?.match(/auteon/) &&
                    !target?.className?.match(/auteon/) &&
                    !target?.hasAttribute('data-auteon');
            });
            // Parse element structure if mutated value records are available.
            if (mutatedRecords.length) {
                window.requestAnimationFrame(() => {
                    this.parseElementStructure(document.body);
                });
            }
        },
        /**
         * Retrieves a list of elements matching a selector, including elements within shadow DOM.
         * @param {Node | HTMLElement | ShadowRoot} scope - The scope from which to search for elements.
         * @param {string} selector - The selector to match elements against.
         * @returns {HTMLElement[]} - An array of matching elements.
         */
        deepQuerySelectorAll(scope, selector) {
            // Prepare selector and selector parts.
            const selectorParts = selector.split(/\/deep\//).map((part) => part.trim());
            const currentSelector = selectorParts.shift();
            if (!currentSelector)
                return [];
            // Get elements from current scope.
            const elements = Array.from(scope?.querySelectorAll(currentSelector));
            // Get elements from shadow root if available.
            return elements.flatMap((element) => {
                // If no more parts are available return the element.
                if (!selectorParts.length)
                    return [element];
                // If shadow root is not available return empty array.
                if (!element.shadowRoot)
                    return [];
                // Build new selector parts for shadow root.
                const shadowSelectorParts = selectorParts.join('/deep/');
                // Return elements from shadow root.
                return this.deepQuerySelectorAll(element.shadowRoot, shadowSelectorParts);
            });
        },
        /**
         * Retrieves elements from the specified rootElement that match the given attribute selector.
         * @param {Node | HTMLElement | ShadowRoot} rootElement - The root element from which to start the search.
         * @param {AttributeSelector} selector - The attribute selector to match against.
         * @returns {HTMLElement[]} - An array of elements that match the attribute selector.
         */
        getElementsWithSelector(rootElement, selector) {
            // Check if first matching selector is not available.
            if (!selector?.firstMatchingSelector?.length) {
                // Get all possible elements for selector and return elements with selector.
                const elements = this.deepQuerySelectorAll(rootElement, selector?.selector || selector);
                return {
                    elements: elements.map((element) => ({ element, selector })),
                    selector: selector,
                };
            }
            // Check if first matching selector is available.
            if (selector?.firstMatchingSelector?.length) {
                // Get all elements for first matching selector.
                // If one selector matches ignore all other selectors.
                for (const firstMatchingSelector of selector.firstMatchingSelector) {
                    const elements = this.deepQuerySelectorAll(rootElement, firstMatchingSelector);
                    if (elements.length) {
                        return {
                            elements: elements.map((element) => ({ element, selector: firstMatchingSelector })),
                            selector: firstMatchingSelector,
                        };
                    }
                }
            }
            // Return empty response because no matching elements are found.
            return { elements: [] };
        },
        /**
         * Parses the structure of an element to extract relevant information.
         * @param {HTMLElement} element - The HTML element to parse.
         * @return {void}
         */
        async parseElementStructure(element) {
            // Handle password field detection.
            const passwordFieldConfig = this.getPasswordFieldConfigForCurrentSite();
            const passwordFieldElements = this.getPasswordFieldElements(element);
            passwordFieldElements.forEach(({ element }) => {
                const clientRect = element?.getBoundingClientRect();
                const isValid = clientRect?.x && clientRect?.y && clientRect?.width && clientRect?.height;
                if (isValid)
                    this.$emit('password-field-detection', { config: passwordFieldConfig, element });
            });
            // Define variables which will possibly be detected.
            let orderReference = null;
            let vehicleIdentificationNumber = null;
            // Handle article number detection.
            const isArticleNumberDetectionDisabled = await syncedStorage.contains('disabledArticleNumberDetection', window.location.hostname);
            if (!isArticleNumberDetectionDisabled) {
                const productDetailConfig = this.getProductDetailConfigForCurrentSite();
                for (const config of productDetailConfig) {
                    this.tryDetectPortal(config);
                    const manufacturerArticleNumberElements = this.getManufactureArticleNumberElements(config, element)
                        .map((element) => this.addManufactureArticleNumberHoverEvent(config, element.element) ? element : undefined)
                        .filter((element) => !!element);
                    // const manufacturerArticleNumberElements = this.getManufactureArticleNumberElements(config, element)
                    // manufacturerArticleNumberElements.forEach(({ element }) => this.addManufactureArticleNumberHoverEvent(config, element))
                    orderReference = this.getOrderReference(config);
                    vehicleIdentificationNumber = this.getVehicleIdentificationNumber(config);
                    this.$emit('order-reference-detection', orderReference);
                    this.$emit('vin-detection', vehicleIdentificationNumber);
                    this.$emit('article-number-detection', manufacturerArticleNumberElements.map((element) => ({
                        vehicleIdentificationNumber: vehicleIdentificationNumber,
                        manufactureArticleNumber: this.getManufactureArticleNumber(config, element),
                        quantity: this.getQuantity(config, element),
                        category: this.getCategory(config, element),
                    })));
                    if (orderReference || vehicleIdentificationNumber) {
                        this.debugOutput('reference-and-vin', { orderReference, vehicleIdentificationNumber });
                    }
                }
            }
            // Handle cart products detection.
            const cartConfig = this.getCartConfigForCurrentSite();
            for (const config of cartConfig) {
                const cartItems = [];
                const manufacturerArticleNumberElements = this.getManufactureArticleNumberElements(config, element);
                for (const manufacturerArticleNumberElement of manufacturerArticleNumberElements) {
                    const manufacturer = this.getManufactureArticleNumber(config, manufacturerArticleNumberElement);
                    const brand = this.getBrand(config, manufacturerArticleNumberElement);
                    const quantity = this.getQuantity(config, manufacturerArticleNumberElement);
                    const category = this.getCategory(config, manufacturerArticleNumberElement);
                    if (manufacturer) {
                        cartItems.push({
                            manufacturer,
                            brand,
                            quantity,
                            category,
                        });
                    }
                }
                const emitEvents = () => {
                    orderReference = this.getOrderReference(config) || orderReference;
                    vehicleIdentificationNumber = this.getVehicleIdentificationNumber(config) || vehicleIdentificationNumber;
                    this.$emit('cart-detection', { config, cartItems });
                    this.$emit('order-reference-detection', orderReference);
                    this.$emit('vin-detection', vehicleIdentificationNumber);
                    if (cartItems?.length) {
                        this.debugOutput('cart-items', { cartItems, orderReference, vehicleIdentificationNumber });
                    }
                };
                // If no cart items can be found wait for a short time to emit the events.
                const debounceTime = !cartItems.length ? 2000 : 0;
                if (this.debounce)
                    clearTimeout(this.debounce);
                if (debounceTime)
                    this.debounce = setTimeout(emitEvents, debounceTime);
                if (!debounceTime)
                    emitEvents();
            }
            // Emit empty cart detection if no cart items are found.
            if (!cartConfig?.length) {
                this.$emit('cart-detection', null);
            }
        },
        /**
         * Tries to detect the portal based on the provided configuration.
         * @param {ProductDetailConfig} config - The configuration object.
         * @returns {void}
         */
        tryDetectPortal(config) {
            if (!config?.portalIdentifier)
                return;
            if (document.body.hasAttribute('data-auteon-portal'))
                return;
            const portalIdentifier = Object.entries(config.portalIdentifier);
            for (const [key, value] of portalIdentifier) {
                if (!key || !value)
                    continue;
                const elements = this.getElementsWithSelector(document, value).elements;
                if (elements.length) {
                    document.body.setAttribute('data-auteon-portal', key);
                    this.$emit('portal-detection', key);
                }
            }
        },
        /**
         * Adds a hover event to a given element for the manufacturer article number.
         * @param {ProductDetailConfig} config - The configuration object for the product detail.
         * @param {HTMLElement} element - The HTML element to attach the hover event to.
         * @return {void}
         */
        addManufactureArticleNumberHoverEvent(config, element) {
            // Only parse element once.
            if (element.hasAttribute('data-auteon'))
                return false;
            element.setAttribute('data-auteon', 'article-number');
            // Helper function to get first text node from an element.
            const getFirstTextNode = (node, recursive = false) => {
                if (node.nodeType === Node.TEXT_NODE && !recursive)
                    return;
                if (node.nodeType === Node.TEXT_NODE && recursive)
                    return node;
                return Array.from(node.childNodes).flatMap((childNode) => getFirstTextNode(childNode, true))?.[0];
            };
            // Try to get first text node and their parent node of target element.
            const textNode = getFirstTextNode(element);
            const parentNode = textNode?.parentNode;
            if (!textNode || !parentNode)
                return false;
            // Stop if text node has no content.
            const hasContent = !!textNode?.textContent?.trim();
            if (!hasContent)
                return false;
            // Wrap content of element in a div.
            const newTextNode = document.createTextNode(textNode.textContent || '');
            const wrapper = document.createElement('span');
            wrapper.appendChild(newTextNode);
            parentNode.replaceChild(wrapper, textNode);
            // Apply config styles.
            const styles = [this.defaults.manufacturerArticleNumberStyleModifier, config.manufacturerArticleNumberStyleModifier].filter((style) => !!style);
            styles.forEach((style) => Object.entries(style).forEach(([key, value]) => wrapper.style[key] = value));
            // Add mouse enter event listener.
            wrapper.addEventListener('mouseenter', (event) => {
                this.hoverTimeout = setTimeout(() => {
                    const targetElement = { element: event?.target };
                    const manufactureArticleNumber = this.getManufactureArticleNumber(config, targetElement);
                    const quantity = this.getQuantity(config, targetElement);
                    const category = this.getCategory(config, targetElement);
                    const vehicleIdentificationNumber = this.getVehicleIdentificationNumber(config);
                    this.$emit('vin-detection', vehicleIdentificationNumber);
                    this.$emit('manufacture-article-number-hover', event, manufactureArticleNumber, quantity, category);
                    this.debugOutput('hovered-article', { manufactureArticleNumber, quantity, category, vehicleIdentificationNumber });
                }, 500);
            });
            // Add mouse leave event listener.
            wrapper.addEventListener('mouseleave', (event) => {
                if (this.hoverTimeout)
                    clearTimeout(this.hoverTimeout);
                this.$emit('manufacture-article-number-leave', event);
            });
            return true;
        },
        /**
         * Outputs debug information in the console.
         * It only outputs the information if the VUE_APP_DEBUG environment variable is set.
         * It only outputs the information if the hash of the output has changed.
         * @param {string} identifier - A string identifier for the debug output.
         * @param {*} output - The debug output to be displayed in the console.
         * @return {void}
         */
        debugOutput(identifier, output) {
            return;
        },
    },
});

script$6.__file = "src/content-scripts/AutPageObserver.vue";

var script$5 = defineComponent({
    name: 'AutCartToolbar',
    components: {
        AutLoadingIcon: script$4$1, AutSuccessIcon: script$3$1, AutErrorIcon: script$2$1,
        AutInput: script$5$1, AutChevronRightIcon: script$6$1,
        AutButton: script$7,
        AutLogo: script$8,
        AutStylesheet: script$9,
    },
    props: {
        detectedCart: {
            type: Object,
            required: false,
            default: null,
        },
        orderReference: {
            type: String,
            required: false,
            default: null,
        },
        vin: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            reference: null,
            isReferenceChangedByUser: false,
            isToolbarMounted: false,
            state: 'default',
            auteonUrl: null,
        };
    },
    computed: {
        cartItems() {
            return this.detectedCart?.cartItems || [];
        },
        config() {
            return this.detectedCart?.config;
        },
        styles() {
            if (!this.config?.toolbarStyleModifier)
                return '';
            const cssStyleDeclaration = document.createElement('div').style;
            Object.entries(this.config?.toolbarStyleModifier).forEach(([key, value]) => cssStyleDeclaration[key] = value);
            return cssStyleDeclaration?.cssText || '';
        },
        toolbarHeight() {
            return this.cartItems.length ? '40px' : '0';
        },
    },
    watch: {
        config: {
            immediate: true,
            deep: true,
            handler(config) {
                if (this.isToolbarMounted && !this.cartItems.length)
                    return this.isToolbarMounted = false;
                if (!config || !!this.isToolbarMounted)
                    return;
                this.isToolbarMounted = true;
                // Get shadow wrapper and target dom element.
                const shadow = this.$refs.shadow;
                const target = document.querySelector(this.config?.target || 'body') || document.body;
                // Apply styles to dom elements if defined.
                // This is eventually required to position content a bit below the toolbar.
                // So we can manually adjust dom elements of the target site.
                if (this.config?.domStyleModifier) {
                    Object.entries(this.config?.domStyleModifier || {}).forEach(([selector, styles]) => {
                        const elements = Array.from(document.querySelectorAll(selector));
                        elements.forEach((element) => Object.entries(styles).forEach(([key, value]) => element.style[key] = value));
                    });
                }
                // Prepend to target dom.
                target.prepend(shadow);
            },
        },
        /**
         * If detected card object has changed then
         * the state will be reset.
         */
        detectedCart: {
            immediate: true,
            deep: true,
            handler(newDetectedCart, oldDetectedCart) {
                if (JSON.stringify(newDetectedCart) === JSON.stringify(oldDetectedCart))
                    return;
                this.state = 'default';
            },
        },
        /**
         * Update reference as long as user has not
         * changed the reference by self.
         */
        orderReference: {
            immediate: true,
            handler(orderReference) {
                if (this.isReferenceChangedByUser)
                    return;
                this.reference = orderReference || document?.title?.slice(0, 30) || '';
            },
        },
    },
    mounted() {
        // Get shadow wrapper, tooltip component and styles.
        const shadow = this.$refs.shadow;
        const toolbar = this.$refs.toolbar;
        // Create shadow tree and append tooltip component and styles to it.
        shadow.attachShadow({ mode: 'open' });
        shadow.shadowRoot?.appendChild(toolbar);
    },
    methods: {
        /**
         * Opens the Auteon URL in a new browser tab.
         * @returns {void}
         */
        async openAuteonUrl() {
            const targetUrl = this.auteonUrl || "https://portal.auteon.com" || '';
            await eventBus.emitAuteonPortalEvent({ name: 'open-url', payload: targetUrl, focus: true });
        },
        /**
         * Marks the reference as changed by the user.
         * @return {void}
         */
        markAsChanged() {
            this.isReferenceChangedByUser = true;
        },
        /**
         * Performs a search using the given parameters and opens the search URL in a new browser tab.
         * The search URL is generated using the reference, vin, and cartItems properties of the current object.
         * @return {void}
         */
        performSearch() {
            if (!this.reference) {
                return;
            }
            this.state = 'pending';
            // Prepare params.
            const params = new URLSearchParams({
                order_reference: this.reference,
                referrer: `browserplugin:${window.location.hostname}`,
                ...(this.vin ? { vin: this.vin } : {}),
            });
            for (const [index, cartItem] of Object.entries(this.cartItems)) {
                if (cartItem.manufacturer)
                    params.append(`query[${index}]`, cartItem.manufacturer);
                if (cartItem.quantity)
                    params.append(`requested_quantity[${index}]`, cartItem.quantity?.toString());
                if (cartItem.category)
                    params.append(`category[${index}]`, cartItem.category?.toString());
                if (cartItem.brand)
                    params.append(`brand[${index}]`, cartItem.brand);
            }
            eventBus.emitAuteonPortalEvent({ name: 'search', focus: true, payload: params.toString() }, (event) => {
                if (event.status === 'success')
                    this.state = 'success';
                if (event.status === 'error')
                    this.state = 'error';
                if (event.status === 'unauthorized')
                    this.state = 'unauthorized';
                if (event.response?.url)
                    this.auteonUrl = event.response.url;
            });
        },
    },
});

const _hoisted_1$5 = {
  ref: "toolbar",
  class: "app-auteon-plugin-tooltip"
};
const _hoisted_2$3 = { class: "text-md text-white hidden lg:block" };
const _hoisted_3$3 = { class: "flex flex-row items-center gap-4" };
const _hoisted_4$2 = {
  key: "pending",
  class: "flex flex-row items-center gap-2"
};
const _hoisted_5$1 = { class: "relative" };
const _hoisted_6$1 = { class: "transition-all group-hover:opacity-0" };
const _hoisted_7$1 = { class: "absolute left-0 top-0 transition-all whitespace-nowrap opacity-0 group-hover:opacity-100" };
const _hoisted_8$1 = {
  key: "default",
  class: "flex flex-row items-center gap-2"
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutStylesheet = resolveComponent("AutStylesheet");
  const _component_AutLogo = resolveComponent("AutLogo");
  const _component_AutInput = resolveComponent("AutInput");
  const _component_AutLoadingIcon = resolveComponent("AutLoadingIcon");
  const _component_AutErrorIcon = resolveComponent("AutErrorIcon");
  const _component_AutSuccessIcon = resolveComponent("AutSuccessIcon");
  const _component_AutButton = resolveComponent("AutButton");

  return withDirectives((openBlock(), createElementBlock("div", {
    style: normalizeStyle(_ctx.styles),
    ref: "shadow",
    class: normalizeClass(["app-auteon-plugin-tooltip-shadow", { 'app-auteon-plugin-tooltip-shadow--visible': _ctx.cartItems.length }])
  }, [
    (openBlock(), createBlock(resolveDynamicComponent("style"), { type: "text/css" }, {
      default: withCtx(() => [
        createTextVNode(" :root { --auteon-toolbar-height: " + toDisplayString$1(_ctx.toolbarHeight) + "; } ", 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    })),
    createBaseVNode("div", _hoisted_1$5, [
      createVNode(_component_AutStylesheet),
      createBaseVNode("div", {
        class: normalizeClass({
          '!block w-full h-10 px-12 bg-primary transition-all': true,
          'opacity-70 pointer-events-none': _ctx.state === 'pending'
        }),
        style: {"display":"none"}
      }, [
        createBaseVNode("form", {
          class: "flex flex-row items-center justify-between w-full h-full",
          onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => (_ctx.performSearch && _ctx.performSearch(...args)), ["prevent","stop"]))
        }, [
          createVNode(_component_AutLogo, { class: "origin-left scale-90 text-white" }),
          createBaseVNode("div", _hoisted_2$3, toDisplayString$1(_ctx.$t('cartToolbar.matchingItems', { count: _ctx.cartItems.length })), 1 /* TEXT */),
          createBaseVNode("div", _hoisted_3$3, [
            createVNode(_component_AutInput, {
              class: "!h-8 !rounded-md",
              modelValue: _ctx.reference,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.reference) = $event)),
              placeholder: _ctx.$t('tooltip.referencePlaceholder'),
              onChange: _ctx.markAsChanged
            }, null, 8 /* PROPS */, ["modelValue", "placeholder", "onChange"]),
            createVNode(_component_AutButton, {
              color: "black",
              class: "!h-8 !rounded-md whitespace-nowrap"
            }, {
              default: withCtx(() => [
                createVNode(Transition, {
                  mode: "out-in",
                  name: "fade"
                }, {
                  default: withCtx(() => [
                    (_ctx.state === 'pending')
                      ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
                          createVNode(_component_AutLoadingIcon),
                          createBaseVNode("span", null, toDisplayString$1(_ctx.$t('cartToolbar.searchLoading')), 1 /* TEXT */)
                        ]))
                      : (_ctx.state === 'error')
                        ? (openBlock(), createElementBlock("div", {
                            key: "error",
                            class: "flex flex-row items-center gap-2",
                            onClick: _cache[1] || (_cache[1] = withModifiers($event => (_ctx.state = 'default'), ["prevent","stop"]))
                          }, [
                            createVNode(_component_AutErrorIcon),
                            createBaseVNode("span", null, toDisplayString$1(_ctx.$t('cartToolbar.searchError')), 1 /* TEXT */)
                          ]))
                        : (_ctx.state === 'unauthorized')
                          ? (openBlock(), createElementBlock("div", {
                              key: "unauthorized",
                              class: "flex flex-row items-center gap-2",
                              onClick: _cache[2] || (_cache[2] = withModifiers($event => (_ctx.state = 'default'), ["prevent","stop"]))
                            }, [
                              createVNode(_component_AutErrorIcon),
                              createBaseVNode("span", null, toDisplayString$1(_ctx.$t('cartToolbar.searchUnauthorized')), 1 /* TEXT */)
                            ]))
                          : (_ctx.state === 'success')
                            ? (openBlock(), createElementBlock("div", {
                                key: "success",
                                class: "group flex flex-row items-center gap-2",
                                onClick: _cache[3] || (_cache[3] = withModifiers((...args) => (_ctx.openAuteonUrl && _ctx.openAuteonUrl(...args)), ["prevent","stop"]))
                              }, [
                                createVNode(_component_AutSuccessIcon),
                                createBaseVNode("div", _hoisted_5$1, [
                                  createBaseVNode("span", _hoisted_6$1, toDisplayString$1(_ctx.$t('cartToolbar.searchSuccess')), 1 /* TEXT */),
                                  createBaseVNode("span", _hoisted_7$1, toDisplayString$1(_ctx.$t('cartToolbar.searchShow')), 1 /* TEXT */)
                                ])
                              ]))
                            : (openBlock(), createElementBlock("div", _hoisted_8$1, [
                                createBaseVNode("span", null, toDisplayString$1(_ctx.$t('cartToolbar.searchButton')), 1 /* TEXT */)
                              ]))
                  ]),
                  _: 1 /* STABLE */
                })
              ]),
              _: 1 /* STABLE */
            })
          ])
        ], 32 /* NEED_HYDRATION */)
      ], 2 /* CLASS */)
    ], 512 /* NEED_PATCH */)
  ], 6 /* CLASS, STYLE */)), [
    [vShow, _ctx.cartItems.length]
  ])
}

script$5.render = render$5;
script$5.__file = "src/content-scripts/AutCartToolbar.vue";

var script$4 = defineComponent({
    name: 'AutDisableDetectionDialog',
    components: {
        AutCloseIcon: script$7$1,
        AutLoadingIcon: script$4$1,
        AutSuccessIcon: script$3$1,
        AutErrorIcon: script$2$1,
        AutChevronRightIcon: script$6$1,
        AutInput: script$5$1,
        AutButton: script$7,
        AutLogo: script$8,
        AutStylesheet: script$9,
    },
    props: {},
    data() {
        return {
            isVisible: false,
            callback: null,
            configuration: {},
        };
    },
    computed: {},
    mounted() {
        // Get shadow wrapper, tooltip component and styles.
        const shadow = this.$refs.shadow;
        const dialog = this.$refs.dialog;
        // Create shadow tree and append dialog component and styles to it.
        shadow.attachShadow({ mode: 'open' });
        shadow.shadowRoot?.appendChild(dialog);
    },
    methods: {
        /**
         * Close dialog and save user's choice.
         * @param state
         */
        async onClose(state) {
            if (state)
                await syncedStorage.add('disabledArticleNumberDetection', window.location.hostname);
            this.callback?.call(null, state);
            this.isVisible = false;
        },
        /**
         * Show dialog and wait for user's choice.
         * @param callback
         */
        confirm(callback) {
            this.callback = callback;
            this.isVisible = true;
        },
    },
});

const _hoisted_1$4 = {
  ref: "shadow",
  class: "app-auteon-plugin-tooltip-shadow",
  style: {"position":"absolute","z-index":"2147483647"}
};
const _hoisted_2$2 = {
  ref: "dialog",
  class: "app-auteon-plugin-tooltip"
};
const _hoisted_3$2 = {
  key: 0,
  class: "fixed left-0 top-0 w-full h-full flex items-center justify-center"
};
const _hoisted_4$1 = /*#__PURE__*/createBaseVNode("div", { class: "absolute left-0 top-0 w-full h-full bg-black bg-opacity-40" }, null, -1 /* HOISTED */);
const _hoisted_5 = { class: "relative w-[600px] drop-shadow-2xl" };
const _hoisted_6 = { class: "font-sans text-base p-6 space-y-4 bg-gray-300 rounded-t-lg" };
const _hoisted_7 = { class: "flex flex-row justify-between items-center" };
const _hoisted_8 = { class: "w-full text-2xl font-bold truncate" };
const _hoisted_9 = { class: "whitespace-break-spaces hyphens-none" };
const _hoisted_10 = { class: "flex flex-row items-center rounded-b-lg overflow-hidden" };
const _hoisted_11 = ["textContent"];
const _hoisted_12 = ["textContent"];

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutStylesheet = resolveComponent("AutStylesheet");
  const _component_AutLogo = resolveComponent("AutLogo");
  const _component_AutCloseIcon = resolveComponent("AutCloseIcon");

  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("div", _hoisted_2$2, [
      createVNode(_component_AutStylesheet),
      (_ctx.isVisible)
        ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            _hoisted_4$1,
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  createVNode(_component_AutLogo, { class: "text-primary" }),
                  createBaseVNode("button", {
                    class: "appearance-none bg-gray-350 rounded-2xl p-2 hover:bg-gray-400",
                    onClick: _cache[0] || (_cache[0] = $event => (_ctx.onClose(false)))
                  }, [
                    createVNode(_component_AutCloseIcon)
                  ])
                ]),
                createBaseVNode("div", _hoisted_8, toDisplayString$1(_ctx.$t('disableDetectionDialog.title')), 1 /* TEXT */),
                createBaseVNode("div", _hoisted_9, toDisplayString$1(_ctx.$t('disableDetectionDialog.text')), 1 /* TEXT */)
              ]),
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("button", {
                  class: "h-16 w-full bg-white hover:bg-gray-400",
                  onClick: _cache[1] || (_cache[1] = $event => (_ctx.onClose(true))),
                  textContent: toDisplayString$1(_ctx.$t('disableDetectionDialog.confirmButton'))
                }, null, 8 /* PROPS */, _hoisted_11),
                createBaseVNode("button", {
                  class: "h-16 w-full bg-tertiary text-white hover:bg-tertiary-hover",
                  onClick: _cache[2] || (_cache[2] = $event => (_ctx.onClose(false))),
                  textContent: toDisplayString$1(_ctx.$t('disableDetectionDialog.cancelButton'))
                }, null, 8 /* PROPS */, _hoisted_12)
              ])
            ])
          ]))
        : createCommentVNode("v-if", true)
    ], 512 /* NEED_PATCH */)
  ], 512 /* NEED_PATCH */))
}

script$4.render = render$4;
script$4.__file = "src/content-scripts/AutDisableDetectionDialog.vue";

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-6"
};
const _hoisted_2$1 = /*#__PURE__*/createBaseVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = [
  _hoisted_2$1
];

function render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [..._hoisted_3$1]))
}

const script$3 = {};


script$3.render = render$3;
script$3.__file = "src/components/ui/AutEyeSlash.vue";

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-6"
};
const _hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
}, null, -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/createBaseVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
}, null, -1 /* HOISTED */);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];

function render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [..._hoisted_4]))
}

const script$2 = {};


script$2.render = render$2;
script$2.__file = "src/components/ui/AutEye.vue";

var script$1 = defineComponent({
    name: 'AutPasswordToggle',
    components: {
        AutEye: script$2,
        AutEyeSlash: script$3,
        AutStylesheet: script$9,
    },
    props: {
        detectedPasswordField: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isPasswordToggleMounted: false,
            isPasswordVisible: false,
            dimensions: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            },
            domRect: '',
            computedStyle: {},
            computedStyleValues: {
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderLeftWidth: 0,
            },
            defaultToggleStyleModifier: {
                backgroundColor: '#ffffff',
            },
        };
    },
    computed: {
        element() {
            return this.detectedPasswordField.element;
        },
        config() {
            return this.detectedPasswordField.config;
        },
    },
    watch: {
        detectedPasswordField: {
            immediate: true,
            deep: true,
            handler() {
                if (this.isPasswordToggleMounted && !this.detectedPasswordField)
                    return this.isPasswordToggleMounted = false;
                if (!this.detectedPasswordField)
                    return;
                if (!this.isPasswordToggleMounted) {
                    this.isPasswordToggleMounted = true;
                    return this.$nextTick(() => {
                        this.applyShadowDom();
                        this.analyseComputedStyleValues();
                        this.calculatePositionAndDimension();
                    });
                }
                if (this.isPasswordToggleMounted) {
                    return this.$nextTick(() => {
                        this.calculatePositionAndDimension();
                    });
                }
            },
        },
    },
    mounted() {
        window.addEventListener('resize', this.calculatePositionAndDimension);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.calculatePositionAndDimension);
    },
    methods: {
        applyShadowDom() {
            // Get shadow wrapper, tooltip component and styles.
            const shadow = this.$refs.shadow;
            const passwordToggle = this.$refs.passwordToggle;
            const target = document.body;
            if (!shadow || !passwordToggle || !target)
                return;
            // Create shadow tree and append tooltip component and styles to it.
            shadow.attachShadow({ mode: 'open' });
            shadow.shadowRoot?.appendChild(passwordToggle);
            // Prepend to target dom.
            target.append(shadow);
        },
        analyseComputedStyleValues() {
            this.computedStyle = window.getComputedStyle(this.element);
            for (const key in this.computedStyleValues) {
                const value = String(this.computedStyle[key] || '0');
                this.computedStyleValues[key] = parseInt(value?.replace(/px$/, ''));
            }
        },
        calculatePositionAndDimension() {
            if (!this.isPasswordToggleMounted)
                return;
            const domRect = this.element.getBoundingClientRect();
            const stringifiedDomRect = JSON.stringify(domRect);
            if (this.domRect === stringifiedDomRect)
                return;
            this.domRect = stringifiedDomRect;
            // Calculate the position and dimension of the password toggle.
            const { borderTopWidth, borderBottomWidth, borderRightWidth, borderLeftWidth, paddingRight, paddingLeft } = this.computedStyleValues;
            const originalWidth = domRect.width;
            const widthAndHeight = domRect.height - borderTopWidth - borderBottomWidth;
            const offsetLeft = originalWidth - widthAndHeight - borderRightWidth;
            const leftPosition = domRect.left + offsetLeft;
            const topPosition = domRect.top + borderTopWidth;
            const newPaddingRight = paddingRight + widthAndHeight;
            // Apply the calculated position and dimension to the password toggle.
            this.dimensions = { left: leftPosition, top: topPosition, width: widthAndHeight, height: widthAndHeight };
            // Set the padding right of the password field to accommodate the password toggle once.
            const isParsed = this.element.hasAttribute('data-auteon-password');
            if (!isParsed) {
                this.element.setAttribute('data-auteon-password', 'parsed');
                const passwordToggle = this.$refs.passwordToggle;
                const toggleStyles = [this.defaultToggleStyleModifier, this.config?.toggleStyleModifier].filter((style) => !!style);
                const elementStyles = [{ paddingRight: `${newPaddingRight}px` }, this.config?.toggleStyleModifier].filter((style) => !!style);
                toggleStyles.forEach((style) => Object.entries(style).forEach(([key, value]) => passwordToggle.style[key] = value));
                elementStyles.forEach((style) => Object.entries(style).forEach(([key, value]) => this.element.style[key] = value));
            }
            // If the password field is in content-box mode, recalculate the width of the password field once.
            const isContentBox = this.computedStyle.boxSizing === 'content-box';
            const isRecalculated = this.element.getAttribute('data-auteon-password') === 'recalculated';
            if (isContentBox && !isRecalculated) {
                this.element.setAttribute('data-auteon-password', 'recalculated');
                const newPasswordFieldWidth = originalWidth - paddingLeft - newPaddingRight - borderLeftWidth - borderRightWidth;
                this.element.style.width = `${newPasswordFieldWidth}px`;
            }
        },
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
            this.element.type = this.isPasswordVisible ? 'text' : 'password';
        },
    },
});

const _hoisted_1$1 = {
  ref: "passwordToggle",
  class: "app-auteon-plugin-tooltip"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutStylesheet = resolveComponent("AutStylesheet");
  const _component_AutEye = resolveComponent("AutEye");
  const _component_AutEyeSlash = resolveComponent("AutEyeSlash");

  return (!!_ctx.detectedPasswordField)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        ref: "shadow",
        class: "app-auteon-plugin-tooltip-shadow",
        style: normalizeStyle(`
      position: absolute;
      left: ${_ctx.dimensions.left}px;
      top: ${_ctx.dimensions.top}px;
      z-index: 2147483647;
      height: 0;
    `)
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(_component_AutStylesheet),
          createBaseVNode("button", {
            class: "flex items-center justify-center",
            style: normalizeStyle(`
          width: ${_ctx.dimensions.width}px;
          height: ${_ctx.dimensions.height}px;
        `),
            onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.togglePasswordVisibility && _ctx.togglePasswordVisibility(...args)))
          }, [
            (!_ctx.isPasswordVisible)
              ? (openBlock(), createBlock(_component_AutEye, { key: 0 }))
              : (openBlock(), createBlock(_component_AutEyeSlash, { key: 1 }))
          ], 4 /* STYLE */)
        ], 512 /* NEED_PATCH */)
      ], 4 /* STYLE */))
    : createCommentVNode("v-if", true)
}

script$1.render = render$1;
script$1.__file = "src/content-scripts/AutPasswordToggle.vue";

var script = defineComponent({
    name: 'AutApp',
    components: {
        AutPasswordToggle: script$1,
        AutDisableDetectionDialog: script$4,
        AutCartToolbar: script$5,
        AutPageObserver: script$6,
        AutStylesheet: script$9,
        AutTooltip: script$a,
    },
    setup() {
        const { shortcut } = useShortcut();
        return { shortcut };
    },
    data() {
        return {
            offset: -20,
            active: false,
            native: null,
            timeout: null,
            selection: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                quantity: 1,
                category: '',
                text: '',
                placement: 'top',
                detected: false,
                autoClose: false,
            },
            detectedPasswordField: null,
            detectedCart: null,
            orderReference: null,
            vin: null,
        };
    },
    $refs: {
        shadow: HTMLDivElement,
        tooltip: HTMLDivElement,
    },
    mounted() {
        // Get shadow wrapper, tooltip component and styles.
        const shadow = this.$refs.shadow;
        const tooltip = this.$refs.tooltip;
        // Create shadow tree and append tooltip component and styles to it.
        shadow.attachShadow({ mode: 'open' });
        shadow.shadowRoot?.appendChild(tooltip);
        // Add event listener to the handle shortcut and selection.
        window.removeEventListener('keydown', this.handleShortcut);
        window.removeEventListener('mouseup', this.handleSelection);
        window.removeEventListener('scroll', this.handleScrollEvent, true);
        window.addEventListener('keydown', this.handleShortcut);
        window.addEventListener('mouseup', this.handleSelection);
        window.addEventListener('scroll', this.handleScrollEvent, true);
        // Listen for selection change events on dom.
        document.removeEventListener('selectstart', this.handleSelectionChange);
        document.addEventListener('selectstart', this.handleSelectionChange);
        // Add event listener to the handle native browser commands.
        chrome.runtime.onMessage.removeListener(this.handleNativeBrowserCommand);
        chrome.runtime.onMessage.addListener(this.handleNativeBrowserCommand);
        // Add event listener to the handle browser search perform event.
        chrome.runtime.onMessage.removeListener(eventBus.handleAuteonPortalRequestEvent);
        chrome.runtime.onMessage.addListener(eventBus.handleAuteonPortalRequestEvent);
        // Add event listener to the handle browser search completed event.
        document.body?.removeEventListener('plugin:response', eventBus.handleAuteonPortalResponseEvent);
        document.body?.addEventListener('plugin:response', eventBus.handleAuteonPortalResponseEvent);
    },
    methods: {
        /**
         * Handle registered plugin commands.
         * Commands are defined in manifest.json.
         * Commands can be configured natively in chrome://extensions/shortcuts.
         * @param data
         */
        handleNativeBrowserCommand(data) {
            // Toggle active state command is tooltip and selection is not empty.
            if (data?.command === 'tooltip' && this.selection.text.length > 0) {
                window.setTimeout(() => (this.native = false), 500);
                this.active = !this.active;
                this.native = true;
            }
        },
        /**
         * Handle shortcut handler.
         */
        handleShortcut(event) {
            // Helper function to check if shortcut keys are matching.
            const isShortcutMatching = (shortcut) => !!shortcut?.alt === (event.getModifierState('Alt') || event.getModifierState('AltGraph') || event.altKey) &&
                !!shortcut?.ctrl === (event.getModifierState('Ctrl') || event.ctrlKey) &&
                !!shortcut?.meta === (event.getModifierState('Meta') || event.metaKey) &&
                !!shortcut?.shift === (event.getModifierState('Shift') || event.shiftKey) &&
                (shortcut?.location || 0) === 0 &&
                shortcut?.code === event.code;
            // Check if shortcut is matching and selection is not empty.
            const isConfiguredShortcutMatching = isShortcutMatching(this.shortcut.keys);
            const isAuteonShortcutMatching = isShortcutMatching({ alt: true, code: 'KeyA' });
            // Toggle active state if configured or default auteon shortcut was pressed. Default shortcut is "ALT + A".
            if (isConfiguredShortcutMatching || isAuteonShortcutMatching) {
                event.preventDefault();
                if (this.native === true)
                    return;
                if (this.selection.text.length > 0) {
                    this.active = !this.active;
                    this.native = false;
                }
            }
            // Set active state to false if escape key is pressed.
            if (event.code === 'Escape') {
                this.active = false;
            }
        },
        /**
         * Handle selection change.
         * Will listen for selection change event and trigger selection handler.
         * Will only trigger once per selection change event.
         */
        handleSelectionChange() {
            document.addEventListener('selectionchange', this.handleSelection, { once: true });
        },
        /**
         * Handle selection handler.
         * @param event
         */
        handleSelection(event) {
            // Get clicked target element.
            const target = event instanceof MouseEvent
                ? event?.target
                : null;
            // Skip if following occurs:
            // - clicked element is part of tooltip
            // - clicked element is type of input or textarea
            // - clicked element has contenteditable attribute
            if (target && (['input', 'textarea'].includes(target.tagName.toLowerCase()) ||
                target.hasAttribute('contenteditable') ||
                (this.$el.contains(target) || this.$el === target))) {
                return;
            }
            // Check user selection.
            const selection = window.getSelection();
            if (!selection || selection?.rangeCount <= 0) {
                this.active = false;
                return;
            }
            // Get user selection information and text.
            const range = selection?.getRangeAt(0);
            const clientRect = range?.getBoundingClientRect();
            const text = selection?.toString()
                ?.replace(/[\n\r\t]+/g, ' ')
                ?.replace(/ +}/g, ' ')
                ?.normalize('NFD')
                ?.trim() || '';
            // Mark as inactive if selection length is zero or selection has changed.
            if (text.length === 0 || (this.active && this.selection.text !== text)) {
                this.active = false;
            }
            // Check if automatically detected selection is active.
            if (this.selection.detected && this.active) {
                return;
            }
            // Update selection if client rect defined.
            if (clientRect) {
                this.selection.hash = Math.random().toString(36).substring(7);
                this.selection.top = window.scrollY + clientRect?.top + this.offset || 0;
                this.selection.left = clientRect?.left || 0;
                this.selection.width = clientRect?.width || 0;
                this.selection.height = clientRect?.height || 0;
                this.selection.quantity = 1;
                this.selection.text = text;
                this.selection.placement = 'top';
                this.selection.detected = false;
                this.selection.autoClose = false;
            }
        },
        /**
         * Handle manufacture article number hover.
         * @param event
         * @param articleNumber
         * @param quantity
         * @param category
         */
        handleManufactureArticleNumberHover(event, articleNumber, quantity = 1, category = '') {
            // Skip if manually selection is active.
            if (this.active && !this.selection.detected)
                return;
            // Skip if selection is detected and auto close is disabled.
            if (this.active && this.selection.detected && !this.selection.autoClose)
                return;
            this.handleMouseEnter();
            const target = event.target;
            const clientRect = target?.getBoundingClientRect();
            this.active = true;
            this.selection.hash = Math.random().toString(36).substring(7);
            this.selection.top = window.scrollY + clientRect?.top + this.offset || 0;
            this.selection.left = clientRect?.left || 0;
            this.selection.width = clientRect?.width || 0;
            this.selection.height = clientRect?.height || 0;
            this.selection.quantity = Math.max(1, quantity);
            this.selection.category = category;
            this.selection.text = articleNumber || target.innerText;
            this.selection.placement = 'left';
            this.selection.detected = true;
            this.selection.autoClose = true;
        },
        /**
         * Handle mouse leave.
         * @param event
         */
        handleMouseLeave(event) {
            // Get target elements.
            const target = event.target;
            const relatedTarget = event?.relatedTarget;
            // Check if related target is hoverable article number.
            const isHoverableArticleNumber = !!relatedTarget?.closest('[data-auteon="article-number"]');
            // Skip if clicked element is part of tooltip or is hoverable article number.
            if (this.$el.contains(target) || this.$el === target || isHoverableArticleNumber) {
                return;
            }
            // If auto close is enabled, set active state to false after 250ms.
            if (this.selection.autoClose) {
                this.timeout = window.setTimeout(() => {
                    this.selection.autoClose = false;
                    this.selection.detected = false;
                    this.active = false;
                }, 250);
            }
        },
        /**
         * Handle mouse enter.
         */
        handleMouseEnter() {
            // Clear timeout if auto close is enabled.
            if (this.selection.autoClose && this.timeout) {
                window.clearTimeout(this.timeout);
            }
        },
        /**
         * Handle scroll event.
         * Will set active state to false if user scrolls somewhere on the page.
         */
        handleScrollEvent() {
            this.active = false;
        },
        /**
         * Ask for disable article number detection.
         * Will show dialog and ask user to disable article number detection
         * for the current domain. If user confirms, the settings is saved
         * on synced storage and the page will be reloaded.
         */
        async askForDisableArticleNumberDetection() {
            if (!this.selection.detected)
                return;
            const isDisabled = await syncedStorage.contains('disabledArticleNumberDetection', window.location.hostname);
            if (isDisabled)
                return;
            const dialog = this.$refs.dialog;
            dialog.confirm((state) => {
                if (state)
                    window.location.reload();
            });
        },
    },
});

const _hoisted_1 = {
  ref: "tooltip",
  class: "app-auteon-plugin-tooltip"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutStylesheet = resolveComponent("AutStylesheet");
  const _component_AutTooltip = resolveComponent("AutTooltip");
  const _component_AutCartToolbar = resolveComponent("AutCartToolbar");
  const _component_AutPasswordToggle = resolveComponent("AutPasswordToggle");
  const _component_AutDisableDetectionDialog = resolveComponent("AutDisableDetectionDialog");
  const _component_AutPageObserver = resolveComponent("AutPageObserver");

  return (openBlock(), createElementBlock("div", null, [
    withDirectives(createBaseVNode("div", {
      ref: "shadow",
      style: normalizeStyle(`
        position: absolute;
        left: ${_ctx.selection.left}px;
        top: ${_ctx.selection.top}px;
        z-index: 2147483647;
        height: 0;
      `)
    }, [
      createBaseVNode("div", _hoisted_1, [
        createVNode(_component_AutStylesheet),
        createVNode(_component_AutTooltip, {
          active: _ctx.active,
          "onUpdate:active": _cache[0] || (_cache[0] = $event => ((_ctx.active) = $event)),
          selection: _ctx.selection,
          "order-reference": _ctx.orderReference,
          vin: _ctx.vin,
          onMouseenter: _ctx.handleMouseEnter,
          onMouseleave: _ctx.handleMouseLeave,
          onManuallyClosed: _ctx.askForDisableArticleNumberDetection,
          onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
          onMouseup: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
          onClick: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
        }, null, 8 /* PROPS */, ["active", "selection", "order-reference", "vin", "onMouseenter", "onMouseleave", "onManuallyClosed"])
      ], 512 /* NEED_PATCH */)
    ], 4 /* STYLE */), [
      [vShow, _ctx.active]
    ]),
    createVNode(_component_AutCartToolbar, {
      "detected-cart": _ctx.detectedCart,
      "order-reference": _ctx.orderReference,
      vin: _ctx.vin
    }, null, 8 /* PROPS */, ["detected-cart", "order-reference", "vin"]),
    createVNode(_component_AutPasswordToggle, { "detected-password-field": _ctx.detectedPasswordField }, null, 8 /* PROPS */, ["detected-password-field"]),
    createVNode(_component_AutDisableDetectionDialog, {
      ref: "dialog",
      onMousedown: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"])),
      onMouseup: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
      onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
    }, null, 512 /* NEED_PATCH */),
    createVNode(_component_AutPageObserver, {
      onManufactureArticleNumberHover: _ctx.handleManufactureArticleNumberHover,
      onManufactureArticleNumberLeave: _ctx.handleMouseLeave,
      onPasswordFieldDetection: _cache[7] || (_cache[7] = $event => (_ctx.detectedPasswordField = $event)),
      onCartDetection: _cache[8] || (_cache[8] = $event => (_ctx.detectedCart = $event)),
      onOrderReferenceDetection: _cache[9] || (_cache[9] = $event => (_ctx.orderReference = $event)),
      onVinDetection: _cache[10] || (_cache[10] = $event => (_ctx.vin = $event))
    }, null, 8 /* PROPS */, ["onManufactureArticleNumberHover", "onManufactureArticleNumberLeave"])
  ]))
}

script.render = render;
script.__scopeId = "data-v-3f7bf735";
script.__file = "src/content-scripts/AutApp.vue";

// Helper function to register plugin app.
const registerPluginApp = () => {
    // Generate app container and apply them to body.
    const appContainer = document.createElement('div');
    appContainer.setAttribute('id', 'app-auteon-plugin');
    document.body.insertAdjacentElement('beforeend', appContainer);
    // Initialize vue app and mount it.
    const app = createApp(script);
    app.use(i18n);
    app.mount(appContainer);
};
// Only proceed if page is html.
if (document.contentType.toLowerCase() === 'text/html') {
    if (document?.body) {
        registerPluginApp();
    }
    else {
        document.addEventListener('DOMContentLoaded', registerPluginApp);
    }
}
else {
    // Get injected styles and remove them from body.
    const styles = document.querySelector('#app-auteon-plugin-styles');
    styles?.remove();
}
