/*
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMmddddddddddddddddddddddddddddddddddddddddddddmMMMMMMM
 * MMMMMMM:.++++++++++++++++++++++++++++++++++++++++++--MMMMMMM
 * MMMMMMM::MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMyyyyyyyyyyNMMMMMMNyyyyyyyyyyNMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN`         +MMMMMMo          mMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN          `mMMMMN.          NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      `    +MMMMo    `      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      +    `mMMN`    +      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      y:    +MMo    -d      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hh    `mm`    yd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hM:    /o    -Md      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMh    ``    hMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMM:        :MMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMMd        hMMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMMM:      :MMMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN`     hMMMd`    `hMMMd     `NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMhhhhhhNMMMMhhhhhhMMMMNhhhhhhNMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM:.//////////////////////////////////////////.:MMMMMMM
 * MMMMMMMNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 *
 * Developed by David Fernández (dfernandez@maldita.es) for MALDITA www.maldita.es
 * Version 2.0
 *
 */

var timeout = 1000 * 10; // 10 seconds
var maxZIndex = 2147483647;

chrome.runtime.sendMessage({message: "website?"}, function (response) {

    if (response === undefined)
        return;

    decreaseZIndex();

    if (response.website !== undefined && response.website.unlisted === true) {
        createWebsiteCountNotification(response.website);
    } else if (response.website !== undefined) {
        createWebsiteNotification(response.website);
    }
});

chrome.runtime.sendMessage({message: "webpage?"}, function (response) {

    if (response === undefined)
        return;

    decreaseZIndex();

    if (response.webpage !== undefined) {
        createWebpageNotification(response.webpage);
    }
});

/**
 * The notification should be on top of everything else
 */
function decreaseZIndex() {
    $('body *').each(function () {
        if ($(this).css('position') !== 'static' && $(this).css('z-index') === maxZIndex) {
            $(this).css('z-index', maxZIndex - 1);
        }
    });
}

/**
 * Responsible for creating the notification for listed websites
 * @param response website object with debunks
 */
function createWebsiteNotification(response) {

    var body = document.querySelector('body');
    var notification = document.createElement('div');
    notification.id = "malditobulo-website-notification";
    body.appendChild(notification);

    var header = document.createElement('div');
    header.id = "malditobulo-wn-header";
    header.style.backgroundColor = DOMPurify.sanitize(response['category']['color']);

    var headerIcon = document.createElement('img');
    headerIcon.id = "malditobulo-header-icon";
    headerIcon.src = DOMPurify.sanitize(response['category']['icon']);

    var headerContent = document.createElement('div');
    headerContent.id = "malditobulo-header-content";
    headerContent.innerText = DOMPurify.sanitize(response['category']['public_name']);

    var closeButton = document.createElement('img');
    closeButton.id = "malditobulo-header-close";
    closeButton.className += "close-button";
    closeButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMAAQIDBAUGBwgRFRYZGiEjQ3l7hYaqtLm8vsDFx87a4uvv8fP1+bbY9ZEAAAB8SURBVBhXXY5LFoJAAMOCIP4VBRXEv5j7H9HFDOizu2TRFljedgCQHeocWHVaAWStXnKyl2oVWI+kd1XLvFV1D7Ng3qrWKYMZ+MdEhk3gbhw59KvlH0eTnf2mgiRwvQ7NW6aqNmncukKhnvo/zzlQ2PR/HgsAJkncH6XwAcr0FUY5BVeFAAAAAElFTkSuQmCC";

    header.appendChild(headerIcon);
    header.appendChild(headerContent);
    header.appendChild(closeButton);

    notification.appendChild(header);

    var content = document.createElement('div');
    content.id = "malditobulo-content";

    var description = document.createElement('p');
    description.id = "malditobulo-description";
    description.innerText = DOMPurify.sanitize(response['category']['public_description']);
    content.appendChild(description);

    var debunked = document.createElement('div');
    debunked.id = "malditobulo-debunked";

    if (response["debunks"].length > 0) {

        var alreadyDebunkedStart = document.createElement('p');
        alreadyDebunkedStart.className += "text-already-debunked";
        alreadyDebunkedStart.innerText = "Maldito Bulo ha desmentido";
        debunked.appendChild(alreadyDebunkedStart);

        var debunkNum = (response["debunks"].length < 10) ? ("0" + response["debunks"].length) : String(response["debunks"].length);

        for (var i = 0, len = debunkNum.length; i < len; i++) {
            var number = document.createElement('div');
            number.className += "mb-extension-pane";
            number.innerText = debunkNum[i];

            debunked.appendChild(number);
        }

        var alreadyDebunkedEnd = document.createElement('p');
        alreadyDebunkedEnd.className += "text-already-debunked";
        alreadyDebunkedEnd.innerText = "informaciones de esta web";
        debunked.appendChild(alreadyDebunkedEnd);

        content.appendChild(debunked);
    }

    notification.appendChild(content);

    if (document.getElementById("malditobulo-webpage-notification")) {
        document.getElementById("malditobulo-webpage-notification").className += "secondary";
    }

    var footer = document.createElement('div');
    footer.id = "malditobulo-footer";
    notification.appendChild(footer);

    $(closeButton).on('click', function (e) {
        $(notification).fadeOut('slow');
        setCookie("websitenotification", "dismissed", 0)
    });
}

/**
 * Responsible for creating the notification for unlisted websites
 * @param response dict with corrected and uncorrected urls
 */
function createWebsiteCountNotification(response) {

    var body = document.querySelector('body');
    var notification = document.createElement('div');
    notification.id = "malditobulo-website-notification";

    if (response.uncorrected === 0)
        notification.className += "notif-small";

    body.appendChild(notification);

    var header = document.createElement('div');
    header.id = "malditobulo-wn-header";
    header.style.backgroundColor = "#696969";

    var headerContent = document.createElement('div');
    headerContent.id = "malditobulo-header-content";

    var closeButton = document.createElement('img');
    closeButton.id = "malditobulo-header-close";
    closeButton.className += "close-button";
    closeButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMAAQIDBAUGBwgRFRYZGiEjQ3l7hYaqtLm8vsDFx87a4uvv8fP1+bbY9ZEAAAB8SURBVBhXXY5LFoJAAMOCIP4VBRXEv5j7H9HFDOizu2TRFljedgCQHeocWHVaAWStXnKyl2oVWI+kd1XLvFV1D7Ng3qrWKYMZ+MdEhk3gbhw59KvlH0eTnf2mgiRwvQ7NW6aqNmncukKhnvo/zzlQ2PR/HgsAJkncH6XwAcr0FUY5BVeFAAAAAElFTkSuQmCC";

    header.appendChild(headerContent);
    header.appendChild(closeButton);

    notification.appendChild(header);

    var content = document.createElement('div');
    content.id = "malditobulo-content";

    var description = document.createElement('p');
    description.id = "malditobulo-description";
    content.appendChild(description);

    if (response.uncorrected > 0) {
        var debunked = document.createElement('div');
        debunked.id = "malditobulo-debunked";
        var alreadyDebunkedStart = document.createElement('p');
        alreadyDebunkedStart.className += "text-already-debunked";
        alreadyDebunkedStart.innerText = "Maldito Bulo ha desmentido";
        debunked.appendChild(alreadyDebunkedStart);
        var number = document.createElement('div');
        number.className += "mb-extension-pane";
        number.innerText = (response.uncorrected < 10) ? ("0" + String(response.uncorrected)) : String(response.uncorrected);
        debunked.appendChild(number);
        var alreadyDebunkedEnd = document.createElement('p');
        alreadyDebunkedEnd.className += "text-already-debunked";
        alreadyDebunkedEnd.innerText = "informaciones de esta web";
        debunked.appendChild(alreadyDebunkedEnd);
        content.appendChild(debunked);
    }

    var corrected = document.createElement('div');
    corrected.className += "mb-corrected";

    if(response.corrected > 0){
        var pluralInfo = response.corrected === 1 ? " información" : " informaciones";
        var pluralCorrected = response.corrected === 1 ? " ha sido corregida y/o borrada." : " han sido corregidas y/o borradas.";
        var introUncorrected = response.uncorrected === 0 ? "" : "Además, ";
        corrected.innerText = introUncorrected + "MB ha desmentido " + String(response.corrected) + pluralInfo + " de este medio que" + pluralCorrected;
        content.appendChild(corrected);
    }

    notification.appendChild(content);

    var readMore = document.createElement('a');
    readMore.innerText = "Más info";
    readMore.setAttribute('href', "https://maldita.es/mas-informacion-sobre-la-extension-para-navegadores-de-maldito-bulo/");
    readMore.setAttribute('style', "display:block;text-align:center;color:black;margin-top: 10px;font-size: 10px;");
    readMore.setAttribute('target', "_blank");
    content.append(readMore);

    var footer = document.createElement('div');
    footer.id = "malditobulo-footer";
    notification.appendChild(footer);

    if (document.getElementById("malditobulo-webpage-notification")) {
        document.getElementById("malditobulo-webpage-notification").className += "secondary";
    }

    $(closeButton).on('click', function (e) {
        $(notification).fadeOut('slow');
        setCookie("websitecount", "dismissed", 0)
    });
}

/**
 * Responsible for creating the content alert for pages with misinformation
 * @param response the debunk
 */
function createWebpageNotification(response) {

    var body = document.querySelector('body');
    var notification = document.createElement('div');
    notification.id = "malditobulo-webpage-notification";

    var header = document.createElement('div');
    header.id = "malditobulo-wn-header";
    header.style.backgroundColor = "rgb(152, 0, 2)";
    header.setAttribute('style', 'background-color: rgb(152, 0, 2)');

    var headerIcon = document.createElement('img');
    headerIcon.id = "malditobulo-header-icon";
    headerIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAArlBMVEUAAAD19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fV2ir34AAAAOXRSTlMAAQMECQoPEBojJCoxMjM0OT0/QEJHTU5SVFZXXV5kZnd4hY+RnqOlsLK3urzAwczO3uDi6ev1+/3y27jwAAAAmElEQVQYGX3BizYCUQBA0VOh1KCSkldEpSjExPn/H3PnDlYzLHvzr9r8vkbZjV5TUjfYo2hmMKWgabTPtmdX4/HSJ7Ycawta2uVHNdUEjjSt8m2ktqGjXvFl90PtwYn6vkPuzqAPpwa3RA0zkySZmWmQebTggeDQ6AIujQ6gsjY6g3OjlwpDc2+LRWpuyKu/rBlsLNkM+MsnRpwngeIYRCMAAAAASUVORK5CYII=";

    var headerContent = document.createElement('div');
    headerContent.id = "malditobulo-header-content";
    headerContent.innerText = DOMPurify.sanitize(response['title']);

    var closeButton = document.createElement('img');
    closeButton.id = "malditobulo-header-close";
    closeButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMAAQIDBAUGBwgRFRYZGiEjQ3l7hYaqtLm8vsDFx87a4uvv8fP1+bbY9ZEAAAB8SURBVBhXXY5LFoJAAMOCIP4VBRXEv5j7H9HFDOizu2TRFljedgCQHeocWHVaAWStXnKyl2oVWI+kd1XLvFV1D7Ng3qrWKYMZ+MdEhk3gbhw59KvlH0eTnf2mgiRwvQ7NW6aqNmncukKhnvo/zzlQ2PR/HgsAJkncH6XwAcr0FUY5BVeFAAAAAElFTkSuQmCC";

    header.appendChild(headerIcon);
    header.appendChild(headerContent);

    header.appendChild(closeButton);

    notification.appendChild(header);

    var content = document.createElement('div');
    content.id = "malditobulo-content";

    var description = document.createElement('p');
    description.id = "malditobulo-description";
    description.innerHTML = DOMPurify.sanitize(response['content']);
    description.setAttribute('style', 'color: black;');

    var readMore = document.createElement('a');
    readMore.id = "read-more";
    readMore.innerText = "Descarga aquí el desmentido";
    readMore.setAttribute('href', "https://maldita.es/bulo/" + response['slug']);
    readMore.setAttribute('style', "display:block;");

    description.appendChild(readMore);

    content.appendChild(description);
    notification.appendChild(content);

    var footer = document.createElement('div');
    footer.id = "malditobulo-footer";
    notification.appendChild(footer);

    var footerWarning = document.createElement('div');
    footerWarning.innerText = "Si han corregido esta noticia y ya no es un bulo, avísanos aquí";
    footerWarning.className += "warn-change";
    notification.appendChild(footerWarning);

    $(footerWarning).on('click', function (e) {

        $.post("https://malditobulo.maldita.es/api/notifyurlchanged", {url: window.location.href})
            .done(function (data) {
                footerWarning.innerText = "Aviso enviado";
            });

    });

    if (document.getElementById("malditobulo-website-notification"))
        notification.className += "secondary";

    body.appendChild(notification);

    $(closeButton).on('click', function (e) {
        $(notification).fadeOut('slow');
    });
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}