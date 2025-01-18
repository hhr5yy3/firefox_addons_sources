try{
FExtension.store = {
    SL_BR_LN: "en",
    SL_PR_ALL: "Google,Microsoft,Translator,Yandex",
    SL_PR_KEYS: "Google:1,Microsoft:0,Translator:0,Yandex:0",
    SL_PR_IT: "Google,Microsoft,Yandex",

    SL_BR_LONG_LN: "English",
    profile_Folder: "ImTranslator",
    cl_Profile_Name: "profile.imt",
    global_pref_data: {},

    domStorageManager: null,
    domStorageUri: null,
    ioService: null,
    scriptSecManager: null,
    scriptSecPrincipal: null,
    localStorage: (FExtension.browser.isLocalStoragePreset()) ? localStorage : null,
    cachedSbDomainName: (FExtension.browser.isLocalStoragePreset()) ? "imtranslator.net" : null,
    initialized: FExtension.browser.isLocalStoragePreset(),
    getLocalStorage: function() {	                                     
        if (FExtension.browser.isLocalStoragePreset() || FExtension.store.initialized){	    
            return FExtension.store.localStorage;
        }        
    },

    SL_CUR_LANG: function(){

		var BRloc=chrome.i18n.getUILanguage().substr(0,2);
		if(BRloc!=""){
		   var BRlanguage="en"
		   var Arr = LISTofPRpairs[0].split(",")
		   for(var I=0; I<Arr.length; I++){
	        	var lng = Arr[I].replace("zh-TW","zh");
		        lng = lng.replace("zh-CN","zh");
		   	if(BRloc==lng){
			  BRlanguage=lng;
			  break;
			}
		   }
		}
	 return(BRlanguage);	
    },



    set : function(key, value){              // Storing key function
        var obj = false;
        if (typeof(value) == 'object'){
            value = JSON.stringify(value);
            obj = true;
        }
        FExtension.store.getLocalStorage().setItem(key, obj ? 'obj_'+value : value+'');
    },
    get : function(key){                  // Retrieving key function
        //var val = localStorage[key];
        var val = null;
        val = FExtension.store.getLocalStorage().getItem(key);

        if (val && val.indexOf('obj_') == 0){
            val = val.slice(4,val.length);
            val = JSON.parse(val);
        }
        return val;
    },
    clearKey : function(key,removing){
        if (removing) {
            FExtension.store.getLocalStorage().removeItem(key);
            return;
        }
        if (FExtension.store.getLocalStorage()) { //localStorage){
            FExtension.store.getLocalStorage().setItem(FExtension.config.keyPrefix + key, '');
        }
    },
    getValueByIndex: function(name, i, data, result){
        if(data[i].indexOf(name + ":")!=-1){
            var data_array = data[i].split(":");
            result[name] = data_array[1];
        }
        return result;
    },

    loadNewParams: function(){
	 FExtension.store.setDefault();
    },

    ResetToDefault: function(){
	 FExtension.store.setDefault();
    },


    setDefault: function(){
	FExtension.store.SL_BR_LN = FExtension.store.SL_CUR_LANG();
	for(var i=0; i<PACK_PARAMS.length; i++){
           if(PACK_PARAMS[i]!="undefined"){
		var tmp = PACK_PARAMS[i].split(";");
		var curDBname = tmp[0];
		var curDBparam = tmp[1];
		var DBparam = FExtension.store.get(curDBname);

	        if(DBparam == null || DBparam == ""){
			//EXCEPTIONS
			if(curDBname == "SL_change_lang_HK_it"){
				FExtension.store.set(curDBname, curDBparam);
//			        chrome.storage.local.set({curDBname, curDBparam});
				FExtension.store.set("SL_change_lang_HKbox_it", "true");
//			        chrome.storage.local.set({'SL_change_lang_HKbox_it', 'true'});
			}
			//NONE validator
			if(curDBname != "SL_HK_gt1" && curDBname != "SL_HK_it1" && curDBname != "SL_HK_bb1"){
				FExtension.store.set(curDBname, curDBparam);
//			        chrome.storage.local.set({curDBname, curDBparam});
			}
			//EXCEPTIONS
		}
                if(curDBname == "SL_LOCALIZATION"){
			if(DBparam == null) ImTranslatorBG.LOC_TABLE();
		}


		
                if(curDBname.indexOf("SL_ALL_PROVIDERS_")!=-1){
			var pr = FExtension.store.get(curDBname);
			pr = FExtension.store.FIX_PROVIDERS(pr);
			FExtension.store.set(curDBname, pr);
		}

	    }
	}
	FExtension.store.NONE_validator();
	FExtension.store.DETECT_CONFLICTS_LAST_STAGE(GLOB_PREF);
    },

    NONE_validator: function(){
        var out = 0;
	if(FExtension.store.get("SL_HK_gt1")==null || FExtension.store.get("SL_HK_gt1")=="") out++;
	if(FExtension.store.get("SL_HK_it1")==null || FExtension.store.get("SL_HK_it1")=="") out++;
	if(FExtension.store.get("SL_HK_bb1")==null || FExtension.store.get("SL_HK_bb1")=="") out++;
	if(out>1){
		var gt1 = PACK_PARAMS[58].split(";")
		FExtension.store.set("SL_HK_gt1",gt1[1]);
		chrome.storage.local.set({'SL_HK_gt1': gt1[1]});
		var it1 = PACK_PARAMS[60].split(";")
		FExtension.store.set("SL_HK_it1",it1[1]);
		chrome.storage.local.set({'SL_HK_it1': it1[1]});
		var bb1 = PACK_PARAMS[62].split(";")
		FExtension.store.set("SL_HK_bb1",bb1[1]);
		chrome.storage.local.set({'SL_HK_bb1': bb1[1]});
	}
    },

    DETECT_CONFLICTS_LAST_STAGE: function(PREF){
	var HKnames = reservedHK.split(",");
	var NEWarrayHK = new Array();
	for(var i=0; i < HKnames.length; i++){
		NEWarrayHK[i] = FExtension.store.get(PREF+HKnames[i]);
	}
	NEWarrayHK.forEach(function (value, index, arr){
        	let first_index = arr.indexOf(value);
	        let last_index = arr.lastIndexOf(value);
        	if(first_index !== last_index){
        	    if(value!="") {
			var defPar = FExtension.store.GetFromDefault(PREF+HKnames[index]);
			FExtension.store.set(PREF+HKnames[index], defPar);
//			chrome.storage.local.set({PREF+HKnames[index]: defPar});
		    }
        	}
	});

    },

    GetFromDefault: function(name){
	for(var i=0; i<PACK_PARAMS.length; i++){
		var tmp = PACK_PARAMS[i].split(";");
		var curDBname = tmp[0];
		var curDBparam = tmp[1];
		var DBparam = FExtension.store.get(curDBname);
	        if(curDBname == name) return curDBparam;
  	}
    },


    save_LOC4CONTEXT: function(){
          var tmp = FExtension.element(FExtension.GET_localStorage('SL_LOCALIZATION'),'extLanguages').split(",")
	  var bbl = FExtension.GET_localStorage("SL_langDst_bbl");
	  var it = FExtension.GET_localStorage("SL_langDst_it");
	  var wpt = FExtension.GET_localStorage("SL_langDst_wpt");
	  var gt = FExtension.GET_localStorage("SL_langDst");
	  var tr = FExtension.GET_localStorage("SL_langDst_tr");
	  var tmp2;
	  for (var i=0; i<tmp.length; i++){
	      tmp2 = tmp[i].split(":");
	      if(tmp2[0]==bbl){
		FExtension.store.set("SL_langDst_name_bbl", tmp2[1]);
		chrome.storage.local.set({'SL_langDst_name_bbl': tmp2[1]});
	      }
	      if(tmp2[0]==it){
		FExtension.store.set("SL_langDst_name_it", tmp2[1]);
		chrome.storage.local.set({'SL_langDst_name_it': tmp2[1]});
	      }
	      if(tmp2[0]==wpt){
		FExtension.store.set("SL_langDst_name_wpt", tmp2[1]);
		chrome.storage.local.set({'SL_langDst_name_wpt': tmp2[1]});
	      }
	      if(tmp2[0]==gt){
		FExtension.store.set("SL_langDst_name", tmp2[1]);
		chrome.storage.local.set({'SL_langDst_name': tmp2[1]});
	      }	
	      if(tmp2[0]==tr){
		FExtension.store.set("SL_langDst_name_tr", tmp2[1]);
		chrome.storage.local.set({'SL_langDst_name_tr': tmp2[1]});
	      }	

	  }
    },

    getUPDATES:  function(){
	    var LIST_PR_BBL = FExtension.store.SL_PR_ALL;

	    if(FExtension.store.get("SL_ALL_PROVIDERS_BBL")==null) {
		FExtension.store.set("SL_ALL_PROVIDERS_BBL", LIST_PR_BBL);
	    } else {
	            var BBL = FExtension.store.VerifyProviders(FExtension.store.get("SL_ALL_PROVIDERS_BBL"), LIST_PR_BBL);
		    if(BBL == "") BBL = LIST_PR_BBL; 
		    FExtension.store.set("SL_ALL_PROVIDERS_BBL", BBL);
	    }

	    var LIST_PR_GT = FExtension.store.SL_PR_ALL;
	    if(FExtension.store.get("SL_ALL_PROVIDERS_GT")==null) {
		FExtension.store.set("SL_ALL_PROVIDERS_GT", LIST_PR_GT);
	    } else {
	            var GT = FExtension.store.VerifyProviders(FExtension.store.get("SL_ALL_PROVIDERS_GT"),LIST_PR_GT);
		    if(GT == "") GT = LIST_PR_GT; 
		    FExtension.store.set("SL_ALL_PROVIDERS_GT", GT);
	    }

	    var LIST_PR_IT = FExtension.store.SL_PR_IT;
	    if(FExtension.store.get("SL_ALL_PROVIDERS_IT")==null) {
		FExtension.store.set("SL_ALL_PROVIDERS_IT", LIST_PR_IT);
	    } else {
	            var IT = FExtension.store.VerifyProviders(FExtension.store.get("SL_ALL_PROVIDERS_IT"),LIST_PR_IT);
		    if(IT == "") IT = LIST_PR_IT; 
		    FExtension.store.set("SL_ALL_PROVIDERS_IT", IT);
	    }
    },

    SL_isMacintosh: function() {
	  return navigator.platform.indexOf('Mac') > -1;
    },

    SL_isLinux: function() {
        var OSName = false;
	if (navigator.appVersion.indexOf("X11")!=-1) OSName=true;
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName=true;
	return OSName;
    },


    VerifyProviders: function(oldLIST,newLIST) {
	var out = "";
	var oldST = oldLIST.split(",");
	var newST = newLIST.split(",");
 	if(oldST.length>=newST.length){
		for(var i=0; i<oldST.length;i++){
			for(var j=0; j<newST.length;j++){
				if(oldST[i]==newST[j]) out=out+oldST[i]+",";
			}
		}	
		out = out.substring(0,out.length-1);
	} else {
		for(var i=0; i<oldST.length;i++){
		        if(newLIST.indexOf(oldST[i])!=-1) newLIST = newLIST.replace(oldST[i],"");
		}	
		newLIST = newLIST.replace(/,/g," ");
		newLIST = newLIST.replace(/\s\s+/g, '');
		out = oldLIST +","+ newLIST;
	}
        out = FExtension.store.FIX_PROVIDERS(out);        
	return out;
    },

    FIX_PROVIDERS(pr){
	pr = pr.replace(/,undefined/g,"");
	pr = pr.replace(/undefined,/g,"");
	return pr;
    }	

};
}catch(ex){
//	FExtension.alert_debug(ex);
}