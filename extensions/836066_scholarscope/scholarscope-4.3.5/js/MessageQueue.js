let port = chrome.runtime.connect({
    name: "GetMessageQueue"
});
port.postMessage({
    request: "Latest"
});

port.onMessage.addListener(function (msg) {
    if (msg.Message != "") {
        let MessageQueueFrame = document.createElement("div");
        with (MessageQueueFrame) {
            id = "Scholarscope_MessageQueueFrame";
        }
        let MessageQueueMain = document.createElement("div");
        with (MessageQueueMain) {
            id = "Scholarscope_MessageQueueMain";
        }
        let MessageQueueIcon = document.createElement("img");
        with (MessageQueueIcon) {
            id = "Scholarscope_MessageQueueIcon"
            src = chrome.runtime.getURL('images/informicon.png');
        }
        let MessageQueueText = document.createElement("div");
        with (MessageQueueText) {
            id = "Scholarscope_MessageQueueText"
            style.opacity = "1";
            if (msg.Message == "StorageAlert") {
                chrome.storage.local.get(null, function (database_result) {
                    let JSONtoString = JSON.stringify(database_result);
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
                    innerText = "云端空间总计100kB，已使用比例：" + (Math.round(bytesCount * 100 / 1024) / 100) + "%";
                });
            } else if (msg.Message == "Updated") {
                innerText = "Scholarscope 已更新到 " + version;
            } else {
                innerText = msg.Message;
            }
        }
        let MessageQueueButton = document.createElement("div");
        with (MessageQueueButton) {
            id = "Scholarscope_MessageQueueButton"
            innerText = "知道啦!"
        }
        MessageQueueButton.addEventListener("click", function () {
            chrome.storage.local.get("MessageQueue", function (result) {
                // 获得当前数据库中的MessageQueue
                let MessageQueueArray = result.MessageQueue;
                // 删除最新一条消息
                MessageQueueArray.pop();
                // 返回新的消息队列
                chrome.storage.local.set({
                    "MessageQueue": MessageQueueArray
                });
                // 更改页面
                MessageQueueFrame.style.height = "0px";
                MessageQueueText.style.opacity = "0";
                MessageQueueText.addEventListener("transitionend", function () {
                    port.postMessage({
                        request: "Latest"
                    });
                });

            })
        })
        // Append
        let bodyDIV = document.getElementsByTagName("body")[0];
        MessageQueueMain.appendChild(MessageQueueIcon);
        MessageQueueMain.appendChild(MessageQueueText);
        MessageQueueMain.appendChild(MessageQueueButton);
        MessageQueueFrame.appendChild(MessageQueueMain);
        bodyDIV.appendChild(MessageQueueFrame);
    } else if (URLPatternX.test(pubmed_current_url) || URLPatternY.test(pubmed_current_url)) {
        let MessageQueueFrame = document.createElement("div");
        with (MessageQueueFrame) {
            id = "Scholarscope_MessageQueueFrame";
        }
        let MessageQueueMain = document.createElement("div");
        with (MessageQueueMain) {
            id = "Scholarscope_MessageQueueMain";
        }
        let MessageQueueIcon = document.createElement("img");
        with (MessageQueueIcon) {
            id = "Scholarscope_MessageQueueIcon";
            src = chrome.runtime.getURL('images/informicon.png');
        }
        let MessageQueueText = document.createElement("div");
        with (MessageQueueText) {
            id = "Scholarscope_MessageQueueText";
            innerText = "正在使用 Scholarscope 提供的 PubMed 应急链接";
        }
        // Append
        let bodyDIV = document.getElementsByTagName("body")[0];
        MessageQueueMain.appendChild(MessageQueueIcon);
        MessageQueueMain.appendChild(MessageQueueText);
        MessageQueueFrame.appendChild(MessageQueueMain);
        bodyDIV.appendChild(MessageQueueFrame);
    } else if (msg.Message == "") {
        let GetMessageQueueFrame = document.getElementById("Scholarscope_MessageQueueFrame");
        if (GetMessageQueueFrame != undefined) {
            let bodyDIV = document.getElementsByTagName("body")[0];
            bodyDIV.removeChild(GetMessageQueueFrame);
        }
    }
})
