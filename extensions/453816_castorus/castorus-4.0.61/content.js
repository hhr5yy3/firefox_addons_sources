/////////////////////////////////////////////////////////  REQUIRE ///////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////   GLOBAL  ///////////////////////////////////////////////////////////////////////////////////
var castorus 			= {};
var Global 				= {};
var filters				= null;
var castDom				= "www.castorus.com/"
var wsdomain			= castDom+"/ws";
var urlpost				= "https://"+castDom+"up";
var urldown				= "https://"+castDom+"down";
var filterArray			= false;
var merchantIdProduct  	= false;
var domain				= false;
var idDomain			= false;
var idSite				= false;
var waitingTime			= 500;
var frameInsertMethod	= false;
var frameInsertTypeNode	= false;
var frameInsertNodeName	= false;
var frameInsertCss		= false;
var frameInsertHtmlNode = "div";
var frameInsertMethod2  = false;
var frameInsertTypeNode2= false;
var frameInsertNodeName2= false;
var frameInsertCss2     = false;
var frameInsertHtmlNode2= "div";
var is404				= false;
var courantDate			= new Date().getTime();
var isready				= false;
var loop 				= null;
var url 				= null;
var urlTmp				= null;
var tabidTmp			= null;
var idTmp				= null;
var ModeList            = 0;
var iframeName			= "CASTORUSIFRAME";
var iframeFixedHeight	= 50;
var htmlIsReady			= false;
var activeDebug			= 0;
var castorusVersion		= "4.0.61"; // => ATTENTION modifier aussi la version dans background et manifest !
var nbrep				= 0;
var myUserid            = null;
var timeChecking		= 0;
var debugAllContent 	= null;


castorus.dbg = function (StringDebug){ if (activeDebug===1) console.log("CASTORUS_CS//"+StringDebug);}
castorus.replaceSubstring = function(text) {var vfrom="zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA9876543210#&=)(][|_,/:.-+!".split('');var vto="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+.:/,_|[]()=&#?".split('');var vsource=text.split(''); for(var i=0; i < vsource.length; i++) {var vindex = vfrom.indexOf(vsource[i]);vsource[i]=vto[vindex];}return vsource.join("");}
castorus.loadfilters = function (){chrome.runtime.sendMessage({need: "filters"},function(resp){if(resp){filters=resp;}});}
castorus.cleanString = function(S){S=S.replace(/"/g, ' ');S=S.replace(/\s\s+/g, ' ');S=S.trim();return S;}
castorus.cleanPrice  = function(S){S=S.replace('/€/g','');S=S.replace('/&euro;/g','');S=S.replace('/\?/g','');S=S.replace(/\s/g,'');S=S.replace(/\s+/g,'');S=S.trim();return S;}


document.defaultView.addEventListener("message", function(e) {	castorus.receiveMessage(e)}, false);
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

                if (typeof msg.Global !== 'undefined') {
	                Global=msg.Global;
	                sendResponse({farewell: "Ok, I've received Global for tabId:"+msg.t+" and domain:"+Global["Domain"]+".Bybye"});
	                castorus.ItsTime(Global,msg.t);
	                return true;
	            }
                if (typeof msg.urlaff !== 'undefined') {
	                sendResponse({farewell: "Ok, I've received Iframe for tabId:"+msg.t+" and urlaff:"+msg.urlaff+".Bybye"});
	                castorus.loadIframe(msg.urlaff,msg.t);
	                return true;
	            }	    
	            return true;        
});



castorus.checkIdXPath = function (pattern){
	var XPath = "normalize-space(" + pattern + ")";
	var search = document.evaluate(pattern, document, null, XPathResult.STRING_TYPE, null );
    rep = search.stringValue;
    rep = castorus.cleanString(rep);
    
	if(rep){return rep;}else{return false;} 
	return false;
}



castorus.loadImgInfo = function (rep){
	var l="";
	return l;
}
castorus.constructUrlList = function (critName,rep,nbrep,l){
	if(!l || l=="undefined") var l="";
	l+='|'+critName+':'+rep;
	nbrep=nbrep+1;
	return l;
}
castorus.checkListXPath = function (pattern,UrlPatterns,url){
	
	var XPath = "normalize-space(" + pattern + ")";
	var search = document.evaluate(pattern, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
    var actualContent = search.iterateNext ();
    var rep = "";
    var nbrep=0;
    var node = new Array();
    
    while (actualContent) {
       node.push(actualContent.innerHTML);
       actualContent = search.iterateNext ();
    }

	if(node){
		if(node.length>-1){	
			var ResultsToPush = {};
			for (i in node){
				var l="";
				for (parse in UrlPatterns) {
					var critarray=UrlPatterns[parse];
					var critName=Object.getOwnPropertyNames(critarray);
					var critPattern=critarray[Object.keys(critarray)[0]];
					if (critName!="liste"&&critPattern){
						
						var XPath = "normalize-space(" + critPattern + ")";
						
						var doc = new DOMParser().parseFromString(node[i],'text/html');
						var search = doc.evaluate(XPath, doc, null, XPathResult.STRING_TYPE, null );
	    				rep = search.stringValue;
						rep = castorus.cleanString(rep);
												
						if(critName=="prix"){rep=castorus.cleanString(rep);rep=castorus.cleanPrice(rep);}
	    				
	    				l+=castorus.constructUrlList(critName,rep,l);
					}
								
				}	
				if(l) {
					nbrep=nbrep+1;
					ResultsToPush[i]='|'+i+l;					
				}
			}
		}
		ResultsToPush['nbr']=nbrep;
		ResultsToPush['urlr']=url;
		ResultsToPush['id_site']=idSite;	
		if (!ResultsToPush['noactif']||ResultsToPush['noactif']==""){
			if (is404) ResultsToPush['noactif']="is404";
		}

		chrome.runtime.sendMessage({doPost1: ResultsToPush});
	}else{return false;} 
	return false;
}


castorus.checkList = function (url,UrlPatterns,tabid){
	if(url && UrlPatterns[0] != null && UrlPatterns.length>-1){

		resultAnalyse = new Object();	
		
		for (parse in UrlPatterns) {

			var critarray=UrlPatterns[parse];
			var critName=Object.getOwnPropertyNames(critarray);
			var critPattern=critarray[Object.keys(critarray)[0]];

			if (critName=="liste"){
				
				resultAnalyse[critName]=castorus.checkListXPath(critPattern,UrlPatterns,url);
			}
			
		}
		if(Object.keys(resultAnalyse).length>1) {
			//
		}
	}
}
castorus.checkIdUrl = function (url,UrlPatterns){
	
	var matches = url.match(UrlPatterns);
	if(matches) {
		
		return matches[1];
	}else{
		
		return false;
	}
}



castorus.checkPattern = function (url,UrlPatterns,tabid){
	if(url && UrlPatterns[0] != null && UrlPatterns.length>-1){

		var ResultsToPush = {};
        var repReg = "";

		for (parse in UrlPatterns) {

			var critarray=UrlPatterns[parse];
			var critName=String(Object.getOwnPropertyNames(critarray));
			var critPattern=critarray[Object.keys(critarray)[0]];

			if (critName.match("frameInsert")) {
				if(critName=="frameInsertMethod") 	 frameInsertMethod=critPattern;
                if(critName=="frameInsertMethod2")   frameInsertMethod2=critPattern;
				if(critName=="frameInsertTypeNode")  frameInsertTypeNode=critPattern;
                if(critName=="frameInsertTypeNode2") frameInsertTypeNode2=critPattern;
				if(critName=="frameInsertNodeName")  frameInsertNodeName=critPattern;
                if(critName=="frameInsertNodeName2") frameInsertNodeName2=critPattern;
				if(critName=="frameInsertCss") 		 frameInsertCss=critPattern;
                if(critName=="frameInsertCss2")      frameInsertCss2=critPattern;
				if(critName=="frameInsertHtmlNode")  frameInsertHtmlNode=critPattern;
                if(critName=="frameInsertHtmlNode2") frameInsertHtmlNode2=critPattern;
			}else{
				
				if(idSite>0){ //realestate => xPath
					
					ResultsToPush[critName]=castorus.checkIdXPath(critPattern);					
				}else{ 
                    if (!ResultsToPush[critName]){
    					
    					if (critPattern.lastIndexOf("^https", 0) === 0){
    						
    						repReg=castorus.checkIdUrl(url,critPattern);
    						if(repReg!=""&&repReg!="undefined") ResultsToPush[critName]=repReg;

    					}else{
    						
                            repReg=castorus.checkIdXPath(critPattern);
    						if(repReg!=""&&repReg!="undefined")  ResultsToPush[critName]=repReg;
    					}
					}
				}
			}
		}








		if(Object.keys(ResultsToPush).length>0) {


			if(idSite>0) 				ResultsToPush["CurrentUrl"] 			= url;
			if(idDomain>0) 				ResultsToPush["idDomain"] 				= idDomain;
			if(frameInsertMethod) 	 	ResultsToPush["frameInsertMethod"] 		= frameInsertMethod;
            if(frameInsertMethod2) 	 	ResultsToPush["frameInsertMethod2"] 	= frameInsertMethod2;
			if(frameInsertTypeNode) 	ResultsToPush["frameInsertTypeNode"] 	= frameInsertTypeNode;
            if(frameInsertTypeNode2) 	ResultsToPush["frameInsertTypeNode2"] 	= frameInsertTypeNode2;
			if(frameInsertNodeName) 	ResultsToPush["frameInsertNodeName"] 	= frameInsertNodeName;
            if(frameInsertNodeName2) 	ResultsToPush["frameInsertNodeName2"] 	= frameInsertNodeName2;
			if(frameInsertCss) 	 		ResultsToPush["frameInsertCss"] 		= frameInsertCss;
            if(frameInsertCss2) 	 	ResultsToPush["frameInsertCss2"] 		= frameInsertCss2;
			if(frameInsertHtmlNode) 	ResultsToPush["frameInsertHtmlNode"] 	= frameInsertHtmlNode;
            if(frameInsertHtmlNode2) 	ResultsToPush["frameInsertHtmlNode2"] 	= frameInsertHtmlNode2;
			
			ResultsToPush["tabId"]=tabidTmp;

			
			if(idSite>0&&!ResultsToPush['prix']&&ResultsToPush['noactif']&&ResultsToPush['CurrentUrl']) ResultsToPush['urlna']=url;

			test=JSON.stringify(ResultsToPush, null, "  ");
						
			ResultsToPush['id_site']=idSite;		
			idTmp=ResultsToPush['id'];
			if(
				idTmp==='' 
				|| idTmp===false 
				|| idTmp===null 
				|| idTmp===undefined 
				|| idTmp===NaN
			) idTmp=ResultsToPush['id2'];		
            
            chrome.runtime.sendMessage({doPost2: ResultsToPush});


		}else{
			//
		}
	}
}	


castorus.constructUrlIframe = function (merchantIdProduct,t,tabid){
	if (idDomain&&merchantIdProduct){
		var upUrl="https://" + wsdomain + "/up/" + idDomain + "/" + merchantIdProduct + "/"+ t +"/c~" + courantDate;
		castorus.loadIframe(upUrl,tabid);
	}else{return false;}
}


castorus.addaidtoaclass = function(val,frameInsertHtmlNode){
    //
    var vClass=""+val+"";
    vClass = vClass.replace(/^\ufeff*([\s\S]+?)\ufeff*$/,'$1');
    vClass = vClass.trim();
    var rep="";
    var divs = document.getElementsByTagName(frameInsertHtmlNode);    
    for (var i = 0 ; i < divs.length ; ++i)   {
        rep=""+divs[i].className+"";
        //
        rep = rep.replace(/^\ufeff*([\s\S]+?)\ufeff*$/,'$1');
        if (rep==vClass)    {
            divs[i].setAttribute("id","CASTORUSmypropertyfixedid");
            //
        }
    }
}
castorus.insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
castorus.addNewStyle = function (newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}
castorus.changeBodyHeight = function (h){
   	   var p = document.body;
   	   var bodyStyle  = p.currentStyle || window.getComputedStyle(p);
   	   var bodyHeight = parseInt(bodyStyle.marginTop)+h;
   	   //castorus.dbg("bodyHeight : "+bodyHeight);
   	   document.body.setAttribute('style','margin-top:'+bodyHeight+'px !important;');
}
castorus.insertIframe = function (ifrm,frameInsertTypeNode,frameInsertMethod,frameInsertNodeName,frameInsertCss){
	   if (frameInsertCss=="undefined") frameInsertCss=false;

        var vClass=""+frameInsertNodeName+"";
        vClass=vClass.replace(/^\ufeff*([\s\S]+?)\ufeff*$/,'$1');
        vClass=vClass.trim();        
        
        if (frameInsertTypeNode=="class")       { castorus.addaidtoaclass(vClass,frameInsertHtmlNode);var reference = document.getElementById("CASTORUSmypropertyfixedid");}
        if (frameInsertTypeNode=="id")          { var reference = document.getElementById(vClass);}    
        if (frameInsertTypeNode=="xpath")       { var reference = document.evaluate( vClass ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;}   
        if(reference){
            if (frameInsertMethod=="insertBefore")  {reference.parentNode.insertBefore(ifrm, reference);}
            if (frameInsertMethod=="append")        {reference.appendChild(ifrm);}
            if (frameInsertMethod=="insertAfter")   {castorus.insertAfter(ifrm,reference);}
            
            return true;
        }else{
            //
        }
}
castorus.insertProductFrame = function (upUrl){

   castorus.changeBodyHeight(iframeFixedHeight);
   ifrm = document.createElement("IFRAME");     
   ifrm.setAttribute("src", upUrl);
   ifrm.setAttribute("id", iframeName);
   ifrm.setAttribute("name", iframeName);
   ifrm.setAttribute("scrolling", "no");
   ifrm.style.width = 100+"%";
   ifrm.style.height =iframeFixedHeight+"px";
   ifrm.style.marginTop = 0+"px";
   ifrm.allowtransparency = 'true';
   ifrm.frameBorder = '0';
   ifrm.style.position = 'fixed';
   ifrm.style.zIndex = 10000000;
   ifrm.style.top = 0;
   ifrm.style.left = 0;
   document.body.insertBefore(ifrm, document.body.firstChild);
   return true;
}

castorus.loadIframe = function (upUrl, tabid){	


	var tabidcour=tabidTmp;
	var ifrm={};
	//
	if (tabidcour==tabid)	{
		
	   if(document.getElementById(iframeName)){
	   		
	   		var frame = document.getElementById(iframeName);
				frame.parentNode.removeChild(frame);
	   }
	   if(!document.getElementById(iframeName)){ // seulement si la frame n'a pas deja ete implante  
	   		
	   		if(idSite==0){//product
	   			   

                   if(frameInsertCss=="loadedInside"){
                        
                        ifrm = document.createElement("div"); 
                        ifrm.setAttribute("id", iframeName);
                        if(castorus.insertIframe(ifrm,frameInsertTypeNode,frameInsertMethod,frameInsertNodeName,frameInsertCss)){
                            
                            var dataToAff="__";
                            chrome.runtime.sendMessage({loadurl: upUrl},function(resp){
                                    if(resp){
                                        if(resp.length>100){

                                            dataToAff=resp;                                        

                                            ifrmProduct = document.createElement("IFRAME"); 
                                            ifrmProduct.setAttribute("src", upUrl);
                                            ifrmProduct.setAttribute("id", "CASTORUSDRUIDXHTML");
                                            ifrmProduct.style.width = 100+"%";
                                            ifrmProduct.style.height =100+"%";
                                            ifrmProduct.style.marginTop = 8+"px";
                                            ifrmProduct.style.maxHeight =90+"px";
                                            ifrmProduct.style.maxWidth =300+"px"; 
                                            ifrmProduct.allowtransparency = 'true';
                                            ifrmProduct.frameBorder = '0';
                                            if(!document.getElementById("CASTORUSDRUIDXHTML")){ // seulement si la frame n'a pas deja ete implante  )                                                   
                                                ifrm.appendChild(ifrmProduct);
                                            }

                                        }else{
                                            return false;
                                        }
                                    }else{
                                        var courantDate2         = new Date().getTime();
                                        
                                        return false;
                                    }
                            });
                        }else{

                            
                            castorus.insertProductFrame(upUrl.replace('_','~'));
                        }
                        

                   } else {
                       
                       castorus.insertProductFrame(upUrl.replace('_','~'));
                   }

			}else{

				if(frameInsertMethod&&frameInsertNodeName&&frameInsertCss&&frameInsertTypeNode){

                    ifrm = document.createElement("IFRAME"); 
                    ifrm.setAttribute("src", upUrl);
                    ifrm.setAttribute("id", iframeName);
                    ifrm.style.width = 100+"%";
                    ifrm.style.height =100+"%";
                    ifrm.style.border = 1+"px solid #cccccc";
                    ifrm.style.marginTop = 8+"px";
                    ifrm.style.minHeight =360+"px";
                    ifrm.style.maxHeight =370+"px";
                    ifrm.style.maxWidth =650+"px";
					

					castorus.insertIframe(ifrm,frameInsertTypeNode,frameInsertMethod,frameInsertNodeName,frameInsertCss);

                    
                    if(!document.getElementById(iframeName)){ 
                        
                        if(frameInsertMethod2&&frameInsertNodeName2&&frameInsertCss2&&frameInsertTypeNode2){
                            
                            castorus.insertIframe(ifrm,frameInsertTypeNode2,frameInsertMethod2,frameInsertNodeName2,frameInsertCss2)
                        }
                    }


				}
			}
	   	   
	   }
	   else{
	   	//
	   }
	}
}

castorus.modifIframe = function (t){
	
	if(document.getElementById(iframeName)){
		//init
		var ifrm={};
		ifrm = document.getElementById(iframeName);
		//close
		if(t==1){
			document.body.removeChild(ifrm);
			castorus.changeBodyHeight((iframeFixedHeight*-1));
		}
		//max resize
		else if(t==2){
			ifrm.style.height ="100%";
		}
		//min resize
		else if(t==3){
			
			ifrm.style.height =iframeFixedHeight+"px";
		}else{
			return null;
		}
	}
}
castorus.receiveMessage = function (e){

	if (e.origin !== "https://www.castorus.com") return;
	var resp = e.data;
	if 		(resp=="close")		{ castorus.modifIframe(1); }
	else if (resp=="maxresize")	{ castorus.modifIframe(2); }
	else if (resp=="minresize")	{ castorus.modifIframe(3); }
	else if (resp=="ready")		{ htmlIsReady=true; }
}

document.addEventListener('DOMContentLoaded', function () {
    //
}); 


castorus.checkHtmlReady = function (PatternToCheck,tabId){ // check if a pattern is in the document, so analyze can begin
	delaiToReCheck=50; //ms

	setTimeout(function () {
		timeChecking=timeChecking+delaiToReCheck;
		if (timeChecking>=3000||is404) return false;
		if(!castorus.checkIdXPath(PatternToCheck)) {
			castorus.checkHtmlReady(PatternToCheck,tabId);
		}else{
			
			timeChecking=0;

			
			if(Global['noactif']||Global['noactif2']||Global['noactif3']){
				if(
					(Global['noactif'] && castorus.checkIdXPath(Global['noactif'])) ||
					(Global['noactif2'] && castorus.checkIdXPath(Global['noactif2'])) ||
					(Global['noactif3'] && castorus.checkIdXPath(Global['noactif3']))
				) {
					is404 = true;
					
				}else{
					//
				}

			}else{
				//
			}

			castorus.stateChange(waitingTime,tabId);
			return false;
		}
	}, delaiToReCheck);

}

castorus.stateChange = function(delai,tabId) {
  delaiToReCheck=200; //ms
  var destiny = false;
  if(ModeList==1) destiny = true; 
  if(is404==true) destiny = true; 
  
  setTimeout(function () {
  	timeChecking=timeChecking+delaiToReCheck;

  	if(timeChecking>8000) destiny=true; 


	if(Global['frameInsertNodeName']){
		if(castorus.frameCanBeAdd(Global['frameInsertNodeName'],Global['frameInsertTypeNode'],Global['frameInsertHtmlNode'])) {
			destiny=true;

		}else{
			if(castorus.frameCanBeAdd(Global['frameInsertNodeName2'],Global['frameInsertTypeNode2'],Global['frameInsertHtmlNode2'])) {
				destiny=true;

			}else{
				//
			}
		}
	}else{
		//
	}



  	if (timeChecking>=delai&&destiny) {
  		timeChecking=0;
    	if( ModeList==1){
			castorus.checkList(urlTmp,UrlPatterns,tabId);
		}else{
			
			castorus.checkPattern(urlTmp,UrlPatterns,tabId);
		}
	}else{
		castorus.stateChange(delai,tabId);
	}


  }, delaiToReCheck);
}


castorus.frameCanBeAdd = function (NodeName, TypeNode, HtmlNode){
	    if (TypeNode=="class")       { 
	    	NodeName=""+NodeName+"";NodeName = NodeName.replace(/^\ufeff*([\s\S]+?)\ufeff*$/,'$1');NodeName = NodeName.trim();var rep="";var divs = document.getElementsByTagName(HtmlNode);    
		    for (var i = 0 ; i < divs.length ; ++i)   {
		        rep=""+divs[i].className+"";
		        rep = rep.replace(/^\ufeff*([\s\S]+?)\ufeff*$/,'$1');
		        if (rep==NodeName) var reference=true;
		    }
	    }
        if (TypeNode=="id")          { var reference = document.getElementById(NodeName);}    
        if (TypeNode=="xpath")       { var reference = document.evaluate( NodeName ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;}  
        if(reference) {
        	return true;
        } else {
        	return false;
        }
}


castorus.ItsTime = function (Global,tabId){
		urlTmp = Global["url"]; tabidTmp=tabId;//globalise
 		UrlPatterns = Global['UrlPatterns'];
 		idSite = Global['idSite'];
 		idDomain = Global['idDomain'];
 		domain = Global['Domain'];
 		ModeList = Global['list'];
 		myUserid = Global['myUserid'];
 		waitingTime = Global['waitingTime'];
 		if(UrlPatterns){

	 		var PatternIsFound=0; 
	 		var PatternToCheck=null;
	 		if (idSite ===0 ){ // Products
	 			waitingTime=waitingTime+1000;
	 		} 

	 		if(ModeList==0){ 
				for (parse in UrlPatterns) {
					var critarray=UrlPatterns[parse];
					var critName=String(Object.getOwnPropertyNames(critarray));
					var critPattern=critarray[Object.keys(critarray)[0]];
					if(critName=="frameInsertNodeName") Global['frameInsertNodeName']=critPattern;
					if(critName=="noactif") Global['noactif']=critPattern;
					if(critName=="frameInsertTypeNode") Global['frameInsertTypeNode']=critPattern;
					if(critName=="frameInsertHtmlNode") Global['frameInsertHtmlNode']=critPattern;
					if(critName=="frameInsertNodeName2") Global['frameInsertNodeName2']=critPattern;
					if(critName=="noactif2") Global['noactif2']=critPattern;
					if(critName=="frameInsertTypeNode2") Global['frameInsertTypeNode2']=critPattern;
					if(critName=="frameInsertHtmlNode2") Global['frameInsertHtmlNode2']=critPattern;					
				}
			}
			setTimeout(function () {
				castorus.checkHtmlReady("//body",tabId);
			}, waitingTime);
		}else{
			//
		}

	   
}	    



