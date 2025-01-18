function getFindFormElements() {
    try {
        const passwordInp = document.querySelector("#PasswordNew");
        const form = passwordInp.closest(".new_loginform");
        const usernameInp = form.querySelector("#LoginNameNew");
        const loginBtn = document.querySelector("#LoginImageNew");
        const event = ["focus", "input", "change", "blur"];
        return {passwordInp, form, usernameInp, loginBtn, event};
    } catch (e) {
        return {error: e};
    }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.width = "auto";
}
