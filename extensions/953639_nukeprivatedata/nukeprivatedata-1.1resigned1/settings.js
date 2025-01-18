/**
 * NukeData (C) 2018 Beholder Corporation
 * support@getfoxyproxy.org
 *
 * This source code is proprietary, and released under the EULA available in the
 * LICENSE file at the root of this installation. Do not copy or re-use without
 * written permission.
 */
 let keys = {
	"cache": true,
	"bookmarks": false,
	"cookies": true,
	"downloads": true,
	"formData": false,
	"history": true,
	"indexedDB": true,
	"localStorage": true,
	"pluginData": true,
	"passwords": false,
	"serverBoundCertificates": true,
	"serviceWorkers": true },
	fr = {firstRun: false};

 document.addEventListener('DOMContentLoaded', function() {
 	browser.storage.sync.get(keys).then((items) => {
 		for (let k in items) {
 			document.getElementById(k).checked = items[k];
 		}
 	});
 });

 document.getElementById("saveBtn").addEventListener("click", () => {
 	for (let k in keys) {
 		let value = document.getElementById(k).checked;
 		keys[k] = value;
 	}
 	browser.storage.sync.set(keys);
 	browser.storage.sync.set(fr);
 	document.getElementById("saveBtn").classList.add("indicator-on");
 	setTimeout(() => {
 		document.getElementById("saveBtn").classList.add("indicator-off");
 		document.getElementById("saveBtn").classList.remove("indicator-on");
 		setTimeout(() => {
			document.getElementById("saveBtn").classList.remove("indicator-off"); 			
 		}, 500);
 	}, 500);
 });