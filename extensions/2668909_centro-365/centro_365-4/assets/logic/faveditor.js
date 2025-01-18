//	Name:          faveditor.js
//	Description:   Saves and loads favourites from storage
//	Author:        Sean O'Sullivan

// Save settings to storage

// Define the variables up front
var fav_1_title = ""
var fav_1_url = ""
var fav_2_title = ""
var fav_2_url = ""
var fav_3_title = ""
var fav_3_url = ""
var fav_4_title = ""
var fav_4_url = ""
var fav_5_title = ""
var fav_5_url = ""
var fav_6_title = ""
var fav_6_url = ""
var fav_7_title = ""
var fav_7_url = ""
var fav_8_title = ""
var fav_8_url = ""
var fav_9_title = ""
var fav_9_url = ""
var fav_10_title = ""
var fav_10_url = ""

function save_favourites() {
  
    // Set the variables
    
    /// Default section
    var fav_1_title = document.getElementById('fav_1_title').value;
    var fav_1_url = document.getElementById('fav_1_url').value;
    var fav_2_title = document.getElementById('fav_2_title').value;
    var fav_2_url = document.getElementById('fav_2_url').value;
    var fav_3_title = document.getElementById('fav_3_title').value;
    var fav_3_url = document.getElementById('fav_3_url').value;
    var fav_4_title = document.getElementById('fav_4_title').value;
    var fav_4_url = document.getElementById('fav_4_url').value;
    var fav_5_title = document.getElementById('fav_5_title').value;
    var fav_5_url = document.getElementById('fav_5_url').value;
    var fav_6_title = document.getElementById('fav_6_title').value;
    var fav_6_url = document.getElementById('fav_6_url').value;
    var fav_7_title = document.getElementById('fav_7_title').value;
    var fav_7_url = document.getElementById('fav_7_url').value;
    var fav_8_title = document.getElementById('fav_8_title').value;
    var fav_8_url = document.getElementById('fav_8_url').value;
    var fav_9_title = document.getElementById('fav_9_title').value;
    var fav_9_url = document.getElementById('fav_9_url').value;
    var fav_10_title = document.getElementById('fav_10_title').value;
    var fav_10_url = document.getElementById('fav_10_url').value;
    
    
    // Save to storage
    
    chrome.storage.sync.set({
      fav_1_title: fav_1_title,
      fav_1_url: fav_1_url,
      fav_2_title: fav_2_title,
      fav_2_url: fav_2_url,
      fav_3_title: fav_3_title,
      fav_3_url: fav_3_url,
      fav_4_title: fav_4_title,
      fav_4_url: fav_4_url,
      fav_5_title: fav_5_title,
      fav_5_url: fav_5_url,
      fav_6_title: fav_6_title,
      fav_6_url: fav_6_url,
      fav_7_title: fav_7_title,
      fav_7_url: fav_7_url,
      fav_8_title: fav_8_title,
      fav_8_url: fav_8_url,
      fav_9_title: fav_9_title,
      fav_9_url: fav_9_url,
      fav_10_title: fav_10_title,
      fav_10_url: fav_10_url
    }, function() {
      // Update status to let user know settings were saved.
      window.location.href='index.html';
      // console.info('Favourites have been saved');
    });
  }

  function restore_favourites() {
  
    chrome.storage.sync.get({
      fav_1_title: fav_1_title,
      fav_1_url: fav_1_url,
      fav_2_title: fav_2_title,
      fav_2_url: fav_2_url,
      fav_3_title: fav_3_title,
      fav_3_url: fav_3_url,
      fav_4_title: fav_4_title,
      fav_4_url: fav_4_url,
      fav_5_title: fav_5_title,
      fav_5_url: fav_5_url,
      fav_6_title: fav_6_title,
      fav_6_url: fav_6_url,
      fav_7_title: fav_7_title,
      fav_7_url: fav_7_url,
      fav_8_title: fav_8_title,
      fav_8_url: fav_8_url,
      fav_9_title: fav_9_title,
      fav_9_url: fav_9_url,
      fav_10_title: fav_10_title,
      fav_10_url: fav_10_url
    }, function(favs) {
      document.getElementById('fav_1_title').value = favs.fav_1_title;
      document.getElementById('fav_1_url').value = favs.fav_1_url;

      document.getElementById('fav_2_title').value = favs.fav_2_title;
      document.getElementById('fav_2_url').value = favs.fav_2_url;
      
      document.getElementById('fav_3_title').value = favs.fav_3_title;
      document.getElementById('fav_3_url').value = favs.fav_3_url;
      
      document.getElementById('fav_4_title').value = favs.fav_4_title;
      document.getElementById('fav_4_url').value = favs.fav_4_url;
      
      document.getElementById('fav_5_title').value = favs.fav_5_title;
      document.getElementById('fav_5_url').value = favs.fav_5_url;
      
      document.getElementById('fav_6_title').value = favs.fav_6_title;
      document.getElementById('fav_6_url').value = favs.fav_6_url;
      
      document.getElementById('fav_7_title').value = favs.fav_7_title;
      document.getElementById('fav_7_url').value = favs.fav_7_url;
      
      document.getElementById('fav_8_title').value = favs.fav_8_title;
      document.getElementById('fav_8_url').value = favs.fav_8_url;
      
      document.getElementById('fav_9_title').value = favs.fav_9_title;
      document.getElementById('fav_9_url').value = favs.fav_9_url;
      
      document.getElementById('fav_10_title').value = favs.fav_10_title;
      document.getElementById('fav_10_url').value = favs.fav_10_url;
      
    // console.info('fav_1_title ' + favs.fav_1_title);
    // console.info('fav_1_fav ' + favs.fav_1_url);
    // console.info('fav_2_title ' + favs.fav_2_title);
    // console.info('fav_2_fav ' + favs.fav_2_url);
    // console.info('fav_3_title ' + favs.fav_3_title);
    // console.info('fav_3_fav ' + favs.fav_3_url);
    // console.info('fav_4_title ' + favs.fav_4_title);
    // console.info('fav_4_fav ' + favs.fav_4_url);
    // console.info('fav_5_title ' + favs.fav_5_title);
    // console.info('fav_5_fav ' + favs.fav_5_url);
    // console.info('fav_6_title ' + favs.fav_6_title);
    // console.info('fav_6_fav ' + favs.fav_6_url);
    // console.info('fav_7_title ' + favs.fav_7_title);
    // console.info('fav_7_fav ' + favs.fav_7_url);
    // console.info('fav_8_title ' + favs.fav_8_title);
    // console.info('fav_8_fav ' + favs.fav_8_url);
    // console.info('fav_9_title ' + favs.fav_9_title);
    // console.info('fav_9_fav ' + favs.fav_9_url);
    // console.info('fav_10_title ' + favs.fav_10_title);
    // console.info('fav_10_fav ' + favs.fav_10_url)
    
    });
  
  }


// Let's listen

// Listen for the user saving their settings
document.getElementById('savemyfavourites').addEventListener('click',save_favourites);

// Restore the settings, setting the Settings page to what the users saved options are
document.addEventListener('DOMContentLoaded', restore_favourites);