const scopusURL = 'https://www.scopus.com/sourceid/';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const scopusSourceURL = scopusURL + request.sourceID;

  fetch(scopusSourceURL)
    .then((response) => response.text())
    .then((text) => getScopusPercentil(text))
    .then((percentil) => sendResponse(percentil))
    .catch((error) => {
      `HTTP error! URL: ${scopusSourceURL}, error: ${error}`;
    });

  return true;
});

async function getScopusPercentil(text) {
  var highestPercent = '%';
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  // find percentil elements
  const percentElems = doc.querySelectorAll(
    'div[class="pbContent progress-bar"]'
  );
  // get highest percentil
  for (const percentElem of percentElems) {
    const percent = percentElem.style.split(':')[1];

    if (percent > highestPercent) {
      highestPercent = percent;
    }
  }

  return highestPercent;
}
