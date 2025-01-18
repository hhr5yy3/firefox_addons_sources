const DEFAULT_AUDIO_TRACK_NODE = "audio track"
const DEFAULT_AUDIO_TRACK_CHANNEL = "original"

function changeAudioTrackToOriginal(node, channel) {
    console.log("YouTube video loaded!")

    document.querySelector('.ytp-button.ytp-settings-button').click()
    console.log(`Is the audio track setting '${node}' available?`)

    const audioTrackNode = [...document.querySelectorAll('div.ytp-menuitem')].filter(x => x.textContent.toLowerCase().includes(`${node}`))
    if (audioTrackNode === undefined || audioTrackNode.length === 0) {
        console.log(`Audio track '${node}' not available, exiting...`)
        document.querySelector('.ytp-button.ytp-settings-button').click()
        return
    }

    if(audioTrackNode[0].textContent.toLowerCase().includes(`${channel}`)) {
        console.log(`Audio track '${channel}' already set, exiting...`)
        document.querySelector('.ytp-button.ytp-settings-button').click()
        return
    }

    console.log(`Audio track '${audioTrackNode[0].textContent}' available, expanding menu`)
    audioTrackNode[0].click()

    const audioChannels = [...document.querySelectorAll('div.ytp-menuitem')].filter(x => x.textContent.toLowerCase().includes(`${channel}`))
    if (audioChannels === undefined || audioChannels.length === 0) {
        console.log(`Audio track '${channel}' not available, exiting...`)
        audioTrackNode[0].click()
        document.querySelector('.ytp-button.ytp-settings-button').click()
        return
    }

    console.log(`Change language to ${audioChannels[0].textContent}!`)
    audioChannels[0].click()

    console.log("Closing menu")
    document.querySelector('.ytp-button.ytp-settings-button').click()
}

function onError(error) {
    console.log(`Error: ${error}`)
}

function onGot(item) {
    let node = DEFAULT_AUDIO_TRACK_NODE
    let channel = DEFAULT_AUDIO_TRACK_CHANNEL

    if (item.audioTrackNode && item.audioTrackChannel) {
        node = item.audioTrackNode
        channel = item.audioTrackChannel
    }

    changeAudioTrackToOriginal(node.toLowerCase(), channel.toLowerCase());
}

let cUrl = "originalUrl"

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector("video")
    if (video) {
        video.onloadeddata = function () {
            if (this.src !== cUrl) {
                cUrl = this.src
                let getting = browser.storage.sync.get(["audioTrackNode", "audioTrackChannel"])
                getting.then(onGot, onError)
            }
        }
    } else {
        console.log("Could not find 'video' element")
    }
})
