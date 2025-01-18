function SL_LANGS(){
		if(GEBI('autohotkeys')){
		  var frame = GEBI('autohotkeys');
		  if(frame)	frame.parentNode.removeChild(frame);
		}
		const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
		var H = "1530px";
		var LOC = FExtension.store.get("SL_LOCALIZATION");
		if(LOC=="zh" || LOC=="zt" || LOC=="ko") H = "1570px";
		if(LOC=="ja") H = "1600px";
		if(LOC=="hi") H = "1570px";
		if(isMacBrowser==true){
			var LOC = FExtension.store.get("SL_LOCALIZATION");
			if(LOC=="zh" || LOC=="zt" || LOC=="ko" || LOC=="ja") H = "1590px";
		}

		if(!GEBI("autohotkeys")){
		    var die = document.createElement("iframe");
		    die.src = "languages.html";
		    die.name = "autohotkeys";
		    die.id="autohotkeys";
		    die.width="750px";
		    die.height=H;
		    die.scrolling="no";
                    die.background="#eee";
		    die.frameBorder="0";
		    GEBI('SL_AUTOKEYS').style.display='block';
		    GEBI('SL_AUTOKEYS').style.width='750px';
		    GEBI('SL_AUTOKEYS').style.height=H;
		    GEBI('SL_AUTOKEYS').appendChild(die);
		}
}

function CUSTOM_LANGS(list){
        list = list.replace(/&#160;/ig," ");
        var list2 = FExtension.store.get("SL_LNG_LIST");
	if(list2=="all") return LANGS_FILTER(list);
	else{
	    var OUT = "";
	    var L1 = list.split(",");
	    for(var i=0; i<L1.length; i++){
	     	var L1base = L1[i].split(":");
	     	var L1short = list2.split(",");
		for(var j=0; j<L1short.length; j++){
		   if(L1base[0] == L1short[j]) OUT=OUT+L1short[j]+":"+L1base[1]+",";
		}
	    }
 	    OUT = OUT.substring(0,OUT.length-1);
	    OUT=LANGS_FILTER(OUT)
	    return OUT;
	}
}

function CUSTOM_LANGS_RESET_TO_DEFAULT(list){
	var OUT = "";
        list = list.replace(/&#160;/ig," ");
        list = list.replace(/all,/ig,"all");
        list = list.split(",");
	var list2 = FExtension.element(FExtension.store.get("SL_LOCALIZATION"),'extLanguages');
	if(list!="all"){

	    	var L1 = list2.split(",");
		for(var i=0; i<L1.length; i++){
	     		var L2 = L1[i].split(":");
			for(var j=0; j<list.length; j++){		
			   if(L2[0] == list[j]) OUT=OUT+list[j]+":"+L2[1]+",";
			}
		    }
 		    OUT = OUT.substring(0,OUT.length-1);
		    OUT=LANGS_FILTER(OUT);
	} else  OUT = LANGS_FILTER(list2);
        return OUT;
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


function RESET_TEMPS_TO_DEFAULT(){
	   	   //Reset BBL temps
		   FExtension.store.set("BL_D_PROV", "");
		   FExtension.store.set("BL_T_PROV", "");
		   FExtension.store.set("SL_BBL_X", 0);
		   FExtension.store.set("SL_BBL_Y", 0);
	   	   FExtension.store.set("SL_langSrc_bbl2",FExtension.store.get("SL_langSrc_bbl"));
	   	   FExtension.store.set("SL_langDst_bbl2",FExtension.store.get("SL_langDst_bbl"));
	   	   FExtension.store.set("SL_Fontsize_bbl2",FExtension.store.get("SL_Fontsize_bbl"));

	   	   FExtension.store.set("SL_pin_bbl2",FExtension.store.get("SL_pin_bbl"));
	   	   FExtension.store.set("SL_show_button_bbl2",FExtension.store.get("SL_show_button_bbl"));
	   	   if(FExtension.store.get("SL_no_detect_bbl")=="true")   FExtension.store.set("SL_bbl_loc_langs","false");
	   	   else    FExtension.store.set("SL_bbl_loc_langs","true");

	  	   //Reset IT temps
	   	   FExtension.store.set("SL_langDst_it2",FExtension.store.get("SL_langDst_it"));
}
