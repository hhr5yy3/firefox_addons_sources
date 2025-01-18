mega.ui.pm.recoveryLogout = {

    container: null,

    /**
     * Initializes the recovery logout dialog.
     * @returns {Object} Container
     */
    async init() {
        'use strict';

        if (!this.container) {

            this.container = mCreateElement('div', {'class': 'recovery-key-logout'}, [
                mCreateElement('span', {'class': 'text info'})
            ]);

            const recoveryKey = await mega.ui.pm.send({type: 'get-recovery-key'});

            let rkinput, passwordField;

            // Step 1: Actual recovery key input + download button
            const recoveryKeyContainer = mCreateElement('div', {'class': 'recovery-key container'}, [
                mCreateElement('span', {'class': 'recovery-key blurb'}, [document.createTextNode(
                    l.logout_recovery_key_title)]),
                rkinput = mCreateElement('div', {'class': 'recovery-key input'}, [
                    mCreateElement('input', {
                        'class': 'recovery-key string',
                        'type': 'text',
                        'readonly': '',
                        'value': recoveryKey
                    })])
            ], this.container);

            // Inline copy button
            const copyButton = new MegaButton({
                parentNode: rkinput,
                type: 'icon',
                icon: 'sprite-pm-ext-mono icon-copy-thin-outline',
                iconSize: 22,
                componentClassname: 'text-icon'
            });
            copyButton.on('click', () =>
                copyToClipboard(recoveryKey, l[8836], 'above-actions'));

            // Download button
            /* eslint-disable no-new */
            const downloadBtn = new MegaButton({
                parentNode: recoveryKeyContainer,
                text: l.logout_recovery_key_download,
                componentClassname: 'primary block dlButton button-prd-backup'
            });

            downloadBtn.on('click', () => {
                const name = getSafeName(`${l[20830]}.txt`);
                const blob = new File([new TextEncoder().encode('' + recoveryKey).buffer], name, {type: 'text/plain'});

                chrome.downloads.download({
                    url: URL.createObjectURL(blob),
                    filename: name
                }, downloadId => {
                    dlID = downloadId;
                });

                mBroadcaster.once('download_complete', () => {
                    mega.ui.toast.rack.addClass('above-actions');
                    mega.ui.toast.show(l.recovery_key_download_toast); // Downloaded copy
                    mega.ui.pm.recoveryLogout.skipToLogout();
                });
            });

            // Step 2: Actual password input + confirm button
            const passReminderContainer = mCreateElement('div', {'class': 'pass-reminder container hidden'}, [
                passwordField = mCreateElement('input', {
                    'class': 'underlinedText',
                    'type': 'password',
                    'id': 'test-pass',
                    'title': l[909]
                })], this.container);

            this.megaPwdInput = new mega.ui.MegaInputs($(passwordField));

            // Confirm button
            const pwdConfirmBtn = new MegaButton({
                parentNode: passReminderContainer,
                text: l.logout_password_confirm,
                componentClassname: 'primary block confirmButton button-prd-confirm'
            });

            const onPwdConfirm = async() => {
                const res = await mega.ui.pm.send({type: 'password-reminder',
                                                   password: this.megaPwdInput.$input.val()});
                const alertIcon = '<i class="sprite-pm-ext-mono icon-alert-triangle-thin-outline"></i>';
                const checkIcon = '<i class="sprite-pm-ext-mono icon-check-circle-thin-outline"></i>';

                if (res) {
                    this.megaPwdInput.$input.megaInputsShowMessage(`${checkIcon} ${l.logout_password_confirm_correct}`);
                    this.megaPwdInput.$wrapper.addClass('success');
                }
                else {
                    this.megaPwdInput.$input.megaInputsShowError(
                        `${alertIcon} ${l.logout_password_confirm_no_correct}`);
                }
            };

            pwdConfirmBtn.on('click', onPwdConfirm);
            this.megaPwdInput.$input.rebind('keyup.passwordReminder input.passwordReminder', ({keyCode}) => {
                if (keyCode === 13) {
                    onPwdConfirm();
                }

                if (this.megaPwdInput.$wrapper.hasClass('success')) {
                    this.megaPwdInput.hideMessage();
                    this.megaPwdInput.$wrapper.removeClass('success');
                }
            });

            // Forgot password link
            mCreateElement('div', {'class': 'pass-reminder-forgot'}, [
                document.createTextNode(l[1934]),
                mCreateElement('a', {'class': 'forgot-password clickurl',
                                     'href': 'https://mega.nz/fm/account/security/change-password',
                                     'target': '_blank'}, [document.createTextNode(l[23262])])
            ], passReminderContainer);

            // Skip link
            const skipLink = new MegaLink({
                parentNode: this.container,
                type: 'normal',
                componentClassname: 'text-only skip-link',
                text: l[1379]
            });
            skipLink.on('click.skip', () => {
                if (skipLink.text === l.logout_proceed) {
                    mega.ui.pm.comm.logout(true);
                    mega.ui.overlay.hide();
                }
                else {
                    this.jumpToStep2();
                }
            });
        }

        const textInfo = this.container.querySelector('.text.info');
        if (textInfo) {
            textInfo.textContent = '';
            textInfo.append(parseHTML(l.logout_recovery_key));
        }

        const skipLink = this.container.componentSelector('.skip-link');
        if (skipLink) {
            skipLink.text = l[1379];
            skipLink.removeClass('button-prd-skip');
        }

        this.megaPwdInput.setValue('');
        this.container.querySelector('.recovery-key.container').classList.remove('hidden');
        this.container.querySelector('.pass-reminder.container').classList.add('hidden');

        return this.container;
    },

    /**
     * Moves to the next step of the recovery logout dialog
     * @returns {void}
     */
    jumpToStep2() {
        'use strict';

        this.container.querySelector('.recovery-key.container').classList.add('hidden');

        mega.ui.overlay.addTitle(l[16895]);

        mega.ui.overlay.clearImage('password');
        mega.ui.overlay.addImage('password');

        const textInfo = this.container.querySelector('.text.info');
        if (textInfo) {
            textInfo.textContent = l.logout_password;
        }

        this.container.querySelector('.pass-reminder.container').classList.remove('hidden');

        this.skipToLogout();
    },

    /**
     * Update the 'Skip' button to proceed with the logout.
     * @returns {void}
     */
    skipToLogout() {
        'use strict';

        const skipLink = this.container.componentSelector('.skip-link');
        if (skipLink) {
            skipLink.text = l.logout_proceed;
            skipLink.addClass('button-prd-skip');
        }
    }
};
