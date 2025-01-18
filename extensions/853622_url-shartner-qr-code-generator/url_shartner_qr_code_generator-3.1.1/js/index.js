
    async function urlGen(url) {
        const loader = document.getElementById('loader');
        const link = document.getElementById('link');
        const copyEle = document.getElementById('copy');
        const socialSharingLinkContainer = document.getElementById('social-sharing-link-container-layout');
        try {
            // urlShortene
            const res = await fetch(url);
            const tinyUrl = await res.text();
            loader.style.display = 'none'
            link.innerText = tinyUrl;
            copyEle.style.display = 'block';
            socialSharingLinkContainer.style.display = 'block';
            new QRCode(document.getElementById('qrcode'), {
                text: tinyUrl,
                width: 250,
                height: 250,
                correctLevel: QRCode.CorrectLevel.H
            });
            document.getElementById('facebook').href = `https://www.facebook.com/sharer.php?u=${tinyUrl}`;
            document.getElementById('twitter').href = `https://twitter.com/intent/tweet?url=${tinyUrl}`;
            document.getElementById('linkedin').href = `https://www.linkedin.com/shareArticle?url=${tinyUrl}`;
            setTimeout(() => {
                loader.style.display = 'none'
            }, 500);
        } catch (error) {

        }

        function copy(event) {
            var range = document.createRange();
            range.selectNode(link);
            window.getSelection().addRange(range);
            document.execCommand('Copy');
        }
        copyEle.addEventListener('click', copy);

    }




function onWindowLoad() {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        var tablink = tabs[0].url;
        urlGen("https://tinyurl.com/api-create.php?url=" + encodeURIComponent(tablink))
    });

}


window.onload = onWindowLoad;