var specificConstants = {
    "API": "https:\/\/ezyspeedtest.com\/apps\/",
    "domain": "ezyspeedtest.com",
    "searchComp": "https://search.yahoo.com/yhs/search?param1=89901&param2=89911&type=type7015493-spa-89901-89911&hspart=sz&hsimp=yhs-001&p="
};

function escapeHtml(text) {
    return text.replace(/[\"&'\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        }[a];
    });
}