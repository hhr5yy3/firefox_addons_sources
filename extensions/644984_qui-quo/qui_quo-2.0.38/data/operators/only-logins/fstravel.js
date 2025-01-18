window.isQuickLoginAsyncFormAction = true;
function getFindFormElements() {
    try {
        const form = document.querySelector(".popup-auth .v-modal-content, div.login");
        const usernameInp = form.querySelector('input[type="text"], input[type="email"]');
        const passwordInp = form.querySelector('input[type="password"]');
        const loginBtn = form.querySelector('button[type="submit"], button.button.lg');
        const event = ["focus", "input", "keyup"];
        return {passwordInp, form, usernameInp, loginBtn, event};
    } catch (e) {
        return {error: e};
    }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.width = "auto";
}
