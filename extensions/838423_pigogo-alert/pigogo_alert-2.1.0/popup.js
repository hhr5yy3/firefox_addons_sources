var allMerchants;
var topMerchants;
var topSavings;

chrome.runtime.sendMessage({message: 'getAllMerchants'}).then( function (res) {
    allMerchants = res;
});

chrome.runtime.sendMessage({message: 'getTopMerchants'}).then( function (res) {
    topMerchants = res;
});

chrome.runtime.sendMessage({message: 'getTopSavings'}).then( function (res) {
    topSavings = res;
    console.log('getTopSavings', topSavings);
});
