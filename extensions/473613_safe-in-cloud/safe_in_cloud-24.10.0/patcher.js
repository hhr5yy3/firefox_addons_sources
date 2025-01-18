var Patcher = (function createPatcher() {
    D.func();

    function findInputs(href, mDocument, searchFor = { loginForm: true, changePasswordForm: true, registrationForm: true, cardForm: true }) {
        D.func();
        const patch = getPatch(href);
        if (patch) {
            for (let form in searchFor) {
                if (searchFor[form] && patch[form]) {
                    return findPatchInputs(mDocument, patch[form].inputs);
                }
            }
        }
        return null;
    }

    function getPatch(href) {
        D.func();
        for (let patch of PATCHES) {
            let regExp = new RegExp(patch.href);
            if (regExp.test(href)) {
                return patch;
            }
        }
        return null;
    }

    function findPatchInputs(mDocument, patchInputs) {
        D.func();
        let inputs = {};
        for (let inputType in patchInputs) {
            let selector = getSelector(patchInputs[inputType]);
            let selectorInputs = mDocument.querySelectorAll(selector);
            for (let input of selectorInputs) {
                if (input && FindHelper.isOperable(input)) {
                    inputs[inputType] = input;
                    break;
                } else {
                    return null;
                }
            }
        }
        return inputs;
    }

    function getSelector(inputType) {
        D.func();
        let selector = "";
        for (let attr in inputType) {
            selector += `[${attr}='${inputType[attr]}']`;
        }
        return selector;
    }

    function findForms(href) {
        const patch = getPatch(href);
        if (patch) {
            return {
                changePasswordForm: !!patch.changePasswordForm,
                loginForm: !!patch.loginForm,
                registrationForm: !!patch.registrationForm,
                cardForm: !!patch.cardForm
            };
        }
        return null;
    }

    return {
        findInputs: function(href, mDocument, searchFor) {
            return findInputs(href, mDocument, searchFor);
        },

        findForms: function(href) {
            return findForms(href);
        }
    };

})();