'use strict';

/**
 * This module is responsible for coordinating gesture state between the background and content scripts. This script
 * extends mouseEvents.js but only in the top window/frame.
 */
window.fg.extend('mouseEvents', function (exports, fg) {

  /**
   * A utility class to aggregate dx and dy in mouse events.
   * This is used to throttle processing of mouse move events.
   */
  class MouseAccumulator {
    constructor () {
      this.reset();
    }

    // Reset the accumulated deltas.
    reset () {
      this.dx1 = this.dy1 = 0;
    }

    // Accumulate the mouse deltas in a mouse event.
    accumulate (mouseMove) {
      mouseMove.dx = (this.dx1 += mouseMove.dx);
      mouseMove.dy = (this.dy1 += mouseMove.dy);
      return mouseMove;
    }
  }

  // State for this module.
  const state = Object.assign(exports.state, {
    mouseAccumulator: new MouseAccumulator(),   // Accumulator to throttle mouse events.
    gestureDetector: null,                      // Mouse gesture implementation for UDLR gestures.
    disableGestures: false,                     // Disable gesture handlers when true.
    timeoutHandle: null,                        // Gesture timeout interval handle.
    noMovementTicks: 0,                         // Number of 100ms ticks without movement.
    getContentResolve: null                     // Promise to resolve a async work in the content.
  });

  // Settings for this module.
  const settings = fg.helpers.initModuleSettings({
    blacklistUrlPatterns: [],
    drawTrails: true,
    gestureTimeout: 2000,
    showStatusText: true,
    gestureDetector: {
      style: 'cardinal'
    }
  }, 'local');

  // Initialize and enable gestures in this tab if not blacklisted.
  initializeGestures(0);

  // Event listeners ---------------------------------------------------------------------------------------------------

  // Handle messages from the background script.
  browser.runtime.onMessage.addListener((message, sender) => {
    switch (message.topic) {
      case 'mg-toggleEventListeners':
        return toggleEventListeners(message.data);

      case 'mg-applyState':
        // Cancel any pending state changes.
        if (state.deadTimeHandle !== null) {
          window.clearTimeout(state.deadTimeHandle);
          state.deadTimeHandle = null;
        }

        // Restore a clone of the state.
        exports.replicateState(message.data);
        break;
      case 'mg-abortGesture':
        // Cancel any in-progress gesture state using a dead-time. In this way, if a command is handled quickly such
        // that the contextmenu or other events arrive after the abort message, no contextmenu will be shown.
        exports.abortMouseGesture();
        exports.clickDeadTime({
          gestureState: exports.GESTURE_STATE.NONE,
          contextMenu: false
        }, {
          chordButtons: [],
          contextMenu: true
        }, 600);
        break;
      case 'mg-status':
        // Update the status text.
        fg.ui.status(message.data);
        break;

      // Async content work handlers for the top frame.
      case 'mg-getCanvasImage':
        return exports.onGetCanvasImage(message.data);
      case 'mg-getSelectedLinks':
        return exports.onGetSelectedLinks(message.data);
      case 'mg-getContentDisposition':
        return exports.getContentDisposition(message.data);
    }
    return false;
  });

  window.addEventListener('message', function (event) {
    if (event.data) {
      switch (event.data.topic) {
        case 'mg-status':
          fg.ui.status(event.data.data);
          break;
        case 'mg-gotContentResolve':
          // Async content work handlers post their results using this message.
          if (state.getContentResolve) {
            state.getContentResolve(event.data.data);
            state.getContentResolve = null;
          }
          break;
      }
    }
  });

  // Functions ---------------------------------------------------------------------------------------------------------

  // Sends the Content-Type and Content-Disposition header values to the background script. Does a fetch HEAD from the
  // content script to preserve the same origin. Unfortunately, cross-origin always fails due to the error: CORS header 
  // 'Origin' cannot be added.
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSOriginHeaderNotAdded
  exports.getContentDisposition = function (data) {
    return fetch(data.url, {
      method: 'HEAD',
      mode: 'same-origin'
    }).then(res => {
      return {
        error: false,
        contentType: res.headers.get('Content-Type'),
        contentDisposition: res.headers.get('Content-Disposition')
      };
    }).catch(err => {
      return {
        error: true,
        contentType: null,
        contentDisposition: null
      };
    });
  };

  // Mouse gestures ----------------------------------------------------------------------------------------------------

  // Invoked when a mouse gesture begins.
  exports.mouseGestureStart = function (mouseData) {
    // Start tracking the gesture.
    state.gestureDetector = new GestureDetector(settings.gestureDetector);

    // Paint the gesture trail.
    if (settings.drawTrails) {
      fg.ui.beginTrail(mouseData);
    }
  };

  // Invoked when the mouse moves during a mouse gesture.
  exports.mouseGestureUpdate = function (mouseMove) {
    // Reset the number of ticks without movement.
    state.noMovementTicks = 0;

    // Start the gesture timeout interval.
    if (settings.gestureTimeout && !state.timeoutHandle) {
      state.timeoutHandle = window.setInterval(function () {
        if (++state.noMovementTicks >= (settings.gestureTimeout / 100)) {
          // Abort the mouse gesture but ensure context menu and clicks are prevented.
          exports.abortMouseGesture();
          exports.replicateState({
            gestureState: exports.GESTURE_STATE.MOUSE_TIMEOUT
          });
        }
      }, 100);
    }

    // Update the gesture.
    if (state.gestureDetector.addPoint(mouseMove)) {
      browser.runtime.sendMessage({
        topic: 'mg-gestureProgress',
        data: {
          gesture: state.gestureDetector.gesture
        }
      });
    }

    // Paint the gesture trail.
    if (settings.drawTrails) {
      fg.ui.updateTrail(mouseMove);
    }
  };

  // Invoked when a mouse gesture ends.
  exports.mouseGestureFinish = function (mouseUp) {
    // Clear the gesture timeout interval.
    window.clearInterval(state.timeoutHandle);
    state.timeoutHandle = null;

    // Hide the gesture trail.
    if (settings.drawTrails) {
      fg.ui.finishTrail();
    }

    // Handle the gesture.
    var gesture = state.gestureDetector.gesture;
    if (gesture) {
      browser.runtime.sendMessage({
        topic: 'mg-mouseGesture',
        data: {
          context: state.mouseDownData.context,
          element: state.mouseDownData.element,
          gesture: gesture
        }
      });
    }

    state.gestureDetector = null;
  };

  // Abort a mouse gesture and reset the interface.
  exports.abortMouseGesture = function () {
    // Clear the gesture timeout interval.
    if (state.timeoutHandle) {
      window.clearInterval(state.timeoutHandle);
      state.timeoutHandle = null;
    }

    // Hide the gesture trail.
    if (settings.drawTrails) {
      fg.ui.finishTrail();
    }

    // Hide the status text.
    if (settings.showStatusText) {
      fg.ui.status(null);
    }
  };

  // Wheel gestures ----------------------------------------------------------------------------------------------------

  // Get the gesture corresponding to the scroll direction.
  function getWheelDirection (wheel) {
    if (wheel.y < 0) {
      return 'up';
    } else
    if (wheel.y > 0) {
      return 'down';
    } else
    if (wheel.x < 0) {
      return 'left';
    } else
    if (wheel.x > 0) {
      return 'right';
    }
  }

  // Invoked when a wheel gesture is performed.
  exports.wheelGestureInitial = function (data) {
    if (state.disableGestures) { return; }

    // Handle the wheel gesture.
    let handler = browser.runtime.sendMessage({
      topic: 'mg-wheelGesture',
      data: {
        context: state.mouseDownData.context,
        element: state.mouseDownData.element,
        gesture: getWheelDirection(data.wheel),

        // If the wheel gesture changes the active tab, then the gesture state must be cloned to the new active tab.
        cloneState: {
          mouseDownData: state.mouseDownData,
          gestureState: exports.GESTURE_STATE.WHEEL,
          chordButtons: state.chordButtons,
          contextMenu: state.contextMenu,
          preventClick: state.preventClick
        }
      }
    });

    // Disable gesture handlers until this gesture has been processed by the background script.
    state.disableGestures = true;
    exports.abortMouseGesture();

    // Handle popup items or allow additional wheel gestures to be performed.
    handler.then(result => {
      state.disableGestures = false;

      // Handle popup items if the command is a popup type.
      result = result || {};
      if (result.popup) {
        // TODO Not implemented yet.
      } else
      // End the gesture if repetition is not allowed.
      if (!result.repeat) {
        exports.abortGesture();
      }
    });
  };

  // Invoked on subsequent scroll events during a wheel gesture.
  // TODO This will change when popups are implemented.
  exports.wheelGestureRepeat = exports.wheelGestureInitial;

  // Chord gestures ----------------------------------------------------------------------------------------------------

  // Invoked when a chord gesture is performed.
  exports.chordGesture = function (data) {
    if (state.disableGestures) { return; }

    // Handle the chord gesture.
    let handler = browser.runtime.sendMessage({
      topic: 'mg-chordGesture',
      data: {
        context: state.mouseDownData.context,
        element: state.mouseDownData.element,
        gesture: data.chord,

        // If the chord gesture changes the active tab, then the gesture state must be cloned to the new active tab.
        cloneState: {
          mouseDownData: state.mouseDownData,
          gestureState: exports.GESTURE_STATE.CHORD,
          chordButtons: state.chordButtons,
          contextMenu: state.contextMenu,
          preventClick: state.preventClick
        }
      }
    });

    // Disable gesture handlers until this gesture has been processed by the background script.
    exports.abortMouseGesture();
    state.disableGestures = true;

    // Handle popup items or allow additional chord gestures to be performed.
    handler.then(result => {
      state.disableGestures = false;

      // Handle popup items if the command is a popup type.
      result = result || {};
      if (result.popup) {
        // TODO Not implemented yet.
      } else
      // End the gesture if repetition is not allowed.
      if (!result.repeat) {
        exports.abortGesture({
          contextMenu: false
        });
      }
    });

  };

  // Functions ---------------------------------------------------------------------------------------------------------

  // Initialize and enable gestures in this tab if not blacklisted.
  function initializeGestures (attempt) {
    browser.runtime.sendMessage({
      topic: 'mg-getInitialState',
      data: {
        url: String(window.location.href)
      }
    }).then(initialState => {
      // Enable gestures if the tab or URL is not blacklisted.
      if (!initialState.blacklisted) {
        // If there is a restore state for this tab then apply it as soon as possible.
        // At the moment, the use case for this is restoring closed tabs and windows.
        if (initialState.restoreState) {
          exports.replicateState(initialState.restoreState);
        }

        // Install native event listeners.
        exports.installEventListeners();
      }

      // Reset the browserAction title/icon.
      exports.resetBrowserAction();
    }).catch(() => {
      // During upgrade/install the background script maybe not be loaded before the content script. Make several
      // attempts to initialize before giving up.
      if (attempt < 10) {
        attempt++;
        window.setTimeout(() => initializeGestures(attempt), 250);
        console.log('retry gestures init - attempt', attempt);
      }
    });
  }

  // Toggle gestures enabled by installing or removing event listeners.
  function toggleEventListeners () {
    if (state.listenersInstalled) {
      exports.removeEventListeners();
    } else {
      exports.installEventListeners();
    }

    // Return the installed state of the event listeners.
    return Promise.resolve({
      enabled: state.listenersInstalled,
    });
  }

  // Set the browserAction title/icon to match the current state of installed event listeners in this tab.
  exports.resetBrowserAction = function () {
    browser.runtime.sendMessage({
      topic: 'mg-browserAction',
      data: {
        enabled: state.listenersInstalled
      }
    });
  };

});
