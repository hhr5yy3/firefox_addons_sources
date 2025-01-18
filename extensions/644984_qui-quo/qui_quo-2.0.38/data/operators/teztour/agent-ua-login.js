function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#login-form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);

    button.style.width = "initial";
    button.style.background = "#ffdd00";
    button.style.color = "#0d4689";
    button.style.borderRadius = "4px";
    button.style.fontSize = "15px";
    button.style.fontWeight = "bold";

    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";
    label.style.color = "#000";

    wrapper.style.width = "100%";
    wrapper.style.paddingTop = "10px";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#login-form');

    const usernameInp = form.querySelector('input#login-edit-0-email');
    const passwordInp = form.querySelector('input#login-edit-0-password');

    const loginBtn = form.querySelector('input.blue_btn.orange[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
