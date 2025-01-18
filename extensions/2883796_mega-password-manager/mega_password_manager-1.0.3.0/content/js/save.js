function saveInput(e, isPassword) {
    "use strict";

    if (!sid) {
        return false;
    }

    if (e.target.value === '') {
        return false;
    }

    const payload = {};
    const key = isPassword ? 'password' : 'id';
    payload[key] = e.target.value;
    closeContentDialog();

    // For case login page skip id entering, try fetching it from give selector
    if (isPassword && specialWebsite && specialWebsite.IdMaybeMissing) {
        payload.id = document.querySelector(specialWebsite.IdMaybeMissing[0]);
        if (specialWebsite.IdMaybeMissing[1] === 'textContent') {
            payload.id = payload.id.textContent;
        }
    }

    mega.ui.pm.send({type: 'save-credentials', payload});
}

function watchEnterSubmit() {
    "use strict";

    if (!specialWebsite || !specialWebsite.watchEnterSubmit) {
        return;
    }

    let target = document.querySelector(specialWebsite.watchEnterSubmit[0]);
    let usingWatcher = false;

    if (!target) {
        usingWatcher = true;
        target = document;
    }

    target.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {

            if (usingWatcher && !event.target.closest(specialWebsite.watchEnterSubmit[0])) {
                return;
            }

            const isPassword = event.target.matches(passwordSelector);

            saveInput(event, isPassword);

            // is input element is last input registered?
            if (event.target.matches(specialWebsite.watchEnterSubmit[1])) {
                submitFormHandler(event);
            }
        }
    });
}

function checkSubmitCondition() {
    "use strict";

    if (!specialWebsite || !specialWebsite.submitSuccessCondition) {
        return true;
    }

    // it seems like redirect condition is required, this only can do after redirect hence temporary set true and let
    // SW detect redirection was target success pages
    if (specialWebsite.submitSuccessCondition[0] === 'redirect') {
        mega.ui.pm.send({
            type: 'check-login-redirect',
            target: specialWebsite.submitSuccessCondition[1]
        });
        return false;
    }

    // is input met submit condition?
    const conditionElm = document.querySelector(specialWebsite.submitSuccessCondition[1]);
    let condition = false;

    if (specialWebsite.watchEnterSubmit[0] === 'textContent') {
        condition = !conditionElm.textContent;
    }

    return condition;
}
