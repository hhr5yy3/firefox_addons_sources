export let logo: any
export let search: any
export let backButton: any
export let moreStylesButton: any
export let closeButton: any
export let dndButton: any
export let linkButton: any
export let gifButton: any
export let stickerButton: any
export let emojiButton: any
export let textButton: any
export let textButtonDot: any
export let upEmoji: any
export let textBubble: any
try {
    // I don't know how to test if we're in a chrome environment. Even if we are,
    // this threw an error in the browser in the outlook build
    // maybe it was because the image wasn't found hmmm
    const getPath = (file: string) => chrome.runtime.getURL(`/img/${file}`)
    logo = getPath(`logo.svg`)
    search = getPath(`search-icon.svg`)
    backButton = getPath(`back-button.svg`)
    moreStylesButton = getPath(`more-styles-button.svg`)
    closeButton = getPath(`close-button.svg`)
    dndButton = getPath(`dnd-gif.svg`)
    linkButton = getPath(`link.svg`)
    gifButton = getPath(`gif-icon.svg`)
    stickerButton = getPath(`sticker-icon.svg`)
    emojiButton = getPath(`emoji-icon.svg`)
    textButton = getPath(`text-icon.svg`)
    textButtonDot = getPath(`text-with-dot-icon.svg`)
    upEmoji = getPath(`up.png`)
    textBubble = getPath(`text-pill-icon.svg`)
} catch (_) {
    logo = require(`./logo.svg`)
    search = require(`./search-icon.svg`)
    backButton = require(`./back-button.svg`)
    moreStylesButton = require(`./more-styles-button.svg`)
    closeButton = require(`./close-button.svg`)
    dndButton = require(`./dnd-gif.svg`)
    linkButton = require(`./link.svg`)
    gifButton = require(`./gif-icon.svg`)
    stickerButton = require(`./sticker-icon.svg`)
    emojiButton = require(`./emoji-icon.svg`)
    textButton = require(`./text-icon.svg`)
    textButtonDot = require(`./text-with-dot-icon.svg`)
    upEmoji = require(`./up.png`)
    textBubble = require(`./text-pill-icon.svg`)
}
