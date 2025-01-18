let miniPlayerDownloader = new LoaderButton("_mini");
instances.push(miniPlayerDownloader);

miniPlayerDownloader.AddButton = (function () {
    let page_url = this.lastAddress;

    let miniPlayerLink = document.getElementsByClassName("playbackSoundBadge")[0].children[0];
    let isMiniPlayer = !(typeof miniPlayerLink === "undefined") && !(miniPlayerLink === null);

    if(isMiniPlayer){
        page_url = document.getElementsByClassName("playbackSoundBadge")[0].children[0].href;
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
        let download_button = this.BigBlueButtonCreator(up = true); // Makes and up arrow ▲ next to Download text (It is downward ▼ by default)
        document.getElementsByClassName("playbackSoundBadge")[0].appendChild(download_button);
        let download_options_list = this.createList(page_url);
        download_options_list.style.top = "auto";
        download_options_list.style.bottom = "40px";
        download_button.appendChild(download_options_list);
    }

}).bind(miniPlayerDownloader);

let bigPlayerDownloader = new LoaderButton("_big");
instances.push(bigPlayerDownloader);

bigPlayerDownloader.AddButton = (function () {
    let page_url = this.lastAddress;

    let TITLE = document.getElementsByClassName("fullHero__title")[0];
    let isBigPlayer = !(typeof TITLE === "undefined") && !(TITLE === null);

    if(isBigPlayer){
        document.getElementById("content").children[0].children[1].children[0].style.overflow = "visible"
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
        TITLE.appendChild(download_button);
        let download_options_list = this.createList(page_url);
        download_button.appendChild(download_options_list);
    }

}).bind(bigPlayerDownloader);