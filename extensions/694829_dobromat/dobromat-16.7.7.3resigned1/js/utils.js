

//debug console (for easy switching logging on/off)
var debug = {
	print : true,
	log : function(msg) { if (debug.print) console.log(msg) },
	info : function(msg) { if (debug.print) console.info(msg) },
	warn : function(msg) { if (debug.print) console.warn(msg) },
	error: function(msg) { if (debug.print) console.error(msg) }
};



var utils = {
	
	//includes scripts from an array one after another and then calls callback
	executeScripts: function(tabId, scripts, callback) {
		
		if (scripts.length > 0) {
			//debug.log("execute script: ");			
			var first = scripts.shift();			
			chrome.tabs.executeScript(tabId, first, function() {
				utils.executeScripts(tabId, scripts, callback);
			});	
		} else {
			callback();
		}
					
	},
	
	//inserts styles from an array and then calls callback
	insertMultipleCss: function(tabId, details, callback) {
		if (details.length > 0) {
			//debug.log("insert CSS");
			var first = details.shift();
			chrome.tabs.insertCSS(tabId, first, function() {
				utils.insertMultipleCss(tabId, details, callback);
			});			
		} else {
			callback();
		}		
	},
	
	//regularly reload resources. If loading fails, load again soon, otherwise after long time
	//assignCallback should return false if data are not valid
	loadRegularly: function(timerId, url, assignCallback) {		
		if (timerId) clearTimeout(timerId);
		$.get(url, null, function(data, textStatus) {										
			if (textStatus == "success" && data && assignCallback(data)) {				
				timerId = window.setTimeout(function() { utils.loadRegularly(timerId, url, assignCallback); }, 20*60*1000);  //pri uspesonm nacitavani raz za 20 min
				debug.info('Loading success: ' + url);
			} else {
				debug.warn('Loading: ' + url + " failed with status: " + textStatus + ". (If status is success, then callback rejected the data.)");
				timerId = window.setTimeout(function() { utils.loadRegularly(timerId, url, assignCallback); }, 2*60*1000);  //pri neuspesonm nacitavani kazde 2 min
			}			
		}).fail( function() {				
				timerId = window.setTimeout(function() { utils.loadRegularly(timerId, url, assignCallback); }, 2*60*1000); 
			}
		);					
	},


	//strips protocol and www.
	stripProtocol: function(url) {		
		var match = url.match(/:\/\/(www[0-9]?\.)?(.+)/i);
		if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {			
			return match[2];
		} else {
			return null;
		}
	},


	
	
};