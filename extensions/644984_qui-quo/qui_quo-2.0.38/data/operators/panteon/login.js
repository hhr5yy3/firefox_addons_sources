function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#loginDialog .modal-content');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("btn", "btn-default", "sign-in");
    button.style.width = "initial";
    button.style.backgroundColor = "#00c2eb";
    button.style.color = "white";
    button.style.border = "none";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";

    wrapper.style.padding = "0px 20px 20px 20px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#loginDialog .modal-content');

    const usernameInp = form.querySelector('input#login');
    const passwordInp = form.querySelector('input#password');

    const loginBtn = $$('.sign-in:not(.qq-quick-login-btn), [data-bind="click: login"]', form).find( btn => btn.clientHeight> 0 );
    return {usernameInp, passwordInp, loginBtn, event: "change"}
}
