function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form[action="/agent/check_login.html"] .for_form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const errorBlock = form.querySelector('.errrr');
    errorBlock ? errorBlock.before(wrapper) : form.append(wrapper);
    button.classList.add("sbmt");
    button.style.width = "initial";
    button.style.margin = "0";

    select.style.marginTop = "2px";
    label.style.color = "#aa113f";
    label.style.fontSize = "10px";
    select.before(label);
    querySelectorAll(document, '.agency_l, .fiz_r').forEach( div => { div.style.height = '330px'} )


}

function getElementsForQuickLoginAction() {
     return {specialInputs: true};
}

function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const form = document.querySelector('form[action="/agent/check_login.html"]');

    const usernameInp = form.querySelector('input#lform_login');
    const passwordInp = form.querySelector('input#lform_password');

    const loginBtn = form.querySelector('input.sbmt');
    if ( usernameInp  && insertPassword === false ) {
        usernameInp.value = login;
        return;
    }

    if ( !passwordInp || !loginBtn ) {
        return;
    }
    setInputsValue(usernameInp, passwordInp, login, password);
    loginBtn.click();
    clearInputsValue(usernameInp, passwordInp);
}
