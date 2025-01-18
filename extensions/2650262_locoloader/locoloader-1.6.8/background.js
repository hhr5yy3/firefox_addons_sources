'use strict'

// Extension options
// ---------------------------------------------

// Get and set default value for each checkbox option
const extensionOptions = {
    btDlAllFolder: true,
    btDlFolder: false
}
for (const key in extensionOptions) {
    chrome.storage.local.get(key, (res) => {
        if (res.hasOwnProperty(key)) {
            extensionOptions[key] = res[key]
        }
    })
}

// Download
// ---------------------------------------------
function downloadLinks(message, index = 0) {
    // Proactively remove custom HTTP req/res headers
    removeHeaders(5)

    // Get links
    const links = message.downloadSingle || message.downloadMulti

    // All links were downloaded
    if (typeof links[index] === 'undefined') {
        return
    }

    // User can't download more links
    if (links[index].url === 'exceeded') {
        return
    }

    // Is it single download?
    const single = !!message.downloadSingle

    // Should we create download folder?
    const createFolder = single && extensionOptions.btDlFolder || !single && extensionOptions.btDlAllFolder

    // Is it native download?
    // Download can't be native if we need to set custom req/res HTTP headers
    let isNativeDownload = true
    let tmpHeaders = {}
    if (message.extActions && message.extActions.headers) {
        if (message.extActions.headers.download && Object.keys(message.extActions.headers.download).length !== 0) {
            isNativeDownload = false
            decodeCookies(message.extActions.headers.download)
            tmpHeaders = message.extActions.headers.download
        }
        else if (message.extActions.headers.both && Object.keys(message.extActions.headers.both).length !== 0) {
            isNativeDownload = false
            decodeCookies(message.extActions.headers.both)
            tmpHeaders = message.extActions.headers.both
        }
    }

    // Download using document element
    if (!isNativeDownload) {
        // Find any Locoloader tab and init download from it
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            url: [
                'https://www.locoloader.com/*',
                'https://www.locoloader.test/*'
            ]
        }, (tabs) => {
            // Did we find any Locoloader tab?
            if (!tabs[0]) {
                return
            }

            // Filename
            let filename = links[index].filename.replaceAll('/', '-')
            if (createFolder && links[index].folder) {
                filename = links[index].folder + '/' + filename
            }

            // Set download header
            tmpHeaders.action.responseHeaders = [{
                'header': 'content-disposition',
                'operation': 'set',
                'value': 'attachment; filename=' + filename
            }]

            // Set custom req/res HTTP headers
            setHeaders(tmpHeaders.action, tmpHeaders.condition, 5)

            setTimeout(() => {
                chrome.tabs.create({
                    url: links[index].url,
                    active: false,
                }, (Tab) => {

                    setTimeout(() => {
                        // Close tab
                        chrome.tabs.remove(Tab.id)

                        // Remove custom HTTP req/res headers 200ms after the download started
                        removeHeaders(5)
                    }, 200)

                    // Download next link
                    setTimeout(() => {
                        downloadLinks(message, (index + 1))
                    }, 500)
                })
            }, 100)

            // // Send message to content.js to create href and init download
            // console.log('Background.js sent message to content.js: ', {createHref: links[index].url})
            // chrome.tabs.sendMessage(tabs[0].id, {
            //     createHref: links[index].url
            // }, (res) => {
            //     // Got response from content.js, it means href was created and clicked
            //     console.log('Got response from content.js: ', res);
            //
            //     // Remove custom HTTP req/res headers 200ms after the download started
            //     setTimeout(() => {
            //         removeHeaders(5)
            //     }, 200)
            //
            //     // Download next link
            //     setTimeout(() => {
            //         downloadLinks(message, (index + 1))
            //     }, 500)
            // })
        })
    }

    // Download using browser native download function
    if (isNativeDownload) {
        // Download links
        for (let i = 0; i < links.length; i++) {
            if (links[i].url !== 'exceeded') {
                let filename = links[i].filename.replaceAll('/', '-')
                if (createFolder && links[i].folder) {
                    filename = links[i].folder + '/' + filename
                }
                setTimeout(() => {
                    chrome.downloads.download({
                        url: links[i].url,
                        filename: filename,
                        saveAs: false
                    })
                }, 250 * i)
            }
        }
    }
}

// Open pre-configured tab with fetcher.js
// ---------------------------------------------
function openTab(page) {
    return new Promise(async (resolve) => {

        // Open background tab with page.url
        chrome.tabs.create({
            active: false,
            url: page.url,
            openInReaderMode: false,
            muted: true,
        }, (tab) => {

            // console.log('Created tab:', tab)

            // Run fetcher.js with configuration object
            chrome.tabs.executeScript(tab.id, {
                code: `console.clear = () => {}; const LLPage = ${JSON.stringify(page)}`
            }, () => {

                chrome.tabs.executeScript(tab.id, {
                    file: 'fetcher.js'
                }, (result) => {

                    // console.log('Tab in background.js received result from fetcher.js: ', result)
                    // If response contains reFetch attribute,
                    // it means the page should be re-fetched
                    if (result && result[0].reFetch) {
                        setTimeout(async () => {
                            // Close fetched tab
                            chrome.tabs.remove(tab.id)

                            // Re-fetch only once
                            page['doNotReFetch'] = true // avoid re-fetching loop

                            // Re-open, re-fetch and return result from fetcher.js
                            resolve(await openTab(page))
                        }, 9000)

                    } else {
                        // Close fetched tab
                        chrome.tabs.remove(tab.id)

                        // Return result from fetcher.js
                        resolve(result)
                    }
                })
            })
        })
    })
}

// Listening for message
// ---------------------------------------------
chrome.runtime.onMessage.addListener(async (message, sender) => {
    // console.log('Background.js received message from Content.js: ', message)

    // Set options
    if (message.option === true) {
        extensionOptions[message.optionName] = message.optionVal
    }

    // Initiate preview
    if (message.previewURL) {
        // Update extension actions
        const extActions = message.extActions

        // Proactively remove custom HTTP headers
        removeHeaders(5)

        // Set preview link headers we got from extension actions
        if (extActions && extActions.headers) {
            if (extActions.headers.preview && (extActions.headers.preview.action.requestHeaders || extActions.headers.preview.action.responseHeaders)) {
                decodeCookies(extActions.headers.preview)
                setHeaders(extActions.headers.preview.action, extActions.headers.preview.condition, 5);
            } else if (extActions.headers.both && (extActions.headers.both.action.requestHeaders || extActions.headers.both.action.responseHeaders)) {
                decodeCookies(extActions.headers.both)
                setHeaders(extActions.headers.both.action, extActions.headers.both.condition, 5);
            }
        }

        setTimeout(() => {
            chrome.tabs.create({
                url: message.previewURL,
                active: true,
            }, (res) => {
                // Remove declarativeNetRequest session rules (remove preview link headers)
                setTimeout(() => {
                    removeHeaders(5)
                }, 200)
            })
        }, 100)
    }

    // Initiate single download on...
    if (message.downloadSingle && message.now === true) {
        downloadLinks(message)
    }

    // Initiate multi download on...
    if (message.downloadMulti && message.now === true) {
        downloadLinks(message)
    }

    // Fetch given URL within a new tab
    if (message.type && message.type === 'ext-tab') {
        // Set request headers
        if (message.headers.action && message.headers.condition) {
            // console.log('Setting headers: ', message.headers)
            setHeaders(message.headers.action, message.headers.condition, 5)
        }

        // Request
        const result = await openTab(message)
        // console.log('Background.js received message from Fetcher.js: ', result)

        // Remove request headers
        if (message.headers.action && message.headers.condition) {
            removeHeaders(5)
        }

        // Response
        // console.log('Background.js sent message to Content.js: ', result ? result[0] : {html: ''})
        chrome.tabs.sendMessage(sender.tab.id, result ? result[0] : {html: ''})
    }

    // Fetch given URL inline
    if (message.type && message.type === 'ext-fetch') {
        // Default response
        const pageObj = {
            'url': message.url,
            'headers': {},
            'html': '',
        }

        // Set request headers...
        let requestHeaders = []

        // ...other HTTP headers
        if (message.fetchOptions.headers && Object.keys(message.fetchOptions.headers)) {
            for (const [key, val] in message.fetchOptions.headers) {
                requestHeaders.push({
                    'header': key,
                    'operation': 'set',
                    'value': val
                })
            }
        }

        // ...referer
        if (message.fetchOptions.referrer) {
            requestHeaders.push({
                'header': 'Referer',
                'operation': 'set',
                'value': message.fetchOptions.referrer
            })
        }

        // ...referer policy
        if (message.fetchOptions.referrerPolicy) {
            requestHeaders.push({
                'header': 'Referrer-Policy',
                'operation': 'set',
                'value': message.fetchOptions.referrerPolicy
            })
        }

        // ...set headers
        if (requestHeaders.length) {
            setHeaders({
                'type': 'modifyHeaders',
                'requestHeaders': requestHeaders,
            }, {
                'resourceTypes': ['xmlhttprequest']
            }, 5)
        }

        // Request
        const fetchResponse = await fetch(message.url, message.fetchOptions ? message.fetchOptions : {})

        // Remove request headers
        if (requestHeaders.length) {
            removeHeaders(5)
        }

        // ...get page HTML
        pageObj.html = await fetchResponse.text()

        // ...get page HTTP headers
        pageObj.headers = Object.fromEntries(fetchResponse.headers.entries())

        // Response...
        // console.log('Background.js sent message to Content.js: ', pageObj)
        chrome.tabs.sendMessage(sender.tab.id, pageObj)
    }
})

// HTTP request / response modifications
// -------------------------------------

// Decode HTTP request cookie header value
function decodeCookies(headersObj) {
    if (headersObj.action && headersObj.action.requestHeaders) {
        for (const key in headersObj.action.requestHeaders) {
            if (headersObj.action.requestHeaders[key].header === 'cookie') {
                headersObj.action.requestHeaders[key].value = decodeURIComponent(headersObj.action.requestHeaders[key].value)
            }
        }
    }
}

// Set declarativeNetRequest HTTP headers
function setHeaders(action, condition, id = 1, priority = 1) {
    // console.log('Set headers (id): ', id)
    // console.log('Set headers (condition): ', condition)
    // console.log('Set headers (action): ', action)

    chrome.declarativeNetRequest.updateSessionRules({
        addRules: [
            {
                'id': id,
                'priority': priority,
                'action': action,
                'condition': condition
            }
        ],
        removeRuleIds: [id]
    })
}

// Remove declarativeNetRequest HTTP headers
function removeHeaders(id = 1) {
    // console.log('Remove headers (id): ', id)
    chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [id]
    })
}

// Always remove declarativeNetRequest session rules, just to be sure there are no hanging rules
removeHeaders(1)
removeHeaders(2)
removeHeaders(3)
removeHeaders(4)
removeHeaders(5)

// xHamster fix: Set correct referrer for xHamster MP4 files
setHeaders(
    {
        'type': 'modifyHeaders',
        'requestHeaders': [
            {
                'header': 'referer',
                'operation': 'set',
                'value': 'https://xhamster.com'
            }
        ],
    }, {
        'isUrlFilterCaseSensitive': false,
        'regexFilter': '^https?:\/\/.+\.cdn13\.com\/.+\.mp4',
        'resourceTypes': ['main_frame', 'media']
    },
    1
)

setHeaders(
    {
        'type': 'modifyHeaders',
        'requestHeaders': [
            {
                'header': 'referer',
                'operation': 'set',
                'value': 'https://xhcdn.com'
            }
        ],
    }, {
        'isUrlFilterCaseSensitive': false,
        'regexFilter': '^https?:\/\/.+\.xhcdn\.com\/.+\.mp4',
        'resourceTypes': ['main_frame', 'media']
    },
    2
)

setHeaders(
    {
        'type': 'modifyHeaders',
        'requestHeaders': [
            {
                'header': 'referer',
                'operation': 'set',
                'value': 'https://xhcdn.com'
            }
        ],
    }, {
        'isUrlFilterCaseSensitive': false,
        'regexFilter': '^https?:\/\/.+\.ahcdn\.com\/.+xhcdn.+\.mp4',
        'resourceTypes': ['main_frame', 'media']
    },
    3
)

// Audiomack fix: Set correct content type for Audiomack M4A files
setHeaders(
    {
        'type': 'modifyHeaders',
        'responseHeaders': [
            {
                'header': 'content-type',
                'operation': 'set',
                'value': 'audio/mp4',
            }
        ],
    }, {
        'isUrlFilterCaseSensitive': false,
        'regexFilter': '^https?:\/\/music\.audiomack\.com\/.*\.m4a',
        'resourceTypes': ['main_frame', 'media']
    },
    4
)

// Debug matched net requests
// This feature requires 'declarativeNetRequestFeedback' permission in manifest.json
// Todo: Comment this for production
// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
//     console.log(info)
// })

// Auto-update
// ---------------------------------------------

// Reload opened Locoloader tabs
function reloadTabs() {
    chrome.tabs.query({
        url: [
            'https://www.locoloader.com/*',
            'https://www.locoloader.test/*'
        ]
    }, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.reload(tab.id)
        })
    })
}

// Fired when the extension is installed and when the extension or Firefox is updated.
// Fired also when the extension is reloaded.
function onInstalled(details) {
    // Reload opened tabs
    reloadTabs()

    // Open Locoloader page when extension is installed for the first time
    if (details.reason && chrome.runtime.OnInstalledReason && chrome.runtime.OnInstalledReason.INSTALL && details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: 'https://www.locoloader.com' })
    }
}
chrome.runtime.onInstalled.addListener(onInstalled)

// Fired when user enables the extension
function onEnabled(extension) {
    if(extension.id === chrome.runtime.id) {
        reloadTabs()
    }
}
chrome.management.onEnabled.addListener(onEnabled)

// Automatically update the extension as soon as possible
chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload()
})