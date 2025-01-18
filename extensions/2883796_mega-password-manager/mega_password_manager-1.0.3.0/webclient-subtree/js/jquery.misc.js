
/**
 * Attach an event handler function for one or more events to the selected elements, replacing
 * any matching previous event handler already attached to the element.
 * This is basically a wrapper for off->on (formerly unbind->bind)
 *
 * @param {String} events One or more space-separated event types and optional namespaces, such as "click"
 * @param {String} [selector] selector to filter the descendants of the selected elements that trigger the event.
 * @param {Function} handler function to execute when the event is triggered.
 * @returns {jQuery}
 */
$.fn.rebind = function(events, selector, handler) {
    'use strict';

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var i = 0;
    var l = this.length;
    while (l > i) {
        $(this[i++]).off(events, selector || null).on(events, selector || null, handler);
    }
    return this;
};
