const AUCTION_DEC_URL = "https://dec.autosrealm.com";
const buttonMap = {
   ca_iaa: {
      loginButton: document.getElementById("login-iaa-canada"),
      statusLabel: document.getElementById("status-iaa-canada"),
      logoutButton: document.getElementById("logout-iaa-canada")
   },
   us_iaa: {
      loginButton: document.getElementById("login-iaa-us"),
      statusLabel: document.getElementById("status-iaa-us"),
      logoutButton: document.getElementById("logout-iaa-us")
   },
   us_copart: {
      loginButton: document.getElementById("login-us-copart"),
      statusLabel: document.getElementById("status-us-copart"),
      logoutButton: document.getElementById("logout-us-copart")
   },
   ca_copart: {
      loginButton: document.getElementById("login-ca-copart"),
      statusLabel: document.getElementById("status-ca-copart"),
      logoutButton: document.getElementById("logout-ca-copart")
   },
   ca_icbc: {
      loginButton: document.getElementById("login-ca-icbc"),
      statusLabel: document.getElementById("status-ca-icbc"),
      logoutButton: document.getElementById("logout-ca-icbc")
   },
   ca_progi: {
      loginButton: document.getElementById("login-ca-progi"),
      statusLabel: document.getElementById("status-ca-progi"),
      logoutButton: document.getElementById("logout-ca-progi")
   }
};

const siteButtons = {
   logged_in_us_iaa: false,
   logged_in_ca_iaa: false,
   logged_in_us_copart: false,
   logged_in_ca_copart: false,
   logged_in_ca_icbc: false,
   logged_in_ca_progi: false
};

async function sendMessage(message) {
   return new Promise((resolve) => {
      browser.runtime.sendMessage(message, (response) => {
         resolve(response);
      });
   });
}

function processSiteLogin(siteType) {
   // Check if the user is authorized to use the site yet
   browser.storage.local.get("userData", (result) => {
      if (!result.userData || result.userData.credentials[siteType] === undefined) {
         console.log("not Active");
         return;
      }
      const payload = {
         userId: result.userData.userId,
         ownerId: result.userData.credentials[siteType].owner_id,
         credentialId: result.userData.credentials[siteType].id
      };
      const username = result.userData.credentials[siteType].email;
      const password = result.userData.credentials[siteType].password;
      const data = {
         email: username,
         password: password
      };
      window.close();
      // Send a message to background.js

      browser.runtime.sendMessage(
         {
            action: "login",
            site: siteType,
            data: data
         },
         (response) => {
            console.log("Response from background:", response);
         }
      );
   });
   // return false;
}

function processSiteLogout(siteType) {
   // Fetch the current user data
   browser.storage.local.get("userData", function (result) {
      if (result.userData) {
         // Fetch the storage data
         browser.storage.local.get("storageData", (data) => {
            if (data.storageData) {
               // Update the storage data to reflect the logout status
               const loggedInPrefix = "logged_in_" + siteType;
               const updatedStorageData = { ...data.storageData };
               updatedStorageData[loggedInPrefix] = false;

               // Save the updated storage data back to local storage
               browser.storage.local.set({ storageData: updatedStorageData }, () => {
                  console.log(updatedStorageData, "updatedStorageData after logout");

                  if (siteType === "ca_iaa" || siteType === "us_iaa") {
                     updateUI("us_iaa", false, buttonMap);
                  } else {
                     // Update the UI after logout
                     updateUI(siteType, false, buttonMap);
                  }
                  window.close();
                  // Send a message to background.js to handle the logout process
                  browser.runtime.sendMessage(
                     {
                        action: "logoutFromExtension",
                        site: siteType
                     },
                     (response) => {
                        console.log("Response from background:", response);
                     }
                  );
               });
            }
         });
      }
   });
}

function updateUI(site, isLoggedIn, buttonMap) {
   const { loginButton, statusLabel, logoutButton } = buttonMap[site];
   if (isLoggedIn) {
      loginButton.style.display = "none";
      statusLabel.innerText = `Logged In`;
      logoutButton.style.display = "inline";
   } else {
      loginButton.style.display = "inline";
      statusLabel.innerText = "";
      logoutButton.style.display = "none";
   }
}

function showMainMenu(loginForm, siteSelection, userId, userName) {
   // User is logged in
   loginForm.style.display = "none";
   // logoutSection.style.display = 'block';
   siteSelection.classList.remove("hidden");
   siteSelection.style.display = "block";
   // Retrieve account information from browser storage
   const accountId = userId || "Not available";
   const accountName = userName || "---";
   // Set account information in the header
   document.getElementById("account-id").innerText = accountId;
   document.getElementById("account-name").innerText = accountName;
}

function showLoginForm(siteType) {
   const siteLogo = document.getElementById("logo");
   const siteTitle = document.getElementById("site-title");

   switch (siteType) {
      case "ca_iaa":
         siteLogo.src = "images/ca_iaai.png";
         siteTitle.textContent = "IAA Canada Login";
         break;
      case "us_iaa":
         siteLogo.src = "images/ca_iaai.png";
         siteTitle.textContent = "IAA US Login";
         break;
      case "us_copart":
         siteLogo.src = "images/copart.png";
         siteTitle.textContent = "Copart Login";
         break;
      case "auction_export":
         siteLogo.src = "images/auction_export.jpg";
         siteTitle.textContent = "AuctionExport Login";
         break;
      // Add more cases as needed
   }
   document.getElementById("site-selection").style.display = "none";
   const loginForm = document.getElementById("login-form");
   loginForm.classList.remove("hidden");
   loginForm.classList.add("visible");
}

function handleSubmit(loginForm, siteSelection) {
   let username = document.getElementById("username").value;
   let password = document.getElementById("password").value;
   let selectedOption = document.getElementById("site-type").value;
   const rememberMe = document.getElementById("rememberMe").checked;

   if (rememberMe) {
      // Save credentials to local storage
      browser.storage.local.set({ username, password });
   } else {
      // Clear saved credentials
      browser.storage.local.remove(["username", "password"]);
   }

   if (username || password) {
      const userData = {
         username: username,
         password: password,
         site: selectedOption
      };
      const loginButton = document.getElementById("submit");
      loginButton.disabled = true;

      var url = "https://dec.autosrealm.com/api/login-new";

      // var url = 'http://127.0.0.1/api/login-new'; // local
      fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-Extension-Version": browser.runtime.getManifest().version
         },
         body: JSON.stringify(userData)
      })
         .then((response) => response.json())
         .then(async (data) => {
            console.log(data, "data");
            if (data.status === "success") {
               // store user data in browser storage
               const userData = {
                  userId: data.userId,
                  username: data.username,
                  credentials: data.credentials
               };

               // console.log(siteButtons, "siteButtons")
               hideLoginAlert();
               browser.storage.local.set({ userData }, () => {
                  console.log("Credentials from API saved.");
               });

               browser.storage.local.set({ storageData: siteButtons }, () => {
                  console.log(siteButtons, "data saved.");
               });

               if (userData.credentials.ca_iaa !== undefined && userData.credentials.us_iaa !== undefined) {
                  const iaa_us_email = userData.credentials.us_iaa.email;
                  const iaa_ca_email = userData.credentials.ca_iaa.email;
                  showIAAISelect(iaa_us_email, iaa_ca_email);
               } else if (userData.credentials.us_iaa !== undefined && userData.credentials.ca_iaa === undefined) {
                  const iaa_us_email = userData.credentials.us_iaa.email;
                  showIAAISelect(iaa_us_email, null);
               } else if (userData.credentials.us_iaa === undefined && userData.credentials.ca_iaa !== undefined) {
                  const iaa_ca_email = userData.credentials.ca_iaa.email;
                  showIAAISelect(null, iaa_ca_email);
               } else {
                  showIAAISelect(null, null);
               }
               showMainMenu(loginForm, siteSelection, userData.userId, userData.username);

               await sendMessage({
                  get: "logIn"
               });
            } else {
               showLoginAlert(data.message);
               loginButton.disabled = false;
            }
            hideLoader();
         })
         .catch((error) => console.error("Error logging in user:", error));
   }
}

function showIAAISelect(usEmail, caEmail) {
   const iaaiSection = document.querySelector(".iaai-section");
   if (!iaaiSection) {
      console.error("IAAI section not found");
      return;
   }

   // Remove any existing select if present
   const existingSelect = iaaiSection.querySelector("#iaai-email-select");
   if (existingSelect) {
      existingSelect.parentElement.remove();
   }

   // Create form group container to match Bootstrap styling
   const formGroup = document.createElement("div");
   formGroup.className = "form-group mb-3";

   // Create select element with Bootstrap classes
   const select = document.createElement("select");
   select.id = "iaai-email-select";
   select.className = "form-select form-select-sm";

   // Create default option
   const defaultOption = document.createElement("option");
   defaultOption.value = "";
   defaultOption.textContent = "Select IAA Account";
   select.appendChild(defaultOption);

   // Add email options with site types as values
   const options = [
      { email: usEmail, label: "US Account", value: "us_iaa" },
      { email: caEmail, label: "CA Account", value: "ca_iaa" }
   ].filter((option) => option.email);

   options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = `${option.label} (${option.email})`;
      select.appendChild(optionElement);
   });

   // Create error message div
   const errorDiv = document.createElement("div");
   errorDiv.className = "iaai-error text-danger small mt-1";
   errorDiv.style.display = "none";

   // Insert before the login button
   formGroup.appendChild(select);
   formGroup.appendChild(errorDiv);

   // Find the login button container and insert before it
   const loginButton = iaaiSection.querySelector("#login-iaa-us");
   const buttonContainer = loginButton.parentElement;
   iaaiSection.insertBefore(formGroup, buttonContainer);

   // Add change event to clear error
   select.addEventListener("change", function () {
      errorDiv.style.display = "none";
   });

   return select;
}

// Modified error display function
function showError(message) {
   const errorDiv = document.querySelector(".iaai-error");
   if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
   }
}

// Modified click handler
document.getElementById("login-iaa-us").addEventListener("click", function () {
   const select = document.getElementById("iaai-email-select");

   if (!select.value) {
      showError("Please select an account before proceeding");
      return;
   }

   const siteType = select.value;
   processSiteLogin(siteType);
});

function showLoginAlert(message) {
   const alertPlaceholder = document.getElementById("alertPlaceholder");
   alertPlaceholder.textContent = message; // Set the alert message
   alertPlaceholder.style.display = "block"; // Make the alert visible
}

function hideLoginAlert() {
   const alertPlaceholder = document.getElementById("alertPlaceholder");
   alertPlaceholder.style.display = "none"; // Hide the alert
}

function togglePasswordVisibility() {
   const passwordField = document.getElementById("password");

   const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
   passwordField.setAttribute("type", type);

   if (type === "text") {
      this.classList.add("eye-password-show");
   } else {
      this.classList.remove("eye-password-show");
   }
}

function showLoader() {
   const loader = document.getElementById("load_cover");
   if (loader) {
      loader.classList.remove("hidden");
   } else {
      console.error("Loader element not found");
   }
}

function hideLoader() {
   const loader = document.getElementById("load_cover");
   if (loader) {
      loader.classList.add("hidden");
   } else {
      console.error("Loader element not found");
   }
}

// Additional function to create the loader element if needed
function createLoader(targetElement) {
   const loader = document.getElementById("load_cover");
   if (loader) {
      loader.remove();
   }

   const loaderHTML = `<div id="load_cover" class="hidden">
    <div class="loaderInner">
      <div class="loader"></div>
      <div class="loader-logo">
       
      </div>
    </div>
  </div>`;

   const body = document.querySelector(targetElement);
   if (body) {
      body.insertAdjacentHTML("beforebegin", loaderHTML);
   } else {
      console.error("Body element not found");
   }
}

async function checkApiVersion() {
   const extensionVersion = browser.runtime.getManifest().version; // Get the extension version from manifest.json

   try {
      const url = "https://dec.autosrealm.com/api/check-version";
      const response = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "X-Extension-Version": extensionVersion
         }
      });
      return await response.json(); // Return the result from the API
   } catch (error) {
      console.error("Error checking version:", error);
      return null;
   }
}

document.addEventListener("DOMContentLoaded", function () {
   createLoader("#popup-container");
   const submitButton = document.getElementById("submit");
   const siteSelection = document.getElementById("site-selection");
   const loginForm = document.getElementById("loginForm");
   const logoutButton = document.getElementById("logout-button");
   const passwordVisibility = document.getElementById("eye-password");
   const passwordField = document.getElementById("password");
   const currentVersionHTML = document.getElementById("ext-version");
   currentVersionHTML.textContent = browser.runtime.getManifest().version;

   checkApiVersion()
      .then((apiResponse) => {
         if (apiResponse) {
            if (apiResponse && apiResponse.is_outdated) {
               const messageElements = document.querySelectorAll(".message");
               const upgradeLinks = document.querySelectorAll(".upgrade-link");
               messageElements.forEach((messageElement) => {
                  messageElement.textContent = apiResponse.message;
                  messageElement.classList.add("text-danger");
               });
               upgradeLinks.forEach((link) => {
                  link.classList.remove("hidden");
               });

               for (const key in buttonMap) {
                  if (buttonMap.hasOwnProperty(key)) {
                     const buttons = buttonMap[key];
                     if (buttons.loginButton) buttons.loginButton.disabled = true;
                     if (buttons.logoutButton) buttons.logoutButton.disabled = true;
                  }
               }
            }
            if (apiResponse && apiResponse.forced_logout) {
               browser.storage.local.remove("userData");
               browser.runtime.sendMessage({ action: "logoutFromExtension", site: "ca_iaa" });
               browser.runtime.sendMessage({ action: "logoutFromExtension", site: "us_iaa" });
               browser.runtime.sendMessage({ get: "logOut" });
            }
            if (apiResponse.notification) {
               const messageElements = document.querySelectorAll(".notification");
               messageElements.forEach((messageElement) => {
                  messageElement.textContent = apiResponse.notification;
                  messageElement.classList.add("text-danger");
               });
            }
         }
      })
      .catch((error) => {
         console.error("Error while checking API version:", error);
      });

   passwordVisibility.addEventListener("click", togglePasswordVisibility);

   submitButton.addEventListener("click", function () {
      showLoader();
      handleSubmit(loginForm, siteSelection);
   });

   const usernameField = document.getElementById("username");
   const rememberMeCheckbox = document.getElementById("rememberMe");

   // Load saved credentials if they exist
   browser.storage.local.get(["username", "password"]).then((result) => {
      if (result.username) {
         usernameField.value = result.username;
         passwordField.value = result.password;
         rememberMeCheckbox.checked = true;
      }
   });

   // Load user data and update UI
   browser.storage.local.get("userData", function (result) {
      if (result.userData) {
         // has more than 1 account for IAAI
         if (result.userData.credentials.ca_iaa !== undefined && result.userData.credentials.us_iaa !== undefined) {
            const iaa_us_email = result.userData.credentials.us_iaa.email;
            const iaa_ca_email = result.userData.credentials.ca_iaa.email;
            showIAAISelect(iaa_us_email, iaa_ca_email);
         } else if (result.userData.credentials.us_iaa !== undefined && result.userData.credentials.ca_iaa === undefined) {
            const iaa_us_email = result.userData.credentials.us_iaa.email;
            showIAAISelect(iaa_us_email, null);
         } else if (result.userData.credentials.us_iaa === undefined && result.userData.credentials.ca_iaa !== undefined) {
            const iaa_ca_email = result.userData.credentials.ca_iaa.email;
            showIAAISelect(null, iaa_ca_email);
         } else {
            showIAAISelect(null, null);
         }
         // Update UI based on saved login states
         browser.storage.local.get("storageData", (storageResult) => {
            console.log(storageResult.storageData, "storageResult.storageData");
            if (storageResult.storageData) {
               Object.keys(buttonMap).forEach((site) => {
                  const loggedInKey = "logged_in_" + site;
                  if (storageResult.storageData[loggedInKey]) {
                     updateUI(site, true, buttonMap);
                  } else {
                     updateUI(site, false, buttonMap);
                  }
               });
            }
         });
         showMainMenu(loginForm, siteSelection, result.userData.userId, result.userData.username);
      } else {
         loginForm.style.display = "block";
         siteSelection.classList.add("hidden");
      }
   });

   logoutButton.addEventListener("click", function () {
      // Handle logout
      siteSelection.style.display = "none";
      loginForm.style.display = "block";
      // browser.storage.local.get('userData', (data) => {
      browser.runtime.sendMessage({ action: "logoutFromExtension", site: "ca_iaa" });
      browser.runtime.sendMessage({ action: "logoutFromExtension", site: "us_iaa" });
      browser.runtime.sendMessage({ get: "logOut" });
      window.close();
      // })
      browser.storage.local.remove("userData", () => {
         console.log("remove user data");
      });

      browser.storage.local.remove("maxBidValue", () => {
         console.log("remove maxBidValue data");
      });
   });
});

document.addEventListener("DOMContentLoaded", () => {
   const isMobile = /Mobi|Android/i.test(navigator.userAgent);

   if (isMobile) {
      document.body.style.width = "100%";
   } else {
      document.body.style.width = "380px";
   }
});

document.getElementById("logout-button").addEventListener("click", function () {
   browser.storage.local.get("userData", (data) => {
      const siteType = data.userData.site;
      browser.runtime.sendMessage({ action: "logoutFromExtension", site: siteType });
      // browser.runtime.sendMessage({ get: "logOut" });
      window.close();
   });
});

function validateIAAIAccount() {
   const select = document.getElementById("iaai-email-select");
   const errorDiv = document.querySelector(".iaai-error") || createErrorDiv();

   if (!select.value) {
      errorDiv.textContent = "Please select an account before proceeding";
      errorDiv.style.display = "block";
      return;
   }
   // Clear any existing error message
   errorDiv.style.display = "none";

   // The value is already the site type we need
   return select.value;
   // Process the login with the correct site type
}

document.getElementById("login-iaa-us").addEventListener("click", async function () {
   const siteType = validateIAAIAccount();
   processSiteLogin(siteType);
});

function createErrorDiv() {
   const errorDiv = document.createElement("div");
   errorDiv.className = "iaai-error";
   errorDiv.style.cssText = "color: red; margin-top: 8px; display: none; font-size: 12px;";

   const selectContainer = document.querySelector("#iaai-email-select").parentElement;
   selectContainer.parentElement.insertBefore(errorDiv, selectContainer.nextSibling);

   return errorDiv;
}

document.getElementById("login-us-copart").addEventListener("click", function () {
   browser.tabs.create({ url: "https://www.copart.com" });
   window.close();
});

document.getElementById("login-ca-copart").addEventListener("click", function () {
   browser.tabs.create({ url: "https://www.copart.ca" });
   window.close();
});

document.getElementById("login-ca-icbc").addEventListener("click", function () {
   const siteType = "ca_icbc";
   processSiteLogin(siteType);
});

document.getElementById("login-ca-progi").addEventListener("click", function () {
   browser.tabs.create({ url: "https://progi.com/progipix" });
   window.close();
});

function sendMessage(message) {
   try {
      if (browser.runtime?.port) {
         browser.runtime.sendMessage(message);
      }
   } catch (err) {
      console.log("Message sending failed:", err);
   }
}

document.getElementById("logout-iaa-us").addEventListener("click", function () {
   const siteType = validateIAAIAccount();
   if (siteType) {
      processSiteLogout(siteType);
      processSiteLogout("ca_iaa");
      processSiteLogin(siteType);
   }
});

document.getElementById("logout-us-copart").addEventListener("click", function () {
   browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url.includes("copart.com")) {
         browser.tabs.reload(currentTab.id);
      } else {
         browser.tabs.create({ url: "https://www.copart.com" });
      }
      window.close();
   });
});

document.getElementById("logout-ca-copart").addEventListener("click", function () {
   browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.create({ url: "https://www.copart.ca" });
      window.close();
   });
});

document.getElementById("logout-ca-progi").addEventListener("click", function () {
   const siteType = "ca_progi";
   processSiteLogout(siteType);
});
