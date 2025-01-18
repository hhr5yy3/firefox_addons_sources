var twofa = {
    email: null,
    password: null,
    initOverlay() {
        'use strict';

        mega.ui.overlay.show({
            name: 'Login 2FA Overlay',
            title: l[19194],
            contents: [this.initContent()],
            showClose: true,
            centered: true,
            classList: ['two-factor']
        });

        mega.ui.overlay.one('close.overlay', () => {
            // if 2fa overlay is closed during the process then reset the variables
            this.email = null;
            this.password = null;
            mega.ui.login.setLoading(false);
            mega.ui.overlay.removeClass('two-factor');
        });
    },

    initContent() {
        'use strict';

        const container = document.createElement('div');
        container.classList.add('two-factor-verification');

        const content = document.createElement('div');
        content.classList.add('two-factor-content');
        content.textContent = l.enter_two_fa_code;
        container.append(content);

        this.fieldset = document.createElement('fieldset');
        this.fieldset.classList.add('code-container');
        container.append(this.fieldset);

        for (let i = 0; i < 6; i++) {
            const twoFAInput = document.createElement('input');
            twoFAInput.type = 'number';
            twoFAInput.classList.add('underlinedText');
            twoFAInput.dataset.number = i;

            twoFAInput.addEventListener('focus', twoFAInput.select);

            this.fieldset.append(twoFAInput);
        }

        this.pinInputs = new mega.ui.MegaInputs(this.fieldset.querySelectorAll('input')).reverse();

        this.pinInputsBinding();

        // delay for the overlay transition to happen and set focus
        delay('2fa-input-focus', () => {
            this.pinInputs[0].$input.focus();
        }, 200);

        // verify button
        this.verifyButton = new MegaButton({
            parentNode: container,
            componentClassname: 'block normal primary twofa-verify-btn',
            text: l[1960]
        });

        this.verifyButton.on('click.confirmAction', () => this.verifyTwoFA());

        // lost device button
        /* eslint-disable no-new */
        new MegaLink({
            parentNode: container,
            componentClassname: 'block text-only normal',
            text: l[19215],
            href: 'https://mega.nz/recovery',
            target: '_blank'
        });

        return container;
    },

    pinInputsBinding() {
        'use strict';

        for (let i = 0; i < this.pinInputs.length; i++) {
            this.pinInputs[i].$input.rebind('keydown.verifyPin', (e) => {
                // Change focus on backspace
                if (e.keyCode === 8 && e.target.value === '' && i !== 0) {
                    this.pinInputs[i - 1].$input.focus().select();
                }

                // Verify pin
                if (e.keyCode === 13) {
                    this.verifyTwoFA();
                }
            });

            this.pinInputs[i].$input.rebind('input.fieldsetAction', (e) => {
                const [first, ...rest] = e.target.value;

                // Set default
                this.fieldset.classList.remove('error');
                this.pinInputs[0].$input.megaInputsHideError();

                // Set empty val if undefined
                e.target.value = first || '';

                // Set other values
                if (first !== undefined && i !== this.pinInputs.length - 1) {
                    this.pinInputs[i + 1].$input.focus();

                    // if the pincode is copy pasted in a single input box, then arrange it accordingly
                    if (rest.length) {
                        this.pinInputs[i + 1].$input.val(rest.join('')).trigger('input.fieldsetAction');
                    }
                }
            });
        }
    },

    async verifyTwoFA() {
        'use strict';

        const value = $.trim(this.pinInputs.map(({$input}) => $input.val()).join(''));

        if (!value || value.length !== 6) {
            return this.showError(l.empty_two_fa_code);
        }

        this.setLoading(true);
        const rememberMe = null;

        // Check if using old/new login method and log them in
        const res = await mega.ui.pm.send({type: 'login', email: this.email,
                                           password: this.password, twoFactorPin: value, rememberMe});

        if (res > 0) {
            this.email = null;
            this.password = null;

            this.showSuccess();
            delay('hide-2fa-overlay', () => this.hideOverlay(), 1000);

            mega.ui.header.addClass('logged-in');
            pushHistoryState('list');
        }
        // If there was a 2FA error, show a message that the PIN code was
        // incorrect and clear the text field
        else if (res === EFAILED) {
            this.showError(l.incorrect_code);
        }
        else if (res === false) {
            this.hideOverlay();
        }

        this.setLoading(false);
    },

    showSuccess() {
        'use strict';

        this.fieldset.classList.add('success');
    },

    showError(error) {
        'use strict';

        this.fieldset.classList.add('error');

        this.pinInputs[0].$input.megaInputsShowError(
            '<i class="sprite-pm-ext-mono icon-alert-triangle-thin-outline"></i>' +
            `<span>${error}</span>`
        );
    },

    hideOverlay() {
        'use strict';

        mega.ui.overlay.hide();
        mega.ui.overlay.removeClass('two-factor');
    },

    setLoading(val) {
        'use strict';

        this.verifyButton.loading = this.fieldset.disabled = val;
    }
};
