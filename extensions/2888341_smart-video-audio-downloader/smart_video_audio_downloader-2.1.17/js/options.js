// DOM Elements
const domElements = {
  notificationsCheckbox: document.getElementById('notifications'),
  failRetriesInput: document.getElementById('failRetries'),
  searchRetriesInput: document.getElementById('searchRetries'),
  clearHistoryButton: document.getElementById('clear-history'),
  downloadHistoryButton: document.getElementById('download-history'),
  importHistoryButton: document.getElementById('import-history'),
  fileInput: document.getElementById('file-input'),
  historyBody: document.getElementById('history-body'),
  historyTable: document.getElementById('history-table'),
  noDownloadsMessage: document.getElementById('no-downloads-message'),
  filterButtons: document.querySelectorAll('#filter-buttons .btn'),
  searchInput: document.getElementById('search'),
  pagination: {
    prevPage: document.getElementById('prev-page'),
    nextPage: document.getElementById('next-page'),
    pageInfo: document.getElementById('page-info'),
    container: document.getElementById('pagination'),
  },
  sections: {
    settings: document.getElementById('settings-section'),
    history: document.getElementById('history-section'),
    info: document.getElementById('info-section'),
  },
  editButtons: {
    editButton: document.getElementById('edit-history'),
    deleteButton: document.getElementById('delete-history'),
    cancelButton: document.getElementById('cancel-edit'),
  },
};

// Load and save settings
function loadSettings() {
  getLocalStorage('settings', (settings) => {
    domElements.notificationsCheckbox.checked = settings.notificationsEnabled || false;
    domElements.failRetriesInput.value = settings.maxFailRetries || 3;
    domElements.searchRetriesInput.value = settings.maxSearchRetries || 2;
  });
}

function saveSetting(key, value) {
  getLocalStorage('settings', (settings) => {
    settings[key] = value;
    setLocalStorage('settings', settings);
  });
}

// Event Listeners
domElements.notificationsCheckbox.addEventListener('change', () =>
  saveSetting('notificationsEnabled', domElements.notificationsCheckbox.checked)
);

domElements.failRetriesInput.addEventListener('input', () =>
  saveSetting('maxFailRetries', parseInt(domElements.failRetriesInput.value))
);

domElements.searchRetriesInput.addEventListener('input', () =>
  saveSetting('maxSearchRetries', parseInt(domElements.searchRetriesInput.value))
);

domElements.clearHistoryButton.addEventListener('click', History.handleClearHistory);

domElements.downloadHistoryButton.addEventListener('click', () =>
  getLocalStorage('downloads', (downloads) => {
    if (Object.keys(downloads).length) {
      History.downloadHistory(downloads);
    } else {
      Modal.showCustomModal('options_no_history_download');
    }
  })
);

domElements.importHistoryButton.addEventListener('click', () => domElements.fileInput.click());
domElements.fileInput.addEventListener('change', History.handleImportHistory);

domElements.pagination.prevPage.addEventListener('click', () => {
  if (currentPage > 1) currentPage--;
  Table.displayTable();
});

domElements.pagination.nextPage.addEventListener('click', () => {
  if (currentPage < Math.ceil(filteredDownloads.length / entriesPerPage)) currentPage++;
  Table.displayTable();
});

domElements.filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    domElements.filterButtons.forEach((btn) => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    // Update filter type
    const filterType = button.id.replace('filter-', ''); // Extract 'all', 'video', or 'audio'
    Table.setFilterType(filterType);
  });
});

domElements.searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    Table.setSearchTerm(searchTerm); 
});

// Listen for changes in local storage
coreAPI.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.downloads) {
    Table.updateHistoryTable();
  }
});

// Runtime Message Listener
coreAPI.runtime.onMessage.addListener((message) => {
  if (message.action === 'switchTab' && message.targetTab) {
    Tabs.activateTab(message.targetTab);
    Tabs.saveActiveTab(message.targetTab);
  }
});

// Initialization
function getContentHeight() {
    const visibleSection = Object.values(domElements.sections).find(section => 
      !section.classList.contains('hidden')
  );
  
  return visibleSection ? visibleSection.offsetHeight : 0;
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the base functionality
  Tabs.initializeTabs();
  loadSettings();
  Table.updateHistoryTable();
  Table.updateButtonVisibility();

  // Set up Edit button listeners
  domElements.editButtons.editButton.addEventListener('click', () => {
      domElements.historyTable.parentElement.classList.add('edit-mode');
      Table.toggleEditMode(true);
  });

  domElements.editButtons.cancelButton.addEventListener('click', () => {
      domElements.historyTable.parentElement.classList.remove('edit-mode');
      Table.toggleEditMode(false);
  });

  domElements.editButtons.deleteButton.addEventListener('click', () => {
      if (selectedEntries.size === 0) {
          return Modal.showCustomModal('options_no_selected_items', false, null, true);
      }
      Modal.showCustomModal('options_confirm_delete_selected', true, (deleteConfirmed) => {
          if (deleteConfirmed) {
              History.deleteSelectedEntries(selectedEntries);
              domElements.historyTable.parentElement.classList.remove('edit-mode');
              Table.toggleEditMode(false);
          }
      }, true);
  });

  // Initialize empty state if needed
  if (!filteredDownloads.length && !domElements.searchInput.value) {
      Table.hideTableElements();
      domElements.noDownloadsMessage.textContent = coreAPI.i18n.getMessage('options_no_downloads_message');
      domElements.noDownloadsMessage.style.display = 'block';
      Table.hideFilterButtons();
  } else {
      Table.showTableElements();
      Table.showFilterButtons();
      domElements.noDownloadsMessage.style.display = 'none';
  }

  // Check for target tab from popup
  getLocalStorage('targetTab', (result) => {
      if (result.targetTab) {
          Tabs.activateTab(result.targetTab);
          coreAPI.storage.local.remove('targetTab');
      }
  });
});