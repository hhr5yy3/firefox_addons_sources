import BaseClient from './baseclient.js';
import {base64Encode} from '../base64.js';

export default class DelugeApi extends BaseClient {

    constructor(serverSettings) {
        super();

        this.settings = serverSettings;
        this.cookie = null;
    }

    logIn() {
        const {hostname, password} = this.settings;

        this._attachListeners();

        return new Promise((resolve, reject) => {
            fetch(hostname + 'json', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Internal': true
                }),
                body: JSON.stringify({
                    method: 'auth.login',
                    params: [
                        password
                    ],
                    id: 1
                })
            })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error(chrome.i18n.getMessage('apiError', response.status.toString() + ': ' + response.statusText));
            })
            .then((json) => {
                if (json.error === null && json.result === true)
                    resolve();
                else
                    throw new Error(chrome.i18n.getMessage('loginError'));
            })
            .catch((error) => reject(error));
        });
    }

    logOut() {
        const {hostname} = this.settings;

        return new Promise((resolve, reject) => {
            fetch(hostname + 'json', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Internal': true
                }),
                body: JSON.stringify({
                    method: 'auth.delete_session',
                    params: [],
                    id: 4
                })
            })
            .finally((response) => {
                this.removeEventListeners();
                this.cookie = null;
                resolve();
            })
            .catch((error) => reject(error));
        });
    }

    addTorrent(torrent, options = {}) {
        const {hostname} = this.settings;

        return new Promise((resolve, reject) => {
            base64Encode(torrent).then((base64torrent) => {
                let opts = {};

                if (options.paused)
                    opts['add_paused'] = options.paused;

                if (options.path)
                    opts['download_location'] = options.path;
            
                return fetch(hostname + 'json', {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'X-Internal': true
                    }),
                    body: JSON.stringify({
                        method: 'core.add_torrent_file',
                        params: [
                            'temp.torrent',
                            base64torrent,
                            opts
                        ],
                        id: 2
                    })
                })
                .then((response) => {
                    if (response.ok)
                        return response.json();
                    else
                        throw new Error(chrome.i18n.getMessage('apiError', response.status.toString() + ': ' + response.statusText));
                })
                .then((json) => {
                    if (json.error === null && options.label)
                        return this.addLabel(json.result, options.label)
                            .then(() => resolve());
                    else if (json.error === null)
                        resolve();
                    else
                        throw new Error(chrome.i18n.getMessage('torrentAddError'));
                })
            }).catch((error) => reject(error));
        });
    }

    addTorrentUrl(url, options = {}) {
        const {hostname} = this.settings;

        return new Promise((resolve, reject) => {
            let opts = {};

            if (options.paused)
                opts['add_paused'] = options.paused;

            if (options.path)
                opts['download_location'] = options.path;

            fetch(hostname + 'json', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Internal': true
                }),
                body: JSON.stringify({
                    method: 'core.add_torrent_magnet',
                    params: [
                        url,
                        opts
                    ],
                    id: 2
                })
            })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error(chrome.i18n.getMessage('apiError', response.status.toString() + ': ' + response.statusText));
            })
            .then((json) => {
                if (json.error === null && options.label)
                    return this.addLabel(json.result, options.label)
                        .then(() => resolve());
                else if (json.error === null)
                    resolve();
                else
                    throw new Error(chrome.i18n.getMessage('torrentAddError'));
            })
            .catch((error) => reject(error));
        });
    }

    addLabel(torrentId, label) {
        const {hostname} = this.settings;

        return new Promise((resolve, reject) => {
            fetch(hostname + 'json', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Internal': true
                }),
                body: JSON.stringify({
                    method: 'label.set_torrent',
                    params: [
                        torrentId,
                        label.toLowerCase()
                    ],
                    id: 3
                })
            })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error(chrome.i18n.getMessage('apiError', response.status.toString() + ': ' + response.statusText));
            })
            .then((json) => {
                if (json.error === null)
                    resolve();
                else
                    throw new Error(chrome.i18n.getMessage('torrentLabelAddError'));
            })
            .catch((error) => reject(error));
        });
    }

    _attachListeners() {
        const {httpAuth} = this.settings;
        let sessionCookie = this.cookie;

        if (httpAuth) {
            this.addAuthRequiredListener(httpAuth.username, httpAuth.password);
        }

        this.addHeadersReceivedEventListener((details) => {
            const cookie = this.getCookie(details.responseHeaders, '_session_id');

            if (cookie)
                sessionCookie = cookie;

            return {
                responseHeaders: this.filterHeaders(details.responseHeaders, [
                    'set-cookie',
                ])
            };
        });

        this.addBeforeSendHeadersEventListener((details) => {
            let requestHeaders = details.requestHeaders;
            const isInternal = !!requestHeaders.find((header) => header.name.toLowerCase() === 'x-internal');

            if (isInternal) {
                requestHeaders = this.filterHeaders(requestHeaders, [
                    'cookie',
                    'x-internal',
                ]);

                if (sessionCookie) {
                    requestHeaders.push({
                        name: 'Cookie',
                        value: sessionCookie
                    });
                }
            }

            return {
                requestHeaders: requestHeaders
            };
        });
    }

}
