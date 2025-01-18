var STR = "";
var TRANSLATOR = FExtension.GET_localStorage("SL_PrefTrans");
var TXT = FExtension.GET_localStorage("SL_Dtext");
var myWindow = "";
var myWindowID = "";

var STOP = 0;
switch(TRANSLATOR){
   case "1":	

	var db = indexedDB.open("test");
	db.onerror = function(){
		setTimeout(function(){
        	   if(chrome.tabs){
		      chrome.tabs.executeScript( {
			  code: "window.getSelection().toString();"
		      }, function(selection) {		    
			   var barTXT = selection[0].trim();
			   ContMenuClick(barTXT);
		      });
		   }  
		},300);
	};
	db.onsuccess =function(){
           if(chrome.tabs){
	      chrome.tabs.executeScript( {
		  code: "window.getSelection().toString();"
	      }, function(selection) {
		 TXT = selection[0].trim();
	      });
	   }  
	
		var BACK_VIEW=FExtension.GET_localStorage("SL_BACK_VIEW");
		var STR1 = String(document.location);
		if(STR1.indexOf("text=")!=-1){
			var STR2 = STR1.split("text=");
			STR = "?text="+STR2[1];
		}else	STR = "?text="+TXT;

		STR = STR + "&stop=";	
		if(STR1.indexOf("&stop=")!=-1){
			STR = STR + "&stop=";
			STOP = 1;
		}

		STR = STR.replace(/%/g,"^")
        	if(window.location.pathname.indexOf("redirect.html")!=-1){
			if(BACK_VIEW==2) document.location="translation-back.html" + STR; 
			else		 document.location="translator.html" + STR ; 
		}else{
			if(STOP == 0){
				if(BACK_VIEW==1) document.location="translator.html" + STR;
				else 		 document.location="translation-back.html" + STR; 
			}
		}
	};
	break;
   case "2":
	setTimeout(function(){
           if(chrome.tabs){
	      chrome.tabs.executeScript( {
		  code: "window.getSelection().toString();"
	      }, function(selection) {
	          try{
		    var barTXT = selection[0].trim();
		    if(barTXT=="" && TXT!="") barTXT=TXT;
		    if(barTXT==""){
			document.write("<div style='width:200px;font-family: Arial;'><div align=center>"+FExtension.element(localStorage["SL_LOCALIZATION"],"extpst").replace(/ /ig,"&nbsp;")+"</div></div>");
			return false;
		    }else{
		        var tab = chrome.tabs;
		        var info = window.event;
			ImTranslatorBG.inlinerContextOnClick(info, tab);
		    }
		    window.close();
		  } catch(err){}		 
	      });
	   }  
	},300);
	break;
   case "3":
	setTimeout(function(){
           if(chrome.tabs){
	      chrome.tabs.executeScript( {
		  code: "window.getSelection().toString();"
	      }, function(selection) {
	          try{
		    var barTXT = selection[0].trim();
		    if(barTXT=="" && TXT!="") barTXT=TXT;
		    if(barTXT==""){
			document.write("<div style='width:200px;font-family: Arial;'><div align=center>"+FExtension.element(localStorage["SL_LOCALIZATION"],"extpst").replace(/ /ig,"&nbsp;")+"</div></div>");
			return false;
		    }else{
		        var tab = chrome.tabs;
		        var info = window.event;
			ImTranslatorBG.SL_PopUpBubble(info, tab);
		    }
		    window.close();
		  } catch(err){}		 
	      });
	   }  

	},300);
	break;
   case "4":
	setTimeout(function(){
           if(chrome.tabs){
	      chrome.tabs.executeScript( {
		  code: "window.getSelection().toString();"
	      }, function(selection) {
		        var winWidth = 495;
			var winWidth = 555;
		        var dir = FExtension.GET_localStorage("SL_langSrc_tr")+"/"+FExtension.GET_localStorage("SL_langDst_tr");
			var loc = FExtension.GET_localStorage("SL_LOCALIZATION");
			var ver = FExtension.GET_localStorage("SL_Version");
			var adet = FExtension.GET_localStorage("SL_tr_detect");
			if(adet == "true") adet="1";
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

	          try{
		    var barTXT = selection[0].trim();
		    if(barTXT=="" && TXT!="") barTXT=TXT;
			popupURL = ImTranslatorBG.ImTranslator_URL + "?op=y&adet="+adet+"&a_s="+a_s+"&ad="+ad+"&ab="+ab+"&at="+at+"&gon=0&adi="+adi+"&v=" + ver + "&dir=" + dir +"&loc=" + loc +"&prvd=" + prvd ; 
		        window.resizeTo(495,625);

		    if(barTXT!=""){
			barTXT = barTXT.substring (0, 3000);
			document.location=popupURL+"&text=" + escape(barTXT);
		    } else document.location=popupURL;
	
		  } catch(err){
			popupURL = ImTranslatorBG.ImTranslator_URL + "?op=y&adet="+adet+"&a_s="+a_s+"&ad="+ad+"&ab="+ab+"&at="+at+"&gon=0&adi="+adi+"&v=" + ver + "&dir=" + dir +"&loc=" + loc +"&prvd=" + prvd ; 
		        window.resizeTo(495,625);
			document.location=popupURL;
  		  }		 
	      });
	   }  

	},300);
	break;
   case "5":
        var tab = chrome.tabs;
        var info = chrome.info;
	ImTranslatorBG.SL_WEB_PAGE_TRANSLATION_PRELOAD(info, tab);
        window.close();
	break;
   case "6":
        var tab = chrome.tabs;
        var info = chrome.info;
	ImTranslatorBG.SL_WEB_PAGE_TRANSLATION_MO_PRELOAD(info, tab);
        window.close();
	break;
   default:	
	var BACK_VIEW=FExtension.GET_localStorage("SL_BACK_VIEW");
	var STR1 = String(document.location);
	if(STR1.indexOf("text=")!=-1){
		var STR2 = STR1.split("text=");
		STR = "?text="+STR2[1];
	}else	STR = "?text="+TXT;
	STR = STR + "&stop=";	
	if(STR1.indexOf("&stop=")!=-1){
		STR = STR + "&stop=";
		STOP = 1;
	}
        if(window.location.pathname.indexOf("redirect.html")!=-1){
		if(BACK_VIEW==2) document.location="translation-back.html" + STR; 
		else		 document.location="translator.html" + STR + "&tb="; 
	}else{
		if(STOP == 0){
			if(BACK_VIEW==1) document.location="translator.html" + STR;
			else 		 document.location="translation-back.html" + STR; 
		}
	}
	FExtension.store.set("SL_PrefTrans","1");
  	chrome.storage.local.set({'SL_PrefTrans': "1"});
	break;
 }	


function ContMenuClick(s) {
		  s=s.replace(/(^[\s]+|[\s]+$)/g, '');

		  var theQ=s.split(" ").length;

		  if (theQ==1) theQ=s.split("\n").length;
		  if(FExtension.GET_localStorage("SL_dict")=="false") theQ=100;
 		  if(s.match(/[\u3400-\u9FBF]/) && s.length>1) theQ=100;
		  if(FExtension.GET_localStorage("SL_SaveText_box_gt")==1 && s!="") {
		        s=s.replace("undefined","");
		  }
		  var winWidth = 495;
		    if(theQ==1){
			var popupURL = "../popup/dictionary.html?text=" + s;
		    } else {
			s=s+"&stop=";
			s=encodeURIComponent(s);
			var popupURL = "../popup/translator.html?text=" + s;
		    }

		  var BACK_VIEW=FExtension.GET_localStorage("SL_BACK_VIEW");
		  

		  if(BACK_VIEW==2) var winHeight = 670; //540;
		  if(BACK_VIEW==1) var winHeight = 670;


		  if(FExtension.GET_localStorage("SL_show_back2")=="false") winHeight = 670; //540;

		  if(myWindowID){
			browser.windows.remove(myWindowID);
		  }
		  myWindow = browser.windows.create({
		    url: popupURL,
		    width: winWidth,
		    height: winHeight,
		    type: "popup"		    
		  });

	    	setTimeout(function(){
		  myWindow.then(onCreated, onError);
	        },350); //WAS 500 ms
}

function onUpdated (windowInfo) {	  
	  console.log(`Updated window: ${windowInfo.id}`);
}

function onCreated(windowInfo) {
	    myWindowID=windowInfo.id;
}

function onError (error) {
	  console.log(`Error: ${error}`);
}
