function fitTextarea(textarea) {
    const positions = new Map();
    let element = textarea;
    while (element === null || element === void 0 ? void 0 : element.parentElement) {
        element = element.parentElement;
        positions.set(element, element.scrollTop);
    }
    textarea.style.height = 'auto';
    const style = getComputedStyle(textarea);
    textarea.style.height = String(textarea.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)) + 'px';
    for (const [element, position] of positions) {
        if (position && element.scrollTop !== position) {
            element.scrollTop = position;
        }
    }
}
function listener(event) {
    fitTextarea(event.target);
}
function watchAndFit(elements) {
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }
    else if (elements instanceof HTMLTextAreaElement) {
        elements = [elements];
    }
    for (const element of elements) {
        element.addEventListener('input', listener);
        if (element.form) {
            element.form.addEventListener('reset', listener);
        }
        fitTextarea(element);
    }
}
fitTextarea.watch = watchAndFit;

export { fitTextarea as default };
