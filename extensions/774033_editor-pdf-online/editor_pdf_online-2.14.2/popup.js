(async function(){

   
   var datax = { username: null,  offidocscloud: null };
    var username = "";
    var offidocscloud = "";
    const offidocs_key = "offidocs_key";
    
    let storageResult = await browser.storage.local.get([offidocs_key]);

    if (offidocs_key in storageResult) {
            datax = storageResult[offidocs_key]
    }
    
    if ( datax.username ) {
        username = datax.username;
    }
    else {
        username = "" + randomString(10) + "".toLowerCase();
        datax.username = username;
    }
    
    if ( datax.offidocscloud ) {
        offidocscloud = datax.offidocscloud;
    }
    else {
        offidocscloud = "1";
        datax.offidocscloud = "1";
    }
    
    var data = {};
    data[offidocs_key] = datax;
    await browser.storage.local.set(data);
    
    console.log(username);
    console.log(offidocscloud);  
    
    if ( offidocscloud == "1")  {
        document.getElementById("offidocscloud").checked = true;
    }
    else {
        document.getElementById("offidocscloud").checked = false;
    } 
       

        
    
    
    
    $("#fullscreen").click(function() {
        
            window.open("https://www.offidocs.com/public/?v=ext&pdfurl=0");
            return false;
    });
    
    
    $("#offidocscloud").click(async function() {
        console.log("check");
        if (document.getElementById('offidocscloud').checked) {
            datax.username = username;
            datax.offidocscloud = "1";    
            var data = {};
            data[offidocs_key] = datax;
            await browser.storage.local.set(data);
        }
        else {
            datax.username = username;
            datax.offidocscloud = "0";    
            var data = {};
            data[offidocs_key] = datax;
            await browser.storage.local.set(data);
        }
        return false;
    });
    
    

    
})();


function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString.toLowerCase();
}











