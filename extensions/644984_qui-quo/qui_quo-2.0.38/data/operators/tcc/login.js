function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form.demo-ruleForm');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.classList.add("el-button", "el-button--primary");
    button.style.width = "initial";
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form.demo-ruleForm');
    const usernameInp = form.querySelector('input[placeholder="Логин"]');
    const passwordInp = form.querySelector('input[placeholder="Пароль"]');
    const loginBtn = form.querySelector('.el-form-item__content button');
    return {loginBtn, usernameInp, passwordInp, event: "input"}
}
