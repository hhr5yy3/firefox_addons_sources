'use strict';

// Note: Chrome provides an "alarms" API, but:
// * It requires an extra permission: "alarms"
// * The minimum interval is one minute.
// https://developer.chrome.com/extensions/alarms
//
// Since this extension has sub-minute reload intervals, the "alarms" API can't
// be used. That's why this extension uses a persistent background page with
// setInterval/setTimeout.

//////////////////////////////////////////////////////////////////////
// Internal data structure.

function Reload(tab_id, seconds) {
    this.tab_id = tab_id;
    this.seconds = seconds;  // Interval in seconds
    this.next_reload_timestamp = Date.now() + 1000 * seconds;  // Milliseconds
    this.badge_interval_text = seconds_to_badge_text(seconds);
    this.interval_id = null;
    this.tab_info = null;
}

Reload.prototype.toString = function () {
    return 'Reload(' + this.tab_id + ', ' + this.seconds + ' /* text=' + this.badge_interval_text + ', id=' + this.interval_id + ' */ )';
};

Reload.prototype.reload_tab = function () {
    this.next_reload_timestamp = Date.now() + 1000 * this.seconds;
    chrome.tabs.reload(this.tab_id);
};

Reload.prototype.set_chrome_badge = function () {
    let badge_text;
    let badge_color = '#204a87';
    if (!this.tab_id) {
        // Tab has been closed/removed.
        return;
    }
    if (!this.interval_id) {
        // Tab is no longer auto-reloading.
        badge_text = '';
    } else if (g_should_display_badge_countdown && this.next_reload_timestamp > 0) {
        badge_color = '#4e9a06';
        let delta = Math.round((this.next_reload_timestamp - Date.now()) / 1000);
        if (delta > 0) {
            badge_text = seconds_to_badge_text(delta);
        } else {
            badge_text = 'now';
        }
    } else {
        badge_text = this.badge_interval_text;
    }
    chrome.browserAction.setBadgeText({
        text: badge_text,
        tabId: this.tab_id
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: badge_color,
        tabId: this.tab_id
    });
};

Reload.prototype.clear = function () {
    clearInterval(this.interval_id);
    this.interval_id = null;
    this.next_reload_timestamp = 0;
    this.badge_interval_text = '';
    this.set_chrome_badge();
};

Reload.prototype.set_tab_info = function (tab) {
    this.tab_info = tab;
    return this.tab_info;
};


//////////////////////////////////////////////////////////////////////
// Global variables.

// Dictionary of currently active Reload objects.
// g_active_reloads[tab_id] -> Reload() object
let g_active_reloads = {};
let g_active_reloads_length = 0;

// To avoid setting event listeners twice.
let g_are_event_listeners_set = false;

// Used to update the badge every second.
let g_should_display_badge_countdown = true;  // This value is overwritten in init().
let g_badge_countdown_interval_id = null;

function update_chrome_badge_every_second() {
    let ids = Object.keys(g_active_reloads)
    for (let tab_id of ids) {
        let x = g_active_reloads[tab_id];
        if (x)
            x.set_chrome_badge();
    }
}


//////////////////////////////////////////////////////////////////////
// "External" API, called from popup.html.
//
// Essentially, manipulates g_active_reloads and calls the required functions.

// Deletes a reload for this tab_id.
// Does nothing if there is no reload for that tab.
function clear_reload(tab_id, has_the_tab_been_removed) {
    let x = g_active_reloads[tab_id];
    if (x) {
        if (has_the_tab_been_removed)
            x.tab_id = null;
        x.clear();
        g_active_reloads_length--;
        set_or_clear_chrome_listeners();
        delete g_active_reloads[tab_id];
    }
}

// Clears all currently active reloads.
function clear_all_reloads() {
    let ids = Object.keys(g_active_reloads)
    for (let tab_id of ids) {
        clear_reload(tab_id);
    }
    console.assert(g_active_reloads_length === 0);
}

// Sets a reload for a tab.
// Clears/deletes the previous reload for that tab before setting a new one.
function set_reload(tab_id, seconds, tab_info = false) {
    clear_reload(tab_id);
    if (seconds > 0) {
        let x = new Reload(tab_id, seconds);
        g_active_reloads[tab_id] = x;
        g_active_reloads_length++;
        x.interval_id = setInterval(function () {
            x.reload_tab();
        }, seconds * 1000);
        x.set_chrome_badge();
        if (tab_info) {
            x.set_tab_info(tab_info);
        }
        set_or_clear_chrome_listeners();
    }
}

// Returns the amount of seconds of a reload of a tab.
// Returns zero if no reload is set.
function get_reload(tab_id) {
    let x = g_active_reloads[tab_id];
    if (x) {
        return x.seconds;
    }
    return 0;
}

// Returns the number of active auto-reloads.
function get_how_many_reloads_are_active() {
    return g_active_reloads_length;
}

// Stop the countdown display on the badge text.
function stop_badge_countdown() {
    if (g_badge_countdown_interval_id) {
        clearInterval(g_badge_countdown_interval_id);
        g_badge_countdown_interval_id = null;
    }
}

// Start the countdown display on the badge text (if it is enabled).
function start_badge_countdown() {
    stop_badge_countdown();
    if (g_should_display_badge_countdown) {
        g_badge_countdown_interval_id = setInterval(update_chrome_badge_every_second, 1000);
    }
}

function refresh_tab(tab_id) {
    chrome.tabs.reload(tab_id)
    let x = g_active_reloads[tab_id];
    if (x)
        set_reload(x.tab_id, x.seconds)
}

//////////////////////////////////////////////////////////////////////
// Misc.

function split_seconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    return {
        'seconds': Math.floor(seconds) % 60,
        'minutes': minutes % 60,
        'hours': hours % 24,
        'days': days
    };
}

function seconds_to_badge_text(seconds) {
    let x = split_seconds(seconds);
    let sep = (seconds % 2 ? ':' : ' ');

    let s = x;
    if (s.hours < 10) s.hours = '0' + s.hours;
    if (s.minutes < 10) s.minutes = '0' + s.minutes;
    if (s.seconds < 10) s.seconds = '0' + s.seconds;
    s.hours = s.hours.toString();
    s.minutes = s.minutes.toString();
    s.seconds = s.seconds.toString();

    if (x.hours > 0) {
        return s.hours + sep + s.minutes;
    } else if (x.minutes > 0) {
        return s.minutes + sep + s.seconds;
    } else {
        return s.seconds;
    }
}

//////////////////////////////////////////////////////////////////////
// Chrome listeners.

function tabs_onUpdated_handler(tab_id, change_info, tab) {
    let x = g_active_reloads[tab_id];
    if (x) {
        if (change_info.status == 'loading') {
            // Reload the badge text for this tab.
            // It gets cleared whenever the tab gets reloaded or loads another
            // page; so the extension needs to keep re-setting the badge.
            x.set_chrome_badge();
        }
    }
}

function tabs_onRemoved_handler(tab_id, remove_info) {
    clear_reload(tab_id, true);
}

// Should be called immediately after g_active_reloads_length is changed.
// Clears the listeners if there is no active reload.
// Sets the listeners if one reload has been added.
function set_or_clear_chrome_listeners() {
    if (g_active_reloads_length == 0) {
        chrome.tabs.onUpdated.removeListener(tabs_onUpdated_handler);
        chrome.tabs.onRemoved.removeListener(tabs_onRemoved_handler);
        stop_badge_countdown();
        g_are_event_listeners_set = false;
    } else if (g_active_reloads_length == 1 && !g_are_event_listeners_set) {
        chrome.tabs.onUpdated.addListener(tabs_onUpdated_handler);
        chrome.tabs.onRemoved.addListener(tabs_onRemoved_handler);
        start_badge_countdown();
        g_are_event_listeners_set = true;
    }
}

//////////////////////////////////////////////////////////////////////
// init
//////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
    //
});

let menus = [
    {title: 'Reload tabs', id: 'reload', contexts: ['browser_action']},
    {title: 'All tabs', id: 'reload.all', contexts: ['browser_action'], parentId: 'reload'},
    {contexts: ['browser_action'], type: 'separator', parentId: 'reload'},
    {title: 'All tabs in the current window', id: 'reload.window', contexts: ['browser_action'], parentId: 'reload'},
    {title: 'Session', id: 'session', contexts: ['browser_action']},
    {title: 'Save current session timers', id: 'session.save', contexts: ['browser_action'], parentId: 'session'},
    {contexts: ['browser_action'], type: 'separator', parentId: 'session'},
    {title: 'Restore the last saved session', id: 'session.restore', contexts: ['browser_action'], parentId: 'session'},
]

menus.forEach(el => {
    chrome.contextMenus.create(el);
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'reload.all') {
        chrome.tabs.query({}, tabs =>
            tabs.forEach(tab => {
                    refresh_tab(tab.id)
                }
            )
        );
    } else if (info.menuItemId === 'reload.window') {
        chrome.tabs.query({currentWindow: true,}, tabs => {
            tabs.forEach(tab => {
                refresh_tab(tab.id)
            });
        });
    } else if (info.menuItemId === 'session.save') {
        chrome.tabs.query({currentWindow: true,}, tabs => {
            tabs.forEach(tab => {
                let x = g_active_reloads[tab.id];
                if (x) {
                    x.set_tab_info(tab);
                }
            });

            chrome.storage.local.set({'tabreloader_mm': g_active_reloads});
        });
    } else if (info.menuItemId === 'session.restore') {
        chrome.storage.local.get(['tabreloader_mm'], (tab_obj) => {
            if (tab_obj && tab_obj['tabreloader_mm']) {
                let session = Object.entries(tab_obj['tabreloader_mm']);

                chrome.tabs.query({currentWindow: true,}, tabs => {
                    tabs.forEach(tab => {
                        let entry = session.filter(e => {
                            return e[1].tab_info.url === tab.url
                                && e[1].tab_info.title === tab.title
                                && e[1].tab_info.index === tab.index
                        });
                        if (!entry.length) {
                            clear_reload(tab.id);
                            return;
                        }

                        entry = entry[0][1]
                        set_reload(tab.id, entry.seconds, tab);
                    })
                });
            }
        });
    }
});