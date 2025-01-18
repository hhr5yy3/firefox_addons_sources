let clickedButton = null;
function injectAutoLoginSelect(logins, manager, opts) {
    const topForm = document.querySelector('.js-authorization form .form-group, .js-authorization-userdialog .form-group');
    const mainForm = document.querySelector('form .form-wrap');
    
    if ( mainForm ) {
        createMainWrapper(mainForm, logins, manager, opts);
    }
    
     if ( topForm ) {
        createTopWrapper(topForm, logins, manager, opts)
    }
}

function createMainWrapper(form, logins, manager, opts) {
    if ( form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    const fromButton = form.querySelector('button[type="submit"]');
    button.addEventListener("click", setClickedButton);
    fromButton.after(wrapper);
    select.before(label);
    setStyle(button, wrapper, label, select)
}

function createTopWrapper(form, logins, manager, opts) {
    if ( form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const userDialog = document.querySelector(".js-authorization-userdialog");
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.addEventListener("click", setClickedButton);
    if ( userDialog ) {
        userDialog.style.height = "auto";
    }
    form.append(wrapper);
    select.before(label);
    wrapper.style.padding = "0px 10px 0px 10px";
    setStyle(button, wrapper, label, select)
}

function setStyle(button, wrapper, label, select) {
    button.classList.add("form-btn", "form-btn_default");

    label.classList.add("form-item-title");

    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.style.marginTop = "0px";
    select.style.font = "status-bar";
}

function getElementsForQuickLoginAction() {
    const form = clickedButton ? clickedButton.closest("form") || document.querySelector('.js-authorization-userdialog .form-group') :
        document.querySelector('.js-authorization form, .js-authorization-userdialog .form-group, form .form-wrap');
    const usernameInp = form.querySelector('input[name="UserName"], input#Email, input#UserName');
    const passwordInp = form.querySelector('input[name="Password"], input#Password, input#Password');
    const loginBtn = form.querySelector('.js-authorization-userdialog-enterblock .js-auth-login, button[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
