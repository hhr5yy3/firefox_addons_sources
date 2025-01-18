/**
 * Create a re-usable toast object.
 */
class MegaToast extends MegaComponent {

    /**
     * The permanent toast object constructor.
     *
     * @param {Object} options The instance options.
     * @param {Object} options.parentNode The parentnode to append the toast too.
     */
    constructor(options) {

        super(options);

        if (!this.domNode) {
            return;
        }

        const targetNode = this.domNode;
        let subNode;
        targetNode.classList.add('toast-notification');

        /* Message text */
        subNode = document.createElement('span');
        subNode.classList.add('message-body');
        this.domNode.appendChild(subNode);
        this.bodyNode = subNode;

        /* Action button */
        // We use text "b" to force the generation of the text elements.
        subNode = new MegaButton({
            parentNode: targetNode,
            text: "b",
            type: "normal",
            componentClassname: "action-link toast"
        });
        /* Action button click event */
        subNode.on('click', () => {

            this.trigger('toastAction');
            this.hide();

        });
        this.actionButton = subNode;
        this.actionButtonText = "";

        this.on('click.dismiss', () => {

            this.trigger('dismissAction');
            this.hide();

        });
    }

    /**
     * Clear the current toast message, action button text and actions.
     *
     * @returns void
     */
    clear() {
        this.message = "";
        this.actionButtonText = "";

        /* Reset bindings */
        this.off('toastAction');
        this.off('dismissAction');
    }

    /**
     * Show the current toast.
     *
     * @returns void
     */
    show() {
        this.domNode.classList.remove('close');
    }

    /**
     * Hide the current toast.
     *
     * @returns void
     */
    hide() {
        this.domNode.classList.add('close');
    }

    /**
     * Set the toast message to the provided value.
     *
     * @param {String} value The provided message value.
     *
     * @returns void
     */
    set message(value) {
        this.bodyNode.textContent = "";

        if (typeof value === 'string') {
            value = document.createTextNode(value);
        }

        this.bodyNode.append(value);
    }

    /**
     * Get the toast message text.
     *
     * @returns {String} The message text.
     */
    get message() {
        return this.bodyNode.innerText;
    }

    /**
     * Set the action/call to action button text.
     *
     * @param {String} [message=""] The new text.
     *
     * @returns void
     */
    set actionButtonText(message) {
        this.actionButton.text = message || "";
    }

    /**
     * Get the current action button text.
     *
     * @returns {String} Action button message text.
     */
    get actionButtonText() {
        return this.actionButton.text;
    }
}

mBroadcaster.once('boot_done', () => {
    'use strict';

    // Generate object methods for directly displaying toasts
    mega.ui.toast = {
        rack: new MegaRack({
            parentNode: document.body,
            componentClassname: 'toast disappear bottom',
            defaultTimeout: 4,
            childComponent: MegaToast
        }),

        /**
         * Show a toast within the toastRack with the specified parameters
         * for the specified callback.
         *
         * @param {string} message The message to display.
         * @param {number} [timeout] The time until the toast expires and leaves the screen. 0 is infinite.
         * @param {string} [actionButtonText] The text to place on the blue actionbutton.
         * @param {object} [callbacks] Object containing various function callbacks.
         * @param {function} [callbacks.actionButtonCallback] The callback to run when the actionbutton is called.
         * @param {function} [callbacks.clickCallback] The callback to run when the toast is clicked to dismiss.
         * @param {function} [callbacks.timeoutCallback] The callback to run when the toast times out.
         *
         * @returns {undefined}
         */
        show: function(message, timeout, actionButtonText,
                       {actionButtonCallback, clickCallback, timeoutCallback} = {}) {

            this.rack.show(function() {

                this.message = message || '';
                this.actionButtonText = actionButtonText || '';

                if (typeof timeoutCallback === 'function') {

                    this.on('timeoutAction', timeoutCallback);

                }

                if (typeof clickCallback === 'function') {

                    this.on('dismissAction', clickCallback);

                }

                if (typeof actionButtonCallback === 'function') {

                    this.on('toastAction', actionButtonCallback);

                }
            }, timeout);
        },

        /*
        These exist for compatibility with current calls, and occupy a feature
        subset.
        NB: Position is a deprecated parameter.
        */
        legacy: {
            /**
             * Show a toast with the specified message and timeout.
             *
             * @param {string} message The message that the toast should display.
             * @param {string} [position] Deprecated.
             * @param {number} [timeout=4000] The time until the toast expires and leaves the screen. 0 is infinite.
             *
             * @returns {undefined}
             */
            show: function(message, position, timeout) {

                mega.ui.toast.rack.show(function() {

                    this.message = message;

                }, timeout);
            },
        },
    };
});
