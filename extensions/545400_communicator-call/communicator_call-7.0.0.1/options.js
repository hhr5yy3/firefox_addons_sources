const saveOptions = () => {
  const desktop = document.getElementById('desktop-option').checked;

  browser.storage.sync.set(
    { 'app': desktop ? 'desktop' : 'webapp' },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    }
  );
};

const restoreOptions = () => {
  browser.storage.sync.get(
    ['app'],
    (items) => {
      if (items.app) {
        document.getElementById('desktop-option').checked = items.app === 'desktop';
        document.getElementById('webapp-option').checked = items.app === 'webapp';
      }
      else {
        document.getElementById('desktop-option').checked = true;
      }
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);