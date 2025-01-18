// САМО-тур online бронирование

var OPERATOR_NAME = "TUI";
var OPERATOR_SLETAT_ID = 229;
var DEFAULT_CURRENCY = "National";

function injectTitle() {
    var banner = document.querySelector("#push_window");
    if ( banner && !banner.classList.contains("activePush") ) {
        banner.style.display = "none";
    } else if ( banner && banner.classList.contains("activePush") ) {
        banner.style.display = "block";
    }
    if ( needInjectTitle() )
        addTitle()
}

function getBookingCountry(city_or_country) {
    return city_or_country;
}
