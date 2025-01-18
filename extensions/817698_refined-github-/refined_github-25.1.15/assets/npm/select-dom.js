function isQueryable(object) {
    return typeof object.querySelectorAll === 'function';
}
function $(selectors, baseElement) {
    if (arguments.length === 2 && !baseElement) {
        return;
    }
    return (baseElement ?? document).querySelector(String(selectors)) ?? undefined;
}
class ElementNotFoundError extends Error {
    name = 'ElementNotFoundError';
}
function expectElement(selectors, baseElement) {
    if (arguments.length === 2 && !baseElement) {
        throw new ElementNotFoundError('Expected element not found because the base is specified but null');
    }
    const element = (baseElement ?? document).querySelector(String(selectors));
    if (element) {
        return element;
    }
    throw new ElementNotFoundError(`Expected element not found: ${String(selectors)}`);
}
function lastElement(selectors, baseElement) {
    if (arguments.length === 2 && !baseElement) {
        return undefined;
    }
    const all = (document).querySelectorAll(String(selectors));
    return all[all.length - 1];
}
function elementExists(selectors, baseElement) {
    if (arguments.length === 2 && !baseElement) {
        return false;
    }
    return Boolean((baseElement ?? document).querySelector(String(selectors)));
}
function countElements(selectors, baseElement) {
    if (arguments.length === 2 && !baseElement) {
        return 0;
    }
    return (baseElement ?? document).querySelectorAll(String(selectors)).length;
}
function $$(selectors, baseElements) {
    if (arguments.length === 2 && !baseElements) {
        return [];
    }
    if (!baseElements || isQueryable(baseElements)) {
        const elements = (baseElements ?? document).querySelectorAll(String(selectors));
        return Array.prototype.slice.call(elements);
    }
    const elements = new Set();
    for (const baseElement of baseElements) {
        for (const element of baseElement.querySelectorAll(String(selectors))) {
            elements.add(element);
        }
    }
    return [...elements];
}
function expectElements(selectors, baseElements) {
    if (arguments.length === 2 && !baseElements) {
        throw new ElementNotFoundError('Expected elements not found because the base is specified but null');
    }
    const elements = $$(selectors, baseElements);
    if (elements.length > 0) {
        return elements;
    }
    throw new ElementNotFoundError(`Expected elements not found: ${String(selectors)}`);
}

export { $, $$, ElementNotFoundError, countElements, elementExists, expectElement, expectElements, lastElement };
