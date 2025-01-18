function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form[action="https://login.bgoperator.ru/auth"] table.auth_tbl tbody');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("auth_tbl_btn_send");

    button.style.marginTop = "10px";
    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form[action="https://login.bgoperator.ru/auth"] table.auth_tbl tbody');
    const usernameInp = form.querySelector('input#login');
    const passwordInp = form.querySelector('input#pwd');
    const loginBtn = form.querySelector('button.auth_tbl_btn_send:not(.qq-quick-login-btn)');
    return {usernameInp, passwordInp, loginBtn}
}
