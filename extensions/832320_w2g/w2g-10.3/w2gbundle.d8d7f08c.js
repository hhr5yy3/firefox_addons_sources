(function () {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("2wZwj", function(module, exports) {

$parcel$export(module.exports, "W2gDataObject", function () { return $1d7e4a8e923a5ab3$export$9cb1e67042ada; });
let $1d7e4a8e923a5ab3$export$9cb1e67042ada = function(obj, name, parentHandler) {
    "use strict";
    var Handler = {}, parentHandlers = [], proxy;
    if (parentHandler) parentHandlers.push({
        name: name,
        hdl: parentHandler
    });
    var p;
    for(p in obj)if (obj.hasOwnProperty(p) && obj[p] && obj[p].constructor.name !== "Promise" && typeof obj[p] === "object") {
        if (typeof obj[p]._addParentHander === "undefined") obj[p] = new $1d7e4a8e923a5ab3$export$9cb1e67042ada(obj[p], p, runHandlers);
        else obj[p]._addParentHander(p, runHandlers);
    }
    obj._addHandler = function(prop, cb) {
        Handler[prop] = Handler[prop] || [];
        Handler[prop].push(cb);
    };
    obj._addParentHander = function(name, hdl) {
        parentHandlers = parentHandlers.filter(function(ele) {
            return ele.hdl !== hdl;
        });
        parentHandlers.push({
            name: name,
            hdl: hdl
        });
    };
    function setHandler(target, prop, value, receiver) {
        if (prop.indexOf("__") === 0) {
            target[prop] = value;
            runHandlers(target, prop, value, receiver);
        } else if (target.hasOwnProperty(prop) || isArray(target)) {
            if (isArray(target[prop]) && isArray(value)) {
                var args = [
                    0,
                    target[prop].length
                ].concat(value);
                Array.prototype.splice.apply(target[prop], args);
            } else if (isArray(target) && typeof value === "object" && value !== null) {
                if (typeof value._addHandler === "undefined") target[prop] = new $1d7e4a8e923a5ab3$export$9cb1e67042ada(value, prop, runHandlers);
                else {
                    value._addParentHander(prop, runHandlers);
                    target[prop] = value;
                }
                runHandlers(target, prop, value, receiver);
            } else if (typeof value === "object" && value !== null) {
                var objProp;
                for(objProp in value)if (value.hasOwnProperty(objProp) && target[prop].hasOwnProperty(objProp)) target[prop][objProp] = value[objProp];
            } else if (prop === "length" || target[prop] !== value) {
                target[prop] = value;
                runHandlers(target, prop, value, receiver);
            }
        } else if (typeof value === "object") {
            if (typeof value._addParentHander === "undefined") target[prop] = new $1d7e4a8e923a5ab3$export$9cb1e67042ada(value, prop, runHandlers);
            else {
                value._addParentHander(prop, runHandlers);
                target[prop] = value;
            }
        } else target[prop] = value;
        return true;
    }
    function getHandler(target, property, receiver) {
        if (target.hasOwnProperty(property) && typeof target[property] === "function" && property !== "_addHandler" && property !== "_addParentHander") return function() {
            runHandlers(target, property, arguments, receiver);
            return target[property].apply(this, arguments);
        };
        else return target[property];
    }
    function runHandlers(target, prop, value, receiver) {
        var propName = typeof target === "function" ? target.name : prop;
        var i;
        if (typeof Handler[propName] !== "undefined") {
            for(i = 0; i < Handler[propName].length; i++)try {
                Handler[propName][i](propName, value, receiver);
            } catch (e) {
                console.log(e);
            }
        }
        if (typeof Handler["*"] !== "undefined") {
            for(i = 0; i < Handler["*"].length; i++)try {
                Handler["*"][i](propName, value, receiver);
            } catch (e) {
                console.log(e);
            }
        }
        if (typeof name !== "undefined") {
            for(i = 0; i < parentHandlers.length; i++)try {
                parentHandlers[i].hdl(target, parentHandlers[i].name + "." + propName, value, receiver);
            } catch (e) {
                console.log(e);
            }
        }
    }
    function isArray(ar) {
        return Array.isArray(ar);
    }
    proxy = new Proxy(obj, {
        set: setHandler,
        get: getHandler
    });
    return proxy;
};

});

parcelRegister("fO6JP", function(module, exports) {

$parcel$export(module.exports, "W2gBind", function () { return $b820c094a4b292bf$export$ba9ec5408f77933a; });
let $b820c094a4b292bf$export$ba9ec5408f77933a = function(obj, cont) {
    "use strict";
    var bindings = new Map(), revBindings = new WeakMap(), templates = new WeakMap(), containers = typeof cont === "string" ? document.querySelectorAll(cont) : cont;
    bindDom(containers, null);
    obj._addHandler("*", function(prop, value) {
        if (bindings.has(prop)) renderProperty(prop);
        if (isArray(getProxyProperty(prop.substr(0, prop.lastIndexOf("."))))) renderArrayChange(prop, value);
    });
    function bindDom(bindNodes, bindPrefix, cleanDom) {
        var i, bindElements, nestedFound, k, v, j, propName, property, actionObj, template, regex, matches, bindAttr, eachIndex, renderCache = new Set(), bindCache = new Map(), cacheEle = null, arrayNode;
        for(i = 0; i < bindNodes.length; i++){
            //Protection against nested double binds
            nestedFound = false;
            if (bindNodes.length > 1) {
                for(var nf = 0; nf < bindNodes.length; nf++)if (nf !== i && bindNodes[nf].contains(bindNodes[i])) {
                    nestedFound = true;
                    break;
                }
            }
            if (nestedFound) {
                console.log("Nested bind detected:");
                console.log(bindNodes[i]);
                continue;
            }
            bindElements = getNodeList(bindNodes[i], "data-w2g", true);
            for(k = 0; k < bindElements.length; k++){
                bindAttr = bindElements[k].getAttribute("data-w2g");
                bindAttr = parseBinding(bindAttr);
                if (cleanDom === true) bindElements[k].removeAttribute("data-w2g");
                for(v = 0; v < bindAttr.length; v++)try {
                    bindAttr[v][0].split("+").forEach(function(_prop) {
                        if (_prop.indexOf("$parent.") === 0) propName = _prop.substring(8);
                        else propName = bindPrefix === null ? _prop : bindPrefix + "." + _prop;
                        actionObj = bindAttr[v][1];
                        template = null;
                        if (bindAttr[v][2]) {
                            regex = /\${(\S+)}/g;
                            template = bindAttr[v][2];
                            while((matches = regex.exec(bindAttr[v][2])) !== null)if (matches[1].indexOf("$parent.") === 0) template = template.replace(matches[1], matches[1].substring(8));
                            else template = template.replace(matches[1], (bindPrefix === null ? "" : bindPrefix + ".") + matches[1]);
                        }
                        property = getProxyProperty(propName);
                        if (typeof property !== "undefined") {
                            if (!revBindings.has(bindElements[k])) revBindings.set(bindElements[k], new Set());
                            revBindings.get(bindElements[k]).add(propName);
                            if (!bindCache.has(propName)) bindCache.set(propName, new Map());
                            if (bindCache.get(propName).has(bindElements[k])) cacheEle = bindCache.get(propName).get(bindElements[k]);
                            else {
                                cacheEle = [];
                                bindCache.get(propName).set(bindElements[k], cacheEle);
                            }
                            cacheEle.push([
                                actionObj,
                                template,
                                bindPrefix
                            ]);
                            switch(isArray(actionObj) ? actionObj[0] : actionObj){
                                case "each":
                                    if (isArray(property)) {
                                        if (bindElements[k].firstElementChild) {
                                            templates.set(bindElements[k], bindElements[k].firstElementChild);
                                            bindElements[k].removeChild(bindElements[k].firstElementChild);
                                            for(j = 0; j < property.length; j++){
                                                arrayNode = renderArrayItem(bindElements[k], j);
                                                bindDom([
                                                    arrayNode
                                                ], propName + "." + j, true);
                                            }
                                            //Skip child bindings
                                            eachIndex = k;
                                            while(templates.get(bindElements[eachIndex]).contains(bindElements[k + 1]))k++;
                                            //stop loop
                                            v = bindAttr.length;
                                        }
                                    }
                                    break;
                                case "render":
                                    //Skip child bindings
                                    eachIndex = k;
                                    while(bindElements[eachIndex].contains(bindElements[k + 1]))k++;
                                    //stop loop
                                    v = bindAttr.length;
                                    templates.set(bindElements[eachIndex], [
                                        bindElements[eachIndex].innerHTML,
                                        bindPrefix
                                    ]);
                                    bindElements[eachIndex].innerHTML = "";
                                    renderCache.add(propName);
                                    break;
                                case "value":
                                    (function(prop, ele) {
                                        function updateProp() {
                                            if (getProxyProperty(prop) !== ele.value) setProxyProperty(prop, ele.value);
                                        }
                                        ele.addEventListener("input", updateProp);
                                        ele.addEventListener("change", updateProp);
                                    })(propName, bindElements[k]);
                                    renderCache.add(propName);
                                    break;
                                case "content":
                                    (function(prop, ele) {
                                        function updateProp() {
                                            if (getProxyProperty(prop) !== ele.textContent) setProxyProperty(prop, ele.textContent);
                                        }
                                        ele.addEventListener("input", updateProp);
                                    })(propName, bindElements[k]);
                                    renderCache.add(propName);
                                    break;
                                case "volume":
                                    (function(prop, ele) {
                                        function updateProp() {
                                            if (getProxyProperty(prop) != ele.volume) setProxyProperty(prop, ele.volume);
                                        }
                                        ele.addEventListener("volumechange", updateProp);
                                    })(propName, bindElements[k]);
                                    renderCache.add(propName);
                                    break;
                                case "element":
                                    setProxyProperty(propName, bindElements[k]);
                                    break;
                                case "check":
                                    (function(prop, ele) {
                                        ele.addEventListener("change", function() {
                                            setProxyProperty(prop, ele.checked);
                                        });
                                    })(propName, bindElements[k]);
                                    renderCache.add(propName);
                                    break;
                                case "radio":
                                    (function(prop, ele) {
                                        ele.addEventListener("change", function(evt) {
                                            if (typeof evt.target.value !== "undefined") {
                                                var value = evt.target.value;
                                                value = value === "true" ? true : value;
                                                value = value === "false" ? false : value;
                                                setProxyProperty(prop, value);
                                            }
                                        });
                                    })(propName, bindElements[k]);
                                    renderCache.add(propName);
                                    break;
                                case "event":
                                    (function(prop, event, param, cancel, ele) {
                                        ele.addEventListener(event, function(evt) {
                                            if (typeof cancel === "undefined" || cancel === true) evt.preventDefault();
                                            prop.call(obj, param, getProxyProperty(bindPrefix || ""), evt);
                                        });
                                    })(property, actionObj[1], actionObj[2], actionObj[3], bindElements[k]);
                                    break;
                                case "toggle":
                                    (function(prop, ele) {
                                        ele.addEventListener("mousedown", function() {
                                            setProxyProperty(prop, !getProxyProperty(prop));
                                        });
                                    })(propName, bindElements[k]);
                                    break;
                                default:
                                    renderCache.add(propName);
                            }
                        }
                    });
                } catch (e) {
                    console.log("Can not bind " + e);
                }
            }
        }
        bindCache.forEach(function(bind, prop) {
            var map = bindings.get(prop) || new Map();
            bind.forEach(function(binding, node) {
                var b = map.get(node) || [];
                b = b.concat(binding);
                map.set(node, b);
            });
            bindings.set(prop, map);
        });
        renderCache.forEach(function(prop) {
            renderProperty(prop, bindCache.get(prop));
        });
    }
    function renderProperty(prop, bindset) {
        var binds = bindset || bindings.get(prop);
        if (binds) binds.forEach(function(_bindings, node) {
            _bindings.forEach(function(binding) {
                var action = isArray(binding[0]) ? binding[0][0] : binding[0], property = "", propval;
                if (binding[1]) {
                    property = binding[1];
                    var regex = /\${(\S+)}/g, matches;
                    while((matches = regex.exec(binding[1])) !== null){
                        propval = getProxyProperty(matches[1]);
                        if (typeof propval === "function") propval = propval(getProxyProperty(binding[2]));
                        property = property.replace(matches[0], propval || "");
                    }
                } else property = getProxyProperty(prop);
                switch(action){
                    case "text":
                        node.textContent = property;
                        break;
                    case "html":
                        node.innerHTML = property;
                        break;
                    case "value":
                        node.value = property;
                        break;
                    case "content":
                        if (node.textContent !== property) node.textContent = property;
                        break;
                    case "check":
                        node.checked = property;
                        break;
                    case "radio":
                        property = property === true ? "true" : property;
                        property = property === false ? "false" : property;
                        node.querySelectorAll("input").forEach(function(ele) {
                            ele.checked = ele.value === property;
                        });
                        break;
                    case "attr":
                        node.setAttribute(binding[0][1], property);
                        break;
                    case "attr_if":
                        if (property) node.setAttribute(binding[0][1], binding[0][2] || "");
                        else node.removeAttribute(binding[0][1]);
                        break;
                    case "property":
                        node[binding[0][1]] = property;
                        break;
                    case "visible":
                        if (isArray(property)) node.style.visibility = property.length > 0 ? "visible" : "hidden";
                        else if (isArray(binding[0])) node.style.visibility = property === binding[0][1] ? "visible" : "hidden";
                        else node.style.visibility = property ? "visible" : "hidden";
                        break;
                    case "if":
                        if (isArray(property)) node.style.display = property.length > 0 ? "" : "none";
                        else if (isArray(binding[0])) node.style.display = property === binding[0][1] ? "" : "none";
                        else node.style.display = property ? "" : "none";
                        break;
                    case "ifnot":
                        if (isArray(property)) node.style.display = property.length > 0 ? "none" : "";
                        else if (isArray(binding[0])) node.style.display = property === binding[0][1] ? "none" : "";
                        else node.style.display = property ? "none" : "";
                        break;
                    case "render":
                        if (isArray(binding[0]) ? property === binding[0][1] : property) {
                            if (node.children.length === 0) {
                                node.innerHTML = templates.get(node)[0];
                                node.style.display = "";
                                bindDom(node.children, templates.get(node)[1], true);
                            }
                        } else {
                            if (node.children.length > 0) {
                                removeBindings(node, false);
                                while(node.firstChild)node.removeChild(node.lastChild);
                            }
                            node.style.display = "none";
                        }
                        break;
                    case "style":
                        node.style[binding[0][1]] = property;
                        break;
                    case "css":
                        var callParams0 = binding[0][1][0] ? binding[0][1][0].split(" ") : [];
                        var callParams1 = binding[0][1][1] ? binding[0][1][1].split(" ") : [];
                        var classList = node.classList;
                        if (typeof binding[0][2] !== "undefined" ? binding[0][2] === property : property) {
                            classList.remove.apply(classList, callParams1);
                            classList.add.apply(classList, callParams0);
                        } else {
                            classList.remove.apply(classList, callParams0);
                            classList.add.apply(classList, callParams1);
                        }
                        break;
                    case "class":
                        var clist2 = node.classList, cls = property.split(" ").filter((item)=>item);
                        if (cls.length > 0) clist2.add.apply(clist2, cls);
                        break;
                    case "toggleClass":
                        var clList = node.classList;
                        while(clList.length > 0)clList.remove(clList.item(0));
                        clList.add.apply(clList, property.split(" "));
                        break;
                    case "mute":
                        node.muted = property;
                        break;
                    case "srcobj":
                        if (node.srcObject !== property) node.srcObject = property;
                        break;
                    case "volume":
                        node.volume = property;
                        break;
                }
            });
        });
    }
    function renderArrayChange(prop, value) {
        var arrayPropery = prop.substr(0, prop.lastIndexOf("."));
        var binds = bindings.get(arrayPropery);
        if (binds) {
            var newItem = prop.substr(prop.lastIndexOf(".") + 1, prop.length);
            binds.forEach(function(binding, node) {
                if (binding.length === 1 && binding[0][0] === "each") {
                    if (newItem === "length") renderArrayLength(node, value);
                    else {
                        if (node.children[newItem]) removeArrayItem(node, newItem);
                        bindDom([
                            renderArrayItem(node, newItem)
                        ], prop, true);
                    }
                }
            });
        }
    }
    function renderArrayItem(container, pos) {
        var node = templates.get(container).cloneNode(true);
        if (container.children.length >= pos) container.insertBefore(node, container.children[pos]);
        else container.appendChild(node);
        return node;
    }
    function renderArrayLength(container, length) {
        var index = length;
        while(typeof container.children[length] !== "undefined"){
            removeArrayItem(container, length);
            index++;
        }
    }
    function removeArrayItem(container, index) {
        var node = container.children[index];
        if (node) {
            removeBindings(node, true);
            container.removeChild(node);
        }
    }
    function setProxyProperty(key, val) {
        var parts = key.split(".");
        var pro = obj;
        var i;
        for(i = 0; i < parts.length; i++){
            if (pro.hasOwnProperty(parts[i])) {
                if (i === parts.length - 1) pro[parts[i]] = val;
                else pro = pro[parts[i]];
            } else break;
        }
    }
    function getProxyProperty(key) {
        var parts = key.split(".");
        var property = obj;
        var pro = obj;
        var i;
        for(i = 0; i < parts.length; i++)if (pro && pro.hasOwnProperty(parts[i])) {
            property = pro[parts[i]];
            pro = property;
        } else {
            property = undefined;
            break;
        }
        return property;
    }
    function getNodeList(ele, attr, self) {
        var list = [];
        if (self && ele.hasAttribute(attr)) list.push(ele);
        var nl = ele.querySelectorAll("[" + attr + "]");
        var i;
        for(i = 0; i < nl.length; i++)list.push(nl[i]);
        return list;
    }
    function parseBinding(str) {
        str = "[" + str + "]";
        str = str.replace(/'/g, '"');
        var obj = [];
        try {
            obj = JSON.parse(str);
        } catch (e) {
            console.log(str);
            console.log(e);
        }
        return obj;
    }
    function removeBindings(node, self) {
        node.querySelectorAll("*").forEach(function(n) {
            removeFromNode(n);
        });
        if (self) removeFromNode(node);
        function removeFromNode(node) {
            var binds = revBindings.get(node);
            if (binds) binds.forEach(function(prop) {
                if (bindings.has(prop)) {
                    bindings.get(prop).delete(node);
                    if (bindings.get(prop).size === 0) bindings.delete(prop);
                }
            });
        }
    }
    function isArray(ar) {
        return Array.isArray(ar);
    }
    return obj;
};

});

})();
