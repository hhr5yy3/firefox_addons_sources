(function() {
    var exports = window;
    var $ = exports.TMExt_$;

    $(document).ready(function() {
        var wording = GetWording();
        var UpdateWording = function(textarea, inner_input) {
            if (textarea) {
                textarea[0].value = wording;
            }
            if (inner_input) {
                inner_input.attr('name', 'message');
                inner_input.attr('value', wording);
            }
        };

        var _doPutWording = function(){
            textarea = $('textarea');
            inner_input = $('input.mentionsHidden');
            if (textarea.length != 0 && inner_input.length != 0) {
                UpdateWording(textarea, inner_input);
                textarea.click(function() {
                    if (!exports.FirstClicked) {
                        exports.FirstClicked = true;
                        UpdateWording(textarea, inner_input);
                    }
                });
            } else {
                setTimeout(arguments.callee, 1000);
            }
        };
        
        _doPutWording();
        
        //Sometimes it has race condition between our UpdateWording and Website
        //So Update it periodically until user click the input to manually edit it.
        var auto_update_interval = setInterval(function(){
            if (!exports.FirstClicked) {
                var textarea = $('textarea');
                UpdateWording(textarea, null);
            } else {
                clearInterval(auto_update_interval);
            }
        }, 500);
        
    });
})();
