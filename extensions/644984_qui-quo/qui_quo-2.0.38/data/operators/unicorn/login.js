function injectAutoLoginSelect(logins, manager, opts) {
    const btn = document.querySelector('#BtnLogin');
    if ( !btn || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    btn.closest(".row").after(wrapper);
    button.classList.add("btn", "green");
    wrapper.style.marginLeft = "60%";

    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const loginBtn = document.querySelector('#BtnLogin');
    const usernameInp = document.querySelector('input#edtUsername');
    const passwordInp = document.querySelector('input#edtPassw');
    return {usernameInp, passwordInp, loginBtn, event: "keyup"}
}
