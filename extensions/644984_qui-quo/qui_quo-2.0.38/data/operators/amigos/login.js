function injectAutoLoginSelect(logins, manager, opts) {
    const hiddenInput = document.querySelector('#ctl00_generalContent_LoginControl_isPopup');

    if ( !hiddenInput || document.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }
    const form = hiddenInput.closest("table");
    if ( !form ) {
        return;
    }

    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.margin = "0px 70px";
    button.style.width = "initial";
    button.style.cursor = "pointer";
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    hiddenInput.after(wrapper);

}

function getElementsForQuickLoginAction() {
    const usernameInp = document.querySelector('#ctl00_generalContent_LoginControl_txtUserName');
    const passwordInp = document.querySelector('#ctl00_generalContent_LoginControl_txtPassword');
    const loginBtn = document.querySelector('#ctl00_generalContent_LoginControl_btnLogin');
    return {usernameInp, passwordInp, loginBtn}

}
