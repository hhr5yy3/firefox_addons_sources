var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    const context = config.interface.context;
    const url = app.interface.path + '?' + context;
    /*  */
    app.interface.id = '';
    app.button.popup(context === "popup" ? url : '');
    /*  */
    app.contextmenu.create({
      "id": "tab", 
      "type": "radio", 
      "contexts": ["action"],
      "title": "Open in tab",  
      "checked": context === "tab"
    }, app.error);
    /*  */
    app.contextmenu.create({
      "id": "win", 
      "type": "radio", 
      "contexts": ["action"],
      "title": "Open in win",  
      "checked": context === "win"
    }, app.error);
    /*  */
    app.contextmenu.create({
      "id": "page", 
      "type": "radio", 
      "contexts": ["action"],
      "title": "Open in page",  
      "checked": context === "page"
    }, app.error);
    /*  */
    app.contextmenu.create({
      "id": "popup", 
      "type": "radio", 
      "contexts": ["action"],
      "title": "Open in popup",  
      "checked": context === "popup"
    }, app.error);
  },
  "action": {
    "storage": function (changes, namespace) {
      /*  */
    },
    "removed": function (e) {
      if (e === app.interface.id) {
        app.interface.id = '';
      }
    },
    "page": {
      "icon": function (e) {
        app.button.icon(e.tabId, e.path);
      }
    },
    "interface": {
      "close": function () {
        app.tab.query.active(function (tab) {
          app.page.send("close", null, tab.id, null);
        });
      },
      "print": function () {
        app.tab.query.active(function (tab) {
          app.page.send("print", null, tab.id, null);
        });
      }
    },
    "contextmenu": function (e) {
      app.interface.close(config.interface.context);
      config.interface.context = e.menuItemId;
      /*  */
      const context = config.interface.context;
      const url = app.interface.path + '?' + context;
      app.button.popup(context === "popup" ? url : '');
      /*  */
      if (context !== "page") {
        app.tab.query.active(function (tab) {
          app.button.icon(tab.id, null);
        });
      }
    },
    "button": function (tab) {
      const context = config.interface.context;
      const url = app.interface.path + '?' + context;
      /*  */
      if (context === "popup") {
        app.button.popup(url);
      } else if (context === "page") {
        app.tab.inject.js({
          "target": {"tabId": tab.id}, 
          "files": ["data/content_script/inject.js"]
        });
      } else {
        if (app.interface.id) {
          if (context === "tab") {
            app.tab.get(app.interface.id, function (tab) {
              if (tab) {
                app.tab.update(app.interface.id, {"active": true});
              } else {
                app.interface.id = '';
                app.tab.open(url);
              }
            });
          }
          /*  */
          if (context === "win") {
            app.window.get(app.interface.id, function (win) {
              if (win) {
                app.window.update(app.interface.id, {"focused": true});
              } else {
                app.interface.id = '';
                app.interface.create();
              }
            });
          }
        } else {
          if (context === "tab") app.tab.open(url);
          if (context === "win") app.interface.create(url);
        }
      }
    }
  }
};

app.page.receive("icon", core.action.page.icon);
app.interface.receive("close", core.action.interface.close);
app.interface.receive("print", core.action.interface.print);

app.button.on.clicked(core.action.button);
app.window.on.removed(core.action.removed);
app.contextmenu.on.clicked(core.action.contextmenu);

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
