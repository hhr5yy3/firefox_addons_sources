var _logOutput = (location.href.indexOf('zoomimagelog=1') > 0);
d('Log Start', '==========');

var _uqid = new Date().getTime().toString(16) + '_';
var _firstkey = _uqid + 'first';
var _srckey = _uqid + 'source';
var _sizekey = _uqid + 'size';
var _rotkey = _uqid + 'rotate';

var _zoomExImgId = 'zoomImg_' + _uqid + 'floatImgWraper';
var _zoomImgCls = 'zoomImgCls_b6ig4jvwe';
var _draggedCls = 'zoomImgCls_dragged';
var _imgSrcViewCls = 'zoomImgCls_imgSrcView';
var _imgLinkCls = 'zoomImgCls_mhdt687po';
var _imgNoLinkCls = 'zoomImgCls_asntrs58f';
var _endInit = false;
var _img_element = null;
var _current_element = null;
var _wrapper_element = null;
var _ctx_show = true;
var _accKeyState = {ctrl: false, alt: false};
var _dragParam = null;
var _draggingCnt = 0;
var _clickFunc = null;
var _mdownFunc = null;
var _rclickCancelCnt = 0;

var _zoom_dim = 10;
var _zoom_rotd = 15;
var _zoom_rcCancel = 3000;
var _zoom_reverse = false;
var _zoom_bgImg = false;
var _zoom_autoRtn = false;
var _zoom_ctrlRvs = false;
var _zoom_enableCxt = true;
var _zoom_ivpDrag = false;
var _zoom_clickSwap = false;

var _singleImgPage = isSingleImgPage();


function a(x) { alert(x); }
function l(x) { console.log(x); }
function d(t,v) { if(_logOutput) console.log('[ZoomImage] '+t+': '+v); }

function isSingleImgPage() {
	var es = document.body.getElementsByTagName('*');
	return (es && es.length === 1 && es[0].tagName.toUpperCase() === 'IMG');
}

function init() {
	d('Init Start', '');
	
	if(_singleImgPage)
		singlePageAltImg(); // 画像のみのときは自前画像に置き換え
	
	if(_zoom_clickSwap) {
		_clickFunc = windowFiting;
		_mdownFunc = sizeFit;
	} else {
		_clickFunc = sizeFit;
		_mdownFunc = windowFiting;
	}
	
	$(document.body)
	.on('mousedown', e => {
		if(e.which === 3) {
			var t = document.elementFromPoint(e.clientX, e.clientY);
			checkTarget(t, e);
		}
	})
	.on('mouseup', e => {
		if(_dragParam) {
			_dragParam = null;
			d('Drag End', '');
		}
		if(e.which === 3 && _img_element)
			setTimeout(() => setZoom(), 100);
	})
	.on('mousemove', e => imgDrag(e.clientX, e.clientY))
	.on('keydown', e => { _accKeyState.ctrl = e.ctrlKey; _accKeyState.alt = e.altKey; })
	.on('keyup', e => { _accKeyState.ctrl = _accKeyState.alt = false; });
	
	// add:2021/01/14 画面外でもメニュー制御可能にするために画像イベントからここに移動
	// fix:2021/01/30 document.body → window
	$(window).on('contextmenu', e => _ctx_show);
	
	$(document).on('blur', e => {
		_accKeyState.ctrl = _accKeyState.alt = false;
		if(_img_element) setZoom();
	});
	
    exImgObserver();
    rclickCancelObserver();
	
	_endInit = true;
	d('Init End', '');
}

function singlePageAltImg() {
	if(!_zoom_ivpDrag)
		return;
	
	d('ImageView Sorce Page', '');
	var img = $(document.body.children[0]), modeFitCls = 'zoomImgCls_modeFit';
	img.hide();
	var nimg = $('<img>', {'class': _imgSrcViewCls, 'src': img.attr('src')});
	_current_element = nimg[0];
	nimg
	.on('load', function() { 
		var w = this.naturalWidth, h = this.naturalHeight, sw = $(document).width(), sh = $(document).height();
		var size = calcLimit(w, h, sw, sh);
		$(this).toggleClass(modeFitCls, w > size.w || h > size.h);
		$(this).css({'display': 'inline', 'left': (sw - size.w) / 2, 'top': (sh - size.h) / 2, 'width': size.w, 'height': size.h});
		checkTarget(this);
		setZoom();
	})
	.on('click', function() {
		if(!_img_element && $(this).hasClass(modeFitCls))
			ctxFit();
	});
	$(document.body).append(nimg);
}

function settingData(setting) {
	if(setting) {
		if(setting.dim != null) _zoom_dim = setting.dim; d('Setting_1zoom', _zoom_dim);
        if(setting.rotd != null) _zoom_rotd = setting.rotd; d('Setting_1rotate', _zoom_rotd);
        if(setting.rcCancel != null) _zoom_rcCancel = setting.rcCancel; d('Setting_R-ClickCancel', _zoom_rcCancel);
		if(setting.reverse != null) _zoom_reverse = setting.reverse; d('Setting_WheelReverse', _zoom_reverse);
		if(setting.bgImg != null) _zoom_bgImg = setting.bgImg; d('Setting_TargetBG', _zoom_bgImg);
		if(setting.autoRtn != null) _zoom_autoRtn = setting.autoRtn; d('Setting_AutoNormal', _zoom_autoRtn);
		if(setting.ctrlRvs != null) _zoom_ctrlRvs = setting.ctrlRvs; d('Setting_ctrlReverse', _zoom_ctrlRvs);
		if(setting.enableCxt != null) _zoom_enableCxt = setting.enableCxt; d('Setting_EnableCtxMenu', _zoom_enableCxt);
		if(setting.ivpDrag != null) _zoom_ivpDrag = setting.ivpDrag; d('Setting_DraggableImageView', _zoom_ivpDrag);
		if(setting.clickSwap != null) _zoom_clickSwap = setting.clickSwap; d('Setting_ClickCmdSwap', _zoom_clickSwap);
	}
}

function checkTarget(t, e) {
	if(t) {
		var attach = (o, imgObj) => {
			attachEvent(o, imgObj ? imgObj : null);
			setZoom(imgObj ? imgObj : o);
			enableContextMenus(true);
			return true;
		};
		_wrapper_element = null;
		var target = $(t);
		
		if(!target.data(_firstkey)) {
			var tag = t.tagName.toUpperCase();
			// 通常画像
			if(tag === 'IMG' || tag === 'CANVAS') {
				d('Image Type', 'Normal');
				return attach(target);
			}
			// 内包画像
			var imgs = t.getElementsByTagName('img');
			if(imgs.length > 0 && hitCheck($(imgs[0]), {x: e.pageX, y: e.pageY})) {
				d('Image Type', 'Inner');
				_wrapper_element = target;
				return attach(target, $(imgs[0]));
			}
			// 背景画像
			if(_zoom_bgImg) {
				var bgi = target.css('background-image');
				if(/url/i.test(bgi) && tag !== 'BODY') {
					target.attr('src', bgi.trim().replace(new RegExp('\'|\"', 'gi'), '').slice(4, -1));
					d('Image Type', 'BG');
					return attach(target);
				}
			}
			enableContextMenus(false);
		} else 
			enableContextMenus(true);
	}
}

function hitCheck(obj, pos) {
	var ofs = obj.offset(),
		op = {x: ofs.left + (parseInt(obj.css('border-left')) || 0) + (parseInt(obj.css('padding-left')) || 0), 
			  y: ofs.top + (parseInt(obj.css('border-top')) || 0) + (parseInt(obj.css('padding-top')) || 0)},
		rect = {x: op.x, y: op.y, r: op.x + obj.width(), b: op.y + obj.height()};
	return (rect.x < pos.x && pos.x < rect.r && rect.y < pos.y && pos.y < rect.b);
}

const defEventCancel = e => e.preventDefault();

function setZoom(img, def) {		// 解除する場合はimgを指定なしに
    _rclickCancelCnt = 0;
    $(window).off('wheel');

	// add:2021/01/14 FF84にてjQueryでのデフォルトイベントキャンセルが不可となったため
	window.addEventListener('wheel', defEventCancel, {passive: false});

	if(img) {
		d('ZoomTarget Set', '----------');
		_img_element = img;
		_current_element = _img_element[0];
		var data = _img_element.data(_firstkey);
		
		if(!data) {
			var obj = { 
				id: 'zoomImg_' + new Date().getTime().toString(16),
				sw: (def ? def.sw : _img_element.width()),
				sh: (def ? def.sh : _img_element.height()),
				sx: (def ? def.sx : _img_element.offset().left),
				sy: (def ? def.sy : _img_element.offset().top)
			};
			_img_element.data(_firstkey, obj);
			_img_element.data(_sizekey, {w: obj.sw, h: obj.sh});
			_img_element.data(_rotkey,  0);
		} else {
			if(!_img_element.data(_srckey) && 
			   _img_element.width() >= data.sw && _img_element.height() >= data.sh) {
				data.sx = _img_element.offset().left;
				data.sy = _img_element.offset().top;
			}
		}
		
		$(window).on('wheel', e => zoomEvent(e));
	} else {
		d('ZoomTarget Clear', '');

		// add:2021/01/14
		window.removeEventListener('wheel', defEventCancel, {passive: false});

		if(_zoom_autoRtn && _img_element) {
			var src_elem = _img_element.data(_srckey);
			if(src_elem) clearImgEx($(src_elem));
			setImageRect();
			imgRotate(0);
		}
		_img_element = null;
		_ctx_show = true;
	}
}

function calcPos(zoomSize) {
	var win = _singleImgPage ? $(document) : $(window);
	var data = _img_element.data(_firstkey);
	var firstSize = {w: data.sw, h: data.sh};
	var rect = {x: data.sx, y: data.sy, w: data.sw, h: data.sh, r: data.sx + data.sw, b: data.sy + data.sh};
	var x = rect.x, y = rect.y;

	if(firstSize.w < zoomSize.w && firstSize.h < zoomSize.h) {
	
		if(_img_element.hasClass(_draggedCls)) { // その場から動かさずに拡大
			var ofst = _img_element.offset(), iesz = {w: _img_element.width(), h: _img_element.height()};
			rect = {x: ofst.left, y: ofst.top, w: iesz.w, h: iesz.h, r: ofst.left + iesz.w, b: ofst.top + iesz.h};
		}
		
		x = rect.x - ((zoomSize.w - rect.w) / 2);
		y = rect.y - ((zoomSize.h - rect.h) / 2);
		
		// 画面端での位置調整
		if(!_img_element.hasClass(_draggedCls) && !_singleImgPage) {
			var r = x + zoomSize.w, b = y + zoomSize.h;
			var scrRect = {x: win.scrollLeft(), y: win.scrollTop(), w: win.width(), h: win.height(), 
						   r: win.scrollLeft() + win.width(), b: win.scrollTop() + win.height()};
			if(rect.x < scrRect.x) scrRect.x = rect.x;
			if(rect.r > scrRect.r) scrRect.r = rect.r;
			if(rect.y < scrRect.y) scrRect.y = rect.y;
			if(rect.b > scrRect.b) scrRect.b = rect.b;
			
			if(zoomSize.w <= scrRect.w) {
				if(x < scrRect.x) x = scrRect.x;
				if(r > scrRect.r) x = scrRect.r - zoomSize.w;
			} else {
				x = scrRect.x - ((zoomSize.w - scrRect.w) / 2);
			}
			if(zoomSize.h <= scrRect.h) {
				if(y < scrRect.y) y = scrRect.y;
				if(b > scrRect.b) y = scrRect.b - zoomSize.h;
			} else {
				y = scrRect.y - ((zoomSize.h - scrRect.h) / 2);
			}
		}
	}
	
	return {x: x, y: y, w: zoomSize.w, h: zoomSize.h};
}

function calcLimit(w, h, sw, sh) {
	if(w > sw) {
		h = (h*sw) / w;
		w = sw;
	}
	if(h > sh) {
		w = (w*sh) / h;
		h = sh;
	}
	return {w: w, h: h};
}

function generateImgEx(size) {
	d('Create FloatImage', '');
	var exImgWrapper = $('#' + _zoomExImgId);
	if(exImgWrapper.length === 0)
		exImgWrapper = $(`<div id="${_zoomExImgId}"></div>`).appendTo(document.body);
	
	var data = _img_element.data(_firstkey);
	_img_element.css('visibility', 'hidden');
	var rect = calcPos({w: size.w, h: size.h});
	var rot = _img_element.data(_rotkey);
	var img = $('#' + data.id);
	
	if(img.length === 0) {
		var elem = $('<img>', { 'id': data.id, 'class': _zoomImgCls, 'src': _img_element.attr('src')})
		.on('mouseover', () => false).on('drag', () => false).on('dragstart', () => false).on('dragend', () => false);
		
		var al = _img_element.parent('a');
		if(al.length !== 0) {
			var pt = $('<a href="' + al.attr('href') + '" target="' + (al.attr('target') || '_self') + '"></a>');
			elem.addClass(_imgLinkCls);
			exImgWrapper.append(pt.append(elem));
		} else {
			elem.addClass(_imgNoLinkCls);
			exImgWrapper.append(elem);
		}
		
		elem.data(_srckey, _img_element[0]);	// 元となる画像
		attachEvent(elem);
		setZoom(elem, {sx: data.sx, sy: data.sy, sw: data.sw, sh: data.sh});
		setImageRect({w: rect.w, h: rect.h});
		imgRotate(rot);
	}
}

function clearImgEx(src_elem, size) {
	d('Delete FloatImage', '');
	var data = _img_element.data(_firstkey);
	var rot = _img_element.data(_rotkey);
	src_elem.css('visibility', 'visible');
	
	var pnt = _img_element.parent('a');
	if(pnt.length === 1) pnt.remove(); else _img_element.remove();
	
	setZoom(src_elem, {sx: data.sx, sy: data.sy, sw: data.sw, sh: data.sh});
	setImageRect(size);
	imgRotate(rot);
}

function setImageRect(size, element) {	// 初期サイズにする場合はsizeを指定なしに
	if(!element) element = _img_element;
	var data = element.data(_firstkey);
	var rect = size ? calcPos({w: size.w, h: size.h}) : {x: data.sx, y: data.sy, w: data.sw, h: data.sh};
	if(_img_element.data(_srckey))
		element.css({'left': rect.x, 'top': rect.y});
	element.css({'width': rect.w, 'height': rect.h});
	element.data(_sizekey, {w: rect.w, h: rect.h});
	d('ImageSize', rect.w + ', ' + rect.h);
}

function imgRotate(rot, element) {
	if(!element) element = _img_element;
	if(rot === 0)
		element.css({'transform': ''});
	else
		element.css({'transform': 'rotate(' + rot + 'deg)'});
	d('ImageRotate deg', rot);
	element.data(_rotkey, rot);
}

function zoom(r, isZoomLimit) {
	var win = _singleImgPage ? $(document) : $(window);
	var data = _img_element.data(_firstkey);
	var size = _img_element.data(_sizekey);
	var src_elem = _img_element.data(_srckey);
	var w = size.w * r, h = size.h * r, sw = win.width(), sh = win.height();
	var floating = _zoom_ctrlRvs ? _accKeyState.ctrl : !_accKeyState.ctrl;
	var tag = _img_element[0].tagName.toUpperCase();
	
	if(tag === 'CANVAS')
		floating = false;
	d('Floating zoom', floating);
	
	if(isZoomLimit) {
		var limsiz = calcLimit(w, h, sw, sh);
		w = limsiz.w;
		h = limsiz.h;
	}
	
	if(!src_elem) {		// 元々あった画像
		if((w <= data.sw && h <= data.sh) || !floating) {
			setImageRect({w: w, h: h});
		} else {
			generateImgEx({w: w, h: h});
		}
	} else {			// 拡大用にアドオンで挿入した画像
		if(!floating) 
			clearImgEx($(src_elem), {w: w, h: h});
		else {
			if(w <= data.sw && h <= data.sh) {
				clearImgEx($(src_elem));
			} else {
				setImageRect({w: w, h: h});
			}
		}
	}
}

function sizeFit() {
	if(_img_element) {
		var data = _img_element.data(_firstkey);
		var src_elem = _img_element.data(_srckey);
		var w = _img_element.width(), h = _img_element.height();
		var nw = _img_element[0].naturalWidth, nh = _img_element[0].naturalHeight;
		var floating = _zoom_ctrlRvs ? _accKeyState.ctrl : !_accKeyState.ctrl;
		var tag = _img_element[0].tagName.toUpperCase();
		
		if(tag === 'CANVAS')
			floating = false;
		d('Floating zoom', floating);
		
		if(!src_elem) {		// 元々あった画像
			if(w === data.sw && h === data.sh && tag === 'IMG') {
				if((nw > data.sw && nh > data.sh) && floating)
					generateImgEx({w: w, h: h});
				setImageRect({w: nw, h: nh});
			} else {
				setImageRect();
				imgRotate(0);
			}
		} else {			// 拡大用にアドオンで挿入した画像
			clearImgEx($(src_elem));
			setImageRect();
			imgRotate(0);
		}
		
		_ctx_show = false;
		return false;
	}
	return true;
}

function windowFiting(fromCtxMenu) {
	if(_img_element) {
		d('Window Fit', '');
		zoom(10000, true);
		_ctx_show = false;
		if(!_img_element.data(_srckey))
			_img_element[0].scrollIntoView();
		return false;
	}
	// add:2021/01/14 コンテキストメニューからの呼び出し対応
	// fix:2021/01/30 fromCtxMenuによる判定追加
	else if(fromCtxMenu && _current_element) {
		setZoom($(_current_element));
		if(_img_element)
			windowFiting();
		setZoom();
	}
	return true;
}

function zoomEvent(e) {
	if(!_img_element)
		return;
	var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
	d('Wheel delta', delta);
	delta = _zoom_reverse ? -delta : delta;
	d('Wheel direction', delta < 0 ? -1 : 1);
	var dim = _zoom_dim * 0.01;
	var r = delta < 0 ? 1 - dim : (delta > 0 ? 1 + dim : 1);
	d('Zoom ratio', r);
    _rclickCancelCnt = 0;

	if(_accKeyState.alt)
		imgRotate((_img_element.data(_rotkey) + _zoom_rotd * (delta < 0 ? 1 : -1)) % 360);
	else
		zoom(r);
	
	_ctx_show = false;
	return false;
}

function ctxZoom(zin) {
	if(_current_element) {
		setZoom($(_current_element));
		zoom(zin ? 2.0 : 0.5);
		setZoom();
	}
}

function ctxRotation(rot) {
	if(_current_element) {
		setZoom($(_current_element));
		imgRotate((_img_element.data(_rotkey) + rot) % 360);
		setZoom();
	}
}

function ctxFit() {
	if(_current_element) {
		setZoom($(_current_element));
		sizeFit();
		setZoom();
	}
}

function attachEvent(elem, imgObj) {
	d('Attach Event', '');
	elem
	.on('click', e => {
		var jdg = _clickFunc() && _draggingCnt < 8;
		_draggingCnt = 0;
		return jdg;
	})
	.on('mousedown', function(e) {
		if(e.which === 3)
			setZoom(imgObj ? imgObj : $(this)); 
		else if(e.which === 1) {
			if($(this).hasClass(_zoomImgCls) && !_img_element) {
				var ofs = $(this).offset();
				_dragParam = {obj: $(this), x: e.pageX - ofs.left, y: e.pageY - ofs.top};
				$(this).addClass('zoomImgCls_draggingCur');
				d('Drag Start', '');
				e.preventDefault();
			}
		}
	})
	.on('mouseup', function(e) { 
		$(this).removeClass('zoomImgCls_draggingCur');
		if(e.which === 2)
			_mdownFunc();
	})
	.on('mouseenter mouseleave blur', e => { if(!_img_element) _ctx_show = true; });
}

function exImgObserver() {
	if(document.hasFocus()) {
		var exImgWrapper = document.getElementById(_zoomExImgId);
		if(exImgWrapper) {
			var imgs = exImgWrapper.getElementsByTagName('img');
			if(imgs.length !== 0) {
				for(let i = 0; i < imgs.length; i++) {
					let img = $(imgs[i]), se = $(img.data(_srckey));
					if(se.is(':hidden')) {
						let pnt = img.parent('a');
						if(pnt.length === 1) pnt.remove(); else img.remove();
						se.css('visibility', 'visible');
					}
				}
			} else
				$(exImgWrapper).remove();
		}
	}
	setTimeout(() => exImgObserver(), 250);
}

function rclickCancelObserver() {
    let inv = 100;
    if (document.hasFocus() && _img_element && _zoom_rcCancel > 0) {
        if (_rclickCancelCnt > (_zoom_rcCancel / inv))
            setZoom();
        else
            _rclickCancelCnt++;
    }
    setTimeout(() => rclickCancelObserver(), inv);
}

function imgDrag(x, y) {
	if(!_dragParam)
		return;
	
	var obj = _dragParam.obj;
	obj.css({'left': $(document).scrollLeft() + (x - _dragParam.x), 'top': $(document).scrollTop() + (y - _dragParam.y)});
	
	if(!obj.hasClass(_draggedCls) && _draggingCnt > 8)
		obj.addClass(_draggedCls);
	
	_draggingCnt++;
}

function enableContextMenus(enable) {
	browser.runtime.sendMessage({id: 'set-context', data: _zoom_enableCxt ? enable : false});
}

//------

function checkSendGetSetting() {
	if(document.hasFocus()) {
		d('SendMessage GetSetting', '');
		browser.runtime.sendMessage({id: 'get-setting'});
	} else 
		setTimeout(() => checkSendGetSetting(), 100);
}

browser.runtime.onMessage.addListener((msg) => {
	switch (msg.id) {
	case 'set-setting':
		settingData(msg.data);
		if(!_endInit)
			init();
		break;
	case 'zoom-in':
		ctxZoom(true);
		break;
	case 'zoom-out':
		ctxZoom(false);
		break;
	case 'r90':
		ctxRotation(90);
		break;
	case 'l90':
		ctxRotation(-90);
		break;
	case '180':
		ctxRotation(180);
		break;
	case 'fit-win':
		windowFiting(true);
		break;
	case 'fit':
		ctxFit();
		break;
	}
});

checkSendGetSetting();