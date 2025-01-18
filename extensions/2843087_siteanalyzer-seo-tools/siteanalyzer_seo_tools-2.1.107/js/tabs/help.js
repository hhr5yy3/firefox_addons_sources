document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".js-help-link").forEach(linkEl => {
        linkEl.addEventListener("click", (e) => {
            e.preventDefault();
            const toKey = linkEl.dataset.toKey
            if(toKey) {
                const browserApi = typeof browser !== "undefined" ? browser : chrome;
                browserApi.tabs.create({ url: translate(toKey) });
            }
        })
    })
})