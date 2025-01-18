'use strict';

var processCanceled = false;

browser.runtime.onMessage.addListener(
    function (request, sender, response) {
        if (request.from === 'background' && request.subject === 'linkSelection') {
            linkSelection();
            return true;
        }

        if (request.from === 'popup' && request.subject === 'link') {
            const element = document.getElementById('lex-link-popup');
            if (typeof element !== 'undefined' && element !== null) {
                removePopup();
            }
            
            removeAllLexLinks();
            linkAllParagraphs();
            return true;
        }

        if (request.from === 'popup' && request.subject === 'get-content') {
            response({ from: 'content', content: getContent() });
            return true;
        }
        return false;
    });


var read = function (name, deflt) {
    return browser.storage.sync.get([name])
        .then(result => {
            if (browser.runtime.lastError) { // assuming this exists
                throw new Error(browser.runtime.lastError);
            }

            return result[name] || deflt
        })
};

read('rulesAccepted', false).then(function (rulesAccepted) {
    if (!rulesAccepted) return;

    read('automaticScan', '').then(function (automaticScan) {
        if (automaticScan === '') return;

        if (checkIfCurrentPageIsOnList(automaticScan.split(';'))) {
            linkAllParagraphs();
        }
    });
});

function getContent() {
    let paragraphs = Array.from(document.getElementsByTagName('p'));
    paragraphs = paragraphs.filter(item => !checkIfInPopup(item));

    let content = '';
    const paragraphsCount = paragraphs.length;
    for (let i = 0; i < paragraphsCount; i++) {
        const p = paragraphs[i];

        if (checkIfInPopup(p)) {
            continue;
        }

        content += p.innerText + '\r\n';
    }
    return content;
}

async function linkTextNode(documentId, node, parent, range) {
    if (node.textContent.trim() === '') {
        return;
    }

    return new Promise((resolve, reject) => {
        browser.runtime.sendMessage(
            {
                from: 'content',
                subject: 'link',
                documentId: documentId,
                paragraphHtml: node.textContent
            },
            response => {
                if (typeof response === 'undefined') {
                    reject('Wystąpił błąd, sprawdź połączenie z internetem.');
                }
                else if (response.status === 403) {
                    reject('Twoja wersja wtyczki jest przestarzała! Pobierz nową wersję.');
                }
                else if (response.status === 429) {
                    reject('Przekroczono limit zapytań.');
                }

                else if (typeof response !== 'undefined' && response.status === 200) {

                    var linkedParagraph = getDOMElementFromString(response.html);
                    InsertLinksIntoTextNode(node, linkedParagraph, parent, range);
                    
                    var tooltips = document.querySelectorAll('.lex-link-preview');
                    tooltips.forEach(function (tooltip, index) {
                        tooltip.parentNode.addEventListener('mouseover', correctTooltipPosition);
                    });

                    resolve();
                }
                else {
                    reject('Wystąpił błąd, sprawdź połączenie z internetem.');
                }
            });
    });
}

function InsertLinksIntoTextNode(node, linked, parent, range) {
    let arr = [];
    do {
        arr.push(linked);
        linked = linked.nextSibling;
    } while (linked !== null);

    arr.reverse();
    arr.forEach(function (el, index) {
        range.insertNode(el);
    });        

    range.setStart(arr[0].nextSibling, 0);
    range.deleteContents();
}

async function linkAllParagraphs() {
    let paragraphs = Array.from(document.getElementsByTagName('p'));
    paragraphs = paragraphs.filter(item => !checkIfInPopup(item));

    await linkParagraphs(paragraphs);
}

async function linkSelection() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    let parent = range.commonAncestorContainer;
    let clone = range.cloneContents();

    if (parent.nodeType === Node.TEXT_NODE) {
        let documentId = createGUID();

        createProgressWindow();

        linkTextNode(documentId, clone, parent, range)
            .then(() => {
                updateProgress(100);

                RefreshTooltips();
                ReleaseDocument(documentId);
                showSuccess();

            })
            .catch((reason) => {
                showError(reason);
            });

        selection.empty();
        return true;
    }

    var allWithinRangeParent = parent.getElementsByTagName("*");
    var allSelected = [];
    for (var i = 0, el; el = allWithinRangeParent[i]; i++) {
        // The second parameter says to include the element 
        // even if it's not fully selected
        if (selection.containsNode(el, true)) {
            allSelected.push(el);
        }
    }

    await linkParagraphs(allSelected);

    selection.empty();
}

async function linkParagraphs(paragraphs) {
    createProgressWindow();

    const paragraphsCount = paragraphs.length;
    let documentId = createGUID();

    for (let i = 0; i < paragraphsCount; i++) {
        if (processCanceled) return false;

        const p = paragraphs[i];
        
        if (checkIfInPopup(p)) {
            continue;
        }

        await linkParagraph(documentId, p)
            .then(() => {
                const progress = 100 * (i + 1) / paragraphsCount;
                updateProgress(progress);
            })
            .catch((reason) => {
                showError(reason);
            });
    }
    RefreshTooltips();
    ReleaseDocument(documentId);    
    showSuccess();
    return true;
}

function createGUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function checkIfInPopup(element) {
    const popup = element.closest('#lex-link-popup');
    return popup !== null;
}

function ReleaseDocument(documentId) {
    return new Promise((resolve, reject) => {
        browser.runtime.sendMessage(
            {
                from: 'content',
                subject: 'release',
                documentId: documentId
            }, response => { });
    });
}

function linkParagraph(documentId, p) {
    removeLexLinksFromElement(p);
    return new Promise((resolve, reject) => {
        browser.runtime.sendMessage(
            {
                from: 'content',
                subject: 'link',
                documentId: documentId,
                paragraphHtml: p.outerHTML
            },
            response => {
                if (typeof response === 'undefined') {
                    reject('Wystąpił błąd, sprawdź połączenie z internetem.');
                }
                else if (response.status === 403) {
                    reject('Twoja wersja wtyczki jest przestarzała! Pobierz nową wersję.');
                }
                else if (response.status === 429) {
                    reject('Przekroczono limit zapytań.');
                }
                    
                else if (typeof response !== 'undefined' && response.status === 200) {

                    var linkedParagraph = getDOMElementFromString(response.html);

                    InsertLinksIntoParagraph(p, linkedParagraph);

                    resolve();
                }                
                else {
                    reject('Wystąpił błąd, sprawdź połączenie z internetem.');
                }                
            });
    });
}

function RefreshTooltips() {
    var tooltips = document.querySelectorAll('.lex-link-preview');
    tooltips.forEach(function (tooltip, index) {
        tooltip.parentNode.addEventListener('mouseover', correctTooltipPosition);
    });

}

function InsertLinksIntoParagraph(original, linked) {
    if (typeof linked === 'undefined') {
        return;
    }

    let j = 0;
    const linkedLength = linked.childNodes.length; 

    for (let i = 0; i < original.childNodes.length; i++) {
        const child = original.childNodes[i];

        if (child.nodeType !== Node.TEXT_NODE) {
            InsertLinksIntoParagraph(child, linked.childNodes[j]);
        } else {           
            //jeżeli ten lub następny node to a.wkp-link to zacznij czarowanie
            if (elementIsWkpLink(linked.childNodes[j]) || elementIsWkpLink(linked.childNodes[j + 1])) {
                let linkedChild = linked.childNodes[j];      

                while (typeof linkedChild !== 'undefined'
                    && (linkedChild.nodeType === Node.TEXT_NODE || elementIsWkpLink(linkedChild))) {
                    original.insertBefore(linkedChild, child);
                    linkedChild = linked.childNodes[j];
                    i++;
                }
                //posprzątaj original.childNodes
                original.removeChild(child);    

                while (original.childNodes.length > linkedLength) {
                    original.removeChild(original.childNodes[i]);
                }

                i--;
                j--;
            }
        }
        j++;
    }
}

function elementIsWkpLink(element) {
    return typeof element !== 'undefined'
        && element.tagName === 'A'
        && element.classList.contains('wkp-link');
}

function correctTooltipPosition() {
    var tooltip = this.querySelector('.lex-link-preview');
    var tooltipRect = tooltip.getBoundingClientRect();

    var tipX = window.getComputedStyle(tooltip).getPropertyValue('left').replace('px', ''); 
    var tipY = window.getComputedStyle(tooltip).getPropertyValue('top').replace('px', '');

    tooltip.style.left = tipX + 'px';
    tooltip.style.top = tipY + 'px';

    if (tooltipRect.width > window.innerWidth) {
        tooltip.style.width = window.innerWidth - 20 + 'px';
        tooltipRect = tooltip.getBoundingClientRect();
    }

    if (tooltipRect.x < 0) {
        tooltip.style.left = tipX - tooltipRect.x + 'px';
        tooltipRect = tooltip.getBoundingClientRect();
    }

    if (tooltipRect.x + tooltipRect.width + 20 > window.innerWidth) {
        const diff = tooltipRect.x + tooltipRect.width + 20 - window.innerWidth;
        tooltip.style.left = tipX - diff + 'px';       
    } 

    if (tooltipRect.y < 0) {
        tooltip.style.top = tipY - tooltipRect.y + 'px';
    }    
}

function createProgressWindow() {   
    const element = createPopup();
    addHeader(element);

    const textsTemplate =
        '<div class="lex-link-texts">' +
        '    <h1>Trwa linkowanie</h1>' +
        '    <p>LEX Link działa w tle. Jednoczesne przeglądanie strony jest możliwe</p>' +
        '</div>';

    const progressBarTemplate =
        '<div id="lex-link-progressbar"><div id="lex-link-progress"></div></div>';

    const cancelButtonTemplate = '<button class="lex-link-button">Przerwij skanowanie</button>';

    element.appendChild(getDOMElementFromString(textsTemplate));
    element.appendChild(getDOMElementFromString(progressBarTemplate));

    const close = getDOMElementFromString(cancelButtonTemplate);
    close.addEventListener("click", function () {
        processCanceled = true;
        removePopup();
    });
    element.appendChild(close);
}

function addHeader(element) {
    const headerTemplate =
        '<div class="lex-link-header">' +
        '    <div id="lex-link-logo">' +
        '        <img class="pixel" src="data:image/png;base64,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" />' +
        '        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDQuNTE4IiBoZWlnaHQ9IjIyLjAwMyIgdmlld0JveD0iMCAwIDEwNC41MTggMjIuMDAzIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojODViYjI1O308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTA0IDkwNykiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNCAtOTA3KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCkiPjxwYXRoIGNsYXNzPSJhIiBkPSJNMzEuNDc5LDQ2Ny41ODloMy43Mjl2MTcuNDM1aDcuMjcydjMuMDQ2aC0xMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMS40NzkgLTQ2Ni4wNjYpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMDMuODY5LDQ2Ny41ODloMTEuMzEzbC0uOTk1LDMuMDQ2SDEwNy42djUuNDdoNi41NTh2My4wNDZIMTA3LjZ2NS44NzRoNy42MTR2My4wNDZIMTAzLjg2OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OS44MjEgLTQ2Ni4wNjYpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xODAuNTUzLDQ3Ny43ODNsLTYuNzQ0LTEwLjE5NGg0LjIyN2w0Ljg0OCw3LjM2NSw1LjE5LTcuMzY1aDQuMUwxODUsNDc3LjY4OWw2Ljg2OCwxMC4zOEgxODcuN2wtNS4wMzUtNy41NTItNS4zNDUsNy41NTJoLTQuMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDUuNzEzIC00NjYuMDY2KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMzIyLDQ2Ny41ODloMi43NjZWNDg1LjhoNy40OXYyLjI2OUgzMjJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjY1LjYyMyAtNDY2LjA2NikiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTM4Ny42NjQsNDY1LjQ4NmExLjc3MiwxLjc3MiwwLDAsMSwzLjU0MywwLDEuNzU4LDEuNzU4LDAsMCwxLTEuOCwxLjc3MkExLjcwNywxLjcwNywwLDAsMSwzODcuNjY0LDQ2NS40ODZabS40LDQuNzg2SDM5MC44djE0LjdoLTIuNzM1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMxOC41NDQgLTQ2Mi45NjkpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00MjQuOTc5LDQ5NS44MjloMi4zMzFsLjMxMSwxLjhhOC4wNDgsOC4wNDgsMCwwLDEsNS4xLTIuMTc1YzIuMzMxLDAsNC40NzYsMS4zNjcsNC40NzYsNS4yMjF2OS44NTJoLTIuNzM1di04Ljk1MWMwLTIuMDgyLS41LTMuNy0yLjUxOC0zLjdhNi44NTMsNi44NTMsMCwwLDAtNC4yMjcsMS45ODl2MTAuNjZoLTIuNzM1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0OC42MTggLTQ4OC41MjUpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01MDguNDIsNDU5Ljc0MmgyLjczNVY0NzIuMzZoLjA2Mmw1LjMxNC01LjMxNGgzLjIzMmwtNi4zMDksNi4yNzgsNi45MzEsOC40MjJoLTMuMjYzbC01LjktNy4zaC0uMDYydjcuM0g1MDguNDJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDE1Ljg2NyAtNDU5Ljc0MikiLz48L2c+PC9nPjwvZz48L3N2Zz4=" />' +
        '    </div>' +
        '    <div id="lex-link-close">' +
        '        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMjAyYTNmO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTE3MDMuNywxMjI5Ljk4M2w2LjM4OSw2LjM4OS0xLjYxMSwxLjYxMS02LjM4OS02LjM4OS02LjM4OSw2LjM4OS0xLjYxMi0xLjYxMSw2LjM5LTYuMzg5LTYuMzktNi4zODksMS42MTItMS42MTEsNi4zODksNi4zODksNi4zODktNi4zODksMS42MTEsMS42MTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTY5NC4wOTQgLTEyMjEuOTgzKSIvPjwvc3ZnPg==" />' +
        '    </div>' +
        '</div>';

    element.appendChild(getDOMElementFromString(headerTemplate));

    const close = document.getElementById('lex-link-close');
    close.addEventListener("click", function () {
        processCanceled = true;
        removePopup();
    });
}

function createPopup() {
    removePopup();
    processCanceled = false;
    
    const element = document.createElement('div');
    element.setAttribute('id', 'lex-link-popup');
    document.body.appendChild(element);
    return element;
}

function showError(error) {
    const element = createPopup();
    addHeader(element);

    const textsTemplate =
        '<div class="lex-link-error lex-link-texts">' +
        '    <img alt="Błąd" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSIzOS40NjYiIHZpZXdCb3g9IjAgMCA0OCAzOS40NjYiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNkNzBjMzg7fTwvc3R5bGU+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNiAtMzAuMjY3KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik00OC4xMzMsNjIuODA4YTEuOSwxLjksMCwwLDEsLjUzMi0xLjMyNCwxLjg3OCwxLjg3OCwwLDAsMSwyLjA2MS0uNCwxLjkxOSwxLjkxOSwwLDAsMSwuNi40LDEuODI5LDEuODI5LDAsMCwxLC40LjU5NSwxLjg4LDEuODgsMCwwLDEsLjE0My43MjksMS44MjMsMS44MjMsMCwwLDEtLjU0MSwxLjMyNCwxLjgzNSwxLjgzNSwwLDAsMS0uNi4zOTQsMS45ODQsMS45ODQsMCwwLDEtMS40NjksMCwxLjc1OSwxLjc1OSwwLDAsMS0uNTkyLS4zOTQsMS44NzgsMS44NzgsMCwwLDEtLjM4OS0uNTg4QTEuODQ0LDEuODQ0LDAsMCwxLDQ4LjEzMyw2Mi44MDhabTMuMjQ4LTE4Ljk0MXY5LjE1NXEwLC43Mi0uMDI0LDEuNDA5dC0uMDcxLDEuMzg0cS0uMDQ4LjctLjExOCwxLjQyNlQ1MSw1OC44aC0xLjkxcS0uMDk0LS44MzMtLjE2NS0xLjU2dC0uMTE5LTEuNDI2cS0uMDQ4LS43LS4wNzEtMS4zODR0LS4wMjQtMS40MDlWNDMuODY3Wk01MCwzMi40LDcxLjg2Nyw2Ny42SDI4LjEzM0w1MCwzMi40bTAtMi4xMzNhMi4xMzEsMi4xMzEsMCwwLDAtMS44MTIsMS4wMDdsLTIxLjg2NywzNS4yYTIuMTM0LDIuMTM0LDAsMCwwLDEuODEyLDMuMjU5SDcxLjg2N2EyLjEzMywyLjEzMywwLDAsMCwxLjgxMS0zLjI1OWwtMjEuODY2LTM1LjJBMi4xMzIsMi4xMzIsMCwwLDAsNTAsMzAuMjY3WiIvPjwvZz48L3N2Zz4=" />' +
        '    <h1>Brak połączenia z serwerem</h1>' +
        '    <p>' + error + '</p>' +
        '</div>';

    element.appendChild(getDOMElementFromString(textsTemplate));
}

function showSuccess() {
    const error = document.getElementsByClassName('lex-link-error');
    if (typeof error !== 'undefined' && error !== null && error.length !== 0) {
        //Don't show success if error occured
        return;
    }

    const element = createPopup();
    addHeader(element);

    const linksNumber = countLinks(document);

    const textsTemplate =
        '<div class="lex-link-success lex-link-texts">' +
        '    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojODViYzJjO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDUuNzc2IC0yNS4wNjgpIj48cGF0aCBjbGFzcz0iYSIgZD0iTS0xODEuNzc2LDI1LjA2OGEyNCwyNCwwLDAsMC0yNCwyNCwyNCwyNCwwLDAsMCwyNCwyNCwyNCwyNCwwLDAsMCwyNC0yNEEyNCwyNCwwLDAsMC0xODEuNzc2LDI1LjA2OFptMCw0NmEyMi4wMjUsMjIuMDI1LDAsMCwxLTIyLTIyLDIyLjAyNSwyMi4wMjUsMCwwLDEsMjItMjIsMjIuMDI1LDIyLjAyNSwwLDAsMSwyMiwyMkEyMi4wMjUsMjIuMDI1LDAsMCwxLTE4MS43NzYsNzEuMDY4WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNLTE3MS42NzYsNDEuNDkxbC0uMi0uMi01LjQ3Myw1LjQ3My0zLjIsMy4yLTQuMDU5LDQuMDU5LTEuODY5LTEuODY5LTEuOTE5LTEuOTE5LTMuMjgzLTMuMjgzLS4yLjItMS4wMTIsMS4wMTItLjIuMiwzLjI4NCwzLjI4NCwxLjkxOCwxLjkxOCwxLjg3LDEuODcuMi4yLDEuMDEyLDEuMDEyLjIuMi4yLS4yLDEuMDEyLTEuMDEyLjItLjIsNC4wNTgtNC4wNTgsMy4yLTMuMiw1LjQ3Mi01LjQ3Mi0uMi0uMloiLz48L2c+PC9zdmc+" />' +
        (linksNumber > 0
            ?
            '    <h1>Linkowanie przebiegło pomyślnie</h1>' +
            '    <p>Liczba nałożonych linków: ' + linksNumber + '</p>' 
            :
            '    <h1>Zakończono skanowanie</h1>' +
            '    <p>Brak dokumentów do linkowania z programem LEX.</p>' 

            ) +
         '</div>';

    element.appendChild(getDOMElementFromString(textsTemplate));

    setTimeout(
        function () {
            element.classList.add('fade');
            setTimeout(removePopup, 1000);
        }, 3000);    
}

function countLinks(element) {
    const links = element.getElementsByClassName('wkp-link');
    if (typeof links === 'undefined' || links === null) {
        return 0;
    }
    return links.length;
}

function updateProgress(progress) {
    const element = document.getElementById('lex-link-progress');
    if (typeof element !== 'undefined' && element !== null) {
        element.style.width = progress + '%';
    }
}

function removePopup() {
    const element = document.getElementById('lex-link-popup');
    if (typeof element !== 'undefined' && element !== null) {
        element.parentNode.removeChild(element);
    }    
}

function getDOMElementFromString(s) {
    const element = new DOMParser().parseFromString(s, 'text/html');
    return element.body.firstChild;
}

function checkIfCurrentPageIsOnList(domains) {
    const arr = location.href.split('/');

    let currentDomain = arr[2];
    if (location.href.startsWith("file://")) {
        currentDomain = "file://";
    }

    if (!currentDomain) return false;
    
    for (let i = 0; i < domains.length; i++) {
        let checkDomain = domains[i];
        if (!checkDomain) continue;

        checkDomain = checkDomain.replace('http://', '').replace('https://', '');

        if (checkDomain == currentDomain) {
            return true;
        }
    }
    return false;
}

function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }
}

function getRangeSelectedNodes(range) {
    var node = range.startContainer;
    var endNode = range.endContainer;

    // Special case for a range that is contained within a single node
    if (node == endNode) {
        return [node];
    }

    // Iterate nodes until we hit the end container
    var rangeNodes = [];
    while (node && node != endNode) {
        rangeNodes.push(node = nextNode(node));
    }

    // Add partially selected nodes at the start of the range
    node = range.startContainer;
    while (node && node != range.commonAncestorContainer) {
        rangeNodes.unshift(node);
        node = node.parentNode;
    }

    return rangeNodes;
}

function getSelectedNodes() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (!sel.isCollapsed) {
            return getRangeSelectedNodes(sel.getRangeAt(0));
        }
    }
    return [];
}

function removeAllLexLinks() {
    var links = document.querySelectorAll('.wkp-link');
    links.forEach(function (link, index) {
        var preview = link.querySelector('.lex-link-preview');
        link.removeChild(preview);

        var innerHtml = document.createTextNode(link.innerHTML);

        link.parentElement.insertBefore(innerHtml, link);
        link.parentElement.removeChild(link);
    });
}

function removeLexLinksFromElement(element) {
    if (element.nodeType === Node.TEXT_NODE) return;

    var links = element.querySelectorAll('.wkp-link');

    links.forEach(function (link, index) {
        var preview = link.querySelector('.lex-link-preview');
        link.removeChild(preview);

        var innerHtml = document.createTextNode(link.innerHTML);

        var parent = (link.parentElement !== null) ? link.parentElement : link.parentNode;
        
        parent.insertBefore(innerHtml, link);
        parent.removeChild(link);
    });
}