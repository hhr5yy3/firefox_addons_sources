# GroupSpeedDial #
Speed dial with groups (folders) allows you to access pages you visit in an organized fashion.

## What it does ##
This is a 'Speed-dial'-like replacement for New Tab with advanced features.  
The goal is to provide 'as fast as possible' access to all pages using groups.  
All dials are synchronized with backend - for free!  
There are NO ads whatsoever!  

## The extension includes: ##
* dial.ts - the main dials page - it overrides the New tab page
* popup/popup.ts - options page AND browser action page for adding current page to dial or to search dials
* reload/reload.ts - this page is used to create thumbnails "in background" - the tab with this page is always created as hidden (using tabs.hide API)
* content_script.ts - used only in fastaddons.com domain to detect add-on to show "Return back to extension" button
* cs_maketext_integration.ts - content script for integration with "maketext.io" page (with its author permission)
* background/background_gsd.ts - handling everything else - database, cache, synchronization, thumbnails creation and history

#### Source code placeholders: ####
Source code contains several boolean placeholders that are replaced during the build time and the dead code is then removed during minification process.  
**Production Firefox build uses the following replacements:**
* $IS_CHROME - false
* $IS_CHROMIUM - false
* $IS_FIREFOX - true
* $NOT_FIREFOX - false
* $IS_THUNDERBIRD - false
* $IS_EDGE - false
* $IS_SAFARI - false
* $IS_PROD - true
* $IS_DEV - false
* $IS_WEB - false
* $IS_EXT - true
* $IS_NODE - false
* $IS_TEST - false

### Third party libraries: ###
This extension is using several 3rd party libraries:
- `vue` - Vue JS is popular framework for creating complex UI. Using Webpack we specify `vue.runtime.esm.js` version.
- `vuetify` - VueJS Material Design Component Framework.
- `v-mask` - VueJS directive for masking input fields.
- `vuedraggable` - VueJS component allowing to drag and drop elements.
- `@xstate/fsm` - XState Finite State Machine library. Used for the "Productivity mode" feature.
- `md5` - MD5 hashing library. Used to hash image data for fast comparison with existing thumbnails on the server.
- `base-x` - custom base encoder. It's used to encode data to base94 for efficient storage usage in `storage.sync` area.
- `lzma` - LZMA compression library. It's used to compress data before saving to `storage.sync` area.

### Linter warnings: ###
There is a several linter errors, which can be categorized into 2 groups:
1. ANDROID_INCOMPATIBLE_API - caused by a linter bug: https://github.com/mozilla/addons-linter/issues/5223
2. UNSAFE_VAR_ASSIGNMENT - caused by the 3rd party libraries (mostly Vue).

It would be better to somehow force Webpack to use original libraries without touching them, but I'm unable to find a way.
I've asked here with no success:
https://discourse.mozilla.org/t/how-to-configure-webpack-to-bundle-original-3rd-party-library-file/49448


# How to Build extension: #
Using NodeJS 20, go to folder with `package.json` file and run:
1) `npm ci`
2) `npm run prod`

Minified version will be created in "dist/firefox_prod.zip" archive.


## How to test extension: ##
Add-on works without an account but to test synchronization with cloud, an account is required.
You can create new with just one click using Gmail / Facebook / X (Twitter) or by using credentials:  
https://group-speed-dial.fastaddons.com/signIn  
