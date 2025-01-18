//'use strict';
try{
TranslatorIM = {
	AVOID_SHADOW_ROOT_TEXT: "",
        SL_UNTRUST_WORD: "",
        SL_UNTRUST_TEXT: "",

	globaltheQ: "",
	CONTROL_SUM: "",
	YSID: "",
	YSIDold: "",
	YSIDstatus: false,

        AVOIDER: 0,
	AVOIDAUTODETECT: 0,
        TIMEOUT: "",
	THEMEmode: 0,
	SL_DARK: "invert(95%)",
	SL_LIGHT: "invert(0%)",
	BL_D_PROV: "Google",
	BL_T_PROV: "Google",
        ForHistory: "",
	FORSEbubble: 0,
        GlobalCorrectionX: 0,
        GlobalCorrectionY: 0,
        GlobalBoxX: 0,
        GlobalBoxY: 0,
	SL_FRAME: 0,
        SL_DICT_PRESENT: "",
        LISTofPR: {},
	LISTofPRpairs: {},
	SL_MODE: "",
        SL_DOM: "auto",
        SL_LNG_LIST: "",
	SL_LNG_CUSTOM_LIST: "",
	ImTranslator_theurl: ImTranslator_theurl,
        SL_WRONGLANGUAGEDETECTED: 0,
	GTTS_length: 200,
	SLIDL:"",
	SL_DBL_FLAG: 0,
        myWindow:null,
        DELAY:0,
        PROV: "",
	SL_TRIGGER:"TRUE",
        SL_storedSelections: [],
        ListProviders: "",
        SL_SHOW_PROVIDERS: "1",
	SL_FLAG: 0,        
        SL_ONETIMERUN: 0,
	SL_SETINTERVAL_ST: 0,
        SL_SETINTERVAL_PROXY: 0,
	SL_BALLON_W: 450,
	SL_BALLON_H: 85,
	SL_MoveX: "-1000px",
	SL_MoveY: "-1000px",
	SL_Xdelta: 0,
	SL_Ydelta: 0,
	SL_FROMlng: "en",
	SL_TEMP_TEXT: "",
	SL_temp_result: "",
	SL_temp_result2: "",
	SL_Balloon_translation_limit: 5000,
	SL_PLANSHET_LIMIT: 5000,
	SL_GLOBAL_X1: 0,
	SL_GLOBAL_X2: 0,
	SL_GLOBAL_Y1: 0,
	SL_GLOBAL_Y2: 0,
	SL_L: 0,
	SL_T: 0,
	SL_R: 0,
	SL_B: 0,
	SL_NEST: "TOP",
	SL_TS: 0,
        SL_TS_LOCold: 0,
        SL_TS_LOC: 0,
	SL_DETECT: "",
	SL_DETECTED: "",
	SL_IS_DICTIONARY: 0,
        SL_EVENT: window.event,
	SL_KEYCOUNT: { length: 0 },
	SL_KEYSTRING: "",
	SL_TEMPKEYSTRING: "",
	SL_MSG: "",
	SL_TEMPREARTEXT: "",
	//-------------------Globals for TRANSFER from BBL to PLANSHET
	SL_TRANSFER_SRC: "en",
	SL_TRANSFER_DST: "es",
	SL_TRANSFER_DET: "true",
	//-------------------Globals for TRANSFER from BBL to PLANSHET
        SL_dict_bbl: "true",
	//-------------------STORAGE
	SL_ENABLE: false,
	SL_OnOff_BTN: "",
	SL_OnOff_PIN: "",
	SL_OnOff_HK: "",
	SL_langSrc: "",
	SL_langDst: "",
	SL_FontSize: "",
	SL_TH_2: "",
	SL_TH_4: "",
	SL_HK: "",
	SL_HK2: "",
	SL_actualkey: "",
	LNGforHISTORY: "",
        Timing: 3,
	Delay: 0,
	//-------------------STORAGE

	//-------------------SESSION
	SL_SID_PIN: "",
	SL_SID_TO: "",
	SL_SID_FROM: "",
	SL_FONT: "",
	SL_FONT2: "",
	BBL_TS: "",
	BBL_TS2: "",
	BBL_TS3: "",
	SL_FONT_SID: "",
	SL_SID_TEMP_TARGET: "",
	SL_SID_TEMP_SOURCE: "",
	SL_TMPbox: "",
	SL_pin_bbl2: "false",
	//-------------------SESSION

	//-------------------INLINER
	SL_FK_box1: true,
	SL_inlinerFK1: "Alt",
	SL_inliner: "T",
	SL_FK_box2: true,
	SL_inlinerFK2: "Ctrl",
	SL_clean: "X",
	INLINEflip: 0,
	//-------------------INLINER

	//------------------ NEW HOT KEYS
	SL_BBL_CLOSER: true,
	SL_HK_gt1: "Ctrl + Alt + Z",
	SL_HK_gt2: "Alt + Z",
	SL_HK_it1: "Alt + C",
	SL_HK_it2: "Alt + X",
	SL_HK_bb1: "Alt",
	SL_HK_bb2: "Escape",
	WPT1: "Alt + P",
	WPT2: "Alt + M",
	OPT: "Ctrl + Alt + O",
	SL_TRANSLATOR: "Ctrl + Alt + T",
	SL_TRANSLATOR_BOX: true,
	WPTbox1: true,
	WPTbox2: true,
	OPTbox: true,

	//------------------ NEW HOT KEYS

        WPTsrclang: "auto",
        WPTdstlang: "es",

	//------------------ DBL bbl
	SL_DBL: false,
	//------------------ DBL bbl

        TempActiveObjId: "",
        DBLClick_tempText: "",

	// CHECKBOX FOR BLANK GT
        SL_GT_INV: true,

        LOC: "en",

	// ADVANCES
	SL_GVoices: "1",
	SL_SLVoices: "0",
	ALLvoices: "",
	// ADVANCES
	
        SL_SAVETEXT: 0,
	BACK_VIEW: 1,
        SL_ALL_PROVIDERS_BBL: "Google,Microsoft,Translator,Yandex",
        SL_ALL_PROVIDERS_IT: "",
    	invalidElements:  {
      		'APPLET': 1,
      		'AREA': 1,
      		'BASE': 1,
      		'BR': 1,
      		'COL': 1,
      		'B': 1,
      		'HR': 1,
      		'IMG': 1,
      		'INPUT': 1,
      		'IFRAME': 1,
      		'ISINDEX': 1,
      		'LINK': 1,
      		'NOFRAMES': 1,
      		'NOSCRIPT': 1,
      		'META': 1,
      		'OBJECT': 1,
      		'PARAM': 1,
      		'SCRIPT': 1,
      		'STYLE': 1,
      		'SELECT': 1
    	},
	SL_WPT_TRG_LNG: "",
	BaseGTK: "",
	SL_GAPI1: "",
	SL_GAPI1ts: "0",
	SL_GAPI2: "",
	SL_GAPI2ts: "0",
	SL_YKEY: "",

	//BBL BOX Offset: X / Y
	MoveBBLX: "0",
	MoveBBLY: "0",
	//FAVORITE LANGUAGES
	SL_FAV_START: 10,
	SL_FAV_MAX: 3,
	SL_FAV_LANGS_BBL: "",
	SL_FAV_LANGS_IT: "",



	MOver_PROVIDERS:function(e){
	    try{	
		TranslatorIM.mousemove();
	        var id = e.target.id.replace("SL_","");
		if(e.target.id.indexOf("SL_")!=-1 && id!="button"){
			var doc = FExtension.browserInject.getDocument();
			TranslatorIM.SL_bring_UP();
			doc.getElementById('SL_shadow_translation_result').style.visibility = 'visible';
		}
	    } catch(ex){}
	},

	MOut_PROVIDERS:function(e){
 	    try{
	        var id = e.target.id.replace("SL_","");
		if(e.target.id.indexOf("SL_")!=-1){
			var doc = FExtension.browserInject.getDocument();
			TranslatorIM.SL_bring_DOWN();
		}
	    } catch(ex){}
	},


	Click_PROVIDERS:function(e){
	    try{
	        var id = e.target.id.replace("SL_PN","");
	        if(e.target.parentNode.className!="SL_BL_LABLE_DEACT"){
			if(e.target.id.indexOf("SL_PN")!=-1){
				var doc = FExtension.browserInject.getDocument();
				if(TranslatorIM.SL_MODE==1) TranslatorIM.SL_setTMPdata("BL_D_PROV",TranslatorIM.LISTofPR[id]);
				else TranslatorIM.SL_setTMPdata("BL_T_PROV",TranslatorIM.LISTofPR[id]);
				ImTranslatorDataEvent.mousedown();
				TranslatorIM.SET_FIRST_AVAILABLE_PROV();
				TranslatorIM.SL_bring_UP();
	                        TranslatorIM.SL_JUMP(doc);
			}
		}
	    } catch(ex){}

	},




	dblclick:function(e){
	    var doc = FExtension.browserInject.getDocument();
            if(doc.getElementById("SL_shadow_translator").style.display!="block"){
       	      var txt=TranslatorIM.getSelectedText();
              if(txt!="")TranslatorIM.DBLClick_tempText=txt;
	      var target = e.target || e.srcElement;
              TranslatorIM.SL_DBL_FLAG=1;
	      if(target.className.toString().indexOf("CodeMirror-")==-1){


		if(TranslatorIM.SL_OnOff_HK=="true" && TranslatorIM.SL_ENABLE=="true"){
	                TranslatorIM.getSelectionCoords(e);
			var DBHOTKEYSline1=TranslatorIM.SL_HK_bb1.replace(" + ",":|").toLowerCase()+":|";
			DBHOTKEYSline1=DBHOTKEYSline1.replace(" + ",":|");
			var HOTKEYSline = TranslatorIM.HOTKEYS_line();
			if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline1,HOTKEYSline)==true) TranslatorIM.SL_ShowBalloon();
                        
			  if(doc.getElementById("SL_balloon_obj")){
				TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));
				TranslatorIM.SL_BBL_OBJ_OFF(0);
				TranslatorIM.SL_OBJ_BUILDER();
                                if(TranslatorIM.SL_DBL=="true") TranslatorIM.SL_ShowBalloon();

				TranslatorIM.SL_TS_LOCold=TranslatorIM.SL_TS_LOC;
			  }
		}
		if(TranslatorIM.SL_DBL=="true"){
                        TranslatorIM.SL_ShowBalloon();
		}else TranslatorIM.SL_ShowButton();

	      }	
	    }
	},

	contextmenu: function(e){
		var txt=String(TranslatorIM.getSelectedText());

		if(txt!="" && txt!="undefined"){
			browser.runtime.sendMessage({greeting: "resetContextMenu1"}, function(response) {});
			browser.runtime.sendMessage({greeting: "toolbarButtonRightClickText:~"+txt}, function(response) {});
		}else{ 
			browser.runtime.sendMessage({greeting: "resetContextMenu2"}, function(response) {});
//			browser.runtime.sendMessage({greeting: "toolbarButtonRightClickText:~"}, function(response) {});
		}
	},

	mousemove:function(e){
		TranslatorIM.contextmenu();
	},

	
	mousedown:function(e){
	   try{
            TranslatorIM.AVOIDAUTODETECT=0;
	    browser.runtime.sendMessage({greeting: "toolbarButtonRightClickText:~"}, function(response) {});
	    var target = e.target || e.srcElement;
	    var doc = FExtension.browserInject.getDocument();
	    //EXCEPTIONS
	    var ROUT = 0;
	    if(target.className.indexOf("ytp-fullscreen-button")!=-1) ROUT = 1;
	    if(target.tagName.toLowerCase()=="button") ROUT = 1;

	    if(target.tagName.toLowerCase()=="video") ROUT = 1;
	    if(target.hasAttribute("onclick")==true) ROUT = 1;
  	    if(e.which != 3 && target.type=="file") ROUT = 1;
	    if(e.which == 2) ROUT = 1;
	    //for FF only
	  	    if(doc.body.id.toLowerCase()=="innerdocbody") ROUT = 1;
	    //EXCEPTIONS
	    //IT change target menu

	
	    if(e.which == 3) {
		if(doc.getElementById("SL_shadow_translator").style.display!="block") FExtension.browserInject.runtimeSendMessage({greeting: "RCM:>"}, function(response) {});
	    }


	    var txt = FExtension.browserInject.getSelectionText();
	    if(txt == "" && TranslatorIM.AVOID_SHADOW_ROOT_TEXT!="") txt=TranslatorIM.AVOID_SHADOW_ROOT_TEXT;
	    if(txt!=""){		
	        if(e.which != 3){
			if(e.target.id.indexOf("_MENU")==-1) TranslatorIM.CloseIT_target_lang();
			else{

				if(e.target.id!="SL_IT_MENU") e.preventDefault();
			        TranslatorIM.SL_addEvent(doc.getElementById("SL_IT_MENU"), 'change', TranslatorIM.SL_IT_retranslate(e));
				TranslatorIM.SL_addEvent(doc.getElementById("SL_MENU_CLOSE"), 'click', TranslatorIM.SL_IT_retranslate_and_close);
				TranslatorIM.SL_addEvent(doc.getElementById("SL_MENU_LINK_OPT"), 'click', TranslatorIM.SL_IT_option_open);
				TranslatorIM.SL_addEvent(doc.getElementById("SL_MENU_LINK_HIS"), 'click', TranslatorIM.SL_IT_his_open);
			}
		} else e.preventDefault();
                
		if(TranslatorIM.SL_SAVETEXT == 1 && TranslatorIM.BL_T_PROV==""){
			TranslatorIM.SL_BBL_OBJ_OFF(1);
			TranslatorIM.SL_OBJ_BUILDER();
		}

	    }

	    
	    if(TranslatorIM.SL_ENABLE == "true"){
       	     	FExtension.browserInject.extensionSendMessage({greeting: 1}, function(response) {
			if(response && response.farewell){
       				var theresponse = response.farewell.split("~");
		                var theresponse2 = theresponse[2].split("|");
		        	TranslatorIM.SL_OnOff_BTN=theresponse2[3];
				TranslatorIM.SL_OnOff_BTN2=theresponse[51];
				TranslatorIM.SL_langSrc_bbl2=theresponse[49];
				TranslatorIM.SL_langDst_bbl2=theresponse[50];
		                TranslatorIM.SL_langSrc=theresponse2[0];
		                TranslatorIM.SL_langDst=theresponse2[1];
				TranslatorIM.SL_bbl_loc_langs=theresponse[53];
				if(TranslatorIM.SL_bbl_loc_langs=="true") TranslatorIM.SL_TMPbox="true";
				else TranslatorIM.SL_TMPbox="false";
				TranslatorIM.SL_Fontsize_bbl2=theresponse[52];
                                TranslatorIM.SL_FONT_SID=TranslatorIM.SL_Fontsize_bbl2;
				TranslatorIM.SL_ALL_PROVIDERS_BBL=theresponse[34];
				TranslatorIM.SL_LOC=theresponse[22];
				TranslatorIM.SL_LNG_CUSTOM_LIST=theresponse[29];
				TranslatorIM.SL_pin_bbl2=theresponse[57];
                                TranslatorIM.SL_OnOff_PIN=TranslatorIM.SL_pin_bbl2;
			}
			TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));
			TranslatorIM.LISTofPR = TranslatorIM.SL_ALL_PROVIDERS_BBL.split(",");

       		});
	    }


	    if(ROUT == 0){

	      if(TranslatorIM.SL_ALL_PROVIDERS_BBL==""){
       	     	   FExtension.browserInject.extensionSendMessage({greeting: 1}, function(response) {
			if(response && response.farewell){
        			var theresponse = response.farewell.split("~");
		                var theresponse2 = theresponse[2].split("|");
        	        	TranslatorIM.SL_OnOff_BTN=theresponse2[3];
				var tmpPR = theresponse[34];
				if(tmpPR!="") TranslatorIM.SL_ALL_PROVIDERS_BBL=tmpPR;
				else TranslatorIM.SL_ALL_PROVIDERS_BBL="Google,Microsoft,Translator,Yandex";
			}			
         	   });
              }


	      if(target.className.indexOf("ytp-fullscreen-button")==-1){
	        if(e.which != 3){
	    		if(target.type=="file")target.click();
	        }

	        if(TranslatorIM.SL_ENABLE == "true"){
	        	var id = target.id;

        	        if(id == "SL_opt1") TranslatorIM.OpenTAB('bbl');
        	        if(id == "SL_opt2") TranslatorIM.OpenTAB('hist');
        	        if(id == "SL_opt3") TranslatorIM.OpenTAB('fed');

        	        if(id == "SL_locer") TranslatorIM.SL_locker();
	        	if(target.className.toString().indexOf("CodeMirror-")==-1){
		          TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));	       
		          if(e.which != 3){

			      if(id == "SL_button"){                                        
					e.preventDefault();
					TranslatorIM.SL_ShowBalloon();
					} else {
					var id2 = TranslatorIM.BBL_IfMouseIsInside(e);
					if(id2==0){
						TranslatorIM.SL_BBL_OBJ_OFF(0);
                        		        if(doc.location.href.indexOf("rsa.com/") != -1){
							if (window.getSelection().empty) {  // Chrome
								window.getSelection().empty();
							} else if (window.getSelection().removeAllRanges) {  // Firefox
								window.getSelection().removeAllRanges();
							}
						}

					}
			     }
	        	     FExtension.browserInject.setEvent(e);
        	             TranslatorIM.SL_ONETIMERUN=0;
	                     TranslatorIM.TempActiveObjId = id;


		             if(id == "SLHKclose" || id == "SL_alert_cont" || id == "SL_alert_bbl" || id == "SL_shadow_translation_result" || id == "SL_shadow_translation_result2" || id=="") TranslatorIM.SLShowHideAlert();
		             if(id == "SL_BBL_VOICE") TranslatorIM.SL_BBL_VOICE();

//			     if(id != "SL_button" && id !="SL_TTS_voice" && id!="SL_shadow_translation_result" && id!="SL_PN0" && id!="SL_PN1" && id!="SL_PN2" && id!="SL_PN3" && id!="SL_BBL_VOICE" ) {
			     if(id != "SL_button" && id !="SL_TTS_voice" && id!="SL_PN0" && id!="SL_PN1" && id!="SL_PN2" && id!="SL_PN3" && id!="SL_BBL_VOICE" ) {
	        	       		TranslatorIM.SL_GLOBALPosition(e, 0);
					TranslatorIM.SL_HideButton();
	        	        	TranslatorIM.SL_EVENT=e;                
					if(id.indexOf("SL")==-1 || id=="") {TranslatorIM.SL_CloseBalloon();}
			     } else  e.preventDefault();

			     if(id != "SL_button") {
				TranslatorIM.SL_HideButton();
		                TranslatorIM.SL_EVENT=e;

			        
				TranslatorIM.ClickInside(e);
				
				TranslatorIM.SL_bring_DOWN();

			     }

			     
		           }else {
				TranslatorIM.ClickInside(e);
				TranslatorIM.SL_bring_DOWN();
					if(doc.getElementById("SL_button")) doc.getElementById("SL_button").style.display="none"; 
			   }		
		         }else TranslatorIM.SL_CloseBalloon();		
		       }else{               
				if(TranslatorIM.SL_SAVETEXT == 1 && doc.getElementById("SL_shadow_translator").style.display!="block"){
					TranslatorIM.SL_BBL_OBJ_OFF(1);
				}
		       }
		      } else inlinerInjectClean();
	     }
	  } catch(ex){}

          if(e.which == 3) TranslatorIM.contextmenu();
	  TranslatorIM.CleanUpAll(e);
	},

	mouseup:function(e){
	  //EXCEPTIONS
          var ROUT = 0;
	  var target = e.target || e.srcElement;
	  if(target.tagName.toLowerCase()=="video") ROUT=1;
	  if(target.tagName.toLowerCase()=="img") ROUT=1;
          try{
		if(target.className.indexOf("ytp-")!=-1) ROUT = 1;
	  } catch (e){chrome.runtime.lastError}			
          
	  //EXCEPTIONS
	  if(ROUT==1) TranslatorIM.SL_HideButton();
	  else{
        	if(e.which != 3){
		 	  var doc = FExtension.browserInject.getDocument();

			  if(TranslatorIM.SL_ENABLE == "true"){  
				   TranslatorIM.AVOID_SHADOW_ROOT_TEXT = FExtension.browserInject.getSelectionText();
				   if(TranslatorIM.getSelectedText()!=""){
		                   	try{
			  			FExtension.browserInject.runtimeSendMessage({greeting: "CM_BBL:>" + doc.getElementById("SL_lng_to").value}, function(response) {}); 
				   	} catch (e){chrome.runtime.lastError}	

		        	  	if(window.top==window.self)TranslatorIM.SL_FRAME=0;
					else TranslatorIM.SL_FRAME=1;

					if(TranslatorIM.getSelectedText() && TranslatorIM.getSelectedText().toString()!="undefined"){
					        var id = e.target.id;
						if(TranslatorIM.SL_OnOff_BTN2=="") TranslatorIM.SL_OnOff_BTN2 = TranslatorIM.SL_OnOff_BTN;


						// LIST OF EXCEPTIONS
						try{
						  var iframes = document.getElementsByTagName('iframe');
						  for (var i = 0; i < iframes.length; i++) {
						        var iframeSelection = iframes[i].contentWindow.document.getSelection(); 
						        if (iframeSelection && iframeSelection.toString().length > 0) { 
								if(String(window.location).toLowerCase().indexOf('forumactif.org')!=-1)	TranslatorIM.AVOIDER=1; 
							}
						  }
						}catch(ex){}
						// LIST OF EXCEPTIONS

						if(id.indexOf("SL_")==-1 && TranslatorIM.AVOIDER!=1) TranslatorIM.SL_OBJ_BUILDER();
						

					}
					var SLdivField = doc.getElementById("SL_shadow_translator");

					if(TranslatorIM.SL_FRAME==1){
						TranslatorIM.SL_EVENT=e;
						TranslatorIM.WINDOW_and_BUBBLE_alignment(doc,SLdivField)
					}

	
			                TranslatorIM.getSelectionCoords(e);
			                TranslatorIM.unfade();
					var wl = doc.location.href;
					if(wl.indexOf("http")!=-1){
						var SLdivField = doc.getElementById("SL_shadow_translator");
						if(TranslatorIM.SL_SAVETEXT == 1){
		        				TranslatorIM.SL_GLOBALPosition(e, 1);
				        		TranslatorIM.SL_EVENT=e;
						        FExtension.browserInject.setEvent(e);
							TranslatorIM.QuickInitTranslators(e);
	                				TranslatorIM.SL_GOOGLE_WPT();				
						} else {
							if(SLdivField && SLdivField.style.display!="block"){
		        					TranslatorIM.SL_GLOBALPosition(e, 1);
					        		TranslatorIM.SL_EVENT=e;
							        FExtension.browserInject.setEvent(e);
								TranslatorIM.QuickInitTranslators(e);
	        					        TranslatorIM.SL_GOOGLE_WPT();				
							}
						}
					}
				    } else{
			                TranslatorIM.CleanUpAll(e);
				    }
		          } else { 
				    if(doc.getElementById("SL_button"))doc.getElementById("SL_button").style.display="none"; 
			  }
	         } 		
	  }
	},



	keydown:function(e){                
		setTimeout(function() {
			    	if(!TranslatorIM.SL_KEYCOUNT[e.keyCode] && TranslatorIM.SL_KEYCOUNT.length<3)   {
        				TranslatorIM.SL_KEYCOUNT[e.keyCode] = true;
				        TranslatorIM.SL_KEYCOUNT.length++;
					TranslatorIM.SL_KEYSTRING=TranslatorIM.SL_KEYSTRING+e.keyCode+":|";
                			if(TranslatorIM.SL_KEYSTRING!="") TranslatorIM.SL_TEMPKEYSTRING=TranslatorIM.SL_KEYSTRING;
				}
		}, 100);		
        },

        keyup:function(e){ 
		TranslatorIM.QuickInitTranslators(e);
		var HOTKEYSline = TranslatorIM.HOTKEYS_line();
		if(TranslatorIM.SL_MSG.indexOf("~")!=-1){
			var theresponse = TranslatorIM.SL_MSG.split("~");
			var theresponse1 = theresponse[0].split("|");
			var theresponse2 = theresponse[1].split("|");
			var thekey4 = theresponse2[1];
			var theresponse4 = theresponse[4].split("|");
			var INLINER_CLEAN_ONOFF = theresponse4[0];
			var BUBBLE_CLEAN_ONOFF = theresponse[37];

			var INL_CL_HK1 = theresponse4[1];
			var INL_CL_HK2 = theresponse4[2];

			//WPT
			if(TranslatorIM.WPT1=="") TranslatorIM.WPTbox1="false";
			var DBHOTKEYSlineWPT1=TranslatorIM.WPT1.replace(/ \+ /g,":|").toLowerCase()+":|";
       			DBHOTKEYSlineWPT1=DBHOTKEYSlineWPT1.replace(/ \+ /g,":|");
			if(TranslatorIM.WPTbox1 == "true"){
	                        if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSlineWPT1,HOTKEYSline)==true){
					TranslatorIM.SL_WEB_PAGE_TRANSLATION(0);
				}
	                }
			//WPT MO
			if(TranslatorIM.WPT2=="") TranslatorIM.WPTbox2="false";
			var DBHOTKEYSlineWPT2=TranslatorIM.WPT2.replace(/ \+ /g,":|").toLowerCase()+":|";
       			DBHOTKEYSlineWPT2=DBHOTKEYSlineWPT2.replace(/ \+ /g,":|");
			if(TranslatorIM.WPTbox2 == "true"){
	                        if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSlineWPT2,HOTKEYSline)==true) {
					TranslatorIM.SL_WEB_PAGE_TRANSLATION(1);
                                        var url = window.location;
				}
	                }
			//OPT
			if(TranslatorIM.OPT=="") TranslatorIM.OPTbox="false";
			var DBHOTKEYSlineOPT=TranslatorIM.OPT.replace(/ \+ /g,":|").toLowerCase()+":|";
       			DBHOTKEYSlineOPT=DBHOTKEYSlineOPT.replace(/ \+ /g,":|");
			if(TranslatorIM.OPTbox == "true"){
	                        if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSlineOPT,HOTKEYSline)==true) {
					var myPort = browser.runtime.connect({name:"content"});
					myPort.postMessage({greeting: "opt:>"+url});
				}
	                }


			//BUBBLE close
			if(TranslatorIM.SL_HK_bb2==""){ BUBBLE_CLEAN_ONOFF="false"}
			var DBHOTKEYSline2=TranslatorIM.SL_HK_bb2.replace(/ \+ /g,":|").toLowerCase()+":|";
		       	DBHOTKEYSline2=DBHOTKEYSline2.replace(/ \+ /g,":|");
			if(BUBBLE_CLEAN_ONOFF=="true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline2,HOTKEYSline)==true){
					TranslatorIM.REMOTE_Voice_Close();
			        	var doc = FExtension.browserInject.getDocument();       
					if(TranslatorIM.SL_BBL_CLOSER=="true"){
						TranslatorIM.SL_CloseBalloonWithLink();
					} else {
						TranslatorIM.SL_BBL_OBJ_OFF(0);
					}
				}
			}

			//ImTranslator Blank
			var DBHOTKEYSline1=TranslatorIM.SL_HK_gt2.replace(/ \+ /g,":|").toLowerCase()+":|";
       			DBHOTKEYSline1=DBHOTKEYSline1.replace(/ \+ /g,":|");



			//Inline clean
			var DBHOTKEYSline2=TranslatorIM.SL_HK_it2.replace(/ \+ /g,":|").toLowerCase()+":|";
	       		DBHOTKEYSline2=DBHOTKEYSline2.replace(/ \+ /g,":|");
			if(INLINER_CLEAN_ONOFF=="true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline2,HOTKEYSline)==true) inlinerInjectClean();
			}

			if(TranslatorIM.SL_GT_INV == "true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline1,HOTKEYSline)==true) {
					if(TranslatorIM.SL_HK_gt2!=""){
						var myPort = browser.runtime.connect({name:"content"});
						myPort.postMessage({greeting: "win:>"});
					}
					TranslatorIM.SL_TEMPKEYSTRING="";
				}
			}

			//Inline Translation with target lang selection

			var DBHOTKEYSline4=TranslatorIM.SL_change_lang_HK_it.replace(/ \+ /g,":|").toLowerCase()+":|";
			DBHOTKEYSline4=DBHOTKEYSline4.replace(/ \+ /g,":|");

			var DBHOTKEYSline2=TranslatorIM.SL_HK_gt1.replace(/ \+ /g,":|").toLowerCase()+":|";

			DBHOTKEYSline2=DBHOTKEYSline2.replace(/ \+ /g,":|");

			if(theresponse1[2]=="true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline2,HOTKEYSline)==true) {
					var theSLtext = TranslatorIM.getSelectedText().toString();
					theSLtext = theSLtext.replace(/(^\s+|\s+$)/g, '');

					if(theSLtext!=""){
						if(TranslatorIM.SL_HK_gt1!=""){
							var myPort = browser.runtime.connect({name:"content"});
							myPort.postMessage({greeting: "win_text:>"+theSLtext});
						}
						TranslatorIM.SL_TEMPKEYSTRING="";
					}
				}
			}

			// TRANSLATOR

			var DBHOTKEYSline3=TranslatorIM.SL_TRANSLATOR.replace(/ \+ /g,":|").toLowerCase()+":|";
			DBHOTKEYSline3=DBHOTKEYSline3.replace(/ \+ /g,":|");
			if(TranslatorIM.SL_TRANSLATOR_BOX=="true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline3,HOTKEYSline)==true) {
					var theSLtext = TranslatorIM.getSelectedText().toString();
					theSLtext = theSLtext.replace(/(^\s+|\s+$)/g, '');
					if(theSLtext!=""){
						if(TranslatorIM.SL_TRANSLATOR!=""){
							var myPort = browser.runtime.connect({name:"content"});
							myPort.postMessage({greeting: "tr:>"+theSLtext});
						}
						TranslatorIM.SL_TEMPKEYSTRING="";
					}
				}
			}

			if(theresponse[54]=="true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline4,HOTKEYSline)==true) {
					if(TranslatorIM.SL_ONETIMERUN==0) {TranslatorIM.InitiateIT_target_lang();/*runinliner();*/TranslatorIM.SL_ONETIMERUN=1;}
				}
			}


		}
		TranslatorIM.SL_closer(e);
        },

	QuickInitTranslators: function(e){
 	        var doc = FExtension.browserInject.getDocument();       

                var HOTKEYSline = TranslatorIM.HOTKEYS_line();
		setTimeout(function() {
		  try{
		    if(TranslatorIM.SL_MSG!="" || TranslatorIM.SL_MSG!="undefuned"){

			var theSLtext = TranslatorIM.getSelectedText().toString();
			theSLtext = theSLtext.replace(/(^\s+|\s+$)/g, '');

			var theresponse = TranslatorIM.SL_MSG.split("~");
			var theresponse1 = theresponse[0].split("|");
			var thekey2 = theresponse1[1];
			var IMTR_ONOFF = theresponse1[2];

                        if(theresponse[3].indexOf("|")!=-1){
				var theresponse3 = theresponse[3].split("|");
				var INLINER_ONOFF = theresponse3[0];
				var INL_HK1 = theresponse3[1];
				var INL_HK2 = theresponse3[2];
				var theresponse4 = theresponse[4].split("|");
			}

			//Balloon
                        var SLdivField = doc.getElementById("SL_shadow_translator");


			if(TranslatorIM.SL_SAVETEXT==0){
				if(SLdivField && SLdivField.style.display!="block"){
					var DBHOTKEYSline1=TranslatorIM.SL_HK_bb1.replace(/ \+ /g,":|").toLowerCase()+":|";
					DBHOTKEYSline1=DBHOTKEYSline1.replace(/ \+ /g,":|");
				} else { DBHOTKEYSline1=""; theSLtext="";}
			} else {
				var DBHOTKEYSline1=TranslatorIM.SL_HK_bb1.replace(/ \+ /g,":|").toLowerCase()+":|";
				DBHOTKEYSline1=DBHOTKEYSline1.replace(/ \+ /g,":|");
			}

			//ImTranslator Blank
			var DBHOTKEYSline2=TranslatorIM.SL_HK_gt1.replace(/ \+ /g,":|").toLowerCase()+":|";
			DBHOTKEYSline2=DBHOTKEYSline2.replace(/ \+ /g,":|");

			//Inline Translation
			var DBHOTKEYSline3=TranslatorIM.SL_HK_it1.replace(/ \+ /g,":|").toLowerCase()+":|";
			DBHOTKEYSline3=DBHOTKEYSline3.replace(/ \+ /g,":|");

			if(theSLtext!=""){
			   	if(TranslatorIM.SL_OnOff_BTN2=="true" && theSLtext.indexOf("Google - Map Data")==-1 && theSLtext!="." && theSLtext!="," && theSLtext!="?" && theSLtext!="!" && theSLtext!=":" && theSLtext!=";" && theSLtext!="-"){
				 	if(TranslatorIM.SL_ENABLE=="true"){
						if(TranslatorIM.TempActiveObjId!="SL_button")	TranslatorIM.SL_ShowButton();
					}
				}                            
					  
				if((TranslatorIM.SL_OnOff_HK=="true" && TranslatorIM.SL_ENABLE=="true") && TranslatorIM.FORSEbubble!=1){
					if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline1,HOTKEYSline)==true){
				          if(TranslatorIM.SL_TS_LOC!=TranslatorIM.SL_TS_LOCold){
						if(doc.getElementById("SL_balloon_obj")){
							TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));
							TranslatorIM.SL_BBL_OBJ_OFF(0);
							TranslatorIM.SL_OBJ_BUILDER();
							TranslatorIM.SL_TS_LOCold=TranslatorIM.SL_TS_LOC;
						}
					  }
					  if(TranslatorIM.SL_HK_bb1!="") TranslatorIM.SL_ShowBalloon();

					}
				}

				if(TranslatorIM.FORSEbubble==1){
				          if(TranslatorIM.SL_TS_LOC!=TranslatorIM.SL_TS_LOCold){
						if(doc.getElementById("SL_balloon_obj")){
							TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));
							TranslatorIM.SL_BBL_OBJ_OFF(0);
							TranslatorIM.SL_OBJ_BUILDER();
							TranslatorIM.SL_TS_LOCold=TranslatorIM.SL_TS_LOC;
						}
					  }
					  TranslatorIM.SL_ShowBalloon();
				}

			}	


			if(INLINER_ONOFF=="true"){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline3,HOTKEYSline)==true){
					if(TranslatorIM.SL_ONETIMERUN==0) {
						if(TranslatorIM.SL_HK_it1!="")	inlinerInjectInliner();TranslatorIM.SL_ONETIMERUN=1;
					}
			        }
			}				

			if(IMTR_ONOFF == "true"){
			   if(!HOTKEYSline){
				if(TranslatorIM.SL_SYNC_FILTER(DBHOTKEYSline2,HOTKEYSline)==true) {
					if(TranslatorIM.SL_HK_gt1!=""){
						var myPort = browser.runtime.connect({name:"content"});
						myPort.postMessage({greeting: "win_text:>"+theSLtext});
					}
					TranslatorIM.SL_TEMPKEYSTRING="";
				}
			   }
			}

		    }	
		  }catch(e){
			//alter(e);
		  }
		}, 20); //VK: was 200 
		setTimeout(function() {
			TranslatorIM.SL_closer(e);
			HOTKEYSline="";
		}, 500);
	},

        inlinerContextOnClick: function(){
		TranslatorIM.SL_ONETIMERUN=0;
                inlinerInjectInliner();
		TranslatorIM.SL_ONETIMERUN=1;
	},

        SL_tbWPT: function(st){                
                TranslatorIM.SL_WEB_PAGE_TRANSLATION(st);
	},

	SL_SYNC_FILTER: function (l1,l2){
		if(l1=="auto translate:|") return true;
	        if(l1!=":|"){
		        var LINE1 = l1.split(":|");
		        var LINE2 = l2.split(":|");
	        	var CNT1 = LINE1.length-1;
		        var CNT2 = LINE2.length-1; 
		        var cnt=0;
                	var CNTlimit=3;
		        if(CNT1 == CNT2){
				CNTlimit = CNT1;
	        		for(var i=0; i<CNT1; i++){
		        		for(var j=0; j<CNT2; j++){
						if(LINE1[i]==LINE2[j]){
							cnt++; 	
						}
					}
				}
			}
			if(cnt>=CNTlimit) return true;
			else return false;
		} else {
		 if(l2=="") return true;
		 else return false;
		}
	},

	SL_closer:function(e){
		setTimeout(function() {TranslatorIM.SL_KEYCOUNT = { length: 0 }; TranslatorIM.SL_KEYSTRING="";TranslatorIM.SL_TEMPKEYSTRING="";}, 100);
        },


	HOTKEYS_line: function(){
                TranslatorIM.SL_TEMPKEYSTRING=TranslatorIM.SL_TEMPKEYSTRING.replace("18:|","Alt:|");
                TranslatorIM.SL_TEMPKEYSTRING=TranslatorIM.SL_TEMPKEYSTRING.replace("17:|","Ctrl:|");
                TranslatorIM.SL_TEMPKEYSTRING=TranslatorIM.SL_TEMPKEYSTRING.replace("16:|","Shift:|");
                TranslatorIM.SL_TEMPKEYSTRING=TranslatorIM.SL_TEMPKEYSTRING.replace("27:|","Escape:|");
		var TMP1= TranslatorIM.SL_TEMPKEYSTRING.split(":|");
		var NUM = TMP1.length-1;
		var HOTKEY = Array();
		var HOTKEYSline="";
		var cnt=0;
		for(var x=0; x<NUM; x++){
		    if(TMP1[x]!="Alt" && TMP1[x]!="Ctrl" && TMP1[x]!="Shift" && TMP1[x]!="Escape") HOTKEY[x]=String.fromCharCode(TMP1[x]);
		    else HOTKEY[x]=TMP1[x];
                    HOTKEYSline=HOTKEYSline+HOTKEY[x]+":|";
                    if(TMP1[x]=="Alt")cnt++;
                    if(TMP1[x]=="Ctrl")cnt++;
                    if(TMP1[x]=="Escape")cnt++;
		}
		if(cnt==2){
                  HOTKEYSline=HOTKEYSline.replace("Alt:|","");
                  HOTKEYSline=HOTKEYSline.replace("Ctrl:|","");
                  HOTKEYSline="Ctrl:|Alt:|"+HOTKEYSline;
		}
		return HOTKEYSline.toLowerCase();
	},


	SL_setTMPdata: function(name, value) {
       		FExtension.browserInject.runtimeSendMessage({greeting: "SAVE_DATA:>"+name+":"+value}, function(response) {});
		switch(name){
		 	case "BL_T_PROV": TranslatorIM.BL_T_PROV=value; break;
		 	case "BL_D_PROV": TranslatorIM.BL_D_PROV=value; break;
		 	case "TTSvolume": TranslatorIM.TTSvolume=value; break;
		}
	},


	init: function(){	
	        var doc = FExtension.browserInject.getDocument();

//	        if(TranslatorIM.BL_D_PROV=="" || TranslatorIM.BL_D_PROV=="undefined") TranslatorIM.SL_setTMPdata("BL_D_PROV", TranslatorIM.LISTofPR[0]);
//	        if(TranslatorIM.BL_T_PROV=="" || TranslatorIM.BL_T_PROV=="undefined") TranslatorIM.SL_setTMPdata("BL_T_PROV", TranslatorIM.LISTofPR[0]);

                
                TranslatorIM.SL_GOOGLE_WPT();

        	doc.addEventListener('mousedown', TranslatorIM.mousedown,!1);
        	doc.addEventListener('dblclick', TranslatorIM.dblclick,!1);

	        doc.addEventListener('mouseup', TranslatorIM.mouseup,!1);

        	doc.addEventListener('keydown', TranslatorIM.keydown,!1);
        	doc.addEventListener('keyup', TranslatorIM.keyup,!1);


//        	doc.addEventListener('mouseover', TranslatorIM.mousemove,!1);        	


        	doc.addEventListener('mouseover', TranslatorIM.MOver_PROVIDERS,!1);
        	doc.addEventListener('mouseout', TranslatorIM.MOut_PROVIDERS,!1);
        	doc.addEventListener('click', TranslatorIM.Click_PROVIDERS,!1);




/*
		try{
	            doc.addEventListener("load", function(){
				setTimeout('TranslatorIM.SL_Hider()',500); 

			}, false);
		}catch(e){
			//alter(e);
		}
	
*/	
		(function(){                 
		

			var SL_d=!0,SL_e=null,SL_g=!1,SL_j,
			SL_k=function(SL_a){
				return SL_a.replace(/^\s+|\s+$/g,"")
			},
			SL_o=function(SL_a,SL_b){
				return function(){
					return SL_b.apply(SL_a,arguments)
					}
			 },
			 SL_p=function(SL_a){
			  if(SL_a&&SL_a.tagName){
				  var SL_b=SL_a.tagName.toLowerCase();
				  if("input"==SL_b||"textarea"==SL_b)
					  return SL_d;
			  }
			  for(;SL_a;SL_a=SL_a.parentNode)
				  if(SL_a.isContentEditable)
					  return SL_d;
			  	   return SL_g;
			  },
			  SL_r=/[0-9A-Za-z]/,
			  SL_A=function(){
				  FExtension.browserInject.extensionSendRequest({type:"initialize"},SL_o(this,
				  function(SL_a){
					  this.SL_B=SL_a.instanceId;
					  FExtension.browserInject.addOnRequestListener(SL_z);

				  })
			  )}
			  var SL_x=function(SL_a,SL_b,SL_c){
				  FExtension.browserInject.getDocument().addEventListener?SL_c.addEventListener(SL_a,SL_b,SL_g):SL_c.attachEvent("on"+SL_a,SL_b)
			  },
			  SL_w=function(){};
			  var SL_z=function(SL_a,SL_b,SL_c){
		                      "get_selection"==SL_a.type&&(SL_a=SL_k(TranslatorIM.getSelectedText()))&&SL_c({selection:SL_a})
			  };
			  window.SLInstance=new SL_A;  

 
			  FExtension.browserInject.extensionSendMessage({greeting: 1}, function(response) {
				  FExtension.browserInject.setStyle();
		      });
		})();
	},

    addEvent: function (element, eventName, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, callback);
        }
    },

    openFeedback: function(){
        FExtension.browserInject.openNewTab(FExtension.browserInject.getURL('feedback.html', false));
    },
	
	SL_Links: function(ob,todo){
		FExtension.browserInject.getDocument().getElementById(ob).style.display=todo;
	},
/*
	SL_Hider: function(){
		if(FExtension.browserInject.getDocument().getElementById("SL_shadow_translator")){
			FExtension.browserInject.getDocument().getElementById("SL_shadow_translator").style.display='none';
		}
	},
*/
	StartImTranslatorWindow: function(){
		 var tmpSLstr = TranslatorIM.getSelectedText();
		 if(tmpSLstr=="")  tmpSLstr=" ";

		 FExtension.browserInject.extensionSendMessage({greeting: tmpSLstr}, function(response) {
			 //chrome.extension.sendMessage({greeting: tmpSLstr}, function(response) {
		             if(response){
				    //console.log(response.farewell);
		             }
		 });
	},

	//---------------BUTTON

	SL_ShowButton: function(){
         clearTimeout(TranslatorIM.TIMEOUT);
	 TranslatorIM.TIMEOUT = setTimeout(function() {
	   if(TranslatorIM.SL_OnOff_BTN2 == "true"){
	        var doc = FExtension.browserInject.getDocument();
		 if(TranslatorIM.SL_SAVETEXT == 0){
			if(doc.getElementById('SL_shadow_translator') && doc.getElementById('SL_shadow_translator').style.display!="block"){
				TranslatorIM.SL_ShowButtonEXEC(doc);
			}
		 } else TranslatorIM.SL_ShowButtonEXEC(doc);	 	
	   }
	 }, TranslatorIM.Delay*1000);
	},


	SL_ShowButtonEXEC: function(doc){
	  	TranslatorIM.dofade();
		if(TranslatorIM.SL_OnOff_BTN2 == "true"){
		   if(doc.getElementById("SL_shadow_translator")){
			if(doc.getElementById("SL_shadow_translator").style.backgroundColor==''){
				var theSLtext=TranslatorIM.getSelectedText();
				if(theSLtext!=""){
					doc.getElementById("SL_shadow_translator").style.backgroundColor="";					
					doc.getElementById('SL_button').style.display="block";
					doc.getElementById('SL_button').style.opacity=1;
		        	        if(TranslatorIM.SL_DBL_FLAG==1){
					   var TN = TranslatorIM.SL_EVENT.target.tagName.toLowerCase();
					   if(TN == "input" || TN == "textarea"){
					     var corrector=-3;
					     TranslatorIM.SL_GLOBAL_Y1=TranslatorIM.SL_GLOBAL_Y1+corrector;
					     TranslatorIM.SL_GLOBAL_Y2=TranslatorIM.SL_GLOBAL_Y2+corrector;
					   }
					   TranslatorIM.SL_DBL_FLAG=0;
					}
					TranslatorIM.SL_GetButtonCurPosition(TranslatorIM.SL_GLOBAL_X1, TranslatorIM.SL_GLOBAL_Y1, TranslatorIM.SL_GLOBAL_X2, TranslatorIM.SL_GLOBAL_Y2);
				}
			}
		   }
		}
	},

	SL_HideButton: function(){
	         var doc = FExtension.browserInject.getDocument();
		 var SLdivField=doc.getElementById("SL_button");

		 if(SLdivField){
			 TranslatorIM.SL_addEvent(SLdivField, 'mouseover', TranslatorIM.SL_addButtonColor);
			 TranslatorIM.SL_addEvent(SLdivField, 'mouseout', TranslatorIM.SL_removeButtonColor);
			 SLdivField.style.display="none"; 		   
		 }

	},
	SL_addButtonColor: function() {
		var SLdivField = FExtension.browserInject.getDocument().getElementById("SL_button");
		TranslatorIM.unfade();
	},
	SL_removeButtonColor: function() {
		var SLdivField = FExtension.browserInject.getDocument().getElementById("SL_button");
		TranslatorIM.fade();
	},


	SL_GetButtonCurPosition: function (X1,Y1,X2,Y2) {
	        var doc = FExtension.browserInject.getDocument();
	        var SLdivField = doc.getElementById("SL_button");

                var delta1=-25;
                if(X1<X2) delta1=10;
                var delta2=-5;

              //  if(Y1<Y2) delta2=10;
                var pos = "top";
                if(Y1<Y2) pos="bottom";

                //VK BUTTON MOVER

                var correctionX = Math.ceil(TranslatorIM.GlobalCorrectionX/2);
                var correctionY = Math.ceil(TranslatorIM.GlobalCorrectionY/2);

		if(PLATFORM=="Opera"){
			if(correctionY==0) correctionY = correctionY-10;
		}

                if(pos=="top"){
	                //correctionX = correctionX * -1;
        	        correctionY =  correctionY * -1;
		}
                var AL = TranslatorIM.SL_AlignCoordL(doc,delta1,correctionX);
                var AT = TranslatorIM.SL_AlignCoordT(doc,delta2,correctionY);

		var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
		var NEWleft = ((X2-delta2+AL)+correctionX);

		if(delta2<0){
			if((bodyScrollLeft+window.innerWidth-40)<=NEWleft) NEWleft=((bodyScrollLeft+window.innerWidth)-40);
		}
		if(NEWleft<5) NEWleft=(bodyScrollLeft+5);
	        SLdivField.style.left = NEWleft+"px";

		var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;

		//NEW BUTTON CORRECTION
		correctionY = correctionY-7; 
		//-----------------------

		
	       	if(pos=="top"){
	        	SLdivField.style.top = ((Y2+delta1+AT)+correctionY)+"px";
        		if(((Y2+delta1+AT)+correctionY)<=bodyScrollTop)	SLdivField.style.top = (bodyScrollTop+2)+"px";
        		if(((Y2+delta1+AT)+correctionY)>=(bodyScrollTop+window.innerHeight-25))	SLdivField.style.top = (bodyScrollTop+window.innerHeight-25)+"px";
		} else {
			if(correctionY<0){
				SLdivField.style.top = ((Y2-delta1-AT)-correctionY)+"px";
	        		if(SLdivField.style.top.replace("px","")>=(bodyScrollTop+window.innerHeight-25)){
					SLdivField.style.top = (bodyScrollTop+window.innerHeight-45)+"px";
				}
			}else{
				SLdivField.style.top = ((Y2-AT)-correctionY)+"px";
				if((Y1-delta1-AL-TranslatorIM.GlobalCorrectionY)<=(bodyScrollTop)) SLdivField.style.top = (bodyScrollTop+2)+"px";
			}
		}



	},

        SL_AlignCoordT: function(doc,delta,correction){
		var T=0;
		var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
		if(correction>0){
			if(bodyScrollTop>(TranslatorIM.SL_T+bodyScrollTop+delta) && delta < 0){
				if(correction>25) T=correction;
				else              T=25;
			}
			var screen = window.innerHeight;
			var r = (TranslatorIM.SL_B+bodyScrollTop+correction-(bodyScrollTop+screen));
			if(r<0)	if((bodyScrollTop+screen)<(TranslatorIM.SL_B+bodyScrollTop+correction) ) T=correction+delta-r;
			if(T==0) T = T + correction;
			else{
				if(T==10) T = -5;
			}
		}else{
			var r = correction+TranslatorIM.SL_T+bodyScrollTop-bodyScrollTop;
			if(bodyScrollTop>(TranslatorIM.SL_T+bodyScrollTop+correction)) T=correction-r-delta*2;
			else T=correction; 
		}
		return(T);
	},

        SL_AlignCoordL: function(doc,delta,correction){
		var L=delta;
		var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
		if(correction>=0){
			if(bodyScrollLeft<(TranslatorIM.SL_R+bodyScrollLeft)) L=correction;
			var screen = window.innerWidth;
			r = TranslatorIM.SL_R+bodyScrollLeft+correction-(bodyScrollLeft+screen);
			if(r>delta) r=delta*2;			
			if((bodyScrollLeft+screen)<(TranslatorIM.SL_R+bodyScrollLeft+correction-delta)){
				L=correction+r;
			}
		}else{
			L=correction; 
			if(bodyScrollLeft>(TranslatorIM.SL_R+bodyScrollLeft+correction)) L=5;
			if(TranslatorIM.SL_L<Math.abs(correction)) L=5;
		}
		return(L);
	},





	SL_GLOBALPosition: function(e, state) {

		if(!e) e = TranslatorIM.SL_EVENT;
	        var doc = FExtension.browserInject.getDocument();
		var posx = 0;
		var posy = 0;
		if (!e) {var e = window.event;TranslatorIM.SL_EVENT=e;}

		if(e){
			if (e.pageX || e.pageY){
				posx = e.pageX;
				posy = e.pageY;
			}
			else if (e.clientX || e.clientY){
				posx = e.clientX + doc.body.scrollLeft + doc.documentElement.scrollLeft;
				posy = e.clientY + doc.body.scrollTop + doc.documentElement.scrollTop;
			}
		}

		if(state==0){
			TranslatorIM.SL_GLOBAL_X1 = posx;
			TranslatorIM.SL_GLOBAL_Y1 = posy;
		}else{
			TranslatorIM.SL_GLOBAL_X2 = posx;
			TranslatorIM.SL_GLOBAL_Y2 = posy;
		}
	},
	//---------------BUTTON

	//---------------BALLOON
        SL_quikCloseBalloon: function(){
		TranslatorIM.SL_removeBalloonColor();
		TranslatorIM.SL_CloseBalloon();
	},

	SL_ShowBalloon: function(){
		TranslatorIM.SL_BBL_locer_settler();
	        TranslatorIM.SL_HideButton();
	        var doc = FExtension.browserInject.getDocument();
		try{
			doc.onmousemove = null;			
		}catch(e){}

		try{
                var theSLtext="";
		//HANDLER: http://www.legislation.gov.uk/ukpga/2008/22/contents
		var theurl = String(doc.location);
		if(doc.body.innerHTML.indexOf("/1999/xhtml")!=-1 && theurl.indexOf("legislation.gov.uk")!=-1) {	
			//runinliner();
			theSLtext = FExtension.browserInject.getSelectionText();

			if(!theSLtext && TranslatorIM.DBLClick_tempText!="") theSLtext = TranslatorIM.DBLClick_tempText;
		        FExtension.browserInject.runtimeSendMessage({greeting: "PUSH:>"+theSLtext}, function(response) {});
			return false;
		}

      		   		
		var SL_tb = doc.getElementById("SL_TB");
		var SLdivField = doc.getElementById("SL_shadow_translator");

		var SLdivField2 = doc.getElementById("SL_button");
		SLdivField2.style.display = "none";


                if(TranslatorIM.SL_TRIGGER=="FALSE"){
			doc.getElementById("SL_lng_to").value=TranslatorIM.SL_langDst;
			doc.getElementById("SL_lng_from").value=TranslatorIM.SL_langSrc;
			chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
			});
		}



		doc.getElementById('SL_planshet').style.background = "#efefef";
		doc.getElementById('SL_Balloon_options').style.background = "#efefef";




		var SLselect = doc.getElementById("SL_lng_to");
		var SLselectFROM = doc.getElementById("SL_lng_from");

		var SL_locer = doc.getElementById("SL_locer");
		var SLswitch = doc.getElementById('SL_switch_b');

		var SL_P0 = doc.getElementById("SL_P0");
		var SL_P1 = doc.getElementById("SL_P1");
		var SL_P2 = doc.getElementById("SL_P2");
		var SL_P3 = doc.getElementById("SL_P3");

		var SL_BBL_locer = doc.getElementById("SL_BBL_locer");

		if(SLdivField.style.backgroundColor==""){

	                TranslatorIM.SLShowHideAlert();
//		        TranslatorIM.SL_DETECT = "";
			//TranslatorIM.SL_DETECTED =  "";
			TranslatorIM.SL_GetTransCurPosition();

			var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
			TranslatorIM.SL_GLOBAL_Y2=TranslatorIM.SL_T+bodyScrollTop;
			TranslatorIM.SL_GLOBAL_Y1=TranslatorIM.SL_T+bodyScrollTop;

			var theSLtext = TranslatorIM.getSelectedText();
			if(!theSLtext && TranslatorIM.AVOID_SHADOW_ROOT_TEXT != "") theSLtext = TranslatorIM.AVOID_SHADOW_ROOT_TEXT;
			if(!theSLtext=="" && TranslatorIM.DBLClick_tempText!="") theSLtext = TranslatorIM.DBLClick_tempText;
			TranslatorIM.DBLClick_tempText="";
			if(theSLtext != ""){

				theSLtext = theSLtext.substring(0, TranslatorIM.SL_Balloon_translation_limit);
				var OBJ = doc.getElementById('SL_pin');


				//NEW BLOCK
			        if(TranslatorIM.SL_pin_bbl2!="true") {
					TranslatorIM.SL_NEST="TOP";
					TranslatorIM.SL_SID_PIN="false";
					TranslatorIM.SL_OnOff_PIN="false";
					TranslatorIM.getSelectionCoords(TranslatorIM.SL_EVENT);
				}





				if(TranslatorIM.SL_FRAME==0){
					if(TranslatorIM.SL_SAVETEXT == 1){
						TranslatorIM.SL_NEST="FLOAT";
						TranslatorIM.SL_SID_PIN="true";
					}
				}

                                theSLtext = theSLtext.trim();
//				theSLtext = theSLtext.replace(/\n/ig," @ "); 
				theSLtext = theSLtext.replace(/(^\s+|\s+$)/g, '');


				TranslatorIM.SL_TEMP_TEXT = theSLtext;
				var win = null;
				
				TranslatorIM.SL_BALLOON_TRANSLATION(theSLtext,evt,0, win);


				if(theSLtext.length > TranslatorIM.SL_Balloon_translation_limit) {
					TranslatorIM.SL_FLOATER();
				}else{
					var evt = TranslatorIM.SL_EVENT;
					SLdivField.style.backgroundColor = "#FEFEFE";
					if(TranslatorIM.SL_SID_TEMP_TARGET != "") SLselect.value = TranslatorIM.SL_SID_TEMP_TARGET;

				}

				var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
				var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
				var OBJ = doc.getElementById('SL_pin');
			        if(TranslatorIM.GlobalBoxX!=0 && TranslatorIM.GlobalBoxY != 0) TranslatorIM.SL_NEST = "FLOAT";

				// TO HANDLE INVOKING FROM CM
			        if(TranslatorIM.SL_NEST=="") TranslatorIM.SL_NEST="TOP";
			        //---------------------------



                                switch(TranslatorIM.SL_NEST){
					case "TOP":  	SLdivField.style.top=TranslatorIM.SL_T+bodyScrollTop-164+"px"; 
							TranslatorIM.SL_arrows('up'); 
							OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-off.png')+")";
							OBJ.title=FExtension.element(TranslatorIM.SL_LOC,"extPin_ttl");
							break;
					case "BOTTOM": 	SLdivField.style.top=TranslatorIM.SL_B+bodyScrollTop+9+"px"; 
							TranslatorIM.SL_arrows('down'); 
							OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-off.png')+")";
							OBJ.title=FExtension.element(TranslatorIM.SL_LOC,"extPin_ttl");
							break;
					case "FLOAT": 	TranslatorIM.SL_arrows('all');
							OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-on.png')+")";
							OBJ.title=FExtension.element(TranslatorIM.SL_LOC,"extUnPin_ttl");
							TranslatorIM.SL_FLOATER();
							break;
				}


				var situation = 0;
				var setleft=(TranslatorIM.SL_L+TranslatorIM.SL_R)/2-448/2;
				if(setleft+473>window.innerWidth){
					setleft=window.innerWidth-467;
					var situation = 1;
				}
				if(setleft<25){
					setleft=25;
					var situation = 2;
				}
				var ArrowLeft='3px';

				if(TranslatorIM.SL_NEST!="FLOAT") SLdivField.style.left=(bodyScrollLeft*1)+setleft +"px";

                                var textCenter=Math.ceil((TranslatorIM.SL_R-TranslatorIM.SL_L)/2);
				switch(situation){
				  case 0:ArrowLeft='214px'; break;
				  case 1:var obj = (SLdivField.style.left.replace("px","")*1)
					 var coord = TranslatorIM.SL_L-obj+bodyScrollLeft+textCenter-10;
					 var delta=0;
					 if(bodyScrollLeft!=0) delta=5;
					 if(coord>obj) ArrowLeft = coord-delta+"px";
					 else ArrowLeft=coord+'px'; 
					 break;
				  case 2:if(TranslatorIM.SL_L<25){
						if(textCenter<25) ArrowLeft='3px';
                                                else ArrowLeft=textCenter-25 + 'px';
					 }else ArrowLeft=TranslatorIM.SL_L+textCenter-35+'px'; 
					 break;
				}
				doc.getElementById("SL_arrow_down").style.left=ArrowLeft;
				doc.getElementById("SL_arrow_up").style.left=ArrowLeft;


                                TranslatorIM.SL_Bubble_Reposition();

				TranslatorIM.SL_NotAllowed();


				TranslatorIM.SL_addEvent(SLdivField, 'mouseup', TranslatorIM.SL_ShowBalloon);
			    	TranslatorIM.SL_addEvent(SLdivField, 'mousedown', TranslatorIM.SL_CloseBalloon);
			    	TranslatorIM.SL_addEvent(SLdivField, 'mouseover', TranslatorIM.SL_addBalloonColor);
			    	TranslatorIM.SL_addEvent(SLdivField, 'mouseout', TranslatorIM.SL_removeBalloonColor);

			    	TranslatorIM.SL_addEvent(SL_locer, 'click', TranslatorIM.SL_locker);  
			    	TranslatorIM.SL_addEvent(SLselect, 'change', TranslatorIM.SL_retranslate);
			    	TranslatorIM.SL_addEvent(SLselectFROM, 'change', TranslatorIM.SL_FROM_retranslate);
			    	TranslatorIM.SL_addEvent(SLswitch, 'click', TranslatorIM.SL_flip);

			    	TranslatorIM.SL_addEvent(SL_P0, 'click', TranslatorIM.SL_retranslate);  
			    	TranslatorIM.SL_addEvent(SL_P1, 'click', TranslatorIM.SL_retranslate);  
			    	TranslatorIM.SL_addEvent(SL_P2, 'click', TranslatorIM.SL_retranslate);  
			    	TranslatorIM.SL_addEvent(SL_P3, 'click', TranslatorIM.SL_retranslate);  


			    	TranslatorIM.SL_addEvent(SL_BBL_locer, 'click', TranslatorIM.SL_BBL_locer);  

			    	if(theSLtext.indexOf(' ')!=-1){
				    TranslatorIM.SL_addEvent(doc.getElementById("SL_shadow_translation_result"), 'mousedown', TranslatorIM.SL_bring_UP);
				    TranslatorIM.SL_addEvent(doc.getElementById("SL_shadow_translation_result2"), 'mouseout', TranslatorIM.SL_addBalloonColor);
			    	}else{
				    TranslatorIM.SL_addEvent(doc.getElementById("SL_shadow_translation_result"), 'mousedown', TranslatorIM.ClickInside);
				    TranslatorIM.SL_addEvent(doc.getElementById("SL_shadow_translation_result"), 'mousedown', TranslatorIM.SL_bring_UP);
				    TranslatorIM.SL_addEvent(doc.getElementById("SL_shadow_translation_result2"), 'mouseout', TranslatorIM.SL_bring_DOWN);
			    	}



			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_alert100"), 'mousedown', TranslatorIM.SL_ALERTPROTECT);



			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_lng_from"), 'mouseout', TranslatorIM.SL_bring_DOWN);

			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_lng_to"), 'mouseout', TranslatorIM.SL_bring_DOWN);

			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_bbl_donate"), 'click', TranslatorIM.SL_Donate);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_TTS_voice"), 'click', TranslatorIM.SL_Voice);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_copy"), 'click', TranslatorIM.SL_CopyToClipBoard);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_bbl_font"), 'click', TranslatorIM.SL_Font);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_pin"), 'click', TranslatorIM.SL_pinme);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_bbl_help"), 'click', TranslatorIM.SL_bbl_help);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_TH"), 'click', TranslatorIM.SL_hist);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_Balloon_Close"), 'click', TranslatorIM.SL_CloseBalloonWithLink);
			    	TranslatorIM.SL_addEvent(doc.getElementById("SL_Balloon_Close"), 'mouseover', TranslatorIM.SL_bring_DOWN);



			    	TranslatorIM.SL_addBalloonColor();
			    	TranslatorIM.SL_removeBalloonColor();
			    	setTimeout(function() { 
				    	doc.getElementById("SL_button").style.display = "none";
				}, 10);    
			}

		}		 
		var OBJ = doc.getElementById('SL_shadow_translation_result');
		var OBJ2 = doc.getElementById('SL_shadow_translation_result2');
		// FONT SIZE icon
		var OBJ3 = doc.getElementById('SL_bbl_font');




		if(TranslatorIM.SL_FONT_SID==""){
		 	TranslatorIM.SL_FontSize_bbl = TranslatorIM.SL_FONT;
			TranslatorIM.SL_FONT2 = TranslatorIM.SL_FONT;
		}else TranslatorIM.SL_FontSize_bbl = TranslatorIM.SL_FONT_SID;

		if(TranslatorIM.SL_FontSize_bbl != OBJ.style.fontSize){
			if(TranslatorIM.SL_FontSize_bbl == "16px"){
				OBJ.style.fontSize = "16px";
				OBJ.style.lineHeight = "22px";
				OBJ2.style.fontSize = "16px";
				OBJ2.style.lineHeight = "22px";
			}else{
				OBJ.style.fontSize = "14px";
			   	OBJ.style.lineHeight = "20px";
			   	OBJ2.style.fontSize = "14px";
			   	OBJ2.style.lineHeight = "20px";
			}
			TranslatorIM.SL_FontSize_bbl = OBJ.style.fontSize;
		}

		if(TranslatorIM.SL_FontSize_bbl == "14px")   OBJ3.className="SL_font_on";
		if(TranslatorIM.SL_FontSize_bbl == "16px")   OBJ3.className="SL_font_off";

		// COPY icon
		doc.getElementById('SL_copy').className="SL_copy_hand";
		// TRANSLATION HISTORY icon
		//doc.getElementById('SL_TH').className="SL_TH";


		setTimeout(function() { 
                        var SLdivField2=FExtension.browserInject.getDocument().getElementById("SL_button");
			if(SLdivField2) SLdivField2.style.display = "none";
		}, 1300); 
		if(TranslatorIM.SL_SHOW_PROVIDERS!="1"){
			doc.getElementById("SL_Bproviders").style.visibility = "hidden";
		} else 	doc.getElementById("SL_Bproviders").style.visibility = "visible";


	 setTimeout(function() { 
	 	if(doc.getElementById('SL_lng_from').value=="auto"){
			doc.getElementById('SL_switch_b').title=FExtension.element(TranslatorIM.SL_LOC,"extDisabled");
			doc.getElementById('SL_switch_b').style.cursor="not-allowed";
		} else {
			doc.getElementById('SL_switch_b').title=FExtension.element(TranslatorIM.SL_LOC,"extSwitch_languages_ttl");
			doc.getElementById('SL_switch_b').style.cursor="pointer";
		}
 	 }, 1300); 
       	 TranslatorIM.SL_HideShowTTSicon();
	 setTimeout(function() { 
	         var obj_1="Tn"+"IT"+"Tt"+"w-t"+"oo"+"lt"+"ip"+"-wr"+"ap";
	         var zi=Math.floor((Math.random() * 100) + 1);
		 if(doc.getElementById(obj_1)) doc.getElementById(obj_1).style.zIndex=zi;
	 }, 10); 

         if(doc.doctype){
             doc.getElementById("SL_shadow_translator").style.width="467px";
	 }

	 TranslatorIM.ACTIVATE_THEMEbbl(TranslatorIM.THEMEmode);
	}catch(e){}
	},

	

	SL_Bubble_Reposition: function() {
		setTimeout(function(){
			var doc = FExtension.browserInject.getDocument();
			var SLdivField = doc.getElementById("SL_shadow_translator");
			var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
			var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
			var position = SLdivField.getBoundingClientRect();
			var x = position.left;
			var y = position.top;
			var DELTAy = 1;
			if (doc.body.offsetHeight < window.innerHeight)	var DELTAy = 17;

			var DELTAx = 1;
			if (doc.body.offsetWidth < window.innerWidth)	var DELTAx = 17;

			if((x+SLdivField.offsetWidth)>(bodyScrollLeft+window.innerWidth-DELTAx)){
				TranslatorIM.SL_MoveX = (bodyScrollLeft+window.innerWidth-SLdivField.offsetWidth-DELTAx) +"px";
                                SLdivField.style.left = TranslatorIM.SL_MoveX;
			}
			
		}, 50);  
	},

	SL_BBL_locer_settler: function(){
          var doc = FExtension.browserInject.getDocument();
	  if(TranslatorIM.SL_OnOff_BTN2=="true") doc.getElementById('SL_BBL_locer').checked=true;
	  else doc.getElementById('SL_BBL_locer').checked=false;
	},

	SL_BBL_locer: function(){
		if(TranslatorIM.SL_EVENT){ 
			var ev = TranslatorIM.SL_EVENT;
		        var doc = FExtension.browserInject.getDocument();

				if(doc.getElementById('SL_BBL_locer')) {
					if(ev.target.id == "SL_BBL_locer") TranslatorIM.SL_OnOff_BTN2 = doc.getElementById('SL_BBL_locer').checked.toString();
				}
		TranslatorIM.SAVE_SES_PARAMS();
		}
	},

	SL_locker: function(){	
	        var doc = FExtension.browserInject.getDocument();
		var ev = TranslatorIM.SL_EVENT;
		if(doc.getElementById('SL_locer')) {
			if(ev.target.id == "SL_locer"){
				if(doc.getElementById('SL_locer').checked==false){
					TranslatorIM.SL_TMPbox="false";			
					if(doc.getElementById('SL_lng_from').value=="auto" && TranslatorIM.SL_DETECTED !=""){
						if(TranslatorIM.FROM_SETTLER() == 1) doc.getElementById('SL_lng_from').value = TranslatorIM.SL_DETECTED;
					}
				} else {
					TranslatorIM.SL_TMPbox="true";
				}
				TranslatorIM.SL_retranslate();
			}
		}
	},

	FROM_SETTLER: function(){
		var LANGS = TranslatorIM.SL_LNG_LIST.split(",");
		var cnt = 0;
		for (var i = 0; i < LANGS.length; i++){
			var templang = LANGS[i].split(":");
			if(TranslatorIM.SL_DETECTED == templang[0]) cnt=1;
		}
		return cnt;
	},

	SL_locker_settler: function(){
	        var doc = FExtension.browserInject.getDocument();
		if(TranslatorIM.SL_TMPbox=="true") {
			doc.getElementById('SL_locer').checked=true;
			TranslatorIM.SL_TMPbox="true";
		}else{ 
			doc.getElementById('SL_locer').checked=false;
			TranslatorIM.SL_TMPbox="false";
		}		
	},

	SL_bbl_help: function(){
		switch(PLATFORM){
			 case "Chrome": var slurl="https://about.imtranslator.net/tutorials/presentations/imtranslator-translator-for-firefox/popup-bubble-application/"; break;
		}
		window.open(slurl,"ImTranslator:Bubble");
	},


        SL_ALERTPROTECT: function(){
                TranslatorIM.SL_quikCloseBalloon();
	},

	SL_flip: function(){
	        var doc = FExtension.browserInject.getDocument();
		try{ doc.onmousemove = null; 
		}catch(e) { 
			//console.log(e); 
		}
		var SLselTO=doc.getElementById("SL_lng_to");
		var SLselFROM=doc.getElementById("SL_lng_from");
		if(SLselFROM.value!="auto"){
 		 if(TranslatorIM.SL_DETECT != SLselFROM.value || doc.getElementById('SL_locer').checked==true){
		   var TMP = SLselTO.value;
		   SLselTO.value=SLselFROM.value;
		   SLselFROM.value=TMP;
		 }
		}
		if(SLselFROM.value!="auto" && doc.getElementById('SL_locer').checked==true)TranslatorIM.SL_DETECT="";
		TranslatorIM.SL_retranslate();
	},


        SL_hist: function(){
		window.open(FExtension.browserInject.getURL('options.html?hist', true),"ImTranslator:Translation_History");
	},

	SL_SYN: function(ob){
		TranslatorIM.SL_retranslate();
	},

	SL_bring_UP: function(){
	    try{
		if(TranslatorIM.SL_EVENT && TranslatorIM.SL_EVENT.which!=3){
			var theMainOBJ = FExtension.browserInject.getDocument().getElementById('SL_shadow_translator');
			var theOBJ = FExtension.browserInject.getDocument().getElementById('SL_shadow_translation_result');
			var theOBJ2 = FExtension.browserInject.getDocument().getElementById('SL_shadow_translation_result2');
			var ToLng = FExtension.browserInject.getDocument().getElementById('SL_lng_to').value;
			theOBJ2.style.display = 'block';
			theOBJ2.style.marginTop = theMainOBJ.offsetTop + 30 + "px";
			theOBJ2.style.marginLeft = theMainOBJ.offsetLeft + 1 + "px";
			theOBJ.style.visibility = "hidden";

                        theOBJ2.style.direction="ltr";
                        theOBJ2.style.textAlign="left";
			if(ToLng=="ar" || ToLng=="iw" || ToLng=="fa" || ToLng=="yi" || ToLng=="ur" || ToLng=="ps" || ToLng=="sd" || ToLng=="ckb" || ToLng=="ug" || ToLng=="dv" || ToLng=="prs"){
                          theOBJ2.style.direction="rtl";
                          theOBJ2.style.textAlign="right";
			}

		}
	     }catch(ex){}
	},

	SL_bring_DOWN: function(){
		var theOBJ = FExtension.browserInject.getDocument().getElementById('SL_shadow_translation_result');
		var theOBJ2 = FExtension.browserInject.getDocument().getElementById('SL_shadow_translation_result2');
	        if(theOBJ2){
			theOBJ2.style.display = 'none';
			theOBJ.style.visibility = "visible";
		}
	},
        SL_FROM_retranslate:function(){
                TranslatorIM.SL_DETECTED="";
		TranslatorIM.SL_retranslate();
	},

	SL_retranslate:function(){       
	     if(TranslatorIM.SL_EVENT.target.parentNode.className!="SL_BL_LABLE_DEACT"){
	        var doc = FExtension.browserInject.getDocument();
		TranslatorIM.SET_FIRST_AVAILABLE_PROV();

		TranslatorIM.SL_bring_DOWN();
		TranslatorIM.SL_bring_UP();

		TranslatorIM.REMOTE_Voice_Close();
		var theSLtext = String(TranslatorIM.getSelectedText());


//                theSLtext = theSLtext.replace("\n","");


		if(theSLtext == "" || theSLtext == "undefined") theSLtext = TranslatorIM.SL_TEMP_TEXT;
//		theSLtext=theSLtext.replace(/\n/ig," @ "); 
		TranslatorIM.SL_BALLOON_TRANSLATION(theSLtext,TranslatorIM.SL_EVENT, 1);	
		if(doc.getElementById('SL_lng_from').value=="auto"){
			doc.getElementById('SL_switch_b').title=FExtension.element(TranslatorIM.SL_LOC,"extDisabled");
			doc.getElementById('SL_switch_b').style.cursor="not-allowed";
		} else { 
			doc.getElementById('SL_switch_b').title=FExtension.element(TranslatorIM.SL_LOC,"extSwitch_languages_ttl");
			doc.getElementById('SL_switch_b').style.cursor="pointer";
		}

                TranslatorIM.SL_HideShowTTSicon();
//                TranslatorIM.SL_DETECT="";

                switch(TranslatorIM.SL_NEST){
			case "TOP": TranslatorIM.SL_arrows('up'); break;
			case "BOTTOM": TranslatorIM.SL_arrows('down'); break;
			case "FLOAT": TranslatorIM.SL_arrows('all'); break;
		}


                TranslatorIM.SL_HideShowTTSicon();
		TranslatorIM.SL_NotAllowed();
		TranslatorIM.SET_FIRST_AVAILABLE_PROV();
		TranslatorIM.SAVE_SES_PARAMS();
	   }	
	},


        SL_HideShowTTSicon: function(){
	         var doc = FExtension.browserInject.getDocument();
		 var SL_from = doc.getElementById('SL_lng_from').value;
		 if(doc.getElementById('SL_locer').checked==false || doc.getElementById('SL_lng_from').value=="auto") SL_from = TranslatorIM.SL_DETECT;

		 
		 if(TranslatorIM.ALLvoices.indexOf(SL_from)!=-1) doc.getElementById('SL_TTS_voice').style.visibility="visible";
		 else doc.getElementById('SL_TTS_voice').style.visibility="hidden";
	},




	SL_CloseBalloonWithLink: function(){
		try {
		 	var doc = FExtension.browserInject.getDocument();
		  	doc.getElementById('SL_shadow_translator').style.display='none';		
                        TranslatorIM.SL_BBL_OBJ_OFF(1);
		} catch (ex){}
	},


	SL_CloseBalloon: function() {
           var doc = FExtension.browserInject.getDocument();
           TranslatorIM.REMOTE_Voice_Close();
	   var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
	   if((window.innerWidth+bodyScrollLeft-TranslatorIM.SL_EVENT.pageX)>20){
		var SLdivField = doc.getElementById("SL_shadow_translator");
		if(doc.getElementById('SL_shadow_translation_result2').style.display == "none"){
		
			TranslatorIM.SL_Xdelta = TranslatorIM.SL_EVENT.pageX - SLdivField.offsetLeft;
			TranslatorIM.SL_Ydelta = TranslatorIM.SL_EVENT.pageY - SLdivField.offsetTop;

			TranslatorIM.SL_addEvent(SLdivField, 'mouseover', TranslatorIM.SL_addBalloonColor);
			TranslatorIM.SL_addEvent(SLdivField, 'mouseout', TranslatorIM.SL_removeBalloonColor);

			if(SLdivField.style.backgroundColor == ""){
				if(TranslatorIM.SL_SAVETEXT == 0){
//	                              	SLdivField.style.left="-10000px";
//	                                SLdivField.style.top="-10000px";
					SLdivField.style.display = 'none';
				}
                                doc.getElementById('SL_balloon_obj').alt="0";
			}else{
				var evt = TranslatorIM.SL_EVENT;
				TranslatorIM.SL_MoveX = evt.pageX + "px";
				TranslatorIM.SL_MoveY = evt.pageY + "px";
				try{
					doc.onmousemove = TranslatorIM.SL_GetTransCurPosition;
				}catch(e){}
			}
		}
		// TranslatorIM.SL_GLOBAL_X1 = TranslatorIM.SL_EVENT.pageX;
		// TranslatorIM.SL_GLOBAL_Y1 = TranslatorIM.SL_EVENT.pageY;
	    }
	},

	SL_addBalloonColor: function() {
	        var doc = FExtension.browserInject.getDocument();
		var SLdivField = doc.getElementById("SL_shadow_translator");
		if(SLdivField){
			SLdivField.style.backgroundColor = "#FEFEFE";
			SLdivField.style.boxShadow = "0px 0px 0px #000";
		}
	},
	SL_removeBalloonColor: function() {
        	var doc = FExtension.browserInject.getDocument();
		var SLdivField = doc.getElementById("SL_shadow_translator");
		if(SLdivField){
			SLdivField.style.backgroundColor = "";
			SLdivField.style.boxShadow = "0px 0px 0px #BAB9B5";
		}
	},


	SL_addEvent: function( obj, type, fn ) {
		if (obj) {
			if ( obj.attachEvent ) {
				obj['e'+type+fn] = fn;
				obj[type+fn] = function(){ obj['e'+type+fn]( TranslatorIM.SL_EVENT ); }
				obj.attachEvent( 'on'+type, obj[type+fn] );
			} else 	obj.addEventListener(type, fn, false);
		}
	},




	SL_GetTransCurPosition: function(e) {
	  if(e){
		var doc = FExtension.browserInject.getDocument();
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		var id = e.target.id;
		var cl = e.target.className;
		var SLdivField = doc.getElementById("SL_shadow_translator");
		if(cl!="SL_options" && (id.indexOf("SL_")==-1 || id=="SL_button")){
			if (e.pageX || e.pageY)	{
				posx = e.pageX;
				posy = e.pageY;
			}
			else if (e.clientX || e.clientY) {
				posx = e.clientX + doc.body.scrollLeft + doc.documentElement.scrollLeft;
				posy = e.clientY + doc.body.scrollTop + doc.getDocument().documentElement.scrollTop;
			}

			var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
			var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;

			var DELTAy = 1;
			if (doc.body.offsetHeight < window.innerHeight)	var DELTAy = 17;

			var DELTAx = 1;
			if (doc.body.offsetWidth < window.innerWidth)	var DELTAx = 17;

			TranslatorIM.SL_MoveX = posx - TranslatorIM.SL_Xdelta + "px";
			if((posx - TranslatorIM.SL_Xdelta) < bodyScrollLeft) {
				TranslatorIM.SL_MoveX = (bodyScrollLeft+DELTAx) +"px";
			}
			if((posx - TranslatorIM.SL_Xdelta) > (bodyScrollLeft+window.innerWidth - SLdivField.offsetWidth-DELTAx) ) {
				TranslatorIM.SL_MoveX = (bodyScrollLeft+window.innerWidth - SLdivField.offsetWidth-DELTAx) +"px";
			}
		
			TranslatorIM.SL_MoveY = posy - TranslatorIM.SL_Ydelta + "px";
			if((posy - TranslatorIM.SL_Ydelta) < bodyScrollTop) {
				TranslatorIM.SL_MoveY = bodyScrollTop +"px";
			}
			if((posy - TranslatorIM.SL_Ydelta) > (bodyScrollTop+window.innerHeight - SLdivField.offsetHeight-DELTAy) ) {
				TranslatorIM.SL_MoveY = (bodyScrollTop+window.innerHeight - SLdivField.offsetHeight-DELTAy) +"px";
			}



			if(TranslatorIM.SL_FRAME==0){
				TranslatorIM.GlobalBoxY=TranslatorIM.SL_MoveY.replace("px","")-bodyScrollTop;
				TranslatorIM.GlobalBoxX=TranslatorIM.SL_MoveX.replace("px","")-bodyScrollLeft;
	               		FExtension.browserInject.runtimeSendMessage({greeting: "SAVE_COORD:>"+TranslatorIM.GlobalBoxX+","+TranslatorIM.GlobalBoxY}, function(response) {});
			}

			SLdivField.style.left = TranslatorIM.SL_MoveX;
			SLdivField.style.top = TranslatorIM.SL_MoveY;

			var OBJ = doc.getElementById('SL_pin');

			if(TranslatorIM.SL_FRAME==0){
				if(cl!="SL_options"){
					OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-on.png')+")";
					OBJ.title=FExtension.element(TranslatorIM.SL_LOC,"extUnPin_ttl");
					TranslatorIM.SL_NEST="FLOAT";
					TranslatorIM.SL_arrows('all');
					TranslatorIM.SL_SID_PIN="true";
					TranslatorIM.SL_FLOATER();
				} 
			}
			if(id!="" || cl!=""){
				//STOPS MOUSE EVENT WHEN A CURSOR IS PRESSED ON THE ARROWS
				if(id=="SL_arrow_down" || id=="SL_arrow_up" || id=="SL_Balloon_Close" || cl=="SL_options"){ 
					var sel = window.getSelection ? window.getSelection() : document.selection;
					SLdivField.style.backgroundColor = "#FEFEFE";
					TranslatorIM.SL_ShowBalloon();
					sel.removeAllRanges();
				}
				//STOPS MOUSE EVENT WHEN A CURSOR IS OUT OF VIEWPORT
				var OUTofVIEWport=5; // was before :50; by VK
				if(e.clientX<=OUTofVIEWport || e.clientY<10 || (e.clientX+OUTofVIEWport) >= (window.innerWidth-DELTAx) || (e.clientY+OUTofVIEWport) >= (window.innerHeight-DELTAy)){
					var sel = window.getSelection ? window.getSelection() : document.selection;
					SLdivField.style.backgroundColor = "#FEFEFE";
					TranslatorIM.SL_ShowBalloon();
					sel.removeAllRanges();
					if (e.stopPropagation) {
					      e.stopPropagation();
					}
				}

			}
		}
	   }
	},


	SL_IMG_LOADER: function(){
	        if(TranslatorIM.SL_ALL_PROVIDERS_BBL=="") TranslatorIM.SL_ALL_PROVIDERS_BBL="Google,Microsoft,Translator,Yandex";
		TranslatorIM.LISTofPR = TranslatorIM.SL_ALL_PROVIDERS_BBL.split(",");
		for (var SL_I = 0; SL_I < TranslatorIM.LISTofPR.length; SL_I++){
		    switch(TranslatorIM.LISTofPR[SL_I]){
			case "Google": TranslatorIM.LISTofPRpairs[SL_I]=LISTofLANGsets[0];break;
			case "Microsoft": TranslatorIM.LISTofPRpairs[SL_I]=LISTofLANGsets[1];break;
			case "Translator": TranslatorIM.LISTofPRpairs[SL_I]=LISTofLANGsets[2];break;
			case "Yandex": TranslatorIM.LISTofPRpairs[SL_I]=LISTofLANGsets[3];break;
		    }	
		}

	        var ext = FExtension.browserInject;
		var doc = ext.getDocument()
            	doc.getElementById('SL_pin').style.background='url('+ext.getURL('content/img/util/pin-on.png')+')';
            	doc.getElementById('SL_button').style.background='url('+ext.getURL('content/img/util/imtranslator-s.png')+')';
            	doc.getElementById('SL_TTS_voice').style.background='url('+ext.getURL('content/img/util/ttsvoice.png')+')';
            	doc.getElementById('SL_switch_b').style.background='url('+ext.getURL('content/img/util/switchb.png')+')';
            	doc.getElementById('SL_lng_from').style.background='#fff url('+ext.getURL('content/img/util/select.png')+') no-repeat 100% 0';
            	doc.getElementById('SL_lng_to').style.background='#fff url('+ext.getURL('content/img/util/select.png')+') no-repeat 100% 0';
            	doc.getElementById('SL_copy').style.background='url('+ext.getURL('content/img/util/copy.png')+')';
                doc.getElementById('SL_bbl_font').style.background='url('+ext.getURL('content/img/util/font.png')+')';
            	doc.getElementById('SL_bbl_help').style.background='url('+ext.getURL('content/img/util/bhelp.png')+')';
	    	doc.getElementById('SL_Balloon_options').style.background="#FFF url('"+ext.getURL('content/img/util/bg3.png')+"')";
	    	doc.getElementById('SL_loading').style.background="url('"+ext.getURL('content/img/util/loading.gif')+"')";
	    	doc.getElementById('SLHKclose').style.background="url('"+ext.getURL('content/img/util/delete.png')+"')";
	    	doc.getElementById('SL_arrow_down').style.background="url('"+ext.getURL('content/img/util/down.png')+"')";
	    	doc.getElementById('SL_arrow_up').style.background="url('"+ext.getURL('content/img/util/up.png')+"')";
	    	doc.getElementById('SL_BBL_IMG').style.background="url('"+ext.getURL('content/img/util/bbl-logo.png')+"')";
	},

	//---------------BALLOON


        CONTROL_SUM_SYN: function (text){
		var doc = FExtension.browserInject.getDocument();
		var SLselFROM=doc.getElementById("SL_lng_from");
		if(SLselFROM.value!="auto" && doc.getElementById('SL_locer').checked==true)TranslatorIM.SL_DETECTED="";
	        if(TranslatorIM.SL_DETECTED == "") TranslatorIM.CONTROL_SUM="";
	},



	DODetection: function(myTransText) {
 	   myTransText = myTransText.replace(/@/ig,"")
	   var doc = FExtension.browserInject.getDocument();
	   TranslatorIM.SL_SETINTERVAL_ST=0;
	   var AUTO = doc.getElementById('SL_locer').checked;
	   var isAuto=0;
	   if(doc.getElementById('SL_lng_from').value=="auto") isAuto=1;


	   //DETECTION ONLY ONCE-------------------
           TranslatorIM.CONTROL_SUM_SYN(myTransText);
	   if(TranslatorIM.CONTROL_SUM == myTransText){
		AUTO = true;
		isAuto = 0;
	   } else TranslatorIM.CONTROL_SUM = myTransText;
	   //DETECTION ONLY ONCE-------------------

	   if(AUTO==false || isAuto==1){
		  if(myTransText!=""){

		    myTransText = myTransText.replace(/|/g,"");
		    myTransText = myTransText.replace(/&/g,"");
		    myTransText = myTransText.replace(/$/g,"");
		    myTransText = myTransText.replace(/^/g,"");
		    myTransText = myTransText.replace(/~/g,"");
		    myTransText = myTransText.replace(/`/g,"");
//		    myTransText = myTransText.replace(/@/g,"");
		    myTransText = myTransText.replace(/%/g," ");

		    var a=Math.floor((new Date).getTime()/36E5)^123456;
		    var tk = a+"|"+Math.floor((Math.sqrt(5)-1)/2*(a^654321)%1*1048576);


		    var num = Math.floor((Math.random() * SL_GEO.length)); 
		    var theRegion = SL_GEO[num];
		    if(TranslatorIM.SL_DOM!="auto") theRegion=TranslatorIM.SL_DOM;

		    var cntr = myTransText.split(" ");
                    var newTEXT = myTransText;

		    var baseUrl ="https://translate.google."+theRegion+"/translate_a/single";
		    var SL_Params = "client=gtx&dt=t&dt=bd&dj=1&source=input&q="+encodeURIComponent(TranslatorIM.truncStrByWord(newTEXT,100))+"&sl=auto&tl=en&hl=en";

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
						TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError1"));
						return false;
					}
				}
			}
			ajaxRequest.onreadystatechange = function(){
				if(ajaxRequest.readyState == 4){

		                        var resp = ajaxRequest.responseText;
					resp = DOMPurify.sanitize (resp);
					var captcha=0;
					if(resp.indexOf('CaptchaRedirect')!=-1) captcha = 1;
				        if(resp.indexOf('ld_result":{"srclangs":["')!=-1) {

                		                var GDImTranslator_lang=resp.split('ld_result":{"srclangs":["');
						var GDImTranslator_lang1=GDImTranslator_lang[1].split('"');
		 				resp=GDImTranslator_lang1[0];

						DetLang = resp;
						DetLang=DetLang.replace("zh-CN","zh");
						DetLang=DetLang.replace("zh-TW","zt");

				                TranslatorIM.CNTR('1211',DetLang+"/"+DetLang, myTransText.length);

						// NOT TRUSTED LANGUAGES
						myTransText = myTransText.trim();
						TranslatorIM.globaltheQ = myTransText.split(" ").length;
			                        if(TranslatorIM.SL_UNTRUST_WORD.indexOf(DetLang)!=-1 && TranslatorIM.globaltheQ==1){
							TranslatorIM.SLDetector(myTransText);
							return false;
						}	
			                        if(DetLang==TranslatorIM.SL_UNTRUST_TEXT){
							TranslatorIM.CONTROL_SUM="";TranslatorIM.SLDetector(myTransText);
							return false;
						}
						//----------------------


                                                TranslatorIM.SL_DETECT = DetLang;

                                                TranslatorIM.SL_FLAG=0;
                                                var cnt=0;

						var LANGSALL = FExtension.element(TranslatorIM.SL_LOC,'extLanguages').split(",");
						var LANGS = TranslatorIM.SL_LNG_LIST.split(",");
					        

						for (var i = 0; i < LANGSALL.length; i++){
							var templang = LANGSALL[i].split(":");
							if(DetLang == templang[0]){ 
							        var tmp = doc.getElementById('SL_lng_from').value;
								if(tmp == "" || tmp == "auto") tmp = TranslatorIM.SL_langSrc;
								//DetLang=tmp;
								TranslatorIM.SL_FLAG=1;
								cnt=1;
							}
						}


	                        	        TranslatorIM.SL_WRONGLANGUAGEDETECTED=0;

						if(cnt==0){
	        	                                TranslatorIM.SL_DETECT = DetLang;
				                        TranslatorIM.SL_DETECTED = DetLang;
							TranslatorIM.SL_setTMPdata("BL_D_PROV","Google");
							TranslatorIM.SL_setTMPdata("BL_T_PROV","Google");
							TranslatorIM.SL_WRONGLANGUAGEDETECTED=1;
						}


		                        	TranslatorIM.LNGforHISTORY = DetLang;
			                        TranslatorIM.SL_SID_FROM = doc.getElementById('SL_lng_from').value;
						TranslatorIM.SL_SID_TO   = doc.getElementById('SL_lng_to').value;
					        if(TranslatorIM.SL_SID_TO!=""){
							doc.getElementById('SL_lng_from').value=TranslatorIM.SL_SID_FROM;
							doc.getElementById('SL_lng_to').value=TranslatorIM.SL_SID_TO;
						}


			                        if(doc.getElementById('SL_lng_to').value==resp && doc.getElementById('SL_lng_from').value!="auto"){						
			                                var TMP=doc.getElementById('SL_lng_to').value;
			                                doc.getElementById('SL_lng_to').value = doc.getElementById('SL_lng_from').value;
		        	                        doc.getElementById('SL_lng_from').value = TMP;
		                	        }else{
							// AVOIDING AUTO DETETECT TAG 
							var autopattern = TranslatorIM.AUTOhandler(doc,AUTO,DetLang);
		                        	        if(doc.getElementById('SL_lng_from').value!=autopattern){
		                        	                cnt=0;
								for (var i = 0; i < LANGS.length; i++){
									var templang = LANGS[i].split(":");
									if(DetLang == templang[0]) cnt=1;
								}

								if(cnt==1) doc.getElementById('SL_lng_from').value=DetLang;
							}

						}
					        TranslatorIM.SL_SETINTERVAL_ST=1;
						TranslatorIM.SL_DETECTED=TranslatorIM.SL_DETECT;
					} else 	TranslatorIM.SLDetector(myTransText);
				}
			}
			baseUrl = baseUrl +"?"+ SL_Params;
			ajaxRequest.open("GET", baseUrl, true);
		        ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		        //ajaxRequest.setRequestHeader("Referer", "https://translate.google.com/");
			ajaxRequest.send(SL_Params);         
		  }
		 }else{
		      	TranslatorIM.SL_SID_FROM = doc.getElementById('SL_lng_from').value;
			TranslatorIM.SL_SID_TO  = doc.getElementById('SL_lng_to').value;
        		if(TranslatorIM.SL_SID_TO!=""){
				doc.getElementById('SL_lng_from').value=TranslatorIM.SL_SID_FROM;
				doc.getElementById('SL_lng_to').value=TranslatorIM.SL_SID_TO;
			}
			TranslatorIM.SL_SETINTERVAL_ST=1;
		 }
		 TranslatorIM.FlipNonStandartDir(doc);
                         
	},


	FlipNonStandartDir: function(doc){

	     if(TranslatorIM.SL_DETECT!=""){
		if(doc.getElementById('SL_lng_from').value != "auto" && doc.getElementById('SL_locer').checked==false){
		        if(TranslatorIM.SL_DETECT == "zh") TranslatorIM.SL_DETECT="zh-CN";
			if(TranslatorIM.SL_DETECT == "zt") TranslatorIM.SL_DETECT="zh-TW";
			if(TranslatorIM.SL_DETECT == "or-IN") TranslatorIM.SL_DETECT="or";
			if(TranslatorIM.SL_DETECT == "ku-Latn") TranslatorIM.SL_DETECT="ku";
			if(TranslatorIM.SL_DETECT == "ku-Arab") TranslatorIM.SL_DETECT="ckb";
			if(TranslatorIM.SL_DETECT == "sr-Latn-RS") TranslatorIM.SL_DETECT="sr-Latn";


		  	if(doc.getElementById("SL_lng_to").value == "tlsl" && TranslatorIM.SL_DETECT == "tl") TranslatorIM.SL_DETECT = "tlsl";
			if(doc.getElementById("SL_lng_to").value == "srsl" && TranslatorIM.SL_DETECT == "sr") TranslatorIM.SL_DETECT = "srsl";
		  	if(doc.getElementById("SL_lng_to").value == "tl" && TranslatorIM.SL_DETECT == "tlsl") TranslatorIM.SL_DETECT = "tl";
		  	if(doc.getElementById("SL_lng_to").value == "sr" && TranslatorIM.SL_DETECT == "srsl") TranslatorIM.SL_DETECT = "sr";
		  if(doc.getElementById("SL_lng_to").value == TranslatorIM.SL_DETECT){
			var TMP=doc.getElementById('SL_lng_to').value;
			doc.getElementById('SL_lng_to').value = doc.getElementById('SL_lng_from').value;
			doc.getElementById('SL_lng_from').value = TMP;
			doc.getElementById('SL_lng_from').title=FExtension.element(TranslatorIM.SL_LOC,'extDetected') + " " + TranslatorIM.SL_GetLongName(TranslatorIM.SL_DETECT);
		  }
		}
	    }
	},


	FlipNonStandartDir___: function(doc){

	        if(TranslatorIM.SL_DETECT == "zh") TranslatorIM.SL_DETECT="zh-CN";
		if(TranslatorIM.SL_DETECT == "zt") TranslatorIM.SL_DETECT="zh-TW";
		if(TranslatorIM.SL_DETECT == "or-IN") TranslatorIM.SL_DETECT="or";
		if(TranslatorIM.SL_DETECT == "ku-Latn") TranslatorIM.SL_DETECT="ku";
		if(TranslatorIM.SL_DETECT == "ku-Arab") TranslatorIM.SL_DETECT="ckb";
		if(TranslatorIM.SL_DETECT == "sr-Latn-RS") TranslatorIM.SL_DETECT="sr-Latn";
		if(doc.getElementById("SL_lng_to").value == "tlsl" && TranslatorIM.SL_DETECT == "tl") TranslatorIM.SL_DETECT = "tlsl";
		if(doc.getElementById("SL_lng_to").value == "srsl" && TranslatorIM.SL_DETECT == "sr") TranslatorIM.SL_DETECT = "srsl";
		if(doc.getElementById("SL_lng_to").value == "sr" && TranslatorIM.SL_DETECT == "srsl") TranslatorIM.SL_DETECT = "sr";
		if(doc.getElementById("SL_lng_to").value == "tl" && TranslatorIM.SL_DETECT == "tlsl") TranslatorIM.SL_DETECT = "tl";


		if(doc.getElementById('SL_lng_to').value==TranslatorIM.SL_DETECT && doc.getElementById('SL_lng_from').value!="auto" && doc.getElementById('SL_locer').checked==false){
			var TMP=doc.getElementById('SL_lng_to').value;
			doc.getElementById('SL_lng_to').value = doc.getElementById('SL_lng_from').value;
			doc.getElementById('SL_lng_from').value = TMP;
		}
	},


	SLDetector: function(myTransText) {

		setTimeout(function() {

		var doc = FExtension.browserInject.getDocument();
		TranslatorIM.SL_SETINTERVAL_ST=0;
		var AUTO = doc.getElementById('SL_locer').checked;

		var isAuto=0;
		if(doc.getElementById('SL_lng_from').value=="auto") isAuto=1;

		   //DETECTION ONLY ONCE-------------------
        	   TranslatorIM.CONTROL_SUM_SYN(myTransText);

		   if(TranslatorIM.CONTROL_SUM == myTransText){
			AUTO = true;
			isAuto = 0;
		   } else TranslatorIM.CONTROL_SUM = myTransText;

		   //DETECTION ONLY ONCE-------------------
		

		if(AUTO==false || isAuto==1){
		  if(myTransText!=""){


		    myTransText = myTransText.replace(/|/g,"");
		    myTransText = myTransText.replace(/&/g,"");
		    myTransText = myTransText.replace(/$/g,"");
		    myTransText = myTransText.replace(/^/g,"");
		    myTransText = myTransText.replace(/~/g,"");
		    myTransText = myTransText.replace(/`/g,"");
//		    myTransText = myTransText.replace(/@/g,"");
		    myTransText = myTransText.replace(/%/g," ");

		    var theLIMIT = 100;
		    //myTransText = TranslatorIM.DELAY+"XX"+myTransText;

		    var fr = doc.getElementById('SL_lng_from').value;
		    if(doc.getElementById('SL_lng_from').value=="auto") fr="*a";
                    TranslatorIM.CNTRP('1211',fr+"/"+doc.getElementById('SL_lng_to').value, truncStrByWord(myTransText,100).length);

		    var SLDImTranslator_url = TranslatorIM.ImTranslator_theurl+"ld.asp?tr=bl&text="+encodeURIComponent(TranslatorIM.truncStrByWord(myTransText,theLIMIT));
		    
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
						TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError1"));
						return false;
					}
				}
			}
			ajaxRequest.onreadystatechange = function(){
				if(ajaxRequest.readyState == 4){


		                   var resp = ajaxRequest.responseText;
				   resp = DOMPurify.sanitize (resp);

		                   if(resp!=""){     
					if(resp.indexOf('#|#')!=-1){
				 	  	var tmp=decodeURIComponent(resp);
						var tmp2 = tmp.split("#|#");
					  	resp=tmp2[0];                       
						var DetLang = resp;
						DetLang=DetLang.replace("zh","zh-CN");
						DetLang=DetLang.replace("zt","zh-TW");
						resp = DetLang;
						TranslatorIM.SL_DETECTED=resp;

                                                TranslatorIM.SL_FLAG=0;
						var LANGSALL = FExtension.element(TranslatorIM.SL_LOC,'extLanguages').split(",");
						var LANGS = TranslatorIM.SL_LNG_LIST.split(",");
						var cnt=0;



						for (var i = 0; i < LANGSALL.length; i++){
							var templang = LANGSALL[i].split(":");
							if(DetLang == templang[0]){ 
							        var tmp = doc.getElementById('SL_lng_from').value;
								if(tmp == "" || tmp == "auto") tmp = TranslatorIM.SL_langSrc;
								//DetLang=tmp;
								cnt=1;
								TranslatorIM.SL_FLAG=1;
							}
						}


                                                TranslatorIM.SL_WRONGLANGUAGEDETECTED=0;
						if(cnt==0){
							if(doc.getElementById('SL_lng_from').value!="auto") DetLang=doc.getElementById('SL_lng_from').value;
						        else DetLang="en";
							TranslatorIM.SL_WRONGLANGUAGEDETECTED=1;
							TranslatorIM.SL_setTMPdata("BL_D_PROV","Google");
							TranslatorIM.SL_setTMPdata("BL_T_PROV","Google");

						}

                                                TranslatorIM.SL_DETECT =  DetLang;
		                        	TranslatorIM.LNGforHISTORY = DetLang;

			                        TranslatorIM.SL_SID_FROM = doc.getElementById('SL_lng_from').value;
						TranslatorIM.SL_SID_TO   = doc.getElementById('SL_lng_to').value;
					        if(TranslatorIM.SL_SID_TO!=""){
							doc.getElementById('SL_lng_from').value=TranslatorIM.SL_SID_FROM;
							doc.getElementById('SL_lng_to').value=TranslatorIM.SL_SID_TO;
						}



			                        if(doc.getElementById('SL_lng_to').value==resp && doc.getElementById('SL_lng_from').value!="auto"){
			                                var TMP=doc.getElementById('SL_lng_to').value;
			                                doc.getElementById('SL_lng_to').value = doc.getElementById('SL_lng_from').value;
		        	                        doc.getElementById('SL_lng_from').value = TMP;
		                	        }else{
							// AVOIDING AUTO DETETECT TAG 
							var autopattern = TranslatorIM.AUTOhandler(doc,AUTO,DetLang);
		                        	        if(doc.getElementById('SL_lng_from').value!=autopattern){
		                        	                cnt=0;
								for (var i = 0; i < LANGS.length; i++){
									var templang = LANGS[i].split(":");
									if(DetLang == templang[0]) cnt=1;
								}
								if(cnt==1) doc.getElementById('SL_lng_from').value=DetLang;
							}

						}


					        TranslatorIM.SL_SETINTERVAL_ST=1;

					} else 	{
						var DetLang = "en";

                                                TranslatorIM.SL_FLAG=0;
						var LANGSALL = FExtension.element(TranslatorIM.SL_LOC,'extLanguages').split(",");
						var LANGS = FExtension.element(TranslatorIM.SL_LOC,'extLanguagesNew').split(",");
						for (var i = 0; i < LANGSALL.length; i++){
							var templang = LANGSALL[i].split(":");
							if(DetLang == templang[0]){ 
							        var tmp = doc.getElementById('SL_lng_from').value;
								if(tmp == "" || tmp == "auto") tmp = TranslatorIM.SL_langSrc;
								DetLang=tmp;
								TranslatorIM.SL_FLAG=1;
							}
						}

						TranslatorIM.SL_DETECTED=DetLang;                                                
		                        	TranslatorIM.LNGforHISTORY = DetLang;
			                        TranslatorIM.SL_SID_FROM = doc.getElementById('SL_lng_from').value;
						TranslatorIM.SL_SID_TO   = doc.getElementById('SL_lng_to').value;
						if(TranslatorIM.SL_TS!=TranslatorIM.SL_TSold){
							doc.getElementById('SL_lng_from').value=TranslatorIM.SL_langSrc;
							doc.getElementById('SL_lng_to').value=TranslatorIM.SL_langDst;
							TranslatorIM.SL_TSold=TranslatorIM.SL_TS; 
						}else{
						        if(TranslatorIM.SL_SID_TO!=""){
								doc.getElementById('SL_lng_from').value=TranslatorIM.SL_SID_FROM;
								doc.getElementById('SL_lng_to').value=TranslatorIM.SL_SID_TO;
							}
						}



			                        if(doc.getElementById('SL_lng_to').value==resp && doc.getElementById('SL_lng_from').value!="auto"){
			                                var TMP=doc.getElementById('SL_lng_to').value;
			                                doc.getElementById('SL_lng_to').value = doc.getElementById('SL_lng_from').value;
		        	                        doc.getElementById('SL_lng_from').value = TMP;
		                	        }else{
		                        	        if(doc.getElementById('SL_lng_from').value!="auto"){
		                        	                cnt=0;
								for (var i = 0; i < LANGS.length; i++){
									var templang = LANGS[i].split(":");
									if(DetLang == templang[0]) cnt=1;
								}
								if(cnt==1) doc.getElementById('SL_lng_from').value=DetLang;
							}


						}

						TranslatorIM.SL_DETECTED=DetLang;
						setTimeout(function() {
							TranslatorIM.SET_FIRST_AVAILABLE_PROV();
						}, 100);

					        TranslatorIM.SL_SETINTERVAL_ST=1;

						
					}
				    } else {
					doc.getElementById('SL_lng_from').value=TranslatorIM.SL_langSrc; 
					doc.getElementById('SL_lng_to').value=TranslatorIM.SL_langDst; 
					TranslatorIM.SL_SETINTERVAL_ST=1;
				    }
				}
			}
			ajaxRequest.open("POST", SLDImTranslator_url, true);
			ajaxRequest.send(null); 
		  }
		 }else{
		      	TranslatorIM.SL_SID_FROM = doc.getElementById('SL_lng_from').value;
			TranslatorIM.SL_SID_TO  = doc.getElementById('SL_lng_to').value;
        		if(TranslatorIM.SL_SID_TO!=""){
				doc.getElementById('SL_lng_from').value=TranslatorIM.SL_SID_FROM;
				doc.getElementById('SL_lng_to').value=TranslatorIM.SL_SID_TO;
			}
			TranslatorIM.SL_SETINTERVAL_ST=1;
		 }
		}, 300);
	},


	truncStrByWord: function(str, length){
		if(str != "undefined"){
			if(str.length > 25){
				length = length - 25;
				var thestr = str;
				if (str.length > length) {
					str = str.substring(0, length);
					str = str.replace(new RegExp("/(.{1,"+length+"})\b.*/"), "$1");    // VK - cuts str to max length without splitting words.
					var str2 = thestr.substring(length, (length+25));
					var tempstr = str2.split(" ");
					var tmp = "";
					for (var i = 0; i < tempstr.length - 1; i++){
						tmp = tmp + tempstr[i] + " ";
					} 
					str = str + tmp;
				}
			} else 
				str = str + " ";
		}
		return str;
	},

	SL_Donate: function(){
		window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GD9D8CPW8HFA2', null, null, null, false, false);
	},



	SL_IF_DETECT_IS_PRESENT: function(dl, ob){
		var resp=dl, out=0;
		var doc = FExtension.browserInject.getDocument();
		if(doc.getElementById('SL_locer').checked==true){
			for(var i=0; i < ob.length; i++) if(ob[i].value == dl) out=1;
			if(out==0 && ob.value != "auto") resp = ob.value;
		} else resp = dl;
		return resp;
	},

        
	SL_Voice: function(){
           var doc = FExtension.browserInject.getDocument();
	 

	   doc.getElementById('SL_alert100').style.display="none";

	   var SL_from = TranslatorIM.SL_IF_DETECT_IS_PRESENT(TranslatorIM.SL_DETECT, doc.getElementById("SL_lng_from"));
	   SL_from = SL_from.replace("-TW","");
	   SL_from = SL_from.replace("-CN","");


	   var TTStext=TranslatorIM.SL_TEMP_TEXT.replace(/<br>/g, " ");

           //vk HARDCODE for local tts;
		   TranslatorIM.SL_SLVoices = "1";
           //vk HARDCODE for local tts;

	   var text = TTStext;
	   switch(TranslatorIM.SL_SLVoices){
		case "0": if(TranslatorIM.ALLvoices.indexOf(SL_from)!=-1){
                              if(SL_TTS.indexOf(SL_from)!=-1){
				if(text.length>TranslatorIM.GTTS_length){
					text = TranslatorIM.truncStrByWord(text,1200);
					TranslatorIM.SL_MEDIA_HOST(SL_from, text); 
				}else TranslatorIM.Google_TTS_ON_TOP(text,SL_from);
			      } else TranslatorIM.Google_TTS_ON_TOP(text,SL_from);
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
		case "1": if(TranslatorIM.ALLvoices.indexOf(SL_from)!=-1){
				if(G_TTS.indexOf(SL_from)!=-1) TranslatorIM.Google_TTS_ON_TOP(text,SL_from);
				else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
		case "2": if(TranslatorIM.ALLvoices.indexOf(SL_from)!=-1){
                              if(SL_TTS.indexOf(SL_from)!=-1) {
					text = TranslatorIM.truncStrByWord(text,1200);
					TranslatorIM.SL_MEDIA_HOST(SL_from, text); 
			      }else TranslatorIM.Google_TTS_ON_TOP(text,SL_from);
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
	   }
	  
	},

	SetTTStextLimit: function(text,limit){
	 text=text.replace(/(\r\n|\n|\r)/gm,"");
	 var ttstexttmp=text.split(" ");
	 var OutPut="";
	 var OutPut_="";
	 for(var i=0; i<ttstexttmp.length; i++){
	     OutPut=OutPut+ttstexttmp[i]+" ";
	     if(OutPut.length>limit) break;
	     else OutPut_=OutPut_+ttstexttmp[i]+" ";
	 }
	 return(OutPut_);
	},

	REMOTE_Voice: function(st,dir, text){
          var doc = FExtension.browserInject.getDocument();
	  if(st==0){
		  if(doc.getElementById("SL_locer").checked!=false && doc.getElementById("SL_lng_from").value!="auto") dir = doc.getElementById("SL_lng_from").value;
	  }
	   dir = dir.replace("-TW","");
	   dir = dir.replace("-CN","");
	   if(dir=="en") dir = dir.replace("en","en-BR");
	   dir = dir.replace("es","es-419");
	   if(dir == "pt") dir = "pt-BR";

	  if(text=="") text=doc.getElementById("SL_shadow_translation_result").innerText.replace(/<[^>]*>?/g,'').substring(0,100);

	  var a=Math.floor((new Date).getTime()/36E5)^123456;
	  var TK = a+"|"+Math.floor((Math.sqrt(5)-1)/2*(a^654321)%1*1048576);

	  var length = text.length;
	  var num = Math.floor((Math.random() * SL_GEO.length)); 
	  var theRegion = SL_GEO[num];
	  if(TranslatorIM.SL_DOM!="auto") theRegion=TranslatorIM.SL_DOM;
	  var baseUrl = "https://translate.google."+theRegion;






	  var client = "tw-ob";
//	  if(dir=="uk") client="t";
	  baseUrl = baseUrl+'/translate_tts?tk='+TK+'&ie=UTF-8&tl='+dir+'&total=1&idx=0&textlen='+length+'&client='+client+'&q='+encodeURIComponent(text);
            const http = new XMLHttpRequest
            http.onload = e => {
                const reader = new FileReader();
                reader.onloadend = function() {
		  var frame = doc.getElementById('SLmedia');
		  if(frame) frame.parentNode.removeChild(frame);

		     var audioElement = document.createElement('audio');
		     audioElement.setAttribute('src', reader.result);
		     audioElement.setAttribute('preload', 'auto');
		     audioElement.setAttribute('controls', '');
		     audioElement.setAttribute('autoplay', '');
		     audioElement.setAttribute('id', 'SLmedia');
		     audioElement.setAttribute('name', 'SLmedia');

		     doc.getElementById('SL_player2').appendChild (audioElement);

		     audioElement.setAttribute('style', 'width:465px;margin-top:0px;margin-left:0px;');
		     document.getElementById('SL_player2').style.display="block";
		     document.getElementById('SL_player2').style.height="40px";
		     document.getElementById('SL_player2').style.width="446px";
		     document.getElementById('SL_player2').style.marginTop="3px";
                }
                reader.readAsDataURL(e.target.response)
            }
    
            http.onerror = e => {
                console.error(e)
                reject(e)
            }
            http.open("GET", baseUrl)
            http.responseType = "blob"
            http.send()

	    doc.getElementById('SL_player2').style.display="block";
	    doc.getElementById('SL_player2').style.height="40px";
	    doc.getElementById('SL_player2').style.width="465px";


	 
	},

	REMOTE_Voice_Close: function(){
  	     var doc = FExtension.browserInject.getDocument();
	     if(TranslatorIM.SL_EVENT.target.lang==""){       	        
		  var frame = doc.getElementById('SLmedia');
		  if(frame) frame.parentNode.removeChild(frame);
		  if(doc.getElementById('SL_alert100')) doc.getElementById('SL_alert100').style.display="none";
		  if(doc.getElementById('SL_player2')) doc.getElementById('SL_player2').style.display="none";2		
	     }

	},

	SL_CopyToClipBoard: function(){
	  	var doc = FExtension.browserInject.getDocument();
		var OBJ = doc.getElementById('SL_shadow_translation_result');
		OBJ.contentEditable = true;
		OBJ.unselectable = "off";
		OBJ.focus();
		var ZIPtext = OBJ.innerHTML;
		//This line is for plant text only
		var preZIPtext = ZIPtext.replace(/<br>/ig,'~');
		preZIPtext = preZIPtext.replace(/(<([^>]+)>)/ig,'').replace(/&nbsp;/ig,'');
		preZIPtext = preZIPtext.replace(/~/ig,'<br>');
		OBJ.innerHTML = preZIPtext;
	        FExtension.browserInject.getDocument().execCommand('SelectAll');
		FExtension.browserInject.getDocument().execCommand("Copy", false, null);
		OBJ.innerHTML = ZIPtext;
                OBJ.style.opacity=0.2;
		setTimeout(function(){ 
			OBJ.style.opacity=1; 
			if (FExtension.browserInject.getDocument().getSelection) {
			    if (FExtension.browserInject.getDocument().getSelection().empty) {  // Chrome
			        FExtension.browserInject.getDocument().getSelection().empty();
			    } else if (FExtension.browserInject.getDocument().getSelection().removeAllRanges) {  // Firefox
			        FExtension.browserInject.getDocument().getSelection().removeAllRanges();
			    }
			} else if (FExtension.browserInject.getDocument().selection) {  // IE?
			    FExtension.browserInject.getDocument().selection.empty();
			}
       	                doc.getElementById('SL_copy_tip').style.display="block";
               	        doc.getElementById('SL_copy_tip').innerHTML=FExtension.element(TranslatorIM.SL_LOC,"extTextCopied");
			setTimeout(function(){ 
	       	                doc.getElementById('SL_copy_tip').style.display="none";
			}, 1500);
		}, 350);
		OBJ.contentEditable = false;
	},

	SL_Font: function(){
	  	var doc = FExtension.browserInject.getDocument();
		var OBJ = doc.getElementById('SL_shadow_translation_result');
		var OBJ2 = doc.getElementById('SL_shadow_translation_result2');
		var OBJ3 = doc.getElementById('SL_bbl_font');
		if(TranslatorIM.SL_FontSize_bbl == OBJ.style.fontSize){
			if(TranslatorIM.SL_FontSize_bbl=="14px"){
				OBJ.style.fontSize = "16px";
				OBJ.style.lineHeight = "22px";
				OBJ2.style.fontSize = "16px";
				OBJ2.style.lineHeight = "22px";
				OBJ3.className = "SL_font_off";
				OBJ3.style.background="url("+FExtension.browserInject.getURL('content/img/util/font-on.png')+")";
				TranslatorIM.SL_FontSize_bbl = "16px";
			}else{
				OBJ.style.fontSize = "14px";
				OBJ.style.lineHeight = "20px";
				OBJ2.style.fontSize = "14px";
				OBJ2.style.lineHeight = "20px";
				OBJ3.className = "SL_font_on";
				OBJ3.style.background="url("+FExtension.browserInject.getURL('content/img/util/font.png')+")";
				TranslatorIM.SL_FontSize_bbl = "14px";
			}

			TranslatorIM.SL_FONT_SID = TranslatorIM.SL_FontSize_bbl;
		}
                TranslatorIM.SL_JUMP(doc);
		TranslatorIM.SAVE_SES_PARAMS();

	},


	SL_pinme: function(){                 
	  if(TranslatorIM.SL_FRAME==0){
	        var doc = FExtension.browserInject.getDocument();
		var OBJ = doc.getElementById('SL_pin');
		var SLdivField = doc.getElementById("SL_shadow_translator");
		if(OBJ.style.background.indexOf("pin-off.png")!=-1){
			setTimeout(function() {
				OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-on.png')+")";
				OBJ.className = "SL_pin_on";
				OBJ.title = FExtension.element(TranslatorIM.SL_LOC,"extUnPin_ttl");
				TranslatorIM.SL_NEST="FLOAT";
				TranslatorIM.SL_FLOATER();
			        var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
				var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
				TranslatorIM.SL_MoveY=Math.ceil(SLdivField.style.top.replace("px",""))+"px";
				TranslatorIM.SL_MoveX=Math.ceil(SLdivField.style.left.replace("px",""))+"px";
				TranslatorIM.GlobalBoxY=(parseInt(TranslatorIM.SL_MoveY.replace("px",""))-bodyScrollTop);
//				TranslatorIM.GlobalBoxX=(parseInt(TranslatorIM.SL_MoveX.replace("px",""))-bodyScrollLeft+SLdivField.offsetWidth);
				TranslatorIM.GlobalBoxX=3000;
		               	FExtension.browserInject.runtimeSendMessage({greeting: "SAVE_COORD:>"+TranslatorIM.GlobalBoxX+","+TranslatorIM.GlobalBoxY}, function(response) {});
			}, 100);
		    TranslatorIM.SL_SID_PIN="true";
		}else{
			TranslatorIM.SL_NEST="";
			OBJ.className = "SL_pin_off";
			OBJ.title = FExtension.element(TranslatorIM.SL_LOC,"extPin_ttl");
			OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-off.png')+")";
			TranslatorIM.SL_SID_PIN="false";
	               	FExtension.browserInject.runtimeSendMessage({greeting: "SAVE_COORD:>0,0"}, function(response) {});
			TranslatorIM.SL_MoveY="-10000px";
			TranslatorIM.SL_MoveX="-10000px";
//			SLdivField.style.left=Math.ceil(SLdivField.style.left.replace("px","")-20)+"px";
			doc.onscroll = function(){}; 
		}   
		TranslatorIM.SAVE_SES_PARAMS();
	    }
	},



	SL_FLOATER: function(){
	  if(TranslatorIM.SL_FRAME==0){
	    	try{ 
			//ALWAYS KEEPS FLOATING MODE FOR 'SAVE RESENT WORK'
			if(TranslatorIM.SL_SAVETEXT == 1) TranslatorIM.SL_NEST= "FLOAT";
			if(TranslatorIM.SL_NEST=="FLOAT"){
			        var doc = FExtension.browserInject.getDocument();
				var THEobj = doc.getElementById("SL_shadow_translator");

				if(TranslatorIM.GlobalBoxY<0)TranslatorIM.GlobalBoxY=1;

				if(parseInt(TranslatorIM.SL_MoveX.replace("px",""))<0) TranslatorIM.SL_MoveX = TranslatorIM.GlobalBoxX +"px";
				if(TranslatorIM.GlobalBoxX>0){
					THEobj.style.top = TranslatorIM.SL_getScrollY() + TranslatorIM.GlobalBoxY + "px";
					THEobj.style.left = TranslatorIM.SL_MoveX;
				}else{
					THEobj.style.top = TranslatorIM.SL_getScrollY() + (window.innerHeight / 2 - 150) + "px";
					THEobj.style.left = (window.innerWidth - 460 - 30) + "px";
				}

				TranslatorIM.WINDOW_and_BUBBLE_alignment(doc,THEobj);
				doc.onscroll = TranslatorIM.SL_FLOATER; 
				window.addEventListener("resize", TranslatorIM.SL_FLOATER);
			} else doc.onscroll = function(){}; 
		} catch(e){}
	  }
	},

	SL_getScrollY: function(){
		var scrOfY = 0;
		if( FExtension.browserInject.getDocument().body && FExtension.browserInject.getDocument().body.scrollTop ) {
			scrOfY = FExtension.browserInject.getDocument().body.scrollTop;
		} else if( FExtension.browserInject.getDocument().documentElement && FExtension.browserInject.getDocument().documentElement.scrollTop  ) {
			scrOfY = FExtension.browserInject.getDocument().documentElement.scrollTop;
		}
		return scrOfY;
	},

	SL_GOOGLE_WPT: function(){
		if(FExtension.browserInject.getDocument().getElementById("wtgbr")){ 
			FExtension.browserInject.getDocument().getElementById("wtgbr").style.display = 'none';
			FExtension.browserInject.getDocument().getElementById("gt-bbar").style.display = 'none';
			FExtension.browserInject.getDocument().getElementById("clp-btn").style.display = 'none';
			FExtension.browserInject.getDocument().getElementById("contentframe").style.marginTop = '-60px';
		} 
	},

	HotKeysWindow: function(e){
		 var s = TranslatorIM.getSelectedText();
		 s=s.substring(0,TranslatorIM.SL_PLANSHET_LIMIT);

//		 if(s!=""){
		  browser.runtime.sendMessage({greeting: "hello"}, function(response) {
	              if(response){
//		        console.log(response.farewell);
        	      }
		  });

		  s=s.replace(/(^[\s]+|[\s]+$)/g, '');
		  var theQ=s.split(" ").length;
		  if(s.match(/[-/‧·﹕﹗！：，。﹖？:-?!.,:{-~!"^_`、\[\]]/g)!=null) theQ=100;

 		  if(TranslatorIM.SL_dict_bbl=="false") theQ=100;

		  if (s.match(/[\u3400-\u9FBF]/) && s.length>1) theQ=100;

		  if(theQ==1 && s!=""){
			  TranslatorIM.SL_MODE=1;
			  setTimeout(function(){
				window.blur(); 
				var location="";
				location = FExtension.browserInject.getURL('content/html/popup/dictionary.html')+"?text="+encodeURIComponent(s);
				var winWidth = 480 ;
				var winHeight = 505 ;
				var posLeft = ( screen.width - winWidth ) / 2 ;
				var posTop = ( screen.height - winHeight ) / 2 ;
				TranslatorIM.myWindow = window.open(location,'ImTranslator','width=' + winWidth + ',height=' + winHeight +',top=' + posTop + ',left=' +  posLeft + ',resizable=no,scrollbars=no,toolbar=no,titlebar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no');
				TranslatorIM.myWindow.focus();
			  },500);
		   }else{
			  TranslatorIM.SL_MODE=0;
			  setTimeout(function(){
				window.blur(); 
				var location="";
				location = FExtension.browserInject.getURL('content/html/popup/translator.html')+"?text="+encodeURIComponent(s);
				var winWidth = 480 ;

				if(TranslatorIM.BACK_VIEW==2) var winHeight = 505;
				if(TranslatorIM.BACK_VIEW==1) var winHeight = 630;

				var posLeft = ( screen.width - winWidth ) / 2 ;
				var posTop = ( screen.height - winHeight ) / 2 ;
				TranslatorIM.myWindow = window.open(location,'ImTranslator','width=' + winWidth + ',height=' + winHeight +',top=' + posTop + ',left=' +  posLeft + ',resizable=no,scrollbars=no,toolbar=no,titlebar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no');
				TranslatorIM.myWindow.focus();
			  },500);
		   }
//		 }
	},

	SL_BALLOON_TRANSLATION: function(myTransText,evt,st) {

	     if(myTransText!=""){
		var doc = FExtension.browserInject.getDocument();
		doc.getElementById('SL_loading').style.display='block';
		TranslatorIM.SL_IS_DICTIONARY=0;
		doc.getElementById('SL_TTS_voice').style.display='block';
		doc.getElementById('SL_bbl_font_patch').style.display='none';
		if(TranslatorIM.AVOIDAUTODETECT==0){
			var big5 = TranslatorIM.DetectBig5(myTransText);
			if(big5 == 0){
				if(DET == 0) TranslatorIM.DODetection(myTransText);
				else         TranslatorIM.SLDetector(myTransText);
			}else{
				TranslatorIM.SLDetector(myTransText);
			}
		}else 		TranslatorIM.SL_SETINTERVAL_ST=1;
		//TranslatorIM.AVOIDAUTODETECT=0;
		var Tobj = doc.getElementById('SL_shadow_translation_result');
		var Tobj2 = doc.getElementById('SL_shadow_translation_result2');


                var SLdivField=doc.getElementById('SL_shadow_translator');
               	Tobj.innerText = "";
                Tobj2.innerText = "";

       		doc.getElementById('SL_loading').style.display='block';

		SLdivField.style.display='block';


		setTimeout(function(){
		    var tmr=0;
		    var SLIDL = setInterval(function(){
			if(tmr>=30) clearInterval(SLIDL);

			if(TranslatorIM.SL_SETINTERVAL_ST==1) {
				TranslatorIM.SL_EXECUTE_TRANSLATION(myTransText,evt,st);
				clearInterval(SLIDL);
                                TranslatorIM.SL_SETINTERVAL_ST=0;
				//setTimeout(function(){
					if(Tobj.innerText.replace(/<[^>]*>?/g,'')==""){
						doc.getElementById('SL_loading').style.display = 'block';
		                                TranslatorIM.SL_JUMP(doc);
						doc.getElementById('SL_loading').style.display = 'none';
		                        }
				//},1500);
				doc.getElementById('SL_loading').style.display = 'none';
				TranslatorIM.SL_HideShowTTSicon(); 
			} else tmr++;
		    },150);  
 	         },150); 
	     }	
	},

        SL_SET_PROVIDERS: function(mode){
          TranslatorIM.ListProviders="";
 	  var doc = FExtension.browserInject.getDocument();
 	  var from = doc.getElementById("SL_lng_from").value;
	  var list = TranslatorIM.SL_LNG_CUSTOM_LIST;
	  if(list=="all") list = TranslatorIM.LISTofPRpairs[0];
	  var L1 = list.split(",");
	  var finded = 0;
	  for(var i=0; i<L1.length; i++){
	  	if(L1[i] == TranslatorIM.SL_DETECT) finded = 1;
	  }


//	  if(finded==0)	  if(TranslatorIM.SL_DETECT!="" && from=="auto") from = TranslatorIM.SL_DETECT;
//	  else	  if(TranslatorIM.SL_DETECT!="") from = TranslatorIM.SL_DETECT;

	  if(finded==1)	  if(TranslatorIM.SL_DETECT!="") from = TranslatorIM.SL_DETECT;


	  if(doc.getElementById("SL_locer").checked==true)  from = doc.getElementById("SL_lng_from").value;

 	  var to = doc.getElementById("SL_lng_to").value;


 	  if(to!=""){

 	   for(var I=0; I<TranslatorIM.LISTofPR.length; I++){
            if(mode==1){
		    if(TranslatorIM.BL_D_PROV == TranslatorIM.LISTofPR[I]) 	doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
		    else doc.getElementById("SL_P"+I).className="SL_BL_LABLE_OFF";
	    }else{
		    if(TranslatorIM.BL_T_PROV == TranslatorIM.LISTofPR[I]) 	doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
		    else doc.getElementById("SL_P"+I).className="SL_BL_LABLE_OFF";
	    }
	    if(from!="auto"){
	     var ftemp = from;
	     if(TranslatorIM.SL_DETECT!=from) ftemp = TranslatorIM.SL_DETECT;
	     if(doc.getElementById('SL_locer').checked==true) ftemp = from;

	     if(TranslatorIM.FIND_PROVIDER(TranslatorIM.LISTofPRpairs[I],ftemp) ==-1 || TranslatorIM.FIND_PROVIDER(TranslatorIM.LISTofPRpairs[I],to)==-1) doc.getElementById("SL_P"+I).className="SL_BL_LABLE_DEACT";
	     else TranslatorIM.ListProviders=TranslatorIM.ListProviders+TranslatorIM.LISTofPR[I]+",";
	     if(TranslatorIM.LISTofPR[I]=="Translator"){
	      if(TranslatorIM.BL_D_PROV == "Translator") doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
	      else doc.getElementById("SL_P"+I).className="SL_BL_LABLE_OFF";

	      if(TranslatorIM.LISTofPRpairs[I].indexOf(ftemp + "/" + to)==-1){
		 doc.getElementById("SL_P"+I).className="SL_BL_LABLE_DEACT";
                 TranslatorIM.ListProviders=TranslatorIM.ListProviders.replace(TranslatorIM.LISTofPR[I]+",","");
	      } else TranslatorIM.ListProviders=TranslatorIM.ListProviders+TranslatorIM.LISTofPR[I]+",";
	     }
	    } else {
	     if(TranslatorIM.FIND_PROVIDER(TranslatorIM.LISTofPRpairs[I],TranslatorIM.SL_DETECT) ==-1 || TranslatorIM.FIND_PROVIDER(TranslatorIM.LISTofPRpairs[I],to)==-1) doc.getElementById("SL_P"+I).className="SL_BL_LABLE_DEACT";
	     else TranslatorIM.ListProviders=TranslatorIM.ListProviders+TranslatorIM.LISTofPR[I]+",";
	     if(TranslatorIM.LISTofPR[I]=="Translator"){
	      if(TranslatorIM.BL_D_PROV == "Translator") doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
	      else doc.getElementById("SL_P"+I).className="SL_BL_LABLE_OFF";
	      if(TranslatorIM.LISTofPRpairs[I].indexOf(TranslatorIM.SL_DETECT + "/" + to)==-1){
		 doc.getElementById("SL_P"+I).className="SL_BL_LABLE_DEACT";
                 TranslatorIM.ListProviders=TranslatorIM.ListProviders.replace(TranslatorIM.LISTofPR[I]+",","");
	      } else TranslatorIM.ListProviders=TranslatorIM.ListProviders+TranslatorIM.LISTofPR[I]+",";
	     }
	    }
            TranslatorIM.ListProviders=TranslatorIM.ListProviders.replace("Translator,Translator","Translator");
           }
	  }

	  if(TranslatorIM.SL_SHOW_PROVIDERS==0) {
	        var PR = "Google";
		TranslatorIM.ListProviders= PR + ",";	  
		TranslatorIM.SL_setTMPdata("BL_D_PROV",PR);
		TranslatorIM.SL_setTMPdata("BL_T_PROV",PR);
	  }           
        },


	FIND_PROVIDER: function(list,ln){
	  var arr = list.split(",");
	  var cnt=-1
	  for(var i=0; i<arr.length; i++){
		if(arr[i]==ln) cnt++;
	  }
	  return cnt;
	},




	SET_FIRST_AVAILABLE_PROV: function(){

	  if(TranslatorIM.SL_SHOW_PROVIDERS!=0) {
	    var doc = FExtension.browserInject.getDocument();
	    var s = FExtension.browserInject.getSelectionText();
	    if(s=="" && TranslatorIM.SL_temp_result!="") s=TranslatorIM.SL_temp_result;

	    s=s.replace(/(^[\s]+|[\s]+$)/g, '');
	    var theQ=s.split(" ").length;

	    if(s.match(/[-/‧·﹕﹗！：，。﹖？:-?!.,:{-~!"^_`、\[\]]/g)!=null) theQ=100;
	    //if(TranslatorIM.SL_dict_bbl=="false") theQ=100;

	    if (s.match(/[\u3400-\u9FBF]/) && s.length>1) theQ=100;
	    TranslatorIM.SL_SET_PROVIDERS(theQ);
	    var theList = TranslatorIM.ListProviders.split(",");

	    if(theQ==1){
	      TranslatorIM.SL_MODE=1;	
	      if(TranslatorIM.BL_D_PROV=="" || TranslatorIM.BL_D_PROV==null || TranslatorIM.BL_D_PROV=="undefined"){
		  if(TranslatorIM.SL_dict_bbl=="true"){
			  var arr1 = TranslatorIM.SL_DICT_PRESENT.split(",");
			  for(I=0; I<(theList.length-1); I++){
			    for(J=0; J<arr1.length; J++){
		        	var arr2=arr1[J].split(":");
				if(arr2[1]==1 && theList[I]==arr2[0]){

					TranslatorIM.SL_setTMPdata("BL_D_PROV",arr2[0]);
					I=1000;J=1000;
				}
			    }
			  }
		 } else {
			TranslatorIM.SL_setTMPdata("BL_D_PROV",theList[0]);
		 }


		  var arr = TranslatorIM.SL_ALL_PROVIDERS_BBL.split(",");	
		  for(I=0; I<arr.length; I++){
			if(arr[I]==TranslatorIM.BL_D_PROV){
				doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
				I=1000;
			}
		  }
	      } else {
		 if(TranslatorIM.ListProviders.indexOf(TranslatorIM.BL_D_PROV)==-1){
		  var arr1 = TranslatorIM.SL_DICT_PRESENT.split(",");
		  for(I=0; I<(theList.length-1); I++){
		    for(J=0; J<arr1.length; J++){
		        var arr2=arr1[J].split(":");
			if(arr2[1]==1 && theList[I]==arr2[0]){
				TranslatorIM.SL_setTMPdata("BL_D_PROV",arr2[0]);
				doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
				I=1000;J=1000;
			}
		    }
		  }
		 }


	         if(TranslatorIM.ListProviders.indexOf(TranslatorIM.BL_D_PROV) == -1){
			TranslatorIM.SL_setTMPdata("BL_D_PROV",theList[0]);	
			TranslatorIM.SET_FIRST_AVAILABLE_PROV();
		 }

	      }
	    }else{
	      TranslatorIM.SL_MODE=0;
	      if(TranslatorIM.BL_T_PROV=="" || TranslatorIM.BL_T_PROV==null || TranslatorIM.BL_T_PROV=="undefined"){
		  TranslatorIM.SL_setTMPdata("BL_T_PROV",theList[0]);
		  var arr = TranslatorIM.SL_ALL_PROVIDERS_BBL.split(",");	
		  for(I=0; I<arr.length; I++){
			if(theList[0]==arr[I]){
				doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
				break;
			}
		  }
	      } else {
		 if(TranslatorIM.ListProviders.indexOf(TranslatorIM.BL_T_PROV)!=-1){
		  var arr = TranslatorIM.SL_ALL_PROVIDERS_BBL.split(",");	
		  for(I=0; I<arr.length; I++){
			if(arr[I]==TranslatorIM.BL_T_PROV){
				doc.getElementById("SL_P"+I).className="SL_BL_LABLE_ON";
				I=1000;
			}
		  }
		 } else {
		
		  var arr = TranslatorIM.ListProviders.split(",");	
		  TranslatorIM.SL_setTMPdata("BL_T_PROV",arr[0]);
//		  doc.getElementById("SL_P0").className="SL_BL_LABLE_ON";
	   	  TranslatorIM.SET_FIRST_AVAILABLE_PROV();
		 }
	      }

            }	


	    if(TranslatorIM.SL_WRONGLANGUAGEDETECTED==1){
		var pattern = doc.getElementById("SL_Bproviders").getElementsByTagName("div");
		var cnt=0;
		for(var j=0; j<pattern.length; j++){
		    if(pattern[j].id.indexOf("SL_PN")==-1){
			if(pattern[j].title.toLowerCase()=="google"){
				pattern[j].className="SL_BL_LABLE_ON";
			} else {
				pattern[j].className="SL_BL_LABLE_DEACT";
			}
		    }
		}
		TranslatorIM.SL_setTMPdata("BL_D_PROV","Google");
		TranslatorIM.SL_setTMPdata("BL_T_PROV","Google");
	    }


	 } else{
		TranslatorIM.SL_setTMPdata("BL_D_PROV","Google");
		TranslatorIM.SL_setTMPdata("BL_T_PROV","Google");
	 }

        },






	SL_EXECUTE_TRANSLATION: function(myTransText,evt,st, win) {

	   var tmptext = FExtension.browserInject.getSelectionText();
	   if(tmptext !="") myTransText = tmptext;
           else myTransText = TranslatorIM.SL_TEMP_TEXT;

//	   myTransText=myTransText.replace(/(<([^>]+)>)/ig, '');
	   myTransText=myTransText.replace(/</g, '');
	   myTransText=myTransText.replace(/>/g, '');


           var t1 = new Date().getTime();
           var doc = FExtension.browserInject;
	   var doc2 = doc.getDocument();
           var S = doc2.getElementById('SL_lng_from').value;
           var T = doc2.getElementById('SL_lng_to').value;

           if(doc2.getElementById("SL_player2")) {
		doc2.getElementById("SL_player2").textContent="";
		doc2.getElementById("SL_player2").style.display="none";
		doc2.getElementById("SL_player2").style.height="0px";
	   }


         TranslatorIM.SET_FIRST_AVAILABLE_PROV();

	 if(TranslatorIM.ListProviders=="" && TranslatorIM.SL_SHOW_PROVIDERS == 1) TranslatorIM.NoProvidersAlert();
	 else {
           var STATUS = TranslatorIM.DETERMIN_IF_LANGUAGE_IS_AVAILABLE_BBL();

	   if(STATUS == 0 && TranslatorIM.SL_SHOW_PROVIDERS == 0) TranslatorIM.NoProvidersAlert();
	   else {

           if(doc2.getElementById("SL_locer").checked==true){
	 	if(doc2.getElementById('SL_lng_from').value!="auto"){
			doc2.getElementById('SL_lng_from').title="";
		}
	   }


	   FExtension.browserInject.runtimeSendMessage({greeting: "CM_BBL:>" + T}, function(response) {}); 

	   var ttl = TranslatorIM.SL_DETECT;
	   if(ttl == "") ttl = 	doc2.getElementById('SL_lng_from').value;

	   TranslatorIM.SL_DETECT = ttl;
           doc2.getElementById('SL_TTS_voice').title=TranslatorIM.SL_GetLongName(ttl);
	   if(TranslatorIM.SL_DETECT != "" && doc2.getElementById("SL_locer").checked==false && S != "auto") {
	    	S = TranslatorIM.SL_DETECTED;
		var LANGS = TranslatorIM.SL_LNG_LIST.split(",");
	        cnt=0;
		for (var i = 0; i < LANGS.length; i++){
			var templang = LANGS[i].split(":");
			if(TranslatorIM.SL_DETECT == templang[0]) cnt=1;
		}
		if(cnt==1){
			doc2.getElementById('SL_lng_from').value=TranslatorIM.SL_DETECT;
		}
	   }


 	   if(T!="") TranslatorIM.SL_SAVE_FAVORITE_LANGUAGES(T, 'SL_lng_to', 0, TranslatorIM.SL_FAV_LANGS_BBL, "BBL");
	   else TranslatorIM.SL_SAVE_FAVORITE_LANGUAGES(TranslatorIM.SL_langDst_bbl2, 'SL_lng_to', 0, TranslatorIM.SL_FAV_LANGS_BBL, "BBL");

   	   if(TranslatorIM.BL_D_PROV=="" && TranslatorIM.BL_T_PROV!=""){
		TranslatorIM.BL_D_PROV=TranslatorIM.BL_T_PROV;
		TranslatorIM.SET_FIRST_AVAILABLE_PROV();
	   }	
           var PR = TranslatorIM.BL_D_PROV;
	   if(TranslatorIM.SL_MODE==0) PR = TranslatorIM.BL_T_PROV;
         



	   if(PR == "Yandex"){
	   	TranslatorIM.SL_YANDEX(myTransText,S+"/"+T);
		return false;
	   }

	   if(PR == "Google"){
		doc2.getElementById('SL_shadow_translation_result').textContent="";
		doc2.getElementById('SL_shadow_translation_result2').textContent="";
		doc2.getElementById('SL_loading').style.display = 'block';
           	myTransText = myTransText.trim();
		myTransText = myTransText.replace(/\t/ig,"");
		myTransText = myTransText.replace(/"/ig,"'");

             if(myTransText.length<=TranslatorIM.SL_Balloon_translation_limit){
		if(myTransText != ""){

			TranslatorIM.SL_SETINTERVAL_PROXY=0;
                        doc2.getElementById('SL_balloon_obj').alt="1";
/*
		       	var theQ1=myTransText.split(" ").length;
		       	var theQ2=myTransText.split("\n").length;
		       	var theQ = theQ1;
			if(theQ2>0) theQ = theQ2;
*/
		        myTransText=myTransText.replace(/(^[\s]+|[\s]+$)/g, '');
	       	   	var theQ=myTransText.split(" ").length;


			if(myTransText.match(/[-/‧·﹕﹗！：，。﹖？:-?!.,:{-~!"^_`、\[\]]/g)!=null) theQ=100;
		        if(TranslatorIM.SL_dict_bbl=="false") theQ=100;
			var num = Math.floor((Math.random() * SL_GEO.length)); 
			var theRegion = SL_GEO[num];


			if(TranslatorIM.SL_DOM!="auto") theRegion=TranslatorIM.SL_DOM;
			var baseUrl = "https://translate.google."+theRegion+"/translate_a/single";

			var Stemp=S;
//			if(Stemp=="en" || TranslatorIM.SL_FLAG==1) Stemp="auto";

			if(TranslatorIM.SL_WRONGLANGUAGEDETECTED==1) Stemp="auto";


			if(Stemp == "srsl") Stemp = "sr";
			if(Stemp == "tlsl") Stemp = "tl";
			if(T == "srsl") T = "sr";
			if(T == "tlsl") T = "tl";



			var SL_Params = "client=gtx&dt=t&dt=bd&dj=1&source=input&q="+encodeURIComponent(myTransText)+"&sl="+Stemp+"&tl="+T+"&hl=en";

			if(theQ==1){
				TranslatorIM.SL_MODE=1;
				myTransText=myTransText.replace(/\)/gi,"");
				myTransText=myTransText.replace(/\(/gi,"");
				myTransText=myTransText.replace(/\"/gi,"");
				var baseUrl ="https://translate.google."+theRegion+"/translate_a/single";
				var a=Math.floor((new Date).getTime()/36E5)^123456;
				var tk = a+"|"+Math.floor((Math.sqrt(5)-1)/2*(a^654321)%1*1048576);
				var SL_Params = "client=gtx&dt=t&dt=bd&dj=1&source=input&q="+encodeURIComponent(myTransText.toLowerCase())+"&sl="+Stemp+"&tl="+T+"&hl=en&tk="+tk;
			}


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
						TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError1"));
						return false;
					}
				}
			  }

			  ajaxRequest.onreadystatechange = function(){

				if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
                                        

	                                var resp = ajaxRequest.responseText;

			       	   	var theQ=100;
			       	   	if(resp.indexOf('"reverse_translation":')>-1)theQ=1;

				 	var NoDict=0;

					resp = DOMPurify.sanitize (resp);


					resp = resp.replace(/\\u0027/g,"'");
			                resp = resp.replace(/\\u0026/ig,"&");
				        resp = resp.replace(/\\u003c/ig,"<");
			               	resp = resp.replace(/\\u003e/ig,">");


	                                  	if(resp.indexOf('{"trans":')>-1){
        	                		 	if(theQ>1){
        		                                  var ReadyToUseGoogleText="";
	                	                          var Gr1=resp.split('"trans":"');

                                	        	  for(var h=1; h<Gr1.length; h++){
                                		              var Gr2 = Gr1[h].split('","orig"');
                        	                	      var Gr3 = Gr2[0].replace(/\\n/ig,"<br>");
	                	                              Gr3 = Gr3.replace(/\\"/ig,"'");
		               	                              Gr3 = Gr3.replace(/\\u0026/ig,"&");
        		       	                              Gr3 = Gr3.replace(/\\u003c/ig,"<");
               			                              Gr3 = Gr3.replace(/\\u003e/ig,">");
               		        	                      Gr3 = Gr3.replace(/\\u0027/ig,"'");
               		                	              Gr3 = Gr3.replace(/\\u003d/ig,"=");
               		                        	      Gr3 = Gr3.replace(/\\r/ig,"");
 
	        	                                      ReadyToUseGoogleText=ReadyToUseGoogleText+Gr3;
		                                          }

				 			   var nmr = myTransText.split(" ").length;
							   if(nmr > 1) TranslatorIM.CNTR('1221',Stemp+"/"+T, myTransText.length);
							   else TranslatorIM.CNTR('1231',Stemp+"/"+T, myTransText.length);
							  resp = ReadyToUseGoogleText;
	                                           	}
							var HID=2;
						}


						if(resp.indexOf('sentences":')>-1){
                                	                TranslatorIM.SL_SETINTERVAL_PROXY++;

	                        			if(theQ==1 && resp.indexOf('src":"')==-1){

         	               		        	 	if(resp.indexOf('","')!=-1){
	                	                        	   resp = resp.replace('["',''); 
	        	                	                   var R1 = resp.split('","');
        	        	                	           resp = R1[0];
                	        		                } else resp = resp.replace(/"/ig,'');
                        	        	        NoDict = 1;
							}


			 			        if(NoDict==0 && resp.indexOf('sentences":')>-1){
								TranslatorIM.SL_SETINTERVAL_PROXY++;
								resp = TranslatorIM.SL_DICTparser(resp);
								TranslatorIM.CNTR('1231',Stemp+"/"+T, myTransText.length);
								resp = resp.replace(/\\/g,"");
		 				        } else {
								resp="";
								TranslatorIM.SL_OTHER_PROVIDERS(myTransText,st);
							}


							var idtmp="";
							var HID=6;
							if(resp.indexOf('id=_X')==-1) HID=2;
						}

					if(resp != ""){
                                                doc2.getElementById('SL_shadow_translation_result').innerText="";
                                                doc2.getElementById('SL_shadow_translation_result2').innerText="";
						if(resp.indexOf('<div')==-1) resp = TranslatorIM.PPB_tts_icon(T,resp);			

						var resp = DOMPurify.sanitize (resp);

						doc2.getElementById('SL_shadow_translation_result').innerHTML = resp;
						doc2.getElementById('SL_shadow_translation_result2').innerHTML = resp;
						TranslatorIM.ACTIVATE_THEMEbbl(TranslatorIM.THEMEmode);
						var resp2history=resp;

						if(doc2.getElementById('SL_shadow_translation_result')) doc2.getElementById('SL_shadow_translation_result').onclick = function() { 
							 var target = TranslatorIM.SL_EVENT.target || TranslatorIM.SL_EVENT.srcElement;
							 var id = target.id
					                 TranslatorIM.REMOTE_Voice_Close();
							 var className = target.className;
							 if(className == "_V") 	 TranslatorIM.tagClick(TranslatorIM.SL_EVENT,id);
							 if(className == "TTS1") TranslatorIM.tagClick(TranslatorIM.SL_EVENT,id);
							 if(className == "TTS2") TranslatorIM.tagClick(TranslatorIM.SL_EVENT,id);
						};


//						setTimeout(function(){
       		        	                       	TranslatorIM.SL_JUMP(doc2);
//						},50);

                                                TranslatorIM.SL_temp_result=resp2history;

						if (TranslatorIM.SL_TH_2 == 1){


							var SLnow = new Date();
							SLnow = SLnow.toString();
							var TMPtime = SLnow.split(" ");
							var CurDT = TMPtime[1] + " " + TMPtime[2] + " " + TMPtime[3] + ", " + TMPtime[4];
				                        var LNGfrom = S;

				                        if(S=="auto" || doc2.getElementById("SL_locer").checked == false) var LNGfrom = TranslatorIM.LNGforHISTORY;
							if(TranslatorIM.SL_WRONGLANGUAGEDETECTED==1) LNGfrom="auto";

                                                        var ImtranslatorGoogleResult="";
	                                                myTransText=myTransText.replace(/~/ig," ");
	                                                var ImtranslatorGoogleResult4 = resp2history.replace(/~/ig," ");


				 				if(theQ==1){
									var TEMresp = ImtranslatorGoogleResult4.split("<br>");
									if(TEMresp.length>2){
										for(var k=0; k<TEMresp.length; k++){
											if(k>0)ImtranslatorGoogleResult = ImtranslatorGoogleResult + TEMresp[k];
										}
									} else ImtranslatorGoogleResult = ImtranslatorGoogleResult4;
								} else ImtranslatorGoogleResult = TranslatorIM.ForHistory;

								ImtranslatorGoogleResult=ImtranslatorGoogleResult.replace(/<br>/g,"\n");
							        myTransText=myTransText.replace(/\^/g,"@");
							        var DICT = TranslatorIM.BL_T_PROV[0];
								if(TranslatorIM.SL_MODE==1) DICT = TranslatorIM.BL_D_PROV[0];
								var BeforeSanitization = myTransText + "~~" + ImtranslatorGoogleResult + "~~" + LNGfrom + "|" + T + "~~"+ doc2.location+"~~"+CurDT+"~~"+HID+"~~"+DICT+"^^";

								var SanitizedHistory = DOMPurify.sanitize (BeforeSanitization);
								doc.runtimeSendMessage({greeting:"hist:>"+ SanitizedHistory}, function(response) {
									if(response){}
								});
							}
						} else 	TranslatorIM.SL_OTHER_PROVIDERS(myTransText,st);


						doc2.getElementById('SL_shadow_translation_result').style.direction = "ltr";
						doc2.getElementById('SL_shadow_translation_result').style.textAlign = "left";

						if(T=="ar" || T=="iw" || T=="fa" || T=="yi" || T=="ur" || T=="ps" || T=="sd" || T=="ckb" || T=="ug" || T=="dv" || T=="prs"){
							doc2.getElementById('SL_shadow_translation_result').style.direction = "rtl";
							doc2.getElementById('SL_shadow_translation_result').style.textAlign = "right";
						}
						doc2.getElementById('SL_shadow_translator').style.display = 'block';
						TranslatorIM.SL_temp_result = resp2history;
						if(doc2.getElementById('SL_shadow_translator').offsetHeight > 100) TranslatorIM.SL_BALLON_H = doc2.getElementById('SL_shadow_translator').offsetHeight;

					}else{
					  if(ajaxRequest.readyState == 4){
						TranslatorIM.SL_OTHER_PROVIDERS(myTransText,st);
					  }
					} 
				}


			



			  }

			  var METHOD = "GET";
			  if(theQ==1) baseUrl = baseUrl + "?" + SL_Params;
			  else METHOD = "POST";

			  ajaxRequest.open(METHOD, baseUrl, true);
			  ajaxRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');

			  ajaxRequest.send(SL_Params);

	       
        	    } else TranslatorIM.SL_OTHER_PROVIDERS(myTransText,st);
		  } else {

		   if(TranslatorIM.BL_D_PROV == "Microsoft") TranslatorIM.MS(S,T,myTransText,st);
		   else TranslatorIM.SL_OTHER_PROVIDERS(myTransText,st);	
		  }
		 }
	 }
//         TranslatorIM.SAVE_SES_PARAMS();

	},

	SL_OTHER_PROVIDERS: function(text,st){
	     var doc = FExtension.browserInject;
	     var doc2 = doc.getDocument();
	     if(doc2.getElementById('SL_shadow_translation_result').innerText.replace(/(<([^>]+)>)/ig,"")==""){
		doc2.getElementById('SL_shadow_translation_result').textContent="";
		doc2.getElementById('SL_shadow_translation_result2').textContent="";
                doc2.getElementById('SL_loading').style.display="block";

	        var S = doc2.getElementById('SL_lng_from').value;
//	        if(S=="auto" && TranslatorIM.SL_DETECT != "") S=TranslatorIM.SL_DETECT;
	        if(TranslatorIM.SL_DETECT != "") S=TranslatorIM.SL_DETECT;
	        var T = doc2.getElementById('SL_lng_to').value;

		var PR = TranslatorIM.BL_T_PROV;
		if(TranslatorIM.SL_MODE==1) PR = TranslatorIM.BL_D_PROV;



		if(text != ""){
//			text = text.replace(/#/g,"");
			text=text.replace(/\\n/ig,'\n');

//			if(PR.toLowerCase()=="translator") text=text.replace(/@/ig,'^');
			if(PR.toLowerCase()=="microsoft")  text=text.replace(/</ig,'< ');

			text=text.replace(/<br>/ig,'\n');
//			text=text.replace(/%0A/ig,'@');
//			text=text.replace(/%0D/ig,'@');

			var baseUrl = ImTranslator_theurl+"dotrans.asp";
//			var baseUrl = "http://httpstat.us/414";

			if(TranslatorIM.LNGforHISTORY=="")TranslatorIM.LNGforHISTORY="en";
			if(S=="auto")S=TranslatorIM.LNGforHISTORY;



                        if(PR.toLowerCase()=="google"){
		  		text = text.trim();
  				var nmr = text.split(" ").length;
  				if(nmr > 1) TranslatorIM.CNTRP('1221',S+"/"+T, text.length);
				else TranslatorIM.CNTRP('1231',S+"/"+T, text.length);
                        }

			var TT = T;
		        if(PR.toLowerCase()=="microsoft"){
				if(T == "zh-CN") T = "zh-CHS";
				if(T == "zh-TW") T = "zh-CHT";
				if(T == "iw") T = "he";
				if(T == "bs") T = "bs-Latn";
				if(T == "tlsl") T = "fil";
				if(T == "tl") T = "fil";
				if(T == "hmn") T = "mww";
				if(T == "srsl") T = "sr-Cyrl";
				if(T == "sr") T = "sr-Cyrl";
				if(T == "ku") T = "kmr";
				if(T == "ckb") T = "ku";

				if(S == "zh-CN") S = "zh-CHS";
				if(S == "zh-TW") S = "zh-CHT";
				if(S == "iw") S = "he";
				if(S == "bs") S = "bs-Latn";
				if(S == "tlsl") S = "fil";
				if(S == "tl") S = "fil";
				if(S == "hmn") S = "mww";
				if(S == "srsl") S = "sr-Cyrl";
				if(S == "sr") S = "sr-Cyrl";
				if(S == "ku") S = "kmr";
				if(S == "ckb") S = "ku";

		
				text=text.replace(/</g,"< ");
				text=TranslatorIM.truncStrByWord(text,3000);
			}

			var cgi = "dir="+S+"/"+T+"&provider="+PR.toLowerCase()+"&text="+encodeURIComponent(text);
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
						TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError1"));
						return false;
					}
				}
			}
			ajaxRequest.onreadystatechange = function(){

				if(ajaxRequest.readyState == 4){
			             var resp = ajaxRequest.responseText;
				     resp = DOMPurify.sanitize (resp);

				     if(ajaxRequest.status!=200) resp=PR + ": "+ FExtension.element(TranslatorIM.SL_LOC,"extnotrsrv");
				     if(ajaxRequest.status==414) resp=PR + ": "+ FExtension.element(TranslatorIM.SL_LOC,"extlim2000").replace("XXX","4000");
			             if(resp.indexOf('<#<')!=-1 || resp.indexOf('&lt;#')!=-1) resp=PR + ": "+ FExtension.element(TranslatorIM.SL_LOC,"extnotrsrv");
				     if(resp.indexOf("ID=V2_Json_Translate")!=-1) resp=FExtension.element(TranslatorIM.SL_LOC,"extnotrsrv");

					//-------------
				     	if(PR.toLowerCase()=="google") {
		       	                        resp=resp.replace(/\\r\\n/ig,"<br>");
		                             	resp=resp.replace(/\\n/g,"<br>");
		       	                        resp=resp.replace(/\\r/ig,"<br>");
				     	}

				     	if(PR.toLowerCase()=="microsoft") {
		       	                        resp=resp.replace(/\\r\\n/ig,"<br>");
		                             	resp=resp.replace(/\\n/g,"<br>");
						resp=resp.replace(/< /g,"<");
						resp=resp.replace(/ >/g,">");
						resp=resp.replace(/\\"/g,"'");
		       	                        resp=resp.replace(/\\t/ig,"");
				     	}

				     	if(PR.toLowerCase()=="translator") {
						resp=resp.replace(/&lt;/g,"<");
						resp=resp.replace(/&gt;/g,">");
		       	                        resp=resp.replace(/\n/ig,"<br>");
					}
	                             	resp=resp.replace(/\\/g,"");
					//-------------



					doc2.getElementById('SL_shadow_translator').style.display = 'block';
					TranslatorIM.SL_temp_result=resp;

					doc2.getElementById('SL_shadow_translation_result').innerText="";
					doc2.getElementById('SL_shadow_translation_result2').textText="";

					var resptmp = DOMPurify.sanitize (resp);
			                resptmp = TranslatorIM.PPB_tts_icon(T,resptmp);
					doc2.getElementById('SL_shadow_translation_result').innerHTML = resptmp;
					doc2.getElementById('SL_shadow_translation_result2').innerHTML = resptmp;


					doc2.getElementById('SL_shadow_translation_result').style.direction = "ltr";
					doc2.getElementById('SL_shadow_translation_result').style.textAlign = "left";

					if(T == "ar" || T == "he" || T == "fa" || T == "yi" || T == "ur" || T == "ps" || T == "sd" || T == "ku" || T == "ug" || T == "dv" || T == "prs"){
						doc2.getElementById('SL_shadow_translation_result').style.direction = "rtl";
						doc2.getElementById('SL_shadow_translation_result').style.textAlign = "right";
					}
                                        doc2.getElementById('SL_loading').style.display="none";

                                       	TranslatorIM.SL_JUMP(doc2);

					setTimeout(function() {	
         					var HID=2;
					        if (TranslatorIM.SL_TH_2 == 1){
							var SLnow = new Date();
							SLnow = SLnow.toString();
							var TMPtime = SLnow.split(" ");
							var CurDT = TMPtime[1] + " " + TMPtime[2] + " " + TMPtime[3] + ", " + TMPtime[4];
				                        var LNGfrom = S;
				                        if(S=="auto" || doc2.getElementById("SL_locer").checked == false) var LNGfrom = TranslatorIM.LNGforHISTORY;
							if(TranslatorIM.SL_WRONGLANGUAGEDETECTED==1) LNGfrom="auto";

	                                                text=text.replace(/~/ig," ");
        	                                        resp=TranslatorIM.SL_temp_result.replace(/<br>/ig,"\n");
						        text=text.replace(/\^/g,"@");
						        var DICT = TranslatorIM.BL_T_PROV;
							if(TranslatorIM.SL_MODE==1) DICT = TranslatorIM.BL_D_PROV;


							var BeforeSanitization = text + "~~" + resp + "~~" + LNGfrom + "|" + TT + "~~"+ doc2.location+"~~"+CurDT+"~~"+HID+"~~"+DICT[0]+"^^";
							
							var SanitizedHistory = DOMPurify.sanitize (BeforeSanitization);
							doc.runtimeSendMessage({greeting:"hist:>"+ SanitizedHistory}, function(response) {
								if(response){}
							});

					        }
					}, 500);					


				}
			}
			ajaxRequest.open("POST", baseUrl, true);
			ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxRequest.send(cgi); 

		    }
	     }
	},






	SL_DICTparser: function (resp){

		TranslatorIM.SL_IS_DICTIONARY=1;
	        var ext = FExtension.browserInject;
		var doc = ext.getDocument();
		doc.getElementById('SL_player2').style.display="none";
		var parsedRES="",parsedTRANS="";
		var PARTS = new Array();
		var SL_to = doc.getElementById('SL_lng_to').value;
		var SL_from = doc.getElementById('SL_lng_from').value;
		var ttsurl=ext.getURL('content/img/util/tts.png');


		var SLDetLngCodes =    new Array ();
		var SLDetLngNames =    new Array ();
//		var SL_Lnum = SL_Languages.split(",");
		var SL_Lnum = TranslatorIM.SL_LNG_LIST.split(",");
		for(var i = 0; i < SL_Lnum.length; i++){
		        var SL_tmp = SL_Lnum[i].split(":");
			SLDetLngCodes.push(SL_tmp[0]);
			SLDetLngNames.push(SL_tmp[1]);
		}


		var Dt1=resp.split('src":"');
		var Dt2=Dt1[1].split('"');
		var DETECTEDlng=Dt2[0];
		var DETECTEDlongName="English";
		for (var z=0; z<SLDetLngCodes.length; z++){
			if(DETECTEDlng==SLDetLngCodes[z]) { DETECTEDlongName=SLDetLngNames[z];break; }
		}
		for (var z=0; z<SLDetLngNames.length; z++){
			if(SL_from==SLDetLngNames[z]) { SL_from=SLDetLngCodes[z];break; }
		}
		var Tr1=resp.split('dict":[');
		var Tr2=Tr1[0].split('orig":"');

		var Tr3=Tr2[1].split('"');
		var TRANSLATION = Tr3[0];
		var Gurl=FExtension.browserInject.getURL('content/html/popup/dictionary.html');
		var WAY = TranslatorIM.SL_TTSicn(DETECTEDlng);

		var WAY2 = TranslatorIM.SL_TTSicn(SL_to);
		var SL_DETECT = DETECTEDlng;	

		if(TranslatorIM.ALLvoices.indexOf(SL_DETECT)!=-1){
			if(resp.indexOf("reverse_translation")!=-1){
				if(WAY == 1) 	parsedTRANS = "<div id=_X><div id=_XL><div class=TTS"+WAY+" id=SL_000 style=\"background:url("+ttsurl+");\" lang=\""+DETECTEDlng+"\" title=\""+TRANSLATION+"\"></div></div><div id=_XR align=left style='margin-left:5px;font-weight:bold;font-size:14px;'>" + TRANSLATION + "</div></div>";
				else    	parsedTRANS = "<div id=_X><div id=_FL><div class=TTS"+WAY+" id=SL_000 style=\"background:url("+ttsurl+");\" lang=\""+DETECTEDlng+"\" title=\""+TRANSLATION+"\"></div></div><div id=_FR>" + TRANSLATION + "</div></div>";
			} else {
				if(WAY == "1") parsedTRANS = "<div dir=rtl>"+TRANSLATION+"</div>";
				else parsedTRANS = "<div dir=ltr>"+TRANSLATION+"</div>";
			}


		} else {
			if(resp.indexOf("reverse_translation")!=-1){
				if(WAY == 1) 	parsedTRANS = "<div id=_X><div id=_XR align=left style='margin-left:5px;font-weight:bold;font-size:14px;'>" + TRANSLATION + "</div></div>";
				else    	parsedTRANS = "<div id=_X><div id=_FR>" + TRANSLATION + "</div></div>";
			} else {
				if(WAY == "1") parsedTRANS = "<div dir=rtl>"+TRANSLATION+"</div>";
				else parsedTRANS = "<div dir=ltr>"+TRANSLATION+"</div>";
			}
		}

		if(resp.indexOf('pos":"')!=-1){
		   try{
		        var Rline,article;
			const obj = JSON.parse(resp);
			for(var i = 0; i < obj.dict.length; i++){
				parsedRES = parsedRES + "<div id=_Y>" +obj.dict[i].pos + "</div>";
				for (var j=0; j < obj.dict[i].entry.length; j++){
				        article="<x id=_ART>" + obj.dict[i].entry[j].word + "</x> ";
                               		Rline = "";

					for(var k = 0; k < obj.dict[i].entry[j].reverse_translation.length; k++){
						var tmpLNK = obj.dict[i].entry[j].reverse_translation[k].replace(/\\'/g,'~');
						tmpLNK = tmpLNK.replace(/\\u0027/g,'~');

						var F = SL_from;
						var T = SL_to;
						if(k < obj.dict[i].entry[j].reverse_translation.length-1){
							Rline = Rline + "<a class=_ALNK title=\""+tmpLNK+"\" id='SL_" +i+"_"+ j+"_"+ k + "' href='"+Gurl+"?dir="+ SL_from + "|" + SL_to +"&text=" + encodeURIComponent(tmpLNK) + "'>" + tmpLNK + "</a>, ";
						} else {
							Rline = Rline + "<a class=_ALNK title=\""+tmpLNK+"\" id='SL_" +i+"_"+ j+"_"+ k + "' href='"+Gurl+"?dir="+ SL_from + "|" + SL_to +"&text=" + encodeURIComponent(tmpLNK) + "'>" + tmpLNK + "</a>";
						}
					}

					var REV=obj.dict[i].entry[j].reverse_translation;
					var WORD=obj.dict[i].entry[j].word;
					var SL_myTTS = article;// + REV;
				        if(SL_TTS.indexOf(SL_to)!=-1 || (G_TTS.indexOf(SL_to)!=-1 && localStorage["SL_GVoices"]!="0")){
					   if(WAY2==1) SL_myTTS = "<div id=_X><div id=_XL><div class=_V id=\"SL_"+i+j+"\" style=\"background:url("+ttsurl+");\" lang=\""+SL_to+"\" title=\"" + WORD + "\"></div></div><div id=_XR>" + article + "</div></div>";
					   else SL_myTTS = "<div id=_X><div id=_FL><div class=TTS"+WAY2+" id=\"SL_"+i+j+"\" style=\"background:url("+ttsurl+");\" lang=\""+SL_to+"\" title=\"" + WORD + "\"></div></div><div id=_XR>" + article + "</div></div>";
					}			
					parsedRES = parsedRES + "<div id=_A><div id=_AL>" + SL_myTTS + "</div><div id=_AR>" + Rline + "</div></div>";
				}
				parsedRES = parsedRES + "<br>";
			}

		        doc.getElementById('SL_TTS_voice').style.display='none';
		        doc.getElementById('SL_bbl_font_patch').style.display='block';

		      } catch(ex){
			const obj = JSON.parse(resp);
		       	parsedRES="";
			parsedTRANS=obj.sentences[0].trans;
		      }	



		    } else {
		   	Tr2=Tr1[0].split('trans":"');
	   		Tr3=Tr2[1].split('"');
		   	parsedTRANS = Tr3[0];
		        doc.getElementById('SL_TTS_voice').style.display='block';
		    }

		 if(parsedRES==""){
		   doc.getElementById('SL_shadow_translation_result').style.direction="ltr";
		   doc.getElementById('SL_shadow_translation_result').style.textAlign="left";
		   if(SL_to=="ar" || SL_to=="iw" || SL_to=="fa" || SL_to=="yi" || SL_to=="ur" || SL_to=="ps" || SL_to=="sd" || SL_to=="ckb" || SL_to=="ug" || SL_to=="dv" || SL_to=="prs"){
			 doc.getElementById('SL_shadow_translation_result').style.direction="rtl";
			 doc.getElementById('SL_shadow_translation_result').style.textAlign="right";
		   }
		 } 
		 parsedRES = parsedTRANS +"<br>"+ parsedRES;
		 SL_temp_result2 = parsedRES;
		 setTimeout(function(){
		     TranslatorIM.SL_ALIGNER1(SL_to);
		     TranslatorIM.SL_ALIGNER2(DETECTEDlng);
		 },5);
		 
		 return parsedRES;

	},


SL_ALIGNER1: function (SL_to){
 var doc = FExtension.browserInject.getDocument();
 var nums=doc.getElementsByTagName("div").length;
 if(SL_to!="ar" && SL_to!="iw" && SL_to!="fa" && SL_to!="yi" && SL_to!="ur" && SL_to!="ps" && SL_to!="sd" && SL_to!="ckb" && SL_to!="ug" && SL_to!="dv" && SL_to!="prs"){
      for(var I = 0; I < nums; I++){
       if(doc.getElementsByTagName("div")[I].id == "_AL")	 doc.getElementsByTagName("div")[I].style.textAlign="left";
      }
 } else {
      for(var I = 0; I < nums; I++){
       if(doc.getElementsByTagName("div")[I].id == "_AL")	 doc.getElementsByTagName("div")[I].style.textAlign="right";
      }
 }
},

SL_ALIGNER2: function (SL_from){
 var doc = FExtension.browserInject.getDocument();
 var nums=doc.getElementsByTagName("div").length;
 if(SL_from!="ar" && SL_from!="iw" && SL_from!="fa" && SL_from!="yi" && SL_from!="ur" && SL_from!="ps" && SL_from!="sd" && SL_from!="ckb" && SL_from!="ug" && SL_from!="dv" && SL_from!="prs"){
      for(var I = 0; I < nums; I++){
       if(doc.getElementsByTagName("div")[I].id == "_AR")	 doc.getElementsByTagName("div")[I].style.textAlign="left";
      }
 } else {
      for(var I = 0; I < nums; I++){
       if(doc.getElementsByTagName("div")[I].id == "_AR")	 doc.getElementsByTagName("div")[I].style.textAlign="right";
      }
 }
},

SL_TTSicn: function (lng){
 var doc = FExtension.browserInject.getDocument();
 var OUT="";
 if(lng!="ar" && lng!="iw" && lng!="fa" && lng!="yi" && lng!="ur" && lng!="ps" && lng!="sd" && lng!="ckb" && lng!="ug" && lng!="dv" && lng!="prs")   OUT=1;
 else   OUT=2;
 return(OUT);
},





	ClickInside: function(event){
		 var target = event.target || event.srcElement;
		 var id = target.id;
               	 TranslatorIM.REMOTE_Voice_Close();
		 var className = target.className;

//		 if(className == "_V") 	 TranslatorIM.tagClick(event,id);
//		 if(className == "TTS1") TranslatorIM.tagClick(event,id);
//		 if(className == "TTS2") TranslatorIM.tagClick(event,id);

		 if(className == "_ALNK") {
		    var tags = FExtension.browserInject.getDocument().getElementsByClassName("_ALNK");
		    for (var j=0; j<tags.length; j++){
//	        	 tags[j].href='javascript:void(0)';
			 tags[j].addEventListener('mouseup', function(e){ TranslatorIM.UrltagClick(e) }, false);
			 TranslatorIM.AVOIDAUTODETECT=1;
		    }
		 }
	},


	tagClick: function(event,id){
		var doc = FExtension.browserInject.getDocument();

                if(doc.getElementById("SL_player2")) {
			doc.getElementById("SL_player2").textContent="";
			doc.getElementById("SL_player2").style.display="none";
			doc.getElementById("SL_player2").style.height="0px";
		}


		   var SL_from = doc.getElementById('SL_lng_from').value;
		   if(doc.getElementById("SL_000")) doc.getElementById("SL_000").lang=SL_from;
		   event.target.onmousemove = function () {TranslatorIM.SL_ShowBalloon();}
		   var SL_to = doc.getElementById(id).lang;
		   SL_to=SL_to.replace("zh-CN","zh");
		   SL_to=SL_to.replace("zh-TW","zh");

		   if(doc.getElementById('SL_lng_from').value=="auto" || doc.getElementById("SL_locer").checked == false) {if(id=="SL_000") SL_to = TranslatorIM.LNGforHISTORY;}
		   else{ 
			if(id=="SL_000"){
				SL_to = SL_from;

				// By VK . A patch------------------------------------
				if(SL_to.length>7)SL_to="en";
				// By VK . A patch------------------------------------
			}

		   }

           //vk HARDCODE for local tts;
		   TranslatorIM.SL_SLVoices = "1";
           //vk HARDCODE for local tts;

	   var text = doc.getElementById(event.target.id).title;

	   switch(TranslatorIM.SL_SLVoices){
		case "0": if(TranslatorIM.ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1){
				if(text.length>TranslatorIM.GTTS_length){
					text = TranslatorIM.truncStrByWord(text,1200);
					TranslatorIM.SL_MEDIA_HOST(SL_to,text); 
				}else TranslatorIM.Google_TTS(text,SL_to);
			      } else TranslatorIM.Google_TTS(text,SL_to);
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
		case "1": if(TranslatorIM.ALLvoices.indexOf(SL_to)!=-1){
				if(G_TTS.indexOf(SL_to)!=-1) TranslatorIM.Google_TTS(text,SL_to);
				else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
		case "2": if(TranslatorIM.ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1){
					text = TranslatorIM.truncStrByWord(text,1200);
					TranslatorIM.SL_MEDIA_HOST(SL_to,text);
			      }else TranslatorIM.Google_TTS(text,SL_to);
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
	   }

	},


        Google_TTS_ON_TOP: function(text,SL_to){
                var doc = FExtension.browserInject.getDocument();
		if(TranslatorIM.SL_GVoices=="1"){
			if(text.length>TranslatorIM.GTTS_length){
			   text=text.substring(0,TranslatorIM.GTTS_length);
			   doc.getElementById('SL_alert100').style.display="block";
			}
	        	TranslatorIM.REMOTE_Voice(0,SL_to,text);			
		} else {
			text = TranslatorIM.truncStrByWord(text,1200);
			TranslatorIM.SL_MEDIA_HOST(SL_to,text);
		}
	},


	SL_BBL_VOICE: function(){           

           var doc = FExtension.browserInject.getDocument();
	   doc.getElementById('SL_alert100').style.display="none";
	   var SL_to= doc.getElementById("SL_lng_to").value;
	   SL_to= SL_to.replace("-TW","");
	   SL_to= SL_to.replace("-CN","");
	   var TTStext=TranslatorIM.SL_temp_result.replace(/<br>/g, " ");


           //vk HARDCODE for local tts;
		   TranslatorIM.SL_SLVoices = "1";
           //vk HARDCODE for local tts;

	   var text = TTStext;

	   switch(TranslatorIM.SL_SLVoices){
		case "0": if(TranslatorIM.ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1){
				if(text.length>TranslatorIM.GTTS_length){
					text = TranslatorIM.truncStrByWord(text,1200);
					TranslatorIM.SL_MEDIA_HOST(SL_to,text); 
				}else TranslatorIM.Google_TTS(text,SL_to);
			      } else TranslatorIM.Google_TTS(text,SL_to);
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
		case "1": if(TranslatorIM.ALLvoices.indexOf(SL_to)!=-1){
				if(G_TTS.indexOf(SL_to)!=-1) TranslatorIM.Google_TTS(text,SL_to);
				else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
		case "2": if(TranslatorIM.ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1){
					text = TranslatorIM.truncStrByWord(text,1200);
					TranslatorIM.SL_MEDIA_HOST(SL_to,text);
			      }else TranslatorIM.Google_TTS(text,SL_to);
			  } else TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNo_Voice"));
			  break;
	   }
	},	

        Google_TTS: function(text,SL_to){
	        text = text.replace(/(<([^>]+)>)/ig,"");
		text = text.replace(/&nbsp;/ig," ");
                var doc = FExtension.browserInject.getDocument();
		if(TranslatorIM.SL_GVoices=="1"){
			if(text.length>TranslatorIM.GTTS_length){
			   text=text.substring(0,TranslatorIM.GTTS_length);
			   doc.getElementById('SL_alert100').style.display="block";
			}
	        	TranslatorIM.REMOTE_Voice(1,SL_to,text);
		} else {
			text = TranslatorIM.truncStrByWord(text,1200);
			TranslatorIM.SL_MEDIA_HOST(SL_to,text);
		}
	},

	SL_MEDIA_HOST: function(dir, text){
	    if(dir=="")dir="en/es";
	    var tmpdir=dir.split("/");
	    if(tmpdir[0]=="es" || tmpdir[0]=="fr" || tmpdir[0]=="it" || tmpdir[0]=="pt") text=unescape(encodeURIComponent(text));
	    var submitForm = TranslatorIM.getNewSubmitForm();
	    text = text.replace(/(<([^>]+)>)/ig,"");
	    text = text.replace(/&nbsp;/ig,"");
	    text = text.replace(/@/ig,"\n"); 	

	    TranslatorIM.createNewFormElement(submitForm, "text", text);
	    TranslatorIM.createNewFormElement(submitForm, "url", "FF");
	    TranslatorIM.createNewFormElement(submitForm, "dir", dir);
	    submitForm.action= "https://text-to-speech.imtranslator.net";
	    submitForm.setAttribute('target', '_blank');
	    submitForm.submit();
	},


	getNewSubmitForm: function(){
		var submitForm = document.createElement("FORM");
		document.body.appendChild(submitForm);
		submitForm.method = "POST";
		return submitForm;
	},

	createNewFormElement: function(inputForm, elementName, elementValue) {
		try{
			var newElement = document.createElement("<input name='"+elementName+"' type='hidden'>");
		}catch(err){   
			var newElement = document.createElement('input');
			newElement.setAttribute('type','hidden');
			newElement.setAttribute('name',elementName);
		} 
		inputForm.appendChild(newElement);
		newElement.value = elementValue;
		return newElement;
	},

	UrltagClick: function(e){
  	    if(e.which != 3){
		e.target.onmousemove = function () {TranslatorIM.SL_ShowBalloon();}
		FExtension.browserInject.getDocument().getElementById(e.target.id).href='javascript:void(0)';
		FExtension.browserInject.getDocument().getElementById(e.target.id).style.cursor='pointer';
		var txt = FExtension.browserInject.getDocument().getElementById(e.target.id).title;
                TranslatorIM.SL_TEMP_TEXT=txt;
		setTimeout(function() { 
			TranslatorIM.SL_BALLOON_TRANSLATION(txt,null,3); 
		    	TranslatorIM.SL_removeBalloonColor();
		    	TranslatorIM.SL_addBalloonColor();
		}, 150);   
		e.stopPropagation();
		e.cancelBubble = true;       
	    }	
	},



	SL_SCROLL: function(){
		TranslatorIM.SL_bring_UP();
	},


	SL_OBJ_BUILDER: function(){
	
       		  var doc = FExtension.browserInject.getDocument();
                                    
                  var btn = doc.getElementById('SL_button');
                  if(btn){
                      return;
                  }
 
	          var container = doc.body;

 

                  if(container){


		  var newElem = doc.createElement ("div");
		  var newElemid = doc.createAttribute("id");
		  newElemid.value = "SL_balloon_obj";
	          newElem.setAttributeNode(newElemid);

		  var newElemtp = doc.createAttribute("alt");
		  newElemtp.value = "0";
	          newElem.setAttributeNode(newElemtp);

		  //---------------------------
		  

			  var OB = doc.createElement('div');
			  var id = doc.createAttribute("id");
			  id.value = "SL_button";
		          OB.setAttributeNode(id);
 			  var cl = doc.createAttribute("class");
			  cl.value = "SL_ImTranslatorLogo";
	        	  OB.setAttributeNode(cl);
		          newElem.appendChild(OB);

		        
			  OB1 = doc.createElement('div');
			  id = doc.createAttribute("id");
			  id.value = "SL_shadow_translation_result2";
		          OB1.setAttributeNode(id);
		          newElem.appendChild(OB1);

			  OB2 = doc.createElement('div');
			  id = doc.createAttribute("id");
			  id.value = "SL_shadow_translator";
	        	  OB2.setAttributeNode(id);
		          newElem.appendChild(OB2);

				  OB3 = doc.createElement('div');
				  id = doc.createAttribute("id");
				  id.value = "SL_planshet";
	        		  OB3.setAttributeNode(id);

 				    OBup = doc.createElement('div');
				    OBup.id = "SL_arrow_up";
			            OB3.appendChild(OBup);


					OB4 = doc.createElement('div');
					id = doc.createAttribute("id");
					id.value = "SL_TB";
	        			OB4.setAttributeNode(id);


				        	var OB6 = doc.createElement("div");
						id = doc.createAttribute("id");
						id.value = "SL_tables";
						OB6.setAttributeNode(id);
						var cs = doc.createAttribute("cellspacing");
						cs.value = "1";
						OB6.setAttributeNode(cs);

						        var OB7 = doc.createElement("tr");
						        OB6.appendChild(OB7); 

							        var OB8 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB8.setAttributeNode(cl);
								var w = doc.createAttribute("width");
								w.value = "10%";
								OB8.setAttributeNode(w);
								var a = doc.createAttribute("align");
								a.value = "right";
								OB8.setAttributeNode(a);
							        OB7.appendChild(OB8);

								        var OB9 = doc.createElement("input");
									id = doc.createAttribute("id");
									id.value = "SL_locer";
									OB9.setAttributeNode(id);
									var ty = doc.createAttribute("type");
									ty.value = "checkbox";
									OB9.setAttributeNode(ty);
									var ti = doc.createAttribute("title");
									ti.value = FExtension.element(TranslatorIM.SL_LOC,"extLock_in_language");
									OB9.setAttributeNode(ti);
				        				OB8.appendChild(OB9); 



							        var OB10 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB10.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "20%";
								OB10.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "left";
								OB10.setAttributeNode(a);
							        OB7.appendChild(OB10);

									var OB11 = doc.createElement("select");
									id = doc.createAttribute("id");
									id.value = "SL_lng_from";
									OB11.setAttributeNode(id);

									cl = doc.createAttribute("class");
									cl.value = "SL_lngs";
									OB11.setAttributeNode(cl);


										if(TranslatorIM.SL_LNG_CUSTOM_LIST.indexOf("auto")!=-1 || TranslatorIM.SL_LNG_CUSTOM_LIST=="all"){
											var OB12 = doc.createElement('option');
											var v = document.createAttribute("value");
											v.value = "auto";
											OB12.setAttributeNode(v);
											OB12.appendChild(doc.createTextNode(FExtension.element(TranslatorIM.SL_LOC,"extDetect_language_from_box")));
											OB11.appendChild(OB12); 
										}

										var MENU = TranslatorIM.SL_LNG_LIST.split(",");
										for(var J=0; J < MENU.length; J++){
										    var CURlang3 = MENU[J].split(":");
										    var OB12 = doc.createElement('option');
										    var v = doc.createAttribute("value");

										    v.value = CURlang3[0];
										    OB12.setAttributeNode(v);
										    //OB12.appendChild(doc.createTextNode(CURlang3[1].replace("&#160;"," ")));
										    OB12.appendChild(doc.createTextNode(CURlang3[1]));
										    OB11.appendChild(OB12);
										}							                       

								        OB10.appendChild(OB11);

							        var OB13 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB13.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "3";
								OB13.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "center";
								OB13.setAttributeNode(a);
							        OB7.appendChild(OB13);

									var OB14 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_switch_b";
								        OB14.setAttributeNode(id);
							 		ti = doc.createAttribute("title");
									ti.value = FExtension.element(TranslatorIM.SL_LOC,"extSwitch_languages_ttl");
					        			OB14.setAttributeNode(ti);
								        OB13.appendChild(OB14);

							        var OB15 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB15.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "20%";
								OB15.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "left";
								OB15.setAttributeNode(a);
							        OB7.appendChild(OB15);

									var OB16 = doc.createElement("select");
									id = doc.createAttribute("id");
									id.value = "SL_lng_to";
									OB16.setAttributeNode(id);

									cl = doc.createAttribute("class");
									cl.value = "SL_lngs";
									OB16.setAttributeNode(cl);

/*
									        var thelang = "es";
										if(TranslatorIM.SL_langDst!="" && TranslatorIM.SL_SID_TO=="") thelang = TranslatorIM.SL_langDst;
										if(TranslatorIM.SL_langDst=="" && TranslatorIM.SL_SID_TO!="") thelang = TranslatorIM.SL_SID_TO;

										for(J=0; J < MENU.length; J++){
										    CURlang3 = MENU[J].split(":");
										    option = doc.createElement('option');
										    if(CURlang3[0] == thelang){
											    var sel = doc.createAttribute("selected");
											    sel.value = "selected";
											    option.setAttributeNode(sel);
										    }
										    v = doc.createAttribute("value");
										    v.value = CURlang3[0];
										    option.setAttributeNode(v);
										    //option.appendChild(doc.createTextNode(CURlang3[1].replace("&#160;"," ")));
										    option.appendChild(doc.createTextNode(CURlang3[1]));
										    OB16.appendChild(option);
										}
*/



									     var SEL = 0
									     if(MENU.length>=TranslatorIM.SL_FAV_START){
										var SL_FAV_LANGS_LONG = TranslatorIM.SL_ADD_LONG_NAMES(TranslatorIM.SL_FAV_LANGS_BBL);

										if(SL_FAV_LANGS_LONG!=""){
											var favArr=SL_FAV_LANGS_LONG.split(","); 
											for(var J=0; J < favArr.length; J++){
											    var CURlang3 = favArr[J].split(":");
											    var OB_FAV = doc.createElement('option');
											    var v = doc.createAttribute("value");
											    v.value = CURlang3[0];

											    if(J == 0){
												    var sel = doc.createAttribute("selected");
												    sel.value = "selected";
												    OB_FAV.setAttributeNode(sel);
												    SEL = 1;
												    TranslatorIM.SL_langDst_bbl2=CURlang3[0];
											    }

											    OB_FAV.setAttributeNode(v);
											    OB_FAV.appendChild(doc.createTextNode(CURlang3[1]));
											    OB16.appendChild(OB_FAV);
											}
											OB_FAV = doc.createElement('option');
											var d = doc.createAttribute("disabled");
											d.value = true;
											OB_FAV.setAttributeNode(d);
											var all = FExtension.element(TranslatorIM.SL_LOC,"extwptDAll");
										    	OB_FAV.appendChild(doc.createTextNode("-------- [ "+ all +" ] --------"));

										    	OB16.appendChild(OB_FAV);
										}
									     }	



									        var thelang = "es";
										if(TranslatorIM.SL_langDst!="" && TranslatorIM.SL_SID_TO=="") thelang = TranslatorIM.SL_langDst_bbl2;
										for(J=0; J < MENU.length; J++){
										    CURlang3 = MENU[J].split(":");
										    option = doc.createElement('option');
										    if(SEL == 0){	
											    if(CURlang3[0] == thelang){
												    var sel = doc.createAttribute("selected");
												    sel.value = "selected";
												    option.setAttributeNode(sel);
											    }
										    }
										    v = doc.createAttribute("value");
										    v.value = CURlang3[0];
										    option.setAttributeNode(v);
										    option.appendChild(doc.createTextNode(CURlang3[1]));
										    OB16.appendChild(option);
										}


								        OB15.appendChild(OB16);									


							        var OB18 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB18.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "8%";
								OB18.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "center";
								OB18.setAttributeNode(a);
							        OB7.appendChild(OB18);

									var OB19 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_TTS_voice";
								        OB19.setAttributeNode(id);
							 		ti = doc.createAttribute("title");
									ti.value = TranslatorIM.SL_GetLongName(TranslatorIM.SL_DETECT);
					        			OB19.setAttributeNode(ti);
								        OB18.appendChild(OB19);

							        var OB20 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB20.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "8%";
								OB20.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "center";
								OB20.setAttributeNode(a);
							        OB7.appendChild(OB20);

									var OB21 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_copy";
								        OB21.setAttributeNode(id);
							 		ti = doc.createAttribute("title");
									ti.value = FExtension.element(TranslatorIM.SL_LOC,"extCopy_ttl");
					        			OB21.setAttributeNode(ti);
							 		cl = doc.createAttribute("class");
									cl.value = "SL_copy";
					        			OB21.setAttributeNode(cl);
								        OB20.appendChild(OB21);

										var OB21tip = doc.createElement('div');
										id = doc.createAttribute("id");
										id.value = "SL_copy_tip";
									        OB21tip.setAttributeNode(id);
								        	OB21.appendChild(OB21tip);


							        var OB22 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB22.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "8%";
								OB22.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "center";
								OB22.setAttributeNode(a);
							        OB7.appendChild(OB22);

									var OB23 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_bbl_font_patch";
								        OB23.setAttributeNode(id);
//							 		var js = doc.createAttribute("onclick");
//									js.value = "TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extNot_available"))";
//					        			OB23.setAttributeNode(js);
								        OB22.appendChild(OB23);

									var OB24 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_bbl_font";
								        OB24.setAttributeNode(id);
							 		ti = doc.createAttribute("title");
									ti.value = FExtension.element(TranslatorIM.SL_LOC,"extFont_Size_ttl");
					        			OB24.setAttributeNode(ti);
							 		cl = doc.createAttribute("class");
									cl.value = "SL_bbl_font";
					        			OB24.setAttributeNode(cl);
								        OB22.appendChild(OB24);

							        var OB25 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB25.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "8%";
								OB25.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "center";
								OB25.setAttributeNode(a);
							        OB7.appendChild(OB25);


									var OB26 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_bbl_help";
								        OB26.setAttributeNode(id);
							 		ti = doc.createAttribute("title");
									ti.value = FExtension.element(TranslatorIM.SL_LOC,"extHelp");
					        			OB26.setAttributeNode(ti);
								        OB25.appendChild(OB26);



							        var OB28 = doc.createElement("td");
								cl = doc.createAttribute("class");
								cl.value = "SL_td";
								OB28.setAttributeNode(cl);
								w = doc.createAttribute("width");
								w.value = "15%";
								OB28.setAttributeNode(w);
								a = doc.createAttribute("align");
								a.value = "right";
								OB28.setAttributeNode(a);
							        OB7.appendChild(OB28);

									var OB29 = doc.createElement('div');
									id = doc.createAttribute("id");
									id.value = "SL_pin";
								        OB29.setAttributeNode(id);
									cl = doc.createAttribute("class");
									cl.value = "SL_pin_off";
								        OB29.setAttributeNode(cl);
							 		ti = doc.createAttribute("title");
									ti.value = FExtension.element(TranslatorIM.SL_LOC,"extPin_ttl");
					        			OB29.setAttributeNode(ti);
								        OB28.appendChild(OB29);


						OB4.appendChild(OB6);


						var OBpr = doc.createElement('div');
						id = doc.createAttribute("id");
						id.value = "SL_Bproviders";
						
						if(TranslatorIM.SL_SHOW_PROVIDERS!="1"){
							st = doc.createAttribute("style");
							st.value = "visibility:hidden;";
							OBpr.setAttributeNode(st);
						}
					        OBpr.setAttributeNode(id);
					        OB4.appendChild(OBpr);
					        for(var p=0; p<TranslatorIM.LISTofPR.length; p++){
							var OBprov = doc.createElement('div');
							id = doc.createAttribute("id");
							id.value = "SL_P"+p;

							cl = doc.createAttribute("class");
							cl.value = "SL_BL_LABLE_ON";
							OBprov.setAttributeNode(cl);

							ti = doc.createAttribute("title");
							ti.value = TranslatorIM.LISTofPR[p];
						        OBprov.setAttributeNode(ti);

						        OBprov.setAttributeNode(id);

							var span = doc.createElement('div');
							span.id = "SL_PN"+p;
						        OBprov.appendChild(span);

                                                        span.appendChild(doc.createTextNode(TranslatorIM.LISTofPR[p][0]));
						        OBpr.appendChild(OBprov);

					        }

						OB3.appendChild(OBpr);

						var OBalert = doc.createElement('div');
						OBalert.id = "SL_alert_bbl";
						OBalert.height = "30px;";
					        OB3.appendChild(OBalert);

							var OBclose = doc.createElement('div');
							OBclose.id = "SLHKclose";
						        OBalert.appendChild(OBclose);

							var OBalertcont = doc.createElement('div');
							OBalertcont.id = "SL_alert_cont";
						        OBalert.appendChild(OBalertcont);



			        	OB3.appendChild(OB4);
		        	OB2.appendChild(OB3);

				var OB30 = doc.createElement('div');
				id = doc.createAttribute("id");
				id.value = "SL_shadow_translation_result";
			        OB30.setAttributeNode(id);

			        OB2.appendChild(OB30);

					        var eUL16 = doc.createElement("div");
						st30 = doc.createAttribute("id");
						st30.value = "SL_loading";
						eUL16.setAttributeNode(st30);
						var st30 = doc.createAttribute("class");
						st30.value = "SL_loading";
						eUL16.setAttributeNode(st30);
						OB2.appendChild(eUL16);


				var OB31 = doc.createElement('div');
				id = doc.createAttribute("id");
				id.value = "SL_player2";
			        OB31.setAttributeNode(id);
			        OB2.appendChild(OB31);

				var OB32 = doc.createElement('div');
				id = doc.createAttribute("id");
				id.value = "SL_alert100";
			        OB32.setAttributeNode(id);
			        OB2.appendChild(OB32);

					OB32.appendChild(doc.createTextNode(FExtension.element(TranslatorIM.SL_LOC,"extTTS_Limit")));


				var OB34 = doc.createElement('div');
				id = doc.createAttribute("id");
				id.value = "SL_Balloon_options";
			        OB34.setAttributeNode(id);
			        OB2.appendChild(OB34);

				  OBdown = doc.createElement('div');
				  OBdown.id = "SL_arrow_down";
			          OB34.appendChild(OBdown);

		var OBtbl = doc.createElement("div");
		OBtbl.id = "SL_tbl_opt";
		OBtbl.width = "100%";
		OBtbl.height = "16";


               	        var OBtr = doc.createElement("tr");
		        OBtbl.appendChild(OBtr); 

			        var OBtd3_ = doc.createElement("td");
				cl = doc.createAttribute("class");
				cl.value = "SL_td";
				OBtd3_.setAttributeNode(cl);
				OBtd3_.width = "5%";
				OBtd3_.align = "center";
			        OBtr.appendChild(OBtd3_);


				        var OB9_ = doc.createElement("input");
					id = doc.createAttribute("id");
					id.value = "SL_BBL_locer";
					OB9_.setAttributeNode(id);
					var ty = doc.createAttribute("type");
					ty.value = "checkbox";
					OB9_.setAttributeNode(ty);
					var va = doc.createAttribute("checked");
					va.value = Boolean(TranslatorIM.SL_OnOff_BTN2);
					var ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,'extSTB') + " "+ TranslatorIM.Timing +" " +FExtension.element(TranslatorIM.SL_LOC,'extSeconds');
					OB9_.setAttributeNode(ti);
        				OBtd3_.appendChild(OB9_); 

			        var OBtd3__ = doc.createElement("td");
				cl = doc.createAttribute("class");
				cl.value = "SL_td";
				OBtd3__.setAttributeNode(cl);
				OBtd3__.width = "5%";
				OBtd3__.align = "left";
			        OBtr.appendChild(OBtd3__);
			                          


				        var OB9__ = doc.createElement("div");
					id = doc.createAttribute("id");
					id.value = "SL_BBL_IMG";
					OB9__.setAttributeNode(id);
					var ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,'extSTB') + " "+ TranslatorIM.Timing +" " +FExtension.element(TranslatorIM.SL_LOC,'extSeconds');
					OB9__.setAttributeNode(ti);
        				OBtd3__.appendChild(OB9__); 






			        var OBtd2 = doc.createElement("td");
				cl = doc.createAttribute("class");
				cl.value = "SL_td";
				OBtd2.setAttributeNode(cl);
				OBtd2.width = "100%";
				OBtd2.align = "center";
			        OBtr.appendChild(OBtd2);


					var OB35 = doc.createElement('a');
					var tar = doc.createAttribute("target");
					tar.value = "_blank";
				        OB35.setAttributeNode(tar);
					cl = doc.createAttribute("class");
					cl.value = "SL_options";
				        OB35.setAttributeNode(cl);
					id = doc.createAttribute("id");
					id.value = "SL_opt1";
				        OB35.setAttributeNode(id);
					ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,"extOptions_ttl");
				        OB35.setAttributeNode(ti);
				        OBtd2.appendChild(OB35);

					OB35.appendChild(doc.createTextNode(FExtension.element(TranslatorIM.SL_LOC,"extOptions")));

					OBtd2.appendChild(doc.createTextNode(" : "));

					var OB36 = doc.createElement('a');
					var tar = doc.createAttribute("target");
					tar.value = "_blank";
				        OB36.setAttributeNode(tar);
					cl = doc.createAttribute("class");
					cl.value = "SL_options";
				        OB36.setAttributeNode(cl);
					id = doc.createAttribute("id");
					id.value = "SL_opt2";
				        OB36.setAttributeNode(id);
					ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,"extHistory_ttl");
				        OB36.setAttributeNode(ti);
				        OBtd2.appendChild(OB36);

					OB36.appendChild(doc.createTextNode(FExtension.element(TranslatorIM.SL_LOC,"extHistory")));

					OBtd2.appendChild(doc.createTextNode(" : "));


					var OB38 = doc.createElement('a');
					var tar = doc.createAttribute("target");
					tar.value = "_blank";
				        OB38.setAttributeNode(tar);
					cl = doc.createAttribute("class");
					cl.value = "SL_options";
				        OB38.setAttributeNode(cl);
					id = doc.createAttribute("id");
					id.value = "SL_opt3";
				        OB38.setAttributeNode(id);
					ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,"extFeedback_ttl");
				        OB38.setAttributeNode(ti);
				        OBtd2.appendChild(OB38);

					OB38.appendChild(doc.createTextNode(FExtension.element(TranslatorIM.SL_LOC,"extFeedback")));

					OBtd2.appendChild(doc.createTextNode(" : "));

					var OB37 = doc.createElement('a');
					hr = doc.createAttribute("href");
					hr.value ="https://imtranslator.net"+_CGI+"&a=0";
				        OB37.setAttributeNode(hr);
					var tar = doc.createAttribute("target");
					tar.value = "_blank";
				        OB37.setAttributeNode(tar);
					cl = doc.createAttribute("class");
					cl.value = "SL_options";
				        OB37.setAttributeNode(cl);
					id = doc.createAttribute("id");
					id.value = "SL_opt4";
				        OB37.setAttributeNode(id);
					ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,"extContribution_ttl");
				        OB37.setAttributeNode(ti);
				        OBtd2.appendChild(OB37);

					OB37.appendChild(doc.createTextNode('Donate'));



        				            
			        var OBtd3 = doc.createElement("td");
				cl = doc.createAttribute("class");
				cl.value = "SL_td";
				OBtd3.setAttributeNode(cl);
				OBtd3.width = "15%";
				OBtd3.align = "right";
			        OBtr.appendChild(OBtd3);
				var nw = doc.createAttribute("nowrap");
				nw.value = "nowrap";
				OBtd3.setAttributeNode(nw);




					var OB39 = doc.createElement('span');
					id = doc.createAttribute("id");
					id.value = "SL_Balloon_Close";
				        OB39.setAttributeNode(id);
					cl = doc.createAttribute("class");
					cl.value = "SL_options";
				        OB39.setAttributeNode(cl);
					ti = doc.createAttribute("title");
					ti.value = FExtension.element(TranslatorIM.SL_LOC,"extClose");
				        OB39.setAttributeNode(ti);
				        OBtd3.appendChild(OB39);

					OB39.appendChild(doc.createTextNode(FExtension.element(TranslatorIM.SL_LOC,"extClose")));

			        OBtbl.appendChild(OBtr);

		        OB34.appendChild(OBtbl); 


		  //---------------------------
		  



                  if(container.tagName == "FRAMESET"){
                      container.parentNode.insertBefore(newElem, container.nextSibling);
                  }else{
	                    container.appendChild (newElem);
			    doc.getElementById("SL_balloon_obj").style.display='block';
                  }
                  doc.getElementById('SL_shadow_translation_result2').style.display="none";
		  TranslatorIM.SL_IMG_LOADER();
		  }

                  if(doc.getElementById("SL_balloon_obj")){


			//STOP WORKING ON IFRAMES
			  if(self!=top){
                               if(String(window.location).toLowerCase().indexOf('forumactif.org')!=-1) container.removeChild (doc.getElementById("SL_balloon_obj"));
                               if(String(window.location).toLowerCase().indexOf('mail.live.')!=-1) container.removeChild (doc.getElementById("SL_balloon_obj"));
                               if(String(window.location).toLowerCase().indexOf('mensuel.framapad.org')!=-1) container.removeChild (doc.getElementById("SL_balloon_obj"));
                               if(String(window.location).toLowerCase().indexOf('oasis.sandstorm.io')!=-1) container.removeChild (doc.getElementById("SL_balloon_obj"));
                               if(String(window.location).toLowerCase().indexOf('etherpad.org')!=-1) container.removeChild (doc.getElementById("SL_balloon_obj"));

                               if(doc.body.id=="innerdocbody") container.removeChild (doc.getElementById("SL_balloon_obj"));
			  }

			  if(doc.getElementById('SL_tables')){						
	        	         var escaper = doc.getElementById('SL_tables').offsetWidth;
       	          		 if((escaper != 0 && escaper > 410) && TranslatorIM.TempActiveObjId !="SL_button") container.removeChild (doc.getElementById("SL_balloon_obj"));
			  }
		  }
		  //STOP WORKING ON OLD FORUMS
		  if(container.tagName=="BODY" && doc.body.id=="check") container.removeChild (doc.getElementById("SL_balloon_obj"));
		  //STOP WORKING ON WP WIDGETS
		  if(container.tagName=="BODY" && doc.body.id=="tinymce") container.removeChild (doc.getElementById("SL_balloon_obj"));	     
	     

		if(doc.getElementById('SL_lng_from')){
	                doc.getElementById('SL_lng_from').value=TranslatorIM.SL_langSrc_bbl2;
	       	        doc.getElementById('SL_lng_to').value=TranslatorIM.SL_langDst_bbl2;
        		TranslatorIM.SL_locker_settler();
		}



	},

	fade: function (){

	 var doc = FExtension.browserInject.getDocument();
	 TranslatorIM.unfade();
	 setTimeout(function() { 
		var THEobj = doc.getElementById('SL_button');
		if(THEobj){
			 THEobj.style.opacity=0;
			 THEobj.style.transition='visibility 2s, opacity 2s linear';
		}
	 }, (TranslatorIM.Timing*1000));

	},

	dofade: function (){
	 var doc = FExtension.browserInject.getDocument();
	 if(doc.getElementById("SL_button")){
           doc.getElementById("SL_button").style.opacity=0;
	   setTimeout(function() { 
		var THEobj = doc.getElementById('SL_button');
		if(THEobj){
			 THEobj.style.opacity=0;
			 THEobj.style.transition='visibility 2s, opacity 2s linear';
		}
	   }, (TranslatorIM.Timing*1000));
	 }
	},

	unfade: function (){
	 var doc = FExtension.browserInject.getDocument();
	 if(doc.getElementById("SL_button")){
		doc.getElementById("SL_button").style.opacity=0;
		var THEobj = doc.getElementById('SL_button');
		if(THEobj){
			 THEobj.style.opacity=1;
			 THEobj.style.transition='';
		}
	 }
	},

	OpenTAB: function(ob){
		var myPort = browser.runtime.connect({name:"content"});
		myPort.postMessage({greeting: "optb:>"+ob});
	},

	SLShowHideAlert: function(){
	  var doc = FExtension.browserInject.getDocument();
	  if(doc.getElementById('SL_alert_bbl')) doc.getElementById('SL_alert_bbl').style.display='none'; 
	},
                

	SL_alert: function(txt){
	  var doc = FExtension.browserInject.getDocument();
	  if(doc.getElementById('SL_alert_bbl')){
		doc.getElementById('SL_alert_bbl').style.display="block";
		doc.getElementById('SL_alert_bbl').style.marginTop="-1px";
		doc.getElementById('SL_alert_bbl').style.marginLeft="0px";
		doc.getElementById("SL_alert_cont").innerText=txt;
          }
	},

	getSelectionCoords: function(e) {
	  var doc = FExtension.browserInject.getDocument();

	  try{
		  var range = doc.getSelection().getRangeAt(0);
		  var rect = range.getBoundingClientRect();

		  var l = Math.ceil(rect.left);
		  var t = Math.ceil(rect.top);
		  var r = Math.ceil(rect.right);
		  var b = Math.ceil(rect.bottom);


		  if(l==0 && t==0 && b==0 && r==0){
			if(TranslatorIM.SL_GLOBAL_X1>TranslatorIM.SL_GLOBAL_X2){
				l = TranslatorIM.SL_GLOBAL_X2;
				r = TranslatorIM.SL_GLOBAL_X1;
			} else {
				l = TranslatorIM.SL_GLOBAL_X1;
				r = TranslatorIM.SL_GLOBAL_X2;
			}

			if(TranslatorIM.SL_GLOBAL_Y1>TranslatorIM.SL_GLOBAL_Y2){
				t = TranslatorIM.SL_GLOBAL_Y2-document.body.scrollTop;
				b = TranslatorIM.SL_GLOBAL_Y1-document.body.scrollTop;
			} else {
				t = TranslatorIM.SL_GLOBAL_Y1-document.body.scrollTop;
				b = TranslatorIM.SL_GLOBAL_Y2-document.body.scrollTop;
			}
			t=t-8;
			b=b+8;
		  }


		    if(TranslatorIM.SL_NEST!="FLOAT"){
                          var SLdivField = doc.getElementById("SL_shadow_translator");
			  TranslatorIM.SL_L = l; 
			  if (SLdivField.style.display!="block")  TranslatorIM.SL_T = t;
			  TranslatorIM.SL_R = r;
			  TranslatorIM.SL_B = b;

			  if(t<265) TranslatorIM.SL_NEST="BOTTOM";
			  else TranslatorIM.SL_NEST="TOP";

			  var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
			  var deltab=window.innerHeight*1-140-b;
			  var deltat=t;

			  if(deltab>deltat && deltat<270)TranslatorIM.SL_NEST="BOTTOM";
			  else if(bodyScrollTop>270)TranslatorIM.SL_NEST="TOP";
			  if((bodyScrollTop+b)>(bodyScrollTop + window.innerHeight-200) && b-t> window.innerHeight-200 && t<260) TranslatorIM.SL_NEST="FLOAT";


			  TranslatorIM.SL_SID_PIN=TranslatorIM.SL_OnOff_PIN;
//			  TranslatorIM.SAVE_SES_PARAMS();
			  if(TranslatorIM.SL_FRAME==0){
			  	if(TranslatorIM.SL_NEST!="FLOAT" && TranslatorIM.SL_SID_PIN == "true") TranslatorIM.SL_NEST="FLOAT";
			  }
		     }



	 } catch(e){}
	 },



	 SL_JUMP: function (doc){
		setTimeout(function() {
			TranslatorIM.SL_bring_UP();
			TranslatorIM.SL_bring_DOWN();
        		if(TranslatorIM.SL_NEST!="FLOAT"){
				var SLdivField = doc.getElementById("SL_shadow_translator");

		 		if(TranslatorIM.SL_NEST=="TOP"){
		//			if(TranslatorIM.SL_MoveY.replace("px","") < 0){
				        	var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
						var tp = Math.abs((bodyScrollTop*1)+TranslatorIM.SL_T-(SLdivField.offsetHeight*1)-9);
						if(TranslatorIM.SL_SAVETEXT==0) SLdivField.style.top = tp +"px";
		//			}
				}
				TranslatorIM.WINDOW_and_BUBBLE_alignment(doc,SLdivField);
			} else {
			 	doc.getElementById("SL_arrow_up").style.display="none";
			}
			var e = window.event;
		}, 50);

	},


	WINDOW_and_BUBBLE_alignment: function(doc,SLdivField){
	   if(SLdivField) {
		if(TranslatorIM.SL_FRAME==1 && (TranslatorIM.GlobalBoxX+TranslatorIM.GlobalBoxY)>0){
			TranslatorIM.SL_NEST="";
			var OBJ = doc.getElementById('SL_pin');
			OBJ.className = "SL_pin_off";
			OBJ.title = FExtension.element(TranslatorIM.SL_LOC,"extPin_ttl");
			OBJ.style.background="url("+FExtension.browserInject.getURL('content/img/util/pin-off.png')+")";
			TranslatorIM.SL_SID_PIN="false";

	        	var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
			if(parseInt(TranslatorIM.SL_MoveX.replace("px",""))<0){
				var tp = Math.abs((bodyScrollTop*1)+TranslatorIM.SL_T-(SLdivField.offsetHeight*1)-9);
			}else{
				var tp = TranslatorIM.SL_MoveX;
				TranslatorIM.SL_MoveX="-10000px";
			}

			SLdivField.style.top = tp +"px";			

	        	var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
			if(parseInt(TranslatorIM.SL_MoveY.replace("px",""))<0){
				var lt = Math.abs((bodyScrollLeft*1)+((TranslatorIM.SL_L+TranslatorIM.SL_R)/2)-(SLdivField.offsetWidth*1)/2);
			}else{
				var lt = TranslatorIM.SL_MoveY;
				TranslatorIM.SL_MoveY="-10000px";
			}
			SLdivField.style.left = lt +"px";

			TranslatorIM.SL_arrows('up'); 
		} else {


	        	var bodyScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;	  	
        	        var Wy1 = bodyScrollTop;
	                var Wy2 = window.innerHeight + bodyScrollTop;
                	var By1 = parseInt(SLdivField.style.top.replace("px",""));
        	        var By2 = By1+SLdivField.offsetHeight;
			var DELTAy = 1;
			if (doc.body.offsetHeight > window.innerHeight)	var DELTAy = 5;
			if (By1 < Wy1) SLdivField.style.top = (Wy1+TranslatorIM.GlobalBoxY) +"px";
			if (By2 > Wy2) SLdivField.style.top = (Wy2-SLdivField.offsetHeight-DELTAy) +"px";

	        	var bodyScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;	  	
        	        var Wx1 = bodyScrollLeft;
	                var Wx2 = window.innerWidth + bodyScrollLeft;
                	var Bx1 = parseInt(SLdivField.style.left.replace("px",""));
			if(TranslatorIM.SL_NEST == "FLOAT") Bx1 = TranslatorIM.GlobalBoxX;
	                var Bx2 = Bx1+SLdivField.offsetWidth;
			var DELTAx = 1;
			if (doc.body.offsetWidth < window.innerWidth)	var DELTAx = 25;
			var cnt=0;

			if (Bx1 < Wx1) {cnt++;SLdivField.style.left = (Wx1+TranslatorIM.GlobalBoxX+DELTAx) +"px";}
			if (Bx2 > Wx2) {cnt++;SLdivField.style.left = (Wx2-SLdivField.offsetWidth-DELTAx) +"px";}

			if(TranslatorIM.SL_NEST == "FLOAT"){
				if(cnt==0 && TranslatorIM.GlobalBoxX!=0){
					SLdivField.style.left = TranslatorIM.GlobalBoxX+"px";
				}
			}
		}
	    }	
	},


	SL_arrows: function (st){
		var doc = FExtension.browserInject.getDocument();
		doc.getElementById('SL_arrow_up').style.display='block';
		doc.getElementById('SL_arrow_down').style.display='block';
	   	switch(st){
			case "up": doc.getElementById('SL_arrow_up').style.display='none'; break;
			case "down": doc.getElementById('SL_arrow_down').style.display='none'; break;
	                case "all": doc.getElementById('SL_arrow_up').style.display='none'; doc.getElementById('SL_arrow_down').style.display='none'; break;
	        }
	},


        SL_NotAllowed: function(){
	    var doc = FExtension.browserInject.getDocument();
		 if(doc.getElementById('SL_lng_from').value=="auto"){
			//doc.getElementById('SL_switch_b').title=TranslatorIM.SL_LOC("disabled");
			doc.getElementById('SL_switch_b').style.cursor='not-allowed';
		 }else{
			//doc.getElementById('SL_switch_b').title=TranslatorIM.SL_LOC("switch");
			doc.getElementById('SL_switch_b').style.cursor='pointer';
		 }
	},

	SL_WEB_PAGE_TRANSLATION: function(st){
                TranslatorIM.DETECT_WPT();
		setTimeout(function() {
		    var SLIDL = setInterval(function(){
			if(TranslatorIM.SL_WPT_TRG_LNG) {
		                var url = window.location;
				var myPort = browser.runtime.connect({name:"content"});
				if(st==0) myPort.postMessage({greeting: "wpt1:>"+url+"*"+TranslatorIM.SL_WPT_TRG_LNG});
				else myPort.postMessage({greeting: "wpt2:>"+url+"*"+TranslatorIM.SL_WPT_TRG_LNG});
				TranslatorIM.SL_WPT_TRG_LNG="";
				clearInterval(SLIDL);
			}
 	            },50); 
		}, 500);	
	},


	SL_BUBBLE_FROM_CM: function(e){
	      	var doc = FExtension.browserInject.getDocument();
	        if(TranslatorIM.SL_TS_LOC!=TranslatorIM.SL_TS_LOCold){
			if(doc.getElementById("SL_balloon_obj")){
	                        TranslatorIM.SL_BBL_OBJ_OFF(0);
				TranslatorIM.SL_OBJ_BUILDER();
				TranslatorIM.SL_ShowBalloon();
				TranslatorIM.SL_TS_LOCold=TranslatorIM.SL_TS_LOC;
			}
	        } else {
			TranslatorIM.getSelectionCoords(e);
			TranslatorIM.SL_ShowBalloon();
		}
	},



	MS: function(f,t,text,id){
		TranslatorIM.SL_OTHER_PROVIDERS(text,id);
	},

	CUSTOM_LANGS: function(list){
		var OUT = "";
	        //list = list.replace(/&#160;/ig," ");
        	var list2 = TranslatorIM.SL_LNG_CUSTOM_LIST;

		if(list2=="all") OUT = list;
		else{
		    var L1 = list.split(",");
		    for(var i=0; i<L1.length; i++){
	     		var L1base = L1[i].split(":");
		     	var L1short = list2.split(",");
			for(var j=0; j<L1short.length; j++){
			   if(L1base[0] == L1short[j]) OUT=OUT+L1short[j]+":"+L1base[1]+",";
			}
		    }
 		    OUT = OUT.substring(0,OUT.length-1);		    
		}

		var GLOBAL_LANG_LIST=LISTofPRpairsDefault.split(",");

		var tmp = OUT.split(",");
		OUT="";
		for(var i=0; i<tmp.length; i++){
	     		var L1 = tmp[i].split(":");
			for(var X=0; X<GLOBAL_LANG_LIST.length; X++){
				if(L1[0]==GLOBAL_LANG_LIST[X]) OUT=OUT+L1[0]+":"+L1[1]+",";
	        	}	
		}
 		OUT = OUT.substring(0,OUT.length-1);		    
		return OUT;
	},

	CleanUpAll: function(e){
	     try{
		var OBJ_ID = e.target.id;
		if(OBJ_ID.indexOf('SL_')==-1){
		    try{
		        var doc = FExtension.browserInject.getDocument();

		        for(var I = 0; I < doc.getElementsByTagName("iframe").length; I++){
                	    var ID = doc.getElementsByTagName("iframe")[I];
	                    if(ID!=""){
				if(ID.contentDocument && ID.contentDocument.body.innerHTML.indexOf('SL_balloon_obj')!=-1) {ID.contentDocument.getElementById('SL_balloon_obj').remove();}
			    }
			}
		    } catch(e){}
		}
	     } catch(e){}          
	},

	getSelectedText: function(){
		var OUT_TEXT = FExtension.browserInject.getSelectionText();
	 	var doc = FExtension.browserInject.getDocument();
	 	if(OUT_TEXT=="") OUT_TEXT = TranslatorIM.createSelection();
		return OUT_TEXT;
	},

	createSelection: function () {	
            var selText = "";
            if (window.getSelection) {  // all browsers, except IE before version 9
                if (document.activeElement && 
                        (document.activeElement.tagName.toLowerCase () == "textarea" || 
                         document.activeElement.tagName.toLowerCase () == "input")) 
                {
                    var text = document.activeElement.value;
                    selText = text.substring (document.activeElement.selectionStart, 
                                              document.activeElement.selectionEnd);
                }
                else {
                    var selRange = window.getSelection ();
                    selText = selRange.toString ();
                }
            }
            else {
                if (document.selection.createRange) {       // Internet Explorer
                    var range = document.selection.createRange ();
                    selText = range.text;
                }
            }
            if (selText !== "" && selText !== "undefined") {
                return (selText);
            }
        },

	PPB_tts_icon: function (T,resp){
		TranslatorIM.ForHistory=resp;
		var doc = FExtension.browserInject;
	   	var doc2 = doc.getDocument();
		var resptmp = resp;
		TranslatorIM.REMOTE_Voice_Close();
		if(TranslatorIM.ALLvoices.indexOf(T)!=-1){
			var ttsurl=FExtension.browserInject.getURL('content/img/util/tts.png');
			if(T=="ar" || T=="iw" || T=="fa" || T=="yi" || T=="ur" || T=="ps" || T=="sd" || T=="ckb" || T=="ug" || T=="dv" || T=="prs"){
				var tmpTTSicn='<div class="PPB_v2" title="'+FExtension.element(TranslatorIM.SL_LOC,"extListen_ttl")+'" id="SL_BBL_VOICE" lang="'+doc2.getElementById("SL_lng_to").value+'">&nbsp;</div>';
				resptmp = tmpTTSicn+'<div class="bbl_r_text">'+resptmp+'</div>';
			} else {
				var tmpTTSicn='<div class="PPB_v1" title="'+FExtension.element(TranslatorIM.SL_LOC,"extListen_ttl")+'" id="SL_BBL_VOICE" lang="'+doc2.getElementById("SL_lng_to").value+'">&nbsp;</div>';
				resptmp = tmpTTSicn+'<div class="bbl_l_text">'+resptmp+'</div>';
			}
		}
		return resptmp;
	},

	SL_GetLongName: function(code){
		var LANGSALL = FExtension.element(TranslatorIM.SL_LOC,'extLanguages').split(",");
		var LANGS = TranslatorIM.SL_LNG_LIST.split(",");
		for (var i = 0; i < LANGSALL.length; i++){
			var templang = LANGSALL[i].split(":");
			if(code == templang[0]){ 
				return (templang[1]);
			}
		}
	},
	AUTOhandler: function(doc,AUTO,DetLang){
		var LNGlist = FExtension.element(TranslatorIM.SL_LOC,'extLanguages');
		var LNGS = FExtension.element(TranslatorIM.SL_LOC,'extLanguages').split(",");
		for(var I=0; I<LNGS.length; I++){
			var LN = LNGS[I].split(":");
		 	if(LN[0]==DetLang){
				doc.getElementById('SL_lng_from').title=FExtension.element(TranslatorIM.SL_LOC,'extDetected') + " " + LN[1];
				break;
			}
		}			
		var autopattern = "auto";
		if(AUTO != true ) autopattern = "XautoX";
		return autopattern;
	},

	ACTIVATE_THEMEbbl: function (st){
	 	if(st==1){
	 	        var bg = "#191919";
			var doc = FExtension.browserInject.getDocument();
			doc.getElementById("SL_shadow_translator").style.filter=TranslatorIM.SL_DARK;

			var SL_lng = doc.getElementsByClassName("SL_lngs");
			for(var i=0; i<SL_lng.length; i++) {
				for(var j=0; j<SL_lng[i].options.length; j++) SL_lng[i].options[j].setAttribute("style", "background:"+bg+" !important;color:#fff;");
			}

			var hrefs = doc.getElementsByClassName("SL_options");
			for(var i=0; i<hrefs.length; i++) hrefs[i].setAttribute("style", "filter:"+TranslatorIM.SL_DARK);
			var hrefs = doc.getElementsByClassName("_ALNK");
			for(var i=0; i<hrefs.length; i++) hrefs[i].setAttribute("style", "filter:"+TranslatorIM.SL_DARK);

			doc.getElementById("SL_PN0").style.filter=TranslatorIM.SL_DARK;
                        doc.getElementById("SL_PN1").style.filter=TranslatorIM.SL_DARK;
			doc.getElementById("SL_PN2").style.filter=TranslatorIM.SL_DARK;
			doc.getElementById("SL_PN3").style.filter=TranslatorIM.SL_DARK;
                        
			doc.getElementById("SL_BBL_IMG").style.filter=TranslatorIM.SL_DARK;

			setTimeout(function() {
				var lbl = doc.getElementsByClassName("SL_BL_LABLE_ON");	
				for(var i=0; i<lbl.length; i++) {
					var ind = lbl[i].id.replace("SL_P","");
					if(lbl[i].id.indexOf(ind)!=-1) doc.getElementById("SL_PN"+ind).style.filter=TranslatorIM.SL_LIGHT;
				}
			}, 700);

		}
	},

    getAnalysisText: function (target) {
      var iterator = TranslatorIM.getIterator(target), textnode, analysisText = "";
      while ((textnode = iterator.nextNode())) {
        if(textnode.data.length>20){
	        analysisText += textnode.data + ". ";
        	if (analysisText.length >= 4096) {
	          break;
        	}
	}
      }
      return analysisText;
    },

    getIterator: function(root) {
      var doc = FExtension.browserInject.getDocument();
      var NodeFilter = window.NodeFilter,
      Node = window.Node,
      target = root || doc.body;
      return doc.createNodeIterator(target, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          if (/^\s*$/.test(node.textContent) || node.parentNode.nodeType !== Node.ELEMENT_NODE || node.isChunked) {
            return NodeFilter.FILTER_REJECT;
          }
          while ((node = node.parentNode) !== target) {
            var tag = node ? node.nodeName : 'SCRIPT';
            if (TranslatorIM.invalidElements[tag]) {
              return NodeFilter.FILTER_REJECT;
            }
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }, false);
    },

    getRootNode: function() {
   	var doc = FExtension.browserInject.getDocument();
      var host = window.location.host;
      switch (host) {
      case 'twitter.com':
        return doc.querySelector(".js-tweet-text");
        break;
      case 'github.com':
        return doc.querySelector(".announce");
        break;
      case 'bitbucket.org':
        return doc.querySelector("#wiki");
        break;
      }
      return null;
    },

    DETECT_WPT: function(){
	      	var rootTranslateNode = TranslatorIM.getRootNode();
	      	var analysisText = TranslatorIM.getAnalysisText(rootTranslateNode);
		TranslatorIM.SL_WPT_DODetection(analysisText);
    },

    SL_WPT_DODetection: function(myTransText) {
		  if(myTransText!=""){
		    myTransText = myTransText.substring(0,150);

		    var num = Math.floor((Math.random() * SL_GEO.length)); 
		    var theRegion = SL_GEO[num];
		    var cntr = myTransText.split(" ");
                    var newTEXT = myTransText;

		    var baseUrl = 'https://translate.google.'+theRegion+'/translate_a/t';
		    var SL_Params="client=dict-chrome-ex&sl=auto&tl=en&q="+encodeURIComponent(truncStrByWord(newTEXT,100)) + "&tbb=1&ie=UTF-8&oe=UTF-8";    

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
						TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError1"));
						return false;
					}
				}
			}
			ajaxRequest.onreadystatechange = function(){
				if(ajaxRequest.readyState == 4){

		                        var resp = ajaxRequest.responseText;

					var captcha=0;
					if(resp.indexOf('CaptchaRedirect')!=-1) captcha = 1;
				        if(resp.indexOf('ld_result":{"srclangs":["')!=-1) {
                		                var GDImTranslator_lang=resp.split('ld_result":{"srclangs":["');
						var GDImTranslator_lang1=GDImTranslator_lang[1].split('"');
		 				resp=GDImTranslator_lang1[0];		 				
                                                TranslatorIM.SL_WPT_TRG_LNG=resp;
					} else 	TranslatorIM.SL_WPT_Detector(myTransText);
				}
			}
			baseUrl = baseUrl +"?"+ SL_Params;
			ajaxRequest.open("GET", baseUrl, true);
		        ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		        //ajaxRequest.setRequestHeader("Referer", "https://translate.google.com/");
			ajaxRequest.send(SL_Params);         
		  }
	},

	SL_WPT_Detector: function(myTransText) {

		  var doc = FExtension.browserInject.getDocument();
		  if(myTransText!=""){
		    var theLIMIT = 100;
		    var SLDImTranslator_url = TranslatorIM.ImTranslator_theurl+"ld.asp?tr=bl&text="+encodeURIComponent(truncStrByWord(myTransText,theLIMIT));
		    
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
						TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError1"));
						return false;
					}
				}
			}
			ajaxRequest.onreadystatechange = function(){
				if(ajaxRequest.readyState == 4){

		                   var resp = ajaxRequest.responseText;
		                   if(resp!=""){     
					if(resp.indexOf('#|#')!=-1){
				 	  	var tmp=decodeURIComponent(resp);
						var tmp2 = tmp.split("#|#");
					  	resp=tmp2[0];
						resp = resp.replace("zh","zh-CN")
						resp = resp.replace("zt","zh-TW")

                                                TranslatorIM.SL_WPT_TRG_LNG=resp;
					}
				    }
				}
			}
			ajaxRequest.open("POST", SLDImTranslator_url, true);
			ajaxRequest.send(null); 
		  }
	},


	SL_BBL_OBJ_OFF: function(st){		
	     	var doc = FExtension.browserInject.getDocument();
		TranslatorIM.CONTROL_SUM="";
		if (st == 0){ 
			if(TranslatorIM.SL_SAVETEXT == 0){
				if(doc.getElementById("SL_balloon_obj")) doc.body.removeChild (doc.getElementById("SL_balloon_obj"));			
			}
		} else{
			if(doc.getElementById("SL_balloon_obj")) doc.body.removeChild (doc.getElementById("SL_balloon_obj"));			
		}
	},

	BBL_IfMouseIsInside: function(e){
		var doc = FExtension.browserInject.getDocument();
		var st = 0;
		var THEobj = doc.getElementById('SL_shadow_translator');
		if(THEobj){
			var divRect = THEobj.getBoundingClientRect();
			if (e.clientX >= (divRect.left-20) && e.clientX <= divRect.right && e.clientY >= divRect.top && e.clientY <= divRect.bottom) st=1;
		}
		return(st);
	},


	InitiateIT_target_lang: function(){
	     	var doc = FExtension.browserInject.getDocument();
	        var container = doc.body;
	        if(FExtension.browserInject.getSelectionText()!=""){
                  if(container){

		          var ext = FExtension.browserInject;
			  var theObj = doc.getElementById("SL_MENU");
                          if(theObj) theObj.parentNode.removeChild(theObj);
			  var OB = doc.createElement('div');
			  var id = doc.createAttribute("id");
			  id.value = "SL_MENU";
		          OB.setAttributeNode(id);
        		  container.appendChild (OB);
                          var OB2="";
		          var act = "";
			  TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));

			  var MENU = TranslatorIM.SL_LNG_LIST.split(",");
		     	  if(MENU.length>=TranslatorIM.SL_FAV_START){
				  var SL_FAV_LANGS_LONG = TranslatorIM.SL_ADD_LONG_NAMES(TranslatorIM.SL_FAV_LANGS_IT);
				  if(SL_FAV_LANGS_LONG!=""){
					var favArr=SL_FAV_LANGS_LONG.split(","); 
					for(var I=0; I < favArr.length; I++){
					    var CURlang = favArr[I].split(":");
					    act = "";
					    if (I==0) {
						act=" selected ";
					        TranslatorIM.SL_langDst_bbl2 = CURlang[0];
						TranslatorIM.SL_SAVE_FAVORITE_LANGUAGES(CURlang[0], '', 1, TranslatorIM.SL_FAV_LANGS_IT, "IT");
					    }
					    OB2 = OB2 + "<option " + act +" value='"+CURlang[0]+"'>"+CURlang[1]+"</option>";
					}
					var all = FExtension.element(TranslatorIM.SL_LOC,"extwptDAll");
				        OB2 = OB2 + "<option disabled value='NULL'>-------- [ "+ all +" ] --------</option>";
				  }


				  for(var J=0; J < MENU.length; J++){
				    CURlang = MENU[J].split(":");
				    if(SL_FAV_LANGS_LONG==""){
					    var act2 = "";
					    if(TranslatorIM.SL_langDst_it == CURlang[0] ) act2=" selected ";
				    }
				    OB2 = OB2 + "<option id='"+J+"_i_MENU' "+ act2 +" value='"+CURlang[0]+"'>"+CURlang[1]+"</option>";
				  }
			  } else { 
				  for(var J=0; J < MENU.length; J++){
				    CURlang = MENU[J].split(":");
					    var act2 = "";
					    if(TranslatorIM.SL_langDst_it == CURlang[0] ) act2=" selected ";
				    OB2 = OB2 + "<option id='"+J+"_i_MENU' "+ act2 +" value='"+CURlang[0]+"'>"+CURlang[1]+"</option>";
				  }
			  }

			  var OBCLOSE = "<div src='#'  title='"+FExtension.element(TranslatorIM.SL_LOC,'extClose')+"' id='SL_MENU_CLOSE'></div>";
			  var OBMENU = "<select id='SL_IT_MENU'>" + OB2 + "</select>";
			  var OBLINKS = "<div id='SL_MENU_LINKS' align=center><a id='SL_MENU_LINK_OPT'>"+FExtension.element(TranslatorIM.SL_LOC,"extOptions")+"</a> : <a id='SL_MENU_LINK_HIS'>"+FExtension.element(TranslatorIM.SL_LOC,"extHistory")+"</a></div>";

			  var ITOBJ = OBCLOSE+"<span id='SL_MENU_TTL'>" + FExtension.element(TranslatorIM.SL_LOC,"extSeTa")+"</span><br>"+OBMENU + OBLINKS ;
                          ITOBJ = DOMPurify.sanitize(ITOBJ);
			  doc.getElementById("SL_MENU").innerHTML=ITOBJ;

		  	  doc.getElementById('SL_MENU_CLOSE').style.background='url('+ext.getURL('content/img/util/close.png')+')';
		  	  doc.getElementById('SL_IT_MENU').style.background='#fff url('+ext.getURL('content/img/util/select.png')+')  no-repeat 100% 0';

		  }
		}
	},

	CloseIT_target_lang: function(){
	     	var doc = FExtension.browserInject.getDocument();
		var theObj = doc.getElementById("SL_MENU");
                if(theObj) theObj.parentNode.removeChild(theObj);
	},

	SL_IT_retranslate: function(e){
	     	var doc = FExtension.browserInject.getDocument();
		var id = e.target.id;

	     	if(id.indexOf("_i_MENU")!=-1){
			var target = doc.getElementById(id).value;
  			FExtension.browserInject.runtimeSendMessage({greeting: "SES_IT:>" + target}, function(response) {}); 
			TranslatorIM.SL_langDst_it=target;
		        TranslatorIM.SL_SAVE_FAVORITE_LANGUAGES(TranslatorIM.SL_langDst_it, '', 1, TranslatorIM.SL_FAV_LANGS_IT, "IT");
			TranslatorIM.SL_IT_retranslate_and_close();
		}
	},


	SL_IT_retranslate_and_close: function(){
                inlinerInjectInliner();
		TranslatorIM.SL_ONETIMERUN=1;
		TranslatorIM.CloseIT_target_lang();
	},


	SL_IT_option_open: function(){
	     	var doc = FExtension.browserInject.getDocument();
	     	var url = FExtension.browserInject.getURL('content/html/options/options.html?it');
	        doc.getElementById("SL_MENU_LINK_OPT").href=url;   
	        doc.getElementById("SL_MENU_LINK_OPT").target='_blank';
	},

	SL_IT_his_open: function(){
	     	var doc = FExtension.browserInject.getDocument();
	     	var url = FExtension.browserInject.getURL('content/html/options/options.html?hist');
	        doc.getElementById("SL_MENU_LINK_HIS").href=url;
	        doc.getElementById("SL_MENU_LINK_HIS").target='_blank';
	},

	SAVE_SES_PARAMS: function(){
	     	var doc = FExtension.browserInject.getDocument();
		if(doc.getElementById("SL_balloon_obj")) {
			//if(TranslatorIM.SL_langDst!=TranslatorIM.SL_langDst_bbl2) doc.getElementById("SL_lng_to").value=TranslatorIM.SL_langDst_bbl2;
			var dofrom = doc.getElementById("SL_lng_from").value;
			var doto = doc.getElementById("SL_lng_to").value;
			if(TranslatorIM.FlippedByAuto == 1){
				var dofrom = TranslatorIM.SL_langSrc;
				var doto = TranslatorIM.SL_langDst;
			}

			if(doto == "") doto = TranslatorIM.SL_langDst;
			FExtension.browserInject.runtimeSendMessage({greeting: "SES:>" + dofrom +","+doto+","+TranslatorIM.SL_FONT_SID+","+TranslatorIM.SL_SID_PIN+","+doc.getElementById('SL_locer').checked+","+TranslatorIM.SL_OnOff_BTN2}, function(response) {}); 
		}
	},


	SL_YANDEX: function(text,dir){
	        dir = dir.replace("auto","en");
       		dir = dir.split("/");
       		var f = dir[0];
       		var t = dir[1];

        	f = f.replace("zh-CN","zh");
        	f = f.replace("jw","jv");
	        f = f.replace("iw","he");
		f = f.replace("srsl","sr");
        	f = f.replace("tlsl","tl");

	        t = t.replace("zh-CN","zh");
	        t = t.replace("jw","jv");
        	t = t.replace("iw","he");
		t = t.replace("srsl","sr");
        	t = t.replace("tlsl","tl");

	        dir = f+"-"+t;
		if(f=="auto") dir = t;

		TranslatorIM.getYSID(0);
		setTimeout(function(){
		    var YSLIDL = setInterval(function(){
			if(TranslatorIM.YSIDstatus === true) {
				clearInterval(YSLIDL);
				YSLIDL="";
				TranslatorIM.getY_TRANSLATION(dir,text);
			} 
		    },5);  
	       	},5);  		
	},

	getYSID: function(st){
 		var YK = TranslatorIM.SL_YKEY;
		TranslatorIM.YSIDold = YK;
		if(st==1) YK=0;
		if(YK==0) {
		       	var baseUrl="https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false";
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
			ajaxRequest.onreadystatechange = function(){
			        var resp = "";
				if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
			            var resp = ajaxRequest.responseText;
				    resp = DOMPurify.sanitize (resp);
			            resp = resp.match(/sid\:\s\'[0-9a-f\.]+/);
	                	    if (resp && resp[0] && resp[0].length > 7) {
               		        	TranslatorIM.YSID = resp[0].substring(6);
					FExtension.browserInject.runtimeSendMessage({greeting: "YKEY:>" + TranslatorIM.YSID }, function(response) {}); 
		                        TranslatorIM.YSIDstatus = true;
               			    } else {
		                        TranslatorIM.YSIDstatus = false;
					FExtension.browserInject.runtimeSendMessage({greeting: "YKEY:>0"}, function(response) {}); 
               			    }
				}
			}
			ajaxRequest.open("GET", baseUrl, true);
			ajaxRequest.setRequestHeader("Access-Control-Allow-Headers", "*");
			ajaxRequest.setRequestHeader("Access-Control-Allow-Origin", "null");
			ajaxRequest.send();
		  } else {
			TranslatorIM.YSID = TranslatorIM.SL_YKEY;
                	TranslatorIM.YSIDstatus = true;
		  }
	},


	getY_TRANSLATION: function(dir, text){
	     	var doc = FExtension.browserInject.getDocument();
       		dir = dir.replace("zh-CN","zh");
		dir = dir.replace("jw","jv");
	        dir = dir.replace("iw","he");
        	var tmp=dir.split("-");
		var mySourceLang=tmp[0];
		var myTargetLang=tmp[1];
		var S = mySourceLang;
		var T = myTargetLang;
	  	var baseUrl="https://translate.yandex.net/api/v1/tr.json/translate?srv=tr-url-widget&id=" + TranslatorIM.YSID + "-0-0&format=html&lang=" + dir + "&text="+ encodeURIComponent(text);

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
		ajaxRequest.onreadystatechange = function(){
		        var resp = "";
			if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
	        	    var resp = ajaxRequest.responseText;
			    resp = DOMPurify.sanitize (resp);
	        	    resp=resp.replace(/\\"/ig,"'");
        		    if(resp.indexOf('text":["')!=-1){
		    		var R1 = resp.split('text":["');
			    	var R2 = R1[1].split('"');
	    			var R3 = R2[0];
       			        R3 = R3.replace(/\\n/ig,"<br>");
       			        R3 = R3.replace(/\\r/ig,"");
       			        R3 = R3.replace(/\\t/ig,"");
				TranslatorIM.SL_temp_result=R3;
		                resp = TranslatorIM.PPB_tts_icon(T,R3);
				doc.getElementById('SL_shadow_translation_result').innerHTML = resp;
				doc.getElementById('SL_shadow_translation_result2').innerHTML = resp;
				var theQ = text.split(" ").length;
				if (theQ==1) TranslatorIM.CNTR('1232',S+"/"+T, text.length);
				else TranslatorIM.CNTR('1222',S+"/"+T, text.length);
				doc.getElementById('SL_shadow_translation_result').style.direction = "ltr";
				doc.getElementById('SL_shadow_translation_result2').style.textAlign = "left";

				var SLnow = new Date();
				SLnow = SLnow.toString();
				var TMPtime = SLnow.split(" ");
				var CurDT = TMPtime[1] + " " + TMPtime[2] + " " + TMPtime[3] + ", " + TMPtime[4];

				var BeforeSanitization = text + "~~" + TranslatorIM.SL_temp_result + "~~" + S + "|" + T + "~~"+ doc.location+"~~"+CurDT+"~~2~~Y^^";
				var SanitizedHistory = DOMPurify.sanitize (BeforeSanitization);
				FExtension.browserInject.runtimeSendMessage({greeting:"hist:>"+ SanitizedHistory}, function(response) {
					if(response){}
				});


				if(T == "ar" || T == "iw" || T == "fa" || T == "yi" || T == "ur" || T == "ps" || T == "sd" || T == "ckb" || T == "ug" || T == "dv" || T == "prs"){
					doc.getElementById('SL_shadow_translation_result').style.direction = "rtl";
					doc.getElementById('SL_shadow_translation_result').style.textAlign = "right";
				} else {
					doc.getElementById('SL_shadow_translation_result').style.direction = "ltr";
					doc.getElementById('SL_shadow_translation_result').style.textAlign = "left";
				}
                                doc.getElementById('SL_loading').style.display="none";
                                TranslatorIM.SL_JUMP(doc);

				TranslatorIM.ACTIVATE_THEMEbbl(TranslatorIM.THEMEmode);
			   } else {
                	        TranslatorIM.YSIDstatus = false;
				FExtension.browserInject.runtimeSendMessage({greeting: "YKEY:>" + TranslatorIM.YSID }, function(response) {}); 
			    	var msg = "Yandex: "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),"extnotrsrv");
			        msg = DOMPurify.sanitize (msg);
				doc.getElementById('SL_shadow_translation_result').innerHTML = msg;
				doc.getElementById('SL_shadow_translation_result2').innerHTML = msg;
			   }
			} else {
			    if(ajaxRequest.status == 403){
				FExtension.browserInject.runtimeSendMessage({greeting: "YKEY:>0"}, function(response) {}); 
				TranslatorIM.YSID=0;
				if(TranslatorIM.YSID!=TranslatorIM.YSIDold){
					TranslatorIM.SL_YANDEX(dir, text);
				}else{
		                        TranslatorIM.YSIDstatus = false;
					FExtension.browserInject.runtimeSendMessage({greeting: "YKEY:>0"}, function(response) {}); 
					TranslatorIM.YSIDold = 0;
				}
			    }
			}
		}
		ajaxRequest.open("GET", baseUrl, true);
		ajaxRequest.setRequestHeader("Access-Control-Allow-Headers", "*");
		ajaxRequest.setRequestHeader("Access-Control-Allow-Origin", "null");
		ajaxRequest.send();
	}, 

	CNTR: function(id,dir,nmb){
	    FExtension.browserInject.runtimeSendMessage({greeting: "CNTR:>"+id+","+dir+","+nmb}, function(response) {}); 
	},

	CNTRP: function(id,dir,nmb){
	    FExtension.browserInject.runtimeSendMessage({greeting: "CNTRP:>"+id+","+dir+","+nmb}, function(response) {}); 
	},


	SL_ADD_LONG_NAMES: function(codes){
		var OUT = "";
		var MENU = TranslatorIM.SL_LNG_LIST.split(",");
		var FAV = codes.split(",");
		for (var i=0; i<FAV.length; i++){
			var MARKER = 0;
			for (var j=0; j<MENU.length; j++){
				var M = MENU[j].split(":");
				if(FAV[i] == M[0]){
					OUT = OUT + M[0] + ":" + M[1];
					MARKER=1;
				}
			}
			if(MARKER==1){
				if(i <= FAV.length) OUT = OUT + ","
			}
		}
		if(OUT.slice(-1)==",") 	OUT = OUT.slice(0, OUT.length - 1);
		return OUT;	
	},


	SL_SAVE_FAVORITE_LANGUAGES: function(ln, ob, st, TR, TP){
		var OUT = "";
		var OUT2 = "";
		if(TR.indexOf(ln)!=-1){
			TR = TR.replace(ln+",",""); 
			if(TR.indexOf(",")==-1) TR = TR.replace(ln,""); 
		}

		OUT = ln + ",";	
		var ARR = TR.split(",");
		for (var i = 0; i < ARR.length; i++){
		 	OUT = OUT + ARR[i]+",";
		}
		if(OUT.slice(-1)==",") 	OUT = OUT.slice(0, OUT.length - 1);
		var TMP = OUT.split(",");
		if(TMP.length > TranslatorIM.SL_FAV_MAX) {
			for (var j = 0; j < TMP.length-1; j++){
			 	OUT2 = OUT2 + TMP[j]+",";
			}		
			OUT = OUT2 
		}
		if(OUT.slice(-1)==",") 	OUT = OUT.slice(0, OUT.length - 1);
		FExtension.browserInject.runtimeSendMessage({greeting: "FAV_"+TP+":>" + OUT}, function(response) {}); 

		if(st == 0){
			if(OUT!=""){
				var MENU = TranslatorIM.SL_LNG_LIST.split(",");
				if(MENU.length>=TranslatorIM.SL_FAV_START){
					TranslatorIM.SL_REBUILD_TARGET_LANGUAGE_MENU(OUT,ob);
				}
			}
		}

	},


	SL_REBUILD_TARGET_LANGUAGE_MENU: function (FAV, ob){

		var doc = FExtension.browserInject.getDocument();
		var TMP_TO = doc.getElementById("SL_lng_to").value;
		var MENU = TranslatorIM.SL_LNG_LIST.split(",");
		if(MENU.length>=TranslatorIM.SL_FAV_START){
        	        doc.getElementById(ob).innerText="";
			var SEL = 0;

			if(FAV!=""){
                        	FAV = TranslatorIM.SL_ADD_LONG_NAMES(FAV);
				var favArr=FAV.split(","); 
				for(var J=0; J < favArr.length; J++){
				    var CURlang = favArr[J].split(":");
				    var OB_FAV = doc.createElement('option');

				    var v = doc.createAttribute("value");				    		
				    v.value = CURlang[0];
				    OB_FAV.setAttributeNode(v);

				    if(J == 0){
					    var sel = doc.createAttribute("selected");
					    sel.value = "selected";
					    OB_FAV.setAttributeNode(sel);
					    TranslatorIM.SL_langDst = CURlang[0];
					    SEL = 1;	
				    }

				    OB_FAV.appendChild(doc.createTextNode(CURlang[1]));
				    doc.getElementById(ob).appendChild(OB_FAV);
				}




				OB_FAV = doc.createElement('option');
				var d = doc.createAttribute("disabled");
				d.value = true;
				OB_FAV.setAttributeNode(d);
				var all = FExtension.element(TranslatorIM.SL_LOC,"extwptDAll");
			    	OB_FAV.appendChild(doc.createTextNode("-------- [ "+ all +" ] --------"));
			    	doc.getElementById(ob).appendChild(OB_FAV);
			}

			var tmp =favArr[0].split(":");
		        var thelang = tmp[0];
			for(J=0; J < MENU.length; J++){
			    CURlang = MENU[J].split(":");
			    var option = doc.createElement('option');
			    if(SEL == 0){
				    if(CURlang[0] == thelang){
					    var sel = doc.createAttribute("selected");
					    sel.value = "selected";
					    option.setAttributeNode(sel);
				    }
			    }
			    v = doc.createAttribute("value");
			    v.value = CURlang[0];
			    option.setAttributeNode(v);
			    option.appendChild(doc.createTextNode(CURlang[1]));
			    doc.getElementById(ob).appendChild(option);
			}
		} else {
			doc.getElementById(ob).innerText="";
		        var thelang = TMP_TO;
			if(TranslatorIM.SL_langDst!="" && TranslatorIM.SL_SID_TO=="") thelang = TranslatorIM.SL_langDst_bbl2;
			for(J=0; J < MENU.length; J++){
			    CURlang = MENU[J].split(":");
			    var option = doc.createElement('option');
			    if(CURlang[0] == thelang){
				    var sel = doc.createAttribute("selected");
				    sel.value = "selected";
				    option.setAttributeNode(sel);
			    }
			    v = doc.createAttribute("value");
			    v.value = CURlang[0];
			    option.setAttributeNode(v);
			    option.appendChild(doc.createTextNode(CURlang[1]));
			    doc.getElementById(ob).appendChild(option);
			}

		}
	},


	NoProvidersAlert: function(){
		var doc = FExtension.browserInject.getDocument();
		var T = doc.getElementById('SL_lng_to').value;
	   	var msg = FExtension.element(TranslatorIM.SL_LOC,"extLPNotSupported");
	   	var selectDst = doc.getElementById('SL_lng_to');
	   	var selectedDstIndex = selectDst.selectedIndex;
	   	var selectedDstText = selectDst.options[selectedDstIndex].text; 

	   	var selectSrc = doc.getElementById('SL_lng_from');
	   	var selectedSrcIndex = selectSrc.selectedIndex;
	   	var selectedSrcText = selectSrc.options[selectedSrcIndex].text; 

	   	msg = msg.replace("XXX",selectedSrcText);
	   	msg = msg.replace("YYY",selectedDstText);
		msg = msg + "<br><br>" + "Please activate all providers in the Options";
	   	doc.getElementById('SL_shadow_translation_result').style.visibility="visible";
	   	doc.getElementById('SL_shadow_translation_result2').style.visibility="visible";

	   	doc.getElementById('SL_shadow_translation_result').innerHTML="<div align=center style='color:red;margin-top:20px;'>"+msg+"</div>";
	   	doc.getElementById('SL_shadow_translation_result2').innerHTML="<div align=center style='color:red;margin-top:20px;'>"+msg+"</div>";
	   	TranslatorIM.SL_SAVE_FAVORITE_LANGUAGES(T, 'SL_lng_to', 0, TranslatorIM.SL_FAV_LANGS_BBL, "BBL");
	},

	DETERMIN_IF_LANGUAGE_IS_AVAILABLE_BBL: function(){
		try{
			var doc = FExtension.browserInject.getDocument();
			var T = doc.getElementById('SL_lng_to').value;
			var lngarr = LISTofLANGsets[0].split(",");
			var cnt = 0;
			if(lngarr.length>1 && T!=""){
				for(var i=1; i<lngarr.length; i++){
					if(lngarr[i]==T) cnt++;
				}
			}
			return(cnt);
		} catch(ex){}
    	},

	DetectBig5: function(myTransText){
	    	var all = myTransText.length;
		var count = 0;
		for (var i = 0, len = myTransText.length; i < len; i++) {
			var rr = myTransText[i].match(/[\u3400-\u9FBF]/);
			if(rr) count ++;
	    	}
		var other = all-count;
		var OUT = 0	
		if(other<=count) OUT=1
		return(OUT);
	}



}


if(FExtension.browser.isLocalStoragePreset()){
	TranslatorIM.init();
}else{
	var appcontent = window.document.getElementById("appcontent");
		appcontent.addEventListener("DOMContentLoaded", function(){
		TranslatorIM.init();
	        init();
	}, false);
}
window.addEventListener("DOMContentLoaded", TranslatorIM.SL_GOOGLE_WPT(), false);


}catch(e){
//	TranslatorIM.SL_alert(FExtension.element(TranslatorIM.SL_LOC,"extError2"));
}


