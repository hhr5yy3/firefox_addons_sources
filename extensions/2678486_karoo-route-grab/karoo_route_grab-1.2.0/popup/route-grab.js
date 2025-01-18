// Hammerhead Route-Grab Extension https://www.hammerhead.io

import apiClient, { WEB_URL } from "./apiClient.js";

const AMBASSADOR_ROUTES_REGEX = /^https:\/\/ridewithgps\.com\/ambassador_routes/;
const HTTP_URL_REGEX = /^https?:\/\//;

// partially imported from dashboard
const PARTNERS = {
  strava: "Strava",
  ride_with_gps: "Ride with GPS",
  training_peaks: "TrainingPeaks",
  komoot: "Komoot",
  google_maps: "Google Maps",
  garmin_connect: "Garmin Connect",
  bikemap: "Bikemap",
  openrunner: "Openrunner",
};

// imported from dashboard
function errorStringFromReason(reason, partnerKey) {
  let partner = PARTNERS[partnerKey];

  let re = "";
  switch (reason) {
    case "route-is-hammerhead":
      return "Hammerhead routes can be imported by visiting a shared route link";
    case "account-link-invalid":
      re = "re-";
    // fallthrough
    case "account-not-linked":
      if (partner) {
        return `Please ${re}connect your ${partner} account`;
      } else {
        return `Please ${re}connect your account`;
      }
    case "unknown-partner":
    case "unsupported-partner":
      if (partner) {
        return `Can not import routes from ${partner}`;
      } else {
        return "Can not import this route";
      }
    case "access-forbidden":
      if (partner) {
        return `Not authorized to import this ${partner} route`;
      } else {
        return "Not authorized to import this route";
      }
    default:
      if (partnerKey === "gpx_from_url") {
        return `Could not import this GPX file`;
      } else if (partner) {
        return `Could not import this ${partner} route`;
      } else {
        return "Could not import this route";
      }
  }
}

function getErrorMessage(err) {
  switch (err.reason) {
    // local errors
    case "no-credentials":
      return "Please enter your username and password";
    case "no-route":
      return "Cannot find route information, please navigate to a supported website";
    case "auth-error":
      return "Please sign-in again";
    case "login-error":
      return "Email address or password is not correct";
    case "response-error":
      return "No response from Hammerhead";
    case "network-error":
      if (err.code) {
        return `Network error: ${err.code}`;
      } else {
        return "Network error";
      }
    default:
      return errorStringFromReason(err.reason, err.partner);
  }
}

function renderError(err) {
  let msg = (err && getErrorMessage(err)) || "";
  renderStatus(msg);
}

function renderStatus(statusText) {
  document.getElementById("status").textContent = statusText;
}

function showLogin(err) {
  renderError(err);
  document.getElementById("login-signup").hidden = false;
  document.getElementById("signout-button").hidden = true;
  document.getElementById("route-results").hidden = true;
  document.getElementById("cannot-import").hidden = true;
}

function signIn(originalUrl) {
  let email = document.getElementById("user-email").value;
  let password = document.getElementById("user-password").value;
  if (!email || email.length == 0 || !password || password.length == 0) {
    return renderError({ reason: "no-credentials" });
  }

  renderStatus("Signing in...");

  apiClient
    .authUser(email.toLowerCase(), password)
    .then(() => {
      document.getElementById("user-email").value = "";
      document.getElementById("user-password").value = "";
      document.getElementById("login-signup").hidden = true;
      document.getElementById("signout-button").hidden = false;
      doRouteSave(originalUrl, false);
    })
    .catch(renderError);
}

function signOut() {
  renderStatus("Signing out...");
  apiClient.clearAuth();
  showLogin();
}

function reauthAndRetry(url) {
  renderStatus("Connecting...");

  apiClient
    .refreshAuth()
    .then(() => {
      doRouteSave(url, false);
    })
    .catch((err) => {
      if (err.reason == "network-error") {
        renderError(err);
      } else {
        showLogin(err);
      }
    });
}

function doRouteSave(url, retry) {
  renderStatus("Saving route...");

  apiClient
    .getRoute(url)
    .then((route) => {
      // set up route _without_ an image
      let name = route.name ? route.name : "Unnamed Route";
      let description = `Route '${name}' has been added to your Karoo Dashboard`;
      let routeUrl = `${WEB_URL}/routes/${route.id}`;
      let distance = `${(route.distance / 1000.0).toFixed(1)}km`;
      let gain = `${route.elevation.gain.toFixed(0)}m`;

      document.getElementById("route-title").textContent = description;
      document.getElementById("route-name").textContent = name;
      document.getElementById("route-link").href = routeUrl;
      document.getElementById("route-distance").textContent = distance;
      document.getElementById("route-gain").textContent = gain;
      return route;
    })
    .then((route) => {
      apiClient
        .getRouteImage(route.id)
        .then((image) => {
          renderStatus("");
          // the objectURL should be freed when the popup DOM disappears
          let url = window.URL.createObjectURL(image);
          document.getElementById("route-image").src = url;
          document.getElementById("route-results").hidden = false;
        })
        .catch(renderError);
    })
    .catch((err) => {
      if (err.reason == "auth-error") {
        if (retry) {
          // Credentials either invalid or expired
          reauthAndRetry(url);
        } else {
          showLogin(err);
        }
      } else {
        renderError(err);
      }
    });
}

function loadFromUrl(url) {
  document.getElementById("banner-link").href = WEB_URL;
  document.getElementById("signup-link").href = `${WEB_URL}/auth/signup`;
  document
    .getElementById("submit-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      signIn(url);
    });
  document
    .getElementById("signout-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      signOut();
    });

  if (!apiClient.isAuthed()) {
    return showLogin();
  }

  // quick filter for non-webpages
  if (HTTP_URL_REGEX.test(url)) {
    doRouteSave(url, true);
  } else {
    renderError({ reason: "no-route" });
  }
}

// driver hook for when the popup is selected
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // we are guaranteed to have one tab
      let tab = tabs[0];
      if (AMBASSADOR_ROUTES_REGEX.test(tab.url)) {
        chrome.tabs.sendMessage(
          tab.id,
          { target: "ambassador_routes" },
          (data) => {
            if (data && data.status == "ok") {
              loadFromUrl(data.href);
            } else {
              renderError({ reason: "no-route" });
            }
          }
        );
        return;
      } else {
        loadFromUrl(tab.url);
      }
    }
  );
});
