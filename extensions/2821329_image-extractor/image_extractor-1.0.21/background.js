let images = {};
let active_tab = null;
let counter = 0;

let get_hash = function(str) {
    let hash = 0;

    if (str.length == 0) return hash;
    
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return "h" + hash.toString();
}

async function get_active_tab() {    
    let tabs = await browser.tabs.query({active: true, lastFocusedWindow: true});

    if (tabs) {
        if (tabs.length > 0) {
            active_tab = tabs[0];
            return tabs[0];
        }
    }

    active_tab = null;
    return null;
}

async function update_action_button() {
    if (active_tab) {        
        if (active_tab.url) {
            if (active_tab.url.startsWith('http')) {
                let hash = active_tab.id + ':' + get_hash(active_tab.url);
                let v_images = images[hash] || [];

                if (v_images.length > 0) {
                    await browser.action.enable();
                    await browser.action.setBadgeText({text:(v_images.length).toString()});
                    return;
                } 
            }
        }
    }

    await browser.action.setBadgeText({text:''});        
    await browser.action.disable();
}

browser.webRequest.onBeforeRequest.addListener(
    async requestDetails => {    
        if (active_tab) {
            if (active_tab.url) {
                if (active_tab.url.startsWith('http')) {
                    let hash = active_tab.id + ':' + get_hash(active_tab.url);
                    let url = requestDetails.url.trim().toLocaleLowerCase();

                    if ((url.includes('.jpg')) || (url.includes('.png')) || (url.includes('.svg')) || (url.includes('.webp')) || (url.includes('.gif')) || (url.includes('.jpeg')) || ['image', 'imageset'].includes(requestDetails.type)) {
                        let v_images = images[hash];

                        if (!v_images) {
                            images[hash] = [];
                            v_images = images[hash];
                        } 

                        let valid = true;

                        if ((url).startsWith('https://www.google-analytics.com')) valid = false;
                        if ((url).startsWith('https://www.facebook.com/tr/')) valid = false;

                        if ((requestDetails.url).startsWith('http')) {
                            if (valid && (!v_images.includes(requestDetails.url))) {                                
                                browser.tabs.sendMessage(active_tab.id, {
                                    command: "load-image",
                                    image: requestDetails.url,
                                    hash: hash
                                })
                            }
                        }
                    }
                }
            }
        }
    },
    {urls: ["<all_urls>"]}
)

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.command === 'add-image') {
        if (!images[message.hash]) {
            images[message.hash] = [];
        }

        images[message.hash].push(message.image);

        await get_active_tab();
        await update_action_button();
    }
})

browser.runtime.onInstalled.addListener(async () => {
    await get_active_tab();
    await update_action_button();
})

browser.tabs.onActivated.addListener(async (info) => {
    await get_active_tab();
    await update_action_button();
})

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    if (['loading','complete'].includes(changeInfo.status)) {
        await get_active_tab();

        if (changeInfo.status === 'loading') {
            Object.keys(images).forEach(item => {
                if (item.startsWith(tabId + ':')) {
                    delete images[item];
                }
            })            
        }

        await update_action_button();
    }
})

browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
    Object.keys(images).forEach(item => {
        if (item.startsWith(tabId + ':')) {
            delete images[item];
        }
    })
})

browser.action.onClicked.addListener(async (info) => {
    if (!active_tab) return;

    let tab_id = active_tab.id;
    let tab_url = active_tab.url;
    let hash = tab_id + ':' + get_hash(tab_url);  
    let v_images = images[hash] || [];          

    if (v_images.length <= 0) return;

    browser.tabs.create(
        {
            url: browser.runtime.getURL('./show-images/index.html')
        },
        async tab => {
            let clone_images = [];

            Object.assign(clone_images, images[hash]);
            images[hash] = [];

            setTimeout(() => {
                browser.tabs.sendMessage(tab.id, {
                    "command": "load-images",
                    "images": clone_images
                })
            }, 300)
        }
    )
})
