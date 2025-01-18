const memoizedFindForm = findForm();

function findForm() {
    let cache = {};
    return () => {
        if ( "form" in cache ) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("input[type='password']");
            const form = passwordInp.closest("#auth_form");
            const usernameInp = form.querySelector("input[name='auth_login']");
            const loginBtn = form.querySelector("input[type='submit'], button[type='submit']");
            const event = ["focus", "input", "change", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
            return {};
        }
    }
}

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if ( form && !form.querySelector(".qq-quick-login-btn") ) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        setFormsStyles(form, autoLoginForm)
        form.append(autoLoginForm);
    }
}

function setFormsStyles(form, autoLoginForm) {
    form.style.position = 'relative';
    autoLoginForm.style.zIndex = "999999";
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";
    select.style.width = "100%";
    wrapper.style.alignItems = "center";
    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
