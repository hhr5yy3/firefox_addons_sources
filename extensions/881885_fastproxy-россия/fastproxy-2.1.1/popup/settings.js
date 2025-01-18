(() => {
    try {
        document.addEventListener('contextmenu', e => e.preventDefault())
    } catch {};
    function getElement(elem) {
        return document.getElementById(elem);
    }
    function isValidHost(domain) {
        if((domain.match(/\*/g) || []).length == 1 && (domain.match(/\./g) || []).length == 1)
            return false;
        if(typeof domain !== 'string')
            return false;
        let parts = domain.split('.');
        if(parts.length <= 1)
            return false;
        let tld = parts.pop();
        let tldRegex = /^[a-zA-Z0-9-]+$/gi;
        if(!tldRegex.test(tld))
            return false;
        let isValid = parts.every(host => {
            let hostRegex = /^(?!:\/\/)([a-zA-Z0-9\*]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$/gi;
            return hostRegex.test(host);
        })
        return isValid
    }
    function checkArray(elem) {
        return elem == false;
    }
    function setStorage(key) {
        return new Promise(resolve => {
            browser.storage.local.set(key, resolve)
        })
    }
    function getStorage(key) {
        return new Promise(resolve => {
            browser.storage.local.get(key, resolve)
        })
    }
    function debug() {
        let storage = browser.storage.local.get('uid');
        storage.then(value => {
            getElement('uid').innerText = value.uid;
        })
        getElement('ver').innerText = browser.runtime.getManifest().version;
    }
    async function items() {
        const domainsList = await getStorage(['noProxyDomains', 'onlyProxyDomains', 'addProxyDomains']);
        $('#noProxyDomains').tagEditor({
            initialTags: domainsList.noProxyDomains,
            placeholder: '*.domain.com',
            onChange: function(field, editor, tags) {
                let domains = [];
                for(let i = 0; i < tags.length; i++) {
                    if(isValidHost(tags[i])) {
                        domains.push(tags[i]);
                    } else {
                        showMessage('Неправильный формат домена', '#ff0000');
                        $('#noProxyDomains').tagEditor('removeTag', tags[i]);
                    }
                }
            }
        })
        $('#onlyProxyDomains').tagEditor({
            initialTags: domainsList.onlyProxyDomains,
            placeholder: '*.domain.com',
            onChange: function(field, editor, tags) {
                let domains = [];
                for(let i = 0; i < tags.length; i++) {
                    if(isValidHost(tags[i])) {
                        domains.push(tags[i]);
                    } else {
                        showMessage('Неправильный формат домена', '#ff0000');
                        $('#onlyProxyDomains').tagEditor('removeTag', tags[i]);
                    }
                }
            }
        })
        $('#addProxyDomains').tagEditor({
            initialTags: domainsList.addProxyDomains,
            placeholder: '*.domain.com',
            onChange: function(field, editor, tags) {
                let domains = [];
                for(let i = 0; i < tags.length; i++) {
                    if(isValidHost(tags[i])) {
                        domains.push(tags[i]);
                    } else {
                        showMessage('Неправильный формат домена', '#ff0000');
                        $('#addProxyDomains').tagEditor('removeTag', tags[i]);
                    }
                }
            }
        })
    }
    function showMessage(msg, color) {
        const message = getElement('message'),
            container = getElement('msgContainer');
        message.parentNode.removeChild(message);
        container.appendChild(message);
        message.style.color = color;
        message.innerText = msg;
        message.style.display = 'table';
    }
    function change(box, elem) {
        box.addEventListener('change', () => {
            box.id == 'userProxy' && (
                box.checked ? elem.style.display = 'block' : elem.style.display = 'none'
            )
        })
    }
    function resize(elem) {
        let boxes = document.querySelectorAll("input[type='checkbox']");
        boxes.forEach(box => {
            box.addEventListener('change', () => {
                elem.style.height = '99%'
                elem.style.height = '100%'
            })
        })
    }
    async function currentState() {
        const proxyMenu = getElement('proxyMenu'),
            userProxy = getElement('userProxy'),
            host = getElement('host'),
            port = getElement('port'),
            type = getElement('dropProxy'),
            icon = getElement('displayIcon'),
            userDomains = getElement('userDomains'),
            noProxy = getElement('noProxy'),
            onlyProxy = getElement('onlyProxy'),
            addProxy = getElement('addProxy'),
            allProxy = getElement('allProxy');
        const result = await getStorage(['icon', 'user_proxy', 'user_proxy_type', 'user_proxy_http', 'user_proxy_port', 'userDomains', 'noProxy', 'onlyProxy', 'addProxy', 'allProxy', 'onlyProxyDomains']);
        if(result.icon == true) {
            icon.checked = true;
        } else {
            icon.checked = false;
        }
        if(result.user_proxy == true) {
            userProxy.checked = true;
            proxyMenu.style.display = 'block';
            type.value = result.user_proxy_type;
            host.value = result.user_proxy_http;
            port.value = result.user_proxy_port;
        } else {
            userProxy.checked = false;
            proxyMenu.style.display = 'none';
        }
        if(result.noProxy == true) {
            noProxy.checked = true;
        } else {
            noProxy.checked = false;
        }
        if(result.onlyProxy) {
            if(result.onlyProxyDomains.length == 0) {
                onlyProxy.checked = false;
            } else {
                onlyProxy.checked = true;
            }
        } else {
            onlyProxy.checked = false;
        }
        if(result.addProxy == true) {
            addProxy.checked = true;
        } else {
            addProxy.checked = false;
        }
        if(result.allProxy == true) {
            allProxy.checked = true;
        } else {
            allProxy.checked = false;
        }
        if(result.userDomains == true) {
            userDomains.checked = true;
        } else {
            userDomains.checked = false;
            noProxy.checked = false;
            onlyProxy.checked = false;
            addProxy.checked = false;
            allProxy.checked = false;
        }
    }
    async function apply() {
        const message = getElement('message'),
            save = getElement('saveSettings'),
            notSave = getElement('notSaveSettings'),
            proxyMenu = getElement('proxyMenu'),
            type = getElement('dropProxy'),
            host = getElement('host'),
            port = getElement('port'),
            opt = getElement('opt'),
            main = getElement('main'),
            icon = getElement('displayIcon'),
            userProxy = getElement('userProxy'),
            domainsMenu = getElement('domainsMenu'),
            noProxy = getElement('noProxy'),
            onlyProxy = getElement('onlyProxy'),
            addProxy = getElement('addProxy'),
            allProxy = getElement('allProxy');
        let success = false;
        save.onclick = (async() => {
            const result = await getStorage(['icon', 'user_proxy', 'userDomains', 'noProxyDomains', 'onlyProxyDomains', 'addProxyDomains']);
            if(icon.checked) {
                setStorage({
                    icon: true
                });
                success = true;
            } else {
                setStorage({
                    icon: false
                });
                success = true;
            }
            if(userProxy.checked) {
                if(host.value && host.value.length > 6 && port.value && port.value.length > 0) {
                    setStorage({
                        user_proxy: true,
                        user_proxy_type: type.value,
                        user_proxy_http: host.value,
                        user_proxy_port: port.value
                    })
                    success = true;
                } else {
                    setStorage({
                        user_proxy: false,
                        onlyProxy: false,
                        addProxy: false,
                        allProxy: false
                    });
                    showMessage('Неправильный формат прокси', '#ff0000');
                    browser.runtime.sendMessage({
                        a: 'e'
                    });
                    return;
                }
            } else {
                setStorage({
                    user_proxy: false
                })
                success = true;
            }
            if(userDomains.checked) {
                if(!noProxy.checked && !onlyProxy.checked && !addProxy.checked && !allProxy.checked) {
                    showMessage('Необходимо выбрать хотя бы одну из опций', '#ff0000');
                    setStorage({
                        userDomains: false,
                        noProxy: false,
                        onlyProxy: false,
                        addProxy: false,
                        allProxy: false
                    });
                    browser.runtime.sendMessage({
                        a: 'e'
                    });
                    return;
                }
                if(allProxy.checked && (onlyProxy.checked || addProxy.checked)) {
                    showMessage('Выбранные опции нельзя использовать вместе', '#ff0000');
                    if(!userProxy.checked) {
                        setStorage({
                            allProxy: false
                        });
                    }
                    browser.runtime.sendMessage({
                        a: 'e'
                    });
                    return;
                }
                if(onlyProxy.checked && addProxy.checked) {
                    showMessage('Выбранные опции нельзя использовать вместе', '#ff0000');
                    if(!userProxy.checked) {
                        setStorage({
                            onlyProxy: false,
                            allProxy: false
                        });
                    }
                    let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                    if(Object.values(options).every(checkArray)) {
                        setStorage({
                            userDomains: false
                        });
                    }
                    browser.runtime.sendMessage({
                        a: 'e'
                    });
                    return;
                }
                if(noProxy.checked && onlyProxy.checked) {
                    showMessage('Выбранные опции нельзя использовать вместе', '#ff0000');
                    if(!userProxy.checked) {
                        setStorage({
                            allProxy: false
                        });
                    }
                    browser.runtime.sendMessage({
                        a: 'e'
                    });
                    return;
                }
                if(noProxy.checked && allProxy.checked) {
                    if(userProxy.checked) {
                        const domains = await getStorage('noProxyDomains');
                        if($('#noProxyDomains').tagEditor('getTags')[0].tags.length == 0) {
                            showMessage('Список доменов не должен быть пустым', '#ff0000');
                            setStorage({
                                noProxy: false
                            });
                            browser.runtime.sendMessage({
                                a: 'e'
                            });
                            return;
                        }
                        setStorage({
                            noProxy: true,
                            allProxy: true,
                            addProxy: false,
                            onlyProxy: false,
                            noProxyDomains: $('#noProxyDomains').tagEditor('getTags')[0].tags
                        });
                        success = true;
                    } else {
                        showMessage('Опция доступна только со своими прокси', '#ff0000');
                        setStorage({
                            allProxy: false
                        });
                        browser.runtime.sendMessage({
                            a: 'e'
                        });
                        return;
                    }
                } else if(noProxy.checked && addProxy.checked) {
                    if(userProxy.checked) {
                        const domains = await getStorage(['noProxyDomains', 'addProxyDomains']);
                        if($('#noProxyDomains').tagEditor('getTags')[0].tags.length == 0) {
                            showMessage('Список доменов не должен быть пустым', '#ff0000');
                            setStorage({
                                noProxy: false,
                                allProxy: false
                            });
                            let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                            if(Object.values(options).every(checkArray)) {
                                setStorage({
                                    userDomains: false
                                });
                            }
                            browser.runtime.sendMessage({
                                a: 'e'
                            });
                            return;
                        }
                        if($('#addProxyDomains').tagEditor('getTags')[0].tags.length == 0) {
                            showMessage('Список доменов не должен быть пустым', '#ff0000');
                            setStorage({
                                noProxy: false,
                                addProxy: false,
                                allProxy: false
                            });
                            browser.runtime.sendMessage({
                                a: 'e'
                            });
                            return;
                        }
                        setStorage({
                            noProxy: true,
                            onlyProxy: false,
                            addProxy: true,
                            allProxy: false,
                            noProxyDomains: $('#noProxyDomains').tagEditor('getTags')[0].tags,
                            addProxyDomains: $('#addProxyDomains').tagEditor('getTags')[0].tags
                        });
                        success = true;
                    } else {
                        showMessage('Опция доступна только со своими прокси', '#ff0000');
                        setStorage({
                            addProxy: false
                        });
                        browser.runtime.sendMessage({
                            a: 'e'
                        });
                        return;
                    }
                } else if(noProxy.checked) {
                    const domains = await getStorage('noProxyDomains');
                    if($('#noProxyDomains').tagEditor('getTags')[0].tags.length == 0) {
                        showMessage('Список доменов не должен быть пустым', '#ff0000');
                        setStorage({
                            noProxy: false,
                            userDomains: false
                        });
                        browser.runtime.sendMessage({
                            a: 'e'
                        });
                        return;
                    }
                    setStorage({
                        noProxy: true,
                        onlyProxy: false,
                        addProxy: false,
                        allProxy: false,
                        noProxyDomains: $('#noProxyDomains').tagEditor('getTags')[0].tags
                    });
                    success = true;
                } else if(onlyProxy.checked) {
                    if(userProxy.checked) {
                        const domains = await getStorage('onlyProxyDomains');
                        if($('#onlyProxyDomains').tagEditor('getTags')[0].tags.length == 0) {
                            showMessage('Список доменов не должен быть пустым', '#ff0000');
                            setStorage({
                                noProxy: false,
                                onlyProxy: false,
                                addProxy: false,
                                allProxy: false
                            });
                            let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                            if(Object.values(options).every(checkArray)) {
                                setStorage({
                                    userDomains: false
                                });
                            }
                            browser.runtime.sendMessage({
                                a: 'e'
                            });
                            return;
                        }
                        setStorage({
                            onlyProxy: true,
                            noProxy: false,
                            addProxy: false,
                            allProxy: false,
                            onlyProxyDomains: $('#onlyProxyDomains').tagEditor('getTags')[0].tags
                        });
                        success = true;
                    } else {
                        showMessage('Опция доступна только со своими прокси', '#ff0000');
                        setStorage({
                            onlyProxy: false
                        });
                        let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                        if(Object.values(options).every(checkArray)) {
                            setStorage({
                                userDomains: false
                            });
                        }
                        browser.runtime.sendMessage({
                            a: 'e'
                        });
                        return;
                    }
                } else if(addProxy.checked) {
                    if(userProxy.checked) {
                        const domains = await getStorage('addProxyDomains');
                        if($('#addProxyDomains').tagEditor('getTags')[0].tags.length == 0) {
                            showMessage('Список доменов не должен быть пустым', '#ff0000');
                            setStorage({
                                noProxy: false,
                                onlyProxy: false,
                                addProxy: false,
                                allProxy: false
                            });
                            let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                            if(Object.values(options).every(checkArray)) {
                                setStorage({
                                    userDomains: false
                                });
                            }
                            browser.runtime.sendMessage({
                                a: 'e'
                            });
                            return;
                        }
                        setStorage({
                            addProxy: true,
                            noProxy: false,
                            onlyProxy: false,
                            allProxy: false,
                            addProxyDomains: $('#addProxyDomains').tagEditor('getTags')[0].tags
                        });
                        success = true;
                    } else {
                        showMessage('Опция доступна только со своими прокси', '#ff0000');
                        setStorage({
                            addProxy: false
                        });
                        let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                        if(Object.values(options).every(checkArray)) {
                            setStorage({
                                userDomains: false
                            });
                        }
                        success = false;
                        browser.runtime.sendMessage({
                            a: 'e'
                        });
                        return;
                    }
                } else if(allProxy.checked) {
                    if(userProxy.checked) {
                        setStorage({
                            allProxy: true,
                            noProxy: false,
                            onlyProxy: false,
                            addProxy: false
                        });
                        success = true;
                    } else {
                        showMessage('Опция доступна только со своими прокси', '#ff0000');
                        setStorage({
                            allProxy: false
                        });
                        let options = await getStorage(['noProxy', 'onlyProxy', 'addProxy', 'allProxy']);
                        if(Object.values(options).every(checkArray)) {
                            setStorage({
                                userDomains: false
                            });
                        }
                        browser.runtime.sendMessage({
                            a: 'e'
                        });
                        return;
                    }
                }
                setStorage({
                    userDomains: true
                });
            } else {
                setStorage({
                    userDomains: false,
                    noProxy: false,
                    onlyProxy: false,
                    addProxy: false,
                    allProxy: false
                });
                currentState();
                success = true;
            }
            if(success) {
                browser.runtime.sendMessage({
                    a: 'e'
                });
                showMessage('Настройки успешно сохранены', '#15d215');
            }
        })
        notSave.onclick = (async() => {
            const result = await getStorage(['icon', 'user_proxy', 'userDomains', 'noProxyDomains', 'onlyProxyDomains', 'addProxyDomains']);
            message.style.display = 'none';
            currentState();
            if(result.icon == true) {
                icon.checked = true;
            } else {
                icon.checked = false;
            }
            if(result.user_proxy == true) {
                userProxy.checked = true;
            } else {
                userProxy.checked = false;
            }
            opt.style.display = 'none';
            main.style.display = 'block';
            function restoreTags(container, storage) {
                if(storage && storage.length > 0) {
                    let tags;
                    tags = $(container).tagEditor('getTags')[0].tags;
                    for(i = 0; i < tags.length; i++) {
                        $(container).tagEditor('removeTag', tags[i], true);
                    }
                    tags = storage;
                    for(let i = 0; i < tags.length; i++) {
                        $(container).tagEditor('addTag', tags[i], true);
                    }
                } else {
                    let tags = $(container).tagEditor('getTags')[0].tags;
                    for(i = 0; i < tags.length; i++) {
                        $(container).tagEditor('removeTag', tags[i], true);
                    }
                }
            }
            restoreTags('#noProxyDomains', result.noProxyDomains);
            restoreTags('#onlyProxyDomains', result.onlyProxyDomains);
            restoreTags('#addProxyDomains', result.addProxyDomains);
        })
    }
    currentState();
    change(getElement('userProxy'), getElement('proxyMenu'));
    resize(document.documentElement);
    apply();
    debug();
    items();
})()