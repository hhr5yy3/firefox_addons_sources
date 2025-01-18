//

reg_intervals = new Object;

function registeredInterval(a,b,id){
   clearRegisteredInterval(id);
   if(typeof(reg_intervals[id])=='undefined' ){
     reg_intervals[id] = new Array();
   }
   
   reg_intervals[id].push(setInterval(a,b));
}

function clearRegisteredInterval(id){

    if(typeof(reg_intervals[id])!='undefined' ){
        for(i=0;i<reg_intervals[id].length;i++){
            clearInterval(reg_intervals[id][i])
        }
        //
        delete reg_intervals[id];
    }
}

//
function onlyTime(date){
	//TODO : locale
	//Siempre viene fecha formada de servidor
    if(date!=null){
        var d = new Date(date);
        var d_string = moment(d).format( getMomentsHourFormat() ); //AMPM ("TL")
    }else{
        var d_string = '';
    }

    return d_string;
}

function prettyDuration(duration){
	if(duration==null){
		return "";
	}
	if(duration<60){
		var pretty_duration = duration + " "+_t("seconds");
		return pretty_duration;
	}else if(duration<3600){
		var pretty_duration = Math.round(duration/60) + " "+_t("minutes");
		return pretty_duration;
	}else{
		var pretty_duration = Math.round((duration/3600)*10)/10

		if(pretty_duration==1){
			return ss_to_hhmm_display_locale(duration)+ " "+_t("hour");

		}else{
			return ss_to_hhmm_display_locale(duration)+ " "+_t("hours");
		}

	}
}

function getMomentsHourFormat(){
	if(SET_TIME_FORMAT == "AMPM"){
		return "h:mm a";
	}else{
		return "HH:mm";
	}
}



function hhmmAMPM_To_minutes(hhmm){
    hhmm = hhmm.toLowerCase();
    var is = "24";
    if(hhmm.indexOf("am")>-1){
        hhmm = hhmm.replace(" ","");
        hhmm = hhmm.replace("am","");
        is = "AM";
    }
    if(hhmm.indexOf("pm")>-1){
       hhmm = hhmm.replace(" ","");
       hhmm = hhmm.replace("pm","");
       is = "PM";
    }

    var h_arr = hhmm.split(':');
    var hs = Number(h_arr[0]);

    if(hs==12 && is == "PM"){
         // 12PM = 12
        hs = 12*60;
    }else if(hs==12 && is == "AM"){
        // 12AM = 0
        hs = 0;
    }else if(hs!=12 && is == "PM"){
        //PM suma 12hs
        hs = (Number(h_arr[0])+12)*60;
    }else{
        //AM y no es 12 o es 24
        hs = Number(h_arr[0])*60;
    }
    var ms = Number(h_arr[1])*60;
    var m = hs + ms;
    if(typeof(h_arr[2])!=="undefined"){
        m += Number(h_arr[2]);
    }
    return m;
}
function mmTOhhmm(mm){
	//TODO : agregar AM / PM
    minute_numb    = parseInt(mm);
    var hours   = Math.floor(minute_numb / 60);
    var minutes = Math.floor(minute_numb - (hours * 60));

    if (hours   < 10) {
        hours   = "0"+hours;
    }
    if (minutes < 10) {
        minutes = "0"+minutes;
    }
    var time    = hours+':'+minutes;
    return time;
}
function hhmmTOmm(server_date){
	//
	var date_arr = server_date.split(" ");
	var hhmm_arr = date_arr[1].split(":");
	var hh_to_min = parseInt(hhmm_arr[0]) * 60;
	var m = parseInt(hhmm_arr[1]);
	var mm = hh_to_min + m ;

	return mm;
}
function hhmmTOss(server_date){
	//
	var date_arr = server_date.split(" ");
	var hhmm_arr = date_arr[1].split(":");
	var hh_to_min = parseInt(hhmm_arr[0]) * 60;
	var m = parseInt(hhmm_arr[1]);
	var s = parseInt(hhmm_arr[2])
	var ss = ((hh_to_min + m)*60 ) + s  ;

	return ss;
}




function ssTOhhmm(ss){
    sec_numb    = parseInt(ss);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {
        hours   = "0"+hours;
    }
    if (minutes < 10) {
        minutes = "0"+minutes;
    }
    if (seconds < 10) {
        seconds = "0"+seconds;
    }
    var time    = hours+':'+minutes;
    return time;
}

function ssTOhhmmss(ss){
    sec_numb    = parseInt(ss);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {
        hours   = "0"+hours;
    }
    if (minutes < 10) {
        minutes = "0"+minutes;
    }
    if (seconds < 10) {
        seconds = "0"+seconds;
    }
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function ssTOmmss(ss){
	//no sporta mas de 1 hora
    sec_numb    = parseInt(ss);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {
        hours   = "0"+hours;
    }

    if (seconds < 10) {
        seconds = "0"+seconds;
    }
    var time    = minutes+':'+seconds;
    return time;
}



function ssTOhhDecimal(ss){
	var hhDecimal = Math.round(ss/60/60*100)/100;
	return hhDecimal;
}
function mmTOhhDecimal(mm){
	var hhDecimal = Math.round(mm/60*100)/100;
	return hhDecimal;
}
//Math
function porcentaje(valor,total) {
	if(total == 0){
		return 100;
	}
    a = valor;
    b = total;
    c = a/b;
    d = c*100;
    if(isNaN(d)){
        d = 0;
    }
    return d;
}

function hhmmTOssAMPM(hhmm){
    hhmm = hhmm.toLowerCase();
    var is = "24";
    if(hhmm.indexOf("am")>-1){
        hhmm = hhmm.replace(" ","");
        hhmm = hhmm.replace("am","");
        is = "AM";
    }
    if(hhmm.indexOf("pm")>-1){
       hhmm = hhmm.replace(" ","");
       hhmm = hhmm.replace("pm","");
       is = "PM";
    }

    var h_arr = hhmm.split(':');
    var hs = Number(h_arr[0]);

    if(hs==12 && is == "PM"){
         // 12PM = 12
        hs = 12*3600;
    }else if(hs==12 && is == "AM"){
        // 12AM = 0
        hs = 0;
    }else if(hs!=12 && is == "PM"){
        //PM suma 12hs
        hs = (Number(h_arr[0])+12)*3600;
    }else{
        //AM y no es 12 o es 24
        hs = Number(h_arr[0])*3600;
    }
    var ms = Number(h_arr[1])*60;
    var s = hs + ms;
    if(typeof(h_arr[2])!=="undefined"){
        s += Number(h_arr[2]);
    }
    return s;
}

function roundDecimal(num){
	return Math.round(num * 100) / 100
}

function roundSeconds(ss,round_by,to){
		//val 0 loc
		//val 1 segundos
		var round_by = Number(round_by)
		var decimal_val = ss / (60* round_by);
		var rounded = returnRounded(decimal_val,to);
		var segs = rounded * (60* round_by);
		var loc = ss_to_hhmm_display_locale(segs);
		return [loc,segs];
}

function returnRounded(hh,to){
		if(typeof(to) == "undefined" || to == false || to == "false" ){
			return Math.round(hh);
		}
		if(to == "ceil"){
			return Math.ceil(hh);
		}
		if(to == "bottom"){
			return Math.floor(hh);
		}
}


function humanDuration(s){
	var h_readable_string = "";

	if(s<60){
		h_readable_string = s+_t("sec");
	}

	if(s >= 60 && s < 3600 ){
		h_readable_string = ssTOmmss(s)+_t("min");

	}

	if(s > 3600){
		h_readable_string = ss_to_hh_display_locale(s)+_t("h");
	}

	return h_readable_string;
}
function getParam(params,sParam){
    var sPageURL = params;//.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
    return "";
}

function urlParamToJson(url_params){
	if(typeof(url_params)!= "object"){
		var json_params = JSON.parse('{"' + decodeURI(url_params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
		return json_params;
	}else{
		return url_params;
	}
	
}



var arrayDuplicatesGetCopy = function (arr) {
    var ret, len, i, j, cur, found;
    ret = [];
    len = arr.length;
    for (i = 0; i < len; i++) {
        cur = arr[i];
        found = false;
        for (j = 0; !found && (j < len); j++) {
            if (cur === arr[j]) {
                if (i === j) {
                    ret.push(cur);
                }
                found = true;
            }
        }
    }
    return ret;
};

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '"  target="_blank">' + url + '</a>';
    })
// or alternatively
// return text.replace(urlRegex, '<a href="$1">$1</a>')
}
function addBreaklines(text) {
    var nu_text = text.replace(/\n/g, '<br />');
    return nu_text;
// or alternatively
// return text.replace(urlRegex, '<a href="$1">$1</a>')
}

function returnAvatarUrl(avatar_url){
	return DOMAIN+"v3/dispatcher/image?src="+avatar_url+"&w=200&h=200";
}

function userNullAvatarHTML(){
	var a_html = "<span class='userAvatarContainer'>"+
	        				"<span class='userAvatarShadow' >"+
							 "</span>"+
						  "</span>";

	return a_html;
}
function userNullAvatarSharedHTML(){
	var a_html = "<span class='userAvatarContainer'>"+
                  "<div class='avatarImage'></div>"+
	        				"<span class='userAvatarShadow'>"+
                  
		        				"<span class='tooltip'>"+_t('Everyone')+"</span>"+
							 "</span>"+
						  "</span>";

	return a_html;
}

function avatarHTML(id,user_name){
	 		if(id=="me"){
		        var user = currentUser.get();
	        }else{
	       		var user = usersStore.getUserFromStore(id);
	        }

	        if(!user){
		        var avatar_bg = "";
		        var user_name = user_name;
	        }else{
		        var user_name = user.name+" "+user.surname;
		        var avatar_bg_url = (user.avatar_url != null)? returnAvatarUrl(user.avatar_url) : "";
		        var avatar_bg = "background-image:url("+avatar_bg_url+")";
	        }

	        //background

	        var user_name_no_space = user_name.replace(/ /g, "");

	        var bg_color = USER_COLORS[returnNumberFromString(user_name_no_space)];//intToRGB(hashCode(user_name))
	        var color_bg = "background-color:"+bg_color;
	        var bg = color_bg+";"+avatar_bg;
	        //initials
	        var arr_user_name = user_name.split(" ");

	        if(arr_user_name.length > 1){
		        var initials = arr_user_name[0].charAt(0).toUpperCase()+"."+arr_user_name[1].charAt(0).toUpperCase()+".";
	        }else{
		        var initials =  arr_user_name[0].charAt(0).toUpperCase()+arr_user_name[0].charAt(1).toLowerCase()+".";
	        }

	        var a_html = "<span class='userAvatarContainer' style='"+bg+";'>"+
	        				"<span class='userAvatarShadow' >"+
		        				"<span class='initials' >"+initials+"</span>"+
		        				"<span class='tooltip'>"+user_name+"</span>"+
							 "</span>"+
						  "</span>";

			return a_html;
}

function returnInitials(user_name){
	var arr_user_name = user_name.split(" ");

    if(arr_user_name.length > 1){
        var initials = arr_user_name[0].charAt(0).toUpperCase()+"."+arr_user_name[1].charAt(0).toUpperCase()+".";
    }else{
        var initials =  arr_user_name[0].charAt(0).toUpperCase()+arr_user_name[0].charAt(1).toLowerCase()+".";
    }
    return initials;
}

function avatarSharedHTML(id,user_name){
	 		if(id=="me"){
		        id = currentUser.get().id;
		        user_name = currentUser.get().name+" "+currentUser.get().surname;
	        }
	        var user = usersStore.getUserFromStore(id);

	        if(!user){
		        var avatar_bg = "";
		        var user_name = user_name;
	        }else{
		        var user_name = user.name+" "+user.surname;
		        var avatar_bg_url = (user.avatar_url != null)? returnAvatarUrl(user.avatar_url) : "";
		        var avatar_bg = "background-image:url("+avatar_bg_url+")";
	        }

	        //background

	        var user_name_no_space = user_name.replace(/ /g, "");

	        var bg_color = USER_COLORS[returnNumberFromString(user_name_no_space)];//intToRGB(hashCode(user_name))
	        var color_bg = "background-color:"+bg_color;
	        var bg = color_bg+";"+avatar_bg;
	        //initials
	        var arr_user_name = user_name.split(" ");

	        if(arr_user_name.length > 1){
		        var initials = arr_user_name[0].charAt(0).toUpperCase()+"."+arr_user_name[1].charAt(0).toUpperCase()+".";
	        }else{
		        var initials =  arr_user_name[0].charAt(0).toUpperCase()+arr_user_name[0].charAt(1).toLowerCase()+".";
	        }

	        var a_html = "<span class='userAvatarContainer'>"+
                  "<div class='avatarImage'  style='"+bg+";'></div>"+          
	        				"<span class='userAvatarShadow' >"+
		        				"<span class='tooltip'>"+user_name+"</span>"+
							 "</span>"+
						  "</span>";
              
			return a_html;

}
function avatarHTMLFromUserObject(user){
	
		    var user_name = user.name+" "+user.surname;
		    var avatar_bg_url = (user.avatar_url != null)? returnAvatarUrl(user.avatar_url) : "";
		    var avatar_bg = "background-image:url("+avatar_bg_url+")";
	        //background

	        var user_name_no_space = user_name.replace(/ /g, "");

	        var bg_color = USER_COLORS[returnNumberFromString(user_name_no_space)];//intToRGB(hashCode(user_name))
	        var color_bg = "background-color:"+bg_color;
	        var bg = color_bg+";"+avatar_bg;
	        //initials
	        var arr_user_name = user_name.split(" ");

	        if(arr_user_name.length > 1){
		        var initials = arr_user_name[0].charAt(0).toUpperCase()+"."+arr_user_name[1].charAt(0).toUpperCase()+".";
	        }else{
		        var initials =  arr_user_name[0].charAt(0).toUpperCase()+arr_user_name[0].charAt(1).toLowerCase()+".";
	        }

	        var a_html = "<span class='userAvatarContainer' style='"+bg+";'>"+
	        				"<span class='userAvatarShadow' >"+
		        				"<span class='initials' >"+initials+"</span>"+
		        				"<span class='tooltip'>"+user_name+"</span>"+
							 "</span>"+
						  "</span>";

			return a_html;
}


function getColorArray(){
	var arr = []
	for(var k in  USER_COLORS){
		if(USER_COLORS[k].color!= 'none'){
			arr.push(USER_COLORS[k].color);
		}
	}
	for(var k in  USER_COLORS){
		if(USER_COLORS[k].color!= 'none'){
			arr.push(USER_COLORS[k].color);
		}
	}
	return arr;
}

function objectLength(obj){
	var count = 0;
	var i;

	for (i in obj) {
	    if (obj.hasOwnProperty(i)) {
	        count++;
	    }
	}
	return count;
}

function getProjectColor(color){
	for(var i = 0 ; i < PRIORITY_COLORS.length ; i++ ){
        if(PRIORITY_COLORS[i].value == color){
	        return PRIORITY_COLORS[i].color;
        }
	}
	return 'inherit';
}

function getProgress(worked_hours,estimated_time){
  var width = "0%";
  var exceeded = false;
  if(estimated_time > 0){
    if(worked_hours <= estimated_time){
      width = Math.floor(porcentaje(worked_hours,estimated_time))+"%";
    }
    if(worked_hours > estimated_time){
      exceeded = true;
      width =  "100%";
    }else{
      exceeded = false;
    }    
  }else{    
    width =  "0%";
    exceeded = false;
  }
  return {width: width, exceeded: exceeded};
}
Math.median = function(values) {
	/*
	var ary, numA, i;
	ary = arr;
	for (i = ary.length-1; i >= 0; i--) {if (ary[i] !== +ary[i]) ary[i] = Number.NEGATIVE_INFINITY;}
	numA = function(a, b){return (a-b);};
	ary.sort(numA);
	while (ary.length > 1 && !isFinite(ary[0])) ary.shift();
	return ary[Math.floor(ary.length/2)];
	*/
	values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2){
        return values[half];
    }else{
        return (values[half-1] + values[half]) / 2.0;
    }

}


//shared tasks helpers
function returnUserTrackingEvent(task,user_id){
	if(task.tracking_event != null && task.tracking_event != "" && typeof(task.tracking_event) == "object" ) {
			return task.tracking_event;
	}else{
	
		if(task.users != null && task.users.length > 0 ){
			for(var h in task.users){
				if(task.users[h].id == user_id && task.users[h].event != null){
					return task.users[h].event;
				}
			}
		}
	}
	trackCustomJavaScriptError("Tracking eventt not found in returnUserTrackingEvent");
	
	var message = _t("Tracking event not found.");
					var evt = new CustomEvent('ON_ERROR',{ 'detail': {title:"API" , message : message} });
					document.dispatchEvent(evt);
	return false;
}



function usersToPost(users){
	var p_u = []
	for(var u = 0 ; u < users.length ; u++){
		p_u.push({"id":users[u].id});
	}	
	return JSON.stringify(p_u);
}

function supportsSharedTasks(){
	if( CURRENT_API_VERSION < SHARED_TASKS_VERSION_SUPPORT ){
		      return false;
    }
    if(currentUser.getCurrentAccountStatus() == "FREE" ){
	      return false;
    }
    return true;
}

function APIsupportsSharedTasks(){
	
	if( CURRENT_API_VERSION < SHARED_TASKS_VERSION_SUPPORT ){
		return false;
    }else{
	    return true;
    }
}


function taskBelongsToMe(task){
		
	    if(task.type == "EVERYONE"){
		    return true; 
	    }
	    
      	
      	if(task.users != null ){
	      	for(var k in task.users){
		      	if(task.users[k].id == currentUser.get().id && task.users[k].status == "ACTIVE"){
			     	return true; 	
		      	}
	      	}
      	} 
      	return false;
}

function getTaskUsers(users){
		var urs = [];
      	if(users != null ){
	      	for(var k in users){
		      	if(users[k].status == "ACTIVE"){
			      	urs.push(users[k].id);
		      	}
	      	}
      	} 
      	return urs;
}
