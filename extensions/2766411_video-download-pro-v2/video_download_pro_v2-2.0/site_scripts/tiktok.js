let b = new LoaderButton("_fullscreen");
instances.push(b);

b.AddButton = (function () {
    let page_url = this.lastAddress;

    let Row = document.getElementsByClassName("video-infos-container")[0];
    if ((typeof Row === "undefined") || (Row === null)) return;

    let Exist = this.DoButtonsExist(); // They could be the buttons of an old url. This just checks whether they exist or not.
    if (Exist) {
        let UpToDate = this.AreButtonsUpToDate(page_url); // Are the download links correct for the current video?
        if (UpToDate) {
            return; // If buttons exist and they have the correct DL links, then exit function.
        } else {
            this.CleanPrevious(); // If they exist but they have an older URL, then delete them.
        }
    }
    // If function reaches here, that either means buttons have never existed on the page
    // or they existed and they had old links, so CleanPrevious() deleted them.
    // Either way, now our page is clean of buttons, so lets add them:
    let download_button = this.BigBlueButtonCreator();

    Row.style.overflow="visible";
    Row.insertBefore(download_button, Row.children[1])
    let download_options_list = this.createList(page_url);

    download_options_list.style.left = "auto";
    download_options_list.style.right = "0px";
    download_button.appendChild(download_options_list);

}).bind(b);


let c = new LoaderButton("_main");
instances.push(c);

c.AddButton = (function () {
    let page_url = this.lastAddress;


    let Row = document.getElementsByClassName("tt-video-music item-music-info-V4")[0];
    if ((typeof Row === "undefined") || (Row === null)) return;
    if (!page_url.includes("video")) return;

    let Exist = this.DoButtonsExist(); // They could be the buttons of an old url. This just checks whether they exist or not.
    if (Exist) {
        let UpToDate = this.AreButtonsUpToDate(page_url); // Are the download links correct for the current video?
        if (UpToDate) {
            return; // If buttons exist and they have the correct DL links, then exit function.
        } else {
            this.CleanPrevious(); // If they exist but they have an older URL, then delete them.
        }
    }
    // If function reaches here, that either means buttons have never existed on the page
    // or they existed and they had old links, so CleanPrevious() deleted them.
    // Either way, now our page is clean of buttons, so lets add them:
    let download_button = this.BigBlueButtonCreator();

    Row.style.overflow="visible";
    Row.style.maxWidth="100%";
    Row.style.display="flex";
    Row.style.justifyContent="space-between";
    Row.style.top="10px";
    Row.appendChild(download_button);

    let download_options_list = this.createList(page_url);

    download_options_list.style.left = "auto";
    download_options_list.style.right = "0px";
    download_button.appendChild(download_options_list);

}).bind(c);

