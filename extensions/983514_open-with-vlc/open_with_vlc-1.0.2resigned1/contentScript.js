/**
 * Content-Script ajouté à toute les instances des pages
 * Permet entre autres d'afficher une alerte et un prompt de mot de passe
 */
var Message = new MessagePromise();

Message.onMessage("prompt-password", (data) => {
    var pwd = null;
    if (data.isWrongPassword) {
        pwd = prompt(browser.i18n.getMessage("errorVLCHTTPPromptWrongPassword"));
    } else {
        pwd = prompt(browser.i18n.getMessage("errorVLCHTTPPromptPassword"));
    }
    return pwd;
});

Message.onMessage("alert", (data) => {
    alert(data);
})
