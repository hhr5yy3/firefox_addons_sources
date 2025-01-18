let filteredDownloads = [];
let currentPage = 1;
const entriesPerPage = 10;
let isEditMode = false;
let selectedEntries = new Set();

const Table = {
  searchTerm: '', // Store current search term
  filterType: 'all', // Default filter type

  updateHistoryTable() {
    getLocalStorage('downloads', (downloads) => {
        // Initialize counts
        let allCount = 0;
        let videoCount = 0;
        let audioCount = 0;

        filteredDownloads = [];

        // Temporary counts for buttons
        let tempAllCount = 0;
        let tempVideoCount = 0;
        let tempAudioCount = 0;

        Object.entries(downloads).forEach(([url, data]) => {
            ['video', 'audio'].forEach((type) => {
                if (data[type] && data[type].state === 'success') {
                    // Check if this item matches the current search term
                    const matchesSearch =
                        (!this.searchTerm || 
                         data[type].filename.toLowerCase().includes(this.searchTerm) || 
                         url.toLowerCase().includes(this.searchTerm) || 
                         (data[type].title && data[type].title.toLowerCase().includes(this.searchTerm)));

                    // Increment counts for dynamic filter button updates
                    if (matchesSearch) {
                        if (type === 'video') tempVideoCount++;
                        if (type === 'audio') tempAudioCount++;
                        tempAllCount++;
                    }

                    // Add to filtered list if it matches both filter type and search term
                    if (matchesSearch && (this.filterType === 'all' || this.filterType === type)) {
                        filteredDownloads.push({
                            url,
                            ...data[type],
                            type,
                            thumbnail: data[type].thumbnail || '',
                        });
                    }
                }
            });
        });

        // Update the counts for the buttons based on filtered results
        allCount = tempAllCount;
        videoCount = tempVideoCount;
        audioCount = tempAudioCount;

        // Sort by most recent first
        filteredDownloads.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Update filter button labels with counts
        document.getElementById('filter-all').textContent = `All (${allCount})`;
        document.getElementById('filter-video').textContent = `Video (${videoCount})`;
        document.getElementById('filter-audio').textContent = `Audio (${audioCount})`;

        // Show or hide filter buttons based on the total count
        const filterButtons = document.getElementById('filter-buttons');
        filterButtons.style.display = allCount > 0 ? 'flex' : 'none';

        // Reset current page and display table
        currentPage = 1;
        this.displayTable();
    });
  },

  setFilterType(type) {
    this.filterType = type;

    const searchInput = domElements.searchInput.value.trim().toLowerCase();
    this.searchTerm = searchInput; 

    this.updateHistoryTable(); 
  },

  setSearchTerm(term) {
    this.searchTerm = term.toLowerCase();
    this.updateHistoryTable();
  },

  displayTable() {
    const paginatedData = filteredDownloads.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    if (!filteredDownloads.length && !domElements.searchInput.value) {
        this.hideTableElements();
        domElements.noDownloadsMessage.textContent = coreAPI.i18n.getMessage('options_no_downloads_message');
        domElements.noDownloadsMessage.style.display = 'block';
        this.hideFilterButtons();
    } else {
        this.showTableElements();
        this.showFilterButtons();
        domElements.noDownloadsMessage.style.display = 'none';

        domElements.historyBody.innerHTML = paginatedData.length
            ? paginatedData.map(Table.generateTableRow).join('')
            : `<tr><td colspan="3" style="text-align: center;">${coreAPI.i18n.getMessage('options_no_results')}</td></tr>`;

        // Restore selection state for checkboxes
        const rowCheckboxes = document.querySelectorAll('#history-table .select-row');
        rowCheckboxes.forEach((checkbox) => {
            const { url } = checkbox.dataset;
        
            // Use `closest('tr')` to find the row containing the checkbox
            const filenameCell = checkbox.closest('tr').querySelector('td:nth-child(3)');
            const filename = filenameCell ? filenameCell.textContent.trim() : null;

            checkbox.addEventListener('change', (e) => {
                Table.handleCheckboxChange(url, filename, e.target.checked);
            });
        });         

        this.updatePagination();

        // Only update "Select All" checkbox if in Edit mode
        if (isEditMode) {
            this.updateSelectAllCheckboxState();
        }
    }
  },

  hideFilterButtons() {
    const filterContainer = document.getElementById('filter-buttons');
    filterContainer.style.display = 'none';
    const filtersContainer = document.getElementById('filters-container');
    filtersContainer.style.display = 'none';
  },
  
  showFilterButtons() {
    const filterContainer = document.getElementById('filter-buttons');
    filterContainer.style.display = 'flex';
    const filtersContainer = document.getElementById('filters-container');
    filtersContainer.style.display = 'flex';
  },

  getFilterCounts(downloads) {
    let allCount = 0;
    let videoCount = 0;
    let audioCount = 0;
  
    Object.values(downloads).forEach((data) => {
      if (data.video && data.video.state === 'success') {
        videoCount++;
        allCount++;
      }
      if (data.audio && data.audio.state === 'success') {
        audioCount++;
        allCount++;
      }
    });
  
    return { all: allCount, video: videoCount, audio: audioCount };
  },  

  generateTableRow(entry) {
    const { url, filename = null, date = null, type, thumbnail = null } = entry;
    const timeElapsed = Table.formatTimeElapsed(new Date(date));
    const timeMessage = Table.getLocalizedTimeMessage(timeElapsed.key, timeElapsed.value);

    return `
      <tr data-url="${url}" data-type="${type}">
        ${isEditMode ? `
          <td class="select-column">
            <input type="checkbox" class="select-row" data-url="${url}" data-type="${type}" />
          </td>` : ''}
        <td>
          <a href="${url}" target="_blank" style="text-decoration: none;">
            <div class="thumbnail-container">
              <img src="${thumbnail}" alt="Thumbnail" class="thumbnail">
              <img src="img/link.png" alt="Link Icon" class="overlay">
            </div>
          </a>
        </td>
        <td>${filename || ''}</td>
        <td>${timeMessage}</td>
      </tr>
    `;
  },

  formatTimeElapsed(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 3600) {
      const minutes = Math.floor(diff / 60) || 1;
      return { key: minutes === 1 ? "options_minute_ago" : "options_minutes_ago", value: minutes };
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600) || 1;
      return { key: hours === 1 ? "options_hour_ago" : "options_hours_ago", value: hours };
    } else if (diff < 2592000) {
      const days = Math.floor(diff / 86400) || 1;
      return { key: days === 1 ? "options_day_ago" : "options_days_ago", value: days };
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000) || 1;
      return { key: months === 1 ? "options_month_ago" : "options_months_ago", value: months };
    } else {
      const years = Math.floor(diff / 31536000) || 1;
      return { key: years === 1 ? "options_year_ago" : "options_years_ago", value: years };
    }
  },

  getLocalizedTimeMessage(localeKey, value) {
    const messageTemplate = coreAPI.i18n.getMessage(localeKey);
    return messageTemplate.replace("{0}", value);
  },

  hideTableElements() {
    domElements.historyTable.style.display = domElements.searchInput.style.display = domElements.pagination.container.style.display = 'none';
  },

  showTableElements() {
    domElements.historyTable.style.display = domElements.searchInput.style.display = '';
  },

  updatePagination() {
    const totalPages = Math.ceil(filteredDownloads.length / entriesPerPage);
    domElements.pagination.container.style.display = totalPages > 1 ? 'flex' : 'none';
    domElements.pagination.prevPage.disabled = currentPage === 1;
    domElements.pagination.nextPage.disabled = currentPage === totalPages;
    domElements.pagination.pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
  },

  searchDownloads(searchTerm) {
    getLocalStorage('downloads', downloads => {
      filteredDownloads = [];
      Object.entries(downloads).forEach(([url, data]) => {
        ['video', 'audio'].forEach(type => {
          if (data[type] && data[type].state === 'success') {
            const { filename = '', date = '' } = data[type];
            const isMatch = filename.toLowerCase().includes(searchTerm) ||
                            new Date(date).toLocaleString().toLowerCase().includes(searchTerm) ||
                            url.toLowerCase().includes(searchTerm);
            if (isMatch) {
              filteredDownloads.push({ url, ...data[type], type });
            }
          }
        });
      });
      currentPage = 1;
      Table.displayTable();
    });
  },

  toggleEditMode(enable) {
    isEditMode = enable;

    // Toggle edit mode styles
    const filtersContainer = document.getElementById('filters-container');
    if (enable) {
        filtersContainer.classList.add('edit-mode');
        domElements.editButtons.editButton.style.display = 'none';
        domElements.editButtons.deleteButton.style.display = 'block';
        domElements.editButtons.cancelButton.style.display = 'block';
        domElements.clearHistoryButton.style.display = 'none';
        domElements.downloadHistoryButton.style.display = 'none';
        domElements.importHistoryButton.style.display = 'none';
    } else {
        filtersContainer.classList.remove('edit-mode');
        this.updateButtonVisibility();
    }

    const headerRow = document.querySelector('#history-table thead tr');
    const selectAllCheckboxId = 'select-all-rows';

    if (enable) {
        if (!document.getElementById(selectAllCheckboxId)) {
            const selectAllCell = document.createElement('th');
            selectAllCell.classList.add('select-column');
            selectAllCell.innerHTML = `<input type="checkbox" id="${selectAllCheckboxId}" />`;
            headerRow.prepend(selectAllCell);

            const selectAllCheckbox = document.getElementById(selectAllCheckboxId);
            selectAllCheckbox.addEventListener('change', (e) => {
                this.selectAllVisibleRows(e.target.checked);
            });
        }
    } else {
        const selectAllCheckbox = document.getElementById(selectAllCheckboxId);
        if (selectAllCheckbox) {
            selectAllCheckbox.parentElement.remove();
        }
    }

    this.updateHistoryTable();
  },

  updateButtonVisibility() {
    getLocalStorage('downloads', (downloads) => {
        const hasHistory = downloads && Object.values(downloads).some((data) => {
            return (
                (data.video && data.video.state === 'success') ||
                (data.audio && data.audio.state === 'success')
            );
        });

        if (!hasHistory) {
            // No history: Show only "Import"
            domElements.clearHistoryButton.style.display = 'none';
            domElements.downloadHistoryButton.style.display = 'none';
            domElements.editButtons.editButton.style.display = 'none';
            domElements.importHistoryButton.style.display = 'block';
            domElements.editButtons.deleteButton.style.display = 'none';
            domElements.editButtons.cancelButton.style.display = 'none';
        } else if (!isEditMode) {
            // History exists, not in edit mode: Show all main buttons
            domElements.clearHistoryButton.style.display = 'block';
            domElements.downloadHistoryButton.style.display = 'block';
            domElements.editButtons.editButton.style.display = 'block';
            domElements.importHistoryButton.style.display = 'block';
            domElements.editButtons.deleteButton.style.display = 'none';
            domElements.editButtons.cancelButton.style.display = 'none';
        } else {
            // Edit mode: Show only "Delete Selected" and "Cancel"
            domElements.clearHistoryButton.style.display = 'none';
            domElements.downloadHistoryButton.style.display = 'none';
            domElements.editButtons.editButton.style.display = 'none';
            domElements.importHistoryButton.style.display = 'none';
            domElements.editButtons.deleteButton.style.display = 'block';
            domElements.editButtons.cancelButton.style.display = 'block';
        }
    });
  },

  handleDeleteSelectedEntries() {
    if (selectedEntries.size === 0) {
        return Modal.showCustomModal('options_no_selected_items', false, null, true);
    }

    const modalElement = document.getElementById('options_confirm_delete_selected');
    const modalMessageElement = modalElement.querySelector('#modal-message');
    modalMessageElement.textContent = coreAPI.i18n.getMessage('options_confirm_delete_selected');

    Modal.showCustomModal('options_confirm_delete_selected', true, (deleteConfirmed) => {
        if (deleteConfirmed) {
            this.executeDeletion();
        }
    }, true);
  },

  deleteSelectedEntries() {
    getLocalStorage('downloads', (downloads) => {
        selectedEntries.forEach((entryKey) => {
            const [url, type] = entryKey.split('-');
            if (downloads[url] && downloads[url][type]) {
                delete downloads[url][type];
                if (!downloads[url].video && !downloads[url].audio) {
                    delete downloads[url]; // Remove URL if no subentries remain
                }
            }
        });

        setLocalStorage('downloads', downloads, () => {
          selectedEntries.clear();
          Table.updateHistoryTable();
          updateButtonVisibility(); // Ensure buttons update after deletion
          Modal.showCustomModal('options_items_deleted', false, null, true); // Show confirmation
      });      
    });
  },

  selectAllVisibleRows(selectAll) {
    const checkboxes = document.querySelectorAll('#history-table .select-row');
    checkboxes.forEach((checkbox) => {
        const { url, type } = checkbox.dataset;
        const entryKey = `${url}-${type}`; // Create a unique key for each entry
        const filenameCell = checkbox.closest('tr').querySelector('td:nth-child(3)');
        const filename = filenameCell ? filenameCell.textContent.trim() : null;

        if (selectAll) {
            checkbox.checked = true;
            if (filename) {
                selectedEntries.add({ url, filename }); // Add the entry with URL and filename
            }
        } else {
            checkbox.checked = false;
            selectedEntries.forEach((entry) => {
                if (entry.url === url && entry.filename === filename) {
                    selectedEntries.delete(entry); // Remove the entry
                }
            });
        }
    });

    this.updateSelectAllCheckboxState(); // Ensure the "Select All" checkbox state is updated
  },
  
  handleCheckboxChange(url, filename, checked) {
    if (checked) {
        selectedEntries.add({ url, filename });
    } else {
        selectedEntries.forEach((entry) => {
            if (entry.url === url && entry.filename === filename) {
                selectedEntries.delete(entry);
            }
        });
    }
    this.updateSelectAllCheckboxState();
  },
  
  updateSelectAllCheckboxState() {
    const checkboxes = document.querySelectorAll('#history-table .select-row');
    const selectAllCheckbox = document.getElementById('select-all-rows');
    
    // If the "Select All" checkbox doesn't exist (not in Edit mode), exit early
    if (!selectAllCheckbox) return;

    const totalRows = checkboxes.length;
    const selectedCount = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;

    if (selectedCount === totalRows && totalRows > 0) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCount > 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    }
  },
};
