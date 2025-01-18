class Wishlist {
    constructor() {
        if (window.wishlistInstance) {
            return window.wishlistInstance;
        }
        window.wishlistInstance = this;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) {
            //console.log("Wishlist already initialized");
            return true;
        }

        //console.log("Wishlist initializing...");
        await this.waitForDOM();
        this.initialized = true;
        //console.log("Wishlist initialization completed");
        return true;
    }

    waitForDOM() {
        return new Promise((resolve) => {
            const checkAndInit = () => {
                if (document.body) {
                    this.initializeWishlist();
                    resolve();
                } else {
                    setTimeout(checkAndInit, 50);
                }
            };
            checkAndInit();
        });
    }

    initializeWishlist() {
        // 먼저 직접 확인
        const controlsRight = document.querySelector(".controls .controls-right");
        if (controlsRight) {
            //console.log("Found controls-right element directly");
            this.setupWishlistUI(controlsRight);
            return;
        }

        //console.log("Setting up observer for controls-right element");
        const observer = new MutationObserver((mutations, obs) => {
            const controlsRight = document.querySelector(".controls .controls-right");
            if (controlsRight) {
                //console.log("Found controls-right element through observer");
                obs.disconnect();
                this.setupWishlistUI(controlsRight);
            }
        });

        // 더 넓은 범위의 요소를 관찰
        const observeTarget = document.querySelector('.search-advanced') || document.body;
        observer.observe(observeTarget, {
            childList: true,
            subtree: true
        });

        // 5초 후에도 요소를 찾지 못하면 observer 중지
        setTimeout(() => {
            observer.disconnect();
            //console.log("Wishlist observer timed out");
        }, 5000);
    }

    setupWishlistUI(controlsRight) {
        // 이미 wishlist 버튼이 있는지 확인
        if (controlsRight.querySelector('.wishlist-btn')) {
            //console.log("Wishlist button already exists");
            return;
        }

        //console.log("Setting up Wishlist UI...");

        // 기존 버튼들을 임시 저장
        const clearBtn = controlsRight.querySelector(".clear-btn");
        const toggleBtn = controlsRight.querySelector(".toggle-search-btn");

        // controls-right에 flex 스타일 추가
        controlsRight.style.cssText = `
            display: flex;
            justify-content: flex-end;
            align-items: center;
        `;
        
        // 새로운 컨테이너 생성
        const buttonContainer = document.createElement("div");
        buttonContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 4px;
            margin-left: auto;
        `;

        // 즐겨찾기 버튼 생성
        const wishlistWrapper = document.createElement("div");
        wishlistWrapper.style.position = "relative";
        
        const wishlistButton = this.createWishlistButton();
        const popup = this.createWishlistPopup();

        wishlistWrapper.appendChild(wishlistButton);
        wishlistWrapper.appendChild(popup);
        
        // 순서대로 추가
        buttonContainer.appendChild(wishlistWrapper);
        if (clearBtn) buttonContainer.appendChild(clearBtn);
        if (toggleBtn) buttonContainer.appendChild(toggleBtn);

        // 이벤트 리스너 설정
        this.setupEventListeners(wishlistButton, popup, wishlistWrapper);

        // 기존 내용을 지우고 새 컨테이너로 교체
        controlsRight.innerHTML = '';
        controlsRight.appendChild(buttonContainer);

        //console.log("Wishlist UI setup completed");
    }

    createWishlistButton() {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn wishlist-btn";
        button.style.cssText = `
            height: 32px;
            padding: 0 8px;
            background-color: #2e8b57;
            border: 1px solid #f0fff0;
            color: #fff;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const span = document.createElement("span");
        span.textContent = "즐겨찾기";
        button.appendChild(span);

        return button;
    }

    createWishlistPopup() {
        const popup = document.createElement("div");
        popup.className = "wishlist-popup";
        popup.style.cssText = `
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 350px;
            background-color: #1a1a1a;
            border: 1px solid #3d3d3d;
            border-radius: 4px;
            padding: 10px;
            z-index: 1000;
            margin-top: 5px;
        `;

        popup.innerHTML = this.createWishlistItems();
        return popup;
    }

    createWishlistItems() {
        return `
            <div style="color: #fff;">
                <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 8px;
                ">
                    ${Array(5).fill(0).map((_, i) => this.createWishlistItem(i)).join('')}
                </div>
            </div>
        `;
    }

    createWishlistItem(index) {
        return `
            <div style="
                display: flex;
                gap: 6px;
                align-items: center;
            ">
                <input type="text" 
                    id="wishlistName${index}" 
                    class="wishlist-input"
                    placeholder="메모 ${index + 1}" 
                    style="
                        flex: 1;
                        height: 34px;
                        background: #2d2d2d;
                        border: 1px solid #3d3d3d;
                        color: #fff;
                        padding: 5px;
                        box-sizing: border-box;
                    "
                >
                <button 
                    id="openWishlist${index}"
                    class="open-btn"
                    data-index="${index}"
                    style="
                        width: 40px;
                        height: 32px;
                        background: #2d2d2d;
                        border: 1px solid #3d3d3d;
                        color: #fff;
                        cursor: pointer;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                    "
                >열기</button>
                <button 
                    id="saveWishlist${index}"
                    class="save-btn"
                    data-index="${index}"
                    style="
                        width: 32px;
                        height: 32px;
                        background: #2d2d2d;
                        border: 1px solid #3d3d3d;
                        color: #fff;
                        cursor: pointer;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                    "
                >&#10010;</button>
                <button 
                    id="deleteWishlist${index}" 
                    class="delete-btn"
                    data-index="${index}"
                    style="
                        width: 32px;
                        height: 32px;
                        background: #2d2d2d;
                        border: 1px solid #3d3d3d;
                        color: #fff;
                        cursor: pointer;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                    "
                >&#10006;</button>
            </div>
        `;
    }

    setupEventListeners(wishlistButton, popup, wishlistWrapper) {
        wishlistButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.loadWishlistData(popup);
            popup.style.display = popup.style.display === "none" ? "block" : "none";
        });

        this.setupSaveButtons(popup);
        this.setupDeleteButtons(popup);
        this.setupOpenButtons(popup);

        document.addEventListener("click", (e) => {
            if (!wishlistWrapper.contains(e.target)) {
                popup.style.display = "none";
            }
        });
    }

    setupSaveButtons(popup) {
        popup.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                const input = popup.querySelector(`#wishlistName${index}`);
                this.handleSave(index, input, btn);
            });
        });
    }

    setupDeleteButtons(popup) {
        popup.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                this.handleDelete(index, popup, btn);
            });
        });
    }

    setupOpenButtons(popup) {
        popup.querySelectorAll('.open-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                this.handleOpen(index);
            });
        });
    }

    handleSave(index, input, btn) {
        const name = input.value.trim();
        if (!name) {
            this.showInputError(input);
            return;
        }

        const currentUrl = window.location.href;
        if (currentUrl === 'https://www.pathofexile.com/trade2/search/poe2/Standard') {
            alert('검색 결과가 없어 즐겨찾기를 추가할 수 없습니다.');
            return;
        }

        browser.storage.local.get('wishlists').then((result) => {
            const wishlists = result.wishlists || [];
            wishlists[index] = {
                name: name,
                url: currentUrl,
                date: new Date().toISOString()
            };

            browser.storage.local.set({ wishlists }).then(() => {
                this.showSaveSuccess(btn);
            });
        });
    }

    handleDelete(index, popup, btn) {
        browser.storage.local.get('wishlists').then((result) => {
            const wishlists = result.wishlists || [];
            wishlists[index] = null;

            browser.storage.local.set({ wishlists }).then(() => {
                const input = popup.querySelector(`#wishlistName${index}`);
                input.value = '';
                this.showDeleteSuccess(btn);
            });
        });
    }

    handleOpen(index) {
        browser.storage.local.get('wishlists').then((result) => {
            const wishlists = result.wishlists || [];
            const item = wishlists[index];

            if (item && item.url) {
                window.open(item.url, '_blank');
            } else {
                alert('저장된 URL이 없습니다.');
            }
        });
    }

    showInputError(input) {
        input.style.borderColor = '#ff4444';
        setTimeout(() => {
            input.style.borderColor = '#3d3d3d';
        }, 500);
    }

    showSaveSuccess(btn) {
        btn.style.backgroundColor = '#2e8b57';
        setTimeout(() => {
            btn.style.backgroundColor = '#2d2d2d';
        }, 500);
    }

    showDeleteSuccess(btn) {
        btn.style.backgroundColor = '#ff4444';
        setTimeout(() => {
            btn.style.backgroundColor = '#2d2d2d';
        }, 500);
    }

    loadWishlistData(popup) {
        browser.storage.local.get('wishlists').then((result) => {
            const wishlists = result.wishlists || [];
            const inputs = popup.querySelectorAll('.wishlist-input');
            
            inputs.forEach((input, index) => {
                const item = wishlists[index];
                input.value = item ? item.name : '';
            });
        });
    }

    onURLChange(newURL) {
        if (newURL.includes("pathofexile.com/trade2/search/poe2/")) {
            this.init();
        }
    }
}

window.Wishlist = Wishlist;
window.dispatchEvent(new Event('WishlistLoaded'));
