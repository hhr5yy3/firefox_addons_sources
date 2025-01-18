/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Notification Service.
 */
var NotificationService = {
  _notificationCounter : 0,

  /**
   * Initializes the service.
   */
  _init : function() {
    Logger.trace("NotificationService._init");

    ObserverHelper.addObserver(this, Topics.AEROAPI_ERROR);
    ObserverHelper.addObserver(this, Topics.INVALID_CLIENT_ERROR);
    ObserverHelper.addObserver(this, Topics.FORCE_ACCOUNT_SIGN_OUT);


    chrome.notifications.onClicked.addListener(function(aNotificationId) {
      //console.log("NOTIFICATION CLICKED: " + aNotificationId);
      if (aNotificationId.indexOf("/") != -1) {
        // this means the notification is clickable
        var elements = aNotificationId.split("/");
        var courierNumber = elements[0];
        var type = elements[1];
        //console.log("COURIER NUMBER: " + courierNumber + "/TYPE: " + type);
        var target = null;
        switch (type) {
          case "0":
            target = "newPreAlert";
            break;
          case "1":
            target = "viewCart";
            break;
        }

        if (target != null) {
          Background.openPage(target);
        }
      }
    });

  },

  /**
   * Shows a notification
   * @param aNotification the notification to be shown
   * @param aClickable whether the notification should be clickable or not
   * @param aType the notification type so we know where to take the user on click
   */
  showNotification : function(aNotification, aClickable, aType) {
    // first dismiss any notifications for the package, then display the new one
    chrome.notifications.getAll(function(notifications) {
      for (notification in notifications) {
        if (notification.indexOf(aNotification.id) != -1) {
          chrome.notifications.clear(notification, function(wasCleared) {
            Logger.debug("Notifications: cleared notification " + notification);
            });
        }
      }
      });
    var options = {};
    options.iconUrl = chrome.extension.getURL("/ui/skin/core/images/logo_32_32.png");

    options.title = aNotification.title;
    options.message = aNotification.msg;
    options.type = aNotification.type;
    options.isClickable = true;
    if (aNotification.point) {
      switch (aNotification.point) {
        case "start":
          options.progress = 10;
          break;
        case "invoice":
          options.progress = 60;
          break;
      }
    }
    options.priority = 2;
    var id = null;
    if (aClickable) {
      var type = aType != null ? aType : "";
      id = aNotification.id + "/" +
           type + "/" + this._notificationCounter;
    } else {
      id = aNotification.id + "" + this._notificationCounter;
    }

    this._notificationCounter++;
    chrome.notifications.create(id, options, function(){});
  },

  showForcedSignOutNotification : function() {
    var id = "" + new Date().getTime();
    var notification = new NotificationObject(id);
    notification.type = "basic";
    notification.point = null;
    notification.title = $.i18n.getString("extension.forced.signout.title");
    notification.msg = $.i18n.getString("extension.forced.signout.msg");
    NotificationService.showNotification(notification);
  },

  showInvalidClientNotification : function() {
    var id = "" + new Date().getTime();
    var notification = new NotificationObject(id);
    notification.type = "basic";
    notification.point = null;
    notification.title = $.i18n.getString("extension.api.error.title");
    notification.msg = $.i18n.getString("mainpanel.client.not.allowed");
    NotificationService.showNotification(notification);
  },

  /**
   * Observes for notifications.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {

    switch(aTopic) {
      case Topics.AEROAPI_ERROR:
        var errorMsg = aData;
        var notification = new NotificationObject(new Date().getTime());
        notification.type = "basic";
        notification.point = null;
        notification.title = $.i18n.getString("extension.api.error.title");
        if (errorMsg) {
          notification.msg = errorMsg;
        } else {
          notification.msg = $.i18n.getString("extension.api.general.error.msg");
        }
        NotificationService.showNotification(notification);
        break;
      case Topics.FORCE_ACCOUNT_SIGN_OUT:
        NotificationService.showForcedSignOutNotification();
        break;
      case Topics.INVALID_CLIENT_ERROR:
        NotificationService.showInvalidClientNotification();
        break;
    }
  }

};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(NotificationService);
