var loc = "EN";
var SET_DATE_FORMAT;
var SET_NUMBER_FORMAT;
var SET_TIME_FORMAT;
var SET_TIME_DISPLAY;

var CurrentUser = function() {
  var _ = this;

  this.init = function() {
    var user = localStorage.getItem('USER');
    var current_account = localStorage.getItem('CURRENT_ACCOUNT');
    if (user != null) {
      _.store = JSON.parse(user);
      _.setFormat();
    } else {
      _.store = null;
    }
    _.currentAccount = current_account != null ? JSON.parse(current_account) : null;
  };

  this.getCurrentAccount = function() {
    return _.currentAccount;
  };

  this.getCurrentAccountIsSuscribed = function() {
    //return true;
    if (typeof _.getCurrentAccount().account_status == "undefined") {
      return true;
    }
    if (_.getCurrentAccount().account_status.indexOf("SUBSCRIBED") > -1) {
      return true;
    }
  };

  this.getCurrentAccountStatus = function() {
    //return "SUBSCRIBED";
    var status = "NOT_LOGGED_IN";
    
    if (_.getCurrentAccount() == null || typeof _.getCurrentAccount().account_status == "undefined") {
      return status;
    }
    if (_.getCurrentAccount().account_status.indexOf("SUBSCRIBED") > -1) {
      return "SUBSCRIBED";
    }
    if (_.getCurrentAccount().account_status.indexOf("SUSPENDED") > -1) {
      return "SUSPENDED";
    }
    if (_.getCurrentAccount().account_status.indexOf("CANCELED") > -1) {
      return "CANCELED";
    }
    if (_.getCurrentAccount().account_status.indexOf("TRIAL") > -1) {
      return "TRIAL";
    }
    if (_.getCurrentAccount().account_status.indexOf("FREE") > -1) {
      return "FREE";
    }
    return status;
  };
  
  this.getAccountStatus = function(team) {

    var status = "UNDEFINED";

    if (team.account_status.indexOf("SUBSCRIBED") > -1) {
      return "SUBSCRIBED";
    }
    if (team.account_status.indexOf("SUSPENDED") > -1) {
      return "SUSPENDED";
    }
    if (team.account_status.indexOf("CANCELED") > -1) {
      return "CANCELED";
    }
    if (team.account_status.indexOf("TRIAL") > -1) {
      return "TRIAL";
    }
    if (team.account_status.indexOf("FREE") > -1) {
      return "FREE";
    }

    return status;

  };
  
  this.getCurrentAccountPlan = function() {
    if (_.getCurrentAccount() == null || typeof _.getCurrentAccount().plan == "undefined" || _.getCurrentAccount().plan == 0) {
      return "NO_PLAN";
    }
    if (_.getCurrentAccount().plan == 1 || _.getCurrentAccount().plan == 12 ||
      _.getCurrentAccount().plan == 121 || _.getCurrentAccount().plan == 10 ||
      _.getCurrentAccount().plan == 120
    ) {
      return "PRO_PLAN";
    }
    if (_.getCurrentAccount().plan == 100 || _.getCurrentAccount().plan == 1200) {
      return "BUSINESS_PLAN";
    }
  };

  this.updateAccountStatus = function(STATUS) {
    _.getCurrentAccount().account_status = STATUS;
    _.save();
  };

  this.getSubscriptionStatus = function() {
    if (_.getCurrentAccount().account_status.indexOf("CARD_EXPIRED") > -1) {
      return "CARD_EXPIRED";
    }
    if (_.getCurrentAccount().account_status.indexOf("UNPAID") > -1) {
      return "UNPAID";
    }
    return "OK";
  };

  this.returnCurrentAccount = function(id) {
    if (_.get() != null && typeof _.get().teams != "undefined") {
      for (var i = 0; i < _.get().teams.length; i++) {
        if (_.get().teams[i].is_selected == true) {
          return _.get().teams[i];
        }
      }
      //si no hay uno selected voy al default
      for (var j = 0; j < _.get().teams.length; j++) {
        if (_.get().teams[j].is_default == true) {
          return _.get().teams[j];
        }
      }
      //si no hay ni selected ni default, voy al primero
      return _.get().teams[0];
    }
    return null;
  };

  this.getTeams = function() {
    return _.get().teams;
  };
  
  this.getActiveTeams = function() {

    var activeTeams = [];
    
    for (let i = 0; i < _.get().teams.length; i++) {
      const team = _.get().teams[i];
      const status = _.getAccountStatus(team) != 'UNDEFINED' ? _.getAccountStatus(team) : false;
      if (status && status.indexOf('FREE') == 0 || status === 'TRIAL' || status === 'SUBSCRIBED') {
        activeTeams.push(team);
      }
    }

    return activeTeams;

  };

  this.get = function() {
    return typeof _.store != "undefined" ? _.store : null;
  };

  this.set = function(user_data) {
    _.store = user_data;
    _.currentAccount = _.returnCurrentAccount();
    _.setFormat();
    try {
      _.store.json = JSON.parse(user_data.json);
    } catch (err) {
      _.store.json = {};
    }
    
    //Salvo cookie para login en extension
    try {
      setCookie("token", _.get().token, 10);
    } catch (err) {}
    
    _.save();
    broadcast('ON_USER_UPDATED', {});
  };
  
  this.setFormat = function() {
    loc = _.store.settings.language;
    SET_DATE_FORMAT = _.store.settings.date_format;
    SET_NUMBER_FORMAT = _.store.settings.number_format;
    SET_TIME_FORMAT = _.store.settings.time_format;
    SET_TIME_DISPLAY = _.store.settings.time_display;
  };
  
  this.setApps = function(apps) {
    if (_.get() == null || typeof app == "undefined") {
      return false;
    }
    _.store.apps = apps;
    _.save();
  };
  
  this.setApp = function(app) {
    if (_.get() == null || typeof app == "undefined") {
      return false;
    }
    _.store.apps = _.store.apps.filter(function(a){ return a.key != app.key; });
    _.store.apps.push(app);
    _.save();
    broadcast('ON_APP_UPDATED', app.key);
  };
  
  this.save = function() {
    localStorage.setItem("loc", _.store.settings.language);
    localStorage.setItem('USER', JSON.stringify(_.store));
    localStorage.setItem('CURRENT_ACCOUNT', JSON.stringify(_.currentAccount));
    localStorage.setItem("autologin", "true");
  };

  this.swicthTeam = function(id) {
    var found = false;
    if (_.get() != null && typeof _.get().teams != "undefined") {
      for (var i = 0; i < _.get().teams.length; i++) {
        if (_.get().teams[i].account_id == id) {
          _.currentAccount = _.get().teams[i];
          found = true;
        }
      }
    }
    if (found) {
      _.save();
    } else {
      //YOU DON'T BELONG TO THIS ACCOUNT.
    }
    broadcast('ON_SWITCH_ACCOUNT', {});
  };

  this.getMomentHHMM = function() {
    return SET_TIME_FORMAT == "AMPM" ? "hh:mmA" : "HH:mm";
  };

  this.getMomentHHMMss = function() {
    return SET_TIME_FORMAT == "AMPM" ? "hh:mm:ss A" : "HH:mm:ss";
  };

  this.clear = function() {
    _.store = null;
    _.currentAccount = null;
    localStorage.removeItem('USER');
    localStorage.removeItem('CURRENT_ACCOUNT');
  };

  this.getJSONPreference = function(pref) {
    //PREFERENCE RETURN TRUE BY DEFAULT
    return _.store.json != "null" && _.store.json != null && typeof _.store.json[pref] != "undefined" && _.store.json[pref] != null ? _.store.json[pref] : true;
  };

  this.clearCurrentTeam = function() {
    _.currentAccount = null;
    localStorage.removeItem('CURRENT_ACCOUNT');
  };

  this.isNewFree = function() {
    if (_.getCurrentAccountStatus() == "FREE" && _.getCurrentAccount().account_id >= NUFREE) {
      return true;
    } else {
      return false;
    }
  };

  this.isCoworker = function() {
    if (_.getCurrentAccount().role != "CO_WORKER") {
      return false;
    } else {
      return true;
    }
  };

  this.isProjectManager = function() {
    if (_.getCurrentAccount().role != "PROJECT_MANAGER") {
      return false;
    } else {
      return true;
    }
  };

  this.isAdmin = function() {
    if (_.getCurrentAccount().role != "ADMIN") {
      return false;
    } else {
      return true;
    }
  };

  this.canEditTimeEntries = function() {
    if (_.isCoworker() && !_.getCurrentAccount().permissions.can_edit_time_entries) {
      return false;
    } else {
      return true;
    }
  };
  
  this.canEditProjects = function() {
    if (_.isCoworker() && !_.getCurrentAccount().permissions.can_edit_projects) {
      return false;
    } else {
      return true;
    }
  };
  
  this.canEditTasks = function() {
    if (_.isCoworker() && !_.getCurrentAccount().permissions.can_edit_tasks) {
      return false;
    } else {
      return true;
    }
  };

  this.canViewOthers = function() {
    if (_.isCoworker()) {
      //if(_.isCoworker() && !_.getCurrentAccount().permissions.can_view_others){
      return false;
    } else {
      return true;
    }
  };

  this.projectMustHaveAService = function() {
    return _.policyApplies('service_required');
  };

  this.projectMustHaveACustomer = function() {
    return _.policyApplies('customer_required');
  };

  this.taskMustHaveAProject = function() {
    return _.policyApplies('project_required');
  };

  this.timeEntryMustHaveATask = function() {
    return _.policyApplies('task_required');
  };

  this.timeEntryMustHaveANote = function() {
    return _.policyApplies('notes_required');
  };

  this.preventTrackingOvertime = function() {
    return _.policyApplies('allow_tracking_overtime');
  };

  this.preventTrackingTreshold = function() {
    var threshold = _.policyApplies('allow_tracking_days_threshold');
    return threshold != null ? threshold : false;
  };

  this.policyApplies = function(policy) {
    var policies = false;
    for (var i in _.get().apps) {
      if (_.get().apps[i].key == 'policies' && _.get().apps[i].status == 'on') {
        policies = _.get().apps[i].settings != null ? _.get().apps[i].settings : false;
      }
    }

    if (!policies) {
      return false;
    }

    if (_.isAdmin() && policies.apply_to_admins) {
      return policies[policy];
    } else
    if (_.isProjectManager() && policies.apply_to_pms) {
      return policies[policy];
    } else
    if (_.isCoworker() && policies.apply_to_coworkers) {
      return policies[policy];
    }
    return false;
  };

  this.hasTrayInstalled = function() {
    if (typeof _.get().metadata != "undefined" && _.get().metadata != null && typeof _.get().metadata.tray_last_seen_at != "undefined") {
      return appIsInstalled(_.get().metadata.tray_last_seen_at);
    }
  };
  
  this.returnPayUrl = function(source) {
    var hash = "hash_not_found";
    if (typeof source == "undefined") {
      try {
        hash = document.location.hash.split("/")[1];
      } catch (err) {
      }
    } else {
      hash = source;
    }
    var url = PRODUCTION_DOMAIN + "pages/plans.html?a_token=" + _.getCurrentAccount().account_token + "&u_token=" + _.get().token + "&utm_source=" + hash;
    return url;
  };
  
  this.returnLocalPayUrl = function() {
    var url = "#/subscribe";
    return url;
  };
  
  this.getPreference = function(name) {
    var preferences = _.get().preferences;
    for (var i in preferences) {
      if (preferences[i].name == name) {
        return JSON.parse(preferences[i].data);
      }
    }
    return false;
  };

  this.savePreference = function(data) {
    var preferences = _.get().preferences;
    for (var i in preferences) {
      if (preferences[i].name == data.name) {
        preferences[i].id = data.id;
        preferences[i].data = data.data;
        return;
      }
    }
    _.get().preferences.push(data);
  };
  
  this.updateAppStatus = function(data, params) {
    for (var i in _.get().apps) {
      if (_.get().apps[i].key == data.data.key) {
        _.get().apps[i] = data.data;
      }
    }
    broadcast('ON_UPDATE_APP_STATUS', { data: data.data });
  };

  this.hasAppEnabled = function(key) {
    for (var i in _.get().apps) {
      if (_.get().apps[i].key == key) {
        if (_.get().apps[i].status == "on") {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  this.isIntegrationEnabled = function(key) {
		let app = _.get().apps.filter(a => a.key == key)[0] || false;
		if(app) {
			return app.status == 'on'
		}
		return false;
	};

  this.canCreateAnAccount = function() {
	  if (_.get() != null && typeof _.getTeams() != "undefined") {
			return _.getTeams().filter(function(team) {
	      return team.account_owner.id == _.get().id;
	    }).length == 0;
	  }
	  return false;
	};
	
	this.updateSchedule = function (data) {
		_.get().schedule = data.data;
		_.save();
		broadcast('ON_SCHEDULE_UPDATED')
	};
  
  this.isLoggedIn = function() {
    return _.get() != null && _.getCurrentAccount() != null;
  };
  
  function broadcast(evt, data) {
    var custom_evt = new CustomEvent(evt, { 'detail': data });
    document.dispatchEvent(custom_evt);
  }

  this.init();

};
