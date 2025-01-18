function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form[action="/auth/signin"], form#loginForm, [name="authLogin"]');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.classList.add("btn-danger");
    button.style.width = "initial";
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
    const panel = document.querySelector("#loginbox");
    if ( panel ) {
        panel.style.height = "initial";
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form[action="/auth/signin"], form#loginForm, [name="authLogin"]');
    const loginBtn = form.querySelector('button');
    const usernameInp = form.querySelector('input[name="username"],input[name="login"]');
    const passwordInp = form.querySelector('input[name="password"], input[name="passwd"]');
    const event = ['input', 'change', 'click']
    return {usernameInp, passwordInp, loginBtn, event, form}
}
