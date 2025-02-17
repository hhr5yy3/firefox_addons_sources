/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!****************************!*\
  !*** multi content_script ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/content_script.ts */59);


/***/ }),

/***/ 59:
/*!*******************************!*\
  !*** ./src/content_script.ts ***!
  \*******************************/
/***/ (function(module, exports) {

	const bgImgLeftMargin = 97;
	const bgImgSize = 20;
	const inputTMBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYmZkZTQxOS00ZGRkLWU5NDYtOWQ2MC05OGExNGJiMTA3N2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDAyNDkwMkRDOTIyMTFFNkI0MzFGRTk2RjM1OTdENTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDAyNDkwMkNDOTIyMTFFNkI0MzFGRTk2RjM1OTdENTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTU2NTE1NDItMmIzOC1kZjRkLTk0N2UtN2NjOTlmMjQ5ZGFjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJiZmRlNDE5LTRkZGQtZTk0Ni05ZDYwLTk4YTE0YmIxMDc3ZiIv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';
	let observer = null;
	function insertEmail(e) {
	    if (isOverImgBg(e)) {
	        try {
	            chrome.runtime.sendMessage({
	                action: 'getTempEmail',
	                inputDataId: e.target.getAttribute('data-temp-mail-org')
	            });
	        }
	        catch (e) {
	            return false;
	        }
	    }
	}
	function mouseMove(e) {
	    if (isOverImgBg(e)) {
	        e.target.style.cursor = 'pointer';
	    }
	    else {
	        e.target.style.cursor = 'auto';
	    }
	}
	function mouseEnterOut(e) {
	    setTMBtn(e.target);
	}
	function isOverImgBg(e) {
	    return (e.clientX - e.target.getBoundingClientRect().left) / (e.target.scrollWidth - bgImgSize) * 100 > bgImgLeftMargin;
	}
	function getEmailInputs() {
	    return Array.from(document.querySelectorAll('input[type=email]:enabled:not([readonly]),' +
	        'input[name*="email"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="mail"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="Mail"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="почта"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="пошта"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*=\'דוא"ל\']:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="البريد"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="correo electrónico"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="อีเมล"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="ईमेल"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="E-poçta"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="E-posta"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="E-post"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="E-mel"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="پست الکترونیک"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="이메일"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="Eメール"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="R-phost"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="Surel"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="Tölvupóstur"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="Sähköposti"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"]),' +
	        'input[placeholder*="电邮"]:enabled:not([readonly]):not([type="checkbox"]):not([type="radio"])'));
	}
	function setTMBtn(e) {
	    e.setAttribute('style', `background-image: url(${inputTMBg}) !important`);
	    e.style.backgroundRepeat = 'no-repeat';
	    e.style.backgroundSize = `${bgImgSize}px`;
	    e.style.backgroundPosition = `${bgImgLeftMargin}% center`;
	    e.style.cursor = 'auto';
	    e.addEventListener('mousemove', mouseMove);
	    e.addEventListener('click', insertEmail);
	}
	function showAutofillBtn() {
	    const emailInputs = getEmailInputs();
	    emailInputs.forEach(function (e, t) {
	        if (!e.hasAttribute('data-temp-mail-org')) {
	            setTMBtn(e);
	            e.addEventListener('mouseenter', mouseEnterOut);
	            e.addEventListener('mouseout', mouseEnterOut);
	            e.setAttribute('data-temp-mail-org', t.toString());
	        }
	    });
	}
	function hideAutofillBtn() {
	    if (observer !== null) {
	        observer.disconnect();
	        observer = null;
	    }
	    const emailInputs = getEmailInputs();
	    emailInputs.forEach(function (e) {
	        if (e.hasAttribute('data-temp-mail-org')) {
	            e.removeEventListener('mousemove', mouseMove);
	            e.removeEventListener('mouseenter', mouseEnterOut);
	            e.removeEventListener('mouseout', mouseEnterOut);
	            e.removeEventListener('click', insertEmail);
	            e.style.backgroundImage = e.style.backgroundRepeat = e.style.backgroundSize = e.style.backgroundPosition = e.style.cursor = '';
	            e.removeAttribute('data-temp-mail-org');
	        }
	    });
	}
	function startObserveDomChanges() {
	    if (observer === null) {
	        const targetNode = document.querySelector('body');
	        const config = { childList: true, subtree: true };
	        observer = new MutationObserver(showAutofillBtn);
	        observer.observe(targetNode, config);
	    }
	}
	function insertEmailByContextMenu(email) {
	    const el = document.activeElement;
	    el.value = email;
	    const o = new Event('input', { bubbles: !0 });
	    el.dispatchEvent(o);
	}
	chrome.runtime.onMessage.addListener(function (request) {
	    if (request.email && request.contextMenu) {
	        insertEmailByContextMenu(request.email);
	    }
	    if (request.email && request.inputDataId) {
	        const el = document.querySelector(`input[data-temp-mail-org='${request.inputDataId}']`);
	        if (el) {
	            el.value = request.email;
	            const o = new Event('input', { bubbles: !0 });
	            el.dispatchEvent(o);
	        }
	    }
	    if (request.action && request.action === 'autofillEnabled') {
	        if (request.autofill) {
	            showAutofillBtn();
	            startObserveDomChanges();
	        }
	        else {
	            hideAutofillBtn();
	        }
	    }
	});


/***/ })

/******/ });