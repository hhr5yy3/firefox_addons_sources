function interceptNetworkRequests(ee) {
    const open = XMLHttpRequest.prototype.open;
    if ( open ) {
        XMLHttpRequest.prototype.open = function () {
            ee.onOpen && ee.onOpen(this, arguments);
            if ( ee.onLoad ) {
                this.addEventListener('load', ee.onLoad.bind(ee));
            }
            if ( ee.onError ) {
                this.addEventListener('error', ee.onError.bind(ee));
            }
            return open.apply(this, arguments);
        };
    }
    return ee;
}

function saveTourId(xhr, args) {
    try {
        if ( xhr && xhr.currentTarget && xhr.currentTarget.response && xhr.currentTarget.responseURL.match(/search.+?results/) ) {
            sessionStorage.setItem('savedSearchResults', xhr.currentTarget.response);
            const dataNode = document.querySelector('#qdata');
            if ( dataNode ) {
                dataNode.textContent = xhr.currentTarget.response;
            }
        }

    } catch (e) {
        console.log(e);
    }
}

interceptNetworkRequests({
    onLoad: saveTourId
});
