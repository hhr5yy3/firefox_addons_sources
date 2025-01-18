var CPBTools = {
    DebugMode: false,
    GetElemPos: function (el) {
        // jquery
        return $(el).offset();
    },
    GetElemCss: function (el, prop) {
        var value = $(el).css(prop);
        if (value) value = value.split('px')[0];
        value = parseInt(value);
        return isNaN(value) ? 0 : value;
    },
    Debug: function (source, message) {
        if (CPBTools.DebugMode) console.log(source + ": " + message);
    }

}