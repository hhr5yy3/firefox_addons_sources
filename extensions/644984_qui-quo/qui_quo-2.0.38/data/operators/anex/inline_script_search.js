function startScript() {
    function interceptNetworkRequests(ee) {
        const send = XMLHttpRequest.prototype.send;

        const isRegularXHR = open.toString().indexOf('native code') !== -1;


        // don't hijack if already hijacked - this will mess up with frameworks like Angular with zones
        // we work if we load first there which we can.
        if (isRegularXHR) {
            XMLHttpRequest.prototype.send = function () {
                if (ee.onLoad) {
                    this.addEventListener('load', () => console.log('XHR LOADED'));
                }
                ee.onSend && ee.onSend(this, arguments);
                return send.apply(this, arguments);
            };
        }
        return ee;
    }

    interceptNetworkRequests({
        onSend: (xhr) => xhr.onload = parseResponse
    });
};

function parseResponse(e) {
    try {
        const responseText = e.currentTarget.responseText;
        const json = JSON.parse(responseText);
        const {prices, state} = json.find(elem => elem.prices);
        prices.forEach((claimDocument) => {
            const option = {
                checkinDt: new Date(claimDocument.hotelCheckIn).toLocaleDateString('ru'),
                nights: claimDocument.nights.toString(),
                extra_nights: claimDocument.nights ? (claimDocument.nights - (claimDocument.hnights || claimDocument.nights)).toString() : "0",
                hotelName: [claimDocument.hotelName, claimDocument.groupStarName].join(' '),
                href: null,
                country: state.name,
                region: claimDocument.hotelTownName,
                roomType: claimDocument.roomName,
                boardType: claimDocument.mealNote,
                accommodation: claimDocument.htPlaceName,
                occupancy: {
                    adultsCount: +claimDocument.adult,
                    childrenCount: +claimDocument.child + claimDocument.infant
                }
            }
            const selector = '[href*="' + claimDocument.cat_Claim + '"]'
            const btns = document.querySelectorAll(selector);
            btns.forEach(btn => btn.dataset.qqOption = JSON.stringify(option));
        })
    } catch (e) {
        return null;
    }
}

startScript();
