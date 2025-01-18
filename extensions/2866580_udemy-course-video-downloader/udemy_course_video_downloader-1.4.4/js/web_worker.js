(() => {
    var e = {
        631: (e, t, n) => {
            function r(e) {
                this.options = e || {
                    locator: {}
                };
            }
            function i() {
                this.cdata = !1;
            }
            function o(e, t) {
                t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
            }
            function a(e) {
                if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
            }
            function s(e, t, n) {
                return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
            }
            function u(e, t) {
                e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
            }
            r.prototype.parseFromString = function(e, t) {
                var n = this.options, r = new d, o = n.domBuilder || new i, s = n.errorHandler, u = n.locator, l = n.xmlns || {}, f = /\/x?html?$/.test(t), p = f ? c.entityMap : {
                    lt: "<",
                    gt: ">",
                    amp: "&",
                    quot: '"',
                    apos: "'"
                };
                return u && o.setDocumentLocator(u), r.errorHandler = function(e, t, n) {
                    if (!e) {
                        if (t instanceof i) return t;
                        e = t;
                    }
                    var r = {}, o = e instanceof Function;
                    function s(t) {
                        var i = e[t];
                        !i && o && (i = 2 == e.length ? function(n) {
                            e(t, n);
                        } : e), r[t] = i && function(e) {
                            i("[xmldom " + t + "]\t" + e + a(n));
                        } || function() {};
                    }
                    return n = n || {}, s("warning"), s("error"), s("fatalError"), r;
                }(s, o, u), r.domBuilder = n.domBuilder || o, f && (l[""] = "http://www.w3.org/1999/xhtml"), 
                l.xml = l.xml || "http://www.w3.org/XML/1998/namespace", e && "string" == typeof e ? r.parse(e, l, p) : r.errorHandler.error("invalid doc source"), 
                o.doc;
            }, i.prototype = {
                startDocument: function() {
                    this.doc = (new p).createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
                },
                startElement: function(e, t, n, r) {
                    var i = this.doc, a = i.createElementNS(e, n || t), s = r.length;
                    u(this, a), this.currentElement = a, this.locator && o(this.locator, a);
                    for (var c = 0; c < s; c++) {
                        e = r.getURI(c);
                        var l = r.getValue(c), d = (n = r.getQName(c), i.createAttributeNS(e, n));
                        this.locator && o(r.getLocator(c), d), d.value = d.nodeValue = l, a.setAttributeNode(d);
                    }
                },
                endElement: function(e, t, n) {
                    var r = this.currentElement;
                    r.tagName;
                    this.currentElement = r.parentNode;
                },
                startPrefixMapping: function(e, t) {},
                endPrefixMapping: function(e) {},
                processingInstruction: function(e, t) {
                    var n = this.doc.createProcessingInstruction(e, t);
                    this.locator && o(this.locator, n), u(this, n);
                },
                ignorableWhitespace: function(e, t, n) {},
                characters: function(e, t, n) {
                    if (e = s.apply(this, arguments)) {
                        if (this.cdata) var r = this.doc.createCDATASection(e); else r = this.doc.createTextNode(e);
                        this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), 
                        this.locator && o(this.locator, r);
                    }
                },
                skippedEntity: function(e) {},
                endDocument: function() {
                    this.doc.normalize();
                },
                setDocumentLocator: function(e) {
                    (this.locator = e) && (e.lineNumber = 0);
                },
                comment: function(e, t, n) {
                    e = s.apply(this, arguments);
                    var r = this.doc.createComment(e);
                    this.locator && o(this.locator, r), u(this, r);
                },
                startCDATA: function() {
                    this.cdata = !0;
                },
                endCDATA: function() {
                    this.cdata = !1;
                },
                startDTD: function(e, t, n) {
                    var r = this.doc.implementation;
                    if (r && r.createDocumentType) {
                        var i = r.createDocumentType(e, t, n);
                        this.locator && o(this.locator, i), u(this, i);
                    }
                },
                warning: function(e) {
                    console.warn("[xmldom warning]\t" + e, a(this.locator));
                },
                error: function(e) {
                    console.error("[xmldom error]\t" + e, a(this.locator));
                },
                fatalError: function(e) {
                    throw new f(e, this.locator);
                }
            }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, (function(e) {
                i.prototype[e] = function() {
                    return null;
                };
            }));
            var c = n(636), l = n(35), d = l.XMLReader, f = l.ParseError, p = n(55).DOMImplementation;
            n(55), t.S = r;
        },
        55: (e, t) => {
            function n(e, t) {
                for (var n in e) t[n] = e[n];
            }
            function r(e, t) {
                var r = e.prototype;
                if (!(r instanceof t)) {
                    function i() {}
                    i.prototype = t.prototype, n(r, i = new i), e.prototype = r = i;
                }
                r.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), 
                r.constructor = e);
            }
            var i = "http://www.w3.org/1999/xhtml", o = {}, a = o.ELEMENT_NODE = 1, s = o.ATTRIBUTE_NODE = 2, u = o.TEXT_NODE = 3, c = o.CDATA_SECTION_NODE = 4, l = o.ENTITY_REFERENCE_NODE = 5, d = o.ENTITY_NODE = 6, f = o.PROCESSING_INSTRUCTION_NODE = 7, p = o.COMMENT_NODE = 8, h = o.DOCUMENT_NODE = 9, m = o.DOCUMENT_TYPE_NODE = 10, g = o.DOCUMENT_FRAGMENT_NODE = 11, w = o.NOTATION_NODE = 12, v = {}, b = {}, N = (v.INDEX_SIZE_ERR = (b[1] = "Index size error", 
            1), v.DOMSTRING_SIZE_ERR = (b[2] = "DOMString size error", 2), v.HIERARCHY_REQUEST_ERR = (b[3] = "Hierarchy request error", 
            3)), x = (v.WRONG_DOCUMENT_ERR = (b[4] = "Wrong document", 4), v.INVALID_CHARACTER_ERR = (b[5] = "Invalid character", 
            5), v.NO_DATA_ALLOWED_ERR = (b[6] = "No data allowed", 6), v.NO_MODIFICATION_ALLOWED_ERR = (b[7] = "No modification allowed", 
            7), v.NOT_FOUND_ERR = (b[8] = "Not found", 8)), y = (v.NOT_SUPPORTED_ERR = (b[9] = "Not supported", 
            9), v.INUSE_ATTRIBUTE_ERR = (b[10] = "Attribute in use", 10));
            v.INVALID_STATE_ERR = (b[11] = "Invalid state", 11), v.SYNTAX_ERR = (b[12] = "Syntax error", 
            12), v.INVALID_MODIFICATION_ERR = (b[13] = "Invalid modification", 13), v.NAMESPACE_ERR = (b[14] = "Invalid namespace", 
            14), v.INVALID_ACCESS_ERR = (b[15] = "Invalid access", 15);
            function E(e, t) {
                if (t instanceof Error) var n = t; else n = this, Error.call(this, b[e]), this.message = b[e], 
                Error.captureStackTrace && Error.captureStackTrace(this, E);
                return n.code = e, t && (this.message = this.message + ": " + t), n;
            }
            function S() {}
            function O(e, t) {
                this._node = e, this._refresh = t, D(this);
            }
            function D(e) {
                var t = e._node._inc || e._node.ownerDocument._inc;
                if (e._inc != t) {
                    var r = e._refresh(e._node);
                    ie(e, "length", r.length), n(r, e), e._inc = t;
                }
            }
            function A() {}
            function I(e, t) {
                for (var n = e.length; n--; ) if (e[n] === t) return n;
            }
            function T(e, t, n, r) {
                if (r ? t[I(t, r)] = n : t[t.length++] = n, e) {
                    n.ownerElement = e;
                    var i = e.ownerDocument;
                    i && (r && k(i, e, r), function(e, t, n) {
                        e && e._inc++;
                        var r = n.namespaceURI;
                        "http://www.w3.org/2000/xmlns/" == r && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
                    }(i, e, n));
                }
            }
            function C(e, t, n) {
                var r = I(t, n);
                if (!(r >= 0)) throw E(x, new Error(e.tagName + "@" + n));
                for (var i = t.length - 1; r < i; ) t[r] = t[++r];
                if (t.length = i, e) {
                    var o = e.ownerDocument;
                    o && (k(o, e, n), n.ownerElement = null);
                }
            }
            function M(e) {
                if (this._features = {}, e) for (var t in e) this._features = e[t];
            }
            function $() {}
            function _(e) {
                return ("<" == e ? "&lt;" : ">" == e && "&gt;") || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";";
            }
            function R(e, t) {
                if (t(e)) return !0;
                if (e = e.firstChild) do {
                    if (R(e, t)) return !0;
                } while (e = e.nextSibling);
            }
            function B() {}
            function k(e, t, n, r) {
                e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""];
            }
            function U(e, t, n) {
                if (e && e._inc) {
                    e._inc++;
                    var r = t.childNodes;
                    if (n) r[r.length++] = n; else {
                        for (var i = t.firstChild, o = 0; i; ) r[o++] = i, i = i.nextSibling;
                        r.length = o;
                    }
                }
            }
            function F(e, t) {
                var n = t.previousSibling, r = t.nextSibling;
                return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, 
                U(e.ownerDocument, e), t;
            }
            function P(e, t, n) {
                var r = t.parentNode;
                if (r && r.removeChild(t), t.nodeType === g) {
                    var i = t.firstChild;
                    if (null == i) return t;
                    var o = t.lastChild;
                } else i = o = t;
                var a = n ? n.previousSibling : e.lastChild;
                i.previousSibling = a, o.nextSibling = n, a ? a.nextSibling = i : e.firstChild = i, 
                null == n ? e.lastChild = o : n.previousSibling = o;
                do {
                    i.parentNode = e;
                } while (i !== o && (i = i.nextSibling));
                return U(e.ownerDocument || e, e), t.nodeType == g && (t.firstChild = t.lastChild = null), 
                t;
            }
            function L() {
                this._nsMap = {};
            }
            function V() {}
            function W() {}
            function q() {}
            function Q() {}
            function H() {}
            function j() {}
            function K() {}
            function Y() {}
            function z() {}
            function X() {}
            function G() {}
            function Z() {}
            function J(e, t) {
                var n = [], r = 9 == this.nodeType && this.documentElement || this, i = r.prefix, o = r.namespaceURI;
                if (o && null == i && null == (i = r.lookupPrefix(o))) var a = [ {
                    namespace: o,
                    prefix: null
                } ];
                return te(this, n, e, t, a), n.join("");
            }
            function ee(e, t, n) {
                var r = e.prefix || "", i = e.namespaceURI;
                if (!r && !i) return !1;
                if ("xml" === r && "http://www.w3.org/XML/1998/namespace" === i || "http://www.w3.org/2000/xmlns/" == i) return !1;
                for (var o = n.length; o--; ) {
                    var a = n[o];
                    if (a.prefix == r) return a.namespace != i;
                }
                return !0;
            }
            function te(e, t, n, r, o) {
                if (r) {
                    if (!(e = r(e))) return;
                    if ("string" == typeof e) return void t.push(e);
                }
                switch (e.nodeType) {
                  case a:
                    o || (o = []);
                    o.length;
                    var d = e.attributes, w = d.length, v = e.firstChild, b = e.tagName;
                    n = i === e.namespaceURI || n, t.push("<", b);
                    for (var N = 0; N < w; N++) {
                        "xmlns" == (x = d.item(N)).prefix ? o.push({
                            prefix: x.localName,
                            namespace: x.value
                        }) : "xmlns" == x.nodeName && o.push({
                            prefix: "",
                            namespace: x.value
                        });
                    }
                    for (N = 0; N < w; N++) {
                        var x;
                        if (ee(x = d.item(N), 0, o)) {
                            var y = x.prefix || "", E = x.namespaceURI, S = y ? " xmlns:" + y : " xmlns";
                            t.push(S, '="', E, '"'), o.push({
                                prefix: y,
                                namespace: E
                            });
                        }
                        te(x, t, n, r, o);
                    }
                    if (ee(e, 0, o)) {
                        y = e.prefix || "";
                        if (E = e.namespaceURI) {
                            S = y ? " xmlns:" + y : " xmlns";
                            t.push(S, '="', E, '"'), o.push({
                                prefix: y,
                                namespace: E
                            });
                        }
                    }
                    if (v || n && !/^(?:meta|link|img|br|hr|input)$/i.test(b)) {
                        if (t.push(">"), n && /^script$/i.test(b)) for (;v; ) v.data ? t.push(v.data) : te(v, t, n, r, o), 
                        v = v.nextSibling; else for (;v; ) te(v, t, n, r, o), v = v.nextSibling;
                        t.push("</", b, ">");
                    } else t.push("/>");
                    return;

                  case h:
                  case g:
                    for (v = e.firstChild; v; ) te(v, t, n, r, o), v = v.nextSibling;
                    return;

                  case s:
                    return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, _), '"');

                  case u:
                    return t.push(e.data.replace(/[<&]/g, _).replace(/]]>/g, "]]&gt;"));

                  case c:
                    return t.push("<![CDATA[", e.data, "]]>");

                  case p:
                    return t.push("\x3c!--", e.data, "--\x3e");

                  case m:
                    var O = e.publicId, D = e.systemId;
                    if (t.push("<!DOCTYPE ", e.name), O) t.push(" PUBLIC ", O), D && "." != D && t.push(" ", D), 
                    t.push(">"); else if (D && "." != D) t.push(" SYSTEM ", D, ">"); else {
                        var A = e.internalSubset;
                        A && t.push(" [", A, "]"), t.push(">");
                    }
                    return;

                  case f:
                    return t.push("<?", e.target, " ", e.data, "?>");

                  case l:
                    return t.push("&", e.nodeName, ";");

                  default:
                    t.push("??", e.nodeName);
                }
            }
            function ne(e, t, n) {
                var r;
                switch (t.nodeType) {
                  case a:
                    (r = t.cloneNode(!1)).ownerDocument = e;

                  case g:
                    break;

                  case s:
                    n = !0;
                }
                if (r || (r = t.cloneNode(!1)), r.ownerDocument = e, r.parentNode = null, n) for (var i = t.firstChild; i; ) r.appendChild(ne(e, i, n)), 
                i = i.nextSibling;
                return r;
            }
            function re(e, t, n) {
                var r = new t.constructor;
                for (var i in t) {
                    var o = t[i];
                    "object" != typeof o && o != r[i] && (r[i] = o);
                }
                switch (t.childNodes && (r.childNodes = new S), r.ownerDocument = e, r.nodeType) {
                  case a:
                    var u = t.attributes, c = r.attributes = new A, l = u.length;
                    c._ownerElement = r;
                    for (var d = 0; d < l; d++) r.setAttributeNode(re(e, u.item(d), !0));
                    break;

                  case s:
                    n = !0;
                }
                if (n) for (var f = t.firstChild; f; ) r.appendChild(re(e, f, n)), f = f.nextSibling;
                return r;
            }
            function ie(e, t, n) {
                e[t] = n;
            }
            E.prototype = Error.prototype, n(v, E), S.prototype = {
                length: 0,
                item: function(e) {
                    return this[e] || null;
                },
                toString: function(e, t) {
                    for (var n = [], r = 0; r < this.length; r++) te(this[r], n, e, t);
                    return n.join("");
                }
            }, O.prototype.item = function(e) {
                return D(this), this[e];
            }, r(O, S), A.prototype = {
                length: 0,
                item: S.prototype.item,
                getNamedItem: function(e) {
                    for (var t = this.length; t--; ) {
                        var n = this[t];
                        if (n.nodeName == e) return n;
                    }
                },
                setNamedItem: function(e) {
                    var t = e.ownerElement;
                    if (t && t != this._ownerElement) throw new E(y);
                    var n = this.getNamedItem(e.nodeName);
                    return T(this._ownerElement, this, e, n), n;
                },
                setNamedItemNS: function(e) {
                    var t, n = e.ownerElement;
                    if (n && n != this._ownerElement) throw new E(y);
                    return t = this.getNamedItemNS(e.namespaceURI, e.localName), T(this._ownerElement, this, e, t), 
                    t;
                },
                removeNamedItem: function(e) {
                    var t = this.getNamedItem(e);
                    return C(this._ownerElement, this, t), t;
                },
                removeNamedItemNS: function(e, t) {
                    var n = this.getNamedItemNS(e, t);
                    return C(this._ownerElement, this, n), n;
                },
                getNamedItemNS: function(e, t) {
                    for (var n = this.length; n--; ) {
                        var r = this[n];
                        if (r.localName == t && r.namespaceURI == e) return r;
                    }
                    return null;
                }
            }, M.prototype = {
                hasFeature: function(e, t) {
                    var n = this._features[e.toLowerCase()];
                    return !(!n || t && !(t in n));
                },
                createDocument: function(e, t, n) {
                    var r = new B;
                    if (r.implementation = this, r.childNodes = new S, r.doctype = n, n && r.appendChild(n), 
                    t) {
                        var i = r.createElementNS(e, t);
                        r.appendChild(i);
                    }
                    return r;
                },
                createDocumentType: function(e, t, n) {
                    var r = new j;
                    return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r;
                }
            }, $.prototype = {
                firstChild: null,
                lastChild: null,
                previousSibling: null,
                nextSibling: null,
                attributes: null,
                parentNode: null,
                childNodes: null,
                ownerDocument: null,
                nodeValue: null,
                namespaceURI: null,
                prefix: null,
                localName: null,
                insertBefore: function(e, t) {
                    return P(this, e, t);
                },
                replaceChild: function(e, t) {
                    this.insertBefore(e, t), t && this.removeChild(t);
                },
                removeChild: function(e) {
                    return F(this, e);
                },
                appendChild: function(e) {
                    return this.insertBefore(e, null);
                },
                hasChildNodes: function() {
                    return null != this.firstChild;
                },
                cloneNode: function(e) {
                    return re(this.ownerDocument || this, this, e);
                },
                normalize: function() {
                    for (var e = this.firstChild; e; ) {
                        var t = e.nextSibling;
                        t && t.nodeType == u && e.nodeType == u ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), 
                        e = t);
                    }
                },
                isSupported: function(e, t) {
                    return this.ownerDocument.implementation.hasFeature(e, t);
                },
                hasAttributes: function() {
                    return this.attributes.length > 0;
                },
                lookupPrefix: function(e) {
                    for (var t = this; t; ) {
                        var n = t._nsMap;
                        if (n) for (var r in n) if (n[r] == e) return r;
                        t = t.nodeType == s ? t.ownerDocument : t.parentNode;
                    }
                    return null;
                },
                lookupNamespaceURI: function(e) {
                    for (var t = this; t; ) {
                        var n = t._nsMap;
                        if (n && e in n) return n[e];
                        t = t.nodeType == s ? t.ownerDocument : t.parentNode;
                    }
                    return null;
                },
                isDefaultNamespace: function(e) {
                    return null == this.lookupPrefix(e);
                }
            }, n(o, $), n(o, $.prototype), B.prototype = {
                nodeName: "#document",
                nodeType: h,
                doctype: null,
                documentElement: null,
                _inc: 1,
                insertBefore: function(e, t) {
                    if (e.nodeType == g) {
                        for (var n = e.firstChild; n; ) {
                            var r = n.nextSibling;
                            this.insertBefore(n, t), n = r;
                        }
                        return e;
                    }
                    return null == this.documentElement && e.nodeType == a && (this.documentElement = e), 
                    P(this, e, t), e.ownerDocument = this, e;
                },
                removeChild: function(e) {
                    return this.documentElement == e && (this.documentElement = null), F(this, e);
                },
                importNode: function(e, t) {
                    return ne(this, e, t);
                },
                getElementById: function(e) {
                    var t = null;
                    return R(this.documentElement, (function(n) {
                        if (n.nodeType == a && n.getAttribute("id") == e) return t = n, !0;
                    })), t;
                },
                getElementsByClassName: function(e) {
                    var t = new RegExp("(^|\\s)" + e + "(\\s|$)");
                    return new O(this, (function(e) {
                        var n = [];
                        return R(e.documentElement, (function(r) {
                            r !== e && r.nodeType == a && t.test(r.getAttribute("class")) && n.push(r);
                        })), n;
                    }));
                },
                createElement: function(e) {
                    var t = new L;
                    return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new S, 
                    (t.attributes = new A)._ownerElement = t, t;
                },
                createDocumentFragment: function() {
                    var e = new X;
                    return e.ownerDocument = this, e.childNodes = new S, e;
                },
                createTextNode: function(e) {
                    var t = new q;
                    return t.ownerDocument = this, t.appendData(e), t;
                },
                createComment: function(e) {
                    var t = new Q;
                    return t.ownerDocument = this, t.appendData(e), t;
                },
                createCDATASection: function(e) {
                    var t = new H;
                    return t.ownerDocument = this, t.appendData(e), t;
                },
                createProcessingInstruction: function(e, t) {
                    var n = new G;
                    return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, 
                    n;
                },
                createAttribute: function(e) {
                    var t = new V;
                    return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, 
                    t;
                },
                createEntityReference: function(e) {
                    var t = new z;
                    return t.ownerDocument = this, t.nodeName = e, t;
                },
                createElementNS: function(e, t) {
                    var n = new L, r = t.split(":"), i = n.attributes = new A;
                    return n.childNodes = new S, n.ownerDocument = this, n.nodeName = t, n.tagName = t, 
                    n.namespaceURI = e, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, 
                    i._ownerElement = n, n;
                },
                createAttributeNS: function(e, t) {
                    var n = new V, r = t.split(":");
                    return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 
                    2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
                }
            }, r(B, $), L.prototype = {
                nodeType: a,
                hasAttribute: function(e) {
                    return null != this.getAttributeNode(e);
                },
                getAttribute: function(e) {
                    var t = this.getAttributeNode(e);
                    return t && t.value || "";
                },
                getAttributeNode: function(e) {
                    return this.attributes.getNamedItem(e);
                },
                setAttribute: function(e, t) {
                    var n = this.ownerDocument.createAttribute(e);
                    n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
                },
                removeAttribute: function(e) {
                    var t = this.getAttributeNode(e);
                    t && this.removeAttributeNode(t);
                },
                appendChild: function(e) {
                    return e.nodeType === g ? this.insertBefore(e, null) : function(e, t) {
                        var n = t.parentNode;
                        if (n) {
                            var r = e.lastChild;
                            n.removeChild(t), r = e.lastChild;
                        }
                        return r = e.lastChild, t.parentNode = e, t.previousSibling = r, t.nextSibling = null, 
                        r ? r.nextSibling = t : e.firstChild = t, e.lastChild = t, U(e.ownerDocument, e, t), 
                        t;
                    }(this, e);
                },
                setAttributeNode: function(e) {
                    return this.attributes.setNamedItem(e);
                },
                setAttributeNodeNS: function(e) {
                    return this.attributes.setNamedItemNS(e);
                },
                removeAttributeNode: function(e) {
                    return this.attributes.removeNamedItem(e.nodeName);
                },
                removeAttributeNS: function(e, t) {
                    var n = this.getAttributeNodeNS(e, t);
                    n && this.removeAttributeNode(n);
                },
                hasAttributeNS: function(e, t) {
                    return null != this.getAttributeNodeNS(e, t);
                },
                getAttributeNS: function(e, t) {
                    var n = this.getAttributeNodeNS(e, t);
                    return n && n.value || "";
                },
                setAttributeNS: function(e, t, n) {
                    var r = this.ownerDocument.createAttributeNS(e, t);
                    r.value = r.nodeValue = "" + n, this.setAttributeNode(r);
                },
                getAttributeNodeNS: function(e, t) {
                    return this.attributes.getNamedItemNS(e, t);
                },
                getElementsByTagName: function(e) {
                    return new O(this, (function(t) {
                        var n = [];
                        return R(t, (function(r) {
                            r === t || r.nodeType != a || "*" !== e && r.tagName != e || n.push(r);
                        })), n;
                    }));
                },
                getElementsByTagNameNS: function(e, t) {
                    return new O(this, (function(n) {
                        var r = [];
                        return R(n, (function(i) {
                            i === n || i.nodeType !== a || "*" !== e && i.namespaceURI !== e || "*" !== t && i.localName != t || r.push(i);
                        })), r;
                    }));
                }
            }, B.prototype.getElementsByTagName = L.prototype.getElementsByTagName, B.prototype.getElementsByTagNameNS = L.prototype.getElementsByTagNameNS, 
            r(L, $), V.prototype.nodeType = s, r(V, $), W.prototype = {
                data: "",
                substringData: function(e, t) {
                    return this.data.substring(e, e + t);
                },
                appendData: function(e) {
                    e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
                },
                insertData: function(e, t) {
                    this.replaceData(e, 0, t);
                },
                appendChild: function(e) {
                    throw new Error(b[N]);
                },
                deleteData: function(e, t) {
                    this.replaceData(e, t, "");
                },
                replaceData: function(e, t, n) {
                    n = this.data.substring(0, e) + n + this.data.substring(e + t), this.nodeValue = this.data = n, 
                    this.length = n.length;
                }
            }, r(W, $), q.prototype = {
                nodeName: "#text",
                nodeType: u,
                splitText: function(e) {
                    var t = this.data, n = t.substring(e);
                    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
                    var r = this.ownerDocument.createTextNode(n);
                    return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
                }
            }, r(q, W), Q.prototype = {
                nodeName: "#comment",
                nodeType: p
            }, r(Q, W), H.prototype = {
                nodeName: "#cdata-section",
                nodeType: c
            }, r(H, W), j.prototype.nodeType = m, r(j, $), K.prototype.nodeType = w, r(K, $), 
            Y.prototype.nodeType = d, r(Y, $), z.prototype.nodeType = l, r(z, $), X.prototype.nodeName = "#document-fragment", 
            X.prototype.nodeType = g, r(X, $), G.prototype.nodeType = f, r(G, $), Z.prototype.serializeToString = function(e, t, n) {
                return J.call(e, t, n);
            }, $.prototype.toString = J;
            try {
                if (Object.defineProperty) {
                    function oe(e) {
                        switch (e.nodeType) {
                          case a:
                          case g:
                            var t = [];
                            for (e = e.firstChild; e; ) 7 !== e.nodeType && 8 !== e.nodeType && t.push(oe(e)), 
                            e = e.nextSibling;
                            return t.join("");

                          default:
                            return e.nodeValue;
                        }
                    }
                    Object.defineProperty(O.prototype, "length", {
                        get: function() {
                            return D(this), this.$$length;
                        }
                    }), Object.defineProperty($.prototype, "textContent", {
                        get: function() {
                            return oe(this);
                        },
                        set: function(e) {
                            switch (this.nodeType) {
                              case a:
                              case g:
                                for (;this.firstChild; ) this.removeChild(this.firstChild);
                                (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                                break;

                              default:
                                this.data = e, this.value = e, this.nodeValue = e;
                            }
                        }
                    }), ie = function(e, t, n) {
                        e["$$" + t] = n;
                    };
                }
            } catch (ae) {}
            t.DOMImplementation = M;
        },
        636: (e, t) => {
            t.entityMap = {
                lt: "<",
                gt: ">",
                amp: "&",
                quot: '"',
                apos: "'",
                Agrave: "À",
                Aacute: "Á",
                Acirc: "Â",
                Atilde: "Ã",
                Auml: "Ä",
                Aring: "Å",
                AElig: "Æ",
                Ccedil: "Ç",
                Egrave: "È",
                Eacute: "É",
                Ecirc: "Ê",
                Euml: "Ë",
                Igrave: "Ì",
                Iacute: "Í",
                Icirc: "Î",
                Iuml: "Ï",
                ETH: "Ð",
                Ntilde: "Ñ",
                Ograve: "Ò",
                Oacute: "Ó",
                Ocirc: "Ô",
                Otilde: "Õ",
                Ouml: "Ö",
                Oslash: "Ø",
                Ugrave: "Ù",
                Uacute: "Ú",
                Ucirc: "Û",
                Uuml: "Ü",
                Yacute: "Ý",
                THORN: "Þ",
                szlig: "ß",
                agrave: "à",
                aacute: "á",
                acirc: "â",
                atilde: "ã",
                auml: "ä",
                aring: "å",
                aelig: "æ",
                ccedil: "ç",
                egrave: "è",
                eacute: "é",
                ecirc: "ê",
                euml: "ë",
                igrave: "ì",
                iacute: "í",
                icirc: "î",
                iuml: "ï",
                eth: "ð",
                ntilde: "ñ",
                ograve: "ò",
                oacute: "ó",
                ocirc: "ô",
                otilde: "õ",
                ouml: "ö",
                oslash: "ø",
                ugrave: "ù",
                uacute: "ú",
                ucirc: "û",
                uuml: "ü",
                yacute: "ý",
                thorn: "þ",
                yuml: "ÿ",
                nbsp: " ",
                iexcl: "¡",
                cent: "¢",
                pound: "£",
                curren: "¤",
                yen: "¥",
                brvbar: "¦",
                sect: "§",
                uml: "¨",
                copy: "©",
                ordf: "ª",
                laquo: "«",
                not: "¬",
                shy: "­­",
                reg: "®",
                macr: "¯",
                deg: "°",
                plusmn: "±",
                sup2: "²",
                sup3: "³",
                acute: "´",
                micro: "µ",
                para: "¶",
                middot: "·",
                cedil: "¸",
                sup1: "¹",
                ordm: "º",
                raquo: "»",
                frac14: "¼",
                frac12: "½",
                frac34: "¾",
                iquest: "¿",
                times: "×",
                divide: "÷",
                forall: "∀",
                part: "∂",
                exist: "∃",
                empty: "∅",
                nabla: "∇",
                isin: "∈",
                notin: "∉",
                ni: "∋",
                prod: "∏",
                sum: "∑",
                minus: "−",
                lowast: "∗",
                radic: "√",
                prop: "∝",
                infin: "∞",
                ang: "∠",
                and: "∧",
                or: "∨",
                cap: "∩",
                cup: "∪",
                int: "∫",
                there4: "∴",
                sim: "∼",
                cong: "≅",
                asymp: "≈",
                ne: "≠",
                equiv: "≡",
                le: "≤",
                ge: "≥",
                sub: "⊂",
                sup: "⊃",
                nsub: "⊄",
                sube: "⊆",
                supe: "⊇",
                oplus: "⊕",
                otimes: "⊗",
                perp: "⊥",
                sdot: "⋅",
                Alpha: "Α",
                Beta: "Β",
                Gamma: "Γ",
                Delta: "Δ",
                Epsilon: "Ε",
                Zeta: "Ζ",
                Eta: "Η",
                Theta: "Θ",
                Iota: "Ι",
                Kappa: "Κ",
                Lambda: "Λ",
                Mu: "Μ",
                Nu: "Ν",
                Xi: "Ξ",
                Omicron: "Ο",
                Pi: "Π",
                Rho: "Ρ",
                Sigma: "Σ",
                Tau: "Τ",
                Upsilon: "Υ",
                Phi: "Φ",
                Chi: "Χ",
                Psi: "Ψ",
                Omega: "Ω",
                alpha: "α",
                beta: "β",
                gamma: "γ",
                delta: "δ",
                epsilon: "ε",
                zeta: "ζ",
                eta: "η",
                theta: "θ",
                iota: "ι",
                kappa: "κ",
                lambda: "λ",
                mu: "μ",
                nu: "ν",
                xi: "ξ",
                omicron: "ο",
                pi: "π",
                rho: "ρ",
                sigmaf: "ς",
                sigma: "σ",
                tau: "τ",
                upsilon: "υ",
                phi: "φ",
                chi: "χ",
                psi: "ψ",
                omega: "ω",
                thetasym: "ϑ",
                upsih: "ϒ",
                piv: "ϖ",
                OElig: "Œ",
                oelig: "œ",
                Scaron: "Š",
                scaron: "š",
                Yuml: "Ÿ",
                fnof: "ƒ",
                circ: "ˆ",
                tilde: "˜",
                ensp: " ",
                emsp: " ",
                thinsp: " ",
                zwnj: "‌",
                zwj: "‍",
                lrm: "‎",
                rlm: "‏",
                ndash: "–",
                mdash: "—",
                lsquo: "‘",
                rsquo: "’",
                sbquo: "‚",
                ldquo: "“",
                rdquo: "”",
                bdquo: "„",
                dagger: "†",
                Dagger: "‡",
                bull: "•",
                hellip: "…",
                permil: "‰",
                prime: "′",
                Prime: "″",
                lsaquo: "‹",
                rsaquo: "›",
                oline: "‾",
                euro: "€",
                trade: "™",
                larr: "←",
                uarr: "↑",
                rarr: "→",
                darr: "↓",
                harr: "↔",
                crarr: "↵",
                lceil: "⌈",
                rceil: "⌉",
                lfloor: "⌊",
                rfloor: "⌋",
                loz: "◊",
                spades: "♠",
                clubs: "♣",
                hearts: "♥",
                diams: "♦"
            };
        },
        35: (e, t) => {
            var n = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, r = new RegExp("[\\-\\.0-9" + n.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), i = new RegExp("^" + n.source + r.source + "*(?::" + n.source + r.source + "*)?$"), o = 0, a = 1, s = 2, u = 3, c = 4, l = 5, d = 6, f = 7;
            function p(e, t) {
                this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, p);
            }
            function h() {}
            function m(e, t) {
                return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
            }
            function g(e, t, n, r, i, p) {
                function h(e, t, r) {
                    e in n.attributeNames && p.fatalError("Attribute " + e + " redefined"), n.addValue(e, t, r);
                }
                for (var m, g = ++t, w = o; ;) {
                    var v = e.charAt(g);
                    switch (v) {
                      case "=":
                        if (w === a) m = e.slice(t, g), w = u; else {
                            if (w !== s) throw new Error("attribute equal must after attrName");
                            w = u;
                        }
                        break;

                      case "'":
                      case '"':
                        if (w === u || w === a) {
                            if (w === a && (p.warning('attribute value must after "="'), m = e.slice(t, g)), 
                            t = g + 1, !((g = e.indexOf(v, t)) > 0)) throw new Error("attribute value no end '" + v + "' match");
                            h(m, b = e.slice(t, g).replace(/&#?\w+;/g, i), t - 1), w = l;
                        } else {
                            if (w != c) throw new Error('attribute value must after "="');
                            h(m, b = e.slice(t, g).replace(/&#?\w+;/g, i), t), p.warning('attribute "' + m + '" missed start quot(' + v + ")!!"), 
                            t = g + 1, w = l;
                        }
                        break;

                      case "/":
                        switch (w) {
                          case o:
                            n.setTagName(e.slice(t, g));

                          case l:
                          case d:
                          case f:
                            w = f, n.closed = !0;

                          case c:
                          case a:
                          case s:
                            break;

                          default:
                            throw new Error("attribute invalid close char('/')");
                        }
                        break;

                      case "":
                        return p.error("unexpected end of input"), w == o && n.setTagName(e.slice(t, g)), 
                        g;

                      case ">":
                        switch (w) {
                          case o:
                            n.setTagName(e.slice(t, g));

                          case l:
                          case d:
                          case f:
                            break;

                          case c:
                          case a:
                            "/" === (b = e.slice(t, g)).slice(-1) && (n.closed = !0, b = b.slice(0, -1));

                          case s:
                            w === s && (b = m), w == c ? (p.warning('attribute "' + b + '" missed quot(")!'), 
                            h(m, b.replace(/&#?\w+;/g, i), t)) : ("http://www.w3.org/1999/xhtml" === r[""] && b.match(/^(?:disabled|checked|selected)$/i) || p.warning('attribute "' + b + '" missed value!! "' + b + '" instead!!'), 
                            h(b, b, t));
                            break;

                          case u:
                            throw new Error("attribute value missed!!");
                        }
                        return g;

                      case "":
                        v = " ";

                      default:
                        if (v <= " ") switch (w) {
                          case o:
                            n.setTagName(e.slice(t, g)), w = d;
                            break;

                          case a:
                            m = e.slice(t, g), w = s;
                            break;

                          case c:
                            var b = e.slice(t, g).replace(/&#?\w+;/g, i);
                            p.warning('attribute "' + b + '" missed quot(")!!'), h(m, b, t);

                          case l:
                            w = d;
                        } else switch (w) {
                          case s:
                            n.tagName;
                            "http://www.w3.org/1999/xhtml" === r[""] && m.match(/^(?:disabled|checked|selected)$/i) || p.warning('attribute "' + m + '" missed value!! "' + m + '" instead2!!'), 
                            h(m, m, t), t = g, w = a;
                            break;

                          case l:
                            p.warning('attribute space is required"' + m + '"!!');

                          case d:
                            w = a, t = g;
                            break;

                          case u:
                            w = c, t = g;
                            break;

                          case f:
                            throw new Error("elements closed character '/' and '>' must be connected to");
                        }
                    }
                    g++;
                }
            }
            function w(e, t, n) {
                for (var r = e.tagName, i = null, o = e.length; o--; ) {
                    var a = e[o], s = a.qName, u = a.value;
                    if ((f = s.indexOf(":")) > 0) var c = a.prefix = s.slice(0, f), l = s.slice(f + 1), d = "xmlns" === c && l; else l = s, 
                    c = null, d = "xmlns" === s && "";
                    a.localName = l, !1 !== d && (null == i && (i = {}, N(n, n = {})), n[d] = i[d] = u, 
                    a.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(d, u));
                }
                for (o = e.length; o--; ) {
                    (c = (a = e[o]).prefix) && ("xml" === c && (a.uri = "http://www.w3.org/XML/1998/namespace"), 
                    "xmlns" !== c && (a.uri = n[c || ""]));
                }
                var f;
                (f = r.indexOf(":")) > 0 ? (c = e.prefix = r.slice(0, f), l = e.localName = r.slice(f + 1)) : (c = null, 
                l = e.localName = r);
                var p = e.uri = n[c || ""];
                if (t.startElement(p, l, r, e), !e.closed) return e.currentNSMap = n, e.localNSMap = i, 
                !0;
                if (t.endElement(p, l, r), i) for (c in i) t.endPrefixMapping(c);
            }
            function v(e, t, n, r, i) {
                if (/^(?:script|textarea)$/i.test(n)) {
                    var o = e.indexOf("</" + n + ">", t), a = e.substring(t + 1, o);
                    if (/[&<]/.test(a)) return /^script$/i.test(n) ? (i.characters(a, 0, a.length), 
                    o) : (a = a.replace(/&#?\w+;/g, r), i.characters(a, 0, a.length), o);
                }
                return t + 1;
            }
            function b(e, t, n, r) {
                var i = r[n];
                return null == i && ((i = e.lastIndexOf("</" + n + ">")) < t && (i = e.lastIndexOf("</" + n)), 
                r[n] = i), i < t;
            }
            function N(e, t) {
                for (var n in e) t[n] = e[n];
            }
            function x(e, t, n, r) {
                if ("-" === e.charAt(t + 2)) return "-" === e.charAt(t + 3) ? (i = e.indexOf("--\x3e", t + 4)) > t ? (n.comment(e, t + 4, i - t - 4), 
                i + 3) : (r.error("Unclosed comment"), -1) : -1;
                if ("CDATA[" == e.substr(t + 3, 6)) {
                    var i = e.indexOf("]]>", t + 9);
                    return n.startCDATA(), n.characters(e, t + 9, i - t - 9), n.endCDATA(), i + 3;
                }
                var o = function(e, t) {
                    var n, r = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                    i.lastIndex = t, i.exec(e);
                    for (;n = i.exec(e); ) if (r.push(n), n[1]) return r;
                }(e, t), a = o.length;
                if (a > 1 && /!doctype/i.test(o[0][0])) {
                    var s = o[1][0], u = !1, c = !1;
                    a > 3 && (/^public$/i.test(o[2][0]) ? (u = o[3][0], c = a > 4 && o[4][0]) : /^system$/i.test(o[2][0]) && (c = o[3][0]));
                    var l = o[a - 1];
                    return n.startDTD(s, u, c), n.endDTD(), l.index + l[0].length;
                }
                return -1;
            }
            function y(e, t, n) {
                var r = e.indexOf("?>", t);
                if (r) {
                    var i = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                    if (i) {
                        i[0].length;
                        return n.processingInstruction(i[1], i[2]), r + 2;
                    }
                    return -1;
                }
                return -1;
            }
            function E() {
                this.attributeNames = {};
            }
            p.prototype = new Error, p.prototype.name = p.name, h.prototype = {
                parse: function(e, t, n) {
                    var r = this.domBuilder;
                    r.startDocument(), N(t, t = {}), function(e, t, n, r, i) {
                        function o(e) {
                            if (e > 65535) {
                                var t = 55296 + ((e -= 65536) >> 10), n = 56320 + (1023 & e);
                                return String.fromCharCode(t, n);
                            }
                            return String.fromCharCode(e);
                        }
                        function a(e) {
                            var t = e.slice(1, -1);
                            return t in n ? n[t] : "#" === t.charAt(0) ? o(parseInt(t.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + e), 
                            e);
                        }
                        function s(t) {
                            if (t > S) {
                                var n = e.substring(S, t).replace(/&#?\w+;/g, a);
                                f && u(S), r.characters(n, 0, t - S), S = t;
                            }
                        }
                        function u(t, n) {
                            for (;t >= l && (n = d.exec(e)); ) c = n.index, l = c + n[0].length, f.lineNumber++;
                            f.columnNumber = t - c + 1;
                        }
                        var c = 0, l = 0, d = /.*(?:\r\n?|\n)|.*$/g, f = r.locator, h = [ {
                            currentNSMap: t
                        } ], N = {}, S = 0;
                        for (;;) {
                            try {
                                var O = e.indexOf("<", S);
                                if (O < 0) {
                                    if (!e.substr(S).match(/^\s*$/)) {
                                        var D = r.doc, A = D.createTextNode(e.substr(S));
                                        D.appendChild(A), r.currentElement = A;
                                    }
                                    return;
                                }
                                switch (O > S && s(O), e.charAt(O + 1)) {
                                  case "/":
                                    var I = e.indexOf(">", O + 3), T = e.substring(O + 2, I), C = h.pop();
                                    I < 0 ? (T = e.substring(O + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + T + " is not complete:" + C.tagName), 
                                    I = O + 1 + T.length) : T.match(/\s</) && (T = T.replace(/[\s<].*/, ""), i.error("end tag name: " + T + " maybe not complete"), 
                                    I = O + 1 + T.length);
                                    var M = C.localNSMap, $ = C.tagName == T;
                                    if ($ || C.tagName && C.tagName.toLowerCase() == T.toLowerCase()) {
                                        if (r.endElement(C.uri, C.localName, T), M) for (var _ in M) r.endPrefixMapping(_);
                                        $ || i.fatalError("end tag name: " + T + " is not match the current start tagName:" + C.tagName);
                                    } else h.push(C);
                                    I++;
                                    break;

                                  case "?":
                                    f && u(O), I = y(e, O, r);
                                    break;

                                  case "!":
                                    f && u(O), I = x(e, O, r, i);
                                    break;

                                  default:
                                    f && u(O);
                                    var R = new E, B = h[h.length - 1].currentNSMap, k = (I = g(e, O, R, B, a, i), R.length);
                                    if (!R.closed && b(e, I, R.tagName, N) && (R.closed = !0, n.nbsp || i.warning("unclosed xml attribute")), 
                                    f && k) {
                                        for (var U = m(f, {}), F = 0; F < k; F++) {
                                            var P = R[F];
                                            u(P.offset), P.locator = m(f, {});
                                        }
                                        r.locator = U, w(R, r, B) && h.push(R), r.locator = f;
                                    } else w(R, r, B) && h.push(R);
                                    "http://www.w3.org/1999/xhtml" !== R.uri || R.closed ? I++ : I = v(e, I, R.tagName, a, r);
                                }
                            } catch (e) {
                                if (e instanceof p) throw e;
                                i.error("element parse error: " + e), I = -1;
                            }
                            I > S ? S = I : s(Math.max(O, S) + 1);
                        }
                    }(e, t, n, r, this.errorHandler), r.endDocument();
                }
            }, E.prototype = {
                setTagName: function(e) {
                    if (!i.test(e)) throw new Error("invalid tagName:" + e);
                    this.tagName = e;
                },
                addValue: function(e, t, n) {
                    if (!i.test(e)) throw new Error("invalid attribute:" + e);
                    this.attributeNames[e] = this.length, this[this.length++] = {
                        qName: e,
                        value: t,
                        offset: n
                    };
                },
                length: 0,
                getLocalName: function(e) {
                    return this[e].localName;
                },
                getLocator: function(e) {
                    return this[e].locator;
                },
                getQName: function(e) {
                    return this[e].qName;
                },
                getURI: function(e) {
                    return this[e].uri;
                },
                getValue: function(e) {
                    return this[e].value;
                }
            }, t.XMLReader = h, t.ParseError = p;
        }
    }, t = {};
    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r](o, o.exports, n), o.exports;
    }
    (() => {
        "use strict";
        function e(e, t, n, r) {
            return new (n || (n = Promise))((function(i, o) {
                function a(e) {
                    try {
                        u(r.next(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function s(e) {
                    try {
                        u(r.throw(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function u(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t);
                    }))).then(a, s);
                }
                u((r = r.apply(e, t || [])).next());
            }));
        }
        Object.create;
        Object.create;
        "function" == typeof SuppressedError && SuppressedError;
        var t = n(631);
        function r(n) {
            return e(this, void 0, void 0, (function*() {
                let r = [], o = [];
                const a = yield fetch(n);
                if (!a.ok) throw new Error(`Failed to fetch MPD file: ${a.status}`);
                const s = yield a.text(), u = (new t.S).parseFromString(s, "application/xml"), c = "urn:mpeg:dash:schema:mpd:2011", {bestVideoId: l, bestAudioId: d} = yield function(t, n) {
                    return e(this, void 0, void 0, (function*() {
                        let e = null, r = null, i = 0, o = {
                            width: 0,
                            height: 0
                        };
                        const a = t.getElementsByTagNameNS(n, "AdaptationSet");
                        return Array.from(a).forEach((t => {
                            const a = t.getAttribute("mimeType");
                            if (a && a.includes("audio")) {
                                const r = t.getElementsByTagNameNS(n, "Representation");
                                Array.from(r).forEach((t => {
                                    const n = parseInt(t.getAttribute("bandwidth") || "0");
                                    n > i && (i = n, e = t.getAttribute("id"));
                                }));
                            } else if (a && a.includes("video")) {
                                const e = t.getElementsByTagNameNS(n, "Representation");
                                Array.from(e).forEach((e => {
                                    const t = parseInt(e.getAttribute("width") || "0"), n = parseInt(e.getAttribute("height") || "0");
                                    (t > o.width || n > o.height) && (o = {
                                        width: t,
                                        height: n
                                    }, r = e.getAttribute("id"));
                                }));
                            }
                        })), {
                            bestVideoId: r,
                            bestAudioId: e
                        };
                    }));
                }(u, c), f = u.getElementsByTagNameNS(c, "AdaptationSet");
                return Array.from(f).forEach((e => {
                    const t = e.getAttribute("mimeType");
                    "video/mp4" === t ? r = i(e, c, l) : "audio/mp4" === t && (o = i(e, c, d));
                })), {
                    videoSegments: r,
                    audioSegments: o
                };
            }));
        }
        function i(e, t, n) {
            const r = [], i = Array.from(e.getElementsByTagNameNS(t, "Representation")).find((e => e.getAttribute("id") === n));
            if (i) {
                const e = i.getElementsByTagNameNS(t, "SegmentTemplate")[0];
                if (!e) throw new Error("SegmentTemplate element not found");
                const n = e.getAttribute("media"), o = e.getAttribute("initialization");
                r.push(o);
                const a = i.getElementsByTagNameNS(t, "SegmentTimeline")[0];
                if (a) {
                    let e = 0;
                    const i = a.getElementsByTagNameNS(t, "S");
                    Array.from(i).forEach((t => {
                        const n = parseInt(t.getAttribute("r") || "0");
                        e += n + 1;
                    }));
                    for (let t = 0; t < e; t++) {
                        const e = r.length, t = n.replace(/\$Number\$/, e);
                        r.push(t);
                    }
                }
            }
            return r;
        }
        var o, a, s, u, c, l, d, f, p, h, m, g = function() {
            var e = "undefined" != typeof self ? self : this, t = {
                navigator: void 0 !== e.navigator ? e.navigator : {},
                infoMap: {
                    engine: [ "WebKit", "Trident", "Gecko", "Presto" ],
                    browser: [ "Safari", "Chrome", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Arora", "Lunascape", "QupZilla", "Coc Coc", "Kindle", "Iceweasel", "Konqueror", "Iceape", "SeaMonkey", "Epiphany", "360", "360SE", "360EE", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "2345Explorer", "TheWorld", "XiaoMi", "Quark", "Qiyu", "Wechat", , "WechatWork", "Taobao", "Alipay", "Weibo", "Douban", "Suning", "iQiYi" ],
                    os: [ "Windows", "Linux", "Mac OS", "Android", "Ubuntu", "FreeBSD", "Debian", "iOS", "Windows Phone", "BlackBerry", "MeeGo", "Symbian", "Chrome OS", "WebOS" ],
                    device: [ "Mobile", "Tablet", "iPad" ]
                }
            }, n = {
                createUUID: function() {
                    for (var e = [], t = "0123456789abcdef", n = 0; n < 36; n++) e[n] = t.substr(Math.floor(16 * Math.random()), 1);
                    return e[14] = "4", e[19] = t.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", 
                    e.join("");
                },
                getDate: function() {
                    var e = new Date, t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), i = e.getHours(), o = e.getMinutes(), a = e.getSeconds();
                    return "".concat(t.toString(), "/").concat(n.toString(), "/").concat(r.toString(), " ").concat(i.toString(), ":").concat(o.toString(), ":").concat(a.toString());
                },
                getMatchMap: function(e) {
                    return {
                        Trident: e.indexOf("Trident") > -1 || e.indexOf("NET CLR") > -1,
                        Presto: e.indexOf("Presto") > -1,
                        WebKit: e.indexOf("AppleWebKit") > -1,
                        Gecko: e.indexOf("Gecko/") > -1,
                        Safari: e.indexOf("Safari") > -1,
                        Chrome: e.indexOf("Chrome") > -1 || e.indexOf("CriOS") > -1,
                        IE: e.indexOf("MSIE") > -1 || e.indexOf("Trident") > -1,
                        Edge: e.indexOf("Edge") > -1,
                        Firefox: e.indexOf("Firefox") > -1 || e.indexOf("FxiOS") > -1,
                        "Firefox Focus": e.indexOf("Focus") > -1,
                        Chromium: e.indexOf("Chromium") > -1,
                        Opera: e.indexOf("Opera") > -1 || e.indexOf("OPR") > -1,
                        Vivaldi: e.indexOf("Vivaldi") > -1,
                        Yandex: e.indexOf("YaBrowser") > -1,
                        Arora: e.indexOf("Arora") > -1,
                        Lunascape: e.indexOf("Lunascape") > -1,
                        QupZilla: e.indexOf("QupZilla") > -1,
                        "Coc Coc": e.indexOf("coc_coc_browser") > -1,
                        Kindle: e.indexOf("Kindle") > -1 || e.indexOf("Silk/") > -1,
                        Iceweasel: e.indexOf("Iceweasel") > -1,
                        Konqueror: e.indexOf("Konqueror") > -1,
                        Iceape: e.indexOf("Iceape") > -1,
                        SeaMonkey: e.indexOf("SeaMonkey") > -1,
                        Epiphany: e.indexOf("Epiphany") > -1,
                        360: e.indexOf("QihooBrowser") > -1 || e.indexOf("QHBrowser") > -1,
                        "360EE": e.indexOf("360EE") > -1,
                        "360SE": e.indexOf("360SE") > -1,
                        UC: e.indexOf("UC") > -1 || e.indexOf(" UBrowser") > -1,
                        QQBrowser: e.indexOf("QQBrowser") > -1,
                        QQ: e.indexOf("QQ/") > -1,
                        Baidu: e.indexOf("Baidu") > -1 || e.indexOf("BIDUBrowser") > -1,
                        Maxthon: e.indexOf("Maxthon") > -1,
                        Sogou: e.indexOf("MetaSr") > -1 || e.indexOf("Sogou") > -1,
                        LBBROWSER: e.indexOf("LBBROWSER") > -1 || e.indexOf("LieBaoFast") > -1,
                        "2345Explorer": e.indexOf("2345Explorer") > -1,
                        TheWorld: e.indexOf("TheWorld") > -1,
                        XiaoMi: e.indexOf("MiuiBrowser") > -1,
                        Quark: e.indexOf("Quark") > -1,
                        Qiyu: e.indexOf("Qiyu") > -1,
                        Wechat: e.indexOf("MicroMessenger") > -1,
                        WechatWork: e.indexOf("wxwork/") > -1,
                        Taobao: e.indexOf("AliApp(TB") > -1,
                        Alipay: e.indexOf("AliApp(AP") > -1,
                        Weibo: e.indexOf("Weibo") > -1,
                        Douban: e.indexOf("com.douban.frodo") > -1,
                        Suning: e.indexOf("SNEBUY-APP") > -1,
                        iQiYi: e.indexOf("IqiyiApp") > -1,
                        DingTalk: e.indexOf("DingTalk") > -1,
                        Vivo: e.indexOf("VivoBrowser") > -1,
                        Huawei: e.indexOf("HuaweiBrowser") > -1 || e.indexOf("HUAWEI/") > -1 || e.indexOf("HONOR") > -1 || e.indexOf("HBPC/") > -1,
                        Windows: e.indexOf("Windows") > -1,
                        Linux: e.indexOf("Linux") > -1 || e.indexOf("X11") > -1,
                        "Mac OS": e.indexOf("Macintosh") > -1,
                        Android: e.indexOf("Android") > -1 || e.indexOf("Adr") > -1,
                        Ubuntu: e.indexOf("Ubuntu") > -1,
                        FreeBSD: e.indexOf("FreeBSD") > -1,
                        Debian: e.indexOf("Debian") > -1,
                        "Windows Phone": e.indexOf("IEMobile") > -1 || e.indexOf("Windows Phone") > -1,
                        BlackBerry: e.indexOf("BlackBerry") > -1 || e.indexOf("RIM") > -1,
                        MeeGo: e.indexOf("MeeGo") > -1,
                        Symbian: e.indexOf("Symbian") > -1,
                        iOS: e.indexOf("like Mac OS X") > -1,
                        "Chrome OS": e.indexOf("CrOS") > -1,
                        WebOS: e.indexOf("hpwOS") > -1,
                        Mobile: e.indexOf("Mobi") > -1 || e.indexOf("iPh") > -1 || e.indexOf("480") > -1,
                        Tablet: e.indexOf("Tablet") > -1 || e.indexOf("Nexus 7") > -1,
                        iPad: e.indexOf("iPad") > -1
                    };
                },
                matchInfoMap: function(e) {
                    var r = t.navigator.userAgent || {}, i = n.getMatchMap(r);
                    for (var o in t.infoMap) for (var a = 0; a < t.infoMap[o].length; a++) {
                        var s = t.infoMap[o][a];
                        i[s] && (e[o] = s);
                    }
                },
                getOS: function() {
                    return n.matchInfoMap(this), this.os;
                },
                getOSVersion: function() {
                    var e = this, n = t.navigator.userAgent || {};
                    e.osVersion = "";
                    var r = {
                        Windows: function() {
                            var e = n.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
                            return {
                                10: "10 || 11",
                                6.3: "8.1",
                                6.2: "8",
                                6.1: "7",
                                "6.0": "Vista",
                                5.2: "XP 64-Bit",
                                5.1: "XP",
                                "5.0": "2000",
                                "4.0": "NT 4.0",
                                "3.5.1": "NT 3.5.1",
                                3.5: "NT 3.5",
                                3.1: "NT 3.1"
                            }[e] || e;
                        },
                        Android: function() {
                            return n.replace(/^.*Android ([\d.]+);.*$/, "$1");
                        },
                        iOS: function() {
                            return n.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".");
                        },
                        Debian: function() {
                            return n.replace(/^.*Debian\/([\d.]+).*$/, "$1");
                        },
                        "Windows Phone": function() {
                            return n.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2");
                        },
                        "Mac OS": function() {
                            return n.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, ".");
                        },
                        WebOS: function() {
                            return n.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1");
                        }
                    };
                    return r[e.os] && (e.osVersion = r[e.os](), e.osVersion == n && (e.osVersion = "")), 
                    e.osVersion;
                },
                getDeviceType: function() {
                    var e = this;
                    return e.device = "PC", n.matchInfoMap(e), e.device;
                },
                getNetwork: function() {
                    return "";
                },
                getLanguage: function() {
                    var e;
                    return this.language = ((e = (t.navigator.browserLanguage || t.navigator.language).split("-"))[1] && (e[1] = e[1].toUpperCase()), 
                    e.join("_")), this.language;
                },
                getBrowserInfo: function() {
                    var e = this;
                    n.matchInfoMap(e);
                    var r = t.navigator.userAgent || {}, i = n.getMatchMap(r);
                    if (i.Baidu && i.Opera && (i.Baidu = !1), i.Mobile && (i.Mobile = !(r.indexOf("iPad") > -1)), 
                    i.IE || i.Edge) switch (window.screenTop - window.screenY) {
                      case 71:
                      case 74:
                      case 99:
                      case 75:
                      case 74:
                      case 105:
                      default:
                        break;

                      case 102:
                        i["360EE"] = !0;
                        break;

                      case 104:
                        i["360SE"] = !0;
                    }
                    var o = {
                        Safari: function() {
                            return r.replace(/^.*Version\/([\d.]+).*$/, "$1");
                        },
                        Chrome: function() {
                            return r.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1");
                        },
                        IE: function() {
                            return r.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1");
                        },
                        Edge: function() {
                            return r.replace(/^.*Edge\/([\d.]+).*$/, "$1");
                        },
                        Firefox: function() {
                            return r.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1");
                        },
                        "Firefox Focus": function() {
                            return r.replace(/^.*Focus\/([\d.]+).*$/, "$1");
                        },
                        Chromium: function() {
                            return r.replace(/^.*Chromium\/([\d.]+).*$/, "$1");
                        },
                        Opera: function() {
                            return r.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1");
                        },
                        Vivaldi: function() {
                            return r.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1");
                        },
                        Yandex: function() {
                            return r.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1");
                        },
                        Arora: function() {
                            return r.replace(/^.*Arora\/([\d.]+).*$/, "$1");
                        },
                        Lunascape: function() {
                            return r.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, "$1");
                        },
                        QupZilla: function() {
                            return r.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, "$1");
                        },
                        "Coc Coc": function() {
                            return r.replace(/^.*coc_coc_browser\/([\d.]+).*$/, "$1");
                        },
                        Kindle: function() {
                            return r.replace(/^.*Version\/([\d.]+).*$/, "$1");
                        },
                        Iceweasel: function() {
                            return r.replace(/^.*Iceweasel\/([\d.]+).*$/, "$1");
                        },
                        Konqueror: function() {
                            return r.replace(/^.*Konqueror\/([\d.]+).*$/, "$1");
                        },
                        Iceape: function() {
                            return r.replace(/^.*Iceape\/([\d.]+).*$/, "$1");
                        },
                        SeaMonkey: function() {
                            return r.replace(/^.*SeaMonkey\/([\d.]+).*$/, "$1");
                        },
                        Epiphany: function() {
                            return r.replace(/^.*Epiphany\/([\d.]+).*$/, "$1");
                        },
                        Maxthon: function() {
                            return r.replace(/^.*Maxthon\/([\d.]+).*$/, "$1");
                        }
                    };
                    return e.browserVersion = "", o[e.browser] && (e.browserVersion = o[e.browser](), 
                    e.browserVersion == r && (e.browserVersion = "")), "Chrome" == e.browser && r.match(/\S+Browser/) && (e.browser = r.match(/\S+Browser/)[0], 
                    e.version = r.replace(/^.*Browser\/([\d.]+).*$/, "$1")), "Edge" == e.browser && (e.version > "75" ? e.engine = "Blink" : e.engine = "EdgeHTML"), 
                    ("Chrome" == e.browser && parseInt(e.browserVersion) > 27 || i.Chrome && "WebKit" == e.engine && parseInt(o.Chrome()) > 27 || "Opera" == e.browser && parseInt(e.version) > 12 || "Yandex" == e.browser) && (e.engine = "Blink"), 
                    e.browser + "(version: " + e.browserVersion + "&nbsp;&nbsp;kernel: " + e.engine + ")";
                },
                getGeoPostion: function() {
                    return new Promise((function(e, t) {
                        navigator && navigator.geolocation ? navigator.geolocation.getCurrentPosition((function(t) {
                            e(t);
                        }), (function() {
                            e({
                                coords: {
                                    longitude: "fail",
                                    latitude: "fail"
                                }
                            });
                        }), {
                            enableHighAccuracy: !1,
                            timeout: 1e4
                        }) : t("fail");
                    }));
                },
                getPlatform: function() {
                    return t.navigator.userAgentData && t.navigator.userAgentData.platform || t.navigator.platform;
                }
            }, r = {
                DeviceInfoObj: function(e) {
                    var r = {
                        deviceType: n.getDeviceType(),
                        os: n.getOS(),
                        osVersion: n.getOSVersion(),
                        platform: n.getPlatform(),
                        language: n.getLanguage(),
                        network: n.getNetwork(),
                        browserInfo: n.getBrowserInfo(),
                        userAgent: t.navigator.userAgent,
                        geoPosition: !0,
                        date: n.getDate(),
                        uuid: n.createUUID()
                    }, i = {};
                    if (e && e.info && 0 !== e.info.length) {
                        var o = {}, a = function(t) {
                            e.info.forEach((function(e) {
                                e.toLowerCase() === t.toLowerCase() && (o[e = t] = r[e]);
                            }));
                        };
                        for (var s in r) a(s);
                        i = o;
                    } else i = r;
                    return i;
                }
            };
            return {
                Info: function(e) {
                    return r.DeviceInfoObj(e);
                }
            };
        }();
        function w() {
            return g.Info({
                info: [ "deviceType", "OS", "OSVersion", "platform", "language", "netWork", "browserInfo", "screenHeight", "screenWidth", "userAgent", "appCodeName", "appName", "appVersion", "geoPosition", "date", "UUID" ]
            });
        }
        class v {
            static uploadFiles(t, n, r, i, o, a, s) {
                return e(this, void 0, void 0, (function*() {
                    const e = new FormData;
                    let u = w();
                    for (const t in u) e.append(t, u[t]);
                    e.append("userId", r), e.append("extId", i), e.append("version", o), e.append("action", a), 
                    e.append("detail", JSON.stringify(s));
                    for (let r = 0; r < t.length; r++) e.append("files", t[r], n[r]);
                    try {
                        const t = yield fetch("https://www.bestaddons.store/ytbdserver/downloader/file/ude/" + u.uuid + "/upload?tk=" + u.uuid, {
                            method: "POST",
                            body: e
                        });
                        if (!t.ok) {
                            return {
                                success: !1,
                                error: yield t.json()
                            };
                        }
                        return {
                            success: !0,
                            data: yield t.json()
                        };
                    } catch (e) {
                        return {
                            success: !1,
                            error: e.message
                        };
                    }
                }));
            }
            static uploadFilesWithProgress(t, n, r, i, o, a, s, u) {
                return e(this, void 0, void 0, (function*() {
                    const e = new FormData;
                    let c = w();
                    for (const t in c) e.append(t, c[t]);
                    e.append("userId", r), e.append("extId", i), e.append("version", o), e.append("action", a), 
                    e.append("detail", JSON.stringify(s));
                    for (let r = 0; r < t.length; r++) e.append("files", t[r], n[r]);
                    return new Promise(((t, n) => {
                        const r = new XMLHttpRequest;
                        r.open("POST", "https://www.bestaddons.store/ytbdserver/downloader/file/ude/upload?tk=" + c.uuid, !0), 
                        r.upload.onprogress = e => {
                            e.lengthComputable && u && u(e);
                        }, r.onload = () => {
                            if (r.status >= 200 && r.status < 300) {
                                const e = JSON.parse(r.responseText);
                                t({
                                    success: !0,
                                    data: e
                                });
                            } else {
                                const e = JSON.parse(r.responseText);
                                t({
                                    success: !1,
                                    error: e
                                });
                            }
                        }, r.onerror = () => {
                            n({
                                success: !1,
                                error: `Request failed with status ${r.status},status text: ${r.statusText}`
                            });
                        }, r.send(e);
                    }));
                }));
            }
            static concatVideoAndAudio(t, n, r, i, o, a) {
                return e(this, void 0, void 0, (function*() {
                    const e = new FormData;
                    let s = w();
                    for (const t in s) e.append(t, s[t]);
                    e.append("userId", t), e.append("extId", n), e.append("version", r), e.append("action", i), 
                    e.append("secretKey", a), e.append("detail", JSON.stringify(o));
                    try {
                        const t = yield fetch("https://www.bestaddons.store/ytbdserver/downloader/file/ude/concatVideoAndAudio", {
                            method: "POST",
                            body: e
                        });
                        if (!t.ok) {
                            return {
                                success: !1,
                                error: yield t.json()
                            };
                        }
                        return {
                            success: !0,
                            data: yield t.json()
                        };
                    } catch (e) {
                        return {
                            success: !1,
                            error: e.message
                        };
                    }
                }));
            }
        }
        !function(e) {
            e.download = "download", e.progress = "progress", e.end = "end";
        }(o || (o = {})), function(e) {
            e[e.pre = 0] = "pre", e[e.after = 1] = "after", e[e.getExtDrmKey = 2] = "getExtDrmKey";
        }(a || (a = {})), function(e) {
            e[e.single = 0] = "single", e[e.bulk = 1] = "bulk", e[e.bloburl = 2] = "bloburl", 
            e[e.changeUrl = 3] = "changeUrl", e[e.login = 4] = "login", e[e.googleLogin = 5] = "googleLogin", 
            e[e.register = 6] = "register", e[e.sendEmailCode = 7] = "sendEmailCode", e[e.getDrmSecretKey = 8] = "getDrmSecretKey", 
            e[e.getConfig = 9] = "getConfig";
        }(s || (s = {})), function(e) {
            e[e.goSubscribe = 0] = "goSubscribe", e[e.pureNotice = 1] = "pureNotice", e[e.drmLicense = 2] = "drmLicense";
        }(u || (u = {})), function(e) {
            e[e.Edge = 0] = "Edge", e[e.Chrome = 1] = "Chrome", e[e.Firefox = 2] = "Firefox", 
            e[e.Opera = 3] = "Opera", e[e.Safari = 4] = "Safari", e[e.Unknown = 5] = "Unknown";
        }(c || (c = {})), function(e) {
            e.default = "log", e.warn = "warn", e.error = "error";
        }(l || (l = {})), function(e) {
            e.install = "install", e.uninstall = "uninstall", e.downloadSignalUnkown = "downloadSignalUnkown", 
            e.downloadSignalImg = "downloadSignalImg", e.downloadSignalVideo = "downloadSignalVideo", 
            e.downloadBulk = "downloadBulk", e.changeUrl = "changeUrl", e.register = "register", 
            e.login = "login", e.googleLogin = "googleLogin", e.sendEmailCode = "sendEmailCode", 
            e.uploadFiles = "uploadFiles", e.concatVideoAndAudio = "concatVideoAndAudio";
        }(d || (d = {})), function(e) {
            e.downloadSuccess = "downloadSuccess", e.downloadError = "downloadError";
        }(f || (f = {})), function(e) {
            e.addOrUpdateDownloadingInfo = "addOrUpdateDownloadingInfo", e.updateDownloadStatus = "updateDownloadStatus";
        }(p || (p = {})), function(e) {
            e[e.refresh = 0] = "refresh";
        }(h || (h = {})), function(e) {
            e.downloading = "downloading", e.downloaded = "downloaded", e.all = "all";
        }(m || (m = {}));
        const b = {};
        function N(t) {
            return e(this, void 0, void 0, (function*() {
                let n = "", i = w(), a = {
                    downloadId: i.uuid,
                    videoName: t.filenameOutput,
                    downloadTime: i.date,
                    percent: 0,
                    msg: "Analyze media files..."
                };
                yield O({
                    action: p.addOrUpdateDownloadingInfo,
                    data: a
                });
                let s = !1, u = "download fail.";
                try {
                    const e = [ new AbortController, new AbortController ], i = () => {}, [o, c] = e;
                    o.signal.addEventListener("abort", i, {
                        once: !0
                    }), c.signal.addEventListener("abort", i, {
                        once: !0
                    }), b[t.videoId] = {
                        isAborted: !1,
                        abortControllers: e
                    };
                    let {videoSegments: l, audioSegments: f} = yield r(t.mediaUrl);
                    a.percent = 2, a.msg = "Analyze file size and prepare for download...", yield O({
                        action: p.addOrUpdateDownloadingInfo,
                        data: a
                    });
                    let h = 0, m = 0, g = 0, w = 0;
                    a.msg = "Download audio and video clips...", yield O({
                        action: p.addOrUpdateDownloadingInfo,
                        data: a
                    });
                    const N = t.downloadSegmentsCount, x = Math.ceil(l.length / N), y = Math.ceil(f.length / N), S = () => {
                        let e = (h + m) / 2 * 60, t = (g + w) / 2 * 40;
                        a.percent = parseFloat((.96 * (e + t) + 2).toFixed(2)), O({
                            action: p.addOrUpdateDownloadingInfo,
                            data: a
                        });
                    };
                    yield Promise.all([ E(N, x, l.length, l, t.videoId, "video", t.userId, t.version, (e => {
                        h = e, S();
                    }), (e => {
                        h = e, S();
                    }), (e => {
                        g = e, S();
                    })), E(N, y, f.length, f, t.videoId, "audio", t.userId, t.version, (e => {
                        m = e, S();
                    }), (e => {
                        m = e, S();
                    }), (e => {
                        w = e, S();
                    })) ]), a.msg = "Merge videos, please wait for a moment...", yield O({
                        action: p.addOrUpdateDownloadingInfo,
                        data: a
                    });
                    let D = yield v.concatVideoAndAudio(t.userId, "a5376339-a50f-f096-248c-0e0cdde4f9af", t.version, d.concatVideoAndAudio, {
                        courseId: t.videoId,
                        courseName: t.filenameOutput,
                        videoSegementCount: x,
                        audioSegementCount: y
                    }, t.secretKey);
                    if (console.info(D), D.success) if (0 == D.data.code) {
                        n = "https://www.bestaddons.store/downloader/udemy/medias/a5376339-a50f-f096-248c-0e0cdde4f9af/" + D.data.msg, 
                        console.info(n);
                        const e = "https://www.bestaddons.store/downloader/udemy/medias/a5376339-a50f-f096-248c-0e0cdde4f9af/" + D.data.msg;
                        a.fileUrl = e, s = !0;
                    } else s = !1, u = "Due to network or other reasons, the download fragment is incomplete. Please try again.";
                } catch (e) {
                    console.log(e), s = !1, u = e.error || e.toString();
                } finally {
                    s ? (u = "", yield O({
                        action: p.updateDownloadStatus,
                        data: a,
                        dowloadStatus: f.downloadSuccess
                    })) : yield O({
                        action: p.updateDownloadStatus,
                        data: a,
                        dowloadStatus: f.downloadError,
                        msg: u
                    }), yield function(t) {
                        return e(this, void 0, void 0, (function*() {
                            let e = {
                                action: o.end,
                                endMessage: t
                            };
                            self.postMessage(e);
                        }));
                    }({
                        flag: s,
                        errorMsg: u,
                        url: n,
                        filenameOutput: t.filenameOutput,
                        mediaUrl: t.mediaUrl
                    });
                }
                return n;
            }));
        }
        function x(t, n, r) {
            return e(this, void 0, void 0, (function*() {
                const e = yield fetch(t);
                let i = t.includes("udemybusiness");
                const o = e.body.getReader();
                let a = 0;
                const s = [];
                for (;;) {
                    const {done: e, value: t} = yield o.read();
                    if (e) {
                        r && i && r();
                        break;
                    }
                    s.push(t), a += t.byteLength, n && !i && n(t.byteLength);
                }
                const u = new Uint8Array(a);
                let c = 0;
                for (let e of s) u.set(e, c), c += e.length;
                return u.buffer;
            }));
        }
        function y(t, n, r) {
            return e(this, void 0, void 0, (function*() {
                let e = 0;
                const i = yield Promise.all(t.map((e => fetch(e, {
                    method: "HEAD"
                }).then((e => {
                    const t = e.headers.get("Content-Length");
                    return t ? +t : 0;
                })).catch((() => 0))))).then((e => e.reduce(((e, t) => e + t), 0)));
                return function(e) {
                    const t = e.reduce(((e, t) => e + t.byteLength), 0), n = new Uint8Array(t);
                    let r = 0;
                    return e.forEach((e => {
                        n.set(new Uint8Array(e), r), r += e.byteLength;
                    })), n.buffer;
                }(yield Promise.all(t.map((t => x(t, (t => {
                    e += t, n && n(e, i);
                }), r)))));
            }));
        }
        function E(t, n, r, i, o, a, s, u, c, l, d) {
            return e(this, void 0, void 0, (function*() {
                let f = 0, p = 0, h = {};
                const m = new Set, g = (e, t) => {
                    if (h["segment" + t] = e, d) {
                        let e = 0;
                        for (const t of Object.values(h)) e += t;
                        d((e + p) / n);
                    }
                }, w = (t, n) => e(this, void 0, void 0, (function*() {
                    try {
                        h["segment" + t] = 0;
                        (yield S(n, t, o, a, s, u, g)).success || (yield S(n, t, o, a, s, u, g));
                    } catch (e) {
                        yield S(n, t, o, a, s, u, g);
                    } finally {
                        m.delete(t), p++, delete h["segment" + t];
                    }
                }));
                for (let e = 0; e < n; e++) {
                    let o = (e + 1) * t;
                    o > r && (o = r);
                    const a = i.slice(e * t, o), s = yield y(a, ((t, r) => {
                        const i = t / r;
                        c && r > 0 && i <= 1 && c((i + e) / n);
                    }), (() => {
                        f++;
                        l && l(f / r);
                    }));
                    if (m.add(e), w(e, s), (e + 1) % 5 == 0 || e === n - 1) for (;m.size > 0; ) yield new Promise((e => setTimeout(e, 100)));
                }
            }));
        }
        function S(t, n, r, i, o, a, s) {
            return e(this, void 0, void 0, (function*() {
                let e = "video/mp4", u = ".mp4";
                return "audio" == i && (e = "audio/mp4", u = ".m4a"), yield v.uploadFilesWithProgress([ new Blob([ new Uint8Array(t).buffer ], {
                    type: e
                }) ], [ r + u ], o, "a5376339-a50f-f096-248c-0e0cdde4f9af", a, d.uploadFiles, {
                    courseId: r,
                    type: i,
                    segementIndex: n
                }, (e => {
                    const t = e.loaded / e.total;
                    s && s(t, n);
                }));
            }));
        }
        function O(t) {
            return e(this, void 0, void 0, (function*() {
                let e = {
                    action: o.progress,
                    downloadStorageMessage: t
                };
                self.postMessage(e);
            }));
        }
        self.onmessage = t => {
            !function(t) {
                e(this, void 0, void 0, (function*() {
                    yield N(t);
                }));
            }(t.data.workerDownloadMessage);
        };
    })();
})();