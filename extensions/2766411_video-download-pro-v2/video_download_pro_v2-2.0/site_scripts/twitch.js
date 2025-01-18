let b = new LoaderButton();
instances.push(b);

b.AddButton = (function () {
    let page_url = this.lastAddress;
    // If the twitch url is a video page, it will have the form twitch.tv/videos/1234567890
    // By checking the existence of string "videos" in url, we make sure there are no
    // download buttons in live streams.
    if(!page_url.includes("videos") && !page_url.includes("clip") ){
        this.CleanPrevious();
        return;
    }

    let Exist = this.DoButtonsExist(); // They could be the buttons of an old url. This just checks whether they exist or not.
    if (Exist) {
        let UpToDate = this.AreButtonsUpToDate(page_url); // Are the download links correct for the current video?
        if (UpToDate) {
            return; // If buttons exist and they have the correct DL links, then exit function.
        } else {
            this.CleanPrevious(); // If they exist but they have an older URL, then delete them.
        }
    }

    let RightMenu = document.querySelector("div[data-target='channel-header-right']");
    let RightMenuExists = !(typeof RightMenu === "undefined") && !(RightMenu === null);
    if (!RightMenuExists) return;
    let FollowButton = RightMenu.firstChild;
    let FollowButtonExists = !(typeof FollowButton === "undefined") && !(FollowButton === null);
    if (!FollowButtonExists) return;

    let download_button = this.BigBlueButtonCreator();
    RightMenu.appendChild(download_button);
    let download_options_list = this.createList(page_url);
    download_button.style.fontSize = "1.5rem";
    download_button.style.fontWeight = "550";
    download_button.style.padding = "4px 8px";
    download_options_list.style.fontSize = "1.5rem";
    download_options_list.style.left = "auto";
    download_options_list.style.right = "0px";
    download_button.appendChild(download_options_list);
}).bind(b);

