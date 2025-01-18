//©2024 Artur Akerberg - All Rights Reserved.
const imgRegexp = /https?:\/\/[^"\s]+?\.(?:jpg|jpeg|png|gif|webp|bmp|svg|tiff|avif|ico)/gi; //possible preformance improvment by making it const
let signatures;
let results;
let maxScrollTop;
let imgCounter;
let groupCounter;
let iframeList;
let domain;
let url;
let framesImages;

window.addEventListener("load", function(){
    init();
});
window.onmessage = function(e) {
    try{
        if(e.data.code="imgs"){
            for(let i=0;i<e.data.images.length;i++){
                framesImages.push(e.data.images[i]);
            }
        }
    }catch(error){
        console.log(error);
    }
};

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) { 
            case "init":
                let cURL = window.location.href;
                if(cURL != url){
                    url=cURL;
                    init();
                }
                for(let i=0;i<iframeList.length;i++){
                    try{
                        iframeList[i].contentWindow.postMessage('getImg', '*');
                    }catch(error){
                        console.log(error);
                    }
                }
                sendResponse(iframeList.length);
                break;
            case "getImgCount":
                updateResults();
                sendResponse(imgCounter);
                break;
            case "getImgs":
                sendResponse(results);
                break;  
        }
    }
);          

async function addUnknownDimensionImage2Results(src, id, groupCounter){
    let image = new Image();
    image.src = src;
    image.onload = function(){
        push2results(image.src, image.naturalWidth, image.naturalHeight, image.alt, id, groupCounter);
    }
}
function init(){
    signatures = [];
    results = [];
    maxScrollTop = 0;
    imgCounter = 0;
    groupCounter = 0;
    iframeList = [];
    framesImages = [];
    domain = window.location.hostname;
    url = window.location.href;
    if(domain == "www.pinterest.com"){
        setTimeout(() => {
            updateResults();
            window.addEventListener("scroll", function(){
                let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (currentScrollTop > maxScrollTop) {
                    updateResults();
                    maxScrollTop = currentScrollTop;
                } 
            }, false);
        }, 50);
    }
    try{
        let iframes = document.getElementsByTagName("iframe");
        for (let i = 0; i < iframes.length; ++i){
            let frame = (iframes[i].contentWindow || iframes[i].contentDocument);
            if (frame.document){
                frame = frame.document;
            }
            iframeList.push(iframes[i]);
            let script = document.createElement('script');
            script.setAttribute('src', chrome.runtime.getURL(`iFrame.js`));
            script.setAttribute('type', 'text/javascript');
            frame.body.appendChild(script); 
        }
    }catch(error){
        console.log("iframe handling failed");
    }
}
function push2results(src, width, height, alt, id, groupCounter){ 
    results.push({
        src:src,
        width:width,
        height:height,
        alt:alt.toLowerCase(),
        id:id,
        group:groupCounter
    });
}
function updateResults(){
    try{
        let images = document.getElementsByTagName('img');
        let bgImages = getBgImgs(document);
        let hiddenImages = document.body.innerHTML.match(imgRegexp);
        for(let i=0; i<images.length; i++){
            groupCounter++;
            let srcsets = images[i].srcset.split(','); 
            if(!checkDuplicates(images[i].src)){
                imgCounter++;
                if(images[i].naturalWidth==0){
                    addUnknownDimensionImage2Results(images[i].src, imgCounter, groupCounter);
                }else{
                    push2results(images[i].src, images[i].naturalWidth, images[i].naturalHeight, images[i].alt, imgCounter, groupCounter);
                }
                if(srcsets!=""){
                    for(let x=0; x<srcsets.length; x++){
                        let index = srcsets[x].lastIndexOf(' ');
                        if(index!=-1){
                            srcsets[x] = srcsets[x].slice(0,index).trim();
                        }
                        if(!checkDuplicates(srcsets[x])){
                            imgCounter++;
                            addUnknownDimensionImage2Results(srcsets[x], imgCounter, groupCounter);
                        }
                    }
                }
            }
        }
        for(let i=0; i<bgImages.length; i++){
            if(!checkDuplicates(bgImages[i].src)){
                imgCounter++;
                groupCounter++;
                addUnknownDimensionImage2Results(bgImages[i], imgCounter, groupCounter);
            }
        }
        if(hiddenImages!=null){
            for(let i=0; i<hiddenImages.length; i++){
                if(!checkDuplicates(hiddenImages[i])){
                    imgCounter++;
                    groupCounter++;
                    addUnknownDimensionImage2Results(hiddenImages[i], imgCounter, groupCounter);
                }
            }
        }
        if(iframeList.length>0){
            for(let i=0; i<framesImages.length; i++){
                groupCounter++;
                let srcsets = framesImages[i].srcset.split(','); 
                if(!checkDuplicates(framesImages[i].src)){
                    imgCounter++;
                    if(framesImages[i].naturalWidth==0){
                        addUnknownDimensionImage2Results(framesImages[i].src, imgCounter, groupCounter);
                    }else{
                        push2results(framesImages[i].src, framesImages[i].naturalWidth, framesImages[i].naturalHeight, framesImages[i].alt, imgCounter, groupCounter);
                    }
                    if(srcsets!=null){
                        for(let x=0; x<srcsets.length; x++){
                            let index = srcsets[x].lastIndexOf(' ');
                            if(index!=-1){
                                srcsets[x] = srcsets[x].slice(0,index).trim();
                            }
                            if(!checkDuplicates(srcsets[x])){
                                imgCounter++;
                                addUnknownDimensionImage2Results(srcsets[x], imgCounter, groupCounter);
                            }
                        }
                    }
                }
            }
        }
    }catch(error){console.log(error);
                  /*if(error = "Cannot read properties of null (reading 'innerHTML')"){
            setTimeout(() => {
                updateResults();
            }, 300);  */      
                  //}
                 }
}
function checkDuplicates(fingerPrint) {
    return signatures.hasOwnProperty(fingerPrint) ? true : (signatures[fingerPrint] = false);
}
function getBgImgs (doc) {
    const validSrc = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
    return Array.from(
        Array.from(doc.querySelectorAll('*'))
        .reduce((collection, node) => {
            let property = window.getComputedStyle(node)
            .getPropertyValue('background-image');
            let match = validSrc.exec(property)
            if (match) {
                collection.add(match[1])
            }
            return collection
        }, new Set())
    )
}
function loadImg (src, timeout = 500) {
    var imgPromise = new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => {
            resolve({
                src: src,
                width: img.naturalWidth,
                height: img.naturalHeight
            })
        }
        img.onerror = reject
        img.src = src
    })
    var timer = new Promise((resolve, reject) => {
        setTimeout(reject, timeout)
    })
    return Promise.race([imgPromise, timer])
}
function loadImgAll (imgList, timeout = 500) {
    return new Promise((resolve, reject) => {
        Promise.all(
            imgList
            .map(src => loadImg(src, timeout))
            .map(p => p.catch(e => false))
        ).then(results => resolve(results.filter(r => r)))
    })
}

//loadImgAll(getBgImgs(document)).then(imgs => console.log(imgs))

