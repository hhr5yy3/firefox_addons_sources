
var specificConstants = {
    "API": "https:\/\/mapsassist.com\/apps\/",
    "domain": "mapsassist.com",
    "searchComp": "https://search.yahoo.com/yhs/search?param1=758&param2=84488&type=type9043493-spa-758-84488&hspart=mnet&hsimp=yhs-001&p="
 };
var folderURL = "https://mapsassist.com/mapsfinder";

function escapeHtml(text) {
    return text.replace(/[\"&'\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        }[a];
    });
}