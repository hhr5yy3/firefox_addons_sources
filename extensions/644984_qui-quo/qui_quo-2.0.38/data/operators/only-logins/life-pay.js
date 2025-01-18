window.isQuickLoginAsyncFormAction = true;
function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#login');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    
    form.append(wrapper);

    select.before(label);
}

function getElementsForQuickLoginAction() {
    return {specialInputs: true}
}


function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const form = document.querySelector('#login');
    
    const usernameInp = form.querySelector('input#LoginForm_username');
    const passwordInp = form.querySelector('input#LoginForm_password');
    usernameInp.value = login.trim();
    simulateEvent(usernameInp, ["focus", "keypress","blur"]);
    
    passwordInp.value = password.trim();
    form.submit();
}
