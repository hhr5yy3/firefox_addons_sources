function ScholarscopeAssistant(PMID) {
    console.log("Scholarscope Assistant Start");
    if (PMID == "" || PMID == 0) {
        let PMIDTagInnerText = document.getElementsByClassName("current-id")[0].innerText.trim();
        PMID = DOMPurify.sanitize(PMIDTagInnerText, { ALLOWED_TAGS: [] });
        let PMIDRegex = /[0-9]{1,8}/;
        let PMIDMatches = PMID.match(PMIDRegex);
        if (PMIDMatches) {
            PMID = PMIDMatches[0];
        } else {
            PMID = "0";
        }
    }

    function scrollToDivIfNotVisible(spanClassName) {
        let element = document.getElementsByClassName(spanClassName)[0];
        if (!element) {
            console.error("Element with id " + spanClassName + " not found.");
            return;
        }

        let rect = element.getBoundingClientRect();
        let isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

        if (!isVisible) {
            var elementTop = rect.top + window.scrollY - (window.innerHeight / 2) + (rect.height / 2);
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    }

    chrome.storage.local.get(null, function (TempStorageData) {
        if (TempStorageData.Assistant == 1 && (URLPatternD.test(pubmed_current_url) || URLPatternH.test(pubmed_current_url) || URLPatternZ.test(pubmed_current_url))) {
            try {
                // Adjust Page
                try {
                    let AssistantStyle = document.createElement('style');
                    AssistantStyle.innerHTML = `
                        @media screen and (min-width: 1020px) {
                            .ncbi-header:nth-of-type(1) .usa-grid:nth-of-type(1){
                                margin-left: calc(50vw - 400px);
                                width: 960px;
                            }
                            #article-page {
                                margin-left: calc(50vw - 400px);
                            }
                            .inner-wrap:nth-of-type(2) {
                                width: 960px;
                                margin-left: calc(50vw - 400px);
                            }
                            .search-input:nth-of-type(1) {
                                width: 700px;
                            }
                            .page-sidebar:nth-of-type(1) {
                                padding-left: 0;
                            }
                        }
                    `;
                    document.head.appendChild(AssistantStyle);
                } catch (e) {
                    console.log(e);
                }

                // Variables
                let AssistantKeyword = "";
                let ContinuousProcess = "";
                let ContinuousProcessArray = [];
                let AssistantPMID = PMID;
                let AssistantTranslationTip = 0;
                let AssistantContent = [
                    {
                        "Name": "Assistant",
                        "Content": {
                            "Type": "PlainText",
                            "Data": "您好，请问您想了解什么？"
                        }
                    }
                ]

                const BodyTag = document.getElementsByTagName("body")[0];
                const AssistantFrame = document.createElement("div");
                with (AssistantFrame) {
                    id = "Scholarscope_AssistantFrame";
                    className = "notranslate";
                }

                const AssistantImgFrame = document.createElement("div");
                with (AssistantImgFrame) {
                    id = "Scholarscope_AssistantImgFrame";
                }

                const AssistantImg = document.createElement("img");
                with (AssistantImg) {
                    id = "Scholarscope_AssistantImg";
                    src = chrome.runtime.getURL('images/assistant.png');
                }
                AssistantImgFrame.append(AssistantImg);

                const AssitantTitle = document.createElement("div");
                with (AssitantTitle) {
                    id = "Scholarscope_AssistantTitle";
                    innerText = "小助理";
                }

                const AssistantMinimizeFrame = document.createElement("div");
                with (AssistantMinimizeFrame) {
                    id = "Scholarscope_AssistantMinimizeFrame";
                    title = "展开";
                }
                const AssistantMinimizeImg = document.createElement("img");
                with (AssistantMinimizeImg) {
                    id = "Scholarscope_AssistantMinimizeImg";
                    src = chrome.runtime.getURL('images/Expand.png');
                }
                AssistantMinimizeFrame.addEventListener("click", function () {
                    if (window.innerWidth < 1400) {
                        if (AssistantFrame.style.top == "calc(68vh - 40px)" || AssistantFrame.style.top == "calc(-40px + 68vh)") {
                            AssistantFrame.style.top = "calc(100vh - 40px)";
                            AssistantMinimizeImg.style.transform = "scaleY(1)";
                            AssistantMinimizeFrame.title = "展开";
                            // Update Extension Database
                            chrome.storage.local.set({ "AssistantInterface": 0 });
                        } else {
                            AssistantFrame.style.top = "calc(68vh - 40px)";
                            AssistantMinimizeImg.style.transform = "scaleY(-1)";
                            AssistantMinimizeFrame.title = "折叠";
                            // Update Extension Database
                            chrome.storage.local.set({ "AssistantInterface": 1 });
                        }
                    } else {
                        if (AssistantFrame.style.top == "calc(18vh - 40px)" || AssistantFrame.style.top == "calc(-40px + 18vh)") {
                            AssistantFrame.style.top = "calc(100vh - 40px)";
                            AssistantMinimizeImg.style.transform = "scaleY(1)";
                            AssistantMinimizeFrame.title = "展开";
                            // Update Extension Database
                            chrome.storage.local.set({ "AssistantInterface": 0 });
                        } else {
                            AssistantFrame.style.top = "calc(18vh - 40px)";
                            AssistantMinimizeImg.style.transform = "scaleY(-1)";
                            AssistantMinimizeFrame.title = "折叠";
                            // Update Extension Database
                            chrome.storage.local.set({ "AssistantInterface": 1 });
                        }
                    }

                })
                AssistantMinimizeFrame.appendChild(AssistantMinimizeImg);

                // resume
                if (TempStorageData.AssistantInterface == 1) {
                    if (window.innerWidth < 1400) {
                        AssistantFrame.style.top = "calc(68vh - 40px)";
                    } else {
                        AssistantFrame.style.top = "calc(18vh - 40px)";
                    }
                    AssistantMinimizeImg.style.transform = "scaleY(-1)";
                } else {
                    AssistantFrame.style.top = "calc(100vh - 40px)";
                }

                // window resize
                window.addEventListener("resize", function () {
                    if (AssistantFrame.style.top != "calc(100vh - 40px)" && AssistantFrame.style.top != "calc(-40px + 100vh)") {
                        if (window.innerWidth < 1400 && window.innerWidth >= 760) {
                            AssistantFrame.style.top = "calc(68vh - 40px)";
                        } else if (window.innerWidth >= 1400) {
                            AssistantFrame.style.top = "calc(18vh - 40px)";
                        }
                    }
                })

                // Close Button
                const AssistantCloseFrame = document.createElement("div");
                with (AssistantCloseFrame) {
                    id = "Scholarscope_AssistantCloseFrame";
                    title = "临时关闭";
                }

                const AssistantCloseImg = document.createElement("img");
                with (AssistantCloseImg) {
                    id = "Scholarscope_AssistantCloseImg";
                    src = chrome.runtime.getURL('images/WhiteCross.png');
                }
                AssistantCloseFrame.appendChild(AssistantCloseImg);

                // Assistant Main
                const AssistantMainFrame = document.createElement("div");
                with (AssistantMainFrame) {
                    id = "Scholarscope_AssistantMainFrame";
                }

                const AssistantKeywordSelectedFrame = document.createElement("div");
                with (AssistantKeywordSelectedFrame) {
                    id = "Scholarscope_AssistantKeywordSelectedFrame";
                }

                const AssistantConversationFrame = document.createElement("div");
                with (AssistantConversationFrame) {
                    id = "Scholarscope_AssistantConversationFrame";
                }

                const AssistantConversationListFrame = document.createElement("div");
                with (AssistantConversationListFrame) {
                    id = "Scholarscope_AssistantConversationListFrame";
                }

                const AssistantConversationTip = document.createElement("div");
                with (AssistantConversationTip) {
                    id = "Scholarscope_AssistantConversationTip";
                    innerText = "小助理可能会犯错，请核查重要信息";
                }
                AssistantConversationFrame.append(AssistantConversationListFrame, AssistantConversationTip);

                const AssistantQuestionFrame = document.createElement("div");
                with (AssistantQuestionFrame) {
                    id = "Scholarscope_AssistantQuestionFrame";
                }
                AssistantMainFrame.append(AssistantKeywordSelectedFrame, AssistantConversationFrame, AssistantQuestionFrame);

                // Append
                AssistantFrame.append(AssistantImgFrame, AssitantTitle, AssistantCloseFrame, AssistantMinimizeFrame, AssistantMainFrame);
                BodyTag.appendChild(AssistantFrame);

                AssistantCloseFrame.addEventListener("click", function () {
                    BodyTag.removeChild(AssistantFrame);
                })

                // Fetch List
                let GetAssistantListPort = chrome.runtime.connect({
                    name: "GetAssistantList"
                });
                GetAssistantListPort.postMessage({});
                GetAssistantListPort.onMessage.addListener(function (msg) {
                    if (msg.Status == 200 && msg.Results.Status == 1) {
                        let AssistantListArray = msg.Results.Data;
                        for (let AssistantIndex = 0; AssistantIndex < AssistantListArray.length; AssistantIndex++) {
                            let AssistantTitle = AssistantListArray[AssistantIndex].Q;
                            let AssistantRequest = AssistantListArray[AssistantIndex].R;
                            let AssistantNKeyword = AssistantListArray[AssistantIndex].K;
                            let AssistantBackgroundColor = AssistantListArray[AssistantIndex].C;
                            let AssistantTextColor = AssistantListArray[AssistantIndex].T;
                            let AssistantContinuous = AssistantListArray[AssistantIndex].P;
                            if (AssistantContinuous == 1) {
                                ContinuousProcessArray.push(AssistantRequest);
                            }

                            let AssistantButton = document.createElement("div");
                            with (AssistantButton) {
                                className = "Scholarscope_AssistantButtons";
                                innerText = DOMPurify.sanitize(AssistantTitle);
                                style.backgroundColor = AssistantBackgroundColor;
                                style.color = AssistantTextColor;
                            }
                            AssistantButton.setAttribute("nkeyword", AssistantNKeyword);
                            AssistantButton.addEventListener("click", function () {
                                // Push Content to List
                                AssistantContent.push(
                                    { "Name": "User", "Content": AssistantTitle }
                                );
                                FlushConversationList();

                                // Send Request
                                let postData = {
                                    "Request": AssistantRequest,
                                    "PMID": AssistantPMID,
                                    "Keyword": AssistantKeyword
                                }

                                // Continuous
                                if (ContinuousProcessArray.includes(AssistantRequest)) {
                                    ContinuousProcess = AssistantRequest;
                                } else {
                                    ContinuousProcess = "";
                                }

                                let NKeyword = AssistantButton.getAttribute("nkeyword");
                                if (NKeyword == 1 && AssistantKeyword == "") {
                                    postData.Request = "ExtractKeyword";
                                }

                                let port = chrome.runtime.connect({
                                    name: "FetchAssistantData"
                                });
                                port.postMessage(postData);
                                port.onMessage.addListener(function (msg) {
                                    if (msg.Status == 200) {
                                        let Results = msg.Results.Data;
                                        let ReplyType = Results.Type;
                                        let ReplyContent = Results.Data;
                                        if (ReplyType == "Keyword") {
                                            AssistantContent.push(
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "PlainText",
                                                        "Data": "请选择您需要的关键词："
                                                    }
                                                },
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "Keyword",
                                                        "Data": ReplyContent
                                                    }
                                                }
                                            );
                                        } else if (ReplyType == "Translation") {
                                            AssistantContent.push(
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "Translation",
                                                        "Data": ReplyContent,
                                                        "Origin": Results.Origin,
                                                    }
                                                }
                                            );
                                            let OriginText = document.getElementById("Scholarscope_HighlightOrigin");
                                            if (ReplyType == "Translation" && !OriginText && AssistantTranslationTip == 0) {
                                                AssistantContent.push(
                                                    {
                                                        "Name": "Assistant",
                                                        "Content": {
                                                            "Type": "PlainText",
                                                            "Data": "如需显示中英文对照，请在插件设置中开启高亮"
                                                        }
                                                    }
                                                );
                                                AssistantTranslationTip = 1;
                                            }
                                        } else if (ReplyType == "PMID") {
                                            AssistantContent.push(
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "PlainText",
                                                        "Data": "为您找到以下文献："
                                                    }
                                                },
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "PMID",
                                                        "Data": ReplyContent
                                                    }
                                                }
                                            );
                                        } else if (ReplyType == "PlainText") {
                                            AssistantContent.push(
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "PlainText",
                                                        "Data": ReplyContent
                                                    }
                                                }
                                            );
                                        }
                                    } else {
                                        if (msg.Status == 401) {
                                            if (confirm("请登录 Scholarscope !", "")) {
                                                window.open("https://account.scholarscope.online/Login.php");
                                            }
                                        } else if (msg.Status == 404) {
                                            AssistantContent.push(
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "PlainText",
                                                        "Data": "未连接到 Scholarscope 服务器，请检查网络情况"
                                                    }
                                                }
                                            );

                                        } else if (msg.Status == 502 || msg.Status == 504) {
                                            AssistantContent.push(
                                                {
                                                    "Name": "Assistant",
                                                    "Content": {
                                                        "Type": "PlainText",
                                                        "Data": "Scholarscope 服务器正在受到网络攻击，部分服务受到影响"
                                                    }
                                                }
                                            );
                                        }
                                    }
                                    FlushConversationList();
                                    try {
                                        let UserConversationLoadingFrame = document.getElementById("Scholarscope_UserConversationLoadingFrame");
                                        if (UserConversationLoadingFrame) {
                                            UserConversationLoadingFrame.style.visibility = "hidden";
                                        }
                                    } catch (e) {
                                        console.log(e);
                                    }
                                })
                            })
                            AssistantQuestionFrame.appendChild(AssistantButton);
                        }
                    }
                });

                // Conversation Content List
                function FlushConversationList() {
                    AssistantConversationListFrame.replaceChildren();
                    for (let ConversationIndex = 0; ConversationIndex < AssistantContent.length; ConversationIndex++) {
                        if (AssistantContent[ConversationIndex].Name == "Assistant") {
                            let AssistantConversationContentFrame = document.createElement("div");
                            with (AssistantConversationContentFrame) {
                                className = "Scholarscope_AssistantConversationContentFrame";
                            }
                            let AssistantConversationIconFrame = document.createElement("div");
                            with (AssistantConversationIconFrame) {
                                className = "Scholarscope_AssistantConversationIconFrame";
                            }
                            let AssistantConversationIcon = document.createElement("img");
                            with (AssistantConversationIcon) {
                                className = "Scholarscope_AssistantConversationIcon";
                                src = chrome.runtime.getURL('images/icon20.png');
                            }
                            AssistantConversationIconFrame.appendChild(AssistantConversationIcon);

                            let AssistantConversationContent = document.createElement("div");
                            with (AssistantConversationContent) {
                                className = "Scholarscope_AssistantConversationContent notranslate";
                            }

                            let TempContent = AssistantContent[ConversationIndex].Content;
                            if (typeof TempContent === "object" && TempContent !== null) {
                                if (TempContent.Type === "Keyword") {
                                    // Keyword
                                    let TempKeywordArray = TempContent.Data;
                                    for (let TempKeywordIndex = 0; TempKeywordIndex < TempKeywordArray.length; TempKeywordIndex++) {
                                        let KeywordButton = document.createElement("div");
                                        with (KeywordButton) {
                                            className = "Scholarscope_AssistantKeywordButton";
                                            innerText = DOMPurify.sanitize(TempKeywordArray[TempKeywordIndex]);

                                        }

                                        KeywordButton.addEventListener("click", function () {
                                            AssistantKeyword = DOMPurify.sanitize(TempKeywordArray[TempKeywordIndex]);
                                            AssistantKeywordSelectedFrame.innerText = "选中的关键词：" + AssistantKeyword;
                                            AssistantKeywordSelectedFrame.style.height = "24px";

                                            // Waiting Process
                                            if (ContinuousProcess != "") {
                                                try {
                                                    let UserConversationLoadingFrame = document.getElementById("Scholarscope_UserConversationLoadingFrame");
                                                    if (UserConversationLoadingFrame) {
                                                        UserConversationLoadingFrame.style.visibility = "visible";
                                                    }
                                                } catch (e) {
                                                    console.log(e);
                                                }

                                                let postData = {
                                                    "Request": ContinuousProcess,
                                                    "PMID": AssistantPMID,
                                                    "Keyword": AssistantKeyword
                                                }

                                                let port = chrome.runtime.connect({
                                                    name: "FetchAssistantData"
                                                });
                                                port.postMessage(postData);
                                                port.onMessage.addListener(function (msg) {
                                                    if (msg.Status == 200) {
                                                        let Results = msg.Results.Data;
                                                        let ReplyType = Results.Type;
                                                        let ReplyContent = Results.Data;
                                                        if (ReplyType == "PlainText") {
                                                            AssistantContent.push(
                                                                {
                                                                    "Name": "Assistant",
                                                                    "Content": {
                                                                        "Type": "PlainText",
                                                                        "Data": ReplyContent
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    } else {
                                                        if (msg.Status == 401) {
                                                            if (confirm("请登录 Scholarscope !", "")) {
                                                                window.open("https://account.scholarscope.online/Login.php");
                                                            }
                                                        } else if (msg.Status == 404) {
                                                            AssistantContent.push(
                                                                {
                                                                    "Name": "Assistant",
                                                                    "Content": {
                                                                        "Type": "PlainText",
                                                                        "Data": "未连接到 Scholarscope 服务器，请检查网络情况"
                                                                    }
                                                                }
                                                            );

                                                        } else if (msg.Status == 502 || msg.Status == 504) {
                                                            AssistantContent.push(
                                                                {
                                                                    "Name": "Assistant",
                                                                    "Content": {
                                                                        "Type": "PlainText",
                                                                        "Data": "Scholarscope 服务器正在受到网络攻击，部分服务受到影响"
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    }
                                                    FlushConversationList();
                                                    try {
                                                        let UserConversationLoadingFrame = document.getElementById("Scholarscope_UserConversationLoadingFrame");
                                                        if (UserConversationLoadingFrame) {
                                                            UserConversationLoadingFrame.style.visibility = "hidden";
                                                        }
                                                    } catch (e) {
                                                        console.log(e);
                                                    }
                                                })
                                            }
                                        })
                                        AssistantConversationContent.appendChild(KeywordButton);
                                    }
                                    AssistantConversationContent.style.backgroundColor = "#FFFFFF";
                                    AssistantConversationContent.style.paddingLeft = "0";
                                } else if (TempContent.Type === "Translation") {
                                    let TempTranslationArray = TempContent.Data;
                                    let TempOriginArray = TempContent.Origin;
                                    let TranslationFrame = document.createElement("div");
                                    with (TranslationFrame) {
                                        className = "Scholarscope_TranslationSpanFather";
                                    }

                                    for (let TranslationIndex = 0; TranslationIndex < TempTranslationArray.length; TranslationIndex++) {
                                        let TranslationSpan = document.createElement("span");
                                        with (TranslationSpan) {
                                            className = "Scholarscope_TranslationSpan";
                                            innerText = TempTranslationArray[TranslationIndex];
                                        }
                                        if (TempTranslationArray.length == TempOriginArray.length) {
                                            TranslationSpan.setAttribute("origin", TempOriginArray[TranslationIndex]);
                                            let OriginText = document.getElementById("Scholarscope_HighlightOrigin");
                                            if (OriginText) {
                                                let OriginTextHTML = OriginText.innerHTML;
                                                const OriginTextHTMLConst = OriginText.innerHTML;
                                                TranslationSpan.addEventListener("mouseenter", function () {
                                                    function escapeHTML(str) {
                                                        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                                                    }

                                                    let HoverText = TranslationSpan.getAttribute("origin");
                                                    let HoverTextHTML = escapeHTML(HoverText);
                                                    OriginTextHTML = OriginTextHTMLConst.replace(HoverTextHTML, '<span class="Scholarscope_AssistantHighlight">' + HoverTextHTML + '</span>');
                                                    OriginText.innerHTML = DOMPurify.sanitize(OriginTextHTML);
                                                    scrollToDivIfNotVisible("Scholarscope_AssistantHighlight");
                                                });

                                                TranslationSpan.addEventListener("mouseleave", function () {
                                                    OriginTextHTML = OriginTextHTMLConst;
                                                    OriginText.innerHTML = DOMPurify.sanitize(OriginTextHTMLConst);
                                                })
                                            }
                                        }
                                        TranslationFrame.appendChild(TranslationSpan);
                                    }
                                    AssistantConversationContent.appendChild(TranslationFrame);
                                } else if (TempContent.Type === "PMID") {
                                    // PMID
                                    let TempKeywordArray = TempContent.Data;
                                    let TempTitleArray = TempKeywordArray.Title;
                                    let TempPMIDArray = TempKeywordArray.PMID;
                                    for (let TempKeywordIndex = 0; TempKeywordIndex < TempPMIDArray.length; TempKeywordIndex++) {
                                        let KRPButton = document.createElement("div");
                                        with (KRPButton) {
                                            className = "Scholarscope_AssistantKRPButton";
                                            innerText = DOMPurify.sanitize(TempTitleArray[TempKeywordIndex]);
                                            KRPButton.setAttribute("pmid", DOMPurify.sanitize(TempPMIDArray[TempKeywordIndex]));
                                        }
                                        KRPButton.addEventListener("click", function () {
                                            let KRPhref = "https://pubmed.ncbi.nlm.nih.gov/" + KRPButton.getAttribute("pmid");
                                            window.open(KRPhref, '_blank');
                                        })
                                        AssistantConversationContent.appendChild(KRPButton);
                                    }
                                    AssistantConversationContent.style.backgroundColor = "#FFFFFF";
                                    AssistantConversationContent.style.paddingLeft = "0";
                                } else if (TempContent.Type === "PlainText") {
                                    AssistantConversationContent.innerText = DOMPurify.sanitize(AssistantContent[ConversationIndex].Content.Data);
                                }
                            }

                            AssistantConversationContentFrame.append(AssistantConversationIconFrame, AssistantConversationContent);
                            AssistantConversationListFrame.appendChild(AssistantConversationContentFrame);
                        } else if (AssistantContent[ConversationIndex].Name == "User") {
                            let UserConversationContentFrame = document.createElement("div");
                            with (UserConversationContentFrame) {
                                className = "Scholarscope_UserConversationContentFrame";
                            }
                            let UserConversationIconFrame = document.createElement("div");
                            with (UserConversationIconFrame) {
                                className = "Scholarscope_UserConversationIconFrame";
                            }
                            let UserConversationIcon = document.createElement("img");
                            with (UserConversationIcon) {
                                className = "Scholarscope_UserConversationIcon";
                                src = chrome.runtime.getURL('images/user.png');
                            }
                            UserConversationIconFrame.appendChild(UserConversationIcon);

                            let UserConversationContent = document.createElement("div");
                            with (UserConversationContent) {
                                className = "Scholarscope_UserConversationContent";
                                innerText = DOMPurify.sanitize(AssistantContent[ConversationIndex].Content);
                            }

                            if (ConversationIndex == AssistantContent.length - 1) {
                                let UserConversationLoadingFrame = document.createElement("div");
                                with (UserConversationLoadingFrame) {
                                    id = "Scholarscope_UserConversationLoadingFrame";
                                }
                                let UserConversationLoadingGIF = document.createElement("img");
                                with (UserConversationLoadingGIF) {
                                    id = "Scholarscope_UserConversationLoadingGIF";
                                    src = chrome.runtime.getURL('images/loading.gif');
                                }
                                UserConversationLoadingFrame.appendChild(UserConversationLoadingGIF);
                                UserConversationContentFrame.append(UserConversationIconFrame, UserConversationContent, UserConversationLoadingFrame);
                            } else {
                                UserConversationContentFrame.append(UserConversationIconFrame, UserConversationContent);
                            }
                            AssistantConversationListFrame.appendChild(UserConversationContentFrame);
                        }
                    }
                    AssistantConversationListFrame.scrollTop = AssistantConversationListFrame.scrollHeight;
                }
                FlushConversationList();
            } catch (e) {
                console.log(e);
            }
        }
    });
}