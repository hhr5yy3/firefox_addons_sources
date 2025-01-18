// Hammerhead Route-Grab Extension https://www.hammerhead.io

// Add below to manifest.json:permissions before testing
//const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://dashboard.hammerhead.io";

const API_URL = `${BASE_URL}/v1`;
export const WEB_URL = BASE_URL;

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function getUserId(token) {
  let jwt = parseJwt(token);
  return jwt.context.userId;
}

function isAuthed() {
  return localStorage.getItem("jwt:token") != null;
}

function setAuth(resp) {
  localStorage.setItem("jwt:token", resp.access_token);
  localStorage.setItem("jwt:refresh", resp.refresh_token);
}

function clearAuth() {
  localStorage.removeItem("jwt:token");
  localStorage.removeItem("jwt:refresh");
}

function getRoute(routeURL) {
  let token = localStorage.getItem("jwt:token");
  let userId = getUserId(token);

  return new Promise((resolve, reject) => {
    let x = new XMLHttpRequest();
    x.open("POST", `${API_URL}/users/${userId}/routes/import/url`);
    x.setRequestHeader("Content-Type", "application/json");
    x.setRequestHeader("Authorization", "Bearer " + token);
    x.responseType = "json";
    x.onload = function () {
      if (x.status == 401) {
        reject({ reason: "auth-error" });
      } else if (x.status != 201) {
        reject(x.response || {});
      } else if (!x.response || !x.response.id) {
        reject({ reason: "response-error" });
      } else {
        resolve(x.response);
      }
    };
    x.onerror = function () {
      reject({ reason: "network-error" });
    };
    x.send(JSON.stringify({ url: routeURL }));
  });
}

function getRouteImage(routeId) {
  let token = localStorage.getItem("jwt:token");
  let userId = routeId.split(".")[0];

  return new Promise((resolve, reject) => {
    let x = new XMLHttpRequest();
    x.open("GET", `${API_URL}/users/${userId}/routes/${routeId}/image.jpg`);
    x.setRequestHeader("Authorization", "Bearer " + token);
    x.responseType = "blob";
    x.onload = function () {
      if (x.status == 401) {
        reject({ reason: "auth-error" });
      } else if (x.status != 200) {
        reject(x.response || {});
      } else if (!x.response) {
        reject({ reason: "response-error" });
      } else {
        resolve(x.response);
      }
    };
    x.onerror = function () {
      reject({ reason: "network-error" });
    };
    x.send();
  });
}

function authUser(email, password) {
  return new Promise((resolve, reject) => {
    let x = new XMLHttpRequest();
    x.open("POST", `${API_URL}/auth/token`);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.responseType = "json";
    x.onload = function () {
      if (x.status == 400) {
        reject({ reason: "login-error" });
      } else if (x.status != 200) {
        reject({ reason: "network-error", code: x.status });
      } else if (
        !x.response ||
        !x.response.access_token ||
        !x.response.refresh_token
      ) {
        reject({ reason: "response-error" });
      } else {
        setAuth(x.response);
        resolve();
      }
    };
    x.onerror = function () {
      reject({ reason: "network-error" });
    };
    x.send(
      "grant_type=password&username=" +
        encodeURIComponent(email) +
        "&password=" +
        encodeURIComponent(password)
    );
  });
}

function refreshAuth() {
  let token = localStorage.getItem("jwt:refresh");

  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ reason: "auth-error" });
    }
    var x = new XMLHttpRequest();
    x.open("POST", `${API_URL}/auth/token`);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.responseType = "json";
    x.onload = function () {
      if (x.status != 200) {
        reject({ reason: "auth-error" });
      } else if (
        !x.response ||
        !x.response.access_token ||
        !x.response.refresh_token
      ) {
        reject({ reason: "auth-error" });
      } else {
        setAuth(x.response);
        resolve();
      }
    };
    x.onerror = function () {
      reject({ reason: "network-error" });
    };
    x.send(
      "grant_type=refresh_token&refresh_token=" + encodeURIComponent(token)
    );
  });
}

export default {
  getRoute,
  getRouteImage,
  authUser,
  refreshAuth,
  clearAuth,
  isAuthed,
};
