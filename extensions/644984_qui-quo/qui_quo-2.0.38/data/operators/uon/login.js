function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = getElementsForQuickLoginAction();
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const area = form.querySelector('.submitArea');
    if ( area ) {
        area.after(wrapper);
        select.style.width = 'initial';
        button.classList.add("btn", "btn-success");
        wrapper.style.padding = "0 104px";
        select.before(label);
    }

}

function getElementsForQuickLoginAction() {
    const passwordInp = document.querySelector("#login_password");
    if (passwordInp ) {
        const form = passwordInp.closest("form");
        const usernameInp = form.querySelector("#login_input");
        const loginBtn = form.querySelector("#submit");
        return {form, usernameInp, passwordInp, loginBtn, event: ["change"]}
    }
    return {};
}
