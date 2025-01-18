/*
 * 	Trace background script
 * 	Copyright AbsoluteDouble 2018 - 2021
 * 	Written by Jake Mcneill
 * 	https://absolutedouble.co.uk/
 */

let gpuDirectStr = ['Direct3D9Ex vs_0_0 ps_2_0', 'Direct3D9Ex vs_3_0 ps_3_0', 'Direct3D9Ex vs_5_0 ps_5_0'];

//chrome.webRequest.onActionIgnored.addListener(function(a){
//	console.log(a);
//});

/*chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		if (key === "stats_main" || key === "stats_db") return;
		var storageChange = changes[key];
		console.log('[brows] Storage key "'+key+'" in namespace "'+namespace+'" changed. Old value was "'+storageChange.oldValue+'", new value is "'+storageChange.newValue+'".');
	}
});*/