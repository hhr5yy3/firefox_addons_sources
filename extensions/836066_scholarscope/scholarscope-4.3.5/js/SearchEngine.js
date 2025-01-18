console.log("Scholarscope is starting");
var SCHOLARSCOPE_GLOBAL_SAVESTATUS = 0;
var SCHOLARSCOPE_GLOBAL_SAVESTANDARD = 1;
var SCHOLARSCOPE_GLOBAL_SIDEBARPOPUP = 0;
let i = 0;
let manifest = chrome.runtime.getManifest();
let version = manifest.version;
let Greek = new Array("α", "β", "γ", "δ", "ε", "λ", "κ", "μ", "ξ", "π", "ρ", "σ", "χ", "ω");
let Eng = new Array("alpha", "beta", "gamma", "delta", "epsilon", "lambda", "kappa", "mu", "xi", "pi", "rho", "sigma", "chi", "omega");

// functions
function EmergencyInfo(String, LinkText = null, Link = null) {
    let inform = document.createElement("div");
    with (inform) {
        id = "informdiv";
    }
    let SearchResults = document.getElementById("search-results");
    let FirstItem = SearchResults.firstChild;
    SearchResults.insertBefore(inform, FirstItem)
    let informicon = document.createElement("div");
    with (informicon) {
        id = "informicon";
        innerHTML = "<img src='" + chrome.runtime.getURL('images/informicon.png') + "'>";
    }
    inform.appendChild(informicon);
    let informtext = document.createElement("div");
    with (informtext) {
        id = "informtext";
        innerHTML = DOMPurify.sanitize(String);
    }
    if (LinkText != null && Link != null) {
        let dllink1 = document.createElement("a");
        with (dllink1) {
            href = DOMPurify.sanitize(Link);
            target = "_blank";
            innerHTML = DOMPurify.sanitize("<div class='ssdlbt'>" + LinkText + "</div>");
        }
        inform.appendChild(dllink1);
    }
    inform.appendChild(informtext);
}
function NewCheckVersion(result) {
    let InformDiv = document.getElementById("informdiv");
    if (InformDiv == undefined) {
        let allowversion = result.allow;
        let deadline = result.deadline;
        let emergency = result.emergency;
        let latestversion = allowversion[allowversion.length - 1];

        let m = 0;
        let SearchResults = document.getElementById("search-results")
        let FirstItem = SearchResults.firstChild;
        if (emergency != "") {
            let inform = document.createElement("div");
            with (inform) {
                id = "informdiv";
            }
            SearchResults.insertBefore(inform, FirstItem)
            let informicon = document.createElement("div");
            with (informicon) {
                id = "informicon";
                innerHTML = "<img src='" + chrome.runtime.getURL('images/informicon.png') + "'>";
            }
            let informtext = document.createElement("div");
            with (informtext) {
                id = "informtext";
                innerHTML = DOMPurify.sanitize(emergency);
            }
            inform.appendChild(informicon);
            inform.appendChild(informtext);
        }
        for (let i = 0; i < allowversion.length; i += 1) {
            if (version == allowversion[i]) {
                // 该版本可用
                m = 1;
            }
        }
        if (m != 1) {
            let String = "插件需要在 <span style='color:yellow'>" + DOMPurify.sanitize(deadline) + "</span> 前更新，最新版本：" + DOMPurify.sanitize(latestversion);
            EmergencyInfo(String, "更新", "http://blog.scholarscope.online/how-to-install/")
        }
    }
};

function deleteEndingDot(string) {
    string = string.trim();
    let is_dot = string.substr(string.length - 1, 1);
    if (is_dot == ".") {
        return string.substr(0, string.length - 1);
    } else {
        return string;
    }
};
Array.prototype.in_array = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};
// Main
let pubmed_current_url = location.href;

// PubMed
const URLPatternA = new RegExp(/https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/\?((term)?(linkname)?(sort)?(cauthor_id)?(filter)?(from_uid)?(size)?)?=/, "i");
const URLPatternB = new RegExp(/https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/((searches)?(collections)?)\/[0-9]+\/\?/, "i");
const URLPatternC = new RegExp(/https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/((searches)?(collections)?)\/[0-9]+\/(\?((term)?(linkname)?(sort)?(cauthor_id)?(filter)?(from_uid)?(size)?)?=)?/, "i");
const URLPatternD = new RegExp(/https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/[0-9]+(\/)*/, "i");

// Scholarscope
const URLPatternX = new RegExp(/https:\/\/pubmed\.scholarscope\.online\/\?((term)?(linkname)?(sort)?(cauthor_id)?(filter)?(from_uid)?(size)?)?=/, "i");
const URLPatternY = new RegExp(/https:\/\/pubmed\.scholarscope\.online\/searches\/[0-9]+\/\?/, "i");
const URLPatternZ = new RegExp(/https:\/\/pubmed\.scholarscope\.online\/[0-9]+(\/)*/, "i");

// edu pattern
let URLPatternG = new RegExp(/http[s]?:\/\/[A-Za-z0-9\.\-]*\.edu\.cn[:0-9]*\/[A-Za-z0-9\/\.]*\?((term)?(linkname)?(sort)?(cauthor_id)?(filter)?(from_uid)?(size)?)?=/, "i");
let URLPatternH = new RegExp(/http[s]?:\/\/[A-Za-z0-9\.\-]*\.edu\.cn[:0-9]*\/[A-Za-z0-9\/\.]*[0-9]+(\/)*/, "i");

chrome.storage.local.get(null, function (LocalStorageData) {
    if (LocalStorageData.RecognizeEDU == 0) {
        URLPatternG = URLPatternA;
        URLPatternH = URLPatternD;
    }
    if (URLPatternA.test(pubmed_current_url) || URLPatternB.test(pubmed_current_url) || URLPatternC.test(pubmed_current_url) || URLPatternG.test(pubmed_current_url) || URLPatternX.test(pubmed_current_url) || URLPatternY.test(pubmed_current_url)) {
        if (URLPatternX.test(pubmed_current_url) || URLPatternY.test(pubmed_current_url)) {
            try {
                let NextPaginator = document.getElementsByClassName("next-results-paginator")[0];
                NextPaginator.style.height = "0";
                NextPaginator.style.padding = "0";
                NextPaginator.style.visibility = "hidden";
            } catch (e) {
                console.log(e);
            }
        }

        var SN = 0;
        let AuthorArray = [];
        let JournalArray = [];
        let DOIArray = [];
        let YearArray = [];
        let OtherDateInfo = [];
        let ArticleType = [];
        let PMIDRawArray = [];
        let PMIDArray = [];
        let Keyword = "";
        let FilterStatus = 0;
        let DisplayOptions = document.getElementById("id_format");

        // functions
        function ApplyFilter(ServerConfiguration, FilterStatus, Button) {
            console.log("Apply Filter");
            if (FilterStatus == 0) {
                FilterStatus = 1;
            }
            with (Button) {
                style.color = "white";
                style.backgroundColor = "#205493";
            }
            let FilterIconFrame = document.getElementsByClassName("Scholarscope_FilterIconFrame")[0];
            with (FilterIconFrame) {
                innerHTML = '<?xml version="1.0" ?><svg id="FilterIndex" fill="white" enable-background="new 0 0 32 32" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M29.815,6.168C29.484,5.448,28.783,5,27.986,5H4.014c-0.797,0-1.498,0.448-1.83,1.168  c-0.329,0.714-0.215,1.53,0.297,2.128c0,0,0.001,0.001,0.001,0.001L12,19.371V28c0,0.369,0.203,0.708,0.528,0.882  C12.676,28.961,12.838,29,13,29c0.194,0,0.387-0.057,0.555-0.168l6-4C19.833,24.646,20,24.334,20,24v-4.629l9.519-11.074  C30.031,7.698,30.145,6.882,29.815,6.168z" id="XMLID_276_"/></svg>';
            }

            let SearchResultsChunkArray = document.getElementsByClassName("search-results-chunk results-chunk");
            let ChunkLocation = SearchResultsChunkArray.length - 1;

            let Scholarscope_Factor = SearchResultsChunkArray[ChunkLocation].getElementsByClassName("Scholarscope_Factor");
            let Scholarscope_Quartile = SearchResultsChunkArray[ChunkLocation].getElementsByClassName("Scholarscope_Quartile");
            let FullDocsum = SearchResultsChunkArray[ChunkLocation].getElementsByClassName("full-docsum");

            for (let i = Scholarscope_Factor.length - 1; i >= 0; i--) {
                FullDocsum[i].style.height = "max-content";
                FullDocsum[i].style.marginBottom = "2.3rem";

                let QuartileValue = Scholarscope_Quartile[i].innerText;
                let QuartileCheck1 = 0;
                let QuartileCheck2 = 0;
                let QuartileCheck3 = 0;
                let QuartileCheck4 = 0;
                let QuartileCheckResult = 0;
                if (ServerConfiguration.FilterQuartile1 == 1 && (QuartileValue == "Q1" || QuartileValue == "1区")) {
                    QuartileCheck1 = 1;
                }
                if (ServerConfiguration.FilterQuartile2 == 1 && (QuartileValue == "Q2" || QuartileValue == "2区")) {
                    QuartileCheck2 = 1;
                }
                if (ServerConfiguration.FilterQuartile3 == 1 && (QuartileValue == "Q3" || QuartileValue == "3区")) {
                    QuartileCheck3 = 1;
                }
                if (ServerConfiguration.FilterQuartile4 == 1 && (QuartileValue == "Q4" || QuartileValue == "4区")) {
                    QuartileCheck4 = 1;
                }
                if (ServerConfiguration.FilterQuartile1 + ServerConfiguration.FilterQuartile2 + ServerConfiguration.FilterQuartile3 + ServerConfiguration.FilterQuartile4 == 0) {
                    QuartileCheckResult = 1;
                } else if (QuartileCheck1 + QuartileCheck2 + QuartileCheck3 + QuartileCheck4 > 0) {
                    QuartileCheckResult = 1;
                } else {
                    QuartileCheckResult = 0;
                }

                if (QuartileCheckResult == 1) {
                    let FactorValue = parseFloat(Scholarscope_Factor[i].innerText);
                    let Max = parseFloat(ServerConfiguration.FilterThresholdMax);
                    let Min = parseFloat(ServerConfiguration.FilterThresholdMin);
                    if (Max > Min && (isNaN(FactorValue) || FactorValue > Max || FactorValue < Min)) {
                        FullDocsum[i].style.height = "0px";
                        FullDocsum[i].style.marginBottom = "0";
                    } else if (Max <= Min) {
                        LocalStorageData.PageFilterParameter.AutoFilter = 0;
                        chrome.storage.local.set(LocalStorageData, function () {
                            chrome.runtime.sendMessage({
                                request: "UploadConfiguration"
                            });
                        });
                        let Scholarscope_FilterButton = document.getElementById("Scholarscope_FilterButton");
                        with (Scholarscope_FilterButton) {
                            style.color = "#212121";
                            style.backgroundColor = "white";
                        }
                    }
                } else {
                    FullDocsum[i].style.height = "0px";
                    FullDocsum[i].style.marginBottom = "0";
                }

            }
            try {
                let SelectShownFrame = document.getElementById("Scholarscope_SelectShownFrame");
                SelectShownFrame.style.visibility = "visible";
            } catch (e) {
                console.log(e);
            }
            return FilterStatus;
        }
        function CloseFilter(FilterStatus, Button) {
            if (FilterStatus == 1) {
                FilterStatus = 0;
            }
            with (Button) {
                style.color = "#212121";
                style.backgroundColor = "white";
            }
            let FilterIconFrame = document.getElementsByClassName("Scholarscope_FilterIconFrame")[0];
            with (FilterIconFrame) {
                innerHTML = '<?xml version="1.0" ?><svg id="FilterIndex" fill="#5B616B" enable-background="new 0 0 32 32" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M29.815,6.168C29.484,5.448,28.783,5,27.986,5H4.014c-0.797,0-1.498,0.448-1.83,1.168  c-0.329,0.714-0.215,1.53,0.297,2.128c0,0,0.001,0.001,0.001,0.001L12,19.371V28c0,0.369,0.203,0.708,0.528,0.882  C12.676,28.961,12.838,29,13,29c0.194,0,0.387-0.057,0.555-0.168l6-4C19.833,24.646,20,24.334,20,24v-4.629l9.519-11.074  C30.031,7.698,30.145,6.882,29.815,6.168z" id="XMLID_276_"/></svg>';
            }
            let Scholarscope_Factor = document.getElementsByClassName("Scholarscope_Factor");
            let FullDocsum = document.getElementsByClassName("full-docsum");
            for (let i = Scholarscope_Factor.length - 1; i >= 0; i--) {
                FullDocsum[i].style.height = "auto";
                FullDocsum[i].style.marginBottom = "2.3rem";
            }
            let FilterTipSpan = document.getElementsByClassName("Scholarscope_FilterTip");
            if (FilterTipSpan.length > 0) {
                let FilterTipCount = FilterTipSpan.length;
                for (let i = FilterTipCount - 1; i >= 0; i--) {
                    FilterTipSpan[i].remove();
                }
            }
            try {
                let SelectShownFrame = document.getElementById("Scholarscope_SelectShownFrame");
                SelectShownFrame.style.visibility = "hidden";
            } catch (e) {
                console.log(e);
            }
            return FilterStatus;
        }
        function UpdateFilterTip() {
            try {
                let SearchResultsPaginator = document.getElementsByClassName("search-results-paginator")[0];
                let SearchResultsList = document.getElementsByClassName("search-results-list")[0];
                if (SearchResultsPaginator != undefined) {
                    // 清除已有标签
                    let FilterTipSpan = document.getElementById("Scholarscope_FilterTip");
                    if (FilterTipSpan != undefined) {
                        FilterTipSpan.remove();
                    }

                    // 建立新标签
                    let FilterSpan = document.createElement("div");
                    with (FilterSpan) {
                        id = "Scholarscope_FilterTip";
                        innerText = "筛选器已开启";
                    }

                    let LoadButton = SearchResultsPaginator.getElementsByClassName("load-button next-page")[0];
                    SearchResultsList.appendChild(FilterSpan);
                    FilterSpan.before(SearchResultsPaginator);
                }
            } catch (e) {
                console.log(e);
            }
        }

        function ApplySorting(AllSorting = false, SortingMethod = 1) {
            console.log("Sorting Started");
            // Show Filter Loading GIF
            let FilterLoadingGIFFrame = document.getElementById("Scholarscope_FilterLoadingGIF");
            FilterLoadingGIFFrame.style.visibility = "visible";
            if (AllSorting == false) {
                console.log("Apply Auto Sorting | All Sorting: FALSE");
                let SearchResultsChunkArray = document.getElementsByClassName("search-results-chunk results-chunk");
                let i = SearchResultsChunkArray.length - 1;
                let FullDocsumArray = SearchResultsChunkArray[i].getElementsByClassName("full-docsum");
                let SortingMaterials = SearchResultsChunkArray[i].getElementsByClassName("Scholarscope_Factor");
                if (SortingMethod == 2) {
                    SortingMaterials = SearchResultsChunkArray[i].getElementsByClassName("Scholarscope_CitationCount");
                } else if (SortingMethod == 3) {
                    SortingMaterials = SearchResultsChunkArray[i].getElementsByClassName("Scholarscope_HeatCount");
                }

                for (let j = 0; j < SortingMaterials.length; j++) {
                    let MaxLocation = j;
                    for (let k = j + 1; k < FullDocsumArray.length; k++) {
                        if (isNaN(parseFloat(SortingMaterials[MaxLocation].innerText))) {
                            MaxLocation = k;
                        } else if (parseFloat(SortingMaterials[k].innerText) > parseFloat(SortingMaterials[MaxLocation].innerText)) {
                            MaxLocation = k;
                        }
                    }
                    FullDocsumArray[MaxLocation].parentNode.insertBefore(FullDocsumArray[MaxLocation], FullDocsumArray[j]);
                }
            } else {

                console.log("Apply Auto Sorting | All Sorting: TRUE");
                let SearchResultsChunks = document.getElementsByClassName("search-results-chunks")[0];
                let FullDocsums = SearchResultsChunks.getElementsByClassName("full-docsum");
                let Scholarscope_SearchResultsChunk = document.createElement("div");
                with (Scholarscope_SearchResultsChunk) {
                    id = "Scholarscope_SearchResultsChunk";
                    className = "search-results-chunk results-chunk";
                }
                SearchResultsChunks.insertBefore(Scholarscope_SearchResultsChunk, SearchResultsChunks.firstChild);

                let SortingMaterials = document.getElementsByClassName("Scholarscope_Factor");
                if (SortingMethod == 2) {
                    SortingMaterials = document.getElementsByClassName("Scholarscope_CitationCount");
                } else if (SortingMethod == 3) {
                    SortingMaterials = document.getElementsByClassName("Scholarscope_HeatCount");
                }

                for (let i = 0; i < SortingMaterials.length; i++) {
                    let MaxLocation = i;
                    for (let j = i + 1; j < SortingMaterials.length; j++) {
                        if (isNaN(parseFloat(SortingMaterials[MaxLocation].innerText))) {
                            MaxLocation = j;
                        } else if (parseFloat(SortingMaterials[j].innerText) > parseFloat(SortingMaterials[MaxLocation].innerText)) {
                            MaxLocation = j;
                        }
                    }
                    Scholarscope_SearchResultsChunk.appendChild(FullDocsums[MaxLocation]);
                }

                // 删除原有SearchResultsChunk
                let SearchResultsChunk = document.getElementsByClassName("search-results-chunk");
                for (let i = 0; i < SearchResultsChunk.length; i++) {
                    if (SearchResultsChunk[i].id != "Scholarscope_SearchResultsChunk") {
                        let Title = SearchResultsChunk[i].getElementsByClassName("title")[0];
                        if (Title != undefined) {
                            Title.remove();
                        }
                    }
                }
            }
            // Hide Filter Loading GIF
            FilterLoadingGIFFrame.style.visibility = "hidden";
            console.log("Sorting Finished");
        };
        function DisableSorting() {
            console.log("Disable Sorting");
            let FilterLoadingGIFFrame = document.getElementById("Scholarscope_FilterLoadingGIF");
            FilterLoadingGIFFrame.style.visibility = "visible";
            location.reload();
        }

        // Remove Matching Article
        try {
            let MatchingCitations = document.getElementsByClassName("matching-citations")[0];
            if (MatchingCitations != undefined) {
                with (MatchingCitations) {
                    className = "matching-citations";
                }
            }
        } catch (e) {
            console.log(e);
        }

        if (DisplayOptions.value == "summary") {
            console.log("Page Type: Summary");
            let SearchOptions = document.getElementsByClassName("search-options")[0];
            if (SearchOptions != undefined) {
                let ScholarscopeInnerWrap = document.createElement("div");
                with (ScholarscopeInnerWrap) {
                    id = "Scholarscope_InnerWrap";
                    className = "inner-wrap";
                }
                let ButtonFrame = document.createElement("div");
                with (ButtonFrame) {
                    id = "Scholarscope_ButtonFrame";
                }
                // 保存按钮
                try {
                    let SaveResultsPanelTrigger = document.getElementById("save-results-panel-trigger");
                    SaveResultsPanelTrigger.innerText = " 保存 ";
                } catch (e) {
                    console.log(e);
                }
                // 添加按条件筛选按钮
                try {
                    let FilterButton = document.createElement("div");
                    let FilterIconFrame = document.createElement("div");
                    with (FilterButton) {
                        id = "Scholarscope_FilterButton";
                        className = "notranslate";
                        innerText = "按条件筛选";
                        if (FilterStatus == 1) {
                            style.backgroundColor = "#205493";
                        }
                    }
                    with (FilterIconFrame) {
                        className = "Scholarscope_FilterIconFrame";
                        innerHTML = '<?xml version="1.0" ?><svg id="FilterIndex" fill="#5B616B" enable-background="new 0 0 32 32" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M29.815,6.168C29.484,5.448,28.783,5,27.986,5H4.014c-0.797,0-1.498,0.448-1.83,1.168  c-0.329,0.714-0.215,1.53,0.297,2.128c0,0,0.001,0.001,0.001,0.001L12,19.371V28c0,0.369,0.203,0.708,0.528,0.882  C12.676,28.961,12.838,29,13,29c0.194,0,0.387-0.057,0.555-0.168l6-4C19.833,24.646,20,24.334,20,24v-4.629l9.519-11.074  C30.031,7.698,30.145,6.882,29.815,6.168z" id="XMLID_276_"/></svg>';
                    }
                    FilterButton.appendChild(FilterIconFrame);
                    FilterButton.addEventListener("click", function () {
                        chrome.storage.local.get(null, function (CurrentStorageData) {
                            let FilterDropDown = document.getElementById("Scholarscope_DropDown");
                            if (FilterDropDown == undefined) {
                                // 下拉菜单
                                let FilterDropDown = document.createElement("div");
                                with (FilterDropDown) {
                                    id = "Scholarscope_DropDown";
                                    className = "notranslate";
                                }
                                // Container
                                let FilterContainerFrame = document.createElement("div");
                                with (FilterContainerFrame) {
                                    id = "Scholarscope_FilterContainerFrame";
                                }
                                // 极值容器
                                let FilterValueInputFrame = document.createElement("div");
                                with (FilterValueInputFrame) {
                                    id = "Scholarscope_FilterValueInputFrame";
                                }
                                // 分区容器
                                let FilterQuartileInputFrame = document.createElement("div");
                                with (FilterQuartileInputFrame) {
                                    id = "Scholarscope_FilterQuartileInputFrame";
                                }
                                // 1st Class
                                let FilterValueQuartile1Frame = document.createElement("div");
                                with (FilterValueQuartile1Frame) {
                                    className = "Scholarscope_FilterValueQuartileFrames";
                                }
                                let FilterValueQuartile1Input = document.createElement("input");
                                with (FilterValueQuartile1Input) {
                                    id = "Scholarscope_FilterValueQuartile1Input";
                                    className = "Scholarscope_FilterValueQuartileInputs";
                                    type = "checkbox";
                                    style.webkitAppearance = "checkbox";
                                    style.position = "static";
                                    if (CurrentStorageData.PageFilterParameter.FilterQuartile1 == 0) {
                                        checked = false;
                                    } else if (CurrentStorageData.PageFilterParameter.FilterQuartile1 == 1) {
                                        checked = true;
                                    }
                                }
                                FilterValueQuartile1Input.addEventListener("click", function () {
                                    if (FilterValueQuartile1Input.checked == true) {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile1 = 1;
                                    } else {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile1 = 0;
                                    }
                                })
                                let FilterValueQuartile1Text = document.createElement("div");
                                with (FilterValueQuartile1Text) {
                                    className = "Scholarscope_FilterValueQuartileTexts";
                                    if (CurrentStorageData.CAS == 0) {
                                        innerText = "Q1";
                                    } else if (CurrentStorageData.CAS == 1) {
                                        innerText = "1区";
                                    }
                                }
                                // 2nd Class
                                let FilterValueQuartile2Frame = document.createElement("div");
                                with (FilterValueQuartile2Frame) {
                                    className = "Scholarscope_FilterValueQuartileFrames";
                                }
                                let FilterValueQuartile2Input = document.createElement("input");
                                with (FilterValueQuartile2Input) {
                                    id = "Scholarscope_FilterValueQuartile2Input";
                                    className = "Scholarscope_FilterValueQuartileInputs";
                                    type = "checkbox";
                                    style.webkitAppearance = "checkbox";
                                    style.position = "static";
                                    if (CurrentStorageData.PageFilterParameter.FilterQuartile2 == 0) {
                                        checked = false;
                                    } else if (CurrentStorageData.PageFilterParameter.FilterQuartile2 == 1) {
                                        checked = true;
                                    }
                                }
                                FilterValueQuartile2Input.addEventListener("click", function () {
                                    if (FilterValueQuartile2Input.checked == true) {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile2 = 1;
                                    } else {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile2 = 0;
                                    }
                                })
                                let FilterValueQuartile2Text = document.createElement("div");
                                with (FilterValueQuartile2Text) {
                                    className = "Scholarscope_FilterValueQuartileTexts";
                                    if (CurrentStorageData.CAS == 0) {
                                        innerText = "Q2";
                                    } else if (CurrentStorageData.CAS == 1) {
                                        innerText = "2区";
                                    }
                                }
                                // 3rd Class
                                let FilterValueQuartile3Frame = document.createElement("div");
                                with (FilterValueQuartile3Frame) {
                                    className = "Scholarscope_FilterValueQuartileFrames";
                                }
                                let FilterValueQuartile3Input = document.createElement("input");
                                with (FilterValueQuartile3Input) {
                                    id = "Scholarscope_FilterValueQuartile3Input";
                                    className = "Scholarscope_FilterValueQuartileInputs";
                                    type = "checkbox";
                                    style.webkitAppearance = "checkbox";
                                    style.position = "static";
                                    if (CurrentStorageData.PageFilterParameter.FilterQuartile3 == 0) {
                                        checked = false;
                                    } else if (CurrentStorageData.PageFilterParameter.FilterQuartile3 == 1) {
                                        checked = true;
                                    }
                                }
                                FilterValueQuartile3Input.addEventListener("click", function () {
                                    if (FilterValueQuartile3Input.checked == true) {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile3 = 1;
                                    } else {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile3 = 0;
                                    }
                                })
                                let FilterValueQuartile3Text = document.createElement("div");
                                with (FilterValueQuartile3Text) {
                                    className = "Scholarscope_FilterValueQuartileTexts";
                                    if (CurrentStorageData.CAS == 0) {
                                        innerText = "Q3";
                                    } else if (CurrentStorageData.CAS == 1) {
                                        innerText = "3区";
                                    }
                                }
                                // 4th Class
                                let FilterValueQuartile4Frame = document.createElement("div");
                                with (FilterValueQuartile4Frame) {
                                    className = "Scholarscope_FilterValueQuartileFrames";
                                }
                                let FilterValueQuartile4Input = document.createElement("input");
                                with (FilterValueQuartile4Input) {
                                    id = "Scholarscope_FilterValueQuartile4Input";
                                    className = "Scholarscope_FilterValueQuartileInputs";
                                    type = "checkbox";
                                    style.webkitAppearance = "checkbox";
                                    style.position = "static";
                                    if (CurrentStorageData.PageFilterParameter.FilterQuartile4 == 0) {
                                        checked = false;
                                    } else if (CurrentStorageData.PageFilterParameter.FilterQuartile4 == 1) {
                                        checked = true;
                                    }
                                }
                                FilterValueQuartile4Input.addEventListener("click", function () {
                                    if (FilterValueQuartile4Input.checked == true) {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile4 = 1;
                                    } else {
                                        CurrentStorageData.PageFilterParameter.FilterQuartile4 = 0;
                                    }
                                })
                                let FilterValueQuartile4Text = document.createElement("div");
                                with (FilterValueQuartile4Text) {
                                    className = "Scholarscope_FilterValueQuartileTexts";
                                    if (CurrentStorageData.CAS == 0) {
                                        innerText = "Q4";
                                    } else if (CurrentStorageData.CAS == 1) {
                                        innerText = "4区";
                                    }
                                }
                                FilterValueQuartile1Frame.append(FilterValueQuartile1Input, FilterValueQuartile1Text);
                                FilterValueQuartile2Frame.append(FilterValueQuartile2Input, FilterValueQuartile2Text);
                                FilterValueQuartile3Frame.append(FilterValueQuartile3Input, FilterValueQuartile3Text);
                                FilterValueQuartile4Frame.append(FilterValueQuartile4Input, FilterValueQuartile4Text);
                                FilterQuartileInputFrame.append(FilterValueQuartile1Frame, FilterValueQuartile2Frame, FilterValueQuartile3Frame, FilterValueQuartile4Frame);
                                // 最大值输入框
                                let FilterValueMinInputFrame = document.createElement("div");
                                with (FilterValueMinInputFrame) {
                                    id = "Scholarscope_FilterValueMinInputFrame";
                                    innerText = "最小值："
                                }
                                let FilterValueMinInput = document.createElement("input");
                                with (FilterValueMinInput) {
                                    id = "Scholarscope_FilterValueMinInput";
                                    type = "number";
                                    placeholder = "0.0";
                                    step = "0.1";
                                    value = CurrentStorageData.PageFilterParameter.FilterThresholdMin;
                                    min = "0";
                                    max = "2000";
                                }
                                // 最小值输入框
                                let FilterValueMaxInputFrame = document.createElement("div");
                                with (FilterValueMaxInputFrame) {
                                    id = "Scholarscope_FilterValueMaxInputFrame";
                                    innerText = "最大值："
                                }
                                let FilterValueMaxInput = document.createElement("input");
                                with (FilterValueMaxInput) {
                                    id = "Scholarscope_FilterValueMaxInput";
                                    type = "number";
                                    placeholder = "0.0";
                                    step = "0.1";
                                    value = CurrentStorageData.PageFilterParameter.FilterThresholdMax;
                                    min = "0";
                                    max = "2000";
                                }
                                FilterValueMinInputFrame.appendChild(FilterValueMinInput);
                                FilterValueMaxInputFrame.appendChild(FilterValueMaxInput);
                                FilterValueInputFrame.append(FilterValueMinInputFrame, FilterValueMaxInputFrame);
                                FilterContainerFrame.append(FilterValueInputFrame, FilterQuartileInputFrame);
                                // 分割线
                                let SeparateLine = document.createElement("div");
                                with (SeparateLine) {
                                    id = "Scholarscope_SeparateLine";
                                }
                                // 始终生效选项
                                let FilterRememberFrame = document.createElement("div");
                                with (FilterRememberFrame) {
                                    id = "Scholarscope_FilterRememberFrame";
                                }
                                let FilterRememberInput = document.createElement("input");
                                with (FilterRememberInput) {
                                    id = "Scholarscope_FilterCheckbox";
                                    type = "checkbox";
                                    style.webkitAppearance = "checkbox";
                                    if (CurrentStorageData.PageFilterParameter.AutoFilter == 0) {
                                        checked = false;
                                    } else if (CurrentStorageData.PageFilterParameter.AutoFilter == 1) {
                                        checked = true
                                    }
                                }
                                let FilterRememberText = document.createElement("div");
                                with (FilterRememberText) {
                                    id = "Scholarscope_FilterText";
                                    innerText = "始终开启筛选器";
                                }
                                FilterRememberFrame.append(FilterRememberInput, FilterRememberText);
                                // 需要帮助按钮
                                let FilterNeedHelp = document.createElement("div");
                                with (FilterNeedHelp) {
                                    id = "Scholarscope_FilterNeedHelp";
                                }
                                let FilterNeedHelpLink = document.createElement("a");
                                with (FilterNeedHelpLink) {
                                    id = "Scholarscope_FilterNeedHelpLink";
                                    innerText = "需要帮助？";
                                    href = "http://blog.scholarscope.online/page_filter/";
                                    target = "_blank";
                                }
                                FilterNeedHelp.appendChild(FilterNeedHelpLink);
                                // 确认和取消按钮
                                let CreateFilterButton = document.createElement("div");
                                with (CreateFilterButton) {
                                    id = "Scholarscope_CreateFilterButton";
                                    innerText = "应用筛选器";
                                }
                                CreateFilterButton.addEventListener("click", function () {
                                    let Min = parseFloat(FilterValueMinInput.value);
                                    let Max = parseFloat(FilterValueMaxInput.value);
                                    if (Min >= Max) {
                                        alert("无效的筛选器：最小值 ≥ 最大值");
                                    } else {
                                        CurrentStorageData.PageFilterParameter.FilterThresholdMin = Min;
                                        CurrentStorageData.PageFilterParameter.FilterThresholdMax = Max;
                                        if (FilterRememberInput.checked == true) {
                                            CurrentStorageData.PageFilterParameter.AutoFilter = 1;
                                        } else {
                                            CurrentStorageData.PageFilterParameter.AutoFilter = 0;
                                        }
                                        chrome.storage.local.set(CurrentStorageData, function () {
                                            chrome.runtime.sendMessage({
                                                request: "UploadConfiguration"
                                            });
                                        });
                                        FilterDropDown.remove();
                                        FilterStatus = ApplyFilter(CurrentStorageData.PageFilterParameter, FilterStatus, FilterButton);
                                        UpdateFilterTip();
                                    }
                                })

                                // 返回按钮
                                let CancelFilterFrameButton = document.createElement("img");
                                with (CancelFilterFrameButton) {
                                    id = "Scholarscope_CancelFilterButton";
                                    src = chrome.runtime.getURL('images/Cross_Gray.png')
                                }
                                let CancelFilterFrame = document.createElement("div");
                                with (CancelFilterFrame) {
                                    id = "Scholarscope_CancelFilterFrame";
                                    title = "返回";
                                }
                                CancelFilterFrame.appendChild(CancelFilterFrameButton);
                                CancelFilterFrame.addEventListener("click", function () {
                                    FilterDropDown.remove();
                                })
                                // 关闭功能按钮
                                let CloseFilterButton = document.createElement("div");
                                with (CloseFilterButton) {
                                    id = "Scholarscope_CloseFilterButton";
                                    innerText = "关闭筛选器";
                                }
                                CloseFilterButton.addEventListener("click", function () {
                                    LocalStorageData.PageFilterParameter.AutoFilter = 0;
                                    chrome.storage.local.set(LocalStorageData, function () {
                                        chrome.runtime.sendMessage({
                                            request: "UploadConfiguration"
                                        });
                                    });
                                    FilterDropDown.remove();
                                    FilterStatus = CloseFilter(FilterStatus, FilterButton);
                                })

                                FilterDropDown.append(FilterContainerFrame, SeparateLine, FilterRememberFrame, FilterNeedHelp, CreateFilterButton, CloseFilterButton, CancelFilterFrame);
                                ButtonFrame.appendChild(FilterDropDown);
                            } else {
                                FilterDropDown.remove();
                            }
                        });
                    })
                    ButtonFrame.appendChild(FilterButton);
                } catch (e) {
                    console.log(e);
                }

                // 添加按分数排序按钮
                try {
                    let SortButton = document.createElement("div");
                    let SortIconFrame = document.createElement("div");
                    with (SortIconFrame) {
                        className = "Scholarscope_SortIconFrame";
                        innerHTML = '<?xml version="1.0" ?><svg fill="#5B616B" height="14" viewBox="0 0 28 28" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M24.2441 18.373L21.293 21.3232L21.3125 11C21.3125 10.4473 20.8652 10 20.3125 10C19.7617 10 19.3125 10.4473 19.3125 11L19.293 21.2529L16.4141 18.373C16.0234 17.9834 15.3906 17.9834 15 18.373C14.6094 18.7637 14.6094 19.3975 15 19.7881L19.1152 23.9033C19.3887 24.2656 19.8242 24.5 20.3125 24.5C20.6934 24.5 21.0391 24.3594 21.3027 24.127C21.3418 24.0977 21.3789 24.0654 21.4141 24.0303L25.6582 19.7881C26.0488 19.3975 26.0488 18.7637 25.6582 18.373C25.2676 17.9834 24.6348 17.9834 24.2441 18.373Z"/><path d="M2 20.7002C2 21.1416 2.35742 21.5 2.80078 21.5H10.6992C10.8906 21.5 11.0664 21.4336 11.2031 21.3223C11.3848 21.1758 11.5 20.9512 11.5 20.7002V20.2998C11.5 19.8584 11.1426 19.5 10.6992 19.5H2.80078C2.56836 19.5 2.35938 19.5977 2.21289 19.7549C2.13086 19.8418 2.07031 19.9473 2.03516 20.0645C2.01172 20.1387 2 20.2178 2 20.2998V20.7002Z"/><path d="M2.50586 13.4434C2.42969 13.4131 2.35938 13.3721 2.29688 13.3213C2.11523 13.1748 2 12.9512 2 12.7002V12.2998C2 11.8584 2.35742 11.5 2.80078 11.5H15.1992C15.6426 11.5 16 11.8584 16 12.2998V12.7002C16 13.1416 15.6426 13.5 15.1992 13.5H2.80078C2.69727 13.5 2.59766 13.4795 2.50586 13.4434Z"/><path d="M2.07422 5.03516C2.02734 4.93359 2 4.82031 2 4.7002V4.2998C2 4.04492 2.11914 3.81738 2.30469 3.6709C2.44141 3.56348 2.61328 3.5 2.80078 3.5H24.1992C24.6426 3.5 25 3.8584 25 4.2998V4.7002C25 5.1416 24.6426 5.5 24.1992 5.5H2.80078C2.47852 5.5 2.20117 5.30957 2.07422 5.03516Z"/></svg>';
                    }
                    // 添加等待GIF
                    let FilterLoadingGIFFrame = document.createElement("div");
                    with (FilterLoadingGIFFrame) {
                        id = "Scholarscope_FilterLoadingGIFFrame";
                    }
                    let FilterLoadingGIF = document.createElement("img");
                    with (FilterLoadingGIF) {
                        id = "Scholarscope_FilterLoadingGIF";
                        src = chrome.runtime.getURL('images/loading.gif');
                    }
                    FilterLoadingGIFFrame.appendChild(FilterLoadingGIF);

                    // 添加选中按钮
                    let SelectShownFrame = document.createElement("div");
                    with (SelectShownFrame) {
                        id = "Scholarscope_SelectShownFrame";
                        innerText = "选中页面上的文献";
                    }
                    SelectShownFrame.addEventListener("click", function () {
                        FilterLoadingGIFFrame.style.visibility = "visible";
                        setTimeout(function () {
                            let FullDocsum = document.getElementsByClassName("full-docsum");
                            for (let FullDocsumIndex = 0; FullDocsumIndex < FullDocsum.length; FullDocsumIndex++) {
                                if (FullDocsum[FullDocsumIndex].style.height != "0px") {
                                    let TempCheckBox = FullDocsum[FullDocsumIndex].getElementsByClassName("search-result-selector")[0];
                                    if (TempCheckBox.checked == false) {
                                        TempCheckBox.click();
                                    }
                                }
                            }
                            FilterLoadingGIFFrame.style.visibility = "hidden";
                        }, 500);
                    })

                    with (SortButton) {
                        id = "Scholarscope_SortButton";
                        className = "notranslate";
                        if (LocalStorageData.PageFilterParameter.SortingMethod == 0) {
                            SortButton.innerText = "按分数排序";
                        } else if (LocalStorageData.PageFilterParameter.SortingMethod == 1) {
                            SortButton.innerText = "按分数排序";
                        } else if (LocalStorageData.PageFilterParameter.SortingMethod == 2) {
                            SortButton.innerText = "按引用量排序";
                        } else if (LocalStorageData.PageFilterParameter.SortingMethod == 3) {
                            SortButton.innerText = "按阅读量排序";
                        }
                        if (LocalStorageData.PageFilterParameter.AutoSorting == 1) {
                            SortButton.style.backgroundColor = "#205493";
                            with (SortIconFrame) {
                                innerHTML = '<?xml version="1.0" ?><svg fill="white" height="14" viewBox="0 0 28 28" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M24.2441 18.373L21.293 21.3232L21.3125 11C21.3125 10.4473 20.8652 10 20.3125 10C19.7617 10 19.3125 10.4473 19.3125 11L19.293 21.2529L16.4141 18.373C16.0234 17.9834 15.3906 17.9834 15 18.373C14.6094 18.7637 14.6094 19.3975 15 19.7881L19.1152 23.9033C19.3887 24.2656 19.8242 24.5 20.3125 24.5C20.6934 24.5 21.0391 24.3594 21.3027 24.127C21.3418 24.0977 21.3789 24.0654 21.4141 24.0303L25.6582 19.7881C26.0488 19.3975 26.0488 18.7637 25.6582 18.373C25.2676 17.9834 24.6348 17.9834 24.2441 18.373Z"/><path d="M2 20.7002C2 21.1416 2.35742 21.5 2.80078 21.5H10.6992C10.8906 21.5 11.0664 21.4336 11.2031 21.3223C11.3848 21.1758 11.5 20.9512 11.5 20.7002V20.2998C11.5 19.8584 11.1426 19.5 10.6992 19.5H2.80078C2.56836 19.5 2.35938 19.5977 2.21289 19.7549C2.13086 19.8418 2.07031 19.9473 2.03516 20.0645C2.01172 20.1387 2 20.2178 2 20.2998V20.7002Z"/><path d="M2.50586 13.4434C2.42969 13.4131 2.35938 13.3721 2.29688 13.3213C2.11523 13.1748 2 12.9512 2 12.7002V12.2998C2 11.8584 2.35742 11.5 2.80078 11.5H15.1992C15.6426 11.5 16 11.8584 16 12.2998V12.7002C16 13.1416 15.6426 13.5 15.1992 13.5H2.80078C2.69727 13.5 2.59766 13.4795 2.50586 13.4434Z"/><path d="M2.07422 5.03516C2.02734 4.93359 2 4.82031 2 4.7002V4.2998C2 4.04492 2.11914 3.81738 2.30469 3.6709C2.44141 3.56348 2.61328 3.5 2.80078 3.5H24.1992C24.6426 3.5 25 3.8584 25 4.2998V4.7002C25 5.1416 24.6426 5.5 24.1992 5.5H2.80078C2.47852 5.5 2.20117 5.30957 2.07422 5.03516Z"/></svg>';
                            }
                            SortButton.style.color = "white";
                            FilterLoadingGIFFrame.style.visibility = "visible";
                        }
                    }
                    SortButton.appendChild(SortIconFrame);

                    SortButton.addEventListener("click", function () {
                        if (LocalStorageData.PageFilterParameter.AutoSorting == 0) {
                            FilterLoadingGIFFrame.style.visibility = "visible";
                            this.style.backgroundColor = "#205493";
                            this.style.color = "white";
                            with (SortIconFrame) {
                                innerHTML = '<?xml version="1.0" ?><svg fill="white" height="14" viewBox="0 0 28 28" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M24.2441 18.373L21.293 21.3232L21.3125 11C21.3125 10.4473 20.8652 10 20.3125 10C19.7617 10 19.3125 10.4473 19.3125 11L19.293 21.2529L16.4141 18.373C16.0234 17.9834 15.3906 17.9834 15 18.373C14.6094 18.7637 14.6094 19.3975 15 19.7881L19.1152 23.9033C19.3887 24.2656 19.8242 24.5 20.3125 24.5C20.6934 24.5 21.0391 24.3594 21.3027 24.127C21.3418 24.0977 21.3789 24.0654 21.4141 24.0303L25.6582 19.7881C26.0488 19.3975 26.0488 18.7637 25.6582 18.373C25.2676 17.9834 24.6348 17.9834 24.2441 18.373Z"/><path d="M2 20.7002C2 21.1416 2.35742 21.5 2.80078 21.5H10.6992C10.8906 21.5 11.0664 21.4336 11.2031 21.3223C11.3848 21.1758 11.5 20.9512 11.5 20.7002V20.2998C11.5 19.8584 11.1426 19.5 10.6992 19.5H2.80078C2.56836 19.5 2.35938 19.5977 2.21289 19.7549C2.13086 19.8418 2.07031 19.9473 2.03516 20.0645C2.01172 20.1387 2 20.2178 2 20.2998V20.7002Z"/><path d="M2.50586 13.4434C2.42969 13.4131 2.35938 13.3721 2.29688 13.3213C2.11523 13.1748 2 12.9512 2 12.7002V12.2998C2 11.8584 2.35742 11.5 2.80078 11.5H15.1992C15.6426 11.5 16 11.8584 16 12.2998V12.7002C16 13.1416 15.6426 13.5 15.1992 13.5H2.80078C2.69727 13.5 2.59766 13.4795 2.50586 13.4434Z"/><path d="M2.07422 5.03516C2.02734 4.93359 2 4.82031 2 4.7002V4.2998C2 4.04492 2.11914 3.81738 2.30469 3.6709C2.44141 3.56348 2.61328 3.5 2.80078 3.5H24.1992C24.6426 3.5 25 3.8584 25 4.2998V4.7002C25 5.1416 24.6426 5.5 24.1992 5.5H2.80078C2.47852 5.5 2.20117 5.30957 2.07422 5.03516Z"/></svg>';
                            }
                            LocalStorageData.PageFilterParameter.AutoSorting = 1;
                            chrome.storage.local.set(LocalStorageData, function () {
                                chrome.runtime.sendMessage({
                                    request: "UploadConfiguration"
                                });
                            });
                            ApplySorting(true, LocalStorageData.PageFilterParameter.SortingMethod);
                        } else if (LocalStorageData.PageFilterParameter.AutoSorting == 1) {
                            this.style.backgroundColor = "white";
                            this.style.color = "#212121";
                            with (SortIconFrame) {
                                innerHTML = '<?xml version="1.0" ?><svg fill="#5B616B" height="14" viewBox="0 0 28 28" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M24.2441 18.373L21.293 21.3232L21.3125 11C21.3125 10.4473 20.8652 10 20.3125 10C19.7617 10 19.3125 10.4473 19.3125 11L19.293 21.2529L16.4141 18.373C16.0234 17.9834 15.3906 17.9834 15 18.373C14.6094 18.7637 14.6094 19.3975 15 19.7881L19.1152 23.9033C19.3887 24.2656 19.8242 24.5 20.3125 24.5C20.6934 24.5 21.0391 24.3594 21.3027 24.127C21.3418 24.0977 21.3789 24.0654 21.4141 24.0303L25.6582 19.7881C26.0488 19.3975 26.0488 18.7637 25.6582 18.373C25.2676 17.9834 24.6348 17.9834 24.2441 18.373Z"/><path d="M2 20.7002C2 21.1416 2.35742 21.5 2.80078 21.5H10.6992C10.8906 21.5 11.0664 21.4336 11.2031 21.3223C11.3848 21.1758 11.5 20.9512 11.5 20.7002V20.2998C11.5 19.8584 11.1426 19.5 10.6992 19.5H2.80078C2.56836 19.5 2.35938 19.5977 2.21289 19.7549C2.13086 19.8418 2.07031 19.9473 2.03516 20.0645C2.01172 20.1387 2 20.2178 2 20.2998V20.7002Z"/><path d="M2.50586 13.4434C2.42969 13.4131 2.35938 13.3721 2.29688 13.3213C2.11523 13.1748 2 12.9512 2 12.7002V12.2998C2 11.8584 2.35742 11.5 2.80078 11.5H15.1992C15.6426 11.5 16 11.8584 16 12.2998V12.7002C16 13.1416 15.6426 13.5 15.1992 13.5H2.80078C2.69727 13.5 2.59766 13.4795 2.50586 13.4434Z"/><path d="M2.07422 5.03516C2.02734 4.93359 2 4.82031 2 4.7002V4.2998C2 4.04492 2.11914 3.81738 2.30469 3.6709C2.44141 3.56348 2.61328 3.5 2.80078 3.5H24.1992C24.6426 3.5 25 3.8584 25 4.2998V4.7002C25 5.1416 24.6426 5.5 24.1992 5.5H2.80078C2.47852 5.5 2.20117 5.30957 2.07422 5.03516Z"/></svg>';
                            }
                            LocalStorageData.PageFilterParameter.AutoSorting = 0;
                            chrome.storage.local.set(LocalStorageData, function () {
                                chrome.runtime.sendMessage({
                                    request: "UploadConfiguration"
                                });
                            });
                            DisableSorting();
                        }
                    })
                    ButtonFrame.appendChild(SortButton);
                    ButtonFrame.appendChild(SelectShownFrame);
                    ButtonFrame.appendChild(FilterLoadingGIFFrame);
                    ScholarscopeInnerWrap.appendChild(ButtonFrame);
                    SearchOptions.appendChild(ScholarscopeInnerWrap);
                } catch (e) {
                    console.log(e);
                }
            }
            // Main
            let SearchResultsChunks = document.getElementsByClassName("search-results-chunks")[0];

            function SendRequest(SN, AuthorArray, JournalArray, YearArray, ArticleType, PMIDRawArray, PMIDArray) {
                let LabsDocsumCitationCollection = SearchResultsChunks.getElementsByClassName("docsum-citation");
                let ResultActionsBarType = 1;
                let ResultActionsBar = SearchResultsChunks.getElementsByClassName("result-actions-bar bottom-bar");
                if (ResultActionsBar.length == 0) {
                    ResultActionsBarType = 0;
                    ResultActionsBar = SearchResultsChunks.getElementsByClassName("result-actions-bar");
                }
                let Scholarscope_AbstractButton_Array = Array();
                let FullViewSnippet = document.getElementsByClassName("full-view-snippet");
                let DocsumContent = document.getElementsByClassName("docsum-content");
                for (i = SN; i < LabsDocsumCitationCollection.length; i++) {
                    // target blank
                    let LDCC = LabsDocsumCitationCollection[i];
                    let Get_a_tag = document.getElementsByClassName("docsum-title")[i];
                    Get_a_tag.setAttribute("target", "_blank");
                    Get_a_tag.style.display = "inline";
                    // Author
                    let AuthorObject = LDCC.getElementsByClassName("docsum-authors")[0];
                    AuthorArray[i] = AuthorObject.innerHTML;
                    // PMID
                    let PMIDObject = LDCC.getElementsByClassName("docsum-pmid")[0];
                    PMIDArray[i] = PMIDObject.innerText;
                    ResultActionsBar[i].setAttribute("pmid", PMIDArray[i]);
                    if (FullViewSnippet[i] != undefined) {
                        FullViewSnippet[i].setAttribute("fullviewpmid", DOMPurify.sanitize(PMIDArray[i]));
                    } else {
                        let DocsumSnippet = document.createElement("div");
                        with (DocsumSnippet) {
                            className = "docsum-snippet";
                        }
                        Scholarscope_FullViewSnippet = document.createElement("div");
                        with (Scholarscope_FullViewSnippet) {
                            className = "full-view-snippet";
                        }
                        Scholarscope_FullViewSnippet.setAttribute("fullviewpmid", DOMPurify.sanitize(PMIDArray[i]));
                        DocsumSnippet.appendChild(Scholarscope_FullViewSnippet);
                        DocsumContent[i].appendChild(DocsumSnippet);
                    }
                    // JournalCitation
                    let JournalCitationObject = LDCC.getElementsByClassName("docsum-journal-citation")[0];
                    let JournalCitationString = JournalCitationObject.innerText;

                    if (JournalCitationString == "") {
                        JournalArray[i] = "No Journal Title";
                        DOIArray[i] = null;
                        ArticleType[i] = null;
                        YearArray[i] = "0000";
                    } else {
                        // 检验是否为期刊
                        CitationPattern = /^\d[0-9]{3}/;
                        if (CitationPattern.test(JournalCitationString)) {
                            // Journal Title
                            JournalArray[i] = "Books and Documents";
                            // Year
                            YearArray[i] = JournalCitationString.substring(0, 4);
                            let DateString = JournalCitationString.split(".")[0];
                            OtherDateInfo[i] = DateString.substring(4, DateString.length);
                        } else {
                            // Journal Title
                            let JournalCitationArray = JournalCitationString.split(".");
                            JournalArray[i] = JournalCitationArray[0];
                            // Year
                            let YearString = JournalCitationArray[1].trim();
                            let DateString = YearString.split(":")[0];
                            DateString = DateString.split(";")[0];
                            YearArray[i] = DateString.substring(0, 4);
                            OtherDateInfo[i] = DateString.substring(4, DateString.length);
                        }

                        // DOI
                        let DOIPattern = new RegExp(/doi\:\s10\.[0-9]{4,5}\/[a-z0-9\.\(\)\-]+/, "i");
                        if (DOIPattern.test(JournalCitationString)) {
                            DOIArray[i] = JournalCitationString.match(DOIPattern)[0].toString();
                            DOIArray[i] = deleteEndingDot(DOIArray[i]);
                            DOIArray[i] = DOIArray[i].replace(/doi\:\s/, "");
                        } else {
                            DOIArray[i] = null;
                        }

                        // Article Type
                        let ArticleTypeObject = LDCC.getElementsByClassName("publication-type")[0];
                        if (ArticleTypeObject != undefined) {
                            ArticleType[i] = ArticleTypeObject.innerText;
                            ArticleType[i] = deleteEndingDot(ArticleType[i]);
                        } else {
                            ArticleType[i] = null;
                        }
                    }

                    // LabsDocsumCitation Rebuild
                    let ChildNodeArray = LDCC.children;
                    let ChildNodeLength = ChildNodeArray.length;
                    for (let ChildNodeIndex = 0; ChildNodeIndex < ChildNodeLength; ChildNodeIndex++) {
                        ChildNodeArray[ChildNodeIndex].style.display = "none";
                    }

                    // Add Journal
                    let JournalFrame = document.createElement("div");
                    with (JournalFrame) {
                        className = "Scholarscope_JournalFrame notranslate";
                    }
                    let JournalDiv = document.createElement("div");
                    with (JournalDiv) {
                        className = "Scholarscope_Journal notranslate";
                        innerHTML = DOMPurify.sanitize(JournalArray[i]);
                    }
                    JournalFrame.appendChild(JournalDiv);
                    LDCC.appendChild(JournalFrame);
                    // Add Author
                    if (AuthorArray[i] != null) {
                        let AuthorFrame = document.createElement("div");
                        with (AuthorFrame) {
                            className = "Scholarscope_AuthorFrame notranslate";
                            innerHTML = DOMPurify.sanitize(AuthorArray[i]);
                        }
                        LDCC.appendChild(AuthorFrame);
                    }
                    // Add DOI
                    if (DOIArray[i] != null) {
                        let DOIDiv = document.createElement("div");
                        with (DOIDiv) {
                            className = "Scholarscope_DOI";
                            innerHTML = "DOI: " + DOMPurify.sanitize(DOIArray[i]);
                        }
                        let DOILink = document.createElement("a");
                        with (DOILink) {
                            className = "Scholarscope_DOILink";
                            href = "https://doi.org/" + DOIArray[i];
                            target = "_blank";
                        }
                        DOILink.appendChild(DOIDiv);
                        LDCC.appendChild(DOILink);
                    }
                    // Add PMID
                    let ArticleInfoDiv = document.createElement("div");
                    with (ArticleInfoDiv) {
                        className = "Scholarscope_ArticleInfo";
                        innerHTML = "PMID: " + DOMPurify.sanitize(PMIDArray[i]);
                    }
                    LDCC.appendChild(ArticleInfoDiv);
                }
                // Other Info
                try {
                    let IDTerm = document.getElementById("id_term");
                    if (IDTerm != undefined) {
                        Keyword = IDTerm.value;
                    } else {
                        Keyword = "";
                    }
                } catch (e) {
                    console.log(e);
                }

                // Send Request
                let postData = {
                    "version": version,
                    "journal": JournalArray.slice(SN),
                    "pmid": PMIDArray.slice(SN),
                    "publish": YearArray.slice(SN),
                    "keyword": Keyword,
                    "needquartile": LocalStorageData.Quartile,
                    "cas": LocalStorageData.CAS,
                    "needcitation": LocalStorageData.Citation,
                    "PageType": "Summary",
                    "ConfigSyncTime": LocalStorageData.ConfigSyncTime
                };
                let port = chrome.runtime.connect({
                    name: "ImportanceIndex"
                });
                port.postMessage(postData);
                //let FactorObject = new Object();
                //let FactorObjectNumber = 0;
                port.onMessage.addListener(function (msg) {
                    if (msg.Status == 200) {
                        let Results = msg.Results;
                        let ServerConfiguration = Results.Configuration;
                        let Factors = Results.data;
                        let Quartiles = Results.quartile;
                        let BlackList = Results.blacklist;
                        let Emergency = Results.emergency;
                        NewCheckVersion(Results);
                        let t = SN;
                        let Scholarscope_Journal = document.getElementsByClassName("Scholarscope_Journal");
                        let JournalFrame = document.getElementsByClassName("Scholarscope_JournalFrame");
                        for (t = SN; t < LabsDocsumCitationCollection.length; t++) {
                            // Scholarscope_Factor Frame
                            let Scholarscope_Factor = document.createElement("div");
                            with (Scholarscope_Factor) {
                                className = "Scholarscope_Factor notranslate";
                                if (Factors[t - SN] == "") {
                                    innerHTML = "Not Found";
                                } else {
                                    innerHTML = DOMPurify.sanitize(Factors[t - SN]);
                                }
                            }
                            JournalFrame[t].appendChild(Scholarscope_Factor);
                            if (Factors[t - SN] == "") {
                                Scholarscope_Journal[t].style.backgroundColor = "#616161";
                                Scholarscope_Factor.style.backgroundColor = "#616161";
                            } else if (Factors[t - SN] >= 20) {
                                Scholarscope_Journal[t].style.backgroundColor = "#D50000";
                                Scholarscope_Factor.style.backgroundColor = "#D50000";
                            } else if (Factors[t - SN] >= 10) {
                                Scholarscope_Journal[t].style.backgroundColor = "#F4511E";
                                Scholarscope_Factor.style.backgroundColor = "#F4511E";
                            } else if (Factors[t - SN] >= 3) {
                                Scholarscope_Journal[t].style.backgroundColor = "#F6BF26";
                                Scholarscope_Factor.style.backgroundColor = "#F6BF26";
                            } else if (Factors[t - SN] >= 0) {
                                Scholarscope_Journal[t].style.backgroundColor = "#33B679";
                                Scholarscope_Factor.style.backgroundColor = "#33B679";
                            }
                            // Scholarscope_Quartile Frame

                            let Scholarscope_Quartile = document.createElement("div");
                            with (Scholarscope_Quartile) {
                                className = "Scholarscope_Quartile notranslate";
                                innerHTML = DOMPurify.sanitize(Quartiles[t - SN]);
                                if (ServerConfiguration.Quartile == 0) {
                                    style.display = "none";
                                }
                            }
                            if (Quartiles[t - SN] == "Q1" || Quartiles[t - SN] == "1区") {
                                Scholarscope_Quartile.style.backgroundColor = "#D50000";
                            } else if (Quartiles[t - SN] == "Q2" || Quartiles[t - SN] == "2区") {
                                Scholarscope_Quartile.style.backgroundColor = "#F4511E";
                            } else if (Quartiles[t - SN] == "Q3" || Quartiles[t - SN] == "3区") {
                                Scholarscope_Quartile.style.backgroundColor = "#F6BF26";
                            } else if (Quartiles[t - SN] == "Q4" || Quartiles[t - SN] == "4区") {
                                Scholarscope_Quartile.style.backgroundColor = "#33B679";
                            } else if (Quartiles[t - SN] == "") {
                                Scholarscope_Quartile.style.backgroundColor = "#616161";
                                Scholarscope_Quartile.innerHTML = "N/A";
                            }
                            JournalFrame[t].appendChild(Scholarscope_Quartile);

                            // Add Year and Article Type
                            let Scholarscope_Year = document.createElement("div");
                            with (Scholarscope_Year) {
                                className = "Scholarscope_Year";
                                if (ServerConfiguration.FullPublishDate == 1) {
                                    innerHTML = DOMPurify.sanitize(YearArray[t].toString() + OtherDateInfo[t].toString());
                                } else {
                                    innerHTML = DOMPurify.sanitize(YearArray[t].toString());
                                }
                            }
                            JournalFrame[t].appendChild(Scholarscope_Year);
                            if (ArticleType[t] != undefined) {
                                let Scholarscope_ArticleType = document.createElement("div");
                                with (Scholarscope_ArticleType) {
                                    className = "Scholarscope_ArticleType notranslate";
                                    innerHTML = DOMPurify.sanitize(ArticleType[t]);
                                }
                                if (ServerConfiguration.FullPublishDate == 1) {
                                    Scholarscope_ArticleType.style.borderLeft = "1px solid";
                                }
                                JournalFrame[t].appendChild(Scholarscope_ArticleType);
                            }
                            // Scholarscope_BlackList Frame
                            if (ServerConfiguration.Warning == 1) {
                                if (BlackList[t - SN].length != 0) {
                                    let Scholarscope_BlackList = document.createElement("div");
                                    with (Scholarscope_BlackList) {
                                        className = "Scholarscope_BlackList";
                                        innerHTML = "⚠️";
                                        title = "预警期刊: " + DOMPurify.sanitize(BlackList[t - SN].join(" | "));
                                    }
                                    JournalFrame[t].appendChild(Scholarscope_BlackList);
                                }
                            }

                            // Add Abstract Button
                            Scholarscope_AbstractButton_Array[t] = document.createElement("div");
                            with (Scholarscope_AbstractButton_Array[t]) {
                                className = "Scholarscope_AbstractButton notranslate";
                                title = "点击获取摘要";
                                innerHTML += "<svg class='AbstractSVG' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path class='AbstractSVGPath' fill-rule='evenodd' d='M-0.006,16.248 C-0.006,17.219 0.590,18.005 1.327,18.005 L14.660,18.005 C15.397,18.005 15.994,17.219 15.994,16.248 L15.994,1.749 C15.994,0.778 15.397,-0.008 14.660,-0.008 L4.327,-0.008 C3.590,-0.008 2.994,0.778 2.994,1.749 L2.994,14.930 C2.994,15.413 2.694,15.809 2.327,15.809 C1.960,15.809 1.660,15.413 1.660,14.930 L1.660,3.287 C1.660,2.681 1.287,2.189 0.827,2.189 C0.367,2.189 -0.006,2.681 -0.006,3.287 L-0.006,16.248 ZM9.327,3.155 L9.327,6.494 C9.327,7.030 9.000,7.461 8.594,7.461 L5.394,7.461 C4.987,7.461 4.660,7.030 4.660,6.494 L4.660,3.155 C4.660,2.619 4.987,2.189 5.394,2.189 L8.594,2.189 C9.000,2.189 9.327,2.619 9.327,3.155 ZM13.660,10.976 L5.327,10.976 C4.960,10.976 4.660,10.580 4.660,10.097 C4.660,9.614 4.960,9.218 5.327,9.218 L13.660,9.218 C14.027,9.218 14.327,9.614 14.327,10.097 C14.327,10.580 14.027,10.976 13.660,10.976 ZM13.660,14.491 L5.327,14.491 C4.960,14.491 4.660,14.095 4.660,13.612 C4.660,13.129 4.960,12.733 5.327,12.733 L13.660,12.733 C14.027,12.733 14.327,13.129 14.327,13.612 C14.327,14.095 14.027,14.491 13.660,14.491 ZM13.660,3.946 L11.327,3.946 C10.960,3.946 10.660,3.550 10.660,3.067 C10.660,2.584 10.960,2.189 11.327,2.189 L13.660,2.189 C14.027,2.189 14.327,2.584 14.327,3.067 C14.327,3.550 14.027,3.946 13.660,3.946 ZM13.660,7.461 L11.327,7.461 C10.960,7.461 10.660,7.065 10.660,6.582 C10.660,6.099 10.960,5.703 11.327,5.703 L13.660,5.703 C14.027,5.703 14.327,6.099 14.327,6.582 C14.327,7.065 14.027,7.461 13.660,7.461 Z'/></svg>Abstract";
                                Scholarscope_AbstractButton_Array[t].setAttribute("pmid", DOMPurify.sanitize(PMIDArray[t - SN]));
                            };
                            (function (t) {
                                Scholarscope_AbstractButton_Array[t].addEventListener("click", function () {
                                    if (ServerConfiguration.PubMedAPI == "") {
                                        window.open("http://blog.scholarscope.online/pubmed-api/");
                                    } else {
                                        let LoadingGIF = document.createElement("img");
                                        with (LoadingGIF) {
                                            className = "Abstract_LoadingGIF";
                                            src = chrome.runtime.getURL('images/loading.gif');
                                            style.width = "3rem";
                                            style.height = "3rem";
                                        }
                                        let Scholarscope_FullViewSnippet = new Object;
                                        if (FullViewSnippet[t] != undefined) {
                                            let Selector = "div[fullviewpmid='" + PMIDArray[t] + "']";
                                            Scholarscope_FullViewSnippet = document.querySelector(Selector);
                                        } else if (FullViewSnippet[t] == undefined) {
                                            let DocsumSnippet = document.createElement("div");
                                            with (DocsumSnippet) {
                                                className = "docsum-snippet";
                                            }
                                            Scholarscope_FullViewSnippet = document.createElement("div");
                                            with (Scholarscope_FullViewSnippet) {
                                                className = "full-view-snippet";
                                            }
                                            DocsumSnippet.appendChild(Scholarscope_FullViewSnippet);
                                            DocsumContent[t].appendChild(DocsumSnippet);
                                        }
                                        with (Scholarscope_FullViewSnippet) {
                                            style.opacity = 0.5;
                                        }
                                        Scholarscope_FullViewSnippet.appendChild(LoadingGIF);
                                        // Send Abstract Request
                                        let port = chrome.runtime.connect({
                                            name: "GetAbstract"
                                        });
                                        port.postMessage({
                                            request: PMIDArray[t]
                                        });
                                        port.onMessage.addListener(function (msg) {
                                            let parse = new DOMParser();
                                            let AbstractXML = parse.parseFromString(msg, "text/xml");
                                            AbstractTag = AbstractXML.getElementsByTagName("AbstractText");
                                            let AbstractText = "";
                                            for (let i = 0; i < AbstractTag.length; i++) {
                                                if (AbstractTag[i].getAttribute("Label") != null) {
                                                    AbstractText += "<p><b>" + AbstractTag[i].getAttribute("Label") + ": </b> " + AbstractTag[i].innerHTML + "</p>";
                                                } else {
                                                    AbstractText += AbstractTag[i].innerHTML;
                                                }
                                            }
                                            if (AbstractText == "") {
                                                AbstractText = "<b>No abstract.</b>";
                                            }
                                            Scholarscope_FullViewSnippet.innerHTML = DOMPurify.sanitize(AbstractText);
                                            with (Scholarscope_FullViewSnippet) {
                                                style.opacity = 1;
                                                style["border-left"] = "solid 0.2rem #0094DF";
                                                style["padding-left"] = "1rem";
                                            }
                                        })
                                    }
                                })
                            })(t);
                            // 如果需要Abstract
                            let LDCC = LabsDocsumCitationCollection[t];
                            let NoAbstractObject = LDCC.getElementsByClassName("no-abstract")[0];
                            let NeedAbstractButton = false;
                            if (NoAbstractObject == undefined) {
                                NeedAbstractButton = true;
                            }
                            if (NeedAbstractButton == true) {
                                ResultActionsBar[t].appendChild(Scholarscope_AbstractButton_Array[t]);
                            }
                            // Add Citation Count
                            if (ServerConfiguration.Citation == 1) {
                                if (ResultActionsBarType == 1) {
                                    let CitationCountButton = document.createElement("a");
                                    with (CitationCountButton) {
                                        className = "Scholarscope_CitationCountButton notranslate";
                                        title = "被引用数";
                                        let TimesCited = DOMPurify.sanitize(Results.citation[t - SN]);
                                        if (TimesCited == "") {
                                            TimesCited = 0;
                                        }
                                        innerHTML = "<svg class='TagSVG' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill-rule='evenodd' d='M12.333,4.789 C12.333,5.274 12.726,5.667 13.211,5.667 C13.695,5.667 14.088,5.274 14.088,4.789 C14.088,4.305 13.695,3.912 13.211,3.912 C12.726,3.912 12.333,4.305 12.333,4.789 ZM6.200,17.189 C6.740,17.733 7.618,17.733 8.161,17.189 L16.737,8.670 C17.080,8.326 17.252,7.874 17.246,7.421 L17.246,2.495 C17.246,1.533 16.466,0.754 15.505,0.754 L10.579,0.754 C10.126,0.747 9.674,0.919 9.330,1.263 L0.811,9.839 C0.267,10.382 0.267,11.260 0.811,11.800 L6.200,17.189 ZM10.930,4.789 C10.930,3.530 11.951,2.509 13.211,2.509 C14.470,2.509 15.491,3.530 15.491,4.789 C15.491,6.049 14.470,7.070 13.211,7.070 C11.951,7.070 10.930,6.049 10.930,4.789 Z'/> </svg>" + "Times Cited: <span class='Scholarscope_CitationCount'>" + TimesCited + "</span>";
                                        let pubmed_current_url = location.href;
                                        if (URLPatternX.test(pubmed_current_url) || URLPatternY.test(pubmed_current_url)) {
                                            href = "https://pubmed.scholarscope.online/?linkname=pubmed_pubmed_citedin&from_uid=" + PMIDArray[t];
                                        } else {
                                            href = "https://pubmed.ncbi.nlm.nih.gov/?linkname=pubmed_pubmed_citedin&from_uid=" + PMIDArray[t];
                                        }
                                        target = "_blank";
                                        CitationCountButton.setAttribute("citationcountpmid", PMIDArray[t]);
                                    }
                                    ResultActionsBar[t].append(CitationCountButton);
                                } else if (ResultActionsBarType == 0) {
                                    if (Results.citation[t - SN] != "") {
                                        let Selector = "div[citationcountpmid='" + PMIDArray[t] + "']";
                                        let CiteSearchResult = document.querySelector(Selector);
                                        CiteSearchResult.innerText = CiteSearchResult.innerText + ": " + Results.citation[t - SN];
                                    }
                                }
                            }
                            // Add Heat
                            if (ResultActionsBarType == 1) {
                                let HeatFrame = document.createElement("div");
                                with (HeatFrame) {
                                    className = "Scholarscope_HeatFrame notranslate";
                                    title = "阅读量";
                                }
                                let HeatIconFrame = document.createElement("div");
                                with (HeatIconFrame) {
                                    className = "Scholarscope_HeatIconFrame";
                                    innerHTML = "<svg version='1.0' class='HeatIcon' xmlns='http://www.w3.org/2000/svg' width='1920.000000pt' height='1597.000000pt' viewBox='0 0 1920.000000 1597.000000' preserveAspectRatio='xMidYMid meet'> <g transform='translate(0.000000,1597.000000) scale(0.100000,-0.100000)' fill='#5B616B' stroke='none'> <path d='M9815 14844 c-1035 -410 -1712 -1174 -1969 -2223 -94 -381 -115 -660 -88 -1166 52 -962 -156 -1885 -579 -2563 -105 -169 -289 -402 -318 -402 -4 0 -15 17 -25 38 -65 138 -231 401 -346 547 -257 325 -558 557 -862 663 -89 32 -218 62 -263 62 l-25 0 39 -77 c58 -116 90 -214 112 -341 33 -194 24 -390 -27 -622 -35 -156 -59 -226 -232 -675 -207 -539 -283 -762 -361 -1050 -87 -326 -153 -761 -182 -1195 -13 -206 -7 -740 11 -880 23 -190 92 -576 129 -726 227 -916 711 -1672 1448 -2263 459 -368 1050 -680 1643 -867 116 -36 115 -36 -32 54 -578 353 -973 880 -1138 1518 -38 146 -77 369 -91 525 -14 154 -6 503 16 689 47 391 105 605 315 1149 130 339 154 432 154 611 0 150 -13 219 -64 329 -17 35 -30 65 -30 67 0 6 62 -7 135 -28 262 -76 516 -309 712 -655 32 -56 61 -103 65 -103 15 0 149 178 209 279 150 251 252 559 306 927 14 98 17 196 18 564 0 386 3 458 19 545 107 586 397 1029 867 1322 120 75 421 215 434 201 2 -2 -4 -31 -15 -65 -25 -80 -65 -274 -81 -393 -17 -123 -17 -458 0 -580 31 -222 94 -420 192 -610 114 -220 178 -295 560 -665 164 -158 239 -248 373 -450 349 -522 563 -1097 617 -1657 11 -118 14 -128 32 -128 35 0 105 40 162 92 166 151 280 451 335 882 11 88 22 161 23 163 6 6 147 -334 202 -487 317 -879 411 -1721 269 -2409 -141 -685 -521 -1223 -1125 -1596 -40 -25 -71 -45 -69 -45 13 1 169 52 281 94 464 169 952 428 1309 695 352 263 685 607 912 940 394 579 617 1219 704 2026 21 195 29 727 15 956 -67 1049 -363 2191 -851 3277 -18 39 -37 72 -41 72 -5 0 -9 -17 -9 -37 0 -63 -28 -288 -60 -479 -99 -597 -292 -1042 -545 -1257 -79 -68 -187 -126 -245 -134 l-37 -5 -7 103 c-64 940 -426 1953 -1021 2854 -270 409 -505 677 -895 1022 -74 66 -171 158 -214 204 -577 613 -859 1433 -808 2351 18 323 70 643 149 912 19 67 37 129 40 139 3 9 1 17 -3 17 -5 0 -72 -25 -149 -56z'/> </g> </svg>";
                                }
                                let HeatTextFrame = document.createElement("div");
                                with (HeatTextFrame) {
                                    className = "Scholarscope_HeatTextFrame notranslate";
                                    innerHTML = "Heat: <span class='Scholarscope_HeatCount'>" + DOMPurify.sanitize(Results.heat[t - SN]) + "</span>";
                                }
                                HeatFrame.append(HeatIconFrame, HeatTextFrame);
                                ResultActionsBar[t].append(HeatFrame);
                            }
                        }
                        // Apply Sorting
                        try {
                            if (ServerConfiguration.AutoSorting == 1) {
                                let FilterLoadingGIFFrame = document.getElementById("Scholarscope_FilterLoadingGIF");
                                ApplySorting(false, ServerConfiguration.SortingMethod);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                        // Apply Filter
                        try {
                            let FilterButton = document.getElementById("Scholarscope_FilterButton");
                            if (FilterStatus == 1 || ServerConfiguration.AutoFilter == 1 && FilterButton != undefined) {
                                FilterStatus = ApplyFilter(ServerConfiguration, FilterStatus, FilterButton);
                                UpdateFilterTip();
                            } else if (FilterStatus == 0 && ServerConfiguration.AutoFilter == 0) {
                                let FilterTipSpan = document.getElementsByClassName("Scholarscope_FilterTip");
                                if (FilterTipSpan.length > 0) {
                                    let FilterTipCount = FilterTipSpan.length;
                                    for (let i = FilterTipCount - 1; i >= 0; i--) {
                                        FilterTipSpan[i].remove();
                                    }
                                }
                                try {
                                    FilterStatus = CloseFilter(FilterStatus, FilterButton);
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        } catch (e) {
                            console.log(e);
                        }

                        // Show Tag Status
                        try {
                            let postData = {
                                "PMID": PMIDArray.slice(SN)
                            };
                            let port = chrome.runtime.connect({
                                name: "GetTagsStatus"
                            });
                            port.postMessage({
                                request: postData
                            });
                            console.log("Query Tag Stauts");
                            port.onMessage.addListener(function (msg) {
                                let ResultActionsBar = document.getElementsByClassName("result-actions-bar bottom-bar");
                                for (let j = SN; j < ResultActionsBar.length; j++) {
                                    let Scholarscope_TagStatus = document.createElement("div");
                                    with (Scholarscope_TagStatus) {
                                        className = "Scholarscope_TagStatus";
                                        title = "标签";
                                    }
                                    let Scholarscope_TagStatusFrame = document.createElement("div");
                                    with (Scholarscope_TagStatusFrame) {
                                        className = "Scholarscope_TagStatusFrame";
                                    }
                                    let Scholarscope_TagStatusImg = document.createElement("img");
                                    with (Scholarscope_TagStatusImg) {
                                        className = "Scholarscope_TagStatusImg";
                                        src = chrome.runtime.getURL('images/clip.png');
                                    }
                                    let Scholarscope_TagStatusText = document.createElement("div");
                                    with (Scholarscope_TagStatusText) {
                                        className = "Scholarscope_TagStatusText notranslate";
                                        innerText = "Tags: ";
                                    }
                                    Scholarscope_TagStatusFrame.addEventListener("click", function () {
                                        window.open("https://www.scholarscope.online/Main.php");
                                    })
                                    let TagStatus = 0;
                                    if (msg["Results"]["Data"][ResultActionsBar[j].getAttribute("pmid")] != undefined) {
                                        if (msg["Results"]["Data"][ResultActionsBar[j].getAttribute("pmid")]["Read"] == 1) {
                                            let Scholarscope_TagStatusRead = document.createElement("div");
                                            with (Scholarscope_TagStatusRead) {
                                                className = "Scholarscope_TagStatusRead";
                                                title = "已读";
                                            }
                                            let Scholarscope_TagStatusReadImg = document.createElement("img");
                                            with (Scholarscope_TagStatusReadImg) {
                                                src = chrome.runtime.getURL('images/readimg.png');
                                            }
                                            Scholarscope_TagStatusRead.appendChild(Scholarscope_TagStatusReadImg);
                                            Scholarscope_TagStatusFrame.appendChild(Scholarscope_TagStatusRead);
                                            TagStatus = 1;
                                        }
                                        if (msg["Results"]["Data"][ResultActionsBar[j].getAttribute("pmid")]["Want"] == 1) {
                                            let Scholarscope_TagStatusWant = document.createElement("div");
                                            with (Scholarscope_TagStatusWant) {
                                                className = "Scholarscope_TagStatusWant";
                                                title = "想读";
                                            }
                                            let Scholarscope_TagStatusWantImg = document.createElement("img");
                                            with (Scholarscope_TagStatusWantImg) {
                                                src = chrome.runtime.getURL('images/wantimg.png');
                                            }
                                            Scholarscope_TagStatusWant.appendChild(Scholarscope_TagStatusWantImg);
                                            Scholarscope_TagStatusFrame.appendChild(Scholarscope_TagStatusWant);
                                            TagStatus = 1;
                                        }
                                        if (msg["Results"]["Data"][ResultActionsBar[j].getAttribute("pmid")]["Like"] == 1) {
                                            let Scholarscope_TagStatusLike = document.createElement("div");
                                            with (Scholarscope_TagStatusLike) {
                                                className = "Scholarscope_TagStatusLike";
                                                title = "喜欢";
                                            }
                                            let Scholarscope_TagStatusLikeImg = document.createElement("img");
                                            with (Scholarscope_TagStatusLikeImg) {
                                                src = chrome.runtime.getURL('images/likeimg.png');
                                            }
                                            Scholarscope_TagStatusLike.appendChild(Scholarscope_TagStatusLikeImg);
                                            Scholarscope_TagStatusFrame.appendChild(Scholarscope_TagStatusLike);
                                            TagStatus = 1;
                                        }
                                        if (msg["Results"]["Data"][ResultActionsBar[j].getAttribute("pmid")]["Dislike"] == 1) {
                                            let Scholarscope_TagStatusDislike = document.createElement("div");
                                            with (Scholarscope_TagStatusDislike) {
                                                className = "Scholarscope_TagStatusDislike";
                                                title = "不喜欢";
                                            }
                                            let Scholarscope_TagStatusDislikeImg = document.createElement("img");
                                            with (Scholarscope_TagStatusDislikeImg) {
                                                src = chrome.runtime.getURL('images/dislikeimg.png');
                                            }
                                            Scholarscope_TagStatusDislike.appendChild(Scholarscope_TagStatusDislikeImg);
                                            Scholarscope_TagStatusFrame.appendChild(Scholarscope_TagStatusDislike);
                                            TagStatus = 1;
                                        }
                                    }
                                    if (TagStatus == 1) {
                                        Scholarscope_TagStatus.append(Scholarscope_TagStatusImg, Scholarscope_TagStatusText, Scholarscope_TagStatusFrame);
                                        ResultActionsBar[j].appendChild(Scholarscope_TagStatus);
                                    }
                                }
                            })
                        } catch (e) {
                            console.log(e);
                        }
                    } else if (msg.Status == 401) {
                        if (confirm("请登录 Scholarscope !", "")) {
                            window.open("https://account.scholarscope.online/Login.php");
                        }
                    } else if (msg.Status == 404) {
                        EmergencyInfo("未连接到 Scholarscope 服务器，请检查网络情况");
                    } else if (msg.Status == 502 || msg.Status == 504) {
                        EmergencyInfo("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                    }
                })
                //console.log("SN: " + i);
                return i;
            }
            SN = SendRequest(SN, AuthorArray, JournalArray, YearArray, ArticleType, PMIDRawArray, PMIDArray);
            let NextPageButton = document.getElementsByClassName("load-button next-page")[0];
            if (NextPageButton != undefined) {
                NextPageButton.addEventListener("click", function () {
                    let SearchResultsChunks = document.getElementsByClassName("search-results-chunks")[0];
                    let config = {
                        childList: true,
                        subtree: true
                    };
                    var observer = new MutationObserver(function (mutationsList, observer) {
                        this.disconnect();
                        SN = SendRequest(SN, AuthorArray, JournalArray, YearArray, ArticleType, PMIDRawArray, PMIDArray);
                    });
                    observer.observe(SearchResultsChunks, config);
                    //SN = SendRequest(SN, AuthorArray, JournalArray, YearArray, ArticleType, PMIDRawArray, PMIDArray);
                })
            }
        } else if (DisplayOptions.value == "abstract") {
            console.log("Page Type: Abstract");
            try {
                function SendRequest(SN) {
                    let JournalArray = [];
                    let PMIDArray = [];
                    let YearArray = [];
                    let i = SN;

                    let FullView = document.getElementsByClassName("full-view");
                    let ShortView = document.getElementsByClassName("short-view");
                    let CurrentView;
                    if (FullView[0].style.display = "block") {
                        CurrentView = FullView;
                    } else if (ShortView[0].style.display = "block") {
                        CurrentView = ShortView;
                    }

                    for (i = SN; i < CurrentView.length; i++) {
                        let JournalActionsTrigger = CurrentView[i].getElementsByClassName("journal-actions-trigger")[0];
                        if (JournalActionsTrigger == undefined) {
                            JournalArray[i] = "Books and Documents";
                        } else {
                            JournalArray[i] = JournalActionsTrigger.innerHTML.trim();
                        }
                        if (CurrentView[i].getElementsByClassName("current-id")[0] != undefined) {
                            PMIDArray[i] = CurrentView[i].getElementsByClassName("current-id")[0].innerHTML.trim();
                        } else {
                            PMIDArray[i] = "00000000";
                        }
                    }

                    try {
                        let IDTerm = document.getElementById("id_term");
                        if (IDTerm != undefined) {
                            Keyword = IDTerm.value;
                        } else {
                            Keyword = "";
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    // Send Request
                    let postData = {
                        "version": version,
                        "journal": JournalArray.slice(SN),
                        "pmid": PMIDArray.slice(SN),
                        "publish": YearArray.slice(SN),
                        "keyword": Keyword,
                        "needquartile": LocalStorageData.Quartile,
                        "cas": LocalStorageData.CAS,
                        "needcitation": LocalStorageData.Citation,
                        "PageType": "Abstract",
                        "ConfigSyncTime": LocalStorageData.ConfigSyncTime
                    };
                    let port = chrome.runtime.connect({
                        name: "ImportanceIndex"
                    });
                    port.postMessage(postData);
                    port.onMessage.addListener(function (msg) {
                        if (msg.Status == 200) {
                            let Results = msg.Results;
                            let ServerConfiguration = Results.Configuration;
                            let Factors = Results.data;
                            let Quartiles = Results.quartile;

                            for (let t = SN; t < CurrentView.length; t++) {
                                let JournalDetailFrame = document.createElement("div");
                                with (JournalDetailFrame) {
                                    id = "Scholarscope_JournalDetailFrame";
                                    className = "notranslate";
                                }
                                if (CurrentView[t].getElementsByClassName("publication-type").length != 0) {
                                    let Scholarscope_PulicationType = document.createElement("div");
                                    with (Scholarscope_PulicationType) {
                                        className = "Scholarscope_ArticleType";
                                        innerText = CurrentView[t].getElementsByClassName("publication-type")[0].innerText;
                                    }
                                    CurrentView[t].getElementsByClassName("publication-type")[0].remove();
                                    JournalDetailFrame.appendChild(Scholarscope_PulicationType);
                                }
                                let Scholarscope_Factor = document.createElement("div");
                                with (Scholarscope_Factor) {
                                    className = "Scholarscope_Factor notranslate";
                                    if (Factors[t - SN] == "") {
                                        innerHTML = "Not Found";
                                    } else {
                                        innerHTML = DOMPurify.sanitize(Factors[t - SN]);
                                    }
                                }
                                JournalDetailFrame.appendChild(Scholarscope_Factor);
                                if (Factors[t - SN] == "") {
                                    Scholarscope_Factor.style.backgroundColor = "#616161";
                                } else if (Factors[t - SN] >= 20) {
                                    Scholarscope_Factor.style.backgroundColor = "#D50000";
                                } else if (Factors[t - SN] >= 10) {
                                    Scholarscope_Factor.style.backgroundColor = "#F4511E";
                                } else if (Factors[t - SN] >= 3) {
                                    Scholarscope_Factor.style.backgroundColor = "#F6BF26";
                                } else if (Factors[t - SN] >= 0) {
                                    Scholarscope_Factor.style.backgroundColor = "#33B679";
                                }
                                if (ServerConfiguration.Quartile == 1) {
                                    let Scholarscope_Quartile = document.createElement("div");
                                    with (Scholarscope_Quartile) {
                                        className = "Scholarscope_Quartile notranslate";
                                        innerHTML = DOMPurify.sanitize(Quartiles[t - SN]);
                                    }
                                    if (Quartiles[t - SN] == "Q1" || Quartiles[t - SN] == "1区") {
                                        Scholarscope_Quartile.style.backgroundColor = "#D50000";
                                    } else if (Quartiles[t - SN] == "Q2" || Quartiles[t - SN] == "2区") {
                                        Scholarscope_Quartile.style.backgroundColor = "#F4511E";
                                    } else if (Quartiles[t - SN] == "Q3" || Quartiles[t - SN] == "3区") {
                                        Scholarscope_Quartile.style.backgroundColor = "#F6BF26";
                                    } else if (Quartiles[t - SN] == "Q4" || Quartiles[t - SN] == "4区") {
                                        Scholarscope_Quartile.style.backgroundColor = "#33B679";
                                    } else if (Quartiles[t - SN] == "") {
                                        Scholarscope_Quartile.style.backgroundColor = "#616161";
                                        Scholarscope_Quartile.innerHTML = "N/A";
                                    }
                                    JournalDetailFrame.appendChild(Scholarscope_Quartile);
                                }
                                let ArticleCitation = CurrentView[t].getElementsByClassName("article-citation")[0];
                                if (ArticleCitation != undefined) {
                                    ArticleCitation.insertBefore(JournalDetailFrame, ArticleCitation.firstChild);
                                } else {
                                    let HeadingTitle = CurrentView[t].getElementsByClassName("heading-title")[0];
                                    with (HeadingTitle) {
                                        style.marginTop = "10px";
                                    }
                                    CurrentView[t].insertBefore(JournalDetailFrame, CurrentView[t].firstChild);
                                }

                                // Chrome需删除 Beginning
                                // Add Full-text Link Button
                                try {
                                    chrome.storage.local.get(null, function (DatabaseResult) {
                                        let DOI = "";
                                        let Identifier = CurrentView[t].getElementsByClassName("identifier doi")[0];
                                        if (Identifier != undefined && Identifier.length != 0) {
                                            let DOIFrame = Identifier.innerText;
                                            DOI = DOIFrame.replace(/DOI\:/, "").trim();
                                        }
                                        if (DOI != "") {
                                            let CustomDatabaseDomain = DatabaseResult.CustomDatabase ?? "";
                                            let CustomDatabaseDomain2 = DatabaseResult.CustomDatabase2 ?? "";
                                            let ArticleOverview = CurrentView[t].parentNode.parentNode;
                                            if (ArticleOverview.getElementsByClassName("full-text-links").length == 0) {
                                                let ArticleOverviewActions = ArticleOverview.getElementsByClassName("article-overview-actions")[0];
                                                let CustomDatabase = document.createElement("div");
                                                with (CustomDatabase) {
                                                    innerHTML = "<div class='full-view'><h3 class='title'>Full-text Link</h3><div class='full-text-links-list'></div>";
                                                }
                                                ArticleOverview.insertBefore(CustomDatabase, ArticleOverviewActions);
                                            }
                                            let CustomDatabaseList = ArticleOverview.getElementsByClassName("full-text-links-list")[0];

                                            // CustomDatabase 1
                                            let Scholarscope_CustomDatabaseLink = document.createElement("a");
                                            with (Scholarscope_CustomDatabaseLink) {
                                                className = "Scholarscope_CustomDatabaseLink";
                                                if (CustomDatabaseDomain == "") {
                                                    href = "http://blog.scholarscope.online/setting-download-domain/"
                                                } else {
                                                    if (CustomDatabaseDomain.substr(-1) == "\=") {
                                                        href = "https://" + CustomDatabaseDomain + DOI;
                                                    } else {
                                                        href = "https://" + CustomDatabaseDomain + "/" + DOI;
                                                    }
                                                }
                                                target = "_blank";
                                            }
                                            let Scholarscope_CustomDatabaseImg = document.createElement("img");
                                            with (Scholarscope_CustomDatabaseImg) {
                                                className = "Scholarscope_CustomDatabaseImg";
                                                title = "Full-text Link 1";
                                                src = chrome.runtime.getURL('images/CustomDatabase.png');
                                            }
                                            Scholarscope_CustomDatabaseLink.appendChild(Scholarscope_CustomDatabaseImg);
                                            CustomDatabaseList.appendChild(Scholarscope_CustomDatabaseLink);

                                            // CustomDatabase 2
                                            let Scholarscope_CustomDatabase2Link = document.createElement("a");
                                            with (Scholarscope_CustomDatabase2Link) {
                                                className = "Scholarscope_CustomDatabase2Link";
                                                if (CustomDatabaseDomain2 !== "") {
                                                    if (CustomDatabaseDomain2.substr(-1) == "\=") {
                                                        href = "https://" + CustomDatabaseDomain2 + DOI;
                                                    } else {
                                                        href = "https://" + CustomDatabaseDomain2 + "/" + DOI;
                                                    }
                                                }
                                                target = "_blank";
                                            }
                                            let Scholarscope_CustomDatabase2Img = document.createElement("img");
                                            with (Scholarscope_CustomDatabase2Img) {
                                                className = "Scholarscope_CustomDatabase2Img";
                                                title = "Full-text Link 2";
                                                src = chrome.runtime.getURL('images/CustomDatabase2.png');
                                            }
                                            Scholarscope_CustomDatabase2Link.appendChild(Scholarscope_CustomDatabase2Img);
                                            if (CustomDatabaseDomain2 !== "") {
                                                CustomDatabaseList.appendChild(Scholarscope_CustomDatabase2Link);
                                            }
                                        }
                                    })
                                } catch (e) {
                                    console.log(e);
                                }
                                // Chrome需删除 Ending
                            }
                        } else {
                            if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 404) {
                                alert("未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    });
                    //console.log("SN: " + i);
                    return i;
                }
                SN = SendRequest(SN, AuthorArray, JournalArray, YearArray, ArticleType, PMIDRawArray, PMIDArray);
                let NextPageButton = document.getElementsByClassName("load-button next-page")[0];
                if (NextPageButton != undefined) {
                    NextPageButton.addEventListener("click", function () {
                        let SearchResultsChunks = document.getElementsByClassName("search-results-chunks")[0];
                        let config = {
                            childList: true,
                            subtree: true
                        };
                        var observer = new MutationObserver(function (mutationsList, observer) {
                            this.disconnect();
                            SN = SendRequest(SN, AuthorArray, JournalArray, YearArray, ArticleType, PMIDRawArray, PMIDArray);
                        });
                        observer.observe(SearchResultsChunks, config);
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }
    } else if (URLPatternD.test(pubmed_current_url) || URLPatternH.test(pubmed_current_url) || URLPatternZ.test(pubmed_current_url)) {
        // Get PMID
        try {
            var PMID = document.getElementsByClassName("current-id")[0].innerHTML.trim();
            PMID = DOMPurify.sanitize(PMID, { ALLOWED_TAGS: [] });
            let PMIDRegex = /[0-9]{1,8}/;
            let PMIDMatches = PMID.match(PMIDRegex);
            if (PMIDMatches) {
                PMID = PMIDMatches[0];
            } else {
                PMID = "0";
            }
        } catch (e) {
            console.log(e);
        }
        // Main Function
        try {
            if (LocalStorageData.Highlight == 1) {
                SCHOLARSCOPE_GLOBAL_SAVESTANDARD = 2;
            } else {
                SCHOLARSCOPE_GLOBAL_SAVESTANDARD = 1;
            }
            var Journal = document.getElementById("full-view-journal-trigger").innerHTML.trim();
            var Keyword = document.getElementsByClassName("heading-title")[0].innerHTML.trim();

            var postData = {
                "version": version,
                "journal": new Array(Journal),
                "pmid": new Array(PMID),
                "keyword": Keyword,
                "needquartile": LocalStorageData.Quartile,
                "cas": LocalStorageData.CAS,
                "needcitation": LocalStorageData.Citation,
                "PageType": "Details",
                "ConfigSyncTime": LocalStorageData.ConfigSyncTime
            };
            let port = chrome.runtime.connect({
                name: "ImportanceIndex"
            });
            port.postMessage(postData);
            port.onMessage.addListener(function (msg) {
                if (msg.Status == 200) {
                    let Results = msg.Results;
                    let ServerConfiguration = Results.Configuration;
                    let Factors = Results.data;
                    let Quartiles = Results.quartile;
                    let BlackList = Results.blacklist;
                    let FullViewHeading = document.getElementById("full-view-heading");
                    let ArticleSource = FullViewHeading.getElementsByClassName("article-source")[0];
                    with (ArticleSource) {
                        style.backgroundColor = "transparent";
                        style.padding = "4px 0px";
                    }
                    let JournalDetailFrame = document.createElement("div");
                    with (JournalDetailFrame) {
                        id = "Scholarscope_JournalDetailFrame";
                        className = "notranslate";
                    }
                    if (FullViewHeading.getElementsByClassName("publication-type").length != 0) {
                        let Scholarscope_PulicationType = document.createElement("div");
                        with (Scholarscope_PulicationType) {
                            className = "Scholarscope_ArticleType";
                            innerText = FullViewHeading.getElementsByClassName("publication-type")[0].innerText;
                        }
                        FullViewHeading.getElementsByClassName("publication-type")[0].remove();
                        JournalDetailFrame.appendChild(Scholarscope_PulicationType);
                    }
                    // Scholarscope_Factor Frame
                    let Scholarscope_Factor = document.createElement("div");
                    with (Scholarscope_Factor) {
                        className = "Scholarscope_Factor notranslate";
                        if (Factors[0] == "") {
                            innerHTML = "Not Found";
                        } else {
                            innerHTML = DOMPurify.sanitize(Factors[0]);
                        }

                    }
                    JournalDetailFrame.appendChild(Scholarscope_Factor);
                    if (Factors[0] == "") {
                        Scholarscope_Factor.style.backgroundColor = "#616161";
                    } else if (Factors[0] >= 20) {
                        Scholarscope_Factor.style.backgroundColor = "#D50000";
                    } else if (Factors[0] >= 10) {
                        Scholarscope_Factor.style.backgroundColor = "#F4511E";
                    } else if (Factors[0] >= 3) {
                        Scholarscope_Factor.style.backgroundColor = "#F6BF26";
                    } else if (Factors[0] >= 0) {
                        Scholarscope_Factor.style.backgroundColor = "#33B679";
                    }
                    // Scholarscope_Quartile Frame
                    if (ServerConfiguration.Quartile == 1) {
                        let Scholarscope_Quartile = document.createElement("div");
                        with (Scholarscope_Quartile) {
                            className = "Scholarscope_Quartile notranslate";
                            innerHTML = DOMPurify.sanitize(Quartiles[0]);
                        }
                        if (Quartiles[0] == "Q1" || Quartiles[0] == "1区") {
                            Scholarscope_Quartile.style.backgroundColor = "#D50000";
                        } else if (Quartiles[0] == "Q2" || Quartiles[0] == "2区") {
                            Scholarscope_Quartile.style.backgroundColor = "#F4511E";
                        } else if (Quartiles[0] == "Q3" || Quartiles[0] == "3区") {
                            Scholarscope_Quartile.style.backgroundColor = "#F6BF26";
                        } else if (Quartiles[0] == "Q4" || Quartiles[0] == "4区") {
                            Scholarscope_Quartile.style.backgroundColor = "#33B679";
                        } else if (Quartiles[0] == "") {
                            Scholarscope_Quartile.style.backgroundColor = "#616161";
                            Scholarscope_Quartile.innerHTML = "N/A";
                        }
                        JournalDetailFrame.appendChild(Scholarscope_Quartile);
                    }
                    // Scholarscope_BlackList Frame
                    if (BlackList[0].length != 0) {
                        let Scholarscope_BlackList = document.createElement("div");
                        with (Scholarscope_BlackList) {
                            className = "Scholarscope_BlackList";
                            innerHTML = "⚠️";
                            title = "预警: " + DOMPurify.sanitize(BlackList[0].join(" | "));
                        }
                        JournalDetailFrame.appendChild(Scholarscope_BlackList);
                    }
                    let ArticleCitation = document.getElementsByClassName("article-citation")[0];
                    ArticleCitation.insertBefore(JournalDetailFrame, ArticleCitation.firstChild);

                    // Check Citation Count
                    let Amount = document.getElementsByClassName("amount")[0];
                    if (Amount != undefined) {
                        CitationCount = Amount.innerText.replace(/,/g, "");
                        if (Results.citation[0] != CitationCount) {
                            console.log("Citation Count: Nonidentical");
                            let UpdateCitationCountPort = chrome.runtime.connect({
                                name: "UpdateCitationCount"
                            });
                            UpdateCitationCountPort.postMessage({
                                request: {
                                    "PMID": PMID,
                                    "CitationCount": CitationCount
                                }
                            });
                        } else {
                            console.log("Citation Count: Identical");
                        }
                    }

                    // Add Full-text Link Button - Detail Page
                    try {
                        chrome.storage.local.get(null, function (DatabaseResult) {
                            let DOI = "";
                            let Identifier = document.getElementsByClassName("identifier doi");
                            if (Identifier != undefined && Identifier.length != 0) {
                                let DOIFrame = Identifier[0].innerText;
                                DOI = DOIFrame.replace(/DOI\:/, "").trim();
                            }
                            if (DOI != "") {
                                let CustomDatabaseDomain = DatabaseResult.CustomDatabase ?? "";
                                let CustomDatabaseDomain2 = DatabaseResult.CustomDatabase2 ?? "";
                                let PageSidebar = document.getElementsByClassName("page-sidebar")[0];
                                if (PageSidebar.getElementsByClassName("full-text-links").length == 0) {
                                    let InnerWrap = PageSidebar.getElementsByClassName("inner-wrap")[0];
                                    let CustomDatabase = document.createElement("div");
                                    let ActionsButtons = document.getElementsByClassName("actions-buttons sidebar")[0];
                                    with (CustomDatabase) {
                                        innerHTML = "<div class='full-view'><h3 class='title'>Full-text Link</h3><div class='full-text-links-list'></div>";
                                    }
                                    InnerWrap.insertBefore(CustomDatabase, ActionsButtons);
                                }
                                let CustomDatabaseList = document.getElementsByClassName("full-text-links-list");

                                // DOI
                                try {
                                    // Get DOI HTTPS Link String
                                    let FullViewIdentifiers = document.getElementById("full-view-identifiers");
                                    let IDLinks = FullViewIdentifiers.getElementsByClassName("id-link");
                                    let SidebarDOILink = "";
                                    let SidebarPMCLink = "";
                                    if (IDLinks != undefined && IDLinks.length != 0) {
                                        for (let IDLinksIndex = 0; IDLinksIndex < IDLinks.length; IDLinksIndex++) {
                                            if (IDLinks[IDLinksIndex].dataset.gaAction == "DOI") {
                                                SidebarDOILink = IDLinks[IDLinksIndex].href;
                                            }
                                            if (IDLinks[IDLinksIndex].dataset.gaAction == "PMCID") {
                                                SidebarPMCLink = IDLinks[IDLinksIndex].href;
                                            }
                                        }
                                    }

                                    // Create DOI Button
                                    let Scholarscope_DOILinkButton = document.createElement("a");
                                    with (Scholarscope_DOILinkButton) {
                                        className = "Scholarscope_DOILinkButton";
                                        if (SidebarDOILink != "") {
                                            href = SidebarDOILink;
                                        }
                                        target = "_blank";
                                    }
                                    let Scholarscope_DOILinkButtonImg = document.createElement("img");
                                    with (Scholarscope_DOILinkButtonImg) {
                                        className = "Scholarscope_DOILinkButtonImg";
                                        title = "DOI Link";
                                        src = chrome.runtime.getURL('images/DOILogo.png');
                                    }
                                    Scholarscope_DOILinkButton.appendChild(Scholarscope_DOILinkButtonImg);
                                    // Append Clone
                                    for (let j = 0; j < CustomDatabaseList.length; j++) {
                                        let Scholarscope_DOILinkButton_Cloned = Scholarscope_DOILinkButton.cloneNode(true);
                                        CustomDatabaseList[j].appendChild(Scholarscope_DOILinkButton_Cloned);
                                    }
                                } catch (e) {
                                    console.log(e);
                                }

                                // CustomDatabase 1
                                try {
                                    let Scholarscope_CustomDatabaseLink = document.createElement("a");
                                    with (Scholarscope_CustomDatabaseLink) {
                                        className = "Scholarscope_CustomDatabaseLink";
                                        if (CustomDatabaseDomain == "") {
                                            href = "http://blog.scholarscope.online/setting-download-domain/";
                                        } else {
                                            if (CustomDatabaseDomain.substr(-1) == "\=") {
                                                href = "https://" + CustomDatabaseDomain + DOI;
                                            } else {
                                                href = "https://" + CustomDatabaseDomain + "/" + DOI;
                                            }
                                        }
                                        target = "_blank";
                                    }
                                    let Scholarscope_CustomDatabaseImg = document.createElement("img");
                                    with (Scholarscope_CustomDatabaseImg) {
                                        className = "Scholarscope_CustomDatabaseImg";
                                        title = "Full-text Link 1";
                                        src = chrome.runtime.getURL('images/CustomDatabase.png');
                                    }
                                    Scholarscope_CustomDatabaseLink.appendChild(Scholarscope_CustomDatabaseImg);

                                    // Append Clone
                                    for (let j = 0; j < CustomDatabaseList.length; j++) {
                                        let Scholarscope_CustomDatabaseLink_Cloned = Scholarscope_CustomDatabaseLink.cloneNode(true);
                                        CustomDatabaseList[j].appendChild(Scholarscope_CustomDatabaseLink_Cloned);
                                    }
                                } catch (e) {
                                    console.log(e);
                                }

                                // CustomDatabase 2
                                try {
                                    let Scholarscope_CustomDatabase2Link = document.createElement("a");
                                    with (Scholarscope_CustomDatabase2Link) {
                                        className = "Scholarscope_CustomDatabase2Link";
                                        if (CustomDatabaseDomain2 !== "") {
                                            if (CustomDatabaseDomain2.substr(-1) == "\=") {
                                                href = "https://" + CustomDatabaseDomain2 + DOI;
                                            } else {
                                                href = "https://" + CustomDatabaseDomain2 + "/" + DOI;
                                            }
                                        }
                                        target = "_blank";
                                    }
                                    let Scholarscope_CustomDatabase2Img = document.createElement("img");
                                    with (Scholarscope_CustomDatabase2Img) {
                                        className = "Scholarscope_CustomDatabase2Img";
                                        title = "Full-text Link 2";
                                        src = chrome.runtime.getURL('images/CustomDatabase2.png');
                                    }
                                    Scholarscope_CustomDatabase2Link.appendChild(Scholarscope_CustomDatabase2Img);

                                    // Append Clone
                                    if (CustomDatabaseDomain2 !== "") {
                                        for (let j = 0; j < CustomDatabaseList.length; j++) {
                                            let Scholarscope_CustomDatabase2Link_Cloned = Scholarscope_CustomDatabase2Link.cloneNode(true);
                                            CustomDatabaseList[j].appendChild(Scholarscope_CustomDatabase2Link_Cloned);
                                        }
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        })
                    } catch (e) {
                        console.log(e);
                    }
                    // Chrome需删除 Ending

                    // Add QRCode
                    if (ServerConfiguration.QRCode == 1) {
                        try {
                            chrome.storage.local.get(null, function (LocalStorageData) {
                                if (LocalStorageData.QRCode == 1) {
                                    let qrdiv = document.createElement("div");
                                    with (qrdiv) {
                                        id = "qrdiv-short";
                                    }
                                    let qrbutton = document.createElement("img");
                                    with (qrbutton) {
                                        id = "qrbutton-short";
                                        src = chrome.runtime.getURL('images/qrbutton-short.png');
                                    }
                                    let SocialSharing = document.getElementsByClassName("social-sharing")[0];
                                    SocialSharing.appendChild(qrdiv);
                                    qrdiv.appendChild(qrbutton);
                                    console.log("Add QRcode");
                                    let qrcodepicdiv = document.createElement("div");
                                    with (qrcodepicdiv) {
                                        id = "qrcodepic-short"
                                    }
                                    qrdiv.appendChild(qrcodepicdiv);
                                    let articleurl = "https://pubmed.ncbi.nlm.nih.gov/" + PMID;
                                    function CreateQRcode(text, typeNumber, errorCorrectionLevel, mode, mb) {
                                        qrcode.stringToBytes = qrcode.stringToBytesFuncs[mb];
                                        var qr = qrcode(typeNumber || 4, errorCorrectionLevel || 'M');
                                        qr.addData(text, mode);
                                        qr.make();
                                        return qr.createImgTag(3, 6);
                                    };
                                    let QRImg = CreateQRcode(articleurl, "5", "M", "Byte", "UTF-8")
                                    document.getElementById('qrcodepic-short').innerHTML = DOMPurify.sanitize(QRImg);
                                }
                            })
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    if (msg.Status == 401) {
                        if (confirm("请登录 Scholarscope !", "")) {
                            window.open("https://account.scholarscope.online/Login.php");
                        }
                    } else if (msg.Status == 404) {
                        alert("未连接到 Scholarscope 服务器，请检查网络情况");
                    } else if (msg.Status == 502 || msg.Status == 504) {
                        alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                    }
                }

            });
        } catch (e) {
            console.log(e);
        }

        // Assistant
        try {
            ScholarscopeAssistant(PMID);
        } catch (e) {
            console.log(e);
        }

        // Article Sidebar
        try {
            let body = document.getElementsByTagName("body")[0];
            let SidebarButtonFrame = document.createElement("div");
            with (SidebarButtonFrame) {
                id = "Scholarscope_SidebarButtonFrame";
                className = "notranslate";
                style.right = "-0.5vw";
            }
            let SidebarMainFrame = document.createElement("div");
            with (SidebarMainFrame) {
                id = "Scholarscope_SidebarMainFrame";
                className = "notranslate";
            }
            let SidebarTitleFrame = document.createElement("div");
            with (SidebarTitleFrame) {
                id = "Scholarscope_SidebarTitleFrame";
                className = "notranslate";
                innerHTML = DOMPurify.sanitize(Keyword);
            }
            let SidebarPMIDFrame = document.createElement("div");
            with (SidebarPMIDFrame) {
                id = "Scholarscope_SidebarPMIDFrame notranslate";
                innerText = "PMID: " + PMID;
            }
            let SidebarTagsFrame = document.createElement("div");
            with (SidebarTagsFrame) {
                id = "Scholarscope_SidebarTagsFrame";
                className = "notranslate";
            }
            let SidebarHighlightFrame = document.createElement("div");
            with (SidebarHighlightFrame) {
                id = "Scholarscope_SidebarHighlightFrame";
                className = "notranslate";
            }
            let SidebarTagsText = document.createElement("div");
            with (SidebarTagsText) {
                id = "Scholarscope_SidebarTagsText";
                className = "notranslate";
                innerText = "标签：";
            }
            let SidebarTags = document.createElement("div");
            with (SidebarTags) {
                id = 'Scholarscope_SidebarTags';
                className = "notranslate";
                innerText = "无";
            }
            let TagsAddButton = document.createElement("div");
            with (TagsAddButton) {
                id = "Scholarscope_TagsAddButton";
                innerText = "+";
                title = "查看全部标签";
            }
            let TagSavedTip = document.createElement("div");
            with (TagSavedTip) {
                id = "Scholarscope_TagSavedTip";
            }
            let TagSavingImg = document.createElement("img");
            with (TagSavingImg) {
                id = "Scholarscope_TagSavingImg";
                src = chrome.runtime.getURL('images/loading.gif');
            }
            let TagSavedImg = document.createElement("img");
            with (TagSavedImg) {
                id = "Scholarscope_TagSavedImg";
                src = chrome.runtime.getURL('images/check.png');
            }
            TagSavedTip.append(TagSavingImg, TagSavedImg);
            let TagsSelectArea = document.createElement("div");
            with (TagsSelectArea) {
                id = "Scholarscope_TagsSelectArea";
                className = "notranslate";
                style.height = "0";
            }
            // 点击添加按钮
            TagsAddButton.addEventListener("click", function () {
                if (TagsSelectArea.style.height != "150px") {
                    let port = chrome.runtime.connect({
                        name: "GetOtherTags"
                    });
                    port.postMessage({
                        request: PMID
                    });
                    port.onMessage.addListener(function (msg) {
                        if (msg.Status == 200) {
                            let Data = msg["Results"]["Data"];
                            // 如果有标签则显示
                            with (TagsSelectArea) {
                                innerText = "";
                            }
                            TagsSelectArea.style.height = "150px";
                            with (TagsAddButton) {
                                innerText = "▲";
                            }

                            // Update Items Height
                            SidebarTextArea.style.transition = "height 0.3s linear 0s";
                            SidebarTextArea.addEventListener("transitionend", function () {
                                SidebarTextArea.style.maxHeight = "160px";
                            })
                            SidebarTextArea.style.height = "160px";

                            // When changed, also change the part in [Add new tag]
                            for (item in Data) {
                                let TagButtonFrame = document.createElement("div");
                                with (TagButtonFrame) {
                                    TagButtonFrame.setAttribute("tagname", item);
                                    className = "Scholarscope_TagButtonFrame notranslate";
                                    innerText = item;
                                    if (Data[item] == 1) {
                                        TagButtonFrame.style.backgroundColor = "#33B679";
                                        TagButtonFrame.setAttribute("included", 1);
                                    } else if (Data[item] == 0) {
                                        TagButtonFrame.style.backgroundColor = "#A1A5AA";
                                        TagButtonFrame.setAttribute("included", 0);
                                    }
                                }
                                TagButtonFrame.addEventListener("click", function () {
                                    TagSavedImg.style.visibility = "hidden";
                                    TagSavingImg.style.visibility = "visible";
                                    let Scholarscope_ArticleType = document.getElementsByClassName("Scholarscope_ArticleType");
                                    let ArticleType = "";
                                    if (Scholarscope_ArticleType.length != 0) {
                                        ArticleType = Scholarscope_ArticleType[0].innerText;
                                    }
                                    let port = chrome.runtime.connect({
                                        name: "UpdateOtherTags"
                                    });
                                    if (TagButtonFrame.getAttribute("included") == 1) {
                                        port.postMessage({
                                            request: {
                                                "Journal": Journal,
                                                "Title": Keyword,
                                                "PMID": PMID,
                                                "ArticleType": ArticleType,
                                                "Process": "REMOVE",
                                                "TagName": TagButtonFrame.innerText
                                            }
                                        });
                                        TagButtonFrame.setAttribute("included", 0);
                                        TagButtonFrame.style.backgroundColor = "#A1A5AA";
                                    } else if (TagButtonFrame.getAttribute("included") == 0) {
                                        port.postMessage({
                                            request: {
                                                "Journal": Journal,
                                                "Title": Keyword,
                                                "PMID": PMID,
                                                "ArticleType": ArticleType,
                                                "Process": "ADD",
                                                "TagName": TagButtonFrame.innerText
                                            }
                                        });
                                        TagButtonFrame.setAttribute("included", 1);
                                        TagButtonFrame.style.backgroundColor = "#33B679";
                                    }

                                    port.onMessage.addListener(function (msg) {
                                        if (msg.Status == 200) {
                                            // Update Sidebar Tags
                                            let SidebarTags = document.getElementById("Scholarscope_SidebarTags");
                                            SidebarTags.innerText = "";
                                            let TagButtonFrames = document.getElementsByClassName("Scholarscope_TagButtonFrame");
                                            let SidebarTagsArray = [];
                                            for (let TagButtonFramesIndex = 0; TagButtonFramesIndex < TagButtonFrames.length; TagButtonFramesIndex++) {
                                                if (TagButtonFrames[TagButtonFramesIndex].getAttribute("included") == 1) {
                                                    SidebarTagsArray.push(TagButtonFrames[TagButtonFramesIndex].innerText);
                                                }
                                            }
                                            SidebarTags.innerText = DOMPurify.sanitize(SidebarTagsArray.join("; "));
                                            if (SidebarTags.innerText == "") {
                                                SidebarTags.innerText = "无";
                                            }
                                            TagSavingImg.style.visibility = "hidden";
                                            TagSavedImg.style.visibility = "visible";
                                            TagSavedImg.addEventListener("animationend", function () {
                                                this.style.animationName = null;
                                                this.style.visibility = "hidden";
                                            });
                                            TagSavedImg.style.animationName = "FadeOut";
                                        } else {
                                            if (msg.Status == 401) {
                                                if (confirm("请登录 Scholarscope !", "")) {
                                                    window.open("https://account.scholarscope.online/Login.php");
                                                }
                                            } else if (msg.Status == 404) {
                                                alert("未连接到 Scholarscope 服务器，请检查网络情况");
                                            } else if (msg.Status == 502 || msg.Status == 504) {
                                                alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                                            }
                                        }
                                    })
                                })
                                TagsSelectArea.appendChild(TagButtonFrame);
                            }
                            // Update Sidebar Tags
                            let SidebarTags = document.getElementById("Scholarscope_SidebarTags");
                            SidebarTags.innerText = "";
                            let TagButtonFrames = document.getElementsByClassName("Scholarscope_TagButtonFrame");
                            let SidebarTagsArray = [];
                            for (let TagButtonFramesIndex = 0; TagButtonFramesIndex < TagButtonFrames.length; TagButtonFramesIndex++) {
                                if (TagButtonFrames[TagButtonFramesIndex].getAttribute("included") == 1) {
                                    SidebarTagsArray.push(TagButtonFrames[TagButtonFramesIndex].innerText);
                                }
                            }
                            SidebarTags.innerText = DOMPurify.sanitize(SidebarTagsArray.join("; "));
                            if (SidebarTags.innerText == "") {
                                SidebarTags.innerText = "无";
                            }
                            // Add new tag
                            let AddNewTagButtonFrame = document.createElement("div");
                            with (AddNewTagButtonFrame) {
                                id = "Scholarscope_AddNewTagButtonFrame";
                                innerText = "添加一个新标签";
                                AddNewTagButtonFrame.style.backgroundColor = "#039BE5";
                            }
                            AddNewTagButtonFrame.addEventListener("click", function () {
                                let TagReg = /^[A-Za-z]{1}[A-Za-z0-9\_\-\s]{0,31}$/;
                                let TagInputText = prompt("请输入标签名称：", "只能包含英文、短划线、下划线、空格，并且以字母开头，最多32个字符");
                                if (TagInputText != null) {
                                    while (!TagInputText.match(TagReg)) {
                                        TagInputText = prompt("格式错误，请输入标签名称：", "只能包含英文、短划线、下划线、空格，并且以字母开头，最多32个字符");
                                    }
                                    let port = chrome.runtime.connect({
                                        name: "CreateOtherTag"
                                    });
                                    port.postMessage({
                                        request: TagInputText
                                    });
                                    port.onMessage.addListener(function (msg) {
                                        if (msg.Status == 200 && msg.Results.Status == 1) {
                                            let TagButtonFrame = document.createElement("div");
                                            with (TagButtonFrame) {
                                                TagButtonFrame.setAttribute("tagname", TagInputText);
                                                className = "Scholarscope_TagButtonFrame notranslate";
                                                innerText = TagInputText;
                                                TagButtonFrame.style.backgroundColor = "#A1A5AA";
                                                TagButtonFrame.setAttribute("included", 0);
                                            }
                                            TagButtonFrame.addEventListener("click", function () {
                                                let Scholarscope_ArticleType = document.getElementsByClassName("Scholarscope_ArticleType");
                                                let ArticleType = "";
                                                if (Scholarscope_ArticleType.length != 0) {
                                                    ArticleType = Scholarscope_ArticleType[0].innerText;
                                                }
                                                let port = chrome.runtime.connect({
                                                    name: "UpdateOtherTags"
                                                });
                                                if (TagButtonFrame.getAttribute("included") == 1) {
                                                    port.postMessage({
                                                        request: {
                                                            "Journal": Journal,
                                                            "Title": Keyword,
                                                            "PMID": PMID,
                                                            "ArticleType": ArticleType,
                                                            "Process": "REMOVE",
                                                            "TagName": TagButtonFrame.innerText
                                                        }
                                                    });
                                                    TagButtonFrame.setAttribute("included", 0);
                                                    TagButtonFrame.style.backgroundColor = "#A1A5AA";
                                                } else if (TagButtonFrame.getAttribute("included") == 0) {
                                                    port.postMessage({
                                                        request: {
                                                            "Journal": Journal,
                                                            "Title": Keyword,
                                                            "PMID": PMID,
                                                            "ArticleType": ArticleType,
                                                            "Process": "ADD",
                                                            "TagName": TagButtonFrame.innerText
                                                        }
                                                    });
                                                    TagButtonFrame.setAttribute("included", 1);
                                                    TagButtonFrame.style.backgroundColor = "#33B679";
                                                }
                                                port.onMessage.addListener(function (msg) {
                                                    if (msg.Status == 200) {

                                                    } else {
                                                        if (msg.Status == 401) {
                                                            if (confirm("请登录 Scholarscope !", "")) {
                                                                window.open("https://account.scholarscope.online/Login.php");
                                                            }
                                                        } else if (msg.Status == 404) {
                                                            alert("未连接到 Scholarscope 服务器，请检查网络情况");
                                                        } else if (msg.Status == 502 || msg.Status == 504) {
                                                            alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                                                        }
                                                    }
                                                })
                                            })
                                            TagsSelectArea.insertBefore(TagButtonFrame, TagsSelectArea.firstChild);
                                        }
                                    })
                                }
                            })
                            TagsSelectArea.appendChild(AddNewTagButtonFrame);
                        } else {
                            if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 404) {
                                alert("未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    })
                } else {
                    TagsSelectArea.style.height = "0px";
                    with (TagsAddButton) {
                        innerText = "+";
                    }
                    SidebarTextArea.style.transition = null;
                    SidebarTextArea.style.maxHeight = "26vh";
                }
            })

            // Sidebar - Note
            let SidebarTextAreaFrame = document.createElement("div");
            with (SidebarTextAreaFrame) {
                id = "Scholarscope_SidebarTextAreaFrame";
                className = "notranslate";
            }
            let SidebarTextAreaTitle = document.createElement("div");
            with (SidebarTextAreaTitle) {
                id = "Scholarscope_SidebarTextTitle";
                innerText = "备注";
            }
            let SidebarTextArea = document.createElement("textarea");
            with (SidebarTextArea) {
                id = "Scholarscope_SidebarTextArea";
                className = "notranslate";
                maxlength = '150';
            }
            SidebarTextAreaFrame.append(SidebarTextAreaTitle, SidebarTextArea);

            let SidebarWordCountFrame = document.createElement("div");
            with (SidebarWordCountFrame) {
                id = "Scholarscope_SidebarWordCountFrame";
            }
            let SidebarWordCountText1Frame = document.createElement("span");
            with (SidebarWordCountText1Frame) {
                className = "Scholarscope_SidebarWordTextFrame";
                innerText = "字符数： ";
            }
            let SidebarWordCountNumberFrame = document.createElement("span");
            with (SidebarWordCountNumberFrame) {
                id = "Scholarscope_SidebarWordCountNumberFrame";
                innerText = SidebarTextArea.value.length;
            }
            let SidebarWordCountText2Frame = document.createElement("span");
            with (SidebarWordCountText2Frame) {
                className = "Scholarscope_SidebarWordTextFrame";
                innerText = "/150";
            }
            let SidebarSaveButton = document.createElement("div");
            with (SidebarSaveButton) {
                id = "Scholarscope_SaveButton";
            }
            let SidebarSaveButtonText = document.createElement("div");
            with (SidebarSaveButtonText) {
                id = "Scholarscope_SaveButtonText";
                innerText = "保存";
            }
            SidebarSaveButton.appendChild(SidebarSaveButtonText);
            let SidebarLoadingGIFFrame = document.createElement("div");
            with (SidebarLoadingGIFFrame) {
                id = "Scholarscope_SidebarLoadingGIFFrame";
            }
            let SidebarLoadingGIF = document.createElement("img");
            with (SidebarLoadingGIF) {
                id = "Scholarscope_SidebarLoadingGIF";
                src = chrome.runtime.getURL('images/loading.gif');
            }
            SidebarLoadingGIFFrame.appendChild(SidebarLoadingGIF);
            SidebarSaveButton.appendChild(SidebarLoadingGIFFrame);
            let SidebarSaveTips = document.createElement("div");
            with (SidebarSaveTips) {
                id = "Scholarscope_SidebarSaveTips";
            }
            let SidebarSaveNoteTip = document.createElement("div");
            with (SidebarSaveNoteTip) {
                id = "Scholarscope_SidebarSaveNoteTip";
            }
            let SidebarSaveHighlightTip = document.createElement("div");
            with (SidebarSaveHighlightTip) {
                id = "Scholarscope_SidebarSaveHighlightTip";
            }
            SidebarSaveTips.append(SidebarSaveNoteTip, SidebarSaveHighlightTip);
            SidebarSaveButton.addEventListener("click", function () {
                SCHOLARSCOPE_GLOBAL_SAVESTATUS = 0;
                SidebarSaveNoteTip.innerText = "";
                SidebarSaveButtonText.style.visibility = "hidden";
                SidebarLoadingGIFFrame.style.visibility = "visible";
                if (SidebarWordCountNumberFrame.innerText > 150) {
                    alert("超过字符上限，不能保存！")
                } else {
                    // Update Note
                    let NotePort = chrome.runtime.connect({
                        name: "UpdateTextNote"
                    });
                    NotePort.postMessage({
                        "PMID": PMID,
                        "Content": SidebarTextArea.value
                    });
                    console.log("REQUEST: Update Text Note");
                    NotePort.onMessage.addListener(function (msg) {
                        SCHOLARSCOPE_GLOBAL_SAVESTATUS += 1;
                        if (SCHOLARSCOPE_GLOBAL_SAVESTATUS == SCHOLARSCOPE_GLOBAL_SAVESTANDARD) {
                            SidebarSaveButtonText.style.visibility = "visible";
                            SidebarLoadingGIFFrame.style.visibility = "hidden";
                        }

                        if (msg.Status == 200 && msg.Results.Status == 1) {
                            with (SidebarSaveNoteTip) {
                                innerText = "保存成功：备注";
                                style.color = "#33B679";
                            }
                        } else {
                            if (msg.Status == 200 && msg.Results.Status == 0) {
                                with (SidebarSaveNoteTip) {
                                    innerText = DOMPurify.sanitize(msg.Results.Error);
                                    style.color = "#F6BF26";
                                }
                            } else if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 404) {
                                with (SidebarSaveNoteTip) {
                                    innerText = "备注保存失败";
                                    style.color = "#F6BF26";
                                }
                                alert("备注保存失败：未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                with (SidebarSaveNoteTip) {
                                    innerText = "备注保存失败";
                                    style.color = "#F6BF26";
                                }
                                alert("备注保存失败：Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    });
                }
            })
            let SidebarImageFrame = document.createElement("div");
            with (SidebarImageFrame) {
                id = "Scholarscope_SidebarImageFrame";
            }
            let SidebarImage = document.createElement("img");
            with (SidebarImage) {
                id = "Scholarscope_SidebarImage";
                src = chrome.runtime.getURL('images/icon96.png');
            }
            let SidebarHelpFrame = document.createElement("div");
            with (SidebarHelpFrame) {
                id = "Scholarscope_SidebarHelpFrame";
                className = "notranslate";
                innerText = "Help";
            }
            let SidebarHelpFrameATag = document.createElement("a");
            with (SidebarHelpFrameATag) {
                target = "_blank";
                href = "http://blog.scholarscope.online/notebook/";
            }
            SidebarTagsFrame.append(SidebarTagsText, SidebarTags, TagsAddButton, TagSavedTip, TagsSelectArea);
            SidebarWordCountFrame.append(SidebarWordCountText1Frame, SidebarWordCountNumberFrame, SidebarWordCountText2Frame);
            if (LocalStorageData.Highlight == 1) {
                SidebarMainFrame.append(SidebarTitleFrame, SidebarPMIDFrame, SidebarTagsFrame, SidebarHighlightFrame, SidebarTextAreaFrame, SidebarWordCountFrame, SidebarSaveButton, SidebarSaveTips);
            } else {
                SidebarMainFrame.append(SidebarTitleFrame, SidebarPMIDFrame, SidebarTagsFrame, SidebarTextAreaFrame, SidebarWordCountFrame, SidebarSaveButton, SidebarSaveTips);
            }
            SidebarImageFrame.appendChild(SidebarImage);
            SidebarButtonFrame.appendChild(SidebarImageFrame);
            SidebarHelpFrameATag.appendChild(SidebarHelpFrame);
            SidebarButtonFrame.appendChild(SidebarHelpFrameATag);
            body.appendChild(SidebarButtonFrame);
            body.appendChild(SidebarMainFrame);
            if (LocalStorageData.Highlight == 1) {
                ScholarscopeHighlight();
            }

            SidebarTextArea.addEventListener("keyup", function () {
                let WordCount = SidebarTextArea.value.length;
                if (WordCount > 150) {
                    SidebarWordCountNumberFrame.style.color = "red";
                } else {
                    SidebarWordCountNumberFrame.style.color = "white";
                }
                SidebarWordCountNumberFrame.innerText = WordCount;
                SidebarSaveNoteTip.innerText = "";
            })
            SidebarImageFrame.addEventListener("click", function () {
                if (SidebarButtonFrame.style.right == "-0.5vw") {
                    try {
                        const AssistantFrame = document.getElementById("Scholarscope_AssistantFrame");
                        AssistantFrame.style.maxWidth = "calc(100% - 65px - 24vw)";
                    } catch (e) {
                        console.log(e);
                    }
                    SidebarButtonFrame.style.right = "23.5vw";
                    SidebarMainFrame.style.right = "0px";
                    SidebarImage.src = chrome.runtime.getURL('images/doublearrow.png');
                    // 加载标签
                    let port = chrome.runtime.connect({
                        name: "GetOtherTags"
                    });
                    port.postMessage({
                        request: PMID
                    });
                    console.log("REQUEST: Get Other Tags");
                    port.onMessage.addListener(function (msg) {
                        if (msg.Status == 200) {
                            if (msg["Results"]["Data"].length != 0) {
                                let Data = msg["Results"]["Data"];
                                let SidebarTagsArray = new Array();
                                for (item in Data) {
                                    if (Data[item] == 1) {
                                        SidebarTagsArray.push(item);
                                    }
                                }
                                if (SidebarTagsArray.length > 0) {
                                    SidebarTags.innerText = SidebarTagsArray.join("; ");
                                }
                            }
                        } else {
                            if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 404) {
                                alert("未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    })
                    // Take Note
                    let NotePort = chrome.runtime.connect({
                        name: "GetTextNote"
                    });
                    NotePort.postMessage({
                        request: PMID
                    });
                    console.log("REQUEST: Get Text Note");
                    NotePort.onMessage.addListener(function (msg) {
                        if (msg.Status == 200) {
                            with (SidebarTextArea) {
                                //SidebarTextArea.innerHTML = DOMPurify.sanitize(TextNote.replace(/\r/g, '&#13;'));
                                SidebarTextArea.value = DOMPurify.sanitize(msg.Results.Data);
                                with (SidebarWordCountNumberFrame) {
                                    innerText = SidebarTextArea.value.length;
                                }
                            }
                        } else {
                            if (msg.Status == 401) {
                                if (confirm("请登录 Scholarscope !", "")) {
                                    window.open("https://account.scholarscope.online/Login.php");
                                }
                            } else if (msg.Status == 404) {
                                alert("未连接到 Scholarscope 服务器，请检查网络情况");
                            } else if (msg.Status == 502 || msg.Status == 504) {
                                alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                            }
                        }
                    });
                } else {
                    SidebarButtonFrame.style.right = "-0.5vw";
                    SidebarMainFrame.style.right = "-24vw";
                    SidebarImage.src = chrome.runtime.getURL('images/icon96.png');

                    try {
                        const AssistantFrame = document.getElementById("Scholarscope_AssistantFrame");
                        AssistantFrame.style.maxWidth = "calc(100vw - 35px)";
                    } catch (e) {
                        console.log(e);
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }

        // Label Buttons
        try {
            let ActionsButtons = document.getElementsByClassName("actions-buttons sidebar")[0];
            let InnerWrap = ActionsButtons.getElementsByClassName("inner-wrap")[0];

            let LabelButtonDiv = document.createElement("div");
            LabelButtonDiv.id = "LabelButton";
            InnerWrap.appendChild(LabelButtonDiv);

            function remove(arr, text) {
                for (let q = 0; q < arr.length; q++) {
                    if (arr[q] == text) {
                        arr.splice(q, 1);
                    }
                }
                return arr;
            }

            function CreateFavButtons(FavStatusArray, Type, TitleText, Color) {
                let ButtonDiv = document.createElement("div");
                let ButtonImg = document.createElement("img");
                with (ButtonDiv) {
                    id = Type + "div";
                    title = TitleText;
                }
                ButtonDiv.addEventListener("click", function () {
                    let Scholarscope_ArticleType = document.getElementsByClassName("Scholarscope_ArticleType");
                    let ArticleType = "";
                    if (Scholarscope_ArticleType.length != 0) {
                        ArticleType = Scholarscope_ArticleType[0].innerText;
                    }
                    let FavData = {
                        "Command": "",
                        "Type": Type,
                        "PMID": PMID,
                        "Journal": Journal,
                        "Title": Keyword,
                        "ArticleType": ArticleType
                    }
                    if (FavStatusArray[Type] == 0) {
                        console.log("ADD: " + Type);
                        FavData.Command = "ADD";
                        with (ButtonDiv) {
                            style.backgroundColor = Color;
                        }
                        let port = chrome.runtime.connect({
                            name: "UpdateFavTags"
                        });
                        port.postMessage({
                            request: FavData
                        });
                        port.onMessage.addListener(function (msg) {
                            if (msg.Status == 200) {
                                with (ButtonDiv) {
                                    style.backgroundColor = Color;
                                }
                                FavStatusArray[Type] = 1;
                            } else {
                                with (ButtonDiv) {
                                    style.backgroundColor = "#808080";
                                }
                                if (msg.Status == 401) {
                                    if (confirm("请登录 Scholarscope !", "")) {
                                        window.open("https://account.scholarscope.online/Login.php");
                                    }
                                } else if (msg.Status == 404) {
                                    alert("未连接到 Scholarscope 服务器，请检查网络情况");
                                } else if (msg.Status == 502 || msg.Status == 504) {
                                    alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                                }
                            }
                        })
                    } else if (FavStatusArray[Type] == 1) {
                        console.log("REMOVE: " + Type);
                        FavData.Command = "REMOVE";
                        let port = chrome.runtime.connect({
                            name: "UpdateFavTags"
                        });
                        port.postMessage({
                            request: FavData
                        });
                        with (ButtonDiv) {
                            style.backgroundColor = Color;
                        }
                        port.onMessage.addListener(function (msg) {
                            if (msg.Status == 200) {
                                with (ButtonDiv) {
                                    style.backgroundColor = "#808080";
                                }
                                FavStatusArray[Type] = 0;
                            } else {
                                with (ButtonDiv) {
                                    style.backgroundColor = Color;
                                }
                                if (msg.Status == 401) {
                                    if (confirm("请登录 Scholarscope !", "")) {
                                        window.open("https://account.scholarscope.online/Login.php");
                                    }
                                } else if (msg.Status == 404) {
                                    alert("未连接到 Scholarscope 服务器，请检查网络情况");
                                } else if (msg.Status == 502 || msg.Status == 504) {
                                    alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                                }
                            }
                        })
                    }
                });
                with (ButtonImg) {
                    id = Type + "img";
                    src = chrome.runtime.getURL("images/" + Type + "img.png");
                }
                ButtonDiv.appendChild(ButtonImg);
                LabelButtonDiv.appendChild(ButtonDiv);

                if (FavStatusArray[Type] == 1) {
                    with (ButtonDiv) {
                        style.backgroundColor = Color;
                    }
                }
            }

            // Get Original Fav Tags
            let FullViewHeading = document.getElementById("full-view-heading");
            let ArticleType = "";
            if (FullViewHeading.getElementsByClassName("publication-type").length != 0) {
                ArticleType = FullViewHeading.getElementsByClassName("publication-type")[0].innerText;
            }
            if (ArticleType == "") {
                let Scholarscope_ArticleType = document.getElementsByClassName("Scholarscope_ArticleType");
                if (Scholarscope_ArticleType.length != 0) {
                    ArticleType = Scholarscope_ArticleType[0].innerText;
                }
            }
            let FavData = {
                "PMID": PMID,
                "Journal": Journal,
                "Title": Keyword,
                "ArticleType": ArticleType
            }
            let port = chrome.runtime.connect({
                name: "GetFavTags"
            });
            port.postMessage({
                request: FavData
            });
            port.onMessage.addListener(function (msg) {
                if (msg.Status == 200) {
                    let Data = msg.Results.Data;
                    let FavStatusArray = new Array();
                    FavStatusArray["read"] = 1;
                    FavStatusArray["want"] = Data.Want;
                    FavStatusArray["like"] = Data.Like;
                    FavStatusArray["dislike"] = Data.Dislike;

                    CreateFavButtons(FavStatusArray, "read", "已读", "#32CD32");
                    CreateFavButtons(FavStatusArray, "want", "想读", "#FFA500");
                    CreateFavButtons(FavStatusArray, "like", "喜欢", "#FF0000");
                    CreateFavButtons(FavStatusArray, "dislike", "不喜欢", "#000000");
                } else {
                    if (msg.Status == 401) {
                        if (confirm("请登录 Scholarscope !", "")) {
                            window.open("https://account.scholarscope.online/Login.php");
                        }
                    } else if (msg.Status == 404) {
                        alert("未连接到 Scholarscope 服务器，请检查网络情况");
                    } else if (msg.Status == 502 || msg.Status == 504) {
                        alert("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }

        // Export to Endnote
        try {
            chrome.storage.local.get(null, function (LocalStorageData) {
                let ActionsButtons = document.getElementsByClassName("actions-buttons sidebar")[0];
                let InnerWrap = ActionsButtons.getElementsByClassName("inner-wrap")[0];
                let EndnodeButton = document.createElement("div");
                with (EndnodeButton) {
                    id = "EndnoteDiv";
                    title = "导出EndNote文件";
                }
                let EndnodeButtonDiv = document.createElement("div");
                EndnodeButtonDiv.id = "Scholarscope_EndnodeButtonDiv";
                let EndnoteImg = document.createElement("img");
                EndnoteImg.src = chrome.runtime.getURL('images/Export_Short.png');
                EndnodeButtonDiv.appendChild(EndnoteImg);
                EndnodeButton.appendChild(EndnodeButtonDiv);
                InnerWrap.appendChild(EndnodeButton);
                // Loading GIF
                let LoadingGIF = document.createElement("div");
                LoadingGIF.id = "Scholarscope_LoadingGIF"
                let LoadingImg = document.createElement("img");
                with (LoadingImg) {
                    id = "Scholarscope_LoadingGIFTag";
                    src = chrome.runtime.getURL('images/loading.gif');
                }
                LoadingGIF.appendChild(LoadingImg);
                EndnodeButton.appendChild(LoadingGIF);
                // Click to Download Citation
                EndnodeButton.addEventListener("click", function () {
                    let port = chrome.runtime.connect({
                        name: "DownloadCitation"
                    });
                    port.postMessage({
                        request: PMID
                    });
                    LoadingGIF.style.opacity = 1;
                    LoadingImg.style.opacity = 1;
                    port.onMessage.addListener(function (msg) {
                        if (msg = "Downloaded") {
                            LoadingImg.src = chrome.runtime.getURL('images/EndNoteDownload.png');
                        }
                    });
                })
            })
        } catch (e) {
            console.log(e);
        }

        // Add Appendix Info
        try {
            chrome.storage.local.get(null, function (LocalStorageData) {
                let AuthorArray = [];
                let JournalArray = [];
                let DOIArray = [];
                let YearArray = [];
                let OtherDateInfo = [];
                let ArticleType = [];
                let PMIDArray = [];
                let LabsDocsumCitationCollection = document.getElementsByClassName("docsum-citation");
                let DocsumContentTemp = document.getElementsByClassName("docsum-content");
                let ArticleListCount = DocsumContentTemp.length;
                let DocsumContent = document.getElementsByClassName("docsum-content");
                for (i = 0; i < ArticleListCount; i++) {
                    // target blank
                    let LDCC = LabsDocsumCitationCollection[i];
                    let Get_a_tag = document.getElementsByClassName("docsum-title")[i];
                    Get_a_tag.setAttribute("target", "_blank");
                    Get_a_tag.style.display = "inline";
                    // Author
                    let AuthorObject = LDCC.getElementsByClassName("docsum-authors")[0];
                    AuthorArray[i] = AuthorObject.innerText;
                    // PMID
                    let PMIDObject = LDCC.getElementsByClassName("docsum-pmid")[0];
                    PMIDArray[i] = PMIDObject.innerText;
                    let DocsumSnippet = document.createElement("div");
                    with (DocsumSnippet) {
                        className = "docsum-snippet";
                    }
                    Scholarscope_FullViewSnippet = document.createElement("div");
                    with (Scholarscope_FullViewSnippet) {
                        className = "full-view-snippet";
                    }
                    Scholarscope_FullViewSnippet.setAttribute("fullviewpmid", DOMPurify.sanitize(PMIDArray[i]));
                    DocsumSnippet.appendChild(Scholarscope_FullViewSnippet);
                    DocsumContent[i].appendChild(DocsumSnippet);
                    // JournalCitation
                    let JournalCitationObject = LDCC.getElementsByClassName("docsum-journal-citation")[0];
                    let JournalCitationString = JournalCitationObject.innerText;

                    if (JournalCitationString == "") {
                        JournalArray[i] = "No Journal Title";
                        DOIArray[i] = null;
                        ArticleType[i] = null;
                        YearArray[i] = "0000";
                    } else {
                        // 检验是否为期刊
                        CitationPattern = /^\d[0-9]{3}/;
                        if (CitationPattern.test(JournalCitationString)) {
                            // Journal Title
                            JournalArray[i] = "Books and Documents";
                            // Year
                            YearArray[i] = JournalCitationString.substring(0, 4);
                            let DateString = JournalCitationString.split(".")[0];
                            OtherDateInfo[i] = DateString.substring(4, DateString.length);
                        } else {
                            // Journal Title
                            let JournalCitationArray = JournalCitationString.split(".");
                            JournalArray[i] = JournalCitationArray[0];
                            // Year
                            let YearString = "";
                            try {
                                YearString = JournalCitationArray[1].trim();
                            } catch (e) {
                                console.log(e);
                            }
                            let DateString = YearString.split(":")[0];
                            DateString = DateString.split(";")[0];
                            YearArray[i] = DateString.substring(0, 4);
                            OtherDateInfo[i] = DateString.substring(4, DateString.length);
                        }

                        // DOI
                        let DOIPattern = new RegExp(/doi\:\s10\.[0-9]{4,5}\/[a-z0-9\.\(\)\-]+/, "i");
                        if (DOIPattern.test(JournalCitationString)) {
                            DOIArray[i] = JournalCitationString.match(DOIPattern)[0].toString();
                            DOIArray[i] = deleteEndingDot(DOIArray[i]);
                            DOIArray[i] = DOIArray[i].replace(/doi\:\s/, "");
                        } else {
                            DOIArray[i] = null;
                        }

                        // Article Type
                        let ArticleTypeObject = LDCC.getElementsByClassName("publication-type")[0];
                        if (ArticleTypeObject != undefined) {
                            ArticleType[i] = ArticleTypeObject.innerText;
                            ArticleType[i] = deleteEndingDot(ArticleType[i]);
                        } else {
                            ArticleType[i] = null;
                        }
                    }

                    // LabsDocsumCitation Rebuild
                    let ChildNodeArray = LDCC.children;
                    let ChildNodeLength = ChildNodeArray.length;
                    for (let ChildNodeIndex = 0; ChildNodeIndex < ChildNodeLength; ChildNodeIndex++) {
                        ChildNodeArray[ChildNodeIndex].style.display = "none";
                    }

                    // Add Journal
                    let JournalFrame = document.createElement("div");
                    with (JournalFrame) {
                        className = "Scholarscope_Appendix_JournalFrame notranslate";
                    }
                    let JournalDiv = document.createElement("div");
                    with (JournalDiv) {
                        className = "Scholarscope_Appendix_Journal notranslate";
                        innerHTML = DOMPurify.sanitize(JournalArray[i]);
                    }
                    JournalFrame.appendChild(JournalDiv);
                    LDCC.appendChild(JournalFrame);
                    // Add Author
                    if (AuthorArray[i] != null) {
                        let AuthorFrame = document.createElement("div");
                        with (AuthorFrame) {
                            className = "Scholarscope_AuthorFrame";
                            innerText = AuthorArray[i]
                        }
                        LDCC.appendChild(AuthorFrame);
                    }
                    // Add DOI
                    if (DOIArray[i] != null) {
                        let DOIDiv = document.createElement("div");
                        with (DOIDiv) {
                            className = "Scholarscope_DOI";
                            innerHTML = "DOI: " + DOMPurify.sanitize(DOIArray[i]);
                        }
                        let DOILink = document.createElement("a");
                        with (DOILink) {
                            className = "Scholarscope_DOILink";
                            href = "https://doi.org/" + DOIArray[i];
                            target = "_blank";
                        }
                        DOILink.appendChild(DOIDiv);
                        LDCC.appendChild(DOILink);
                    }
                    // Add PMID
                    let ArticleInfoDiv = document.createElement("div");
                    with (ArticleInfoDiv) {
                        className = "Scholarscope_ArticleInfo";
                        innerHTML = "PMID: " + DOMPurify.sanitize(PMIDArray[i]);
                    }
                    LDCC.appendChild(ArticleInfoDiv);
                }

                // Send Request
                let postData = {
                    "version": version,
                    "journal": JournalArray,
                    "pmid": PMIDArray,
                    "publish": YearArray,
                    "needquartile": LocalStorageData.Quartile,
                    "cas": LocalStorageData.CAS,
                    "warning": LocalStorageData.Warning,
                };
                let port = chrome.runtime.connect({
                    name: "AppendixInfo"
                });
                port.postMessage(postData);
                port.onMessage.addListener(function (msg) {
                    if (msg.Status == 200) {
                        let Results = msg.Results;
                        let ServerConfiguration = Results.Configuration;
                        let Factors = Results.data;
                        let Quartiles = Results.quartile;
                        let BlackList = Results.blacklist;
                        let Scholarscope_AppendixJournal = document.getElementsByClassName("Scholarscope_Appendix_Journal");
                        let JournalFrame = document.getElementsByClassName("Scholarscope_Appendix_JournalFrame");
                        for (let t = 0; t < ArticleListCount; t++) {
                            // Scholarscope_Factor Frame
                            let Scholarscope_Factor = document.createElement("div");
                            with (Scholarscope_Factor) {
                                className = "Scholarscope_Appendix_Factor notranslate";
                                if (Factors[t] == "") {
                                    innerHTML = "Not Found";
                                } else {
                                    innerHTML = DOMPurify.sanitize(Factors[t]);
                                }
                            }
                            JournalFrame[t].appendChild(Scholarscope_Factor);
                            if (Factors[t] == "") {
                                Scholarscope_AppendixJournal[t].style.backgroundColor = "#616161";
                                Scholarscope_Factor.style.backgroundColor = "#616161";
                            } else if (Factors[t] >= 20) {
                                Scholarscope_AppendixJournal[t].style.backgroundColor = "#D50000";
                                Scholarscope_Factor.style.backgroundColor = "#D50000";
                            } else if (Factors[t] >= 10) {
                                Scholarscope_AppendixJournal[t].style.backgroundColor = "#F4511E";
                                Scholarscope_Factor.style.backgroundColor = "#F4511E";
                            } else if (Factors[t] >= 3) {
                                Scholarscope_AppendixJournal[t].style.backgroundColor = "#F6BF26";
                                Scholarscope_Factor.style.backgroundColor = "#F6BF26";
                            } else if (Factors[t] >= 0) {
                                Scholarscope_AppendixJournal[t].style.backgroundColor = "#33B679";
                                Scholarscope_Factor.style.backgroundColor = "#33B679";
                            }
                            // Scholarscope_Quartile Frame
                            if (ServerConfiguration.Quartile == 1) {
                                let Scholarscope_Quartile = document.createElement("div");
                                with (Scholarscope_Quartile) {
                                    className = "Scholarscope_Appendix_Quartile notranslate";
                                    innerHTML = DOMPurify.sanitize(Quartiles[t]);
                                }
                                if (Quartiles[t] == "Q1" || Quartiles[t] == "1区") {
                                    Scholarscope_Quartile.style.backgroundColor = "#D50000";
                                } else if (Quartiles[t] == "Q2" || Quartiles[t] == "2区") {
                                    Scholarscope_Quartile.style.backgroundColor = "#F4511E";
                                } else if (Quartiles[t] == "Q3" || Quartiles[t] == "3区") {
                                    Scholarscope_Quartile.style.backgroundColor = "#F6BF26";
                                } else if (Quartiles[t] == "Q4" || Quartiles[t] == "4区") {
                                    Scholarscope_Quartile.style.backgroundColor = "#33B679";
                                } else if (Quartiles[t] == "") {
                                    Scholarscope_Quartile.style.backgroundColor = "#616161";
                                    Scholarscope_Quartile.innerHTML = "N/A";
                                }
                                JournalFrame[t].appendChild(Scholarscope_Quartile);
                            }
                            // Add Year and Article Type
                            let Scholarscope_Year = document.createElement("div");
                            with (Scholarscope_Year) {
                                className = "Scholarscope_Appendix_Year";
                                if (ServerConfiguration.FullPublishDate == 1) {
                                    innerHTML = DOMPurify.sanitize(YearArray[t].toString() + OtherDateInfo[t].toString());
                                } else {
                                    innerHTML = DOMPurify.sanitize(YearArray[t].toString());
                                }
                            }
                            JournalFrame[t].appendChild(Scholarscope_Year);
                            if (ArticleType[t] != undefined) {
                                let Scholarscope_ArticleType = document.createElement("div");
                                with (Scholarscope_ArticleType) {
                                    className = "Scholarscope_Appendix_ArticleType notranslate";
                                    innerHTML = DOMPurify.sanitize(ArticleType[t]);
                                }
                                if (ServerConfiguration.FullPublishDate == 1) {
                                    Scholarscope_ArticleType.style.borderLeft = "1px solid";
                                }
                                JournalFrame[t].appendChild(Scholarscope_ArticleType);
                            }
                            // Scholarscope_BlackList Frame
                            if (ServerConfiguration.Warning == 1) {
                                if (BlackList[t].length != 0) {
                                    let Scholarscope_BlackList = document.createElement("div");
                                    with (Scholarscope_BlackList) {
                                        className = "Scholarscope_Appendix_BlackList";
                                        innerHTML = "⚠️";
                                        title = "预警期刊: " + DOMPurify.sanitize(BlackList[t].join(" | "));
                                    }
                                    JournalFrame[t].appendChild(Scholarscope_BlackList);
                                }
                            }
                        }
                    } else if (msg.Status == 401) {
                        if (confirm("请登录 Scholarscope !", "")) {
                            window.open("https://account.scholarscope.online/Login.php");
                        }
                    } else if (msg.Status == 404) {
                        console.log("未连接到 Scholarscope 服务器，请检查网络情况");
                    } else if (msg.Status == 502 || msg.Status == 504) {
                        console.log("Scholarscope 服务器正在受到网络攻击，部分服务受到影响");
                    }
                })
            })
        } catch (e) {
            console.log(e);
        }
    }
})