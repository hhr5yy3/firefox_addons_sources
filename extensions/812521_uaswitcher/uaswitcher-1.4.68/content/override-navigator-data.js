/*
 * User Agent Switcher
 * Copyright © 2017-2020  Erin Yuki Schlarb
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @ts-nocheck

/**
 * Property names overshadowed by this script
 */
const PROPERTY_NAMES = Object.freeze(new Set([
	"userAgent",
	"platform",
	"appVersion",
	"buildID",
	"cpuClass",
	"oscpu",
	"product",
	"productSub",
	"vendor",
	"vendorSub",
]));

/**
 * Static reference to the original ES6 Proxy object in page scope
 *
 * Required as `cloneInto` is not implemented for this object type.
 */
const origProxy = window.wrappedJSObject.Proxy;

/**
 * Set of all object that we have already pacthed to prevent them from being
 * patched twice
 */
let patchedObjects = new Map();


/**
 * Convinience wrapped around `cloneInto` that enables all possible cloning
 * options by default
 */
function cloneIntoFull(value, scope) {
	return cloneInto(value, scope, {
		cloneFunctions: true,
		wrapReflectors: true
	});
}


/**
 * Override `navigator` with the given data on the given (content-script scope)
 * `window` object if applicable
 */
function applyUserAgentOverride(window, navigatorDataSet) {
	if(!(window instanceof Window)) {
		return window;  // Not actually a window object
	}
	
	let navigator = window.navigator.wrappedJSObject;
	if(patchedObjects.has(navigator)) {
		return window;  // Window was already been patched
	}
	let patchedProperties = new Set();
	patchedObjects.set(navigator, patchedProperties);
	
	for(let prop of PROPERTY_NAMES) {
		// This will return incorrect results for `Reflect.getOwnPropertyDescriptor`
		// but we work around that by simply patching *that* function as well
		// to return the right things for the few objects we actually touched
		Reflect.defineProperty(navigator, prop, {
			get: exportFunction(() => {
				return navigatorDataSet[prop];
			}, window.wrappedJSObject),
			configurable: true,
			enumerable: false
		});
		patchedProperties.add(prop);
	}
	
	// Override property reflection functions to hide the true property value
	// of the properties we've overwritten and return what would have otherwise
	// been returned instead (which is `undefined` for each of the default
	// navigator properties)
	//
	// Additionally this also overrides all the properties setter functions to
	// ensure that we *drop* override we have for each of these objects if the
	// page script decides they want to override it themselves, thereby (again)
	// emulating the exact behaviour the browser would expose in such case.
	let origReflectGetOwnPropertyDescriptor = window.Reflect.wrappedJSObject.getOwnPropertyDescriptor;
	exportFunction((target, propertyKey) => {
		let realTarget = target.wrappedJSObject;
		if(patchedObjects.has(realTarget) && patchedObjects.get(realTarget).has(propertyKey)) {
			return undefined;
		} else {
			return origReflectGetOwnPropertyDescriptor(target, propertyKey);
		}
	}, window.Reflect.wrappedJSObject, { defineAs: "getOwnPropertyDescriptor" });
	
	let origReflectDefineProperty = window.Reflect.wrappedJSObject.defineProperty;
	exportFunction((target, propertyKey, attributes) => {
		let realTarget = target.wrappedJSObject;
		if(patchedObjects.has(realTarget)) {
			patchedObjects.get(realTarget).delete(propertyKey);
		}
		return origReflectDefineProperty(target, propertyKey, attributes);
	}, window.Reflect.wrappedJSObject, { defineAs: "defineProperty" });
	
	let origObjectGetOwnPropertyDescriptor = window.Object.wrappedJSObject.getOwnPropertyDescriptor;
	exportFunction((obj, prop) => {
		let realObj = obj.wrappedJSObject;
		if(patchedObjects.has(realObj) && patchedObjects.get(realObj).has(prop)) {
			return undefined;
		} else {
			return origObjectGetOwnPropertyDescriptor(obj, prop);
		}
	}, window.Object.wrappedJSObject, { defineAs: "getOwnPropertyDescriptor" });
	
	let origObjectGetOwnPropertyDescriptors = window.Object.wrappedJSObject.getOwnPropertyDescriptors;
	exportFunction((obj) => {
		let realObj = obj.wrappedJSObject;
		let result = origObjectGetOwnPropertyDescriptors(obj);
		if(patchedObjects.has(realObj)) {
			for(let prop of patchedObjects.get(realObj).has(prop)) {
				delete result[prop];
			}
		}
		return result;
	}, window.Object.wrappedJSObject, { defineAs: "getOwnPropertyDescriptors" });
	
	let origObjectDefineProperty = window.Object.wrappedJSObject.defineProperty;
	exportFunction((obj, prop, descriptor) => {
		let realObj = obj.wrappedJSObject;
		if(patchedObjects.has(realObj)) {
			patchedObjects.get(realObj).delete(prop);
		}
		return origObjectDefineProperty(obj, prop, descriptor);
	}, window.Object.wrappedJSObject, { defineAs: "defineProperty" });
	
	let origObjectDefineProperties = window.Object.wrappedJSObject.defineProperties;
	exportFunction((obj, props) => {
		let realObj = obj.wrappedJSObject;
		if(patchedObjects.has(realObj)) {
			for(let prop of Object.keys(props)) {
				patchedObjects.get(realObj).delete(prop);
			}
		}
		return origObjectDefineProperties(obj, props);
	}, window.Object.wrappedJSObject, { defineAs: "defineProperties" });
	
	return window;
}


/**
 * Override  `navigator` with the given data on the given page scoped `window`
 * object if applicable
 *
 * This will convert the given `window` object to being content-script scoped
 * after checking whether it can be converted at all or is just a restricted
 * accessor that does not grant access to anything important.
 */
function applyUserAgentOverrideFromPageScope(unsafeWindow, navigatorDataSet) {
	if(!(unsafeWindow instanceof Window)) {
		return unsafeWindow;  // Not actually a window object
	}
	
	try {
		unsafeWindow.navigator; // This will throw if this is a cross-origin frame
		
		let windowObj = cloneIntoFull(unsafeWindow, window);
		return applyUserAgentOverride(windowObj, navigatorDataSet).wrappedJSObject;
	} catch(e) {
		if(e instanceof DOMException && e.name == "SecurityError") {
			// Ignore error created by accessing a cross-origin frame and
			// just return the restricted frame (`navigator` is inaccessible
			// on these so there is nothing to patch)
			return unsafeWindow;
		} else {
			throw e;
		}
	}
}


/**
 * Override the properties of the page's global `navigator` object
 * (as well as the object exposed through each IFrame) with the
 * properties from the given data-set object
 * 
 * (This function will be called from the dynamically generated content-script
 * JavaScript snippets.)
 * 
 * @param {utils.uaparser.DataSet} navigatorDataSet
 */
/** @type {(navigator: Navigator) => void} */
// eslint-disable-next-line no-unused-vars
function overrideNavigatorData(navigatorDataSet) {
	// Override navigator properties of the current frame
	applyUserAgentOverride(window, navigatorDataSet);
	
	// Use some prototype hacking to prevent access to the original `navigator`
	// through the IFrame leak
	const IFRAME_TYPES = Object.freeze([HTMLFrameElement, HTMLIFrameElement]);
	for(let type of IFRAME_TYPES) {
		// Get reference to contentWindow & contentDocument accessors into the
		// content script scope
		let contentWindowGetter = Reflect.getOwnPropertyDescriptor(
			type.prototype.wrappedJSObject, "contentWindow"
		).get;
		contentWindowGetter = cloneIntoFull(contentWindowGetter, window);
		let contentDocumentGetter = Reflect.getOwnPropertyDescriptor(
			type.prototype.wrappedJSObject, "contentDocument"
		).get;
		contentDocumentGetter = cloneIntoFull(contentDocumentGetter, window);
		
		// Export compatible accessor on the property that patches the navigator
		// element before returning
		Object.prototype.__defineGetter__.call(type.prototype.wrappedJSObject, "contentWindow",
				exportFunction(function () {
					let contentWindow = contentWindowGetter.call(this);
					return applyUserAgentOverrideFromPageScope(contentWindow, navigatorDataSet);
				}, window.wrappedJSObject)
		);
		Object.prototype.__defineGetter__.call(type.prototype.wrappedJSObject, "contentDocument",
				exportFunction(function () {
					let contentDocument = contentDocumentGetter.call(this);
					if(contentDocument !== null) {
						applyUserAgentOverrideFromPageScope(contentDocument.defaultView, navigatorDataSet);
					}
					return contentDocument;
				}, window.wrappedJSObject)
		);
	}
	
	// Prevent accessing the original `navigator` using `window.frames`
	// (which is an alias for just `window`)
	let origFrames = window.wrappedJSObject.frames;
	let framesProxy = new origProxy(origFrames, cloneInto({
		get: (target, prop, receiver) => {
			// See line 57 for details for why we skip `receiver` here
			let unsafeValue = Reflect.get(origFrames, prop);
			return applyUserAgentOverrideFromPageScope(unsafeValue, navigatorDataSet);
		},
		
		getOwnPropertyDescriptor: (target, prop) => {
			let unsafeDescriptor = Reflect.getOwnPropertyDescriptor(origFrames, prop);
			applyUserAgentOverrideFromPageScope(unsafeDescriptor.value, navigatorDataSet);
			return unsafeDescriptor;
		}
	}, window.wrappedJSObject, {
		cloneFunctions: true,
		wrapReflectors: true
	}));
	
	Object.prototype.__defineGetter__.call(window.wrappedJSObject, "frames",
			exportFunction(() => {
				return framesProxy;
			}, window.wrappedJSObject)
	);
	
	// Asynchrously track added IFrame elements and trigger their prototype
	// properties defined above to ensure that they are patched
	// (This is a best-effort workaround for us being unable to *properly* fix the `window[0]` case.)
	let patchNodes = (nodes) => {
		for(let node of nodes) {
			let isNodeFrameType = false;
			for(let type of IFRAME_TYPES) {
				if(isNodeFrameType = (node instanceof type)){ break; }
			}
			if(!isNodeFrameType) {
				continue;
			}
			
			node.contentWindow;
			node.contentDocument;
		}
	};
	let observer = new MutationObserver((mutations) => {
		for(let mutation of mutations) {
			patchNodes(mutation.addedNodes);
		}
	});
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
	patchNodes(document.querySelectorAll("frame,iframe"));
}
