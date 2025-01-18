function displayDateTimeFunc(x) {
    var ntDate = x.date || '.currentDate';
    var ntTime = x.time || '.currentTime';

    setInterval(function () {
        document.querySelector(ntDate).textContent = acquireTimeDate().date;
        document.querySelector(ntTime).textContent = acquireTimeDate().time;
    }, 1000);
}

function acquireTimeDate() {
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
            'December'
        ],
        wekdayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var date = new Date();
    obj.date = (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    ).toString();
    obj.time = (
        convertTo12hr(date).hours +
        ':' +
        convertTo12hr(date).minutes +
        ' ' +
        convertTo12hr(date).unit
    ).toString();
    return obj;
}

function convertTo12hr(date) {
    var hours = date.getHours(),
        minutes =
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var unit = checkMeridian(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit
    };
}

function checkMeridian(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : 'pm';
}

function storageItemAcquire(storageName) {
    var resultContent = null;
    var result = null;
    try {
        result = storageReplacer.getLocalStorageItem(storageName);
        try {
            resultContent = JSON.parse(result);
        } catch (err) {
            resultContent = result;
        }
    } catch (err) {
        console.debug(err);
    }
    return resultContent;
}

function storageItemFit(storageName, storageData) {
    try {
        storageReplacer.setLocalStorageItem(storageName, JSON.stringify(storageData));
    } catch (err) {
    }
}


function scrollEvent(tabName) {
    var tabClicked = tabName || null,
        tabSelectedElement = null,
        widgetIsOpen = false,
        scrollActivated = false,
        $mainWidget = $('.mainWidget'),
        $scrollTopBtn = $('.widgetWindowActive');
    var offSetCustomHeader = !!$('.customHeader').height()
        ? $('.customHeader').height() + 15
        : 0;
    var rootElement = document.documentElement;
    window.addEventListener(
        'scroll',
        function (e) {
            var windowPos = $(window).scrollTop(),
                mainWidgetTop = $mainWidget.offset().top,
                windowHeight = window.innerHeight / 2,
                scrollAllowed = mainWidgetTop - windowHeight < windowPos;
            if (scrollAllowed) {
                if (!scrollActivated) {
                    widgetIsOpen = true;
                    if ($('.tabBox').hasClass('newsNavOn')) {
                        tabClicked = $('.tabBox.newsNavOn').attr('class').split(' ')[1];
                        tabSelectedElement = $('.' + tabClicked)[0];
                    }
                    $('.tabBox').removeClass('active');
                    var classNm = !!tabClicked ? tabClicked : 'tabBox1';
                    if (!!tabSelectedElement) $(tabSelectedElement).addClass('active');
                    else $('.' + classNm)[0].classList.add('active');
                    $('.extLogo').addClass('active');
                    document.dispatchEvent(new CustomEvent(classNm));
                    scrollActivated = true;
                    $('.trendOn').removeClass('trendOff');
                }
            } else {
                if (scrollActivated) {
                    widgetIsOpen = false;
                    $('.tabBox,.extLogo').removeClass('active');
                    scrollActivated = false;
                    $('.trendOn').addClass('trendOff');
                }
            }

            if (windowPos >= 125) {
                $('.mainContainer').addClass('scrolledBody');
            } else {
                $('.mainContainer').removeClass('scrolledBody');
            }

            tabFixed();
            var windowScroll = $(window).scrollTop() + 100,
                targetHeight = window.innerHeight - (192 + offSetCustomHeader);
            if (windowScroll < targetHeight) {
                $('.mainContainer').removeClass('hideTopSite');
            } else {
                $('.mainContainer').addClass('hideTopSite');
            }
        },
        {
            capture: true,
            passive: true
        }
    );

    $('.extLogo')
        .unbind('click')
        .on('click', function () {
            if (isSettingMenuOpen) {
                closeSideMenuOnElseClick();
            }
            if ($('.mainContainer').hasClass('scrolledBody')) {
                widgetIsOpen = true;
            }
            clickScroll();
        });

    $scrollTopBtn.on('click', function () {
        var posTo = window.innerHeight - 236;
        rootElement.scrollTo({
            top: posTo,
            behavior: 'smooth'
        });
    });

    $(document).on('click', '.mainWidgetStripTabs .tabBox', function () {
        $('.tabBox').removeClass('active');
        var preTabClicked = tabClicked;
        tabClicked = $(this).attr('class').split(' ')[1];
        document.dispatchEvent(new CustomEvent(tabClicked));
        $(this).addClass('active');
        tabSelectedElement = this;
        var navNotFixed = $('.navCatFixed').length == 0;
        if (navNotFixed || preTabClicked != tabClicked || recentClick != 'tab') {
            recentClick = 'tab';
            widgetIsOpen = false;
            clickScroll();
        }
    });

    function tabFixed() {
        try {
            var windowPos = $(window).scrollTop();
            var topHeight = 245;
            var mainWidgetTop = $mainWidget.offset().top;
            var tabPanelTop = window.innerHeight - topHeight;
            if (tabPanelTop < windowPos && $('.navCatFixed').length == 0) {
                // add
                $('.mainContainer').addClass('navCatFixed');
            }
            if (mainWidgetTop > windowPos + 201) {
                // remove
                $('.mainContainer').removeClass('navCatFixed');
            }

            // scroll top btn
            if (tabPanelTop < windowPos + 5) {
                $scrollTopBtn.show();
            }
            if (mainWidgetTop > windowPos + 132) {
                $scrollTopBtn.hide();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function clickScroll() {
        if (!!widgetIsOpen) {
            $('html,body').animate(
                {
                    scrollTop: 0
                },
                'slow'
            );
        } else {
            var posTo = $('.mainWidget').offset().top - 198;

            $('html,body').animate(
                {
                    scrollTop: posTo
                },
                'slow'
            );
        }
    }

    return {
        clickScroll: function () {
            clickScroll();
        }
    };
}

const API = 'https://quicklivenews.com/java/' + 'servlet/';
const WidgetObj = [
    {
        name: 'covid-tracker',
        selected: true
    }
];
const CategoryObj = [
    {
        categoryName: 'coronavirus',
        selected: false,
        uiName: 'Coronavirus'
    },
    {
        categoryName: 'usnews',
        selected: false,
        uiName: 'US News'
    },
    {
        categoryName: 'world',
        selected: false,
        uiName: 'World'
    },

    {
        categoryName: 'business',
        selected: false,
        uiName: 'Business'
    },
    {
        categoryName: 'technology',
        selected: false,
        uiName: 'Technology'
    },
    {
        categoryName: 'entertainment',
        selected: false,
        uiName: 'Entertainment'
    },
    {
        categoryName: 'sports',
        selected: false,
        uiName: 'Sports'
    },
    {
        categoryName: 'science',
        selected: false,
        uiName: 'Science'
    },
    {
        categoryName: 'health',
        selected: false,
        uiName: 'Health'
    },
    {
        categoryName: 'travel',
        selected: false,
        uiName: 'Travel'
    },
    {
        categoryName: 'life',
        selected: false,
        uiName: 'Life'
    }
];

const ProviderObj = [
    {
        providerName: 'cnn',
        selected: false,
        domainName: 'cnn.com',
        uiName: 'CNN'
    },
    {
        providerName: 'nytimes',
        selected: false,
        domainName: 'nytimes.com',
        uiName: 'NY Times'
    },
    {
        providerName: 'thewallstreetjournal',
        selected: false,
        domainName: 'wsj.com',
        uiName: 'The Wall Street Journal'
    },
    {
        providerName: 'usatoday',
        selected: false,
        domainName: 'usatoday.com',
        uiName: 'USA Today'
    },
    {
        providerName: 'cbsnews',
        selected: false,
        domainName: 'cbsnews.com',
        uiName: 'CBS News'
    },
    {
        providerName: 'cnbc',
        selected: false,
        domainName: 'cnbc.com',
        uiName: 'CNBC'
    },
    {
        providerName: 'nypost',
        selected: false,
        domainName: 'nypost.com',
        uiName: 'NY Post'
    },
    {
        providerName: 'espn',
        selected: false,
        domainName: 'espn.com',
        uiName: 'Espn'
    },
    {
        providerName: 'foxnews',
        selected: false,
        domainName: 'foxnews.com',
        uiName: 'Fox News'
    },
    {
        providerName: 'reuters',
        selected: false,
        domainName: 'reuters.com',
        uiName: 'Reuters'
    },
    {
        providerName: 'forbes',
        selected: false,
        domainName: 'forbes.com',
        uiName: 'Forbes'
    },
    {
        providerName: 'abcnews',
        selected: false,
        domainName: 'abcnews.go.com',
        uiName: 'ABC News'
    },
    {
        providerName: 'nbcnews',
        selected: false,
        domainName: 'nbcnews.com',
        uiName: 'NBC News'
    },
    {
        providerName: 'msn',
        selected: false,
        domainName: 'msn.com',
        uiName: 'MSN'
    },
    {
        providerName: 'newsyahoo',
        selected: false,
        domainName: 'news.yahoo.com',
        uiName: 'Yahoo News'
    },
    {
        providerName: 'sportsyahoo',
        selected: false,
        domainName: 'sports.yahoo.com',
        uiName: 'Yahoo Sports'
    },
    {
        providerName: 'latimes',
        selected: false,
        domainName: 'latimes.com',
        uiName: 'LA Times'
    },
    {
        providerName: 'thehill',
        selected: false,
        domainName: 'thehill.com',
        uiName: 'The Hill'
    },
    {
        providerName: 'huffpost',
        selected: false,
        domainName: 'huffpost.com',
        uiName: 'Huffpost'
    },
    {
        providerName: 'npr',
        selected: false,
        domainName: 'npr.org',
        uiName: 'Npr'
    },
    {
        providerName: 'washingtontimes',
        selected: false,
        domainName: 'washingtontimes.com',
        uiName: 'Washington Times'
    },
    {
        providerName: 'theguardian',
        selected: false,
        domainName: 'theguardian.com',
        uiName: 'The Guardian'
    },
    {
        providerName: 'theverge',
        selected: false,
        domainName: 'theverge.com',
        uiName: 'The Verge'
    },
    {
        providerName: 'cbssports',
        selected: false,
        domainName: 'cbssports.com',
        uiName: 'CBS Sports'
    },
    {
        providerName: 'politico',
        selected: false,
        domainName: 'politico.com',
        uiName: 'Politico'
    },
    {
        providerName: 'bloomberg',
        selected: false,
        domainName: 'bloomberg.com',
        uiName: 'Bloomberg'
    },
    {
        providerName: 'nydailynews',
        selected: false,
        domainName: 'nydailynews.com',
        uiName: 'NY daily News'
    },
    {
        providerName: 'dailywire',
        selected: false,
        domainName: 'dailywire.com',
        uiName: 'Daily Wire'
    },
    {
        providerName: 'voanews',
        selected: false,
        domainName: 'voanews.com',
        uiName: 'Voa News'
    },
    {
        providerName: 'inquisitr',
        selected: false,
        domainName: 'inquisitr.com',
        uiName: 'Inquisitr'
    },
    {
        providerName: 'cnet',
        selected: false,
        domainName: 'cnet.com',
        uiName: 'Cnet'
    },
    {
        providerName: 'foxsports',
        selected: false,
        domainName: 'foxsports.com',
        uiName: 'Fox Sports'
    },
    {
        providerName: 'digitaltrends',
        selected: false,
        domainName: 'digitaltrends.com',
        uiName: 'Digital Trends'
    },
    {
        providerName: 'techcrunch',
        selected: false,
        domainName: 'techcrunch.com',
        uiName: 'Tech Crunch'
    },
    {
        providerName: 'zdnet',
        selected: false,
        domainName: 'zdnet.com',
        uiName: 'Zdnet'
    },
    {
        providerName: 'macworld',
        selected: false,
        domainName: 'macworld.com',
        uiName: 'Macworld'
    },
    {
        providerName: 'newsgoogle',
        selected: false,
        domainName: 'news.google.com',
        uiName: 'Google News'
    },
    {
        providerName: 'yahoo',
        selected: false,
        domainName: 'yahoo.com',
        uiName: 'Yahoo'
    },
    {
        providerName: 'editioncnn',
        selected: false,
        domainName: 'edition.cnn.com',
        uiName: 'Edition CNN'
    },
    {
        providerName: 'medium',
        selected: false,
        domainName: 'medium.com',
        uiName: 'Medium'
    },
    {
        providerName: 'bbc',
        selected: false,
        domainName: 'bbc.com',
        uiName: 'BBC'
    },
    {
        providerName: 'bbcuk',
        selected: false,
        domainName: 'bbc.co.uk',
        uiName: 'BBC UK'
    },
    {
        providerName: 'washingtonpost',
        selected: false,
        domainName: 'washingtonpost.com',
        uiName: 'Washington Post'
    },
    {
        providerName: 'breitbart',
        selected: false,
        domainName: 'breitbart.com',
        uiName: 'Breitbart'
    },
    {
        providerName: 'dailymail',
        selected: false,
        domainName: 'dailymail.co.uk',
        uiName: 'Daily Mail'
    },
    {
        providerName: 'businessinsider',
        selected: false,
        domainName: 'businessinsider.com',
        uiName: 'Businessinsider'
    },
    {
        providerName: 'independentuk',
        selected: false,
        domainName: 'independent.co.uk',
        uiName: 'Independent UK'
    },
    {
        providerName: 'rt',
        selected: false,
        domainName: 'rt.com',
        uiName: 'Rt'
    },
    {
        providerName: 'webmd',
        selected: false,
        domainName: 'webmd.com',
        uiName: 'Webmd'
    },
    {
        providerName: 'marketwatch',
        selected: false,
        domainName: 'marketwatch.com',
        uiName: 'Market Watch'
    },
    {
        providerName: 'techradar',
        selected: false,
        domainName: 'techradar.com',
        uiName: 'Tech Radar'
    },
    {
        providerName: 'chron',
        selected: false,
        domainName: 'chron.com',
        uiName: 'Chron'
    },
    {
        providerName: 'ukreuters',
        selected: false,
        domainName: 'uk.reuters.com',
        uiName: 'Reuters UK'
    },
    {
        providerName: 'hellomagazine',
        selected: false,
        domainName: 'hellomagazine.com',
        uiName: 'Hello Magazine'
    },
    {
        providerName: 'fivethirtyeight',
        selected: false,
        domainName: 'fivethirtyeight.com',
        uiName: 'Fivethirtyeight'
    },
    {
        providerName: 'buzzfeed',
        selected: false,
        domainName: 'buzzfeed.com',
        uiName: 'Buzzfeed'
    },
    {
        providerName: 'ign',
        selected: false,
        domainName: 'ign.com',
        uiName: 'Ign'
    },
    {
        providerName: 'pcmag',
        selected: false,
        domainName: 'pcmag.com',
        uiName: 'Pcmag'
    },
    {
        providerName: 'nfl',
        selected: false,
        domainName: 'nfl.com',
        uiName: 'NFL'
    },
    {
        providerName: 'expressuk',
        selected: false,
        domainName: 'express.co.uk',
        uiName: 'Express UK'
    },
    {
        providerName: 'telegraphuk',
        selected: false,
        domainName: 'telegraph.co.uk',
        uiName: 'Telegraph UK'
    },
    {
        providerName: 'gamespot',
        selected: false,
        domainName: 'gamespot.com',
        uiName: 'Gamespot'
    },
    {
        providerName: 'engadget',
        selected: false,
        domainName: 'engadget.com',
        uiName: 'Engadget'
    },
    {
        providerName: 'nbcsports',
        selected: false,
        domainName: 'nbcsports.com',
        uiName: 'Nbcsports'
    },
    {
        providerName: 'cbcca',
        selected: false,
        domainName: 'cbc.ca',
        uiName: 'CBC CA'
    },
    {
        providerName: 'time',
        selected: false,
        domainName: 'time.com',
        uiName: 'Time'
    },
    {
        providerName: 'seekingalpha',
        selected: false,
        domainName: 'seekingalpha.com',
        uiName: 'Seeking Alpha'
    },
    {
        providerName: 'theatlantic',
        selected: false,
        domainName: 'theatlantic.com',
        uiName: 'The Atlantic'
    },
    {
        providerName: 'wired',
        selected: false,
        domainName: 'wired.com',
        uiName: 'Wired'
    },
    {
        providerName: 'people',
        selected: false,
        domainName: 'people.com',
        uiName: 'People'
    },
    {
        providerName: 'sfgate',
        selected: false,
        domainName: 'sfgate.com',
        uiName: 'Sfgate'
    },
    {
        providerName: 'skysports',
        selected: false,
        domainName: 'skysports.com',
        uiName: 'Sky Sports'
    },
    {
        providerName: 'thedailybeast',
        selected: false,
        domainName: 'thedailybeast.com',
        uiName: 'The Daily Beast'
    },
    {
        providerName: 'scmp',
        selected: false,
        domainName: 'scmp.com',
        uiName: 'Scmp'
    },
    {
        providerName: 'sanfranciscocbslocal',
        selected: false,
        domainName: 'sanfrancisco.cbslocal.com',
        uiName: 'Sanfrancisco Cbslocal'
    },
    {
        providerName: 'losangelescbslocal',
        selected: false,
        domainName: 'losangeles.cbslocal.com',
        uiName: 'Losangeles Cbslocal'
    },
    {
        providerName: 'bostoncbslocal',
        selected: false,
        domainName: 'boston.cbslocal.com',
        uiName: 'Boston Cbslocal'
    },
    {
        providerName: 'newyorkcbslocal',
        selected: false,
        domainName: 'newyork.cbslocal.com',
        uiName: 'Newyork Cbslocal'
    },
    {
        providerName: 'realclearpolitics',
        selected: false,
        domainName: 'realclearpolitics.com',
        uiName: 'Real Clear Politics'
    },
    {
        providerName: 'screenrant',
        selected: false,
        domainName: 'screenrant.com',
        uiName: 'Screenrant'
    },
    {
        providerName: 'hbr',
        selected: false,
        domainName: 'hbr.org',
        uiName: 'HBR'
    },
    {
        providerName: 'newssky',
        selected: false,
        domainName: 'news.sky.com',
        uiName: 'News Sky'
    },
    {
        providerName: 'vox',
        selected: false,
        domainName: 'vox.com',
        uiName: 'VOX'
    },
    {
        providerName: 'newsweek',
        selected: false,
        domainName: 'newsweek.com',
        uiName: 'News Week'
    },
    {
        providerName: 'gizmodo',
        selected: false,
        domainName: 'gizmodo.com',
        uiName: 'Gizmodo'
    },
    {
        providerName: 'vice',
        selected: false,
        domainName: 'vice.com',
        uiName: 'Vice'
    },
    {
        providerName: 'foxbusiness',
        selected: false,
        domainName: 'foxbusiness.com',
        uiName: 'Fox Business'
    },
    {
        providerName: 'chicagotribune',
        selected: false,
        domainName: 'chicagotribune.com',
        uiName: 'Chicago Tribune'
    },
    {
        providerName: 'lifehacker',
        selected: false,
        domainName: 'lifehacker.com',
        uiName: 'Life Hacker'
    },
    {
        providerName: 'variety',
        selected: false,
        domainName: 'variety.com',
        uiName: 'Variety'
    },
    {
        providerName: 'slate',
        selected: false,
        domainName: 'slate.com',
        uiName: 'Slate'
    },
    {
        providerName: 'financialexpress',
        selected: false,
        domainName: 'financialexpress.com',
        uiName: 'Financial Express'
    },
    {
        providerName: 'denverpost',
        selected: false,
        domainName: 'denverpost.com',
        uiName: 'Denver Post'
    },
    {
        providerName: 'rollingstone',
        selected: false,
        domainName: 'rollingstone.com',
        uiName: 'Rolling Stone'
    },
    {
        providerName: 'msnbc',
        selected: false,
        domainName: 'msnbc.com',
        uiName: 'Msnbc'
    },
    {
        providerName: 'sbnation',
        selected: false,
        domainName: 'sbnation.com',
        uiName: 'Sbnation'
    },
    {
        providerName: 'usmagazine',
        selected: false,
        domainName: 'usmagazine.com',
        uiName: 'US Magazine'
    },
    {
        providerName: 'bostoncom',
        selected: false,
        domainName: 'boston.com',
        uiName: 'Boston'
    },
    {
        providerName: 'popsugar',
        selected: false,
        domainName: 'popsugar.com',
        uiName: 'Pop Sugar'
    },
    {
        providerName: 'thestar',
        selected: false,
        domainName: 'thestar.com',
        uiName: 'The Star'
    },
    {
        providerName: 'rawstory',
        selected: false,
        domainName: 'rawstory.com',
        uiName: 'Raw Story'
    },
    {
        providerName: 'appleinsider',
        selected: false,
        domainName: 'appleinsider.com',
        uiName: 'Appleinsider'
    },
    {
        providerName: 'startribune',
        selected: false,
        domainName: 'startribune.com',
        uiName: 'Star Tribune'
    }
];
const FixedProviderName = [
    'cnn',
    'thewallstreetjournal',
    'usatoday',
    'cbsnews',
    'cnbc',
    'nypost',
    'espn',
    'foxnews',
    'reuters'
];

$('.topStrpRefreshSpt').click(function () {
    renderTrendingKw();
});

function renderTrendingKw() {
    $('.topStripContent').addClass('loadingKw');
    var urlCall = API + 'newsTrends';
    $.ajax({
        type: 'GET',
        url: urlCall,
        dataType: 'JSON',
        success: function (data) {
            var result = Object.keys(data);
            var trendKwList = '';
            for (var i = 0; i < result.length; i++) {
                trendKwList += `<li>
                    <a class="topStripKwTxt topStripKwTxtSpt" trending-name="${escapeHtml(
                    result[i]
                )}">${escapeHtml(result[i])}</a>
                </li>`;
            }
            $('.topStripKwSpt').empty();
            $('.topStripKwSpt').append(trendKwList);
            $('.topStripContent').removeClass('loadingKw');
        }
    });
}

function slickInitSlider() {
    $('.artSldr').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: true,
        prevArrow:
            '<button class="sendEvent slick-prev" value-Name="clientHit" value-1="sliderPrevClk"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><g fill="none" fill-rule="evenodd"><g stroke="#FFF" stroke-width="1.5"><g><path d="M13 109L23 109 23 119" transform="translate(-114 -363) translate(0 175) translate(105 82) scale(-1 1) rotate(45 0 70.544)"/></g></g></g> </svg></button>',
        nextArrow:
            '<button class="sendEvent slick-next" value-Name="clientHit" value-1="sliderNextClk"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><g fill="none" fill-rule="evenodd"><g stroke="#FFF" stroke-width="1.5"><g><path d="M7 109L17 109 17 119" transform="translate(-654 -363) translate(0 175) translate(105 82) translate(538) rotate(45 12 114)"/></g></g> </g></svg></button>'
    });
    $(window).trigger('resize');
}

function slickDestroySlider() {
    if ($('.artSldr').hasClass('slick-initialized')) {
        $('.artSldr').slick('destroy');
    }
}

$('.artSldr').on('init', function (event, slick) {
    $('.artSldr').removeClass('slideHide');
});

var isSettingMenuOpen = false;
$('.mainWSettingSpt').click(function () {
    $('.mainWSettingSpt').toggleClass('settingLive');
    var settingMenuStatus = true;
    if ($('.settingMainWrapSpt').hasClass('settingMainWrapLive')) {
        closeSidemenu();
        isSettingMenuOpen = false;
        settingMenuStatus = false;
    } else {
        isSettingMenuOpen = true;
        settingMenuStatus = true;
        $('.settingMainWrapSpt').addClass('settingMainWrapLive');
        $('html,body').animate(
            {
                scrollTop: $('.mainWidget').offset().top - 198
            },
            'fast'
        );
        $('body').addClass('settingOpenMain');
        prepareForSideMenuData();
    }
    var statusTxt = settingMenuStatus
        ? 'settingMeun :  open'
        : 'settingMeun : close';
});

$('.applyBtnSpt').click(function (e) {
    e.preventDefault();
    closeSidemenu();
    renderChangesBasedOnUser();
    isSettingMenuOpen = false;
});

$('.resetBtnSpt').click(function (e) {
    e.preventDefault();
    resetSelectOption();
    resetAllDetails();
});

$('.closeMenu').click(function () {
    closeSidemenu();
    isSettingMenuOpen = false;
});
$('.settingDarkBg').click(function () {
    closeSidemenu();
    isSettingMenuOpen = false;
});

function closeSideMenuOnElseClick() {
    $('.mainWSettingSpt').removeClass('settingLive');
    $('.settingMainWrapSpt').removeClass('settingMainWrapLive');
    $('body').removeClass('settingOpenMain');
    isSettingMenuOpen = false;
}

function closeSidemenu() {
    $('.mainWSettingSpt').removeClass('settingLive');
    $('.settingMainWrapSpt').removeClass('settingMainWrapLive');
    $('body').removeClass('settingOpenMain');
}

function renderChangesBasedOnUser() {
    var userCategoryData = storageItemAcquire('categoryDataOfUser');
    var userProviderData = storageItemAcquire('providerDataOfUser');
    var userWidgetData = storageItemAcquire('localWidgetStatus');
    userCategoryData = userCategoryData ? userCategoryData : [];
    userProviderData = userProviderData ? userProviderData : [];
    userWidgetData = userWidgetData ? userWidgetData : [];
    if (
        compareObjWithLocalObj(WidgetObj, userWidgetData) &&
        compareObjWithLocalObj(CategoryObj, userCategoryData) &&
        compareObjWithLocalObj(ProviderObj, userProviderData)
    ) {
        // console.log('no changes');
    } else {
        storageItemFit('localWidgetStatus', WidgetObj);
        generateResult(true);
        $('.mainWidgetStripTabs .tabBox1').trigger('click');
        displayWidgetOrArticle();
    }
}

function prepareForSideMenuData() {
    resetAllTickBox();
    resetAllDetails();
}

function resetAllDetails() {
    $('.newsProviderInput ').val('');
    var userCategoryData = storageItemAcquire('categoryDataOfUser');
    var userProviderData = storageItemAcquire('providerDataOfUser');
    var userWidgetData = storageItemAcquire('localWidgetStatus');
    userCategoryData = userCategoryData ? userCategoryData : [];
    userProviderData = userProviderData ? userProviderData : [];
    userWidgetData = userWidgetData ? userWidgetData : [];
    updateCategoryObjWithLocal(userCategoryData);
    updateProviderObjWithLocal(userProviderData);
    updatWidgetObjWithLocal(userWidgetData);

    if (checkAllSelectedInObj(CategoryObj)) {
        selectedAll(CATEGORY);
    } else {
        CategoryObj.map(function (ele) {
            if (ele.selected) {
                $('[' + CATEGORY + '-name=' + ele.categoryName + ']').addClass(
                    CATEGORY + 'BoxActive'
                );
            }
        });
    }

    if (checkAllSelectedInObj(ProviderObj)) {
        selectedAll(PROVIDER);
    } else {
        $('.newsProviderListNew').empty();
        ProviderObj.map(function (ele) {
            if (ele.selected) {
                if (FixedProviderName.indexOf(ele.providerName) != -1) {
                    $('[' + PROVIDER + '-name=' + ele.providerName + ']').addClass(
                        PROVIDER + 'BoxActive'
                    );
                } else {
                    var providerCode = `<div class="newsProviderBox providerBoxActive" provider-name="${escapeHtml(
                        ele.providerName
                    )}">
                            <div class="newsProviderName">
                                <h1>${escapeHtml(ele.uiName)}</h1>
                            </div>
                            <div class="newsProviderSelect">
                                <svg class="geryTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g stroke="#D0D0D6">
                                            <g>
                                                <g>
                                                    <g transform="translate(-1024 -157) translate(302 50) translate(660 107) translate(62)">
                                                        <circle cx="10" cy="10" r="9.5" fill="#FFF"/>
                                                        <path stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <svg class="blueTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g>
                                            <g>
                                                <g>
                                                    <g transform="translate(-521 -216) translate(302 50) translate(20 146) translate(199 20)">
                                                        <circle cx="10" cy="10" r="10" fill="#008EFF"/>
                                                        <path stroke="#FFF" stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>`;
                    $('.newsProviderListNew').append(providerCode);
                }
            }
        });
    }

    if (checkAllSelectedInObj(WidgetObj)) {
        selectedAll(WIDGET);
    } else {
        WidgetObj.map(function (ele) {
            if (ele.selected) {
                $('[' + WIDGET + '-name=' + ele.name + ']').addClass(
                    WIDGET + 'BoxActive'
                );
            }
        });
    }
}

function resetAllTickBox() {
    $('.topMenuBox').removeClass('topMenuBoxActive');
    resetSelectOption();
}

function resetSelectOption() {
    $('[' + CATEGORY + '-name]').removeClass(CATEGORY + 'BoxActive');
    $('[' + PROVIDER + '-name]').removeClass(PROVIDER + 'BoxActive');
    $('[' + WIDGET + '-name]').removeClass(WIDGET + 'BoxActive');
    $('[select-all]').removeClass('allSelected');
}

$('.topMenuHead').click(function () {
    var hasActiveClass = $(this).parent().hasClass('topMenuBoxActive');
    $('.topMenuBox').removeClass('topMenuBoxActive');
    var dropDownName = $(this).attr('dropdown-name');
    var dropdownStatus = hasActiveClass ? 'close' : 'open';
    if (hasActiveClass) {
        $(this).parent().removeClass('topMenuBoxActive');
    } else {
        $(this).parent().addClass('topMenuBoxActive');
        $('.menuDataWrap').animate(
            {
                scrollTop:
                    $('.topMenuBoxActive .topMenuHead').offset().top -
                    $('.menuDataWrap').offset().top
            },
            500
        );
    }
});

$('.newsProviderCrossBtnHide').click(function () {
    closeProviderDropdown();
});

function closeProviderDropdown() {
    $('.newsProviderSearch1').removeClass('newsProviderSearchBoxResultActive');
    $('.newsProviderSearchBoxResultSpt').empty();
    $('.newsProviderInputSpt').val('');
}

function compareObjWithLocalObj(mainObj, localObj) {
    var equalFlag = false;
    if (mainObj.length == localObj.length) {
        equalFlag = true;
        for (var i = 0; i < mainObj.length; i++) {
            if (mainObj[i].selected != localObj[i].selected) {
                equalFlag = false;
                return equalFlag;
            }
        }
    }
    return equalFlag;
}

var apiWorldStatsUrlBlank = API + 'covidnum';
var apiWorldStatsUrl = apiWorldStatsUrlBlank + '?world=1';
var $stateSelect = $('#countryDropdownCovid');

function getCovidCasesValues(parmSettingsForCall, checkFirstLoad) {
    $.getJSON(parmSettingsForCall.apiCall, function (data) {
        var mainContentCovid = {},
            value = parmSettingsForCall.value;
        switch (parmSettingsForCall.forWhich) {
            case 'USA':
                mainContentCovid = data.usaStats;
                break;
            case 'state':
                mainContentCovid = data.usaStats[value];
                break;
            case 'country':
                mainContentCovid = data.worldStats[value];
                break;
            case 'Worldwide':
            default:
                mainContentCovid = data.worldStats;
        }
        var statsContentCovid = [
            mainContentCovid.totalCases,
            mainContentCovid.totalRecovered,
            mainContentCovid.totalDeaths
        ];
        casesStatsRender(statsContentCovid);
        if (checkFirstLoad && parmSettingsForCall.forWhich == 'USA') {
            var usaStates = Object.keys(data.usaStats.distribution),
                countries = Object.keys(data.worldStats.distribution);
            displayCountryOptions(usaStates, $stateSelect);
        }
    });
}

function casesStatsRender(casesArr) {
    $('.totalCaseNoSpt').text(acquireFormatedNumber(casesArr[0]));
    $('.covidCaseRecoveredNoSpt').text(acquireFormatedNumber(casesArr[1]));
    $('.covidCaseDeathNoSpt').text(acquireFormatedNumber(casesArr[2]));
}

function acquireFormatedNumber(numData) {
    return numData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayCountryOptions(data, ele, isDefaultCountrySelected) {
    data = data.sort();
    for (var i = 0; i < data.length; i++) {
        if (data[i] !== '') {
            ele.append(
                `<option value="${escapeHtml(data[i])}">${escapeHtml(data[i])}</option>`
            );
        }
    }
    if (isDefaultCountrySelected) {
        $('#firstOptId').remove();
        $stateSelect.val('USA');
        ele.prepend(`<option value="Worldwide">Worldwide</option>`);
    }
}

$(document).on('change', '#countryDropdownCovid', function (e) {
    var valueSelected = this.value;
    var parmSettingsForCall = {};
    if (valueSelected !== 'Select State') {
        parmSettingsForCall = {
            apiCall: apiWorldStatsUrlBlank + '?state=' + valueSelected,
            value: valueSelected,
            forWhich: 'state'
        };
    } else {
        parmSettingsForCall = {
            apiCall: apiWorldStatsUrlBlank,
            value: '',
            forWhich: 'USA'
        };
    }
    getCovidCasesValues(parmSettingsForCall);
});

var selectAll = $('[select-all]');
const CATEGORY = 'category';
const PROVIDER = 'provider';
const WIDGET = 'widget';

window.newsLoadCond = {
    resThreshold: 0,
    overallThreshold: 0,
    iterThreshold: 20,
    newsResult: []
};

window.widArticlesLoad = {
    widArcticleResult: [],
    resultSize: 0
};

window.sliderArticlesLoad = {
    sliderArcticleResult: [],
    resultSize: 0
};

const TopNews = `<div class="tabBox tabBox3"   nav-name='topnews'>
            <div class="tab tab3">
                <span class="tabText">Top News</span>
            </div>
        </div>`;

function loadOnPiiApprove() {
    if (
        !storageReplacer.getLocalStorageItem('newsPopUpShown') &&
        storageReplacer.getLocalStorageItem('newsPopUpShown') != 1
    ) {
        storageReplacer.setLocalStorageItem('newsPopUpShown', '1');
        $('.mainWidgetPopUpLayer').show();
        $('body').addClass('popUpOpen');
    } else {
        var userCategoryData = storageItemAcquire('categoryDataOfUser');
        var userProviderData = storageItemAcquire('providerDataOfUser');
        var userWidgetData = storageItemAcquire('localWidgetStatus');
        userCategoryData = userCategoryData ? userCategoryData : [];
        userProviderData = userProviderData ? userProviderData : [];
        userWidgetData = userWidgetData ? userWidgetData : [];
        updateCategoryObjWithLocal(userCategoryData);
        updateProviderObjWithLocal(userProviderData);
        updatWidgetObjWithLocal(userWidgetData);
        generateResult();
        displayWidgetOrArticle();
    }

    setScrollFuncOnResults();
    $('body').addClass('prefaceDoneForExt');
}

function displayWidgetOrArticle() {
    var localWidgetStatus = storageItemAcquire('localWidgetStatus');
    localWidgetStatus = localWidgetStatus ? localWidgetStatus : WidgetObj;
    storageItemFit('localWidgetStatus', localWidgetStatus);
    for (var i = 0; i < localWidgetStatus.length; i++) {
        if (!localWidgetStatus[i].selected) {
            $('[wid-target=' + localWidgetStatus[i].name + ']').addClass(
                'showWidArticle'
            );
        } else {
            $('[wid-target=' + localWidgetStatus[i].name + ']').removeClass(
                'showWidArticle'
            );
        }
    }
}

$('.crossPoint').on('click', function () {
    $('.newsBgPopUpBoxSpt').addClass('noneNewsBgPopUpBox');
    $('body').removeClass('popUpOpen');
    unSelectedAll(CATEGORY);
    unSelectedAll(PROVIDER);
    setObjToFalse(CategoryObj);
    setObjToFalse(ProviderObj);
    generateResult();
});
$('.mainWidgetPopUpLayer').on('click', function (e) {
    if (
        $(e.target).closest('.newsPopUpBoxSpt,.newsGetStartedBoxSpt').length === 0
    ) {
        $('.newsBgPopUpBoxSpt').addClass('noneNewsBgPopUpBox');
        $('body').removeClass('popUpOpen');
        if (!$('.newsBgPopUpBoxSpt').hasClass('getStartedPopUpBox')) {
            unSelectedAll(CATEGORY);
            unSelectedAll(PROVIDER);
            setObjToFalse(CategoryObj);
            setObjToFalse(ProviderObj);
            generateResult();
        }
    }
});

$('.newsGetStartedBtnSpt').on('click', function () {
    $('.newsBgPopUpBoxSpt').addClass('noneNewsBgPopUpBox');
    $('body').removeClass('popUpOpen');
});

$('.newsPopUpBtnNxtSpt,.newsDotSpt2').on('click', function () {
    $('.newsBgPopUpBoxSpt').addClass('nextPopUpBox');
});

$('.newsDotSpt1').on('click', function () {
    $('.newsBgPopUpBoxSpt').removeClass('nextPopUpBox');
});

$('.doneTxtSpt').on('click', function () {
    $('.newsBgPopUpBoxSpt').addClass('getStartedPopUpBox');
    makingGetStartedForMyFeed();
    generateResult();
});

function makingGetStartedForMyFeed() {
    // var providerStatus = checkObj(ProviderObj);
    // var categoryStatus = checkObj(CategoryObj);
    var myFeedStatus = checkObj(CategoryObj) || checkObj(ProviderObj);
    if (myFeedStatus) {
        $('.getStartedMain').removeClass('getStartedSettingActive');
    }
}

function checkObj(obj) {
    var flag = false;
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].selected) {
            flag = true;
            break;
        }
    }
    return flag;
}

$(document).on('click', '[category-name]', function () {
    $(this).toggleClass('categoryBoxActive');
    var attrName = $(this).attr('category-name');
    updateStatusInCatObj(
        CategoryObj,
        attrName,
        $(this).hasClass('categoryBoxActive')
    );
    var categoryVal = attrName + ' : ' + $(this).hasClass('categoryBoxActive');
    var allSelectedStatus = checkAllSelected(CATEGORY);
    updateSelectedStatus(CATEGORY, allSelectedStatus);
});

$(document).on('click', '[provider-name]', function () {
    var attrName = $(this).attr('provider-name');
    if ($('[provider-name = ' + attrName + ']').hasClass('providerBoxActive')) {
        $('[provider-name = ' + attrName + ']').removeClass('providerBoxActive');
    } else {
        $('[provider-name = ' + attrName + ']').addClass('providerBoxActive');
    }
    updateStatusInProvObj(
        ProviderObj,
        attrName,
        $('[provider-name = ' + attrName + ']').hasClass('providerBoxActive')
    );
    var providerVal =
        attrName +
        ' : ' +
        $('[provider-name = ' + attrName + ']').hasClass('providerBoxActive');


    var allSelectedStatus = checkAllSelected(PROVIDER);
    updateSelectedStatus(PROVIDER, allSelectedStatus);
    if (FixedProviderName.indexOf(attrName) == -1) {
        var providerObj = acquireProviderObj(attrName);
        if (providerObj.selected) {
            var providerCode = `<div class="newsProviderBox providerBoxActive" provider-name="${escapeHtml(
                providerObj.providerName
            )}">
                            <div class="newsProviderName">
                                <h1>${escapeHtml(providerObj.uiName)}</h1>
                            </div>
                            <div class="newsProviderSelect">
                                <svg class="geryTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g stroke="#D0D0D6">
                                            <g>
                                                <g>
                                                    <g transform="translate(-1024 -157) translate(302 50) translate(660 107) translate(62)">
                                                        <circle cx="10" cy="10" r="9.5" fill="#FFF"/>
                                                        <path stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <svg class="blueTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g>
                                            <g>
                                                <g>
                                                    <g transform="translate(-521 -216) translate(302 50) translate(20 146) translate(199 20)">
                                                        <circle cx="10" cy="10" r="10" fill="#008EFF"/>
                                                        <path stroke="#FFF" stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
						</div>`;
            $('[provider-name= ' + providerObj.providerName + ']').remove();
            $('.newsProviderListNew').prepend(providerCode);
        } else {
            $('[provider-name=' + attrName + ']').remove();
        }
    }
    $('.newsProviderSearch1').removeClass('newsProviderSearchBoxResultActive');
    $('.newsProviderInputSpt').val('');
});

function acquireProviderObj(proName) {
    var providerObject = ProviderObj.find(function (ele) {
        if (ele.providerName == proName) {
            return ele;
        }
    });
    return providerObject;
}

$(document).on('click', '[select-all]', function () {
    var selectType = $(this).attr('select-all');
    var selectAllVal = selectType + ' : ' + !$(this).hasClass('allSelected');
    if ($(this).hasClass('allSelected')) {
        if (selectType == 'category') {
            setObjToFalse(CategoryObj);
        } else if (selectType == 'provider') {
            setObjToFalse(ProviderObj);
        } else if (selectType == 'widget') {
            setObjToFalse(WidgetObj);
        }
        unSelectedAll(selectType);
    } else {
        if (selectType == 'category') {
            setObjToTrue(CategoryObj);
        } else if (selectType == 'provider') {
            setObjToTrue(ProviderObj);
        } else if (selectType == 'widget') {
            setObjToTrue(WidgetObj);
        }
        selectedAll(selectType);
    }
});

function checkAllSelected(type) {
    var checkData = $('[' + type + '-name]');
    var flagCheck = true;
    checkData.each(function (index) {
        if (!$(this).hasClass(type + 'BoxActive')) {
            flagCheck = false;
            return flagCheck;
        }
    });
    return flagCheck;
}

function checkAllSelectedInObj(changedObj) {
    var flagCheck = true;
    changedObj.forEach(function (ele) {
        if (!ele.selected) {
            flagCheck = false;
            return flagCheck;
        }
    });
    return flagCheck;
}

function updateSelectedStatus(type, status) {
    var typeToUpdate = $('[select-all=' + type + ']');
    status
        ? typeToUpdate.addClass('allSelected')
        : typeToUpdate.removeClass('allSelected');
}

function unSelectedAll(type) {
    $('[' + type + '-name]').removeClass(type + 'BoxActive');
    $('[select-all=' + type + ']').removeClass('allSelected');
}

function selectedAll(type) {
    $('[' + type + '-name]').addClass(type + 'BoxActive');
    $('[select-all=' + type + ']').addClass('allSelected');
}

function updateStatusInCatObj(objData, attrName, statusForAttr) {
    objData.forEach(function (ele) {
        if (ele.categoryName == attrName) {
            ele.selected = statusForAttr;
        }
    });
}

function updateStatusInProvObj(objData, attrName, statusForAttr) {
    objData.forEach(function (ele) {
        if (ele.providerName == attrName) {
            ele.selected = statusForAttr;
        }
    });
}

function generateResult(disableNavClick) {
    disableNavClick = !!disableNavClick;
    storageItemFit('categoryDataOfUser', CategoryObj);
    storageItemFit('providerDataOfUser', ProviderObj);
    generateNav();
    if (!disableNavClick) {
        // console.log('called navClicked');
        var selectCat = CategoryObj.filter((ele) => {
            if (ele.selected) {
                return ele;
            }
        });
        var selectPro = ProviderObj.filter(function (eleData) {
            if (eleData.selected) {
                return eleData;
            }
        });
        if (selectCat.length == 0 && selectPro.length == 0) {
            navClicked('topnews');
        } else {
            navClicked('myfeed');
        }
    }
}

function generateNav() {
    var navHtmlCode = '';
    navHtmlCode += TopNews;
    var selectCat = CategoryObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    var unSelectCat = CategoryObj.filter(function (eleData) {
        if (!eleData.selected) {
            return eleData;
        }
    });
    var finalCatList = [...selectCat, ...unSelectCat];
    finalCatList.forEach(function (ele, index) {
        navHtmlCode += `<div class="tabBox ${escapeHtml(
            'tabBox' + (index + 3 + 1)
        )}" nav-name="${escapeHtml(ele.categoryName)}">
            <div class="tab ${escapeHtml('tab' + (index + 3 + 1))}">
                <span class="tabText">${escapeHtml(ele.uiName)}</span>
            </div>
        </div>`;
    });

    slickDestroy('mainWTabsCaruslSlick');
    $('.mainWTabsCaruslSlick').empty();
    $('.mainWTabsCaruslSlick').append(navHtmlCode);
    $('.tabsFixed').removeClass('marginAuto');
    var totalNo = finalCatList.length + 1,
        slidestoshow = totalNo > 4 ? 4 : totalNo;
    if (totalNo > 4) {
        slickInit('mainWTabsCaruslSlick', slidestoshow);
    }
}

function setObjToFalse(objData) {
    objData.forEach(function (ele) {
        ele.selected = false;
    });
}

function setObjToTrue(objData) {
    objData.forEach(function (ele) {
        ele.selected = true;
    });
}

function slickInit(slickBoxClassName, noOfSlideToShow) {
    $('.' + slickBoxClassName).slick({
        infinite: false,
        speed: 300,
        slidesToShow: noOfSlideToShow,
        slidesToScroll: 1,
        prevArrow:
            '<button type="button" class="sendEvent slick-prev"  value-Name="clientHit" value-1="tabsPrevClk"><svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  class="slickStroke" id="Artboard" transform="translate(-105.000000, -23.000000)" stroke="#008EFF" stroke-width="2"><polyline id="arrow-3px-copy" transform="translate(112.000000, 30.000000) scale(-1, 1) rotate(45.000000) translate(-112.000000, -30.000000) " points="108 26 116 26 116 34"></polyline></g></g></svg></button> ',
        nextArrow:
            '<button type="button" class="sendEvent slick-next"  value-Name="clientHit" value-1="tabsNextClk" ><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><g fill="none" fill-rule="evenodd"><g class="slickStroke" stroke="#008EFF" stroke-width="2"><g><g><path d="M2 2L10 2 10 10" transform="translate(-1266 -740) translate(0 726) translate(1266 15) rotate(45 6 6)"/></g></g></g></g></svg></button> ',
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

function slickDestroy(slickBoxClassName) {
    if ($('.' + slickBoxClassName).hasClass('slick-initialized')) {
        $('.' + slickBoxClassName).slick('destroy');
    }
}

var myfeedCall = true;
$(document).on('click', '[nav-name]', function (e) {
    e.preventDefault();
    closeSideMenuOnElseClick();
    var navAttr = $(this).attr('nav-name');

    navClicked(navAttr);
});
$(document).on('click', '.saveArtLogoSpt', function (e) {
    e.preventDefault();
    var saveArticleList = storageItemAcquire('savedArticle');
    saveArticleList = !!saveArticleList ? saveArticleList : [];
    var saveArticle = {};
    var articleId = $(this).attr('aid');
    var articleBox = $(this).parent();
    var articleLk = articleBox.find('.artLnkSpt').attr('href');
    var articleImg = articleBox.find('.artMainImgSpt').attr('src');
    var articleHead = articleBox.find('.artHeadSpt').attr('title').trim();
    var articleInfo = articleBox.find('.artInfoSpt').text().trim();
    var articleTimeInfo = articleBox
        .find('.timeBox')
        .attr('article-ctime')
        .trim();
    var artCatNme = articleBox.find('.artCatNameSpt').attr('articlecat');
    var inSaved = $(this).attr('in-saved');
    var savedStatus = true;
    if (articleBox.hasClass('clrIcon')) {
        articleBox.removeClass('clrIcon');
        saveArticleList = saveArticleList.filter(function (savedArticle) {
            if (savedArticle.aid != articleId) {
                return savedArticle;
            }
        });
        if (inSaved == 'true') {
            articleBox.remove();
            checkSavedSectionEmpty();
        }
        savedStatus = false;
    } else {
        articleBox.addClass('clrIcon');
        saveArticle.aid = articleId;
        saveArticle.img = articleImg;
        saveArticle.link = articleLk;
        saveArticle.head = articleHead;
        saveArticle.info = articleInfo;
        saveArticle.ctime = articleTimeInfo;
        saveArticle.catNme = artCatNme;
        saveArticleList.push(saveArticle);
    }
    var savedMsg = savedStatus ? 'saveArticle' : 'unSaveArticle';
    storageItemFit('savedArticle', saveArticleList);
});

function checkSavedSectionEmpty() {
    if ($('.savedArticleNewsDataSpt .articlesBox.clrIcon').length == 0) {
        $('.showSavedArticles').removeClass('hideEmptyArtWrapSpt');
        $('.bottomThirdParties').remove();
        return true;
    } else {
        $('.showSavedArticles').addClass('hideEmptyArtWrapSpt');
        return false;
    }
}

function navClicked(navAttr) {
    $('[nav-name]').removeClass('newsNavOn');
    $('[nav-name=' + navAttr + ']').addClass('newsNavOn');

    $('.mainWidgetBottomSecSpt').removeClass('showSavedArticles');
    $('.mainWidgetBottomSecSpt').removeClass('showMyFeedsArticles');
    $('.mainWidgetBottomSecSpt').removeClass('showCovidWidget');
    $('.mainWidgetBottomSecSpt').removeClass('showElectionWidget');
    $('.mainWidgetBottomSecSpt').removeClass('tendingResult');
    $('.mainWidgetBottomSecSpt').removeClass('showMyFeedLoader');
    $('.mainWidgetBottomSecSpt').removeClass('hideEmptyArtWrapSpt');
    $('.topStripKwTxtSpt').removeClass('trendOn');
    var urlMaker =
        API + 'newsContent?strategy=128&type=' + navAttr + '&count=104&premium=1';
    switch (navAttr) {
        case 'myfeed':
            $('.mainWidgetBottomSecSpt').addClass('showMyFeedsArticles');
            $('.bottomThirdParties').remove();
            makingMyFeeds();
            displayWidgetOrArticle();
            break;
        case 'topnews':
            showNewsIn('articleNewsDataSpt', 'topnews', urlMaker);
            break;
        case 'saved-articles':
            $('.mainWidgetBottomSecSpt').addClass('showSavedArticles');
            showSavedNews();
            break;
        case 'usnews':
            showNewsIn('articleNewsDataSpt', 'usnews', urlMaker);
            break;
        case 'world':
            showNewsIn('articleNewsDataSpt', 'world', urlMaker);

            break;
        case 'coronavirus':
            $('.mainWidgetBottomSecSpt').addClass('showCovidWidget');
            urlMaker =
                API +
                'newsContent?strategy=152&time=2&tx=' +
                navAttr +
                '&count=104&premium=1';
            showNewsIn('articleNewsDataSpt', 'coronavirus', urlMaker);
            $('.covidWidgetSpt').removeClass('showWidArticle');
            break;
        case 'business':
            showNewsIn('articleNewsDataSpt', 'business', urlMaker);
            break;
        case 'health':
            showNewsIn('articleNewsDataSpt', 'health', urlMaker);
            break;
        case 'technology':
            showNewsIn('articleNewsDataSpt', 'technology', urlMaker);
            break;
        case 'sports':
            showNewsIn('articleNewsDataSpt', 'sports', urlMaker);
            break;
        case 'science':
            showNewsIn('articleNewsDataSpt', 'science', urlMaker);
            break;
        case 'entertainment':
            showNewsIn('articleNewsDataSpt', 'entertainment', urlMaker);
            break;
        case 'life':
            urlMaker =
                API +
                'newsContent?strategy=152&tx=LifeStyle&time=2&count=104&premium=1';
            showNewsIn('articleNewsDataSpt', 'life', urlMaker);
            break;
        case 'travel':
            urlMaker =
                API + 'newsContent?strategy=152&tx=Travel&time=2&count=104&premium=1';
            showNewsIn('articleNewsDataSpt', 'travel', urlMaker);
            break;
        default:
            break;
    }
}

var requestNews = null;

function showNewsIn(showNewsInClassName, newsType, url) {
    $('.articlesDataSpt').addClass('showSkeleton');
    $('.articlesMainBox .articlesBox').remove();
    $('.bottomThirdParties').remove();
    showHideEmpty(false);
    resetResLoad();
    var urlStr = url;

    var cacheData = getCacheCategoryResponse(urlStr);
    if (!!cacheData) {
        // console.log('indi cached..');
        individualCategorySec(cacheData, newsType);
    } else {
        // console.log('fetch and cached then indi..');
        var approved = storageReplacer.getLocalStorageItem('piiAccept');
        if (approved && approved == 1) {
            hitForNews(urlStr, newsType);
        }
    }
}

function hitForNews(urlStr, newsType) {
    // console.log('hit news');
    requestNews = $.ajax({
        type: 'GET',
        url: urlStr,
        dataType: 'JSON',
        beforeSend: function () {
            if (requestNews != null) {
                requestNews.abort();
                $('.articlesDataSpt').addClass('showSkeleton');
                showHideEmpty(false);
            }
        },
        success: function (data) {
            if (data.status == 'true') {
                storeCacheCategoryResponse(urlStr, data);
                var sData = getCacheCategoryResponse(urlStr);
                individualCategorySec(sData, newsType);
            } else {
                showHideEmpty(true);
            }
        },
        error: function () {
            showHideEmpty(true);
        }
    });
}

function individualCategorySec(data, newsType) {
    // console.log('inside indi');
    var filteredData = filterDataBasedOnProvider(data, newsType);
    newsLoadCond.newsResult = filteredData;
    var size = filteredData.length;
    if (size > 12) {
        newsLoadCond.overallThreshold = size - (size % 12);
    } else {
        newsLoadCond.overallThreshold = size;
    }
    if (newsType == 'trending' && size >= 8) {
        newsLoadCond.overallThreshold = 8;
    }
    if (newsType == 'coronavirus') {
        newsLoadCond.overallThreshold = newsLoadCond.overallThreshold - 1;
    }
    newsLoadCond.newsResult = filteredData;
    responseHtmlForArticle();

    $('.articlesDataSpt').removeClass('showSkeleton');
}

function getCanonicalDomain(domain) {
    if (domain.split('.').length > 2) {
        var parts = domain.split('.');
        domain =
            parts[parts.length - 3] +
            '.' +
            parts[parts.length - 2] +
            '.' +
            parts[parts.length - 1];
    }
    return domain;
}

function getPreferredArticle(relatedArticles, preferredDomains) {
    var domainList = Object.keys(preferredDomains);
    var domainIndex = domainList.length,
        articleIndex = relatedArticles.length;
    for (var i = 0; i < relatedArticles.length; i++) {
        var domain = getCanonicalDomain(relatedArticles[i].site);
        for (var j = 0; j < domainList.length; j++) {
            if (j < domainIndex && domain === domainList[j]) {
                // console.log('Updated index for ' + domain);
                domainIndex = j;
                articleIndex = i;
            }
        }
    }
    if (articleIndex < relatedArticles.length) {
        return relatedArticles.splice(articleIndex, 1)[0];
    }
    return null;
}

function getArticlesExcluding(articles, deferredDomains) {
    for (var i = 0; i < articles.length; i++) {
        if (!deferredDomains[getCanonicalDomain(articles[i].site)]) break;
    }
    var index = i >= articles.length ? 0 : i;
    return articles.splice(index, 1)[0];
}

function filterDataBasedOnProvider(data, cat) {
    try {
        var userProviderData = storageItemAcquire('providerDataOfUser');
        var premiumDomains = {
            'cnn.com': 1,
            'nytimes.com': 1,
            'wsj.com': 1,
            'usatoday.com': 1,
            'cbsnews.com': 1,
            'cnbc.com': 1,
            'nypost.com': 1,
            'espn.com': 1,
            'foxnews.com': 1,
            'reuters.com': 1,
            'forbes.com': 1,
            'abcnews.go.com': 1,
            'nbcnews.com': 1,
            'msn.com': 1,
            'news.yahoo.com': 1,
            'sports.yahoo.com': 1,
            'latimes.com': 1,
            'thehill.com': 1,
            'huffpost.com': 1,
            'npr.org': 1,
            'washingtontimes.com': 1,
            'theguardian.com': 1,
            'theverge.com': 1,
            'cbssports.com': 1,
            'politico.com': 1,
            'bloomberg.com': 1,
            'nydailynews.com': 1,
            'dailywire.com': 1,
            'voanews.com': 1,
            'inquisitr.com': 1,
            'cnet.com': 1,
            'foxsports.com': 1,
            'digitaltrends.com': 1,
            'techcrunch.com': 1,
            'zdnet.com': 1,
            'macworld.com': 1
        };
        var defferedDomains = {
            'statesman.com': 1,
            'freep.com': 1,
            'tallahassee.com': 1,
            'seattlepi.com': 1,
            'detroitnews.com': 1,
            'sputniknews.com': 1,
            'postandcourier.com': 1,
            'heraldextra.com': 1,
            'salon.com': 1,
            'timesunion.com': 1,
            'boston.com': 1,
            'apnews.com': 1,
            'gazette.com': 1,
            'offspring.lifehacker.com': 1,
            'whiskers101.com': 1,
            'mcall.com': 1
        };
        var sportsDomain = {
            'espn.com': 1,
            'sports.yahoo.com': 1,
            'cbssports.com': 1,
            'foxsports.com': 1
        };
        var ncDomain = {
            'news.google.com': 1,
            'yahoo.com': 1,
            'msn.com': 1,
            'cnn.com': 1,
            'edition.cnn.com': 1,
            'medium.com': 1,
            'bbc.com': 1,
            'nytimes.com': 1,
            'espn.com': 1,
            'cnet.com': 1,
            'theguardian.com': 1,
            'bbc.co.uk': 1,
            'washingtonpost.com': 1,
            'foxnews.com': 1,
            'breitbart.com': 1,
            'dailymail.co.uk': 1,
            'forbes.com': 1,
            'cnbc.com': 1,
            'businessinsider.com': 1,
            'independent.co.uk': 1,
            'rt.com': 1,
            'usatoday.com': 1,
            'wsj.com': 1,
            'bloomberg.com': 1,
            'reuters.com': 1,
            'webmd.com': 1,
            'marketwatch.com': 1,
            'npr.org': 1,
            'nypost.com': 1,
            'techradar.com': 1,
            'chron.com': 1,
            'uk.reuters.com': 1,
            'hellomagazine.com': 1,
            'fivethirtyeight.com': 1,
            'buzzfeed.com': 1,
            'abcnews.go.com': 1,
            'ign.com': 1,
            'cbssports.com': 1,
            'theverge.com': 1,
            'nbcnews.com': 1,
            'pcmag.com': 1,
            'nfl.com': 1,
            'express.co.uk': 1,
            'digitaltrends.com': 1,
            'telegraph.co.uk': 1,
            'gamespot.com': 1,
            'politico.com': 1,
            'engadget.com': 1,
            'inquisitr.com': 1,
            'thehill.com': 1,
            'cbsnews.com': 1,
            'nbcsports.com': 1,
            'cbc.ca': 1,
            'time.com': 1,
            'seekingalpha.com': 1,
            'theatlantic.com': 1,
            'wired.com': 1,
            'people.com': 1,
            'sfgate.com': 1,
            'skysports.com': 1,
            'thedailybeast.com': 1,
            'scmp.com': 1,
            'latimes.com': 1,
            'sanfrancisco.cbslocal.com': 1,
            'losangeles.cbslocal.com': 1,
            'boston.cbslocal.com': 1,
            'newyork.cbslocal.com': 1,
            'realclearpolitics.com': 1,
            'screenrant.com': 1,
            'hbr.org': 1,
            'techcrunch.com': 1,
            'news.sky.com': 1,
            'vox.com': 1,
            'newsweek.com': 1,
            'gizmodo.com': 1,
            'vice.com': 1,
            'foxbusiness.com': 1,
            'chicagotribune.com': 1,
            'lifehacker.com': 1,
            'variety.com': 1,
            'slate.com': 1,
            'financialexpress.com': 1,
            'denverpost.com': 1,
            'rollingstone.com': 1,
            'nydailynews.com': 1,
            'dailywire.com': 1,
            'msnbc.com': 1,
            'sbnation.com': 1,
            'zdnet.com': 1,
            'voanews.com': 1,
            'usmagazine.com': 1,
            'boston.com': 1,
            'foxsports.com': 1,
            'popsugar.com': 1,
            'macworld.com': 1,
            'thestar.com': 1,
            'rawstory.com': 1,
            'appleinsider.com': 1,
            'washingtontimes.com': 1,
            'startribune.com': 1
        };
        var ncList = ['coronavirus', 'life', 'travel', 'trending'];
        var selectCat = CategoryObj.filter(function (eleData) {
            if (eleData.selected) {
                return eleData;
            }
        });

        var sportsInCat = false;
        if (selectCat.length == 1 && selectCat[0].categoryName == 'sports') {
            sportsInCat = true;
        }
        var i = 0,
            preferedDomains = {},
            defferedArticlesAid = [];
        for (i = 0; i < userProviderData.length; i++) {
            if (!!userProviderData[i].selected) {
                preferedDomains[userProviderData[i].domainName] = true;
            }
        }

        var articles = data;
        if (!!articles) {
            for (i = 0; i < articles.length; i++) {
                var article = articles[i];
                if (!article['ra']) continue;
                var relatedArticles = article['ra'];
                delete article['ra'];
                relatedArticles.unshift(article);
                var preferredArticle;
                if (sportsInCat == true) {
                    preferredArticle = getPreferredArticle(
                        relatedArticles,
                        preferedDomains
                    );
                    if (!!cat && cat == 'myfeed' && preferredArticle == null)
                        preferredArticle = getPreferredArticle(
                            relatedArticles,
                            premiumDomains
                        );
                } else {
                    preferredArticle = getPreferredArticle(
                        relatedArticles,
                        preferedDomains
                    );
                    if (!!cat && cat == 'myfeed' && preferredArticle == null)
                        preferredArticle = getPreferredArticle(
                            relatedArticles,
                            premiumDomains
                        );
                }

                if (preferredArticle != null) {
                    preferredArticle['ra'] = relatedArticles;
                    articles[i] = preferredArticle;
                } else {
                    article = getArticlesExcluding(relatedArticles, defferedDomains);
                    article['ra'] = relatedArticles;
                    articles[i] = article;
                    if (!!defferedDomains[getCanonicalDomain(articles[i]['site'])]) {
                        defferedArticlesAid.push(articles[i]['aid']);
                    }
                }
            }
            var defferedArticles = [],
                notDefferedArticles = [];

            defferedArticles = articles.filter(function (article) {
                if (defferedArticlesAid.indexOf(article['aid']) != -1) {
                    return article;
                }
            });
            notDefferedArticles = articles.filter(function (article) {
                if (defferedArticlesAid.indexOf(article['aid']) == -1) {
                    return article;
                }
            });
            articles = notDefferedArticles.concat(defferedArticles);
        }

        data = articles;
    } catch (err) {
        console.error(err);
    }
    return data;
}

function showSavedNews() {
    var savedArticles = storageItemAcquire('savedArticle');
    var savedArticleCode = '';
    if (!!savedArticles && savedArticles.length != 0) {
        $('.showSavedArticles').addClass('hideEmptyArtWrapSpt');
        for (var i = 0; i < savedArticles.length; i++) {
            savedArticleCode += makeIndividualNewsForSaved(savedArticles[i], i);
        }
        $('.savedArticleNewsDataSpt').empty();
        $('.savedArticleNewsDataSpt').append(savedArticleCode);
        $('.savedArticleNewsDataSpt').append(
            "<p class='bottomThirdParties'>The content provided on this extension is for the convenience and ease of reference for users in the US. Some of the information is made available through third party websites. We do not endorse, review or monitor such third parties or the information made available by them on this extension or on their respective websites. For more information, refer our <a href='https://quicklivenews.com/news/termsofservice_ff.html'  oct-policy='tos' class='sendEvent tosDisclaimer'  target='_blank' value-Name='clientHit' value-1='disclaimerTermsClk' >Terms and Conditions</a>. <br>Dong E, Du H, Gardner L. An interactive web-based dashboard to track COVID-19 in real time. Lancet Inf Dis. 20(5):533-534. doi: 10.1016/S1473-3099(20)30120-1</p>"
        );
    } else {
        checkSavedSectionEmpty();
    }
}

function makeIndividualNewsForSaved(newsData, index) {
    var titleTxt = newsData.head;
    var title = titleTxt.replace(/"/g, '');
    if (titleTxt.length > 80) {
        titleTxt = titleTxt.slice(0, 80);
        var space = titleTxt.lastIndexOf(' ');
        titleTxt = (titleTxt.slice(0, space) + '...').replace(/"/g, '');
    }
    var artCatClnm = newsData.catNme.replace(/\s/g, '').toLowerCase();

    var fallBackBg = [' newsFb1', ' newsFb2', ' newsFb3', ' newsFb4'];
    var newsCode = `<li class="articlesBox clrIcon">
		<a referrerpolicy="strict-origin-when-cross-origin" class="sendEvent artLnk artLnkSpt" href="${encodeURI(
        newsData.link
    )}" value-Name="clientHit" value-1="savedArticleClk" value-3="category : ${escapeHtml(
        artCatClnm
    )} :: link : ${encodeURI(newsData.link)}" target="_blank">
            <div class="artImg ${escapeHtml(fallBackBg[index % 4])}">
                <img referrerpolicy="strict-origin-when-cross-origin" class="artMainImgSpt" src='${encodeURI(newsData.img)}' ">
            </div>
			<div class="artDetail">
				<p class='artCatName ${escapeHtml(artCatClnm)}'>${escapeHtml(
        newsData.catNme.replace(/-/g, ' ')
    )}</p>
                <h1 class="artHead artHeadSpt" title="${escapeHtml(title)}">
                    ${escapeHtml(titleTxt)}
                </h1>
                <div class="artInfoWrap">
					<div class='infoTimeWrap'>
						<p class="artInfo artInfoSpt">
							${escapeHtml(newsData.info)}
						</p>
						<p class='timeBox'   article-ctime='${escapeHtml(
        newsData.ctime
    )}' >${escapeHtml(timeSince(newsData.ctime))}</p>
					</div>
                </div>
			</div>
			</a>
			<span class="saveArtLogo saveArtLogoSpt" aid=${
        escapeHtml(newsData.aid) + ''
    } in-saved="true">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22">
					<g class="stroke" fill="none" fill-rule="evenodd">
						<g fill="#008EFF" fill-rule="nonzero">
							<g>
								<g>
									<g>
										<path d="M1.655 0C.738 0 0 .718 0 1.61V22l8-5.366L16 22V1.61C16 .718 15.262 0 14.345 0H1.655z" transform="translate(-353 -463) translate(0 175) translate(105 82) translate(248 206)"/>
									</g>
								</g>
							</g>
						</g>
					</g>
				</svg>
			</span>
        </li>`;
    return newsCode;
}

function makeIndividualNews(newsData, index, ranId) {
    var fallBackBg = [' newsFb1', ' newsFb2', ' newsFb3', ' newsFb4'];
    var alreadySaved = checkNewsSaved(newsData.aid);
    var classToAdd = alreadySaved ? 'clrIcon' : '';
    var img = newsData.imgt.replace('[[size]]', '275x150');
    var titleTxt = newsData.t;
    var title = titleTxt.replace(/"/g, '');
    if (titleTxt.length > 80) {
        titleTxt = titleTxt.slice(0, 80);
        var space = titleTxt.lastIndexOf(' ');
        titleTxt = (titleTxt.slice(0, space) + '...').replace(/"/g, '');
    }
    var artCatName = !!newsData.maCatName ? newsData.maCatName : newsData.dc;
    var artCatClnm = artCatName.replace(/\s/g, '').toLowerCase();
    var articleTimeInfo;

    articleTimeInfo = !!newsData.updtime
        ? newsData.updtime
        : !!newsData.ctime
            ? newsData.ctime
            : newsData.dbtime;
    var newsCode =
        `<li class="articlesBox ${escapeHtml(classToAdd)}">
		<a referrerpolicy="strict-origin-when-cross-origin" class="sendEvent artLnk artLnkSpt" href="${encodeURI(
            newsData.u
        )}" value-Name="clientHit" value-1="articleClk" value-3="category : ${escapeHtml(
            artCatClnm
        )} :: link : ${encodeURI(newsData.u)}" target="_blank">
            <div class="artImg ${escapeHtml(fallBackBg[index % 4])}">
				<img referrerpolicy="strict-origin-when-cross-origin" id="${escapeHtml(ranId)}" class="artMainImgSpt "  src='${encodeURI(!!img ? img : newsData.imgr
        )}' data-fallback='${encodeURI(newsData.imgr)}' >
            </div>
			<div class="artDetail">
				<p class='artCatName artCatNameSpt ${escapeHtml(
            artCatClnm
        )}' articlecat="${escapeHtml(artCatName)}">${escapeHtml(
            artCatName.replace(/-/g, ' ')
        )}</p>
                <h1 class="artHead artHeadSpt" title="${escapeHtml(title)}">
                    ${escapeHtml(titleTxt)}
                </h1>
				<div class="artInfoWrap">
					<div class='infoTimeWrap'>
						<p class="artInfo artInfoSpt">
							${escapeHtml(newsData.site)}
						</p>
						<p class='timeBox' article-ctime='${escapeHtml(articleTimeInfo)}'>${escapeHtml(
            timeSince(articleTimeInfo)
        )}</p>
					</div>
                </div>
			</div>
			</a>
			<span class="saveArtLogo saveArtLogoSpt" aid=${escapeHtml(
            newsData.aid + ''
        )} in-saved="false">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22">
					<g class="stroke" fill="none" fill-rule="evenodd">
						<g fill="#008EFF" fill-rule="nonzero">
							<g>
								<g>
									<g>
										<path d="M1.655 0C.738 0 0 .718 0 1.61V22l8-5.366L16 22V1.61C16 .718 15.262 0 14.345 0H1.655z" transform="translate(-353 -463) translate(0 175) translate(105 82) translate(248 206)"/>
									</g>
								</g>
							</g>
						</g>
					</g>
				</svg>
			</span>
		</li>`;
    return newsCode;
}

function imgOnLoad(img) {
    try {
        var imgOriginalWidth = img.naturalWidth,
            imgOriginalHeight = img.naturalHeight;
        if (imgOriginalWidth == 1 && imgOriginalHeight == 1) {
            var fallBackUrl = $(img).data('fallback');
            $(img).attr('src', fallBackUrl);
        }
    } catch (err) {
        console.log(err);
    }
}

function imgOnError(_this) {
    var fallBackUrl = $(_this).data('fallback');
    _this.onerror = null;
    _this.src = '/icons/fallback.png';
    var _img =document.createElement('img');
    _img.referrerPolicy='strict-origin-when-cross-origin';
    _img.src = fallBackUrl;
    _img.onload = function () {
        _this.src = fallBackUrl;
    };

    _img.onerror = function () {
        _this.src = '/icons/fallback.png';
    };
}

function timeSince(dateArticle) {
    if (dateArticle) {
        const queryTime = new Date(dateArticle);
        const localTime = new Date();
        const timeDiff = (localTime - queryTime) / (24 * 60 * 60 * 1000);
        if (timeDiff < 1) {
            return ((timeDiff * 24) <= 1) ? "a hour ago" : Math.floor(timeDiff * 24) + " hours ago";
        } else if (timeDiff >= 1 && timeDiff < 7) {
            return (Math.floor(timeDiff) === 1) ? "a day ago" : Math.floor(timeDiff) + " days ago";
        } else if (timeDiff >= 7 && timeDiff < 30) {
            return (Math.floor(timeDiff) === 7) ? "a week ago" : Math.floor(timeDiff) + " weeks ago";
        } else if (timeDiff > 30) {
            return (Math.floor(timeDiff) === 30) ? "a month ago" : Math.floor(timeDiff) + " months ago";
        }
    }
}

function checkNewsSaved(articleId) {
    var saveArticleList = storageItemAcquire('savedArticle');
    saveArticleList = saveArticleList ? saveArticleList : [];
    var articleData = saveArticleList.filter(function (article) {
        if (article.aid == articleId) {
            return article;
        }
    });
    return articleData.length == 0 ? false : true;
}

function updateCategoryObjWithLocal(userCategoryData) {
    userCategoryData.forEach(function (value, index) {
        for (var i = 0; i < CategoryObj.length; i++) {
            if (
                !!CategoryObj[i] &&
                CategoryObj[i].categoryName == value.categoryName
            ) {
                CategoryObj[i].selected = value.selected;
                break;
            }
        }
    });
}

function updateProviderObjWithLocal(userProviderData) {
    userProviderData.forEach(function (value, index) {
        for (var i = 0; i < ProviderObj.length; i++) {
            if (
                !!ProviderObj[i] &&
                ProviderObj[i].providerName == value.providerName
            ) {
                ProviderObj[i].selected = value.selected;
                break;
            }
        }
    });
}

function updatWidgetObjWithLocal(userWidgetData) {
    userWidgetData.forEach(function (value, index) {
        for (var i = 0; i < WidgetObj.length; i++) {
            if (!!WidgetObj[i] && WidgetObj[i].name == value.name) {
                WidgetObj[i].selected = value.selected;
                break;
            }
        }
    });
}

$(document).on('click', '[wid-name]', function (e) {
    e.preventDefault();
    var widAttr = $(this).attr('wid-name');
    $('[wid-target=' + widAttr + ']').addClass('widClosing');
    WidgetObj.map(function (el) {
        if (el.name == widAttr) {
            el.selected = false;
        }
    });
    storageItemFit('localWidgetStatus', WidgetObj);
    setTimeout(function () {
        $('[wid-target=' + widAttr + ']')
            .removeClass('widClosing')
            .addClass('showWidArticle');
    }, 6000);
});
$('.okGotItSpt').on('click', function () {
    var targetWid = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .attr('wid-target');
    $('[wid-target=' + targetWid + ']')
        .removeClass('widClosing')
        .addClass('showWidArticle');
});

function addWidgetArticles(newsType) {
    var ranVar = makeID(15);
    $('.UsElectionWidgetSpt .articleTempList').empty();
    $('.UsElectionWidgetSpt .articleTempList1').append(
        makeWidArticleCode(widArticlesLoad.widArcticleResult[0], 0, ranVar)
    );
    imgLoadAndError(ranVar);

    ranVar = makeID(15);
    $('.UsElectionWidgetSpt .articleTempList1').append(
        makeWidArticleCode(widArticlesLoad.widArcticleResult[1], 1, ranVar)
    );
    imgLoadAndError(ranVar);

    ranVar = makeID(15);
    $('.covidWidgetSpt .widArticle').empty();
    $('.covidWidgetSpt .widArticle').append(
        makeWidArticleCode(widArticlesLoad.widArcticleResult[2], 2, ranVar)
    );
    imgLoadAndError(ranVar);

    ranVar = makeID(15);
    $('.twitterWidgetSpt .widArticle').empty();
    $('.twitterWidgetSpt .widArticle').append(
        makeWidArticleCode(widArticlesLoad.widArcticleResult[3], 3, ranVar)
    );
    imgLoadAndError(ranVar);

    ranVar = makeID(15);
    $('.UsElectionWidgetSpt .articleTempList2').append(
        makeWidArticleCode(widArticlesLoad.widArcticleResult[4], 4, ranVar)
    );
    imgLoadAndError(ranVar);

    ranVar = makeID(15);
    $('.UsElectionWidgetSpt .articleTempList2').append(
        makeWidArticleCode(widArticlesLoad.widArcticleResult[5], 5, ranVar)
    );
    imgLoadAndError(ranVar);

    if (newsType == 'myfeed') {
        var slideCode = '';
        var noOfSlide = 8;
        slickDestroySlider();
        $('.artSldr').empty();
        for (
            var i = 0;
            i < noOfSlide && i < sliderArticlesLoad.sliderArcticleResult.length;
            i++
        ) {
            ranVar = makeID(15);
            var singlrSlideCode = makeSliderArticleCode(
                sliderArticlesLoad.sliderArcticleResult[i],
                i,
                ranVar
            );
            // slideCode += makeSliderArticleCode(
            // 	sliderArticlesLoad.sliderArcticleResult[i],
            // 	i, ranVar
            // );
            $('.artSldr').append(singlrSlideCode);
            imgLoadAndError(ranVar);
        }

        // slickDestroySlider();
        // $('.artSldr').empty();
        // $('.artSldr').append(slideCode);
        slickInitSlider();
    }
}

function makeWidArticleCode(widArticleData, index, ranId) {
    var fallBackBg = [' newsFb1', ' newsFb2', ' newsFb3', ' newsFb4'];
    var alreadySaved = checkNewsSaved(widArticleData.aid);
    var classToAdd = alreadySaved ? 'clrIcon' : '';
    var img = widArticleData.imgt.replace('[[size]]', '275x150');
    var titleTxt = widArticleData.t;
    var title = titleTxt.replace(/"/g, '');
    if (titleTxt.length > 80) {
        titleTxt = titleTxt.slice(0, 80);
        var space = titleTxt.lastIndexOf(' ');
        titleTxt = (titleTxt.slice(0, space) + '...').replace(/"/g, '');
    }

    var artCatName = !!widArticleData.maCatName
        ? widArticleData.maCatName
        : widArticleData.dc;
    var artCatClnm = artCatName.replace(/\s/g, '').toLowerCase();
    var articleTimeInfo;

    articleTimeInfo = !!widArticleData.updtime
        ? widArticleData.updtime
        : !!widArticleData.ctime
            ? widArticleData.ctime
            : widArticleData.dbtime;
    var newsCode =
        `<li class="widArticlesBox ${escapeHtml(classToAdd)}">
		<a referrerpolicy="strict-origin-when-cross-origin" class="sendEvent artLnk artLnkSpt" href="${encodeURI(
            widArticleData.u
        )}" target="_blank" value-Name="clientHit" value-1="articleClk" value-3="category : ${escapeHtml(
            artCatClnm
        )} :: link : ${encodeURI(widArticleData.u)}">
            <div class="artImg ${escapeHtml(fallBackBg[index % 4])}">
                <img referrerpolicy="strict-origin-when-cross-origin" id="${escapeHtml(
            ranId
        )}" class="artMainImgSpt " src='${encodeURI(!!img ? img : widArticleData.imgr)}' data-fallback='${encodeURI(widArticleData.imgr)}' >
            </div>
			<div class="artDetail">
				<p class='artCatName artCatNameSpt ${escapeHtml(
            artCatClnm
        )}' articlecat="${escapeHtml(artCatName)}">${escapeHtml(
            artCatName.replace(/-/g, ' ')
        )}</p>
                <h1 class="artHead artHeadSpt" title="${escapeHtml(title)}">
                    ${escapeHtml(titleTxt)}
                </h1>
                <div class="artInfoWrap">
					<div class='infoTimeWrap'>
						<p class="artInfo artInfoSpt">
							${escapeHtml(widArticleData.site)}
						</p>
						<p class='timeBox' article-ctime='${escapeHtml(articleTimeInfo)}'>${escapeHtml(
            timeSince(articleTimeInfo)
        )}</p>
					</div>
                </div>
			</div>
			</a>
			<span class="saveArtLogo saveArtLogoSpt" aid=${escapeHtml(
            widArticleData.aid + ''
        )} in-saved="false">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22">
					<g class="stroke" fill="none" fill-rule="evenodd">
						<g fill="#008EFF" fill-rule="nonzero">
							<g>
								<g>
									<g>
										<path d="M1.655 0C.738 0 0 .718 0 1.61V22l8-5.366L16 22V1.61C16 .718 15.262 0 14.345 0H1.655z" transform="translate(-353 -463) translate(0 175) translate(105 82) translate(248 206)"/>
									</g>
								</g>
							</g>
						</g>
					</g>
				</svg>
			</span>
        </li>`;
    return newsCode;
}

function makeSliderArticleCode(articleData, index, ranId) {
    var img = articleData.imgt.replace('[[size]]', '568x313');
    var fallBackBg = [' newsFb1', ' newsFb2', ' newsFb3', ' newsFb4'];
    var titleTxt = articleData.t;
    var title = titleTxt.replace(/"/g, '');
    if (titleTxt.length > 65) {
        titleTxt = titleTxt.slice(0, 65);
        var space = titleTxt.lastIndexOf(' ');
        titleTxt = (titleTxt.slice(0, space) + '...').replace(/"/g, '');
    }
    var articleTimeInfo;
    articleTimeInfo = !!articleData.updtime
        ? articleData.updtime
        : !!articleData.ctime
            ? articleData.ctime
            : articleData.dbtime;
    var newsCode = `<a referrerpolicy="strict-origin-when-cross-origin" class="sendEvent artSliderLk artLnk artLnkSpt" href="${encodeURI(
        articleData.u
    )}" target="_blank" value-Name="clientHit" value-1="sliderArticleClk" value-3="${encodeURI(
        articleData.u
    )}"  ><div class='sliderBlank' ><div class=' artBg  ${escapeHtml(
        fallBackBg[index % 4]
    )}' >
	<img referrerpolicy="strict-origin-when-cross-origin" id="${escapeHtml(ranId)}" class="artBgImg " src='${encodeURI(
        !!img ? img : articleData.imgr
    )}' data-fallback='${encodeURI(articleData.imgr)}' >
	<div class='artGrad'>
                                <h1 class='artSldrHead' title="${escapeHtml(
        title
    )}">
									
									${escapeHtml(titleTxt)}
								</h1>
								<div class='artSliderInfoWrap'>
									<p class="artSliderInfo">
										${escapeHtml(articleData.site)}
									</p> 
									<p class='artSliderTime' article-ctime='${escapeHtml(
        articleTimeInfo
    )}'>${escapeHtml(timeSince(articleTimeInfo))}</p>
									
								</div>
								</div>
								</div>
                            </div></a>`;
    return newsCode;
}

$(document).on('click', '[widget-name]', function () {
    $(this).toggleClass('widgetBoxActive');
    var attrName = $(this).attr('widget-name');
    updateStatusInWidObj(
        WidgetObj,
        attrName,
        $(this).hasClass('widgetBoxActive')
    );
    var widgetVal = attrName + ' : ' + $(this).hasClass('widgetBoxActive');
    var allSelectedStatus = checkAllSelected(WIDGET);
    updateSelectedStatus(WIDGET, allSelectedStatus);
});

function updateStatusInWidObj(objData, attrName, statusForAttr) {
    objData.forEach(function (ele) {
        if (ele.name == attrName) {
            ele.selected = statusForAttr;
        }
    });
}

function resetResLoad() {
    newsLoadCond.overallThreshold = 0;
    newsLoadCond.resThreshold = 0;
    newsLoadCond.newsResult = [];
}

function setScrollFuncOnResults() {
    $(window).on('scroll', function (e) {
        if (
            newsLoadCond.overallThreshold > 0 &&
            newsLoadCond.overallThreshold >= newsLoadCond.resThreshold
        ) {
            var scrollPosn = $(window).scrollTop();
            var scrollCalc = $(document).height() - $(window).height() - 360;
            if (scrollPosn >= scrollCalc) {
                responseHtmlForArticle();
            }
        }
    });
}

function responseHtmlForArticle() {
    var limit = newsLoadCond.resThreshold;
    var overallLimit = newsLoadCond.overallThreshold;
    var iterLimit = newsLoadCond.iterThreshold;
    if (overallLimit > 0) {
        var initIndex = limit ? limit : 0;
        var _len =
            overallLimit > limit
                ? overallLimit >= limit + iterLimit
                ? limit + iterLimit
                : limit + (overallLimit - limit)
                : limit;
        if (_len > 0 && _len <= overallLimit) {
            newsLoadCond.resThreshold = _len;
            for (var i = initIndex; i < _len; i++) {
                var ranId = makeID(15);
                var recipeObj = makeIndividualNews(
                    newsLoadCond.newsResult[i],
                    i,
                    ranId
                );
                // console.log(ranId);
                $('.articleNewsDataSpt').append(recipeObj);
                imgLoadAndError(ranId);
            }
        }
        if (_len == overallLimit) {
            newsLoadCond.resThreshold = overallLimit + 1;
            $('.articleNewsDataSpt').append(
                "<p class='bottomThirdParties'>The content provided on this extension is for the convenience and ease of reference for users in the US. Some of the information is made available through third party websites. We do not endorse, review or monitor such third parties or the information made available by them on this extension or on their respective websites. For more information, refer our <a href='https://quicklivenews.com/news/termsofservice_ff.html'   oct-policy='tos' class='sendEvent tosDisclaimer'  target='_blank' value-Name='clientHit' value-1='disclaimerTermsClk' >Terms and Conditions</a>. <br>Dong E, Du H, Gardner L. An interactive web-based dashboard to track COVID-19 in real time. Lancet Inf Dis. 20(5):533-534. doi: 10.1016/S1473-3099(20)30120-1</p>"
            );
        }
    } else {
        showHideEmpty(true);
    }
}

function makeID(length) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function imgLoadAndError(randomId) {
    // onload = 'imgOnLoad(this)' onerror = 'imgOnError(this)'
    var img = document.getElementById(randomId);
    // console.log(img);
    // console.log(this);
    img.onload = imgOnLoad(img);
    img.onerror = imgOnError(img);
}

function showHideEmpty(boolVal, messageToShow) {
    var msge = 'Oops Not found';
    if (!!messageToShow) {
        msge = messageToShow;
    }
    boolVal
        ? $('.mainWidgetBottomSecSpt').addClass('articleNotFoundMain')
        : $('.mainWidgetBottomSecSpt').removeClass('articleNotFoundMain');
    $('.emptyArtHeadSpt')[0].textContent = msge;
}

var trendingName;
var recentClick;
$(document).on('click', '[trending-name]', function (e) {
    e.preventDefault();
    closeSideMenuOnElseClick();
    var prevTrending = trendingName;
    trendingName = $(this).attr('trending-name');
    $('.topStripKwTxtSpt').removeClass('trendOn');
    $(this).addClass('trendOn');
    if (
        $('.navCatFixed').length == 0 ||
        prevTrending != trendingName ||
        recentClick != 'topic'
    ) {
        recentClick = 'topic';
        $('html,body').animate(
            {
                scrollTop: $('.mainWidget').offset().top - 198
            },
            'slow'
        );
    }

    $('[nav-name]').removeClass('newsNavOn');
    $('.mainWidgetBottomSecSpt').removeClass('showSavedArticles');
    $('.mainWidgetBottomSecSpt').removeClass('showMyFeedsArticles');
    $('.mainWidgetBottomSecSpt').removeClass('showCovidWidget');
    $('.mainWidgetBottomSecSpt').removeClass('showElectionWidget');
    $('.mainWidgetBottomSecSpt').removeClass('showMyFeedLoader');
    $('.mainWidgetBottomSecSpt').addClass('tendingResult');

    $('.trendingTitleSpt')[0].textContent = trendingName;
    var encodeTopic = encodeURIComponent(trendingName);
    var url =
        API +
        'newsContent?strategy=165&count=104&tx=' +
        encodeTopic +
        '&time=2&premium=1';
    showNewsIn('articleNewsDataSpt', 'trending', url);
});
$(function () {
    $('.newsProviderInputAuto')
        .autocomplete({
            autofocus: false,
            delay: 150,
            appendTo: $('.newsProviderSearchBoxAutoResult'),
            source: function (request, response) {
                var term = request.term.trim().toLowerCase().replace(/ /g, '');
                var searchResult = ProviderObj.filter(function (ele) {
                    var uiName = ele.uiName.trim().toLowerCase().replace(/ /g, '');
                    if (uiName.includes(term) && uiName.indexOf(term) == 0) {
                        return ele;
                    }
                });
                var limitToRender = 5;
                response(searchResult.slice(0, limitToRender));
            },
            select: function (event, ui) {
                var providerObj = ui.item;
                var tempProviderCode = `<div class="newsProviderBox " provider-name="${escapeHtml(
                    providerObj.providerName
                )}">
                            <div class="newsProviderName">
                                <h1>${escapeHtml(providerObj.uiName)}</h1>
                            </div>
                            <div class="newsProviderSelect">
                                <svg class="geryTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g stroke="#D0D0D6">
                                            <g>
                                                <g>
                                                    <g transform="translate(-1024 -157) translate(302 50) translate(660 107) translate(62)">
                                                        <circle cx="10" cy="10" r="9.5" fill="#FFF"/>
                                                        <path stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <svg class="blueTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g>
                                            <g>
                                                <g>
                                                    <g transform="translate(-521 -216) translate(302 50) translate(20 146) translate(199 20)">
                                                        <circle cx="10" cy="10" r="10" fill="#008EFF"/>
                                                        <path stroke="#FFF" stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
						</div>`;
                $('.tempProvider').empty();
                $('.tempProvider').append(tempProviderCode);
                if (!providerObj.selected) {
                    if (FixedProviderName.indexOf(providerObj.providerName) != -1) {
                        $(
                            '.topProviderBody .newsProviderList [provider-name=' +
                            providerObj.providerName +
                            ']'
                        ).trigger('click');
                    } else {
                        $('[provider-name=' + providerObj.providerName + ']').trigger(
                            'click'
                        );
                    }
                } else {
                    $('.tempProvider').empty();
                    if (
                        $(
                            '.topProviderBody .newsProviderListNew [provider-name=' +
                            providerObj.providerName +
                            ']'
                        ).length == 0 &&
                        FixedProviderName.indexOf(providerObj.providerName) == -1
                    ) {
                        $('[provider-name= ' + providerObj.providerName + ']').remove();
                        $('.newsProviderListNew').prepend(tempProviderCode);
                        $(
                            '.topProviderBody .newsProviderListNew [provider-name=' +
                            providerObj.providerName +
                            ']'
                        ).addClass('providerBoxActive');
                    }
                }
                this.value = '';
                return false;
            },
            focus: function (event, ui) {
                $(this).val(ui.item.uiName);
                return false;
            },
            close: function (event, ui) {
                $('.newsProviderSearchBoxAutoResult').removeClass('autoCompleteActive');
            },
            open: function (event, ui) {
                $('.newsProviderSearchBoxAutoResult').addClass('autoCompleteActive');
            }
        })
        .autocomplete('instance')._renderItem = function (ul, item) {
        return $('<li>')
            .append('<div>' + escapeHtml(item.uiName) + '</div>')
            .appendTo(ul);
    };
    $('.newsProviderInputPopUpAuto')
        .autocomplete({
            autofocus: false,
            delay: 150,
            appendTo: $('.newsProviderSearchBoxPopUpAutoResult'),
            source: function (request, response) {
                var term = request.term.trim().toLowerCase().replace(/ /g, '');
                var searchResult = ProviderObj.filter(function (ele) {
                    var uiName = ele.uiName.trim().toLowerCase().replace(/ /g, '');
                    if (uiName.includes(term) && uiName.indexOf(term) == 0) {
                        return ele;
                    }
                });
                var limitToRender = 5;
                response(searchResult.slice(0, limitToRender));
            },
            select: function (event, ui) {
                var providerObj = ui.item;
                var tempProviderCode = `<div class="newsProviderBox " provider-name="${escapeHtml(
                    providerObj.providerName
                )}">
                            <div class="newsProviderName">
                                <h1>${escapeHtml(providerObj.uiName)}</h1>
                            </div>
                            <div class="newsProviderSelect">
                                <svg class="geryTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g stroke="#D0D0D6">
                                            <g>
                                                <g>
                                                    <g transform="translate(-1024 -157) translate(302 50) translate(660 107) translate(62)">
                                                        <circle cx="10" cy="10" r="9.5" fill="#FFF"/>
                                                        <path stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <svg class="blueTick" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g fill="none" fill-rule="evenodd">
                                        <g>
                                            <g>
                                                <g>
                                                    <g transform="translate(-521 -216) translate(302 50) translate(20 146) translate(199 20)">
                                                        <circle cx="10" cy="10" r="10" fill="#008EFF"/>
                                                        <path stroke="#FFF" stroke-width="1.5" d="M6 6L6 10 14 10" transform="rotate(-45 10 8)"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
						</div>`;
                $('.tempProvider').empty();
                $('.tempProvider').append(tempProviderCode);
                if (!providerObj.selected) {
                    if (FixedProviderName.indexOf(providerObj.providerName) != -1) {
                        $(
                            '.newsPopUpMiddleBody .newsProviderList [provider-name=' +
                            providerObj.providerName +
                            ']'
                        ).trigger('click');
                    } else {
                        $('[provider-name=' + providerObj.providerName + ']').trigger(
                            'click'
                        );
                    }
                } else {
                    $('.tempProvider').empty();
                    if (
                        $(
                            '.newsProviderSearch .newsProviderListNew [provider-name=' +
                            providerObj.providerName +
                            ']'
                        ).length == 0 &&
                        FixedProviderName.indexOf(providerObj.providerName) == -1
                    ) {
                        $('[provider-name= ' + providerObj.providerName + ']').remove();
                        $('.newsProviderListNew').prepend(tempProviderCode);
                        $(
                            '.newsProviderListBox .newsProviderListNew [provider-name=' +
                            providerObj.providerName +
                            ']'
                        ).addClass('providerBoxActive');
                    }
                }
                this.value = '';
                return false;
            },
            focus: function (event, ui) {
                $(this).val(ui.item.uiName);
                return false;
            },
            close: function (event, ui) {
                $('.newsProviderSearchBoxPopUpAutoResult').removeClass(
                    'autoCompleteActive'
                );
            },
            open: function (event, ui) {
                $('.newsProviderSearchBoxPopUpAutoResult').addClass(
                    'autoCompleteActive'
                );
            }
        })
        .autocomplete('instance')._renderItem = function (ul, item) {
        return $('<li>')
            .append('<div>' + escapeHtml(item.uiName) + '</div>')
            .appendTo(ul);
    };
});

function pullUrl(paraName) {
    var url = '';
    switch (paraName) {
        case 'coronavirus':
            url =
                API +
                'newsContent?strategy=152&time=2&tx=coronavirus&count=104&premium=1';
            break;
        case 'life':
            url =
                API +
                'newsContent?strategy=152&time=2&tx=LifeStyle&count=104&premium=1';
            break;
        case 'travel':
            url =
                API + 'newsContent?strategy=152&tx=Travel&time=2&count=104&premium=1';
            break;
        case 'topnewsforDomain':
            url = API + 'newsContent?strategy=160&type=topnews&count=104&premium=1';
            break;
        default:
            url =
                API +
                'newsContent?strategy=128&type=' +
                paraName +
                '&count=104&premium=1';
            break;
    }
    return url;
}

function makeMultipleCall() {
    var selectCat = CategoryObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    var selectPro = ProviderObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    selectedCatLength = selectCat.length;
    let urls = [];

    for (var i = 0; i < selectCat.length; i++) {
        var url = pullUrl(selectCat[i].categoryName);
        var cacheData = getCacheCategoryResponse(url);
        if (!cacheData) {
            urls.push(url);
        }
    }
    if (selectCat.length == 0) {
        var limitToPro = 30;
        for (var j = 0; j < selectPro.length && j < limitToPro; j++) {
            var url = pullUrl('topnewsforDomain') + '&dom=' + selectPro[j].domainName;
            var cacheData = getCacheCategoryResponse(url);
            if (!cacheData) {
                urls.push(url);
            }
        }
    }

    if (urls.length != 0) {
        $('.mainWidgetBottomSecSpt').addClass('showMyFeedLoader');
        $('.articlesDataSpt').addClass('showSkeleton');

        var approved = storageReplacer.getLocalStorageItem('piiAccept');
        if (approved && approved == 1) {
            hitForAllSelectedNews(urls);
        }
    } else {
        // pullAndMergeFromLocal();
    }
}

function hitForAllSelectedNews(urls) {
    fetchDataForNews(urls)
        .then((a) => {
            // console.log('fetching...');
            for (var i = 0; i < a.length; i++) {
                storeCacheCategoryResponse(a[i].url, a[i].data);
            }
            pullAndMergeFromLocal();
        })
        .catch((e) => {
            showHideEmpty(true);
        });
}

const fetchDataForNews = async (names) => {
    const namesLength = names.length;
    let arrBatch = [];
    for (let i = 0; i < namesLength; i += 12) {
        // console.log('batch');
        const requests = names.slice(i, i + 12).map((name) => {
            const url = name;
            return fetchNewsData(url)
                .then((a) => {
                    return a;
                })
                .catch((e) => console.log(`Error in url for ${name} - ${e}`));
        });
        var batchVal = await Promise.all(requests).catch((e) =>
            console.log(`Error in fetching url for the batch ${i} - ${e}`)
        );
        arrBatch.push(...batchVal);
    }
    return arrBatch;
};

const fetchNewsData = function (url) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => response.json()
        ).then(function (respData) {
            resolve({
                url: url,
                data: respData
            });
        }).catch(function (error) {
            resolve({
                url: url,
                data: error
            })
        });


    });
};

function getClusterGrpArticles(mergeCatList) {
    var clusters = {},
        randIndex = 0,
        i = 0;
    for (i = 0; i < mergeCatList.length; i++) {
        var clusterId = mergeCatList[i]['cid'];
        if (!clusterId) {
            clusters[randIndex] = [];
            clusters[randIndex].push(mergeCatList[i]);
            if (!!mergeCatList[i]['ra'] && mergeCatList[i]['ra'].length > 0) {
                clusters[randIndex].push.apply(
                    clusters[randIndex],
                    mergeCatList[i]['ra']
                );
                mergeCatList[i]['ra'] = [];
            }
            randIndex++;
        } else {
            if (!clusters[clusterId]) {
                clusters[clusterId] = [];
            }
            clusters[clusterId].push(mergeCatList[i]);
            if (!!mergeCatList[i]['ra'] && mergeCatList[i]['ra'].length > 0) {
                clusters[clusterId].push.apply(
                    clusters[clusterId],
                    mergeCatList[i]['ra']
                );
                mergeCatList[i]['ra'] = [];
            }
        }
    }
    var finalGrpArr = [],
        clusterList = Object.keys(clusters);
    for (i = 0; i < clusterList.length; i++) {
        var cluster = clusters[clusterList[i]];
        var maxScore = 0,
            bestIndex = 0;
        for (var j = 0; j < cluster.length; j++) {
            if (!!cluster[j]['feedScore'] && maxScore < cluster[j]['feedScore']) {
                bestIndex = j;
                maxScore = cluster[j]['feedScore'];
            }
        }
        var baseArticle = cluster.splice(bestIndex, 1)[0];
        baseArticle['ra'] = cluster;
        finalGrpArr.push(baseArticle);
    }
    // console.log(finalGrpArr);
    return finalGrpArr;
}

function combineProResult() {
    var selectPro = ProviderObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    var mergeCatList = [];
    var limitToPro = 20,
        i = 0;
    for (i = 0; i < selectPro.length && i < limitToPro; i++) {
        var domName = selectPro[i].domainName;
        var pData = getCacheCategoryResponse(
            pullUrl('topnewsforDomain') + '&dom=' + domName
        );
        if (!!pData) {
            mergeCatList = mergeCatList.concat(pData);
        }
    }
    // console.log(mergeCatList);
    var finalGrpArr = getClusterGrpArticles(mergeCatList);
    finalGrpArr.sort((article1, article2) => {
        return article2['cscore'] - article1['cscore'];
    });
    // console.log(finalGrpArr);
    return filterDataBasedOnProvider(finalGrpArr, 'myfeed');
}

function upWeightSelectedProvider(articles, selectedDomain, score) {
    if (selectedDomain.length === 0) return articles;
    for (var i = 0; i < articles.length; i++) {
        if (selectedDomain[articles[i].site]) {
            articles[i]['feedScore'] = articles[i]['feedScore'] + score;
        }
    }
    return articles;
}

function applyCatAndRank(articles, cat) {
    var catScore = {
        usnews: 1,
        world: 0.99,
        coronavirus: 0.97,
        'election-2020': 0.98,
        life: 0.91,
        travel: 0.9,
        technology: 0.95,
        science: 0.93,
        business: 0.97,
        sports: 0.95,
        entertainment: 0.95,
        health: 0.92
    };
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        article['sourceCat'] = cat;
        var score = (articles.length - i) * catScore[cat];
        article['feedScore'] = score;
        if (!!articles[i]['ra']) {
            for (var j = 0; j < article['ra'].length; j++) {
                var relatedArticle = article['ra'][j];
                relatedArticle['sourceCat'] = cat;
                relatedArticle['feedScore'] = score;
            }
        }
    }
    return articles;
}

function combineCatResultByRank() {
    // console.log('combineCatResultByRank called ');
    var selectCat = CategoryObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    selectCat = selectCat.length === 0 ? CategoryObj : selectCat;
    var i = 0,
        catName = '',
        grpArticles = [];
    for (i = 0; i < selectCat.length; i++) {
        catName = selectCat[i].categoryName;
        var articleResponse = getCacheCategoryResponse(pullUrl(catName));
        applyCatAndRank(articleResponse, catName);
        grpArticles.push.apply(grpArticles, articleResponse);
    }
    // console.log(grpArticles);
    grpArticles = getClusterGrpArticles(grpArticles);
    // console.log(grpArticles);
    filterDataBasedOnProvider(grpArticles, 'myfeed');
    var userProviderData = storageItemAcquire('providerDataOfUser');
    var preferedDomains = {};
    for (i = 0; i < userProviderData.length; i++) {
        if (!!userProviderData[i].selected) {
            preferedDomains[userProviderData[i].domainName] = true;
        }
    }
    upWeightSelectedProvider(grpArticles, preferedDomains, 2000);
    grpArticles.sort((article1, article2) => {
        return article2['feedScore'] - article1['feedScore'];
    });

    // console.log('after feedScore sorting ', grpArticles);
    var aidList = {};
    for (i = 0; i < grpArticles.length; i++) {
        if (!!aidList[grpArticles[i].aid]) {
            grpArticles.splice(i, 1);
        } else {
            aidList[grpArticles[i].aid] = true;
        }
    }
    // console.log('removing duplicate .. ', grpArticles);
    return filterDataBasedOnProvider(grpArticles, 'myfeed');
}

function makingMyFeeds() {
    var selectCat = CategoryObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });

    var selectPro = ProviderObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    if (selectCat.length == 0 && selectPro.length == 0) {
        console.log('myfeed empty');
        showHideEmpty(
            true,
            'Please select your preferred news categories and sources by clicking on settings.'
        );
    } else {
        showHideEmpty(false);
        $('.articlesMainBox .articlesBox').remove();
        makeMultipleCall();
    }
}

function constructCacheKey(urlString) {
    let url = new URL(urlString);
    var search = url.search.substring(1);
    var searchObj = JSON.parse(
        '{"' +
        decodeURI(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    );
    var strategy = searchObj.strategy;
    var type_tx = searchObj.tx ? searchObj.tx : searchObj.type;
    var domain = !!searchObj.dom ? searchObj.dom : '';
    var key = strategy + type_tx + domain;
    return key;
}

var localDataNotStore = {};

function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getCacheCategoryResponse(urlString) {
    var key = constructCacheKey(urlString);
    if (checkcacheExpiry(key)) {
        var dataVal = copyObj(localDataNotStore[key]);
        return dataVal.data.resultSet;
    } else {
        return false;
    }
}

function storeCacheCategoryResponse(urlString, data) {
    var ncObj = [
        {key: 'coronavirus', val: 'coronavirus'},
        {key: 'Travel', val: 'travel'},
        {key: 'LifeStyle', val: 'life'}
    ];
    var key = constructCacheKey(urlString);
    for (var i = 0; i < ncObj.length; i++) {
        if (urlString.indexOf(ncObj[i].key) != -1) {
            data = updateObjCategory(data, ncObj[i].val);
            break;
        }
    }
    var response = {};
    response.data = data;
    response.time = new Date();
    localDataNotStore[key] = copyObj(response);
}

function updateObjCategory(data, catName) {
    var cpData = copyObj(data);
    var articles = cpData.resultSet;
    if (!!articles) {
        for (var i = 0; i < articles.length; i++) {
            articles[i]['maCatName'] = catName;
        }
    }

    var response = {};
    response.size = cpData.size;
    response.resultSet = articles;
    response.status = cpData.status;
    return response;
}

function checkcacheExpiry(key) {
    var dataExpiryTime = 15;
    var categoryObj = localDataNotStore[key];
    categoryObj = !!categoryObj ? categoryObj : '';

    if (!categoryObj) {
        return false;
    }

    var timer = dataExpiryTime * 60 * 1000;
    var res = new Date() - new Date(categoryObj.time);
    if (res > timer) return false;
    return true;
}

function pullAndMergeFromLocal() {
    // console.log('pull and merge...');
    var resultCat;
    var selectCat = CategoryObj.filter(function (eleData) {
        if (eleData.selected) {
            return eleData;
        }
    });
    if (selectCat.length == 0) {
        // console.log('combine provider data');
        resultCat = combineProResult();
    } else {
        resultCat = combineCatResultByRank();
    }
    var finalResult = resultCat.slice(0, 104);
    resetResLoad();
    sliderArticlesLoad.resultSize = 8;
    sliderArticlesLoad.sliderArcticleResult = makeSliderOrderForMyFeedInOrder(
        finalResult
    );

    widArticlesLoad.resultSize = 6;
    widArticlesLoad.widArcticleResult = finalResult.slice(1, 7);
    finalResult = finalResult.slice(7);

    newsLoadCond.newsResult = finalResult;
    var size = finalResult.length;
    newsLoadCond.overallThreshold = size - (size % 12);
    newsLoadCond.newsResult = finalResult;
    $('.bottomThirdParties').remove();
    responseHtmlForArticle();

    addWidgetArticles('myfeed');
    $('.articlesDataSpt').removeClass('showSkeleton');
}

function makeSliderOrderForMyFeedInOrder(finalResult) {
    var coroseulArticles = [];
    for (
        var i = 0;
        i < finalResult.length && coroseulArticles.length < 8;
        i = i + 3
    ) {
        coroseulArticles.push(finalResult[i]);
    }
    return coroseulArticles;
}


var temperatureMainData = {},
    index = 0;

function performDomLoaded() {
    scrollEvent();
    displayDateTimeFunc({
        date: '#currentDate',
        time: '#currentTime'
    });
    $('.closeOptin').click(function () {
        $('.optinPageFrameMain').hide();
    });
}

/* PII js */

var acceptButton = $('.accept');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');
// var denyTerms = $('#denytTerms');
var denyTerms = $('.know-more');
var piiAccept = 'piiAccept';
acceptButton.on('click', function (e) {
    // closePiiWidget();
    chrome.runtime.sendMessage(
        {task: 'showOptInPage'},
        function (response) {
        }
    );
    // document.dispatchEvent(new Event('showOptInPage'));
});

denyTerms.on('click', function (e) {
    closePiiWidget();
});

document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(function () {
        allowWidget.hide();
        checkPiiStored();
        domLoadedScript();
    });
});


chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'piiAccept' && newValue === '1') {
            allowWidget.show();
            acceptTerm.hide();
            $('body').removeClass('optinActive');

            document.dispatchEvent(
                new CustomEvent('piiAccept', {
                    detail: true
                })
            );
            getCovidDataOnLoad();

        } else if (key === 'piiAccept' && newValue === '-1') {
            allowWidget.hide();
            acceptTerm.show();
            $('body').addClass('optinActive');

            document.dispatchEvent(
                new CustomEvent('piiAccept', {
                    detail: false
                })
            );
        }
    }
});

function getCovidDataOnLoad(){
    var parmSettingsForCall = {
        apiCall: apiWorldStatsUrl,
        value: '',
        forWhich: 'USA'
    };
    var approved = storageReplacer.getLocalStorageItem('piiAccept');
    if (approved && approved == 1) {
        getCovidCasesValues(parmSettingsForCall, true);
    }
    document.addEventListener('activateCovidWidget', function (e) {
        var ACTIVATE_COVIDWIDGET = e.detail;
        if (ACTIVATE_COVIDWIDGET) {
            getCovidCasesValues(parmSettingsForCall, true);
        }
    });
}

function domLoadedScript() {
    var approved = storageReplacer.getLocalStorageItem('piiAccept');
    if (approved && approved == 1) {
        renderTrendingKw();
        }
    document.addEventListener('activateTopStrip', function (e) {
        var ACTIVATE_TOPSTRIP = e.detail;
        if (ACTIVATE_TOPSTRIP) {
            renderTrendingKw();
        }
    });

    getCovidDataOnLoad();

    var approved = storageReplacer.getLocalStorageItem('piiAccept');
    if (approved && approved == 1) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        loadOnPiiApprove();
    }
    performDomLoaded();
}

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        allowWidget.show();
        acceptTerm.hide();

        document.dispatchEvent(
            new CustomEvent('piiAccept', {
                detail: true
            })
        );
    } else if (!accepted || accepted == -1) {
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(
            new CustomEvent('piiAccept', {
                detail: false
            })
        );

        var firstTimeNT = parseInt(storageReplacer.getLocalStorageItem('firstNtVisible'));
        if (firstTimeNT == 1) {
            storageReplacer.setLocalStorageItem('customAllow', -1);
            $('html,body').animate({
                scrollTop: 0
            });
        } else {
            storageReplacer.setLocalStorageItem('firstNtVisible', 1);
            scrollEvent().clickScroll();
        }
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(new Event('searchTextChanged'));
        document.dispatchEvent(
            new CustomEvent('piiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}

/* PII js end */

(function () {
    var loadFirstTime = false;
    document.addEventListener('piiAccept', function (e) {
        var PII_ACCEPT = e.detail;

        switch (PII_ACCEPT) {
            case 'cancel':
                $('html,body').animate({
                    scrollTop: 0
                });
                break;
            case true:
                if (!loadFirstTime) {
                    renderTrendingKw();
                    loadOnPiiApprove();
                    loadFirstTime = true;
                }
                break;
        }
    });
})();


