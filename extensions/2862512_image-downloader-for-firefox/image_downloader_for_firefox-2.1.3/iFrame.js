
//©2024 Artur Akerberg - All Rights Reserved.

window.onmessage = function(e) {
    if (e.data == 'getImg') {
        let images = document.getElementsByTagName('img');
        let response = {};
        response.code = "imgs";
        response.images = [];
        for(let i =0; i<images.length;i++){
            let tempObj = {};
            tempObj.src=images[i].src;
            tempObj.srcset=images[i].srcset;
            tempObj.naturalWidth=images[i].naturalWidth;
            tempObj.naturalHeight=images[i].naturalHeight;
            tempObj.alt=images[i].alt;
            response.images.push(tempObj);
        }
        window.top.postMessage(response, '*');
    }
};
