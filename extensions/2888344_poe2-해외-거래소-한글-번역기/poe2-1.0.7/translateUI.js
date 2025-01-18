class TranslateUI {
    constructor() {
        if (window.translateUIInstance) {
            return window.translateUIInstance;
        }
        window.translateUIInstance = this;

        this.observer = null;
        this.initialized = false;
        this.translations = {
            menuItems: {
                search: "등록된 아이템 검색",
                exchange: "아이템 대량 교환"
            },
            buttons: {
                search: "검색",
                clear: "지우기"
            },
            filterGroups: {
                statFilter: "능력치 필터"
            },
            placeholders: {
                min: "최소",
                max: "최대",
                addStatFilter: "+ 능력치 필터 추가",
                addStatGroup: "+ 능력치 그룹 추가",
                search: "아이템 검색 - POE2 거래소 한글화 확장프로그램 작동중입니다..."
            }
        };
    }

    init() {
        if (this.initialized) {
            return;
        }

        this.applyTranslations();
        this.setupObserver();
        this.initialized = true;
    }

    setupObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.observer = new MutationObserver(() => {
            this.applyTranslations();
        });

        const searchInput = document.querySelector(".multiselect__input");
        const menuSearch = document.querySelector(".menu-search");
        const menuExchange = document.querySelector(".menu-exchange");

        if (searchInput && menuSearch && menuExchange) {
            [searchInput.parentElement, menuSearch.parentElement, menuExchange.parentElement].forEach(element => {
                if (element) {
                    this.observer.observe(element, {
                        childList: true,
                        subtree: true
                    });
                }
            });
        } else {
            console.warn("Missing some elements for observation");
        }
    }

    applyTranslations() {
        // 메뉴 아이템 번역
        this.translateMenuItems();
        
        // 입력 필드 placeholder 번역
        this.translatePlaceholders();
        
        // 버튼 텍스트 번역
        this.translateButtons();

        // STAT FILTER 번역
        this.translateStatFilter();
        
        // 검색창 placeholder 번역
        const inputForm = document.querySelector(".multiselect__input");
        if (inputForm) {
            inputForm.placeholder = this.translations.placeholders.search;
        }
    }

    translateMenuItems() {
        // Search Listed Items 번역
        const searchMenuItem = document.querySelector('.menu-search a span');
        if (searchMenuItem) {
            searchMenuItem.innerText = this.translations.menuItems.search;
        }

        // Bulk Item Exchange 번역
        const exchangeMenuItem = document.querySelector('.menu-exchange a span');
        if (exchangeMenuItem) {
            exchangeMenuItem.innerText = this.translations.menuItems.exchange;
        }
    }

    translatePlaceholders() {
        // min/max placeholder 번역
        const minMaxInputs = document.querySelectorAll(".form-control.minmax");
        minMaxInputs.forEach(input => {
            if (input.placeholder === "min") {
                input.placeholder = this.translations.placeholders.min;
            } else if (input.placeholder === "max") {
                input.placeholder = this.translations.placeholders.max;
            }
        });

        // 능력치 필터 placeholder 번역
        const statFilterInput = document.querySelector('input[placeholder="+ Add Stat Filter"]');
        if (statFilterInput) {
            statFilterInput.placeholder = this.translations.placeholders.addStatFilter;
        }

        // 능력치 그룹 placeholder 번역
        const statGroupInput = document.querySelector(".multiselect.filter-select.filter-group-select .multiselect__input");
        if (statGroupInput) {
            statGroupInput.placeholder = this.translations.placeholders.addStatGroup;
        }
    }

    translateButtons() {
        // Search 버튼 번역
        const searchBtn = document.querySelector('.search-btn span');
        if (searchBtn) {
            searchBtn.innerText = this.translations.buttons.search;
        }

        // Clear 버튼 번역
        const clearBtn = document.querySelector('.clear-btn span');
        if (clearBtn) {
            clearBtn.innerText = this.translations.buttons.clear;
        }
    }

    translateStatFilter() {
        const filterGroups = document.querySelectorAll(".filter-group > .filter-group-header > .filter > .filter-body");
        if (filterGroups.length >= 7) {  // 능력치 필터는 7번째 항목
            const targetDiv = filterGroups[6].querySelector("div");
            if (targetDiv) {
                targetDiv.innerText = this.translations.filterGroups.statFilter;
            }
        }
    }
}

// 단순히 window 객체에 등록하고 이벤트 발생
window.TranslateUI = TranslateUI;
window.dispatchEvent(new Event('TranslateUILoaded'));

