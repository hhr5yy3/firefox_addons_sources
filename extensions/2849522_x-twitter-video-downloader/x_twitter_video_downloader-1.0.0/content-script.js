function log(...args) {
    console.log('[XDownloader]:', ...args); // disabled in production
}

log('content script loaded');

function getDownloadIcon(size = 20) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 255.992 255.992"><path d="M23.97 5.973A2 2 0 0 0 22 8v19.172l-2.586-2.586a2 2 0 1 0-2.828 2.828l6 6a2 2 0 0 0 2.828 0l6-6a2 2 0 1 0-2.828-2.828L26 27.172V8a2 2 0 0 0-2.03-2.027M12 17c-3.29 0-6 2.71-6 6v13c0 3.29 2.71 6 6 6h24c3.29 0 6-2.71 6-6V23c0-3.29-2.71-6-6-6h-3a2 2 0 1 0 0 4h3c1.128 0 2 .872 2 2v13c0 1.128-.872 2-2 2H12c-1.128 0-2-.872-2-2V23c0-1.128.872-2 2-2h3a2 2 0 1 0 0-4z" transform="scale(5.33333)" fill="#fff" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"/></svg>`
}

function generateButtonDiv(postId, classes = 'xd-button', iconSize = 20) {
    const url = `https://xdownloader.com/i/status/${postId}?src=ext`;
    return `<div class="${classes}"><a href="${url}" target="_blank">${getDownloadIcon(iconSize)}</a></div>`;
}

function extractPostId(ele, maxLevels = 20) {
    let postId;
    let i = 0;
    while (!postId && ele) {
        if (i++ > maxLevels) return false; // only go 20 levels up to prevent infinite loop
        const links = ele.querySelectorAll('a');
        for (const link of links) {
            const url = link.href;
            if (url.includes('/status/') && !url.includes('/i/status/')) {
                postId = url.split('/status/')[1].split('?')[0].split('/')[0];
                break;
            }
        }
        ele = ele.parentElement;
    }

    log('extractTweetId:', postId);
    return postId;
}

function handleVideoPlayer(videoPlayer) {
    log('handleVideoPlayer:', videoPlayer);
    const postId = extractPostId(videoPlayer);
    if (!postId) return;
    log('got postId:', postId);

    const div = videoPlayer;

    if (!div || div.getAttribute('data-buttonsAdded') === 'true') return;
    log('adding buttons to:', postId, div);
    div.setAttribute('data-buttonsAdded', 'true');
    div.insertAdjacentHTML('beforeend', generateButtonDiv(postId));

    log('new tweet inserted:', postId);
}

function handleVideoBar(videoBar) {
    log('handleVideoBar:', videoBar);
    if (videoBar.getAttribute('data-buttonsAdded') === 'true') return;
    videoBar.setAttribute('data-buttonsAdded', 'true');

    const postId = extractPostId(videoBar, 50);
    if (!postId) return;
    videoBar.insertAdjacentHTML('beforebegin', generateButtonDiv(postId, 'xd-bar-button', 23));
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Ensure it's an element node
                //log('MutationObserver node added:', node);
                const videoPlayers = node.querySelectorAll('[data-testid="videoPlayer"]') || [];

                videoPlayers.forEach((videoPlayer) => handleVideoPlayer(videoPlayer));

                const videoSettingsButtons = node.querySelectorAll('[aria-label="Video Settings"]');
                videoSettingsButtons.forEach((button) => handleVideoBar(button.parentElement.parentElement.parentElement));
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

log('MutationObserver set up');