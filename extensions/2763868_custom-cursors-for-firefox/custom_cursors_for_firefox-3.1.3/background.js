/**
 * @author Blife Team
 * @email blife450@gmail.com
 *
 * Copyright 2016-2022 Blife Team
 * https://custom-cursor.com
 */

Array.prototype.current = 0;
Array.prototype.next = function () {
    return this[++this.current];
};
Array.prototype.prev = function () {
    return this[--this.current];
};

const getOffset = (offset, currentWidth, originalWidth = 128) => {
        return Math.floor(offset * currentWidth / originalWidth);
    },
    SIZELIST = [{width: 24, height: 24}, {width: 32, height: 32}, {width: 48, height: 48}, {width: 64, height: 64}, {width: 72, height: 72}, {width: 80, height: 80}, {width: 96, height: 96}, {width: 112, height: 112}];

class background {
    constructor() {
        this.config_sync = {};
        this.data = {};
        this.cT = 0;
        this.intErval = null;
        this.rotatorReq = this.rotatorReq.bind(this);
        this.runRotator = this.runRotator.bind(this)
        this.updateCursor = this.updateCursor.bind(this);
        this.clearCursor = this.clearCursor.bind(this);
        this.stopRotator = this.stopRotator.bind(this);
        this.changeCursor = this.changeCursor.bind(this)
        this.onChanged = this.onChanged.bind(this);
        this.autoChange = this.autoChange.bind(this);
        this.onInstall = this.onInstall.bind(this);

        chrome.storage.local.get(null, function (items) {
            this.data = items;
            try {
                if (Object.prototype.hasOwnProperty.call(this.data.rotator, 'status')) {
                    if (this.data.rotator.status == true) {
                        if (this.data.rotator.type == "time") {
                            if (this.intErval != null) {
                                clearInterval(this.intErval);
                                this.intErval = null;
                            }
                            this.intErval = setInterval(this.runRotator, this.data.rotator.time * 1000);
                        }
                    }
                }
            } catch (e) {
            }

        }.bind(this));
        this.initListeners();

        chrome.tabs.onCreated.addListener(this.rotatorReq);
        chrome.tabs.onUpdated.addListener(this.rotatorReq);
        chrome.storage.onChanged.addListener(this.onChanged);

    }


    onChanged(changes, area) {
        chrome.storage.local.get(null, function (items) {
            this.data = items;
        }.bind(this));
    }

    rotatorReq(tabId, changeInfo, tab) {
        try {
            if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined && this.data.rotator.status == true) {
                if (!Object.prototype.hasOwnProperty.call(this.data, 'tabs_opened')) {
                    this.data.tabs_opened = 1;
                }
                if (this.data.rotator.status == true && this.data.rotator.type == "request") {
                    if (parseInt(this.data.rotator.request) <= parseInt(this.data.tabs_opened)) {
                        this.data.tabs_opened = 1;
                        this.autoChange()
                    }
                }
            }
        } catch (e) {
        }
    }

    resizedataURL = (datas, wantedWidth, wantedHeight, type) => new Promise(function (resolve, reject) {
        let img = document.createElement('img');
        img.onload = function () {
            let canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

            resolve({type: type, data: canvas.toDataURL('image/png', 1)});
            img = null;
            canvas = null;
        };
        img.src = datas;
    });


    async onInstall() {
        const collections = await fetch('/libs/collections.json').then(response => response.json());
        chrome.tabs.create({url: `https://custom-cursor.com/successful-installation?utm_source=ext&utm_medium=install&utm_campaign=install_succesful`});
        this.data = {
            domain: 'https://custom-cursor.com/',
            collection: collections,
            size: 2,
            maxSize: 8,
            myCollection: {},
            version: chrome.runtime.getManifest().version,
            favorites: [],
            di: (new Date()).getTime(),
            uid: this.getUserUid(),
            rotator: {status: false, type: 'request', time: 30, request: 10}
        };
        chrome.storage.local.set(this.data);

        chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    if (tab.url.indexOf('http') != -1) {
                        try {
                            chrome.tabs.executeScript(tab.id, {file: "libs/cursor.js"}, (result) => {
                                chrome.runtime.lastError;
                            });
                        } catch (e) {
                        }
                    }
                }
            }
        );
    }

    initListeners() {
        chrome.runtime.onInstalled.addListener((details) => {
            if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
                this.onInstall().then(r => false)
            } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

            }
        });
        chrome.runtime.setUninstallURL("https://custom-cursor.com/uninstall?utm_source=ext&utm_medium=uninstall&utm_campaign=uninstall");


        chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case "getInstalled": {
                    sendResponse({
                        collections: this.data.collection,
                        ver: this.data.version,
                        uid: this.data.uid,
                        action: 'get_installed_collection'
                    });
                    break;
                }
                case "install_collection": {
                    const {collection} = this.data,
                        {slug} = request;

                    if (Object.prototype.hasOwnProperty.call(collection, slug)) {
                        collection[slug] = request.collection;
                    } else {
                        collection[slug] = request.collection;
                    }
                    this.data.collection = collection;
                    chrome.storage.local.set({collection: this.data.collection});

                    sendResponse({
                        status: true,
                        version: this.data.version,
                        uid: this.data.uid,
                        action: 'install_collection'
                    });
                    break;
                }
                case "get_config":
                    sendResponse(this.data);
                    break;
                case "set_config": {
                    const {data} = request;
                    if (data.selected) {
                        this.stopRotator();
                        this.changeCursor(data.selected);
                        break;
                    } else {
                        if (data.myCollection) {
                            this.data.myCollection = data.myCollection;
                        }
                        chrome.storage.local.set(data);
                        sendResponse({status: true});
                        break;
                    }
                }
                case "set_config_sync": {
                    const {data} = request;
                    chrome.storage.sync.set(data);
                    sendResponse({status: true});
                    break;
                }
                case "get_config_sync": {
                    sendResponse(this.config_sync);
                    break;
                }
            }
        });

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            const {action, data, item} = request;
            if (action == 'rotator') {
                if (data.status == true) {
                    if (data.type == 'time') {
                        if (this.intErval != null) {
                            clearInterval(this.intErval);
                            this.intErval = null;
                        }
                        this.intErval = setInterval(this.runRotator, data.time * 1000);
                    }
                    if (data.type == 'request') {
                        if (this.intErval != null) {
                            clearInterval(this.intErval);
                            this.intErval = null;
                        }
                    }
                }
                if (data.status === false) {
                    if (this.intErval != null) {
                        clearInterval(this.intErval);
                        this.intErval = null;
                    }
                }
            }
            if (action == 'changeCursor') {
                this.changeCursor(item);
            }
            if (action === 'getOffset') {
                return sendResponse(getOffset(data.offset, data.currentWidth, data.originalWidth));
            }
            sendResponse({status: true});
        });
    }
    runRotator() {
        this.cT++;
        this.autoChange();
    }
    stopRotator() {
        this.data.rotator.status = false;
        clearInterval(this.intErval);
        chrome.storage.local.set({rotator: this.data.rotator});
    }

    getUserUid() {
        let buf = new Uint32Array(4),
            idx = -1;
        window.crypto.getRandomValues(buf);
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            idx++;
            let r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    changeCursor(data) {
        if (!data)
            return;
        data.type = 'system';

        let {cursor, pointer} = data;
        let size = this.data.size,
            ImageCursor = {}, ImagePointer = {};

        if (Object.prototype.hasOwnProperty.call(data, 'cursor') && Object.prototype.hasOwnProperty.call(data.cursor, 'original')) {
            data.cursor.path = data.cursor.original;
            delete data.cursor.original;
        }
        if (Object.prototype.hasOwnProperty.call(data, 'pointer') && Object.prototype.hasOwnProperty.call(data.pointer, 'original')) {
            data.pointer.path = data.pointer.original;
            delete data.pointer.original;
        }


        if (pointer && Object.prototype.hasOwnProperty.call(pointer, 'path')) {
            if (!Object.prototype.hasOwnProperty.call(pointer, 'original'))
                pointer.original = pointer.path;

            pointer.offsetSizeX = getOffset(pointer.offsetX, SIZELIST[size].width, pointer.width ? pointer.width : 128);
            pointer.offsetSizeY = getOffset(pointer.offsetY, SIZELIST[size].height, pointer.height ? pointer.height : 128);

            ImagePointer = this.resizedataURL(pointer.original, SIZELIST[size].width, SIZELIST[size].height, 'pointer');
        }


        if (cursor && Object.prototype.hasOwnProperty.call(cursor, 'path')) {
            if (!Object.prototype.hasOwnProperty.call(cursor, 'original')) {
                cursor.original = cursor.path;
            }
            cursor.offsetSizeX = getOffset(cursor.offsetX, SIZELIST[size].width, cursor.width ? cursor.width : 128);
            cursor.offsetSizeY = getOffset(cursor.offsetY, SIZELIST[size].height, cursor.height ? cursor.height : 128);
            ImageCursor = this.resizedataURL(cursor.original, SIZELIST[size].width, SIZELIST[size].height, 'cursor');
        }

        Promise.all([ImageCursor, ImagePointer]).then((values) => {
            for (let [key, items] of Object.entries(values)) {
                if (typeof items === 'object' && Object.prototype.hasOwnProperty.call(items, 'type')) {
                    if (items.type == 'pointer') {
                        pointer.path = items.data
                    }
                    if (items.type == 'cursor') {
                        cursor.path = items.data
                    }
                }
            }

            data.cursor = cursor;
            data.pointer = pointer;
            chrome.storage.local.set({selected: data, selected_type: 'system'});
        });
    }
    updateCursor() {}
    clearCursor() {}
    autoChange() {
        this.data.favorites.current = this.data.favorites.indexOf(this.data.selected.id);
        let nf = this.data.favorites.next(),
            xn = false, xf;
        if (nf == undefined) {
            nf = this.data.favorites[0];
        }
        for (let coll in this.data.collection) {
            const collection = this.data.collection[coll];
            xf = collection.items.find((item) => item.id === nf);
            if (xf) {
                this.changeCursor(xf);
                xn = true;
                break;
            }
        }
        if (xn == false) {
            this.autoChange();
        }
    }
}

(function () {
    new background();
})();
