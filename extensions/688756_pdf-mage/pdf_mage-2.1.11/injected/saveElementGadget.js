// This file is prepended to build/pdfmagegadget_combined.js to generate the final contentScript.

(function () {
    if (typeof PdfMageGadget == 'undefined') {

        /*
         The MIT License
        
         Copyright (c) 2012 Andrew Cantino
         Copyright (c) 2009 Andrew Cantino & Kyle Maxwell
        
         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated documentation files (the "Software"), to deal
         in the Software without restriction, including without limitation the rights
         to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         copies of the Software, and to permit persons to whom the Software is
         furnished to do so, subject to the following conditions:
        
         The above copyright notice and this permission notice shall be included in
         all copies or substantial portions of the Software.
        
         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         THE SOFTWARE.
        */


        (function () {
            var PdfMageGadget;

            window.jQuerySG = window.jQuery;

            window.PdfMageGadget = PdfMageGadget = (function () {

                function PdfMageGadget() { }

                PdfMageGadget.prototype.border_width = 5;

                PdfMageGadget.prototype.border_padding = 2;

                PdfMageGadget.prototype.b_top = null;

                PdfMageGadget.prototype.b_left = null;

                PdfMageGadget.prototype.b_right = null;

                PdfMageGadget.prototype.b_bottom = null;

                PdfMageGadget.prototype.selected = [];

                PdfMageGadget.prototype.rejected = [];

                PdfMageGadget.prototype.special_mode = null;

                PdfMageGadget.prototype.path_output_field = null;

                PdfMageGadget.prototype.sg_div = null;

                PdfMageGadget.prototype.ignore_class = 'pdfmagegadget_ignore';

                PdfMageGadget.prototype.unbound = false;

                PdfMageGadget.prototype.restricted_elements = jQuerySG.map(['html', 'body', 'head', 'base'], function (selector) {
                    return jQuerySG(selector).get(0);
                });

                PdfMageGadget.prototype.makeBorders = function (orig_elem, makeRed) {
                    var elem, height, left, p, path_to_show, top, width;
                    this.removeBorders();
                    this.setupBorders();
                    if (orig_elem.parentNode) {
                        path_to_show = orig_elem.parentNode.tagName.toLowerCase() + ' ' + orig_elem.tagName.toLowerCase();
                    } else {
                        path_to_show = orig_elem.tagName.toLowerCase();
                    }
                    elem = jQuerySG(orig_elem);
                    p = elem.offset();
                    top = p.top;
                    left = p.left;
                    width = elem.outerWidth();
                    height = elem.outerHeight();
                    this.b_top.css('width', this.px(width + this.border_padding * 2 + this.border_width * 2)).css('top', this.px(top - this.border_width - this.border_padding)).css('left', this.px(left - this.border_padding - this.border_width));
                    this.b_bottom.css('width', this.px(width + this.border_padding * 2 + this.border_width * 2)).css('top', this.px(top + height + this.border_padding)).css('left', this.px(left - this.border_padding - this.border_width));
                    this.b_left.css('height', this.px(height + this.border_padding * 2)).css('top', this.px(top - this.border_padding)).css('left', this.px(left - this.border_padding - this.border_width));
                    this.b_right.css('height', this.px(height + this.border_padding * 2)).css('top', this.px(top - this.border_padding)).css('left', this.px(left + width + this.border_padding));
                    this.b_right.get(0).target_elem = this.b_left.get(0).target_elem = this.b_top.get(0).target_elem = this.b_bottom.get(0).target_elem = orig_elem;
                    if (makeRed || elem.hasClass("pdfmagegadget_suggested") || elem.hasClass("pdfmagegadget_selected")) {
                        this.b_top.addClass('pdfmagegadget_border_red');
                        this.b_bottom.addClass('pdfmagegadget_border_red');
                        this.b_left.addClass('pdfmagegadget_border_red');
                        this.b_right.addClass('pdfmagegadget_border_red');
                    } else {
                        if (this.b_top.hasClass('pdfmagegadget_border_red')) {
                            this.b_top.removeClass('pdfmagegadget_border_red');
                            this.b_bottom.removeClass('pdfmagegadget_border_red');
                            this.b_left.removeClass('pdfmagegadget_border_red');
                            this.b_right.removeClass('pdfmagegadget_border_red');
                        }
                    }
                    return this.showBorders();
                };

                PdfMageGadget.prototype.px = function (p) {
                    return p + 'px';
                };

                PdfMageGadget.prototype.showBorders = function () {
                    this.b_top.show();
                    this.b_bottom.show();
                    this.b_left.show();
                    return this.b_right.show();
                };

                PdfMageGadget.prototype.removeBorders = function () {
                    if (this.b_top) {
                        this.b_top.hide();
                        this.b_bottom.hide();
                        this.b_left.hide();
                        return this.b_right.hide();
                    }
                };

                PdfMageGadget.prototype.setupBorders = function () {
                    var width;
                    if (!this.b_top) {
                        width = this.border_width + 'px';
                        this.b_top = jQuerySG('<div>').addClass('pdfmagegadget_border').css('height', width).hide().bind("mousedown.sg", {
                            'self': this
                        }, this.sgMousedown);
                        this.b_bottom = jQuerySG('<div>').addClass('pdfmagegadget_border').addClass('pdfmagegadget_bottom_border').css('height', this.px(this.border_width + 6)).hide().bind("mousedown.sg", {
                            'self': this
                        }, this.sgMousedown);
                        this.b_left = jQuerySG('<div>').addClass('pdfmagegadget_border').css('width', width).hide().bind("mousedown.sg", {
                            'self': this
                        }, this.sgMousedown);
                        this.b_right = jQuerySG('<div>').addClass('pdfmagegadget_border').css('width', width).hide().bind("mousedown.sg", {
                            'self': this
                        }, this.sgMousedown);
                        return this.addBorderToDom();
                    }
                };

                PdfMageGadget.prototype.addBorderToDom = function () {
                    document.body.appendChild(this.b_top.get(0));
                    document.body.appendChild(this.b_bottom.get(0));
                    document.body.appendChild(this.b_left.get(0));
                    return document.body.appendChild(this.b_right.get(0));
                };

                PdfMageGadget.prototype.removeBorderFromDom = function () {
                    if (this.b_top) {
                        this.b_top.remove();
                        this.b_bottom.remove();
                        this.b_left.remove();
                        this.b_right.remove();
                        return this.b_top = this.b_bottom = this.b_left = this.b_right = null;
                    }
                };

                PdfMageGadget.prototype.selectable = function (elem) {
                    return !this.css_restriction || (this.css_restriction && jQuerySG(elem).is(this.css_restriction));
                };

                PdfMageGadget.prototype.sgMouseover = function (e) {
                    var gadget, parent, self;
                    gadget = e.data.self;
                    if (gadget.unbound) {
                        return true;
                    }
                    if (this === document.body || this === document.body.parentNode) {
                        return false;
                    }
                    self = jQuerySG(this);
                    if (gadget.special_mode !== 'd') {
                        parent = gadget.firstSelectedOrSuggestedParent(this);
                        if (parent !== null && parent !== this && gadget.selectable(parent)) {
                            gadget.makeBorders(parent, true);
                        } else {
                            if (gadget.selectable(self)) {
                                gadget.makeBorders(this);
                            }
                        }
                    } else {
                        if (!jQuerySG('.pdfmagegadget_selected', this).get(0)) {
                            if (gadget.selectable(self)) {
                                gadget.makeBorders(this);
                            }
                        }
                    }
                    return false;
                };

                PdfMageGadget.prototype.firstSelectedOrSuggestedParent = function (elem) {
                    var orig;
                    orig = elem;
                    if (jQuerySG(elem).hasClass('pdfmagegadget_suggested') || jQuerySG(elem).hasClass('pdfmagegadget_selected')) {
                        return elem;
                    }
                    while (elem.parentNode && (elem = elem.parentNode)) {
                        if (jQuerySG.inArray(elem, this.restricted_elements) === -1) {
                            if (jQuerySG(elem).hasClass('pdfmagegadget_suggested') || jQuerySG(elem).hasClass('pdfmagegadget_selected')) {
                                return elem;
                            }
                        }
                    }
                    return null;
                };

                PdfMageGadget.prototype.sgMouseout = function (e) {
                    var elem, gadget;
                    gadget = e.data.self;
                    if (gadget.unbound) {
                        return true;
                    }
                    if (this === document.body || this === document.body.parentNode) {
                        return false;
                    }
                    elem = jQuerySG(this);
                    gadget.removeBorders();
                    return false;
                };

                PdfMageGadget.prototype.sgMousedown = function (e) {
                    var elem, gadget, potential_elem, w_elem;
                    gadget = e.data.self;
                    if (gadget.unbound) {
                        return true;
                    }
                    elem = this;
                    w_elem = jQuerySG(elem);
                    if (w_elem.hasClass('pdfmagegadget_border')) {
                        elem = elem.target_elem || elem;
                        w_elem = jQuerySG(elem);
                    }
                    if (elem === document.body || elem === document.body.parentNode) {
                        return;
                    }
                    if (gadget.special_mode !== 'd') {
                        potential_elem = gadget.firstSelectedOrSuggestedParent(elem);
                        if (potential_elem !== null && potential_elem !== elem) {
                            elem = potential_elem;
                            w_elem = jQuerySG(elem);
                        }
                    } else {
                        if (jQuerySG('.pdfmagegadget_selected', this).get(0)) {
                            gadget.blockClicksOn(elem);
                        }
                    }
                    if (!gadget.selectable(w_elem)) {
                        gadget.removeBorders();
                        gadget.blockClicksOn(elem);
                        return false;
                    }
                    if (w_elem.hasClass('pdfmagegadget_selected')) {
                        w_elem.removeClass('pdfmagegadget_selected');
                        gadget.selected.splice(jQuerySG.inArray(elem, gadget.selected), 1);
                    } else if (w_elem.hasClass("pdfmagegadget_rejected")) {
                        w_elem.removeClass('pdfmagegadget_rejected');
                        gadget.rejected.splice(jQuerySG.inArray(elem, gadget.rejected), 1);
                    } else if (w_elem.hasClass("pdfmagegadget_suggested")) {
                        w_elem.addClass('pdfmagegadget_rejected');
                        gadget.rejected.push(elem);
                    } else {
                        w_elem.addClass('pdfmagegadget_selected');
                        gadget.selected.push(elem);
                    }

                    gadget.setPath(gadget.selected.length);
                    gadget.removeBorders();
                    gadget.blockClicksOn(elem);
                    w_elem.trigger("mouseover.sg", {
                        'self': gadget
                    });
                    return false;
                };

                PdfMageGadget.prototype.setupEventHandlers = function () {
                    jQuerySG("*:not(.pdfmagegadget_ignore)").bind("mouseover.sg", {
                        'self': this
                    }, this.sgMouseover);
                    jQuerySG("*:not(.pdfmagegadget_ignore)").bind("mouseout.sg", {
                        'self': this
                    }, this.sgMouseout);
                    jQuerySG("*:not(.pdfmagegadget_ignore)").bind("mousedown.sg", {
                        'self': this
                    }, this.sgMousedown);
                    jQuerySG("html").bind("keydown.sg", {
                        'self': this
                    }, this.listenForActionKeys);
                    return jQuerySG("html").bind("keyup.sg", {
                        'self': this
                    }, this.clearActionKeys);
                };

                PdfMageGadget.prototype.listenForActionKeys = function (e) {
                    var gadget;
                    gadget = e.data.self;
                    if (gadget.unbound) {
                        return true;
                    }
                    if (e.keyCode === 16 || e.keyCode === 68) {
                        gadget.special_mode = 'd';
                        return gadget.removeBorders();
                    }
                };

                PdfMageGadget.prototype.clearActionKeys = function (e) {
                    var gadget;
                    gadget = e.data.self;
                    if (gadget.unbound) {
                        return true;
                    }
                    gadget.removeBorders();
                    return gadget.special_mode = null;
                };

                PdfMageGadget.prototype.blockClicksOn = function (elem) {
                    var block, p;
                    elem = jQuerySG(elem);
                    p = elem.offset();
                    block = jQuerySG('<div>').css('position', 'absolute').css('z-index', '9999999').css('width', this.px(elem.outerWidth())).css('height', this.px(elem.outerHeight())).css('top', this.px(p.top)).css('left', this.px(p.left)).css('background-color', '');
                    document.body.appendChild(block.get(0));
                    setTimeout((function () {
                        return block.remove();
                    }), 400);
                    return false;
                };

                PdfMageGadget.prototype.setMode = function (mode) {
                    if (mode === 'browse') {
                        this.removeEventHandlers();
                    } else if (mode === 'interactive') {
                        this.setupEventHandlers();
                    }
                    return this.clearSelected();
                };

                PdfMageGadget.prototype.setPath = function (prediction) {
                    if (prediction) {
                        var num = parseInt(prediction);
                        if(isNaN(num)){
                            return this.path_output_field.value = prediction;
                        } else {
                            return this.path_output_field.value = num + ' element(s) selected. Ready to create PDF.';
                        }
                        
                    } else {
                        return this.path_output_field.value = 'No elements selected';
                    }
                };

                PdfMageGadget.prototype.refreshFromPath = function (e) {
                    var path, self;
                    self = (e && e.data && e.data.self) || this;
                    path = self.path_output_field.value;
                    self.clearSelected();
                    return self.setPath(path);
                };

                PdfMageGadget.prototype.previewPdf = function (e) {
                    var path, self;
                    self = (e && e.data && e.data.self) || this;
                    path = self.path_output_field.value;
                    if (path === 'No elements selected') {
                        return self.showDialog('Please select one or more elements to be included into PDF.');
                    }

                    jQuerySG('.pdfmagegadget_selected').addClass('pdfmagegadget_revealed').removeClass('pdfmagegadget_selected');
                    jQuerySG('.pdfmagegadget_revealed').find('*').addClass('pdfmagegadget_revealed');
                    jQuerySG('.pdfmagegadget_revealed').parentsUntil('body').addClass('pdfmagegadget_revealed');
                    jQuerySG('body').find('*').not('.pdfmagegadget_revealed').not('.pdfmagegadget_ignore').addClass('pdfmagegadget_hidden');
                    // or document.querySelector( "body" ).classList.add( "pdfmagegadget_hidden" );

                    jQuerySG('#pdfmagegadget_preview_button').hide();
                    jQuerySG('#pdfmagegadget_clear_button').hide();
                    jQuerySG('#pdfmagegadget_cancel_preview_button').show();
                    jQuerySG('#pdfmagegadget_trigger_convert_button').show();

                };

                PdfMageGadget.prototype.cancelPreview = function (e) {
                    var path, self;
                    self = (e && e.data && e.data.self) || this;
                    self.clearHiddenAndRevealed();
                    self.setPath();

                    jQuerySG('#pdfmagegadget_preview_button').show();
                    jQuerySG('#pdfmagegadget_clear_button').show();
                    jQuerySG('#pdfmagegadget_cancel_preview_button').hide();
                    jQuerySG('#pdfmagegadget_trigger_convert_button').hide();
                };

                PdfMageGadget.prototype.showDialog = function (messageOrType) {

                    var message = messageOrType;
                    if (messageOrType == 'ConversionInProgress'){
                        message = 'Saving in progress...<br/>Your PDF will be ready soon, you may continue using the browser as usual. Please watch PDF Mage icon for progress.'
                    } else if (messageOrType == 'Help'){
                        message = '<ul style="list-style: disc !important; margin-left: 15px !important;">'
                        + '<li>Click on a page element that you would like to include into the PDF document (it will turn green).</li>'
                        + '<li>Click the element again to un-select.</li>'
                        + '<li>When ready, click the "Preview PDF" button to see what the resultng PDF will look like.</li>'
                        + '<li>Next, click "Save as PDF" and wait until PDF Mage creates your document (watch PDF Mage icon for progress).</li>'
                        + '</ul>';
                    }

                    var closeDialog = function(){jQuerySG('#pdfmagegadget_modal').remove()};
                    
                    var modalBackground = jQuerySG('<div>').attr('id', 'pdfmagegadget_modal').attr('class', 'pdfmagegadget_clean');
                    modalBackground.click(function(ev){if (ev.target==this) closeDialog()});
                    var modalDialog = jQuerySG('<div>').attr('id', 'pdfmagegadget_modal_content').html('<span id="pdfmagegadget_modal_close">&times;</span><b>PDF Mage</b><hr/><p>' + message + '</p>');
                    modalBackground.append(modalDialog);
                    jQuerySG('body').append(modalBackground);
                    jQuerySG('#pdfmagegadget_modal').show();
                    jQuerySG('#pdfmagegadget_modal_close').click(closeDialog);
                };                

                PdfMageGadget.prototype.triggerConvertToPdf = function (e) {
                    var path, self;
                    self = (e && e.data && e.data.self) || this;
                    path = self.path_output_field.value;
                    if (path === 'No elements selected') {
                        return;
                    }

                    self.removeInterface();
                    
                    chrome.runtime.sendMessage({
                        action: "startSaveElementAsPdf"
                    });
                    
                    setTimeout(function () {
                        self.showDialog('ConversionInProgress');
                        self.unbindAndRemoveInterface();                        
                    }, 1000);
                };

                PdfMageGadget.prototype.clearHiddenAndRevealed = function (e) {
                    jQuerySG('.pdfmagegadget_hidden').removeClass('pdfmagegadget_hidden');
                    jQuerySG('.pdfmagegadget_revealed').removeClass('pdfmagegadget_revealed');
                };                

                PdfMageGadget.prototype.clearSelected = function (e) {
                    var self;
                    self = (e && e.data && e.data.self) || this;
                    self.selected = [];
                    self.rejected = [];
                    jQuerySG('.pdfmagegadget_selected').removeClass('pdfmagegadget_selected');
                    jQuerySG('.pdfmagegadget_rejected').removeClass('pdfmagegadget_rejected');
                    return self.removeBorders();
                };

                PdfMageGadget.prototype.clearEverything = function (e) {
                    var self;
                    self = (e && e.data && e.data.self) || this;
                    self.clearSelected();
                    return self.resetOutputs();
                };

                PdfMageGadget.prototype.resetOutputs = function () {
                    return this.setPath();
                };

                PdfMageGadget.prototype.showHelp = function (e) {
                    var self;
                    self = (e && e.data && e.data.self) || this;
                    return self.showDialog('Help');
                };

                PdfMageGadget.prototype.composeRemoteUrl = function (url, data_obj) {
                    var key, params;
                    params = (url.split("?")[1] && url.split("?")[1].split("&")) || [];
                    params.push("t=" + (new Date()).getTime());
                    params.push("url=" + encodeURIComponent(window.location.href));
                    if (data_obj) {
                        for (key in data_obj) {
                            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data_obj[key]));
                        }
                    }
                    if (this.remote_data) {
                        for (key in this.remote_data) {
                            params.push(encodeURIComponent("data[" + key + "]") + '=' + encodeURIComponent(this.remote_data[key]));
                        }
                    }
                    return url.split("?")[0] + "?" + params.join("&");
                };

                PdfMageGadget.prototype.addScript = function (src) {
                    var head, s;
                    s = document.createElement('script');
                    s.setAttribute('type', 'text/javascript');
                    s.setAttribute('src', src);
                    head = document.getElementsByTagName('head')[0];
                    if (head) {
                        return head.appendChild(s);
                    } else {
                        return document.body.appendChild(s);
                    }
                };

                PdfMageGadget.prototype.makeInterface = function () {
                    jQuerySG('head').append('<link rel="stylesheet" type="text/css" href="https://pdfmage.org/Content/Styles/saveElementGadget.css">');
                    this.sg_div = jQuerySG('<div>').attr('id', 'pdfmagegadget_main').addClass('pdfmagegadget_bottom').addClass('pdfmagegadget_ignore');
                    this.makeStandardInterface();
                    return jQuerySG('body').append(this.sg_div);
                };

                PdfMageGadget.prototype.makeStandardInterface = function () {
                    var path, self;
                    self = this;
                    path = jQuerySG('<input>').attr('id', 'pdfmagegadget_path_field').addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field').keydown(function (e) {
                        if (e.keyCode === 13) {
                            return self.refreshFromPath(e);
                        }
                    }).focus(function () {
                        return jQuerySG(this).select();
                    });
                    this.sg_div.append(path);
                    this.clear_button = jQuerySG('<input type="button" id="pdfmagegadget_clear_button" value="Clear"/>').bind("click", {
                        'self': this
                    }, this.clearEverything).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field');
                    this.sg_div.append(this.clear_button);
                    this.sg_div.append(jQuerySG('<input type="button" value="Toggle Position"/>').click(function () {
                        if (self.sg_div.hasClass('pdfmagegadget_top')) {
                            return self.sg_div.removeClass('pdfmagegadget_top').addClass('pdfmagegadget_bottom');
                        } else {
                            return self.sg_div.removeClass('pdfmagegadget_bottom').addClass('pdfmagegadget_top');
                        }
                    }).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field'));
                    this.sg_div.append(jQuerySG('<input type="button" id="pdfmagegadget_preview_button" value="Preview PDF"/>').bind("click", {
                        'self': this
                    }, this.previewPdf).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field'));
                    this.sg_div.append(jQuerySG('<input type="button" id="pdfmagegadget_cancel_preview_button" style="display:none" value="Cancel preview"/>').bind("click", {
                        'self': this
                    }, this.cancelPreview).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field'));
                    this.sg_div.append(jQuerySG('<input type="button" id="pdfmagegadget_trigger_convert_button" style="display:none" value="Save as PDF!"/>').bind("click", {
                        'self': this
                    }, this.triggerConvertToPdf).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field'));
                    this.sg_div.append(jQuerySG('<input type="button" value="?"/>').bind("click", {
                        'self': this
                    }, this.showHelp).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field'));
                    this.sg_div.append(jQuerySG('<input type="button" value="X"/>').bind("click", {
                        'self': this
                    }, this.unbindAndRemoveInterface).addClass('pdfmagegadget_ignore').addClass('pdfmagegadget_input_field'));
                    return this.path_output_field = path.get(0);
                };

                PdfMageGadget.prototype.removeInterface = function (e) {
                    if(this.sg_div) {
                        this.sg_div.remove();
                    }

                    return this.sg_div = null;
                };

                PdfMageGadget.prototype.hideInterface = function (e) {
                    this.sg_div.hide();
                };

                PdfMageGadget.prototype.showInterface = function (e) {
                    this.sg_div.show();
                };

                PdfMageGadget.prototype.unbind = function (e) {
                    var self;
                    self = (e && e.data && e.data.self) || this;
                    self.unbound = true;
                    self.removeBorderFromDom();
                    self.clearHiddenAndRevealed();
                    return self.clearSelected();
                };

                PdfMageGadget.prototype.unbindAndRemoveInterface = function (e) {
                    var self;
                    self = (e && e.data && e.data.self) || this;
                    self.unbind();
                    return self.removeInterface();
                };

                PdfMageGadget.prototype.setOutputMode = function (e, output_mode) {
                    var self;
                    self = (e && e.data && e.data.self) || this;
                    return self.output_mode = (e && e.data && e.data.mode) || output_mode;
                };

                PdfMageGadget.prototype.rebind = function () {
                    this.unbound = false;
                    this.clearEverything();
                    return this.setupBorders();
                };

                PdfMageGadget.prototype.rebindAndMakeInterface = function () {
                    this.makeInterface();
                    return this.rebind();
                };

                PdfMageGadget.prototype.randBetween = function (a, b) {
                    return Math.floor(Math.random() * b) + a;
                };

                PdfMageGadget.toggle = function (options) {
                    if (!window.selector_gadget) {
                        window.selector_gadget = new PdfMageGadget();
                        window.selector_gadget.makeInterface();
                        window.selector_gadget.clearEverything();
                        window.selector_gadget.setMode('interactive');
                    } else if (window.selector_gadget.unbound) {
                        window.selector_gadget.rebindAndMakeInterface();
                    } else {
                        window.selector_gadget.unbindAndRemoveInterface();
                    }
                    return jQuerySG('.selector_gadget_loading').remove();
                };
                return PdfMageGadget;

            })();

        }).call(this);        

    }

    var interval = setInterval(function () {
        if (typeof PdfMageGadget != 'undefined') {
            clearInterval(interval);
            PdfMageGadget.toggle();
        }
    }, 50);
})();