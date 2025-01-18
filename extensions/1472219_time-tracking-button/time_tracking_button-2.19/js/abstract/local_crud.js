/*
	Armar metodo remove cache data cuando no hay conexión
	poner todo entre try y catch los metodos Store
*/

function cleanStoreAccountData(){
	cache.clear()
	usersStore.USERS = [];
	usersStore.ARCHIVED_USERS = [];
	//
	var userTasksUpdated = new CustomEvent('USER_TASKS_UPDATED',{ 'detail': {data:{projects:[]}} });
	document.dispatchEvent(userTasksUpdated);
	var projectsUpdated = new CustomEvent('PROJECTS_UPDATED',{ 'detail': { data:[]} });
	document.dispatchEvent(projectsUpdated);
	var usersUpdated= new CustomEvent('USER_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(usersUpdated);
	var updateEvt = new CustomEvent('CUSTOMERS_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(updateEvt);
	var updateEvt = new CustomEvent('SERVICES_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(updateEvt);

}

/*
getItemByName
clearUsersData
clearTasksData
clearProjectData

removeCachedItemByName

-- hechos --
setItem
*/
var Cache = function(){
	var _ = this;
	_.store = {};
	_.save_attempts = 0;

	this.init = function(){
		try {
			/*
			_.clear();
			_.store = {};
			*/

			if( ApiGetItemFromStore("CACHE") != null){
				_.store = JSON.parse(ApiGetItemFromStore("CACHE"));

			}else{

			}

		}catch(e){
			_.clear();
		}
	}
	this.save = function(){

		try {
			if(DEBUG_MODE){
				ApiSaveItemToStore('CACHE', JSON.stringify(_.store) );
			}

		}catch(e){

			console.log('CustomLocalStore Error:'+e, cacheKey, strdata );
			_.clear();
			_.save_attempts ++;
			if(_.save_attempts < 5 ){
				_.save();
			}else{
				_.save_attempts = 0;
				console.log('CustomLocalStore Error: Too many save attempts');
			}
		}


	}
	this.setItem = function(key,val){
		console.log("SET ITEM")
		console.log(key)
		try {
			_.store[key] = val;
			_.save();
		}catch(e){
			console.log('CustomLocalStore Error:'+e, cacheKey, strdata );
			_.clear();
		}
	}
	this.setItemWithAccountID = function(key,val){
		var account_key = currentUser.getCurrentAccount().account_id+'-'+key;
		_.setItem(account_key,val);
	}
	/* sin uso */
	this.setItemWithCache = function(key,val){
		var account_key = currentUser.getCurrentAccount().account_id+'-'+key;
		try {
			_.store[account_key] = val;
			_.store[account_key+'cachettl'] = +new Date() + 1000 * 60 * 60 * LOCAL_STORAGE_CACHE_DURATION_SHORT;
			_.save();
		}catch(e){
			console.log('CustomLocalStore Error:'+e, cacheKey, strdata );
			_.clear();
		}
	}
	this.removeItem = function(key){
		delete _.store[key];
		_.save();
	}
	this.clear = function(key){
		_.store = {};
		ApiRemoveItemFromStore('CACHE');
	}
	this.getItem = function(key){
		if(typeof( _.store[key] ) != "undefined"){
			return _.store[key] ;
		}else{
			return null;
		}
	}
	this.getItemWithAccountID = function(key){
		var account_key = currentUser.getCurrentAccount().account_id+'-'+key;
		return _.getItem(account_key);
	}
	this.getItemsByName = function(name){
		var account_name = currentUser.getCurrentAccount().account_id+'-'+name;
		var items = [];
		for(var k in _.store){
			if(k.indexOf(account_name) > -1  && k.indexOf('cachettl') == -1  ){
				items.push(_.store[k])
			}
		}
		return items;
	}
	this.removeCachedItem = function(key){
		var account_key = currentUser.getCurrentAccount().account_id+'-'+key;
		delete _.store[account_key];
		delete _.store[account_key+'cachettl'];
		_.save();
	}
	this.removeCachedItemByName = function(name){
		var account_name = currentUser.getCurrentAccount().account_id+'-'+name;
		for(var k in _.store){
			if(k.indexOf(account_name) > -1 ){
				delete _.store[k];
				delete _.store[k+'cachettl'];
			}
		}
		_.save();
	}
	this.clearUsersData = function(){
		_.removeCachedItemByName("user");
	}
	this.clearTasksData = function(){
		_.removeCachedItemByName("project_");
		_.removeCachedItemByName("task");
	}
	this.clearProjectData = function(){
		_.removeCachedItemByName("project_");
		_.removeCachedItemByName("project");
	}
	_.init();

}

var CurrentUser = function(){
	var _ = this;
	_.store;
	_.currentAccount;

	this.init = function(){
		_.tmp_store = ApiGetItemFromStore( 'USER');
		_.tmp_current_account = ApiGetItemFromStore( 'CURRENT_ACCOUNT');

		if(_.tmp_store != null){
			_.store = JSON.parse(_.tmp_store);
			loc = _.store.settings.language;
			SET_DATE_FORMAT = _.store.settings.date_format;
			SET_NUMBER_FORMAT = _.store.settings.number_format;
			SET_TIME_FORMAT = _.store.settings.time_format;
			SET_TIME_DISPLAY = _.store.settings.time_display;
		}else{
			_.store = null;
		}
		if(_.tmp_current_account != null){
			_.currentAccount = JSON.parse(_.tmp_current_account);
		}else{
			_.currentAccount = null;
		}
		_.tmp_current_account = "";
		_.tmp_store = "";

	}

	this.getCurrentAccount = function(){
		return _.currentAccount;
	}

	this.getCurrentAccountIsSuscribed = function(){
		//SUSPENDED ó SUBSCRIBED deveulve true

		//return true;

		if(typeof(currentUser.getCurrentAccount().account_status) == "undefined"){
			return true;
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("SUBSCRIBED") > -1){
			return true;
		}
	}

	this.getCurrentAccountStatus = function(){

		//return "SUBSCRIBED";
		var status = "NOT_LOGGED_IN";

		if( currentUser.getCurrentAccount() == null || typeof(currentUser.getCurrentAccount().account_status) == "undefined" ){
			return status;
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("SUBSCRIBED") > -1){
			return "SUBSCRIBED";
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("SUSPENDED") > -1){
			return "SUSPENDED";
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("CANCELED") > -1){
			return "CANCELED";
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("TRIAL") > -1){
			return "TRIAL";
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("FREE") > -1){
			return "FREE";
		}
		return status;
	}

	this.getCurrentAccountPlan = function(){
		if( currentUser.getCurrentAccount() == null || typeof(currentUser.getCurrentAccount().plan) == "undefined" || currentUser.getCurrentAccount().plan == 0){
			return "NO_PLAN";
		}
		if( currentUser.getCurrentAccount().plan == 1 || currentUser.getCurrentAccount().plan == 12 ||
				currentUser.getCurrentAccount().plan == 121 || currentUser.getCurrentAccount().plan == 10 ||
				currentUser.getCurrentAccount().plan == 120
			){
			return "PRO_PLAN";
		}
		if( currentUser.getCurrentAccount().plan == 100 || currentUser.getCurrentAccount().plan == 1200){
			return "BUSINESS_PLAN";
		}
	}

	this.updateAccountStatus = function(STATUS){
		_.getCurrentAccount().account_status = STATUS;
		_.save();
	}

	this.getSubscriptionStatus = function(){

		if(currentUser.getCurrentAccount().account_status.indexOf("CARD_EXPIRED") > -1 ){
				return "CARD_EXPIRED";
		}
		if(currentUser.getCurrentAccount().account_status.indexOf("UNPAID") > -1 ){
				return "UNPAID";
		}
		return "OK";
	}

	this.returnCurrentAccount = function(id){

		if( _.get() != null && typeof( _.get().teams)!= "undefined" ){
			for(var i = 0 ; i < _.get().teams.length ; i++){
				if( _.get().teams[i].is_selected == true){
					return _.get().teams[i];
				}
			};
			//si no hay uno selected voy al default
			for(var i = 0 ; i < _.get().teams.length ; i++){
				if( _.get().teams[i].is_default == true){
					return _.get().teams[i];
				}
			};
			//si no hay ni selected ni default, voy al primero
			return _.get().teams[0];
		}
		return null;
	}

	this.getTeams= function(){
		return _.get().teams;
	}

	this.get = function(){
		if(typeof(_.store) != "undefined"){
			return _.store;
		}else{
			return null;
		}
	}

	this.set = function(user_data){
		_.store = user_data;
		_.currentAccount = _.returnCurrentAccount();
		loc = user_data.settings.language;
		SET_DATE_FORMAT = user_data.settings.date_format;
		SET_NUMBER_FORMAT = user_data.settings.number_format;
		SET_TIME_FORMAT = user_data.settings.time_format;
		SET_TIME_DISPLAY = user_data.settings.time_display;

		try{
			_.store.json = JSON.parse(user_data.json);
		}catch(err){
			_.store.json = {}
		}
		//Salvo cookie para login en extension
		try{
			setCookie( "token" , _.get().token , 10);
		}catch(err){

		}

		_.save();
	}

	this.save = function(){
		ApiSaveItemToStore("loc",_.store.settings.language);
		//if( ApiGetItemFromStore("remember_me") == "true" ){
			ApiSaveItemToStore( 'USER', JSON.stringify(_.store) );
			ApiSaveItemToStore( 'CURRENT_ACCOUNT', JSON.stringify( _.currentAccount ) );
			ApiSaveItemToStore("autologin","true");
		/*}else{
			ApiRemoveItemFromStore('USER');
			ApiSaveItemToStore("autologin","false");
		}*/
	}

	this.swicthTeam = function(id){

		var found = false;
		if( _.get() != null && typeof( _.get().teams)!= "undefined" ){
			for(var i = 0 ; i < _.get().teams.length ; i++){
				if( _.get().teams[i].account_id == id){
					_.currentAccount = _.get().teams[i];
					found = true;
				}
			};
		}
		if( found ){
			_.save();
		}else{
			//YOU DON'T BELONG TO THIS ACCOUNT.
		}
		broadcast( 'ON_SWITCH_ACCOUNT' , {});
	}

	this.getMomentHHMM = function(){
		if(SET_TIME_FORMAT == "AMPM"){
			return "hh:mmA";
		}else{
			return "HH:mm";
		}
	}

	this.getMomentHHMMss = function(){
		if(SET_TIME_FORMAT == "AMPM"){
			return "hh:mm:ss A";
		}else{
			return "HH:mm:ss";
		}
	}

	this.clear = function(){
		_.store = "";
		ApiRemoveItemFromStore('USER');
		ApiRemoveItemFromStore('CURRENT_ACCOUNT');
		if(DEBUG_MODE){
			//alert("BORRANDO USER PORK SE DISPARO CLEAR");
		}
	}

	this.getJSONPreference = function(pref){
		//PREFERENCE RETURN TRUE BY DEFAULT
		if(_.store.json != "null" && _.store.json != null && typeof(_.store.json[pref]) != "undefined" && _.store.json[pref] != null){
			return _.store.json[pref];
		}else{
			return true;
		}
	}

	this.clearCurrentTeam = function(){
		ApiRemoveItemFromStore('CURRENT_ACCOUNT');
	}

	this.isNewFree = function(){

		if( _.getCurrentAccountStatus() == "FREE" && _.getCurrentAccount().account_id >= NUFREE){
			return true;
		}else{
			return false;
		}
	}

	this.isCoworker = function(){
		if(_.getCurrentAccount().role != "CO_WORKER" ){
			return false;
		}else{
			return true;
		}
	}

	this.isProjectManager = function(){
		if(_.getCurrentAccount().role != "PROJECT_MANAGER" ){
			return false;
		}else{
			return true;
		}
	}

	this.isAdmin = function(){
		if(_.getCurrentAccount().role != "ADMIN" ){
			return false;
		}else{
			return true;
		}
	}

	this.canEditTimeEntries = function(){
		if(_.isCoworker() && !_.getCurrentAccount().permissions.can_edit_time_entries){
			return false;
		}else{
			return true;
		}
	}


	this.canEditProjects = function(){
		if(_.isCoworker() && !_.getCurrentAccount().permissions.can_edit_projects ){
			return false;
		}else{
			return true;
		}
	}
	this.canEditTasks = function(){
		if(_.isCoworker() && !_.getCurrentAccount().permissions.can_edit_tasks ){
			return false;
		}else{
			return true;
		}
	}

	this.canViewOthers = function(){
		if (_.isCoworker()) {
		//if(_.isCoworker() && !_.getCurrentAccount().permissions.can_view_others){
			return false;
		}else{
			return true;
		}
	}

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
	}

	this.hasTrayInstalled = function(){
		if(typeof(_.get().metadata)!= "undefined" &&  _.get().metadata != null && typeof(_.get().metadata.tray_last_seen_at)!= "undefined" ){
			return appIsInstalled(_.get().metadata.tray_last_seen_at);
		}

	}
	this.returnPayUrl = function(source){
		if(typeof(source) == "undefined"){

			try{
				 var hash = document.location.hash.split("/")[1];
			}catch(err){
				var hash = "hash_not_found";
			}
		}else{
			var hash = source;
		}
		var url = PRODUCTION_DOMAIN+"pages/plans.html?a_token="+_.getCurrentAccount().account_token+"&u_token="+_.get().token+"&utm_source="+hash;
		return url;

	}
	this.returnLocalPayUrl = function(){
		var url = "#/subscribe";
		return url;
	}
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


	this.updateAppStatus = function(data, params){
		for(var i in _.get().apps){
			if(_.get().apps[i].key == data.data.key){
				_.get().apps[i] = data.data
			}
		}
		broadcast( 'ON_UPDATE_APP_STATUS' , {data:data.data});
	}

	this.hasAppEnabled = function(key){
		for(var i in _.get().apps){
			if(_.get().apps[i].key == key){
				if(_.get().apps[i].status == "on"){
					return true;
				}else{
					return false;
				}
			}
		}
	}

	this.init();

}

var broadcast =  function(evt , data){
		var custom_evt = new CustomEvent(evt,{ 'detail': data });
		document.dispatchEvent(custom_evt);
	}

var returnProjectId = function(project_id){
	if(project_id == null){
		return "0";
	}else{
		return project_id;
	}
}

var ProjectsStore = function(){
	var _ = this;
	this.add = function(data,params){

		broadcast( 'PROJECT_ADDED' , {'data':data , 'params':params } );
		cache.removeCachedItem('user_tasks_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_filtered_' + currentUser.get().id);

		var projects = cache.getItemWithAccountID("projects");

		if(projects != null){
			projects.data.push(data.data);
			cache.setItemWithAccountID("projects" , projects);
			broadcast( 'PROJECTS_UPDATED' , {'data':projects , 'params':params }  );
		};

	}

	this.update = function(data,params){

		cache.removeCachedItem('project_' + data.data.id);
		cache.removeCachedItem('user_tasks_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_filtered_' + currentUser.get().id);

		var project_id = data.data.id;

		if(data.data.is_archived == false){
			var projects = cache.getItemWithAccountID("projects");

			if(projects != null){

				for(var k in projects.data){
					if(projects.data[k].id == data.data.id){
						replaceProjectObjectNoTasks(projects.data[k],data.data)
					}
				}
				cache.setItemWithAccountID("projects" , projects);
				broadcast( 'PROJECTS_UPDATED' , {'data':projects , 'params':params } );
			};
			broadcast( 'PROJECT_UPDATED' , {'data':data , 'params':params });


		}else{
			var archived_projects = cache.getItemWithAccountID("archived-projects");

			if(archived_projects != null){

				for(var k in archived_projects.data){
					if(archived_projects.data[k].id == data.data.id){
						replaceProjectObjectNoTasks(archived_projects.data[k],data.data)
					}
				}
				cache.setItemWithAccountID("archived-projects" , archived_projects);
				broadcast( 'ARCHIVED_PROJECTS_UPDATED' , {'data':archived_projects , 'params':params } );
			};
			broadcast( 'PROJECT_UPDATED' , {'data':data , 'params':params });

		}
		
		for(var y in cache.store){
			  // if(y.indexOf("task_") == 0 && y.indexOf("cachettl") == -1){
				if(y.indexOf("task_") != -1 && y.indexOf("cachettl") == -1){
				 if(cache.store[y].data.project_id ==  project_id){
					 var key = y.split(currentUser.getCurrentAccount().account_id+'-');
 			     cache.removeCachedItem(typeof key[1] != 'undefined' ? key[1] : key[0]);
				 }
			  }
	    }

		// Cleans task under this project




	}

	this.updateDurations = function(data){

		var projects = cache.getItemWithAccountID("projects");
		var projects_in_duration = [];
		var projects_in_store = []
		try{
			if(projects != null ){
				for(var k in data.data){
					projects_in_duration.push(data.data[k].id);

					for(var y in projects.data){
						if(projects.data[y].id == data.data[k].id){
								projects.data[y].loc_worked_hours = data.data[k].loc_worked_hours;
								projects.data[y].worked_hours = Math.round(data.data[k].accumulated_time/60/60*100)/100;
								projects.data[y].accumulated_time = data.data[k].accumulated_time;
								cache.removeCachedItem('project_'+projects.data[y].id);
						}
					}
				}
				cache.setItemWithAccountID("projects" , projects);
			};
			// validate diffrence
			for(var x in projects.data){
				projects_in_store.push(projects.data[x].id);
			}

			_.compare(projects_in_duration,projects_in_store)


		}catch(err){
			trackJavaScriptError(err);
		}

	}

	this.compare = function(projects_in_duration,projects_in_store){
		var discrepancy = false;


		for(var k in projects_in_duration){
			if(projects_in_store.indexOf(projects_in_duration[k]) == -1){
				discrepancy = true
			}
		}
		for(var q in projects_in_duration){
			if(projects_in_duration.indexOf(projects_in_store[q]) == -1){
				discrepancy = true
			}
		}

		if(discrepancy == true){
			cache.clearTasksData();
			cache.clearProjectData();
		}

		console.log("Discrepancy between cache and online: "+discrepancy);
	}



	this.open = function(data,params){

		cache.removeCachedItem('project_' + data.data.id);
		cache.removeCachedItem('user_tasks_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_filtered_' + currentUser.get().id);

		var projects = cache.getItemWithAccountID("projects");

		broadcast( 'PROJECT_OPENED' , {'data':data , 'params':params });

		if(projects != null){
			projects.data.push(data.data);
			cache.setItemWithAccountID("projects" , projects);
			broadcast( 'PROJECTS_UPDATED' , {'data':projects , 'params':params } );
		};

		//
		var archivedprojects = cache.getItemWithAccountID("archived-projects");

		if(archivedprojects != null){

			for(var k in archivedprojects.data){
				if(archivedprojects.data[k].id == data.data.id){
					var arch_pos = k;
				}
			}
			archivedprojects.data.splice(arch_pos,1);

			cache.setItemWithAccountID("archived-projects" , archivedprojects);
			cache.removeCachedItemByName("user_trackables");
			broadcast( 'ARCHIVED_PROJECTS_UPDATED' , {'data':archivedprojects , 'params':params } );
		};






	}

	this.close = function(data,params){

		cache.removeCachedItem('project_' + data.data.id);
		cache.removeCachedItem('user_tasks_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_filtered_' + currentUser.get().id);

		broadcast( 'PROJECT_CLOSED' , {'data':data , 'params':params });
		//
		var archivedprojects = cache.getItemWithAccountID("archived-projects");

		if(archivedprojects != null){
			archivedprojects.data.push(data.data);
			cache.setItemWithAccountID("archived-projects" , archivedprojects);
			broadcast( 'ARCHIVED_PROJECTS_UPDATED' , {'data':archivedprojects , 'params':params } );
		};

		//

		var projects = cache.getItemWithAccountID("projects");

		if(projects != null){

			for(var k in projects.data){
				if(projects.data[k].id == data.data.id){
					var arch_pos = k;
				}
			}
			projects.data.splice(arch_pos,1);

			cache.setItemWithAccountID("projects" , projects);
			cache.removeCachedItemByName("user_trackables");

			try {
				var note = JSON.parse(projects.response.note);
				note.has_archived_projects = true;
				projects.response.note = JSON.stringify(note);
			} catch (e) {}

			broadcast( 'PROJECTS_UPDATED' , {'data':projects , 'params':params } );
		};


	}

	this.remove = function(data,params){

		broadcast( 'PROJECT_DELETED' , {'data':data , 'params':params });

		cache.removeCachedItem('project_' + params.project_id);
		cache.removeCachedItem('user_tasks_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_' + currentUser.get().id);
		cache.removeCachedItemByName('user_trackables_filtered_' + currentUser.get().id);

		var projects = cache.getItemWithAccountID("projects");

		var pos = -1;

		if (projects != null) {
		  for (var k in projects.data) {
		    if (projects.data[k].id == params.project_id) {
		      pos = k;
		    }
		  }
		  if (pos > -1) {
		    projects.data.splice(pos, 1);

		    cache.setItemWithAccountID("projects", projects);
		    broadcast('PROJECTS_UPDATED', { 'data': projects, 'params': params });
		    return false;
		  }
		}

		var archived_projects = cache.getItemWithAccountID("archived-projects");

		if (archived_projects != null) {

		  for (var k in archived_projects.data) {
		    if (archived_projects.data[k].id == params.project_id) {
		      pos = k;
		    }
		  }

		  if (pos > -1) {
		    archived_projects.data.splice(pos, 1);

		    cache.setItemWithAccountID("archived-projects", archived_projects);
		    broadcast('ARCHIVED_PROJECTS_UPDATED', { 'data': archived_projects, 'params': params });
		  }
		}


	}

	this.follow = function(data,params){

		broadcast( 'PROJECT_FOLLOWED' , {'data':data , 'params':params });
		cache.removeCachedItem('project_'+data.data.id);

		var projects = cache.getItemWithAccountID("projects");
		if(projects != null){

			for(var k in projects.data){
				if(projects.data[k].id == data.data.id){

					replaceProjectObjectNoTasks(projects.data[k],data.data)
				}
			}
			cache.setItemWithAccountID("projects" , projects);
			cache.removeCachedItemByName("user_trackables");
			broadcast( 'PROJECTS_UPDATED' , {'data':projects , 'params':params } );
		};



	}

	this.unfollow = function(data,params){

		broadcast( 'PROJECT_UNFOLLOWED' , {'data':data , 'params':params });

		cache.removeCachedItem('project_'+data.data.id);
		var projects = cache.getItemWithAccountID("projects");
		if(projects != null){

			for(var k in projects.data){
				if(projects.data[k].id == data.data.id){

					replaceProjectObjectNoTasks(projects.data[k],data.data)
				}
			}
			cache.setItemWithAccountID("projects" , projects);
			cache.removeCachedItemByName("user_trackables");
			broadcast( 'PROJECTS_UPDATED' , {'data':projects , 'params':params } );
		};



	}

	this.checkIfExists = function(project_id){

		var projects = cache.getItemWithAccountID("projects");
		var found = false;
		if(projects != null){

			for(var k in projects.data){
				if(projects.data[k].id == returnProjectId(project_id) ){
					found = true;
				}
			}

		};
		if(!found){
			cache.removeCachedItem("projects");
			broadcast( 'PROJECTS_UPDATED' , {} );
		}
	}

	this.merge = function(data,params){
		projectsStore.update(data, params);
		projectsStore.remove(data, params);
		broadcast( 'PROJECT_MERGED' , {'data':data , 'params':params });
	}

	this.clearCache = function(){
		cache.removeCachedItemByName('user_tasks_');
		cache.removeCachedItemByName("user_trackables");
		cache.clearTasksData();
		cache.clearProjectData();
	}
}

var TasksStore = function(){

	this.add = function(data,params){

		try{
			cache.setItemWithCache("task_"+data.data.id , data );
			var this_project = cache.getItemWithAccountID('project_'+returnProjectId(data.data.project_id));

			if(this_project!= null){
			    if(data.data.list_id != null){
				    for(var k in this_project.data.task_lists){
						if(this_project.data.task_lists[k].id == data.data.list_id){
							this_project.data.task_lists[k].tasks.push(data.data);
						}
					}
			    }else{
				    this_project.data.tasks.push(data.data);
			    }
					this_project.data.active_tasks++;
					cache.setItemWithCache( 'project_'+returnProjectId(data.data.project_id) , this_project );
			}
		}catch(err){
			cache.removeCachedItem("task_"+data.data.id);
			cache.removeCachedItem("project_"+returnProjectId(data.data.project_id));
		}

		try {
		  if (data.data.project_id == null) {
		    var projects = cache.getItemWithAccountID("projects");
		    if (projects != null) {
		      var note = JSON.parse(projects.response.note);
		      note.has_tasks_with_no_project = true;
		      projects.response.note = JSON.stringify(note);
					cache.setItemWithAccountID("projects" , projects);
		    }
		  }
		} catch (err) {}

		projectsStore.checkIfExists(data.data.project_id);
		cache.removeCachedItemByName("user_tasks");
		cache.removeCachedItemByName("user_trackables");

		broadcast( 'TASK_ADDED' , {'data':data , 'params':params });
	}

	this.update = function(data,params){

		cache.removeCachedItem("task_"+data.data.id);
		cache.removeCachedItem("project_"+returnProjectId(data.data.project_id));
		cache.removeCachedItemByName("user_tasks");
		cache.removeCachedItemByName("user_trackables");

		try {
			if (data.data.project_id == null) {
				var projects = cache.getItemWithAccountID("projects");
				if (projects != null) {
					var note = JSON.parse(projects.response.note);
					note.has_tasks_with_no_project = true;
					projects.response.note = JSON.stringify(note);
					cache.setItemWithAccountID("projects" , projects);
				}
			}
		} catch (err) {}

		broadcast( 'TASK_EDITED' , {'data':data , 'params':params });

	}

	this.updatePriority = function(data,params){
		try{

			cache.removeCachedItem("task_"+params.data.task_id);
			cache.removeCachedItemByName("user_tasks");
			cache.removeCachedItemByName("user_trackables");

		}catch(err){
			trackJavaScriptError(err);
		}
		//pendiente
	}

	this.close = function(data,params){
		cache.removeCachedItem("task_"+data.data.id);
		cache.removeCachedItemByName("user_tasks");
		cache.removeCachedItemByName("user_trackables");
		cache.removeCachedItem("project_"+returnProjectId(data.data.project_id));

		broadcast( 'TASK_EDITED' , {'data':data , 'params':params });
		broadcast( 'USER_TASKS_UPDATED' , {'data':data , 'params':params });

	}

	this.open = function(data,params){
		cache.removeCachedItem("task_"+data.data.id);
		cache.removeCachedItemByName("user_tasks");
		cache.removeCachedItemByName("user_trackables");
		cache.removeCachedItem("project_"+returnProjectId(data.data.project_id));

		broadcast( 'TASK_OPENED' , {'data':data , 'params':params });
	}

	this.remove = function(data,params){

		if(typeof(params.project_id) != "undefiend" && params.project_id == ""){
			params.project_id = "0";
		}

		cache.removeCachedItem("task_"+params.task_id);
		cache.removeCachedItem("project_"+params.project_id);

		cache.removeCachedItemByName("user_tasks");
		cache.removeCachedItemByName("user_trackables");


		broadcast( 'TASK_REMOVED' , {'data':data , 'params' : params });
	}

	this.changeList = function(data,params){
		cache.removeCachedItem("task_"+data.data.id);
		cache.removeCachedItem("project_"+returnProjectId(data.data.project_id));
		broadcast( 'TASK_CHANGED_LIST' , {'data':data , 'params':params });
	}

	this.order = function(data,params){
		cache.removeCachedItem("project_"+params.project_id);
		broadcast( 'TASKS_ORDERED' , {'data':data , 'params':params });
	}

}

var TasklistsStore = function(){

	this.add = function(data,params){

		var this_project = cache.getItemWithAccountID('project_'+params.project_id);

		if(this_project!= null){
			this_project.data.task_lists.push(data.data);
			cache.setItemWithAccountID( 'project_'+params.project_id , this_project );
		}

		broadcast( 'TASK_LIST_ADDED' , {'data':data , 'params':params });
	}

	this.update = function(data,params){
		var this_project = cache.getItemWithAccountID('project_'+params.project_id);

		if(this_project!= null){
			for(var k in this_project.data.task_lists){
				if(this_project.data.task_lists[k].id == data.data.id){
					this_project.data.task_lists[k].name = data.data.name;
					this_project.data.task_lists[k].list_position = data.data.list_position;
				}
			}
			cache.setItemWithAccountID( 'project_'+params.project_id , this_project );
		}

		broadcast( 'TASK_LIST_UPDATED' , {'data':data , 'params':params });
	}

	this.remove = function(data,params){

		var this_project = cache.getItemWithAccountID('project_'+params.project_id);

		if(this_project!= null){
			for(var k in this_project.data.task_lists){
				if(this_project.data.task_lists[k].id == params.task_list_id){
					var t_l_pos = k;
				}
			}
			this_project.data.task_lists.splice(t_l_pos,1);
			cache.setItemWithAccountID( 'project_'+params.project_id , this_project );
		}

		broadcast( 'TASK_LIST_DELETED' , {'data':data , 'params':params });
	}

	this.order = function(data,params){
		cache.removeCachedItem("project_"+params.project_id);
		broadcast( 'TASK_LIST_ORDERED' , {'data':data , 'params':params });
	}

	this.close = function(data,params){
		alert("CLOSE TASK LIST")
		var this_project = cache.getItemWithAccountID('project_'+params.project_id);

		if(this_project!= null){
			for(var k in this_project.data.task_lists){
				if(this_project.data.task_lists[k].id == params.task_list_id){
					this_project.data.task_lists[k].is_archived = true;
					for(var h in this_project.data.task_lists[k].tasks ){
					  this_project.data.task_lists[k].tasks[h].is_archived = true;
					  tasksStore.close({data:this_project.data.task_lists[k].tasks[h]},{task_id:this_project.data.task_lists[k].tasks[h].id})
					}
				}
			}
			cache.setItemWithAccountID( 'project_'+params.project_id , this_project );
		}

		broadcast( 'TASK_LIST_CLOSED' , {'data':data , 'params':params });
	}
	this.open = function(data,params){
		alert("OPEN  TASK LIST")
		var this_project = cache.getItemWithAccountID('project_'+params.project_id);

		if(this_project!= null){
			for(var k in this_project.data.task_lists){
				if(this_project.data.task_lists[k].id == params.task_list_id){
					this_project.data.task_lists[k].is_archived = false;
				}
			}
			cache.setItemWithAccountID( 'project_'+params.project_id , this_project );
		}

		broadcast( 'TASK_LIST_OPENED' , {'data':data , 'params':params });
	}
}

var CustomersStore = function(){

	this.add = function(data,params){
		var customers = cache.getItemWithAccountID("customers");

		if(customers != null){
			customers.data.push(data.data);
			cache.setItemWithAccountID("customers" , customers);
		};

		broadcast( 'CUSTOMERS_ADDED' , {'data':data , 'params':params });
	}

	this.update = function(data,params){
		cache.removeCachedItem("customers");
		broadcast( 'CUSTOMERS_UPDATED' , {'data':data , 'params':params });
	}

	this.remove = function(data,params){
		cache.removeCachedItem("customers");
		broadcast( 'CUSTOMERS_UPDATED' , {'data':data , 'params':params });
	}
}

var ServicesStore = function(){

	this.add = function(data,params){
		var services = cache.getItemWithAccountID("services");

		if(services != null){
			services.data.push(data.data);
			cache.setItemWithAccountID("services" , services);
		};
		broadcast( 'SERVICES_ADDED' , {'data':data , 'params':params });
	}

	this.update = function(data,params){
		cache.removeCachedItem("services");
		broadcast( 'SERVICES_UPDATED' , {'data':data , 'params':params });
	}

	this.remove = function(data,params){
		cache.removeCachedItem("services");
		broadcast( 'SERVICES_UPDATED' , {'data':data , 'params':params });
	}
}

var SubtasksStore = function(){

	this.add = function(data,params){
		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				task.data.subtasks.push(data.data)
		}

		//cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'SUBTASK_ADDED' , {'data':data , 'params':params });
	}

	this.remove = function(data,params){
		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				for(var k in task.data.subtasks){
					if(task.data.subtasks[k].id == params.data.subtask_id){
						task.data.subtasks.splice(k,1);
					}
				}
		}
		//cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'SUBTASK_DELETED' , {'data':data , 'params':params });
	}


	this.open = function(data,params){
		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				for(var k in task.data.subtasks){
					if(task.data.subtasks[k].id == data.data.id){
						replaceObject( task.data.subtasks[k]  ,  data.data )
					}
				}
		}
		//cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'SUBTASK_OPENED' , {'data':data , 'params':params });
	}

	this.close = function(data,params){
		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				for(var k in task.data.subtasks){
					if(task.data.subtasks[k].id == data.data.id){
						replaceObject( task.data.subtasks[k]  ,  data.data )
					}
				}
		}
		//cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'SUBTASK_CLOSED' , {'data':data , 'params':params });
	}

	this.update = function(data,params){
		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				for(var k in task.data.subtasks){
					if(task.data.subtasks[k].id == data.data.id){
						replaceObject( task.data.subtasks[k]  ,  data.data )
					}
				}
		}

		//cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'SUBTASK_UPDATED' , {'data':data , 'params':params });
	}

	this.sort = function(data,params){
		cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'SUBTASK_SORTED' , {'data':data , 'params':params });
	}
}

var CommentsStore = function(){

	this.add = function(data,params){

		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				task.data.comments.push(data.data)
		}

		cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'COMMENT_ADDED' , {'data':data , 'params':params });
	}

	this.remove = function(data,params){

		var task = cache.getItemWithAccountID("task_"+params.task_id);

		if(task != null){
				for(var k in task.data.comments){
					if(task.data.comments[k].id == params.data.comment_id){
						replaceObject( task.data.subtasks[k], data.data )
					}
				}
		}

		cache.removeCachedItem("task_"+params.task_id);
		broadcast( 'COMMENT_DELETED' , {'data':data , 'params':params });
	}
}

var UsersStore = function(){

	var _ = this;
	_.USERS = [];
	_.ARCHIVED_USERS = [];

	this.add = function(data,params){
		_.setStore({data: [data.data]});
		cache.removeCachedItem("users");
		cache.removeCachedItem("all-users");
		broadcast( 'USER_ADDED' , {'data':data , 'params':params });
	}

	this.invite = function(data,params){
		_.setStore(data.data);
		cache.removeCachedItem("users");
		cache.removeCachedItem("all-users");
		broadcast( 'USERS_ADDED' , {'data':data , 'params':params });
	}

	this.close = function(data,params){
		cache.removeCachedItem("users");
		cache.removeCachedItem("all-users");
		cache.removeCachedItem("user_"+params.data.id);
		cache.removeCachedItem("archived-users");

		for(var k in _.USERS ){
			if(_.USERS[k].id == params.data.id){
				var user_pos = k;
			}
		}
		if(typeof(user_pos)!= "undefiend"){
			_.USERS.splice(user_pos,1);
		}
		broadcast( 'USER_CLOSED' , {'data':data , 'params':params });
	}

	this.open = function(data,params){
		cache.removeCachedItem("users");
		cache.removeCachedItem("archived-users");
		cache.removeCachedItem("user_"+params.data.id);


		broadcast( 'USER_OPENED' , {'data':data , 'params':params });
	}

	this.update = function(data,params){
		_.setStore({data: [data.data]});
		cache.removeCachedItem("users");
		cache.removeCachedItem("all-users");
		cache.removeCachedItem("user_"+params.user_id);
		broadcast( 'USER_UPDATED' , {'data':data , 'params':params });
	}

	this.updateSettings = function(data,params){
		try{
			currentUser.get().settings.currency = data.data.settings.currency;
			currentUser.get().settings.csv_separator = data.data.settings.csv_separator;
			cache.removeCachedItem("users");
			cache.removeCachedItem("all-users");
		}catch(err){
			trackJavaScriptError(err);
		}
	}




	this.setStore = function(data){

		for(var k in data.data){
			var found= false;
			for(var j in _.USERS){
				if( data.data[k].id == _.USERS[j].id){
					replaceObject( _.USERS[j] ,  data.data[k] )
					found = true;
				}
			}
			if(!found){
				_.USERS.push(data.data[k])
			}
		}

		broadcast( 'USER_STORE_UPDATED' , {'data':data});

	}

	this.setArchivedStore = function(data){
		_.ARCHIVED_USERS = data.data;
	}
	this.setActivedStore = function(data){
		_.USERS = data.data;
		broadcast( 'USER_STORE_UPDATED' , {'data':data});

	}
	this.getUserFromStore = function(id){

		for(var j in _.USERS){
			if( _.USERS[j].id == id){
				return _.USERS[j];
			}
		}
		for(var j in _.ARCHIVED_USERS){
			if( _.ARCHIVED_USERS[j].id == id){
				return _.ARCHIVED_USERS[j];
			}
		}

		return false;
	}

	this.getUserNameFromStore = function(id){
		var u = _.getUserFromStore(id);
		var name = u.name;
		var surname = u.surname;
		if(surname != "" && surname != " " && surname != null){
			name+= " "+surname;
		}
		return name;
	}

}

var EventsStore = function(){
	var _ = this;

	this.add = function(data,params){
		//tasks.updateTaskInfo()
		if( typeof(data.data.task_id) != "undefined" && data.data.task_id != null && data.data.task_id != "null"){
			tasks.getTaskFromServer({task_id:data.data.task_id})
		}
		_.clearEventsCache();
	}
	this.update = function(data,params){
		//tasks.updateTaskInfo()
		if( typeof(data.data.task_id) != "undefined" && data.data.task_id != null && data.data.task_id != "null"){
			tasks.getTaskFromServer({task_id:data.data.task_id})
		}
		_.clearEventsCache();

	}
	this.remove = function(data,params){
		console.log("remove")
		if(typeof(params.task_id) != "undefined" && params.task_id != null && params.task_id != "null"){
			tasks.getTaskFromServer({task_id:params.task_id})
		}

		_.clearEventsCache();
		//tasks.updateTaskInfo()
	}

	this.clearEventsCache = function(){
		cache.removeCachedItemByName("events");
	}
}

var BookmarksStore = function(){
	var _ = this;

	this.clear = function(id){
		cache.removeCachedItemByName("bookmarks");
	}

}
