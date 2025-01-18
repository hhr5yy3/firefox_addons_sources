const SEARCH_URL = `https://translate.yandex.com/`;

browser.omnibox.setDefaultSuggestion({
    description: `Yandex Translate (e.g. en es hello)`
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
    let url = buildSearchURL(text);

    switch (disposition) {
        case "currentTab":
            browser.tabs.update({url});
            break;
        case "newForegroundTab":
            browser.tabs.create({url});
            break;
        case "newBackgroundTab":
            browser.tabs.create({url, active: false});
            break;
    }
});

function buildSearchURL(text) {
    let parts = text.split(' ');

    return `${SEARCH_URL}?lang=${parts[0]}-${parts[1]}&text=${parts.slice(2).join(" ")}`;
}


