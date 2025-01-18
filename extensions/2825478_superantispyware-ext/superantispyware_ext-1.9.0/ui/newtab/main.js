// TODO: Better way.
const FIREFOX = !!chrome.runtime.getBrowserInfo

function addTopSites (topSites) {
  const ul = document.getElementById('top-sites')

  for (let i = 0; i < topSites.length; i++) {
    const {title, url, favicon} = topSites[i]

    const img = document.createElement('img')
    img.alt = title
    img.src = favicon || `https://api.faviconkit.com/${new URL(url).hostname}`

    /* getFavicon(topSite.url).then((faviconUrl) => {
      img.src = faviconUrl
    }) */

    const a = document.createElement('a')
    a.href = url
    a.appendChild(img)
    a.appendChild(document.createTextNode(title))

    const li = document.createElement('li')
    li.appendChild(a)

    ul.appendChild(li)
  }
}

document.addEventListener('DOMContentLoaded', () => { 
  document.getElementById('search').placeholder = chrome.i18n.getMessage('search_box_default_text')

  if (FIREFOX) {
    chrome.topSites.get({
      includeFavicon: true,
      limit: 10,
    }, addTopSites)
  } else {
    chrome.topSites.get(addTopSites)
  }
})

/* async function getFavicon (url) {
  const response = await fetch(url)
  const parser = new DOMParser()
  const doc = parser.parseFromString(response.text(), 'text/html')
  const links = doc.getElementsByTagName('link')

  for (var i = 0; i < links.length; i++) {
    const link = links[i]

    if (link.rel === 'icon' || link.rel === 'shortcut icon') {
      return link.href
    }
  }

  return null
} */
