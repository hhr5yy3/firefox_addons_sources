var s = document.createElement('script');
s.src = chrome.extension.getURL('page.js');
s.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

var port = chrome.runtime.connect({name: 'insigner-content-port'});
// Message from background page
port.onMessage.addListener(function(m) {
  window.postMessage({ 'resp': m.type, 'result': m }, '*');
});

function sendToBackground(data) {
  port.postMessage(data);
}

// Message from web pade
window.addEventListener('message', function(event) {
  // We only accept messages from ourselves
  if (event.source !== window)
    return;
  if(event.data.type) {
    if(event.data.binary) {
      //base64 encode
      var reader = new window.FileReader();
      reader.readAsDataURL(event.data.text);
      reader.onloadend = function() {
        var pos = reader.result.indexOf(',');
        event.data.text = reader.result.substr(pos + 1);
        sendToBackground(event.data);
      }
    } else {
      sendToBackground(event.data);
    }
  }
}, false);

// Implementation of window.crypto.signText() function
if(typeof exportFunction !== 'undefined') {
  const TEXT_PLAIN = 'text/plain';
  const SCHEME_DETACHED = 'detached';
  const MESSAGE_TYPE_SIG_V2 = 'inotary-sign-request';
  const ERROR_INTERNAL = "error:internalError";

  function callBackgroundPage(data, resolve) {
    browser.runtime.sendMessage(data).then(
      resp => { resolve(resp); }
    );
  }

  function signText(text) {
    let result = null;
    var data = {'type': MESSAGE_TYPE_SIG_V2, 'id': 'signText',
               'text': text, 'contentType': TEXT_PLAIN,
               'scheme': SCHEME_DETACHED, 'binary': false,
               'encoding': document.characterSet,
               'origin': '', 'license': ''};
    callBackgroundPage(data, rv => {result = rv;});
    if (!result)
      alert(browser.i18n.getMessage('signTextAlert'));
    if(!result)
      result = ERROR_INTERNAL;
    return result;
  }

  exportFunction(signText, window.crypto, {defineAs: "signText"});
}
