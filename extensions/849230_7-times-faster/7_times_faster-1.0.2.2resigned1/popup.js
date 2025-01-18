
var whiteListPages = {};
var whiteListDomains={};
whiteListPages["1"]='1';
whiteListDomains["1"]='1';

function trimWWW(str)
{	
	if(str.indexOf("www.")==0)
	{
		return str.replace("www.","");	
	}
	
	return str;	

	//return str.replace("www.","");	
}

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

function setBadgeColorBlue()
{
	chrome.browserAction.setBadgeBackgroundColor({color: "blue"});
}

function initDropBadgeText()
{	
	if(localStorage["isRunning7TimesFaster"]=="0")
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

function isEmptyOrSpaces(str)
{
	if ("undefined" === typeof str) 
		return true;
    return str === null || str.match(/^ *$/) !== null;
}

function saveWhiteListPages()
{
	localStorage["whiteListPages"]=JSON.stringify(whiteListPages);			
}

function saveWhiteListDomains()
{
	localStorage["whiteListDomains"]=JSON.stringify(whiteListDomains);			
}

function checkJSONSize()
{	
	var bp=byteLength(JSON.stringify(whiteListPages));
	var bd=byteLength(JSON.stringify(whiteListDomains));
	var bpdSum=0;
	bpdSum=bp+bd;
	var whiteMemoryLimit=400000;
	//console.log("JSON byte size = "+bpdSum);
	if(bpdSum<whiteMemoryLimit)
	{
		return 1;
	}
	return 0;		
}

function byteLength(str) 
{
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}

function reloadCurrentPage()
{	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });   
}

function start7TimesFaster()
{		
	localStorage["isRunning7TimesFaster"] = "1";
	sendToBackgroundIsRun("1");

	document.getElementById('btnStart7TimesFaster').style.display = "none";
	document.getElementById('btnStop7TimesFaster').style.display = "block";

	setBadgeColorBlue();
	//dropBadgeText();
	reloadCurrentPage();
	loadRunOnThisPageOption();
	loadRunOnThisDomainOption();
}

function stop7TimesFaster()
{
	localStorage["isRunning7TimesFaster"] = "0";
	sendToBackgroundIsRun("0");

	document.getElementById('btnStart7TimesFaster').style.display = "block";
	document.getElementById('btnStop7TimesFaster').style.display = "none";

	//document.getElementById('resultBox').value+= " "+localStorage["isRunning7TimesFaster"];
	stoppedBadgeText();
	reloadCurrentPage();
	loadRunOnThisPageOption();
	loadRunOnThisDomainOption();
}

function dontRunOnThisPage()
{	
	var checkMemSize=checkJSONSize();
	if(checkMemSize==1)
	{

		chrome.tabs.query({active : true, currentWindow: true}, function (tabs) 
		{		    
		    var ccURL=tabs[0].url; //id
		    
		    whiteListPages[ccURL]='1';
			
			saveWhiteListPages();
			loadWhiteListPages();
			sendToBackgroundReloadWhitelist("dontPage");
		});
	}
	else
	{
		alert("Storage is full! Please, clean it by deleting some pages or domains on options page. You can find it on extensions management page. Or by viewing chrome://extensions/, 7 Times Faster, Options link.");
	}
}

function dontRunOnThisDomain()
{	
	var checkMemSize=checkJSONSize();
	if(checkMemSize==1)
	{
		chrome.tabs.query({active : true, currentWindow: true}, function (tabs) 
		{
		   
		    var ccURL=tabs[0].url; //id		    
		    //var ccURLHostName=trimWWW(extractHostname(ccURL));
		    var ccURLHostName=extractHostname(ccURL);

	        whiteListDomains[ccURLHostName]='1';

			saveWhiteListDomains();	
			loadWhiteListDomains();
			sendToBackgroundReloadWhitelist("dontDomain");
		});		
	}
	else
	{
		alert("Storage is full! Please, clean it by deleting some pages or domains on options page. You can find it on extensions management page. Or by viewing chrome://extensions/, 7 Times Faster, Options link.");
	}
}

function runOnThisPage()
{
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) 
		{		    
		    var ccURL=tabs[0].url; //id

		    if(isEmptyOrSpaces(ccURL))
			{		
				return;
			}		   
		    
		    delete whiteListPages[ccURL];	       	

			saveWhiteListPages();
			
			sendToBackgroundReloadWhitelist("doPage");								
		});
}

function runOnThisDomain()
{
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) 
		{		   
		    var ccURL=tabs[0].url; //id
		    //var ccURLHostName=trimWWW(extractHostname(ccURL));
		    var ccURLHostName=extractHostname(ccURL);
		    if(isEmptyOrSpaces(ccURLHostName))
			{		
				return;
			}		   
		    
		    delete whiteListDomains[ccURLHostName];	       		   	
			saveWhiteListDomains();	
			
			sendToBackgroundReloadWhitelist("doDomain");
		});
}

function loadRunOnThisPageOption()
{	
	var vbtnRunOnThisPage=document.getElementById('btnRunOnThisPage');
	var vbtnDontRunOnThisPage=document.getElementById('btnDontRunOnThisPage');	

	if(vbtnRunOnThisPage && vbtnDontRunOnThisPage)
	{				
		chrome.tabs.query({active : true, currentWindow: true}, function (tabs) {
		    
		    var ccURL=tabs[0].url; //id
		   
		    var fPageWhite=0;
		    if(ccURL in whiteListPages)
		    {
		    	fPageWhite=1;
		    }

		    if(localStorage["isRunning7TimesFaster"]==0 ) // whiteD=="whitedomain"
			{
				vbtnRunOnThisPage.style.display = "none";
				vbtnDontRunOnThisPage.style.display = "none";				
			}
			else if(fPageWhite==0)
			{
				vbtnRunOnThisPage.style.display = "none";
				vbtnDontRunOnThisPage.style.display = "block";		
			}
			else
			{
				vbtnRunOnThisPage.style.display = "block";
				vbtnDontRunOnThisPage.style.display = "none";
			}	     

		});
	}	
}

function loadRunOnThisDomainOption()
{	
	var vbtnRunOnThisDomain=document.getElementById('btnRunOnThisDomain');
	var vbtnDontRunOnThisDomain=document.getElementById('btnDontRunOnThisDomain');	

	if(vbtnRunOnThisDomain && vbtnDontRunOnThisDomain)
	{		
		chrome.tabs.query({active : true, currentWindow: true}, function (tabs) 
		{		   
		    var ccURL=tabs[0].url; 
		    var ccURLHostName=extractHostname(ccURL);
		    //var ccURLHostName=trimWWW(extractHostname(ccURL));

		    var fDomainWhite=0;
		    if(ccURLHostName in whiteListDomains)
		    {
		    	fDomainWhite=1;
		    }
		    

		    if(localStorage["isRunning7TimesFaster"]==0)
			{
				vbtnRunOnThisDomain.style.display = "none";
				vbtnDontRunOnThisDomain.style.display = "none";				
			}
			else if(fDomainWhite==0)
			{
				vbtnRunOnThisDomain.style.display = "none";
				vbtnDontRunOnThisDomain.style.display = "block";		
			}
			else
			{
				vbtnRunOnThisDomain.style.display = "block";
				vbtnDontRunOnThisDomain.style.display = "none";				
			}				  
		});
	}		
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

function initBlockSocialMedia()
{
	var isBlockSocialMedia=localStorage["blockSocialMedia"];
	var cbBlockSocialMedia=document.getElementById('cbSocialMedia');
	var isBSM="0";
	if ("undefined" === typeof isBlockSocialMedia) 
	{
    	//console.log("variable is undefined. isBlockSocialMedia");
    	isBSM="0";
	}
	else
	{
		isBSM=isBlockSocialMedia;		
	}

	if(cbSocialMedia)
	{
		if(isBSM=="1")
		{
			cbSocialMedia.checked=true;
		}
		else
		{
			cbSocialMedia.checked=false;
		}
	}
}


function loadOptions()
{		
	var isRun7=localStorage["isRunning7TimesFaster"];
	if ("undefined" === typeof isRun7) 
	{
    	//console.log("variable is undefined. isRun7");
    	//boolRunning7="1";
    	localStorage["isRunning7TimesFaster"]="1";
	}
	

	var btnStart7TimesFaster=document.getElementById('btnStart7TimesFaster');
	var btnStop7TimesFaster=document.getElementById('btnStop7TimesFaster');

	initDropBadgeText();
	initBlockSocialMedia();

	if(btnStart7TimesFaster && btnStop7TimesFaster)
	{		
		if(localStorage["isRunning7TimesFaster"]=="0")
		{
			btnStart7TimesFaster.style.display = "block";
			btnStop7TimesFaster.style.display = "none";			
		}
		else
		{
			btnStart7TimesFaster.style.display = "none";
			btnStop7TimesFaster.style.display = "block";			
		}
	}
	
		loadWhiteListPages();
		loadWhiteListDomains();
			
	 loadRunOnThisDomainOption();
	    loadRunOnThisPageOption();      
	
}

function sendToBackgroundReloadWhitelist(paramFunction)
{
	//console.log("send to reload");
	chrome.runtime.sendMessage({greeting: "reloadwhitelist", paramCalled: paramFunction}, function(response) {
  		//console.log("response here = "+response.bResponse+" paramResponse = "+response.paramResponse);
  		
  		if(response.bResponse=="reloadfinished")
  		{
  			reloadCurrentPage();
  			if(response.paramResponse=="dontPage")
  			{  				
				loadRunOnThisPageOption();
				//dropBadgeText();
  			}
  			else if(response.paramResponse=="dontDomain")
  			{  					
				loadRunOnThisDomainOption();
				//dropBadgeText();
  			}
  			else if(response.paramResponse=="doPage")
  			{  				
				loadRunOnThisPageOption();
  			}
  			else if(response.paramResponse=="doDomain")
  			{			
				loadRunOnThisDomainOption();	
  			}
  		}
	});
}

function sendToBackgroundSocialMedia(paramIsBlock)
{
	//console.log("send social media");
	chrome.runtime.sendMessage({greeting: "socialmedia", paramCalled: paramIsBlock});
}

function sendToBackgroundIsRun(paramIsRun)
{
	//console.log("send is run");
	chrome.runtime.sendMessage({greeting: "isrun", paramCalled: paramIsRun});
}

function btnOptionsClick()
{	
    chrome.runtime.openOptionsPage();
}

function btnDonationClick()
{	
    window.open(chrome.runtime.getURL('donation.html'));
}

function cbSocialMediaClick()
{
	var cbBlockSocialMedia=document.getElementById('cbSocialMedia');
	
	if(cbBlockSocialMedia)
	{
		if(cbBlockSocialMedia.checked)
		{
			localStorage["blockSocialMedia"]="1";
			sendToBackgroundSocialMedia("1")
		}
		else
		{
			localStorage["blockSocialMedia"]="0";
			sendToBackgroundSocialMedia("0")
		}
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

	var btnOptions = document.getElementById('btnOptions');
    if(btnOptions)
    {		   
		    btnOptions.addEventListener('click',btnOptionsClick);
	}

	var btnDonation = document.getElementById('btnDonation');
    if(btnDonation)
    {		   
		    btnDonation.addEventListener('click',btnDonationClick);
	}

	var cbSocialMedia = document.getElementById('cbSocialMedia');
    if(cbSocialMedia)
    {		   
		    cbSocialMedia.addEventListener('click',cbSocialMediaClick);
	}


	loadOptions();	
});