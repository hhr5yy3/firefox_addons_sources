var extensionBrowser = chrome || browser;

$('#saveWhileListButton').click(function () {
    this.blur();

    localStorage.whiteList = document.querySelector('#whiteListEntry').value.split(',');

    onProxy();

    // var notification = new Notification(extensionBrowser.i18n.getMessage("notification_3"), {
    //     body: extensionBrowser.i18n.getMessage("notification_hit"),
    //     dir: 'auto',
    //     icon: 'icon.png'
    // });
});

document.querySelector('#whiteListEntry').value = localStorage.whiteList;

$(document).ready(function() {
    updateLocalization();
});
