function PhotoManager(unittest){ // jshint ignore: line
    var photoList = [],
    photoListIdx,
    maxPageNb = 1,
    page;

    //get flickr photo links from a specified url
    async function getFlickrPhotoList(callback, tagName) {
        var url = extGlobal.constants.bgphotos_json_path.replace("{page}", page);
        var result= function(responseText) {
            var response = JSON.parse(responseText);
            var flickrPhotos = response.photos.photo;

            maxPageNb = response.photos.pages || 1; //read total nb of pages from api call
            callback(flickrPhotos);
        };
        var err = function(errCode) {
            console.log("api call failed :( ");
        };
        extGlobal.browserGap.xhr(url, result, err);
        extGlobal.browserGap.localStorage.setItem("refreshPhotosDate", JSON.stringify(new Date().getTime()));
    }

    async function loadNewPage() {
        photoListIdx = 0;
        page >= maxPageNb ? page = 1 : page++;
        extGlobal.browserGap.localStorage.setItem("photoListIdx", photoListIdx); //reset current index
        extGlobal.browserGap.localStorage.setItem("page", page); //increment page number
        extGlobal.browserGap.localStorage.setItem("cacheIdx", 0); //reset cache
        await getFlickrPhotoList(function(flickrPhotos) { //download new batch of photos
            photoList = prunePhotos(flickrPhotos);
            extGlobal.browserGap.localStorage.setItem("photoList", JSON.stringify(photoList));
            cacheNextPhotos(photoListIdx);
        });
    }

    async function changeBackgroundPhoto() {
        var returnPhoto = photoList[photoListIdx],
            lastRefresh = extGlobal.browserGap.localStorage.getItem("refreshPhotosDate"),
            now = new Date().getTime();
        cacheNextPhotos(photoListIdx);
        photoListIdx++;
        extGlobal.browserGap.localStorage.setItem("photoListIdx", photoListIdx);
        var bgPhoto = await extGlobal.browserGap.localStorage.getItem("bgPhoto");
        if (photoListIdx >= photoList.length || now - lastRefresh > extGlobal.constants.refreshPhotosTimeLimit || !bgPhoto) {
            // we go to the next page when the page is over or when it is time to refresh the photos in cache (2 weeks)
            await loadNewPage();
        }
    }

     //check if retrieved photos can be accepted.If yes, put them in the acceptedPhotos list
    function prunePhotos(list) {
        var checkForRepeats = {},
            acceptedPhotos = [],
            photo,
            ratio;
        for (var p = 0; p < list.length; p++) {
            photo = list[p];
            ratio = photo.width_m/photo.height_m;

            if(photo.media !== extGlobal.constants.video_media &&
            ratio > extGlobal.constants.ratio_min &&
            ratio < extGlobal.constants.ratio_max &&
            !checkForRepeats[photo.id] &&
            (photo.url_m || photo.url_l || photo.url_k)) {
                acceptedPhotos.push(photo);
                checkForRepeats[photo.id] = true;
            }
        }
        var counter = acceptedPhotos.length,
            randomStart = Math.floor(Math.random()*counter);
        while (randomStart > 0) { //modify the array to make it start at acceptedPhotos[randomStart] and put all that was behind at the end of the array
            acceptedPhotos.push(acceptedPhotos[0]);
            acceptedPhotos.shift(0);
            randomStart--;
        }
        return acceptedPhotos;
    }


    /**
     * Function cacheNextPhotos
     *
     * This function will cache the next photos
     * at the first call it will start from currentIndex and cache the next next_cache_size photos (example: 10)
     * on subsequent calls, it will start from cacheIdx and will load photos until there are next_cache_size photos loaded
     * example: first call loads the next 10 photos.
     * At the next newtab, there will only be 9 photos in cache, so it will load 1 more only, and every next new tab will load 1 more
     * so there will always be 10 next photos in cache
     */
    async function cacheNextPhotos(currentIndex) {
        var cacheIdx = await extGlobal.browserGap.localStorage.getItem("cacheIdx");
        cacheIdx = parseInt(cacheIdx);
        var cacheSuccess = function(data) {
            var photoInfo = {
                data: data,
                url: this.url,
                id: this.id,
                owner: this.photo.owner,
                ownername: this.photo.ownername
            };
            extGlobal.browserGap.localStorage.setItem("bgPhoto", JSON.stringify(photoInfo));
        };
        var currentCache = cacheIdx || currentIndex;
        for(cacheIdx = currentCache; cacheIdx < parseInt(currentCache) + 1 && cacheIdx < photoList.length-1; cacheIdx++) { //cache next next photo (the one after the following cached one)
            var photo = photoList[cacheIdx];
            var url = extGlobal.constants.bgphotos_photos_path + (photo.url_k || photo.url_l || photo.url_m);
            xhrArrayBuffer(url, cacheSuccess.bind({photo: photo, url: url, id: photo.id}));
        }
        extGlobal.browserGap.localStorage.setItem("cacheIdx", cacheIdx);
    }


    /**
     * Function xhrAraryBuffer
     * This function is doing an XHR call to the image
     * and returns the image data
     */

    function xhrArrayBuffer(url, callback){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.responseType = 'arraybuffer';
        xmlhttp.onload = function(e) {
            var arr = new Uint8Array(this.response);
            var raw = '';
            var i,j,subArray,chunk = 5000;
            for (i=0,j=arr.length; i<j; i+=chunk) {
               subArray = arr.subarray(i,i+chunk);
               raw += String.fromCharCode.apply(null, subArray);
            }
            var b64=btoa(raw);
            callback("data:image/jpeg;base64,"+b64);
        };
        xmlhttp.send();
    }


    async function init() {
        // initialize indexes and arrays
        photoListIdx = await extGlobal.browserGap.localStorage.getItem("photoListIdx");
        photoListIdx = parseInt(photoListIdx || 0);
        photoList = await extGlobal.browserGap.localStorage.getItem("photoList");
        photoList ? photoList = JSON.parse(photoList) : photoList = [];
        page = await extGlobal.browserGap.localStorage.getItem("page");
        page = parseInt(page || 1);


        if (!photoList || photoList.length === 0 || !photoListIdx || !page) {
            // reset indexes, get photos, randomize and cache
            photoListIdx = 0;
            await extGlobal.browserGap.localStorage.setItem("photoListIdx", 0);
            await extGlobal.browserGap.localStorage.setItem("cacheIdx", 0);
            await getFlickrPhotoList(function(flickrPhotos) {
                photoList = prunePhotos(flickrPhotos);
                extGlobal.browserGap.localStorage.setItem("photoList", JSON.stringify(photoList));
                cacheNextPhotos(photoListIdx);
            });
        }
        changeBackgroundPhoto();
    }


    if (unittest) {
        this.getFlickrPhotoList = getFlickrPhotoList;
        this.cacheNextPhotos = cacheNextPhotos;
       
        this.injectFunction = function (){
            getFlickrPhotoList = this.getFlickrPhotoList; // jshint ignore: line
        };
    }

    this.init = init;
    this.changeBackgroundPhoto = changeBackgroundPhoto;

    return this;
}
