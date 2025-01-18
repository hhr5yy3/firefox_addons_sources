var alertIcon = '<i class="sprite-pm-ext-mono icon-alert-triangle-thin-outline"></i>';

/**
 *
 * @param {{id, password}} credentials - Credentials to populate in popup
 * @param {{pageTitle,pageUrl}} pageInfo - Login page info
 * @param {boolean|{name, pwm: {pwd, u, n, url}}} updated - Whether to show update or save dialog
 * @param {Array<{name, pwm: {pwd, u, n, url}}>} existingList - List containing the existing items for current domain,
 * only existing if changing the id
 * @returns {void}
 */
function renderSaveDialog(credentials, pageInfo, updated, existingList) {
    "use strict";

    const saveUpdateTabs = existingList && existingList.length > 0;

    if (!mega.ui.saveDialog) {
        const shadowWrap = document.createElement('div');
        shadowWrap.className = 'mega-shadow-dom';
        document.body.appendChild(shadowWrap);
        const shadow = shadowWrap.attachShadow({mode: "open"});
        injectScriptToShadow(shadow);
        const saveDialog = document.createElement("div");
        saveDialog.className = "mega-pm-save-dialog mega-pm-content";
        shadow.appendChild(saveDialog);
        mega.ui.saveDialog = saveDialog;
    }
    mega.ui.saveDialog.textContent = '';

    mega.ui.setTheme(mega.ui.saveDialog);
    const iconBar = document.createElement("div");
    const icon = document.createElement('i');
    icon.className = `${iconClasses}`;
    iconBar.className = 'mega-pm-save-dialog-icons';

    const exitBtn = document.createElement('button');
    const exitIcon = document.createElement('i');
    exitBtn.className = 'nav-elem text-only mega-pm-button';
    exitBtn.appendChild(exitIcon);
    exitIcon.className = `close-icon mega-pm-icon sprite-pm-ext-mono icon-x-thin-outline`;
    iconBar.append(icon, exitBtn);

    const titleBar = document.createElement("div");
    titleBar.className = 'mega-pm-save-dialog-title-bar';

    const backBtn = document.createElement('button');
    const backArrow = document.createElement("i");
    backBtn.className = 'nav-elem text-only mega-pm-button mega-pm-hidden back-btn';
    backBtn.appendChild(backArrow);
    backArrow.className = 'sprite-pm-ext-mono icon-arrow-left-regular-solid';

    const dialogTitle = document.createElement('h1');
    dialogTitle.className = 'mega-pm-save-dialog-title';
    dialogTitle.textContent = updated ? l.update_dialog_title : l.save_dialog_title;

    titleBar.append(backBtn, dialogTitle);

    mega.ui.saveDialog.append(iconBar, titleBar);

    const saveForm = document.createElement('form');
    saveForm.className = 'mega-pm-save-dialog-form';
    const {id, password} = credentials || {id: '', password: ''};
    const {pageTitle, pageUrl} = pageInfo || {pageTitle: '', pageUrl: ''};

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.title = l.title_label;
    titleInput.required = true;
    titleInput.name = 'title';
    titleInput.className = 'form-element underlinedText password-item-title trim';
    titleInput.autocomplete = 'off';
    saveForm.append(titleInput);
    const megaTitleInput = mega.ui.MegaInputs($(titleInput));

    const outer = document.createElement('div');
    outer.className = 'favicon manual-favicon';
    const span = document.createElement('span');
    outer.append(span);
    megaTitleInput.$wrapper[0].appendChild(outer);
    megaTitleInput.$wrapper.addClass('has-favicon');

    const uname = document.createElement('input');
    uname.type = 'text';
    uname.title = l.username_label;
    uname.name = 'id';
    uname.className = 'form-element underlinedText trim optional';
    uname.autocomplete = 'off';
    saveForm.appendChild(uname);
    const megaUnameInput = mega.ui.MegaInputs($(uname));

    const pwd = document.createElement('input');
    pwd.type = 'password';
    pwd.title = l[909];
    pwd.required = true;
    pwd.name = 'password';
    pwd.className = 'form-element underlinedText password';
    pwd.autocomplete = 'off';

    saveForm.appendChild(pwd);
    const megaPwdInput = mega.ui.MegaInputs($(pwd), {
        iconClass: 'pm-icon'
    });

    const saveBtn = document.createElement('button');
    const innerSave = document.createElement('span');
    saveBtn.append(innerSave);
    saveBtn.className = 'nav-elem normal mega-pm-button';
    innerSave.textContent = updated ? l[707] : l.msg_dlg_save;

    const dismissBtn = document.createElement('button');
    const innerDismissBtn = document.createElement('span');
    dismissBtn.append(innerDismissBtn);
    dismissBtn.className = 'nav-elem text-only mega-pm-button';
    innerDismissBtn.textContent = l[18682];

    saveForm.append(saveBtn, dismissBtn);

    megaTitleInput.$input.rebind('input', () => {
        if (megaTitleInput.$wrapper.hasClass('error')) {
            megaTitleInput.$input.megaInputsHideError();
        }

        generateFavicon(megaTitleInput.$input.val(), pageUrl, outer);
    });

    if (pageTitle !== '' || pageUrl !== '') {
        megaTitleInput.setValue(pageTitle);
        generateFavicon(megaTitleInput.$input.val(), pageUrl, outer);
    }

    megaUnameInput.setValue(id);
    megaPwdInput.setValue(password);
    const eyeIcon = saveForm.querySelector('.pass-visible');
    eyeIcon.classList.remove('hidden');

    addPwmEvent(saveBtn, 'click', (e) => {
        e.preventDefault();
        saveBtn.classList.add('mega-pm-loading', 'sprite-pm-ext-theme-after',
                              'icon-loader-throbber-light-outline-after');
        saveBtn.disabled = true;

        const title = megaTitleInput.$input[0].value;
        const pwd = megaPwdInput.$input[0].value;
        let success = true;

        if (!title) {
            megaTitleInput.$input.megaInputsShowError(`${alertIcon} ${l.title_value}`);
            success = false;
        }

        if (!pwd) {
            megaPwdInput.$input.megaInputsShowError(`${alertIcon} ${l.err_no_pass}`);
            success = false;
        }

        mega.ui.pm.send({type: 'name-already-exist', name: title, updated}).then(alreadyExists => {
            if (alreadyExists) {
                megaTitleInput.$input.megaInputsShowError(`${alertIcon} ${l.title_exist.replace('%1', title)}`);
                success = false;
            }

            if (!success) {
                saveBtn.classList.remove('mega-pm-loading', 'sprite-pm-ext-theme-after',
                                         'icon-loader-throbber-light-outline-after');
                saveBtn.disabled = false;
                return false;
            }
            mega.ui.pm.send({
                type: 'save-item-credentials',
                formData: {
                    pwd: megaPwdInput.$input[0].value,
                    u: megaUnameInput.$input[0].value,
                    name: megaTitleInput.$input[0].value,
                    url: pageUrl,
                    updated
                }
            }).then((result) => {
                saveBtn.classList.remove('mega-pm-loading', 'sprite-pm-ext-theme-after',
                                         'icon-loader-throbber-light-outline-after');
                saveBtn.disabled = false;

                if (result === EEXIST) {
                    megaTitleInput.$input.megaInputsShowError(`${alertIcon} ${l.title_exist.replace('%1', title)}`);
                    return;
                }
                closeSaveDialog(e);
            });
        });
    });

    addPwmEvent(dismissBtn, 'click', closeSaveDialog);

    const existingListElement = document.createElement('div');
    existingListElement.className = 'mega-pm-save-dialog-existing-list mega-pm-hidden';
    const fragment = document.createDocumentFragment();
    const saveDialogTabs = document.createElement('div');

    if (saveUpdateTabs) {

        const _clickEvent = n => {
            dialogTitle.textContent = l.update_dialog_title;
            existingListElement.classList.add('mega-pm-hidden');
            saveForm.classList.remove('mega-pm-hidden');
            backBtn.classList.remove('mega-pm-hidden');
            saveDialogTabs.classList.add('mega-pm-hidden');
            megaTitleInput.setValue(n.name);
            megaUnameInput.setValue(id);
            megaPwdInput.setValue(password);
            generateFavicon(megaTitleInput.$input[0].value, pageUrl, outer);
            innerSave.textContent = l.update_btn;
            updated = n;
        };

        for (const node of existingList) {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'mega-pm-dialog-elem';

            const detail = document.createElement('div');
            detail.className = 'mega-pm-detail';
            const elementName = document.createElement('span');
            elementName.className = 'mega-pm-name';
            elementName.textContent = node.name;

            const elementUsername = document.createElement('span');
            elementUsername.className = 'mega-pm-subtext';
            elementUsername.textContent = node.pwm.u;

            detail.append(elementName, elementUsername);

            const chevron = document.createElement('i');
            chevron.className = 'sprite-pm-ext-mono icon-chevron-right-regular-solid';

            const elementIcon = document.createElement('div');
            elementIcon.className = 'mega-pm-favicon';
            const iconInner = document.createElement('span');
            elementIcon.appendChild(iconInner);
            generateFavicon(node.name, node.pwm.url, elementIcon);

            nodeElement.append(elementIcon, detail, chevron);
            fragment.appendChild(nodeElement);

            addPwmEvent(nodeElement, 'click', () => _clickEvent(node));
        }
    }

    existingListElement.appendChild(fragment);

    if (saveUpdateTabs) {
        saveDialogTabs.className = 'mega-pm-save-dialog-tabs';

        const newItemTab = document.createElement('span');
        const updateTab = document.createElement('span');

        newItemTab.className = 'mega-pm-save-dialog-tab selected';
        newItemTab.textContent = l.new_tab_name;
        newItemTab.tabIndex = 0;
        addPwmEvent(newItemTab, 'click', () => {
            saveForm.classList.remove('mega-pm-hidden');
            existingListElement.classList.add('mega-pm-hidden');
            newItemTab.classList.add('selected');
            updateTab.classList.remove('selected');
        });

        updateTab.className = 'mega-pm-save-dialog-tab';
        updateTab.textContent = l.existing_tab_name;
        updateTab.tabIndex = 0;
        addPwmEvent(updateTab, 'click', () => {
            saveForm.classList.add('mega-pm-hidden');
            existingListElement.classList.remove('mega-pm-hidden');
            updateTab.classList.add('selected');
            newItemTab.classList.remove('selected');
        });

        saveDialogTabs.append(newItemTab, updateTab);

        mega.ui.saveDialog.append(saveDialogTabs);
    }

    mega.ui.saveDialog.append(saveForm);
    mega.ui.saveDialog.append(existingListElement);
    const existingListScrollbar = new PerfectScrollbar(existingListElement);

    addPwmEvent(exitBtn, 'click', closeSaveDialog);

    addPwmEvent(backBtn, 'click', () => {
        updated = false;
        dialogTitle.textContent = l.save_dialog_title;
        existingListElement.classList.remove('mega-pm-hidden');
        saveForm.classList.add('mega-pm-hidden');
        backBtn.classList.add('mega-pm-hidden');
        saveDialogTabs.classList.remove('mega-pm-hidden');
        megaTitleInput.setValue(pageTitle);
        generateFavicon(megaTitleInput.$input.val(), pageUrl, outer);
        megaUnameInput.setValue(id);
        megaPwdInput.setValue(password);
        innerSave.textContent = l.msg_dlg_save;
        existingListScrollbar.update();
    });
}

function closeSaveDialog(e) {
    "use strict";
    e.preventDefault();

    const msg = {type: 'clear-saved-credentials'};

    if (specialWebsite && specialWebsite.crossdomainLogin) {
        msg.crossdomainLogin = specialWebsite.crossdomainLogin;
    }

    mega.ui.pm.send(msg).then((result) => {
        if (result) {
            return;
        }
        mega.ui.saveDialog.textContent = '';
        mega.ui.saveDialog.classList.add('close');
    });
}
