window.showTopHotelsRating = true;
window.countriesList = {
    "1": "Турция", "3": "Россия", "5": "Армения", "6": "Австрия", "7": "Азербайджан", "8": "Беларусь",
    "10": "Болгария", "12": "Египет", "18": "Италия", "31": "ОАЭ", "33": "Таиланд", "34": "Тунис",
    "35": "Мальдивы", "36": "Доминиканская Республика", "38": "Индонезия", "39": "Сейшелы", "40": "Шри-Ланка",
    "41": "Вьетнам", "42": "Испания", "43": "Греция", "45": "Марокко", "46": "Израиль", "48": "Куба",
    "51": "Катар", "52": "Индия", "58": "Иордания", "60": "Танзания", "63": "Маврикий", "72": "Андорра",
    "80": "Черногория", "98": "Мексика", "108": "Хорватия", "137": "Кения", "216": "Кипр", "278": "Абхазия",
    "282": "Бахрейн"
}

window.countriesListLt = {
    "1": "Turkija", "3": "Rusija", "5": "Armėnija", "6": "Austrija", "7": "Azerbaidžanas", "8": "Baltarusija",
    "10": "Bulgarija", "12": "Egiptas", "18": "Italija", "31": "JAE", "33": "Tailandas", "34": "Tunisas",
    "35": "Maldyvai", "36": "Dominikos Respublika", "38": "Indonezija", "39": "Seišeliai", "40": "Šri Lanka",
    "41": "Vietnamas", "42": "Ispanija", "43": "Graikija", "45": "Marokas", "46": "Izraelis", "48": "Kuba",
    "51": "Kataras", "52": "Indija", "58": "Jordanija", "60": "Tanzanija", "63": "Mauricijus", "72": "Andora",
    "80": "Juodkalnija", "98": "Meksika", "108": "Kroatija", "137": "Kenija", "216": "Kipras", "278": "Abchazija",
    "282": "Bahreinas"
}

window.countriesListEn = {
    "1": "Turkey", "3": "Russia", "5": "Armenia", "6": "Austria", "7": "Azerbaijan", "8": "Belarus",
    "10": "Bulgaria", "12": "Egypt", "18": "Italy", "31": "UAE", "33": "Thailand", "34": "Tunisia",
    "35": "Maldives", "36": "Dominican Republic", "38": "Indonesia", "39": "Seychelles", "40": "Sri Lanka",
    "41": "Vietnam", "42": "Spain", "43": "Greece", "45": "Morocco", "46": "Israel", "48": "Cuba",
    "51": "Qatar", "52": "India", "58": "Jordan", "60": "Tanzania", "63": "Mauritius", "72": "Andorra",
    "80": "Montenegro", "98": "Mexico", "108": "Croatia", "137": "Kenya", "216": "Cyprus", "278": "Abkhazia",
    "282": "Bahrain"
}
window.cities = {
    "2328": "Абакан",
    "2349": "Архангельск",
    "2358": "Астрахань",
    "2370": "Барнаул",
    "2373": "Белгород",
    "2389": "Благовещенск",
    "2402": "Брянск",
    "2412": "Чебоксары",
    "2416": "Челябинск",
    "2425": "Чита",
    "2449": "Екатеринбург",
    "2498": "Иркутск",
    "2504": "Ижевск",
    "2512": "Калининград",
    "2513": "Калуга",
    "2514": "Петропавловск-Камчатский",
    "2529": "Казань",
    "2531": "Кемерово",
    "2533": "Хабаровск",
    "2534": "Ханты-Мансийск",
    "2543": "Киров",
    "2578": "Краснодар",
    "2586": "Красноярск",
    "2638": "Магадан",
    "2639": "Магнитогорск",
    "2662": "Минеральные воды",
    "2671": "Москва",
    "2677": "Мурманск",
    "2679": "Н. Новгород",
    "2705": "Нижнекамск",
    "2707": "Нижневартовск",
    "2718": "Новокузнецк",
    "2724": "Новосибирск",
    "2739": "Омск",
    "2743": "Оренбург",
    "2763": "Пермь",
    "2808": "Ростов-на-Дону",
    "2817": "Санкт-Петербург",
    "2823": "Самара",
    "2827": "Саратов",
    "2861": "Сыктывкар",
    "2873": "Сочи",
    "2897": "Сургут",
    "2915": "Томск",
    "2927": "Тюмень",
    "2935": "Уфа",
    "2940": "Улан-Удэ",
    "2941": "Ульяновск",
    "2984": "Владивосток",
    "2989": "Волгоград",
    "2999": "Воронеж",
    "3009": "Якутск",
    "3021": "Южно-Сахалинск",
    "8995": "Махачкала",
    "289":  "Минск",
    "9239": "Vilnius"
};

function getStorageOccupancy(searchOpts) {
    let occupancy = {
        adultsCount: searchOpts.adult,
        childrenCount: searchOpts.child,
        childAges: [searchOpts.child1Age,searchOpts.child2Age,searchOpts.child3Age].filter( age => age !== null ).join()
    };
    return occupancy;
}

function mapCountryList() {
    const origin = location.origin;
    if ( origin.includes('.ru') ) {
        return window.countriesList;
    }
    if ( origin.includes('.by') ) {
        return window.countriesList;
    }
    if ( origin.includes('.lt') ) {
        return window.countriesListLt;
    }
    return window.countriesListEn
}

function setStorageInfo(storage, onlyFromStorage, img) {
    try {
        let storageInfo = {};
        const countryList = mapCountryList();
        storageInfo.country = countryList[(storage.tourPackageSearch || storage.onlyHotelSearch || storage.excursionSearch).toCountry]
        storageInfo.occupancy = getStorageOccupancy(storage.tourPackageSearch ||  storage.onlyHotelSearch || storage.excursionSearch);
        storageInfo.nights = storage.night.toString();
        storageInfo.extra_nights = ((storage.flightNight || storage.night) - storage.night).toString();
        storageInfo.checkinDt = storage.tourBeginDate ?  new Date(storage.tourBeginDate).toLocaleDateString('ru') : null;
        if ( storage.hotel && storage.room ) {
            storageInfo.city_from = window.cities[storage.hotel.fromAreaId] || "";
            storageInfo.region = [storage.hotel.areaName, storage.hotel.placeName].join(' / ');

            storageInfo.hotelName = [storage.hotel.hotelName, storage.hotel.categoryName].filter(s=>s).join(' ');
            storageInfo.boardType = storage.hotel.mealName;
            storageInfo.roomType = storage.room.roomName;
            storageInfo.accommodation = storage.room.accName;
            storageInfo.thumbnail = storage.hotel.defaultImage ?  "https://content.coral.ru/resize/800x600/" + storage.hotel.defaultImage : null;
            if ( !storageInfo.checkinDt ) {
                storageInfo.checkinDt = new Date(storage.hotel.checkInDate).toLocaleDateString('ru')
            }
            storageInfo.dateStart = new Date(storage.hotel.checkInDate).toLocaleDateString('ru')
        }

        if ( storage.excursion ) {
            storageInfo.city_from = "";
            storageInfo.region = [storage.excursion.areaName, storage.excursion.placeName].join(' / ');

            storageInfo.hotelName = [storage.excursion.hotelName, storage.excursion.categoryName].filter(s => s).join(' ');
            storageInfo.boardType = storage.excursion.mealName;
            storageInfo.roomType = storage.excursion.roomName;
            storageInfo.accommodation = storage.excursion.accName;
            storageInfo.thumbnail = storage.excursion.defaultImage ? "https://content.coral.ru/resize/800x600/" + storage.hotel.defaultImage : null;
            storageInfo.excursion = true;
            if ( !storageInfo.checkinDt ) {
                storageInfo.checkinDt = new Date(storage.excursion.checkInDate).toLocaleDateString('ru')
            }
        }
        if ( storage.flightDetail && storage.flightDetail.hotel ) {
            storageInfo.checkinDt = new Date(storage.flightDetail.hotel.checkInDate).toLocaleDateString('ru');
            storageInfo.nights = storage.flightDetail.hotel.night.toString();
            storageInfo.extra_nights = ((storage.flightDetail.hotel.flightNight || storage.flightDetail.night) - storage.flightDetail.night).toString();
        }

        if ( storage.flightDetail && storage.flightDetail.flight ) {
            const {flight, flightType} = getStorageFlight(storage.flightDetail.flight);
            storageInfo.flight = flight;
            storageInfo.flightType = flightType;
        }
        if ( storage.reservationDetailWithServices &&
            storage.reservationDetailWithServices.reservation &&
            storage.reservationDetailWithServices.reservation.summaryPriceInfo ) {
            storageInfo.price = isPrefferedDefaultCurrencyUtil() ? parseInt(storage.reservationDetailWithServices.reservation.salePriceWithCompanyCurrency) : parseInt(storage.reservationDetailWithServices.reservation.salePrice);
            storageInfo.currency = isPrefferedDefaultCurrencyUtil() ? storage.reservationDetailWithServices.reservation.companyCurrencyName : storage.reservationDetailWithServices.reservation.saleCurrencyName;
        }
        if ( isNaN(storageInfo.price) && onlyFromStorage && img )  {
            img.closest(".qq-container").style.display = "none";
        }
        if ( storage.tourists ) {
            storageInfo.passengers = {
                adults: storage.tourists.filter(p => p.isAdult).length,
                children: storage.tourists.filter(p => p.isChild).length,
                infants: storage.tourists.filter(p => p.isInfant).length,
                count: storage.tourists.length
            }
        }

        calculateDatesWithFlight(storageInfo, storageInfo.flight)
        return storageInfo;
    } catch (e) {
        console.log(e)
        return {};
    }
}

function calculateDatesWithFlight(option, flight) {
    if (  flight ) {
        const distance = getDistance(lastElement(flight.sectors[0].segments).arrivalDate, lastElement(flight.sectors).segments[0].departureDate);
        const distanceWithFlight = getDistance(flight.sectors[0].segments[0].departureDate, lastElement(lastElement(flight.sectors).segments).arrivalDate);

        option.checkinDt = flight && flight.sectors[0] && flight.sectors[0].segments[0] ? flight.sectors[0].segments[0].departureDate : option.checkinDt;

        option.nights = String(distance);
        option.extra_nights = String(distanceWithFlight - distance);
    }
}

function getSessionStorageOption(img, onlyFromStorage) {
    const storageTour = JSON.parse(sessionStorage.getItem(`tourPackage_${getParameterByName("s")}`));
    if ( storageTour ) {
        return setStorageInfo(storageTour, onlyFromStorage, img);
    }
    const storageHotel = JSON.parse(sessionStorage.getItem(`onlyHotel_${getParameterByName("s")}`));
    if ( storageHotel ) {
        return setStorageInfo(storageHotel, onlyFromStorage, img);
    }
    const storageExcursion = JSON.parse(sessionStorage.getItem(`excursion_${getParameterByName("s")}`));
    if ( storageExcursion ) {
        return setStorageInfo(storageExcursion, onlyFromStorage, img);
    }
    const storageFlight = JSON.parse(sessionStorage.getItem(`onlyflight_${getParameterByName("s")}`));
    if ( storageFlight ) {
        return setStorageCharterFlight(storageFlight, onlyFromStorage, img);
    }
    return {};
}

function getStorageFlight(flight) {
     const sectors = [flight.departureFlight, flight.returnFlight].map(parseStorageSector);
     let flightType = flight.departureFlight.flightTypeName.match(/Регулярный/i) && flight.departureFlight.flightTypeName.match(/Регулярный/i) ? 'Scheduled' : null;
     flightType = flight.returnFlight.flightTypeName.match(/Чартерй/i)  && flight.returnFlight.flightTypeName.match(/Чартер/i) ? 'Charter' : flightType;
     return {flight: {sectors}, flightType }
}

function setStorageCharterFlight(storage) {
    let storageInfo = {};
    const twoWayFlight = storage.twoWayFlight;
    const countryList = mapCountryList();
    storageInfo.country = countryList[(storage.filter).toCountry];
    storageInfo.occupancy = getStorageOccupancy(storage.twoWayFlight);
    storageInfo.checkinDt = storage.filter.departureDate ? new Date(storage.filter.departureDate).toLocaleDateString('ru') : null;
    storageInfo.city_from = window.cities[storage.filter.fromArea];
    storageInfo.region = storage.filter.toArea;
    storageInfo.flight = {
        sectors: [{
            segments: [new FlightSegment({
                flightNumber: twoWayFlight.flightCode,
                airline: twoWayFlight.airline,
                plane: twoWayFlight.planeType,
                departureDate: new Date(twoWayFlight.depDate).toLocaleDateString(),
                departureTime: twoWayFlight.departureTime,
                departureCity: twoWayFlight.airportAreaName,
                departureAirport: twoWayFlight.airport,
                departureAirportID: twoWayFlight.airportSname,
                serviceClass: twoWayFlight.flightInfos[0] ? twoWayFlight.flightInfos[0].seatClassName : null,
                arrivalDate: new Date(twoWayFlight.arrDate).toLocaleDateString(),
                arrivalTime: twoWayFlight.arrivalTime,
                arrivalCity: twoWayFlight.airportAreaNameBack,
                arrivalAirport: twoWayFlight.airportBack,
                arrivalAirportID: twoWayFlight.airportSnameBack,
            })]
        }, twoWayFlight.backFlightCode ? {
            segments: [new FlightSegment({
                    flightNumber: twoWayFlight.backFlightCode,
                    airline: twoWayFlight.backAirline,
                    plane: twoWayFlight.backPlaneType,
                    departureDate: new Date(twoWayFlight.backDepDate).toLocaleDateString(),
                    departureTime: twoWayFlight.backDepartureTime,
                    departureCity: twoWayFlight.backAirportAreaName,
                    departureAirport: twoWayFlight.backAirport,
                    departureAirportID: twoWayFlight.backAirportSname,
                    serviceClass: twoWayFlight.flightInfos[1] ? twoWayFlight.flightInfos[1].seatClassName : null,
                    arrivalDate: new Date(twoWayFlight.backArrDate).toLocaleDateString(),
                    arrivalTime: twoWayFlight.backArrivalTime,
                    arrivalCity: twoWayFlight.backAirportAreaNameBack,
                    arrivalAirport: twoWayFlight.backAirportBack,
                    arrivalAirportID: twoWayFlight.backAirportSnameBack,
                }
            )]
        } : null].filter(s =>s)
    };
    const optionFromFlight = createOptionFromFlight(storageInfo.flight);
    return Object.assign(storageInfo, optionFromFlight);
}

function parseStorageSector(sector) {
    const segments = sector.segments.map(seg => parseStorageSegment(seg, sector));
    return {segments};
}

function parseStorageSegment(segment, sector) {
    const departureDate = new Date(segment.departureDate);
    const arrivalDate = new Date(segment.arrivalDate);
    return new FlightSegment({
        flightNumber: segment.flightCode,
        travelTime: convertMinToHours(sector.drivingTimeInMinutes),
        plane: segment.planeTypeName,
        departureDate: departureDate.toLocaleDateString('ru'),
        departureTime: departureDate.toLocaleTimeString('ru', {'hour': 'numeric', 'minute': 'numeric'}),
        departureCity: segment.departureAreaName,
        departureAirport: segment.departureAirportName,
        departureAirportID: segment.departureAirportCode,
        serviceClass: segment.seatClassName,
        arrivalDate:  arrivalDate.toLocaleDateString('ru'),
        arrivalTime:  arrivalDate.toLocaleTimeString('ru', {'hour': 'numeric', 'minute': 'numeric'}),
        arrivalCity: segment.arrivalAreaName,
        arrivalAirport: segment.arrivalAirportName,
        arrivalAirportID: segment.arrivalAirportCode
    })
}

async function requestToCoralApi(path) {

    const apiHostParts = location.hostname.split('.').reverse();
    const apiHost = ['agencyapi', apiHostParts[1], apiHostParts[0]].join('.')
    const url = `https://${apiHost}/api${path}`
    const userToken = (document.cookie.match(/ApiToken=(.+?);/) || document.cookie.match(/ApiToken=(.+)$/))[1];
    return await fetchTimeout(20000, fetch(url, {
        "headers": {
            "authorization": "Bearer " + userToken,
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "method": "GET"
    })).then(resp => resp.json()).catch(console.log);
}
