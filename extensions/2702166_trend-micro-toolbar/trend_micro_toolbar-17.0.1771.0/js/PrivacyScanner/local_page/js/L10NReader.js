(function(){
    var exports = window;
    var $ = exports.TMExt_$;
    
    var LoadL10NToDOM = function(){
        var string = $.toJSON(exports.FullPSLocalization || exports.PSLocalization);
        $('#PSL10NString').attr('value', string);
    };

    var GetPSL10NString = function(key){
        if (!exports.jsonPSL10N){
            var str = $('#PSL10NString').attr('value');
            exports.jsonPSL10N = $.parseJSON(str);
        }
        
        if (typeof(exports.jsonPSL10N[key]) == "undefined"){
            return "undefined";
        }
        return exports.jsonPSL10N[key];
    };
    
    var GetPSL10NImage = function(locale, file){
        return "/_locales/" + locale + "/privacy_scanner/local_page/img/" + file;
    };
    
    //Load L10N string to DOM
    LoadL10NToDOM();
    
    //Export GetPSL10NString API to fetch L10N string
    exports.GetPSL10NString = GetPSL10NString;
    exports.GetPSL10NImage  = GetPSL10NImage;
})();
