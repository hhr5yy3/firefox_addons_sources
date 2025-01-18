function injectAutoLoginSelect(logins, manager, opts) {
    const formModal = document.querySelector('form[name="authForm"], form.form--validation');
    if ( !formModal || formModal.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    formModal.append(wrapper);
    button.classList.add("auth-modal-block-form-button");
    button.style.fontSize = "16px";
    wrapper.style.marginTop = "15px";
    label.style.color = "#fff";

    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const formModal = document.querySelector('auth form[name="authForm"], form.form--validation');
    const loginBtn = formModal.querySelector('button[type="submit"].auth-modal-block-form-button');
    const usernameInp = formModal.querySelector('input[name="LoginForm[username]"], input[placeholder="Логин"]');
    const passwordInp = formModal.querySelector('input[name="LoginForm[password]"], input[placeholder="Пароль"]');
    console.log({usernameInp, passwordInp, loginBtn});
    return {usernameInp, passwordInp, loginBtn, event: ["focus","input","change","keyup", "blur"]}
}