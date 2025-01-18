(function () {
  "use strict";
  browser.devtools.panels.elements.createSidebarPane(
    "Landmarks",
    function (sidebarPane) {
      sidebarPane.setPage("devtoolsPanel.html");
    }
  );
})();
