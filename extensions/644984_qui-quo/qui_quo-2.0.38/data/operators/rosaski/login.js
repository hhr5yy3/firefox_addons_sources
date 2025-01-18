function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form[name="form_auth"]');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    form.append(wrapper);
    button.classList.add("btn", "btn-primary");
    wrapper.style.maxWidth = "300px";
    select.style.maxWidth = "300px";

    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form[name="form_auth"]');
    const usernameInp = form.querySelector('input[name="USER_LOGIN"]');
    const passwordInp = form.querySelector('input[name="USER_PASSWORD"]');
    const loginBtn = form.querySelector('input[name="Login"]');
    return {usernameInp, passwordInp, loginBtn, event: "keyup"}
}
