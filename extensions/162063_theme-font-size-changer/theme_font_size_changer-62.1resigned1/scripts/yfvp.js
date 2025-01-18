 
    var FlashVideoPlayerForFB = {
        requestChange: function() {
            if (FlashVideoPlayerForFB.player_type == "html") {
                document.createElement("video").constructor.prototype.canPlayType = function(type) {
                    return "";
                }
            }
        }
    };

    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window)
            return;

        if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT")) {
            console.log("Page script received: " + event.data.text);
            //window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_SET_VQ")) {
            console.log("FROM_CONTENT_SCRIPT_SET_VQ: " + new Date().getTime());
            FlashVideoPlayerForFB.quality = event.data.text;
            console.log("FlashVideoPlayerForFB.quality:" + FlashVideoPlayerForFB.quality);
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_SET_VS")) {
            console.log("FROM_CONTENT_SCRIPT_SET_VS: " + new Date().getTime());
            FlashVideoPlayerForFB.size = event.data.text;
            console.log("FlashVideoPlayerForFB.size:" + FlashVideoPlayerForFB.size);
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_SET_PLAYER_TYPE")) {
            console.log("FROM_CONTENT_SCRIPT_SET_PLAYER_TYPE: " + new Date().getTime());
            FlashVideoPlayerForFB.player_type = event.data.text;
            console.log("FlashVideoPlayerForFB.player_type:" + FlashVideoPlayerForFB.player_type);
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_REQUEST_CHANGE_PLAYER")) {
            FlashVideoPlayerForFB.requestChange();
        }
    }, false);
