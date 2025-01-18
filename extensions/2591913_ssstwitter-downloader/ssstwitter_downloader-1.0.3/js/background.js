if (!localStorage['firstInstall']) {
    window.open('https://extension.ssstwitter.com/thank_you.php');
    localStorage['firstInstall'] = 'false';
}else{   
    chrome.runtime.onInstalled.addListener(function() {
        chrome.tabs.create({
            url: 'https://ssstwitter.com/?utm_source=chrome&utm_medium=extension&utm_campaign=ext'
        });
    });
}

chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = "https://ssstwitter.com/?utm_source=chrome&utm_medium=extension&utm_campaign=ext";
    chrome.tabs.create({
        url: newURL
    });
});

if(chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://extension.ssstwitter.com/removed.php');
}