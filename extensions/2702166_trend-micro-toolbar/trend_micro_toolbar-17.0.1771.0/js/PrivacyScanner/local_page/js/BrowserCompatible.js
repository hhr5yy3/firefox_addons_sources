(function(){
    window.browser = (function () {
        return window.msBrowser ||
            window.chrome ||
            window.browser;
    }());

    //Array.prototype.indexOf
    if (typeof (Array.prototype.indexOf) == 'undefined') {
        Array.prototype.indexOf = function(elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }

            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
            }
            return -1;
        };
    }
    
    
})();
