/* Copyright (c) 2020 Andy McDonald. All rights reserved. */

/*jshint esversion: 6 */

// ---------------------------------------------------------
(() => {
  "use strict";

  // ---------------------------------------------------------
  const utils = window.foxclocks.utils;
  const info = window.foxclocks.info;

  // ---------------------------------------------------------
  let _state = "not_created"; // 'not_created', 'created', and 'shut_down'
  let _statusbarConfig = null;

  const _SCROLL_HEIGHT_ADJUST_PX = 3;

  // ---------------------------------------------------------
  const processContent = () => {
    if (_state === "shut_down") return;

    if (
      _statusbarConfig.enabled === "false" ||
      document.fullscreenElement !== null
    ) {
      removeContent();
      return;
    }

    if ($("#foxclocks-statusbar-iframe").length === 0) {
      // For at least about:blank, window.location.origin is the string(!) "null". Attempt to handle this gracefully
      //
      $("<iframe/>", {
        id: "foxclocks-statusbar-iframe",
        class: "foxclocks-content",
        src:
          utils.getExtensionUrl("html/statusbar.html?origin=") +
          encodeURIComponent(
            window.location.host !== "" ? window.location.origin : "*"
          ),
      }).appendTo(document.documentElement);
    }

    $("html")
      .attr(
        "data-foxclocks-statusbar-vertical-position",
        _statusbarConfig.vertical_position
      )
      .attr("data-foxclocks-statusbar-priority", _statusbarConfig.priority);

    _state = "created";
  };

  // ---------------------------------------------------------
  const removeContent = () => {
    if (_state === "shut_down") return;

    $(".foxclocks-content").remove();
    $("html").removeAttr(
      "data-foxclocks-statusbar-vertical-position data-foxclocks-statusbar-priority"
    );

    _state = "not_created";
  };

  // ---------------------------------------------------------
  const shutDown = () => {
    if (_state === "shut_down") return;

    removeContent();
    _state = "shut_down";
  };

  // ---------------------------------------------------------
  const pingBackground = () => {
    if (_state === "shut_down" || document.hidden === true) return;

    // Not necessary in Firefox, which stops all injected scripts and removes all injected content
    // Definitely necessary in Chrome
    //
    try {
      utils.sendMessage({ action: "ping" }, (response) => {
        if (response !== true) {
          utils.console.warn(
            "foxclocks.content.pingBackground(): bad response. Shutting down.",
            response
          );
          shutDown();
        }
      });
    } catch (ex) {
      utils.console.warn(
        "foxclocks.content.pingBackground(): exception sending message. Shutting down.",
        ex
      );
      shutDown();
    }
  };

  // ---------------------------------------------------------
  const handleDocClick = (e) => {
    const eInfo = info.get();

    if (
      eInfo !== null &&
      e.isDefaultPrevented() === false &&
      eInfo.is(":visible") &&
      $(e.target).closest(eInfo).length === 0
    ) {
      eInfo.hide();
      $(document).off("click", handleDocClick);
    }
  };

  // ---------------------------------------------------------
  const init = () => {
    window.addEventListener("message", (e) => {
      const iframe = document.getElementById("foxclocks-statusbar-iframe");
      const extensionOrigin = utils.getExtensionUrl("").slice(0, -1); // drop trailing slash

      if (
        !iframe ||
        e.source !== iframe.contentWindow ||
        e.origin !== extensionOrigin ||
        !e.data
      )
        return;

      if (typeof e.data["clockclick.statusbar.foxclocks"] === "object") {
        const detail = e.data["clockclick.statusbar.foxclocks"];

        info.set(detail.item, detail.itemZone, {
          left: detail.pageX,
          mode: "foxclocks-mode-statusbar",
        });
        $(document).on("click", handleDocClick);
      } else if (
        typeof e.data["closerclick.statusbar.foxclocks"] !== "undefined"
      ) {
        shutDown();
      } else if (typeof e.data["resize.statusbar.foxclocks"] !== "undefined") {
        if (iframe.contentDocument !== null && iframe.contentDocument.body !== null)
          iframe.setAttribute('style', `height: ${iframe.contentDocument.body.scrollHeight + _SCROLL_HEIGHT_ADJUST_PX}px !important;`);
      }
    });

    utils.getStorage(["statusbar"]).then((storageItems) => {
      _statusbarConfig = storageItems.statusbar;

      processContent(); // ASAP...
      $(processContent); // ...and also on document ready

      utils.onStorageChanged.addListener((changes, _namespace) => {
        if (typeof changes.statusbar !== "undefined") {
          _statusbarConfig = changes.statusbar.newValue;
          processContent();
        }
      });
    });

    window.setInterval(
      pingBackground,
      utils.getConfig("time_update_interval_millis")
    );

    document.addEventListener("fullscreenchange", processContent);
    document.addEventListener("visibilitychange", pingBackground); // trigger shut down on switching to tab, when extension disabled, uninstalled or reloaded

    if (utils.injectedMediaQueriesOk() === false) {
      window.addEventListener("beforeprint", removeContent);
      window.addEventListener("afterprint", processContent);
    }
  };

  // ---------------------------------------------------------
  // ENTRYPOINT
  // ---------------------------------------------------------
  utils.sendMessage({ action: "init" }, (response) => {
    if (response === true) init();
  });
})();
