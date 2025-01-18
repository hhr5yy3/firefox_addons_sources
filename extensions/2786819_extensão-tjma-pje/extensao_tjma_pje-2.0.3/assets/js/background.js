browser.runtime.onMessage.addListener(
async function(request, sender, sendResponse) {
    if(request.newIconPath){
        browser.browserAction.setIcon({
            path: request.newIconPath,
            tabId: sender.tab.id
        });
    }

    if(request.navigate){
        browser.browserAction.setPopup({
            popup: request.navigate,
            tabId: sender.tab.id
        });
    }
    
    if(request.scripting){
        salvarToken(sender.tab.url);
        salvarProcesso(sender.tab.id);
        salvarInstancia();
        salvarPod(sender.tab.url);
    }

    if(request.pod){
        salvarPod(request.pod);
     }
});

function salvarToken(url){
    browser.storage.local.get(["token"], function(items){
        browser.cookies.get({"url": url, "name": KEYCLOAK_IDENTITY}).then((cookie) => {
            let token = cookie.value
            if(token != items.token){
                browser.storage.local.set({"welcome": false}, function(){})
            }
            browser.storage.local.set({"token": token}, function(){})
        });
    });
}

function salvarPod(url){
    browser.cookies.getAll({"url": url, "name": JSESSIONID}, function(cookie){
        let jSessionId = cookie[0]?.value;
        if(jSessionId){
            let pod = jSessionId.split(".")[1];
            browser.storage.local.set({"pod": pod}, function(){})
        }
    });
}

async function salvarProcesso(tabId){
    const title = await executeScript(tabId, () => document.title);
    const processo = title[0].result.substring(0, 25);
    browser.storage.local.set({"processo": processo}, function(){})
}

function salvarInstancia(){  
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url;
        let instancia = "PG"
        
        if(url.includes("pje2g")){
            instancia = "SG";
        }

        browser.storage.local.set({"instancia": instancia}, function(){})
    });
}

const executeScript = (tabId, func) => new Promise(resolve => {
    browser.scripting.executeScript({ target: { tabId }, func }, resolve)
});