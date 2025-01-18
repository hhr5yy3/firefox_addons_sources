// ---------- Permissions (Side Effect) --------------------
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/permissions/request
// Any permissions granted are retained by the extension, even over upgrade and disable/enable cycling
class Permissions {

  static {
    this.init();
  }

  // --- check permissions
  static async init() {
    const perms = await browser.permissions.getAll();

    const allUrlsPermission = {origins: ['<all_urls>']};
    const allUrls = document.querySelector('#allUrls');
    allUrls.checked = perms.origins.includes('<all_urls>');
    allUrls.addEventListener('change', e => this.toggle(e, allUrlsPermission));

    const downloadsPermission = {permissions: ['downloads']};
    const downloads = document.querySelector('#downloads');
    downloads.checked = perms.permissions.includes('downloads');
    downloads.addEventListener('change', e => this.toggle(e, downloadsPermission));
  }

  static async toggle(e, perm) {
    // --- remove permission
    if (!e.target.checked) {
      browser.permissions.remove(perm);
      return;
    }

    // --- request permission
    const response = await browser.permissions.request(perm);
    !response && (e.target.checked = false);
  }
}