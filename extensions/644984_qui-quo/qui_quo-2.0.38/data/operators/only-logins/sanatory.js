function injectAutoLoginSelect(logins, manager, opts) {
    const {loginBtn, form} = findForm();
    if ( !loginBtn || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label, button} = createAutoLoginWrapper(logins, manager, opts);
    button.className = button.className + " " + loginBtn.className;
    button.style.width = '100%';
    form.append(wrapper);
    select.before(label);
}

function getElementsForQuickLoginAction() {
    return  {specialInputs: true};
}

function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const {usernameInp, passwordInp, loginBtn} = findForm();

    if ( usernameInp && insertPassword === false ) {
        usernameInp.value = login;
        return;
    }

    if ( !passwordInp || !loginBtn ) {
        return;
    }

    usernameInp.value = login;
    passwordInp.value = password;
    simulateEvent(passwordInp, 'input');
    simulateEvent(usernameInp, 'input');
    loginBtn.click();
}

function findForm() {
    try {
        const passwordInp = document.querySelector("input[type='password'], input[name='pass']");
        const form = passwordInp.closest("form .modal-content, form, #authForm");
        const usernameInp = form.querySelector("input[type='text'], input[name='login']");
        const loginBtn = form.querySelector("input[type='submit'], button[type='submit'], button[name='login'], input[alt='Войти']");
        const event = ["focus", "input", "change", "blur"];
        return  {passwordInp, form, usernameInp, loginBtn, event};
    } catch (e) {
        return {error: e};
    }
}