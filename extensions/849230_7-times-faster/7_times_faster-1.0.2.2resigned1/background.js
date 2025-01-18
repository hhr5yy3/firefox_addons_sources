

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    hostname=trimWWW(hostname);

    return hostname;
}

function extractRootDomainFromHost(urlHost) {
    var domain = urlHost,
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    /*if(arrLen == 2)
    {
    	return domain;
    }  //else*/
    if (arrLen > 2) 
    {
    	var part2=splitArr[arrLen - 2];
   ////////////////////////////////////////////////add more???

   //if(part2=="com" || part2=="co" || part2=="go" || part2=="info" || part2=="net" || part2=="org" || part2=="web" || part2=="me")  
    	if(part2=="com" || part2=="co" || part2=="go" || part2=="info" || part2=="net" || part2=="org" || part2=="web" || part2=="me" || part2=="de" || part2=="ru" || part2=="pl" || part2=="biz" 
    		|| part2=="cn" || part2=="fr" || part2=="us" || part2=="in" || part2=="eu" || part2=="ca" || part2=="top" || part2=="ch" || part2=="ro" || part2=="hk" || part2=="es" 
    		|| part2=="cz" || part2=="se" || part2=="be" || part2=="at" || part2=="me" || part2=="tv" || part2=="xxx" || part2=="online" || part2=="gr" 
    		|| part2=="club" || part2=="ml" || part2=="ir" || part2=="website" || part2=="name" || part2=="win" || part2=="site" )    
    	{    		
    		if (arrLen > 3) 
    		{
		        domain = splitArr[arrLen - 3] + '.'+splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
		    }
    	}
    	else
    	{
        	domain = part2 + '.' + splitArr[arrLen - 1];
    	}
    }
    return domain;
}




var blockedCounter=0;

var whiteListPages = {};
var whiteListDomains={};
whiteListPages["1"]='1';
whiteListDomains["1"]='1';
var bd={};
bd["ad.com"]=0;

var bh={};
bh["ad.com"]=0;

var bl3={};
bl3["ad."]=0;

var bd1={};
bd1["ad."]=0;

var bh2={};
bh2["ad."]=0;

var bh3={};
bh2["ad."]=0;

var tabWhitelisted={};
var tabWhitelistedSocialMedia={};

var bsd={};
bsd["ad.com"]=0;

var bsh={};
bsh["ad.com"]=0;

var prBlockSocialMedia="0";

var boolRunning7="1";

var lstSocialMediaDomains={};
lstSocialMediaDomains["1"]=0;

//var lstSocialMediaHosts={};
//lstSocialMediaHosts["1"]=0;
//var lstSocialMediaHosts=["plus.google.com"];




	

function logURL(requestDetails) 
{				
	if(boolRunning7=="0")
		{return {cancel: false};}	

	/*if(requestDetails.url.indexOf("chrome-extension://")!=-1)
	{
		//console.log("HERE chrome-extension://");
		return {cancel: false};
	}*/    

    var currentHost=extractHostname(requestDetails.url);
    var currentDomain= extractRootDomainFromHost(currentHost);

	 var inTabWhitelisted=tabWhitelisted.hasOwnProperty(requestDetails.tabId);  
	 if(inTabWhitelisted)
	 {
	 	var whitelistedValue=tabWhitelisted[requestDetails.tabId];
	 	if(whitelistedValue==1)
	 	{
	 		//console.log("Whitelisted!!! : " + requestDetails.url);	 		 	
	 		return {cancel: false};
	 	}
	 }  

	 if(prBlockSocialMedia=="1")
	 {
	 	var checkLightSocialMedia=0;
	 	var inTabWhitelistedSocialMedia=tabWhitelistedSocialMedia.hasOwnProperty(requestDetails.tabId);  
		 if(inTabWhitelistedSocialMedia)
		 {
		 	var whitelistedSocialMediaValue=tabWhitelistedSocialMedia[requestDetails.tabId];
		 	if(whitelistedSocialMediaValue==1)
		 	{
		 		//console.log("Whitelisted SocialMedia!!! : " + requestDetails.url);	 		 	
		 		checkLightSocialMedia=1;
		 	}
		 }  

		 if(checkLightSocialMedia==0)
		 {
		 	if(currentDomain in bsd)
		 	{
		 		//console.log("mymax Blocked: bsd: " + requestDetails.url+"endzzz");	 	
			 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
			    return {cancel: true};
		 	}
		 	else if(currentHost in bsh)
		 	{
		 		//console.log("mymax Blocked: bsh: " + requestDetails.url+"endzzz");	 	
			 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
			    return {cancel: true};
		 	}
		 	else
		 	{		 		
			 		var sKeyFind=0;
				 	var sKeyValue="";
				 	var bsuLength=bsu.length;
				 	for(var ll=0;ll<bsuLength;ll++)
				    {
				      	if(requestDetails.url.indexOf(bsu[ll])!=-1)
				      	{
				          	sKeyFind=1;
				          	sKeyValue=bsu[ll];
				          	break;
				      	}	 	       
				    }
				    if(sKeyFind==1)
				    {
				    	//console.log("socKey =zzz "+sKeyValue+" mymax Blocked: BSU: " + requestDetails.url+"endzzz");	
				    	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
				    	return {cancel: true}; 	
				    }
		 	}
		 }
	 }
	
	 if(currentDomain=="youtube.com")
	 {
	 	if(requestDetails.url.indexOf("ad-container")!=-1 || requestDetails.url.indexOf("video-ads")!=-1 || requestDetails.url.indexOf("ytp-ad-progress-list")!=-1 
	 		|| requestDetails.url.indexOf("pagead")!=-1 || requestDetails.url.indexOf("api/stats")!=-1 || requestDetails.url.indexOf("ptracking")!=-1
	 		|| requestDetails.url.indexOf("adcompanion")!=-1 || requestDetails.url.indexOf("ad_companion")!=-1 || requestDetails.url.indexOf("ad_block")!=-1)
	 	{
	 		//console.log("mymax Blocked: yout: " + requestDetails.url+"endzzz");	 	
	 		return {cancel: true};
	 	}
	 }	
	 
	 if(currentDomain in bd1)
	 {
	 	//console.log("mymax Blocked: bd100: " + requestDetails.url+"endzzz");	 	
	 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
	    return {cancel: true};
	 }
	 else if(currentHost in bh2)
	 {
	 	//console.log("mymax Blocked: bh200: " + requestDetails.url+"endzzz");	 	
	 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
	    return {cancel: true};
	 }
	 else if(currentHost in bh3)
	 {
	 	//console.log("mymax Blocked: bh300: " + requestDetails.url+"endzzz");
	 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});	 	
	    return {cancel: true};
	 }
	 else if(currentDomain in bd)
	 {
	 	//console.log("mymax Blocked: bdbig: " + requestDetails.url+"endzzz");	 	
	 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
	    return {cancel: true};
	 }	
	 else if(currentHost in bh)
	 {
	 	//console.log("mymax Blocked: bhbig: " + requestDetails.url+"endzzz");	 	
	 	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
	    return {cancel: true};
	 }		
	 else
	 {	 		 	
	 	var fKeyFind=0;
	 	var fKeyValue="";
	 	
	    var bpuLength=bpu.length;
		for(var jj=0;jj<bpuLength;jj++)
		{				 			 	
			if(requestDetails.url.indexOf(bpu[jj])!=-1)
	      	{
	          	fKeyFind=1;
	          	fKeyValue=bpu[jj];
	          	break;
	      	}
		}	

	    if(fKeyFind==1)
	    {
	    	//whitelist for microsoft.com
	    	if(fKeyValue=="/ad-")
	    	{
	    		if(currentHost== "statics-marketingsites-neu-ms-com.akamaized.net")
	    		{
	    			//console.log("Allowed: "+currentHost);	
	    		}
	    		else
	    		{
	    			//console.log("Key =zzz "+fKeyValue+" mymax Blocked: BPU: " + requestDetails.url+"endzzz");	
			    	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
			    	return {cancel: true};
	    		}
	    	}
	    	else
	    	{
		    	//console.log("Key =zzz "+fKeyValue+" mymax Blocked: BPU: " + requestDetails.url+"endzzz");	
		    	chrome.browserAction.setBadgeText({text: (++blockedCounter).toString()});
		    	return {cancel: true};
	    	} 	
	    }
	 }
	 

	//console.log("Allowed: " + requestDetails.url);	 
	return {cancel: false};
}

function trimWWW(str)
{	
	if(str.indexOf("www.")==0)
	{
		return str.replace("www.","");	
	}
	
	return str;	

	//return str.replace("www.","");	
}

function dropBadgeText()
{
	chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
	chrome.browserAction.setBadgeText({text:""});
}

function stoppedBadgeText()
{
	chrome.browserAction.setBadgeBackgroundColor({color: "red"});;
	chrome.browserAction.setBadgeText({text:"STOP"});	
}

chrome.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]},
  ["blocking"]
);

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
   
   if(details.frameId === 0)
   {   		
	    //var ccHost=trimWWW(extractHostname(details.url))
	    var ccHost=extractHostname(details.url);
	    //console.log("Before nav: "+ccHost);
	    	    	  	  
			var pppChecked=0;
			//loadWhiteListDomains();
			if(ccHost in whiteListDomains)
		    {		    			    	
		    	pppChecked=1;
		    	tabWhitelisted[details.tabId]=1;		    	
		    }
		    else
		    {		    	
		    	tabWhitelisted[details.tabId]=0;		    		    			    	
		    }    

			if(pppChecked==0)
			{
					//loadWhiteListPages();
			    
			    if(details.url in whiteListPages)
			    {			    	
			    	tabWhitelisted[details.tabId]=1;		 			    	
			    }
			    else
			    {			    
			    	tabWhitelisted[details.tabId]=0;	    				    	
			    }    
			}

			if(prBlockSocialMedia=="1")
			{
				var currentDomain= extractRootDomainFromHost(ccHost);

				var boolDomainFound=0;
				if(currentDomain in lstSocialMediaDomains)
			 	{
			 		//console.log("Whitelisted social media domain: " + details.url+"endzzz");	 	
				 	tabWhitelistedSocialMedia[details.tabId]=1;	
				 	boolDomainFound=1;
			 	}
			 	else
			 	{
			 		tabWhitelistedSocialMedia[details.tabId]=0;	
			 	}

			 	if(boolDomainFound==0)
			 	{
			 		/*if(ccHost in lstSocialMediaHosts)
				 	{
				 		//console.log("Whitelisted social media host: " + details.url+"endzzz");	 	
					 	tabWhitelistedSocialMedia[details.tabId]=1;						 	
				 	}
				 	else
				 	{
				 		tabWhitelistedSocialMedia[details.tabId]=0;	
				 	}*/
				 	var boolHostFound=0;
				 	for(var ii=0;ii<lstSocialMediaHosts.length;ii++)
				 	{
				 		if(ccHost==lstSocialMediaHosts[ii])
				 		{
				 			boolHostFound=1;
				 			break;
				 		}
				 	}
				 	if(boolHostFound==1)
				 	{
				 		//console.log("Whitelisted social media host: " + details.url+"endzzz");	 	
					 	tabWhitelistedSocialMedia[details.tabId]=1;	
				 	}
				 	else
				 	{
				 		tabWhitelistedSocialMedia[details.tabId]=0;	
				 	}
			 	}
			}

	}
});

function initDropBadgeText()
{	
	//if(localStorage["isRunning7TimesFaster"]=="0")
	if(boolRunning7=="0")
	{
		stoppedBadgeText();
	}
	else
	{
		//dropBadgeText(); 
		//chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		setBadgeColorBlue();
	}
}

function setBadgeColorBlue()
{
	chrome.browserAction.setBadgeBackgroundColor({color: "blue"});
}

function getBlockSocialMedia()
{
	var isBlockSocialMedia=localStorage["blockSocialMedia"];
	if ("undefined" === typeof isBlockSocialMedia) 
	{
    	//console.log("variable is undefined. isBlockSocialMedia");
    	prBlockSocialMedia="0";
	}
	else
	{
		prBlockSocialMedia=isBlockSocialMedia;		
	}
}

function getIsRunning7()
{
	var isRun7=localStorage["isRunning7TimesFaster"];
	if ("undefined" === typeof isRun7) 
	{
    	//console.log("variable is undefined. isRun7");
    	boolRunning7="1";
	}
	else
	{
		boolRunning7=isRun7;		
	}
}

function loadOptions()
{	
	//console.log("loadOptions()");

	getIsRunning7();
	
	initDropBadgeText();

	getBlockSocialMedia();

	
	
	
		loadWhiteListPages();
		
		loadWhiteListDomains();

		loadBlockListTop100();
		
		loadBlockListTop200();
		
		loadBlockListTop300();
		
		loadBlockListPages();
		loadBlockListHostName();

		//loadBlockListPartURL();
		
		loadBlockSocialDomain();
		loadBlockSocialHost();
		//loadBlockSocialURL();

		loadSocialMediaDomains();	
		//loadSocialMediaHosts();
		

	blockedCounter=0; 
}

function isEmptyOrSpaces(str)
{
	if ("undefined" === typeof str) 
		return true;
    return str === null || str.match(/^ *$/) !== null;
}

function loadWhiteListPages()
{	
	var wlp=localStorage["whiteListPages"];	

	if ("undefined" === typeof wlp) 
	{
    	//console.log("variable is undefined. wlp");
	}
	else
	{
		whiteListPages=JSON.parse(wlp);			
	}	
}

function loadWhiteListDomains()
{
	var wld=localStorage["whiteListDomains"];
	
	if ("undefined" === typeof wld) 
	{
    	//console.log("variable is undefined. wld");
	}
	else
	{
		whiteListDomains=JSON.parse(wld);			
	}	
}


function handleMessage(request, sender, sendResponse) 
{
  //console.log("Message from the popup script: " + request.greeting);

  if(request.greeting=="reloadwhitelist")
  {
  	//console.log("reloading whitelist. paramCalled = "+ request.paramCalled);
  	loadWhiteListPages();
	loadWhiteListDomains();

	sendResponse({bResponse: "reloadfinished", paramResponse: request.paramCalled});	
  }
  else if(request.greeting=="socialmedia")
  {
  		//console.log("Social media change. paramCalled = "+ request.paramCalled);
  		prBlockSocialMedia=request.paramCalled;
  }
  else if(request.greeting=="isrun")
  {
  		//console.log("Is run change. paramCalled = "+ request.paramCalled);
  		boolRunning7=request.paramCalled;
  }
  else if(request.greeting=="reloadwhitelistedpages")
  {
  		loadWhiteListPages();
  		//console.log("reloading whitelisted pages");
  }
  else if(request.greeting=="reloadwhitelisteddomains")
  {
		loadWhiteListDomains();
		//console.log("reloading whitelisted domains");
  }
  else
  {
  	//console.log("some another message");
  } 
}

document.addEventListener('DOMContentLoaded', function() {
    var btnStart7TimesFaster = document.getElementById('btnStart7TimesFaster');
    if(btnStart7TimesFaster)
    {		   
		    btnStart7TimesFaster.addEventListener('click',start7TimesFaster);
	}

	var btnStop7TimesFaster = document.getElementById('btnStop7TimesFaster');
    if(btnStop7TimesFaster)
    {		   
		    btnStop7TimesFaster.addEventListener('click',stop7TimesFaster);
	}	
		
	var btnDontRunOnThisPage = document.getElementById('btnDontRunOnThisPage');
    if(btnDontRunOnThisPage)
    {		   
		    btnDontRunOnThisPage.addEventListener('click',dontRunOnThisPage);
	}

	var btnRunOnThisPage = document.getElementById('btnRunOnThisPage');
    if(btnRunOnThisPage)
    {		   
		    btnRunOnThisPage.addEventListener('click',runOnThisPage);
	}

	var btnDontRunOnThisDomain = document.getElementById('btnDontRunOnThisDomain');
    if(btnDontRunOnThisDomain)
    {		   
		    btnDontRunOnThisDomain.addEventListener('click',dontRunOnThisDomain);
	}

	var btnRunOnThisDomain = document.getElementById('btnRunOnThisDomain');
    if(btnRunOnThisDomain)
    {		   
		    btnRunOnThisDomain.addEventListener('click',runOnThisDomain);
	}

	loadOptions();
});

chrome.runtime.onMessage.addListener(handleMessage);




