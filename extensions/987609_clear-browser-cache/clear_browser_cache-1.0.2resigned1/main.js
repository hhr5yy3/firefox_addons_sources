/*Url : https://addons.mozilla.org/en-US/firefox/addon/clear-browser-cache*/
/*All Cleared History*/
function onRemoved() {
    browser.notifications.create({
        'type':'basic',
        "title":"Success",
        "message":"Cache Clear"
    });
}
function onError() {
    alert('Something went wrong');
}
function clearAll() {
        browser.browsingData.removeCache({}).
then(onRemoved, onError);
}
/*On click icon*/
browser.browserAction.onClicked.addListener(() => {
    clearAll();
});
   
    
  
