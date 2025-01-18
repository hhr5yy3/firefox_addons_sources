mega.ui.pm.delete = {
    showConfirm() {
        'use strict';

        if (!navigator.onLine) {
            this.showConnectionErrorDialog();
            return;
        }

        const title = mega.ui.pm.list.passwordItem.item.name;

        mega.ui.dialog.show({
            name: 'confirm-deletion',
            title: parseHTML(`<h2 class="text-container">${l.delete_confirmation_title.replace('%1', title)}</h2>`),
            contents: [l.permanent_action],
            showClose: true,
            preventBgClosing: false,
            actions: [
                {
                    type: 'normal',
                    text: l[82],
                    componentClassname: 'secondary',
                    onClick: () => mega.ui.dialog.hide()
                },
                {
                    type: 'normal',
                    text: l[1730],
                    onClick: async() => {
                        if (!navigator.onLine) {
                            this.showConnectionErrorDialog();
                            return;
                        }

                        const currentIndex = mega.ui.pm.list.vaultPasswords
                            .findIndex(node => node.h === mega.ui.pm.list.passwordItem.item.h);

                        const newSelectedId = currentIndex === mega.ui.pm.list.vaultPasswords.length - 1
                            ? currentIndex - 1 : currentIndex + 1;

                        const newSelected = mega.ui.pm.list.vaultPasswords[newSelectedId] &&
                                                mega.ui.pm.list.vaultPasswords[newSelectedId].h;

                        await mega.ui.pm.comm.saveLastSelected(newSelected);
                        mega.ui.dialog.hide();
                        const result = await mega.ui.pm.comm.deleteItem(mega.ui.pm.list.passwordItem.item.h);

                        if (typeof result === 'object') {
                            mega.ui.toast.show(parseHTML(l.item_deleted.replace('%1', title)));
                        }
                        else {
                            // show dialog on api request errors
                            msgDialog('warninga', l.unsuccessful_action, `${l.request_failed}`,
                                      `${l.error_code}: ${result}`, () => mega.ui.overlay.hide());
                        }
                    }
                }
            ]
        });
    },

    showConnectionErrorDialog() {
        'use strict';

        mega.ui.dialog.show({
            name: 'connection-issue-delete-button',
            title: l.unable_to_delete,
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
    }
};
