class MegaController {
    constructor() {
        this._currentState = null;
        this.viewsMap = {login: MegaLogin, list: MegaPasswordList};
        Object.freeze(this.viewsMap);
    }

    get currentState() {
        return this._currentState;
    }

    set currentState(state) {
        if (this._currentState !== null) {
            this._currentState.destroy();
            // mega.ui.header.hide();
        }
        this._currentState = state;

        state.show();
    }
}

function pushHistoryState(page, state) {
    'use strict';

    try {
        let method = 'pushState';
        const viewContainer = document.getElementById('main-content');

        if (page === true) {
            method = 'replaceState';
            page = state;
            state = undefined;
        }

        if (typeof page !== 'object') {
            page = page ? {subpage: page} : history.state;
        }
        state = Object.assign({}, page, state);
        page = state.subpage || location.hash;

        if (d > 1 && method === 'pushState' && JSON.stringify(history.state) === JSON.stringify(state)) {
            console.warn('duplicate push state attempt.');
        }

        history[method](state, '', '#' + page);

        mega.controller.currentState = new mega.controller.viewsMap[page]({parentNode: viewContainer});

        mega.ui.header.update();
    }
    catch (ex) {
        console.warn(ex);
    }
}
