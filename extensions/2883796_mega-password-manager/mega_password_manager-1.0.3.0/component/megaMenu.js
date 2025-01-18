class MegaMenu extends MegaOverlay {
    /**
     * Show mega menu
     * @param {Object} options Options for the MegaMenu
     * @example
     * mega.ui.menu.show({
     *      name: 'context-menu',
     *      showClose: true,
     *      scrollTo: false,
     *      preventBgClosing: false,
     *      contents: [this.domNode]
     * })
     * @returns {void}
     */
    show(options) {
        super.show({
            ...options,
            showClose: false,
            centered: false
        });

        this.calcPosition(options.event, options.pos);

        // This is opened by click event.
        if (options.eventTarget) {
            this.eventTarget = options.eventTarget;
        }

        this.windowResizeHanlder = () => {
            this.calcPosition(options.event, options.pos);
        }

        window.addEventListener('resize', this.windowResizeHanlder);
    }

    hide() {
        super.hide();
        window.removeEventListener('resize', this.windowResizeHanlder);
        delete this.windowResizeHanlder;
    }

    /**
     * Calculate the position of the context menu dialog based on the target element
     *
     * @param {*} event Event object
     * @returns {void}
     */
    calcPosition(event, pos = {}) {
        if (!this.visible) {
            return;
        }

        pos = {top: 0, left: 0, ...pos};

        const dialog = this.domNode;
        const dialogStyle = dialog.style;
        dialogStyle.height = null;

        const {top, bottom, left} = event.currentTarget.domNode.getBoundingClientRect();

        const menuWidth = parseFloat(dialog.offsetWidth);
        let menuHeight = parseFloat(dialog.offsetHeight);

        // calculate the max width & height available for the context menu dialog
        const maxWidth = POPUP_WIDTH - POPUP_SIDE_MARGIN;
        const maxHeight = POPUP_HEIGHT - POPUP_TOP_MARGIN;

        // calculate the position of the context menu dialog from the left & top of the target element
        let posLeft = left + POPUP_SIDE_MARGIN + pos.left;
        let posTop = bottom + pos.top;

        // check if top is at the second half of the popup.
        // if so, show the context menu dialog above the target element
        if (posTop + menuHeight > maxHeight) {
            posTop = Math.abs(top - menuHeight);
        }

        const maxPosWidth = left + POPUP_SIDE_MARGIN + menuWidth;
        const maxPosHeight = posTop + menuHeight;

        // show the dialog right side of the target element if position exceeds the max width
        if (maxPosWidth > maxWidth) {
            posLeft = maxWidth - menuWidth;
        }

        // calc the dialog height based on the available space.
        if (maxPosHeight > maxHeight) {
            menuHeight = Math.abs(maxHeight - posTop);
        }

        dialogStyle.height = `${menuHeight}px`;
        dialogStyle.left = `${posLeft}px`;
        dialogStyle.top = `${posTop}px`;
    }
}

mBroadcaster.once('lang_loaded', () => {
    'use strict';

    mega.ui.menu = new MegaMenu({
        parentNode: document.body,
        componentClassname: 'menu-container context-menu',
        wrapperClassname: 'menu'
    });

    document.body.addEventListener('click', event => {
        if (mega.ui.menu.eventTarget && (event.target === mega.ui.menu.eventTarget.domNode ||
            mega.ui.menu.eventTarget.domNode.contains(event.target))) {
            return;
        }

        mega.ui.menu.hide();
        mega.ui.menu.trigger('close');
    }, true);
});
