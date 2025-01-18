var hdInd;
function init(ind,name){
  hdInd=ind;
  $("label").innerText+=" "+name;

  $("btn-ok").addEventListener("click",onAccept);
  $("val").focus();
}
function onAccept(){
  chrome.extension.getBackgroundPage().main.enterPassword(hdInd,$("val").value,$("save").checked);
  //window.close();
  chrome.tabs.getCurrent(function(tab){chrome.tabs.remove(tab.id);});  //Firefox only
}
function getParam(s){
  var re=/=(.+?)(&|$)/g;
  var ar=[];
  var o;
  while((o=re.exec(s))!=null){
    ar.push(decodeURIComponent(o[1]));
  }
  return ar;
}
function load(){
  $("val").addEventListener("keydown",function(event){if(event.keyCode==13)onAccept();},false);
  var p=getParam(window.location.search);
  init.apply(this,p);
}
window.addEventListener("load",load,false);
