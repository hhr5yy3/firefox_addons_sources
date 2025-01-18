window.isQuickLoginAsyncFormAction = true;
console.log('loaded quick login form')

const memoizedFindForm = findForm();
function injectAutoLoginSelect(logins, manager, opts) {
    const {form, loginBtn} = memoizedFindForm();
    if (form && !form.querySelector(".qq-quick-login-btn")) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        loginBtn.after(autoLoginForm);
    }
}

function findForm() {
    let cache = {};
    return () => {
        if ("form" in cache) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("input[type='password']");
            const usernameInp = document.querySelector('input[autocomplete="username"]');
            const form = (usernameInp || passwordInp).closest("form");

            const loginBtn = form.querySelector('[type="submit"]');
            const event = ["click","input","change"];
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
    button.style.cursor = "pointer";

    wrapper.style.alignItems = "center";
    wrapper.style.width = "100%";

    button.classList.add("q-btn","q-btn-item", "q-btn", "q-btn-item", "full-width",
                          "q-mb-md", "q-btn--standard", "q-btn--rectangle", "bg-positive", "text-white", "q-btn--wrap");

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}
