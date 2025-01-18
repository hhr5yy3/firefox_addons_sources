'use strict';

let lastState = "active";

function onStateChangedCallback(state)
{
    commonUtilities.logTraceMessage("State received: " + state);
    if ((lastState !== "active") &&
        (state === "active")) {
        getDevicePosture();
    }
    lastState = state;
}

try {
    getDevicePosture();
    // listener to detect when the machine's idle/locked/active state changes
    chrome.idle.onStateChanged.addListener(onStateChangedCallback);

    devicePostureTimerId = setInterval(
        getDevicePosture,
        devicePostureQueryInterval
    );
} catch (e) {
    commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
}
