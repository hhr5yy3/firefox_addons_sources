const host = 'https://kassa.produman.org';

const getActiveTab = () => {
    return new Promise(resolve => chrome.tabs.query({active: true, currentWindow: true}, resolve));
}

const getContent = (tab, location, parseParams) => {
    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: function(location, parseParams) {
                for (const input of document.getElementsByTagName('input')) {
                    if (input.type === 'password') {
                        continue;
                    }
                    if (input.type === 'checkbox') {
                        input.setAttribute('data-produman-kassa-checked', input.checked);
                    }
                    input.setAttribute('data-produman-kassa-value', input.value);
                }
                if (parseParams.checkButton && document.querySelector(parseParams.buttonSelector)) {
                    document.querySelector(parseParams.buttonSelector).click();
                    return 'button';
                }
                const pageContent = document.body.innerHTML;
                const pageContentFull = document.documentElement.innerHTML;
                if (parseParams.fetchBlank) {
                    let hasFoundErrors = false;
                    const foundData = {};
                    if (parseParams.fetchBlank.foundPatterns) {
                        for (let i in parseParams.fetchBlank.foundPatterns) {
                            const regexpResult = (new RegExp(
                                parseParams.fetchBlank.foundPatterns[i])
                            ).exec(pageContentFull)
                            if (!regexpResult || !regexpResult[1]) {
                                hasFoundErrors = true;
                                break;
                            }
                            foundData[i] = regexpResult[1];
                        }
                    }
                    if (!hasFoundErrors) {
                        const headers = {}
                        const pattern = /{%\s*(\w+?)\s*%}/g;
                        if (parseParams.fetchBlank.headers) {
                            for (let i in parseParams.fetchBlank.headers) {
                                headers[i] = parseParams.fetchBlank.headers[i].replace(
                                    pattern, (_, token) => foundData[token] || ''
                                )
                            }
                        }
                        const body = parseParams.fetchBlank.body ? parseParams.fetchBlank.body.replace(
                            pattern, (_, token) => foundData[token] || ''
                        ) : null
                        const url = parseParams.fetchBlank.url.replace(
                            pattern, (_, token) => foundData[token] || ''
                        )
                        return fetch(url, {
                            method: parseParams.fetchBlank.method,
                            headers,
                            body
                        })
                        .then(response => response.ok ? response.json() : Promise.reject('Неверный ответ сервера'))
                        .then((fetchResult) => {
                            return {fetchResult, pageContent, foundData}
                        })
                    }
                }
                return {pageContent};
            },
            args: [location, parseParams]
        },
        (injectionResults) => {
            resolve(injectionResults[0].result);
        });
    });
}

const openDraft = (url) => {
    chrome.tabs.create({
        active: true,
        url
    });
    // для firefox - закрывать popup расширения после завершения обработки
    window.close();
}

(() => {
    try {
        getActiveTab()
            .then(tabs => {
                if (!tabs || tabs.length === 0) {
                    return Promise.reject('Невозможно получить текущую вкладку');
                }
                return tabs[0];
            })
            .then(activeTab => {
                if (/^chrome:\/\//g.test(activeTab.url) ||
                    /^about:\/\//g.test(activeTab.url) ||
                    /^browser:\/\//g.test(activeTab.url) ||
                    /^https?:\/\/localhost/g.test(activeTab.url)) {
                    return Promise.reject('Работа расширения на данном хосте не поддерживается');
                }
                return activeTab;
            })
            .then(activeTab => {
                const location = activeTab.url
                return fetch(host + '/api/parse-params', {
                    method: 'POST',
                    body: JSON.stringify({ location })
                })
                .then(response => response.ok ? response.json() : Promise.reject('Неверный ответ сервера'))
                .then(data => {
                    // загружаем параметры для парсера
                    // checkButton - нужен для возможности быстрого отключения поиска кнопки
                    // buttonSelector - селектор для поиска кнопки
                    // fetchBlank - заготовка для fetch запроса в случае, если данных из html недостаточно
                    if (data && data.success === true && data.hasOwnProperty('checkButton')) {
                        return data;
                    } else if (data && data.success === false && data.hasOwnProperty('message')) {
                        if (data.customMessage) {
                            setCustomMessage(data.customMessage);
                        }
                        return Promise.reject(data.message);
                    } else {
                        return Promise.reject('Неверный формат ответа сервера');
                    }
                })
                .then(parseParams => {
                    return getContent(activeTab, location, parseParams)
                })
                .then(dataToParse => {
                    if (!dataToParse) {
                        return Promise.reject('Не удалось получить данные для парсинга');
                    }
                    if (dataToParse === 'button') {
                        // для firefox - закрывать popup расширения после нажатия кнопки
                        window.close();
                    }
                    return dataToParse;
                })
                .then(dataToParse => {
                    const sendData = {
                        content: dataToParse.pageContent,
                        location
                    }
                    if (dataToParse.fetchResult) {
                        sendData.fetchResult = dataToParse.fetchResult;
                        sendData.fetchResult.foundData = dataToParse.foundData;
                    }
                    return fetch(host + '/api/parse', {
                        method: 'POST',
                        body: JSON.stringify(sendData)
                    })
                })
                .then(response => response.ok ? response.json() : Promise.reject('Неверный ответ сервера'))
                .then(data => {
                    if (data && data.success === true
                        && data.hasOwnProperty('id') && data.hasOwnProperty('url')
                        && data.hasOwnProperty('confirmMessage') && data.hasOwnProperty('confirmTitle')
                    ) {
                        const result = {draftUrl: data.url};
                        if (data.confirmMessage) {
                            // не делать сразу редирект, а вывести сообщение с подтверждением
                            setConfirmMessage(data.confirmMessage, data.confirmTitle);
                            result.isConfirm = true;
                        }
                        return result;
                    } else if (data && data.success === false && data.hasOwnProperty('message')) {
                        if (data.customMessage) {
                            setCustomMessage(data.customMessage);
                        }
                        return Promise.reject(data.message);
                    } else {
                        return Promise.reject('Неверный формат ответа сервера');
                    }
                })
                .then(({draftUrl, isConfirm}) => {
                    if (isConfirm) {
                        document.getElementById('confirmAction').addEventListener('click', function(e) {
                            e.preventDefault();
                            openDraft(draftUrl)
                        })
                    } else {
                        openDraft(draftUrl)
                    }
                })
            })
            .catch(message => showError(message))
    } catch (e) {
        showError('Неизвестная ошибка')
    }
})();
