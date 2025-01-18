/******************************************
*   OUTPUT FORMATTING UTILITY FUNCTIONS   *
*******************************************/
/* Converts generalizedTime string to javascript Date object */
function generalizedTimeToDate(gt) {
    // use regexp to get the fields
    //
    //               +- date and time (YYYYMMDDHHmmss)
    //               |        +- milliseconds (optional)
    //               |        |        +- TZ direction (+/-)
    //               |   +----+---+    |      +- TZ offset (HHmm)
    //           +---+--+|        | +--+-+    |     +- (Z)ero TZ offset
    //           |      ||        | |    |+---+---+ |
    //           |      ||        | |    ||       | |
    var reGT = /^(\d{14})(\.(\d*))?((\+|-)(\d{4}))?|Z$/;
    var result = reGT.exec(gt);

    if (result == null) {
        throw "Not a generalizedTime string";
    }

    var dt = result[1];       // date and time (without milliseconds)
    var fraction = result[3]; // optional milliseconds
    var tz = result[4];       // timezone
    var tzSign = result[5];   // timezone sign
    var tzOffset = result[6]; // timezone offset

    // date and time
    var date = new Date(Date.UTC(
        parseInt(dt.slice(0, 4)),     // year
        parseInt(dt.slice(4, 6)) - 1, // month (zero based in js, for some reason)
        parseInt(dt.slice(6, 8)),     // day
        parseInt(dt.slice(8, 10)),    // hours
        parseInt(dt.slice(10, 12)),   // minutes
        parseInt(dt.slice(12, 14)))); // seconds

    // fractional seconds (if present)
    if (typeof (fraction) != 'undefined') {
        if (fraction.length < 3) {
            // add zeros if the fraction is less than 3 digits (for example 0.52s => 520ms)
            var milliseconds = parseInt(fraction + '0'.repeat(3 - fraction.length));
        } else {
            // otherwise take the first 3 digits (for example 0.56789s => 567ms)
            var milliseconds = parseInt(fraction.slice(0, 3));
        }
        date.setMilliseconds(milliseconds);
    }

    // timezone adjustment (if present)
    if (typeof (tzSign) != 'undefined' && typeof (tzOffset) != 'undefined') {
        var tzOffsetHours = parseInt(tzOffset.slice(0, 2));
        var tzOffsetMinutes = parseInt(tzOffset.slice(2, 4));

        if (tzSign == '-') {
            date.setHours(date.getHours() + tzOffsetHours);
            date.setMinutes(date.getMinutes() + tzOffsetMinutes);
        } else {
            date.setHours(date.getHours() - tzOffsetHours);
            date.setMinutes(date.getMinutes() - tzOffsetMinutes);
        }
    }

    return date;
}

// returns the time to expiration of the given certificate in milliseconds
function certificateExpiresInMs(certificate) {
    return generalizedTimeToDate(certificate.certificateX509.notValidAfter).valueOf() - Date.now();
}

function formatDateToHumanizedISO(date) {
    var day = ('0' + date.getDate()).slice(-2); // only the 2 last characters: 0 will appear for values<10
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // month zero based in js
    var year = date.getFullYear();

    return year + "-" + month + "-" + day;
}

function formatSerialNumber(sn, separator) {
    var result = '';
    var upper = sn.toUpperCase();

    for (var i = 0; i < upper.length; i++) {
        result += upper[i];
        if ((i % 2 == 1) && (i != upper.length - 1) && (typeof (separator) !== "undefined")) {
            result += separator;
        }
    }

    return result;
}

var keyUsageNames = [
    {value: 0x0080, name: 'Digital Signature'},
    {value: 0x0040, name: 'Non-Repudiation'},
    {value: 0x0020, name: 'Key Encipherement'},
    {value: 0x0010, name: 'Data Encipherement'},
    {value: 0x0008, name: 'Key Agreement'},
    {value: 0x0004, name: 'Key Certificate Sign'},
    {value: 0x0002, name: 'CRL Sign'},
    {value: 0x0001, name: 'Encipher Only'},
    {value: 0x8000, name: 'Decipher Only'}
];

function keyUsageHexToHumanReadableList(ku) {
    var stringList = [];
    for (var i = 0; i < keyUsageNames.length; i++) {
        if (ku & keyUsageNames[i].value) {
            stringList.push(keyUsageNames[i].name);
        }
    }

    return stringList;
}

function keyUsageHexToHumanReadableString(ku, separator) {
    var list = keyUsageHexToHumanReadableList(ku);
    var string = "";
    for (var i = 0; i < list.length; i++) {
        string += list[i];
        if ((i < list.length - 1) && (typeof (separator) !== "undefined")) {
            string += separator;
        }
    }

    return string;
}

function matchesKeyUsage(keyUsage, requiredBits, forbiddenBits) {
    return ((keyUsage & requiredBits) == requiredBits) && !(keyUsage & forbiddenBits);
}

/***************************************************
 *   CERTIFICATE CHAIN AND DETAILS DISPLAY CLASS   *
 ***************************************************/
var CertificateChainAndDetail = function(chainParentElementId, detailParentElementId) {
    if (typeof chainParentElementId === 'undefined' || typeof detailParentElementId === 'undefined') {
        throw "Need parent elements' Ids to create CertificateChainAndDetail";
    }

    var chainParentElementId_ = chainParentElementId;
    var detailParentElementId_ = detailParentElementId;

    /*
     * (Public function) - update the chain and detail GUI with the given certificates
     */
    this.update = function(certificates) {
        updateCertificateDetails(certificates);
        updateCertificateChain(certificates);
    };

    /*
     * (Private function) - update the certificate details GUI
     * - Creates tables with details for all the given certificates and hides them all except
     * for the first one. Displaying the others is matter of hiding and showing the tables (setting
     * and removing 'hidden' class of the table element(s) )
     */
    var updateCertificateDetails = function(certificates) {
        // clear the detail parent
        $(selectorWrap + '#' + detailParentElementId_).empty();

        for (var i = 0; i < certificates.length; i++) {
            $(selectorWrap + '#' + detailParentElementId_).append(createCertificateDetailsTable(certificates[i]));
        }

        // display the details of the first certificate in the list / chain
        if (certificates.length > 0) {
            $(selectorWrap + '#' + detailParentElementId_ + '>table').first().removeClass('hidden');
        }
    };

    /*
     * (Private function) - update the chain GUI
     */
    var updateCertificateChain = function(certificates) {
        // clear the chain parent
        $(selectorWrap + '#' + chainParentElementId_).empty();

        for (var i = 0; i < certificates.length; i++) {
            var item = createCertificateChainItem(certificates[i], '', i);
            item.css('padding-left', (certificates.length - i) * 0.5 + 'em');
            if (i == 0) {
                item.addClass('is-selected');
            }
            // add on-click events to display details for the selected chain item
            if (typeof (detailParentElementId_) !== "undefined") {
                item.on("click", function(event) {
                    displayNthChainItem(detailParentElementId_, event.target.getAttribute('data-certifchain-id'));
                    $(selectorWrap + '#' + chainParentElementId_ + '>div.certificateChainItem').removeClass('is-selected');
                    $(this).addClass('is-selected');
                });
            }

            // first (leaf) certificate should be at the bottom, thus we add the items to the top
            $(selectorWrap + '#' + chainParentElementId_).prepend(item);
        }
    };

    /*
     * (Private function) - create a table element with the given certificate's details
     */
    var createCertificateDetailsTable = function(certificate) {
        var table = $('<table class="hidden certificateDetail"><thead><tr><th class="keyColumnHeader"></th><th class="valueColumnHeader"></th></tr></thead></table>');
        // Subject
        var subject = $('<tbody>');
        subject.append(certDetailsCreateHeaderElement('Subject'));
        subject.append(certDetailsCreateKeyValueElement('Common Name', certificate.subject.commonName, true));
        subject.append(certDetailsCreateKeyValueElement('Organization', certificate.subject.organization));
        subject.append(certDetailsCreateKeyValueElement('Organization Unit', certificate.subject.organizationUnit));
        subject.append(certDetailsCreateKeyValueElement('Street', certificate.subject.street));
        subject.append(certDetailsCreateKeyValueElement('Locality', certificate.subject.locality));
        subject.append(certDetailsCreateKeyValueElement('State or Province', certificate.subject.stateOrProvince));
        subject.append(certDetailsCreateKeyValueElement('Country Code', certificate.subject.countryCode));
        subject.append(certDetailsCreateKeyValueElement('Email Address', certificate.subject.emailAddress));
        table.append(subject);

        // Issuer
        var issuer = $('<tbody>');
        issuer.append(certDetailsCreateHeaderElement('Issuer'));
        issuer.append(certDetailsCreateKeyValueElement('Common Name', certificate.issuer.commonName, true));
        issuer.append(certDetailsCreateKeyValueElement('Organization', certificate.issuer.organization));
        issuer.append(certDetailsCreateKeyValueElement('Organization Unit', certificate.issuer.organizationUnit));
        issuer.append(certDetailsCreateKeyValueElement('Street', certificate.issuer.street));
        issuer.append(certDetailsCreateKeyValueElement('Locality', certificate.issuer.locality));
        issuer.append(certDetailsCreateKeyValueElement('State or Province', certificate.issuer.stateOrProvince));
        issuer.append(certDetailsCreateKeyValueElement('Country Code', certificate.issuer.countryCode));
        issuer.append(certDetailsCreateKeyValueElement('Email Address', certificate.issuer.emailAddress));
        table.append(issuer);

        // Validity
        var validity = $('<tbody>');
        validity.append(certDetailsCreateHeaderElement('Validity'));
        validity.append(certDetailsCreateKeyValueElement('Valid from',
            generalizedTimeToDate(certificate.notValidBefore).toISOString(),
            true));
        validity.append(certDetailsCreateKeyValueElement('Valid to',
            generalizedTimeToDate(certificate.notValidAfter).toISOString(),
            true));
        table.append(validity);
        // Other
        var other = $('<tbody>');
        other.append(certDetailsCreateHeaderElement('Other'));
        other.append(certDetailsCreateKeyValueElement('Key usage',
            (typeof (certificate.keyUsage) === 'undefined') ? '???' : keyUsageHexToHumanReadableString(parseInt(certificate.keyUsage, 16), ', ') + ' (0x' + certificate.keyUsage + ')',
            true));

        other.append(certDetailsCreateKeyValueElement('Serial number', formatSerialNumber(certificate.serialNumber, ':')));

        other.append(certDetailsCreateKeyValueElement('CA',
            (typeof (certificate.CA) === 'undefined') ? '???' : (certificate.CA ? 'YES' : 'NO')));
        table.append(other);

        // dont display collapse button if every tr children of a <tbody> is .alwaysDisplayed
        $('tbody', table).each(function() {
            if ($(this).children('tr:not(tr:first-child, tr.alwaysDisplayed)').length === 0) {
                $('a.collapse', $(this)).remove();
            }
        });

        // event listener for collapsing
        $('a.collapse', table).on('click', function(event) {
            clicked = $(event.target);

            var tbody = clicked.parents("tbody");
            $('tr:not(tr:first-child, tr.alwaysDisplayed)', tbody).toggleClass("hidden");

            clicked.toggleClass("collapsed");
            clicked.hasClass("collapsed") ? clicked.text('+') : clicked.text('−');
        });

        return table;
    };

    /*
     * (Private function) - create a certificate details table header element with the given text
     */
    var certDetailsCreateHeaderElement = function(headerText) {
        if (typeof headerText === 'undefined' || !headerText) {
            headerText = "???";
        }

        var element = $('<tr><td class="certificateDetailHeader" colspan=2></td></tr>');
        $('.certificateDetailHeader', element).html(headerText + '<a class="collapse collapsed">+</a>');
        return element;
    };

    /*
     * (Private function) - create a certificate details table key-value element with the given text
     */
    var certDetailsCreateKeyValueElement = function(key, value, alwaysDisplayed) {
        if (typeof value === 'undefined' || !value) {
            value = "—";
        }
        alwaysDisplayed = alwaysDisplayed ? "alwaysDisplayed" : "hidden";

        var element = $('<tr class="' + alwaysDisplayed + '"><td class="certificateDetailKey"></td><td class="certificateDetailValue"></td></tr>');
        $('.certificateDetailKey', element).text(key);
        $('.certificateDetailValue', element).text(value);
        if (value !== "—") {
            $('.certificateDetailValue', element).attr('title', value);
        }

        return element;
    };

    /*
     * (Private function) - makes Nth certificate table visible and hides the others
     */
    var displayNthChainItem = function(detailsElementId, n) {
        var tables = $(selectorWrap + '#' + detailsElementId + '>table');
        if (n <= tables.length) {
            // hide all certificate details and show just the selected one
            tables.addClass("hidden");
            $(selectorWrap + '#' + detailsElementId + '>table:eq(' + n + ')').removeClass("hidden");
        }
    };

    /*
     * (Private function) - create a chain item
     */
    var createCertificateChainItem = function(certificate, prefix, index) {
        var item = $('<div class="certificateChainItem" data-certifchain-id=' + index + '>' + prefix + sanitize(certificate.subject.commonName) + ', ' + sanitize(certificate.issuer.commonName) + '</div>');
        return item;
    };
};

/******************************************************************************
 *   CERTIFICATE TABLE/LIST OBJECT DEFINITION                                 *
 ******************************************************************************/

// Hey, I'm an object representing certificate table and I'd like to be your friend,
// preferably in multiple copies (you never know...).
var CertificateTable = function(id, parentElement) {
    if (id === 'undefined') {
        throw "Need an id to create CertificateTable";
    }
    if (parentElement === 'undefined') {
        throw "Need a parent element to create CertificateTable";
    }
    // public members
    this.id_ = "certificateTable_" + id;
    this.parentElement_ = parentElement;

    // private members
    var certificates = [];
    var readers = [];
    var selectedCertificate = -1;
    var pinpadLessAuthenticated = false;

    // part of the constructor is to create an empty table under the parentElement
    var table = document.createElement("table");
    table.id = this.id_;
    table.className = "certificateTable";
    var parent = document.getElementById(this.parentElement_);
    if (!parent) {
        // well this is awkward
        throw "CertificateTable: ERROR - parent given to CTOR does not exist (" + this.parentElement_ + ")";
    }

    var showEmpty = $("<label class='showEmpty'><input type='checkbox'>Show empty readers</label>");
    $(showEmpty).on("change", function(event) {
        $('tbody.empty').toggleClass('hidden', !$(event.target).prop("checked"));
        $(parent).center('main');
    });

    parent.insertBefore(table, parent.childNodes[0]);
    $(parent).prepend(showEmpty);
    $(parent).addClass('certifs');

    // public function definitions start here
    // checks the proper presence of the table in the DOM
    this.getTableDOM = function() {
        var table = $(selectorWrap + '#' + this.id_);

        if (table.length < 1) {
            throw "Table not found";
        } else if (table.length > 1) {
            throw "Too many (" + table.length + ") tables with the given id (" + this.id_ + ")";
        }

        return table;
    };

    // removes the table's content
    this.clear = function() {
        var tableToClear = this.getTableDOM();

        // log and empty
        tableToClear.each(function() { console.log("CertificateTable: Clearing table " + this.id); });
        tableToClear.empty();
    };

    // displays a message in the table
    this.displayMessage = function(message) {
        this.clear();

        console.log("CertificateTable: displaying message in table " + this.id_);

        var table = this.getTableDOM();
        table.html('<tr class="infoRow"><td>' + sanitize(message) + '</td></tr>');
    };

    // filters the table's certificates by their key usage values
    this.filterCertificates = function(certificates) {
        var keyUsage = getCertFilter(); // utility.js

        var filteredList = [];
        /* same approach as in eSigner NPAPI
                - A:B format, A = bits that have to be set, B = bits that have to be zero
                - hard-coded value 128:0, to allow both utility and identity certificates */
        var requiredOnes = keyUsage[0], // A, Digital Signature
            requiredZeros = keyUsage[1]; // B

        // console.log("CertFilter KeyUsage is " + requiredOnes + ':' + requiredZeros);

        for (i = 0; i < certificates.length; i++) {
            var kuInt = parseInt(certificates[i].certificateX509.keyUsage, 16);
            if (matchesKeyUsage(kuInt, requiredOnes, requiredZeros)) {
                filteredList.push(certificates[i]);
            }
        }
        return filteredList;
    };

    // returns the currently selected certificate, undefined when error state is reached
    this.getSelectedCertificate = function(isSingleCertificate) {
        if (isSingleCertificate) { // if there is only one certificate available, we give it 'selected' class and proceed
            $(selectorWrap + '#' + this.id_ + ' .certificateRow').toggleClass("selected");
        }

        // checks the table's DOM for certificateRows with selected class
        var selectedRows = $(selectorWrap + '#' + this.id_ + ' .certificateRow.selected');
        if (selectedRows.length == 1) {
            if ($(selectedRows).parent('tbody').hasClass('locked')) { // reader
                    updateErrorModal(Messages.SIGN_PROCESS_ABORT, Messages.PIN_LOCKED, false);
                return undefined;
            }
            if ($(selectedRows).parent('tbody').hasClass('notInitialized')) { // reader
                    updateErrorModal(Messages.SIGN_PROCESS_ABORT, Messages.NO_INIT, false);
                return undefined;
            }
            if ($(selectedRows).parent('tbody').hasClass('error')) { // reader
                    updateErrorModal(Messages.SIGN_PROCESS_ABORT, Messages.READER_SWYS_BAD_DETECT, false);
                return undefined;
            }
            if ($(selectedRows).hasClass('notYetValid')) { // certificate
                    updateErrorModal(Messages.SIGN_PROCESS_ABORT, Messages.CERT_NOT_YET_VALID, false);
                return undefined;
            }
            if ($(selectedRows).hasClass('expired')) { // certificate
                    updateErrorModal(Messages.SIGN_PROCESS_ABORT, Messages.CERT_EXPIRED, false);
                return undefined;
            }
            var certificateIndex = selectedRows.data('certIndex');
            return this.certificates[certificateIndex];
        }

        // if none or more than one certificate is selected, return undefined
            updateErrorModal(Messages.SIGN_PROCESS_ABORT, Messages.CERT_BAD_SELECTION, false);
        return undefined;
    };

    // returns whether the given slot is a PIN pad
    this.isSlotPinPad = function(slotId) {
        for (var i = 0; i < this.readers.length; i++) {
            if (this.readers[i].slotId == slotId) {
                if (typeof (this.readers[i].flags.pinPad) == 'boolean') {
                    return this.readers[i].flags.pinPad;
                } else {
                    throw "Slot PIN pad information malformed";
                }
            }
        }
        throw "Slot not found";
    };

    this.isSlotSwys = function(slotId) {
        for (var i = 0; i < this.readers.length; i++) {
            if (this.readers[i].slotId == slotId) {
                if (typeof this.readers[i].flags.swys === "object") {
                    if (typeof this.readers[i].flags.swys[0] != 'undefined' && this.readers[i].flags.swys[0] !== "") {
                        return true;
                    }
                }
                return false;
            }
        }
        throw "Slot not found";
    };

    this.getReader = function(slotId) {
        for (var i = 0; i < this.readers.length; i++) {
            if (this.readers[i].slotId == slotId) {
                return this.readers[i];
            }
        }
        throw "Slot not found";
    };

    // creates an informational row
    this.createInfoRow = function(information) {
        var row = $('<tr class="infoRow">');
        var message = $('<td colspan="3">');
        message.text(information);
        row.append(message);

        return row;
    };

    // creates a row that represents a reader
    this.createReaderRow = function(reader) {
        var row = $('<tr class="readerRow">'),
            isError = !!(reader.flags && reader.flags.error), // !! ensures boolean type
            isTokenPresent = !!(reader.flags && reader.flags.tokenPresent),
            isPinLocked = !!(reader.flags && reader.flags.pinLocked),
            isPinInitialized = !!(reader.flags && reader.flags.pinInitialized),
            isPinPad = !!(reader.flags && reader.flags.pinPad),
            isSwysReader = !!(reader.flags && reader.flags.swys === true),
            swysTitle = "";

        // swys tooltip generation
        if (reader.flags && typeof reader.flags.swys === "object" && reader.flags.swys.length && reader.flags.swys[0] !== "") {
            isSwysReader = true;
            for (xyz in reader.flags.swys) {
                if (xyz == 0) {
                    swysTitle += "SWYS type: ";
                } else {
                    swysTitle += ", ";
                }
                swysTitle += reader.flags.swys[xyz];
            }
            for (xyz in reader.flags.swysHash) {
                if (xyz == 0) {
                    swysTitle += "\nSWYS hash: ";
                } else {
                    swysTitle += ", ";
                }
                swysTitle += reader.flags.swysHash[xyz];
            }
        }

        // reader row tooltip
        var title = (isTokenPresent ? '' : 'Smart-card not inserted');
        if (isTokenPresent) {
            title += (isPinPad ? 'PIN pad' : 'PIN pad-less') + ' reader';
            if (reader.manufacturer && reader.manufacturer != '') {
                title += ', manufactured by ' + reader.manufacturer;
            }
        }
        row.attr('title', title);

        // reader row content
        var header = $('<th colspan="3">');
        header.text(reader.description);
        row.append(header);

        // icons
        let assetPrefix = customerSettings.assetPrefix || "";
        if (isError || isPinLocked || !isPinInitialized || isPinPad || isSwysReader) {
            header.attr('colspan', 2);
            var header2 = $('<th>');
            var logo;
            if (isError) { // when error, no other icon will be displayed for this reader (avoid bloat/confusion)
                row.addClass('error');
                var logoTitle = "Unable to detect this reader's SWYS capabilities!";
                logo = $('<img src="' + browser.runtime.getURL(assetPrefix + 'assets/img/warning.svg') + '" title="' + logoTitle + '">');
                row.attr('title', row.attr('title') + '\n' + logoTitle);
                header2.append(logo);
            } else {
                if (isTokenPresent) {
                    if (isPinLocked) {
                        row.addClass('locked');
                            var logoTitle = Messages.PIN_LOCKED;
                        logo = $('<img src="' + browser.runtime.getURL(assetPrefix + 'assets/img/pinlocked.png') + '" title="' + logoTitle + '">');
                        row.attr('title', row.attr('title') + '\n' + logoTitle);
                        header2.append(logo);
                    }
                    if (!isPinInitialized) {
                        row.addClass('notInitialized');
                            var logoTitle = Messages.NO_INIT;
                        logo = $('<img src="' + browser.runtime.getURL(assetPrefix + 'assets/img/pinInit.png') + '" title="' + logoTitle + '">');
                        row.attr('title', row.attr('title') + '\n' + logoTitle);
                        header2.append(logo);
                    }
                }
                if (isSwysReader) {
                    logo = $('<img src="' + browser.runtime.getURL(assetPrefix + 'assets/img/SWYS_Logo.svg') + '" class="swys" title="' + swysTitle + '">');
                    header2.append(logo);
                }
                if (isPinPad) {
                    logo = $('<img src="' + browser.runtime.getURL(assetPrefix + 'assets/img/pinpad.svg') + '" title="' + title.split(',')[0] + '">');
                    header2.append(logo);
                }
            }
            row.append(header2);
        }

        return row;
    };

    // creates a row that represents a certificate
    this.createCertificateRow = function(id, certificate) {
        var row = $('<tr class="certificateRow">');
        row.data('certIndex', id);

        var label = $('<td class="certificateLabelCell">');
        label.text(certificate.certificateX509.issuer.commonName + " : " + certificate.certificateX509.subject.commonName);
        row.append(label);

        var validFrom = $('<td class="certificateTimeCell from">');
        var dateValidFrom = formatDateToHumanizedISO(generalizedTimeToDate(certificate.certificateX509.notValidBefore));
        validFrom.text(dateValidFrom);
        // the "tooltip" can be a little more verbose
        validFrom.attr('title', 'Valid from: ' + generalizedTimeToDate(certificate.certificateX509.notValidBefore).toISOString());
        row.append(validFrom);

        var validTo = $('<td class="certificateTimeCell to">');
        var dateValidTo = formatDateToHumanizedISO(generalizedTimeToDate(certificate.certificateX509.notValidAfter));
        validTo.text(dateValidTo);
        // the "tooltip" can be a little more verbose
        validTo.attr('title', 'Valid to: ' + generalizedTimeToDate(certificate.certificateX509.notValidAfter).toISOString());
        row.append(validTo);

        // check valid before
        if (generalizedTimeToDate(certificate.certificateX509.notValidBefore) > Date.now()) {
            row.addClass('notYetValid');
                label.attr('title', Messages.CERT_NOT_YET_VALID);
        }
        // check expiration
        EXPIRY_WARN_PERIOD = 30 * 24 * 60 * 60 * 1000; // 30 days (in milliseconds), hardcoded for now
        var timeToExpire = certificateExpiresInMs(certificate);
        // is expired?
        if (timeToExpire <= 0) {
            row.addClass('expired');
                label.attr('title', Messages.CERT_EXPIRED);
            // or is about to expire?
        } else if (timeToExpire <= EXPIRY_WARN_PERIOD) {
            row.addClass('expiresSoon');
            var daysToExpire = Math.floor(timeToExpire / (24 * 60 * 60 * 1000)); // milliseconds to days
            label.attr('title', 'This certificate expires in ' + ((daysToExpire < 1) ? 'less than a' : daysToExpire) + ' day' + ((daysToExpire > 1) ? 's' : '') + '.');
        }

        return row;
    };

    // displays readers and certificates in the table
    this.displayCertificates = function(readers, certificates, pinpadLess) {
        $('.showEmpty input').prop('checked', false);
        this.clear();

        console.log("CertificateTable: displaying readers and certificates in table " + this.id_);
        this.pinpadLessAuthenticated = pinpadLess;
        this.readers = [];
        var slotIdList = (function(certs) {
            var arr = [];
            for (i = 0; i < certs.length; i++) {
                var slotId = certs[i].slotId;
                if (arr.indexOf(slotId) === -1) {
                    arr.push(slotId);
                }
            }
            return arr;
        })(certificates);
        for (i = 0; i < slotIdList.length; i++) {
            console.log("Slot id: " + slotIdList[i]);
            for (rIdx = 0; rIdx < readers.length; rIdx++) {
                if (readers[rIdx].slotId === slotIdList[i]) { // add only reader if its ID is in certificate list
                    this.readers.push(readers[rIdx]);
                }
            }
        }
        this.certificates = this.filterCertificates(certificates);

        var table = this.getTableDOM();

        // and then fill it out according to the readers and certificates lists
        if (readers.length < 1) {
            table.append(this.createInfoRow('No readers found.'));
        } else {
            if (this.certificates.length < 1) {
                table.append(this.createInfoRow('No certificates found.'));
            }
            for (var i = 0; i < readers.length; i++) {
                var tbody = $('<tbody>');
                tbody.append(this.createReaderRow(readers[i]));
                // find certificates
                var certificatesFoundCount = 0;
                this.certificates.sort(function(b, c) {
                    var bs = b.certificateX509.issuer.commonName + b.certificateX509.subject.commonName;
                    var cs = c.certificateX509.issuer.commonName + c.certificateX509.subject.commonName;
                    if (bs < cs) { return -1; }
                    if (bs > cs) { return 1; }
                    return 0;
                });
                for (var j = 0; j < this.certificates.length; j++) {
                    if (this.certificates[j].slotId == readers[i].slotId) {
                        certificatesFoundCount++;
                        tbody.append(this.createCertificateRow(j, this.certificates[j]));
                    }
                }
                if (certificatesFoundCount == 0) {
                    tbody.addClass('empty hidden');
                }
                if (readers[i].flags.pinLocked === true) {
                    tbody.addClass('locked');
                }
                if (readers[i].flags.pinInitialized === false) {
                    tbody.addClass('notInitialized');
                }
                if (!!(readers[i].flags.error)) {
                    tbody.addClass('error');
                }
                table.append(tbody);
            }
        }

        // certificate rows are clickable
        $(selectorWrap + '#selectCertificate .certificateRow').on("click", function() {
            // unselect all
            $(selectorWrap + '.certificateRow').removeClass("selected");

            if (
                !$(this).parent('tbody').hasClass('locked') && // reader is not from locked pin
                    !$(this).parent('tbody').hasClass('notInitialized') && // reader is not in error state
                    !$(this).parent('tbody').hasClass('error') && // reader is not in error state
                    !$(this).hasClass('expired') && // certificate is not expired
                    !$(this).hasClass('notYetValid') // certificate is not yet valid
            ) {
                $(this).addClass("selected");
            }

            // disable the Sign button when no certificate is selected
            // TODO: make this universal and parametric in the CertificateTable constructor
            $(selectorWrap + '#selectCertificateSignButton').prop('disabled', $(selectorWrap + '.certificateRow.selected').length !== 1);
        });
    };
};
