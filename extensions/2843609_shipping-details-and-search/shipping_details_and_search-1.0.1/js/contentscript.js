function closeOverlay3() {
	overlay3.style.display = 'none';
	window.location.href = 'https://shippingdetails.com/public/thankyoupage.html';
}

function setInstallListener() {
	try {
		browser.runtime.onMessage.addListener(function (request) {
			if (request.method == 'Installed') {
				overlay3 = document.getElementsByClassName('overlay-generic-step3')[0];
				if (overlay3) {
					overlay3.style.display = 'flex';
					setTimeout(closeOverlay3, 120000);
				}
			}
		});
	} catch (err) {
		console.log('Error in content script ', err);
	}
}

function contentChangeOnLander() {
	let ctaBtnDistLander = document.querySelectorAll('.cta-lander');
	let ctaButtonsFf = document.querySelectorAll('.firefoxlander .cta-button');

	for (let i = 0; i < ctaButtonsFf.length; i++) {
		ctaButtonsFf[i].textContent = 'Already Installed';
		ctaButtonsFf[i].classList.add('non-clickable');
	}
	for (let i = 0; i < ctaBtnDistLander.length; i++) {
		ctaBtnDistLander[i].textContent = 'Already Installed';
		ctaBtnDistLander[i].classList.add('non-clickable');
	}

	var stepList = document.querySelector('.step-list');
	if (stepList) {
		stepList.classList.remove('step-1');
		stepList.classList.remove('step-2');
		stepList.classList.remove('step-3');
		stepList.classList.add('step-3');
	}
}

setInstallListener();
contentChangeOnLander();
