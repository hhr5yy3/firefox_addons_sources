// @ts-check

(function() {

	const DEBUG = false;

    

function inject_selector(selector, sizeMax)
{
    if (DEBUG) console.log("goodly_favicon.js > inject_selector_list > selector ==== ", selector);

    let adBlock = false;
    if (sessionStorage.getItem("goodly-ad-block") == "true") {
        adBlock = true;
        document.body.classList.add("goodly-ad-block");
        if (DEBUG) console.log("read >>> goodly-ad-block = true");
    } else {
        document.body.classList.add("goodly-ad-show");
        if (DEBUG) console.log("read >>> goodly-ad-block = false");
    }
    

	for (let element of document.querySelectorAll(selector)) {
		if (!(element.hasAttribute('href'))) 
			continue;

        let href = unescape(element.getAttribute('href'));

        let levels = 10;
        let parent = element;
        for (let i = 0; i < levels; i++) {
            if ((parent.tagName == 'LI') /*&& (parent.parent.id="search-result")*/) { break; };
            if (parent != null) { parent = parent.parentElement; }
        };
        parent.setAttribute('parent', 'this');


        // редирект
     
        let elSubtitle = parent.querySelector('.Organic-Subtitle a.Link');

        if (
            adBlock
            && (elSubtitle != null) && (elSubtitle instanceof HTMLAnchorElement)
            ) {
            element.setAttribute('data-counter', ''); 
            elSubtitle.setAttribute('data-counter', ''); 
        }
        // конец редиректа


        // Блокировка рекламы
        /*
        // Если у рекламы ссылки начинаются не с "https://"", а с "//", т.е. без "https:"
        // Ещё в запасе вариант - у ссылки рекламы есть тег "data-event-required"
        if (href.startsWith('/')) {
            parent.setAttribute('goodly-ads', 'internal');
        }        
        // Большой блок с шестью объявлениями "Лучшие цены по запросу ..."
        if (href.startsWith('https://yandex.ru/products/')) {
            parent.setAttribute('goodly-ads', 'products');
        }
        // Просто реклама
        if (href.startsWith('https://yabs.yandex.ru/')) {
            parent.setAttribute('goodly-ads', 'yabs');
        }
        */
        // Конец блокировки
        
        if (DEBUG) console.log("goodly_favicon.js > inject_selector_list > href ==== ", href);

        if (DEBUG) element.setAttribute('goodly-href', href);        
        parent.setAttribute('goodly-href', href);
        

		
		let pieces = href.split('://');
		if ((pieces == undefined) || (pieces.length < 2))
			continue;
		
        // pop() -> Выбор последнего элемента в массиве, т.е. части ссылки после '://' 
        // Be careful, pop() will change the value of the array
        // split('/', 2)[0] -> Отбрасывание части ссылки после слеша "/", включая сам слеш
        //   Сначала разделение на массив с сеператором слеш и выбор первого элемента
		let host_full_with_port = pieces.pop().split('/', 2)[0];
        
        // Отбрасывание порта, т.к. в некоторых доменах указан порт и иконка не грузиться с гугла
        //   Сначала разделение на массив с сеператором ":" и выбор первого элемента      
		let host_full = host_full_with_port.split(':', 2)[0];

		// Отбрасывание префикса www.
		if (host_full.startsWith("www.")) {
			host_full = host_full.slice(4);
		};

        // Копирую домен для будщего вычисления доменной зоны, см. далее
        // Копию нужно сделать до того, как будет отброшена зона ".com"
        let host_full_copy = host_full;
                




        ///////////////////////////////////////////////////////////////////////////////////
        
        ///////////////////////////////////////////////////////////////////////////////////
        // ИКОНКА ЗОНЫ
        //
    	// Доменная зона - часть в домене после последней точки
        // Делаю разделение на массив с сепаратором "." и выбираю последний элемент
        let host_zone = host_full_copy.split('.').pop();
        
		if (DEBUG) element.setAttribute('goodly-favicon-host-zone', host_zone);

        // @ts-ignore
		let icon_url_zone = chrome.runtime.getURL('icon/zone/' + host_zone + '.svg');
		
		let image_zone = document.createElement('img');
        image_zone.src = icon_url_zone;
        image_zone.style.display = "none";

		image_zone.onload = function() {
            image_zone.style.display = "block";
            image_zone.style.width = Math.min(image_zone.width, sizeMax)+'px';
            image_zone.style.height = Math.min(image_zone.height, sizeMax)+'px';
            if (DEBUG) image_zone.setAttribute('goodly-favicon-height', image_zone.height);
            
		};
		
		image_zone.classList.add('goodly-favicon-zone');
		parent.appendChild(image_zone);

        //
        // End of - ИКОНКА ЗОНЫ
        ///////////////////////////////////////////////////////////////////////////////////
			


        ///////////////////////////////////////////////////////////////////////////////////
        // ФИЛЬТР ЗОНЫ с заменой типа host_zone
        // число результатов поиска в гугле site:.[domain name]
        var filter = [
            // Russia
            ["ru", "ru"],      //   1,890,000,000 - .ru Russia
            ["su", "ru"],      //      45,600,000 - .su Soviet Union
            ["moscow", "ru"],  //       1,300,000 - .moscow Moscow, Russia
            ["xn--80adxhks", "ru"], //    511,000 - xn--80adxhks .москва
            ["xn--80asehdb", "ru"], //    782,000 - xn--80asehdb .онлайн
            ["xn--80aswg", "ru"],   //         88 - xn--80aswg .сайт
            ["xn--c1avg", "ru"],    //         70 - xn--c1avg .орг
            ["xn--d1acj3b", "ru"],  //    187,000 - xn--d1acj3b .дети
            ["xn--j1aef", "ru"],    //          2 - xn--j1aef .ком
            ["xn--p1acf", "ru"],    //  1,560,000 - xn--p1acf .рус
            ["xn--p1ai", "ru"],     // 57,800,000 - xn--p1ai .рф     
            // Belarus
            ["by", "be"], // Belarus
            ["xn--90ais", "be"],            
            // Ukraine
            ["ua", "ua"], // Ukraine          
            ["xn--j1amh", "ua"],

            // Common domains
            ["com", "com"],     // 25,270,000,000 - .com (commerce but unrestricted/all uses)
            // разные
            ["gov", "gov"],     //  1,330,000,000 - .gov (government of US)
            ["info", "info"],   //  1,050,000,000 - .info (informational sites but unrestricted/all uses),
            // network
            ["net", "net"],     //  6,120,000,000 - .net (networks but unrestricuted/all uses)
            ["network", "net"], //      7,950,000
            // organization
            ["org", "org"],     //  5,540,000,000 - .org (organizations but unrestricted/all uses)
            ["community", "org"], //    1,080,000
            ["wiki", "org"],    //             54
            // Education
            ["edu", "edu"],     //    863,000,000 - .edu (post-secondary educational institutions)
            ["academy", "edu"], //      1,550,000 - .edu (post-secondary educational institutions)            
            ["education", "edu"], //    3,040,000
            ["school", "edu"],    //    1,180,000
            ["university", "edu"],//      375,000
            ["schule", "edu"],    //      168,000
            // Business
            ["biz", "biz"],     //    168,000,000 - .biz (businesses but all uses)
            ["co", "biz"],      //    905,000,000 - .CO (actually Columbia but associated globally with the words “company,” “corporation” and “commerce”)
            ["business", "biz"],//      1,860,000
            ["company", "biz"], //      3,350,000
            ["partners", "biz"],//        121,000
            ["gmbh", "biz"],    //        147,000
            ["trade", "biz"],    //     3,450,000
            // WebSite
            ["site", "site"],   //    114,000,000
            ["ws", "site"],     //     52,600,000 - .WS (actually Western Samoa but marketed as “.website”)
            ["cc", "site"],     //    766,000,000 - .CC (actually Cocos Islands but used for “commercial companies”  “community colleges” “creative commons” and more)
            ["in", "site"],     //  1,380,000,000 - Используется для страны India, а также как понял, сокращение in=internet для любых сайтов
            ["online", "site"], //     72,200,000
            ["live", "site"],   //     67,300,000
            ["world", "site"],  //     10,600,000
            // Me
            ["me", "me"],       //  1,550,000,000 - .ME (actually Montenegro but marketed for individuals)
            ["name", "me"],     //     18,000,000
            ["blog", "me"],     //     33,400,000
            // Media
            ["tv", "tv"],       //    480,000,000 - .TV (actually Tuvalu but marketed as “television”)
            ["fm", "tv"],       //     65,900,000 - .FM (actually Federated States of Micronesia but marketed as “radio”)
            ["radio", "tv"],    //      1,170,000
            ["media", "tv"],    //     23,600,000
            ["audio", "tv"],    //        639,000
            ["film", "tv"],     //        305,000
            ["movie", "tv"],    //      2,360,000
            ["music", "tv"],    //              0
            ["stream", "tv"],   //      6,090,000
            ["video", "tv"],    //             97
            ["webcam", "tv"],   //             53
            ["youtube", "tv"],  //              7
            // Travel
            ["travel", "travel"], //   11,800,000 - .travel (travel industry)
            ["camp", "travel"],   //      969,000
            ["reise", "travel"],  //        9,290
            ["reisen", "travel"],  //      54,300
            ["viajes", "travel"],  //      56,500
            // aero
            ["aero", "aero"],   //      3,390,000 - .aero (the air-transport industry),
            ["flights", "aero"],//        107,000
            // jobs
            ["jobs", "jobs"],   //      5,620,000 - .jobs (employment-related sites)
            ["pro", "jobs"],    //    105,000,000 - .pro (professions like legal, medical)
            ["work", "jobs"],   //     27,600,000
            ["works", "jobs"],  //        697,000
            // io
            ["io", "io"],       //    261,000,000 - Используется для страны "British Indian Ocean Territory", а также для технич. компаний и стартапов из-за тех. сокращения I/O = input/output
            ["tech", "io"],     //      9,000,000
            ["technology", "io"], //      378,000
            ["download", "io"],   //    5,850,000
            ["hosting", "io"],   //       111,000
            // top
            ["top", "top"],     //    591,000,000
            // xyz
            ["xyz", "xyz"],     //    211,000,000
            ["", ""],
            // USSR
            ["am", "ussr"], // Armenia
            ["az", "ussr"], // Azerbaijan

            ["ee", "ussr"], // Estonia
            ["ge", "ussr"], // Georgia
            ["kz", "ussr"], // Kazakhstan
            ["kg", "ussr"], // Kyrgyzstan
            ["lt", "ussr"], // Lithuania
            ["lv", "ussr"], // Latvia
            ["md", "ussr"], // Moldova
            ["tj", "ussr"], // Tajikistan
            ["tm", "ussr"], // Turkmenistan

            ["uz", "ussr"], // Uzbekistan
            // Free Zones - .tk, .ml, .ga, .cf, .gq
            ["tk", "freezone"], // 550,000,000
            ["ml", "freezone"], //  33,500,000
            ["ga", "freezone"], //  49,500,000
            ["cf", "freezone"], //  46,400,000
            ["gq", "freezone"], //  35,700,000
            // European Union, кроме советских республик (Estonia, Latvia, Lithuania)
            ["eu", "eu"], // .at Austria           
            // European Union - Country code top-level domains - Main
            ["at", "eu"], // .at Austria
            ["be", "eu"], // .be Belgium
            ["bg", "eu"], // .bg Bulgaria
            ["hr", "eu"], // .hr Croatia
            ["cy", "eu"], // .cy Cyprus
            ["cz", "eu"], // .cz Czech Republic
            ["dk", "eu"], // .dk Denmark
            ["fi", "eu"], // .fi Finland
            ["fr", "eu"], // .fr France
            ["de", "eu"], // .de Germany
            ["gr", "eu"], // .gr Greece
            ["hu", "eu"], // .hu Hungary
            ["ie", "eu"], // .ie Ireland
            ["it", "eu"], // .it Italy
            ["lu", "eu"], // .lu Luxembourg
            ["mt", "eu"], // .mt Malta
            ["nl", "eu"], // .nl Netherlands
            ["pl", "eu"], // .pl Poland
            ["pt", "eu"], // .pt Portugal
            ["ro", "eu"], // .ro Romania
            ["sk", "eu"], // .sk Slovakia
            ["si", "eu"], // .si Slovenia
            ["es", "eu"], // .es Spain
            ["se", "eu"], // .se Sweden
            // European Union - Country code top-level domains - Other
            ["ax", "eu"], // .ax Åland (Finland)
            ["aw", "eu"], // .aw Aruba (Kingdom of the Netherlands)
            ["bq", "eu"], // .bq Caribbean Netherlands ( Bonaire,  Saba, and  Sint Eustatius)
            ["cw", "eu"], // .cw Curaçao (Kingdom of the Netherlands)
            ["gf", "eu"], // .gf French Guiana (France)
            ["gp", "eu"], // .gp Guadeloupe (France)
            ["mq", "eu"], // .mq Martinique (France)
            ["nc", "eu"], // .nc New Caledonia (France)
            ["pf", "eu"], // .pf French Polynesia (France)
            ["pm", "eu"], // .pm Saint-Pierre and Miquelon (France)
            ["re", "eu"], // .re Réunion (France)
            ["sx", "eu"], // .sx Sint Maarten (Kingdom of the Netherlands)
            // European Union - Europe
            ["alsace", "eu"], // .alsace Alsace, France
            ["amsterdam", "eu"], // .amsterdam Amsterdam, Netherlands
            ["bcn", "eu"], // .bcn Barcelona, Spain
            ["barcelona", "eu"], // .barcelona Barcelona, Spain
            ["bayern", "eu"], // .bayern Bavaria, Germany
            ["berlin", "eu"], // .berlin Berlin, Germany
            ["brussels", "eu"], // .brussels Brussels, Belgium
            ["budapest", "eu"], // .budapest Budapest, Hungary
            ["bzh", "eu"], // .bzh Brittany, France; Breton language and culture
            ["cat", "eu"], // .cat Catalonia, Spain; Catalan language and culture
            ["cologne", "eu"], // .cologne Cologne, Germany
            ["corsica", "eu"], // .corsica Corsica, France
            ["eus", "eu"], // .eus Basque, Spain and France
            ["frl", "eu"], // .frl Friesland, Netherlands
            ["gal", "eu"], // .gal Galicia, Spain
            ["gent", "eu"], // .gent Ghent, Belgium
            ["hamburg", "eu"], // .hamburg Hamburg, Germany
            ["helsinki", "eu"], // .helsinki Helsinki, Finland
            ["irish", "eu"], // .irish Ireland; global Irish community
            ["koeln", "eu"], // .koeln Cologne, Germany
            ["madrid", "eu"], // .madrid Madrid, Spain
            ["nrw", "eu"], // .nrw North Rhine-Westphalia, Germany
            ["paris", "eu"], // .paris Paris, France
            ["ruhr", "eu"], // .ruhr Ruhr, Germany
            ["saarland", "eu"], // .saarland Saarland, Germany
            ["stockholm", "eu"], // .stockholm Stockholm, Sweden
            ["tirol", "eu"], // .tirol Tyrol, Austria
            ["vlaanderen", "eu"], // .vlaanderen Flanders, Belgium
            ["wien", "eu"], // .wien Vienna, Austria
            // United Kingdom 
            // United Kingdom - Country code top-level domains - Main
            // кроме .io British Indian Ocean Territory (United Kingdom)
            ["ac", "uk"], // .ac Ascension Island (United Kingdom)
            ["ai", "uk"], // .ai Anguilla (United Kingdom)
            ["bm", "uk"], // .bm Bermuda (United Kingdom)
            ["fk", "uk"], // .fk Falkland Islands (United Kingdom)
            ["gg", "uk"], // .gg Guernsey (United Kingdom)
            ["gi", "uk"], // .gi Gibraltar (United Kingdom)
            ["gs", "uk"], // .gs South Georgia and the South Sandwich Islands (United Kingdom)
            ["im", "uk"], // .im Isle of Man (United Kingdom)
            ["je", "uk"], // .je Jersey (United Kingdom)
            ["ky", "uk"], // .ky Cayman Islands (United Kingdom)
            ["ms", "uk"], // .ms Montserrat (United Kingdom)
            ["pn", "uk"], // .pn Pitcairn Islands (United Kingdom)
            ["sh", "uk"], // .sh Saint Helena, Ascension and Tristan da Cunha (United Kingdom)
            ["tc", "uk"], // .tc Turks and Caicos Islands (United Kingdom)
            ["uk", "uk"], // .uk United Kingdom
            ["vg", "uk"], // .vg British Virgin Islands (United Kingdom)
            // United Kingdom - Other
            ["cymru", "uk"], // .cymru Wales, United Kingdom
            ["london", "uk"], // .london London, United Kingdom
            ["wales", "uk"], // .wales Wales, United Kingdom
            // bike
            ["bike", "bike"], // 776,000
            // photo
            ["photo", "photo"],       // 1,390,000
            ["photography", "photo"], //   534,000
            ["photos", "photo"],      // 1,180,000
            ["pics", "photo"],        //        36
            ["pictures", "photo"],    //        87
            // shop
            ["shop", "shop"],     // 17,600,000
            ["bargains", "shop"], //     54,700
            ["bid", "shop"],      //  7,770,000
            ["boutique", "shop"], //    342,000
            ["coupons", "shop"],  //     29,300
            ["deals", "shop"],    //  1,510,000
            ["jewelry", "shop"],  //    433,000
            ["market", "shop"],   //  3,520,000
            ["kaufen", "shop"],   //     55,400
            ["tienda", "shop"],   //    360,000
            ["", "shop"],
            ["", "shop"],
            ["", "shop"],
            ["", "shop"],
            ["", "shop"],
            ["", "shop"],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""]
        ];

        parent.setAttribute('host-full', host_full);
        for (let k = 0; k < filter.length; k++) {
            if (host_zone == filter[k][0]) {
                host_zone = filter[k][1];
                parent.setAttribute('goodly-filter', filter[k][1]);
                break;
            };            
        };
        //
        // End of - ФИЛЬТР ЗОНЫ
        ///////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////
        // ИКОНКА ТИПА
        //

        // @ts-ignore
		let icon_url_type = chrome.runtime.getURL('icon/zone/type/' + host_zone + '.png');
		
		let image_type = document.createElement('img');
		image_type.src = icon_url_type;
        image_type.style.display = "none";

		image_type.onload = function() {
            image_type.style.display = "block";
			image_type.style.width = Math.min(image_type.width, sizeMax)+'px';
			image_type.style.height = Math.min(image_type.height, sizeMax)+'px';
			if (DEBUG) image_type.setAttribute('goodly-favicon-height', image_type.height);
		};
		
		image_type.classList.add('goodly-favicon-zone-type');
		parent.appendChild(image_type);

        //
        // End of - ИКОНКА ТИПА
        ///////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////
        // Значек посещенных страниц у ссылок
        //
        // Решение с SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', "0 0 24 24");   
        svg.style.width = '30px';
        svg.style.height = svg.style.width;             
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // Path from https://fontawesomeicons.com/svg/icons/checkmark
        path.setAttribute('d', "M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4.3,7.61-4.57,6a1,1,0,0,1-.79.39h0a1,1,0,0,1-.79-.38L7.71,12.51a1,1,0,0,1,1.58-1.23l1.63,2.08,3.78-5a1,1,0,1,1,1.6,1.22Z");  
        svg.appendChild(path);
        svg.classList.add('goodly-visited');
        element.appendChild(svg);

        //
        // End of - Значек посещенных страниц - конец  
        ///////////////////////////////////////////////////////////////////////////////////        

	}
}


function inject_selector_list()
{
	//inject_selector('a', 32); // Test
	
	inject_selector('ul#search-result > li .OrganicTitle a.Link', 48); // Основные карточки в ленте и рекламные блоки по 6 объявлений
	inject_selector('div.serp-item .OrganicTitle a.Link', 48); // Рекламный горизонтальный блок в самом верху
	//inject_selector('div.serp-item article a.Link', 48); // Рекламная карусель вверху (главная похоже) - перенес в ads_start.js
    /*
	inject_selector('.RzdJxc a', 32);  // Вставка "Videos" в ленте
	inject_selector('g-section-with-header g-link a', 32); // Вставка Твиттер в ленте
	inject_selector('g-section-with-header .HCUNre a', 32); // Вставка Top Stories в ленте

	inject_selector('.DhN8Cf > a', 64); // Вставка видео
    */

}


function main_function()
{
    console.log('domain.js');
	let search = document.querySelector('#search-result')
	if (search) {
		inject_selector_list();
	}
}


main_function();

}());