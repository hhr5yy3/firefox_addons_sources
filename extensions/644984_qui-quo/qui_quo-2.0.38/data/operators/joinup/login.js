function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form[action="/auth/signin"], form#loginForm, [name="authLogin"], form#loginform, form.authForm');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {select, button, wrapper} = createAutoLoginWrapper(logins, manager, opts);
    
    wrapper.style.marginLeft = "auto";
    wrapper.style.marginRight = "auto";
    wrapper.style.marginTop = "30px";
    wrapper.style.width = "250px";
    button.style.width = 'initial';
    button.classList.add("btn-danger");
    
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form[action="/auth/signin"], form#loginForm, [name="authLogin"], form#loginform, form.authForm');
    const loginBtn = form.querySelector('button, input[type="submit"]');
    const usernameInp = form.querySelector('input[name="username"],input[name="login"], input#user_login');
    const passwordInp = form.querySelector('input[name="password"], input[name="passwd"], input#user_pass');
    const event = ['input', 'change', 'click']
    return {usernameInp, passwordInp, loginBtn, event, form}
}
