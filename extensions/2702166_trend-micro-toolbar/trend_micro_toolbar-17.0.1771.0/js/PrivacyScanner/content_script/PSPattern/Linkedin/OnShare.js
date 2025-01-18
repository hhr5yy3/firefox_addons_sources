(function() {
    var exports = window;
    var $ = exports.TMExt_$;

    $(document).ready(function() {
        var wording = GetWording();
        var UpdateWording = function(textarea, highter, wording) {
            if (textarea[0]) {
                textarea.attr('placeholder', wording);
                textarea.text(wording);
            }
            if (highter[0]) {
                highter[0].textContent = wording;
            }
        };
        
        var _doPutWording = function(){
            var textarea = $('textarea#share-text');
            var highter = $('#share-dialog-entity-highlighter');
            if (textarea.length != 0 && highter.length != 0) {
                UpdateWording(textarea, highter, wording);
                textarea.click(function() {
                    $(this).unbind();
                    UpdateWording(textarea, highter, wording);
                });
            } else {
                setTimeout(arguments.callee, 1000);
            }
        };
        _doPutWording();
    });
})();
