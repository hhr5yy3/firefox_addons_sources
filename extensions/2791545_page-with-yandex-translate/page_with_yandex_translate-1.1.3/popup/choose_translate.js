function msleep(post_func, timeout) {
	let wait = new Promise( function(resolve, reject) { 
		setTimeout(() => {resolve("whatever");}, 3000);
	});

	wait.then(() => {
		console.log("Timeout with", timeout, "ms");
		post_func();
	});
}

function translate_postprocess() {
	browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
		console.log("New current tab load Url: ", tabs[0].url);
		var url_array = tabs[0].url.split('/');
		var pre_utl = "https:/";

		 // Example url: https://translated.turbopages.org/proxy_u/en-ru.ru.c95f0aa8-649d57c9-462dff1d-74722d776562/https/www.site_name.com
		for (var idx = 0; idx < url_array.length; idx++) {
			if (url_array[idx] == "http:" || url_array[idx] == "https:" || url_array[idx] == "" || url_array[idx] == null) {
				continue;
			}

		    pre_utl += "/" + url_array[idx];

			if (url_array[idx] == "https" || url_array[idx] == "http") {
				break;
			}
		}

		console.log("Update Translate/PrefixUrl: ", pre_utl);
		localStorage.setItem("Translate/PrefixUrl", pre_utl);
	}, console.error)
}

function translate_process() {
	browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
		const LINK_TIMEOUT = 12 /*hour*/ * 60 /*min*/ * 60 /*sec*/ * 1.0 /*msec*/;
		let tab = tabs[0];
		var need_translate = 0;
		var is_translated = 0;
		var pre_url="";
		
		 /*	Check tab url is translated	*/
		{
			var url_array = tab.url.split('/');
			console.log(url_array);
			for (const iter_url of url_array) { 
				// console.log(iter_url); 
				if (iter_url == "translated.turbopages.org") {
					need_translate = 0;
					is_translated = 1;
					break;
				}
			}
		}
		 /*	Timestamp control	*/
		{
			console.log("Current Translate/Timestamp: ", localStorage.getItem("Translate/Timestamp"));
			var link_timestamp = localStorage.getItem("Translate/Timestamp");
			var curr_timestamp = new Date().getTime() / 1000;
			console.log("Time pass: ", curr_timestamp - link_timestamp);
			if (curr_timestamp - link_timestamp  > LINK_TIMEOUT) {
				console.log("Update Translate/Timestamp: ", curr_timestamp);
				localStorage.setItem("Translate/Timestamp", curr_timestamp);
				need_translate = 1;
			}
		}
		 /*	PrefixUrl control	*/
		{
			console.log("Current Translate/PrefixUrl: ", localStorage.getItem("Translate/PrefixUrl"));
			pre_url = localStorage.getItem("Translate/PrefixUrl");
			if (pre_url == "" || pre_url == null || pre_url.includes("translated.turbopages.org") == false || pre_url.includes("/http") == false) {
				need_translate = 1;
			}
		}

		console.log("need_translate = ", need_translate, ",  ", "is_translated = ", is_translated);
	
		 /*	Remove prefix translate url	*/
		if (is_translated == 1) {
			var url_array = tab.url.split('/');
			var suffix_url = 0;
			tab.url = "https:/"

			for (var idx = 0; idx < url_array.length; idx++) {
				if (url_array[idx] == "https" || url_array[idx] == "http") {
					suffix_url = 1;
					continue;
				}

				if (suffix_url == 0) {
					continue;
				}
				
				tab.url += "/" + url_array[idx];
			}
		}

		 /*	Generate new translate url	*/
		if (need_translate == 1) {
			tab.url = "https://translate.yandex.com/translate?js=y&url="+tab.url;
			msleep(translate_postprocess, 5000);
		}
		 /*	Adding translate prefix to current url 	*/
		else {
			tab.url = pre_url + "/" + tab.url.replace('https://', '');
		}

		console.log("Update current tab Url: ", tab.url);
		browser.tabs.update({url: tab.url});

	}, console.error);
}

translate_process();