import { API_BASE_URL, privacyConsentLocalStorageKey, disabledOverlayLocalStorageKey } from './constants.js';
let isOptedIn = null;
let showDisabledOverlay = null;

const topSection = document.getElementById('topSection');

const trackingForm = document.getElementById('tracking-form');
trackingForm.addEventListener('submit', handleFormSubmit);

//handling privacy optin
if (typeof browser !== 'undefined') {
	document.addEventListener('DOMContentLoaded', function () {
		const optionTwoReference = document.getElementById('opt2');

		isOptedIn = getFromLocalStorage(privacyConsentLocalStorageKey);
		showDisabledOverlay = getFromLocalStorage(disabledOverlayLocalStorageKey);

		const disabledOverlay = document.querySelector('.disabled-overlay');
		const privacyOptinOverlay = document.querySelector('.privacyOptin-overlay');
		const contentGrid = document.querySelector('.grid');
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
				contentGrid.style.display = 'flex';
				topSection.classList.add('show-background');
			} else if (showDisabledOverlay) {
				privacyOptinOverlay.style.display = 'none';
				disabledOverlay.style.display = 'flex';
				contentGrid.style.display = 'none';
				topSection.classList.remove('show-background');
			} else {
				disabledOverlay.style.display = 'none';
				privacyOptinOverlay.style.display = 'flex';
				contentGrid.style.display = 'none';
				topSection.classList.remove('show-background');
			}
		}

		const enableOptinCta = document.querySelector('.enable-optinCta');
		const optinClose = document.querySelector('.optin-close');
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
		// hideBackground();
	});
}

function getCourierCode(courierName) {
	return fetch(`${API_BASE_URL}/api/getCouriers`)
		.then(response => response.json())
		.then(data => {
			const courier = data.find(courier => courier.name === courierName);

			if (courier) {
				return courier.code;
			}

			return null;
		})
		.catch(error => {
			document.getElementById('result-view').style.display = 'none';
			showNotFound();
			console.error('Error:', error);
			return null;
		});
}

function handleFormSubmit(event) {
	event.preventDefault();
	showLoader();

	const trackingNumberInput = document.getElementById('tracking-number-input');
	const courierSelect = document.getElementById('courier-select');
	const trackingNumberInputRes = document.getElementById('tracking-number-input-res');
	const courierSelectRes = document.getElementById('courier-select-res');
	const errorMessage = document.querySelector('.package-num-error');

	let trackingNumber = trackingNumberInput.value;
	let courierName = courierSelect.value;

	if (trackingNumber === '') {
		errorMessage.style.display = 'flex';

		const hideErrorMessage = () => {
			errorMessage.style.display = 'none';
		};

		setTimeout(hideErrorMessage, 5000);
		trackingNumber = trackingNumberInputRes.value;
		courierName = courierSelectRes.value;

		if (trackingNumber === '') {
			showNotFound();
			return;
		}
	}

	updateURL(trackingNumber, courierName);

	if (trackingNumberInput.value.trim() === '' && trackingNumberInputRes.value.trim() === '') {
		showLoader();

		errorMessage.style.display = 'flex';

		const hideErrorMessage = () => {
			errorMessage.style.display = 'none';
		};

		setTimeout(hideErrorMessage, 5000);
		return;
	}

	showResultView();

	const notFoundElement = document.getElementById('notFound');
	notFoundElement.style.display = 'none';

	if (trackingNumber) {
		getDetails(trackingNumber, courierName);
	} else {
		errorMessage.textContent = 'Please Enter Something';
		showNotFound();
	}
}

function getDetails(trackingNumber, courierName) {
	getCourierCode(courierName).then(courierCode => {
		if (trackingNumber && courierCode) {
			const trackPackageUrl = `${API_BASE_URL}/api/trackPackage?trackingNumber=${trackingNumber}&courierCode=${courierCode}`;

			fetch(trackPackageUrl)
				.then(response => response.json())
				.then(data => {
					if (data.meta.code === 200) {
						const searchContainer = document.getElementById('result-view');
						searchContainer.style.display = 'flex';
						renderPackageResult(data, courierName);
						document.getElementById('loader').style.display = 'none';
					} else {
						showNotFound();
						return;
					}
				})
				.catch(error => {
					console.error('Error:', error);
					document.getElementById('result-view').style.display = 'none';
					showNotFound();
				});
		} else {
			document.getElementById('loader').style.display = 'none';
			const errorMessage = document.querySelector('.package-num-error');
			errorMessage.style.display = 'flex';
			const hideErrorMessage = () => {
				errorMessage.style.display = 'none';
			};
			setTimeout(hideErrorMessage, 5000);
			showNotFound();
		}
	});
}

function renderPackageResult(data, courierName) {
	const resultViewTop = document.querySelector('.result-view-top');
	const carrInfo = document.querySelector('.carr-info');
	const currStatus = document.querySelector('.curr-status');
	const locInfo = document.querySelector('.loc-info');

	resultViewTop ? clearElement(resultViewTop) : null;
	carrInfo ? clearElement(carrInfo) : null;
	currStatus ? clearElement(currStatus) : null;
	locInfo ? clearElement(locInfo) : null;


	if (data && data.data && data.data.length > 0) {
		const packageData = data.data[0];
		const deliveryStatus = packageData.delivery_status;

		if (deliveryStatus === 'notfound') {
			document.getElementById('result-view').style.display = 'none';
			showNotFound();
		} else {
			const trackingNumber = packageData.tracking_number;
			const courierCode = packageData.courier_code;
			const originCountry = packageData.origin_country || '-';
			const destinationCountry = packageData.destination_country || '-';
			const website = packageData.origin_info.weblink;

			//Top view
			{
				const carrInfoContainer = document.createElement('div');
				carrInfoContainer.classList.add('carr-info');

				const carrierInfo = document.createElement('p');
				const carrierSpan = document.createElement('span');
				const carrierImg = document.createElement('img');
				carrierImg.classList.add('ups');
				carrierImg.src = './images/generic.svg';
				carrierImg.alt = 'carr-icon';
				const trackingNumberText = document.createTextNode(trackingNumber);
				carrierSpan.appendChild(carrierImg);
				carrierSpan.appendChild(trackingNumberText);
				carrierInfo.appendChild(carrierSpan);
				carrInfoContainer.appendChild(carrierInfo);

				const carrText2 = document.createElement('p');
				carrText2.classList.add('carr-text-2');
				const officialWebsiteLink = website ? document.createElement('a') : document.createElement('span');
				if (website) {
					officialWebsiteLink.href = website;
					officialWebsiteLink.target = '_blank';
					officialWebsiteLink.textContent = 'Official Website';
					officialWebsiteLink.classList.add('official-website');
				} else {
					officialWebsiteLink.textContent = courierCode;
					officialWebsiteLink.id = 'carr-code';
				}
				carrText2.appendChild(officialWebsiteLink);
				carrInfoContainer.appendChild(carrText2);

				resultViewTop.appendChild(carrInfoContainer);

				const camelCaseStatus = deliveryStatus.charAt(0).toUpperCase() + deliveryStatus.slice(1);
				const currPackStatus = document.querySelector('.curr-pack-status');
				currPackStatus.textContent = camelCaseStatus;

				const locInfoContainer = document.createElement('ul');
				locInfoContainer.classList.add('loc-info');

				const originCountryItem = document.createElement('li');
				const originCountryImgSpan = document.createElement('span');
				const originCountryImg = document.createElement('img');
				originCountryImg.src = './images/package-icon.svg';
				originCountryImg.alt = 'package-icon';
				const originCountryTextSpan = document.createElement('span');
				originCountryTextSpan.classList.add('origin-country');
				const originCountryText = document.createTextNode(`Origin Country: ${originCountry}`);
				originCountryImgSpan.appendChild(originCountryImg);
				originCountryItem.appendChild(originCountryImgSpan);
				originCountryTextSpan.appendChild(originCountryText);
				originCountryItem.appendChild(originCountryTextSpan);
				locInfoContainer.appendChild(originCountryItem);

				const destinationCountryItem = document.createElement('li');
				const destinationCountryImgSpan = document.createElement('span');
				const destinationCountryImg = document.createElement('img');
				destinationCountryImg.src = './images/loc-icon.svg';
				destinationCountryImg.alt = 'loc-icon';
				const destinationCountryTextSpan = document.createElement('span');
				destinationCountryTextSpan.classList.add('destination-country');
				const destinationCountryText = document.createTextNode(`Destination Country: ${destinationCountry}`);
				destinationCountryImgSpan.appendChild(destinationCountryImg);
				destinationCountryItem.appendChild(destinationCountryImgSpan);
				destinationCountryTextSpan.appendChild(destinationCountryText);
				destinationCountryItem.appendChild(destinationCountryTextSpan);
				locInfoContainer.appendChild(destinationCountryItem);

				resultViewTop.appendChild(locInfoContainer);

				const shareInfo = document.createElement('div');
				shareInfo.classList.add('share-button', 'share-status', 'share-icon');
				const shareSpan = document.createElement('span');
				shareSpan.textContent = 'Share the status';
				const shareList = document.createElement('ul');
				shareList.classList.add('share-icon');

				const whatsappLink = document.createElement('a');
				whatsappLink.href = '#';
				whatsappLink.classList.add('whatsapp');
				const whatsappImg = document.createElement('img');
				whatsappImg.src = './images/whatsap.svg';
				whatsappImg.alt = 'whatsapp';
				whatsappLink.appendChild(whatsappImg);
				const whatsappListItem = document.createElement('li');
				whatsappListItem.appendChild(whatsappLink);
				shareList.appendChild(whatsappListItem);

				const emailLink = document.createElement('a');
				emailLink.href = '#';
				emailLink.classList.add('email');
				const emailImg = document.createElement('img');
				emailImg.src = './images/email.svg';
				emailImg.alt = 'email';
				emailLink.appendChild(emailImg);
				const emailListItem = document.createElement('li');
				emailListItem.appendChild(emailLink);
				shareList.appendChild(emailListItem);

				const mailtoLink = document.createElement('a');
				mailtoLink.href = '#';
				mailtoLink.id = 'mailtoLink';
				const mailtoListItem = document.createElement('li');
				mailtoListItem.style.display = 'none';
				mailtoListItem.appendChild(mailtoLink);
				shareList.appendChild(mailtoListItem);

				const copyLink = document.createElement('a');
				copyLink.href = '#';
				copyLink.classList.add('copy');
				const copyImg = document.createElement('img');
				copyImg.src = './images/copy-link.svg';
				copyImg.alt = 'shared';
				copyLink.appendChild(copyImg);
				const copyListItem = document.createElement('li');
				const copyDiv = document.createElement('div');
				copyDiv.classList.add('copy-link');
				copyDiv.style.display = 'none';
				copyDiv.textContent = 'Link Copied';
				copyListItem.appendChild(copyLink);
				copyListItem.appendChild(copyDiv);
				shareList.appendChild(copyListItem);

				shareInfo.appendChild(shareSpan);
				shareInfo.appendChild(shareList);

				resultViewTop.appendChild(shareInfo);

			}

			//Bottom view starts here
			const trackingDetails1 = packageData.origin_info.trackinfo;
			if (trackingDetails1 && trackingDetails1.length > 0) {
				renderStatusBar(trackingDetails1[0]?.checkpoint_delivery_status || 'exception');
				let trackingDetails = trackingDetails1.reverse();

				let infoReceivedSubElementsList = [];
				let inTransitSubElementsList = [];
				let outForDeliverySubElementsList = [];
				let deliveredSubElementsList = [];
				for (let eachDetail of trackingDetails) {
					let sublistElement = createDynamicSubListElemen(eachDetail);
					sublistElement.classList.add('sub-delivery');

					switch (eachDetail.checkpoint_delivery_status) {
						case 'inforeceived':
							sublistElement.classList.add('sub-delivery-inforeceived');
							infoReceivedSubElementsList.push(sublistElement);
							break;
						case 'transit':
							sublistElement.classList.add('sub-delivery-intransit');
							inTransitSubElementsList.push(sublistElement);
							break;
						case 'pickup':
							sublistElement.classList.add('sub-delivery-outfordelivery');
							outForDeliverySubElementsList.push(sublistElement);
							break;
						case 'delivered':
							sublistElement.classList.add('sub-delivery-delivered');
							deliveredSubElementsList.push(sublistElement);
							break;
						default:
							break;
					}
				}
				insertElementsInMainList(infoReceivedSubElementsList, inTransitSubElementsList, outForDeliverySubElementsList, deliveredSubElementsList);
				const mainListItems = document.querySelectorAll('ul li.main-status');

				// Add event listener to each list item
				mainListItems.forEach(listItem => {
					if (!listItem.classList.contains('delivery-delivered'))
						listItem.addEventListener('click', handleListItemClick);
				});
			}


			//Sharing feature
			{
				const whatsappShareButton = document.querySelector('.whatsapp');
				const emailShareButton = document.querySelector('.email');
				const copyLinkButton = document.querySelector('.copy');

				const shareUrl = `${API_BASE_URL}/homepage.html?trackingNumber=${trackingNumber}&carrierCode=${courierName}`;

				whatsappShareButton.addEventListener('click', event => {
					event.preventDefault();
					const whatsappMessage = `Check out this package tracking link: ${shareUrl}`;
					const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
					window.open(whatsappUrl, '_blank');
				});

				emailShareButton.addEventListener('click', event => {
					event.preventDefault();
					const mailtoLinkElement = document.getElementById('mailtoLink');
					const emailSubject = 'Check out this package tracking link!';
					const emailBody = `\n\n${shareUrl}`;
					const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
					mailtoLinkElement.setAttribute('href', mailtoLink);
					mailtoLinkElement.click();
				});

				copyLinkButton.addEventListener('click', event => {
					event.preventDefault();
					const tempInput = document.createElement('input');
					tempInput.value = shareUrl;
					document.body.appendChild(tempInput);

					tempInput.select();
					tempInput.setSelectionRange(0, 99999);

					document.execCommand('copy');
					document.body.removeChild(tempInput);

					const linkCopiedMessage = document.querySelector('.copy-link');
					linkCopiedMessage.style.display = 'flex';
					setTimeout(() => {
						linkCopiedMessage.style.display = 'none';
					}, 3000);
				});
			}
		}
	} else {
		showNotFound();
	}
}

function showResultView() {
	const searchContainer = document.querySelector('.Package-cont-search');
	const resultContainer = document.querySelector('.Package-cont-result');
	const trackingFormRes = document.getElementById('tracking-form-res');

	searchContainer.style.display = 'none';
	resultContainer.style.display = 'block';

	if (trackingFormRes !== null) {
		const resultViewTop = document.querySelector('.result-view-top');
		const carrInfo = document.querySelector('.carr-info');
		const currStatus = document.querySelector('.curr-status');
		const locInfo = document.querySelector('.loc-info');

		resultViewTop ? clearElement(resultViewTop) : null;
		carrInfo ? clearElement(carrInfo) : null;
		currStatus ? clearElement(currStatus) : null;
		locInfo ? clearElement(locInfo) : null;

		trackingFormRes.addEventListener('submit', handleFormSubmit);

		const closeButton = document.getElementById('close-button');
		closeButton.style.display = 'flex';
	}
}

function showLoader() {
	const elementsToDelete = document.querySelectorAll('.sub-delivery');
	elementsToDelete.forEach(element => {
		element.remove();
	});
	const elementsToRemoveClass = document.querySelectorAll('.main-status');
	elementsToRemoveClass.forEach(element => {
		element.classList.remove('passed');
		element.classList.remove('inprocess');
		element.classList.remove('nonexpandable');
		element.classList.remove('expanded');
		element.querySelector('.date').textContent = '';
		element.querySelector('.time').textContent = '';
	});

	document.getElementById('loader').style.display = 'flex';
	document.getElementById('close-button').style.display = 'flex';
	document.getElementById('notFound').style.display = 'none';
	document.getElementById('result-view').style.display = 'none';
}

function showNotFound() {
	document.getElementById('loader').style.display = 'none';
	document.getElementById('close-button').style.display = 'flex';
	document.getElementById('notFound').style.display = 'flex';
	document.getElementById('result-view').style.display = 'none';
}
function showSearchView() {
	const searchContainer = document.querySelector('.Package-cont-search');
	const resultContainer = document.querySelector('.Package-cont-result');
	const trackingNumberInput = document.getElementById('tracking-number-input');
	const courierSelect = document.getElementById('courier-select');
	const trackingNumberInputRes = document.getElementById('tracking-number-input-res');
	const courierSelectRes = document.getElementById('courier-select-res');

	searchContainer.style.display = 'block';
	resultContainer.style.display = 'none';

	trackingNumberInput.value = '';
	courierSelect.value = 'Carrier (Optional)';
	trackingNumberInputRes.value = '';
	courierSelectRes.value = 'Carrier (Optional)';
}

const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
	showSearchView();
	const params = new URLSearchParams(window.location.search);
	params.delete('trackingNumber');
	params.delete('carrierCode');
	const urlWithoutParams = window.location.origin + window.location.pathname;
	window.history.replaceState({}, document.title, urlWithoutParams);
});

function renderStatusBar(deliveryStatus) {
	const inforeceived = document.querySelector(".delivery-inforeceived");
	const intransit = document.querySelector(".delivery-intransit");
	const outfordelivery = document.querySelector(".delivery-outfordelivery");
	const delivered = document.querySelector(".delivery-delivered");

	switch (deliveryStatus) {
		case "inforeceived":
			inforeceived.classList.add("inprocess");
			break;
		case "transit":
			inforeceived.classList.add("passed");
			intransit.classList.add("inprocess");
			break;
		case "pickup":
			intransit.classList.add("passed");
			inforeceived.classList.add("passed");
			outfordelivery.classList.add("inprocess");
			break;
		case "delivered":
			intransit.classList.add("passed");
			inforeceived.classList.add("passed");
			outfordelivery.classList.add("passed");
			delivered.classList.add("passed");
			break;
		default:
			break;
	}
}

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

function handleSearch(e) {
	e.preventDefault();
	const query = searchInput.value.trim();
	if (query !== '') {
		const searchQuery = encodeURIComponent(query);
		const yahooSearchUrl = `https://search.yahoo.com/yhs/search?hspart=ata&hsimp=yhs-003&type=type9057781-aal-240001-240002&param1=240001&param2=240002&p=${searchQuery}&grd=1`;
		window.location.href = yahooSearchUrl;
		searchInput.value = '';
	}
}

searchForm.addEventListener('submit', handleSearch);

function updateURL(trackingNumber, carrierCode) {
	const params = new URLSearchParams({
		trackingNumber: trackingNumber,
		carrierCode: carrierCode,
	});
	const newURL = `${window.location.pathname}?${params}`;
	history.pushState({}, '', newURL);
}

window.onload = function () {
	const urlParams = new URLSearchParams(window.location.search);
	const trackingNumber = urlParams.get('trackingNumber');
	const courierCode = urlParams.get('carrierCode');

	if (trackingNumber !== null && courierCode !== null) {
		document.getElementById('tracking-number-input-res').value = trackingNumber;
		document.getElementById('courier-select-res').value = courierCode;
		showLoader();
		showResultView();
		getDetails(trackingNumber, courierCode);
	}
};

const trackingNumberInput = document.getElementById('tracking-number-input');
const courierSelect = document.getElementById('courier-select');
const trackingNumberInputRes = document.getElementById('tracking-number-input-res');
const courierSelectRes = document.getElementById('courier-select-res');

trackingNumberInput.addEventListener('input', () => {
	trackingNumberInputRes.value = trackingNumberInput.value;
});

courierSelect.addEventListener('change', () => {
	courierSelectRes.value = courierSelect.value;
});

trackingNumberInputRes.addEventListener('input', () => {
	trackingNumberInput.value = trackingNumberInputRes.value;
});

courierSelectRes.addEventListener('change', () => {
	courierSelect.value = courierSelectRes.value;
});

window.addEventListener('popstate', () => {
	const urlParams = new URLSearchParams(window.location.search);
	if (!urlParams.has('trackingNumber') && !urlParams.has('carrierCode')) {
		showSearchView();
	}
	history.replaceState(null, null, window.location.pathname);
});

const selectElement = document.getElementById('courier-select');

selectElement.addEventListener('change', function () {
	const optionalOption = selectElement.querySelector('option:first-child');
	const selectedOption = selectElement.options[selectElement.selectedIndex].value;

	if (selectedOption !== 'Carrier (Optional)') {
		optionalOption.disabled = true;
	}
});

const selectElementRes = document.getElementById('courier-select-res');

selectElementRes.addEventListener('change', function () {
	const optionalOption = document.getElementById('optional');
	const selectedOption = selectElementRes.options[selectElementRes.selectedIndex].value;

	if (selectedOption !== 'Carrier (Optional)') {
		optionalOption.disabled = true;
	}
});

function createDynamicSubListElemen(eachDetail) {
	const listItem = document.createElement('li');
	listItem.classList.add('result-view', 'delivery-detail'); // Add classes to the list item

	// Create date-time-details div
	const dateTimeDetails = document.createElement('div');
	dateTimeDetails.classList.add('date-time-details'); // Add class to the div

	// Create and append date and time paragraphs to date-time-details div
	const dateParagraph = document.createElement('p');
	dateParagraph.classList.add('date');
	let formattedDate = getFormattedDate(eachDetail);
	dateParagraph.textContent = formattedDate;
	dateTimeDetails.appendChild(dateParagraph);

	const timeParagraph = document.createElement('p');
	timeParagraph.classList.add('time');
	let formattedTime = getFormattedTime(eachDetail);
	timeParagraph.textContent = formattedTime;
	dateTimeDetails.appendChild(timeParagraph);

	// Append date-time-details div to list item
	listItem.appendChild(dateTimeDetails);

	// Create empty item div
	const itemDiv = document.createElement('div');
	itemDiv.classList.add('item'); // Add class to the div
	listItem.appendChild(itemDiv);

	// Create package-status-main div
	const packageStatusMain = document.createElement('div');
	packageStatusMain.classList.add('package-status-main'); // Add class to the div
	packageStatusMain.textContent = eachDetail.tracking_detail; // Set text content
	listItem.appendChild(packageStatusMain);

	return listItem;
}

function getFormattedDate(detail) {
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const checkpointDate = new Date(detail.checkpoint_date);
	const day = checkpointDate.getDate();
	const month = monthNames[checkpointDate.getMonth()];
	const year = checkpointDate.getFullYear().toString().slice(-2);
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}

function getFormattedTime(detail) {
	const checkpointDate = new Date(detail.checkpoint_date);
	const hour = checkpointDate.getHours();
	const minute = checkpointDate.getMinutes();
	const period = hour >= 12 ? 'pm' : 'am';
	const formattedHour = hour % 12 || 12;
	const formattedMinute = minute.toString().padStart(2, '0');
	const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
	return formattedTime;
}

function insertElementsInMainList(infoReceivedSubElementsList, inTransitSubElementsList, outForDeliverySubElementsList, deliveredSubElementsList) {
	const parentUL = document.getElementById('parent-ul'); // Get the parent ul element by its ID
	let infoReceivedIndex = 0;
	let inTransitIndex = 1;
	let outForDeliveryIndex = 2;
	let deliveredIndex = 3;

	for (let listItem of infoReceivedSubElementsList) {
		const referenceNode = parentUL.children[inTransitIndex];
		parentUL.insertBefore(listItem, referenceNode);
		inTransitIndex++;
		outForDeliveryIndex++;
		deliveredIndex++;
	}
	for (let listItem of inTransitSubElementsList) {
		const referenceNode = parentUL.children[outForDeliveryIndex];
		parentUL.insertBefore(listItem, referenceNode);
		outForDeliveryIndex++;
		deliveredIndex++;
	}
	for (let listItem of outForDeliverySubElementsList) {
		const referenceNode = parentUL.children[deliveredIndex];
		parentUL.insertBefore(listItem, referenceNode);
		deliveredIndex++;
	}
	// for(let listItem of deliveredSubElementsList){
	// 	parentUL.appendChild(listItem);
	// }

	if (infoReceivedSubElementsList.length < 1) {
		document.querySelector('.delivery-inforeceived').classList.add('nonexpandable');
	}
	if (inTransitSubElementsList.length < 1) {
		document.querySelector('.delivery-intransit').classList.add('nonexpandable');
	}
	if (outForDeliverySubElementsList.length < 1) {
		document.querySelector('.delivery-outfordelivery').classList.add('nonexpandable');
	}
	document.querySelector('.delivery-delivered').classList.add('nonexpandable');


	document.querySelector('.delivery-inforeceived .date').textContent = infoReceivedSubElementsList[0]?.querySelector('.date').textContent || "";
	document.querySelector('.delivery-intransit .date').textContent = inTransitSubElementsList[0]?.querySelector('.date').textContent || "";
	document.querySelector('.delivery-outfordelivery .date').textContent = outForDeliverySubElementsList[0]?.querySelector('.date').textContent || "";
	document.querySelector('.delivery-delivered .date').textContent = deliveredSubElementsList[0]?.querySelector('.date').textContent || "";

	document.querySelector('.delivery-inforeceived .time').textContent = infoReceivedSubElementsList[0]?.querySelector('.time').textContent;
	document.querySelector('.delivery-intransit .time').textContent = inTransitSubElementsList[0]?.querySelector('.time').textContent;
	document.querySelector('.delivery-outfordelivery .time').textContent = outForDeliverySubElementsList[0]?.querySelector('.time').textContent;
	document.querySelector('.delivery-delivered .time').textContent = deliveredSubElementsList[0]?.querySelector('.time').textContent;

}

function handleListItemClick() {
	const targetClassList = this.classList;
	const classMapping = {
		'delivery-inforeceived': 'sub-delivery-inforeceived',
		'delivery-intransit': 'sub-delivery-intransit',
		'delivery-outfordelivery': 'sub-delivery-outfordelivery',
		'delivery-delivered': 'sub-delivery-delivered'
	};
	Object.keys(classMapping).forEach(deliveryClass => {
		if (targetClassList.contains(deliveryClass)) {
			const subDeliveryClass = classMapping[deliveryClass];
			const subDeliveryInfos = document.querySelectorAll('.' + subDeliveryClass);
			subDeliveryInfos.forEach(subDeliveryInfo => {
				subDeliveryInfo.style.display = (subDeliveryInfo.style.display != 'flex') ? 'flex' : 'none';
			});
			if (subDeliveryInfos[0]?.style.display == 'flex') {
				this.classList.add('expanded');
			} else {
				this.classList.remove('expanded');
			}
		}
	});
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}