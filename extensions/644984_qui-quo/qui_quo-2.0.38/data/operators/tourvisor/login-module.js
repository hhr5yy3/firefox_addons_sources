function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.TVLoginForm');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    label.style.fontSize = '12px';
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.TVLoginForm');
    const usernameInp = form.querySelector('input[type="email"]');
    const passwordInp = form.querySelector('input[type="password"]');
    const loginBtn = form.querySelector('.TVDialogButton ');
    return {usernameInp, passwordInp, loginBtn}
}
