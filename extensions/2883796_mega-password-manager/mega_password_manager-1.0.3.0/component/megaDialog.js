class MegaDialog extends MegaOverlay {
    constructor(options) {
        super(options);

        const _onCloseDialog = ({data}) => {
            if (data && data.target === this.domNode) {
                if (this.preventBgClosing) {
                    return false;
                }

                this.hide();
                this.trigger('close');
            }
        };

        this.rebind('click', _onCloseDialog);
    }

    /**
     * Method to open a dialog with data if passed as a param
     * @param {Object} [options] contains optional fields to set data
     *
     * @returns {void}
     * */
    show(options) {
        this.preventBgClosing = options && options.preventBgClosing || false;
        mainlayout.classList.add('pm-dialog');
        mega.ui.overlay.addClass('pm-dialog');
        super.show(options);
    }

    /**
     * Overridden function
     * @param {String} title title of the dialog
     */
    addTitle(title, titleType = 'h2') {
        this.clearTitle();
        let subNode = title;

        if (typeof subNode === 'string') {
            subNode = document.createElement(titleType);
            subNode.textContent = title;
        }

        this.titleNode.appendChild(subNode);
    }
}

mega.ui.dialog = new MegaDialog({
    parentNode: document.body,
    componentClassname: 'mega-dialog',
    wrapperClassname: 'overlay'
});
