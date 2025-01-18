function getFindFormElements() {
    try {
        const fakeInput = document.createElement('input');
        const form = document.querySelector("#login-form");
        const usernameInp = form.querySelector("#login-or-phone") || fakeInput;
        const passwordInp = form.querySelector("#password") || fakeInput;
        const loginBtn = form.querySelector("#button-submit");
        const event = ["focus", "input", "keyup"];
        return {passwordInp, form, usernameInp, loginBtn, event};
    } catch (e) {
        return {error: e};
    }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.width = "auto";
}
