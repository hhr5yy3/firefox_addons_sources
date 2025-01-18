// 数据库模版，需同步更改popup.js
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

// functions
function UploadConfiguration(DatabaseResult) {
    let Configuration = {
        "Version": DatabaseResult.Version,
        "PubMedAPI": DatabaseResult.PubMedAPI,
        "Citation": DatabaseResult.Citation,
        "Quartile": DatabaseResult.Quartile,
        "QRCode": DatabaseResult.QRCode,
        "FullPublishDate": DatabaseResult.FullPublishDate,
        "PageFilterParameter": {
            "AutoSorting": DatabaseResult.PageFilterParameter.AutoSorting,
            "AutoFilter": DatabaseResult.PageFilterParameter.AutoFilter,
            "FilterThresholdMin": DatabaseResult.PageFilterParameter.FilterThresholdMin,
            "FilterThresholdMax": DatabaseResult.PageFilterParameter.FilterThresholdMax,
            "FilterQuartile1": DatabaseResult.PageFilterParameter.FilterQuartile1,
            "FilterQuartile2": DatabaseResult.PageFilterParameter.FilterQuartile2,
            "FilterQuartile3": DatabaseResult.PageFilterParameter.FilterQuartile3,
            "FilterQuartile4": DatabaseResult.PageFilterParameter.FilterQuartile4,
            "SortingMethod": DatabaseResult.PageFilterParameter.SortingMethod
        },
        "CustomDatabase": DatabaseResult.CustomDatabase,
        "CustomDatabase2": DatabaseResult.CustomDatabase2,
        "CAS": DatabaseResult.CAS,
        "Warning": DatabaseResult.Warning,
        "NoteToolbar": DatabaseResult.NoteToolbar,
        "Highlight": DatabaseResult.Highlight,
        "RecognizeEDU": DatabaseResult.RecognizeEDU,
        "Assistant": DatabaseResult.Assistant,
        "ConfigSyncTime": parseInt(new Date().getTime() / 1000)
    };
    console.log("UploadConfiguration");
    fetch("https://www.scholarscope.online/api/UploadConfiguration.php", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(Configuration),
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        })
    }).then(function (response) {
        if (response.status != 200) {
            return null;
        } else {
            return response.json();
        }
    }).then(function (json) {
        if (json != null) {
            chrome.storage.local.get(null, function (CurrentDatabase) {
                if (json["ConfigSyncTime"] > CurrentDatabase.ConfigSyncTime) {
                    let Configuration = {
                        "PubMedAPI": json.PubMedAPI,
                        "Citation": json.Citation,
                        "Quartile": json.Quartile,
                        "QRCode": json.QRCode,
                        "FullPublishDate": json.FullPublishDate,
                        "PageFilterParameter": {
                            "AutoSorting": json.AutoSorting,
                            "AutoFilter": json.AutoFilter,
                            "FilterThresholdMin": json.FilterThresholdMin,
                            "FilterThresholdMax": json.FilterThresholdMax,
                            "FilterQuartile1": json.FilterQuartile1,
                            "FilterQuartile2": json.FilterQuartile2,
                            "FilterQuartile3": json.FilterQuartile3,
                            "FilterQuartile4": json.FilterQuartile4,
                            "SortingMethod": json.SortingMethod
                        },
                        "CustomDatabase": json.CustomDatabase,
                        "CustomDatabase2": json.CustomDatabase2,
                        "CAS": json.CAS,
                        "Warning": json.Warning,
                        "NoteToolbar": json.NoteToolbar,
                        "Highlight": json.Highlight,
                        "RecognizeEDU": json.RecognizeEDU,
                        "Assistant": json.Assistant,
                        "ConfigSyncTime": json.ConfigSyncTime
                    };
                    chrome.storage.local.set(Configuration);
                }
            });
        }
    })
}

// Check Required Host Permissions
chrome.permissions.contains(
    {
        origins: ["https://*.scholarscope.online/"]
    },
    (result) => {
        if (result) {
            chrome.permissions.contains(
                {
                    origins: ["https://*.ncbi.nlm.nih.gov/"]
                },
                (result) => {
                    if (result) {
                        console.log("Required Host Permissions Checked");
                    } else {
                        console.log("Permission Denied: PubMed Host");
                        chrome.tabs.create({
                            url: "http://blog.scholarscope.online/lack_of_permission/",
                        });
                    }
                }
            );
        } else {
            console.log("Permission Denied: Scholarscope Host");
            chrome.tabs.create({
                url: "http://blog.scholarscope.online/lack_of_permission/",
            });
        }
    }
);

// UpdateLocalDatabase
function UpdateLocalDatabase(DatabaseInitialization) {
    console.log("Startup Process: Sync Data");
    fetch("https://api.scholarscope.online/GetConfiguration.php", {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }).then(function (response) {
        if (response.status != 200) {
            if (response.status == 401) {
                chrome.tabs.create({
                    url: "https://account.scholarscope.online/Login.php"
                });
                return null;
            } else if (response.status == 404 || response.status == 502 || response.status == 504) {
                console.log("Scholarscope Account Server Not Found");
            }
        } else {
            return response.json();
        }
    }).then(function (json) {
        if (json != null) {
            if (json.Status == 0) {
                chrome.tabs.create({
                    url: json.Redirect
                });
            } else {
                chrome.storage.local.get(null, function (DatabaseResult) {
                    if (json["Configuration"]["ConfigSyncTime"] >= DatabaseResult.ConfigSyncTime || DatabaseResult.ConfigSyncTime == undefined) {
                        DatabaseInitialization.AssistantInterface = DatabaseResult.AssistantInterface ?? 0;
                        DatabaseInitialization.SavedURL = DatabaseResult.SavedURL ?? "";
                        DatabaseInitialization.PubMedAPI = json["Configuration"].PubMedAPI ?? "";
                        DatabaseInitialization.Citation = json["Configuration"].Citation ?? 1;
                        DatabaseInitialization.Quartile = json["Configuration"].Quartile ?? 1;
                        DatabaseInitialization.QRCode = json["Configuration"].QRCode ?? 0;
                        DatabaseInitialization.FullPublishDate = json["Configuration"].FullPublishDate ?? 0;
                        DatabaseInitialization.PageFilterParameter.AutoSorting = json["Configuration"].AutoSorting ?? 0;
                        DatabaseInitialization.PageFilterParameter.AutoFilter = json["Configuration"].AutoFilter ?? 0;
                        DatabaseInitialization.PageFilterParameter.FilterThresholdMin = json["Configuration"].FilterThresholdMin ?? 0;
                        DatabaseInitialization.PageFilterParameter.FilterThresholdMax = json["Configuration"].FilterThresholdMax ?? 0;
                        DatabaseInitialization.PageFilterParameter.FilterQuartile1 = json["Configuration"].FilterQuartile1 ?? 0;
                        DatabaseInitialization.PageFilterParameter.FilterQuartile2 = json["Configuration"].FilterQuartile2 ?? 0;
                        DatabaseInitialization.PageFilterParameter.FilterQuartile3 = json["Configuration"].FilterQuartile3 ?? 0;
                        DatabaseInitialization.PageFilterParameter.FilterQuartile4 = json["Configuration"].FilterQuartile4 ?? 0;
                        DatabaseInitialization.PageFilterParameter.SortingMethod = json["Configuration"].SortingMethod ?? 0;
                        DatabaseInitialization.CustomDatabase = json["Configuration"].CustomDatabase ?? "";
                        DatabaseInitialization.CustomDatabase2 = json["Configuration"].CustomDatabase2 ?? "";
                        DatabaseInitialization.CAS = json["Configuration"].CAS ?? 0;
                        DatabaseInitialization.Warning = json["Configuration"].Warning ?? 1;
                        DatabaseInitialization.NoteToolbar = json["Configuration"].NoteToolbar ?? 1;
                        DatabaseInitialization.Highlight = json["Configuration"].Highlight ?? 1;
                        DatabaseInitialization.RecognizeEDU = json["Configuration"].RecognizeEDU ?? 1;
                        DatabaseInitialization.Assistant = json["Configuration"].Assistant ?? 1;
                        DatabaseInitialization.ConfigSyncTime = json["Configuration"].ConfigSyncTime ?? 0;

                        if (DatabaseResult.Version != chrome.runtime.getManifest().version) {
                            // 在消息队列中添加一条新消息
                            let StorageMessageQueue = "Updated";
                            let MessageQueueArray = DatabaseInitialization.MessageQueue;
                            if (MessageQueueArray.includes(StorageMessageQueue) == false) {
                                MessageQueueArray.push(StorageMessageQueue);
                                DatabaseInitialization.MessageQueue = MessageQueueArray;
                            }
                            console.log("Scholarscope Upgraded");

                            // 打开 PubMed 首页
                            let PubMedPage = {
                                "url": "https://pubmed.ncbi.nlm.nih.gov/"
                            };
                            chrome.tabs.create(PubMedPage);
                        }

                        // 更新本地数据库
                        chrome.storage.local.clear(function () {
                            chrome.storage.local.set(DatabaseInitialization, function () {
                                console.log("Database Synchronization Successful");
                            });
                        });
                    } else {
                        console.log("Database Synchronization Failed: SyncTime");
                    }
                });
            }
        }
    })
}

// Install & Startup
chrome.runtime.onInstalled.addListener(function () {
    UpdateLocalDatabase(DatabaseInitialization);
});
chrome.runtime.onStartup.addListener(function () {
    UpdateLocalDatabase(DatabaseInitialization);
});

// Save Pages
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    let ResponseMSG = {};
    switch (message.request) {
        case "SavePages":
            chrome.tabs.query({}, function (tabs) {
                let foundTabs = tabs.filter(tab => tab.url.startsWith("https://pubmed.ncbi.nlm.nih.gov/") || tab.url.startsWith("https://pubmed.scholarscope.online/"));
                let URLArray = [];
                foundTabs.forEach(tab => {
                    URLArray.push(tab.url);
                });

                if (foundTabs.length === 0) {
                    chrome.storage.local.set({
                        "SavedURL": ""
                    })
                    ResponseMSG.response = "NothingToSave";
                    chrome.runtime.sendMessage(ResponseMSG);
                } else {
                    let URLString = URLArray.join("|");
                    chrome.storage.local.set({
                        "SavedURL": URLString
                    }, function () {
                        ResponseMSG.response = "Saved";
                        chrome.runtime.sendMessage(ResponseMSG);
                    });
                }
            });
            break;
        case "OpenSaved":
            chrome.storage.local.get("SavedURL", function (result) {
                let url_array = [];
                let url_string = result.SavedURL;
                if (url_string != undefined) {
                    url_array = url_string.split("|");
                    let max = url_array.length;
                    for (i = 0; i < max; i++) {
                        let obj = {
                            "url": url_array[i]
                        }
                        chrome.tabs.create(obj);
                    }
                } else {
                    ResponseMSG.response = "NothingReturn";
                    chrome.runtime.sendMessage(ResponseMSG);
                }
            });
            break;
        case "UploadConfiguration":
            chrome.storage.local.get(null, function (DatabaseResult) {
                UploadConfiguration(DatabaseResult);
            });
            break;
        case "UpdateExtensionSettings":
            console.log("UpdateExtensionSettings");
            UpdateLocalDatabase(DatabaseInitialization);
            break;
    }
});

// Port Listener
chrome.runtime.onConnect.addListener(function (port) {
    switch (port.name) {
        case "ImportanceIndex":
            port.onMessage.addListener(function (msg) {
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch("https://api.scholarscope.online/ArticleInfo_v6.php", {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(msg),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        if (response.status == 401) {
                            chrome.tabs.create({
                                url: "https://account.scholarscope.online/Login.php"
                            });
                            return null;
                        } else if (response.status == 404 || response.status == 502 || response.status == 504) {
                            return port.postMessage(ReturnResults);
                        }
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    if (json != null) {
                        if (json.Status == 0) {
                            chrome.tabs.create({
                                url: json.Redirect
                            });
                        } else {
                            ReturnResults.Results = json;
                            if (json.Expire == 0) {
                                chrome.storage.local.get(null, function (DatabaseResult) {
                                    if (json["Configuration"]["ConfigSyncTime"] >= DatabaseResult.ConfigSyncTime || DatabaseResult.ConfigSyncTime == undefined) {
                                        let Configuration = {
                                            "PubMedAPI": json["Configuration"].PubMedAPI,
                                            "Citation": json["Configuration"].Citation,
                                            "Quartile": json["Configuration"].Quartile,
                                            "QRCode": json["Configuration"].QRCode,
                                            "FullPublishDate": json["Configuration"].FullPublishDate,
                                            "PageFilterParameter": {
                                                "AutoSorting": json["Configuration"].AutoSorting,
                                                "AutoFilter": json["Configuration"].AutoFilter,
                                                "FilterThresholdMin": json["Configuration"].FilterThresholdMin,
                                                "FilterThresholdMax": json["Configuration"].FilterThresholdMax,
                                                "FilterQuartile1": json["Configuration"].FilterQuartile1,
                                                "FilterQuartile2": json["Configuration"].FilterQuartile2,
                                                "FilterQuartile3": json["Configuration"].FilterQuartile3,
                                                "FilterQuartile4": json["Configuration"].FilterQuartile4,
                                                "SortingMethod": json["Configuration"].SortingMethod
                                            },
                                            "CustomDatabase": json["Configuration"].CustomDatabase,
                                            "CustomDatabase2": json["Configuration"].CustomDatabase2,
                                            "CAS": json["Configuration"].CAS,
                                            "Warning": json["Configuration"].Warning,
                                            "NoteToolbar": json["Configuration"].NoteToolbar,
                                            "Highlight": json["Configuration"].Highlight,
                                            "RecognizeEDU": json["Configuration"].RecognizeEDU,
                                            "Assistant": json["Configuration"].Assistant,
                                            "ConfigSyncTime": json["Configuration"].ConfigSyncTime
                                        };
                                        chrome.storage.local.set(Configuration, function () {
                                            console.log("Synchronize Database from Server");
                                            return port.postMessage(ReturnResults);
                                        });
                                    } else {
                                        return port.postMessage(ReturnResults);
                                    }
                                });
                            } else {
                                return port.postMessage(ReturnResults);
                            }
                        }
                    }
                })
            });
            break;
        case "AppendixInfo":
            port.onMessage.addListener(function (msg) {
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch("https://api.scholarscope.online/AppendixInfo_v2.php", {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(msg),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        if (response.status == 401) {
                            console.log("Server: Unauthorized");
                            return null;
                        } else if (response.status == 404 || response.status == 502 || response.status == 504) {
                            return port.postMessage(ReturnResults);
                        }
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    if (json != null) {
                        if (json.Status == 0) {
                            chrome.tabs.create({
                                url: json.Redirect
                            });
                        } else {
                            ReturnResults.Results = json;
                            return port.postMessage(ReturnResults);
                        }
                    }
                })
            });
            break;
        case "UpdateCitationCount":
            port.onMessage.addListener(function (msg) {
                let UpdateCitationURL = "https://api.scholarscope.online/UpdateCitation.php?pmid=" + msg.request.PMID + "&count=" + msg.request.CitationCount;
                fetch(UpdateCitationURL, {
                    method: 'GET',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                })
            });
            break;
        case "GetAbstract":
            port.onMessage.addListener(function (msg) {
                chrome.storage.local.get("PubMedAPI", function (result) {
                    if (result.PubMedAPI != "") {
                        let GetAbstractXMLLink = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=xml&id=" + msg.request + "&api_key=" + result.PubMedAPI;
                        fetch(GetAbstractXMLLink, {
                            method: 'GET',
                            credentials: 'omit',
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded'
                            })
                        }).then(function (response) {
                            if (response.status == 200) {
                                return response.text();
                            } else {
                                return null;
                            }
                        }).then(function (text) {
                            if (text !== null) {
                                port.postMessage(text);
                            } else {
                                let GetAbstractTextLink = "https://assistant.scholarscope.online/api/FetchAbstractText.php?id=" + msg.request;
                                fetch(GetAbstractTextLink, {
                                    method: 'GET',
                                    credentials: 'include',
                                    headers: new Headers({
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    })
                                }).then(function (AssistantResponse) {
                                    if (AssistantResponse.status == 200) {
                                        return AssistantResponse.text();
                                    } else {
                                        chrome.tabs.create({
                                            url: "http://blog.scholarscope.online/pubmedapicrashed/",
                                        });
                                        return null;
                                    }
                                }).then(function (text) {
                                    port.postMessage(text);
                                })
                            }
                        })
                    } else {
                        chrome.tabs.create({
                            url: "https://blog.scholarscope.online/pubmed-api/"
                        });
                    }
                });
            });
            break;
        case "DownloadCitation":
            port.onMessage.addListener(function (msg) {
                chrome.storage.local.get("PubMedAPI", function (result) {
                    if (result.PubMedAPI != "") {
                        let FetchCitationURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&query_key=" + result.PubMedAPI + "&id=" + msg.request;
                        fetch(FetchCitationURL, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded'
                            })
                        }).then(function (response) {
                            if (response.status == 200) {
                                return response.text();
                            } else {
                                return null;
                            }
                        }).then(function (CitationInfo) {
                            if (CitationInfo != null) {
                                fetch("https://api.scholarscope.online/ExportToEndnote.php", {
                                    method: 'POST',
                                    credentials: 'include',
                                    body: CitationInfo,
                                    headers: new Headers({
                                        'Content-Type': 'text/xml'
                                    })
                                }).then(function (RawResults) {
                                    if (RawResults.status != 200) {
                                        return null;
                                    } else {
                                        return RawResults.text();
                                    }
                                }).then(function (CitationURL) {
                                    if (CitationURL == null) {
                                        chrome.tabs.create({
                                            url: "https://account.scholarscope.online/Login.php"
                                        });
                                    } else {
                                        chrome.tabs.create({
                                            url: CitationURL
                                        });
                                        port.postMessage("Downloaded");
                                    }
                                })
                            } else {
                                let CheckRepositoryURL = "https://repository.scholarscope.online/api/CheckRepository.php?id=" + msg.request;
                                fetch(CheckRepositoryURL, {
                                    method: 'GET',
                                    headers: new Headers({
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    })
                                }).then(function (CheckRepositoryResult) {
                                    if (CheckRepositoryResult.status != 200) {
                                        return null;
                                    } else {
                                        return CheckRepositoryResult.text();
                                    }
                                }).then(function (CitationURL) {
                                    if (CitationURL == null) {
                                        chrome.tabs.create({
                                            url: "http://blog.scholarscope.online/pubmedapicrashed/"
                                        });
                                    } else {
                                        chrome.tabs.create({
                                            url: CitationURL
                                        });
                                        port.postMessage("Downloaded");
                                    }
                                })
                            }
                        })
                    } else {
                        chrome.tabs.create({
                            url: "https://blog.scholarscope.online/pubmed-api/"
                        });
                    }
                });
            });
            break;
        case "GetMessageQueue":
            port.onMessage.addListener(function (msg) {
                chrome.storage.local.get("MessageQueue", function (result) {
                    try {
                        if (result.MessageQueue.length > 0) {
                            port.postMessage({
                                Message: result.MessageQueue[result.MessageQueue.length - 1]
                            });
                        } else {
                            port.postMessage({
                                Message: ""
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
            })
            break;
        case "UpdateFavTags":
            port.onMessage.addListener(function (msg) {
                let UpdateFavTagsURL = "https://www.scholarscope.online/api/UpdateFavTags.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(UpdateFavTagsURL, {
                    method: 'POST',
                    body: JSON.stringify(msg.request),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "GetFavTags":
            port.onMessage.addListener(function (msg) {
                let GetFavTagsURL = "https://www.scholarscope.online/api/GetFavTags.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(GetFavTagsURL, {
                    method: 'POST',
                    body: JSON.stringify(msg.request),
                    credentials: 'include'
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    if (json.Status == 1) {
                        ReturnResults.Results = json;
                        port.postMessage(ReturnResults);
                    } else {
                        chrome.tabs.create({
                            url: json.Redirect
                        });
                    }
                })
            });
            break;
        case "GetTagsStatus":
            console.log("Request Received: Query Tags Status");
            port.onMessage.addListener(function (msg) {
                let GetFavTagsURL = "https://www.scholarscope.online/api/GetTagsStatus.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(GetFavTagsURL, {
                    method: 'POST',
                    body: JSON.stringify(msg.request),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        if (response.status == 401) {
                            console.log("Server: 401 Unauthorized");
                            /*
                            chrome.tabs.create({
                                url: "https://account.scholarscope.online/Login.php"
                            });
                            */
                            return null;
                        } else if (response.status == 404 || response.status == 502 || response.status == 504) {
                            return port.postMessage(ReturnResults);
                        }
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    if (json.Status == 1) {
                        ReturnResults.Results = json;
                        console.log("Request Reply: Query Tags Status");
                        port.postMessage(ReturnResults);
                    }
                })
            });
            break;
        case "GetOtherTags":
            port.onMessage.addListener(function (msg) {
                let GetOtherTagsURL = "https://www.scholarscope.online/api/GetOtherTags.php?PMID=" + msg.request;
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(GetOtherTagsURL, {
                    method: 'GET',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "UpdateOtherTags":
            port.onMessage.addListener(function (msg) {
                let UpdateOtherTagsURL = "https://www.scholarscope.online/api/UpdateOtherTags.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(UpdateOtherTagsURL, {
                    method: 'POST',
                    body: JSON.stringify(msg.request),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        if (response.status == 402) {
                            chrome.tabs.create({
                                url: "https://pay.scholarscope.online/Subscription.php"
                            });
                        }
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "CreateOtherTag":
            port.onMessage.addListener(function (msg) {
                let CreatOtherTagURL = "https://www.scholarscope.online/api/CreateOtherTag.php?TagName=" + msg.request;
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(CreatOtherTagURL, {
                    method: 'GET',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            })
            break;
        case "GetTextNote":
            port.onMessage.addListener(function (msg) {
                let GetTextNoteURL = "https://www.scholarscope.online/api/GetTextNote.php?PMID=" + msg.request;
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(GetTextNoteURL, {
                    method: 'GET',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "UpdateTextNote":
            port.onMessage.addListener(function (msg) {
                let UpdateTextNoteURL = "https://www.scholarscope.online/api/UpdateTextNote.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(UpdateTextNoteURL, {
                    method: 'POST',
                    body: JSON.stringify(msg),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        if (response.status == 402) {
                            chrome.tabs.create({
                                url: "https://pay.scholarscope.online/Subscription.php"
                            });
                        }
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "UpdateHighlight":
            port.onMessage.addListener(function (msg) {
                let UpdateHighlightURL = "https://highlight.scholarscope.online/api/UpdateHighlight.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(UpdateHighlightURL, {
                    method: 'POST',
                    body: JSON.stringify(msg),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        if (response.status == 402) {
                            chrome.tabs.create({
                                url: "https://pay.scholarscope.online/Subscription.php"
                            });
                        }
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "GetHighlight":
            port.onMessage.addListener(function (msg) {
                let UpdateHighlightURL = "https://highlight.scholarscope.online/api/GetHighlight.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(UpdateHighlightURL, {
                    method: 'POST',
                    body: JSON.stringify(msg),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "EmptyHighlight":
            port.onMessage.addListener(function (msg) {
                let UpdateHighlightURL = "https://highlight.scholarscope.online/api/EmptyHighlight.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(UpdateHighlightURL, {
                    method: 'POST',
                    body: JSON.stringify(msg),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "GetAssistantList":
            port.onMessage.addListener(function (msg) {
                let GetAssistantListURL = "https://api.scholarscope.online/GetAssistantList.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(GetAssistantListURL, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
        case "FetchAssistantData":
            port.onMessage.addListener(function (msg) {
                let FetchAssistantDataURL = "https://assistant.scholarscope.online/api/FetchAssistantData.php";
                let ReturnResults = {
                    "Status": 100,
                    "Results": ""
                };
                fetch(FetchAssistantDataURL, {
                    method: 'POST',
                    body: JSON.stringify(msg),
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                }).then(function (response) {
                    ReturnResults.Status = response.status;
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                }).then(function (json) {
                    ReturnResults.Results = json;
                    port.postMessage(ReturnResults);
                })
            });
            break;
    }
});

// Right Click
chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
        id: "Scholarscope_SearchPubmed",
        title: "Search in PubMed",
        contexts: ["selection"]
    });
})

chrome.contextMenus.onClicked.addListener(function (MenuInfo, tab) {
    if (MenuInfo.menuItemId == "Scholarscope_SearchPubmed") {
        chrome.tabs.create({
            url: "https://pubmed.ncbi.nlm.nih.gov/?term=" + encodeURIComponent(MenuInfo.selectionText),
        });
    }
});

// Show storage
chrome.storage.local.get(null, function (DatabaseResult) {
    let JSONtoString = JSON.stringify(DatabaseResult);
    let bytesCount = 0;
    for (let i = 0; i < JSONtoString.length; i++) {
        let c = JSONtoString.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
        {
            bytesCount += 1;
        } else {
            bytesCount += 2;
        }
    }
    let StorageMessageQueue = "StorageAlert";
    console.log("Total Storage: 100kB, Used: " + (Math.round(bytesCount * 100 / 1024) / 100) + "%");
    let AlertArray = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    if (AlertArray.includes(Math.round(bytesCount / 1024))) {
        let MessageQueueArray = DatabaseResult.MessageQueue;
        if (!MessageQueueArray.includes(StorageMessageQueue)) {
            MessageQueueArray.push(StorageMessageQueue);
            chrome.storage.local.set({
                "MessageQueue": MessageQueueArray
            });
        }
    }
});