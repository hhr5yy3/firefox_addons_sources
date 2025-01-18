window.isQuickLoginAsyncFormAction = false;


function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#LoginForm, #signInForm');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add('btn', 'btn-primary', 'btn-block', 'btn-lg', 'green', 'small');
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#LoginForm, #signInForm');
    const usernameInp = form.querySelector('input#txtUsername, input#Login_UserName');
    const passwordInp = form.querySelector('input#txtPassword, input#Login_Password');
    const loginBtn = form.querySelector('#btnLogin, #signInSubmit');
    usernameInp.type = 'hidden'
    passwordInp.type = 'hidden'

    return {usernameInp, passwordInp, loginBtn}
}
