function fetchCurrentService() {
    return "Google Play Music";
}

function fetchAlbumArt() {
    var albumArtTemp = document.getElementById("playerBarArt").src;
    return albumArtTemp.substring(0, albumArtTemp.indexOf("=s90-c-e100"));
}

function fetchAlbum() {
    if (document.getElementsByClassName("player-album").length > 0) {
        return document.getElementsByClassName("player-album")[0].innerText;
    }
    return "";
}

function fetchSongArtist() {
    return document.getElementById("player-artist").innerText;
}

function fetchSongTitle() {
    return document.getElementById("currently-playing-title").innerText;
}

function fetchIsPlaying() {
    return element.paused ? false : true;
}

function isReady() {
    if (document.getElementsByTagName('audio').length > 0) {
        for (var i = 0; i < document.getElementsByTagName('audio').length; i++) {
            if (document.getElementsByTagName('audio')[i].duration > 0) {
                element = document.getElementsByTagName('audio')[i];
                break;
            }
        }
    }

    return document.getElementById("currently-playing-title") !== null &&
        document.getElementById("currently-playing-title").innerText.length > 0 &&
        document.getElementsByTagName('audio').length > 0 &&
        element !== undefined;
}