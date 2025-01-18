let load_image = (image, hash) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    let ext = '';
    let type = '';
    let src = '';

    img.addEventListener('load', async evt => {
        src = (img.src).toLowerCase();

        if (src.includes('.jpg')) {type = 'jpg';}
        else if (src.includes('.jpeg')) {type = 'jpg';}
        else if (src.includes('.png')) {type = 'png';}
        else if (src.includes('.webp')) {type = 'webp';}
        else if (src.includes('.gif')) {type = 'gif';}
        else if (src.includes('.svg')) {type = 'svg';}
        else {type='unknown'}

        if (type !== 'svg') {
            if (img.naturalWidth <= 5) return;
        }

        let node = {
            src: image,
            width: img.naturalWidth,
            height: img.naturalHeight,
            type: type
        }

        browser.runtime.sendMessage({
            "command": "add-image",
            "image": node,
            "hash": hash
        })
    })

    if (image.startsWith('<svg')) {
        img.setAttribute('src', 'data:image/svg+xml;base64,' + Base64.encode(image));
    } else {
        img.setAttribute('src', image);
    }
}

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.command === 'load-image') {
        load_image(message.image, message.hash);
    }
})