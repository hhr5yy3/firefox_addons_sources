"use strict";

var hostName = "com.ithit.nativehost.v5";
var storageKey = "state";
var tabId = -1;

init();

function onMessage(request, sender, sendResponse) {
	tabId = sender.tab.id;
    if('schema' == request.type){
		getSchemes()
			.then(function (schemes) {
				sendResponse(schemes);
			})
			.catch(function (error) {
				sendResponse({"error": error});
			});
	}else if ('cookie' == request.type) {
        getCookies(request)
            .then(function (cookiesUrl) {
                sendResponse(cookiesUrl);
            })
            .catch(function (error) {
                sendResponse({"error": error});
            });
    }else if('init_anon' == request.type){
		initAnon(request);
	}

    return true;
}

function init() {
    browser.runtime.onMessage.addListener(onMessage);
    //browser.runtime.onSuspend is not supported in FF
    //browser.runtime.onSuspend.addListener(function () {
    //chrome.storage.local.clear();
    //});
}

function getSchemes() {
	return new Promise(function (resolve, reject) {
		chrome.runtime.sendNativeMessage(hostName, {act: 'get_protocols', b_name:'Firefox', b_ver:getFirefoxVersion()}, function (message) {
			if (chrome.runtime.lastError) {
				message = {error: chrome.runtime.lastError.message};
			}
            resolve(message);
		});
	});
}

// Get cookies for active tab
function getCookies(details) {
    let url = details.taburl;
    let port = new URL(url).port;
    if(port){ //if port is found

        let i = url.indexOf(':' + port);
        url = url.substring(0, i);
    }
    
	// get url without port
    let params = getParams(details.uri);
    let itemUrl = unescape(params.ItemUrl);
    try {itemUrl = JSON.parse(itemUrl)[0] || ''} catch(e) {}
    //let domainMatch = itemUrl.match(/^(https?\:\/\/[^\/:?#]+)(?:[\/:?#]|$)/i);
    //let domain = domainMatch && domainMatch[1];  // domain will be null if no match is found
	let cookiePathMatch = itemUrl.match(/^(.*[\\\/])/i);		
	let cookiePath = cookiePathMatch && cookiePathMatch[1];
    const cookies = [];
    if (params.CookieNames) for(const cookieName of params.CookieNames.split(",")){
        cookies.push(new Promise(function(resolve, reject){
            if(cookiePath){
                resolve( browser.cookies.get({url: cookiePath, name: cookieName}));
            }else{
                resolve( browser.cookies.get({url: details.taburl, name: cookieName}));
            }
        }));
    }
    return Promise.all(cookies).then(cookies => {
          return new Promise(function(resolve, reject){
                elaborateCookies(details.uri, cookies, params, resolve, reject);
          });
      });
}


function elaborateCookies(uri, cookies, params, resolve, reject){
    cookies = cookies.filter(function(el) { return el !== null; });
	cookies = filterCookies(cookies, params);
	if(cookies && cookies.length == 0) {
		reject("Cookies with names '"+params.CookieNames+"' not found.");
    }
	if(isExtendExpDate(cookies, params)){
		let hour_on_extend = 5;
		let msg = 'To execute this command the authentication cookie will be saved as permanent for '+hour_on_extend+' hours.\\n\\nTo avoid this message log-in with \"Keep me logged-in\" option checked.';
		doConfirm(msg, function(isConfirmed){
			if(isConfirmed){
				var finalUrl = prepareCookiesUrl(uri, cookies, true);
				if(finalUrl){
					if(finalUrl.length > 2040 && isWin7()){
						browser.runtime.sendNativeMessage(hostName, {act: 'open_protocol', url: finalUrl}, function (message) {});
					}else{
						resolve(finalUrl);
					}
				}else{
					reject("No cookies found.");
				}
			}else{
				reject("Selected NO on save the authentication cookie as permanent for "+hour_on_extend+" hours");
			}
		});
	}else{
		var finalUrl = prepareCookiesUrl(uri, cookies, false);
		if(finalUrl){
			if(finalUrl.length > 2040 && isWin7()){
				browser.runtime.sendNativeMessage(hostName, {act: 'open_protocol', url: finalUrl}, function (message) {});
			}else{
				resolve(finalUrl);
			}
		}else{
			reject("No cookies found.");
		}
	}
}
	
function prepareCookiesUrl(uri, cookies, isExtendExpDate){
	if (cookies.length > 0) {
		// result json
		var json = '[';
		for (let cookie of cookies) {
			let flags = 0;
			if(cookie.secure)
				flags |= 1 << 1; // secure flag on first position
			if(cookie.httpOnly)
				flags |= 1 << 2;
			if(cookie.hostOnly)
				flags |= 1 << 3;
			if(cookie.session)
				flags |= 1 << 4;
			let exp = cookie.expirationDate;
			if(exp){
				exp *= 1000;
			}			  
			if(!exp && isExtendExpDate){
				let hour_on_extend = 5;
				exp = new Date(new Date().getTime() + 1000*60*60*hour_on_extend).getTime();
			}
			json += '{' + 
						'"KEY":"'+cookie.name + '"' +
						',"VALUE":"'+ cookie.value + '"' +
						',"DOMAIN":"'+ cookie.domain + '"' +
						',"FLAGS":'+ flags +
						',"PATH":"'+ cookie.path + '"';
			if(exp){
				json += ',"HIXP":'+ exp +
						',"LOXP":'+ 0;
			}
			json += '},';
		}
		json = json.slice(0, -1);
		json += ']';

		console.log('From Ext -> Cookies Uri:' + json);

		// base64 encode
		json = window.btoa(json);

		return uri + ';cookies=' + json;
	}
	return null;
}

function filterCookies(cookies, params){
	if(!params.CookieNames){
		// read all cookies
		return cookies;
	}else{
		let cookieNames = params.CookieNames.split(',');
		let cookiesResult = [];
		let missedCookies = [];
		// read only cookies specified in sCookieNames
		for(let cookieName of cookieNames){
			let cookies2 = cookies.filter(function(elem){return elem.name == cookieName;});
			if(cookies2.length === 0){
				missedCookies.push(cookieName);
			}else{
				cookiesResult = cookiesResult.concat(cookies2);
			}
		}
		if(missedCookies.length > 0){
			//if (any cookie in the sCookieNames is not found)
			// show messages exactly like in python code. Analyze LoginUrl parameter presence.
			if(!params.LoginUrl){
				doAlert('Authentication cookie(s) "' + missedCookies.join(',') + '" not found. \n\n' +
				'To avoid this message and redirect the user directly to the log-in page specify \"LoginUrl\" parameter.');
			}else{
				doConfirm('Session expired.\n\nSelect OK to navigate to the login page', function(isConfirmed){
					if(isConfirmed){
						// Get domain with schema
						let itemUrl = JSON.parse(unescape(params.ItemUrl))[0];
						let matches = itemUrl.match(/^https?\:\/\/([^\/?#]+)(?:|$)/i);
						let redirectUrl = params.LoginUrl;
						if(!params.LoginUrl.startsWith('http')){
							// If relative path, add domain with path without first slash
							redirectUrl = (matches && matches[0]) + '/' + params.LoginUrl.replace(/^\//g, ''); 
						}
						console.log('Doing redirect to: ' + redirectUrl);
						browser.tabs.update(tabId, {url:redirectUrl});
					}
				});
			}
			return [];
		}
		return cookiesResult;
	}
	return cookies;
}

function initAnon(details){
	browser.runtime.sendNativeMessage(hostName, {act: 'init_anon', params: details.params}, function (message) {});
}

chrome.runtime.onInstalled.addListener(function(details){
	// Show notification if ITHitEditDocumentOpener is not installed.
	var myNotificationID = null;
	var msg = 'This extension requires an IT Hit Edit Document Opener client to be installed. Press "Download" to download it.';

	var options = {
	  type: "basic",
	  title: chrome.runtime.getManifest()['name'],
	  message: msg,
	  iconUrl: chrome.runtime.getURL('icons/128x128.png'),
	  buttons: [{
		title: "Download"
		}]
	}
	try{
		chrome.runtime.sendNativeMessage(hostName, {act: 'get_protocols'}, function (message) {
			if (chrome.runtime.lastError) {
				chrome.notifications.create('', options, function(id) {
					myNotificationID = id;
				});
			}
		});
	}catch(e){
		chrome.notifications.create('', options, function(id) {
				myNotificationID = id;
			});
	}
	chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
		if (notifId === myNotificationID) {
			if (btnIdx === 0) {
				window.open("https://webdavserver.com/wwwroot/js/node_modules/webdav.client/Plugins/ITHitEditDocumentOpener."+GetExt());
			}
		}
	});
});

function GetExt(){
	var _plat = navigator.platform;
	if (-1 != _plat.indexOf('Win')) return 'msi';
	if (-1 != _plat.indexOf('Mac')) return 'pkg';
	if (-1 != _plat.indexOf('Linux')) return 'deb';
	if (-1 != _plat.indexOf('X11')) return 'deb';
	return null;
}
/**
* True is any cookie has undefined expiration date, mean session cookie
*/
function isExtendExpDate(cookies, params){
	for (let cookie of cookies) {
		if(!cookie.expirationDate && params.MsOfficeSchema)
			return true;
	}
	return false;
}

/**
* Parse uri in params to dictionary
*/
function getParams(uri){
	let i = uri.indexOf(':');
    return uri.substring(i + 1).split(';').reduce(function (result, item, index, array) {
        let p = item.split('=');
        result[p[0]] = p[1];
        return result;
    }, {});
}

function doAlert(str){
	browser.scripting.executeScript({
	  target : {tabId : tabId},
	  func : (str) => {
						alert(str);
					},
	  args : [str],
	})
}

function doConfirm(str, callback){
	browser.scripting.executeScript({
	  target : {tabId : tabId},
	  func : (str) => {
						var confirmResult = confirm(str); return confirmResult;
					},
	  args : [str],
	}).then(injectionResults => {
	  for (const {frameId, result} of injectionResults) {
		callback(result);
	  }
	});
}

function isWindows() {
	return navigator.platform.indexOf('Win') > -1;
}

function isWin7(){
	return isWindows() && navigator.oscpu.indexOf('6.1') > -1; // 6.1 is a release version of Win7
}

function getFirefoxVersion () {     
    var raw = navigator.userAgent.match(/Firefox\/([0-9]+)\./);

    return raw ? parseInt(raw[1], 10) : false;
}