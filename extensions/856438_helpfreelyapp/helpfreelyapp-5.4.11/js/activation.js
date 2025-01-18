var DEBUG_MODE = false;//!('update_url' in chrome.runtime.getManifest());


// To detect APP in browser
sessionStorage.setItem('hff','1');

// Activate toolbar for the given domain
window.addEventListener('hff-cc-activate', function (e) {
  try{
    chrome.runtime.sendMessage({'activate': {'domain':e.detail.domain, 'tracker': e.detail.tracker}});
  } catch(err){
    location.href = e.detail.tracker;
    return false;
  }
}, false);

// Store user data after login
window.addEventListener('hff-cc-login', function (e) {
  if(DEBUG_MODE) console.log('eventLogin', e);
  if(e.detail.id==-1) e.detail.id = -12;

  // Send a message to background.js to update its json
  chrome.runtime.sendMessage({'login':e.detail});
}, false);

// Clear user data after logout
window.addEventListener('hff-cc-logout', function (e) {
  if (DEBUG_MODE) console.log('eventLogout', e)

  chrome.runtime.sendMessage({'logout':{id: 12, username: 'Anonymous','photo':false,'confirmed': false}});
}, false);

// Clear shop data
window.addEventListener('hff-cc-shop-remove', function (e) {
  chrome.storage.local.remove(dominio(e.detail.shop_url),function(){
    // Send a message to background.js
    chrome.runtime.sendMessage({'shop_remove':{shop_url:e.detail.shop_url}});
  }); 
}, false);

if(document.location == "https://www.helpfreely.org/es/admin/helpfreelyapp/"){
  // Save search engine conf
  $('#se_on').unbind().click(function(){
      $('#se_on').hide();
      $('#se_off').show();
      chrome.runtime.sendMessage({'show_partner_shops':false});
  });
  $('#se_off').unbind().click(function(){
      $('#se_off').hide();
      $('#se_on').show();    
      chrome.runtime.sendMessage({'show_partner_shops':true});
  });

  // Save retarget conf
  $('#retarget_on').unbind().click(function(){
      $('#retarget_on').hide();
      $('#retarget_off').show();
      chrome.runtime.sendMessage({'retarget':false});
  });
  $('#retarget_off').unbind().click(function(){
      $('#retarget_off').hide();
      $('#retarget_on').show();
      chrome.runtime.sendMessage({'retarget':true});
  });

  //Save style conf
  $('#toolbar_div').unbind().click(function(){
      $('#toolbar_div').addClass('selected');
      $('#toolbox_div').removeClass('selected');
      chrome.runtime.sendMessage({'style':'toolbar'});
  });
  $('#toolbox_div').unbind().click(function(){
      $('#toolbox_div').addClass('selected');
      $('#toolbar_div').removeClass('selected');
      chrome.runtime.sendMessage({'style':'toolbox'});
  });
}