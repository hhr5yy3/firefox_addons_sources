browser.tabs.onCreated.addListener((tab) => {
    if (tab.pendingUrl === "about:newtab" || tab.url === "about:newtab") {
        browser.tabs.update(tab.id, { url: "https://ya.ru" });
    }
});
