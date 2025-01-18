// 이미 존재하는 인스턴스 확인
if (!window.POETradeExtension) {
    class POETradeExtension {
        static instance = null;  // 싱글톤 인스턴스 저장
        static initializationStarted = false;

        constructor() {
            if (POETradeExtension.instance) {
                return POETradeExtension.instance;
            }
            
            this.modules = {
                data: null,
                ui: null,
                wishlist: null,
                result: null
            };
            this.initialized = false;
            POETradeExtension.instance = this;
        }

        async loadModuleScripts() {
            const moduleDefinitions = [
                { 
                    name: 'TranslateData',
                    initCheck: async () => {
                        if (!window.TranslateData) {
                            throw new Error('TranslateData is not found');
                        }
                        const instance = new window.TranslateData();
                        return instance.init();
                    }
                },
                { 
                    name: 'ResultData',
                    initCheck: async () => {
                        if (!window.ResultData) {
                            throw new Error('ResultData is not found');
                        }
                        const instance = new window.ResultData();
                        return instance.init();
                    }
                },
                { 
                    name: 'TranslateUI',
                    initCheck: async () => {
                        if (!window.TranslateUI) {
                            throw new Error('TranslateUI is not found');
                        }
                        const instance = new window.TranslateUI();
                        return instance.init();
                    }
                },
                { 
                    name: 'Wishlist',
                    initCheck: async () => {
                        if (!window.Wishlist) {
                            throw new Error('Wishlist is not found');
                        }
                        const instance = new window.Wishlist();
                        return instance.init();
                    }
                }
            ];

            for (const module of moduleDefinitions) {
                try {
                    //console.log(`Initializing module: ${module.name}`);
                    if (module.initCheck) {
                        await module.initCheck();
                    }
                    //console.log(`Successfully initialized module: ${module.name}`);
                } catch (error) {
                    //console.error(`Failed to initialize module ${module.name}:`, error);
                    throw error;
                }
            }
        }

        async loadSingleModule({ name, file }) {
            return new Promise((resolve, reject) => {
                if (window[name]) {
                    //console.log(`Module ${name} already exists in window`);
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                try {
                    // chrome.runtime 객체 접근을 try-catch로 감싸기
                    try {
                        script.src = chrome.runtime.getURL(file);
                    } catch (e) {
                        //console.error('Failed to get extension URL:', e);
                        reject(new Error('Extension context not available'));
                        return;
                    }

                    script.type = 'text/javascript';
                    //console.log(`Loading script from extension: ${script.src}`);

                    let timeoutId;
                    let moduleCheckInterval;

                    const cleanup = () => {
                        clearTimeout(timeoutId);
                        clearInterval(moduleCheckInterval);
                        window.removeEventListener(`${name}Loaded`, handleLoad);
                        script.remove();
                    };

                    const verifyModule = () => {
                        try {
                            const moduleExists = window[name] && typeof window[name] === 'function';
                            if (moduleExists) {
                                cleanup();
                                //console.log(`Module ${name} successfully registered`);
                                resolve();
                                return true;
                            }
                        } catch (e) {
                            //console.error(`Error verifying module ${name}:`, e);
                        }
                        return false;
                    };

                    const handleLoad = function() {
                        //console.log(`Received ${name}Loaded event`);
                        // 이벤트 발생 직후 확인
                        setTimeout(() => {
                            if (!verifyModule()) {
                                //console.log(`Module ${name} not immediately available, starting polling...`);
                                moduleCheckInterval = setInterval(verifyModule, 50);
                            }
                        }, 10);
                    };

                    window.addEventListener(`${name}Loaded`, handleLoad);

                    script.onerror = (error) => {
                        cleanup();
                        //console.error(`Error loading ${name}:`, error);
                        reject(new Error(`Failed to load module ${name}`));
                    };

                    document.head.appendChild(script);

                    timeoutId = setTimeout(() => {
                        cleanup();
                        reject(new Error(`Timeout loading module ${name}`));
                    }, 5000);

                } catch (error) {
                    //console.error(`Error setting up script for ${name}:`, error);
                    reject(error);
                }
            });
        }

        async waitForRequiredElements() {
            return new Promise((resolve, reject) => {
                const checkElements = () => {
                    const searchInput = document.querySelector(".multiselect__input");
                    const menuSearch = document.querySelector(".menu-search");
                    const menuExchange = document.querySelector(".menu-exchange");

                    if (searchInput && menuSearch && menuExchange) {
                        //console.log("Required elements found");
                        resolve();
                    } else {
                        this.initAttempts++;
                        if (this.initAttempts >= this.maxAttempts) {
                            console.warn("Failed to find required elements after maximum attempts");
                            reject(new Error("Required elements not found"));
                            return;
                        }
                        //console.log(`Waiting for required elements... Attempt ${this.initAttempts}`);
                        setTimeout(checkElements, 500);
                    }
                };

                checkElements();
            });
        }

        async init() {
            if (this.initialized || POETradeExtension.initializationStarted) return;
            
            POETradeExtension.initializationStarted = true;
            //console.log("POE Trade Extension initializing...");
            
            try {
                await this.waitForRequiredElements();
                await this.loadModuleScripts();
                await new Promise(resolve => setTimeout(resolve, 500));
                await this.initializeModules();
                this.setupURLChangeDetection();
                
                this.initialized = true;
                //console.log("POE Trade Extension initialized");
            } catch (error) {
                //console.error("Initialization failed:", error);
                POETradeExtension.initializationStarted = false;
                throw error;
            }
        }

        async initializeModules() {
            try {
                // TranslateData 초기화
                //console.log("Creating TranslateData instance...");
                this.modules.data = new window.TranslateData();
                //console.log("TranslateData instance created:", this.modules.data);
                await this.modules.data.init();
                //console.log("TranslateData initialized successfully");

                // ResultData 초기화
                //console.log("Creating ResultData instance...");
                this.modules.result = new window.ResultData();
                //console.log("ResultData instance created:", this.modules.result);
                await this.modules.result.init();
                //console.log("ResultData initialized successfully");

                // TranslateUI 초기화
                //console.log("Creating TranslateUI instance...");
                this.modules.ui = new window.TranslateUI();
                //console.log("TranslateUI instance created:", this.modules.ui);
                await this.modules.ui.init();
                //console.log("TranslateUI initialized successfully");

                // Wishlist 초기화
                //console.log("Creating Wishlist instance...");
                this.modules.wishlist = new window.Wishlist();
                //console.log("Wishlist instance created:", this.modules.wishlist);
                await this.modules.wishlist.init();
                //console.log("Wishlist initialized successfully");

                //console.log("All modules initialization attempted");
                //console.log("Final modules state:", this.modules);
            } catch (error) {
                //console.error("Error initializing modules:", error);
                throw error;
            }
        }

        setupURLChangeDetection() {
            let lastUrl = location.href;
            const observer = new MutationObserver(() => {
                const url = location.href;
                if (url !== lastUrl) {
                    lastUrl = url;
                    this.onURLChange(url);
                }
            });
            
            observer.observe(document.querySelector('head > title'), { 
                subtree: true, 
                characterData: true, 
                childList: true 
            });
        }

        async onURLChange(newURL) {
            //console.log("URL changed:", newURL);
            
            for (const [key, module] of Object.entries(this.modules)) {
                if (module && typeof module.onURLChange === 'function') {
                    try {
                        await module.onURLChange(newURL);
                    } catch (error) {
                        //console.error(`Error in ${key} module onURLChange:`, error);
                    }
                }
            }
        }
    }

    window.POETradeExtension = POETradeExtension;
}

// 싱글톤 인스턴스 생성 및 초기화 (한 번만 실행되도록)
if (!window.poeExtension) {
    //console.log("Creating POETradeExtension instance...");
    window.poeExtension = new POETradeExtension();
    
    // DOM이 로드된 후 초기화 시작
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            //console.log("Starting initialization...");
            window.poeExtension.init().catch(error => {
                //console.error("Failed to initialize POE Trade Extension:", error);
            });
        });
    } else {
        //console.log("Starting initialization...");
        window.poeExtension.init().catch(error => {
            //console.error("Failed to initialize POE Trade Extension:", error);
        });
    }
}