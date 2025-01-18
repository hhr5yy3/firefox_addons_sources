/**
 * This JS file will get injected into Flipboard's bookmarklet login page
 */

// Wait with operations until the DOM is ready...
document.addEventListener('DOMContentLoaded', function() {
    // Hacky way to test whether Flipboard login page is loaded in the popup (our addon is loading it)
    // or a normal window/tab (not our addon is loading it).
    // We should alter the page contents only if our addon is loading it.
    if (window.location.href.indexOf('fromFlipThisAddon') > -1) {
        // Replace social login buttons (Google, Facebook) with explanation text
        var ctrButtons = document.getElementsByClassName('ctr-buttons');
        if (ctrButtons.length > 0) {
            var textForSSOLogin = document.createElement('div');
            textForSSOLogin.id = 'how-to-login-using-sso';
            textForSSOLogin.innerHTML = 'If you want to sign in with Facebook or Google, please use\
                <br>the <a href="https://flipboard.com/signin">official Flipboard sign in page</a>,\
                then you can use this button.';
            ctrButtons[0].parentNode.insertBefore(textForSSOLogin, ctrButtons[0]);
            ctrButtons[0].parentNode.removeChild(ctrButtons[0]);
        }
        // Remove available links, we do not need them here
        var availableLinks = document.getElementsByClassName('available-links');
        if (availableLinks.length > 0) {
            availableLinks[0].parentNode.removeChild(availableLinks[0]);
        }
    }
}, false);
