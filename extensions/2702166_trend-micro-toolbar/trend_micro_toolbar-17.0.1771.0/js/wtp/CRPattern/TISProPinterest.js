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
                if (node.parentNode.childNodes &&
                    node.parentNode.childNodes.length >= 2) {
                    var spanE = node.previousSibling;
                    if (spanE && spanE.tagName == 'SPAN' &&
                        spanE.className == 'TSRSpan')
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

    var gRtNodes = new TrendMicro.TB.TBSet();
var gBeenSent = new TrendMicro.TB.TBSet();
function TSRParse() {
    var MatchRegex =
        new RegExp('^(https?://((www|jp)\.)?)?pinterest\.(com|jp)(?!/offsite)', 'i');
    if (!MatchRegex.test(document.location)) {
        //in IE, if click one outer-link in pinterest.com,
        //it will match the URL and rating the new unsupported website
        //But IE ATL Regex don't support (?!XXX) syntax,
        //so make it here to match.
        return [];
    }

    g_bIsNeedCheckSPan = true;
    var elems = [];
    TrendMicro.TB.Each(getPagePatterns(), function(pagePattern) {
            TrendMicro.TB.console.info('For each pattern');
            elems =
                elems.concat(TrendMicro.
                             TB.
                             FindTargetLinks(pagePattern.
                                             urlPathPattern,
                                             pagePattern.selector,
                                             pagePattern.options));
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
            CreateTSRResultObject(e, sURL);
        });
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
function getPagePatterns() {
    var pagePatterns = [];
        var options_ = {blacklist: ['(https?://((www|jp)\.)?)?pinterest\.(com|jp)',
                                 'javascript:',
                                 'mailto']};
    pagePatterns.push(new TrendMicro.TB.PagePattern('', 'body a', options_));

    return pagePatterns;
}


