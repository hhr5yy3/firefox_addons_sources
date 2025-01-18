function injectAutoLoginSelect(logins, manager, opts) {
    const head = document.querySelector('.b-login-head');
    if ( !head || head.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    head.append(wrapper);
    button.classList.add("b-login-head__login-submit");
    button.style.width = "initial";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.color = "white";


    select.before(label);

    wrapper.style.marginTop = "10px";
    if ( window.location.host.match("sunmar.ru") ) {
        querySelectorAll(label, "span").forEach(span=>span.style.color = "#283067")
    }

}

function getElementsForQuickLoginAction() {
     return {specialInputs: true};
}

function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const head = document.querySelector('.b-login-head');

    const usernameInp = head.querySelector('#ctl00_TopMainPlace_tbx_login');
    const passwordInp = head.querySelector('#ctl00_TopMainPlace_tbx_passwd');

    const fakeUsernameInp = head.querySelector('#ctl00_TopMainPlace_tbx_login_text');
    const fakePasswordInp = head.querySelector('#ctl00_TopMainPlace_tbx_passwd_text');
    const loginBtn = head.querySelector('#ctl00_TopMainPlace_btn_ok');
    if ( usernameInp && fakeUsernameInp && insertPassword === false ) {
        usernameInp.value = login;
        fakeUsernameInp.value = login;
        return;
    }

    if ( !passwordInp || !fakePasswordInp || !loginBtn ) {
        return;
    }
    setInputsValue(usernameInp, passwordInp, login, password);
    setInputsValue(fakeUsernameInp, fakePasswordInp, login, password);
    loginBtn.click();
    clearInputsValue(usernameInp, passwordInp);
    clearInputsValue(fakeUsernameInp, fakePasswordInp);
}
