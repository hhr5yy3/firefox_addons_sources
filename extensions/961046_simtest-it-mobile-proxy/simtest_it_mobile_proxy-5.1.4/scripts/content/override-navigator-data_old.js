


		/**
		 * Property names overshadowed by this script
		 */
		const PROPERTY_NAMES = Object.freeze(new Set([
			//user-agent datas
			"userAgent",
			"platform",
			"appVersion",
			"cpuClass",
			"oscpu",
			"product",
			"productSub",
			"vendor",
			"vendorSub",

			//language datas
			"language",
			"languages"
		]));

		/**
		 * Static reference to the original ES6 Proxy object in page scope
		 *
		 * Required as `cloneInto` is not implemented for this object type.
		 */
		const origProxy = window.wrappedJSObject.Proxy;

		/**
		 * Set of all object that we have already proxied to prevent them from being
		 * proxied twice
		 */
		let proxiedObjects = new Set();


		/**
		 * Listen for messages from the background script.
		 */
		browser.runtime.onMessage.addListener(request => {
			var message = JSON.parse(request)
			if (message.command === "content-changeUaLang") {
				overrideNavigatorData_old(message.navigatorDataSet)
			}
		});

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
		 * Override  `navigator` with the given data on the given (content-script scope)
		 * `window` object if applicable
		 */
		function applyUserAgentOverride(window, navigatorDataSet) {
			if(!(window instanceof Window)) {
				return window;  // Not actually a window object
			}
console.log("1");
			let origNavigator = window.navigator.wrappedJSObject;
			if(proxiedObjects.has(origNavigator)) {
				return window;  // Window was already shadowed
			}
			console.log("2", origNavigator);
			let navigatorProxy = new origProxy(origNavigator, cloneInto({
				get: (target, prop, receiver) => {
					console.log(prop);
					if(PROPERTY_NAMES.has(prop)) {
						console.log(prop, navigatorDataSet.hasOwnProperty(prop),"asd: " + navigatorDataSet[prop] )
						return navigatorDataSet.hasOwnProperty(prop)
							? navigatorDataSet[prop]
							: undefined;
					}

					// Workarounds for Firefox 68 and below (issue #70):
					//  * Do not pass receiver (ie: this Proxy object) as `this` to avoid
					//    `TypeError: '…' called on an object that does not implement interface Navigator.`
					//  * Pass `origNavigator` instead of `target` to avoid
					//    `Error: Permission denied to access property …`
					//  * Bind functions like `navigator.javaEnabled()` to the
					//    orginal object in the page scope to allow them to execute
					let value = Reflect.get(origNavigator, prop);
					if(typeof(value) === "function") {
						value = cloneIntoFull(Function.prototype.bind.call(value, origNavigator), window.wrappedJSObject);
					}
					return value;
				}

				// Object.getOwnPropertyDescriptor(…) will return `undefined` just
				// like in the original implementation
			}, window.wrappedJSObject, {
				cloneFunctions: true,
				wrapReflectors: true
			}));

			console.log("3");
			proxiedObjects.add(origNavigator);

			// Using `__defineGetter__` here our function gets assigned the correct
			// name of `get navigator`. Additionally its property descriptor has
			// no `set` function and will silently ignore any assigned value. – This
			// exact configuration is not achivable using `Object.defineProperty`.
			Object.prototype.__defineGetter__.call(window.wrappedJSObject, "navigator",
					exportFunction(() => {
						return navigatorProxy;
					}, window.wrappedJSObject)
			);

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
		 * @param {Object} navigatorDataSet
		 */
		/** @type {(navigator: Navigator) => void} */
		function overrideNavigatorData_old(navigatorDataSet) {
			// Override navigator properties of the current frame
			console.log("overrideNavigatorData", JSON.stringify(navigatorDataSet));
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
