/* jshint esversion: 6 */

(function () {
    'use strict';

    var iframeUrl = document.getElementById('iframeUrl'),
        apiUrl = document.getElementById('apiUrl'),
        iframeWidth = document.getElementById('iframeWidth'),
        showlistingprice = document.getElementById('showlistingprice'),
        contribute = document.getElementById('contribute'),
        removeAds = document.getElementById('removeAds'),
        takealotSelector = document.getElementById('takealotSelector'),
        geewizSelector = document.getElementById('geewizSelector'),
        wootwareSelector = document.getElementById('wootwareSelector'),
        diyelectronicsSelector = document.getElementById('diyelectronicsSelector'),
        evetechSelector = document.getElementById('evetechSelector'),
        incredibleSelector = document.getElementById('incredibleSelector'),
        hifiSelector = document.getElementById('hifiSelector'),
        miaSelector = document.getElementById('miaSelector'),
        roboticsSelector = document.getElementById('roboticsSelector'),
        yuppiechefSelector = document.getElementById('yuppiechefSelector'),
        makroSelector = document.getElementById('makroSelector'),
        saveButton = document.getElementById('save-button');

    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function () {
        chrome.storage.local.get("setting", function (fetchedData) {
            let settings = fetchedData.setting;

            if (typeof settings === 'undefined') {
                return;
            }

            if (settings.contribute) {
                contribute.checked = true;
            } else {
                contribute.checked = false;
            }

            if (settings.removeAds) {
                removeAds.checked = true;
            } else {
                removeAds.checked = false;
            }

            iframeUrl.value = settings.iframeUrl;
            apiUrl.value = settings.apiUrl;
            iframeWidth.value = settings.iframeWidth;
            showlistingprice.value = settings.showlistingprice;
            takealotSelector.value = settings.takealotSelector;
            geewizSelector.value = settings.geewizSelector;
            wootwareSelector.value = settings.wootwareSelector;
            diyelectronicsSelector.value = settings.diyelectronicsSelector;
            evetechSelector.value = settings.evetechSelector;
            incredibleSelector.value = settings.incredibleSelector;
            miaSelector.value = settings.miaSelector;
            roboticsSelector.value = settings.roboticsSelector;
            hifiSelector.value = settings.hifiSelector;
            yuppiechefSelector.value = settings.yuppiechefSelector;
            makroSelector.value = settings.makroSelector;

            M.updateTextFields();
            M.toast({ html: 'Settings Loaded' });
        });

        saveButton.addEventListener('click', saveSettings);

        document.addEventListener('keypress', function (e) {
            if (e.which !== 13) {
                return;
            }

            saveSettings();
        });
    });

    function saveSettings() {
        var settings = {
            'contribute': contribute.checked,
            'removeAds': removeAds.checked,
            'iframeUrl': iframeUrl.value || 'https://scrapy.co.za/',
            'apiUrl': apiUrl.value || 'https://api.scrapy.co.za/',
            'iframeWidth': iframeWidth.value || '100%',
            'showlistingprice': showlistingprice.value || 'True',
            'takealotSelector': takealotSelector.value || '.pdp-main-panel',
            'geewizSelector': geewizSelector.value || '#main > div.product-main-container.row.bg-transparent.pl-0.pr-0 > div.block-content.mb-1.col-xl-8.col-lg-8.col-md-12.col-sm-12.col-xs-12.col-sp-12 > div.bg-white.p-1',
            'wootwareSelector': wootwareSelector.value || 'div.product-essential',
            'diyelectronicsSelector': diyelectronicsSelector.value || '#center_column > div > div.primary_block.row',
            'evetechSelector': evetechSelector.value || 'div > div.pb-3.row',
            'incredibleSelector': incredibleSelector.value || '.product-info-left-row.product-col-block',
            'hifiSelector': hifiSelector.value || '.product-info-left-row.product-col-block',
            'miaSelector': miaSelector.value || 'div.product-images-summary',
            'roboticsSelector': roboticsSelector.value || '#content > div.row > div.col-sm-8 > ul.thumbnails',
            'yuppiechefSelector': yuppiechefSelector.value || '.product-content__section',
            'makroSelector': makroSelector.value || 'div[data-testid="pdpProductDesSpecs"]'
        };

        chrome.storage.local.set({ "setting": settings });

        M.toast({ html: 'Settings Saved!' });
    }
})();