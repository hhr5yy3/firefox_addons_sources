(function () {
var $ab4be09e773c104f$exports = {};
(function() {
    window.addEventListener("message", function(msg) {
        switch(msg.data.type){
            case "w2g_seek":
                _getPlayer().seek(msg.data.val * 1000);
                break;
        }
    });
    function _getPlayer() {
        let e = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
        let t = e.getAllPlayerSessionIds().find((val)=>val.includes("watch"));
        return e.getVideoPlayerBySessionId(t);
    }
})();

})();
