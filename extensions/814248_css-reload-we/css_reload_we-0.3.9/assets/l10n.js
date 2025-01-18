class L10n {
  init() {
    const textNodes = this.get('[data-l10n-text]')
    textNodes.forEach(node => {
      node.textContent = browser.i18n.getMessage(node.dataset.l10nText)
    })

    const titleNodes = this.get('[data-l10n-title]')
    titleNodes.forEach(node => {
      node.title = browser.i18n.getMessage(node.dataset.l10nTitle)
    })
  }

  get(selector) {
    return [...document.documentElement.querySelectorAll(selector)]
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new L10n().init()
})
