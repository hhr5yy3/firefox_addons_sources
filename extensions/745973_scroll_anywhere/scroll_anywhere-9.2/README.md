# ScrollAnywhere

## What it does ##
Extension emulates dragging scrollbar with your middle mouse button anywhere on the page (in all directions).


#### The extension includes: ####
* options/options.ts - options page
* popup/popup.ts - browser action page with basic setup and links
* content_script/scroll_anywhere.ts - listening for mouse events and performing scrolling
* background/background_sa.ts - listening on zoom level change, provides communication between iframes and parent window
* test_page/test_page.ts - test page shown inside iframe on the right side of the Options
* not_working/not_working.ts - page that explains why addon doesn't work on a current page (internal browser page, extension page, PDF page, reader view...)

#### Source code placeholders: ####
Source code contains several boolean placeholders that are replaced during the build time and the dead code is then removed during minification process.  
**Production Firefox build uses following replacements:**
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

# How to Build extension: #
Using NodeJS 16, open folder with `package.json` file and run:
1) `npm install`
1) `npm run prod`

Minified version will be created in "dist/firefox_prod.zip" archive. 
