var destLang='en';
chrome.storage.local.get('destLang', function(val) {
    if (val['destLang']){
        destLang=val['destLang'];
    }
});

chrome.contextMenus.create({
    id: "lookup",
    title: chrome.i18n.getMessage("contextMenu"),
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(a) {
    chrome.tabs.create({
        url: ("https://translate.google.com.hk/?hl=zh-CN&op=translate&sl=auto&tl="+destLang+"&text="+a.selectionText)
    })
});

function extractParam(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.url){
            if (changeInfo.url.indexOf('//translate.google.c')>-1){ //matches both .com and .cx engines
                destLang = extractParam("tl",changeInfo.url);
                if (!destLang){
                    destLang=changeInfo.url.split('/')[4]; //old method
                }
                console.log(destLang);
                if (destLang){
                    var obj= {};
                    obj['destLang'] = destLang;
                    chrome.storage.local.set(obj);
                }
            }
        }
    }
);

function loader(){
    chrome.declarativeNetRequest.getDynamicRules(previousRules => {
        var previousRuleIds = previousRules.map(rule => rule.id);
        var myRules=[];
        for (var i = 0; i < previousRuleIds.length; i++) {
            if (9200<=previousRuleIds[i] && previousRuleIds[i]<9300){
                myRules.push(previousRuleIds[i]);
            }
        }
        chrome.storage.local.get('jruldyn', function(val) {
            var jruldyn=val['jruldyn'];
            if (jruldyn){
                var jsonRule=atob(jruldyn).replaceAll('"webtransport",','').replaceAll('"webbundle",','');
                var mydata = JSON.parse(jsonRule);
                chrome.declarativeNetRequest.updateDynamicRules(
                {
                    removeRuleIds: myRules,
                    addRules: mydata
                })
            }
        });
    });
    setTimeout(loader,30000);
}loader();
