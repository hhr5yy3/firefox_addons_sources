const listOfViews = ['crop-view', 'rotate-view', 'flip-view', 'filters-view', 'resize-view', 'adjustments-view']
var img = new Image();
let canvas,
    originalCanvas,
    originalCtx,
    ctx,
    withImage,
    noImage,
    uploadBtn,
    tabs,
    camanInstance,
    cropper,
    activatedView,
    resetCanvasInstance,
    resetCanvasOriginalInstance,
    targetLoader,
    applyBtn,
    controlsView;
let canvasVersionList = [];
let currentPointer = -1;
let canvasVersionListForOrginal = [];
let currentPointerForOriginal = -1;
let firstChange = false;
let originalHeight = 0;
let originalWidth = 0;
var heightRatioEditOriginal = 0.0;
var widthRatioEditOriginal = 0.0;
activatedView = '';
let CANVAS_WIDTH = 400;
let CANVAS_HEIGHT = 260;
let fileNameWithoutExtension = 'edited';
let fileExtension;

document.addEventListener('DOMContentLoaded', function () {
    CANVAS_WIDTH = document.getElementById('canvas').width;
    CANVAS_HEIGHT = document.getElementById('canvas').height;

    tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            viewname = tab.querySelector('p').textContent.toLowerCase();
            if (tab.classList.contains('active')) {
                if (viewname === 'crop' && cropper == null) {
                    // if current view is crop, crop is clicked but cropper is null
                    //Treat as new click. Continue outside if block
                } else if (document.querySelector(`.${viewname}-view`).style.display === 'block') {
                    // if current view is X, X is clicked and rightView of X is already visible then return.
                    return;
                }
            }
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            setActiveView(tab.querySelector('p').textContent.toLowerCase());
        });
    });

    //Initializing variables
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    withImage = document.querySelector('.with-image');
    noImage = document.querySelector('.no-image');
    uploadBtn = document.querySelector('#upload-image-button');
    targetLoader = document.getElementById('target_loader');
    applyBtn = document.querySelector('#apply-btn');
    controlsView = document.querySelector('.controls-view');
    withImage.style.display = 'none';
    noImage.style.display = 'flex';

    uploadBtn.addEventListener('change', () => uploadBtnChange());
});

function undoRedoBlueGrey(btn, blue, grey) {
    document.querySelector(`.${btn}-blue`).style.display = blue;
    document.querySelector(`.${btn}-grey`).style.display = grey;
    if (blue == 'none')
        document.querySelector(`#${btn}Button`).classList.remove(`${btn}-text`);
    else
        document.querySelector(`#${btn}Button`).classList.add(`${btn}-text`);
}

function setActiveView(view) {
    activatedView = view;
    if (noImage.style.display === 'flex') {
        return;
    }
    listOfViews.forEach(el => {
        document.querySelector(`.${el}`).style.display = 'none';
    });

    if (withImage.style.display === 'flex') {
        if (view !== 'crop') {
            cropper?.destroy();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (firstChange == false) {
                firstChange = true;

                Caman('#canvas', img, function () {
                    this.reInitializeCanvas();
                    this.render();
                });
            }
        } else {
            cropper = new Cropper(document.getElementById('canvas'), {
                viewMode: 2,
            });
        }
    }
    document.querySelector(`.${view}-view`).style.display = 'block';
}

function applyChange() {
    applyBtn.innerText = 'Applied';
    setTimeout(() => {
        applyBtn.innerText = 'Apply';
    }, 1000);
}

//Filter Feature
let filterButtons = document.querySelectorAll('.filter-buttons');
for (let filterButton of filterButtons) {
    filterButton.addEventListener('click', () => filterButtonSelected(filterButton));
}

function filterButtonSelected(clickedFilterButton) {
    sliders = document.querySelectorAll('.slider');
    for (let slider of sliders) {
        slider.value = 0;
    }
    for (let filterButton of filterButtons) {
        filterButton.classList.remove('active');
    }
    clickedFilterButton.classList.add('active');
    showLoader();
    if (controlsView){
        controlsView.style.cssText = `pointer-events: none; opacity: .4;`;
    }
    let clickedButtonIdText = clickedFilterButton.id;
    Caman('#canvas', img, function () {
        this.revert(false);
        this[clickedButtonIdText]();
        this.render(() => {
            setTimeout(() => {
                targetLoader.style.display = 'none';
                applyChange();
                if (controlsView){
                    controlsView.style.cssText = `pointer-events: all; opacity: 1;`;
                }    
            }, 1000);
            adjustUndoList('canvas', clickedButtonIdText);
        });
    });

    Caman('#originalCanvas', img, function () {
        this.revert(false);
        this[clickedButtonIdText]();
        this.render(() => {
            adjustUndoList('originalCanvas', clickedButtonIdText);
        });
    });
}

//Crop Feature
let fixedRatioButtons = document.querySelectorAll('.fixed-ratio');
let freeRatioButton = document.querySelectorAll('.free')[0];
for (let fixedRatioButton of fixedRatioButtons) {
    fixedRatioButton.addEventListener('click', () => fixedRatioButtonSelected(fixedRatioButton));
}
const standardAspectRatios = {
    'IG post': 1,
    'IG story': 9 / 16,
    'FB post': 16 / 9,
    'YT thumbnail': 16 / 9,
    'Twitter post': 2 / 1,
    'Pinterest large tile': 2 / 3,
    'Portrait': 3 / 4,
};

function fixedRatioButtonSelected(clickedFixedRatioButton) {
    if (!cropper) {
        cropper = new Cropper(document.getElementById('canvas'), {
            viewMode: 2,
        });
    }
    selectedRatio = clickedFixedRatioButton.innerText;
    if (selectedRatio === 'Fixed Ratio') {
        clickedFixedRatioButton = document.querySelectorAll('.fixed-ratio')[1];
    }
    for (let fixedRatioButton of fixedRatioButtons) {
        fixedRatioButton.classList.remove('active');
    }
    freeRatioButton.classList.remove('active');
    document.querySelector('.ratio-category').classList.add('active');
    clickedFixedRatioButton.classList.add('active');
    selectedRatio = clickedFixedRatioButton.innerText;
    cropper.setAspectRatio(standardAspectRatios[selectedRatio]);
}

freeRatioButton.addEventListener('click', () => {
    if (!cropper) {
        cropper = new Cropper(document.getElementById('canvas'), {
            viewMode: 2,
        });
    }
    for (let fixedRatioButton of fixedRatioButtons) {
        fixedRatioButton.classList.remove('active');
    }
    freeRatioButton.classList.add('active');
    cropper.setAspectRatio(0);
});

//Rotate Feature
let rotateButtons = document.querySelectorAll('.rotate-value');

for (let rotateButton of rotateButtons) {
    rotateButton.addEventListener('click', () => rotateImage(rotateButton, parseInt(rotateButton.attributes.degree.value)));
}

function rotateImage(clickedRotateButton, degrees) {
    for (let rotateButton of rotateButtons) {
        rotateButton.classList.remove('active');
    }

    var rotateParentElem = document.querySelector('.with-image');
    rotateParentElem.classList.remove('vertical');

    clickedRotateButton.classList.add('active');
    Caman('#canvas', img, function () {
        this.rotate(degrees);
        this.render(() => {
            Caman('#canvas', img, function () {
                this.reInitializeCanvas();
                this.render();
                applyChange();
            });
            tempCanvas = cloneCanvas(document.getElementById('canvas'));
            tempCtx = tempCanvas.getContext('2d');
            if (tempCanvas.height > CANVAS_HEIGHT) {
                rotateParentElem.classList.add('vertical');
            } else if (true) {
                rotateParentElem.classList.remove('vertical');
            }
            adjustUndoList('canvas', `rotate degrees ${degrees}`);
        });
    });

    Caman('#originalCanvas', img, function () {
        this.rotate(degrees);
        this.render(() => {
            Caman('#originalCanvas', img, function () {
                this.reInitializeCanvas();
                this.render();
            });
            adjustUndoList('originalCanvas', `rotate degrees ${degrees}`);
        });
    });
}

//Flip feature
let flipButtons = document.querySelectorAll('.flip-buttons');

for (let flipButton of flipButtons) {
    flipButton.addEventListener('click', () => flipImage(flipButton, flipButton.id));
}

function flipImage(clickedFlipButton, flipId) {
    for (let flipButton of flipButtons) {
        flipButton.classList.remove('active');
    }
    clickedFlipButton.classList.add('active');
    if (flipId === 'hflip') {
        Caman('#canvas', img, function () {
            this.flipHorizontal();
            this.render(() => {
                adjustUndoList('canvas', flipId);
                applyChange();
            });
        });

        Caman('#originalCanvas', img, function () {
            this.flipHorizontal();
            this.render(() => {
                adjustUndoList('originalCanvas', flipId);
            });
        });
    } else if (flipId === 'vflip') {
        Caman('#canvas', img, function () {
            this.flipVertical();
            this.render(() => {
                adjustUndoList('canvas', flipId);
                applyChange();
            });
        });

        Caman('#originalCanvas', img, function () {
            this.flipVertical();
            this.render(() => {
                adjustUndoList('originalCanvas', flipId);
            });
        });
    }
}

//Adjustment Feature
let sliders = document.querySelectorAll('.slider');
for (let slider of sliders) {
    slider.addEventListener('change', () => adjustmentSliderChange(slider));
}

function adjustmentSliderChange(slider) {
    Caman('#canvas', function () {
        showLoader();
        if (controlsView) controlsView.style.cssText = `pointer-events: none; opacity: .4;`;
        this.revert(false);
        for (let slider of sliders) {
            this[slider.id](parseInt(slider.value, 10));
        }

        this.render(() => {
            adjustUndoList('canvas', slider.id);
            applyChange();
            if (controlsView)
                controlsView.style.cssText = `
            pointer-events: all; 
            opacity: 1;
          `;
            targetLoader.style.display = 'none';
        });
    });

    Caman('#originalCanvas', function () {
        this.revert(false);
        for (let slider of sliders) {
            this[slider.id](parseInt(slider.value, 10));
        }
        this.render(() => {
            adjustUndoList('originalCanvas', slider.id);
        });
    });
}

//Downlaod feature
document.getElementById('download-btn').addEventListener("click", function (e) {
    if (noImage.style.display === 'flex' && withImage.style.display === 'none') {
        return;
    }

    var downloadCanvas = document.querySelector('#originalCanvas');
    var dataURL = downloadCanvas.toDataURL("image/jpeg", 1.0);
    downloadImage(dataURL, `${fileNameWithoutExtension}-photoeditor.${fileExtension}`);

});

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

const uploadCta = document.querySelector(".custom-label")
const uploadInput = document.getElementById("upload-image-button")

uploadCta.addEventListener("click", (e) => {
    uploadInput.click();
});

//Cancel Feature
let cancelButton = document.querySelector(".cancel");
let cancelOverlay = document.querySelector(".cancel-overlay");
let cancelClose = document.querySelector(".cancel-close");
let continueEditing = document.querySelector("#continue-editing");
let discardChanges = document.querySelector("#discard-changes");
let popupTitle = document.querySelector('.cancel-title');

cancelButton.addEventListener("click", () => {
    if (noImage.style.display === 'flex' && withImage.style.display === 'none') {
        return;
    }
    popupTitle.innerText = 'Quit Editing?'
    discardChanges.innerText = 'Cancel'
    cancelOverlay.style.display = 'flex';
});

continueEditing.addEventListener("click", () => {
    cancelOverlay.style.display = 'none';
});

cancelClose.addEventListener("click", () => {
    cancelOverlay.style.display = 'none';
});

discardChanges.addEventListener("click", () => {
    if (discardChanges.innerText === 'Cancel') {
        cancelOverlay.style.display = 'none';
        withImage.style.display = 'none';
        noImage.style.display = 'flex';
        img = null;
        canvas = null;
        originalCanvas = null;
        resetCanvasInstance = null;
        resetCanvasOriginalInstance = null;
        cropper?.destroy();
        cropper = null;
        canvasVersionList = [];
        currentPointer = -1;
        canvasVersionListForOrginal = [];
        currentPointerForOriginal = -1;
        firstChange = false;
        originalHeight = 0;
        originalWidth = 0;
        heightRatioEditOriginal = 0.0;
        widthRatioEditOriginal = 0.0;
        adjustUIonReset();
        document.getElementById('right-div').style.display = 'none';
        document.querySelector('.widget-inner').classList.remove('gray');
        uploadBtn.value = '';
        undoRedoBlueGrey('undo', 'none', 'block');
        undoRedoBlueGrey('redo', 'none', 'block');
    } else {
        cancelOverlay.style.display = 'none';
        resetImage();
        undoRedoBlueGrey('undo', 'none', 'block');
        undoRedoBlueGrey('redo', 'none', 'block');
    }
});


//Apply Feature - For Resize and Crop
if (!applyBtn)
    applyBtn = document.querySelector('#apply-btn');
const widthInput = document.querySelector("#input-width");
const heightInput = document.querySelector("#input-height");

widthInput.addEventListener('keypress', function (event) {
    if (event.key.match(/[0-9]/) === null) {
        event.preventDefault();
    }
});

heightInput.addEventListener('keypress', function (event) {
    if (event.key.match(/[0-9]/) === null) {
        event.preventDefault();
    }
});

widthInput.addEventListener('input', () => {
    widthInput.value = widthInput.value.replace(/[^0-9]/g, '');
    if (widthInput.value > 9999) {
        widthInput.value = 9999;
    }
});

heightInput.addEventListener('input', () => {
    heightInput.value = heightInput.value.replace(/[^0-9]/g, '');
    if (heightInput.value > 9999) {
        heightInput.value = 9999;
    }
});

applyBtn.addEventListener("click", () => {
    if (noImage.style.display === 'flex' && withImage.style.display === 'none') {
        return;
    }
    if (activatedView === 'resize') {
        finalWidth = 0;
        finalHeight = 0;
        mWidth = Math.floor(widthInput.value);
        mHeight = Math.floor(heightInput.value);

        if (isNaN(mWidth) || mWidth <= 0) {
            alert("Please enter a value between 1 and 9999 pixels");
            return;
        }
        if (isNaN(mHeight) || mHeight <= 0) {
            alert("Please enter a value between 1 and 9999 pixels");
            return;
        }
        mAspect = mWidth / mHeight;
        if (mAspect <= (CANVAS_WIDTH / CANVAS_HEIGHT)) {
            y = (mWidth * CANVAS_HEIGHT) / mHeight;
            finalWidth = y;
            finalHeight = CANVAS_HEIGHT;
        } else {
            x = (mHeight * CANVAS_WIDTH) / mWidth;
            finalWidth = CANVAS_WIDTH;
            finalHeight = x;
        }
        Caman('#canvas', img, function () {
            this.resize(Math.floor(finalWidth), Math.floor(finalHeight));
            this.render(() => {
                var rotateParentElem = document.querySelector(".with-image");
                if (document.getElementById('canvas').height <= CANVAS_HEIGHT) {
                    rotateParentElem.classList.remove('vertical');
                } else {
                    rotateParentElem.classList.add('vertical');
                }
                adjustUndoList('canvas', 'resize')
                applyChange();
            });
        });

        Caman('#originalCanvas', img, function () {
            this.resize(Math.floor(mWidth), Math.floor(mHeight));
            this.render(() => {
                adjustUndoList('originalCanvas', 'resize')
            });
        });
    }

    if (activatedView === 'crop') {
        if (!cropper) {
            return;
        }
        const croppedCanvas = cropper.getCroppedCanvas();
        const cropData = cropper.getData();

        // Access the coordinates
        const x1 = cropData.x;
        const y1 = cropData.y;
        const cropWidth = cropData.width;
        const cropHeight = cropData.height;


        target = {
            x: Math.floor(x1 * widthRatioEditOriginal),
            y: Math.floor(y1 * heightRatioEditOriginal),
            width: Math.floor(cropWidth * widthRatioEditOriginal),
            height: Math.floor(cropHeight * heightRatioEditOriginal),
        };

        Caman('#canvas', function () {
            this.crop(croppedCanvas);
            this.render(() => {
                var rotateParentElem = document.querySelector(".with-image");
                if (document.getElementById('canvas').height <= CANVAS_HEIGHT) {
                    rotateParentElem.classList.remove('vertical');
                } else {
                    rotateParentElem.classList.add('vertical');
                }
                adjustUndoList('canvas', 'crop');
                cropper?.destroy();
                cropper = null;
                applyChange();
            });
        });

        let originalCropper = new Cropper(document.getElementById('originalCanvas'), {
            viewMode: 2,
            data: target,
            ready: function () {
                document.querySelector('.cropper-container').style.display = 'none';
                originalCropCanvas = originalCropper.getCroppedCanvas();
                Caman('#originalCanvas', function () {
                    this.crop(originalCropCanvas);
                    this.render(() => {
                        adjustUndoList('originalCanvas', 'crop');
                        originalCropper?.destroy();
                        originalCropper = null;
                    });
                });
            }
        });
    }
});

function adjustUndoList(canvasId, identifier) {
    if (canvasId === 'canvas') {
        canvasVersionList[++currentPointer] = {
            "canvas": cloneCanvas(document.getElementById(canvasId)),
            "identifier": identifier
        };
        canvasVersionList.length = currentPointer + 1;

        undoRedoBlueGrey('undo', 'block', 'none');
        undoRedoBlueGrey('redo', 'none', 'block');

    } else if (canvasId === 'originalCanvas') {
        canvasVersionListForOrginal[++currentPointerForOriginal] = {
            "canvas": cloneCanvas(document.getElementById(canvasId)),
            "identifier": identifier
        };
        canvasVersionListForOrginal.length = currentPointerForOriginal + 1;
    }
}

// Reset Feature
function adjustUIonReset() {
    //Adjust sliders to zero
    sliders = document.querySelectorAll('.slider');
    for (let slider of sliders) {
        slider.value = 0;
    }

    //Resize input box to be empty
    widthInputBox = document.querySelector("#input-width");
    heightInputBox = document.querySelector("#input-height");
    widthInputBox.value = '';
    heightInputBox.value = '';

    //Filters active class to be removed
    allFilterButtons = document.querySelectorAll('.filter-buttons');
    for (let filterButton of allFilterButtons) {
        filterButton.classList.remove('active');
    }

    //Flip active class to be removed
    allFlipButtons = document.querySelectorAll('.flip-buttons');
    for (let flipButton of allFlipButtons) {
        flipButton.classList.remove('active');
    }

    //Rotate active class to be removed
    allRotateButtons = document.querySelectorAll('.rotate-value');
    for (let rotateButton of allRotateButtons) {
        rotateButton.classList.remove('active');
    }

    //Crop active class to be removed
    allFixedRatioButtons = document.querySelectorAll('.fixed-ratio');
    for (let fixedRatioButton of allFixedRatioButtons) {
        fixedRatioButton.classList.remove('active');
    }

}

let resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener("click", () => {
    if (noImage.style.display === 'flex' && withImage.style.display === 'none') {
        return;
    }
    popupTitle.innerText = 'Reset Changes?'
    discardChanges.innerText = 'Reset changes'
    cancelOverlay.style.display = 'flex';
});

function resetImage() {
    cropper?.destroy();
    cropper = null;
    originalCropper = null;
    Caman('#canvas', function () {
        adjustUIonReset();
        this.reset(resetCanvasInstance);
        this.render(() => {
            resetCanvasInstance = cloneCanvas(document.getElementById('canvas'));
        });
    });

    Caman('#originalCanvas', function () {
        this.reset(resetCanvasOriginalInstance);
        this.render(() => {
            resetCanvasOriginalInstance = cloneCanvas(document.getElementById('originalCanvas'));
            canvasVersionList = [];
            currentPointer = -1;
            canvasVersionListForOrginal = [];
            currentPointerForOriginal = -1;
            canvasVersionList[++currentPointer] = { "canvas": cloneCanvas(document.getElementById('canvas')), "identifier": "uploadedImage" };
            canvasVersionListForOrginal[++currentPointerForOriginal] = { "canvas": cloneCanvas(document.getElementById('originalCanvas')), "identifier": "uploadedImage" };
        });
    });

}

//Undo
undoButton = document.querySelector('#undoButton');

undoButton.addEventListener('click', () => {
    len = canvasVersionList.length;
    temp = Math.max((currentPointer - 1), 0);
    if (temp == 0) {
        undoRedoBlueGrey('undo', 'none', 'block');
    }
    if (len <= 1) {
        undoRedoBlueGrey('redo', 'none', 'block');
    } else {
        undoRedoBlueGrey('redo', 'block', 'none');
    }
    prevData = canvasVersionList[temp];
    prevCanvas = prevData.canvas;
    identifier = prevData.identifier;
    if (prevCanvas.hasAttribute('data-caman-id')) {
        prevCanvas.removeAttribute('data-caman-id');
    }
    cropper?.destroy();
    cropper = null;
    originalCropper = null;
    Caman('#canvas', function () {
        this.crop(prevCanvas);
        this.render(() => {
            currentPointer = temp;
            var rotateParentElem = document.querySelector(".with-image");
            rotateParentElem.classList.remove('vertical');
            if (document.getElementById('canvas').height > CANVAS_HEIGHT) {
                rotateParentElem.classList.add('vertical');
            }
        });
    })

    //Undo for original
    len1 = canvasVersionListForOrginal.length;
    temp1 = Math.max((currentPointerForOriginal - 1), 0);
    prevData1 = canvasVersionListForOrginal[temp1];
    prevCanvas1 = prevData1.canvas;
    identifier1 = prevData1.identifier;
    if (prevCanvas1.hasAttribute('data-caman-id')) {
        prevCanvas1.removeAttribute('data-caman-id');
    }

    Caman('#originalCanvas', function () {
        this.crop(prevCanvas1);
        this.render(() => {
            currentPointerForOriginal = temp1;
        });
    })
});

redoButton = document.querySelector('#redoButton');

redoButton.addEventListener('click', () => {
    len = canvasVersionList.length
    currentPointer++;
    currentPointer = Math.min(currentPointer, Math.max(0, len - 1));
    nextData = canvasVersionList[currentPointer];
    nextCanvas = nextData.canvas;
    identifier = nextData.identifier;

    if (currentPointer == len - 1) {
        undoRedoBlueGrey('redo', 'none', 'block');
    }
    if (currentPointer > 0) {
        undoRedoBlueGrey('undo', 'block', 'none');
    }

    if (nextCanvas.hasAttribute('data-caman-id')) {
        nextCanvas.removeAttribute('data-caman-id');
    }

    cropper?.destroy();
    cropper = null;
    originalCropper = null;
    Caman('#canvas', function () {
        this.crop(nextCanvas);
        this.render(() => {
            var rotateParentElem = document.querySelector(".with-image");
            rotateParentElem.classList.remove('vertical');
            if (document.getElementById('canvas').height > CANVAS_HEIGHT) {
                rotateParentElem.classList.add('vertical');
            }

        });
    })

    //Redo for original
    len1 = canvasVersionListForOrginal.length
    currentPointerForOriginal++;
    currentPointerForOriginal = Math.min(currentPointerForOriginal, Math.max(0, len1 - 1));
    nextData1 = canvasVersionListForOrginal[currentPointerForOriginal];
    nextCanvas1 = nextData1.canvas;
    identifier1 = nextData1.identifier;

    if (nextCanvas1.hasAttribute('data-caman-id')) {
        nextCanvas1.removeAttribute('data-caman-id');
    }
    Caman('#originalCanvas', function () {
        this.crop(nextCanvas1);
        this.render();
    })
});

function showLoader() {
    if (targetLoader) {
        targetLoader.style.display = 'flex';
    }
}