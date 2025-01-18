TSRTagFlowID();

/*
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
       if (spanE && spanE.tagName == 'SPAN' && spanE.className == 'TSRSpan')
     {
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

function TSRParse() {
    // do not parse if window is not top window
    if (window.top != window) {
        return;
    }
    g_bIsNeedCheckSPan = true;
    var elems = [];
    TrendMicro.TB.Each(getPagePatterns(), function(pagePattern) {
            elems =
                elems.concat(TrendMicro.
                             TB.
                             FindTargetLinks(
                                             pagePattern.urlPathPattern,
                                             pagePattern.selector,
                                             pagePattern.options));
        });
    // filter sended nodes
    // filter special nodes, such as node which's pattern is matched by pattern.
    //clear resulted node
    TrendMicro.TB.ClearResultedNode();
    // create wrapper of element
    var oldLength = g_oEnv.Parser.iResultNumber;
    TrendMicro.TB.Each(elems, function(e) {
            var sURL = e.href;
            if (e.parentNode &&
                e.parentNode.tagName &&
                e.parentNode.className &&
                e.parentNode.tagName.toUpperCase() == 'LI' &&
                (e.parentNode.className.toUpperCase() == 'GBT' ||
                 e.parentNode.className.toUpperCase() == 'GBMTC')) {
                return;
            }
            CreateTSRResultObject(e, sURL);
    });
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
function getPagePatterns() {
 var pagePatterns = [];
 var options_ = {blacklist: ['https?://(.*)\\.google\\.',
        'mailto',
        'javascript']};
 pagePatterns.push(new TrendMicro.TB.PagePattern('',
                                                 'body a',
                                                 options_));
 return pagePatterns;
}


