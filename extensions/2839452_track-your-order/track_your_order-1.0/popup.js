$('.loader-wrapper').hide();

$("#trackerSearch").keyup(function () {
    const val = this.value.trim()
    getCarrier(val);
});

$("#trackerSearch").keydown(function (e) {
    if (e.which == 13) {
        inputEvent();
        $("#trackerSearch").val("");
    }
});

$("#searchBtn").click(function (e) {
    inputEvent();
    $("#trackerSearch").val("");
});

$(".backButton").click(function (e) {
    $('.content_first').show();
    $('.content_second').hide();
    $('.loader-wrapper').hide();
    $('.backButton').hide();
    $('#alert').hide();
});


// get carrier code to tracking order
function getCarrier(trackingNumber) {
    var courierCode
    if (
        /^(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)$/.test(trackingNumber) === true ||
        /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)|(\b\d{26}\b)| ^E\D{1}\d{9}\D{2}$|^9\d{15,21}$| ^91[0-9]+$| ^[A-Za-z]{2}[0-9]+US$/i.test(trackingNumber) === true ||
        /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/.test(trackingNumber) === true ||
        /^91[0-9]+$/.test(trackingNumber) === true ||
        /^[A-Za-z]{2}[0-9]+US$/.test(trackingNumber) === true ||
        /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)|(\b\d{26}\b)| ^E\D{1}\d{9}\D{2}$|^9\d{15,21}$| ^91[0-9]+$| ^[A-Za-z]{2}[0-9]+US$/i.test(trackingNumber === true)
    ) {
        // for usps
        carrierName = "USPS"
        courierCode = 'usps'
        trackingId = document.getElementById('trackerSearch').value;
        document.getElementById('carrierNameInput').value = courierCode;
    } else if (
        /(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/.test(trackingNumber) === true ||
        /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/.test(trackingNumber) === true ||
        /^[0-9]{15}$/.test(trackingNumber) === true
    ) {
        // for fedex
        carrierName = "Fedex"
        courierCode = 'fedex'
        trackingId = document.getElementById('trackerSearch').value;
        document.getElementById('carrierNameInput').value = courierCode;
    } else if (
        /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/.test(trackingNumber) === true ||
        /^[kKJj]{1}[0-9]{10}$/.test(trackingNumber) === true
    ) {
        // for ups
        carrierName = "UPS"
        courierCode = 'ups'
        trackingId = document.getElementById('trackerSearch').value;
        document.getElementById('carrierNameInput').value = courierCode;
    } else {
        // for not found
        carrierName = "Carrier Not Found"
        courierCode = 'Not found'
        trackingId = document.getElementById('trackerSearch').value;
        document.getElementById('carrierNameInput').value = courierCode;
    }
}

function inputEvent() {
    const val = $('#trackerSearch').val().trim();
    const carriers_code = $('#carrierNameInput').val();
    if (val.length > 0) {
        if (carriers_code == 'Not found') {
            $('#alert').show();
            const appendHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Alert : </strong> Tracking number is invalid.
            </div>
            `
            var cleanAlertHtml = DOMPurify.sanitize(appendHTML, { SAFE_FOR_TEMPLATES: true });
            $('#alert').html(cleanAlertHtml);
        } else {
            $('.content_first').hide();
            $('.content_second').show();
            $('.loader-wrapper').show();
            $('#alert').hide();
            callApi();
        }
    } else {
        $('#alert').show();
        const appendHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Alert : </strong> Please enter tracking number.
        </div>
        `
        var cleanAlertHtml = DOMPurify.sanitize(appendHTML, { SAFE_FOR_TEMPLATES: true });
        $('#alert').html(cleanAlertHtml);
    }
}

async function callApi() {
    $('#tracking').html('');
    const carriers_code = $('#carrierNameInput').val();
    const tracking_number = $('#trackerSearch').val().trim();
    const getCarriersApi = `https://trackyourorders.net/admin/public/check-carriers?carrier_code=${carriers_code}&tracking_number=${tracking_number}`;
    try {
        // axios method
        await axios.get(getCarriersApi)
            .then(function (response) {
                const res = JSON.parse(response.data.data);
                $('.backButton').show();
                $('.loader-wrapper').hide();
                console.log("res :: >", res);
                if (res?.events.length == 0) {
                    const appendHTML = `
                    <div class="col-12 text-center">
                    <img class="text-center nofoundImage" src="assets/image/noFound.png" />
                      <p class="text-center nofoundTxt">${res?.carrier_status_description}</p>
                    </div>
                    `
                    var cleanAlertHtml = DOMPurify.sanitize(appendHTML, { SAFE_FOR_TEMPLATES: true });
                    $('#tracking').append(cleanAlertHtml);
                } else {
                    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var getDateFromData = new Date(res?.actual_delivery_date);
                    const dayName = weekday[getDateFromData.getDay()];
                    const monthName = month[getDateFromData.getMonth()];
                    const date = getDateFromData.getDate();
                    const appendHTML = `
                <div class="col-md-6 col-12">
                  <div class="main">
                      <h5 class="text-capitalize title">tracking details</h5>
                      <p class="text-capitalize subtitle m-0">Package Status</p>
                      <p class="desc">${res?.carrier_status_description}</p>
                      <div class="box text-center">
                          <p class="m-0 date">${dayName} ${date}, ${monthName}</p>
                          <p class="status text-capitalize m-0">${res?.status_description}</p>
                      </div>
                      <div class="details">
                          <h6 class="text-capitalize">order details</h6>
                          <ul>
                              <li class="text-capitalize">tracking number : ${res?.tracking_number}</li>
                              <li class="text-capitalize">carrier code : <span
                                      class="text-lowercase">${res?.carrier_code}</span></li>
                          </ul>
                      </div>
                      <div class="carrier_img">
                      <img src="assets/image/logo/${res?.carrier_code}.png" alt="">
                      </div>
                  </div>
                </div>
                <div class="line">
                    <hr />
                </div>
                <div class="col-md-6 col-12" id="forScroll">
                    <h6 class="text-capitalize">order status</h6>
                    <ul class="timeline"></ul>
                </div>
                `
                    var cleanAlertHtml = DOMPurify.sanitize(appendHTML, { SAFE_FOR_TEMPLATES: true });
                    $('#tracking').append(cleanAlertHtml)
                    // oredre status append from here
                    res?.events.map((item) => {
                        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var getDateFromData = new Date(item?.occurred_at);
                        const dayName = weekday[getDateFromData.getDay()];
                        const monthName = month[getDateFromData.getMonth()];
                        const date = getDateFromData.getDate();
                        const appendHTML = `
                        <li class="event">
                            <h3>${item?.city_locality}</h3>
                            <p class="dateForshow">${dayName} ${date}, ${monthName}</p>
                            <p>${item?.description}</p>
                        </li>
                        `
                        var cleanAlertHtml = DOMPurify.sanitize(appendHTML, { SAFE_FOR_TEMPLATES: true });
                        $('.timeline').append(cleanAlertHtml);
                    });
                };
            })
    } catch (error) {
        console.log("error", error);
        $('.loader-wrapper').hide();
        $('.backButton').show();
        //   commonHide();
        // bad request HTML
        const appendHTML = `
    <div class="col-12 text-center">
      <p class="text-center nofoundTxt">${error.response.status}</p>
      <p class="text-center nofoundTxt">${error.response.statusText}</p>
      <p class="text-center nofoundTxt">Please go back and try again .!</p>
      <button class="btn" id="backBtn2">Back</button>
    </div>
    `
        var cleanAlertHtml = DOMPurify.sanitize(appendHTML, { SAFE_FOR_TEMPLATES: true });
        $('#tracking').append(cleanAlertHtml);
    }
}

