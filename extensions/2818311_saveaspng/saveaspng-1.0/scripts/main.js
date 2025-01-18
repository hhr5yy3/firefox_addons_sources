browser.menus.create(
    {
        id: "save-as-png",
        title: "Save as PNG",
        contexts: ["image"],
        icons: {
            64: "icons/64.png",
        },
    }
);

if (!browser.menus.onClicked.hasListener(onMenuClick)) {
    browser.menus.onClicked.addListener(onMenuClick);
}

function onMenuClick(info, tab) {
    console.log("Clicked on image", info.srcUrl);

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const outputImg = new Image();
        outputImg.src = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = outputImg.src;
        link.download = getFileName(info.srcUrl);
        link.click();
    };

    img.src = info.srcUrl;
}

const filenameRegex = /[^\/]\/([^\/.]+\.\w+)\/?/gm;
function tryMatchFilename(url) {
    let match;

    while ((match = filenameRegex.exec(url)) !== null) {
      return match[1];
    }
}

function getFileName(url) {
    try {
        const filename = tryMatchFilename(url);
        const array = filename.split(".");
        array.pop();
        array.push("png");
        return array.join(".");
    } catch {
        return "image.png";
    }
}