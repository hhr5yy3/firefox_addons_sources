var Main = {
    oXHttpReq: null,
    vid: null, oldUrl: null,

    DocOnLoad: function (elem_id) {
        try {
            if (Main.getVid()) {
                var oDivCont = window.document.querySelector(elem_id);
                var y2mateconverter = window.document.querySelector("#y2mateconverter");
                var oCommandButton = Main.GetCommandButton();

                if(y2mateconverter == null){
                    if(elem_id !== "#menu-container"){
                        oDivCont.appendChild(oCommandButton);
                    } else {
                        var oDocContainer = window.document.querySelector("#info-contents #info");
                        oDocContainer.setAttribute("style", "flex-wrap: wrap;");
                        oDivCont.parentNode.insertBefore(oCommandButton, oDivCont);
                    }
                }
                Main.oldUrl = window.location.href;
                Main.checkChangeVid();
            }
            return true;
        }
        catch (e) {
            console.log("Ошибка в функции Y2mate.DocOnLoad. ", e);
        }
    },

    checkChangeVid: function(){
        setTimeout(function () {
            if(Main.oldUrl === window.location.href)
                Main.checkChangeVid();
            else{
                Main.WaitLoadDom(window.document);
            }
        }, 1000);
    },
    WaitLoadDom: function () {
        vid = Main.getVid();
        if(vid){
            if (window.document.querySelector("#above-the-fold #title") != null) {
                Main.DocOnLoad("#above-the-fold #title");
            } else if(null != window.document.querySelector("div.slim-video-information-title-and-badges")){
                Main.DocOnLoad("div.slim-video-information-title-and-badges");
            } else if(null != window.document.querySelector("#menu-container")){
                Main.DocOnLoad("#menu-container");
            } else {
                setTimeout(function () {
                    Main.WaitLoadDom();
                }, 1000);
            }
        } else {
            Main.checkChangeVid();
        }
    },

    goToY2mate: function (e) {
        try {
            vid = Main.getVid();
            var link = "https://www.y2mate.com/youtube/" + vid + "/?utm_source=pluggin_firefox";
            window.open(link, "_blank");
        } catch (e) {
            console.log("Ошибка в функции Y2mate.OnButtonClick. ", e);
        }
    },

    GetCommandButton: function () {
        try {
            var oCommandButton = window.document.createElement("button");
            oCommandButton.id = "y2mateconverter";
            oCommandButton.className = "yt-uix-tooltip"; //yt-uix-button
            oCommandButton.setAttribute("type", "button");
            oCommandButton.setAttribute("title", "Download with y2mate.com");
            oCommandButton.innerHTML = "<i style=\"position: absolute;display: inline-block;left: 10px;top: 9px;background-image: url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGlkPSJzdmcyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNIDQsMCA0LDggMCw4IDgsMTYgMTYsOCAxMiw4IDEyLDAgNCwwIHoiIGZpbGw9IiNmZmZmZmYiIC8+PC9zdmc+&quot;);background-size: 12px;background-repeat: no-repeat;background-position: center center;width: 16px;height: 16px;\"></i> Download ";
            oCommandButton.addEventListener("click", function (e) {
                Main.goToY2mate(e);
            }, true);
            oCommandButton.setAttribute("style", "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #c00; color: #fff; padding: 10px 16px 10px 32px; border-radius: 3px; font-weight:bold; border:none;");
            oCommandButton.setAttribute("onmouseover", "this.style.backgroundColor='#ff003e'");
            oCommandButton.setAttribute("onmouseout", "this.style.backgroundColor='#c00'");
            return oCommandButton;
        } catch (e) {
            console.log("Ошибка в функции Y2mate.GetCommandButton. ", e);
        }
    },
    getVid: function () {
        var cur_url = window.location.href;
        const youtube_regex = /^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
        const parsed = cur_url.match(youtube_regex);
        if (parsed && parsed[3]) {
            return parsed[3];
        }
        return false;
    }

};

Main.WaitLoadDom();
