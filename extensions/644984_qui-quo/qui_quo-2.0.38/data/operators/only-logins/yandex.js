const memoizedFindForm = findForm();
window.isQuickLoginAsyncFormAction = true;

function getFindFormElements() {
    try {
        const fakeInput = document.createElement('input');
        const form = document.querySelector(".passp-login-form form, .AuthPasswordForm form, .passp-auth-content form");
        const usernameInp = form.querySelector('input#passp-field-login') || fakeInput;
        const passwordInp = document.querySelector("#passp-field-passwd") || fakeInput;
        const loginBtn = form.querySelector("[id='passp:sign-in']");
        const loginBtnClasses = loginBtn ? [...loginBtn.classList] : [];
        const event = ["focus", "input", "keyup"];
        return {passwordInp, form, usernameInp, loginBtn, event, loginBtnClasses, notHideInputs: true};
    } catch (e) {
        console.log(e)
        return {error: e};
    }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.width = "auto";

}
