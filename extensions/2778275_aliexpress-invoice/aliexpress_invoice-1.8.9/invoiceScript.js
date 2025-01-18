$(document).ready(async () => {
    $(".invoice-number").html(parseInt(Math.random() * 100000000));
    $(".invoice-date").html(
        new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    );
    // Modals
    $("body").append(modal());
    $("body").append(productLinkModal());
    $(".close-modal").click(hideModal);
    $(".close-product-link-modal").click(hideProductLinkModal);
    $("#scrapeProductData").click(scrapeProductData);
    attachUiListeners();

    // Floating menu
    addFloatingMenuEventListeners();

    // Url query params
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)

    if (params.dateFrom) {
        $("#ali-bill-date-from").val(
            params.dateFrom
        );
    }
    
    if (params.dateTo) {
        $("#ali-bill-date-to").val(
            params.dateTo
        );
    }
    
    if (params.invoiceFromProductLinks == 1) {
        renderInvoiceFromProductLinks()
        return;
    }

    filterOrders();
});

let convertOrderToOrderClass = (orders) => {
    if (!orders) return null;

    let _orders = [];

    orders.forEach((order) => {
        let _order = new Order(order);

        if (order?.items) {
            _order.setOrderItems(order.items);
        }

        if (_order) _orders.push(_order);
    });

    return _orders;
};

let renderTable = async (options) => {
    if (!options || !options?.orders?.length) {
        showModal();
        changeModalMessage({message: "Can not find any orders to render."});
        return;
    }

    if (!options?.orders) {
        return;
    }

    let orders = convertOrderToOrderClass(options?.orders);

    $("table").append(Invoice.renderOrders(orders, options));
    $("table").append(Invoice.renderSums(orders, options));

    await updateCheckboxes();
};

let clearAllOrders = () => {
    $("tbody").remove();
};

let renderInvoice = (options) => {
    if ($("tbody")?.length) clearAllOrders();

    renderTable(options);
    renderSellerInfo(options);
    renderCompanyInfo(options);
    attachEventListeners(options);
};

let attachEventListeners = (options) => {
    $(".delete-order").click((current) => {
        let orderId = Number($(current?.target).attr("data-order-id"));

        console.log("Order Id ", orderId);

        if (orderId) {
            let orders = options?.orders;

            if (!orders) return;

            orders = Filter.deleteOrderById(orderId, orders);

            console.log("Orders ", orders);

            options.orders = orders;
            renderInvoice(options);
        }
    });
};

const filterOrders = async () => {
    let options = new Options();
    await options.init();

    console.log("options ", options);

    let orders = options?.orders;
    if (!orders) return;

    let dateFrom = $("#ali-bill-date-from").val().length
        ? new Date(new Date($("#ali-bill-date-from").val()).toDateString())
        : null;
    let dateTo = $("#ali-bill-date-to").val().length
        ? new Date(new Date($("#ali-bill-date-to").val()).toDateString())
        : null;
    let searchValue = $("#ali-bill-search").val().trim().toLowerCase();

    orders = Filter.filterOrdersByDateRange(orders, dateFrom, dateTo);
    orders = Filter.filterOrdersBySearchInput(orders, searchValue);
    console.log(orders);

    options.orders = orders;
    renderInvoice(options);
};

let renderSellerInfo = (options) => {
    if (!options) return null;

    if (!options?.seller) return null;

    $(".seller-name").text(options?.seller?.name ? options.seller?.name : "");
    $(".seller-address").text(
        options?.seller?.address ? options.seller?.address : ""
    );
    $(".seller-state").text(
        options?.seller?.address2 ? options.seller?.address2 : ""
    );
    $(".seller-vat").text(options?.seller?.vat ? options.seller?.vat : "");

    if (options?.seller?.logo == 0)
        $(".seller-logo").attr("src", "./logo/aliexpress.png");
    if (options?.seller?.logo == 1)
        $(".seller-logo").attr("src", "./logo//alibaba.png");

    if (options?.seller?.logoUrl) {
        if (
            options?.seller?.logoUrl &&
            options?.seller?.logoUrl.includes("http")
        ) {
            $(".seller-logo").attr("src", options?.seller?.logoUrl);
        }
    }

    return;
};

let renderCompanyInfo = (options) => {
    if (!options) return null;

    if (!options?.company) return null;

    $(".company-name").text(
        options?.company?.name ? options?.company?.name : ""
    );
    $(".company-address").text(
        options?.company?.address ? options?.company?.address : ""
    );
    $(".company-state").text(
        options?.company?.address2 ? options?.company?.address2 : ""
    );
    $(".company-vat").text(options?.company?.vat ? options?.company?.vat : "");
    $(".company-reg").text(
        options?.company?.regNumber ? options?.company?.regNumber : ""
    );
};

const renderInvoiceFromProductLinks = async () => {
    $('.floating-menu').hide();
    $('.floating-menu-invoice-from-links').show();
    $('.paper-view').empty();

    let options = new Options();
    await options.init();
    console.log("options ", options);
    
    renderHeader();
    renderSellerInfo(options);
    renderCompanyInfo(options);
    renderTotals(options);
    await renderFakeOrders(options);

    await updateCheckboxes();

    $(".insert-order").click(() => insertNewOrder());
    $(".delete-orders").click(() => {
        const confirmation = confirm(
            "Are you sure you want to delete all fake orders from local storage?"
        );
    
        if (confirmation) {
            chrome.storage.local.remove("fakeOrders", () => {
                if (chrome.runtime.lastError) {
                    console.log("Remove fakeOrders error: ", chrome.runtime.lastError);
                    alert('Something went wrong.')
                }
            });

            location.reload();
        }
    });
}

const renderHeader = () => {
    $('.paper-view').append(
        `<div class="columns px-5 is-vcentered">
            <img
                src="./logo/aliexpress.png"
                class="seller-logo"
                style="height: 40px; width: 166px"
            />

            <div class="column has-text-right">
                <p class="seller-name" contenteditable>Alibaba (China) Co., Ltd.</p>
                <p class="seller-address" contenteditable>969 West Wen Yi Road</p>
                <p class="seller-state" contenteditable>Hangzhou 311121, Yu Hang District, China</p>
                <p class="seller-vat" contenteditable></p>
            </div>
        </div>
        <div
            class="columns p-3 is-vcentered"
            style="border-top: 2px solid black"
        >
            <div class="column has-text-weight-bold">
                <h1 class="column is-size-1" style="padding-left: 0px">
                    INVOICE
                </h1>
                <p class="has-text-grey">Invoice Number</p>
                <p class="invoice-number" contenteditable>
                    ${parseInt(Math.random() * 10000000000)}
                </p>
                <br />
                <p class="has-text-grey">Date Of Issue</p>
                <p class="invoice-date" contenteditable>
                    ${new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </p>
            </div>
            <div
                class="column has-text-weight-bold"
                style="text-align: right"
            >
                <p class="has-text-grey">Billed to</p>
                <p class="company-name" contenteditable>Client Name: </p>
                <p class="company-address" contenteditable>
                    Client Address: 
                </p>
                <p class="company-state" contenteditable>
                    City, State, Country: 
                </p>
                <p class="company-vat" contenteditable>VAT: </p>
                <p class="company-reg" contenteditable>Reg: </p>
            </div>
        </div>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Product Details</th>
                        <th>Price Per Unit</th>
                        <th>Quantity</th>
                        <th class="tax-element">Tax</th>
                        <th>Product Amount</th>
                    </tr>
                </thead>
            </table>
        </div>`
    )
}

const renderFakeOrders = async (options) => {
    const fakeOrders = await getFakeOrdersFromLocal();
    console.log('Orders in storage:', fakeOrders);

    if (!fakeOrders.length) {
        $('.menu-item.insert-order').addClass('glow');
    }

    if (!fakeOrders.length) return;

    for (const fakeOrder of fakeOrders) {
        await insertOrder(fakeOrder, options);

        if (fakeOrder.items.length) {
            for (const item of fakeOrder.items) {
                await insertProduct(item, fakeOrder.orderId, fakeOrder.currency);
            }
        };
    }

    await refreshTotals();
}

const insertNewOrder = async () => {
    const fakeOrder = {
        orderId: parseInt(Math.random() * 10000000000),
        contact: {},
        items: [],
        paymentDetails: [{paymentMethod: 'Credit/Debit card'}],
        total: {
            price: 0.00,
            shippingCost: 0.00,
            discount: 0.00,
            tax: 0.00,
            orderAmount: 0.00
        }
    };
    let fakeOrders = await getFakeOrdersFromLocal();

    if (!fakeOrders.length) {
        fakeOrders = [fakeOrder]
    } else {
        fakeOrders.push(fakeOrder)
    };

    chrome.storage.local.set({
        fakeOrders,
    }, () => {
        if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
    })

    await insertOrder(fakeOrder);
    
    await updateCheckboxes();
}

const insertOrder = async (newOrder) => {
    let orderStructure = `<tbody id="${ newOrder.orderId }" class="order-item">`;

    orderStructure += `<tr class="order-head has-text-grey">
        <td>
            <div style="position: relative !important;">
                <button style="position:absolute;right:0;top: 0px;" class="button is-link print-buttons insert-product-${newOrder.orderId}">Insert product</button>
            </div>
            <p>Order ID: <span>${ newOrder.orderId }</span></p>`;

    orderStructure += `<p class="order-date-element">Order date: <span id="orderDate${newOrder.orderId}" contenteditable>${newOrder.orderDateTime ? newOrder.orderDateTime : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })}</span></p>`;
    
    orderStructure += `<div class="is-flex"><div class="mr-3 store-name-element">Store name: <span id="seller${newOrder.orderId}" contenteditable> ${newOrder.storeName ? newOrder.storeName : '/'}</span></div><div class="store-number-element">Store number: <span id="sellerId${newOrder.orderId}" contenteditable> ${newOrder.storeNumber ? newOrder.storeNumber : '/'}</span></div></div>`;
    
    orderStructure += `<p class="order-status-element">Order status: <span id="status${newOrder.orderId}" contenteditable>${newOrder.status ? newOrder.status : '/'}</span></p>`;
    
    orderStructure += `<p class="customer-info-element">Ship to address: <span id="address${newOrder.orderId}" contenteditable>${newOrder.address ? newOrder.address : 'N/A'}</span></p>`;

    orderStructure += `<p class="tracking-number-element">Tracking number: <span id="trackingNumber${newOrder.orderId}" contenteditable>${newOrder.trackingNumber ? newOrder.trackingNumber : '/'}</span></p>`;
    
    orderStructure += `<p class="payment-info-element">Payment Received: <span id="payment${newOrder.orderId}" contenteditable>${newOrder.paymentDetails[0].paymentMethod}</span></p>`;

    orderStructure += `</td>
            <td class="is-vcentered">
                <p>Product Amount:<br/>
                    <span class="currency price-red"></span> <span id="price${newOrder.orderId}" class="price-red">${newOrder.total.price.toFixed(2)}</span>
                </p>
            </td>
            <td class="is-vcentered">
                <p>Shipping Cost:<br />
                    <span class="currency price-red"></span> <span id="shippingCost${newOrder.orderId}" class="price-red" contenteditable>${newOrder.total.shippingCost.toFixed(2)}</span>
                </p>
                <p style="border-top: 1px solid #dbdbdb">Discount:<br />
                    <span class="currency price-red"></span> <span id="discount${newOrder.orderId}" class="price-red" contenteditable>${newOrder.total.discount.toFixed(2)}</span>
                </p>
            </td>
            <td class="is-vcentered tax-element">
                <p>Tax:<br/>
                    <span class="currency price-red"></span> <span id="tax${newOrder.orderId}" class="price-red">${newOrder.total.tax.toFixed(2)}</span>
                </p>
            </td>
            <td class="is-vcentered" style="position: relative">
                <p>Order Amount:<br />
                    <span class="currency price-red"></span> <span id="orderAmount${newOrder.orderId}" class="price-red">${newOrder.total.orderAmount.toFixed(2)}</span>
                </p>
                <button style="position:absolute;right:0;bottom: 10px;" class="button is-danger print-buttons delete-order-${ newOrder.orderId }">X</button>
            </td>
        </tr></tbody>`;
    
    $("table tbody:last").before(orderStructure);

    $(".delete-order-"+newOrder.orderId).click(async () => {
        const confirmation = confirm(
            "Are you sure you want to delete this fake order from local storage?"
        );
    
        if (confirmation) {
            let fakeOrders = await getFakeOrdersFromLocal();

            fakeOrders = fakeOrders.filter(fakeOrder => fakeOrder.orderId != newOrder.orderId);
            
            chrome.storage.local.set({ fakeOrders }, async () => {
                if(chrome?.runtime?.lastError) {
                    console.log(chrome?.runtime?.lastError);
                    alert('Something went wrong.');
                    return;
                }
                
                $("#"+newOrder.orderId).hide();
                await refreshTotals();
            });

        }
    });
    $(".insert-product-"+newOrder.orderId).click(() => {
        const tempProduct = {orderId: newOrder.orderId}

        chrome.storage.local.set({
            tempProduct,
        }, () => {
            if(chrome?.runtime?.lastError) {
                console.log(chrome?.runtime?.lastError);
                return;
            }

            $("#productUrl").val("");
            showProductLinkModal(newOrder.orderId);
        })
    });
    
    const orderDateElement = document.getElementById("orderDate"+newOrder.orderId);
    if (orderDateElement) orderDateElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();

        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.orderDate = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const sellerElement = document.getElementById("seller"+newOrder.orderId);
    if (sellerElement) sellerElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.storeName = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const sellerIdElement = document.getElementById("sellerId"+newOrder.orderId);
    if (sellerIdElement) sellerIdElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.storeNumber = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const statusElement = document.getElementById("status"+newOrder.orderId);
    if (statusElement) statusElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.status = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const addressElement = document.getElementById("address"+newOrder.orderId);
    if (addressElement) addressElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.address = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const trackingNumberElement = document.getElementById("trackingNumber"+newOrder.orderId);
    if (trackingNumberElement) trackingNumberElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.trackingNumber = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
            console.log(fakeOrders)
        });
    }, false);
    const paymentElement = document.getElementById("payment"+newOrder.orderId);
    if (paymentElement) paymentElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) fakeOrder.paymentDetails[0].paymentMethod = value;
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const shippingCostElement = document.getElementById("shippingCost"+newOrder.orderId);
    if (shippingCostElement) shippingCostElement.addEventListener("input", async function() {
        const value = Number($(this).text());
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) {
                fakeOrder.total.shippingCost = value;

                fakeOrder.total.orderAmount = +(fakeOrder.total.price + fakeOrder.total.shippingCost - fakeOrder.total.discount + fakeOrder.total.tax).toFixed(2);
                $("#orderAmount"+newOrder.orderId).text(fakeOrder.total.orderAmount);
            }
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, async () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);

            await refreshTotals();
        });
    }, false);
    const discountElement = document.getElementById("discount"+newOrder.orderId);
    if (discountElement) discountElement.addEventListener("input", async function() {
        const value = Number($(this).text());
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === newOrder.orderId) {
                fakeOrder.total.discount = value;

                fakeOrder.total.orderAmount = +(fakeOrder.total.price + fakeOrder.total.shippingCost - fakeOrder.total.discount + fakeOrder.total.tax).toFixed(2);
                $("#orderAmount"+newOrder.orderId).text(fakeOrder.total.orderAmount);
            }
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, async () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);

            await refreshTotals();
        });
    }, false);
}

const scrapeProductData = async () => {
    hideProductLinkModal();
    const productUrl = $("#productUrl").val();
    if (!productUrl) {
        showModal();
        changeModalMessage({
            message: "Please insert product link.",
        });
        return;
    }
    if (!productUrl.includes('https://www.aliexpress') || !productUrl.includes('/item/')) {
        showModal();
        changeModalMessage({
            message: "Product link not valid.",
        });
        return;
    }

    const tempProduct = await getProductFromLocal();
    tempProduct.productUrl = productUrl;

    chrome.storage.local.set({
        tempProduct,
    }, () => {
        if(chrome?.runtime?.lastError) {
            console.log(chrome?.runtime?.lastError);
            return;
        }

        showModal();
        changeModalMessage({
            message: "Please wait. Do not close this tab.",
        });

        chrome.runtime.sendMessage({
            messageType: "START_SCRAPING_PRODUCT_DETAILS",
            productUrl: productUrl
        });
    })
}

chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {
    if (request.messageType == "SCRAPING_DONE") {
        sendResponse(true);

        const tempProduct = await getProductFromLocal();
        console.log(tempProduct);
        if (!tempProduct.productTitle) {
            changeModalMessage({
                message: "Something went wrong. Check url and try again.",
            });
            return;
        }
        
        tempProduct.itemId = parseInt(Math.random() * 10000000000);
        tempProduct.quantity = 1;
        tempProduct.itemTax = 0.00;
        tempProduct.itemPrice = tempProduct.pricePerUnit;

        await insertProduct(tempProduct, tempProduct.orderId, tempProduct.currency);

        updateCheckboxes();

        $('.currency').text(tempProduct.currency);
        $('#seller'+tempProduct.orderId).text(tempProduct.seller);
        $('#sellerId'+tempProduct.orderId).text(tempProduct.sellerId);

        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === tempProduct.orderId) {
                fakeOrder.currency = tempProduct.currency;
                fakeOrder.sellerId = tempProduct.sellerId;
                fakeOrder.seller = tempProduct.seller;
                delete tempProduct.currency;
                delete tempProduct.sellerId;
                delete tempProduct.seller;
                delete tempProduct.orderId;
                fakeOrder.items.push(tempProduct);

                let price = 0;
                fakeOrder.items.forEach(item => price = +(price + item.itemPrice).toFixed(2));
                fakeOrder.total.price = price;
                $("#price"+fakeOrder.orderId).text(price);
                $("#orderAmount"+fakeOrder.orderId).text(price);

                fakeOrder.total.orderAmount = +(fakeOrder.total.price + fakeOrder.total.shippingCost - fakeOrder.total.discount + fakeOrder.total.tax).toFixed(2);
            }
            return fakeOrder;
        })
        
        chrome.storage.local.set({ fakeOrders }, async () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);

            await refreshTotals();
        });
        
        chrome.storage.local.remove("tempProduct", () => {
            if (chrome.runtime.lastError) {
                console.log("Remove product error: ", chrome.runtime.lastError);
            }
        });
        hideModal();
    }
});

const insertProduct = async (product, orderId, currency) => {
    let options = new Options();
    await options.init();

    let productStructure = `
        <tr id="${product.itemId}" class="article-item">
          <td class="is-flex">`;

    productStructure += `<img src="${product.productImageUrl}" class="product-image-element" />`;

    productStructure += `<p>
            <span id="productTitle${product.itemId}" contenteditable>${product.productTitle}</span>
            <br />
            <span class="has-text-grey">Product properties: </span><span id="properties${product.itemId}" class="has-text-grey" contenteditable>${product.properties ? product.properties : '/'}</span>
        </p>
        </td>
        <td>
        <span class="currency">${currency}</span> <span id="pricePerUnit${product.itemId}" contenteditable>${product.pricePerUnit ? product.pricePerUnit.toFixed(2) : "0.00"}</span>
        </td>
        <td><span id="quantity${product.itemId}" contenteditable>${product.quantity ? product.quantity : "1"}</span></td>
        <td class="tax-element"><span class="currency">${currency}</span> <span id="itemTax${product.itemId}" contenteditable>${product.itemTax ? product.itemTax.toFixed(2) : "0.00"}</span></td>
        <td>
        <span class="currency">${currency}</span> <span id="itemPrice${product.itemId}">${product.itemPrice ? product.itemPrice.toFixed(2) : "0.00"}</span>
    </td>
    </tr>`;

    $("#"+orderId+" tr:last").before(productStructure);

    const productTitleElement = document.getElementById("productTitle"+product.itemId);
    if (productTitleElement) productTitleElement.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === orderId) {
                let found = fakeOrder.items.find(item => item.itemId === product.itemId);
                if (found) found.productTitle = value;
            }
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const properties = document.getElementById("properties"+product.itemId);
    if (properties) properties.addEventListener("input", async function() {
        const value = $(this).text();
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === orderId) {
                let found = fakeOrder.items.find(item => item.itemId === product.itemId);
                if (found) found.properties = value;
            }
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
        });
    }, false);
    const pricePerUnitElement = document.getElementById("pricePerUnit"+product.itemId);
    if (pricePerUnitElement) pricePerUnitElement.addEventListener("input", async function() {
        const flag = numberTest($(this).text());
        if (!flag) return;
        
        const value = Number($(this).text());
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === orderId) {
                let found = fakeOrder.items.find(item => item.itemId === product.itemId);
                if (found) {
                    found.pricePerUnit = value;
                    found.itemPrice = found.pricePerUnit*found.quantity;
                    $("#itemPrice"+product.itemId).text(found.itemPrice);

                    let fakeOrderPrice = 0;
                    fakeOrder.items.forEach(item => fakeOrderPrice = +(fakeOrderPrice + item.itemPrice).toFixed(2));
                    fakeOrder.total.price = fakeOrderPrice;
                    $("#price"+orderId).text(fakeOrderPrice);

                    fakeOrder.total.orderAmount = +(fakeOrder.total.price + fakeOrder.total.shippingCost - fakeOrder.total.discount + fakeOrder.total.tax).toFixed(2);
                    $("#orderAmount"+orderId).text(fakeOrder.total.orderAmount);
                }
            }
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, async () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);

            await refreshTotals();
        });
    }, false);
    const quantityElement = document.getElementById("quantity"+product.itemId);
    if (quantityElement) quantityElement.addEventListener("input", async function() {
        const flag = numberTest($(this).text());
        if (!flag) return;
        
        const value = Number($(this).text());
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === orderId) {
                let found = fakeOrder.items.find(item => item.itemId === product.itemId);
                if (found) {
                    found.quantity = value;
                    found.itemPrice = found.pricePerUnit*found.quantity;
                    $("#itemPrice"+product.itemId).text(found.itemPrice);

                    let fakeOrderPrice = 0;
                    fakeOrder.items.forEach(item => fakeOrderPrice = +(fakeOrderPrice + item.itemPrice).toFixed(2));
                    fakeOrder.total.price = fakeOrderPrice;
                    $("#price"+orderId).text(fakeOrderPrice);

                    fakeOrder.total.orderAmount = +(fakeOrder.total.price + fakeOrder.total.shippingCost - fakeOrder.total.discount + fakeOrder.total.tax).toFixed(2);
                    $("#orderAmount"+orderId).text(fakeOrder.total.orderAmount);
                }
            }
            return fakeOrder;
        });

        chrome.storage.local.set({ fakeOrders }, async () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
            
            await refreshTotals();
        });
    }, false);
    const itemTaxElement = document.getElementById("itemTax"+product.itemId);
    if (itemTaxElement) itemTaxElement.addEventListener("input", async function() {
        const flag = numberTest($(this).text());
        if (!flag) return;
        
        const value = Number($(this).text());
        let fakeOrders = await getFakeOrdersFromLocal();
        
        fakeOrders = fakeOrders.map(fakeOrder => {
            if (fakeOrder.orderId === orderId) {
                let found = fakeOrder.items.find(item => item.itemId === product.itemId);
                if (found) {
                    found.itemTax = value;

                    let fakeOrderTax = 0;
                    fakeOrder.items.forEach(item => fakeOrderTax = +(fakeOrderTax + item.itemTax).toFixed(2));
                    fakeOrder.total.tax = fakeOrderTax;
                    $("#tax"+orderId).text(fakeOrderTax);

                    fakeOrder.total.orderAmount = +(fakeOrder.total.price + fakeOrder.total.shippingCost - fakeOrder.total.discount + fakeOrder.total.tax).toFixed(2);
                    $("#orderAmount"+orderId).text(fakeOrder.total.orderAmount);
                }
            }
            return fakeOrder;
        });
        
        chrome.storage.local.set({ fakeOrders }, async () => {
            if(chrome?.runtime?.lastError) console.log(chrome?.runtime?.lastError);
            
            await refreshTotals();
        });
    }, false);
}

const renderTotals = (options) => {
    let totalElement = `<tbody><tr class="order-total has-text-grey">
        <td class="is-vcentered has-text-black-bis is-size-4">
            <p>Total:</p>
        </td>
        <td class="is-vcentered">
            <p>Product Amount:<br/>
                <span class="currency price-red"></span> <span id="totalPrice" class="price-red">0.00</span>
            </p>
        </td>     
        <td class="is-vcentered">
            <p>Shipping Cost:<br />
                <span class="currency price-red"></span> <span id="totalShippingCost" class="price-red">0.00</span>
            </p>
            <p style="border-top: 1px solid #dbdbdb">Discount:<br />
                <span class="currency price-red"></span> <span id="totalDiscount" class="price-red">0.00</span>
            </p>
        </td>
        <td class="is-vcentered tax-element">
            <p>Tax:<br/>
                <span class="currency price-red"></span> <span id="totalTax" class="price-red">0.00</span>
            </p>
        </td>
        <td class="is-vcentered">
            <p>Order Amount:<br />
                <span class="currency price-red"></span> <span id="totalOrderAmount" class="price-red">0.00</span>
            </p>
        </td></tr></tbody>`;

        $("table").append(totalElement);
};

const refreshTotals = async () => {
    const fakeOrders = await getFakeOrdersFromLocal();
    if (!fakeOrders. length) return;

    let totalPrice = 0;
    let totalShippingCost = 0;
    let totalDiscount = 0;
    let totalTax = 0;
    let totalOrderAmount = 0;

    fakeOrders.forEach(fakeOrder => {
        totalPrice = totalPrice + fakeOrder.total.price;
        totalShippingCost = totalShippingCost + fakeOrder.total.shippingCost;
        totalDiscount = totalDiscount + fakeOrder.total.discount;
        totalTax = totalTax + fakeOrder.total.tax;
        totalOrderAmount = totalOrderAmount + fakeOrder.total.orderAmount;
    })

    $("#totalPrice").text((totalPrice).toFixed(2));
    $("#totalShippingCost").text((totalShippingCost).toFixed(2));
    $("#totalDiscount").text((totalDiscount).toFixed(2));
    $("#totalTax").text((totalTax).toFixed(2));
    $("#totalOrderAmount").text((totalOrderAmount).toFixed(2));
};

const numberTest = (value) => {
    if ( ![...value].every(c => '0123456789.'.includes(c)) || (value.match(/\./g)||[]).length > 1 ) {
        showModal();
        changeModalMessage({
            message: "Please enter only numbers.",
        });
        return false;
    };

    return true;
}

const addFloatingMenuEventListeners = () => {
    $(".print-invoice").click(() => {
        window.print();
    });
    $(".invoice-settings").click(() => {
        chrome.tabs.create({
            url: chrome.runtime.getURL("./opt.html"),
        });
    });
    $("#ali-bill-date-from").change(() => filterOrders());
    $("#ali-bill-date-to").change(() => filterOrders());
    $("#ali-bill-search").keyup(() => filterOrders());

    $('.product-image-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'product-image-element', 'productImage'));
    $('.date-time-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'order-date-element', 'orderDateTime'));
    $('.store-name-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'store-name-element', 'storeName'));
    $('.store-number-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'store-number-element', 'storeNumber'));
    $('.tracking-number-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'tracking-number-element', 'trackingNumber'));
    $('.customer-info-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'customer-info-element', 'customerInfo'));
    $('.payment-info-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'payment-info-element', 'paymentInfo'));
    $('.order-status-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'order-status-element', 'orderStatus'));
    $('.tax-info-checkbox').click((e) => toggleFloatingMenuCheckbox(e, 'tax-element', 'taxInfo'));
}

const toggleFloatingMenuCheckbox = async (e, targetElement, optionName) => {
    const checkbox = e.target.checked;
    console.log(e.target.checked)
    checkbox ? $('.'+targetElement).show() : $('.'+targetElement).hide();

    let options = new Options();
    await options.init();

    options.multipleOrderInvoiceOptions[optionName] = checkbox;
    chrome.storage.local.set(options, function() {});
}

const updateCheckboxes = async () => {
    let options = new Options();
    await options.init();

    if (options.multipleOrderInvoiceOptions?.productImage) {
        $('.product-image-checkbox').prop('checked', true);
        $('.product-image-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.orderDateTime) {
        $('.date-time-checkbox').prop('checked', true);
        $('.order-date-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.storeName) {
        $('.store-name-checkbox').prop('checked', true);
        $('.store-name-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.storeNumber) {
        $('.store-number-checkbox').prop('checked', true);
        $('.store-number-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.trackingNumber) {
        $('.tracking-number-checkbox').prop('checked', true);
        $('.tracking-number-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.customerInfo) {
        $('.customer-info-checkbox').prop('checked', true);
        $('.customer-info-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.paymentInfo) {
        $('.payment-info-checkbox').prop('checked', true);
        $('.payment-info-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.orderStatus) {
        $('.order-status-checkbox').prop('checked', true);
        $('.order-status-element').show();
    }
    if (options.multipleOrderInvoiceOptions?.taxInfo) {
        $('.tax-info-checkbox').prop('checked', true);
        $('.tax-element').show();
    }
}