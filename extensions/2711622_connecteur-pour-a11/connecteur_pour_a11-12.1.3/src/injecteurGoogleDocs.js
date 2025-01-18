(()=>{
    try{
        let fureteur = typeof browser == "object" ? browser : chrome;
        if (document.location.href.includes("docs.google.com/document") && !document.getElementById("antidote_script_gdocs")){
            let scriptGdocs = document.createElement("script");
            scriptGdocs.src = fureteur.runtime.getURL("/src/antidoteGoogleDocs.js");
            scriptGdocs.id = "antidote_script_gdocs";
            scriptGdocs.setAttribute("fetchpriority", "high");
            (document.head || document.documentElement).appendChild(scriptGdocs);    
        }
    } catch (ex){
        console.error("injecteurGoogleDocs.js", ex);
    }
})();