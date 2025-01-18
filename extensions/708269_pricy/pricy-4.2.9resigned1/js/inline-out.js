(function () {
    var CurrentUrlService = function () {
        var getUrl = function () {
            return new Promise(function (resolve, reject) {
                if (chrome.tabs) {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs) {
                        resolve(tabs[0].url);
                    });
                } else {
                    resolve(window.location.href);
                }
            });
        };
        var getTitle = function () {
            return new Promise(function (resolve, reject) {
                if (chrome.tabs) {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs) {
                        resolve(tabs[0].title);
                    });
                } else {
                    resolve(document.title);
                }
            });
        };

        return {
            getUrl: getUrl,
            getTitle: getTitle
        };
    }();

    window.pricy = {};
    window.pricy.loadContent = function () {
        document.getElementById("pricy-iframe").onload = function () {
            var $iframe = $(this);
            $("#pricy-loading-icon").fadeOut("fast", function () {
                $iframe.fadeIn("fast");
            });
        };

        CurrentUrlService.getUrl().then(function (currentUrl) {
            CurrentUrlService.getTitle().then(function (title) {
                var host = "https://www.pricy.ro";
                var path = `${host}/extensionhtml`;
                var version = chrome.runtime.getManifest().version;
                var browser = 'Firefox';
                var queryString = `url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&v=${version}-${browser}`;
                var url = `${path}?${queryString}`;

                $("#pricy-iframe").attr('src', url);
            });
        });
    };
})();
$(function () {
    var originalLeave = $.fn.popover.Constructor.prototype.leave;

    $.fn.popover.Constructor.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        var container, timeout;

        originalLeave.call(this, obj);

        if (obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover');
            timeout = self.timeout;
            container.one('mouseenter', function () {
                clearTimeout(timeout);
                container.one('mouseleave', function () {
                    $.fn.popover.Constructor.prototype.leave.call(self, self);
                });
            });
        }
    };

    function getFile(img) {
        return chrome.extension.getURL(img);
    }

    $('body').on('click', function (e) {
        var $target = $(e.target);
        if ($target.data('toggle') !== 'popover' && $target.parents('.popover.in').length === 0) {
            var $pricyTrigger = $("#pricy-trigger");
            if ($pricyTrigger.length > 0) {
                $pricyTrigger.popover('hide');
            }
        }
    });

    var getLocation = function (href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    };

    (function addRecommendationToPage(url) {
        var hostname = getLocation(url).hostname.replace("www.", "");

        chrome.runtime.sendMessage({
            message: "getInPagePopupXPath",
            hostname: hostname
        }, function (response) {
            if (!response) {
                return;
            }
            if (!response.inPagePopupXPath) {
                return;
            }
            var retailerPriceElement = $(response.inPagePopupXPath);
            if (retailerPriceElement.length === 0) {
                return;
            }

            var pricyHtml = '<div id="pricy-container" class="' + hostname.replace(".", "-") + '"><img ns-popover-trigger="mouseenter" ns-popover-timeout="10" ns-popover-hide-on-click="true" ns-popover-template="myPopoverTemplate" ns-popover ns-popover-placement="bottom" id="pricy-trigger" src="' + getFile('icon48.png') + '" style="width:32px; height:32px;"/></div>';

            $('body').append(pricyHtml);

            var pricyDiv = $('#pricy-container');
            new Tether({
                element: pricyDiv,
                target: retailerPriceElement,
                attachment: 'top left',
                targetAttachment: 'top right',
                offset: '0px 0px'
            });

            $('#pricy-trigger').popover({
                html: true,
                trigger: 'hover',
                placement: 'bottom',
                content: function () {
                    return '<div id="pricy" class="pricy-wrapper"><div id="pricy-loading-icon"></div><iframe id="pricy-iframe" src="" frameborder="0" width="100%" height="100%"></iframe></div>';
                },
                delay: {
                    show: 0,
                    hide: 10000
                }
            });

            $('#pricy-trigger').on("shown.bs.popover", function () {
                window.pricy.loadContent();
            });
        });
    })(window.location.href);
});