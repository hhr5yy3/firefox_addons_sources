

function toggleLightDark(){
    if(isLight){
        removejscssfile("/data/css/popup.css", "css");
        removejscssfile("/data/mdl/material.red-orange.min.css", "css");
        
        loadjscssfile("/data/mdl/material.dark.min.css", "css");
        loadjscssfile("/data/css/popup-dark.css", "css");
    }
    else{
        removejscssfile("/data/css/popup-dark.css", "css");
        removejscssfile("/data/mdl/material.dark.min.css", "css");
        
        loadjscssfile("/data/mdl/material.red-orange.min.css", "css");
        loadjscssfile("/data/css/popup.css", "css");

    }
    isLight = !isLight;
    
    chrome.storage.sync.set({
        currentTheme:isLight?"day":"night"
    });
    $("#switch-1-lbl").html(isLight?chrome.i18n.getMessage("msg_1"):chrome.i18n.getMessage("msg_2"));
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

var isLight = true;
var Popup = (function(){
    // document.querySelector('.teaser').href = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`;

    chrome.storage.sync.get(null, function (items) {

        // if(items.currentTheme){
        //     isLight = items.currentTheme === "day";
        //     if(!isLight){
        //         setTimeout(function(){
        //             $("#mdl-switch-1")[0].MaterialSwitch.on();
        //             $("#switch-1").attr("checked", true).change();
        //         }, 200);                
        //         toggleLightDark();
        //     }
        //     $('#mdl-switch-1').change(function() {
        //         toggleLightDark();
        //     });            
        // }        
        
    });
    var link_input = $('#main-link');

    var changeSourceHandler = function(){
        var longUrl = $("#source-url").val();
        var qr_code = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&choe=UTF-8&chld=H&chl=';
        $.ajax({
            url: `https://tinyurl.com/create.php?noaff=true&url=${encodeURIComponent(longUrl)}`,
            type: 'GET',
            success: function (response) {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response, 'text/html');
                const copyinfo = htmlDocument.getElementById('copyinfo') || htmlDocument.getElementsByClassName('copyinfo')[0];
                const tinyUrl = copyinfo.getAttribute("data-clipboard-text");
                qr_code += tinyUrl;
                link_input.val(tinyUrl);
                $('.qu_code .qr_code_img').attr('src', qr_code);
                $('.qu_code .waiting').hide();
            }
        }).fail(function (response) {
            link_input.val(chrome.i18n.getMessage("msg_3"));
        });

    }

    
    var copyF = function (e) {
        debugger;
        let t = $(e.target.dataset.ctarget)[0];
        e.preventDefault();
        link_input.select();
        document.execCommand("copy");
        link_input.blur();
        t.classList.add('copied');
        setTimeout(function() { t.classList.remove('copied'); }, 1500);

    };
    $('#link-copy, #main-link').on('click', copyF);


    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var longUrl = tabs[0].url;
        //$("#source-url").val(longUrl).trigger("change");
        
        var interval = setInterval(function(){
            if($("#source-url")[0].parentElement.MaterialTextfield !== undefined){
                $("#source-url")[0].parentElement.MaterialTextfield.change(longUrl);
                changeSourceHandler();
                clearInterval(interval);
                $("#source-url").on('change input paste', function(){
                    $('#main-link').val('loading...');
                    $('.qu_code .qr_code_img').attr('src', "/data/assets/qr_code.png");
                    $('.qu_code .waiting').show();
    
                    setTimeout(_ => {
                        changeSourceHandler();
                    }, 200);
                    
                });
            }
          }, 200);        
    }); 

	

    var localization = new Localize();
    localization.init();
    localization.localizeHtmlPage();
})();

