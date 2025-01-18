(function() {
    var exports = window;
    var $ = exports.TMExt_$;

    var LoadL10NToDOM = function() {
        var string = $.toJSON(exports.FullLocalization || exports.Localization);
        $('#L10NString').attr('value', string);
    };

    var GetL10NString = function(key) {
        if (!exports.jsonL10N) {
            var str = $('#L10NString').attr('value');
            exports.jsonL10N = $.parseJSON(str);
        }

        if (typeof(exports.jsonL10N[key]) == "undefined") {
            return "undefined";
        }
        return exports.jsonL10N[key];
    };

    //Load L10N string to DOM
    LoadL10NToDOM();

    //Export GetL10NString API to fetch L10N string
    exports.GetL10NString = GetL10NString;
})();