$(document).ready(() => {
    console.log("test");

    (async () => {
        if (location.href.includes("p/order/index")) {
            let elementShown = await waitForItemToShow(".order-wrap");
            const orders = await getOrdersFromLocal() || [];
            if (elementShown) {
                $(".order-wrap").prepend(optionsMenuNew(orders.length));
                $("body").append(modal());
                $(".close-modal").click(hideModal);
                appendSingleInvoiceBtn();

                if (!orders.length) {
                    $(".ali-bill-get-orders").addClass('pulsing-shadow');
                };
            };
            $(".ali-bill-get-orders").click(async () => {
                const flag = await checkPermissionsForUSDomain();
                if (!flag) return;

                syncOrders();
            });
            $(".ali-bill-get-logistics").click(async () => {
                const flag = await checkPermissionsForUSDomain();
                if (!flag) return;

                syncLogisticData();
            });
            $(".ali-bill-generate-invoice").click(generateInvoice);
            $(".ali-bill-delete-orders").click(removeOrdersFromLocal);
            $(".generate-invoice-from-product-links").click(generateInvoiceFromProductLinks);
        }
    })();
});

const checkPermissionsForUSDomain = () => {
    return new Promise((resolve, reject) => {
        if (location.href.includes('aliexpress.us')) {
            chrome.runtime.sendMessage({
                messageType: "CHECK_PERMISSIONS",
            }, async (response) => {
                resolve(response);
            });
        } else {
            return resolve(true);
        }
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.messageType == "SCRAPING_DONE_SUCCESSFULLY") {
        (async () => {
            changeModalMessage({
                message: "Sync orders finished successfully.",
                openInvoice: true
            });

            const orders = await getOrdersFromLocal() || [];

            $(".number-of-orders").text(orders.length);

            $(".ali-bill-get-orders").removeClass('pulsing-shadow');
            if (!orders.length) {
                $(".ali-bill-get-orders").addClass('pulsing-shadow');
            };
        })();
    }

    if (request.messageType == "SCRAPING_PROCESS") {
        changeModalMessage({
            message: request.message,
        });
    }

    if (request.messageType == "NO_ORDERS") {
        changeModalMessage({
            message: "There are not orders in local storage.",
        });
    }

    sendResponse(true);
});

const syncOrders = () => {
    showModal();
    changeModalMessage({
        message: "Please wait. Do not close this tab.",
    });

    loadMoreOrders();
};

const loadMoreOrders = async () => {
    let pickedDateRawFrom = $("#ali-bill-date-from").val();
    let pickedDateFrom = pickedDateRawFrom.length
        ? new Date(new Date(pickedDateRawFrom).toDateString())
        : null;
    let pickedDateRawTo = $('#ali-bill-date-to').val();
    let pickedDateTo = pickedDateRawTo.length
        ? new Date(new Date(pickedDateRawTo).toDateString())
        : null;

    let flagDate = dateRangeReached(pickedDateFrom);
    console.log("Range reached: ", flagDate);

    if (flagDate) {
        filterAndSaveOrders(pickedDateFrom, pickedDateTo);
        return;
    }
    console.log("prolazi");

    let flagButton = await waitForItemToShow($(".order-more > button"));

    if (!flagButton) filterAndSaveOrders(pickedDateFrom, pickedDateTo);
    if (flagButton) {
        $(".order-more > button").click();
        await wait(1000);
        loadMoreOrders();
        $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    }
    return;
};

const dateRangeReached = (pickedDateFrom) => {
    if (!pickedDateFrom) {
        return false;
    }
    let lastOrderDate = null;
    const e_orders = $(".order-item");
    if (!e_orders.length) {
        return false;
    }
    let e_lastOrder = e_orders.toArray().pop();
    let e_lastOrderDate = $(e_lastOrder).find(
        "div.order-item-header-right-info > div:first-child"
    );
    if (e_lastOrderDate)
        lastOrderDate = new Date(
            translateDate(e_lastOrderDate.text().split(":")[1].trim())
        );
    console.log("Date of last loaded order: ", lastOrderDate);

    return pickedDateFrom > lastOrderDate;
};

const filterAndSaveOrders = (pickedDateFrom, pickedDateTo) => {
    let orders = getOrders();

    if (!orders.length) return false;

    if (pickedDateFrom)
        orders = orders.filter(
            (order) => new Date(order?.orderDatePrintFormat) >= pickedDateFrom
        );

    if (pickedDateTo)
        orders = orders.filter(
            (order) => new Date(order?.orderDatePrintFormat) <= pickedDateTo
        );

    if (!orders.length) {
        showModal();
        changeModalMessage({
            message: 'There are no orders in selected date range.',
        });

        return false;
    }

    console.log(orders);
    saveOrders(orders, false);
};

const getOrders = () => {
    let orders = [];

    const e_orders = $(".order-item");

    if (!e_orders.length) {
        return false;
    }

    e_orders.toArray().forEach((e_order) => {
        const order = {
            total: {},
            items: [],
        };

        // scrape orders page:
        let e_orderId = $(e_order).find(
            "div.order-item-header-right-info > div:nth-child(2)"
        );
        if (e_orderId)
            order.orderId = Number(e_orderId.text().replace(/[^0-9]/g, ''));

        let e_orderDate = $(e_order).find(
            "div.order-item-header-right-info > div:first-child"
        );
        if (e_orderDate)
            order.orderDatePrintFormat = translateDate(
                e_orderDate.text().split(":")[1].trim()
            );

        let e_status = $(e_order).find(".order-item-header-status-text");
        if (e_status) order.status = e_status.text();

        let e_orderDetailsUrl = $(e_order).find(".order-item-header-right > a");
        if (e_orderDetailsUrl)
            order.orderDetailsUrl = e_orderDetailsUrl.attr("href");

        let e_seller = $(e_order).find(
            ".order-item-store-name > a > span:first-child"
        );
        if (e_seller) order.seller = e_seller.text().trim();

        let e_sellerContact = $(e_order).find(".order-item-store-name > a");
        if (e_sellerContact) {
            order.sellerContact = e_sellerContact.attr("href");
            if (e_sellerContact.attr("href").split("?")[0]) {
                let tmpSellerId = e_sellerContact
                    .attr("href")
                    .split("?")[0]
                    .split("/");

                if (tmpSellerId.length) {
                    order.sellerId = tmpSellerId[tmpSellerId.length - 1];
                }
            }
        }

        let e_totalPrice = $(e_order).find(
            ".order-item-content-opt-price-total"
        );
        if (e_totalPrice) {
            order.total.orderAmount = extractPriceFromString(
                e_totalPrice.text().trim()
            );

            const split_eTotalPrice = e_totalPrice.text().trim().split(':');
            order.currency = extractCurrencyFromPriceNew(
                split_eTotalPrice[split_eTotalPrice.length - 1]
            );
        }

        let newOrder = new Order(order);
        orders.push(newOrder);
    });

    return orders;
};

const saveOrders = async (orders) => {
    // Error handle
    if (!orders?.length) return false;

    try {
        let saveFlag =
            await compareScrapedOrdersWithLocalStorageOrdersAndModifyStorage(
                orders
            );

        console.log("Saving orders to local is successful => ", saveFlag);

        if (saveFlag) {
            chrome.runtime.sendMessage({
                messageType: "START_SCRAPING_ORDER_DETAILS",
            });
        } else {
            changeModalMessage({
                message:
                    "There are no new orders to scrape. Try filters to search more orders.",
            });
        }
    } catch (error) {
        console.log("Error ", error);
    }
};

const syncLogisticData = () => {
    showModal();
    changeModalMessage({
        message: "Please wait. Do not close this tab.",
    });

    chrome.runtime.sendMessage({
        messageType: "START_SCRAPING_LOGISTIC_DATA",
    });
};

const generateInvoice = async () => {
    const orders = await getOrdersFromLocal() || [];
    if (!orders.length) {
        alert('You must first click on "Get Orders".');
        return;
    }

    let pickedDateFrom = $("#ali-bill-date-from").val();
    let pickedDateTo = $("#ali-bill-date-to").val();
    chrome.runtime.sendMessage({
        type: "OPEN_GROUP_INVOICE",
        dateFrom: pickedDateFrom,
        dateTo: pickedDateTo,
    });
};

const generateInvoiceFromProductLinks = () => {
    chrome.runtime.sendMessage({
        type: "OPEN_GROUP_INVOICE",
        invoiceFromProductLinks: true
    });
};