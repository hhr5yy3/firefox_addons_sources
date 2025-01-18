

//const url_api = 'https://dobromat.sk/extensions/';

var urls = {
	server : chrome.i18n.getMessage("server")
};


const url_api = urls.server + "extensions/";
const url_shops =  url_api + 'shops/v:160426';
const url_organizations = url_api + 'organizations/v:160426';
const url_shoppings = url_api + "shoppings";
const url_goshopping = url_api + "goShopping";
const url_login = url_api + "login";


var pages = {
	shoppings : url_api + "accessMyShoppings"
};


var dm = {
		
	id: 'chrome-extension',
	shops: [], //list of shops
	organizations: [], //list of organizations
	selectedOrgs: {}, //selected organizations indexed by shopId - remembers which organization user selected in specific shop and at what time (should be valid for 6 hours)
	tabs: {}, //list of tabs, but only the ones where some shop is open
	lastOrganizationId: 0,
	user: {},
		

	//create or load unique ID for this extension and save it to local storage
	install: function( callback ) {		
		chrome.storage.local.get("extensionUID", function(item) {					
			if (item && item.extensionUID) {				
				dm.id = item.extensionUID;
			} else {
				var id = function () {					
				    var text = "firefox-extension-" + (new Date()).getTime() + "-";
				    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				    for( var i=0; i < 10; i++ )
				        text += possible.charAt(Math.floor(Math.random() * possible.length));
				    return text;
				}();
				chrome.storage.local.set({"extensionUID" : id});
				dm.id = id;
			}
			callback(dm.id);
		});						
	},

	//regularly load shops and organizations
	load: function() {				
		chrome.storage.local.get(["extensionUID","lastOrganizationId", "user"], function(item) {	
			if (item) {
				if (item.extensionUID) {
					dm.id = item.extensionUID;
				}
				if (item.lastOrganizationId) {
					dm.lastOrganizationId = item.lastOrganizationId;
				}
				if (item.user) {
					dm.user = item.user;
				}
			}
			
			utils.loadRegularly("shops", url_shops + "/extensionId:" + dm.id, function(data) { 
				if (data && data.count && data.shops) {
					dm.shops = data.shops; 
			for (var key in dm.shops) {				
				var url = utils.stripProtocol(dm.shops[key].url);
				if (url) {
					if (url.substr(url.length-1) === "/") {
						url = url.substr(0,url.length-1);
					}
					dm.shops[key].url = url.toLowerCase();
				} else {
					debug.warn("Deleting Shop " + key + "");
					debug.log(dm.shops[key]);
					delete dm.shops[key];
				}
			}
					return true;
				}			
				return false;
		} );

			utils.loadRegularly("organizations", url_organizations + "/extensionId:" + dm.id, function(data) { 
				if (data && data.count && data.organizations) { 
					dm.organizations = data.organizations; 
					return true;
			}
				return false;
			} );						
			
		});
	
			

		

	},
				

	findShopByUrl: function(url) {
		var browserUrl = utils.stripProtocol(url);				
		if (browserUrl) {
			debug.info("Finding shop by url: " + browserUrl);
			for (var shopId in dm.shops) {				
				var shop = dm.shops[shopId];				
				if (browserUrl.toLowerCase().indexOf(shop.url) === 0) {
					debug.log(shop);
					return shop;
				}
			}							
		}
		debug.log(false);
		return false;		
	},	
		

	getShop: function(tab) {
		if (tab && dm.tabs[tab.id] && dm.tabs[tab.id].shop) {					
			return dm.tabs[tab.id].shop; 
		}		
		return false;
	},


	/*
	For given shop returns either:
	- organization that user selected for that shop
	- true, if user closed iframe and didn't select any organization
	- false - if no organization was selected or selected organization expired (after 6 hours)
	*/
	getSelectedOrganization: function(shop) {
		if (shop && shop.shop_id && dm.selectedOrgs && dm.selectedOrgs[shop.shop_id]) {			
			var selected = dm.selectedOrgs[shop.shop_id];			
			if (selected.time) {	
				var time = (new Date()).getTime();				
				if (selected.time + 6*3600*1000 > time) {
					return selected.organization || true;
				} else {
					//expire
					delete dm.selectedOrgs[shop.shop_id];
				}	
			}
		} 
		return false;
	},


	//Closing iframe for the shop - remembers the time of closing (to not to show iframe again for some time)
	closeBox: function(shop) {				
		var timestamp = (new Date()).getTime();
		if (!dm.selectedOrgs[shop.shop_id]) {
			dm.selectedOrgs[shop.shop_id] = {}
		}
		dm.selectedOrgs[shop.shop_id].time = timestamp;
		
		debug.info("Shop ["+shop.shop_id+"] closed:");
		debug.log(dm.selectedOrgs[shop.shop_id]);

		return true;
	},


	tabUpdated: function(tab) {				
		if (tab && tab.url && tab.id != chrome.tabs.TAB_ID_NONE) {
			var shop = dm.findShopByUrl(tab.url);
			
			if (shop) {					
				dm.tabs[tab.id] = { "shop": shop , injected : false, url: tab.url }; 				
				dm.showSelector(tab);		

				chrome.browserAction.setBadgeBackgroundColor( {color: "#03AAF5", tabId: tab.id} );			
				chrome.browserAction.setBadgeText( {text: "1", tabId: tab.id} );			
			} else {				
				chrome.browserAction.setBadgeText( {text: "", tabId: tab.id} );			
				dm.removeTab(tab.id);

				dm.checkDobromatSite(tab);			
			}
		} 		
	},

	checkDobromatSite: function(tab) {
		if (tab && tab.url && tab.id != chrome.tabs.TAB_ID_NONE) {
			var tabUrl = utils.stripProtocol(tab.url).toLowerCase();	
			if (tabUrl.indexOf("dobromat.sk") === 0 || tabUrl.indexOf("dobromat.cz") === 0) {
				chrome.tabs.executeScript(tab.id, { file: "/js/check-dobromat-site.js" });
			}
		}
	},
	
	removeTab: function(tabId) {
		delete dm.tabs[tabId];
	},


	showSelector: function(tab, force) {
		
		force = force ? true : false;

		debug.info("Show selector for tab: ");
		debug.log(tab);

		if (tab && dm.tabs[tab.id] && dm.tabs[tab.id].shop && (force || !dm.getSelectedOrganization(dm.tabs[tab.id].shop))) {			
										
			var message = {
				action: "show",
				shop: dm.tabs[tab.id].shop,
				organizations: dm.organizations,
				tabId: tab.id,
				lastOrganizationId: dm.lastOrganizationId,
				force: force
			};

			debug.log(message);

			if (dm.tabs[tab.id].injected) {

				chrome.tabs.sendMessage(tab.id, message);

			} else {

				/*
				//callback requires gecko 47, rewritting
				utils.executeScripts(
					tab.id, 
					[ 
						{ file: "/js/jquery-2.2.0.min.js" },				  							  	
						{ file: "/js/box.js" } 
					],
					function() {	
						dm.tabs[tab.id].injected = true;										
						chrome.tabs.sendMessage(tab.id, message);
					}			
				);
				*/					
				chrome.tabs.executeScript(tab.id, { file: "/js/jquery-2.2.0.min.js" });
				window.setTimeout( function() { chrome.tabs.executeScript(tab.id, { file: "/js/box.js" }); }, 200 );
				window.setTimeout( function() {	chrome.tabs.sendMessage(tab.id, message); }, 400 );
				
			}		
		} 		
	},



	goShopping: function(data, callback) {
		debug.info("goShopping data:");
		debug.log({shop: data.shopId, organization: data.organizationId, extension_id: dm.id});

		if (data.shopId && data.organizationId && data.tabId) {
												
			var callback = function(redirect) {				
				chrome.tabs.sendMessage(data.tabId, {action: "goShopping", redirect: redirect});
			};

			chrome.storage.local.set({"lastOrganizationId" : data.organizationId });
			dm.lastOrganizationId = data.organizationId;

			var token = null;
			if (dm.user && dm.user.token) {
				token = dm.user.token;
			}

			$.post(
				url_goshopping,
				{shop: data.shopId, organization: data.organizationId, extension_id: dm.id, referer: dm.tabs[data.tabId].url, token:token},				
				function (response, status, jqXhr) {
									
					if (response.result && response.redirect) {		
										
						var organization = dm.organizations[data.organizationId];
												
						var timestamp = (new Date()).getTime();
						dm.selectedOrgs[data.shopId] = {
							time : timestamp,
							organization: organization,			
						};										

						callback(response.redirect);

					} else {
						callback(false);
					}

				}
			).fail(function() {
				debug.error("post failed");
				callback(false);
			});			

		} else {
			debug.warn("wrong params");
			callback(false);
		}
	},


	getUser: function() {				
		if (dm.user && dm.user.login) {
			return dm.user;	
		} 
		return false;				
	},

	login: function(login, password, callback) {

		if (login && password) {

			$.post(						
				url_login,
				{ login: login, password: password, extension_id: dm.id },
				function (response, status, jqXhr) {

					if (response.result && response.token) {

						dm.user = {	login: login, token: response.token	};
						chrome.storage.local.set({"user" : dm.user});
						callback(dm.user);

					} else {
						callback(false);						
					}

				}).fail(function() {
					debug.error("login attempt failed");
					callback(false);
				});

		} else {
			callback(false);
		}

	},

	getShoppings: function(callback) {

		if (dm.id && dm.user && dm.user.token) {

			$.post(
				url_shoppings,
				{ extension_id : dm.id, token: dm.user.token },
				function (response, status, jqXhr) {
					if (response.count && response.shoppings) {

						callback(response);

					} else {
						callback(false);
					}
				}
			).fail(function() {
				callback(false)
			});

		} else {
			callback(false);
		}		

	}

	
};
