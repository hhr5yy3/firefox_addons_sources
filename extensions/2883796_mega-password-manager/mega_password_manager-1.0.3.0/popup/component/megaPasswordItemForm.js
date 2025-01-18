class PasswordItemForm extends MegaForm {
    constructor() {
        const options = {
            parentNode: mega.ui.overlay.contentNode,
            componentClassname: 'password-item-form',
            fields: [
                {
                    nodeType: 'input',
                    type: 'text',
                    required: true,
                    classNames: 'form-element underlinedText password-item-title clearButton trim',
                    title: l.title_label,
                    megaInputOptions: {
                        name: 'megaTitleInput',
                        event: 'input',
                        on: () => {
                            if (this.megaTitleInput.$wrapper.hasClass('error')) {
                                this.megaTitleInput.$input.megaInputsHideError();
                            }

                            generateFavicon(this.megaTitleInput.$input.val(), this.megaWebsiteInput.$input.val(),
                                            this.outer);
                        }
                    }
                },
                {
                    nodeType: 'input',
                    type: 'text',
                    title: l.username_label_optional,
                    classNames: 'form-element underlinedText clearButton trim optional',
                    megaInputOptions: {
                        name: 'megaUnameInput'
                    }
                },
                {
                    nodeType: 'input',
                    type: 'password',
                    title: l[909],
                    required: true,
                    classNames: 'form-element underlinedText strengthChecker clearButton password',
                    megaInputOptions: {
                        name: 'megaPwdInput'
                    }
                },
                {
                    nodeType: 'button',
                    text: l.generate_password_title,
                    classname: 'generate-password text-icon',
                    icon: 'sprite-pm-ext-mono icon-sync-thin-outline',
                    typeAttr: 'button',
                    onClick: () => {
                        mega.ui.passwordGenerator.show();
                        eventlog(590014);
                        return false;
                    }
                },
                {
                    nodeType: 'input',
                    type: 'text',
                    title: l.website_label_optional,
                    classNames: 'form-element underlinedText clearButton trim optional',
                    megaInputOptions: {
                        name: 'megaWebsiteInput',
                        event: 'blur',
                        on: () => {
                            generateFavicon(this.megaTitleInput.$input.val(), this.megaWebsiteInput.$input.val(),
                                            this.outer);
                        }
                    }
                },
                {
                    nodeType: 'textarea',
                    title: l.notes_label_optional,
                    classNames: 'form-element pmTextArea optional',
                    megaInputOptions: {
                        name: 'megaNotesInput'
                    }
                }
            ],
            actions: [
                {
                    text: l.msg_dlg_save,
                    classname: 'password-item-save-button primary submit',
                    typeAttr: 'button',
                    onClick: () => {
                        this.setLoading(true);

                        if (!navigator.onLine) {
                            this.setLoading(false);
                            mega.ui.dialog.show({
                                name: 'connection-issue',
                                title: l.unable_to_save,
                                icon: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline warning',
                                contents: [l.check_connection],
                                showClose: true,
                                actions: [{
                                    type: 'normal',
                                    text: l.ok_button,
                                    onClick: () => {
                                        mega.ui.dialog.hide();
                                        mega.ui.overlay.hide();
                                    }
                                }]
                            });

                            return;
                        }

                        if (!this.validateForm()) {
                            this.setLoading(false);
                            this.megaTitleInput.$input.focus();
                            return;
                        }

                        if (this.formType === 'create') {
                            this.createItem();
                        }
                        else {
                            this.updateItem();
                        }
                    }
                }
            ]
        };

        super(options);

        this.outer = document.createElement('div');
        this.outer.className = 'favicon manual-favicon';
        const span = document.createElement('span');
        this.outer.append(span);
        this.megaTitleInput.$wrapper[0].appendChild(this.outer);
        this.megaTitleInput.$wrapper.addClass('has-favicon');
    }

    show(options) {
        if (!options.type || !validateUserStatus()) {
            return;
        }

        // check connection before proceeding
        if (!navigator.onLine) {
            mega.ui.dialog.show({
                name: 'connection-issue-add-item-button',
                title: options.type === 'create' ? l.unable_to_add : l.unable_to_edit,
                icon: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline warning',
                contents: [l.check_connection],
                showClose: true,
                actions: [
                    {
                        type: 'normal',
                        text: l.ok_button,
                        onClick: () => mega.ui.dialog.hide()
                    }
                ]
            });

            return;
        }

        super.show(options);

        this.formType = options.type;

        if (this.formType === 'update') {
            this.setValue(mega.ui.pm.list.passwordItem.item);
        }

        mega.ui.overlay.show({
            name: 'new-password-item-overlay',
            header: this.formType === 'create' ? l.add_item : l.edit_item,
            contents: [this.domNode],
            showClose: true,
            confirmClose: () => this.discard(this.isFormChanged)
        });

        mega.ui.overlay.addClass('with-top-nav');

        // delay for the overlay transition to happen and set focus
        delay('password-item-title-focus', () => this.megaTitleInput.$input.focus());
        mega.ui.overlay.on('close.overlay', () => this.clear());

        this.initialcurrentFormValues = this.currentFormValues;
    }

    get currentFormValues() {
        return {
            title: this.megaTitleInput.$input.val().trim(),
            uname: this.megaUnameInput.$input.val().trim(),
            pwd: this.megaPwdInput.$input.val(),
            url: this.megaWebsiteInput.$input.val().trim(),
            notes: this.megaNotesInput.$input.val()
        };
    }

    get isFormChanged() {
        return Object.keys(this.initialcurrentFormValues).some(key => {
            return this.initialcurrentFormValues[key] !== this.currentFormValues[key];
        });
    }

    async createItem() {
        const {title, uname, pwd, url, notes} = this.currentFormValues;
        const {pwmh} = await mega.ui.pm.comm.getPwmh();

        const n = {name: title, pwm: {pwd, u: uname, n: notes, url}};
        const name = title;
        const target = pwmh;
        const result = await mega.ui.pm.comm.createItem(n, name, target);

        if (typeof result === 'number' && result < 0) {
            this.showError(result);
            return;
        }

        mega.ui.toast.show(l.item_created);
        mega.ui.pm.comm.saveLastSelected(result);
        mega.ui.overlay.hide();
        this.clear();
    }

    async updateItem() {
        const {title, uname, pwd, url, notes} = this.currentFormValues;
        const n = {name: title, pwd, u: uname, n: notes, url};
        const handle = mega.ui.pm.list.passwordItem.item.h;

        const res = await mega.ui.pm.comm.updateItem(n, handle);

        if (typeof res === 'number' && res < 0) {
            this.showError(res);
            return;
        }

        if (res && typeof res === 'object' && res.result === 0) {
            mega.ui.toast.show(parseHTML(l.item_updated.replace('%1', title)));
        }

        mega.ui.pm.comm.saveLastSelected(handle);
        mega.ui.overlay.hide();
        this.clear();
    }

    clear() {
        super.clear();
        this.setLoading(false);

        mega.ui.overlay.removeClass('with-top-nav');

        // reset to password type
        if (this.megaPwdInput.$input.attr('type') === 'text') {
            $('.pass-visible', this.megaPwdInput.$wrapper).trigger('click.togglePassV');
        }

        // trigger input to remove the strength checker message
        this.megaPwdInput.$input.trigger('input');

        generateFavicon('', '', this.outer);
    }

    setValue(pwdItem) {
        this.megaWebsiteInput.setValue(pwdItem.pwm.url);
        this.megaTitleInput.setValue(pwdItem.name);
        this.megaUnameInput.setValue(pwdItem.pwm.u);
        this.megaNotesInput.setValue(pwdItem.pwm.n);

        this.setPass(pwdItem.pwm.pwd);
    }

    setPass(val) {
        this.megaPwdInput.setValue(val);
    }

    validateForm() {
        const alertIcon = '<i class="sprite-pm-ext-mono icon-alert-triangle-thin-outline"></i>';
        const title = this.megaTitleInput.$input.val();
        const url = this.megaWebsiteInput.$input.val();
        const pwd = this.megaPwdInput.$input.val();
        let success = true;

        if (!title) {
            this.megaTitleInput.$input.megaInputsShowError(`${alertIcon} ${l.title_value}`);
            success = false;
        }

        if (!pwd) {
            this.megaPwdInput.$input.megaInputsShowError(`${alertIcon} ${l.err_no_pass}`);
            success = false;
        }

        if (url && !isURL(url)) {
            this.megaWebsiteInput.$input.megaInputsShowError(`${alertIcon} ${l.url_value}`);
            success = false;
        }

        if (title) {
            const [node] = mega.ui.pm.list.vaultPasswords.filter(item => item.name === title);

            // allows editing of the other fields w/ or w/o the title
            if (node && (this.formType === 'create' || node.h !== mega.ui.pm.list.passwordItem.item.h)) {
                this.megaTitleInput.$input.megaInputsShowError(`${alertIcon} ${l.title_exist.replace('%1', title)}`);
                success = false;
            }
        }

        return success;
    }

    showError(result) {
        this.setLoading(false);
        // show dialog on api request errors
        msgDialog('warninga', l.unsuccessful_action, `${l.request_failed}`,
                  `${l.error_code}: ${result}`, () => mega.ui.overlay.hide());
    }
}
