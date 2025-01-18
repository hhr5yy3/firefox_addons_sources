/* INIT FUNCTIONS */
$('#timeLimit').text(Math.floor(logTimeout / 60000)) // app_settings.js
$("#FEVersion").text(browser.runtime.getManifest().version.replace(/\s/g, '')); // no whitespace

/* 'result' refers to result of the storage.local.get() query.
* for some reason, though you call this object by getting the "settings" key, 
* the settings JSON isn't returned, but an object containing the JSON is, instead. */
browser.storage.local.get("backendVersion", function(result) {
    $("#BEVersion").text(result.backendVersion.replace(/\s/g, '')); // no whitespace
});

browser.storage.local.get("settings", function(result) {
    if(result && result.settings) {
        updateInputs($(".settingsInput"), result);
    } else {
        console.log("Rendering: cannot retrieve user preferences, using default settings");
        browser.storage.local.set({
            settings: default_settings
        });        
    }
});

browser.storage.local.get("logger", function(result) {
    var currentSession = result.logger;
    updateStateLog(!!currentSession); // cast to boolean
    toggleLogGUI(!!currentSession);
    
    if (currentSession) {
        console.log(currentSession);
        updateStartTime(currentSession.startedAt);
        updateRemainingClock(currentSession.startedAt);
    }
});

browser.storage.local.get("lastLocation", function(result) {
    result && result.lastLocation && updatePaths(result.lastLocation.split("websigner_")[0]);
});

/* GUI FUNCTIONS */
function updateStateLog(isLogging, optional) {
    optional = optional ? optional + ", " : "";
    status = isLogging ? "logging" : "not logging";
    iconClass = isLogging ? "logging" : "standby";
    $("#stateLogIcon").attr('class', iconClass).attr('title', "Currently " + status);
    $("#stateLogText").text(optional + status);
}

function toggleLogGUI(bool) {
    $("#info, #logs").toggleClass('logging', bool);
    /* disabling checkboxes as partial logging is not handled yet
    $(".settingsLogs").prop('disabled', bool); 
    $("#checkAll").prop('disabled', bool); */
    $("#cleanLogs").prop('disabled', bool)    
    $("#collectLogs").prop('disabled', !bool);
}
$(".settingsLogs, #checkAll").prop('disabled', true); // we do not handle partial logging yet

function updateInputs(jqueryObjects, result) {
    for (var i = 0; i < jqueryObjects.length; i++) {
        $(jqueryObjects[i]).val(result.settings.plaintext[jqueryObjects[i].id]);
    }
}

function checkNewPreferences(inputToCheck, result) {
    var preventSaving = true;
    if(result && result.settings) {
        preventSaving = (inputToCheck.value === result.settings.plaintext[inputToCheck.id]);
    } else { // called with no arguments or result is undefined: saveSettings is disabled.
        preventSaving = true;
    }
    $("#saveSettings").prop('disabled', preventSaving);
}

function updateTabButtons() {
    $('div.list').empty();
    $.each(websignerTabs, function(tabId, tab) {
        var tabButton = $('<button data-tabid="' + tab.id + '" class="tab" title="Go to: ' + tab.title + '">');
        tabButton.text(tab.id);
        tabButton.on("click", function() {
            browser.tabs.update(tab.id, {active:true});
        });
        $('div.list').append(tabButton);
    });

    var spans = $('.tabs span'); // info message for selecting tabs
    var isLogging = $('#logs').hasClass('logging')
    if (Object.keys(websignerTabs).length > 0) {
        if (isLogging) { // tabs are present and logging is enabled
            spans[0].setAttribute('class', 'visible');
            spans[1].setAttribute('class', '');
            spans[2].setAttribute('class', '');
        } else { // tabs are present but logging is disabled
            spans[0].setAttribute('class', '');
            spans[1].setAttribute('class', 'visible');
            spans[2].setAttribute('class', '');
        }
    } else { // no tabs in the list
        spans[0].setAttribute('class', '');  
        spans[1].setAttribute('class', '');
        spans[2].setAttribute('class', 'visible');
    }
}

function updateStartTime(d) {
    // convert types of parameter (timestamp / iso)
    var date = new Date(d);
    // to humanized string (yyyy-mm-dd hh:mm:ss)
    var humanized = date.toISOString().split('T')[0] + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    
    $("#timeStart").prop('title', date.toISOString()).text(humanized);
}

function updateRemainingClock(startedAt) { // passing no parameter will only clean all intervals running
    var interval;
    if (startedAt) {
        interval = setInterval(function () {
            var remainingTime = logTimeout - (Date.now() - startedAt);
            var clock = $("#timeRemaining");

            if (remainingTime > 0) {
                clock.text(msToMinAndSeconds(remainingTime));

                // conditional coloring
                clock.removeClass('soon').removeClass('verySoon');
                if (remainingTime < 60500) { // 1min
                    clock.addClass('soon');
                } else if (remainingTime < 10500) { // 10sec
                    clock.addClass('verySoon');
                }
            } else {
                clock.text(msToMinAndSeconds(0));
                clock.addClass('verySoon');
                // prevent user interaction from occuring when timeout is being handled by background (collectLogs in progress)
                var buttons = $('#cancelLogs, #collectLogs').prop('disabled', true);
                setTimeout(function() {
                    updateRemainingClock();
                    updateStateLog(false);
                    toggleLogGUI(false);
                    buttons.prop('disabled', false);
                }, 2500);
                clearInterval(interval); // cleans itself
            }
        }, 500)
    } else {
        interval = setInterval(() => '', 999) + 1; // get id of last interval created, +1 to clean this one as well
    }
    // clean other intervals running
    for (i = 0; i < interval; i++) {
        clearInterval(i);
    }
}

function updatePaths(folderPath, filename, callback) { // passing no parameter will only clear filename text
    if (folderPath) {
        $('#location').css('visibility', 'visible'); // this will only be necessary when key lastLocation is undefined

        var folderText = $('#folderPath').text(folderPath);
        if (folderPath.includes("AppData\\Local\\Gemalto")) { // Windows
            folderText.prop('title', "%LocalAppData%\\Gemalto\\WebSigner\\"); 
        } else {
            folderText.prop('title', folderPath)
        }
    }

    $('#filename').text('').fadeOut(250, function () {
        filename && $(this).text(filename).fadeIn();
        callback && callback();
    });
}

/* CORE FUNCTIONS */
function collectLogs(optional) {
    // sends collectLogs command to background and logging content scripts
    $("#collectLogs").prop('disabled', true).addClass("generating");
    $("#startLogs").prop('disabled', true)

    browser.storage.local.get("logger", function(result) {
        browser.storage.local.remove("logger", function() {
            updateRemainingClock();
            updateStateLog(false, optional);
            toggleLogGUI(false);

            browser.runtime.sendMessage({
                from: "diagTools",
                subject: "collectlogs",
                startedAt: result.logger.startedAt
            });
            $.each(websignerTabs, function(i) {
                var tabId = parseInt(i);
                browser.tabs.sendMessage(tabId,
                    {
                        from: "diagTools",
                        subject: "collectlogs"
                    });
            });
        });
    });
}

function cancelLogs(optional) {
    browser.storage.local.remove("logger", function() {
        updateRemainingClock();
        updateStateLog(false, optional);
        toggleLogGUI(false);
        browser.runtime.sendMessage({
            from: "diagTools",
            subject: "cancellogs"
        });
        $.each(websignerTabs, function(i) {
            var tabId = parseInt(i);
            browser.tabs.sendMessage(tabId,
                {
                    from: "diagTools",
                    subject: "cancellogs"
                });
        });
        cleanUp();
    });
}

function deliverLogs(sessionId, path) {
    var delay = 1000; // in milliseconds
    var collectButton = $("#collectLogs").prop('disabled', true).addClass("generating");
    var startButton = $("#startLogs").prop('disabled', true)

    browser.storage.local.get(sessionId, function (result) {
        if (result[sessionId].background && result[sessionId].content) {
            console.log("Frontend logs OK", result);
        } else {
            console.error("Frontend logs are not all accounted for - content: ", result.content, "background: ", result.background);
        }
        // notify user that generation is done
        setTimeout(function () {
            // we slow down the process for better UX
            updateStateLog(false)
            collectButton.removeClass("generating").addClass("done");
            updatePaths(path.split("websigner_")[0], path.split(/\/|\\/g).pop(), function () {
                collectButton.removeClass("done");
            })
            cleanUp();
            startButton.prop('disabled', false);
        }, delay)
    });
}

/* UTILITY */
function msToMinAndSeconds(timestamp = 0) { // if undefined is passed, 00:00 is displayed
    var minutes = Math.floor(timestamp / 60000);
    var seconds = ((timestamp % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

function cleanUp() {
    // removes all keys named logger, background_logs, content_logs, and any session- created at this point
    browser.storage.local.get(null, function(items) {
        for (key in items) {
            if (key === "logger" || key.includes('_logs') || key.includes('session-')) {
                browser.storage.local.remove(key);
            }
        }
        updateTabButtons();
    });
}

function copyStringToClipboard (str) {
    // text must be selected to be copied: we create a temporary, hidden textarea
    var tmp = $("<textarea readonly style='position: absolute; left: -999px'>").val(str)
    $('body').append(tmp);
    tmp.select();
    document.execCommand('copy'); // some deprecation warnings here but compatibility is OK atm, impact is minor, and no alternatives
    tmp.remove();
}

/* EVENT LISTENERS */
$("li.menuItem").on("click", function(event) {
    var viewRequested = // retrieve LI element even if SVG or PATH are clicked
        (event.target != this) ? $(event.target).parents("li")[0] : event.target;
    $(document.body).attr('class', viewRequested.id.replace("menu_", ""));

    $("li.menuItem.active").toggleClass("active");
    $(viewRequested).toggleClass("active");

    browser.storage.local.get("settings", function(result) {
        checkNewPreferences()
        updateInputs($(".settingsInput"), result);
    });
});

$('#checkAll').on("click", function(event) {
    $(".settingsLogs").prop("checked", $(event.target).is(':checked'));
});

$(".settingsLogs").on("click", function() {
    var areAllChecked =
        $('.settingsLogs:checked').length == $('.settingsLogs').length;
    $("#checkAll").prop("checked", areAllChecked);
});

$("#startLogs").on("click", function () {
    var startButton = $('#startLogs').prop('disabled', true);
    cleanUp();
    currentSession = {
        startedAt: Date.now(),
        timeoutAt: Date.now() + logTimeout
    };
    browser.storage.local.set({ "logger": currentSession }, function () {
        updatePaths();
        updateRemainingClock(currentSession.startedAt);
        updateStartTime(currentSession.startedAt);
        updateStateLog(true);
        setTimeout(function () {
            // to prevent clock displaying old value  
            toggleLogGUI(true);
            startButton.prop('disabled', false);
        }, 500)

        browser.runtime.sendMessage({
            from: "diagTools",
            subject: "startlogs",
            startedAt: currentSession.startedAt
        });
        $.each(websignerTabs, function (i) {
            var tabId = parseInt(i);
            browser.tabs.sendMessage(tabId,
                {
                    from: "diagTools",
                    subject: "startlogs"
                });
        });
        updateTabButtons();
    });
});

$("#cancelLogs").on("click", function() {
    cancelLogs("canceled");
});

$("#collectLogs").on("click", function() {
    collectLogs("collecting");
});

$("#cleanLogs").on("click", function() {
    $("#cleanLogs").prop('disabled', true);
    cleanUp();
});

$("#copy").on("click", function () {
    copyStringToClipboard($("#folderPath").text())
    var copyButton = $("#copy").addClass("done")
    setTimeout(function () {
        copyButton.removeClass("done");
    }, 1500)
})

$(".settingsInput").on("change", function(event) {
    browser.storage.local.get("settings", function(result) {
        checkNewPreferences(event.target, result)
    });
});

$(".settingsInput[type=text]").focusout(function(event) {
    browser.storage.local.get("settings", function(result) {
        checkNewPreferences(event.target, result)
    });
});

$("#saveSettings").on("click", function() {
    browser.storage.local.get("settings", function(result) {
        var settings = result.settings;

        var inputs = $(".settingsInput")
        for (var i = 0; i < inputs.length; i++) {
            settings.plaintext[inputs[i].id] = inputs[i].value;
        }

        browser.storage.local.set({
            settings : settings
        }, function() {
            updateInputs(inputs, result); // shouldnt be necessary but can catch errors
            checkNewPreferences();
        });
    });
});

$("#resetSettings").on("click", function() {
    browser.storage.local.remove("settings", function() {
        window.location.reload();
    });
})

/* EXTENSION MESSAGING LISTENER */
var websignerTabs = {}, completeLogs = {};
browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    message.subject = ('' + message.subject).toLowerCase(); // message subject is always lowerCase

    if ((typeof(message.from) !== "undefined") && (message.from == "content")) {
        if (!(sender.tab.id in websignerTabs)) {
            websignerTabs[sender.tab.id] = sender.tab;
            updateTabButtons();
        }
    }

    switch (message.subject) {
        case "deliverlogs":
            deliverLogs(message.sessionId, message.path);
            break;
        case "disconnected":
            disableLoggerAfterDisconnect();
            break;
    }
});

function disableLoggerAfterDisconnect() {
    $('#startLogs').prop('disabled', true);
    $('#cancelLogs').prop('disabled', true);
    $('#collectLogs').prop('disabled', true);
    $("#cleanLogs").prop('disabled', true)
    $("#info, #logs").toggleClass('logging', false);
    $('#disconnected').addClass('true');
}

browser.tabs.onRemoved.addListener(function(tabId) {
    delete websignerTabs[tabId];
    updateTabButtons();
})

browser.tabs.onUpdated.addListener(function(tabId, operation, tab) {
    if (tabId in websignerTabs) {
        if (operation.status === 'loading') {
            // as soon as the tab changes we remove it from the array, to add it again if a msg is received (cf listener above)
            delete websignerTabs[tab.id];
            updateTabButtons();
        }
    }
});