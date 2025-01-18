var apiPath='https://ourstickys.com/api/';
var numThemes=13;
var oldLocationHref=location.href;
var defaultZIndex='2147483000';
var defaultZIndexFocus='2147483647';
var move_captured=null;
var resize_captured=null;
var authenticatedWith={};
var facebookSuccessURL='https://www.facebook.com/connect/login_success.html';
var facebookAuthenticationURL='https://www.facebook.com/dialog/oauth?client_id=370916276632960&response_type=token&scope=email&redirect_uri='+facebookSuccessURL;
var showingNotes=true;
var isBackground=false;	//am I running in the background
var popupWindowId=0;
var minDimensions={
	width: 90,
	height: 55
};
var isFirefox=navigator.userAgent.toLowerCase().indexOf('firefox')>-1;
var isChrome=navigator.userAgent.toLowerCase().indexOf('chrome')>-1;

if(isFirefox){
	chrome = browser;
}

//Timeouts
var initTimeout=false;
var saveTimeout={};
var lockTimeout={};
var loadTimeout=false;

//share
var shareURL='https://ourstickys.com/s?';
