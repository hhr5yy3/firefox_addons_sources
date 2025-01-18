const getOrdersFromLocal = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("orders", (data) => {
            if (!data?.orders) {
                resolve(false);
            }

            resolve(data.orders);
        });
    });
};

const storeOrdersToLocal = async (orders) => {
    return new Promise((resolve, reject) => {
        console.log("Store orders ", orders);
        chrome.storage.local.set({ orders }, () => {
            if (chrome.runtime.lastError) reject();

            resolve();
        });
    });
};

const removeOrdersFromLocal = async () => {
    return new Promise((resolve, reject) => {
        var confirmation = confirm(
            "Are you sure you want to delete all sync orders from local storage?"
        );
    
        if (confirmation) {
            chrome.storage.local.remove("orders", () => {
                if (chrome.runtime.lastError) {
                    console.log("removeSync ", chrome.runtime.lastError);
                    alert('Something went wrong.')
                    reject();
                }
    
                $(".number-of-orders").text(0);
                $(".ali-bill-get-orders").addClass('pulsing-shadow');
                alert('Orders successfully deleted from storage.');
                resolve();
            });
        }
    });
};

const getSingleInvoiceOptions = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("singleInvoiceOptions", (data) => {
            if (!data?.singleInvoiceOptions) {
                resolve(false);
            }

            resolve(data.singleInvoiceOptions);
        });
    });
};

const compareScrapedOrdersWithLocalStorageOrdersAndModifyStorage = async (
    scrapedOrders
) => {
    if (!scrapedOrders?.length) return false;

    let newOrders = [];
    let modifiedOrders = [];

    let clonedLocalOrders = await getOrdersFromLocal();

    if (clonedLocalOrders) {
        scrapedOrders.forEach((newOrder) => {
            let flagNotFound = true;

            clonedLocalOrders.forEach(
                (localStorageOrder, localStorageItemIndex) => {
                    if (
                        newOrder?.orderId == localStorageOrder.orderId &&
                        localStorageOrder?.orderId &&
                        newOrder?.orderId &&
                        newOrder?.status !== localStorageOrder.status
                    )
                        modifiedOrders.push({
                            index: localStorageItemIndex,
                            order: newOrder,
                        });

                    if (
                        newOrder?.orderId == localStorageOrder?.orderId &&
                        localStorageOrder?.orderId &&
                        newOrder?.orderId
                    )
                        flagNotFound = false;
                }
            );

            if (flagNotFound) newOrders.push(newOrder);
        });

        // Mehanizam za modifikovanje postojeceg order array

        // Delete the order that is modified

        try {
            console.log("modifiedOrders ", modifiedOrders);
            console.log("newOrders ", newOrders);

            if (modifiedOrders?.length) {
                modifiedOrders.forEach((item) => {
                    // Brisanje modifikovanog order-a
                    clonedLocalOrders.splice(item.index, 1);
                    clonedLocalOrders.push(item.order);
                });
            }

            if (newOrders?.length) {
                clonedLocalOrders.push(...newOrders);
            }

            if (
                !modifiedOrders?.length &&
                !newOrders?.length &&
                clonedLocalOrders?.length > 0
            )
                return false;

            console.log("clonedLocalOrders before saving ", clonedLocalOrders);

            await storeOrdersToLocal(clonedLocalOrders);

            return true;
        } catch (exception) {
            console.log(
                "Exception while comparing orders with local storage orders ",
                exception
            );
            return false;
        }
    } else {
        try {
            await storeOrdersToLocal(scrapedOrders);
            return true;
        } catch (error) {
            console.log("Error while saving the order to local ", error);
            return false;
        }
    }
};

const changeOneOrderFromStorage = async (order) => {
    try {
        let orders = await getOrdersFromLocal();

        console.log(
            "Pre promene orders niz ",
            JSON.parse(JSON.stringify(orders))
        );
        console.log("Pre promene order ", order);

        orders.forEach((orderFromLocal) => {
            if (orderFromLocal?.orderId == order?.orderId && order?.orderId) {
                orderFromLocal = updateOrderWithRawData(orderFromLocal, order);
            }
        });

        console.log("Novi orders niz ", JSON.parse(JSON.stringify(orders)));

        await storeOrdersToLocal(orders);

        return true;
    } catch (error) {
        console.log("Error ", error);
        return false;
    }
};

const updateOrderWithRawData = (order, data) => {
    if (data.contact) {
        data.contact?.name ? (order.contact.name = data.contact.name) : null;
        data.contact?.address1
            ? (order.contact.address1 = data.contact.address1)
            : null;
        data.contact?.address2
            ? (order.contact.address2 = data.contact.address2)
            : null;
        data.contact?.city ? (order.contact.city = data.contact.city) : null;
        data.contact?.zip ? (order.contact.zip = data.contact.zip) : null;
        data.contact?.province
            ? (order.contact.province = data.contact.province)
            : null;
        data.contact?.country
            ? (order.contact.country = data.contact.country)
            : null;
        data.contact?.phone ? (order.contact.phone = data.contact.phone) : null;
        data.contact?.tel ? (order.contact.tel = data.contact.tel) : null;
        data.contact?.specific
            ? (order.contact.specific = data.contact.specific)
            : null;
    }

    if (data.orderDatePrintFormat) {
        order.orderDatePrintFormat = data?.orderDatePrintFormat
            ? data.orderDatePrintFormat
            : null;
        let _orderDate = Date.parse(data.orderDatePrintFormat);
        order.orderDateRaw = _orderDate ? _orderDate : null;
    }

    if (data.total) {
        order.total = {
            orderAmount: data?.total?.orderAmount
                ? data.total.orderAmount
                : order.total.orderAmount,
            price: data?.total?.price ? data.total.price : null,
            euTax: data?.total.euTax ? data.total.euTax : null,
            tax: data?.total.tax ? data.total.tax : null,
            shippingCost: data?.total?.shippingCost
                ? data.total.shippingCost
                : null,
            adjustPrice: data?.total?.adjustPrice
                ? data.total.adjustPrice
                : null,
            discount: data?.total?.discount ? data.total.discount : null,
        };
    }

    data?.currency ? (order.currency = data.currency) : null;

    order.trackingNumber = data?.trackingNumber ? data.trackingNumber : null;

    data?.refund ? (order.refund = data.refund) : false;
    data?.refundOrders ? (order.refundOrders = data.refundOrders) : null;

    data?.status ? (order.status = data.status) : null;
    data?.paymentDetails ? (order.paymentDetails = data.paymentDetails) : null;
    data?.trackingNumber ? (order.trackingNumber = data.trackingNumber) : null;

    if (data?.items?.length) {
        order.items = [];
        order.items.push(...data.items);
    }

    data.rawHtml ? (order.rawHtml = data.rawHtml) : null;

    return order;
};

updateOrderWithLogisticsDataAndStore = async (data, orderId) => {
    try {
        if (!orderId) throw new Error("Can not get orderId");

        let orders = await getOrdersFromLocal();

        orders.forEach((orderFromLocal) => {
            if (orderFromLocal?.orderId == orderId) {
                orderFromLocal = updateOnlyLogisticsData(orderFromLocal, data);
                console.log("orderFromLocal ", orderFromLocal);
            }
        });

        await storeOrdersToLocal(orders);

        return true;
    } catch (error) {
        console.log("Error ", error);
        return false;
    }
};

updateOnlyLogisticsData = (order, data) => {
    order.logisticsInfo = data?.logisticsInfo ? data.logisticsInfo : "false";
    order.trackingNumber = data?.trackingNumber
        ? data?.trackingNumber
        : "false";

    return order;
};

const getProductFromLocal = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("tempProduct", data => {
            if(!data.tempProduct) resolve(false);

            resolve(data.tempProduct);
        })
    })
}

const getFakeOrdersFromLocal = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("fakeOrders", data => {
            if(!data.fakeOrders) resolve(false);

            resolve(data.fakeOrders);
        })
    })
}

const updateOrdersWithImportedData = async (importedOrders) => {
    let localOrders = await getOrdersFromLocal();
    if (!localOrders) {
        alert('No orders in local storage.');
        return;
    }

    importedOrders.forEach((importedOrder) => {
        let orderNotFound = true;

        localOrders.forEach((localStorageOrder, index) => {
            if (importedOrder.orderId == localStorageOrder.orderId) {
                if (
                    importedOrder.contact.name == 'name' ||
                    importedOrder.contact.address1 == 'address1'
                ) {
                    importedOrder.contact = localStorageOrder.contact;
                }
                localOrders[index] = importedOrder;

                orderNotFound = false;
            }
        });

        if (orderNotFound) {
            localOrders.push(importedOrder);
        }
    });

    console.log('Updated orders:', localOrders);
    await storeOrdersToLocal(localOrders);
    alert('Orders successfully updated.');

    return;
}