﻿'use strict';
var SL_DARK="invert(95%)";
var HEADER = 1;
var ERRORS = "";
var ERRORS_TTL = "";
var GLOBAL_INPUT = "";
var PREF = "SL";
var layers="en,zh,cs,nl,tl,fr,de,el,hi,it,ja,ko,pl,pt,ro,ru,sr,es,sv,tr,uk,vi";
var EXCEPTIONS = new Array("SL_YHIST","SL_YKEY","SL_GAPI1","SL_GAPI1_ts","SL_GAPI2","SL_GAPI2_ts","SL_History","ADV","AVOIDAUTODETECT","AVOIDAUTODETECT_LNG","FRUN","PLD_OLD_TS","PLT_OLD_TS_TR","ran_before","SL_anchor","SL_BBL_TS","SL_Dtext","SL_Flag","SL_session","SL_TS","SL_Version","SL_sort","SL_Fontsize2","SL_langSrc2","SL_langDst2","THE_URL","SL_Import_Report");
var SL_Languages = CUSTOM_LANGS(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLanguages'));
function GEBI(id){ return document.getElementById(id);}
(function(){GEBI("SL_info").addEventListener("click",function(){FExtension.browserPopup.openNewTab(this.href);},!1);} )();
(function(){GEBI("SL_LOC").addEventListener("change",function(){SL_SAVE_LOC();},!1);} )();
(function(){GEBI("SL_LNG_STATUS").addEventListener("click",function(){ SL_LANGS(); },!1); } )();
(function(){GEBI("SL_THEME").addEventListener("change",function(){SL_SAVE_THEME();},!1);} )();

(function(){GEBI("SL_EXPO").addEventListener("click",function(){SL_export();},!1);} )();
(function(){GEBI("SL_IMPO").addEventListener("change",function(){SL_FileManager(event);},!1);} )();
(function(){GEBI("SL_files").addEventListener("change",function(){handleFileSelect(event);},!1);} )();
(function(){GEBI("SL_reset").addEventListener("click",function(){SL_ResetToDefault(event);},!1);} )();
(function(){GEBI("SL_ttl").addEventListener("click",function(){SL_REPORT(event);},!1);} )();

//AUTOSAVE BLOCK
window.addEventListener('change',function(e){
	save_options();
},!1);
//AUTOSAVE BLOCK


(function(){INIT();})();


function INIT(){
  ACTIVATE_MENU_ELEMENT(10);
  GEBI("SL_LOC").value=FExtension.GET_localStorage("SL_LOCALIZATION");

  CONSTRUCTOR();

     GEBI("SL_DOM").value = FExtension.GET_localStorage("SL_DOM");

     var mySL_SLVoices = FExtension.GET_localStorage("SL_SLVoices");
     var mySL_SLVoiceSelect = GEBI("SL_SLVoiceState");
     for (var i = 0; i < mySL_SLVoiceSelect.options.length; i++) {
    	var mySL_SLVoiceOption = mySL_SLVoiceSelect.options[i];
	    if (String(mySL_SLVoiceOption.value) == String(mySL_SLVoices)) {
	      mySL_SLVoiceOption.selected = "true";
	      break;
	    }
     }
     var SL_TransButton = FExtension.GET_localStorage("SL_PrefTrans");
     GEBI("imtranslator"+SL_TransButton).checked = "true";

     for (var j = 1; j <= 8; j++){
	     var SL_CM = String(FExtension.GET_localStorage("SL_CM"+j));
	     if(SL_CM=="1") GEBI("Context"+j).checked = true;
	     else GEBI("Context"+j).checked = false;
     }
     save_options();
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
 GEBI('SL_il').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLOC')));
 GEBI('SL_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extADV')));
 GEBI('SL_BG_op').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extADVTTS')));
 GEBI('SL_ADVuse').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extADVuse')));
 GEBI('SL_SLVoice0').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extADV4lt')));
 GEBI('SL_SLVoice1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extADVN')));
 GEBI('SL_SLVoice2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extADVA')));
 GEBI('SL_L_BOX').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLangs')+":"));
 GEBI('SL_LNG_STATUS').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCustomize')));
 GEBI('SL_tb').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'exttb')));
 GEBI('SL_cm').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extcm'))); 
 GEBI('SL_chl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extOptions') + " ("+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extchl')+")"));
 GEBI('SL_cltr').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extcltr'))); 
 GEBI('SL_PDOM').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extPDOM'))); 
 GEBI('SL_UDOM').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extUDOM'))); 
 GEBI('BARO').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extOptions') + ": " + FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extBARO'))); 
 GEBI('SL_theme_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTHEME')));
 GEBI('SL_theme_1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLIGHT')));
 GEBI('SL_theme_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDARK')));
 GEBI('SL_translate_container').style.opacity="1";
 var SL_THEMEmode = FExtension.GET_localStorage("THEMEmode");
 if(SL_THEMEmode==0)  GEBI("SL_THEME").value = 0;
 else GEBI("SL_THEME").value = 1;

	switch(PLATFORM){
	 case "Chrome": GEBI('SL_info').href="https://about.imtranslator.net/tutorials/presentations/imtranslator-translator-for-firefox/advanced-options/"; break;
	}

 ACTIVATE_THEME(FExtension.GET_localStorage("THEMEmode"));
}


function save_options() {
//------TIME STAMP--------------
	new Date().getTime();
	FExtension.store.set("SL_TS", Date.now());
	chrome.storage.local.set({'SL_TS': Date.now()});
//==============================

		FExtension.store.set("SL_SLVoices", GEBI("SL_SLVoiceState").value);
		chrome.storage.local.set({'SL_SLVoices': GEBI("SL_SLVoiceState").value});		

		FExtension.store.set("SL_Flag", "FALSE");
		chrome.storage.local.set({'SL_Flag': 'FALSE'});
		
		var PT=1;

	        if(FExtension.store.get("SL_ENABLE")=="false"){
			GEBI("imtranslator3").style.visibility = "hidden";	    
			GEBI("SL_CM_bbl").style.opacity = "0.2";	      
		}
                if(GEBI("imtranslator3").checked==true){
			if(FExtension.store.get("SL_ENABLE")=="false"){
				GEBI("imtranslator1").checked=true;
			}
			PT=3;
		}

                if(GEBI("imtranslator1").checked==true) PT=1;
                if(GEBI("imtranslator2").checked==true) PT=2;
                if(GEBI("imtranslator3").checked==true) PT=3;
                if(GEBI("imtranslator4").checked==true) PT=4;
                if(GEBI("imtranslator5").checked==true) PT=5;
                if(GEBI("imtranslator6").checked==true) PT=6;
		FExtension.store.set("SL_PrefTrans", PT);
		chrome.storage.local.set({'SL_PrefTrans': PT});	

		FExtension.store.set("SL_DOM", GEBI("SL_DOM").value);
		chrome.storage.local.set({'SL_DOM': GEBI("SL_DOM").value});	
/*
	        for (var j = 1; j <= 8; j++){
		     var SL_CM = GEBI("Context"+j).checked;
		     var ID = "SL_CM"+j;
		     if(SL_CM==true){
			FExtension.store.set(ID, "1");
			chrome.storage.local.set({ID: '1'});	
		     }else{
			FExtension.store.set(ID, "0");
			chrome.storage.local.set({ID: '0'});	
		     }
	        }
*/



		     var SL_CM = GEBI("Context1").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM1", "1");
			chrome.storage.local.set({'SL_CM1': '1'});	
		     }else{
			FExtension.store.set("SL_CM1", "0");
			chrome.storage.local.set({'SL_CM1': '0'});	
		     }

		     var SL_CM = GEBI("Context2").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM2", "1");
			chrome.storage.local.set({'SL_CM2': '1'});	
		     }else{
			FExtension.store.set("SL_CM2", "0");
			chrome.storage.local.set({'SL_CM2': '0'});	
		     }

		     var SL_CM = GEBI("Context3").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM3", "1");
			chrome.storage.local.set({'SL_CM3': '1'});	
		     }else{
			FExtension.store.set("SL_CM3", "0");
			chrome.storage.local.set({'SL_CM3': '0'});	
		     }


		     var SL_CM = GEBI("Context4").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM4", "1");
			chrome.storage.local.set({'SL_CM4': '1'});	
		     }else{
			FExtension.store.set("SL_CM4", "0");
			chrome.storage.local.set({'SL_CM4': '0'});	
		     }

		     var SL_CM = GEBI("Context5").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM5", "1");
			chrome.storage.local.set({'SL_CM5': '1'});	
		     }else{
			FExtension.store.set("SL_CM5", "0");
			chrome.storage.local.set({'SL_CM5': '0'});	
		     }

		     var SL_CM = GEBI("Context6").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM6", "1");
			chrome.storage.local.set({'SL_CM6': '1'});	
		     }else{
			FExtension.store.set("SL_CM6", "0");
			chrome.storage.local.set({'SL_CM6': '0'});	
		     }

		     var SL_CM = GEBI("Context7").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM7", "1");
			chrome.storage.local.set({'SL_CM7': '1'});	
		     }else{
			FExtension.store.set("SL_CM7", "0");
			chrome.storage.local.set({'SL_CM7': '0'});	
		     }

		     var SL_CM = GEBI("Context8").checked;
		     if(SL_CM==true){
			FExtension.store.set("SL_CM8", "1");
			chrome.storage.local.set({'SL_CM8': '1'});	
		     }else{
			FExtension.store.set("SL_CM8", "0");
			chrome.storage.local.set({'SL_CM8': '0'});	
		     }
       		SL_Reset_Booxes(FExtension.store.get("SL_LNG_LIST"));

		FExtension.bg.ImTranslatorBG.SL_callbackRequest();
		FExtension.bg.ImTranslatorBG.SL_callbackRequest2();
		FExtension.bg.ImTranslatorBG.SL_callbackRequest3();
	        FExtension.bg.FExtension.browser.refreshSettings();


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
		var bg="#191919";
		var clr="#BF7D44";
		GEBI("SL_translate_container").style.filter=SL_DARK;
		GEBI("upload").style.filter=SL_DARK;
		GEBI("SL_reset").style.filter=SL_DARK;
		GEBI("SL_restore_lable").style.filter=SL_DARK;
		var LBLS = document.getElementsByClassName("SL_BG_op");
		for(var i=0; i<LBLS.length; i++) LBLS[i].style.color=clr;
		var A = document.getElementsByTagName("a");
		for(var i=0; i<A.length; i++) A[i].style.color=clr;

		setTimeout(function() {
			var SL_DOM_opt = GEBI("SL_DOM").getElementsByTagName("option");
			for(var j=0; j<SL_DOM_opt.length; j++) SL_DOM_opt[j].setAttribute("style", "background:"+bg+" !important;color:#fff;");
			var SL_SLVoiceState_opt = GEBI("SL_SLVoiceState").getElementsByTagName("option");
			for(var j=0; j<SL_SLVoiceState_opt.length; j++) SL_SLVoiceState_opt[j].setAttribute("style", "background:"+bg+" !important;color:#fff;");
		}, 1000);

		GEBI("SL_AUTOKEYS").style.filter=SL_DARK;	
	}
}


const Encr = SL => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySLToChar = code => textToChars(SL).reduce((a,b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySLToChar)
        .map(byteHex)
        .join('');
}

const Decr = SL => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySLToChar = code => textToChars(SL).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySLToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

function SortLocalStorage(){
   if(localStorage.length > 0){
      var localStorageArray = new Array();

      for (var i=0;i<localStorage.length;i++){
	var Item = localStorage.key(i);
        if(Item == "SL_Import_Report") localStorage.setItem(Item,"");
        var cnt=0;
        for (var j=0;j<EXCEPTIONS.length;j++){
		if(Item == EXCEPTIONS[j]) cnt++;		
	}
	if( cnt== 0 ){
	        var thedata = localStorage.getItem(Item);
	        if(Item == "SL_style") thedata = "#"+localStorage.getItem(String(Item));
		localStorageArray[i] = Item + "," + thedata + "\n";
	} 
      }
   }
   var sortedArray = localStorageArray.sort();
   return sortedArray;
}


function SL_export(){
 var LocSt = new Array();
 LocSt = SortLocalStorage();
 var d = new Date();
 var tmp = String(d).split(" (");
 d = tmp[0];
 var EXP_DATA = "Firefox Version: " +FExtension.GET_localStorage("SL_Version") + " - " + d + "\n";
 var tmp1 = "";
 var tmp2 = "";

 for ( var i = 0; i <= LocSt.length-EXCEPTIONS.length; i++ ) {
   var jump = 0;
    if(String(LocSt[i]) === 'undefined') jump = 1;


    //PLANSHET
    if(String(LocSt[i]).indexOf("SL_langDst,")!=-1 && String(LocSt[i]).indexOf("2")==-1){
	tmp1 = LocSt[i].split(",");
	tmp2=tmp1[0]+"2,"+tmp1[1];
    }
    if(String(LocSt[i]).indexOf("SL_langDst2")!=-1) LocSt[i] = tmp2;

    //BBL
    if(String(LocSt[i]).indexOf("SL_langDst_bbl,")!=-1 && String(LocSt[i]).indexOf("2")==-1){
	tmp1 = LocSt[i].split(",");
	tmp2=tmp1[0]+"2,"+tmp1[1];
    }
    if(String(LocSt[i]).indexOf("SL_langDst_bbl2")!=-1) LocSt[i] = tmp2;

    //INLINE
    if(String(LocSt[i]).indexOf("SL_langDst_it,")!=-1 && String(LocSt[i]).indexOf("2")==-1){
	tmp1 = LocSt[i].split(",");
	tmp2=tmp1[0]+"2,"+tmp1[1];
    }
    if(String(LocSt[i]).indexOf("SL_langDst_it2")!=-1) LocSt[i] = tmp2;

    //SAVED TEXT
    if(String(LocSt[i]).indexOf("SL_SavedText_gt")!=-1){
	var txt = LocSt[i].split("_SavedText_gt,");
	var txt1 = txt[0];
	var txt2 = txt[1];
	EXP_DATA = EXP_DATA + txt1 + "_SavedText_gt,"+ encodeURIComponent(txt2)+"\n";
	jump = 1;
    }	

    if(jump == 0 && LocSt[i]!="") EXP_DATA = EXP_DATA + LocSt[i];
 }
 const SL_ENCR = Encr('SLFORMAT');
 EXP_DATA = SL_ENCR(EXP_DATA);
 const SL_DECR = Decr('SLFORMAT');
 EXP_DATA = SL_DECR(EXP_DATA);

 var filename = "imtranslator-options.im";
// console.log("doSave(): called.");
 window.URL=window.URL||window.webkitURL;
 var b=document.createElement("a"),c=new Blob([EXP_DATA],{type:"application/octet-stream"});
// var encodedUri = encodeURI(EXP_DATA);
 var encodedUri = encodeURIComponent(EXP_DATA);
 b.setAttribute("href", "data:text/plain;charset=utf-8,\uFEFF" + encodedUri);
 b.setAttribute("download",filename);
 b.click();
}


function SL_FileManager(event){
  setTimeout(function() {
	  SL_Upload(event);
  }, 100);

}

function handleFileSelect(event){
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
  GLOBAL_INPUT = encodeURIComponent(event.target.result);
  GLOBAL_INPUT = DOMPurify.sanitize (GLOBAL_INPUT);
  GLOBAL_INPUT = decodeURIComponent(GLOBAL_INPUT);
  GEBI("SL_upload_error").innerText="";
}


function SL_ResetToDefault(e){
   var ver = localStorage.getItem("SL_Version");
   FExtension.store.set("SL_LOCALIZATION","");
   chrome.storage.local.set({'SL_LOCALIZATION': ''});
   var loc = SL_GETBROWSERLOC();

//   chrome.storage.local.clear();
   CleanUpStorage(); 
   setTimeout(function() {
   
	   FExtension.bg.ImTranslatorBG.setDefault();

	   FExtension.bg.ImTranslatorBG.TO_LANGS(loc);

           if(layers.indexOf(loc)==-1) loc = "en";
	   FExtension.store.set("SL_LOCALIZATION",loc);
	   chrome.storage.local.set({'SL_LOCALIZATION': loc});

	   FExtension.store.set("THEMEmode","0");
	   chrome.storage.local.set({'THEMEmode': '0'});

	   FExtension.store.set("SL_Version",ver);
	   chrome.storage.local.set({'SL_Version': ver});

	   FExtension.store.set("ADV",0);
	   chrome.storage.local.set({'ADV': 0});

	   FExtension.store.set("SL_GotIt",0);
	   chrome.storage.local.set({'SL_GotIt': 0});

	   var l = GEBI("SL_LOC").value;
	   localStorage.setItem("SL_FAV_LANGS_IMT",l); 
	   localStorage.setItem("SL_FAV_LANGS_BBL",l); 
	   localStorage.setItem("SL_FAV_LANGS_IT",l); 
	   localStorage.setItem("SL_FAV_LANGS_WPT",l); 

	   FExtension.store.set("SL_langDst",l);
	   chrome.storage.local.set({'SL_langDst': l});
	   FExtension.store.set("SL_langDst2",l);
	   chrome.storage.local.set({'SL_langDst2': l});
	   FExtension.store.set("SL_langDst_bbl",l);
	   chrome.storage.local.set({'SL_langDst_bbl': l});
	   FExtension.store.set("SL_langDst_bbl2",l);
	   chrome.storage.local.set({'SL_langDst_bbl2': l});
	   FExtension.store.set("SL_langDst_it",l);
	   chrome.storage.local.set({'SL_langDst_it': l});
	   FExtension.store.set("SL_langDst_it2",l);
	   chrome.storage.local.set({'SL_langDst_it2': l});


	   parent.frames["menu"].location.reload();
	   location.reload();
   }, 100);
}

function CleanUpStorage(){
	for(var i=0; i<PACK_PARAMS.length; i++){
		var tmp = PACK_PARAMS[i].split(";");
		var curDBname = tmp[0];
		FExtension.store.set(curDBname,"");
		chrome.storage.local.set({curDBname: ''});
	}
}

function SL_Upload(event){
    if(GLOB_PREF == "SL"){
	GLOBAL_INPUT = GLOBAL_INPUT.replace(/SLO/g,GLOB_PREF);
	GLOBAL_INPUT = GLOBAL_INPUT.replace(/SLG/g,GLOB_PREF);
    }
    if(GLOB_PREF == "SLO"){
	GLOBAL_INPUT = GLOBAL_INPUT.replace(/SL/g,GLOB_PREF);
	GLOBAL_INPUT = GLOBAL_INPUT.replace(/SLG/g,GLOB_PREF);
    }	

    if(GLOB_PREF == "SLG"){
	GLOBAL_INPUT = GLOBAL_INPUT.replace(/SL/g,GLOB_PREF);
	GLOBAL_INPUT = GLOBAL_INPUT.replace(/SLO/g,GLOB_PREF);
    }	

    GLOBAL_INPUT = GLOBAL_INPUT.replace(/SLOO/g,"SLO");
    GLOBAL_INPUT = GLOBAL_INPUT.replace(/SLGO/g,"SLG");

    var theKEY = SL_UPLOAD_VALIDATOR(event);
    FExtension.bg.ImTranslatorBG.setDefault();

    if(theKEY == 1){
	  var NONES = DefineNONES();
	  var TMP = GLOBAL_INPUT.split("\n");
 	  ERRORS_TTL = TMP[0];
	  if(ERRORS_TTL.indexOf(",,")!=-1) ERRORS_TTL = ERRORS_TTL.replace(/[,+][, ]+/g, "").trim();
	  ERRORS_TTL = ERRORS_TTL + "<br>";

	  for(var i=HEADER; i < TMP.length; i++){
      		var LINE = TMP[i].split(",");
		var PARAMS = "";
		var cntr=0;
		if(localStorage.getItem(LINE[0])!=null){
	      		for(var j=1; j<LINE.length; j++){
				if(LINE[j]!=""){
					if(LINE[j].toLowerCase()=="true" || LINE[j].toLowerCase()=="false") LINE[j] = LINE[j].toLowerCase();
					PARAMS = PARAMS + LINE[j].trim();
					PARAMS = PARAMS.replace(/^ +/gm, '');
					PARAMS = PARAMS.replace(/\r/g, '');
					PARAMS = PARAMS + ",";
				}
			}

			// DATA VALIDATION

			var SKIP = 0;
			 	if(LINE[0].indexOf("_LNG_LIST") != -1){
					SL_Languages = CUSTOM_LANGS_RESET_TO_DEFAULT(PARAMS);

					if(PARAMS.indexOf(",")==-1){
						if(PARAMS.toLowerCase()!="all") {
							SKIP = 1;
							ERRORS = ERRORS + "<br>"+LINE[0]+" includes a wrong attribute";
						}
					} else {

						if(PARAMS.toLowerCase().indexOf("all")==-1) {
						 	var LNGS = PARAMS.split(",");
							var CNTR = 0;
							var NEWSTRING="";
							for(var l=0; l<LNGS.length; l++){
								var SL_TMP = SL_Languages.split(",");
								if(LNGS[l].toLowerCase()=="auto") {CNTR++; }
								var tmp1 = LNGS[l];
								for(var J=0; J < SL_TMP.length; J++){
								    	var SL_TMP2=SL_TMP[J].split(":");

								    	if(SL_TMP2[0].toLowerCase() == LNGS[l].toLowerCase()){
										var tmp2 = SL_TMP2[0];
										CNTR++;
										NEWSTRING = NEWSTRING + SL_TMP2[0] + ",";	
									}
								}

								if(tmp1 != tmp2 && PARAMS.indexOf(tmp1)!=-1){
									NEWSTRING = NEWSTRING + tmp1 + ",";	
								}
							}


							if(CNTR<2) {
								SKIP = 1;
//								ERRORS = ERRORS + "<br>"+LINE[0]+" does not include any valid languages - skipped";
							} else PARAMS = NEWSTRING;
							var PARAMS = GET_LANG_AVAILABILITY(PARAMS);
							if(CNTR == 0 && LNGS.length>=2) SKIP=0;
						}
					}
				}
				if(LINE[0].indexOf("_ALL_PROVIDERS_BBL") != -1 ){
						var OUT = ""
						var available=SYNC_PROV_LIST(PARAMS,"SL_ALL_PROVIDERS_BBL");
						var av = available.split(",");
					 	var PROV = PARAMS.split(",");

						if(av.length<=PROV.length){
							for(var l=0; l<av.length-1; l++){
								if(av.indexOf(PROV[l])!=-1){
									var tmp=PROV[l];
									if(tmp!="") {
										OUT =  OUT + tmp + ",";
									}
								}
							}
							if(OUT=="") {
								SKIP=1;
								PARAMS = available;
						        }PARAMS=OUT;
						} else SKIP = 0;
				}

				if(LINE[0].indexOf("_ALL_PROVIDERS_GT") != -1 ){
						var OUT = ""
						var available=SYNC_PROV_LIST(PARAMS,"SL_ALL_PROVIDERS_GT");
						var av = available.split(",");
					 	var PROV = PARAMS.split(",");

						if(av.length<=PROV.length){
							for(var l=0; l<av.length-1; l++){
								if(av.indexOf(PROV[l])!=-1){
									var tmp=PROV[l];
									if(tmp!="") {
										OUT =  OUT + tmp + ",";
									}
								}
							}
							if(OUT=="") {
								SKIP=1;
								PARAMS = available;
						        } PARAMS=OUT;

						} else SKIP = 0;
				}

				if(LINE[0].indexOf("_ALL_PROVIDERS_IT") != -1){
						var OUT = ""
						var available=SYNC_PROV_LIST(PARAMS,"SL_ALL_PROVIDERS_IT");
						var av = available.split(",");
					 	var PROV = PARAMS.split(",");
						if(av.length<=PROV.length){
							for(var l=0; l<av.length-1; l++){
								if(av.indexOf(PROV[l])!=-1){
									var tmp=PROV[l];
									if(tmp!="") {
										OUT =  OUT + tmp + ",";
									}
								} 
							}
							if(OUT=="") {
								SKIP=1;
								PARAMS = available;
						        } else PARAMS=OUT;

						} else SKIP = 0;
				}                                                                                                                                                                                                                                                                                                           

				if(LINE[0].indexOf("_change_lang_HK_it") != -1 || LINE[0].indexOf("_HK_btn") != -1 || LINE[0].indexOf("_HK_gt2") != -1 || LINE[0].indexOf("_HK_it2") != -1 || LINE[0].indexOf("_HK_opt") != -1 || LINE[0].indexOf("_HK_bb2") != -1 || LINE[0].indexOf("_HK_wpt1") != -1 || LINE[0].indexOf("_HK_wpt2") != -1 || LINE[0].indexOf("_HK_SO_wpt") != -1  || LINE[0].indexOf("_HK_CT_wpt") != -1){
					var SL_KSET = new Array("+","Escape","Shift","Ctrl","Alt","0","1","2","3","4","5","6","7","8","9","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M");
					PARAMS = SL_Text_capitalize(PARAMS.toLowerCase());
					var HKset = PARAMS.split(" ");
					var CNT = 0;

					for(var h=0; h<HKset.length; h++){
						for(var k=0; k<SL_KSET.length; k++){
							var sample = HKset[h].replace(/,/g,"");
							if(sample==SL_KSET[k]) CNT++;
						}
					}
					if(CNT==0 || CNT < (HKset.length)) {
						FExtension.store.set(LINE[0], GetFromDefault(LINE[0]));
						SKIP = 1;
					}
					if(CNT>5) SKIP = 1;
					if(SKIP == 1){
//						ERRORS = ERRORS + "<br>"+LINE[0]+" includes wrong hotkey(s) - skipped";
					}
				}
				if(LINE[0].indexOf("_HK_gt1") != -1 || LINE[0].indexOf("_HK_it1") != -1 || LINE[0].indexOf("_HK_bb1") != -1){
					if(NONES > 1){
						FExtension.store.set(LINE[0], GetFromDefault(LINE[0]));						
						SKIP=1;
					}
				}
				if(LINE[0].indexOf("_LOCALIZATION") != -1){
					var SL_LOCS = new Array("en","bg","zh","zt","cs","nl","tl","fr","de","el","hi","it","ja","ko","pl","pt","ro","ru","sr","sk","es","sv","tr","uk","vi");
					var CNT = 0;
					for(var k=0; k<SL_LOCS.length; k++){
						PARAMS = PARAMS.toLowerCase();
						var sample = PARAMS.replace(/,/g,"");
						if(sample==SL_LOCS[k]) CNT++;
					}
					if(CNT==0){
						SKIP = 1;
//						ERRORS = ERRORS + "<br>"+LINE[0]+" includes a wrong localization code - skipped";
					}
				}
				if(LINE[0].indexOf("_Version") != -1){
					var curVersion = PARAMS.replace(/,/g,"");
					if(FExtension.store.get(GLOB_PREF + "_Version") != curVersion) 	ERRORS = ERRORS + "<br>Installed Vesion : " + FExtension.store.get(GLOB_PREF + "_Version")+"<br>Restored Backup Vesion : " + curVersion;
					SKIP=1;
				}
				if(LINE[0].indexOf("_Timing") != -1){
					var PAR = PARAMS.replace(/,/g,"");
					var reg = new RegExp('^[0-9]+$');
                                        if(reg.test(PAR)==false || PAR<0 || PAR>99){
                                         	SKIP = 1;
//						ERRORS = ERRORS + "<br>" + LINE[0] + " must be a number between 0 and 99 - skipped";
					}
				}
				if(LINE[0].indexOf("_Delay") != -1){
					var PAR = PARAMS.replace(/,/g,"");
					var reg = new RegExp('^[0-9]+$');
                                        if(reg.test(PAR)==false || PAR<0 || PAR>9){
                                         	SKIP = 1;
//						ERRORS = ERRORS + "<br>" + LINE[0] + " must be a number between 0 and 9 - skipped";
					}
				}
				if(LINE[0].indexOf("_BBL_X") != -1 || LINE[0].indexOf("_BBL_Y") != -1){
					var PAR = PARAMS.replace(/,/g,"");
					var reg = new RegExp('^[0-9]+$');
                                        if(reg.test(PAR)==false || PAR<0 || PAR>99){
                                         	SKIP = 1;
//						ERRORS = ERRORS + "<br>" + LINE[0] + " must be a number between 0 and 99 - skipped";
					}
				}
				if(LINE[0].indexOf("_langDst_name") != -1 || LINE[0].indexOf("_langDst_name_bbl") != -1 || LINE[0].indexOf("_langDst_name_it") != -1 || LINE[0].indexOf("_langDst_name_wpt") != -1){
					PARAMS = SL_capitalize(PARAMS.toLowerCase());
				}
				if(LINE[0].indexOf("_style") != -1){
					PARAMS = PARAMS.replace(/#/g,"");
				}
				if(LINE[0].indexOf("_Fontsize") != -1 || LINE[0].indexOf("_Fontsize_bbl") != -1){
					var res = PARAMS.replace(/\D/g, "");
					if(res=="" || res<12 || res>22){
                                         	SKIP = 1;
//						ERRORS = ERRORS + "<br>" + LINE[0] + " font size is not correct - skipped";
					}
				}
				if(LINE[0].indexOf("ADV") != -1 || LINE[0].indexOf("FRUN") != -1 || LINE[0].indexOf("ran_before") != -1){
					PARAMS="1";
				}
				if(LINE[0].indexOf("_Fontsize2") != -1){
					SKIP = 1;
				}
				if(LINE[0].indexOf("_History") != -1){
					SKIP = 1;
				}
				if(LINE[0].indexOf("SL_langDst_it2") != -1) SKIP = 1;
				if(LINE[0].indexOf("_GAPI") != -1) SKIP = 1;
				if(LINE[0].indexOf("_YKEY") != -1) SKIP = 1;
				if(LINE[0].indexOf("SL_YHIST") != -1) SKIP = 1;

				if(LINE[0].indexOf("_SavedText_gt") != -1){
					PARAMS = decodeURIComponent(PARAMS);
				}



				if(LINE[0] == GLOB_PREF + "_langDst"){
					var lng = GET_SINGLE_DST_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langDst",lng);

				}
				if(LINE[0] == GLOB_PREF + "_langSrc"){
					var lng = GET_SINGLE_SRC_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langSrc",lng);

				}
				if(FExtension.store.get(GLOB_PREF + "_langDst") == FExtension.store.get(GLOB_PREF + "_langSrc")){
					FIX_FROM_TO("");
				}



				if(LINE[0] == GLOB_PREF + "_langDst_bbl"){
					var lng = GET_SINGLE_DST_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langDst_bbl",lng);

				}
				if(LINE[0] == GLOB_PREF + "_langSrc_bbl"){
					var lng = GET_SINGLE_SRC_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langSrc_bbl",lng)
				}
				if(FExtension.store.get(GLOB_PREF + "_langDst_bbl") == FExtension.store.get(GLOB_PREF + "_langSrc_bbl")){
					FIX_FROM_TO("_bbl");
				}



				if(LINE[0] == GLOB_PREF + "_langDst_it"){
					var lng = GET_SINGLE_DST_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langDst_it",lng)
				}
				if(LINE[0] == GLOB_PREF + "_langSrc_it"){
					var lng = GET_SINGLE_SRC_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langSrc_it",lng)
				}
				if(FExtension.store.get(GLOB_PREF + "_langDst_it") == FExtension.store.get(GLOB_PREF + "_langSrc_it")){
					FIX_FROM_TO("_it");
				}



				if(LINE[0] == GLOB_PREF + "_langDst_tr"){
					var lng = GET_SINGLE_DST_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langDst_tr",lng)
				}
				if(LINE[0] == GLOB_PREF + "_langSrc_tr"){
					var lng = GET_SINGLE_SRC_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langSrc_tr",lng)
				}
				if(FExtension.store.get(GLOB_PREF + "_langDst_tr") == FExtension.store.get(GLOB_PREF + "_langSrc_tr")){
					FIX_FROM_TO("_tr");
				}


				if(LINE[0] == GLOB_PREF + "_langDst_wpt"){
					var lng = GET_SINGLE_DST_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langDst_wpt",lng)
				}
				if(LINE[0] == GLOB_PREF + "_langSrc_wpt"){
					var lng = GET_SINGLE_SRC_AVAILABILITY(LINE[1]);
					PARAMS = lng + ",";
					FExtension.store.set(GLOB_PREF + "_langSrc_wpt",lng)
				}
				if(FExtension.store.get(GLOB_PREF + "_langDst_wpt") == FExtension.store.get(GLOB_PREF + "_langSrc_wpt")){
					FIX_FROM_TO("_wpt");
				}


				if(LINE[0] == GLOB_PREF + "_langDst_tr") cntr++; 


			// DATA VALIDATION
			

			if(SKIP == 0){
				if(PARAMS.indexOf(",,")!=-1) PARAMS = PARAMS.slice(0,-2);
				else PARAMS = PARAMS.slice(0,-1);
				FExtension.store.set(LINE[0], PARAMS);
				chrome.storage.local.set({[LINE[0]]: PARAMS});
				FExtension.store.set("ADV", 0);
				chrome.storage.local.set({'ADV': '0'});
				FExtension.store.set("FRUN", 1);
				chrome.storage.local.set({'FRUM': '1'});
				FExtension.store.set("ran_before", 1);
				chrome.storage.local.set({'ran_before': '1'});
			}
		}// else  ERRORS = ERRORS + "<br>"+LINE[0]+" is not present in "+ localStorage.getItem(GLOB_PREF + "_Version") +" version";
	  }
	 // TRANSLATOR
	  if(cntr == 0){
            FExtension.store.set(GLOB_PREF + "_langSrc_tr",FExtension.store.get(GLOB_PREF + "_langSrc"));
            FExtension.store.set(GLOB_PREF + "_langDst_tr",FExtension.store.get(GLOB_PREF + "_langDst"))
	  }
	 // Error Handler for HKs
	  if(FExtension.GET_localStorage(GLOB_PREF + "_change_lang_HK_it") == ""){   
	        FExtension.store.set(GLOB_PREF + "_change_lang_HKbox_it","true");
		chrome.storage.local.set({[GLOB_PREF + '_change_lang_HKbox_it']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_change_lang_HK_it");	
	        FExtension.store.set(GLOB_PREF + "_change_lang_HK_it",pr);
		chrome.storage.local.set({[GLOB_PREF + '_change_lang_HK_it']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_btn") == ""){   
	        FExtension.store.set(GLOB_PREF + "_HK_btnbox","true");
		chrome.storage.local.set({[GLOB_PREF + '_HK_btnbox']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_btn");	
	        FExtension.store.set(GLOB_PREF + "_HK_btn",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_btn']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_gt2") == ""){   
	        FExtension.store.set(GLOB_PREF + "_HKset_inv","3|90|true");
		chrome.storage.local.set({[GLOB_PREF + '_HKset_inv']: '3|90|true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_gt2");	
	        FExtension.store.set(GLOB_PREF + "_HK_gt2",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_gt2']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_it2") == ""){   
	        FExtension.store.set(GLOB_PREF + "_FK_box2","true");
		chrome.storage.local.set({[GLOB_PREF + '_FK_box2']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_it2");	
	        FExtension.store.set(GLOB_PREF + "_HK_it2",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_it2']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_opt") == ""){   
	        FExtension.store.set(GLOB_PREF + "_HK_optbox","true");
		chrome.storage.local.set({[GLOB_PREF + '_HK_optbox']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_opt");	
	        FExtension.store.set(GLOB_PREF + "_HK_opt",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_opt']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_bb2") == ""){   
	        FExtension.store.set(GLOB_PREF + "_HK_bb2box","true");
		chrome.storage.local.set({[GLOB_PREF + '_HK_bb2box']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_bb2");	
	        FExtension.store.set(GLOB_PREF + "_HK_bb2",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_bb2']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_wpt1") == ""){   
	        FExtension.store.set(GLOB_PREF + "_HK_wptbox1","true");
		chrome.storage.local.set({[GLOB_PREF + '_HK_wptbox1']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_wpt1");	
	        FExtension.store.set(GLOB_PREF + "_HK_wpt1",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_wpt1']: pr});
	  }
	  if(FExtension.GET_localStorage(GLOB_PREF + "_HK_wpt2") == ""){   
	        FExtension.store.set(GLOB_PREF + "_HK_wptbox2","true");
		chrome.storage.local.set({[GLOB_PREF + '_HK_wptbox2']: 'true'});
		var pr = GetFromDefault(GLOB_PREF + "_HK_wpt2");	
	        FExtension.store.set(GLOB_PREF + "_HK_wpt2",pr);
		chrome.storage.local.set({[GLOB_PREF + '_HK_wpt2']: pr});
	  }

	  SL_Reset_Booxes(SL_Languages);   
	  GLOBAL_HK_VALIDATOR(GLOB_PREF);

	  // for GT only
	  if(GLOB_PREF=="SLG"){
		  FExtension.store.set("SLG_other_gt", "0");
		  chrome.storage.local.set({'SLG_other_gt': '0'});
		  FExtension.store.set("SLG_other_bbl", "0");
		  chrome.storage.local.set({'SLG_other_bbl': '0'});
		  FExtension.store.set("SLG_other_wpt", "0");
		  chrome.storage.local.set({'SLG_other_wpt': '0'});
	  }


	  GEBI("SL_restore_lable").innerHTML="Restoring...";
	  
	  if(ERRORS=="") ERRORS = "<br>Data has been successfully imported!"
	  ERRORS = ERRORS_TTL + ERRORS;
	  FExtension.store.set(GLOB_PREF + "_Import_Report", ERRORS);
	  setTimeout(function() {
		   parent.frames["menu"].location.reload();
		   location.reload();
	  }, 2000);
    } else GEBI("SL_upload_error").innerHTML="Wrong file format";
}



function SL_Text_capitalize(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

function SL_capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SL_UPLOAD_VALIDATOR(e){
   var out = 0;
   var st1 = 0;
   var st2 = 0;
   var st3 = 0;
   var st4 = 0;
   var st5 = 0;
   var st6 = 0;
   SL_HEADER_VALIDATION(); 
   out = SL_VALIDATION_STAGE_0(e);
   if(out == 1){
	   SL_VALIDATION_STAGE_1(e);
   }
   return out;
}

function SL_HEADER_VALIDATION(){
	  SL_VALIDATION_STAGE_1();
	  if(GLOBAL_INPUT.indexOf("Version:") == -1 && GLOBAL_INPUT.indexOf(":") == -1 && GLOBAL_INPUT.indexOf("-") == -1) {
		HEADER = 0
		ERRORS = ERRORS + "- Header is not present<br>";
	  } else {
        	var t1 = GLOBAL_INPUT.split("Version: ")
		var t2 = t1[1].split(" -")
		var curVersion = t2[0];
		if(FExtension.GET_localStorage(PREF + "_Version") != curVersion) 	ERRORS = ERRORS + "<br>Installed Vesion : " + FExtension.GET_localStorage(PREF + "_Version")+"<br>Restored Backup Vesion : " + curVersion;
	  }
}

function SL_VALIDATION_STAGE_0(e){
  var out = 0;
  if(GLOBAL_INPUT.indexOf(",") != -1 && GLOBAL_INPUT.indexOf("_LNG_LIST") != -1 && GLOBAL_INPUT.indexOf("_DICT_PRESENT") != -1){
	out = 1;
  }
  return out;
}

function SL_VALIDATION_STAGE_1(){
  if(GLOBAL_INPUT.indexOf(",,") != -1){
      	GLOBAL_INPUT = GLOBAL_INPUT.trim();
  //      GLOBAL_INPUT = GLOBAL_INPUT.replace(/[,+][, ]+/g, "").trim();
  //      GLOBAL_INPUT = GLOBAL_INPUT.replace(/"/g, '');
  }
}

function SL_REPORT(e){
        var rep = FExtension.GET_localStorage(PREF + "_Import_Report");
	if (rep!=""){
			rep=rep.replace(/<br>/g,"\n");
			alert(rep);
	}
}

function SL_GETBROWSERLOC(){
      	  var loc = chrome.i18n.getUILanguage();

          if(FExtension.GET_localStorage("SL_LOCALIZATION")=="none" || FExtension.GET_localStorage("SL_LOCALIZATION")=="" || FExtension.GET_localStorage("SL_LOCALIZATION")==null){
             if(layers.indexOf(loc)==-1){
	          var tmp = loc.split("-");
        	  if(tmp.length>=2) loc = tmp[0];
	          if(loc=="fil") loc="tl";
	          if(loc=="en-US") loc="en";
	          if(loc=="en-AU") loc="en";
	          if(loc=="en-GB") loc="en";
	          if(loc=="pt-BR") loc="pt";
	          if(loc=="pt-PT") loc="pt";
	          if(loc=="es-419") loc="es";
	          if(loc=="zh-CN") loc="zh";
	          if(loc=="zh-TW") loc="zh";
	          if(layers.indexOf(loc)!=-1) {
			FExtension.store.set("SL_LOCALIZATION",loc);
//			chrome.storage.local.set({'SL_LOCALIZATION': loc});
		  }else{ 
			FExtension.store.set("SL_LOCALIZATION","en");
//			chrome.storage.local.set({'SL_LOCALIZATION': 'en'});
		  }
	      } else {
		  FExtension.store.set("SL_LOCALIZATION",loc);
//		  chrome.storage.local.set({'SL_LOCALIZATION': loc});
	      }

           } else {
                loc=FExtension.GET_localStorage("SL_LOCALIZATION");
	          var tmp = loc.split("-");
        	  if(tmp.length>=2) loc = tmp[0];
	          if(loc=="fil") loc="tl";
	          if(loc=="en-US") loc="en";
	          if(loc=="en-AU") loc="en";
	          if(loc=="en-GB") loc="en";
	          if(loc=="pt-BR") loc="pt";
	          if(loc=="pt-PT") loc="pt";
	          if(loc=="es-419") loc="es";
	          if(loc=="zh-CN") loc="zh";
	          if(loc=="zh-TW") loc="zh";
		if(layers.indexOf(loc)==-1) {
			FExtension.store.set("SL_LOCALIZATION","en");
//			chrome.storage.local.set({'SL_LOCALIZATION': 'en'});
		} else {
			FExtension.store.set("SL_LOCALIZATION",loc);
//			chrome.storage.local.set({'SL_LOCALIZATION': loc});
		}
	   }
	 return loc;
}

function DefineNONES(){
        var out = 0;
	var TMP = GLOBAL_INPUT.split("\n");
	for(var i=HEADER; i < TMP.length; i++){
      		var LINE = TMP[i].split(",");
		if(LINE[0]=="SL_HK_gt1" && LINE[1]=="") out++;
		if(LINE[0]=="SL_HK_it1" && LINE[1]=="") out++;
		if(LINE[0]=="SL_HK_bb1" && LINE[1]=="") out++;
	}
	return(out);
}

function GetFromDefault(name){
	for(var i=0; i<PACK_PARAMS.length; i++){
		var tmp = PACK_PARAMS[i].split(";");
		var curDBname = tmp[0];
		var curDBparam = tmp[1];
		var DBparam = FExtension.GET_localStorage(curDBname);
	        if(curDBname == name) return curDBparam;
  	}
}

function GLOBAL_HK_VALIDATOR(PREF){
	var TMP = GLOBAL_INPUT.split("\n");
	var NEWarrayNames= new Array();
	var NEWarrayParams= new Array();
	var cntr=0;
	for(var i=HEADER; i < TMP.length; i++){
	   if(TMP[i].indexOf(",")!=-1){
      		var LINE = TMP[i].split(",");
		LINE[0] = LINE[0].replace(PREF,"")
		if(reservedHK.indexOf(LINE[0])!=-1){
			NEWarrayNames[cntr] = LINE[0];
			NEWarrayParams[cntr++] = FINISHING(LINE[1]);
		}
	   }	
	}

	//Find any Matches
	NEWarrayParams.sort();
	NEWarrayParams.forEach(function (value, index, arr){
        	let first_index = arr.indexOf(value);
	        let last_index = arr.lastIndexOf(value);
        	if(first_index !== last_index){
        	    if(value!="") {
			var defPar = GetFromDefault(PREF+NEWarrayNames[index]);
			ERRORS = ERRORS + "<br>"+ PREF + NEWarrayNames[index] +' - duplicate item ' + value + " resetted to: " +defPar;
			FExtension.store.set(PREF+NEWarrayNames[index], defPar);
		    }
        	}
	});
	DETECT_CONFLICTS_LAST_STAGE(PREF);
}

function DETECT_CONFLICTS_LAST_STAGE(PREF){
	var HKnames = reservedHK.split(",");
	var NEWarrayHK = new Array();
	for(var i=0; i < HKnames.length; i++){
		NEWarrayHK[i] = FExtension.GET_localStorage(PREF+HKnames[i]);
	}
	NEWarrayHK.forEach(function (value, index, arr){
        	let first_index = arr.indexOf(value);
	        let last_index = arr.lastIndexOf(value);
        	if(first_index !== last_index){
        	    if(value!="") {
			var defPar = GetFromDefault(PREF+HKnames[index]);
			ERRORS = ERRORS + "<br>"+ PREF + HKnames[index] +' - duplicate item ' + value + " resetted to: " +defPar;
			FExtension.store.set(PREF+HKnames[index], defPar);
		    }
        	}
	});
}

function FINISHING(ob){
  var NewLine="";
  var ctrl="";
  var alt="";
  var shift="";
  var tmp = ob.split(" + ");
  for (var i=0; i<tmp.length; i++){
    if(tmp[i] == "Ctrl") ctrl=tmp[i];
    if(tmp[i] == "Alt") alt=tmp[i];
    if(tmp[i] == "Shift") shift=tmp[i];
  }
  if(ctrl!="") NewLine = NewLine + ctrl + " + ";
  if(alt!="") NewLine = NewLine + alt + " + ";
  if(shift!="") NewLine = NewLine + shift + " + ";
  for (i=0; i<tmp.length; i++){
    if(tmp[i] != "Ctrl" && tmp[i] != "Alt" && tmp[i] != "Shift") NewLine = NewLine + tmp[i] + " + ";
  }
  tmp = NewLine.split(" + ");
  NewLine="";
  for (var i=0; i<tmp.length-1; i++){
    if(i<tmp.length-2) NewLine = NewLine + tmp[i] + " + ";
    else NewLine = NewLine + tmp[i];
  }
 ob=NewLine;
 return ob;

}


function SYNC_PROV_LIST(pr,st){
	var OUT="";
	var OP = localStorage[st]+",";
	var JOINline = pr+OP;
	var JOINarr = JOINline.split(",");
	var unique = JOINarr.filter(onlyUnique);
	for (var i = 0; i<unique.length-1; i++){
		OUT = OUT + unique[i] + ",";
	}
	var NEWpr = OUT.split(",");
	var OLDpr = OP.split(",");
	if(NEWpr.length == OLDpr.length) OUT = OP;
	else OUT = ADD2END(OUT,OP);
	return (OUT);
}

function ADD2END(OUT,OP){
	var NEWpr = OUT.split(",");
	var OLDpr = OP.split(",");
	if(NEWpr.length == OLDpr.length){
	 	var tmp = OP;
		var SHORTarr=OP.split(",");
		for (var i=0; i<SHORTarr.length-1; i++){
		    if(OUT.indexOf(SHORTarr[i])!=-1){
			 OUT = OUT.replace(SHORTarr[i]+",","");
		    }
		}
		return (OP+OUT);
	}else return (OP);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


function SL_Reset_Booxes(list){
	var listTMP = list.split(",");
	var OUT = "";
	for(var k=0; k<listTMP.length; k++){
	    var listTMP2 = listTMP[k].split(":");
	    if(k<listTMP.length-1) OUT = OUT + listTMP2[0]+",";
	    else  OUT = OUT + listTMP2[0];
	}
	if(OUT != "") list = OUT;
	if(FExtension.store.get("SL_global_lng")=="true"){
		if(list != "all"){
			SL_CUSTOM("",list,0);
		}
	}else{
		if(list != "all"){
			if(FExtension.store.get("SL_global_lng")=="true"){
				SL_CUSTOM("",list,1);
				SL_CUSTOM("_it",list,1);
				SL_CUSTOM("_bbl",list,1);
				SL_CUSTOM("_wpt",list,1);
			} else {
					var tr1 = FExtension.store.get("SL_langDst")
					if(list.indexOf(tr1) == -1) SL_CUSTOM("",list,0);
					else SL_CUSTOM("",list,1);

					var tr2 = FExtension.store.get("SL_langDst_bbl")
					if(list.indexOf(tr2) == -1) SL_CUSTOM("_bbl",list,0);
					else SL_CUSTOM("_bbl",list,1);

					var tr3 = FExtension.store.get("SL_langDst_it")
					if(list.indexOf(tr3) == -1) SL_CUSTOM("_it",list,0);
					else SL_CUSTOM("_it",list,1);

					var tr4 = FExtension.store.get("SL_langDst_wpt")
					if(list.indexOf(tr4) == -1) SL_CUSTOM("_wpt",list,0);
					else SL_CUSTOM("_wpt",list,1);
			}		
		}
	}
}

function SL_SAVE_FAVORITE_LANGUAGES(ln, TR){
	var OUT = "";
	var OUT2 = "";
	var SL_FAV_LANGS = FExtension.store.get(TR);
	var SL_FAV_MAX = FExtension.store.get("SL_FAV_MAX");
	if(SL_FAV_LANGS.indexOf(ln)!=-1){
		SL_FAV_LANGS = SL_FAV_LANGS.replace(ln+",",""); 
		SL_FAV_LANGS = SL_FAV_LANGS.replace(ln,"");
	}
	OUT = ln + ",";	
	var ARR = SL_FAV_LANGS.split(",");
	for (var i = 0; i < ARR.length; i++){
	 	OUT = OUT + ARR[i]+",";
	}
	if(OUT.slice(-1)==",") 	OUT = OUT.slice(0, OUT.length - 1);
	var TMP = OUT.split(",");
	if(TMP.length > SL_FAV_MAX) {
		for (var j = 0; j < TMP.length-1; j++){
		 	OUT2 = OUT2 + TMP[j]+",";
		}		
		OUT = OUT2 
	}
	if(OUT.slice(-1)==",") 	OUT = OUT.slice(0, OUT.length - 1);
	FExtension.store.set(TR, OUT);
}


function SL_CUSTOM(tp,l,flag){
  var Ltemp=l.split(",");
  var Dname="SL_langDst"+tp;
  var Sname="SL_langSrc"+tp;
  var D = FExtension.store.get(Dname);
  var S = FExtension.store.get(Sname);

  if(l.indexOf('auto')!=-1){
        var Scntr=0;
	var Dcntr=0;
	for(var i = 0; i < Ltemp.length; i++){
		if(FExtension.store.get(Sname) == Ltemp[i]) Scntr++;
		if(FExtension.store.get(Dname) == Ltemp[i]) Dcntr++;
	}
	if(Scntr==0 && Dcntr==0){
		S = Ltemp[0];
		D = Ltemp[1];
	}
	if(Scntr==0 && Dcntr>0){
		for(var i = 0; i < Ltemp.length; i++){
			if(FExtension.store.get(Dname) != Ltemp[i]) {
				S = Ltemp[i];
				break;
			}
		}
	}
	if(Scntr>0 && Dcntr==0){
		for(var i = 0; i < Ltemp.length; i++){
			if(FExtension.store.get(Sname) != Ltemp[i]) {
				D = Ltemp[i];
				break;
			}
		}
	}
  }

  FExtension.store.set(Sname, S);
  FExtension.store.set(Dname, D);

  if(Dname == "SL_langDst")	SL_SAVE_FAVORITE_LANGUAGES(D, "SL_FAV_LANGS_IMT");
  if(Dname == "SL_langDst_bbl")	SL_SAVE_FAVORITE_LANGUAGES(D, "SL_FAV_LANGS_BBL");
  if(Dname == "SL_langDst_it")	SL_SAVE_FAVORITE_LANGUAGES(D, "SL_FAV_LANGS_IT");
  if(Dname == "SL_langDst_wpt")	SL_SAVE_FAVORITE_LANGUAGES(D, "SL_FAV_LANGS_WPT");

  var SRC = FExtension.store.get("SL_langSrc");
  var DST = FExtension.store.get("SL_langDst");
  if(tp=="") FExtension.store.set("SL_langSrc2", SRC);
  if(flag==0){
	  FExtension.store.set("SL_langSrc", SRC);
	  FExtension.store.set("SL_langSrc_it", SRC);
	  FExtension.store.set("SL_langSrc_bbl", SRC);
	  FExtension.store.set("SL_langSrc_wpt", SRC);
	  FExtension.store.set("SL_langDst", DST);
	  FExtension.store.set("SL_langDst2", DST);
	  FExtension.store.set("SL_langDst_it", DST);
	  FExtension.store.set("SL_langDst_bbl", DST);
	  FExtension.store.set("SL_langDst_wpt", DST);
  }

}
/*
function SL_Reset_Booxes(list){
	if(FExtension.store.get("SL_global_lng")=="true"){
		if(list != "all"){
			SL_CUSTOM("",list,0);
			SL_CUSTOM("_it",list,0);
			SL_CUSTOM("_bbl",list,0);
			SL_CUSTOM("_wpt",list,0);
		}
	}else{
		if(list != "all"){
			SL_CUSTOM("",list,1);
			SL_CUSTOM("_it",list,1);
			SL_CUSTOM("_bbl",list,1);
			SL_CUSTOM("_wpt",list,1);
		}
	}
}
*/

function GET_SINGLE_SRC_AVAILABILITY(active){
	try{
		var OUT="";
		var LIST = FExtension.store.get(GLOB_PREF + "_LNG_LIST")
		if(LIST!="all"){
			var tmp2 = LIST.split(",");	
			for(var i=0; i<tmp2.length; i++){
				if(active == tmp2[i]) OUT = active;
			}
			if(OUT==""){
				if(active=="auto") OUT = tmp2[0];
				else OUT = tmp2[1];
			}
		} else {
			OUT = active;				
		}
		if(OUT=="") OUT="auto";
		return(OUT);
	} catch(ex){}
}

function GET_SINGLE_DST_AVAILABILITY(active){
	try{
		var lngarr = SL_Languages.split(",");
		var OUT = "";
		for(var i=0; i<lngarr.length; i++){
			var tmp = lngarr[i].split(":");	
			if(tmp[0].toLowerCase()==active.toLowerCase()){
					OUT = active;
			}
		}
		if(OUT=="") {
			var LIST = FExtension.store.get(GLOB_PREF + "_LNG_LIST")
			if(LIST!="all"){
				var tmp2 = LIST.split(",");	
				OUT = tmp2[0];
			} else {
				var LIST = LISTofPRpairsDefault.split(",");
				OUT = LIST[0];				
			}
		}
		return(OUT);
	} catch(ex){}
}

function FIX_FROM_TO(app){
        if(FExtension.store.get(GLOB_PREF + "_langSrc" + app)!="auto"){
		var LIST = FExtension.store.get(GLOB_PREF + "_LNG_LIST");
		var tmp = LIST.split(",");	
		FExtension.store.set(GLOB_PREF + "_langDst" + app,tmp[0]);
		FExtension.store.set(GLOB_PREF + "_langSrc" + app,tmp[1]);
	}
}


function GET_LANG_AVAILABILITY(active_list){
	try{
		var lngarr = SL_Languages.split(",");
		var active_lngarr = active_list.split(",");
		var OUT = "";
		if(active_list.indexOf("auto")!=-1) OUT="auto,";
		for(var i=0; i<lngarr.length; i++){
			var tmp = lngarr[i].split(":");	
			for(var j=0; j<active_lngarr.length; j++){
				if(tmp[0].toLowerCase()==active_lngarr[j].toLowerCase()){
					OUT = OUT + active_lngarr[j]+",";
				}
			}
		}
		return(OUT);
	} catch(ex){}
}
