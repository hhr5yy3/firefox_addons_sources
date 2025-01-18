// window.onload = function () {
// 	document.getElementById("motorroform").onsubmit = function () {
// 		var newURL =
// 			"https://app.motorro.eu/dashboard/search?value=" +
// 			document.getElementById("indeks").value +
// 			"&searchType=EXTENSION";
// 		chrome.tabs.create({ url: newURL });

// 		return false;
// 	};
// };

// function aonClick() {
// 	chrome.tabs.create({ active: true, url: location });
// }

// chrome.runtime.sendMessage({ method: "getInfo" }, function (response) {
// 	var result = " ";
// 	if (response != null && Array.isArray(response)) {
// 		for (var i = 1; i < response.length; i++) {
// 			if (response[i] != null && response[i] != "&nbsp;") {
// 				result +=
// 					'<a class="motorro" href="' +
// 					"https://app.motorro.eu/dashboard/search?value=" +
// 					response[i].replace(/ /g, "").replace("/", "") +
// 					"&searchType=" +
// 					response[0] +
// 					'">' +
// 					response[i].toString() +
// 					"</a>&nbsp;";
// 			}
// 		}

// 		document.getElementById("motorroresult").innerHTML = result;

// 		for (const anchor of document.getElementsByTagName("a")) {
// 			anchor.onclick = () => {
// 				chrome.tabs.create({ active: true, url: anchor.href });
// 			};
// 		}
// 	}
// });
