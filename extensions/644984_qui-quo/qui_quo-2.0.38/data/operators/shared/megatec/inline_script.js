function startScript() {
    if (window.actions) {
        localStorage.setItem('apiUrl', window.actions.calculateReservation);
        localStorage.setItem('apiFlightUrl', window.actions.rebuildFlights);
        localStorage.setItem('apiTourUrl', window.actions.getBasketVariant);

    }
    var send = window.XMLHttpRequest.prototype.send;
    var open = window.XMLHttpRequest.prototype.open;

    function openReplacement(method, url, async, user, password) {
        if (url && url.match('CalculateReservation')) {
            localStorage.setItem('apiUrl', url)
        }
        if (url && url.match('RebuildFlights')) {
            localStorage.setItem('apiFlightUrl', url)
        }
        return open.apply(this, arguments);
    }

    function sendReplacement(data) {
        if (this.onreadystatechange) {
            this._onreadystatechange = this.onreadystatechange;
        }
        saveData(data);

        return send.apply(this, arguments);
    }

    function saveData(data) {
        try {

            const parsedData = data ? JSON.parse(data) : null;
            if (parsedData && parsedData.tourProgramId) {
                sessionStorage.setItem(JSON.parse(data).tourProgramId, data);
            }

            if (parsedData && parsedData.flights) {
                sessionStorage.setItem("flight", data);
            }
        } catch (e) {
            return null;
        }

    }

    window.XMLHttpRequest.prototype.send = sendReplacement;
    window.XMLHttpRequest.prototype.open = openReplacement;
    setTimeout(startScript, 1000);
};
startScript();
