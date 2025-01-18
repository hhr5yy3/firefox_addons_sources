var selectingInput;
var sharingCtrl;

var activatingStep = 1;
var zipping = false;
var recording = false;
var zipResult;

async function onStartCapturingButtonClick() {
    
    if (checkElDisabled()) {
        return;
    }
     
    if (sharingCtrl) {
        try {
            await sharingCtrl._startCapturing();
            recording = true;
            setUI();
        }
        catch{
            
            zippping = false;
            recording = false;
            sharingCtrl.enableStartCapture = true;
            sharingCtrl.enableStopCapture = false;
            sharingCtrl.enableDownloadRecording = false;

            setUI();
        }

        //setTimeout(setUi, 2000); // in case when cancel click
    }
}

function onStopCapturingButtonClick() {
    if (checkElDisabled()) {
        return;
    }

    if (sharingCtrl) {
        sharingCtrl._stopCapturing();
        recording = false;
        setUI();
    }
}


async function onSelectGoogleFileButtonClick() {
    if (checkElDisabled()) {
        return;
    }

    try {
        let file = await driveManager.showPicker(null, picker => {
            picker.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
        });

        if (!file.docs.length) {
            throw "Error_NoFileSelected";
        }

        setDriveFile(file.docs);
        await onZipButtonClick();
    } catch (e) {
        if (e == "popup_closed_by_user" || e.action == "cancel") {
            return;
        }

        showError(e);
    }

}

function onSaveToPCButtonClick() {
    if (checkElDisabled()) {
        return;
    }

    if (sharingCtrl) {
        sharingCtrl._downloadRecording();
        setUI();
    }
    /*
    let url = getApiServer() + "api/epub/download" + getDownloadParams();
    openUrl(url);
    */
}

function showError(message, title) {
    swal("Error", message.toString(), "error");
}


async function onSaveToDriveButtonClick() {
    if (checkElDisabled()) {
        return;
    }


    try {

        if (sharingCtrl) {
            sharingCtrl.enableStartCapture = false;
            sharingCtrl.enableStopCapture = false;
            sharingCtrl.enableDownloadRecording = false;

            zipping = true;
            setUI();

            var response = await fetch(sharingCtrl.recording);
            if (response.ok) {
                try {
                    var blob = await response.blob();

                    var gresponse = await driveManager.saveFile("screen-recording.webm", blob);

                    swal(browser.i18n.getMessage('message_success_save') + " [" + gresponse.name + "]", "", "success");
                }
                catch (e) {
                    showError(e);
                }
            }
        }
    } catch (e) {
        showError(e);
    }
    finally {
        sharingCtrl.enableStartCapture = true;
        zipping = false;
        setUI();
    }
}

function setUI() {

    if (sharingCtrl) {
        var isStartEnabled = sharingCtrl.enableStartCapture;
        var isStopEnabled = sharingCtrl.enableStopCapture;
        var isDownloadEnabled = sharingCtrl.enableDownloadRecording;
        document.querySelectorAll("#start-recording-btn").forEach(el => {
            if (isStartEnabled) {
                el.classList.remove("disabled");
            } else {
                el.classList.add("disabled");
            }
        });
        document.querySelectorAll("#stop-recording-btn").forEach(el => {
            if (isStopEnabled) {
                el.classList.remove("disabled");
            } else {
                el.classList.add("disabled");
            }
        });
        document.querySelectorAll(".btn-download").forEach(el => {
            if (isDownloadEnabled) {
                el.classList.remove("disabled");
            } else {
                el.classList.add("disabled");
            }
        });

    }
    document.querySelectorAll(".fa-spinner").forEach(el => {
        if (zipping) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });
    document.querySelectorAll(".fa-google-drive").forEach(el => {
        if (zipping) {
            el.classList.add("hidden");
        } else {
            el.classList.remove("hidden");
        }
    });
    document.querySelectorAll("#icon-cam").forEach(el => {
        if (recording) {
            //el.classList.remove("cam-no-record");
            //el.classList.add("cam-record");
            el.src = "../icons/cam_record.png";
        } else {
            //el.classList.remove("cam-record");
            //el.classList.add("cam-no-record");
            el.src = "../icons/cam.png";
        }
    });

}

async function onFilesSelected() {
    let txtFiles = document.getElementById("txt-open-files");
    let files = txtFiles.files;

    if (!files || !files.length) {
        return;
    }

    let copiedFiles = [];
    let totalSize = 0;
    let totalCount = files.length;
    for (let i = 0; i < totalCount; i++) {
        let file = files[i];
        copiedFiles[i] = file;
        totalSize += file.size;
    }

    selectingInput = {
        files: copiedFiles,
        count: totalCount,
        size: totalSize,
    };

    txtFiles.value = "";
    setUI();

    await onZipButtonClick();

}

function setDriveFile(driveFile) {
    let totalSize = 0;
    driveFile.forEach(f => totalSize += Number(f.sizeBytes || f.size));

    selectingInput = {
        drive: driveFile,
        count: driveFile.length,
        size: totalSize,
    };

    setUI();
}


function showError(message, title) {
    title = title || getLanguageText("Error");

    swal(title.toString(), message.toString(), "error");
}

function getApiServer() {
    return document.querySelector("[data-api-server]").getAttribute("data-api-server");
}

function getDownloadParams(additionalParams) {
    let params = new URLSearchParams();
    params.append("id", zipResult.id);
    params.append("file", zipResult.path);

    if (additionalParams) {
        for (let param in additionalParams) {
            params.append(param, additionalParams[param]);
        }
    }

    return "?" + params.toString();
}

function setStartupUI() {
    let path = window.location.pathname.split('/');
    path = path[path.length - 1];

    if (path.indexOf("zip-") == 0) {
        let format = path.substr("zip-".length);

        let lbl = document.getElementById("zip-introduction");
        lbl.innerHTML = getLanguageText("EPUB_Introduction")
            .formatUnicorn(format);
    }
}

(function () {
    setStartupUI();
    sharingCtrl = document.getElementsByTagName("screen-sharing")[0];
    if (sharingCtrl) {
        sharingCtrl.toolbarHidden = true;
    }

    setUI();
    
})();