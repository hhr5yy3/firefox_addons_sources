(function(){
    var exports = window;

    /*
     * Product Feature Configuration Area
     */
    var TitaniumFeatureConfig = {
        EnableUntestedFeedbackFeature: true,
        EnableFacebookAlertYourFriend: true,
        EnableSafeSearching: true
    };

    function updateFeatureConfig(featureConfig)
    {
        if (typeof (featureConfig) != 'undefined') {
            if (typeof (featureConfig.EnableUntestedFeedbackFeature) != 'undefined') {
                TitaniumFeatureConfig.EnableUntestedFeedbackFeature = featureConfig.EnableUntestedFeedbackFeature;
            }
            if (typeof (featureConfig.EnableFacebookAlertYourFriend) != 'undefined') {
                TitaniumFeatureConfig.EnableFacebookAlertYourFriend = featureConfig.EnableFacebookAlertYourFriend;
            }
            if (typeof (featureConfig.EnableSafeSearching) != 'undefined') {
                TitaniumFeatureConfig.EnableSafeSearching = featureConfig.EnableSafeSearching;
            }

            logInfo('updateFeatureConfig: TitaniumFeatureConfig = ' + JSON.stringify(TitaniumFeatureConfig));
        }
    }
    exports.TSRUpdateFeatureConfig = updateFeatureConfig;

    
    /*
     * Configuration Area
     */
    
    var C_TSRToolTipOffsetX = 7;
    var C_TSRToolTipOffsetY = -3;
    
    var C_TSRToolTipOverlapX = 0;
    var C_TSRToolTipOverlapY = 40;
    
    var C_TSRTotalToolTipWidthArea = g_oImgDefine.ImgSize.PopupBodySize.width + g_oImgDefine.ImgSize.Tail.width - C_TSRToolTipOverlapX;
    var C_TSRTotalToolTipHeightArea = g_oImgDefine.ImgSize.PopupBodySize.height + g_oImgDefine.ImgSize.Tail.height - C_TSRToolTipOverlapY;

    var tooltiptopArea = 0;
    
    /*
     * Define global variable object
     */
    var g_oEnv = {
        // Judge which browser been used by user
        Browser: {
            isIE: false,
            isFF: false,
            oBHOActiveX: null
        },
        Parser: {
            iResultNumber: 0,
            iRatingNumber: 0,
            rgobjSearchResult: [],
            iParserFlowID: 1
        },
        Tooltip: {
            isToolTipMove: false,
            iTSRTimerID: null,
            posTooltip: {
                posX: 0,
                posY: 0
            }
        },
        UMSTooltip: {
            iUMSHideTimerID: null,
            iUMSShowTimerID: null
        },
        BaseResourceUrl: ''
    };
    exports.g_oEnv = g_oEnv;
    
    /*
     * Configuration variable using for Browser plugin
     */
    var g_currentBrowser = '';
    var g_bisMouseOverShowToolTip = false;
    var g_bisHighLight = true;
    var g_bisHowTurnOffHighLightLink = '';
    var g_iTSRToolTipTimeout = 300;
    exports.g_iUMSToolTipTimeout = 1000;
    var g_bEnableImageSafeSearch = false;
    
    //fix Google Firefox re-icon issue;
    var g_bIsNeedCheckSPan = true;
    
    //Firefox 3.6.x don't show Alert Your Friend Feature
    var g_bIsFirefoxLargerThan3_6_x = true;
    exports.g_bIsFirefoxLargerThan3_6_x = g_bIsFirefoxLargerThan3_6_x;

    function TSRIsImageSafeSearchEnabled() {
        return g_bEnableImageSafeSearch;
    }

    function TSREnableImageSafeSearch(enable) {
        g_bEnableImageSafeSearch = enable;
    }

    exports.TSREnableImageSafeSearch = TSREnableImageSafeSearch;
    exports.TSRIsImageSafeSearchEnabled = TSRIsImageSafeSearchEnabled;
    
    /*
     * =========================
     * Browser Compatible Object
     * =========================
     */
    var TMDOMObj = function(objDom) {
        if (document.all) {
            this.isIE = true;
            this.style.isIE = true;
        }
        this.objDom = objDom;
        this.style.objDom = objDom;
    };
    
    TMDOMObj.prototype.innerText = function(){
        return this.objDom.innerText || this.objDom.textContent || '';
    };
    
    TMDOMObj.prototype.getAttribute = function(strAttKey){
        var objNodeSpecAtt = null;
        if (this.isIE){
            if (this.objDom.attributes[strAttKey]){
                objNodeSpecAtt = this.objDom.attributes[strAttKey].value;
            }
        } else {
            objNodeSpecAtt = this.objDom.getAttribute(strAttKey);
        }
        return objNodeSpecAtt;
    };
    
    TMDOMObj.prototype.style = {
        setFloat: function(strValue) {
            if (this.isIE) {
                this.objDom.style.styleFloat = strValue;
            } else {
                this.objDom.style.cssFloat = strValue;
            }
        },
        setMargin: function(strValue) {
            this.objDom.style.margin = strValue;
        }
    };
    exports.TMDOMObj = TMDOMObj;
    
    function TMDOMEvent(objEvent) {
        if (document.all) {
            this.isIE = true;
        }
        this.objEvent = objEvent;
    }
    
    TMDOMEvent.prototype.target = function() {
        return this.objEvent.srcElement || this.objEvent.target;
    };
    
    TMDOMEvent.prototype.LeftButton = function() {
        var bIsLeft = false;
        if (this.isIE) {
            bIsLeft = (1 === this.objEvent.button);
        } else {
            bIsLeft = (0 === this.objEvent.button);
        }
        return bIsLeft;
    };
    
    function TSRHideToolTip() {
        /*
         * Hide ToolTip
         */
        var divToolTip = document.getElementById(D_TSRToolTipID);
    
        if (divToolTip) {
            //divToolTip.className = D_TSRToolTipHideClass;
            divToolTip.style.top = '-100000px';
            divToolTip.style.left = '-100000px';
        }
    }
    
    function TSRClearParseObjs() {
        var objParser = g_oEnv.Parser;
        /*
         * Hide tooltip
         */
        TSRHideToolTip();
        objParser.iResultNumber = 0;
        objParser.iRatingNumber = 0;
        objParser.rgobjSearchResult.length = 1;
    }
    
    function TSRappendAttribute(strKey, strValue) {
        var objAtt = {};
    
        objAtt.key = strKey;
        objAtt.value = strValue;
        this.attributes.push(objAtt);
    
        return objAtt;
    }
        
    function TSRcompareAttributes(objNode) {
        if (!objNode) {
            return false;
        }
    
        if (0 === this.attributes.length) {
            return true;
        }
    
        var objTMDom = new TMDOMObj(objNode);
        var iMatchCount = 0;
        for (var iAttCount = 0; iAttCount < this.attributes.length; iAttCount++) {
            var objAtt = this.attributes[iAttCount];
            var objNodeSpecAtt = objTMDom.getAttribute(objAtt.key);
    
            if (objNodeSpecAtt && objAtt.value) {
                var regexAttValue = new RegExp(objAtt.value, '');
                if (regexAttValue.test(objNodeSpecAtt)) {
                    iMatchCount++;
                }
            } else if ((!objNodeSpecAtt || objNodeSpecAtt == 'null') && !objAtt.value) {
                iMatchCount++;
            } else {
                break;
            }
        }
    
        return (iMatchCount === this.attributes.length) ? true : false;
    }

    /*
     * Create a TSR located object
     * objDOMRoot           the root node of the tree which is searched
     * objTSRLocatedChild   the child LocatedObject for current Node
     * strTagName           the TagName of the specified tag
     * strObjID             the ID of the specified tag
     */
    function CreateTSRLocatedObject(objDOMRoot, objTSRLocatedChild, strTagName, strObjID) {
        //Member variables for location dom object
        if (strTagName) {
            //TagName of the specified dobj
            this.tagName = strTagName.toUpperCase();
        }
    
        //ID of the specified dobj
        this.tagID = strObjID;
    
        //indexSource of parent.getElementsByTagName
        this.indexSource = -1;
    
        //Attributes array of the specified dobj
        this.attributes = [];
    
        this.tagIDregexFirst = false;
        this.multiMatches = (objTSRLocatedChild) ? false : true;
    
        this.rootElement = objDOMRoot;
        this.childLocated = objTSRLocatedChild;
    }
    exports.CreateTSRLocatedObject = CreateTSRLocatedObject;
    
    function TSRFilterInvalidNode(nodes) {
        if (!nodes || !nodes.length) {
            return [];
        }
        var newNodes = [];
        var len = nodes.length;
        for (var i = 0; i < len; ++i) {
            var n = nodes[i];
            if ('href' in n) {
                try {
                    var href = TSTrim(n.href);
                    // omit the NULL href node
                    if (href !== '') {
                        newNodes.push(n);
                    }
                    // only rating the http|https node
                } catch (e) {
                    // omit node that raises the invalid argument
                }
            } else {
                if (n) {
                    newNodes.push(n);
                }
            }
        }
        return newNodes;
    }
        
    /*
     * find the specified DOM node
     */
    CreateTSRLocatedObject.prototype.findElement = function(rootElement) {
        if (rootElement) {
            this.rootElement = rootElement;
        }
        var rgTSRPath = (this.tagID) ? this.findElementByID() : this.findElementByTagName();
        
        var tempTSRPath = rgTSRPath;
        if (tempTSRPath) {
            rgTSRPath = [];
            for (var i = 0; i < tempTSRPath.length; i++) {
                var objTMDom = new TMDOMObj(tempTSRPath[i]);
                var objNodeStyle = objTMDom.getAttribute('style');
                var regexAttValue = new RegExp('display\\s*:\\s*none', 'i');
                if(!regexAttValue.test(objNodeStyle)) {
                    rgTSRPath.push(tempTSRPath[i]);
                }
            }
        }
    
        if (rgTSRPath) {
            for (var iCount = 0; iCount < rgTSRPath.length; iCount++) {
                if (this.childLocated) {
                    rgTSRPath[iCount].TSRChild = true;
                    rgTSRPath[iCount].TSRLocatedSet = this.childLocated.findElement(rgTSRPath[iCount]);
                } else {
                    rgTSRPath[iCount].TSRChild = false;
                }
            }
        }
        return rgTSRPath;
    };
    
    /*
     * find the specified DOM node by ID
     */
    CreateTSRLocatedObject.prototype.findElementByID = function() {
        if (!this.tagID) {
            return null;
        }
        var rgTSRPath = [];
        var objNode = null;
    
        /*
         * If ID attribute has been descripted,
         * we will directly use it to locate object.
         */
        if (this.tagIDregexFirst && this.tagName) {
            var objNodes = this.rootElement.getElementsByTagName(this.tagName);
            var regexID = new RegExp(this.tagID, '');
    
            for (var iCount = 0; iCount < objNodes.length; iCount++) {
                objNode = objNodes[iCount];
                if (regexID.test(objNode.id)) {
                    rgTSRPath.push(objNode);
                    if (!this.multiMatches) {
                        break;
                    }
                }
            }
            return (rgTSRPath.length > 0) ? rgTSRPath : null;
        } else {
            objNode = this.rootElement.getElementById(this.tagID);
    
            if (objNode) {
                rgTSRPath.push(objNode);
                this.tagName = objNode.tagName;
                return rgTSRPath;
            }
        }
        return null;
    };
    
    /*
     * find the specified DOM node by tagName and attributes
     */
    CreateTSRLocatedObject.prototype.findElementByTagName = function() {
        if (!this.tagName) {
            return null;
        }
    
        /*
         * According to tagName, We get a object array of the same tagName
         * under rootElement
         */
        var iCount = 0;
        var rgobjNode = this.rootElement.getElementsByTagName(this.tagName);
        if (0 === rgobjNode.length) {
            return null;
        }
    
        var rgTSRPath = [];
        if (this.indexSource > -1 && rgobjNode[this.indexSource]) {
            rgTSRPath.push(rgobjNode[this.indexSource]);
            return rgTSRPath;
        }
    
        if (0 === this.attributes.length) {
            if (this.multiMatches) {
                for ( iCount = 0; iCount < rgobjNode.length; iCount++) {
                    rgTSRPath.push(rgobjNode[iCount]);
                }
            } else {
                rgTSRPath.push(rgobjNode[0]);
            }
            return rgTSRPath;
        }
    
        /*
         * Compare all attributes
         */
        for ( iCount = 0; iCount < rgobjNode.length; iCount++) {
            var objNode = rgobjNode[iCount];
    
            /*
             * if this node is not leaf of the tree,
             * we just get the first element.
             */
            if (this.compareAttributes(objNode)) {
                rgTSRPath.push(objNode);
    
                if (!this.multiMatches) {
                    break;
                }
            }
        }
        return (rgTSRPath.length > 0) ? rgTSRPath : null;
    };
    
    CreateTSRLocatedObject.prototype.appendAttribute = TSRappendAttribute;
    CreateTSRLocatedObject.prototype.compareAttributes = TSRcompareAttributes;
    
    /*
     * Create a TSR Sibling object
     */
    function CreateTSRSiblingObject(strTagName) {
        //Member variables for location dom object
        //TagName of the specified dobj
        this.tagName = strTagName.toUpperCase();
    
        //Attributes array of the specified dobj
        this.attributes = [];
    
        //indexSource of parent.getElementsByTagName
        this.indexSource = -1;
    
        this.nodeElement = null;
    }

    CreateTSRSiblingObject.prototype.findSibling = function(objParent) {
        var iSkipCount = this.indexSource;
        var objNode = objParent;
        while (objNode) {
            if (this.tagName === objNode.tagName && this.compareAttributes(objNode)) {
                if (iSkipCount < 1) {
                    this.nodeElement = objNode;
                    return true;
                } else {
                    iSkipCount--;
                }
            }
    
            objNode = objNode.nextSibling;
        }
        return false;
    };
    
    CreateTSRSiblingObject.prototype.appendAttribute = TSRappendAttribute;
    CreateTSRSiblingObject.prototype.compareAttributes = TSRcompareAttributes;
    exports.CreateTSRSiblingObject = CreateTSRSiblingObject;
    /*
     * Create a TSR Result object
     */
    function CreateTSRResultObject(objNode, strUrl, fnFindInsertNode, fnShowRatingResultUI, fnAdjustNodeStyle, noFilterImg, imageCallback, isImageNeedReRating) {
        if (!objNode || !strUrl) {
            return null;
        }

        var protocol = strUrl.indexOf('http://') == 0 ? 'http://' : (strUrl.indexOf('https://') == 0 ? 'https://' : null);
        if (protocol) {
            strUrl = protocol + encodeURI(strUrl.slice(protocol.length));
        }

        if (imageCallback && isImageNeedReRating) {
            var imgRatedNode = TrendMicro.TB.GetImgRatedObject(objNode, g_oEnv.Parser.iResultNumber);
            if (imgRatedNode) {
                if (isImageNeedReRating(imgRatedNode) == false) {
                    TMExt_debug('imgRatedNode=' + imgRatedNode + ' in image rating queue, return');
                    return null;
                }
                else {
                    TMExt_debug('Add to re-rating objNode=' + objNode);
                    imgRatedNode.resulted = false;
                }
            }
            else {
                TMExt_debug('Do not find ojNode=' + objNode + ' , need to rating.');
            }
        }
        else if (TrendMicro.TB.InRatingQueue(objNode, g_oEnv.Parser.iResultNumber) || TrendMicro.TB.isRated(objNode)) {
            TMExt_debug('objNode=' + objNode + ' InRatingQueue or isRated, return');
            return null;
        }

        var objResult = {
            id: ++g_oEnv.Parser.iResultNumber,
            node: objNode,
            FindInsertNode: function() {
                return this.node;
            },
            AdjustNodeStyle: undefined,
            imageCallback: undefined
        };
    
        if (fnFindInsertNode) {
            objResult.FindInsertNode = fnFindInsertNode;
        }
    
        if (fnShowRatingResultUI) {
            objResult.ShowRatingResultUI = fnShowRatingResultUI;
        }
    
        if (fnAdjustNodeStyle) {
            objResult.AdjustNodeStyle = fnAdjustNodeStyle;
        }
        
        if (TitaniumFeatureConfig.EnableSafeSearching && imageCallback) {
            objResult.imageCallback = imageCallback;
        }
        
        var objTMDom = new TMDOMObj(objResult.node);
        objResult.text = objTMDom.innerText();
    
        try {
            objResult.link = decodeURI(strUrl);
        } catch (nErr) {
            objResult.link = strUrl;
        }
    
        var url_match_regex = /^(https?|ftps?):\/\/([\w%\-]+\.)+[\w%\-]+(\/[\w\- .\/?%&=]*)?/i;
        var url_to_test = encodeURI(objResult.link);
        if (!url_to_test.match(url_match_regex)) {
            return;
        }
    
        //not rating any image containing in the node
        var objElement = objResult.FindInsertNode();
        if (!noFilterImg && HasImageTag(objElement) && (!TitaniumFeatureConfig.EnableSafeSearching || !g_bEnableImageSafeSearch || !imageCallback)) {
            //do not support image
        } else {
            g_oEnv.Parser.rgobjSearchResult[objResult.id] = objResult;
        }
    
        return objResult;
    }
    exports.CreateTSRResultObject = CreateTSRResultObject;
        
    /*
     * Common Util Function
     */
    
    function HasImageTag(objElement) {
        var bIsImage = false;
        if (objElement && objElement.childNodes) {
            for (var i = 0; i < objElement.childNodes.length; ++i) {
                var aChild = objElement.childNodes[i];
                if (aChild && aChild.tagName && aChild.tagName.toUpperCase() === 'IMG') {
                    bIsImage = true;
                    break;
                }
    
                if (HasImageTag(aChild)) {
                    return true;
                }
            }
        }
    
        return bIsImage;
    }
    
    function TSTrim(strText) {
        return strText.replace(/^\s+|\s+$/g, '');
    }
    exports.TSTrim = TSTrim;
    
    function InsertURLProtocolString(strURL) {
        var strURL2 = TSTrim(strURL);
        return D_HTTP_PREFIX + strURL2 + '/';
    }
    exports.InsertURLProtocolString = InsertURLProtocolString;
    
    function GetAllTSRLocatedNodes(rgDomRoot) {
        if (!rgDomRoot) {
            return null;
        }
        var rgNodes = [];
        for (var iCount = 0; iCount < rgDomRoot.length; iCount++) {
            if (rgDomRoot[iCount].TSRChild) {
                if (rgDomRoot[iCount].TSRLocatedSet) {
                    var rgSubNodes = GetAllTSRLocatedNodes(rgDomRoot[iCount].TSRLocatedSet);
                    rgNodes = rgNodes.concat(rgSubNodes);
                }
            } else {
                rgNodes.push(rgDomRoot[iCount]);
            }
        }
        rgNodes = TSRFilterInvalidNode(rgNodes);
        return rgNodes;
    }
    exports.GetAllTSRLocatedNodes = GetAllTSRLocatedNodes;
    
    function TSRTagFlowID() {
        g_oEnv.Parser.rgobjSearchResult.FlowID = ++g_oEnv.Parser.iParserFlowID;
    }
    exports.TSRTagFlowID = TSRTagFlowID;

    function TSRGetOffset(element) {
        if ('getBoundingClientRect' in document.documentElement) {
            //TrendMicro.TB.console.info('there is getBoundingClientRect');
            var elem = element;
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            var box = null;
            try {
                box = elem.getBoundingClientRect();
            } catch (e) {
                return null;
            }
    
            var doc = elem.ownerDocument, docElem = doc.documentElement;
    
            // Make sure we're not dealing with a disconnected DOM node
    
            var body = doc.body, 
            win = window, 
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, 
            scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop, 
            scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft, 
            top = box.top + scrollTop - clientTop, 
            left = box.left + scrollLeft - clientLeft;
            //TrendMicro.TB.console.info("top="+top+','+'left='+left);
            return {
                top: top,
                left: left,
                elePos: box
            };
        } else {
            var iOffsetX = 0, iOffsetY = 0;
            var objElement = element;
            var strDOMTagName = null;
            while (objElement) {
                iOffsetX += objElement.offsetLeft;
                iOffsetY += objElement.offsetTop;
                if (document.body === objElement || 'HTML' === objElement.nodeName) {
                    break;
                }
    
                if (objElement.scrollTop) {
                    iOffsetX -= objElement.scrollLeft;
                    iOffsetY -= objElement.scrollTop;
                }
                strDOMTagName = objElement.nodeName;
                objElement = objElement.offsetParent;
            }
            //Default: Tooltip will be displayed at the right and top of ICON
            var iScrollTop;
            var iScrollLeft;
            var strTailXBG;
            var strTailYBG;
    
            iScrollTop = (document.documentElement.scrollTop > 0) ? document.documentElement.scrollTop : document.body.scrollTop;
            iScrollLeft = (document.documentElement.scrollLeft > 0) ? document.documentElement.scrollLeft : document.body.scrollLeft;
            if ('TD' === strDOMTagName || 'TH' === strDOMTagName) {
                // For IE8, those case,
                // they cannot correctly find offsetParent object.
                iOffsetX += iScrollLeft;
                iOffsetY += iScrollTop;
            }
            return {
                top: iOffsetY,
                left: iOffsetX
            };
        }
    }
    
    function resetPosForYahooMail() {
        let mailLeft = 0;
        let mailTop = 0;
        let viewScrollTop = 0;
        let isNewWindow = false;

        const htmlMail = document.querySelector('[data-cy="htmlMail"]');
        const mainColumn = document.querySelector(".mainColumn");
        if (htmlMail && mainColumn){
            const viewArea = htmlMail.closest('article');
            viewScrollTop = viewArea.scrollTop;
            mailLeft = htmlMail.offsetLeft;
            mailTop = htmlMail.offsetTop + mainColumn.offsetTop;
        }else{
            //in yahoo jp new window
            mailTop = htmlMail.offsetTop;
            mailLeft = htmlMail.offsetLeft;
            isNewWindow = true;
        }

        return {
            left: mailLeft,
            top: mailTop,
            scrollTop: viewScrollTop,
            isNewWindow: isNewWindow
        }
    }

    function TSRCalculateOffset(objSrcElement) {
        var posToolTip = {
            PosX: 0,
            BodyX: 0,
            TailX: 0,
            PosY: 0,
            BodyY: 0,
            TailY: 0,
            TailBG: null
        };
        var iOffsetX = 0;
        var iOffsetY = 0;
    
        if (!objSrcElement) {
            return posToolTip;
        }

        // For Yahoo mail, reset pos for iframe.
        var posForYahooMail= {
            left: 0,
            top: 0,
            scrollTop: 0
        };

        /*
         * Calculate top and left offset and the tooltip position
         * TOP:
         *      Distance is from documentElement.top to srcElement.top.
         *      We need to plus all offset of srcElement and its offsetParent.
         *      Finally, the top of position is that this distance subtract
         *      scrollTop of document.body.
         * LEFT:
         *      Distance is from documentElement.left to srcElement.left.
         *      We need to plus all offset of srcElement and its offsetParent.
         *
         */
        var pos = TSRGetOffset(objSrcElement);
        iOffsetX = pos.left;
        iOffsetY = pos.top;
        //TrendMicro.TB.console.info('iOffsetX='+iOffsetX);
        var iScrollTop;
        var iScrollLeft;
        var strTailXBG;
        var strTailYBG;

        if (window.location.host ==='mail.yahoo.co.jp'){
            posForYahooMail = resetPosForYahooMail();
        } ;
    
        iScrollTop = (document.documentElement.scrollTop > 0) ? document.documentElement.scrollTop : document.body.scrollTop;
        iScrollLeft = (document.documentElement.scrollLeft > 0) ? document.documentElement.scrollLeft : document.body.scrollLeft;
    
        posToolTip.PosX = iOffsetX + C_TSRToolTipOffsetX + posForYahooMail.left;
        posToolTip.BodyX = g_oImgDefine.ImgSize.Tail.width;
        posToolTip.TailX = 0;
        strTailXBG = 'Right';
        if (posToolTip.PosX + C_TSRTotalToolTipWidthArea >= document.body.clientWidth) {
            var iX = iOffsetX + C_TSRToolTipOffsetX - C_TSRTotalToolTipWidthArea;
    
            if (iX > iScrollLeft) {
                posToolTip.PosX = iX;
                posToolTip.BodyX = 0;
                posToolTip.TailX = g_oImgDefine.ImgSize.PopupBodySize.width;
                strTailXBG = 'Left';
            }
        }
    
        posToolTip.PosY = iOffsetY - C_TSRTotalToolTipHeightArea - C_TSRToolTipOffsetY + posForYahooMail.top - posForYahooMail.scrollTop;
        posToolTip.BodyY = 0;
        posToolTip.TailY = C_TSRTotalToolTipHeightArea - g_oImgDefine.ImgSize.Tail.height;
        strTailYBG = 'Top';
        if (posToolTip.PosY < iScrollTop) {
            posToolTip.PosY = iOffsetY + objSrcElement.offsetHeight + C_TSRToolTipOffsetY - posForYahooMail.scrollTop;
            posToolTip.BodyY = g_oImgDefine.ImgSize.Tail.height - C_TSRToolTipOverlapY;
            posToolTip.TailY = 0;
            strTailYBG = 'Bottom';
        }

        if (posForYahooMail.isNewWindow){
            posToolTip.PosX = posToolTip.PosX - iScrollLeft;
            posToolTip.PosY = posToolTip.PosY - iScrollTop;
            if(posForYahooMail.top + posToolTip.PosY - iScrollTop < C_TSRTotalToolTipHeightArea){
                posToolTip.PosY = posForYahooMail.top + pos.elePos.y - 4;
                posToolTip.TailY = 16;
                strTailYBG = 'Bottom';
            }
        }

        posToolTip.TailBG = strTailYBG + strTailXBG;

        return posToolTip;
    }
    
    /*
     * Get the rating result from Browser plugin about this URL link
     */
    function TSREscapeURL(strURL) {
        return g_oEnv.BaseResourceUrl + encodeURIComponent(strURL);
    }
    exports.TSREscapeURL = TSREscapeURL;
        
    /*
     * Show Untested URL report lightbox
     */
    function TSRConstructUntestURLWindow(link) {       
        var truncated_link = TSRTruncateText(link, false);
        var wordingList = g_oRatingLevelToolTipString['SiteSafetyReportString']
        var strContent = 
    
        '<div id="ID_TSRUntestURLWindow_Wrapper" class="TSRUntestURLWindow_Wrapper">' + 
            '<div id="ID_TSRUntestURLWindow_Wrapper_closeButton" class="closeButton"></div>' +
			'<div class="photo" style="float:left; padding-top:35px; padding-left:20px; padding-right:10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACUElEQVR42s2YvU4CQRSFJ2AC0kNiyd9T2EJitUSxwScQHwBLO4FaNDFEK+QNgBcQY4xKh0Q7aiwttGC9Nzkmw7Ass784yUlwvHPmy+7cnTsjhMO2091Lk45JHdILaUb6hmbo6yAmLYJoZBwlVUhD0pxkkqakPqlFakAt9E0RM8cYHhv1C6ZAesMEY9IpKacxLofYMcayR8ELSJx0DbMP0gEp4sInQtonvcOLPeNOTZKkJzzypmMDa88YvObwTjqBmZC+SKUA1mMJ3pO1UBSQID1iwK4IqLE35uC5EnaBbTzSkgi44UnxXG27bOJF1xQhNawpcyn7kAljZEI8RKA45nxb+E7hw8WkhyLkxnNi7orceY8nFAkB4Ixl8XaG8t7Ei6sWEowJyVA1MGT4jyoC8iHCsAakLfwvj76qwM483QBMTInhDbnDP0ak3iZhENcjvQrUMFebhEEsly6fAoVVfZMwiD9nFlsgNUWDglGB+JVd6qZoEDDqK1ta1JyOMDKdQLmFkRb1iH/cWaU9CiptKC8watr/fRhzbqF8gMnKH8aM3daxDsorzNLWobO5AqqvQvkEs7i5KuVHeU2RrkJ5goFv2ar8iKJIsi3QbKDcwsQsCzSlhG1omAy8wsCrAY/iqoBbLC5DA6rvEcbAXDe+HIMA5RZG7xhkcVA0Ath0De2DojQoRXqWjtIxH0DkozR7p5wabP+bywbFsIjHK1/HZDW3A/k6ZrIymzxcWD2suLCqQxfKhZWJMUe+XVituNI7IXW5BkY99QPN0NdFjOMrvV9P+Le8x/en9wAAAABJRU5ErkJggg==">' +
			'</div>' +
            '<div class="titleArea">' + wordingList['ReceivedReviewTitle'] + '</div>' +			
            '<div class="descriptionArea">' + wordingList['Description'] + '</div>' +			
            '<div class="addressArea" style="visibility:hidden;">' +
                '<span class="title">' + wordingList['Address'] + '</span>' +
                '<span id="ID_TSRUntestURLWindow_Wrapper_webURL" class="webURL">' + truncated_link + '</span>' +
            '</div>' +                                           
            '<div class="textAreaBelowSeperator">' +
            '</div>' + 
            '<div class="footArea">' +
                '<div id="ID_TSRUntestURLWindow_Wrapper_logo" class="logo" style="visibility:hidden;"></div>' +
                '<button id="ID_TSRUntestURLWindow_Wrapper_send" class="TSRUntestURLWindow_Wrapper_btn_red send">' + wordingList['OKButton'] +'</button>' +
            '</div>' + 
        '</div>';
    
        return strContent;
    }
    
    function removeUntestURLOverlay(){
        var untestURLOverlay = document.getElementById("ID_TSRUntestURLWindow");		
        document.body.removeChild(untestURLOverlay)
    }
    
    function TISProShowReport(objResult){
        if(! 'SiteSafetyReportString' in g_oRatingLevelToolTipString){
            return null;
        }
        		
        var wordingList = g_oRatingLevelToolTipString['SiteSafetyReportString']
        
        var link = objResult.link;
        var divUntestURLWindow = document.createElement('DIV');
        
        divUntestURLWindow.id = "ID_TSRUntestURLWindow";
        divUntestURLWindow.className = "TSRUntestURLWindow";
        divUntestURLWindow.style.backgroundImage = 'url(' + TSREscapeURL("overlay_background.png") + ')';
        		
        var untestURLWindow = TSRConstructUntestURLWindow(link);		
        if(!untestURLWindow){
            TMExt_debug.log("missing L10n files");
            return;
        }		
        divUntestURLWindow.innerHTML = TSRConstructUntestURLWindow(link);        
        document.body.appendChild(divUntestURLWindow);
        
        /*
            variable
        */
        var close_button = document.getElementById("ID_TSRUntestURLWindow_Wrapper_closeButton");
        var logo = document.getElementById("ID_TSRUntestURLWindow_Wrapper_logo");
        var send_button = document.getElementById("ID_TSRUntestURLWindow_Wrapper_send");
       
        var webURL = document.getElementById("ID_TSRUntestURLWindow_Wrapper_webURL");              
        webURL.title = link;
                              		
        function hasClass(el, name) {
           return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
        }
        
        function addClass(el, name)
        {
           if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
        }
        
        function removeClass(el, name)
        {
           if (hasClass(el, name)) {
              el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
           }
        }
        	      
        //description.style.padding = '10px 0px 0px 10px';
        
        /*
            set placeholder     
        */
        
        function InitializeInputDom(dom, placeholder){
            dom.value  = placeholder;
            dom.onfocus = function() {
                if (this.value == placeholder) {
                    this.value = '';
                    addClass(this, "TSRUntestURLWindow_noPlaceHolder");
                }
            };
            dom.onblur = function() {
                if (this.value == '') {
                    this.value = placeholder;
                    removeClass(this, "TSRUntestURLWindow_noPlaceHolder");
                }
            };    
        }            
               
        /*
            close button
        */
        close_button.style.backgroundImage = 'url(' + TSREscapeURL("icon_close.png") + ')';
        close_button.onmouseover = function(){
            this.style.backgroundPosition="0px 120px";
        }
        close_button.onmouseout = function(){
            this.style.backgroundPosition="0px 0px";
        }
        close_button.onmousedown = function(){
            this.style.backgroundPosition="0px 80px";
        }
        close_button.onclick = function(){			
            removeUntestURLOverlay();			
        }
        
        /*
            logo
        */
        logo.style.backgroundImage = 'url(' + TSREscapeURL("ic_tmlogo_web.png") + ')';
        logo.style.position = "static";
        logo.style.lineHeight = "19.5px";
        logo.style.fontSize = "13px";
        logo.style.padding = "0px";
        logo.style.margin = "0px";
        /*
            send
        */
        
        function setBackgroundColor(element, startColor, endColor){
            try{
                element.style['filter'] = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + startColor + '\', endColorstr=\'' + endColor + '\')';
            }catch(e){
                
            }
            
            try{
                element.style['-ms-filter'] = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + startColor + '\', endColorstr=\'' + endColor + '\')'; 
            }catch(e){
                
            }
            
            try{
                element.style['background'] = 'linear-gradient(' + startColor + ', ' + endColor + ')';
            }catch(e){
                
            }
            
            try{
                element.style['background'] = '-webkit-gradient(linear, 0 0, 0 100%, from(' + startColor + '), to(' + endColor + '))'; 
            }catch(e){
                
            }
            
            try{
                element.style['background'] = '-moz-linear-gradient(top,  ' + startColor + ',  ' + endColor + ')';   
            }catch(e){
                
            }
        }
        
        setBackgroundColor(send_button, '#e6e6e6', '#fafafa');

        send_button.onmouseover = function() {
            setBackgroundColor(send_button, '#e6e6e6', '#fafafa');
        }

        send_button.onmouseout = function() {
            setBackgroundColor(send_button, '#e6e6e6', '#fafafa');
        }
        
        send_button.onmousedown = function() {
            setBackgroundColor(send_button, '#e6e6e6', '#fafafa');
        }
            
       send_button.onclick = function(){                      
            removeUntestURLOverlay();			
        }
    }

    function Feedback2SiteSafety(params) {
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEEDBACK_UNTESTED_URL,
            params: params
        }); 
    }
    
    function replaceProductName(text) {
        text = text.toString();
        return text.replace(/__productName__/g, D_TSRToolTipTitleString);
    }

    /*
     * Change background and icon of tooltip to show detailed information
     */
    function TSRChangeTooltip(objResult, posToolTip) {
        if (!objResult || objResult.level === undefined) {
            return;
        }        
        var divToolTipTail = document.getElementById(D_TSRToolTipTailID);
        var divToolTipBody = document.getElementById(D_TSRToolTipBodyID);
        var imgRatingIcon = document.getElementById(D_TSRToolTipIconID);
        var spanRatingString = document.getElementById(D_TSRToolTipRLStringID);
        var siteUrlString = document.getElementById(D_TSRToolTipSiteUrlID);
        
        var checkUrl = document.getElementById(D_TSRToolTipCheckUrlID);
        if (!divToolTipTail || !divToolTipBody || !imgRatingIcon || !spanRatingString) {
            return;
        }

        /*
         * Change background, Icon image, and Rating Level String
         */
        divToolTipBody.style.left = posToolTip.BodyX + D_PIXEL_UNIT;
        divToolTipBody.style.top = posToolTip.BodyY + D_PIXEL_UNIT;
        var strBgImg = 'url(' + TSREscapeURL(g_oRatingLevel[objResult.level].Tail[posToolTip.TailBG]) + ')';
        divToolTipTail.style.backgroundImage = strBgImg;
        divToolTipTail.style.left = posToolTip.TailX + D_PIXEL_UNIT;
        divToolTipTail.style.top = posToolTip.TailY + D_PIXEL_UNIT;
        divToolTipTail.style.visibility = 'visible';
    
        imgRatingIcon.src = TSREscapeURL(g_oRatingLevel[objResult.level].Content.Icon);
        spanRatingString.innerHTML = g_oRatingLevel[objResult.level].Content.LevelString;

        spanRatingString.style.color = g_oRatingLevel[objResult.level].Content.TextColor;
        siteUrlString.style.color = g_oRatingLevel[objResult.level].Content.SiteUrlColor;

        D_TSRToolTipBGIkbLinkID.innerHTML = g_oRatingLevel[objResult.level].Content.LevelString;
        const haveUMSRatingIcon = !!document.getElementById('ums_img_tooltip');
        if (haveUMSRatingIcon) {
            document.getElementById(D_TSRToolTipBGIkbLinkID).style.visibility = 'hidden';
        }else{
            document.getElementById(D_TSRToolTipBGIkbLinkID).style.visibility = 'initial';
        }

        if (checkUrl) {
            checkUrl.onclick = function() {
                if (TitaniumFeatureConfig.EnableUntestedFeedbackFeature) {
                    TSRHideToolTip();                   
                    //feedback for untested URL
                    var link = objResult.link;					
                    var params = {
                        url: link,
                        site_owner: "0",
                        email:"",
                        description:"",						
                        score: "71"
                    };
                    if (typeof (Feedback2SiteSafety) != 'undefined'){
                        Feedback2SiteSafety(params);
                        window.browser.runtime.sendMessage({
                            action: TB_ACTIONS.SEND_UNTEST_URL_UBM,
                            type: "ask_trendmicro"
                        }); 
                    }                    					
                    TISProShowReport(objResult);
                } else {
                    window.open('http://sitesafety.trendmicro.com');
                }
            };
        }
        var divRLDetailed = document.getElementById(D_TSRToolTipRLDetailedID);
        var divRLDetailedShare = document.getElementById(D_TSRToolTipRLDetailedShareID);
        var divSiteName = document.getElementById(D_TSRToolTipSiteNameID);
        var divSiteUrl = document.getElementById(D_TSRToolTipSiteUrlID);
        if (!divRLDetailed || !divRLDetailedShare || !divSiteName || !divSiteUrl) {
            return;
        }
    
        /*
         * Change site name, site url, and detailed information
         * If status is no connection, we don't show site name and url.
         */
        var strSiteName = objResult.text;
        var strSiteUrl = objResult.link;
    
        divSiteName.innerHTML = htmlEncode(TSRTruncateText(strSiteName, true));
        divSiteName.title = strSiteName;
        divSiteUrl.innerHTML = htmlEncode(TSRTruncateText(strSiteUrl, false));
        divSiteUrl.title = strSiteUrl;
    
        divRLDetailed.innerHTML = replaceProductName(g_oRatingLevel[objResult.level].Content.HelpString);

        if (objResult.level !== 5) {
            divRLDetailedShare.style.display = 'none';            
        } else {
            divRLDetailedShare.style.display = 'block';
        }
        /*
            as the height will be different when show/not_show untest popup, need to re-assign it's top area.
        */
        if(posToolTip.BodyY == 0){
            tooltiptopArea = posToolTip.BodyY + (g_oImgDefine["ImgSize"]["PopupBodySize"]["height"] - divToolTipBody.offsetHeight) + D_PIXEL_UNIT; 
            divToolTipBody.style.top = posToolTip.BodyY + (g_oImgDefine["ImgSize"]["PopupBodySize"]["height"] - divToolTipBody.offsetHeight) + D_PIXEL_UNIT;    
        }
        
        //send UBM
        window.browser.runtime.sendMessage({
            action: "send_untested_url_ubm",
            type: "show_tooltip",
            levelNumber: objResult.level
        }); 
    }
        
    function TSRClearToolTipTimer() {
        if (g_oEnv.Tooltip.iTSRTimerID) {
            clearTimeout(g_oEnv.Tooltip.iTSRTimerID);
            g_oEnv.Tooltip.iTSRTimerID = null;
        }
    }
    
    function TSRSetToolTipTimer() {
        TSRClearToolTipTimer();
        g_oEnv.Tooltip.iTSRTimerID = setTimeout(TSRHideToolTip, g_iTSRToolTipTimeout);
    }
    
    function TSRConstructToolTipWindow() {
        var BGIkbLink = !!g_bisHowTurnOffHighLightLink ? g_oRatingLevelToolTipString.ToogleBgIkbString : '';
        var strContent = 
        '<div id="' + D_TSRToolTipTailID + '" ></div>' + 
        '<div id="' + D_TSRToolTipBodyID + '" >' + 
        '<div id="TSRToolTipBodyContent" >' + 
        '<img id="' + D_TSRToolTipIconID + '" >' + 
        '<span id="' + D_TSRToolTipRLStringID + '" ></span>' + 
        '<br style="clear:both;"/>' + 
        '<p id="' + D_TSRToolTipSiteNameID + '" ></p>' + 
        '<p id="' + D_TSRToolTipSiteUrlID + '" ></p>' + 
        '<p id="' + D_TSRToolTipRLDetailedID + '" ></p>' + 		
        '<p id="' + D_TSRToolTipRLDetailedShareID + '" style="display:none;">' + g_oRatingLevelToolTipString.CheckUrlString + '</p>' +
        '<a href="#" id="' + D_TSRToolTipBGIkbLinkID + '" >' + BGIkbLink + '</a>' + 
        '</div>' + 
        '<div id="' + D_TSRToolTipCloseSpanID + '" >' + 
        '<div style="background-image:url(' + TSREscapeURL(g_oImgDefine.CloseIcon) + ')" id="' + D_TSRToolTipCloseID + '" >' +
        '</div>' +
        '</div>' + 
            '<div id="' + D_TSRToolTipTitleID + '">' +
                '<img src="' + TSREscapeURL(g_oImgDefine.LogoIcon) + '" class="TSRLogoIcon">' +
                '<span class="TSRProductTitle">' + 
                    D_TSRToolTipTitleString + 
                '</span>' + 
            '</div>' +
        '</div>';
    
        return strContent;
    }
    
    function TSRInitToolTip(strBaseUrl, bMouseOver, bHighlight, iToolTipTimeout, iUMSToolTipTimeout, bHowTurnOffHighlightLink, currentBrowser) {
        /*
         * Setting environment
         */
        g_oEnv.BaseResourceUrl = strBaseUrl;
        g_bisMouseOverShowToolTip = bMouseOver;
        g_bisHighLight = bHighlight;
        g_currentBrowser = currentBrowser;
        g_bisHowTurnOffHighLightLink = bHowTurnOffHighlightLink;
        g_iTSRToolTipTimeout = iToolTipTimeout;
        
        if (typeof (iUMSToolTipTimeout) !== 'undefined') {
            exports.g_iUMSToolTipTimeout = iUMSToolTipTimeout;
        }
    }
    exports.TSRInitToolTip = TSRInitToolTip;

    function TSRCreateTooltip() {
        var divToolTip = document.getElementById(D_TSRToolTipID);
        if (divToolTip) {
            return divToolTip;
        }
    
        divToolTip = document.createElement('DIV');
    
        var iToolTipWidth = C_TSRTotalToolTipWidthArea;
        var iToolTipHeight = C_TSRTotalToolTipHeightArea;
    
        divToolTip.id = D_TSRToolTipID;
        divToolTip.className = D_TSRToolTipShowClass;
        divToolTip.style.width = iToolTipWidth;
        divToolTip.style.height = iToolTipHeight;
    
        divToolTip.innerHTML = TSRConstructToolTipWindow();
    
        document.body.insertBefore(divToolTip, null);
    
        /*
         * Setting event handler
         */
        var divToolTipTail = document.getElementById(D_TSRToolTipTailID);
        var divToolTipBody = document.getElementById(D_TSRToolTipBodyID);
        divToolTipTail.onmouseout = TSRSetToolTipTimer;
        divToolTipTail.onmousemove = TSRClearToolTipTimer;
        divToolTipTail.onmouseover = TSRClearToolTipTimer;
        divToolTipBody.onmouseout = TSRSetToolTipTimer;
        divToolTipBody.onmousemove = TSRClearToolTipTimer;
        divToolTipBody.onmouseover = TSRClearToolTipTimer;
    
        /*
         * Setting event handler for closing tooltip
         */
        var imgCloseIcon = document.getElementById(D_TSRToolTipCloseID);
    
        imgCloseIcon.onclick = TSRHideToolTip;

        var TurnOffBGIkbLink = document.getElementById(D_TSRToolTipBGIkbLinkID);

        TurnOffBGIkbLink.onclick = function() {
            let currnetUrl = new URL(document.location.href);
            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: UBM_ID.RATING_HOW_TURN_OFF_HIGHLIGHT_LINK,
                    value: JSON.stringify({
                        'Browser': g_currentBrowser,
                        'host': currnetUrl.hostname
                    })
                }
            });

            if (!g_bisHowTurnOffHighLightLink){
                return;
            }

            window.open(g_bisHowTurnOffHighLightLink);          
        };

        return divToolTip;
    }
        
    function TSRShowToolTip(event) {
        /*
         * Show ToolTip
         */
        event = event || window.event;
        var objDOMEvent = new TMDOMEvent(event);
        var bClickEvent = (event.type === 'click' || g_bisMouseOverShowToolTip);
        if (bClickEvent) {
            var divToolTip = TSRCreateTooltip();
    
            /*
             * Depend on different browser to get which element to toggle event
             * IE uses srcElement, others use target
             */
            var objSrcElement = objDOMEvent.target();
    
            /*
             * Firefox 3.6.24- will use wrappedJSObject
             */
            var objResult = objSrcElement.TSRResult || objSrcElement.parentNode.TSRResult || objSrcElement.wrappedJSObject.TSRResult;
            
            /*
             * Disable timer to hide ToolTip
             */
            TSRClearToolTipTimer();
    
            /*
             * calculate top and left position of tooltip div and show it
             */
            var posToolTip = TSRCalculateOffset(objSrcElement);
            /*
             * Change background and content
             */
            TSRChangeTooltip(objResult, posToolTip);
    
            /*
            as the height will be different when show/not_show untest popup, need to re-assign it's top area.
            */
            if(posToolTip.BodyY === 0){
                // For Yahoo JP email open in new window, need reset position.
                var divToolTipBody = document.getElementById(D_TSRToolTipBodyID);
                tooltiptopArea = posToolTip.BodyY + (g_oImgDefine["ImgSize"]["PopupBodySize"]["height"] - divToolTipBody.offsetHeight);
                divToolTipBody.style.top = posToolTip.BodyY + (g_oImgDefine["ImgSize"]["PopupBodySize"]["height"] - divToolTipBody.offsetHeight) + D_PIXEL_UNIT;    
                var newPosToolTip = TSRCalculateOffset(objSrcElement);
                posToolTip.PosY = newPosToolTip.PosY;
            }
    

            divToolTip.style.left = posToolTip.PosX + D_PIXEL_UNIT;
            divToolTip.style.top = posToolTip.PosY + D_PIXEL_UNIT;
            divToolTip.className = D_TSRToolTipShowClass;

            // switch entry from number to readable string
            let entry = objResult.entry;
            if(g_categoryUbmNameTable && g_categoryUbmNameTable.hasOwnProperty(entry)) {
                entry = g_categoryUbmNameTable[entry];
            }

            // Send UBM
            let currnetUrl = new URL(document.location.href);
            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: UBM_ID.RATING_URLS_MOUSEOVER_TOOLTIP,
                    value: JSON.stringify({
                        'rating': objResult.level,
                        'entry': entry,
                        'host': currnetUrl.hostname
                    })
                }
            });
        }
        event.cancelBubble = true;	
        return false;
    }

    function getYahooJPSchemeMode(){

        return new Promise(resolve => {
            const refreshIntervalYahooJpMode = setInterval(() => {
                if(document.querySelector('[data-cy="switchMailTab"]')){
                    window.clearInterval(refreshIntervalYahooJpMode);
                    if (document.querySelector('[data-cy="switchMailTab"]') && ((window.getComputedStyle(document.querySelector('[data-cy="switchMailTab"]') ,null).getPropertyValue('background-color') === 'rgb(22, 19, 19)' || window.getComputedStyle(document.querySelector('[data-cy="switchMailTab"]') ,null).getPropertyValue('background-color') === 'rgb(48, 46, 46)'))
                        || window.getComputedStyle(document.querySelector('span[role="search"]') ,null).getPropertyValue('background-color') === 'rgb(22, 19, 19)'){
                        //yaho jp mail
                        resolve('dark');
                    }else{
                        resolve('normal');
                    }
                }
            }, 1000);
          });
    }

    async function schemeMode(){
        var mode = {
            entry: window.location.host,
            mode : 'normal'
        };

        //Detecting Auto Dark Theme
        const detectionID = "ID_detectionDarkThemeWindow";
        if (!TMExt_$(`#${detectionID}`).length) {
            var chkForceDarkCon =`<div id="${detectionID}" style="display: none; background-color: canvas; color-scheme: light"></div>`;
            TMExt_$('body').append(chkForceDarkCon);
        }
        const detectionDiv = document.querySelector(`#${detectionID}`);
        const isAutoDark = window.getComputedStyle(detectionDiv).backgroundColor != 'rgb(255, 255, 255)';
        if (isAutoDark) {
            mode.mode = 'dark';
        }

        if (window.location.host === 'mail.yahoo.co.jp'){
            const getMode = await getYahooJPSchemeMode();
            mode.mode = getMode;
            return mode;
        }

        if(window.location.host.includes('facebook')){
            if( document.querySelector('html[id="facebook"]').classList.contains('__fb-dark-mode')){
                mode.mode = 'dark';
            }
        } else if(window.location.host.includes('twitter')){
            // #FFFFFF, #15202B, #000000
            if(document.querySelector('meta[name="theme-color"]').content !== '#FFFFFF'){
                mode.mode = 'dark';
            }
        } else if(window.location.host.includes('linkedin')){
            if(document.querySelector('html').classList.contains('theme--dark')){
                mode.mode = 'dark';
            }
        }else if(navigator.userAgent.indexOf('Firefox') >= 0 && 
                (window.location.host.startsWith('www.google.com') &&  window.location.pathname === '/search') &&
                window.getComputedStyle( document.body ,null).getPropertyValue('background-color') !== 'rgb(255, 255, 255)' ) {
            mode.mode = 'dark';
        } else if (window.location.host === 'outlook.live.com' && document.querySelector('html').getAttribute('style').includes('--black:#ffffff')){
            //Outlook mail
            mode.mode = 'dark';
        } else if( window.location.host === "www.baidu.com" && 
            document.querySelector('body').getAttribute('class') && document.querySelector('body').getAttribute('class').includes('darkmode')){
            //baidu
            mode.mode = 'dark';
        }else if(document.querySelector('meta[name="color-scheme"]') && document.querySelector('meta[name="color-scheme"]').content === 'dark') {
            //detect #enable-force-dark
            mode.mode = 'dark';

        }
        return mode;
    }
    exports.schemeMode = schemeMode;

    function productNameLogic(logoInfo){
        let isJa = logoInfo.ja;
        let logoClass = '';
        for (const [key, value] of Object.entries(logoInfo)) {
            if(value){
                logoClass = logoClass + ' ' + key;
            }
        }
        var logoCon = isJa ?
        `<div>
            <div class="tball"></div>
            <div class=" ${logoClass}"></div>
        </div>`
        :
        `<div class=" ${logoClass}"></div>`;
        return logoCon;
    }
    exports.productNameLogic = productNameLogic;

    function ratingSettingCon(logoContent) {
        var content = `
        <div id="wtp_notification_mask" class="show"></div>
        <div id="wtp_notification-wrapper">
            <div class="wtp_notification_header">
                <button type="button" class="notification-close"></button>
                <h1 class="product-name pull-left">
                    ${logoContent}
                </h1>
            </div>
            <div class="wtp_notification_content" id="setting_content">
                <div>
                    <h2>${g_oRatingSetPopupString.Title}</h2>
                    <p>${g_oRatingSetPopupString.Desc}</p>
                    <div class="trend-form-radio">
                        <div class="form-radio">
                            <input type="radio" id="heighLight" name="isHighLight" value="1" checked>
                            <label for="html"><span>${g_oRatingSetPopupString.RadioHightlignt}</span></label>
                        </div>
                        <div class="form-radio">
                            <input type="radio" id="notHightlight" name="isHighLight" value="0">
                            <label for="css"><span>${g_oRatingSetPopupString.RadioNotHightlight}</span></label>
                        </div>
                    </div>
                    <div id="mode_view" class="bg">
                        <div class="safe_block">
                            <i class="ic_safe"></i>
                            <p><span>${g_oRatingSetPopupString.Safe}</span></p>
                            <div class="grayblock"></div>
                        </div>
                        <div class="dangerous_block">
                            <i class="ic_dangerous"></i>
                            <p><span>${g_oRatingSetPopupString.Dangerous}</span></p>
                            <div class="grayblock"></div>
                        </div>
                    </div>
                    <a href="#" id="${D_TSRExplainHowToolbarWorksIkbLinkID}">${g_oRatingSetPopupString.HowDoWorkLink}</a>
                </div>
                <div class="wtp_notification_footer">
                    <button type="button" class="red_action notification_apply">${g_oRatingSetPopupString.ApplyButton}</button>
                    <a href="#" id="notification_remindlater">${g_oRatingSetPopupString.RemindLater}</a>
                </div>
            </div>
            <div class="wtp_notification_content" id="applied_content" style="display:none">
                <i class="applied_icon"></i>
                <h2>${g_oRatingSetPopupString.AppliedTitle}</h2>
                <p><span>${g_oRatingSetPopupString.ChangeSettingDesc}</span></p>
            </div>
        </div> `;
        return content;
    }

    async function ratingSettingPopup(logoContent, bHighLight, browser, ExplainHowToolbarWorksIKBURL, resetResult, setPopupStatus){
        g_bisHighLight = bHighLight;
        g_currentBrowser = browser;
        var popup = document.getElementById("ID_ratingSettingWindow");
        if (popup) {
            return;
        }
        var popupWindow = document.createElement('DIV');
        popupWindow.id = "ID_ratingSettingWindow";
        popupWindow.className = "ratingSettingWindow";	
        document.body.appendChild(popupWindow);
        var content = ratingSettingCon(logoContent);
        TMExt_$('#ID_ratingSettingWindow').append(content);
        var notification = document.getElementById("wtp_notification-wrapper");

        var getMode = await schemeMode();
        if(getMode.mode === 'dark'){
            TMExt_$("#wtp_notification-wrapper #setting_content h2").text(g_oRatingSetPopupString.DarkTitle);
            TMExt_$("#mode_view").addClass("dark");
        }else{
            TMExt_$("#mode_view").removeClass("dark");
        }

        TMExt_$('input[type=radio][name=isHighLight]').change(function() {
            if (this.value == '1') {
                TMExt_$("#mode_view").addClass("bg");
            }
            else if (this.value == '0') {
                TMExt_$("#mode_view").removeClass("bg");
            }
        });

        TMExt_$(`input[type=radio][name=isHighLight][value=${g_bisHighLight * 1}]`).click();        
        notification.classList.add("show");

        let currnetUrl = new URL(document.location.href);
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEED_UBM, 
            params: {
                event: UBM_ID.RATING_SETTING_POPUP_SHOW,
                value: JSON.stringify({
                    'Browser': g_currentBrowser,
                    'host': currnetUrl.hostname,
                    'mode': getMode.mode,
                    "initialSetting": !!g_bisHighLight,
                })
            }
        });

        // event
        TMExt_$("#ID_ratingSettingWindow .notification-close").bind('click', function() {
            notification.classList.remove("show");
            TMExt_$("#wtp_notification_mask").removeClass("show");
            let GetUBMID;
            if(TMExt_$(this).hasClass("applyed")){
                GetUBMID = UBM_ID.RATING_SETTING_POPUP_CLOSE_BUTTON_CLICK;
            } else {
                setPopupStatus(true, false);
                GetUBMID = UBM_ID.RATING_SETTING_POPUP_APPLIED_CLOSE_BUTTON_CLICK;
            }
            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: GetUBMID,
                    value: JSON.stringify({
                        'Browser': g_currentBrowser,
                        'host': currnetUrl.hostname
                    })
                }
            });        
        });

        TMExt_$("#ID_ratingSettingWindow #notification_remindlater").bind('click', function() {
            notification.classList.remove("show");
            TMExt_$("#wtp_notification_mask").removeClass("show");
            setPopupStatus(true, false);

            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: UBM_ID.RATING_SETTING_POPUP_REMIND_LATER_LINK,
                    value: JSON.stringify({
                        'Browser': g_currentBrowser,
                        'host': currnetUrl.hostname
                    })
                }
            });        
        });
        
        TMExt_$(`#${D_TSRExplainHowToolbarWorksIkbLinkID}`).bind('click', function() {
            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: UBM_ID.RATING_SETTING_POPUP_EXPLAIN_HOW_TOOLBAR_WORKS_LINK,
                    value: JSON.stringify({
                        'Browser': g_currentBrowser,
                        'host': currnetUrl.hostname
                    })
                }
            });
            if (!ExplainHowToolbarWorksIKBURL){
                return;
            }
            window.open(ExplainHowToolbarWorksIKBURL);          
        });
        
        TMExt_$("#ID_ratingSettingWindow #how_update_pagerating_link").bind('click', function() {

            notification.classList.remove("show");

            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: UBM_ID.RATING_SETTING_POPUP_SETTING_LINK,
                    value: JSON.stringify({
                        'Browser': g_currentBrowser,
                        'host': currnetUrl.hostname,
                        "initialSetting": TMExt_$("#ID_ratingSettingWindow #applied_content").attr('initialSetting'),
                        "finalSetting": TMExt_$("#ID_ratingSettingWindow #applied_content").attr('finalSetting'),
                        "mode": getMode.mode
                    })
                }
            });
            notification.classList.remove("show");
            window.browser.runtime.sendMessage({
                'action': TB_ACTIONS.RATINGCREATETABS, 
                'url': 'js/common/index.html#entry=settings'
            })
        });

        TMExt_$("#ID_ratingSettingWindow .notification_apply").bind('click', function() {

            var isHighLight = TMExt_$('input[type=radio][name=isHighLight]:checked').val();
            resetResult(parseInt(isHighLight));

            TMExt_$("#ID_ratingSettingWindow #setting_content").css("display", "none");
            TMExt_$("#ID_ratingSettingWindow #applied_content").css("display", "block");
            TMExt_$("#ID_ratingSettingWindow #applied_content").attr('initialSetting',!!g_bisHighLight);
            TMExt_$("#ID_ratingSettingWindow #applied_content").attr('finalSetting',!!parseInt(isHighLight));
            TMExt_$("#wtp_notification_mask").removeClass("show");
            TMExt_$("#ID_ratingSettingWindow .notification-close").addClass("applyed");
            setPopupStatus(true, true);

            // open ikb link
            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM, 
                params: {
                    event: UBM_ID.RATING_SETTING_POPUP_APPLY_BUTTON_CLICK,
                    value: JSON.stringify({
                        'Browser': g_currentBrowser,
                        'host': currnetUrl.hostname,
                        "initialSetting": !!g_bisHighLight,
                        "finalSetting": !!parseInt(isHighLight),
                        "mode": getMode.mode
                    })
                }
            });
        });

    }
    exports.ratingSettingPopup = ratingSettingPopup;

    //Adjust UI for Bing search
    /*
        <h2>
            <span class="TSRSpan"></span>
            <a><span> favicon icon</span></a>
            <a>search title wording</a>
        </h2>
    */
    function ForSRBingUI(objResult){
        if(window.location.host.startsWith('www.bin') &&  window.location.pathname === "/search"){
            let getIconNode = objResult.node.firstChild.nodeName === 'SPAN';
            let nextSibling = objResult.node.nextElementSibling;
            let prevSibling = objResult.node.previousElementSibling; //TRSpan icon

            if(getIconNode && prevSibling){
                let getBG = window.getComputedStyle( objResult.node ,null).getPropertyValue('background-color');
                let getIconMargin = window.getComputedStyle( objResult.node.firstChild ,null).getPropertyValue('margin-left') === '-22px';

                if(getIconMargin){
                    prevSibling.style.position = 'absolute';
                    objResult.node.style.paddingRight = '22px';
                    objResult.node.style.backgroundColor = "";
                    nextSibling.style.backgroundColor = getBG;
                }
            }
        }
    }

    async function TSRHightlightById(iResultID, bHighLight) {
        var objResult = g_oEnv.Parser.rgobjSearchResult[iResultID];
        if (objResult) {
            var getMode = await schemeMode();
            var isBaidu = getMode.entry === "www.baidu.com";
            var strColor = D_TSRHIGHLIGHT_COLOR_OFF;
    
            if (bHighLight && g_oRatingLevel[objResult.level]) {
                if(getMode.mode === 'dark'){
                    if (isBaidu){
                        strColor = `rgb(${g_oRatingLevel[objResult.level].DarkBaiduHeightlight}, 1)`;
                    } else {
                        strColor = `rgb(${g_oRatingLevel[objResult.level].DarkHeighlight}, 1)`;
                    }
                }else{
                    strColor = `rgb(${g_oRatingLevel[objResult.level].Highlight}, 1)`;
                }
            }
    
            var objElement = objResult.FindInsertNode();
            var bIsHighLight = true;
            if (objElement && objElement.childNodes) {
                for (var i = 0; i < objElement.childNodes.length; ++i) {
                    var aChild = objElement.childNodes[i];
                    if (aChild && aChild.tagName && aChild.tagName.toUpperCase() === 'DIV') {
                        bIsHighLight = false;
                        break;
                    }
                }
            }
    
            //by default is undefined
            var bHighLightFromPattern = !objElement.NotHighLight;
            if (bHighLightFromPattern && bIsHighLight && objElement && objElement.style) {
                objElement.style.backgroundColor = strColor;
            }

            //Adjust UI for Bing search
            ForSRBingUI(objResult);
        }
    }
    exports.TSRHightlightById = TSRHightlightById;

    function TSRHighlight(bHighLight) {
        g_bisHighLight = bHighLight;
        for (var iCount = 1; iCount < g_oEnv.Parser.rgobjSearchResult.length; iCount++) {
            TSRHightlightById(iCount, bHighLight);
        }
    }
    
    function TSRMouseOverShowTips(bMouseOverShow) {
        g_bisMouseOverShowToolTip = bMouseOverShow;
    }

    function TSRInsertResultICON(iResultID, iRatedLevel, bPhishing, entry) {
        if (!g_oEnv.Parser.rgobjSearchResult[iResultID] || !g_oRatingLevel[iRatedLevel] || TrendMicro.TB.isDocumentEditable()) {
            return;
        }

        var objResult = g_oEnv.Parser.rgobjSearchResult[iResultID];
        if (objResult.resulted) {
            // This URL has been rated.
            return;
        }
        g_oEnv.Parser.iRatingNumber++;

        objResult.resulted = true;
        objResult.level = iRatedLevel;
        objResult.phishing = bPhishing;
        objResult.entry = entry;
        
        if (objResult.imageCallback) {
            return objResult.imageCallback(objResult);
        }
        
        /*if (objResult.ShowRatingResultUI && !objResult.ShowRatingResultUI())
         {
         // At this level, don't show icon and high light on this URL.
         g_oEnv.Parser.rgobjSearchResult[iResultID] = null;
         return;
         }*/
    
        
        var spanIcon = null;
        if (objResult.spanIcon && objResult.spanIcon.nodeName === 'SPAN') {
            spanIcon = objResult.spanIcon;
        } else {
            spanIcon = document.createElement('SPAN');
        }
    
        objResult.spanIcon = spanIcon;
    
        spanIcon.className = 'TSRSpan';
    
        if( (window.location.host.startsWith('www.google') &&  window.location.pathname === "/search") ||
            (window.location.host.startsWith('search.yahoo') &&  window.location.pathname === "/search")
        ){
            objResult.node.classList.add("GSPGTitle");
            spanIcon.classList.add("GSPGIcon");
        }

        const getADinYahooMail = objResult.node.getAttribute('rel') === 'noreferrer';
        if(window.location.host.startsWith('mail.yahoo.com') && getADinYahooMail){
            spanIcon.classList.add("iconInYahooGlobalMailAD");
        }

        var objInsertNode = objResult.FindInsertNode();
        let isInsertSpan = false;
        let preNode = objInsertNode.previousElementSibling;

        if(preNode){
            let preNodeId = preNode.id;
            console.log(preNodeId);

            if(preNodeId.includes('TSRSpan')){
                isInsertSpan = true;
                console.log(isInsertSpan);
            }

            // preview mail will add pagerating icon on it. if not send mail, content will auto save and add icon in mail content.
            // const haveTofuBox = preNode && preNodeId.includes('TSRSpan');
            // if (haveTofuBox) {
            //     document.getElementById(preNodeId).remove();
            // }
        }

        if (!objInsertNode || !objInsertNode.parentNode) {
            // Inserting Node didn't exist, Abort.
            return;
        }
    
        if (g_bIsNeedCheckSPan) {
            if (objInsertNode.parentNode.childNodes && objInsertNode.parentNode.childNodes.length >= 2) {
                var childObj = objInsertNode.previousSibling;
                if (childObj && childObj.tagName === 'SPAN' && childObj.className === 'TSRSpan') {
                    //If it has been rated, just return
                    return;
                }
    
            }
        }
    
        if(!isInsertSpan){
            objInsertNode.parentNode.insertBefore(spanIcon, objInsertNode);
        }
    
        /*
         * Setting event handler
         */
        spanIcon.id = D_TSRSpanIDPrefix + parseInt(iResultID, 10);
        spanIcon.onmouseout = TSRSetToolTipTimer;
        spanIcon.onmouseover = TSRShowToolTip;
        spanIcon.onclick = TSRShowToolTip;
        spanIcon.TSRID = parseInt(iResultID, 10);
        spanIcon.TSRResult = objResult;
        var imgIcon = document.createElement('IMG');
    
        imgIcon.className = 'TSRWebRatingIcon';
        imgIcon.src = TSREscapeURL(g_oRatingLevel[iRatedLevel].WebIcon);

        imgIcon.style.width = g_oImgDefine.ImgSize.WarningIcon.width + 'px';
        imgIcon.style.height = g_oImgDefine.ImgSize.WarningIcon.height + 'px';
        imgIcon.style.border = '0px';
        const ratingLevel = g_oRatingLevel_mapping.filter(level => level.id === objResult.level);
        imgIcon.setAttribute("data-status",ratingLevel[0].key)
        spanIcon.appendChild(imgIcon);
    
        if (g_bisHighLight) {
            TSRHightlightById(iResultID, g_bisHighLight);
        }
        if (objResult.AdjustNodeStyle) {
            objResult.AdjustNodeStyle(objInsertNode);
        }
    
        //Insert Alert Friend Icon to supported SNS
        if (TitaniumFeatureConfig.EnableFacebookAlertYourFriend) {
            if (g_bIsFirefoxLargerThan3_6_x && typeof (TSNSInsertAlertICON) != 'undefined') {
                TSNSInsertAlertICON(objResult);
            }
        }
        if(typeof (TSNSFeedbackUnsafeURL) != 'undefined') {
            TSNSFeedbackUnsafeURL(objResult);
        }
    }
    exports.TSRInsertResultICON = TSRInsertResultICON;
    
    function getYahooMailConIframe() {
        const htmlMail = TMExt_$('[data-cy="htmlMail"]');
        if (htmlMail){
            return htmlMail;
        } else{
            return false;       
        }
    }

    function UMSCreateTooltip() {
        var tooltip = TMExt_$('<div id="UMS_TOOLTIP"></div>');
        tooltip.css({
                    'position': 'absolute',
                    'cursor': 'pointer',
                    'z-index': 2147483647,
                    'background': 'transparent',
                    'top': '-100000px',
                    'left': '-100000px'
                    });

        if (window.location.host ==='mail.yahoo.co.jp'){
            let yahooCon = getYahooMailConIframe();
            if (yahooCon){
                if (yahooCon.contents().find("#UMS_TOOLTIP").length === 0){
                    tooltip.appendTo(yahooCon.contents().find('body'));
                }
            }
            return yahooCon.contents().find('#UMS_TOOLTIP');
        }else{
            if (TMExt_$('#UMS_TOOLTIP').length === 0) {
                tooltip.appendTo(TMExt_$('body'));
            }
            return TMExt_$('#UMS_TOOLTIP');
        }

    }    exports.UMSCreateTooltip = UMSCreateTooltip;
    exports.UMSCreateTooltip = UMSCreateTooltip;
    
    function UMSClearToolHideTipTimer() {
        if (g_oEnv.UMSTooltip.iUMSHideTimerID) {
            clearTimeout(g_oEnv.UMSTooltip.iUMSHideTimerID);
            g_oEnv.UMSTooltip.iUMSHideTimerID = null;
        }
    }
    
    function TUMSCalculateOffset(objSrcElement) {
        var pos = TSRGetOffset(objSrcElement);
        var offsetLeft = pos.left - g_oImgDefine.ImgSize.WarningIcon.width;
    
        if (offsetLeft > 0) {
            pos.left = offsetLeft;
        }
    
        return pos;
    }
    
    function UMSShowToolTip(iRatedLevel) {
        var umsToolTip = UMSCreateTooltip();
        var objSrcElement = g_manual_rating.gCurrentEvent;

        /*
         * Disable timer to hide ToolTip
         */
        UMSClearToolHideTipTimer();
    
        /*
        * calculate top and left position of tooltip div and show it
        */
        //var posToolTip = TSRCalculateOffset(objSrcElement);
        var pos = TUMSCalculateOffset(objSrcElement);
        //(event.pageX + 12) (event.pageY + 12)
        umsToolTip[0].style.left = pos.left + D_PIXEL_UNIT;
        umsToolTip[0].style.top = pos.top + D_PIXEL_UNIT;

        // Send UBM
        let currnetUrl = new URL(document.location.href);
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEED_UBM, 
            params: {
                event: UBM_ID.RATING_URLS_MOUSEOVER_TOOLTIP,
                value: JSON.stringify({
                    'rating': iRatedLevel,
                    'entry': 'ManualRating',
                    'host': currnetUrl.hostname
                })
            }
        });
    
        return false;
    }
    
    function UMSHideToolTip() {
        var umsToolTip;
        if (window.location.host ==='mail.yahoo.co.jp'){
            let yahooCon = getYahooMailConIframe();
            if (yahooCon){
                umsToolTip = yahooCon.contents().find('#UMS_TOOLTIP');
            }
        }else {
            umsToolTip = TMExt_$('#UMS_TOOLTIP');
        }

        // document.getElementById(D_TSRToolTipID);
        // need to move to TISProToolbarDefine.js
    
        if (umsToolTip.length !== 0) {
            umsToolTip[0].style.left = '-100000px';
            umsToolTip[0].style.top = '-100000px';
    
            var imgIcon = TMExt_$('#ums_img_tooltip');
            imgIcon.hide();
        }
    }
    
    function UMSSetToolTipShowTimer(global_manual_rating, iRatedLevel, url) {
        if (global_manual_rating.gMouseLeaveFlag === 1 && global_manual_rating.getCurrentNode() === url) {
            //last check if it's mouse is still on the node before show it.
            UMSShowToolTip(iRatedLevel);
        }
    }
    
    function UMSSetToolTipHideTimer() {
        UMSClearToolHideTipTimer();
        g_oEnv.UMSTooltip.iUMSHideTimerID = setTimeout(UMSHideToolTip, 500);
    }
    exports.UMSSetToolTipHideTimer = UMSSetToolTipHideTimer;

    function UMSInsertResultICON(global_manual_rating, iRatedLevel, url) {
        if (global_manual_rating.gMouseLeaveFlag === 0 || global_manual_rating.getCurrentNode() !== url) {
            TMExt_debug('Mouse is not in the node');
            //first check if it's mouse is still on the node
            return;
        }
    
        var target = global_manual_rating.getCurrentTarget();
    
        var objResult = {
            id: -1, //not used
            node: target[0],
            FindInsertNode: function() {
                return this.node;
            },
            AdjustNodeStyle: undefined
        };
        objResult.level = iRatedLevel;
        var strURL = objResult.node.href;
        try {
            objResult.link = decodeURIComponent(strURL);
        } catch (e) {
            objResult.link = strURL;
        }
    
        var objTMDom = new TMDOMObj(objResult.node);
        objResult.text = objTMDom.innerText() || strURL;

        UMSCreateTooltip();

        var umsTooltipImgIcon = TMExt_$("<img id='ums_img_tooltip' class='UMSRatingIcon' src=''/>");
        var imgIcon;

        if (window.location.host ==='mail.yahoo.co.jp'){
            let yahooCon = getYahooMailConIframe();
            if (yahooCon.contents().find('#ums_img_tooltip').length === 0) {
                umsTooltipImgIcon.appendTo(yahooCon.contents().find('#UMS_TOOLTIP'));
            }
            imgIcon = yahooCon.contents().find("#ums_img_tooltip")
        }else{
            if (TMExt_$('#ums_img_tooltip').length === 0) {
                umsTooltipImgIcon.appendTo(TMExt_$('#UMS_TOOLTIP'));
            }
            imgIcon = TMExt_$('#ums_img_tooltip');
        }

        var imgIconTag = imgIcon[0];
       
        imgIconTag.src = TSREscapeURL(g_oRatingLevel[iRatedLevel].WebIcon);
        imgIconTag.style.width = g_oImgDefine.ImgSize.WarningIcon.width + 'px';
        imgIconTag.style.height = g_oImgDefine.ImgSize.WarningIcon.height + 'px';
        imgIconTag.style.border = '0px';
    
        imgIconTag.TSRID = -1;
        imgIconTag.TSRResult = objResult;
    
        UMSSetToolTipShowTimer(global_manual_rating, iRatedLevel, url);
    
        imgIcon.unbind();
        imgIcon.mouseout(function(event) {
            global_manual_rating.gMouseLeaveFlag = 0;
            TSRSetToolTipTimer();
            UMSSetToolTipHideTimer(event);
        });
    
        imgIcon.mouseover(function(event) {
            global_manual_rating.gMouseLeaveFlag = 1;
            TSRShowToolTip(event);
            UMSClearToolHideTipTimer();
        });
    
        imgIcon.click(function(event) {
            global_manual_rating.gMouseLeaveFlag = 1;
            TSRShowToolTip(event);
            UMSClearToolHideTipTimer();
        });
        
        imgIcon.show();
    }
    exports.UMSInsertResultICON = UMSInsertResultICON;
    
    function TSRChangeResultICON(iResultID, iRatedLevel) {
        if (!g_oEnv.Parser.rgobjSearchResult[iResultID] || !g_oRatingLevel[iRatedLevel]) {
            return;
        }
        var objResult = g_oEnv.Parser.rgobjSearchResult[iResultID];
    
        if (!objResult.resulted) {
            // This URL has not been rated.
            return;
        }
    
        if (!objResult.orglevel) {
            objResult.orglevel = objResult.level;
        }
        objResult.level = iRatedLevel;
    
        var spanIcon = document.getElementById(D_TSRSpanIDPrefix + parseInt(iResultID, 10));
        if (!spanIcon) {
            return;
        }
    
        /*
         * Get Rating Icon
         */
        var imgIcon = spanIcon.firstChild;
        imgIcon.src = TSREscapeURL(g_oRatingLevel[iRatedLevel].WebIcon);
        TSRHightlightById(iResultID, g_bisHighLight);
    }
    
    function TSRIsFinishedSRRating() {
        return (g_oEnv.Parser.iRatingNumber === g_oEnv.Parser.iResultNumber);
    }
    
    function TSRGetRatingFlowID() {
        return g_oEnv.Parser.iParserFlowID;
    }

    exports.TSRGetRatingFlowID = TSRGetRatingFlowID;
    
    /*************************************************
     * Utility Function                              *
     *************************************************/
    function htmlEncode(strText) {
        var divNode = document.createElement('div');
        var textNode = document.createTextNode(strText);
        divNode.appendChild(textNode);
        return divNode.innerHTML;
    }
    
    function htmlDecode(strText) {
        var divNode = document.createElement('div');
        divNode.innerHTML = strText;
        return divNode.innerHTML;
    }
    
    function TSRTruncateText(strText, bWordBound) {
        var nStrIndex = TSRByteLength(strText, D_SITE_MSG_TRUNCATE_LIMIT - D_SITE_MSG_TRUNCATE_SUFFIC.length);
        if (nStrIndex > 0) {
            var strTruncatedText = strText.substr(0, nStrIndex);
    
            if (bWordBound) {
                var iPos = TSRFindSeparator(strTruncatedText);
                if (iPos > 0) {
                    strTruncatedText = strTruncatedText.substr(0, iPos + 1);
                }
            }
    
            strTruncatedText += D_SITE_MSG_TRUNCATE_SUFFIC;
            return strTruncatedText;
        }
        return strText;
    }
    
    function TSRByteLength(strText, lLimitLength) {
        var byteSize = 255;
        var lCalcLen = 0;
        var nWideCount = 0;
        var nCapCount = 0;
        var nCutIndex = 0;
    
        for (var iIndex = 0; iIndex < strText.length; iIndex++, lCalcLen++) {
            var iCodeChar = strText.charCodeAt(iIndex);
            var cChar = strText.charAt(iIndex);
    
            // WideChar, each widechar supports that
            // it may be need two byte spaces
            if (byteSize < iCodeChar) {
                //lCalcLen += 1;
                nWideCount++;
                if (0 === nWideCount % 2) {
                    lCalcLen += 3;
                }
            }
    
            // Upper Case Letter, three etters support
            // that it may be need four byte spaces
            else if (cChar >= 'A' && cChar <= 'Z') {
                nCapCount++;
                if (0 === nCapCount % 4) {
                    lCalcLen++;
                }
            }
    
            if (lCalcLen > lLimitLength && nCutIndex <= 0) {
                nCutIndex = iIndex - 1;
                break;
            }
        }
    
        if (0 !== nWideCount % 2) {
            lCalcLen++;
        }
        return nCutIndex;
    }

    function TSRFindSeparator(strText) {
        var iIndex = 0;
        var strSeparators = ' -.:/|';
    
        for ( iIndex = strText.length - 1; iIndex >= 0; iIndex--) {
            var iCodeChar = strText.charCodeAt(iIndex);
            var cChar = strText.charAt(iIndex);
    
            if (strSeparators.indexOf(cChar) > -1 || iCodeChar > 255) {
                return iIndex;
            }
        }
        
        return iIndex;
    }
    
    function TMExt_debug(msg) {
        logInfo(msg);
    }
    exports.TMExt_debug = TMExt_debug;
        
    var TrendMicro = {};
    TrendMicro.TB = {};
    TrendMicro.TB = {};
    TrendMicro.TB.console = {};
    TrendMicro.TB.console.info = function(msg) {
        return;
    };
    
    TrendMicro.TB.extend = function(a, b) {
        for (var p in b) {
            a[p] = b[p];
        }
    };
    TrendMicro.TB.$ = function(id) {
        return document.getElementById(id);
    };
    TrendMicro.TB.Each = function(values, handler) {
        for (var i = 0, j = 0; j = values[i]; i++) {
            handler(j);
        }
    };
    TrendMicro.TB.reduce = function(elems, judgeFunction) {
        var results = [];
        for (var i = 0; i < elems.length; i++) {
            var j = elems[i];
            if (j && judgeFunction(j)) {
                results.push(j);
            }
        }
        return results;
    };
    
    TrendMicro.TB.TrimSpace = function(s) {
        return s.replace(/^\s*|\s*$/g, '');
    };
    TrendMicro.TB.FindChar = function(s, chars) {
        var i = 0;
        while (s.charAt(i) && -1 === chars.indexOf(s.charAt(i))) {
            ++i;
        }
        return s.charAt(i) ? {
            c: s.charAt(i),
            i: i
        } : {
            c: null,
            i: -1
        };
    };
    TrendMicro.TB.NodeListToArray = function(nodelist) {
        var results = [];
        for (var i = 0; i < nodelist.length && nodelist[i]; i++) {
            results.push(nodelist[i]);
        }
        return results;
    };
    
    TrendMicro.TB.hasClass = function(node, matchRule) {
        return ((' ' + node.className + ' ').indexOf(' ' + matchRule + ' ') !== -1);
    };
    
    TrendMicro.TB.$S = function(selector) {
        var selectorF = function(key, parent) {
            var results = [];
            if (key.substr(0, 1) === '#') {
                var elem = TrendMicro.TB.$(key.substr(1));
                results.push(elem);
            } else {
                if (key.substr(0, 1) === '.') {
                    key = '*' + key;
                }
                var index = TrendMicro.TB.FindChar(key, '[');
                TrendMicro.TB.console.info('key=' + key + 'i=' + index.i + ',c=' + index.c);
                if (index.i === -1) {
                    TrendMicro.TB.console.info('tag=' + key + ',parent=' + parent.innerHTML);
                    results = TrendMicro.TB.NodeListToArray(parent.getElementsByTagName(key));
                } else if (index.c === '[') {
                    var tag = key.substr(0, index.i);
                    TrendMicro.TB.console.info('tag=' + tag + ',parent=' + parent + ',parent.getElementsByTagName(tag),' + parent.getElementsByTagName(tag).length);
                    results = TrendMicro.TB.NodeListToArray(parent.getElementsByTagName(tag));
                    var rightBracket = key.indexOf(']');
                    if (-1 === rightBracket) {
                        throw 'can not find right bracket';
                    }
                    var sExtendRule = key.substring(index.i + 1, rightBracket);
                    TrendMicro.TB.console.info('sExtendRule=' + sExtendRule);
                    var sKV = sExtendRule.split('=');
    
                    var name = sKV[0];
                    var value = sKV[1];
                    TrendMicro.TB.console.info('name=' + name + ',value=' + value);
                    if (name && value) {
                        if (name === 'hasClass') {
                            TrendMicro.TB.console.info('results of get tag=' + results.length);
                            results = TrendMicro.TB.reduce(results, function(node) {
                                //TrendMicro.TB.console.info('TrendMicro.TB.hasClass(node,value)='+TrendMicro.TB.hasClass(node,value));
                                return TrendMicro.TB.hasClass(node, value);
                            });
                        } else if (name === 'custom') {
                            results = TrendMicro.TB.reduce(results, function(node) {
                                return eval(value + '(node)');
                            });
                        }
                    }
                }
            }
            return results;
        };
        
        var keys = selector.split(' ');
        var results = [];
        for (var i = 0; i < keys.length && keys[i]; i++) {
            var parents = results.length ? results : [document];
            results = [];
            var k = TrendMicro.TB.TrimSpace(keys[i]);
            for (var j = 0; j < parents.length && parents[j]; j++) {
                results = results.concat(selectorF(k, parents[j]));
            }
            if (!results.length) {
                break;
            }
        }
        
        return results;
    };
    TrendMicro.TB.isRated = function(node) {
        var _isRated = false;
        if (node && node.parentNode) {
            if (node.parentNode.childNodes && node.parentNode.childNodes.length >= 2) {
                var spanE = node.previousSibling;
                if (spanE && spanE.tagName === 'SPAN' && spanE.className === 'TSRSpan') {
                    _isRated = true;
                }
            }
        }
        TrendMicro.TB.console.info('node=' + node + '_isRated=' + _isRated);
        return _isRated;
    };
    
    TrendMicro.TB.InRatingQueue = function(node, oldend) {
        var objs = g_oEnv.Parser.rgobjSearchResult;
        // error in here
        for (var i = oldend - 1; i >= 1; i--) {
            if (objs[i] && objs[i].node === node) {
                return true;
            }
            // in queue
        }
        return false;
    };
    
    TrendMicro.TB.InImageRatingQueue = function (node, oldend) {
        var objs = g_oEnv.Parser.rgobjSearchResult;
        // error in here
        for (var i = oldend - 1; i >= 1; i--) {
            if (objs[i] && objs[i].node === node && objs[i].resulted == true) {
                return true;
            }
            // in queue
        }
        return false;
    };

    TrendMicro.TB.GetImgRatedObject = function (node, oldend) {
        var objs = g_oEnv.Parser.rgobjSearchResult;
        // error in here
        for (var i = oldend - 1; i >= 1; i--) {
            if (objs[i] && objs[i].node === node && objs[i].resulted == true) {
                return objs[i];
            }
            // in queue
        }
        return null;
    };
    
    TrendMicro.TB.ReduceNewNode = function(start) {
        var objs = g_oEnv.Parser.rgobjSearchResult;
        var end = g_oEnv.Parser.rgobjSearchResult.length;
        for (var i = end - 1; i >= start; i--) {
            var n = objs[i] ? objs[i].node : undefined;
            if (n && TrendMicro.TB.isRated(n) || TrendMicro.TB.InRatingQueue(n, start)) {
                delete objs[i];
            }
        }
    
        var lastNode = end - 1;
        for (; lastNode >= start; lastNode--) {
            if (objs[lastNode] != undefined) {
                break;
            }
        }
        objs.length = lastNode + 1;
    
        g_oEnv.Parser.iResultNumber = objs.length <= 0 ? 0 : objs.length - 1;
    };
    
    TrendMicro.TB.ReduceImageNewNode = function (start) {
        var objs = g_oEnv.Parser.rgobjSearchResult;
        var end = g_oEnv.Parser.rgobjSearchResult.length;
        for (var i = end - 1; i >= start; i--) {
            var n = objs[i] ? objs[i].node : undefined;
            if (n && TrendMicro.TB.InImageRatingQueue(n, start)) {
                delete objs[i];
            }
        }

        var lastNode = end - 1;
        for (; lastNode >= start; lastNode--) {
            if (objs[lastNode] != undefined) {
                break;
            }
        }
        objs.length = lastNode + 1;

        g_oEnv.Parser.iResultNumber = objs.length <= 0 ? 0 : objs.length - 1;
    };
    
    TrendMicro.TB.FindTargetLinks = function(uriPattern, ratedLinkPath, options) {
        var options_ = {
            isRated: TrendMicro.TB.isRated,
            blacklist: []
        };
        if (options) {
            TrendMicro.TB.extend(options_, options);
        }
        var elems = TrendMicro.TB.$S(ratedLinkPath);

        //remove rated elements
        if (options_.blacklist.length) {
            var blackListReg = [];
            for (var i = options_.blacklist.length - 1; i >= 0; --i) {
                blackListReg.push(new RegExp(options_.blacklist[i], 'i'));
            }
    
            elems = TrendMicro.TB.reduce(elems, function(node) {
                try {
                    var url = node && node.href;
                    if (url) {
                        for (var i = options.blacklist.length - 1; i >= 0; --i) {
                            if (blackListReg[i].test(url)) {
                                return false;
                            }
                        }
                    }
                } catch (e) {
                    return false;
                }
    
                return true;
            });
        }
        elems = TrendMicro.TB.reduce(elems, function(node) {
            if (options_.isRated(node)) {
                return false;
            } else {
                var objs = g_oEnv.Parser.rgobjSearchResult;
                // error in here
                for (var i = 1, j = 0; j = objs[i]; ++i) {
                    if (j && j.node === node) {
                        return false;
                    }
                    // in queue
    
                }
            }
            return true;
        });
        //
        TrendMicro.TB.console.info('elems=' + elems.length);
        return elems;
    };
    
    TrendMicro.TB.ClearResultedNode = function() {
        var reduceResultedNodes = function(list) {
            for (var i = 1, j = 0; j = list[i]; ++i) {
                if (j.resulted) {
                    delete list[i];
                }
            }
        };
        reduceResultedNodes(g_oEnv.Parser.rgobjSearchResult);
        var reduceNodes = function() {
            var objs = g_oEnv.Parser.rgobjSearchResult;
            for (var i = objs.length - 1; i >= 0; i--) {
    
                if (objs[i] === undefined) {
                    objs.length--;
                } else {
                    break;
                }
    
            }
            g_oEnv.Parser.iResultNumber = objs.length <= 0 ? 0 : objs.length - 1;
        };
        reduceNodes();
    };
    
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
                        if (spanE && spanE.tagName === 'SPAN' && spanE.className === 'TSRSpan') {
    
                            _isRated = true;
                        }
                    }
                }
            }
        };
        if (options) {
            TrendMicro.TB.extend(options_, options);
        }
        this.urlPathPattern = urlPathPattern;
        this.selector = selector;
        this.options = options_;
    
    };
    
    TrendMicro.TB.TBSet = function() {
        //contain all the TSRLocatedNodes
        this.Nodes = [];
    
    };
    
    TrendMicro.TB.TBSet.prototype.getNodesCount = function() {
        return this.Nodes.length;
    };
    
    TrendMicro.TB.TBSet.prototype.isNodeExist = function(node) {
        var exist = false;
        for (var i = 0; i < this.Nodes.length; i++) {
            if (this.Nodes[i] === node) {
                exist = true;
                break;
            }
        }
    
        return exist;
    };
    
    TrendMicro.TB.TBSet.prototype.addNode = function(node) {
        var isExist = this.isNodeExist(node);
    
        if (!isExist) {
            this.Nodes.push(node);
        }
    };

    TrendMicro.TB.TBSet.prototype.createResultNodes = function(fnAdjustStyle, noFilterImg) {
        for (var i = 0; i < this.Nodes.length; i++) {
            CreateTSRResultObject(this.Nodes[i], this.Nodes[i].href, null, null, fnAdjustStyle, noFilterImg);
        }
    };
    
    TrendMicro.TB.TBSet.prototype.filterByHref = function(pattern) {
        if (!pattern) {
            return;
        }
    
        var ptn;
        var finalNodes = [];
        for (var i = 0; i < this.Nodes.length; i++) {
            if (!this.Nodes[i].href) {
                continue;
            }
    
            var match = false;
            for (var j = 0; j < pattern.length; j++) {
                ptn = new RegExp(pattern[j], '');
                if (ptn.test(this.Nodes[i].href)) {
                    match = true;
                    break;
                }
            }
    
            if (match) {
                continue;
            }
            finalNodes.push(this.Nodes[i]);
        }
    
        this.Nodes = finalNodes.slice(0);
    };
    
    TrendMicro.TB.TBSet.prototype.filterByContent = function(pattern) {
        if (!pattern) {
            return;
        }
    
        var ptn;
        var finalNodes = [];
        var content;
        for (var i = 0; i < this.Nodes.length; i++) {
            content = this.Nodes[i].innerHTML;
            if (!content) {
                continue;
            }
    
            var match = false;
            for (var j = 0; j < pattern.length; j++) {
                ptn = new RegExp(pattern[j], 'i');
                if (ptn.test(content)) {
                    match = true;
                    break;
                }
            }
    
            if (match) {
                continue;
            }
            finalNodes.push(this.Nodes[i]);
        }
    
        this.Nodes = finalNodes.slice(0);
    };

    TrendMicro.TB.isDocumentEditable = function(pattern) {
        var bodys = document.getElementsByTagName('body');
        var contenteditable = 'false';
        if (bodys.length > 0) {
            contenteditable = bodys[0].getAttribute('contenteditable');
        }
        var editable = (document.designMode === 'on') || contenteditable === '' || contenteditable === 'true';
        
        var enableEditBody = editable;
        return enableEditBody;
    };
    
    TrendMicro.TB.DOMIdExist = function(id)
    {
        if (document.getElementById(id)) {
            return true;
        }
    
        return false;
    };
    
    /*
        Safe Searching (Image block)
    */
    TrendMicro.TB.SAFESEARCHING = (function(){
        var ID_IMAGE_BLOCK_POPUP = "ID_TSRImageBlockPopup";
        var FADE_IN_TIME_INTEVAL = 200;
        
        var constructImageBlockPopup = function(){           
            var strContent = 
            
            '<div id="' + ID_IMAGE_BLOCK_POPUP + '" class="TSRImageBlock_Root">' + 
                '<div class="TSRImageBlock_Wrapper">' +
                    '<div class="TSRImageBlock_body">' +
                        '<div class="TSRImageBlock_body_title">' +
                            g_oSafeSearchingString["warnUserTitle"] +
                        '</div>' + 
                        '<div class="TSRImageBlock_body_desc">' +
                            g_oSafeSearchingString["reallyNeedToSeeUntilRestart"] + 
                        '</div>' + 
                    '</div>' + 
                    '<div class="TSRImageBlock_footer">' +
                        '<div class="TSRImageBlock_footer_logo" style="background-image: url(' + TSREscapeURL("PC_Icon_Guide_16.png") + ')">' +
                        '</div>' + 
                        '<div class="TSRImageBlock_footer_productName">' +
                            D_TSRToolTipTitleString + 
                        '</div>' + 
                    '</div>' +    
                '</div>' +
            '</div>';
            
            return TMExt_$(strContent);    
        }
        
        var checkImageBlockPopupExist = function(){
            if(TMExt_$('#' + ID_IMAGE_BLOCK_POPUP).length === 0){
                var popup = constructImageBlockPopup();
                popup.bind('mouseleave', function(){
                    TMExt_$(this).hide();
                });
                popup.find(".provide_password").bind('click', function() {
                    if (typeof (SetTempImageSafeSearchStatus) !== 'undefined'){
                        SetTempImageSafeSearchStatus(function(){
                            location.reload();
                        });
                    }
                });
                TMExt_$('body').append(popup);
            }
        }
        
        var reserve_distance = 5;
        
        var bindMouseEnterEvent = function($obj){
            $obj.bind('mouseenter', function(){
                var TMExt_$popup = TMExt_$('#' + ID_IMAGE_BLOCK_POPUP);
                
                // reset style of this popup before show it to user
                TMExt_$popup.css("width", "auto");
                TMExt_$popup.css("height", "auto"); 
                
                // TMExt_$popup.show();
                TMExt_$popup.fadeIn(FADE_IN_TIME_INTEVAL, function(){
                    
                });
                
                // set position
                var a_offset = TMExt_$(this).offset();
                var width_sub = (TMExt_$(this).width() - TMExt_$popup.width());
                var height_sub = (TMExt_$(this).height() - TMExt_$popup.height());
                
                var result_left = 0;
                var result_top = 0;
                /*
                    set margin if necessary. In Yahoo image search, sometimes
                    original image will be bigger than our popup. In this case, we need to set margin
                    so that our popup can cover all original image
                */  
                if(width_sub >= 0){
                    // original image is bigger than our popup on width
                    TMExt_$popup.css("width", TMExt_$(this).width());
                    
                    // left
                    result_left = a_offset.left;
                }else{    
                    TMExt_$popup.css("width", "auto");
                    
                    // left
                    result_left = a_offset.left + width_sub / 2;
                }
                
                if(height_sub >= 0){
                    // original image is bigger than our popup on height
                    TMExt_$popup.css("height", TMExt_$(this).height());
                    
                    // top
                    result_top = a_offset.top;
                }else{                    
                    // top
                    result_top = a_offset.top + height_sub / 2;
                }
                
                // exceed left
                if(result_left < 0){
                    result_left = 0 + reserve_distance;
                }
                
                // exceed top
                if(result_top < 0){
                    result_top = 0 + reserve_distance;
                }
                
                // exceed right
                if((result_left + TMExt_$popup.width()) > TMExt_$(document).width()){
                    var exceed_right = result_left + TMExt_$popup.width() - TMExt_$(document).width();
                    result_left = result_left - exceed_right - reserve_distance;
                }
                
                TMExt_$popup.css("left", result_left);
                TMExt_$popup.css("top", result_top);
            })
        }

        var isNeedToBlock = function(level){
            var block = 7, pcblock = 8;
            return level === block || level === pcblock;
        }
        
        var getParamFromURL = function(sourceURL, key){
            try{
                var a = document.createElement('a');
                a.href = sourceURL;
                
                var paramsString = a.search;
                if ( typeof (paramsString) == "string" && paramsString.length > 0) {
                    paramsString = paramsString.substring(1)
                    var paramsList = paramsString.split('&')
                    for (var i = 0; i < paramsList.length; i++) {
                        var keyAndValue = paramsList[i].split('=')
                        if (keyAndValue[0] == key) {
                            return keyAndValue[1]
                        }
                    };
                }
                return null;    
            }catch(e){
                return null;
            }
        }
        
        var assert = function(condition, message){
            if (!condition && console && console.error) {
                console.error(message);
            }
        }
        
        /*
            110 < x            : use 110
            60 < x <= 110    : use 60
            16 < x <= 60    : use 16
            other            : use 16
        */
        var ImageBlockImgDefine = {
            defaultImg : "img_image_block_16_16.png",
            imgList : [
                {
                    imgSize: 110,
                    src : "img_image_block_110_110.png"
                }, {
                    imgSize: 100,
                    src : "img_image_block_100_100.png"
                }, {
                    imgSize: 90,
                    src : "img_image_block_90_90.png"
                }, {
                    imgSize: 80,
                    src : "img_image_block_80_80.png"
                }, {
                    imgSize: 70,
                    src : "img_image_block_70_70.png"
                }, {
                    imgSize: 60,
                    src : "img_image_block_60_60.png"
                }, {
                    imgSize: 50,
                    src : "img_image_block_50_50.png"
                }, {
                    imgSize: 40,
                    src : "img_image_block_40_40.png"
                }, {
                    imgSize: 30,
                    src : "img_image_block_30_30.png"
                }, {
                    imgSize: 20,
                    src : "img_image_block_20_20.png"
                }, {
                    imgSize: 16,
                    src : "img_image_block_16_16.png"
                }
            ]
        }

        var setBlockImage = function($_obj){
            var origin_min_width_height = $_obj.width() < $_obj.height() ? $_obj.width() : $_obj.height();
            
            var imageSrc = ImageBlockImgDefine.defaultImg;
            TMExt_$.each(ImageBlockImgDefine.imgList, function(index, item){
                if(origin_min_width_height > item.imgSize){
                    imageSrc = item.src;
                    return false;
                }
            })
            
            $_obj.css("background-image", 'url(' + TSREscapeURL(imageSrc) + ')');
            $_obj.css("background-repeat", "no-repeat");
            $_obj.css("background-position", "center center");
        }
        
        var TIME_OUT_REFRESH_BLOCK_IMAGE = 500;
        
        var refreshBlockImages = function(callback_first){
            setTimeout(function(){
                _refreshBlockImages(function(item){
                    if(callback_first){
                        callback_first(item);
                    }
                    setBlockImage(item);
                });
            }, TIME_OUT_REFRESH_BLOCK_IMAGE);
        }
        
        var _refreshBlockImages = function(callback){
            // find elements with attr "link_level" and link_level needs to block
            var LINK_LEVEL = "link_level";
            
            var itemListWithLinkLevel = TMExt_$("[" + LINK_LEVEL + "]");
            for (var i=0, len = itemListWithLinkLevel.length; i < len; i++) {
                var item = itemListWithLinkLevel.eq(i);
                
                var link_level = item.attr(LINK_LEVEL);
                if(isNeedToBlock(parseInt(link_level))){
                    callback(item);
                }
            };
        }
        
        return {
            ID_IMAGE_BLOCK_POPUP : ID_IMAGE_BLOCK_POPUP,
            constructImageBlockPopup : constructImageBlockPopup,
            checkImageBlockPopupExist : checkImageBlockPopupExist,
            bindMouseEnterEvent : bindMouseEnterEvent,
            isNeedToBlock : isNeedToBlock,
            getParamFromURL : getParamFromURL,
            assert : assert,
            setBlockImage : setBlockImage,
            refreshBlockImages : refreshBlockImages
        }
    })();
    
   
    exports.TrendMicro = TrendMicro;
})();
