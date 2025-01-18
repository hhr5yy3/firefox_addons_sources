function ScholarscopeHighlight() {
    console.log("Scholarscope Hightlight Start");
    if (URLPatternD.test(pubmed_current_url) || URLPatternH.test(pubmed_current_url) || URLPatternZ.test(pubmed_current_url)) {
        try {
            let Abstract = document.getElementById("abstract");
            with (Abstract) {
                //id = "Abstract";
                //SclassName = "Abstract";
            }
        } catch (e) {
            console.log(e);
        }
        try {
            const OtherLang = document.getElementsByClassName("other-lang")[0];
            if (OtherLang) {
                OtherLang.remove();
            }
        } catch (e) {
            console.log(e);
        }

        try {
            let AbstractChanged = false;
            let EncAbstract = document.getElementById("eng-abstract");
            if (EncAbstract == undefined) {
                EncAbstract = document.getElementsByClassName("abstract-content")[0];
            }
            if (EncAbstract != undefined) {
                let OriginAbstract = EncAbstract.innerHTML;
                OriginAbstract = OriginAbstract.replace(/\s*<p>\s*/g, "<p>");
                OriginAbstract = OriginAbstract.replace(/\s*<\/p>\s*/g, "</p>");
                OriginAbstract = OriginAbstract.replace(/\s*<strong[A-Za-z0-9\=\'\"\-\_\s]*>\s*/g, "<b>");
                OriginAbstract = OriginAbstract.replace(/\s*<\/strong>\s*/g, "</b>");
                OriginAbstract = OriginAbstract.replace(/\s*<b>\s*/g, "<b>");
                OriginAbstract = OriginAbstract.replace(/\s*<\/b>\s*/g, "</b>");
                OriginAbstract = OriginAbstract.replace(/\s*<sup>\s*/g, "<sup>");
                OriginAbstract = OriginAbstract.replace(/\s*<\/sup>\s*/g, "</sup>");
                OriginAbstract = OriginAbstract.replace(/\s*<sub>\s*/g, "<sub>");
                OriginAbstract = OriginAbstract.replace(/\s*<\/sub>\s*/g, "</sub>");
                OriginAbstract = OriginAbstract.replace(/\s*<span>\s*/g, "<span>");
                OriginAbstract = OriginAbstract.replace(/\s*<\/span>\s*/g, "</span>");
                // Format EncAbstract
                with (EncAbstract) {
                    innerHTML = innerHTML.replace(" ", " ", innerHTML);
                    innerHTML = DOMPurify.sanitize(OriginAbstract, { ALLOWED_TAGS: ['p', 'b', 'sup', 'sub', 'span', 'highlight'] });

                    style.lineHeight = "26px";
                    style.zIndex = 10;
                    className = "Scholarscope_HighlightContents notranslate";
                    id = "Scholarscope_HighlightOrigin";
                }

                const ObserverConfig = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                const ObserverCallback = function (mutationsList, HightlightObserver) {
                    for (const mutation of mutationsList) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'MARK') {
                                AbstractChanged = true;
                            }
                        });
                    }
                };
                const HightlightObserver = new MutationObserver(ObserverCallback);
                HightlightObserver.observe(EncAbstract, ObserverConfig);

                let Paragraph = EncAbstract.getElementsByTagName("p");
                for (p = 0; p < Paragraph.length; p++) {
                    let ParagraphChildNode = Paragraph[p].childNodes;
                    let StringArray = [];
                    for (q = 0; q < ParagraphChildNode.length; q++) {
                        if (ParagraphChildNode[q].localName == undefined) {
                            StringArray[q] = "<span>" + DOMPurify.sanitize(ParagraphChildNode[q].textContent) + "</span>";
                        } else {
                            let TagName = DOMPurify.sanitize(ParagraphChildNode[q].localName);
                            StringArray[q] = "<" + TagName + ">" + DOMPurify.sanitize(ParagraphChildNode[q].textContent) + "</" + TagName + ">";
                        }
                    }
                    with (Paragraph[p]) {
                        innerHTML = StringArray.join("");
                    }
                }
                // Format EncAbstract Completed

                // Make a Copy: ScholarscopeHighlightContent
                let ScholarscopeHighlightContent = EncAbstract.cloneNode(true);
                with (ScholarscopeHighlightContent) {
                    id = "Scholarscope_HighlightContent";
                    className = "notranslate";
                }
                // Copy Completed

                // Remove mark tag
                document.addEventListener("mousemove", function () {
                    if (AbstractChanged == true) {
                        with (EncAbstract) {
                            innerHTML = DOMPurify.sanitize(innerHTML, { ALLOWED_TAGS: ['p', 'b', 'sup', 'sub', 'span', 'highlight'] });
                        }
                        with (ScholarscopeHighlightContent) {
                            innerHTML = DOMPurify.sanitize(innerHTML, { ALLOWED_TAGS: ['p', 'b', 'sup', 'sub', 'span', 'highlight'] });
                        }
                        console.log("Remove MARK Tag");
                        AbstractChanged = false;
                    }
                })

                // Find EncAbstractParent
                let EncAbstractParent = EncAbstract.parentNode;
                EncAbstract.style.position = "relative";

                // Highlight Toolbar
                let ScholarscopeHighlightToolbarFrame = document.createElement("div");
                with (ScholarscopeHighlightToolbarFrame) {
                    id = "Scholarscope_HighlightToolbarFrame";
                    className = "notranslate";
                }

                // Highlight Loading
                let ScholarscopeHighlightFrameLoading = document.createElement("div");
                with (ScholarscopeHighlightFrameLoading) {
                    id = "Scholarscope_HighlightFrameLoading";
                    className = "Scholarscope_HighlightFrame";
                    title = "加载中";
                }
                let ScholarscopeHighlightFrameLoadingImg = document.createElement("img");
                with (ScholarscopeHighlightFrameLoadingImg) {
                    id = "Scholarscope_HighlightFrameLoadingImg";
                    src = chrome.runtime.getURL('images/loading.gif');
                }
                ScholarscopeHighlightFrameLoading.appendChild(ScholarscopeHighlightFrameLoadingImg);

                // Highlight Buttons
                let ScholarscopeHighlightFrameSet = document.createElement("div");
                with (ScholarscopeHighlightFrameSet) {
                    id = "Scholarscope_HighlightFrameSet";
                }
                let ScholarscopeHighlightFrameRed = document.createElement("div");
                with (ScholarscopeHighlightFrameRed) {
                    id = "Scholarscope_HighlightFrameRed";
                    className = "Scholarscope_HighlightFrame";
                    title = "将文字标记为红色";
                }
                let ScholarscopeHighlightFrameRedImg = document.createElement("img");
                with (ScholarscopeHighlightFrameRedImg) {
                    className = "ScholarscopeHighlightFrameImg";
                    src = chrome.runtime.getURL('images/HighlightRed.png');
                }
                ScholarscopeHighlightFrameRed.appendChild(ScholarscopeHighlightFrameRedImg);

                let ScholarscopeHighlightFrameYellow = document.createElement("div");
                with (ScholarscopeHighlightFrameYellow) {
                    id = "Scholarscope_HighlightFrameYellow";
                    className = "Scholarscope_HighlightFrame";
                    title = "将文字标记为黄色";
                }
                let ScholarscopeHighlightFrameYellowImg = document.createElement("img");
                with (ScholarscopeHighlightFrameYellowImg) {
                    className = "ScholarscopeHighlightFrameImg";
                    src = chrome.runtime.getURL('images/HighlightYellow.png');
                }
                ScholarscopeHighlightFrameYellow.appendChild(ScholarscopeHighlightFrameYellowImg);

                let ScholarscopeHighlightFrameGreen = document.createElement("div");
                with (ScholarscopeHighlightFrameGreen) {
                    id = "Scholarscope_HighlightFrameGreen";
                    className = "Scholarscope_HighlightFrame";
                    title = "将文字标记为绿色";
                }
                let ScholarscopeHighlightFrameGreenImg = document.createElement("img");
                with (ScholarscopeHighlightFrameGreenImg) {
                    className = "ScholarscopeHighlightFrameImg";
                    src = chrome.runtime.getURL('images/HighlightGreen.png');
                }
                ScholarscopeHighlightFrameGreen.appendChild(ScholarscopeHighlightFrameGreenImg);

                // Highlight Help Button
                let ScholarscopeHighlightFrameHelp = document.createElement("div");
                with (ScholarscopeHighlightFrameHelp) {
                    id = "Scholarscope_HighlightFrameHelp";
                    className = "Scholarscope_HighlightFrame";
                    innerText = "?";
                    title = "点击查看帮助";
                }
                let ScholarscopeHighlightFrameHelpATag = document.createElement("a");
                with (ScholarscopeHighlightFrameHelpATag) {
                    id = "Scholarscope_HighlightFrameHelpATag";
                    href = "http://blog.scholarscope.online/highlight/";
                    target = "_blank";
                }
                ScholarscopeHighlightFrameHelpATag.appendChild(ScholarscopeHighlightFrameHelp)

                // Highlight Tip
                let ScholarscopeHighlightFrameTip = document.createElement("div");
                with (ScholarscopeHighlightFrameTip) {
                    id = "Scholarscope_HighlightFrameTip";
                    innerText = "已更改，未保存";
                    title = "点击保存高亮数据";
                }

                // Assemble
                ScholarscopeHighlightFrameSet.append(ScholarscopeHighlightFrameRed, ScholarscopeHighlightFrameYellow, ScholarscopeHighlightFrameGreen, ScholarscopeHighlightFrameHelpATag);
                ScholarscopeHighlightToolbarFrame.append(ScholarscopeHighlightFrameLoading, ScholarscopeHighlightFrameSet, ScholarscopeHighlightFrameTip);

                // Abstract Title
                let AbstractTitle = EncAbstractParent.getElementsByClassName("title")[0];
                if (AbstractTitle.innerText == "Abstract") {
                    with (AbstractTitle) {
                        id = "Scholarscope_HighlightAbstractTitle";
                        className = className + " notranslate";
                    }
                    // ScholarscopeHighlightToolbarFrame Location
                    ScholarscopeHighlightToolbarFrame.style.left = "160px";
                    EncAbstractParent.insertBefore(ScholarscopeHighlightToolbarFrame, EncAbstract);

                    // Copy Location
                    ScholarscopeHighlightContent.style.top = AbstractTitle.offsetHeight + "px";
                    ScholarscopeHighlightContent.style.zIndex = "9";
                } else {

                }
                EncAbstractParent.appendChild(ScholarscopeHighlightContent);

                // Button Event Functions
                function SidebarPopup() {
                    if (SCHOLARSCOPE_GLOBAL_SIDEBARPOPUP != 1) {
                        let SidebarButtonFrame = document.getElementById("Scholarscope_SidebarButtonFrame");
                        let SidebarMainFrame = document.getElementById("Scholarscope_SidebarMainFrame");
                        let SidebarImage = document.getElementById("Scholarscope_SidebarImage");
                        if (SidebarButtonFrame.style.right == "-0.5vw") {
                            SidebarButtonFrame.style.right = "23.5vw";
                            SidebarMainFrame.style.right = "0px";
                            SidebarImage.src = chrome.runtime.getURL('images/doublearrow.png');
                        }
                        SCHOLARSCOPE_GLOBAL_SIDEBARPOPUP = 1;
                    }
                }

                // Remove Mark
                function RemoveMarks() {
                    let ScholarscopeHighlightContent = document.getElementById("Scholarscope_HighlightContent");
                    let ScholarscopeHighlightContentHTML = ScholarscopeHighlightContent.innerHTML;
                    ScholarscopeHighlightContentHTML = ScholarscopeHighlightContentHTML.replace(/\s*<mark[A-Za-z0-9\=\'\"\-\_\s]*>\s*/g, " ");
                    ScholarscopeHighlightContentHTML = ScholarscopeHighlightContentHTML.replace(/\s*<\/mark>\s*/g, " ");
                    ScholarscopeHighlightContent.innerHTML = DOMPurify.sanitize(ScholarscopeHighlightContentHTML);

                    let ScholarscopeHighlightOrigin = document.getElementById("Scholarscope_HighlightOrigin");
                    let ScholarscopeHighlightOriginHTML = ScholarscopeHighlightOrigin.innerHTML;
                    ScholarscopeHighlightOriginHTML = ScholarscopeHighlightOriginHTML.replace(/\s*<mark[A-Za-z0-9\=\'\"\-\_\s]*>\s*/g, " ");
                    ScholarscopeHighlightOriginHTML = ScholarscopeHighlightOriginHTML.replace(/\s*<\/mark>\s*/g, " ");
                    ScholarscopeHighlightOrigin.innerHTML = DOMPurify.sanitize(ScholarscopeHighlightOriginHTML);
                }

                // Upload Highlight Data
                function UploadHighlightData() {
                    let SidebarSaveHighlightTip = document.getElementById("Scholarscope_SidebarSaveHighlightTip");
                    SidebarSaveHighlightTip.innerText = "";
                    let ScholarscopeSidebarSaveNoteTip = document.getElementById("Scholarscope_SidebarSaveNoteTip");
                    ScholarscopeSidebarSaveNoteTip.innerText = "";
                    let ScholarscopeHighlightFrameTip = document.getElementById("Scholarscope_HighlightFrameTip");
                    ScholarscopeHighlightFrameTip.innerText = "正在保存";
                    // Update Highlight
                    let HighlightPort = chrome.runtime.connect({
                        name: "UpdateHighlight"
                    });

                    let PMID = document.getElementsByClassName("current-id")[0].innerHTML.trim();
                    PMID = DOMPurify.sanitize(PMID, { ALLOWED_TAGS: [] });
                    let PMIDRegex = /[0-9]{1,8}/;
                    let PMIDMatches = PMID.match(PMIDRegex);
                    if (PMIDMatches) {
                        PMID = PMIDMatches[0];
                    } else {
                        PMID = "0";
                    }

                    HighlightPort.postMessage({
                        "PMID": PMID,
                        "Highlight": HighlightData
                    });
                    console.log("REQUEST: Update Highlight");
                    HighlightPort.onMessage.addListener(function (msg) {
                        SCHOLARSCOPE_GLOBAL_SAVESTATUS += 1;
                        if (SCHOLARSCOPE_GLOBAL_SAVESTATUS == SCHOLARSCOPE_GLOBAL_SAVESTANDARD) {
                            SidebarSaveButtonText.style.visibility = "visible";
                            SidebarLoadingGIFFrame.style.visibility = "hidden";
                        }
                        if (msg.Status == 200 && msg.Results.Status == 1) {
                            with (SidebarSaveHighlightTip) {
                                innerText = "保存成功：高亮数据";
                                style.color = "#33B679";
                            }

                            // Update Save Status
                            SCHOLARSCOPE_GLOBAL_EDITSTATUS = 0;
                            with (ScholarscopeHighlightFrameTip) {
                                innerText = "保存成功";
                                style.backgroundColor = "#33B679";
                                style.transition = "opacity 2s";
                                style.opacity = 0;
                                style.cursor = "default";
                                title = "";
                            }
                            ScholarscopeHighlightFrameTip.removeEventListener("click", UploadHighlightData);
                        } else {
                            if (msg.Status == 200 && msg.Results.Status == 0) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = DOMPurify.sanitize(msg.Results.Error);
                                    style.color = "#F6BF26";
                                }
                            } else if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 402) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = "高亮数据保存失败";
                                    style.color = "#F6BF26";
                                }
                                alert("高亮数据保存失败：会员到期");
                            } else if (msg.Status == 404) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = "高亮数据保存失败";
                                    style.color = "#F6BF26";
                                }
                                alert("高亮数据保存失败：未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = "高亮数据保存失败";
                                    style.color = "#F6BF26";
                                }
                                alert("高亮数据保存失败：Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    });
                };

                // Create Sidebar - Highlight
                let SidebarHighlightFrame = document.getElementById("Scholarscope_SidebarHighlightFrame");
                let SidebarHighlightTitle = document.createElement("div");
                with (SidebarHighlightTitle) {
                    id = "Scholarscope_SidebarHighlightTitle";
                    innerText = "高亮";
                }
                let SidebarHighlightList = document.createElement("div");
                with (SidebarHighlightList) {
                    id = "Scholarscope_SidebarHighlightList";
                    className = "notranslate";
                }
                let SidebarHighlightListEmpty = document.createElement("div");
                with (SidebarHighlightListEmpty) {
                    id = "Scholarscope_SidebarHighlightListEmpty";
                    className = "notranslate";
                    innerText = "删除所有高亮";
                }
                SidebarHighlightListEmpty.addEventListener("click", function () {
                    let EmptyConfirm = confirm("确定要删除所有高亮？");
                    if (EmptyConfirm == true) {
                        console.log("Empty Highlight Data");

                        let SidebarSaveHighlightTip = document.getElementById("Scholarscope_SidebarSaveHighlightTip");
                        SidebarSaveHighlightTip.innerText = "";
                        let ScholarscopeSidebarSaveNoteTip = document.getElementById("Scholarscope_SidebarSaveNoteTip");
                        ScholarscopeSidebarSaveNoteTip.innerText = "";

                        function ConvertEncAbstractToHighlightData(Node) {
                            let HighlightData = [];
                            let ChildNodesCount = Node.childNodes.length;
                            if (ChildNodesCount > 1) {
                                for (let ChildNodesIndex = 0; ChildNodesIndex < ChildNodesCount; ChildNodesIndex++) {
                                    HighlightData.push(ConvertEncAbstractToHighlightData(Node.childNodes[ChildNodesIndex]));
                                }
                            } else if (ChildNodesCount == 1) {
                                if (Node.childNodes[0].childNodes.length == 0) {
                                    HighlightData = { a: [], b: [], c: [] };
                                } else {
                                    HighlightData.push(ConvertEncAbstractToHighlightData(Node.childNodes[0]));
                                }
                            } else if (ChildNodesCount == 0) {
                                HighlightData = { a: [], b: [], c: [] };
                            }
                            return HighlightData;
                        }

                        HighlightData = ConvertEncAbstractToHighlightData(EncAbstract);
                        let ScholarscopeHighlightContentHTML = ScholarscopeHighlightContent.innerHTML;
                        ScholarscopeHighlightContentHTML = ScholarscopeHighlightContentHTML.replace(/<highlight\sclass=\"ScholarscopeHighlight(Red|Yellow|Green)\">/g, "");
                        ScholarscopeHighlightContentHTML = ScholarscopeHighlightContentHTML.replace(/<\/highlight>/g, "");
                        ScholarscopeHighlightContent.innerHTML = DOMPurify.sanitize(ScholarscopeHighlightContentHTML);

                        SidebarHighlightList.innerHTML = "";

                        // Empty Cloud
                        let EmptyHighlightPort = chrome.runtime.connect({
                            name: "EmptyHighlight"
                        });
                        let PMID = document.getElementsByClassName("current-id")[0].innerHTML.trim();
                        PMID = DOMPurify.sanitize(PMID, { ALLOWED_TAGS: [] });
                        let PMIDRegex = /[0-9]{1,8}/;
                        let PMIDMatches = PMID.match(PMIDRegex);
                        if (PMIDMatches) {
                            PMID = PMIDMatches[0];
                        } else {
                            PMID = "0";
                        }

                        EmptyHighlightPort.postMessage({
                            "PMID": PMID
                        });

                        SCHOLARSCOPE_GLOBAL_EDITSTATUS = 0;
                        with (ScholarscopeHighlightFrameTip) {
                            innerText = "保存成功";
                            style.backgroundColor = "#33B679";
                            style.transition = "opacity 2s";
                            style.opacity = 0;
                            style.cursor = "default";
                            title = "";
                        }
                        ScholarscopeHighlightFrameTip.removeEventListener("click", UploadHighlightData);
                        SidebarSaveHighlightTip.innerText = "高亮数据已清空";
                    }
                });
                SidebarHighlightFrame.append(SidebarHighlightTitle, SidebarHighlightList, SidebarHighlightListEmpty);

                // Get Highlight
                let HighlightData = [];
                try {
                    let GetHighlightPort = chrome.runtime.connect({
                        name: "GetHighlight"
                    });

                    let PMID = document.getElementsByClassName("current-id")[0].innerHTML.trim();
                    PMID = DOMPurify.sanitize(PMID, { ALLOWED_TAGS: [] });
                    let PMIDRegex = /[0-9]{1,8}/;
                    let PMIDMatches = PMID.match(PMIDRegex);
                    if (PMIDMatches) {
                        PMID = PMIDMatches[0];
                    } else {
                        PMID = "0";
                    }

                    GetHighlightPort.postMessage({
                        "PMID": PMID
                    });
                    console.log("REQUEST: Get Highlight Data");
                    GetHighlightPort.onMessage.addListener(function (msg) {
                        function ConvertEncAbstractToHighlightData(Node) {
                            let HighlightData = [];
                            let ChildNodesCount = Node.childNodes.length;
                            if (ChildNodesCount > 1) {
                                for (let ChildNodesIndex = 0; ChildNodesIndex < ChildNodesCount; ChildNodesIndex++) {
                                    HighlightData.push(ConvertEncAbstractToHighlightData(Node.childNodes[ChildNodesIndex]));
                                }
                            } else if (ChildNodesCount == 1) {
                                if (Node.childNodes[0].childNodes.length == 0) {
                                    HighlightData = { a: [], b: [], c: [] };
                                } else {
                                    HighlightData.push(ConvertEncAbstractToHighlightData(Node.childNodes[0]));
                                }
                            } else if (ChildNodesCount == 0) {
                                HighlightData = { a: [], b: [], c: [] };
                            }
                            return HighlightData;
                        }
                        if (msg.Status == 200 && msg.Results.Status == 1) {
                            // Remove Mark
                            RemoveMarks();

                            // Remove Loading GIF & Load Buttons
                            ScholarscopeHighlightToolbarFrame.removeChild(ScholarscopeHighlightFrameLoading);
                            ScholarscopeHighlightFrameSet.style.visibility = "visible";

                            // Main
                            HighlightData = msg.Results.Data;
                            if (HighlightData.length === 0) {
                                // Create HighlightData
                                HighlightData = ConvertEncAbstractToHighlightData(EncAbstract);
                            };

                            // Flush Highlight List
                            FlushScholarscopeHighlightList(HighlightData);

                            function IsEncAbstract(Node, ItemLocationArray) {
                                if (Node != EncAbstract) {
                                    ItemLocationArray.unshift(Array.prototype.indexOf.call(Node.parentNode.childNodes, Node));
                                    IsEncAbstract(Node.parentNode, ItemLocationArray);
                                }
                            }

                            // Find Node Location
                            function GenerateLocationArray(Node, ItemLocationArray) {
                                IsEncAbstract(Node, ItemLocationArray);
                                return ItemLocationArray;
                            }

                            // Selection Parameters
                            let ItemLocationMatrix = [];
                            let ItemLocationArray = [];
                            let SELocationMatrix = [];
                            let SELocationArray = [];

                            // Content Selection Listener
                            function EncAbstractSelection(ItemLocationMatrix, ItemLocationArray, SELocationMatrix, SELocationArray) {
                                if (window.getSelection) {
                                    let HighlightSelection = window.getSelection();
                                    if (HighlightSelection.type == "Range") {
                                        let AnchorParent = HighlightSelection.anchorNode.parentNode;
                                        let FocusParent = HighlightSelection.focusNode.parentNode;
                                        let RelativeLocation = AnchorParent.compareDocumentPosition(FocusParent);
                                        let AllLocationArray = [0, 2, 4, 10, 12, 18, 20];
                                        let SequentialArray = [4, 12, 20];
                                        let ReversalArray = [2, 10, 18];
                                        if (AllLocationArray.includes(RelativeLocation)) {
                                            if (RelativeLocation == 0) {
                                                // Same
                                                let StartPosition = 0;
                                                let EndPosition = 0;
                                                ItemLocationArray = GenerateLocationArray(AnchorParent, ItemLocationArray);
                                                ItemLocationMatrix.push(ItemLocationArray);
                                                if (HighlightSelection.anchorOffset < HighlightSelection.focusOffset) {
                                                    StartPosition = HighlightSelection.anchorOffset;
                                                    EndPosition = HighlightSelection.focusOffset;
                                                } else {
                                                    StartPosition = HighlightSelection.focusOffset;
                                                    EndPosition = HighlightSelection.anchorOffset;
                                                }
                                                SELocationArray.push(StartPosition, EndPosition)
                                                SELocationMatrix.push(SELocationArray);
                                            } else if (SequentialArray.includes(RelativeLocation) || ReversalArray.includes(RelativeLocation)) {
                                                let StartNode = new Object();
                                                let EndNode = new Object();
                                                let StartPosition = 0;
                                                let EndPosition = 0;
                                                if (SequentialArray.includes(RelativeLocation)) {
                                                    // Sequential
                                                    StartNode = HighlightSelection.anchorNode;
                                                    StartPosition = HighlightSelection.anchorOffset;
                                                    EndNode = HighlightSelection.focusNode;
                                                    EndPosition = HighlightSelection.focusOffset;
                                                } else if (ReversalArray.includes(RelativeLocation)) {
                                                    // Reversal
                                                    StartNode = HighlightSelection.focusNode;
                                                    StartPosition = HighlightSelection.focusOffset;
                                                    EndNode = HighlightSelection.anchorNode;
                                                    EndPosition = HighlightSelection.anchorOffset;
                                                }
                                                SELocationMatrix[0] = [StartPosition, StartNode.length];
                                                SELocationMatrix[1] = [0, EndPosition];

                                                let StartNodeParent = StartNode.parentNode;
                                                ItemLocationArray = [];
                                                ItemLocationArray = GenerateLocationArray(StartNodeParent, ItemLocationArray);
                                                ItemLocationMatrix.push(ItemLocationArray);

                                                let EndNodeParent = EndNode.parentNode;
                                                ItemLocationArray = [];
                                                ItemLocationArray = GenerateLocationArray(EndNodeParent, ItemLocationArray);
                                                ItemLocationMatrix.push(ItemLocationArray);
                                            }
                                        } else {
                                            console.log("Selection: OutOfRange");
                                            console.log("RelativeLocation: ", RelativeLocation);
                                        }
                                    }
                                }
                            }
                            EncAbstract.addEventListener("click", function () {
                                ItemLocationMatrix = [];
                                ItemLocationArray = [];
                                SELocationMatrix = [];
                                SELocationArray = [];
                                EncAbstractSelection(ItemLocationMatrix, ItemLocationArray, SELocationMatrix, SELocationArray);
                            })
                            EncAbstract.addEventListener("touchend", function () {
                                ItemLocationMatrix = [];
                                ItemLocationArray = [];
                                SELocationMatrix = [];
                                SELocationArray = [];
                                EncAbstractSelection(ItemLocationMatrix, ItemLocationArray, SELocationMatrix, SELocationArray);
                            })

                            // Add Data to HighlightData
                            function AddToHighlightData(HighlightData, ItemLocationArray, StartPosition, EndPosition, Color) {
                                let FetchHighlightData = HighlightData;
                                for (let ItemLocationIndex = 0; ItemLocationIndex < ItemLocationArray.length; ItemLocationIndex++) {
                                    FetchHighlightData = FetchHighlightData[ItemLocationArray[ItemLocationIndex]];
                                }
                                // Check FetchHighlightData
                                if (FetchHighlightData["a"].length != FetchHighlightData["b"].length || FetchHighlightData["a"].length != FetchHighlightData["c"].length) {
                                    FetchHighlightData["a"] = [];
                                    FetchHighlightData["b"] = [];
                                    FetchHighlightData["c"] = [];
                                } else {
                                    // Check Whether Included
                                    let StartPositionCross = 0;
                                    let EndPositionCross = 0;
                                    let PositionOver = 0;
                                    for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightData["a"].length; FetchHighlightDataIndex++) {
                                        if (FetchHighlightData["a"][FetchHighlightDataIndex] <= StartPosition && StartPosition < FetchHighlightData["b"][FetchHighlightDataIndex]) {
                                            StartPositionCross = 1;
                                        }
                                        if (FetchHighlightData["a"][FetchHighlightDataIndex] < EndPosition && EndPosition <= FetchHighlightData["b"][FetchHighlightDataIndex]) {
                                            EndPositionCross = 1;
                                        }
                                        if (StartPosition <= FetchHighlightData["a"][FetchHighlightDataIndex] && FetchHighlightData["b"][FetchHighlightDataIndex] <= EndPosition) {
                                            PositionOver = 1;
                                        }
                                    }
                                    if (StartPositionCross == 0 && EndPositionCross == 0 && PositionOver == 0) {
                                        let FetchHighlightDataLength = FetchHighlightData["a"].length;
                                        let InsertPositionStatus = 0;
                                        for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                            if (StartPosition < FetchHighlightData["a"][FetchHighlightDataIndex]) {
                                                FetchHighlightData["a"].splice(FetchHighlightDataIndex, 0, StartPosition);
                                                FetchHighlightData["b"].splice(FetchHighlightDataIndex, 0, EndPosition);
                                                FetchHighlightData["c"].splice(FetchHighlightDataIndex, 0, Color);
                                                InsertPositionStatus = 1;
                                                break;
                                            }
                                        }
                                        if (InsertPositionStatus == 0) {
                                            FetchHighlightData["a"].push(StartPosition);
                                            FetchHighlightData["b"].push(EndPosition);
                                            FetchHighlightData["c"].push(Color);
                                        }
                                    } else {
                                        if (PositionOver == 0) {
                                            let FetchHighlightDataLength = FetchHighlightData["a"].length;
                                            if (StartPositionCross == 1) {
                                                for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                                    if (FetchHighlightData["a"][FetchHighlightDataIndex] <= StartPosition && StartPosition < FetchHighlightData["b"][FetchHighlightDataIndex]) {
                                                        FetchHighlightData["b"].splice(FetchHighlightDataIndex, 1, StartPosition);
                                                    }
                                                }
                                            }

                                            if (EndPositionCross == 1) {
                                                FetchHighlightDataLength = FetchHighlightData["a"].length;
                                                for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                                    if (FetchHighlightData["a"][FetchHighlightDataIndex] < EndPosition && EndPosition <= FetchHighlightData["b"][FetchHighlightDataIndex]) {
                                                        FetchHighlightData["a"].splice(FetchHighlightDataIndex, 1, EndPosition);
                                                    }
                                                }
                                            }

                                            FetchHighlightDataLength = FetchHighlightData["a"].length;
                                            let InsertPositionStatus = 0;
                                            for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                                if (StartPosition < FetchHighlightData["a"][FetchHighlightDataIndex]) {
                                                    FetchHighlightData["a"].splice(FetchHighlightDataIndex, 0, StartPosition);
                                                    FetchHighlightData["b"].splice(FetchHighlightDataIndex, 0, EndPosition);
                                                    FetchHighlightData["c"].splice(FetchHighlightDataIndex, 0, Color);
                                                    InsertPositionStatus = 1;
                                                    break;
                                                }
                                            }
                                            if (InsertPositionStatus == 0) {
                                                FetchHighlightData["a"].push(StartPosition);
                                                FetchHighlightData["b"].push(EndPosition);
                                                FetchHighlightData["c"].push(Color);
                                            }
                                        } else if (PositionOver == 1) {
                                            let FetchHighlightDataLength = FetchHighlightData["a"].length;
                                            for (let FetchHighlightDataIndex = FetchHighlightDataLength - 1; FetchHighlightDataIndex >= 0; FetchHighlightDataIndex--) {
                                                if (StartPosition <= FetchHighlightData["a"][FetchHighlightDataIndex] && FetchHighlightData["b"][FetchHighlightDataIndex] <= EndPosition) {
                                                    FetchHighlightData["a"].splice(FetchHighlightDataIndex, 1);
                                                    FetchHighlightData["b"].splice(FetchHighlightDataIndex, 1);
                                                    FetchHighlightData["c"].splice(FetchHighlightDataIndex, 1);
                                                }
                                            }

                                            if (StartPositionCross == 1) {
                                                FetchHighlightDataLength = FetchHighlightData["a"].length;
                                                for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                                    if (FetchHighlightData["a"][FetchHighlightDataIndex] <= StartPosition && StartPosition < FetchHighlightData["b"][FetchHighlightDataIndex]) {
                                                        FetchHighlightData["b"].splice(FetchHighlightDataIndex, 1, StartPosition);
                                                    }
                                                }
                                            }

                                            if (EndPositionCross == 1) {
                                                FetchHighlightDataLength = FetchHighlightData["a"].length;
                                                for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                                    if (FetchHighlightData["a"][FetchHighlightDataIndex] < EndPosition && EndPosition <= FetchHighlightData["b"][FetchHighlightDataIndex]) {
                                                        FetchHighlightData["a"].splice(FetchHighlightDataIndex, 1, EndPosition);
                                                    }
                                                }
                                            }

                                            FetchHighlightDataLength = FetchHighlightData["a"].length;
                                            let InsertPositionStatus = 0;
                                            for (let FetchHighlightDataIndex = 0; FetchHighlightDataIndex < FetchHighlightDataLength; FetchHighlightDataIndex++) {
                                                if (StartPosition < FetchHighlightData["a"][FetchHighlightDataIndex]) {
                                                    FetchHighlightData["a"].splice(FetchHighlightDataIndex, 0, StartPosition);
                                                    FetchHighlightData["b"].splice(FetchHighlightDataIndex, 0, EndPosition);
                                                    FetchHighlightData["c"].splice(FetchHighlightDataIndex, 0, Color);
                                                    InsertPositionStatus = 1;
                                                    break;
                                                }
                                            }
                                            if (InsertPositionStatus == 0) {
                                                FetchHighlightData["a"].push(StartPosition);
                                                FetchHighlightData["b"].push(EndPosition);
                                                FetchHighlightData["c"].push(Color);
                                            }
                                        }
                                    }
                                }

                                // Flush Highlight
                                FlushScholarscopeHighlight(HighlightData);

                                // Flush Highlight List
                                FlushScholarscopeHighlightList(HighlightData);
                            }

                            function ChangeGapColor(HighlightData, ItemLocationArray, Color) {
                                let ItemInnerTextLength = EncAbstract.childNodes[ItemLocationArray[0]].childNodes[ItemLocationArray[1]].innerText.length;
                                HighlightData[ItemLocationArray[0]][ItemLocationArray[1]]["a"] = [0];
                                HighlightData[ItemLocationArray[0]][ItemLocationArray[1]]["b"] = [ItemInnerTextLength];
                                HighlightData[ItemLocationArray[0]][ItemLocationArray[1]]["c"] = [Color];
                                // Flush
                                FlushScholarscopeHighlight(HighlightData);
                            }

                            function FillGap(HighlightData, FirstItemLocationArray, LastItemLocationArray, Color) {
                                if (FirstItemLocationArray.length == 2 && LastItemLocationArray.length == 2) {
                                    for (let FirstIndex = FirstItemLocationArray[0]; FirstIndex <= LastItemLocationArray[0]; FirstIndex++) {
                                        for (let SecondIndex = 0; SecondIndex < HighlightData[FirstIndex].length; SecondIndex++) {
                                            if (FirstItemLocationArray[0] == LastItemLocationArray[0]) {
                                                if (SecondIndex > FirstItemLocationArray[1] && SecondIndex < LastItemLocationArray[1]) {
                                                    ChangeGapColor(HighlightData, [FirstIndex, SecondIndex], Color);
                                                }
                                            } else {
                                                if (FirstIndex == FirstItemLocationArray[0] && SecondIndex > FirstItemLocationArray[1]) {
                                                    ChangeGapColor(HighlightData, [FirstIndex, SecondIndex], Color);
                                                } else if (FirstIndex == LastItemLocationArray[0] && SecondIndex < LastItemLocationArray[1]) {
                                                    ChangeGapColor(HighlightData, [FirstIndex, SecondIndex], Color);
                                                } else if (FirstIndex > FirstItemLocationArray[0] && FirstIndex < LastItemLocationArray[0]) {
                                                    ChangeGapColor(HighlightData, [FirstIndex, SecondIndex], Color);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            function ChangeHighlightData(HighlightData, ItemLocationMatrix, SELocationMatrix, Color) {
                                for (let ItemLocationMatrixIndex = 0; ItemLocationMatrixIndex < ItemLocationMatrix.length; ItemLocationMatrixIndex++) {
                                    AddToHighlightData(HighlightData, ItemLocationMatrix[ItemLocationMatrixIndex], SELocationMatrix[ItemLocationMatrixIndex][0], SELocationMatrix[ItemLocationMatrixIndex][1], Color);
                                }
                                if (ItemLocationMatrix.length != 1) {
                                    FillGap(HighlightData, ItemLocationMatrix[0], ItemLocationMatrix[1], Color);
                                }
                            }

                            // Highlight Button Event Listener
                            function FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, Color) {
                                //console.log(window.getSelection());
                                if (window.getSelection().type == "Range") {
                                    // Update Save Status
                                    try {
                                        SCHOLARSCOPE_GLOBAL_EDITSTATUS = 1;
                                        with (ScholarscopeHighlightFrameTip) {
                                            innerText = "已更改，未保存";
                                            style.backgroundColor = "#D50000";
                                            style.transition = "opacity 0.5s";
                                            style.opacity = 1;
                                            style.cursor = "pointer";
                                            title = "点击保存高亮数据";
                                        }
                                        ScholarscopeHighlightFrameTip.addEventListener("click", UploadHighlightData);
                                        let SidebarSaveHighlightTip = document.getElementById("Scholarscope_SidebarSaveHighlightTip");
                                        SidebarSaveHighlightTip.innerText = "";
                                    } catch (e) {
                                        console.log(e);
                                    }
                                    SidebarPopup();
                                    ChangeHighlightData(HighlightData, ItemLocationMatrix, SELocationMatrix, Color);
                                } else {
                                    alert("请选择 Abstract 的文字！");
                                }
                            }

                            // Highlight Buttons
                            ScholarscopeHighlightFrameRed.addEventListener("click", function () {
                                FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, 0);
                            })
                            ScholarscopeHighlightFrameRed.addEventListener("touchstart", function () {
                                FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, 0);
                            })
                            ScholarscopeHighlightFrameYellow.addEventListener("click", function () {
                                FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, 1);
                            })
                            ScholarscopeHighlightFrameYellow.addEventListener("touchstart", function () {
                                FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, 1);
                            })
                            ScholarscopeHighlightFrameGreen.addEventListener("click", function () {
                                FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, 2);
                            })
                            ScholarscopeHighlightFrameGreen.addEventListener("touchstart", function () {
                                FunctionAfterClick(HighlightData, ItemLocationMatrix, SELocationMatrix, 2);
                            })

                            function LocateItem(LocationArray) {
                                let Item = ScholarscopeHighlightContent;
                                for (let ItemLocation = 0; ItemLocation < LocationArray.length; ItemLocation++) {
                                    Item = Item.childNodes[LocationArray[ItemLocation]];
                                }
                                return Item;
                            }

                            function InsertHighlightTags(LocationArray, StartArray, EndArray, ColorArray) {
                                let Item = LocateItem(LocationArray);
                                let ItemInnerText = Item.innerText;
                                ItemInnerText = ItemInnerText.replace(/<highlight\sclass=\"ScholarscopeHighlight(Red|Yellow|Green)\">/g, "");
                                ItemInnerText = ItemInnerText.replace(/<\/highlight>/g, "");
                                ItemInnerText = ItemInnerText;
                                let StringArray = ItemInnerText.split("");
                                for (let InsertPositionIndex = EndArray.length - 1; InsertPositionIndex >= 0; InsertPositionIndex--) {
                                    StringArray.splice(EndArray[InsertPositionIndex], 0, "</highlight>");
                                    if (ColorArray[InsertPositionIndex] == 0) {
                                        StringArray.splice(StartArray[InsertPositionIndex], 0, '<highlight class="ScholarscopeHighlightRed">');
                                    } else if (ColorArray[InsertPositionIndex] == 1) {
                                        StringArray.splice(StartArray[InsertPositionIndex], 0, '<highlight class="ScholarscopeHighlightYellow">');
                                    } else if (ColorArray[InsertPositionIndex] == 2) {
                                        StringArray.splice(StartArray[InsertPositionIndex], 0, '<highlight class="ScholarscopeHighlightGreen">');
                                    }
                                    Item.innerHTML = StringArray.join("");
                                }
                            }
                            function HighlightLocation(Data, LocationArray) {
                                if (Data["a"] != undefined && Data["b"] != undefined && Data["c"] != undefined) {
                                    InsertHighlightTags(LocationArray, Data["a"], Data["b"], Data["c"]);
                                }
                            }

                            function TraverseHighlightData(Data, LocationArray) {
                                for (let Index = 0; Index < Data.length; Index++) {
                                    LocationArray.push(Index);
                                    if (Array.isArray(Data[Index])) {
                                        TraverseHighlightData(Data[Index], LocationArray);
                                    } else {
                                        HighlightLocation(Data[Index], LocationArray);
                                        LocationArray.pop();
                                    }
                                    if (Data.length - Index == 1) {
                                        LocationArray.pop();
                                    }
                                }
                            }

                            function FlushScholarscopeHighlight(HighlightData) {
                                let ScholarscopeHighlightContent = document.getElementById("Scholarscope_HighlightContent");
                                with (ScholarscopeHighlightContent) {
                                    innerHTML = DOMPurify.sanitize(EncAbstract, { ALLOWED_TAGS: ['p', 'b', 'sup', 'sub', 'span'] });
                                }
                                let LocationArray = [];
                                TraverseHighlightData(HighlightData, LocationArray);
                            }
                            FlushScholarscopeHighlight(HighlightData);

                            // Flush Highlight List
                            function AddHighlightTextToList(Data, LocationArray) {
                                if (Data["a"] != undefined && Data["b"] != undefined && Data["c"] != undefined) {
                                    let LocatedText = EncAbstract.childNodes[LocationArray[0]].childNodes[LocationArray[1]].innerText;
                                    for (let DataIndex = 0; DataIndex < Data["a"].length; DataIndex++) {
                                        let HighlightText = LocatedText.slice(Data["a"][DataIndex], Data["b"][DataIndex]);
                                        let HighlightTextFrame = document.createElement("div");
                                        with (HighlightTextFrame) {
                                            className = "HighlightTextFrame";
                                            if (Data["c"][DataIndex] == 0) {
                                                style.borderColor = "#D50000";
                                            } else if (Data["c"][DataIndex] == 1) {
                                                style.borderColor = "#F6BF26";
                                            } else if (Data["c"][DataIndex] == 2) {
                                                style.borderColor = "#33B679";
                                            } else {
                                                style.borderColor = "#424242";
                                            }
                                        }
                                        let HighlightTextTipColor = document.createElement("div");
                                        with (HighlightTextTipColor) {
                                            className = "HighlightTextTipColor";
                                            if (Data["c"][DataIndex] == 0) {
                                                style.backgroundColor = "#D50000";
                                            } else if (Data["c"][DataIndex] == 1) {
                                                style.backgroundColor = "#F6BF26";
                                            } else if (Data["c"][DataIndex] == 2) {
                                                style.backgroundColor = "#33B679";
                                            } else {
                                                style.backgroundColor = "#616161";
                                            }
                                        }
                                        let HighlightTextDIV = document.createElement("div");
                                        with (HighlightTextDIV) {
                                            className = "HighlightTextDIV notranslate";
                                            innerText = HighlightText.trim();
                                            if (Data["c"][DataIndex] == 0) {
                                                style.backgroundColor = "#F5C3C3";
                                            } else if (Data["c"][DataIndex] == 1) {
                                                style.backgroundColor = "#FCEFC6";
                                            } else if (Data["c"][DataIndex] == 2) {
                                                style.backgroundColor = "#CCE5D7";
                                            } else {
                                                style.backgroundColor = "#616161";
                                            }
                                        }
                                        let HighlightTextDeleteFrame = document.createElement("div");
                                        with (HighlightTextDeleteFrame) {
                                            className = "HighlightTextDeleteFrame";
                                            title = "删除该高亮";
                                        }
                                        HighlightTextDeleteFrame.setAttribute("highlight_location_0", LocationArray[0]);
                                        HighlightTextDeleteFrame.setAttribute("highlight_location_1", LocationArray[1]);
                                        HighlightTextDeleteFrame.setAttribute("highlight_start", Data["a"][DataIndex]);
                                        HighlightTextDeleteFrame.setAttribute("highlight_end", Data["b"][DataIndex]);

                                        let HighlightTextDeleteImg = document.createElement("img");
                                        with (HighlightTextDeleteImg) {
                                            className = "HighlightTextDeleteImg";
                                            src = chrome.runtime.getURL('images/dislikeimg.png');
                                        }
                                        // Delete This Highlight Data
                                        HighlightTextDeleteFrame.addEventListener("click", function () {
                                            let ThisHighlightData = HighlightData[HighlightTextDeleteFrame.getAttribute("highlight_location_0")][HighlightTextDeleteFrame.getAttribute("highlight_location_1")];
                                            let FSTIndex = ThisHighlightData["a"].indexOf(parseInt(HighlightTextDeleteFrame.getAttribute("highlight_start")));
                                            let SNDIndex = ThisHighlightData["b"].indexOf(parseInt(HighlightTextDeleteFrame.getAttribute("highlight_end")));
                                            if (FSTIndex == SNDIndex && FSTIndex > -1) {
                                                ThisHighlightData["a"].splice(FSTIndex, 1);
                                                ThisHighlightData["b"].splice(FSTIndex, 1);
                                                ThisHighlightData["c"].splice(FSTIndex, 1);
                                                FlushScholarscopeHighlight(HighlightData);
                                                FlushScholarscopeHighlightList(HighlightData);
                                                //console.log(HighlightData);
                                            }

                                            // Update Save Status
                                            SCHOLARSCOPE_GLOBAL_EDITSTATUS = 1;
                                            with (ScholarscopeHighlightFrameTip) {
                                                innerText = "已更改，未保存";
                                                style.backgroundColor = "#D50000";
                                                style.transition = "opacity 0.5s";
                                                style.opacity = 1;
                                                style.cursor = "pointer";
                                                title = "点击保存高亮数据";
                                            }
                                            ScholarscopeHighlightFrameTip.addEventListener("click", UploadHighlightData);
                                            let SidebarSaveHighlightTip = document.getElementById("Scholarscope_SidebarSaveHighlightTip");
                                            SidebarSaveHighlightTip.innerText = "";
                                        })

                                        //  Assemble
                                        HighlightTextDeleteFrame.appendChild(HighlightTextDeleteImg);
                                        HighlightTextFrame.append(HighlightTextTipColor, HighlightTextDIV, HighlightTextDeleteFrame);
                                        SidebarHighlightList.appendChild(HighlightTextFrame);
                                    }
                                }
                            }

                            function TraverseHighlightTextData(Data, LocationArray) {
                                for (let Index = 0; Index < Data.length; Index++) {
                                    LocationArray.push(Index);
                                    if (Array.isArray(Data[Index])) {
                                        TraverseHighlightTextData(Data[Index], LocationArray);
                                    } else {
                                        AddHighlightTextToList(Data[Index], LocationArray);
                                        LocationArray.pop();
                                    }
                                    if (Data.length - Index == 1) {
                                        LocationArray.pop();
                                    }
                                }
                            }

                            function FlushScholarscopeHighlightList(HighlightData) {
                                let SidebarHighlightList = document.getElementById("Scholarscope_SidebarHighlightList");
                                with (SidebarHighlightList) {
                                    innerHTML = "";
                                }

                                try {
                                    let LocationArray = [];
                                    TraverseHighlightTextData(HighlightData, LocationArray);
                                } catch (e) {
                                    console.log(e);
                                }
                            }

                            let Scholarscope_SidebarImageFrame = document.getElementById("Scholarscope_SidebarImageFrame");
                            let Scholarscope_SidebarButtonFrame = document.getElementById("Scholarscope_SidebarButtonFrame");
                            Scholarscope_SidebarImageFrame.addEventListener("click", function () {
                                if (Scholarscope_SidebarButtonFrame.style.right == "-0.5vw") {
                                    console.log("Sidebar Close");
                                } else {
                                    console.log("Sidebar Open");
                                }
                            })
                        } else {
                            let SidebarSaveHighlightTip = document.getElementById("Scholarscope_SidebarSaveHighlightTip");
                            if (msg.Status == 200 && msg.Results.Status == 0) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = DOMPurify.sanitize(msg.Results.Error);
                                    style.color = "#F6BF26";
                                }
                            } else if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 404) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = "高亮数据读取失败";
                                    style.color = "#F6BF26";
                                }
                                alert("高亮数据读取失败：未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = "高亮数据读取失败";
                                    style.color = "#F6BF26";
                                }
                                alert("高亮数据读取失败：Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    });
                } catch (e) {
                    console.log(e);
                }

                // Save Button
                try {
                    let SidebarSaveButton = document.getElementById("Scholarscope_SaveButton");
                    let SidebarSaveButtonText = document.getElementById("Scholarscope_SaveButtonText");
                    let SidebarLoadingGIFFrame = document.getElementById("Scholarscope_SidebarLoadingGIFFrame");
                    let SidebarSaveHighlightTip = document.getElementById("Scholarscope_SidebarSaveHighlightTip");
                    let PMID = document.getElementsByClassName("current-id")[0].innerHTML.trim();
                    PMID = DOMPurify.sanitize(PMID, { ALLOWED_TAGS: [] });
                    let PMIDRegex = /[0-9]{1,8}/;
                    let PMIDMatches = PMID.match(PMIDRegex);
                    if (PMIDMatches) {
                        PMID = PMIDMatches[0];
                    } else {
                        PMID = "0";
                    }

                    SidebarSaveButton.addEventListener("click", function () {
                        SidebarSaveHighlightTip.innerText = "";
                        // Update Highlight
                        let HighlightPort = chrome.runtime.connect({
                            name: "UpdateHighlight"
                        });

                        HighlightPort.postMessage({
                            "PMID": PMID,
                            "Highlight": HighlightData
                        });
                        console.log("REQUEST: Update Highlight");
                        HighlightPort.onMessage.addListener(function (msg) {
                            SCHOLARSCOPE_GLOBAL_SAVESTATUS += 1;
                            if (SCHOLARSCOPE_GLOBAL_SAVESTATUS == 2) {
                                SidebarSaveButtonText.style.visibility = "visible";
                                SidebarLoadingGIFFrame.style.visibility = "hidden";
                            }
                            if (msg.Status == 200 && msg.Results.Status == 1) {
                                with (SidebarSaveHighlightTip) {
                                    innerText = "保存成功：高亮数据";
                                    style.color = "#33B679";
                                }

                                // Update Save Status
                                SCHOLARSCOPE_GLOBAL_EDITSTATUS = 0;
                                with (ScholarscopeHighlightFrameTip) {
                                    innerText = "保存成功";
                                    style.backgroundColor = "#33B679";
                                    style.transition = "opacity 2s";
                                    style.opacity = 0;
                                    style.cursor = "default";
                                    title = "";
                                }
                                ScholarscopeHighlightFrameTip.removeEventListener("click", UploadHighlightData);
                            } else {
                                if (msg.Status == 200 && msg.Results.Status == 0) {
                                    with (SidebarSaveHighlightTip) {
                                        innerText = DOMPurify.sanitize(msg.Results.Error);
                                        style.color = "#F6BF26";
                                    }
                                } else if (msg.Status == 401) {
                                    if (confirm("请登录 Scholarscope !", "")) {
                                        window.open("https://account.scholarscope.online/Login.php");
                                    }
                                } else if (msg.Status == 402) {
                                    with (SidebarSaveHighlightTip) {
                                        innerText = "高亮数据保存失败";
                                        style.color = "#F6BF26";
                                    }
                                    alert("高亮数据保存失败：会员到期");
                                } else if (msg.Status == 404) {
                                    with (SidebarSaveHighlightTip) {
                                        innerText = "高亮数据保存失败";
                                        style.color = "#F6BF26";
                                    }
                                    alert("高亮数据保存失败：未连接到 Scholarscope 服务器，请检查网络情况");
                                } else if (msg.Status == 502 || msg.Status == 504) {
                                    with (SidebarSaveHighlightTip) {
                                        innerText = "高亮数据保存失败";
                                        style.color = "#F6BF26";
                                    }
                                    alert("高亮数据保存失败：Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                                }
                            }
                        });
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}