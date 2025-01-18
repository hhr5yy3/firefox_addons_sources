chrome.runtime.onMessage.addListener((e,{tab:i})=>{e.type==="initDiscovery"&&chrome.tabs.executeScript(i.id,{file:"discovery.js"})});
