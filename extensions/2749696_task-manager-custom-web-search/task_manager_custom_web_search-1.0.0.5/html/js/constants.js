var specificConstants = {
    "API": "https:\/\/taskmanagertab.com\/apps\/",
    "pythonApi": "https:\/\/taskmanagertab.com\/py\/",
    "domain": "taskmanagertab.com",
    "searchComp": "https://search.yahoo.com/yhs/search?param1=89667&param2=89712&type=type7061095-spa-89667-89712&hspart=sz&hsimp=yhs-001&p="
};

var faviconUrl =
    'https://taskmanagertab.com/utility/images/ff_tmt.png';

function escapeHtml(text) {
    text  = ""+(text||"");
    return text.replace(/[\"&'\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;',  '<': '&lt;',  '>': '&gt;'
        }[a];
    });
}