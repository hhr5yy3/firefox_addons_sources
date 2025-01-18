function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#ctl00_authControl_loginPanel');
    if (!form || document.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.cssText = `
        min-width: 230px;
        font-size: initial;
        padding: 0;
        margin: 0;
        height: 24px;
        width: 285px;`;
    button.style.cursor = "pointer";
    wrapper.style.marginLeft = "15px";
    wrapper.style.maxWidth = "285px";
    select.before(label);
    form.before(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#ctl00_authControl_loginPanel');
    const usernameInp = form.querySelector('#ctl00_authControl_login');
    const passwordInp = form.querySelector('#ctl00_authControl_password')
    const loginBtn = form.querySelector('#ctl00_authControl_logOnButton');
    return {usernameInp, passwordInp, loginBtn, event: "input"}
}

