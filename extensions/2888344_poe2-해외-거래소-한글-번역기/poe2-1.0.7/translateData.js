class TranslateData {
    constructor() {
        if (window.translateDataInstance) {
            return window.translateDataInstance;
        }
        window.translateDataInstance = this;

        this.jsonUrls = {
            trade2data: "https://raw.githubusercontent.com/RG-dev190/POE2TradeKRDict/refs/heads/main/data/static.json",
            trade2filters: "https://raw.githubusercontent.com/RG-dev190/POE2TradeKRDict/refs/heads/main/data/filters.json",
            trade2stats: "https://raw.githubusercontent.com/RG-dev190/POE2TradeKRDict/refs/heads/main/data/stats.json",
            trade2items: "https://raw.githubusercontent.com/RG-dev190/POE2TradeKRDict/refs/heads/main/data/items.json"
        };
        
        this.initialized = false;
        this.initializationInProgress = false;
    }

    async waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === "complete") {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }

    async init() {
        if (this.initialized || this.initializationInProgress) {
            //console.log("TranslateData initialization already in progress or completed");
            await this.updateTranslationData();
            return true;
        }

        try {
            this.initializationInProgress = true;
            //console.log("TranslateData initializing...");
            
            await this.waitForDOM();
            await this.updateTranslationData();
            
            this.initialized = true;
            //console.log("TranslateData initialization completed");
            return true;
        } catch (error) {
            //console.error("TranslateData initialization error:", error);
            return false;
        } finally {
            this.initializationInProgress = false;
        }
    }

    async updateTranslationData() {
        //console.log("Updating translation data...");
        try {
            const fetchPromises = Object.entries(this.jsonUrls).map(async ([key, url]) => {
                //console.log(`Fetching ${key} data...`);
                const data = await this.fetchAndStoreJson(key, url);
                if (!data) {
                    throw new Error(`Failed to fetch ${key} data`);
                }
                return { key, data };
            });

            const results = await Promise.all(fetchPromises);
            //console.log("All translation data updated successfully");
            return true;
        } catch (error) {
            //console.error("Error updating translation data:", error);
            return false;
        }
    }

    async waitForData(maxAttempts = 10, interval = 2000) {
        //console.log("Waiting for translation data...");
        
        let updateTriggered = false;
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            if (this.checkAllDataExists()) {
                //console.log("All translation data found");
                return true;
            }

            //console.log(`Waiting for data... Attempt ${attempt + 1}/${maxAttempts}`);
            
            // 첫 시도에서만 업데이트 시도
            if (!updateTriggered) {
                updateTriggered = true;
                this.updateLocalStorageFromGitHub();
            }

            await new Promise(resolve => setTimeout(resolve, interval));
        }

        console.warn("Timeout waiting for translation data");
        return false;
    }

    checkAllDataExists() {
        try {
            return Object.keys(this.jsonUrls).every(key => {
                const data = localStorage.getItem(`lscache-${key}`);
                if (!data) {
                    return false;
                }
                try {
                    JSON.parse(data);
                    return true;
                } catch {
                    return false;
                }
            });
        } catch (error) {
            //console.error("Error checking data existence:", error);
            return false;
        }
    }

    async updateLocalStorageFromGitHub() {
        //console.log("Starting update of translation data...");
        const fetchPromises = Object.entries(this.jsonUrls).map(([key, url]) => 
            this.fetchAndStoreJson(key, url)
        );

        try {
            await Promise.all(fetchPromises);
            //console.log("All translation data updated successfully");
        } catch (error) {
            //console.error("Error updating translation data:", error);
        }
    }

    async fetchAndStoreJson(key, url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${key} from ${url}: ${response.statusText}`);
            }

            const data = await response.json();
            localStorage.setItem(`lscache-${key}`, JSON.stringify(data));
            //console.log(`Updated localStorage: lscache-${key}`);
            
            return data;
        } catch (error) {
            //console.error(`Error fetching and storing ${key}:`, error);
            return null;
        }
    }

    getData(key) {
        const data = localStorage.getItem(`lscache-${key}`);
        return data ? JSON.parse(data) : null;
    }

    getAllData() {
        const result = {};
        Object.keys(this.jsonUrls).forEach(key => {
            result[key] = this.getData(key);
        });
        return result;
    }

    onURLChange(newURL) {
        if (newURL.includes("pathofexile.com/trade2/search/poe2/")) {
            // URL이 변경되어도 이미 초기화된 경우는 다시 초기화하지 않음
            if (!this.initialized && !this.initializationInProgress) {
                this.init();
            }
        }
    }
}

// 파일 끝부분
window.TranslateData = TranslateData;
window.dispatchEvent(new Event('TranslateDataLoaded'));
