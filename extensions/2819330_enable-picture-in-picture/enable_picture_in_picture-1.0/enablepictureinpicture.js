function adjustVideoElement(video) {
   
        if (video.hasAttribute('disablepictureinpicture')) {
            video.removeAttribute('disablepictureinpicture');
            video.style.position = "absolute";
            let originalWidth = video.style.width;
            video.style.width = "0px";

            setTimeout(function () {
                video.style.width = originalWidth;
                video.removeAttribute('disablepictureinpicture');
            }, 2000);
        }


}
document.querySelectorAll('video').forEach(adjustVideoElement);
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'VIDEO') {
                    adjustVideoElement(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll('video').forEach(adjustVideoElement);
                }
            });
        }
    });
});

observer.observe(document.body, {childList: true, subtree: true});
