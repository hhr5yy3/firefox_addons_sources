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
(() => {
    function findImageLink(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(element instanceof HTMLElement)) {
                return;
            }
            const MESSAGE_ID = 'ig-img-link';
            if (element.previousSibling instanceof HTMLElement && element.previousSibling.firstChild instanceof HTMLImageElement) {
                yield browser.runtime.sendMessage({ type: MESSAGE_ID, payload: element.previousSibling.firstChild.src });
                return;
            }
            if (element.nextSibling instanceof HTMLElement && element.nextSibling.firstChild instanceof HTMLImageElement) {
                yield browser.runtime.sendMessage({ type: MESSAGE_ID, payload: element.nextSibling.firstChild.src });
            }
        });
    }
    function targetElementMessageListener(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.type === 'ig-img-element' && typeof message.payload === 'number') {
                yield findImageLink(browser.menus.getTargetElement(message.payload));
            }
        });
    }
    browser.runtime.onMessage.addListener(targetElementMessageListener);
})();
