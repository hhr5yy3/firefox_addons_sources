// Team Password Manager Browser Extension background script
// (c) 2016-2022 Ferran Barba

// API version that this version of the extension uses
// T#780 API v5
var apiVersion = 5;

// Basic connection parameters
var tpmConnected = false; // Flag to tell if the extension is connected
var tpmConnectionType = ""; // api=connected via the API, auto=connected automatically, ""=not connected
var tpmUsername = "";
var tpmPassword = "";
var tpmPasswordToSave = "";
var tpmSavePassword = true; // Save user password?

// TPM URL
// If using the API it's: httpx://tpminstallation/index.php/api/v4/
// If connected automatically it's: httpx://tpminstallation/index.php/ext/
var tpmUrl = ""; 

var tpmUrlShow = "";
var tpmOffer = true; // Offer to save web passwords?
var tpmReadOnly = false; // Read only user?
var tpmArchived = false; // Use archived passwords?
var tpmPopupTab = "search"; // Currently selected tab: search or options

// T#612 We keep my/shared for login tabs or search options
var tpmMyShared = "shared";

// To save the password, passed from the contentscript and to be passed to the saver popup
var savePwdUrl = "";
var savePwdUsername = "";
var savePwdPassword = "";

// The possible urls and the current url of the page
var possibleUrls = [];
var siteUrl = null;

// Are personal passwords allowed? For the popup search (see TPM_MY_ALLOWED)
var myVerified = false; // to verify the first time making the request
var myAllowed = false;  // next time only return this variable


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	// T#437 Set to true in each case whenever an asynchronouse response is expected
	var asyncResponse = false;

	var tpmSearchString = "";
	var tpmSearchWhere = "";
	var tpmSearchResultsHtml = "";
	var tpmSearchCurrentPage = "";
	var tpmSearchNumItems = 0;
	var tpmSearchNumPages = 0;
	var tpmSearchNumItemsPerPage = 0;

	switch ( request.id ) {

		// Checks if the extension is connected to TPM
		case "TPM_CONNECTED":	
			if ( tpmConnectionType=="auto" ) {
				asyncResponse = true;
				$.ajax ({
					method: "GET",
					url: tpmUrl + "save_option",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data, status, jqXHR) {
						sendResponse(tpmConnected);
					}, // success
					error: function (jqXHR, textStatus, errorThrown) {
						if ( jqXHR.status=="503" || jqXHR.status=="0" || jqXHR.status=="404") {
							// SAME AS IN DISCONNECT
							tpmPassword = "";
							tpmConnectionType = "";
							tpmConnected = false;
							baIconGray();
							chrome.browserAction.setTitle({title:"Team Password Manager (" + chrome.i18n.getMessage("bgNotConnected") + ")"}); // Not Connected
						}
						sendResponse(tpmConnected);
					} // error
				}); // ajax
			} else {
				sendResponse(tpmConnected);
			}
			break;

		// Returns the URL if it's connected, otherwise ""
		case "TPM_CONNECTED_URL":
			if ( tpmConnected ) {
				sendResponse(tpmUrl);
			} else {
				sendResponse("");
			}
			break;

		// Returns the URL and username (even if not connected, the URL is cached)
		case "TPM_CONNECTION_DATA":
			asyncResponse = true;
			chrome.storage.sync.get({"tpmCEOptions" : [tpmUrl, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function(data) {
				// Note: {"tpmCEOptions" : [tpmUrl, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer]} is setting defaults
				// Decrypt password
				var returnedPassword = "";
				if ( data.tpmCEOptions[3] ) {
					var k = data.tpmCEOptions[0]+data.tpmCEOptions[1];
					returnedPassword = sjcl.decrypt(k, data.tpmCEOptions[2]);
				}
				sendResponse({connected:tpmConnected, url:data.tpmCEOptions[0], username:data.tpmCEOptions[1], password_to_save:returnedPassword, save_password:data.tpmCEOptions[3], offer:data.tpmCEOptions[4], archived:data.tpmCEOptions[5], readOnly: tpmReadOnly, connectionType: tpmConnectionType, myShared: data.tpmCEOptions[6]});
    		});
			break;

		// Connects the extension to TPM, setting tpmUrl, tpmUsername, tpmPassword, tpmConnectionType="api" and tpmConnected
		case "TPM_CONNECT":
			asyncResponse = true;
			// Complete url
	   		// add trailings slash if not there
	   		var tpmUrltmp = request.url;
	   		if (tpmUrltmp.substr(-1) != '/') {
	   			tpmUrltmp += '/'; 
	   		}
	   		tpmUrltmp += "index.php/api/v" + apiVersion + "/";

	   		// Set verification of personal passwords to false, so it does verify on connection
	   		myVerified = false;

	   		// We get the storage to see the value of tpmMyShared
	   		chrome.storage.sync.get({"tpmCEOptions" : [tpmUrl, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function(savedData) {
				
				tpmMyShared = "shared";
	   			if ( savedData ) {
	   				if ( savedData.tpmCEOptions[6] ) {
	   					tpmMyShared = savedData.tpmCEOptions[6];	
	   				}
	   			}

				$.ajax({
					method: "GET",
					url: tpmUrltmp + "users/me.json",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					beforeSend: function (xhr) {
					    xhr.setRequestHeader ("Authorization", "Basic " + btoa(request.username + ":" + request.password));
					},
					success: function (data, status, jqXHR) {
						tpmConnectionType = "api";
						tpmUrl = tpmUrltmp;
						tpmUrlShow = request.url;
						tpmUsername = request.username;
						tpmPassword = request.password;
						tpmSavePassword = request.save_password;
						tpmOffer = request.offer;
						// tpmMyShared set above
						tpmArchived = request.archived;
						tpmConnected = true;
						baIconBlue();
						chrome.browserAction.setTitle({title:"Team Password Manager (" + chrome.i18n.getMessage("bgConnected") + ")"});
						// Save url and username using the Chrome extension storage API.
						tpmPasswordToSave = "";
						if ( tpmSavePassword ) {
							// Encrypt the password
							var k = tpmUrlShow+tpmUsername;
							tpmPasswordToSave = sjcl.encrypt(k, tpmPassword);
						}
	        			chrome.storage.sync.set({'tpmCEOptions': [tpmUrlShow, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function() {
	        				sendResponse(""); // ""=ok, no error
	        			});		
	        			// Check read only user
	        			tpmReadOnly = false;
	        			if ( data.role == "Read only" ) {
	        				tpmReadOnly = true;
	        			}					
					}, // success
					error: function (jqXHR, status) {
						var errorMessage = chrome.i18n.getMessage("bgErrorConnecting"); // "Error connecting the extension to Team Password Manager";
						if (typeof jqXHR.responseJSON === "undefined") {
							errorMessage += ": " + chrome.i18n.getMessage("bgCheckURL"); // "check the URL";
						} else {
							if ( jqXHR.responseJSON.message == "Controller does not exist." ) {
								errorMessage += ": " + chrome.i18n.getMessage("bgCheckAPIVersion") + " " + apiVersion; // check that your installation uses API version
							} else {
								errorMessage += ": " + jqXHR.responseJSON.message;	
							}
						}
						baIconGray();
						chrome.browserAction.setTitle({title:"Team Password Manager (" + chrome.i18n.getMessage("bgNotConnected") + ")"});
						sendResponse(errorMessage);
					} // error
				}); // ajax
			}); // chrome.storage.sync.get
			break;

		// Connects the extension to TPM automatically (without the API), setting tpmUrl, tpmUsername, tpmConnectionType="auto" and tpmConnected
		case "TPM_CONNECT_AUTO":
			asyncResponse = true;
			// Complete url
	   		// add trailings slash if not there
	   		var tpmUrltmp = request.url;
	   		if (tpmUrltmp.substr(-1) != '/') {
	   			tpmUrltmp += '/'; 
	   		}
	   		tpmUrltmp += "ext/"; // It already includes index.php

	   		// Get the user and saved options from TPM

	   		// Verified if connected below
	   		myVerified = false;

	   		// We get the storage to see the value of tpmMyShared
	   		chrome.storage.sync.get({"tpmCEOptions" : [tpmUrl, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function(savedData) {
				
				tpmMyShared = "shared";
	   			if ( savedData ) {
	   				if ( savedData.tpmCEOptions[6] ) {
	   					tpmMyShared = savedData.tpmCEOptions[6];	
	   				}
	   			}

				$.ajax({
					method: "GET",
					url: tpmUrltmp + "connect" + "/" + encodeURIComponent(chrome.runtime.getManifest().version),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (data, status, jqXHR) {
						tpmConnectionType = "auto";
						tpmUrl = tpmUrltmp;
						tpmUrlShow = tpmUrltmp.replace("/index.php/ext/", "");
						tpmUsername = data.username;
						tpmPassword = ""; // no password with auto
						tpmSavePassword = false; // no password with auto
						tpmOffer = data.save_web_passwords;
						// T#612 We check because it may not come from the software as it was updated later
						if ( 'my_shared' in data ) {
							tpmMyShared = data.my_shared;
						}
						tpmArchived = data.use_archived_passwords;
						myAllowed = data.my_allowed;
						myVerified = true;
						tpmConnected = true;
						baIconBlue();
						chrome.browserAction.setTitle({title:"Team Password Manager (" + chrome.i18n.getMessage("bgConnected") + ")"});
						// Save url and username using the Chrome extension storage API.
						tpmPasswordToSave = "";
						
	        			chrome.storage.sync.set({'tpmCEOptions': [tpmUrlShow, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function() {
	        				sendResponse(""); // ""=ok, no error
	        			});		
	        			// Check read only user
	        			tpmReadOnly = data.read_only_role;
					}, // success
					error: function (jqXHR, status) {
						var errorMessage = chrome.i18n.getMessage("bgErrorConnecting") + ": " + jqXHR.responseText;
						baIconGray();
						chrome.browserAction.setTitle({title:"Team Password Manager (" + chrome.i18n.getMessage("bgNotConnected") + ")"});
						sendResponse(errorMessage);
					} // error
				}); // ajax
			}); // chrome.storage.sync.get
			break;

		// Disconnects the extension from TPM
		case "TPM_DISCONNECT":
			// We only set password to blank, we keep the url
			tpmPassword = "";
			tpmConnectionType = "";
			tpmConnected = false;
			baIconGray();
			chrome.browserAction.setTitle({title:"Team Password Manager (" + chrome.i18n.getMessage("bgNotConnected") + ")"});
			sendResponse(true);
			break;

		case "TPM_SET_OPTION_ARCHIVED":
			asyncResponse = true;
			tpmArchived = request.value;
			// If it's auto we also save it
			chrome.storage.sync.set({'tpmCEOptions': [tpmUrlShow, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function() {
        		if ( tpmConnectionType=="auto" ) {
					var valRequest = "0";
					if ( tpmArchived==true ) {
						var valRequest = "1";
					}
					var requestUrl = tpmUrl + "save_option/ext_use_archived_passwords/" + valRequest;
					$.ajax ({
						method: "GET",
						url: requestUrl,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data, status, jqXHR) {
							sendResponse("");	
						}, // success
						error: function (jqXHR, status) {
							// error handler
							console.log("Error in TPM_SET_OPTION_ARCHIVED");
							sendResponse("");
						} // error
					}); // ajax
				} else {
					sendResponse(""); // Ok, no error
				}
        	});	
			
			break;

		case "TPM_SET_OPTION_OFFER":
			asyncResponse = true;
			tpmOffer = request.value;
			// If it's auto we also save it
			chrome.storage.sync.set({'tpmCEOptions': [tpmUrlShow, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function() {
        		if ( tpmConnectionType=="auto" ) {
					var valRequest = "0";
					if ( tpmOffer==true ) {
						var valRequest = "1";
					}
					var requestUrl = tpmUrl + "save_option/ext_save_web_passwords/" + valRequest;
					$.ajax ({
						method: "GET",
						url: requestUrl,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data, status, jqXHR) {
							sendResponse("");	
						}, // success
						error: function (jqXHR, status) {
							// error handler
							console.log("Error in TPM_SET_OPTION_OFFER");
							sendResponse("");
						} // error
					}); // ajax
				} else {
					sendResponse(""); // Ok, no error
				}
        	});	
        	
			break;

		case "TPM_SET_OPTION_MY_SHARED":
			asyncResponse = true;
			tpmMyShared = request.value;
			// If it's auto we also save it
			chrome.storage.sync.set({'tpmCEOptions': [tpmUrlShow, tpmUsername, tpmPasswordToSave, tpmSavePassword, tpmOffer, tpmArchived, tpmMyShared]}, function() {
        		if ( tpmConnectionType=="auto" ) {
					var valRequest = "0";
					if ( tpmMyShared==true ) {
						var valRequest = "1";
					}
					var requestUrl = tpmUrl + "save_option/ext_my_shared/" + valRequest;
					$.ajax ({
						method: "GET",
						url: requestUrl,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function (data, status, jqXHR) {
							sendResponse("");	
						}, // success
						error: function (jqXHR, status) {
							// error handler
							console.log("Error in TPM_SET_OPTION_MY_SHARED");
							sendResponse("");
						} // error
					}); // ajax
				} else {
					sendResponse(""); // Ok, no error
				}
        	});	
        	
			break;

		// Sets the currently selected tab of the popup
		case "TPM_SET_POPUP_TAB":
			tpmPopupTab = request.tab;
			sendResponse();
			break;

		// Gets the currently selected tab of the popup
		case "TPM_GET_POPUP_TAB":
			sendResponse(tpmPopupTab);
			break;

		// Saves the possible urls in possibleUrls, to be available through TPM_GET_POSSIBLE_URLS
		case "TPM_SAVE_POSSIBLE_URLS":
			possibleUrls = request.urls;
			sendResponse(true);
			break;
		
		// Saves the url in siteUrl, to be available through TPM_GET_URL
		case "TPM_SAVE_URL":
			siteUrl = request.url;
			sendResponse(true);
			break;
		
		// Gets the possible urls in possibleUrls saved previously via TPM_SAVE_POSSIBLE_URLS
		case "TPM_GET_POSSIBLE_URLS":
			sendResponse(possibleUrls);
			break;
		
		// Gets the url in siteUrl saved previously via TPM_SAVE_URL
		case "TPM_GET_URL":
			sendResponse(siteUrl);
			break;
		
		// Returns the number of passwords for the passed url
		case "TPM_COUNT_URL":
			asyncResponse = true;
			var strActive = " is:active";
			if ( tpmArchived ) {
				strActive = "";
			}

			// T#616
			var requestSearch = "";
			if ( request.search != "" ) {
				requestSearch = " " + request.search;
			}

			// auto
			var requestUrl = tpmUrl + "search_count/" + encodeURIComponent("access:" + request.url + strActive + requestSearch);

			// api
			if ( tpmConnectionType=="api" ) {	
				requestUrl = tpmUrl + "passwords/search/" + encodeURIComponent("access:" + request.url + strActive + requestSearch) + "/count.json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var numItems = 0;
					var numPages = 0;
					var numItemsPerPage = 0;
					var objCount = null;
					if ( data ) {
						numItems = data.num_items;
						numPages = data.num_pages;
						numItemsPerPage = data.num_items_per_page;
					} else {
						//console.log("No passwords found");
					}
					objCount = {"numItems":numItems, "numPages":numPages, "numItemsPerPage":numItemsPerPage};
					sendResponse(objCount);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_COUNT_URL");
					sendResponse(null);
				} // error
			}); // ajax
			break; // TPM_COUNT_URL

		// Returns the number of my passwords for the passed url
		case "TPM_MY_COUNT_URL":
			asyncResponse = true;

			// T#616
			var requestSearch = "";
			if ( request.search != "" ) {
				requestSearch = " " + request.search;
			}

			// auto
			var requestUrl = tpmUrl + "my_search_count/" + encodeURIComponent("access:" + request.url + requestSearch);

			// api
			if ( tpmConnectionType=="api" ) {
				requestUrl = tpmUrl + "my_passwords/search/" + encodeURIComponent("access:" + request.url + requestSearch) + "/count.json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var numItems = 0;
					var numPages = 0;
					var numItemsPerPage = 0;
					var objCount = null;
					if ( data ) {
						numItems = data.num_items;
						numPages = data.num_pages;
						numItemsPerPage = data.num_items_per_page;
					} else {
						//console.log("No passwords found");
					}
					objCount = {"numItems":numItems, "numPages":numPages, "numItemsPerPage":numItemsPerPage};
					sendResponse(objCount);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					if ( jqXHR.status != 403 ) { // personal passwords disabled = 403
						console.log("Error in TPM_MY_COUNT_URL");
					}
					sendResponse(null);
				} // error
			}); // ajax
			break; // TPM_MY_COUNT_URL

		// Returns the number of my passwords (used to see if they're allowed in the login_selector)
		case "TPM_MY_COUNT":
			asyncResponse = true;

			// auto
			var requestUrl = tpmUrl + "my_count";

			// api
			if ( tpmConnectionType=="api" ) { 
				requestUrl = tpmUrl + "my_passwords/count.json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var numItems = 0;
					var numPages = 0;
					var numItemsPerPage = 0;
					var objCount = null;
					if ( data ) {
						numItems = data.num_items;
						numPages = data.num_pages;
						numItemsPerPage = data.num_items_per_page;
					} else {
						//console.log("No passwords found");
					}
					objCount = {"numItems":numItems, "numPages":numPages, "numItemsPerPage":numItemsPerPage};
					sendResponse(objCount);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					if ( jqXHR.status != 403 ) { // personal passwords disabled = 403
						console.log("Error in TPM_MY_COUNT");
					}
					sendResponse(null);
				} // error
			}); // ajax
			break; // TPM_MY_COUNT

		// Checks to see if personal passwords are allowed
		// The first time makes the request and sets myVerified, the other times just returns myAllowed
		case "TPM_MY_ALLOWED":
			if ( myVerified ) {
				sendResponse(myAllowed);
			} else {
				asyncResponse = true;

				// auto
				var requestUrl = tpmUrl + "my_count";

				// api
				if ( tpmConnectionType=="api" ) {
					requestUrl = tpmUrl + "my_passwords/count.json";
				}

				$.ajax ({
					method: "GET",
					url: requestUrl,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					beforeSend: function (xhr) {
						if ( tpmConnectionType=="api" ) {
					    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
					    }
					},
					success: function (data, status, jqXHR) {
						myVerified = true;
						myAllowed = true
						sendResponse(myAllowed);
					}, // success
					error: function (jqXHR, status) {
						myVerified = true;
						myAllowed = false;
						sendResponse(myAllowed);
					} // error
				}); // ajax
			} // myVerified			
			break; // TPM_MY_ALLOWED

		// Returns a list of passwords for the passed url
		case "TPM_GET_PASSWORDS_URL":
			asyncResponse = true;
			var strActive = " is:active";
			if ( tpmArchived ) {
				strActive = "";
			}

			// T#616
			var requestSearch = "";
			if ( request.search != "" ) {
				requestSearch = " " + request.search;
			}

			// auto
			var requestUrl = tpmUrl + "search/" + encodeURIComponent("access:" + request.url + strActive + requestSearch) + "/" + request.page;

			// api
			if ( tpmConnectionType=="api" ) {	
				requestUrl = tpmUrl + "passwords/search/" + encodeURIComponent("access:" + request.url + strActive + requestSearch) + "/page/" + request.page + ".json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var pwds = [];
					if ( data.length > 0 ) {
						for ( var i=0; i<data.length; i++ ) {
							// T#440, no return all (so that there's no mismatch with the count)
							// Only get those that have username or email, or those that are locked
							//if ( data[i].username || data[i].email || data[i].locked) {
								var pwd = {
									id: data[i].id,
									name: data[i].name,
									project_name: data[i]["project"].name,
									username: data[i].username,
									email: data[i].email,
									access_info: data[i].access_info,
									locked: data[i].locked,
									archived: data[i].archived,
									favorite: data[i].favorite,
									tags: data[i].tags
								};
								
								pwds.push(pwd);
							//}
						} 
					} else {
						//console.log("No passwords found");
					}
					sendResponse(pwds);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_GET_PASSWORDS_URL");
					sendResponse([]);
				} // error
			}); // ajax
			break; // TPM_GET_PASSWORDS_URL

		// Returns a list of my passwords for the passed url
		case "TPM_GET_MY_PASSWORDS_URL":
			asyncResponse = true;

			// T#616
			var requestSearch = "";
			if ( request.search != "" ) {
				requestSearch = " " + request.search;
			}

			// auto
			var requestUrl = tpmUrl + "my_search/" + encodeURIComponent("access:" + request.url + requestSearch) + "/" + request.page;

			// api
			if ( tpmConnectionType=="api" ) {
				requestUrl = tpmUrl + "my_passwords/search/" + encodeURIComponent("access:" + request.url + requestSearch) + "/page/" + request.page + ".json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var pwds = [];
					if ( data.length > 0 ) {
						for ( var i=0; i<data.length; i++ ) {
							// T#440, no return all (so that there's no mismatch with the count)
							// Only get those that have username or email, or those that are locked
							//if ( data[i].username || data[i].email || data[i].locked) {
								var pwd = {
									id: data[i].id,
									name: data[i].name,
									access_info: data[i].access_info,
									username: data[i].username,
									email: data[i].email,
									tags: data[i].tags
								};
								
								pwds.push(pwd);
							//}
						} 
					} else {
						//console.log("No passwords found");
					}
					sendResponse(pwds);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_GET_MY_PASSWORDS_URL");
					sendResponse([]);
				} // error
			}); // ajax
			break; // TPM_GET_MY_PASSWORDS_URL

		// Returns the number of passwords (or my_passwords) for the searched string
		case "TPM_COUNT_SEARCH":
			asyncResponse = true;
			var strActive = " is:active";
			if ( tpmArchived ) {
				strActive = "";
			}

			// auto
			var searchWhere = "search_count";
			if ( request.search_where == "my" ) {
				searchWhere = "my_search_count";
				strActive = "";
			}
			var requestUrl = tpmUrl + searchWhere + "/" + encodeURIComponent(request.search_string + strActive);

			// api
			if ( tpmConnectionType=="api" ) {
				searchWhere = "passwords";
				if ( request.search_where == "my" ) {
					searchWhere = "my_passwords";
					strActive = "";
				}	
				requestUrl = tpmUrl + searchWhere + "/search/" + encodeURIComponent(request.search_string + strActive) + "/count.json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var numItems = 0;
					var numPages = 0;
					var numItemsPerPage = 0;
					var objCount = null;
					if ( data ) {
						numItems = data.num_items;
						numPages = data.num_pages;
						numItemsPerPage = data.num_items_per_page;
					} else {
						//console.log("No passwords found");
					}
					objCount = {"numItems":numItems, "numPages":numPages, "numItemsPerPage":numItemsPerPage};
					sendResponse(objCount);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_COUNT_SEARCH");
					sendResponse(null);
				} // error
			}); // ajax
			break; // TPM_COUNT_SEARCH

		case "TPM_SEARCH":
			asyncResponse = true;
			var strActive = " is:active";
			if ( tpmArchived ) {
				strActive = "";
			}

			// auto
			var searchWhere = "search";
			if ( request.search_where == "my" ) {
				searchWhere = "my_search";
				strActive = "";
			}
			var requestUrl = tpmUrl + searchWhere + "/" + encodeURIComponent(request.search_string + strActive) + "/" + request.page;

			// api
			if ( tpmConnectionType=="api" ) {
				searchWhere = "passwords";
				if ( request.search_where == "my" ) {
					searchWhere = "my_passwords";
					strActive = "";
				}	
				requestUrl = tpmUrl + searchWhere + "/search/" + encodeURIComponent(request.search_string + strActive) + "/page/" + request.page + ".json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var pwds = [];
					if ( data.length > 0 ) {
						for ( var i=0; i<data.length; i++ ) {
							if ( request.search_where == "my" ) {
								// Personal passwords
								var pwd = {
									id: data[i].id,
									name: data[i].name,
									project_name: "(res)",
									access_info: data[i].access_info,
									username: data[i].username,
									email: data[i].email,
									locked: false,
									archived: false,
									favorite: false,
									tags: data[i].tags
								};
								
								pwds.push(pwd);
							} else { 
								// Shared
								var pwd = {
									id: data[i].id,
									name: data[i].name,
									project_name: data[i]["project"].name,
									access_info: data[i].access_info,
									username: data[i].username,
									email: data[i].email,
									locked: data[i].locked,
									archived: data[i].archived,
									favorite: data[i].favorite,
									tags: data[i].tags
								};
								
								pwds.push(pwd);
							}
						} 
					} else {
						//console.log("No passwords found");
					}
					sendResponse(pwds);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_SEARCH");
					sendResponse(null);
				} // error
			}); // ajax
			break; // TPM_SEARCH

		// T#434 Save popup search state: search string, where and html
		case "TPM_SAVE_SEARCH_STATE":
			asyncResponse = true;
			tpmSearchString = request.tpm_search_string;
			tpmSearchWhere = request.tpm_search_where;
			tpmSearchResultsHtml = request.tpm_search_results_html;
			tpmSearchCurrentPage = request.searchCurrentPage;
			tpmSearchNumItems = request.searchNumItems;
			tpmSearchNumPages = request.searchNumPages;
			tpmSearchNumItemsPerPage = request.searchNumItemsPerPage;

			chrome.storage.local.set({'tpmCESearchState': [tpmSearchString, tpmSearchWhere, tpmSearchResultsHtml, tpmSearchCurrentPage, tpmSearchNumItems, tpmSearchNumPages, tpmSearchNumItemsPerPage]}, function() {
    			sendResponse(""); // Ok, no error
        	});		
			break;

		// T#434 Get popup search state: search string, where and html
		case "TPM_GET_SEARCH_STATE":
			asyncResponse = true;
			chrome.storage.local.get({"tpmCESearchState" : [tpmSearchString, tpmSearchWhere, tpmSearchResultsHtml, tpmSearchCurrentPage, tpmSearchNumItems, tpmSearchNumPages, tpmSearchNumItemsPerPage]}, function(data) {
				sendResponse({tpm_search_string:data.tpmCESearchState[0], tpm_search_where:data.tpmCESearchState[1], tpm_search_results_html:data.tpmCESearchState[2], searchCurrentPage:data.tpmCESearchState[3], searchNumItems:data.tpmCESearchState[4], searchNumPages: data.tpmCESearchState[5], searchNumItemsPerPage: data.tpmCESearchState[6]});
    		});
			break;

		// T#435 Saves the latest visited password
		case "TPM_SET_LATEST_VISITED_PWD":
			asyncResponse = true;
			chrome.storage.local.set({'tpmCELatestVisitedPwd': request.latest_visited_password}, function() {
    			sendResponse(""); // Ok, no error
        	});        	
			break;

		// T#435 Gets the latest visited password
		case "TPM_GET_LATEST_VISITED_PWD":
			asyncResponse = true;
			chrome.storage.local.get(["tpmCELatestVisitedPwd"], function(data) {
				sendResponse(data.tpmCELatestVisitedPwd);
    		});	
			break;

		// Gets a shared password from the password ID	
		case "TPM_GET_PASSWORD_ID":
			asyncResponse = true;

			// auto
			var requestUrl = tpmUrl + 'pwd/' + request.pwdId;
			// Locked? Reason provided
			if ( request.pwdReason ) {
				requestUrl += '/' + request.pwdReason;
			} 

			// api
			if ( tpmConnectionType=="api" ) {
				requestUrl = tpmUrl + "passwords/" + request.pwdId + ".json"
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
					    xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
					    // Locked? Reason provided
					    if ( request.pwdReason ) {
					    	xhr.setRequestHeader ("X-Unlock-Reason", unescape(request.pwdReason));
					    }
					}
				},
				success: function (data, status, jqXHR) {
					var pwd = null;
					if ( data ) {
						pwd = data;
					}
					sendResponse(pwd);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_GET_PASSWORD_ID");
					sendResponse("");
				} // error
			}); // ajax
			break; // TPM_GET_PASSWORD_ID

		// Gets a personal password from the password ID	
		case "TPM_GET_MY_PASSWORD_ID":
			asyncResponse = true;

			// auto
			var requestUrl = tpmUrl + 'mypwd/' + request.pwdId; 

			// api
			if ( tpmConnectionType=="api" ) {
				requestUrl = tpmUrl + "my_passwords/" + request.pwdId + ".json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var pwd = null;
					if ( data ) {
						pwd = data; 
					}
					sendResponse(pwd);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_GET_MY_PASSWORD_ID");
					sendResponse("");
				} // error
			}); // ajax
			break; // TPM_GET_MY_PASSWORD_ID
			
		// Sends a message to the content script to close the login selector
		case "TPM_CS_CLOSE_LOGIN_SELECTOR":
			asyncResponse = true;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			    chrome.tabs.sendMessage(tabs[0].id, {id: "TPM_CS_CLOSE_LOGIN_SELECTOR"}, function(response) {
			    	sendResponse();
			    });  
			});
			break; // TPM_CS_CLOSE_LOGIN_SELECTOR
			
		// Sends a message to the content script to use the shared password (pwdId)
		case "TPM_CS_USE_PASSWORD":
			asyncResponse = true;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			    chrome.tabs.sendMessage(tabs[0].id, {id: "TPM_CS_USE_PASSWORD", pwdId: request.pwdId, pwdReason: request.pwdReason}, function(response) {
			    	sendResponse();
			    });  
			});
			break; // TPM_CS_USE_PASSWORD

		// Sends a message to the content script to use the personal password (pwdId)
		case "TPM_CS_USE_MY_PASSWORD":
			asyncResponse = true;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			    chrome.tabs.sendMessage(tabs[0].id, {id: "TPM_CS_USE_MY_PASSWORD", pwdId: request.pwdId}, function(response) {
			    	sendResponse();
			    });  
			});
			break; // TPM_CS_USE_MY_PASSWORD
			
		// Resize login iframe
		case "TPM_CS_RESIZE_IFRAME":
			asyncResponse = true;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			    chrome.tabs.sendMessage(tabs[0].id, {id: "TPM_CS_RESIZE_IFRAME", numPasswords: request.numPasswords}, function(response) {
			    	sendResponse();
			    });  
			});
			break; // TPM_CS_RESIZE_IFRAME

		// Opens the saver screen
		case "TPM_OPEN_SAVER":
			savePwdUrl = request.url;
			savePwdUsername = request.username;
			savePwdPassword = request.password;
			
			var saverWidth = 600;
    		var saverHeight = 500;
    		var saverLeft = parseInt((screen.width/2)-(saverWidth/2));
    		var saverTop = parseInt((screen.height/2)-(saverHeight/2)); 

			/* Changed because Firefox wouldn't open a popup this way
			chrome.tabs.create({
	            url: chrome.extension.getURL("js/saver/index.html"),
	            active: false
	        }, function(tab) {
	            // After the tab has been created, open a window to inject the tab
	            chrome.windows.create({
	                tabId: tab.id,
	                type: "popup",
	                focused: true,
	                top: saverTop,
	                left: saverLeft,
	                width: saverWidth,
	                height: saverHeight
	            });
	        });*/

	        // Works with Chrome, Edge and Firefox
	        chrome.windows.create({
        		url: chrome.extension.getURL("js/saver/index.html"),
        		top: saverTop,
	            left: saverLeft,
        		width: saverWidth,
        		height: saverHeight,
        		type: 'popup'
    		});

	        sendResponse();
			break;

		case "TPM_GET_SAVER_DATA":
			sendResponse([savePwdUrl, savePwdUsername, savePwdPassword]);
			break;

		// Gets if offers to save web pwd (false if Read only user)
		case "TPM_GET_OFFER_TO_SAVE":
			var retOffer = tpmOffer;
			if ( tpmReadOnly ) {
				retOffer = false;
			}
			sendResponse(retOffer);
			break;

		// Gets tpmMyShared ("shared" if Read only user)
		case "TPM_GET_MY_SHARED":
			var retMyShared = tpmMyShared;
			if ( tpmReadOnly ) {
				retMyShared = "shared";
			}
			sendResponse(retMyShared);
			break;

		// Gets tpmReadOnly
		case "TPM_GET_READ_ONLY":
			sendResponse(tpmReadOnly);
			break;

		case "TPM_SAVE_PASSWORD":
			asyncResponse = true;
			// Username or email?
			var usernameOrEmail = "username";
			if ( isEmail(request.username) ) {
				usernameOrEmail = "email";
			}
			var requestBody = {
				"name": request.name,
				"project_id": request.project_id,
				"access_info": request.url,
				"password": request.password
			};
			requestBody[usernameOrEmail] = request.username;

			// auto
			var requestUrl = tpmUrl + "save_password";
			var ajaxContentType = "application/x-www-form-urlencoded; charset=UTF-8";
			var dataToSend = requestBody;

			// api
			if ( tpmConnectionType=="api" ) {
				requestUrl = tpmUrl + "passwords.json";
				ajaxContentType = "application/json; charset=utf-8";
				dataToSend = JSON.stringify(requestBody);
			}

			$.ajax ({
				method: "POST",
				url: requestUrl,
				contentType: ajaxContentType,
				dataType: "json",
				data: dataToSend,
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					// Ok
					sendResponse("");
				}, // success
				error: function (jqXHR, status) {
					// error handler
					if ( jqXHR.responseText ) {
						sendResponse(jqXHR.responseText);
					} else {
						sendResponse("Error " + jqXHR.status);
					}
				} // error
			}); // ajax
			break;

		case "TPM_SAVE_MY_PASSWORD":
			asyncResponse = true;
			// Username or email?
			var usernameOrEmail = "username";
			if ( isEmail(request.username) ) {
				usernameOrEmail = "email";
			}
			var requestBody = {
				"name": request.name,
				"access_info": request.url,
				"password": request.password
			};
			requestBody[usernameOrEmail] = request.username;

			// auto
			var requestUrl = tpmUrl + "save_my_password";
			var ajaxContentType = "application/x-www-form-urlencoded; charset=UTF-8";
			var dataToSend = requestBody;

			// api
			if ( tpmConnectionType=="api" ) {
				requestUrl = tpmUrl + "my_passwords.json";
				ajaxContentType = "application/json; charset=utf-8";
				dataToSend = JSON.stringify(requestBody);
			}

			$.ajax ({
				method: "POST",
				url: requestUrl,
				contentType: ajaxContentType,
				dataType: "json",
				data: dataToSend,
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					// Ok
					sendResponse("");
				}, // success
				error: function (jqXHR, status) {
					// error handler
					if ( jqXHR.responseText ) {
						sendResponse(jqXHR.responseText);
					} else {
						sendResponse("Error " + jqXHR.status);
					}
				} // error
			}); // ajax
			break;

		case "TPM_LIST_SUBPROJECTS":
			asyncResponse = true;

			// auto
			var requestUrl = tpmUrl + "subprojects/" + request.project_id;

			// api
			if ( tpmConnectionType=="api" ) {	
				var requestUrl = tpmUrl + "projects/" + request.project_id + "/subprojects/new_pwd.json";
			}

			$.ajax ({
				method: "GET",
				url: requestUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function (xhr) {
					if ( tpmConnectionType=="api" ) {
				    	xhr.setRequestHeader ("Authorization", "Basic " + btoa(tpmUsername + ":" + tpmPassword));
				    }
				},
				success: function (data, status, jqXHR) {
					var treeNodes = [];
					if ( data ) {
						data.forEach(function(entry) {
							var nodeIcon = false;
							if ( entry.favorite ) {
								nodeIcon = "../../img/star_full.png"; // relative to saver.js, not background.js
							}
							var nodeText = escapeHtml(entry.name);
							if ( entry.archived ) {
								nodeText = "<span class='label label-warning tpm-archived'>A</span> " + nodeText;
							}
							var node = {
								id: entry.id,
								text: nodeText,
								children: entry.has_children,
								state: {disabled: entry.disabled},
								icon: nodeIcon
							}
							treeNodes.push(node);
						});
					}
					sendResponse(treeNodes);
				}, // success
				error: function (jqXHR, status) {
					// error handler
					console.log("Error in TPM_LIST_SUBPROJECTS");
					sendResponse(null);
				} // error
			}); // ajax
			break;

		// From the popup: opens the url and fills in the username and password
		// Same as TPM_OPEN_URL but with the credentials already passed, so as to not access the password again
		case "TPM_OPEN_URL_DIRECT":
			asyncResponse = true;
			chrome.tabs.create({url: request.pwd_url}, function(tab){
            	// https://stackoverflow.com/questions/27405698/chrome-development-chrome-tabs-sendmessage-not-notifying-runtime
            	chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            		sleep(500).then(() => {
			        	if (tabId === tab.id && changeInfo.status == 'complete') {
				            chrome.tabs.onUpdated.removeListener(listener);
				            // Now the tab is ready!
				            chrome.tabs.sendMessage(tab.id, {id: "TPM_CS_USE_PASSWORD_DIRECT", pwd_ue: request.pwd_ue, pwd_pwd: request.pwd_pwd});
				            sendResponse(null);
				        }
				    });
			    });    
        	});        	
			break;

		// From the popup: opens the url and fills in the username and password
		case "TPM_OPEN_URL":
			asyncResponse = true;
			chrome.tabs.create({url: request.pwd_url}, function(tab){
            	// https://stackoverflow.com/questions/27405698/chrome-development-chrome-tabs-sendmessage-not-notifying-runtime
            	chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            		sleep(500).then(() => {
				        if (tabId === tab.id && changeInfo.status == 'complete') {
				            chrome.tabs.onUpdated.removeListener(listener);
				            // Now the tab is ready!
				            chrome.tabs.sendMessage(tab.id, {id: "TPM_CS_USE_PASSWORD", pwdId: request.pwd_id, pwdReason: request.pwd_reason});
				            sendResponse(null);
				        }
				    });
			    });
        	});
			break;

		// From the popup: opens the url and fills in the personal password username and password
		case "TPM_OPEN_MY_URL":
			asyncResponse = true;
			chrome.tabs.create({url: request.pwd_url}, function(tab){
            	// https://stackoverflow.com/questions/27405698/chrome-development-chrome-tabs-sendmessage-not-notifying-runtime
            	chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            		sleep(500).then(() => {
				        if (tabId === tab.id && changeInfo.status == 'complete') {
				            chrome.tabs.onUpdated.removeListener(listener);
				            // Now the tab is ready!
				            chrome.tabs.sendMessage(tab.id, {id: "TPM_CS_USE_MY_PASSWORD", pwdId: request.pwd_id});
				            sendResponse();
				        }
			        });
			    });
        	});
			break;
	} // switch
	
	// T#437 Correct this issue: "Unchecked runtime.lastError: The message port closed before a response was received."
	if ( asyncResponse ) {
		// This function becomes invalid when the event listener returns, unless you return true from the event listener to 
		// indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until 
		// sendResponse is called). (https://developer.chrome.com/extensions/runtime#event-onMessage)
		// http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
		return true; 
	}	
	
}); // chrome.runtime.onMessage.addListener

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function baIconGray ( ) {
	chrome.browserAction.setIcon({
		path: {
		    "19": "img/ba19g.png",
		    "38": "img/ba38g.png"
		}
	});	
}

function baIconBlue ( ) {
	chrome.browserAction.setIcon({
		path: {
		    "19": "img/ba19.png",
		    "38": "img/ba38.png"
		}
	});	
}

function isEmail( str1 ) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(str1);
}	