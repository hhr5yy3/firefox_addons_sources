TSRTagFlowID();
/*!
 @brief
 @param urlPathPattern :
 @param selector :
 @param options {isRated:function(node){}  return true if node is rated
     ,}
*/
TrendMicro.TB.PagePattern = function(urlPathPattern, selector, options) {
    var options_ = {
        isRated: function(node) {
            var _isRated = false;
            if (node && node.parentNode) {
                if (node.parentNode.childNodes && node.parentNode.childNodes.length >= 2) {
                    var spanE = node.previousSibling;
                    if (spanE && spanE.tagName == 'SPAN' && spanE.className == 'TSRSpan'){
                        _isRated = true;
                    }
                }
            }
        }
    };
    
    if (options) TrendMicro.TB.extend(options_, options);
    this.urlPathPattern = urlPathPattern;
    this.selector = selector;
    this.options = options_;
};

var gRtNodes = new TrendMicro.TB.TBSet();
var gBeenSent = new TrendMicro.TB.TBSet();
function TSRParse() {
    g_bIsNeedCheckSPan = true;
    var elems = [];
    TrendMicro.TB.Each(getPagePatterns(), function(pagePattern) {
        TrendMicro.TB.console.info('For each pattern');
        elems = elems.concat(TrendMicro.TB.FindTargetLinks(
        pagePattern.urlPathPattern, pagePattern.selector, pagePattern.options));
    });
    // filter sended nodes
    // filter special nodes, such as node which's pattern is matched by pattern.
    TrendMicro.TB.console.info('elems.length=' + elems.length);
    //clear resulted node
    TrendMicro.TB.ClearResultedNode();
    // create wrapper of element
    var oldLength = g_oEnv.Parser.iResultNumber;
    TrendMicro.TB.console.info('elems1=' + elems.length);
    TrendMicro.TB.Each(elems, function(e) {
        var sURL = e.href;
        if (e.className && e.className == 'button submit cancel') {
            return;
        }
        var parent = e.parentNode;
        if (parent){
            if (parent.attributes['contenteditable'] && parent.attributes['contenteditable'].value == 'true'){
                return;
            }
            parent = parent.parentNode;
            if (parent.attributes['contenteditable'] && parent.attributes['contenteditable'].value == 'true'){
                return;
            }
        }
        CreateTSRResultObject(e, sURL);
    });

    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}

function getPagePatterns() {
    var pagePatterns = [];
    var options_ = {blacklist: ['https?:\/\/(.*\.)?twitter\.com',
        'https?:\/\/(.*\.)?twimg\.com',
        'https?:\/\/(.*\.)?twimg[0-9a-z\-]*\.akamaihd.net',
        'https?:\/\/(.*)\.jpg',
        'javascript',
        'twitter\.jp',
        '\/#',
        '#',
        'mailto',
        'http://translate.twttr.com',
        'http://pinterest.com/',
        '^res://ieframe.dll/'
    ]};
    pagePatterns.push(new TrendMicro.TB.PagePattern('', 'body a', options_));

    return pagePatterns;
}
