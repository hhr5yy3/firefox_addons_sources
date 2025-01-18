## MobiDevTools

Considering Firefox the only browser for Android that offers the possibility of being able to install add-ons, I believe that implementing Eruda, mobile devtools, in a WebExtension was for me a necessary choice for developers who concentrate on debugging web apps. Add-on allows you to view the console, DOM elements, network traffic, source code, resources, and more.

»`Click the WebExtension's icon in the toolbar or menu to open the overlay.`

### Main Features
* Console * View JavaScript logs, errors, warnings, and other debug info. Execute arbitrary JS to interact with the webpage.
* Inspect into the DOM tree to see attributes, inline styles, CSS rules, and computed styles.
* Exploring in detail the network requests being made and inspect the responses.
* Resource * Show HTML5 Local Storage, HTML5 Session Storage, cookies, scripts, stylesheets, iframes, and image assets.
* Source code viewer for HTML, JS, and CSS.
* View the current URL, User Agent, and device details.
* Execute useful JavaScript snippets.
* Manage basic and advanced options directly in devtools

### Limitations
* WebExtension only works on sites that allow content scripts.

### LICENSE
MIT
### Release 0.4.7
* added vue devtools plugin
* support shadow dom
* quirks mode table rendering

### Release 0.4.0
* feat: replace fps and memory with monitor plugin
* fix: resource stylesheet show failed
* chore: remove licia utils
* chore: separate polyfill

### Release 0.3.5
* feat(network): filter
* feat(info): add backers
* feat(settings): use luna setting
* feat(resources): use luna data grid
* feat(resources): copy storage, cookie
* feat(network): filter
* feat(info): add backers
* feat(settings): use luna setting
* feat(resources): use luna data grid
* feat(resources): copy storage, cookie
* fix(sources): code not selectable
* fix(console): filter api
* fix: bottom safe area
* fix(console): filter function support
* fix: click event stop propagation
* fix: worker null error
* fix(sources): code not selectable
* fix(console): filter api

### Release 0.3.0:
* feat(sources): use luna text viewer
* feat(elements): split mode
* feat(network): split mode
* fix(resources): delete cookie
* fix(elements): select element using touch events
* feat(elements): integrate dom viewer
* feat(elements): element crumbs
* feat(elements): copy node and delete node
* feat(network): copy response
* feat(network): toggle recording
* chore: remove dom plugin snippet
* select and copy
* support android 5.0
* feat(sources): remove code beautify
* fix: code plugin theme
* drag to resize
* update icons
* use luna modal to replace browser prompt
* use luna data grid
* copy as curl
* update luna console and luna object viewer
