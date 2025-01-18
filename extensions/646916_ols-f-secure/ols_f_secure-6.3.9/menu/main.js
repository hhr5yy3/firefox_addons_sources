/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */

class Menu {
    #customization;
    #panels;
    #platform;
    #settings;
    #info;


    constructor(customization, platform, settings, info) {
        this.#customization = customization;
        this.#platform = platform;
        this.#settings = settings;
        this.#info = info;
        this.#panels = new PanelView();
    }

    #getShoppingRatingSuspiciuos(trustworthiness) {
        switch (trustworthiness) {
            case 1:
                return StatusType.TrustedShopping1;
            case 2:
            case 3:
            case 4:
            case 5:
                return StatusType.TrustedShopping2;
            default:
                return StatusType.Suspicious;
        }
    }

    #getShoppingRatingSafe(trustworthiness) {
        if (trustworthiness < 1 || trustworthiness > 5) {
            return StatusType.Safe;
        }
        return StatusType['TrustedShopping' + trustworthiness];
    }

    #shoppingRating(status, trustworthiness) {
        if (trustworthiness > 0) {
            if (status == StatusType.Safe || status == StatusType.NotAvailable || status == StatusType.Unknown) {
                return this.#getShoppingRatingSafe(trustworthiness);
            }
            if (status == StatusType.Suspicious) {
                return this.#getShoppingRatingSuspiciuos(trustworthiness);
            }
        }
        return status;
    }

    #getIconType() {
        if (!this.#info.categories.length) {
            return IconType.Invalid;
        }
        else if (getCategoryValue('shopping', this.#info.categories) === 100 || 
                 getCategoryValue('shopping_and_auctions', this.#info.categories) === 100) {
            return IconType.Shopping;
        }
        else if (getCategoryValue('banking', this.#info.categories) === 100) {
            return IconType.Banking;
        }
        return IconType.Globe;
    }

    #getStatus() {
        let status = StatusType.Unknown;
        if (!this.#info.url.startsWith("http://") && !this.#info.url.startsWith("https://")) {
            status = StatusType.Invalid;
        }
        else if (this.#info.block && this.#info.block.type == "banking") {
            status = StatusType.Banking;
        }
        else {
            if (this.#info.categories.length == 0) {
                status = StatusType.Unknown;
            }
            else {
                status = this.#getStatusFromCategories(this.#info.categories, this.#info.isWhitelisted, this.#info.isBlacklisted, this.#info.rating);

                // if page is blocked, keep the same status
                if (this.#info.block) {
                    status = this.#info.block.type;
                }
            }
        }
        return status;
    }

    #getStatusFromCategories(categories, isWhitelisted, isBlacklisted, trustworthiness) {
        if (isBlacklisted) {
            return StatusType.Denied;
        }
        if (isWhitelisted) {
            return StatusType.Allowed;
        }

        // this whole resolution should happen on the product side

        const safeVerdict = getCategoryValue('safe', categories);
        const illegalVerdict = getCategoryValue('illegal', categories);

        if (illegalVerdict === 100) {
            return StatusType.Illegal;
        }

        let status = getSafetyVerdict(safeVerdict);
        if (this.#settings.trusted_shopping) {
            status = this.#shoppingRating(status, trustworthiness);
            switch(status) {
                case StatusType.TrustedShopping1:
                    status = StatusType.TrustedShoppingUnsafe;
                    break;
                case StatusType.TrustedShopping2:
                    status = StatusType.TrustedShoppingRisky;
                    break;
                case StatusType.TrustedShopping3:
                    status = StatusType.TrustedShoppingSuspicious;
                    break;
                case StatusType.TrustedShopping4:
                    status = StatusType.TrustedShoppingCaution;
                    break;
                case StatusType.TrustedShopping5:
                    status = StatusType.Safe;
                    break;
            }
        }
        return status;
    }

    setPanels() {
        BrowserStorage.getLocal(["adBlockerExceptions", "schema"]).then(storageResult => {
            const schema = storageResult.schema === Schema.Dark ? "dark" : "light";
            this.#panels.appendHeader();
            this.#panels.appendDivider();
            const status = this.#getStatus();
            const iconType = this.#getIconType();
            this.#panels.appendStatusInfo(status, this.#info.url, iconType, schema);
    
            if (this.#settings.trusted_shopping && iconType === IconType.Shopping) {
                this.#panels.appendDivider();
                this.#panels.appendShoppingRating(status, this.#info.rating, schema);
            }

            if (this.#settings.block_ads 
                && status !== StatusType.Invalid
                && !this.#info.block) {
                this.#panels.appendDivider();
                this.#panels.appendAdBlocker(this.#info.url, this.#info.tabId, storageResult.adBlockerExceptions);
            }

            if (this.#settings.consent_manager
                && status !== StatusType.Invalid
                && !this.#info.block) {
                this.#panels.appendDivider();
                this.#panels.appendConsentStatus();
            }

            const categoryIcons = this.#panels.getCategoryIcons(this.#info.categories);
            if (categoryIcons && status !== StatusType.Invalid) {
                this.#panels.appendDivider();
                this.#panels.appendCategories(categoryIcons);
            }

            if (this.#customization.UseBrandPromise === "True") {
                this.#panels.appendDivider();
                this.#panels.appendFooter();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Send "popup" message to serviceworker when content of iframe is loaded to update the menu with rating info
    BrowserStorage.getLocal(["customization", "platform"]).then(storageResult => {
        chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
            if (request.type === MessageName.Infopopup) {
                const menu = new Menu(storageResult.customization, storageResult.platform, request.settings, request.info);
                menu.setPanels();
                sendResponse();
            }
            return true;
        });
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            chrome.runtime.sendMessage( {type: MessageName.Popup, tab: tabs[0]});
        });
    });
})
