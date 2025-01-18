browser.runtime.onInstalled.addListener(() => {
  const items = [
    {
      id: 'redirect',
      title: 'Open ChatReplay',
    },
    {
      id: 's1',
      type: 'separator',
    },
    {
      id: 'embed',
      title: 'Open next to the video',
    },
    {
      id: 'popout',
      title: 'Open in a new window',
    },
  ]

  for (const item of items) {
    browser.contextMenus.create({
      documentUrlPatterns: ['*://www.youtube.com/watch*'],
      contexts: ['page', 'link', 'image', 'video'],
      ...item,
    })
  }
})

browser.contextMenus.onClicked.addListener((item, tab) => {
  browser.tabs.sendMessage(tab.id, item.menuItemId)
})
