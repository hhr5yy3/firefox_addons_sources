const memoizedFindForm = findForm();

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if (form && !form.querySelector(".qq-quick-login-btn")) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        form.append(autoLoginForm);
        setFormsStyles(form, autoLoginForm)
    }
}

function setFormsStyles(form, autoLoginForm) {
    form.style.minWidth = "300px";
    form.style.position = 'relative';

    autoLoginForm.style.zIndex = "999999";
    autoLoginForm.style.marginLeft = "auto";
    autoLoginForm.style.marginRight = "auto";
    autoLoginForm.style.marginTop = "10px";
    autoLoginForm.style.maxWidth = "fit-content";
    autoLoginForm.style.width = form.offsetWidth > 0 ? form.offsetWidth + "px" : "300px";
}


function findForm() {
    let cache = {};
    return () => {
        if ("form" in cache) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector('[name="model.password"]');
            const form = passwordInp.closest("form");
            const usernameInp = form.querySelector('[name="model.login"]');
            const loginBtn = form.querySelector('[name="login"]');
            const event = ["focus", "keydown", "keyup", "keypress", "focus", "input", "change", "binding:change"];
            cache = {passwordInp, form, usernameInp, loginBtn, event, eventsDelay: 150, notHideInputs: true};
            return cache;
        } catch (e) {
            return {error: e};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label, a} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    wrapper.style.alignItems = "center";
    wrapper.style.padding = "10px";

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';


    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}

function setInputsValue(usernameInp, passwordInp, login, password) {
    usernameInp.value = login.trim();
    passwordInp.value = password.trim();
}
