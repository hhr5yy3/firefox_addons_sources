if (WebExtension === undefined) {
  var WebExtension = chrome || browser;
}

let image_converter = ImageConverter(),
    storage = ExtensionStorage(default_data_model, datamodel_upgrades),
    platformInfo,
    browserInfo;

storage.addValidationFilter(imageValidationFilter);
storage.addValidationFilter(layoutValidationFilter);
storage.addValidationFilter(defaultsValidationFilter);
storage.addValidationFilter(genericValidationFilter);
storage.addValidationFilter(downloadPathValidationFilter);

let get_options = () => {
  'use strict';
  WebExtension.runtime.sendMessage({action: 'current_options', data: {options: storage.options()}});
},
awaitStorageInitialization = async() =>{
  await storage.init();
  WebExtension.runtime.sendMessage({action: 'storageInitiated'});
},
reset_options = () => {
  'use strict';
  storage.reset();
},
update_options = (data) => {
  'use strict';
  storage.update(data.options);
},
get_OSInfo = () => {
  'use strict';
  WebExtension.runtime.sendMessage({action: 'OSInfo', data: {DirectorySeperator: DirectorySeperator, os: platformInfo.os, browser: browserInfo}});
},
messageEvents = {
  awaitStorageInitialization: awaitStorageInitialization,
  get_options: get_options,
  reset_options: reset_options,
  update_options: update_options,
  get_OSInfo: get_OSInfo
},
setBrowserInfo = (o) => {
  'use strict';
  browserInfo = o;
  browserInfo.majorVersion = parseInt(o.version.match(/^[0-9]+/));
},
setPlatformInfo = (o) => {
  'use strict';
  platformInfo = o;
  DirectorySeperator = platformInfo.os === 'win' ? '\\' : '/';
};


WebExtension.runtime.onMessage.addListener((message, sender, sendResponse) => {
  'use strict';
  if (message === undefined || message.action  === undefined) {
    return;
  }
  (messageEvents[message.action] || (() => {}))(message.data || {});
});

(async() => {
  'use strict';
  if (isGecko) {
    setPlatformInfo(await browser.runtime.getPlatformInfo());
    setBrowserInfo(await browser.runtime.getBrowserInfo());
    image_converter.setBrowserVersion(browserInfo.majorVersion);
  } else {
    chrome.runtime.getPlatformInfo(setPlatformInfo);
  }
  storage.init();
})();

createContextMenuEntry = () => {
  WebExtension.contextMenus.create({
    id: 'image_converter_webp_etc',
    title: 'Convert and save image as',
    contexts: ['image']
  });
}

if (WebExtension.runtime.getManifest().manifest_version === 2) {
  createContextMenuEntry()
} else {
  WebExtension.runtime.onInstalled.addListener(createContextMenuEntry);
}

WebExtension.contextMenus.onClicked.addListener(async (info, tab) => {
  let imageURL = new URL(info.srcUrl),
  pagehost = imageURL.protocol === "file:" ? 'local' : new URL(tab.url || info.srcUrl).host,
  imagehost = imageURL.protocol === "file:" ? 'local' : new URL(info.srcUrl).host;

  if (info.menuItemId == 'image_converter_webp_etc' && info.srcUrl) {
    await storage.init();
    image_converter.downloadImage(info.srcUrl, {
      pagehost: pagehost,
      imagehost: imagehost === '' ? pagehost : imagehost,
      shift: isGecko && info.modifiers.includes('Shift'),
      ctrl:  isGecko && (info.modifiers.includes('Ctrl') || info.modifiers.includes('Command')),
      incognito: tab.incognito,
      tabid: tab.id
    });
  }
});
