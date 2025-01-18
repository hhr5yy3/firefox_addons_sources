var csj = {
	scriptCount: 0,
	scriptsRan: [],
	
	getCSJ: function(tab){
		chrome.storage.local.get('csjDetails', function(csjData){ csj.findScripts(tab, csjData); }); 
	},
	
	findScripts: function(tab, csjData){
		if (typeof(csjData.csjDetails) === 'undefined') return;
		var scripts = csjData.csjDetails.scripts;
		
		csj.scriptsRan = [];
		csj.scriptCount = Object.keys(scripts).length;
		for (var scriptId in scripts){
			if (scripts[scriptId].skip){ csj.scriptCount--; continue; }
			
			var script = scripts[scriptId];
			script.id = scriptId;
			var siteURL = csj.prepURLTest(script.url, script.regex);
			if (tab.url.match(siteURL) != null) csj.checkDone(tab, script);
		}
	},
	
	prepURLTest: function(siteURL, isRegex){
		var flags = '';
		if (isRegex) try { 
			flags = siteURL.match(/^\/.+?\/(\w*)$/)[1];
			siteURL = siteURL.replace(/^\/(.+)\/\w*$/, '$1');
		} catch(e){}

		if (siteURL.match(/^http/i) == null && siteURL.match(/^\.?[\*\+]/) == null) siteURL = ((isRegex) ? '.*' : '*') + siteURL;
		if (!isRegex) siteURL = '^' + siteURL.replace(/([\!\$\^\(\)\-\+\[\]\{\}\\\|\.\?])/g, '\\$1').replace(/\*\*/g, '~ONEORMORE~').replace(/\*/g, '~ZEROORMORE~').replace(/~ONEORMORE~/g, '.+').replace(/~ZEROORMORE~/g, '.*') + '\/?$';
		
		return new RegExp(siteURL, flags);
	},
	
	checkDone: function(tab, script){ 
		chrome.tabs.executeScript(tab.tabId, { code: '(!!document.getElementById("csjRan"))' }, function(alreadyAdded){ 
			if (typeof(alreadyAdded) === 'undefined' || !alreadyAdded[0]) csj.getCode(tab, script); 
			else csj.scriptCount--;
		}); 
	},
	
	getCode: function(tab, script){
		chrome.storage.local.get('csj-' + script.id, function(csjCode){ csj.runScript(tab, script, csjCode); }); 
	},
	
	runScript: function(tab, script, csjCode){
		if (typeof(csjCode['csj-' + script.id]) === 'undefined') return csj.scriptCount--;
		
		chrome.tabs.executeScript(tab.tabId, { code: csjCode['csj-' + script.id] });
		csj.scriptsRan.push(script.name);
		csj.scriptCount--;
		if (csj.scriptCount === 0) csj.markDone(tab);
	},

	markDone: function(tab){ 
		chrome.tabs.executeScript(tab.tabId, { code: 'var id = document.createAttribute("id"); id.value = "csjRan"; var ran = document.createAttribute("data-ran"); ran.value = "' + csj.scriptsRan.join('; ') + '"; var flag = document.createElement("div"); flag.setAttributeNode(id); flag.setAttributeNode(ran); document.body.appendChild(flag);' });
	}
};

chrome.webNavigation.onCompleted.addListener(function(tab){ csj.getCSJ(tab); });