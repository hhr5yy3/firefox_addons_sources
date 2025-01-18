let b = new LoaderButton();
instances.push(b);

b.AddButton = (function () {
    let page_url = this.lastAddress;
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

    let url = new URL(page_url);
    v = url.searchParams.get("v");
    list = url.searchParams.get("list"); // Keeping this in case they want me to add the playlist download functionality.

    if (!!v) //if it is a video; it must have GET parameter "v". So we check the existence of v.
    {
        let download_button = this.BigBlueButtonCreator();
        download_button.style.fontSize = "1.5rem";

        const unique_parent = document.getElementById("description-and-actions");
        
        if (unique_parent) {
            const menu = unique_parent.querySelector(".ytd-menu-renderer");
            menu.prepend(download_button);
        } else {
            // Old UI
            const TOP_ROW = document.
                getElementById("meta-contents").
                children[0].
                children[0].
                children[0];
            const SUB_BUTTON = TOP_ROW.children[1];
            TOP_ROW.insertBefore(download_button, SUB_BUTTON);
        }



        let download_options_list = this.createList(page_url);
        download_options_list.style.fontSize = "1.5rem";
        download_button.appendChild(download_options_list);

    }
}).bind(b);

