function injectAutoLoginSelect(logins, manager, opts) {
    const loginBtn = document.querySelector('[data-event="login"]');
    const {wrapper, button} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.cssText = `display: flex;flex-direction: column;margin: 2.5px 0px;width: 240px;margin-left: 35px;`;
    if ( loginBtn && !document.querySelector('.qq-auto-login-wrapper')) {
        loginBtn.after(wrapper);
    }
}

function getElementsForQuickLoginAction() {
    const usernameInp = document.querySelector('input#agName');
    const passwordInp = document.querySelector('input#agPassword');
    
    const loginBtn = document.querySelector('[data-event="login"]');
    return {usernameInp, passwordInp, loginBtn}
}
