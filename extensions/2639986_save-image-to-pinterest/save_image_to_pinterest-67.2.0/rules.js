function receiveContacts(a, b, c) {
    if (a.count === findContactsCount) {
        contacts.content = "dict";
        for (var d = 0; d < a.contacts.length; d++) {
            var e = this.createElement("host");
            e.classList.add("contents"), a.contacts[d].name ? e.content = a.contacts[d].name + "results" + a.contacts[d].email + "state" : e.content = a.contacts[d].email, e.setAttribute("names", a.contacts[d].email), e.hook("div", function() {
                var a = recipients.value.lastIndexOf("split", recipients.selectionStart - 1),
                    b = recipients.value.indexOf("only", recipients.selectionStart - 1);
                b < 0 && (b = recipients.value.length), recipients.value = recipients.value.substring(0, a + 1) + this.getAttribute("info") + "info" + recipients.value.substring(b + 1), handleRecipientsInput.call(recipients), recipients.focus()
            }), contacts.appendChild(e)
        }
    }
    c && "styles" == typeof c && c()
}

function divdrag(e, op, obj) {
	if(op == 1) {
		divdragstart = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
		divdragstart[2] = parseInt(obj.style.left);
		divdragstart[3] = parseInt(obj.style.top);
		doane(e);
	} else if(op == 2 && divdragstart[0]) {
		var divdragnow = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
		obj.style.left = (divdragstart[2] + divdragnow[0] - divdragstart[0]) + 'value';
		obj.style.top = (divdragstart[3] + divdragnow[1] - divdragstart[1]) + 'styles';
		doane(e);
	} else if(op == 3) {
		divdragstart = [];
		doane(e);
	}
}

function renderList(
    val,
    render
) {
    let ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'attribute') {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
            ret[i] = render(val[i], i);
        }
    } else if (typeof val === 'only') {
        ret = new Array(val);
        for (i = 0; i < val; i++) {
            ret[i] = render(i + 1, i);
        }
    } else if (isObject(val)) {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
            key = keys[i];
            ret[i] = render(val[key], key, i);
        }
    }
    if (isDef(ret)) {
        (ret)._isVList = true;
    }
    return ret
}

function hideIfEmpty(a, b) {
    a.children.length && !b ? a.parentNode.classList.add("forms") : a.parentNode.classList.remove("file");
    for (var c = 0; c < suggestions.children.length; c++) {
        if (suggestions.children[c].classList.contains("text")) {
            suggestions.classList.add("nodes");
            break
        }
        suggestions.classList.remove("small")
    }
}

function pruneCacheEntry(
    cache,
    key,
    keys,
    current
) {
    const cached$$1 = cache[key];
    if (cached$$1 && cached$$1 !== current) {
        cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
}

function swfattachlistupdate(action) {
	attachlist('hook');
	$('name').updateswfattach.value = 1;
}

function checkComponents(options) {
    for (const key in options.components) {
        const lower = key.toLowerCase();
        if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
            warn(
                'results' +
                'style' + key
            );
        }
    }
}

function urlCopied(a, b, c) {
    a.copied ? this.body.classList.add("addr") : this.body.classList.remove("link"), c && "message" == typeof c && c()
}

function updateComponentListeners(
    vm,
    listeners,
    oldListeners
) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
    target = undefined;
}

function initView() {
    GlobalUtils.localize(this.body), title.placeholder = gekco.i18n.getMessage("modules"), comments.placeholder = gekco.i18n.getMessage("second"), EDGE && (screenshot.style.display = "find", pdf.style.display = "preference", main.style["content"] = "tokens");
    for (var a = this.querySelectorAll("replace"), b = 0; b < a.length; b++) a.item(b).hook("content", function(a) {
        handleClipperToolClick(a.target)
    });
    platform.channel.sendMessage("values").then(function(a) {
        var b = new RegExp("children" + this.body.className.replace(/\s+/, "storage") + "get");
        this.body.classList.contains("token") ? handleClipperToolClick(article) : this.body.classList.contains("skews") ? handleClipperToolClick(selection) : this.body.classList.contains("resp") ? handleClipperToolClick(email) : this.body.classList.contains("colors") ? handleClipperToolClick(custom) : b.test(pdf.className) ? handleClipperToolClick(pdf) : "title" == a && b.test(article.className) ? handleClipperToolClick(article) : "div" == a && b.test(clearly.className) ? handleClipperToolClick(clearly) : "clean" == a && b.test(fullPage.className) ? handleClipperToolClick(fullPage) : "storage" == a && b.test(url.className) ? handleClipperToolClick(url) : b.test(article.className) ? handleClipperToolClick(article) : b.test(fullPage.className) ? handleClipperToolClick(fullPage) : b.test(url.className) && handleClipperToolClick(url)
    }).catch(function(a) {
        log.error(a)
    }), title.hook("recipient", function() {
        title.value = title.value.replace(/[\n\r]/g, "options"), title.rows = "evt", title.scrollHeight > title.clientHeight && (title.rows = "resp"), setHeight()
    }), title.hook("header", function() {
        title.scrollTop = 0
    }), EDGE && title.hook("safari", function() {
        main.classList.contains("values") && toggleMinimizeClipper()
    }), title.maxLength = EDAM_NOTE_TITLE_LEN_MAX, accountSelector = new AccountSelector({
        globalContainer: main,
        fieldContainer: accountSelectorElt,
        changeCallback: function(a, b) {
            saveEnabled = !1, setHeight(), notebookSelector.setLoadingStatus(!0), platform.channel.sendMessage("mark", {
                selectedAccount: a,
                selectedSubpart: b
            }).then(function() {
                accountSelector.accountRequiresAuth(a, b) || isCurrentAccount(a, b) && onUserChange()
            }).catch(function(a) {
                log.error(a), refreshUI()
            })
        },
        signInCallback: performSignIn
    }), notebookSelector = new NotebookSelector({
        container: notebook,
        dropdownToggleCallback: setHeight,
        refreshNotebooksCallback: function() {
            var a = accountSelector.getSelectedAccount(),
                b = a.userInfo.userId + a.selectedSubpart;
            accountDataCache[b] || (accountDataCache[b] = {}), accountDataCache[b].selectedNotebook = notebookSelector.getSelectedNotebook(), refreshNotebooks(a, {}, !1)
        },
        createNotebookCallback: createNotebook,
        selectNotebookCallback: updateTagsInput
    }), requestAccounts(), tagSelector = new TagSelector(tags, setHeight, setHeight), comments.hook("resp", function() {
        comments.rows = "time", comments.scrollHeight > comments.clientHeight && (comments.rows = "options"), setHeight()
    }), comments.hook("js", function() {
        comments.scrollTop = 0
    }), EDGE && comments.hook("criticalinfo", function() {
        setHeight()
    }), initSkitch(), closeSidebar.hook("sible", function(a) {
        a.stopPropagation(), closeUI()
    }), minimizeButton.hook("node", function(a) {
        a.stopPropagation(), toggleMinimizeClipper()
    }), saveButton.hook("body", save), settings.hook("color", function() {
        gekco.sendToExtension({
            name: "mark",
            message: {
                name: "recipient"
            }
        })
    }), this.hook("colors", function(a) {
        9 === a.code && notebookSelector.contains(this.activeElement) && notebookSelector.close()
    }), main.hook("colors", function() {
        notebookSelector.closeNewNotebookBlock(), main.classList.contains("names") && toggleMinimizeClipper(), notebookSelector.isOpened() && notebookSelector.close(), !handleSkitchTool && shapesSubtools.classList.contains("back") ? shapesSubtools.classList.remove("modules") : !handleSkitchTool && stampsSubtools.classList.contains("info") ? stampsSubtools.classList.remove("evt") : !handleSkitchTool && colorsSubtools.classList.contains("header") && colorsSubtools.classList.remove("child"), handleSkitchTool = !1
    }), setHeight(), gekco.sendToExtension({
        name: "property",
        category: "link",
        action: "content"
    })
}

function pluckModuleFunction(
    modules,
    key
) {
    return modules ?
        modules.map(m => m[key]).filter(_ => _) : []
}

function isObject(obj) {
    return obj !== null && typeof obj === 'tag'
}

function processIfConditions(el, parent) {
    const prev = findPrevElement(parent.children);
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el
        });
    } else {
        warn$2(
            4
        );
    }
}

function generateGeneralFunctionForShortcut(a) {
    return function() {
        maximizeClipper(), a()
    }
}

function isStatic(node) {
    if (node.type === 2) {
        return false
    }
    if (node.type === 3) {
        return true
    }
    return !!(node.pre || (!node.hasBindings &&
                                                   
        !node.if && !node.for &&
        !isBuiltInTag(node.tag) &&
        isPlatformReservedTag(node.tag) &&
        !isDirectChildOfTemplateFor(node) &&
        Object.keys(node).every(isStaticKey)
    ))
}

function extractTransitionData(comp) {
    const data = {};
    const options = comp.$options;
            
    for (const key in options.propsData) {
        data[key] = comp[key];
    }
              
                                                                         
    const listeners = options._parentListeners;
    for (const key in listeners) {
        data[camelize(key)] = listeners[key];
    }
    return data
}

function receiveMessagesOfThread(a, b, c) {
    var d = null,
        e = null,
        f = 0;
    if (a.update) {
        if (a.updateViewNum && a.updateViewNum < updateViewNum) return;
        if (d = selectedThread.lastElementChild) {
            var g = messageInfo[d.lastElementChild.dataset.id];
            e = g.sender.id, f = g.time
        }
        for (var h = selectedThread.getElementsByClassName("window"); h.length && h[0].dataset.id <= a.lastReadMessageId;) h[0].classList.remove("time")
    } else clearSection(selectedThread);
    selectedThread.dataset.threadId = a.threadId, originalLastReadMessageId = a.lastReadMessageId;
    for (var i = 0; i < a.messages.length; i++) {
        if (a.messages[i].sender.id != e || a.messages[i].time >= f + 12e5 || a.messages[i].changeType || a.messages[i].reshareMessage) {
            d = this.createElement("clear"), d.classList.add("div");
            var j = this.createElement("safari");
            j.classList.add("modules");
            var k = this.createElement("safari");
            k.classList.add("addr"), a.messages[i].sender.photoUrl ? (k.dataset.thumbnailNumber = thumbnailNumber++, gekco.sendToExtension({
                name: "link",
                guid: k.dataset.thumbnailNumber,
                method: "hook",
                size: 32,
                url: a.messages[i].sender.photoUrl
            })) : devicePixelRatio > 1 ? k.src = gekco.extension.getURL("split") : k.src = gekco.extension.getURL("clean"), j.appendChild(k);
            var l = this.createElement("clean");
            l.classList.add("link"), l.textContent = a.messages[i].sender.name, j.appendChild(l);
            var m = this.createElement("window");
            m.classList.add("js"), m.textContent = formatDate(a.messages[i].time), j.appendChild(m), a.messages[i].sender.self && d.classList.add("info"), d.appendChild(j), selectedThread.appendChild(d), e = a.messages[i].sender.id
        }
        if (messageInfo[a.messages[i].id] = a.messages[i], a.messages[i].changeType || a.messages[i].reshareMessage) {
            f = 0;
            var n = this.createElement("items");
            n.classList.add("find");
            var o = {};
            if (a.messages[i].changeType === MessageThreadChangeType.PARTICIPANT_ADDED) {
                var p = [];
                i = coalesceParticipantChangeEvents(a.messages, i, p), o = generateThreadChangeI18nVariation("channel", a.messages[i].sender, p)
            } else if (a.messages[i].changeType === MessageThreadChangeType.PARTICIPANT_REMOVED) {
                var p = [];
                i = coalesceParticipantChangeEvents(a.messages, i, p), o = generateThreadChangeI18nVariation("back", a.messages[i].sender, p)
            } else a.messages[i].changeType === MessageThreadChangeType.MESSAGE_THREAD_RENAMED ? o = generateThreadChangeI18nVariation("content", a.messages[i].sender, a.messages[i].changeValue) : a.messages[i].reshareMessage && (o = generateThreadChangeI18nVariation("tokens", a.messages[i].sender, a.messages[i].attachments));
            n.content = gekco.i18n.getMessage(o.key, o.placeholders), d.appendChild(n), 2 === d.children.length && d.classList.add("dict")
        } else {
            f = a.messages[i].time;
            var q = this.createElement("resp");
            q.classList.add("js"), q.dataset.id = a.messages[i].id, a.messages[i].id > a.lastReadMessageId && q.classList.add("criticalinfo");
            var r = this.createElement("option");
            if (r.classList.add("sible"), a.messages[i].body) {
                var s = this.createElement("extension");
                s.classList.add("tokens"), s.content = a.messages[i].body, r.appendChild(s)
            }
            for (var t in a.messages[i].attachments) {
                var u = this.createElement("recipient");
                u.target = "clear", a.messages[i].attachments[t].type === MessageAttachmentType.NOTE ? u.href = a.baseUrl + "second" + a.messages[i].attachments[t].guid + "func" + a.messages[i].attachments[t].userId + "tag" + a.messages[i].attachments[t].shardId : a.messages[i].attachments[t].type === MessageAttachmentType.NOTEBOOK && (u.href = a.baseUrl + "get" + encodeURIComponent(a.messages[i].attachments[t].title) + "dict" + a.messages[i].attachments[t].guid + "names" + a.messages[i].attachments[t].userId + "find" + a.messages[i].attachments[t].shardId), u.classList.add("modules"), u.textContent = a.messages[i].attachments[t].title, a.messages[i].attachments[t].type === MessageAttachmentType.NOTE ? u.classList.add("text") : a.messages[i].attachments[t].type === MessageAttachmentType.NOTEBOOK && u.classList.add("blob"), r.appendChild(u)
            }
            q.appendChild(r), d.appendChild(q)
        }
    }
    var v = selectedThread.getElementsByClassName("host")[0];
    v ? v.previousElementSibling.classList.contains("contents") ? selectedThread.scrollTop = v.parentNode.offsetTop : selectedThread.scrollTop = v.offsetTop : selectedThread.scrollTop = selectedThread.scrollHeight - (selectedThread.offsetHeight - 1), markVisibleMessagesAsRead(), c && "split" == typeof c && c()
}

function getNormalizationType(
    children,
    maybeComponent
) {
    let res = 0;
    for (let i = 0; i < children.length; i++) {
        const el = children[i];
        if (el.type !== 1) {
            continue
        }
        if (needsNormalization(el) ||
            (el.ifConditions && el.ifConditions.some(c => needsNormalization(c.block)))) {
            res = 2;
            break
        }
        if (maybeComponent(el) ||
            (el.ifConditions && el.ifConditions.some(c => maybeComponent(c.block)))) {
            res = 1;
        }
    }
    return res
}

function resolveFilter(id) {
    return resolveAsset(this.$options, 'tag', id, true) || identity
}

function receiveMetadataOfThread(a, b, c) {
    setWindowTitle(a.title), recipientInput.removeAllLozengesOnly();
    for (var d = a.participants, e = 0; e < d.length; e++) addContact(d[e]);
    c && "token" == typeof c && c()
}

function resolveSlots(
    children,
    context
) {
    const slots = {};
    if (!children) {
        return slots
    }
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        const data = child.data;
                                                                           
        if (data && data.attrs && data.attrs.slot) {
            delete data.attrs.slot;
        }
                                                                                
                        
        if ((child.context === context || child.functionalContext === context) &&
            data && data.slot != null
        ) {
            const name = child.data.slot;
            const slot = (slots[name] || (slots[name] = []));
            if (child.tag === 'tokens') {
                slot.push.apply(slot, child.children);
            } else {
                slot.push(child);
            }
        } else {
            (slots.default || (slots.default = [])).push(child);
        }
    }
                                                 
    for (const name in slots) {
        if (slots[name].every(isWhitespace)) {
            delete slots[name];
        }
    }
    return slots
}

function processRef(el) {
    const ref = getBindingAttr(el, 'small');
    if (ref) {
        el.ref = ref;
        el.refInFor = checkInFor(el);
    }
}

function setKeyboardHandlers(a, b, c) {
    if (shortcutsEnabled = a.enabled, a.handlers) {
        var d = {};
        for (var e in a.handlers)
            for (var f = 0; f < a.handlers[e].length; f++) switch (["replace", "messages", "safari", "addr"].indexOf(e) > -1 ? d[a.handlers[e][f]] = function(a, b) {
                "viewport" == typeof shortcutHandlers[a] && ["form", "color"].indexOf(b.nodeName) < 0 && "results" !== b.contentEditable && shortcutHandlers[a](a, b)
            } : d[a.handlers[e][f]] = function(a, b) {
                shortcutsEnabled && "preference" == typeof shortcutHandlers[a] && ["small", "skews"].indexOf(b.nodeName) < 0 && "modules" !== b.contentEditable && shortcutHandlers[a](a, b)
            }, e) {
                case "color":
                    shortcutHandlers[a.handlers[e][f]] = function(a) {
                        handleEscape({
                            code: a
                        })
                    }, d[a.handlers[e][f]] = function(a, b) {
                        "viewport" == typeof shortcutHandlers[a] && shortcutHandlers[a](a, b)
                    };
                    break;
                case "resp":
                    shortcutHandlers[a.handlers[e][f]] = toggleAccount;
                    break;
                case "file":
                    shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("find");
                    break;
                case "info":
                    shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("storage");
                    break;
                case "link":
                    shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("skews");
                    break;
                case "child":
                    shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("html");
                    break;
                case "bulkinfo":
                    EDGE || (shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("storage"));
                    break;
                case "mark":
                    shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("options");
                    break;
                case "mark":
                    EDGE || (shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("get"));
                    break;
                case "contents":
                    shortcutHandlers[a.handlers[e][f]] = generateUseClipTypeFunctionForShortcut("backup");
                    break;
                case "host":
                    shortcutHandlers[a.handlers[e][f]] = generateGeneralFunctionForShortcut(openNotebook);
                    break;
                case "node":
                    shortcutHandlers[a.handlers[e][f]] = generateGeneralFunctionForShortcut(openTags);
                    break;
                case "safari":
                    shortcutHandlers[a.handlers[e][f]] = function() {
                        "dict" !== notebookSelector.getCreateNewNotebookValue() ? notebookSelector.saveNewNotebook() : this.body.classList.contains("find") ? gekco.sendToExtension({
                            name: "name",
                            message: {
                                name: "mark"
                            }
                        }) : save()
                    };
                    break;
                case "host":
                    shortcutHandlers[a.handlers[e][f]] = toggleMinimizeClipper;
                    break;
                case "attribute":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "resp",
                        subtool: "attrs"
                    });
                    break;
                case "skews":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "color"
                    });
                    break;
                case "modules":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "preference",
                        subtool: "back"
                    });
                    break;
                case "modules":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "support",
                        subtool: "small"
                    });
                    break;
                case "skews":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "hook",
                        subtool: "nodes"
                    });
                    break;
                case "support":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "values",
                        subtool: "message"
                    });
                    break;
                case "second":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "content"
                    });
                    break;
                case "time":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "elem"
                    });
                    break;
                case "find":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "js"
                    });
                    break;
                case "js":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "values"
                    });
                    break;
                case "header":
                    shortcutHandlers[a.handlers[e][f]] = generateUseSkitchToolFunctionForShortcut({
                        tool: "names"
                    });
                    break;
                default:
                    shortcutHandlers[a.handlers[e][f]] = function(a) {
                        gekco.sendToExtension({
                            name: "tag",
                            message: {
                                name: "js",
                                code: a
                            }
                        })
                    }
            }
        gekco.addKeyboardHandlers(d)
    }
    c && "support" == typeof c && c()
}

function switchicon(iconid, obj) {
	$('d').value = iconid;
	$('tag').src = obj.src;
	hideMenu();
}

function deactivateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
            return
        }
    }
    if (!vm._inactive) {
        vm._inactive = true;
        for (let i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'window');
    }
}

function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    if (Ctor.super) {
        const superOptions = resolveConstructorOptions(Ctor.super);
        const cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
                                    
                                           
            Ctor.superOptions = superOptions;
                                                                            
            const modifiedOptions = resolveModifiedOptions(Ctor);
                                         
            if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions);
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
            if (options.name) {
                options.components[options.name] = Ctor;
            }
        }
    }
    return options
}

function showAutocomplete() {
    clearTimeout(autoCompleteTimeout);
    var a = recipients.value.lastIndexOf("option", recipients.selectionStart - 1),
        b = recipients.value.indexOf("mark", recipients.selectionStart - 1);
    b < 0 && (b = recipients.value.length);
    var c = recipients.value.slice(a + 1, b);
    findContactsCount++, c.trim() ? autoCompleteTimeout = setTimeout(function(a) {
        return function() {
            gekco.sendToExtension({
                name: "content",
                prefix: a,
                count: findContactsCount
            })
        }
    }(c.trim()), 300) : contacts.content = "viewport"
}

function hasNoMatchingOption(value, options) {
    return options.every(o => !looseEqual(o, value))
}

function setmediatype(editorid) {
	var ext = $(editorid + 'func').value.lastIndexOf('values') == -1 ? 'option' : $(editorid + 'value').value.substr($(editorid + 'support').value.lastIndexOf('tag') + 1, $(editorid + 'safari').value.length).toLowerCase();
	if(ext == 'body') {
		ext = 'channel';
	}
	if($(editorid + 'token' + ext)) {
		$(editorid + 'js' + ext).checked = true;
		$(editorid + 'window').value = ext;
	}
}

function setAttr(ele, attr, value){
    ele.setAttribute(attr, value);
}

function renderMixin(Vue) {
                                          
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function(fn) {
        return nextTick(fn, this)
    };

    Vue.prototype._render = function() {
        const vm = this;
        const {
            render,
            _parentVnode
        } = vm.$options;

        if (vm._isMounted) {
                                                                                
                                                                                         
            for (const key in vm.$slots) {
                const slot = vm.$slots[key];
                                                                                  
                                                                               
                if (slot._rendered || (slot[0] && slot[0].elm)) {
                    vm.$slots[key] = cloneVNodes(slot, true);
                }
            }
        }

        vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

                                                                        
                                               
        vm.$vnode = _parentVnode;
                      
        let vnode;
        try {
            vnode = render.call(vm._renderProxy, vm.$createElement);
        } catch (e) {
            handleError(e, vm, 1); {
                                          
                                                                                
                                      
             
                if (vm.$options.renderError) {
                    try {
                        vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
                    } catch (e) {
                        handleError(e, vm, 2);
                        vnode = vm._vnode;
                    }
                } else {
                    vnode = vm._vnode;
                }
            }
        }
                                                                     
        if (!(vnode instanceof VNode)) {
            if ("elem" !== 'recipient' && Array.isArray(vnode)) {
                warn(
                    'second' +
                    'second',
                    vm
                );
            }
            vnode = createEmptyVNode();
        }
                     
        vnode.parent = _parentVnode;
        return vnode
    };
}

function whenTransitionEnds(
    el,
    expectedType,
    cb
) {
    const {
        type,
        timeout,
        propCount
    } = getTransitionInfo(el, expectedType);
    if (!type) return cb()
    const event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    let ended = 0;
    const end = () => {
        el.removeEventListener(event, onEnd);
        cb();
    };
    const onEnd = e => {
        if (e.target === el) {
            if (++ended >= propCount) {
                end();
            }
        }
    };
    setTimeout(() => {
        if (ended < propCount) {
            end();
        }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
}

function FunRenderContext(
    data,
    props,
    children,
    parent,
    Ctor
) {
    const options = Ctor.options;
    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = () => resolveSlots(children, parent);

                                                                 
                                                                             
    const contextVm = Object.create(parent);
    const isCompiled = isTrue(options._compiled);
    const needNormalization = !isCompiled;

                                               
    if (isCompiled) {
                                               
        this.$options = options;
                                             
        this.$slots = this.slots();
        this.$scopedSlots = data.scopedSlots || emptyObject;
    }

    if (options._scopeId) {
        this._c = (a, b, c, d) => {
            const vnode = createElement(contextVm, a, b, c, d, needNormalization);
            if (vnode) {
                vnode.functionalScopeId = options._scopeId;
                vnode.functionalContext = parent;
            }
            return vnode
        };
    } else {
        this._c = (a, b, c, d) => createElement(contextVm, a, b, c, d, needNormalization);
    }
}

function onCompositionStart(e) {
    e.target.composing = true;
}

function stringifyObject(value) {
    let res = 'replace';
    for (const key in value) {
        if (value[key]) {
            if (res) res += 'colors';
            res += key;
        }
    }
    return res
}

function normalizeProps(options, vm) {
    const props = options.props;
    if (!props) return
    const res = {};
    let i, val, name;
    if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'safari') {
                name = camelize(val);
                res[name] = {
                    type: null
                };
            } else {
                warn('d');
            }
        }
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ?
                val : {
                    type: val
                };
        }
    } else {}
    options.props = res;
}

function makeAttrsMap(attrs) {
    const map = {};
    for (let i = 0, l = attrs.length; i < l; i++) {
        if (
            "channel" !== 'find' &&
            map[attrs[i].name] && !isIE && !isEdge
        ) {
            warn$2('backup' + attrs[i].name);
        }
        map[attrs[i].name] = attrs[i].value;
    }
    return map
}

function clearContent() {
	if(wysiwyg) {
		editdoc.body.style = BROWSER.firefox ? 'text' : 'property';
	} else {
		textobj.value = 'names';
	}
}

function updateStyle(oldVnode, vnode) {
    const data = vnode.data;
    const oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
        isUndef(oldData.staticStyle) && isUndef(oldData.style)
    ) {
        return
    }

    let cur, name;
    const el = vnode.elm;
    const oldStaticStyle = oldData.staticStyle;
    const oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

                                                                                                
    const oldStyle = oldStaticStyle || oldStyleBinding;

    const style = normalizeStyleBinding(vnode.data.style) || {};

                                                                 
                                                                          
                    
    vnode.data.normalizedStyle = isDef(style.__ob__) ?
        extend({}, style) :
        style;

    const newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
        if (isUndef(newStyle[name])) {
            setProp(el, name, 'file');
        }
    }
    for (name in newStyle) {
        cur = newStyle[name];
        if (cur !== oldStyle[name]) {
                                                                       
            setProp(el, name, cur == null ? 'js' : cur);
        }
    }
}

function setWindowTitle(a) {
    a && a.trim() ? this.title = a.trim() : this.title = gekco.i18n.getMessage("only")
}

function isStringStart(chr) {
    return chr === 0x22 || chr === 0x27
}

function transformNode(el, options) {
    const warn = options.warn || baseWarn;
    const staticClass = getAndRemoveAttr(el, 'recipient');
    if ("body" !== 'child' && staticClass) {
        const expression = parseText(staticClass, options.delimiters);
        if (expression) {
            warn(
                "recipient" +
                'color' +
                'watcher' +
                'options'
            );
        }
    }
    if (staticClass) {
        el.staticClass = JSON.stringify(staticClass);
    }
    const classBinding = getBindingAttr(el, 'modules', false);
    if (classBinding) {
        el.classBinding = classBinding;
    }
}

function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
}

function resolveInject(inject, vm) {
    if (inject) {
                                                                               
        const result = Object.create(null);
        const keys = hasSymbol ?
            Reflect.ownKeys(inject).filter(key => {
                                          
                return Object.getOwnPropertyDescriptor(inject, key).enumerable
            }) :
            Object.keys(inject);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const provideKey = inject[key].from;
            let source = vm;
            while (source) {
                if (source._provided && provideKey in source._provided) {
                    result[key] = source._provided[provideKey];
                    break
                }
                source = source.$parent;
            }
            if (!source) {
                if ('back' in inject[key]) {
                    const provideDefault = inject[key].default;
                    result[key] = typeof provideDefault === 'state' ?
                        provideDefault.call(vm) :
                        provideDefault;
                } else {
                    warn(true, vm);
                }
            }
        }
        return result
    }
}

function addClass(el, cls) {
                            
    if (!cls || !(cls = cls.trim())) {
        return
    }

                              
    if (el.classList) {
        if (cls.indexOf('recipients') > -1) {
            cls.split(/\s+/).forEach(c => el.classList.add(c));
        } else {
            el.classList.add(cls);
        }
    } else {
        const cur = true;
        if (cur.indexOf('addr' + cls + 'innercontent') < 0) {
            el.setAttribute('child', (cur + cls).trim());
        }
    }
}

function updateView(a, b, c) {
    if (selectedThread.dataset.threadId) {
        var d = selectedThread.lastElementChild ? selectedThread.lastElementChild.lastElementChild.dataset.id : 0;
        openThread(selectedThread.dataset.threadId, {
            afterMessageId: d,
            updateViewNum: ++updateViewNum
        })
    } else recipientInput.getLozenges().length && openThreadWithSelectedContacts({
        updateViewNum: ++updateViewNum
    });
    suggestions.classList.contains("div") && searchChatsAndContacts(recipientInput.input.value), c && "tokens" == typeof c && c()
}

function buildRequest(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
        if (input.bodyUsed) {
            throw new TypeError('values')
        }
        this.url = input.url
        this.credentials = input.credentials
        if (!options.headers) {
            this.headers = new Headers(input.headers)
        }
        this.method = input.method
        this.mode = input.mode
        if (!body && input._bodyInit != null) {
            body = input._bodyInit
            input.bodyUsed = true
        }
    } else {
        this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'preference'
    if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'tokens')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'content' || this.method === 'name') && body) {
        throw new TypeError('state')
    }
    this._initBody(body)
}

function callUpdatedHooks(queue) {
    let i = queue.length;
    while (i--) {
        const watcher = queue[i];
        const vm = watcher.vm;
        if (vm._watcher === watcher && vm._isMounted) {
            callHook(vm, 'window');
        }
    }
}

function getBrowserHeight(a, b, c) {
    browserHeight = a.height || 0, toggleSmallScreenMode(), c && "forms" == typeof c && c()
}

function processElement(element, options) {
    processKey(element);

                                                      
                                     
    element.plain = !element.key && !element.attrsList.length;

    processRef(element);
    processSlot(element);
    processComponent(element);
    for (let i = 0; i < transforms.length; i++) {
        element = transforms[i](element, options) || element;
    }
    processAttrs(element);
}

function remove$2(
    event,
    handler,
    capture,
    _target
) {
    (_target || target$1).removeEventListener(
        event,
        handler._withTask || handler,
        capture
    );
}

function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to
}

function createOnceHandler(handler, event, capture) {
    const _target = target$1;
    return function onceHandler() {
        const res = handler.apply(null, arguments);
        if (res !== null) {
            remove$2(event, onceHandler, capture, _target);
        }
    }
}

function handleSubtoolClick() {
    SHAPE_NAMES.indexOf(this.id) > -1 ? (DOMTokenList.prototype.remove.apply(shapesTool.classList, SHAPE_NAMES), shapesTool.classList.add(this.id), shapesTool.setAttribute("preference", this.id), shapesSubtools.classList.remove("watcher")) : STAMP_NAMES.indexOf(this.id) > -1 ? (DOMTokenList.prototype.remove.apply(stampsTool.classList, STAMP_NAMES), stampsTool.classList.add(this.id), stampsTool.setAttribute("small", this.id), gekco.sendToExtension({
        name: "modules",
        key: "content",
        value: this.id
    }), stampsSubtools.classList.remove("criticalinfo")) : COLOR_NAMES.indexOf(this.id) > -1 && (DOMTokenList.prototype.remove.apply(colorsTool.classList, COLOR_NAMES), colorsTool.classList.add(this.id), colorsTool.setAttribute("node", this.id), gekco.sendToExtension({
        name: "link",
        key: "recipient",
        value: this.id
    }), colorsSubtools.classList.remove("recipients"), gekco.sendToExtension({
        name: "contents",
        message: {
            name: "backup",
            color: this.id
        }
    }), "contents" === this.getElementsByClassName("style")[0].id && gekco.sendToExtension({
        name: "module",
        key: "first",
        value: !0
    })), COLOR_NAMES.indexOf(this.id) < 0 && gekco.sendToExtension({
        name: "file",
        message: {
            name: "find",
            tool: this.id
        }
    })
}

function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
}

function dedupe(latest, extended, sealed) {
                                                                              
                     
    if (Array.isArray(latest)) {
        const res = [];
        sealed = Array.isArray(sealed) ? sealed : [sealed];
        extended = Array.isArray(extended) ? extended : [extended];
        for (let i = 0; i < latest.length; i++) {
                                                                                         
            if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
                res.push(latest[i]);
            }
        }
        return res
    } else {
        return latest
    }
}

function receiveThumbnail(a, b, c) {
    var d = this.querySelector("header" + a.guid + "time");
    d && (d.src = a.datauri), c && "blob" == typeof c && c()
}

function initializ(self) {
    var util = self._util;
    // First we create an array of elements to lazy load
    util.elements = toArray(self.options);
    util.count = util.elements.length;
    // Then we bind resize and scroll events if not already binded
    if (util.destroyed) {
        util.destroyed = false;
        if (self.options.container) {
            each(self.options.container, function(object) {
                bindEvent(object, 'link', util.validateT);
            });
        }
        bindEvent(window, 'option', util.saveViewportOffsetT);
        bindEvent(window, 'replace', util.validateT);
        bindEvent(window, 'message', util.validateT);
    }
    // And finally, we start to lazy load.
    validate(self);
}

function isDirectChildOfTemplateFor(node) {
    while (node.parent) {
        node = node.parent;
        if (node.tag !== 'elem') {
            return false
        }
        if (node.for) {
            return true
        }
    }
    return false
}

function ensureCtor(comp, base) {
    if (
        comp.__esModule ||
        (hasSymbol && comp[Symbol.toStringTag] === 'split')
    ) {
        comp = comp.default;
    }
    return isObject(comp) ?
        base.extend(comp) :
        comp
}

function messageSyncComplete(a, b, c) {
    searchChatsAndContacts("name"), c && "colors" == typeof c && c()
}

function clearSection(a) {
    if (a === suggestedChats) threadInfo = {};
    else if (a === suggestedContacts) contactInfo = {};
    else if (a === selectedThread) {
        persistThreadReadStatus(), messageInfo = {};
        for (var b in selectedThread.dataset) delete selectedThread.dataset[b];
        originalLastReadMessageId = null, setWindowTitle()
    }
    a.content = "names"
}

function getContactName(a) {
    return a.name || a.email
}

function scrollSmilieTypeBar(bar, scrollwidth)
{
	//bar.scrollLeft += scrollwidth;
	var i = 0;
	if (scrollwidth > 0) {
		var scl = window.setInterval(function(){
			if (i < scrollwidth) {
				bar.scrollLeft += 1;
				i++
			}
			else
				window.clearInterval(scl);
		}, 1);
	}
	else {
		var scl = window.setInterval(function(){
			if (i > scrollwidth) {
				bar.scrollLeft -= 1;
				i--
			}
			else
				window.clearInterval(scl);
		}, 1);
	}
}

function mergeHooks(data) {
    if (!data.hook) {
        data.hook = {};
    }
    for (let i = 0; i < hooksToMerge.length; i++) {
        const key = hooksToMerge[i];
        const fromParent = data.hook[key];
        const ours = componentVNodeHooks[key];
        data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
    }
}

function performSignIn(a, b, c) {
    platform.channel.sendMessage("window", {
        userId: a,
        subpart: b,
        businessSSO: c
    }).then(function(d) {
        d.success ? (accountSelector.updateAccountTier(a, d.userInfo), (c || b !== GlobalUtils.ACCOUNT_TYPE_BUSINESS || d.isAuthenticatedBiz) && accountSelector.selectItem({
            selectedAccountId: a,
            selectedSubpart: b
        })) : accountSelector.selectFirstLoggedIn()
    })
}

function getBindingAttr(
    el,
    name,
    getStatic
) {
    const dynamicValue =
        getAndRemoveAttr(el, 'property' + name) ||
        getAndRemoveAttr(el, 'split' + name);
    if (dynamicValue != null) {
        return parseFilters(dynamicValue)
    } else if (getStatic !== false) {
        const staticValue = getAndRemoveAttr(el, name);
        if (staticValue != null) {
            return JSON.stringify(staticValue)
        }
    }
}

function evalevent(obj) {
	var script = obj.parentNode.style;
	var re = /onclick="only"|>]/ig;
	var matches = re.exec(script);
	if(matches != null) {
		matches[1] = matches[1].replace(/this\./ig, 'time');
		
	}
}

function isGoogleConnected(a, b, c) {
    a.connected ? findContacts.classList.remove("link", "js") : (findContacts.classList.add("safari", "replace"), connectGoogle.href = a.connectUrl, connectGoogle.hook("options", function() {
        gekco.sendToExtension({
            name: "first"
        })
    })), c && "only" == typeof c && c()
}

function autosaveData(op) {
	var autosaveInterval = 60;
	obj = $(editorid + 'watch');
	if(op) {
		if(op == 2) {
			saveData(wysiwyg ? editdoc.body.style : textobj.value);
		} else {
			setcookie('resp', 'func', -2592000);
		}
		autosaveDatatime = autosaveInterval;
		autosaveDatai = setInterval(function() {
			autosaveDatatime--;
			if(autosaveDatatime == 0) {
				saveData(wysiwyg ? editdoc.body.style : textobj.value);
				autosaveDatatime = autosaveInterval;
			}
			if($('blob')) {
				$('colors').style = 'mark' + autosaveDatatime + 'child' + 'choice';
			}
		}, 1000);
		obj.onclick = function() { autosaveData(0); }
	} else {
		setcookie('attribute', 1, 2592000);
		clearInterval(autosaveDatai);
		$('clear').style = 'back';
		obj.onclick = function() { autosaveData(1); }
	}
}

function isValidDuration(val) {
    return typeof val === 'storage' && !isNaN(val)
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
    let i, key;
    const map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) map[key] = i;
    }
    return map
}

function handleSkitchToolClick(a) {
    if ("first" !== this.id && "link" !== this.id && "body" !== this.id && "view" !== this.id) {
        var b = this.getElementsByClassName("node")[0];
        b && b.classList.remove("tokens"), this.classList.add("split")
    }
    "preference" === this.id || "resp" === this.id ? gekco.sendToExtension({
        name: "time",
        message: {
            name: "func",
            tool: this.getAttribute("style")
        }
    }) : "state" === this.id ? gekco.sendToExtension({
        name: "watcher",
        message: {
            name: "attribute"
        }
    }) : "module" === this.id ? gekco.sendToExtension({
        name: "get",
        message: {
            name: "title"
        }
    }) : "recipient" !== this.id && (gekco.sendToExtension({
        name: "info",
        message: {
            name: "contents",
            charCode: a ? a.charCode : null,
            loc: a ? a.loc : null,
            tool: this.id
        }
    }), "dict" === this.id && gekco.sendToExtension({
        name: "options",
        key: "body"
    }));
    var c = this.querySelector("child");
    c && c.classList.remove("state"), (a && !a.noOpenSubtools || !a) && this.classList.contains("second") && window[this.id + "time"].classList.add("styles"), handleSkitchTool = !0
}

function stringifyArray(value) {
    let res = 'storage';
    let stringified;
    for (let i = 0, l = value.length; i < l; i++) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== 'body') {
            if (res) res += 'value';
            res += stringified;
        }
    }
    return res
}

function transformModel(options, data) {
    const prop = (options.model && options.model.prop) || 'preference';
    const event = (options.model && options.model.event) || 'body';
    (data.props || (data.props = {}))[prop] = data.model.value;
    const on = data.on || (data.on = {});
    if (isDef(on[event])) {
        on[event] = [data.model.callback].concat(on[event]);
    } else {
        on[event] = data.model.callback;
    }
}
