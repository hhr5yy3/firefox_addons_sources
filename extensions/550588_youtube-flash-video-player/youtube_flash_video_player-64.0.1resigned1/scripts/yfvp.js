 
    var YouTubeFlashVideoPlayer = {
        requestChange: function() {
            if (YouTubeFlashVideoPlayer.player_type == "flash") {
				if(document.location.pathname.search(/^\/v\//)==0){
					document.createElement("video").constructor.prototype.canPlayType = function(type) {
						return "";
					}
				}
            }
        }
    };

    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window)
            return;

        if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT")) {
            //window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_SET_VQ")) {
            YouTubeFlashVideoPlayer.quality = event.data.text;
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_SET_VS")) {
            YouTubeFlashVideoPlayer.size = event.data.text;
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_SET_PLAYER_TYPE")) {
            YouTubeFlashVideoPlayer.player_type = event.data.text;
        } else if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT_REQUEST_CHANGE_PLAYER")) {
            YouTubeFlashVideoPlayer.requestChange();
        }
    }, false);
