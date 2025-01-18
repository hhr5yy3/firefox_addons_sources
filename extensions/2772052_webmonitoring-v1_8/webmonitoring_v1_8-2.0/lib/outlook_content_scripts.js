/**
 * HTMLコンテンツからメール内容を取得します。
 * @param {Object} request リクエスト
 * @returns メール内容（JSON形式）
 */
export function getMailContent(request)
{
    const URLs = [
        "https://outlook.live.com",
        "https://outlook.office.com",
        "https://outlook.office365.com"
    ];

    var isOutlook = false;
    for (var url of URLs) {
        if (document.URL.startsWith(url)) {
            isOutlook = true;
            break;
        }
    }
    if (!isOutlook) {
        var emptyArray = [];
        var response = {
            Action: request.Action,
            Type: '__DTK_GetAttachmentResponse',
            URL: document.URL,
            RequestId: request.RequestId,
            WindowId: request.WindowId,
            TabId: request.TabId,
            MailId: request.MailId,
            Operation: request.Operation,
            Subject: "",
            Attachments: emptyArray,
            LinkAttachments: emptyArray
        };
        return response;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 編集エリアの要素の取得
    // <div 'id=docking_InitVisiblePart_nn'...>
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    var docking_InitVisiblePart = null; // 編集エリア
    {
        var divs = document.getElementsByTagName('div');
        for (var div of divs) {
            if (div.hasAttribute('id') && div.getAttribute('id').startsWith('docking_InitVisiblePart_')) {
                // docking_InitVisiblePart検出!!
                docking_InitVisiblePart = div;
                break;
            }
        }
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 件名要素の取得
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    var subject = "";
    {
        const ariaLabels = [
            '件名を追加',       // 日本語
            'Add a subject',    // 英語(US)
            '添加主题',         // 中文(中国)、中文(台湾)、中文(澳门特别行政区)、中文(新加坡)
            '新增主旨'          // 中文(香港特別行政区)、中文(香港特別行政區)、中文(澳门特别行政區)
        ];
        if (docking_InitVisiblePart != null) {
            var inputs = docking_InitVisiblePart.getElementsByTagName('input');
            var subject = "";
            for (var input of inputs) {
                if (input.hasAttribute('aria-label')) {
                    var ariaLabel = input.getAttribute('aria-label');
                    if (ariaLabels.includes(ariaLabel)) {
                        if (input.hasAttribute('value')) {
                            inputs = null;
                            subject = input.getAttribute('value');
                            break;
                        }
                    }
                }
            }
            inputs = null;
        }
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 添付ファイル要素の取得
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    var attachments = null;
    {
        const ariaLabels = [
            '添付ファイル',     // 日本語
            'attachments',      // 英語(US)
            '附件'              // 中文(中国)、中文(台湾)、中文(香港特別行政区)、中文(澳门特别行政区)、
                                // 中文(香港特別行政區)、中文(澳门特别行政區)、中文(新加坡)
        ];
        if (docking_InitVisiblePart != null) {
            var divs = docking_InitVisiblePart.getElementsByTagName('div');
            for (var div of divs) {
                if (div.hasAttribute('aria-label')) {
                    var ariaLabel = div.getAttribute('aria-label');
                    if (ariaLabels.includes(ariaLabel)) {
                        attachments = div;
                        break;
                    }
                }
            }
            divs = null;
        }
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 添付ファイル名リストの取得
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    var fileNames = [];
    {
        if (attachments != null) {
            var divs = attachments.getElementsByTagName('div');
            for (var div of divs) {
                if (div.hasAttribute('title')) {
                    // 子要素が存在しない場合
                    if (div.children.length === 0) {
                        var children = div.childNodes;
                        // 子ノードとしてテキストノードが１つだけ存在する場合
                        if ((children.length === 1) && (children[0].nodeName === '#text')) {
                            var fileName = children[0].nodeValue;
                            fileName = fileName.replace("\r", "");
                            fileName = fileName.replace("\n", "");
                            fileNames.push(fileName.trim());
                            continue;
                        }
                    }
                }
            }
            divs = null;
        }
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // リンク添付ファイル名リストの取得
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    var linkFileNames = [];
    {
        var editorParent = null;
        if (docking_InitVisiblePart != null) {
            var divs = docking_InitVisiblePart.getElementsByTagName('div');
            for (var div of divs) {
                if (div.hasAttribute('id') && div.getAttribute('id').startsWith('editorParent_')) {
                    editorParent = div;
                    break;
                }
            }
            divs = null;
            if (editorParent != null) {
                var images = editorParent.getElementsByTagName('img');
                for (var image of images) {
                    if ((image.hasAttribute('src') && image.getAttribute('src').includes('mail/file-icon')) &&
                        (image.hasAttribute('role') && (image.getAttribute('role') == 'presentation'))) {
                        var fileName = image.parentElement.textContent;
                        fileName = fileName.replace("\r", "");
                        fileName = fileName.replace("\n", "");
                        linkFileNames.push(fileName.trim());
                        continue;
                    }
                }
                images = null;
            }
        }
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 応答データの生成
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

//#11377 20230217 ADD S
    var hasDockingInitVisiblePart = false;
    if (docking_InitVisiblePart) {
        hasDockingInitVisiblePart = true;
    }
//#11377 20230217 ADD E

    var response = {
        Action: request.Action,
        Type: '__DTK_GetAttachmentResponse',
        URL: document.URL,
        RequestId: request.RequestId,
        WindowId: request.WindowId,
        TabId: request.TabId,
        MailId: request.MailId,
        Operation: request.Operation,
        Subject: subject,
        Attachments: fileNames,
//#11377 20230217 CHG S
//      LinkAttachments: linkFileNames
        LinkAttachments: linkFileNames,
        HasDockingInitVisiblePart: hasDockingInitVisiblePart
//#11377 20230217 CHG E
    };

    return response;
}
