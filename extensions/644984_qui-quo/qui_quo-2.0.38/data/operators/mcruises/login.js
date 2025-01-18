function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = getElementsForQuickLoginAction();
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("signin-account-block_submit");
    button.style.width = "100%";
    button.style.margin = "0";
    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const passwordInp = $1(".signin-account-block_agent input[type='password'], .steps-reg__agency [data-inputtype='password']");
    const form = passwordInp.closest(".signin-account-block_agent, .steps-reg__agency");
    const usernameInp = form.querySelector('.steps-reg__agency [data-inputtype="login"]') || form.querySelector("input[type='text'], input[name='login']");
    const loginBtn = form.querySelector(".signin-account-block_submit:not(.qq-quick-login-btn), .steps-reg__btn.js--steps-reg__btn");
    return {form, usernameInp, passwordInp, loginBtn, event: ["change"], specialInputs: true}
}

async function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const {usernameInp, passwordInp, loginBtn, event} = getElementsForQuickLoginAction();
    if ( usernameInp && insertPassword === false ) {
        usernameInp.value = login;
        return;
    }
    if ( !passwordInp ) {
        return;
    }
    usernameInp.value = login;
    simulateEvent(usernameInp, event);
    await waitingFor(()=>null, 150, 2);
    passwordInp.value = password;
    await waitingFor(()=>null, 150, 2);
    simulateEvent(passwordInp, event);
    if ( loginBtn ) {
        loginBtn.click();
    }
}
