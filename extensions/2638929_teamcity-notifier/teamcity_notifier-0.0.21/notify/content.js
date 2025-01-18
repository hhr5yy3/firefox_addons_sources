{
  const script = document.createElement('script')
  script.src = browser.runtime.getURL('notify/inject.js')
  document.documentElement.appendChild(script)

  window.addEventListener('message', async ({data}) => {
    switch (data.type) {
      case 'TEAMCITY_NOTIFICATION':
      case 'TEAMCITY_IS_ALIVE':
        browser.runtime.sendMessage(data)
    }
  })
}
