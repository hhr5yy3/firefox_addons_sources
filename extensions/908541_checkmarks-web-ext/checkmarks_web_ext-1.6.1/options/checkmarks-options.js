/**
 * Class for the options page.
 * @constructor
 */
function CheckmarksOptions() {

    const requestTimeoutInput = document.getElementById('request-timeout');
    const timeoutOverruleInput = document.getElementById('timeout-overrule');
    const maxTabsInput = document.getElementById('max-tabs');
    const ignoredDirsInput = document.getElementById('ignored-dirs');
    const ignoredDirsCheckbox = document.getElementById('ignored-dirs-active');
    const includedDirsInput = document.getElementById('included-dirs');
    const includedDirsCheckbox = document.getElementById('included-dirs-active');
    const ignoredUrlsInput = document.getElementById('ignored-urls');
    const ignoredUrlsCheckbox = document.getElementById('ignored-urls-active');
    const showFaviconsCheckbox = document.getElementById('show-favicons');
    const toLowercaseCheckbox = document.getElementById('to-lowercase');
    const doSort = document.getElementById('sort');
    const sortUnfiledByDate = document.getElementById('sort-unfiled-by-date');
    const clearCacheCheckbox = document.getElementById('clear-cache');

    /**
     * Registers event-listeners to store options on input and retrieve them on load.
     */
    this.init = function () {
        document.addEventListener('DOMContentLoaded', restoreOptions);
        document.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', setOptions);
        });
    };

    /**
     * Updates all stored options with current values. K.I.S.S...
     */
    let setOptions = function () {
        browser.storage.local.set({
            options: {
                requestTimeout: requestTimeoutInput.value,
                timeoutOverrule: timeoutOverruleInput.value,
                maxTabs: maxTabsInput.value,
                ignoredDirs: ignoredDirsInput.value,
                ignoredDirsActive: ignoredDirsCheckbox.checked,
                includedDirs: includedDirsInput.value,
                includedDirsActive: includedDirsCheckbox.checked,
                ignoredUrls: ignoredUrlsInput.value,
                ignoredUrlsActive: ignoredUrlsCheckbox.checked,
                showFavicons: showFaviconsCheckbox.checked,
                toLowercase: toLowercaseCheckbox.checked,
                doSort: doSort.checked,
                sortUnfiledByDate: sortUnfiledByDate.checked,
                clearCache: clearCacheCheckbox.checked
            }
        });
    };

    /**
     * Restores options from local storage or sets default values.
     */
    let restoreOptions = function () {
        browser.storage.local.get()
            .then((storage) => {
                const options = storage.options || {};
                requestTimeoutInput.value = options.requestTimeout || CM_DEFAULTS.getTimeout();
                timeoutOverruleInput.value = options.timeoutOverrule || CM_DEFAULTS.getTimeoutOverrule();
                maxTabsInput.value = options.maxTabs || CM_DEFAULTS.getMaxTabs();
                ignoredDirsInput.value = options.ignoredDirs || CM_DEFAULTS.getIgnoredDirs();
                ignoredDirsCheckbox.checked = options.ignoredDirsActive || CM_DEFAULTS.getIgnoredDirsActive();
                includedDirsInput.value = options.includedDirs || CM_DEFAULTS.getIncludedDirs();
                includedDirsCheckbox.checked = options.includedDirsActive || CM_DEFAULTS.getIncludedDirsActive();
                ignoredUrlsInput.value = options.ignoredUrls || CM_DEFAULTS.getIgnoredUrls();
                ignoredUrlsCheckbox.checked = options.ignoredUrlsActive || CM_DEFAULTS.getIgnoredUrlsActive();
                showFaviconsCheckbox.checked = options.showFavicons || CM_DEFAULTS.getShowFavicons();
                toLowercaseCheckbox.checked = options.toLowercase || CM_DEFAULTS.getToLowercase();
                doSort.checked = options.doSort || CM_DEFAULTS.doSort();
                sortUnfiledByDate.checked = options.sortUnfiledByDate || CM_DEFAULTS.sortUnfiledByDate();
                clearCacheCheckbox.checked = options.clearCache || CM_DEFAULTS.getClearCache();
            });
    };
}

const checkmarksOptions = new CheckmarksOptions();
checkmarksOptions.init();
