function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#signin form');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.classList.add("btn","btn-primary");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#signin form');
    const usernameInp = form.querySelector('input#user-name');
    const passwordInp = form.querySelector('input#user-pass');
    const loginBtn = form.querySelector('input.submit');
    return {usernameInp, passwordInp, loginBtn}
}
