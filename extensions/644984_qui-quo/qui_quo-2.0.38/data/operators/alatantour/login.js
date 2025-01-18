function injectAutoLoginSelect(logins, manager, opts) {
    const loginBtn = document.querySelector('#ctl00_LoginControl_btnLogin');
    if ( !loginBtn || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    loginBtn.closest(".modal-body").append(wrapper);
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const usernameInp = document.querySelector('input#ctl00_LoginControl_txtUserName');
    const passwordInp = document.querySelector('input#ctl00_LoginControl_txtPassword');

    const loginBtn = document.querySelector('#ctl00_LoginControl_btnLogin');;
    return {usernameInp, passwordInp, loginBtn}
}
