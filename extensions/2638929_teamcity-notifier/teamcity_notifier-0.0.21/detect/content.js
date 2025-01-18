{
  try {
    if (
      /\/profile.html/.test(location.pathname) &&
      new URLSearchParams(location.search).get('item') === 'userNotifications'
    ) {
      const tabs = document.querySelector('.notifierChooser')
      const trayNotifierRE = /^Windows Tray Notifier/
      tabs.childNodes.forEach(child => {
        if (trayNotifierRE.test(child.textContent)) {
          child.textContent = child.textContent.replace(trayNotifierRE, 'Browser Notifier')
          if (child.tagName === 'STRONG') {
            document.querySelector('.notificationRulesMessage').textContent =
              'Specify the events you want to be notified about.'
          }
        }
      })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }

  const script = document.createElement('script')
  script.src = browser.runtime.getURL('detect/inject.js')
  document.head.appendChild(script)

  window.addEventListener('message', async ({data}) => {
    if (data.type === 'TEAMCITY_URI') {
      browser.runtime.sendMessage(data)
    }
  })

  const darkThemeMatch = matchMedia('(prefers-color-scheme: dark)')
  const setDarkTheme = on => browser.runtime.sendMessage({type: 'DARK_THEME', on})
  if (darkThemeMatch.matches) {
    setDarkTheme(true)
  }
  darkThemeMatch.addEventListener('change', ({matches}) => setDarkTheme(matches))
}
