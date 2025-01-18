var DEBUG_SERVER = null;
var API_BASE_PATH = 'scriba';

API = {

  api_path: API_BASE_PATH + '/api/getConferenceLink',
  guest_path: API_BASE_PATH + '/api/getInviteLink',
  recording_path: API_BASE_PATH + '/api/recordings',
  auth_profile_path: API_BASE_PATH + '/api/authProfile',

  getServerUrl: function() {
    if (DEBUG_SERVER) {
      return DEBUG_SERVER;
    } else {
      return window.location.protocol + '//' + window.location.hostname + '/projudi/';
    }
  },

  getConferenceLink: function(id, date, userLink, longForm) {
    var location =  API.getServerUrl();
    var params = new URLSearchParams();

    if (id) params.append('id', id);
    if (userLink) params.append('userLink', userLink);
    if (date) params.append('time', UTILS.getTimeFromDate(date));

    var img = '<img style="padding-bottom: 5px;padding-right: 5px; vertical-align: middle;" src="/projudi/img/themes/olive/seta.png" />';
    var text = longForm ? '<strong class="normal">' + STRINGS.enterTitleLong + '</strong>' : '<em class="normal">' + STRINGS.enterTitle + '</em>';

    return '<a id="enterButton" target="_blank" href="' + location + API.api_path + '?' + params.toString() + '"> ' + img + text + '</a>';
  },

  getInviteLink: function(id, date, userLink, longForm) {
    var location =  API.getServerUrl();
    var params = new URLSearchParams();

    if (id) params.append('id', id);
    if (userLink) params.append('userLink', userLink);
    if (date) {
      params.append('date', UTILS.getFormattedDate(date));
      params.append('time', UTILS.getTimeFromDate(date));
    }

    var img = '<img style="padding-bottom: 5px;padding-right: 5px; vertical-align: middle;" src="/projudi/img/themes/olive/seta.png" />';
    var text = longForm ? '<strong class="normal">' + STRINGS.guestTitleLong + '</strong>' : '<em class="normal">' + STRINGS.guestTitle + '</em>';

    return '<a id="inviteButton" target="_blank" href="' + location + API.guest_path + '?' + params.toString() + '"> ' + img + text + '</a>';
  },

  getRecordingsProcessLink: function(processNumber, userLink) {
    var location = API.getServerUrl();
    var params = new URLSearchParams();

    if (processNumber) params.append('processNumber', processNumber);
    if (userLink) params.append('userLink', userLink);

    return location + API.recording_path + '?' + params.toString();
  },

  getAuthProfileLink: function(userLink) {
    var location = API.getServerUrl();

    return location + API.auth_profile_path;
  }

};
