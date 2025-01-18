var onSel = document.querySelector(".on");
var offSel = document.querySelector(".off");
var boxSel = document.querySelector(".box");
var pinSel = document.querySelector(".pin");
var pinnedDivSel = document.querySelector(".pinnedDiv");
var clipboardDivSel = document.querySelector(".clipboardDiv");
var notesDivSel = document.querySelector(".notesDiv");
var pinnedSel = document.querySelector(".pinned");
var clipboardSel = document.querySelector(".clipboard");
var notesSel = document.querySelector(".notes");
var checkSel = document.querySelector(".check");
var divOneSel = document.querySelector(".divOne");
var targetTextarea, selText, visible;

var getAll = browser.storage.local.get();
getAll.then(gotAll);

function gotAll(item){
 var clipboard = "";
 if(item.clipboard){
  clipboard = item.clipboard;
  var html = clipboard;
  var fragmentFromString = function (strHTML){
   return document.createRange().createContextualFragment(strHTML);
  }
  var fragment = fragmentFromString(html);
  clipboardDivSel.appendChild(fragment);
 }

 var pinned = "";
 if(item.pinned){
  pinned = item.pinned;
  var html = pinned;
  var fragmentFromString = function (strHTML){
   return document.createRange().createContextualFragment(strHTML);
  }
  var fragment = fragmentFromString(html);
  pinnedDivSel.appendChild(fragment);
 }

 var notes = "";
 if(item.notes){
  notes = item.notes;
  var html = notes;
  var fragmentFromString = function (strHTML){
   return document.createRange().createContextualFragment(strHTML);
  }
  var fragment = fragmentFromString(html);
  notesDivSel.appendChild(fragment);
 }

 visible = "clipboard";
 if(item.visible){
  visible = item.visible;
 }
 if(visible == "clipboard"){
  clipboardDivSel.style.display = "block";
  pinnedDivSel.style.display = "none";
  notesDivSel.style.display = "none";
  document.querySelector(".clipboardImg").style.boxShadow = "0px 0px 0px 1px #000000";
  document.querySelector(".clipboardImg").style.transform = "translate(0px, 1px)";
 }
 if(visible == "pinned"){
  pinnedDivSel.style.display = "block";
  clipboardDivSel.style.display = "none";
  notesDivSel.style.display = "none";
  document.querySelector(".pinnedImg").style.boxShadow = "0px 0px 0px 1px #000000";
  document.querySelector(".pinnedImg").style.transform = "translate(0px, 1px)";
 }
 if(visible == "notes"){
  notesDivSel.style.display = "block";
  pinnedDivSel.style.display = "none";
  clipboardDivSel.style.display = "none";
  document.querySelector(".notesImg").style.boxShadow = "0px 0px 0px 1px #000000";
  document.querySelector(".notesImg").style.transform = "translate(0px, 1px)";
 }
 var copyText = "yes";
 if(item.copyText){
  copyText = item.copyText;
 }
 if(copyText == "yes"){
  onSel.style.display = "block";
  offSel.style.display = "none";
 }
 if(copyText == "no"){
  offSel.style.display = "block";
  onSel.style.display = "none";
 }
 if(item.bColor){
  document.body.style.background = item.bColor;
 }
 removeTextarea();
}

onSel.addEventListener("click",function(e){
 browser.storage.local.set({copyText : "no"})
});

offSel.addEventListener("click",function(e){
 browser.storage.local.set({copyText : "yes"})
});

boxSel.addEventListener("click",function(e){
 var textarea = document.createElement('textarea');
 textarea.setAttribute('class', 'textarea');
 textarea.textContent = '';
 if(visible == "pinned"){
  pinnedDivSel.insertBefore(textarea, pinnedDivSel.firstChild);
 }
 if(visible == "clipboard"){
  clipboardDivSel.insertBefore(textarea, clipboardDivSel.firstChild);
 }
 if(visible == "notes"){
  notesDivSel.insertBefore(textarea, notesDivSel.firstChild);
 }
 browser.storage.local.set({pinned : pinnedDivSel.innerHTML, clipboard : clipboardDivSel.innerHTML, notes : notesDivSel.innerHTML})
});

pinSel.addEventListener("click",function(e){
 if(targetTextarea){
  targetTextarea.textContent = targetTextarea.value;
  var newTextarea = targetTextarea.cloneNode(true);
  pinnedDivSel.insertBefore(newTextarea, pinnedDivSel.firstChild);
  browser.storage.local.set({pinned : pinnedDivSel.innerHTML, clipboard : clipboardDivSel.innerHTML, notes : notesDivSel.innerHTML})
  browser.runtime.sendMessage({
   showBadge: "yes"
  });
 }
});

pinnedSel.addEventListener("click",function(e){
 browser.storage.local.set({visible : "pinned"})
});

clipboardSel.addEventListener("click",function(e){
 browser.storage.local.set({visible : "clipboard"})
});

notesSel.addEventListener("click",function(e){
 browser.storage.local.set({visible : "notes"})
});

checkSel.addEventListener("click",function(e){
 var textarea = document.createElement('textarea');
 textarea.setAttribute('class', 'textarea');
 textarea.addEventListener('paste', (e) => {
  e.preventDefault();
  e.stopPropagation();
  textarea.removeAttribute("contenteditable");
  var cText = (e.clipboardData || window.clipboardData).getData('text');
  if(cText){
   textarea.textContent = cText;
  }else{
   textarea.textContent = "Text is not on your clipboard.";
  }
  browser.storage.local.set({clipboard : clipboardDivSel.innerHTML, pinned : pinnedDivSel.innerHTML, notes : notesDivSel.innerHTML})
 });
 if(visible == "pinned"){
  pinnedDivSel.insertBefore(textarea, pinnedDivSel.firstChild);
 }
 if(visible == "clipboard"){
  clipboardDivSel.insertBefore(textarea, clipboardDivSel.firstChild);
 }
 if(visible == "notes"){
  notesDivSel.insertBefore(textarea, notesDivSel.firstChild);
 }
 textarea.contentEditable = true;
 textarea.focus();
 document.execCommand("paste");
});

function findTarget(e){
 if(e.target.className == "textarea"){
  targetTextarea = e.target;
 }
 if(targetTextarea){
  var ttoh = targetTextarea.offsetHeight;
  targetTextarea.addEventListener("input",function(e){
   divOneSel.style.background = "red";
  });
  targetTextarea.addEventListener("mouseup",function(e){
   var newttoh = targetTextarea.offsetHeight;
   if(newttoh != ttoh){
    divOneSel.style.background = "red";
   }
  });
  if(e.altKey){
   targetTextarea.parentNode.removeChild(targetTextarea);
   browser.storage.local.set({clipboard : clipboardDivSel.innerHTML, pinned : pinnedDivSel.innerHTML, notes : notesDivSel.innerHTML})
  }
  if(e.button == "1"){
   e.preventDefault();
   e.stopPropagation();
   targetTextarea.textContent = targetTextarea.value;
   browser.storage.local.set({pinned : pinnedDivSel.innerHTML, clipboard : clipboardDivSel.innerHTML, notes : notesDivSel.innerHTML})
  }
 }
}

function sendToClipboard(e){
 targetTextarea.textContent = targetTextarea.value;
 targetTextarea.select();
 document.execCommand("copy");
 var newTextarea = targetTextarea.cloneNode(true);
 if(visible == "clipboard"){
  clipboardDivSel.insertBefore(targetTextarea, clipboardDivSel.firstChild);
 }else{
  clipboardDivSel.insertBefore(newTextarea, clipboardDivSel.firstChild);
 }
 browser.storage.local.set({clipboard : clipboardDivSel.innerHTML, pinned : pinnedDivSel.innerHTML, notes : notesDivSel.innerHTML})
 browser.runtime.sendMessage({
  showBadge: "yes"
 });
}

function removeTextarea(){
 var textareaToRemove = clipboardDivSel.getElementsByClassName("textarea")[30];
 if(textareaToRemove){
  textareaToRemove.parentNode.removeChild(textareaToRemove);
  browser.storage.local.set({clipboard : clipboardDivSel.innerHTML})
  removeTextarea();
 }
}

function handleMessage(request){
 var gotRequest = request.reloadSidebar;
 if(gotRequest == "yes"){
  location.reload();
 }
}

function addTextarea(){
 setTimeout(function(){
 selText = "";
 if(window.getSelection){
  if(document.activeElement.tagName.toLowerCase () == "textarea"){
   var text = document.activeElement.value;
   selText = text.substring(document.activeElement.selectionStart, 
                            document.activeElement.selectionEnd);
  }
 }
 if(selText !== ""){
  var getClipboard = browser.storage.local.get("clipboard");
  getClipboard.then(gotClipboard);

  function gotClipboard(item){
   var clipboard = "";
   if(item.clipboard){
    clipboard = item.clipboard;
   }
   var newClipboard = "<textarea class='textarea'>" + selText + "</textarea>" + clipboard;
   browser.storage.local.set({clipboard : newClipboard, pinned : pinnedDivSel.innerHTML, notes : notesDivSel.innerHTML})
  }
  browser.runtime.sendMessage({
   showBadge: "yes"
  });
 }
 },500);
}

browser.runtime.onMessage.addListener(handleMessage);
document.addEventListener("mousedown", findTarget);
document.addEventListener("drop", findTarget);
document.addEventListener("dblclick", sendToClipboard);
document.addEventListener("copy", addTextarea);

window.addEventListener("pageshow", function(event){
 browser.runtime.connect({name: "portFromHelper"});
});
