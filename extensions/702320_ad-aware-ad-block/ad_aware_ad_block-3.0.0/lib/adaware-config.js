'use strict';

const POST_URL = "https://flow.lavasoft.com/v1/event-stat?";
const chrome = self.chrome;

let data = {
    "productId": "abe",
    "flowUrl": POST_URL, // Event flow url
    "extensionID": chrome.runtime.id,
    "externalData": {
        "PID": "",
        "CampaignID": "",
        "InstallSource": "",
        "BundleID": "",
        "OfferID": "",
        "TemplateID": ""
    }
};

const adawareConfig =  {
    data: data
};

export default adawareConfig;