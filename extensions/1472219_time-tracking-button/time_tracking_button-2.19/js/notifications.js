var Notifications = function(sel) {
  var _ = this;
  var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  _.bookmark_id = null;
  _.current_interval = '';
  _.bookmarks_loaded = false;

  this.init = function() {
    ApiRemoveItemFromStore('USER_NOTIFICATIONS');
    document.addEventListener("TRACKING_EVENT_UPDATE", function(e) {
      _.trackingEventUpdate();
    });
    chrome.notifications.onButtonClicked.addListener(_.onButtonClicked);
  };

  this.getBookmarks = function() {
    bookmarks.get({
      callback: _.onBookmarksLoaded,
      errorCallback: _.onBookmarksError,
      type: "button-notifications"
    });
  };

  this.onBookmarksLoaded = function(data) {
    localStorage.USER_NOTIFICATIONS = (currentUser.get().id < NEW_USERS_STARTS_ON) ? JSON.stringify(USER_NOTIFICATIONS) : JSON.stringify(NEW_USER_NOTIFICATIONS);
    if (typeof(data) != "undefined") {
      var bookmarks = data.data;
      for (var k in bookmarks) {
        if (bookmarks[k].user_id == currentUser.get().id) {
          _.bookmark_id = bookmarks[k].id;
          localStorage.USER_NOTIFICATIONS = bookmarks[k].data;
        }
      }
    }
    // sended to options-ui.js
    chrome.runtime.sendMessage({ action: "onBookmarksLoaded", data: {} });
    _.bookmarks_loaded = true;
    _.trackingEventUpdate();
  };

  this.onBookmarksError = function(data) {
    // sended to options-ui.js
    chrome.runtime.sendMessage({ action: "onBookmarksError", data: {} });
  };

  this.saveBookmarks = function(data) {
    var params = {
      data: {
        user_id: currentUser.get().id,
        type: "button-notifications",
        name: "Button Nofifications Settings",
        data: JSON.stringify(data)
      },
      callback: _.onBookmarkSaved,
      errorCallback: _.onBookmarkSavedError
    };
    if (_.bookmark_id == null) {
      bookmarks.add(params);
    } else {
      params.bookmark_id = _.bookmark_id;
      bookmarks.update(params);
    }
  };

  this.onBookmarkSaved = function(data) {
    localStorage.USER_NOTIFICATIONS = data.data.data;
    _.setSettings();
    // sended to options-ui.js
    chrome.runtime.sendMessage({ action: "onBookmarksSaved", data: data });
    _.restartInterval();
  };

  this.onBookmarkSavedError = function(data) {
    // sended to options-ui.js
    chrome.runtime.sendMessage({ action: "onBookmarksSavedError", data: data });
  };

  this.trackingEventUpdate = function() {
    if (!_.bookmarks_loaded) {
      return false;
    }
    if (timeManager.task_data == "") {
      _.notTrackingInterval();
    } else {
      _.whenTrackingInterval();
    }
  };

  this.notTrackingInterval = function() {
    _.setSettings();
    _.clearIntervals();
    _.current_interval = 'not_tracking';
    registeredInterval(_.notifyNotTracking, _.settings.not_tracking_interval * 60 * 1000, 'not_tracking_timer');
  };

  this.whenTrackingInterval = function() {
    _.setSettings();
    _.clearIntervals();
    _.current_interval = 'when_tracking';
    registeredInterval(_.notifyWhenTracking, _.settings.when_tracking_interval * 60 * 1000, 'when_tracking_timer');
  };

  this.restartInterval = function() {
    if (_.current_interval == "not_tracking") {
      _.notTrackingInterval();
    } else if (_.current_interval == "when_tracking") {
      _.whenTrackingInterval();
    }
  };

  this.notifyNotTracking = function() {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      if (!isOpenInBrowser(windows)) {
        if (canNotify("not_tracking") == false) {
          return false;
        }
        // limpio notificaciones
        chrome.notifications.clear("when_tracking", function() {});
        // creo notificaciones
        chrome.notifications.create(
          "not_tracking", {
            type: "basic",
            title: "You are not tracking!",
            message: "This is just a friendly reminder that you are currently not tracking any task.",
            contextMessage: "TrackingTime",
            iconUrl: "img/iconos/128x128_notif.png",
          },
          function() {}
        );
      }
    });
  };

  this.notifyWhenTracking = function() {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      if (!isOpenInBrowser(windows)) {
        if (canNotify("when_tracking") == false || timeManager.task_data == "") {
          return false;
        }
        var title = "You are tracking:";
        var msg_array = [];
        var msg = '';
        if (!!timeManager.task_data.project || !!timeManager.task_data.name) {
          if (!!timeManager.task_data.project) {
            msg_array.push(timeManager.task_data.project);
          }
          if (!!timeManager.task_data.name) {
            msg_array.push(timeManager.task_data.name);
          }
          msg = msg_array.join(': ');
        }
        
        var icon = "img/iconos/128x128_notif.png";
        var progress = false;
        if (timeManager.task_data.estimated_time) {
          progress = getProgress(timeManager.task_data.worked_hours, timeManager.task_data.estimated_time);
          if (progress == "exceeded") {
            icon = "img/iconos/128x128_notif.png";
            progress = 100;
          }
        }
        // limpio notificaciones
        chrome.notifications.clear("not_tracking", function() {});
        // creo notificacion
        if (progress) {
          chrome.notifications.create(
            "when_tracking", {
              type: "progress",
              title: title,
              message: msg,
              contextMessage: "TrackingTime",
              iconUrl: icon,
              progress: progress
            },
            function() {}
          );
        } else {
          chrome.notifications.create(
            "when_tracking", {
              type: "basic",
              title: title,
              message: msg,
              contextMessage: "TrackingTime",
              iconUrl: icon,
            },
            function() {}
          );
        }

        // cierro después de 20 segundos
        setTimeout(function() {
          chrome.notifications.clear("when_tracking", function() {});
        }, 20000);
      }
    });
  };

  this.notifyOnError = function(error) {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      if (!isOpenInBrowser(windows)) {
        /*if (canNotify("on_error") == false) {
          return false;
        }*/
        // limpio notificaciones
        chrome.notifications.clear("on_error", function() {});
        
        var error_div = document.createElement("div");
        error_div.innerHTML = error.message;
        var error_message = error_div.textContent || error_div.innerText || "";
         
        var params = {
          type: "basic",
          title: "Something Went Wrong",
          message: error_message,
          contextMessage: "TrackingTime",
          iconUrl: "img/iconos/128x128_notif.png"
        };
        
        if(!FF) {          
          params.requireInteraction = true;
        }
        
        // creo notificaciones
        chrome.notifications.create("on_error", params,function() {});

        // cierro después de 10 segundos
        /*
        setTimeout(function() {
          chrome.notifications.clear("on_error", function() {});
        }, 10000);
        */
      }
    });
  };
  
  this.notifyOnSyncRequired = function(app_key) {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      if (!isOpenInBrowser(windows)) {
        
        // limpio notificaciones
        chrome.notifications.clear("on_sync_required", function() {});
        
        var integration = integration = INTEGRATIONS.filter(function(i) { return i.key == app_key; })[0] || false;
        
        // creo notificaciones
        chrome.notifications.create(
          "on_sync_required", {
            type: "basic",
            title: "App integration required",
            message: integration ? integration.name : app_key,
            contextMessage: "TrackingTime",
            iconUrl: "img/iconos/128x128_notif.png",
            buttons:[{title:'Enable'}]
          },
          function() {}
        );

        // cierro después de 10 segundos
        /*
        setTimeout(function() {
          chrome.notifications.clear("on_sync_required_" + app_key, function() {});
        }, 10000);
        */
      }
    });
  };
  
  this.notifyOnDomains = function(version) {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      if (!isOpenInBrowser(windows)) {
        
        // limpio notificaciones
        chrome.notifications.clear("on_domains", function() {});
        
        // creo notificaciones
        chrome.notifications.create(
          "on_domains", {
            type: "basic",
            title: "A newer version of domains file was found.",
            message: version,
            contextMessage: "TrackingTime",
            iconUrl: "img/iconos/128x128_notif_grey.png",
            buttons:[{title:'Reload Tabs'}]
          },
          function() {}
        );
      }
    });
  };
  
  this.setSettings = function() {
    _.settings = USER_NOTIFICATIONS;
    try {
      _.settings = JSON.parse(localStorage.USER_NOTIFICATIONS);
    } catch (err) {}
  };

  this.clearIntervals = function() {
    _.current_interval = '';
    clearRegisteredInterval('when_tracking_timer');
    clearRegisteredInterval('not_tracking_timer');
  };
  
  this.onButtonClicked = function(notificationId) {
    if(notificationId.indexOf('on_sync_required') == 0){
      //notificationId.split('_')[2]
      // sended to options-ui.js
      navigateToDesktop('/auth-and-calendars');
      //chrome.runtime.sendMessage({ action: "navigateToAuth", data: {} });
    } else
    if (notificationId.indexOf('on_domains') == 0) {
      TTExtension.reloadTabs()
    }
  };

  var isOpenInBrowser = function(windows) {
    return false;
    /*
    var open_in_browser = false;
    windows.forEach(function(window) {
      window.tabs.forEach(function(tab) {
        if (tab.url.indexOf(PRODUCTION_DOMAIN) > -1) {
          open_in_browser = true;
        }
      });
    });
    return open_in_browser;
    */
  };

  var canNotify = function(type) {
    _.setSettings();

    if (typeof(_.settings[type]) == "undefined" || _.settings[type] == false) {
      return false;
    }

    var d = new Date();
    var current_day = days[d.getDay()];
    var min = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var current_time = d.getHours() + ":" + min;
    var lapse = _.settings[current_day];
    if (lapse == null) {
      return false;
    }
    Date.parse('01/01/2017 ' + lapse.from);
    var from = Date.parse('01/01/2017 ' + lapse.from);
    var to = Date.parse('01/01/2017 ' + lapse.to);
    var now = Date.parse('01/01/2017 ' + current_time);
    if (now < from || now > to) {
      return false;
    }
    return true;
  };

  var getProgress = function(val, total) {
    var percent_number = Math.floor(porcentaje(val, total));
    if (!isNaN(percent_number) && percent_number > 100) {
      percent_number = "exceeded";
    }
    return percent_number;
  };
  
  _.init();
};
