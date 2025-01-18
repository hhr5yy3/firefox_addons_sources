let currentAction = '';

const clearQuoteButton = document.getElementById('clearquote');
const clearAllButton = document.getElementById('clearAll');
const cancelButton = document.getElementById('cancelButton');
const confirmButton = document.getElementById('confirmButton');
const overlay = document.getElementById('overlay');
const confirmDialog = document.getElementById('confirmDialog');
const confirmMessage = document.getElementById('confirmMessage');
const successMessage = document.getElementById('successMessage');

clearQuoteButton.addEventListener('click', () => showConfirmDialog('quote'));
clearAllButton.addEventListener('click', () => showConfirmDialog('all'));
cancelButton.addEventListener('click', hideConfirmDialog);
confirmButton.addEventListener('click', confirmClear);

function showConfirmDialog(action) {
    currentAction = action;
    confirmMessage.textContent = action === 'quote'
        ? 'Вы уверены, что хотите очистить данные подборок?'
        : 'Вы уверены, что хотите очистить все данные?';
    overlay.style.display = 'block';
    confirmDialog.style.display = 'block';
}

function hideConfirmDialog() {
    console.log("hideConfirmDialog")
    overlay.style.display = 'none';
    confirmDialog.style.display = 'none';
}

async function confirmClear() {
    if ( currentAction === 'quote' ) {
       hideConfirmDialog()
       showSuccess('Данные подборок успешно очищены')
       return chrome.runtime.sendMessage({type: 'clear quote'})

    }
    hideConfirmDialog()
    await chrome.storage.local.clear()
    await chrome.runtime.sendMessage({type: 'clear quote'})
    showSuccess('Все данные успешно очищены')

}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function logError(msg) {
    const data = {
        title: "[Settings data error] " + msg,
        url: 'Settings page'
    };

    sendMessageToAddon("error", data);
}

async function parseUserAgent() {
    const ua = navigator.userAgent;
    let browserInfo, osInfo;
    if ( ua.includes('Chrome') ) {
        const match = ua.match(/Chrome\/(\d+\.\d+)/);
        browserInfo = match ? `Chrome ${match[1]}` : 'Chrome';

        // Проверяем, не другой ли это браузер на базе Chromium
        if ( ua.includes('Edg/') ) {
            const edgeMatch = ua.match(/Edg\/(\d+\.\d+)/);
            browserInfo = edgeMatch ? `Edge ${edgeMatch[1]}` : 'Edge';
        } else if ( ua.includes('OPR/') ) {
            const operaMatch = ua.match(/OPR\/(\d+\.\d+)/);
            browserInfo = operaMatch ? `Opera ${operaMatch[1]}` : 'Opera';
        }
    } else if ( ua.includes('Firefox') ) {
        const match = ua.match(/Firefox\/(\d+\.\d+)/);
        browserInfo = match ? `Firefox ${match[1]}` : 'Firefox';
    } else if ( ua.includes('Safari/') ) {
        const match = ua.match(/Version\/(\d+\.\d+).*Safari/);
        browserInfo = match ? `Safari ${match[1]}` : 'Safari';

        if ( ua.includes('Chrome') || ua.includes('Chromium') ) {
            browserInfo = 'Chrome';
        }
    } else {
        browserInfo = 'Неизвестный браузер';
    }
    if ( ua.includes('Windows') ) {
        try {
            if ( navigator.userAgentData ) {
                const platformInfo = await navigator.userAgentData.getHighEntropyValues(['platformVersion']);
                const majorVersion = parseInt(platformInfo.platformVersion.split('.')[0]);

                if ( majorVersion >= 13 ) {
                    osInfo = 'Windows 11';
                } else {
                    osInfo = 'Windows 10';
                }
            } else {
                // Fallback для старых браузеров
                const match = ua.match(/Windows NT (\d+\.\d+)/);
                const versions = {
                    '10.0': '10',
                    '6.3': '8.1',
                    '6.2': '8',
                    '6.1': '7',
                    '6.0': 'Vista'
                };
                const version = match ? versions[match[1]] || match[1] : '';
                osInfo = `Windows ${version}`;
            }
        } catch (e) {
            const match = ua.match(/Windows NT (\d+\.\d+)/);
            const versions = {
                '10.0': '10',
                '6.3': '8.1',
                '6.2': '8',
                '6.1': '7',
                '6.0': 'Vista'
            };
            const version = match ? versions[match[1]] || match[1] : '';
            osInfo = `Windows ${version}`;
        }
    } else if ( ua.includes('Mac OS X') ) {
        const match = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
        if ( match ) {
            const version = match[1].replace(/_/g, '.');
            osInfo = `macOS ${version}`;
        } else {
            osInfo = 'macOS';
        }
    } else if ( ua.includes('Linux') ) {
        osInfo = ua.includes('Android') ? 'Android' : 'Linux';
    } else {
        osInfo = 'Неизвестная ОС';
    }

    return {browserInfo, osInfo};
}
if ( chrome?.management?.getSelf ) {
    chrome.management.getSelf(async function (info) {
        try {
            document.getElementById('extensionVersion').textContent = info.version;

            // Форматируем дату последнего обновления
            const lastUpdateDate = new Date(info.installType === 'development' ? Date.now() : info.updateUrl ? info.lastUpdateTime : info.installTime);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            document.getElementById('lastUpdate').textContent = lastUpdateDate.toLocaleDateString('ru-RU', options);

        } catch (e) {
            console.log(e);
            return null;
        }
    });
}

function getExtensionInfo() {
    // Проверяем, какой API доступен
    if ( typeof chrome !== 'undefined' && chrome.management && chrome.management.getSelf ) {
        // Chrome API
        chrome.management.getSelf(function (info) {
            document.getElementById('extensionVersion').textContent = info.version;

            const lastUpdateDate = new Date(info.installType === 'development' ? Date.now() : info.updateUrl ? info.lastUpdateTime : info.installTime);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            document.getElementById('lastUpdate').textContent = lastUpdateDate.toLocaleDateString('ru-RU', options);
        });
    } else {
        const manifest = chrome.runtime.getManifest();
        document.getElementById('extensionVersion').textContent = manifest.version;
        document.getElementById('lastUpdate').textContent = 'Информация недоступна';
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    getExtensionInfo();

    const {browserInfo, osInfo} = await parseUserAgent();
    document.getElementById('browserInfo').textContent = browserInfo;
    document.getElementById('osInfo').textContent = osInfo;
});
