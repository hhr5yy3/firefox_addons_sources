
function openAPage() {
  
   browser.tabs.create({
     "url": "https://vscode.dev/"
   });
}



browser.browserAction.onClicked.addListener(openAPage);
