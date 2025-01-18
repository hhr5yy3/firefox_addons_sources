function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form#login_form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("b-login__submit");
    button.style.fontSize = "12px"
    select.style.marginTop = "3px";
    label.style.marginTop = "3px";
    label.style.marginBottom = "3px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "12px"
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form#login_form');
    const usernameInp = form.querySelector('input#login_user');
    const passwordInp = form.querySelector('input#login_pass');

    const loginBtn = form.querySelector('input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn, event: ["focus", "input", "change", "blur"]}
}
