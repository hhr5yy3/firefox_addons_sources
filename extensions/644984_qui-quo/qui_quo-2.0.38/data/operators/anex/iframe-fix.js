function collectIframesAndAttachjReinjectEvents() {
    if ( typeof $$ !== 'undefined') {

        const iframes = $$(`iframe.search-iframe,
                                   iframe#samo, iframe#frmSearchTour, iframe.search-page__iframe,
                                                          .hotelframe iframe.cmn-border-none, .samobookingframe iframe.cmn-border-none,
                                                           iframe[src*="https://new.allkurort.su"], iframe[src*="https://online1.calypsotour.com"],
                                                           iframe[id*="stellsPartner"], iframe[src*="tourclient"], iframe[src*="online.xclusivetravel.com"],
                                                           iframe[src*="https://account.mail.ru/login"], iframe#pegasys, iframe#quote-iframe, iframe[src*="search.anextour.lv"]`);
        iframes.forEach(iframe => {
            iframe.onload = () => {
                sendMessageToAddon("reinject content-scripts");
                iframe.setAttribute("qq-injected", "true");
            };
            if ( !iframe.getAttribute("qq-injected",) ) {
                sendMessageToAddon("reinject content-scripts");
                iframe.setAttribute("qq-injected", "true");
            }
        })
    }
}

setInterval(collectIframesAndAttachjReinjectEvents, 1000);
