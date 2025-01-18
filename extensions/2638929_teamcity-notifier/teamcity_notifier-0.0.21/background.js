const eventTypes = {
  1: {
    title: 'Build started',
  },
  2: {
    title: 'Build is successful',
    icon: 'ok',
  },
  3: {
    title: 'Build failed',
    icon: 'exception',
  },
  4: {
    title: 'Build is failing',
    icon: 'exception',
  },
  5: {
    title: 'Investigation',
    icon: 'investigation',
  },
  6: {
    title: 'Build is probably hanging',
    icon: 'warning',
  },
  7: {
    title: 'Labeling failed for build',
    icon: 'exception',
  },
  8: {
    title: 'Test investigation',
    icon: 'investigation',
  },
  9: {
    title: 'Test muted',
    icon: 'muted',
  },
}

const isChrome = window.chrome != null && window.chrome.app != null
browser.webRequest.onHeadersReceived.addListener(
  ({responseHeaders}) => ({
    responseHeaders: responseHeaders
      .filter(header => header.name.toLowerCase() !== 'x-frame-options')
      .map(header =>
        header.name.toLowerCase() === 'content-security-policy'
          ? {
              ...header,
              value: header.value.replace('frame-ancestors', `frame-ancestors ${window.origin} `),
            }
          : header,
      ),
  }),
  {
    urls: ['<all_urls>'],
    types: ['sub_frame'],
  },
  ['blocking', 'responseHeaders', isChrome && 'extraHeaders'].filter(Boolean),
)

const iframes = {}
let serverIndex = {}
const detailLinks = {}

const TIMEOUT = 15000

const updateServers = servers => browser.storage.sync.set({servers: JSON.stringify(servers)})

function track(url, rootUrl) {
  if (iframes[url] != null) {
    return
  }

  const iframe = document.createElement('iframe')
  iframe.src = `${url}/win32/userMessages.html`
  document.body.appendChild(iframe)

  function onError() {
    if (serverIndex[rootUrl] != null && !serverIndex[rootUrl].disconnected) {
      updateServers({
        ...serverIndex,
        [rootUrl]: {
          ...serverIndex[rootUrl],
          isConnecting: false,
          disconnected: true,
        },
      })
      // browser.notifications
      //   .create({
      //     type: 'basic',
      //     title: 'Disconnected',
      //     message: url,
      //     iconUrl: `assets/teamcity.svg`,
      //   })
      //   .then(id => {
      //     detailLinks[id] = url
      //   })
    }
  }
  iframe.addEventListener('error', onError)

  let timeout = null
  function clear() {
    if (timeout != null) {
      clearTimeout(timeout)
      timeout = null
    }
  }
  function reload() {
    document.body.removeChild(iframe)
    document.body.appendChild(iframe)
    poll()
  }
  function poll() {
    clear()
    timeout = setTimeout(() => {
      onError()
      reload()
    }, TIMEOUT)
  }
  function keepAlive() {
    poll()
    if (serverIndex[rootUrl] != null && serverIndex[rootUrl].disconnected) {
      updateServers({
        ...serverIndex,
        [rootUrl]: {
          ...serverIndex[rootUrl],
          isConnecting: false,
          disconnected: false,
        },
      })
    }
  }
  poll()
  iframes[url] = {
    destroy() {
      clear()
      document.body.removeChild(iframe)
      iframe.removeEventListener('error', onError)
    },
    keepAlive,
    reload,
  }
}

function untrack(url) {
  if (iframes[url] == null) {
    return
  }

  iframes[url].destroy()
  delete iframes[url]
}

function parseAndTrack(data) {
  serverIndex = typeof data === 'string' ? JSON.parse(data) : data
  serverIndex = serverIndex || {}
  const servers = Object.values(serverIndex)
  Object.keys(iframes).forEach(url => {
    if (!servers.some(({activeUrl, enabled}) => activeUrl === url && enabled)) {
      untrack(url)
    }
  })
  servers.forEach(({activeUrl, rootUrl, enabled}) => {
    if (enabled) {
      track(activeUrl, rootUrl)
    }
  })
}

browser.storage.sync.get('servers').then(data => parseAndTrack(data.servers))

browser.storage.onChanged.addListener(changes => {
  if (changes.servers != null) {
    parseAndTrack(changes.servers.newValue)
  }
})

browser.notifications.onClicked.addListener(async id => {
  const url = detailLinks[id]
  if (url != null) {
    delete detailLinks[id]
    const windows = await browser.windows.getAll()
    return windows.length > 0 ? browser.tabs.create({url}) : browser.windows.create({url})
  }
  return null
})

const setIcon = (name, tabId) =>
  browser.browserAction.setIcon({
    tabId,
    path: Object.fromEntries([16, 24, 32].map(size => [size, `assets/${name}-${size}.png`])),
  })

let darkTheme = false
browser.tabs.onCreated.addListener(function (tab) {
  if (tab.incognito) {
    setIcon('action-icon-dark-disabled', tab.id)
  }
})

// eslint-disable-next-line complexity
browser.runtime.onMessage.addListener((msg, sender) => {
  switch (msg.type) {
    case 'TEAMCITY_URI':
      const {url, rootUrl} = msg
      const prevServerIndex = serverIndex
      if (!(rootUrl in serverIndex)) {
        serverIndex = {
          ...serverIndex,
          [rootUrl]: {
            enabled: true,
            activeUrl: url,
            rootUrl,
            urls: url === rootUrl ? [url] : [url, rootUrl],
          },
        }
      } else {
        let server = serverIndex[rootUrl]
        if (server.disconnected && !server.isConnecting && iframes[server.activeUrl] != null) {
          iframes[server.activeUrl].reload()
          server = {
            ...server,
            isConnecting: true,
            activeUrl: url,
          }
        }
        if (!server.urls.includes(url)) {
          server = {
            ...server,
            urls: server.urls.concat(url),
          }
        }
        if (server !== serverIndex[rootUrl]) {
          serverIndex = {
            ...serverIndex,
            [rootUrl]: server,
          }
        }
      }
      Object.entries(serverIndex)
        .filter(([key]) => key !== rootUrl)
        .forEach(([key, server]) => {
          if (server.urls.includes(url)) {
            const urls = server.urls.filter(item => item !== url)
            if (urls.length === 0) {
              const {[key]: _, ...restServers} = serverIndex
              serverIndex = restServers
            } else {
              serverIndex = {
                ...serverIndex,
                [key]: {
                  ...server,
                  activeUrl: server.activeUrl === url ? urls[0] : server.activeUrl,
                  urls,
                },
              }
            }
          }
        })
      if (serverIndex !== prevServerIndex) {
        updateServers(serverIndex)
      }
      if (sender.tab != null) {
        browser.storage.sync.set({[`tabUrl_${sender.tab.id}`]: JSON.stringify(url)})
        setIcon(
          darkTheme || sender.tab.incognito ? 'action-icon-dark' : 'action-icon',
          sender.tab.id,
        )
      }
      return
    case 'TEAMCITY_NOTIFICATION':
      const {eventTypeId, message, detailLink} = msg
      // ignore Windows Tray Notifier deprecation
      if (eventTypeId === 0) {
        return
      }
      const {title = 'TeamCity', icon = 'teamcity'} = eventTypes[eventTypeId] || {}
      browser.notifications
        .create({
          type: 'basic',
          title,
          message,
          iconUrl: `assets/${icon}.svg`,
        })
        .then(id => {
          if (detailLink == null) {
            return
          }
          const matchingServer = Object.values(serverIndex).find(server =>
            detailLink.startsWith(server.rootUrl),
          )
          detailLinks[id] =
            matchingServer != null
              ? detailLink.replace(matchingServer.rootUrl.replace(/\/$/, ''), matchingServer.activeUrl)
              : detailLink
        })
      return
    case 'TEAMCITY_IS_ALIVE':
      const iframe = iframes[msg.url]
      if (iframe != null) {
        iframe.keepAlive()
      }
      return
    case 'DARK_THEME':
      darkTheme = msg.on
      setIcon(darkTheme ? 'action-icon-dark-disabled' : 'action-icon-disabled')
  }
})
