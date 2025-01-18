window.isQuickLoginAsyncFormAction = true;

function getFindFormElements() {
    try {
        const fakeInput = document.createElement('input');
        const form = document.querySelector("form");
        const usernameInp = form.querySelector('input[name="identifier"]') || fakeInput;
        const passwordInp = form.querySelector('input[name="Passwd"]') || fakeInput;
        const loginBtn = document.querySelector("#identifierNext button, #passwordNext button");
        const loginBtnClasses = loginBtn ?  [...loginBtn.classList] : [];
        const event = ["focus", "input", "keyup"];
        return {passwordInp, form, usernameInp, loginBtn, event, loginBtnClasses};
    } catch (e) {
        console.log(e)
        return {error: e};
    }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.width = "auto";

}
