
function onRequest(info, tab) {
	var selection = info.selectionText;
//do something with the selection
if(selection){
	var serviceCall = 'https://cs.github.com/?scopeName=All+repos&scope=&q=' + encodeURIComponent(selection);
	chrome.tabs.create({url: serviceCall});
}
};

chrome.contextMenus.create({
	id: "ghcs_search",
	contexts: ["selection"],
	title: "Search with GitHub Code Search",
	"onclick" : onRequest
});
