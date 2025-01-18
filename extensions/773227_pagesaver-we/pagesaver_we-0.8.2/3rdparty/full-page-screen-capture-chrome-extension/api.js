/* vim: set sw=4 sts=4 ts=4 et syntax=javascript: */

// Portions copyright (c) 2016-2022 Pearl Crescent, LLC.  All Rights Reserved.

window.CaptureAPI = (function() {
    const kHeaderHeight = 25;
    const kFooterHeight = 25;

    // Firefox enforces various limits on canvas elements including a max
    // dimension of 32767 and a maximum 2D image allocation that is controlled
    // by the hidden preference gfx.max-alloc-size.  As of 2020-07-06, that
    // preference value defaults to 500000000.
    // Default preference value:
    //   https://searchfox.org/mozilla-central/source/modules/libpref/init/StaticPrefList.yaml#4143
    // gfxPlatform::MaxAllocSize() (where pref is read)
    //   https://searchfox.org/mozilla-central/source/gfx/thebes/gfxPlatform.cpp#1196
    // gfxPlatform::InitMoz2DLogging() (where the default gfx config is set)
    //   https://searchfox.org/mozilla-central/source/gfx/thebes/gfxPlatform.cpp#1205
    // Factory::AllowedSurfaceSize() (where the gfx config is consulted)
    //   https://searchfox.org/mozilla-central/source/gfx/2d/Factory.cpp#309
    // Factory::CheckSurfaceSize() (where limits are enforced)
    //   https://searchfox.org/mozilla-central/source/gfx/2d/Factory.cpp#322
    //
    // We chose 30000 * 4000 to stay below the default gfx.max-alloc-size:
    //   Stride is width * 4 bytes/pixel, rounded up to a multiple of 16 bytes:
    //     stride = GetAlignedStride<16>(sz.width, 4) = 4000 * 4 = 16000
    //   Allocation size is height * stride:
    //     30000 * 16000 = 480000000
    var MAX_PRIMARY_DIMENSION = 30000,
        MAX_SECONDARY_DIMENSION = 4000,
        MAX_AREA = MAX_PRIMARY_DIMENSION * MAX_SECONDARY_DIMENSION;

    let isCancelPending = false;    // This assumes only one capture at a time.

    function initiateCapture(tab, options, callback) {
        const isUsingCaptureVisibleTab = (options.captureMethod === "scroll");
        chrome.tabs.sendMessage(tab.id,
                                {msg: 'scrollPage',
                                 tabID: tab.id,
                                 isScrollRequired: isUsingCaptureVisibleTab,
                                 captureOptions: options},
                                function(data) {
            // We're done taking snapshots of all parts of the window. Display
            // the resulting full screenshot images in a new browser tab.
              callback(data && (data.msg == "captureComplete"));
        });
    }


    function capture(data, captureMethod, headerText, footerText, screenshots,
                     sendResponse, progress, splitnotifier, errback) {
        const isUsingCaptureVisibleTab = (captureMethod === "scroll");
        function handleCapturedDataURI(dataURI) {
            if (dataURI) {
                var image = new Image();
                image.onerror = function() {
                    sendResponse(false);  // stop the page.js capture process.
                    errback('internal_error');
                };
                image.onload = function() {
                    data.image = {width: image.width, height: image.height};
                    let scale = 1.0;
                    // given device mode emulation or zooming, we may end up with
                    // a different sized image than expected, so let's adjust to
                    // match it!
                    const expectedWidth = isUsingCaptureVisibleTab
                                          ? data.windowWidth : data.destWidth;
                    if (expectedWidth !== image.width) {
                        scale = image.width / expectedWidth;
                        data.destX *= scale;
                        data.destY *= scale;
                        data.destWidth *= scale;
                        data.destHeight *= scale;
                        data.totalWidth *= scale;
                        data.totalHeight *= scale;
                    }

                    let headerHeight = 0;
                    if (headerText)
                        headerHeight = Math.ceil(kHeaderHeight * scale);
                    let footerHeight = 0;
                    if (footerText)
                        footerHeight = Math.ceil(kFooterHeight * scale);
                    data.totalHeight += headerHeight + footerHeight;

                    // lazy initialization of screenshot canvases (since we need to wait
                    // for actual image size)
                    if (!screenshots.length) {
                        Array.prototype.push.apply(
                            screenshots,
                            _initScreenshots(data.totalWidth, data.totalHeight,
                                             headerHeight, headerText,
                                             footerHeight, footerText, scale)
                        );
                        if (screenshots.length > 1) {
                            if (splitnotifier) {
                                splitnotifier(screenshots.length);
                            }
                        }
                    }

                    // draw it on matching screenshot canvases
                    _filterScreenshots(
                        data.destX, data.destY + headerHeight, image.width, image.height, screenshots
                    ).forEach(function(screenshot) {
                        screenshot.ctx.drawImage(
                            image,
                            data.destX - screenshot.left,
                            data.destY - screenshot.top + headerHeight
                        );
                    });

                    // send back log data for debugging (but keep it truthy to
                    // indicate success)
                    sendResponse(JSON.stringify(data, null, 4) || true);
                    progress(data.complete);
                };
                image.src = dataURI;
            }
        } // handleCapturedDataURI()

        if (isUsingCaptureVisibleTab) {
            chrome.tabs.captureVisibleTab(null, {format: 'png', quality: 100},
                                          function(dataURI) {
                handleCapturedDataURI(dataURI);
            });
        } else { // We are using captureTab().  Requires Firefox >= 82.0
            const r = {x: ("scrollX" in data) ? data.scrollX : data.destX,
                       y: ("scrollY" in data) ? data.scrollY : data.destY,
                       width: data.destWidth, height: data.destHeight};
            const p = browser.tabs.captureTab(data.tabID,
                          {format: 'png', quality: 100, rect: r,
                           scale: data.devicePixelRatio});
            p.then(dataURI => {
                handleCapturedDataURI(dataURI);
            }).catch(aErr => {
                const msg = (typeof aErr === "object" && ("message" in aErr))
                            ? aErr.message : "" + aErr;
                errback(msg);
            });
        }
    }


    function _initScreenshots(totalWidth, totalHeight,
                              headerHeight, headerText,
                              footerHeight, footerText, scale) {
        // Create and return an array of screenshot objects based
        // on the `totalWidth` and `totalHeight` of the final image.
        // We have to account for multiple canvases if too large,
        // because Chrome won't generate an image otherwise.
        //
        var badSize = (totalHeight > MAX_PRIMARY_DIMENSION ||
                       totalWidth > MAX_PRIMARY_DIMENSION ||
                       totalHeight * totalWidth > MAX_AREA),
            biggerWidth = totalWidth > totalHeight,
            maxWidth = (!badSize ? totalWidth :
                        (biggerWidth ? MAX_PRIMARY_DIMENSION : MAX_SECONDARY_DIMENSION)),
            maxHeight = (!badSize ? totalHeight :
                         (biggerWidth ? MAX_SECONDARY_DIMENSION : MAX_PRIMARY_DIMENSION)),
            numCols = Math.ceil(totalWidth / maxWidth),
            numRows = Math.ceil(totalHeight / maxHeight),
            row, col, canvas, left, top;

        var canvasIndex = 0;
        var result = [];

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                canvas = document.createElement('canvas');
                canvas.width = (col == numCols - 1 ? totalWidth % maxWidth || maxWidth :
                                maxWidth);
                canvas.height = (row == numRows - 1 ? totalHeight % maxHeight || maxHeight :
                                 maxHeight);

                left = col * maxWidth;
                top = row * maxHeight;

                let screenshot = {
                    canvas: canvas,
                    ctx: canvas.getContext('2d'),
                    index: canvasIndex,
                    left: left,
                    right: left + canvas.width,
                    top: top,
                    bottom: top + canvas.height
                };

                // Add optional header to images that are part of the first row.
                const fontSize = Math.ceil(15 * scale);
                const xPos = Math.ceil(8 * scale);
                const yPos = Math.ceil(7 * scale);
                if (headerText && (row == 0)) {
                    screenshot.ctx.fillStyle = "white";
                    screenshot.ctx.fillRect(0, 0, canvas.width, headerHeight);
                    if (col == 0) {
                        screenshot.ctx.fillStyle = "black";
                        screenshot.ctx.font = fontSize + "px sans-serif";
                        screenshot.ctx.fillText(headerText, xPos,
                                                headerHeight - yPos);
                    }
                }
                // Add optional footer to images that are part of the last row.
                if (footerText && (row == numRows - 1)) {
                    screenshot.ctx.fillStyle = "white";
                    let footerYPos = canvas.height - footerHeight;
                    screenshot.ctx.fillRect(0, footerYPos, canvas.width,
                                            footerHeight);
                    if (col == 0) {
                        screenshot.ctx.fillStyle = "black";
                        screenshot.ctx.font = fontSize + "px sans-serif";
                        screenshot.ctx.fillText(footerText, xPos,
                                                canvas.height - yPos);
                    }
                }
                result.push(screenshot);
                canvasIndex++;
            }
        }

        return result;
    }


    function _filterScreenshots(imgLeft, imgTop, imgWidth, imgHeight, screenshots) {
        // Filter down the screenshots to ones that match the location
        // of the given image.
        //
        var imgRight = imgLeft + imgWidth,
            imgBottom = imgTop + imgHeight;
        return screenshots.filter(function(screenshot) {
            return (imgLeft < screenshot.right &&
                    imgRight > screenshot.left &&
                    imgTop < screenshot.bottom &&
                    imgBottom > screenshot.top);
        });
    }


    function getBlobs(screenshots, options) {
        let format = (options && options.format) ? options.format : 'image/png';
        let quality = (options && options.quality) ? options.quality : 1.0;
        return screenshots.map(function(screenshot) {
            var dataURI = screenshot.canvas.toDataURL(format, quality);
            // TODO: If toDataURL() fails due to an image size limit, it 
            //       returns an empty data URL, i.e., "data:,"

            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // create a blob for writing to a file
            var blob = new Blob([ab], {type: mimeString});
            return blob;
        });
    }


    function saveBlob(blob, filename, index, callback, errback) {
        filename = _addFilenameSuffix(filename, index);

        function onwriteend() {
            // open the file that now contains the blob - calling
            // `openPage` again if we had to split up the image
            var urlName = ('filesystem:chrome-extension://' +
                           chrome.i18n.getMessage('@@extension_id') +
                           '/temporary/' + filename);

            callback(urlName);
        }

        // come up with file-system size with a little buffer
        var size = blob.size + (1024 / 2);

        // create a blob for writing to a file
        var reqFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        reqFileSystem(window.TEMPORARY, size, function(fs){
            fs.root.getFile(filename, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = onwriteend;
                    fileWriter.write(blob);
                }, errback); // TODO - standardize error callbacks?
            }, errback);
        }, errback);
    }


    function _addFilenameSuffix(filename, index) {
        if (!index) {
            return filename;
        }
        var sp = filename.split('.');
        var ext = sp.pop();
        return sp.join('.') + '-' + (index + 1) + '.' + ext;
    }


    function captureToBlobs(tab, callback, errback, progress, splitnotifier, options) {
        isCancelPending = false;

        var isExecScriptDone = false,
            screenshots = [],
            timeout = 3000,
            timedOut = false,
            noop = function() {};

        callback = callback || noop;
        errback = errback || noop;
        progress = progress || noop;

        // Define the listener as a variable so we can remove it when we are done.
        let listener = function(request, sender, sendResponse) {
            if (isCancelPending) {
                sendResponse(false);
                chrome.runtime.onMessage.removeListener(listener);
                return false;
            }

            if (request.msg === 'capture') {
                capture(request, options.captureMethod,
                        options.headerText, options.footerText, screenshots,
                        sendResponse, progress, splitnotifier, errback);

                // https://developer.chrome.com/extensions/messaging#simple
                //
                // If you want to asynchronously use sendResponse, add return true;
                // to the onMessage event handler.
                //
                return true;
            } else {
                console.error('Unknown message received from content script: ' + request.msg);
                errback('internal error');
                return false;
            }
        };

        const cleanup = () => {
            if (listener) {
                chrome.runtime.onMessage.removeListener(listener);
                listener = undefined;
            }
        };

        chrome.runtime.onMessage.addListener(listener);

        let pageScript = "page.js";
        if (options && ("jsPrefix" in options)) {
            pageScript = options.jsPrefix + '/' + pageScript;
        }
        chrome.tabs.executeScript(tab.id, {file: pageScript}, function(aRV) {
            isExecScriptDone = true;
            if (timedOut) {
                console.error('Timed out too early while waiting for ' +
                              'chrome.tabs.executeScript. Try increasing the timeout.');
                cleanup();
            } else if (aRV && aRV[0]) {
                progress(0);

                initiateCapture(tab, options, function(aDidComplete) {
                    if (aDidComplete)
                        callback(getBlobs(screenshots, options));
                    cleanup();
                });
            } else {
                cleanup();
                errback('invalid url');
            }
        });

        window.setTimeout(function() {
            if (!isExecScriptDone) {
                timedOut = true;
                cleanup();
                errback('execute timeout');
            }
        }, timeout);
    }


    function captureToFiles(tab, filename, callback, errback, progress, splitnotifier, options) {
        captureToBlobs(tab, function(blobs) {
            var i = 0,
                len = blobs.length,
                filenames = [];

            (function doNext() {
                saveBlob(blobs[i], filename, i, function(filename) {
                    i++;
                    filenames.push(filename);
                    i >= len ? callback(filenames) : doNext();
                }, errback);
            })();
        }, errback, progress, splitnotifier, options);
    }


    function cancelCapture() {
        isCancelPending = true;
    }

   return {
        captureToBlobs: captureToBlobs,
        captureToFiles: captureToFiles,
        cancelCapture: cancelCapture
    };

})();
