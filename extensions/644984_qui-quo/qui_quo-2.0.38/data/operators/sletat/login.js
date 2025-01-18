function injectAutoLoginSelect(logins, manager, opts) {
    let form = document.querySelector('form[name="signInForm"], .uis-popup__content_authorization, #FormLoginContainer');
    if ( !form ) {
        form = findForm().form
    }
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("b2b-btn", "b2b-btn_full-width");
    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    select.before(label);
}

function findForm() {
    try {
        const passwordInp = document.querySelector("input[type='password'], input[name='password']");
        const form = passwordInp.parentNode.parentNode.parentNode.parentNode;
        const usernameInp = form.querySelector("input[type='text'], input[name='login']");
        const loginBtn = $$('button', form).find(btn => getText(btn).match(/войти/i));
        const event = ["focus", "input", "change", "blur"];
        return {passwordInp, form, usernameInp, loginBtn, event, specialInputs: true};
    } catch (e) {
        return {error: e};
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form[name="signInForm"], .uis-popup__content_authorization, #FormLoginContainer');
    if ( !form ) {
        return findForm();
    }
    const usernameInp = form.querySelector('input[name="email"], input[name="username"], #Login');
    const passwordInp = form.querySelector('input[name="password"], input[name="password"], #Password');

    const loginBtn = form.querySelector('input[type="submit"], .login-btn-wrapper button, #btnLogin');
    return {usernameInp, passwordInp, loginBtn, event: ["focus", "input", "change", "blur"], specialInputs: true}
}

async function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const {usernameInp, passwordInp, loginBtn, event} = getElementsForQuickLoginAction()
    if ( usernameInp && insertPassword === false ) {
        usernameInp.value = login;
        return;
    }
    if ( !passwordInp ) {
        return;
    }
    setReactInputValue(usernameInp, login)
    setReactInputValue(passwordInp, password)
    if ( loginBtn ) {
        loginBtn.click();
    }
}
