function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.form-enter form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const header = document.querySelector("div.header");
    header.style.height = "160px";
    form.append(wrapper);

    wrapper.style.padding = "0px 10px 0px 10px";

    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    label.style.color = "white";
    label.style.fontSize = "12px";
    select.style.marginTop = "0px";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.form-enter form');
    const usernameInp = form.querySelector('input#login');
    const passwordInp = form.querySelector('input#password');
    const loginBtn = form.querySelector('input.btn-secur');
    return {usernameInp, passwordInp, loginBtn}
}
