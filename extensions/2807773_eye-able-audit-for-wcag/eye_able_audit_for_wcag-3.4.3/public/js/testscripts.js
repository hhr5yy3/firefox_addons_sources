chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "removeCss") {
        sendResponse({
            "remove": remove(request.checkBox)
        });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "checkButton") {
        sendResponse({
            "button": checkButton()
        });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "pdfHtml") {
        pdfHtml(request.categoryWarning, request.topN, request.warningCount, request.inputUrl)
        sendResponse({
            "status": "everthing ok"
        });
    }
});


function remove(checked) {
    if (checked) {
        document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())
    } else {
        location.reload();
    }
}

function checkButton() {
    // let listButtons = document.getElementsByTagName("button");
    // let emptyButtons = [];
    // for (let button of listButtons) {
    //     let toPrint = button.children;
    //     //console.log("KinderKnoten: ", toPrint);
    //     if (!button.value && !(button.innerText.length === 0)) {
    //         emptyButtons.push(button);
    //         button.style.border = "6px red solid";

    //     }
    // }
    // console.log(emptyButtons);
    // return emptyButtons
    let allLinks = document.links;
    console.log("allLinks", allLinks);
    let hrefs = [];
    let block = document.createElement("div");
    for (let i = 0; i < allLinks.length; i++) {
        hrefs.push(allLinks[i].href);
        let toAdd = document.createElement("p");
        let url = allLinks[i].href;
        addUrl = document.createTextNode(url);
        toAdd.appendChild(addUrl);
        block.appendChild(toAdd);
    }
    block.className = "pupsi";
    console.log("filtered: ", hrefs);
    return hrefs;
}

// here we create a new image
function createImage(dataURL) {
    // create a canvas
    var canvas = createCanvas(1000, 1000);
    // get the context of your canvas
    var context = canvas.getContext('2d');
    // create a new image object
    var croppedImage = new Image();

    croppedImage.onload = function () {
        // this is where you manipulate the screenshot (cropping)
        // parameter 1: source image (screenshot)
        // parameter 2: source image x coordinate
        // parameter 3: source image y coordinate
        // parameter 4: source image width
        // parameter 5: source image height
        // parameter 6: destination x coordinate
        // parameter 7: destination y coordinate
        // parameter 8: destination width
        // parameter 9: destination height
        context.drawImage(croppedImage, 10, 10, 1000, 1000, 0, 0, 250, 250);

        // canvas.toDataURL() contains your cropped image
        console.log(canvas.toDataURL());
    };
    croppedImage.src = dataURL; // screenshot (full image)
}
// creates a canvas element
function createCanvas(canvasWidth, canvasHeight) {
    var canvas = document.createElement("canvas");

    // size of canvas in pixels
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    return canvas;
}

// calling the captureVisibleTab method takes a screenhot
function createScreenshot(callback) {
    // you can have two image formats (jpeg and png)
    // for jpeg use { format: "jpeg", quality: 100 } (you can adjust the jpeg image quality from 0-100) 
    // for png use { format: "png" }
    chrome.tabs.captureVisibleTab(null, { format: "png" }, callback);
}