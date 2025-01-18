'use strict';

const newtab = {
  /**
   * This method is used to navigate to the set new tab page.
   * @returns {void}
   */
  async open () {
	  
   Ext.Bd.GetSetting(function(S){
	   var url = Ext.Bfn.getUrlForNewTabPage(S, 'newChromiumTab');
	    if(url != 'newChromiumTab'){
		     newtab.openNewTabPage(url);
		             }			 
             });
    },

  /**
   * This method is used to set the focus either on the address bar or on the web page.
   * @param {string} url - url to open
   * @returns {void}
   */
   
  async openNewTabPage (url) {
	  
    await chrome.tabs.getCurrent((tab) => {
     const tabId = tab.id;
             chrome.tabs.create({ url: url }, () => {
              chrome.tabs.remove(tabId);
                 });
          });
      }
};

newtab.open();
