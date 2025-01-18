ImTranslatorDataEvent = {
	init: function(){
		ImTranslatorDataEvent.mousedown();
		(function(){
	            var doc = FExtension.browserInject.getDocument();
		    doc.addEventListener('keydown', ImTranslatorDataEvent.mousedown,!1);
		})();


		(function(){
	            var doc = FExtension.browserInject.getDocument();
		    doc.addEventListener('mousedown', ImTranslatorDataEvent.mousedown,!1);
		})();
	},

	mousedown: function(){
             FExtension.browserInject.extensionSendMessage({greeting: 1}, function(response) {
             if(response && response.farewell){
                
                var theresponse = response.farewell.split("~");

                var theresponse1 = theresponse[1].split("|")
                var theresponse2 = theresponse[2].split("|");

                TranslatorIM.SL_MSG=response.farewell;
                TranslatorIM.SL_langSrc=theresponse2[0];
                TranslatorIM.SL_langDst=theresponse2[1];


                TranslatorIM.SL_FontSize=theresponse2[2];
                TranslatorIM.SL_OnOff_BTN=theresponse2[3];
                TranslatorIM.SL_OnOff_PIN=theresponse2[4];
                TranslatorIM.SL_OnOff_HK=theresponse2[5];
                TranslatorIM.SL_HK=theresponse2[6];
                TranslatorIM.SL_NODETECT_bbl=theresponse2[7];
                TranslatorIM.SL_TS=theresponse2[8];

                TranslatorIM.SL_ENABLE=theresponse2[9];
                TranslatorIM.SL_TH_2=theresponse2[10];
                TranslatorIM.SL_TH_4=theresponse2[11];
                TranslatorIM.SL_FK=theresponse2[12];
                TranslatorIM.SL_no_detect_it=theresponse2[13];
                TranslatorIM.SL_dict_bbl=theresponse2[14];
                TranslatorIM.SL_HK2=theresponse2[15];
                TranslatorIM.SL_FK_inv=theresponse2[16];
		TranslatorIM.SL_FK_box1=theresponse2[17];
		TranslatorIM.SL_inlinerFK1=theresponse2[18];
		TranslatorIM.SL_inliner=theresponse2[19];
		TranslatorIM.SL_FK_box2=theresponse2[20];
		TranslatorIM.SL_inlinerFK2=theresponse2[21];
		TranslatorIM.SL_clean=theresponse2[22];
		var tmp = theresponse[4].split("|");
		TranslatorIM.SL_DBL = tmp[3];

		//NEW HOT KEYS------------------------
		TranslatorIM.SL_HK_gt1=theresponse[5];
		TranslatorIM.SL_HK_gt2=theresponse[6];
		TranslatorIM.SL_HK_it1=theresponse[7];
		TranslatorIM.SL_HK_it2=theresponse[8];
		TranslatorIM.SL_HK_bb1=theresponse[9];
		//BLANK GT INVOKER
		TranslatorIM.SL_GT_INV=theresponse1[2];
		//BBL OTHER TRANSLATORS
		TranslatorIM.SL_SHOW_PROVIDERS=theresponse[10];		
		TranslatorIM.Timing=theresponse[11];		
		TranslatorIM.SL_FONT=theresponse[12];
		TranslatorIM.BBL_TS=theresponse[13];
		//HOT KEYS WPT and OPT
		TranslatorIM.WPT1=theresponse[14];
		TranslatorIM.WPT2=theresponse[15];
		TranslatorIM.OPT=theresponse[16];
		TranslatorIM.WPTbox1=theresponse[17];
		TranslatorIM.WPTbox2=theresponse[18];
		TranslatorIM.OPTbox=theresponse[19];
		TranslatorIM.WPTdstlang=theresponse[20];
		TranslatorIM.WPTdsrclang=theresponse[21];
		TranslatorIM.SL_LOC=theresponse[22];
		TranslatorIM.SL_TS_LOC=theresponse[23];
		TranslatorIM.SL_TRIGGER=theresponse[24];
		//ADVANCED
		TranslatorIM.SL_GVoices=theresponse[25];
		TranslatorIM.SL_SLVoices=theresponse[26];
		TranslatorIM.ALLvoices=theresponse[27];
		//ADVANCED
		TranslatorIM.SL_SAVETEXT=theresponse[28];
		TranslatorIM.SL_LNG_CUSTOM_LIST=theresponse[29];
		//TRANSLATOR
		TranslatorIM.SL_TRANSLATOR_BOX=theresponse[31];
		TranslatorIM.SL_TRANSLATOR=theresponse[32];
		TranslatorIM.SL_DOM=theresponse[33];
		TranslatorIM.SL_ALL_PROVIDERS_BBL=theresponse[34];
		TranslatorIM.SL_DICT_PRESENT=theresponse[35];
		TranslatorIM.SL_HK_bb2=theresponse[36];

		TranslatorIM.SL_BBL_CLOSER=theresponse[37];

		TranslatorIM.GlobalCorrectionX=parseInt(theresponse[38]);
		TranslatorIM.GlobalCorrectionY=parseInt(theresponse[39]);
		TranslatorIM.GlobalBoxX=parseInt(theresponse[40]);
		TranslatorIM.GlobalBoxY=parseInt(theresponse[41]);
		if(TranslatorIM.GlobalBoxX<0)TranslatorIM.GlobalBoxX=0;
		if(TranslatorIM.GlobalBoxY<0)TranslatorIM.GlobalBoxY=0;
		if(TranslatorIM.GlobalBoxX>0 && TranslatorIM.GlobalBoxY>0){
			TranslatorIM.SL_NEST_FLOAT=1;
			TranslatorIM.SL_NEST="FLOAT";
		}
		TranslatorIM.FORSEbubble=parseInt(theresponse[42]);
		TranslatorIM.BL_D_PROV=theresponse[43];
		TranslatorIM.BL_T_PROV=theresponse[44];
		TranslatorIM.INLINEflip=theresponse[45];
		TranslatorIM.SL_ALL_PROVIDERS_IT=theresponse[46];
		TranslatorIM.THEMEmode=theresponse[47];
		TranslatorIM.Delay=theresponse[48];
                TranslatorIM.SL_BBL_locer();

		//BBL SESSION PARAMS
		TranslatorIM.SL_langSrc_bbl2=theresponse[49];
		TranslatorIM.SL_langDst_bbl2=theresponse[50];
		TranslatorIM.SL_OnOff_BTN2=theresponse[51];
		TranslatorIM.SL_Fontsize_bbl2=theresponse[52];

	        	TranslatorIM.SL_langSrc=TranslatorIM.SL_langSrc_bbl2;
		        TranslatorIM.SL_langDst=TranslatorIM.SL_langDst_bbl2;
			if(TranslatorIM.SL_Fontsize_bbl2 != undefined)	TranslatorIM.SL_Fontsize_bbl=TranslatorIM.SL_Fontsize_bbl2;
			else TranslatorIM.SL_Fontsize_bbl=TranslatorIM.SL_Fontsize_bbl;
			TranslatorIM.SL_bbl_loc_langs=theresponse[53];
			if(TranslatorIM.SL_bbl_loc_langs=="true") TranslatorIM.SL_TMPbox="true";
			else TranslatorIM.SL_TMPbox="false";
			TranslatorIM.SL_OnOff_BTN = TranslatorIM.SL_OnOff_BTN2;


		//IT CHANGE LANG

		TranslatorIM.SL_change_lang_HKbox_it=theresponse[54];
		TranslatorIM.SL_change_lang_HK_it=theresponse[55];
		TranslatorIM.SL_langDst_it=theresponse[56];
		TranslatorIM.SL_pin_bbl2=theresponse[57];
		if(TranslatorIM.SL_pin_bbl2=="true") TranslatorIM.SL_NEST="FLOAT";
		else TranslatorIM.SL_NEST="TOP";

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
//		TranslatorIM.SL_pin_bbl2=theresponse[57];
		TranslatorIM.SL_LNG_LIST = TranslatorIM.CUSTOM_LANGS(FExtension.element(TranslatorIM.SL_LOC,'extLanguages'));
		TranslatorIM.LISTofPR = TranslatorIM.SL_ALL_PROVIDERS_BBL.split(",");
     
		TranslatorIM.BaseGTK = theresponse[58];
		TranslatorIM.SL_GAPI1 = theresponse[59];
		TranslatorIM.SL_GAPI1ts = theresponse[60];
		TranslatorIM.SL_GAPI2 = theresponse[61];
		TranslatorIM.SL_GAPI2ts = theresponse[62];
		TranslatorIM.SL_YKEY = theresponse[63];

//BBL BOX Offset: X / Y
		TranslatorIM.MoveBBLX=parseInt(theresponse[64]);
		TranslatorIM.MoveBBLY=parseInt(theresponse[65]);
//BBL BOX Offset: X / Y
                                             
		TranslatorIM.SL_FAV_START=theresponse[66];
		TranslatorIM.SL_FAV_MAX=theresponse[67];
		TranslatorIM.SL_FAV_LANGS_BBL=theresponse[68];
		TranslatorIM.SL_FAV_LANGS_IT=theresponse[69];


		TranslatorIM.SL_UNTRUST=theresponse[70];
		if(TranslatorIM.SL_UNTRUST.indexOf(":") !=-1){
			var tmp = TranslatorIM.SL_UNTRUST.split(":");
	                TranslatorIM.SL_UNTRUST_WORD=tmp[0];
	                TranslatorIM.SL_UNTRUST_TEXT=tmp[1];
		}

             }
         });
       }

}




if(FExtension.browser.isLocalStoragePreset()){
	ImTranslatorDataEvent.init();
}else{
	var appcontent = window.document.getElementById("appcontent");
	appcontent.addEventListener("DOMContentLoaded", function(){
		ImTranslatorDataEvent.init();
	}, false);
}