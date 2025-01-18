ImTranslatorBG = {
    	BaseGTK:  "451769.3009291968",
	/////////////
	ADVkey: 1,
	// 1 - show for all
	// 2 - show for new
	// 3 - show for old
	// 4 - do not show for all
	/////////////
	DIC_TRIGGER: 0,
        tempresp: "",
	seltext: null,
	myWindow: "null",
	myWindowID: "",
	NORUN: 0,
	ImTranslator_URL: "https://translate.imtranslator.net/1/",
	TextTransLimit: 8000,
	ImTranslator_Wconst: 550,
	ImTranslator_Hconst: 550,
        THE_URL: "",
	first_run: 0,
	the_ID1: null,
	the_ID2: null,
	the_ID3: null,
	the_ID4: null,
	the_ID5: null,
	the_ID6: null,
	the_ID7: null,
	the_ID8: null,
	the_ID9: null,
	CURRENT_VERSION: "",
	PREVIOUS_VERSION: FExtension.GET_localStorage("SL_Version"),
        ALLvoices: "",

	init: function(){	



		FExtension.browser.addOnRequestListener(function(request, sender, sendResponse){
		    switch(request.message){
		        case 'setText':
		            window.seltext = request.data
		            break;
		        default:
		            sendResponse({data: 'Invalid arguments'});
		        	break;
		    }
		});
		//FExtension.store.setDefault();
		var manifest = browser.runtime.getManifest();
		var version = manifest.version;
       		var SkipVer0 = "160000.82000";
		var back = FExtension.GET_localStorage("SL_show_back")
		FExtension.store.set("SL_show_back2", back);
		chrome.storage.local.set({'SL_show_back2': back});

		ImTranslatorBG.PREVIOUS_VERSION=FExtension.GET_localStorage("SL_Version");
               	ImTranslatorBG.CURRENT_VERSION=version;

		if(FExtension.GET_localStorage("SL_Version") != SkipVer0){

			if(FExtension.GET_localStorage("SL_Version") != version) { 
				FExtension.store.setDefault();
				FExtension.store.set("SL_Version", version);
				chrome.storage.local.set({'SL_Version': version});
				FExtension.store.set("ADV", "1");
				chrome.storage.local.set({'ADV': '1'});
			} else { 
				if(FExtension.GET_localStorage("ADV") == "1") { 
					FExtension.store.set("ADV", "0");
					chrome.storage.local.set({'ADV': '0'});
					ImTranslatorBG.SL_RunWelcomePage(); 
				}
			}
		}// else 
		ImTranslatorBG.getUPDATES();

		// if pop-up bubble is disabled - the preferred translation becomes gray-out. If previously preferred translation was set as the pop-up bubble than activates the first translator in the list (ImTranslator).
                if(FExtension.GET_localStorage("SL_ENABLE") == "false" && FExtension.GET_localStorage("SL_PrefTrans")==3){
			FExtension.store.set("SL_PrefTrans", 1);
			chrome.storage.local.set({'SL_PrefTrans': '1'});
		}


		// RESET FORMER CS

			//BBL SESSION RESET

			FExtension.store.set("SL_Flag", "FALSE");
			chrome.storage.local.set({'SL_Flag': 'FALSE'});

			FExtension.store.set("BL_T_PROV", "");
			chrome.storage.local.set({'BL_T_PROV': ''});
			FExtension.store.set("BL_D_PROV", "");
			chrome.storage.local.set({'BL_D_PROV': ''});
			FExtension.store.set("SL_langSrc_bbl2", FExtension.store.get("SL_langSrc"));
			chrome.storage.local.set({'SL_langSrc_bbl2': FExtension.store.get("SL_langSrc")});
			FExtension.store.set("SL_langDst_bbl2", FExtension.store.get("SL_langDst"));
			chrome.storage.local.set({'SL_langDst_bbl2': FExtension.store.get("SL_langDst")});
			FExtension.store.set("SL_Fontsize_bbl2", FExtension.store.get("SL_Fontsize"));
			chrome.storage.local.set({'SL_Fontsize_bbl2': FExtension.store.get("SL_Fontsize")});
			if(FExtension.store.get("SL_pin_bbl")!="true"){
				FExtension.store.set("SL_BBL_X", 0);
				chrome.storage.local.set({'SL_BBL_X': 0});
				FExtension.store.set("SL_BBL_Y", 0);
				chrome.storage.local.set({'SL_BBL_Y': 0});
			}
			FExtension.store.set("SL_pin_bbl2",FExtension.store.get("SL_pin_bbl"));
			chrome.storage.local.set({'SL_pin_bbl2': FExtension.store.get("SL_pin_bbl")});
			if(FExtension.store.get("SL_no_detect_bbl") != "true") {
				FExtension.store.set("SL_bbl_loc_langs", "true");
				chrome.storage.local.set({'SL_bbl_loc_langs': 'true'});
			}else{
				FExtension.store.set("SL_bbl_loc_langs", "false");
				chrome.storage.local.set({'SL_bbl_loc_langs': 'false'});
			}
			FExtension.store.set("SL_show_button_bbl2", FExtension.store.get("SL_show_button_bbl"));
			chrome.storage.local.set({'SL_show_button_bbl2': FExtension.store.get("SL_show_button_bbl")});
			FExtension.store.set("SL_langDst_it2", FExtension.store.get("SL_langDst_it"));
			chrome.storage.local.set({'SL_langDst_it2': FExtension.store.get("SL_langDst_it")});

			//PLANSHET
			FExtension.store.set("SL_langSrc2", FExtension.store.get("SL_langSrc"));
			chrome.storage.local.set({'SL_langSrc2': FExtension.store.get("SL_langSrc")});
			FExtension.store.set("SL_langDst2", FExtension.store.get("SL_langDst"));
			chrome.storage.local.set({'SL_langDst2': FExtension.store.get("SL_langDst")});
			FExtension.store.set("SL_Fontsize2", FExtension.store.get("SL_Fontsize"));
			chrome.storage.local.set({'SL_Fontsize2': FExtension.store.get("SL_Fontsize")});

			FExtension.store.set("PLT_PROV", FExtension.store.get("Google"));
			chrome.storage.local.set({'PLT_PROV': FExtension.store.get("Google")});
			FExtension.store.set("PLD_DPROV", FExtension.store.get("Google"));
			chrome.storage.local.set({'PLD_DPROV': FExtension.store.get("Google")});

			if(FExtension.store.get("SL_langSrc")=="auto" || FExtension.store.get("SL_no_detect")=="true") {
				FExtension.store.set("LOC_box", FExtension.store.get("false"));
				chrome.storage.local.set({'LOC_box': FExtension.store.get("false")});
			}


			// Reset FAVs to default
			ImTranslatorBG.SL_SAVE_FAVORITE_LANGUAGES(FExtension.store.get("SL_langDst"),"SL_FAV_LANGS_IMT");
			ImTranslatorBG.SL_SAVE_FAVORITE_LANGUAGES(FExtension.store.get("SL_langDst_bbl"),"SL_FAV_LANGS_BBL");
			ImTranslatorBG.SL_SAVE_FAVORITE_LANGUAGES(FExtension.store.get("SL_langDst_it"),"SL_FAV_LANGS_IT");
			// Reset FAVs to default

			localStorage["WINDOW_WIDTH"] = 555;
  			chrome.storage.local.set({'WINDOW_WIDTH': 555});

			localStorage["WINDOW_HEIGHT"] = 670;//540;
	  		chrome.storage.local.set({'WINDOW_HEIGHT': 670});

			localStorage["SL_Dtext"] = "";
	  		chrome.storage.local.set({'SL_Dtext': ''});





		// RESET FORMER CS




		browser.contextMenus.onClicked.addListener((info, tab) => {
		  switch(info.menuItemId){
			 case "m1": ImTranslatorBG.ContMenuClick(info, tab, 0); break;
			 case "m2": ImTranslator_inliner.inlinerContextOnClick(info, tab); break;
			 case "m3": ImTranslatorBG.SL_PopUpBubble(info, tab); break;
			 case "m4": ImTranslatorBG.ContMenuClick(info, tab, 1); break;
			 case "m5": ImTranslatorBG.SL_WEB_PAGE_TRANSLATION_PRELOAD(info, tab, ""); break;
			 case "m6": ImTranslatorBG.SL_WEB_PAGE_TRANSLATION_MO_PRELOAD(info, tab, ""); break;
			 case "m7": ImTranslatorBG.SL_SET_TRANSLATION_LNG(info, tab); break;
			 case "m8": ImTranslator_inliner.inlinerContextClearOnClick(info, tab); break;
			 case "m9": ImTranslator_inliner.inlinerContextShowOnClick(info, tab); break;
		  } 
		});

                ImTranslatorBG.SL_ChangeRightClickMenu2();

		ImTranslatorBG.LOC_TABLE();
		
		ImTranslator_inliner.init();


		FExtension.browser.addOnMessageListener(
				ImTranslatorBG.onMessage
			);

		FExtension.browser.addOnMessageListener(
				ImTranslatorBG.ClearMessage
			);

		FExtension.browser.addOnMessageListener(
				ImTranslatorBG.Status
			);

		FExtension.browser.addOnMessageListener(
				ImTranslatorBG.resetContextMenu
			);


	        if(FExtension.GET_localStorage("SL_GVoices")=="1") ImTranslatorBG.ALLvoices=G_TTS;
	        else ImTranslatorBG.ALLvoices=SL_TTS;

	  


	},

        SLhandleClick: function(){
        	ImTranslatorBG.ContMenuClick(chrome.info, chrome.tabs, 0);
	},

	NewTAB: function(url) {
	 FExtension.browser.openNewTab(url);
	},

	getUPDATES: function(){
	        FExtension.store.getUPDATES();
	},

	LOC_TABLE: function(){
	          var loc = chrome.i18n.getUILanguage();
		  var loc_backup = loc;
               	  if(FExtension.GET_localStorage('SL_LOCALIZATION')==undefined || FExtension.GET_localStorage('SL_LOCALIZATION')=="none") loc = FExtension.GET_localStorage('SL_LOCALIZATION') ;

	          if(loc=="undefined") {
			loc = loc_backup;
		  }
	          var layers="en,zh,zt,cs,nl,tl,fr,de,el,hi,it,ja,ko,pl,pt,ro,ru,sr,es,sv,tr,uk,vi,bg,sk";
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
				chrome.storage.local.set({'SL_LOCALIZATION': loc});
			  }else{
				FExtension.store.set("SL_LOCALIZATION","en");
				chrome.storage.local.set({'SL_LOCALIZATION': 'en'});
			  }
		      } else {
				FExtension.store.set("SL_LOCALIZATION",loc);
				chrome.storage.local.set({'SL_LOCALIZATION': loc});
		      }
        	   } else {
                	loc=FExtension.GET_localStorage("SL_LOCALIZATION");
			if(loc=="undefined") loc = loc_backup;
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
		        if(loc=="zt") loc="zt";
			if(layers.indexOf(loc)==-1) {
				FExtension.store.set("SL_LOCALIZATION","en");
				chrome.storage.local.set({'SL_LOCALIZATION': 'en'});
			} else {
				FExtension.store.set("SL_LOCALIZATION",loc);
				chrome.storage.local.set({'SL_LOCALIZATION': loc});
			}
		   }

	},

        TO_LANGS: function(loc){
             if(FExtension.store.get("SL_langDst")){
		FExtension.store.set("SL_langDst",loc);
		chrome.storage.local.set({'SL_langDst': loc});
		FExtension.store.set("SL_langDst2",loc);
		chrome.storage.local.set({'SL_langDst2': loc});
	     }	
             if(FExtension.store.get("SL_langDst_bbl")){
		FExtension.store.set("SL_langDst_bbl",loc);
		chrome.storage.local.set({'SL_langDst_bbl': loc});
		FExtension.store.set("SL_langDst_bbl2",loc);
		chrome.storage.local.set({'SL_langDst_bbl2': loc});
	     }	
             if(FExtension.store.get("SL_langDst_it")){
		FExtension.store.set("SL_langDst_it",loc);
		chrome.storage.local.set({'SL_langDst_it': loc});
		FExtension.store.set("SL_langDst_it2",loc);
		chrome.storage.local.set({'SL_langDst_it2': loc});
            }
        },

	Lexicon: function(LongLngName) {
	 LongLngName=LongLngName.replace("ька","ьку");
	 return LongLngName;
	},


	
	ClearMessage: function(request, sender, sendResponse) {

	    if (request.greeting == "Clear")  ImTranslatorBG.SL_callbackRequestToAdd_Clear();
	    else{
		if(PLATFORM=="Chrome")  ImTranslatorBG.SL_callbackRequestToRemove_Clear();
	    }

	},




	onMessage: function(request, sender, sendResponse) {

		FExtension.browser.executeForSelectedTab(null, function(tab) { 
			if(tab){
				FExtension.store.set("THE_URL", tab.url);
				chrome.storage.local.set({'THE_URL': tab.url});
			}
		});


//VK REQUEST
		sendResponse({farewell: FExtension.store.get("SL_HKset")+"~"+FExtension.store.get("SL_HKset_inv")+"~"+FExtension.store.get("SL_langSrc_bbl")+"|"+FExtension.store.get("SL_langDst_bbl")+"|"+FExtension.store.get("SL_Fontsize_bbl")+"|"+FExtension.store.get("SL_show_button_bbl")+"|"+FExtension.store.get("SL_pin_bbl")+"|"+FExtension.store.get("SL_translation_mos_bbl")+"|"+FExtension.store.get("SL_MOSHK_bbl")+"|"+FExtension.store.get("SL_no_detect_bbl")+"|"+FExtension.store.get("SL_TS")+"|"+FExtension.store.get("SL_ENABLE")+"|"+FExtension.store.get("SL_TH_2")+"|"+FExtension.store.get("SL_TH_4")+"|"+FExtension.store.get("SL_translatorFK")+"|"+FExtension.store.get("SL_no_detect_it")+"|"+FExtension.store.get("SL_dict_bbl")+"|"+FExtension.store.get("SL_MOSHK_bbl2")+"|"+FExtension.store.get("SL_translatorFK_inv")+"~"+FExtension.store.get("SL_FK_box1")+"|"+FExtension.store.get("SL_inlinerFK1")+"|"+FExtension.store.get("SL_shortcutInliner")+"~"+FExtension.store.get("SL_FK_box2")+"|"+FExtension.store.get("SL_inlinerFK2")+"|"+FExtension.store.get("SL_shortcutClean")+"|"+FExtension.store.get("SL_DBL_bbl")+"~"+FExtension.store.get("SL_HK_gt1")+"~"+FExtension.store.get("SL_HK_gt2")+"~"+FExtension.store.get("SL_HK_it1")+"~"+FExtension.store.get("SL_HK_it2")+"~"+FExtension.store.get("SL_HK_bb1")+"~"+FExtension.store.get("SL_other_bbl")+"~"+FExtension.store.get("SL_Timing")+"~"+FExtension.store.get("SL_Fontsize_bbl")+"~"+FExtension.store.get("SL_BBL_TS")+"~"+FExtension.store.get("SL_HK_wpt1")+"~"+FExtension.store.get("SL_HK_wpt2")+"~"+FExtension.store.get("SL_HK_opt")+"~"+FExtension.store.get("SL_HK_wptbox1")+"~"+FExtension.store.get("SL_HK_wptbox2")+"~"+FExtension.store.get("SL_HK_optbox")+"~"+FExtension.store.get("SL_langDst_wpt")+"~"+FExtension.store.get("SL_langSrc_wpt")+"~"+FExtension.store.get("SL_LOCALIZATION")+"~"+FExtension.store.get("SL_TS_LOC")+"~"+FExtension.store.get("SL_Flag")+"~"+FExtension.store.get("SL_GVoices")+"~"+FExtension.store.get("SL_SLVoices")+"~"+ImTranslatorBG.ALLvoices+"~"+FExtension.store.get("SL_SaveText_box_bbl")+"~"+FExtension.store.get("SL_LNG_LIST")+"~"+FExtension.store.get("SL_BACK_VIEW")+"~"+FExtension.store.get("SL_tr_hk_btn")+"~"+FExtension.store.get("SL_tr_hk")+"~"+FExtension.store.get("SL_DOM")+"~"+FExtension.store.get("SL_ALL_PROVIDERS_BBL")+"~"+FExtension.store.get("SL_DICT_PRESENT")+"~"+FExtension.store.get("SL_HK_bb2")+"~"+FExtension.store.get("SL_HK_bb2box")+"~"+FExtension.store.get("SL_BTN_X")+"~"+FExtension.store.get("SL_BTN_Y")+"~"+FExtension.store.get("SL_BBL_X")+"~"+FExtension.store.get("SL_BBL_Y")+"~"+FExtension.store.get("FORSEbubble")+"~"+FExtension.store.get("BL_D_PROV")+"~"+FExtension.store.get("BL_T_PROV")+"~"+FExtension.store.get("INLINEflip")+"~"+FExtension.store.get("SL_ALL_PROVIDERS_IT")+"~"+FExtension.store.get("THEMEmode")+"~"+FExtension.store.get("SL_Delay")+"~"+FExtension.store.get("SL_langSrc_bbl2")+"~"+FExtension.store.get("SL_langDst_bbl2")+"~"+FExtension.store.get("SL_show_button_bbl2")+"~"+FExtension.store.get("SL_Fontsize_bbl2")+"~"+FExtension.store.get("SL_bbl_loc_langs")+"~"+FExtension.store.get("SL_change_lang_HKbox_it")+"~"+FExtension.store.get("SL_change_lang_HK_it")+"~"+FExtension.store.get("SL_langDst_it2")+"~"+FExtension.store.get("SL_pin_bbl2")+"~"+ImTranslatorBG.BaseGTK+"~"+FExtension.store.get("SL_GAPI1")+"~"+FExtension.store.get("SL_GAPI1_ts")+"~"+FExtension.store.get("SL_GAPI2")+"~"+FExtension.store.get("SL_GAPI2_ts")+"~"+FExtension.store.get("SL_YKEY")+"~"+FExtension.store.get("MoveBBLX")+"~"+FExtension.store.get("MoveBBLY")+"~"+FExtension.store.get("SL_FAV_START")+"~"+FExtension.store.get("SL_FAV_MAX")+"~"+FExtension.store.get("SL_FAV_LANGS_BBL")+"~"+FExtension.store.get("SL_FAV_LANGS_IT")+"~"+FExtension.store.get("SL_UNTRUST") });
		var RESP = request.greeting;
		if (RESP != "" && RESP!="1" && RESP!=FExtension.store.getLocalStorage().length){
			RESP = RESP.replace(/toolbarButtonRightClickText:~/ig,"");
			RESP = RESP.replace(/resetContextMenu1/ig,"");
			RESP = RESP.replace(/resetContextMenu2/ig,"");
			RESP=(RESP + "").replace("{empty}",FExtension.store.get("SL_langSrc_wpt")+"|"+FExtension.store.get("SL_langDst_wpt"));
	                if(RESP.length && RESP.length>10 && RESP.indexOf("hist:>")!=-1) {
			    RESP = RESP.replace(/hist:>/ig,"");
        	            FExtension.store.set("SL_History", RESP + FExtension.store.get("SL_History"));
			    chrome.storage.local.set({'SL_History': RESP + FExtension.store.get("SL_History")});
                	}


			if(request.greeting && request.greeting.indexOf("SAVE_COORD:>") !=-1) {
			        var COORDS = request.greeting.replace("SAVE_COORD:>","");
				var SAVE_COORDS = COORDS.split(",");
			        FExtension.store.set("SL_BBL_X", SAVE_COORDS[0]);
				chrome.storage.local.set({'SL_BBL_X': SAVE_COORDS[0]});
			        FExtension.store.set("SL_BBL_Y", SAVE_COORDS[1]);
				chrome.storage.local.set({'SL_BBL_Y': SAVE_COORDS[1]});
			}



			if(request.greeting && request.greeting.indexOf("SAVE_DATA:>") !=-1) {
			        var TMPDATA = request.greeting.replace("SAVE_DATA:>","");
				var SAVE_TMPDATA = TMPDATA.split(":");
			        FExtension.store.set(SAVE_TMPDATA[0], SAVE_TMPDATA[1]);
				chrome.storage.local.set({'+SAVE_TMPDATA[0]+': SAVE_TMPDATA[1]});
			}

			if(request.greeting && request.greeting.indexOf("PUSH:>") !=-1) {
				var text = request.greeting.replace("PUSH:>","");
                                ImTranslatorBG.PUSH_TXT=text;
				ImTranslatorBG.ContMenuClick("","",0,ImTranslatorBG.PUSH_TXT);
			}

			if(request.greeting && request.greeting.indexOf("SES:>") !=-1) {
		        	var SES_DATA_all = request.greeting.replace("SES:>","");
				var SES_DATA = SES_DATA_all.split(",");
			        FExtension.store.set("SL_langSrc_bbl2", SES_DATA[0]);
				chrome.storage.local.set({'SL_langSrc_bbl2': SES_DATA[0]});
			        FExtension.store.set("SL_langDst_bbl2", SES_DATA[1]);
				chrome.storage.local.set({'SL_langDst_bbl2': SES_DATA[1]});
		        	var FNT = SES_DATA[2];
				if(FNT != undefined && FNT != ""){
					FExtension.store.set("SL_Fontsize_bbl2", FNT);
					chrome.storage.local.set({'SL_Fontsize_bbl2': FNT});
				}
			        FExtension.store.set("SL_pin_bbl2", SES_DATA[3]);
				chrome.storage.local.set({'SL_pin_bbl2': SES_DATA[3]});
			        FExtension.store.set("SL_bbl_loc_langs", SES_DATA[4]);
				chrome.storage.local.set({'SL_bbl_loc_langs': SES_DATA[4]});
		        	FExtension.store.set("SL_show_button_bbl2", SES_DATA[5]);
				chrome.storage.local.set({'SL_show_button_bbl2': SES_DATA[5]});
			}



			if(request.greeting && request.greeting.indexOf("SES_IT:>") !=-1) {
			        var SES_DATA_all = request.greeting.replace("SES_IT:>","");
				var SES_DATA = SES_DATA_all.split(",");
			        FExtension.store.set("SL_langDst_it2", SES_DATA[0]);
				chrome.storage.local.set({'SL_langDst_it2': SES_DATA[0]});
				FExtension.store.set("SL_langDst_name_it", ImTranslatorBG.GetLongLanguageName(SES_DATA[0]));
				chrome.storage.local.set({'SL_langDst_name_it': ImTranslatorBG.GetLongLanguageName(SES_DATA[0])});
				//ImTranslatorBG.SL_callbackRequest4LOC();
			}





			if(request.greeting && request.greeting.indexOf("CNTR:>") !=-1) {
				var params = request.greeting.replace("CNTR:>","");
				var CNTR = params.split(",");
                                ImTranslatorBG.DO_CNTR(CNTR[0],CNTR[1],CNTR[2]);
			}


			if(request.greeting && request.greeting.indexOf("CNTRP:>") !=-1) {
				var params = request.greeting.replace("CNTRP:>","");
				var CNTRP = params.split(",");
                                ImTranslatorBG.DO_CNTR_P(CNTRP[0],CNTRP[1],CNTRP[2]);
			}


			if(request.greeting && request.greeting.indexOf("YKEY:>") !=-1) {
			        var YKEY_DATA = request.greeting.replace("YKEY:>","");
			        FExtension.store.set("SL_YKEY", YKEY_DATA);
				chrome.storage.local.set({'SL_YKEY': YKEY_DATA});
			}

			if(request.greeting && request.greeting.indexOf("FAV_BBL:>") !=-1) {
			        var FAV_all = request.greeting.replace("FAV_BBL:>","");
			        FExtension.store.set("SL_FAV_LANGS_BBL", FAV_all);
				chrome.storage.local.set({'SL_FAV_LANGS_BBL': FAV_all});
			}

			if(request.greeting && request.greeting.indexOf("FAV_IT:>") !=-1) {
			        var FAV_all = request.greeting.replace("FAV_IT:>","");
			        FExtension.store.set("SL_FAV_LANGS_IT", FAV_all);
				chrome.storage.local.set({'SL_FAV_LANGS_IT': FAV_all});
			}
			if(request.greeting && request.greeting.indexOf("RCM:>") !=-1) {
				ImTranslatorBG.PREPARE_RCM_CONTENT();
			}



		}
                if(FExtension.store.get("SL_TS_LOC")==1){
			FExtension.store.set("SL_TS_LOC",0);
			chrome.storage.local.set({'SL_TS_LOC': 0});
		}
//VK REQUEST
	},


	Status: function(request, sender, sendResponse) {
	    if (request.method == "getStatus"){
		sendResponse({status: FExtension.store.set("SL_Flag","TRUE")});
		chrome.storage.local.set({'SL_Flag': 'true'});
	    }
	},

        resetContextMenu: function(request, sender, sendResponse) {
	    if (request.greeting == "resetContextMenu1") {
	                ImTranslatorBG.SL_ChangeRightClickMenu1();
	    }
	    if (request.greeting == "resetContextMenu2") {
	                ImTranslatorBG.SL_ChangeRightClickMenu2();
	    }

	    if (request.greeting && request.greeting.indexOf("CM_BBL:>") !=-1) {
		        var TMPDATA = request.greeting.replace("CM_BBL:>","");			
                        ImTranslatorBG.SL_BBL_Reset(TMPDATA);
	    }

	    if (request.greeting.indexOf("toolbarButtonRightClickText:~")!=-1) {
	                var tempArray = request.greeting.split("toolbarButtonRightClickText:~");
	                var TEXT = tempArray[1];
			FExtension.store.set('SL_Dtext', TEXT);
			chrome.storage.local.set({'SL_Dtext': TEXT});

	    }
	    
	  
	},



	SL_ChangeRightClickMenu1: function(){	
			var removing = browser.contextMenus.removeAll();
			if(FExtension.GET_localStorage("SL_CM1")==1){
				ImTranslatorBG.the_ID1 = browser.contextMenus.create({
				  "id": "m1",
				  "title": "ImTranslator: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+ " " +ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name"))
				});

			}
			if(FExtension.GET_localStorage("SL_CM4")==1){
				ImTranslatorBG.the_ID4 = browser.contextMenus.create({
				  "id": "m4",
				  "title": "Translator: " + FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+ " " +ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_tr"))
				});
			}

			if(FExtension.GET_localStorage("SL_CM2")==1){
				ImTranslatorBG.the_ID6 = browser.contextMenus.create({
				  "id": "m2",
				  "title": "Inline Translator: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+ " "+ ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_it"))
				});

			}
			if(FExtension.GET_localStorage("SL_CM3")==1){
				if(FExtension.GET_localStorage("SL_ENABLE")=='true'){
					ImTranslatorBG.the_ID5 = browser.contextMenus.create({
					  "id": "m3",
					  "title": "Pop-Up Bubble: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+" " + ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_bbl"))
					});
				}
			}
	},

	SL_ChangeRightClickMenu2: function(){
			FExtension.store.save_LOC4CONTEXT();
			var removing = browser.contextMenus.removeAll();
			if(FExtension.GET_localStorage("SL_CM1")==1){
				ImTranslatorBG.the_ID1 = browser.contextMenus.create({
				  "id": "m1",
				  "title": "ImTranslator"
				});
			}
			if(FExtension.GET_localStorage("SL_CM4")==1){
				ImTranslatorBG.the_ID4 = browser.contextMenus.create({
				  "id": "m4",
				  "title": "Translator"
				});
			}

			if(FExtension.GET_localStorage("SL_CM5")==1){
				ImTranslatorBG.the_ID2 = browser.contextMenus.create({
				  "id": "m5",
				  "title": FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransPageTo')+ " " +ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_wpt"))
				});
			}
			if(FExtension.GET_localStorage("SL_CM6")==1){
				ImTranslatorBG.the_ID3 = browser.contextMenus.create({
				  "id": "m6",
				  "title": FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMMouseOverTransTo') + " " +ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_wpt"))
				});
			}
			if(FExtension.GET_localStorage("SL_CM7")==1){
				ImTranslatorBG.the_ID9 = browser.contextMenus.create({
				  "id": "m7",
				  "title": FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extOptions') + " ("+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMcl') +")"
				});
			}
	},

	setDefault: function(){
	        FExtension.store.ResetToDefault();
	},


        SL_callbackRequestToAdd_Clear: function(){
		if(FExtension.GET_localStorage("SL_hide_translation")=="true"){
			ImTranslatorBG.the_ID7 = browser.contextMenus.create({
			  "id": "m9",
			  "title": FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMsot')
			});
		}
		if(FExtension.GET_localStorage("SL_CM8")==1){        
			ImTranslatorBG.the_ID8 = browser.contextMenus.create({
			  "id": "m8",
			  "title": FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMct')
			});
		}
	},

	SL_callbackRequestToRemove_Clear: function(){
	},

	SL_callbackRequest: function(){		
	},



	SL_callbackRequest2: function(){
	},
	SL_callbackRequest2_: function(){
	},


	SL_callbackRequest3: function(){
	},

	SL_callbackRequest4: function(){
	},


	SL_PopUpBubble: function(info, tab){

	    try{
		var ST = 0;
		if(tab.id==-1) ST=1;   
		if(tab.url.toLowerCase().indexOf("extension://")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf(".pdf")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("chrome://extensions/")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("addons.opera.com/")!=-1 && tab.url.indexOf("/extensions")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("addons.mozilla.org/")!=-1 && tab.url.indexOf("/firefox")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("mensuel.framapad.org")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("oasis.sandstorm.io")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("chrome.google.com/webstore/")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("etherpad.org")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("pad.mozilla.")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("about:")!=-1 && tab.url.toLowerCase().indexOf("://")==-1) ST=1;
		if(tab.url.toLowerCase().indexOf("chrome://settings/")!=-1) ST=1;
		if(tab.url.toLowerCase().indexOf("file:///")!=-1) ST=1;
		if(ST==1){
                      ImTranslatorBG.ContMenuClick(info,tab,0);
		}else{
			 chrome.tabs.executeScript(tab.id, {
			    code: 'TranslatorIM.SL_BUBBLE_FROM_CM(window.e, 0);'
			 });
		}		
	   }catch(ex){
		 chrome.tabs.executeScript(tab.id, {
		    code: 'TranslatorIM.SL_BUBBLE_FROM_CM(window.e, 0);'
		 });
	   }
	},


	SL_WEB_PAGE_TRANSLATION_PRELOAD: function(info, tab){
		 chrome.tabs.executeScript(tab.id, {
		    code: 'TranslatorIM.SL_WEB_PAGE_TRANSLATION(0);'
		 });		
	},

	SL_WEB_PAGE_TRANSLATION_MO_PRELOAD: function(info, tab){
		 chrome.tabs.executeScript(tab.id, {
		    code: 'TranslatorIM.SL_WEB_PAGE_TRANSLATION(1);'
		 });		
	},


	SL_callbackRequest4LOC: function(){
	},

	GetLongLanguageName: function(code){
		var temp=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLanguages').split(',');
		var lng="";
		var output="Spanish";
		for(var i=0; i<temp.length; i++){
			lng=temp[i].split(":");
		 	if(lng[0]==code) {
				output=lng[1]; 
				break;
			}
		}
		return (output);
       	},



	ContMenuClick: function(info, tab, st, txt) {
		var s = txt;
	        var s="~und~";
        	if(typeof info != "undefined"){
	            s=String(info.selectionText);
	        } else {
        	    s=String(FExtension.browser.getSelectionText());
	        }
//		s = encodeURIComponent(s);
//	s = decodeURIComponent(encodeURIComponent(s).replace(/%20%20/ig,"%0D%0D"));
//		s = s.replace(/Â/ig,"");

		if(txt!="" && txt!=undefined) s=txt;
		  if(s=='~und~' || s=="undefined") s="";
		  s=s.replace(/(^[\s]+|[\s]+$)/g, '');
		  var ss=s;

		  var theQ=s.split(" ").length;
		  if (theQ==1) theQ=s.split("\n").length;
		  if(s.match(/[$-/‧·﹕﹗！：，。﹖？:-?!.,:{-~!"^_`\[\]]/g)!=null) theQ=100;
		  if(FExtension.GET_localStorage("SL_dict")=="false") theQ=100;
 		  if(s.match(/[\u3400-\u9FBF]/) && s.length>1) theQ=100;
 		  if(ImTranslatorBG.DIC_TRIGGER != 0) theQ = 100;
		  if(FExtension.GET_localStorage("SL_SaveText_box_gt")==1 && s!="") {
		        s=s.replace("undefined","");
			FExtension.store.set("SL_SavedText_gt",s);
			chrome.storage.local.set({'SL_SavedText_gt': s});
		  }

		  var winWidth = FExtension.GET_localStorage("WINDOW_WIDTH")*1+10;//495;
			s=s.replace(/%/g,"^");
			s=encodeURIComponent(s);

		  if(st == 0){
		    if(theQ==1 && s!=""){
			var popupURL = "../content/html/popup/dictionary.html?text=" + s;
		    } else {
			var popupURL = "../content/html/popup/translator.html?text=" + s;
		    }
		  }else{
			//ss=decodeURIComponent(ss);
		        ss=ss.replace("undefined","");
			winWidth = FExtension.GET_localStorage("WINDOW_WIDTH")*1+10;//555

		        var dir = FExtension.GET_localStorage("SL_langSrc_tr")+"/"+FExtension.GET_localStorage("SL_langDst_tr");
			var loc = FExtension.GET_localStorage("SL_LOCALIZATION");
			var ver = FExtension.GET_localStorage("SL_Version");
			var adet = FExtension.GET_localStorage("SL_tr_detect");
			if(adet == "true" || FExtension.GET_localStorage("SL_langSrc_tr") == "auto") adet="1";
			else adet="0";
			var a_s = FExtension.GET_localStorage("SL_tr_speller");
			if(a_s == "true") a_s="1";
			else a_s="0";

			var ad = FExtension.GET_localStorage("SL_tr_decoder");
			if(ad == "true") ad="1";
			else ad="0";

			var ab = FExtension.GET_localStorage("SL_tr_back");
			if(ab == "true") ab="1";
			else ab="0";
			var at = FExtension.GET_localStorage("SL_tr_russtr");
			if(at == "true") at="1";
			else at="0";
			var adi = FExtension.GET_localStorage("SL_tr_dictionary");
			if(adi == "true") adi="1";
			else adi="0";
			var prvd= FExtension.GET_localStorage("SL_tr_ptp");

			ss = ss.substring (0, 3000);

			popupURL = ImTranslatorBG.ImTranslator_URL + "?op=y&adet="+adet+"&a_s="+a_s+"&ad="+ad+"&ab="+ab+"&at="+at+"&gon=0&adi="+adi+"&v=" + ver + "&dir=" + dir +"&loc=" + loc +"&prvd=" + prvd +"&text=" + escape(ss); 
		  }

		  var BACK_VIEW=FExtension.GET_localStorage("SL_BACK_VIEW");
		  

		  if(BACK_VIEW==2) var winHeight = FExtension.GET_localStorage("WINDOW_HEIGHT")*1;//540;
		  if(BACK_VIEW==1){
			var winHeight = FExtension.GET_localStorage("WINDOW_HEIGHT")*1;//670;
			if(winHeight < 670)  winHeight=670;
		  }
                                                   

		  if(FExtension.store.get("SL_show_back2")=="false") winHeight = FExtension.GET_localStorage("WINDOW_HEIGHT")*1;//540;


		  if(ImTranslatorBG.myWindowID){
			browser.windows.remove(ImTranslatorBG.myWindowID);
		  }
		  ImTranslatorBG.myWindow = browser.windows.create({
		    url: popupURL,
		    width: winWidth,
		    height: winHeight,
		    type: "popup"		    
		  });

	    	setTimeout(function(){
		  ImTranslatorBG.myWindow.then(ImTranslatorBG.onCreated, ImTranslatorBG.onError);
	        },350); //WAS 500 ms
	},



	
	onUpdated: function (windowInfo) {	  
	  console.log(`Updated window: ${windowInfo.id}`);
	},

	onCreated: function(windowInfo) {
	    ImTranslatorBG.myWindowID=windowInfo.id;
	},

	onError: function (error) {
	  console.log(`Error: ${error}`);
	},



	
	SL_WEB_PAGE_TRANSLATION_MO: function (info, tab, url, sl) {
		var URL_host= FExtension.browser.getCurrentUrl(tab);
		if (url!="") URL_host=url;
		var langS=FExtension.GET_localStorage("SL_langSrc_wpt");

		langS=sl;
		var langD=FExtension.GET_localStorage("SL_langDst_wpt");

		//FLIP
		if(langS == langD && FExtension.GET_localStorage("SL_langSrc_wpt")!="auto") langD = FExtension.GET_localStorage("SL_langSrc_wpt");
		if(langS == langD) langS="auto";
		var LEGO=URL_host.split("&u=");
		if(LEGO.length>1){
			var newLANG1=LEGO[0].split("&tl=");
			var FINALline=newLANG1[0]+"&tl="+langD;
			URL_host=FINALline+"&u="+LEGO[1];
		}
		var GOhead=0;
/*
		if(URL_host.indexOf("https://")>-1) {
			alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extWPTalert1'));GOhead=1;
		}
*/
		if(URL_host.indexOf("file:///")>-1) {
			alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extWPTalert2'));GOhead=1;
		}

		if(GOhead==0){
			var dom = FExtension.store.get("SL_DOM");
			if(dom == "auto") dom = "com";
//			ImTranslatorBG.THE_URL = "https://translate.google."+dom+"/translate?depth=1&hl="+chrome.i18n.getUILanguage()+"&rurl=translate.google.com&sl="+langS+"&tl="+langD+"&u="+URL_host;
			ImTranslatorBG.THE_URL = "https://translate.google."+dom+"/translate?hl="+FExtension.GET_localStorage("SL_LOCALIZATION")+"&sl="+langS+"&tl="+langD+"&u="+URL_host;

			if (FExtension.GET_localStorage("SL_TH_3")==1){
				var SLnow = new Date();
				SLnow=SLnow.toString();
	            		var TMPtime=SLnow.split(" ");
	            		var CurDT=TMPtime[1]+" "+TMPtime[2]+" "+TMPtime[3]+", "+TMPtime[4];
	            		var tp=3;
				ImTranslatorBG.THE_URL = decodeURIComponent(ImTranslatorBG.THE_URL);
				URL_host = decodeURIComponent(URL_host);
	            		FExtension.store.set("SL_History", URL_host + "~~" + ImTranslatorBG.THE_URL + "~~"+langS+"|"+langD+"~~"+ ImTranslatorBG.THE_URL+"~~"+CurDT+"~~"+tp+"^^" + FExtension.GET_localStorage("SL_History"));
              			chrome.storage.local.set({"SL_History": URL_host + "~~" + ImTranslatorBG.THE_URL + "~~"+langS+"|"+langD+"~~"+ ImTranslatorBG.THE_URL+"~~"+CurDT+"~~"+tp+"^^" + FExtension.GET_localStorage("SL_History")});
			}
			FExtension.browser.openNewTab(ImTranslatorBG.THE_URL);
		}
	},
	
	SL_WEB_PAGE_TRANSLATION: function(info, tab, url, sl) {
		var URL_host= FExtension.browser.getCurrentUrl(tab);
		if (url!="") URL_host=url;
		var langS=FExtension.GET_localStorage("SL_langSrc_wpt");
		langS=sl;

		var langD=FExtension.GET_localStorage("SL_langDst_wpt");
		//FLIP
		if(langS == langD && FExtension.GET_localStorage("SL_langSrc_wpt")!="auto") langD = FExtension.GET_localStorage("SL_langSrc_wpt");
		if(langS == langD) langS="auto";
		var LEGO=URL_host.split("&u=");
		if(LEGO.length>1){
			var newLANG1=LEGO[0].split("&tl=");
			var FINALline=newLANG1[0]+"&tl="+langD;
			URL_host=FINALline+"&u="+LEGO[1];
		}
		var GOhead=0;
/*
		if(URL_host.indexOf("https://")>-1) {
			alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extWPTalert1'));GOhead=1;
		}
*/
		if(URL_host.indexOf("file:///")>-1) {
			alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extWPTalert2'));GOhead=1;
		}
		if(GOhead==0){
			var dom = FExtension.store.get("SL_DOM");
			if(dom == "auto") dom = "com";
			ImTranslatorBG.THE_URL = "https://translate.google."+dom+"/translate?hl="+FExtension.GET_localStorage("SL_LOCALIZATION")+"&sl="+langS+"&tl="+langD+"&u="+URL_host;
			if (FExtension.GET_localStorage("SL_TH_3")==1){
				var SLnow = new Date();
				SLnow=SLnow.toString();
	            		var TMPtime=SLnow.split(" ");
	            		var CurDT=TMPtime[1]+" "+TMPtime[2]+" "+TMPtime[3]+", "+TMPtime[4];
	            		var tp=4;
				ImTranslatorBG.THE_URL = decodeURIComponent(ImTranslatorBG.THE_URL);
				URL_host = decodeURIComponent(URL_host);
	            		FExtension.store.set("SL_History", URL_host + "~~" + ImTranslatorBG.THE_URL + "~~"+langS+"|"+langD+"~~"+ ImTranslatorBG.THE_URL+"~~"+CurDT+"~~"+tp+"^^" + FExtension.GET_localStorage("SL_History"));
              			chrome.storage.local.set({"SL_History": URL_host + "~~" + ImTranslatorBG.THE_URL + "~~"+langS+"|"+langD+"~~"+ ImTranslatorBG.THE_URL+"~~"+CurDT+"~~"+tp+"^^" + FExtension.GET_localStorage("SL_History")});
			}
			FExtension.browser.openNewTab(ImTranslatorBG.THE_URL);
		}
	},

	SL_ResetCMplanshet: function(TMPDATA){
	        if (TMPDATA){
			var ln = ImTranslatorBG.GetLongLanguageName(TMPDATA);
			FExtension.store.set("SL_langDst_name", ln);
			chrome.storage.local.set({'SL_langDst_name': ln});
			ImTranslatorBG.SL_ChangeRightClickMenu1();
		}
	},



	SL_BBL_Reset: function(TMPDATA){
	        if (TMPDATA){
			var ln = ImTranslatorBG.GetLongLanguageName(TMPDATA);
			FExtension.store.set("SL_langDst_name_bbl", ln);
			chrome.storage.local.set({'SL_langDst_name_bbl': ln});
		}
	},
	
	SL_SET_TRANSLATION_LNG: function (info, tab){
		FExtension.browser.openNewTab(FExtension.browser.getPopUpURL("options-router.html", true));
	},

	SL_RunWelcomePage: function(){
		if (FExtension.GET_localStorage('ran_before')!="1") {
			ImTranslatorBG.first_run = true;  
			FExtension.store.set('ran_before', '1');
			chrome.storage.local.set({'ran_before': '1'});
		}

	 	var ADVurl= "https://imtranslator.net/Translator-For-Firefox-ImTranslator.asp";
	 	FExtension.store.loadNewParams();
	 	switch(ImTranslatorBG.ADVkey){
		  case 1: FExtension.browser.openNewTab(ADVurl); break;
		  case 2: if(ImTranslatorBG.first_run == true) FExtension.browser.openNewTab(ADVurl); break;
		  case 3: if(ImTranslatorBG.first_run == false) FExtension.browser.openNewTab(ADVurl); break;
		}
	},


	inlinerContextOnClick: function (info, tab){
			 chrome.tabs.executeScript(tab.id, {
			    code: 'TranslatorIM.inlinerContextOnClick(window.e, 0);'
			 });
	},

	Version: function(){
		var manifest = browser.runtime.getManifest();
		var version = manifest.version;
        	return(version);
	},

	DO_CNTR: function(code,dir,nmb){
		code = GLOB_CNTR + code.substring(1);

		var SLDImTranslator_url = "https://imtranslator.net/EXTENSIONS/cntr.asp?code="+code+"&dir="+dir+"&nmb="+nmb;
		var ajaxRequest;  
			try{
				ajaxRequest = new XMLHttpRequest();
			} catch (e){
				try{
					ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try{
						ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e){
						return false;
					}
				}
			}
		ajaxRequest.open("POST", SLDImTranslator_url, true);
		ajaxRequest.send(); 
	},

	DO_CNTR_P: function(code,dir,nmb){
		code = GLOB_CNTR + code.substring(1);

		var SLDImTranslator_url = "https://imtranslator.net/EXTENSIONS/cntr-p.asp?code="+code+"&dir="+dir+"&nmb="+nmb;
		var ajaxRequest;  
			try{
				ajaxRequest = new XMLHttpRequest();
			} catch (e){
				try{
					ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try{
						ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e){
						return false;
					}
				}
			}
		ajaxRequest.open("POST", SLDImTranslator_url, true);
		ajaxRequest.send(); 
	},

	SL_WorkingSet: function(){
	     try{
//			FExtension.store.save_LOC4CONTEXT();
		browser.contextMenus.removeAll(function() {

			if(FExtension.GET_localStorage("SL_CM1")==1){
				ImTranslatorBG.the_ID1 = browser.contextMenus.create({
				  "id": "m1",
				  "title": "ImTranslator: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+ " " +ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name"))
				});

			}
			if(FExtension.GET_localStorage("SL_CM4")==1){
				ImTranslatorBG.the_ID4 = browser.contextMenus.create({
				  "id": "m4",
				  "title": "Translator: " + FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+ " " +ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_tr"))
				});
			}

			if(FExtension.GET_localStorage("SL_CM2")==1){
				ImTranslatorBG.the_ID6 = browser.contextMenus.create({
				  "id": "m2",
				  "title": "Inline Translator: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+ " "+ ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_it"))
				});

			}


			if(FExtension.GET_localStorage("SL_CM3")==1){
				if(FExtension.GET_localStorage("SL_ENABLE")=='true'){
					ImTranslatorBG.the_ID5 = browser.contextMenus.create({
					  "id": "m3",
					  "title": "Pop-Up Bubble: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCMTransSel')+" " + ImTranslatorBG.Lexicon(FExtension.GET_localStorage("SL_langDst_name_bbl2"))
					});
				}
			}
		});

	    } catch (ex){}	
	},


	SL_SAVE_FAVORITE_LANGUAGES: function (ln, TR){
		var OUT = "";
		var OUT2 = "";
		var SL_FAV_LANGS = FExtension.store.get(TR);
		var SL_FAV_MAX = FExtension.store.get("SL_FAV_MAX");
		if(SL_FAV_LANGS!=null){
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
			chrome.storage.local.set({TR: OUT});
		}
	},


	PREPARE_RCM_CONTENT: function(){
		var ln="";
		var MENU = FExtension.store.get("SL_LNG_LIST");
		if (MENU != "all") {
		     if(MENU.length>=FExtension.store.get("SL_FAV_START")){

			var SL_FAV_LANGS = FExtension.store.get("SL_FAV_LANGS_IMT");
			if(SL_FAV_LANGS!=""){
				var favArr=SL_FAV_LANGS.split(","); 
			    	FExtension.store.set("SL_langDst2",favArr[0]);  
				chrome.storage.local.set({'SL_langDst2': favArr[0]});
				ln = ImTranslatorBG.GetLongLanguageName(favArr[0]);
			    	FExtension.store.set("SL_langDst_name",ln);  
				chrome.storage.local.set({'SL_langDst_name': ln});

			}


			var SL_FAV_LANGS = FExtension.store.get("SL_FAV_LANGS_IT");
			if(SL_FAV_LANGS!=""){
				var favArr=SL_FAV_LANGS.split(","); 
			    	FExtension.store.set("SL_langDst_it2",favArr[0]);  
				chrome.storage.local.set({'SL_langDst_it2': favArr[0]});
				ln = ImTranslatorBG.GetLongLanguageName(favArr[0]);
			    	FExtension.store.set("SL_langDst_name_it",ln);  
				chrome.storage.local.set({'SL_langDst_name_it': ln});

			}

			var SL_FAV_LANGS = FExtension.store.get("SL_FAV_LANGS_BBL");
			if(SL_FAV_LANGS!=""){
				var favArr=SL_FAV_LANGS.split(","); 
			    	FExtension.store.set("SL_langDst_bbl2",favArr[0]);  
				chrome.storage.local.set({'SL_langDst_bbl2': favArr[0]});
				ln = ImTranslatorBG.GetLongLanguageName(favArr[0]);
			    	FExtension.store.set("SL_langDst_name_bbl",ln);  
				chrome.storage.local.set({'SL_langDst_name_bbl': ln});
			}

		     }	
		} else {
			var SL_FAV_LANGS = FExtension.store.get("SL_FAV_LANGS_IMT");
			if(SL_FAV_LANGS!=""){
				var favArr=SL_FAV_LANGS.split(","); 
			    	FExtension.store.set("SL_langDst2",favArr[0]);  
				chrome.storage.local.set({'SL_langDst2': favArr[0]});
				ln = ImTranslatorBG.GetLongLanguageName(favArr[0]);
			    	FExtension.store.set("SL_langDst_name",ln);  
				chrome.storage.local.set({'SL_langDst_name': ln});

			}

			var SL_FAV_LANGS = FExtension.store.get("SL_FAV_LANGS_IT");
			if(SL_FAV_LANGS!=""){
				var favArr=SL_FAV_LANGS.split(","); 
			    	FExtension.store.set("SL_langDst_it2",favArr[0]);  
				chrome.storage.local.set({'SL_langDst_it2': favArr[0]});
				ln = ImTranslatorBG.GetLongLanguageName(favArr[0]);
			    	FExtension.store.set("SL_langDst_name_it",ln);  
				chrome.storage.local.set({'SL_langDst_name_it': ln});
			}

			var SL_FAV_LANGS = FExtension.store.get("SL_FAV_LANGS_BBL");
			if(SL_FAV_LANGS!=""){
				var favArr=SL_FAV_LANGS.split(","); 
			    	FExtension.store.set("SL_langDst_bbl2",favArr[0]);  
				chrome.storage.local.set({'SL_langDst_bbl2': favArr[0]});
				ln = ImTranslatorBG.GetLongLanguageName(favArr[0]);
			    	FExtension.store.set("SL_langDst_name_bbl",ln);  
				chrome.storage.local.set({'SL_langDst_name_bbl': ln});
			}

		}
		ImTranslatorBG.SL_ChangeRightClickMenu1();
	}



}


if(FExtension.browser && FExtension.browser.isLocalStoragePreset()){

/*
	var myVar = setInterval(BACKUP_DB, 100);
	function BACKUP_DB() {
		FExtension.GET_localStorage('LOC');
	}
*/
	setTimeout(function(){
		ImTranslatorBG.init();
	}, 500);


}




function connected(p) {

  portFromCS = p;
  portFromCS.postMessage({greeting: "hi there content script!"});
  portFromCS.onMessage.addListener(function(m) {

	if(m.greeting && m.greeting.indexOf("win:>") !=-1) ImTranslatorBG.ContMenuClick(chrome.info, chrome.tabs, 0, "");
	if(m.greeting && m.greeting.indexOf("win_text:>") !=-1){
	        var txt = m.greeting.replace("win_text:>","");
		FExtension.store.set('SL_Dtext', txt);
		chrome.storage.local.set({'SL_Dtext': txt});
		ImTranslatorBG.ContMenuClick(chrome.info, chrome.tabs, 0, txt);
	}
	if(m.greeting && m.greeting.indexOf("wpt1:>") !=-1) {
	        var str = m.greeting.replace("wpt1:>","");
	        str = str.split("*");
		ImTranslatorBG.SL_WEB_PAGE_TRANSLATION_MO(chrome.info, chrome.tabs, str[0], str[1]);
	}
	if(m.greeting && m.greeting.indexOf("wpt2:>") !=-1) {
	        var str = m.greeting.replace("wpt2:>","");
	        str = str.split("*");
		ImTranslatorBG.SL_WEB_PAGE_TRANSLATION(chrome.info, chrome.tabs, str[0], str[1]);
	}

	if(m.greeting && m.greeting.indexOf("opt:>") !=-1) {
		FExtension.browser.openNewTab(browser.runtime.getURL("content/html/options/options.html"));
	}

	if(m.greeting && m.greeting.indexOf("tr:>") !=-1){
	        var txt = m.greeting.replace("tr:>","");
		FExtension.store.set('SL_Dtext', txt);
		chrome.storage.local.set({'SL_Dtext': txt});
		ImTranslatorBG.ContMenuClick(chrome.info, chrome.tabs, 1, txt);
	}

	if(m.greeting && m.greeting.indexOf("optb:>") !=-1){
	        var txt = m.greeting.replace("optb:>","");
		FExtension.browser.openNewTab(browser.runtime.getURL("content/html/options/options.html?")+txt);
	}


		

  });
}

browser.runtime.onConnect.addListener(connected);
