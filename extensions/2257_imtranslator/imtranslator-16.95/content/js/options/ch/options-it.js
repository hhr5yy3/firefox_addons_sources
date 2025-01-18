'use strict';
var SL_DARK="invert(95%)";
var SL_Languages = CUSTOM_LANGS(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLanguages'));

(function(){GEBI("SRV3").addEventListener("click",function(){SL_ACTIVE = GEBI("SRV3"); SL_TMP=SL_ACTIVE.value; SL_ACTIVE.focus();SL_MSG_HANDLER(event);},!1); } )();
(function(){GEBI("SRV3").addEventListener("mouseout",function(){NoneColor(3);},!1); } )();
(function(){GEBI("SL_del3").addEventListener("click",function(){SL_DEL_AUTO(3);},!1);} )();
(function(){GEBI("SRV3").addEventListener("paste",function(){ PREVENT_PASTE(event); },!1);} )();

(function(){GEBI("SRV12").addEventListener("click",function(){ SL_ACTIVE = GEBI("SRV12"); SL_TMP=SL_ACTIVE.value; SL_ACTIVE.focus();SL_MSG_HANDLER(event);},!1); } )();
(function(){GEBI("SRV12").addEventListener("mouseout",function(){NoneColor(12);},!1); } )();
(function(){GEBI("SRV12").addEventListener("paste",function(){ PREVENT_PASTE(event); },!1);} )();

(function(){GEBI("SRV4").addEventListener("click",function(){ SL_ACTIVE = GEBI("SRV4"); SL_TMP=SL_ACTIVE.value; SL_ACTIVE.focus();SL_MSG_HANDLER(event);},!1); } )();
(function(){GEBI("SRV4").addEventListener("mouseout",function(){NoneColor(4);},!1); } )();
(function(){GEBI("SRV4").addEventListener("paste",function(){ PREVENT_PASTE(event); },!1);} )();

(function(){GEBI('SL_inject_before').addEventListener("click",function(){ OneOfTwo(1); },!1);} )();
(function(){GEBI('SL_hide_translation').addEventListener("click",function(){ OneOfTwo(2); },!1);} )();
(function(){window.addEventListener("mousemove",function(){NoneColor(3);},!1);} )();
(function(){GEBI("SL_info").addEventListener("click",function(){FExtension.browserPopup.openNewTab(this.href);},!1);} )();
(function(){GEBI("SL_FK_box1").addEventListener("click",function(){ SL_HIDE_HK("SL_FK_box1","SL_HIDE3");},!1); } )();
(function(){GEBI("SL_FK_box2").addEventListener("click",function(){ SL_HIDE_HK("SL_FK_box2","SL_HIDE4");},!1); } )();
(function(){GEBI("SL_FK_box12").addEventListener("click",function(){ SL_HIDE_HK("SL_FK_box12","SL_HIDE12");},!1); } )();
(function(){GEBI("SL_LOC").addEventListener("change",function(){SL_SAVE_LOC();},!1);} )();
(function(){GEBI("SL_LNG_STATUS").addEventListener("click",function(){ SL_LANGS(); },!1); } )();
(function(){GEBI("SL_THEME").addEventListener("change",function(){SL_SAVE_THEME();},!1);} )();

(function(){GEBI("reset_all3").addEventListener("click",function(){ RESET_ALL_HK(3);},!1);} )();
(function(){GEBI("reset_all12").addEventListener("click",function(){ RESET_ALL_HK(12);},!1);} )();
(function(){GEBI("reset_all4").addEventListener("click",function(){ RESET_ALL_HK(4);},!1);} )();

(function(){window.addEventListener("mousemove",function(){
	BUILD_RESET_ICN(3);
	BUILD_RESET_ICN(12);
	BUILD_RESET_ICN(4);
},!1);} )();

(function(){window.addEventListener("click",function(event){
	SL_MSG_HANDLER(event);
},!1);} )();

//AUTOSAVE BLOCK
window.addEventListener('change',function(e){
	save_options();
},!1);
//AUTOSAVE BLOCK

(function(){
    window.addEventListener('load',function(){
        GEBI('SL_translate_container').style.opacity="1";
	CONSTRUCTOR();
	var OB = GEBI('SL_langSrc_it');
	if(FExtension.GET_localStorage("SL_LNG_LIST").indexOf("auto")!=-1 || FExtension.GET_localStorage("SL_LNG_LIST")=="all"){
		var OB1 = document.createElement('option');
		var v = document.createAttribute("value");
		v.value = "auto";
		OB1.setAttributeNode(v);
		OB1.appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDetect_language_from_box')));
		OB.appendChild(OB1); 
	}
	var SL_TMP = SL_Languages.split(",");
	for(var J=0; J < SL_TMP.length; J++){
	    var SL_TMP2=SL_TMP[J].split(":");
	    var OB2 = document.createElement('option');
	    var v = document.createAttribute("value");
	    v.value = SL_TMP2[0];
	    OB2.setAttributeNode(v);
	    //OB2.appendChild(document.createTextNode(SL_TMP2[1].replace("&#160;"," ")));
	    OB2.appendChild(document.createTextNode(SL_TMP2[1]));
	    OB.appendChild(OB2);
	}

	var OB3 = GEBI('SL_langDst_it');
	for(var J=0; J < SL_TMP.length; J++){
	    var SL_TMP2=SL_TMP[J].split(":");
	    var OB2 = document.createElement('option');
	    v = document.createAttribute("value");
	    v.value = SL_TMP2[0];
	    OB2.setAttributeNode(v);
	    //OB2.appendChild(document.createTextNode(SL_TMP2[1].replace("&#160;"," ")));
	    OB2.appendChild(document.createTextNode(SL_TMP2[1]));
	    OB3.appendChild(OB2);
	}
	INIT();
    },!1);
})();

function CONSTRUCTOR(){
	GEBI('SL_BG_op').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSLBG_op')));
	GEBI('SL_setLS4allTr').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSLsetLS4allTr')));
	GEBI('SLSeSo').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeSo')));
	GEBI('SLSeTa').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeTa')));
	GEBI('SL_DetSoLaAu').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDetSoLaAu')));
	GEBI('SL_TR_op').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTR_op')));
	GEBI('SL_enable_dict').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extEnable_Dict')));
	GEBI('SL_HotKeys').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extHotKeys')));
	GEBI('SL_TOMS').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTOMS')));
	GEBI('SL_ClearTr').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extClearTr')));
	GEBI('SL_Appearance').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extAppearance')));
	GEBI('SL_Color').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extColor')));
	GEBI('SL_EIB').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extEIB')));
	GEBI('SL_IBO').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extIBO')));
	GEBI('SL_LB').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLB')));
	GEBI('SL_ABW').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extABW')));
	GEBI('SL_HO').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extHO')));
	GEBI('SL_TrHi').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTrHist')));
	GEBI('SL_InTH').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extInTH')));
	GEBI('SL_il').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLOC')));
	GEBI('SL_L_BOX').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLangs')+":"));
	GEBI('SL_LNG_STATUS').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCustomize')));
	GEBI('SL_INLINEflip').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSwitch_languages_ttl')));
	GEBI('SL_LIST_TR_PR').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLIST_TR_PR')));

	GEBI('SL_theme_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTHEME')));
	GEBI('SL_theme_1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLIGHT')));
	GEBI('SL_theme_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDARK')));
	GEBI('SL_tr_with_target').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeTa')));
	switch(PLATFORM){
	 case "Chrome": GEBI('SL_info').href="https://about.imtranslator.net/tutorials/presentations/imtranslator-translator-for-firefox/inline-translator-options-firefox/"; break;
	}
        SL_SHOWHIDEINLINEPROVIDERS();
	INLINE_PR_BUILDER("SL_ALL_PROVIDERS_IT");
	ACTIVATE_THEME(FExtension.GET_localStorage("THEMEmode"));
}


(function(e){
	document.addEventListener("click",function(e){
	      if(e.target.id!="SL_style" && GEBI("SL_CL")){
		 GEBI("SL_CL").style.display='none';
		 GEBI("SL_style").style.background='#'+GEBI("SL_style").value;
	      }
	},!1);
} )();

(function(e){
	GEBI('SL_style').addEventListener("keydown",function(e){
	      GEBI("SL_style").style.background='#'+GEBI("SL_style").value;
	},!1);
} )();

(function(e){
	GEBI('SL_style').addEventListener("keyup",function(e){
	      GEBI("SL_style").style.background='#'+GEBI("SL_style").value;
	},!1);
} )();

(function(e){
	GEBI('SL_style').addEventListener("click",function(e){
		setTimeout(function() {
		      GEBI("SL_style").focus();
		      GEBI("SL_style").select();
		}, 300);

	},!1);
} )();



function INIT(){
  ACTIVATE_MENU_ELEMENT(2);
  GEBI("SL_LOC").value=FExtension.GET_localStorage("SL_LOCALIZATION");
  //*************************** inliner ***********************************
  var SL_style = GEBI("SL_style");
  var SL_style_tr = FExtension.GET_localStorage("SL_style");
  SL_style.value = SL_style_tr;
  SL_style.style.backgroundColor = "#"+SL_style_tr;
  
  var SL_inject_brackets_tr = FExtension.GET_localStorage("SL_inject_brackets"); 
  if(SL_inject_brackets_tr=="true")  GEBI("SL_inject_brackets").checked = true;
  else GEBI("SL_inject_brackets").checked = false;
  
  var SL_inject_before_tr = FExtension.GET_localStorage("SL_inject_before"); 
  if(SL_inject_before_tr=="true"){
	GEBI("SL_inject_before").checked = true;
	if(GEBI('SL_hide_translation').checked==true) GEBI('SL_hide_translation').checked = false;
  }else GEBI("SL_inject_before").checked = false;

  var SL_line_break_tr = FExtension.GET_localStorage("SL_line_break"); 
  if(SL_line_break_tr=="true")  GEBI("SL_line_break").checked = true;
  else GEBI("SL_line_break").checked = false;
  
  var SL_whole_word_tr = FExtension.GET_localStorage("SL_whole_word"); 
  if(SL_whole_word_tr=="true")  GEBI("SL_whole_word").checked = true;
  else GEBI("SL_whole_word").checked = false;
  
  var SL_hide_translation_tr = FExtension.GET_localStorage("SL_hide_translation"); 
  if(SL_hide_translation_tr=="true"){
	GEBI("SL_hide_translation").checked = true;
	if(GEBI('SL_inject_before').checked==true) GEBI('SL_inject_before').checked = false;
  }else GEBI("SL_hide_translation").checked = false;
  
  var SL_dictionary_tr = FExtension.GET_localStorage("SL_dictionary"); 
  if(SL_dictionary_tr=="true")  GEBI("SL_dictionary").checked = true;
  else GEBI("SL_dictionary").checked = false;

  var SL_no_detect_tr = FExtension.GET_localStorage("SL_no_detect_it");
  if(SL_no_detect_tr=="true")  GEBI("SL_no_detect_it").checked = true;
  else GEBI("SL_no_detect_it").checked = false;

  // Hotkeys block
  var SL_FK_box1 = FExtension.GET_localStorage("SL_FK_box1"); 
  if(SL_FK_box1=="true")  GEBI("SL_FK_box1").checked = true;
  else GEBI("SL_FK_box1").checked = false;

  var SL_FK_box2 = FExtension.GET_localStorage("SL_FK_box2"); 
  if(SL_FK_box2=="true")  GEBI("SL_FK_box2").checked = true;
  else GEBI("SL_FK_box2").checked = false;

  var SL_change_lang_HKbox_it = FExtension.GET_localStorage("SL_change_lang_HKbox_it"); 
  if(SL_change_lang_HKbox_it=="true")  GEBI("SL_FK_box12").checked = true;
  else GEBI("SL_FK_box12").checked = false;

  GEBI("SRV12").value = FExtension.GET_localStorage("SL_change_lang_HK_it");

  SL_SHOWHIDEINLINEPROVIDERS();

  // Hotkeys block



  //************************* end inliner *********************************
	if(FExtension.GET_localStorage("SL_HK_it1")!=""){
		GEBI('SRV3').value=FExtension.GET_localStorage("SL_HK_it1");
		GEBI('SRV3').style.color="#000";
	} else {
//		GEBI('SRV3').value="None";
		GEBI('SRV3').style.color="#ccc";
	}

        GEBI('SRV4').value = FExtension.GET_localStorage("SL_HK_it2");

	var mySL_langSrc_it = FExtension.GET_localStorage("SL_langSrc_it");
	var mySL_langSrcSelect_it = GEBI("SL_langSrc_it");
	for (var i = 0; i < mySL_langSrcSelect_it.options.length; i++) {
		var mySL_langSrcOption_it = mySL_langSrcSelect_it.options[i];
		if (mySL_langSrcOption_it.value == mySL_langSrc_it) {
			mySL_langSrcOption_it.selected = "true";
			break;
		}
	}

	var mySL_langDst_it = FExtension.GET_localStorage("SL_langDst_it");
	var mySL_langDstSelect_it = GEBI("SL_langDst_it");
	for (var i = 0; i < mySL_langDstSelect_it.options.length; i++) {
		var mySL_langDstOption_it = mySL_langDstSelect_it.options[i];
		if (mySL_langDstOption_it.value == mySL_langDst_it) {
			mySL_langDstOption_it.selected = "true";
			break;
		}
	}

        var SL_TH_4 = FExtension.GET_localStorage("SL_TH_4");
        if(SL_TH_4=="1")  GEBI("SL_TH_4").checked = true;
        else GEBI("SL_TH_4").checked = false;

	var SL_global_lng_it = FExtension.GET_localStorage("SL_global_lng_it");
	if(SL_global_lng_it=="true")  GEBI("SL_global_lng_it").checked = true;
	else GEBI("SL_global_lng_it").checked = false;

	SL_HIDE_HK("SL_FK_box1","SL_HIDE3");
	SL_HIDE_HK("SL_FK_box2","SL_HIDE4");
	SL_HIDE_HK("SL_FK_box12","SL_HIDE12");



	var INLINEflip = FExtension.GET_localStorage("INLINEflip");
	if(INLINEflip=="1")  GEBI("INLINEflip").checked = true;
	else GEBI("INLINEflip").checked = false;

	var SL_THEMEmode = FExtension.GET_localStorage("THEMEmode");
	if(SL_THEMEmode==0)  GEBI("SL_THEME").value = 0;
	else GEBI("SL_THEME").value = 1;
	save_options();
}

function save_options() {
 setTimeout(function() {
	var SL_select_S_it = GEBI("SL_langSrc_it");
	var SL_select_T_it = GEBI("SL_langDst_it");

	if(SL_select_S_it.value!=SL_select_T_it.value){

	   if(GEBI("SL_TH_4").checked==true){
		FExtension.store.set("SL_TH_4", "1");
		chrome.storage.local.set({'SL_TH_4': '1'});
	   }else{
		FExtension.store.set("SL_TH_4","0");
		chrome.storage.local.set({'SL_TH_4': '0'});
	   }	
	   //*************************** inliner ***********************************
	   var SL_style = GEBI("SL_style");
	   FExtension.store.set("SL_style", SL_style.value);
	   chrome.storage.local.set({'SL_style': SL_style.value});
	   
	   var SL_inject_brackets = GEBI("SL_inject_brackets");
	   FExtension.store.set("SL_inject_brackets", SL_inject_brackets.checked+'');
	   chrome.storage.local.set({'SL_inject_brackets': SL_inject_brackets.checked+''});
	   
	   var SL_inject_before = GEBI("SL_inject_before");
	   FExtension.store.set("SL_inject_before", SL_inject_before.checked+'');
	   chrome.storage.local.set({'SL_inject_before': SL_inject_before.checked+''});
	   
	   var SL_line_break = GEBI("SL_line_break");
	   FExtension.store.set("SL_line_break", SL_line_break.checked + '');
	   chrome.storage.local.set({'SL_line_break': SL_line_break.checked + ''});
	   
	   var SL_whole_word = GEBI("SL_whole_word");
	   FExtension.store.set("SL_whole_word", SL_whole_word.checked + '');
	   chrome.storage.local.set({'SL_whole_word': SL_whole_word.checked + ''});
	   
	   var SL_hide_translation = GEBI("SL_hide_translation");
	   FExtension.store.set("SL_hide_translation", SL_hide_translation.checked + '');
	   chrome.storage.local.set({'SL_hide_translation': SL_hide_translation.checked + ''});
	   
	   var SL_dictionary = GEBI("SL_dictionary");
	   FExtension.store.set("SL_dictionary", SL_dictionary.checked + '');
	   chrome.storage.local.set({'SL_dictionary': SL_dictionary.checked + ''});
	   
	   //************************* end inliner *********************************
		if(GEBI("SL_global_lng_it").checked==true){
			FExtension.store.set("SL_langDst_name", SL_langDst_name_it);
			chrome.storage.local.set({'SL_langDst_name': SL_langDst_name_it});
			FExtension.store.set("SL_langDst_name_bbl", SL_langDst_name_it);
			chrome.storage.local.set({'SL_langDst_bbl': SL_langDst_name_it});
			FExtension.store.set("SL_langDst_name_wpt", SL_langDst_name_it);
			chrome.storage.local.set({'SL_langDst_wpt': SL_langDst_name_it});
		}


		if(GEBI("SL_global_lng_it").checked==true){

			FExtension.store.set("SL_global_lng", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_bbl", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_bbl': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_wpt", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_wpt': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_it", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_it': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_tr", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_tr': GEBI("SL_global_lng_it").checked});

			FExtension.store.set("SL_langSrc", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langSrc': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
			FExtension.store.set("SL_langSrc_bbl", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langSrc_bbl': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
			FExtension.store.set("SL_langSrc_wpt", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langSrc_wpt': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
			FExtension.store.set("SL_langSrc_it", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langSrc_it': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
			FExtension.store.set("SL_langSrc_tr", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langSrc_tr': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});

			FExtension.store.set("SL_langDst", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langDst': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
			FExtension.store.set("SL_langDst_bbl", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langDst_bbl': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
			FExtension.store.set("SL_langDst_wpt", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langDst_wpt': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
			FExtension.store.set("SL_langDst_it", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langDst_it': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
			FExtension.store.set("SL_langDst_tr", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
			chrome.storage.local.set({'SL_langDst_tr': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});



		   // temp params
		   FExtension.store.set("SL_langSrc2", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langSrc2': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
		   FExtension.store.set("SL_langSrc_bbl2", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langSrc_bbl2': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
		   FExtension.store.set("SL_langSrc_wpt2", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langSrc_wpt2': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});
		   FExtension.store.set("SL_langSrc_it2", SL_select_S_it.children[SL_select_S_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langSrc_it2': SL_select_S_it.children[SL_select_S_it.selectedIndex].value});

		   FExtension.store.set("SL_langDst2", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langDst2': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
		   FExtension.store.set("SL_langDst_bbl2", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langDst_bbl2': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
		   FExtension.store.set("SL_langDst_wpt2", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langDst_wpt2': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
		   FExtension.store.set("SL_langDst_it2", SL_select_T_it.children[SL_select_T_it.selectedIndex].value);
		   chrome.storage.local.set({'SL_langDst_it2': SL_select_T_it.children[SL_select_T_it.selectedIndex].value});
		   // temp params


	   		FExtension.store.set("SL_langDst_name", SL_select_T_it.children[SL_select_T_it.selectedIndex].text);
	   		chrome.storage.local.set({'SL_langDst_name': SL_select_T_it.children[SL_select_T_it.selectedIndex].text});
	   		FExtension.store.set("SL_langDst_name_wpt", SL_select_T_it.children[SL_select_T_it.selectedIndex].text);
	   		chrome.storage.local.set({'SL_langDst_name_wpt': SL_select_T_it.children[SL_select_T_it.selectedIndex].text});
	   		FExtension.store.set("SL_langDst_name_bbl", SL_select_T_it.children[SL_select_T_it.selectedIndex].text);
	   		chrome.storage.local.set({'SL_langDst_name_bbl': SL_select_T_it.children[SL_select_T_it.selectedIndex].text});
			FExtension.store.set("SL_langDst_name_it", SL_select_T_it.children[SL_select_T_it.selectedIndex].text);
			chrome.storage.local.set({'SL_langDst_name_it': SL_select_T_it.children[SL_select_T_it.selectedIndex].text});
			FExtension.store.set("SL_langDst_name_tr", SL_select_T_it.children[SL_select_T_it.selectedIndex].text);
	   		chrome.storage.local.set({'SL_langDst_name_tr': SL_select_T_it.children[SL_select_T_it.selectedIndex].text});



			FExtension.store.set("SL_no_detect", GEBI("SL_no_detect_it").checked);
			chrome.storage.local.set({'SL_no_detect': GEBI("SL_no_detect_it").checked});
			FExtension.store.set("SL_no_detect_bbl", GEBI("SL_no_detect_it").checked);
			chrome.storage.local.set({'SL_no_detect_bbl': GEBI("SL_no_detect_it").checked});
			FExtension.store.set("SL_no_detect_it", GEBI("SL_no_detect_it").checked);
			chrome.storage.local.set({'SL_no_detect_it': GEBI("SL_no_detect_it").checked});
			FExtension.store.set("SL_tr_detect", GEBI("SL_no_detect_it").checked);
			chrome.storage.local.set({'SL_tr_detect': GEBI("SL_no_detect_it").checked});


			var IDS = document.getElementById("SL_langDst_it").value;
	   		SL_SAVE_FAVORITE_LANGUAGES(IDS, "SL_FAV_LANGS_IMT");
	   		SL_SAVE_FAVORITE_LANGUAGES(IDS, "SL_FAV_LANGS_BBL");
	   		SL_SAVE_FAVORITE_LANGUAGES(IDS, "SL_FAV_LANGS_IT");


		} else {
			SL_SAVE_FAVORITE_LANGUAGES(document.getElementById("SL_langDst_it").value, "SL_FAV_LANGS_IT");

			FExtension.store.set("SL_langDst_name_it", SL_select_T_it.children[SL_select_T_it.selectedIndex].text);
			chrome.storage.local.set({'SL_langDst_name_it': SL_select_T_it.children[SL_select_T_it.selectedIndex].text});

			FExtension.store.set("SL_global_lng", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_bbl", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_bbl': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_wpt", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_wpt': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_it", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_it': GEBI("SL_global_lng_it").checked});
			FExtension.store.set("SL_global_lng_tr", GEBI("SL_global_lng_it").checked);
			chrome.storage.local.set({'SL_global_lng_tr': GEBI("SL_global_lng_it").checked});

		}	

		var SL_langSrc_it = SL_select_S_it.children[SL_select_S_it.selectedIndex].value;
		FExtension.store.set("SL_langSrc_it", SL_langSrc_it);
		chrome.storage.local.set({'SL_langSrc_it': SL_langSrc_it});
		
		var SL_langDst_it = SL_select_T_it.children[SL_select_T_it.selectedIndex].value;
		FExtension.store.set("SL_langDst_it", SL_langDst_it);
		chrome.storage.local.set({'SL_langDst_it': SL_langDst_it});
		
		var SL_langDst_name_it = SL_select_T_it.children[SL_select_T_it.selectedIndex].text;
		FExtension.store.set("SL_langDst_name_it", SL_langDst_name_it);
		chrome.storage.local.set({'SL_langDst_name_it': SL_langDst_name_it});

		FExtension.store.set("SL_no_detect_it", GEBI("SL_no_detect_it").checked);
		chrome.storage.local.set({'SL_no_detect_it': GEBI("SL_no_detect_it").checked});

		FExtension.store.set("SL_FK_box1", GEBI("SL_FK_box1").checked);
		chrome.storage.local.set({'SL_FK_box1': GEBI("SL_FK_box1").checked});
		FExtension.store.set("SL_FK_box2", GEBI("SL_FK_box2").checked);
		chrome.storage.local.set({'SL_FK_box2': GEBI("SL_FK_box2").checked});

		if(GEBI('SRV3').value!="None"){
			FExtension.store.set("SL_HK_it1", GEBI('SRV3').value);
			chrome.storage.local.set({'SL_HK_it1': GEBI('SRV3').value});
		}else{
			FExtension.store.set("SL_HK_it1", "");
			chrome.storage.local.set({'SL_HK_it1': ''});
		}
		FExtension.store.set("SL_HK_it2", GEBI('SRV4').value);
		chrome.storage.local.set({'SL_HK_it2': GEBI('SRV4').value});

		FExtension.store.set("SL_change_lang_HKbox_it", GEBI("SL_FK_box12").checked);
		chrome.storage.local.set({'SL_change_lang_HKbox_it': GEBI("SL_FK_box12").checked});
		FExtension.store.set("SL_change_lang_HK_it", GEBI('SRV12').value);
		chrome.storage.local.set({'SL_change_lang_HK_it': GEBI("SRV12").value});

		if(GEBI("INLINEflip").checked==true){
			FExtension.store.set("INLINEflip","1");
			chrome.storage.local.set({'INLINEflip': '1'});
		}else{
			FExtension.store.set("INLINEflip","0");
			chrome.storage.local.set({'INLINEflip': '0'});
		}


		RESET_TEMPS_TO_DEFAULT();

	  	SAVE_INLINE_LIST_PROVIDERS("SL_ALL_PROVIDERS_IT");

//------TIME STAMP--------------
	new Date().getTime();
	FExtension.store.set("SL_TS", Date.now());
	chrome.storage.local.set({'SL_TS': Date.now()});
//==============================



		if(GEBI("SL_global_lng_it").checked==true){
			FExtension.store.set("SL_langDst_name", SL_langDst_name_it);
			chrome.storage.local.set({'SL_langDst_name': SL_langDst_name_it});
			FExtension.store.set("SL_langDst_name_bbl", SL_langDst_name_it);
			chrome.storage.local.set({'SL_langDst_name_bbl': SL_langDst_name_it});
			FExtension.store.set("SL_langDst_name_wpt", SL_langDst_name_it);
			chrome.storage.local.set({'SL_langDst_name_wpt': SL_langDst_name_it});
		}
		FExtension.store.set("SL_Flag", "FALSE");
		chrome.storage.local.set({'SL_Flag': 'FALSE'});
		FExtension.bg.ImTranslatorBG.SL_callbackRequest();
		FExtension.bg.ImTranslatorBG.SL_callbackRequest2();
		FExtension.bg.ImTranslatorBG.SL_callbackRequest3();
//		FExtension.bg.ImTranslatorBG.SL_callbackRequest4();
	        FExtension.bg.FExtension.browser.refreshSettings();

	}else 	  alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extS_T_L_diff'));
 }, 100);
}

function GEBI(id){ return document.getElementById(id);}



function OneOfTwo(st){
 if(st==1){
  if(GEBI('SL_inject_before').checked == true) GEBI('SL_hide_translation').checked = false;
 } else {
  if(GEBI('SL_hide_translation').checked == true) GEBI('SL_inject_before').checked = false;
 }
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
  chrome.storage.local.set({'SL_LOCALIZATION': GEBI("SL_LOC").value});		
  CONSTRUCTOR();
  GEBI("SL_langSrc_it").value=FExtension.GET_localStorage("SL_langSrc_it");
  GEBI("SL_langDst_it").value=FExtension.GET_localStorage("SL_langDst_it");
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
		var clr_deact="#BDBDBD";
		GEBI("SL_translate_container").style.filter=SL_DARK;
		var LBLS = document.getElementsByClassName("SL_BG_op");
		for(var i=0; i<LBLS.length; i++) LBLS[i].style.color=clr;
		var A = document.getElementsByTagName("a");
		for(var i=0; i<A.length; i++) A[i].style.color=clr;

		var E = document.getElementsByClassName("SLMSG");
		for(var j=0; j<E.length; j++) E[j].style.filter=SL_DARK;

		setTimeout(function() {
			var SL_lngSrc_opt = GEBI("SL_langSrc_it").getElementsByTagName("option");
			for(var j=0; j<SL_lngSrc_opt.length; j++) SL_lngSrc_opt[j].setAttribute("style", "background:"+bg+" !important;color:#fff;");
			var SL_lngSrc_opt = GEBI("SL_langDst_it").getElementsByTagName("option");
			for(var j=0; j<SL_lngSrc_opt.length; j++) SL_lngSrc_opt[j].setAttribute("style", "background:"+bg+" !important;color:#fff;");
		}, 1000);

		if(GEBI("item-0")) GEBI("item-0").style.borderRight="10px solid "+clr;	
		if(GEBI("item-1")) GEBI("item-1").style.borderRight="10px solid "+clr;
		
		GEBI("SL_style").style.filter=SL_DARK;	
		GEBI("SL_AUTOKEYS").style.filter=SL_DARK;	
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


function RESET_ALL_HK(id){
        var st = "";
        switch (id){
         case 3: st = 'SL_HK_it1'; break;
         case 4: st = 'SL_HK_it2'; break;
         case 12: st = 'SL_change_lang_HK_it'; break;

	}
	for(var i=0; i<PACK_PARAMS.length; i++){
		var tmp = PACK_PARAMS[i].split(";");
		var curDBname = tmp[0];
		var curDBparam = tmp[1];
		var DBparam = FExtension.store.get(curDBname);
		if(curDBname == st){
			FExtension.store.set(curDBname, curDBparam);			
			GEBI("MSG"+id).style.visibility="hidden";
		}
	}
	GEBI("SRV"+id).value=FExtension.store.get(st);
}

function BUILD_RESET_ICN(ob){
	GEBI("reset_all"+ob).title="Reset to default";
}

function SL_DEL_AUTO(ob){
	GEBI("SRV"+ob).value = "Auto Translate"; 
	GEBI("SRV"+ob).placeholder = "Auto Translate"; 
        GEBI("MSG"+ob).style.visibility="hidden";
	save_options(0);
}                          
