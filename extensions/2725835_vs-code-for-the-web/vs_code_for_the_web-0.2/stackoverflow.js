
function onRequest(info, tab) {
	var selection = info.selectionText;
//do something with the selection
if(selection){
	var serviceCall = 'https://stackoverflow.com/search?q=' + encodeURIComponent(selection);
	chrome.tabs.create({url: serviceCall});
}
};

chrome.contextMenus.create({
	id: "so_search",
	contexts: ["selection"],
	title: "Search with StackOverflow",
	"onclick" : onRequest
});
