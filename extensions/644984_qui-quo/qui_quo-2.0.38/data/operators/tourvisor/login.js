function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.right-login form, .right-col form, form.login-form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("btn", "btn-success", "primary", 'button-contained');
    button.style.width = "initial";
    button.style.paddingLeft = "6px";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "10px";

  //  wrapper.style.width = "200px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.right-login form, .right-col form, form.login-form');
    const usernameInp = form.querySelector('input[name="_username"]') || form.querySelector('input[type="text"]');
    const passwordInp = form.querySelector('input[name="_password"]') || form.querySelector('input[type="password"]');
    const loginBtn = form.querySelector('input.btn-success, .buttons .btn-success, .btn-success[type="submit"]') || form.querySelector('button[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
