// SAMPLE
this.manifest = {
    "icon": "../img/icon.ico",
    "settings": [
        //-------------------------------------- Start with Chrome
        {
            "tab": i18n.get("general-settings"),
            "group": i18n.get("start-chrome"),
            "name": "checkboxStartOnChrome",
            "type": "checkbox",
            "label": i18n.get("enabled")
        },
		{
            "tab": i18n.get("general-settings"),
            "group": i18n.get("popup-updatepage-options"),
            "name": "popupUpdatePage",
            "type": "checkbox",
            "label": i18n.get("enabled")
        },
		{
            "tab": i18n.get("general-settings"),
            "group": i18n.get("show-generic-desktop-notif-options"),
            "name": "showGenericDesktopNotif",
            "type": "checkbox",
            "label": i18n.get("enabled")
		},
        //-------------------------------------- Premium Features
        {
            "tab": i18n.get("premium-features"),
            "group": i18n.get("notes"),
            "name": "premiumFeaturesNotes",
            "type": "description",
            "text": i18n.get("notes-description")+": " + "<a href=\"indexPremium.html\">" + i18n.get("premium-features") + "</a>"
        },
		//-------------------------------- Mobile App
		//-------------------------------- Shop
		{
            "tab": "OinkAndStuff Shop",
            "group": "Shop for physical goods",
            "name": "androidLink",
            "type": "description",
            "text": "<a href=\"https://www.oinkandstuff.com/shop/\" target=\"_blank\"><img src=\"../img/oinkandstuff-shop-banner.png\" title=\"Shop\"></a>"
        },
        //-------------------------------- About
		{
            "tab": i18n.get("about"),
            "group": "Changelog",
            "name": "changelogDescription",
            "type": "description",
            "text":  chrome.runtime.getManifest().name + " v" +chrome.runtime.getManifest().version + ". What is New: <a href=\"" + chrome.i18n.getMessage("chrome_extension_link") + "#changelog\" target=\"_blank\">" + chrome.i18n.getMessage("chrome_extension_link") + "#changelog</a>"
        },
		{
            "tab": i18n.get("about"),
            "group": "Rate and Review",
            "name": "rateAndReviewDescription",
            "type": "description",
            "text": "Give us \u272C\u272C\u272C\u272C\u272C stars on the Webstore: <a href=\"https://addons.mozilla.org/addon/" + chrome.runtime.id + "\" target=\"_blank\">https://addons.mozilla.org/addon/" + chrome.runtime.id + "</a>"
        },
        {
            "tab": i18n.get("about"),
            "group": "Email",
            "name": "emailDescription",
            "type": "description",
            "text": "<a href=\"mailto:contact@oinkandstuff.com\" target=\"_blank\">contact@oinkandstuff.com</a>"
        },
        {
            "tab": i18n.get("about"),
            "group": "Website",
            "name": "websiteDescription",
            "type": "description",
            "text": "<a href=\"https://www.oinkandstuff.com\" target=\"_blank\">https://www.oinkandstuff.com</a>"
        },
        {
            "tab": i18n.get("about"),
            "group": "Privacy Policy & Terms of Service",
            "name": "changelogDescription",
            "type": "description",
            "text": "By installing this product you agree to our privacy policy & terms of service: <a href=\"https://www.oinkandstuff.com/privacy-policy/\" target=\"_blank\">https://www.oinkandstuff.com/privacy-policy/</a>"
        },
        {
            "tab": i18n.get("about"),
            "group": "Legal",
            "name": "changelogDescription",
            "type": "description",
            "text": "Instant Games is a partnership between Oinkanstuff and Gamezop. All the content/games are responsability of Gamezop. This is an independent project developed by Oinkanstuff and has no relationship to Gamezop."
        },
        {
            "tab": i18n.get("about"),
            "group": "Required Permissions",
            "name": "changelogDescription",
            "type": "description",
            "text": "You may consult the list of permissions and the reason why they are required on the product page: <a href=\"" + chrome.i18n.getMessage("chrome_extension_link") + "#permissions\" target=\"_blank\">" + chrome.i18n.getMessage("chrome_extension_link") + "#permissions</a>"
        }
    ]
};
