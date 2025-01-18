class MegaLogin extends MegaForm {
    constructor(options) {
        const submit = async() => {
            const email = this.emailMegaInput.$input[0].value.trim();
            const password = this.pwdMegaInput.$input[0].value;
            const alertIcon = '<i class="sprite-pm-ext-mono icon-alert-triangle-thin-outline"></i>';

            // hide the invalid email/password error or too many attempts error message
            this.hideError();

            let success = true;

            if (!isValidEmail(email)) {
                this.emailMegaInput.$input.megaInputsShowError(`${alertIcon}${l.enter_valid_email}`);
                success = false;
            }
            if (password === '') {
                this.pwdMegaInput.$input.megaInputsShowError(`${alertIcon}${l.err_no_pass}`);
                success = false;
            }

            if (success) {
                this.setLoading(true);
                const twoFactorPin = null;
                const rememberMe = false;

                chrome.runtime.onMessage.addListener(function resetLoadingState(message, sender) {
                    // Reject all messages not coming from the extension
                    if (sender.id !== chrome.runtime.id) {
                        return false;
                    }

                    if (message.type === 'reset-loading-state') {
                        mega.ui.login.setLoading(false);
                    }

                    chrome.runtime.onMessage.removeListener(resetLoadingState);
                });

                const result = await mega.ui.pm.send({type: 'login', email, password,
                                                      twoFactorPin, rememberMe});

                this.setLoading(false);

                // if the user doesn't have an active plan, don't proceed
                if (result === false) {
                    return;
                }

                if (result === EMFAREQUIRED) {
                    twofa.email = email;
                    twofa.password = password;
                    // Request the 2FA PIN by showing the dialog, then after that it will re-run this function
                    twofa.initOverlay();
                    return;
                }

                if (result === EINCOMPLETE) {
                    msgDialog('warningb', l.unable_login, l.account_not_validated);
                    return;
                }

                // Check for too many login attempts
                if (result === ETOOMANY) {
                    const time = new Date(Date.now() + 3780000).toLocaleTimeString(
                        [], { hour: "2-digit", minute: "2-digit" });
                    msgDialog('warningb', l.too_many_attempts_title,
                              mega.icu.format(l.too_many_attempts_msg).replace('%1', time));

                    return;
                }

                // epheremal account (u_type = 0) cannot not login
                if (!result || result < 0) {
                    this.showError(l[16349]);
                    this.emailMegaInput.showError();
                    this.pwdMegaInput.showError();
                    return;
                }

                // show the logged in view
                mega.ui.header.addClass('logged-in');
                pushHistoryState('list');
                this.clear();
            }
        };

        const fieldOptions = {
            ...options,
            id: 'login-form',
            componentClassname: 'login-container',
            fieldsetOptions: {
                className: 'fieldset'
            },
            fields: [
                {
                    nodeType: 'input',
                    type: 'text',
                    id: 'email',
                    name: 'email',
                    classNames: 'form-element underlinedText clearButton',
                    title: l[95],
                    autocomplete: 'off',
                    megaInputOptions: {
                        name: 'emailMegaInput',
                        on: () => this.hideError(),
                        event: 'keyup'
                    }
                },
                {
                    nodeType: 'input',
                    type: 'password',
                    id: 'password',
                    name: 'password',
                    classNames: 'form-element underlinedText',
                    title: l[909],
                    megaInputOptions: {
                        name: 'pwdMegaInput',
                        on: ({keyCode}) => {
                            this.hideError();
                            if (keyCode === 13) {
                                submit();
                            }
                        },
                        event: 'keyup'
                    }
                }
            ],
            actions: [
                {
                    text: l[8969],
                    id: 'forgot-pwd',
                    classname: 'forgot-pwd text-only button',
                    type: 'normal',
                    href: 'https://mega.nz/recovery',
                    target: '_blank'
                },
                {
                    text: l.log_in,
                    id: 'login-button',
                    type: 'normal',
                    typeAttr: 'button',
                    classname: 'login-button primary submit',
                    onClick: submit
                }
            ]
        };

        super(fieldOptions);

        mega.ui.login = this;

        const heading = document.createElement('h1');
        heading.textContent = l[1768];

        this.domNode.prepend(heading);

        const errorBanner = document.createElement('div');
        errorBanner.className = 'error-banner';

        this.domNode.insertBefore(errorBanner, this.actionsNode);
    }

    hideError() {
        if (this.invalidDetails) {
            this.invalidDetails.destroy();
        }

        // hide invidual email/password error message
        this.emailMegaInput.$input.megaInputsHideError();
        this.pwdMegaInput.$input.megaInputsHideError();
    }

    showError(msg) {
        this.hideError();

        const errorDiv = this.domNode.querySelector('.error-banner');

        if (errorDiv) {
            // show a failed error message in a banner
            this.invalidDetails = mega.ui.inlineAlert.create({
                parentNode: errorDiv,
                componentClassname: 'error',
                text: msg,
                icon: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline',
                closeButton: false
            });
        }
    }
}
