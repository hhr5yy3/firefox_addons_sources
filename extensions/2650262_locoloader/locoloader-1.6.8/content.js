// console.log('Content script has been loaded.')

// Prevent to inject content.js to same page repeatedly
// ----------------------------------------------------
if (typeof document.injected == 'undefined') {
    // console.log('Content script has been injected.')

    // console.log('Content code has been injected!')
    document.injected = true

    // Functions
    // ---------------------------------------------

    const getExtensionActions = () => {
        const extActionsElement = document.getElementById('ext-actions')
        let extActions = extActionsElement.getAttribute('data-actions');
        return extActions ? JSON.parse(extActions) : {};
    }

    // Events
    // ---------------------------------------------

    // Detect the preview button element
    const isItPreviewButton = (el) => {
        if (
            el
            && el.tagName
            && el.tagName.toLowerCase() === 'a'
            && el.hasAttribute('data-bt-type')
            && el.getAttribute('data-bt-type') === 'bt-preview'
        ) {
            return el
        }

        // ...is it an element inside the download button?
        if (
            el
            && el.parentNode
            && el.parentNode.tagName
            && el.parentNode.tagName.toLowerCase() === 'a'
            && el.parentNode.hasAttribute('data-bt-type')
            && el.parentNode.getAttribute('data-bt-type') === 'bt-preview'
        ) {
            return el.parentNode
        }

        return false
    }

    // Detect the download button element
    const isItDownloadButton = (el) => {
        if (
            el
            && el.tagName
            && el.tagName.toLowerCase() === 'a'
            && el.hasAttribute('data-bt-type')
            && el.getAttribute('data-bt-type') === 'bt-download'
        ) {
            return el
        }

        // ...is it an element inside the download button?
        if (
            el
            && el.tagName
            && el.tagName.toLowerCase() === 'span'
            && el.parentNode
            && el.parentNode.hasAttribute('data-bt-type')
            && el.parentNode.getAttribute('data-bt-type') === 'bt-download'
        ) {
            return el.parentNode
        }

        return false
    }

    // Detect the download all button element
    const isItDownloadAllButton = (el) => {
        if (
            el
            && el.tagName
            && el.tagName.toLowerCase() === 'button'
            && el.hasAttribute('id')
            && el.getAttribute('id') === 'btCopyLinks'
        ) {
            return el
        }

        // ...or is it an element inside the download all button?
        if (
            el
            && el.parentNode
            && el.parentNode.tagName
            && el.parentNode.tagName.toLowerCase() === 'button'
            && el.parentNode.hasAttribute('id')
            && el.parentNode.getAttribute('id') === 'btCopyLinks'
        ) {
            return el.parentNode
        }

        return false
    }

    // Detect clicking the download buttons
    const onClickButtons = (e) => {

        // Did user click download button?
        let target = isItDownloadButton(e.target)
        if (target) {
            // console.log('Download button clicked!')
            e.preventDefault()

            // If URL is empty or is equal exceeded don't initiate download
            const url = target.getAttribute('href')
            if (!url || url === 'exceeded') {
                return
            }

            // If version of this extension is lower than extension version don't initiate download
            const minExtensionVersion = parseInt(target.getAttribute('data-ext-ver'))
            const extVersion = parseInt(chrome.runtime.getManifest().version.replaceAll('.', ''))
            if (extVersion < minExtensionVersion) {
                return
            }

            chrome.runtime.sendMessage({
                now: true,
                downloadSingle: [{
                    url: url,
                    filename: target.getAttribute('download'),
                    fileType: target.getAttribute('data-file-type'),
                    folder: target.getAttribute('data-download-folder'),
                    minExtensionVersion: minExtensionVersion
                }],
                extActions: getExtensionActions()
            })
        }

        // Did user click download all button?
        if (!target && isItDownloadAllButton(e.target)) {
            // console.log('Download All button clicked!')
            e.preventDefault()
            const dlButtons = document.querySelectorAll('.content-final-multi')
            const links = []
            dlButtons.forEach((el) => {
                const checkbox = el.querySelector('label input')
                if (checkbox && checkbox.checked) {
                    const link = el.querySelector('a[data-bt-type=bt-download], a[data-bt-type=bt-extension]')
                    if (link) {
                        // If URL is empty or is equal exceeded don't initiate download
                        const url = link.getAttribute('href')
                        if (!url || url === 'exceeded') {
                            return
                        }

                        // If version of this extension is lower than extension version don't initiate download
                        const minExtensionVersion = parseInt(link.getAttribute('data-ext-ver'))
                        const extVersion = parseInt(chrome.runtime.getManifest().version.replaceAll('.', ''))
                        if (extVersion < minExtensionVersion) {
                            return
                        }

                        links.push({
                            url: url,
                            filename: link.getAttribute('download'),
                            fileType: link.getAttribute('data-file-type'),
                            folder: link.getAttribute('data-download-folder'),
                            minExtensionVersion: minExtensionVersion
                        })
                    }
                }
            })
            if (links.length) {
                chrome.runtime.sendMessage({
                    now: true,
                    downloadMulti: links,
                    extActions: getExtensionActions()
                })
            }
        }

        // Did user click preview button?
        if (!target) {
            target = isItPreviewButton(e.target)

            if (target) {
                // If version of this extension is lower than extension version don't initiate preview
                const isPreviewable = target.getAttribute('data-is-previewable')
                if (isPreviewable === 'false') {
                    return
                }

                // If URL is empty or is equal exceeded don't initiate preview
                const url = target.getAttribute('href')
                if (!url || url === 'exceeded') {
                    return
                }

                // If version of this extension is lower than extension version don't initiate preview
                const minExtensionVersion = parseInt(target.getAttribute('data-ext-ver'))
                const extVersion = parseInt(chrome.runtime.getManifest().version.replaceAll('.', ''))
                if (extVersion < minExtensionVersion) {
                    return
                }

                // Let the extension to control the button
                e.preventDefault()

                chrome.runtime.sendMessage({
                    previewURL: url,
                    fileType: target.getAttribute('data-file-type'),
                    extActions: getExtensionActions()
                })
            }
        }
    }
    document.removeEventListener('click', onClickButtons)
    document.addEventListener('click', onClickButtons)

    // Listening for window.message
    // ---------------------------------------------
    const pageMessageListener = (message) => {
        // console.log('Content.js received window.message from App.js or Content.js: ', message)

        // Allow only external window.message from trusted origins
        if (message.source !== window) {
            return
        }
        if (message.origin !== 'https://www.locoloader.com' && message.origin !== 'https://www.locoloader.test') {
            return
        }

        // Detect message from Locoloader to initialize fetcher
        if (message.data.type && message.data.type.match(/^ext-/)) {
            // console.log('Content.js received window.message from App.js: ', message.data)

            // This sends message to both background.js (runtime.onMessage) and app.js (window.onmessage)
            // console.log('Content.js forwarded window.message to Background.js and App.js: ', message.data)
            chrome.runtime.sendMessage(message.data)
        }
    }
    window.removeEventListener('message', pageMessageListener)
    window.addEventListener('message', pageMessageListener)

    // Listening for message
    // ---------------------------------------------
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // console.log('Content.js received message from background.js: ', message)

        // Detect message from fetcher via backround.js
        if (message.hasOwnProperty('html')) {
            // Send message back to Locoloader
            // console.log('Content.js sent window.message to App.js and Content.js: ', message)
            window.postMessage(message, '*')
        }
    })

    // Helpers
    // ---------------------------------------------

    // Append div with id 'extension' to document to allow pages to detect the extension
    const extension = document.getElementById('extension')
    if (!extension) {
        const el = document.createElement('div')
        el.setAttribute('id', 'extension')
        el.setAttribute('data-ver', chrome.runtime.getManifest().version.replaceAll('.', ''))
        document.body.appendChild(el)
    }
}