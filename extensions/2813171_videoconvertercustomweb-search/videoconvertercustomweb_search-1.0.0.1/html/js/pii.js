/**
 * Global Variable Declaration (Var)
 */

var searchInput1 = document.getElementsByClassName("search-text")[0];
var searchInput2 = document.getElementsByClassName("search-text")[1];

var loaderCount = document.querySelector(".loader-text");
var width = 1;
var interval;
var successInterval;
var responseUrl = "";
var cancelData = false;

/**
 * Global variable Declaration(let)
 */

let videoLogo = document.getElementsByClassName("logowrap")[0];
let mainWidget = document.getElementsByClassName("main-widget")[0];
let slideArrow = document.getElementsByClassName("slide-arrow")[0];
let downloadBtn = document.getElementsByClassName("download-btn")[0];
let menuOption = document.querySelectorAll(".menu-option");
let elem = getElementClassName("loader-animation-line");
let cancelText = getElementClassName('cancel-text');
let widgetStatus = false;
let isVideo = false;
let isProcessVideos = false;
let sizeLimit = 73400320;

//104857600 100MB
// 10485760 10MB;

let fileTypeError = false;
let fileSizeError = false;
let cancelClick;
let timer;
let controller;
let ApiFailedInterval;

let videoInfo = {
    inputType: "",
    fileName: "",
    fileSize: "",
    convertType: "",
};


/**
 * Global Variable Declaration(Const)
 */

const FILE_FORMAT = ["MP4", "MOV", "FLV", "WEBM", "MKV", "AVI", "WEBM"];
const displayType = {
    show: "show",
    hide: "hide",
};

const DEFAULT_CLASSNAMES = {
    Converting: 'converting',
    Download: 'download',
    DisableConvert: 'disabledConvert',
    DisableDownload: 'disabledDownload',
}

const ERROR_NODES = {
    ErrorElement: getElementClassName("error-area"),
    ErrorTextElement: getElementClassName('file-error'),
    FileSupportText: getElementClassName('error-helper'),
    ApiErrorElement: getElementClassName('api-failed-error'),
};

const VIDEO_DROP_NODES = {
    videoDropElement: getElementClassName("video-drop-area"),
    fileInput: getElementID("video"),
};

const CONVERT_NODES = {
    convertElement: getElementClassName("convert-area"),
};

const SELECT_BOX = {
    selectDropDown: getElementClassName("custom-select"),
    menuList: getElementClassName("selectItems"),
};

const UPLOAD_NODES = {
    uploadSectElement: getElementClassName("uploaded-section"),
};

const VIDEO_DATA = {
    videoName: getElementClassName("video-title"),
    videosList: getElementClassName("uploaded-videos"),
};

const FILE_VIEW_DATA = {
    FileText: getElementClassName('hide-file-button-text'),
}

const BUTTON_NODES = {
    buttonSectElement: getElementClassName("bottom-btn-wrapper"),
    convertButton: getElementClassName("convert-btn"),
    cancelButton: getElementClassName("cancel-text"),
};

const LOADER = {
    loaderElement: getElementClassName('preview-file-loder')
}


const HIDE_CLASSES = {
    ErrorArea: "hide-error",
    ConvertArea: "hide-convert-area",
    selectArea: "selectHide",
    divideLineArea: "hide-line",
    uploadArea: "hide-upload-section",
    buttonArea: "hide-btn-area",
    toolTipArea: "hide-tooltip",
    fileSupportArea: 'hide-file-text',
    fileTextButton: 'hide-file-button-text',
    ApiErrorArea: 'hide-api-error',
};

const TOOLTIP_NODES = {
    tooltip: getElementClassName("help-icon"),
    tooltipSectElement: getElementClassName("helper-tooltip"),
};

const DROP_AREA = VIDEO_DROP_NODES.videoDropElement;
const FILE_ELEMENT = VIDEO_DROP_NODES.fileInput;


/**
 *
 * @param {HTML} HTML_NODE
 * Get the DOM Element using className
 * @returns
 */

function getElementClassName(HTML_NODE) {
    if (HTML_NODE) {
        const HTML_ELEMENT = document.getElementsByClassName(HTML_NODE)[0];
        return HTML_ELEMENT;
    }
}

/**
 *
 * @param {HTML} HTML_NODE
 * Get the element by using ID
 * @returns
 */

function getElementID(HTML_NODE) {
    if (HTML_NODE) {
        const HTML_ELEMENT = document.getElementById(HTML_NODE);
        return HTML_ELEMENT;
    }
}

/**
 *
 * @param {HTML} HTML_NODE
 * @param {string} ClassName
 * Remove the class name from the DOM Element
 */


function RemoveClass(HTML_NODE, ClassName) {
    if (HTML_NODE && ClassName) {
        HTML_NODE.classList.remove(ClassName);
    }
}

/**
 *
 * @param {HTML} HTML_NODE
 * @param {string} ClassName
 * ADD class to the Dom element
 */

function AddClass(HTML_NODE, ClassName) {
    if (HTML_NODE && ClassName) {
        HTML_NODE.classList.add(ClassName);
    }
}

/**
 *
 * @param {HTML} HTML_NODE
 * @param {string} ClassName
 * DOM Element has specific class
 * @returns
 */

function CheckClassList(HTML_NODE, ClassName) {
    if (HTML_NODE.classList.contains(ClassName)) {
        return true;
    } else {
        return false;
    }
}

/**
 *
 * @param {HTML} ERROR_NODE
 * If DOM Element is not present
 */

function nodeError(ERROR_NODE) {
    // console.log("Node Element not found", ERROR_NODE);
}

/**
 *
 * @param {Number} time
 * @returns
 */

function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}

/**
 * Update Current Date Time to DOM Element
 */

function updateCurrentDateTime2() {
    var date = getCurrentTime();
    $("#custtime").html(date.value + " " + date.unit);
    $("#custdate").html(customDate2(new Date()));
    $(".currenttime .sep").css("display", "inline-block");
}

/**
 *
 * @param {Number} val
 * Get the current time of system
 * @returns
 */

function getCurrentTime(val) {
    var date = val || new Date();
    var format = {value: "", unit: ""};
    var tempDate = changeTimeFormatTo12Hr(date);
    format.value = tempDate.hours + ":" + tempDate.minutes;
    format.unit = tempDate.unit;
    format.hours = tempDate.hours;
    format.minutes = tempDate.minutes;
    return format;
}

/**
 *
 * @param {Date} date
 * Change the Time format to 12HR
 * @returns
 */
function changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var unit = getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit,
    };
}

/**
 *
 * @param {Number} hour
 * Get the Meridian from Hour
 * @returns
 */

function getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? "am" : "pm";
}

/**
 *
 * @param {Date} date
 * Customize the month from time
 * @returns
 */

function customDate2(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        wekdayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return wekdayName[date.getDay() + 0] + ", " + monthNames[date.getMonth() + 0] + " " + date.getDate();
}

/**
 * Cancel Reset Button handler
 */

function resetCancelClick() {
    cancelClick = new CustomEvent("cancelClick", {
        detail: false,
    });

    document.dispatchEvent(cancelClick);
}

/**
 *
 * @param {boolean} isProcessVideos
 * @param {Object} validationObj
 * File Format Error Handler
 */



function fileFormatError(isProcessVideos, validationObj) {
    const ERROR_NODE = ERROR_NODES.ErrorElement;
    const ERROR_TEXT = ERROR_NODES.ErrorTextElement;
    const FILE_SUPPORT_TEXT = ERROR_NODES.FileSupportText;

    if (validationObj) {
        if (validationObj.fileTypeError) {
            ERROR_TEXT.textContent = escapeHtml('File format not supported');
            RemoveClass(FILE_SUPPORT_TEXT, HIDE_CLASSES.fileSupportArea);
        }
        if (validationObj.fileSizeError) {
            ERROR_TEXT.textContent = escapeHtml('File size exceeds 70MB. Please try again.');
            AddClass(FILE_SUPPORT_TEXT, HIDE_CLASSES.fileSupportArea);
        }

        FILE_ELEMENT.value = "";
    }

    if (ERROR_NODE) {
        if (CheckClassList(ERROR_NODE, HIDE_CLASSES.ErrorArea) && isProcessVideos === false) {
            RemoveClass(ERROR_NODE, HIDE_CLASSES.ErrorArea);
        } else {
            AddClass(ERROR_NODE, HIDE_CLASSES.ErrorArea);
        }
    } else {
        nodeError(ERROR_NODE);
    }
}

/**
 *
 * @param {Boolean} isProcessVideos
 * Convert Button Functionality for Hide and Show
 */

function convertDomHandler(isProcessVideos) {
    const CONVERT_NODE = CONVERT_NODES.convertElement;
    if (CONVERT_NODE) {
        if (CheckClassList(CONVERT_NODE, HIDE_CLASSES.ConvertArea) && isProcessVideos === true) {
            RemoveClass(CONVERT_NODE, HIDE_CLASSES.ConvertArea);
        } else {
            AddClass(CONVERT_NODE, HIDE_CLASSES.ConvertArea);
        }
    } else {
        nodeError(CONVERT_NODE);
    }
}

/**
 *
 * @param {Boolean} isProcessVideos
 * Upload Section functionality for Hide and Show
 */

function uploadSectHandler(isProcessVideos) {
    const UPLOAD_NODE = UPLOAD_NODES.uploadSectElement;
    if (UPLOAD_NODE) {
        if (CheckClassList(UPLOAD_NODE, HIDE_CLASSES.uploadArea) && isProcessVideos === true) {
            RemoveClass(UPLOAD_NODE, HIDE_CLASSES.uploadArea);
        } else {
            AddClass(UPLOAD_NODE, HIDE_CLASSES.uploadArea);
        }
    } else {
        nodeError(UPLOAD_NODE);
    }
}

/**
 *
 * @param {Boolean} isProcessVideos
 * Button View Handler for Hide and Show
 */

function buttonViewHandler(isProcessVideos) {
    const BUTTON_NODE = BUTTON_NODES.buttonSectElement;
    if (BUTTON_NODE) {
        if (CheckClassList(BUTTON_NODE, HIDE_CLASSES.buttonArea) && isProcessVideos === true) {
            RemoveClass(BUTTON_NODE, HIDE_CLASSES.buttonArea);
        } else {
            AddClass(BUTTON_NODE, HIDE_CLASSES.buttonArea);
        }
    } else {
        nodeError(BUTTON_NODE);
    }
}

/**
 * ToolTip View Handler for Hide and Show
 */

function toolTipViewHandler() {
    const TOOLTIP_NODE = TOOLTIP_NODES.tooltipSectElement;
    if (TOOLTIP_NODE) {
        if (CheckClassList(TOOLTIP_NODE, HIDE_CLASSES.toolTipArea)) {
            RemoveClass(TOOLTIP_NODE, HIDE_CLASSES.toolTipArea);
        } else {
            AddClass(TOOLTIP_NODE, HIDE_CLASSES.toolTipArea);
        }
    } else {
        nodeError(TOOLTIP_NODE);
    }
}

/**
 * Download Message show handler
 */

function fileTextHandler() {
    const FILE_NODE = FILE_VIEW_DATA.FileText;
    if (FILE_NODE) {
        RemoveClass(FILE_NODE, HIDE_CLASSES.fileTextButton);
    } else {
        nodeError(FILE_NODE);
    }
}

/**
 * Menu List Handler for show and hide
 */

function MenuListHandler() {
    const MENU_DROP_DOWN = SELECT_BOX.menuList;
    if (MENU_DROP_DOWN) {
        if (CheckClassList(MENU_DROP_DOWN, HIDE_CLASSES.selectArea)) {
            RemoveClass(MENU_DROP_DOWN, HIDE_CLASSES.selectArea);
        } else {
            AddClass(MENU_DROP_DOWN, HIDE_CLASSES.selectArea);
        }
    } else {
        nodeError(MENU_DROP_DOWN);
    }
}

/**
 *
 * @param {string} FileExt
 * File Ext Handler
 * @returns
 */

function checkFileExt(FileExt) {
    let FileExtUpperCase = FileExt.toUpperCase();
    return FILE_FORMAT.includes(FileExtUpperCase);
}

/**
 *
 * @param {number} fileSize
 * check File Size limit
 * @returns
 */

function checkFileSize(fileSize) {
    let exactFileSize = fileSize;
    if (exactFileSize < sizeLimit) {
        return true;
    } else {
        return false;
    }
}

/**
 *
 * @param {string} fileType
 * File type to hide the option from the menu for same file format
 */

function hideMenuOption(fileType) {
    let menuOption = $("[data-attribute='" + fileType + "']")[0];
    AddClass(menuOption, "hide");
    const unselectedMenuOptions = $('.menu-option').not(".hide");
    document.querySelector(".selectSelected").textContent = escapeHtml(unselectedMenuOptions[0].getAttribute("data-attribute"));
    document.querySelectorAll(".menu-option").forEach((item) => {
        RemoveClass(item, "active");
    })
    AddClass(unselectedMenuOptions[0], "active");
    videoInfo.convertType = unselectedMenuOptions[0].getAttribute("data-attribute").toLowerCase();
}

/**
 *
 * @param {string} fileType
 * @param {number} fileSize
 * @returns
 */

function checkFileType(fileType, fileSize) {
    if (checkFileExt(fileType) && checkFileSize(fileSize)) {
        isVideo = true;
        hideMenuOption(fileType);
    } else {
        isVideo = false;
        fileTypeError = checkFileExt(fileType) === false ? true : false;
        fileSizeError = checkFileSize(fileSize) === true ? false : true;
    }

    return {
        isVideo: isVideo,
        fileTypeError: fileTypeError,
        fileSizeError: fileSizeError
    };
}

/**
 *
 * @param {Number} fileSize
 * convert Bytes to the other File Size format
 * @returns
 */

function fileSizeHandler(fileSize) {
    var fSExt = new Array("Bytes", "KB", "MB", "GB");
    let _size = fileSize,
        i = 0;
    while (_size > 900) {
        _size /= 1024;
        i++;
    }
    let exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
    return exactSize;
}

/**
 *
 * @param {File} fileData
 * File Information handler
 */
function fileInfoHandler(fileData) {
    document.querySelector(".video-title").textContent = escapeHtml(fileData.fileName);
    document.querySelector(".video-size").textContent = escapeHtml(fileSizeHandler(fileData.fileSize));
}

/**
 * Disable File Drop Area
 */

function disableDropArea() {
    AddClass(DROP_AREA, "disabled");
    VIDEO_DROP_NODES.fileInput.setAttribute("disabled", true);
}

/**
 * Enable File Drop Area
 */

function enableDropArea() {
    RemoveClass(DROP_AREA, "disabled");
    VIDEO_DROP_NODES.fileInput.removeAttribute("disabled");
}

/**
 * Enable Convert Button
 */

function enableConvertButton() {
    AddClass(BUTTON_NODES.buttonSectElement, "convert");
    RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.DisableConvert);
}

/**
 * Enable Download Button
 */

function enableDownloadButton() {
    AddClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.Download);
    AddClass(VIDEO_DATA.videosList, DEFAULT_CLASSNAMES.Download);
    AddClass(CONVERT_NODES.convertElement, DEFAULT_CLASSNAMES.Download);
    AddClass(UPLOAD_NODES.uploadSectElement, DEFAULT_CLASSNAMES.Download);
    RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.DisableDownload);
    RemoveClass(BUTTON_NODES.buttonSectElement, "convert");
}


function resetVideoInfo() {
    videoInfo.inputType = '';
    videoInfo.fileSize = '';
    videoInfo.fileName = '';
    videoInfo.convertType = '';
}

/**
 * Disable All the sections & Buttons
 */

function disableButtons() {

    RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.Converting);
    RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.Converting);
    RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.Converting);
    RemoveClass(VIDEO_DATA.videosList, DEFAULT_CLASSNAMES.Converting);
    RemoveClass(CONVERT_NODES.convertElement, DEFAULT_CLASSNAMES.Converting);
    RemoveClass(UPLOAD_NODES.uploadSectElement, DEFAULT_CLASSNAMES.Converting);
    RemoveClass(BUTTON_NODES.buttonSectElement, "convert");
    RemoveClass(VIDEO_DATA.videosList, DEFAULT_CLASSNAMES.Download);
    RemoveClass(CONVERT_NODES.convertElement, DEFAULT_CLASSNAMES.Download);
    RemoveClass(UPLOAD_NODES.uploadSectElement, DEFAULT_CLASSNAMES.Download);
    RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.Download);
    AddClass(ERROR_NODES.ApiErrorElement, HIDE_CLASSES.ApiErrorArea);
}


/**
 *
 * @param {String} input
 * @param {String} output
 * @param {String} videoUrl
 * API call to the server to get the converted File
 * @returns
 */

function convertVideo(input, output, videoUrl) {
    controller = new AbortController();
    const apiUrl = "https://videoconverterworld.com/apps/convertVideo";
    // console.log("output",output);
    const requestBody = {
        input: `${input}`,
        output: `${output}`,
        videoUrl: `${videoUrl}`,
    };
    // console.log("output:", output);
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(requestBody),
        signal: controller.signal
    };
    // console.log("requestOptions:", requestOptions);

    return new Promise((resolve, reject) => {
        fetch(apiUrl, requestOptions)
            .then(function (response) {
                // Check if the response status is OK (status code 200-299)
                if (!response.ok) {
                    // throw new Error("API request failed");
                    RemoveClass(ERROR_NODES.ApiErrorElement, HIDE_CLASSES.ApiErrorArea);
                    clearInterval(ApiFailedInterval);
                    ApiFailedInterval = setTimeout(function () {
                        discardVideo();
                    }, 5000)
                    FILE_ELEMENT.value = "";

                }
                // Read the JSON data from the response body
                return response.json();
            })
            .then(function (data) {
                if (cancelData == false) {
                    // console.log("API Response Data:", data);
                    downloadBtn.setAttribute("href", data.URL);
                    resolve(data);
                }
                // Resolve the promise with the response data
            })
            .catch((error) => {
                // Handle any errors that occurred during the API call
                // console.error("Error:", error);
                RemoveClass(ERROR_NODES.ApiErrorElement, HIDE_CLASSES.ApiErrorArea);
                clearInterval(ApiFailedInterval);
                ApiFailedInterval = setTimeout(function () {
                    discardVideo();
                }, 5000)
                FILE_ELEMENT.value = "";

                reject(error); // Reject the promise with the error
            });
    });
}

/**
 *
 * @param {VideoFile} videoFile
 * Convert the file to the BASE64 URL
 * @returns
 */

function convertVideoToBase64(videoFile) {
    return new Promise((resolve, reject) => {
        const inputFile = VIDEO_DROP_NODES.fileInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(inputFile);

        reader.onload = function (event) {

            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');

            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);

        };

        reader.onerror = function (error) {
            reject(error);
        };

    });
}

/**
 *
 * @param {FileName} fileName
 * Extract the File Extension from the File Name
 * @returns
 */

function extractFileExtension(fileName) {
    var dotIndex = fileName.lastIndexOf(".");

    // Extract the file extension using substring
    var inputType = fileName.substring(dotIndex + 1);
    return inputType;
}

/**
 * File Drop Handler Functionality when User drop or select the file in Input
 */

function fileDropHandler() {
    FILE_ELEMENT.addEventListener("change", function (e) {
        discardVideo();
        resetCancelClick();
        let files = e.target.files[0];
        var fileType = extractFileExtension(files.name);
        let fileSize = files.size;
        let validationObj = checkFileType(fileType.toUpperCase(), fileSize);
        if (files) {
            if (validationObj.isVideo) {
                isProcessVideos = true;
                var inputFomat = extractFileExtension(files.name);
                videoInfo.inputType = inputFomat;
                processVideo(files, isProcessVideos);
            } else {
                isProcessVideos = false;
                discardVideo(isProcessVideos, validationObj);
            }
        } else {
            discardVideo(isProcessVideos);
        }
    });

    /**
     * File Click Handler when user click on file input
     */
    FILE_ELEMENT.addEventListener("click", function (e) {
        this.value = "";
        discardVideo();
        menuRemoveHideClass();
        resetCancelClick();
        menuActiveHandler(menuOption[0]);
    });
}

/**
 * Menu Select handler from the Drop Down
 */

function selectDropDownHandler() {
    SELECT_BOX.selectDropDown.addEventListener("click", function (e) {
        MenuListHandler();
    });
}

/**
 *
 * @param {Selected Menu Option} activeMenu
 * Write the selected menu option text in selected box
 */

function addActiveToMenu(activeMenu) {
    document.querySelector(".selectSelected").textContent = escapeHtml(activeMenu);
}

/**
 *
 * @param {string} menuActiveOption
 * Activate the menu Options
 */

function menuActiveHandler(menuActiveOption) {
    menuOption.forEach((item) => {
        RemoveClass(item, "active");
    });
    let activeOption;
    let menuActive = menuActiveOption;
    AddClass(menuActive, "active");
    activeOption = menuActive.getAttribute("data-attribute");
    videoInfo.convertType = activeOption.toLowerCase();
    addActiveToMenu(activeOption);
}

/**
 * Remove Hide classes from Menu Options
 */
function menuRemoveHideClass() {
    menuOption.forEach((item) => {
        RemoveClass(item, "hide");
    });
}

/**
 * Menu Select Options Event handler
 */

function menuSelectHandler() {
    menuOption.forEach((menuItem) => {
        menuItem.addEventListener("click", function (e, i) {
            menuActiveHandler(this);
        });
    });
}

/**
 * Reset Progress Bar
 */

function resetProgressBar() {
    width = 0;
    clearInterval(interval);
    elem.style.width = width + "%";
    loaderCount.textContent = escapeHtml(width + "%");
}

/**
 * Reset Download file text
 */

function resetFileDownloadText() {
    clearTimeout(successInterval);
}

/**
 *
 * @param {String} elementName
 *  Progress Bar Handler
 * @returns
 */


function progressBar(elementName) {
    return new Promise((resolve, reject) => {
        clearInterval(interval);
        width = getElementClassName("loader-animation-line").style.width;
        width = width.replace("%", "");
        width = Number(width);
        if (elementName === "enableConvert") {
            widthLimit = 100;
        }
        if (elementName == 'halfDownload') {
            widthLimit = 75;
        }
        if (elementName == 'fullDownload') {
            widthLimit = 100;
        }

        interval = setInterval(frame, 10);

        function frame() {
            if (width >= widthLimit) {
                clearInterval(interval);
                resolve();
            } else {
                width++;
                elem.style.width = width + "%";
                loaderCount.textContent = escapeHtml(width + "%");
            }
        }
    })

}

/**
 * Success Text Interval Handler
 */

function successTextBar() {
    resetFileDownloadText();
    successInterval = setTimeout(() => {
        AddClass(FILE_VIEW_DATA.FileText, "hide-file-button-text");
    }, 5000);
}

/**
 *
 */

function attachVideo() {
    downloadBtn.addEventListener("click", function () {
        fileTextHandler();
        successTextBar();
    })
}

function cancelButtonTextChange() {
    cancelText.textContent = escapeHtml('Back');
}


document.addEventListener("cancelClick", (data) => {
    cancelData = data.detail
});


function ShowLoader() {
    RemoveClass(LOADER.loaderElement, 'hide');
}

function HideLoader() {
    AddClass(LOADER.loaderElement, 'hide');
}



function convertingButtonHandler(files) {
    BUTTON_NODES.convertButton.addEventListener("click", function (e) {
        disableButtons();

        AddClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.Converting);
        AddClass(VIDEO_DATA.videosList, DEFAULT_CLASSNAMES.Converting);
        AddClass(CONVERT_NODES.convertElement, DEFAULT_CLASSNAMES.Converting);
        AddClass(UPLOAD_NODES.uploadSectElement, DEFAULT_CLASSNAMES.Converting);

        RemoveClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.DisableConvert);
        AddClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.DisableDownload);

        convertVideoToBase64(files).then(function (videoUrl) {
            resetProgressBar();
            ShowLoader();
            setTimeout(() => {
                progressBar('halfDownload').then(() => {
                    convertVideo(videoInfo.inputType, videoInfo.convertType, videoUrl)
                        .then(function (data) {
                            responseUrl = data.URL;
                        })
                        .then(function () {
                            if (cancelData === false) {
                                progressBar('fullDownload').then(() => {
                                    HideLoader();
                                    disableButtons();
                                    enableDownloadButton();
                                    attachVideo();
                                    cancelButtonTextChange();
                                });
                            }
                        }).catch((error) => {
                        // console.log("Video conversion failed", error);
                    });
                });
            }, 1500);

        });
    });
}

function cancelButtonHandler() {
    BUTTON_NODES.cancelButton.addEventListener("click", function () {
        discardVideo();
        FILE_ELEMENT.value = "";
        cancelClick = new CustomEvent("cancelClick", {
            detail: true,
        });
        if (controller) {
            controller.abort();
        }
        document.dispatchEvent(cancelClick);
        menuRemoveHideClass();
        menuActiveHandler(menuOption[0]);
        cancelText.textContent = escapeHtml('Cancel');
    });
}

function toolTipHandler() {
    TOOLTIP_NODES.tooltip.addEventListener("click", function (e) {
        toolTipViewHandler();
    });
}

// Process Video After File Format correct

function processVideo(files, isProcessVideos) {
    clearInterval(ApiFailedInterval);
    videoInfo.fileName = files.name;
    videoInfo.fileSize = files.size;
    fileFormatError(isProcessVideos);
    convertDomHandler(isProcessVideos);
    uploadSectHandler(isProcessVideos);
    fileInfoHandler(videoInfo);
    convertingButtonHandler(files);
    buttonViewHandler(isProcessVideos);
    disableDropArea(isProcessVideos);
    resetProgressBar();
    progressBar('enableConvert').then(() => {
        enableConvertButton();
    });
}

// Error Handler on Video format Error

function discardVideo(isProcessVideos, validationObj) {
    AddClass(BUTTON_NODES.buttonSectElement, DEFAULT_CLASSNAMES.DisableConvert);
    AddClass(FILE_VIEW_DATA.FileText, "hide-file-button-text");
    fileFormatError(isProcessVideos, validationObj);
    convertDomHandler(isProcessVideos);
    uploadSectHandler(isProcessVideos);
    buttonViewHandler(isProcessVideos);
    enableDropArea();
    disableButtons();
    resetProgressBar();
    resetVideoInfo();
    HideLoader();
}

function openWidget() {
    mainWidget.classList.add("active");
    slideArrow.classList.add("active");
    videoLogo.classList.add("hide-filter");
}

function closeWidget() {
    mainWidget.classList.remove("active");
    slideArrow.classList.remove("active");
    videoLogo.classList.remove("hide-filter");
    AddClass(SELECT_BOX.menuList, HIDE_CLASSES.selectArea);
    AddClass(TOOLTIP_NODES.tooltipSectElement, HIDE_CLASSES.toolTipArea);
}


document.addEventListener("DOMContentLoaded", async function () {


    document.addEventListener("click", function (event) {
        let targetEle = event.target;
        if (!mainWidget.contains(targetEle) && !slideArrow.contains(targetEle) && !videoLogo.contains(targetEle)) {
            if (widgetStatus) {
                widgetStatus = false;
                closeWidget();
            }
        } else {
            if (!SELECT_BOX.selectDropDown.contains(targetEle)) {
                AddClass(SELECT_BOX.menuList, HIDE_CLASSES.selectArea);
            }
            if (!TOOLTIP_NODES.tooltip.contains(targetEle)) {
                AddClass(TOOLTIP_NODES.tooltipSectElement, HIDE_CLASSES.toolTipArea);
            }
        }
    });

    videoLogo.addEventListener("click", function (e) {
        e.preventDefault();
        if (!widgetStatus) {
            widgetStatus = true;
            openWidget();
        } else {
            widgetStatus = false;
            closeWidget();
        }
    });

    slideArrow.addEventListener("click", function (e) {
        e.preventDefault();
        if (!widgetStatus) {
            widgetStatus = true;
            openWidget();
        } else {
            widgetStatus = false;
            closeWidget();
        }
    });

    cancelText.textContent = escapeHtml('Cancel');
    searchInput1.setAttribute("autocomplete", "off");
    searchInput2.setAttribute("autocomplete", "off");
    searchInput1.blur();

    searchInput2.focus();

    // drop down handler //
    fileDropHandler();
    selectDropDownHandler();
    menuSelectHandler();

    cancelButtonHandler();
    toolTipHandler();
});

updateCurrentDateTime2();
window.setInterval(updateCurrentDateTime2, 1000);

var acceptButton = $(".accept");
var allowWidget = $(".allow-widget");
var acceptTerm = $(".accept-prompt");
var denyTerms = $("#denytTerms");
var denyTerms = $(".know-more");
var piiAccept = "piiAccept";
acceptButton.on("click", function (e) {
    closePiiWidget();
    chrome.runtime.sendMessage({task: "showOptInPage"}, function (response) {
    });
    // document.dispatchEvent(new Event('showOptInPage'));
});

denyTerms.on("click", function (e) {
    closePiiWidget();
    videoLogo.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
    storageReplacer.init().then(function () {
        allowWidget.hide();
        checkPiiStored();
        if (!storageReplacer.getLocalStorageItem('onboarding')) {
            storageReplacer.setLocalStorageItem('onboarding', 1);
        }
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === "piiAccept" && newValue === "1") {
            allowWidget.show();
            acceptTerm.hide();
            $("[n-widgetaction=link1],[n-widgetclick=link1]").removeClass("active");
            document.dispatchEvent(
                new CustomEvent("PiiAccept", {
                    detail: true,
                })
            );
            // showResponse();
            // initWidgetFunctions();
        } else if (key === "piiAccept" && newValue === "-1") {
            allowWidget.hide();
            acceptTerm.show();

            document.dispatchEvent(
                new CustomEvent("PiiAccept", {
                    detail: false,
                })
            );
        }
    }
});

var widgetElement = $(".slide-arrow");

widgetElement.on("click", function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem("piiAccept");
    if (accepted && accepted == 1) {
        allowWidget.show();
        acceptTerm.hide();
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: true,
            })
        );
    } else if (!accepted || accepted == -1) {
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: false,
            })
        );
    }
}

function closePiiWidget() {
    try {
        widgetStatus = false;
        closeWidget();
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: "cancel",
            })
        );
    } catch (e) {
        console.log(e);
    }
}