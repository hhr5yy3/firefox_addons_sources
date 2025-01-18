'use strict';
var SL_DARK="invert(95%)";
function GEBI(id){ return document.getElementById(id);}
(function(){GEBI("SL_info").addEventListener("click",function(){FExtension.browserPopup.openNewTab(this.href);},!1);} )();
(function(){GEBI("SL_LOC").addEventListener("change",function(){SL_SAVE_LOC();},!1);} )();
(function(){GEBI("SL_THEME").addEventListener("change",function(){SL_SAVE_THEME();},!1);} )();
(function(){INIT();})();


function INIT(){
  ACTIVATE_MENU_ELEMENT(8);
  GEBI("SL_LOC").value=FExtension.GET_localStorage("SL_LOCALIZATION");
  CONSTRUCTOR();
  var SL_THEMEmode = FExtension.GET_localStorage("THEMEmode");
  if(SL_THEMEmode==0)  GEBI("SL_THEME").value = 0;
  else GEBI("SL_THEME").value = 1;
  CONTRIBUTIN();



	for(var i=0; i<PACK_PARAMS.length; i++){
    		var tmp = PACK_PARAMS[i].split(";");
	        var key = String(tmp[0]);
	        aaa(key);
	}
}

function aaa(key){
		chrome.storage.local.get(key,function(result){
		 console.log(key + "->" + result[key]);
		});

}

function CONTRIBUTIN(){
  GEBI("d0").href="https://imtranslator.net"+_CGI+"&a=0";
  GEBI("d1").href="https://imtranslator.net"+_CGI+"&a=5";
  GEBI("d2").href="https://imtranslator.net"+_CGI+"&a=10";
  GEBI("d3").href="https://imtranslator.net"+_CGI+"&a=20";
  GEBI("d4").href="https://imtranslator.net"+_CGI+"&a=0";
}


function ACTIVATE_MENU_ELEMENT(st){
  var win = top.frames['menu'];
  var li = win.document.getElementsByTagName("li");
  for(var i=1; i<=li.length; i++){
        if(st==i) win.document.getElementById('SL_options_menu'+i).className='SL_options-menu-on';
        else win.document.getElementById('SL_options_menu'+i).className='SL_options-menu-off';
  }
}


function CONSTRUCTOR(){  
 GEBI('SL_menu_h3').innerText="v."+FExtension.bg.ImTranslatorBG.Version();  
 GEBI('SL_descr').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extAboutDescr')));  
 GEBI('SL_contrib').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extContrib')));  
 GEBI('SL_il').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLOC')));
 var Ab = "© ImTranslator";
 if(FExtension.GET_localStorage("SL_LOCALIZATION")=="en") Ab = "About";
 GEBI('SL_ttl').appendChild(document.createTextNode(Ab));
 GEBI('SL_theme_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTHEME')));
 GEBI('SL_theme_1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLIGHT')));
 GEBI('SL_theme_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDARK')));
 GEBI('SL_translate_container').style.opacity="1";
	switch(PLATFORM){
	 case "Chrome": GEBI('SL_info').href="https://about.imtranslator.net/tutorials/presentations/imtranslator-translator-for-firefox/"; break;
	}
 ACTIVATE_THEME(FExtension.GET_localStorage("THEMEmode"));
}

function SL_SAVE_LOC(){
  FExtension.store.set("SL_LOCALIZATION", GEBI("SL_LOC").value);
  chrome.storage.local.set({'SL_LOCALIZATION': GEBI("SL_LOC").value});
  CONSTRUCTOR();
  FExtension.store.save_LOC4CONTEXT();
  new Date().getTime();
  FExtension.store.set("SL_TS_LOC", Date.now());
  chrome.storage.local.set({'SL_TS_LOC': Date.now()});
  FExtension.bg.ImTranslatorBG.SL_callbackRequest4LOC();
  parent.frames["menu"].location.reload();
  location.reload();
}

function SL_SAVE_THEME(){
  FExtension.store.set("THEMEmode", GEBI("SL_THEME").value);
  chrome.storage.local.set({'THEMEmode': GEBI("SL_THEME").value});
  new Date().getTime();
  FExtension.store.set("SL_TS_LOC", Date.now());
  chrome.storage.local.set({'SL_TS_LOC': Date.now()});
  location.reload();
}

function ACTIVATE_THEME(st){
 	if(st==1){
		var clr="#BF7D44";
		GEBI("SL_translate_container").style.filter=SL_DARK;
		GEBI("SL_ttl2").style.filter=SL_DARK;
		var LBLS = document.getElementsByClassName("SL_BG_op");
		for(var i=0; i<LBLS.length; i++) LBLS[i].style.color=clr;
		var A = document.getElementsByTagName("a");
		for(var i=0; i<A.length; i++) A[i].style.color=clr;
		var IMG = document.getElementsByTagName("img");
		for(var i=0; i<IMG.length; i++) IMG[i].style.filter=SL_DARK;
		GEBI("SL_menu_PP").style.filter=SL_DARK;

	}
}