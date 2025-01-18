// 清空按钮
// 数据库模版，需同步更改background.js
let DatabaseInitialization = {
    "Version": chrome.runtime.getManifest().version,
    "AssistantInterface": 0,
    "SavedURL": "",
    "PubMedAPI": "",
    "Citation": 0,
    "Quartile": 0,
    "QRCode": 0,
    "FullPublishDate": 0,
    "PageFilterParameter": {
        "AutoSorting": 0,
        "AutoFilter": 0,
        "FilterThresholdMin": 0,
        "FilterThresholdMax": 0,
        "FilterQuartile1": 0,
        "FilterQuartile2": 0,
        "FilterQuartile3": 0,
        "FilterQuartile4": 0,
        "SortingMethod": 0
    },
    "CustomDatabase": "",
    "CustomDatabase2": "",
    "CAS": 0,
    "Warning": 1,
    "NoteToolbar": 1,
    "Highlight": 1,
    "RecognizeEDU": 1,
    "Assistant": 1,
    "MessageQueue": [],
    "ConfigSyncTime": 0
};

let DeleteLocalDataButton = document.getElementById("DeleteLocalDataButton");
DeleteLocalDataButton.addEventListener("click", function () {
    let Selection = confirm("确认要清空所有数据？");
    if (Selection == true) {
        chrome.storage.local.clear(chrome.storage.local.set(DatabaseInitialization, function () {
            alert("数据库已清空，即将重启插件");
            chrome.runtime.reload();
        }))
    }
})

// Main
let manifest = chrome.runtime.getManifest();
let version = manifest.version;
with (document.getElementById("version")) {
    innerHTML = version;
}
let as_div1 = document.getElementById("as_div1");
let as_div2 = document.getElementById("as_div2");
let LoginStatus = 1;
function JumpToLogin() {
    alert("未登录！");
    chrome.tabs.create({
        url: "https://account.scholarscope.online/Login.php"
    });
}
function fadein(element) {
    let op = 0.1; // initial opacity
    element.style.display = 'block';
    let timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 0 + ")";
        op += op * 0.1;
    }, 10);
};

// 保存当前打开页面按钮
let savebutton = document.getElementById("savebutton");
savebutton.addEventListener('click', function () {
    chrome.runtime.sendMessage({
        request: "SavePages"
    });
});
let returnbutton = document.getElementById("returnbutton");
returnbutton.addEventListener('click', function () {
    chrome.runtime.sendMessage({
        request: "OpenSaved"
    });
});
// Switch
let CustomDatabaseDomain = "";
let Highlight;
let Assistant;

chrome.storage.local.get(null, function (result) {
    CustomDatabaseDomain = result.CustomDatabase;
    Highlight = result.Highlight;
    Assistant = result.Assistant;

    // Check Highlight
    if (Highlight == 1) {
        hl_div1.className = "hl_open1";
        hl_div2.className = "hl_open2";
        let getswitchdiv = document.getElementsByClassName("hl_open2")[0];
        if (getswitchdiv != undefined) {
            getswitchdiv.addEventListener("mouseup", function () {
                console.log("NeedHighlight");
            });
        };
    } else {
        hl_div1.className = "hl_close1";
        hl_div2.className = "hl_close2";
    };

    // Check Assistant
    if (Assistant == 1) {
        as_div1.className = "as_open1";
        as_div2.className = "as_open2";
        let getswitchdiv = document.getElementsByClassName("as_open2")[0];
        if (getswitchdiv != undefined) {
            getswitchdiv.addEventListener("mouseup", function () {
                console.log("NeedAssistant");
            });
        };
    } else {
        as_div1.className = "as_close1";
        as_div2.className = "as_close2";
    };
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    let saved = document.getElementById("savetitle");
    switch (message.response) {
        case "Saved":
            with (saved) {
                innerHTML = "保存成功";
            };
            var checkicon = document.getElementById("saveimg");
            with (checkicon) {
                src = "images/check.png";
            };
            fadein(saved);
            fadein(checkicon);
            break;
        case "NothingToSave":
            with (saved) {
                innerHTML = "未找到<br />有效页面";
                title = "有效的页面是指 PubMed 的文献详情页面和搜索页面（PubMed 首页不算有效页面）";
                style.lineHeight = "20px";
                style.wordBreak = "break-all";
                style.wordWrap = "break-word";
            };
            var checkicon = document.getElementById("saveimg");
            with (checkicon) {
                src = "images/cross.png";
            };
            fadein(saved);
            fadein(checkicon);
            break;
        case "NothingReturn":
            let returndiv = document.getElementById("returntitle");
            with (returndiv) {
                innerHTML = "请先<br />保存页面";
                title = "请先保存 PubMed 页面，这样才能恢复";
                style.lineHeight = "20px";
                style.wordBreak = "break-all";
                style.wordWrap = "break-word";
            };
            let returnicon = document.getElementById("returnimg");
            with (returnicon) {
                src = "images/cross.png";
            };
            fadein(returndiv);
            fadein(returnicon);
            break;
    };
});

// 快速查询 - PubMed
let QuickSearchPubmedFrame = document.getElementById("qsp");
let QuickSearchPubmedInput = document.getElementById("quicksearchpubmed");
let QuickSearchPubmedButtonFrame = document.getElementById("psb");
let QuickSearchPubmedButtonATag = document.getElementById("spma");

QuickSearchPubmedInput.addEventListener('focus', function () {
    QuickSearchPubmedFrame.style.backgroundColor = "#336699";
    QuickSearchPubmedInput.style.opacity = 1;
    QuickSearchPubmedInput.style.backgroundColor = "#FFFFFF";
    QuickSearchPubmedButtonFrame.style.backgroundColor = "#55AAFF";
});
QuickSearchPubmedInput.addEventListener('blur', function () {
    QuickSearchPubmedFrame.style.backgroundColor = "#FFFFFF";
    QuickSearchPubmedInput.style.opacity = 0.5;
    QuickSearchPubmedButtonFrame.style.backgroundColor = "#336699";

})
QuickSearchPubmedInput.addEventListener('change', function () {
    QuickSearchPubmedButtonATag.href = "https://pubmed.ncbi.nlm.nih.gov/?term=" + this.value;
});
QuickSearchPubmedInput.addEventListener("keypress", function (e) {
    let PubmedURL = "https://pubmed.ncbi.nlm.nih.gov/?term=" + this.value;
    let key = e.which || e.keyCode;
    if (key == 13) {
        chrome.tabs.create({
            url: PubmedURL
        });
    };
});

// 快速查询 - 全文链接 
function DownloadPDFPost() {
    let form = document.createElement("form");
    let DownloadPDFURL = "";
    if (CustomDatabaseDomain == "") {
        DownloadPDFURL = "https://blog.scholarscope.online/setting-download-domain/"
    } else {
        DownloadPDFURL = "https://" + CustomDatabaseDomain;
    }
    let DownloadPDFRequest = QuickSearchDownloadPDF.value;
    form.setAttribute("method", "post");
    form.setAttribute("action", DownloadPDFURL);
    let params = {
        request: DownloadPDFRequest
    };
    for (let k in params) {
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", k);
        hiddenField.setAttribute("value", params[k]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}

let QuickSearchDownloadPDF = document.getElementById("quicksearchDownloadPDF");
let QuickSearchDownloadPDFDiv = document.getElementById("qss");
let QuickSearchDownloadPDFButton = document.getElementById("ssb");

QuickSearchDownloadPDF.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        if (CustomDatabaseDomain == "") {
            QuickSearchDownloadPDFDiv.action = "https://blog.scholarscope.online/setting-download-domain/"
        } else {
            QuickSearchDownloadPDFDiv.action = "https://" + CustomDatabaseDomain + "/";
        }
        //QuickSearchDownloadPDFDiv.submit();
    };
})
QuickSearchDownloadPDFButton.addEventListener('click', function () {
    if (CustomDatabaseDomain == "") {
        QuickSearchDownloadPDFDiv.action = "https://blog.scholarscope.online/setting-download-domain/"
    } else {
        QuickSearchDownloadPDFDiv.action = "https://" + CustomDatabaseDomain + "/";
    }
    QuickSearchDownloadPDFDiv.submit();
});
QuickSearchDownloadPDF.addEventListener('focus', function () {
    QuickSearchDownloadPDFDiv.style.backgroundColor = "#B22F2F";
    QuickSearchDownloadPDFButton.style.backgroundColor = "#FF0000";
});
QuickSearchDownloadPDF.addEventListener('blur', function () {
    QuickSearchDownloadPDFDiv.style.backgroundColor = "#FFFFFF";
    QuickSearchDownloadPDFButton.style.backgroundColor = "#B22F2F";
});
// Assistant Switch
as_div1.addEventListener("click", function () {
    as_div1.className = (as_div1.className == "as_close1") ? "as_open1" : "as_close1";
    as_div2.className = (as_div2.className == "as_close2") ? "as_open2" : "as_close2";
    let NeedAssistant = document.getElementsByClassName("as_open2")[0];
    if (NeedAssistant != undefined) {
        if (LoginStatus == 1) {
            chrome.storage.local.set({
                "Assistant": 1
            }, function () {
                chrome.runtime.sendMessage({
                    request: "UploadConfiguration"
                });
            });
            console.log("OpenAssistant");
        } else {
            JumpToLogin();
        }
    } else if (NeedAssistant == undefined) {
        if (LoginStatus == 1) {
            chrome.storage.local.set({
                "Assistant": 0
            }, function () {
                chrome.runtime.sendMessage({
                    request: "UploadConfiguration"
                });
            });
            console.log("CloseAssistant");
        } else {
            JumpToLogin();
        }
    }
    // 刷新当前活动的选项卡
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        chrome.tabs.reload(currentTab.id);
    });
});
// Highlight Switch
hl_div1.addEventListener("click", function () {
    hl_div1.className = (hl_div1.className == "hl_close1") ? "hl_open1" : "hl_close1";
    hl_div2.className = (hl_div2.className == "hl_close2") ? "hl_open2" : "hl_close2";
    let need_highlight = document.getElementsByClassName("hl_open2")[0];
    if (need_highlight != undefined) {
        if (LoginStatus == 1) {
            chrome.storage.local.set({
                "Highlight": 1
            }, function () {
                chrome.runtime.sendMessage({
                    request: "UploadConfiguration"
                });
                console.log("OpenHighlight");
            });
        } else {
            JumpToLogin();
        }
    } else if (need_highlight == undefined) {
        if (LoginStatus == 1) {
            chrome.storage.local.set({
                "Highlight": 0
            }, function () {
                chrome.runtime.sendMessage({
                    request: "UploadConfiguration"
                });
                console.log("CloseHighlight");
            });
        } else {
            JumpToLogin();
        }
    }
    // 刷新当前活动的选项卡
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        chrome.tabs.reload(currentTab.id);
    });
});

