/**/
var TimeManager = function(){

	var _ = this;
	_.event_data = "";
	_.task_data = "";
	_.TRACKING = false;
	_.count = 0;
	_.start;
	_.sync_started;
	_.total_task_duration = "";
	_.formated_task_duration = "";
	_.actual_total_task_duration = "";
	_.formated_event_duration = "";
	_.event_duration = 0;
	_.is_requesting = false;


	document.addEventListener("START_TRACKING", function(e){ _.startTracking(e.detail)});
  document.addEventListener("STOP_TRACKING", function(e){ _.stopTracking()});
	document.addEventListener("CREATE_AND_START_TRACKING", function(e){ _.createAndStartTracking(e.detail)});

	document.addEventListener("EVENT_UPDATED", function(e){ _.onEventUpdated(e.detail)});
  document.addEventListener("APP_IS_VISIBLE", function(e){ _.onAppVisible()});
  document.addEventListener("TASK_EDITED", function(e){ _.onTaskEdited( e.detail )});
  document.addEventListener("TASK_REMOVED", function(e){ _.onTaskRemoved(e.detail)});

  document.addEventListener("PROJECT_UPDATED", function(e){ _.onProjectUpdated(e.detail)});
  document.addEventListener("PROJECT_DELETED", function(e){ _.onProjectDeleted(e.detail)});
	document.addEventListener("EVENT_DELETED", function(e) { _.onEventDeleted(e.detail); });

	document.addEventListener("WS_TRACK", function(e) { _.checkUpdates(e.detail); });
	document.addEventListener("WS_STOP", function(e) { _.timerStopedElsewhere(e.detail); });


	this.init = function(){
		_.checkUpdates();
		_.stopTrackingIntervals();
	}

	this.checkUpdates = function(priority){
		console.log("CHECK UPDATES");
		if(typeof(priority) == "undefined" ){
			var tracker_params ={
				    callback: _.onCheckUpdate,
				    priority : "low"
			}
			tracker.current(tracker_params);
		}else{
			var tracker_params ={
				    callback: _.onCheckUpdate,
				    priority : priority
			}
			tracker.current(tracker_params);
		}
	}

	this.onCheckUpdate = function(data){
		if(typeof(data)!= "undefined" && data.id !== false){
			_.startTrackingIntervals({data:data});
			_.resetCounter(data.id);
		}
	}

	this.timerStopedElsewhere = function(){
		this.stopTrackingIntervals();
	}




	this.createAndStartTracking = function(obj){
			if(!isOnline()){
				dispatchOfflinedError();
				return false;
			}
			_.resetCounter();
			clearRegisteredInterval('check_external_updates' );

			if(tracker.current_xhr != ""){
				try{
					tracker.current_xhr.abort();
				}
				catch(err){

				}
			}

			if(_.TRACKING == true){
				_.stopTrackingIntervals();
				//return false;
			}

			// policies
			// currentUser.timeEntryMustHaveANote();
			// currentUser.timeEntryMustHaveATask();
			if (_.validate()) {
				var is_project = !!obj.data.hasOwnProperty('project_id');
				if ((currentUser.timeEntryMustHaveANote() || currentUser.timeEntryMustHaveATask()) && is_project) {

					projects.getJustProject.min({
						project_id: obj.data.project_id,
						dispacthLoading: true,
						callback: _.openTimeEntry
					});

					return false;

				}
			}

			var tracker_params ={
				callback: _.startTrackingIntervals,
				data: obj.data
			}

			tracker.createAndTrack(tracker_params);

	}

	this.startTracking = function(id, notes, date, custom_fields) {
		
		var tracking_data = {};
		if (typeof id == 'object') {
		  tracking_data = id;
		} else {
		  tracking_data.id = id;
		  tracking_data.notes = notes;
		  tracking_data.date = date;
		  tracking_data.custom_fields = custom_fields;
		}
		
		if(_.is_requesting == true){
			return false;
		}

		_.is_requesting = true;
		setTimeout(function(){_.is_requesting = false},600)

		if(!isOnline()){
			dispatchOfflinedError();
			return false;
		}

		if( typeof(_.event_data.task_id) !== "undefined" && _.event_data.task_id == id){
			//esta tratando de trackear la misma que se esta trackeando ahora
			var evt = new CustomEvent('PREVENT_START_TRACKING',{ 'detail': {id : id } });
			document.dispatchEvent(evt);
		}else{

			if (!!id && _.validate()) {
			  _.validateStartTracking({
			    data: tracking_data,
			    onValid: _.doStartTracking,
			    onNotValid: _.openTimeEntry
			  });
			} else {
			  _.doStartTracking(tracking_data);
			}

		}
			
	};
	
	this.validateStartTracking = function(params) {
		broadcast('BEFORE_VALIDATE_START_TRACKING');
	  // policies
	  // currentUser.timeEntryMustHaveANote();
	  // currentUser.timeEntryMustHaveATask();

	  if (currentUser.timeEntryMustHaveANote() && !params.data.notes) {
	    tasks.getSingleTask({
	      task_id: params.data.id,
	      data: params,
	      dispacthLoading: true,
	      callback: params.onNotValid
	    });
	  } else
	  if ((currentUser.timeEntryMustHaveATask() || currentUser.taskMustHaveAProject())) {
	    tasks.getSingleTask({
	      task_id: params.data.id,
	      data: params,
	      dispacthLoading: true,
	      callback: validateTask
	    });
	  } else {
	    params.onValid(params.data);
	  }

	  function validateTask(data) {
	    var task = data.data;
	    var params = this.data;
	    if (currentUser.timeEntryMustHaveATask() && task.type == 'GHOST') {
	      params.onNotValid(data,params.data);
	    }else
			if (currentUser.taskMustHaveAProject() && !task.project_id) {
	      params.onNotValid(data,params.data);
	    } else {
	      params.onValid(params.data);
	    }
	  }

	};
	
	this.validate = function() {
	  if ((PLATFORM == 'WEB' || PLATFORM == 'CHROME') && (!IS_MOBILE && !IS_TRAY)) {
	    return true
	  }
	  return false;
	}
	
	this.doStartTracking = function(id, notes, date, custom_fields) {
		
		var tracking_data = {};
		if (typeof id == 'object') {
			tracking_data = id;
		} else {
			tracking_data.id = id;
			tracking_data.notes = notes;
			tracking_data.date = date;
			tracking_data.custom_fields = custom_fields;
		}
		
		_.resetCounter();
		clearRegisteredInterval('check_external_updates' );

		if (tracker.current_xhr != "") {
		  try {
		    tracker.current_xhr.abort();
		  } catch (err) { }
		}
		
		if(_.TRACKING == true){
			_.stopTrackingIntervals();
		}
		
		var tracker_params = {
		  callback: _.startTrackingIntervals,
			errorCallback: function(data, params) {
			  broadcast('START_TRACKING_ERROR', { id: params.data.id });
			},
		  data: {
		    id: tracking_data.id,
		    notes: typeof tracking_data.notes == "string" ? tracking_data.notes : '',
		    custom_fields: tracking_data.custom_fields
		  },
		  blockLoading: false
		};
		
		if (!!tracking_data.date) {
		  tracker_params.data.date = tracking_data.date;
		}

		if (!!tracking_data.service) {
		  tracker_params.data.service = tracking_data.service;
			if(!!tracking_data.project_id) {
				tracker_params.data.project_id = tracking_data.project_id;
			}
		}
		
		tracker.track(tracker_params);
		
		var evt = new CustomEvent('BEFORE_START_TRACKING',{ 'detail': {id : tracking_data.id } });
		document.dispatchEvent(evt);
	
	};

	this.openTimeEntry = function(data,params) {

		var is_project = !data.data.hasOwnProperty('project_id');
	
		if (is_project) {
			var project = data.data;
			var event = {
				task: '',
				task_id: '',
				project: project.name,
				project_id: project.id,
				customer: !!project.customer ? project.customer.name : '',
				color: project.color,
				notes: params.notes
			};
		} else {
			var task = data.data;
			var event = {
				task: task.name,
				task_id: task.type == 'GHOST' ? null : task.id,
				project: task.project,
				project_id: task.project_id,
				customer: task.customer,
				color: task.color,
				notes: params.notes
			};
		}

		broadcast('OPEN_TIME_ENTRY',event);

	};

	this.resetCounter = function(){
		_.start = new Date().getTime();

	}

	this.stopTracking = function(params){
		params == typeof params != 'undefined' ? params : {};
		if(_.is_requesting == true){
			return false;
		}
		_.is_requesting = true;
		setTimeout(function(){_.is_requesting = false},600)

		if(!isOnline()){
			dispatchOfflinedError();
			return false;
		}
			var tracker_params ={
				    data : {
					    id:_.event_data.task_id
				    },
				    account_id : _.task_data.account_id,
				    blockLoading : false,
				    callback : _.onStopped,
				    errorCallbackPreventDefault : _.onStopped
			}
			
			$.extend(tracker_params, params);
			tracker.stop( tracker_params );


	}

	this.onStopped = function(data, params){
		let id = timeManager.event_data ? timeManager.event_data.id : null
		
		if (id && timeManager.task_data.account_id == currentUser.getCurrentAccount().account_id) {
			let d = {id}
			var evt = new CustomEvent('BEFORE_STOPPED_TRACKING', { 'detail': {data: d} });
			document.dispatchEvent(evt);
		}

		_.stopTrackingIntervals();
	}

	this.startTrackingIntervals = function(data){
		registeredInterval( _.syncTime , Math.round(SYNC_TIME*SPEED) , 'sync_time' );
		registeredInterval( _.updateTaskCount , 1000 , 'update_task_count' );
		clearRegisteredInterval('check_external_updates' );
		_.event_data = returnUserTrackingEvent(data.data, currentUser.get().id );
		_.task_data = data.data;
		_.TRACKING = true;
		setTimeout(_.syncTime,1000); // sacar cuando haya sync desde el server
		/* poner cuando haya sync desde el server
		_.sync_started = new Date().getTime();
		_.updateTaskCountFromServer(data);
		*/
		_.broadCastViewUpdate();
	}

	this.stopTrackingIntervals = function(){
		registeredInterval( _.checkUpdates , Math.round(CHECK_EXTERNAL_UPDATES*SPEED)  , 'check_external_updates' );
		clearRegisteredInterval('update_task_count' );
		clearRegisteredInterval('sync_time' );


		_.event_data = "";
		_.task_data = "";
		_.formated_task_duration = "";
		_.total_task_duration = "";
		_.actual_total_task_duration="";
		_.formated_event_duration ="";
		_.event_duration = 0;
		_.TRACKING = false;
		_.count = 0;
		_.start = "";

		_.broadCastViewUpdate();
	}

	this.syncTime = function(){
		console.log("SYNC");
		var tracker_params ={
					callback : _.updateTaskCountFromServer,
				    data : {
					    id : _.event_data.task_id,
						evt_id : _.event_data.id
				    },
				    account_id : _.task_data.account_id,
				    blockLoading : false,
				    errorCallbackPreventDefault : _.manageSyncError
			}
		_.sync_started = new Date().getTime();
		tracker.sync(tracker_params);
	}

	this.getTaskTime = function(){
		//tasks.getSingleTask( _.event_data.task_id , _.updateTaskCountFromServer );
	}

	this.onTaskEdited = function(detail){
	   if( _.event_data !== ""){
	   		if(detail.data.data.id == _.task_data.id){
		   		replaceProjectObjectNoTasks(_.task_data , detail.data.data);
		   		_.broadCastViewUpdate();
	   		}

	   }
   }

  this.onTaskRemoved = function(data){
		//var task = getTaskFromStore(id);
		if(!_.TRACKING){
		   return false;
	    }
		var id = data.params.task_id;
		if(_.task_data.id == id){
			_.stopTrackingIntervals();
		}

	}

  this.onProjectUpdated = function(data){
	   if(!_.TRACKING){
		   return false;
	   }
		try{
			var p_id = data.data.data.id;
			if(p_id == _.task_data.project_id){
			    _.task_data.project  = data.data.data.name;


			    if(data.data.data.customer != null){
					_.task_data.customer = data.data.data.customer.name;
					_.task_data.customer_id = data.data.data.customer.id;
				}else{
					_.task_data.customer = null;
					_.task_data.customer_id = null;
				}

				if(data.data.data.service != null){
					_.task_data.service = data.data.data.service.name;
					_.task_data.service_id = data.data.data.service.id;
				}else{
					_.task_data.service = null;
					_.task_data.service_id = null;
				}
			 	_.broadCastViewUpdate();
			}
		}
		catch(err){
			console.log(err)
		}
	}

	this.onProjectDeleted = function(data){
		if(!_.TRACKING){
		   return false;
	    }

		try{
			var p_id = data.params.project_id;
			if(p_id == _.task_data.project_id){
			  _.stopTrackingIntervals();
			}
		}
		catch(err){
			console.log(err)
		}
  }

	this.onEventUpdated = function(data){
		if( _.TRACKING  ){
			if(data.data.task_id == _.event_data.task_id){
				_.syncTime();
			}
			if(data.data.id == _.event_data.id ){
				_.event_data.notes = data.data.notes;
				_.checkUpdates();
			}
		}
	}

	this.onEventDeleted = function(data){
    if(_.event_data.id == data.params.event_id){
			console.log("EVENT DELETED");
			  _.stopTrackingIntervals();
    }
  }

	this.onAppVisible = function(){
		if( _.TRACKING ){
			_.syncTime();
		}else{
			_.checkUpdates("low");
		}
	}

	this.updateTaskCountFromServer = function(data){
		var end = new Date().getTime();
		var diff = end - _.sync_started;
		var diff_to_ss = Math.round(diff/1000);
		_.sync_started = "";
		_.start = new Date().getTime();

		var tracking_event = returnUserTrackingEvent(data.data,currentUser.get().id);

		_.event_data.duration = tracking_event.duration;

		_.total_task_duration = data.data.accumulated_time + diff_to_ss;
		_.formated_task_duration = ss_to_hh_display_locale(_.total_task_duration);
		_.actual_total_task_duration = _.total_task_duration;
		_.formated_event_duration =  ss_to_hh_display_locale(tracking_event.duration);
		_.event_duration = tracking_event.duration;

		var evt = new CustomEvent('TASK_DURATION_UPATED',{ 'detail': {task_duration : _.formated_task_duration } });
		document.dispatchEvent(evt);


		var project_updated = [{
			 	"id": data.data.project_id,
			    "accumulated_time": data.data.project_accumulated_time,
			    "loc_worked_hours": data.data.project_loc_worked_hours
		}]

		var projectsDurationUpdated = new CustomEvent('PROJECTS_DURATION_UPDATED',{ 'detail': { 'data' : project_updated  } });
		document.dispatchEvent(projectsDurationUpdated);


	}

	//fin limpiar
	this.updateTaskCount = function(){

		if(_.start == ""){
			_.start = new Date().getTime() ;
		}

		var dif = new Date().getTime() - _.start;
		var dic_ss = Math.round(dif/1000)+_.total_task_duration;

		_.actual_total_task_duration = dic_ss;
		_.formated_task_duration = ss_to_hh_display_locale(dic_ss);

		_.formated_event_duration =  ss_to_hh_display_locale( _.event_data.duration+(dif/1000) );
		_.event_duration  = Math.round(_.event_data.duration+(dif/1000));

		var evt = new CustomEvent('TASK_DURATION_UPATED',{ 'detail': {task_duration : _.formated_task_duration } });
		document.dispatchEvent(evt);

	}

	this.manageSyncError = function(data,params){
		console.log("manageSyncError")
		console.log(data,params);
		_.stopTrackingIntervals();
		_.checkUpdates("high");
	}

	this.kill = function(){
		clearRegisteredInterval('check_external_updates' );
		clearRegisteredInterval('update_task_count' );
		clearRegisteredInterval('sync_time' );
	}

	this.broadCastViewUpdate = function(){

		var evt = new CustomEvent('TRACKING_EVENT_UPDATE',{ 'detail': {event_data : _.event_data} });
		document.dispatchEvent(evt);
	}
}
