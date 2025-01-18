var DEBUG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
    	var now = new Date();
        return "[" + now.toLocaleTimeString() + "." + now.getMilliseconds() + "]";    
    };

    return {
        log: console.log.bind(console, '%s', timestamp),
        // Fix me
        count: console.log.bind(console, '%s', timestamp),
        error: console.error.bind(console, '%s', timestamp)
    }
})();