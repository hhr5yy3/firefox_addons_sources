'use strict';
var SL_DARK="invert(95%)";
var SL_Languages = LANGS_FILTER(FExtension.element(FExtension.store.get("SL_LOCALIZATION"),'extLanguages'));
var THE_LIST="";

(function(){GEBI("SL_save_button").addEventListener("click",function(){save_options();},!1);} )();
(function(){GEBI("SL_save_button2").addEventListener("click",function(){save_options();},!1);} )();
(function(){GEBI("SL_form_closer").addEventListener("click",function(){SL_close();},!1);} )();

(function(){
    window.addEventListener('load',function(){
	GEBI('SL_translate_container').style.opacity="1";
	INIT();
	LINKS();
    },!1);
    window.addEventListener('click',function(e){
	var ID = e.target.id;
	if(ID.indexOf('BOX')!=-1){
		var CODE = ID.replace("BOX_","");
		if(GEBI(ID).className=="SL_BOX") GEBI(ID).className="SL_BOX_ACTIVE";
		else GEBI(ID).className="SL_BOX";
		LINKS();
	}
	if(ID.indexOf('SL_ALL')!=-1) SL_SELECT(0);
	if(ID.indexOf('SL_DEALL')!=-1) SL_SELECT(1);
    },!1);

})();

function LINKS(){
        GEBI('SL_ALL_LNKS').textContent="";
	var dh = GEBI('SL_canvas').getElementsByClassName('SL_BOX');
	var da = GEBI('SL_canvas').getElementsByClassName('SL_BOX_ACTIVE');
	if(da.length==0) {
	        var LNK1 = "<table width=200><tr><td><div class='SL_ALL' id='SL_ALL'>"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSelectAll')+"</div></td></tr></table>";
		LNK1 = DOMPurify.sanitize (LNK1, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
		GEBI('SL_ALL_LNKS').appendChild (LNK1);
	}
	if(dh.length==0){
		var LNK2 = "<table width=200><tr><td><div class='SL_DEALL' id='SL_DEALL'>"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDeselectAll')+"</div></td></tr></table>"; 
		LNK2 = DOMPurify.sanitize (LNK2, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
		GEBI('SL_ALL_LNKS').appendChild (LNK2);
	}
	if(da.length!=0 && dh.length!=0){
		var LNK3 = "<table width=200><tr><td><div class='SL_ALL' id='SL_ALL'>"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSelectAll').replace(/\s/g,"&nbsp;")+"</div></td><td>&nbsp;&nbsp;&nbsp;</td><td><div class='SL_DEALL' id='SL_DEALL'>"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDeselectAll').replace(/\s/g,"&nbsp;")+"</div></td></tr></table>";
		LNK3 = DOMPurify.sanitize (LNK3, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
		GEBI('SL_ALL_LNKS').appendChild (LNK3);
	}
	ACTIVATE_THEME_LINKS(FExtension.store.get("THEMEmode"));
}

function SL_SELECT(ob){
        if(ob==0){
	 	var dh = GEBI('SL_canvas').getElementsByClassName('SL_BOX');
		for (var i=0; i<dh.length;) GEBI(dh[i].id).className="SL_BOX_ACTIVE";
	} else {
		
	 	var dh = GEBI('SL_canvas').getElementsByClassName('SL_BOX_ACTIVE');
		for (var i=0; i<dh.length;)	GEBI(dh[i].id).className="SL_BOX";
	}
	LINKS();
}

function CONSTRUCTOR(){
	GEBI('SL_save_button').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSaveButton')));
	GEBI('SL_save_button2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSaveButton')));
	GEBI('SL_h4').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLangs')));
}



(function(){
	GEBI("SL_save_button").addEventListener("click",function(){
		save_options();
	},!1);
})();


function INIT(){
  CONSTRUCTOR();
  BUILDER();
  var OUT = FExtension.GET_localStorage("SL_LNG_LIST");
  if(OUT == "all"){
	var dh = GEBI('SL_canvas').getElementsByClassName('SL_BOX');
	for (var i=0; i<dh.length;) GEBI(dh[i].id).className="SL_BOX_ACTIVE";
  } else {
	var dh = OUT.split(",");
	for (var i=0; i<dh.length; i++) {
	    	GEBI("BOX_"+dh[i]).className="SL_BOX_ACTIVE";
	}
  }  
  ACTIVATE_THEME(FExtension.store.get("THEMEmode"));
}

function BUILDER(){
	SL_Languages = SL_Languages.replace(/&#160;/ig," ");
	var ARR = SL_Languages.split(",");
	var STEP = 3;
	var W = Math.ceil(ARR.length/STEP);
	var L = W;

	var TBL = "<br><div class=SL_BOX_SET><div class=SL_BOXS><div class=SL_BOX id='BOX_auto'></div></div><div class=SL_BOX_TEXT id=SL_auto>" + FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDetect_language_from_box') + "</div></div><br><table width=745 cellspacing=0 cellpadding=0 border=0><tr><td width="+W+" valign=top height=28>";
	for(var i=0; i<ARR.length; i++){
	 	var ARR2=ARR[i].split(":");
		var CODE = ARR2[0];

		var NAME = ARR2[1].replace(" ","&nbsp;");
		NAME = NAME.replace("(","");
		NAME = NAME.replace(")","");

		if(i!=L){
			TBL = TBL + "<div class=SL_BOX_SET><div class=SL_BOXS><div class=SL_BOX id='BOX_"+CODE+"'></div></div><div class=SL_BOX_TEXT>" + NAME + "</div></div>";
		}else{
			TBL = TBL + "</td><td width="+W+" valign=top height=28><div class=SL_BOX_SET><div class=SL_BOXS><div class=SL_BOX id='BOX_"+CODE+"'></div></div><div class=SL_BOX_TEXT>" + NAME + "</div></div>";
			L = L + W;
		}
	}
	TBL = TBL + "</td></tr></table>";
	var container = document.createElement("div");
	TBL = DOMPurify.sanitize (TBL, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
	GEBI('SL_canvas').appendChild (TBL);
}


function save_options() {

	 	var dha = GEBI('SL_canvas').getElementsByClassName('SL_BOX_ACTIVE');
	 	var dhd = GEBI('SL_canvas').getElementsByClassName('SL_BOX');
	 	var OUT = "";

	 	if(dhd.length>0){
			for (var i=0; i<dha.length; i++){
				var CODE = GEBI(dha[i].id).id.replace("BOX_",""); 
				if(i<dha.length-1) OUT = OUT + CODE + ",";
				else OUT = OUT + CODE;
			}
		} else OUT = "all";


		if(dha.length<2) {alert (FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSelect2langs')); return false;}
		


		THE_LIST = OUT;
		
		FExtension.store.set("SL_LNG_LIST",OUT);
		chrome.storage.local.set({'SL_LNG_LIST': OUT});
                
		SL_Reset_Booxes(THE_LIST);

		FExtension.store.set("SL_Flag", "FALSE");
		chrome.storage.local.set({'SL_Flag': 'FALSE'});
		FExtension.bg.ImTranslatorBG.SL_callbackRequest();
		FExtension.bg.ImTranslatorBG.SL_callbackRequest2();
		FExtension.bg.ImTranslatorBG.SL_callbackRequest3();
	        FExtension.bg.FExtension.browser.refreshSettings();

                FExtension.AddHtmlToObj("SL_status","img","../../img/util/indicator.gif");
                FExtension.AddHtmlToObj("SL_status2","img","../../img/util/indicator.gif");

		setTimeout(function() {
			new Date().getTime();
			FExtension.store.set("SL_TS_LOC", Date.now());
			chrome.storage.local.set({'SL_TS_LOC': Date.now()});
			FExtension.store.set("SL_TS", Date.now());
			chrome.storage.local.set({'SL_TS': Date.now()});
		}, 1000);
		setTimeout(function() {
		   SL_status.innerText = "";
		   SL_status2.innerText = "";
		   SL_close();
		}, 2000);
}

function GEBI(id){ return document.getElementById(id);}

function SL_close(){  
	window.frames['parent'].GEBI('SL_AUTOKEYS').style.display='none';
        window.frames['parent'].location.reload();
}


function SL_CUSTOM(tp,l,flag){
  var Ltemp=l.split(",");
  var Dname="SL_langDst"+tp;
  var Sname="SL_langSrc"+tp;
  var D = FExtension.GET_localStorage(Dname);
  var S = FExtension.GET_localStorage(Sname);

  if(l.indexOf('auto')!=-1){
    if(Ltemp.length==2){
	S =  "auto";
	for(var i = 0; i < Ltemp.length; i++){
		if(Ltemp[i] != 'auto' && Ltemp[i] != FExtension.GET_localStorage(Dname) != "auto") {
			D = Ltemp[i];
			break;
		}
	}
    }
  } else {
        var Scntr=0;
	var Dcntr=0;
	for(var i = 0; i < Ltemp.length; i++){
		if(FExtension.GET_localStorage(Sname) == Ltemp[i]) Scntr++;
		if(FExtension.GET_localStorage(Dname) == Ltemp[i]) Dcntr++;
	}
	if(Scntr==0 && Dcntr==0){
		S = Ltemp[0];
		D = Ltemp[1];
	}
	if(Scntr==0 && Dcntr>0){
		for(var i = 0; i < Ltemp.length; i++){
			if(FExtension.GET_localStorage(Dname) != Ltemp[i]) {
				S = Ltemp[i];
				break;
			}
		}
	}
	if(Scntr>0 && Dcntr==0){
		for(var i = 0; i < Ltemp.length; i++){
			if(FExtension.GET_localStorage(Sname) != Ltemp[i]) {
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


  var SRC = FExtension.GET_localStorage("SL_langSrc");
  var DST = FExtension.GET_localStorage("SL_langDst");
  if(tp=="") FExtension.store.set("SL_langSrc2", SRC);
  if(flag==0){
	  FExtension.store.set("SL_langSrc_it", SRC);
	  FExtension.store.set("SL_langSrc_bbl", SRC);
	  FExtension.store.set("SL_langSrc_wpt", SRC);
	  FExtension.store.set("SL_langSrc_tr", SRC);
	  FExtension.store.set("SL_langDst_it", DST);
	  FExtension.store.set("SL_langDst_bbl", DST);
	  FExtension.store.set("SL_langDst_wpt", DST);
	  FExtension.store.set("SL_langDst_tr", DST);
  }
}

function SL_Reset_Booxes(list){
	if(FExtension.GET_localStorage("SL_global_lng")=="true"){
		if(list != "all"){
			SL_CUSTOM("",list,0);
		}
	}else{
		if(list != "all"){
			SL_CUSTOM("",list,1);
			SL_CUSTOM("_it",list,1);
			SL_CUSTOM("_bbl",list,1);
			SL_CUSTOM("_wpt",list,1);
			SL_CUSTOM("_tr",list,1);
		}
	}
}


function ACTIVATE_THEME(st){
 	if(st==1){
		var clr="#BF7D44";
		GEBI("SL_body_options").style.filter="invert(0%)";
		GEBI("SL_save_button").style.filter=SL_DARK;
		GEBI("SL_save_button2").style.filter=SL_DARK;	
		GEBI("SL_h4").style.filter=SL_DARK;
		if(GEBI("SL_DEALL")) GEBI("SL_DEALL").style.filter=SL_DARK;
		if(GEBI("SL_ALL")) GEBI("SL_ALL").style.filter=SL_DARK;

		var CHK = document.getElementsByClassName("SL_BOX_ACTIVE");
		for(var i=0; i<CHK.length; i++) CHK[i].style="border-right: 2px solid " +clr+";border-bottom: 2px solid " + clr;
	}
}

function ACTIVATE_THEME_LINKS(st){
 	if(st==1){
		if(GEBI("SL_DEALL")) GEBI("SL_DEALL").style.filter=SL_DARK;
		if(GEBI("SL_ALL")) GEBI("SL_ALL").style.filter=SL_DARK;
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


function LANGS_FILTER(SL_Languages){
        var OUT="";
	var GLOBAL_LANG_LIST=LISTofPRpairsDefault.split(",");
	var ARR = SL_Languages.split(",");
	var cnt=0;
	for(var i=0; i<ARR.length; i++){
	 	var NAME=ARR[i].split(":");
		for(var j=0; j<GLOBAL_LANG_LIST.length; j++){
			if(NAME[0]==GLOBAL_LANG_LIST[j]) OUT = OUT + NAME[0] + ":" + NAME[1] + ","
		}
	}
	OUT = OUT.substring(0,OUT.length-1);		    
	return(OUT)
}
