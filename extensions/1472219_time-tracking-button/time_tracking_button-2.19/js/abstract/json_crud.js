function getTaskFromSore(id){
	
	if( typeof(STORE.TASKS.data) !== "undefined" && typeof(STORE.TASKS.data.projects) !== "undefined"){
		for(var p in STORE.TASKS.data.projects){
		        var ts = STORE.TASKS.data.projects[p].tasks;
		        var i = 0;
		        for(var t in ts){
			        	if(id==ts[i].id){
		                	return ts[i]
		                }
		                i++;
		         }
		 }
	 }
	 return "Not found";
}

function getSubTaskFromSore(task_id,id){
	
	
	if( typeof(STORE.TASKS.data) !== "undefined" && getTaskFromSore(task_id) !== "Not found"){
		
		for(var p in getTaskFromSore(task_id).subtasks){
						
			        	if(getTaskFromSore(task_id).subtasks[p].id == id){
		                	return {data:getTaskFromSore(task_id).subtasks[p], position:p}
		                }
		 }
	 }
	 return "Not found";
}

function getProjectTaskFromSore(id){
	
	if( typeof(STORE.PROJECTS) !== "undefined" && typeof(STORE.PROJECTS.data) !== "undefined"){
		
		for(var p in STORE.PROJECTS.data){
		        var ts = STORE.PROJECTS.data[p].tasks;
		        var i = 0;
		        for(var t in ts){
			        	if(id==ts[i].id){
		                	return ts[i]
		                }
		                i++;
		         }
		         
		        var tl = STORE.PROJECTS.data[p].task_lists;
		        if(tl !== null && tl.length > 0){
			         for(var tt in tl){
				         var tlt = STORE.PROJECTS.data[p].task_lists[tt].tasks;
				         for(var ttt in tlt){
					         if(tlt[ttt].id == id){
						         return tlt[ttt]
					         }
				         }
			         }
			    }
		 }
		 
	 }
	 return "Not found";
}

function getProjectFromSore(id){
	if( typeof(STORE.PROJECTS.data) !== "undefined"){
		for(var p in STORE.PROJECTS.data){
			if(id== STORE.PROJECTS.data[p].id){
		                	return STORE.PROJECTS.data[p];
		    }
		}
	}
	 return "Not found";
}

function getActualAccountName(){
	if(typeof(STORE.USER_INFO.teams)!= "undefined"){
		for(var i = 0 ; i < STORE.USER_INFO.teams.length ; i++){
			if(STORE.USER_INFO.teams[i].is_selected == true){
				return STORE.USER_INFO.teams[i].company;
			}
		};
	}
	return "Not set"
}

function getUserFromSore(id){
	
	if( typeof(STORE.USERS.data) !== "undefined" ){
		for(var p in STORE.USERS.data){
				if(id== STORE.USERS.data[p].id){
					STORE.USERS.data[p]["pos"] = p;
					return STORE.USERS.data[p];
				}
		 }
	 }
	 return "Not found";
}
function removeUserFromStore(id){
	STORE.USERS.data.splice( getUserFromSore(15).id ,1)
}


function saveSyncEvent(data){
	if(typeof(STORE.SYNC) == "undefined"){
		STORE.SYNC = [];
	}
	STORE.SYNC.push(data);
	saveStore();
}

function cleanStoreAccountData(){
	STORE.TASKS = {data:{projects:[]}};
	STORE.PROJECTS = {data:[]};
	STORE.USERS = {data:[]};
	STORE.SERVICES = {data:[]};
	STORE.CUSTOMERS = {data:[]};
	saveStore();
	//
	var userTasksUpdated = new CustomEvent('USER_TASKS_UPDATED',{ 'detail': {data:{projects:[]}} });
	document.dispatchEvent(userTasksUpdated);
	var projectsUpdated = new CustomEvent('PROJECTS_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(projectsUpdated);
	var usersUpdated= new CustomEvent('USERS_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(usersUpdated);
	var updateEvt = new CustomEvent('CUSTOMERS_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(updateEvt);
	var updateEvt = new CustomEvent('SERVICES_UPDATED',{ 'detail': {data:[]} });
	document.dispatchEvent(updateEvt);
	
}

function updateTimeInTaskStore(params){
	/*
		task_id
		loc_worked_hours:
		worked_hours
		accumulated_time:
		accumulated_time_display
	*/
	
	try{
		getTaskFromSore(params.task_id).loc_worked_hours = params.loc_worked_hours;
		getTaskFromSore(params.task_id).worked_hours = params.worked_hours;
		getTaskFromSore(params.task_id).accumulated_time = params.accumulated_time;
		getTaskFromSore(params.task_id).accumulated_time_display = params.accumulated_time_display;
	}
	catch(err){
		console.log(err)
	}
}


function addClientToSore(data){
	STORE.CUSTOMERS.data.push(data.data);
	saveStore();
}
function addServiceToSore(data){
	STORE.SERVICES.data.push(data.data);
	saveStore();
}
function addUserToSore(data){
	STORE.USERS.data.push(data.data[0]);
	saveStore();
}

var replaceObject = function(a, b) {
    var prop;
	try {
	    for ( prop in a ){
	      if(prop !== "id"){
	        a[prop] = b[prop]
	      }
	     }
    }
	catch(err) {
	    console.log(err);
	}
};

/* GROUPING FUNCTIONS*/

function groupEntriesBy(data,by){
	if(!data.length || data.length ==0){
		return data;
	}
	var d = {};
    var arr = []
    for(i=0;i<data.length;i++){
        if( typeof(d[data[i][by]]) == "undefined"){
	       d[data[i][by]] = [];
        }
        d[data[i][by]].push(data[i]);
    };
    //
    for(k in d){
	   var value = k;
	   if(k == null || k == "null" ){
		  value = " "; 
	   }
       arr.push({by:value , data:d[k]})
    }
    
    return arr;
}
function groupEntriesByUser(data,by){
	if(!data.length || data.length ==0){
		return data;
	}
	var d = {};
    var arr = []
    for(i=0;i<data.length;i++){
        if( typeof(d[data[i][by]]) == "undefined"){
	       d[data[i][by]] = [];
        }
        d[data[i][by]].push(data[i]);
    };
    //
    for(k in d){
	   var value = k;
	   if(k == null || k == "null" ){
		  value = " "; 
	   }
       arr.push({by:value, user_id:d[k][0].user_id , data:d[k]})
    }
    
    return arr;
}

function SortByAlphaStickyUser(x,y) {
    return ((x.by== y.by || x.by == STORE.USER_INFO.name+" "+STORE.USER_INFO.surname) ? 0 : ((x.by > y.by || y.by == STORE.USER_INFO.name+" "+STORE.USER_INFO.surname) ? 1 : -1 ));
}


function SortByAlpha(x,y) {
    return ((x.by== y.by) ? 0 : ((x.by> y.by) ? 1 : -1 ));
}

function alreadyInObject(obj , val){
	for(var i = 0, len = obj.length; i < len; i++) {
	    if (obj[i].id === val) {
	        return true
	    }
	}
	return false;
}

function multipleDataToGoogleChart(data,by, header){
		var formated_array = [header];
	 	var data_by = groupEntriesBy( data , by);
	    for(i=0; i < data_by.length ; i++){
		    var total = 0;
		    for( j=0 ; j < data_by[i].data.length ; j++){
		    	total+= data_by[i].data[j].duration;
	    	}
	    	formated_array.push([data_by[i].by , parseFloat(ssTOhhDecimal(total)) ]);
	    }
	    return formated_array;
}

function userDataToGoogleChart(data,key,header,hide_if_zero){
	var formated_array = [header];
	for(i=0; i < data.length ; i++){
		if(typeof(hide_if_zero)!= "undefined" && hide_if_zero == true &&  data[i][key] <= 0 ){
			
		}else{
			formated_array.push([ data[i].name+" "+data[i].surname , data[i][key] ])
		}
		
	}
	return formated_array;
}