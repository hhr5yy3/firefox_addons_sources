(function () {
var $8478858002094f87$exports = {};
const $8478858002094f87$var$button = document.querySelector("#g-button");
const $8478858002094f87$var$allgood = document.querySelector("#allgood");
chrome.permissions.contains({
    origins: [
        "<all_urls>"
    ]
}, (result)=>{
    $8478858002094f87$var$set(result);
});
$8478858002094f87$var$button.addEventListener("click", function() {
    chrome.permissions.request({
        origins: [
            "<all_urls>"
        ]
    }, (result)=>{
        $8478858002094f87$var$set(result);
    });
});
function $8478858002094f87$var$set(v) {
    if (v) {
        $8478858002094f87$var$button.style.display = "none";
        $8478858002094f87$var$allgood.style.display = "block";
    } else {
        $8478858002094f87$var$button.style.display = "block";
        $8478858002094f87$var$allgood.style.display = "none";
    }
}

})();
