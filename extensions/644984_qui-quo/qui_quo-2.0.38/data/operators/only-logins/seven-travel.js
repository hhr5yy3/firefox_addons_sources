function getFindFormElements() {
    try {
        const passwordInp = document.querySelector("#authPass");
        const form = passwordInp.closest(".modal-content");
        const usernameInp = form.querySelector("#authLogin");
        const loginBtn = form.querySelector("#modalAuth-ok");
        const event = ["focus", "input", "change", "blur"];
        return  {passwordInp, form, usernameInp, loginBtn, event};
    } catch (e) {
        return {error: e};
    }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.width = "auto";
}
