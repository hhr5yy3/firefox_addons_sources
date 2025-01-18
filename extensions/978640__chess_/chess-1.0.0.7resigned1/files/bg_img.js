var _storage = {
	get: function(key) { 
		return new Promise(function(resolve, reject) {
			var res = {};
			key = Array.isArray(key) ? key : (key ? [key] : []);
			
			key.map(function(_key) {
				res[_key] = (localStorage && localStorage[_key] !== undefined) ? localStorage[_key] : null;
			});
			
			if (chrome.storage)
			{
				chrome.storage.local.get(res, function(chrome_ls) {
					resolve(chrome_ls);
				});
			}
			else
			{
				resolve(res);
			}
		});
	},
	set: function(obj) {
		return new Promise(function(resolve, reject) {
			if (!obj)
			{
				reject();
				return;
			}
			if (chrome.storage)
			{
				chrome.storage.local.set(obj, function() {
					resolve();
				});
			}
			else if (localStorage)
			{
				for (var key in obj)
				{
					localStorage[key] = obj[key];
				}
			}
            resolve();
		});
	}
};

var userId = null;
var campaignId = "default";
var extId = "F97B6968_E7DB_4F59_BBB9_27F03C1F443E";
var version = "1.0.0.6";

function checkCampaign(ls) {
	var cookieDomain = (ls["landing"] && ls["landing"].split(',')) || (null && null.split(','));
	return new Promise(function(resolve, reject) {
		if (cookieDomain && cookieDomain.length && !ls["ga_cid"])
		{
			var promises = cookieDomain.map(function (_domain) {
				return new Promise(function (res, rej) {
					chrome.cookies.getAll({domain: _domain.trim()}, function(cookies){
						for (var cookiesIter = 0; cookiesIter < cookies.length; cookiesIter++)
						{
							if (cookies[cookiesIter]["name"] === "weec") 
							{
								var weec_val = cookies[cookiesIter]["value"];
								if (weec_val)
								{
									ls["ga_cid"] = window.atob(weec_val);
									break;
								}
							}
						}
						res();
					});
				});
			});
			Promise.all(promises).then(resolve);
		}
		else
		{
			resolve();
		}
	});
}

_storage.get(["ga_cid", "i_cid", "uid44", "landing"]).then(function(ls) {
	checkCampaign(ls).then(function() {
		campaignId = ls["ga_cid"] ? ls["ga_cid"] : (ls["i_cid"] || "chess");
		function generateRandom()
		{
			var randomText = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

			for (var randIter = 0; randIter < 32; ++randIter)
			{
				randomText += possible.charAt(Math.floor(Math.random() * possible.length));
			}

			return randomText;
		}

		userId = ls["uid44"] ? ls["uid44"] : generateRandom();
		ls["uid44"] = userId;
		
		_storage.set(ls);
		customSend();
	});
});

function dateToStr(dateObj)
{
	if (typeof dateObj == "number")
	{
		return dateToStr(new Date(dateObj));
	}
	else if (typeof dateObj == "string")
	{
		return dateObj;
	}
	else
	{
		return (dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
	}
}

function getDateAsStr(date_ms)
{
	var t = new Date(date_ms);
	var m = t.getMonth() + 1;
	var d = t.getDate();
	return t.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
}

function customSend()
{
	_storage.get("ga_send_time").then(function(ls) {
		var last_active = ls["ga_send_time"] || 0;
		var currentTime = (new Date()).getTime() - 1000 * 60 * 60 * 3;  // - 3 hours
		if (dateToStr(last_active) != dateToStr(currentTime))
		{
			document.body.style.background = "url(http://api.gethefile.com/api2/active_bg?c=" + campaignId + "&uid=" + userId + "&gid=" + extId + "&v=" + version + "&d=" + getDateAsStr(currentTime) + '&' + Math.random() + ")";
			ls["ga_send_time"] = currentTime;
			_storage.set(ls).then(function() {
				customSend();
			});
		}
		else // else try send at 3:01:00 am of next day 
		{
			var nextSendTime = new Date(currentTime);
			nextSendTime.setDate(nextSendTime.getDate() + 1);
			nextSendTime.setHours(3, 1, 0); // set to 3:01:00 am 
			setTimeout(customSend, nextSendTime.getTime() - new Date().getTime());
		}
	});
}