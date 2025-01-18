const Tabs = {
    initializeTabs() {
      coreAPI.storage.local.get(['targetTab', 'activeTab'], result => {
        Tabs.activateTab(result.targetTab || result.activeTab || 'settings');
        coreAPI.storage.local.remove('targetTab');
      });
  
      document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
          const tab = button.id.replace('-tab', '');
          Tabs.activateTab(tab);
          Tabs.saveActiveTab(tab);
        });
      });
    },
  
    activateTab(tab) {
      document.querySelectorAll('.tab-button, .tab-content').forEach(el => el.classList.remove('active'));
      document.getElementById(`${tab}-tab`).classList.add('active');
      document.getElementById(`${tab}-section`).classList.add('active');
    },
  
    saveActiveTab(tab) {
      coreAPI.storage.local.set({ activeTab: tab });
    },
  };
  