console.log('load images editor');
initVersionChecker();
addInfoTabIsOpened();

async function addInfoTabIsOpened() {
    await setStorageDataAsync({'imageTabOpenedTime': Date.now()})
    setTimeout(addInfoTabIsOpened, 1000);
}

addAddonMessageListener("incoming image", (data) => {
   const event = new CustomEvent('receive-image', {detail: data.image});
   const elem = document.getElementById('image-receiver');
   elem.dispatchEvent(event);
});

const interval = setInterval(getImageReceiver, 1000);

function getImageReceiver() {
    window.imageReceiver = document.getElementById('image-receiver');
    if ( window.imageReceiver ) {
        sendMessageToAddon('save data', JSON.parse(JSON.stringify({
            key: 'editorImageSize',
            value: window.imageReceiver.dataset,
            response: 'update image sizes'
        })));
       addMutationObserver(window.imageReceiver);
       clearInterval(interval)
    }
}


function addMutationObserver(targetNode) {
    const config = {attributes: true, characterData: false, subtree: false};
    const callback = function () {
        sendMessageToAddon('save data',
            JSON.parse(JSON.stringify({key: 'editorImageSize', value: targetNode.dataset, response: 'update image size'}))
        );
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function injectColumn() {
    return null;
}
