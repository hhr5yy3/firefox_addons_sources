class MegaHeader extends MegaComponent {
    constructor(options) {
        super(options);

        if (!this.domNode) {
            return;
        }

        this.avatarLoaded = false;
        const loggedContainer = document.createElement('div');
        loggedContainer.className = 'logged-header';

        const loginContainer = document.createElement('div');
        loginContainer.className = 'login-header';

        const subNode = document.querySelector('.top-container');
        subNode.append(loginContainer, loggedContainer);

        /* eslint-disable no-new */
        new MegaInteractable({
            parentNode: loginContainer,
            type: 'icon',
            componentClassname: 'logo',
            icon: 'sprite-fm-illustration-wide img-mega-logo',
            iconSize: 80
        });

        new MegaLink({
            parentNode: loginContainer,
            text: l[209],
            componentClassname: 'text-only',
            href: 'https://mega.nz/register',
            target: '_blank'
        });

        const searchInput = document.createElement('input');
        searchInput.className = 'form-element underlinedText no-title-top clearButton';
        searchInput.placeholder = l[102];
        searchInput.disabled = true;
        searchInput.dataset.icon = 'sprite-pm-ext-mono icon-search-light-outline left-icon';
        loggedContainer.append(searchInput);

        const searchMegaInput = new mega.ui.MegaInputs($(searchInput));
        searchMegaInput.$wrapper.addClass('search-bar disabled');

        let wasBlurred = true;
        let isFocused = false;

        searchMegaInput.$input.on('focus', () => {
            if (searchMegaInput.$input.val().length === 0) {
                isFocused = true;
            }
        });

        searchMegaInput.$input.on('input', () => {
            const inputValue = searchMegaInput.$input.val();

            delay('passwordlist.search', () => {
                mega.ui.pm.list.searchList(inputValue);
                if (wasBlurred && isFocused && !!inputValue) {
                    eventlog(590006);
                    wasBlurred = false;
                }
            }, 1000);
        });

        searchMegaInput.$input.on('blur', () => {
            isFocused = false;
            wasBlurred = true;
        });

        const addItemBtn = new MegaButton({
            parentNode: loggedContainer,
            text: l.add_item_btn,
            icon: 'sprite-pm-ext-mono icon-plus-light-solid',
            iconSize: 24
        });
        addItemBtn.on('click', () => {
            if (!mega.ui.passform) {
                mega.ui.passform = new PasswordItemForm();
            }

            mega.ui.passform.show({
                type: 'create'
            });

            eventlog(590001);
        });

        this.avatarBtn = new MegaButton({
            parentNode: loggedContainer,
            componentClassname: 'avatar-btn',
            type: 'icon'
        });
    }

    static init() {
        if (!mega.ui.header) {
            mega.ui.header = new MegaHeader({
                parentNode: mainlayout,
                componentClassname: 'top-container',
                prepend: true
            });
        }
    }

    update() {
        if (u_sid) {
            this.addClass('logged-in');

            if (!this.avatarLoaded && typeof u_attr !== 'undefined') {
                this.getAvatar();
            }
        }
        else {
            this.removeClass('logged-in');
        }
    }

    async getAvatar() {
        this.avatarLoaded = true;
        this.avatarBtn.domNode.textContent = '';

        const avatarMeta = await mega.ui.pm.send({type: 'get-user-avatar'});

        if (!avatarMeta) {
            this.avatarLoaded = false;
            return;
        }

        this.avatarDialog = document.createElement('div');
        this.avatarDialog.className = 'pm-account-dialog';

        const dialogHeader = document.createElement('div');
        dialogHeader.className = 'avatar-header';

        this.menuAvatar = document.createElement('div');
        this.menuAvatar.className = 'account-profile';

        const details = document.createElement('div');
        details.className = 'avatar-details';

        const name = document.createElement('div');
        name.className = 'pm-name';

        const email = document.createElement('div');
        email.className = 'pm-email';

        details.append(name, email);
        dialogHeader.append(this.menuAvatar, details);

        const horizontalDivider = document.createElement('div');
        horizontalDivider.className = 'horizontal-divider';

        this.avatarDialog.append(dialogHeader, horizontalDivider);

        this.loadAvatar(avatarMeta);

        this.avatarBtn.rebind('click', event => {
            if (this.avatarBtn.toggleClass('active')) {
                mega.ui.contextMenu.show({
                    name: 'avatar-menu',
                    event,
                    eventTarget: this.avatarBtn,
                    parentNode: this.avatarDialog,
                    pos: {top: 6}
                });

                const nameElm = this.avatarDialog.querySelector('.pm-name');

                // Seems names are elipsissed
                if (nameElm.offsetHeight < nameElm.scrollHeight || nameElm.offsetWidth < nameElm.scrollWidth) {
                    nameElm.classList.add('simpletip');
                }
                else {
                    nameElm.classList.remove('simpletip');
                }

                eventlog(590028);
            }
            else {
                mega.ui.menu.hide();
            }
        });

        mega.ui.menu.on('close.menu', () => this.avatarBtn.domNode.classList.remove('active'));
    }

    loadAvatar(avatarMeta) {
        this.updateUserName(avatarMeta.fullName);
        this.updateEmail(u_attr && u_attr.email || '');
        const shortNameEl = document.createElement('span');
        shortNameEl.textContent = avatarMeta.shortName;

        let avatarDiv = '';
        if (avatarMeta.avatarUrl) {
            avatarDiv = document.createElement('img');
            avatarDiv.src = avatarMeta.avatarUrl;
        }
        else {
            avatarDiv = document.createElement('div');
            avatarDiv.className = `color${avatarMeta.color}`;
            avatarDiv.appendChild(shortNameEl);
        }

        this.menuAvatar.textContent = '';
        this.avatarBtn.domNode.replaceChildren(avatarDiv);
        this.menuAvatar.appendChild(avatarDiv.cloneNode(true));
    }

    updateUserName(newName) {
        const nameElm = this.avatarDialog.querySelector('.pm-name');
        nameElm.textContent = nameElm.dataset.simpletip = newName;

        // Seems names are elipsissed
        if (nameElm.offsetHeight < nameElm.scrollHeight || nameElm.offsetWidth < nameElm.scrollWidth) {
            nameElm.classList.add('simpletip');
            $(nameElm).trigger('simpletipUpdated');
        }
        else {
            nameElm.classList.remove('simpletip');
        }
    }

    updateEmail(newEmail) {
        this.avatarDialog.querySelector('.pm-email').textContent = newEmail;
    }
}
