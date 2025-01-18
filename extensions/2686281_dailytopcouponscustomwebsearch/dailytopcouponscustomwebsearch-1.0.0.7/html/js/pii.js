$(document).ready(function (doc) {
    attachKeepChangesOverlayListener();
    attachKeepChangesCloseListener();
});


$(function () {
    $('.firefox_cust_overlay').addClass('ffbrowser')
});


document.addEventListener('keepChangesNewTab', keepchangesActive);

function keepchangesActive() {
    $('.firefox_cust_overlay').show();
    $("#search-text").blur();
    setTimeout(function () {
        $('.firefox_cust_overlay').hide();
        // $("#search-text").focus();
    }, 10000);
}

function attachKeepChangesOverlayListener() {
    $('body').on('click', '.firefox_cust_overlay', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
}

function attachKeepChangesCloseListener() {
    $(".close-ff-arrow").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.firefox_cust_overlay').hide();
    });
}
window.widgetParams = {
    widgetOpen: false,
    widgetTab: null,
    srcVal: null,
    srcClick: document.querySelectorAll('[n-widgetclick]'),
    targetClick: document.querySelectorAll('[n-widgettarget]'),
    actionEl: document.querySelectorAll('[n-widgetAction]'),
    allWidgetEl: [],
    targetClosest: false,
};
window.activeLinkout = null;

function updateCurrentDateTime2() {
    var date = getCurrentTime();
    $('#custtime').text(date.value + ' ' + date.unit);
    $('#custdate').text(customDate2(new Date()));
    $('.currenttime .sep').css('display', 'inline-block');
}
function getCurrentTime(val) {
    var date = val || new Date();
    var format = { value: '', unit: '' };
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

function onloadActivity() {
    initWidgetFeature();
    initTabMenu();

    if (!storageReplacer.getLocalStorageItem('onboarding')) {
        storageReplacer.setLocalStorageItem('onboarding', 'yes');
        widgetParams.widgetOpen = true;
        openWidget('main', 'latest_deals');
    }

    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        getDataFromNet();
    }
}

function initWidgetFeature() {
    for (var i = 0; i < widgetParams.srcClick.length; i++) {
        var _el = widgetParams.srcClick[i];
        _el && widgetParams.allWidgetEl.push(_el);
    }
    for (var i = 0; i < widgetParams.targetClick.length; i++) {
        var _el = widgetParams.targetClick[i];
        _el && widgetParams.allWidgetEl.push(_el);
    }
    for (var i = 0; i < widgetParams.actionEl.length; i++) {
        var _el = widgetParams.actionEl[i];
        _el && widgetParams.allWidgetEl.push(_el);
    }

    for (var i = 0; i < widgetParams.allWidgetEl.length; i++) {
        if (widgetParams.allWidgetEl[i]) {
            widgetParams.allWidgetEl[i].addEventListener(
                'mouseover',
                function() {
                    widgetParams.targetClosest = false;
                }
            );

            widgetParams.allWidgetEl[i].addEventListener(
                'mouseout',
                function() {
                    widgetParams.targetClosest = true;
                }
            );
        }
    }

    if (widgetParams.srcClick && widgetParams.srcClick.length > 0) {
        for (var i = 0; i < widgetParams.srcClick.length; i++) {
            widgetParams.srcClick[i].addEventListener('click', function(e) {
                checkPiiStored();
                var _this = e.currentTarget;
                var srcValue = _this.getAttribute('n-widgetclick');
                var targetValue = _this.getAttribute('n-widgettarget');
                var categValue = _this.getAttribute('widget-categ');
                var tabTarget = _this.getAttribute('data-tab-target');

                if (srcValue) {
                    if (srcValue === widgetParams.srcVal) {
                        if (tabTarget) {
                            if (tabTarget == widgetParams.widgetTab) {
                                if (widgetParams.widgetOpen) {
                                    closeWidget();
                                    widgetParams.widgetOpen = false;
                                } else {
                                    openWidget(srcValue, tabTarget);
                                    tabSelect();
                                    widgetParams.widgetOpen = true;
                                }
                            } else {
                                closeWidget(widgetParams.widgetTab);
                                widgetParams.widgetTab = tabTarget;
                                tabSelect();
                                widgetParams.widgetOpen = true;
                                openWidget(srcValue, tabTarget);
                            }
                        } else if (categValue) {
                            if (categValue == widgetParams.widgetTab) {
                                var _action = document.querySelector(
                                    '[n-widgetaction="' + srcValue + '"]'
                                );
                                if (
                                    _action &&
                                    _action.classList.contains('active')
                                ) {
                                    closeWidget();
                                    widgetParams.widgetOpen = false;
                                } else {
                                    tabSelect();
                                    openWidget(srcValue, categValue);
                                }
                            } else {
                                closeWidget(widgetParams.widgetTab);
                                widgetParams.widgetOpen = true;
                                widgetParams.widgetTab = categValue;
                                tabSelect();
                                openWidget(srcValue, categValue);
                            }
                        } else {
                            var _action = document.querySelector(
                                '[n-widgetaction="' + srcValue + '"]'
                            );
                            if (
                                _action &&
                                _action.classList.contains('active')
                            ) {
                                closeWidget();
                                widgetParams.widgetOpen = false;
                            } else {
                                openWidget(srcValue);
                            }
                        }
                    } else {
                        closeWidget();
                        if (srcValue == 'main') {
                            widgetParams.widgetOpen = true;
                            var temp_target = tabTarget
                                ? tabTarget
                                : categValue
                                ? categValue
                                : 'lockdown_deals';
                            widgetParams.widgetTab = temp_target;
                            tabSelect();
                            openWidget(srcValue, temp_target);
                        } else {
                            openWidget(srcValue);
                            widgetParams.widgetOpen = false;
                        }
                    }
                } else if (targetValue) {
                    var _action = document.querySelector(
                        '[n-widgetaction="' + targetValue + '"]'
                    );
                    if (_action && _action.classList.contains('active')) {
                        closeWidget();
                    } else {
                        closeWidget();
                        widgetParams.widgetOpen = true;
                        if (targetValue == 'main') {
                            widgetParams.widgetTab = 'latest_deals';
                        }
                        tabSelect();
                        openWidget(targetValue, widgetParams.widgetTab);
                    }
                }
                widgetParams.srcVal = srcValue;
                setCategText();
            });
        }
    }

    $(document).on('click', function(e) {
        if (widgetParams.targetClosest) {
            closeWidget();
            widgetParams.widgetOpen = false;
        }
    });

    document.addEventListener('searchAttempt', function() {
        closeWidget();
        widgetParams.widgetOpen = false;
    });
}

function tempTabFix() {
    setTimeout(function() {
        if ($('.latest-deals-input').val() == '') {
            $('.deals-list').empty();
            tempDataDeals = [];
            dealsListInit(couponsData);
        }
        if ($('.win-freebies-input').val() == '') {
            $('.freebies-list').empty();
            tempDataFb = [];
            freebiesListInit(couponsData);
        }
    }, 200);
}

function closeWidget(dataTarget) {
    widgetParams.allWidgetEl.map(function(_el, i) {
        if (dataTarget) {
            if (
                _el.getAttribute('data-tab-target') == dataTarget ||
                _el.getAttribute('widget-categ') == dataTarget
            ) {
                _el.classList.remove('active-widget-tab', 'active');
            }
        } else {
            if (_el) {
                _el.classList.remove('active-widget-tab', 'active');
            }
        }
    });
    if (!checkAppliedCateg()) {
        setCategChecked();
    }
    setCategText();
}

function openWidget(openTarget, dataTarget) {
    widgetParams.allWidgetEl.map(function(_el) {
        if (
            _el.getAttribute('n-widgettarget') == openTarget ||
            _el.getAttribute('n-widgetaction') == openTarget
        ) {
            _el.classList.add('active-widget-tab', 'active');
        } else if (_el.getAttribute('n-widgetclick') == openTarget) {
            if (dataTarget) {
                if (_el.getAttribute('data-tab-target') == dataTarget) {
                    _el.classList.add('active-widget-tab', 'active');
                } else if (_el.getAttribute('widget-categ') == dataTarget) {
                    _el.classList.add('active-widget-tab', 'active');
                }
            } else {
                _el.classList.add('active-widget-tab', 'active');
            }
        }
    });
}

function tabSelect() {
    var currentTab = widgetParams.widgetTab
        ? widgetParams.widgetTab === 'lockdown_deals'
            ? 'latest_deals'
            : widgetParams.widgetTab
        : 'latest_deals';
    $('[data-tab-id], .tab-block[data-tab-target]').removeClass(
        'active-widget-tab active'
    );
    $(
        '[data-tab-id="' +
            currentTab +
            '"], .tab-block[data-tab-target="' +
            currentTab +
            '"]'
    ).addClass('active-widget-tab active');
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        setCTab();
    }
}
document.addEventListener('PiiAccept', function (e) {
    if (e.detail == true) {
        if (!storageReplacer.getLocalStorageItem('afterAcceptFirst')){
            getDataFromNet(true);
            storageReplacer.setLocalStorageItem('afterAcceptFirst', 1);
        }
    }
});
function setCTab() {
    if (widgetParams.widgetTab == 'win_freebies') {
        $('.win-freebies-input').val('');
        var str = templateFreebies(freebiesData);
        $('.freebies-list').empty().append(str);
        tempDataFb = freebiesData.filter(function (x) {
            return x;
        });
    } else {
        if (widgetParams.widgetTab == 'lockdown_deals') {
            if (!isCategApplied) {
                $(".cat-list input[type='checkbox']").prop('checked', false);
                $(".lockdowndeals input[type='checkbox']").prop(
                    'checked',
                    true
                );
                selectedCategory = ['Lockdown Deals'];
            }
        } else if (widgetParams.widgetTab == 'latest_deals') {
            // $(".lockdowndeals input[type='checkbox'], #all-c").prop(
            //     'checked',
            //     false
            // );
            if (!isCategApplied) {
                $(".cat-list input[type='checkbox']").prop('checked', true);
                selectedCategory = categoryArr.filter(function (x) {
                    return x;
                });
            }
        }
        setAppliedCateg();
        var accepted = storageReplacer.getLocalStorageItem('piiAccept');
        if (accepted && accepted == 1) {
            showCategoryData();
        }
        setCategText();
        $('.latest-deals-input').val('');
    }
    $('.categ-aply-btn').removeClass('disabled');
}
function setCategText() {
    if (appliedCategArr) {
        var _categ = appliedCategArr[appliedCategArr.length - 1];
        var temp_text = _categ;
        if (appliedCategArr.length == categoryArr.length || appliedCategArr.length == 0) {
            temp_text = 'All Categories';
        }else if (appliedCategArr.length > 1){
            console.log("len:",appliedCategArr);
            temp_text = 'Multiple Categories';
        } else if (_categ === 'Others') temp_text = 'Other';

        $('.cat .txt').text(temp_text);

    }
}
function initTabMenu() {
    var tabEls = document.querySelectorAll('.tab-block[data-tab-target]');
    for (var i = 0; i < tabEls.length; i++) {
        tabEls[i].addEventListener('click', function(e) {
            var targetElVal = e.currentTarget.getAttribute('data-tab-target');
            if (targetElVal) {
                var targetEl = document.querySelector(
                    '[data-tab-id="' + targetElVal + '"]'
                );
                if (targetEl) {
                    widgetParams.widgetTab = targetElVal;
                    tabSelect();
                    widgetParams.allWidgetEl.map(function(_el, i) {
                        if (_el.getAttribute('n-widgetclick') == 'main') {
                            if (
                                _el.getAttribute('data-tab-target') ==
                                targetElVal
                            ) {
                                _el.classList.add(
                                    'active-widget-tab',
                                    'active'
                                );
                            } else {
                                _el.classList.remove(
                                    'active-widget-tab',
                                    'active'
                                );
                            }
                        }
                    });
                }
            }
            // $('.sort-by-list li').removeClass('active');
            // $("[data-val='newlyadded']").addClass('active');
            // $('.deals-list, .freebies-list').empty();
            // $('.latest-deals-input, .win-freebies-input').val('');
            // // tempDataDeals = [];
            // // tempDataFb = [];
            // // checkAllInput();
            // showCategoryData();
            // dealsListInit(couponsData);
            // freebiesListInit(couponsData);
        });
    }
}

$(document).on('click', '.welcome-overlay', closeWelcomOverlay);

function closeWelcomOverlay() {
    $('body').removeClass('ins-overlay-body');
    $('.searchformwrap .search-text')
        .focus()
        .attr('placeholder', '');
    widgetParams.widgetOpen = false;
    widgetParams.widgetTab = 'latest_deals';
    closeWidget();
}

var couponsData = {},
    freebiesData = {},
    selectedCategory = [],
    ldealsData = {},
    newEntryDealCount = 0,
    newEntryFreebiesCount = 0,
    tempDataDeals = [],
    tempDataFb = [],
    isSearchedDl = false,
    categoryArr = [
        'Grocery',
        'Shopping',
        'Cosmetics',
        'Others'

    ],
    newEntryDays = 7,
    shareLink = 'https://dailytopcoupons.com/couponswebsite_r24vm?nocache=1';

window.appliedCategArr = categoryArr.filter(function(x) {
    return x;
});
window.isCategApplied = false;

function getDataFromNet(isFirstPermission) {
    showLoader();
    $.ajax({
        type: 'GET',
        url: specificConstants.API + 'getCouponListing?isActive=1',
        success: function(data) {
            if (!!data) {
                $('.loader').hide();
                couponsData = data;
                $("[data-val='newlyadded']").addClass('active');
                dealsListInit(couponsData);
                freebiesListInit(couponsData);
                checkAllInput();
                if(isFirstPermission){
                    if(!widgetParams.widgetTab){
                        widgetParams.widgetOpen = true;
                        openWidget('main', 'latest_deals');
                    } else {
                        tabSelect();
                    }
                }
            } else {
                noDataFound('.deals-list, .freebies-list');
            }
        },
        error: function(error) {
            console.log(error);
            hideLoader();
            noDataFound('.deals-list, .freebies-list');
        },
    });
}

function noDataFound(ele) {
    $(ele).html('<p class="nodata">No results found.</p>');
}

function hideLoader() {
    $('.loader').hide();
}

function showLoader() {
    $('.loader').show();
}

function dealsListInit(data) {
    newEntryDealCount = 0;
    ldealsData = filteredWithoutCatInd(data, 'Freebies');
    ldealsData = ldealsData.sort(newlyCreatedSort);
    var latestDealList = templateDeals(ldealsData);
    $('.deals-list').empty();
    $('.deals-list').append(latestDealList);
    if (newEntryDealCount > 0) {
        $('.new-deal-c')
            .show()
            .find('.counter')
            .text(newEntryDealCount);
    }
}

function freebiesListInit(data) {
    newEntryFreebiesCount = 0;
    freebiesData = filteredCatInd(data, 'Freebies');
    freebiesData = freebiesData.sort(newlyCreatedSort);
    var freebiesList = templateFreebies(freebiesData);
    $('.freebies-list').append(freebiesList);
    if (newEntryFreebiesCount > 0) {
        $('.new-freebies-c')
            .show()
            .find('.counter')
            .text(newEntryFreebiesCount);
    }
}

function templateDeals(data, isSorted) {
    if (!!data) {
        if (!isSorted) {
            data = data.sort(newlyCreatedSort);
        }
        var str = '',
            newlyC,
            currDate = new Date();
        for (var i = 0; i < data.length; i++) {
            newlyC = new Date(escapeHtml(data[i].lastUpdationDate));
            var newEn = '';
            var _categ = data[i].category
                ? data[i].category
                      .split(' ')
                      .join('')
                      .toLowerCase()
                : '';
            if (dateDiff(currDate, newlyC) <= newEntryDays) {
                newEn = 'new';
                newEntryDealCount += 1;
            }
            str +=
                `<li class="` +
                newEn +
                `">
            <div class="cont-wrap">
            <div class="thumb" style="` +
                getThumbPath(escapeHtml(data[i].thumbnail)) +
                `">
            </div>
            <div class="content">
            <div class="title" title="` +
            escapeHtml(data[i].title) +
                `">
            ` +
            escapeHtml(data[i].title) +
                `
            </div>
            <div class="desc" title="` +
            escapeHtml(data[i].description) +
                `">
            ` +
            escapeHtml(data[i].description) +
                `
            </div>
            </div>
            <div class="category-ico ` +
            escapeHtml(_categ) +
                `">
            <span class="cat-tooltip">` +
            escapeHtml(checkCovidText(data[i].category)) +
                `</span>
            </div>
            </div>
            <a href="` +
            escapeHtml(data[i].url) +
                `" target="_blank" class="deal-btn tracker"  data-event_name="DealsBtnClick"
            data-event_action="UserClick" data-event_str_value="` +
            escapeHtml(data[i].url) +
                `">
            <span class="ico">
            <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1">
            <g id="Page-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="1189.-Coupons---NT-1.1" transform="translate(-1165.000000, -475.000000)" fill="#FFFFFF">
            <g id="Group-16" transform="translate(1046.000000, 38.000000)">
            <g id="Group-18-Copy-8" transform="translate(10.000000, 324.000000)">
            <g id="button" transform="translate(10.000000, 100.000000)">
            <path d="M108.285705,13 L102.571406,13 C102.176952,13 101.857142,13.3198104 101.857142,13.7142945 C101.857142,14.1087478 102.176952,14.4285583 102.571406,14.4285583 L106.561275,14.4285583 L99.2092197,21.780669 C98.9302601,22.0596284 98.9302601,22.5118747 99.2092197,22.7908035 C99.3486535,22.9302985 99.5314551,23 99.7142874,23 C99.8970889,23 100.079891,22.9302985 100.219355,22.7907728 L107.571441,15.4387235 L107.571441,19.428589 C107.571441,19.8230423 107.891251,20.1428528 108.285705,20.1428528 C108.680189,20.1428528 109,19.8230423 109,19.428589 L109,13.7142945 C109,13.3198104 108.680189,13 108.285705,13" id="Fill-1"/>
            </g>
            </g>
            </g>
            </g>
            </g>
            </svg>
            </span>
            <span class="txt">
            Get Deal
            </span>
            </a>
            </li>`;
        }
        return str;
    }
}

function templateFreebies(data) {
    if (!!data) {
        var str = '',
            newlyC,
            currDate = new Date();
        for (var i = 0; i < data.length; i++) {
            newlyC = new Date(escapeHtml(data[i].lastUpdationDate));
            var newEn = '';
            if (dateDiff(currDate, newlyC) <= newEntryDays) {
                newEn = 'new';
                newEntryFreebiesCount += 1;
            }
            str +=
                `<li class="` +
                newEn +
                `">
            <div class="cont-wrap">
            <div class="thumb thumb-d ` +
                strLowercase(escapeHtml(data[i].thumbnail)) +
                `">
            </div>
            <div class="content">
            <div class="title" title="` +
            escapeHtml(data[i].title) +
                `">
            ` +
            escapeHtml(data[i].title) +
                `
            </div>
            </div>
            </div>
            <a href="` +
            escapeHtml(data[i].url) +
                `" target="_blank" class="deal-btn tracker"  data-event_name="FreebiesBtnClick"
            data-event_action="UserClick" data-event_str_value="` +
            escapeHtml(data[i].url) +
                `">
            <span class="ico">
            <svg width="10px" height="10px" viewBox="0 0 10 10" version="1.1">
            <g id="Page-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="1189.-Coupons---NT-1.1" transform="translate(-1165.000000, -475.000000)" fill="#FFFFFF">
            <g id="Group-16" transform="translate(1046.000000, 38.000000)">
            <g id="Group-18-Copy-8" transform="translate(10.000000, 324.000000)">
            <g id="button" transform="translate(10.000000, 100.000000)">
            <path d="M108.285705,13 L102.571406,13 C102.176952,13 101.857142,13.3198104 101.857142,13.7142945 C101.857142,14.1087478 102.176952,14.4285583 102.571406,14.4285583 L106.561275,14.4285583 L99.2092197,21.780669 C98.9302601,22.0596284 98.9302601,22.5118747 99.2092197,22.7908035 C99.3486535,22.9302985 99.5314551,23 99.7142874,23 C99.8970889,23 100.079891,22.9302985 100.219355,22.7907728 L107.571441,15.4387235 L107.571441,19.428589 C107.571441,19.8230423 107.891251,20.1428528 108.285705,20.1428528 C108.680189,20.1428528 109,19.8230423 109,19.428589 L109,13.7142945 C109,13.3198104 108.680189,13 108.285705,13" id="Fill-1"/>
            </g>
            </g>
            </g>
            </g>
            </g>
            </svg>
            </span>
            <span class="txt">
            Get Deal
            </span>
            </a>
            </li>`;
        }
        return str;
    }
}

function dateDiff(currDate, newlyC) {
    var diffTime = Math.abs(currDate - newlyC);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getThumbPath(str) {
    str = str.match('((https.*)\\))');
    str = !!str ? 'background-image: url(' + str[2] + ')' : '';
    return str;
}

function strLowercase(str) {
    return str.toLowerCase();
}

$(document).on('click', '.share-btn', function() {
    copyToClipboard(shareLink);
    $('.copied-txt').addClass('active');
    setTimeout(function() {
        $('.copied-txt').removeClass('active');
    }, 5000);
});

function copyToClipboard(text) {
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val(text + '?ref=share').select();
    document.execCommand('copy');
    $temp.remove();
}

$(document).on('click', '.cat', function() {
    $('.cat-list, .cat').toggleClass('active');
    var inputVal = $('.latest-deals-input');
    if (inputVal.val() !== '' || isSearchedDl) {
        inputVal.val('');
        isSearchedDl = false;
    }
    if (!checkAppliedCateg()) {
        setCategChecked();
    }
    setCategText();
    $('.categ-aply-btn').removeClass('disabled');
});

$(document).on('click', '#categ-aply-btn', function() {
    var inpVal = $('.latest-deals-input').val();
    if (inpVal !== '') {
        if (selectedCategory.length > 0) {
            showCategoryData();
        } else {
            var newData = [];
            newData = searchDataFilter(ldealsData, inpVal);
            tempDataDeals = newData;
            if (newData.length > 0) {
                var str = templateDeals(newData);
                $('.deals-list')
                    .empty()
                    .append(str);
                isSearchedDl = true;
            } else {
                noDataFound($('.deals-list'));
                setTimeout(function() {
                    $('.latest-deals-input').val('');
                    var str = templateDeals(ldealsData);
                    $('.deals-list')
                        .empty()
                        .append(str);
                    selectedCategory = categoryArr.filter(function(x) {
                        return x;
                    });
                }, 3000);
            }
        }
    } else {
        if (selectedCategory.length > 0) {
            showCategoryData();
        } else {
            var str = templateDeals(ldealsData);
            $('.deals-list')
                .empty()
                .append(str);
            selectedCategory = categoryArr.filter(function(x) {
                return x;
            });
        }
    }
    setAppliedCateg();
    setCategChecked();
    isCategApplied = true;
    $('.cat, .cat-list').removeClass('active');
    var applyData = 'Search:' + inpVal + ' :: Categ:';
    selectedCategory.map(function(categ, i) {
        if (i == selectedCategory.length - 1) applyData += categ;
        else applyData = applyData + categ + ',';
    });
    setCategText();
});

function checkAllInput() {
    $(".cat-list input[type='checkbox']").prop('checked', true);
    selectedCategory = categoryArr.filter(function(x) {
        return x;
    });
}

$(document).on('click', '#latest-deals-search-btn', function() {
    var inpVal = $('.latest-deals-input').val();
    if (inpVal !== '') {
        getFilteredData(selectedCategory)
        var newData = (tempDataDeals = searchDataFilter(tempDataDeals, inpVal));
        if (newData.length > 0) {
            var str = templateDeals(newData);
            $('.deals-list')
                .empty()
                .append(str);
            isSearchedDl = true;
        } else {
            noDataFound($('.deals-list'));
            setTimeout(function() {
                $('.latest-deals-input').val('');
                // check applied categ are not changed
                if (!checkAppliedCateg()) {
                    selectedCategory = appliedCategArr.filter(function(x) {
                        return x;
                    });
                    // set categ to checked
                    setCategChecked();
                }
                showCategoryData();
            }, 3000);
        }
    }
});

$(document).on('click', '#win-freebies-search-btn', function() {
    var inpVal = $('.win-freebies-input')
        .val()
        .trim();
    if (inpVal !== '') {
        var newData = (tempDataFb = searchDataFilter(freebiesData, inpVal));
        if (newData.length > 0) {
            var str = templateFreebies(newData);
            $('.freebies-list')
                .empty()
                .append(str);
        } else {
            noDataFound($('.freebies-list'));
            tempDataFb = [];
            setTimeout(function() {
                $('.win-freebies-input').val('');
                var str = templateFreebies(freebiesData);
                $('.freebies-list')
                    .empty()
                    .append(str);
            }, 3000);
        }
    }
});

function searchDataFilter(data, inpVal) {
    var value = inpVal.trim().toLowerCase();
    return data.filter(function(item) {
        return (
            item.category.toLowerCase().includes(value) ||
            item.url.toLowerCase().includes(value) ||
            item.title.toLowerCase().includes(value) ||
            item.description.toLowerCase().includes(value)
        );
    });
}

$('.latest-deals-input').on('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $('#latest-deals-search-btn').click();
    }
});

$('.latest-deals-input').on('blur', function(event) {
    var inpVal = $(this).val();
    if (inpVal == '') {
        getFilteredData(selectedCategory);
    }
});

$('.win-freebies-input').on('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $('#win-freebies-search-btn').click();
    }
});

$('.win-freebies-input').on('blur', function(event) {
    var inpVal = $(this).val();
    if (inpVal == '') {
        var str = templateFreebies(freebiesData);
        $('.freebies-list')
            .empty()
            .append(str);
    }
});

$(".cat-list input[type='checkbox']").on('change', function() {
    thisEle = $(this);
    if (!!thisEle.prop('checked')) {
        selectedCategory.push(thisEle.val());
    } else {
        selectedCategory = arrayRemove(selectedCategory, thisEle.val());
    }
    if (!anyCategChecked()) {
        $('.categ-aply-btn').addClass('disabled');
    } else {
        $('.categ-aply-btn').removeClass('disabled');
    }
});

function anyCategChecked() {
    var checked = false;
    $(".cat-list input[type='checkbox']").each(function(_el) {
        if ($(this).prop('checked')) {
            checked = true;
        }
    });
    return checked;
}

$('#all-c').on('change', function() {
    $(".cat-list input[type='checkbox']")
        .not(this)
        .prop('checked', this.checked);
    thisEle = $(this);
    if (!!thisEle.prop('checked')) {
        selectedCategory = categoryArr.filter(function(x) {
            return x;
        });
        $('.cat .txt').text('All Categories');
        $('.categ-aply-btn').removeClass('disabled');
    } else {
        selectedCategory = [];
        $('.categ-aply-btn').addClass('disabled');
    }
});

$('.rest-c').on('change', function() {
    if ($('.rest-c:checked').length == $('.rest-c').length) {
        $('#all-c').prop('checked', true);
        selectedCategory = categoryArr.filter(function(x) {
            return x;
        });
    } else {
        selectedCategory = arrayRemove(selectedCategory, 'All');
        $('#all-c').prop('checked', false);
    }
    setCategText();
});

function checkAppliedCateg() {
    var _check = true;
    if (appliedCategArr.length === selectedCategory.length) {
        for (var i = 0; i < appliedCategArr.length; i++) {
            if (selectedCategory[i].indexOf(appliedCategArr[i]) == -1) {
                _check = false;
                break;
            }
        }
    } else _check = false;
    return _check;
}

function setCategChecked() {
    $('.cat-list input[type="checkbox"]').prop('checked', false);
    for (var i = 0; i < appliedCategArr.length; i++) {
        $('.cat-list input[value="' + appliedCategArr[i] + '"]').prop(
            'checked',
            true
        );
    }
    if (appliedCategArr.length === categoryArr.length) {
        $('#all-c').prop('checked', true);
    }
    selectedCategory = appliedCategArr.filter(function(x) {
        return x;
    });
}

function setAppliedCateg() {
    if (selectedCategory.length > 0) {
        appliedCategArr = selectedCategory.filter(function(x) {
            return x;
        });
    } else {
        appliedCategArr = categoryArr.filter(function(x) {
            return x;
        });
    }
}

function showCategoryData() {
    showLoader();
    $('.deals-list').empty();
    $('.sort-by-dl li').removeClass('active');
    getFilteredData(selectedCategory);
}

function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    });
}

function getFilteredData(selectedCategory) {
    if (!!ldealsData) {
        var newData = [],
            str = '';
        $('.deals-list').empty();
        tempDataDeals = [];

        if (selectedCategory.includes('All') || !selectedCategory.length) {
            str = templateDeals(ldealsData);
        } else {
            for (var i = 0; i < selectedCategory.length; i++) {
                newData = filteredCatInd(ldealsData, selectedCategory[i]);
                console.log(newData);
                tempDataDeals.push(...newData);
            }
            str = templateDeals(tempDataDeals);
        }
        hideLoader();
        if (!!str) {
            $('.deals-list').append(str);
        } else $('.deals-list').html('<p class="nodata">No results found.</p>');
    }
}

function filteredCatInd(data, cat) {
    data = data.length ? data.filter(function(j, n) {
        return j.category === cat;
    }) : [];
    return data;
}

function filteredWithoutCatInd(data, cat) {
    return data.filter(function(j, n) {
        return j.category !== cat;
    });

}

$(document).on('click', '.sort-by', function() {
    if ($(this).hasClass('sort-by-fb'))
        $('.sort-list-fb').toggleClass('active');
    else $('.sort-list-dl').toggleClass('active');
});

$(document).on('click', '.sort-list-dl li', function() {
    $('.sort-list-dl li').removeClass('active');
    $(this).toggleClass('active');
    var forWhich = $(this).attr('data-val');
    var sortingData,
        str = '';
    if (forWhich == 'newlyadded') {
        sortingData = tempDataDeals.length > 0 ? tempDataDeals : ldealsData;
        sortingData = sortingData.sort(newlyCreatedSort);
    }
    if (forWhich == 'alphabetical') {
        sortingData = tempDataDeals.length > 0 ? tempDataDeals : ldealsData;
        sortingData.sort(dynamicSort('title'));
    }
    str = templateDeals(sortingData, true);
    $('.deals-list')
        .empty()
        .append(str);
    $('.sort-list-dl').removeClass('active');
});

$(document).on('click', '.sort-list-fb li', function() {
    $('.sort-list-fb li').removeClass('active');
    $(this).toggleClass('active');
    var forWhich = $(this).attr('data-val');
    var sortingData,
        str = '';
    if (forWhich == 'newlyadded') {
        sortingData = tempDataFb.length > 0 ? tempDataFb : freebiesData;
        sortingData = sortingData.sort(newlyCreatedSort);
    }
    if (forWhich == 'alphabetical') {
        sortingData = tempDataFb.length > 0 ? tempDataFb : freebiesData;
        sortingData.sort(dynamicSort('title'));
    }
    str = templateFreebies(sortingData);
    $('.freebies-list')
        .empty()
        .append(str);
    $('.sort-list-fb').removeClass('active');
});

function newlyCreatedSort(a, b) {
    return (
        new Date(b.lastUpdationDate).getTime() -
        new Date(a.lastUpdationDate).getTime()
    );
}

function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function(a, b) {
        if (sortOrder == -1) {
            return b[property].trim().localeCompare(a[property].trim());
        } else {
            return a[property].trim().localeCompare(b[property].trim());
        }
    };
}

function checkCovidText(covidCheck) {
    if (covidCheck === 'Lockdown Deals') return 'Covid Offers';
    else if (covidCheck === 'Others') return 'Other';
    return covidCheck;
}

var sorbyList = $('.sort-by-list'),
    sortWrap = $('.sort-by-wrap');
$(document).click('body', function(e) {
    if (!sortWrap.is(e.target) && sortWrap.has(e.target).length === 0) {
        sorbyList.removeClass('active');
    }
    if (
        !$('.cat-wrap').is(e.target) &&
        $('.cat-wrap').has(e.target).length === 0
    ) {
        $('.cat, .cat-list').removeClass('active');
        setCategText();
    }
});

	var acceptButton = document.getElementById('acceptTerms');
	var allowWidget = document.getElementsByClassName('allow-widget')[0];
	var acceptTerm = document.getElementsByClassName('accept-prompt')[0];

	var piiAccept = 'piiAccept';
	acceptButton.addEventListener('click', function(e) {
		// closePiiWidget();
		/* allowWidget.style.display = 'block';
        acceptTerm.style.display = 'none';
        var event = new CustomEvent('optInStatus', { detail: { status: 1 } });
        document.dispatchEvent(event);
        localStorage.setItem(piiAccept, '1');
    
        var closeEvent = new CustomEvent('closeOptInWin');
        document.dispatchEvent(closeEvent); */

		// if (localStorage.getItem("optInPageSource") == "packaged") {
		//     document.dispatchEvent(new Event('showOptInPage'));
		// } else {
		//     window.open(
		//         'https://' + specificConstants.domain + '/common/privacy_prompt_v2.html',
		//         '_blank'
		//     );
		// }
		chrome.runtime.sendMessage({task: 'showOptInPage'});
	});

	document.getElementById('denytTerms').addEventListener('click', function(e) {
		closePiiWidget();
		//$('.link_1').removeClass('activeLink');
		/* try {
            var link1 = document.getElementsByClassName("link_1");
            link1[0].classList.remove("activeLink");
            var link2 = document.getElementsByClassName("directions-popup");
            link2[0].style.display = "none";
        } catch (e) {

        } */
		/* setTimeout(function () {
            var closeEvent = new CustomEvent('closeOptInWin');
            document.dispatchEvent(closeEvent);
        }, 1000); */
	});
	document.addEventListener('DOMContentLoaded', function() {
	    storageReplacer.init().then( function () {
            allowWidget.style.display = 'none';
            checkPiiStored();
            updateCurrentDateTime2();
            onloadActivity();
        });
	});

	// window.addEventListener('storage', function(e) {
	// 	if (e.key == 'piiAccept' && e.newValue == '1') {
	// 		allowWidget.style.display = 'block';
	// 		acceptTerm.style.display = 'none';
    //
	// 		document.dispatchEvent(new CustomEvent('PiiAccept', { detail: true }));
	// 	} else if (e.key == 'piiAccept' && e.newValue == '-1') {
	// 		allowWidget.style.display = 'none';
	// 		acceptTerm.style.display = 'block';
    //
	// 		document.dispatchEvent(new CustomEvent('PiiAccept', { detail: false }));
	// 	}
	// });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (key === 'piiAccept' && newValue === '1') {
                allowWidget.style.display = 'block';
                acceptTerm.style.display = 'none';

                document.dispatchEvent(new CustomEvent('PiiAccept', {detail: true}));

            } else if (key === 'piiAccept' && newValue === '-1') {
                allowWidget.style.display = 'none';
                acceptTerm.style.display = 'block';

                document.dispatchEvent(new CustomEvent('PiiAccept', {detail: false}));
            }
        }
    });
	var widgetElement1 = document.getElementsByClassName('link-out')[0];
var widgetElement2 = document.getElementsByClassName('link-out')[1];

	widgetElement1.addEventListener('click', function(e) {
		checkPiiStored();
	});
widgetElement2.addEventListener('click', function(e) {
    checkPiiStored();
});

	function checkPiiStored() {
        var accepted = storageReplacer.getLocalStorageItem('piiAccept');
		if (accepted && accepted == 1) {
			allowWidget.style.display = 'block';
			acceptTerm.style.display = 'none';

			document.dispatchEvent(new CustomEvent('PiiAccept', { detail: true }));
		} else if (!accepted || accepted == -1) {
			allowWidget.style.display = 'none';
			acceptTerm.style.display = 'block';

			document.dispatchEvent(new CustomEvent('PiiAccept', { detail: false }));
		}
	}
	function closePiiWidget() {
		try {
			document.dispatchEvent(
				new CustomEvent('PiiAccept', { detail: 'cancel' })
			);
            closeWidget();
            widgetParams.widgetOpen = false;


			// var link1 = document.getElementsByClassName('link_1');
			// var link3 = document.getElementsByClassName('customPop-firefox');
			// var link2 = document.getElementsByClassName('directions-popup');
			// if (link1[0] && link1[0].classList.contains('activeLink')) {
			// 	link1[0].classList.remove('activeLink');
			// } else if (link1[0] && link1[0].classList.contains('active_link')) {
			// 	link1[0].classList.remove('active_link');
			// } else if (link1[0] && link1[0].classList.contains('active')) {
			// 	link1[0].classList.remove('active');
			// }
			// if (link2[0]) {
			// 	if (link2[0].classList.contains('active')) {
			// 		link2[0].classList.remove('active');
			// 	} else {
			// 		link2[0].style.display = 'none';
			// 	}
			// }

			// if (link3[0] && link3[0].classList.contains('logo-toggle')) {
			// 	link3[0].classList.remove('__show');
			// }
		} catch (e) {
			console.log(e);
		}
	}