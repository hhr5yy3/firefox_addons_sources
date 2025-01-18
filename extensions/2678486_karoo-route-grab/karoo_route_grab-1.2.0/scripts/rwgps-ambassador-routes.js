// Hammerhead Route-Grab Extension https://www.hammerhead.io

const ROUTE_REGEX = /^https:\/\/ridewithgps\.com\/routes\/[0-9]+/;

// pull the route from the links in the "Route Overview" section
// eg: https://ridewithgps.com/ambassador_routes/110-howarth-to-korbel-clockwise
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  let actions = document.getElementsByClassName("actions");
  for (let i = 0; i < actions.length; i++) {
    let links = actions[i].getElementsByTagName("a");
    for (let j = 0; j < links.length; j++) {
      let route = links[j].href.match(ROUTE_REGEX);
      if (route) {
        sendResponse({ status: "ok", href: route[0] });
        return;
      }
    }
  }
  sendResponse({ status: "not_found" });
});
