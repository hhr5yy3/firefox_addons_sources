var AccountFinder = (function createAccountFinder() {
    D.func();

    function findSubmitForms(href, operableOnly) {
        D.func(operableOnly);
        let submitForms = [];
        // has patch ?
        const inputs = Patcher.findInputs(href, document);
        if (inputs) {
            submitForms.push(document);
            return submitForms;
        }
        const forms = document.forms;
        for (let i = 0; i < forms.length; i++) {
            let form = forms[i];
            let inputs = findFormInputs(form, isSubmitForm, operableOnly);
            if (inputs) {
                submitForms.push(form);
            }
        }
        if (!submitForms) {
            const documentInputs = findFormInputs(document, isSubmitForm, operableOnly);
            if (documentInputs) {
                submitForms.push(document);
                return submitForms;
            }
        }
        return submitForms;
    }

    function isSubmitForm(inputs) {
        return hasLoginInput(inputs) && inputs.passwordInput;
    }

    function isLoginOrRegistrationForm(inputs) {
        return isLoginForm(inputs) || isRegistrationForm(inputs);
    }

    function isAnyForm(inputs) {
        return isLoginForm(inputs) || isRegistrationForm(inputs) || isChangePasswordForm(inputs);
    }

    function isLoginForm(inputs) {
        if (isRegistrationForm(inputs)) {
            return false;
        }
        if (isDesperateForm(inputs)) {
            return false;
        }
        return hasLoginInput(inputs) || inputs.passwordInput || inputs.passcodeInput;
    }

    function isDesperateForm(inputs) {
        // ignore forms with only 'desperate' login (type = text)
        if (inputs.usernameInput && !inputs.emailInput && !inputs.telInput && !inputs.passwordInput && !inputs.passcodeInput) {
            const usernameInputScore = InputGuesser.getInputScores(inputs.usernameInput).usernameInput;
            const minUsernameScore = InputGuesser.getMinUsernameScore();
            if (usernameInputScore <= minUsernameScore) {
                return true;
            }
        }
        return false;
    }

    function isRegistrationForm(inputs) {
        if (inputs.confirmPasswordInput || inputs.confirmEmailInput || inputs.newPasswordInput) {
            return true;
        }
        return false;
    }

    function isChangePasswordForm(inputs) {
        return (!hasLoginInput(inputs) && inputs.passwordInput && inputs.newPasswordInput) ? true : false;
    }

    function findFormInputs(form, isMatch, operableOnly) {
        D.func(operableOnly);
        let { passwordInput, emailInput, confirmEmailInput, telInput, usernameInput, passcodeInput, confirmPasswordInput, newPasswordInput, cscInput } = InputGuesser.guessInputs(form, operableOnly);
        // csc sensitivity fix
        if (!passcodeInput && cscInput && !CardFinder.isCardForm(form)) {
            passcodeInput = cscInput;
        }
        // passcode as password fix
        if (!passwordInput && passcodeInput && (emailInput || usernameInput || telInput)) {
            passwordInput = passcodeInput;
            passcodeInput = null;
        }
        // ignore desperate username
        if (usernameInput && (emailInput || telInput)) {
            const usernameInputScore = InputGuesser.getInputScores(usernameInput).usernameInput;
            const minUsernameScore = InputGuesser.getMinUsernameScore();
            if (usernameInputScore <= minUsernameScore) {
                usernameInput = null;
            }
        }
        let inputs = {
            passwordInput,
            emailInput,
            confirmEmailInput,
            telInput,
            usernameInput,
            passcodeInput,
            confirmPasswordInput,
            newPasswordInput
        };
        // form matches ?
        if (isMatch(inputs)) {
            return inputs;
        }
        return null;
    }

    function getLoginFormScore(inputs) {
        let score = 0;
        if (inputs.emailInput) {
            score += 50;
        }
        if (inputs.telInput) {
            score += 50;
        }
        if (inputs.usernameInput) {
            score += 80;
        }
        if (inputs.passwordInput) {
            score += 100;
        }
        if (inputs.passcodeInput) {
            score += 100;
        }
        return score;
    }

    function getRegistrationFormScore(inputs) {
        let score = 0;
        if (inputs.emailInput) {
            score += 50;
        }
        if (inputs.telInput) {
            score += 50;
        }
        if (inputs.usernameInput) {
            score += 50;
        }
        if (inputs.confirmEmailInput) {
            score += 100;
        }
        if (inputs.passwordInput) {
            score += 100;
        }
        if (inputs.newPasswordInput) {
            score += 100;
        }
        if (inputs.confirmPasswordInput) {
            score += 150;
        }
        return score;
    }

    function getChangePasswordFormScore(inputs) {
        let score = 0;
        if (inputs.passwordInput) {
            score += 100;
        }
        if (inputs.confirmPasswordInput) {
            score += 100;
        }
        if (inputs.newPasswordInput) {
            score += 150;
        }
        return score;
    }

    function getInputsWithMaxScore(forms, isMatch, getFormScore) {
        let maxScore = 0;
        let formInputs = null;
        forms.forEach(form => {
            const inputs = findFormInputs(form, isMatch, true);
            if (inputs) {
                let score = getFormScore(inputs);
                if (score > maxScore) {
                    formInputs = inputs;
                    maxScore = score;
                }
            }
        });
        return formInputs;
    }

    function findInputs(href, mDocument, searchFor) {
        D.func();
        let inputs = null;
        // has patch ?
        inputs = Patcher.findInputs(href, mDocument, searchFor);
        if (inputs) {
            return inputs;
        }
        // search for any form ?
        if (searchFor.loginForm && searchFor.registrationForm && searchFor.changePasswordForm) {
            const activeElement = mDocument.querySelector("form[data-active='true']");
            if (activeElement) {
                // check focused form first
                inputs = findFormInputs(activeElement, isAnyForm, true);
                if (inputs) {
                    return inputs;
                }
            }
        }
        // search all forms
        const forms = mDocument.querySelectorAll("form");
        if (forms.length > 0) {
            // first change password form 
            if (searchFor.changePasswordForm) {
                inputs = getInputsWithMaxScore(forms, isChangePasswordForm, getChangePasswordFormScore);
                if (inputs) {
                    return inputs;
                }
            }
            // then login form
            if (searchFor.loginForm) {
                inputs = getInputsWithMaxScore(forms, isLoginForm, getLoginFormScore);
                if (inputs) {
                    return inputs;
                }
            }
            // and then registration form
            if (searchFor.registrationForm) {
                inputs = getInputsWithMaxScore(forms, isRegistrationForm, getRegistrationFormScore);
                if (inputs) {
                    return inputs;
                }
            }
        }
        // search document
        // first change password form 
        if (searchFor.changePasswordForm) {
            inputs = findFormInputs(mDocument, isChangePasswordForm, true);
            if (inputs) {
                return inputs;
            }
        }
        // then login form
        if (searchFor.loginForm) {
            inputs = findFormInputs(mDocument, isLoginForm, true);
            if (inputs) {
                return inputs;
            }
        }
        // and then registration form
        if (searchFor.registrationForm) {
            inputs = findFormInputs(mDocument, isRegistrationForm, true);
            if (inputs) {
                return inputs;
            }
        }
        return null;
    }

    function findForms(mDocument) {
        const forms = Array.from(mDocument.querySelectorAll("form"));
        forms.push(mDocument);
        return {
            changePasswordForm: !!getInputsWithMaxScore(forms, isChangePasswordForm, getChangePasswordFormScore),
            loginForm: !!getInputsWithMaxScore(forms, isLoginForm, getLoginFormScore),
            registrationForm: !!getInputsWithMaxScore(forms, isRegistrationForm, getRegistrationFormScore)
        }
    }

    function getLoginLabelValue(parent) {
        D.func();
        const label = parent.querySelector("label[data-login='true']");
        if (label) {
            return label.textContent;
        }
        // parent != document ?
        parent = FindHelper.getParent(parent);
        if (parent && parent != document.documentElement) {
            // go up the document
            return getLoginLabelValue(parent);
        }
        return null;
    }

    function findLoginLabelValue(inputs) {
        D.func();
        for (let inputType in inputs) {
            if (inputs[inputType]) {
                return getLoginLabelValue(inputs[inputType]);
            }
            return null;
        }
    }

    function getInputValue(input) {
        D.func();
        return input.getAttribute("data-value") || input.value;
    }

    function getLoginValue(inputs) {
        if (inputs.usernameInput && getInputValue(inputs.usernameInput)) {
            return getInputValue(inputs.usernameInput);
        } else if (inputs.emailInput && getInputValue(inputs.emailInput)) {
            return getInputValue(inputs.emailInput);
        } else if (inputs.telInput && getInputValue(inputs.telInput)) {
            return getInputValue(inputs.telInput);
        }
        return findLoginLabelValue(inputs);
    }

    function hasLoginInput(inputs) {
        if (inputs.emailInput || inputs.usernameInput || inputs.telInput) {
            return true;
        }
        return false;
    }

    function getPasswordValue(inputs) {
        return inputs.passwordInput ? getInputValue(inputs.passwordInput) : null;
    }

    function getNewPasswordValue(inputs) {
        return inputs.newPasswordInput ? getInputValue(inputs.newPasswordInput) : null;
    }

    function findExtraInputs(mDocument, extras) {
        D.func();
        let extraInputs = [];
        for (let extra of extras) {
            extraInputs.push(InputGuesser.guessExtraInput(mDocument, extra.name));
        }
        return extraInputs;
    }

    return {
        findSubmitForms: function(href, operableOnly) {
            return findSubmitForms(href, operableOnly);
        },

        findFormInputs: function(form) {
            return findFormInputs(form, function() { return true; }, true);
        },

        findInputs: function(href, mDocument, searchFor) {
            return findInputs(href, mDocument, searchFor);
        },

        findForms: function(mDocument) {
            return findForms(mDocument);
        },

        getLoginValue: function(inputs) {
            return getLoginValue(inputs);
        },

        getPasswordValue: function(inputs) {
            return getPasswordValue(inputs);
        },

        hasLoginInput: function(inputs) {
            return hasLoginInput(inputs);
        },

        getNewPasswordValue: function(inputs) {
            return getNewPasswordValue(inputs);
        },

        isLoginOrRegistrationForm: function(inputs) {
            return isLoginOrRegistrationForm(inputs);
        },

        isChangePasswordForm: function(inputs) {
            return isChangePasswordForm(inputs);
        },

        findExtraInputs: function(mDocument, extraFields) {
            return findExtraInputs(mDocument, extraFields);
        }
    };

})();