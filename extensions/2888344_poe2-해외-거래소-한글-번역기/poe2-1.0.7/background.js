class NavigationManager {
    constructor() {
        this.routes = {
            initial: "https://poe.game.daum.net",
            login: "https://poe.game.daum.net/login/transfer?redir=%2Ftrade2",
            final: "https://www.pathofexile.com/trade2/search/poe2/Standard"
        };
        
        this.setupListeners();
    }

    setupListeners() {
        // 익스텐션 아이콘 클릭 리스너
        browser.browserAction.onClicked.addListener(() => this.handleExtensionClick());

        // URL 패턴 감지 리스너
        browser.webNavigation.onCompleted.addListener((details) => {
            //console.log("Navigation completed:", details.url);
            
            if (details.url.includes("poe.game.daum.net/login/transfer")) {
                //console.log("Daum login redirect detected");
                this.startNavigationSequence(details.tabId);
            } else if (details.url.includes("pathofexile.com/trade2/search/poe2/")) {
                //console.log("Trade page detected via webNavigation");
                this.injectScripts(details.tabId);
            }
        });

        // 히스토리 상 변경 감지
        browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
            //console.log("History state updated:", details.url);
            
            if (details.url.includes("pathofexile.com/trade2/search/poe2/")) {
                //console.log("Trade page detected via history update");
                this.injectScripts(details.tabId);
            }
        });

        // 탭 업데이트 리스너
        browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.url) {
                //console.log("Tab updated:", tab.url);
                
                if (tab.url.includes("pathofexile.com/trade2/search/poe2/")) {
                    //console.log("Trade page detected via tab update");
                    this.injectScripts(tabId);
                }
            }
        });
    }

    async handleExtensionClick() {
        //console.log("Extension clicked, starting navigation sequence...");
        
        // 쿠키 정리
        await this.clearCookies();
        
        // 새 탭 생성 및 네비게이션 시작
        const tab = await browser.tabs.create({ url: this.routes.initial });
        this.startNavigationSequence(tab.id);
    }

    async clearCookies() {
        const targetDomain = "www.pathofexile.com";
        const cookies = await browser.cookies.getAll({ domain: targetDomain });
        
        if (cookies.length > 0) {
            //console.log(`Clearing ${cookies.length} cookies...`);
            for (const cookie of cookies) {
                const url = `https://${cookie.domain.startsWith('.') ? cookie.domain.slice(1) : cookie.domain}${cookie.path}`;
                await browser.cookies.remove({ url, name: cookie.name });
            }
        }
    }

    async startNavigationSequence(tabId) {
        let navigationState = {
            count: 0,
            maxAttempts: 3,
            completed: false
        };

        const listener = async (changedTabId, changeInfo, tab) => {
            if (changedTabId !== tabId || changeInfo.status !== "complete") return;

            navigationState.count++;
            //console.log(`Navigation step ${navigationState.count} completed: ${tab.url}`);

            try {
                if (tab.url.includes("pathofexile.com/trade2/search/poe2/")) {
                    await this.injectScripts(tabId);
                    navigationState.completed = true;
                    this.cleanup(tabId, listener);
                } else {
                    await this.handleNavigationStep(tabId, navigationState);
                }
            } catch (error) {
                //console.error("Navigation error:", error);
                this.cleanup(tabId, listener);
            }
        };

        browser.tabs.onUpdated.addListener(listener);
    }

    async handleNavigationStep(tabId, navigationState) {
        if (navigationState.count === 1) {
            await browser.tabs.update(tabId, { url: this.routes.login });
        } else if (navigationState.count === 2) {
            await browser.tabs.update(tabId, { url: this.routes.final });
        }
    }

    async injectScripts(tabId) {
        try {
            // 현재 탭의 스크립트 실행 상태 확인
            const scriptStatus = await this.checkScriptStatus(tabId);
            
            if (!scriptStatus.initialized) {
                //console.log("Injecting scripts for tab:", tabId);
                
                // 페이지 준비 상태 확인
                const isReady = await this.checkPageReady(tabId);
                if (!isReady) {
                    //console.log("Page not ready, waiting...");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }

                // init.js만 먼저 주입
                await browser.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['init.js']
                });
                //console.log("Injected init.js");

                // 스크립트 실행 상태 저장
                await browser.storage.local.set({ 
                    [`tab_${tabId}_initialized`]: true 
                });
                
                //console.log("Scripts initialized successfully");
            } else {
                //console.log("Scripts already initialized for tab:", tabId);
            }
        } catch (error) {
            //console.error("Error injecting scripts:", error);
            // 실패 시 상태 초기화
            await browser.storage.local.remove(`tab_${tabId}_initialized`);
        }
    }

    async checkPageReady(tabId) {
        try {
            const result = await browser.scripting.executeScript({
                target: { tabId: tabId },
                func: () => {
                    return document.readyState === 'complete' && 
                           !!document.querySelector('.trade-site');
                }
            });
            return result[0]?.result || false;
        } catch (error) {
            //console.error("Error checking page ready state:", error);
            return false;
        }
    }

    async checkScriptStatus(tabId) {
        try {
            const result = await browser.storage.local.get(`tab_${tabId}_initialized`);
            return { initialized: !!result[`tab_${tabId}_initialized`] };
        } catch (error) {
            //console.error("Error checking script status:", error);
            return { initialized: false };
        }
    }

    cleanup(tabId, listener) {
        browser.tabs.onUpdated.removeListener(listener);
    }

    async handleNavigation(details) {
        // 일반 네비게이션 처리 (직접 URL 접근 등)
        if (details.url.includes("pathofexile.com/trade2/search/poe2/")) {
            //console.log("Trade page detected, initializing scripts...");
            await this.injectScripts(details.tabId);
        }
    }
}

// 네비게이션 매니저 인스턴스 생성
const navigationManager = new NavigationManager();

