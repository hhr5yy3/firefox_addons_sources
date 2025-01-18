function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form#LoginForm');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    form.style.width = "300px";
    button.style.cursor = "pointer";
    button.style.height = "28px";
    button.classList.add("ac-button");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#LoginDialog, #LoginForm');
    const usernameInp = form.querySelector('input#Login, input#Login');
    const passwordInp = form.querySelector('input#Password, input[name="authPassword"]');
    const loginBtn = form.querySelector('#blogin') || form.nextElementSibling.querySelector('button');;

    return {usernameInp, passwordInp, loginBtn}
}
