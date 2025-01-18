"use strict";

var globalTimer;

function getElement() {
  var edpBody = document.querySelector("body");
  return edpBody;
}

var DivAddedOnEdpuzzle = {
  el: null,
  render: function() {
    // 3. Insert the div unless it exists already
    if (!document.querySelector(".edp-extension") && this.el) {
      if (globalTimer) {
        clearInterval(globalTimer);
        globalTimer = undefined;
        this.el = getElement();
      }

      var edpuzzleExtensionDiv = document.createElement("div");

      // 1. Create the container div
      edpuzzleExtensionDiv.className = "edp-extension";

      // 2. Insert the HTML inside Edpuzzle
      this.el.insertAdjacentElement("beforeend", edpuzzleExtensionDiv);
    } else {
      this.el = getElement();
      globalTimer = setInterval(this.render, 1000);
    }
  },
  start: function() {
    this.el = getElement();
    // Render the div inside Edpuzzle
    this.render();
  }
};

DivAddedOnEdpuzzle.start();
