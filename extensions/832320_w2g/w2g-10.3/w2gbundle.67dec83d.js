var $288fb5c4d3e18994$exports = {};
const $288fb5c4d3e18994$var$button = document.querySelector("#g-button");
const $288fb5c4d3e18994$var$allgood = document.querySelector("#allgood");
chrome.permissions.contains({
    origins: [
        "<all_urls>"
    ]
}, (result)=>{
    $288fb5c4d3e18994$var$set(result);
});
$288fb5c4d3e18994$var$button.addEventListener("click", function() {
    chrome.permissions.request({
        origins: [
            "<all_urls>"
        ]
    }, (result)=>{
        $288fb5c4d3e18994$var$set(result);
    });
});
function $288fb5c4d3e18994$var$set(v) {
    if (v) {
        $288fb5c4d3e18994$var$button.style.display = "none";
        $288fb5c4d3e18994$var$allgood.style.display = "block";
    } else {
        $288fb5c4d3e18994$var$button.style.display = "block";
        $288fb5c4d3e18994$var$allgood.style.display = "none";
    }
}


