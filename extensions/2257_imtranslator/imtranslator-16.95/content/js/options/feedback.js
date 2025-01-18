var SL_DARK="invert(95%)";
(function(){GEBI("SL_LOC").addEventListener("change",function(){SL_SAVE_LOC();},!1);} )();
(function(){GEBI("SL_THEME").addEventListener("change",function(){SL_SAVE_THEME();},!1);} )();
window.addEventListener("load",function(){ 
 ACTIVATE_MENU_ELEMENT(7);
 GEBI("SL_LOC").value=FExtension.GET_localStorage("SL_LOCALIZATION");
 CONSTRUCTOR();
},!1);
(function(){GEBI("SL_info").addEventListener("click",function(){FExtension.browserPopup.openNewTab('https://about.imtranslator.net/tutorials/presentations/imtranslator-translator-for-firefox/');},!1);} )();
function GEBI(id){ return document.getElementById(id);}


function CONSTRUCTOR(){
 var v = FExtension.bg.ImTranslatorBG.Version();
 var ln = FExtension.GET_localStorage("SL_LOCALIZATION");
 if(ln == "sk" || ln == "bg" || ln == "tl" || ln=="vi" || ln=="sr") ln="en";
 GEBI('SL_mailer').src = GEBI('SL_mailer').src + ln;
 GEBI('SL_mailer').src = GEBI('SL_mailer').src.replace("v=","v="+ v);
 GEBI('SL_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extFeedback')));
 GEBI('SL_FBK1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extFBK1')));
 GEBI('SL_FBK2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extFBK2')));
 GEBI('SL_il').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLOC')));
 GEBI('SL_theme_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTHEME')));
 GEBI('SL_theme_1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLIGHT')));
 GEBI('SL_theme_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDARK')));
 GEBI('SL_translate_container').style.opacity="1";
 var SL_THEMEmode = FExtension.GET_localStorage("THEMEmode");
 if(SL_THEMEmode==0)  GEBI("SL_THEME").value = 0;
 else GEBI("SL_THEME").value = 1;
 ACTIVATE_THEME(FExtension.GET_localStorage("THEMEmode"));
}

function ACTIVATE_MENU_ELEMENT(st){
  var win = top.frames['menu'];
  var li = win.document.getElementsByTagName("li");
  for(var i=1; i<=li.length; i++){
        if(st==i) win.document.getElementById('SL_options_menu'+i).className='SL_options-menu-on';
        else win.document.getElementById('SL_options_menu'+i).className='SL_options-menu-off';
  }
}

function SL_SAVE_LOC(){
  FExtension.store.set("SL_LOCALIZATION", GEBI("SL_LOC").value);
  chrome.storage.local.set({"SL_LOCALIZATION": GEBI("SL_LOC").value});
  CONSTRUCTOR();
  FExtension.store.save_LOC4CONTEXT();
  new Date().getTime();
  FExtension.store.set("SL_TS_LOC", Date.now());
  chrome.storage.local.set({"SL_TS_LOC": Date.now()});
  parent.frames["menu"].location.reload();
  FExtension.bg.ImTranslatorBG.SL_callbackRequest4LOC();
  location.reload();
}
function SL_SAVE_THEME(){
  FExtension.store.set("THEMEmode", GEBI("SL_THEME").value);
  new Date().getTime();
  FExtension.store.set("SL_TS_LOC", Date.now());
  location.reload();
}

function ACTIVATE_THEME(st){
 	if(st==1){
		var clr="#BF7D44";
		GEBI("SL_translate_container").style.filter=SL_DARK;
		GEBI("SL_mailer").style.filter=SL_DARK;
		GEBI("SL_mailer").style.background="#fff";
		var A = document.getElementsByTagName("a");
		for(var i=0; i<A.length; i++) A[i].style.color=clr;  
	}
}
