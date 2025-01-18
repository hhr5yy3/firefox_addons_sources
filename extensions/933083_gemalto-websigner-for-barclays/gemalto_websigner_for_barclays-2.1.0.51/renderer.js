// UTILITY FUNCTIONS
// Converts em size to pixels
function emToPx(emValue) {
    return parseFloat(getComputedStyle(document.documentElement).fontSize) * emValue;
}
// UTILITY FUNCTIONS END

// load customer's extra fonts in the background page
loadFonts(extraFonts);

// Returns number of lines able to fit in this rendering's height
function getRowCountPerPage(pageHeight, settings) {
    let fontSize = emToPx(parseFloat(settings.plaintext.fontSize));
    let leading = settings.plaintext.leading || fontSize; // use fontSize when leading is not specified
    let maximumDescent = settings.plaintext.maximumDescent || 0;
    return Math.floor((pageHeight - settings.plaintext.offsetY - maximumDescent) / leading);
}

// Returns number of pages estimated from length of data
function getPageCount(text, pageHeight, settings) {
    var lines = text.split("\n");
    var rowsPerPage = getRowCountPerPage(pageHeight, settings);
    console.log(`${lines.length} line(s) of text, page height is ${pageHeight}px, ${rowsPerPage} lines per page`);
    if (rowsPerPage == 0) {
        return 0;
    }
    return Math.ceil(lines.length / rowsPerPage);
}

// Checks that requested rendering is within boundaries defined in app_settings.js
// Returns 0 for no error, 1 for error. Details are logged in background scripts but not displayed to the user.
function isRenderingWithinBoundaries(width, height, pageHeight) { // FIXME: negative logic - retval doesnot match function name
    var error;

    if (width > boundaries.canvasDimension) {
        error = `Width (${width}) too big: maximum is ${boundaries.canvasDimension}px`;
    }

    if (height > boundaries.canvasDimension) {
        error = `Height (${height}) too big: maximum is ${boundaries.canvasDimension}px`;
    }

    if ((width * height) > boundaries.canvasArea) {
        error = `Canvas perimeter (${width}×${height} = ${width * height}px) too large: maximum is ${boundaries.canvasArea}px`;
    }

    if (pageHeight && (pageHeight > boundaries.pageHeight)) {
        error = `pageHeight (${pageHeight}) too big: maximum is ${boundaries.pageHeight}`;
    }

    if (error) {
        console.warn("Dimensions requested are incompatible with defined boundaries.\n" + error);
        return 1;
    }
    return 0;
}

// Takes an array of bytes and transforms it into a base64 encoded string
function Uint8ArrayToBase64String(array) {
    var binary = '';
    var len = array.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(array[i]);
    }
    return window.btoa(binary);
}

function formatSigningRefId(signingData) {
    let formattedData = signingData;
    const signingRefIdRegex = new RegExp(/(^Signing Reference ID:)/);
    const signingRefId = signingData.match(signingRefIdRegex);
    if (signingRefId) {
        formattedData = signingData.replace(signingRefIdRegex, "Signing Reference ID:\n      ");
    }
    
    return formattedData;
}

// Returns a rendered image from the given text, page height and page number.
// The returned data is in data URL format ("image/png" by default)
async function getImageFromData(data, dataType, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR, errorMessage) {
    var rendering;

    // Indent the signing reference ID, if necessary
    if (customerSettings.indentSigningId) {
        data = formatSigningRefId(data);
    }

    if (!errorMessage) {
        // if no errorMessage was defined when this function was called then we check for the most common errors ourselves
        if (getRowCountPerPage(pageHeight, browserSettings) <= 0) {
            errorMessage = default_errors['RENDERING_PAGE_TOO_SMALL'];
        } else if (isRenderingWithinBoundaries(windowWidth * dPR, windowHeight * dPR, pageHeight)) {
            errorMessage = default_errors['RENDERING_BOUNDARIES'];
        } else {
            // if after all this, no error have been found still, we render and see if we catch anything
            if (dataType === "text/html") {
                rendering = await renderHTML(data, pageHeight, windowWidth, windowHeight, browserSettings, dPR);
            } else {
                rendering = renderPlaintext(data, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR);
                console.log("getImageFromData: rendering.textFont:", rendering.textFont);
            }
            console.log("getImageFromData: rendering:", rendering);
            if (rendering.result === "error") {
                errorMessage = `Error when rendering ${dataType} document: ${errorMessage}`; // FIXME: errorMessage not defined here
                errorMessage = rendering.message;
            }
        }
    }

    if (errorMessage) { // render the error for the user to see
        errorSettings = structuredClone(browserSettings);
        errorSettings.plaintext.fontColor = "red";
        errorSettings.plaintext.backgroundColor = "white";

        // FIXME: render error message never fails?
        rendering = renderPlaintext(errorMessage, pageNumber, browserSettings.height, browserSettings.width, browserSettings.height, errorSettings, dPR);
    }
    console.log("getImageFromData: typeof(rendering.canvas):", typeof(rendering.canvas));
    let rv = {
        dataURL: rendering.canvas.toDataURL(),
        exception: errorMessage,
        height: rendering.canvas.height / dPR,
        width: rendering.canvas.width / dPR
    };
    if (dataType !== "text/html") {
        rv.textFont = rendering.textFont;
    }
    return rv;
}

// Crops the provided image to desired dimensions, expects the image to be in the data-url form.
// Returned cropped image is also in the data-url form
async function getImageCrop(imageSrc, sourceXOffset, sourceYOffset, width, height) {
    console.log(`getImageCrop - offset(x,y): (${sourceXOffset},${sourceYOffset}) size(wxh): (${width}x${height})`);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    var img = new window.Image();
    img.src = imageSrc;
    img.setAttribute('crossOrigin', 'anonymous');

    return new Promise((resolve,reject) => {
        img.onload = function() {
            ctx.drawImage(img, sourceXOffset, sourceYOffset, width, height, 0, 0, width, height);
            resolve(canvas.toDataURL());
        }
    });
}

// Returns a blank canvas with proper scale, font, etc.
function initializeCanvas(pageHeight, windowWidth, windowHeight, browserSettings, dPR, pageData) {
    var canvas = document.createElement("canvas");
    var width = windowWidth;
    var height = Math.max(pageHeight, windowHeight);
    var ctx = canvas.getContext("2d");

    // font to be used for rendering
    var fontSize = emToPx(parseFloat(browserSettings.plaintext.fontSize));
    ctx.font = `${fontSize}px ${browserSettings.plaintext.fontFamily}`;

    let textMetrics = ctx.measureText("A");
    console.log('text metrics of "A":', textMetrics);

    // Make sure page will fit into the canvas
    var maxHeight = Math.max(pageHeight, windowHeight);
    let pageWidth;
    if (pageData instanceof Array) {
        // find the length of the longest line, assume monospace font
        var longestIndex = 0;
        var longestLength = 0;
        for (i = 0; i < pageData.length; i++) {
            if (pageData[i].length > longestLength) {
                longestLength = pageData[i].length;
                longestIndex = i;
            }
        }

        // measure the longest line
        pageWidth = browserSettings.plaintext.offsetX + Math.ceil(ctx.measureText(pageData[longestIndex]).width);
        
        // // Get height of document, and make defined size smaller if document won't fill up the space
        // let lineHeight = Math.ceil(ctx.measureText(pageData.join("\\n")).actualBoundingBoxAscent + ctx.measureText(pageData.join("\\n")).actualBoundingBoxDescent) + 10;
        // let pageHeightFromText = browserSettings.plaintext.offsetY + (pageData.length * lineHeight);
        // height = Math.min(height, pageHeightFromText);
    }
    if (pageWidth > windowWidth) {
        console.log("initializeCanvas: Large page data detected");
        if ((pageWidth * dPR) > boundaries.canvasDimension) {
            console.log(`initializeCanvas: Error in document size: ${default_errors['RENDERING_LINE_TOO_LONG']}`);
            return default_errors['RENDERING_LINE_TOO_LONG'];
        } else if (isRenderingWithinBoundaries(pageWidth * dPR, maxHeight * dPR, pageHeight)) {
            console.log(`initializeCanvas: Error in document size: ${default_errors['RENDERING_BOUNDARIES']}`);
            return default_errors['RENDERING_BOUNDARIES'];
        } else {
            console.log(`initializeCanvas: Resizing canvas to fit longest line (from ${windowWidth}x${maxHeight} to ${pageWidth}x${maxHeight})`);
            width = Math.max(pageWidth, browserSettings.width); // making sure we are indeed using the larger number here
        }
    }

    canvas.width = Math.round(width * dPR);
    canvas.height = Math.round(height * dPR);
    ctx.scale(dPR, dPR);

    // fill the background
    ctx.fillStyle = browserSettings.plaintext.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // reset the font
    ctx.fillStyle = browserSettings.plaintext.fontColor;
    ctx.font = "" + fontSize + "px " + browserSettings.plaintext.fontFamily;

    x = browserSettings.plaintext.offsetX;

    return canvas;
}

// RENDERING OF HTML
// Returns a canvas with a drawing of the given HTML doc
// Returns a string on error
async function renderHTML(htmlContent, pageHeight, windowWidth, windowHeight, browserSettings, dPR) {
    var sanitizedHtml = DOMPurify.sanitize(htmlContent, {USE_PROFILES: {html: true}});
    if (DOMPurify.removed.length > 0) {
        var errorContentDirty = "Document contains disallowed scripts or tags. It cannot be signed.";
        console.log("renderHTML: Document contains disallowed scripts or tags");
        console.log("Array of disallowed content which was removed:");
        console.log(DOMPurify.removed);
        return {result: 'error', message: errorContentDirty};
    }

    // Create a new HTML document to pass into drawDocument
    var docToSign = document.implementation.createHTMLDocument();
    docToSign.body.innerHTML = sanitizedHtml;

    // Get width of rendered doc
    var containerIframe = document.createElement("iframe");
    var containerDiv = document.createElement("div");
    var fontSize = emToPx(parseFloat(browserSettings.plaintext.fontSize));
    var fontStyle = `${fontSize}px ${browserSettings.plaintext.fontFamily}`;
    containerDiv.style.font = fontStyle;

    containerDiv.innerHTML = htmlContent;

    document.body.appendChild(containerIframe);
    containerIframe.contentWindow.document.body.innerHTML = sanitizedHtml;
    var docWidth = containerIframe.contentWindow.document.body.scrollWidth;
    var docHeight = containerIframe.contentWindow.document.body.offsetHeight;
    document.body.removeChild(containerIframe);

    var canvas = initializeCanvas(docHeight, windowWidth, windowHeight, browserSettings, dPR, docWidth);
    if (typeof canvas === "string") {
        console.log(`renderHTML: Error when initializing the canvas.`);
        return {result: 'error', message: canvas};
    }

    // use the same font/display style for measuring and rendering
    var bodyElement = docToSign.getElementsByTagName("body")[0];
    if ( typeof bodyElement !== 'undefined' ) {
        bodyElement.style.font = fontStyle;
        bodyElement.style.display = "inline-block";
    }

    // draw HTML document
    return rasterizeHTML.drawDocument(docToSign, canvas).then(() => {
        console.log('renderHTML: HTML document rendered successfully.');
        return {result: 'ok', canvas};
    })
        .catch((err) => {
            console.log('renderHTML: Error when rendering HTML document.');
            return {result: 'error', message: err};
        });
}

// RENDERING OF PLAINTEXT
// Returns a canvas with a drawing of the given text
// Returns a string on error
function renderPlaintext(text, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR) {
    // split the data into individual lines
    var lines = text.split("\n");

    // determine which lines are to be drawn (depending on the page to be drawn)
    var startIndex = Math.min(getRowCountPerPage(pageHeight, browserSettings) * (pageNumber - 1), lines.length);
    var endIndex = Math.min(startIndex + getRowCountPerPage(pageHeight, browserSettings), lines.length);

    // select the displayed portion of data
    var pageData = lines.slice(startIndex, endIndex);

    var canvas = initializeCanvas(pageHeight, windowWidth, windowHeight, browserSettings, dPR, pageData);
    if (typeof canvas === "string") {
        console.log(`renderPlaintext: Error when initializing the canvas.`);
        return {result: 'error', message: canvas};
    }
    var ctx = canvas.getContext("2d");

    // draw multiline text
    let fontSize = emToPx(parseFloat(browserSettings.plaintext.fontSize));
    let leading = settings.plaintext.leading || fontSize; // use fontSize when leading is not specified
    for (i = 0; i < pageData.length; i++) {
        y = (i + 1) * leading + settings.plaintext.offsetY;
        ctx.fillText(pageData[i], x, y);
    }
    console.log("renderPlainText: font metrics:", ctx.measureText("A"));
    let metric = ctx.measureText("A");
    let textFont = {
        size: fontSize,
        width: metric.width,
        ascent: metric.fontBoundingBoxAscent,
        descent: metric.fontBoundingBoxDescent
    }
    // Firefox does not support FontMetrics.fontBoundingBoxDescent and fontBoundingBoxAscent
    // so measure some characters that are below baseline
    if (browserName === "Firefox") {
        metric = ctx.measureText("gy()[]{}");
        textFont.ascent = metric.actualBoundingBoxAscent;
        textFont.descent = metric.actualBoundingBoxDescent;
    }
    return {result: 'ok', canvas, textFont};
}

// Returns raw data of the rendered image from the given text, page height and page number.
// The returned data are base64 encoded
async function getWysiwysDataFromDocument(text, dataType, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR, xOffset = 0, yOffset = 0) {
    console.log("getWysiwysDataFromDocument: Rendering document for WYSIWYS");
    let t1 = window.performance.now();

    // Indent the signing reference ID, if necessary
    if (customerSettings.indentSigningId) {
        text = formatSigningRefId(text);
    }

    var rendering = undefined;
    if (dataType === "text/html") {
        rendering = await renderHTML(text, pageHeight, windowWidth, windowHeight, browserSettings, dPR);
    } else {
        rendering = renderPlaintext(text, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR);
    }

    // FIXME: add error handling -> check rendering.result
    rendering.canvas.toDataURL(); // workaround for toDataURL & getImageData discrepancy in Chrome

    // get the image data
    ctx = rendering.canvas.getContext("2d");
    data = ctx.getImageData(Math.round(xOffset * dPR),
        Math.round(yOffset * dPR),
        Math.round(windowWidth * dPR),
        Math.round(Math.min(windowHeight * dPR, (pageHeight - yOffset) * dPR)));
    let t2 = window.performance.now();
    console.log("getWysiwysDataFromDocument %cPERF: Canvas rendered in " + Math.floor(t2 - t1) + " milliseconds.", "color:blue;");

    // encode the data to base64
    console.log("getWysiwysDataFromDocument: Converting data to B64");
    t1 = window.performance.now();
    var result = Uint8ArrayToBase64String(data.data);
    console.log("getWysiwysDataFromDocument: Data converted (" + result.length.toString() + " bytes)");

    return result;
}

// Renders the data for WYSIWYS, using proper offsets to only draw currently visible data. Returns an array of samples (1px*4px rectangle).
async function getWysiwys2DataFromDocument(text, dataType, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR, xOffset = 0, yOffset = 0, tid) {
    console.log("getWysiwys2DataFromDocument: Rendering text for WYSIWYS v2");

    // Indent the signing reference ID, if necessary
    if (customerSettings.indentSigningId) {
        text = formatSigningRefId(text);
    }

    var rendering = undefined;
    if (dataType === "text/html") {
        rendering = await renderHTML(text, pageHeight, windowWidth, windowHeight, browserSettings, dPR);
        pageHeight = rendering.canvas.height;
    } else {
        rendering = renderPlaintext(text, pageNumber, pageHeight, windowWidth, windowHeight, browserSettings, dPR);
    }
    // FIXME: add error handling -> check rendering.result
    // get the image data
    console.log("xOffset:", xOffset);
    console.log("yOffset:", yOffset);
    console.log("dPR:", dPR);
    console.log("windowWidth: ", windowWidth);
    console.log("windowHeight:", windowHeight);
    console.log("pageHeight:", pageHeight);
    ctx = rendering.canvas.getContext("2d");
    data = ctx.getImageData(Math.round(xOffset * dPR),
        Math.round(yOffset * dPR),
        Math.round(windowWidth * dPR),
        Math.round(Math.min(windowHeight * dPR, (pageHeight - yOffset) * dPR)));

    console.log(`getWysiwys2DataFromDocument: Size is ${Math.round(windowWidth * dPR)}x${Math.round(Math.min(windowHeight * dPR, (pageHeight - yOffset) * dPR))}`);

    var samples = getSamples(data);
    console.log(`getWysiwys2DataFromDocument: Found ${samples.length} samples for WYSIWYS v2`);
    
    // compute the hash if crypto-functions are available (secure context)
    let hash;
    if (typeof(crypto.subtle) !== "undefined") {
        hash = hex(await crypto.subtle.digest("SHA-256", Uint8Array.from(data.data)));
    }

    return {
        data,
        samples,
        hash
    };
}
    
// Returns an array of arrays of 16 bytes, up to 48 bytes
function getSamples(data) {
    var samples = [];
    
    var arrOfFourConsecutivePixels = data.data.reduce(function(result, value, index, array) {
        if (index % 16 === 0) {
            result.push(array.slice(index, index + 16));
        }
        return result;
    }, []);
    
    for (i = 0; i < arrOfFourConsecutivePixels.length; i++) {
        var fourPixels = arrOfFourConsecutivePixels[i];
        var x = (i * 4) % data.width;
        var y = (i * 4 - x) / data.width;
        
        // all four pixels of a sample should be on the same line
        if (x + 4 <= data.width) {
            if (new Set(fourPixels.reduce(function(result, value, index, array) {
                // check that the fourPixels array contains at least two different colors
                if (index % 4 === 0) {
                    result.push(array.slice(index, index + 4).join(''));
                }
                return result;
            }, [])).size > 1) {
                samples.push({
                    rgba: Array.from(fourPixels),
                    offset: {
                        x,
                        y
                    }
                });
                var skip = Math.floor(data.width / 4);
                i += skip; // index skips to next line
            }
        }
    }
    
    if (samples.length > 3) {
        // will only execute if more than three samples were retrieved, preventing an array of undefined values to be unnecessarily sent to backend
        var randomThree = [];
        do {
            randomThree[randomThree.length] = samples.splice(Math.floor(Math.random() * samples.length), 1)[0];
        } while (randomThree.length < 3);
        
        return randomThree;
    }
    
    return samples;
}

// Returns one long hex string from buffer
function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        var value = view.getUint32(i);
        // toString(16) will give the hex representation of the number without padding
        var stringValue = value.toString(16);
        // We use concatenation and slice for padding
        var padding = '00000000';
        var paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    
    // Join all the hex strings into one
    return hexCodes.join("");
}

// Generates test text/HTML data for rendering
function generateTestData(dataType) {
    if (dataType === "text/html") {
        return `
        <body>
            <p>Some text</p>
            <table>
                <tr style="background-color: red; text-align: center;">
                    <td>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                        <h1>Table H1</h1>
                    </td>
                    <td>
                        <h2>Table H2</h2>
                    </td>
                    <td>
                        <h3>Table H3</h3>
                    </td>
                    <td>
                        <h3>Table H4</h3>
                    </td>
                    <td>
                        <h3>Table H5</h3>
                    </td>
                    <td>
                        <h3>Table H1</h3>
                    </td>
                    <td>
                        <h3>Table H2</h3>
                    </td>
                    <td>
                        <h3>Table H3</h3>
                    </td>
                    <td>
                        <h3>Table H4</h3>
                    </td>
                    <td>
                        <h3>Table H5</h3>
                    </td>
                </tr>
                <tr style="background-color: pink; text-align: center;">
                    <td>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                        <p>Content 1</p>
                    </td>
                    <td>
                        <p>Content 2</p>
                    </td>
                    <td>
                        <p>Content 3</p>
                    </td>
                    <td>
                        <p>Content 4</p>
                    </td>
                    <td>
                        <p>Content 5</p>
                    </td>
                    <td>
                        <p>Content 1</p>
                    </td>
                    <td>
                        <p>Content 2</p>
                    </td>
                    <td>
                        <p>Content 3</p>
                    </td>
                    <td>
                        <p>Content 4</p>
                    </td>
                    <td>
                        <p>IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent</p>
                    </td>
                </tr>
            </table>
        </body>
        `;
    } else {
        return `IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
            IamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontentIamsomeverylongcontent\n
        `;
    }
}
