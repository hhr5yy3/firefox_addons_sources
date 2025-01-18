function TrendingNow(unittest){ // jshint ignore: line
    var trendingStories = [];

    //get flickr photo links from a specified url
    function getTrendingStories(callback) {
        var url = extGlobal.constants.tn_url;
        var result = function(responseText) {
            try {
                trendingStories = JSON.parse(responseText).itemsInfo;
                callback(trendingStories);
            } catch (e) {
                console.error("Trending Stories could not be parsed", e);
                callback({});
            }
        };
        var err = function(errCode){
            console.log("api call failed :( ");
            if(errCode >= 500) {
                console.error("server-side error...", errCode);
            }
            callback({});
        };
        if (url) {
            extGlobal.browserGap.xhr(url, result, err);
        }
     }

     async function updateTrendingStories(trendingStories) {
        if (trendingStories && trendingStories.items && trendingStories.items.length > 0) {
            await extGlobal.browserGap.localStorage.removeItem("trendingStories");
            extGlobal.browserGap.localStorage.setItem("trendingStories", JSON.stringify(trendingStories));
            extGlobal.browserGap.localStorage.setItem("trendingStoriesTime", (new Date()).toJSON());
        }
    }

    function init() {
        extGlobal.enableTN = typeof extGlobal.constants.tn_url !== "undefined" &&
                             typeof extGlobal.distributionChannelConfig.trendingNow !== "undefined";

        if (!extGlobal.constants.tn_interval || !extGlobal.constants.tn_url || !extGlobal.enableTN) {
            return;
        }

        getTrendingStories(updateTrendingStories);
        if (extGlobal.tnInterval) {
            clearInterval(extGlobal.tnInterval);
        }
        extGlobal.tnInterval = setInterval(function() {
            getTrendingStories(updateTrendingStories);
        }, extGlobal.constants.tn_interval);
    }

    this.init = init;
    this.getTrendingStories = getTrendingStories;
    this.trendingStories = trendingStories;

    return this;
}
