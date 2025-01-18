// Cross-browser API compatibility
const coreAPI = typeof browser !== 'undefined' ? browser : chrome;

// Apply translations to the DOM
function applyTranslations() {

    // Translate elements with `data-i18n`
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const message = coreAPI.i18n.getMessage(key);
        if (message) {
            element.innerHTML = message;
        }
    });

    // Translate `placeholder` attributes
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        const message = coreAPI.i18n.getMessage(key);
        if (message) {
            element.setAttribute("placeholder", message);
        }
    });

    // Translate `alt` attributes
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.getAttribute("data-i18n-alt");
        const message = coreAPI.i18n.getMessage(key);
        if (message) {
            element.setAttribute("alt", message);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
});
