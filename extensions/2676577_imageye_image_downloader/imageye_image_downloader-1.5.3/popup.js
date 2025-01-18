var conf={
    defaults:{
        minwidth:0,
        maxwidth:20000,
        minheight:0,
        maxheight:20000,
        downloadseparatefolder:false,
        donotbother:false,
        numviews:0,
        allframes:false
    },
    minwidth:0,
    maxwidth:20000,
    minheight:0,
    maxheight:20000,
    urlpattern:"",
    downloadseparatefolder:false,
    donotbother:false,
    changed:false,
    allframes:false
}
var imageye={
    selection:new Object(),
    allimages:new Object(),
    getImages:function(onlyTopFrame){
        imageye.initiated=false;
        var allFrames=conf.allframes;
        if(allFrames)
            allFrames=!onlyTopFrame;
        //reset old selection
        var allimages=document.getElementsByClassName("imgContainer");
        for(var i=0;i<allimages.length;i++){
            imageye.selectImg(allimages[i],true,false);
        }
        imageye.selection=new Object();
        imageye.allimages=new Object();
        imageye.monitorStatus(onlyTopFrame);
        //reset old results
        var ihtml='<div id="spinner" class="spinner"><span id="processedImages" style="position: absolute;top: -38px;width: 250px;left: -95px;"></span><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
        if($("#imgsContainer")[0].innerHTML.trim()!=ihtml){
            $("#imgsContainer")[0].innerHTML=ihtml;
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            imageye.currUrl=tabs[0].url;
            chrome.tabs.executeScript(tabs[0].id, {file: "app.js",allFrames: allFrames}, imageye.getImagesCallback)
        })
    },
    getImagesCallback:function(results){
        if(imageye.initiated)
            return
        console.log(results);
        imageye.initiated=true;
        if(chrome.extension.lastError || !results){
            var message=chrome.extension.lastError?chrome.extension.lastError.message:"Cannot access images in this page."
            var errordiv=document.createElement("div");
            errordiv.innerHTML="<br><br><br><br><br><br><br><br><br><br><br><br><br><center>"+message+"</center><br><br><br><br>";
            $("#imgsContainer")[0].appendChild(errordiv);
            document.getElementById("spinner").style.display="none";
            document.getElementById("searchingimagesdiv").style.display="none";
            document.getElementById("foundimagesdiv").style.display="";
        }else{
            //console.log("results length: "+results.length);
            var processedImages=0;
            var totalImages=0;
            for(var r=0;r<results.length;r++){
                if(results[r]!=null && results[r].images!=null && results[r].images.length>0){
                    totalImages+=results[r].images.length;
                }
            }
            if(totalImages==0){
                imageye.foundlastimage();
                return;
            }
            
            $("#processedImages")[0].innerHTML="processed 0 of "+totalImages+" images";
            
            for(var r=0;r<results.length;r++){
                if(results[r]==null || results[r].images==null)
                    continue
                var images=results[r].images;
                console.log("images length: "+images.length);
                if(results[r].isTop)
                    imageye.title=results[r].title;
                for(var i=0;i<images.length;i++){
                    try{
                        console.log("going to inject img: "+images[i]);
                        if(imageye.allimages[images[i]]){
                            processedImages++;
                            continue;
                        }
                        imageye.allimages[images[i]]=images[i];
                        var img=document.createElement("img");
                        img.src=images[i];
                        img.style.maxWidth="600px";
                        function errorHandler(){
                            processedImages++;
                            $("#processedImages")[0].innerHTML="processed "+processedImages+" of "+totalImages+" images";
                            if(processedImages==totalImages){
                                imageye.foundlastimage();
                            }
                        }
                        setTimeout(function(img){
                            img.timeoutExpired=true;
                            errorHandler()
                        },3000,img);
                        img.onerror = function(){
                            if(this.timeoutExpired)
                                return;
                            errorHandler()
                        }
                        img.onload = function() {
                            if(this.timeoutExpired)
                                return;
                            processedImages++;
                            $("#processedImages")[0].innerHTML="processed "+processedImages+" of "+totalImages+" images";
                            if(
                                this.width>=conf.minwidth && this.width<=conf.maxwidth && this.height>=conf.minheight && this.height<=conf.maxheight &&
                                this.src.toLowerCase().indexOf(conf.urlpattern.toLowerCase())!=-1
                            ){
                                var imgSrc=this.src;
                                var div=document.createElement("div");
                                div.className="imgContainer";
                                
                                var maxWidth = 500; // Max width for the image
                                var maxHeight = 400;    // Max height for the image
                                var width = this.width;    // Current image width
                                var height = this.height;  // Current image height
                                var pixels=width*height;
                                div.setAttribute("pixels",pixels);

                                // Check if the current width is larger than the max
                                if(width > maxWidth){
                                    var ratio = maxWidth / width;   // get ratio for scaling image
                                    height = height * ratio;    // Reset height to match scaled image
                                    width = width * ratio;    // Reset width to match scaled image
                                }

                                // Check if current height is larger than max
                                if(height > maxHeight){
                                    var ratio = maxHeight / height; // get ratio for scaling image
                                    width = width * ratio;    // Reset width to match scaled image
                                    height = height * ratio;    // Reset height to match scaled image
                                }
                                
                                width=width*0.9;
                                height=height*0.9;
                                
                                var imageType="-";
                                var validImageTypes="|jpg|jpeg|png|gif|xbm|bmp|ico|tiff|svg|";
                                var suffix="unknown";
                                try{
                                    if(imgSrc.indexOf("data:image/")==0){
                                        suffix=imgSrc.substring(11,imgSrc.indexOf(";"));
                                    }else{
                                        suffix=imgSrc.substring(imgSrc.lastIndexOf(".")+1,imgSrc.length).toLowerCase();
                                    }
                                }catch(e){
                                    //ignore
                                }
                                if(validImageTypes.indexOf("|"+suffix+"|")!=-1)
                                    imageType=suffix.toUpperCase();
                                var style="style='width:" + width + "px;height:" + height + "px'";
                                div.innerHTML="<img class='origImg' id='"+imgSrc+"' src='"+imgSrc+"' "+style+"><br><input class='imgInput' value='"+this.src+"'><div class='imgInfo'><img class='zoomIcon' title='Open in new tab' src='"+chrome.extension.getURL("newtab.png")+"' /><img class='zoomIcon downloadIcon' title='Download' src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5Ljk3OCAyOS45NzgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Ljk3OCAyOS45Nzg7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8cGF0aCBkPSJNMjUuNDYyLDE5LjEwNXY2Ljg0OEg0LjUxNXYtNi44NDhIMC40ODl2OC44NjFjMCwxLjExMSwwLjksMi4wMTIsMi4wMTYsMi4wMTJoMjQuOTY3YzEuMTE1LDAsMi4wMTYtMC45LDIuMDE2LTIuMDEyICAgdi04Ljg2MUgyNS40NjJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMTQuNjIsMTguNDI2bC01Ljc2NC02Ljk2NWMwLDAtMC44NzctMC44MjgsMC4wNzQtMC44MjhzMy4yNDgsMCwzLjI0OCwwczAtMC41NTcsMC0xLjQxNmMwLTIuNDQ5LDAtNi45MDYsMC04LjcyMyAgIGMwLDAtMC4xMjktMC40OTQsMC42MTUtMC40OTRjMC43NSwwLDQuMDM1LDAsNC41NzIsMGMwLjUzNiwwLDAuNTI0LDAuNDE2LDAuNTI0LDAuNDE2YzAsMS43NjIsMCw2LjM3MywwLDguNzQyICAgYzAsMC43NjgsMCwxLjI2NiwwLDEuMjY2czEuODQyLDAsMi45OTgsMGMxLjE1NCwwLDAuMjg1LDAuODY3LDAuMjg1LDAuODY3cy00LjkwNCw2LjUxLTUuNTg4LDcuMTkzICAgQzE1LjA5MiwxOC45NzksMTQuNjIsMTguNDI2LDE0LjYyLDE4LjQyNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' /><div class='imgSize'>"+this.width+"x"+this.height+"</div><div class='imgSize' style='margin-right:5px;'>"+imageType+"</div></div>";
                                div.setAttribute("imgsrc",imgSrc);
                                
                                /*find the right place for appending based on pixels*/
                                var currentImagesDivs=document.getElementsByClassName("imgContainer");
                                var appended=false;
                                for(var i=0;i<currentImagesDivs.length;i++){
                                    if(pixels>currentImagesDivs[i].getAttribute("pixels")){
                                        $(currentImagesDivs[i]).before( div );
                                        appended=true;
                                        break;
                                    }
                                }
                                if(!appended)
                                    document.getElementById("imgsContainer").appendChild(div);
                                
                                div.onclick = function(event) {
                                    if(event.target.className=="imgInput"){
                                        return;
                                    }
                                    if(event.target.className=="zoomIcon"){
                                        window.open(imgSrc);
                                        return;
                                    }
                                    if(event.target.className=="zoomIcon downloadIcon"){
                                        chrome.downloads.download({
                                            url: this.getAttribute("imgsrc")
                                        });
                                        return;
                                    }
                                    
                                        
                                    
                                    imageye.selectImg(this);
                                }
                                /*
                                var magnify=Math.max(1,300/this.width);
                                $( div ).zoom({ on:'click', magnify:magnify,
                                    onZoomIn:function(){
                                        this.style.display="";
                                        var img=$(this.parentElement).find(".origImg");
                                        img[0].style.display="none";
                                    }, 
                                    onZoomOut:function(){
                                        this.style.display="none";
                                        var img=$(this.parentElement).find(".origImg");
                                        img[0].style.display="";
                                    }
                                });
                                */
                            }
                            if(processedImages==totalImages){
                                imageye.foundlastimage();
                            }
                        }
                    }catch(e){
                        console.log(e);
                    }
                }
            }
        }
    },
    initSliders:function(){
        $( "#width-slider" ).slider({
            range: true,
            min: conf.defaults.minwidth,
            max: conf.defaults.maxwidth,
            values: [ conf.minwidth, conf.maxwidth ],
            slide: function( event, ui ) {
                $("#minwidthtd")[0].innerHTML=ui.values[0]+"px";
                $("#maxwidthtd")[0].innerHTML=ui.values[1]+"px";
            },
            stop: function( event, ui ) {
                conf.minwidth=ui.values[0];
                conf.maxwidth=ui.values[1];
                chrome.storage.sync.set({
                    minwidth: conf.minwidth,
                    maxwidth: conf.maxwidth
                });
                imageye.getImages();
            }
        });
        $( "#height-slider" ).slider({
            range: true,
            min: conf.defaults.minheight,
            max: conf.defaults.maxheight,
            values: [ conf.minheight, conf.maxheight ],
            slide: function( event, ui ) {
                $("#minheighttd")[0].innerHTML=ui.values[0]+"px";
                $("#maxheighttd")[0].innerHTML=ui.values[1]+"px";
            },
            stop: function( event, ui ) {
                conf.minheight=ui.values[0];
                conf.maxheight=ui.values[1];
                chrome.storage.sync.set({
                    minheight: conf.minheight,
                    maxheight: conf.maxheight
                });
                imageye.getImages();
            }
        });
    },
    selectImg:function(div,force,forceValue){
        var src=div.getAttribute("imgsrc");
        var toSelect=force?forceValue:!imageye.selection[src];
        if(toSelect){
            imageye.selection[src]=src;
            div.style.border="2px solid #106eb1";
            div.style.margin="-1px -1px 9px 8px";
        }else{
            delete imageye.selection[src];
            div.style.border=div.style.margin="";
        }
        var selectionLength=0;
        for (var k in imageye.selection) {
            if (imageye.selection.hasOwnProperty(k)) 
                selectionLength++;
        }
        if(selectionLength==0){
            $("#downloadButton")[0].style.display="none";
            $("#foundimagesinnerdiv")[0].style.display="";
        }else{
            $("#downloadButton")[0].innerHTML="<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDUyLjc1NiA1Mi43NTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUyLjc1NiA1Mi43NTc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZD0iTTI2LjEwNiwyOS4wNTlsMTAuNTIzLTEwLjUyM2MxLjA0Ny0xLjAyNCwwLjgxMy0xLjc0Ni0wLjY0OS0xLjc0NmgtNS44NzNMMzAuMTA4LDRjMC0yLjIwOS0xLjc5LTQtNC00bDAsMCAgICAgYy0yLjIwOSwwLTQsMS43OTEtNCw0bC0wLjAwMSwxMi43ODloLTUuODc2Yy0xLjQ2Mi0wLjAwMS0xLjY5MywwLjcyMy0wLjY0NiwxLjc0N0wyNi4xMDYsMjkuMDU5eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCQk8cGF0aCBkPSJNNDkuMDI3LDI1Ljc3aC02LjA0OWMtMC41NTQsMC0xLDAuNDQ3LTEsMXYxNy45MzlIMTAuNzhWMjYuNzdjMC0wLjU1My0wLjQ0Ny0xLTEtMUgzLjczMWMtMC41NTMsMC0xLDAuNDQ3LTEsMXYyMC40NjQgICAgIGMwLDMuMDQ1LDIuNDc5LDUuNTIyLDUuNTI0LDUuNTIyaDM2LjI0OGMzLjA0NiwwLDUuNTIzLTIuNDc5LDUuNTIzLTUuNTIyVjI2Ljc3QzUwLjAyNywyNi4yMTcsNDkuNTgxLDI1Ljc3LDQ5LjAyNywyNS43N3oiIGZpbGw9IiNGRkZGRkYiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==' />Download "+selectionLength+" image"+(selectionLength>1?"s":"");
            $("#downloadButton")[0].style.display="";
            $("#foundimagesinnerdiv")[0].style.display="none";
        }
        var allimages=document.getElementsByClassName("imgContainer");
        
        $("#selectalla")[0].innerHTML=allimages.length==selectionLength?"Deselect all":"Select all";
    },
    monitorStatus:function(onlyTopFrame){
        setTimeout(function(){
            if(imageye.initiated)
                return
            if(!onlyTopFrame){
                imageye.getImages(true)
                return;
            }
            //var img=document.createElement("img");
            //img.src="https://www.marenauta.com/imageyeerror?url="+imageye.currUrl;
            var message="Something went wrong, Please refresh this page."
            $("#imgsContainer")[0].innerHTML="<br><br><br><br><br><br><br><br><br><br><br><br><br><br><center>"+message+"<br><br><a href='#' id='reloada'>Refresh</a></center><br><br><br><br>";
            $("#reloada")[0].onclick = function() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                });
            };
            document.getElementById("searchingimagesdiv").style.display="none";
            document.getElementById("foundimagesdiv").style.display="";
        },10000);
    },
    showFilters:function(){
        if(document.body.classList.contains("showFilters")){
            document.body.classList.remove("showFilters");
        }else{
            document.body.classList.add("showFilters");
        }
    },
    showPrefs:function(){
        if(document.body.classList.contains("showPrefs")){
            document.body.classList.remove("showPrefs");
        }else{
            if(!chrome.downloads.onDeterminingFilename)
                $("#downloadseparatefoldercont")[0].style.display="none"
            $("#downloadseparatefolder")[0].checked=conf.downloadseparatefolder?true:false;
            $("#donotbother")[0].checked=conf.donotbother?true:false;
            $("#allframes")[0].checked=conf.allframes?true:false;
            document.body.classList.add("showPrefs");
        }
    },
    savePrefs:function(){
        conf.downloadseparatefolder=$("#downloadseparatefolder")[0].checked
        conf.donotbother=$("#donotbother")[0].checked
        conf.allframes=$("#allframes")[0].checked
        chrome.storage.sync.set({
            downloadseparatefolder: conf.downloadseparatefolder,
            donotbother: conf.donotbother,
            allframes: conf.allframes
        });
        document.body.classList.remove("showPrefs");
    },
    showRating:function(){
        if(document.body.classList.contains("showRating")){
            document.body.classList.remove("showRating");
        }else{
            document.body.classList.add("showRating");
        }
    },
    openRatingTab: function(){
        window.open("https://chrome.google.com/webstore/detail/imageye-image-downloader/agionbommeaifngbhincahgmoflcikhm/reviews");
    },
    downloadImages:function(){
        for (var k in imageye.selection) {
            if (imageye.selection.hasOwnProperty(k)) {
                chrome.downloads.download({
                    "url": k
                });
            }
        }
    },
    suggestFileName:function(item,suggest){
        var title="Imageye - " + imageye.title.replace(new RegExp('[^0-9a-zA-Z-_ ]', 'g'), "_");
        var filename=item.filename;
        if(conf.downloadseparatefolder)
            filename = title + '/' + filename;
        console.log(filename)
        suggest({
            filename: filename
        });
    },
    init:function(){
        imageye.initSliders();
        imageye.getImages();
        
        if(chrome.downloads.onDeterminingFilename)
            chrome.downloads.onDeterminingFilename.addListener(imageye.suggestFileName);
        
        $("#showFilters")[0].onclick = imageye.showFilters;
        $("#showPrefs")[0].onclick = imageye.showPrefs;
        
        $("#saveprefscancel")[0].onclick=imageye.showPrefs
        $("#saveprefs")[0].onclick=imageye.savePrefs        
        
        $("#selectalla")[0].onclick = function(){
            var allimages=document.getElementsByClassName("imgContainer");
            var selectionLength=0;
            for (var k in imageye.selection) {
                if (imageye.selection.hasOwnProperty(k)) 
                    selectionLength++;
            }
            var toSelect=true;
            if(allimages.length==selectionLength){
                toSelect=false;
            }
            for(var i=0;i<allimages.length;i++){
                imageye.selectImg(allimages[i],true,toSelect);
            }
        }
        $("#downloadButton")[0].onclick = function(){
            var selectionLength=0;
            for (var k in imageye.selection)
                if (imageye.selection.hasOwnProperty(k)) 
                    selectionLength++;
            if(selectionLength>5 && !conf.donotbother){
                if(navigator.userAgent.indexOf("Firefox") != -1){
                    chromemanyfileswarning.style.display="none";
                    firefoxmanyfileswarning.style.display="block";
                }
                $("#manyfilesnum")[0].innerHTML=selectionLength;
                $("#manyfiles")[0].style.display="block";
                $("#manyfilesdownload")[0].onclick=function(){
                    conf.donotbother=$("#donotbotherme")[0].checked;
                    chrome.storage.sync.set({
                        donotbother: conf.donotbother
                    });
                    imageye.downloadImages();
                    $("#manyfiles")[0].style.display="none";
                }
                $("#manyfilescancel")[0].onclick=function(){
                    $("#manyfiles")[0].style.display="none";
                }
                $("#donotbotherme")[0].checked=false;
                return;
            }
            imageye.downloadImages();
        }
        $("#filterbyurlinput")[0].oninput = function(){
            var inputurl=this.value;
            if(imageye.inputtimeout)
                clearTimeout(imageye.inputtimeout)
            imageye.inputtimeout=setTimeout( function(){
                conf.urlpattern=inputurl;
                imageye.getImages();
            },300);
        }
        $("#ratebutton")[0].onclick = imageye.openRatingTab
        $("#rateclose")[0].onclick = imageye.showRating
    },
    getConf:function(callback){
        chrome.storage.sync.get({
                minwidth: conf.defaults.minwidth,
                maxwidth: conf.defaults.maxwidth, 
                minheight: conf.defaults.minheight,
                maxheight: conf.defaults.maxheight,
                downloadseparatefolder:conf.defaults.downloadseparatefolder,
                donotbother:conf.defaults.donotbother,
                numviews:conf.defaults.numviews,
                allframes:conf.defaults.allframes
            }, 
            function(items) {
                if(conf.defaults.minwidth!=items.minwidth || conf.defaults.maxwidth!=items.maxwidth || conf.defaults.minheight!=items.minheight || conf.defaults.maxheight!=items.maxheight){
                    conf.changed=true;
                    conf.minwidth=items.minwidth;
                    conf.maxwidth=items.maxwidth;
                    conf.minheight=items.minheight;
                    conf.maxheight=items.maxheight;
                    $("#minwidthtd")[0].innerHTML=conf.minwidth+"px";
                    $("#maxwidthtd")[0].innerHTML=conf.maxwidth+"px";
                    $("#minheighttd")[0].innerHTML=conf.minheight+"px";
                    $("#maxheighttd")[0].innerHTML=conf.maxheight+"px";
                    imageye.showFilters();
                }else{
                    //ugly fix for chrome issue
                    document.getElementById("imgsContainer").style.height="400px";
                    setTimeout(function(){
                        document.getElementById("imgsContainer").style.height="536px";
                    },1);
                }
                conf.downloadseparatefolder=items.downloadseparatefolder;
                conf.donotbother=items.donotbother;
                conf.allframes=items.allframes;
                
                callback();
                
                imageye.numviews=items.numviews+1;
                var howoftentoshowrating=imageye.numviews>1000?100000:imageye.numviews>100?1000:imageye.numviews>10?100:10;
                if(imageye.numviews%howoftentoshowrating==0){
                    imageye.showRating();
                }
                chrome.storage.sync.set({
                    numviews: imageye.numviews
                });
            }
        );
    },
    foundlastimage:function(){
        document.getElementById("spinner").style.display="none";
        document.querySelectorAll(".imgContainer").forEach(function(el){
            el.style.display="-webkit-box";
        })
        document.getElementById("numimagesfound").innerHTML=document.querySelectorAll(".imgContainer").length;
        document.getElementById("searchingimagesdiv").style.display="none";
        document.getElementById("foundimagesdiv").style.display="";
    }
}
imageye.getConf(imageye.init);