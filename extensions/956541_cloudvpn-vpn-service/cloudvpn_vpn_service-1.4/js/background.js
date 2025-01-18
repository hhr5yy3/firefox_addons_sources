var last_time_checked = 0;

var api = (function(){
    var ApiService = {
        create: function(){
            var self = {};
            
            self._apiUrl = "https://api.cloudvpn.pro/";
            self._siteUrl = "https://cloudvpn.pro/";
            
            var version = browser.runtime.getManifest().version.replace(/\./g, "-");
            
			self.authUrl = self._apiUrl + "apiaas/authenticate.php?code=";
			self.serversUrl = self._apiUrl + "apiaas/proxy.php?code=";
            
            ApiService.getLocales(function(all_locales){
            	var locale = chrome.i18n.getMessage("@@ui_locale").substr(0, 2);
				if(all_locales.includes(locale) && locale != "en"){
					self._siteUrl += locale + "/";
				}
				
				self.installUrl = self._siteUrl + "?utm_source=firefox&utm_medium=install&utm_campaign=ver" + version;
	            self.buyUrl = self._siteUrl + "price/?utm_source=firefox&utm_medium=start&utm_campaign=ver" + version;
	            self.tryFreeUrl = self._siteUrl + "demo/?utm_source=firefox&utm_medium=demo&utm_campaign=ver" + version;
	            
	            self.winAppUrl = self._siteUrl + "vpn/windows/?utm_source=firefox&utm_medium=download-windows&utm_campaign=ver" + version;
	            self.macAppUrl = self._siteUrl + "vpn/mac/?utm_source=firefox&utm_medium=download-mac&utm_campaign=ver" + version;
	            self.appleAppUrl = self._siteUrl + "vpn/ios/?utm_source=firefox&utm_medium=download-ios&utm_campaign=ver" + version;
	            self.androidAppUrl = self._siteUrl + "vpn/android/?utm_source=firefox&utm_medium=download-android&utm_campaign=ver" + version;
				
            });
            
            return self;
        }, 
        getLocales: function(callback) {
			callback (["en", "ru", "de", "es"]);
		}
    };
    
    return ApiService.create();
})();

browser.runtime.onInstalled.addListener(function(details){
	if (details.reason != "install") return;
	
	setTimeout(function(){ return function() {
		chrome.tabs.create({url: api.installUrl})
	}}(), 1000);
	
	
});

var user = (function(){
    var UserService = {
        create: function(api){
            var self = Object.create(this.prototype);
            
            self.api = api;
            self.login_code = "";
            
            self.logged = false;
            self.status = "";
            self.terminate_at = 0;
            self.username = "";
            self.password = "";
            
            chrome.storage.local.get("user", function (result) {
				if (typeof result.user != "undefined" && result.user != null){
					for (p in result.user)
						self[p] = result.user[p];
				}
			});
			
            return self;
        },
        prototype: {
            login: function(login_code){
                var self = this;
                self.logged = false;
                return new Promise(function(resolve, reject){
                    
                    httpRequest("GET", self.api.authUrl + login_code, null, "", function(httpreq){
						if (httpreq.status == 200){
					        var resp = JSON.parse(httpreq.responseText);
					        if(resp.success == 1){
					        	
					        	self.login_code = login_code;
					        	self.username = resp.products[0].username;
					        	self.password = resp.products[0].password;
					        	self.terminate_at = parseInt(resp.products[0].terminate_at) * 1000;
					        	
					        	var now = (new Date()).getTime();
					        	if(self.terminate_at - (new Date()).getTime() < 0){
					        		self.logged = false;
					        		self.status = "Terminated";
					        	}
					        	else{
					        		self.logged = true;
					        		self.status = resp.products[0].status;
					        	}
					        	
					        	if (self.status == "Terminated")
						        	resolve({success: false, message: chrome.i18n.getMessage("terminated")});
						        else
									resolve({success: true, message: resp.message});
								
								self._save();
					        }
					        else{
					        	reject({success: false, message: chrome.i18n.getMessage("authfail") + resp.message});
					        }
						}
						else{
							reject({success: false, message: chrome.i18n.getMessage("networkfail")});
						}
					});
                });
            },
            logout: function(){
                this.logged = false;
	            this.status = "";
	            this.terminate_at = 0;
	            this.username = "";
	            this.password = "";
	            this._save();
            }, 
            _save: function(){
            	chrome.storage.local.set({"user": this}, function(){ });
            }
        }
    };

    return UserService.create(api);
})();

var app = (function(){
    var AppCreator = {
        create: function(opts, user){
            var self = Object.create(this.prototype);
            
            self.opts = opts;
            self.user = user;
            
            self.connected = false;
            self.servers = [];
			self.serverItem = 0;
            
            chrome.storage.local.get("app", function (result) {
				if (typeof result.app != "undefined" && result.app != null){
					for (p in result.app)
						self[p] = result.app[p];
				}
				
				if (user.logged && user.login_code){
					self.getServers().then(function(){
						if (self.connected){
							self.connect();
						}
					});
				}
				//console.log(JSON.stringify(self));
			});
            return self;
        },
        prototype: {
        	_ping: function(url, attempt, callback) {
        		
        		var self = this;
        		
        		var rndUrl = url;
        		if (rndUrl.indexOf("?") > -1){
        			rndUrl += "&rnd=" + Math.random();
        		}
        		else{
        			rndUrl += "?rnd=" + Math.random();
        		}
				var started = new Date().getTime();
				var http = new XMLHttpRequest();
				http.timeout = 1300;
				http.open("GET", rndUrl, true);
				http.onreadystatechange = function() {
					if (http.readyState == 4) {
						var ended = new Date().getTime();
						var milliseconds = ended - started;
						if (callback != null) {
							if (http.status == 0){
								if (attempt < 3){
									self._ping(url, attempt + 1, callback);
								}
								else{
									callback(false);
								}
							}
							else
								callback(milliseconds);
						}
					}
				};
				try {
					http.send(null);
				} catch(exception) {
					callback(false);
				}

			},
        	getServers: function(){
        		var self = this;
	            self.servers = [];
	            
	            return new Promise(function(resolve, reject){
	        		httpRequest("GET", self.user.api.serversUrl + user.login_code, null, "", function(httpreq){
						if (httpreq.status == 200){
							
					        var res = JSON.parse(httpreq.responseText);
					        if(res.success == 1){
					        	res.data.sort(function (a, b) {
								    return a.country.localeCompare(b.country);
								});
					        	self.servers = res.data;
					        	resolve({success: true});
					        	self._save();
					        }
					        else{
					        	reject({success: false});
					        }
						}
						else{
							reject({success: false, message: chrome.i18n.getMessage("networkfail")});
						}
					});
        		});
            },
            connect: function(callback){
		    	
		    	var self = this;
		    	
		    	self.connected = true;
				self._ping("https://1.1.1.1/", 0, function(pong){
					
            		if (callback) callback(pong);
            		if (!pong){
            			self.connected = false;
            		}
            		self.setIcon();
				    self._save();
            	});
		    	
            },
            disconnect: function(){
		        this.connected = false;
		        this.setIcon();
		        this._save();
            },
            setIcon: function(){
            	if (this.connected) {
			        chrome.browserAction.setIcon({path: {"19": "img/icon16.png"}});
			        chrome.browserAction.setTitle({title: "CloudVPN - " + chrome.i18n.getMessage("connected").toLowerCase()});
			        
			        if (this.servers && this.servers.length > 0){
				        var code = this.servers[this.serverItem].code;
				        chrome.browserAction.setBadgeText({text: code});
				        chrome.browserAction.setBadgeBackgroundColor({color: "#f9665d"});
			        }
			    } else {
			        chrome.browserAction.setIcon({path: {"19": "img/icon16gray.png"}});
			        chrome.browserAction.setTitle({title: "CloudVPN - " + chrome.i18n.getMessage("disconnected").toLowerCase()});
			        chrome.browserAction.setBadgeText({text: ""});
			    }
            }, 
            setServerItem: function(serverItem){
            	this.serverItem = serverItem;
            	this._save();
            },
            _save: function(){
            	chrome.storage.local.set({"app": this}, function(){ });
            }
        }
    };

    return AppCreator.create(null, user);
})();

browser.proxy.onRequest.addListener(function (requestInfo) {
	
	if (app.connected) {
		var host = app.servers[app.serverItem].ip;
		var port = parseInt(app.servers[app.serverItem].port);
		return {type: "http", host: host, port: port};
	}
	
	return {type: "direct"};
}, {urls: ["<all_urls>"]});

browser.webRequest.onAuthRequired.addListener(
	function(details, callbackFn) {
		
		if (!details.isProxy || !app.connected) {
			return callbackFn();
	    }
		return {authCredentials : {username: user.username, password: user.password}};
	},
	{urls: ["<all_urls>"]}, ["blocking"]
);
	
chrome.tabs.onActivated.addListener(function(activeInfo) {
	var now = (new Date()).getTime();
	if (now - last_time_checked > 15 * 60 * 1000){
		last_time_checked = now;
		console.log("check auth timer");
		
		if (user.logged){
			user.login(user.login_code).then(function(result){
				if (result.success){
	        		app.getServers();
	        	}
			});
	    }
    }
});

function httpRequest(method, url, headers, data, callback) {
    
    var xhttpreq = new XMLHttpRequest();
    
    try{
	    
	    xhttpreq.open(method, url, true);
	    
	    if (headers){
	    	for (header in headers)
	    		xhttpreq.setRequestHeader(header, headers[header]);
		}
	    
	    xhttpreq.onreadystatechange = function (data) {
	    	
	        if (xhttpreq.readyState == 4) {
	            callback(xhttpreq);
	        }
	    }
	    xhttpreq.send(data);
    }
    catch (err){
    	callback(0, err);
    }
};
