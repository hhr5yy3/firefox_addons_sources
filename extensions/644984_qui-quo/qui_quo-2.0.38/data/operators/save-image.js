window.POSTING_IMAGE_URL = `https://${window.AGENCY_DOMAIN}/agency/quote/item-posting`;
window.WARNING_TEMPLATE = {
    error: {className: 'qq-error-img-btn', title: 'Слишком маленький размер изображения. Пост будет выглядеть размытым.'},
    warning: {className: 'qq-warning-img-btn', title: 'У изображения маленький размер. Пост может выглядеть размытым.'},
    normal: {className: 'qq-good-img-btn', title: 'Нормальный размер изображения! Пост будет выглядеть хорошо', style: 'opacity:0;height:0px'},
    excellent: {className: 'qq-excellent-img-btn', title: 'Идеальный размер изображения! Пост будет выглядеть отлично'}
};
initVersionChecker();
console.log("load save image module");
function findImages(sizes) {
    injectStyleSheet(document);
    const images = $$('img').filter(image => image.naturalHeight > 299 &&
        image.naturalWidth > 299 &&
        image.clientHeight > 0 &&
        image.src &&
        !image.src.match(/\.svg$/) &&
        getComputedStyle(image).opacity !== "0") ;
    images.forEach(image => {
        const srcCheckSum = crc32(image.src).toString();
        const button = image.previousElementSibling && image.previousElementSibling.classList.contains('qq') ? image.previousElementSibling : null;

        if ( button && button.dataset && button.dataset.srcCheckSum !== srcCheckSum ) {
            button.remove();
        }
        if ( button && button.dataset && button.dataset.srcCheckSum === srcCheckSum ) {
            return;
        }
        let warning = 'excellent';
        if ( image.naturalHeight <= +sizes.imageHeight || image.naturalWidth <= +sizes.imageWidth ) {
            warning = 'normal'
        }
        if ( image.naturalHeight <= +sizes.imageWarningHeight || image.naturalWidth <= +sizes.imageWarningWidth ) {
            warning = 'warning'
        }
        if ( image.naturalHeight <= +sizes.imageErrorHeight || image.naturalWidth <= +sizes.imageErrorWidth ) {
            warning = 'error'
        }
        const saveBtns = createSaveImageContainer(image, warning);
        saveBtns.style.position = 'absolute';
        if ( !button ) {
            image.before(saveBtns);
            saveBtns.dataset.srcCheckSum = srcCheckSum;
            // if ( images.length === 1 ) {
            //     saveBtns.style.zIndex = '9999';
            //     document.body.append(saveBtns);
            // }
            addMutationObserver(image, saveBtns);

        }
    });
}

async function checkEditorTabIsOpen() {
    try {
        const {isFound, editorImageSize} = await sendMessageToAddon("find tabs by url", {url: window.POSTING_IMAGE_URL});
        const {imageTabOpenedTime} = await getStorageDataAsync('imageTabOpenedTime');
        if (isFound  || (Date.now() - imageTabOpenedTime) < 1000 * 3) {
            findImages(editorImageSize);
            setTimeout(checkEditorTabIsOpen, 1000);
            return;
        }
        removeAllQqButtons();
        setTimeout(checkEditorTabIsOpen, 1000);
    } catch (e) {
        console.log({e})
       return null;
    }
}

addAddonMessageListener('update image size', (data) => {
    removeAllQqButtons();
    findImages(data.editorImageSize);
});

function saveImage(event, image, fast = false) {
    try {
        event.preventDefault();
        event.stopPropagation();
        sendMessageToAddon("send image", {image: image.src, url: window.POSTING_IMAGE_URL, fast});
        event.target.closest('.qq-box').classList.add('image-added')
    } catch(_) {
        return null;
    }
}

setTimeout(checkEditorTabIsOpen, 1000);

function createExportImageButtons(image, warning) {
    const div = document.createElement("div");
    const addImgFast = document.createElement("div");
    const addImg = document.createElement("div");
    const msgIcon = document.createElement("div");
    const emptyIcon = document.createElement("div");

    addImg.addEventListener("click", (event)=> saveImage(event, image));
    addImgFast.addEventListener("click", (event)=>saveImage(event, image, true));
    addImgFast.className = "qq-add-img-fast-btn";
    addImgFast.title = "Добавить и перейти";
    addImg.className = "qq-add-img-btn";
    emptyIcon.style.width = '48px';
    emptyIcon.style.minWidth = '48px';
    emptyIcon.style.maxWidth = '48px';
    emptyIcon.style.opacity = '0';
    msgIcon.className = window.WARNING_TEMPLATE[warning].className;
    msgIcon.title = window.WARNING_TEMPLATE[warning].title;
    if ( window.WARNING_TEMPLATE[warning].style ) {
        msgIcon.style.cssText = window.WARNING_TEMPLATE[warning].style;
    }
    addImg.title = "Добавить изображение";
    div.className = "qq";
    div.classList.add("qq-horizontal");
    div.append(addImgFast, addImg, emptyIcon, msgIcon);
    return div;
}

function createSaveImageContainer(image, warning) {
    const container = document.createElement("div");
    const logoDiv = document.createElement("div");
    const btns = createExportImageButtons(image, warning);
    const logo = document.createElement('img');
    logoDiv.append(logo);
    logo.src = `https://${window.AGENCY_DOMAIN}/landing/eshill/i/logo.svg`;
    logo.style.height = '24px';
    logo.style.minHeight = '24px';
    logo.style.maxHeight = '24px';
    container.append(logo, btns);
    container.style.cssText = `
    position: absolute;
    width: 135px;
    max-height: 62px;
    flex-direction: column;
    margin: 10px;
    padding: 5px;
    min-width: initial;
    font-size: 12px;
    z-index: 1;
    top: 5%;
    pointer-events: all;
}`;
    container.classList.add("qq", "qq-container", "qq-quicklogin-popup-wrapper");
    return container;
}

function addMutationObserver(targetNode, container) {
    const config = {attributes: true, characterData: false, subtree: false};
    const callback = function () {
       container.remove();
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
