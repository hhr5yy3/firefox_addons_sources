var specificConstants = {
    "domain": "easygamestab.com",
    "searchComp": "https://search.yahoo.com/yhs/search?param1=1474&param2=84518&type=type9049412-spa-1474-84518&hspart=mnet&hsimp=yhs-001&p=",
};

function escapeHtml(text) {
    text  = ""+(text||"");
    return text.replace(/[\"&'\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        }[a];
    });
}