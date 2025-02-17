var torpedo = torpedo || {};
torpedo.target = null;
torpedo.api = null;
torpedo.uri = "";
torpedo.url = "";
torpedo.domain = "";
torpedo.pathname = "";
torpedo.publicsuffixlist = "";
torpedo.event;
torpedo.location;
torpedo.opened = false;
torpedo.progUrl = false;
torpedo.hasTooltip = false;

$(document).ready(function () {
  chrome.runtime.sendMessage({ name: "TLD" }, function (r) {
    torpedo.publicSuffixList.parse(r, punycode.toASCII);
  });

  torpedo.location = window.location.host;
  var mouseenter = "";
  var iframe = "";
  torpedo.opened = false;
  torpedo.progUrl = false;
  torpedo.hasTooltip = false;

  switch (torpedo.location) {
    case "mail.yahoo.com":
      mouseenter = ['div[data-test-id="message-view"]'];
      break;
    case "mail.google.com":
      mouseenter = [".adn"];
      break;
    case "owa.kit.edu":
      mouseenter = ['div[role="list"]', " div.isMessageBodyInPopout"];
      break;
    // not yet active due to issues with click handling
    case "outlook.live.com":
      mouseenter = ['div[role="main"]'];
      break;
    case "mail.aol.com":
      mouseenter = ["#displayMessage"];
      break;
    case "email.t-online.de":
      iframe = ["mailreadview"];
      break;
    default:
      iframe = ["mailbody"];
      break;
  }

  $("body").unbind();

  if (iframe == "") {
    $("body").on(
      "mouseenter",
      mouseenter.map((selector) => selector + " a").join(),
      function (e) {
        openTooltip(e, "a");
      }
    );
    $("body").on(
      "mouseenter",
      mouseenter.map((selector) => selector + " form").join(),
      function (e) {
        openTooltip(e, "form");
        torpedo.progUrl = true;
      }
    );
    // adding corresponding icon for working or error
    if ($("body").find(mouseenter.join())[0]) {
      chrome.runtime.sendMessage({ name: "ok", location: torpedo.location });
    } else {
      // set icon to ERROR
      chrome.runtime.sendMessage({ name: "error", location: torpedo.location });
    }
  } else {
    $("body").on("mouseenter", "a", function (e) {
      var location = e.view.location.href;
      if (location.indexOf(iframe) > -1) {
        openTooltip(e, "a");
      }
    });
    // open tooltip in iframe mail panel
    if (window.location.href.indexOf(iframe) > -1) {
      chrome.runtime.sendMessage({ name: "ok", location: torpedo.location });
    } else {
      chrome.runtime.sendMessage({ name: "error", location: torpedo.location });
    }
  }
});

function openTooltip(e, type) {
  torpedo.target = e.currentTarget;
  torpedo.progUrl = false;
  torpedo.hasTooltip = false;

  const eventTypes = ["click", "contextmenu", "mouseup", "mousedown"];
  preventClickEvent(torpedo.target, eventTypes);

  if (type == "a") {
    if (
      torpedo.target.href.indexOf("mailto:") > -1 ||
      torpedo.opened ||
      $(torpedo.target).hasClass("qtip-close")
    )
      return;
    if (torpedo.target.href == "") {
      try {
        $(torpedo.target).attr("href", e.relatedTarget.href);
      } catch (err) { }
    }
  }

  torpedo.state = "unknown";
  chrome.storage.sync.get(null, function (r) {
    try {
      // try to construct a URL, this will fail if it's a non-valid URL
      var url;
      if (type == "form") {
        url = new URL(torpedo.target.action);
      } else {
        url = new URL(torpedo.target.href);
      }

      setNewUrl(url);

      // checks for programmed tooltip (if there, then assigned to tooltipURL)
      var tooltipURL = hasTooltip(torpedo.target);

      if (tooltipURL != "<HAS_NO_TOOLTIP>") {
        torpedo.hasTooltip = isTooltipMismatch(tooltipURL, torpedo.url);
      }

      // if we are on a site that automatically redirects over its own servers
      if (r.referrerSites.indexOf(torpedo.location) > -1) {
        // resolve the url first and set as targets's href attribute
        resolveReferrer(r);
        torpedo.target.href = torpedo.url;
      }

      $(torpedo.target).on("mouseenter", function (event) {
        if (torpedo.timerInterval != null) {
          clearInterval(torpedo.timerInterval);
        }
      });

      // open the qTip
      $(torpedo.target).qtip({
        id: "torpedo",
        content: {
          text: tooltipText(url),
          button: true,
        },
        show: {
          event: e.type,
          ready: true,
          solo: true,
          delay: 20,
        },
        hide: {
          fixed: true,
          event: "mouseleave",
          delay: 200,
        },
        position: {
          my: "top left",
          at: "bottom left",
          viewport: true,
          target: $(torpedo.target),
          adjust: {
            y: 0,
            x: 0,
            mouse: false,
            method: "flip flip",
            resize: true,
          },
        },
        style: {
          tip: false,
          classes: "torpedoTooltip",
        },
        events: {
          render: function (event, api) {
            torpedo.api = api;
            torpedo.tooltip = api.elements.content;

            preventClickEvent(torpedo.tooltip.find("#torpedoURL")[0], ["click"]);
            
            $(torpedo.tooltip).on("mouseenter", function () {
              torpedo.opened = true;
            });

            $(torpedo.tooltip).on("mouseleave", function () {
              torpedo.opened = false;
            });

            // set the icon to "OK", because TORPEDO works on this page
            chrome.runtime.sendMessage({ name: "ok" });

            // init the tooltip elements and texts
            initTooltip();
            updateTooltip();
          },
          hide: function () {
            if (torpedo.timerInterval != null) {
              clearInterval(torpedo.timerInterval);
            }
          },
        },
      });
    } catch (err) {
      console.log(torpedo.target.href);
      console.log(err);
      // set the icon to "ERROR" because TORPEDO doesn't work on this page
      chrome.runtime.sendMessage({ name: "error" });
    }
  });
}
