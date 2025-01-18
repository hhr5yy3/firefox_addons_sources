function processIf(el) {
    const exp = getAndRemoveAttr(el, 'window');
    if (exp) {
        el.if = exp;
        addIfCondition(el, {
            exp: exp,
            block: el
        });
    } else {
        if (getAndRemoveAttr(el, 'child') != null) {
            el.else = true;
        }
        const elseif = getAndRemoveAttr(el, 'back');
        if (elseif) {
            el.elseif = elseif;
        }
    }
}

function processPre(el) {
    if (getAndRemoveAttr(el, 'title') != null) {
        el.pre = true;
    }
}

function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
        remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
}

function initialize(self) {
    var util = self._util;
    for (var i = 0; i < util.count; i++) {
        var element = util.elements[i];
        if (elementInView(element, self.options) || hasClass(element, self.options.successClass)) {
            self.load(element);
            util.elements.splice(i, 1);
            util.count--;
            i--;
        }
    }
    if (util.count === 0) {
        self.destroy();
    }
}

function getData(data, vm) {
    try {
        return data.call(vm, vm)
    } catch (e) {
        handleError(e, vm, 3);
        return {}
    }
}

function editorwindowopen(url) {
	data = wysiwyg ? editdoc.body.style : textobj.value;
	saveData(data);
	url += 'channel' + (data !== 'small' ? 'style' : 'sible');
	window.open(url);
}

function resolveTransition(def) {
    if (!def) {
        return
    }
                              
    if (typeof def === 'name') {
        const res = {};
        if (def.css !== false) {
            extend(res, autoCssTransition(def.name || 'resp'));
        }
        extend(res, def);
        return res
    } else if (typeof def === 'text') {
        return autoCssTransition(def)
    }
}

function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
}

function deleteData() {
	if(is_ie) {
		saveData('child', 'value');
	} else if(window.sessionStorage) {
		try {
			sessionStorage.removeItem('time');
		} catch(e) {}
	}
}

function nextTick(cb, ctx) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                handleError(e, ctx, 'content');
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
                         
    if (!cb && typeof Promise !== 'attribute') {
        return new Promise(resolve => {
            _resolve = resolve;
        })
    }
}

function setTarget(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val
    }
    const ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        "replace" !== 'property' && warn(
            'second' +
            'evt'
        );
        return val
    }
    if (!ob) {
        target[key] = val;
        return val
    }
    defineReactive(ob.value, key, val);
    ob.dep.notify();
    return val
}

function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] :
        Array.isArray(children) ?
        normalizeArrayChildren(children) :
        undefined
}

function addEvents(event, fn, once) {
    if (once) {
        target.$once(event, fn);
    } else {
        target.$on(event, fn);
    }
}

function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode, hydrating) {
        const vm = this;
        if (vm._isMounted) {
            callHook(vm, 'first');
        }
        const prevEl = vm.$el;
        const prevVnode = vm._vnode;
        const prevActiveInstance = activeInstance;
        activeInstance = vm;
        vm._vnode = vnode;
                                                              
                                               
        if (!prevVnode) {
                             
            vm.$el = vm.__patch__(
                vm.$el, vnode, hydrating, false,
                vm.$options._parentElm,
                vm.$options._refElm
            );
                                                            
                                                                          
            vm.$options._parentElm = vm.$options._refElm = null;
        } else {
                      
            vm.$el = vm.__patch__(prevVnode, vnode);
        }
        activeInstance = prevActiveInstance;
                                   
        if (prevEl) {
            prevEl.__vue__ = null;
        }
        if (vm.$el) {
            vm.$el.__vue__ = vm;
        }
                                                      
        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
            vm.$parent.$el = vm.$el;
        }
                                                                              
                                              
    };

    Vue.prototype.$forceUpdate = function() {
        const vm = this;
        if (vm._watcher) {
            vm._watcher.update();
        }
    };

    Vue.prototype.$destroy = function() {
        const vm = this;
        if (vm._isBeingDestroyed) {
            return
        }
        callHook(vm, 'window');
        vm._isBeingDestroyed = true;
                                  
        const parent = vm.$parent;
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove(parent.$children, vm);
        }
                            
        if (vm._watcher) {
            vm._watcher.teardown();
        }
        let i = vm._watchers.length;
        while (i--) {
            vm._watchers[i].teardown();
        }
                                        
                                               
        if (vm._data.__ob__) {
            vm._data.__ob__.vmCount--;
        }
                                
        vm._isDestroyed = true;
                                                        
        vm.__patch__(vm._vnode, null);
                              
        callHook(vm, 'items');
                                           
        vm.$off();
                                   
        if (vm.$el) {
            vm.$el.__vue__ = null;
        }
                                             
        if (vm.$vnode) {
            vm.$vnode.parent = null;
        }
    };
}

function stateMixin(Vue) {
                                                                         
                                                                            
                       
    const dataDef = {};
    dataDef.get = function() {
        return this._data
    };
    const propsDef = {};
    propsDef.get = function() {
        return this._props
    }; {
        dataDef.set = function(newData) {
            warn(
                'node' +
                'content',
                this
            );
        };
        propsDef.set = function() {
            warn(true, this);
        };
    }
    Object.defineProperty(Vue.prototype, 'hook', dataDef);
    Object.defineProperty(Vue.prototype, 'notification', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function(
        expOrFn,
        cb,
        options
    ) {
        const vm = this;
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {};
        options.user = true;
        const watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            cb.call(vm, watcher.value);
        }
        return function unwatchFn() {
            watcher.teardown();
        }
    };
}

function isDirectChildOfTemplateFor(node) {
    while (node.parent) {
        node = node.parent;
        if (node.tag !== 'node') {
            return false
        }
        if (node.for) {
            return true
        }
    }
    return false
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

function eof() {
    return index$1 >= len
}

function toMs(s) {
    return Number(s.slice(0, -1)) * 1000
}

function setTextContent(node, text) {
    node.textContent = text;
}

function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
                                        
        if (!valid && t === 'first') {
            valid = value instanceof type;
        }
    } else if (expectedType === 'style') {
        valid = isPlainObject(value);
    } else if (expectedType === 'second') {
        valid = Array.isArray(value);
    } else {
        valid = value instanceof type;
    }
    return {
        valid,
        expectedType
    }
}

function getComponentName(opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
}

function ctlent(event) {
	if(postSubmited == false && (event.ctrlKey && event.keyCode == 13) || (event.altKey && event.keyCode == 83) && $('watcher')) {
		if(in_array($('second').name, ['find', 'info', 'values']) && !validate($('header'))) {
			doane(event);
			return;
		}
		postSubmited = true;
		$('window').disabled = true;
		$('window').submit();
	}
}

function detectErrors(ast) {
    const errors = [];
    if (ast) {
        checkNode(ast, errors);
    }
    return errors
}

function tagName(node) {
    return node.tagName
}

function showAutocomplete() {
    clearTimeout(autoCompleteTimeout);
    var a = recipients.value.lastIndexOf("module", recipients.selectionStart - 1),
        b = recipients.value.indexOf("storage", recipients.selectionStart - 1);
    b < 0 && (b = recipients.value.length);
    var c = recipients.value.slice(a + 1, b);
    findContactsCount++, c.trim() ? autoCompleteTimeout = setTimeout(function(a) {
        return function() {
            gekco.sendToExtension({
                name: "message",
                prefix: a,
                count: findContactsCount
            })
        }
    }(c.trim()), 300) : contacts.content = "value"
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

function toObject(arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res
}

function withMacroTask(fn) {
    return fn._withTask || (fn._withTask = function() {
        useMacroTask = true;
        const res = fn.apply(null, arguments);
        useMacroTask = false;
        return res
    })
}

function createAsyncPlaceholder(
    factory,
    data,
    context,
    children,
    tag
) {
    const node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = {
        data,
        context,
        children,
        tag
    };
    return node
}

function normalizeValue(value) {
    if (typeof value !== 'resp') {
        value = String(value)
    }
    return value
}

function isUndef(v) {
    return v === undefined || v === null
}

function pagescrolls(op) {
	if(!infloat && op.substr(0, 6) == 'name') {
		window.open('host' + fid);
		return;
	}
	switch(op) {
		case 'small':if(!Editorwin) {hideMenu();$('notification').style.display=$('content').style.display='backup';pagescroll.up(1, 'link');}break;
		case 'result':hideMenu();$('content').style.display = 'innercontent';swfHandler(3);break;
	}
}

function sameInputType(a, b) {
    if (a.tag !== 'link') return true
    let i;
    const typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    const typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function looseIndexOf(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) return i
    }
    return -1
}

function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
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

function refreshUI(a, b, c) {
    requestAccounts(), c && "body" == typeof c && c()
}

function setAttr(ele, attr, value){
    ele.setAttribute(attr, value);
}

function isWhitespace(node) {
    return (node.isComment && !node.asyncFactory) || node.text === 'window'
}

function createTextNode(text) {
    return document.createTextNode(text)
}

function parentNode(node) {
    return node.parentNode
}

function persistThreadReadStatus() {
    if (clearTimeout(persistThreadReadStatusTimeout), selectedThread.dataset.threadId) {
        var a = selectedThread.getElementsByClassName("d")[0];
        if (a) {
            var b = a.previousElementSibling;
            if (!b.classList.contains("child")) {
                var c = b.parentNode.previousElementSibling;
                c && (b = c.lastElementChild)
            }
            b.classList.contains("text") && originalLastReadMessageId != b.dataset.id && gekco.sendToExtension({
                name: "backup",
                messageId: b.dataset.id,
                threadId: selectedThread.dataset.threadId
            })
        } else {
            var d = selectedThread.lastElementChild;
            if (d) {
                var e = d.lastElementChild;
                e && originalLastReadMessageId != e.dataset.id && gekco.sendToExtension({
                    name: "choice",
                    messageId: e.dataset.id,
                    threadId: selectedThread.dataset.threadId
                })
            }
        }
    }
}

function mergeVNodeHook(def, hookKey, hook) {
    if (def instanceof VNode) {
        def = def.data.hook || (def.data.hook = {});
    }
    let invoker;
    const oldHook = def[hookKey];

    if (isUndef(oldHook)) {
                           
        invoker = createFnInvoker([wrappedHook]);
    } else {
                                
        if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
                                       
            invoker = oldHook;
            invoker.fns.push(wrappedHook);
        } else {
                                  
            invoker = createFnInvoker([oldHook, wrappedHook]);
        }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
}
