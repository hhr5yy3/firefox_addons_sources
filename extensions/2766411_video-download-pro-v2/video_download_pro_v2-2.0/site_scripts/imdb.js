let b = new LoaderButton();
instances.push(b);

b.AddButton = (function () {
    let page_url = this.lastAddress;

    let box = document.getElementsByTagName("main")[0].firstChild.firstChild.firstChild.children[1].firstChild.children[2];
    if ((typeof box === "undefined") || (box === null)) return;

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
    download_button.style.fontSize = "1rem";
    download_button.style.padding = "0px 8px";
    box.insertBefore(download_button, box.firstChild);
    let download_options_list = this.createList(page_url);
    download_options_list.style.fontSize = "1rem";
    download_button.appendChild(download_options_list);

}).bind(b);
