$(document).ready(() => {
    // console.log("test");

    if (location.href.includes("scrape=1")) {
        $("body").append(modal());
        $(".close-modal").click(hideModal);
        showModal();
        changeModalMessage({
            message:
                "Do not close this tab. Please wait, it will close it self.",
        });

        (async () => {
            let flag = await waitForItemToShow(".order-wrap");
            if (flag) getOrderDetails();
        })();
    }

    if (location.href.includes("single-invoice=1")) {
        (async () => {
            let flag = await waitForItemToShow(".order-wrap");
            if (flag) makeSingleInvoice();
        })();
    }
});

const getOrderDetails = async () => {
    const order = {
        total: {},
        items: [],
        paymentDetails: [
            {
                dateReceived: null,
                paymentMethod: null,
                received: null,
                total: null,
            },
        ],
    };

    const e_orderDetails = $(".order-wrap");

    let e_cometIcon = $(e_orderDetails).find(".comet-icon-arrowdown");
    e_cometIcon.click();

    let e_orderId = $(e_orderDetails).find(
        "div.order-detail-info-item:nth-child(2) > .order-detail-info-content > .info-row:first-child"
    );
    if (e_orderId)
        order.orderId = Number(e_orderId.text().replace(/[^0-9]/g,''));

    let e_trackingNumber = $(e_orderDetails).find(
        ".order-logistics-item:first-child > .order-logistics-info > .order-logistics-info-content > .logistic-track > button.copy-track-num"
    );
    if (e_trackingNumber.length)
        order.trackingNumber = e_trackingNumber.attr("data-clipboard-text");

    let e_paymentMethod = $(e_orderDetails).find(
        ".order-detail-info > div.order-detail-info-item:nth-child(2) > div.order-detail-info-content > div.info-row:nth-child(3)"
    );
    if (e_paymentMethod.length) {
        order.paymentDetails[0].paymentMethod = e_paymentMethod
            .text()
            .split(":")[1]
            .trim();
    }

    order.contact = extractContactInfoNew($(".order-detail-info-item")[0]);
    order.items = getItemsNew($(".order-detail-item-content"));
    order.total = extractPricesNew($(".order-price > div.order-price-item"));
    order.total.euTax = await getVatTaxValue();
    console.log(order)
    saveOrder(order);
};

const saveOrder = async (order) => {
    // Error handle
    if (!order) return false;

    try {
        let saveFlag = await changeOneOrderFromStorage(order);

        console.log("Update order in local is successful => ", saveFlag);

        if (saveFlag) {
            chrome.runtime.sendMessage({
                messageType: "CLOSE_PREVIOUS_OPENED_TAB",
            });
        } else {
            changeModalMessage({
                message: "Error. Sync orders did not finished correctly.",
            });
        }
    } catch (error) {
        console.log("Error ", error);
    }
};

const extractContactInfoNew = (element) => {
    let e_contactContainer = $(element).find(".order-detail-info-content");

    if (e_contactContainer.length) {
        let e_name = $(e_contactContainer).find(".contact-info");
        let e_tel = null;
        let e_contactLineOne = null;
        let e_contactLineTwo = null;

        let e_divsFromContainer = $(e_contactContainer).find(
            "div:not(.contact-info)"
        );

        console.log("e_divsFromContainer length ", e_divsFromContainer.length);
        console.log("e_divsFromContainer ", e_divsFromContainer);

        if (e_divsFromContainer.length == 2) {
            e_tel = $(e_divsFromContainer.toArray()[0]);
            e_contactLineTwo = $(e_divsFromContainer.toArray()[1]);
        }

        if (e_divsFromContainer.length == 3) {
            e_tel = $(e_divsFromContainer.toArray()[0]);
            e_contactLineOne = $(e_divsFromContainer.toArray()[1]);
            e_contactLineTwo = $(e_divsFromContainer.toArray()[2]);
        }

        const name = e_name?.length ? $(e_name).text().trim() : null;
        const tel = e_tel?.length ? $(e_tel).text().trim() : null;

        const splitedLineOne = e_contactLineOne?.length
            ? $(e_contactLineOne).text().trim().split(",")
            : null;

        const splitedLineTwo = e_contactLineTwo?.length
            ? $(e_contactLineTwo).text().trim().split(",")
            : null;

        let address1 = null;
        let address2 = null;

        if (splitedLineOne?.length > 1) {
            address2 = splitedLineOne[splitedLineOne.length - 1].trim();
            address1 = splitedLineOne.slice(0, -1).join(",");
        }

        if (splitedLineOne?.length == 1) address1 = splitedLineOne[0];

        const city = splitedLineTwo[0] ? splitedLineTwo[0].trim() : null;
        const province = splitedLineTwo[1] ? splitedLineTwo[1].trim() : null;
        const country = splitedLineTwo[2] ? splitedLineTwo[2].trim() : null;
        const zip = splitedLineTwo[3] ? splitedLineTwo[3].trim() : null;

        const specific = `${name ? name : ""}, ${address1 ? address1 : ""}, ${
            address2 ? address2 : ""
        }, ${city ? city : ""}, ${province ? province : ""}, ${
            country ? country : ""
        }, ${zip ? zip : ""}`;

        return {
            name,
            address1,
            address2,
            city,
            province,
            country,
            tel,
            phone: null,
            zip,
            specific,
        };
    }

    return false;
};

const getItemsNew = (e_orderItems) => {
    if (!e_orderItems.length) return;

    let orderItems = [];

    e_orderItems.toArray().forEach((e_orderItem) => {
        orderItem = {};

        let e_productTitle = $(e_orderItem).find(".item-title > a");
        if (e_productTitle.length)
            orderItem.productTitle = e_productTitle.text().trim();

        let e_productUrl = $(e_orderItem).find(".item-title > a");
        if (e_productUrl.length)
            orderItem.productUrl = e_productUrl.attr("href");

        let e_productImageUrl = $(e_orderItem).find(
            "a.order-detail-item-content-img"
        );
        if (e_productImageUrl)
            orderItem.productImageUrl = e_productImageUrl
                .attr("style")
                .split('"')[1];

        let e_properties = $(e_orderItem).find(".item-sku-attr");
        if (e_properties) orderItem.properties = e_properties.text().trim();

        let e_pricePerUnit = $(e_orderItem).find(".item-price");
        if (e_pricePerUnit)
            orderItem.pricePerUnit = extractPriceFromString(
                e_pricePerUnit.text().trim().split("x")[0]
            );

        let e_quantity = $(e_orderItem).find(".item-price");
        if (e_quantity)
            orderItem.quantity = Number(e_quantity.text().trim().split("x")[1]);

        orderItems.push(orderItem);
    });

    return orderItems;
};

const extractPricesNew = (elements) => {
    if (!elements.length) return false;

    let total = {
        adjustPrice: null,
        discount: null,
        euTax: null,
        orderAmount: null,
        price: null,
        shippingCost: null,
        tax: null,
    };
    let prices = [];

    let elementsArray = elements.toArray();

    let checkVATIncluded = $(elementsArray[elements.length - 1]).find(
        "span.right-col > span"
    );
    if (checkVATIncluded.length) {
        elementsArray.pop();
    }

    elementsArray.forEach((element) => {
        element = $(element).find("span:nth-child(2)");
        if (element) prices.push(element.text().trim());
    });

    if (!prices.length) return false;

    total.price = extractPriceFromString(prices[0]);
    total.orderAmount = extractPriceFromString(
        prices[prices.length - 1]
    );
    total.shippingCost = /\d/.test(prices[1])
        ? extractPriceFromString(prices[1])
        : 0;

    if (prices.length == 6) {
        total.discount = extractPriceFromString(prices[2]);
        total.adjustPrice = extractPriceFromString(prices[3]);
        total.tax = extractPriceFromString(prices[4]);
    }

    if (prices.length == 4) {
        test = /-/.test(prices[2]);
        if (!test) total.tax = extractPriceFromString(prices[2]);
        else total.discount = extractPriceFromString(prices[2]);
    }

    if (prices.length == 5) {
        test = /-/.test(prices[3]);
        if (test) {
            total.discount = extractPriceFromString(prices[2]);
            total.adjustPrice = extractPriceFromString(prices[3]);
        } else {
            total.discount = extractPriceFromString(prices[2]);
            total.tax = extractPriceFromString(prices[3]);
        }
    }

    return total;
};

const getVatTaxValue = async () => {

    const vatIcon = document.querySelector("div.order-price-item > span.right-col.right-gap > span.comet-icon.comet-icon-help");

    if (!vatIcon) return null;
    var event = new MouseEvent("mouseover", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    vatIcon.dispatchEvent(event);

    await wait(1000);

    const e_vatTax = $(".popover-hint-content > .title");

    if (e_vatTax?.length) {
        const splitVatTax = e_vatTax.text().trim().split(":");
        return extractPriceFromString(
            splitVatTax[splitVatTax.length - 1]
        );
    }

    return null;
};

const makeSingleInvoice = async () => {
    await removeFromPage();
    modifyPage();
    addOnPage();
};

const removeFromPage = async () => {
    const options = await getSingleInvoiceOptions();
    console.log(options)

    if (!options.logisticsInfo) $(".order-detail-item-track").hide();
    if (!options.contactTable) $(".order-detail-info").hide();

    $("#top-lighthouse").hide();
    $("#header").hide();
    $(".site-footer").hide();
    $(".footer-copywrite").hide();
    $("#J_xiaomi_dialog").hide();
    $("#nav-box").hide();
    $(".order-notice-wrap").hide();
    $(".order-recommend").hide();
    $(".order-status").hide();
    $(".order-detail-order-info").hide();
    $(".order-detail-item-content-operate").hide();
    $(".comet-btn").hide();
    $(".comet-icon").hide();
    $(".switch-icon").click();
    $(".switch-icon").hide();
    $(".store-arrow").hide();
    $(".store-message").hide();
    $(".item-tags > .order-item-tag:first-child").hide();
};

const modifyPage = () => {
    $("#page-content").css({ margin: "0px" });
    $("#account-page").css({ marginTop: "100px", padding: "50px", minHeight: "1300px", border: "2px solid black", boxShadow: "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px" });
    $("<div style='width: 100%; height: 100px'></div>").insertAfter("#account-page");
    $(".order-detail-info-item:first-child").css({
        width: "100%",
        padding: "0px",
        display: "block",
    });
    $(".order-detail-item").css({ margin: "0px", padding: "0px" });
    $(".order-detail-item-content").css({
        margin: "0px",
        padding: "0px 0px 5px",
    });
    $(".order-detail-item-content").css({ borderBottom: "1px solid #ddd" });
    $(".order-detail-item-content:last-child").css({ borderColor: "gray" });
    $(".order-detail-item-content-info > .item-title").css({
        whiteSpace: "break-spaces",
    });
    $(".item-sku-attr").css({ marginTop: "0px" });
    $(".item-price").css({ marginTop: "4px" });
    $(".item-tags").css({ marginTop: "4px" });
    $(".order-price").css({ padding: "0px" });
    $(".order-price-item:first-child").css({ paddingTop: "5px" });
    $(".order-price-item > span").css({ lineHeight: "1" });
    $("body").css({ "background-color": "white" });
    $(".order-detail-item-track").css({background: "#fff"});

    const storeName = $(".store-name").text()
        ? $(".store-name").text().trim()
        : "";
    $(".order-detail-item-store").hide();
    $(".order-wrap").prepend(
        `<div style="font-size: 14px; padding: 5px 0px; border-top: 1px solid gray; "><span style="font-weight: 700; font-size: 15px;">Store: </span>${storeName}</div>`
    );
    $(".order-detail-info-item:first-child").prepend(
        '<div style="font-weight: 700; font-size: 15px; padding: 5px 0px;">Contact info:</div>'
    );
    $(".order-detail-item").prepend(
        '<div style="font-weight: 700; font-size: 15px; padding: 5px 0px; margin-top: 10px; border-top: 1px solid gray">Products:</div>'
    );

    if ($(".order-logistics").length) {
        $(".order-logistics-info-more").hide();
        $(".comet-timeline-item-head").hide();
        $(".order-logistics").css({ margin: "0px", padding: "0px" });
        $(".order-logistics-item").css({ margin: "0px", padding: "0px" });
        $(".order-logistics-timeline").css({ marginTop: "5px", padding: "15px 0px 0px" });
        $(".comet-timeline-item").css({ paddingBottom: "0px" });
        $(".order-detail-info-item:first-child").css({ borderTop: "1px solid gray", marginTop: "5px" });
        $(".order-logistics").prepend(
            '<div style="font-weight: 700; font-size: 15px; padding: 5px 0px;">Logistics info:</div>'
        );
    }

    $(".order-detail-item-content")
        .toArray()
        .forEach((item) => {
            let imageUrl = $(item)
                .find(".order-detail-item-content-img")
                .attr("style")
                .split('"')[1];
            $(item).find(".order-detail-item-content-img").hide();
            $(item).prepend(
                `<img src="${imageUrl}" style="width: 70px; height: 70px; margin-right: 10px" />`
            );
        });
};

const addOnPage = () => {
    const aliexpressLogo = chrome.extension.getURL("../../logo/aliexpress.png");
    const alibabaLogo = chrome.extension.getURL("../../logo/alibaba.png");

    const e_orderId = $(".order-wrap").find(
        "div.order-detail-info-item:nth-child(2) > .order-detail-info-content > .info-row:first-child"
    );
    console.log(e_orderId);
    const orderId = e_orderId
        ? e_orderId.text().replace(/[^0-9]/g,'')
        : "";
    const e_orderDate = $(
        "div.order-detail-info-item:nth-child(2) > .order-detail-info-content > .info-row:nth-child(2)"
    );
    const orderDate = $(e_orderDate).text()
        ? $(e_orderDate).text().split(":")[1].trim()
        : "";

    $("body").append(
        '<div class="sidebar-alibill" style="padding: 3px;width: 200px;font-size: 1.2em; background-color:#2d4059; color:white;font-weight: bold;text-align: left; position: fixed; top: 50px; right: 0px;">\
            <div class="print-invoice-alibill" style="text-align: center;margin-bottom:20px;cursor: pointer;"><img style="padding-right: 5px;" src="' +
            chrome.extension.getURL("../../logo/icon16.png") +
            '" />Print/Save invoice</div>\
            <div>\
                <input type="checkbox" class="contact-checkbox-alibill" style="margin-left: 20px;margin-right:10px;">\
                Contact info\
            </div>\
            <div>\
            <input type="checkbox" class="logistics-checkbox-alibill" style="margin-left: 20px;margin-right:10px;">\
                Logistics info\
            </div>\
        </div>'
    );

    $(".print-invoice-alibill").click(function () {
        window.print();
    });

    $(".order-detail-info-item").append(`<div></div>`);

    chrome.storage.local.get(null, function (data) {
        console.log(data);
        let seller =
            '<div class="seller-box" style="width: 100%; display: flex; overflow: visible;border-top: 1px solid gray;padding-top: 5px;">' +
            '<div style="width: 50%">' +
            '<span style="font-size: 1.2em;">' +
            data?.seller?.name +
            "</span><br>" +
            '<span style="font-size: 1.2em;">' +
            data?.seller?.address +
            "</span><br>" +
            '<span style="font-size: 1.2em;">' +
            data?.seller?.address2 +
            "</span><br>" +
            '<span style="font-size: 1.2em;">VAT: ' +
            (data?.seller?.vat ? "VAT: " + data?.seller?.vat : "") +
            "</span><br>" +
            "</div>";

        seller +=
            '<div style="width: 50%;text-align: right">' +
            '<span style="font-size: 1.2em;">' +
            data?.company?.name +
            "</span><br>" +
            '<span style="font-size: 1.2em;">' +
            data?.company?.address +
            "</span><br>" +
            '<span style="font-size: 1.2em;">' +
            data?.company?.address2 +
            "</span><br>" +
            '<span style="font-size: 1.2em;">' +
            (data?.company?.vat ? "VAT: " + data?.company?.vat : "") +
            "</span><br>" +
            '<span style="font-size: 1.2em;">' +
            (data?.company?.regNumber
                ? "Reg number: " + data?.company?.regNumber
                : "") +
            "</span><br>" +
            "</div>" +
            "</div>";

        $(".order-wrap").prepend(seller);

        let logo = aliexpressLogo;
        if (data?.seller?.logo == 1) {
            logo = alibabaLogo;
        }

        $(".order-wrap").prepend(
            '<div style="width: 100%; margin-top: 15px;">' +
                '<div style="display: inline-block; margin-top: 5px; float: left;">' +
                '<img style="width: 200px;" src="' +
                logo +
                '" />' +
                "</div>" +
                '<div style="display: inline-block; float:right;text-align: right;">' +
                '<span style="font-size: 3.5em;font-weight: bold;line-height: 1;">INVOICE</span><br>' +
                '<span style="font-size: 1em;">No: ' +
                orderId +
                "</span><br>" +
                '<span style="font-size: 1em;">Date: ' +
                orderDate +
                "</span><br>" +
                "</div>" +
                "</div>"
        );

        if(data?.singleInvoiceOptions) {
            document.querySelector('.contact-checkbox-alibill').checked = data.singleInvoiceOptions?.contactTable;
            document.querySelector('.logistics-checkbox-alibill').checked = data.singleInvoiceOptions?.logisticsInfo;
        }

        $('.contact-checkbox-alibill').click(async function(){
            const contactInfo = $('.contact-checkbox-alibill')?.prop('checked');
            contactInfo ? $(".order-detail-info").show() : $(".order-detail-info").hide();

            data.singleInvoiceOptions.contactTable = contactInfo;
            chrome.storage.local.set(data, function() {});
        })
        
        $('.logistics-checkbox-alibill').click(async function(){
            const logisticInfo = $('.logistics-checkbox-alibill')?.prop('checked');
            logisticInfo ? $(".order-detail-item-track").show() : $(".order-detail-item-track").hide();

            data.singleInvoiceOptions.logisticsInfo = logisticInfo;
            chrome.storage.local.set(data, function() {});
        })
    });
};
