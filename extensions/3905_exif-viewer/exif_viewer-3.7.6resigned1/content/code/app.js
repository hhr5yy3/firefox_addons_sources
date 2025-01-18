//
//	Copyright notice: I wrote this code. You didn't.
//
// controller for the app
//	- holds added modules in a pile
//  - waits until everything has been loaded and then:
//		- sorts the pending modules based on the dependency structure
//		- processes the sorted modules in order, ensuring that the dependent modules
//		  already exist
//		- runs the specified start-up function

;var ExifViewerApp = (function () {
	'use strict';

	var modules = {}, pile = {}, loaded = {}, 
		defer_mid, defer_fcn, defer_args,
		loadedCount = 0, toLoadCount = -1, contentLoaded = false,
		sortedIDs = [], exports = {},
		isXUL,
		DEBUG = true;
		
		(function () {
			var scripts, script;
			
			if (document.currentScript) {
				script = document.currentScript;
			} else {
				scripts = document.getElementsByTagName('script');
				script = scripts[scripts.length - 1];
			}
			isXUL = (script.getAttribute('data-mode') === 'xul');
		})();

	// use a depth-first search to sort pending modules, so that each one can be 
	// loaded after all its dependencies have been loaded
	function examinePendingModule(mid) {
		var args, i;

		if (sortedIDs.indexOf(mid) !== -1) {	// already in list, so skip
			return;
		}
		if (DEBUG) { window.console.log('App: Examining module', mid); }

		// first check each of its dependencies
		if (pile[mid]) {
			args = pile[mid].args;
			if (args  &&  args instanceof Array) {
				for (i = 0 ; i < args.length ; i += 1) {
					if (!pile[args[i]]) {
						window.console.log('App: Module not found: "' + args[i] + '"');
						continue;
					}
					if (!pile[args[i]].visited) {
						pile[args[i]].visited = true;
						examinePendingModule(args[i]);
					}
				}
			}
		} else {
			window.console.log('App: Pending module "' + mid + '" does not exist.');
		}

		// now it can be loaded
		sortedIDs.push(mid);
	}	// examinePendingModule()
	
	// add a module to the system
	function add(mid, moduleFcn, moduleArgs) {
		var i, args = [];

		if (loaded[mid]) {
			window.console.log('App: Module "' + mid + '" already exists; ignoring add request...');
		} else {
			if (DEBUG) { window.console.log('App: Loading module "' + mid + '"'); }
			if (moduleArgs) {
				// convert from the argument-module IDs to the modules themselves
				for (i = 0 ; i < moduleArgs.length ; i += 1) {
					args.push(get(moduleArgs[i]));
				}
			}
			// now execute the function to get the module
			modules[mid] = moduleFcn.apply(null, args);
			loaded[mid] = true;
		}
	}	// add()
	
	// add the module to the pending pile
	function addToPile(mid, moduleFcn, moduleArgs) {
		pile[mid] = {id: mid, fcn: moduleFcn, args: moduleArgs, visited: false};
	}	// addToPile()
	
	// get the module based on its ID
	function get(mid) {
		if (!loaded[mid]) {
			window.console.log('App: Module "' + mid + '" does not exist; ignoring get request...');
		}
		return modules[mid];
	}	// get()
	
	// when everything is loaded, process the pending modules and then execute the
	// start-up function
	function run(mid, fcn, args) {
		var i, pid, pend;

		// sort the pending modules by dependency
		for (pid in pile) {
			if (pile.hasOwnProperty(pid)) {
				examinePendingModule(pid);
			}
		}
		if (DEBUG) { window.console.log('App: Dependencies order is "' + sortedIDs.join('", "') + '"'); }
		
		// add each to the system in dependency prder
		for (i = 0 ; i < sortedIDs.length ; i += 1) {
			pend = pile[sortedIDs[i]];
			add(pend.id, pend.fcn, pend.args);
		}

		// execute the start-up function
		if (!loaded[mid]) {
			window.console.log('App: Module "' + mid + '" does not exist; ignoring defer request...');
		} else if (!modules[mid][fcn]) {
			window.console.log('App: Module "' + mid + '" does not contain function "' + fcn + '"; ignoring defer request...');
		} else {
			defer_fcn = modules[mid][fcn];
		}
		if (!defer_fcn) {
			window.console.log('App: No deferred function specified; aborting...');
			return;
		} else {
			if (defer_fcn  &&  typeof defer_fcn === 'function') {
				if (DEBUG) { window.console.log('App: Executing deferred function'); }
				defer_fcn.apply(null, args);
			} else {
				window.console.log('App: Deferred function not found');
			}
		}
	}	// run()
	
	// specify which start-up function should be executed after content load
	function defer(mid, fcn, args) {
		if (DEBUG) { window.console.log('App: Deferring script:', mid, fcn, args || '(no arguments specified)'); }
		window.addEventListener('DOMContentLoaded', function () {
			contentLoaded = true;
			if (DEBUG) { window.console.log('App: Window content loaded'); }
			// ensure all modules have been loaded
			if (loadedCount === toLoadCount) {
				run(mid, fcn, args)
			} else {
				// save startup info for later
				defer_mid = mid;
				defer_fcn = fcn;
				defer_args = args;
			}
		});
	}	// defer()
	
	
	function load(filenames) {
		var i, script, xulfn, head = document.getElementsByTagName('head')[0];

		if (isXUL) {
			//loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader); 
			Components.utils.import('resource://gre/modules/Services.jsm');
		}

		if (DEBUG) { window.console.log('App: Requesting scripts "' + filenames.join('", "') + '"'); }
		toLoadCount = filenames.length;
		for (i = 0 ; i < filenames.length ; i += 1) {
			if (isXUL) {
				//loader.loadSubScript('content/code' + filenames[i] + '.js');
				xulfn = 'chrome://exif/content/' + filenames[i] + '.js';
				try {
					if (DEBUG) { window.console.log('App: XUL script load: ' + xulfn); }
					Services.scriptloader.loadSubScriptWithOptions(xulfn, 
						{target: this, charset: 'UTF-8', ignoreCache: true});
					loadedCount += 1;
					if (loadedCount === toLoadCount  &&  contentLoaded) {
						run(defer_mid, defer_fcn, defer_args);
					}
				} catch (e) {
					window.console.log(e);
				}
			} else {
				script = document.createElement('script');
				script.src = filenames[i] + '.js';
				script.addEventListener('load', function () {
					loadedCount += 1;
					if (loadedCount === toLoadCount  &&  contentLoaded) {
						run(defer_mid, defer_fcn, defer_args);
					}
				}, false);
				script.addEventListener('error', function () {
					window.console.log('App: Error encountered while trying to load script "' + this.src + '"');
				}, false);
				head.appendChild(script);
			}
		}
	}	// load()
	
	function exportFcn(name, fcn) {
		exports[name] = fcn;
	}	// exportFcn()

	return {
		add: addToPile,
		defer: defer,
		load: load,
		'export': exportFcn,
		exports: exports
	};
})();

/*
	(window.browser ? true : false) && ((document.currentScript ? false : true) || document.currentScript.getAttribute('data-mode') === 'xul')

*/