/* eslint-env webextensions */

(function() {
	function readLicense() {
		const license = document.querySelector("meta[name='keyhub-license']");
		if (license) {
			return license.getAttribute('content');
		}
		return null;
	}

	function handleResponse(response) {
		const status = document.getElementById('extensionStatus');
		if (status) {
			if (response && response.linked) {
				status.className = 'task is-linked';
				const label = status.querySelectorAll('.when-linked small')
				if (label.length > 0) {
					label[0].remove();
				}
			} else if (response) {
				status.className = 'task is-notlinked';
			}
			status.querySelector('.when-notlinked a').addEventListener('click', function() {
				const issuer = meta.getAttribute('content');
				const license = readLicense();
				chrome.runtime.sendMessage({
					type: 'check-license',
					license: license,
					issuer: issuer,
					uri: new URL(window.location).origin
				}).then(function(licenseResponse) {
					if (licenseResponse.status === 'mismatch') {
						window.alert(chrome.i18n.getMessage('license_mismatch', issuer));
					} else {
						const confirmLinkKey = licenseResponse.status === 'match' ?
							'confirm_link' : 'confirm_link_unknown';
						if (window.confirm(chrome.i18n.getMessage(confirmLinkKey, issuer))) {
							chrome.runtime.sendMessage({
								type: 'link',
								issuer: issuer
							}).then(function(response) {
								if (response.linked) {
									status.className = 'task is-linked';
									const label = status.querySelectorAll('.when-linked small')
									if (label.length > 0) {
										label[0].remove();
									}
								} else {
									window.alert(chrome.i18n.getMessage('already_linked', response.issuer));
								}
							}, function(error) {
								console.log(error);
							});
						}
					}
				})
			});
		}
		if (response) {
			document.body.setAttribute('keyhub-extension-linked', !!response.linked);
			if (response.linked) {
				let linkextensionFeedback = document.getElementById('feedbackmessage.account.linkextension');
				if (!!linkextensionFeedback) {
					linkextensionFeedback.parentElement.classList.add('is-hidden');
					document.dispatchEvent(new Event('keyhub:sizeheader', { bubbles: true }));
					document.dispatchEvent(new Event('cobra.beyonddatapanelheader', { bubbles: true }));
				}
			}
		}
	}

	const meta = document.querySelector("meta[name='keyhub-issuer']");
	if (meta) {
		const msg = {
			type: 'query',
			issuer: meta.getAttribute('content')
		};
		chrome.runtime.sendMessage(msg).then(handleResponse, function(error) {
			console.log(error);
		});
	}
})();