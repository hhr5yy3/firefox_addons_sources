function injectAutoLoginSelect(logins, manager, opts) {
    const dialog = document.querySelector('#authorization-dialog, .auth_block form, #auth-form__form');

    if ( !dialog || dialog.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const dialogBtn = dialog.querySelector('#login-button, input[type="submit"]');
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button', 'qq');
    buttonContainer.append(button) ;
    buttonContainer.style.width = "100%";

    button.classList.add("button", "auth-form__submit");
    button.style.width = "100%";

    select.style.width = "245px";
    select.style.marginTop = "0px";
    label.style.width = "245px";

    select.before(label);

    wrapper.style.alignItems = "flex-end";
    wrapper.style.flexFlow = "column wrap";
    wrapper.prepend(buttonContainer);
    dialogBtn.after(wrapper);
}

function getElementsForQuickLoginAction() {
    const dialog = document.querySelector('#authorization-dialog, .auth_block form, #auth-form__form');
    const usernameInp = dialog.querySelector('#username');
    const passwordInp = dialog.querySelector('#password');
    const loginBtn = dialog.querySelector('#login-button, input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
