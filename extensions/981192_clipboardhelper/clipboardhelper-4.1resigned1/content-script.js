function addTextarea(){
 var getCopyText = browser.storage.local.get("copyText");
 getCopyText.then(gotCopyText);

 function gotCopyText(item){
  var copyText = "yes";
  if(item.copyText){
   copyText = item.copyText;
  }
  if(copyText == "yes"){
   var selText = "";
   if(window.getSelection){
    if(document.activeElement && 
      (document.activeElement.tagName.toLowerCase () == "textarea" || 
       document.activeElement.tagName.toLowerCase () == "input")){
     var text = document.activeElement.value;
     selText = text.substring (document.activeElement.selectionStart, 
                               document.activeElement.selectionEnd);
    }else{
     var selRange = window.getSelection ();
     selText = selRange.toString();
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
	 var textarea = document.createElement('textarea');
     textarea.setAttribute("class", "textarea");
     textarea.textContent = selText;
     var newClipboard = textarea.outerHTML + clipboard;
     browser.storage.local.set({clipboard : newClipboard})
    }
    browser.runtime.sendMessage({
     showBadge: "yes"
    });
   }
  }
 }
}
document.addEventListener("copy", addTextarea);
