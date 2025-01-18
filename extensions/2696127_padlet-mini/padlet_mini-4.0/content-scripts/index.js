/*
// @name Loading Padlet detect
// @include http://*.padlet.com/*
// @include https://*.padlet.com/*
// @include http://padlet.com/*
// @include https://padlet.com/*
// @include http://*.padlet.org/*
// @include https://*.padlet.org/*
// @include http://*.padlet.dev/*
// @include http://padlet.dev/*
// @include http://*.padletorg.dev/*
 */
(function () {
  var domain, csrfElements, el, orgDomain
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

  domain = '.' + window.location.host

  csrfElements = document.getElementsByName('csrf-token')
  if ((el = csrfElements[0]) != null) {
    if ((el.tagName != null) && el.tagName.toLowerCase() === 'meta') {
      orgDomain = window.location.host
      if (orgDomain.indexOf('padlet.org') === -1) {
        orgDomain = 'padlet.com'
      }
      let key = 'wwCsrfToken:orgDomain=' + orgDomain
      let value = el.attributes['content'].value
      let hash = {}
      hash[key] = value
      if (isFirefox || isEdge || isChrome || isOpera) {
        browser && browser.runtime && browser.runtime.sendMessage(hash)
        chrome && chrome.runtime && chrome.runtime.sendMessage(hash)
      } else if (isSafari) {
        window.safari.self.tab.dispatchMessage('padlet', JSON.stringify(hash))
      }
    }
  }
})()

// https://chromeextensionsdocs.appspot.com/apps/content_scripts#host-page-communication
//   - 'content_script' and execution env are isolated from each other
//   - In order to communicate we use the DOM (window.postMessage)
//
// app.js            |        |content-script.js |      |background.js
// window.postMessage|------->|port.postMessage  |----->| port.onMessage
//                   | window |                  | port |
// getUserMedia      |<------ |window.postMessage|<-----| port.postMessage
//
window.screenshareScriptHasRun = false;

(function () {
  // prevent the content script from running multiple times
  if (window.screenshareScriptHasRun) {
    return
  }

  window.screenshareScriptHasRun = true

  let browser = window.browser || window.chrome
  const port = browser.runtime.connect(browser.runtime.id)
  port.onMessage.addListener(msg => {
    console.log('post directly back to window ')
    console.log(msg)
    window.postMessage(msg, '*')
  })

  window.addEventListener(
    'message',
    event => {
      // Only accept messages from ourselves
      if (event.source !== window) {
        return
      }
      // Only accept events with a data type
      if (!event.data.type) {
        return
      }

      if (['SS_UI_REQUEST', 'SS_UI_CANCEL'].includes(event.data.type)) {
        console.log("post ['SS_UI_REQUEST', 'SS_UI_CANCEL'] from content-script to background js")
        if (port && port.postMessage) {
          port.postMessage(event.data)
        } else {
          window.postMessage(event.data)
        }
      }
    },
    false
  )

  window.postMessage({
    type: 'SS_PING',
    text: 'start'
  }, '*')
})()
