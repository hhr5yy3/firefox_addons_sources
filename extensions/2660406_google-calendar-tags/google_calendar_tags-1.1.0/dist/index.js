(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    define("utils", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.isWhite = exports.extractColor = exports.hasColor = exports.defaultColor = exports.findFirstChild = exports.findFirstParent = void 0;
        const findFirstParent = (element, predicate) => {
            if (!element)
                return undefined;
            let parent = element.parentElement;
            if (!parent)
                return undefined;
            if (predicate(parent))
                return parent;
            else
                return (0, exports.findFirstParent)(parent, predicate);
        };
        exports.findFirstParent = findFirstParent;
        const findFirstChild = (element, predicate) => {
            if (!element)
                return undefined;
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children.item(i);
                if (child)
                    if (predicate(child))
                        return child;
                    else {
                        const result = (0, exports.findFirstChild)(child, predicate);
                        if (result)
                            return result;
                    }
            }
        };
        exports.findFirstChild = findFirstChild;
        exports.defaultColor = '#3c4043';
        const hasColor = (element) => element.hasAttribute('style') &&
            ((element.getAttribute('style')?.includes('background-color') === true &&
                element.style.backgroundColor !== undefined) ||
                (element.getAttribute('style')?.includes('border-color') === true &&
                    element.style.borderColor !== undefined));
        exports.hasColor = hasColor;
        const extractColor = (element) => {
            if (!element)
                return exports.defaultColor;
            if (element.hasAttribute('style'))
                if (element.getAttribute('style')?.includes('background-color') === true &&
                    element.style.backgroundColor !== undefined)
                    return element.style.backgroundColor;
                else if (element.getAttribute('style')?.includes('border-color') === true &&
                    element.style.borderColor !== undefined)
                    return element.style.borderColor;
            return exports.defaultColor;
        };
        exports.extractColor = extractColor;
        const isWhite = (color) => /rgba?\(\s*2[0-9]{2}\s*,\s*2[0-9]{2}\s*,\s*2[0-9]{2}/i.test(color) ||
            /#f{3,6}|white/.test(color);
        exports.isWhite = isWhite;
    });
    define("tagFactory", ["require", "exports", "utils"], function (require, exports, utils_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.alignTagUp = exports.padTag = exports.fillTagWithWhite = exports.fillTagWithColor = exports.createBaseTag = void 0;
        // Operators
        const createBaseTag = () => {
            let tag = document.createElement('span');
            tag.style.borderRadius = '2px';
            tag.style.verticalAlign = 'bottom';
            tag.style.fontSize = '90%';
            return tag;
        };
        exports.createBaseTag = createBaseTag;
        const fillTagWithColor = (tag, color) => {
            if ((0, utils_1.isWhite)(color))
                color = utils_1.defaultColor;
            tag.style.backgroundColor = color;
            tag.style.color = 'white';
        };
        exports.fillTagWithColor = fillTagWithColor;
        const fillTagWithWhite = (tag, color) => {
            if ((0, utils_1.isWhite)(color))
                (0, exports.fillTagWithColor)(tag, color);
            else {
                tag.style.backgroundColor = 'white';
                tag.style.color = color;
                tag.style.marginRight = '2px';
            }
        };
        exports.fillTagWithWhite = fillTagWithWhite;
        const padTag = (tag, padding) => {
            tag.style.padding = padding;
        };
        exports.padTag = padTag;
        const alignTagUp = (tag) => {
            tag.style.verticalAlign = 'top';
        };
        exports.alignTagUp = alignTagUp;
    });
    define("events", ["require", "exports", "tagFactory", "utils"], function (require, exports, tagFactory_1, utils_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Event = void 0;
        const DETAIL_ID = 'rAECCd';
        const DAY_SELECTOR = '.I0UMhf';
        const MONTH_SELECTOR = '.WBi6vc, .PnMPye';
        const GLOBAL_SELECTOR = '.URIUGf';
        const TIMED_CLASS = ['smECzc', 'lFe10c'];
        function getEvents() {
            const detailElement = document.getElementById(DETAIL_ID);
            const dayElements = Array.from(document.querySelectorAll(DAY_SELECTOR));
            const monthElements = Array.from(document.querySelectorAll(MONTH_SELECTOR));
            const globalView = Array.from(document.querySelectorAll(GLOBAL_SELECTOR));
            return [
                ...monthElements.map(el => new MonthEvent(el)),
                ...dayElements.map(el => new DayEvent(el)),
                ...globalView.map(el => new GlobalEvent(el)),
                ...(detailElement ? [new DetailEvent(detailElement)] : []),
            ];
        }
        exports.default = getEvents;
        class Event {
            labelElement;
            containerElement;
            constructor(labelElement) {
                this.labelElement = labelElement;
                this.containerElement = this.extractContainer(labelElement);
            }
            isTimed() {
                return TIMED_CLASS.some(className => this.containerElement?.classList.contains(className));
            }
            getColor() {
                let color = (0, utils_2.extractColor)(this.findColorElement());
                return color;
            }
            findColorElement() {
                return (0, utils_2.findFirstParent)(this.labelElement, utils_2.hasColor);
            }
            getLabel() {
                return this.labelElement.innerText;
            }
            setLabel(label) {
                this.labelElement.innerText = label;
            }
            applyLabelStyle(style) {
                Object.entries(style).forEach(([k, v]) => (this.labelElement.style[k] = v));
            }
            applyContainerStyle(style) {
                if (this.containerElement)
                    Object.entries(style).forEach(([k, v]) => (this.containerElement.style[k] = v));
            }
            prependTag(label) {
                const tag = (0, tagFactory_1.createBaseTag)();
                this.styleTag(tag);
                tag.innerText = label;
                this.labelElement.insertBefore(tag, this.labelElement.firstChild);
            }
            extractContainer(element) {
                return (0, utils_2.findFirstParent)(element, parent => parent.getAttribute('role') === 'button');
            }
        }
        exports.Event = Event;
        class MonthEvent extends Event {
            styleTag(tag) {
                (0, tagFactory_1.padTag)(tag, '2px 4px');
                if (this.isTimed())
                    (0, tagFactory_1.fillTagWithColor)(tag, this.getColor());
                else
                    (0, tagFactory_1.fillTagWithWhite)(tag, this.getColor());
            }
        }
        class DayEvent extends Event {
            styleTag(tag) {
                (0, tagFactory_1.padTag)(tag, '1px 3px');
                (0, tagFactory_1.fillTagWithWhite)(tag, this.getColor());
            }
        }
        class GlobalEvent extends Event {
            styleTag(tag) {
                (0, tagFactory_1.padTag)(tag, '2px 4px');
                (0, tagFactory_1.fillTagWithColor)(tag, this.getColor());
                (0, tagFactory_1.alignTagUp)(tag);
            }
            extractContainer(element) {
                return (0, utils_2.findFirstParent)(element, parent => parent.getAttribute('role') === 'presentation');
            }
            findColorElement() {
                return (0, utils_2.findFirstChild)(this.containerElement, utils_2.hasColor);
            }
        }
        class DetailEvent extends Event {
            styleTag(tag) {
                (0, tagFactory_1.padTag)(tag, '2px 6px');
                (0, tagFactory_1.fillTagWithColor)(tag, this.getColor());
            }
            extractContainer(element) {
                return (0, utils_2.findFirstParent)(element, parent => parent.classList.contains('nBzcnc'));
            }
            findColorElement() {
                return (0, utils_2.findFirstChild)(this.containerElement, utils_2.hasColor);
            }
        }
    });
    define("observer", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        function startObserving(redraw, rootNode, detailNode) {
            const observer = new MutationObserver(redraw);
            observer.observe(rootNode, {
                attributes: true,
                childList: true,
                characterData: false,
                subtree: true,
            });
            observer.observe(detailNode, {
                subtree: true,
                childList: true,
            });
            redraw();
        }
        exports.default = startObserving;
    });
    define("operators/operator", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("operators/optional-operator", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const SIGN_OPTIONAL = '?';
        const optionalOperator = event => {
            if (shouldOperateOn(event)) {
                event.setLabel(event.getLabel().replace(SIGN_OPTIONAL, '\xa0'));
                event.applyLabelStyle({ fontStyle: 'italic' });
                event.applyContainerStyle({ opacity: '0.5' });
            }
        };
        const shouldOperateOn = event => event.getLabel().endsWith(SIGN_OPTIONAL);
        exports.default = optionalOperator;
    });
    define("operators/tag-operator", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const SIGN_TAG = ': ';
        const tagOperator = event => {
            if (shouldOperateOn(event)) {
                const label = event.getLabel();
                const index = label.lastIndexOf(SIGN_TAG);
                let tagName = event.getLabel().substring(0, index);
                event.setLabel(label.substring(index + 1));
                event.prependTag(tagName);
            }
        };
        const shouldOperateOn = event => event.getLabel().includes(SIGN_TAG);
        exports.default = tagOperator;
    });
    define("updater", ["require", "exports", "events", "operators/optional-operator", "operators/tag-operator"], function (require, exports, events_1, optional_operator_1, tag_operator_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        events_1 = __importDefault(events_1);
        optional_operator_1 = __importDefault(optional_operator_1);
        tag_operator_1 = __importDefault(tag_operator_1);
        const operators = [optional_operator_1.default, tag_operator_1.default];
        function update() {
            (0, events_1.default)().forEach(event => operators.forEach(operator => operator(event)));
        }
        exports.default = update;
    });
    define("index", ["require", "exports", "observer", "updater"], function (require, exports, observer_1, updater_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        observer_1 = __importDefault(observer_1);
        updater_1 = __importDefault(updater_1);
        (function waitForInit() {
            const initInterval = setInterval(function () {
                const rootNode = getRootNode();
                const detailNode = getDetailNode();
                if (documentIsReady() && rootNode && detailNode) {
                    clearInterval(initInterval);
                    (0, observer_1.default)(updater_1.default, rootNode, detailNode);
                }
            }, 10);
        })();
        const documentIsReady = () => document.readyState === 'interactive' || document.readyState === 'complete';
        const getRootNode = () => (document.querySelector('[role=main]') ?? document.querySelector('main'))
            ?.parentNode;
        const getDetailNode = () => document.getElementById('yDmH0d') ??
            document.querySelector('[aria-label$="details" i]');
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        if (typeof define.factory !== 'function') {
            return define.factory;
        }
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();