chrome.permissions.contains({
    origins: ['*://*.aliexpress.us/*']
}, (result) => {
    console.log(result)
    if (result) {
        // The extension has the permissions.
        $('#checkPermissionBtn').hide();
    } else {
        // The extension doesn't have the permissions.
        return;
    }
});
  
const checkPermissionForUSDomain = () => {
    chrome.permissions.request({
        origins: ['*://*.aliexpress.us/*'],
    }, (granted) => {
        if (granted) {
            return;
        } else {
            alert("Warning: AliBill won't work on aliexpress.us domain if you don't grant permission.");
            return;
        }
    });
};

$('#checkPermissionBtn').click(checkPermissionForUSDomain);