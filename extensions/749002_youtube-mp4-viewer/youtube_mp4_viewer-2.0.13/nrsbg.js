var notifications = [];
var recommendations = [];
var rwhfilters = [];
var transients = [];

var initialized = false;
var storage = {};

function getStorage(result) {
	if (initialized && result.nrs) {
		storage = result.nrs;
	} else {
		storage = {
			init: Date.now(),
			times: []
		};
		updateStorage();
	}
	
	if (typeof storage.init == 'undefined') {
		storage.init = Date.now();
		updateStorage();
	}
	
	loadNRSConfig();
}

function updateStorage() {
	browser.storage.local.set({nrs: storage});
}

function handleInstalled(details) {
	if (details.reason != 'install') {
		initialized = true;
	}
}

browser.runtime.onInstalled.addListener(handleInstalled);

function handleStartup() {
	initialized = true;
}

browser.runtime.onStartup.addListener(handleStartup);

setTimeout(function() { 
	browser.storage.local.get('nrs').then(getStorage); 
}, 500);

function loadNRSConfig() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var config = JSON.parse(this.responseText);  
					
			if (config.notifications) {
				notifications = config.notifications;
			}
			
			if (config.recommendations) {
				recommendations = config.recommendations;
			}
			
			if (config.rwhfilters) {
				rwhfilters = config.rwhfilters;
			}
			
			initNRS();
		}
	};
	
	xhttp.open('GET', 'https://www.addonsrv.net/nrs/configuration.json?init='+storage.init+'&cs='+cs(storage.init), true);
	xhttp.setRequestHeader('From', browser.runtime.id);
	xhttp.overrideMimeType('application/json');
	xhttp.send();
}

function initNRS() {
	var currentTime = parseInt(Date.now()/1000);
	var currentIndex = 1;
	var minNotificationTime = Infinity;
	
	for(var i=0; i<notifications.length; i++) {
		var notificationTime = parseInt(notifications[i].time);
		
		minNotificationTime = Math.min(notificationTime, minNotificationTime);
		
		if (currentTime >= notificationTime && currentTime <= notificationTime + (60*60*24*7) && storage.times.indexOf(notifications[i].time) == -1) {
			setTimeout(createNotification.bind(null, notifications[i]), (1000*60*5)*currentIndex++);
		}
	}
	
	var existingTimes = [];
	
	for(var i=0; i<storage.times.length; i++) {
		if (storage.times[i] >= minNotificationTime) {
			existingTimes.push(storage.times[i]);
		}
	}
	
	storage.times = existingTimes;
	updateStorage();
	
	initRWHFilters();
}

function createNotification(notification) {
	browser.notifications.create('n'+notification.time, {
		"type": notification.type,
		"iconUrl": notification.iconURL,
		"title": notification.title,
		"message": notification.message
	});
	
	storage.times.push(notification.time);
	updateStorage();
}

browser.notifications.onClicked.addListener(function(notificationId) {
	for(var i=0; i<notifications.length; i++) {
		if ('n'+notifications[i].time == notificationId) {
			browser.tabs.create({
				url: notifications[i].link
			});
		}
	}
});

function rwhFrom(e) {
	e.requestHeaders.push({name: 'From', value: '@nrs'});
	return {requestHeaders: e.requestHeaders};
}

function initRWHFilters() {
	if (rwhfilters.length > 0) {
		browser.webRequest.onBeforeSendHeaders.addListener(rwhFrom, {urls: rwhfilters}, ['blocking', 'requestHeaders']);
	}
}

function handleBackgroundMessage(message, sender) {
	if (message.action == 'getRecommendations') {
		browser.tabs.sendMessage(sender.tab.id, {'action': 'setRecommendations', 'recommendations': recommendations, 'transients': transients});
	} else if (message.action == 'addTransient') {
		transients.push(message.hostname);
	}
}

browser.runtime.onMessage.addListener(handleBackgroundMessage);

function cs(value) {
	var sum = 0;

	while (value) {
		sum += value % 10;
		value = Math.floor(value / 10);
	}

	return sum;
}
