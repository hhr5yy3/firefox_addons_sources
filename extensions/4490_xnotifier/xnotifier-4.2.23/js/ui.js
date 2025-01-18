function getMain(){
  return chrome.extension.getBackgroundPage().main;
}
function onClick(ind,event){
  window_close();
  if(event){
    if(event.button==0&&event.shiftKey||event.button==1){
      getMain().onClickAccount(ind,true);
      return;
    }
  }
  getMain().onClickAccount(ind);
}
function checkNow(){
  window_close();
  getMain().checkNow();
}
function openAll(){
  window_close();
  getMain().openViews();
}
function openOptions(){
  chrome.runtime.openOptionsPage();
}
function openHelp(event){
  if(event.shiftKey){
    window_close();
    getMain().toggleDebug();
    return;
  }
  chrome.tabs.create({url: "http://xnotifier.tobwithu.com/dp/forum/3",active: true});
  window_close();
}
function window_close(){
  window.close();
}

function restart(){
  chrome.extension.getBackgroundPage().init();
  document.location.reload();
}


