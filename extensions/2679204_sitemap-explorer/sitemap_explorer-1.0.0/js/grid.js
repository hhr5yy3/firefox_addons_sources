let xmlxhr = new XMLHttpRequest();
let wait_on_status = 4;

let url = decodeURI(window.location.search.slice(5));
let export_filename = url.replace(/^.*\/|\.[^.]*$/g, '');

window.document.getElementsByTagName("title")[0].innerText = url + " - " + window.document.getElementsByTagName("title")[0].innerText;

function exportToCSV(document,filename) {
    
    var unread_blocks = document.querySelectorAll("span");
    
    for(var i = 0; i < unread_blocks.length; i++) {
        unread_blocks[i].remove();
    }
    
    var csv = [];    
    var rows = document.querySelectorAll("div.section");
    csv.push('"url";"lastmod";"priority";');
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("div");	
        for (var j = 0; j < cols.length; j++) {
            row.push('"'+cols[j].innerText+'"');
        }
        csv.push( row.join(";") );
    }
    downloadCSV( csv.join("\r\n"), filename );
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

	if (window.Blob == undefined || window.URL == undefined || window.URL.createObjectURL == undefined) {
		alert("Your browser doesn't support export");
		return;
	}
	
    csvFile = new Blob([csv], {type:"text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function get_ext(url) {
    return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).split('#')[0].substr(url.lastIndexOf("."))
}

function viewsitemap(url) {
	window.browser.tabs.query({ active: true }, function(tabs) {
            window.browser.tabs.update( tabs[0].id, { url: window.browser.runtime.getURL("grid.html?url="+encodeURI(url)) } ); 
        });
}

let bodyobj;

window.addEventListener("load", function (e) {
    
    bodyobj = window.document.getElementsByTagName("BODY")[0];
    
    setTimeout(function(){
        
        xmlxhr.open("GET",url,true);            
        xmlxhr.overrideMimeType("text/plain"); //text/xml
        wait_on_status = xmlxhr.DONE;            
    
        xmlxhr.onreadystatechange = function () {
            if (xmlxhr.readyState === wait_on_status) {                
                if (xmlxhr.status === 200) {
                    
                    let xmlDoc = window.document.createElement("section");
                        xmlDoc.innerHTML = xmlxhr.responseText;
                    
                    let active_ref = false;
                    
                    if (!xmlDoc.innerHTML) {
                        bodyobj.innerHTML += "<div class='header_push'> </div><div id='visualselector-overflow'><img src='images/error.svg' width='254' height='254' alt='loading' /><br/><img src='images/failure.png' width='32' height='32' alt='err' /></p><p class='o_center t_header'>Document parse error</p></div>";
                        window.document.getElementById("visualselector-overflow").style.display="none";
                        return;
                    }                    
                    else {
			var parse_err;
			var err_msg = "";
			
                        var domParser = new DOMParser();
                        try {
			    var dom = domParser.parseFromString(xmlxhr.responseText, "text/xml");
			}
			catch (e) {
			    parse_err = 1;
			    err_msg = e.name + ': ' + e.message;
			}
			
			if(dom.getElementsByTagName("parsererror")[0] !== undefined)
			{
			    parse_err = 1;
			    
			    if(dom.getElementsByTagName("parsererror")[0].textContent !== null)
				err_msg = dom.getElementsByTagName("parsererror")[0].textContent.replace(/Location:\s[^\s]+\s/i," ").replace(":",":<br/>");
			}
			
                        
                        if (parse_err) {
			    
                            bodyobj.innerHTML += "<div class='header_push'> </div><div id='visualselector-overflow'><img src='images/error.svg' width='254' height='254' alt='loading' /><br/><img src='images/failure.png' width='32' height='32' alt='err' /></p><p class='o_center t_header'>Document parse error</p><p class='o_center'>"+err_msg+"</p></div>";
                            window.document.getElementById("visualselector-overflow").style.display="none";
                            
                            var stop_fetching = 1;
                        }

                        if  (stop_fetching === undefined) {
                            let header_contaner = window.document.createElement("div");
                                header_contaner.className = "header";
                            
                            let header_push = window.document.createElement("div");
                                header_push.className = "header_push";
				header_push.innerHTML = "";
                                bodyobj.appendChild(header_push);
                            
                            let export_to_csv = window.document.createElement("div");
                                export_to_csv.className = "file";
                                export_to_csv.id = "export_to_csv";
                                export_to_csv.innerHTML = "<img src='images/download.svg' width='16' height='16' alt='csv' /> "+window.browser.i18n.getMessage("app_export_as_csv");                            
                                export_to_csv.onclick = function(){ exportToCSV( window.document, export_filename+".csv" ); };
                        
                            header_contaner.appendChild(export_to_csv);

                            bodyobj.append(header_contaner);
                        }
                    }
                    
                    let testrootelem;
                    testrootelem = xmlDoc.getElementsByTagName("urlset");
                    if(!testrootelem.length) testrootelem = xmlDoc.getElementsByTagName("sitemapindex");
                    if(!testrootelem.length) testrootelem = xmlDoc.getElementsByTagName("feed"); //atom
                    
                    if (!testrootelem.length && stop_fetching === undefined) {
                        bodyobj.innerHTML += "<div class='header_push'> </div><div id='visualselector-overflow'><img src='images/error.svg' width='254' height='254' alt='loading' /><br/><img src='images/failure.png' width='32' height='32' alt='err' /></p><p class='o_center t_header'>The Root Element is missing</div>";
                        window.document.getElementById("visualselector-overflow").style.display="none";
                    }
                    
                    let document_type = "xml";
                    let nodes = xmlDoc.getElementsByTagName("url");
                    
                    if (!nodes.length) {
                        nodes = xmlDoc.getElementsByTagName("sitemap");
                        document_type = "index";
                        active_ref = true;
                    }
                    
                    if (!nodes.length) {
                        document_type = "atom";
                        nodes = xmlDoc.getElementsByTagName("entry");
                    }
                    
                    if (nodes.length <=0 && stop_fetching === undefined) {
                        bodyobj.innerHTML += "<div class='header_push'> </div><div id='visualselector-overflow'><img src='images/error.svg' width='254' height='254' alt='loading' /><br/><img src='images/failure.png' width='32' height='32' alt='err' /></p><p class='o_center t_header'>Document is empty</p></div>";
                        window.document.getElementById("visualselector-overflow").style.display="none";
                    }
                    
                    for (var i = 0; i < nodes.length; i++) {
                        
                        let loc;                        
                        let lastmod = "";
                        let priority = "";
                        let images = "";
                        let languages = "";
                        
                        /* xml */
                        if (nodes[i].getElementsByTagName("loc")[0] !== undefined) {
                            loc = nodes[i].getElementsByTagName("loc")[0].textContent;
                        }
                        
                        /* atom */
                        if (document_type == "atom" && nodes[i].getElementsByTagName("link")[0] !== undefined) {
                            loc = nodes[i].getElementsByTagName("link")[0].attributes["href"].value;
                        }
                        
                        if(!loc) continue;
                        
                        if (nodes[i].getElementsByTagName("lastmod")[0] !== undefined) {
                            lastmod = nodes[i].getElementsByTagName("lastmod")[0].textContent;
                        }
                        
                        if (document_type == "atom" && nodes[i].getElementsByTagName("updated")[0] !== undefined) {
                            lastmod = nodes[i].getElementsByTagName("updated")[0].textContent;
                        }
                        
                        if (nodes[i].getElementsByTagName("priority")[0] !== undefined) {
                            priority = nodes[i].getElementsByTagName("priority")[0].textContent;
                        }
                        
                        if (nodes[i].getElementsByTagName("image:loc")[0] !== undefined) {
                            images = " &hellip;<img src='images/images.png' title='"+window.browser.i18n.getMessage("app_images")+"' /> "+nodes[i].getElementsByTagName("image:loc").length+"+";
                        }
                        
                        if (nodes[i].getElementsByTagName("xhtml:link")[0] !== undefined) {
                            languages = " &hellip;<img src='images/languages.png' title='"+window.browser.i18n.getMessage("app_alternate_languages")+"' /> "+nodes[i].getElementsByTagName("xhtml:link").length+"+";
                        }
                        
                        let lastmod_res = '';
                        let priority_res = '';
                        
                        if (lastmod) {
                            lastmod_res = lastmod.replace(/^([^T]+)(T.*)?$/,'$1<font>$2</font>');
                        }
                        
                        if (priority) {
                            
                            priority = Math.floor(nodes[i].getElementsByTagName("priority")[0].textContent*10);
                            
                            for (var k = 0; k < 10; k++) {
                                if (k<=priority)
                                    priority_res += "<span class='weightbar'></span>";
                                else
                                    priority_res += "<span class='weightbar unactive'></span>";
                            }
                        }
                        
                        var section_line = $("<div class='section'><div><a href='"+loc+"' target='_blank' "+((active_ref && get_ext(loc)!==".gz") ? "href='#' data-open='"+loc+"'" : "")+">"+loc+"</a><span>" + images + languages + "</span></div><div class='o_center'>"+lastmod_res+"</div><div class='o_right'>"+priority_res+"</div></div>");
                        bodyobj.append(section_line.get(0));
                        
                        //alert( section_line.html() );
                    }
                }
                else {
                    bodyobj.innerHTML += "<div class='header_push'> &nbsp; </div><p class='o_center'><img src='images/error.svg' width='254' height='254' alt='loading' /><br/><img src='images/failure.png' width='32' height='32' alt='err' /></p>";
                    bodyobj.innerHTML += "<p class='o_center t_header'>This site URL can't be reached</p>";
                    bodyobj.innerHTML += "<p class='o_center'>Response status code: "+xmlxhr.status+"</p>";
                }
                
                window.document.getElementById("visualselector-overflow").style.display="none";
                
                let openrefs = window.document.querySelectorAll("[data-open]");
                openrefs.forEach(function(element, index) {
                    element.onclick = function() {
                        viewsitemap(element.href);
                        return false;
                    };
                });
            }
        }
        
        xmlxhr.send();
    });
},500);
