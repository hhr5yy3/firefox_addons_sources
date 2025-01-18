let a = document.getElementById("toggleAllOptions");
let o = document.getElementById("clearAllOptions");
let b = document.getElementsByName('chkAll');
let c = document.getElementById("toggleRoles");
let d = document.getElementById("togglelandmarks");
let e = document.getElementById("toggleStructural");
let f = document.getElementById("toggleDialogs");
let g = document.getElementById("toggleLiveRegions");
let h = document.getElementById("toggleSimpleWidgets");
let i = document.getElementById("toggleCombobox");
let j = document.getElementById("toggleMenus");
let k = document.getElementById("toggleRadio");
let l = document.getElementById("toggleTabs");
let m = document.getElementById("toggleTree");
let n = document.getElementById("toggleTable");
let p = document.getElementById("accName");

document.addEventListener('DOMContentLoaded', function () {

    browser.storage.local.get(['allOptions'], function (result) {
        if (result.allOptions != null) {
            a.checked = result.allOptions;
        }
    });
    browser.storage.local.get(['accNameDesc'], function (result) {
        if (result.accNameDesc != null) {
            p.checked = result.accNameDesc;
        }
    });
    browser.storage.local.get(['roles'], function (result) {
        if (result.roles != null) {
            c.checked = result.roles;
        }
    });
    browser.storage.local.get(['landmarks'], function (result) {
        if (result.landmarks != null) {
            d.checked = result.landmarks;
        }
    });
    browser.storage.local.get(['structural'], function (result) {
        if (result.structural != null) {
            e.checked = result.structural;
        }
    });
    browser.storage.local.get(['dialogs'], function (result) {
        if (result.dialogs != null) {
            f.checked = result.dialogs;
        }
    });
    browser.storage.local.get(['liveRegions'], function (result) {
        if (result.liveRegions != null) {
            g.checked = result.liveRegions;
        }
    });
    browser.storage.local.get(['simpleWidgets'], function (result) {
        if (result.simpleWidgets != null) {
            h.checked = result.simpleWidgets;
        }
    });
    browser.storage.local.get(['combobox'], function (result) {
        if (result.combobox != null) {
            i.checked = result.combobox;
        }
    });
    browser.storage.local.get(['menus'], function (result) {
        if (result.menus != null) {
            j.checked = result.menus;
        }
    });
    browser.storage.local.get(['radioButtons'], function (result) {
        if (result.radioButtons != null) {
            k.checked = result.radioButtons;
        }
    });
    browser.storage.local.get(['tabs'], function (result) {
        if (result.tabs != null) {
            l.checked = result.tabs;
        }
    });
    browser.storage.local.get(['tree'], function (result) {
        if (result.tree != null) {
            m.checked = result.tree;
        }
    });
    browser.storage.local.get(['grid'], function (result) {
        if (result.grid != null) {
            n.checked = result.grid;
        }
    });
    browser.storage.local.get(['accND'], function (result) {
        if (result.accND != null) {
            p.checked = result.accND;
        }
    });
});

(async () => {
    const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });
    try {
        await browser.scripting.executeScript({
            target: {
                tabId: tab.id,
                allFrames: true
            },
            files: ['roles.js', 'recursion.js', 'accName.js'],
        });
    } catch (erri) {
        console.error(`failed to execute script: ${erri}`);
    }
})();

a.addEventListener("click", async () => {

    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    a.classList.toggle('toggleOn');

    browser.storage.local.set({
        allOptions: a.checked
    }, function () {

        //b.forEach((p) => p.setAttribute('aria-checked', p.getAttribute('aria-checked') === 'true' ? 'false' : 'true'));

        if (a.classList.contains("toggleOn")) {

            c.checked = true;
            d.checked = true;
            e.checked = true;
            f.checked = true;
            g.checked = true;
            h.checked = true;
            i.checked = true;
            j.checked = true;
            k.checked = true;
            l.checked = true;
            m.checked = true;
            n.checked = true;
            p.checked = true;

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/1roles.css", "css/2landmarks.css", "css/3structural.css", "css/4dialogs.css", "css/5live-regions.css", "css/6simple-widgets.css", "css/7combobox-listbox.css", "css/8menu-menubar.css", "css/9radiogroup.css", "css/10tablist.css", "css/11tree.css", "css/12treegrid-grid-table.css", "css/accND.css"],
                });
            } catch (err) {
                console.error(`failed to insert roles CSS: ${err}`);
            }

        } else {

            c.checked = false;
            d.checked = false;
            e.checked = false;
            f.checked = false;
            g.checked = false;
            h.checked = false;
            i.checked = false;
            j.checked = false;
            k.checked = false;
            l.checked = false;
            m.checked = false;
            n.checked = false;
            p.checked = false;

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/1roles.css", "css/2landmarks.css", "css/3structural.css", "css/4dialogs.css", "css/5live-regions.css", "css/6simple-widgets.css", "css/7combobox-listbox.css", "css/8menu-menubar.css", "css/9radiogroup.css", "css/10tablist.css", "css/11tree.css", "css/12treegrid-grid-table.css", "css/accND.css"],
                });
            } catch (err) {
                console.error(`failed to remove roles CSS: ${err}`);
            }
        }
    });
});

p.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });
    browser.storage.local.set({
        accNameDesc: p.checked
    }, function () {

        if (p.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/accND.css"],
                });
            } catch (err) {
                console.error(`failed to insert NAme Desc CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/accND.css"],
                });
            } catch (err) {
                console.error(`failed to remove Name Desc CSS: ${err}`);
            }
        }
    });
});

c.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });
    browser.storage.local.set({
        roles: c.checked
    }, function () {

        if (c.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/1roles.css"],
                });
            } catch (err) {
                console.error(`failed to insert roles CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/1roles.css"],
                });
            } catch (err) {
                console.error(`failed to remove roles CSS: ${err}`);
            }
        }
    });
});

d.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        landmarks: d.checked
    }, function () {

        if (d.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/2landmarks.css"],
                });
            } catch (err) {
                console.error(`failed to insert landmark CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/2landmarks.css"],
                });
            } catch (err) {
                console.error(`failed to remove landmark CSS: ${err}`);
            }
        }
    });
});

e.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        structural: e.checked
    }, function () {

        if (e.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/3structural.css"],
                });
            } catch (err) {
                console.error(`failed to insert structural landmark CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/3structural.css"],
                });
            } catch (err) {
                console.error(`failed to remove structural CSS: ${err}`);
            }
        }
    });
});

f.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        dialogs: f.checked
    }, function () {

        if (f.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/4dialogs.css"],
                });

            } catch (err) {
                console.error(`failed to insert dialog CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/4dialogs.css"],
                });
            } catch (err) {
                console.error(`failed to remove dialog CSS: ${err}`);
            }
        }
    });
});

g.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        liveRegions: g.checked
    }, function () {

        if (g.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/5live-regions.css"],
                });
            } catch (err) {
                console.error(`failed to insert regions CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/5live-regions.css"],
                });
            } catch (err) {
                console.error(`failed to remove regions CSS: ${err}`);
            }
        }
    });
});

h.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        simpleWidgets: h.checked
    }, function () {

        if (h.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/6simple-widgets.css"],
                });
            } catch (err) {
                console.error(`failed to insert widgets CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/6simple-widgets.css"],
                });
            } catch (err) {
                console.error(`failed to remove widgets CSS: ${err}`);
            }
        }
    });
});

i.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        combobox: i.checked
    }, function () {

        if (i.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/7combobox-listbox.css"],
                });
            } catch (err) {
                console.error(`failed to insert combobox-listbox CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/7combobox-listbox.css"],
                });
            } catch (err) {
                console.error(`failed to remove combobox-listbox CSS: ${err}`);
            }
        }
    });
});

j.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        menus: j.checked
    }, function () {

        if (j.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/8menu-menubar.css"],
                });
            } catch (err) {
                console.error(`failed to insert menu CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/8menu-menubar.css"],
                });
            } catch (err) {
                console.error(`failed to remove menu CSS: ${err}`);
            }
        }
    });
});

k.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        radioButtons: k.checked
    }, function () {

        if (k.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/9radiogroup.css"],
                });
            } catch (err) {
                console.error(`failed to insert radiogroup CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/9radiogroup.css"],
                });
            } catch (err) {
                console.error(`failed to remove radiogroup CSS: ${err}`);
            }
        }
    });
});

l.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        tabs: l.checked
    }, function () {

        if (l.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/10tablist.css"],
                });
            } catch (err) {
                console.error(`failed to insert tablist CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/10tablist.css"],
                });
            } catch (err) {
                console.error(`failed to remove tablist CSS: ${err}`);
            }
        }
    });
});

m.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        tree: m.checked
    }, function () {

        if (m.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/11tree.css"],
                });
            } catch (err) {
                console.error(`failed to insert tree CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/11tree.css"],
                });
            } catch (err) {
                console.error(`failed to remove tree CSS: ${err}`);
            }
        }
    });
});

n.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.set({
        grid: n.checked
    }, function () {

        if (n.checked) {

            try {
                browser.scripting.insertCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/12treegrid-grid-table.css"],
                });
            } catch (err) {
                console.error(`failed to insert treegrid CSS: ${err}`);
            }

        } else {

            try {
                browser.scripting.removeCSS({
                    target: {
                        tabId: tab.id,
                        allFrames: true
                    },
                    files: ["css/12treegrid-grid-table.css"],
                });
            } catch (err) {
                console.error(`failed to remove treegrid CSS: ${err}`);
            }
        }
    });
});

o.addEventListener("click", async () => {
    let [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.storage.local.clear(function () {
        var error = browser.runtime.lastError;
        if (error) {
            console.error(error);
        }

    });

    a.checked = false;
    c.checked = false;
    d.checked = false;
    e.checked = false;
    f.checked = false;
    g.checked = false;
    h.checked = false;
    i.checked = false;
    j.checked = false;
    k.checked = false;
    l.checked = false;
    m.checked = false;
    n.checked = false;

    try {
        browser.scripting.removeCSS({
            target: {
                tabId: tab.id,
                allFrames: true
            },
            files: ["css/1roles.css", "css/2landmarks.css", "css/3structural.css", "css/4dialogs.css", "css/5live-regions.css", "css/6simple-widgets.css", "css/7combobox-listbox.css", "css/8menu-menubar.css", "css/9radiogroup.css", "css/10tablist.css", "css/11tree.css", "css/12treegrid-grid-table.css", "css/accND.css"],
        });

    } catch (err) {
        console.error(`failed to remove CSS: ${err}`);
    }
});
