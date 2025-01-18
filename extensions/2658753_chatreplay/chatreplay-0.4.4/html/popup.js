;(async () => {
  const tab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  const { id, url } = tab[0]

  const onWatchPage = /youtube.com\/watch/.test(url)
  const options = document.getElementsByClassName('option')
  const redirect = document.getElementById('redirect')

  if (!onWatchPage) {
    for (const option of options) {
      if (option.id !== 'redirect') option.classList.add('disabled')
    }

    redirect.addEventListener('click', () => {
      browser.tabs.create({
        url: 'https://chatreplay.stream/',
      })
      window.close()
    })
    return
  }

  for (const option of options) {
    option.addEventListener('click', async (e) => {
      browser.tabs.sendMessage(id, e.target.id).catch((e) => {
        browser.tabs.reload()
      })

      window.close()
    })
  }
})()
