var CardFinder = (function createCardFinder() {
    D.func();

    function isValidForm(inputs) {
        if (inputs.numberInput && (inputs.expDateInput || (inputs.expMonthInput && inputs.expYearInput))) {
            return true;
        }
    }

    function findFormInputs(form) {
        D.func();
        let { nameInput, numberInput, cscInput, expMonthInput, expYearInput, expDateInput } = InputGuesser.guessInputs(form);
        let inputs = {
            nameInput,
            numberInput,
            cscInput,
            expMonthInput,
            expYearInput,
            expDateInput
        };
        // has expiration date ?
        if (!inputs.expMonthInput || !inputs.expYearInput) {
            inputs.expMonthInput = null;
            inputs.expYearInput = null;
        }
        // has number & expiration date ?
        if (isValidForm(inputs)) {
            return inputs;
        }
        return null;
    }

    function findInputs(href, mDocument) {
        D.func();
        var inputs = null;
        // has patch ?
        inputs = Patcher.findInputs(href, mDocument, { cardForm: true });
        if (inputs) {
            return inputs;
        }
        // search focused form
        const activeElement = mDocument.querySelector("form[data-active='true']");
        if (activeElement) {
            inputs = findFormInputs(activeElement);
            if (inputs) {
                return inputs;
            }
        }
        // search all forms
        var forms = mDocument.querySelectorAll("form");
        if (forms.length > 0) {
            for (var i = 0; i < forms.length; i++) {
                var form = forms[i];
                inputs = findFormInputs(form);
                if (inputs) {
                    return inputs;
                }
            }
        }
        // search document
        inputs = findFormInputs(mDocument);
        return inputs;
    }

    function isCardForm(form) {
        const inputs = findFormInputs(form);
        if (inputs) {
            return true;
        }
        return false;
    }

    return {
        findInputs: function(href, mDocument) {
            return findInputs(href, mDocument);
        },

        getInputValue: function(input) {
            return FindHelper.isInput(input) || FindHelper.isSelect(input) ? input.value : null;
        },

        isCardForm: function(form) {
            return isCardForm(form);
        }
    };

})();