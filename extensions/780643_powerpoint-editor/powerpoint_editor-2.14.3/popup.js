
(async function(){

    
    // https://www.offidocs.com/loleaflet/dist/loleaflet.html?file_path=file:///var/www/html/weboffice/mydata/8067857469/NewDocuments/6784668885.xlsx&username=8067857469&ext=yes
    
    var datax = { username: null,  offidocscloud: null };
    var username = "";
    var offidocscloud = "";
    const offidocs_key = "offidocs_key";
    
    let storageResult = await chrome.storage.local.get([offidocs_key]);

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
    await chrome.storage.local.set(data);
    
    console.log(username);
    console.log(offidocscloud);  
    
    if ( offidocscloud == "1")  {
        document.getElementById("offidocscloud").checked = true;
    }
    else {
        document.getElementById("offidocscloud").checked = false;
    } 
    
    
    
    
    $("#fullscreen").click(function() {
        window.open("https://www.offidocs.com/media/system/app/resetlool.php?username=" + username + "&urlpathx=/community/precreatee-ppt.php");
        return false;
    });
    
    
    
    $("#offidocscloud").click(async function() {
        console.log("check");
        if (document.getElementById('offidocscloud').checked) {
            datax.username = username;
            datax.offidocscloud = "1";    
            var data = {};
            data[offidocs_key] = datax;
            await chrome.storage.local.set(data);
        }
        else {
            datax.username = username;
            datax.offidocscloud = "0";    
            var data = {};
            data[offidocs_key] = datax;
            await chrome.storage.local.set(data);
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


