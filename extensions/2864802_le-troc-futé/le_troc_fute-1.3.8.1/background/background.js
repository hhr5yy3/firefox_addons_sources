const TAB_TITLE = 'Troc futé';
const VINTED_PASSPORT_KEY = 'vintedPassport';
const VINTED_URLS = {
    baseUrl: "https://www.vinted.fr",
    login: "https://www.vinted.fr/web/api/auth/oauth",
    logout: "https://www.vinted.fr/web/api/auth/logout"
}

async function makeHttpRequest2(headers = {}, method = "GET", payload = null, url, operationName) {
    if (operationName === 'uploadPhoto') {
        const uploadPromises = payload.map(async (file) => {
            const formData = new FormData();
            formData.append("photo[file]", file);
            formData.append("photo[type]", "item");
            formData.append("photo[temp_uuid]", generateUUIDv4());

            delete headers["Content-Type"];
            const responseData = await uploadHttpRequest(headers, method, formData, url);
            return responseData;
        });

        return await Promise.all(uploadPromises);
    } else if (operationName === 'getFiles') {
        return await fetchFilesFromUrls(payload);
    } else if (operationName.includes('getHTML')) {
        return await fetchHtmlContent(url);
    } else {
        return await defaultHttpRequest(headers, method, payload, url);
    }
}

async function defaultHttpRequest(headers = {}, method = "GET", payload = null, url) {
    const options = {
        method,
        headers: new Headers(headers),
    };

    if (
        payload &&
        (method === "POST" || method === "PUT" || method === "PATCH")
    ) {
        if (payload instanceof FormData) {
            options.body = payload;
        } else {
            options.body = JSON.stringify(payload);
            options.headers.set("Content-Type", "application/json");
        }

    }

    // Make the HTTP request
    return fetch(url, options)
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const contentType = response.headers.get('Content-Type');
            const contentLength = response.headers.get('Content-Length');
            if (contentLength === "0" || !contentType?.includes('application/json')) {
                console.warn('No JSON content to parse');
                return {};
            }

            return response.json(); // Assuming the response is in JSON format
        })
        .catch((error) => {
            console.error("There was an error with the HTTP request:", error);
            throw error;
        });
}

async function uploadHttpRequest(
    headers = {},
    method = "POST",
    payload = null,
    url
) {
    const options = {
        method,
        headers: new Headers(headers),
    };

    if (
        payload &&
        (method === "POST" || method === "PUT" || method === "PATCH")
    ) {
        if (payload instanceof FormData) {
            options.body = payload;
        } else {
            throw new Error(
                "Payload must be an instance of FormData when making a request with FormData."
            );
        }
    }

    return fetch(url, options)
        .then(async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            return response.json();
        })
        .catch((error) => {
            console.error("There was an error with the HTTP request:", error);
            throw error;
        });
}

function generateUUIDv4() {
    function getRandomInt() {
        return Math.floor(Math.random() * 256);
    }

    const bytes = new Uint8Array(16);

    for (let i = 0; i < 16; i++) {
        bytes[i] = getRandomInt();
    }

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const byteToHex = Array.from(bytes).map((byte) =>
        byte.toString(16).padStart(2, "0")
    );

    return `${byteToHex[0]}${byteToHex[1]}${byteToHex[2]}${byteToHex[3]}-${byteToHex[4]}${byteToHex[5]}-${byteToHex[6]}${byteToHex[7]}-${byteToHex[8]}${byteToHex[9]}-${byteToHex[10]}${byteToHex[11]}${byteToHex[12]}${byteToHex[13]}${byteToHex[14]}${byteToHex[15]}`;
}

async function fetchFilesFromUrls(urls) {
    try {
        const files = [];
        for (const url of urls) {
            const response = await fetch(url);
            const blob = await response.blob();
            const urlParts = url.split("/");
            const fileName = urlParts[urlParts.length - 1];
            const file = new File([blob], fileName, { type: blob.type });
            files.push(file);
        }
        return files;
    } catch (error) {
        console.error("Error fetching file:", error);
        return null
    }
}

async function fetchHtmlContent(url) {
    return new Promise((resolve, reject) => {
        let tabId = localStorage.getItem('vintedTabId'); // Récupérer le tabId depuis le localStorage

        const openTabAndListen = () => {
            browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTabId = tabs[0].id; // ID de l'onglet actif

                // Crée le nouvel onglet
                browser.tabs.create({ url, active: false }, (tab) => {
                    const newTabId = tab.id;
                    localStorage.setItem('vintedTabId', newTabId); // Stocker le tabId dans le localStorage

                    browser.tabs.update(activeTabId, { active: true });
                    setupWebNavigationListener();
                });
            });
        };

        const setupWebNavigationListener = () => {
            const onCompleted = (details) => {
                if (details.tabId === parseInt(tabId) && details.url === url) {
                    browser.webNavigation.onCompleted.removeListener(onCompleted);
                    listenForApiRequest(resolve);
                    waitForElementAndTriggerClick(); // Lancer l'action dès que l'onglet est chargé
                }
            };
            browser.webNavigation.onCompleted.addListener(onCompleted);
        };

        const waitForElementAndTriggerClick = async () => {
            try {
                const currentTab = await browser.tabs.get(parseInt(tabId));

                const currentTabUrl = new URL(currentTab.url);
                const paramsUrl = new URL(url);
                currentTabUrl.searchParams.delete('time');
                currentTabUrl.searchParams.delete('page');
                currentTabUrl.searchParams.delete('search_id');
                currentTabUrl.searchParams.delete('currency');

                paramsUrl.searchParams.delete('time');
                paramsUrl.searchParams.delete('search_id');
                paramsUrl.searchParams.delete('currency');

                if (currentTabUrl.toString().includes(paramsUrl.toString())) {
                }

                if (!currentTabUrl.toString().includes(paramsUrl.toString())) {
                    await new Promise((resolve, reject) => {
                        // Mettre à jour l'URL de l'onglet
                        browser.tabs.update(parseInt(tabId), { url }, () => {
                            // Ajouter un écouteur pour détecter la fin du chargement de la nouvelle URL
                            const onCompleted = (details) => {
                                if (details.tabId === parseInt(tabId) && details.url === url) {
                                    browser.webNavigation.onCompleted.removeListener(onCompleted);
                                    listenForApiRequest(resolve); // Page chargée, continuer
                                }
                            };
                            browser.webNavigation.onCompleted.addListener(onCompleted);
                        });
                    });
                }

                // Lancer la vérification de l'élément une fois que l'URL est correcte
                const result = await browser.scripting.executeScript({
                    target: { tabId: parseInt(tabId) },
                    func: () => {
                        return new Promise((resolve) => {
                            const checkExist = setInterval(() => {
                                const filterTrigger = document.querySelector('[data-testid="catalog--sort-filter--trigger"]');
                                const filterTriggerMobile = document.querySelector('button[data-testid="trigger"]');
                                if (filterTrigger || filterTriggerMobile) {
                                    clearInterval(checkExist);
                                    resolve(true); // L'élément est trouvé
                                }
                            }, 100); // Vérifier toutes les 100 ms
                        });
                    }
                });

                triggerClicksAndCaptureData(); // L'élément est présent, on peut continuer

            } catch (error) {
                console.error("Erreur dans waitForElementAndTriggerClick :", error);
                reject(error);
            }
        };

        const triggerClicksAndCaptureData = async () => {
            try {
                await browser.scripting.executeScript({
                    target: { tabId: parseInt(tabId) },
                    func: () => {
                        //Si grande écran
                        const filterTrigger = document.querySelector('[data-testid="catalog--sort-filter--trigger"]');
                        if (filterTrigger) {
                            filterTrigger.click();
                        }
                        setTimeout(() => {
                            const sortByNewest = document.querySelector('#sort_by-list-item-newest_first');
                            if (sortByNewest) {
                                sortByNewest.click();
                            }
                        }, 500);

                        //Si page mobile
                        const filterTriggerMobile = document.querySelector('button[data-testid="trigger"]');
                        if (filterTriggerMobile) {
                            filterTriggerMobile.click();
                        }

                        setTimeout(() => {
                            const button = Array.from(document.querySelectorAll('button')).find(btn =>
                                btn.textContent.trim() === 'Afficher les résultats' ||
                                btn.textContent.trim() === 'Show results' ||
                                btn.textContent.trim() === 'Ver resultados' ||
                                btn.textContent.trim() === 'Toon resultaten'
                            );

                            if (button) {
                                button.click();
                            }
                        }, 500);
                    }
                });

                listenForApiRequest(resolve);
            } catch (error) {
                reject(error);
            }
        };

        const listenForApiRequest = (resolve) => {
            browser.webRequest.onBeforeRequest.addListener(
                (dets) => {
                    if (dets.url.includes('https://www.vinted.fr/api/v2/catalog/items') && dets.method === "GET") {
                        let filter = browser.webRequest.filterResponseData(dets.requestId);
                        let decoder = new TextDecoder("utf-8");
                        let completeData = "";

                        filter.ondata = (event) => {
                            let str = decoder.decode(event.data, { stream: true });
                            completeData += str;
                        };

                        filter.onstop = () => {
                            try {
                                if (completeData) {
                                    let jsonResponse = JSON.parse(completeData);
                                    resolve(jsonResponse); // Résolution avec les données de l'API
                                } else {
                                    resolve(null);
                                }
                            } catch (e) {
                                console.error("Erreur de parsing JSON :", e);
                                reject(e);
                            }
                            filter.close();
                        };
                    }
                },
                { urls: ["<all_urls>"] },
                ["blocking"]
            );
        };

        // Vérifier si le tabId est valide et si l'onglet existe
        if (tabId) {
            browser.tabs.get(parseInt(tabId)).then((tab) => {
                if (tab) {
                    // Si l'onglet existe, on continue avec le tabId existant
                    waitForElementAndTriggerClick();
                } else {
                    // Si l'onglet n'existe pas, créer un nouvel onglet
                    openTabAndListen();
                }
            }).catch(() => {
                // En cas d'erreur (par exemple, si l'onglet a été fermé), on crée un nouvel onglet
                openTabAndListen();
            });
        } else {
            // Si aucun tabId n'est stocké, créer un nouvel onglet
            openTabAndListen();
        }
    });
}

function getCookiesForDomains(domains = ["www.vinted.fr", ".vinted.fr"]) {
    return new Promise((resolve, reject) => {
        const cookiesPromises = domains.map(domain => {
            return browser.cookies.getAll({ domain })
                .then(cookies => ({ domain, cookies }))
                .catch(error => {
                    console.error(`Error fetching cookies for domain ${domain}:`, error);
                    return { domain, cookies: [] }; // Return empty array on error
                });
        });


        Promise.all(cookiesPromises)
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * data: @array
 */
function parseNameValue(data) {
    const parsedData = {};
    data.forEach((item) => {
        parsedData[item.name] = item.value;
    });
    return parsedData;
}

function findTabAndExecuteScript(tabTitle, executeScript, active = false) {
    browser.tabs.query({}).then(tabs => {
        const selectedTabs = tabs.filter(tab => tab.title.includes(tabTitle));

        if (selectedTabs.length > 0) {
            selectedTabs.forEach((tab, index) => {
                const isActive = active && index === 0;
                browser.tabs.update(tab.id, { active: isActive }).then(() => {
                    browser.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: executeScript
                    }).catch(error => {
                        console.error("Error executing script:", error);
                    });
                });
            })
        } else {
            console.log('No tab found with the specified title.');
        }
    }).catch(error => {
        console.error("Error querying tabs:", error);
    });
}

async function showWelcomePage() {
    const result = await browser.storage.local.get("switch_to_troc_fute_after_logging_into_vinted");
    const activeTab = result["switch_to_troc_fute_after_logging_into_vinted"] || false;
    findTabAndExecuteScript(TAB_TITLE, () => {
        return new Promise((resolve) => {
            const extWelcomeBtn = document.querySelector('#extWelcomeBtn');
            if (extWelcomeBtn) {
                extWelcomeBtn.click()
            }
            resolve(true)
        });
    }, activeTab);
}

function deleteVintedCookie() {
    const cookieDetails = [
        {
            url: VINTED_URLS.baseUrl,
            name: "_vinted_fr_session"
        },
        {
            url: VINTED_URLS.baseUrl,
            name: "access_token_web"
        },
        {
            url: VINTED_URLS.baseUrl,
            name: "refresh_token_web"
        },
        {
            url: VINTED_URLS.baseUrl,
            name: "v_uid"
        }
    ];

    cookieDetails.forEach(cookie => {
        browser.cookies.remove(cookie)
            .then((deletedCookie) => {
                if (deletedCookie) {
                    //console.log("Cookie deleted:", deletedCookie);
                } else {
                    // console.log("Cookie not found.");
                }
            })
            .catch((error) => {
                console.error("Error deleting cookie:", error);
            });
    })
    browser.storage.local.remove(VINTED_PASSPORT_KEY);
}

function getDeviceId() {
    let deviceId = localStorage.getItem('leTrocFuteDeviceId');
    if (!deviceId) {
        localStorage.setItem('leTrocFuteDeviceId', generateUUIDv4());
        deviceId = localStorage.getItem('leTrocFuteDeviceId');
    }
    return deviceId;
}

function interceptRequest(url, method, callback) {
    browser.webRequest.onBeforeRequest.addListener(
        (details) => {
            if (details.url.includes(url) && details.method === method) {
                let filter = browser.webRequest.filterResponseData(details.requestId);
                let decoder = new TextDecoder("utf-8");

                filter.ondata = (event) => {
                    let str = decoder.decode(event.data, { stream: true });
                    try {
                        let jsonResponse = JSON.parse(str);
                        callback(jsonResponse);
                    } catch (e) {
                        console.error("Failed to parse JSON response: ", e);
                    }

                    try {
                        filter.write(event.data);
                    } catch (e) {
                        console.error(e);
                    }
                };

                filter.onstop = (event) => {
                    filter.close();
                };
            }
        },
        { urls: [url + '*'] },
        ["blocking"]
    );
}

// Function to update the cookie
function updateDatadomeCookie(cookieValue) {
    browser.cookies.get({ url: VINTED_URLS.baseUrl, name: 'datadome' }).then((cookie) => {
        if (cookie) {
            browser.cookies.set({
                url: VINTED_URLS.baseUrl,
                name: 'datadome',
                value: cookieValue,
                domain: ".vinted.fr",
                path: cookie.path,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
                sameSite: cookie.sameSite
            }).then(() => {
                console.log('Datadome cookie updated successfully.');
            }).catch((error) => {
                console.error('Error updating datadome cookie:', error);
            });
        } else {
            console.log('Datadome cookie not found.');
        }
    }).catch((error) => {
        console.error('Error retrieving datadome cookie:', error);
    });
}

/* ************************** BROWSER LISTENER ******************************/

//Message listener
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_DEVICE_ID') {
        const value = getDeviceId();
        sendResponse(value);
    } else if (message.type === 'GET_VINTED_COOKIES') {
        const value = getVintedCookies();
        sendResponse(value);
    } else if (message.type === 'DISCONNECT_VINTED') {
        sendResponse(true)
        deleteVintedCookie();
    }
    return true;
});

//Port listener
browser.runtime.onConnect.addListener((port) => {
    const sendResponse = (message) => {
        port.postMessage(message);
    };

    const handleError = (error, uuid) => {
        sendResponse({
            error: error.message || 'An error occurred during the request.',
            uuid
        });
    };

    const handleRequest = async (request, uuid) => {
        try {
            let response;
            if (request.type === 'HTTP_REQUEST') {
                const { headers, method, payload, url, operationName } = request;
                response = await makeHttpRequest2(headers, method, payload, url, operationName);
                sendResponse({ results: response, operationName, uuid });
            } else if (request.type === 'GET_PASSPORT') {
                const responseFromStorage = await browser.storage.local.get(VINTED_PASSPORT_KEY);
                if (!responseFromStorage?.vintedPassport) {
                    throw new Error('No passport found');
                }
                sendResponse({ results: responseFromStorage.vintedPassport, uuid });
            } else if (request.type === 'DISCONNECT_VINTED') {
                await browser.storage.local.remove(VINTED_PASSPORT_KEY);
                sendResponse({ results: true, uuid });
            }
        } catch (error) {
            handleError(error, uuid);
        }
    };

    port.onMessage.addListener((request) => {
        const { uuid } = request;
        handleRequest(request, uuid);
    });

    port.onDisconnect.addListener(() => {
        // console.log('Disconnected from content script');
    });
});


//Add referer
browser.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        let refererExists = details.requestHeaders.some(header => header.name.toLowerCase() === "referer");

        if (!refererExists) {
            details.requestHeaders.push({ name: "Referer", value: "www.vinted.fr" });
        }

        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["*://*.vinted.fr/*"] },
    ["blocking", "requestHeaders"]
);

//get request headers
browser.webRequest.onBeforeSendHeaders.addListener(
    async (details) => {
        if (
            details.url === VINTED_URLS.login &&
            details.method === "POST"
        ) {

            const requestHeaders = parseNameValue(details.requestHeaders);
            browser.storage.local.set({ vintedPassport: { ...requestHeaders } });
        }
    },
    { urls: [VINTED_URLS.login] },
    ["blocking", "requestHeaders"]
);

//get access_token
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        if (
            details.url === VINTED_URLS.login &&
            details.method === "POST"
        ) {
            let filter = browser.webRequest.filterResponseData(details.requestId);
            let decoder = new TextDecoder("utf-8");
            let encoder = new TextEncoder();

            filter.ondata = (event) => {
                let str = decoder.decode(event.data, { stream: true });

                try {
                    let jsonResponse = JSON.parse(str);
                    let accessToken = jsonResponse.access_token;
                    let refreshToken = jsonResponse.refresh_token;
                    const headers = {
                        Authorization: `Bearer ${accessToken}`
                    }

                    browser.storage.local.get(VINTED_PASSPORT_KEY).then((result) => {
                        let vintedPassport = { ...headers };
                        if (result?.vintedPassport) {
                            vintedPassport = { ...result?.vintedPassport, ...headers }
                        }
                        browser.storage.local.set({ vintedPassport });
                    });

                    //*****get cookies *****/
                    setTimeout(async () => {
                        if(accessToken){
                            const cookies = await getCookiesForDomains([".vinted.fr", "www.vinted.fr", ".www.vinted.fr"]);
                            let Cookie = {};
                            cookies.forEach(cookie => {
                                if (cookie.cookies && Array.isArray(cookie.cookies)) {
                                    Cookie = { ...Cookie, ...parseNameValue(cookie.cookies) };
                                }
                            })

                            browser.storage.local.get(VINTED_PASSPORT_KEY).then((result) => {
                                let vintedPassport = { Cookie }
                                if (result?.vintedPassport) {
                                    vintedPassport = { ...result?.vintedPassport, Cookie }
                                }
                                browser.storage.local.set({ vintedPassport });
                                showWelcomePage();
                            });
                        }
                    }, 2000);
                } catch (e) {
                    console.error("Failed to parse JSON response: ", e);
                }

                try {
                    filter.write(event.data);
                } catch (e) {
                    console.error(e);
                }
            };

            filter.onstop = (event) => {
                filter.close();
            };
        }
    },
    { urls: [VINTED_URLS.login] },
    ["blocking"]
);

//getCaptchaResult and update cookies
interceptRequest("https://geo.captcha-delivery.com/captcha/check", "GET", (jsonResponse) => {
    const cookieString = jsonResponse?.cookie;
    const cookieObject = {};
    if (cookieString) {
        cookieString?.split('; ').forEach(cookiePart => {
            const [key, value] = cookiePart.split('=');
            if (key === 'datadome') {
                cookieObject[key] = value;
            }
        });
    }

    browser.storage.local.get(VINTED_PASSPORT_KEY).then((result) => {
        if (result?.vintedPassport?.Cookie && cookieObject?.datadome) {
            result.vintedPassport.Cookie.datadome = cookieObject?.datadome;
        }

        browser.storage.local.set({
            [VINTED_PASSPORT_KEY]: result.vintedPassport
        }).then(() => {
            console.log('Datadome updated successfully');
        }).catch((error) => {
            console.error('Error updating datadome:', error);
        });
    });

    if(cookieObject?.datadome){
        findTabAndExecuteScript(TAB_TITLE, () => {
            return new Promise((resolve) => {
                localStorage.setItem('isSolvedCaptcha', true);
                resolve(true)
            });
        }, false);
        updateDatadomeCookie(cookieObject?.datadome);
    }
});

//disconnect from vinted page
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        if (details.url.includes(VINTED_URLS.logout)) {
            browser.storage.local.remove(VINTED_PASSPORT_KEY);
            findTabAndExecuteScript(TAB_TITLE, () => {
                return new Promise((resolve) => {
                    const lougoutVintedBtn = document.querySelector('#lougoutVinted');
                    if (lougoutVintedBtn) {
                        lougoutVintedBtn.click();
                    }
                    resolve(true)
                });
            }, false);
        }
    },
    { urls: [VINTED_URLS.logout] },
    ["blocking"]
);

//get cookies
/*browser.cookies.onChanged.addListener(async (changeInfo) => {
    const domain = changeInfo?.cookie?.domain;

    if (domain?.includes('vinted.fr') && changeInfo?.cookie?.name === 'access_token_web') {
        console.log(changeInfo,"changeInfo?.cookie")
        const cookies = await getCookiesForDomains([".vinted.fr", "www.vinted.fr", ".www.vinted.fr"]);
        let Cookie = {};
        cookies.forEach(cookie => {
            if (cookie.cookies && Array.isArray(cookie.cookies)) {
                Cookie = { ...Cookie, ...parseNameValue(cookie.cookies) };
            }
        })

        browser.storage.local.get(VINTED_PASSPORT_KEY).then((result) => {
            let vintedPassport = { Cookie }
            if (result?.vintedPassport) {
                vintedPassport = { ...result?.vintedPassport, Cookie }
            }
            browser.storage.local.set({ vintedPassport });
            showWelcomePage();
        });
    }
});*/