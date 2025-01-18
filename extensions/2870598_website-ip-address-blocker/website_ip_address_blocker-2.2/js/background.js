let blockedWebsitesSet = new Set();

// Load the initial list from storage and update the in-memory `Set`
browser.storage.local.get("blockedWebsites").then(({ blockedWebsites: sites }) => {
  if (sites) {
    updateBlockedWebsitesSet(sites);
  }
});

// Listen for changes in the blocked websites list and update the `Set`
browser.storage.onChanged.addListener((changes) => {
  if (changes.blockedWebsites) {
    updateBlockedWebsitesSet(changes.blockedWebsites.newValue);
  }
});

// Function to update the blocked websites `Set`
function updateBlockedWebsitesSet(sites) {
  blockedWebsitesSet.clear(); // Clear the previous set
  for (const site of sites) {
    const normalizedDomain = cleanURL(site.domain);
    blockedWebsitesSet.add(
      site.blockHomepageOnly ? `${normalizedDomain}/` : normalizedDomain
    );
  }
}

// Function to clean and normalize URLs, allowing trailing slashes
function cleanURL(url) {
  // Remove protocol (http, https) and "www." prefix if present
  url = url.replace(/^(https?:\/\/)?(www\.)?/i, '');
  url = url.toLowerCase(); // Convert to lowercase
  // Remove any special characters except dots, dashes, and slashes
  url = url.replace(/[^a-z0-9./-]/g, '');
  return url.trim();
}

// Listener for blocking requests
browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    const hostname = cleanURL(url.hostname); // Normalize hostname
    const path = url.pathname;

    // Check if the request matches a blocked site in the `Set`
    if (blockedWebsitesSet.has(hostname) || blockedWebsitesSet.has(`${hostname}/`)) {
      // If blockedHomepageOnly is true, only block the homepage ("/" or empty path)
      if (blockedWebsitesSet.has(`${hostname}/`) && path !== "/" && path !== "") {
        return { cancel: false };
      }
      return { cancel: true };
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
