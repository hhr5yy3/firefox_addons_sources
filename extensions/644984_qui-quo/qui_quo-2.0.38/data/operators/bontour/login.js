function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.login_form form');
    if ( !form || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const passwordInp = form.querySelector('input#pass');
    if ( passwordInp ) {
        form.style.paddingLeft = "25px";
        form.style.paddingRight = "25px";

        form.style.marginLeft = "-25px";
        form.style.marginRight = "-25px";

        form.style.marginBottom = "-50px";
        form.style.paddingBottom = "50px";

        form.style.background = "white";
        const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
        wrapper.style.display = 'inline-flex';
        wrapper.style.marginBottom = '5px';
        button.classList.add("enter");
        button.style.borderRadius = "4px";
        passwordInp.after(wrapper);
        label.style.marginLeft = "3px";
        label.style.fontSize = "12px";
        select.before(label);
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.login_form form');

    const usernameInp = form.querySelector('input#log');
    const passwordInp = form.querySelector('input#pass');

    const loginBtn = form.querySelector('input[type="submit"].enter');
    return {usernameInp, passwordInp, loginBtn}
}
