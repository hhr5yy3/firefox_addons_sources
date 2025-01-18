var WebExtension = chrome || browser,

messageEvents = {
  fetchlocalfile: async (data) => {
    'use strict';
    let fileData = await fetch(data.url),
        blobData = new Blob([new Uint8Array(await fileData.arrayBuffer())]);
    WebExtension.runtime.sendMessage(
      null,
      {
        action: 'processlocalfile',
        data: {
          fileID: data.fileID,
          file: blobData
        }
      }
    );
  }
};

WebExtension.runtime.onMessage.addListener((message, sender, sendResponse) => {
  'use strict';
  if (message === undefined || message.action  === undefined) {
    return;
  }
  (messageEvents[message.action] || (()=>{}))(message.data || {});
});
