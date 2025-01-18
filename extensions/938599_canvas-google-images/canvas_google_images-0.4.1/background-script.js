browser.runtime.onMessage.addListener(downloadImage);

function downloadImage(message) {
	browser.downloads.download({ url: message.url, saveAs: message.saveAs });
}