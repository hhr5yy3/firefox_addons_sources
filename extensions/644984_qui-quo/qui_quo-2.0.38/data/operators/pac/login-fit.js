function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.loginForm');
    if ( !form || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const passwordInp = form.querySelector('input[name="ctl00$generalContent$txtUserPass"]');
    if ( passwordInp ) {
        const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
        button.classList.add("submit_button", "input_box");
        wrapper.style.width = "250px";
        wrapper.style.alignItems = "center";
        wrapper.style.position = "absolute";
        wrapper.style.top = "150px";
        wrapper.style.left = "350px";
        wrapper.style.background = "#f48232";
        wrapper.style.padding = "15px";
        wrapper.style.borderRadius = "15px";


        button.style.width = "100%";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.backgroundColor = "#035687";
        button.style.color = "#fff";
        button.style.height = "27px";

        select.style.width = "100%";
        passwordInp.after(wrapper);
        label.style.marginLeft = "3px";
        select.before(label);
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.loginForm');

    const usernameInp = form.querySelector('input[name="ctl00$generalContent$txtUserName"]');
    const passwordInp = form.querySelector('input[name="ctl00$generalContent$txtUserPass"]');

    const loginBtn = form.querySelector('input[name="ctl00$generalContent$cmdLogin"]');
    return {usernameInp, passwordInp, loginBtn}
}
