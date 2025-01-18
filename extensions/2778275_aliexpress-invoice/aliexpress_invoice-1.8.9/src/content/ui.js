let modal = (args) =>
    '<div class="c297943f88">\
        <div class="modal">\
            <div class="modal-background"></div>\
            <div class="modal-card" style="margin-top: 100px;">\
                <header class="modal-card-head">\
                    <p class="modal-card-title">' +
    (args?.title ? args.title : "AliBill") +
    '</p>\
                    <button class="delete close-modal" aria-label="close"></button>\
                </header>\
                <section class="modal-card-body">\
                    <div class="modal-message"></div>\
                    <div class="modal-progress-container"></div>\
                </section>\
                <footer class="modal-card-foot">\
                    <button class="button is-danger close-modal">Close</button>\
                </footer>\
            </div>\
        </div>\
</div>';

let productLinkModal = () =>
    '<div class="c297943f88">\
        <div class="product-link-modal" style="display: none; position:fixed; top: 0px; left: 0px; right: 0px; bottom: 0px">\
            <div class="modal-background">\
                <div class="modal-card" style=" margin: 100px auto;">\
                    <header class="modal-card-head">\
                        <p class="modal-card-title">AliBill</p>\
                        <button class="delete close-product-link-modal" aria-label="close"></button>\
                    </header>\
                    <section class="modal-card-body">\
                        <h3>Insert product url:</h3>\
                        <input id="productUrl" type="text" style="width:600px">\
                    </section>\
                    <footer class="modal-card-foot">\
                        <button class="button is-danger close-product-link-modal">Close</button>\
                        <button class="button is-success ml-2" id="scrapeProductData">Scrape product data</button>\
                    </footer>\
                </div>\
            </div>\
        </div>\
</div>';

let optionsMenu = () =>
    '<div class="c297943f88">\
    <div class="box" style="margin-bottom: 10px">\
        <div class="columns">\
            <div class="column is-one-quarter has-text-centered">\
                <img src="' +
    chrome.runtime.getURL("../../logo/icon48.png") +
    '">\
                <h3 style="font-size:2em;padding: 5px;">AliBill</h3>\
            </div>\
            <div class="column">\
                <div class="buttons">\
                    <button class="button is-primary generate-invoice">Generate one invoice for multiple orders</button>\
                    <a class="button is-link" href="' +
    chrome.runtime.getURL("../../opt.html") +
    '" target="_blank">Invoice options</a>\
                </div>\
                <span >This will generate invoice from first to the last page of orders. If you want to filter orders on the invoice, please first use AliExpress filters below this menu and then click to generate invoice. </span>\
            </div>\
        </div>\
    </div>\
</div>';

let optionsMenuNew = (numberOfOrders) =>
    '<div class="c297943f88">\
    <div class="box" style="margin-bottom: 10px">\
        <div class="columns">\
            <div class="column is-one-fifth has-text-centered">\
                <img src="' +
    chrome.runtime.getURL("../../logo/icon48.png") +
    '">\
                <h3 style="font-size:2em;padding: 5px;">AliBill</h3>\
                </div>\
                <div class="column">\
                <div class="buttons">\
                    <div class="tooltip-alib">\
                        <button class="button is-success ali-bill-get-orders">Get orders</button>\
                        <span class="tooltiptext-alib">Click on this button, script will collect data about your orders and write that data inside you browser local storage, and then click "Generate invoice" to filter that orders and generate invoice.</span>\
                    </div>\
                    <div class="tooltip-alib">\
                        <button class="button is-success ali-bill-get-logistics">Get shipping details</button>\
                        <span class="tooltiptext-alib">This functionality will trigger script to collect shipping details from your orders and also will write inside your local storage.</span>\
                    </div>\
                    <div class="tooltip-alib">\
                        <button class="button is-link ali-bill-generate-invoice">Generate invoice</button>\
                        <span class="tooltiptext-alib">Generate invoice from orders from browser local storage, if you click on this button and don\'t have any orders, the invoice will be empty, so you need first to collect order details, click on "Get orders".</span>\
                    </div>\
                    <a class="button is-link" href="' +
    chrome.runtime.getURL("../../opt.html") +
    '" target="_blank">Options</a>\
                    <button class="button is-danger ali-bill-delete-orders">Delete orders</button>\
                </div>\
                <div class="is-flex mb-4">\
                    <label class="mr-2">Scrape only orders from date: </label>\
                    <input id="ali-bill-date-from" type="date">\
                    <label class="mx-2">, to date: </label>\
                    <input id="ali-bill-date-to" type="date">\
                    <p class="ml-auto">Total orders in storage: <b><span class="number-of-orders">' + numberOfOrders + '</span></b></p>\
                </div>\
                <span >"Get Orders" button, scrape orders and save it to local storage of your browser, so you would not have to scrape details every time you want to generate invoice.<br>' +
    '"Get shipping details" scrapes all the logistics info about all orders that already saved in local storage.<br>' +
    '"Generate Invoice" opens the bulk invoice with all the orders from your local storage. In that view, you would be able to filter orders and edit the invoice.<br>' +
    '"Delete orders" deletes all the order from local storage.</span>\
                <div class="has-text-right">\
                    <div class="tooltip-alib">\
                    <button class="button is-link generate-invoice-from-product-links">Generate invoice from product links</button>\
                    <span class="tooltiptext-alib">This functionality only works if you want to generate invoice from product link (not your actual order)</span>\
                    </div>\
                    <div style="border: 2px solid rgb(72, 95, 199); padding: 1px; margin-top: 10px; font-size: 13px">If you want some extra feature, additional functionality or have some trouble the product, write us on <a href="mailto:kiril.abdulov@gmail.com">kiril.abdulov@gmail.com</a></div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';

const appendSingleInvoiceBtn = () => {
    setInterval(() => {
        const btnContainer = $(
            "div.order-item-content > div.order-item-content-opt > div.order-item-btns-wrap > .order-item-btns"
        );

        btnContainer.toArray().forEach((item) => {
            const e_orderDetailsUrl = $(item)
                .closest(".order-item")
                .find(".order-item-header-right > a");
            const orderUrl = e_orderDetailsUrl.length
                ? $(e_orderDetailsUrl).attr("href")
                : null;
            const aliInvoiceBtn = `<a href='${orderUrl}&single-invoice=1' target='_blank'>
            <div class='c297943f88'>
                <button class='button is-success ali-bill-single-invoice' style='height: 30px'>
                    <img style='padding-right: 5px;' src='${chrome.runtime.getURL(
                "../../logo/icon16.png"
            )}'/>Invoice
                </button>
            </div></a>`;

            const existingBtn = $(item).find(".ali-bill-single-invoice");

            if (!existingBtn.length) $(item).append(aliInvoiceBtn);
        });
    }, 1000);
};

let showModal = () => {
    $(".c297943f88").find(".modal")?.show();
};

let hideModal = () => {
    $(".c297943f88").find(".modal")?.hide();
    $(".c297943f88").find(".modal-card-foot > .ab-generate-invoice").remove();
};

let changeModalMessage = (args) => {
    $(".c297943f88").find(".modal-card-body > .modal-message").empty().html(args?.message);
    if (args?.openInvoice) {
        $(".c297943f88").find(".modal-card-foot > .close-modal").after('<button class="button is-link ab-generate-invoice">Generate invoice</button>');
        $(".ab-generate-invoice").click(() => {
            generateInvoice();
            hideModal();
        });
    }
};

let emptyModalText = () => {
    $(".c297943f88").find(".modal-card-body > .modal-message")?.empty();
};

let changeProgress = (current, max, message) => {
    if (!$(".c297943f88").find(".modal-card-body")) return;

    if (
        $(".c297943f88").find(
            ".modal-card-body > .modal-progress-container > .progress"
        )
    ) {
        $(".c297943f88")
            .find(".modal-card-body > .modal-progress-container > .progress")
            .attr("value", current);
        $(".c297943f88")
            .find(".modal-card-body > .modal-progress-container > .progress")
            .attr("max", max);
        $(".c297943f88")
            .find(
                ".modal-card-body > modal-progress-container > .progress-text"
            )
            .text(message);
    }

    $(".c297943f88").find(".modal-card-body").empty();
    $(".c297943f88")
        .find(".modal-card-body")
        .append(
            '\
        <p class="progress-text">' +
            message +
            '</p>\
        <progress class="progress is-link" value="' +
            current +
            '" max="' +
            max +
            '">' +
            current +
            "/" +
            max +
            "</progress>\
    "
        );
};

let attachUiListeners = () => {
    let closeModalBtn = $(".c297943f88").find(".close-modal");

    $(closeModalBtn).click(() => {
        hideModal();
    });

    console.log("closeModalBtn ", closeModalBtn);
};

let showProductLinkModal = () => {
    $(".c297943f88").find(".product-link-modal")?.show();
};

let hideProductLinkModal = () => {
    $(".c297943f88").find(".product-link-modal")?.hide();
};