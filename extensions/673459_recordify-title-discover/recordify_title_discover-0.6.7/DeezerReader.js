function fetchCurrentService() {
    return "Deezer";
}

function fetchAlbumArt() {
    return "";
}

function fetchAlbum() {
    return "";
}

function fetchSongArtist() {
    var tmpArtist = "";

    try {
        if(document.querySelectorAll('[data-testid=item_subtitle]').length > 0){
            tmpArtist = document.querySelectorAll('[data-testid=item_subtitle]')[0].innerText;
        }
    } catch (error) {
        tmpArtist = "";
    }
    return tmpArtist;
}

function fetchSongTitle() {
    var songTitle = "";

    if(document.querySelectorAll('[data-testid=item_title]').length > 0){
        songTitle = document.querySelectorAll('[data-testid=item_title]')[0].innerText;
    }

    return songTitle;
}

function fetchIsPlaying() {
    return document.getElementsByClassName("svg-icon svg-icon-pause").length >= 0 ? false : true;
}

function fetchPlaybackPosition() {
    return document.querySelectorAll('p[data-testid="elapsed_time"]')[0].outerText;
}

function fetchPlaybackDuration() {
    return document.querySelectorAll('p[data-testid="remaining_time"]')[0].outerText;
}

function isReady() {
    return true;
}