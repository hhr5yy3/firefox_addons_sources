if (WebExtension === undefined) {
  var WebExtension = chrome || browser;
}
var ImageConverter = () => {
  'use strict';
  let localfileQue = {},
    majorVersion = 98, //only required for gecko, everything is supported by default
    messageEvents = {
      processlocalfile: (data) => {
        if (data.fileID in localfileQue) {
          localfileQue[data.fileID](data.file);
          delete localfileQue[data.fileID];
        }
      },
    };
  if (isGecko)
    WebExtension.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message === undefined || message.action  === undefined) {
        return;
      }
      (messageEvents[message.action] || (()=>{}))(message.data || {});
    });

  var self = {},
    isDataURL = (url) => {
      return /^\s*data:(([\w\+\.-]+\/[\w\+\.-]+)|([\w\+\.-]+\/[\w\+\.-]+);(charset=[\w-]+|base64))?,([a-zA-Z0-9+\/\%\! ]+={0,2})\s*$/i.test(url);
    },
    extractExtension = (url) => {
      let parsed_url = new URL(url),
        pathname = parsed_url.pathname,
        splitted_and_reversed_pathname = pathname.split('').reverse().join('').split('.', 2);
      if (splitted_and_reversed_pathname.length !== 2) {
        return null;
      }

      return splitted_and_reversed_pathname[0].split('').reverse().join('').toLowerCase();
    },
    extractFilename = (url, extension) => {
      let parsed_url = new URL(url),
        regex = RegExp('\\/([^\\/?]+?)(\\.' + extension + ')?(\\?.*)?$', 'i');
      return parsed_url.pathname.match(regex) !== null ? parsed_url.pathname.match(regex)[1] : null;
    },
    stripProblameticCharactersFromFilename = (filename) => {
      return filename.replace(/[\\//\?\%\*\|:<>"]/g, '_')
    },
    Blob2dataURL = (blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    dataURL2Blob = (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]),
        mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
        ab = new ArrayBuffer(byteString.length),
        ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    loadImage = (url) => {
      return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        const imgBlob = await response.blob();
        // Create ImageBitmap
        resolve(createImageBitmap(imgBlob));
      });
    },
    convertStaticImage = (image, type, compression, background) => {
      return (typeof OffscreenCanvas === "undefined")
        ? convertStaticImageClassic(image, type, compression, background)
        : convertStaticImageOffscreenCanvas(image, type, compression, background)
    },
    convertStaticImageOffscreenCanvas = (image, type, compression, background) => {
      return new Promise(async (resolve) => {
        var canvas = new OffscreenCanvas(image.width, image.height),
          ctx = canvas.getContext('2d');
        if (type === 'image/jpeg' && background) {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(image, 0, 0);
        resolve(await canvas.convertToBlob({type:type, quality:parseFloat(compression)}));
      });
    },
    convertStaticImageClassic = (image, type, compression, background) => {
      return new Promise((resolve) => {
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        if (type === 'image/jpeg' && background) {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(image, 0, 0);
        return canvas.toBlob(resolve, type, parseFloat(compression));
      });
    },
    compareHeaderInfo = (a, b) => {
      for(let i = 0, n = a.length; i < n; ++i)
        if (a[i] !== b[i])
          return false;
      return true;

    },
    fileArray2str =  (fileArray) => {
        return String.fromCharCode.apply(null, fileArray);
    },
    detectFileType = async (blob) => {
      const arrayBuffer = await new Response(blob).arrayBuffer(),
      filearray = new Uint8Array(arrayBuffer);
      //AVIF
      if (compareHeaderInfo(filearray.slice(4,8), [0x66, 0x74, 0x79, 0x70])){ // ftyp
          let brand = filearray.slice(8,12);
          if (
            compareHeaderInfo(brand, [0x61, 0x76, 0x69, 0x66])  || //avif
            compareHeaderInfo(brand, [0x61, 0x76, 0x69, 0x73])  || //avis
            compareHeaderInfo(brand, [0x68, 0x65, 0x69, 0x63])  || //heic
            compareHeaderInfo(brand, [0x6D, 0x73, 0x66, 0x31])  || //msf1
            compareHeaderInfo(brand, [0x6D, 0x69, 0x66, 0x31])  //mif1
          ){
            let dataViewer = new DataView(arrayBuffer),
                ftypblockSize = dataViewer.getUint32(0);
            if(fileArray2str(filearray.slice(0x0C,ftypblockSize)).match(/avi(f|s)/))
              return 'avif';
          }
      }
      //Ico
      if (compareHeaderInfo(filearray.slice(0,4), [0x00, 0x00,0x01,0x00]))
        return 'ico';
      //BMP
      if (compareHeaderInfo(filearray.slice(0,2), [0x42, 0x4D]))
        return 'bmp';
      //jpg
      if (compareHeaderInfo(filearray.slice(0,3), [0xFF, 0xD8,0xFF]))
        return 'jpg';
      //png
      if (compareHeaderInfo(filearray.slice(0,8), [0x89,0x50,0x4E,0x47, 0x0D, 0x0A, 0x1A, 0x0A]))
        return 'png';
      //WEBP
      if (compareHeaderInfo(filearray.slice(0,4), [0x52, 0x49, 0x46, 0x46]) && compareHeaderInfo(filearray.slice(0x08,4), [0x57, 0x45, 0x42, 0x50]))
        return 'webp';
      //GIF
      if (compareHeaderInfo(filearray.slice(0,3),  [0x47, 0x49, 0x46]) &&
          (compareHeaderInfo(filearray.slice(3,3),[0x38,0x37,0x61]) || compareHeaderInfo(filearray.slice(3,3),[0x38,0x39,0x61])) &&
          filearray[filearray.length -1] === 0x3B
        )
        return 'gif';
      //SVG
      const svgRegex = /<\?xml (\r|\n|.)*<svg (\r|\n|.)*xmlns:svg=('|")http:\/\/www.w3.org\/2000\/svg("|')/;
      if(fileArray2str(filearray.slice(0,512)).match(svgRegex))
        return 'svg';

      return '';
    },
    fetchLocalFileGeckoEmbedded = async (url, tabid) => {
      let duplicateOptions = majorVersion >= 77 ? {active:false} : null,
          tab = await browser.tabs.duplicate(tabid, duplicateOptions),
          closetab = () => { browser.tabs.remove(tab.id); };

      await browser.tabs.executeScript(tab.id, { code: `window.location='${url}'`, runAt: 'document_start' });
      return new Promise(async (resolve, reject) => {
        setTimeout( async () => {
          try{
            resolve(await fetchLocalFileGeckoDirect(url, tab.id));
            closetab();
          } catch (e) {
            closetab();
            reject(e);
          }
        }, 200);
      });
    },
    fetchLocalFileGeckoDirect = async (url, tabid) => {
      return new Promise(async (resolve, reject) => {
        let fileID = Date.now() + encodeURI(url);
        localfileQue[fileID] = resolve;
        WebExtension.tabs.sendMessage(tabid, {action: "fetchlocalfile", data:{url: url, fileID: fileID}} );
        setTimeout(() => {
          delete localfileQue[fileID];
          reject("Localfile download timed out"); }, 2000);
      });
    },
    fetchLocalFileGecko = async (url, tabid) => {
      let imageTab = await browser.tabs.get(tabid);
      if (url === imageTab.url)
        return fetchLocalFileGeckoDirect(url, tabid);
      return fetchLocalFileGeckoEmbedded(url, tabid);
    },
    isAllowedFileSchemeAccess = async () => {
      return new Promise(async (resolve, reject) => {
        try{
          chrome.extension.isAllowedFileSchemeAccess(resolve);
        } catch(e) {
          reject(e);
        }
      });
    },
    fetchLocalFileWebkit = async (url) => {
      if (!(await isAllowedFileSchemeAccess())) {
        if (confirm('If you want to convert local files you need to manually set the the "Allow access to file URLs" permission. Do you want to open the details page to set this permission now?')) {
          let detailsPage = "chrome://extensions/?id=" + chrome.runtime.id;
          chrome.tabs.create({
            url: detailsPage
        });
        }
        throw "Extension does not have access to local files.";
      }
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function (){
            if(xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400))
                resolve(xhr.response);
              reject();
            }
        };
        xhr.open("GET", url, true);
        xhr.send(null);
      });
    },
    fetchFile = async (url, tabid) => {
      let headers = {},
          image_data;

      if ((new URL(url)).protocol === 'file:')
        return {image_blob: await (isGecko ? fetchLocalFileGecko(url, tabid) : fetchLocalFileWebkit(url)), filename:null};

      if (isGecko && majorVersion >= 65) {
        let accept = '*/*';
        if (
          (majorVersion >= 79 && majorVersion < 93 && storage.options().generic.experimentalAvif) ||
          (majorVersion >= 93 && storage.options().generic.preferAvif))
          accept = 'image/avif,' + accept;
        if(storage.options().generic.preferWebp)
          accept = 'image/webp,' + accept;
        if (accept !== '*/*')
          headers = {Accept: accept};
      }

      image_data = await fetch(url, {headers: headers});
      let filename = null

      if (image_data.headers.get('content-disposition') !== null){
         let filenameData = image_data.headers.get('content-disposition').match(/filename\*="([^"]+?)"/)
        if(filenameData === null)
          filenameData = image_data.headers.get('content-disposition').match(/filename="([^"]+?")/)
        if(filenameData !== null)
          filename = filenameData[1].split('').reverse().join('').split(/[\/\\]/)[0].split('').reverse().join('');
      }
      return {image_blob: await image_data.blob(), filename:filename};
    },
    getImageData = async (url, tabid)=> {
      let original_image_blob,
          original_extension,
          compatible_extension,
          clean_filename,
          fetched_data;
      if (isDataURL(url)) {
        original_image_blob = dataURL2Blob(url);
        compatible_extension = await detectFileType(original_image_blob);
        original_extension = compatible_extension || '';
        return {
          filename: 'unnamed',
          extension: compatible_extension,
          imageBlob: original_image_blob
        };
      }

      fetched_data = await fetchFile (url, tabid);
      original_extension = extractExtension(fetched_data.filename === null ? url : 'http://dummypage.com/' + fetched_data.filename) || '';
      clean_filename = stripProblameticCharactersFromFilename(extractFilename(fetched_data.filename === null ? url : 'http://dummypage.com/' + fetched_data.filename, original_extension) || 'unnamed');
      original_image_blob = fetched_data.image_blob
      compatible_extension = await detectFileType(original_image_blob);

      return {
        filename: clean_filename,
        extension: compatible_extension,
        imageBlob: original_image_blob
      };
    },
    autoDetectConversionSetting = (extension) => {
      let options = storage.options().image[extension];
      return {
        background: options.background,
        convert_to: options.convert_to,
        quality: options.quality
      };
    },
    getConversionInstructions = (extension, ctrl, shift) => {
      if (extension === '' || extension  === 'svg') {
        return {convert_to:'none', background: '#ffffff'};
      }
      let conversionOptions = storage.options().image, conversionInstruction = {convert_to: 'static'};
      conversionInstruction =
        (ctrl && shift) ? conversionOptions.staticCtrlShiftClick :
          ctrl ? conversionOptions.staticCtrlClick :
          shift ? conversionOptions.staticShiftClick :
          conversionOptions.staticClick;

      if (conversionInstruction.convert_to === 'auto') {
        return autoDetectConversionSetting(extension);
      }
      return extension !== conversionInstruction.convert_to ? conversionInstruction : {convert_to: 'none'};
    },
    convertImage = async (image_blob, conversionInstructions) => {
      let conversion_meta_types = {png: 'image/png', jpg: 'image/jpeg'};
      if (!isGecko || isGecko && majorVersion >= 96) {
        conversion_meta_types.webp = 'image/webp';
      }

      let original_image_data_url = await Blob2dataURL(image_blob),
          image = await loadImage(original_image_data_url);
      return await convertStaticImage(image, conversion_meta_types[conversionInstructions.convert_to], conversionInstructions.quality, conversionInstructions.background);
    },
    blobToDataURL = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.onabort = () => reject(new Error("Read aborted"));
        reader.readAsDataURL(blob);
      });
    },
    parseURL = async (blob) =>{
      if (isGecko)
        return window.URL.createObjectURL(blob);
      return await blobToDataURL(blob);
    },
    downloadImage = async (url, instructions) => {
      let save_extension = '',
          options = storage.options(),
          download_url = url,
          imageData = await getImageData(url, instructions.tabid),
          conversionInstructions = getConversionInstructions(imageData.extension, instructions.ctrl, instructions.shift);
      if (conversionInstructions.convert_to === 'none') {
        if (isGecko)
          download_url =  await parseURL(imageData.imageBlob);
        save_extension = imageData.extension;
      } else {
        save_extension = conversionInstructions.convert_to;
        download_url = await parseURL(await convertImage(imageData.imageBlob, conversionInstructions));
      }

      let pathVariables = {
        originalname: imageData.filename,
        originaltype: imageData.extension,
        savetype: save_extension,
        imagehost: instructions.imagehost,
        pagehost: instructions.pagehost
      };

      if (pathVariables.originaltype === '' && pathVariables.savetype === '') {
        pathVariables.savetype = extractExtension(url) || 'unknown';
        pathVariables.originaltype = pathVariables.savetype;
      }

      let downloadProperties = {
        url: download_url,
        filename: parsePath(pathVariables, options.downloadPath.subfolder, options.downloadPath.filename),
        conflictAction: options.generic.filenameConflictAction
      };
      if (isGecko && await browser.extension.isAllowedIncognitoAccess()) {
        downloadProperties.incognito = {'true': true, 'false': instructions.incognito}[options.generic.incognitoMode] || false;
      }

      if (['true', 'false'].indexOf(options.generic.saveAsWindow) !== -1) {
        downloadProperties.saveAs = options.generic.saveAsWindow === 'true';
      }

      WebExtension.downloads.download(downloadProperties);
    };
  self = {
    downloadImage: (url, instructions) => {
      downloadImage(url, instructions);
    },
    setBrowserVersion: (version) => {
      majorVersion = version;
    }
  };
  return self;
};
