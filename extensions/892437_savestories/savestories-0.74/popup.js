window.onload = function() {
  console.log('[storysaver]:','popup is loaded!');
  let noStorage=true;
  if(chrome.storage){
    if (chrome.storage.local) {
      noStorage=false;
      function onGot(item){
        if(item.customSizeStyleText){
          document.getElementById('customSizeStyle').textContent=item.customSizeStyleText;
        }
        if(item.customDelayText){
          document.getElementById('customDelayStyle').textContent=item.customDelayText;
        }
      };
      var getting=browser.storage.local.get(['customSizeStyleText', 'customDelayText']);
      getting.then(onGot, null);
    }
  }
  if(noStorage){
    let myStorage = window.localStorage;
    if(myStorage.customSizeStyleText){
      document.getElementById('customSizeStyle').textContent=myStorage.customSizeStyleText;
    }
    if(myStorage.customDelayText){
      document.getElementById('customDelayStyle').textContent=myStorage.customDelayText;
    }
  }
  //
  chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
    chrome.runtime.sendMessage({from:'popup savestories',tabId:tabArray[0].id});
});
};

function downloadPopup(text){
  var downloadArray=text.split(',');
  for(var i in downloadArray){
    chrome.downloads.download({url: downloadArray[i]});
  }
}
function onPopupClick(e){
  var target=e.target;

  if(!target){
    return -1;
  }

  while ((!target.id)&&(target!=document.body)) {
    if(target.className=='settings'){
      openSettings();
      return 0;
    }
    target=target.parentElement;
  }
  downloadPopup(target.id);
  return 0;
}
document.onclick = onPopupClick;
function openSettings() {
  chrome.runtime.openOptionsPage();
}
