function injectAutoLoginSelect(logins, manager, opts) {
    const loginBtn = document.querySelector('#ctl00_generalContent_LoginControl_btnLogin');
    const loginBtnSearch = document.querySelector('input.loginbutton');
    if ( (!loginBtn && !loginBtnSearch) || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    if ( loginBtn ) {
        loginBtn.closest("table").closest("tbody").closest("table").after(wrapper);
    }

    if ( loginBtnSearch ) {
        loginBtnSearch.after(wrapper);
        wrapper.style.margin = "10px";
        wrapper.style.display = "inline-flex";
    }

    wrapper.style.maxWidth = "300px";
    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.marginTop = "3px";
    label.style.marginBottom = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const usernameInp = document.querySelector('input#ctl00_generalContent_LoginControl_txtUserName, #ctl00_Login_ctl01');
    const passwordInp = document.querySelector('input#ctl00_generalContent_LoginControl_txtPassword, #ctl00_Login_ctl02');

    const loginBtn = document.querySelector('#ctl00_generalContent_LoginControl_btnLogin, input.loginbutton');
    return {usernameInp, passwordInp, loginBtn}
}
