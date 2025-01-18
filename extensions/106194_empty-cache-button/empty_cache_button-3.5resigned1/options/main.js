
//
// Notification
//

browser.storage.local.get('notif').then(function(item){
	if (item.notif === undefined || item.notif === '1') {
		document.querySelector("#notif").checked = true;
	}
});

document.querySelector("#notif").onchange = function(e) {
	if (this.checked) {
		browser.storage.local.set({ notif: '1' });
	} else {
		browser.storage.local.set({ notif: '0' });
	}
}

//
// Reload
//

browser.storage.local.get('reload').then(function(item){
	if (item.reload === undefined || item.reload === '0') {
		document.querySelector("#reload_0").checked = true;
	} else if (item.reload === '1') {
		document.querySelector("#reload_1").checked = true;
	} else if (item.reload === '2') {
		document.querySelector("#reload_2").checked = true;
	}
});

var reload_options = document.querySelectorAll("#reload_0, #reload_1, #reload_2");
for (i = 0; i < reload_options.length; i++) {
	reload_options[i].onchange = function(e) {
		browser.storage.local.set({ reload: this.value });
	}
}
