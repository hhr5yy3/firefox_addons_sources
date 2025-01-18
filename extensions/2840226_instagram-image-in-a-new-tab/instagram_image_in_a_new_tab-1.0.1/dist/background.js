"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MENU_ITEM_ID = 'ig-img-new-tab';
browser.menus.create({
    id: MENU_ITEM_ID,
    title: 'Open IG image in new tab',
    contexts: ['page'],
    documentUrlPatterns: ['*://*.instagram.com/*', '*://instagram.com/*']
});
function clickedElementListener(info, tab) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (info.menuItemId !== MENU_ITEM_ID)
            return;
        if (!((_a = info.pageUrl) === null || _a === void 0 ? void 0 : _a.includes('instagram')))
            return;
        if (typeof (tab === null || tab === void 0 ? void 0 : tab.id) === 'number' && typeof info.targetElementId === 'number') {
            // Send the clicked element to the content script, as we cannot access the DOM from here
            yield browser.tabs.sendMessage(tab.id, { type: 'ig-img-element', payload: info.targetElementId });
        }
    });
}
function imageLinkMessageListener(message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.type === 'ig-img-link' && typeof message.payload === 'string') {
            yield browser.tabs.create({ url: message.payload });
        }
    });
}
browser.menus.onClicked.addListener(clickedElementListener);
browser.runtime.onMessage.addListener(imageLinkMessageListener);
