"use strict";

const classNames = {
    ROOT: 'ntp-add-site',
    NOTIFICATION_TEXT: 'ntp-notify-text',
    CANCEL_BUTTON: 'ntp-cancel-button',
    CLOSE_BUTTON: 'ntp-close-button',
    CROSS_BUTTON: 'ntp-cross-button',
    TILE_CONTAINER: 'ntp-tile-container'
};

const animationsService = {
    MAIN_CLASS_ADD_DELAY: 30,
    HELP_CLASS_REMOVE_DELAY: 500,
    animate(element, nextClass, prevClass) {
        return new Promise((resolve, reject) => {
            const classList = element.classList;
            classList.remove(prevClass, `${prevClass}-active`);
            classList.add(`${nextClass}-active`);
            setTimeout(() => {
                classList.add(nextClass);
            }, this.MAIN_CLASS_ADD_DELAY);
            setTimeout(() => {
                classList.remove(`${nextClass}-active`);
                resolve();
            }, this.HELP_CLASS_REMOVE_DELAY);
        });
    }
};

function classNameToSelector(className) {
    return '.' + className;
}


const DESTROY_DELAY = 1000;
const HIDE_DELAY = 3000;

class AddTileNotification {

    constructor() {
        this._handleCloseButtonClickBound = this._handleCloseButtonClick.bind(this);
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);

        this._render();
    }

    _handleMouseEnter() {
        clearTimeout(this._hideTimeoutId);
    }

    _handleMouseLeave() {
        this._hideTimeoutId = setTimeout(() => this.hide(), HIDE_DELAY);
    }

    _handleCloseButtonClick() {
        this.hide();
    }

    _addEventListeners() {
        this._crossButton.addEventListener('click', this._handleCloseButtonClickBound);
        this._element.addEventListener('mouseenter', this._handleMouseEnterBound);
        this._element.addEventListener('mouseleave', this._handleMouseLeaveBound);
    }

    _removeEventListeners() {
        this._crossButton.removeEventListener('click', this._handleCloseButtonClickBound);
        this._element.removeEventListener('mouseenter', this._handleMouseEnterBound);
        this._element.removeEventListener('mouseleave', this._handleMouseLeaveBound);
    }

    _renderTile() {
        chrome.runtime.sendMessage({ type: 'get_meta', hostname: location.origin }, response => {
            console.log(response);
            if (response.imageForUrl) {
                this._tileContainer.innerHTML = `<img class="ntp-tile-image" src="${response.image}">`;
            } else if (response.favicon && !response.tooSmall) {
                this._tileContainer.innerHTML = `<img class="ntp-tile-favicon" src="${response.image}">`;
            } else if (response.extendedInfo && response.extendedInfo.type === 'content') {
                this._tileContainer.innerHTML = '';
                this._tileContainer.style.backgroundImage = `url('${response.extendedInfo.image}')`;
            } else {
                const tileText = location.hostname.replace('www.', '').split('.').slice(0, -1).join('.<wbr>');
                this._tileContainer.innerHTML = `<span class="ntp-tile-text">${tileText}</span>`;
            }

            this._tileContainer.style.backgroundColor = response.color;
        });
    }

    _render() {
        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);

        const spinnerUrl = chrome.extension.getURL('img/spinner.png');

        const addedTemplate = `
            <div class="ntp-tile-container">
                <img src="${spinnerUrl}" class="ntp-spinner">
            </div>
            <div class="ntp-text-container">
                <span class="ntp-title">Сайт успешно добавлен на <strong>Пульс</strong></span>
                <span class="ntp-hostname">${location.hostname.replace('www.', '')}</span>
            </div>
        `;

        const trashIconUrl = chrome.extension.getURL('img/trash.png');

        const removedTemplate = `
            <div class="ntp-tile-container">
                <img src="${trashIconUrl}">
            </div>
            <div class="ntp-text-container">
                <span class="ntp-title">Сайт удален с <strong>Пульса</strong></span>
            </div>
        `;

        const isAdded = window.IS_ADDED;

        tempDiv.innerHTML = `
            <div class="ntp-add-site ${ isAdded ? 'ntp-added' : 'ntp-removed' }">
                <button class="ntp-cross-button"></button>
                ${ isAdded ? addedTemplate : removedTemplate }
            </div>
        `;

        this._container = tempDiv;
        this._element = this._container.querySelector(classNameToSelector(classNames.ROOT));
        this._crossButton = this._element.querySelector(classNameToSelector(classNames.CROSS_BUTTON));
        this._tileContainer = this._element.querySelector(classNameToSelector(classNames.TILE_CONTAINER));

        if (isAdded) {
            this._renderTile();
        }

        this._addEventListeners();
    }

    _destroy() {
        if (this._element) {
            this._removeEventListeners();
            this._container.remove();
            this._container = null;
            this._element = null;
        }
    }

    show() {
        this._visible = true;
        this._hideTimeoutId = setTimeout(() => this.hide(), HIDE_DELAY);

        return animationsService.animate(this._element, 'ntp-show', 'ntp-hide');
    }

    hide() {
        return new Promise((resolve, reject) => {
            this._visible = false;
            clearTimeout(this._hideTimeoutId);

            setTimeout(() => {
                this._destroy();
            }, DESTROY_DELAY);

            animationsService.animate(this._element, 'ntp-hide', 'ntp-show').then(resolve);
        });
    }

    isVisible() {
        return this._visible;
    }
}

let addTileNotification;
addTileNotification = new AddTileNotification();
addTileNotification.show();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type === 'show_notification') {
        window.IS_ADDED = request.isAdded;

        if (addTileNotification.isVisible()) {
            addTileNotification.hide().then(() => {
                addTileNotification = new AddTileNotification();
                addTileNotification.show();
            });
        } else {
            addTileNotification = new AddTileNotification();
            addTileNotification.show();
        }
        sendResponse({ ok: true });
        return true;
    }

});