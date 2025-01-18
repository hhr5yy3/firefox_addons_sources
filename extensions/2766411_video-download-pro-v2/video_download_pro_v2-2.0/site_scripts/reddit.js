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

    let PostContent = document.querySelector("div[data-test-id='post-content']");
    if ((typeof PostContent === "undefined") || (PostContent === null)) return;
    let video = PostContent.getElementsByTagName("video");
    let embedded = PostContent.getElementsByTagName("iframe");
    if ((video.length > 0) || (embedded.length > 0)) {
        let Row = PostContent.children[2];
        Row.style.overflow = "visible";
        let download_button = this.BigBlueButtonCreator();
        download_button.style.fontSize = "0.7rem";
        Row.appendChild(download_button);
        let download_options_list = this.createList(page_url);
        download_options_list.style.fontSize = "0.7rem";
        download_button.appendChild(download_options_list);
    }
}).bind(b);



