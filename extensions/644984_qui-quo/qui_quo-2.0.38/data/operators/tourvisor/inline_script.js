function interceptNetworkRequests(ee) {
    const open = XMLHttpRequest.prototype.open;
    if (open) {
        XMLHttpRequest.prototype.open = function () {
            ee.onOpen && ee.onOpen(this, arguments);
            if (ee.onLoad) {
                this.addEventListener('load', ee.onLoad.bind(ee));
            }
            if (ee.onError) {
                this.addEventListener('error', ee.onError.bind(ee));
            }
            return open.apply(this, arguments);
        };
    }
    return ee;
}

function saveTourId(_, args) {
    try {
        const [m, url] = args;
        if (!url.match('tourid')) {
            return;
        }
        const addClicked = sessionStorage.getItem('addClicked');
        const id = getParameterByName('tourid', url);
        if (addClicked && id) {
            sessionStorage.setItem('tourId', id);
        }
    } catch (e) {
        console.log(e);
    }
}

function getParameterByName(name, url) {
    if (!url) {
        return;
    }
    const match = url.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return match && decodeURIComponent(match[1]);
}

interceptNetworkRequests({
    onOpen: saveTourId
});
