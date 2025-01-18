function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form#form-agent');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("btn");
    button.textContent = "Войти с пом. Qui-Quo";
    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "12px";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form#form-agent');
    const usernameInp = form.querySelector('input[name="login"]');
    const passwordInp = form.querySelector('input[name="pass"]');
    const loginBtn = form.querySelector('button[type="submit"]');
    return {usernameInp, passwordInp, loginBtn, event: "input"}
}
