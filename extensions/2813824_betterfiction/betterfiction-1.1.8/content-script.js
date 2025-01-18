

var states
chrome.runtime.sendMessage({message: "get-info"}, response => { 
    states = response.result;
})

async function main() {
    const messagePromise = new Promise((resolve) => {
            chrome.runtime.sendMessage({ message: "get-info" }, response => { 
            resolve(response.result);
        })
    })

    states = await messagePromise;

    // Allow copy text
    if (states.allowCopy) {
        document.querySelectorAll("p").forEach(el => el.style.userSelect = "text");
    }

    // Create Bookmarks list button
    if (states.bookmarkButton) {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = `<a href="${chrome.runtime.getURL("tabs/bookmarks/bookmarks.html")}" style="margin-left: 10px;"><img src="${chrome.runtime.getURL("icons/bookmark3.png")}" style="vertical-align: middle; cursor: default;" title="Favorite Stories" width="20" height="20"></a>`
        // newSpan.innerHTML = `<img src="${chrome.runtime.getURL("icons/bookmark3.png")}" style="vertical-align: middle; cursor: default; margin-left: 12px" title="Bookmarks list" width="20" height="20">`
        newSpan.id = "openBookmarkList";
        document.querySelector("div").querySelector("div").appendChild(newSpan);

        newSpan.addEventListener('click', event => {
            chrome.runtime.sendMessage({ message: "open-html-page", fileName: "tabs/bookmarks/bookmarks.html"});
        })
    }

     // Create my fic list button
     if (states.myFicList) {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = `<img src="${chrome.runtime.getURL("icons/list.png")}" style="vertical-align: middle; cursor: default; margin-left: 12px" title="My fic list" width="20" height="20">`
        newSpan.id = "openMyFicList";
        document.querySelector("div").querySelector("div").appendChild(newSpan);

        newSpan.addEventListener("click", () => {
            chrome.runtime.sendMessage({ message: "open-html-page", fileName: "tabs/my-list/my-list.html"});
        })
    }

    // Heart and book on the top bar
    if (states.shortcuts) {
        const root = document.createElement("div");
        root.style.position = "relative";
        root.style.display = "inline-block";
        root.style.marginBottom = "0px";
        const shadowRoot = root.attachShadow({mode: "open"});

        const topMenu = document.querySelector("div").querySelector("div");
                
        const newTop = document.createElement("span");
        const linkHeart = chrome.runtime.getURL("icons/heart.png");
        const linkBook = chrome.runtime.getURL("icons/book.png");

        newTop.innerHTML = `<a href="https://www.fanfiction.net/favorites/story.php" style="margin-left: 10px;"><img src="${linkHeart}" style="vertical-align: middle; cursor: default;" title="Favorite Stories" width="20" height="20"></a>
        <a href="https://www.fanfiction.net/alert/story.php" style="margin-left: 8px;"><img src="${linkBook}" style="vertical-align: middle; cursor: default;" title="Followed Stories" width="20" height="20"></a>`;

        shadowRoot.appendChild(newTop)
        topMenu.appendChild(root)
    }

    // block advertisements 
    document.querySelectorAll(`[title="Advertisement"]`).forEach(el => {
        el.remove();
    })
    advBar = document.querySelector(`[style="text-align:center;padding-top:5px;background-color: #f6f7ee;"]`);
    if (advBar) {
        advBar.remove();
    }

}


if (document.querySelector("div").querySelector("div") && document.querySelector("div").querySelector("div").classList[0] === "menulink") { // page check
    main();
}

