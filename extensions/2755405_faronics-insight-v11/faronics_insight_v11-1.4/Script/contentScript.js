let setBlockPage = (blockHTML) => {
    window.stop(),
    (document.documentElement.innerHTML = blockHTML);
}

let contentScript = () => {
    let obj = {};
    obj.URL = window.location.href;
    chrome.runtime.sendMessage(obj, function (response) {
        console.log( JSON.parse(`${JSON.stringify(response)}`));
        var result = JSON.parse(`${JSON.stringify(response)}`);

        if(result != undefined) {
            if(result.isSiteBlocked) {
                setBlockPage(result.blockHTML);
            }
            if(result.closeTab) {
                window.close();
            }
        }
    });
}

contentScript();