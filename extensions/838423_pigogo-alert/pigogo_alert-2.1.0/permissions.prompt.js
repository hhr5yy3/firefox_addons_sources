chrome.pageAction.onClicked.addListener((tab) => {
	chrome.permissions.request({
		permissions: [
		"*://www.pigogo.gr/*",
		"*://backend.pigogo.gr/*",
		],
	}).then((res) => {
		console.log('response', res);
	});

	console.log('response', tab);
  });