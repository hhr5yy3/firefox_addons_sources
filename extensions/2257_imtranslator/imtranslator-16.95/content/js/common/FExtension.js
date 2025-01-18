var PLATFORM = "Chrome";
var GLOB_PREF = "SL";
var GLOB_CNTR = 1;


//var PLATFORM = "Opera";
//var GLOB_PREF = "SLO";

var EXPORT_EXT = "";
//for GT only
//var EXPORT_EXT = " GT";
//var GLOB_PREF = "SLG";

//var SL_GEO = new Array ("com","es","de","it","fr","ru","pl");
var SL_GEO = new Array ("com");

var DET = 0;
// 0 - G
// 1 - SL

var _TP = "ff-ImTranslator"
var _FOLDER = "extensions";
var _CGI = "/"+_FOLDER+"/?tp="+_TP;

var reservedHK = "_HK_bb1,_HK_bb2,_HK_btn,_HK_gt1,_HK_gt2,_HK_it1,_HK_it2,_HK_opt,_HK_wpt1,_HK_wpt2,_change_lang_HK_it,_tr_hk";

var SL_TTS = "en,es,ru,de,pt,fr,it,ko,ja,zh-CN,zh-TW,en-gb,fr-CA,lzh,yue,pt-PT";             
var G_TTS = "ar,cs,da,nl,fi,el,hi,hu,no,pl,sk,sv,th,tr,la,bn,id,km,uk,vi";
    G_TTS = G_TTS+","+SL_TTS;

var LISTofPRpairsDefault=",af,ak,am,ar,as,ay,az,ba,be,bg,bho,bm,bn,bo,bs,ca,ceb,ckb,co,cs,cv,cy,da,de,doi,dsb,dv,ee,el,emj,en,en-gb,eo,es,et,eu,fa,fi,fj,fo,fr,fr-CA,fy,ga,gd,gl,gn,gom,gu,ha,haw,hi,hmn,hr,hsb,ht,hu,hy,id,ig,ikt,ilo,is,it,iu,iu-Latn,iw,ja,jw,ka,kazlat,kk,km,kn,ko,kri,ku,ky,la,lb,lg,ln,lo,lt,lug,lus,lv,lzh,mai,mg,mhr,mi,mk,ml,mn,mni-Mtei,mn-Mong,mr,mrj,ms,mt,my,ne,nl,no,nso,ny,nya,om,or,otq,pa,pap,pl,prs,ps,pt,pt-PT,qu,ro,ru,run,rw,sa,sah,sd,si,sk,sl,sm,sn,so,sq,sr,sr-Latn,srsl,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tlh-Latn,tlsl,tn,to,tr,ts,tt,ty,udm,ug,uk,ur,uz,uzbcyr,vi,xh,yi,yo,yua,yue,zh-CN,zh-TW,zu";
var LISTofPR = new Array ("Google","Microsoft","Translator","Yandex");
var LISTofLANGsets = new Array (",af,ak,am,ar,as,ay,az,be,bg,bho,bm,bn,bs,ca,ceb,ckb,co,cs,cy,da,de,doi,dv,ee,el,en,eo,es,et,eu,fa,fi,fr,fy,ga,gd,gl,gn,gom,gu,ha,haw,hi,hmn,hr,ht,hu,hy,id,ig,ilo,is,it,iw,ja,jw,ka,kk,km,kn,ko,kri,ku,ky,la,lb,lg,ln,lo,lt,lus,lv,mai,mg,mi,mk,ml,mn,mni-Mtei,mr,ms,mt,my,ne,nl,no,nso,ny,om,or,pa,pl,ps,pt,pt-PT,qu,ro,ru,rw,sa,sd,si,sk,sl,sm,sn,so,sq,sr,srsl,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tlsl,tr,ts,tt,ug,uk,ur,uz,vi,xh,yi,yo,zh-CN,zh-TW,zu",",af,am,ar,as,az,ba,bg,bn,bo,bs,ca,ckb,cs,cy,da,de,dsb,dv,el,en,en-gb,es,et,eu,fa,fi,fj,fo,fr,fr-CA,ga,gl,gom,gu,ha,hi,hmn,hr,hsb,ht,hu,hy,id,ig,ikt,is,it,iu,iu-Latn,iw,ja,ka,kk,km,kn,ko,ku,ky,ln,lo,lt,lug,lv,lzh,mai,mg,mi,mk,ml,mn,mn-Mong,mr,ms,mt,my,ne,nl,no,nso,nya,or,otq,pa,pl,prs,ps,pt,pt-PT,ro,ru,run,rw,sd,si,sk,sl,sm,sn,so,sq,sr,sr-Latn,srsl,st,sv,sw,ta,te,th,ti,tk,tl,tlh-Latn,tlsl,tn,to,tr,tt,ty,ug,uk,ur,uz,vi,xh,yo,yua,yue,zh-CN,zh-TW,zu","en/fr,en/de,en/pt,en/ru,en/es,fr/en,fr/ru,fr/es,de/en,de/ru,pt/en,ru/en,ru/fr,ru/de,ru/es,es/en,es/fr,es/ru",",af,am,ar,az,ba,be,bg,bn,bs,ca,ceb,cs,cv,cy,da,de,el,emj,en,eo,es,et,eu,fa,fi,fr,ga,gd,gl,gu,hi,hr,ht,hu,hy,id,is,it,iw,ja,jv,ka,kazlat,kk,km,kn,ko,ky,la,lb,lo,lt,lv,mg,mhr,mi,mk,ml,mn,mr,mrj,ms,mt,my,ne,nl,no,pa,pap,pl,pt,ro,ru,sah,si,sk,sl,sq,sr,sr-Latn,srsl,su,sv,sw,ta,te,tg,th,tl,tlsl,tr,tt,udm,uk,ur,uz,uzbcyr,vi,xh,yi,zh-CN,zu");


var PACK_PARAMS = new Array();

var LISTofPRpairs = new Array ();
for (var SL_I = 0 ; SL_I < LISTofPR.length; SL_I++){
    switch(LISTofPR[SL_I]){
	case "Google": LISTofPRpairs[SL_I]=LISTofLANGsets[0];break;
	case "Microsoft": LISTofPRpairs[SL_I]=LISTofLANGsets[1];break;
	case "Translator": LISTofPRpairs[SL_I]=LISTofLANGsets[2];break;
	case "Yandex": LISTofPRpairs[SL_I]=LISTofLANGsets[3];break;
    }	
}

var DO_NOT_TRUST_WORD = "be,bg,mk,sr,kk,mn,tg";
var DO_NOT_TRUST_TEXT = "zh";

var ImTranslator_theurl = "https://imtranslator.net/";

var FExtension = {
	config: {
		debugIsEnabled: true
	},

	extend: function(parentPrototype, child) {
		function CloneInternal(){};
		CloneInternal.prototype = parentPrototype;
		child.prototype.constructor = child;
		return new CloneInternal();
	},

	element: function(loc,msg){
                return SL_SETBROWSERLOC(msg,loc);
	},

	AddHtmlToObj: function(obj,tag,htm){
	      var container = GEBI(obj);
		while (container.firstChild) {
		  container.removeChild(container.firstChild);
		}
	      var eUL = document.createElement(tag);
	      var st = document.createAttribute("src");
	      st.value = htm;
	      eUL.setAttributeNode(st);
      	container.appendChild(eUL); 
	},

	GET_localStorage: function(name){
		var value = localStorage[name];
		if(value == undefined || value == null){
			FExtension.LoadBackUp();
		}else return value;
	},

	LoadBackUp: function (){		
	        var key0 = 'SL_session';
		chrome.storage.local.get(key0,function(result){
	          var SL_res = result[key0];
        	  if(SL_res != undefined) localStorage[key0] = SL_res;
	          else localStorage[key0] = "0";
		});
	        var key1 = 'SL_Version';
		chrome.storage.local.get(key1,function(result){
	          var SL_res = result[key1];
		  var gettingInfo = browser.runtime.getBrowserInfo()
        	  if(SL_res != undefined) localStorage[key1] = SL_res;
	          else localStorage[key1] = gettingInfo.version;
		});
	        var key2 = 'ADV';
		chrome.storage.local.get(key2,function(result){
	          var SL_res = result[key2];
        	  if(SL_res != undefined) localStorage[key2] = SL_res;
	          else localStorage[key2] = "0";
		});
	        var key3 = 'FRUN';
		chrome.storage.local.get(key3,function(result){
	          var SL_res = result[key3];
        	  if(SL_res != undefined) localStorage[key3] = SL_res;
	          else localStorage[key3] = "0";
		});
	        var key4 = 'ran_before';
		chrome.storage.local.get(key4,function(result){
	          var SL_res = result[key4];
        	  if(SL_res != undefined) localStorage[key4] = SL_res;
	          else localStorage[key4] = "0";
		});
	        var key5 = 'SL_History';
		chrome.storage.local.get(key5,function(result){
	          var SL_res = result[key5];
        	  if(SL_res != undefined) localStorage[key5] = SL_res;
	          else localStorage[key5] = "";
		});
	        var key6 = 'SL_TH_1';
		chrome.storage.local.get(key6,function(result){
	          var SL_res = result[key6];
        	  if(SL_res != undefined) localStorage[key6] = SL_res;
	          else localStorage[key6] = "0";
		});
	        var key7 = 'SL_TH_2';
		chrome.storage.local.get(key7,function(result){
	          var SL_res = result[key7];
        	  if(SL_res != undefined) localStorage[key7] = SL_res;
	          else localStorage[key7] = "0";
		});		
	        var key8 = 'SL_TH_3';
		chrome.storage.local.get(key8,function(result){
	          var SL_res = result[key8];
        	  if(SL_res != undefined) localStorage[key8] = SL_res;
	          else localStorage[key8] = "0";
		});
	        var key9 = 'SL_TH_4';
		chrome.storage.local.get(key9,function(result){
	          var SL_res = result[key9];
        	  if(SL_res != undefined) localStorage[key9] = SL_res;
	          else localStorage[key9] = "0";
		});		
	        var key10 = 'SL_global_lng';
		chrome.storage.local.get(key10,function(result){
	          var SL_res = result[key10];
        	  if(SL_res != undefined) localStorage[key10] = SL_res;
	          else localStorage[key10] = "true";
		});
	        var key11 = 'SL_Fontsize';
		chrome.storage.local.get(key11,function(result){
	          var SL_res = result[key11];
        	  if(SL_res != undefined) localStorage[key11] = SL_res;
	          else localStorage[key11] = "17px";
		});
	        var key12 = 'SL_langSrc';
		chrome.storage.local.get(key12,function(result){
	          var SL_res = result[key12];
        	  if(SL_res != undefined) localStorage[key12] = SL_res;
	          else localStorage[key12] = "auto";
		});
	        var key13 = 'SL_langDst';
		chrome.storage.local.get(key13,function(result){
	          var SL_res = result[key13];
        	  if(SL_res != undefined) localStorage[key13] = SL_res;
	          else localStorage[key13] = FExtension.store.SL_BR_LN;
		});
	        var key14 = 'SL_no_detect';
		chrome.storage.local.get(key14,function(result){
	          var SL_res = result[key14];
        	  if(SL_res != undefined) localStorage[key14] = SL_res;
	          else localStorage[key14] = "true";
		});
	        var key15 = 'SL_other_gt';
		chrome.storage.local.get(key15,function(result){
	          var SL_res = result[key15];
        	  if(SL_res != undefined) localStorage[key15] = SL_res;
	          else localStorage[key15] = "1";
		});		
	        var key16 = 'SL_dict';
		chrome.storage.local.get(key16,function(result){
	          var SL_res = result[key16];
        	  if(SL_res != undefined) localStorage[key16] = SL_res;
	          else localStorage[key16] = "true";
		});
	        var key17 = 'SL_show_back';
		chrome.storage.local.get(key17,function(result){
	          var SL_res = result[key17];
        	  if(SL_res != undefined) localStorage[key17] = SL_res;
	          else localStorage[key17] = "false";
		});
	        var key18 = 'SL_show_back2';
		chrome.storage.local.get(key18,function(result){
	          var SL_res = result[key18];
        	  if(SL_res != undefined) localStorage[key18] = SL_res;
	          else localStorage[key18] = "false";
		});
	        var key19 = 'SL_HKset';
		chrome.storage.local.get(key19,function(result){
	          var SL_res = result[key19];
        	  if(SL_res != undefined) localStorage[key19] = SL_res;
	          else localStorage[key19] = "3|90|true";
		});
	        var key20 = 'SL_HKset_inv';
		chrome.storage.local.get(key20,function(result){
	          var SL_res = result[key20];
        	  if(SL_res != undefined) localStorage[key20] = SL_res;
	          else localStorage[key20] = "3|90|true";
		});
	        var key21 = 'SL_langDst_name';
		chrome.storage.local.get(key21,function(result){
	          var SL_res = result[key21];
        	  if(SL_res != undefined) localStorage[key21] = SL_res;
	          else localStorage[key21] = "Spanish";
		});
	        var key22 = 'SL_Flag';
		chrome.storage.local.get(key22,function(result){
	          var SL_res = result[key22];
        	  if(SL_res != undefined) localStorage[key22] = SL_res;
	          else localStorage[key22] = "FALSE";
		});		
	        var key23 = 'SL_ENABLE';
		chrome.storage.local.get(key23,function(result){
	          var SL_res = result[key23];
        	  if(SL_res != undefined) localStorage[key23] = SL_res;
	          else localStorage[key23] = "true";
		});
	        var key24 = 'SL_show_button_bbl';
		chrome.storage.local.get(key24,function(result){
	          var SL_res = result[key24];
        	  if(SL_res != undefined) localStorage[key24] = SL_res;
	          else localStorage[key24] = "true";
		});
	        var key25 = 'SL_global_lng_bbl';
		chrome.storage.local.get(key25,function(result){
	          var SL_res = result[key25];
        	  if(SL_res != undefined) localStorage[key25] = SL_res;
	          else localStorage[key25] = "true";
		});

	        var key26 = 'SL_Fontsize_bbl';
		chrome.storage.local.get(key26,function(result){
	          var SL_res = result[key26];
        	  if(SL_res != undefined) localStorage[key26] = SL_res;
	          else localStorage[key26] = "14px";
		});
	        var key27 = 'SL_langSrc_bbl';
		chrome.storage.local.get(key27,function(result){
	          var SL_res = result[key27];
        	  if(SL_res != undefined) localStorage[key27] = SL_res;
	          else localStorage[key27] = "auto";
		});
	        var key28 = 'SL_langDst_bbl';
		chrome.storage.local.get(key28,function(result){
	          var SL_res = result[key28];
        	  if(SL_res != undefined) localStorage[key28] = SL_res;
	          else localStorage[key28] = FExtension.store.SL_BR_LN;
		});
	        var key29 = 'SL_no_detect_bbl';
		chrome.storage.local.get(key29,function(result){
	          var SL_res = result[key29];
        	  if(SL_res != undefined) localStorage[key29] = SL_res;
	          else localStorage[key29] = "true";
		});		
	        var key30 = 'SL_other_bbl';
		chrome.storage.local.get(key30,function(result){
	          var SL_res = result[key30];
        	  if(SL_res != undefined) localStorage[key30] = SL_res;
	          else localStorage[key30] = "1";
		});
	        var key31 = 'SL_dict_bbl';
		chrome.storage.local.get(key31,function(result){
	          var SL_res = result[key31];
        	  if(SL_res != undefined) localStorage[key31] = SL_res;
	          else localStorage[key31] = "true";
		});		
	        var key32 = 'SL_translation_mos_bbl';
		chrome.storage.local.get(key32,function(result){
	          var SL_res = result[key32];
        	  if(SL_res != undefined) localStorage[key32] = SL_res;
	          else localStorage[key32] = "true";
		});
	        var key33 = 'SL_pin_bbl';
		chrome.storage.local.get(key33,function(result){
	          var SL_res = result[key33];
        	  if(SL_res != undefined) localStorage[key33] = SL_res;
	          else localStorage[key33] = "false";
		});
	        var key34 = 'SL_langDst_name_bbl';
		chrome.storage.local.get(key34,function(result){
	          var SL_res = result[key34];
        	  if(SL_res != undefined) localStorage[key34] = SL_res;
	          else localStorage[key34] = "Spanish";
		});
	        var key35 = 'SL_DBL_bbl';
		chrome.storage.local.get(key35,function(result){
	          var SL_res = result[key35];
        	  if(SL_res != undefined) localStorage[key35] = SL_res;
	          else localStorage[key35] = "false";
		});
	        var key36 = 'SL_Timing';
		chrome.storage.local.get(key36,function(result){
	          var SL_res = result[key36];
        	  if(SL_res != undefined) localStorage[key36] = SL_res;
	          else localStorage[key36] = "3";
		});
	        var key37 = 'SL_Delay';
		chrome.storage.local.get(key37,function(result){
	          var SL_res = result[key37];
        	  if(SL_res != undefined) localStorage[key37] = SL_res;
	          else localStorage[key37] = "0";
		});
	        var key38 = 'SL_langSrc_it';
		chrome.storage.local.get(key38,function(result){
	          var SL_res = result[key38];
        	  if(SL_res != undefined) localStorage[key38] = SL_res;
	          else localStorage[key38] = "auto";
		});
	        var key39 = 'SL_langDst_it';
		chrome.storage.local.get(key39,function(result){
	          var SL_res = result[key39];
        	  if(SL_res != undefined) localStorage[key39] = SL_res;
	          else localStorage[key39] = FExtension.store.SL_BR_LN;
		});
	        var key40 = 'SL_global_lng_it';
		chrome.storage.local.get(key40,function(result){
	          var SL_res = result[key40];
        	  if(SL_res != undefined) localStorage[key40] = SL_res;
	          else localStorage[key40] = "true";
		});
	        var key41 = 'SL_style';
		chrome.storage.local.get(key41,function(result){
	          var SL_res = result[key41];
        	  if(SL_res != undefined) localStorage[key41] = SL_res;
	          else localStorage[key41] = "239e23";
		});
	        var key42 = 'SL_inject_brackets';
		chrome.storage.local.get(key42,function(result){
	          var SL_res = result[key42];
        	  if(SL_res != undefined) localStorage[key42] = SL_res;
	          else localStorage[key42] = "true";
		});
	        var key43 = 'SL_inject_before';
		chrome.storage.local.get(key43,function(result){
	          var SL_res = result[key43];
        	  if(SL_res != undefined) localStorage[key43] = SL_res;
	          else localStorage[key43] = "false";
		});
	        var key44 = 'SL_line_break';
		chrome.storage.local.get(key44,function(result){
	          var SL_res = result[key44];
        	  if(SL_res != undefined) localStorage[key44] = SL_res;
	          else localStorage[key44] = "false";
		});
	        var key45 = 'SL_whole_word';
		chrome.storage.local.get(key45,function(result){
	          var SL_res = result[key45];
        	  if(SL_res != undefined) localStorage[key45] = SL_res;
	          else localStorage[key45] = "true";
		});
	        var key46 = 'SL_hide_translation';
		chrome.storage.local.get(key46,function(result){
	          var SL_res = result[key46];
        	  if(SL_res != undefined) localStorage[key46] = SL_res;
	          else localStorage[key46] = "false";
		});
	        var key47 = 'SL_dictionary';
		chrome.storage.local.get(key47,function(result){
	          var SL_res = result[key47];
        	  if(SL_res != undefined) localStorage[key47] = SL_res;
	          else localStorage[key47] = "true";
		});
	        var key48 = 'SL_no_detect_it';
		chrome.storage.local.get(key48,function(result){
	          var SL_res = result[key48];
        	  if(SL_res != undefined) localStorage[key48] = SL_res;
	          else localStorage[key48] = "true";
		});
	        var key49 = 'SL_other_it';
		chrome.storage.local.get(key49,function(result){
	          var SL_res = result[key49];
        	  if(SL_res != undefined) localStorage[key49] = SL_res;
	          else localStorage[key49] = "1";
		});
	        var key50 = 'SL_langDst_name_it';
		chrome.storage.local.get(key50,function(result){
	          var SL_res = result[key50];
        	  if(SL_res != undefined) localStorage[key50] = SL_res;
	          else localStorage[key50] = "Spanish";
		});
	        var key51 = 'SL_FK_box1';
		chrome.storage.local.get(key51,function(result){
	          var SL_res = result[key51];
        	  if(SL_res != undefined) localStorage[key51] = SL_res;
	          else localStorage[key51] = "true";
		});
	        var key52 = 'SL_FK_box2';
		chrome.storage.local.get(key52,function(result){
	          var SL_res = result[key52];
        	  if(SL_res != undefined) localStorage[key52] = SL_res;
	          else localStorage[key52] = "true";
		});
	        var key53 = 'SL_global_lng_wpt';
		chrome.storage.local.get(key53,function(result){
	          var SL_res = result[key53];
        	  if(SL_res != undefined) localStorage[key53] = SL_res;
	          else localStorage[key53] = "true";
		});
	        var key54 = 'SL_langSrc_wpt';
		chrome.storage.local.get(key54,function(result){
	          var SL_res = result[key54];
        	  if(SL_res != undefined) localStorage[key54] = SL_res;
	          else localStorage[key54] = "auto";
		});		
	        var key55 = 'SL_langDst_wpt';
		chrome.storage.local.get(key55,function(result){
	          var SL_res = result[key55];
        	  if(SL_res != undefined) localStorage[key55] = SL_res;
	          else localStorage[key55] = FExtension.store.SL_BR_LN;
		});
	        var key56 = 'SL_other_wpt';
		chrome.storage.local.get(key56,function(result){
	          var SL_res = result[key56];
        	  if(SL_res != undefined) localStorage[key56] = SL_res;
	          else localStorage[key56] = "1";
		});
	        var key57 = 'SL_langDst_name_wpt';
		chrome.storage.local.get(key57,function(result){
	          var SL_res = result[key57];
        	  if(SL_res != undefined) localStorage[key57] = SL_res;
	          else localStorage[key57] = "Spanish";
		});
	        var key58 = 'SL_HK_gt1';
		chrome.storage.local.get(key58,function(result){
	          var SL_res = result[key58];
        	  if(SL_res != undefined) localStorage[key58] = SL_res;
	          else localStorage[key58] = "Ctrl + Alt + Z";
		});
	        var key59 = 'SL_HK_gt2';
		chrome.storage.local.get(key59,function(result){
	          var SL_res = result[key59];
        	  if(SL_res != undefined) localStorage[key59] = SL_res;
	          else localStorage[key59] = "Alt + Z";
		});
	        var key60 = 'SL_HK_it1';
		chrome.storage.local.get(key60,function(result){
	          var SL_res = result[key60];
        	  if(SL_res != undefined) localStorage[key60] = SL_res;
	          else {
			if(FExtension.store.SL_isLinux()==true)	localStorage[key60] = "Ctrl + Alt + C";
			else localStorage[key60] = "Alt + C";
		  }
		});
	        var key61 = 'SL_HK_it2';
		chrome.storage.local.get(key61,function(result){
	          var SL_res = result[key61];
        	  if(SL_res != undefined) localStorage[key61] = SL_res;
	          else {
			if(FExtension.store.SL_isLinux()==true)	localStorage[key61] = "Ctrl + Alt + X";
			else localStorage[key61] = "Alt + X";
		  }
		});
	        var key62 = 'SL_HK_bb1';
		chrome.storage.local.get(key62,function(result){
	          var SL_res = result[key62];
        	  if(SL_res != undefined) localStorage[key62] = SL_res;
	          else {
			if(FExtension.store.SL_isLinux()==true)	localStorage[key62] = "Ctrl + Alt";
			else localStorage[key62] = "Alt";
		  }
		});
	        var key63 = 'SL_HK_bb2';
		chrome.storage.local.get(key63,function(result){
	          var SL_res = result[key63];
        	  if(SL_res != undefined) localStorage[key63] = SL_res;
	          else localStorage[key63] = "Escape";
		});

	        var key64 = 'SL_HK_bb2box';
		chrome.storage.local.get(key64,function(result){
	          var SL_res = result[key64];
        	  if(SL_res != undefined) localStorage[key64] = SL_res;
	          else localStorage[key64] = "true";
		});
	        var key65 = 'SL_HK_wptbox1';
		chrome.storage.local.get(key65,function(result){
	          var SL_res = result[key65];
        	  if(SL_res != undefined) localStorage[key65] = SL_res;
	          else localStorage[key65] = "true";
		});
	        var key66 = 'SL_HK_wpt1';
		chrome.storage.local.get(key66,function(result){
	          var SL_res = result[key66];
        	  if(SL_res != undefined) localStorage[key66] = SL_res;
	          else {
			if(FExtension.store.SL_isLinux()==true)	localStorage[key66] = "Ctrl + Alt + P";
			else localStorage[key66] = "Alt + P";
		  }
		});
	        var key67 = 'SL_HK_wptbox2';
		chrome.storage.local.get(key67,function(result){
	          var SL_res = result[key67];
        	  if(SL_res != undefined) localStorage[key67] = SL_res;
	          else localStorage[key67] = "true";
		});
	        var key68 = 'SL_HK_wpt2';
		chrome.storage.local.get(key68,function(result){
	          var SL_res = result[key68];
        	  if(SL_res != undefined) localStorage[key68] = SL_res;
	          else {
			if(FExtension.store.SL_isLinux()==true)	localStorage[key68] = "Ctrl + Alt + M";
			else localStorage[key68] = "Alt + M";
		  }
		});
	        var key69 = 'SL_HK_optbox';
		chrome.storage.local.get(key69,function(result){
	          var SL_res = result[key69];
        	  if(SL_res != undefined) localStorage[key69] = SL_res;
	          else localStorage[key69] = "true";
		});		
	        var key70 = 'SL_HK_opt';
		chrome.storage.local.get(key70,function(result){
	          var SL_res = result[key70];
        	  if(SL_res != undefined) localStorage[key70] = SL_res;
	          else localStorage[key70] = "Ctrl + Alt + O";
		});		
	        var key71 = 'SL_HK_btnbox';
		chrome.storage.local.get(key71,function(result){
	          var SL_res = result[key71];
        	  if(SL_res != undefined) localStorage[key71] = SL_res;
	          else localStorage[key71] = "true";
		});
	        var key72 = 'SL_HK_btn';
		chrome.storage.local.get(key72,function(result){
	          var SL_res = result[key72];
        	  if(SL_res != undefined) localStorage[key72] = SL_res;
	          else {
		         localStorage[key72] = "Ctrl + Alt + A";
               		 if(FExtension.store.SL_isMacintosh()==true && FExtension.store.get("SL_HK_btn") == "Alt + A"){
	                  	localStorage[key72] = "Ctrl + Alt + A";
			 }
		  }
		});
	        var key73 = 'SL_tr_hk';
		chrome.storage.local.get(key73,function(result){
	          var SL_res = result[key73];
        	  if(SL_res != undefined) localStorage[key73] = SL_res;
	          else localStorage[key73] = "Ctrl + Alt + T";
		});

	        var key74 = 'SL_tr_hk_btn';
		chrome.storage.local.get(key74,function(result){
	          var SL_res = result[key74];
        	  if(SL_res != undefined) localStorage[key74] = SL_res;
	          else localStorage[key74] = "true";
		});
	        var key75 = 'SL_pr_gt';
		chrome.storage.local.get(key75,function(result){
	          var SL_res = result[key75];
        	  if(SL_res != undefined) localStorage[key75] = SL_res;
	          else localStorage[key75] = "1";
		});
	        var key76 = 'SL_pr_bbl';
		chrome.storage.local.get(key76,function(result){
	          var SL_res = result[key76];
        	  if(SL_res != undefined) localStorage[key76] = SL_res;
	          else localStorage[key76] = "1";
		});
	        var key77 = 'SL_Dtext';
		chrome.storage.local.get(key77,function(result){
	          var SL_res = result[key77];
        	  if(SL_res != undefined) localStorage[key77] = SL_res;
	          else localStorage[key77] = "";
		});
	        var key78 = 'SL_GVoices';
		chrome.storage.local.get(key78,function(result){
	          var SL_res = result[key78];
        	  if(SL_res != undefined) localStorage[key78] = SL_res;
	          else localStorage[key78] = "1";
		});
	        var key79 = 'SL_SLVoices';
		chrome.storage.local.get(key79,function(result){
	          var SL_res = result[key79];
        	  if(SL_res != undefined) localStorage[key79] = SL_res;
	          else localStorage[key79] = "1";
		});
	        var key80 = 'SL_SaveText_box_gt';
		chrome.storage.local.get(key80,function(result){
	          var SL_res = result[key80];
        	  if(SL_res != undefined) localStorage[key80] = SL_res;
	          else localStorage[key80] = "1";
		});
	        var key81 = 'SL_SavedText_gt';
		chrome.storage.local.get(key81,function(result){
	          var SL_res = result[key81];
        	  if(SL_res != undefined) localStorage[key81] = SL_res;
	          else localStorage[key81] = "";
		});		
	        var key82 = 'SL_SaveText_box_bbl';
		chrome.storage.local.get(key82,function(result){
	          var SL_res = result[key82];
        	  if(SL_res != undefined) localStorage[key82] = SL_res;
	          else localStorage[key82] = "0";
		});		
	        var key83 = 'SL_LNG_LIST';
		chrome.storage.local.get(key83,function(result){
	          var SL_res = result[key83];
        	  if(SL_res != undefined) localStorage[key83] = SL_res;
	          else localStorage[key83] = "all";
		});
	        var key84 = 'SL_BACK_VIEW';
		chrome.storage.local.get(key84,function(result){
	          var SL_res = result[key84];
        	  if(SL_res != undefined) localStorage[key84] = SL_res;
	          else localStorage[key84] = "2";
		});
	        var key85 = 'SL_PrefTrans';
		chrome.storage.local.get(key85,function(result){
	          var SL_res = result[key85];
        	  if(SL_res != undefined) localStorage[key85] = SL_res;
	          else localStorage[key85] = "1";
		});
	        var key86 = 'SL_CM1';
		chrome.storage.local.get(key86,function(result){
	          var SL_res = result[key86];
        	  if(SL_res != undefined) localStorage[key86] = SL_res;
	          else localStorage[key86] = "1";
		});
	        var key87 = 'SL_CM2';
		chrome.storage.local.get(key87,function(result){
	          var SL_res = result[key87];
        	  if(SL_res != undefined) localStorage[key87] = SL_res;
	          else localStorage[key87] = "1";
		});
	        var key88 = 'SL_CM3';
		chrome.storage.local.get(key88,function(result){
	          var SL_res = result[key88];
        	  if(SL_res != undefined) localStorage[key88] = SL_res;
	          else localStorage[key88] = "1";
		});
	        var key89 = 'SL_CM4';
		chrome.storage.local.get(key89,function(result){
	          var SL_res = result[key89];
        	  if(SL_res != undefined) localStorage[key89] = SL_res;
	          else localStorage[key89] = "1";
		});
	        var key90 = 'SL_CM5';
		chrome.storage.local.get(key90,function(result){
	          var SL_res = result[key90];
        	  if(SL_res != undefined) localStorage[key90] = SL_res;
	          else localStorage[key90] = "1";
		});
	        var key91 = 'SL_CM6';
		chrome.storage.local.get(key91,function(result){
	          var SL_res = result[key91];
        	  if(SL_res != undefined) localStorage[key91] = SL_res;
	          else localStorage[key91] = "1";
		});
	        var key92 = 'SL_CM7';
		chrome.storage.local.get(key92,function(result){
	          var SL_res = result[key92];
        	  if(SL_res != undefined) localStorage[key92] = SL_res;
	          else localStorage[key92] = "1";
		});
	        var key93 = 'SL_CM8';
		chrome.storage.local.get(key93,function(result){
	          var SL_res = result[key93];
        	  if(SL_res != undefined) localStorage[key93] = SL_res;
	          else localStorage[key93] = "1";
		});
	        var key94 = 'SL_DOM';
		chrome.storage.local.get(key94,function(result){
	          var SL_res = result[key94];
        	  if(SL_res != undefined) localStorage[key94] = SL_res;
	          else {
		        var tmpDOM=SL_res;
			if(tmpDOM==null) {
				localStorage[key94] = "auto";
			} else {
				if(tmpDOM!="auto" && tmpDOM!="com" && tmpDOM!="com.hk" && tmpDOM!="com.tw" && tmpDOM!="co.jp" && tmpDOM!="co.kr" && tmpDOM!="com.tr" && tmpDOM!="com.ua" && tmpDOM!="com.vn" && tmpDOM!="co.in" && tmpDOM!="co.uk" && tmpDOM!="cn" && tmpDOM!="de" && tmpDOM!="fr" && tmpDOM!="it" && tmpDOM!="pl" && tmpDOM!="ru" ){
					localStorage[key94] = "auto";
				}
			}


		  }
		});
	        var key95 = 'SL_langDst_name_tr';
		chrome.storage.local.get(key95,function(result){
	          var SL_res = result[key95];
        	  if(SL_res != undefined) localStorage[key95] = SL_res;
	          else localStorage[key95] = "Spanish";
		});
	        var key96 = 'SL_langSrc_tr';
		chrome.storage.local.get(key96,function(result){
	          var SL_res = result[key96];
        	  if(SL_res != undefined) localStorage[key96] = SL_res;
	          else localStorage[key96] = "auto";
		});
	        var key97 = 'SL_langDst_tr';
		chrome.storage.local.get(key97,function(result){
	          var SL_res = result[key97];
        	  if(SL_res != undefined) localStorage[key97] = SL_res;
	          else localStorage[key97] = FExtension.store.SL_BR_LN;
		});
	        var key98 = 'SL_tr_detect';
		chrome.storage.local.get(key98,function(result){
	          var SL_res = result[key98];
        	  if(SL_res != undefined) localStorage[key98] = SL_res;
	          else localStorage[key98] = "true";
		});
	        var key99 = 'SL_tr_ptp';
		chrome.storage.local.get(key99,function(result){
	          var SL_res = result[key99];
        	  if(SL_res != undefined) localStorage[key99] = SL_res;
	          else localStorage[key99] = "google";
		});
	        var key100 = 'SL_tr_back';
		chrome.storage.local.get(key100,function(result){
	          var SL_res = result[key100];
        	  if(SL_res != undefined) localStorage[key100] = SL_res;
	          else localStorage[key100] = "false";
		});
	        var key101 = 'SL_tr_decoder';
		chrome.storage.local.get(key101,function(result){
	          var SL_res = result[key101];
        	  if(SL_res != undefined) localStorage[key101] = SL_res;
	          else localStorage[key101] = "false";
		});
	        var key102 = 'SL_tr_russtr';
		chrome.storage.local.get(key102,function(result){
	          var SL_res = result[key102];
        	  if(SL_res != undefined) localStorage[key102] = SL_res;
	          else localStorage[key102] = "false";
		});
	        var key103 = 'SL_tr_dict';
		chrome.storage.local.get(key103,function(result){
	          var SL_res = result[key103];
        	  if(SL_res != undefined) localStorage[key103] = SL_res;
	          else localStorage[key103] = "false";
		});
	        var key104 = 'SL_tr_speller';
		chrome.storage.local.get(key104,function(result){
	          var SL_res = result[key104];
        	  if(SL_res != undefined) localStorage[key104] = SL_res;
	          else localStorage[key104] = "false";
		});
	        var key105 = 'SL_tr_dictionary';
		chrome.storage.local.get(key105,function(result){
	          var SL_res = result[key105];
        	  if(SL_res != undefined) localStorage[key105] = SL_res;
	          else localStorage[key105] = "false";
		});
	        var key106 = 'SL_ALL_PROVIDERS_GT';
		chrome.storage.local.get(key106,function(result){
	          var SL_res = result[key106];
        	  if(SL_res != undefined) localStorage[key106] = SL_res;
	          else localStorage[key106] = "Google,Microsoft,Translator,Yandex";
		});
	        var key107 = 'SL_ALL_PROVIDERS_BBL';
		chrome.storage.local.get(key107,function(result){
	          var SL_res = result[key107];
        	  if(SL_res != undefined) localStorage[key107] = SL_res;
	          else localStorage[key107] = "Google,Microsoft,Translator,Yandex";
		});
	        var key108 = 'SL_DICT_PRESENT';
		chrome.storage.local.get(key108,function(result){
	          var SL_res = result[key108];
        	  if(SL_res != undefined) localStorage[key108] = SL_res;
	          else localStorage[key108] = "Google:1,Microsoft:0,Translator:0,Yandex:0";
		});
	        var key109 = 'SL_ALL_PROVIDERS_IT';
		chrome.storage.local.get(key109,function(result){
	          var SL_res = result[key109];
        	  if(SL_res != undefined) localStorage[key109] = SL_res;
	          else localStorage[key109] = "Google,Microsoft,Yandex";
		});
	        var key110 = 'SL_BTN_X';
		chrome.storage.local.get(key110,function(result){
	          var SL_res = result[key110];
        	  if(SL_res != undefined) localStorage[key110] = SL_res;
	          else localStorage[key110] = "0";
		});
	        var key111 = 'SL_BTN_Y';
		chrome.storage.local.get(key111,function(result){
	          var SL_res = result[key111];
        	  if(SL_res != undefined) localStorage[key111] = SL_res;
	          else localStorage[key111] = "0";
		});
	        var key112 = 'SL_BBL_X';
		chrome.storage.local.get(key112,function(result){
	          var SL_res = result[key112];
        	  if(SL_res != undefined) localStorage[key112] = SL_res;
	          else localStorage[key112] = "0";
		});
	        var key113 = 'SL_BBL_Y';
		chrome.storage.local.get(key113,function(result){
	          var SL_res = result[key113];
        	  if(SL_res != undefined) localStorage[key113] = SL_res;
	          else localStorage[key113] = "0";
		});
	        var key114 = 'FORSEbubble';
		chrome.storage.local.get(key114,function(result){
	          var SL_res = result[key114];
        	  if(SL_res != undefined) localStorage[key114] = SL_res;
	          else localStorage[key114] = "0";
		});
	        var key115 = 'BL_D_PROV';
		chrome.storage.local.get(key115,function(result){
	          var SL_res = result[key115];
        	  if(SL_res != undefined) localStorage[key115] = SL_res;
	          else localStorage[key115] = "Google";
		});
	        var key116 = 'BL_T_PROV';
		chrome.storage.local.get(key116,function(result){
	          var SL_res = result[key116];
        	  if(SL_res != undefined) localStorage[key116] = SL_res;
	          else localStorage[key116] = "Google";
		});
	        var key117 = 'INLINEflip';
		chrome.storage.local.get(key117,function(result){
	          var SL_res = result[key117];
        	  if(SL_res != undefined) localStorage[key117] = SL_res;
	          else localStorage[key117] = "0";
		});
	        var key118 = 'THEMEmode';
		chrome.storage.local.get(key118,function(result){
	          var SL_res = result[key118];
        	  if(SL_res != undefined) localStorage[key118] = SL_res;
	          else localStorage[key118] = "0";
		});
	        var key119 = 'AVOIDAUTODETECT';
		chrome.storage.local.get(key119,function(result){
	          var SL_res = result[key119];
        	  if(SL_res != undefined) localStorage[key119] = SL_res;
	          else localStorage[key119] = "0";
		});
	        var key120 = 'AVOIDAUTODETECT_LNG';
		chrome.storage.local.get(key120,function(result){
	          var SL_res = result[key120];
        	  if(SL_res != undefined) localStorage[key120] = SL_res;
	          else localStorage[key120] = "";
		});
	        var key121 = 'PLD_TTSvolume';
		chrome.storage.local.get(key121,function(result){
	          var SL_res = result[key121];
        	  if(SL_res != undefined) localStorage[key121] = SL_res;
	          else localStorage[key121] = "10";
		});
	        var key122 = 'PLD_DPROV';
		chrome.storage.local.get(key122,function(result){
	          var SL_res = result[key122];
        	  if(SL_res != undefined) localStorage[key122] = SL_res;
	          else localStorage[key122] = "Google";
		});
	        var key123 = 'PLD_OLD_TS';
		chrome.storage.local.get(key123,function(result){
	          var SL_res = result[key123];
        	  if(SL_res != undefined) localStorage[key123] = SL_res;
	          else localStorage[key123] = "0";
		});
	        var key124 = 'PLD_DIC_FIRSTRUN';
		chrome.storage.local.get(key124,function(result){
	          var SL_res = result[key124];
        	  if(SL_res != undefined) localStorage[key124] = SL_res;
	          else localStorage[key124] = "dicdone";
		});
	        var key125 = 'PLT_TTSvolume';
		chrome.storage.local.get(key125,function(result){
	          var SL_res = result[key125];
        	  if(SL_res != undefined) localStorage[key125] = SL_res;
	          else localStorage[key125] = "10";
		});
	        var key126 = 'PLT_PROV';
		chrome.storage.local.get(key126,function(result){
	          var SL_res = result[key126];
        	  if(SL_res != undefined) localStorage[key126] = SL_res;
	          else localStorage[key126] = "Google";
		});
	        var key127 = 'PLT_OLD_TS_TR';
		chrome.storage.local.get(key127,function(result){
	          var SL_res = result[key127];
        	  if(SL_res != undefined) localStorage[key127] = SL_res;
	          else localStorage[key127] = "0";
		});
	        var key128 = 'PLT_TR_FIRSTRUN';
		chrome.storage.local.get(key128,function(result){
	          var SL_res = result[key128];
        	  if(SL_res != undefined) localStorage[key128] = SL_res;
	          else localStorage[key128] = "done";
		});
	        var key129 = 'SL_anchor';
		chrome.storage.local.get(key129,function(result){
	          var SL_res = result[key129];
        	  if(SL_res != undefined) localStorage[key129] = SL_res;
	          else localStorage[key129] = "0";
		});
	        var key130 = 'SL_sort';
		chrome.storage.local.get(key130,function(result){
	          var SL_res = result[key130];
        	  if(SL_res != undefined) localStorage[key130] = SL_res;
	          else localStorage[key130] = "0";
		});
	        var key131 = 'THE_URL';
		chrome.storage.local.get(key131,function(result){
	          var SL_res = result[key131];
        	  if(SL_res != undefined) localStorage[key131] = SL_res;
	          else localStorage[key131] = "";
		});
	        var key132 = 'SL_Import_Report';
		chrome.storage.local.get(key132,function(result){
	          var SL_res = result[key132];
        	  if(SL_res != undefined) localStorage[key132] = SL_res;
	          else localStorage[key132] = "";
		});
	        var key133 = 'SL_GWPTHist';
		chrome.storage.local.get(key133,function(result){
	          var SL_res = result[key133];
        	  if(SL_res != undefined) localStorage[key133] = SL_res;
	          else localStorage[key133] = "";
		});
	        var key134 = 'SL_BBL_TS';
		chrome.storage.local.get(key134,function(result){
	          var SL_res = result[key134];
        	  if(SL_res != undefined) localStorage[key134] = SL_res;
	          else localStorage[key134] = "0";
		});
	        var key135 = 'SL_langSrc2';
		chrome.storage.local.get(key135,function(result){
	          var SL_res = result[key135];
        	  if(SL_res != undefined) localStorage[key135] = SL_res;
	          else localStorage[key135] = "0";
		});
	        var key136 = 'SL_langDst2';
		chrome.storage.local.get(key136,function(result){
	          var SL_res = result[key136];
        	  if(SL_res != undefined) localStorage[key136] = SL_res;
	          else localStorage[key136] = "0";
		});
	        var key137 = 'SL_langSrc_bbl2';
		chrome.storage.local.get(key137,function(result){
	          var SL_res = result[key137];
        	  if(SL_res != undefined) localStorage[key137] = SL_res;
	          else localStorage[key137] = "auto";
		});
	        var key138 = 'SL_langDst_bbl2';
		chrome.storage.local.get(key138,function(result){
	          var SL_res = result[key138];
        	  if(SL_res != undefined) localStorage[key138] = SL_res;
	          else localStorage[key138] = FExtension.store.SL_BR_LN;
		});
	        var key139 = 'SL_show_button_bbl2';
		chrome.storage.local.get(key139,function(result){
	          var SL_res = result[key139];
        	  if(SL_res != undefined) localStorage[key139] = SL_res;
	          else localStorage[key139] = "true";
		});
	        var key140 = 'SL_Fontsize_bbl2';
		chrome.storage.local.get(key140,function(result){
	          var SL_res = result[key140];
        	  if(SL_res != undefined) localStorage[key140] = SL_res;
	          else localStorage[key140] = "14px";
		});
	        var key141 = 'SL_bbl_loc_langs';
		chrome.storage.local.get(key141,function(result){
	          var SL_res = result[key141];
        	  if(SL_res != undefined) localStorage[key141] = SL_res;
	          else localStorage[key141] = "false";
		});
	        var key142 = 'SL_change_lang_HKbox_it';
		chrome.storage.local.get(key142,function(result){
	          var SL_res = result[key142];
        	  if(SL_res != undefined) localStorage[key142] = SL_res;
	          else localStorage[key142] = "true";
		});
	        var key143 = 'SL_change_lang_HK_it';
		chrome.storage.local.get(key143,function(result){
	          var SL_res = result[key143];
        	  if(SL_res != undefined) localStorage[key143] = SL_res;
	          else localStorage[key143] = "Ctrl + Alt + S";
		});
	        var key144 = 'SL_langDst_it2';
		chrome.storage.local.get(key144,function(result){
	          var SL_res = result[key144];
        	  if(SL_res != undefined) localStorage[key144] = SL_res;
	          else localStorage[key144] = FExtension.store.get("SL_langDst_it");
		});
	        var key145 = 'SL_TS';
		chrome.storage.local.get(key145,function(result){
	          var SL_res = result[key145];
        	  if(SL_res != undefined) localStorage[key145] = SL_res;
	          else localStorage[key145] = Date.now();
		});
	        var key146 = 'LOC';
		chrome.storage.local.get(key146,function(result){
	          var SL_res = result[key146];
        	  if(SL_res != undefined) localStorage[key146] = SL_res;
	          else localStorage[key146] = FExtension.store.SL_CUR_LANG();
		});
	        var key147 = 'SL_LOCALIZATION';
		chrome.storage.local.get(key147,function(result){
	          var SL_res = result[key147];
        	  if(SL_res != undefined) localStorage[key147] = SL_res;
//by VK: WAS before 08/09/2019 
//	          else localStorage[key147] = SL_GETBROWSERLOC();
	          else localStorage[key147] = SL_res;
		});
	        var key148 = 'SL_Fontsize2';
		chrome.storage.local.get(key148,function(result){
	          var SL_res = result[key148];
        	  if(SL_res != undefined) localStorage[key148] = SL_res;
	          else localStorage[key148] = "17px";
		});
	        var key149 = 'SL_pin_bbl2';
		chrome.storage.local.get(key149,function(result){
	          var SL_res = result[key149];
        	  if(SL_res != undefined) localStorage[key149] = SL_res;
	          else localStorage[key149] = FExtension.store.get("SL_pin_bbl");
		});
 	        var key150 = 'PROV';
		chrome.storage.local.get(key150,function(result){
	          var SL_res = result[key150];
        	  if(SL_res != undefined) localStorage[key150] = SL_res;
	          else localStorage[key150] = "google";
		});
 	        var key150 = 'PROV';
		chrome.storage.local.get(key150,function(result){
	          var SL_res = result[key150];
        	  if(SL_res != undefined) localStorage[key150] = SL_res;
	          else localStorage[key150] = "google";
		});
 	        var key151 = 'MoveBBLX';
		chrome.storage.local.get(key151,function(result){
	          var SL_res = result[key151];
        	  if(SL_res != undefined) localStorage[key151] = SL_res;
	          else localStorage[key151] = "0";
		});
 	        var key152 = 'MoveBBLY';
		chrome.storage.local.get(key152,function(result){
	          var SL_res = result[key152];
        	  if(SL_res != undefined) localStorage[key152] = SL_res;
	          else localStorage[key152] = "0";
		});
 	        var key153 = 'SL_FAV_START';
		chrome.storage.local.get(key153,function(result){
	          var SL_res = result[key153];
        	  if(SL_res != undefined) localStorage[key153] = SL_res;
	          else localStorage[key153] = "10";
		});
 	        var key154 = 'SL_FAV_MAX';
		chrome.storage.local.get(key154,function(result){
	          var SL_res = result[key154];
        	  if(SL_res != undefined) localStorage[key154] = SL_res;
	          else localStorage[key154] = "3";
		});
 	        var key155 = 'SL_FAV_LANGS_BBL';
		chrome.storage.local.get(key155,function(result){
	          var SL_res = result[key155];
        	  if(SL_res != undefined) localStorage[key155] = SL_res;
	          else localStorage[key155] = FExtension.store.SL_BR_LN;
		});
 	        var key156 = 'SL_FAV_LANGS_IT';
		chrome.storage.local.get(key156,function(result){
	          var SL_res = result[key156];
        	  if(SL_res != undefined) localStorage[key156] = SL_res;
	          else localStorage[key156] = FExtension.store.SL_BR_LN;
		});
 	        var key157 = 'SL_FAV_LANGS_IMT';
		chrome.storage.local.get(key157,function(result){
	          var SL_res = result[key157];
        	  if(SL_res != undefined) localStorage[key157] = SL_res;
	          else localStorage[key157] = FExtension.store.SL_BR_LN;
		});
 	        var key158 = 'SL_FAV_TRIGGER';
		chrome.storage.local.get(key158,function(result){
	          var SL_res = result[key158];
        	  if(SL_res != undefined) localStorage[key158] = SL_res;
	          else localStorage[key158] = "0";
		});
 	        var key159 = 'LOC_box';
		chrome.storage.local.get(key159,function(result){
	          var SL_res = result[key159];
        	  if(SL_res != undefined) localStorage[key159] = SL_res;
	          else localStorage[key159] = "false";
		});

 	        var key160 = 'SL_UNTRUST';
		chrome.storage.local.get(key160,function(result){
	          var SL_res = result[key160];
        	  if(SL_res != undefined) localStorage[key160] = SL_res;
	          else localStorage[key160] = DO_NOT_TRUST_WORD+":"+DO_NOT_TRUST_TEXT;
		});

 	        var key161 = 'WINDOW_WIDTH';
		chrome.storage.local.get(key161,function(result){
	          var SL_res = result[key161];
        	  if(SL_res != undefined) localStorage[key161] = SL_res;
	          else localStorage[key161] = 555;
		});

 	        var key162 = 'WINDOW_HEIGHT';
		chrome.storage.local.get(key162,function(result){
	          var SL_res = result[key162];
        	  if(SL_res != undefined) localStorage[key162] = SL_res;
	          else localStorage[key162] = 670; //540;
		});

 	        var key163 = 'WINDOW_TYPE';
		chrome.storage.local.get(key163,function(result){
	          var SL_res = result[key163];
        	  if(SL_res != undefined) localStorage[key163] = SL_res;
	          else localStorage[key163] = 1;
		});

 	        var key164 = 'SL_GotIt';
		chrome.storage.local.get(key164,function(result){
	          var SL_res = result[key164];
        	  if(SL_res != undefined) localStorage[key164] = SL_res;
	          else localStorage[key164] = 0;
		});



		if(localStorage["SL_Version"]==undefined || localStorage["SL_Version"]==null){
			document.body.style.opacity="0";
    			setTimeout(function(){
				top.location.reload(true);
		        },50);
		}
	}

};

FExtension.alert_debug = function(msg) {
//	if (FExtension.config.debugIsEnabled)
//		window.alert(msg);
};

function SL_GETBROWSERLOC(){
      	  var loc = chrome.i18n.getUILanguage();
          var layers="en,zh,zt,cs,nl,tl,fr,de,el,hi,it,ja,ko,pl,pt,ro,ru,sr,es,sv,tr,uk,vi,bg,sk";
          if(FExtension.store.get("SL_LOCALIZATION")=="none" || FExtension.store.get("SL_LOCALIZATION")=="" || FExtension.store.get("SL_LOCALIZATION")==null){
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
                loc=FExtension.store.get("SL_LOCALIZATION");
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
			chrome.storage.local.set({'SL_LOCALIZATION': 'en'});
		} else {
			FExtension.store.set("SL_LOCALIZATION",loc);
			chrome.storage.local.set({'SL_LOCALIZATION': loc});
		}
	   }
}




function SL_SETBROWSERLOC(name,CLloc){
    if(chrome.i18n.getUILanguage()){
	 var BRloc=chrome.i18n.getUILanguage();
	 name=name.replace("ext","_");
	 if(CLloc==undefined){
		CLloc = BRloc;
	 }
	 if(BRloc==CLloc){
	  var BRloc=BRloc.substr(0,2);
	  return chrome.i18n.getMessage(BRloc+name);
	 } else { 
		return chrome.i18n.getMessage(CLloc+name);
	 }	
    }

}

function SL_isLinux() {
        var OSName = false;
	if (navigator.appVersion.indexOf("X11")!=-1) OSName=true;
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName=true;
	return OSName;
}

EXTENSION_DEFAULTS();


function EXTENSION_DEFAULTS(){
	try{
	    var SL_PR_ALL = "Google,Microsoft,Translator,Yandex";
	    var SL_PR_KEYS = "Google:1,Microsoft:0,Translator:0,Yandex:0";
	    var SL_PR_IT = "Google,Microsoft,Yandex";

            var SL_BR_LN="en";//SL_CUR_LANG();
            
            var manifestData = browser.runtime.getManifest();
	    PACK_PARAMS[0] = "SL_session;0";
            if(manifestData.version) PACK_PARAMS[1] = "SL_Version;"+ manifestData.version;
	    //ADV
	    PACK_PARAMS[2] = "ADV;0";
	    PACK_PARAMS[3] = "FRUN;0";
            PACK_PARAMS[4] = "ran_before;0";
 	    //------------------------------- History ------------------------------------
	    PACK_PARAMS[5] = "SL_History;";
	    PACK_PARAMS[6] = "SL_TH_1;0";
	    PACK_PARAMS[7] = "SL_TH_2;0";
	    PACK_PARAMS[8] = "SL_TH_3;0";
	    PACK_PARAMS[9] = "SL_TH_4;0";
            //------------------------------- option gt ----------------------------------
	    PACK_PARAMS[10] = "SL_global_lng;true";
	    PACK_PARAMS[11] = "SL_Fontsize;17px";
	    PACK_PARAMS[12] = "SL_langSrc;auto";
	    PACK_PARAMS[13] = "SL_langDst;"+ SL_BR_LN;
	    PACK_PARAMS[14] = "SL_no_detect;true";
	    PACK_PARAMS[15] = "SL_other_gt;1";
	    PACK_PARAMS[16] = "SL_dict;true";
	    PACK_PARAMS[17] = "SL_show_back;false";
	    PACK_PARAMS[18] = "SL_show_back2;false";
	    PACK_PARAMS[19] = "SL_HKset;3|90|true";
	    PACK_PARAMS[20] = "SL_HKset_inv;3|90|true";
	    PACK_PARAMS[21] = "SL_langDst_name;Spanish";
	    //??
	    PACK_PARAMS[22] = "SL_Flag;FALSE";
            //------------------------------- option bbl ---------------------------------
	    PACK_PARAMS[23] = "SL_ENABLE;true";
	    PACK_PARAMS[24] = "SL_show_button_bbl;true";
	    PACK_PARAMS[25] = "SL_global_lng_bbl;true";
	    PACK_PARAMS[26] = "SL_Fontsize_bbl;14px";
	    PACK_PARAMS[27] = "SL_langSrc_bbl;auto";
	    PACK_PARAMS[28] = "SL_langDst_bbl;"+ SL_BR_LN;
	    PACK_PARAMS[29] = "SL_no_detect_bbl;true";
	    PACK_PARAMS[30] = "SL_other_bbl;1";
	    PACK_PARAMS[31] = "SL_dict_bbl;true";
	    PACK_PARAMS[32] = "SL_translation_mos_bbl;true";
	    PACK_PARAMS[33] = "SL_pin_bbl;false";

	    PACK_PARAMS[34] = "SL_langDst_name_bbl;Spanish";
	    PACK_PARAMS[35] = "SL_DBL_bbl;false";
	    PACK_PARAMS[36] = "SL_Timing;3";
	    PACK_PARAMS[37] = "SL_Delay;0";

            //------------------------------- option it ----------------------------------
	    PACK_PARAMS[38] = "SL_langSrc_it;auto";
	    PACK_PARAMS[39] = "SL_langDst_it;"+ SL_BR_LN;
	    PACK_PARAMS[40] = "SL_global_lng_it;true";
	    PACK_PARAMS[41] = "SL_style;239e23";
	    PACK_PARAMS[42] = "SL_inject_brackets;true";
	    PACK_PARAMS[43] = "SL_inject_before;false";
	    PACK_PARAMS[44] = "SL_line_break;false";
	    PACK_PARAMS[45] = "SL_whole_word;true";
	    PACK_PARAMS[46] = "SL_hide_translation;false";
	    PACK_PARAMS[47] = "SL_dictionary;true";
	    PACK_PARAMS[48] = "SL_no_detect_it;true";
	    PACK_PARAMS[49] = "SL_other_it;1";
	    PACK_PARAMS[50] = "SL_langDst_name_it;Spanish";
	    PACK_PARAMS[51] = "SL_FK_box1;true";
	    PACK_PARAMS[52] = "SL_FK_box2;true";

            //------------------------------- option wpt ---------------------------------
	    PACK_PARAMS[53] = "SL_global_lng_wpt;true";
	    PACK_PARAMS[54] = "SL_langSrc_wpt;auto";
	    PACK_PARAMS[55] = "SL_langDst_wpt;" + SL_BR_LN;
	    PACK_PARAMS[56] = "SL_other_wpt;1";
	    PACK_PARAMS[57] = "SL_langDst_name_wpt;Spanish";

	    //-----------------------HK for All Translators-------------------------------
	    PACK_PARAMS[58] = "SL_HK_gt1;Ctrl + Alt + Z";
	    PACK_PARAMS[59] = "SL_HK_gt2;Alt + Z";


	    if(SL_isLinux()==true) PACK_PARAMS[60] = "SL_HK_it1;Ctrl + Alt + C";
	    else PACK_PARAMS[60] = "SL_HK_it1;Alt + C";

	    if(SL_isLinux()==true) PACK_PARAMS[61] = "SL_HK_it2;Ctrl + Alt + X";
	    else PACK_PARAMS[61] = "SL_HK_it2;Alt + X";

	    if(SL_isLinux()==true) PACK_PARAMS[62] = "SL_HK_bb1;Ctrl + Alt";
	    else PACK_PARAMS[62] = "SL_HK_bb1;Alt";

	    PACK_PARAMS[63] = "SL_HK_bb2;Escape";
	    PACK_PARAMS[64] = "SL_HK_bb2box;true";
	    PACK_PARAMS[65] = "SL_HK_wptbox1;true";

	    if(SL_isLinux()==true) PACK_PARAMS[66] = "SL_HK_wpt1;Ctrl + Alt + P";
	    else PACK_PARAMS[66] = "SL_HK_wpt1;Alt + P";

	    PACK_PARAMS[67] = "SL_HK_wptbox2;true";

	    if(SL_isLinux()==true) PACK_PARAMS[68] = "SL_HK_wpt2;Ctrl + Alt + M";
	    else PACK_PARAMS[68] = "SL_HK_wpt2;Alt + M";

	    PACK_PARAMS[69] = "SL_HK_optbox;true";
	    PACK_PARAMS[70] = "SL_HK_opt;Ctrl + Alt + O";
	    PACK_PARAMS[71] = "SL_HK_btnbox;true";

	    if(SL_isLinux()==true) PACK_PARAMS[72] = "SL_HK_btn;Ctrl + Alt + A";
	    else PACK_PARAMS[72] = "SL_HK_btn;Ctrl + Alt + A";

//--------------------NATIVE TRANSLATOR---------------------------------------            
	    PACK_PARAMS[73] = "SL_tr_hk;Ctrl + Alt + T";
	    PACK_PARAMS[74] = "SL_tr_hk_btn;true";

//--------------------NEW PARAMS PROVIDERs---------------------------------------
	    PACK_PARAMS[75] = "SL_pr_gt;1";
	    PACK_PARAMS[76] = "SL_pr_bbl;1";

	    //??
	    PACK_PARAMS[77] = "SL_Dtext;";

            //********************SET OF THE ADVANCES****************************
	    PACK_PARAMS[78] = "SL_GVoices;1";
	    PACK_PARAMS[79] = "SL_SLVoices;0";
            //********************SET OF THE ADVANCES****************************

	    PACK_PARAMS[80] = "SL_SaveText_box_gt;1";
	    PACK_PARAMS[81] = "SL_SavedText_gt;";
	    PACK_PARAMS[82] = "SL_SaveText_box_bbl;0";
	    PACK_PARAMS[83] = "SL_LNG_LIST;all";
	    PACK_PARAMS[84] = "SL_BACK_VIEW;2";
	
	    PACK_PARAMS[85] = "SL_PrefTrans;1";
	    PACK_PARAMS[86] = "SL_CM1;1";
	    PACK_PARAMS[87] = "SL_CM2;1";
	    PACK_PARAMS[88] = "SL_CM3;1";
	    PACK_PARAMS[89] = "SL_CM4;1";
	    PACK_PARAMS[90] = "SL_CM5;1";
	    PACK_PARAMS[91] = "SL_CM6;1";
	    PACK_PARAMS[92] = "SL_CM7;1";
	    PACK_PARAMS[93] = "SL_CM8;1";
	    PACK_PARAMS[94] = "SL_DOM;auto";

	    PACK_PARAMS[95] = "SL_langDst_name_tr;Spanish";
	    PACK_PARAMS[96] = "SL_langSrc_tr;auto";
	    PACK_PARAMS[97] = "SL_langDst_tr;" + SL_BR_LN;
	    PACK_PARAMS[98] = "SL_tr_detect;true";
	    PACK_PARAMS[99] = "SL_tr_ptp;google";
	    PACK_PARAMS[100] = "SL_tr_back;false";
	    PACK_PARAMS[101] = "SL_tr_decoder;false";
	    PACK_PARAMS[102] = "SL_tr_russtr;false";
	    PACK_PARAMS[103] = "SL_tr_dict;false";
	    PACK_PARAMS[104] = "SL_tr_speller;false";
    	    PACK_PARAMS[105] = "SL_tr_dictionary;false";

	    PACK_PARAMS[106] = "SL_ALL_PROVIDERS_GT;"+ SL_PR_ALL;

	    PACK_PARAMS[107] = "SL_ALL_PROVIDERS_BBL;"+ SL_PR_ALL;
	    PACK_PARAMS[108] = "SL_DICT_PRESENT;"+ SL_PR_KEYS;
	    PACK_PARAMS[109] = "SL_ALL_PROVIDERS_IT;"+ SL_PR_IT;
	    PACK_PARAMS[110] = "SL_BTN_X;0";
	    PACK_PARAMS[111] = "SL_BTN_Y;0";
	    PACK_PARAMS[112] = "SL_BBL_X;0";
	    PACK_PARAMS[113] = "SL_BBL_Y;0";

	    //FORSE BUBBLE
	    PACK_PARAMS[114] = "FORSEbubble;0";

	    //FORMER BBL CS
	    PACK_PARAMS[115] = "BL_D_PROV;Google";
	    PACK_PARAMS[116] = "BL_T_PROV;Google";

	    //INLINE FLIP
	    PACK_PARAMS[117] = "INLINEflip;0";

	    //THEME MODE
	    PACK_PARAMS[118] = "THEMEmode;0";

	    PACK_PARAMS[119] = "AVOIDAUTODETECT;0";
	    PACK_PARAMS[120] = "AVOIDAUTODETECT_LNG;en";

	    //FORMER PLANSHET DIC CS
	    PACK_PARAMS[121] = "PLD_TTSvolume;10";
	    PACK_PARAMS[122] = "PLD_DPROV;Google";
	    PACK_PARAMS[123] = "PLD_OLD_TS;0";
	    PACK_PARAMS[124] = "PLD_DIC_FIRSTRUN;dicdone";

	    //FORMER PLANSHET TRANSLATOR CS
	    PACK_PARAMS[125] = "PLT_TTSvolume;10";
	    PACK_PARAMS[126] = "PLT_PROV;Google";
	    PACK_PARAMS[127] = "PLT_OLD_TS_TR;0";
	    PACK_PARAMS[128] = "PLT_TR_FIRSTRUN;done";

	    //FORMER OPTIONS CS
	    PACK_PARAMS[129] = "SL_anchor;0";
	    PACK_PARAMS[130] = "SL_sort;0";

	    PACK_PARAMS[131] = "THE_URL;";
	    PACK_PARAMS[132] = "SL_Import_Report;";
	    PACK_PARAMS[133] = "SL_GWPTHist;";
	    PACK_PARAMS[134] = "SL_BBL_TS;0";
	    PACK_PARAMS[135] = "SL_langSrc2;0";
	    PACK_PARAMS[136] = "SL_langDst2;0";

	    //BBL SESSION RESET 
	    PACK_PARAMS[137] = "SL_langSrc_bbl2;auto";
	    PACK_PARAMS[138] = "SL_langDst_bbl2;"+ SL_BR_LN;
	    PACK_PARAMS[139] = "SL_show_button_bbl2;true";
	    PACK_PARAMS[140] = "SL_Fontsize_bbl2;14px";
	    PACK_PARAMS[141] = "SL_bbl_loc_langs;false";

	    //IT CHANGE LANG  
	    PACK_PARAMS[142] = "SL_change_lang_HKbox_it;true";
	    PACK_PARAMS[143] = "SL_change_lang_HK_it;Ctrl + Alt + S";
	    PACK_PARAMS[144] = "SL_langDst_it2;"+ SL_BR_LN;
	    PACK_PARAMS[145] = "SL_TS;"+ Date.now();

	    //-----------------------LOCALIZATION-------------------------------
	    PACK_PARAMS[146] = "SL_LOC;"+ SL_BR_LN;
	    PACK_PARAMS[147] = "SL_LOCALIZATION;"+ SL_BR_LN;
	    PACK_PARAMS[148] = "SL_Fontsize2;17px";
	    PACK_PARAMS[149] = "SL_pin_bbl2;0";
	    PACK_PARAMS[150] = "PROV;google";
	    PACK_PARAMS[151] = "SL_GAPI1;0";
	    PACK_PARAMS[152] = "SL_GAPI1_ts;0";
	    PACK_PARAMS[153] = "SL_GAPI2;0";
	    PACK_PARAMS[154] = "SL_GAPI2_ts;0";
	    PACK_PARAMS[155] = "SL_YKEY;0";

	    PACK_PARAMS[156] = "MoveBBLX;0";
	    PACK_PARAMS[157] = "MoveBBLY;0";
	    PACK_PARAMS[158] = "SL_FAV_START;10";
	    PACK_PARAMS[159] = "SL_FAV_MAX;3";
	    PACK_PARAMS[160] = "SL_FAV_LANGS_BBL;"+SL_BR_LN;
	    PACK_PARAMS[161] = "SL_FAV_LANGS_IT;"+SL_BR_LN;
	    PACK_PARAMS[162] = "SL_FAV_LANGS_IMT;"+SL_BR_LN;
	    PACK_PARAMS[163] = "SL_FAV_TRIGGER;0";
	    PACK_PARAMS[164] = "LOC_box;false";

	    PACK_PARAMS[165] = "SL_UNTRUST;"+DO_NOT_TRUST_WORD+":"+DO_NOT_TRUST_TEXT;
	    PACK_PARAMS[166] = "WINDOW_WIDTH;555";
	    PACK_PARAMS[167] = "WINDOW_HEIGHT;670";//540
	    PACK_PARAMS[168] = "WINDOW_TYPE;1";

	} catch(ex){}
}
