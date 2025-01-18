// Saves folder to chrome.storage
function save_options() {
    let folder = document.getElementById('folder').value;
    browser.storage.sync.set({
    folder: folder,
    }).then(res=>{
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Folder setting saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 1500);
    }).catch(err=>{
      console.log(err);
    }) 
  }
  
  // Restores input box state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default folder folder = 'test-download'
    browser.storage.sync.get({
      folder: 'test-download',
    }, function(items) {
      document.getElementById('folder').value = items.folder;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);