var MetaFinder = (function createMetaFinder() {
    D.func();

    const DATA_ID_ATTR = "data-safeincloud_id";

    function findForms(href, mDocument) {
        D.func();
        const patchedForms = Patcher.findForms(href);
        if (patchedForms) {
            return patchedForms;
        }
        return {
            cardForm: !!CardFinder.findInputs(href, mDocument),
            ...AccountFinder.findForms(mDocument)
        };
    }

    function findInputs(href, mDocument, searchFor) {
        D.func();
        let result = {};
        const accountInputs = AccountFinder.findInputs(href, mDocument, searchFor);
        if (accountInputs) {
            result.login = AccountFinder.getLoginValue(accountInputs);
            result.password = AccountFinder.getPasswordValue(accountInputs);
            result.newPassword = AccountFinder.getNewPasswordValue(accountInputs);
            result.hasLoginInput = AccountFinder.hasLoginInput(accountInputs);
            result.hasPasswordInput = !!accountInputs.passwordInput;
            result.hasPascodeInput = !!accountInputs.passcodeInput;
        }
        return result;
    }

    function getAutofillIds(href, mDocument, searchFor, extras) {
        D.func();
        const inputs = {
            ...AccountFinder.findInputs(href, mDocument, searchFor),
            ...CardFinder.findInputs(href, mDocument)
        };
        let autofillIds = {};
        for (let inputType in inputs) {
            let input = inputs[inputType];
            if (input) {
                autofillIds[inputType] = input.getAttribute(DATA_ID_ATTR);
            }
        }
        // extra fields
        if (extras) {
            autofillIds.extras = getExtraIds(mDocument, extras);
        }
        return autofillIds;
    }

    function getExtraIds(mDocument, extras) {
        D.func();
        const extraInputs = AccountFinder.findExtraInputs(mDocument, extras);
        let extraFieldsIds = [];
        for (let input of extraInputs) {
            if (input) {
                extraFieldsIds.push(input.getAttribute(DATA_ID_ATTR));
            } else {
                extraFieldsIds.push(null);
            }
        }
        return extraFieldsIds;
    }

    return {
        findInputs: function(href, mDocument, searchFor) {
            return findInputs(href, mDocument, searchFor);
        },

        findForms: function(href, mDocument) {
            return findForms(href, mDocument);
        },

        getAutofillIds: function(href, mDocument, searchFor, extraFields) {
            return getAutofillIds(href, mDocument, searchFor, extraFields);
        }
    };
})();