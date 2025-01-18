window.memoizedFindForm = findForm();
window.isQuickLoginAsyncFormAction = window.quickLoginStyles && window.quickLoginStyles[window.location.hostname] ? window.quickLoginStyles[window.location.hostname].isQuickLoginAsyncFormAction : false;
window.notHideInputs = window.quickLoginStyles && window.quickLoginStyles[window.location.hostname] ? window.quickLoginStyles[window.location.hostname].notHideInputs : false;

function injectAutoLoginSelect(logins, manager, opts) {
    const {form, loginBtnClasses} = memoizedFindForm();
    if ( form && !form.querySelector(".qq-quick-login-btn") ) {
        opts.loginBtnClasses = loginBtnClasses;
        const autoLoginForm = createAutoLoginForm(logins, manager, opts, form);
        form.append(autoLoginForm);

        if ( window.quickLoginStyles &&
             window.quickLoginStyles[window.location.hostname] &&
             !window.quickLoginStyles[window.location.hostname].donNotChangeSiteForm ) {
            setSiteFormStyle(form, autoLoginForm);
        }

    }
}

function setSiteFormStyle(form) {
    form.style.minWidth = "300px";
    form.style.position = 'relative';
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.zIndex = "999999";
    autoLoginForm.style.marginLeft = "auto";
    autoLoginForm.style.marginRight = "auto";
    autoLoginForm.style.marginTop = "10px";
    autoLoginForm.style.maxWidth = "fit-content";
    autoLoginForm.style.width = form.offsetWidth > 0 ? form.offsetWidth + "px" : "300px";
}

function findForm() {
    return ()=> {
        try {
            if ( typeof getFindFormElements === "function" ) {
                return getFindFormElements();
            }
            const variables = findVariablesByHostname();
            const passwordInp = variables && variables.passwordSelector ? $first(variables.passwordSelector) : $$("input[type='password'], input[name='pass']").find(obj => obj.offsetWidth > 0 && obj.offsetHeight > 0 && obj.style.opacity !== "0");
            const form = variables && variables.formSelector ? $first(variables.formSelector)  : passwordInp.closest("form .modal-content, form, #authForm");
            const usernameInp = variables && variables.userNameSelector ? $first(variables.userNameSelector, form) : form.querySelector("input[type='text'], input[name^='login'], input[type='email'], input[name='username'],input[name='email'], input[formcontrolname='login'], input#username, #LoginForm_username");
            const loginBtn = variables && variables.loginButtonSelector ? $first(variables.loginButtonSelector, form) || $first(variables.loginButtonSelector): form.querySelector("input[type='submit'], button[type='submit'], button[name='login'], input[alt='Войти'], .login-btn") || form.querySelector("button:not(.qq-quick-login-btn)");
            const event = ["focus", "input", "change", "blur"];
            return {passwordInp, form, usernameInp, loginBtn, event};
        } catch (e) {
            return {error: e};
        }
    }
}

function createAutoLoginForm(logins, manager, opts, form) {
    const {button, wrapper, select, label, a} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    if ( opts.loginBtnClasses ) {
        button.classList.add(...opts.loginBtnClasses);
    }

    wrapper.style.alignItems = "center";
    wrapper.style.padding = "10px";

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';
    setFormsStyles(form, wrapper);
    if ( window.quickLoginStyles && window.quickLoginStyles[window.location.hostname] ) {
        setStylesAndClasses(button, wrapper, select, label, a);
    } else {
        button.style.cssText = `
        display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    text-align: center;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
    vertical-align: middle;
    cursor: pointer;
    background-color: #f5f5f5;
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    background-repeat: repeat-x;
    border: 1px solid #cccccc;
    border-color: #e6e6e6 #e6e6e6 #bfbfbf;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    border-bottom-color: #b3b3b3;
    border-radius: 4px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    `;
    }

    return wrapper;
}

function setStylesAndClasses(button, wrapper, select, label, a) {
    const stylesObj = window.quickLoginStyles[window.location.hostname];
    if ( stylesObj.styles ) {
        if ( stylesObj.styles.button ) button.style.cssText = button.style.cssText+stylesObj.styles.button;
        if ( stylesObj.styles.wrapper ) wrapper.style.cssText = wrapper.style.cssText+ stylesObj.styles.wrapper;
        if ( stylesObj.styles.select ) select.style.cssText = select.style.cssText+ stylesObj.styles.select;
        if ( stylesObj.styles.label ) label.style.cssText = label.style.cssText+stylesObj.styles.label;
        if ( stylesObj.styles.a ) a.style.cssText = a.style.cssText+stylesObj.styles.a;
    }

    if ( stylesObj.classLists ) {
        if ( stylesObj.classLists.button ) button.classList.add(...stylesObj.classLists.button);
        if ( stylesObj.classLists.wrapper ) wrapper.classList.add(...stylesObj.classLists.wrapper);
        if ( stylesObj.classLists.select ) select.classList.add(...stylesObj.classLists.select);
        if ( stylesObj.classLists.label ) label.classList.add(...stylesObj.classLists.label);
        if ( stylesObj.classLists.label ) a.classList.add(...stylesObj.classLists.a);
    }
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}

function findVariablesByHostname() {
    if ( window.quickLoginStyles && window.quickLoginStyles[window.location.hostname])  {
        return window.quickLoginStyles[window.location.hostname];
    }

    const variablesWithRegexp = Object.entries(window.quickLoginStyles || {}).find(
        (obj) => obj[1].matchAllHostnames && location.hostname.match(obj[0])
    );
    return variablesWithRegexp ? variablesWithRegexp[1] : null;
}
