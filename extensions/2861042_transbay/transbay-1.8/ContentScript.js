function wait(delayTime) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delayTime) ;
}

function GetURL() {
    return window.location.href
}

function GetTitle() {
    // 可能是iframe 中，需要到最顶层的document
    return window.top.document.title
}

function checkAndSend(data) {
    // 存在NDLP的JS 不发送消息。
    if (hasDlpJs()) {
        return;
    }
    chrome.runtime.sendMessage(data);
}

function SendFileDetailsToAgent(fileList) {
    var array = {};
    array["url"] = GetURL();
    array["title"] = GetTitle();
    array["files"] = fileList;

    checkAndSend({"file_upload": array});
    // console.log("File details sent: ");
    // console.log(array);
    wait(500);
}

function SendFileDetail(fileList) {
    if (fileList == null || fileList.files == null || fileList.files.length == 0) {
        return;
    }

    var fileDetails = [];

    for (var i = 0; i < fileList.files.length; i++) {
        var fileDetail = fileList.files[i].name;
        // fileDetail += "|";
        // fileDetail += fileList.files[i].lastModified.toString();
        // fileDetail += "|";

        fileDetails.push(fileDetail);
    }

    SendFileDetailsToAgent(fileDetails);
}

async function getFile(fileEntry) {
    try {
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    } catch (err) {
        // console.log(err);
    }
}

async function getFolderEntries(directoryReader) {
    try {
        return await new Promise((resolve, reject) => directoryReader.readEntries(resolve, reject));
    } catch (err) {
        // console.log(err);
    }
}

async function ReadFileNames(directoryReader, outSubDirectories, outFileNames) {
    // console.log("ReadFileNames started");

    var entries = await getFolderEntries(directoryReader);

    if (entries.length) {
        for (var i = 0; i < entries.length; ++i) {
            if (entries[i].isFile == true) {
                var file = await getFile(entries[i]);

                var fileDetail = file.name;
                // fileDetail += '|';
                // fileDetail += file.lastModifiedDate.valueOf().toString();
                // fileDetail += '|';

                outFileNames.push(fileDetail);
                // console.log("Added filename: " + fileDetail + " in list");
            } else if (entries[i].isDirectory == true) {
                outSubDirectories.push(entries[i]);
                // console.log("Added subfolder: " + entries[i].name + " in list");
            }
        }

        ReadFileNames(directoryReader, outSubDirectories, outFileNames);
    } else {
        if (outSubDirectories.length == 0 && outFileNames.length > 0) {
            SendFileDetailsToAgent(outFileNames);
        } else if (outSubDirectories.length > 0) {
            var dirEntry = outSubDirectories.shift();
            // console.log("Started sub-folder: " + dirEntry.name);
            ReadFileNames(dirEntry.createReader(), outSubDirectories, outFileNames);
        }
    }

    // console.log("ReadFileNames completed");
}

function EnumAndSendFolderDetails(items, fileNameSet) {
    // console.log("EnumAndSendFolderDetails started");

    for (var i = 0; i < items.length; i++) {
        var entry = items[i].webkitGetAsEntry();
        if (entry.isFile) {
            fileNameSet.add(entry.name);
        } else if (entry.isDirectory) {
            var directoryReader = entry.createReader();

            filenames = [];
            subDirectories = [];
            ReadFileNames(directoryReader, subDirectories, filenames);
        }
    }

    // console.log("EnumAndSendFolderDetails completed");
}

function EnumAndSendFileDetails(files, fileNameSet) {
    // console.log("EnumAndSendFileDetails started");

    var fileDetails = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (fileNameSet.has(file.name)) {
            var fileDetail = file.name;
            // fileDetail += "|";
            // fileDetail += file.lastModified.toString();
            // fileDetail += "|";

            fileDetails.push(fileDetail);
        }
    }

    if (fileDetails.length > 0) {
        SendFileDetailsToAgent(fileDetails)
    }

    // console.log("EnumAndSendFileDetails completed");
}

function onDrop(event) {
    try {
        // console.log("onDrop started");
        if (event.dataTransfer == null || event.dataTransfer.items == null || event.dataTransfer.items.length == 0) {
            return;
        }

        let fileNameSet = new Set()
        EnumAndSendFolderDetails(event.dataTransfer.items, fileNameSet);
        EnumAndSendFileDetails(event.dataTransfer.files, fileNameSet);

        // console.log("onDrop completed");
    } catch (exception) {
        // console.log(exception.message);
    }
}

function onChange(event) {
    try {
        // console.log("onChange started");
        SendFileDetail(event.target);
        // console.log("onChange completed");
    } catch (exception) {
        // console.log(exception.message);
    }
}

function onPaste(event) {
    function sendImage(blob) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var imageBase64 = event.target.result;
            var array = {};
            array["url"] = GetURL();
            array["title"] = GetTitle();
            array["files"] = imageBase64;

            checkAndSend({"image_upload": array});
        };
        reader.readAsDataURL(blob);
    }

    try {
        // console.log("onPaste started");

        var pasteEventDataTransferObj = event.clipboardData;
        if (pasteEventDataTransferObj == null || pasteEventDataTransferObj.items == null || pasteEventDataTransferObj.items.length == 0) {
            return;
        }

        const isFileOrFolder = pasteEventDataTransferObj.items[0].webkitGetAsEntry();
        if (isFileOrFolder) {
            if (pasteEventDataTransferObj.items.length === 1 && pasteEventDataTransferObj.items[0].type.indexOf("image/png") !== -1 && isFileOrFolder.name.match("image.png|图片.png")) {
                sendImage(pasteEventDataTransferObj.items[0].getAsFile())
            } else {
                let fileNameSet = new Set()
                EnumAndSendFolderDetails(pasteEventDataTransferObj.items, fileNameSet);
                EnumAndSendFileDetails(pasteEventDataTransferObj.files, fileNameSet);
            }
        } else {
            var items = pasteEventDataTransferObj.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    sendImage(items[i].getAsFile())
                } else if (items[i].type.indexOf("text/plain") !== -1) {

                    items[i].getAsString(function (text) {
                        var array = {};
                        array["url"] = GetURL();
                        array["title"] = GetTitle();
                        array["files"] = text;
                        checkAndSend({"text_upload": array});
                    });
                }
            }
        }

        // console.log("onPaste completed");
    } catch (exception) {
        // console.log(exception.message);
    }
}


function start() {
    // console.log('start');
    if (!window.dlpExtensionStarted) {
        window.dlpExtensionStarted = true;
        document.addEventListener("drop", onDrop, true);
        document.addEventListener("change", onChange, true);
        document.addEventListener("paste", onPaste, true);
        // document.addEventListener("click", onClick, true);
    }
}

function reloadDLPEventListeners() {
    document.removeEventListener("drop", onDrop, true);
    document.removeEventListener("change", onChange, true);
    document.removeEventListener("paste", onPaste, true);

    document.addEventListener("drop", onDrop, true);
    document.addEventListener("change", onChange, true);
    document.addEventListener("paste", onPaste, true);
}


function hasDlpJs() {
    let dlpJs = document.querySelector("script[src*='ia_security_']")
    if (dlpJs === null) {
        return false;
    }
    return true;
}

if (!hasDlpJs()) {
    start();

//setTimeout() call is Required for about:blank pages from sites like
//outlook.office.com, which open a detached compose-new-message
//window.
    setTimeout(reloadDLPEventListeners, 1000);

}