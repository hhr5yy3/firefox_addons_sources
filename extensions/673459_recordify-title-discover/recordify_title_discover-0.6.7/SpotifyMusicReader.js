function checkIsAd() {
    return document.querySelectorAll('a[data-testid="context-item-info-ad-title"]').length > 0;
}

function checkIsGermanLanguage() {
    var userLang = navigator.language || navigator.userLanguage; 
    return userLang == "de-DE"
}

function fetchCurrentService() {
    return "Spotify Web";
}

function fetchAlbumArt() {
    if (currCover === "") {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                currCover = request.response.querySelector('meta[property="og:image"]').content;
            }
        };
        request.responseType = "document";
        request.open('get', document.querySelectorAll('a[data-testid="context-item-link"]')[0].href);
        request.send();
    }
    return currCover;
}

function fetchAlbum() {
    try {
        if (songAlbumUri !== document.querySelectorAll('a[data-testid="context-item-link"]')[0].href) {
            currCover = "";
            songAlbum = "";

            songAlbumUri = document.querySelectorAll('a[data-testid="context-item-link"]')[0].href;
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    songAlbum = request.response.querySelector('meta[property="og:title"]').content;
                }
            };
            request.responseType = "document";
            request.open('get', document.querySelectorAll('a[data-testid="context-item-link"]')[0].href);
            request.send();
        }
    } catch (error) {
    }
    return songAlbum;
}

function fetchSongArtist() {
    var tmpArtist = "";

    try {        
        if (checkIsAd()) {
            tmpArtist = checkIsGermanLanguage() ? "Werbung" : "Advertisement";
        } else {
            tmpArtist = document.querySelectorAll('a[data-testid="context-item-info-artist"]')[0].outerText;
        }
    } catch (error) {
        //Maybe a collab
        tmpArtist = "";
    }

    return tmpArtist;
}

function fetchSongTitle() {
    var songTitle = "";

    try {
        if (checkIsAd()) {
            songTitle = document.querySelectorAll('a[data-testid="context-item-info-ad-title"]')[0].outerText;
        } else {
            songTitle = document.querySelectorAll('a[data-testid="context-item-link"]')[0].outerText;
        }
    } catch (error) {
        //Maybe a collab
        songTitle = "";
    }

    return songTitle;
}

function fetchIsPlaying() {
    return document.querySelectorAll('button[data-testid="control-button-play"]').length <= 0 ? true : false;
}

function fetchPlaybackPosition() {
    return document.querySelectorAll('div[data-testid="playback-position"]')[0].outerText;
}

function fetchPlaybackDuration() {
    return document.querySelectorAll('div[data-testid="playback-duration"]')[0].outerText;
}

function isReady() {
    return true;
}