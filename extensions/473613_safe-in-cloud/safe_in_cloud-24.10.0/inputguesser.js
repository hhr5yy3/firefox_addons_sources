var InputGuesser = (function createInputGuesser() {
    D.func();

    const DEFAULT_GUESS = 100;

    const TYPES = {

        emailInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(email)$" }
                ]
            },
            type: {
                factor: 60,
                patterns: [
                    { pattern: "^(email)$" }
                ]
            },
            ids: {
                factor: 30,
                patterns: [
                    { pattern: "mail" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        confirmEmailInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(email)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(email)$" }
                ]
            },
            ids: {
                factor: 40,
                patterns: [
                    { pattern: "confirm.*mail|mail.*confirm" },
                    { pattern: "mail.*repeat|repeat.*mail" },
                    { pattern: "mail.*again|again.*mail" },
                    { pattern: "mail.*re.*enter|re.*enter.*mail" },
                    { pattern: "mail.*retype|retype.*mail" },
                    { pattern: "mail.*check|check.*mail" },
                ]
            },
            labels: {
                factor: 80
            }
        },

        telInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(tel)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(tel)$" }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "tel|phone|mobile" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        usernameInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(username)$" },
                    { pattern: "^(nickname)$", guess: 50 }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(email)$" },
                    { pattern: "^(text)$", guess: 5 }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "login|customer.?id|customer.?number|user|identifier" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        passwordInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(current-password)$" },
                    { pattern: "^(new-password)$" }
                ]
            },
            type: {
                factor: 60,
                patterns: [
                    { pattern: "^(password)$" }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "password" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        newPasswordInput: {
            autocomplete: {
                factor: 150,
                patterns: [
                    { pattern: "^(new-password)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(password)$" }
                ]
            },
            ids: {
                factor: 80,
                patterns: [
                    { pattern: "new.?password" }
                ]
            },
            labels: {
                factor: 100
            }
        },

        confirmPasswordInput: {
            autocomplete: {
                factor: 150,
                patterns: [
                    { pattern: "^(new-password)$" },
                    { pattern: "^(current-password)$", guess: 50 }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(password)$" }
                ]
            },
            ids: {
                factor: 80,
                patterns: [
                    { pattern: "confirm.*password|password.*confirm" },
                    { pattern: "password.*repeat|repeat.*password" },
                    { pattern: "password.*again|again.*password" },
                    { pattern: "password.*check|check.*password", guess: 50 },
                    { pattern: "password.*retype|retype.*password", guess: 50 },
                    { pattern: "password.*verify|verify.*password", guess: 50 },
                    { pattern: "confirm", guess: 50 }
                ]
            },
            labels: {
                factor: 100
            }
        },

        passcodeInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(one-time-code)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(tel)$", guess: 50 }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "one.?time.*code" },
                    { pattern: "totp|otp" },
                    { pattern: "passcode" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        nameInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(cc-name|cc-full-name)$" }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "cc.?name|cc.?full.?name|holder|name.?on.?card|owner|card.?name" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        numberInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(cc-number)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(tel)$", guess: 50 }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "card.?num|card.?no|cc.?num" },
                    { pattern: "number", guess: 50 }
                ]
            },
            labels: {
                factor: 40
            }
        },

        cscInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(cc-csc)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(password)$" },
                    { pattern: "^(tel)$", guess: 50 }
                ]
            },
            ids: {
                factor: 40,
                patterns: [
                    { pattern: "csc|cvc|cvn|cvv|verification|security.?code" },
                    { pattern: "code", guess: 50 }
                ]
            },
            labels: {
                factor: 80
            }
        },

        expMonthInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(cc-exp-month)$" },
                    { pattern: "^(cc-exp)$", guess: 50 }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(tel)$" }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "month" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        expYearInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(cc-exp-year)$" },
                    { pattern: "^(cc-exp)$", guess: 50 }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(tel)$" }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "year" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        expDateInput: {
            autocomplete: {
                factor: 100,
                patterns: [
                    { pattern: "^(cc-exp)$" }
                ]
            },
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(tel)$" }
                ]
            },
            ids: {
                factor: 15,
                patterns: [
                    { pattern: "cc.?exp|date|valid|expir" }
                ]
            },
            labels: {
                factor: 50
            }
        },

        searchInput: {
            type: {
                factor: 30,
                patterns: [
                    { pattern: "^(search)$" }
                ]
            },
            ids: {
                factor: 20,
                patterns: [
                    { pattern: "search|find" }
                ]
            },
            labels: {
                factor: 40
            }
        },

        subscribeInput: {
            ids: {
                factor: 40,
                patterns: [
                    { pattern: "subscr" }
                ]
            },
            labels: {
                factor: 80
            }
        },

        submitButton: {
            type: {
                factor: 40,
                patterns: [
                    { pattern: "^(submit)$" },
                    { pattern: "^(image)$" },
                    { pattern: "^(button)$", guess: 50 }
                ]
            },
            ids: {
                factor: 30,
                patterns: [
                    { pattern: "submit|login|register|change" }
                ]
            },
            labels: {
                factor: 30
            },
            value: {
                factor: 40
            }
        }
    }

    // Calculates a total input score as a sum of 4 sub-scores: 
    // - explicite autocomplete attribute
    // - type
    // - ids (invisible to user)
    // - labels (visible to user)
    //
    // Each sub-score = guess (probability) * factor (importance), 
    // where guess is in range 0-100;
    function getInputScore(input, inputType) {
        const typeInfo = TYPES[inputType];
        let score = 0;
        // autocomplete
        if (typeInfo.autocomplete) {
            const autocompleteGuess = getAttributeGuess(input.autocomplete, typeInfo.autocomplete.patterns);
            score += autocompleteGuess * typeInfo.autocomplete.factor;
        }
        // type
        if (typeInfo.type) {
            const typeGuess = getAttributeGuess(input.type, typeInfo.type.patterns);
            score += typeGuess * typeInfo.type.factor;
        }
        // ids
        if (typeInfo.ids) {
            let idGuess = getAttributeGuess(input.id, typeInfo.ids.patterns);
            const nameGuess = getAttributeGuess(input.name, typeInfo.ids.patterns);
            idGuess = Math.max(idGuess, nameGuess);
            score += idGuess * typeInfo.ids.factor;
        }
        // labels
        if (typeInfo.labels) {
            let labelGuess = getLabelGuess(input, inputType);
            const placeholderGuess = LabelGuesser.getLabelGuess(input.placeholder, inputType);
            const titleGuess = LabelGuesser.getLabelGuess(input.title, inputType);
            const ariaLabelGuess = LabelGuesser.getLabelGuess(input.getAttribute("aria-label"), inputType);
            labelGuess = Math.max(labelGuess, placeholderGuess, titleGuess, ariaLabelGuess);
            score += labelGuess * typeInfo.labels.factor;
        }
        // value
        if (typeInfo.value) {
            let valueGuess = LabelGuesser.getLabelGuess(input.value, inputType);
            const textContentGuess = LabelGuesser.getLabelGuess(input.textContent, inputType);
            valueGuess = Math.max(valueGuess, textContentGuess);
            score += valueGuess * typeInfo.value.factor;
        }
        return score;
    }

    // Calculates maximum guess for given patterns
    function getAttributeGuess(attribute, patterns) {
        let maxGuess = 0;
        for (let i = 0; patterns && i < patterns.length; i++) {
            if (FindHelper.matchPattern(attribute, patterns[i].pattern)) {
                // save the highest guess
                let guess = patterns[i].guess || DEFAULT_GUESS;
                if (guess === 100) {
                    return guess; // return if highest already
                } else if (guess > maxGuess) {
                    maxGuess = guess;
                }
            }
        }
        return maxGuess;
    }

    function getLabelGuess(input, inputType) {
        let parent = FindHelper.getParent(input);
        if (input.id && parent) {
            const labels = parent.querySelectorAll(`label[for="${input.id}"]`);
            let maxGuess = 0;
            for (let i = 0; labels && i < labels.length; i++) {
                let guess = LabelGuesser.getLabelGuess(labels[i].textContent, inputType);
                if (guess === 100) {
                    return guess;
                } else if (guess > maxGuess) {
                    maxGuess = guess;
                }
            }
            return maxGuess;
        }
        return 0;
    }

    function getInputScores(input) {
        let scores = {};
        const types = Object.keys(TYPES);
        types.forEach(type => {
            // exept submitButton type
            if (type !== "submitButton") {
                scores[type] = getInputScore(input, type);
            }
        });
        return scores;
    }

    // Returns input type with the highest score
    function guessInputType(inputScores) {
        let inputType = null;
        let maxScore = 0;
        let types = Object.keys(inputScores);
        let scores = Object.values(inputScores);
        // select type with the highest score
        for (let i = 0; i < types.length; i++) {
            if (scores[i] > maxScore) {
                inputType = types[i];
                maxScore = scores[i];
            }
        }
        return inputType;
    }

    // Returns guessed inputs and their types
    function guessInputs(form, operableOnly) {
        // find all inputs and selects
        let allInputs = form.querySelectorAll("input, select");
        let guessedScores = {};
        let guessedInputs = {};
        // go through all inputs
        for (let i = 0; i < allInputs.length; i++) {
            let input = allInputs[i];
            // operable ?
            if (!operableOnly || FindHelper.isOperable(input)) {
                let inputScores = getInputScores(input);
                let inputType = guessInputType(inputScores);
                if (inputType) {
                    // save input with the highest score
                    let inputScore = inputScores[inputType];
                    if (!guessedScores[inputType] || inputScore > guessedScores[inputType]) {
                        guessedInputs[inputType] = input;
                        guessedScores[inputType] = inputScore;
                    }
                }
            }
        }
        return guessedInputs;
    }

    function getMinUsernameScore() {
        let minGuess = DEFAULT_GUESS;
        TYPES.usernameInput.type.patterns.forEach(pattern => {
            let guess = pattern.guess || DEFAULT_GUESS;
            if (guess < minGuess) {
                minGuess = guess;
            }
        });
        return minGuess * TYPES.usernameInput.type.factor;
    }

    function guessButton(form) {
        D.func();
        // find all suitable buttons
        const allButtons = form.querySelectorAll(`input[type='button'], input[type='image'], input[type='submit'], button,
                                                [role='button'], [id~='button'], [class~='button'], [name~='button']`);
        let submitButton = null;
        let maxScore = 0;
        // go through all buttons
        allButtons.forEach(button => {
            if (FindHelper.isVisible(button)) {
                let score = getInputScore(button, "submitButton");
                if (score > maxScore) {
                    // save button with the highest score
                    maxScore = score;
                    submitButton = button;
                }
            }
        });
        return submitButton;
    }

    function guessExtraInput(mDocument, name) {
        D.func();
        // magic for id
        let selector = "#" + CSS.escape(name); // escape special symbols
        let extraInput = mDocument.querySelector(selector);
        if (extraInput) {
            return extraInput;
        }
        // find by label
        const inputs = mDocument.querySelectorAll("input");
        for (let input of inputs) {
            if (FindHelper.isOperable(input)) {
                if (matchLabels(input, name)) {
                    return input;
                }
            }
        }
        // magic for name
        selector = `[name="${CSS.escape(name)}"]`;
        extraInput = mDocument.querySelector(selector);
        if (extraInput) {
            return extraInput;
        }
        return null;
    }

    function matchLabels(input, name) {
        D.func();
        let parent = FindHelper.getParent(input);
        // match labels
        if (input.id && parent) {
            const labels = parent.querySelectorAll(`label[for="${input.id}"]`);
            for (let label of labels) {
                if (FindHelper.matchPattern(label.textContent, name)) {
                    return true;
                }
            }
        }
        // match other attributes
        if (FindHelper.matchPattern(input.placeholder, name) ||
            FindHelper.matchPattern(input.title, name) ||
            FindHelper.matchPattern(input.getAttribute("aria-label"), name)) {
            return true;
        }
        return false;
    }

    return {
        guessInputs: function(form, operableOnly = true) {
            return guessInputs(form, operableOnly);
        },

        guessInputType: function(inputScores) {
            return guessInputType(inputScores);
        },

        getInputScores: function(input) {
            return getInputScores(input);
        },

        getMinUsernameScore: function() {
            return getMinUsernameScore();
        },

        getTypes: function() {
            return TYPES;
        },

        guessButton: function(form) {
            return guessButton(form);
        },

        guessExtraInput: function(mDocument, name) {
            return guessExtraInput(mDocument, name);
        }
    }
})();