function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#form_auth');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.style.fontSize = "12px";
    button.style.marginTop = "30px";
    button.style.minWidth = "130px";
    
    wrapper.style.width = '130px';

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#form_auth');
    const usernameInp = form.querySelector('input#loginname');
    const passwordInp = form.querySelector('input#password');

    const loginBtn = form.querySelector('input.enter_login');
    return {usernameInp, passwordInp, loginBtn, event: ["focus", "input", "change", "blur"]}
}
