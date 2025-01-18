function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form[action="j_security_check"]');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form[action="j_security_check"]');
    const usernameInp = form.querySelector('input[name="j_username"]');
    const passwordInp = form.querySelector('input[name="j_password"');

    const loginBtn = form.querySelector('button[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
