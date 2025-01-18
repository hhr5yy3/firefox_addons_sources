// Opera 8.0+
var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined'
// Safari 3.0+
var isSafari = window.safari && (window.safari.pushNotification || window.safari.extension)
// Internet Explorer 6-11
var isIE = /* @cc_on!@ */ false || !!document.documentMode
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia
// Chrome 1+
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.extension)
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS

if (isFirefox || isEdge || isChrome || isOpera || isBlink) {
  browser && browser.runtime && browser.runtime.onMessage.addListener(
    function (request, sender) {
      console.log(request)
      for (var i in request) {
        localStorage.setItem(i, request[i])
      }
    }
  )
  chrome && chrome.runtime && chrome.runtime.onMessage.addListener(
    function (request, sender) {
      console.log(request)
      for (var i in request) {
        localStorage.setItem(i, request[i])
      }
    }
  )
} else if (isSafari) {
  window.safari.application.addEventListener('message', (event) => {
    if (event.name === 'padlet') {
      let hash = JSON.parse(event.message)
      for (var i in hash) {
        localStorage.setItem(i, hash[i])
      }
    }
  }, false)
}

let desktopMediaRequestId = ''

if (isBlink) {
  chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(msg => {
      if (msg.type === 'SS_UI_REQUEST') {
        console.log("got ['SS_UI_REQUEST'], start requestScreenSharing")
        requestScreenSharing(port, msg)
      }
      if (msg.type === 'SS_UI_CANCEL') {
        cancelScreenSharing(msg)
      }
    })
  })
}

function requestScreenSharing (port, msg) {
  // https://developer.chrome.com/extensions/desktopCapture
  // params:
  //  - 'data_sources' Set of sources that should be shown to the user.
  //  - 'targetTab' Tab for which the stream is created.
  //  - 'streamId' String that can be passed to getUserMedia() API
  // Also available:
  //  ['screen', 'window', 'tab', 'audio']
  const sources = ['screen', 'window', 'tab', 'audio']
  const tab = port.sender.tab

  desktopMediaRequestId = chrome.desktopCapture.chooseDesktopMedia(
    sources,
    port.sender.tab,
    streamId => {
      console.log('got stream Id ', streamId, ' post message back to contentscript')
      if (streamId) {
        msg.type = 'SS_DIALOG_SUCCESS'
        msg.streamId = streamId
      } else {
        msg.type = 'SS_DIALOG_CANCEL'
      }
      port.postMessage(msg)
    }
  )
}

function cancelScreenSharing (msg) {
  if (desktopMediaRequestId) {
    chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId)
  }
}

function flatten (arr) {
  return [].concat.apply([], arr)
}

if (isBlink) {
  // This avoids a reload after an installation
  chrome.windows.getAll({
    populate: true
  }, windows => {
    const details = {
      file: 'content-scripts/index.js',
      allFrames: true
    }

    flatten(windows.map(w => w.tabs)).forEach(tab => {
      // Skip chrome:// pages
      if (tab.url.match(/(chrome):\/\//gi)) {
        return
      }

      // https://developer.chrome.com/extensions/tabs#method-executeScript
      // Unfortunately I don't know how to skip non authorized pages, and
      // executeScript doesn't have an error callback.
      chrome.tabs.executeScript(tab.id, details, () => {
        const {
          runtime: {
            lastError
          }
        } = browser

        if (
          lastError &&
          !lastError.message.match(/cannot access contents of url/i)
        ) {
          console.error(lastError)
        }

        console.log('After injection in tab: ', tab)
      })
    })
  })
}
