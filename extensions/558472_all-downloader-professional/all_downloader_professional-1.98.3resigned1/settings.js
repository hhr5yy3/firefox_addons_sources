
    
var textDE = [];
var textEN = [];
textDE['langkey_Caption'] = "All Downloader Professional - Einstellungen";
textDE['langkey_close'] = "Schlieﬂen";
textDE['langkey_lang'] = "Sprache w‰hlen:";
textDE['langkey_de'] = "Deutsch";
textDE['langkey_en'] = "Englisch";
textDE['langkey_general'] = "Allgemeine Einstellungen";
textEN['langkey_Caption'] = "All Downloader Professional - Settings";
textEN['langkey_close'] = "Close";
textEN['langkey_lang'] = "Select language:";
textEN['langkey_de'] = "Deutsch";
textEN['langkey_en'] = "Englisch";
textEN['langkey_general'] = "General settings";


var link64 =
{
    settings:false,
    curlang:"en",
       
    init:function()
    {
        link64.SetLanguage();
        
        
        var o = document.getElementById( "idSelectLang");
        o.value = link64.curlang;
        o.addEventListener( "change", function(response) { 
            link64.curlang = this.value;
            localStorage.setItem("lang", link64.curlang);
        },false); 
         
        var o = document.getElementById( "idOk");
        if ( o)
            o.addEventListener( "click", function(ev) 
            {
                window.close();
            },false);
    },
    SetLanguage:function()
    {       
        link64.curlang = localStorage.getItem("lang");
        if ( !link64.curlang)
            link64.curlang="en";

        if ( link64.curlang=="de")
            t = textDE;
        else
            t = textEN;
            
        for ( i in t)
        {
            if ( i.indexOf("langkey_")==0)
            {
                var o = document.getElementById( i);
                if ( o)
                    o.textContent = t[i];
            }
        }
        
    }
}

window.addEventListener("load", function()
{
    link64.settings = {};
    link64.init();
    
}, false);

