updateCurrentDateTime2()
window.setInterval(updateCurrentDateTime2, 1000);


function updateCurrentDateTime2() {
    var date = getCurrentTime();
    $('#custtime').html(date.value + ' ' + date.unit);
    $('#custdate').html(customDate2(new Date()));
    $('.currenttime .sep').css('display', 'inline-block');
}

function getCurrentTime(val) {
    var date = val || new Date();
    var format = {value: '', unit: ''};
    var tempDate = changeTimeFormatTo12Hr(date);
    format.value = tempDate.hours + ':' + tempDate.minutes;
    format.unit = tempDate.unit;
    format.hours = tempDate.hours;
    format.minutes = tempDate.minutes;
    return format;
}

function changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes =
            date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes();
    var unit = getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit,
    };
}

function getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : 'pm';
}

function customDate2(date) {
    var monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        wekdayName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
    return (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    );
}


const App = {


    $: {
        unitSection: document.querySelector('.unit-section-wrap'),
        currencySection: document.querySelector('.currency-section-wrap'),
        tabs: document.querySelectorAll('.tab'),
        dropdownSelect: document.querySelectorAll('.specs-display-dropdown'),
        dropdownOptionSelect: document.querySelectorAll('.specs-dropdown-options p'),
        inputValueSelect: document.querySelectorAll('.metricSection input'),
        fromValueSelect: document.querySelectorAll('.from-value'),
        toValueSelect: document.querySelectorAll('.to-value'),
        interchangeLogo: document.querySelectorAll('.interchange-logo'),
        inputElements: document.querySelectorAll('input'),
        configuration: {
            direction: "left",
            activeSection: "",
            activeDropdown: "",
            activeDropdownText: "",
            fromValue: null,
            toValue: null,
            dropdownSetting: {
                temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
                area: ["Square mile", "Square kilometer", "Square meter", "Square yard", "Square foot", "Square inch", "Hectare", "Acre"],
                length: ["Mile", "Kilometer", "Meter", "Centimeter", "Millimeter", "Micrometer", "Nanometer", "Yard", "Foot","Inch","Nautical Mile"],
                volume: ["US liquid gallon", "Liter", "Milliliter", "US liquid quart", "US liquid pint", "US legal cup", "US fluid ounce", "US tablespoon", "US teaspoon", "Cubic meter", "Imperial gallon", "Imperial liquid quart", "Imperial liquid pint", "Imperial legal cup", "Imperial fluid ounce", "Imperial tablespoon", "Imperial teaspoon", "Cubic foot", "Cubic inch"],
                mass: ["Pound", "Kilogram", "Gram", "Tonne", "Milligram", "Microgram", "Imperial ton", "US ton", "Stone", "Ounce"],
                speed: ["Miles per hour", "Kilometer per hour", "Meter per second", "Foot per second", "Knot"],
                time: ["Hour", "Minute", "Second", "Nanosecond", "Microsecond", "Millisecond", "Day", "Week", "Month", "Year", "Decade", "Century"],
                currency: []
            },
            prevActiveSection: '',
            prevActiveFn() {
                this.prevActiveSection = this.activeSection;
            }
        },
        keyMaps: {
            "temparature-acc": "temperature",
            "length-acc": "length",
            "area-acc": "area",
            "volume-acc": "volume",
            "mass-acc": "mass",
            "speed-acc": "speed",
            "time-acc": "time",
            "currency-acc": "currency"
        },
        mapObject: {
            functionMap: new Map()
        },
        formulas: {
            temperature: {
                'c_f': (selVal) => parseFloat(selVal * (9 / 5) + 32),
                'c_k': (selVal) => parseFloat(selVal + 273.15),
                'f_k': (selVal) => parseFloat(((selVal - 32) * 5) / 9 + 273.15),
                'f_c': (selVal) => parseFloat(((selVal - 32) * 5) / 9),
                'k_c': (selVal) => parseFloat(selVal - 273.15),
                'k_f': (selVal) => parseFloat(((selVal - 273.15) * 9) / 5 + 32),
            },
            area: {
                'sqkm_sqmt': (selVal) => parseFloat(selVal * 1e6),
                'sqkm_sqmil': (selVal) => parseFloat(selVal / 2.59),
                'sqkm_sqyd': (selVal) => parseFloat(selVal * 1.196e6),
                'sqkm_sqft': (selVal) => parseFloat(selVal * 1.076e7),
                'sqkm_sqin': (selVal) => parseFloat(selVal * 1.55e9),
                'sqkm_hct': (selVal) => parseFloat(selVal * 100),
                'sqkm_acr': (selVal) => parseFloat(selVal * 247.105),
                'sqmt_sqkm': (selVal) => parseFloat(selVal / 1e6),
                'sqmt_sqmil': (selVal) => parseFloat(selVal / 2.59e6),
                'sqmt_sqyd': (selVal) => parseFloat(selVal * 1.196),
                'sqmt_sqft': (selVal) => parseFloat(selVal * 10.764),
                'sqmt_sqin': (selVal) => parseFloat(selVal * 1550.003),
                'sqmt_hct': (selVal) => parseFloat(selVal / 10000),
                'sqmt_acr': (selVal) => parseFloat(selVal / 4046.856),
                'sqmil_sqkm': (selVal) => parseFloat(selVal * 2.59),
                'sqmil_sqmt': (selVal) => parseFloat(selVal * 2.59e6),
                'sqmil_sqyd': (selVal) => parseFloat(selVal * 3.098e6),
                'sqmil_sqft': (selVal) => parseFloat(selVal * 2.788e7),
                'sqmil_sqin': (selVal) => parseFloat(selVal * 4.014e9),
                'sqmil_hct': (selVal) => parseFloat(selVal * 258.999),
                'sqmil_acr': (selVal) => parseFloat(selVal * 640),
                'sqyd_sqkm': (selVal) => parseFloat(selVal / 1.196e6),
                'sqyd_sqmt': (selVal) => parseFloat(selVal / 1.196),
                'sqyd_sqmil': (selVal) => parseFloat(selVal / 3.098e6),
                'sqyd_sqft': (selVal) => parseFloat(selVal * 9),
                'sqyd_sqin': (selVal) => parseFloat(selVal * 1296),
                'sqyd_hct': (selVal) => parseFloat(selVal / 11959.9),
                'sqyd_acr': (selVal) => parseFloat(selVal / 4840),
                'sqft_sqkm': (selVal) => parseFloat(selVal / 1.076e7),
                'sqft_sqmt': (selVal) => parseFloat(selVal / 10.764),
                'sqft_sqmil': (selVal) => parseFloat(selVal / 2.788e7),
                'sqft_sqyd': (selVal) => parseFloat(selVal / 9),
                'sqft_sqin': (selVal) => parseFloat(selVal * 144),
                'sqft_hct': (selVal) => parseFloat(selVal / 107639.104),
                'sqft_acr': (selVal) => parseFloat(selVal / 43560),
                'sqin_sqkm': (selVal) => parseFloat(selVal / 1.55e9),
                'sqin_sqmt': (selVal) => parseFloat(selVal / 1550.003),
                'sqin_sqmil': (selVal) => parseFloat(selVal / 4.014e9),
                'sqin_sqyd': (selVal) => parseFloat(selVal / 1296),
                'sqin_sqft': (selVal) => parseFloat(selVal / 144),
                'sqin_hct': (selVal) => parseFloat(selVal / 1.55e7),
                'sqin_acr': (selVal) => parseFloat(selVal / 6.273e6),
                'hct_sqkm': (selVal) => parseFloat(selVal / 100),
                'hct_sqmt': (selVal) => parseFloat(selVal * 10000),
                'hct_sqmil': (selVal) => parseFloat(selVal / 258.999),
                'hct_sqyd': (selVal) => parseFloat(selVal * 11959.9),
                'hct_sqft': (selVal) => parseFloat(selVal * 107639.104),
                'hct_sqin': (selVal) => parseFloat(selVal * 1.55e7),
                'hct_acr': (selVal) => parseFloat(selVal * 2.471),
                'acr_sqkm': (selVal) => parseFloat(selVal / 247.105),
                'acr_sqmt': (selVal) => parseFloat(selVal * 4046.856),
                'acr_sqmil': (selVal) => parseFloat(selVal / 640),
                'acr_sqyd': (selVal) => parseFloat(selVal * 4840),
                'acr_sqft': (selVal) => parseFloat(selVal * 43560),
                'acr_sqin': (selVal) => parseFloat(selVal * 6.273e6),
                'acr_hct': (selVal) =>  parseFloat(selVal / 2.471)
            },
            speed: {
                'mph_ftps': (selVal) => parseFloat(selVal * 1.467),
                'mph_mtps': (selVal) => parseFloat(selVal / 2.237),
                'mph_kmph': (selVal) => parseFloat(selVal * 1.609),
                'mph_knt': (selVal) => parseFloat(selVal / 1.151),
                'ftps_mph': (selVal) => parseFloat(selVal / 1.467),
                'ftps_mtps': (selVal) => parseFloat(selVal / 3.281),
                'ftps_kmph': (selVal) => parseFloat(selVal * 1.097),
                'ftps_knt': (selVal) => parseFloat(selVal / 1.688),
                'mtps_mph': (selVal) => parseFloat(selVal * 2.237),
                'mtps_ftps': (selVal) => parseFloat(selVal * 3.281),
                'mtps_kmph': (selVal) => parseFloat(selVal * 3.6),
                'mtps_knt': (selVal) => parseFloat(selVal * 1.944),
                'kmph_mph': (selVal) => parseFloat(selVal / 1.609),
                'kmph_ftps': (selVal) => parseFloat(selVal / 1.097),
                'kmph_mtps': (selVal) => parseFloat(selVal / 3.6),
                'kmph_knt': (selVal) => parseFloat(selVal / 1.852),
                'knt_mph': (selVal) => parseFloat(selVal * 1.151),
                'knt_ftps': (selVal) => parseFloat(selVal * 1.688),
                'knt_mtps': (selVal) => parseFloat(selVal / 1.944),
                'knt_kmph': (selVal) => parseFloat(selVal * 1.852),
            },
            length: {
                'mt_cm': (selVal) => parseFloat(selVal * 100),
                'mt_km': (selVal) => parseFloat(selVal / 1000),
                'mt_mm': (selVal) => parseFloat(selVal * 1000),
                'mt_micm': (selVal) => parseFloat(selVal * 1e6),
                'mt_nmt': (selVal) => parseFloat(selVal * 1e9),
                'mt_mil': (selVal) => parseFloat(selVal / 1609.344),
                'mt_yd': (selVal) => parseFloat(selVal * 1.094),
                'mt_ft': (selVal) => parseFloat(selVal * 3.281),
                'mt_in': (selVal) => parseFloat(selVal * 39.37),
                'mt_ntmil': (selVal) => parseFloat(selVal / 1852),
                'km_mt': (selVal) => parseFloat(selVal * 1000),
                'km_cm': (selVal) => parseFloat(selVal * 100000),
                'km_mm': (selVal) => parseFloat(selVal * 1e6),
                'km_micm': (selVal) => parseFloat(selVal * 1e9),
                'km_nmt': (selVal) => parseFloat(selVal * 1e12),
                'km_mil': (selVal) => parseFloat(selVal / 1.609),
                'km_yd': (selVal) => parseFloat(selVal * 1093.613),
                'km_ft': (selVal) => parseFloat(selVal * 3280.84),
                'km_in': (selVal) => parseFloat(selVal * 39370.079),
                'km_ntmil': (selVal) => parseFloat(selVal / 1.852),
                'cm_km': (selVal) => parseFloat(selVal / 1000000),
                'cm_mt': (selVal) => parseFloat(selVal / 100),
                'cm_mm': (selVal) => parseFloat(selVal * 10),
                'cm_micm': (selVal) => parseFloat(selVal * 10000),
                'cm_nmt': (selVal) => parseFloat(selVal * 1e7),
                'cm_yd': (selVal) => parseFloat(selVal / 91.44),
                'cm_ft': (selVal) => parseFloat(selVal / 30.48),
                'cm_in': (selVal) => parseFloat(selVal / 2.54),
                'cm_mil': (selVal) => parseFloat(selVal / 160934.4),
                'cm_ntmil': (selVal) => parseFloat(selVal / 185200),
                'mm_km': (selVal) => parseFloat(selVal / 1e6),
                'mm_mt': (selVal) => parseFloat(selVal / 1000),
                'mm_cm': (selVal) => parseFloat(selVal / 10),
                'mm_micm': (selVal) => parseFloat(selVal * 1000),
                'mm_nmt': (selVal) => parseFloat(selVal * 1e6),
                'mm_mil': (selVal) => parseFloat(selVal / 1.609e6),
                'mm_yd': (selVal) => parseFloat(selVal / 914.4),
                'mm_ft': (selVal) => parseFloat(selVal / 304.8),
                'mm_in': (selVal) => parseFloat(selVal / 25.4),
                'mm_ntmil': (selVal) => parseFloat(selVal / 1.852e6),
                'micm_km': (selVal) => parseFloat(selVal / 1e9),
                'micm_mt': (selVal) => parseFloat(selVal / 1e6),
                'micm_cm': (selVal) => parseFloat(selVal / 10000),
                'micm_mm': (selVal) => parseFloat(selVal / 1000),
                'micm_nmt': (selVal) => parseFloat(selVal * 1000),
                'micm_mil': (selVal) => parseFloat(selVal / 1.609e9),
                'micm_yd': (selVal) => parseFloat(selVal / 914400),
                'micm_ft': (selVal) => parseFloat(selVal / 304800),
                'micm_in': (selVal) => parseFloat(selVal / 25400),
                'micm_ntmil': (selVal) => parseFloat(selVal / 1.852e9),
                'nmt_km': (selVal) => parseFloat(selVal / 1e12),
                'nmt_mt': (selVal) => parseFloat(selVal / 1e9),
                'nmt_cm': (selVal) => parseFloat(selVal / 1e7),
                'nmt_mm': (selVal) => parseFloat(selVal / 1e6),
                'nmt_micm': (selVal) => parseFloat(selVal / 1000),
                'nmt_mil': (selVal) => parseFloat(selVal / 1.609e12),
                'nmt_yd': (selVal) => parseFloat(selVal / 9.144e8),
                'nmt_ft': (selVal) => parseFloat(selVal / 3.048e8),
                'nmt_in': (selVal) => parseFloat(selVal / 2.54e7),
                'nmt_ntmil': (selVal) => parseFloat(selVal / 1.852e12),
                'mil_km': (selVal) => parseFloat(selVal * 1.609),
                'mil_mt': (selVal) => parseFloat(selVal * 1609.344),
                'mil_cm': (selVal) => parseFloat(selVal * 160934.4),
                'mil_mm': (selVal) => parseFloat(selVal * 1.609e6),
                'mil_micm': (selVal) => parseFloat(selVal * 1.609e9),
                'mil_nmt': (selVal) => parseFloat(selVal * 1.609e12),
                'mil_yd': (selVal) => parseFloat(selVal * 1760),
                'mil_ft': (selVal) => parseFloat(selVal * 5280),
                'mil_in': (selVal) => parseFloat(selVal * 63360),
                'mil_ntmil': (selVal) => parseFloat(selVal / 1.151),
                'yd_km': (selVal) => parseFloat(selVal / 1093.613),
                'yd_mt': (selVal) => parseFloat(selVal / 1.094),
                'yd_cm': (selVal) => parseFloat(selVal * 91.44),
                'yd_mm': (selVal) => parseFloat(selVal * 914.4),
                'yd_micm': (selVal) => parseFloat(selVal * 914400),
                'yd_nmt': (selVal) => parseFloat(selVal * 9.144e8),
                'yd_mil': (selVal) => parseFloat(selVal / 1760),
                'yd_ft': (selVal) => parseFloat(selVal * 3),
                'yd_in': (selVal) => parseFloat(selVal * 36),
                'yd_ntmil': (selVal) => parseFloat(selVal / 2025.372),
                'ft_km': (selVal) => parseFloat(selVal / 3280.84),
                'ft_mt': (selVal) => parseFloat(selVal / 3.281),
                'ft_cm': (selVal) => parseFloat(selVal * 30.48),
                'ft_mm': (selVal) => parseFloat(selVal * 304.8),
                'ft_micm': (selVal) => parseFloat(selVal * 304800),
                'ft_nmt': (selVal) => parseFloat(selVal * 3.048e8),
                'ft_mil': (selVal) => parseFloat(selVal / 5280),
                'ft_yd': (selVal) => parseFloat(selVal / 3),
                'ft_in': (selVal) => parseFloat(selVal * 12),
                'ft_ntmil': (selVal) => parseFloat(selVal / 6076.115),
                'in_km': (selVal) => parseFloat(selVal * 2.54e-5),
                'in_mt': (selVal) => parseFloat(selVal / 39.37),
                'in_cm': (selVal) => parseFloat(selVal * 2.54),
                'in_mm': (selVal) => parseFloat(selVal * 25.4),
                'in_micm': (selVal) => parseFloat(selVal * 25400),
                'in_nmt': (selVal) => parseFloat(selVal * 2.54e7),
                'in_mil': (selVal) => parseFloat(selVal / 63360),
                'in_yd': (selVal) => parseFloat(selVal / 36),
                'in_ft': (selVal) => parseFloat(selVal / 12),
                'in_ntmil': (selVal) => parseFloat(selVal / 72913.386),
                'ntmil_km': (selVal) => parseFloat(selVal * 1.852),
                'ntmil_mt': (selVal) => parseFloat(selVal * 1852),
                'ntmil_cm': (selVal) => parseFloat(selVal * 185200),
                'ntmil_mm': (selVal) => parseFloat(selVal * 1.852e6),
                'ntmil_micm': (selVal) => parseFloat(selVal * 1.852e9),
                'ntmil_nmt': (selVal) => parseFloat(selVal * 1.852e12),
                'ntmil_mil': (selVal) => parseFloat(selVal * 1.151),
                'ntmil_yd': (selVal) => parseFloat(selVal * 2025.372),
                'ntmil_ft': (selVal) => parseFloat(selVal * 6076.115),
                'ntmil_in': (selVal) => parseFloat(selVal * 72913.386),
            },
            volume: {
                'uslgal_uslqt': (selVal) => parseFloat(selVal * 4),
                'uslgal_uslpt': (selVal) => parseFloat(selVal * 8),
                'uslgal_uslgcp': (selVal) => parseFloat(selVal * 15.773),
                'uslgal_usflonc': (selVal) => parseFloat(selVal * 128),
                'uslgal_ustbsp': (selVal) => parseFloat(selVal * 256),
                'uslgal_ustsp': (selVal) => parseFloat(selVal * 768),
                'uslgal_cumt': (selVal) => parseFloat(selVal / 264.172),
                'uslgal_lt': (selVal) => parseFloat(selVal * 3.785),
                'uslgal_mlt': (selVal) => parseFloat(selVal * 3785.412),
                'uslgal_impgal': (selVal) => parseFloat(selVal / 1.201),
                'uslgal_impqt': (selVal) => parseFloat(selVal * 3.331),
                'uslgal_imppt': (selVal) => parseFloat(selVal * 6.661),
                'uslgal_implgcp': (selVal) => parseFloat(selVal * 13.323),
                'uslgal_impflonc': (selVal) => parseFloat(selVal * 133.228),
                'uslgal_imptbsp': (selVal) => parseFloat(selVal * 213.165),
                'uslgal_imptsp': (selVal) => parseFloat(selVal * 639.494),
                'uslgal_cuft': (selVal) => parseFloat(selVal / 7.481),
                'uslgal_cuin': (selVal) => parseFloat(selVal * 231),
                //
                'uslqt_uslgal': (selVal) => parseFloat(selVal / 4),
                'uslqt_uslpt': (selVal) => parseFloat(selVal * 2),
                'uslqt_uslgcp': (selVal) => parseFloat(selVal * 3.943),
                'uslqt_usflonc': (selVal) => parseFloat(selVal * 32),
                'uslqt_ustbsp': (selVal) => parseFloat(selVal * 64),
                'uslqt_ustsp': (selVal) => parseFloat(selVal * 192),
                'uslqt_cumt': (selVal) => parseFloat(selVal / 1056.688),
                'uslqt_lt': (selVal) => parseFloat(selVal / 1.057),
                'uslqt_mlt': (selVal) => parseFloat(selVal * 946.353),
                'uslqt_impgal': (selVal) => parseFloat(selVal / 4.804),
                'uslqt_impqt': (selVal) => parseFloat(selVal / 1.201),
                'uslqt_imppt': (selVal) => parseFloat(selVal * 1.665),
                'uslqt_implgcp': (selVal) => parseFloat(selVal * 3.331),
                'uslqt_impflonc': (selVal) => parseFloat(selVal * 33.307),
                'uslqt_imptbsp': (selVal) => parseFloat(selVal * 53.291),
                'uslqt_imptsp': (selVal) => parseFloat(selVal * 159.873),
                'uslqt_cuft': (selVal) => parseFloat(selVal / 29.922),
                'uslqt_cuin': (selVal) => parseFloat(selVal * 57.75),
                //
                'uslpt_uslgal': (selVal) => parseFloat(selVal / 8),
                'uslpt_uslqt': (selVal) => parseFloat(selVal / 2),
                'uslpt_uslgcp': (selVal) => parseFloat(selVal * 1.972),
                'uslpt_usflonc': (selVal) => parseFloat(selVal * 16),
                'uslpt_ustbsp': (selVal) => parseFloat(selVal * 32),
                'uslpt_ustsp': (selVal) => parseFloat(selVal * 96),
                'uslpt_cumt': (selVal) => parseFloat(selVal / 2113.376),
                'uslpt_lt': (selVal) => parseFloat(selVal / 2.113),
                'uslpt_mlt': (selVal) => parseFloat(selVal * 473.176),
                'uslpt_impgal': (selVal) => parseFloat(selVal / 9.608),
                'uslpt_impqt': (selVal) => parseFloat(selVal / 2.402),
                'uslpt_imppt': (selVal) => parseFloat(selVal / 1.201),
                'uslpt_implgcp': (selVal) => parseFloat(selVal * 1.665),
                'uslpt_impflonc': (selVal) => parseFloat(selVal * 16.653),
                'uslpt_imptbsp': (selVal) => parseFloat(selVal * 26.6456),
                'uslpt_imptsp': (selVal) => parseFloat(selVal * 79.937),
                //
                'uslgcp_uslgal': (selVal) => parseFloat(selVal / 15.773),
                'uslgcp_uslqt': (selVal) => parseFloat(selVal / 3.943),
                'uslgcp_uslpt': (selVal) => parseFloat(selVal / 1.972),
                'uslgcp_usflonc': (selVal) => parseFloat(selVal * 8.115),
                'uslgcp_ustbsp': (selVal) => parseFloat(selVal * 16.231),
                'uslgcp_ustsp': (selVal) => parseFloat(selVal * 48.692),
                'uslgcp_cumt': (selVal) => parseFloat(selVal / 4166.667),
                'uslgcp_lt': (selVal) => parseFloat(selVal / 4.167),
                'uslgcp_mlt': (selVal) => parseFloat(selVal * 240),
                'uslgcp_impgal': (selVal) => parseFloat(selVal / 18.942),
                'uslgcp_impqt': (selVal) => parseFloat(selVal / 4.736),
                'uslgcp_imppt': (selVal) => parseFloat(selVal / 2.368),
                'uslgcp_implgcp': (selVal) => parseFloat(selVal / 1.184),
                'uslgcp_impflonc': (selVal) => parseFloat(selVal * 8.447),
                'uslgcp_imptbsp': (selVal) => parseFloat(selVal * 13.515),
                'uslgcp_imptsp': (selVal) => parseFloat(selVal * 40.545),
                'uslgcp_cuft': (selVal) => parseFloat(selVal / 117.987),
                'uslgcp_cuin': (selVal) => parseFloat(selVal * 14.646),
                //
                'usflonc_uslgal': (selVal) => parseFloat(selVal / 128),
                'usflonc_uslqt': (selVal) => parseFloat(selVal / 32),
                'usflonc_uspt': (selVal) => parseFloat(selVal / 16),
                'usflonc_uslgcp': (selVal) => parseFloat(selVal / 8.115),
                'usflonc_ustbsp': (selVal) => parseFloat(selVal * 2),
                'usflonc_ustsp': (selVal) => parseFloat(selVal * 6),
                'usflonc_cumt': (selVal) => parseFloat(selVal / 33814.023),
                'usflonc_lt': (selVal) => parseFloat(selVal / 33.814),
                'usflonc_mlt': (selVal) => parseFloat(selVal * 29.574),
                'usflonc_impgal': (selVal) => parseFloat(selVal / 153.722),
                'usflonc_impqt': (selVal) => parseFloat(selVal / 38.43),
                'usflonc_imppt': (selVal) => parseFloat(selVal / 19.215),
                'usflonc_implgcp': (selVal) => parseFloat(selVal / 9.608),
                'usflonc_impflonc': (selVal) => parseFloat(selVal * 1.041),
                'usflonc_imptbsp': (selVal) => parseFloat(selVal * 1.665),
                'usflonc_imptsp': (selVal) => parseFloat(selVal * 4.996),
                'usflonc_cuft': (selVal) => parseFloat(selVal / 957.506),
                'usflonc_cuin': (selVal) => parseFloat(selVal * 1.80469),
                //
                'ustbsp_uslgal': (selVal) => parseFloat(selVal / 256),
                'ustbsp_uslqt': (selVal) => parseFloat(selVal / 64),
                'ustbsp_uslpt': (selVal) => parseFloat(selVal / 32),
                'ustbsp_uslgcp': (selVal) => parseFloat(selVal / 16.231),
                'ustbsp_usflonc': (selVal) => parseFloat(selVal / 2),
                'ustbsp_ustsp': (selVal) => parseFloat(selVal * 3),
                'ustbsp_cumt': (selVal) => parseFloat(selVal / 67628.045),
                'ustbsp_lt': (selVal) => parseFloat(selVal / 69.628),
                'ustbsp_mlt': (selVal) => parseFloat(selVal * 14.787),
                'ustbsp_impgal': (selVal) => parseFloat(selVal / 307.443),
                'ustbsp_impqt': (selVal) => parseFloat(selVal / 76.861),
                'ustbsp_imppt': (selVal) => parseFloat(selVal / 38.43),
                'ustbsp_implgcp': (selVal) => parseFloat(selVal / 19.215),
                'ustbsp_impflonc': (selVal) => parseFloat(selVal / 1.922),
                'ustbsp_imptbsp': (selVal) => parseFloat(selVal / 1.201),
                'ustbsp_imptsp': (selVal) => parseFloat(selVal * 2.498),
                'ustbsp_cuft': (selVal) => parseFloat(selVal / 1915.013),
                'ustbsp_cuin': (selVal) => parseFloat(selVal / 1.108),
                'ustsp_uslgal': (selVal) => parseFloat(selVal / 768),
                //
                'ustsp_uslqt': (selVal) => parseFloat(selVal / 192),
                'ustsp_uslpt': (selVal) => parseFloat(selVal / 96),
                'ustsp_uslgcp': (selVal) => parseFloat(selVal / 48.692),
                'ustsp_usflonc': (selVal) => parseFloat(selVal / 6),
                'ustsp_ustbsp': (selVal) => parseFloat(selVal / 3),
                'ustsp_cumt': (selVal) => parseFloat(selVal / 202884.202),
                'ustsp_lt': (selVal) => parseFloat(selVal / 202.884),
                'ustsp_mlt': (selVal) => parseFloat(selVal * 4.929),
                'ustsp_impgal': (selVal) => parseFloat(selVal / 922.33),
                'ustsp_impqt': (selVal) => parseFloat(selVal / 230.582),
                'ustsp_imppt': (selVal) => parseFloat(selVal / 115.291),
                'ustsp_implgcp': (selVal) => parseFloat(selVal / 57.646),
                'ustsp_imptbsp': (selVal) => parseFloat(selVal / 3.603),
                'ustsp_imptsp': (selVal) => parseFloat(selVal / 1.201),
                'ustsp_cuft': (selVal) => parseFloat(selVal / 5745.041),
                'ustsp_cuin': (selVal) => parseFloat(selVal / 3.325),
                //
                'cumt_uslgal': (selVal) => parseFloat(selVal * 264.172),
                'cumt_uslqt': (selVal) => parseFloat(selVal * 1056.688),
                'cumt_uslpt': (selVal) => parseFloat(selVal * 2113.376),
                'cumt_uslgcp': (selVal) => parseFloat(selVal * 4166.667),
                'cumt_usflonc': (selVal) => parseFloat(selVal * 33814.023),
                'cumt_ustbsp': (selVal) => parseFloat(selVal * 67628.045),
                'cumt_ustsp': (selVal) => parseFloat(selVal * 202884.202),
                'cumt_lt': (selVal) => parseFloat(selVal * 1000),
                'cumt_mlt': (selVal) => parseFloat(selVal * 1e6),
                'cumt_impgal': (selVal) => parseFloat(selVal * 219.969),
                'cumt_impqt': (selVal) => parseFloat(selVal * 879.877),
                'cumt_imppt': (selVal) => parseFloat(selVal * 1759.754),
                'cumt_implgcp': (selVal) => parseFloat(selVal * 3519.508),
                'cumt_impflonc': (selVal) => parseFloat(selVal * 35195.08),
                'cumt_imptbsp': (selVal) => parseFloat(selVal * 56312.104),
                'cumt_imptsp': (selVal) => parseFloat(selVal * 168936.313),
                'cumt_cuft': (selVal) => parseFloat(selVal * 35.315),
                'cumt_cuin': (selVal) => parseFloat(selVal * 61023.744),
                //
                'lt_uslgal': (selVal) => parseFloat(selVal / 3.785),
                'lt_uslqt': (selVal) => parseFloat(selVal * 1.057),
                'lt_uslpt': (selVal) => parseFloat(selVal * 2.113),
                'lt_uslgcp': (selVal) => parseFloat(selVal * 4.167),
                'lt_usflonc': (selVal) => parseFloat(selVal * 33.814),
                'lt_ustbsp': (selVal) => parseFloat(selVal * 67.628),
                'lt_ustsp': (selVal) => parseFloat(selVal * 202.884),
                'lt_cumt': (selVal) => parseFloat(selVal / 1000),
                'lt_mlt': (selVal) => parseFloat(selVal * 1000),
                'lt_impgal': (selVal) => parseFloat(selVal / 4.546),
                'lt_impqt': (selVal) => parseFloat(selVal / 1.137),
                'lt_imppt': (selVal) => parseFloat(selVal * 1.76),
                'lt_implgcp': (selVal) => parseFloat(selVal * 3.52),
                'lt_impflonc': (selVal) => parseFloat(selVal * 35.195),
                'lt_imptbsp': (selVal) => parseFloat(selVal * 56.312),
                'lt_imptsp': (selVal) => parseFloat(selVal * 168.936),
                'lt_cuft': (selVal) => parseFloat(selVal / 28.317),
                'lt_cuin': (selVal) => parseFloat(selVal * 61.024),
                //
                'mlt_uslgal': (selVal) => parseFloat(selVal / 3785.412),
                'mlt_uslqt': (selVal) => parseFloat(selVal / 946.353),
                'mlt_uslpt': (selVal) => parseFloat(selVal / 473.176),
                'mlt_uslgcp': (selVal) => parseFloat(selVal / 240),
                'mlt_usflonc': (selVal) => parseFloat(selVal / 29.574),
                'mlt_ustbsp': (selVal) => parseFloat(selVal / 14.787),
                'mlt_ustsp': (selVal) => parseFloat(selVal / 4.929),
                'mlt_cumt': (selVal) => parseFloat(selVal / 1e6),
                'mlt_lt': (selVal) => parseFloat(selVal / 1000),
                'mlt_impgal': (selVal) => parseFloat(selVal / 4546.09),
                'mlt_impqt': (selVal) => parseFloat(selVal / 1136.522),
                'mlt_imppt': (selVal) => parseFloat(selVal / 568.261),
                'mlt_implgcp': (selVal) => parseFloat(selVal / 284.131),
                'mlt_impflonc': (selVal) => parseFloat(selVal / 28.413),
                'mlt_imptbsp': (selVal) => parseFloat(selVal / 17.758),
                'mlt_imptsp': (selVal) => parseFloat(selVal / 5.919),
                'mlt_cuft': (selVal) => parseFloat(selVal / 28316.847),
                'mlt_cuin': (selVal) => parseFloat(selVal / 16.387),
                //
                'impgal_uslgal': (selVal) => parseFloat(selVal * 1.201),
                'impgal_uslqt': (selVal) => parseFloat(selVal * 4.804),
                'impgal_uslpt': (selVal) => parseFloat(selVal * 9.608),
                'impgal_uslgcp': (selVal) => parseFloat(selVal * 18.942),
                'impgal_usflonc': (selVal) => parseFloat(selVal * 153.722),
                'impgal_ustbsp': (selVal) => parseFloat(selVal * 307.443),
                'impgal_ustsp': (selVal) => parseFloat(selVal * 922.33),
                'impgal_cumt': (selVal) => parseFloat(selVal / 219.969),
                'impgal_lt': (selVal) => parseFloat(selVal * 4.546),
                'impgal_mlt': (selVal) => parseFloat(selVal * 4546.09),
                'impgal_impqt': (selVal) => parseFloat(selVal * 4),
                'impgal_imppt': (selVal) => parseFloat(selVal * 8),
                'impgal_implgcp': (selVal) => parseFloat(selVal * 16),
                'impgal_impflonc': (selVal) => parseFloat(selVal * 160),
                'impgal_imptbsp': (selVal) => parseFloat(selVal * 256),
                'impgal_imptsp': (selVal) => parseFloat(selVal * 768),
                'impgal_cuft': (selVal) => parseFloat(selVal / 6.229),
                'impgal_cuin': (selVal) => parseFloat(selVal * 277.419),
                //
                'impqt_uslgal': (selVal) => parseFloat(selVal / 3.331),
                'impqt_uslqt': (selVal) => parseFloat(selVal * 1.201),
                'impqt_uslpt': (selVal) => parseFloat(selVal * 2.402),
                'impqt_uslgcp': (selVal) => parseFloat(selVal * 4.736),
                'impqt_usflonc': (selVal) => parseFloat(selVal * 38.43),
                'impqt_ustbsp': (selVal) => parseFloat(selVal * 76.861),
                'impqt_ustsp': (selVal) => parseFloat(selVal * 230.582),
                'impqt_cumt': (selVal) => parseFloat(selVal / 879.877),
                'impqt_lt': (selVal) => parseFloat(selVal * 1.137),
                'impqt_mlt': (selVal) => parseFloat(selVal * 1136.522),
                'impqt_impgal': (selVal) => parseFloat(selVal / 4),
                'impqt_imppt': (selVal) => parseFloat(selVal * 2),
                'impqt_implgcp': (selVal) => parseFloat(selVal * 4),
                'impqt_impflonc': (selVal) => parseFloat(selVal * 40),
                'impqt_imptbsp': (selVal) => parseFloat(selVal * 64),
                'impqt_imptsp': (selVal) => parseFloat(selVal * 192),
                'impqt_cuft': (selVal) => parseFloat(selVal / 24.195),
                'impqt_cuin': (selVal) => parseFloat(selVal * 69.355),
                //
                'imppt_uslgal': (selVal) => parseFloat(selVal / 6.661),
                'imppt_uslqt': (selVal) => parseFloat(selVal / 1.665),
                'imppt_uslpt': (selVal) => parseFloat(selVal * 1.201),
                'imppt_uslgcp': (selVal) => parseFloat(selVal * 2.368),
                'imppt_usflonc': (selVal) => parseFloat(selVal * 19.215),
                'imppt_ustbsp': (selVal) => parseFloat(selVal * 38.43),
                'imppt_ustsp': (selVal) => parseFloat(selVal * 115.291),
                'imppt_cumt': (selVal) => parseFloat(selVal / 1759.754),
                'imppt_lt': (selVal) => parseFloat(selVal / 1.76),
                'imppt_mlt': (selVal) => parseFloat(selVal * 568.261),
                'imppt_impgal': (selVal) => parseFloat(selVal / 8),
                'imppt_impqt': (selVal) => parseFloat(selVal / 2),
                'imppt_implgcp': (selVal) => parseFloat(selVal * 2),
                'imppt_impflonc': (selVal) => parseFloat(selVal * 20),
                'imppt_imptbsp': (selVal) => parseFloat(selVal * 32),
                'imppt_imptsp': (selVal) => parseFloat(selVal * 96),
                'imppt_cuft': (selVal) => parseFloat(selVal / 49.831),
                'imppt_cuin': (selVal) => parseFloat(selVal * 34.677),
                //
                'implgcp_uslgal': (selVal) => parseFloat(selVal / 13.323),
                'implgcp_uslqt': (selVal) => parseFloat(selVal / 3.331),
                'implgcp_uslpt': (selVal) => parseFloat(selVal / 1.665),
                'implgcp_uslgcp': (selVal) => parseFloat(selVal * 1.184),
                'implgcp_usflonc': (selVal) => parseFloat(selVal * 9.608),
                'implgcp_ustbsp': (selVal) => parseFloat(selVal * 19.215),
                'implgcp_ustsp': (selVal) => parseFloat(selVal * 57.646),
                'implgcp_cumt': (selVal) => parseFloat(selVal / 3519.508),
                'implgcp_lt': (selVal) => parseFloat(selVal / 3.52),
                'implgcp_mlt': (selVal) => parseFloat(selVal * 284.131),
                'implgcp_impgal': (selVal) => parseFloat(selVal / 16),
                'implgcp_impqt': (selVal) => parseFloat(selVal / 4),
                'implgcp_imppt': (selVal) => parseFloat(selVal / 2),
                'implgcp_impflonc': (selVal) => parseFloat(selVal * 10),
                'implgcp_imptbsp': (selVal) => parseFloat(selVal * 16),
                'implgcp_imptsp': (selVal) => parseFloat(selVal * 48),
                'implgcp_cuft': (selVal) => parseFloat(selVal / 99.661),
                'implgcp_cuin': (selVal) => parseFloat(selVal * 17.339),
                //
                'impflonc_uslgal': (selVal) => parseFloat(selVal / 133.228),
                'impflonc_uslqt': (selVal) => parseFloat(selVal / 33.307),
                'impflonc_uslpt': (selVal) => parseFloat(selVal / 16.653),
                'impflonc_uslgcp': (selVal) => parseFloat(selVal / 8.447),
                'impflonc_usflonc': (selVal) => parseFloat(selVal / 1.041),
                'impflonc_ustbsp': (selVal) => parseFloat(selVal * 1.922),
                'impflonc_ustsp': (selVal) => parseFloat(selVal * 5.765),
                'impflonc_cumt': (selVal) => parseFloat(selVal / 35195.08),
                'impflonc_lt': (selVal) => parseFloat(selVal / 35.195),
                'impflonc_mlt': (selVal) => parseFloat(selVal * 28.413),
                'impflonc_impgal': (selVal) => parseFloat(selVal / 160),
                'impflonc_impqt': (selVal) => parseFloat(selVal / 40),
                'impflonc_imppt': (selVal) => parseFloat(selVal / 20),
                'impflonc_implgcp': (selVal) => parseFloat(selVal / 10),
                'impflonc_imptbsp': (selVal) => parseFloat(selVal * 1.6),
                'impflonc_imptsp': (selVal) => parseFloat(selVal * 4.8),
                'impflonc_cuft': (selVal) => parseFloat(selVal / 996.614),
                'impflonc_cuin': (selVal) => parseFloat(selVal * 1.734),
                //
                'imptbsp_uslgal': (selVal) => parseFloat(selVal / 213.165),
                'imptbsp_uslqt': (selVal) => parseFloat(selVal / 53.291),
                'imptbsp_uslpt': (selVal) => parseFloat(selVal / 26.646),
                'imptbsp_uslgcp': (selVal) => parseFloat(selVal / 13.515),
                'imptbsp_usflonc': (selVal) => parseFloat(selVal / 1.665),
                'imptbsp_ustbsp': (selVal) => parseFloat(selVal * 1.201),
                'imptbsp_ustsp': (selVal) => parseFloat(selVal * 3.603),
                'imptbsp_cumt': (selVal) => parseFloat(selVal / 56312.104),
                'imptbsp_lt': (selVal) => parseFloat(selVal / 56.312),
                'imptbsp_mlt': (selVal) => parseFloat(selVal * 17.758),
                'imptbsp_impgal': (selVal) => parseFloat(selVal / 256),
                'imptbsp_impqt': (selVal) => parseFloat(selVal / 64),
                'imptbsp_imppt': (selVal) => parseFloat(selVal / 32),
                'imptbsp_implgcp': (selVal) => parseFloat(selVal / 16),
                'imptbsp_impflonc': (selVal) => parseFloat(selVal / 1.6),
                'imptbsp_imptsp': (selVal) => parseFloat(selVal * 3),
                'imptbsp_cuft': (selVal) => parseFloat(selVal / 1594.581),
                'imptbsp_cuin': (selVal) => parseFloat(selVal * 1.084),
                //
                'imptsp_uslgal': (selVal) => parseFloat(selVal / 639.494),
                'imptsp_uslqt': (selVal) => parseFloat(selVal / 159.873),
                'imptsp_uslpt': (selVal) => parseFloat(selVal / 79.937),
                'imptsp_uslgcp': (selVal) => parseFloat(selVal / 40.545),
                'imptsp_usflonc': (selVal) => parseFloat(selVal / 4.996),
                'imptsp_ustbsp': (selVal) => parseFloat(selVal / 2.498),
                'imptsp_ustsp': (selVal) => parseFloat(selVal * 1.201),
                'imptsp_cumt': (selVal) => parseFloat(selVal / 168936.313),
                'imptsp_lt': (selVal) => parseFloat(selVal / 168.936),
                'imptsp_mlt': (selVal) => parseFloat(selVal * 5.919),
                'imptsp_impgal': (selVal) => parseFloat(selVal / 768),
                'imptsp_impqt': (selVal) => parseFloat(selVal / 192),
                'imptsp_imppt': (selVal) => parseFloat(selVal / 96),
                'imptsp_implgcp': (selVal) => parseFloat(selVal / 48),
                'imptsp_impflonc': (selVal) => parseFloat(selVal / 4.8),
                'imptsp_imptbsp': (selVal) => parseFloat(selVal / 3),
                'imptsp_cuft': (selVal) => parseFloat(selVal / 4783.744),
                'imptsp_cuin': (selVal) => parseFloat(selVal / 2.768),
                //
                'cuft_uslgal': (selVal) => parseFloat(selVal * 7.481),
                'cuft_uslqt': (selVal) => parseFloat(selVal * 29.922),
                'cuft_uslpt': (selVal) => parseFloat(selVal * 59.844),
                'cuft_uslgcp': (selVal) => parseFloat(selVal * 117.987),
                'cuft_usflonc': (selVal) => parseFloat(selVal * 957.506),
                'cuft_ustbsp': (selVal) => parseFloat(selVal * 1915.013),
                'cuft_ustsp': (selVal) => parseFloat(selVal * 5745.041),
                'cuft_cumt': (selVal) => parseFloat(selVal / 35.315),
                'cuft_lt': (selVal) => parseFloat(selVal * 28.317),
                'cuft_mlt': (selVal) => parseFloat(selVal * 28316.847),
                'cuft_impgal': (selVal) => parseFloat(selVal * 6.229),
                'cuft_impqt': (selVal) => parseFloat(selVal * 24.915),
                'cuft_imppt': (selVal) => parseFloat(selVal * 49.831),
                'cuft_implgcp': (selVal) => parseFloat(selVal * 99.661),
                'cuft_impflonc': (selVal) => parseFloat(selVal * 996.614),
                'cuft_imptbsp': (selVal) => parseFloat(selVal * 1594.581),
                'cuft_imptsp': (selVal) => parseFloat(selVal * 4783.744),
                'cuft_cuin': (selVal) => parseFloat(selVal * 1728),
                //
                'cuin_uslgal': (selVal) => parseFloat(selVal / 231),
                'cuin_uslqt': (selVal) => parseFloat(selVal / 57.75),
                'cuin_uslpt': (selVal) => parseFloat(selVal / 28.875),
                'cuin_uslgcp': (selVal) => parseFloat(selVal / 14.646),
                'cuin_usflonc': (selVal) => parseFloat(selVal / 1.805),
                'cuin_ustbsp': (selVal) => parseFloat(selVal * 1.108),
                'cuin_ustsp': (selVal) => parseFloat(selVal * 3.325),
                'cuin_cumt': (selVal) => parseFloat(selVal / 61023.744),
                'cuin_lt': (selVal) => parseFloat(selVal / 61.024),
                'cuin_mlt': (selVal) => parseFloat(selVal * 16.387),
                'cuin_impgal': (selVal) => parseFloat(selVal / 277.419),
                'cuin_impqt': (selVal) => parseFloat(selVal / 69.355),
                'cuin_imppt': (selVal) => parseFloat(selVal / 34.677),
                'cuin_implgcp': (selVal) => parseFloat(selVal / 17.339),
                'cuin_impflonc': (selVal) => parseFloat(selVal / 1.734),
                'cuin_imptbsp': (selVal) => parseFloat(selVal / 1.084),
                'cuin_imptsp': (selVal) => parseFloat(selVal * 2.768),
                'cuin_cuft': (selVal) => parseFloat(selVal / 1728),

            },
            mass: {
                'tn_kg': (selVal) => parseFloat(selVal * 1000),
                'tn_gm': (selVal) => parseFloat(selVal * 1e6),
                'tn_mg': (selVal) => parseFloat(selVal * 1e9),
                'tn_mcg': (selVal) => parseFloat(selVal * 1e12),
                'tn_imptn': (selVal) => parseFloat(selVal / 1.016),
                'tn_ustn': (selVal) => parseFloat(selVal * 1.102),
                'tn_stn': (selVal) => parseFloat(selVal * 157.473),
                'tn_lb': (selVal) => parseFloat(selVal * 2204.623),
                'tn_onc': (selVal) => parseFloat(selVal * 35273.962),
                'kg_tn': (selVal) => parseFloat(selVal / 1000),
                'kg_gm': (selVal) => parseFloat(selVal * 1000),
                'kg_mg': (selVal) => parseFloat(selVal * 1e6),
                'kg_mcg': (selVal) => parseFloat(selVal * 1e9),
                'kg_imptn': (selVal) => parseFloat(selVal / 1016.047),
                'kg_ustn': (selVal) => parseFloat(selVal / 907.185),
                'kg_stn': (selVal) => parseFloat(selVal / 6.35),
                'kg_lb': (selVal) => parseFloat(selVal * 2.205),
                'kg_onc': (selVal) => parseFloat(selVal * 35.274),
                'gm_tn': (selVal) => parseFloat(selVal / 1e6),
                'gm_kg': (selVal) => parseFloat(selVal / 1000),
                'gm_mg': (selVal) => parseFloat(selVal * 1000),
                'gm_mcg': (selVal) => parseFloat(selVal * 1e6),
                'gm_imptn': (selVal) => parseFloat(selVal / 1.016e6),
                'gm_ustn': (selVal) => parseFloat(selVal / 907184.74),
                'gm_stn': (selVal) => parseFloat(selVal / 6350.293),
                'gm_lb': (selVal) => parseFloat(selVal / 453.592),
                'gm_onc': (selVal) => parseFloat(selVal / 28.35),
                'mg_tn': (selVal) => parseFloat(selVal / 1e9),
                'mg_kg': (selVal) => parseFloat(selVal / 1e6),
                'mg_gm': (selVal) => parseFloat(selVal / 1000),
                'mg_mcg': (selVal) => parseFloat(selVal * 1000),
                'mg_imptn': (selVal) => parseFloat(selVal / 1.016e9),
                'mg_ustn': (selVal) => parseFloat(selVal / 9.072e8),
                'mg_stn': (selVal) => parseFloat(selVal / 6.35e6),
                'mg_lb': (selVal) => parseFloat(selVal / 453592.37),
                'mg_onc': (selVal) => parseFloat(selVal / 28349.523),
                'mcg_tn': (selVal) => parseFloat(selVal / 1e12),
                'mcg_kg': (selVal) => parseFloat(selVal / 1e9),
                'mcg_gm': (selVal) => parseFloat(selVal / 1e6),
                'mcg_mg': (selVal) => parseFloat(selVal / 1000),
                'mcg_imptn': (selVal) => parseFloat(selVal / 1.016e12),
                'mcg_ustn': (selVal) => parseFloat(selVal / 9.072e11),
                'mcg_stn': (selVal) => parseFloat(selVal / 6.35e9),
                'mcg_lb': (selVal) => parseFloat(selVal / 4.536e8),
                'mcg_onc': (selVal) => parseFloat(selVal / 2.835e7),
                'imptn_tn': (selVal) => parseFloat(selVal * 1.016),
                'imptn_kg': (selVal) => parseFloat(selVal * 1016.047),
                'imptn_gm': (selVal) => parseFloat(selVal * 1.016e6),
                'imptn_mg': (selVal) => parseFloat(selVal * 1.016e9),
                'imptn_mcg': (selVal) => parseFloat(selVal * 1.016e12),
                'imptn_ustn': (selVal) => parseFloat(selVal * 1.12),
                'imptn_stn': (selVal) => parseFloat(selVal * 160),
                'imptn_lb': (selVal) => parseFloat(selVal * 2240),
                'imptn_onc': (selVal) => parseFloat(selVal * 35840),
                'ustn_tn': (selVal) => parseFloat(selVal / 1.102),
                'ustn_kg': (selVal) => parseFloat(selVal * 907.185),
                'ustn_gm': (selVal) => parseFloat(selVal * 907184.74),
                'ustn_mg': (selVal) => parseFloat(selVal * 9.072e8),
                'ustn_mcg': (selVal) => parseFloat(selVal * 9.072e11),
                'ustn_imptn': (selVal) => parseFloat(selVal / 1.12),
                'ustn_stn': (selVal) => parseFloat(selVal / 142.857),
                'ustn_lb': (selVal) => parseFloat(selVal / 2000),
                'ustn_onc': (selVal) => parseFloat(selVal / 32000),
                'stn_tn': (selVal) => parseFloat(selVal / 157.473),
                'stn_kg': (selVal) => parseFloat(selVal * 6.35),
                'stn_gm': (selVal) => parseFloat(selVal * 6350.293),
                'stn_mg': (selVal) => parseFloat(selVal * 6.35e6),
                'stn_mcg': (selVal) => parseFloat(selVal * 6.35e9),
                'stn_imptn': (selVal) => parseFloat(selVal / 160),
                'stn_ustn': (selVal) => parseFloat(selVal / 142.857),
                'stn_lb': (selVal) => parseFloat(selVal * 14),
                'stn_onc': (selVal) => parseFloat(selVal * 224),
                'lb_tn': (selVal) => parseFloat(selVal / 2204.623),
                'lb_kg': (selVal) => parseFloat(selVal / 2.205),
                'lb_gm': (selVal) => parseFloat(selVal * 453.592),
                'lb_mg': (selVal) => parseFloat(selVal * 453592.37),
                'lb_mcg': (selVal) => parseFloat(selVal * 4.536e8),
                'lb_imptn': (selVal) => parseFloat(selVal / 2240),
                'lb_ustn': (selVal) => parseFloat(selVal / 2000),
                'lb_stn': (selVal) => parseFloat(selVal / 14),
                'lb_onc': (selVal) => parseFloat(selVal * 16),
                'onc_tn': (selVal) => parseFloat(selVal / 35273.962),
                'onc_kg': (selVal) => parseFloat(selVal / 35.274),
                'onc_gm': (selVal) => parseFloat(selVal * 28.35),
                'onc_mg': (selVal) => parseFloat(selVal * 28349.523),
                'onc_mcg': (selVal) => parseFloat(selVal * 2.835e7),
                'onc_imptn': (selVal) => parseFloat(selVal / 35840),
                'onc_ustn': (selVal) => parseFloat(selVal / 32000),
                'onc_stn': (selVal) => parseFloat(selVal / 224),
                'onc_lb': (selVal) => parseFloat(selVal / 16),
            },
            time: {
                'ns_mics': (selVal) => parseFloat(selVal / 1000),
                'ns_ms': (selVal) => parseFloat(selVal / 1e6),
                'ns_sec': (selVal) => parseFloat(selVal / 1e9),
                'ns_min': (selVal) => parseFloat(selVal / 6e10),
                'ns_hr': (selVal) => parseFloat(selVal / 3.6e12),
                'ns_day': (selVal) => parseFloat(selVal / 8.64e13),
                'ns_wk': (selVal) => parseFloat(selVal / 6.048e14),
                'ns_mon': (selVal) => parseFloat(selVal / 2.628e15),
                'ns_yr': (selVal) => parseFloat(selVal / 3.154e16),
                'ns_dcd': (selVal) => parseFloat(selVal / 3.154e17),
                'ns_cent': (selVal) => parseFloat(selVal / 3.154e18),
                'mics_ns': (selVal) => parseFloat(selVal * 1000),
                'mics_ms': (selVal) => parseFloat(selVal / 1000),
                'mics_sec': (selVal) => parseFloat(selVal / 1e6),
                'mics_min': (selVal) => parseFloat(selVal / 6e7),
                'mics_hr': (selVal) => parseFloat(selVal / 3.6e9),
                'mics_day': (selVal) => parseFloat(selVal / 8.64e10),
                'mics_wk': (selVal) => parseFloat(selVal / 6.048e11),
                'mics_mon': (selVal) => parseFloat(selVal / 2.628e12),
                'mics_yr': (selVal) => parseFloat(selVal / 3.154e13),
                'mics_dcd': (selVal) => parseFloat(selVal / 3.154e14),
                'mics_cent': (selVal) => parseFloat(selVal / 3.154e15),
                'ms_ns': (selVal) => parseFloat(selVal * 1e6),
                'ms_mics': (selVal) => parseFloat(selVal * 1000),
                'ms_sec': (selVal) => parseFloat(selVal / 1000),
                'ms_min': (selVal) => parseFloat(selVal / 60000),
                'ms_hr': (selVal) => parseFloat(selVal / 3.6e6),
                'ms_day': (selVal) => parseFloat(selVal / 8.64e7),
                'ms_wk': (selVal) => parseFloat(selVal / 6.048e8),
                'ms_mon': (selVal) => parseFloat(selVal / 2.628e9),
                'ms_yr': (selVal) => parseFloat(selVal / 3.154e10),
                'ms_dcd': (selVal) => parseFloat(selVal / 3.154e11),
                'ms_cent': (selVal) => parseFloat(selVal / 3.154e12),
                'sec_ns': (selVal) => parseFloat(selVal * 1e9),
                'sec_mics': (selVal) => parseFloat(selVal * 1e6),
                'sec_ms': (selVal) => parseFloat(selVal * 1000),
                'sec_min': (selVal) => parseFloat(selVal / 60),
                'sec_hr': (selVal) => parseFloat(selVal / 3600),
                'sec_day': (selVal) => parseFloat(selVal / 86400),
                'sec_wk': (selVal) => parseFloat(selVal / 604800),
                'sec_mon': (selVal) => parseFloat(selVal / 2.628e6),
                'sec_yr': (selVal) => parseFloat(selVal / 3.154e7),
                'sec_dcd': (selVal) => parseFloat(selVal / 3.154e8),
                'sec_cent': (selVal) => parseFloat(selVal / 3.154e9),
                'min_ns': (selVal) => parseFloat(selVal * 6e10),
                'min_mics': (selVal) => parseFloat(selVal * 6e7),
                'min_ms': (selVal) => parseFloat(selVal * 60000),
                'min_sec': (selVal) => parseFloat(selVal * 60),
                'min_hr': (selVal) => parseFloat(selVal / 60),
                'min_day': (selVal) => parseFloat(selVal / 1440),
                'min_wk': (selVal) => parseFloat(selVal / 10080),
                'min_mon': (selVal) => parseFloat(selVal / 43800.048),
                'min_yr': (selVal) => parseFloat(selVal / 525600),
                'min_dcd': (selVal) => parseFloat(selVal / 5.256e6),
                'min_cent': (selVal) => parseFloat(selVal / 5.256e7),
                'hr_ns': (selVal) => parseFloat(selVal * 3.6e12),
                'hr_mics': (selVal) => parseFloat(selVal * 3.6e9),
                'hr_ms': (selVal) => parseFloat(selVal * 3.6e6),
                'hr_sec': (selVal) => parseFloat(selVal * 3600),
                'hr_min': (selVal) => parseFloat(selVal * 60),
                'hr_day': (selVal) => parseFloat(selVal / 24),
                'hr_wk': (selVal) => parseFloat(selVal / 168),
                'hr_mon': (selVal) => parseFloat(selVal / 730.001),
                'hr_yr': (selVal) => parseFloat(selVal / 8760),
                'hr_dcd': (selVal) => parseFloat(selVal / 87600),
                'hr_cent': (selVal) => parseFloat(selVal / 876000),
                'day_ns': (selVal) => parseFloat(selVal * 8.64e13),
                'day_mics': (selVal) => parseFloat(selVal * 8.64e10),
                'day_ms': (selVal) => parseFloat(selVal * 8.64e7),
                'day_sec': (selVal) => parseFloat(selVal * 86400),
                'day_min': (selVal) => parseFloat(selVal * 1440),
                'day_hr': (selVal) => parseFloat(selVal * 24),
                'day_wk': (selVal) => parseFloat(selVal / 7),
                'day_mon': (selVal) => parseFloat(selVal / 30.417),
                'day_yr': (selVal) => parseFloat(selVal / 365),
                'day_dcd': (selVal) => parseFloat(selVal / 3650),
                'day_cent': (selVal) => parseFloat(selVal / 36500),
                'wk_ns': (selVal) => parseFloat(selVal * 6.048e14),
                'wk_mics': (selVal) => parseFloat(selVal * 6.048e11),
                'wk_ms': (selVal) => parseFloat(selVal * 6.048e8),
                'wk_sec': (selVal) => parseFloat(selVal * 604800),
                'wk_min': (selVal) => parseFloat(selVal * 10080),
                'wk_hr': (selVal) => parseFloat(selVal * 168),
                'wk_day': (selVal) => parseFloat(selVal * 7),
                'wk_mon': (selVal) => parseFloat(selVal / 4.345),
                'wk_yr': (selVal) => parseFloat(selVal / 52.143),
                'wk_dcd': (selVal) => parseFloat(selVal / 521.429),
                'wk_cent': (selVal) => parseFloat(selVal / 5214.286),
                'mon_ns': (selVal) => parseFloat(selVal * 2.628e15),
                'mon_mics': (selVal) => parseFloat(selVal * 2.628e12),
                'mon_ms': (selVal) => parseFloat(selVal * 2.628e9),
                'mon_sec': (selVal) => parseFloat(selVal * 2.628e6),
                'mon_min': (selVal) => parseFloat(selVal * 43800.048),
                'mon_hr': (selVal) => parseFloat(selVal * 730.001),
                'mon_day': (selVal) => parseFloat(selVal * 30.417),
                'mon_wk': (selVal) => parseFloat(selVal * 4.345),
                'mon_yr': (selVal) => parseFloat(selVal / 12),
                'mon_dcd': (selVal) => parseFloat(selVal / 120),
                'mon_cent': (selVal) => parseFloat(selVal / 119.999),
                'yr_ns': (selVal) => parseFloat(selVal * 3.154e16),
                'yr_mics': (selVal) => parseFloat(selVal * 3.154e13),
                'yr_ms': (selVal) => parseFloat(selVal * 3.154e10),
                'yr_sec': (selVal) => parseFloat(selVal * 3.154e7),
                'yr_min': (selVal) => parseFloat(selVal * 525600),
                'yr_hr': (selVal) => parseFloat(selVal * 8760),
                'yr_day': (selVal) => parseFloat(selVal * 365),
                'yr_wk': (selVal) => parseFloat(selVal * 52.143),
                'yr_mon': (selVal) => parseFloat(selVal * 12),
                'yr_dcd': (selVal) => parseFloat(selVal / 10),
                'yr_cent': (selVal) => parseFloat(selVal / 100),
                'dcd_ns': (selVal) => parseFloat(selVal * 3.154e17),
                'dcd_mics': (selVal) => parseFloat(selVal * 3.154e14),
                'dcd_ms': (selVal) => parseFloat(selVal * 3.154e11),
                'dcd_sec': (selVal) => parseFloat(selVal * 3.154e8),
                'dcd_min': (selVal) => parseFloat(selVal * 5.256e6),
                'dcd_hr': (selVal) => parseFloat(selVal * 87600),
                'dcd_day': (selVal) => parseFloat(selVal * 3650),
                'dcd_wk': (selVal) => parseFloat(selVal * 521.429),
                'dcd_mon': (selVal) => parseFloat(selVal * 120),
                'dcd_yr': (selVal) => parseFloat(selVal * 10),
                'dcd_cent': (selVal) => parseFloat(selVal / 10),
                'cent_ns': (selVal) => parseFloat(selVal * 3.154e18),
                'cent_mics': (selVal) => parseFloat(selVal * 3.154e15),
                'cent_ms': (selVal) => parseFloat(selVal * 3.154e12),
                'cent_sec': (selVal) => parseFloat(selVal * 3.154e9),
                'cent_min': (selVal) => parseFloat(selVal * 5.256e7),
                'cent_hr': (selVal) => parseFloat(selVal * 876000),
                'cent_day': (selVal) => parseFloat(selVal * 36500),
                'cent_wk': (selVal) => parseFloat(selVal * 5214.286),
                'cent_mon': (selVal) => parseFloat(selVal * 1199.999),
                'cent_yr': (selVal) => parseFloat(selVal * 100),
                'cent_dcd': (selVal) => parseFloat(selVal * 10),
            }
        },
        mapKeysToFunction() {
            //temperatures
            this.mapObject.functionMap.set("CelsiusToFahrenheit", this.formulas.temperature.c_f);
            this.mapObject.functionMap.set("CelsiusToKelvin", this.formulas.temperature.c_k);
            this.mapObject.functionMap.set("FahrenheitToCelsius", this.formulas.temperature.f_c);
            this.mapObject.functionMap.set("FahrenheitToKelvin", this.formulas.temperature.f_k);
            this.mapObject.functionMap.set("KelvinToCelsius", this.formulas.temperature.k_c);
            this.mapObject.functionMap.set("KelvinToFahrenheit", this.formulas.temperature.k_f);


            /////area////
            // area -> miles
            this.mapObject.functionMap.set("SquaremileToSquarekilometer", this.formulas.area.sqmil_sqkm);
            this.mapObject.functionMap.set("SquaremileToSquareyard", this.formulas.area.sqmil_sqyd);
            this.mapObject.functionMap.set("SquaremileToSquaremeter", this.formulas.area.sqmil_sqmt);
            this.mapObject.functionMap.set("SquaremileToSquarefoot", this.formulas.area.sqmil_sqft);
            this.mapObject.functionMap.set("SquaremileToSquareinch", this.formulas.area.sqmil_sqin);
            this.mapObject.functionMap.set("SquaremileToHectare", this.formulas.area.sqmil_hct);
            this.mapObject.functionMap.set("SquaremileToAcre", this.formulas.area.sqmil_acr);
            // area -> Kilometer
            this.mapObject.functionMap.set("SquarekilometerToSquaremeter", this.formulas.area.sqkm_sqmt);
            this.mapObject.functionMap.set("SquarekilometerToSquaremile", this.formulas.area.sqkm_sqmil);
            this.mapObject.functionMap.set("SquarekilometerToSquareyard", this.formulas.area.sqkm_sqyd);
            this.mapObject.functionMap.set("SquarekilometerToSquarefoot", this.formulas.area.sqkm_sqft);
            this.mapObject.functionMap.set("SquarekilometerToSquareinch", this.formulas.area.sqkm_sqin);
            this.mapObject.functionMap.set("SquarekilometerToHectare", this.formulas.area.sqkm_hct);
            this.mapObject.functionMap.set("SquarekilometerToAcre", this.formulas.area.sqkm_acr);
            // area -> Meter
            this.mapObject.functionMap.set("SquaremeterToSquarekilometer", this.formulas.area.sqmt_sqkm);
            this.mapObject.functionMap.set("SquaremeterToSquaremile", this.formulas.area.sqmt_sqmil);
            this.mapObject.functionMap.set("SquaremeterToSquareyard", this.formulas.area.sqmt_sqyd);
            this.mapObject.functionMap.set("SquaremeterToSquarefoot", this.formulas.area.sqmt_sqft);
            this.mapObject.functionMap.set("SquaremeterToSquareinch", this.formulas.area.sqmt_sqin);
            this.mapObject.functionMap.set("SquaremeterToHectare", this.formulas.area.sqmt_hct);
            this.mapObject.functionMap.set("SquaremeterToAcre", this.formulas.area.sqmt_acr);
            //  area -> Yard
            this.mapObject.functionMap.set("SquareyardToSquarekilometer", this.formulas.area.sqyd_sqkm);
            this.mapObject.functionMap.set("SquareyardToSquaremeter", this.formulas.area.sqyd_sqmt);
            this.mapObject.functionMap.set("SquareyardToSquaremile", this.formulas.area.sqyd_sqmil);
            this.mapObject.functionMap.set("SquareyardToSquarefoot", this.formulas.area.sqyd_sqft);
            this.mapObject.functionMap.set("SquareyardToSquareinch", this.formulas.area.sqyd_sqin);
            this.mapObject.functionMap.set("SquareyardToHectare", this.formulas.area.sqyd_hct);
            this.mapObject.functionMap.set("SquareyardToAcre", this.formulas.area.sqyd_acr);
            //  area -> Foot
                this.mapObject.functionMap.set("SquarefootToSquarekilometer",this.formulas.area.sqft_sqkm);
                this.mapObject.functionMap.set("SquarefootToSquaremeter",this.formulas.area.sqft_sqmt);
                this.mapObject.functionMap.set("SquarefootToSquaremile",this.formulas.area.sqft_sqmil);
                this.mapObject.functionMap.set("SquarefootToSquareyard",this.formulas.area.sqft_sqyd);
                this.mapObject.functionMap.set("SquarefootToSquareinch",this.formulas.area.sqft_sqin);
                this.mapObject.functionMap.set("SquarefootToHectare",this.formulas.area.sqft_hct);
                this.mapObject.functionMap.set("SquarefootToAcre",this.formulas.area.sqft_acr);
            // area -> Inch
            this.mapObject.functionMap.set("SquareinchToSquarekilometer", this.formulas.area.sqin_sqkm);
            this.mapObject.functionMap.set("SquareinchToSquaremeter", this.formulas.area.sqin_sqmt);
            this.mapObject.functionMap.set("SquareinchToSquaremile", this.formulas.area.sqin_sqmil);
            this.mapObject.functionMap.set("SquareinchToSquareyard", this.formulas.area.sqin_sqyd);
            this.mapObject.functionMap.set("SquareinchToSquarefoot", this.formulas.area.sqin_sqft);
            this.mapObject.functionMap.set("SquareinchToHectare", this.formulas.area.sqin_hct);
            this.mapObject.functionMap.set("SquareinchToAcre", this.formulas.area.sqin_acr);
            // area -> Hectare
            this.mapObject.functionMap.set("HectareToSquarekilometer", this.formulas.area.hct_sqkm);
            this.mapObject.functionMap.set("HectareToSquaremeter", this.formulas.area.hct_sqmt);
            this.mapObject.functionMap.set("HectareToSquaremile", this.formulas.area.hct_sqmil);
            this.mapObject.functionMap.set("HectareToSquareyard", this.formulas.area.hct_sqyd);
            this.mapObject.functionMap.set("HectareToSquarefoot", this.formulas.area.hct_sqft);
            this.mapObject.functionMap.set("HectareToSquareinch", this.formulas.area.hct_sqin);
            this.mapObject.functionMap.set("HectareToAcre", this.formulas.area.hct_acr);
            // area -> Acre
            this.mapObject.functionMap.set("AcreToSquarekilometer", this.formulas.area.acr_sqkm);
            this.mapObject.functionMap.set("AcreToSquaremeter", this.formulas.area.acr_sqmt);
            this.mapObject.functionMap.set("AcreToSquaremile", this.formulas.area.acr_sqmil);
            this.mapObject.functionMap.set("AcreToSquareyard", this.formulas.area.acr_sqyd);
            this.mapObject.functionMap.set("AcreToSquarefoot", this.formulas.area.acr_sqft);
            this.mapObject.functionMap.set("AcreToSquareinch", this.formulas.area.acr_sqin);
            this.mapObject.functionMap.set("AcreToHectare", this.formulas.area.acr_hct);

            //// Speed ////

            // Speed -> Miles per hour
            this.mapObject.functionMap.set("MilesperhourToFootpersecond", this.formulas.speed.mph_ftps);
            this.mapObject.functionMap.set("MilesperhourToMeterpersecond", this.formulas.speed.mph_mtps);
            this.mapObject.functionMap.set("MilesperhourToKilometerperhour", this.formulas.speed.mph_kmph);
            this.mapObject.functionMap.set("MilesperhourToKnot", this.formulas.speed.mph_knt);
            // Speed -> Miles per hour
            this.mapObject.functionMap.set("FootpersecondToMilesperhour", this.formulas.speed.ftps_mph);
            this.mapObject.functionMap.set("FootpersecondToMeterpersecond", this.formulas.speed.ftps_mtps);
            this.mapObject.functionMap.set("FootpersecondToKilometerperhour", this.formulas.speed.ftps_kmph);
            this.mapObject.functionMap.set("FootpersecondToKnot", this.formulas.speed.ftps_knt);
            // Speed -> Meter per second
            this.mapObject.functionMap.set("MeterpersecondToMilesperhour", this.formulas.speed.mtps_mph);
            this.mapObject.functionMap.set("MeterpersecondToFootpersecond", this.formulas.speed.mtps_ftps);
            this.mapObject.functionMap.set("MeterpersecondToKilometerperhour", this.formulas.speed.mtps_kmph);
            this.mapObject.functionMap.set("MeterpersecondToKnot", this.formulas.speed.mtps_knt);
            //Speed -> Kilometer per hour
            this.mapObject.functionMap.set("KilometerperhourToMilesperhour", this.formulas.speed.kmph_mph);
            this.mapObject.functionMap.set("KilometerperhourToFootpersecond", this.formulas.speed.kmph_ftps);
            this.mapObject.functionMap.set("KilometerperhourToMeterpersecond", this.formulas.speed.kmph_mtps);
            this.mapObject.functionMap.set("KilometerperhourToKnot", this.formulas.speed.kmph_knt);
            //Speed -> Knot
            this.mapObject.functionMap.set("KnotToMilesperhour", this.formulas.speed.knt_mph);
            this.mapObject.functionMap.set("KnotToFootpersecond", this.formulas.speed.knt_ftps);
            this.mapObject.functionMap.set("KnotToMeterpersecond", this.formulas.speed.knt_mtps);
            this.mapObject.functionMap.set("KnotToKilometerperhour", this.formulas.speed.knt_kmph);

            //// Length ////
            // Length -> Meter
            this.mapObject.functionMap.set('MeterToCentimeter', this.formulas.length.mt_cm);
            this.mapObject.functionMap.set('MeterToKilometer', this.formulas.length.mt_km);
            this.mapObject.functionMap.set('MeterToMillimeter', this.formulas.length.mt_mm);
            this.mapObject.functionMap.set('MeterToMicrometer', this.formulas.length.mt_micm);
            this.mapObject.functionMap.set('MeterToNanometer', this.formulas.length.mt_nmt);
            this.mapObject.functionMap.set('MeterToMile', this.formulas.length.mt_mil);
            this.mapObject.functionMap.set('MeterToYard', this.formulas.length.mt_yd);
            this.mapObject.functionMap.set('MeterToFoot', this.formulas.length.mt_ft);
            this.mapObject.functionMap.set('MeterToInch', this.formulas.length.mt_in);
            this.mapObject.functionMap.set('MeterToNauticalMile', this.formulas.length.mt_ntmil);

            // Length -> Kilometer
            this.mapObject.functionMap.set('KilometerToMeter', this.formulas.length.km_mt);
            this.mapObject.functionMap.set('KilometerToCentimeter', this.formulas.length.km_cm);
            this.mapObject.functionMap.set('KilometerToMillimeter', this.formulas.length.km_mm);
            this.mapObject.functionMap.set('KilometerToMicrometer', this.formulas.length.km_micm);
            this.mapObject.functionMap.set('KilometerToNanometer', this.formulas.length.km_nmt);
            this.mapObject.functionMap.set('KilometerToMile', this.formulas.length.km_mil);
            this.mapObject.functionMap.set('KilometerToYard', this.formulas.length.km_yd);
            this.mapObject.functionMap.set('KilometerToFoot', this.formulas.length.km_ft);
            this.mapObject.functionMap.set('KilometerToInch', this.formulas.length.km_in);
            this.mapObject.functionMap.set('KilometerToNauticalMile', this.formulas.length.km_ntmil);

            // Length -> Centimeter
            this.mapObject.functionMap.set('CentimeterToMile', this.formulas.length.cm_mil);
            this.mapObject.functionMap.set('CentimeterToKilometer', this.formulas.length.cm_km);
            this.mapObject.functionMap.set('CentimeterToMeter', this.formulas.length.cm_mt);
            this.mapObject.functionMap.set('CentimeterToMillimeter', this.formulas.length.cm_mm);
            this.mapObject.functionMap.set('CentimeterToMicrometer', this.formulas.length.cm_micm);
            this.mapObject.functionMap.set('CentimeterToNanometer', this.formulas.length.cm_nmt);
            this.mapObject.functionMap.set('CentimeterToYard', this.formulas.length.cm_yd);
            this.mapObject.functionMap.set('CentimeterToFoot', this.formulas.length.cm_ft);
            this.mapObject.functionMap.set('CentimeterToInch', this.formulas.length.cm_in);
            this.mapObject.functionMap.set('CentimeterToNauticalMile', this.formulas.length.cm_ntmil);

            // Length -> Millimeter
            this.mapObject.functionMap.set('MillimeterToKilometer', this.formulas.length.mm_km);
            this.mapObject.functionMap.set('MillimeterToMeter', this.formulas.length.mm_mt);
            this.mapObject.functionMap.set('MillimeterToCentimeter', this.formulas.length.mm_cm);
            this.mapObject.functionMap.set('MillimeterToMicrometer', this.formulas.length.mm_micm);
            this.mapObject.functionMap.set('MillimeterToNanometer', this.formulas.length.mm_nmt);
            this.mapObject.functionMap.set('MillimeterToMile', this.formulas.length.mm_mil);
            this.mapObject.functionMap.set('MillimeterToYard', this.formulas.length.mm_yd);
            this.mapObject.functionMap.set('MillimeterToFoot', this.formulas.length.mm_ft);
            this.mapObject.functionMap.set('MillimeterToInch', this.formulas.length.mm_in);
            this.mapObject.functionMap.set('MillimeterToNauticalMile', this.formulas.length.mm_ntmil);

            // Length -> Micrometer
            this.mapObject.functionMap.set('MicrometerToMile', this.formulas.length.micm_mil);
            this.mapObject.functionMap.set('MicrometerToKilometer', this.formulas.length.micm_km);
            this.mapObject.functionMap.set('MicrometerToMeter', this.formulas.length.micm_mt);
            this.mapObject.functionMap.set('MicrometerToCentimeter', this.formulas.length.micm_cm);
            this.mapObject.functionMap.set('MicrometerToMillimeter', this.formulas.length.micm_mm);
            this.mapObject.functionMap.set('MicrometerToNanometer', this.formulas.length.micm_nmt);
            this.mapObject.functionMap.set('MicrometerToYard', this.formulas.length.micm_yd);
            this.mapObject.functionMap.set('MicrometerToFoot', this.formulas.length.micm_ft);
            this.mapObject.functionMap.set('MicrometerToInch', this.formulas.length.micm_in);
            this.mapObject.functionMap.set('MicrometerToNauticalMile', this.formulas.length.micm_ntmil);
            // Length -> Nanometer
            this.mapObject.functionMap.set('NanometerToMile', this.formulas.length.nmt_mil);
            this.mapObject.functionMap.set('NanometerToKilometer', this.formulas.length.nmt_km);
            this.mapObject.functionMap.set('NanometerToMeter', this.formulas.length.nmt_mt);
            this.mapObject.functionMap.set('NanometerToCentimeter', this.formulas.length.nmt_cm);
            this.mapObject.functionMap.set('NanometerToMillimeter', this.formulas.length.nmt_mm);
            this.mapObject.functionMap.set('NanometerToMicrometer', this.formulas.length.nmt_micm);
            this.mapObject.functionMap.set('NanometerToYard', this.formulas.length.nmt_yd);
            this.mapObject.functionMap.set('NanometerToFoot', this.formulas.length.nmt_ft);
            this.mapObject.functionMap.set('NanometerToInch', this.formulas.length.nmt_in);
            this.mapObject.functionMap.set('NanometerToNauticalMile', this.formulas.length.nmt_ntmil);
            // Length -> Mile
            this.mapObject.functionMap.set('MileToKilometer', this.formulas.length.mil_km);
            this.mapObject.functionMap.set('MileToMeter', this.formulas.length.mil_mt);
            this.mapObject.functionMap.set('MileToCentimeter', this.formulas.length.mil_cm);
            this.mapObject.functionMap.set('MileToMillimeter', this.formulas.length.mil_mm);
            this.mapObject.functionMap.set('MileToMicrometer', this.formulas.length.mil_micm);
            this.mapObject.functionMap.set('MileToNanometer', this.formulas.length.mil_nmt);
            this.mapObject.functionMap.set('MileToYard', this.formulas.length.mil_yd);
            this.mapObject.functionMap.set('MileToFoot', this.formulas.length.mil_ft);
            this.mapObject.functionMap.set('MileToInch', this.formulas.length.mil_in);
            this.mapObject.functionMap.set('MileToNauticalMile', this.formulas.length.mil_ntmil);
            // Length -> Yard
            this.mapObject.functionMap.set('YardToMile', this.formulas.length.yd_mil);
            this.mapObject.functionMap.set('YardToKilometer', this.formulas.length.yd_km);
            this.mapObject.functionMap.set('YardToMeter', this.formulas.length.yd_mt);
            this.mapObject.functionMap.set('YardToCentimeter', this.formulas.length.yd_cm);
            this.mapObject.functionMap.set('YardToMillimeter', this.formulas.length.yd_mm);
            this.mapObject.functionMap.set('YardToMicrometer', this.formulas.length.yd_micm);
            this.mapObject.functionMap.set('YardToNanometer', this.formulas.length.yd_nmt);
            this.mapObject.functionMap.set('YardToFoot', this.formulas.length.yd_ft);
            this.mapObject.functionMap.set('YardToInch', this.formulas.length.yd_in);
            this.mapObject.functionMap.set('YardToNauticalMile', this.formulas.length.yd_ntmil);
            // Length -> Foot
            this.mapObject.functionMap.set('FootToMile', this.formulas.length.ft_mil);
            this.mapObject.functionMap.set('FootToKilometer', this.formulas.length.ft_km);
            this.mapObject.functionMap.set('FootToMeter', this.formulas.length.ft_mt);
            this.mapObject.functionMap.set('FootToCentimeter', this.formulas.length.ft_cm);
            this.mapObject.functionMap.set('FootToMillimeter', this.formulas.length.ft_mm);
            this.mapObject.functionMap.set('FootToMicrometer', this.formulas.length.ft_micm);
            this.mapObject.functionMap.set('FootToNanometer', this.formulas.length.ft_nmt);
            this.mapObject.functionMap.set('FootToYard', this.formulas.length.ft_yd);
            this.mapObject.functionMap.set('FootToInch', this.formulas.length.ft_in);
            this.mapObject.functionMap.set('FootToNauticalMile', this.formulas.length.ft_ntmil);
            // Length -> Inche
            this.mapObject.functionMap.set('InchToMile', this.formulas.length.in_mil);
            this.mapObject.functionMap.set('InchToKilometer', this.formulas.length.in_km);
            this.mapObject.functionMap.set('InchToMeter', this.formulas.length.in_mt);
            this.mapObject.functionMap.set('InchToCentimeter', this.formulas.length.in_cm);
            this.mapObject.functionMap.set('InchToMillimeter', this.formulas.length.in_mm);
            this.mapObject.functionMap.set('InchToMicrometer', this.formulas.length.in_micm);
            this.mapObject.functionMap.set('InchToNanometer', this.formulas.length.in_nmt);
            this.mapObject.functionMap.set('InchToYard', this.formulas.length.in_yd);
            this.mapObject.functionMap.set('InchToFoot', this.formulas.length.in_ft);
            this.mapObject.functionMap.set('InchToNauticalMile', this.formulas.length.in_ntmil);
            // Length -> Nauticle
            this.mapObject.functionMap.set('NauticalMileToMile', this.formulas.length.ntmil_mil);
            this.mapObject.functionMap.set('NauticalMileToKilometer', this.formulas.length.ntmil_km);
            this.mapObject.functionMap.set('NauticalMileToMeter', this.formulas.length.ntmil_mt);
            this.mapObject.functionMap.set('NauticalMileToCentimeter', this.formulas.length.ntmil_cm);
            this.mapObject.functionMap.set('NauticalMileToMillimeter', this.formulas.length.ntmil_mm);
            this.mapObject.functionMap.set('NauticalMileToMicrometer', this.formulas.length.ntmil_micm);
            this.mapObject.functionMap.set('NauticalMileToNanometer', this.formulas.length.ntmil_nmt);
            this.mapObject.functionMap.set('NauticalMileToYard', this.formulas.length.ntmil_yd);
            this.mapObject.functionMap.set('NauticalMileToFoot', this.formulas.length.ntmil_ft);
            this.mapObject.functionMap.set('NauticalMileToInch', this.formulas.length.ntmil_in);
            //// Mass ////
            // Mass --> Tonne
            this.mapObject.functionMap.set('TonneToKilogram', this.formulas.mass.tn_kg);
            this.mapObject.functionMap.set('TonneToGram', this.formulas.mass.tn_gm);
            this.mapObject.functionMap.set('TonneToMilligram', this.formulas.mass.tn_mg);
            this.mapObject.functionMap.set('TonneToMicrogram', this.formulas.mass.tn_mcg);
            this.mapObject.functionMap.set('TonneToImperialton', this.formulas.mass.tn_imptn);
            this.mapObject.functionMap.set('TonneToUSton', this.formulas.mass.tn_ustn);
            this.mapObject.functionMap.set('TonneToStone', this.formulas.mass.tn_stn);
            this.mapObject.functionMap.set('TonneToPound', this.formulas.mass.tn_lb);
            this.mapObject.functionMap.set('TonneToOunce', this.formulas.mass.tn_onc);
            // Mass --> Kilogram
            this.mapObject.functionMap.set('KilogramToTonne', this.formulas.mass.kg_tn);
            this.mapObject.functionMap.set('KilogramToGram', this.formulas.mass.kg_gm);
            this.mapObject.functionMap.set('KilogramToMilligram', this.formulas.mass.kg_mg);
            this.mapObject.functionMap.set('KilogramToMicrogram', this.formulas.mass.kg_mcg);
            this.mapObject.functionMap.set('KilogramToImperialton', this.formulas.mass.kg_imptn);
            this.mapObject.functionMap.set('KilogramToUSton', this.formulas.mass.kg_ustn);
            this.mapObject.functionMap.set('KilogramToStone', this.formulas.mass.kg_stn);
            this.mapObject.functionMap.set('KilogramToPound', this.formulas.mass.kg_lb);
            this.mapObject.functionMap.set('KilogramToOunce', this.formulas.mass.kg_onc);
            // Mass --> Gram
            this.mapObject.functionMap.set('GramToTonne', this.formulas.mass.gm_tn);
            this.mapObject.functionMap.set('GramToKilogram', this.formulas.mass.gm_kg);
            this.mapObject.functionMap.set('GramToMilligram', this.formulas.mass.gm_mg);
            this.mapObject.functionMap.set('GramToMicrogram', this.formulas.mass.gm_mcg);
            this.mapObject.functionMap.set('GramToImperialton', this.formulas.mass.gm_imptn);
            this.mapObject.functionMap.set('GramToUSton', this.formulas.mass.gm_ustn);
            this.mapObject.functionMap.set('GramToStone', this.formulas.mass.gm_stn);
            this.mapObject.functionMap.set('GramToPound', this.formulas.mass.gm_lb);
            this.mapObject.functionMap.set('GramToOunce', this.formulas.mass.gm_onc);
            // Mass --> Milligram
            this.mapObject.functionMap.set('MilligramToTonne', this.formulas.mass.mg_tn);
            this.mapObject.functionMap.set('MilligramToKilogram', this.formulas.mass.mg_kg);
            this.mapObject.functionMap.set('MilligramToGram', this.formulas.mass.mg_gm);
            this.mapObject.functionMap.set('MilligramToMicrogram', this.formulas.mass.mg_mcg);
            this.mapObject.functionMap.set('MilligramToImperialton', this.formulas.mass.mg_imptn);
            this.mapObject.functionMap.set('MilligramToUSton', this.formulas.mass.mg_ustn);
            this.mapObject.functionMap.set('MilligramToStone', this.formulas.mass.mg_stn);
            this.mapObject.functionMap.set('MilligramToPound', this.formulas.mass.mg_lb);
            this.mapObject.functionMap.set('MilligramToOunce', this.formulas.mass.mg_onc);
            // Mass --> Microgram
            this.mapObject.functionMap.set('MicrogramToTonne', this.formulas.mass.mcg_tn);
            this.mapObject.functionMap.set('MicrogramToKilogram', this.formulas.mass.mcg_kg);
            this.mapObject.functionMap.set('MicrogramToGram', this.formulas.mass.mcg_gm);
            this.mapObject.functionMap.set('MicrogramToMilligram', this.formulas.mass.mcg_mg);
            this.mapObject.functionMap.set('MicrogramToImperialton', this.formulas.mass.mcg_imptn);
            this.mapObject.functionMap.set('MicrogramToUSton', this.formulas.mass.mcg_ustn);
            this.mapObject.functionMap.set('MicrogramToStone', this.formulas.mass.mcg_stn);
            this.mapObject.functionMap.set('MicrogramToPound', this.formulas.mass.mcg_lb);
            this.mapObject.functionMap.set('MicrogramToOunce', this.formulas.mass.mcg_onc);
            // Mass --> Imperial ton
            this.mapObject.functionMap.set('ImperialtonToTonne', this.formulas.mass.imptn_tn);
            this.mapObject.functionMap.set('ImperialtonToKilogram', this.formulas.mass.imptn_kg);
            this.mapObject.functionMap.set('ImperialtonToGram', this.formulas.mass.imptn_gm);
            this.mapObject.functionMap.set('ImperialtonToMilligram', this.formulas.mass.imptn_mg);
            this.mapObject.functionMap.set('ImperialtonToMicrogram', this.formulas.mass.imptn_mcg);
            this.mapObject.functionMap.set('ImperialtonToUSton', this.formulas.mass.imptn_ustn);
            this.mapObject.functionMap.set('ImperialtonToStone', this.formulas.mass.imptn_stn);
            this.mapObject.functionMap.set('ImperialtonToPound', this.formulas.mass.imptn_lb);
            this.mapObject.functionMap.set('ImperialtonToOunce', this.formulas.mass.imptn_onc);
            // Mass --> US ton
            this.mapObject.functionMap.set('UStonToTonne', this.formulas.mass.ustn_tn);
            this.mapObject.functionMap.set('UStonToKilogram', this.formulas.mass.ustn_kg);
            this.mapObject.functionMap.set('UStonToGram', this.formulas.mass.ustn_gm);
            this.mapObject.functionMap.set('UStonToMilligram', this.formulas.mass.ustn_mg);
            this.mapObject.functionMap.set('UStonToMicrogram', this.formulas.mass.ustn_mcg);
            this.mapObject.functionMap.set('UStonToImperialton', this.formulas.mass.ustn_imptn);
            this.mapObject.functionMap.set('UStonToStone', this.formulas.mass.ustn_stn);
            this.mapObject.functionMap.set('UStonToPound', this.formulas.mass.ustn_lb);
            this.mapObject.functionMap.set('UStonToOunce', this.formulas.mass.ustn_onc);
            // Mass --> Stone
            this.mapObject.functionMap.set('StoneToTonne', this.formulas.mass.stn_tn);
            this.mapObject.functionMap.set('StoneToKilogram', this.formulas.mass.stn_kg);
            this.mapObject.functionMap.set('StoneToGram', this.formulas.mass.stn_gm);
            this.mapObject.functionMap.set('StoneToMilligram', this.formulas.mass.stn_mg);
            this.mapObject.functionMap.set('StoneToMicrogram', this.formulas.mass.stn_mcg);
            this.mapObject.functionMap.set('StoneToImperialton', this.formulas.mass.stn_imptn);
            this.mapObject.functionMap.set('StoneToUSton', this.formulas.mass.stn_ustn);
            this.mapObject.functionMap.set('StoneToPound', this.formulas.mass.stn_lb);
            this.mapObject.functionMap.set('StoneToOunce', this.formulas.mass.stn_onc);
            // Mass --> pound
            this.mapObject.functionMap.set('PoundToTonne', this.formulas.mass.lb_tn);
            this.mapObject.functionMap.set('PoundToKilogram', this.formulas.mass.lb_kg);
            this.mapObject.functionMap.set('PoundToGram', this.formulas.mass.lb_gm);
            this.mapObject.functionMap.set('PoundToMilligram', this.formulas.mass.lb_mg);
            this.mapObject.functionMap.set('PoundToMicrogram', this.formulas.mass.lb_mcg);
            this.mapObject.functionMap.set('PoundToImperialton', this.formulas.mass.lb_imptn);
            this.mapObject.functionMap.set('PoundToUSton', this.formulas.mass.lb_ustn);
            this.mapObject.functionMap.set('PoundToStone', this.formulas.mass.lb_stn);
            this.mapObject.functionMap.set('PoundToOunce', this.formulas.mass.lb_onc);
            // mass --> tonne
            this.mapObject.functionMap.set('OunceToTonne', this.formulas.mass.onc_tn);
            this.mapObject.functionMap.set('OunceToKilogram', this.formulas.mass.onc_kg);
            this.mapObject.functionMap.set('OunceToGram', this.formulas.mass.onc_gm);
            this.mapObject.functionMap.set('OunceToMilligram', this.formulas.mass.onc_mg);
            this.mapObject.functionMap.set('OunceToMicrogram', this.formulas.mass.onc_mcg);
            this.mapObject.functionMap.set('OunceToImperialton', this.formulas.mass.onc_imptn);
            this.mapObject.functionMap.set('OunceToUSton', this.formulas.mass.onc_ustn);
            this.mapObject.functionMap.set('OunceToStone', this.formulas.mass.onc_stn);
            this.mapObject.functionMap.set('OunceToPound', this.formulas.mass.onc_lb);
            //// Time ///
            //  Time -> nanosecond
            this.mapObject.functionMap.set('NanosecondToMicrosecond', this.formulas.time.ns_mics);
            this.mapObject.functionMap.set('NanosecondToMillisecond', this.formulas.time.ns_ms);
            this.mapObject.functionMap.set('NanosecondToSecond', this.formulas.time.ns_sec);
            this.mapObject.functionMap.set('NanosecondToMinute', this.formulas.time.ns_min);
            this.mapObject.functionMap.set('NanosecondToHour', this.formulas.time.ns_hr);
            this.mapObject.functionMap.set('NanosecondToDay', this.formulas.time.ns_day);
            this.mapObject.functionMap.set('NanosecondToWeek', this.formulas.time.ns_wk);
            this.mapObject.functionMap.set('NanosecondToMonth', this.formulas.time.ns_mon);
            this.mapObject.functionMap.set('NanosecondToYear', this.formulas.time.ns_yr);
            this.mapObject.functionMap.set('NanosecondToDecade', this.formulas.time.ns_dcd);
            this.mapObject.functionMap.set('NanosecondToCentury', this.formulas.time.ns_cent);
            //  Time -> Microsecond
            this.mapObject.functionMap.set('MicrosecondToNanosecond', this.formulas.time.mics_ns);
            this.mapObject.functionMap.set('MicrosecondToMillisecond', this.formulas.time.mics_ms);
            this.mapObject.functionMap.set('MicrosecondToSecond', this.formulas.time.mics_sec);
            this.mapObject.functionMap.set('MicrosecondToMinute', this.formulas.time.mics_min);
            this.mapObject.functionMap.set('MicrosecondToHour', this.formulas.time.mics_hr);
            this.mapObject.functionMap.set('MicrosecondToDay', this.formulas.time.mics_day);
            this.mapObject.functionMap.set('MicrosecondToWeek', this.formulas.time.mics_wk);
            this.mapObject.functionMap.set('MicrosecondToMonth', this.formulas.time.mics_mon);
            this.mapObject.functionMap.set('MicrosecondToYear', this.formulas.time.mics_yr);
            this.mapObject.functionMap.set('MicrosecondToDecade', this.formulas.time.mics_dcd);
            this.mapObject.functionMap.set('MicrosecondToCentury', this.formulas.time.mics_cent);
            //  Time -> Millisecond
            this.mapObject.functionMap.set('MillisecondToNanosecond', this.formulas.time.ms_ns);
            this.mapObject.functionMap.set('MillisecondToMicrosecond', this.formulas.time.ms_mics);
            this.mapObject.functionMap.set('MillisecondToSecond', this.formulas.time.ms_sec);
            this.mapObject.functionMap.set('MillisecondToMinute', this.formulas.time.ms_min);
            this.mapObject.functionMap.set('MillisecondToHour', this.formulas.time.ms_hr);
            this.mapObject.functionMap.set('MillisecondToDay', this.formulas.time.ms_day);
            this.mapObject.functionMap.set('MillisecondToWeek', this.formulas.time.ms_wk);
            this.mapObject.functionMap.set('MillisecondToMonth', this.formulas.time.ms_mon);
            this.mapObject.functionMap.set('MillisecondToYear', this.formulas.time.ms_yr);
            this.mapObject.functionMap.set('MillisecondToDecade', this.formulas.time.ms_dcd);
            this.mapObject.functionMap.set('MillisecondToCentury', this.formulas.time.ms_cent);
            //  Time -> Second
            this.mapObject.functionMap.set('SecondToNanosecond', this.formulas.time.sec_ns);
            this.mapObject.functionMap.set('SecondToMicrosecond', this.formulas.time.sec_mics);
            this.mapObject.functionMap.set('SecondToMillisecond', this.formulas.time.sec_ms);
            this.mapObject.functionMap.set('SecondToMinute', this.formulas.time.sec_min);
            this.mapObject.functionMap.set('SecondToHour', this.formulas.time.sec_hr);
            this.mapObject.functionMap.set('SecondToDay', this.formulas.time.sec_day);
            this.mapObject.functionMap.set('SecondToWeek', this.formulas.time.sec_wk);
            this.mapObject.functionMap.set('SecondToMonth', this.formulas.time.sec_mon);
            this.mapObject.functionMap.set('SecondToYear', this.formulas.time.sec_yr);
            this.mapObject.functionMap.set('SecondToDecade', this.formulas.time.sec_dcd);
            this.mapObject.functionMap.set('SecondToCentury', this.formulas.time.sec_cent);
            //  Time -> Minute
            this.mapObject.functionMap.set('MinuteToNanosecond', this.formulas.time.min_ns);
            this.mapObject.functionMap.set('MinuteToMicrosecond', this.formulas.time.min_mics);
            this.mapObject.functionMap.set('MinuteToMillisecond', this.formulas.time.min_ms);
            this.mapObject.functionMap.set('MinuteToSecond', this.formulas.time.min_sec);
            this.mapObject.functionMap.set('MinuteToHour', this.formulas.time.min_hr);
            this.mapObject.functionMap.set('MinuteToDay', this.formulas.time.min_day);
            this.mapObject.functionMap.set('MinuteToWeek', this.formulas.time.min_wk);
            this.mapObject.functionMap.set('MinuteToMonth', this.formulas.time.min_mon);
            this.mapObject.functionMap.set('MinuteToYear', this.formulas.time.min_yr);
            this.mapObject.functionMap.set('MinuteToDecade', this.formulas.time.min_dcd);
            this.mapObject.functionMap.set('MinuteToCentury', this.formulas.time.min_cent);
            //  Time -> Hour
            this.mapObject.functionMap.set('HourToNanosecond', this.formulas.time.hr_ns);
            this.mapObject.functionMap.set('HourToMicrosecond', this.formulas.time.hr_mics);
            this.mapObject.functionMap.set('HourToMillisecond', this.formulas.time.hr_ms);
            this.mapObject.functionMap.set('HourToSecond', this.formulas.time.hr_sec);
            this.mapObject.functionMap.set('HourToMinute', this.formulas.time.hr_min);
            this.mapObject.functionMap.set('HourToDay', this.formulas.time.hr_day);
            this.mapObject.functionMap.set('HourToWeek', this.formulas.time.hr_wk);
            this.mapObject.functionMap.set('HourToMonth', this.formulas.time.hr_mon);
            this.mapObject.functionMap.set('HourToYear', this.formulas.time.hr_yr);
            this.mapObject.functionMap.set('HourToDecade', this.formulas.time.hr_dcd);
            this.mapObject.functionMap.set('HourToCentury', this.formulas.time.hr_cent);
            //  Time -> Day
            this.mapObject.functionMap.set('DayToNanosecond', this.formulas.time.day_ns);
            this.mapObject.functionMap.set('DayToMicrosecond', this.formulas.time.day_mics);
            this.mapObject.functionMap.set('DayToMillisecond', this.formulas.time.day_ms);
            this.mapObject.functionMap.set('DayToSecond', this.formulas.time.day_sec);
            this.mapObject.functionMap.set('DayToMinute', this.formulas.time.day_min);
            this.mapObject.functionMap.set('DayToHour', this.formulas.time.day_hr);
            this.mapObject.functionMap.set('DayToWeek', this.formulas.time.day_wk);
            this.mapObject.functionMap.set('DayToMonth', this.formulas.time.day_mon);
            this.mapObject.functionMap.set('DayToYear', this.formulas.time.day_yr);
            this.mapObject.functionMap.set('DayToDecade', this.formulas.time.day_dcd);
            this.mapObject.functionMap.set('DayToCentury', this.formulas.time.day_cent);
            //  Time -> Week
            this.mapObject.functionMap.set('WeekToNanosecond', this.formulas.time.wk_ns);
            this.mapObject.functionMap.set('WeekToMicrosecond', this.formulas.time.wk_mics);
            this.mapObject.functionMap.set('WeekToMillisecond', this.formulas.time.wk_ms);
            this.mapObject.functionMap.set('WeekToSecond', this.formulas.time.wk_sec);
            this.mapObject.functionMap.set('WeekToMinute', this.formulas.time.wk_min);
            this.mapObject.functionMap.set('WeekToHour', this.formulas.time.wk_hr);
            this.mapObject.functionMap.set('WeekToDay', this.formulas.time.wk_day);
            this.mapObject.functionMap.set('WeekToMonth', this.formulas.time.wk_mon);
            this.mapObject.functionMap.set('WeekToYear', this.formulas.time.wk_yr);
            this.mapObject.functionMap.set('WeekToDecade', this.formulas.time.wk_dcd);
            this.mapObject.functionMap.set('WeekToCentury', this.formulas.time.wk_cent);
            //  Time -> Month
            this.mapObject.functionMap.set('MonthToNanosecond', this.formulas.time.mon_ns);
            this.mapObject.functionMap.set('MonthToMicrosecond', this.formulas.time.mon_mics);
            this.mapObject.functionMap.set('MonthToMillisecond', this.formulas.time.mon_ms);
            this.mapObject.functionMap.set('MonthToSecond', this.formulas.time.mon_sec);
            this.mapObject.functionMap.set('MonthToMinute', this.formulas.time.mon_min);
            this.mapObject.functionMap.set('MonthToHour', this.formulas.time.mon_hr);
            this.mapObject.functionMap.set('MonthToDay', this.formulas.time.mon_day);
            this.mapObject.functionMap.set('MonthToWeek', this.formulas.time.mon_wk);
            this.mapObject.functionMap.set('MonthToYear', this.formulas.time.mon_yr);
            this.mapObject.functionMap.set('MonthToDecade', this.formulas.time.mon_dcd);
            this.mapObject.functionMap.set('MonthToCentury', this.formulas.time.mon_cent);
            //  Time -> Year
            this.mapObject.functionMap.set('YearToNanosecond', this.formulas.time.yr_ns);
            this.mapObject.functionMap.set('YearToMicrosecond', this.formulas.time.yr_mics);
            this.mapObject.functionMap.set('YearToMillisecond', this.formulas.time.yr_ms);
            this.mapObject.functionMap.set('YearToSecond', this.formulas.time.yr_sec);
            this.mapObject.functionMap.set('YearToMinute', this.formulas.time.yr_min);
            this.mapObject.functionMap.set('YearToHour', this.formulas.time.yr_hr);
            this.mapObject.functionMap.set('YearToDay', this.formulas.time.yr_day);
            this.mapObject.functionMap.set('YearToWeek', this.formulas.time.yr_wk);
            this.mapObject.functionMap.set('YearToMonth', this.formulas.time.yr_mon);
            this.mapObject.functionMap.set('YearToDecade', this.formulas.time.yr_dcd);
            this.mapObject.functionMap.set('YearToCentury', this.formulas.time.yr_cent);
            //  Time -> Decade
            this.mapObject.functionMap.set('DecadeToNanosecond', this.formulas.time.dcd_ns);
            this.mapObject.functionMap.set('DecadeToMicrosecond', this.formulas.time.dcd_mics);
            this.mapObject.functionMap.set('DecadeToMillisecond', this.formulas.time.dcd_ms);
            this.mapObject.functionMap.set('DecadeToSecond', this.formulas.time.dcd_sec);
            this.mapObject.functionMap.set('DecadeToMinute', this.formulas.time.dcd_min);
            this.mapObject.functionMap.set('DecadeToHour', this.formulas.time.dcd_hr);
            this.mapObject.functionMap.set('DecadeToDay', this.formulas.time.dcd_day);
            this.mapObject.functionMap.set('DecadeToWeek', this.formulas.time.dcd_wk);
            this.mapObject.functionMap.set('DecadeToMonth', this.formulas.time.dcd_mon);
            this.mapObject.functionMap.set('DecadeToYear', this.formulas.time.dcd_yr);
            this.mapObject.functionMap.set('DecadeToCentury', this.formulas.time.dcd_cent);
            //  Time -> Century
            this.mapObject.functionMap.set('CenturyToNanosecond', this.formulas.time.cent_ns);
            this.mapObject.functionMap.set('CenturyToMicrosecond', this.formulas.time.cent_mics);
            this.mapObject.functionMap.set('CenturyToMillisecond', this.formulas.time.cent_ms);
            this.mapObject.functionMap.set('CenturyToSecond', this.formulas.time.cent_sec);
            this.mapObject.functionMap.set('CenturyToMinute', this.formulas.time.cent_min);
            this.mapObject.functionMap.set('CenturyToHour', this.formulas.time.cent_hr);
            this.mapObject.functionMap.set('CenturyToDay', this.formulas.time.cent_day);
            this.mapObject.functionMap.set('CenturyToWeek', this.formulas.time.cent_wk);
            this.mapObject.functionMap.set('CenturyToMonth', this.formulas.time.cent_mon);
            this.mapObject.functionMap.set('CenturyToYear', this.formulas.time.cent_yr);
            this.mapObject.functionMap.set('CenturyToDecade', this.formulas.time.cent_dcd);

            ////// Volume //////
            // Volume --> US liquid gallon
            this.mapObject.functionMap.set('USliquidgallonToLiter', this.formulas.volume.uslgal_lt);
            this.mapObject.functionMap.set('USliquidgallonToMilliliter', this.formulas.volume.uslgal_mlt);
            this.mapObject.functionMap.set('USliquidgallonToUSliquidquart', this.formulas.volume.uslgal_uslqt);
            this.mapObject.functionMap.set('USliquidgallonToUSliquidpint', this.formulas.volume.uslgal_uslpt);
            this.mapObject.functionMap.set('USliquidgallonToUSlegalcup', this.formulas.volume.uslgal_uslgcp);
            this.mapObject.functionMap.set('USliquidgallonToUSfluidounce', this.formulas.volume.uslgal_usflonc);
            this.mapObject.functionMap.set('USliquidgallonToUStablespoon', this.formulas.volume.uslgal_ustbsp);
            this.mapObject.functionMap.set('USliquidgallonToUSteaspoon', this.formulas.volume.uslgal_ustsp);
            this.mapObject.functionMap.set('USliquidgallonToCubicmeter', this.formulas.volume.uslgal_cumt);
            this.mapObject.functionMap.set('USliquidgallonToImperialgallon', this.formulas.volume.uslgal_impgal);
            this.mapObject.functionMap.set('USliquidgallonToImperialliquidquart', this.formulas.volume.uslgal_impqt);
            this.mapObject.functionMap.set('USliquidgallonToImperialliquidpint', this.formulas.volume.uslgal_imppt);
            this.mapObject.functionMap.set('USliquidgallonToImperiallegalcup', this.formulas.volume.uslgal_implgcp);
            this.mapObject.functionMap.set('USliquidgallonToImperialfluidounce', this.formulas.volume.uslgal_impflonc);
            this.mapObject.functionMap.set('USliquidgallonToImperialtablespoon', this.formulas.volume.uslgal_imptbsp);
            this.mapObject.functionMap.set('USliquidgallonToImperialteaspoon', this.formulas.volume.uslgal_imptsp);
            this.mapObject.functionMap.set('USliquidgallonToCubicfoot', this.formulas.volume.uslgal_cuft);
            this.mapObject.functionMap.set('USliquidgallonToCubicinch', this.formulas.volume.uslgal_cuin);
            // Volume --> Liter
            this.mapObject.functionMap.set('LiterToUSliquidgallon', this.formulas.volume.lt_uslgal);
            this.mapObject.functionMap.set('LiterToMilliliter', this.formulas.volume.lt_mlt);
            this.mapObject.functionMap.set('LiterToUSliquidquart', this.formulas.volume.lt_uslqt);
            this.mapObject.functionMap.set('LiterToUSliquidpint', this.formulas.volume.lt_uslpt);
            this.mapObject.functionMap.set('LiterToUSlegalcup', this.formulas.volume.lt_uslgcp);
            this.mapObject.functionMap.set('LiterToUSfluidounce', this.formulas.volume.lt_usflonc);
            this.mapObject.functionMap.set('LiterToUStablespoon', this.formulas.volume.lt_ustbsp);
            this.mapObject.functionMap.set('LiterToUSteaspoon', this.formulas.volume.lt_ustsp);
            this.mapObject.functionMap.set('LiterToCubicmeter', this.formulas.volume.lt_cumt);
            this.mapObject.functionMap.set('LiterToImperialgallon', this.formulas.volume.lt_impgal);
            this.mapObject.functionMap.set('LiterToImperialliquidquart', this.formulas.volume.lt_impqt);
            this.mapObject.functionMap.set('LiterToImperialliquidpint', this.formulas.volume.lt_imppt);
            this.mapObject.functionMap.set('LiterToImperiallegalcup', this.formulas.volume.lt_implgcp);
            this.mapObject.functionMap.set('LiterToImperialfluidounce', this.formulas.volume.lt_impflonc);
            this.mapObject.functionMap.set('LiterToImperialtablespoon', this.formulas.volume.lt_imptbsp);
            this.mapObject.functionMap.set('LiterToImperialteaspoon', this.formulas.volume.lt_imptsp);
            this.mapObject.functionMap.set('LiterToCubicfoot', this.formulas.volume.lt_cuft);
            this.mapObject.functionMap.set('LiterToCubicinch', this.formulas.volume.lt_cuin);
            // Volume --> Millileter
            this.mapObject.functionMap.set('MilliliterToUSliquidgallon', this.formulas.volume.mlt_uslgal);
            this.mapObject.functionMap.set('MilliliterToLiter', this.formulas.volume.mlt_lt);
            this.mapObject.functionMap.set('MilliliterToUSliquidquart', this.formulas.volume.mlt_uslqt);
            this.mapObject.functionMap.set('MilliliterToUSliquidpint', this.formulas.volume.mlt_uslpt);
            this.mapObject.functionMap.set('MilliliterToUSlegalcup', this.formulas.volume.mlt_uslgcp);
            this.mapObject.functionMap.set('MilliliterToUSfluidounce', this.formulas.volume.mlt_usflonc);
            this.mapObject.functionMap.set('MilliliterToUStablespoon', this.formulas.volume.mlt_ustbsp);
            this.mapObject.functionMap.set('MilliliterToUSteaspoon', this.formulas.volume.mlt_ustsp);
            this.mapObject.functionMap.set('MilliliterToCubicmeter', this.formulas.volume.mlt_cumt);
            this.mapObject.functionMap.set('MilliliterToImperialgallon', this.formulas.volume.mlt_impgal);
            this.mapObject.functionMap.set('MilliliterToImperialliquidquart', this.formulas.volume.mlt_impqt);
            this.mapObject.functionMap.set('MilliliterToImperialliquidpint', this.formulas.volume.mlt_imppt);
            this.mapObject.functionMap.set('MilliliterToImperiallegalcup', this.formulas.volume.mlt_implgcp);
            this.mapObject.functionMap.set('MilliliterToImperialfluidounce', this.formulas.volume.mlt_impflonc);
            this.mapObject.functionMap.set('MilliliterToImperialtablespoon', this.formulas.volume.mlt_imptbsp);
            this.mapObject.functionMap.set('MilliliterToImperialteaspoon', this.formulas.volume.mlt_imptsp);
            this.mapObject.functionMap.set('MilliliterToCubicfoot', this.formulas.volume.mlt_cuft);
            this.mapObject.functionMap.set('MilliliterToCubicinch', this.formulas.volume.mlt_cuin);
            // Volume --> US liquid quart
            this.mapObject.functionMap.set('USliquidquartToUSliquidgallon', this.formulas.volume.uslqt_uslgal);
            this.mapObject.functionMap.set('USliquidquartToLiter', this.formulas.volume.uslqt_lt);
            this.mapObject.functionMap.set('USliquidquartToMilliliter', this.formulas.volume.uslqt_mlt);
            this.mapObject.functionMap.set('USliquidquartToUSliquidpint', this.formulas.volume.uslqt_uslpt);
            this.mapObject.functionMap.set('USliquidquartToUSlegalcup', this.formulas.volume.uslqt_uslgcp);
            this.mapObject.functionMap.set('USliquidquartToUSfluidounce', this.formulas.volume.uslqt_usflonc);
            this.mapObject.functionMap.set('USliquidquartToUStablespoon', this.formulas.volume.uslqt_ustbsp);
            this.mapObject.functionMap.set('USliquidquartToUSteaspoon', this.formulas.volume.uslqt_ustsp);
            this.mapObject.functionMap.set('USliquidquartToCubicmeter', this.formulas.volume.uslqt_cumt);
            this.mapObject.functionMap.set('USliquidquartToImperialgallon', this.formulas.volume.uslqt_impgal);
            this.mapObject.functionMap.set('USliquidquartToImperialliquidquart', this.formulas.volume.uslqt_impqt);
            this.mapObject.functionMap.set('USliquidquartToImperialliquidpint', this.formulas.volume.uslqt_imppt);
            this.mapObject.functionMap.set('USliquidquartToImperiallegalcup', this.formulas.volume.uslqt_implgcp);
            this.mapObject.functionMap.set('USliquidquartToImperialfluidounce', this.formulas.volume.uslqt_impflonc);
            this.mapObject.functionMap.set('USliquidquartToImperialtablespoon', this.formulas.volume.uslqt_imptbsp);
            this.mapObject.functionMap.set('USliquidquartToImperialteaspoon', this.formulas.volume.uslqt_imptsp);
            this.mapObject.functionMap.set('USliquidquartToCubicfoot', this.formulas.volume.uslqt_cuft);
            this.mapObject.functionMap.set('USliquidquartToCubicinch', this.formulas.volume.uslqt_cuin);
            // Volume --> US liquid pint
            this.mapObject.functionMap.set('USliquidpintToUSliquidgallon', this.formulas.volume.uslpt_uslgal);
            this.mapObject.functionMap.set('USliquidpintToLiter', this.formulas.volume.uslpt_lt);
            this.mapObject.functionMap.set('USliquidpintToMilliliter', this.formulas.volume.uslpt_mlt);
            this.mapObject.functionMap.set('USliquidpintToUSliquidquart', this.formulas.volume.uslpt_uslqt);
            this.mapObject.functionMap.set('USliquidpintToUSlegalcup', this.formulas.volume.uslpt_uslgcp);
            this.mapObject.functionMap.set('USliquidpintToUSfluidounce', this.formulas.volume.uslpt_usflonc);
            this.mapObject.functionMap.set('USliquidpintToUStablespoon', this.formulas.volume.uslpt_ustbsp);
            this.mapObject.functionMap.set('USliquidpintToUSteaspoon', this.formulas.volume.uslpt_ustsp);
            this.mapObject.functionMap.set('USliquidpintToCubicmeter', this.formulas.volume.uslpt_cumt);
            this.mapObject.functionMap.set('USliquidpintToImperialgallon', this.formulas.volume.uslpt_impgal);
            this.mapObject.functionMap.set('USliquidpintToImperialliquidquart', this.formulas.volume.uslpt_impqt);
            this.mapObject.functionMap.set('USliquidpintToImperialliquidpint', this.formulas.volume.uslpt_imppt);
            this.mapObject.functionMap.set('USliquidpintToImperiallegalcup', this.formulas.volume.uslpt_implgcp);
            this.mapObject.functionMap.set('USliquidpintToImperialfluidounce', this.formulas.volume.uslpt_impflonc);
            this.mapObject.functionMap.set('USliquidpintToImperialtablespoon', this.formulas.volume.uslpt_imptbsp);
            this.mapObject.functionMap.set('USliquidpintToImperialteaspoon', this.formulas.volume.uslpt_imptsp);
            this.mapObject.functionMap.set('USliquidpintToCubicfoot', this.formulas.volume.uslpt_cuft);
            this.mapObject.functionMap.set('USliquidpintToCubicinch', this.formulas.volume.uslpt_cuin);
            // Volume --> US legal cup
            this.mapObject.functionMap.set('USlegalcupToUSliquidgallon', this.formulas.volume.uslgcp_uslgal);
            this.mapObject.functionMap.set('USlegalcupToLiter', this.formulas.volume.uslgcp_lt);
            this.mapObject.functionMap.set('USlegalcupToMilliliter', this.formulas.volume.uslgcp_mlt);
            this.mapObject.functionMap.set('USlegalcupToUSliquidquart', this.formulas.volume.uslgcp_uslqt);
            this.mapObject.functionMap.set('USlegalcupToUSliquidpint', this.formulas.volume.uslgcp_uslpt);
            this.mapObject.functionMap.set('USlegalcupToUSfluidounce', this.formulas.volume.uslgcp_usflonc);
            this.mapObject.functionMap.set('USlegalcupToUStablespoon', this.formulas.volume.uslgcp_ustbsp);
            this.mapObject.functionMap.set('USlegalcupToUSteaspoon', this.formulas.volume.uslgcp_ustsp);
            this.mapObject.functionMap.set('USlegalcupToCubicmeter', this.formulas.volume.uslgcp_cumt);
            this.mapObject.functionMap.set('USlegalcupToImperialgallon', this.formulas.volume.uslgcp_impgal);
            this.mapObject.functionMap.set('USlegalcupToImperialliquidquart', this.formulas.volume.uslgcp_impqt);
            this.mapObject.functionMap.set('USlegalcupToImperialliquidpint', this.formulas.volume.uslgcp_imppt);
            this.mapObject.functionMap.set('USlegalcupToImperiallegalcup', this.formulas.volume.uslgcp_implgcp);
            this.mapObject.functionMap.set('USlegalcupToImperialfluidounce', this.formulas.volume.uslgcp_impflonc);
            this.mapObject.functionMap.set('USlegalcupToImperialtablespoon', this.formulas.volume.uslgcp_imptbsp);
            this.mapObject.functionMap.set('USlegalcupToImperialteaspoon', this.formulas.volume.uslgcp_imptsp);
            this.mapObject.functionMap.set('USlegalcupToCubicfoot', this.formulas.volume.uslgcp_cuft);
            this.mapObject.functionMap.set('USlegalcupToCubicinch', this.formulas.volume.uslgcp_cuin);

            this.mapObject.functionMap.set('USfluidounceToUSliquidgallon', this.formulas.volume.usflonc_uslgal);
            this.mapObject.functionMap.set('USfluidounceToLiter', this.formulas.volume.usflonc_lt);
            this.mapObject.functionMap.set('USfluidounceToMilliliter', this.formulas.volume.usflonc_mlt);
            this.mapObject.functionMap.set('USfluidounceToUSliquidquart', this.formulas.volume.usflonc_uslqt);
            this.mapObject.functionMap.set('USfluidounceToUSliquidpint', this.formulas.volume.usflonc_uslpt);
            this.mapObject.functionMap.set('USfluidounceToUSlegalcup', this.formulas.volume.usflonc_uslgcp);
            this.mapObject.functionMap.set('USfluidounceToUStablespoon', this.formulas.volume.usflonc_ustbsp);
            this.mapObject.functionMap.set('USfluidounceToUSteaspoon', this.formulas.volume.usflonc_ustsp);
            this.mapObject.functionMap.set('USfluidounceToCubicmeter', this.formulas.volume.usflonc_cumt);
            this.mapObject.functionMap.set('USfluidounceToImperialgallon', this.formulas.volume.usflonc_impgal);
            this.mapObject.functionMap.set('USfluidounceToImperialliquidquart', this.formulas.volume.usflonc_impqt);
            this.mapObject.functionMap.set('USfluidounceToImperialliquidpint', this.formulas.volume.usflonc_imppt);
            this.mapObject.functionMap.set('USfluidounceToImperiallegalcup', this.formulas.volume.usflonc_implgcp);
            this.mapObject.functionMap.set('USfluidounceToImperialfluidounce', this.formulas.volume.usflonc_impflonc);
            this.mapObject.functionMap.set('USfluidounceToImperialtablespoon', this.formulas.volume.usflonc_imptbsp);
            this.mapObject.functionMap.set('USfluidounceToImperialteaspoon', this.formulas.volume.usflonc_imptsp);
            this.mapObject.functionMap.set('USfluidounceToCubicfoot', this.formulas.volume.usflonc_cuft);
            this.mapObject.functionMap.set('USfluidounceToCubicinch', this.formulas.volume.usflonc_cuin);
            this.mapObject.functionMap.set('UStablespoonToUSliquidgallon', this.formulas.volume.ustbsp_uslgal);
            this.mapObject.functionMap.set('UStablespoonToLiter', this.formulas.volume.ustbsp_lt);
            this.mapObject.functionMap.set('UStablespoonToMilliliter', this.formulas.volume.ustbsp_mlt);
            this.mapObject.functionMap.set('UStablespoonToUSliquidquart', this.formulas.volume.ustbsp_uslqt);
            this.mapObject.functionMap.set('UStablespoonToUSliquidpint', this.formulas.volume.ustbsp_uslpt);
            this.mapObject.functionMap.set('UStablespoonToUSlegalcup', this.formulas.volume.ustbsp_uslgcp);
            this.mapObject.functionMap.set('UStablespoonToUSfluidounce', this.formulas.volume.ustbsp_usflonc);
            this.mapObject.functionMap.set('UStablespoonToUSteaspoon', this.formulas.volume.ustbsp_ustsp);
            this.mapObject.functionMap.set('UStablespoonToCubicmeter', this.formulas.volume.ustbsp_cumt);
            this.mapObject.functionMap.set('UStablespoonToImperialgallon', this.formulas.volume.ustbsp_impgal);
            this.mapObject.functionMap.set('UStablespoonToImperialliquidquart', this.formulas.volume.ustbsp_impqt);
            this.mapObject.functionMap.set('UStablespoonToImperialliquidpint', this.formulas.volume.ustbsp_imppt);
            this.mapObject.functionMap.set('UStablespoonToImperiallegalcup', this.formulas.volume.ustbsp_implgcp);
            this.mapObject.functionMap.set('UStablespoonToImperialfluidounce', this.formulas.volume.ustbsp_impflonc);
            this.mapObject.functionMap.set('UStablespoonToImperialtablespoon', this.formulas.volume.ustbsp_imptbsp);
            this.mapObject.functionMap.set('UStablespoonToImperialteaspoon', this.formulas.volume.ustbsp_imptsp);
            this.mapObject.functionMap.set('UStablespoonToCubicfoot', this.formulas.volume.ustbsp_cuft);
            this.mapObject.functionMap.set('UStablespoonToCubicinch', this.formulas.volume.ustbsp_cuin);
            this.mapObject.functionMap.set('USteaspoonToUSliquidgallon', this.formulas.volume.ustsp_uslgal);
            this.mapObject.functionMap.set('USteaspoonToLiter', this.formulas.volume.ustsp_lt);
            this.mapObject.functionMap.set('USteaspoonToMilliliter', this.formulas.volume.ustsp_mlt);
            this.mapObject.functionMap.set('USteaspoonToUSliquidquart', this.formulas.volume.ustsp_uslqt);
            this.mapObject.functionMap.set('USteaspoonToUSliquidpint', this.formulas.volume.ustsp_uslpt);
            this.mapObject.functionMap.set('USteaspoonToUSlegalcup', this.formulas.volume.ustsp_uslgcp);
            this.mapObject.functionMap.set('USteaspoonToUSfluidounce', this.formulas.volume.ustsp_usflonc);
            this.mapObject.functionMap.set('USteaspoonToUStablespoon', this.formulas.volume.ustsp_ustbsp);
            this.mapObject.functionMap.set('USteaspoonToCubicmeter', this.formulas.volume.ustsp_cumt);
            this.mapObject.functionMap.set('USteaspoonToImperialgallon', this.formulas.volume.ustsp_impgal);
            this.mapObject.functionMap.set('USteaspoonToImperialliquidquart', this.formulas.volume.ustsp_impqt);
            this.mapObject.functionMap.set('USteaspoonToImperialliquidpint', this.formulas.volume.ustsp_imppt);
            this.mapObject.functionMap.set('USteaspoonToImperiallegalcup', this.formulas.volume.ustsp_implgcp);
            this.mapObject.functionMap.set('USteaspoonToImperialfluidounce', this.formulas.volume.ustsp_impflonc);
            this.mapObject.functionMap.set('USteaspoonToImperialtablespoon', this.formulas.volume.ustsp_imptbsp);
            this.mapObject.functionMap.set('USteaspoonToImperialteaspoon', this.formulas.volume.ustsp_imptsp);
            this.mapObject.functionMap.set('USteaspoonToCubicfoot', this.formulas.volume.ustsp_cuft);
            this.mapObject.functionMap.set('USteaspoonToCubicinch', this.formulas.volume.ustsp_cuin);
            this.mapObject.functionMap.set('CubicmeterToUSliquidgallon', this.formulas.volume.cumt_uslgal);
            this.mapObject.functionMap.set('CubicmeterToLiter', this.formulas.volume.cumt_lt);
            this.mapObject.functionMap.set('CubicmeterToMilliliter', this.formulas.volume.cumt_mlt);
            this.mapObject.functionMap.set('CubicmeterToUSliquidquart', this.formulas.volume.cumt_uslqt);
            this.mapObject.functionMap.set('CubicmeterToUSliquidpint', this.formulas.volume.cumt_uslpt);
            this.mapObject.functionMap.set('CubicmeterToUSlegalcup', this.formulas.volume.cumt_uslgcp);
            this.mapObject.functionMap.set('CubicmeterToUSfluidounce', this.formulas.volume.cumt_usflonc);
            this.mapObject.functionMap.set('CubicmeterToUStablespoon', this.formulas.volume.cumt_ustbsp);
            this.mapObject.functionMap.set('CubicmeterToUSteaspoon', this.formulas.volume.cumt_ustsp);
            this.mapObject.functionMap.set('CubicmeterToImperialgallon', this.formulas.volume.cumt_impgal);
            this.mapObject.functionMap.set('CubicmeterToImperialliquidquart', this.formulas.volume.cumt_impqt);
            this.mapObject.functionMap.set('CubicmeterToImperialliquidpint', this.formulas.volume.cumt_imppt);
            this.mapObject.functionMap.set('CubicmeterToImperiallegalcup', this.formulas.volume.cumt_implgcp);
            this.mapObject.functionMap.set('CubicmeterToImperialfluidounce', this.formulas.volume.cumt_impflonc);
            this.mapObject.functionMap.set('CubicmeterToImperialtablespoon', this.formulas.volume.cumt_imptbsp);
            this.mapObject.functionMap.set('CubicmeterToImperialteaspoon', this.formulas.volume.cumt_imptsp);
            this.mapObject.functionMap.set('CubicmeterToCubicfoot', this.formulas.volume.cumt_cuft);
            this.mapObject.functionMap.set('CubicmeterToCubicinch', this.formulas.volume.cumt_cuin);
            this.mapObject.functionMap.set('ImperialgallonToUSliquidgallon', this.formulas.volume.impgal_uslgal);
            this.mapObject.functionMap.set('ImperialgallonToLiter', this.formulas.volume.impgal_lt);
            this.mapObject.functionMap.set('ImperialgallonToMilliliter', this.formulas.volume.impgal_mlt);
            this.mapObject.functionMap.set('ImperialgallonToUSliquidquart', this.formulas.volume.impgal_uslqt);
            this.mapObject.functionMap.set('ImperialgallonToUSliquidpint', this.formulas.volume.impgal_uslpt);
            this.mapObject.functionMap.set('ImperialgallonToUSlegalcup', this.formulas.volume.impgal_uslgcp);
            this.mapObject.functionMap.set('ImperialgallonToUSfluidounce', this.formulas.volume.impgal_usflonc);
            this.mapObject.functionMap.set('ImperialgallonToUStablespoon', this.formulas.volume.impgal_ustbsp);
            this.mapObject.functionMap.set('ImperialgallonToUSteaspoon', this.formulas.volume.impgal_ustsp);
            this.mapObject.functionMap.set('ImperialgallonToCubicmeter', this.formulas.volume.impgal_cumt);
            this.mapObject.functionMap.set('ImperialgallonToImperialliquidquart', this.formulas.volume.impgal_impqt);
            this.mapObject.functionMap.set('ImperialgallonToImperialliquidpint', this.formulas.volume.impgal_imppt);
            this.mapObject.functionMap.set('ImperialgallonToImperiallegalcup', this.formulas.volume.impgal_implgcp);
            this.mapObject.functionMap.set('ImperialgallonToImperialfluidounce', this.formulas.volume.impgal_impflonc);
            this.mapObject.functionMap.set('ImperialgallonToImperialtablespoon', this.formulas.volume.impgal_imptbsp);
            this.mapObject.functionMap.set('ImperialgallonToImperialteaspoon', this.formulas.volume.impgal_imptsp);
            this.mapObject.functionMap.set('ImperialgallonToCubicfoot', this.formulas.volume.impgal_cuft);
            this.mapObject.functionMap.set('ImperialgallonToCubicinch', this.formulas.volume.impgal_cuin);
            this.mapObject.functionMap.set('ImperialliquidquartToUSliquidgallon', this.formulas.volume.impqt_uslgal);
            this.mapObject.functionMap.set('ImperialliquidquartToLiter', this.formulas.volume.impqt_lt);
            this.mapObject.functionMap.set('ImperialliquidquartToMilliliter', this.formulas.volume.impqt_mlt);
            this.mapObject.functionMap.set('ImperialliquidquartToUSliquidquart', this.formulas.volume.impqt_uslqt);
            this.mapObject.functionMap.set('ImperialliquidquartToUSliquidpint', this.formulas.volume.impqt_uslpt);
            this.mapObject.functionMap.set('ImperialliquidquartToUSlegalcup', this.formulas.volume.impqt_uslgcp);
            this.mapObject.functionMap.set('ImperialliquidquartToUSfluidounce', this.formulas.volume.impqt_usflonc);
            this.mapObject.functionMap.set('ImperialliquidquartToUStablespoon', this.formulas.volume.impqt_ustbsp);
            this.mapObject.functionMap.set('ImperialliquidquartToUSteaspoon', this.formulas.volume.impqt_ustsp);
            this.mapObject.functionMap.set('ImperialliquidquartToCubicmeter', this.formulas.volume.impqt_cumt);
            this.mapObject.functionMap.set('ImperialliquidquartToImperialgallon', this.formulas.volume.impqt_impgal);
            this.mapObject.functionMap.set('ImperialliquidquartToImperialliquidpint', this.formulas.volume.impqt_imppt);
            this.mapObject.functionMap.set('ImperialliquidquartToImperiallegalcup', this.formulas.volume.impqt_implgcp);
            this.mapObject.functionMap.set('ImperialliquidquartToImperialfluidounce', this.formulas.volume.impqt_impflonc);
            this.mapObject.functionMap.set('ImperialliquidquartToImperialtablespoon', this.formulas.volume.impqt_imptbsp);
            this.mapObject.functionMap.set('ImperialliquidquartToImperialteaspoon', this.formulas.volume.impqt_imptsp);
            this.mapObject.functionMap.set('ImperialliquidquartToCubicfoot', this.formulas.volume.impqt_cuft);
            this.mapObject.functionMap.set('ImperialliquidquartToCubicinch', this.formulas.volume.impqt_cuin);
            this.mapObject.functionMap.set('ImperialliquidpintToUSliquidgallon', this.formulas.volume.imppt_uslgal);
            this.mapObject.functionMap.set('ImperialliquidpintToLiter', this.formulas.volume.imppt_lt);
            this.mapObject.functionMap.set('ImperialliquidpintToMilliliter', this.formulas.volume.imppt_mlt);
            this.mapObject.functionMap.set('ImperialliquidpintToUSliquidquart', this.formulas.volume.imppt_uslqt);
            this.mapObject.functionMap.set('ImperialliquidpintToUSliquidpint', this.formulas.volume.imppt_uslpt);
            this.mapObject.functionMap.set('ImperialliquidpintToUSlegalcup', this.formulas.volume.imppt_uslgcp);
            this.mapObject.functionMap.set('ImperialliquidpintToUSfluidounce', this.formulas.volume.imppt_usflonc);
            this.mapObject.functionMap.set('ImperialliquidpintToUStablespoon', this.formulas.volume.imppt_ustbsp);
            this.mapObject.functionMap.set('ImperialliquidpintToUSteaspoon', this.formulas.volume.imppt_ustsp);
            this.mapObject.functionMap.set('ImperialliquidpintToCubicmeter', this.formulas.volume.imppt_cumt);
            this.mapObject.functionMap.set('ImperialliquidpintToImperialgallon', this.formulas.volume.imppt_impgal);
            this.mapObject.functionMap.set('ImperialliquidpintToImperialliquidquart', this.formulas.volume.imppt_impqt);
            this.mapObject.functionMap.set('ImperialliquidpintToImperiallegalcup', this.formulas.volume.imppt_implgcp);
            this.mapObject.functionMap.set('ImperialliquidpintToImperialfluidounce', this.formulas.volume.imppt_impflonc);
            this.mapObject.functionMap.set('ImperialliquidpintToImperialtablespoon', this.formulas.volume.imppt_imptbsp);
            this.mapObject.functionMap.set('ImperialliquidpintToImperialteaspoon', this.formulas.volume.imppt_imptsp);
            this.mapObject.functionMap.set('ImperialliquidpintToCubicfoot', this.formulas.volume.imppt_cuft);
            this.mapObject.functionMap.set('ImperialliquidpintToCubicinch', this.formulas.volume.imppt_cuin);
            this.mapObject.functionMap.set('ImperiallegalcupToUSliquidgallon', this.formulas.volume.implgcp_uslgal);
            this.mapObject.functionMap.set('ImperiallegalcupToLiter', this.formulas.volume.implgcp_lt);
            this.mapObject.functionMap.set('ImperiallegalcupToMilliliter', this.formulas.volume.implgcp_mlt);
            this.mapObject.functionMap.set('ImperiallegalcupToUSliquidquart', this.formulas.volume.implgcp_uslqt);
            this.mapObject.functionMap.set('ImperiallegalcupToUSliquidpint', this.formulas.volume.implgcp_uslpt);
            this.mapObject.functionMap.set('ImperiallegalcupToUSlegalcup', this.formulas.volume.implgcp_uslgcp);
            this.mapObject.functionMap.set('ImperiallegalcupToUSfluidounce', this.formulas.volume.implgcp_usflonc);
            this.mapObject.functionMap.set('ImperiallegalcupToUStablespoon', this.formulas.volume.implgcp_ustbsp);
            this.mapObject.functionMap.set('ImperiallegalcupToUSteaspoon', this.formulas.volume.implgcp_ustsp);
            this.mapObject.functionMap.set('ImperiallegalcupToCubicmeter', this.formulas.volume.implgcp_cumt);
            this.mapObject.functionMap.set('ImperiallegalcupToImperialgallon', this.formulas.volume.implgcp_impgal);
            this.mapObject.functionMap.set('ImperiallegalcupToImperialliquidquart', this.formulas.volume.implgcp_impqt);
            this.mapObject.functionMap.set('ImperiallegalcupToImperialliquidpint', this.formulas.volume.implgcp_imppt);
            this.mapObject.functionMap.set('ImperiallegalcupToImperialfluidounce', this.formulas.volume.implgcp_impflonc);
            this.mapObject.functionMap.set('ImperiallegalcupToImperialtablespoon', this.formulas.volume.implgcp_imptbsp);
            this.mapObject.functionMap.set('ImperiallegalcupToImperialteaspoon', this.formulas.volume.implgcp_imptsp);
            this.mapObject.functionMap.set('ImperiallegalcupToCubicfoot', this.formulas.volume.implgcp_cuft);
            this.mapObject.functionMap.set('ImperiallegalcupToCubicinch', this.formulas.volume.implgcp_cuin);
            this.mapObject.functionMap.set('ImperialfluidounceToUSliquidgallon', this.formulas.volume.impflonc_uslgal);
            this.mapObject.functionMap.set('ImperialfluidounceToLiter', this.formulas.volume.impflonc_lt);
            this.mapObject.functionMap.set('ImperialfluidounceToMilliliter', this.formulas.volume.impflonc_mlt);
            this.mapObject.functionMap.set('ImperialfluidounceToUSliquidquart', this.formulas.volume.impflonc_uslqt);
            this.mapObject.functionMap.set('ImperialfluidounceToUSliquidpint', this.formulas.volume.impflonc_uslpt);
            this.mapObject.functionMap.set('ImperialfluidounceToUSlegalcup', this.formulas.volume.impflonc_uslgcp);
            this.mapObject.functionMap.set('ImperialfluidounceToUSfluidounce', this.formulas.volume.impflonc_usflonc);
            this.mapObject.functionMap.set('ImperialfluidounceToUStablespoon', this.formulas.volume.impflonc_ustbsp);
            this.mapObject.functionMap.set('ImperialfluidounceToUSteaspoon', this.formulas.volume.impflonc_ustsp);
            this.mapObject.functionMap.set('ImperialfluidounceToCubicmeter', this.formulas.volume.impflonc_cumt);
            this.mapObject.functionMap.set('ImperialfluidounceToImperialgallon', this.formulas.volume.impflonc_impgal);
            this.mapObject.functionMap.set('ImperialfluidounceToImperialliquidquart', this.formulas.volume.impflonc_impqt);
            this.mapObject.functionMap.set('ImperialfluidounceToImperialliquidpint', this.formulas.volume.impflonc_imppt);
            this.mapObject.functionMap.set('ImperialfluidounceToImperiallegalcup', this.formulas.volume.impflonc_implgcp);
            this.mapObject.functionMap.set('ImperialfluidounceToImperialtablespoon', this.formulas.volume.impflonc_imptbsp);
            this.mapObject.functionMap.set('ImperialfluidounceToImperialteaspoon', this.formulas.volume.impflonc_imptsp);
            this.mapObject.functionMap.set('ImperialfluidounceToCubicfoot', this.formulas.volume.impflonc_cuft);
            this.mapObject.functionMap.set('ImperialfluidounceToCubicinch', this.formulas.volume.impflonc_cuin);
            this.mapObject.functionMap.set('ImperialtablespoonToUSliquidgallon', this.formulas.volume.imptbsp_uslgal);
            this.mapObject.functionMap.set('ImperialtablespoonToLiter', this.formulas.volume.imptbsp_lt);
            this.mapObject.functionMap.set('ImperialtablespoonToMilliliter', this.formulas.volume.imptbsp_mlt);
            this.mapObject.functionMap.set('ImperialtablespoonToUSliquidquart', this.formulas.volume.imptbsp_uslqt);
            this.mapObject.functionMap.set('ImperialtablespoonToUSliquidpint', this.formulas.volume.imptbsp_uslpt);
            this.mapObject.functionMap.set('ImperialtablespoonToUSlegalcup', this.formulas.volume.imptbsp_uslgcp);
            this.mapObject.functionMap.set('ImperialtablespoonToUSfluidounce', this.formulas.volume.imptbsp_usflonc);
            this.mapObject.functionMap.set('ImperialtablespoonToUStablespoon', this.formulas.volume.imptbsp_ustbsp);
            this.mapObject.functionMap.set('ImperialtablespoonToUSteaspoon', this.formulas.volume.imptbsp_ustsp);
            this.mapObject.functionMap.set('ImperialtablespoonToCubicmeter', this.formulas.volume.imptbsp_cumt);
            this.mapObject.functionMap.set('ImperialtablespoonToImperialgallon', this.formulas.volume.imptbsp_impgal);
            this.mapObject.functionMap.set('ImperialtablespoonToImperialliquidquart', this.formulas.volume.imptbsp_impqt);
            this.mapObject.functionMap.set('ImperialtablespoonToImperialliquidpint', this.formulas.volume.imptbsp_imppt);
            this.mapObject.functionMap.set('ImperialtablespoonToImperiallegalcup', this.formulas.volume.imptbsp_implgcp);
            this.mapObject.functionMap.set('ImperialtablespoonToImperialfluidounce', this.formulas.volume.imptbsp_impflonc);
            this.mapObject.functionMap.set('ImperialtablespoonToImperialteaspoon', this.formulas.volume.imptbsp_imptsp);
            this.mapObject.functionMap.set('ImperialtablespoonToCubicfoot', this.formulas.volume.imptbsp_cuft);
            this.mapObject.functionMap.set('ImperialtablespoonToCubicinch', this.formulas.volume.imptbsp_cuin);
            this.mapObject.functionMap.set('ImperialteaspoonToUSliquidgallon', this.formulas.volume.imptsp_uslgal);
            this.mapObject.functionMap.set('ImperialteaspoonToLiter', this.formulas.volume.imptsp_lt);
            this.mapObject.functionMap.set('ImperialteaspoonToMilliliter', this.formulas.volume.imptsp_mlt);
            this.mapObject.functionMap.set('ImperialteaspoonToUSliquidquart', this.formulas.volume.imptsp_uslqt);
            this.mapObject.functionMap.set('ImperialteaspoonToUSliquidpint', this.formulas.volume.imptsp_uslpt);
            this.mapObject.functionMap.set('ImperialteaspoonToUSlegalcup', this.formulas.volume.imptsp_uslgcp);
            this.mapObject.functionMap.set('ImperialteaspoonToUSfluidounce', this.formulas.volume.imptsp_usflonc);
            this.mapObject.functionMap.set('ImperialteaspoonToUStablespoon', this.formulas.volume.imptsp_ustbsp);
            this.mapObject.functionMap.set('ImperialteaspoonToUSteaspoon', this.formulas.volume.imptsp_ustsp);
            this.mapObject.functionMap.set('ImperialteaspoonToCubicmeter', this.formulas.volume.imptsp_cumt);
            this.mapObject.functionMap.set('ImperialteaspoonToImperialgallon', this.formulas.volume.imptsp_impgal);
            this.mapObject.functionMap.set('ImperialteaspoonToImperialliquidquart', this.formulas.volume.imptsp_impqt);
            this.mapObject.functionMap.set('ImperialteaspoonToImperialliquidpint', this.formulas.volume.imptsp_imppt);
            this.mapObject.functionMap.set('ImperialteaspoonToImperiallegalcup', this.formulas.volume.imptsp_implgcp);
            this.mapObject.functionMap.set('ImperialteaspoonToImperialfluidounce', this.formulas.volume.imptsp_impflonc);
            this.mapObject.functionMap.set('ImperialteaspoonToImperialtablespoon', this.formulas.volume.imptsp_imptbsp);
            this.mapObject.functionMap.set('ImperialteaspoonToCubicfoot', this.formulas.volume.imptsp_cuft);
            this.mapObject.functionMap.set('ImperialteaspoonToCubicinch', this.formulas.volume.imptsp_cuin);
            this.mapObject.functionMap.set('CubicfootToUSliquidgallon', this.formulas.volume.cuft_uslgal);
            this.mapObject.functionMap.set('CubicfootToLiter', this.formulas.volume.cuft_lt);
            this.mapObject.functionMap.set('CubicfootToMilliliter', this.formulas.volume.cuft_mlt);
            this.mapObject.functionMap.set('CubicfootToUSliquidquart', this.formulas.volume.cuft_uslqt);
            this.mapObject.functionMap.set('CubicfootToUSliquidpint', this.formulas.volume.cuft_uslpt);
            this.mapObject.functionMap.set('CubicfootToUSlegalcup', this.formulas.volume.cuft_uslgcp);
            this.mapObject.functionMap.set('CubicfootToUSfluidounce', this.formulas.volume.cuft_usflonc);
            this.mapObject.functionMap.set('CubicfootToUStablespoon', this.formulas.volume.cuft_ustbsp);
            this.mapObject.functionMap.set('CubicfootToUSteaspoon', this.formulas.volume.cuft_ustsp);
            this.mapObject.functionMap.set('CubicfootToCubicmeter', this.formulas.volume.cuft_cumt);
            this.mapObject.functionMap.set('CubicfootToImperialgallon', this.formulas.volume.cuft_impgal);
            this.mapObject.functionMap.set('CubicfootToImperialliquidquart', this.formulas.volume.cuft_impqt);
            this.mapObject.functionMap.set('CubicfootToImperialliquidpint', this.formulas.volume.cuft_imppt);
            this.mapObject.functionMap.set('CubicfootToImperiallegalcup', this.formulas.volume.cuft_implgcp);
            this.mapObject.functionMap.set('CubicfootToImperialfluidounce', this.formulas.volume.cuft_impflonc);
            this.mapObject.functionMap.set('CubicfootToImperialtablespoon', this.formulas.volume.cuft_imptbsp);
            this.mapObject.functionMap.set('CubicfootToImperialteaspoon', this.formulas.volume.cuft_imptsp);
            this.mapObject.functionMap.set('CubicfootToCubicinch', this.formulas.volume.cuft_cuin);
            this.mapObject.functionMap.set('CubicinchToUSliquidgallon', this.formulas.volume.cuin_uslgal);
            this.mapObject.functionMap.set('CubicinchToLiter', this.formulas.volume.cuin_lt);
            this.mapObject.functionMap.set('CubicinchToMilliliter', this.formulas.volume.cuin_mlt);
            this.mapObject.functionMap.set('CubicinchToUSliquidquart', this.formulas.volume.cuin_uslqt);
            this.mapObject.functionMap.set('CubicinchToUSliquidpint', this.formulas.volume.cuin_uslpt);
            this.mapObject.functionMap.set('CubicinchToUSlegalcup', this.formulas.volume.cuin_uslgcp);
            this.mapObject.functionMap.set('CubicinchToUSfluidounce', this.formulas.volume.cuin_usflonc);
            this.mapObject.functionMap.set('CubicinchToUStablespoon', this.formulas.volume.cuin_ustbsp);
            this.mapObject.functionMap.set('CubicinchToUSteaspoon', this.formulas.volume.cuin_ustsp);
            this.mapObject.functionMap.set('CubicinchToCubicmeter', this.formulas.volume.cuin_cumt);
            this.mapObject.functionMap.set('CubicinchToImperialgallon', this.formulas.volume.cuin_impgal);
            this.mapObject.functionMap.set('CubicinchToImperialliquidquart', this.formulas.volume.cuin_impqt);
            this.mapObject.functionMap.set('CubicinchToImperialliquidpint', this.formulas.volume.cuin_imppt);
            this.mapObject.functionMap.set('CubicinchToImperiallegalcup', this.formulas.volume.cuin_implgcp);
            this.mapObject.functionMap.set('CubicinchToImperialfluidounce', this.formulas.volume.cuin_impflonc);
            this.mapObject.functionMap.set('CubicinchToImperialtablespoon', this.formulas.volume.cuin_imptbsp);
            this.mapObject.functionMap.set('CubicinchToImperialteaspoon', this.formulas.volume.cuin_imptsp);
            this.mapObject.functionMap.set('CubicinchToCubicfoot', this.formulas.volume.cuin_cuft);
        },
        tabSwitch() {
            var $this = $(this);
            if ($this.hasClass("active")) return;
            var direction = $this.attr("tab-direction");
            $this.parent().removeClass("left right").addClass(direction);
            $this.parent().find(".tab.active").removeClass("active");
            $this.addClass("active");
            App.$.configuration.direction = direction;
            direction === "right" ?
                (function () {
                    App.$.configuration.prevActiveFn();
                    App.$.configuration.activeSection = "currency-acc"
                }()) :
                (function () {
                    App.$.configuration.activeSection = App.$.configuration.prevActiveSection;
                }())

            App.$.clearValues()

        },
        sectionActivate(unitSection, currencySection) {

            this.configuration.direction === "left" ?
                (function () {
                    unitSection.classList.add('active')
                    currencySection.classList.remove('active')
                }()) :
                (function () {
                        unitSection.classList.remove('active')
                        currencySection.classList.add('active')
                    }()
                )
        },
        //Accordian
        accordian() {
            var accordianElm = document.querySelectorAll(".spec-detail-wrap");

            accordianElm.forEach((item, idx) => {
                item.addEventListener("click", function (ev) {
                    var panel = this.nextElementSibling;
                    var expand = this.querySelector(".specs-toggle .expand");
                    var minimize = this.querySelector(".specs-toggle .minimize");
                    App.$.InitalDomCss();
                    App.$.configuration.activeSection = Array.from(this.classList)[1]; //adding activeSection (temperature)

                    if (panel.classList.contains("accoridanOpen_at")) {
                        resets(panel, expand, minimize);
                        return;
                    }
                    
                    resetAccordian(accordianElm);

                    if (window.innerWidth > 500) {
                        panel.style.maxHeight = panel.scrollHeight + 36 + "px";
                        panel.style.padding = "36px 0 0 0";
                        panel.style.marginTop = "0px";
                        minimize.style.display = "block";
                        expand.style.display = "none";
                    }
                    panel.classList.add("accoridanOpen_at");

                    //clear values
                    App.$.clearValues()
                });
            });

            function resetAccordian(accordianElm) {
                accordianElm.forEach((item, idx) => {
                    let desc = item.nextElementSibling;
                    var expand = item.querySelector(".specs-toggle .expand");
                    var minimize = item.querySelector(".specs-toggle .minimize");

                    resets(desc, expand, minimize);
                });
            }

            function resets(elm, expand, minimize) {
                if (window.innerWidth > 500) {
                    elm.style.maxHeight = null;
                    elm.style.padding = "0px 0px 0px 14px";
                    // elm.style.marginTop = "24px";
                    expand.style.display = "block";
                    minimize.style.display = "none";
                }
                elm.classList.remove("accoridanOpen_at");
            }

        },
        //Dropdown Handle
        dropdownHandle(activeOption, currentWrap) {
       

            let grandParentOfCurrentWrap = currentWrap.parentElement.parentElement;
            grandParentOfCurrentWrap.style.overflow = "initial";

            //close existing open dropdown
            if (this.configuration.activeDropdown && (this.configuration.activeDropdown !== Array.from(currentWrap.classList)[1])) {

                let currentDropdown = document.querySelector("." + this.configuration.activeDropdown);
                currentDropdown.classList.remove('active');
                currentDropdown.nextElementSibling.style.display = 'none';

            }

            currentWrap.classList.toggle('active');

            if (currentWrap.nextElementSibling.style.display === 'none' || currentWrap.nextElementSibling.style.display === '') {
                currentWrap.nextElementSibling.style.display = 'block';
            } else {
                currentWrap.nextElementSibling.style.display = 'none';
            }


            this.configuration.activeDropdownText = activeOption; //text
            this.configuration.activeDropdown = Array.from(currentWrap.classList)[1];  //temperature-one


            // let elementName = this.configuration.activeSection; //categories

            // let dropdownOptions =  this.dropdownSetting[this.keyMaps[elementName]]; //options for those categories
        },
        checkDropdownName(parentOfDropdown, selectedText) {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
            if (parentOfDropdown.classList.contains("specs-display-one")) {
                //first dropdown
                return selectedText === $(section).find('.selected-option:last')[0].innerText;
            } else {
                //second dropdown
                return selectedText === $(section).find('.selected-option:first')[0].innerText
            }
        },
        newSelectedOptionOfDropdown(element, text, tabName) {

            let dropdownElement = element.previousElementSibling;

            let inputElement = element.previousElementSibling.previousElementSibling;


            this.configuration.activeDropdownText = text; //text

            let parentOfDropdown = element.parentElement;

            let checkDropdownEqual = App.$.checkDropdownName(parentOfDropdown, text);
            checkDropdownEqual === true ? App.$.swapChange() : null;

            if (checkDropdownEqual) {
                App.$.swapClassNameNPublish(tabName);
                this.InitalDomCss();
                return;
            }

            //add selected-option in dropdown
            let elementName = this.keyMaps[this.configuration.activeSection]; //categories
            let dropdownOptions = this.configuration.dropdownSetting[elementName]; //options for those categories
            let findPosition = dropdownOptions.findIndex((option) => option === this.configuration.activeDropdownText);

            $(element).find(".selected-option").removeClass("selected-option");
            element.children[findPosition].classList.add("selected-option");

            //new options added
            dropdownElement.children[0].innerText = text; //add text in


            inputElement.classList.contains("from-value") && tabName == "currency" ?
                    (function () {
                        let fromNumber = App.$.configuration.fromValue;
                        App.$.pubsub.publish("currencyFromValue", fromNumber)
                    }())
                    :
                    inputElement.classList.contains("to-value") && tabName == "currency" ?
                    (function () {
                        let fromNumber = App.$.configuration.fromValue;
                        App.$.pubsub.publish("currencyFromValue", fromNumber)
                    }())
                    :
                    inputElement.classList.contains("from-value") && (!tabName) ?
                    (function () {
                        let fromNumber = App.$.configuration.fromValue;
                        App.$.pubsub.publish("fromValue", fromNumber)                            //to-value  and no tabName

                    }())
                    :  
                    (function () {
                        let fromNumber = App.$.configuration.fromValue;
                        App.$.pubsub.publish("fromValue", fromNumber)                            //to-value  and no tabName

                    }()) 

            this.InitalDomCss();
        },
        //input toggle
        toggleInput(element) {

            let parent = $(element).parent().parent();
   
            parent.find('.active').removeClass('active');
            element.classList.add('active');
        },

        //fromValue and toVlaue
        pubsub: {
            events: {},
            subscriber(event, callback) {
                if (!this.events[event]) this.events[event] = [];
                this.events[event].push(callback)
            },
            publish(event, data) {
                if (this.events[event]) {
                    this.events[event].forEach(callback => callback(data))
                }
            }
        },
        //dropdown value of first
        getFromSection(checkCondition = '') {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);

            let displayDropdownElementText = (checkCondition === "currency") ?
                $(section).find('.selected-option:first')[0].dataset.val :
                $(section).find('.selected-option:first')[0].innerText;


            return displayDropdownElementText;
        },
        //dropdown value of second
        getToSection(checkCondition = '') {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);

            let displayDropdownElementText = (checkCondition === "currency") ?
                $(section).find('.selected-option:last')[0].dataset.val :
                $(section).find('.selected-option:last')[0].innerText;


            return displayDropdownElementText;

        },
        //return function from keys
        getFunctionFromKeys(typeOne, typeTwo) {
            const key = typeOne.replace(/\s/g, '') + "To" + typeTwo.replace(/\s/g, ''); //remove space

            const selectedFunction = this.mapObject.functionMap.get(key);

            return selectedFunction
        },
        //totol subscribers
        subscribers() {
            this.pubsub.subscriber("fromValue", (data) => {
                data ? this.configuration.fromValue = data : null;
       
                let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
                let typeOne = this.getFromSection();
                let typeTwo = this.getToSection();
                this.performCalculationForTo(typeOne, typeTwo, section, data)
            });
            this.pubsub.subscriber("toValue", (data) => {
                data ? this.configuration.toValue = data : null;

                let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
                let typeOne = this.getFromSection();
                let typeTwo = this.getToSection();
                this.performCalculationForFrom(typeOne, typeTwo, section, data)
            });
            this.pubsub.subscriber("currencyFromValue", (data) => {
                data ? this.configuration.fromValue = data : null;
                this.currencyFirstInput(data)
            });
            this.pubsub.subscriber("currencyToValue", (data) => {
                data ? this.configuration.toValue = data : null;
                this.currencySecondInput(data)
            })

        },

        //Swap Dropdown
        swapChange() {
            let activeSection = this.keyMaps[this.configuration.activeSection]; //temperature
            let parentWrapper = document.querySelector("." + activeSection);

            let parentOneOfChildren = $(parentWrapper).find('.specs-dropdown-options:first').parent()[0];
            let parentTwoOfChildren = $(parentWrapper).find('.specs-dropdown-options:last').parent()[0];

            let chilrenOneOfParentOne = parentOneOfChildren.children[1];
            let chilrenTwoOfParentOne = parentOneOfChildren.children[2];

            let childrenOneOfParentTwo = parentTwoOfChildren.children[1];
            let childrenTwoOfParentTwo = parentTwoOfChildren.children[2];


            $(parentOneOfChildren).remove(chilrenOneOfParentOne)
            $(parentOneOfChildren).append(childrenOneOfParentTwo);

            $(parentOneOfChildren).remove(chilrenTwoOfParentOne)
            $(parentOneOfChildren).append(childrenTwoOfParentTwo);

            // parentTwoOfChildren.removeChild(childrenOneOfParentTwo)
            $(parentTwoOfChildren).append(chilrenOneOfParentOne);

            // parentTwoOfChildren.removeChild(childrenTwoOfParentTwo)
            $(parentTwoOfChildren).append(chilrenTwoOfParentOne);
        },
        //Swap className and Publish
        swapClassNameNPublish(tabName = '') {
            let activeSection = this.keyMaps[this.configuration.activeSection]; //temperature
            let parentWrapper = document.querySelector("." + activeSection);
            const parent3 = $(parentWrapper).find('.specs-display-dropdown:first')[0];
            const parent4 = $(parentWrapper).find('.specs-display-dropdown:last')[0];
            const parentClass3 = Array.from(parent3.classList)[1]
            const parentClass4 = Array.from(parent4.classList)[1]
            $(parent4).removeClass(parentClass4).addClass(parentClass3);
            $(parent3).removeClass(parentClass3).addClass(parentClass4);

            let fromNumber = App.$.configuration.fromValue;

            tabName === "currency" ?
                App.$.pubsub.publish("currencyFromValue", fromNumber) :
                App.$.pubsub.publish("fromValue", fromNumber)

        },

        //Error Message Validation
        showErrorMessage() {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
            if ($(section).find(".error-toast")[0]) return;

            let errorElement = document.createElement('p');
            errorElement.classList.add("error-toast");
            errorElement.textContent = "Please enter a valid number";
            $(section).append(errorElement);
        },
        removeErrorMessage() {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
            $(section).find(".error-toast")[0] ? $(section).find(".error-toast")[0].remove() : null;
        },

        //Perform Calculation
        performCalculationForTo(typeOne, typeTwo, section, data) {
            let element = $(section).find('.to-value')[0];
            if (!data) {
                element.value = '';
                this.configuration.fromValue = '';
                this.configuration.toValue = '';
                this.removeErrorMessage();
            } else {
                const value = this.getFunctionFromKeys(typeOne, typeTwo)(+data);
                if (isNaN(value)) {
                    element.value = '';
                    this.showErrorMessage();
                    return
                }
                this.removeErrorMessage();

                element.value = parseFloat(value.toFixed(3));
                this.configuration.toValue = parseFloat(value.toFixed(3));
            }


        },
        performCalculationForFrom(typeOne, typeTwo, section, data) {
            let element = $(section).find('.from-value')[0];
            if (!data) {
                element.value = '';
                this.configuration.fromValue = '';
                this.configuration.toValue = '';
                this.removeErrorMessage();
            } else {
                [typeOne, typeTwo] = [typeTwo, typeOne]; //swap
                const value = this.getFunctionFromKeys(typeOne, typeTwo)(+data);
                if (isNaN(value)) {
                    element.value = '';
                    this.showErrorMessage()
                    return
                }
                this.removeErrorMessage();

                element.value = parseFloat(value.toFixed(3));
                this.configuration.fromValue = parseFloat(value.toFixed(3));
            }
        },
        performCalculationToCurrency(typeOne, typeTwo, data) {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
            let element = $(section).find('.to-value')[0];
            if (isNaN(data)) {
                element.value = '';
                App.$.showErrorMessage();
                return
            }
            if (!data) {
                element.value = '';
                this.configuration.toValue = ''; 
                this.configuration.fromValue = '';
                this.removeErrorMessage();
            } else {

                this.performCurrencyConversion(typeOne, typeTwo)
                    .then((result) => {

                        App.$.removeErrorMessage();

                        element.value = parseFloat(((+data) * result).toFixed(3));//value
                        this.configuration.toValue = parseFloat((data * result).toFixed(3));
                        // element.value =  data * result;
                        // $('.date-display').text(result) //date
                    })
                    .catch((err) => {
    
                    })
            }

        },
        performCalculationForCurrency(typeOne, typeTwo, data) {
            let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
            let element = $(section).find('.from-value')[0];
            if (isNaN(data)) {
                element.value = '';
                App.$.showErrorMessage();
                return
            }

            if (!data) {
                element.value = '';
                this.configuration.fromValue = ''; 
                this.configuration.toValue = '';
                this.removeErrorMessage();
            } else {

                this.performCurrencyConversion(typeTwo, typeOne) //swap
                    .then((result) => {
                        App.$.removeErrorMessage();
                        element.value = parseFloat(((+data) * result).toFixed(3)); //value
                        this.configuration.fromValue = parseFloat((data * result).toFixed(3));
                    })
                    .catch((err) => {
                   
                    })
            }
        },

        ///Currency Input Of Dropdown
        currencyFirstInput(data) {
            let typeOne = this.getFromSection("currency");
            let typeTwo = this.getToSection("currency");

      
            this.performCalculationToCurrency(typeOne, typeTwo, data)

        },

        currencySecondInput(data) {
            let typeOne = this.getFromSection("currency");
            let typeTwo = this.getToSection("currency");
            this.performCalculationForCurrency(typeOne, typeTwo, data)

  
        },


        //inital Date and Currency Value
        performCurrencyConversion(from, to, initalLoad = '') {

            return new Promise((resolve, reject) => {
                function getCurrencyList(url) {
                    return new Promise((resolve, reject) => {
                        fetch(url)
                            .then((response) => response.json())
                            .then((data) => resolve(data))
                            .catch((error) => reject(error));
                    });
                }

                function processedData(data) {
                    return data[from][to]
                }

                function formatDateOfApi(inputDate) {
                    const date = new Date(inputDate);
                    const day = date.getDate();
                    const month = date.toLocaleString('default', {month: 'short'});
                    const year = date.getFullYear().toString().slice(-2);
                    return `As of ${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} ${month} '${year}`;
                }

                function addDate(data) {

                    let timeFormat = document.createElement('p');
                    timeFormat.classList.add('time-format');
                    timeFormat.textContent = "3:30 AM UTC";

                    const formattedDate = formatDateOfApi(data["date"]);

                    $('.date-display').html(formattedDate);
                    $('.date-display').append(timeFormat);

                }

                function combineFunction(data) {
                    addDate(data);
                    return processedData(data)
                }

                if (initalLoad) {
                    getCurrencyList(`https://turboconverter.co/convertcurrency/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
                        .then((data) => addDate(data))
                        .then((processedData) => resolve(processedData))
                        .catch((err) => reject(err));
                } else {
                    getCurrencyList(`https://turboconverter.co/convertcurrency/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
                        .then((data) => combineFunction(data))
                        .then((processedData) => resolve(processedData))
                        .catch((err) => reject(err));
                }

            })

        },

        //Currency--Dropdown
        dropdownApiFetch() {

            function getCurrencyList(url) {
                return new Promise((resolve, reject) => {
                    fetch(url)
                        .then((response) => response.json())
                        .then((data) => resolve(data))
                        .catch((error) => reject(error));
                });
            }

            function clickHandler(event) {
                App.$.newSelectedOptionOfDropdown(event.target.parentElement, event.target.innerText, "currency")
            }

            function addEventListenertoCurrencyDropdown() {
                document.querySelectorAll('.currency .specs-dropdown-options p').forEach(element => {
                    element.addEventListener('click', clickHandler)
                })
            }

            function renderHTMLDropdownOne(attribute, currencyName) {
                let className = '';
                App.$.configuration.dropdownSetting.currency.push(currencyName)
                currencyName === "Euro" ? (className = "selected-option") : (className = 'option');
                return `
                  <p class=${className} data-val=${attribute}>${currencyName}</p>
                 `

            }


            function renderHTMLDropdownTwo(attribute, currencyName) {
                let className = '';
                currencyName === "US Dollar" ? (className = "selected-option") : (className = 'option');
                return `
                  <p class=${className} data-val=${attribute}>${currencyName}</p>
                 `
            }

            function processedData(data) {


                let currencyNames = [...Object.values(data)];
                let currencyAttribute = [...Object.keys(data)];
                let dropdownListOne = '';
                let dropdownListTwo = '';

                for (let i = 0; i < currencyNames.length; i++) {
                    if (!currencyNames[i]) continue

                    dropdownListOne += renderHTMLDropdownOne(currencyAttribute[i], currencyNames[i])
                }
                ;
                for (let i = 0; i < currencyNames.length; i++) {
                    if (!currencyNames[i]) continue
                    dropdownListTwo += renderHTMLDropdownTwo(currencyAttribute[i], currencyNames[i])
                }
                ;
                $('.currency-section-wrap .specs-display-one .specs-dropdown-options').append(dropdownListOne);
                $('.currency-section-wrap .specs-display-two .specs-dropdown-options').append(dropdownListTwo);
                addEventListenertoCurrencyDropdown()

                return data;
            }

            getCurrencyList("https://turboconverter.co/convertcurrency/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
                .then((data) => processedData(data))
                .catch((err) =>{});
        },


        //EVENT LISTENERS
        //click event Listener for dropdown (hide both dropdown) and change css accordingly
        InitalDomCss() {
            if (this.configuration.activeSection) {
                let section = document.querySelector('.' + this.keyMaps[this.configuration.activeSection]);
                let dropDownOne = $(section).find('.specs-display-dropdown:first')[0];
                let dropDownTwo = $(section).find('.specs-display-dropdown:last')[0];
                dropDownOne.classList.contains('active') ? dropDownOne.classList.remove('active') : null;
                dropDownTwo.classList.contains('active') ? dropDownTwo.classList.remove('active') : null;

                if (dropDownOne.nextElementSibling !== null) {
                    dropDownOne.nextElementSibling.style.display = 'none';
                }
                if (dropDownTwo.nextElementSibling !== null) {
                    dropDownTwo.nextElementSibling.style.display = 'none';
                }
                section.classList.contains("currency") ? null : section.style.overflow = "hidden";

                this.configuration.activeDropdown = "";
            }
        },
        listenToClickEvents() {
            document.addEventListener('click', function (event) {
                let target = event.target;
                switch (true) {
                    case target.closest(".specs-display-dropdown") !== null :
                        break;
                    default:
                        App.$.InitalDomCss()
                        break;
                }
            })
        },
        listenToInputBoxes() {
            document.addEventListener('click', function (event) {
                let target = event.target;
                switch (true) {
                    case target.closest(".from-value") !== null :
                        break;
                    case target.closest(".to-value") !== null :
                        break;
                    default:
                        let currentDropdown = document.querySelector("." + App.$.keyMaps[App.$.configuration.activeSection]);
                        if (currentDropdown) {
                            let inputOne = $(currentDropdown).find('.from-value')[0];  //input
                            let inputTwo = $(currentDropdown).find('.to-value')[0];
                            inputOne.classList.remove('active');
                            inputTwo.classList.remove('active');


                        }
                        break;
                }
            })
        },
        clearValues(){   
            //clearing all input values
            this.inputElements.forEach(input=>{
                input.value='';
            })
            $('.error-toast').remove()
            this.configuration.fromValue='';
            this.configuration.toValue='';
        }


    },


    init() {
        App.$.tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                App.$.tabSwitch.call(this);
                App.$.sectionActivate(App.$.unitSection, App.$.currencySection);

            })
        });

        App.$.dropdownSelect.forEach(dropdown => {
            dropdown.addEventListener('click', function () {
                App.$.dropdownHandle(dropdown.children[0].innerText, dropdown)
            })
        });

        App.$.dropdownOptionSelect.forEach(dropdownoption => {
            dropdownoption.addEventListener('click', function () {
                App.$.newSelectedOptionOfDropdown(dropdownoption.parentElement, dropdownoption.innerText)
            })
        });
        //toggle Input
        App.$.inputValueSelect.forEach(input => {
            input.addEventListener('click', function () {
                App.$.toggleInput(input)
            })
        });
        //From Value Input
        App.$.fromValueSelect.forEach(input => {
            input.addEventListener("input", function (event) {
                const number = input.value;
                if (input.classList.contains("currency-from")) App.$.pubsub.publish("currencyFromValue", number)
                else App.$.pubsub.publish("fromValue", number)
            })
        });
        //To Value Input
        App.$.toValueSelect.forEach(input => {
            input.addEventListener("input", function (event) {
                const number = input.value;
                if (input.classList.contains("currency-to")) App.$.pubsub.publish("currencyToValue", number)
                else App.$.pubsub.publish("toValue", number)
            })
        });
        //interchangeLogo
        App.$.interchangeLogo.forEach(logoElement => {
            let tabName = ''
            logoElement.addEventListener('click', function () {
                logoElement.parentElement.classList.contains("currency") ? (tabName = "currency") : (tabName = "");
                App.$.swapChange();
                App.$.swapClassNameNPublish(tabName);
            })
        })


    },

    initCall() {
        App.$.accordian();
        App.$.listenToClickEvents();
        App.$.listenToInputBoxes();
        App.$.subscribers();
        App.$.mapKeysToFunction();
        App.$.dropdownApiFetch();
        App.$.clearValues()
    },

    initApiCall(){
        App.$.performCurrencyConversion("eur", "usd", "initialLoad");
    }
}


document.addEventListener("DOMContentLoaded", async function () {

    storageReplacer.init().then(function () {

        var acceptButton = $(".accept");
        var allowWidget = $(".allow-widget");
        var acceptTerm = $(".accept-prompt");
        var denyTerms = $("#denytTerms");
        var piiAccept = "piiAccept";


        let turboConvertorLogo = document.getElementsByClassName('logowrap')[0];
        let mainWidget = document.getElementsByClassName('main-widget')[0];
        let widgetStatus = true;
        allowWidget.hide();
        checkPiiStored();

        window.Widget = function (queryP) {
            this.queryP = queryP || {};
        };

        Widget.prototype.firstLoadRender = function () {
            const _this = this;

            if (_this.queryP.firstLoad.attribute) {
                const storageItem = _this.queryP.firstLoad.storage.item;
                const storageValue = _this.queryP.firstLoad.storage.value;
                try {

                    if (!storageReplacer.getLocalStorageItem(storageItem)) {
                        storageReplacer.setLocalStorageItem(storageItem, storageValue);
                    }
                } catch (e) {
                    // console.error('Error finding the first load attribute at Widget Feature');
                }
            }
        };

        var widget = new Widget({
            activateTarget: true,
            firstLoad: {
                attribute: 'mainWidget',
                storage: {
                    item: 'onboarding',
                    value: '1'
                }
            }
        });

        
        widget.firstLoadRender();
        ///Initialze App
        App.init();
        App.initCall();
        
        document.addEventListener('click', function (event) {
            // event.preventDefault();
            let targetEle = event.target;
            if (!mainWidget.contains(targetEle) &&
                !turboConvertorLogo.contains(targetEle)) {
        
                if (widgetStatus) {
                    turboConvertorLogo.classList.remove('active')
                    widgetStatus = false;
                    closeWidget()
                }
            }
        })

        turboConvertorLogo.addEventListener('click', function (e) {
            e.preventDefault()
            if (!widgetStatus) {
                turboConvertorLogo.classList.add('active')
                widgetStatus = true;
                openWidget()
            } else {
                turboConvertorLogo.classList.remove('active')
                widgetStatus = false;
                closeWidget()
            }
        })

        function openWidget() {
            mainWidget.classList.add('active')
        }

        function closeWidget() {
            mainWidget.classList.remove('active')
        }

        acceptButton.on("click", function (e) {
            // closePiiWidget();
            chrome.runtime.sendMessage({task: "showOptInPage"}, function (response) {
            });
        });

        denyTerms.on('click', function (e) {
            closePiiWidget();
            turboConvertorLogo.classList.remove('active')
        });


        chrome.storage.onChanged.addListener(function (changes, namespace) {
            for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
                if (key === 'piiAccept' && newValue === '1') {
                    allowWidget.show();
                    acceptTerm.hide();
                    //Intital Call
                    App.initApiCall()
                    $('[n-widgetaction=link1],[n-widgetclick=link1]').removeClass(
                        'active'
                    );
                    document.dispatchEvent(
                        new CustomEvent('PiiAccept', {
                            detail: true
                        })
                    );
                    // showResponse();
                    // initWidgetFunctions();
                } else if (key === 'piiAccept' && newValue === '-1') {
                    allowWidget.hide();
                    acceptTerm.show();

                    document.dispatchEvent(
                        new CustomEvent('PiiAccept', {
                            detail: false
                        })
                    );
                }
            }
        });

        function checkPiiStored() {
            var accepted = storageReplacer.getLocalStorageItem('piiAccept');
            if (accepted && accepted == 1) {
                allowWidget.show();
                acceptTerm.hide();
                document.dispatchEvent(
                    new CustomEvent('PiiAccept', {
                        detail: true
                    })
                );
                App.initApiCall()
            } else if (!accepted || accepted == -1) {
                allowWidget.hide();
                acceptTerm.show();

                document.dispatchEvent(
                    new CustomEvent('PiiAccept', {
                        detail: false
                    })
                );
            }
        }

        function closePiiWidget() {
            try {
                widgetStatus = false;
                closeWidget();
                document.dispatchEvent(
                    new CustomEvent('PiiAccept', {
                        detail: 'cancel'
                    })
                );
            } catch (e) {

            }
        }

    });
})