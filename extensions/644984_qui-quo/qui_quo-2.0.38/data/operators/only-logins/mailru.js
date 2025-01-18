window.isQuickLoginAsyncFormAction = true;
window.qqIframeHost = 'mail.ru' //prevent iframe issues


function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = findForm();
    if (form && !form.querySelector(".qq-quick-login-btn")) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        const compactDiv = $1('.qrauth-vars.qrauth__compact-view', form)
        if ( compactDiv ) {
            compactDiv.before(autoLoginForm);
        } else {
            form.prepend(autoLoginForm);
        }

    }
}

function findForm() {
    try {
        const passwordInp = document.querySelector('.login-row.password input[name="password"]');
        const form = document.querySelector('form[action*="https://auth.mail.ru/cgi-bin/auth"]');
        const usernameInp = form.querySelector('.login-row.username input[name="username"]');
        const loginBtn = form.querySelector('button[data-test-id="next-button"]');
        const event = ["change"];
        return {passwordInp, form, usernameInp, loginBtn, event, eventsDelay: 50, notHideInputs: false, isReact: true,
            specialInputs: true};
    } catch (e) {
        return {};
    }

}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    wrapper.style.alignItems = "center";
    wrapper.style.width = "100%";
    wrapper.style.marginTop = "16px";

    button.classList.add("base-0-2-79", "primary-0-2-93");

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return findForm();
}

async function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const {
        form, usernameInp, passwordInp, loginBtn, event, specialInputs, eventsDelay, notHideInputs, isReact
    } = getElementsForQuickLoginAction();
    if ( event ) {
        simulateEvent(usernameInp, event);
        if ( eventsDelay ) {
            await waitingFor(() => null, 2, eventsDelay)
        }
        simulateEvent(passwordInp, event);
        if ( eventsDelay ) {
            await waitingFor(() => null, 2, eventsDelay)
        }
    }

    setInputsValue(usernameInp, passwordInp, login, password, notHideInputs, isReact);

    if ( loginBtn ) {
        loginBtn.click();
        await waitingFor(() => null, 2, eventsDelay);
        const submitButton = form.querySelector('button[data-test-id="submit-button"]');
        submitButton.click();
    }

}
