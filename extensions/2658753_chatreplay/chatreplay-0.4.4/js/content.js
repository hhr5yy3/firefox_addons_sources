let messenger
let chatFrame
let video
let lastTime

const HOST = 'https://chatreplay.stream'
const VERSION = '0.4.3'

const remoteUrl = `${HOST}/chat/${VERSION}/`

function onPlay() {
  messenger.send(Commands.playerUpdate, 1)
}

function onPause() {
  messenger.send(Commands.playerUpdate, 0)
}

function createChatContainer() {
  const container = document.createElement('div')
  container.id = 'chat'
  container.className = 'style-scope ytd-watch-flexy cr-chat'
  container.style.display = 'flex'
  container.style.border = '1px solid var(--yt-spec-10-percent-layer)'
  container.style.boxSizing = 'border-box'
  container.style.borderRadius = '12px'
  container.style.overflow = 'hidden'

  const iframe = document.createElement('iframe')
  iframe.id = 'chatframe'
  iframe.className = 'ytd-live-chat-frame'
  iframe.style.border = '0'
  iframe.style.width = '100%'
  iframe.src = remoteUrl
  container.appendChild(iframe)

  const secondary = document.getElementById('secondary-inner')
  secondary.prepend(container)

  return iframe
}

function createChatWindow() {
  const bLeft = window.screenLeft
  const bWidth = window.outerWidth
  const bTop = window.screenTop

  const w = 400
  const h = 600

  const left = bLeft + bWidth - w - 50
  const top = bTop + (window.outerHeight - window.innerHeight) + 50

  const win = window.open(
    remoteUrl,
    '_blank',
    `left=${left},top=${top},width=${w},height=${h},resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no`
  )
  win.focus()

  return win
}

function createChat(popout = false) {
  const params = new URLSearchParams(window.location.search)
  const videoId = params.get('v')

  video = getVideo()
  lastTime = video.currentTime
  darkModeEnabled = document.documentElement.hasAttribute('dark')

  if (!popout) {
    chatFrame = createChatContainer()
    messenger = new WindowMessenger(chatFrame.contentWindow, 'ext')
  } else {
    chatFrame = createChatWindow()
    messenger = new WindowMessenger(chatFrame, 'ext')
  }

  messenger.addHandler(Commands.getTime, () => {
    if (video.readyState < 2) return lastTime
    return (lastTime = video.currentTime)
  })

  messenger.addHandler(Commands.seek, (time) => {
    video.currentTime = time
  })

  messenger.addHandler(Commands.ready, async () => {
    messenger.send(Commands.darkMode, darkModeEnabled)
    messenger.send(Commands.registerButton)
    const initStatus = await messenger.send(Commands.init, videoId)
    if (!initStatus) return

    video.addEventListener('playing', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('waiting', onPause)

    messenger.send(Commands.playerUpdate, video.paused ? 0 : 1)
  })

  messenger.addHandler(Commands.buttonPressed, () => {
    destroyChat()
  })

  messenger.addHandler(Commands.unload, () => {
    destroyChat()
  })
}

function destroyChat() {
  if (messenger) {
    messenger.destroy()
    messenger = undefined
  }

  if (chatFrame) {
    if (chatFrame.close) {
      chatFrame.close()
    } else {
      chatFrame.parentNode.parentNode.removeChild(chatFrame.parentNode)
    }

    chatFrame = undefined
  }

  if (video) {
    video.removeEventListener('playing', onPlay)
    video.removeEventListener('pause', onPause)
    video.removeEventListener('waiting', onPause)
    video = undefined
  }
}

function redirect() {
  const params = new URLSearchParams(window.location.search)
  const videoId = params.get('v')
  video = getVideo()
  const time = video?.currentTime

  let redir = `${HOST}/videos/${videoId}`
  if (typeof time === 'number') redir += `?t=${Math.floor(time)}`
  window.location = redir
  return false
}

function getVideo() {
  return [...document.getElementsByTagName('video')].filter((v) => !!v.src)[0]
}

window.addEventListener('beforeunload', () => {
  if (chatFrame?.close) {
    chatFrame.close()
  }
})

function onLocationChange() {
  destroyChat()
}

document.body.addEventListener('yt-navigate-start', onLocationChange)
document.body.addEventListener('yt-history-pop', onLocationChange)

const observer = new MutationObserver(() => {
  messenger?.send(
    Commands.darkMode,
    document.documentElement.hasAttribute('dark')
  )
})
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['dark'],
})

const Commands = {
  init: 101,
  playerUpdate: 102,
  darkMode: 103,
  registerButton: 104,
  ready: 201,
  unload: 202,
  seek: 203,
  getTime: 204,
  buttonPressed: 205,
}

browser.runtime.onMessage.addListener((message) => {
  if (location.pathname !== '/watch') return

  const options = {
    redirect: redirect,
    embed: () => {
      destroyChat()
      createChat()
    },
    popout: () => {
      destroyChat()
      createChat(true)
    },
  }

  options[message]?.()
})

const introKey = 'cr_intro'
browser.storage.local.get(introKey).then((s) => {
  const intro = s[introKey] ?? true

  if (intro) {
    createIntro()
  }
})

function createIntro() {
  const intro = document.createElement('div')
  intro.innerHTML = `
<div class="cr-intro">
  <div>
    <h2>ChatReplay</h2>
    <div>Click the extension icon above or use right click while on the watch page to open ChatReplay.</div>
    <br>
    <div>Click to dismiss</div>
  </div>
</div>
`
  intro.onclick = () => {
    intro.parentElement.removeChild(intro)
    browser.storage.local.set({
      [introKey]: false,
    })
  }

  document.body.append(intro)
}
