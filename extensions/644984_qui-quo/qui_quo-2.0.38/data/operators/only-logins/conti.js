function injectAutoLoginSelect(logins, manager, opts) {
    const loginBtnSearch = document.querySelector(' #wlpeLoginButton');
    if (!loginBtnSearch || document.querySelector(".qq-quick-login-btn")) {
        return;
    }
    const {wrapper, select, label, button} = createAutoLoginWrapper(logins, manager, opts);
    (document.querySelector('.big') || {style: {}}).style.zIndex = '999999999999999999';
    loginBtnSearch.after(wrapper);
    wrapper.style.margin = "10px";
    wrapper.style.display = "inline-flex";
    wrapper.style.maxWidth = "300px";
    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.marginTop = "3px";
    label.style.marginBottom = "3px";
    button.style.background = 'none';
    button.style.border = 'solid';
    button.style.width = '100%';

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const usernameInp = document.querySelector('input#ctl00_generalContent_LoginControl_txtUserName, #ctl00_Login_ctl01');
    const passwordInp = document.querySelector('input#ctl00_generalContent_LoginControl_txtPassword, #ctl00_Login_ctl02');

    const loginBtn = document.querySelector('#wlpeLoginButton');
    return {usernameInp, passwordInp, loginBtn}
}
