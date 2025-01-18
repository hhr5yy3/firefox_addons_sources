let port
let isLoading = false
let isPlaying = true
let hasError = false
let currentSrc = ""

const radio = document.getElementById("radio")
const icon = document.getElementById("icon-container")

radio.addEventListener("ended", start)
radio.play()

function start() {
    radio.removeEventListener("ended", start)

    radio.onplay = (e) => { 
        port.postMessage({event: e.type})
        hasError = false
        updateStatus()  
    }

    radio.onplaying = (e) => { 
        port.postMessage({event: e.type})
        isPlaying = true
        isLoading = false
        hasError = false
        updateStatus()  
    }
    
    radio.onpause = (e) => { 
        port.postMessage({event: e.type})
        isPlaying = false
        isLoading = false
        hasError = false
        updateStatus() 
    }
    
    radio.onabort = (e) => { 
        port.postMessage({event: e.type})
        isPlaying = false
        isLoading = false
        hasError = false
        updateStatus() 
    }
        
    radio.onerror = (e) => { 
        port.postMessage({event: e.type})
        isPlaying = false
        isLoading = false
        hasError = true
        updateStatus()
        return false
    }    

    radio.onwaiting = (e) =>{
        port.postMessage({event: e.type})
        isLoading = true
        updateStatus() 
    }

    connect()
    port?.postMessage( { action: "ready" } )
}

function updateStatus() {
    if (isLoading)
        document.title = "TUNING IN"
    else if (radio.src.length) 
        document.title = isPlaying ? "PLAYING" : "PAUSED"
    else
        document.title = "STOPPED"

    icon.classList.toggle("playing", isPlaying)
    icon.classList.toggle("loading", isLoading)
    icon.classList.toggle("error", hasError)
}

function connect() {
    port = chrome.runtime.connect({name: "external-radio"})
    port.onDisconnect.addListener(() => window.close())
    port.onMessage.addListener((message) => onMessage(message))
}

function onMessage(message) {
    if (message.volume >= 0 && message.volume <= 1)
        radio.volume = message.volume

    if (currentSrc !== message.src || message.action === "src") {
        currentSrc = message.src
        if (currentSrc.length) radio.src = currentSrc
    }
        
    if (message.action === "pause") {
        radio.pause()
    }       
    else if (message.action === "stop") {
        radio.pause()
        radio.currentTime = 0
        currentSrc = ""
    }   
    else if (message.action === "play" && currentSrc.length) {
        radio.play().catch(() => {})
    }
}

updateStatus()
