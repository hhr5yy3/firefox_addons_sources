/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Timer Helper Object.
 */
function Timer(aCallback, aDelay, aIsInterval) {
  this._callback = aCallback;
  this._delay = aDelay;
  this._isInterval = aIsInterval;
  this._startTime = null;
  this._timerId = null;

  this._init();
}

Timer.TYPE_ONE_SHOT =          false;
Timer.TYPE_REPEATING_SLACK =   true;
Timer.TYPE_REPEATING_PRECISE = true;

Timer.prototype = {

  /**
   * Initializes the object.
   */
  _init : function() {
    Logger.trace("Timer._init");

    var that = this;

    if (this._isInterval) {
      this._timerId =
        setInterval(function() {
          that._callback();
          that._startTime = Date.now();
        }, this._delay);
    } else {
      this._timerId = setTimeout(function() { that._callback(); }, this._delay);
    }
    this._startTime = Date.now();
  },

  /**
   * The interval of this timer.
   */
  get interval() {
    return this._delay;
  },

  /**
   * Time elapsed since last call to callback (or since the timer was created,
   * if none has yet been made).
   */
  get elapsedTime() {
    return Date.now() - this._startTime;
  },

  /**
   * Clear the timer.
   */
  cancel : function() {
    Logger.trace("Timer.cancel");

    if (this._isInterval) {
      clearInterval(this._timerId);
    } else {
      clearTimeout(this._timerId);
    }
  }
};
