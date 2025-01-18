//XPath Creation: http://stackoverflow.com/questions/2631820/im-storing-click-coordinates-in-my-db-and-then-reloading-them-later-and-showing/2631931#2631931
//Find Element from xPath: http://stackoverflow.com/questions/10596417/is-there-a-way-to-get-element-by-xpath-using-javascript-in-selenium-webdriver

function getPathTo_old(element){
	if(element.id!=='')
		return 'id("'+element.id+'")';
	if(element===document.body)
		return element.tagName;

	var ix=0;
	var siblings=element.parentNode.childNodes;
	for(var i=0; i<siblings.length; i++){
		var sibling=siblings[i];
		if(sibling===element)
			return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
		if(sibling.nodeType===1&&sibling.tagName===element.tagName)
			ix++;
	}
}
function getPathTo(element){
	if(element){
		if(element.tagName==='HTML'){
			return '/HTML[1]';
		}else if(element===document.body){
			return '/HTML[1]/BODY[1]';
		}else{
			var ix=0;
			var siblings=(element.parentNode&&typeof element.parentNode.childNodes!=='undefined')?element.parentNode.childNodes:[];
			for(var i=0; i<siblings.length; i++){
				var sibling=siblings[i];
				if(sibling===element){
					return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
				}
				if(sibling.nodeType===1&&sibling.tagName===element.tagName){
					ix++;
				}
			}
		}
	}else{
		return '/HTML[1]';
	}
}
function getElementByXpath(path){
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}