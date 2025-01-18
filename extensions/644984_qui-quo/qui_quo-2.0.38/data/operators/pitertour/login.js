function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#user-login-modal');
    if ( !form || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const passwordInp = form.querySelector('input[name="password"]');
    if ( passwordInp ) {
        const media = passwordInp.closest(".media");
        const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
        button.classList.add("btt", "bgcolor-orange-1", "bgcolor-orange-2-h", "color-blue-1");
        wrapper.style.marginTop = "10px";
        wrapper.style.alignItems = "center";
        button.style.width = "100%";
        select.style.width = "100%";
        media.after(wrapper);
        label.style.marginLeft = "3px";
        select.before(label);
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#user-login-modal');

    const usernameInp = form.querySelector('input[name="login"]');
    const passwordInp = form.querySelector('input[name="password"]');

    const loginBtn = form.querySelector('button .glyphicon-log-in');
    return {usernameInp, passwordInp, loginBtn}
}
