(function() {
    var exports = window;
    var $ = exports.TMExt_$;

    $(document).ready(function() {
        var wording = GetWording();
        var _doPutWording = function(){
            var content = $('div[g_editable][contenteditable]');
            var content_placeHolder = content.prev();
            if (content.length != 0 && content_placeHolder.length != 0) {
                content_placeHolder.hide();
                content.text(wording);
            } else {
                setTimeout(arguments.callee, 1000);
            }
        };
        _doPutWording();
    });
})();
