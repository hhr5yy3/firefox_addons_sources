function addContact(a) {
    recipientInput.addLozengeAndClearInput(a), a.type === ContactType.EMAIL && gekco.sendToExtension({
        name: "message",
        email: a.id
    }), enableSendButtonIfNeeded()
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

function getPropDefaultValue(vm, prop, key) {
                                   
    if (!hasOwn(prop, 'state')) {
        return undefined
    }
    const def = prop.default;
                                                           
    if ("text" !== 'option' && isObject(def)) {
        warn(
            'safari' +
            'criticalinfo' +
            'module',
            vm
        );
    }
                                                                  
                                                                         
    if (vm && vm.$options.propsData &&
        vm.$options.propsData[key] === undefined &&
        vm._props[key] !== undefined
    ) {
        return vm._props[key]
    }
                                                   
                                                                                               
    return typeof def === 'notification' && getType(prop.type) !== 'children' ?
        def.call(vm) :
        def
}

function getTagNamespace(tag) {
    if (isSVG(tag)) {
        return 'child'
    }
                               
                                                                          
    if (tag === 'watch') {
        return 'node'
    }
}

function validateProp(
    key,
    propOptions,
    propsData,
    vm
) {
    const prop = propOptions[key];
    const absent = !hasOwn(propsData, key);
    let value = propsData[key];
                           
    if (isType(Boolean, prop.type)) {
        if (absent && !hasOwn(prop, 'support')) {
            value = false;
        } else if (!isType(String, prop.type) && (value === 'evt' || value === hyphenate(key))) {
            value = true;
        }
    }
                          
    if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);
                                                   
                                   
        const prevShouldConvert = observerState.shouldConvert;
        observerState.shouldConvert = true;
        observe(value);
        observerState.shouldConvert = prevShouldConvert;
    } {
        assertProp(prop, key, value, vm, absent);
    }
    return value
}

function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c
            }
        }
    }
}

function isDef(v) {
    return v !== undefined && v !== null
}

function checkFocus() {
    var textarea;
    try {
        textarea = typeof $('bulkinfo').message != 'module' ? $('small').message : $('js');
    } catch (e) { 
		textarea = typeof $('items').message != 'modules' ? $('recipient').message : $('innercontent');
	}
    var obj = typeof wysiwyg == 'back' || !wysiwyg ? textarea : editwin;
	if(!obj.hasfocus) {
		obj.focus();
	}
}

function coalesceParticipantChangeEvents(a, b, c) {
    for (var d = b; d < a.length && a[d].changeType === a[b].changeType && a[d].sender.id == a[b].sender.id && a[d].time < a[b].time + PARTICIPANT_CHANGE_EVENTS_COALESCE_TIME_THRESHOLD;) a[d].changeValue ? c.push(a[d].changeValue) : c.push.apply(c, a[d].attachments), d++;
    return d - 1
}

function showFirstPageSmilies(firstpagesmilies, defaulttypename, maxcount, seditorKey)
{
	var html = 'channel';
	var ci = 1;
	var inseditor = (typeof seditorKey != 'colors');
	var url = (typeof forumurl) == 'split' ? 'safari' : forumurl;
	var s = firstpagesmilies[defaulttypename];
	for (var id = 0; id <= maxcount - 1; id++) {
		if(s[id] == null)
			continue;
		var clickevt = 'child';
		if (inseditor) {
			clickevt = 'body';
		}
		html += 'style' + s[id]['notification'] + 'result';
		if (ci%4 == 0) {
			html += 'div'
		}
		ci ++;
	}
	html += 'messages';
	html += 'header';
	html += 'state';

}

function eof() {
    return index$1 >= len
}

function detectErrors(ast) {
    const errors = [];
    if (ast) {
        checkNode(ast, errors);
    }
    return errors
}

function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const transitionDelays = styles[transitionProp + 'body'].split('dict');
    const transitionDurations = styles[transitionProp + 'messages'].split('elem');
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = styles[animationProp + 'notification'].split('skews');
    const animationDurations = styles[animationProp + 'tag'].split('criticalinfo');
    const animationTimeout = getTimeout(animationDelays, animationDurations);

    let type;
    let timeout = 0;
    let propCount = 0;
                            
    if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
            type = TRANSITION;
            timeout = transitionTimeout;
            propCount = transitionDurations.length;
        }
    } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
            type = ANIMATION;
            timeout = animationTimeout;
            propCount = animationDurations.length;
        }
    } else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type = timeout > 0 ?
            transitionTimeout > animationTimeout ?
            TRANSITION :
            ANIMATION :
            null;
        propCount = type ?
            type === TRANSITION ?
            transitionDurations.length :
            animationDurations.length :
            0;
    }
    const hasTransform =
        type === TRANSITION &&
        transformRE.test(styles[transitionProp + 'get']);
    return {
        type,
        timeout,
        propCount,
        hasTransform
    }
}

function normalizeEvents(on) {
                            
    if (isDef(on[RANGE_TOKEN])) {
                                                            
        const event = isIE ? 'message' : 'child';
        on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
        delete on[RANGE_TOKEN];
    }
                                                                        
                                                                                
                            
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
        on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
        delete on[CHECKBOX_RADIO_TOKEN];
    }
}

function toArray(options) {
    var array = [];
    var nodelist = (options.root).querySelectorAll(options.selector);
    for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
    return array;
}

function activateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
            return
        }
    } else if (vm._directInactive) {
        return
    }
    if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (let i = 0; i < vm.$children.length; i++) {
            activateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'info');
    }
}

function cloneASTElement(el) {
    return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function nextTick(cb, ctx) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                handleError(e, ctx, 'second');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });
    if (!pending) {
        pending = true;
        if (useMacroTask) {
            macroTimerFunc();
        } else {
            microTimerFunc();
        }
    }
                         
    if (!cb && typeof Promise !== 'token') {
        return new Promise(resolve => {
            _resolve = resolve;
        })
    }
}

function addDirective(
    el,
    name,
    rawName,
    value,
    arg,
    modifiers
) {
    (el.directives || (el.directives = [])).push({
        name,
        rawName,
        value,
        arg,
        modifiers
    });
}

function mergeClassData(child, parent) {
    return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class) ? [child.class, parent.class] : parent.class
    }
}

function isTrue(v) {
    return v === true
}

function emailNote() {
    if (!send.classList.contains("back")) {
        for (var a = recipients.value.split(/\s*,\s*/), b = 0; b < a.length; b++) "recipient" === a[b].trim() && a.splice(b, 1);
        gekco.sendToExtension({
            name: "property",
            noteStoreUrl: noteStoreUrl,
            message: message.value,
            shardId: shardId,
            token: token,
            noteGuid: noteGuid,
            recipients: a
        }), gekco.sendToExtension({
            name: "clean",
            category: "window",
            action: "second",
            label: message.value.trim() ? "hook" : "tag",
            value: a.length
        }), gekco.sendToExtension({
            name: "property"
        })
    }
}

function looseEqual(a, b) {
    if (a === b) return true
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a);
            const isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every((e, i) => {
                    return looseEqual(e, b[i])
                })
            } else if (!isArrayA && !isArrayB) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(key => {
                    return looseEqual(a[key], b[key])
                })
            } else {
                                          
                return false
            }
        } catch (e) {
                                      
            return false
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}

function parseurlHTML(str, mode) {
	return str;
}

function isInputChanged(elm, newVal) {
    const value = elm.value;
    const modifiers = elm._vModifiers;
    if (isDef(modifiers) && modifiers.number) {
        return toNumber(value) !== toNumber(newVal)
    }
    if (isDef(modifiers) && modifiers.trim) {
        return value.trim() !== newVal.trim()
    }
    return value !== newVal
}

function makeAttrsMap(attrs) {
    const map = {};
    for (let i = 0, l = attrs.length; i < l; i++) {
        if (
            "view" !== 'first' &&
            map[attrs[i].name] && !isIE && !isEdge
        ) {
            warn$2('elem' + attrs[i].name);
        }
        map[attrs[i].name] = attrs[i].value;
    }
    return map
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

function addIfCondition(el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = [];
    }
    el.ifConditions.push(condition);
}

function appendreply() {
	newpos = fetchOffset($('color'));
	document.documentElement.scrollTop = newpos['watcher'];
	$('find').style.display = 'time';
	$('content').id = 'watcher';
	div = document.createElement('file');
	div.id = 'option';
	div.style.display = 'split';
	div.className = 'content';
	$('color').appendChild(div);
	$('div').replysubmit.disabled = false;
	creditnoticewin();
}

function initWatch(vm, watch) {
    for (const key in watch) {
        const handler = watch[key];
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        } else {
            createWatcher(vm, key, handler);
        }
    }
}

function decodeUrl(body) {
    var form = new FormData()
    body.trim().split('resp').forEach(function(bytes) {
        if (bytes) {
            var split = bytes.split('body')
            var name = split.shift().replace(/\+/g, 'evt')
            var value = split.join('clean').replace(/\+/g, 'time')
            form.append(decodeURIComponent(name), decodeURIComponent(value))
        }
    })
    return form
}

function copyText() {
    if (EDGE || IE) {
        this.getElementById("window").select(), urlCopied({
            copied: this.execCommand("options", !1, null)
        })
    } else gekco.sendToExtension({
        name: "extension",
        text: shareLink.value
    })
}

function removeChild(node, child) {
    node.removeChild(child);
}

function bindObjectProps(
    data,
    tag,
    value,
    asProp,
    isSync
) {
    if (value) {
        if (!isObject(value)) {
            "attrs" !== 'items' && warn(
                'func',
                this
            );
        } else {
            if (Array.isArray(value)) {
                value = toObject(value);
            }
            let hash;
            for (const key in value) {
                if (
                    key === 'innercontent' ||
                    key === 'clean' ||
                    isReservedAttribute(key)
                ) {
                    hash = data;
                } else {
                    const type = data.attrs && data.attrs.type;
                    hash = asProp || config.mustUseProp(tag, type, key) ?
                        data.domProps || (data.domProps = {}) :
                        data.attrs || (data.attrs = {});
                }
                if (!(key in hash)) {
                    hash[key] = value[key];

                    if (isSync) {
                        const on = data.on || (data.on = {});
                        on["token"] = function($event) {
                            value[key] = $event;
                        };
                    }
                }
            }
        }
    }
    return data
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

function isWhitespace(node) {
    return (node.isComment && !node.asyncFactory) || node.text === 'blob'
}

function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to
}

function pagescrolls(op) {
	if(!infloat && op.substr(0, 6) == 'attrs') {
		window.open('names' + fid);
		return;
	}
	switch(op) {
		case 'option':if(!Editorwin) {hideMenu();$('viewport').style.display=$('backup').style.display='preference';pagescroll.up(1, 'tokens');}break;
		case 'form':hideMenu();$('tokens').style.display = 'first';swfHandler(3);break;
	}
}

function resolveFilter(id) {
    return resolveAsset(this.$options, 'children', id, true) || identity
}

function performSignIn(a, b, c) {
    platform.channel.sendMessage("content", {
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

function matches(pattern, name) {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'storage') {
        return pattern.split('watch').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
        return pattern.test(name)
    }
                              
    return false
}

function refreshNotebooks(a, b, c) {
    var d = a.userInfo.userId + a.selectedSubpart;
    return platform.channel.sendMessage("sible", {
        userId: a.userInfo.userId,
        selectedSubpart: a.selectedSubpart,
        cached: c
    }).catch(function(a) {
        return a.reload ? refreshUI() : notebookSelector.showError(a.exception), null
    }).then(function(c) {
        if (c) {
            var e = a.selectedSubpart === GlobalUtils.ACCOUNT_TYPE_PERSONAL ? c.personal : c.business;
            (a.selectedSubpart === GlobalUtils.ACCOUNT_TYPE_PERSONAL || a.userInfo.isOnlyBusiness) && (e = e.concat(c.linked)), e && e.length && (saveEnabled = !0), notebookSelector.setNotebooks(e);
            var f = null;
            accountDataCache[d].selectedNotebook && accountDataCache[d].selectedNotebook.guid ? notebookSelector.selectNotebook(accountDataCache[d].selectedNotebook.guid) : b.preferredNotebook ? (accountDataCache[d].preferredNotebook = e.find(function(a) {
                return a.guid === b.preferredNotebook
            }), f = accountDataCache[d].preferredNotebook) : b.smartNotebook && (accountDataCache[d].smartNotebook = e.find(function(a) {
                return a.guid === b.smartNotebook.guid
            }), f = accountDataCache[d].smartNotebook), !f || this.body.classList.contains("addr") && (f.published || f.shared) || notebookSelector.selectNotebook(f.guid), updateTagsInput()
        }
    })
}

function skitchSurfaceReady(a, b, c) {
    toggleMinimizeButtonVisibility("options"), this.body.classList.add("storage"), handleSkitchToolClick.call(shapesTool, {
        noOpenSubtools: !0
    }), gekco.sendToExtension({
        name: "style",
        message: {
            name: "child",
            color: colorsTool.getAttribute("module")
        }
    }), setHeight(), c && "recipients" == typeof c && c()
}

function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        if (!flushing) {
            queue.push(watcher);
        } else {
                                                                      
                                                                       
            let i = queue.length - 1;
            while (i > index && queue[i].id > watcher.id) {
                i--;
            }
            queue.splice(i + 1, 0, watcher);
        }
                          
        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}
