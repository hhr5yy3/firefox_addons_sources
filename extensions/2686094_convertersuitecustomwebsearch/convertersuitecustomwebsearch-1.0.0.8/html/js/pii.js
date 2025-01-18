let selectedFiles = [];
let datatab = null;
const DOMAIN = "https://convertersuite.com";
const baseConvertApiUrl = `${DOMAIN}/apps/convertDoc`;
const convertjpgtopdf = `${baseConvertApiUrl}?from=any&to=pdf`;
const convertpdftojpg = `${baseConvertApiUrl}?from=pdf&to=jpg`;
const rotatePdfApi = `${baseConvertApiUrl}?from=pdf&to=rotate`;
const deletePdfApi = `${baseConvertApiUrl}?from=pdf&to=delete-pages`;
const mergeApiUrl = `${baseConvertApiUrl}?from=pdf&to=merge`;
const compressPdfUrl = `${baseConvertApiUrl}?from=pdf&to=compress`;
const lockPdfUrl = `${baseConvertApiUrl}?from=pdf&to=protect`;
const unlockPdfUrl = `${baseConvertApiUrl}?from=pdf&to=unprotect`;
const previewUrl = `${baseConvertApiUrl}/generatePreviewUrl?filePath=`;
const downloadUrl = `${baseConvertApiUrl}/generateDownloadUrl?filePath=`;
const watermarkUrl = `${baseConvertApiUrl}?from=pdf&to=watermark`;
let currentOperation= "";

const splitPdfUrl = `${baseConvertApiUrl}?from=pdf&to=split`;

let selectedRanges = [];
let rotateAngle = 0;
let compressionTypeSelected ='web'; 
let clickedPages = new Set(); 
let totalPages = 1; 
let groupCounter = 1;
let pdfWidth = 0;
let pdfHeight = 0;
const maxGroups = 7;
const maxSizeofFile = 20 * 1024 * 1024
const signUrl = `${baseConvertApiUrl}/eSign`;
let positionGridText = "top-left";
let positionGridCanvas = "top-left";
let positionGridImg = "top-left";
let loaderTimeoutIds = [];
let controller = new AbortController();
let signal = controller.signal;
function showLoader(loadertext="Just a moment..."){
    showDiv(".loader-section-wrap,.back_home_wrap")
    hideDiv(".screen_home_wrapper,.right_panel,.right_panel_box,.screens")
    $(".loader-text").text(loadertext?loadertext:"Converting...")
    $(".main-widget-area, .footer").removeClass("rightOpen")
    loaderTimeoutIds.push(
        setTimeout(function() {
            $(".loader-text").text("Almost there...")
        }, 40000)
    );
    loaderTimeoutIds.push(
        setTimeout(function() {
            $(".loader-text").text("This might take a bit longer than expected...")
        }, 100000)
    );
}
function hideLoader(){
    hideDiv(".loader-section-wrap")
    $(".main-widget-area, .footer").addClass("rightOpen")
    //$(".back_home").css("pointer-events","auto")
    loaderTimeoutIds.forEach(function(loaderTimeout){
        clearTimeout(loaderTimeout);
    });
}
function blueBody(visibility){
    if(visibility == "show"){
        $("body").addClass("blue_body")
    }else{
        $("body").removeClass("blue_body")
    }
}
function hideDiv(el) {
    $(el).hide();
}

function showDiv(el) {
    $(el).show();
}
let fileError = "unsupported"
function validateFile(file, maxPdfSize, restrictToPdfOnly) {
    const validTypes = restrictToPdfOnly ? ['application/pdf'] : [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/png',
        'image/svg+xml'
    ];

    if (!validTypes.includes(file.type)) {
        fileError = "unsupported"
        return false;
    }

    if (file.type === 'application/pdf' && file.size > maxPdfSize) {
        fileError = "filesize"
        return false;
    }

    return true;
}

function setupFileInput(uploadButton, fileInput, fileList, maxFiles, maxPdfSize, restrictToPdfOnly) {

    resetFileInput(fileInput);

    fileInput.removeEventListener('change', handleFileChange);

    fileInput.addEventListener('change', handleFileChange);

    uploadButton.addEventListener('click', () => {
        fileInput.click(); 
    });

    function handleFileChange(event) {
        const files = event.target.files;
        if (files.length > 0) {
            handleFiles(files, fileList, maxFiles, maxPdfSize, restrictToPdfOnly);
        }
    }
}

function resetFileInput(fileInput) {

    fileInput.value = '';
}

async function renderPDFPreview(file, listItem, index) {

    if(data_tab === "merge-pdf"){
        listItem.setAttribute('draggable', 'true');
        listItem.setAttribute("data-index", index);
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        const pdfData = new Uint8Array(event.target.result);
        pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
            pdf.getPage(1).then(function(page) {
                const scale = 1;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                pdfWidth = viewport.width;
                pdfHeight = viewport.height;
                page.render({ canvasContext: context, viewport: viewport }).promise.then(function() {
                    const listItemimg = document.createElement('div');
                    listItemimg.classList.add('list-img-class');
                    const img = document.createElement('img');
                    img.src = canvas.toDataURL();
                    img.classList.add('pdf-preview');
                    listItemimg.appendChild(img);
                    listItem.appendChild(listItemimg);
                });
            });
        });
    };
    reader.readAsArrayBuffer(file);

}

async function renderAllPagesPreview(file, listItem) {
    const reader = new FileReader();
    reader.onload = async function(event) {
        const pdfData = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        totalPages = pdf.numPages;
        let pagePromises = [];
        const renderedPages = new Array(totalPages);

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const pagePromise = pdf.getPage(pageNumber).then(async (page) => {
                const scale = 0.5;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;

                const listItemimg = document.createElement('div');
                listItemimg.classList.add('list-img-class');
                const img = document.createElement('img');
                img.src = canvas.toDataURL();
                img.classList.add('pdf-preview');
                listItemimg.appendChild(img);

                const previewContainer = document.createElement('div');
                previewContainer.classList.add('file-item', 'pdf-list-item');
                previewContainer.dataset.pageNumber = pageNumber;

                const pageNumberElement = document.createElement('p');
                pageNumberElement.classList.add('pdf-page-number');
                pageNumberElement.textContent = `Page ${escapeHtml(pageNumber)}`;

                previewContainer.appendChild(pageNumberElement);
                previewContainer.appendChild(listItemimg);

                renderedPages[pageNumber - 1] = previewContainer;
            });

            pagePromises.push(pagePromise);
        }

        await Promise.all(pagePromises);

        const fileLists = document.querySelector('.file-list');
        renderedPages.forEach((previewContainer) => {
            fileLists.appendChild(previewContainer);
        });
    };

    reader.readAsArrayBuffer(file);
}

function validatePageRangeInput(input) {

   var regex = /^(?!.*\b0\b)(\d+(-\d+)?)(,\d+(-\d+)?)*$/;

   if (input.includes(' ')) {
       return false;  
   }

   return regex.test(input);
}

function checkFileTypes(files) {
    let allImages = true;
    let allPdfs = true;

    for (let file of files) {
        if (file.type.startsWith('image/')) {
            allPdfs = false;
        } else if (file.type === 'application/pdf') {
            allImages = false;
        } else {
            allImages = false;
            allPdfs = false;
            break;
        }
    }

    return {
        allImages,
        allPdfs,
        mixedFiles: !allImages && !allPdfs
    };

}

function sortResultsList(output_files){
    let filesSelected = new Set();
    output_files.forEach((file)=>{
        let fileName = file.file_name;
        let fileNamePrefix =  fileName.substring(0, fileName.lastIndexOf("-"));
        filesSelected.add(fileNamePrefix);
    })

    let sortedList = [];

    let customComparator = (file1, file2)=>{
        let a = file1.file_name;
        let b = file2.file_name;
        let ip1_suffix_number = a.substring(a.lastIndexOf("-")+1, a.lastIndexOf("."))
        let ip2_suffix_number = b.substring(b.lastIndexOf("-")+1, b.lastIndexOf("."))

        let parsedA = parseInt(ip1_suffix_number)
        let parsedB = parseInt(ip2_suffix_number)

        if( isNaN(parsedA) || isNaN(parsedB || (parsedA === parsedB)) ){
            if(a<b) return -1;
            else if(a>b) return 1;
        }else {
            return parseInt(parsedA) - parseInt(parsedB)
        }
        return 0;
    };

    filesSelected.forEach(fileNamePrefix=>{
        let filesWithPrefix = output_files.filter(file=> {
            let fileName = file.file_name;
            let fileNamePrefixToMatch =  fileName.substring(0, fileName.lastIndexOf("-"));
            return fileNamePrefix== fileNamePrefixToMatch;
        }
        );
        filesWithPrefix.sort(customComparator);
        sortedList.push(...filesWithPrefix);
    })
    return sortedList;
}

function showDocConversionResults(result) {
    const {files_transformed,zip_download_url: zipdownloadUrl} = result;
    let resultsList = sortResultsList(files_transformed);
    hideLoader();
    hideDiv(".right_panel_box");
    addUrlToCta(resultsList[0].file_name,resultsList[0].download_url,resultsList[0].preview_url,resultsList[0].mime_type);
    if(zipdownloadUrl.length > 0){
        $(".success-msg").text("Your files are ready for download")
        $(".download_text").text("Download Zip")
        $(".preview_share_wrap").addClass("hideShare")
        showDiv(".downloaded_files_list_wrap")
        $('.preview_wrap').attr('href',"");
        $('.download_success').attr('href',zipdownloadUrl)
        addFileListSuccess(resultsList)
    }else{
        $(".success-msg").text("Your file is ready for download")
        $(".download_text").text("Download File")
        $(".preview_share_wrap").removeClass("hideShare")
        hideDiv(".downloaded_files_list_wrap")
    }
    showDiv(".convert-success, .right_panel, .also_try_wrap, .try_options")
    $(".main-widget-area, .footer").addClass("rightOpen")
    hideDiv(".try_options[data-tab='"+data_tab+"']")

}

function addUrlToCta(name,downloadUrl,previewUrl, mimeType){
    if(data_tab == "convert-pdf"){
        $('.preview_wrap').attr('href',previewUrl);
        if(mimeType.includes("pdf") || mimeType.includes("image")){

            $('.preview_share_wrap .preview_wrap').css("display","flex");
        }else{
            $('.preview_share_wrap .preview_wrap').hide();

        }
    }else{
        $('.preview_wrap').attr('href',previewUrl);
        $('.preview_share_wrap .preview_wrap').css("display","flex");
    }
    $('.download_success').attr('href',downloadUrl)
}

function addFileListSuccess(resultsList){
    const downloadedFilesListWrap = document.querySelector('.downloaded_files_list_wrap');

    while (downloadedFilesListWrap.firstChild) {
		downloadedFilesListWrap.removeChild(downloadedFilesListWrap.firstChild);
	}

    resultsList.forEach((file, index) => {
        const { file_name: fileName, preview_url: previewUrl, download_url: downloadUrl } = file;
        const fileNo = index + 1;

        const fileItem = document.createElement('div');
        fileItem.classList.add('downloaded_files_list');

        const fileNoSpan = document.createElement('span');
        fileNoSpan.className = 'file_no';
        fileNoSpan.textContent = escapeHtml(fileNo);
        fileItem.appendChild(fileNoSpan);

        const fileNamePara = document.createElement('p');
        fileNamePara.className = 'downloaded_file_name';
        fileNamePara.title = fileName;
        fileNamePara.textContent = escapeHtml(fileName);
        fileItem.appendChild(fileNamePara);

        const previewLink = document.createElement('a');
        previewLink.href = previewUrl;
        previewLink.target = '_blank';
        previewLink.title = 'preview';
        previewLink.className = 'file_preview_icon';
        fileItem.appendChild(previewLink);

        const shareLink = document.createElement('a');
        shareLink.dataset.share_url = previewUrl;
        shareLink.title = 'share';
        shareLink.className = 'file_share_icon';
        fileItem.appendChild(shareLink);

        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.target = '_blank';
        downloadLink.title = 'download';
        downloadLink.className = 'file_download_icon';
        fileItem.appendChild(downloadLink);

        downloadedFilesListWrap.appendChild(fileItem);
      });

    addShareListener();
}
function addShareListener(){
    $(".downloaded_files_list_wrap .file_share_icon").on('click', function(){
        var shareUrl = $(this).attr('data-share_url');  
        copyShareUrl(shareUrl);
    })
}

var copyShareUrlWithDelay;

function copyShareUrl(shareUrl){
    if(copyShareUrlWithDelay)
        clearTimeout(copyShareUrlWithDelay);
    copyShareUrlWithDelay = setTimeout(function(){
        navigator.clipboard.writeText(shareUrl)
        $('.display_wrp')
        .fadeIn(1000) 
        .delay(2000)  
        .fadeOut(1000); 
    }, 400);
    $('html, body').animate({
        scrollTop: 0
     }, 300);
}

$('.share_wrap').on('click',function(){
    const shareUrl =  $('.preview_wrap').attr('href');
    copyShareUrl(shareUrl);
});

var x, i, j, l, ll, selElmnt, a, b, c;

x = document.getElementsByClassName("custom-select");
l = x.length;

for (let i = 0; i < l; i++) {
    const selElmnt = x[i].getElementsByTagName("select")[0];
    const ll = selElmnt.length;

    const a = document.createElement("DIV");
    const selectedOption = selElmnt.options[selElmnt.selectedIndex];
    a.setAttribute("class", "select-selected " + selectedOption.className);

    a.textContent = escapeHtml(selectedOption.getAttribute('data-content')) || escapeHtml(selectedOption.textContent);
    x[i].appendChild(a);

    const b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");

    for (let j = 0; j < ll; j++) {
      const option = selElmnt.options[j];

      const c = document.createElement("DIV");
      c.className = option.className;

      c.textContent = escapeHtml(option.getAttribute('data-content') || option.textContent);

      if (selElmnt.selectedIndex === j) {
        c.classList.add("same-as-selected");
      }

      c.addEventListener("click", function (e) {
        const parentSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
        const previousSibling = this.parentNode.previousSibling;

        for (let i = 0; i < parentSelect.length; i++) {
          if (
            parentSelect.options[i].getAttribute('data-content') === this.textContent ||
            parentSelect.options[i].textContent === this.textContent
          ) {
            parentSelect.selectedIndex = i;
            previousSibling.textContent = escapeHtml(this.textContent);
            previousSibling.className = "select-selected " + parentSelect.options[i].className;

            const sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
            Array.from(sameAsSelected).forEach((el) => el.classList.remove("same-as-selected"));

            this.classList.add("same-as-selected");
            break;
          }
        }
        previousSibling.click();

        const event = new Event('change');
        parentSelect.dispatchEvent(event);
      });

      b.appendChild(c);
    }

    x[i].appendChild(b);

    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

function closeAllSelect(elmnt) {

  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

const rotatetoolTip = document.querySelectorAll(".tooltip");
    rotatetoolTip.forEach((elem) => {
    elem.addEventListener("mouseover", () => showTooltip(elem));
    elem.addEventListener("mouseout", () => hideTooltip(elem));
})
function showTooltip(elem) {
    let nextElem = elem.nextElementSibling;
    if (nextElem.classList.contains("tooltip-content")) {
        nextElem.style.display = "block";
    }
}
function hideTooltip(elem) {
    let nextElem = elem.nextElementSibling;
    if (nextElem.classList.contains("tooltip-content")) {
        nextElem.style.display = "none";
    }
}  

function destroyUploadAreas() {
    selectedFiles = []
    const uploadAreas = document.querySelectorAll('.draggable-area');
    const fileLists = document.querySelectorAll('.file-list');

    uploadAreas.forEach((uploadArea, index) => {
        const newUploadArea = uploadArea.cloneNode(true);
        uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    });

    fileLists.forEach(fileList => {

        while (fileList.firstChild) {
            fileList.removeChild(fileList.firstChild);
        }
    });
}
function resetDragnDrop(){
    destroyUploadAreas()
    switch(data_tab) {
        case "convert-pdf":
          $(".convert-title").text("Convert PDF")
          $('.lock_unlock_toggler').hide()
          $('.convert_desc').text("Convert to and from PDF in a few simple steps")
          const tofro = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.52 6.97172L14 4.4917L11.52 2.01172" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 4.48828H14" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.47998 9.03906L2 11.5191L4.47998 13.9991" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11.5195H2" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
          $('.left_info li:last-child').html(`Supported format: PDF ${tofro} DOCX, XLSX, PPTX, JPG, PNG, SVG`)
          $('.lock_unlock_toggler').hide()
          $(".nooffile").text("files")
          addFileTypesToInput(".docx,.xlsx,.pptx,.jpg,.jpeg,.png,.svg,.pdf");
          initializeUploadAreas();
          break;
        case "edit-pdf":
            $(".convert-title").text("PDF Editor");
            $('.convert_desc').text("Rotate your PDF or delete pages in seconds")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "compress-pdf":
            $(".convert-title").text("Compress PDF file")
            $('.convert_desc').text("Reduce the file size of your PDF without losing file quality")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "merge-pdf":
            $(".convert-title").text("Merge PDF file")
            $('.convert_desc').text("Combine multiple PDF files to create a single document")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("files")
            addFileTypesToInput();
            initializeUploadAreas(Infinity,maxSizeofFile,true);
            break;
        case "protect-pdf":
            $(".convert-title").text("Lock or Unlock PDF file")
            $('.convert_desc').text("Easily add or remove a password from your PDF")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').css('display','flex')
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "split-pdf":
            $(".convert-title").text("Split PDF")
            $('.convert_desc').text("Split a single PDF file into page sets or individual pages")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "watermark-pdf":
            $(".convert-title").text("Add Watermark")
            $('.convert_desc').text("Add a watermark by stamping text over your PDF")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "sign-pdf":
            $(".convert-title").text("E-sign PDF")
            $('.convert_desc').text("E-sign your PDF by typing, uploading, or drawing your signature")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        default:
            $(".convert-title").text("PDF Editor")
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("files")
            addFileTypesToInput();
            initializeUploadAreas();
            break;
    }
}
function somethingWrong(errorMessage = "We are unable to process your request at the moment, please try again later."){
    resetAllValues()
    destroyUploadAreas()
    hideLoader();

    $(".main-widget-area, .footer").removeClass("rightOpen")
    blueBody("show")
    switch(data_tab) {
        case "convert-pdf":
          $(".convert-title").text("Convert PDF")
          $('.lock_unlock_toggler').hide()
          $('.convert_desc').text("Convert to and from PDF in a few simple steps")
          const tofro = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.52 6.97172L14 4.4917L11.52 2.01172" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 4.48828H14" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.47998 9.03906L2 11.5191L4.47998 13.9991" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11.5195H2" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
          $('.left_info li:last-child').html(`Supported formats: PDF ${tofro} DOCX, XLSX, PPTX, JPG, PNG, SVG`)
          $('.lock_unlock_toggler').hide()
          $(".nooffile").text("files")
          addFileTypesToInput(".docx,.xlsx,.pptx,.jpg,.jpeg,.png,.svg,.pdf");
          initializeUploadAreas();
          break;
        case "edit-pdf":
            $(".convert-title").text("PDF Editor");
            $('.convert_desc').text("Rotate your PDF or delete pages in seconds")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "compress-pdf":
            $(".convert-title").text("Compress PDF file")
            $('.convert_desc').text("Reduce the file size of your PDF without losing file quality")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "merge-pdf":
            $(".convert-title").text("Merge PDF file")
            $('.convert_desc').text("Combine multiple PDF files to create a single document")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("files")
            addFileTypesToInput();
            initializeUploadAreas(Infinity,maxSizeofFile,true);
            break;
        case "protect-pdf":
            $(".convert-title").text("Lock or Unlock PDF file")
            $('.convert_desc').text("Easily add or remove a password from your PDF")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').css('display','flex')
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "split-pdf":
            $(".convert-title").text("Split PDF")
            $('.convert_desc').text("Split a single PDF file into page sets or individual pages")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "watermark-pdf":
            $(".convert-title").text("Add Watermark")
            $('.convert_desc').text("Add a watermark by stamping text over your PDF")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "sign-pdf":
            $(".convert-title").text("E-sign PDF")
            $('.convert_desc').text("E-sign your PDF by typing, uploading, or drawing your signature")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        default:
            $(".convert-title").text("PDF Editor")
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("files")
            addFileTypesToInput();
            initializeUploadAreas();
            break;
    }
    showDiv(".convert-pdf")
    showDiv(".error-message")
    $(".error-popup-wrap").removeClass("show")
    if(errorMessage){
        $(".somethingWrong .error-content .error-title").text(errorMessage); 
    }
    $(".somethingWrong").addClass("show")
    setTimeout(function(){
        hideDiv(".error-message")
        $(".somethingWrong").removeClass("show")
    },5000)
}

async function callApi(apiUrl, formData){
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            signal: signal
        });

        if(response.ok){
            const responseJson = await response.json();
            showDocConversionResults(responseJson[0]);
        }else {
            const responseJson = await response.json();

            const {error:errorMessage} = responseJson;
            somethingWrong(errorMessage);
        }
    }catch(error){
        if (error.name === 'AbortError') {
        } else {
            somethingWrong();
        }
    }
}
function initializeUploadAreas(maxFiles = Infinity, maxPdfSize = maxSizeofFile, restrictToPdfOnly = false) {
    const uploadAreas = document.querySelectorAll('.draggable-area');
    const uploadButtons = document.querySelectorAll('.file-upload-label');
    const fileInputs = document.querySelectorAll('.file-upload-input');
    const fileLists = document.querySelectorAll('.file-list');
    uploadAreas.forEach((uploadArea, index) => {
        const fileInput = fileInputs[index];
        const fileList = fileLists[index];
        const uploadButton = uploadButtons[index];
        setupDragAndDrop(uploadArea, fileList, maxFiles, maxPdfSize, restrictToPdfOnly);
        setupFileInput(uploadButton, fileInput, fileList, maxFiles, maxPdfSize, restrictToPdfOnly);

        if (maxFiles !== 1) {
            fileInput.setAttribute('multiple', '');
        } else {
            fileInput.removeAttribute('multiple');
        }
    });
}

function setupDragAndDrop(uploadArea, fileList, maxFiles, maxPdfSize, restrictToPdfOnly) {
    uploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadArea.classList.add('dragging');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragging');
    });

    uploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadArea.classList.remove('dragging');

        if(event.dataTransfer.files.length > 0){
            handleFiles(event.dataTransfer.files, fileList, maxFiles, maxPdfSize, restrictToPdfOnly);
        }
    });
}

async function handleFiles(files, fileList, maxFiles, maxPdfSize, restrictToPdfOnly) {
    let isProtected;

    if (files.length > maxFiles) {

        showDiv(".error-message")
        $(".error-popup-wrap").removeClass("show")
        $(".onefileonly").addClass("show")
        setTimeout(function(){
            hideDiv(".error-message")
            $(".onefileonly").removeClass("show")
        },5000)
        return;
    }
    while (fileList.firstChild) {
		fileList.removeChild(fileList.firstChild);
	}

   let isEncrypted;
    async function checkIfProtectedOrNot(file){
     const x = await file.text()

        isEncrypted = x.includes("Encrypt");

        if(!isEncrypted || data_tab == "protect-pdf"){
            if(isEncrypted && data_tab == "protect-pdf" && $('.btn_lock_pdf').hasClass('active')){
                showDiv(".error-message")
                $(".error-popup-wrap").removeClass("show")
                $(".passwordProtected").addClass("show")
            
                setTimeout(function(){
                    hideDiv(".error-message")
                    $(".passwordProtected").removeClass("show")
                },5000)
                resetDragnDrop()
                return 'error'
            }else{
                if($('.btn_unlock_pdf').hasClass('active') && isEncrypted && data_tab == "protect-pdf"){
                    return 'ignore file'
                }else if($('.btn_unlock_pdf').hasClass('active') && !isEncrypted && data_tab == "protect-pdf"){
                    showDiv(".error-message")
                    $(".error-popup-wrap").removeClass("show")
                    $(".notpasswordProtected").addClass("show")
                
                    setTimeout(function(){
                        hideDiv(".error-message")
                        $(".notpasswordProtected").removeClass("show")
                    },5000)
                    resetDragnDrop()
                    return 'error'
                }
                
            }
            
        }else{
            showDiv(".error-message")
            $(".error-popup-wrap").removeClass("show")
            $(".passwordProtected").addClass("show")
           
            setTimeout(function(){
                hideDiv(".error-message")
                $(".passwordProtected").removeClass("show")
            },5000)
            resetDragnDrop()
            return 'error'
        };

   }
   const fileArray = Array.from(files); 

   const filePromises = fileArray.map( async(file) => {
    const result = await checkIfProtectedOrNot(file);
    if(result === 'error'){
        isProtected = true
    }
    return result
   })

   await Promise.all(filePromises) 

   if(isProtected) return
   if(data_tab == "merge-pdf" && files.length < 2){
        showDiv(".error-message")
        $(".error-popup-wrap").removeClass("show")
        $(".moreonefileonly").addClass("show")

        setTimeout(function(){
            hideDiv(".error-message")
            $(".moreonefileonly").removeClass("show")
        },5000)
        return false;
   }

    showLoader("Uploading...")

    try{
        Array.from(files).forEach((file,index) => {
            if (validateFile(file, maxPdfSize, restrictToPdfOnly)) {
                const listItem = document.createElement('div');
                listItem.classList.add('file-item');

                if(data_tab == "edit-pdf"){
                    listItem.classList.add('edit-file-item');
                }
                else if(data_tab == "split-pdf"){
                    listItem.classList.add('split-file-item');
                }else if(data_tab == "watermark-pdf"){
                    listItem.classList.add('watermark-file-item');
                }else if(data_tab == "protect-pdf"){
                    if(isEncrypted && $('.btn_unlock_pdf').hasClass('active')){
                        listItem.classList.add('unlock-file-item');
                        const fileName = document.createElement('p');
                        fileName.textContent = escapeHtml(file.name);
                        listItem.appendChild(fileName); 
                        const listItemimg = document.createElement('div');
                        listItemimg.classList.add('list-img-class');
                        const fileType = document.createElement('p');
                        fileType.textContent = 'PROTECTED';
                        listItemimg.appendChild(fileType);
                        listItem.appendChild(listItemimg);
                    }else{
                        const fileName = document.createElement('p');
                        fileName.textContent = escapeHtml(file.name);
                        listItem.appendChild(fileName); 
                    }

                }else{
                    const fileName = document.createElement('p');
                    fileName.textContent = escapeHtml(file.name);
                    listItem.appendChild(fileName); 
                }

                if (file.type.startsWith('image/')) {
                    listItem.setAttribute('draggable', 'true');
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const listItemimg = document.createElement('div');
                        listItemimg.classList.add('list-img-class');
                        const listDivOp = document.createElement('div');
                        listDivOp.classList.add('list-img-class-options');
                        listItemimg.appendChild(listDivOp);
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.classList.add('file-preview');
                        listDivOp.appendChild(img);
                        listItem.appendChild(listItemimg);
                    };
                    reader.readAsDataURL(file);
                } else if (file.type === 'application/pdf') {
                    if(data_tab == "edit-pdf"){
                        renderAllPagesPreview(file, listItem); 
                    }else if(data_tab == "split-pdf"){
                        renderAllPagesPreview(file, listItem); 

                    }
                    else if(data_tab == "watermark-pdf"){
                        renderAllPagesPreview(file, listItem); 

                    }
                    else{
                        renderPDFPreview(file, listItem, index); 
                    }
                } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    const listItemword = document.createElement('div');
                    listItemword.classList.add('list-img-class', 'doc-preview');
                    listItem.appendChild(listItemword);
                } else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                    const listItemword = document.createElement('div');
                    listItemword.classList.add('list-img-class', 'ppt-preview');
                    listItem.appendChild(listItemword);
                } else if (file.type === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

                    const listItemword = document.createElement('div');
                    listItemword.classList.add('list-img-class', 'sheet-preview');
                    listItem.appendChild(listItemword);
                }else{

                }
                fileList.appendChild(listItem);

                setTimeout(function(){
                    if($(".screen_home_wrapper").css("display") == "block"){
                        return false;
                    }
                    hideLoader("Uploading...")
                    showDiv(".right_panel, .file-list-wrapper")
                    $(".main-widget-area, .footer").addClass("rightOpen")
                    switch(data_tab) {
                        case "convert-pdf":
                            if(checkFileTypes(files).allImages){

                                showDiv(".img_settings_wrap")
                            }else if(checkFileTypes(files).allPdfs){

                                showDiv(".convert_pdf_to")
                            }else{

                                showDiv(".merge_options_wrap")
                            }
                            if(selectedFiles.length == 1){
                                $(".merge_label").addClass("mergeDisabled")
                            }else{
                                $(".merge_label").removeClass("mergeDisabled")
                            }
                        break;
                        case "compress-pdf":
                            showDiv(".compress_pdf_to")
                            break;
                        case "merge-pdf":
                            showDiv(".merge_pdf_to")
                            break;
                        case "edit-pdf":
                            showDiv(".edit-pdf")
                        break;
                        case "protect-pdf":
                            if($('.btn_lock_pdf').hasClass('active')){
                                showDiv(".lock_pdf_to")
                            }else{
                                showDiv(".unlock_pdf_to")
                            }
                        break;
                        case "split-pdf":
                            showDiv(".split_pdf_wrapper")
                            $(".split_group_wrap input.quantity-num").attr("max", totalPages)

                        break;
                        case "watermark-pdf":
                            showDiv(".watermark_wrapper");
                            break;
                        case "sign-pdf":
                            showDiv(".e-sign_wrap")
                            break;
                        default:
                            showDiv(".convert_pdf_to")
                    }
                },1000)
                selectedFiles = files
            }  
            else {

                hideLoader()
                showDiv(".error-message")
                $(".error-popup-wrap").removeClass("show")
                if(fileError == "unsupported"){
                    $(".unsupportedtype").addClass("show")
                }else{
                    $(".filesizeerror").addClass("show")
                }
                hideDiv(".screens, .right_panel")
                $(".main-widget-area, .footer").removeClass("rightOpen")
                showDiv(".convert-pdf")
                setTimeout(function(){
                    hideDiv(".error-message")
                    $(".unsupportedtype, .filesizeerror").removeClass("show")
                },5000)
                resetDragnDrop()
                setTimeout(function(){
                    hideDiv(".right_panel, .file-list-wrapper")
                    $(".main-widget-area, .footer").removeClass("rightOpen")
                },1000)
                throw new Error("Oops! Stopping the loop.");

            }
        });
        if(data_tab == "merge-pdf" ){
            setTimeout(()=>{
                addDragAndRearrangeFeature();
            },0);
        }
    }catch(e){

    }

}

function addDragAndRearrangeFeature(){
    const pdfListContainer = document.getElementsByClassName('file-list')[0];
    let draggedElement = null;
    let placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');

    function getElementMidPoint(element) {
        const rect = element.getBoundingClientRect();
        return rect.left + (rect.width / 2);
    }

    document.querySelectorAll('.file-item').forEach(box => {

        setTimeout(() => {
            box.style.cursor = 'move';
        }, 10);

        box.addEventListener('dragstart', function (e) {
            draggedElement = box;  
            setTimeout(() => {
                box.style.display = 'none';  
            }, 0);
        });

        box.addEventListener('dragend', function (e) {
            setTimeout(() => {
                draggedElement.style.display = 'flex';  
                placeholder.remove();  
                draggedElement = null;
            }, 0);
        });

        box.addEventListener('dragover', function (e) {
            e.preventDefault();
            const allBoxes = Array.from(pdfListContainer.children);
            const boxMidPoint = getElementMidPoint(this);
            const mouseX = e.clientX;

            if (!pdfListContainer.contains(placeholder)) {
                    pdfListContainer.insertBefore(placeholder, this);
                }
                if (mouseX < boxMidPoint) {
                    pdfListContainer.insertBefore(placeholder, this); 
                } else {
                    pdfListContainer.insertBefore(placeholder, this.nextSibling); 
                }
            });
                });

                pdfListContainer.addEventListener('dragover', function (e) {
                    e.preventDefault();
                });

                pdfListContainer.addEventListener('drop', function (e) {
                    e.preventDefault();
                    if (draggedElement && placeholder) {
                        pdfListContainer.insertBefore(draggedElement, placeholder);  
                        placeholder.remove();  
                    }
                });
}         

async function mergePdf(files) {

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file))   

    callApi(mergeApiUrl, formData);

}

async function compressPdf(files) {

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file))   
    formData.append('Presets', compressionTypeSelected);

    callApi(compressPdfUrl, formData);

}

const compressionTypeSelectedFunc = (selectedType) => {
    let compressType= {
            'extreme-compression':'archive',
            'recommended-compression': 'web',
            'less-compression':'printer'
    }
    return compressType[selectedType]
}

$(".compress-option").on("click", function(){
    $(".compress-option").removeClass('active')
    $(this).addClass('active');
    const data_tab = $(this).attr("data-option");

     compressionTypeSelected = compressionTypeSelectedFunc(data_tab);
})

function resetCompress(){
    $(".compress-option").removeClass('active')
    $(".default-compress").addClass('active');
    const data_tab = $(".default-compress").attr("data-option");

    compressionTypeSelected = compressionTypeSelectedFunc(data_tab);
}

async function convertJpgtoPdf(files, mh, mv, ps, merge = false) {
            const formData = new FormData();
            Array.from(files).forEach(file => formData.append('file', file));
            formData.append('MarginHorizontal', mh);
            formData.append('MarginVertical', mv);
            formData.append('PageSize', ps);
            formData.append("PageOrientation", "portrait");
            const apiUrl = merge?`${convertjpgtopdf}&mergeOutput=true` : convertjpgtopdf;
            callApi(apiUrl, formData);

}

async function convertPdftoandfrom(files, from, to, merge = false) {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file));

    currentOperation = to;
    let finalUrl = `${baseConvertApiUrl}?from=${from}&to=${to}`;
    if(to === 'xlsx') {
        formData.append("IncludeFormatting", "true");
        formData.append("EnableOcr", "false");
    }else if(to === 'docx'){
        formData.append("EnableOcr", "false");
    }
    if(merge){
        finalUrl = `${finalUrl}&mergeOutput=true`;
    }

    callApi(finalUrl, formData);

}
async function convertPdftoJpg(files) {

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file));

    callApi(convertPdftoJpg, formData);

}

async function mergePdfs(files) {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    callApi(mergeApiUrl, formData);
}

function resetImgOptions(){
    $(".margin_options").removeClass("active")
    $("[data-margin='no-margin']").addClass("active")
    $('#imgMergeAll').prop('checked', false)
    $(".img_settings_wrap .select-selected").text("Fit (Same page size as image)")
    $(".select-items div").removeClass("same-as-selected")
    $(".select-items div:first-child").addClass("same-as-selected")
    $('#pageSize').val("default").change();
}

function resetConvert(){
    $(".pdf_to_options").removeClass("selected");
    $(".convert_pdf_to_list .pdf_to_options:first-child").addClass("selected");
    pdfoptionselected = "docx"
}
async function rotatePdf(angle,files){
    const formData = new FormData();
    function convertAngle(angle) {
        switch(angle) {
            case 180:
                return 180;
            case 0:
                return 0;
            case 90:
                return 90;
            case 270:
                return 270;
            case 360:
                return 0;
            default:
                return 0; 
        }
    }
    if(angle != 0)(
        formData.append('RotatePage', convertAngle(angle))
    )
    formData.append('PageRange', `1-${totalPages}`);
    Array.from(files).forEach(file => formData.append('file', file));
    callApi(rotatePdfApi, formData);
}

function sortPageValues(pageValues){
    const pageValuesList = pageValues.split(",");
    pageValuesList.sort((a,b)=> {
        try{
            if( isNaN(parseInt(a)) || isNaN(parseInt(a))) throw new Error('Invalid page number');
                return parseInt(a) - parseInt(b);
        }catch(e){
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
        }
    });
    return pageValuesList.join(",");
}

async function deletePdf(pageValue,files) {
    const formData = new FormData();
    const sortedPageValues = sortPageValues(pageValue);

    formData.append('PageRange', sortedPageValues);
    Array.from(files).forEach(file => formData.append('file', file));
    try {
        callApi(deletePdfApi, formData);

    } catch (error) {
        somethingWrong()
        console.error('Error editing PDFs:', error);
    }
}
$(document).on("click", ".pdf-list-item", function(e){
    try {
        if($('.delete-pdf-panel').css('display') == 'block'){
            const clickedPageNumber = parseInt($(this).attr("data-page-number"), 10);
    
            if ($(this).hasClass("selected")) {
                clickedPages.delete(clickedPageNumber);
            } else{
                clickedPages.add(clickedPageNumber);
            }
            selectPages([...clickedPages]);
            updateInputField([...clickedPages]);
            $(".pagesvalue").val([...clickedPages].join(','))
            if (validatePageRangeInput([...clickedPages])){
                const errorMessage = document.getElementById('error-message');
                errorMessage.style.display = 'none';
            }
            $(".pagesvalue").val([...clickedPages].join(','))
        }
    } catch (error) {
        
    }  
})

document.getElementById('pageSelectionInput').addEventListener('input', function() {
    const input = document.getElementById('pageSelectionInput').value.trim();
    const errorMessage = document.getElementById('error-message');

    const pageNumbers = parsePageNumbers(input);
    if (validatePageRangeInput(input)) {
        try {

            if (validatePageNumbers(pageNumbers)) {
                errorMessage.style.display = 'none';  
                clickedPages = new Set(pageNumbers);  
                selectPages(pageNumbers);    
            } else {
                errorMessage.textContent = `Input contains invalid page numbers or ranges. Please ensure all numbers are within 1-${escapeHtml(totalPages)}, and ranges are valid.`;
                errorMessage.style.display = 'block';  
            }
        } catch (e) {
            errorMessage.textContent = escapeHtml(e.message);  
            errorMessage.style.display = 'block';
        }
    } else {
        if(!input) clickedPages.clear();
        errorMessage.textContent = 'Invalid input format. Allowed format: numbers and ranges (e.g., 1,2-4). No spaces allowed.';
        errorMessage.style.display = 'block';  

        selectPages(pageNumbers); 
    }
});
function parsePageNumbers(input) {
    const pages = [];
    const parts = input.split(',');
    let hasRangeError = false; 

    parts.forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
            const range = part.split('-');
            const start = parseInt(range[0], 10);
            const end = parseInt(range[1], 10);

            if (start > end) {
                hasRangeError = true;
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        } else {
            pages.push(parseInt(part, 10));
        }
    });

    if (hasRangeError) {
        throw new Error('Invalid range: The start number cannot be greater than the end number.');
    }

    return pages;
}

function validatePageNumbers(pageNumbers) {

    return pageNumbers.every(page => page >= 1 && page <= totalPages);
}

function selectPages(pageNumbers) {
    const allPages = document.querySelectorAll('.file-item');

    allPages.forEach(page => {
        const pageNumber = parseInt(page.dataset.pageNumber, 10);
        if (pageNumbers.includes(pageNumber)) {
            page.classList.add('selected');
        } else {
            page.classList.remove('selected');
        }
    });

}

function updateInputField(pages) {

    const inputField = document.getElementById('pageSelectionInput');
    const inputString = formatPageNumbers(pages);
    inputField.value = inputString;
}

function formatPageNumbers(pages) {
    let formatted = '';
    let rangeStart = null;
    let rangeEnd = null;

    pages.forEach((page, index) => {
        if (rangeStart === null) {
            rangeStart = page;
            rangeEnd = page;
        } else if (page === rangeEnd + 1) {
            rangeEnd = page;
        } else {
            formatted += formatRange(rangeStart, rangeEnd) + ', ';
            rangeStart = page;
            rangeEnd = page;
        }
        if (index === pages.length - 1) {
            formatted += formatRange(rangeStart, rangeEnd);
        }
    });

    return formatted;
}

function formatRange(start, end) {
    return start === end ? `${start}` : `${start}-${end}`;
}

function resetDeleteInput(){
    hideDiv("#error-message")
    $("#pageSelectionInput").val("")
    try{
        clickedPages.clear();
    }catch(e){}
}
function resetRotateInput(){
    rotateAngle = 0;
    $(".rotate_left").attr("data-pdf-rotate", 0)
    $(".rotate_pdf_options").removeClass("active")
    //$(".rotate_right").addClass("active")
}
function resetEdit(){
    hideDiv(".rotate-pdf-panel, .delete-pdf-panel")
    $(".file-item").removeClass("file-pointer")
    showDiv(".edit-pdf-main")
    $(".pdf-list-item").removeClass("selected")
    $(".pdf-preview").css("transform", "rotate(0deg)");
    resetRotateInput()
    $(".pagesvalue").val("")
    resetDeleteInput()
    $(".rotateerror").hide()
}

const addBtn = document.querySelector('.add_btn');

const container = document.querySelector('.add_wrap');
const groupWrp = document.querySelector('.extragroups');

const updateEventListeners = () => {
    const countUpButtons = document.querySelectorAll(".quantity-arrow-plus");
    const countDownButtons = document.querySelectorAll(".quantity-arrow-minus");
    const deleteButtons = document.querySelectorAll(".delete_group");

    countUpButtons.forEach(button => {
        button.removeEventListener("click", handleCountUp);
        button.addEventListener("click", handleCountUp);
    });

    countDownButtons.forEach(button => {
        button.removeEventListener("click", handleCountDown);
        button.addEventListener("click", handleCountDown);
    });

    deleteButtons.forEach(button => {
        button.removeEventListener("click", handleDeleteGroup);
        button.addEventListener("click", handleDeleteGroup);
    });

    const quantityInputs = document.querySelectorAll(".quantity-num");
    quantityInputs.forEach(input => {
        input.removeEventListener('change', handleInputChange);
        input.addEventListener('change', handleInputChange);
    });
};

const handleInputChange = (event) => {
    const input = event.target;
    let currentValue = parseInt(input.value, 10);
    if (currentValue > totalPages) {

        input.value = totalPages;
    }
    validateToGreaterOrEqualToFrom();
};

const handleCountUp = (event) => {
    const input = event.target.closest('.custom_input').querySelector('.quantity-num');
    let currentValue = parseInt(input.value, 10);
    if (currentValue < totalPages) {
        input.value = currentValue + 1;
    }
    validateToGreaterOrEqualToFrom();
};

const handleCountDown = (event) => {
    const input = event.target.closest('.custom_input').querySelector('.quantity-num');
    let currentValue = parseInt(input.value, 10);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
    validateToGreaterOrEqualToFrom();
};

const validateToGreaterOrEqualToFrom = () => {
    const groups = document.querySelectorAll('.custom_group_counter');
    groups.forEach(group => {
        const fromInput = group.querySelector('.from-input');
        const toInput = group.querySelector('.to-input');

        if (parseInt(toInput.value, 10) < parseInt(fromInput.value, 10)) {
            toInput.value = fromInput.value;
        }
    });
};

const handleDeleteGroup = (event) => {
    const group = event.target.closest('.group-wrapper');
    group.remove();
    groupCounter--;
    if(groupCounter == 1){
        $(".merge_label_split").addClass("mergeDisabled")
    }else{
        $(".merge_label_split").removeClass("mergeDisabled")
    }
    updateGroupNumbers();
    if(groupCounter < 7){
        showDiv(".add_wrap")
    }
};

const updateGroupNumbers = () => {
    const groups = document.querySelectorAll('.group-wrapper');
    groups.forEach((group, index) => {
        if(index===0) return;
        const groupTitle = group.querySelector('h5.sub-title');
        groupTitle.textContent = `Group ${escapeHtml(index + 1)}`;  
        const deleteSpan = document.createElement('span');
        deleteSpan.className = 'delete_group';
        groupTitle.appendChild(deleteSpan);  
    });

    updateEventListeners();  
};

const addGroup = () => {

    if (groupCounter <= 7) {
        showDiv(".add_wrap");
        groupCounter++;
        if(groupCounter == 1){
            $(".merge_label_split").addClass("mergeDisabled")
        }else{
            $(".merge_label_split").removeClass("mergeDisabled")
        }
        const newGroup = document.createElement('div');
        newGroup.className = 'group-wrapper';

        const groupTitle = document.createElement('h5');
        groupTitle.className = 'sub-title';
        groupTitle.textContent = `Group ${escapeHtml(groupCounter)}`;

        const deleteSpan = document.createElement('span');
        deleteSpan.className = 'delete_group';
        groupTitle.appendChild(deleteSpan);

        newGroup.appendChild(groupTitle);

        const customGroupCounter = document.createElement('div');
        customGroupCounter.className = 'custom_group_counter';

        const fromCounterWrapper = createCounterWrapper('From', 1);
        customGroupCounter.appendChild(fromCounterWrapper);

        const toCounterWrapper = createCounterWrapper('To', 1);
        customGroupCounter.appendChild(toCounterWrapper);

        newGroup.appendChild(customGroupCounter);
        groupWrp.appendChild(newGroup);

        updateEventListeners();

        if (groupCounter === 7) {
            hideDiv(".add_wrap");
        }
    } else {
        hideDiv(".add_wrap");
    }
};

const createCounterWrapper = (labelText, initialValue) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'counter_wrapper';

    const label = document.createElement('p');
    label.className = 'counter_placeholder';
    label.textContent = `${escapeHtml(labelText)} `;
    wrapper.appendChild(label);

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'custom_input';

    const input = document.createElement('input');
    input.className = `quantity-num ${labelText.toLowerCase()}-input`;
    input.type = 'number';
    input.value = initialValue;
    input.min = 1;
    input.max = totalPages;
    inputWrapper.appendChild(input);

    const btnWrap = document.createElement('div');
    btnWrap.className = 'counter_btn_wrap';

    const plusButton = document.createElement('button');
    plusButton.className = 'quantity-arrow-plus';
    btnWrap.appendChild(plusButton);

    const minusButton = document.createElement('button');
    minusButton.className = 'quantity-arrow-minus';
    btnWrap.appendChild(minusButton);

    inputWrapper.appendChild(btnWrap);
    wrapper.appendChild(inputWrapper);

    return wrapper;
};

const finalizeGroups = () => {
    const groups = document.querySelectorAll('.custom_group_counter');
    let result = '';

    groups.forEach((group, index) => {
        let fromInput = group.querySelector('.from-input').value;
        let toInput = group.querySelector('.to-input').value;

        if (fromInput.trim() === '') {
            fromInput = 1;
            group.querySelector('.from-input').value = 1
        }
        if (toInput.trim() === '') {
            toInput = 1;
            group.querySelector('.to-input').value = 1
        }
        const from = parseInt(fromInput, 10);
        const to = parseInt(toInput, 10);
        if (from === to) {
            result += `${from}`;
        } else {
            result += `${from}-${to}`;
        }
        if (index < groups.length - 1) {
            result += ',';
        }
    });
    let resultSet = new Set(result.split(','));
    return [...resultSet].join(',');
};

const fixedGroup = () => {
    let inputValue = document.querySelector('.fixed_group_input').value;
    if (inputValue.trim() === '') {
        document.querySelector('.fixed_group_input').value = 1
        inputValue = 1
    }
    const fixedInput = parseInt(inputValue, 10);

    return fixedInput
};

document.getElementById('extract_input').addEventListener('input', function() {
    const input = document.getElementById('extract_input').value.trim();
    const errorMessage = document.getElementById('error-split');

    try {
        if (validatePageRangeInput(input)) {
            const pageNumbers = parsePageNumbers(input);
            if (validatePageNumbers(pageNumbers)) {
                errorMessage.style.display = 'none';  
                clickedPages = pageNumbers;  
            } else {
                errorMessage.textContent = `Input contains invalid page numbers or ranges. Please ensure all numbers are within 1-${escapeHtml(totalPages)}, and ranges are valid.`;
                errorMessage.style.display = 'block';  
            }
        } else {
            errorMessage.textContent = 'Invalid input format. Allowed format: numbers and ranges (e.g., 1,2-4). No spaces allowed.';
            errorMessage.style.display = 'block';  
        }
    } catch (e) {
        errorMessage.textContent = escapeHtml(e.message); 
        errorMessage.style.display = 'block';
    }
});

const extractPages = () => {
    const extractInput = document.querySelector('.extract_input').value;
    if(validatePageRangeInput(extractInput)){

       return extractInput
    }
};

container.addEventListener('click', function(){
    addGroup()
});

updateEventListeners();

$(".split_btn").on('click',function(){ 
    let splitType = $(".split_group_wrap.active").attr("data-split")
    switch(splitType) {
        case "custom":
            showLoader("Just a moment...")
            splitPdf(finalizeGroups(), "SplitByCustomRange", selectedFiles, $('#splitmerge').is(':checked'))
            break;
        case "fixed":
            showLoader("Just a moment...")
            splitPdf(fixedGroup(), "SplitByPattern", selectedFiles)
            break;
        case "extract":
            if(validatePageRangeInput(document.getElementById('extract_input').value.trim())){

                    showLoader("Just a moment...")
                    splitPdf(extractPages(), "ExtractPages", selectedFiles)

            }else{
                const errorMessage = document.getElementById('error-split');
                if(errorMessage.style.display != 'block'){
                    errorMessage.textContent = 'Invalid input format. Allowed format: numbers and ranges (e.g., 1,2-4).';
                    errorMessage.style.display = 'block';  
                }
            }
            break;
    }
})

async function splitPdf(splitInput, splitUrlParam, files, splitMerge = false){
    const formData = new FormData();
    formData.append(splitUrlParam, splitInput)
    if(splitMerge && splitInput.split(",").length > 1){
        formData.append("MergeRanges", true)
    }
    Array.from(files).forEach(file => formData.append('file', file));
    callApi(splitPdfUrl, formData);
}

function resetSplit(){
    $(".extract_input").val("")
    $(".fixed_group_input").val(1)
    $(".custom_group_counter .from-input").val(1)
    $(".custom_group_counter .to-input").val(1)
    showDiv(".add_wrap")
    groupCounter = 1;
    $(".split_group_wrap").removeClass("active")
    $("[data-split='custom']").addClass("active")
    $(".extragroups").empty()
    $("#error-split").hide()
    $('#splitmerge').prop('checked', false)
    $(".merge_label_split").addClass("mergeDisabled")
}

    $('.lock_unlock_toggler').on('click',function(event){

        let elementClick = event.target.className;

        if(!$('.'+elementClick).hasClass('active')){

            $('.'+elementClick).siblings().removeClass('active')  

            $('.'+elementClick).addClass('active') 
        }
        destroyUploadAreas()
        initializeUploadAreas(1,maxSizeofFile,true);
    })

$('.password_section .hide_password').on('click',function(){
    $('.password_section .pass_input').attr('type', 'text'); 
    $('.password_section .hide_password').hide()
    $('.password_section .unhide_password').show()
})

$('.password_section .unhide_password').on('click',function(){
    $('.password_section .pass_input').attr('type', 'password'); 
    $('.password_section .hide_password').show()
    $('.password_section .unhide_password').hide()
})

$('.repeat_password_section .hide_password').on('click',function(){
    $('.repeat_password_section .rep_input').attr('type', 'text'); 
    $('.repeat_password_section .hide_password').hide()
    $('.repeat_password_section .unhide_password').show()
})

$('.repeat_password_section .unhide_password').on('click',function(){
    $('.repeat_password_section .rep_input').attr('type', 'password'); 
    $('.repeat_password_section .hide_password').show()
    $('.repeat_password_section .unhide_password').hide()
})

async function  lockpdf(files,passwordInput){

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file))   
    formData.append("UserPassword", passwordInput);

    callApi(lockPdfUrl, formData);

}

async function  unlockpdf(files,passwordInput){

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file))   
    formData.append("Password", passwordInput);

    callApi(unlockPdfUrl, formData);
}

function resetLockUnlock(){
    $(".pass_input").val("")
    $(".rep_input").val("")
    $('.password_section .pass_input').attr('type', 'password'); 
    $('.password_section .hide_password').show()
    $('.password_section .unhide_password').hide()
    $('.repeat_password_section .rep_input').attr('type', 'password'); 
    $('.repeat_password_section .hide_password').show()
    $('.repeat_password_section .unhide_password').hide()
}
let watermarkSettings = {
    text:'',
    position: 'center',
    horizonatalAlignment:'center',
    verticalAlignment:'bottom',
    fontName:'Arial',
    fontSize: 40,
    transparency:50, 
    layer:'stamp', 
    fontcolor: "#909090",
    textrenderingmode: "filltext"
}

$('.position_option_wrap').on('click',function(event){

   let position =  event.target.getAttribute('data-postion');
    watermarkSettings.position = position;

    let elementClick = event.target.className;

    if(!$('.'+elementClick).hasClass('active')){

        $('.'+elementClick).siblings().removeClass('active')  

        $('.'+elementClick).addClass('active') 
    }
})

$('.font_option_list').on('change',function(event){

    const selectedFontName =  event.target.value;

    watermarkSettings.fontName = selectedFontName;

})

$('.horizontal_option_list').on('change',function(event){
    
    const selectedhPosition =  event.target.value;

    watermarkSettings.horizonatalAlignment = selectedhPosition;

})

$('.vertical_option_list').on('change',function(event){
    
    const selectedvPosition =  event.target.value;

    watermarkSettings.verticalAlignment = selectedvPosition;

})

$('.transparency_option_list').on('change',function(event){

    const selectedTransparency =  event.target.value;

    const opacityValues = {
        'low' : 100,
        'medium': 50,
        'high': 10
    }
    const opactiyNumber =  opacityValues[selectedTransparency];

    watermarkSettings.transparency = opactiyNumber;

})

$('.font_option_list').on('change',function(event){

    const selectedFontName =  event.target.value;

    watermarkSettings.fontSize  =selectedFontName;
})

function getVerticalAlignmentValue(fontSize){
    let yPostion = 7+((fontSize-1)/(200-1))*(45-1);
    return Math.round(yPostion);
}

const watermarkpdf = async (files) => {
    watermarkSettings.text = $('.watermark-text').val();
    watermarkSettings.fontSize = $('.watermark_fontvalue').val() || watermarkSettings.fontSize

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('file', file))   
    formData.append("Text", watermarkSettings.text);
    formData.append("HorizontalAlignment", watermarkSettings.horizonatalAlignment);
    if(watermarkSettings.verticalAlignment ==="bottom")
        formData.append("PositionY", getVerticalAlignmentValue(watermarkSettings.fontSize));
    else
        formData.append("VerticalAlignment", watermarkSettings.verticalAlignment);
    formData.append("FontName", watermarkSettings.fontName);
    formData.append("FontSize", +watermarkSettings.fontSize);
    formData.append("FontColor",watermarkSettings.fontcolor)

    formData.append("Opacity", watermarkSettings.transparency);
    formData.append("Style", watermarkSettings.layer);

    formData.append("TextRenderingMode",watermarkSettings.textrenderingmode)
    formData.append("PageRotation",true)
    formData.append("ColorSpace","RGB");

    callApi(watermarkUrl, formData);

}

function resetWatermark(){
    $('.watermark-text').val("")
    $('.watermark_fontvalue').val("")
    $(".position_option_wrap div").removeClass("active")
    //$(".layer_option_wrap div").removeClass("active")
    $(".position_option_wrap .center").addClass("active")
    //$(".layer_option_wrap .below-content").addClass("active")
    $(".watermark_wrapper .font-option .select-selected").text("Arial")
    $(".watermark_wrapper .hPosition .select-selected").text("Center")
    $(".watermark_wrapper .vPosition .select-selected").text("Bottom")
    $(".trans_inner_wrap .select-selected").text("Medium")
    $(".select-items div").removeClass("same-as-selected")
    $(".select-items div:first-child").addClass("same-as-selected")
    watermarkSettings = {
        text:'',
        position: 'center',
        horizonatalAlignment:'center',
        verticalAlignment:'bottom',
        fontName:'Arial',
        fontSize: 40,
        transparency:50, //medium
        layer:'stamp', //top-content
        fontcolor: "#909090",
        textrenderingmode: "filltext"
    }
}
$(".text_sign_btn").on("click", async function(){
    const signatureFont = $(".signvalue").val().trim().toString();

    const fontSize = Number($(".sign_fontvalue").val().trim());
    if (signatureFont.length === 0) {
        $(".text_error").text("Signature text cannot be empty.").show();
        return;
    } else if (fontSize <= 0 || fontSize > 200) {
        $(".text_error").text("Please enter a valid font size (0-200 px)").show();
        return;
    } else if (!Number.isInteger(fontSize)) {
        $(".text_error").text("Invalid input: Use whole numbers only.").show();
        return;
    } else {
        $(".text_error").text("").hide();
        showLoader("Just a moment...");
    }
    
    const fonts = {
        courier: "courier",
        courierbold: "courier bold",
        courieroblique: "courier oblique",
        helvetica: "helvetica",
        helveticabold: "helvetica bold",
        helveticaoblique: "helvetica oblique",
        helveticaboldolique: "helvetica bold oblique",
        timesroman: "times roman",
        timesromanbold: "times roman bold",
        timesromanitalic: "times italic",
        timesromanbolditalic: "times roman bold italic",
    };

    let fontpdf = fonts[$("#fontName").val()]; 
    pageWidth = pdfWidth;
    pageHeight= pdfHeight;
    const textWidth = calculateTextWidthWithoutLibrary(signatureFont, fontpdf, fontSize);
    const textHeight = fontSize + 10;

    const fontColorSelected = $("#fontColor").val()
    
     const { x, y } = getPositionCoordinates(pageWidth, pageHeight, textWidth, textHeight, positionGridText);

     function calculateTextWidthWithoutLibrary(text, fontFamily, fontSize) {

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
      
        context.font = `${fontSize}px ${fontFamily}`;
      
        const metrics = context.measureText(text);
      
        return metrics.width;
      }

    const formData = new FormData();
    formData.append('file', selectedFiles[0]);
    formData.append('textX', x);
    formData.append('textY', y);
    formData.append('fontSize', fontSize);
    formData.append('color', fontColorSelected);
    formData.append('font', fontpdf);
    formData.append('text', signatureFont);

    try {
        const response = await fetch(signUrl , {
            method: 'POST',
            body: formData,
        });
        const responseJson = await response.json();

        showDocConversionResults(responseJson);

    }catch(error){
        somethingWrong()
    }
})
let strokeColor = "black";
let strokeSize = "2"
let strokes = [];
window.onload = function() {
    const signcanvas = document.getElementById('signature_pad');
    const signcontext = signcanvas.getContext('2d');
    let isDrawing = false;
    strokeColor = "black";
    strokeSize = 2;
    strokes = [];

    function getRelativeCoordinates(event) {
        const rect = signcanvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function redrawCanvas() {
        signcontext.clearRect(0, 0, signcanvas.width, signcanvas.height);
        for (let stroke of strokes) {
            signcontext.beginPath();
            signcontext.lineWidth = stroke.size;
            signcontext.lineCap = 'round';
            signcontext.strokeStyle = stroke.color;
            for (let i = 0; i < stroke.points.length; i++) {
                const point = stroke.points[i];
                if (i === 0) {
                    signcontext.moveTo(point.x, point.y);
                } else {
                    signcontext.lineTo(point.x, point.y);
                }
            }
            signcontext.stroke();
            signcontext.closePath();
        }
    }

    signcanvas.addEventListener('mousedown', (event) => {
        hideDiv(".canvas_placeholder")
        isDrawing = true;
        const coords = getRelativeCoordinates(event);
        strokes.push({
            color: strokeColor,
            size: strokeSize,
            points: [{x: coords.x, y: coords.y}]
        });
    });

    signcanvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    signcanvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;
        const coords = getRelativeCoordinates(event);
        let currentStroke = strokes[strokes.length - 1];
        currentStroke.points.push({x: coords.x, y: coords.y});
        redrawCanvas();
    });

    document.getElementById('clear').addEventListener('click', () => {
        strokes = [];
        redrawCanvas();
        showDiv(".canvas_placeholder")
    });

    document.getElementById('penColor').addEventListener('change', (event) => {
        strokeColor = event.target.value;

        strokes.forEach(stroke => stroke.color = strokeColor);
        redrawCanvas();
    });

    document.getElementById('strokeSize').addEventListener('change', (event) => {
        strokeSize = event.target.value;

        strokes.forEach(stroke => stroke.size = strokeSize);
        redrawCanvas();
    });
};
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}
$(".draw_sign_btn").on("click", async function(){
    if(isCanvasBlank(document.getElementById('signature_pad'))){
        $(".canvas_error").text("Signature canvas cannot be blank").show();
        return;
    }else{
        $(".canvas_error").text("").hide();
        showLoader("Just a moment...");
    }
    pageWidth = pdfWidth;
    pageHeight = pdfHeight;
    const signatureCanvas = document.getElementById("signature_pad"); // Get the canvas


    const originalWidth = signatureCanvas.width; 
    const originalHeight = signatureCanvas.height; 
    const sigWidth = 300;
    const sigHeight = (originalHeight / originalWidth) * sigWidth;
    const { x, y } = getPositionCoordinates(pageWidth, pageHeight, sigWidth, sigHeight, positionGridCanvas);
   
    signatureCanvas.toBlob(async function (blob) {
        if (!blob) {
            console.error("Failed to convert canvas to blob.");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFiles[0]);
        formData.append('image', blob, "canvas-image.png");
        formData.append('imageX', x);
        formData.append('imageY', y);
        formData.append('imageWidth', sigWidth);
        formData.append('imageHeight', sigHeight);
        try {
            const response = await fetch(signUrl , {
                method: 'POST',
                body: formData,
            });
            const responseJson = await response.json();
    
            showDocConversionResults(responseJson);
    
        }catch(error){
            somethingWrong()
            console.error('Error merging PDFs:', error);
        }
    }, "image/png");
})
let selectedImgFile;
document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-upload-input-img');
    const fileNameDisplay = document.getElementById('filename_uploaded');

    fileInput.addEventListener('change', handleImgFile);

    uploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadArea.classList.add('dragging');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragging');
    });

    uploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadArea.classList.remove('dragging');
        const files = event.dataTransfer.files;
        if (files.length > 1) {

            $(".img_error").text("Please upload a single valid image file (PNG or JPEG)").show();
            return;
        }
        handleImgFile({ target: { files } });
    });

    function handleImgFile(event) {
        selectedImgFile = event.target.files
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const listItemimg = document.getElementsByClassName("uploaded_img_preview_wrap")[0];
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('img-preview-upload');
                listItemimg.appendChild(img);
            };
            reader.readAsDataURL(file);

            $(".uploaded_file_area").addClass("active")
            $(".upload-area").removeClass("active")
            fileNameDisplay.textContent = `${escapeHtml(file.name)}`;
            fileNameDisplay.title = `${file.name}`;
            $(".img_error").text("").hide();
        } else {

            $(".img_error").text("Please upload a valid image file (PNG or JPEG)").show();
            $(".uploaded_file_area").removeClass("active")
            $(".upload-area").addClass("active")
            fileNameDisplay.textContent = '';
            fileNameDisplay.title = '';
        }
    }
});
$(".cross_upload").on("click", async function(){
    document.getElementById('file-upload-input-img').value = "";
    selectedImgFile = null;
    $(".uploaded_file_area").removeClass("active")
    $(".upload-area").addClass("active")
    $(".uploaded_img_preview_wrap, .filename_uploaded").empty()
})
$(".upload_sign_btn").on("click", async function(){
    if(!selectedImgFile || selectedImgFile.length == 0){
        $(".img_error").text("Please upload Image").show();
        return;
    }else{
        $(".img_error").text("").hide();
        showLoader("Just a moment...");
    }

    pageWidth = pdfWidth;
    pageHeight = pdfHeight;

    if (selectedImgFile[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.onload = async function () {
                const imageWidth = img.width;
                const imageHeight = img.height;
                const sigWidth = 100;
                const sigHeight = (imageHeight / imageWidth) * sigWidth;
            
                const { x, y } = getPositionCoordinates(pageWidth, pageHeight, sigWidth, sigHeight, positionGridImg);
            
                const formData = new FormData();
                formData.append("file", selectedFiles[0]);
                formData.append('image', selectedImgFile[0]);
                formData.append('imageX', x);
                formData.append('imageY', y);
                formData.append('imageWidth', sigWidth);
                formData.append('imageHeight', sigHeight);
                try {
                    const response = await fetch(signUrl , {
                        method: 'POST',
                        body: formData,
                    });
                    const responseJson = await response.json();
            
                    showDocConversionResults(responseJson);
            
                }catch(error){
                    somethingWrong();
                }finally{
                    selectedImgFile = null;
                }
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(selectedImgFile[0]);
    }

})
function getPositionCoordinates(pageWidth, pageHeight, elementWidth, elementHeight, position) {
    let x, y;

    switch(position.toLowerCase()) {
        case 'top-left':
            x = 10; 
            y = pageHeight - elementHeight - 10; 
            break;
        case 'top-center':
            x = (pageWidth - elementWidth) / 2; 
            y = pageHeight - elementHeight - 10; 
            break;
        case 'top-right':
            x = pageWidth - elementWidth - 10; 
            y = pageHeight - elementHeight - 10; 
            break;
        case 'middle-left':
            x = 10; 
            y = (pageHeight - elementHeight) / 2; 
            break;
        case 'middle-center':
            x = (pageWidth - elementWidth) / 2; 
            y = (pageHeight - elementHeight) / 2; 
            break;
        case 'middle-right':
            x = pageWidth - elementWidth - 10; 
            y = (pageHeight - elementHeight) / 2; 
            break;
        case 'bottom-left':
            x = 10; 
            y = 40; 
            break;
        case 'bottom-center':
            x = (pageWidth - elementWidth) / 2; 
            y = 40; 
            break;
        case 'bottom-right':
            x = pageWidth - elementWidth - 10; 
            y = 40; 
            break;
        default:
            x = 10; 
            y = 10; 
            break;
    }

    return { x, y };
}

function resetSign(){
    positionGridText = "top-left";
    positionGridCanvas = "top-left";
    positionGridImg = "top-left";
    $(".grids").removeClass("active")
    $(".uploaded_file_area").removeClass("active")
    $(".e-sign-option .option-wrap").removeClass("active")
    $(".upload-area").addClass("active")
    $("[data-position='top-left']").addClass("active")
    $("[data-sign='e-sign-text']").addClass("active")
    $(".signvalue").val("");
    $(".sign_fontvalue").val("");
    $(".e-sign_wrap .font-option .select-selected").text("Courier")
    $(".color-selector .select-selected").text("Black")
    $(".pen_color .select-selected").text("Black")
    $(".stroke_size .select-selected").text("2px")
    $(".color-selector .select-selected").attr("class","select-selected black_color")
    $(".pen_color .select-selected").attr("class","select-selected black_color")
    $(".select-items div").removeClass("same-as-selected")
    $(".select-items div:first-child").addClass("same-as-selected")
    strokeColor = "black";
    strokeSize = "2";
    strokes = [];
    $(".uploaded_img_preview_wrap, .filename_uploaded").empty()
    hideDiv(".sign-options")
    showDiv(".e-sign-text")
    const signcanvas = document.getElementById('signature_pad');
    const signcontext = signcanvas.getContext('2d');
    signcontext.clearRect(0, 0, signcanvas.width, signcanvas.height);
    selectedImgFile = null;
}
document.addEventListener('DOMContentLoaded', () => {

});

$(".back_home").on("click", function(){
    hideDiv(".back_home_wrap, .loader-section-wrap, .screens, .right_panel, .right_panel_box")
    $(".main-widget-area, .footer").removeClass("rightOpen")
    showDiv(".screen_home_wrapper")
    blueBody("hide")
    resetAllValues()
    controller.abort();
    setTimeout(function() {controller = new AbortController();signal = controller.signal}, 500)
})

function addFileTypesToInput(fileTypeString=".pdf") {
    $(".draggable-area .file-upload-input").attr("accept", fileTypeString);
}

function resetAllValues(){
    resetEdit()
    resetCompress()
    resetWatermark()
    resetSign()
    resetLockUnlock()
    resetImgOptions()
    resetConvert()
    resetSplit()
    $('.merge_label input').prop('checked', false)
    $(".img_error").text("").hide();
    $(".merge_label").removeClass("mergeDisabled")
    $('.watermark_wrapper .pass-err').hide();
    $('.lock_pdf_to .pass-err').hide();
    $('.unlock_pdf_to .pass-err').hide();
    $(".edit_pdf_options").removeClass("selected")
    $(".edit_pdf_list .edit_pdf_options:first-child").addClass("selected")
}
$(".close-error").on("click", function(){
    hideDiv(".error-message")
    $(".error-popup-wrap").removeClass("show")
})
$(".home-tabs, .try_options").on("click", function(){
    resetAllValues()
    destroyUploadAreas()
    data_tab = $(this).attr("data-tab");

    hideDiv(".right_panel, .right_panel_box, .screens, .back_home_wrap")
    $(".main-widget-area, .footer").removeClass("rightOpen")
    switch(data_tab) {
        case "convert-pdf":
          $(".convert-title").text("Convert PDF")
          $('.lock_unlock_toggler').hide()
          $('.convert_desc').text("Convert to and from PDF in a few simple steps")
          const tofro = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.52 6.97172L14 4.4917L11.52 2.01172" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 4.48828H14" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.47998 9.03906L2 11.5191L4.47998 13.9991" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11.5195H2" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
          $('.left_info li:last-child').html(`Supported formats: PDF ${tofro} DOCX, XLSX, PPTX, JPG, PNG, SVG`)
          $('.lock_unlock_toggler').hide()
          $(".nooffile").text("files")
          addFileTypesToInput(".docx,.xlsx,.pptx,.jpg,.jpeg,.png,.svg,.pdf");
          initializeUploadAreas();
          break;
        case "edit-pdf":
            $(".convert-title").text("PDF Editor");
            $('.convert_desc').text("Rotate your PDF or delete pages in seconds")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "compress-pdf":
            $(".convert-title").text("Compress PDF file")
            $('.convert_desc').text("Reduce the file size of your PDF without losing file quality")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "merge-pdf":
            $(".convert-title").text("Merge PDF file")
            $('.convert_desc').text("Combine multiple PDF files to create a single document")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("files")
            addFileTypesToInput();
            initializeUploadAreas(Infinity,maxSizeofFile,true);
            break;
        case "protect-pdf":
            $(".convert-title").text("Lock or Unlock PDF file")
            $('.convert_desc').text("Easily add or remove a password from your PDF")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').css('display','flex')
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "split-pdf":
            $(".convert-title").text("Split PDF")
            $('.convert_desc').text("Split a single PDF file into page sets or individual pages")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "watermark-pdf":
            $(".convert-title").text("Add Watermark")
            $('.convert_desc').text("Add a watermark by stamping text over your PDF")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        case "sign-pdf":
            $(".convert-title").text("E-sign PDF")
            $('.convert_desc').text("E-sign your PDF by typing, uploading, or drawing your signature")
            $('.left_info li:last-child').text('Supported format: PDF')
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("file")
            addFileTypesToInput();
            initializeUploadAreas(1,maxSizeofFile,true);
            break;
        default:
            $(".convert-title").text("PDF Editor")
            $('.lock_unlock_toggler').hide()
            $(".nooffile").text("files")
            addFileTypesToInput();
            initializeUploadAreas();
            break;
    }
    showDiv(".convert-pdf")
    hideDiv(".screen_home_wrapper")
    showDiv(".back_home_wrap")
    blueBody("show")

})

let pdfoptionselected = "docx"
$(".pdf_to_options").on("click", function(){
    $(".pdf_to_options").removeClass("selected");
    $(this).addClass("selected");
    pdfoptionselected = $(this).attr("data-pdf-to")

    if(pdfoptionselected == "svg" || pdfoptionselected == "png" || pdfoptionselected == "jpg"){
        $(".convert_pdf_to .merge_label").addClass("mergeDisabled")
    }else{
        if(selectedFiles.length == 1){
            $(".convert_pdf_to .merge_label").addClass("mergeDisabled")
        }else{
            $(".convert_pdf_to .merge_label").removeClass("mergeDisabled")
        }
    }
})
$(".convert_pdf_to_btn").on("click", function(){
    showLoader()
    const pdftoselected = $(".pdf_to_options.selected").attr("data-pdf-to")
    const mergePdf = $('#mergeAll').is(':checked')
    if(pdfoptionselected == "svg" || pdfoptionselected == "png" || pdfoptionselected == "jpg"){
        convertPdftoandfrom(selectedFiles,"pdf", pdftoselected, false)
    }else{
        convertPdftoandfrom(selectedFiles,"pdf", pdftoselected, mergePdf)
    }

})
$(".img_to_pdf_btn").on("click", function(){
    showLoader()
    let ps = $('#pageSize').val()

    let mv = $(".margin_options.active").attr("data-mv")
    let mh = $(".margin_options.active").attr("data-mh")
    const mergePdf = $('#imgMergeAll').is(':checked')
    convertJpgtoPdf(selectedFiles,mh,mv,ps,mergePdf)
})

$(".margin_options").on("click", function(){
    $(".margin_options").removeClass("active");
    $(this).addClass("active");
    $(".list-img-class-options").removeClass("small-margin big-margin no-margin")
    $(".list-img-class-options").addClass($(this).attr("data-margin"))
})
$(".merge_multiple_btn").on("click", function(){
    showLoader()
    const mergePdf = $('#mergeAllinOne').is(':checked')
    convertPdftoandfrom(selectedFiles, "any", "pdf", mergePdf)
})

document.addEventListener("click", closeAllSelect);

document.getElementById("pageSize").addEventListener("change", function() {
    $(".list-img-class-options").removeClass("letter legal default")
    $(".list-img-class-options").addClass(this.value)
});
$(".compress_pdf_to_btn").on("click", function(){
    showLoader()

    compressPdf(selectedFiles)
})

$('.merge_pdf_to_btn').on('click',function(){
    showLoader()

    let rarrangedFileList = [];
    $(".file-list .file-item").each(function(x){
        let index = $(this).data('index');
        rarrangedFileList.push(selectedFiles[index]);
    })

    mergePdf(rarrangedFileList)
})

$('.lock_pdf_to_btn').on("click",function(){
    let val1 = $('.lock_pdf_to .pass_input').val()
    let val2 = $('.lock_pdf_to .rep_input').val()
    $('.lock_pdf_to .pass-err').text('')

    if(!val1 || !val2){
         $('.lock_pdf_to .pass-err').text('Kindly enter password')
         $('.lock_pdf_to .pass-err').show()
         return
    }

    if(val1 !== val2 ){

        $('.lock_pdf_to .pass-err').text('Password is not matching')
        $('.lock_pdf_to .pass-err').show()
    }else{
        if(val1.trim().length < 8){
            $('.lock_pdf_to .pass-err').text('Password length should be minimum 8 characters')
            $('.lock_pdf_to .pass-err').show()
            return
        }else{
            $('.lock_pdf_to .pass-err').hide()
            showLoader()
            lockpdf(selectedFiles,val1)
        }

    }

})

$('.unlock_pdf_to_btn').on("click",function(){
    let val1 = $('.unlock_pdf_to .pass_input').val()
    let val2 = $('.unlock_pdf_to .rep_input').val()
    $('.unlock_pdf_to .pass-err').text('');
    if(!val1 || !val2){
         $('.unlock_pdf_to .pass-err').text('Kindly enter password')
         $('.unlock_pdf_to .pass-err').show()
         return
    }

    if(val1 !== val2 ){

        $('.unlock_pdf_to .pass-err ').text('Password is not matching')
        $('.unlock_pdf_to .pass-err').show()
    }else{
        $('.unlock_pdf_to .pass-err').hide()
        showLoader()
         unlockpdf(selectedFiles,val1)
    }
})

$('.watermark_btn').on('click',function(){
    let val1 = $('.watermark_wrapper  .watermark-text').val();
    const fontSize = Number($('.watermark_wrapper  .watermark_fontvalue').val().trim());
    $('.watermark_wrapper .pass-err').text('')
    if(val1.trim().length < 1){
        $('.watermark_wrapper .pass-err').text('Please enter Watermark Text to proceed.')
        $('.watermark_wrapper .pass-err').show();
    }else{
        if ($('.watermark_wrapper  .watermark_fontvalue').val().trim().length > 0 && fontSize > 0 && fontSize < 201 && Number.isInteger(fontSize)) {
            $('.watermark_wrapper .pass-err').hide();
            showLoader();
            watermarkpdf(selectedFiles);
        }else if (!Number.isInteger(fontSize)) {
            $('.watermark_wrapper .pass-err').text('Invalid input: Use whole numbers only.')
            $('.watermark_wrapper .pass-err').show();
        } else {
            $('.watermark_wrapper .pass-err').text('Please enter a valid font size (0-200 px)')
            $('.watermark_wrapper .pass-err').show();
        }

    }

})

$(".edit_pdf_options").on("click", function(){
    $(".edit_pdf_options").removeClass("selected");
    $(this).addClass("selected");

})
$(".rotate_back").on("click", function(){
    resetEdit()
})
$(".edit_pdf_btn").on("click", function(){
    hideDiv(".edit-pdf-main")
    const editpdfselected = $(".edit_pdf_options.selected").attr("data-pdf-edit")
    switch(editpdfselected) {
        case "rotate":
            showDiv(".rotate-pdf-panel")
          break;
        case "delete":
           showDiv(".delete-pdf-panel")
           $(".file-item").addClass("file-pointer")
          break;
        default:
            showDiv(".rotate-pdf-panel")
            break;
    }
})

$('.rotate_left').on('click', function () {  
    $('.rotate_left').addClass("active")
    $('.rotate_right').removeClass("active")
    rotateAngle = (rotateAngle - 90) % 360;
    if (rotateAngle < 0) rotateAngle += 360; 
    $(".pdf-preview").css("transform", "rotate(" + rotateAngle + "deg)");
    $(".rotate_left").attr("data-pdf-rotate", rotateAngle)
});

$('.rotate_right').on('click', function () {  
    $('.rotate_right').addClass("active")
    $('.rotate_left').removeClass("active")
    rotateAngle = (rotateAngle + 90) % 360;
    $(".pdf-preview").css("transform", "rotate(" + rotateAngle + "deg)");
    $(".rotate_right").attr("data-pdf-rotate", rotateAngle)
});

$(".rotate_pdf_btn").on("click", function(){
    if($(".rotate_pdf_options").hasClass("active")){
        showLoader()
        rotatePdf(rotateAngle,selectedFiles)
        $(".rotateerror").hide()
    }else{
        $(".rotateerror").show()
    }
})

$(".delete_pdf_btn").on("click", function(){
    let deletePageVal = $(".pagesvalue").val();
    const errorMessage = document.getElementById('error-message');
    $(".file-item").removeClass("file-pointer")
    if(validatePageRangeInput(deletePageVal)){
        if(errorMessage.style.display == "none"){
            showLoader()
            deletePdf(deletePageVal,selectedFiles)
        }

    }else{
        errorMessage.textContent = 'Invalid input format. Allowed format: numbers and ranges (e.g., 1,2-4). No spaces allowed.';
        errorMessage.style.display = 'block';  
    }
})

$('.split_group_wrap').on('click',function(){
    $(".split_group_wrap").removeClass("active")
    $(this).addClass("active")
})

$('.e-sign-option .option-wrap').on('click',function(){
    $(".e-sign-option .option-wrap").removeClass("active")
    $(this).addClass("active")
    let signType = $(this).attr("data-sign")
    hideDiv(".sign-options")
    $("."+ signType).show()
})

$('.position-options div').on('click',function(){
    $(".position-options div").removeClass("active")
    $(this).addClass("active")
    let positionType = $(this).text()

})
$('.grid-positions-text .grids').on('click',function(){
    $(".grid-positions-text .grids").removeClass("active")
    $(this).addClass("active")
    positionGridText = $(this).attr("data-position")

})
$('.grid-positions-canvas .grids').on('click',function(){
    $(".grid-positions-canvas .grids").removeClass("active")
    $(this).addClass("active")
    positionGridCanvas = $(this).attr("data-position")

})
$('.grid-positions-img .grids').on('click',function(){
    $(".grid-positions-img .grids").removeClass("active")
    $(this).addClass("active")
    positionGridImg = $(this).attr("data-position")

})

function hideElements(...elements) {
	elements.forEach(element => {
		element.classList.add('hide');
	});
}

function showElement(element) {
	element.classList.remove('hide');
}

function getBrowser() {
	try {
		var e = navigator.userAgent
			, t = e.match(/(chrome|safari|opera|firefox|msie|trident(?=\/))\/?\s*(\.?\d+(\.\d+)*)/i);
		if (t[1] && /trident/i.test(t[0]))
			return tem = /\brv[ :]+(\d+)/g.exec(e) || [],
			{
				name: "IE",
				version: tem[1] || ""
			};
		if ("Chrome" === t[1] && (tem = e.match(/\b(OPR|Edge)\/(\d+)/),
			null != tem))
			return {
				name: tem[1].replace("OPR", "Opera"),
				version: tem[2]
			};
		t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"],
			null != (tem = e.match(/version\/(\d+)/i)) && t.splice(1, 1, tem[1]);
		var n = t[0];
		return {
			name: n,
			version: t[1],
			isChrome: n.toLowerCase().indexOf("chrome") > -1,
			isFirefox: n.toLowerCase().indexOf("firefox") > -1
		}
	} catch (e) {

	}
	return {
		name: "Unknown",
		version: "0.0.0",
		isChrome: !1,
		isFirefox: !1
	}
}

var viewPermission = $(".viewpermisionbtn");
var uninstallAddOn = $("#uninstallAddOn")

viewPermission.on('click', function (e) {
    OPTIN_URL = chrome.runtime.getURL("/html/optin.html");
    chrome.tabs.create({url:OPTIN_URL});
})

uninstallAddOn.on("click", function (e) {
    let uninstallUrl = UNINSTALL_PAGE+"&self=1";
    chrome.runtime.setUninstallURL(uninstallUrl);
	browser.management.uninstallSelf(
		{
			showConfirmDialog: false
		}
	)
})

document.addEventListener("DOMContentLoaded", function () {
	storageReplacer.init().then(function () {
		checkPiiStored();
	});
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		if (key === "piiAccept" && newValue === "1") {
			enableWidget();
			document.dispatchEvent(
				new CustomEvent("PiiAccept", {
					detail: true,
				})
			);
		} else if (key === "piiAccept" && newValue === "-1") {
			disableWidget();
			document.dispatchEvent(
				new CustomEvent("PiiAccept", {
					detail: false,
				})
			);
		}
	}
});

function disableWidget(){
    $("body").addClass("optedOut")
	const elements = document.querySelectorAll(".home-tabs");

    elements.forEach(element => {
    element.style.pointerEvents = 'none';
    });
}
function enableWidget(){
    $("body").removeClass("optedOut")
    const elements = document.querySelectorAll(".home-tabs");

    elements.forEach(element => {
    element.style.pointerEvents = 'auto';
    });
}

function checkPiiStored() {
	var accepted = storageReplacer.getLocalStorageItem("piiAccept");
	if (accepted && accepted == 1) {

		enableWidget();
		document.dispatchEvent(
			new CustomEvent("PiiAccept", {
				detail: true,
			})
		);
	} else if (!accepted || accepted == -1) {
		disableWidget();
		document.dispatchEvent(
			new CustomEvent("PiiAccept", {
				detail: false,
			})
		);
	}
}