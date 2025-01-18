function closeOverlay3() {
	overlay3.style.display = 'none';
	overlay3.removeEventListener('click', closeOverlay3);
	window.location.href = 'https://photoeditor.net/public/thankyou_ff.html';
}

function setInstallListener() {
	try {
		browser.runtime.onMessage.addListener(function (request) {
			if (request.method == 'Installed') {
				overlay3 = document.getElementsByClassName('overlay-generic-step3')[0];
				if (overlay3) {
					overlay3.style.display = 'flex';
					overlay3.addEventListener('click', closeOverlay3);
					setTimeout(closeOverlay3, 60000);
				}
			}
		});
	} catch (err) {
		console.log('Error in content script ', err);
	}
}

function contentChangeOnLander() {
	var ctaBtnDistLander = document.querySelector('.cta-lander');
	let ctaButtonsFf = document.querySelectorAll('.firefoxlander .cta-button');

	for (let i = 0; i < ctaButtonsFf.length; i++) {
		ctaButtonsFf[i].textContent = 'Already Installed';
		ctaButtonsFf[i].classList.add('non-clickable');
	}

	if (ctaBtnDistLander) {
		ctaBtnDistLander.textContent = 'Already Installed';
		ctaBtnDistLander.classList.add('non-clickable');
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
