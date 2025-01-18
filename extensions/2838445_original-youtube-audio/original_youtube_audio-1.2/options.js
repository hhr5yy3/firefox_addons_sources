const DEFAULT_AUDIO_TRACK_NODE = "audio track"
const DEFAULT_AUDIO_TRACK_CHANNEL = "original"

function saveOptions(e) {
    e.preventDefault()
    browser.storage.sync.set({
        audioTrackNode: document.querySelector("#audioTrackNode").value,
        audioTrackChannel: document.querySelector("#audioTrackChannel").value,
    })
}

function resetOptions(e) {
    e.preventDefault()
    browser.storage.sync.set({
        audioTrackNode: DEFAULT_AUDIO_TRACK_NODE,
        audioTrackChannel: DEFAULT_AUDIO_TRACK_CHANNEL,
    })
    restoreOptions()
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#audioTrackNode").value = result.audioTrackNode || DEFAULT_AUDIO_TRACK_NODE
        document.querySelector("#audioTrackChannel").value = result.audioTrackChannel || DEFAULT_AUDIO_TRACK_CHANNEL
    }

    function onError(error) {
        console.log(`Error: ${error}`)
    }

    let getting = browser.storage.sync.get(["audioTrackNode", "audioTrackChannel"])
    getting.then(setCurrentChoice, onError)
}

document.addEventListener("DOMContentLoaded", restoreOptions)
document.querySelector("form").addEventListener("submit", saveOptions)
document.querySelector("form").addEventListener("reset", resetOptions)
