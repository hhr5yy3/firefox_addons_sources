function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#loginForm form, #loginform');
    if ( !form || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const formGroups = querySelectorAll(form, '.form-group');
    formGroups[1].after(wrapper);
    button.classList.add("btn", "btn-primary");

    label.style.marginLeft = "3px";

    if ( form.id === "loginform" ) {
        wrapper.style.maxWidth = "205px";
        wrapper.style.marginBottom = "5px";
        button.style.paddingLeft = "10px";
        label.style.fontSize = "11px";
        select.style.marginTop = "2px";
    } else {
        wrapper.style.marginLeft = "190px";
        wrapper.style.maxWidth = "315px";
    }

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#loginForm form, #loginform');

    const usernameInp = form.querySelector('input#Login');
    const passwordInp = form.querySelector('input#Password');

    const loginBtn = form.querySelector('.form-group input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
