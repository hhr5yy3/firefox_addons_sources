const API_DOMAIN = "manualsexplorer.co";
let domElements = {
    offsets: {
        brandOffset: 0,
        productOffset: 0,
        categoryOffset: 0,
    },
    limit: {
        brandLimit: 20,
        productLimit: 20,
        categoryLimit: 10,
    },
    listOfApi: {
        brands: `https://${API_DOMAIN}/apps/v2/manualBrands`,
        listOfproducts: `https://${API_DOMAIN}/apps/v2/manualCategories`,
        getCatergories: `https://${API_DOMAIN}/apps/v2/getManualData`,
        searchUrl: `https://${API_DOMAIN}/apps/v2/searchManual`
    },
    sideMenuOptions: {
        'feature-one': $('.brands_display'),
        'feature-two': $('.products_display'),
        'feature-three': $('.saved_display')
    },
    methodCalling: {
        'feature-one': () => getBrands(),
        'feature-two': () => getProducts(),
        'feature-three': () => getSavedManuals(),
    },
    cardUI: (cardText) => getCardUI(cardText),
    manualUI: (manual, savedStatus) => getManualUI(manual, savedStatus),
    appendUI: (element, parentElement) => appendCardinDom(element, parentElement),
    manualsDataArr: [],
    clearElementsInWrapper: (wrapperElement) => cleanWrapper(wrapperElement),
    store: () => {
        return {
            addInStorage: function (key, value) {
                if (Array.isArray(value)) {
                    storageReplacer.setLocalStorageItem(key, JSON.stringify(value))
                    return
                }

                let manualCardObject = {
                    key: value['key'],
                    value: value['manualObj']
                }

                let localStorageStore;
                try {
                    localStorageStore = JSON.parse(storageReplacer.getLocalStorageItem(key)) || [];
                } catch (e) {
                    localStorageStore = storageReplacer.getLocalStorageItem(key) || [];
                }
                // console.log(localStorageStore, 'localStorageStore')

                if (localStorageStore.length) {
                    localStorageStore.push(manualCardObject)
                } else {
                    localStorageStore = [manualCardObject]; //first Object
                }

                storageReplacer.setLocalStorageItem(key, JSON.stringify(localStorageStore))
            },
            getFromStorage: function (key) {
                let response;
                try {
                    response = JSON.parse(storageReplacer.getLocalStorageItem(key));
                } catch (e) {
                    response = storageReplacer.getLocalStorageItem(key);
                }
                return response;
            }
        }
    },
    downloadPDF: (event) => {
        event.preventDefault();
        let downloadElm = event.currentTarget;
        let height = window.screen.height - 100;

        let link = downloadElm.getAttribute("data-link");
        // window.open(link, 'newwindow', 'width=800,height=' + height);
        chrome.windows.create({
            url: link,
            type: 'popup',
            width: 800,
            height: height
        });
    },
    printPdf: (event) => {
        event.preventDefault();

        let printElm = event.currentTarget;

        let height = window.screen.height - 100;

        let link = printElm.getAttribute("data-link");
        // window.open(link, 'newwindow', 'width=800,height=' + height);
        chrome.windows.create({
            url: link,
            type: 'popup',
            width: 800,
            height: height
        });
    },
    showLoader: () => [showLoaderUI()],
    hideLoader: () => [hideLoaderUI()],
    emptyManualArray: () => emptyArray(),
    backOptions: (showWrapper, hideWrapper, title) => goToPreviousTab(showWrapper, hideWrapper, title),
    notFoundLogger: (element, msg) => notFoundLoggerMsg(element, msg),
    tabVisited: new Map(),
    tabSwitchCache: (tabName) => tabSwitchCacheCheck(tabName)
}

function tabSwitchCacheCheck(tabName) {
    return domElements.tabVisited.has(tabName);
}


function notFoundLoggerMsg(element, msg) {
    $(element).text(msg)
}

function goToPreviousTab(showWrapper, hideWrapper, title) {
    domElements["offsets"]["categoryOffset"] = 0;
    showWrapper && $(showWrapper).show();
    hideWrapper && $(hideWrapper).hide();
    $('.cards_section_title').text(title);
    $('.load_more_btn').show()

}

function emptyArray() {
    domElements.manualsDataArr.length = 0;
}

function showLoaderUI() {
    $('.loader-container').css('display', 'flex')
}

function hideLoaderUI() {
    $('.loader-container').hide()
}

function cleanWrapper(wrapperElement) {
    $(wrapperElement).html('')
}

function getManualUI(manual, savedStatus) {
    return `<div class="manual_card" >
    <div class="manual_top_title">
        <p class="manual_title">
            ${escapeHtml(manual.productName)}
        </p>
         <span class="tooltip-text">${escapeHtml(manual.productName)}</span>
        <a class="manual_arrow" href='${escapeHtml(manual.url)}' target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="12" fill="#06131B"/>
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#2998FF" stroke-opacity="0.1"/>
                <path d="M10 8L14.1711 12.1706L10 16.3417" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="12" fill="#237ED1"/>
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#2998FF" stroke-opacity="0.1"/>
                <path d="M10 8L14.1711 12.1706L10 16.3417" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="tooltip-text">Click here to view manual</span>
        </a>
    </div>
    <div class="manual_divider"></div>
    <div class="manual_content">
        <p class="manual_list">
            <span class="manual_type">Brand</span>
            <span class="manual_desc">${escapeHtml(manual.brand)}</span>
        </p>
        <p class="manual_list">
            <span class="manual_type">Languages</span>
            <span class="manual_desc">${escapeHtml(manual.languages)}</span>
        </p>
        <p class="manual_list">
            <span class="manual_type">Category</span>
            <span class="manual_desc">${escapeHtml(manual.category)}</span>
              <span class="tooltip-text">${escapeHtml(manual.category)}</span>
        </p>
        <div class="manual_functionalites">
            <div class="save_option ${savedStatus === true ? "saved" : "not-saved"}" data-manualid='${escapeHtml(manual.id)}'>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" fill="white" stroke="#EAEAEA"/>
                    <path d="M19.6663 17.0996H16.333" stroke="#06131B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.2129 11.333H14.7862C13.3662 11.333 12.2129 12.493 12.2129 13.9063V23.2997C12.2129 24.4997 13.0729 25.0063 14.1262 24.4263L17.3796 22.6197C17.7262 22.4263 18.2862 22.4263 18.6262 22.6197L21.8796 24.4263C22.9329 25.013 23.7929 24.5063 23.7929 23.2997V13.9063C23.7862 12.493 22.6329 11.333 21.2129 11.333Z" stroke="#06131B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" fill="white" stroke="#EAEAEA"/>
                    <path d="M21.2129 11.333H14.7862C13.3662 11.333 12.2129 12.493 12.2129 13.9063V23.2997C12.2129 24.4997 13.0729 25.0063 14.1262 24.4263L17.3796 22.6197C17.7262 22.4263 18.2862 22.4263 18.6262 22.6197L21.8796 24.4263C22.9329 25.013 23.7929 24.5063 23.7929 23.2997V13.9063C23.7862 12.493 22.6329 11.333 21.2129 11.333Z" fill="#237ED1" stroke="#237ED1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.6663 17.0996H16.333" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="download_option" data-link='${escapeHtml(manual.url)}'>                    
            </div>
            <div class="print_option" data-link='${escapeHtml(manual.url)}'>
            </div>
        </div>
    </div>
    </div>`
}

function getCardUI(cardText) {
    return `<div class="card" data-cardName='${escapeHtml(cardText)}'>
        <span class="cards_logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#ECF2FF" />
                <path d="M31 20.5C31 21.95 30.57 23.28 29.83 24.39C28.75 25.99 27.04 27.12 25.05 27.41C24.71 27.47 24.36 27.5 24 27.5C23.64 27.5 23.29 27.47 22.95 27.41C20.96 27.12 19.25 25.99 18.17 24.39C17.43 23.28 17 21.95 17 20.5C17 16.63 20.13 13.5 24 13.5C27.87 13.5 31 16.63 31 20.5Z" stroke="#237ED1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M33.6925 29.8095L31.9636 30.2163C31.5759 30.3102 31.272 30.6022 31.1882 30.9881L30.8215 32.5214C30.6224 33.3558 29.5536 33.6061 28.9982 32.949L24 27.2333L19.0018 32.9594C18.4464 33.6165 17.3776 33.3662 17.1785 32.5318L16.8118 30.9986C16.7175 30.6126 16.4136 30.3102 16.0364 30.2267L14.3075 29.82C13.5111 29.6322 13.2282 28.6414 13.8045 28.0677L17.8911 24C19.0227 25.6688 20.8146 26.8474 22.8998 27.1499C23.256 27.2125 23.6228 27.2438 24 27.2438C24.3772 27.2438 24.744 27.2125 25.1002 27.1499C27.1854 26.8474 28.9773 25.6688 30.1089 24L34.1955 28.0677C34.7718 28.6309 34.4889 29.6218 33.6925 29.8095Z" stroke="#237ED1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </span>
        <span class="cards_text">
            ${escapeHtml(cardText)}
        </span>
        <span class="tooltip-text">${escapeHtml(cardText)}</span>
        <span class="cards_nexticon">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 13L7 7L1 1" stroke="#06131B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </span>
    </div>`
}

var preventAutocomplete = false;

function addSearchSuggestion() {
    $('#search-text').autocomplete({
        appendTo: ".search-form",
        source: function (request, response) {
            if (!request.term.trim() || preventAutocomplete) return
            currentRequest = $.ajax({
                url: `${domElements.listOfApi.searchUrl}?query=${encodeURIComponent(request.term)}&searchWithSuggest=true`,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var resultArray = [];

                    if (data.brandOrCategoryMatch) {
                        $.each(data.brandOrCategoryMatch, function (index, item) {
                            resultArray.push({
                                label: item.matchedBrandOrCategory,
                                value: item.matchedBrandOrCategory,
                                type: item.type
                            });
                        });
                    }

                    if (data.response) {
                        $.each(data.response, function (index, product) {
                            resultArray.push({
                                label: product.productName,
                                value: product.productName,
                                url: product.url,
                                manualType: product.type,
                                type: "product"
                            });
                        });
                    }

                    response(resultArray);
                }
            });
        },
        minLength: 2,
        delay: 300,
        select: function (event, ui) {
            event.preventDefault();
            $('.searchbar_ff').val(ui.item.value)
            if (ui.item.type === "product") {
                // window.open(ui.item.url, "_blank");
                chrome.tabs.create({url: ui.item.url});
                return;
            }
            getSearchedManuals(ui.item.value);
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        var sanitizedTerm = this.term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var t = String(escapeHtml(item.label)).replace(
            new RegExp(sanitizedTerm, "gi"),
            "<span class='ui-state-highlight'>$&</span>");

        let divToAppend = `<div> <span class="item-type">${escapeHtml(item.type)}</span> ${t} </div>`;

        return $("<li>")
            .append(divToAppend)
            .appendTo(ul);
    }
};


function destroySearchSuggestion() {
    const searchBox = $(".search-text");
    searchBox.each(function (index) {
        var searchBoxElement = $(searchBox[index]);
        searchBoxElement.autocomplete("destroy");
    });
}

function appendCardinDom(element, parentElement) {
    $(parentElement).append(element)
}

async function getSearchedManuals(searchQuery) {
    if (!searchQuery) {
        searchQuery = $('.searchbar_ff').val().trim()
    }
    if (!searchQuery) return;

    $('.no_load_moreTxt').hide()
    $('.manuals_status').hide()
    domElements["offsets"]["categoryOffset"] = 0;
    domElements.emptyManualArray();
    domElements.clearElementsInWrapper('.searched_manual_display');
    // $('.display_wrp').hide();
    let previousActiveTab = $('[data-id="feature-one"]').hasClass('active') ? '.brands_display' : $('[data-id="feature-two"]').hasClass('active') ? '.products_display' : '.saved_display';
    $(previousActiveTab).hide()

    $('.searched_display').css('display', 'flex');
    $('.searched_manual_display').css('display', 'flex');

    $('.cards_flow_wrp').hide();

    $('.card_forward_icon').hide();

    $('.cards_section_back').show()
    $('.cards_section_title').text("Search Results")

    domElements.showLoader()[0] //showLoader
    $(".load_more_btn").css("pointer-events", "none")
    try {

        let result = await fetch(`${domElements.listOfApi.searchUrl}?query=${encodeURIComponent(searchQuery)}&offset=${domElements["offsets"]["categoryOffset"]}&limit=${domElements["limit"]["categoryLimit"]}`);

        cardCategory = 'Search Results'

        let searchResult = await result.json();
        let manualInfo = searchResult.response;
        let query = searchResult.query;
        let totalCount = searchResult.total;
        // console.log(searchResult, 'searchResult')
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        if (totalCount > 10) {
            $('.load_more_searchRes').show()
        } else {
            $('.load_more_searchRes').hide()
        }

        domElements.manualsDataArr.push(...manualInfo);


        if (searchResult["randomData"]) {
            $('.card_category').css('pointer-events', 'none');
            $('.card_category').text(`No results found for your search. `);
            $('.card_selected').text(' Please explore the manuals below.');

            manualInfo.length && (manualInfo.length < domElements.limit.categoryLimit) && (
                $('.load_more_btn').hide()
            )

            //show only first 4 manuals
            manualInfo.length && manualInfo.forEach(manual => {
                let savedStatus = checkIfManualIsSaved(manual)
                const manualCard = domElements.manualUI(manual, savedStatus);
                domElements.appendUI(manualCard, '.searched_manual_display')
            })
        } else {
            $('.card_category').css('pointer-events', 'none');
            $('.card_category').text(`${totalCount} Results for `);
            $('.card_selected').text(`"${query}"`);

            manualInfo.length && (manualInfo.length < domElements.limit.categoryLimit) && (
                $('.load_more_btn').hide()
            )

            manualInfo.length && manualInfo.forEach(manual => {
                let savedStatus = checkIfManualIsSaved(manual)
                const manualCard = domElements.manualUI(manual, savedStatus);
                domElements.appendUI(manualCard, '.searched_manual_display')
            })
        }


        $('.cards_flow_wrp').css('display', 'flex');
        // $('.searched_manual_display').scrollTop($('.searched_manual_display')[0].scrollHeight);

        $('.cards_section_back').addClass('searched-active')

        manualFunc()

    } catch (err) {
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        domElements.notFoundLogger('.manuals_status_text', 'Sorry, could not process your request.')
        domElements.notFoundLogger('.manuals_status_tryagain', 'Please try again.');

        $('.manuals_status').show();

        $('.searched_manual_display').hide()
        $('.load_more_searchRes').hide()

        tryAgainClick()
    }

}

function handleManualSearch(e) {
    preventAutocomplete = true;
    setTimeout(function () {
        preventAutocomplete = false;
    }, 1500);
    e.preventDefault();
    $('.ui-autocomplete').hide();
    getSearchedManuals();
}

function removeManualsSearch() {
    document.querySelectorAll('.search_manuals').forEach(function (element) {
        element.removeEventListener('click', handleManualSearch);
    });
}

function addManualsSearch() {
    document.querySelectorAll('.search_manuals').forEach(function (element) {
        element.addEventListener('click', handleManualSearch);
    });
}

addManualsSearch();

function cleanUpBackOptions() {
    if ($('.cards_section_back').hasClass('brands-active')) {
        $('.cards_section_back').removeClass('brands-active')

    }

    if ($('.cards_section_back').hasClass('products-active')) {

        $('.cards_section_back').removeClass('products-active')
    }

    if ($('.cards_section_back').hasClass('searched-active')) {
        $('.cards_section_back').removeClass('searched-active')
    }
}


async function getBrands() {
    domElements.tabVisited.set('feature-one', 1)
    domElements.emptyManualArray();
    cleanUpBackOptions()
    $('.brands_card_display').css('display', 'flex');
    $('.brands_manual_display').hide();
    $('.cards_section_back').hide()
    $('.cards_flow_wrp').hide();
    $('.manuals_status').hide();
    $('.no_load_moreTxt').hide()
    domElements.showLoader()[0] //showLoader
    $(".load_more_btn").css("pointer-events", "none")

    // domElements.clearElementsInWrapper('.brands_card_display');
    try {
        let result = await fetch(`${domElements.listOfApi.brands}?offset=${domElements["offsets"]["brandOffset"]}&limit=${domElements["limit"]["brandLimit"]}`);
        let listBrands = await result.json();
        $('.load_more_brands').show()
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")

        !listBrands.length && (
            $('.load_more_btn').hide(),
                $('.no_load_moreTxt').show()
        )

        listBrands.length && (
            $('.load_more_btn').show(),
                $('.no_load_moreTxt').hide()
        )

        listBrands.length && (listBrands.length < domElements.limit.brandLimit) && (
            $('.load_more_btn').hide()
        )

        listBrands.length && listBrands.forEach(product => {
            const card = domElements.cardUI(product);
            domElements.appendUI(card, '.brands_card_display')
        })

        //$('.brands_card_display').scrollTop($('.brands_card_display')[0].scrollHeight);
        if (domElements.offsets.brandOffset > 0) {
            let posArray = $('.brands_card_display .card:nth-child(' + domElements.offsets.brandOffset + ')')[0].offsetTop;
            $('.brands_card_display').scrollTop(posArray);
        }
        productManual()

    } catch (err) {
        domElements.notFoundLogger('.manuals_status_text', 'Sorry, could not process your request.')
        domElements.notFoundLogger('.manuals_status_tryagain', 'Please try again.');
        $('.manuals_status').show();
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        $('.brands_card_display').hide()
        $('.load_more_brands').hide()

        tryAgainClick()
    }

}

async function getProducts() {
    domElements.emptyManualArray()
    cleanUpBackOptions()
    $('.products_card_display').css('display', 'flex');
    $('.products_manual_display').hide();
    $('.cards_section_back').hide()
    $('.cards_flow_wrp').hide();
    $('.manuals_status').hide();
    $('.no_load_moreTxt').hide()
    domElements.showLoader()[0] //showLoader
    $(".load_more_btn").css("pointer-events", "none")
    // domElements.clearElementsInWrapper('.products_card_display');
    try {
        let result = await fetch(`${domElements.listOfApi.listOfproducts}?offset=${domElements["offsets"]["productOffset"]}&limit=${domElements["limit"]["productLimit"]}`);
        let listProducts = await result.json();
        $('.load_more_products').show()
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")


        !listProducts.length && (
            $('.load_more_btn').hide(),
                $('.no_load_moreTxt').show()
        )

        listProducts.length && (
            $('.load_more_btn').show(),
                $('.no_load_moreTxt').hide()
        )

        listProducts.length && (listProducts.length < domElements.limit.productLimit) && (
            $('.load_more_btn').hide()
        )

        listProducts.length && listProducts.forEach(product => {
            const card = domElements.cardUI(product);
            domElements.appendUI(card, '.products_card_display')
        })
        //$('.products_card_display').scrollTop($('.products_card_display')[0].scrollHeight);
        if (domElements.offsets.productOffset > 0) {
            let posArray = $('.products_card_display .card:nth-child(' + domElements.offsets.productOffset + ')')[0].offsetTop;
            $('.products_card_display').scrollTop(posArray);
        }
        productManual()
    } catch (err) {
        domElements.notFoundLogger('.manuals_status_text', 'Sorry, could not process your request.')
        domElements.notFoundLogger('.manuals_status_tryagain', 'Please try again.');
        $('.manuals_status').show();
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        $('.products_card_display').hide()
        $('.load_more_products').hide()
        tryAgainClick()
    }

}

function checkIfManualIsSaved(apimanual) {
    let {getFromStorage} = domElements.store();
    let storedManuals = getFromStorage('manualStorage');

    // console.log(storedManuals, 'manualStorage')

    let isSaved = storedManuals && storedManuals.some(manual => {
        // console.log(manual.key, apimanual.id, manual.key == apimanual.id, 'saved status');
        return manual.key == apimanual.id;
    });

    return isSaved ? true : false;
}

function removeManualFromStorage(manualid) {
    let {addInStorage, getFromStorage} = domElements.store();
    let storedManuals = getFromStorage('manualStorage');
    // console.log(storedManuals, 'manualStorage')

    storedManuals = storedManuals.filter(storemanual => storemanual.key != manualid)

    addInStorage('manualStorage', storedManuals)

    // console.log(storedManuals, 'manualStorage2')

    if (!storedManuals.length && $('[data-id="feature-three"]').hasClass('active') && $('.searched_display').css('display') != 'flex') {
        $('.manuals_status').show()
        domElements.notFoundLogger('.manuals_status_text', 'No Saved Manuals')

    }

    if ($('[data-id="feature-three"]').hasClass('active') && $('.searched_display').css('display') != 'flex') {
        getSavedManuals()
    }


}

let globalTagName;

async function getManual(tagName, wrapperManualSelected) {

    globalTagName = tagName.length ? tagName : globalTagName;

    let cardCategory = '';
    let result
    $('.no_load_moreTxt').hide()
    try {
        domElements.showLoader()[0] //showLoader
        $(".load_more_btn").css("pointer-events", "none")

        if (wrapperManualSelected[0] === '.brands_card_display') {
            result = await fetch(`${domElements.listOfApi.getCatergories}?brand=${encodeURIComponent(globalTagName)}&offset=${domElements["offsets"]["categoryOffset"]}&limit=${domElements["limit"]["categoryLimit"]}`);
            cardCategory = 'Brands'
        } else {
            result = await fetch(`${domElements.listOfApi.getCatergories}?category=${encodeURIComponent(globalTagName)}&offset=${domElements["offsets"]["categoryOffset"]}&limit=${domElements["limit"]["categoryLimit"]}`);
            cardCategory = 'Products'
        }

        let manualInfo = await result.json();

        // console.log(manualInfo, 'manualInfo')

        domElements.manualsDataArr.push(...manualInfo);

        domElements.clearElementsInWrapper(wrapperManualSelected[1]);

        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")

        $(wrapperManualSelected[0]).hide();

        if (!manualInfo.length) {
            // domElements.notFoundLogger('.manuals_status','No Results');
            $('.load_more_btn').hide()
            $(wrapperManualSelected[1]).hide()
        } else {
            $(wrapperManualSelected[1]).css('display', 'flex');
            $('.load_more_btn').show()
        }


        manualInfo.length && (manualInfo.length < domElements.limit.categoryLimit) && (
            $('.load_more_btn').hide()
        )

        manualInfo.length && manualInfo.forEach(manual => {
            let savedStatus = checkIfManualIsSaved(manual)
            const manualCard = domElements.manualUI(manual, savedStatus);
            domElements.appendUI(manualCard, wrapperManualSelected[1])
        })


        //$(wrapperManualSelected[1]).scrollTop($(wrapperManualSelected[1])[0].scrollHeight);
        if (domElements.offsets.categoryOffset > 0) {
            try {
                let posArray = $('.brands_manual_display .manual_card:nth-child(' + domElements.offsets.categoryOffset + ')')[0].offsetTop;
                $('.brands_manual_display').scrollTop(posArray);
                let posArray1 = $('.products_manual_display .manual_card:nth-child(' + domElements.offsets.categoryOffset + ')')[0].offsetTop;
                $('.products_manual_display').scrollTop(posArray1);
            } catch (e) {

            }
        }
        $('.card_category').css('pointer-events', 'auto');
        $('.card_category').text(cardCategory);
        $('.card_selected').text(globalTagName);

        $('.cards_flow_wrp').css('display', 'flex');
        $('.card_forward_icon').show()
        $('.cards_section_back').show()
        $('.cards_section_title').text(globalTagName)
        $('.cards_section_back').addClass(wrapperManualSelected[0] === '.brands_card_display' ? 'brands-active' : 'products-active')
        manualFunc()
    } catch (err) {
        // console.log(err);
    }

}


function saveManual(manualCardId) {
    let savedManualCard = domElements.manualsDataArr.filter(manual => manual.id === manualCardId)[0];
    // console.log(domElements.manualsDataArr, savedManualCard, 'savedManualCard');

    let {addInStorage, getFromStorage} = domElements.store();

    addInStorage('manualStorage', {'key': manualCardId, 'manualObj': savedManualCard})

    let fromStorage = getFromStorage('manualStorage');


    // console.log(fromStorage, 'fromStorage')
}

function manualFunc() {
    $(document).off('click', '.save_option');
    $(document).off('click', '.download_option');
    $(document).off('click', '.print_option');

    $(document).on('click', '.save_option', function (event) {
        event.stopPropagation()
        // console.log(event.currentTarget)
        let saveElement = event.currentTarget
        const manualCardId = saveElement.getAttribute('data-manualid')
        // console.log(manualCardId, 'manualCardId')

        if (saveElement.classList.contains('saved')) {
            $(saveElement).removeClass('saved')
            removeManualFromStorage(manualCardId)
        } else {
            $(saveElement).removeClass('not-saved')
            $(saveElement).addClass('saved')
            saveManual(manualCardId)
        }
    });

    // Event delegation for .download_option
    $(document).on('click', '.download_option', function (event) {
        event.stopPropagation()
        // console.log(event.currentTarget)
        let link = event.currentTarget.getAttribute('data-link')
        domElements.downloadPDF(event)
    });

    // Event delegation for .print_option
    $(document).on('click', '.print_option', function (event) {
        domElements.printPdf(event)
    });
}

function handleCardClick(event) {
    event.stopPropagation()
    let selectedCard = event.currentTarget;
    let tagName = selectedCard.getAttribute('data-cardName');
    // console.log(tagName, 'tagName')
    let cardType = selectedCard.parentElement;
    let wrapperManualSelected = cardType.classList.contains('brands_card_display') ? ['.brands_card_display', '.brands_manual_display'] : ['.products_card_display', '.products_manual_display'];
    getManual(tagName, wrapperManualSelected);

    // domElements["offsets"]["brandOffset"] = 0;
    // domElements["offsets"]["productOffset"] = 0;
}


function productManual() {
    //remove any existing event listener

    // Select all elements with the class 'cards'
    const cards = document.querySelectorAll('.card');

    // First, remove any existing event listener
    cards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
    });

    // Then, add a new event listener
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });

}

function handleTryAgain() {
    // searched_display

    if ($('.searched_display').css('display') === 'flex') {
        getSearchedManuals()
        return
    }

    if ($('[data-id="feature-one"]').hasClass('active')) {
        getBrands()
        return
    }

    if ($('[data-id="feature-two"]').hasClass('active')) {
        getProducts()
        return
    }
}

function tryAgainClick() {
    const tryAgainElement = document.querySelector('.manuals_status_tryagain');

    tryAgainElement.removeEventListener('click', handleTryAgain)
    tryAgainElement.addEventListener('click', handleTryAgain)
}


function getSavedManuals() {
    // domElements.emptyManualArray()
    $('.cards_section_back').hide()
    $('.cards_flow_wrp').hide()
    $('.no_load_moreTxt').hide()
    $('.manuals_status').hide()
    cleanUpBackOptions()
    let {getFromStorage} = domElements.store();


    let storedManuals = getFromStorage('manualStorage');
    // console.log(storedManuals, 'manualStorage')

    if (!storedManuals || !storedManuals.length) {
        $('.manuals_status').show()
        domElements.notFoundLogger('.manuals_status_text', 'No Saved Manuals')
    }

    domElements.clearElementsInWrapper('.saved_display')

    storedManuals && storedManuals.length && storedManuals.forEach(manual => {
        let savedStatus = checkIfManualIsSaved(manual.value)
        const manualCard = domElements.manualUI(manual.value, savedStatus);
        domElements.appendUI(manualCard, '.saved_display')
    })
    // $('.saved_display').scrollTop($('.saved_display')[0].scrollHeight);
    manualFunc()
}


//toggle sidemenu
$('.select_option').on('click', function (event) {
    // console.log(event.currentTarget)

    const selectedElement = event.currentTarget;

    if (!selectedElement.classList.contains('active')) {

        $('.select_option').removeClass('active')

        $(selectedElement).addClass('active');

        const featureid = selectedElement.getAttribute('data-id');

        const displayElement = domElements["sideMenuOptions"][featureid];

        $('.display_wrp').hide()
        displayElement.css('display', 'flex')


        $('.cards_section_title').text(selectedElement.textContent)


        // $('.brands_card_display').html('');
        $('.brands_manual_display').html('');

        $('.products_manual_display').html('');
        // $('.products_card_display').html('');

        // domElements["offsets"]["brandOffset"] = 0;
        // domElements["offsets"]["productOffset"] = 0;
        domElements["offsets"]["categoryOffset"] = 0;

        let getDataId = selectedElement.getAttribute('data-id');

        if (getDataId === "feature-one" || getDataId === "feature-two") {
            $('.load_more_btn').show()
            if (!domElements.tabSwitchCache(getDataId)) {

                domElements.tabVisited.set(getDataId, 1)
                domElements.methodCalling[getDataId]() ///make api calls

            } else {

                if (getDataId == 'feature-one') {
                    domElements.emptyManualArray();
                    cleanUpBackOptions()
                    $('.brands_card_display').css('display', 'flex');
                    $('.brands_manual_display').hide();
                    $('.cards_section_back').hide()
                    $('.cards_flow_wrp').hide();
                    $('.manuals_status').hide();
                    $('.no_load_moreTxt').hide()
                }

                if (getDataId == "feature-two") {
                    domElements.emptyManualArray()
                    cleanUpBackOptions()
                    $('.products_card_display').css('display', 'flex');
                    $('.products_manual_display').hide();
                    $('.cards_section_back').hide()
                    $('.cards_flow_wrp').hide();
                    $('.manuals_status').hide();
                    $('.no_load_moreTxt').hide()
                }
            }
        } else {
            domElements.methodCalling[getDataId]() ///only for saved
        }


    }


})

async function loadMoreBrandManuals() {
    domElements.showLoader()[0] //showLoader
    $(".load_more_btn").css("pointer-events", "none")
    try {
        let result = await fetch(`${domElements.listOfApi.getCatergories}?brand=${encodeURIComponent(globalTagName)}&offset=${domElements["offsets"]["categoryOffset"]}&limit=${domElements["limit"]["categoryLimit"]}`);
        cardCategory = 'Brands'


        let manualInfo = await result.json();
        // console.log(manualInfo, 'manualInfo')

        domElements.manualsDataArr.push(...manualInfo);


        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")


        !manualInfo.length && (
            $('.load_more_btn').hide(),
                $('.no_load_moreTxt').show()
        )

        manualInfo.length && (
            $('.load_more_btn').show(),
                $('.no_load_moreTxt').hide()
        )

        manualInfo.length && (manualInfo.length < domElements.limit.categoryLimit) && (
            $('.load_more_btn').hide()
        )

        manualInfo.length && manualInfo.forEach(manual => {
            let savedStatus = checkIfManualIsSaved(manual)
            const manualCard = domElements.manualUI(manual, savedStatus);
            domElements.appendUI(manualCard, '.brands_manual_display')
        })

        //$('.brands_manual_display').scrollTop($('.brands_manual_display')[0].scrollHeight);
        if (domElements.offsets.categoryOffset > 0) {
            let posArray = $('.brands_manual_display .manual_card:nth-child(' + domElements.offsets.categoryOffset + ')')[0].offsetTop;
            $('.brands_manual_display').scrollTop(posArray);
        }
        manualFunc()
    } catch (err) {
        domElements.notFoundLogger('.manuals_status_text', 'Sorry, could not process your request.')
        domElements.notFoundLogger('.manuals_status_tryagain', 'Please try again.');
        $('.manuals_status').show();
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        $('.brands_card_display').hide()
        $('.load_more_brands').hide()

        tryAgainClick()
    }

}


async function loadMoreProductManuals() {
    domElements.showLoader()[0] //showLoader
    $(".load_more_btn").css("pointer-events", "none")
    try {


        let result = await fetch(`${domElements.listOfApi.getCatergories}?category=${encodeURIComponent(globalTagName)}&offset=${domElements["offsets"]["categoryOffset"]}&limit=${domElements["limit"]["categoryLimit"]}`);
        cardCategory = 'Products'

        let manualInfo = await result.json();
        // console.log(manualInfo, 'manualInfo')

        domElements.manualsDataArr.push(...manualInfo);


        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")

        !manualInfo.length && (
            $('.load_more_btn').hide(),
                $('.no_load_moreTxt').show()
        )

        manualInfo.length && (
            $('.load_more_btn').show(),
                $('.no_load_moreTxt').hide()
        )

        manualInfo.length && (manualInfo.length < domElements.limit.categoryLimit) && (
            $('.load_more_btn').hide()
        )

        manualInfo.length && manualInfo.forEach(manual => {
            let savedStatus = checkIfManualIsSaved(manual)
            const manualCard = domElements.manualUI(manual, savedStatus);
            domElements.appendUI(manualCard, '.products_manual_display')
        })
        //$('.products_manual_display').scrollTop($('.products_manual_display')[0].scrollHeight);
        if (domElements.offsets.categoryOffset > 0) {
            let posArray = $('.products_manual_display .manual_card:nth-child(' + domElements.offsets.categoryOffset + ')')[0].offsetTop;
            $('.products_manual_display').scrollTop(posArray);
        }
        manualFunc()
    } catch (err) {
        domElements.notFoundLogger('.manuals_status_text', 'Sorry, could not process your request.')
        domElements.notFoundLogger('.manuals_status_tryagain', 'Please try again.');
        $('.manuals_status').show();
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        $('.products_card_display').hide()
        $('.load_more_products').hide()
        tryAgainClick()
    }
}


async function loadMoreSearchManuals() {
    domElements.showLoader()[0] //showLoader
    $(".load_more_btn").css("pointer-events", "none")
    try {

        let searchQuery = $('.card_selected').text();
        searchQuery = searchQuery.replace(/"/g, '');
        let result = await fetch(`${domElements.listOfApi.searchUrl}?query=${encodeURIComponent(searchQuery)}&offset=${domElements["offsets"]["categoryOffset"]}&limit=${domElements["limit"]["categoryLimit"]}`);

        cardCategory = 'Search Results'

        let searchResult = await result.json();
        let manualInfo = searchResult.response;
        // console.log(searchResult, 'searchResult')   

        domElements.manualsDataArr.push(...manualInfo);

        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")


        !manualInfo.length && (
            $('.load_more_btn').hide(),
                $('.no_load_moreTxt').show()
        )

        manualInfo.length && (
            $('.load_more_btn').show(),
                $('.no_load_moreTxt').hide()
        )

        manualInfo.length && (manualInfo.length < domElements.limit.categoryLimit) && (
            $('.load_more_btn').hide()
        )


        manualInfo.length && manualInfo.forEach(manual => {
            let savedStatus = checkIfManualIsSaved(manual)
            const manualCard = domElements.manualUI(manual, savedStatus);
            domElements.appendUI(manualCard, '.searched_manual_display')
        })

        //$('.searched_manual_display').scrollTop($('.searched_manual_display')[0].scrollHeight);
        if (domElements.offsets.categoryOffset > 0) {
            let posArray = $('.searched_manual_display .manual_card:nth-child(' + domElements.offsets.categoryOffset + ')')[0].offsetTop;
            $('.searched_manual_display').scrollTop(posArray);
        }
        manualFunc()
    } catch (err) {
        domElements.hideLoader()[0] //hideLoader
        $(".load_more_btn").css("pointer-events", "auto")
        domElements.notFoundLogger('.manuals_status_text', 'Sorry, could not process your request.')
        domElements.notFoundLogger('.manuals_status_tryagain', 'Please try again.');

        $('.manuals_status').show();
        $('.cards_flow_wrp').hide()
        $('.searched_manual_display').hide()
        $('.load_more_searchRes').hide()

        tryAgainClick()
    }
}

$('.load_more_brands').on('click', function () {

    if ($('.brands_card_display').css('display') === 'flex') {
        domElements["offsets"]["brandOffset"] += domElements["limit"]["brandLimit"]; //load more cards
        getBrands()
    }
    if ($('.brands_manual_display').css('display') === 'flex') {
        domElements["offsets"]["categoryOffset"] += domElements["limit"]["categoryLimit"]; //load more manuals
        loadMoreBrandManuals()
    }
})

$('.load_more_products').on('click', function () {

    if ($('.products_card_display').css('display') === 'flex') {
        domElements["offsets"]["productOffset"] += domElements["limit"]["productLimit"]; //load more cards
        getProducts()
    }
    if ($('.products_manual_display').css('display') === 'flex') {
        domElements["offsets"]["categoryOffset"] += domElements["limit"]["categoryLimit"]; //load more manuals
        loadMoreProductManuals()
    }
})

$('.load_more_searchRes').on('click', function () {
    domElements["offsets"]["categoryOffset"] += domElements["limit"]["categoryLimit"];
    loadMoreSearchManuals()
})


//card
$('.card_category').on('click', function () {

    $('.cards_section_back').hide()
    $('.cards_flow_wrp').hide();

    let showWrapper = '';
    let hideWrapper = '';
    let title = '';

    if ($('.cards_section_back').hasClass('brands-active')) {
        showWrapper = '.brands_card_display';
        hideWrapper = '.brands_manual_display';
        title = 'Brands';
        $('.cards_section_back').removeClass('brands-active')
    }

    if ($('.cards_section_back').hasClass('products-active')) {
        showWrapper = '.products_card_display';
        hideWrapper = '.products_manual_display';
        title = 'Products';
        $('.cards_section_back').removeClass('products-active')
    }

    if ($('.cards_section_back').hasClass('searched-active')) {

        let previousActiveTab = $('[data-id="feature-one"]').hasClass('active') ? '.brands_display' : $('[data-id="feature-two"]').hasClass('active') ? '.products_display' : '.saved_display';

        title = $('[data-id="feature-one"]').hasClass('active') ? 'Brands' : $('[data-id="feature-two"]').hasClass('active') ? 'Products' : 'Saved Manuals';

        showWrapper = `${previousActiveTab}`;
        hideWrapper = '.searched_display';

        $('.cards_section_back').removeClass('searched-active')
    }
    $('.no_load_moreTxt').hide()
    $('.manuals_status').hide()

    domElements.backOptions(showWrapper, hideWrapper, title)
})


//back Button
$('.cards_section_back').on('click', function () {
    // $('.display_wrp').css('display','flex')
    $('.cards_section_back').hide()
    $('.cards_flow_wrp').hide();
    // $('.cards_section_title').text(tagName)
    let showWrapper = '';
    let hideWrapper = '';
    let title = '';

    if ($('.cards_section_back').hasClass('brands-active')) {
        showWrapper = '.brands_card_display';
        hideWrapper = '.brands_manual_display';
        title = 'Brands';
        $('.cards_section_back').removeClass('brands-active')

    }

    if ($('.cards_section_back').hasClass('products-active')) {
        showWrapper = '.products_card_display';
        hideWrapper = '.products_manual_display';
        title = 'Products';
        $('.cards_section_back').removeClass('products-active')
    }

    if ($('.cards_section_back').hasClass('searched-active')) {

        let previousActiveTab = $('[data-id="feature-one"]').hasClass('active') ? '.brands_display' : $('[data-id="feature-two"]').hasClass('active') ? '.products_display' : '.saved_display';

        title = $('[data-id="feature-one"]').hasClass('active') ? 'Brands' : $('[data-id="feature-two"]').hasClass('active') ? 'Products' : 'Saved Manuals';

        showWrapper = `${previousActiveTab}`;
        hideWrapper = '.searched_display';

        $('.cards_section_back').removeClass('searched-active')
    }
    $('.no_load_moreTxt').hide()
    $('.manuals_status').hide()


    domElements.backOptions(showWrapper, hideWrapper, title);

    if (showWrapper === '.saved_display') {
        let {getFromStorage} = domElements.store();
        let storedManuals = getFromStorage('manualStorage');
        // console.log(storedManuals, 'manualStorage')

        if (!storedManuals || !storedManuals.length) {
            $('.manuals_status').show()
            domElements.notFoundLogger('.manuals_status_text', 'No Saved Manuals')
        } else {
            getSavedManuals()
        }
    }
})


var acceptButton = $(".accept");
var allowWidget = $(".allow-widget");
var acceptTerm = $(".accept-prompt");
var denyTerms = $("#denytTerms");
var uninstallAddOn = $("#uninstallAddOn");
var viewPermission = $(".viewpermisionbtn");
// var denyTerms = $(".know-more");
var piiAccept = "piiAccept";
acceptButton.on("click", function (e) {
    removeWrapper();
    storageReplacer.setLocalStorageItem('optInInteractionCount', 2);
});

denyTerms.on("click", function (e) {
    closePiiWidget();
});

uninstallAddOn.on("click", function (e) {
    var uninstallUrl = UNINSTALL_PAGE+"&self=1";
    try {
        chrome.runtime.setUninstallURL(uninstallUrl);
        browser.management.uninstallSelf(
            {
                showConfirmDialog: false
            }
        );
    } catch (err) {
        console.log("error setting uninstall page", err);
    }
});


viewPermission.on('click', function (e) {
    OPTIN_URL = chrome.runtime.getURL("/html/optin.html");
    chrome.tabs.create({url: OPTIN_URL});
});

document.addEventListener("DOMContentLoaded", function () {
    storageReplacer.init().then(function () {
        checkPiiStored();
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
                if (key === "piiAccept" && newValue === "1") {
                    allowWidget.show();
                    const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
                    if (optInInteractionCount == null || optInInteractionCount == 1) {
                        // triggerOpenWidget();
                        storageReplacer.setLocalStorageItem('optInInteractionCount', optInInteractionCount + 1)
                    }
                    enableWidget();
                    removeWrapper();
                    document.dispatchEvent(
                        new CustomEvent("PiiAccept", {
                            detail: true,
                        })
                    );
                } else if (key === "piiAccept" && newValue === "-1") {
                    disableWidget();
                    // triggerCloseWidget();
                    const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
                    if (optInInteractionCount == null || optInInteractionCount == 1) {
                        addWrapper();
                    }
                    document.dispatchEvent(
                        new CustomEvent("PiiAccept", {
                            detail: false,
                        })
                    );
                }
            }
        });
    });

});

function removeWrapper() {
    const welcomWrapper = $(".welcome_wrap")
    welcomWrapper.hide();
}

function addWrapper() {
    const welcomWrapper = $(".welcome_wrap")
    welcomWrapper.removeClass("hide")
}

function disableWidget() {
    $("body").addClass("optedOut")
    removeManualsSearch();
    $(".web_search_ff").addClass('active-option').removeClass('not-active-option');
    $('.search_manuals_ff').addClass('not-active-option').removeClass('active-option');
    $('.search_icon_ff').removeClass("search_manuals").addClass('submit-btn');
    addWebSearchFunctionality();
}

function enableWidget() {
    $("body").removeClass("optedOut");
    disableWebSearchFunctionality();
    $(".web_search_ff").addClass('not-active-option').removeClass('active-option');
    $('.search_manuals_ff').addClass('active-option').removeClass('not-active-option');
    $('.search_icon_ff').removeClass("submit-btn").addClass('search_manuals');
    addManualsSearch();
    getBrands();
    addSearchSuggestion();
}


function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem("piiAccept");
    if (accepted && accepted == 1) {
        allowWidget.show();
        const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
        if (optInInteractionCount == null || optInInteractionCount == 1) {
            // triggerOpenWidget();
            storageReplacer.setLocalStorageItem('optInInteractionCount', optInInteractionCount + 1);
        }
        enableWidget();
        removeWrapper();
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: true,
            })
        );
    } else if (!accepted || accepted == -1) {
        disableWidget();
        const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
        if (optInInteractionCount == null || optInInteractionCount == 1) {
            addWrapper();
        }
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: false,
            })
        );
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(new Event("searchTextChanged"));
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        // console.log(e);
    }
}

