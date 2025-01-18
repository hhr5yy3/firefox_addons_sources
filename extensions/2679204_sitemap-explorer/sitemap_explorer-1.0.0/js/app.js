let xhr = new XMLHttpRequest();
let xmlxhr = new XMLHttpRequest();
let wait_on_status = 4;

function callback() {    
    if (this.readyState === wait_on_status) {
        
        let result_count = 0;
        
        if (this.status === 200) {
            
            result = this.responseText;
            
            if (result) {
                let pattern = /Sitemap:\s*(https?:\/\/[^\r\n]+)([\r\n]+|$)/gi;
                let matches;
                let memo = new Array();
                
                while (matches = pattern.exec(result)) {
                    if ($.inArray(matches[1],memo)===-1)
                    {
                        memo.push(matches[1]);
                        
                        let a = document.createElement("a");
                            a.href = matches[1];
                        
                        let file_uri = $("<div/>").addClass("file").addClass("file_uri");
                            file_uri.text( a.pathname );
                    
                        $("#results").append(file_uri);
                    
                        let file_copy = $("<div/>").addClass("file");
                            file_copy.append("<img src='images/copy.svg' width='16' height='16' alt='copy' /> "+window.browser.i18n.getMessage("app_copy"));
                            file_copy.attr("data-copy",a.href);
                        
                        $("#results").append(file_copy);
                    
                        let file_view = $("<div/>").addClass("file");
                            file_view.append("<img src='images/view.svg' width='16' height='16' alt='view' /> "+window.browser.i18n.getMessage("app_view"));
                            file_view.attr("data-open",a.href);
                        
                        $("#results").append(file_view);
                        
                        result_count++;
                    }
                }
            }
        }
        
        document.getElementById("initial_message").style.display = "none";
        
        if (result_count) {
            document.getElementById("file_declared").style.display = "block";
            document.getElementById("file_not_declared").style.display = "none";
        }
        else {
            document.getElementById("file_not_declared").style.display = "block";
            document.getElementById("file_declared").style.display = "none";
        }
        
        $("#initial_message").hide();
        $(".dropdown").show();
    }
};

let extension_tab = false;

if(window.browser.tabs !== undefined)
{
    window.browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //.getSelected(null,function(tab) {
        let url = tabs[0].url;
	
	if(url.indexOf("extension:") !== -1 && url.indexOf("?url=") !== -1)
	{
            url = decodeURI(url.substring(url.indexOf("?url=") + 5));
            extension_tab = true;
        }
	
        let a = document.createElement("a");
            a.href = url;
            
        if(a.protocol === 'http:' || a.protocol === 'https:')
        {	
		let host_elements = document.querySelectorAll("[data-currhostname]");
    
		for (var i in host_elements) if (host_elements.hasOwnProperty(i)) {
			host_elements[i].innerText = a.hostname;
		}
    
		let url_elements = document.querySelectorAll("[data-addcurrhostname]");
    
		for (var i in url_elements) if (url_elements.hasOwnProperty(i)) {
			url_elements[i].href = url_elements[i].href.replace('{hostname}',encodeURI(a.protocol+"//"+a.hostname));
		}
    
		let request_robots = a.protocol+"//"+a.hostname+"/robots.txt";
    
		xhr.onreadystatechange = callback;
		wait_on_status = xhr.DONE;
		xhr.open("GET", request_robots, true);
		xhr.send();
	}
    });
}

function localizeHtmlPage()
{
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName("html");
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? window.browser.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}

localizeHtmlPage();

let export_filename;

function viewsitemap(url) {        
        
    window.browser.tabs.create({
	url: window.browser.runtime.getURL("grid.html?url="+encodeURI(url))
    });
    
    window.close();
}

$(document).ready(function() {
    
    $("#myDropdown a").each(function(n,elem){
        var url = $(elem).attr("href");
        $(elem).attr("href",url.replace("{browser}",browser_name));
    });

    $(".dropbtn").on("click",function(){
        document.getElementById("myDropdown").classList.toggle("show");
    });
    
    $("body").on("click",function(event) {
        if (!event.target.matches(".dropbtn")) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show");
                }
            }
        }
    });
    
    $.fn.selectText = function(){
		var doc = document;
		var element = this[0];
		if (doc.body.createTextRange) {
			var range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			var selection = window.getSelection();        
			var range = document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);
		}
		document.execCommand("copy");
    };
    
    $("body").on("click","[data-copy]",function() {
        let focusedElement = $("<div />").css({"width":"5px","height":"1px","position":"absolute","z-index":"-1","left":"50%","bottom":"15px","overflow":"hidden"}).text( $(this).data("copy") );
            focusedElement.appendTo("body");
            focusedElement.selectText();
    });
    
    $("body").on("click","[data-open]",function() {
        let url = $(this).data("open");
        viewsitemap(url);
    });
});

$("[data-addcurrhostname]").on("click",function(){
    var href = $(this).attr("href");
    if (browser_locale == "ru") {
        href = href.replace("mysitemapgenerator.com/","mysitemapgenerator.com/ru/");
    }
    $(this).attr( "href", href.replace("{hostname}","") );
});