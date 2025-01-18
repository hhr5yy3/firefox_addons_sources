function fetchCurrentService() {
    return "Amazon Music";
}

function fetchAlbumArt() {
    var musicItem = document.querySelector("div._3l2xsX5-KkYUgDHJDu-L0r music-horizontal-item");
    var albumArt = musicItem.shadowRoot.querySelector("music-image");
    var albumArtImgControl = albumArt.getAttribute("src");
    if (albumArtImgControl != null) {
        return albumArtImgControl;
    }
    return null;
}

function fetchAlbum() {
    var albumTitleItem = document.querySelector("div._3l2xsX5-KkYUgDHJDu-L0r music-horizontal-item");
    return albumTitleItem.getAttribute("secondary-text-2");
}

function fetchSongArtist() {
    var songArtistItem = document.querySelector("div._3l2xsX5-KkYUgDHJDu-L0r music-horizontal-item");
    return songArtistItem.getAttribute("secondary-text");
}

function fetchSongTitle() {
    var songTitleItem = document.querySelector("div._3l2xsX5-KkYUgDHJDu-L0r music-horizontal-item");
    return songTitleItem.getAttribute("primary-text");
}

function fetchIsPlaying() {
    return true;
}

function fetchPlaybackPosition() {
    return document.querySelectorAll('div.sXaGQzYs9WqImj2uxDCBs span')[0].textContent;
}

function fetchPlaybackDuration() {
    timeLeft = document.querySelectorAll('div.sXaGQzYs9WqImj2uxDCBs span')[1].textContent.split(' - ')[1];
    let timeParts = timeLeft.split(':').map(Number);
    let totalSeconds = 0;

    if (timeParts.length === 2) {
        // Format is MM:SS
        let [minutes, seconds] = timeParts;
        totalSeconds = minutes * 60 + seconds;
    } else if (timeParts.length === 3) {
        // Format is HH:MM:SS
        let [hours, minutes, seconds] = timeParts;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else if (timeParts.length === 4) {
        // Format is DD:HH:MM:SS
        let [days, hours, minutes, seconds] = timeParts;
        totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    }
    
    // Calculate the spending time to be added to remaining time to make duration time 
    let additionalTime = document.querySelectorAll('div.sXaGQzYs9WqImj2uxDCBs span')[0].textContent;
    let [addMinutes, addSeconds] = additionalTime.split(':').map(Number);
    let additionalSeconds = addMinutes * 60 + addSeconds;
    
    // Calculate the new total seconds
    let newTotalSeconds = totalSeconds + additionalSeconds;
 
    return newTotalSeconds.toString();
}

function isReady() {
    return true;
}