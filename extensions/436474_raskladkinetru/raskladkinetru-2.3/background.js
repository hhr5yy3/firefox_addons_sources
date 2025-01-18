function getClickHandler() {
  return function(info, tab) {

    var url = 'https://raskladki.net.ru/?br=firefox&t=' + info.selectionText;

    chrome.tabs.create({ url: url, active: true });
  };
};

chrome.contextMenus.create({
  "title" : "Сменить раскладку",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : getClickHandler()
});