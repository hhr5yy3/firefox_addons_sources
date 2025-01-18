function InjectScriptIntoElement(srcName) {
  var returnable = null

  var s = document.createElement('script');

  s.type = 'text/javascript';

  console.log(srcName)
  if (srcName) {
    s.src = chrome.runtime.getURL(srcName);
  }

  document.head.appendChild(s);
}


document.onload = setTimeout(function () {
  InjectScriptIntoElement("unfriend.js") //load framework
}, 1000);