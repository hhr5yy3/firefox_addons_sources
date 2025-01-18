const privacyConsentLocalStorageKey = '251365de352e49c4039594e3357faa41';
const disabledOverlayLocalStorageKey = '9dccc9c28e0ee84b647101fee467b872';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
let isOptedIn = null;
let showDisabledOverlay = null;

function handleSearch(e) {
	e.preventDefault();
	const query = searchInput.value.trim();
	if (query !== '') {
		const searchQuery = encodeURIComponent(query);
		const yahooSearchUrl = `https://search.yahoo.com/yhs/search?hspart=ata&hsimp=yhs-001&type=type9023430-aal-160001-160002&param1=160001&param2=160002&p=${searchQuery}&grd=1`;
		window.location.href = yahooSearchUrl;
		searchInput.value = '';
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const optionTwoReference = document.getElementById('opt2');

	isOptedIn = getFromLocalStorage(privacyConsentLocalStorageKey);
	showDisabledOverlay = getFromLocalStorage(disabledOverlayLocalStorageKey);

	const disabledOverlay = document.querySelector('.disabled-overlay');
	const privacyOptinOverlay = document.querySelector('.privacyOptin-overlay');
	const contentGrid = document.querySelector('.speedtest-result');

	disabledOverlay.style.display = 'none';
	privacyOptinOverlay.style.display = 'none';
	contentGrid.style.display = 'none';

	function getFromLocalStorage(key) {
		const consent = localStorage.getItem(key);
		return consent !== null ? JSON.parse(consent) : null;
	}

	function saveToLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	if (optionTwoReference) {
		optionTwoReference.checked = true;
	}

	function handleAccept() {
		showDisabledOverlay = false;
		isOptedIn = true;
		saveToLocalStorage(privacyConsentLocalStorageKey, true);
		saveToLocalStorage(disabledOverlayLocalStorageKey, showDisabledOverlay);
		updateView();
	}

	function handleDecline() {
		showDisabledOverlay = true;
		isOptedIn = false;
		saveToLocalStorage(privacyConsentLocalStorageKey, false);
		saveToLocalStorage(disabledOverlayLocalStorageKey, showDisabledOverlay);
		updateView();
	}

	function viewPermission() {
		showDisabledOverlay = false;
		isOptedIn = null;
		saveToLocalStorage(privacyConsentLocalStorageKey, null);
		saveToLocalStorage(disabledOverlayLocalStorageKey, showDisabledOverlay);
		updateView();
	}

	function updateView() {
		if (isOptedIn) {
			privacyOptinOverlay.style.display = 'none';
			contentGrid.style.display = 'block';
		} else if (showDisabledOverlay) {
			privacyOptinOverlay.style.display = 'none';
			disabledOverlay.style.display = 'flex';
			contentGrid.style.display = 'none';
		} else {
			disabledOverlay.style.display = 'none';
			privacyOptinOverlay.style.display = 'flex';
			contentGrid.style.display = 'none';
		}
	}

	const enableOptinCta = document.querySelector('.enable-optinCta');
	const optinCTAAgree = document.querySelector('.optin-cta.agree');
	const optinCTADisAgree = document.querySelector('.optin-cta.disagree');

	enableOptinCta.addEventListener('click', viewPermission);

	optinCTAAgree?.addEventListener('click', function () {
		handleAccept();
	})

	optinCTADisAgree?.addEventListener('click', function () {
		handleDecline();
	})
	
	updateView();
});

searchForm.addEventListener('submit', handleSearch);
