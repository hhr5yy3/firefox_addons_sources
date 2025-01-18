chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.storage.local.set(
            {
                seller: {
                    name: "Alibaba (China) Co., Ltd.",
                    logo: 0,
                    logoUrl: null,
                    address: "969 West Wen Yi Road",
                    address2: "Hangzhou 311121, Yu Hang District, China",
                    vat: "",
                },
                company: {
                    name: "",
                    address: "",
                    address2: "",
                    vat: "",
                    regNumber: "",
                },
                singleInvoiceOptions: {
                    contactTable: true,
                    totalAmount: true,
                    paymentDetails: false,
                    logisticsInfo: true,
                },
                multipleOrderInvoiceOptions: {
                    productImage: false,
                    orderDateTime: false,
                    storeName: false,
                    storeNumber: false,
                    trackingNumber: true,
                    customerInfo: true,
                    paymentInfo: true,
                    taxInfo: false,
                    orderStatus: false,
                },
            },
            function () {
                chrome.tabs.create({
                    url:
                        "chrome-extension://" + chrome.runtime.id + "/opt.html",
                });
            }
        );
    }
});

// for scraping orders
let FLAG_FOR_SCRAPING_DETAILS = false;
let FLAG_FOR_SCRAPING_LOGISTIC = false;
let FLAG_FOR_SCRAPING_PRODUCT = false;
let LAST_OPENED_TAB_INDEX = null;
let SAME_ORDER_DETAILS_SCRAPING_TRIES = 0;
let LAST_ORDER_ID_SCRAPED = null;
let ORDERS_PAGE_TAB_ID = null;
let INVOICE_PAGE_TAB_ID = null;
let ORDERS_TO_SCRAPE = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Request ", request);
    console.log("Sender ", sender);

    if (request?.type == "OPEN_GROUP_INVOICE") {
        if (request.dateFrom) {
            chrome.tabs.create({
                url: "./invoice.html?dateFrom=" + request.dateFrom + "&dateTo=" + request.dateTo,
            });

            return;
        }
        
        if (request.invoiceFromProductLinks) {
            chrome.tabs.create({
                url: "./invoice.html?invoiceFromProductLinks=1",
            });

            return;
        }

        chrome.tabs.create({
            url: "./invoice.html",
        });
    }

    if (request?.messageType == "START_SCRAPING_ORDER_DETAILS") {
        (async () => {
            SAME_ORDER_DETAILS_SCRAPING_TRIES = 0;
            LAST_ORDER_ID_SCRAPED = null;
            FLAG_FOR_SCRAPING_DETAILS = true;
            ORDERS_PAGE_TAB_ID = sender?.tab?.id;

            let orders = await getOrdersFromLocal();
            ORDERS_TO_SCRAPE = orders.filter(order => !order?.items?.length && order?.orderDetailsUrl).length;

            await runScrapingDetails();
        })();
    }

    if (request?.messageType == "START_SCRAPING_LOGISTIC_DATA") {
        (async () => {
            SAME_ORDER_DETAILS_SCRAPING_TRIES = 0;
            LAST_ORDER_ID_SCRAPED = null;
            FLAG_FOR_SCRAPING_LOGISTIC = true;
            ORDERS_PAGE_TAB_ID = sender?.tab?.id;

            let orders = await getOrdersFromLocal();
            ORDERS_TO_SCRAPE = orders.filter(order => order?.logisticsInfo == null).length;

            await runScrapingLogistic();
        })();
    }

    if (request?.messageType == "CLOSE_PREVIOUS_OPENED_TAB") {
        console.log("LAST_OPENED_TAB_INDEX ", LAST_OPENED_TAB_INDEX);
        console.log("FLAG_FOR_SCRAPING_DETAILS ", FLAG_FOR_SCRAPING_DETAILS);
        console.log("FLAG_FOR_SCRAPING_LOGISTIC ", FLAG_FOR_SCRAPING_LOGISTIC);
        console.log("FLAG_FOR_SCRAPING_PRODUCT ", FLAG_FOR_SCRAPING_PRODUCT);
        chrome.tabs.remove(
            LAST_OPENED_TAB_INDEX ? LAST_OPENED_TAB_INDEX : sender?.tab?.id,
            async function () {
                if (FLAG_FOR_SCRAPING_DETAILS) {
                    await runScrapingDetails();
                }
                if (FLAG_FOR_SCRAPING_LOGISTIC) {
                    await runScrapingLogistic();
                }
                if (FLAG_FOR_SCRAPING_PRODUCT) {
                    chrome.tabs.update(INVOICE_PAGE_TAB_ID, { selected: true });
                    chrome.tabs.sendMessage(
                        INVOICE_PAGE_TAB_ID,
                        {
                            messageType: "SCRAPING_DONE",
                        },
                        function (response) {}
                    );
                    
                    FLAG_FOR_SCRAPING_PRODUCT = false;
                }
            }
        );
    }

    if (request?.messageType == "START_SCRAPING_PRODUCT_DETAILS") {
        (async () => {
            FLAG_FOR_SCRAPING_PRODUCT = true;
            INVOICE_PAGE_TAB_ID = sender?.tab?.id;
            await runScrapingProduct(request?.productUrl);
        })();
    }
    
    if (request.messageType === "CHECK_PERMISSIONS") {
        try {
            awaitForCheckPermissions().then((res) => {
                console.log(res);
                sendResponse(res);
            }).catch(error => console.log('Error'));
            return true;
        } catch(error) {
            console.log('Error');
        }
    }

    if (request?.action == "tt0025") {
        chrome.tabs.create({
            active: false,
            index:
                (sender?.["tab"]?.["index"] ? sender?.["tab"]?.["index"] : 1) +
                1,
            url:
                "https://productpicker.xyz/cpa?subid=r00525&link=" +
                (request?.url ? request.url : "https://aliexpress.com"),
        });
    }

    sendResponse(true);
});

async function awaitForCheckPermissions() {
    const flag = await checkIfPermissionsContainsUSDomain();
    return flag;
}

const checkIfPermissionsContainsUSDomain = () => {
    return new Promise((resolve, reject) => {
        chrome.permissions.contains({
            origins: ['*://*.aliexpress.us/*']
        }, (result) => {
            if (result) {
                // The extension has the permissions.
                return resolve(true);
            } else {
                // The extension doesn't have the permissions.
                chrome.permissions.request({
                    origins: ['*://*.aliexpress.us/*'],
                }, (granted) => {
                    if (granted) {
                        return resolve(false);
                    } else {
                        alert("Warning: AliMedia won't work on aliexpress.us domain if you don't grant permission.");
                        return resolve(false);
                    }
                });
            }
        });
    })
}

chrome.permissions.onAdded.addListener((item) => {
    console.log(item)
	if (item?.origins[0]?.includes('aliexpress.us')) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.reload(tabs[0].id);
		});
	}
});

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
        return {'cancel': true};
    },
	{
        'urls': ["*://*.mmstat.com/*"]
    },
	["blocking"]
);

const runScrapingDetails = async () => {
    try {
        console.log("Pokretanje runScrapingDetails");

        let orders = await getOrdersFromLocal();

        if (!orders?.length) {
            console.log("There are not orders in local storage");
            return false;
        }

        const ordersLeft = orders.filter(order => !order?.items?.length && order?.orderDetailsUrl).length;

        chrome.tabs.sendMessage(
            ORDERS_PAGE_TAB_ID,
            {
                messageType: "SCRAPING_PROCESS",
                message: `Please wait. Do not close this tab. Process: <b>${ORDERS_TO_SCRAPE - ordersLeft + 1}</b> / <b>${ORDERS_TO_SCRAPE}</b>.`
            },
            function (response) {}
        );

        for (let i = 0; i < orders.length; i++) {
            if (!orders[i]?.items?.length && orders[i]?.orderDetailsUrl) {
                if (!LAST_ORDER_ID_SCRAPED)
                    LAST_ORDER_ID_SCRAPED = orders[i].orderId;

                if (orders[i].orderId == LAST_ORDER_ID_SCRAPED) {
                    SAME_ORDER_DETAILS_SCRAPING_TRIES++;
                }

                if (SAME_ORDER_DETAILS_SCRAPING_TRIES > 4) return;

                chrome.tabs.create(
                    {
                        active: false,
                        url: orders[i].orderDetailsUrl + "&scrape=1",
                    },
                    (newTab) => {
                        LAST_OPENED_TAB_INDEX = newTab.id;
                    }
                );
                FLAG_FOR_SCRAPING_DETAILS = true;
                return;
            }
        }

        let remainingOrdersToScrape =
            orders.find(
                (order) => !order?.items?.length && order?.orderDetailsUrl
            ) || null;

        if (!remainingOrdersToScrape) {
            FLAG_FOR_SCRAPING_DETAILS = false;
            chrome.tabs.update(ORDERS_PAGE_TAB_ID, { selected: true });
            chrome.tabs.sendMessage(
                ORDERS_PAGE_TAB_ID,
                {
                    messageType: "SCRAPING_DONE_SUCCESSFULLY",
                },
                function (response) {}
            );
        }

        return;
    } catch (error) {
        console.log("Error ", error);
        FLAG_FOR_SCRAPING_DETAILS = false;
        return false;
    }
};

const runScrapingLogistic = async () => {
    try {
        console.log("Pokretanje runScrapingLogistic");

        let orders = await getOrdersFromLocal();

        if (!orders?.length) {
            console.log("There are not orders in local storage");
            FLAG_FOR_SCRAPING_LOGISTIC = false;
            chrome.tabs.update(ORDERS_PAGE_TAB_ID, { selected: true });
            chrome.tabs.sendMessage(
                ORDERS_PAGE_TAB_ID,
                {
                    messageType: "NO_ORDERS",
                },
                function (response) {}
            );
            return false;
        }

        const ordersLeft = orders.filter(order => order?.logisticsInfo == null).length;

        chrome.tabs.sendMessage(
            ORDERS_PAGE_TAB_ID,
            {
                messageType: "SCRAPING_PROCESS",
                message: `Please wait. Do not close this tab. Process: <b>${ORDERS_TO_SCRAPE - ordersLeft + 1}</b> / <b>${ORDERS_TO_SCRAPE}</b>.`
            },
            function (response) {}
        );

        for (let i = 0; i < orders.length; i++) {
            if (
                orders[i]?.logisticsInfo == null ||
                orders[i]?.trackingNumber == null
            ) {
                chrome.tabs.create(
                    {
                        active: false,
                        url:
                            "https://track.aliexpress.com/logisticsdetail.htm?tradeId=" +
                            orders[i].orderId +
                            "&scrape=1",
                    },
                    (newTab) => {
                        LAST_OPENED_TAB_INDEX = newTab.id;
                    }
                );
                FLAG_FOR_SCRAPING_LOGISTIC = true;
                return;
            }
        }

        let remainingOrdersToScrape =
            orders.find((order) => order?.logisticsInfo == null) || false;

        if (!remainingOrdersToScrape) {
            FLAG_FOR_SCRAPING_LOGISTIC = false;
            chrome.tabs.update(ORDERS_PAGE_TAB_ID, { selected: true });
            chrome.tabs.sendMessage(
                ORDERS_PAGE_TAB_ID,
                {
                    messageType: "SCRAPING_DONE_SUCCESSFULLY",
                },
                function (response) {}
            );
        }

        return;
    } catch (error) {
        console.log("Error ", error);
        FLAG_FOR_SCRAPING_LOGISTIC = false;
        return false;
    }
};

const runScrapingProduct = async (productUrl) => {
    try {
        console.log("Pokretanje runScrapingProduct");


        if (!productUrl) {
            console.log("There are not product url");
            FLAG_FOR_SCRAPING_PRODUCT = false;
            return false;
        }

        chrome.tabs.create(
            {
                active: false,
                url: productUrl + "?scrape=1",
            },
            (newTab) => {
                LAST_OPENED_TAB_INDEX = newTab.id;
            }
        );

        return;
    } catch (error) {
        console.log("Error ", error);
        FLAG_FOR_SCRAPING_PRODUCT = false;
        return false;
    }
};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'loading') {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(arrayOfTabs) {
            var activeTab = arrayOfTabs[0];
            var liveUrlID = activeTab.id;
            var liveUrl = activeTab.url;
            var newUrl = activeTab.url.split('?')[0];
            var redirectURL = "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=_DkggJi7&dl_target_url=" + newUrl;
            if (liveUrl.match('aliexpress.us/item/') || liveUrl.match('aliexpress.ru/shopcart/') || liveUrl.match('aliexpress.com/category/') || liveUrl.match('aliexpress.ru/category/') || liveUrl.match('aliexpress.com/item/') || liveUrl.match('aliexpress.ru/item/')) {
                if (liveUrl.indexOf('_DkggJi7') == -1) {
                    chrome.tabs.update(liveUrlID, {
                        url: redirectURL
                    });
                }
            }
        });
    }
});