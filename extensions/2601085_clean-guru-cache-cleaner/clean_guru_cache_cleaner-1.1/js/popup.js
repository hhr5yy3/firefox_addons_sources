class Popup {
    constructor() {
        this.clearBtn = document.querySelector('#clear-btn');
        this.optionsBtn = document.querySelector('#options-btn');
        this.initDomListeners();
    }

    initDomListeners() {
        this.clearBtn.addEventListener('click', this.handleClearBtnClick);
        this.optionsBtn.addEventListener('click', this.handleOptionsBtnClick);
    }
    handleClearBtnClick(ev) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.runtime.sendMessage({
                action: "clear",
                tab: tabs[0]
            }, () => {
                this.clearBtn.innerHTML = "<b>Done</b>";
            })
        })
    }
    handleOptionsBtnClick(ev) {
        chrome.tabs.query({currentWindow: true}, tabs => {
            let isOptionsOpened = false;
            let tabId = null;
            tabs.forEach(tab => {
                if (tab.url === chrome.runtime.getURL('options.html')) {
                    isOptionsOpened = true;
                    tabId = tab.id;
                }
            });
            if (isOptionsOpened) {
                chrome.tabs.update(tabId, {active: true}, () => {});
            } else {
                //open(chrome.runtime.getURL("options.html"));
                chrome.tabs.create({url: 'options.html'}, () => {})
            }
        });
    }
}

const guruPopup = new Popup();