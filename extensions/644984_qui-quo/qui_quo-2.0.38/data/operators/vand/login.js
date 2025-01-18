function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#window-personal-right');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.style.fontSize = "12px";
    button.style.margin = "0";
    button.style.width = "100%";
    select.style.marginTop = "3px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "12px"
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#window-personal-right');
    const usernameInp = form.querySelector('input[name="login"]');
    const passwordInp = form.querySelector('input[name="password"]');

    const loginBtn = form.querySelector('button.personal-login-btn');
    return {usernameInp, passwordInp, loginBtn, event: ["focus", "input", "change", "blur"]}
}
