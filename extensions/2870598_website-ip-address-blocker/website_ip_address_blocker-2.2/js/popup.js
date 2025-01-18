document.addEventListener('DOMContentLoaded', () => {
  const websiteInput = document.getElementById('websiteInput');
  const addWebsiteButton = document.getElementById('addWebsite');
  const blockedWebsitesList = document.getElementById('blockedWebsitesList');
  const homepageOnlyCheckbox = document.getElementById('homepageOnlyCheckbox');

  loadBlockedWebsites();

  // Function to clean and format the URL, allowing trailing slashes
  function cleanURL(url) {
    // Remove protocol (http, https) and "www." prefix if present
    url = url.replace(/^(https?:\/\/)?(www\.)?/i, '');
    
    // Lowercase the entire URL
    url = url.toLowerCase();

    // Remove any special characters except for dots, dashes, and slashes
    url = url.replace(/[^a-z0-9./-]/g, '');

    // Remove any extra whitespace
    url = url.trim();

    return url;
  }

  // Add website to the block list when the user clicks the button
  addWebsiteButton.addEventListener('click', () => {
    const website = websiteInput.value.trim();
    const blockHomepageOnly = homepageOnlyCheckbox.checked;

    if (website) { // Automatically sanitize input
      const cleanedWebsite = cleanURL(website);
      addWebsiteToBlocklist(cleanedWebsite, blockHomepageOnly);
      websiteInput.value = '';
      homepageOnlyCheckbox.checked = false; // Reset checkbox
    }
  });

  function addWebsiteToBlocklist(website, blockHomepageOnly) {
    browser.storage.local.get('blockedWebsites').then(({ blockedWebsites }) => {
      if (!blockedWebsites) blockedWebsites = [];

      // Prevent duplicate entries
      if (blockedWebsites.some(entry => entry.domain === website)) {
        alert('This website is already blocked!');
        return;
      }

      blockedWebsites.push({ domain: website, blockHomepageOnly });
      browser.storage.local.set({ blockedWebsites }).then(() => {
        addToList(website, blockHomepageOnly);
      });
    });
  }

  function addToList(website, blockHomepageOnly) {
    const listItem = document.createElement('li');
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    const websiteSpan = document.createElement('span');
    websiteSpan.textContent = website + (blockHomepageOnly ? ' (Homepage)' : '');
    websiteSpan.classList.add('flex-grow-1');

    const removeButton = document.createElement('button');
    removeButton.classList.add("btn", "btn-danger", "btn-sm");
    removeButton.id = 'removeButton';
    removeButton.innerHTML = '-';
    removeButton.setAttribute('aria-label', 'Remove website');
    removeButton.addEventListener('click', () => {
      removeWebsiteFromBlocklist(website);
      listItem.remove();
    });

    listItem.appendChild(websiteSpan);
    listItem.appendChild(removeButton);
    blockedWebsitesList.appendChild(listItem);
  }

  function removeWebsiteFromBlocklist(website) {
    browser.storage.local.get('blockedWebsites').then(({ blockedWebsites }) => {
      const updatedList = blockedWebsites.filter(item => item.domain !== website);
      browser.storage.local.set({ blockedWebsites: updatedList });
    });
  }

  function loadBlockedWebsites() {
    browser.storage.local.get('blockedWebsites').then(({ blockedWebsites }) => {
      if (blockedWebsites) {
        blockedWebsitesList.innerHTML = '';
        blockedWebsites.forEach(entry => addToList(entry.domain, entry.blockHomepageOnly));
      }
    });
  }
});
