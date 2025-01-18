let default_domain = "https://metager.org";
let localized_domain = chrome.i18n.getUILanguage() == "de" ? "https://metager.de" : "https://metager.org";

// Inserts localized strings into html elements
document.querySelectorAll("[data-text]").forEach(element => {
    let key = element.dataset.text;

    // Check for replacements
    let replacements = element.dataset.replacements;
    if (replacements) {
        replacements = replacements.split("|");
        for (let i = 0; i < replacements.length; i++) {
            // Check for base domain in strings
            if (replacements[i].indexOf(default_domain) == 0) {
                replacements[i] = replacements[i].replace(default_domain, localized_domain);
            }
        }
    }
    let message = chrome.i18n.getMessage(key, replacements);
    if (message)
        element.innerHTML = message;
});

// Localize the target domain for our links
document.querySelectorAll("a").forEach(element => {
    if (element.href.indexOf(default_domain) == 0) {
        element.href = element.href.replace(default_domain, localized_domain);
    }
});