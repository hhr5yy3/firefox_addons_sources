var aliexpressLogo = chrome.extension.getURL('../../logo/aliexpress.png');
var alibabaLogo = chrome.extension.getURL('../../logo/alibaba.png')
var url = window.location.href;

$(document).ready(function() {


    if(!url.includes('aliexpressinvoice=1')) {
        return;
    }

    setInterval(function() {
        cE();
    }, 1000);

    mE();
    aE();

    chrome.storage.local.get(null, function(data) {

        if(data?.singleInvoiceOptions) {

            if(!data?.singleInvoiceOptions?.contactTable) {
                $('.user-shipping').remove();
            }

            if(!data?.singleInvoiceOptions?.logisticsInfo) {
                $('.shipping-section').remove();
            }

            if(!data?.singleInvoiceOptions?.paymentDetails) {
                $('.fund-pnl > .ui-box').eq(1).remove();
            }

            if(!data?.singleInvoiceOptions?.totalAmount) {
                $('.fund-pnl > .ui-box').first().remove();
            }

        }

    });

});

var cE = function() {
    
    $('.top-banner-container').remove();
    $('.top-lighthouse').remove();
    $('.me-header').remove();
    $('.ui-trade-step').remove();
    $('#reminder-section').remove();
    $('#J_xiaomi_dialog').remove();
    $('.ui-tab-content').remove();
    $('.im-contact-seller').remove();
    $('.site-footer').remove();
    $('.footer-copywrite').remove();
    $('#_umfp').remove();
    $('.ui-balloon').remove();

    $('.flush-btn').remove();
    $('.ui-notice-help').remove();
    $('.extern-info').remove();
    $('.view-more-box').remove();
    $('.seller-sign').remove();
    $('.sp-icon').remove();

    $('.view-more-btn').remove();
    $('th.shipping').remove();
    $('th.trade-status').remove();
    $('td.shipping').remove();
    $('td.trade-status').remove();

}

var mE = function() {

    try {

        $('#records-section').append($('#fund-pnl').clone().css({ 'display': 'block' }));
        $('#fund-pnl').first().remove();
        $('#shipping-section').appendTo('#records-section');
        $('.user-shipping').css({ 'background': '#ebf3ff' });
        $('.product-fees').css({ 'background': '#ebf3ff' });
        $('.product-table').css({ 'table-layout': 'auto' });
        $('#order-pnl').css({ 'padding': '0px' });
        $('.baobei-name').css({
            'color': 'black',
        });
        $('.product-fees').css({
            'margin-bottom': '10px',
        });
        $('.me-ui-box').css({
            'border': 'none',
        });
        $('.user-name-text > a').css({
            'color': 'black',
        });

        $('.product-table > colgroup').remove();
        $('.fund-table > colgroup').remove();

        var childParentElements = $('.me-ui-box > div');
        $(childParentElements).first().remove();

        var logisticElements = $('.tracks-list');

        logisticElements.toArray().forEach(function(element) {
            if($(element).hasClass('list-view-more')) {
                $(element).removeClass('list-view-more');
                $(element).css({ 'display': 'block' });
            }
        });
    } catch(exception) {

    }
}

var aE = function() {

    var orderId = $('.order-no').text().trim();
    var orderDateElement = $('.fund-bd > .pay-c4');

    var orderDate = '';

    if($(orderDateElement).text()) {
        orderDate = $(orderDateElement).text().trim();
    }

    $('body').append('<div class="print-invoice-alibill" style="padding-top: 3px;width: 200px;height: 30px;font-size: 1.2em; background-color:#2d4059; color:white;font-weight: bold;text-align: center;position: fixed; top: 50px; right: 0px;cursor: pointer;"><img style="padding-left: 5px; padding-right: 5px;" src="' + chrome.extension.getURL('../../logo/icon16.png') + '" />Print Invoice</div>')

    $('.print-invoice-alibill').click(function() {
        window.print();
    });

    chrome.storage.local.get(null, function(data) {

        console.log(data);
        var seller = '<div style="width: 100%; overflow: auto;border-top: 1px solid gray;padding-top:10px;">' +
        '<div style="display:inline-block; float: left;">' + 
        '<span style="font-size: 1.5em;">' + data?.seller?.name + '</span><br>' + 
        '<span style="font-size: 1.5em;">' + data?.seller?.address + '</span><br>' + 
        '<span style="font-size: 1.5em;">' + data?.seller?.address2 + '</span><br>' + 
        '<span style="font-size: 1.5em;">VAT: ' + (data?.seller?.vat ? 'VAT: ' + data?.seller?.vat : '') + '</span><br>' + 
        '</div>';

        seller += '<div style="display: inline-block; float:right;text-align: right">' + 
        '<span style="font-size: 1.5em;">' + data?.company?.name + '</span><br>' + 
        '<span style="font-size: 1.5em;">' + data?.company?.address + '</span><br>' + 
        '<span style="font-size: 1.5em;">' + data?.company?.address2 + '</span><br>' + 
        '<span style="font-size: 1.5em;">' + (data?.company?.vat ? 'VAT: ' + data?.company?.vat : '') + '</span><br>' + 
        '<span style="font-size: 1.5em;">' + (data?.company?.regNumber ? 'Reg number: ' + data?.company?.regNumber : '') + '</span><br>' + 
        '</div>' + 
        '</div>'

        $('.me-ui-box').prepend(seller);

        var logo = aliexpressLogo;
        if(data?.seller?.logo == 1) {
            logo = alibabaLogo;
        }

        $('.me-ui-box').prepend('<div style="width: 100%; margin-top: 20px;">' + 
        '<div style="display: inline-block; float: left;">' +
        '<img style="width: 200px;" src="' + logo + '" />' +
        '</div>' +
        '<div style="display: inline-block; float:right;text-align: right;">' + 
        '<span style="font-size: 4em;font-weight: bold;">INVOICE</span><br>' +
        '<span style="font-size: 1.2em;">No: ' + orderId + '</span><br>' + 
        '<span style="font-size: 1.2em;">Date: ' + orderDate + '</span><br>' +
        '</div>' + 
        '</div>');
    })
}

