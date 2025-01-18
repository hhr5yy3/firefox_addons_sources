class MegaFullpageLoader extends MegaComponent {
    constructor(options) {

        super(options);

        if (!this.domNode) {
            return;
        }

        if (!document.querySelector('.dark-overlay')) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'dark-overlay hidden';
            document.body.appendChild(this.overlay);
            options.parentNode.insertBefore(this.overlay, this.domNode);
        }

        this.domNode.classList.add('loading-spinner', 'hidden');

        let elm = document.createElement('div');
        elm.classList.add('main-loader');
        this.domNode.appendChild(elm);
    }

    get visible() {
        return this.hasClass('active');
    }

    show() {
        this.removeClass('hidden');
        this.overlay.classList.remove('hidden');
    }

    hide() {
        this.addClass('hidden');
        this.overlay.classList.add('hidden');
    }
}

mega.ui.fploader = new MegaFullpageLoader({
    parentNode: document.body,
    componentClassname: 'mega-overlay',
    wrapperClassname: 'overlay'
});
