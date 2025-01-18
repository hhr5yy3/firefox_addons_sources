function getRecordifyData() {

    if (!isReady()) return;

    try {
        songAlbumArt = fetchAlbumArt();
    } catch (error) {
        songAlbumArt = "";
    }

    try {
        songTitle = fetchSongTitle();
    } catch (error) {
        songTitle = "";
    }

    try {
        songArtist = fetchSongArtist();
    } catch (error) {
        songArtist = "";
    }

    try {
        songAlbum = fetchAlbum();
    } catch (error) {
        songAlbum = "";
    }

    try {
        isPlaying = fetchIsPlaying();
    } catch (error) {
        isPlaying = false;
    }

    try {
        var tmpPosition = fetchPlaybackPosition();
        if (tmpPosition.includes(":")) {
            var normalizedPosition = normalizeTimeFormat(tmpPosition);
            playbackPosition = convertToSeconds(normalizedPosition);
        }
        else {
            playbackPosition = tmpPosition;
        }

        if (isNaN(playbackPosition)) {
            playbackPosition = 0;
        }
    } catch (error) {
        playbackPosition = 0;
    }

    try {
        var tmpDuration = fetchPlaybackDuration();
        if (tmpPosition.includes(":")) {
            var normalizedDuration = normalizeTimeFormat(tmpDuration);
            playbackDuration = convertToSeconds(normalizedDuration);
        } else {
            playbackDuration = tmpDuration;
        }

        if (isNaN(playbackDuration)) {
            playbackDuration = 0;
        }
    } catch (error) {
        playbackDuration = 0;
    }

    var recordifyData = {
        "songTitle": songTitle,
        "songArtist": songArtist,
        "songAlbum": songAlbum,
        "isPlaying": isPlaying,
        "service": currentService,
        "browser": browser,
        "SmallAlbumImageUri": songAlbumArt,
        "playbackPosition": playbackPosition,
        "playbackDuration": playbackDuration
    };

    getCommand(JSON.stringify(recordifyData));
}

function getCommand(recordifyData) {
    try {
        chrome.runtime.sendMessage({
            method: 'POST',
            action: 'xhttp',
            url: listenerUrl + ":" + listenerPort,
            data: recordifyData
        }, function (responseText) {
            /*Callback function to deal with the response*/
        });
    } catch (ex) {

    }

    try {
        chrome.runtime.sendMessage({
            method: 'POST',
            action: 'xhttp',
            url: listenerUrl + ":" + legacyPort,
            data: recordifyData
        }, function (responseText) {
            /*Callback function to deal with the response*/
        });
    } catch (ex) {

    }
}

function normalizeTimeFormat(timeString) {
    const timeParts = timeString.split(':').map(Number);
    let days = "00", hours = "00", minutes = "00", seconds = "00";

    if (timeParts.length === 1) {
        seconds = String(timeParts[0]).padStart(2, '0');
    } else if (timeParts.length === 2) {
        minutes = String(timeParts[0]).padStart(2, '0');
        seconds = String(timeParts[1]).padStart(2, '0');
    } else if (timeParts.length === 3) {
        hours = String(timeParts[0]).padStart(2, '0');
        minutes = String(timeParts[1]).padStart(2, '0');
        seconds = String(timeParts[2]).padStart(2, '0');
    } else if (timeParts.length === 4) {
        days = String(timeParts[0]).padStart(2, '0');
        hours = String(timeParts[1]).padStart(2, '0');
        minutes = String(timeParts[2]).padStart(2, '0');
        seconds = String(timeParts[3]).padStart(2, '0');
    }

    return `${days}:${hours}:${minutes}:${seconds}`;
}

function convertToSeconds(timeString) {
    const timeParts = timeString.split(':').map(Number);
    let totalSeconds = 0;

    if (timeParts.length >= 1) {
        totalSeconds += timeParts[timeParts.length - 1];
    }
    if (timeParts.length >= 2) {
        totalSeconds += timeParts[timeParts.length - 2] * 60;
    }
    if (timeParts.length >= 3) {
        totalSeconds += timeParts[timeParts.length - 3] * 3600;
    }
    if (timeParts.length >= 4) {
        totalSeconds += timeParts[timeParts.length - 4] * 86400;
    }

    return totalSeconds;
}

setInterval(getRecordifyData, 125);