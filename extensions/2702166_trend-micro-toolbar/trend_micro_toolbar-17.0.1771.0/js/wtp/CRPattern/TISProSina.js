TSRTagFlowID();
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
    g_bIsNeedCheckSPan = true;
    var elems = [];
    TrendMicro.TB.Each(getPagePatterns(), function(pagePattern) {
            TrendMicro.TB.console.info('For each pattern');
            elems = elems.concat(TrendMicro.
                                 TB.
                                 FindTargetLinks(
                                                 pagePattern.
                                                 urlPathPattern,
                                                 pagePattern.selector,
                                                 pagePattern.options));
        });
    // filter sended nodes
    // filter special nodes, such as node
    // which's pattern is matched by pattern.
    TrendMicro.TB.console.info('elems.length=' + elems.length);
    //clear resulted node
    TrendMicro.TB.ClearResultedNode();
    // create wrapper of element
    var oldLength = g_oEnv.Parser.iResultNumber;
    TrendMicro.TB.console.info('elems1=' + elems.length);
    TrendMicro.TB.Each(elems, function(e) {
            if (e.className &&
               (e.className == 'app_name' ||
                e.className == 'app_pic_bg' ||
                e.className == 'ipad_dbtn_1' ||
                e.className == 'iphone_dbtn_1' ||
                e.className == 'wdPhone_dbtn_5'))
                return;
            var sURL = e.href;
            CreateTSRResultObject(e, sURL, null, null, function(n) {
                    var iconE = new TMDOMObj(n.previousSibling);
                    iconE.style.setFloat('none');
                });
        });
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}

function getPagePatterns() {
 var pagePatterns = [];
 var options_ = {blacklist: ['(https?://)?weibo\.com',
        '(https?://)?.*sina((\.com)|(\.cn))',
        'https?://.*sinaimg.cn',
        'javascript',
        'mailto',
        'javascipt']};
 pagePatterns.push(new TrendMicro.TB.PagePattern('',
                                                 'body a',
                                                 options_));


 return pagePatterns;
}


