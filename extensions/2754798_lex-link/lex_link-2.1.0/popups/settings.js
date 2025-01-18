browser.storage.sync.get({
    "automaticScan": "",
    "rulesAccepted": false
}, function (obj) {
    let automaticScan = obj.automaticScan;
    let automaticScanUlElement = document.getElementById('automatic-scan');

    if (isEmpty(automaticScan)) {
        return;
    }

    automaticScan.split(';').forEach(element => {
        //dodaj tyle przycisków do usuwania urli i obsłuż
        if (isEmpty(element)) return;
        if (element.startsWith('chrome')) {
            automaticScan = automaticScan.replace(element, '').replace(';;', ';')
            return;
        }

        let textsTemplate = "<li><span>" + element + "</span><button>Usuń</button></li>";
        let urlElement = getDOMElementFromString(textsTemplate);

        urlElement.lastChild.onclick = function () {
            automaticScan = automaticScan.replace(element, '').replace(';;', ';');
            automaticScanUlElement.removeChild(urlElement);

            browser.storage.sync.set({
                automaticScan: automaticScan
            });
        }
        automaticScanUlElement.appendChild(urlElement);
    });

    if (!obj.rulesAccepted) {
        for (var el of document.getElementsByTagName('button')) {
            el.setAttribute('disabled', 'disabled');
        }
    }
});

function getDOMElementFromString(s) {
    const element = new DOMParser().parseFromString(s, 'text/html');
    return element.body.firstChild;
}

function isEmpty(str) {
    return (!str || str.length === 0);
}