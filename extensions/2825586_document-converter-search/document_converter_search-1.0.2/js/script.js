const API_BASE_URL = 'https://documentconverter.com';
const privacyConsentLocalStorageKey = '4c05e08fe4d519e8973fe837fbba8555';
const disabledOverlayLocalStorageKey = '8ac835825d5426f8171bebf147ebc5c9';

const liElements = document.querySelectorAll('.menu li');
const fileDropArea = document.getElementById('right-widget');
const fileInput = document.getElementById('file-input');
const browseButton = document.getElementById('browse-button');
const uploadSection = document.querySelector('.upload-sec');
const convertSection = document.querySelector('.convert-sec');
const closeButtons = document.querySelectorAll('.close-btn');
const convertFiles = document.getElementById('convert-files');
const loader = document.querySelector('.loader-sec');
const downloadSection = document.querySelector('.download-sec');
const multipleFilesInput = document.getElementById('fileInput');
const uploadWrap = document.querySelector('.upload-wrap');
const fileList = document.querySelector('.file-list');
const errorText = document.querySelector('.error-text');
const errorFormatText = document.querySelector('.error-format-text');
const errorUploadText = document.querySelector('.error-upload-text');
const errorConvertText = document.querySelector('.error-convert-text');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const textBelowCta = document.querySelector('.text-2');
const displayImage = document.querySelector('.file-type');
const displayFileName = document.getElementById('converted_file_name');
const displayFileSize = document.querySelector('.file-size');
const previewItemsParent = document.querySelector('.feature-list');
const previewItems = document.querySelectorAll('.feature-list li');
const download = document.getElementById('download');

let selectedMenu, initialMenu, multipleFileFormat, extension, requiredFileType;
let selectedFiles = [];
let idCounter = 0;
let fileIndexCounter = 0;
let totalFileSize = 0;
let isOptedIn = null;
let showDisabledOverlay = null;

const map = {
	//id: [fileType, requiredFileType]
	docToPdf: {
		fileExtension: ['.doc', '.docx'],
		fileType: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
	},
	jpgToPdf: {
		fileExtension: ['.jpg', '.jpeg'],
		fileType: ['image/jpeg'],
	},
	pngToPdf: ['.png', 'image/png'],
	pptToPdf: {
		fileExtension: ['.ppt', '.pptx'],
		fileType: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
	},
	xlsToPdf: {
		fileExtension: ['.xls', '.xlsx'],
		fileType: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
	},
	mergeToPdf: ['*'],
	pdfToDoc: ['.pdf', 'application/pdf'],
	pdfToJpg: ['.pdf', 'application/pdf'],
	pdfToPng: ['.pdf', 'application/pdf'],
	pdfToPpt: ['.pdf', 'application/pdf'],
	pdfToXls: ['.pdf', 'application/pdf'],
	mergePdf: ['.pdf', 'application/pdf'],
};

const multipleFormatMenu = ['docToPdf', 'pptToPdf', 'xlsToPdf', 'jpgToPdf'];

function resetConverter() {
	hideConvertSection();
	hideLoader();
	hideDownloadSection();
	hideUploadWrap();
	showUploadSection();
	selectedFiles = [];
	fileIndexCounter = 0;
	totalFileSize = 0;
	const fileList = document.querySelector('ul.file-list');
	const listItems = fileList.querySelectorAll('li');
	for (const listItem of listItems) {
		fileList.removeChild(listItem);
	}
}

function resetMenu() {
	for (let i = 0; i < liElements.length; i++) {
		liElements[i].classList.remove('selected');
		liElements[i].classList.remove('disabled');
	}
}

function checkForPdfFiles(files) {
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (file.type !== 'application/pdf') {
			const capitalizeExt = extension.toUpperCase() || 'JPG, PNG, PDF, DOC, DOCX, XLS, XSLX, PPT, PPTX';
			const errorMessage = `Wrong file format. Allowed: ${capitalizeExt}`;
			showErrorText(errorMessage);
			return false;
		}
	}
	return true;
}

function uploadFileCheck(files, acceptAttr, selectedMenu) {
	if (acceptAttr && files.length > 0) {
		if (files.length > 1) {
			if (selectedMenu === 'mergePdf' && !checkForPdfFiles(files)) {
				const capitalizeExt = extension.toUpperCase() || 'JPG, PNG, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX';
				const errorMessage = `Wrong file format. Allowed: ${capitalizeExt}`;
				showErrorText(errorMessage);
			} else if ((selectedMenu === 'mergePdf' && checkForPdfFiles(files)) || selectedMenu === 'mergeToPdf') {
				hideUploadSection();
				showConvertSection();
				showUploadWrap();
				displaySelectedFiles(files);
				convertSection.classList.add('multiple');
			} else {
				resetConverter();
				const capitalizeExt = extension.toUpperCase();
				const errorMessage = `Only single file allowed. Allowed: ${capitalizeExt}`;
				showErrorText(errorMessage);
			}
		} else {
			const fileType = files[0].type;
			if (
				fileType === requiredFileType ||
				(multipleFormatMenu.includes(selectedMenu) && requiredFileType.includes(fileType)) ||
				(acceptAttr === '*' &&
					(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/pdf'))
			) {
				hideUploadSection();
				showConvertSection();
				if (selectedMenu === 'mergePdf' || selectedMenu === 'mergeToPdf') {
					showUploadWrap();
				} else {
					hideUploadWrap();
				}

				displaySelectedFiles(files);
			} else {
				resetConverter();
				const capitalizeExt = extension.toUpperCase() || 'JPG, PNG, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX';
				const errorMessage = `Wrong file format. Allowed: ${capitalizeExt}`;
				showErrorText(errorMessage);
			}
		}
	}
}

async function fetchData(jobId, isDownload) {
	try {
		const url = `${API_BASE_URL}/api/preview?jobId=${encodeURIComponent(jobId)}${isDownload ? '&download=true' : ''}`;
		const response = await fetch(url);

		if (response.ok) {
			const url = response.url;

			if (isDownload) {
				window.open(url, '_blank');
			} else {
				return url;
			}
		} else {
			console.error('Error fetching url:', response.statusText);
		}
	} catch (error) {
		resetConverter();
		const errorMessage = `Error while fetching file`;
		showErrorText(errorMessage);
		console.error('Error while fetching url: ', error);
		reject(error);
	}
}

const handleDownload = async (jobId, isDownload) => fetchData(jobId, isDownload);

const executeAction = action => {
	switch (action) {
		case 'Preview':
			window.open(responseUrl, '_blank');
			break;
		case 'Discard':
			deleteJob(jobId);
			break;
		case 'WhatsApp':
			whatsappFunction(shareUrl);
			break;
		case 'Mail':
			mailFunction(shareUrl);
			break;
		case 'Share Link':
			shareLinkFunction(shareUrl);
			break;
		default:
			break;
	}
};
let responseUrl;
let jobId;
let shareUrl;
async function displayMenu(result) {
	jobId = result.jobId;
	const fileSize = result.fileSize / 1024;
	let fileName = result.fileName;
	const fileExtension = fileName.split('.').pop().toLowerCase();
	displayImage.src = `./images/${fileExtension}.svg`;
	displayImage.alt = fileExtension;

	const commaIndex = fileName.indexOf(',');
	if (commaIndex !== -1) {
		fileName = fileName.substring(0, commaIndex).trim();
		fileName = fileName + '_merge.' + fileExtension;
	}

	displayFileName.textContent = `${fileName}`;
	displayFileSize.textContent = `${fileSize.toFixed(2)} KB`;
	try {
		responseUrl = await fetchData(jobId, false);
		shareUrl = `${API_BASE_URL}/api/preview?jobId=${jobId}`;

		previewItems.forEach(li => {
			var old_element = li;
			var new_element = old_element.cloneNode(true);
			old_element.replaceWith(new_element);

			new_element.addEventListener('click', event => {
				const action = li.querySelector('p').textContent;
				event.stopPropagation();
				executeAction(action);
			});
		});
	} catch (error) {
		const errorMessage = `Error while converting the file`;
		showErrorText(errorMessage);
		resetConverter();
		console.error('Error while fetching preview url', error);
	}

	var oldDownload = download;
	var newDownload = oldDownload.cloneNode(true);
	oldDownload.replaceWith(newDownload);
	newDownload.addEventListener('click', () => handleDownload(jobId, true));
}

function whatsappFunction(shareUrl) {
	const whatsappMessage = `${shareUrl}`;
	const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
	window.open(whatsappUrl, '_blank');
}

function mailFunction(shareUrl) {
	const mailtoLinkElement = document.getElementById('mailtoLink');
	const emailBody = `\n${shareUrl}`;
	const mailtoLink = `mailto:?body=${encodeURIComponent(emailBody)}`;
	mailtoLinkElement.setAttribute('href', mailtoLink);
	mailtoLinkElement.click();
}

function shareLinkFunction(shareUrl) {
	const tempInput = document.createElement('input');
	tempInput.value = shareUrl;
	document.body.appendChild(tempInput);

	tempInput.select();
	tempInput.setSelectionRange(0, 99999);

	document.execCommand('copy');
	document.body.removeChild(tempInput);

	const linkCopiedMessage = document.querySelector('.link-copied');
	linkCopiedMessage.style.display = 'flex';
	setTimeout(() => {
		linkCopiedMessage.style.display = 'none';
	}, 3000);
}

function updateListItemIDs() {
	const listItems = document.querySelectorAll('ul.file-list > li');
	listItems.forEach((item, index) => {
		item.id = `fileNo_${index}`;
	});
}

function displaySelectedFiles(files) {
	totalFileSize = 0;
	for (const file of files) {
		totalFileSize += file.size / 1024;
		if (totalFileSize > 5000) {
			resetConverter();
			const errorMessage = `File size exceeds 5 MB limit `;
			showErrorText(errorMessage);
			return;
		}
		const fileData = {
			index: fileIndexCounter++,
			name: file.name,
			type: file.type,
			size: file.size,
			content: file,
		};

		selectedFiles.push(fileData);

		if (selectedFiles.length > 1 && selectedMenu !== 'mergeToPdf' && selectedMenu !== 'mergePdf') {
			selectedFiles.splice(0, selectedFiles.length - 1);
			const fileList = document.querySelector('.file-list');
			while (fileList.firstChild) {
				fileList.removeChild(fileList.firstChild);
			}
		}

		const listItemID = `fileNo_${idCounter++}`;
		const listItem = document.createElement('li');
		listItem.id = listItemID;

		const closeButton = document.createElement('span');
		closeButton.classList.add('close-btn');
		closeButton.innerHTML = '<img src="./images/close-btn.svg" alt="close-btn" />';
		closeButton.addEventListener('click', () => {
			const fileIndex = selectedFiles.findIndex(item => item === fileData);
			listItem.remove();

			if (fileIndex >= 0) {
				selectedFiles.splice(fileIndex, 1);
			}

			if (selectedFiles.length === 0) {
				hideConvertSection();
				showUploadSection();
				hideErrorText();
				showTextBelowCta();
			}
		});

		const filename = file.name;
		const fileSizeKB = file.size / 1024;
		const fileExtension = filename.split('.').pop().toLowerCase();
		const imageSrc = `./images/${fileExtension}.svg`;

		const fileImage = document.createElement('img');
		fileImage.src = imageSrc;
		fileImage.alt = fileExtension;
		fileImage.classList.add('format-file-img');

		const fileDetails = document.createElement('div');
		const fileName = document.createElement('p');
		fileName.classList.add('file_name');
		fileName.textContent = file.name;

		const fileSize = document.createElement('p');
		fileSize.classList.add('file_desc');
		fileSize.textContent = `${fileSizeKB.toFixed(2)} KB`;

		fileDetails.appendChild(fileName);
		fileDetails.appendChild(fileSize);

		listItem.appendChild(closeButton);
		listItem.appendChild(fileImage);
		listItem.appendChild(fileDetails);

		fileList.appendChild(listItem);
	}
}

function handleSearch(e) {
	e.preventDefault();
	const query = searchInput.value.trim();
	if (query !== '') {
		const searchQuery = encodeURIComponent(query);
		const yahooSearchUrl = `https://search.yahoo.com/yhs/search?hspart=ata&hsimp=yhs-003&grd=1&type=type9025810-aal-200001-200002&param1=200001&param2=200002&q=${searchQuery}`;
		window.location.href = yahooSearchUrl;
		searchInput.value = '';
	}
}

async function deleteJob(jobId) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/deleteJob?jobId=${encodeURIComponent(jobId)}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			const showRightWidget = document.getElementById('right-widget');
			showRightWidget.classList.add('disable-upload');
			resetConverter();
			resetMenu();
			hideErrorText();
		} else {
			resetConverter();
			resetMenu();
			const errorMessage = `Error deleting file`;
			showErrorText(errorMessage);
			hideConvertSection();
			showUploadSection();
			console.error('Error deleting job:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

function dragOverHandler(e) {
	e.preventDefault();
	fileDropArea.classList.add('hover');
	const acceptAttr = fileDropArea.getAttribute('data-accept');
	e.dataTransfer.dropEffect = acceptAttr && e.dataTransfer.types.includes('Files') ? 'copy' : 'none';
}

function dragLeaveHandler() {
	fileDropArea.classList.remove('hover');
}

function dropHandler(e) {
	e.preventDefault();
	fileDropArea.classList.remove('hover');
	const acceptAttr = fileDropArea.getAttribute('data-accept');
	uploadFileCheck(e.dataTransfer.files, acceptAttr, selectedMenu);
}

function hideUploadSection() {
	uploadSection.style.display = 'none';
}

function showUploadSection() {
	uploadSection.style.display = 'block';
	fileDropArea.addEventListener('dragover', dragOverHandler);
	fileDropArea.addEventListener('dragleave', dragLeaveHandler);
	fileDropArea.addEventListener('drop', dropHandler);
}

function hideConvertSection() {
	convertSection.style.display = 'none';
}

function showConvertSection() {
	convertSection.style.display = 'block';
}

function hideLoader() {
	loader.style.display = 'none';
}

function showLoader() {
	loader.style.display = 'block';
}

function hideDownloadSection() {
	downloadSection.style.display = 'none';
}

function showDownloadSection() {
	downloadSection.style.display = 'block';
}

function hideUploadWrap() {
	uploadWrap.style.display = 'none';
	convertFiles.textContent = 'Convert';
}

function showUploadWrap() {
	uploadWrap.style.display = 'flex';
	fileDropArea.removeEventListener('dragover', dragOverHandler);
	fileDropArea.removeEventListener('dragleave', dragLeaveHandler);
	fileDropArea.removeEventListener('drop', dropHandler);
	if (selectedMenu === 'mergeToPdf') {
		convertFiles.textContent = 'Merge to PDF';
	} else if (selectedMenu === 'mergePdf') {
		convertFiles.textContent = 'Merge PDF';
	}
}

function hideErrorText() {
	errorText.style.display = 'none';
}

function showErrorText(message) {
	errorText.style.display = 'block';
	errorText.textContent = message;
	hideTextBelowCta();
}

function showTextBelowCta() {
	textBelowCta.style.display = 'block';
}

function hideTextBelowCta() {
	textBelowCta.style.display = 'none';
}

liElements.forEach((li, index) => {
	li.addEventListener('click', () => {
		liElements.forEach(el => {
			el.classList.remove('selected');
		});

		const showRightWidget = document.getElementById('right-widget');
		showRightWidget.classList.remove('disable-upload');

		li.classList.add('selected');
		selectedMenu = li.id;
		if (selectedMenu) {
			initialMenu = selectedMenu;
			let acceptValue;
			if (!multipleFormatMenu.includes(selectedMenu)) {
				acceptValue = map[selectedMenu][0];
				requiredFileType = map[selectedMenu][1];
				extension = acceptValue.substring(1);
			} else {
				extension = map[selectedMenu].fileExtension.map(ext => ext.substring(1)).join(', ');
				acceptValue = map[selectedMenu].fileExtension.join(', ');
				requiredFileType = map[selectedMenu].fileType;
			}
			fileInput.setAttribute('accept', acceptValue);
			multipleFilesInput.setAttribute('accept', acceptValue);
			fileDropArea.setAttribute('data-accept', acceptValue);
		}

		for (let i = 0; i < liElements.length; i++) {
			if (i !== index) {
				liElements[i].classList.add('disabled');
			} else {
				liElements[i].classList.remove('disabled');
			}
		}

		resetConverter();
		hideErrorText();
	});
});

fileDropArea.addEventListener('dragover', dragOverHandler);

fileDropArea.addEventListener('dragleave', dragLeaveHandler);

fileDropArea.addEventListener('drop', dropHandler);

browseButton.addEventListener('click', () => {
	fileInput.click();
});

fileInput.addEventListener('change', e => {
	const files = e.target.files;
	const acceptAttr = fileInput.getAttribute('accept');
	uploadFileCheck(files, acceptAttr, selectedMenu);
});

closeButtons.forEach(closeButton => {
	closeButton.addEventListener('click', () => {
		const listItem = closeButton.closest('li');
		if (listItem) {
			if (listItem === fileList.lastElementChild) {
				hideConvertSection();
				showUploadSection();
				resetMenu();
				hideErrorText();
				showTextBelowCta();
			}
			listItem.remove();
			selectedFiles.splice(0, 1);
		}
	});
});

convertFiles.addEventListener('click', async event => {
	event.preventDefault();
	hideConvertSection();
	showLoader();

	const formData = new FormData();
	for (const file of selectedFiles) {
		formData.append('files', file.content);
	}

	try {
		if (selectedMenu === 'mergeToPdf') {
			selectedMenu = 'mergePdf';
		}
		let endpoint = `${API_BASE_URL}/api/${selectedMenu}`;

		const response = await fetch(endpoint, {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();

			displayMenu(result);
			hideLoader();
			showDownloadSection();
		} else {
			const errorMessage = `Error while converting file.`;
			showErrorText(errorMessage);
			resetConverter();
			resetMenu();
			const errorData = await response.json();
			console.error('Error while converting the file ', errorData);
		}
	} catch (error) {
		const errorMessage = `Error while converting file.`;
		showErrorText(errorMessage);
		resetConverter();
		resetMenu();
		console.error('File cannot be converted ', error);
	}
});

uploadWrap.addEventListener('click', event => {
	multipleFilesInput.click();
});

multipleFilesInput.addEventListener('change', e => {
	const files = e.target.files;
	const acceptAttr = multipleFilesInput.getAttribute('accept');
	uploadFileCheck(files, acceptAttr, selectedMenu);
});

searchForm.addEventListener('submit', handleSearch);

document.addEventListener('DOMContentLoaded', function () {
	isOptedIn = getFromLocalStorage(privacyConsentLocalStorageKey);
	showDisabledOverlay = getFromLocalStorage(disabledOverlayLocalStorageKey);

	const disabledOverlay = document.querySelector('.disabled-overlay');
	const privacyOptinOverlay = document.querySelector('.privacyOptin-overlay');
	const searchBox = document.querySelector('.search-sec');
	const grid = document.querySelector('.grid');

	function getFromLocalStorage(key) {
		const consent = localStorage.getItem(key);
		return consent !== null ? JSON.parse(consent) : null;
	}

	function saveToLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
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
			searchBox.style.display = 'flex';
			grid.style.display = 'flex';
		} else if (showDisabledOverlay) {
			privacyOptinOverlay.style.display = 'none';
			disabledOverlay.style.display = 'flex';
			searchBox.style.display = 'flex';
		} else {
			disabledOverlay.style.display = 'none';
			privacyOptinOverlay.style.display = 'flex';
			searchBox.style.display = 'none';
		}
	}

	const enableOptinCta = document.querySelector('.enable-optinCta');
	const optinCTAAgree = document.querySelector('.optin-cta.agree');
	const optinCTADisAgree = document.querySelector('.optin-cta.disagree');

	enableOptinCta.addEventListener('click', viewPermission);

	optinCTAAgree?.addEventListener('click', function () {
		handleAccept();
	});

	optinCTADisAgree?.addEventListener('click', function () {
		handleDecline();
	});
	updateView();
});

window.addEventListener(
	'dragover',
	function (e) {
		e.preventDefault();
	},
	false
);
window.addEventListener(
	'drop',
	function (e) {
		e.preventDefault();
	},
	false
);
