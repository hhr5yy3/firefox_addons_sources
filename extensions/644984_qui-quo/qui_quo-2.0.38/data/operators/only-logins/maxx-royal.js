const memoizedFindForm = findForm();

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if (form && !form.querySelector(".qq-quick-login-btn")) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        form.append(autoLoginForm);
    }
}

function findForm() {
    let cache = {};
    return () => {
        if ("form" in cache) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("#txtpassword");
            const form = passwordInp.closest("form .login-wrapper .panel-body");
            const usernameInp = form.querySelector("#txtusername");
            const loginBtn = form.querySelector("#btnSubmit");
            const event = ["focus", "click", "input", "change", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
            return {error: e};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    wrapper.style.alignItems = "center";
    wrapper.style.width = "100%";

    button.classList.add("btn", "btn-warning");

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
