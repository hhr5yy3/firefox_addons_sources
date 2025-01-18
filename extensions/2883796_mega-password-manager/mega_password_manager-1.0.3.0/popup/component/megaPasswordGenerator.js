(mega => {
    "use strict";

    class MegaPasswordGenerator {
        constructor() {
            this.dialog = new MegaDialog({
                parentNode: document.body,
                componentClassname: 'mega-dialog password-generator',
                wrapperClassname: 'overlay'
            });
            this.preventBgClosing = false;

            // Sets up the password preview area, including the copy functionality
            const preview = document.createElement('div');
            preview.className = 'password-preview';
            this.previewPassword = document.createElement('p');

            const copyPassword = document.createElement('div');
            copyPassword.className = 'copy-wrapper';

            const copyPasswordIcon = new MegaButton({
                parentNode: copyPassword,
                componentClassname: 'password-copy text-icon',
                type: 'icon',
                icon: 'icon sprite-pm-ext-mono icon-copy-thin-outline',
                iconSize: 24
            });

            copyPasswordIcon.on('click', () => {
                copyToClipboard(this.previewPassword.textContent, l[19602]);
                eventlog(590015);
            });
            preview.append(this.previewPassword, copyPassword);
            this.dialog.addContent(preview);
            this.dialog.addHeader(l.generate_password_title, 'h3');

            // Sets up the password strength checker UI
            this.strength = document.createElement('div');
            this.strength.className = 'strength-checker';
            const strengthIcon = document.createElement('span');
            strengthIcon.className = 'strength-icon sprite-pm-ext-mono';
            const strengthText = document.createElement('span');
            strengthText.className = 'strength-text';
            this.strength.append(strengthIcon, strengthText);

            this.dialog.addContent(this.strength);

            // Sets up the input field for specifying the desired length of the password
            const slider = new MegaRangeSlider({parentNode: this.dialog.contentNode});
            slider.on('update', () => this.refreshPassword());
            this.passwordLength = slider.rangeInput;

            // Sets up the toggle buttons for including uppercase, numbers, and special characters
            const setupToggle = (propertyName, value, label, evIdOn, evIdOff) => {
                this[propertyName] = new MegaToggleButton({
                    parentNode: this.dialog.contentNode,
                    componentClassname: 'mega-toggle-button',
                    value,
                    id: value,
                    label,
                    role: 'switch',
                    events: [evIdOn, evIdOff],
                    onChange: () => this.refreshPassword()
                });
                // Enable the toggle by default
                this[propertyName].setButtonState(true);
            };

            setupToggle('upperCaseToggle', 'uppercase', l.capital_letters_toggle, 590016, 590017);
            setupToggle('numbersToggle', 'numbers', l.digits_toggle, 590018, 590019);
            setupToggle('specialsToggle', 'specials', l.symbols_toggle, 590020, 590021);

            // Sets up the action buttons within the dialog
            this.dialog.addActions([
                {
                    text: l.generate_btn,
                    componentClassname: 'outline text-icon',
                    icon: 'left-icon sprite-pm-ext-mono icon-sync-thin-outline',
                    onClick: () => {
                        this.refreshPassword();
                        eventlog(590023);
                    }
                },
                {
                    text: l.use_btn,
                    onClick: () => {
                        mega.ui.passform.setPass(this.previewPassword.textContent);
                        this.hide();
                        eventlog(590022);
                    }
                }
            ]);

            // Generate and display an initial password
            this.refreshPassword();

            Object.freeze(this);
        }

        // Generates a new password, calculates its strength, and updates the UI accordingly
        refreshPassword() {
            this.previewPassword.textContent = '';

            const password = this.generatePassword();
            const passwordStrength = zxcvbn(password).score;

            this.previewPassword.append(colorizedPassword(password));

            const icon = this.strength.querySelector('.strength-icon');
            const text = this.strength.querySelector('.strength-text');

            // TODO: New spec for password strength are still in discussion
            if (passwordStrength === 3 || passwordStrength === 4) {
                text.textContent = l.password_strength_strong;
                icon.className = 'strength-icon sprite-pm-ext-mono icon-check-circle-thin-outline';
                this.strength.className = 'strength-checker strong';
            }
            else if (passwordStrength === 2) {
                text.textContent = l.password_strength_moderate;
                icon.className = 'strength-icon sprite-pm-ext-mono icon-alert-circle-thin-outline';
                this.strength.className = 'strength-checker moderate';
            }
            else {
                text.textContent = l.password_strength_weak;
                icon.className = 'strength-icon sprite-pm-ext-mono icon-alert-triangle-thin-outline';
                this.strength.className = 'strength-checker weak';
            }
        }

        generatePassword() {
            const length = this.passwordLength.value;
            const {charset} = MegaPasswordGenerator;
            const password = [];
            const randomValues = mega.getRandomValues(length);

            let activeCharset = charset.lowercase;

            const _pushPass = (set) => {
                password.push(set[Math.floor(randomValues[password.length] / (0xff + 1) * set.length)]);
            };
            const _addSet = (set) => {
                activeCharset += set;
                _pushPass(set);
            };

            _pushPass(charset.lowercase);

            // Construct the initial part of the password with at least one character from each required set
            if (this.upperCaseToggle.checked) {
                _addSet(charset.uppercase);
            }
            if (this.numbersToggle.checked) {
                _addSet(charset.numbers);
            }
            if (this.specialsToggle.checked) {
                _addSet(charset.symbols);
            }

            // Fill up the rest of the password length
            for (let i = password.length; i < length; i++) {
                _pushPass(activeCharset);
            }

            const randomShuffleValues = mega.getRandomValues(length);
            // Shuffle the password
            for (let i = password.length - 1; i > 0; i--) {
                const j = Math.floor(randomShuffleValues[i] / (0xff + 1) * i);
                [password[i], password[j]] = [password[j], password[i]]; // Swap elements
            }
            return password.join('');
        }

        show() {
            this.refreshPassword();
            this.dialog.show();
        }

        hide() {
            this.dialog.hide();
        }
    }

    MegaPasswordGenerator.charset = Object.freeze({
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()'
    });

    lazy(mega.ui, 'passwordGenerator', () => new MegaPasswordGenerator());

})(window.mega);
