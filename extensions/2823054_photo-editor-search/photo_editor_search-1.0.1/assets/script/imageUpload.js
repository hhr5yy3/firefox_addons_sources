function uploadBtnChange(){
    if(withImage.style.display=== 'flex'){
        alert("Editor supports only one image at a time. Click 'Cancel' and upload another image");
        return;
    }
    const file = uploadBtn.files[0];
    handleImageUpload(file);
}

const fileDropArea = document.getElementById('middle-div');

fileDropArea.addEventListener('dragover', dragOverHandler);

function dragOverHandler(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = e.dataTransfer.types.includes('Files') ? 'copy' : 'none';
}

fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('highlight');
});

fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    if (withImage.style.display === 'none' && noImage.style.display === 'flex') {
        fileDropArea.classList.remove('highlight');
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    } else {
        alert("Editor supports only one image at a time. Click 'Cancel' and upload another image");
    }

});

function handleImageUpload(file) {
    
    const reader = new FileReader();

    if (file) {    
        const allowedExtensions = ['jpg', 'jpeg', 'png','jfif', 'pjpeg', 'pjp'];
        fileExtension = file.name.split('.').pop().toLowerCase();
        fileNameWithoutExtension = file.name.slice(0, file.name.lastIndexOf('.'));
        if (allowedExtensions.includes(fileExtension)) {
            reader.readAsDataURL(file);
        }else{
            alert("File format not supported");
            return;
        }
    } else {
        console.log('file does not exist');
        return;
    }

    reader.onload = function (event) {
        img = new Image();
        canvas = document.getElementById('canvas');
        originalCanvas = document.getElementById('originalCanvas');
        ctx = canvas.getContext('2d');
        originalCtx = originalCanvas.getContext('2d');
        img.src = event.target.result;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            updateRatio();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            withImage.style.display = 'flex';
            noImage.style.display = 'none';
            document.getElementById('right-div').style.display = 'flex';
            document.querySelector('.widget-inner').classList.add('gray');

            if (activatedView !== 'AlwaysTrue') {
                Caman('#canvas', img, function () {
                    this.reInitializeCanvas();
                    this.render();
                });
                
            }
        
            //For originalCanvas
            originalCanvas.width = img.width;
            originalCanvas.height = img.height;
            originalCtx.drawImage(img, 0, 0, originalCanvas.width, originalCanvas.height);
           
            if (activatedView !== 'AlwaysTrue') {
                Caman('#originalCanvas', img, function () {
                    this.reInitializeCanvas();
                    this.render();
                });
                
            }

            resetCanvasInstance = cloneCanvas(canvas);
            resetCanvasOriginalInstance = cloneCanvas(originalCanvas);
            canvasVersionList[++currentPointer] = {"canvas":cloneCanvas(document.getElementById('canvas')), "identifier":"uploadedImage"};
            canvasVersionListForOrginal[++currentPointerForOriginal] = {"canvas":cloneCanvas(document.getElementById('originalCanvas')), "identifier":"uploadedImage"};
            setTimeout(() => {
                initView = activatedView || 'crop';
                document.querySelector('.' + initView).click();
            }, 60);

            widthRatioEditOriginal = originalCanvas.width / canvas.width;
            heightRatioEditOriginal = originalCanvas.height / canvas.height;
            
        };
        
    };
}



function updateRatio() {
    aspect = canvas.width / canvas.height;
    originalWidth = canvas.width;
    originalHeight = canvas.height;
    if (aspect <= (CANVAS_WIDTH / CANVAS_HEIGHT)) {
        y = (originalWidth * CANVAS_HEIGHT) / originalHeight;
        canvas.width = y;
        canvas.height = CANVAS_HEIGHT;
    } else {
        x = (originalHeight * CANVAS_WIDTH) / originalWidth;
        canvas.width = CANVAS_WIDTH;
        canvas.height = x;
    }
}

function cloneCanvas(oldCanvas) {
	var newCanvas = document.createElement('canvas');
	var context = newCanvas.getContext('2d');

	//set dimensions
	newCanvas.width = oldCanvas.width;
	newCanvas.height = oldCanvas.height;

	//apply the old canvas to the new one
	context.drawImage(oldCanvas, 0, 0);
	newCanvas.style.display = oldCanvas.style.display;
	newCanvas.id = oldCanvas.id;
	return newCanvas;
}

window.addEventListener(
	'dragover',
	function (e) {
		e.preventDefault();
	},
	false
);
window.addEventListener(
	'drop',
	function (e) {
		e.preventDefault();
	},
	false
);
