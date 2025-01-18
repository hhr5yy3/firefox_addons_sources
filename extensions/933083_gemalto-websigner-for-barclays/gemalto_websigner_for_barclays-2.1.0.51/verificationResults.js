// updates the text and the class of the verificationResult div
function updateVerificationResultDiv(status) {
    var verificationResult = $(selectorWrap + "#verificationResult");

    verificationResult.toggleClass(status);
    if (status == "passed") {
        verificationResult.html('<img class="verifyItemIcon assetWS" src=' + browser.runtime.getURL('assets/img/verifyItemOk.svg') + '>');
    } else if (status == "failed" || status == "error") {
        verificationResult.html('<img class="verifyItemIcon assetWS" src=' + browser.runtime.getURL('assets/img/verifyItemNok.svg') + '>');
    }
}

// update the list of verification results under the element given in listElementId
function updateVerificationResultList(listElementId, criteria) {
    var listElement = $('#' + listElementId);
    listElement.empty(); // clear the list

    for (i in criteria) {
        var src = (criteria[i].result === 'passed')
            ? browser.runtime.getURL('assets/img/verifyItemOk.svg')
            : browser.runtime.getURL('assets/img/verifyItemNok.svg');

        var item = $('<tbody class="verifyItem">'),
            icon = $('<img class="verifyItemIcon assetWS" src="' + src + '">'),

            // sanitizing
            name = sanitize(criteria[i].name),
            message = sanitize(criteria[i].message);

        // creating item row
        item.html(`<tr>
            <td>${icon.get(0).outerHTML}</td>
            <td class="name">${name}</td>
        </tr>`);

        // if there is a message, add it in the same TBODY but another TRow
        if (criteria[i].message && criteria[i].message != "") {
            // first TD is empty to indent after img cell
            item.append($(`<tr>
                <td></td>
                <td>${message}.</td>
            </tr>`));
        }

        listElement.append(item);
    }
}

//
function updateVerificationResultListError(listElementId, errorMessage) {
    var listElement = $('#' + listElementId);
    // clear the list
    listElement.empty();

    // store the error message
    var errorP = $('<tr>');
    errorP.text(errorMessage);
    listElement.append(errorP);
}

// returns whether all the given criteria's result is "passed"
function isSignatureValid(criteria) {
    for (var i = 0; i < criteria.length; i++) {
        if (criteria[i].result != "passed") {
            return false;
        }
    }

    return true;
}
