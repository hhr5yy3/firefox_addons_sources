class MegaPasswordItemDetail {
    constructor() {
        this.domNode = document.createElement('div');
        this.domNode.classList.add('detail-panel', 'hidden');

        const subHeader = document.createElement('div');
        subHeader.classList.add('sub-header');
        this.subHeaderTitle = document.createElement('h1');
        this.subHeaderIcon = document.createElement('div');

        this.nameSubHeader = document.createElement('div');
        this.nameSubHeader.className = 'name-sub-header';

        this.nameSubHeader.append(this.subHeaderIcon);
        this.nameSubHeader.append(this.subHeaderTitle);
        subHeader.append(this.nameSubHeader);

        const contextMenuBtn = new MegaInteractable({
            parentNode: subHeader,
            type: 'icon',
            icon: 'sprite-pm-ext-mono icon-more-horizontal-regular-outline'
        });

        contextMenuBtn.on('click', event => {
            if (contextMenuBtn.toggleClass('active')) {
                mega.ui.contextMenu.show({
                    name: 'item-detail-menu',
                    event,
                    eventTarget: contextMenuBtn
                });
            }
            else {
                mega.ui.menu.hide();
            }
        });

        mega.ui.menu.on('close.menu', () => {
            contextMenuBtn.domNode.classList.remove('active');
        });

        this.domNode.append(subHeader);

        const detailForm = document.createElement('div');
        detailForm.classList.add('detail-form');

        this.domNode.append(detailForm);

        this.usernameField = new MegaReadOnlyField({
            parentNode: detailForm,
            id: 'username',
            grouped: true,
            actions: [{
                icon: 'sprite-pm-ext-mono icon-copy-user-thin-outline',
                onClick() {
                    copyToClipboard(this.inputValue, l.username_copied);
                    return false;
                },
                hint: l.copy_username
            }],
            label: l.username_label,
            onClick() {
                copyToClipboard(this.inputValue, l.username_copied);
                return false;
            }
        });

        this.passwordField = new MegaReadOnlyField({
            parentNode: detailForm,
            id: 'password',
            actions: [
                {
                    icon: 'sprite-pm-ext-mono icon-eye-thin-outline',
                    onClick(e) {
                        this.isPasswordVisible = !this.isPasswordVisible;
                        let {domNode} = e.currentTarget;
                        e.currentTarget.icon = this.isPasswordVisible ? 'sprite-pm-ext-mono icon-eye-off-thin-outline simpletip' :
                            'sprite-pm-ext-mono icon-eye-thin-outline simpletip';
                        domNode.dataset.simpletip = this.isPasswordVisible ? l.hide_password : l.show_password;
                        $(domNode).trigger('simpletipUpdated');
                        return false;
                    },
                    hint: l.show_password
                },
                {
                    icon: 'sprite-pm-ext-mono icon-copy-password-thin-outline',
                    onClick() {
                        copyToClipboard(this.inputValue, l[19602]);
                        return false;
                    },
                    hint: l[19601]
                }
            ],
            label: l[909],
            isPassword: true,
            onClick() {
                copyToClipboard(this.inputValue, l[19602]);
                return false;
            }
        });

        this.websiteField = new MegaReadOnlyField({
            parentNode: detailForm,
            id: 'website',
            label: l.website_label,
            isLink: true,
        });

        this.notesField = new MegaReadOnlyField({
            parentNode: detailForm,
            id: 'notes',
            actions: [
                {
                    icon: 'sprite-pm-ext-mono icon-copy-thin-outline',
                    onClick: (e, field) => {
                        copyToClipboard(field.inputValue, l.notes_copied);
                    },
                    hint: l.copy_notes
                }
            ],
            label: l.notes_label,
            onClick: (e) => {
                copyToClipboard(e.currentTarget.inputValue, l.notes_copied);
                return false;
            }
        });

        this.dateAdded = document.createElement('p');
        this.dateAdded.className = 'text-detail';

        detailForm.append(this.dateAdded);
    }

    /**
     * Populate the detail panel form with the selected password item.
     *
     * @param {string} pH password Handle
     * @returns {void}
     */
    async showDetail(pH) {
        this.item = await M.getNodeByHandle(pH);

        if (!this.item) {
            return;
        }

        const {u, pwd, n, url} = this.item.pwm;

        this.usernameField.inputValue = u;
        this.passwordField.inputValue = pwd;
        this.websiteField.inputValue = url;
        this.notesField.inputValue = n;
        this.usernameField[u ? 'removeClass' : 'addClass']('hidden');
        this.websiteField[url ? 'removeClass' : 'addClass']('hidden');
        this.notesField[n ? 'removeClass' : 'addClass']('hidden');
        this.passwordField.isPasswordVisible = false;
        this.passwordField.setActions(this.passwordField.actions);

        this.subHeaderTitle.textContent = this.item.name || url;
        this.subHeaderTitle.classList.add('simpletip');
        this.subHeaderTitle.dataset.simpletip = this.item.name || url;
        this.subHeaderTitle.dataset.simpletipposition = 'top';
        this.subHeaderTitle.dataset.simpletipoffset = '2';

        const outer = document.createElement('div');
        outer.className = 'favicon';
        const span = document.createElement('span');
        outer.append(span);

        generateFavicon(this.item.name, url, outer);

        // const newFavicon = generateFavicon(name, url);
        this.nameSubHeader.replaceChild(outer, this.subHeaderIcon);
        this.subHeaderIcon = outer;

        this.dateAdded.textContent = '';
        this.dateAdded.append(parseHTML(l.date_added.replace('%1', time2date(this.item.ts))));

        this.domNode.classList.remove('hidden');

        onIdle(() => {
            if (this.domNode.Ps) {
                this.domNode.Ps.update();
            }
            else {
                this.domNode.Ps = new PerfectScrollbar(this.domNode);
            }
        });
    }
}
