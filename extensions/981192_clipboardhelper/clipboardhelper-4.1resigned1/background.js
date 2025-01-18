var open = false;
var portFromHelper;

function connected(p){
 portFromHelper = p;
 open = true;
 portFromHelper.onDisconnect.addListener(() => {
  open = false;
 });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function(){
 if(open == true){
  browser.sidebarAction.close();
 }
 if(open == false){
  browser.sidebarAction.open();
 }
});

function update(){
 browser.sidebarAction.isOpen({}).then(result => {
  if(result == true){
   browser.runtime.sendMessage({
    reloadSidebar: "yes"
   });
  }else{
   var getClipboard = browser.storage.local.get("clipboard");
   getClipboard.then(gotClipboard);

   function gotClipboard(item){
    var clipboard = "";
    if(item.clipboard){
     clipboard = item.clipboard;
     var html = clipboard;
     var fragmentFromString = function (strHTML){
      return document.createRange().createContextualFragment(strHTML);
     }
     var fragment = fragmentFromString(html);
     var div = document.createElement('div');
     div.appendChild(fragment);
     var textareaToRemove = div.getElementsByClassName("textarea")[30];
     if(textareaToRemove){
     textareaToRemove.parentNode.removeChild(textareaToRemove);
     browser.storage.local.set({clipboard : div.innerHTML})
     }
    }
   }
  }
 });
}

browser.storage.onChanged.addListener(update);

browser.menus.create({
 id: "info",
 title: "Info",
 contexts: ["browser_action"],
 icons: {
  "32": "icons/cbh-32.png",
  "48": "icons/cbh-48.png"
 }
});

browser.menus.create({
 id: "helperCopyPageUrl",
 title: "Helper copy/save page url",
 contexts: ["page"],
 icons: {
  "32": "icons/cbh-32.png",
  "48": "icons/cbh-48.png"
 }
});

browser.menus.create({
 id: "helperCopyText",
 title: "Helper copy/save text",
 contexts: ["selection"],
 icons: {
  "32": "icons/cbh-32.png",
  "48": "icons/cbh-48.png"
 }
});

browser.menus.create({
 id: "helperCopyLinkUrl",
 title: "Helper copy/save link url",
 contexts: ["link"],
 icons: {
  "32": "icons/cbh-32.png",
  "48": "icons/cbh-48.png"
 }
});

browser.menus.create({
 id: "helperCopyImageUrl",
 title: "Helper copy/save image url",
 contexts: ["image"],
 icons: {
  "32": "icons/cbh-32.png",
  "48": "icons/cbh-48.png"
 }
});

browser.menus.onClicked.addListener(function(info, tab){
 if(info.menuItemId == "info"){
  browser.tabs.create({url: "info.html"});
 }
 if(info.menuItemId == "helperCopyText"){
  var selText = info.selectionText;
  function oncopy(e){
   document.removeEventListener("copy", oncopy, false);
   e.preventDefault();
   e.stopPropagation();
   e.clipboardData.setData("text/plain", selText);
  }
  document.addEventListener("copy", oncopy, false);
  document.execCommand("copy");

  var getClipboard = browser.storage.local.get("clipboard");
  getClipboard.then(gotClipboard);

  function gotClipboard(item){
   var clipboard = "";
   if(item.clipboard){
    clipboard = item.clipboard;
   }

   var textarea = document.createElement('textarea');
   textarea.setAttribute("class", "textarea");
   textarea.textContent = selText;
   var newClipboard = textarea.outerHTML + clipboard;
   browser.storage.local.set({clipboard : newClipboard})
   soundAndBadge();
  }
 }
 if(info.menuItemId == "helperCopyPageUrl"){
  var pageUrl = info.pageUrl;
  function oncopy(e){
   document.removeEventListener("copy", oncopy, false);
   e.preventDefault();
   e.stopPropagation();
   e.clipboardData.setData("text/plain", pageUrl);
  }
  document.addEventListener("copy", oncopy, false);
  document.execCommand("copy");

  var getClipboard = browser.storage.local.get("clipboard");
  getClipboard.then(gotClipboard);

  function gotClipboard(item){
   var clipboard = "";
   if(item.clipboard){
    clipboard = item.clipboard;
   }

   var textarea = document.createElement('textarea');
   textarea.setAttribute("class", "textarea");
   textarea.textContent = pageUrl;
   var newClipboard = textarea.outerHTML + clipboard;
   browser.storage.local.set({clipboard : newClipboard})
   soundAndBadge();
  }
 }
 if(info.menuItemId == "helperCopyLinkUrl"){
  var linkUrl = info.linkUrl;
  function oncopy(e){
   document.removeEventListener("copy", oncopy, false);
   e.preventDefault();
   e.stopPropagation();
   e.clipboardData.setData("text/plain", linkUrl);
  }
  document.addEventListener("copy", oncopy, false);
  document.execCommand("copy");

  var getClipboard = browser.storage.local.get("clipboard");
  getClipboard.then(gotClipboard);

  function gotClipboard(item){
   var clipboard = "";
   if(item.clipboard){
    clipboard = item.clipboard;
   }

   var textarea = document.createElement('textarea');
   textarea.setAttribute("class", "textarea");
   textarea.textContent = linkUrl;
   var newClipboard = textarea.outerHTML + clipboard;
   browser.storage.local.set({clipboard : newClipboard})
   soundAndBadge();
  }
 }
 if(info.menuItemId == "helperCopyImageUrl"){
  var srcUrl = info.srcUrl;
  function oncopy(e){
   document.removeEventListener("copy", oncopy, false);
   e.preventDefault();
   e.stopPropagation();
   e.clipboardData.setData("text/plain", srcUrl);
  }
  document.addEventListener("copy", oncopy, false);
  document.execCommand("copy");

  var getClipboard = browser.storage.local.get("clipboard");
  getClipboard.then(gotClipboard);

  function gotClipboard(item){
   var clipboard = "";
   if(item.clipboard){
    clipboard = item.clipboard;
   }

   var textarea = document.createElement('textarea');
   textarea.setAttribute("class", "textarea");
   textarea.textContent = srcUrl;
   var newClipboard = textarea.outerHTML + clipboard;
   browser.storage.local.set({clipboard : newClipboard})
   soundAndBadge();
  }
 }
});

function handleMessage(request){
 var gotRequest = request.showBadge;
 if(gotRequest == "yes"){
  soundAndBadge();
 }
}

browser.runtime.onMessage.addListener(handleMessage);

function soundAndBadge(){
 var getPS = browser.storage.local.get("playSound");
 getPS.then(gotPS);

 function gotPS(item){
  var playSound = "";
  if(item.playSound){
   playSound = item.playSound;
  }
  if(playSound == ""){
   var copySound = new Audio('copySound.mp3');
   copySound.play();
  }
 }
  browser.browserAction.setBadgeText({text: "✔"});
  setTimeout(function(){
   browser.browserAction.setBadgeText({text: ""});
  },1000);
}

browser.runtime.onInstalled.addListener(function(details){
 if(details.reason == "install"){
  browser.tabs.create({url: "info.html"});
 }
});

browser.windows.onFocusChanged.addListener(() => {
 function sidebarState(){
  browser.sidebarAction.isOpen({}).then(result => {
   if(result == true){
    open = true;
   }else{
    open = false;
   }
  });
 }
 var getting = browser.windows.getCurrent({});
 getting.then(sidebarState);
});
