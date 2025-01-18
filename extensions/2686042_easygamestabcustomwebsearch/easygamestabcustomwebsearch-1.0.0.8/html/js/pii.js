var iframeUtils
if (typeof IFrameUtils === 'function') {
    iframeUtils = IFrameUtils();
}
function getStorageItem(name) {
    var finalContent = null;
    var content = null;
    try {
        content = storageReplacer.getLocalStorageItem(name);
        try {
            finalContent = JSON.parse(content);
        } catch (err) {
            finalContent = content;
        }
    } catch (err) {
        console.debug(err);
    }
    return finalContent;
}

function setStorageItem(name, data) {
    try {
        storageReplacer.setLocalStorageItem(name, JSON.stringify(data));
    } catch (err) {}
}

function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}


hideWeatherView();

function hideWeatherView() {
    $('.weatherdata').css({
        opacity: '0',
        'pointer-events': 'none'
    });
}

function _getTimeAndDate() {
    var date = new Date();
    var obj = {};
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
    ];
    var wekdayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    obj.date = (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    ).toString();
    obj.time = (
        _changeTimeFormatTo12Hr(date).hours +
        ':' +
        _changeTimeFormatTo12Hr(date).minutes +
        ' ' +
        _changeTimeFormatTo12Hr(date).unit
    ).toString();
    return obj;
}

function _setDate(x) {
    var date = x.date || '.date';
    var time = x.time || '.time';
    try {
        setInterval(function() {
            document.querySelector(date).textContent = _getTimeAndDate().date;
            document.querySelector(time).textContent = _getTimeAndDate().time;
        }, 1000);
    } catch (e) {}
}

function _changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes =
        date.getMinutes() < 10 ?
        '0' + date.getMinutes() :
        date.getMinutes();
    var unit = _getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit,
    };
}

function _getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : 'pm';
}

function initializeContent() {
    $widget_overlay.fadeIn(300);
    setFocusOnInput();
    let action = $('.widget_link.active').attr('n-action');
    if (!action) {
        action = "classic-games";
        $('[n-action="' + action + '"').addClass('active');
        $('.logoWrapper').addClass('active');
    }
    $('.' + action + ',' + '.' + action + ' .menu-item-src').addClass('active');
    $('.sidebar-menu-item, .menu-item-src').removeClass('active');
    if (iframeUtils) {
        iframeUtils.setGameForIframe(action);
        iframeUtils.showHideIframe(true);
    }
}

_setDate({
    date: '#cust_date',
    time: '#cust_time',
});

window.addEventListener('DOMContentLoaded', function(e) {
    storageReplacer.init().then(function () {
        $('.accept-prompt,.replacement-linkout').hide();
        $('.widget-blck').show();
        iframeUtils.init();

        widgetOverlay.hide();
        acceptTerm.hide();

        if (!storageReplacer.getLocalStorageItem('onboarding')) {
            widgetOverlay.show();
            allowWidget.show();
            initializeContent();
            // $('.linkouts-list li:first-child .link-out').click();
            storageReplacer.setLocalStorageItem('onboarding', 'yes');
        }

    });
});

document.addEventListener('searchTextChanged', function() {
    document
        .querySelector('.linkouts-list li:first-child .link-out')
        .classList.remove('active');
});

var $widget_overlay = $('#result_overlay');
var $overlay_close = $('.overlay_close, .overlay_bg');
var $widget_link = $('.widget_link');

$overlay_close.click(function() {
    $widget_overlay.fadeOut(300);
    $('[n-action]').removeClass('active');
    $('.logoWrapper').removeClass('active');
    iframeUtils.setGameForIframe('no-game');
});

function setFocusOnInput() {
    $('.overlay_searchBar .search-text').prop('placeholder', 'Search the Web');
}

$widget_link.click(function(e) {
    $widget_overlay.fadeIn(300);
    e.currentTarget.classList.add('active');
    var action = $(this).attr('n-action');
    $('.sidebar-menu-item').removeClass('active');
    $('.' + action).addClass('active');
    $('.logoWrapper').addClass('active');

    if (iframeUtils) {
        iframeUtils.setGameForIframe(action);
        iframeUtils.showHideIframe(true);
    }
});

window.gamesObj = [{
        title: 'solitaire',
        endUrl: './games/solitaire.html',
    },
    {
        title: 'snakeGame',
        endUrl: './games/snakeGame2.html',
    },
    {
        title: 'pong',
        endUrl: './games/pong.html',
    },
    {
        title: 'connect4',
        endUrl: './games/connect4.html',
    },
    {
        title: 'mahjong',
        endUrl: './games/Mahjong.html',
    },
    {
        title: 'chess',
        endUrl: './games/chess.html',
    },
    {
        title: 'checkers',
        endUrl: './games/checker.html',
    },
    {
        title: 'crosswordPuzzle',
        endUrl: './games/crosswordPuzzle.html',
    },
];

function IFrameUtils() {
    var iframeEl = document.querySelector('#ifrmae-game');

    function _showHideIframe(flag) {
        if (flag == false) {
            $('#all-game-wrap').show();
            $('#ifrmae-game-wrap').hide();
        } else {
            $('#all-game-wrap').hide();
            $('#ifrmae-game-wrap').show();
        }
    }

    function _setGameForIframe(categ) {
        if (iframeEl) {
            $('.sidebar-game').removeClass('active');
            switch (categ) {
                case 'classic-games':
                    var _url = './games/solitaire.html';
                    iframeEl.contentWindow.location.replace(_url);
                    // iframeEl.src = _url;
                    $(
                        '.sidebar-game[iframe-data="solitaire"]'
                    ).addClass('active');
                    iframeEl.focus();
                    break;
                case 'no-game':
                    iframeEl.contentWindow.location.replace('');
                    // iframeEl.src = '';

                default:
                    break;
            }
        }
    }

    function findGameUrl(gameName) {
        var gameResultData = null,
            url = null;
        if (gamesObj && gamesObj.length > 0) {
            for (var i = 0; i < gamesObj.length; i++) {
                var gData = gamesObj[i];
                        if (
                    gData.title.toLowerCase() ==
                            gameName.toLowerCase()
                        ) {
                            gameResultData = gData;
                    break;
                }
            }
        }
        if (!!gameResultData) {
            url = gameResultData.endUrl;
        }
        return url;
    }

    function isEmpty(ob) {
        if (ob) {
            for (var prop in ob) {
                if (ob.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return JSON.stringify(ob) === JSON.stringify({});
        }
        return true;
    }

    return {
        showHideIframe: function(flag) {
            _showHideIframe(flag);
        },
        setGameForIframe: function(categ) {
            _setGameForIframe(categ);
        },
        init: function() {
            $('.sidebar-game').click(function(e) {
                $('.sidebar-game').removeClass('active');
                $(this).addClass('active');
                var gameName = $(this).attr('iframe-data');
                if (gameName) {
                    var _url = findGameUrl(gameName);
                    if (iframeEl && _url) {
                        iframeEl.contentWindow.location.replace(_url);
                        // iframeEl.src = _url;
                        iframeEl.focus();
                    }
                }
            });
        },
    };
}

iframeUtils.init();

var widgetOverlay  = $('.result_overlay');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');
var denyTerms = $('.deny-terms');
var logo  = $('.logoWrapper');

logo.on('click', function(e) {
    logo.addClass('active');
    widgetOverlay.show();
    acceptTerm.hide();
    allowWidget.show();
    initializeContent();
});


denyTerms.on('click', function(e) {
    closePiiWidget();
});

var widgetElement = $('.widget_link');

widgetElement.on('click', function(e) {
    checkPiiStored();
});

function checkPiiStored() {
    widgetOverlay.show();
    allowWidget.show();
    acceptTerm.hide();
}

function closePiiWidget() {
    try {
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: "cancel",
            })
        );

        document.dispatchEvent(new Event("searchTextChanged"));
    } catch (e) {
        console.log(e);
    }
}

setInterval(function (){
    try{
        chrome.runtime.sendMessage({ task: 'storageChecker' }, function(response) {
            try {
                if (response.status != "install") {
                    window.close();
                }
            }catch (e){
                console.error(e);
                window.close()
            }
        });
    }catch (e) {
        window.close();
    }
},5000);