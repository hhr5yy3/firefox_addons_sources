function startScript() {
    function interceptNetworkRequests(ee) {
        const open = XMLHttpRequest.prototype.open;
        const send = XMLHttpRequest.prototype.send;


        XMLHttpRequest.prototype.send = function () {
            ee.onSend && ee.onSend(this, arguments);
            return send.apply(this, arguments);
        };

        return ee;
    }

    interceptNetworkRequests({
        onSend: getClaimId
    });
};

function getClaimId(xhr, arguments) {
    try {
        const formData = arguments[0];
        if (formData && formData.toString() === '[object FormData]') {
            new Date(formData.get('id'));
            sessionStorage.setItem('claimId', formData.get('id'))
        }
    } catch (_) {
    }
}

startScript();
