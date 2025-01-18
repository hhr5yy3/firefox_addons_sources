document.getElementById('get-links').addEventListener('click', () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        clearResults();
        showLoader();

        let textarea = document.getElementById('lex-link-search-textarea');
        textarea.disabled = true;
        let toAnalyze = textarea.value;
        browser.runtime.sendMessage(
            { from: 'popup', subject: 'get-links', text: toAnalyze },
            response => {
                hideLoader();
                textarea.disabled = false;

                if (typeof response === 'undefined' || response.status !== 200) {
                    showError('Błąd komunikacji z serwerem. Spróbuj ponownie później.');
                    return;
                }

                let links = JSON.parse(response.links);
                if (links.length === 0) {
                    showError('Nie znaleziono jednostek aktów prawnych.');
                    return;
                }

                links.forEach(addLinkPreview);
            });
    });
});

function showError(message) {
    let error = document.createElement('li');
    error.innerHTML = message;
    
    let linksList = document.getElementById('lex-link-links');
    linksList.appendChild(error);
}

function showLoader() {
    let loader = document.getElementById('lex-link-search-loader');
    loader.style.display = 'inline-block';
}

function hideLoader() {
    let loader = document.getElementById('lex-link-search-loader');
    loader.style.display = 'none';
}

function addLinkPreview(link, index) {
    let linkButton = document.createElement('button');
    linkButton.innerHTML = "Czytaj więcej";
    linkButton.addEventListener('click', () => {
        browser.tabs.create({ url: link.url });
    });

    let linkPreview = document.createElement('li');
    linkPreview.innerHTML = link.preview;
    linkPreview.appendChild(linkButton);

    let linksList = document.getElementById('lex-link-links');
    linksList.appendChild(linkPreview);
}

function clearResults() {
    let linksList = document.getElementById('lex-link-links');
    while (linksList.firstChild !== null) {
        linksList.removeChild(linksList.firstChild);
    }
}

function gotoPage(url) {
    browser.tabs.create({ url: url });
    return false;
}