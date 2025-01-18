const History = {
    handleClearHistory() {
      getLocalStorage('downloads', downloads => {
        if (Object.keys(downloads).length === 0) {
          return Modal.showCustomModal('options_no_history_clear', false, null, true);
        }
        Modal.showCustomModal('options_confirm_download_before_clear', true, confirmed => {
          if (confirmed) History.downloadHistory(downloads);
          Modal.showCustomModal('options_confirm_clear_history', true, clearConfirmed => {
            if (clearConfirmed) {
              coreAPI.storage.local.remove('downloads', () => {
                Modal.showCustomModal('options_history_cleared');
                filteredDownloads = [];
                Table.hideTableElements();
                Table.updateButtonVisibility();
                domElements.noDownloadsMessage.textContent = coreAPI.i18n.getMessage('options_no_downloads_message');
                domElements.noDownloadsMessage.style.display = 'block';
              });
            }
          });
        });
      });
    },

    deleteSelectedEntries(selectedEntries) {

      getLocalStorage("downloads", (downloads) => {
        
          if (!downloads) {
              return;
          }
  
          // Iterate over all selected entries
          selectedEntries.forEach((entry) => {
              const { url, filename } = entry; // Destructure `url` and `filename`
  
              if (downloads[url]) {
                  // Identify if the filename matches video or audio
                  const videoEntry = downloads[url].video;
                  const audioEntry = downloads[url].audio;
  
                  let deletedType = null;
  
                  if (videoEntry && videoEntry.filename === filename) {
                      // Delete video entry
                      delete downloads[url].video;
                      deletedType = "video";
                  } else if (audioEntry && audioEntry.filename === filename) {
                      // Delete audio entry
                      delete downloads[url].audio;
                      deletedType = "audio";
                  }
  
                  // If both video and audio are deleted, remove the URL itself
                  if (!downloads[url].video && !downloads[url].audio) {
                      delete downloads[url];
                  }
              }
          });
  
          // Save the updated downloads back to localStorage
          setLocalStorage("downloads", downloads, () => {
              selectedEntries.clear(); // Clear the selected entries
              Table.updateHistoryTable(); // Refresh the table to reflect changes
              Table.updateButtonVisibility(); // Update button visibility
              Modal.showCustomModal("options_items_deleted", false, null, true); // Show deletion confirmation
          });
      });
    },
  
    downloadHistory(downloads) {
      const blob = new Blob([JSON.stringify(downloads, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `download_history_${new Date().toISOString()}.json`;
      a.click();
    },
  
    handleImportHistory() {
      const file = domElements.fileInput.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const importedHistory = JSON.parse(e.target.result);
          if (!History.isValidDownloadHistory(importedHistory)) {
            return Modal.showCustomModal('options_invalid_json', false, null, true);
          }
          History.mergeAndSaveHistory(importedHistory);
          Table.updateButtonVisibility();
        } catch {
          Modal.showCustomModal('options_error_parsing_json', false, null, true);
        }
      };
      reader.readAsText(file);
    },
  
    isValidDownloadHistory(history) {
      return (
        typeof history === 'object' &&
        history !== null &&
        Object.values(history).every(entry =>
          ['video', 'audio'].some(type => {
            const media = entry[type];
            return media && media.state && (media.state !== 'success' || ['progress', 'filename', 'date'].every(f => f in media));
          })
        )
      );
    },
  
    mergeAndSaveHistory(importedHistory) {
      getLocalStorage('downloads', currentDownloads => {
        const mergedDownloads = { ...currentDownloads, ...importedHistory };
        setLocalStorage('downloads', mergedDownloads, () => {
          Modal.showCustomModal('options_history_imported');
          Table.updateHistoryTable();
          Table.updateButtonVisibility();
          domElements.noDownloadsMessage.style.display = 'none';
        });
      });
    },
};
  