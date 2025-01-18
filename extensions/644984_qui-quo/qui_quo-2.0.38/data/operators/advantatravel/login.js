function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form.login');
    if ( !form || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const passwordInp = form.querySelector('input[name="pass"]');
    if ( passwordInp ) {
        const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
        passwordInp.after(wrapper);
        label.style.marginLeft = "3px";
        select.before(label);
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form.login');

    const usernameInp = form.querySelector('input[name="name"]');
    const passwordInp = form.querySelector('input[name="pass"]');

    const loginBtn = form.querySelector('input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
