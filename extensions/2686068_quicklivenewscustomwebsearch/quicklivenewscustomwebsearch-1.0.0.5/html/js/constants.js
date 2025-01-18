var specificConstants = {
    "searchComp": "https://search.yahoo.com/yhs/search?param1=892&param2=84516&type=type9040536-spa-892-84516&hspart=mnet&hsimp=yhs-001&p=",
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

