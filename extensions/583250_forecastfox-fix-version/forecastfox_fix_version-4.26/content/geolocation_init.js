s3forecast.geolocation_id = location.href.replace(/^.*?r\=/, '');
//------------------------------------------------------------------------------
s3forecast.prefs.init(function(){
	chrome.runtime.sendMessage({ 'action_geolocation' : true, 'who' : 'loaded', 'geolocation_id' : s3forecast.geolocation_id }, function(response) {
		if (response && response.param) {
			s3forecast.geolocation.init(response.param);
		}
	});
});
//------------------------------------------------------------------------------
s3forecast.geolocation.messages = function() {
	chrome.runtime.sendMessage({ 'action_geolocation' : true, 'who' : 'get_messages', 'geolocation_id' : s3forecast.geolocation_id }, function(response) {
		if (! response) { return; }
		if (response.action == 'search') {
			s3forecast.geolocation.script_wrapper_set('search_text', response.text);
		}
		else if (response.action == 'find_location_result') {
			s3forecast.geolocation.script_wrapper_set('find_location_result', response.text);
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.geolocation.observer = new MutationObserver(function(mutations) {
	for (var mutation of mutations) {
		if (mutation.type == 'attributes') {
			var el = mutation.target;
			//-----------------------------------------------------------
			if (mutation.attributeName == "callback_init") {
				chrome.runtime.sendMessage({ 'action_geolocation' : true, 'who' : 'callback_init', 'geolocation_id' : s3forecast.geolocation_id }, function(response) { });
			}
			//-----------------------------------------------------------
			else if (mutation.attributeName == "spinner_show") {
				var value = mutation.target.getAttribute('spinner_show');
				value = (String(value) == 'true');
				chrome.runtime.sendMessage({ 'action_geolocation' : true, 'who' : 'spinner_show', 'value' : value, 'geolocation_id' : s3forecast.geolocation_id }, function(response) { });
			}
			//-----------------------------------------------------------
			else if (mutation.attributeName == "error_hidden") {
				chrome.runtime.sendMessage({ 'action_geolocation' : true, 'who' : 'error_hidden', 'geolocation_id' : s3forecast.geolocation_id }, function(response) { });
			}
			//-----------------------------------------------------------
			else if (mutation.attributeName == "error_show_text") {
				var value = mutation.target.getAttribute('error_show_text');
				chrome.runtime.sendMessage({ 'action_geolocation' : true, 'who' : 'error_show_text', 'value' : value, 'geolocation_id' : s3forecast.geolocation_id }, function(response) { });
			}
			//-----------------------------------------------------------
			else if (mutation.attributeName == "set_location") {
				var value = mutation.target.getAttribute('set_location');
				chrome.runtime.sendMessage({ 'action' : 'set_location', 'param' :  JSON.parse(value), 'geolocation_id' : s3forecast.geolocation_id }, function(response) { });
			}
			//-----------------------------------------------------------
			else if (mutation.attributeName == "find_location") {
				var value = mutation.target.getAttribute('find_location');
				chrome.runtime.sendMessage({ 'action' : 'find_location', 'param' :  JSON.parse(value), 'geolocation_id' : s3forecast.geolocation_id }, function(response) { });
			}
			//-----------------------------------------------------------
			else if (mutation.attributeName == "get_english_name") {
				var value = mutation.target.getAttribute('get_english_name');
				var query = JSON.parse(value);

				s3forecast.utils.get_request({
					url: query.url,
					type: 'GET', 
					timeout: 5*1000,
					error : function (status) {
						s3forecast.geolocation.script_wrapper_set('set_english_name', JSON.stringify(query));
					},
					success : function (data) {
						try {
							var json = JSON.parse(data);
							if (json && json.results && Array.isArray(json.results)) {
								for (var i=0; i<json.results.length; i++) {
									var address = json.results[i].address_components;
									for (var a=0; a<address.length; a++) {
										var is_locality = (address[a].types.indexOf('locality') >= 0) ? true : false;
										var is_political = (address[a].types.indexOf('political') >= 0) ? true : false;
										if ((address[a].types.length == 2) && is_locality && is_political) {
											query.english_name = address[a].long_name;
										}
									}
								}
							}
						} catch(e) {
						}
						s3forecast.geolocation.script_wrapper_set('set_english_name', JSON.stringify(query));
					}
				});
			}
		}
	}
});
s3forecast.geolocation.observer.observe(document.getElementById('script_wrapper'), { attributes: true, characterData: true });
//------------------------------------------------------------------------------
setInterval(function(){ s3forecast.geolocation.messages(); }, 300);
