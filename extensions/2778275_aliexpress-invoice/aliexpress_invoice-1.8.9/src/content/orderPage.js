$(document).ready(function() {

    var orders = $('.order-item-wraper');

    if(orders.length) {
        $(orders).toArray().forEach(function(order) {

            var link = $(order).find('.view-detail-link');
            
            if(link.length) {
                link = $(link).attr('href').trim() + '&aliexpressinvoice=1';
            } else {
                link = '#';
            }
            
            var addToCartButton = $(order).find('.order-action');

            if(addToCartButton) {
                $(addToCartButton).append('<a target="_blank" href="' + link + '"><div class="alibill-invoice-button" ><img style="padding-right: 5px;" src="' + chrome.extension.getURL('../../logo/icon16.png') + '"/>Invoice</div></a>')
            }
        });
    }

    $('.col-xs-60').prepend(optionsMenu());
    $('body').prepend(modal());

    attachUiListeners()

    $('.generate-invoice').click(async() => {

        let validator = getterSearchDataAndValidate();

        let orders = await scrapePages(validator);

        if(!orders?.length) {
            changeModalMessage('Can not get orders from AliExpress. Please try again or contact developer on carymolinaro12@gmail.com');
            return;
        }

        chrome.storage.local.set({
            orders,
        }, () => {
            // Callback

            if(chrome?.runtime?.lastError) {
                // Error modal
                changeModalMessage('Error while using local storage. Please contact developer kiril.abdulov@gmail.com');
                return;
            }

            hideModal();
            chrome.runtime.sendMessage({
                type: 'OPEN_GROUP_INVOICE',
            })
            return;
        })
        
    })
});

let getterSearchDataAndValidate = (ignoreValidate) => {

    $('#double-calendar').focus();
    $('#double-calendar').blur();

    const csrfToken = $('input[name="_csrf_token"]').attr('value');

    const searchOrderNumber = $('#order-no').val() ? $('#order-no').val() : '';
    const searchProductName = $('#product-name').val() ? $('#product-name').val() : '';
    const searchSellerName = $('#buyer-name').val() ? $('#buyer-name').val() : '';
    const searchTrackingNumber = $('#shipping-no').val() ? $('#shipping-no').val() : '';
    const searchStatus = $('#order-status').val() ? $('#order-status').val() : '';

    let dateRangeEnd = $('.ui-calendar-end').find('.focused-element').attr('title') ? $('.ui-calendar-end').find('.focused-element').attr('title') : '';
    let dateRangeStart = $('.ui-calendar-start').find('.focused-element').attr('title') ? $('.ui-calendar-start').find('.focused-element').attr('title') : '';

    let pageSize = $('#simple-pager-page-size').val();

    let e_pageInfo = $('#simple-pager > div > label');

    let currentPage = e_pageInfo ? Number(e_pageInfo.text().trim().split('/')[0]) : Number('1');
    let lastPage = e_pageInfo ? Number(e_pageInfo.text().trim().split('/')[1]) : '';
    
    let validator = validateDataBeforeRequest({
        csrfToken,
        searchOrderNumber,
        searchProductName,
        searchSellerName,
        searchTrackingNumber,
        searchStatus,
        dateRangeStart,
        dateRangeEnd,
        pageSize,
        currentPage,
        lastPage
    }, ignoreValidate);

    return validator;

};

