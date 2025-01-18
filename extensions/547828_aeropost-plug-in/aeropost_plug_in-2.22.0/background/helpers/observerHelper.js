/**
 * Copyright (C) 2014 Aerocasillas. All Rights Reserved.
 */

// Observers port name.
const OBSERVER_PORT_NAME = "aero-observer";

/**
 * Observer Helper.
 */
var ObserverHelper = {
  /* The observer class objects. */
  _observers : [],
  _sidebarObservers : [],
  /* Internal port for content script. */
  _internalPort : null,
  /* Internal port for background. */
  _internalPorts : new Array(),
  /* Background view. */
  _backgroundView : null,

  /**
   * Gets the background view.
   * @return the background view.
   */
  get backgroundView() {
    if (!this._backgroundView) {
      this._backgroundView = BackgroundHelper.getBackgroundPage();
    }

    return this._backgroundView;
  },

  /**
   * Initializes the resource.
   */
  init : function() {
    // XXX: no logging for efficiency reasons.

    var that = this;

    if (typeof(ContentScript) == "object") {
      this._internalPort = chrome.runtime.connect({name: OBSERVER_PORT_NAME});
      this._internalPort.onMessage.addListener(
        function(aData) { that._processReceivedDataInContent(aData); });
    } else if (typeof(Background) == "object") {
      chrome.runtime.onConnect.addListener(
        function(aPort) { that._handleConnected(aPort); });
    }
  },

  /**
   * Handles connected.
   * @param aPort the port.
   */
  _handleConnected : function(aPort) {
    // XXX: no logging for efficiency reasons.

    // this is called when a content script is loaded into a webpage.
    if (OBSERVER_PORT_NAME == aPort.name) {
      var that = this;

      // store the new port.
      this._internalPorts.push(aPort);
      // add event listener to process received message.
      aPort.onMessage.addListener(
        function(aData) { that._processReceivedDataInBackground(aData); });
      // add event listener to remove a port from the array when a tab/window
      // is closed.
      aPort.onDisconnect.addListener(function(aDisconnectedPort) {
        $.each(that._internalPorts, function(aCurrIndex, aCurrPort) {
          if (aCurrPort == aDisconnectedPort) {
            that._internalPorts.splice(aCurrIndex, 1);
            return false;
          }
        });
      });
    }
  },

  /**
   * Processes when received data from content script in background.
   * @param aMessage the message sent.
   */
  _processReceivedDataInBackground : function(aMessage) {
    Logger.trace("ObserverHelper._processReceivedDataInBackground");

    if ("observer" == aMessage.message) {
      if (this.backgroundView) {
        this.backgroundView.ObserverHelper.
          runMethodFromContentScript(aMessage.data);
      }
    }
  },

  /**
   * Processes when received data from backgroun in content script.
   * @param aMessage the message sent.
   */
  _processReceivedDataInContent : function(aMessage) {
    Logger.trace("ObserverHelper._processReceivedDataInContent");

    if ("observer" == aMessage.message) {
      ContentScript.observe(aMessage.data.topic, aMessage.data.data);
    }
  },

  /**
   * Runs a method from the content script.
   * @param aData the data sent.
   */
  runMethodFromContentScript : function(aData) {
    Logger.trace("ObserverHelper.runMethodFromContentScript");

    switch (aData.method) {
      case "addObserver":
        this._addObserver("content", aData.topic);
        break;
      case "removeObserver":
        this._removeObserver("content", aData.topic);
        break;
      case "notify":
        this._notify(aData.topic, aData.data);
        break;
    }
  },

  /**
   * Calls to add an observer to the class object.
   * @param aClassObject the class object.
   * @param aTopic the associated topic.
   */
  addObserver : function(aClassObject, aTopic) {
    Logger.trace("ObserverHelper.addObserver");

    var message = {
      message : "observer",
      data : { method: "addObserver", topic : aTopic }
    };
    var method = function(aView) {
      aView.ObserverHelper._addObserver(aClassObject, aTopic);
    };

    if (typeof(Sidebar) == "object") {
      aClassObject.type = "Sidebar";
    }
    this._runInBackground(message, method);
  },

  /**
   * Adds an observer to the class object to start listening to the topic.
   * @param aClassObject the class object.
   * @param aTopic the associated topic.
   */
  _addObserver : function(aClassObject, aTopic) {
    Logger.trace("ObserverHelper._addObserver");

    var index;
    var observerArray = null;

    if (aClassObject.type == "Sidebar") {
      observerArray = this._sidebarObservers;
    } else {
      observerArray = this._observers;
    }

    if (!observerArray[aTopic]) {
      observerArray[aTopic] = [];
    }

    index = this._findObjectIndex(observerArray[aTopic], aClassObject);

    if (-1 == index) {
      observerArray[aTopic].push(aClassObject);
    }
  },

  removeAllObserversByType : function(aType) {
    Logger.trace("ObserverHelper.removeAllObserversByType");

    var message = {
      message : "observer",
      data : { method: "removeAllObserversByType" }
    };
    var method = function(aView) {
      aView.ObserverHelper._removeAllObserversByType(aType);
    };

    this._runInBackground(message, method);
  },

  _removeAllObserversByType : function(aType) {
    var that = this;

    if (aType == "Sidebar") {
      delete that._sidebarObservers;
      that._sidebarObservers = [];
    } else {
      delete that._observers;
      that._observers = [];
    }
  },

  /**
   * Calls to remove an observer to the class object.
   * @param aClassObject the class object.
   * @param aTopic the associated topic.
   */
  removeObserver : function(aClassObject, aTopic) {
    Logger.trace("ObserverHelper.removeObserver");

    var message = {
      message : "observer",
      data : { method: "removeObserver", topic : aTopic }
    };
    var method = function(aView) {
      aView.ObserverHelper._removeObserver(aClassObject, aTopic);
    };

    this._runInBackground(message, method);
  },

  /**
   * Removes an observer to the class object to stop listening to the topic.
   * @param aClassObject the class object.
   * @param aTopic the associated topic.
   */
  _removeObserver : function(aClassObject, aTopic) {
    Logger.trace("ObserverHelper._removeObserver");

    var observerArray = null;

    if (aClassObject.type == "Sidebar") {
      observerArray = this._sidebarObservers;
    } else {
      observerArray = this._observers;
    }

    if (observerArray[aTopic]) {
      var index = this._findObjectIndex(observerArray[aTopic], aClassObject);

      if (-1 != index) {
        observerArray[aTopic].splice(index, 1);
      }

      if (0 == observerArray[aTopic].length) {
        delete observerArray[aTopic];
      }
    }
  },

  /**
   * Calls to notify an observer.
   * @param aTopic the observer topic.
   * @param aData the observer data.
   */
  notify : function(aTopic, aData) {
    Logger.trace("ObserverHelper.notify");

    var message = {
      message : "observer",
      data : { method: "notify", topic : aTopic, data : aData }
    };
    var method = function(aView) {
      aView.ObserverHelper._notify(aTopic, aData);
    };

    this._runInBackground(message, method);
  },

  /**
   * Notifies an observer.
   * @param aTopic the observer topic.
   * @param aData the observer data.
   */
  _notify : function(aTopic, aData) {
    Logger.trace("ObserverHelper._notify");

    var that = this;

    if (this._observers[aTopic]) {
      $.each(this._observers[aTopic], function(aIndex, aObject) {
        if ("content" == aObject) {
          that._notifyContentScript(aTopic, aData);
        } else if (aObject && aObject.observe) {
//          try {
            aObject.observe(aTopic, aData);
//          } catch(e) {
//            Logger.error(
//              "ObserverHelper._notify Error: " + e + ". Topic: " + aTopic);
//          }
        }
      });
    }

    if (this._sidebarObservers[aTopic]) {
      $.each(this._sidebarObservers[aTopic], function(aIndex, aObject) {
        if ("content" == aObject) {
          that._notifyContentScript(aTopic, aData);
        } else if (aObject && aObject.observe) {
          try {
            aObject.observe(aTopic, aData);
          } catch(e) {
            Logger.error(
              "ObserverHelper._notify Error: " + e + ". Topic: " + aTopic);
          }
        }
      });
    }
  },

  /**
   * Finds the object index in the array.
   * @param aArray the array.
   * @param aObject the object.
   * @return the index if found, -1 otherwise.
   */
  _findObjectIndex : function(aArray, aObject) {
    // XXX: no logging for efficiency reasons.

    var index = -1;

    $.each(aArray, function(aIndex) {
      if (this == aObject) {
        index = aIndex;
      }
    });

    return index;
  },

  /**
   * Notifies an observer in the content script.
   * @param aTopic the observer topic.
   * @param aData the observer data.
   */
  _notifyContentScript : function(aTopic, aData) {
    Logger.trace("ObserverHelper._notifyContentScript");

    var message = {
      message : "observer",
      data : { method: "notify", topic : aTopic, data : aData }
    };

    this._runInContentScript(message);
  },

  /**
   * Runs a method in background depending on the context view.
   * @param aMessage the message in case of sending from content script.
   * @param aFunction the function in case of sending from a view.
   */
  _runInBackground : function(aMessage, aFunction) {
    Logger.trace("ObserverHelper._runInBackground");

    if (typeof(ContentScript) == "object") {
      // call from the content script.
      if (!this._internalPort) {
        this._internalPort =
          chrome.runtime.connect({name: OBSERVER_PORT_NAME});
      }
      this._internalPort.postMessage(aMessage);
    } else {
      // call from a view (background or sidebar).
      aFunction(ObserverHelper.backgroundView);
    }
  },

  /**
   * Runs a method in content script.
   * @param aMessage the message to be sent.
   */
  _runInContentScript : function(aMessage) {
    Logger.trace("ObserverHelper._runInContentScript");

    $.each(this._internalPorts, function(aIndex, aPort) {
      aPort.postMessage(aMessage);
    });
  }
};

window.addEventListener("load", function() { ObserverHelper.init(); }, false);
