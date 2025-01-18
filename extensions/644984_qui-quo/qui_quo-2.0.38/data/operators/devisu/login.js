function injectAutoLoginSelect(logins, manager, opts) {
    const loginBtn = document.querySelector('#ctl00_generalContent_LoginControl_btnLogin');
    if ( !loginBtn || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {wrapper, select, label, button} = createAutoLoginWrapper(logins, manager, opts);

    loginBtn.closest(".fui-b-login-page__form").append(wrapper);

    button.classList.add("fui-b-wrap", "greenButton");
    button.style.maxWidth = "300px";
    wrapper.style.maxWidth = "300px";
    select.style.marginTop = "0px";

    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}