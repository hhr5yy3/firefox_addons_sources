
var $header;
var $footer;
var $body;
var $views;
var $errorMessage;
var $homeView;
var $assistanceMessage;
var $user;
var $jumpTo;
var $showPopup;
var $closePopup;
var $errorLog, $errorClear;

var $recentEvents;
var $recentEventsLoading;
var $recentEventsList;
var $loadMoreEvents;

var STATE, EVENT, USER, CURRENT_ACCOUNT, ERROR, SETTINGS;
var events_page = 0;
var events_page_size = 20;

var SET_DATE_FORMAT, SET_NUMBER_FORMAT, SET_TIME_FORMAT, SET_TIME_DISPLAY;

window.TTExtensionApp = {
  onMessage: function(request, sender) {
    switch (request.status) {
      case 'updateView':
        changeSection(localStorage.STATE, request.data);
        break;
      case 'updateTaskDuration':
        onUpdateTaskDuration(request.data);
        break;
      case 'updateEvents':
        onUpdateEvents(request.data);
        break;
      case 'updateData':
        setVariables();
        setUserData();
        closePopup();
        break;
      case 'showError':
        try {
          showErrorMesage(request.data.message);
        } catch (e) {}
        break;
    }
    setVariables();
    return true;
  },
  sendMessage: function(action, data) {
    chrome.runtime.sendMessage({ action: action, data: data }, function(response){
      // console.log(response);
    });
  },
  setLoginUrl: function() {
    var buttons = document.querySelectorAll('[href="#login"]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].href = LOGIN_URL + '?tmp_token=true&r=' + chrome.runtime.getURL('options.html');
    }
    var signup_buttons = document.querySelectorAll('[href="#signup"]');
    for (var j = 0; j < signup_buttons.length; j++) {
      signup_buttons[j].href = SIGNUP_URL + '&tmp_token=true&r=' + chrome.runtime.getURL('options.html');
    }
  }
};

$(document).ready(function() {
  chrome.runtime.sendMessage({ action: 'popUpOpened' }, function(response) {
    if (response.action == 'close') {
      window.close();
    } else {
      ready();
    }
  });
});

function ready() {
  
  $header = $('header');
  $footer = $('footer');
  $body = $('body');
  $views = $('.view');
  $errorMessage = $('.error_message_');
  $trackingPlayer = $('.tracking_player');
  $homeView = $('#homeView');
  $assistanceMessage = $('#AssistantMessage');
  $assistanceMessageText = $assistanceMessage.find('[data-comp="text"]');
  $user = $('.user');
  $jumpTo = $('.jump_to');
  $showPopup = $('[data-pop]');
  $closePopup = $('.pop_up .close');
  $errorLog = $('.error_log_');
  $errorClear = $('.clear_error');

  $recentEvents = $('#recentEvents');
  $recentEventsLoading = $('#recentEvents .loading_');
  $recentEventsList = $('#recentEvents .list_');
  $loadMoreEvents = $('#recentEvents .load_');

  setEvents();
  setVariables();
  getRecentEvents();

  TTExtensionApp.sendMessage('checkUpdates');

  $errorMessage.click(function() {
    $(this).removeClass('active');
  });
  
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
  $body.addClass(browserOs);
  
  if (FF) {
    $body.addClass('isFirefox');
  } if (EDGE) {
    $body.addClass('isEdge');
  } else {
    $body.addClass('isChrome');
  }
  
  //$body.addClass('loading_window_');
  setTimeout(function () {
    $body.removeClass('loading_window_');
  }, 1000);
  
}

// received from background.js whitout sendResponse
chrome.runtime.onMessage.addListener(TTExtensionApp.onMessage);

function setEvents() {
  
  $('a[data-link]').each(function() {
    var $this = $(this);
    $this.attr('href', PRODUCTION_DOMAIN + $this.data('link'));
  });
  
  $jumpTo.on('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var jump = $(this).attr('data-jump');
    changeSection(jump);
  });
  
  $body.on('click', '[data-comp="playerTrackButton"]', function(event) {
    event.preventDefault();

    var data = {
      id: EVENT.id
    };

    if ($body.hasClass('tracking_task')) {
      TTExtensionApp.sendMessage('doStopTrack', data);
    } else {
      TTExtensionApp.sendMessage('doTrackWithId', data);
    }

  });
  
  $showPopup.on('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    var pop = $this.attr('data-pop');
    var active = $this.hasClass('active');
    closePopup();
    if (!active) {
      $('.pop_up#' + pop).addClass('active');
      $this.addClass('active');
      $body.attr('data-popup_over', pop);
    }
    // getRecentEvents();
  });

  $closePopup.on('click', function(event) {
    event.preventDefault();
    closePopUp();
  });

  $errorClear.on('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('ERROR');
    setVariables();
    showError();
  });
  
  $body.on('click', '[href="#login"]', function(e) {
    e.preventDefault();
    TTExtensionApp.sendMessage('showLogin', { from: 'pop_up' });
    window.close();
  });

  $body.on('click', '[href="#signup"]', function(e) {
    e.preventDefault();
    TTExtensionApp.sendMessage('showSignUp', { from: 'pop_up' });
    window.close();
  });
  
  $body.on('click', '[href="#logout"]', function(event) {
    event.preventDefault();
    TTExtensionApp.sendMessage('doLogout', { from: 'pop_up'});
    window.close();
  });
  
  $body.on('click', '[data-comp="settingButton"]', function(e) {
    e.preventDefault();
    var hash = $(this).attr('href').replace('#', '');
    hash = hash ? '#' + hash : '';
    openSettings(hash);
  });
  
  // recent events
  $body.on('click', '[data-action="track"]', function(e) {

    e.preventDefault();
    
    var $this = $(this);
    var $listItem = $this.closest('.item_');
    var id = $this.attr('data-task_id');

    var data = {
      id: id
    };

    //start or stop tracking
    if ($listItem.hasClass('playing')) {
      TTExtensionApp.sendMessage('doStopTrack', data);
    } else {
      TTExtensionApp.sendMessage('doTrackWithId', data);
    }
  });
  
  $body.on('click', '[href="#load-more-events"]', function(event) {
    event.preventDefault();
    getRecentEvents({
      loadMore: true
    });
  });
  
}

// cambio de vista: se ejectua cada vez que se abre el panel o cambia algo en bg
function changeSection(section, response) {

  setVariables();
  // section puede ser null o false toma el valor de localStorage.STATE sino.
  if (typeof(section) != "undefined" && typeof(section) != null && section != false) {
    STATE = section;
    // console.log(STATE);
  }
  
  if (typeof $views != 'undefined') {
    $views.removeClass('active');
  }
  $('[data-comp=' + STATE + ']').addClass('active');

  switch (STATE) {
    case 'LOGIN':
      onShowLogin(response);
      break;
    case 'RECOVER_PASSWORD':
      onShowRecoverPassword(response);
      break;
    case 'SIGN_UP':
      onShowSignup(response);
      break;
    case 'TRACKING':
      onShowTracking(response);
      break;
    case 'NOT_TRACKING':
      onShowNotTracking(response);
      break;
  }
  //showError();
  
  onAssistantMessage();
  
}

function openSettings(hash) {
  hash = typeof hash == 'string' ? hash : '';
  var options_url = chrome.runtime.getURL('options.html');
  chrome.tabs.query({ 'currentWindow': true }, function(tabs) {
    var create_tab = true;
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      if (tab.url.indexOf(options_url) == 0) {
        chrome.tabs.update(tab.id, { url: options_url + hash });
        chrome.tabs.highlight({ tabs: tab.index }, window.close);
        return false;
      }
    }
    chrome.tabs.create({ url: options_url + hash }, window.close);
  });
}

// control de vista

function onAssistantMessage() {
  
  var domains_total = DOMAINS.length;
  var domains_enabled = [];

  // poner un disclaimer diciendo cuales tiene que habilitar
  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    if(tabs.length){
      var tab = tabs[0];
      var origin = getOrigin(tab.url);
      var domain = false;
      for (var d in DOMAINS) {
        if(getOrigin(DOMAINS[d].domain) == origin){
          domain = DOMAINS[d];
        }
      }
      if(domain){
        chrome.permissions.contains({
          origins: [origin]
        }, function(allowed) {
          if (!allowed) {
            
          }
        });
      }
    }
  });

  chrome.permissions.getAll(function(results){
    
    var origins = results.origins;
    var domains = DOMAINS.concat(CUSTOM_DOMAINS);
    
    for (var i = 0; i < domains.length; i++) {
      if(origins.filter(function(o) { var otod = originToDomain(o); return otod == domains[i].domain || '*.' + otod == domains[i].domain; }).length){
        domains_enabled.push(domains[i]);
      }
    }
    
    // array de apps activas en taskManagement que necesitan estar activadas
    var taskManagement = USER ? USER.apps.filter(function(a){return a.key=='taskManagement'})[0] || false : false;
    var required_message_HTML = '';
    
    if (taskManagement) {
      var domains_required = [];
      for (var i in taskManagement.settings) {
        // busco si la app está en domains.
        var app_on_domain = DOMAINS.filter(function(d) { return d.app == i.replace('basecamp_', 'basecamp'); })[0] || false;
        // si está en domains Y está prendida
        if (app_on_domain && taskManagement.settings[i] == true) {
          // me fijo si tiene permisos en chrome
          if (!domains_enabled.filter(function(d) { return d.id == app_on_domain.id; }).length) {
            // si no tiene permisos hay que mostar un mensaje
            domains_required.push(app_on_domain.name);
          }
        }
      }

      if (domains_required.length) {
        required_message_HTML += '<p><i class="icon-appTT_error important_"></i> Go to the <a href="#permissions" data-comp="settingButton">options page</a> to enable ';
        required_message_HTML += domains_required.reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ' and ') + value);
        required_message_HTML += ' to continue using the extension.</p>';
      }
    }
      
    var domains_max = 12;
    var domains_total = DOMAINS.length + CUSTOM_DOMAINS.length;
    var domains_enabled_total = domains_enabled.length;
    
    var message_HTML = '';
    
    if (domains_enabled_total >= domains_total) {
      message_HTML += '<h2>TrackingTime is enabled in all domains.</h2>';
      message_HTML += '<p><a href="#permissions" data-comp="settingButton">Manage permissions</a></p>';
    } else if (domains_enabled_total > 0 && domains_enabled_total < domains_total) {
      message_HTML += '<h2>TrackingTime is enabled in ';
      for (var e in domains_enabled) {
        if (e <= domains_max) {
          message_HTML += '<u class="domain_item">' + (typeof domains_enabled[e].name == 'string' ? domains_enabled[e].name : domains_enabled[e].domain) + '</u>';
        }
      }
      message_HTML += '</h2>';
      message_HTML += '<p><a href="#permissions" data-comp="settingButton">Allow more domains</a></p>';
    } else if (domains_enabled_total === 0 && required_message_HTML === '') {
      message_HTML += '<h2>Enable Tracking to integrate with your favourites apps.</h2>';
      message_HTML += '<p><a href="#permissions" data-comp="settingButton">Allow Domains</a> or <a href="#custom-domains" data-comp="settingButton">Add Custom Domains</a></p>';
    }
    
    $assistanceMessageText.html(required_message_HTML+message_HTML);
    
  });
  
}

function onShowLogin(data) {
  $('[data-comp="loginScroll"]').scrollTop(0);
  $body.removeClass('successful_login');
  $body.removeClass('tracking_task');
  if (typeof(data) !== "undefined" && typeof(data) !== null) {
    if (typeof(data.response) !== "undefined" && typeof(data.response) !== null) {
      if (data.response.status == 500) {
        showErrorMesage(data.response.message);
      }
    }
  }
}

function onShowRecoverPassword(data) {
  $('[data-comp="loginScroll"]').scrollTop(0);
  $body.removeClass('successful_login');
  $body.removeClass('tracking_task');
  $recoverForm[0].reset();
  if (typeof(data.response) !== "undefined" && typeof(data.response) !== null) {
    if (data.response.status == 500) {
      showErrorMesage(data.response.message);
    }
  }
}

function onShowTracking(data) {
  
  var event = typeof data.event == 'string' ? data.event : '';
  
  $body.addClass('successful_login tracking_task');
  
  setUserData();
  setTrackingPlayer(EVENT);
  
  if (event == 'TASK_STARTED') {
    setTimeout( function(){
      getRecentEvents({
        preventLoading: true
      });
    }, 2000);
  }
}

function onShowNotTracking(data) {
  
  $body.addClass('successful_login');
  $body.removeClass('tracking_task');
  
  setUserData();
  
  if (EVENT.task != null || EVENT.project != null) {
    setTrackingPlayer(EVENT);
  }

  $('[data-id]').removeClass('playing');
  
  // if (EVENT.task != null || EVENT.project != null) {
  //   // $notTracking.find('.tracking_player').show();
  //   // $notTracking.find('.empty_task').hide();
  //   // setTrackingPlayer(EVENT);
  // } else {
  //   // $notTracking.find('.tracking_player').hide();
  //   // $notTracking.find('.empty_task').show();
  // }
  
  if (typeof(data) !== "undefined" && typeof(data) !== null) {
    if (typeof(data.response) !== "undefined" && typeof(data.response) !== null) {
      if (data.response.status == 500) {
        showErrorMesage(data.response.message);
      }
    }
  }
  
}

function onUpdateTaskDuration(data) {
  setTrackingPlayer(data);
  if(data){
    var $target = $('[data-id="' + data.event_id + '"]');
    if ($target.length) {
      $target.addClass('playing');
      $target.find('.time_').text(data.formated_event_duration);
    }
  }
}

function setTrackingPlayer(data) {
  var $task_end = $trackingPlayer.find('.task_end');
  
  if (data.estimated_time) {
    if ($task_end.length) {
      $task_end.html(data.loc_estimated_time);
      $task_end.show();
    }
    // $trackingPlayer.find('.line').width(percentBar(data.worked_hours, data.estimated_time));
    if (data.worked_hours > data.estimated_time) {
      $trackingPlayer.addClass('exceeded');
    } else {
      $trackingPlayer.removeClass('exceeded');
    }
  } else {
    if ($task_end.length) {
      $task_end.find('.task_end').hide();
      $task_end.show();
    }
    // $trackingPlayer.find('.line').width('100%');
    $trackingPlayer.removeClass('exceeded');
  }
  
  if (!!data.project || !!data.task) {
    if (!!data.project) {
      $trackingPlayer.find('.project_name').html(data.project);
    }else{
      $trackingPlayer.find('.project_name').html('');
    }
    if (!!data.task) {
      $trackingPlayer.find('.task_name').html(data.task);
    }else{
      $trackingPlayer.find('.task_name').html('');
    }
  } else {
    $trackingPlayer.find('.project_name').html('');
    $trackingPlayer.find('.task_name').html('Project/Task');
  }
  
  $trackingPlayer.find('[data-comp="taskLink"]').attr('href', PRODUCTION_DOMAIN + '#/task/' + data.id);
  
  if (typeof data.url != 'undefined' && data.url != '') {
    $trackingPlayer.find('.text').addClass('link_on');
    $trackingPlayer.find('.text').attr('href', data.url);
  } else {
    $trackingPlayer.find('.text').removeClass('link_on');
  }
  
  if (typeof data.formated_duration != 'undefined') {
    $trackingPlayer.find('.task_duration').html(data.formated_duration + (data.loc_estimated_time != '00:00' ? ' / ' : ''));
  }
  
  // ---
  
  if (data) {
    $trackingPlayer.addClass('active');
  }else{
    $trackingPlayer.removeClass('active');
  }
  
}

function percentBar(val, total) {
  var percent_number = Math.floor(porcentaje(val, total));
  if (!isNaN(percent_number) && percent_number > 100) {
    percent_number = 100;
  }
  return percent_number + '%';
}

function porcentaje(valor, total) {
  a = valor;
  b = total;
  c = a / b;
  d = c * 100;
  if (isNaN(d)) {
    d = 0;
  }
  return d;
}

function getRecentEvents(params) {
  params = typeof params == 'object' ? params : {};
  var preventLoading = params.preventLoading == true;
  var loadMore = params.loadMore == true;
  
  if (loadMore) {
    $loadMoreEvents.addClass('active');
    $loadMoreEvents.find('a').addClass('loading_and_block');
    events_page++;
  } else {
    $loadMoreEvents.removeClass('active');
    $loadMoreEvents.find('a').removeClass('loading_and_block');
    if (!preventLoading) {
      $recentEventsLoading.addClass('active');
    }
    events_page = 0;
  }
  
  TTExtensionApp.sendMessage('getRecentEvents', {
    page: events_page,
    page_size: events_page_size
  });
}

function onUpdateEvents(data) {
  $recentEventsLoading.removeClass('active');
  $recentEventsLoading.removeClass('error');
  $recentEventsLoading.find('.message').text('');
  $loadMoreEvents.find('a').removeClass('loading_and_block');
  if (data.response.status == 200) {
    var html = renderRecentEvents(data.data);
    if (events_page == 0) {
      $recentEventsList.find('ul').html(html);
    } else {
      $recentEventsList.find('ul').append(html);
    }
    if (data.data.length > 0) {
      $loadMoreEvents.addClass('active');
    } else {
      $loadMoreEvents.removeClass('active');
    }
  } else {
    $recentEventsLoading.find('.message').text(data.response.message);
    $recentEventsLoading.addClass('error');
  }
}

function renderRecentEvents(data) {
  var html = '';
  var separator = "";
  for (var i = 0; i < data.length; i++) {
    var task_event = data[i];
    var this_separation = readableDate(task_event.start);
    if (separator != this_separation) {
      if ($('[data-day="' + this_separation + '"]').length == 0) {
        html += '<li class="sep_" data-day="' + this_separation + '">';
          html += '<h2>' + this_separation + '</h2>';
        html += '</li>';
      }
      separator = this_separation;
    }
    var project_title = (task_event.project == null) ? "" : task_event.project;
    var task_title = (task_event.task == null) ? "" : task_event.task;
    html += '<li class="item_" data-id="' + task_event.id + '">';
	    html += '<div class="name_">';
      if (task_title) {
        html += '<h2><a href="' + PRODUCTION_DOMAIN + '#/task/' + task_event.task_id + '" target="_blank">' + task_title + '</a></h2>';
      }
      if (project_title) {
        html += '<h3>' + project_title + '</h3>';
      }
	    html += '</div>';
      //if(task_event.loc_duration != "00:00") {
        html += '<div class="time_">';
          html += '<p>' + ss_to_hh_display_locale(task_event.duration) + '</p>';
        html += '</div>';
      //}

      html += '<a href="#" class="playButton" data-action="track" data-task_id=' + task_event.task_id + '>';
        html += '<span class="play play_ic"><i class="icon-icontt_play"></i></span>';
        html += '<span class="stop stop_ic"><i class="icon-icontt_stop"></i></span>';
      html += '</a>';

    html += '</li>';
  }
  if (data.length === 0 && events_page === 0) {
    html = '<li class="empty_"><h2>There is no activity yet</h2></li>';
  }
  return html;
}

function readableDate(a) {
  return moment(a, "YYYY-MM-DD").format("dddd, MMMM Do");
}

function onShowSignup(data) {
  $('[data-comp="loginScroll"]').scrollTop(0);
  $user.removeClass('active');
  if (typeof(data) !== "undefined" && typeof(data) !== null) {
    if (data.response.status == 500) {
      showErrorMesage(data.response.message);
    }
  }
}

function setVariables() {
  if (localStorage.SETTINGS == null) {
    localStorage.SETTINGS = "{}";
  }
  if (localStorage.STATE == null) {
    localStorage.STATE = "LOGIN";
  }
  if (localStorage.USER != null) {
    USER = JSON.parse(localStorage.USER);
    SET_DATE_FORMAT = USER.settings.date_format;
    SET_NUMBER_FORMAT = USER.settings.number_format;
    SET_TIME_FORMAT = USER.settings.time_format;
    SET_TIME_DISPLAY = USER.settings.time_display;
  }
  if (localStorage.EVENT != null) {
    EVENT = JSON.parse(localStorage.EVENT);
  }
  if (localStorage.CURRENT_ACCOUNT != null) {
    CURRENT_ACCOUNT = JSON.parse(localStorage.CURRENT_ACCOUNT);
  }
  if (localStorage.ERROR == null) {
    ERROR = [];
  } else {
    ERROR = JSON.parse('[' + localStorage.ERROR + ']');
  }
  STATE = localStorage.STATE;
  //USER = JSON.parse(localStorage.USER);
  //EVENT = JSON.parse(localStorage.EVENT);
  SETTINGS = JSON.parse(localStorage.SETTINGS);
}

function setUserData() {
  setTeamData();
  $user.find('.name').html(USER.name + ' ' + USER.surname);
  $user.find('.email').html(USER.email);
  $user.find('.avatar .initials').html(USER.name[0] + USER.name[1] + '.');
  if (USER.avatar_url) {
    $user.find('.avatar .image').css('background-image', 'url(' + USER.avatar_url + ')');
  }
}

function setTeamData() {

  var html = '';
  if (USER.teams != null) {
    let active_teams = USER.teams.filter(t=> t.account_status.indexOf("SUBSCRIBED") > -1 || t.account_status.indexOf("TRIAL") > -1 || t.account_status.indexOf("FREE") > -1) 
    if (active_teams.length > 1) {
      $user.addClass('multi');
    } else {
      $user.removeClass('multi');
    }
    for (var t = 0; t < active_teams.length; t++) {
      html += '<li class="';
      if (CURRENT_ACCOUNT.account_id == active_teams[t].account_id) {
        $user.find('.team').html(active_teams[t].company);
        html += 'isSelected ';
      }
      if (active_teams[t].is_default) {
        html += 'default';
      }
      html += '" data-account_id="' + active_teams[t].account_id + '">';
      html += '<a href="#" class="listPrimaryAction"><u>' + active_teams[t].company + '</u><small>Created by '+active_teams[t].account_owner.name+' '+active_teams[t].account_owner.surname+' '+(active_teams[t].is_default ? '/ default' : '' )+'</small></a>';
      // html += '<a href="#" class="listSecondaryAction '+(active_teams[t].is_default?'isDefault':'')+'">';
      // if (active_teams[t].is_default) {
      //   html += 'default';
      // } else {
      //   html += 'Set as default';
      // }
      // html += '</a>';
      html += '</li>';
    }
  }
	
	$('#switchAccount ul').html(html);

  $('#switchAccount .listPrimaryAction').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.parent();
    var is_active = $parent.hasClass('isSelected');
    var account_id = $parent.attr('data-account_id');
    if (!is_active) {
      var data = account_id;
      TTExtensionApp.sendMessage('switchTeam', data);
      $trackingPlayer.removeClass('active');
      getRecentEvents();
    }
  });

  $('#switchAccount .listSecondaryAction').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $parent = $(this).parent();
    var is_default = $parent.hasClass('default');
    var account_id = $parent.attr('data-account_id');
    if (!is_default) {
      var data = {
        team_id: account_id
      };
      TTExtensionApp.sendMessage('changeDefaultTeam', data);
    }
  });
}

function showError() {
  return false;
  /*
  if (SETTINGS.settings.error_log.active) {
    var formated_error = '';
    if (ERROR.length) {
      for (var e = 0; e < ERROR.length; e++) {
        var error = ERROR[e];
        formated_error += error.title + ': ' + error.message + ' | ';
      }
    }
    $errorLog.find('textarea').val(formated_error);
    $errorLog.show();
  } else {
    $errorLog.hide();
  }
  */
}


function showErrorMesage(message) {
  $errorMessage.find(".content").text(message);
  $errorMessage.addClass('active');
}

function closePopup() {
  $('.pop_up').removeClass('active');
  $('[data-pop]').removeClass('active');
  $body.removeAttr('data-popup_over');
}

window.onerror = function(error, url, line) {
  //saveError(error)
};
