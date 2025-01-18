class MegaOverlay extends MegaComponent {
    constructor(options) {

        super(options);

        if (!this.domNode) {
            return;
        }

        this.addClass('custom-alpha', 'overlay-wrap');

        let targetNode = this.domNode;
        let subNode = document.createElement('div');
        subNode.className = `${options.wrapperClassname} custom-alpha`;
        targetNode.appendChild(subNode);
        const overlay = subNode;

        targetNode = overlay;

        this.headerNode = subNode = document.createElement('div');
        subNode.className = 'header';
        targetNode.appendChild(subNode);
        targetNode = subNode;

        this.headerTitleNode = subNode = document.createElement('div');
        subNode.className = 'header-title';
        targetNode.appendChild(subNode);

        this.closeButton = new MegaButton({
            parentNode: targetNode,
            type: 'icon',
            componentClassname: 'text-icon close',
            icon: 'sprite-pm-ext-mono icon-x-thin-outline',
            iconSize: 24
        });

        targetNode = overlay;

        this.mainNode = subNode = document.createElement('div');
        subNode.className = 'main';
        targetNode.appendChild(subNode);
        this.mainNode.Ps = new PerfectScrollbar(this.mainNode);

        targetNode = subNode;

        this.imageNode = subNode = document.createElement('div');
        subNode.className = 'image';
        targetNode.appendChild(subNode);

        this.titleNode = subNode = document.createElement('div');
        subNode.className = 'title';
        targetNode.appendChild(subNode);

        this.subTitleNode = subNode = document.createElement('div');
        subNode.className = 'subtitle';
        targetNode.appendChild(subNode);

        this.contentNode = subNode = document.createElement('div');
        subNode.className = 'content';
        targetNode.appendChild(subNode);

        targetNode = overlay;
        this.actionsNode = subNode = document.createElement('div');
        subNode.className = 'actions';
        targetNode.appendChild(subNode);
    }

    get visible() {
        return this.hasClass('active');
    }

    show(options) {
        if (options) {
            this.clear();
            this.showClose = options.showClose;
            this.centered = options.centered;

            if (options.classList) {
                this.addClass(...options.classList);
            }

            if (!options.name && d) {
                console.warn('Overlay name is missing. Please set it in the options');
            }

            const _bindEvent = (onAction, target, event) => {

                if (typeof onAction === 'function') {

                    if (target && event) {
                        target.on(event, onAction);
                    }
                    else {
                        onAction();
                    }
                }
            };

            this.name = options.name || '';
            this.clearHeader();

            if (options.navImage) {
                this.addNavImage(options.navImage, true);
            }

            if (options.icon) {
                this.addImage(options.icon);
            }

            if (options.header) {
                this.addHeader(options.header, options.headerType);
            }

            if (options.title) {
                this.addTitle(options.title, options.titleType);
            }
            if (options.subtitle) {
                this.addSubTitle(options.subtitle);
            }
            this.addContents(options.contents || []);

            _bindEvent(options.onRender);

            if (options.actions) {
                this.addActions(options.actions);
            }

            _bindEvent(options.onClose, this, 'close.overlay');

            if (options.actionOnBottom) {
                this.addClass('action-button-bottom');
            }

            _bindEvent(options.onShow);
        }

        this.closeButton.rebind('click.closeOverlay', async() => {
            // If the overlay requires a confirmation action before closing it,
            // wait for the user's response before trying to close the overlay
            if (options && options.confirmClose) {
                const closeOverlay = await options.confirmClose();
                if (!closeOverlay) {
                    return;
                }
            }

            this.hide();
            if (mega.ui.toast) {
                mega.ui.toast.rack.removeClass('above-actions');
            }
            this.trigger('close');
        });

        this.addClass('active');
    }

    hide(name) {
        if (this.visible && (!name || name === this.name)) {
            this.removeClass('active');
            mainlayout.classList.remove('pm-dialog');
            mega.ui.overlay.removeClass('pm-dialog');
            this.name = undefined;
        }
    }

    clear() {
        this.clearTitle();
        this.clearSubTitle();
        this.clearImage();
        this.clearContent();
        this.clearActions();
        this.clearUserEvents();

        this.removeClass('action-button-bottom');
    }

    // Methods for each of its elements

    get showClose() {
        return !this.domNode.querySelector('.close').classList.contains('hidden');
    }

    set showClose(show) {
        const close = this.domNode.querySelector('.close');
        if (show !== !close.classList.contains('hidden')) {
            close.classList.toggle('hidden');
        }
    }

    get centered() {
        return !!this.domNode.querySelector('.main').classList.contains('centered');
    }

    set centered(val = true) {
        const main = this.domNode.querySelector('.main');

        if (val !== this.centered) {
            main.classList.toggle('centered');
        }
    }

    get name() {
        return this.domNode.name;
    }

    set name(name) {
        this.domNode.name = name;
    }

    addTitle(title, titleType) {
        this.clearTitle();
        const subNode = document.createElement(titleType || 'h1');
        subNode.textContent = title;
        this.titleNode.appendChild(subNode);
    }

    addHeader(title, headerType) {
        const subNode = document.createElement(headerType || 'h2');
        subNode.textContent = title;
        this.headerTitleNode.appendChild(subNode);
    }

    clearHeader() {
        this.headerTitleNode.textContent = '';
    }

    clearTitle() {
        this.titleNode.textContent = '';
    }

    addSubTitle(subtitle) {
        this.clearSubTitle();
        if (subtitle) {
            const subNode = document.createElement('span');
            subNode.textContent = subtitle;
            this.subTitleNode.appendChild(subNode);
        }
    }

    clearSubTitle() {
        this.subTitleNode.textContent = '';
    }

    clearImage() {
        this.imageNode.textContent = '';
    }

    addImage(imageClass, icon = true) {
        const elem = document.createElement('i');
        elem.className = icon ? `icon ${imageClass}` : imageClass;
        this.imageNode.append(elem);
    }

    addNavImage(imageClass, icon = true) {
        const elem = document.createElement('i');
        elem.className = icon ? `icon ${imageClass}` : imageClass;
        this.headerTitleNode.appendChild(elem);
    }

    addContent(content, clear) {
        if (!content) {
            return;
        }
        if (typeof content === 'string') {
            content = document.createTextNode(content);
        }

        if (clear) {
            this.clearContent();
        }

        this.contentNode.appendChild(content);
        this.mainNode.Ps.update();
    }

    addContents(contents, clear) {
        if (clear) {
            this.clearContent();
        }
        for (let i = 0; i < contents.length; i++) {
            this.addContent(contents[i]);
        }
    }

    clearContent() {
        this.contentNode.textContent = '';
        if (this.mainNode.Ps) {
            this.mainNode.Ps.update();
        }
    }

    addActions(actions, clear) {
        if (clear) {
            this.clearActions();
        }

        const res = [];

        for (let i = 0; i < actions.length; i++) {
            const interactable = actions[i].href ? MegaLink : MegaButton;
            const buttonProps = {
                ...actions[i],
                parentNode: this.actionsNode,
                componentClassname: `${actions[i].componentClassname || 'primary'} nav-elem normal button`
            };

            const btn = new interactable(buttonProps);
            btn.removeClass('link');
            res.push(btn);
        }

        return res;
    }

    clearActions() {
        this.actionsNode.textContent = '';
    }

    // Other util methods

    scrollTo(element) {
        if (element) {
            element.scrollIntoView();
        }
    }

    clearUserEvents() {
        this.off('close.overlay');
    }
}

mega.ui.overlay = new MegaOverlay({
    parentNode: document.body,
    componentClassname: 'mega-overlay',
    wrapperClassname: 'overlay'
});
