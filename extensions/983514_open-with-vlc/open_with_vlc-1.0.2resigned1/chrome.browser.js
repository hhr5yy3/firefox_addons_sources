/**
 * Permet d'utiliser "browser" sur chrome
 */
if (typeof(browser) == "undefined") {
    window.browser = chrome;
    browser = chrome;
}
