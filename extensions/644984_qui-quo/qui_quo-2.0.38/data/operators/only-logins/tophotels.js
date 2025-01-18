const memoizedFindForm = findForm();

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if ( form && !form.querySelector(".qq-quick-login-btn") ) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        form.append(autoLoginForm);
    }
}

function findForm() {
    let cache = {};
    return () => {
        if ( "form" in cache ) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("#regPass, #loginform-password, #auth-widget-form-password-auth");
            const form = passwordInp.closest("form");
            const usernameInp = form.querySelector("#regEmail, #loginform-email, #auth-widget-form-email-auth");
            const loginBtn = form.querySelector("#jsBtnAuth");
            const event = ["focus", "click", "input", "change", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
             return {error:e};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    wrapper.style.alignItems = "center";
    wrapper.style.width = "300px";
    wrapper.style.margin = "2.5px";

    button.classList.add("bth__btn", "bth__btn--lower", "bth__btn--fill");

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
