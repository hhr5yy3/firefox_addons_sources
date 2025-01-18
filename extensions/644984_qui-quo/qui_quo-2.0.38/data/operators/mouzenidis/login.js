function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#LoginForm');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    wrapper.style.lineHeight = "20px";

    button.classList.add("button", "fullwidth", "mouzenidis");
    button.style.width = "initial";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.classList.add("label_login");
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#LoginForm');
    const usernameInp = form.querySelector('input#LoginViewModel_Username');
    const passwordInp = form.querySelector('input#LoginViewModel_Password');
    const loginBtn = form.querySelector('button[value="login"]');
    return {usernameInp, passwordInp, loginBtn}
}
