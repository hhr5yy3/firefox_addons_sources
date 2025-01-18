class MegaContextMenu extends MegaComponentGroup {
    constructor() {
        super();

        this.domNode = document.createElement('div');
        this.domNode.className = 'context-menu-items';

        this.keys = Object.keys(MegaContextMenu.menuItems);

        // build all context menu items
        for (let i = this.keys.length; i--;) {
            const key = this.keys[i];
            const menu = MegaContextMenu.menuItems[key];

            const item = new MegaButton({
                ...menu,
                type: 'fullwidth',
                parentNode: this.domNode,
                componentClassname: `text-icon ${key.replace('.', '')}`
            });

            this.addChild(key, item);
        }
    }

    /**
     * Build menu items and show context menu dialog
     *
     * @param {Object} options Options for the context menu
     * @returns {void}
     */
    show(options) {
        this.name = options.name;
        const menuItems = Object.create(null);

        if (this.name === 'item-detail-menu') {
            menuItems['.edit-item'] = 1;
            menuItems['.delete-item'] = 1;
        }
        else if (this.name === 'avatar-menu') {
            menuItems['.logout'] = 1;
            menuItems['.web-app'] = 1;
            menuItems['.import'] = 1;
            menuItems['.settings'] = 1;
        }

        for (let i = this.keys.length; i--;) {
            const key = this.keys[i];
            const item = this.domNode.querySelector(key);

            // if the context menu has the key then remove hidden class to show the item
            item.classList[menuItems[key] ? 'remove' : 'add']('hidden');
        }

        let contents = [this.domNode];

        if (options.parentNode) {
            options.parentNode.append(...contents);
            contents = [options.parentNode];
        }

        mega.ui.menu.show({
            ...options,
            contents
        });
    }
}

mBroadcaster.once('lang_loaded', () => {
    'use strict';

    MegaContextMenu.menuItems = {
        '.delete-item': {
            text: l.delete_item,
            icon: 'sprite-pm-ext-mono icon-trash-thin-outline',
            onClick: () => {
                if (validateUserStatus()) {
                    mega.ui.pm.delete.showConfirm();
                    eventlog(590008);
                }
            }
        },
        '.edit-item': {
            text: l.edit_item,
            icon: 'sprite-pm-ext-mono icon-edit-thin-outline',
            onClick: () => {
                if (!mega.ui.passform) {
                    mega.ui.passform = new PasswordItemForm();
                }

                mega.ui.passform.show({
                    type: 'update'
                });
                eventlog(590007);
            }
        },
        '.logout': {
            text: l.mobile_settings_log_out_button,
            icon: 'sprite-pm-ext-mono icon-log-out-thin-outline',
            onClick: async() => {
                const content = await mega.ui.pm.recoveryLogout.init();

                mega.ui.overlay.show({
                    name: 'recoverykey-logout-overlay',
                    navImage: 'left-icon sprite-fm-illustration-wide img-mega-logo sk-elm icon-size-80',
                    showClose: true,
                    centered: true,
                    classList: ['logout-overlay', 'with-top-nav'],
                    icon: 'bell',
                    title: l.logout_before,
                    contents: [content]
                });

                mega.ui.overlay.one('close.overlay', () => {
                    mega.ui.overlay.removeClass('logout-overlay', 'with-top-nav');
                });
                eventlog(590043);
            }
        },
        '.web-app': {
            text: l.open_web_app_label,
            icon: 'sprite-pm-ext-mono icon-external-link-thin-outline',
            onClick: () => {
                eventlog(590042);
                chrome.tabs.create({url: 'https://mega.nz/fm/pwm'});
            }
        },
        '.import': {
            text: l.import_password,
            icon: 'sprite-pm-ext-mono icon-file-upload-thin-outline',
            onClick: () => {
                chrome.tabs.create({url: chrome.runtime.getURL('settings/settings.html#import')});
            }
        },
        '.settings': {
            text: l[823],
            icon: 'sprite-pm-ext-mono icon-settings-thin-outline',
            onClick: () => {
                eventlog(590027);
                chrome.tabs.create({url: chrome.runtime.getURL('settings/settings.html')});
            }
        }
    };

    mega.ui.contextMenu = new MegaContextMenu();
});
