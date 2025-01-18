let b = new LoaderButton();
instances.push(b);

b.AddButton = (function () {
    let page_url = this.lastAddress;
    // By default, video content has a higher z-index than the title bar.
    // When I add the DL button inside title bar, DL options list stays
    // behind the video. In order to fix this, I select the title and
    // its next sibling, and give title a higher z-index.
    let arts = document.getElementsByTagName("article")
    let realContent = null;
    for (let art of arts){
        //console.log(art.firstChild.firstChild.firstChild)
        if(art.firstChild.firstChild.firstChild.childElementCount == 3){
            realContent = art.firstChild.firstChild.firstChild;
        }
    }


    if (realContent === "null") return;

    let TITLE = realContent.children[1];
    if (typeof TITLE === "undefined") return;
    let content = TITLE.parentElement.children[2];
    if (typeof content === "undefined") return;
    content.style.zIndex = 1;
    TITLE.style.zIndex = 10;


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

    let video = realContent.getElementsByTagName("video");

    if (video.length > 0) {
        let PARENT_OF_THREE_DOTS = TITLE.children[1].children[0].children[0].children[0];
        let THREE_DOTS = PARENT_OF_THREE_DOTS.children[1];
        let download_button = this.BigBlueButtonCreator();
        PARENT_OF_THREE_DOTS.insertBefore(download_button, THREE_DOTS);
        let download_options_list = this.createList(page_url);
        download_button.appendChild(download_options_list);
    }
}).bind(b);