var notifications_stared = false;

$(document).ready(function() {
  
  document.querySelector('[data-comp=domains-version]').textContent = DOMAINS_VERSION;
  if (!DEBUG_MODE && localStorage.reloaded != 'true') {
    chrome.runtime.sendMessage({ action: 'getDomainsFromServer', data: { from: 'options_page', silently: true }}, () => {
      $updateDomains.addClass('loading_and_block');
    });
  }
  // document.querySelector('[data-comp=version]').textContent = APP_VERSION;
  // document.querySelector('[data-comp=currentYear]').textContent = new Date().getFullYear();
  localStorage.reloaded = 'false';
  $content = $('#content');
  $contentLoading = $('#wrapperLoading');

  var browserOs = '';
  if (navigator.platform.indexOf('Win') != -1) {
    browserOs = 'Windows';
  }else
  if (navigator.platform.indexOf('Mac') != -1) {
    browserOs = 'Mac';
  }else
  if (navigator.platform.indexOf('Linux') != -1){
    browserOs = 'Linux';
  }
  $('body').addClass(browserOs);

  if (FF) {
    $('body').addClass('isFirefox');
  } else if (EDGE) {
    $('body').addClass('isEdge');
  } else {
    $('body').addClass('isChrome');
  }
  
  if (isTryingToLogin()) {
    $contentLoading.show();
    setTimeout(()=>{
      chrome.runtime.sendMessage({ action: 'doTTLoginOnUpdated', data: { url: location.href, from: 'options_page' } }, function(response) {});
    }, 4000)
    return false;
  }
  
  $loginStatus = $('#loginStatus');
  
  $loginStatus.find('[data-status]').hide();
  
  ui();
  
  checkStatus();
  
  navigateToSection();
  
  setTimeout(showMessage, 2000);
  
  //$loginStatus.find('[href="#login"]').attr('href', LOGIN_URL + '?tmp_token=true&r=' + chrome.runtime.getURL('options.html'));
  //$loginStatus.find('[href="#signup"]').attr('href', SIGNUP_URL + '&tmp_token=true&r=' + chrome.runtime.getURL('options.html'));
  $loginStatus.find('[href="#login"]').on('click', function(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: 'showLogin', data: { from: 'options_page' } }, function(response) {});
  });

  $loginStatus.find('[href="#signup"]').on('click', function(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: 'showSignUp', data: { from: 'options_page' } }, function(response) {});
  });
  
  $loginStatus.find('[href="#logout"]').on('click', function(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: 'doLogout', data: { from: 'options_page' } }, function(response){
      showAccount('login');
    });
  });
  
  showAccount();
  
  setRateBanner();
  
});

$(window).on('hashchange', navigateToSection);

function navigateToSection(){
  var current_section = window.location.hash.replace('#', '');
  current_section = current_section ? current_section : 'permissions';
  
  var tabs = document.querySelectorAll('[data-comp=tabs] li');
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    var a = tab.querySelector('a[href="#'+current_section+'"]');
    if(a == null){
      tab.classList.remove('active');
    }else{
      tab.classList.add('active');
    }
  }
  
  renderSections();
  
  var sections = document.querySelectorAll('[data-section]');
  for (var j = 0; j < sections.length; j++) {
    var section = sections[j];
    if(section.getAttribute('data-section') == current_section){
      section.style.display = 'block';
    }else{
      section.style.display = 'none';
    }
  }
  $content.scrollTop(0);
}

function checkStatus() {
  var logged = false;
  var loaded = false;
  try {
    JSON.parse(localStorage.USER);
    $('body').addClass('LOGGED');
    $('body').removeClass('NOT_LOGGED');
    logged = true;
  } catch (err) {
    $('body').addClass('NOT_LOGGED');
    $('body').removeClass('LOGGED');
  }
  if (logged) {
    $('body').removeClass('ADMIN');
    try {
      if (JSON.parse(localStorage.CURRENT_ACCOUNT).role == 'ADMIN') {
        $('body').addClass('ADMIN');
      }
    } catch (err) {}
    
    try {
      JSON.parse(localStorage.USER_NOTIFICATIONS);
      if(typeof $sectionNotifications != "undefined") {
        $sectionNotifications.removeClass('LOADING');
        $sectionNotifications.removeClass('ERROR');
      }
      loaded = true;
    } catch (err) {
      if(typeof $sectionNotifications != "undefined") {
        $sectionNotifications.addClass('LOADING');
        $sectionNotifications.removeClass('ERROR');
      }
    }
    if (loaded && !notifications_stared) {
      startNotifications();
    }
  }
}

function ui() {
  
  $('a[data-link]').each(function() {
    var $this = $(this);
    $this.attr('href', PRODUCTION_DOMAIN + $this.data('link'));
  });
  
  $('[data-comp="close-rate"]').on('click', closeRate);
  $('[data-comp="open-rate"]').on('click', openRate);

  // ---
  
  // #region notifications 
  
  $notificationsList = $("[data-list=notifications]");
  $sectionNotifications = $("[data-section=notifications]");
  
  // #endregion

  // #region permissions 

  $permissions = $('#permissions');

  $updateDomains = $permissions.find("[name=update_domains]");
  $toggleAllDomains = $permissions.find('#toggleAllDomains');
  $openVideo = $permissions.find('#openVideo');
  
  $permissionsForm = $permissions.find('form[name=permissions]');
  $permissionsSearch = $permissionsForm.find('[name="searchDomains"]');
  $permissionsList = $permissionsForm.find('[data-comp=list]');
  $permissionsMoreDomains = $permissionsForm.find('[href="#more-domains"]');

  $integrationsForm = $permissions.find('form[name=integrations]');
  $integrationsList = $integrationsForm.find('[data-comp=list]');

  // ---

  $toggleAllDomains.on('change', function(e){
    if (e.target.checked) {
      enableAllOrigins();
      this.checked = false
    } else {
      disableAllOrigins();
    }
  });

  $updateDomains.on('click', function(e){
    e.preventDefault();
    chrome.runtime.sendMessage({ action: 'getDomainsFromServer', data: { from: 'options_page' } }, function(response) {
      $updateDomains.addClass('loading_and_block');
    });
  });

  $permissionsMoreDomains.on('click', function(e){
    e.preventDefault();
    var $text = $permissionsMoreDomains.find('u');
    if ($permissionsForm.hasClass('hidden-no-featured')) {
      $permissionsForm.removeClass('hidden-no-featured');
      $text.html('Less domains');
    } else {
      $permissionsForm.addClass('hidden-no-featured');
      $text.html('More domains');
    }
  });

  $openVideo.on('click', function(e){
    e.preventDefault();
    showVideoPop();
  });

  $permissionsSearch.on('keyup', function(e){
    
    $permissionsForm.removeClass('hidden-no-featured');

    // ---

    let query = e.currentTarget.value.toLowerCase();
    let domains = $permissionsForm.find('.list-item');

    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      const domain_name = domain.getAttribute('data-search');
      if (query === '') {
        $permissionsForm.removeClass('filtering');
        domain.style = null;
      } else {
        $permissionsForm.addClass('filtering');
        if (domain_name.search(query) >= 0) {
          domain.style.display = 'flex';
        } else {
          domain.style.display = 'none';
        }
      }
    }
    

  });

  // #endregion

  // #region custom domains 
  
  $customDomainsForm = $('form[name=custom-domains]');
  $customDomainsSelect = $customDomainsForm.find('[name=rule]');
  $customDomainsList = $customDomainsForm.find('[data-comp=list]');
  $deleteCustomDomains = $customDomainsForm.find('#delete-domains');
  $customDomainsSubmit = $customDomainsForm.find('[name=submit]');

  $customDomainsSelect.html(returnDomainsSelect());

  $customDomainsSubmit.on('click', function(e) {
    e.preventDefault();
    $customDomainsForm.submit();
  });

  $customDomainsForm.on('submit', function(event) {
    event.preventDefault();
    var $this = $(this);
    var domain = $this.find('[name=domain]').val();
    var rule = $this.find('[name=rule]').val();
    if (domain && rule) {
      addCustomDomain(domain, rule);
    }
    return false;
  });

  $customDomainsList.on('click', '[data-comp=delete]', function(event) {
    event.preventDefault();
    var id = $(this).closest('[data-id]').data('id');
    deleteCustomDomain(id);
  });

  $deleteCustomDomains.on('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    deleteCustomDomains();
  });
  
  //renderCustomDomains();

  /* rules */
  /*
    $addCustomRule = $('#add-rules');

    $addCustomRule.on('submit', function(event) {
      event.preventDefault();
      var $this = $(this);
      var name = $this.find('[name=name]').val();
      var rules = returnJson($this.find('[name=rules]').val());
      if (name && rules) {
        var data = {
          id: getTimestamp(),
          name: name,
          rules: rules
        };
        addCustomRule(data);
        $this[0].reset();
      }
      return false;
    });

    $customRulesList = $("[data-list=custom-rules]");
    $customRulesList.on('click', '.delete-rule', function(event) {
      event.preventDefault();
      var $li = $(this).parent();
      var id = $li.data('id');
      deleteCustomRule(id);
    });

    $deleteCustomRules = $('#delete-rules');
    $deleteCustomRules.on('click', function(event) {
      event.preventDefault();
      var $this = $(this);
      deleteCustomRules();
    });

    loadCustomRulesList();
  */  
  
  // #endregion

}

function showVideoPop() {

  const html = document.createElement('div');

  html.id = 'videoPopup';
  html.innerHTML = `
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/d7rsDoRfBas?rel=0&version=3&enablejsapi=1&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <a href="#close" class="close"><i class="icon-icontt_close"></i></a>
  `;

  document.body.appendChild(html);

  // ---

  const $videoPopup = document.getElementById('videoPopup');
  const $videoPopupVideoContainer = $videoPopup.querySelector('.video-container');
  const $videoPopupClose = $videoPopup.querySelector('[href="#close"]');

  $videoPopupVideoContainer.addEventListener('click',function(e) {
    e.preventDefault();
    $videoPopup.remove();
  });

  $videoPopupClose.addEventListener('click',function(e) {
    e.preventDefault();
    $videoPopup.remove();
  });

}

function renderSections() {
  renderPermissions();
  renderCustomDomains();
  setApps();
}

function showAccount(status, message) {
  $loginStatus.find('[data-status]').hide();
  if(status == 'loading'){
    $loginStatus.find('[data-status="loading"]').show();
  }else
  if(status == 'error'){
    $loginStatus.find('[data-comp="error"]').text(typeof message == 'string' ? '(' + message + ')' : '');
    $loginStatus.find('[data-status="error"]').show();
  }else
  if(status == 'login'){
    $loginStatus.find('[data-status="login"]').show();
  }else{
    var user = null;
    try {
      user = JSON.parse(localStorage.USER);
    }catch(err){ }
    
    var info_html = '';
    var user_name = '';
    var user_avatar = '';
    if(user != null){
      info_html += '<div class="title">Signed up as</div>';
      info_html += '<div class="name">' + user.name + ' ' + user.surname + '</div>';
      info_html += '<div class="email">' + user.email + '</div>';
      user_name = ' ' + user.name + ' ' + user.surname;
      user_avatar = user.avatar_url;
      $loginStatus.find('[data-status="logged"]').show();
    }else{
      $loginStatus.find('[data-status="login"]').show();
    }
    $loginStatus.find('[data-comp="userInfo"]').html(info_html);
    $loginStatus.find('[data-comp="userName"]').html(user_name);
    $loginStatus.find('[data-comp="userAvatar"]').attr('style','background-image:url('+user_avatar+');');
  }
  setApps();
}

function setApps() {
  var user = null;
  var account = null;
  try {
    user = JSON.parse(localStorage.USER);
    account = JSON.parse(localStorage.CURRENT_ACCOUNT);
  }catch(err){ }
  
  if (user == null || account == null) {
    $integrationsForm.hide();
    $integrationsList.hide();
    return false;
  }
  
  var user_apps = user.apps;
  var user_is_admin = account.role == 'ADMIN';
  var apps_enabled = 0;
  var apps_in_beta = 0;
  var taskManagement = getApp(user_apps, 'taskManagement');
  var betaTesting = getApp(user_apps, 'beta');

  let domains_with_third_party_apps = DOMAINS.filter( a => a.third_party_app);
  domains_with_third_party_apps.forEach(domain => {
    // recorro las third_party_apps 
    user_apps.forEach(app => {
      // me fijo que estén en user_apps
      if (app.key === domain.third_party_app.key) {
        let list_item_el = $permissionsList[0].querySelector(`[data-id="${app.key}"]`);
        if (taskManagement) {
          let is_legacy = taskManagement.settings[`is_${app.key}_legacy`] === true;
          // si es legacy, muestro el toggle
          if(is_legacy) {
            list_item_el.classList.remove('is-third-party-app');
          } else {
            list_item_el.classList.add('is-third-party-app');
          }
        }
      }
    });
  });
  
  var $integrations = $integrationsList.find('[data-integration]');
  
  for (var i = 0; i < $integrations.length; i++) {
    var $integration = $($integrations[i]);
    var integration_key = $integration.data('integration');
    var integration_is_beta = $integration.data('integration_is_beta');
    var integration_exists = false;
    for (var j = 0; j < user_apps.length; j++) {
      var app = user_apps[j];
      if (app.key === integration_key) {
        integration_exists = true;
        var user_app_is_enabled = app.status == 'on';
        let key = app.key.replace('basecamp', 'basecamp_');
        var app_is_enabled = taskManagement ? taskManagement.settings[key] === true : false;
        
        var taskManagementUrl = PRODUCTION_DOMAIN + '#' + account.account_id + '/add-ons/taskManagement';
        $integration.find('.sync_>a').removeClass('noClick').hide();
        if (user_is_admin) {
          $integration.find('.sync_>a').attr('href', taskManagementUrl);
        } else {
          $integration.find('.sync_>a').addClass('noClick');
        }
        
        // si está en beta y la integración no es beta, se oculta
        if(!betaTesting && integration_is_beta) {
          $integration.hide();
          $integration.removeClass('enabled');
          apps_in_beta++;
        } else
        if (app_is_enabled) {
          // Asana sincronization is enabled
          $integration.addClass('enabled');
          $integration.find('.sync_>a.sync_enabled').show();
          apps_enabled++;
        } else {
          $integration.removeClass('enabled');
          // deshabilitada en taskManagement
          if (user_is_admin && taskManagement) {
            // Enable Asana sincronization
            $integration.find('.sync_>a.sync_disabled').show();
          } else {
            // se oculta li
            $integration.hide();
          }
        }        
        
      }
    }
    if(!integration_exists) {
      $integration.remove();
    }
  }
  // si no hay apps habilitadas y el usuario no es admin o si no hay betatesting y solo hay apps en beta
  if (!taskManagement || !INTEGRATIONS.length || (apps_enabled == 0 && !user_is_admin) || (!betaTesting && apps_in_beta && apps_enabled == 0)) {
    // se ocultan las integraciones
    $integrationsForm.hide();
  } else {
    $integrationsForm.show();
  }
  
}

function getApp(apps, key) {
  let app = apps.filter(function(i) { return i.key == key })[0] || false;
  if (app) {
    app = app.status == 'on' ? app : false;
  }
  return app;
}

function onGetDomainsFromServer(data) {
  var message = '';
  var updated = false;
  var silently = data.silently == true;
  if (!data.from == 'options_page') {
    return false;
  }
  if (data.error != true) {
    // on success
    if (data.version == DOMAINS_VERSION) {
      // no se actalizó
      message = "Domains are up to date.";
    } else {
      // se actualizó
      updated = true;
      message = "A newer version of domains file was found (" + data.version + ").";
      setDomains();
      document.querySelector('[data-comp=domains-version]').textContent = data.version;
    }
    let reload_tabs = (silently && updated || !silently);
    if(reload_tabs) {
      setTimeout(function() {
        let reload_tabs_confirm = confirm(message + ' Reload tabs to apply changes.');
        if (reload_tabs_confirm) {
          chrome.runtime.sendMessage({ action: 'reloadTabs' }, function(response) {});
          localStorage.reloaded = 'true';
          location.reload();
        }else{
          localStorage.reloaded = 'true';
          location.reload();
        }
      }, 200);
    }
  } else {
    // on error
    message = "Unable to update domains";
    if (data.from == "options_page" && !silently) {
      setTimeout(function() {
        alert(message);
      }, 200);
    }
  }
  
  // if (from_options_page && message) {
  //   setTimeout(function() {
  //     alert(message);
  //     if (updated) {
  //       localStorage.reloaded = 'true';
  //       location.reload();
  //     }
  //   }, 200);
  // }
  if ($updateDomains.length) {
    $updateDomains.removeClass('loading_and_block');
  }
}

function onAllDomainsToggled(all_checked) {
  if (all_checked) {
    $toggleAllDomains.prop('checked', true)
    $permissions.addClass('all_domains_enabled');
  } else {
    $toggleAllDomains.prop('checked', false)
    $permissions.removeClass('all_domains_enabled');
  }
}

// RATE BANNER
function setRateBanner() {
  var show_rate = false;
  var rate_expiration_date = parseInt(localStorage.getItem('SHOW_RATE_EXPIRATION_DATE')) || false;
  var show_rate = rate_expiration_date == false || new Date().getTime() > rate_expiration_date;

  if (show_rate) {
    $('#rate').removeClass('hide');
  } else {
    $('#rate').addClass('hide');
  }
}

function updateRateBanner(days) {
  var expirations_days = 24 * 60 * 60 * 1000 * (days || 0)
  localStorage.setItem('SHOW_RATE_EXPIRATION_DATE', new Date().getTime() + expirations_days);
  setTimeout(setRateBanner, 200);
}

function openRate(e) {
  updateRateBanner(365);
}

function closeRate(e) {
  if (typeof e == 'object') {
    e.preventDefault();
  }
  updateRateBanner(30);
}

/* NOTIFICATIONS */

function startNotifications() {
  $notify_on = $("#notify_on");
  $select_day = $(".select-day");
  $n_disable = $("#disable_notifications");
  $n_not_tracking = $("#notify_not_tracking");
  $n_not_tracking_interval = $("#notify_not_tracking_interval");
  $n_when_tracking = $("#notify_when_tracking");
  $n_when_tracking_interval = $("#notify_when_tracking_interval");
  $n_from = $('#notify_from');
  $n_to = $('#notify_to');
  $n_mon = $('#notify_mon');
  $n_mon_from = $('#notify_mon_from');
  $n_mon_to = $('#notify_mon_to');
  $n_tue = $('#notify_tue');
  $n_tue_from = $('#notify_tue_from');
  $n_tue_to = $('#notify_tue_to');
  $n_wed = $('#notify_wed');
  $n_wed_from = $('#notify_wed_from');
  $n_wed_to = $('#notify_wed_to');
  $n_thu = $('#notify_thu');
  $n_thu_from = $('#notify_thu_from');
  $n_thu_to = $('#notify_thu_to');
  $n_fri = $('#notify_fri');
  $n_fri_from = $('#notify_fri_from');
  $n_fri_to = $('#notify_fri_to');
  $n_sat = $('#notify_sat');
  $n_sat_from = $('#notify_sat_from');
  $n_sat_to = $('#notify_sat_to');
  $n_sun = $('#notify_sun');
  $n_sun_from = $('#notify_sun_from');
  $n_sun_to = $('#notify_sun_to');

  $formNotifications = $('form[name=notifications]');
  $saveNotifications = $formNotifications.find('#save_notifications');
  $saveNotificationsLabel = $formNotifications.find('[for=save_notifications]');
  setUserNotifications();

  $n_disable.on('click', function() {
    if ($formNotifications.hasClass('notifications-list-enabled')) {
      $formNotifications.removeClass('notifications-list-enabled');
      $n_not_tracking.prop('checked', false);
      $n_when_tracking.prop('checked', false);
    } else {
      $formNotifications.addClass('notifications-list-enabled');
      $n_not_tracking.prop('checked', this.checked);
      $n_when_tracking.prop('checked', this.checked);
    }
    $formNotifications.submit();
  });

  checkDisable();
  $n_not_tracking.on('click', function() {
    checkDisable();
  });
  $n_when_tracking.on('click', function() {
    checkDisable();
  });

  onNotifyOn();
  $notify_on.on('change', function() {
    onNotifyOn();
  });

  onSelectedDay();
  $select_day.on('change', function() {
    onSelectedDay();
  });

  $saveNotifications.on('click', function(e) {
    e.preventDefault();
    $formNotifications.submit();
    $saveNotifications.addClass('loading_and_block')
    setTimeout(() => {
      $saveNotifications.removeClass('loading_and_block')
    }, 1000);
  });

  $formNotifications.on('submit', function(e) {
    e.preventDefault();
    saveUserNotifications();
  });

  notifications_stared = true;

  function checkDisable() {
    if ($n_not_tracking.prop('checked') || $n_when_tracking.prop('checked')) {
      $n_disable.prop('checked', true);
      $formNotifications.addClass('notifications-list-enabled');
    }
    // else {
      // $n_disable.prop('checked', true);
    // }
  }

  function onNotifyOn() {
    $('.notification-type').removeClass('selected');
    $('.notification-type[data-value="' + $notify_on.val() + '"]').addClass('selected');
  }

  function onSelectedDay() {
    $('.from-to').removeClass('selected');
    $select_day.each(function() {
      if (this.checked) {
        var $fromTo = $('.from-to[for="' + this.id + '"]');
        if ($fromTo.length) {
          $fromTo.addClass('selected');
          if ($fromTo.find('.from').val() == "") {
            $fromTo.find('.from').val(USER_NOTIFICATIONS.mon.from);
          }
          if ($fromTo.find('.to').val() == "") {
            $fromTo.find('.to').val(USER_NOTIFICATIONS.mon.to);
          }
        }
      }
    });
  }

}

function setUserNotifications() {
  try {
    JSON.parse(localStorage.USER_NOTIFICATIONS);
  } catch (err) {
    return false;
  }

  var user_notifications = JSON.parse(localStorage.USER_NOTIFICATIONS);

  $saveNotifications.prop('disabled', false);

  $n_not_tracking.prop("checked", user_notifications.not_tracking);
  $n_not_tracking_interval.val(user_notifications.not_tracking_interval);
  $n_when_tracking.prop("checked", user_notifications.when_tracking);
  $n_when_tracking_interval.val(user_notifications.when_tracking_interval);

  if (user_notifications.mon == null) {
    $n_mon.prop("checked", false);
  } else {
    $n_mon.prop("checked", true);
    $n_mon_from.val(user_notifications.mon.from);
    $n_mon_to.val(user_notifications.mon.to);
  }
  if (user_notifications.tue == null) {
    $n_tue.prop("checked", false);
  } else {
    $n_tue.prop("checked", true);
    $n_tue_from.val(user_notifications.tue.from);
    $n_tue_to.val(user_notifications.tue.to);
  }
  if (user_notifications.wed == null) {
    $n_wed.prop("checked", false);
  } else {
    $n_wed.prop("checked", true);
    $n_wed_from.val(user_notifications.wed.from);
    $n_wed_to.val(user_notifications.wed.to);
  }
  if (user_notifications.thu == null) {
    $n_thu.prop("checked", false);
  } else {
    $n_thu.prop("checked", true);
    $n_thu_from.val(user_notifications.thu.from);
    $n_thu_to.val(user_notifications.thu.to);
  }
  if (user_notifications.fri == null) {
    $n_fri.prop("checked", false);
  } else {
    $n_fri.prop("checked", true);
    $n_fri_from.val(user_notifications.fri.from);
    $n_fri_to.val(user_notifications.fri.to);
  }
  if (user_notifications.sat == null) {
    $n_sat.prop("checked", false);
  } else {
    $n_sat.prop("checked", true);
    $n_sat_from.val(user_notifications.sat.from);
    $n_sat_to.val(user_notifications.sat.to);
  }
  if (user_notifications.sun == null) {
    $n_sun.prop("checked", false);
  } else {
    $n_sun.prop("checked", true);
    $n_sun_from.val(user_notifications.sun.from);
    $n_sun_to.val(user_notifications.sun.to);
  }

  // saber si es week days o custom
  var compare_mon = JSON.stringify(user_notifications.mon);
  var is_week_days = (user_notifications.sat == null && user_notifications.sun == null && user_notifications.mon != null) &&
  (compare_mon == JSON.stringify(user_notifications.tue) && compare_mon == JSON.stringify(user_notifications.wed) && compare_mon == JSON.stringify(user_notifications.thu) && compare_mon == JSON.stringify(user_notifications.fri));
  
  if (is_week_days) {
    $notify_on.val("week_days").trigger('change');
  } else {
    $notify_on.val("custom_days").trigger('change');
  }
  $n_from.val(user_notifications.mon != null ? user_notifications.mon.from : NEW_USER_NOTIFICATIONS.mon.from);
  $n_to.val(user_notifications.mon != null ? user_notifications.mon.to : NEW_USER_NOTIFICATIONS.mon.to);

}

function saveUserNotifications() {
  $saveNotifications.prop('disabled', true);
  var json = {
    "not_tracking": $n_not_tracking.prop("checked"),
    "not_tracking_interval": $n_not_tracking_interval.val(),
    "when_tracking": $n_when_tracking.prop("checked"),
    "when_tracking_interval": $n_when_tracking_interval.val(),
    "mon": null,
    "tue": null,
    "wed": null,
    "thu": null,
    "fri": null,
    "sat": null,
    "sun": null
  };
  if ($notify_on.val() == "week_days") {
    var from = ($n_from.val() != "") ? $n_from.val() : USER_NOTIFICATIONS.mon.from;
    var to = ($n_to.val() != "") ? $n_to.val() : USER_NOTIFICATIONS.mon.to;
    var from_to = {
      "from": from,
      "to": to
    };
    json.mon = from_to;
    json.tue = from_to;
    json.wed = from_to;
    json.thu = from_to;
    json.fri = from_to;
  } else {
    if ($n_mon.prop("checked") && ($n_mon_from.val() != "" && $n_mon_to.val() != "")) {
      json.mon = {
        "from": $n_mon_from.val(),
        "to": $n_mon_to.val()
      };
    }
    if ($n_tue.prop("checked") && ($n_tue_from.val() != "" && $n_tue_to.val() != "")) {
      json.tue = {
        "from": $n_tue_from.val(),
        "to": $n_tue_to.val()
      };
    }
    if ($n_wed.prop("checked") && ($n_wed_from.val() != "" && $n_wed_to.val() != "")) {
      json.wed = {
        "from": $n_wed_from.val(),
        "to": $n_wed_to.val()
      };
    }
    if ($n_thu.prop("checked") && ($n_thu_from.val() != "" && $n_thu_to.val() != "")) {
      json.thu = {
        "from": $n_thu_from.val(),
        "to": $n_thu_to.val()
      };
    }
    if ($n_fri.prop("checked") && ($n_fri_from.val() != "" && $n_fri_to.val() != "")) {
      json.fri = {
        "from": $n_fri_from.val(),
        "to": $n_fri_to.val()
      };
    }
    if ($n_sat.prop("checked") && ($n_sat_from.val() != "" && $n_sat_to.val() != "")) {
      json.sat = {
        "from": $n_sat_from.val(),
        "to": $n_sat_to.val()
      };
    }
    if ($n_sun.prop("checked") && ($n_sun_from.val() != "" && $n_sun_to.val() != "")) {
      json.sun = {
        "from": $n_sun_from.val(),
        "to": $n_sun_to.val()
      };
    }
  }
  // guardo
  console.log(json);
  chrome.runtime.sendMessage({
    action: "saveNotificationsSettings",
    data: json
  }, function(response) {});
}

// received from notifications.js whitout sendResponse
chrome.runtime.onMessage.addListener( function(request, sender) {
  switch (request.action) {
    case 'onBookmarksLoaded':
      checkStatus();
      $saveNotifications.prop('disabled', false);
      break;
    case 'onBookmarksError':
      $sectionNotifications.addClass('ERROR');
      $sectionNotifications.removeClass('LOADING');
      $saveNotifications.prop('disabled', true);
      break;
    case 'onBookmarksSaved':
      setUserNotifications();
      $saveNotificationsLabel.text('Settings Saved!').show();
      setTimeout(function() {
        $saveNotificationsLabel.fadeOut();
      }, 3000);
      break;
    case 'onBookmarksSavedError':
      $saveNotificationsLabel.text('Error Saving Settings!').show();
      setTimeout(function() {
        $saveNotificationsLabel.fadeOut();
      }, 3000);
      $saveNotifications.prop('disabled', false);
      break;
    case 'loggedOut':
      checkStatus();
      break;
  }
  
  // background.js
  switch (request.status) {
    case 'onGetDomainsFromServer':
      onGetDomainsFromServer(request.data);
    break;
  }
  return true;
});

// helpers
function isTryingToLogin() {
  var query = getQuery();
  query.action = typeof query.action == 'string' ? query.action : '';
  return !!query.action;
}

function showMessage() {
  var query = getQuery();
  query.message = typeof query.message == 'string' ? query.message : '';
  if (!!query.message) {
    alert(query.message);
  }
}

function getQuery() {
  var query = {};
  var pairs = window.location.search.substring(1).split("&");
  for (var i in pairs) {
    if (pairs[i] === "") continue;
    var pair = pairs[i].split("=");
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    query[name] = value;
  }
  return query;
}
