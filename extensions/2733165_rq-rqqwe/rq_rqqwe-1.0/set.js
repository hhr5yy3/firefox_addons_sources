browser.browserAction.onClicked.addListener ( () => {
    alert(123)
    browser.tabs.create ( {
        url : "settings.html"
    } );
} )