import * as commons from "./commons.js"

/**
 * Logger class.
 */
export default class Logger
{
    constructor(browser, port) {
        this.browser = browser;
        this.port    = port;
        this.level   = 0;
    }

    setTraceLevel(level) {
        this.level = level;
    }

    fatal(message) {
        var error = new Error();
        var debug = parseStackTrace(error.stack, 'fatal');
        var json = {
            "__type" : "TraceLogJsonType",
            "browser": this.browser,
            "date": getDateTime(),
            "loglevel": "0",
            "__FILE__": debug.__FILE__,
            "__LINE__": debug.__LINE__,
            "message": commons.escapeString(message),
        }
        this.port.postMessage(json);
        error = null;
        debug = null;
        json  = null;
    }

    error(message) {
        var error = new Error();
        var debug = parseStackTrace(error.stack, 'error');
        var json = {
            "__type" : "TraceLogJsonType",
            "browser": this.browser,
            "date": getDateTime(),
            "loglevel": "1",
            "__FILE__": debug.__FILE__,
            "__LINE__": debug.__LINE__,
            "message": commons.escapeString(message),
        }
        this.port.postMessage(json);
        error = null;
        debug = null;
        json  = null;
    }

    warn(message) {
        var error = new Error();
        var debug = parseStackTrace(error.stack, 'warn');
        var json = {
            "__type" : "TraceLogJsonType",
            "browser": this.browser,
            "date": getDateTime(),
            "loglevel": "2",
            "__FILE__": debug.__FILE__,
            "__LINE__": debug.__LINE__,
            "message": commons.escapeString(message),
        }
        this.port.postMessage(json);
        error = null;
        debug = null;
        json  = null;
    }

    info(message) {
        var error = new Error();
        var debug = parseStackTrace(error.stack, 'info');
        var json = {
            "__type" : "TraceLogJsonType",
            "browser": this.browser,
            "loglevel": "3",
            "date": getDateTime(),
            "__FILE__": debug.__FILE__,
            "__LINE__": debug.__LINE__,
            "message": commons.escapeString(message),
        }
        this.port.postMessage(json);
        error = null;
        debug = null;
        json  = null;
    }

    debug(message) {
        if (this.level >= 1) {
            var error = new Error();
            var debug = parseStackTrace(error.stack, 'debug');
            var json = {
                "__type" : "TraceLogJsonType",
                "browser": this.browser,
                "loglevel": "4",
                "date": getDateTime(),
                "__FILE__": debug.__FILE__,
                "__LINE__": debug.__LINE__,
                "message": commons.escapeString(message),
            }
            this.port.postMessage(json);
            error = null;
            debug = null;
            json  = null;
        }
    }

    trace1(message) {
        if (this.level >= 1) {
            var error = new Error();
            var debug = parseStackTrace(error.stack, 'trace1');
            var json = {
                "__type" : "TraceLogJsonType",
                "browser": this.browser,
                "logLevel": "5",
                "date": getDateTime(),
                "__FILE__": debug.__FILE__,
                "__LINE__": debug.__LINE__,
                "message": commons.escapeString(message),
            }
            this.port.postMessage(json);
            error = null;
            debug = null;
            json  = null;
        }
    }

    trace2(message) {
        if (this.level >= 1) {
            var error = new Error();
            var debug = parseStackTrace(error.stack, 'trace2');
            var json = {
                "__type" : "TraceLogJsonType",
                "browser": this.browser,
                "logLevel": "6",
                "date": getDateTime(),
                "__FILE__": debug.__FILE__,
                "__LINE__": debug.__LINE__,
                "message": commons.escapeString(message),
            }
            this.port.postMessage(json);
            error = null;
            debug = null;
            json  = null;
        }
    }

    trace3(message) {
        if (this.level >= 1) {
            var error = new Error();
            var debug = parseStackTrace(error.stack, 'trace3');
            var json = {
                "__type" : "TraceLogJsonType",
                "browser": this.browser,
                "logLevel": "7",
                "date": getDateTime(),
                "__FILE__": debug.__FILE__,
                "__LINE__": debug.__LINE__,
                "message": commons.escapeString(message),
            }
            this.port.postMessage(json);
            error = null;
            debug = null;
            json  = null;
        }
    }

    trace4(message) {
        if (this.level >= 1) {
            var error = new Error();
            var debug = parseStackTrace(error.stack, 'trace4');
            var json = {
                "__type" : "TraceLogJsonType",
                "browser": this.browser,
                "logLevel": "8",
                "date": getDateTime(),
                "__FILE__": debug.__FILE__,
                "__LINE__": debug.__LINE__,
                "message": commons.escapeString(message),
            }
            this.port.postMessage(json);
            error = null;
            debug = null;
            json  = null;
        }
    }

    trace5(message) {
        if (this.level >= 1) {
            var error = new Error();
            var debug = parseStackTrace(error.stack, 'trace5');
            var json = {
                "__type" : "TraceLogJsonType",
                "browser": this.browser,
                "logLevel": "9",
                "date": getDateTime(),
                "__FILE__": debug.__FILE__,
                "__LINE__": debug.__LINE__,
                "message": commons.escapeString(message),
            }
            this.port.postMessage(json);
            error = null;
            debug = null;
            json  = null;
        }
    }
}

function getDateTime() {

    var date = new Date();

    var year         = date.getFullYear();
    var month        = date.getMonth() + 1;
    var day          = date.getDate();
    var hour         = date.getHours();
    var minutes      = date.getMinutes();
    var seconds      = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    date = null;

    var s_year          = zeroPadding(year, 4);
    var s_month         = zeroPadding(month, 2);
    var s_day           = zeroPadding(day, 2);
    var s_hour          = zeroPadding(hour, 2);
    var s_minutes       = zeroPadding(minutes, 2);
    var s_seconds       = zeroPadding(seconds, 2);
    var s_millisecondss = zeroPadding(milliseconds, 3);

    return `${s_year}/${s_month}/${s_day} ${s_hour}:${s_minutes}:${s_seconds}.${s_millisecondss}`;
}

function zeroPadding(NUM, LEN){
    return (Array(LEN).join('0') + NUM).slice(-LEN);
}

function parseStackTrace(errorStack, constructorOpt)
{
    var firefox = false;
    var stack   = errorStack;
    var trace   = null;
    var array   = new Array();
    var calls   = stack.split('\n');
    if (commons.isFirefox()) {
        for (var i = 0; i < calls.length; i++) {
            var str = calls[i];
            if ((str.length == 0) || (str.startsWith(`${constructorOpt}@`))) {
                continue;
            }
            array.push(str);
        }
        var line = array[0];
        trace = line.substring(line.lastIndexOf('/') + 1).split(':');
    }
    else {
        for (var i = 0; i < calls.length; i++) {
            var str = calls[i];
            if ((str === 'Error') || (str.includes(`at Logger.${constructorOpt}`))) {
                continue;
            }
            array.push(str);
        }
        var line = array[0];
        if (line.endsWith(')')) {
            line = line.substring(0, line.lastIndexOf(')'));
        }
        trace = line.substring(line.lastIndexOf('/') + 1).split(':');
    }

    var debug = {};

    if (trace.length == 3) {
        debug.__FILE__   = trace[0];
        debug.__LINE__   = trace[1];
        debug.__COLUMN__ = trace[2];
    }
    else if (trace.length == 2) {
        debug.__FILE__   = trace[0];
        debug.__LINE__   = trace[1];
        debug.__COLUMN__ = '?';
    }

    array = null;
    trace = null;

    return debug;
}
