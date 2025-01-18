let clickedButton = null;
function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector( 'form.login-popup__form, .login-popup-form--signin');
    const oldForm = document.querySelector( 'form[name="f1"]');
    createNewStyleWrapper(form, logins, manager, opts);
    createOldStyleWrapper(oldForm, logins, manager, opts);
}

function createNewStyleWrapper(form, logins, manager, opts) {
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label, a} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    wrapper.style.lineHeight = "20px";

    button.classList.add("login-popup__btn");
    button.style.width = "initial";
    button.addEventListener("click", setClickedButton);

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.textDecoration = "initial";
    label.style.color = 'white';
    a.style.color = 'white';
    label.classList.add("header__info-link");
    select.before(label);
}

function createOldStyleWrapper(form, logins, manager, opts) {
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const inputBtn = form.querySelector('input[type="submit"]');
    inputBtn.after(wrapper);

    button.style.cssText = "width: initial;background-color: LightGray;border: solid 1px Gray;padding:3px;color:#003366;cursor:pointer";
    button.addEventListener("click", setClickedButton);
    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.textDecoration = "initial";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = clickedButton ? clickedButton.closest("form") : document.querySelector('form.login-popup__form, form[name="f1"], .login-popup-form--signin');
    const usernameInp = form.querySelector('input#header_lgn, input[name="lgn"], #headerLoginFormEmail');
    const passwordInp = form.querySelector('input#header_pwd, input[name="pwd"], #headerLoginFormPassword');
    const loginBtn = form.querySelector('.login-popup__button button, input[type="submit"], #headerLoginFormSignInButton');
    return {form, usernameInp, passwordInp, loginBtn}
}
