var nativeConsole = console; // we keep the nativeConsole to revert, just in case
var isBackground = (typeof browser.tabs !== "undefined"); // browser.tabs is only defined in background scripts
var timeoutAt;
var monitoring = false;

function activateLogStorage(callback) {
    // init of useful variables when logs are activated
    browser.storage.local.get("logger", function(result) {
        timeoutAt = result.logger.timeoutAt;
        isBackground && !monitoring && monitorTimeout(result.logger.startedAt); // background scripts check timeout with monitor
    });

    if (typeof console === 'object') { // has console object been changed already?
        // no, console object needs to be changed to extract logs
        var nativeConsoleMethods = [];
        // grabbing every methods from the native console to apply to our new custom console
        for (var m in nativeConsole) {
            if (typeof (nativeConsole[m]) === 'function') {
                nativeConsoleMethods.push(m);
            }
        }
        console = (function(methods, undefined) { // typeof console === 'function'
            var Log = Error; // proper inheritance
            Log.prototype.write = function(args, method) {
                if (!isBackground && Date.now() > timeoutAt) { // content scripts check timeout before writing each log
                    // no, the session timed out
                    revertConsole();
                    nativeConsole[method].apply(nativeConsole, args);
                    return;
                } else {
                    // yes, we proceed with preparing & storing log

                    var suffix = {
                        "source": extractLineInfo(this.stack)
                    };

                    extractLog({
                        msg: args,
                        source: suffix["source"],
                        method: method,
                        timestamp: new Date().toISOString()
                    });

                    args = args.concat([suffix]);
                    nativeConsole[method].apply(nativeConsole, args);
                }
            };

            var extractLineInfo = function(stack) {
                var lines = stack.split('\n');

                lines = lines.filter(function(line) {
                    // regex to filter out what is not == [anycharacters].[extension]:[lineNumber]:[ColumnNumber]
                    return line.match(/.+\.[A-Za-z]+:[0-9]+:[0-9]+/);
                });
                var filenames = [];
                for (var i = 1; i < lines.length; i++) { // i=1 on purpose, first call is always logMethod() cf below
                    lines[i] = lines[i].replace(')', ''); // parenthesis removal for Chrome
                    filenames.push(lines[i].slice(lines[i].lastIndexOf('/') + 1)); // sadly only the name of the file will be displayed
                }

                return filenames.filter(String).join(',').split(','); // remove empty, and back into an array
            };

            // method builder
            var logMethod = function(method) {
                return function(params) {
                    Log().write(Array.prototype.slice.call(arguments, 0), method); // turn into proper array & declare method to use
                };
            };
            var result = logMethod('log'); // base for backwards compatibility, simplicity
            // all of the other methods
            for (var i in methods) {
                result[methods[i]] = logMethod(methods[i]);
            };

            return result; // expose
        })(nativeConsoleMethods); //--- _log
    }

    if (callback) { callback(); }
}

function extractLog(log, type = "background", tabInfo) {
    if (typeof safari !== "undefined") {
        // safari needs help to differentiate background/content scripts logs
        var filename = log.source[0].split(':')[0]; // last known filename from origins of message
        if (!browser.runtime.getManifest().background.scripts.includes(filename)) {
            type = "content";
        }
    }

    if (isBackground) {
        var newLog = {log, from: type};
        if (tabInfo) {
            // message is not coming from background page
            newLog['from'] = tabInfo.id;
            newLog['url'] = tabInfo.url;
            newLog['title'] = tabInfo.title;
        }
        updateLogs(newLog, type);
    } else {
        // if extractLog() is called in content scripts, we send to background and we use bg context to write (extension storage is single access)
        // safari: this condition is never true since background scripts are not sandboxed
        browser.runtime.sendMessage({
            from: "content",
            subject: "logs",
            log
        });
    }
}

function revertConsole() {
    if (nativeConsole) {
        console = nativeConsole;
    } else {
        console.error("Error while deactivating logs. Please reload the page.");
    }
}

/* BACKGROUND SCRIPTS-only functions */

var currentInterval;
function monitorTimeout(startedAt) { // passing no parameter will only clean all intervals running
    monitoring = !!startedAt; // not monitoring if there is no parameter

    if (currentInterval) { // there is already a check running
        clearInterval(currentInterval); // we remove it
        currentInterval = undefined;
    }

    if (startedAt) {
        currentInterval = setInterval(function() {
            // console.log('running!', interval) // check when monitor is running
            if (Date.now() > timeoutAt) {
                monitoring = false;
                endLogSession(startedAt);
            }
        }, 1000);
    }
}

function endLogSession(startedAt) { // passing no parameter will only stop monitoring and revert console
    monitorTimeout(); // clear intervals
    revertConsole();
    if (startedAt) {
        // diagTools should only get notified to display things properly but the crux of the log collecting job should be in background scripts
        browser.storage.local.get('background_logs', function(bResult) {
            browser.storage.local.get('content_logs', function(cResult) {
                var sessionId = "session-" + startedAt;
                var result = {
                    background: bResult['background_logs'] && JSON.parse(bResult['background_logs']),
                    content: cResult['content_logs'] && JSON.parse(cResult['content_logs']),
                    startedAt,
                    stoppedAt: Date.now()
                };
                browser.storage.local.set({[sessionId]: result});

                // here we also send collectLogs to backend with the logs prepared for archiving
                var command = {
                    request: "collectlogs",
                    id: {
                        tabId: -2, // not coming from specific tab, but we still need to identify the transaction
                        transactionId: startedAt
                    },
                    frontEndLogs: JSON.stringify(result)
                };

                port && port.postMessage(command);
            });
        });
        browser.storage.local.remove('logger');
    }
}

var isWriting = false;
function updateLogs(newLog, type, retries = 0) {
    // queueing of the logs via a recursive timeout: access to the storage is asynchronous
    if (retries > 14) {
        // nativeConsole && nativeConsole.warn('some logs were lost');
        isWriting = false;
    }
    // retries && nativeConsole && nativeConsole.log(retries, (newLog.from > 0 ? 'tab'+newLog.from : newLog.from)); // just logging when a retry was needed
    if (isWriting) {
        // retry to write in 500ms
        setTimeout(updateLogs, 500, newLog, type, retries + 1);
        return;
    }
    isWriting = true;
    writeLog(newLog, type, function() {
        isWriting = false;
    });
}

function writeLog(newLog, type = 'content', callback) {
    // writing of the log in the storage
    var key = type + '_logs';

    browser.storage.local.get([key], function(result) { // brackets around the key will use variable (ES6)
        if (result && result[key]) {
            var logs = JSON.parse(result[key]);
            logs.push(newLog);
            browser.storage.local.set(
                {
                    [key]: JSON.stringify(logs)
                },
                function() {
                    if (callback) callback();
                }
            );
        } else {
            browser.storage.local.set(
                {
                    [key]: JSON.stringify([newLog])
                },
                function() {
                    if (callback) callback();
                }
            );
        }
    });
}
