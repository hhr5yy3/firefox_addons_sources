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

    let videos = document.getElementsByTagName("video");
    if (videos.length > 0) {

        let BestContainer = document.querySelector("div[data-test-id='UnauthBestPinCardBodyContainer']");
        let ActionBar = document.querySelector("div[data-test-id='closeupActionBar']");

        let download_button = this.BigBlueButtonCreator();
        let download_options_list = this.createList(page_url);
        if (!(BestContainer === null)) { // When you are not logged in
            let Row = BestContainer.children[0].children[0];
            let InnerRow = Row.children[0];

            Row.style.display = "flex";
            Row.style.flexDirection = "row";
            InnerRow.style.width = "auto";
            Row.insertBefore(download_button, InnerRow);
            download_button.appendChild(download_options_list);
        }
        else if (!(ActionBar === null)) { // When logged in
            let Row = ActionBar.children[0];
            let Save = Row.children[1];

            Row.insertBefore(download_button, Save);
            download_button.appendChild(download_options_list);
        }
    }
}).bind(b);


