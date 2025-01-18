var MP3hub = {
    Init: function (e) {
        if (e.querySelector("#info #menu-container") != null) {
            MP3hub.Loading(e);
        } else {
            setTimeout(function () {
                MP3hub.Init(e);
            }, 500);
        }
    },

    Loading: function (doc) {
        try {
            if (doc != null && doc.body != null && doc.location != null) {
                if (MP3hub.IsYoutubeUrl(doc)) {
                    var docCtn = doc.querySelector("#info-contents #info"),
                        divCtn = doc.querySelector("#info #menu-container");

                    docCtn.setAttribute("style", "flex-wrap: wrap;");

                    if (divCtn != null) {
                        var btn = MP3hub.CreateButton();
                        divCtn.parentNode.insertBefore(btn, divCtn);
                    } else {
                        return false;
                    }
                }
            }
            
            return true;
        } catch (e) {
            console.log("Error while calling MP3hub.Loading", e);
        }
    },

    CreateButton: function () {
        try {
            var btn = document.createElement("button");

            btn.id = "mp3hub";
            btn.className = "yt-uix-tooltip";
            btn.setAttribute("type", "button");
            btn.setAttribute("title", "Download with MP3hub");
            btn.setAttribute("style", "display: block; width:150px; position:relative; top:1px; padding: 0px; margin: 20px 5px 10px 5px; cursor: pointer; font: 14px Arial; font-weight: bold; background: #ff0000; color: #fff; border: 2px solid #ff0000; border-radius: 2px;");
            btn.innerText = "Download with MP3hub";
            btn.addEventListener("click", function (e) {
                MP3hub.Click(e);
            }, true);

            return btn;
        } catch (e) {
            console.log("Error while calling MP3hub.CreateButton", e);
        }

        if (e.querySelector("#mp3hub") === null) {
            MP3hub.Init(document);
        }
    },
    
    Click: function (e) {
        try {
            var link = "https://www.mp3hub.com/?lookfor=" + encodeURIComponent(MP3hub.ParseYoutubeUrl(document.location.href));
            window.open(link, "_blank");
        } catch (e) {
            console.log("Error while calling MP3hub.Click", e);
        }
    },
    
    IsYoutubeUrl: function (doc) {
        var url = doc.location.toString().toLowerCase();
        return url.indexOf("youtube.com") != -1 && url.indexOf("watch?v=") != -1;
    },

    ParseYoutubeUrl: function (url) {
        if (url.length) {
            if (/https?\:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_\-]+((&list=[A-Za-z0-9_\-]+(&index=\d+)?)|((&index=\d+)?&list=[A-Za-z0-9_\-]+))/.test(url)) {
                url = url.split("&")[0];
            }
        }

        return url;
    }
};

MP3hub.Init(document);