class Content {
    constructor() {
        this.initStorage();
        this.initListeners();
        this.clearBtn = null;
        this.isBtn = null;
    }
    initStorage() {
        chrome.storage.local.get(['floatbtn'], data => {
            this.isBtn = data.floatbtn;
            if (this.isBtn) this.createBtn();
        });
    }
    checkBtnInserting() {
        if (this.isBtn) {
            this.createBtn()
        } else {
            this.deleteBtn()
        }
    }
    createBtn() {
        const img = document.createElement('img');
        img.className = "inserted-btn mtz";
        img.src = chrome.runtime.getURL('img/icon_main.svg');
        img.alt = 'Clear Button';
        img.addEventListener('click', this.handleClearBtn.bind(this));
        this.clearBtn = img;
        document.body.appendChild(img);
    }
    handleClearBtn(ev) {
        ev.target.style.transform = 'scale(0.5)';
        setTimeout(() => {
            ev.target.style.transform = 'scale(1)';
        }, 400)
        chrome.runtime.sendMessage({action: 'clearBtn'});
    }
    initListeners() {
        chrome.storage.onChanged.addListener((changes, namespace) => {
            this.isBtn = changes.floatbtn.newValue;
            this.checkBtnInserting();
        })
    }
    deleteBtn() {
        this.clearBtn.remove();
        this.clearBtn = null;
    }
}

const guruContent = new Content();