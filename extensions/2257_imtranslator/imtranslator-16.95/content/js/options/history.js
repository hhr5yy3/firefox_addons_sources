'use strict';
var SL_DARK="invert(95%)";
var SL_GLOBAL_RECORDS=0;
var SL_GLOBAL_SEGMENTS=0;
var SL_SEGMENT_LIMIT=200;
var SLclr1="#BE3B34";
var SLclr2="green";
var SL_TMP_SRC="";
var CurIND = 0;
var CurTTSIND = 0;
var GTTS_length=200;
var SL_TTS_STATE = localStorage["SL_SLVoices"];
           //vk HARDCODE for local tts;
		   SL_TTS_STATE = "1";
           //vk HARDCODE for local tts;

var EXPORTtab = 1;
var YSID = "";
var YSIDold = "";
var YSIDstatus = false;


var noVoice = FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extNo_Voice');
var ALLvoices = FExtension.bg.ImTranslatorBG.ALLvoices;
var SL_Languages = FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLanguages');
var SL_LanguagesExt = FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLanguagesNew');
var SL_ListOfAvailableLanguages = SL_Languages;
var SL_ListOfAvailableLanguagesExt = SL_LanguagesExt;

(function(){var h=GEBI("SL_delete");h.addEventListener("click",function(){SL_delete_all();},!1);} )();
(function(){var h=GEBI("SL_delete_2");h.addEventListener("click",function(){SL_delete_all();},!1);} )();
(function(){window.addEventListener("click",function(){REMOTE_Voice_Close();},!1);} )();
(function(){GEBI('SL_H_SEARCH').addEventListener("keyup",function(){REMOTE_Voice_Close();SL_FASTTIPE();},!1);} )();
(function(){GEBI('SL_clear_box').addEventListener("click",function(){SL_FASTTIPE_DEL();},!1);} )();
(function(){GEBI('SL_export').addEventListener("click",function(){SL_save_content_to_file();},!1);} )();
(function(){GEBI('SL_export_2').addEventListener("click",function(){SL_save_content_to_file();},!1);} )();
(function(){GEBI('SL_SORT').addEventListener("change",function(){REMOTE_Voice_Close();SL_SORT();},!1);} )();
(function(){GEBI("SL_info").addEventListener("click",function(){FExtension.browserPopup.openNewTab(this.href);},!1);} )();
(function(){GEBI("SL_LOC").addEventListener("change",function(){SL_SAVE_LOC();},!1);} )();

(function(){GEBI("SL_THEME").addEventListener("change",function(){SL_SAVE_THEME();},!1);} )();

//AUTOSAVE BLOCK
window.addEventListener('change',function(e){
	SL_SAVE();
},!1);
//AUTOSAVE BLOCK


(function(e){
	GEBI('SL_translate_container').style.opacity="1";
	CONSTRUCTOR();
        ACTIVATE_MENU_ELEMENT(5);
	setTimeout(function(e){
	  if(SL_getTMPdata("SL_anchor")!="") document.location="history.html#"+SL_getTMPdata("SL_anchor");
	},2500);

	INIT();
	SL_record_finder(e);
	if(SL_getTMPdata("SL_sort")=="") SL_setTMPdata("SL_sort","0");
	if(SL_getTMPdata("SL_sort")!="0" || SL_getTMPdata("SL_sort")!="" || SL_getTMPdata("SL_sort")!="undefined" ) {
	 GEBI("SL_SORT").value=SL_getTMPdata("SL_sort");
	}
 	SL_SORT();

})();

function CONSTRUCTOR(){
	GEBI('SL_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extHistory_ttl')));
	GEBI('SL_eth').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extEnTH')));
	GEBI('SL_History').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTHempty')));
	GEBI('SL_export_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extExportTH')));
	GEBI('SL_delete_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extClearTH')));
	GEBI('SL_search_box').title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSearch');
	GEBI('SL_clear_box').title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extClearText');
	GEBI('SL_ALL').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extAllRecords')));
	GEBI('SL_MOT').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extMOT')));
	GEBI('SL_Dictionary').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary')));
	GEBI('SL_il').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLOC')));
	GEBI('SL_theme_ttl').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTHEME')));
	GEBI('SL_theme_1').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extLIGHT')));
	GEBI('SL_theme_2').appendChild(document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDARK')));

 	var SL_THEMEmode = FExtension.GET_localStorage("THEMEmode");
 	if(SL_THEMEmode==0)  GEBI("SL_THEME").value = 0;
 	else GEBI("SL_THEME").value = 1;

	switch(PLATFORM){
	 case "Chrome": GEBI('SL_info').href="https://about.imtranslator.net/tutorials/presentations/imtranslator-translator-for-firefox/history-options/"; break;
	}
	ACTIVATE_THEME(FExtension.GET_localStorage("THEMEmode"));
}


 window.addEventListener('mousedown', function(e){
  if (e.target.id=="SL_BBL_VOICE"){
	  setTimeout(function(){
		tagClickDictTTS(e);
	  },500);
  }
  if (e.target.className=="_ALNK"){
	var text = e.target.title;
//	self.location="../../html/popup/dictionary.html?dir=en|ru&text="+text;
	//DST1
  }
 }, false);



function tagClickDictTTS(e){
 var SL_to = e.target.lang;
 var SL_text = e.target.title;
 if(e.target.id.indexOf("_listen")==-1){
  if(SL_to!="" && SL_text!=""){

           var text = SL_text;
	   // By VK HARDCODE for LOCAL MEDIA
	   var SL_TTS_STATE = "1";

	   switch(SL_TTS_STATE){
		case "0": if(ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1){
				if(text.length>GTTS_length) SL_MEDIA_HOST(SL_to, text); 
				else setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
			      } else setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
			  } else alert(noVoice);
			  break;
		case "1": if(ALLvoices.indexOf(SL_to)!=-1){
				if(G_TTS.indexOf(SL_to)!=-1) setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
				else alert(noVoice);
			  } else alert(noVoice);
			  break;
		case "2": if(ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1) SL_MEDIA_HOST(SL_to, text);
			      else setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
			  } else alert(noVoice);
			  break;
	   }

  }
 }
}


function INIT(){  
  GEBI("SL_LOC").value=FExtension.GET_localStorage("SL_LOCALIZATION");

  if(FExtension.GET_localStorage("SL_TH_1")==0) GEBI('SL_TH_1').checked=false;
  else GEBI('SL_TH_1').checked=true;

  if(FExtension.GET_localStorage("SL_TH_2")==0) GEBI('SL_TH_2').checked=false;
  else GEBI('SL_TH_2').checked=true;

  if(FExtension.GET_localStorage("SL_TH_3")==0) GEBI('SL_TH_3').checked=false;
  else GEBI('SL_TH_3').checked=true;

  if(FExtension.GET_localStorage("SL_TH_4")==0) GEBI('SL_TH_4').checked=false;
  else GEBI('SL_TH_4').checked=true;


  var mySL_HISTORY = FExtension.GET_localStorage("SL_History").replace(/'dictionary.html/g,"'../../html/popup/dictionary.html");
  mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
  mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");
  mySL_HISTORY = mySL_HISTORY.replace(/\\'/ig,"'");
  mySL_HISTORY = mySL_HISTORY.replace(/@/ig,"\n");

  if(mySL_HISTORY!=""){
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
      var TMP = TMP_HIST[z].split("~~");

      if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
      }

      var TMP_SRC=TMP[0].replace(/\n/g,"<br>");
      var TMP_DST=TMP[1].replace(/\n/g,"<br>");

      TMP_SRC=TMP_SRC.replace(/\\n/g,"<br>");
      TMP_DST=TMP_DST.replace(/\\n/g,"<br>");
      TMP[0] = TMP_SRC;
      TMP[1] = TMP_DST;

      var TMP_DIR = TMP[2].split("|");
      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);

      TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);
      var title="";
      var color="#fff";
      switch(TMP[5])
	{
	case '1': title="ImTranslator"; color="#FFFAE8"; break;
	case '2': title="Pop-up Bubble Translator"; color="#F2FFFD"; break;
	case '3': title="Webpage translation"; color="#FFF0E8"; break;
	case '4': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extMOT'); color="#E5FFE1"; break;
	case '5': title="Inline translator"; color="#FDEBFB"; break;
	case '6': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary'); color="#fbfbfb"; break;
	}
      var WAY1 = SL_TTSicn(TMP_DIR[0]);
      var WAY2 = SL_TTSicn(TMP_DIR[1]);
      var TTS1="";
      var TTS2="";
      var BUTTONS="";

      if(TMP[5]!='6'){
        TTS1 = "<img src='../../img/util/blank.png' lang='"+TMP_DIR[1]+"' id='SL_src_listen"+z+"'  class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
	TTS2 = "<img src='../../img/util/blank.png' lang='"+TMP_DIR[0]+"' id='SL_tar_listen"+z+"'  class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
      	BUTTONS = "<img src='../../img/util/split.png' id='SL_split"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSplit')+"'>&nbsp; <img src='../../img/util/open.png' id='SL_open"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extExpand')+"'>&nbsp; ";
      }
      if(TMP_SRC.length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')     TMP_SRC=TMP_SRC.substring(0,SL_SEGMENT_LIMIT)+" ...";
      if(TMP[1].length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')      TMP[1]=TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...";
      var NOURL="";


      if(TMP[5]=='3' || TMP[5]=='4'){
	TTS1=TTS1.replace(":visible",":hidden");
	TTS2=TTS2.replace(":visible",":hidden");
        BUTTONS="";
      } else {
        if(TMP[3].indexOf("{empty}")!=-1 || TMP[3]=="")NOURL="display:none;visibility:hidden";
      }

      if(TMP[5]=='6' && DIR_from != "Auto"){
        if(isTTSready(TMP_DIR[0])==true)  TTS2="<div id='SL_src_listen"+z+"' lang='"+TMP_DIR[0]+"' style='cursor:pointer;margin-bottom:5px;margin-left:5px;margin-right:5px;' class=TTS"+WAY1+" title='"+TMP_SRC+"' ></div>";
      }

      var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
      var TheClass2=SL_LTR_RTL(TMP_DIR[1]);
      var TheWidth="";
      var anchor=TMP[4].replace(/\s/g,"");

      var CONTROLS="<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'><span id='BLOCK"+z+"' lang='"+TMP_DIR[0]+"|"+TMP_DIR[1]+"' class='DIRS'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</span></td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='SL_url"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div>";

      if(TheClass1=="SL_rtl") TheWidth="90%";

      var anchor=TMP[4].replace(/\s/g,"");

      if(TMP[5]=='3' || TMP[5]=='4'){
        TMP[1] = TMP[0];
 	if(TMP[5]=='3') TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='urlDST"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_4URLS' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='urlSRC"+z+"' style='color:"+SLclr1+";cursor:pointer;' class='"+TheClass1+"'>"+TMP_SRC + "</div></div>"; 
 	if(TMP[5]=='4') TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='urlDST"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.store.get("SL_LOCALIZATION"),'extSeeSource')+"'></a>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.store.get("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_4URLS' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='urlSRC"+z+"' style='color:"+SLclr2+";cursor:pointer;' class='"+TheClass2+"'>"+TMP[1]+"</div></div>"; 
      } else{

       if(TMP[5]=='6'){
         if(WAY1!=1)  	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:right'>" +TTS2+ "</div><div class=SRC id='SRC"+z+"' style='float:right;'>"+TMP_SRC + "</div><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div>";
  	 else 		TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:left'>" +TTS2+ "</div><div class=SRC id='SRC"+z+"' style='float:left;'>"+TMP_SRC + "</div><br><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div>";
       } else {
       
	   switch(WAY1+"|"+WAY2)
		{
		case "1|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div>"; break;
		case "1|2":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div>"; break;
		case "2|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div>"; break;
		case "2|2": 	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div>"; break;
	 	}
       }	
      }	
      TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div class='SL_Hplayer_content' id='SL_Hplayer_content"+z+"'><span class='SL_Hplayer' id='SL_Hplayer"+z+"'></span><br></div>";
      
    }
    GEBI('SL_History').textContent="";

    TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});

    GEBI('SL_History').appendChild(TMP_HISTORY_LIST);   

    GEBI('SL_H_SEARCH').focus();
    OnOffTTSicon();
  }

 
 if(SL_getTMPdata("SL_sort")) GEBI("SL_SORT").value = SL_getTMPdata("SL_sort");
}

function SL_LTR_RTL(dir){
 var TheClass="SL_ltr";
 if(dir=="ar" || dir=="iw" || dir=="fa" || dir=="yi" || dir=="ur" || dir=="ps" || dir=="sd" || dir=="ckb" || dir=="ug" || dir=="dv" || dir=="prs")  var TheClass="SL_rtl";
 return(TheClass);
}

function GEBI(id){ return document.getElementById(id);}

function SL_delete_all(){
 var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
 if(isMac==false)  var r=confirm(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDoYou'));
 else r=true;
 if (r==true){
    FExtension.store.set("SL_History", "");
    chrome.storage.local.set({"SL_History": ""});
    document.location.reload();
 }
}

function SL_record_finder(){

    var tags = document.getElementsByClassName("_V");
    for (var i=0; i<tags.length; i++){
         tags[i].id="SL_0"+i;
	 tags[i].addEventListener('mousedown', function(e){ tagClickDictTTS(e) }, false);
    }
    var tags1 = document.getElementsByClassName("TTS1");
    for (i=0; i<tags1.length; i++){
         tags1[i].id="SL_0"+i;
	 tags1[i].addEventListener('mousedown', function(e){ tagClickDictTTS(e) }, false);
    }
    var tags2 = document.getElementsByClassName("TTS2");
    for (i=0; i<tags2.length; i++){
         tags2[i].id="SL_0"+i;
	 tags2[i].addEventListener('mousedown', function(e){ tagClickDictTTS(e) }, false);
    }

    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
     if(GEBI("SL_delete"+z)){
      if(GEBI("SL_delete"+z)){
       GEBI("SL_delete"+z).onclick=function(z){
          SL_DELETE_ONE(this.id.replace("SL_delete",""));
       };
      }
      if(GEBI("SL_src_listen"+z)){
       GEBI("SL_src_listen"+z).onclick=function(z){
          SL_StartTTS(1,this.id.replace("SL_src_listen",""));
	  CurTTSIND=this.id.replace("SL_src_listen","");
       };
      }
      if(GEBI("SL_tar_listen"+z)){
       GEBI("SL_tar_listen"+z).onclick=function(z){
          SL_StartTTS(2,this.id.replace("SL_tar_listen",""));
	  CurTTSIND=this.id.replace("SL_tar_listen","");
       };
      }
      if(GEBI("SL_open"+z)){
       GEBI("SL_open"+z).onclick=function(z){
          SL_OPEN(this.id.replace("SL_open",""));
       };
      }
      if(GEBI("SL_split"+z)){
       GEBI("SL_split"+z).onclick=function(z){
          var tmp = this.id.replace("SL_split","");
          SL_SPLIT(tmp);
          CurTTSIND = tmp;
       };
      }

      if(GEBI("SL_url"+z)){
       GEBI("SL_url"+z).onclick=function(z){
          SL_SEE_URL(this.id.replace("SL_url",""),0);
       };
      }

      if(GEBI("urlSRC"+z)){
       GEBI("urlSRC"+z).onclick=function(z){
	    SL_SEE_URL(this.id.replace("urlSRC",""),0);

       };
      }

      if(GEBI("urlDST"+z)){
       GEBI("urlDST"+z).onclick=function(z){
		SL_SEE_URL(this.id.replace("urlDST",""),2);          
       };
      }


      if(GEBI("NEWSRC"+z)){
       var SLsrc=GEBI("NEWSRC"+z).textContent.replace(/<\/?[^>]+(>|$)/g, "")
       SLsrc=SLsrc.substring(0,4);
       if(SLsrc=="http"){
        GEBI("NEWSRC"+z).onclick=function(z){
          SL_SEE_URL(this.id.replace("NEWSRC",""),1);
        };
       }
      }

      if(GEBI("NEWDST"+z)){
       var SLdst=GEBI("NEWDST"+z).textContent.replace(/<\/?[^>]+(>|$)/g, "")
       SLdst=SLdst.substring(0,4);
       if(SLdst=="http"){
        GEBI("NEWDST"+z).onclick=function(z){
          SL_SEE_URL(this.id.replace("NEWDST",""),0);
        };
       }
      }

      for(var t=0; t<SL_GLOBAL_SEGMENTS; t++){
       if(GEBI("NEWSRC_"+z+"_"+t)){
        GEBI("NEWSRC_"+z+"_"+t).onclick=function(){
          var t1 = this.innerHTML.split('dir="');
          var t2 = t1[1].split('"');
          SL_TTS_SEGMENT(0,this,t2[0]);
        };
        GEBI("NEWDST_"+z+"_"+t).onclick=function(){
          var t1 = this.innerHTML.split('dir="');
          var t2 = t1[1].split('"');
          SL_TTS_SEGMENT(1,this,t2[0]);
        };
       }
      }
     }
    }


     var tags3 = document.getElementsByName("SL_seg");
     for (i=0; i<tags3.length; i++){
//         tags3[i].id="SL_History_block"+i;
	 tags3[i].addEventListener('mouseover', function(e){ DicSetAnchor(e); }, false);
     }


     var tags4 = document.getElementsByClassName("SL_delete");
     for (i=0; i<tags4.length; i++){
 ///        tags4[i].id="SL_delete"+i;
	 tags4[i].addEventListener('mouseover', function(e){ DelSetAnchor(e); }, false);
     }

     var tags5 = document.getElementsByClassName("SL_History_block");
     for (i=0; i<tags5.length; i++){
	 tags5[i].addEventListener('click', function(e){ GetSegment(e); }, false);
     }
    ACTIVATE_THEME(FExtension.GET_localStorage("THEMEmode"));
}


function GetSegment(e){
  if(e.currentTarget.id!="" && e.currentTarget.id.indexOf("SL_History_block")!=-1){
   var ind = e.currentTarget.id.replace("SL_History_block","");
   CurTTSIND=ind;
  } 
}

function SL_DELETE_ONE(ind){
  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
  if(mySL_HISTORY!=""){
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      if(ind != z){
       TMP_HISTORY_LIST = TMP_HISTORY_LIST + TMP_HIST[z]+"^^"; 
      }
    }
    FExtension.store.set("SL_History", TMP_HISTORY_LIST);
    chrome.storage.local.set({"SL_History": TMP_HISTORY_LIST});
    document.location.reload();
  }
}
function DicSetAnchor(e){
 if(e.target.id!="" && e.target.id.indexOf("SL_History_block")!=-1){
  var ind = e.target.id.replace("SL_History_block","");
  CurIND=ind;
  if(GEBI("SL_TS"+ind)){
	  var ts = GEBI("SL_TS"+ind).name;
	  SL_setTMPdata("SL_anchor",ts);
  }
 }
}


function DelSetAnchor(e){
 if(e.target.id!="" && e.target.id.indexOf("SL_delete")!=-1){
  var ind = e.target.id.replace("SL_delete","");
  if(ind!=0) ind=ind-1;
  var ts = GEBI("SL_TS"+ind).name;
  SL_setTMPdata("SL_anchor",ts);
 }
}


function SL_SEE_URL(ind,st){
  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
  mySL_HISTORY = unescape(mySL_HISTORY);
  if(mySL_HISTORY!=""){
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      if(ind == z){
       var TMP = TMP_HIST[z].split("~~");

      if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
      }

       var TMPurl = TMP[3];
       var HOMEurl = TMP[0];

       if(st==1){
         var theURL = TMP[3].split("&u=");
         TMP[3] = theURL[1];
       }else{
         if(st==2 && (TMP[5]=='3' || TMP[5]=='4' || TMP[5]=='6')){
          var theURL = TMP[3].split("&u=");
          TMP[3] = theURL[1];
         }
       }


       if(st==2) {
		if(TMPurl.indexOf("&u="+HOMEurl)!=-1)	TMPurl = HOMEurl;
       }

       if(String(TMP[3])=="undefined" && TMPurl!="") TMP[3] = TMPurl;

       if(String(TMP[3]).indexOf('chrome://imtranslator/content/html/')!=-1) TMP[3] = "undefined";
       if(String(TMP[3])!="undefined" && String(TMP[3])!="" )        FExtension.browserPopup.openNewTab(TMPurl);

      }
    }
  }
}



function SL_GET_LANG_NAME(code){
  if(code=="zh") code="zh-CN";
  if(code=="zt") code="zh-TW";
  var resp="Auto";
  var SL_TMPTMP1=SL_ListOfAvailableLanguages.split(",")
  for (var i = 0; i < SL_TMPTMP1.length; i++) {
    var SL_TMPTMP2 = SL_TMPTMP1[i].split(":");
    if (SL_TMPTMP2[0] == code) {
      resp = SL_TMPTMP2[1];
    }
  }
  return(resp);
}

function SL_StartTTS(st,ind){
  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
  mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
  mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");

  if(mySL_HISTORY!=""){
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      if(ind == z){
       var TMP = TMP_HIST[z].split("~~");

       if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
       }


       var TMP_DIR = TMP[2].split("|");
       TMP[0] =TMP[0].replace(/<br>/g," ");
//       TMP[0] =TMP[0].replace(/@/g," ");
       TMP[1] =TMP[1].replace(/<br>/g," ");
       if(st==1){
           var SL_to = TMP_DIR[0];
           SL_to = SL_to.replace("zh-CN","zh");
           SL_to = SL_to.replace("zh-TW","zh");


           var text = TMP[0];
	   switch(SL_TTS_STATE){
		case "0": if(ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1){
				if(text.length>GTTS_length) SL_MEDIA_HOST(SL_to, text); 
				else setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
			      } else setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
			  } else alert(noVoice);
			  break;
		case "1": if(ALLvoices.indexOf(SL_to)!=-1){
				if(G_TTS.indexOf(SL_to)!=-1) setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
				else alert(noVoice);
			  } else alert(noVoice);
			  break;
		case "2": if(ALLvoices.indexOf(SL_to)!=-1){
                              if(SL_TTS.indexOf(SL_to)!=-1) SL_MEDIA_HOST(SL_to, text);
			      else setTimeout(function(){REMOTE_Voice(SL_to,text);}, 500);
			  } else alert(noVoice);
			  break;
	   }
       }else{
           var SL_from = TMP_DIR[1];
           SL_from = SL_from.replace("zh-CN","zh");
           SL_from = SL_from.replace("zh-TW","zh");


           var text = TMP[1];
	   switch(SL_TTS_STATE){
		case "0": if(ALLvoices.indexOf(SL_from)!=-1){
                              if(SL_TTS.indexOf(SL_from)!=-1){
				if(text.length>GTTS_length) SL_MEDIA_HOST(SL_from, text);
				else setTimeout(function(){REMOTE_Voice(SL_from,text);}, 500);
			      } else setTimeout(function(){REMOTE_Voice(SL_from,text);}, 500);
			  } else alert(noVoice);
			  break;
		case "1": if(ALLvoices.indexOf(SL_from)!=-1){
				if(G_TTS.indexOf(SL_from)!=-1) setTimeout(function(){REMOTE_Voice(SL_from,text);}, 500);
				else alert(noVoice);
			  } else alert(noVoice);
			  break;
		case "2": if(ALLvoices.indexOf(SL_from)!=-1){
                              if(SL_TTS.indexOf(SL_from)!=-1) SL_MEDIA_HOST(SL_from, text);
			      else setTimeout(function(){REMOTE_Voice(SL_from,text);}, 500);
			  } else alert(noVoice);
			  break;
	   }


       }
      }
    }
  }
}

function SL_OPEN(ind){
  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
  mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
  mySL_HISTORY = DOMPurify.sanitize (mySL_HISTORY);
  mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");

  if(mySL_HISTORY!=""){
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      if(ind == z){
       TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
       var TMP = TMP_HIST[z].split("~~");

       if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
       }

      var TMP_SRC=TMP[0].replace(/\n/g,"<br>");
      var TMP_DST=TMP[1].replace(/\n/g,"<br>");

      TMP_SRC=TMP_SRC.replace(/\\n/g,"<br>");
      TMP_DST=TMP_DST.replace(/\\n/g,"<br>");
      TMP[0] = TMP_SRC;
      TMP[1] = TMP_DST;

       var TMP_DIR = TMP[2].split("|");
       var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
       var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
       var DS=TMP_DIR[0];
       var DT=TMP_DIR[1];

       TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);
       var title="";
       var color="#fff";
       switch(TMP[5]){
	case '1': title="ImTranslator"; color="#FFFAE8"; break;
	case '2': title="Pop-up Bubble Translator"; color="#F2FFFD"; break;
	case '3': title="Webpage translation"; color="#FFF0E8"; break;
	case '4': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extMOT'); color="#E5FFE1"; break;
	case '5': title="Inline translator"; color="#FDEBFB"; break;
	case '6': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary'); color="#fbfbfb"; break;
       }

       var TTS1="";
       var TTS2="";
       var WAY1 = SL_TTSicn(TMP_DIR[0]);
       var WAY2 = SL_TTSicn(TMP_DIR[1]);

       if(TMP[5]!='6'){
	 TTS1 = "<img src='../../img/util/blank.png' id='SL_src_listen"+z+"'  class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
	 TTS2 = "<img src='../../img/util/blank.png' id='SL_tar_listen"+z+"'  class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
       }

       var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
       var TheClass2=SL_LTR_RTL(TMP_DIR[1]);

       var OUTPUT="";

       if(GEBI("SRC"+ind).textContent.indexOf(" ...")!=-1 || TMP[0].length < SL_SEGMENT_LIMIT  || TMP[1].length < SL_SEGMENT_LIMIT){
           GEBI("SRC"+ind).textContent="";
           GEBI("DST"+ind).textContent="";
	   switch(WAY1+"|"+WAY2) {
		case "1|1":     OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP[0] + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div><br>"; break;
		case "1|2":     OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP[0] + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+ind+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div><br>"; break;
		case "2|1":     OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[0]+"</div></div> <hr color='#CCC' size=0 width='99%'><div id='DST"+ind+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div><br>"; break;
		case "2|2": 	OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[0]+"</div></div> <hr color='#CCC' size=0 width='99%'><div id='DST"+ind+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div><br>"; break;
  	   }

	   OUTPUT = DOMPurify.sanitize (OUTPUT, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
    	   GEBI("SRC"+ind).appendChild(OUTPUT);   

           GEBI("SL_open"+ind).title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extCollapse');
       }else{
           GEBI("SRC"+ind).textContent="";
           GEBI("DST"+ind).textContent="";
	   switch(WAY1+"|"+WAY2) {
		case "1|1":     OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP[0].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div><br>"; break;
		case "1|2":     OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP[0].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+ind+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div><br>"; break;
		case "2|1":     OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+TMP[0].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+ind+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div><br>"; break;
		case "2|2": 	OUTPUT = "<div id='SRC"+ind+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+TMP[0].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+ind+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...</div></div><br>"; break;
  	   }
	   OUTPUT = DOMPurify.sanitize (OUTPUT, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
    	   GEBI("SRC"+ind).appendChild(OUTPUT);   

           GEBI("SL_open"+ind).title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extExpand');
       }
      }
    OnOffTTSicon();
    }
  SL_record_finder();
  }
}


function SL_FASTTIPE(){
        GEBI('SL_History').textContent="";
	var FT = GEBI('SL_H_SEARCH').value;
	if(FT == "") document.location.reload();
	else  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
        mySL_HISTORY = mySL_HISTORY.replace(/<br>/g," ");
        mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
        mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");
	mySL_HISTORY = mySL_HISTORY.replace(/\\'/ig,"'");
	mySL_HISTORY = mySL_HISTORY.replace(/@/ig,"\n");
		if(mySL_HISTORY!=""){
			var TMP_HIST=mySL_HISTORY.split("^^");
			var TMP_HISTORY_LIST="";
			SL_GLOBAL_RECORDS=TMP_HIST.length-1;

			for(var z=0; z<SL_GLOBAL_RECORDS; z++){
				if(GEBI('SL_Hplayer_content'+z)) GEBI('SL_Hplayer_content'+z).style.display='none';
			}

			for(var z=0; z<SL_GLOBAL_RECORDS; z++){
				var TMP = TMP_HIST[z].split("~~");
				if(TMP.length==6){
					TMP_HIST[z]=TMP_HIST[z]+"~~G";
					TMP = TMP_HIST[z].split("~~");
				}

			      	var TMP_SRC=TMP[0].replace(/\n/g,"<br>");
				var TMP_DST=TMP[1].replace(/\n/g,"<br>");
				TMP_SRC=TMP_SRC.replace(/\\n/g,"<br>");
				TMP_DST=TMP_DST.replace(/\\n/g,"<br>");
				TMP[0] = TMP_SRC;
				TMP[1] = TMP_DST;

				var TMP_DIR = TMP[2].split("|");
				TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);
				var title="";
				var color="#fff";
				switch(TMP[5])	{
					case '1': title="ImTranslator"; color="#FFFAE8"; break;
					case '2': title="Pop-up Bubble Translator"; color="#F2FFFD"; break;
					case '3': title="Webpage translation"; color="#FFF0E8"; break;
					case '4': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extMOT'); color="#E5FFE1"; break;
					case '5': title="Inline translator"; color="#FDEBFB"; break;
					case '6': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary'); color="#fbfbfb"; break;
				}

				var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
				var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
				var F = TMP_DIR[0];
				var DS=TMP_DIR[0];
				var DT=TMP_DIR[1];

				var WAY1 = SL_TTSicn(TMP_DIR[0]);
				var WAY2 = SL_TTSicn(TMP_DIR[1]);
				var TTS1="";
				var TTS2="";
				var BUTTONS="";

				var flag=0;
				if(TMP[5]!='6'){
					TTS1 = "<img src='../../img/util/blank.png' id='SL_src_listen"+z+"'  class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
					TTS2 = "<img src='../../img/util/blank.png' id='SL_tar_listen"+z+"'  class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
				      	BUTTONS = "<img src='../../img/util/split.png' id='SL_split"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSplit')+"'>&nbsp; <img src='../../img/util/open.png' id='SL_open"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extExpand')+"'>&nbsp; ";
			 	}

				if(TMP_SRC.length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')     TMP_SRC=TMP_SRC.substring(0,SL_SEGMENT_LIMIT)+" ...";
				if(TMP[1].length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')      TMP[1]=TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...";
				var NOURL="";
				var MouseOver="";

				if(TMP[5]=='3' || TMP[5]=='4'){
					TTS1=TTS1.replace(":visible",":hidden");
					TTS2=TTS2.replace(":visible",":hidden");
				        BUTTONS="";
				        TMP[1] = TMP_SRC;
					MouseOver=";cursor:pointer;";
				} else {
				        if(TMP[3].indexOf("{empty}")!=-1 || TMP[3]=="")NOURL="display:none;visibility:hidden";
				}
           
			        if(TMP[5]=='6' && DIR_from != "Auto"){
				if(isTTSready(TMP_DIR[0])==true) TTS2="<div id='SL_src_listen"+z+"' lang='"+TMP_DIR[0]+"' style='cursor:pointer;margin-bottom:5px;margin-left:5px;margin-right:5px;' class=TTS"+WAY1+" title='"+TMP_SRC+"' ></div>";
			}
      
			var STYLE="<font color=white style='background:#BE3B34;'>";

		        if(TMP_SRC.indexOf(FT)!=-1 || TMP[1].indexOf(FT)!=-1 || TMP[3].indexOf(FT)!=-1 || TMP[4].indexOf(FT)!=-1 || DIR_from.indexOf(FT)!=-1 || DIR_to.indexOf(FT)!=-1){
			        TMP_SRC=TMP_SRC.replace(FT,"<font "+STYLE+FT+"</font>");
			        if(TMP[5]=='6'){
					flag=STRIP_HTML(FT,TMP[1],STYLE+FT);
			        }
			        if(flag==0){
				        TMP[1]=TMP[1].replace(FT,"<font "+STYLE+FT+"</font>");
			        }
			        TMP[4]=TMP[4].replace(FT,"<font "+STYLE+FT+"</font>");
			        DIR_from=DIR_from.replace(FT,"<font "+STYLE+FT+"</font>");
			        DIR_to=DIR_to.replace(FT,"<font "+STYLE+FT+"</font>");
			        var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
			        var TheClass2=SL_LTR_RTL(TMP_DIR[1]);
				var TheWidth="";
			        var anchor=TMP[4].replace(/\s/g,"");
				var CONTROLS="<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'><span lang='"+TMP_DIR[0]+"|"+TMP_DIR[1]+"' class='DIRS'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</span></td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='SL_url"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div>";
				if(TheClass1=="SL_rtl") TheWidth="90%";
				if(TMP[5]=='3' || TMP[5]=='4'){
				        TMP[1] = TMP[0];
				 	if(TMP[5]=='3') TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='urlDST"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='urlSRC"+z+"' style='color:"+SLclr1+";cursor:pointer;' class='"+TheClass1+"'>"+TMP_SRC + "</div></div>"; 
				 	if(TMP[5]=='4') TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='urlDST"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='urlSRC"+z+"' style='color:"+SLclr1+";cursor:pointer;' class='"+TheClass1+"'>"+TMP_SRC + "</div></div>"; 
				}else{
				       	if(TMP[5]=='6'){
				       		if(WAY1!=1)  	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:right'>" +TTS2+ "</div><div id='SRC"+z+"' style='float:right;' class=SRC>"+TMP_SRC + "</div><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div>";
				  		else 		TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:left'>" +TTS2+ "</div><div id='SRC"+z+"' style='float:left;' class=SRC>"+TMP_SRC + "</div><br><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div>";
				       	} else {
						switch(WAY1+"|"+WAY2){
							case "1|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div>"; break;
							case "1|2":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div>"; break;
							case "2|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div>"; break;
							case "2|2": 	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div>"; break;
						}
				       	}	
				}
			        TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div class='SL_Hplayer_content' id='SL_Hplayer_content"+z+"'><span class='SL_Hplayer' id='SL_Hplayer"+z+"'></span><br></div>";
			}
			if(TMP_HISTORY_LIST=="") TMP_HISTORY_LIST="No records found";




		  }
			TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
			GEBI('SL_History').appendChild(TMP_HISTORY_LIST);   

	 }
 
 SL_record_finder();
 GEBI('SL_H_SEARCH').focus();
 OnOffTTSicon();
}

function STRIP_HTML(w,str,st){
 return 1;
}


function SL_FASTTIPE_DEL(){
 GEBI('SL_H_SEARCH').value='';
 SL_FASTTIPE();
}


function SL_save_content_to_file(){
    var content = FExtension.GET_localStorage("SL_History");
    var T0,T1,T2,T3,T4,T5,T6,T7,t,r=0,POS,TR,RT;
    var TMP_HIST=content.split("^^");
    var TMP_HISTORY_LIST="Date,Time,Translation tool,Source url,Translation direction,Source text,Translation,Part of speech,Reverse translation"+",\r,\n";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;

    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      if(TMP_HIST[z].indexOf('id="SL_H"')>-1){
	var Ztp=TMP_HIST[z].split('<div id="_Y">');
	var ctemp=Ztp[0].split("~~");
        var coLine=ctemp[0].trim()+"~~";
	for(var l=1; l<Ztp.length; l++) coLine = coLine+'<div id="_Y">'+Ztp[l];
        TMP_HIST[z] = coLine.replace(/"/g, "");
	TMP_HIST[z] = TMP_HIST[z].replace(/ style=text-align: left;/g,"");
	TMP_HIST[z] = TMP_HIST[z].replace(/ style=text-align: right;/g,"");
      }	

      var TMP = TMP_HIST[z].split("~~");

      if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
      }



      var TMP_SRC="";
      var TMP_DST="";


      if(EXPORTtab==0){
	      TMP_SRC=TMP[0];
	      TMP_SRC=TMP_SRC.replace(/<br>/g,"\n");
	      TMP_DST=TMP[1];
	      TMP_DST=TMP_DST.replace(/<br>/g,"\n");
      } else {
	      TMP_SRC=TMP[0].replace(/<br>/g," ");
	      TMP_SRC=TMP_SRC.replace(/\\n/g," ");
	      TMP_SRC=TMP_SRC.replace(/\n/g," ");
	      TMP_DST=TMP[1].replace(/<br>/g," ");
	      TMP_DST=TMP_DST.replace(/\\n/g," ");
	      TMP_DST=TMP_DST.replace(/\n/g," ");
      }

      TMP_SRC=TMP_SRC.replace(/"/g,"'");
      TMP_DST=TMP_DST.replace(/"/g,"'");
      TMP_SRC = "\""+TMP_SRC+"\"";
      TMP_DST = "\""+TMP_DST+"\"";

      var TMP_DIR = TMP[2].split("|");
      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
      DIR_from = DIR_from.replace("&nbsp;"," ");
      DIR_to   = DIR_to.replace("&nbsp;"," ");
      var title="ImTranslator";

      switch(TMP[5])
	{
	case '1': title="ImTranslator"; break;
	case '2': title="Pop-up Bubble Translator"; break;
	case '3': title="Webpage Translation"; break;
	case '4': title="Mouseover Translation"; break;
	case '5': title="Inline Translation"; break;
	case '6': title="Dictionary"; break;
	}

	if(TMP[5]!='6'){
 	        if(TMP[3]=="undefined") TMP[3]="Url unknown";
	        TMP_HISTORY_LIST = TMP_HISTORY_LIST + TMP[4] + "," + title + "," + TMP[3] + "," + DIR_from + ">" + DIR_to + "," + TMP_SRC + "," + TMP_DST + ",,,,\r\n"; 
	} else {
	   if(TMP_HIST[z].indexOf("<div")!=-1){
		TMP_DST=TMP_DST.replace(/<a\b[^>]*>/ig,"");
		TMP_DST=TMP_DST.replace(/'/ig,"");
		TMP_DST=TMP_DST.replace(/<\/a>/ig,"");

		T1 = TMP_DST.split("<div id=_Y>");

                if(T1.length>1){
		  for(t=1; t<T1.length; t++){
                    T2 = T1[t].split("</div>");
                    POS = T2[0];
                    T3 = T1[t].split("<div id=_AL>");

                    for(r=1; r<T3.length; r++){
                 	T5 = T3[r].split("</div>");
  	                TR = T5[0].replace(/(<([^>]+)>)/ig,"");
  	                if(TR==""){
                         T3[r] = T3[r].replace(/ margin-left: 5px;/g,"");
                 	 T4 = T3[r].split("<div id=_XR>");
                 	 T5 = T4[1].split("</div");
  	                 TR = T5[0].replace(/(<([^>]+)>)/ig,"");
  	                }
  	                if(T3[r].indexOf("<div id=_AR>")!=-1){
                  		T6 = T3[r].split("<div id=_AR>");
                 		T7 = T6[1].split("</div>");
  	                	RT = T7[0].replace(/(<([^>]+)>)/ig,"");
                        	RT = RT.replace(/,/ig,";");
                        } else RT="";
	 	        if(TMP[3]=="undefined") TMP[3]="Url unknown";
	            	if(t==1 && r==1){
			 TMP_HISTORY_LIST = TMP_HISTORY_LIST + TMP[4] + "," + title + "," + TMP[3] + "," + DIR_from + ">" + DIR_to + "," + TMP_SRC + "," + TR + "," + POS + "," + RT + "\r\n"; 
	            	}else{
			 TMP_HISTORY_LIST = TMP_HISTORY_LIST +",,,,,," + TR + "," + POS + "," + RT + "\r\n"; 
			}
	            }
	          }
	        } else {
		  T0 = TMP_DST.split("<div id=_X>");
		  for(t=1; t<T0.length; t++){
                    T2 = T0[t].split("</div>");
                    POS = T2[0];
                    T3 = T0[t].split("<div id=_XL>");

                    for(r=1; r<T3.length; r++){
                 	T5 = T3[r].split("</div>");
  	                TR = T5[0].replace(/(<([^>]+)>)/ig,"");
  	                if(TR==""){
                         T3[r] = T3[r].replace(/ margin-left: 5px;/g,"");
                 	 T4 = T3[r].split("<div id=_XR>");
                 	 T5 = T4[1].split("</div");
  	                 TR = T5[0].replace(/(<([^>]+)>)/ig,"");
  	                }
  	                if(TMP[3]=="undefined") TMP[3]="Url unknown";
			TMP_HISTORY_LIST = TMP_HISTORY_LIST + TMP[4] + "," + title + "," + TMP[3] + "," + DIR_from + ">" + DIR_to + "," + TMP_SRC + "," + TR + "\r\n"; 
	            }
	          }
		}
	    } else {
 	        if(TMP[3]=="undefined") TMP[3]="Url unknown";
		TMP_HISTORY_LIST = TMP_HISTORY_LIST + TMP[4] + "," + title + "," + TMP[3] + "," + DIR_from + ">" + DIR_to + "," + TMP_SRC + "," + TMP_DST + ",,,,\r\n"; 
	    }
	}
    }

 TMP_HISTORY_LIST = unescape(TMP_HISTORY_LIST.replace(/(<([^>]+)>)/ig, ""));   

 TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST);

 Export(TMP_HISTORY_LIST, 'export.csv', 'text/csv');
}


function Export(content, fileName, mimeType) {
  content="\uFEFF"+content;
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream;charset=utf-16,';
  if (navigator.msSaveBlob) { // IE10
    return navigator.msSaveBlob(new Blob([content], { type: mimeType }),     fileName);
  } else if ('download' in a) { //html5 A[download]
    a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    setTimeout(function() {
      a.click();
      document.body.removeChild(a);
    }, 66);
    return true;
  } else { //do iframe dataURL download (old ch+FF):
    var f = document.createElement('iframe');
    document.body.appendChild(f);
    f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);
    setTimeout(function() {
      document.body.removeChild(f);
    }, 333);
    return true;
  }
}



function GetLongProviderNmae(pid){
 var LN="";
  for(var I=0; I<LISTofPR.length; I++){
     if(LISTofPR[I][0] == pid) LN=LISTofPR[I];
  }
 return(LN);
}



function SL_SORT() {
  GEBI('SL_History').textContent="";
  setTimeout(function(e){
	  if(SL_getTMPdata("SL_anchor")!="") document.location="history.html#"+SL_getTMPdata("SL_anchor");
  },100);

 GEBI('SL_H_SEARCH').value="";
 SL_setTMPdata("SL_sort",GEBI("SL_SORT").value.toString());
 var mySL_HISTORY = FExtension.GET_localStorage("SL_History").replace(/'dictionary.html/g,"'../../html/popup/dictionary.html");
 mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
 mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");
 mySL_HISTORY = mySL_HISTORY.replace(/\\'/ig,"'");
 mySL_HISTORY = mySL_HISTORY.replace(/@/ig,"\n");
 mySL_HISTORY = DOMPurify.sanitize (mySL_HISTORY);

 if(mySL_HISTORY!=""){
  var TMP_HIST=mySL_HISTORY.split("^^");
  var TMP_HISTORY_LIST="";
  SL_GLOBAL_RECORDS=TMP_HIST.length-1;

    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
      if(GEBI('SL_Hplayer_content'+z)) GEBI('SL_Hplayer_content'+z).style.display='none';
    }


  switch(GEBI("SL_SORT").value){

         // ALL RECORDS--------------------------------
   case "0":   INIT(); break;

         // ALL IT, BBL, IT ---------------------------
   case "1": 
   case "2": 
   case "5": 
	SL_setTMPdata("SL_anchor","");
	    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
	      TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
	      var TMP = TMP_HIST[z].split("~~");

	      if(TMP.length==6){
		 TMP_HIST[z]=TMP_HIST[z]+"~~G";
		 TMP = TMP_HIST[z].split("~~");
	      }

	      var TMP_SRC=TMP[0].replace(/\n/g,"<br>");
	      var TMP_DST=TMP[1].replace(/\n/g,"<br>");
	      TMP_SRC=TMP_SRC.replace(/\\n/g,"<br>");
	      TMP_DST=TMP_DST.replace(/\\n/g,"<br>");
	      TMP[0] = TMP_SRC;
	      TMP[1] = TMP_DST;

//	      var TMP_SRC=TMP[0];//.replace(/@/g,"<br>");
//	      var TMP_DST=TMP[1];//.replace(/@/g,"<br>");
	      var TMP_DIR = TMP[2].split("|");
	      TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);

	      var title="";
	      var color="#fff";

	      switch(TMP[5])
		{
		case '1': title="ImTranslator"; color="#FFFAE8"; break;
		case '2': title="Pop-up Bubble Translator"; color="#F2FFFD"; break;
		case '3': title="Webpage translation"; color="#FFF0E8"; break;
		case '4': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extMOT'); color="#E5FFE1"; break;
		case '5': title="Inline translator"; color="#FDEBFB"; break;
		case '6': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary'); color="#fbfbfb"; break;
		}

	      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
	      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
	      var F=TMP_DIR[1];
	      var DS=TMP_DIR[0];
	      var DT=TMP_DIR[1];

	      var WAY1 = SL_TTSicn(TMP_DIR[0]);
	      var WAY2 = SL_TTSicn(TMP_DIR[1]);
	      var TTS1="";
	      var TTS2="";
	      var BUTTONS="";
              var anchor=TMP[4].replace(/\s/g,"");
	      if(TMP[5]!='6'){
		TTS1 = "<img src='../../img/util/blank.png' id='SL_src_listen"+z+"'  class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
		TTS2 = "<img src='../../img/util/blank.png' id='SL_tar_listen"+z+"'  class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
        	BUTTONS = "<img src='../../img/util/split.png' id='SL_split"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSplit')+"'>&nbsp; <img src='../../img/util/open.png' id='SL_open"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extExpand')+"'>&nbsp; ";
	      }
	      if(TMP_SRC.length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')     TMP_SRC=TMP_SRC.substring(0,SL_SEGMENT_LIMIT)+" ...";
	      if(TMP[1].length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')      TMP[1]=TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...";
	      var NOURL="";
	      var MouseOver="";

	      if(TMP[5]=='3' || TMP[5]=='4'){
		TTS1=TTS1.replace(":visible",":hidden");
		TTS2=TTS2.replace(":visible",":hidden");
	      } else {
	        if(TMP[3].indexOf("{empty}")!=-1 || TMP[3]=="")NOURL="display:none;visibility:hidden";
	      }

	      if(TMP[5]=='6' && DIR_from != "Auto"){
        	if(isTTSready(TMP_DIR[0])==true) TTS2="<div id='SL_src_listen"+z+"' lang='"+TMP_DIR[0]+"' style='cursor:pointer;margin-bottom:5px;margin-left:5px;margin-right:5px;' class=TTS"+WAY1+" title='"+TMP_SRC+"' ></div>";
	      }

      
	      var STYLE="<font color=white style='background:#BE3B34;'>";
	      if(TMP[5]==GEBI("SL_SORT").value || GEBI("SL_SORT").value == 0){
		      var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
		      var TheClass2=SL_LTR_RTL(TMP_DIR[1]);
		      var TheWidth="";
		      var CONTROLS="<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'><span lang='"+TMP_DIR[0]+"|"+TMP_DIR[1]+"' class='DIRS'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</span></td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='SL_url"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div>";

		      if(TheClass1=="SL_rtl") TheWidth="90%";
		      var anchor=TMP[4].replace(/\s/g,"");
		      if(TMP[5]=='3' || TMP[5]=='4'){
		        TMP[1] = TMP[0];
	 		TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='SL_url"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' style='color:"+SLclr1+";cursor:pointer;' class='"+TheClass1+"'>"+TMP_SRC + "</div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' style='color:"+SLclr2+";cursor:pointer;' class='"+TheClass2+"'>"+TMP[1]+"</div></div><br>"; 
		      } else{
		       if(TMP[5]=='6'){
        		 if(WAY1!=1)  	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:right'>" +TTS2+ "</div><div id='SRC"+z+"' style='float:right;' class=SRC>"+TMP_SRC + "</div><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div><br>";
		  	 else 		TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:left'>" +TTS2+ "</div><div id='SRC"+z+"' style='float:left;' class=SRC>"+TMP_SRC + "</div><br><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div><br>";
		       } else {

			   switch(WAY1+"|"+WAY2){
				case "1|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div><br>"; break;
				case "1|2":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div><br>"; break;
				case "2|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div><br>"; break;
				case "2|2": 	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div><br>"; break;
			   }
		       }	
		      }	

	      }
      TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div class='SL_Hplayer_content' id='SL_Hplayer_content"+z+"'><span class='SL_Hplayer' id='SL_Hplayer"+z+"'></span><br></div>";
    }

    if(TMP_HISTORY_LIST=="") TMP_HISTORY_LIST="No records found";

    TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
    GEBI('SL_History').appendChild(TMP_HISTORY_LIST);   
    if(GEBI('SL_H_SEARCH').value!="")SL_FASTTIPE();
    OnOffTTSicon();
    break;

	// WPT ----------------------------------
   case "3":
    SL_setTMPdata("SL_anchor","");  
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
     TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
     var TMP = TMP_HIST[z].split("~~");
     if(TMP[5]=='3'){
      if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
      }
      var TMP_SRC=TMP[0];//.replace(/@/g,"<br>");
      var TMP_DST=TMP[1];//.replace(/@/g,"<br>");
      var TMP_DIR = TMP[2].split("|");
      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
      TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);
      var title="Webpage translation"; 
      var color="#FFF0E8"; 
      var WAY1 = SL_TTSicn(TMP_DIR[0]);
      var WAY2 = SL_TTSicn(TMP_DIR[1]);
      var TTS1="";
      var TTS2="";
      var BUTTONS="";
      TMP[1] = TMP[0];
      var anchor=TMP[4].replace(/\s/g,"");
      TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='urlDST"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_4URLS' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='urlSRC"+z+"' style='color:"+SLclr1+";cursor:pointer;' class='"+TheClass1+"'>"+TMP_SRC + "</div></div><br>"; 
     }
    }

    TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
    GEBI('SL_History').appendChild(TMP_HISTORY_LIST);   
    GEBI('SL_H_SEARCH').focus();
    break;

   case "4":
    SL_setTMPdata("SL_anchor","");  
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
     TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
     var TMP = TMP_HIST[z].split("~~");
     if(TMP[5]=='4'){
      if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
      }
      var TMP_SRC=TMP[0];//.replace(/@/g,"<br>");
      var TMP_DST=TMP[1];//.replace(/@/g,"<br>");
      var TMP_DIR = TMP[2].split("|");
      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
      TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);
      var title="Webpage translation"; 
      var color="#FFF0E8"; 
      var WAY1 = SL_TTSicn(TMP_DIR[0]);
      var WAY2 = SL_TTSicn(TMP_DIR[1]);
      var TTS1="";
      var TTS2="";
      var BUTTONS="";
      TMP[1] = TMP[0];
      var anchor=TMP[4].replace(/\s/g,"");
      TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='urlDST"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div><a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_4URLS' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='urlSRC"+z+"' style='color:"+SLclr2+";cursor:pointer;' class='"+TheClass2+"'>"+TMP[1]+"</div></div><br>"; 
     }
    }
    TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
    GEBI('SL_History').appendChild(TMP_HISTORY_LIST);   
    GEBI('SL_H_SEARCH').focus();
    break;


   case "6": 

	// DICTIONARY ---------------------------
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
     TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
     var TMP = TMP_HIST[z].split("~~");

     if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
     }

     if(TMP[5]=='6'){
      var TMP_SRC=TMP[0];//.replace(/@/g,"<br>");
      var TMP_DST=TMP[1];//.replace(/@/g,"<br>");

      var TMP_DIR = TMP[2].split("|");
      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);

      TMP[1]=SL_ALIGNER(TMP[1],TMP_DIR[0],TMP_DIR[1]);
      var title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary');
      var color="#fbfbfb";


      var WAY1 = SL_TTSicn(TMP_DIR[0]);
      var WAY2 = SL_TTSicn(TMP_DIR[1]);
      var TTS1="";
      var TTS2="";
      var BUTTONS="";

      var anchor=TMP[4].replace(/\s/g,"");

      if(TMP[5]!='6'){
        TTS1 = "<img src='../../img/util/blank.png' lang='"+TMP_DIR[1]+"' id='SL_src_listen"+z+"'  class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
	TTS2 = "<img src='../../img/util/blank.png' lang='"+TMP_DIR[0]+"' id='SL_tar_listen"+z+"'  class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
      	BUTTONS = "<img src='../../img/util/split.png' id='SL_split"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSplit')+"'>&nbsp; <img src='../../img/util/open.png' id='SL_open"+z+"' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extExpand')+"'>&nbsp; ";
      }



      if(TMP_SRC.length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')     TMP_SRC=TMP_SRC.substring(0,SL_SEGMENT_LIMIT)+" ...";
      if(TMP[1].length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')      TMP[1]=TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...";
      var NOURL="";

      if(TMP[3].indexOf("{empty}")!=-1 || TMP[3]=="")NOURL="display:none;visibility:hidden";

      if(TMP[5]=='6' && DIR_from != "Auto"){
        if(isTTSready(TMP_DIR[0])==true)  TTS2="<div id='SL_src_listen"+z+"' lang='"+TMP_DIR[0]+"' style='cursor:pointer;margin-bottom:5px;margin-left:5px;margin-right:5px;' class=TTS"+WAY1+" title='"+TMP_SRC+"' ></div>";
      }

      var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
      var TheClass2=SL_LTR_RTL(TMP_DIR[1]);
      var TheWidth="";

      var CONTROLS="<div align='right' class='SL_h_info'><table width='98%' height='15' border=0 cellpadding=0 cellspasing=0><tr><td width='150' class='SL_h_TD' valign='bottom'>"+TMP[4]+"</td><td width='180' valign='bottom' class='SL_h_TD'><span lang='"+TMP_DIR[0]+"|"+TMP_DIR[1]+"' class='DIRS'>"+SL_GET_LANG_NAME(TMP_DIR[0])+">"+SL_GET_LANG_NAME(TMP_DIR[1])+ " (" + TMP[6] + ")</span></td><td width='80' align=right valign='bottom'>" + BUTTONS + "<img src='../../img/util/url.png' id='SL_url"+z+"' style='cursor:pointer;"+NOURL+"' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSeeSource')+"'>&nbsp; <img src='../../img/util/basket.png' id='SL_delete"+z+"' class='SL_delete' style='cursor:pointer;' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDelRecord')+"'></td></tr></table></div>";

      if(TheClass1=="SL_rtl") TheWidth="90%";

       if(TMP[5]=='6'){
         if(WAY1!=1)  	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:right'>" +TTS2+ "</div><div class=SRC id='SRC"+z+"' style='float:right;'>"+TMP_SRC + "</div><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div><br>";
  	 else 		TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='width:98%;overflow:hidden;'><div style='float:left'>" +TTS2+ "</div><div class=SRC id='SRC"+z+"' style='float:left;'>"+TMP_SRC + "</div><br><br><div id='DST"+z+"'>"+TMP[1]+ " "+ TTS1+"</div></div><br>";
       } else {

	   switch(WAY1+"|"+WAY2)
		{
		case "1|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div><br>"; break;
		case "1|2":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div><br>"; break;
		case "2|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div><br>"; break;
		case "2|2": 	TMP_HISTORY_LIST = TMP_HISTORY_LIST + CONTROLS + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div class='SL_History_block' name='SL_seg' id='SL_History_block"+z+"' title='"+title+"' style='background:"+color+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div><br>"; break;
	 	}
       }
      TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<div class='SL_Hplayer_content' id='SL_Hplayer_content"+z+"'><span class='SL_Hplayer' id='SL_Hplayer"+z+"'></span><br></div>";
      }
     }
     if(TMP_HISTORY_LIST=="") TMP_HISTORY_LIST="No records found";
     TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
     GEBI('SL_History').appendChild(TMP_HISTORY_LIST);   
     GEBI('SL_H_SEARCH').focus();
     OnOffTTSicon();
    break;


	// DEFAULT -----------------
   default: INIT(); break;
  }
 }
 SL_record_finder();
}

function SL_SPLIT(ind){
  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
  mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
  mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");
  mySL_HISTORY = DOMPurify.sanitize (mySL_HISTORY);

  if(mySL_HISTORY!=""){
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    SL_GLOBAL_RECORDS=TMP_HIST.length-1;
    for(var z=0; z<SL_GLOBAL_RECORDS; z++){
     if(z==ind){
       var TMP = TMP_HIST[z].split("~~");

       if(TMP.length==6){
 	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
       }


       SL_TMP_SRC = TMP[0];
       var TMP_SRC = TMP[0].replace(/@/g," ");
       var TMP_DST = TMP[1].replace(/<br>/g," ");
       var TMP_DIR = TMP[2].replace("|","/");

       if(GEBI("SL_History_block"+ind).style.background.indexOf("rgb(255, 255, 255)")!=-1) SL_REBUILD_SECTOR(ind);
       else var resp = SL_DO_SPLIT(TMP_DIR,TMP_SRC,ind,TMP_DST,TMP[6]);
     }
    }
  }
}


function SL_REBUILD_SECTOR(ind){
  GEBI("SL_History_block"+ind).style.background="rgb(242, 255, 253)";

  var mySL_HISTORY = FExtension.GET_localStorage("SL_History");
  mySL_HISTORY = mySL_HISTORY.replace(/&nbsp;/ig,"");
  mySL_HISTORY = mySL_HISTORY.replace(/PPB_v/ig,"o");

  mySL_HISTORY = DOMPurify.sanitize (mySL_HISTORY);

  if(mySL_HISTORY!=""){
    GEBI("SL_split"+ind).title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extSplit');
    GEBI("SL_open"+ind).style.visibility='visible';
    GEBI("SL_open"+ind).style.width='20px';
    var TMP_HIST=mySL_HISTORY.split("^^");
    var TMP_HISTORY_LIST="";
    var z = ind;
      TMP_HIST[z] = TMP_HIST[z].replace(/<br>/g,"");
      var TMP = TMP_HIST[z].split("~~");

      if(TMP.length==6){
	 TMP_HIST[z]=TMP_HIST[z]+"~~G";
	 TMP = TMP_HIST[z].split("~~");
      }


      var TMP_SRC=TMP[0].replace(/\n/g,"<br>");
      var TMP_DST=TMP[1].replace(/\n/g,"<br>");

      TMP_SRC=TMP_SRC.replace(/\\n/g,"<br>");
      TMP_DST=TMP_DST.replace(/\\n/g,"<br>");
      TMP[0] = TMP_SRC;
      TMP[1] = TMP_DST;

      var TMP_DIR = TMP[2].split("|");
      var DS=TMP_DIR[0];
      var DT=TMP_DIR[1];
      var title="";
      var color="#fff";
      switch(TMP[5])
	{
	case '1': title="ImTranslator"; color="#FFFAE8"; break;
	case '2': title="Pop-up Bubble Translator"; color="#F2FFFD"; break;
	case '3': title="Webpage translation"; color="#FFF0E8"; break;
	case '4': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extMOT'); color="#E5FFE1"; break;
	case '5': title="Inline translator"; color="#FDEBFB"; break;
	case '6': title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extDictionary'); color="#fbfbfb"; break;
	}
      var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
      var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);

      var WAY1 = SL_TTSicn(TMP_DIR[0]);
      var WAY2 = SL_TTSicn(TMP_DIR[1]);
      var TTS1="";
      var TTS2="";
      var anchor=TMP[4].replace(/\s/g,"");
      if(TMP[5]!='6'){
	 TTS1 = "<img src='../../img/util/blank.png' id='SL_src_listen"+z+"'  class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
	 TTS2 = "<img src='../../img/util/blank.png' id='SL_tar_listen"+z+"'  class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
      }
      if(TMP_SRC.length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')     TMP_SRC=TMP_SRC.substring(0,SL_SEGMENT_LIMIT)+" ...";
      if(TMP[1].length > SL_SEGMENT_LIMIT && TMP[5]!='3' && TMP[5]!='6')      TMP[1]=TMP[1].substring(0,SL_SEGMENT_LIMIT)+" ...";

      if(TMP[5]==GEBI("SL_SORT").value || GEBI("SL_SORT").value == 0){
	      var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
	      var TheClass2=SL_LTR_RTL(TMP_DIR[1]);
	      switch(WAY1+"|"+WAY2){
		case "1|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div name='SL_seg' id='SL_History_block"+z+"' title='"+title+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div><br>"; break;
		case "1|2":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div name='SL_seg' id='SL_History_block"+z+"' title='"+title+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;'>"+TMP_SRC + "</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div><br>"; break;
		case "2|1":     TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div name='SL_seg' id='SL_History_block"+z+"' title='"+title+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:left;width:20px;'>" +TTS1.replace('SL_src_listen','SL_tar_listen')+ "</div><div style='float:left;width:90%;margin-left:5px;'>"+ TMP[1]+"</div></div></div><br>"; break;
		case "2|2": 	TMP_HISTORY_LIST = TMP_HISTORY_LIST + "<a class='SL_TS' id='SL_TS"+z+"' name='"+ anchor +"'></a><div name='SL_seg' id='SL_History_block"+z+"' title='"+title+"'><div id='SRC"+z+"' class='"+TheClass1+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2.replace('SL_tar_listen','SL_src_listen')+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP_SRC+"</div></div> <hr color='#CCC' size=1 width='99%'><div id='DST"+z+"' class='"+TheClass2+"' style='overflow:hidden;'><div style='float:right;width:20px;margin-left:8px;'>"+TTS2+ "</div><div style='float:right;margin-top:5px;width:90%'>"+ TMP[1]+"</div></div></div><br>"; break;
	      }
      }
      TMP_HISTORY_LIST = DOMPurify.sanitize (TMP_HISTORY_LIST, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
      GEBI("SL_History_block"+ind).innerText="";
      GEBI("SL_History_block"+ind).appendChild(TMP_HISTORY_LIST);   
     SL_record_finder();
     OnOffTTSicon();
  }
}



function SL_DO_SPLIT(dir,text,ind,trans,provider){
        var baseUrl = "https://imtranslator.net/split.asp?dir="+dir+"&text="+encodeURIComponent(text); 

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
				alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extError1'));
				return false;
			}
		}
	}
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
                        SL_SPLIT_VIEW(ajaxRequest.responseText,ind,trans,dir,provider);
		}
	}
	ajaxRequest.open("GET", baseUrl, true);
        ajaxRequest.send(null);
}

function SL_SPLIT_VIEW(result,ind,trans,dir,provider){

 result = DOMPurify.sanitize (result);
 var TMP_result = result.split("<#>");
  if(TMP_result.length<=2){
       var TMP_res = SL_TMP_SRC.replace(/\n/ig,"@");
       TMP_res = TMP_res.replace(/@@/ig,"@");
       TMP_res = TMP_res.replace(/@/ig,"<#>");
       TMP_res = TMP_res+"<#>";

       TMP_result = TMP_res.split("<#>");
  }

  GEBI("SL_History_block"+ind).style.background="#FFF";
  GEBI("SL_History_block"+ind).textContent="";
  GEBI("SL_open"+ind).style.visibility='hidden';
  GEBI("SL_open"+ind).style.width='0px';
  GEBI("SL_split"+ind).title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extUndoSplit');
  var TMP_DIR = dir.split("/");
  SL_GLOBAL_SEGMENTS=TMP_result.length-1;
  
  var WAY1 = SL_TTSicn(TMP_DIR[0]);
  var WAY2 = SL_TTSicn(TMP_DIR[1]);

  for(var i=0; i<TMP_result.length-1; i++){
   if(TMP_result[i].length>1){
     var TheClass1=SL_LTR_RTL(TMP_DIR[0]);
     var TheClass2=SL_LTR_RTL(TMP_DIR[1]);
     var DIR_from = SL_GET_LANG_NAME(TMP_DIR[0]);
     var DIR_to   = SL_GET_LANG_NAME(TMP_DIR[1]);
     var TTS1 = "<img src='../../img/util/blank.png' id='SL_src_listen_"+ind+"_100"+i+"' class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
     var TTS2 = "<img src='../../img/util/blank.png' id='SL_tar_listen_"+ind+"_1000"+i+"' class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
     var TTS3 = "<img src='../../img/util/blank.png' id='SL_src_listen_"+ind+"_1000"+i+"' class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
     var TTS4 = "<img src='../../img/util/blank.png' id='SL_tar_listen_"+ind+"_10000"+i+"' class='SLIMG1' align='left' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[1])+"'>";
     var TTS5 = "<img src='../../img/util/blank.png' id='SL_src_listen_"+ind+"_100000"+i+"' class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
     var TTS6 = "<img src='../../img/util/blank.png' id='SL_tar_listen_"+ind+"_1000000"+i+"' class='SLIMG2' align='right' title='"+FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+SL_GET_LANG_NAME(TMP_DIR[0])+"'>";
     var OUTPUT="";
     var OUTPUT2="";


     switch(WAY1+"|"+WAY2) {
	case "1|1":     
		OUTPUT="<div id='NEWSRC_"+ind+"_"+i+"' class='"+TheClass1+"' style='overflow:hidden;'><div dir='"+TMP_DIR[0]+"' style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;color:green;'>"+TMP_result[i] + "</div></div>"; 
		OUTPUT2="<div id='NEWDST_"+ind+"_"+i+"' class='"+TheClass2+"' style='overflow:hidden;'><div dir='"+TMP_DIR[1]+"' style='float:left;width:20px;'>" + TTS3 + "</div><div id='theDST_"+ind+"_"+i+"' style='float:left;width:90%;margin-left:5px;color:red;'>"+SL_TRANS(TMP_result[i],dir,i,ind,provider)+ "</div></div>";
		break;
	case "1|2":     
		OUTPUT="<div id='NEWSRC_"+ind+"_"+i+"' class='"+TheClass1+"' dir='"+TMP_DIR[0]+"' style='overflow:hidden;'><div dir='"+TMP_DIR[0]+"' style='float:left;width:20px;'>" + TTS1 + "</div><div style='float:left;width:90%;margin-left:5px;color:green;'>"+TMP_result[i] + "</div></div>";
		OUTPUT2="<div id='NEWDST_"+ind+"_"+i+"' class='"+TheClass2+"' dir='"+TMP_DIR[1]+"' style='overflow:hidden;'><div dir='"+TMP_DIR[1]+"' style='float:right;width:20px;margin-top:-5px'>" + TTS2 + "</div><div id='theDST_"+ind+"_"+i+"' style='float:right;width:90%;margin-right:10px;color:red;'>"+SL_TRANS(TMP_result[i],dir,i,ind,provider)+ "</div></div>";
		break;
	case "2|1":     
		OUTPUT="<div id='NEWSRC_"+ind+"_"+i+"' class='"+TheClass1+"' dir='"+TMP_DIR[0]+"' style='overflow:hidden;'><div dir='"+TMP_DIR[0]+"' style='float:right;width:20px;margin-top:-5px;'>" + TTS5 + "</div><div style='float:right;width:90%;margin-right:10px;color:green;'>"+TMP_result[i] + "</div></div>";
		OUTPUT2="<div id='NEWDST_"+ind+"_"+i+"' class='"+TheClass2+"' dir='"+TMP_DIR[1]+"' style='overflow:hidden;'><div dir='"+TMP_DIR[1]+"' style='float:left;width:20px;'>" + TTS4 + "</div><div id='theDST_"+ind+"_"+i+"' style='float:left;width:90%;color:red;'>"+SL_TRANS(TMP_result[i],dir,i,ind,provider)+ "</div></div>";
		break;
	case "2|2":     
		OUTPUT="<div id='NEWSRC_"+ind+"_"+i+"' class='"+TheClass1+"' dir='"+TMP_DIR[0]+"' style='overflow:hidden;'><div dir='"+TMP_DIR[0]+"' style='float:right;width:20px;margin-top:-5px;'>" + TTS5 + "</div><div style='float:right;width:90%;margin-right:10px;color:green;'>"+TMP_result[i] + "</div></div>";
		OUTPUT2="<div id='NEWDST_"+ind+"_"+i+"' class='"+TheClass1+"' dir='"+TMP_DIR[1]+"' style='overflow:hidden;'><div dir='"+TMP_DIR[1]+"' style='float:right;width:20px;margin-top:-5px;'>" + TTS6 + "</div><div style='float:right;width:90%;margin-right:10px;color:red;'>"+TMP_result[i] + "</div>"+"<hr color='#CCC' size='1' width='99%'></div>";
		break;
       
     }
     OUTPUT = DOMPurify.sanitize (OUTPUT, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
     GEBI("SL_History_block"+ind).appendChild(OUTPUT);   
     OUTPUT2=OUTPUT2.replace("undefined","");
     OUTPUT2 = DOMPurify.sanitize (OUTPUT2, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
     GEBI("SL_History_block"+ind).appendChild(OUTPUT2);   
   }
  }
  SL_record_finder();
  OnOffTTSicon();
}

function SL_TRANS(text,dir,ind1,ind2,provider){
  switch(provider){
          case "G": 
	        var TMP_DIR = dir.split("/");
		var num = Math.floor((Math.random() * SL_GEO.length)); 
		var theRegion = SL_GEO[num];
		if(FExtension.GET_localStorage("SL_DOM")!="auto") theRegion=FExtension.GET_localStorage("SL_DOM");
		var baseUrl = "https://translate.google."+theRegion+"/translate_a/single";

	        if(TMP_DIR[0]=="")TMP_DIR[0]="auto";

		var SL_Params = "client=gtx&dt=t&dt=bd&dj=1&source=input&q="+encodeURIComponent(text)+"&sl=auto&tl="+TMP_DIR[1]+"&hl=en";

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
					alert("Your browser broke");
					return false;
				}
			}
		}
		ajaxRequest.onreadystatechange = function(){
			if(ajaxRequest.readyState == 4){
	                   var resp = ajaxRequest.responseText;
			   if(resp.indexOf('"trans":"')>-1){
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
	                              Gr3 = Gr3.replace(/\\/g,"");
                                      //Gr3 = Gr3.charAt(0).toUpperCase() + Gr3.slice(1);
                                      ReadyToUseGoogleText=ReadyToUseGoogleText+Gr3;
                                  }
		                ReadyToUseGoogleText = DOMPurify.sanitize (ReadyToUseGoogleText);
        	                var OUTPUT = "<div class='TH_LEFT' style='color:red;'>"+ ReadyToUseGoogleText+"<hr color='#CCC' size='1' width='99%'> </div>";
			     	OUTPUT = DOMPurify.sanitize (OUTPUT, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
				GEBI("theDST_"+ind2+"_"+ind1).appendChild(OUTPUT);   

				//GEBI("theDST_"+ind2+"_"+ind1).outerHTML = "<div class='TH_LEFT' style='color:red;'>"+ ReadyToUseGoogleText+"<hr color='#CCC' size='1' width='99%'> </div>";
			    } else	SL_OTHER_PROVIDERS(text,dir,p,"theDST_"+ind2+"_"+ind1);
			}
		}
        	baseUrl = baseUrl +"?"+ SL_Params;
		ajaxRequest.open("GET", baseUrl, true);
        	ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        ajaxRequest.send(SL_Params);
	        break;
          case "M": SL_OTHER_PROVIDERS(text,dir,"microsoft","theDST_"+ind2+"_"+ind1); break;
          case "T": SL_OTHER_PROVIDERS(text,dir,"translator","theDST_"+ind2+"_"+ind1); break;
          case "Y": SL_YANDEX(text,dir,"theDST_"+ind2+"_"+ind1); break;
  }
}




function REMOTE_Voice (dir, text){
   REMOTE_Voice_Close();
   dir = dir.replace("-TW","");
   dir = dir.replace("-CN","");
   if(dir=="en") dir = dir.replace("en","en-BR");
   dir = dir.replace("es","es-419");
   if(dir == "pt") dir = "pt-BR";

   text = text.replace(/(<([^>]+)>)/ig,"");

  text=text.replace(/&nbsp;/ig, ' ');
  if(text.length>GTTS_length){
	  text = text.substring(0, GTTS_length);
//	  alert(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTTS_Limit'));
  }
//  var TK = Math.floor(Date.now() / 1000);
  var a=Math.floor((new Date).getTime()/36E5)^123456;
  var TK = a+"|"+Math.floor((Math.sqrt(5)-1)/2*(a^654321)%1*1048576);

  var length = decodeURIComponent(text).length;
  var num = Math.floor((Math.random() * SL_GEO.length)); 
  var theRegion = SL_GEO[num];
  if(FExtension.GET_localStorage("SL_DOM")!="auto") theRegion=FExtension.GET_localStorage("SL_DOM");
  var baseUrl = "https://translate.google."+theRegion;

  var client = "tw-ob";
//  if(dir=="uk") client="t";

  baseUrl = baseUrl+'/translate_tts?tk='+TK+'&ie=UTF-8&tl='+dir+'&total=1&idx=0&textlen='+length+'&client='+client+'&q='+encodeURIComponent(text);

  var frame = document.getElementById('PL_lbframe');
  if(frame)	frame.parentNode.removeChild(frame);
  if(!document.getElementById("PL_lbframe")){
    var die=document.createElement("iframe");
    die.src="";
    die.name="PL_lbframe";
    die.id="PL_lbframe";
    die.width="624px";
    die.height="40px";
    die.scrolling="no";
    die.frameBorder="0";

    if(document.getElementById('SL_Hplayer'+CurTTSIND)) document.getElementById('SL_Hplayer'+CurTTSIND).appendChild(die);
            const http = new XMLHttpRequest
            http.onload = e => {
                const reader = new FileReader();
                reader.onloadend = function() {
		     var audioElement = document.createElement('audio');
		     audioElement.setAttribute('src', reader.result);
		     audioElement.setAttribute('preload', 'auto');
		     audioElement.setAttribute('controls', '');
		     audioElement.setAttribute('autoplay', '');
		     audioElement.setAttribute('id', 'SLmedia');
		     audioElement.setAttribute('name', 'SLmedia');

		     audioElement.setAttribute('style', 'width:587px;height:40px;margin-top:-6px;margin-left:-8px;');
		     window.frames["PL_lbframe"].document.body.appendChild (audioElement);

		     document.getElementById('SL_Hplayer'+CurTTSIND).style.display="block";
		     document.getElementById('SL_Hplayer'+CurTTSIND).style.height="40px";
		     document.getElementById('SL_Hplayer'+CurTTSIND).style.marginLeft="0px";
		     document.getElementById('SL_Hplayer'+CurTTSIND).style.width="624px";


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


  

     if(length>=GTTS_length){
        var cont = document.createElement('div');
        cont.setAttribute('align', 'center');
        cont.setAttribute('width', '100%');

        var msg = document.createElement('div');
        msg.setAttribute('id', 'SL_H_alert100');
        var txt = document.createTextNode(FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extTTS_Limit'));
	msg.appendChild(txt);
        cont.appendChild(msg);
        if(document.getElementById('SL_Hplayer_content'+CurTTSIND)) document.getElementById('SL_Hplayer'+CurIND).appendChild(cont);
     }                                                          
    for(var t=0;t<SL_GLOBAL_RECORDS; t++) {
      if(CurTTSIND!=t){
	 if(GEBI("SL_Hplayer_content"+t))  GEBI("SL_Hplayer_content"+t).style.display="none";
      }
    }

     if(document.getElementById('SL_Hplayer_content'+CurTTSIND)) document.getElementById('SL_Hplayer_content'+CurTTSIND).style.display='block';
     
  }
}

function REMOTE_Voice_Close(){
 if(document.getElementById('SL_Hplayer'+CurTTSIND)){
  document.getElementById('SL_Hplayer'+CurTTSIND).style.display="none";
  document.getElementById('SL_Hplayer'+CurTTSIND).style.height="0px";
  document.getElementById('SL_Hplayer'+CurTTSIND).style.width="0px";
  document.getElementById('SL_Hplayer'+CurTTSIND).innerText="";
  document.getElementById('SL_Hplayer_content'+CurTTSIND).style.display='none';
 }
  var frame = document.getElementById('lbframe');
  if(frame)	frame.parentNode.removeChild(frame);

  var msg = document.getElementById('SL_H_alert100');
  if(msg)	msg.parentNode.removeChild(msg);
}

function SL_TTS_SEGMENT(st,ob,dir){
 var tts_code;
 var tts_code1;
 var code=dir;
 var cleanText = "";
 code = code.replace("-TW","");
 code = code.replace("-CN","");
 cleanText = GEBI(ob.id).textContent.replace(/<\/?[^>]+(>|$)/g, "");

           var text = cleanText;
	   switch(SL_TTS_STATE){
		case "0": if(ALLvoices.indexOf(code)!=-1){
                              if(SL_TTS.indexOf(code)!=-1){
				if(text.length>GTTS_length) SL_MEDIA_HOST(code, text);
				else setTimeout(function(){REMOTE_Voice(code,text);}, 500);
			      } else setTimeout(function(){REMOTE_Voice(code,text);}, 500);
			  } else alert(noVoice);
			  break;
		case "1": if(ALLvoices.indexOf(code)!=-1){
				if(G_TTS.indexOf(code)!=-1) setTimeout(function(){REMOTE_Voice(code,text);}, 500);
				else alert(noVoice);
			  } else alert(noVoice);
			  break;
		case "2": if(ALLvoices.indexOf(code)!=-1){
                              if(SL_TTS.indexOf(code)!=-1) SL_MEDIA_HOST(code, text);
			      else setTimeout(function(){REMOTE_Voice(code,text);}, 500);
			  } else alert(noVoice);
			  break;
	   }



}


function SL_SAVE(){
 if(GEBI("SL_TH_1").checked == true){
	FExtension.store.set("SL_TH_1", "1");
	chrome.storage.local.set({"SL_TH_1": "1"});
 }else{
	FExtension.store.set("SL_TH_1", "0");
	chrome.storage.local.set({"SL_TH_1": "0"});
}	
 if(GEBI("SL_TH_2").checked == true){
	FExtension.store.set("SL_TH_2", "1");
	chrome.storage.local.set({"SL_TH_2": "1"});
 }else{
	FExtension.store.set("SL_TH_2", "0");
	chrome.storage.local.set({"SL_TH_2": "0"});
 }	
 if(GEBI("SL_TH_3").checked == true){
	FExtension.store.set("SL_TH_3", "1");
	chrome.storage.local.set({"SL_TH_3": "1"});
 }else{
	FExtension.store.set("SL_TH_3", "0");
	chrome.storage.local.set({"SL_TH_3": "0"});
 }	
 if(GEBI("SL_TH_4").checked == true){
	FExtension.store.set("SL_TH_4", "1");
	chrome.storage.local.set({"SL_TH_4": "1"});
 }else{
	FExtension.store.set("SL_TH_4", "0");
	chrome.storage.local.set({"SL_TH_4": "0"});
 }


}

function SL_ALIGNER(SRC,L1,L2){
 var OUT="";
 SRC = SRC.replace(/id="_XR"/g,"id=_XR");
 SRC = SRC.replace(/id="_AL"/g,"id=_AL");
 if(L2=="ar" || L2=="iw" || L2=="fa" || L2=="yi" || L2=="ur" || L2=="ps" || L2=="sd" || L2=="ckb" || L2=="ug" || L2=="dv" || L2=="prs"){
     OUT = SRC.replace(/ id=_XR>/g, ' id=_XR style="text-align:right">');
     OUT = OUT.replace(/ id=_AL>/g, ' id=_AL style="text-align:right">');
 } else {
     OUT = SRC.replace(/ id=_XR>/g, ' id=_XR style="text-align:left">');
     OUT = OUT.replace(/ id=_AL>/g, ' id=_AL style="text-align:left">');
 }

 if(L2=="ar" || L2=="iw" || L2=="fa" || L2=="yi" || L2=="ur" || L2=="ps" || L2=="sd" || L2=="ckb" || L2=="ug" || L2=="dv" || L2=="prs")  OUT = OUT.replace(/style="border:0px;"/g, 'style="border:0px;text-align:right;"');
 else 								OUT = OUT.replace(/style="border:0px;"/g, 'style="border:0px;text-align:left;"');

 if(L1=="ar" || L1=="iw" || L1=="fa" || L1=="yi" || L1=="ur" || L1=="ps" || L1=="sd" || L1=="ckb" || L1=="ug" || L1=="dv" || L1=="prs")   OUT = OUT.replace(/ id=_AR>/g, ' id=_AR style="text-align:right">');
 else 								OUT = OUT.replace(/ id=_AR>/g, ' id=_AR style="text-align:left">');
 if(OUT=="")OUT=SRC;
 return(OUT);
}


function SL_TTSicn(lng){
 var OUT="";
 if(lng!="ar" && lng!="iw" && lng!="fa" && lng!="ur" && lng!="yi" && lng!="ps" && lng!="sd" && lng!="ckb" && lng!="ug" && lng!="dv" && lng!="prs"){
	OUT=1;
 } else {  
	OUT=2;
 }	
 return(OUT);
}

function HTMLstripper(str){
   var result = str.replace(/(<([^>]+)>)/ig, "");
   return (result);
}


function isTTSready(d){
	if(ALLvoices.indexOf(d)!=-1) return(true);
	else return(false);
}



function OnOffTTSicon(){
try{
 var BLOCK = document.getElementsByClassName('SL_History_block');
 var DIRS = document.getElementsByClassName('DIRS');

  var ICNS = "";
  var theDIRs = "";
  for(var i=0; i<BLOCK.length; i++){
      theDIRs = DIRS[i].lang.split("|");
      ICNS = BLOCK[i].getElementsByTagName('img');
      if(ICNS.length>0){
	      if(isTTSready(theDIRs[0])!=true) document.getElementById(ICNS[0].id).style.display='none';
	      if(isTTSready(theDIRs[1])!=true) document.getElementById(ICNS[1].id).style.display='none';

      	      document.getElementById(ICNS[0].id).title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+ SL_GET_LANG_NAME(theDIRs[0]);
	      document.getElementById(ICNS[1].id).title=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),'extListenTo')+" "+ SL_GET_LANG_NAME(theDIRs[1]);
      }
  }
  OnOffTTSiconSPLIT();
}catch(ex){}
}

function OnOffTTSiconSPLIT(ind){
 if(!ind) ind = CurTTSIND;

 var mainBLOCK = document.getElementsByClassName('SL_History_block');
 var DIRS = document.getElementsByClassName('DIRS');
 var ICNS,theDIRs;
 for(var i=0; i<mainBLOCK.length; i++){
//  if(i==ind){
    theDIRs = DIRS[i].lang.split("|");
    ICNS = mainBLOCK[i].getElementsByTagName('img');
    for(var j=0; j<ICNS.length; j+=2){
	if(isTTSready(theDIRs[0])==false) document.getElementById(ICNS[j].id).style.display='none';
    }
    for(var j=1; j<ICNS.length; j+=2){
	if(isTTSready(theDIRs[1])==false) document.getElementById(ICNS[j].id).style.display='none';
    }
//  }
 }
}

function SL_setTMPdata(name, value) {
 try{
  FExtension.store.set(name, value);
  chrome.storage.local.set({name: value});
 } catch(ex) {}
}

function SL_getTMPdata(name) {
        var resp = FExtension.GET_localStorage(name);
        if(resp == undefined || resp == "") resp = "0";
	return resp;
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
  chrome.storage.local.set({"SL_LOCALIZATION": GEBI("SL_LOC").value});
  CONSTRUCTOR();
  FExtension.store.save_LOC4CONTEXT();
  new Date().getTime();
  FExtension.store.set("SL_TS_LOC", Date.now());
  chrome.storage.local.set({"SL_TS_LOC": Date.now()});
  FExtension.bg.ImTranslatorBG.SL_callbackRequest4LOC();
  parent.frames["menu"].location.reload();
  location.reload();
}

function SL_OTHER_PROVIDERS(text,dir,provider,divres){
 var f,t;
 if(dir=="") dir="en/es";
 var tmp = dir.split("/");
 f=tmp[0];
 t=tmp[1];
 f=f.replace("-CN-CN","-CN");
 f=f.replace("-TW-TW","-TW");
 t=t.replace("-CN-CN","-CN");
 t=t.replace("-TW-TW","-TW");

 var PROV = provider;

 if(PROV=="" || PROV == "undefined" || PROV =="null")PROV = "microsoft";

		text=text.replace(/\n/ig,' @ ');
		var baseUrl = ImTranslator_theurl+"dotrans.asp";
//		var baseUrl = "http://httpstat.us/414";

		var cgi = "dir="+f+"/"+t+"&provider="+provider.toLowerCase()+"&text="+encodeURIComponent(text);

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

				if(ajaxRequest.readyState == 4){
			             var resp = ajaxRequest.responseText;                

				     resp = DOMPurify.sanitize (resp);

			     	     if(ajaxRequest.status!=200) resp=PROV + ": "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),"extnotrsrv");
			             if(resp.indexOf('<#<')!=-1 || resp.indexOf('&lt;#')!=-1) resp=PROV + ": "+ FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),"extnotrsrv");
				     if(resp.indexOf("ID=V2_Json_Translate")!=-1) resp=FExtension.element(FExtension.GET_localStorage("SL_LOCALIZATION"),"extnotrsrv");

	                             resp=resp.replace(/@/ig,"\n");
	                             resp=resp.replace(/\\/ig,' ');
	                             var OUTPUT = "<div class='TH_LEFT' style='color:red;'>"+ resp +"<hr color='#CCC' size='1' width='99%'> </div>";
				     OUTPUT = DOMPurify.sanitize (OUTPUT, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
				     GEBI(divres).appendChild(OUTPUT);   
				}
			}

			ajaxRequest.open("POST", baseUrl, true);
			ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxRequest.send(cgi); 
}

function truncStrByWord(str, length){
	if(str!="undefined"){
		if(str.length>25){
			length=length-25;
			var thestr=str;
			if (str.length > length) {
				str = str.substring (0, length);
				str = str.replace(new RegExp("/(.{1,"+length+"})\b.*/"), "$1")    // VK - cuts str to max length without splitting words.
				var str2 = thestr.substring(length, (length+25));
				var tempstr=str2.split(" ");
				var tmp="";
				for (var i=0; i<tempstr.length-1; i++){
					tmp = tmp+tempstr[i]+" ";
				} 
				str=str+tmp;
			}
		} else 
			str = str+" ";
	}
	return str;
}

function SL_MEDIA_HOST(dir, text){
	    if(dir=="")dir="en/es";
	    var tmpdir=dir.split("/");
	    if(tmpdir[0]=="es" || tmpdir[0]=="fr" || tmpdir[0]=="it" || tmpdir[0]=="pt") text=unescape(encodeURIComponent(text));
	    if(dir == "zh" || dir == "ja" || dir == "ko") text = text.substring(0,900);
	    if(dir == "ru") text = text.substring(0,1001);

	    var submitForm = getNewSubmitForm();

	    createNewFormElement(submitForm, "text", text);
	    createNewFormElement(submitForm, "url", "FF");
	    createNewFormElement(submitForm, "dir", dir);
	    submitForm.action= "https://text-to-speech.imtranslator.net";
	    submitForm.setAttribute('target', '_blank');
	    submitForm.submit();
}


function getNewSubmitForm(){
		var submitForm = document.createElement("FORM");
		document.body.appendChild(submitForm);
		submitForm.method = "GET";
		return submitForm;
}

function createNewFormElement(inputForm, elementName, elementValue) {
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
}


function SL_SAVE_THEME(){
  FExtension.store.set("THEMEmode", GEBI("SL_THEME").value);
  new Date().getTime();
  FExtension.store.set("SL_TS_LOC", Date.now());
  location.reload();
}

function ACTIVATE_THEME(st){
 	if(st==1){
		var bg="#191919";
		var clr="#BF7D44";
		var clr_deact="#BDBDBD";
		GEBI("SL_translate_container").style.filter=SL_DARK;
		GEBI("SL_export_2").style.filter=SL_DARK;
		GEBI("SL_delete_2").style.filter=SL_DARK;
		GEBI("SL_eth").style.filter=SL_DARK;
		var A = document.getElementsByTagName("a");
		for(var i=0; i<A.length; i++) A[i].style.color=clr;  
		var TXT = document.getElementsByClassName("SL_h_TD");
		for(var i=0; i<TXT.length; i++) TXT[i].style.filter=SL_DARK;
		setTimeout(function() {
			var SL_SORT_opt = GEBI("SL_SORT").getElementsByTagName("option");
			for(var j=0; j<SL_SORT_opt.length; j++) SL_SORT_opt[j].setAttribute("style", "background:"+bg+" !important;color:#fff;");
		}, 1000);
	}
}

function SL_YANDEX(text,dir,divres){
        dir = dir.replace("auto","en");
        dir = dir.replace("/","-");
	getYSID(0);
	setTimeout(function(){
	    var YSLIDL = setInterval(function(){
		if(YSIDstatus === true) {
			clearInterval(YSLIDL);
			YSLIDL="";
			getY_TRANSLATION(dir,text,divres);
		} 
	    },5);  
       	},5);  		
}

function getYSID(st){
 	var YK = FExtension.store.get("SL_YKEY");
	YSIDold = YK;
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
               		        YSID = resp[0].substring(6);

				var H = FExtension.store.get("SL_YHIST");
				if(H == "") H="First key";
				else H = H +"; Rekey";
				var K = "***"+YSID.substring(45);
				FExtension.store.set("SL_YHIST",H+" -> "+K);
				FExtension.store.set("SL_YKEY", YSID);
	                        YSIDstatus = true;
               		    } else {
				var H = FExtension.store.get("SL_YHIST");
				FExtension.store.set("SL_YHIST",H+"; KEY not found");
	                        YSIDstatus = false;
				FExtension.store.set("SL_YKEY", "0");
               		    }
			}
		}
		ajaxRequest.open("GET", baseUrl, true);
		ajaxRequest.setRequestHeader("Access-Control-Allow-Headers", "*");
		ajaxRequest.setRequestHeader("Access-Control-Allow-Origin", "null");
		ajaxRequest.send();
	  } else {
		YSID = FExtension.store.get("SL_YKEY");
                YSIDstatus = true;
	  }
}


function getY_TRANSLATION(dir, text, divres){
       	dir = dir.replace("zh-CN","zh");
	dir = dir.replace("jw","jv");
        dir = dir.replace("iw","he");
        var tmp=dir.split("-");
	var mySourceLang=tmp[0];
	var myTargetLang=tmp[1];
  	var baseUrl="https://translate.yandex.net/api/v1/tr.json/translate?srv=tr-url-widget&id=" + YSID + "-0-0&format=html&lang=" + dir + "&text="+ encodeURIComponent(text);
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
       		        R3 = R3.replace(/\\n/ig,"\n");
                        GEBI(divres).outerHTML = "<div class='TH_LEFT' style='color:red;'>"+ R3 +"<hr color='#CCC' size='1' width='99%'> </div>";
		   } else {
                        YSIDstatus = false;
			FExtension.store.set("SL_YKEY", YSID);
			var H = FExtension.store.get("SL_YHIST");
			FExtension.store.set("SL_YHIST",H+"; Keys are equal -> yandex response: " +resp);
		    	var msg = FExtension.element(FExtension.store.get("SL_LOCALIZATION"),'extTOO_MANY_REQUESTS');
			msg = msg.replace("XXX","Yandex");
                        GEBI(divres).outerHTML = "<div class='TH_LEFT' style='color:orange;'>"+ msg +"<hr color='#CCC' size='1' width='99%'> </div>";
			SL_alert(msg);
		   }
		} else {
		    if(ajaxRequest.status == 403){
			FExtension.store.set("SL_YKEY", 0);
			YSID=0;
			if(YSID!=YSIDold){
				SL_YANDEX(dir, text);
				var H = FExtension.store.get("SL_YHIST");
				FExtension.store.set("SL_YHIST",H+"; Yandex answers: #405 -> requesting a new key");
			}else{
	                        YSIDstatus = false;
				FExtension.store.set("SL_YKEY", 0);
				YSIDold = 0;
			}
		    }
		}
	}
	ajaxRequest.open("GET", baseUrl, true);
	ajaxRequest.setRequestHeader("Access-Control-Allow-Headers", "*");
	ajaxRequest.setRequestHeader("Access-Control-Allow-Origin", "null");
	ajaxRequest.send();
} 
