var reportButton=document.getElementById("notauthentified");
reportButton.onclick=function(event) {
    event.preventDefault();
    event.cancelBubble=true;
    verifrom.message.toBackground({action:"openOptions"},{channel:"openOptions"});
    setTimeout(function(){
        if (!verifrom.appInfo.safari)
            window.close();
        else safari.extension.toolbarItems[0].popover.hide();
    },1000);
}