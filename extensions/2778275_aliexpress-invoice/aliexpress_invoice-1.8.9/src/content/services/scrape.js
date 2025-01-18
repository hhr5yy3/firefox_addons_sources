function callOrderDetailPage(args) {
    return new Promise((resolve, reject) => {

        let url = args.url;
        if(args?.url && args?.url.startsWith('/')) {
            url = args.CURRENT_URL_DETAILS.protocol + '//' + args.CURRENT_URL_DETAILS.hostname + args.url;
        } 

        if(args?.orderId) {
            url = args.CURRENT_URL_DETAILS.protocol + '//' + args.CURRENT_URL_DETAILS.hostname + "/order_detail.htm?orderId" + args.orderId;
        }

        $.ajax({
			'url': url,
			'type': "GET",
			'success': (data) => {
                console.log("Order url ", url);
				resolve(data);
			},
			'error': (error) => {
				reject(error);
			}
		});
    });
}

function callOrderListPage(args) {
    return new Promise((resolve, reject) => {
        
        let doPageFlag = false;
        let seachCaseFlag = false;

        if(args?.searchOrderNumber || args?.searchProductName || args?.searchSellerName || args?.searchTrackingNumber) {
            seachCaseFlag = true;
        } else {
            doPageFlag = true;
        }

        $.ajax({
			'url': args.CURRENT_URL_DETAILS.url,
            'type': "POST",
            'data': {
                '_csrf_token': args.csrfToken,
                'action': 'OrderListAction',
                '_fm.o._0.o': args.searchOrderNumber ? args.searchOrderNumber : '',
                '_fm.o._0.p': args.searchProductName ? args.searchProductName : '',
                '_fm.o._0.co': args.searchSellerName ? args.searchSellerName : '',
                '_fm.o._0.l': args.searchTrackingNumber ? args.searchTrackingNumber : '',
                'event_submit_do_search_case': seachCaseFlag ? 'do_search_case' : '',
                '_fm.o._0.s': args.dateRangeStart ? args.dateRangeStart : '',
                '_fm.o._0.e': args.dateRangeEnd ? args.dateRangeEnd : '',
                '_fm.o._0.or': args.searchStatus ? args.searchStatus : '',
                'eventSubmitDoPage': doPageFlag ? 'doPage' : '',
                'pageNum': args.currentPage,
                'pageSize': args.pageSize,
                '_fm.o._0.cu': args.currentPage > 1 ? args.currentPage - 1 : '',
            },
			'success': (data) => {
                console.log("Eto ga");
                console.log("Order url", args.CURRENT_URL_DETAILS.url);
				resolve(data);
			},
			'error': (error) => {
                console.log("Error -> ", error);
				reject(error);
			}
		});

        console.log("Napolje")
    });
}

function processOrderDetails(response) {

    if(!response) {
        return false;
    }

    let e_orderId = $(response).find('#order-num-box > .order-no');

    if(!e_orderId || !e_orderId.text().trim().length) {
        return false;
    }

    let e_orderBox = $(response).find('.col-xs-60');

    let e_contactDetails = $(response).find('#user-shipping-list');
    let e_orderItems = $(response).find('.product-table > tbody > .order-bd');
    let e_totalPrice = $(response).find('#tp-order-price-table > tbody > tr > td.product-price');
    let e_totalShippingCost = $(response).find('#tp-order-price-table > tbody > tr > td.shipping-price');
    let e_totalAdjustPrice = $(response).find('#tp-order-price-table > tbody > tr > td.change-price');
    let e_totalDiscount = $(response).find('#tp-order-price-table > tbody > tr > td.discount-price');
    let e_totalTax = $(response).find('#tp-order-price-table > tbody > tr > td.tax-price');
    let e_totalEuTax = $(response).find('span.s-tax__tool');
    let e_totalOrderAmount = $(response).find('#tp-order-price-table > tbody > tr > td.order-price > div');

    let e_tableRefund = $(response).find('.refund-product-table');

    let refund = false;

    let refundOrders = [];

    if(e_tableRefund.length > 0) {
        refund = true;

        let e_refunds = $(e_tableRefund).find('.order-bd');

        if(e_refunds.length) {
            e_refunds.toArray().forEach(order => {

                let e_refundItemImage = $(order).find('.pic.s50 > img');
                let e_refundItemTitle = $(order).find('.desc > .baobei-name');

                let title = e_refundItemTitle ? e_refundItemTitle.attr('title') : null;
                let productImage = e_refundItemImage ? e_refundItemImage.attr('src') : null;

                let e_refundStatusSteps = $(order).find('.refund-status > .ui-step-mission > ol > li');
                let e_refundAmount = $(order).find('.refund-cash');

                let refundAmount = e_refundAmount.length ? extractNumberFromStringAndFormat(e_refundAmount.text().trim()) : null;

                let steps = [];

                e_refundStatusSteps.toArray().forEach(step => {
                    let state = $(step).find('.state');
                    let date = $(step).find('.ui-step-label');

                    if(state && date) {
                        steps.push({
                            state: $(state).text().trim(),
                            date: $(date).text().trim(),
                        });
                    }
                });

                refundOrders.push({
                    title,
                    productImage,
                    refundAmount,
                    steps
                });

            })
        }
    }

    // Eu tax
    if(e_totalEuTax.length > 1) {
        e_totalEuTax = $(e_totalEuTax[0]);
    }

    let e_trackingNumber = $(response).find('.logistics-num');
    let e_trackingRow = $(response).find('.shipping-bd');

    let e_paymentDetails = $(response).find('#tp-buyer-order-table > tbody > tr.fund-bd');
    let paymentDetails = [];

    if(e_paymentDetails.length) {
        paymentDetails = e_paymentDetails.toArray().map(row => {
            let e_total = $(row).find('.pay-c1');
            let e_received = $(row).find('.pay-c2');
            let e_paymentMethod = $(row).find('.pay-c3');
            let e_dateReceived = $(row).find('.pay-c4');

            return {
                total: e_total.length ? extractNumberFromStringAndFormat(e_total.text().trim()) : null,
                received: e_received.length ? extractNumberFromStringAndFormat(e_received.text().trim()) : null,
                paymentMethod: e_paymentMethod.length ? e_paymentMethod.text().trim() : null,
                dateReceived: e_dateReceived.length ? e_dateReceived.text().trim() : null,
            };
        });
    }

    let contact = extractContactInfo(e_contactDetails);

    let orderItems = [];

    if(e_orderItems.length) {
        
        let items = e_orderItems.toArray().map(item => {
            
            let e_productTitle = $(item).find('.baobei-name');
            let e_pricePerItem = $(item).find('.price');
            let e_quantity = $(item).find('.quantity');
            let e_taxPerItem = $(item).find('.amount.tax');
            let e_orderTotal = $(item).find('.amount:not(".tax")');
            let e_properties = $(item).find('span.val');
            let e_shippingType = $(item).find('.ship-type > .order-target');

            let properties = '';

            if(e_properties.length) {
                e_properties.toArray().forEach((property, index) => {
                    index == 0 ? properties += $(property).text().trim() : properties += ',' + $(property).text().trim();
                })
            }

            return {
                productTitle: e_productTitle.length == 1 ? e_productTitle.text().trim() : null,
                pricePerUnit: e_pricePerItem.length == 1 ? extractNumberFromStringAndFormat(e_pricePerItem.text().trim()) : null,
                price: e_orderTotal.length == 1 ? extractNumberFromStringAndFormat(e_orderTotal.text().trim()) : null,
                quantity: e_quantity.length == 1 ? extractNumberFromStringAndFormat(e_quantity.text().trim()) : null,
                unit: e_quantity.length == 1 ? extractUnitFromString(e_quantity.text().trim()) : null,
                tax: e_taxPerItem.length == 1 ? extractNumberFromStringAndFormat(e_taxPerItem.text().trim()) : null,
                properties: properties.length ? properties : null,
                shippingType: e_shippingType.length == 1 ? e_shippingType.text().trim() : null,
            }
        });

        orderItems.push(...items);

    }

    let trackingNumber = null;

    if(e_trackingRow.length && e_trackingNumber.length) {
        if(e_trackingNumber.length == 1) {
            trackingNumber = e_trackingNumber.text().trim();
        } else if(e_trackingNumber.length > 1) {
            if(e_trackingRow.length == e_trackingNumber.length) {

                let multipleTrackingNumbers = [];

                e_trackingNumber.toArray().forEach((_trackingNumber, index) => {
                    if(!$(e_trackingRow[index]).hasClass('line-through')) {
                        multipleTrackingNumbers.push($(_trackingNumber).text().trim())
                    }
                })

                trackingNumber = multipleTrackingNumbers.join(',');
            }
        }
    }

    return {
        contact,
        trackingNumber,
        total: {
            orderAmount: e_totalOrderAmount.length ? extractNumberFromStringAndFormat($(e_totalOrderAmount[0]).text().trim()) : null,
            price: e_totalPrice.length ? extractNumberFromStringAndFormat(e_totalPrice.text().trim()) : null,
            tax: e_totalTax.length ? extractNumberFromStringAndFormat(e_totalTax.text().trim()) : null,
            shippingCost: e_totalShippingCost.length ? extractNumberFromStringAndFormat(e_totalShippingCost.text().trim()) : null,
            adjustPrice: e_totalAdjustPrice.length ? extractNumberPerLineAndSum(e_totalAdjustPrice.text().trim()) : null,
            discount: e_totalDiscount.length ? extractNumberPerLineAndSum(e_totalDiscount.text().trim()) : null, 
            euTax: e_totalEuTax.length ? $(e_totalEuTax.attr('data-amountstr').length) ? extractNumberPerLineAndSum(e_totalEuTax.attr('data-amountstr').trim()) : null : null,
        },
        paymentDetails,
        orderItems,
        refund,
        refundOrders,
    }

}

function processOrderList(response) {

    let e_orders = $(response).find('tbody.order-item-wraper');
    let orders = [];

    if(!e_orders.length) {
        return false;
    }

    e_orders.toArray().forEach(order => {

        let e_orderId = $(order).find('tr.order-head > td.order-info > p.first-row > span.info-body');

        if(!e_orderId.length) {
            return;
        }
        
        let e_orderDetailsUrl = $(order).find('tr.order-head > td.order-info > p.first-row > a.view-detail-link');

        let e_orderDate = $(order).find('tr.order-head > td.order-info > p.second-row > span.info-body');

        let e_seller = $(order).find('tr.order-head > td.store-info > p.first-row > span.info-body');
        let e_sellerId = $(order).find('tr.order-head > td.store-info > p.second-row > a:nth-child(1)');

        let sellerId = null;

        if(e_sellerId && $(e_sellerId).attr('href')) {
            if(e_sellerId.attr('href').split('?')[0]) {
                let tmpSellerId = e_sellerId.attr('href').split('?')[0].split('/');

                if(tmpSellerId.length) {
                    sellerId = tmpSellerId[tmpSellerId.length - 1];
                }
            }
        }

        let e_sellerContact = $(order).find('tr.order-head > td.store-info > p.second-row > a.contact-seller');


        let e_orderStatus = $(order).find('tr.order-body > td.order-status > span.f-left');

        let e_totalOrderAmount = $(order).find('tr.order-head > td.order-amount > div.amount-body > p.amount-num');

        let e_orderItems = $(order).find('.order-body');

        if(!(e_orderItems.length > 0)) {
            // Nema orderItema-a, error ili sta god, samo da je neki return
            console.log("Can not get orders items. Error");
            return;
        }

        let orderItems = [];

        e_orderItems.toArray().forEach(orderItem => {

            let e_productTitle = $(orderItem).find('td.product-sets > div.product-right > p.product-title > a');
            let e_productImageUrl = $(orderItem).find('td.product-sets > div.product-left > a > img');
            let e_price = $(orderItem).find('td.product-sets > div.product-right > p.product-amount > span:nth-child(1)');
            let e_quantity = $(orderItem).find('td.product-sets > div.product-right > p.product-amount > span:nth-child(2)');
            let e_properties = $(orderItem).find('td.product-sets > div.product-right > p.product-property > span > span.val');
            let e_orderItemStatus = $(orderItem).find('td.product-action > span');

            let e_transactionScreenshot = $(order).find('td.product-sets > div.product-right > p.product-snapshot > a');
            let e_productUrl = $(order).find('td.product-sets > div.product-right > p.product-title > a');

            let productTitle = e_productTitle ? e_productTitle.text().trim() : '';
            let productImageUrl = e_productImageUrl ? e_productImageUrl.attr('src') : '';
            let pricePerUnit = e_price ? extractNumberFromStringAndFormat(e_price.text().trim()) : '';
            let currency = e_price ? extractCurrencyFromPrice(e_price.text().trim()) : '';
            let quantity = e_quantity ? extractNumberFromStringAndFormat(e_quantity.text().toLowerCase().replace('x', '').trim()) : '';
            
            let properties = '';

            if(e_properties.length) {
                e_properties.toArray().forEach((property, index) => {
                    index == 0 ? properties += $(property).text().trim() : properties += ',' + $(property).text().trim();
                });
            }

            let orderItemStatus = e_orderItemStatus ? e_orderItemStatus.text().trim() : '';

            let transactionScreenshot = e_transactionScreenshot ? e_transactionScreenshot.attr('href') ? e_transactionScreenshot.attr('href') : null : null;
            let productUrl = e_productUrl ? e_productUrl.attr('href') : null;

            orderItems.push({
                productTitle,
                productImageUrl,
                currency,
                pricePerUnit,
                quantity,
                properties,
                orderItemStatus,
                transactionScreenshot
            });

        });
        
        if(!e_orderId.text().trim()) {
            return;
        }


        let orderObj = new Order({ 
            orderId: e_orderId ? e_orderId.text().trim() : '',
            orderDatePrintFormat: e_orderDate ? e_orderDate.text().trim() : '',
            orderDetailsUrl: e_orderDetailsUrl ? e_orderDetailsUrl.attr('href') : '',
            seller: e_seller ? e_seller.text().trim() : '',
            sellerId,
            sellerContact: e_sellerContact ? e_sellerContact.attr('href') : null,
            status: e_orderStatus ? e_orderStatus.text().trim() : '',
            total: {
                orderAmount: e_totalOrderAmount ? extractNumberFromStringAndFormat(e_totalOrderAmount.text().trim()) : '',
            },
            currency: e_totalOrderAmount ? extractCurrencyFromPrice(e_totalOrderAmount.text().trim()) : '',
        })

        orderObj.setOrderItems(orderItems);

        orders.push(orderObj);
    });

    return orders;

}

function extractNumberFromStringAndFormat(string) {

    if(!string) return false;

    let splitStringBySpace = string.trim().split(' ');

    if(!splitStringBySpace.length) return false;

    let final = '';

    splitStringBySpace.forEach(part => {
        if(part.trim().length) {

            let _tTempNumber = part.replace(/[^0-9.,]/g,"");

            while(_tTempNumber.includes(',')) {
                // ako je decimal zarez
                if(_tTempNumber.indexOf(',') + 1 >= _tTempNumber.length - 3) {
                    _tTempNumber = _tTempNumber.replace(',', '.');
                } else {
                    _tTempNumber = _tTempNumber.replace(',', '');
                }
            }

            if(_tTempNumber && (Number(_tTempNumber) || Number(_tTempNumber) == 0)) {
                final = Number(_tTempNumber);
            }

        }

    });

    return final;

}

function extractCurrencyFromPrice(string) {

    let final = false;

    if(!string) return false;

    let splitStringBySpace = string.split(' ');

    if(!splitStringBySpace) return false;

    let newArray = string.split('').filter((letter, index) => {
        if(letter == ' ') {
            return letter;
        }
        if(!(!isNaN(letter) || letter == '.' || letter == ',')) {
            return letter;
        }
    });

    let newString = newArray.join('').trim();
    let splitNewString = newString.split(' ');
    let maxLength = 0;

    for( let i = 0; i < splitNewString.length; i++ ) {
        if(splitNewString[i].length == 1) {
            final = splitNewString[i]; 
            break;
        } else {
            if(splitNewString[i].length > maxLength) {
                maxLength = splitNewString[i].length;
                final = splitNewString[i];
            }
        }
    }

    return final;
}

function wait(time) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve();
        }, time)
    }))
}

function extractContactInfo(element) {

    
    try {

        let response = {
            name: "",
            address1: "",
            address2: "",
            city: "",
            zip: "",
            province: "",
            country: "",
            phone: "",
            tel: "",
        }
    
        if(!$(element)) {
            return false;
        }

        let elements = $(element).find('li > span');

        console.log("Elements ", elements);

        let _name = $(elements).eq(0).text().trim();
        let _address1 = $(elements).eq(1).text().trim();
        let _tempAddress2 = $(elements).eq(2).text().trim();

        let _adress2 = "";
        let _city = "";
        let _province = "";
        let _country = "";

        let _zip = "";
        let _phone = "";
        let _tel = "";

        let _tempAddressArray = _tempAddress2.split(',');

        if(_tempAddressArray.length == 3) {

            _address2 = "";

            _city = _tempAddressArray[0];
            _province = _tempAddressArray[1];
            _country = _tempAddressArray[2];

            _zip = $(elements).eq(3).text().trim();
            _phone = $(elements).eq(4).text().trim();
            _tel = $(elements).eq(5).text().trim()

        } else {
            
            _tempAddress2 = $(elements).eq(3).text().trim();
            _tempAddressArray = _tempAddress2.split(',');
            
            if(_tempAddressArray.length == 3) {
                
                _address2 = $(elements).eq(2).text().trim();

                _city = _tempAddressArray[0];
                _province = _tempAddressArray[1];
                _country = _tempAddressArray[2]; 

                _zip = $(elements).eq(4).text().trim();
                _phone = $(elements).eq(5).text().trim();
                _tel = $(elements).eq(6).text().trim();

            }

        }

        response.name = _name ? _name.trim() : '';
        response.address1 = _address1 ? _address1.trim() : '';
        response.address2 = _address2 ? _address2.trim() : '';
        response.city = _city ? _city.trim() : '';
        response.province = _province ? _province.trim() : '';
        response.country = _country ? _country.trim() : '';
        response.zip = _zip ? _zip.trim() : '';
        response.phone = _phone ? _phone.trim() : '';
        response.tel = _tel ? _tel.trim() : '';

        return response;
        
    } catch(error) {
        console.log("Error ", error);
        return response;

    }

}

function extractUnitFromString(string) {
    if(!string) {
        return false;
    }

    let splittedString = string.split(' ');
    let final = null;

    splittedString.forEach(part => {
        if(isNaN(part.trim())) {
            final = part.trim();
        }
    });

    return final;

}

function extractNumberPerLineAndSum(text) {
    let splitByLine = text.split("\n");
    let total = 0;

    splitByLine.forEach(line => {
        let number = extractNumberFromStringAndFormat(line.trim());
        
        if(number) { 
            total += number;
        }
    })

    return total;
}

async function scrapePages(validator, startPage, endPage, type) {

    try {

        let options = new Options();
        await options.init();

        console.log("Options ", options);
        startPage ? validator.currentPage = startPage : '';
        endPage ? validator.lastPage = endPage : '';

        if(!validator || typeof(validator) !== 'object') {
            console.log("Check validator. Contact developer.");
            return null;
        }

        let ordersFinal = [];

        validator['CURRENT_URL_DETAILS'] = CURRENT_URL_DETAILS;

        changeModalMessage({ message: "Checking order pages" });
        showModal();

        for(let i = validator.currentPage; i <= validator.lastPage; i++) {

            validator['currentPage'] = i;
            console.log("trenutna strana je", i);

            console.log("Validator1 ", validator);

            let orderListResponse = await callOrderListPage(validator).catch(error => { console.log("Err ", err);throw error });
            

            await wait(1 * 1000);

            if(!orderListResponse) {
                changeModalMessage({ message: 'No response from AliExpress. Please try again.' });
                return;
            }

            let orders = processOrderList(orderListResponse);

            console.log("OrderLists ", orders);

            if(!orders) {
                changeModalMessage({ message: 'No response from AliExpress. Please try again.' });
                return;
            }

            ordersFinal.push(...orders);

            changeModalMessage({ message: "Checking page " + validator['currentPage'] + " of " + validator['lastPage']});

        }

        if(!options.scrapeOrderDetails()) {
            return ordersFinal;
        }

        for(let j = 0; j < ordersFinal.length; j++) {

            if(!ordersFinal[j].orderDetailsUrl) {
                continue;
            }

            let detailResponse = await callOrderDetailPage({ url: ordersFinal[j].orderDetailsUrl, CURRENT_URL_DETAILS }).catch(error => { throw error });

            if(!detailResponse) {
                continue;
            }            
            
            let orderDetails = processOrderDetails(detailResponse);

            ordersFinal[j].updateOrderWithDetailInfo(orderDetails);

            ordersFinal[j].items.forEach((item, index) => {
                item.update(orderDetails.orderItems[index]);
            });

            changeModalMessage({ message: "Collecting order details " + (j + 1) + " of " + ordersFinal.length});

            await wait(1.5*1000);

        }

        return ordersFinal;

    } catch(exception) {
        console.log("Exception ", exception);
        return null;
    }
}