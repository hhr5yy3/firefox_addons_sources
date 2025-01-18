/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([19,0,6]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SetLinuxNativeVersion = SetLinuxNativeVersion;
exports.GetLinuxNativeVersion = GetLinuxNativeVersion;
exports.SetWindowsNativeVersion = SetWindowsNativeVersion;
exports.GetWindowsNativeVersion = GetWindowsNativeVersion;
exports.SetMacNativeVersion = SetMacNativeVersion;
exports.GetMacNativeVersion = GetMacNativeVersion;
exports.SetExtensionFunctionPrefix = SetExtensionFunctionPrefix;
exports.GetExtensionFunctionPrefix = GetExtensionFunctionPrefix;
exports.SetExtensionInternalNamespacePrefix = SetExtensionInternalNamespacePrefix;
exports.GetExtensionInternalNamespacePrefix = GetExtensionInternalNamespacePrefix;
exports.SetExtensionPrefixForFunctionAndInternalNamespace = SetExtensionPrefixForFunctionAndInternalNamespace;
exports.SetNativeUrl_x32_exe = SetNativeUrl_x32_exe;
exports.SetNativeUrl_x64_exe = SetNativeUrl_x64_exe;
exports.SetNativeUrl_x64_msi = SetNativeUrl_x64_msi;
exports.SetNativeUrl_x32_msi = SetNativeUrl_x32_msi;
exports.SetNativeUrl_x64_rpm = SetNativeUrl_x64_rpm;
exports.SetNativeUrl_x32_rpm = SetNativeUrl_x32_rpm;
exports.SetNativeUrl_x64_deb = SetNativeUrl_x64_deb;
exports.SetNativeUrl_x32_deb = SetNativeUrl_x32_deb;
exports.SetNativeUrl_x64_mac = SetNativeUrl_x64_mac;
exports.GetNativeUrl_x64_mac = GetNativeUrl_x64_mac;
exports.GetNativeUrl_x32_exe = GetNativeUrl_x32_exe;
exports.GetNativeUrl_x64_exe = GetNativeUrl_x64_exe;
exports.GetNativeUrl_x64_msi = GetNativeUrl_x64_msi;
exports.GetNativeUrl_x32_msi = GetNativeUrl_x32_msi;
exports.GetNativeUrl_x64_rpm = GetNativeUrl_x64_rpm;
exports.GetNativeUrl_x32_rpm = GetNativeUrl_x32_rpm;
exports.GetNativeUrl_x64_deb = GetNativeUrl_x64_deb;
exports.GetNativeUrl_x32_deb = GetNativeUrl_x32_deb;
var extensionFunctionPrefix = "";
var extensionInternalNamespacePrefix = "";
var nativeUrl_x32_exe = "";
var nativeUrl_x64_exe = "";
var nativeUrl_x64_msi = "";
var nativeUrl_x32_msi = "";
var natuveUrl_x64_rpm = "";
var natuveUrl_x32_rpm = "";
var natuveUrl_x64_deb = "";
var natuveUrl_x32_deb = "";
var nativeUrl_x64_mac = "";
var linux_native_version = "1.1.0";
var windows_native_version = "1.1.0";
var mac_native_version = "1.0.0";

function SetLinuxNativeVersion(version) {
    linux_native_version = version;
}

function GetLinuxNativeVersion() {
    return linux_native_version;
}

function SetWindowsNativeVersion(version) {
    windows_native_version = version;
}

function GetWindowsNativeVersion() {
    return windows_native_version;
}

function SetMacNativeVersion(version) {
    mac_native_version = version;
}

function GetMacNativeVersion() {
    return mac_native_version;
}

function SetExtensionFunctionPrefix(prefix) {
    extensionFunctionPrefix = prefix;
}

function GetExtensionFunctionPrefix() {
    return extensionFunctionPrefix;
}

function SetExtensionInternalNamespacePrefix(prefix) {
    extensionInternalNamespacePrefix = prefix;
}

function GetExtensionInternalNamespacePrefix() {
    return extensionInternalNamespacePrefix;
}

function SetExtensionPrefixForFunctionAndInternalNamespace(prefix) {
    SetExtensionInternalNamespacePrefix(prefix);
    SetExtensionFunctionPrefix(prefix.toLowerCase());
}

function SetNativeUrl_x32_exe(url) {
    return nativeUrl_x32_exe = url;
}

function SetNativeUrl_x64_exe(url) {
    return nativeUrl_x64_exe = url;
}

function SetNativeUrl_x64_msi(url) {
    return nativeUrl_x64_msi = url;
}

function SetNativeUrl_x32_msi(url) {
    return nativeUrl_x32_msi = url;
}

function SetNativeUrl_x64_rpm(url) {
    return natuveUrl_x64_rpm = url;
}

function SetNativeUrl_x32_rpm(url) {
    return natuveUrl_x32_rpm = url;
}

function SetNativeUrl_x64_deb(url) {
    return natuveUrl_x64_deb = url;
}

function SetNativeUrl_x32_deb(url) {
    return natuveUrl_x32_deb = url;
}

function SetNativeUrl_x64_mac(url) {
    return nativeUrl_x64_mac = url;
}

function GetNativeUrl_x64_mac() {
    return nativeUrl_x64_mac;
}

function GetNativeUrl_x32_exe() {
    return nativeUrl_x32_exe;
}

function GetNativeUrl_x64_exe() {
    return nativeUrl_x64_exe;
}

function GetNativeUrl_x64_msi() {
    return nativeUrl_x64_msi;
}

function GetNativeUrl_x32_msi() {
    return nativeUrl_x32_msi;
}

function GetNativeUrl_x64_rpm() {
    return natuveUrl_x64_rpm;
}

function GetNativeUrl_x32_rpm() {
    return natuveUrl_x32_rpm;
}

function GetNativeUrl_x64_deb() {
    return natuveUrl_x64_deb;
}

function GetNativeUrl_x32_deb() {
    return natuveUrl_x32_deb;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IsVersionEqualOrGreaterThan = IsVersionEqualOrGreaterThan;
exports.IsVersionEqualOrGreaterThanInternal = IsVersionEqualOrGreaterThanInternal;
exports.GetOS = GetOS;
exports.GetMachineArch = GetMachineArch;
exports.GetBrowserArch = GetBrowserArch;
exports.IsEdge = IsEdge;
exports.GetBrowserFacade = GetBrowserFacade;
exports.IsChrome = IsChrome;
exports.PromptDownload = PromptDownload;

var _config = __webpack_require__(0);

function IsVersionEqualOrGreaterThan(actualVersion, operationSystem) {
    var expectedVersion;
    if (operationSystem == "Windows") {
        expectedVersion = (0, _config.GetWindowsNativeVersion)();
    } else if (operationSystem == "macOS") {
        expectedVersion = (0, _config.GetMacNativeVersion)();
    } else if (operationSystem == "Linux" || typeof operationSystem != "undefined") {
        expectedVersion = (0, _config.GetLinuxNativeVersion)();
    } else {
        expectedVersion = (0, _config.GetLinuxNativeVersion)();
    }
    return IsVersionEqualOrGreaterThanInternal(actualVersion, expectedVersion);
}

function IsVersionEqualOrGreaterThanInternal(actualVersion, expectedVersion) {
    var actualVersionVector = actualVersion.split('.');
    var expectedVersionVector = expectedVersion.split('.');

    for (var i = 0; i < actualVersionVector.length; i++) {
        var actualVersionNumber = parseInt(actualVersionVector[i]);
        var expectedVersionNumber = parseInt(expectedVersionVector[i]);
        if (actualVersionNumber < expectedVersionNumber) {
            return false;
        } else if (actualVersionNumber > expectedVersionNumber) {
            return true;
        }
    }
    return true;
}

function GetOS() {
    var platform = navigator.platform.toLowerCase();
    if (platform.search(/win/i) > -1) {
        return "windows";
    } else if (platform.search(/linux/i) > -1) {
        return "linux";
    } else if (platform.search(/mac/i) > -1) {
        return "macos";
    } else {
        return "unknown";
    }
}

function GetMachineArch() {
    // TODO padronizar a utilização desta função
    var arch = (navigator.platform + navigator.userAgent).toLowerCase();
    if (arch.search(/win64/i) > -1 || arch.search(/x86_64/i) > -1 || arch.search(/x64\)/i) > -1 || arch.search(/x64;/i) > -1 || arch.search(/wow64;/i) > -1) {
        return "x64";
    } else if (arch.search(/i386/i) > -1) {
        return "x32";
    } else {
        return "unknown";
    }
}

function GetBrowserArch() {
    // TODO padronizar a utilização desta função
    var arch = navigator.userAgent;
    if (arch.search(/x64/i) > -1 || arch.search(/x86_64/i) > -1) {
        return "x64";
    } else if (arch.search(/i386/i) > -1) {
        return "x32";
    } else {
        return "unknown";
    }
}

function IsEdge() {
    if (/Edge/.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function GetBrowserFacade() {
    if (typeof chrome === "undefined" || IsEdge()) return browser;else return chrome;
}

function IsChrome() {
    var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
        return true;
    } else if (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && isOpera === false && isIEedge === false) {
        return true;
    } else {
        return false;
    }
}

/**
 * Faz o download do arquivo indicado na url
 *
 * @param {string} url url do arquivo que deve ser baixado.
 */
function PromptDownload(url) {
    var elementDownload = document.createElement("a");
    elementDownload.setAttribute('href', url);

    elementDownload.style.display = 'none';
    document.body.appendChild(elementDownload);

    elementDownload.click();

    document.body.removeChild(elementDownload);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetBaseActionNames = GetBaseActionNames;
exports.SetActionNames = SetActionNames;
exports.GetActionNames = GetActionNames;
exports.GetNativeIdName = GetNativeIdName;
exports.SetNativeIdName = SetNativeIdName;

var _config = __webpack_require__(0);

var baseActionNames = [];

var actionNames = baseActionNames;

var nativeIdName = "bryextension";

function GetBaseActionNames() {
    return baseActionNames;
}

function SetActionNames(actions) {
    actionNames = actions;
}

function GetActionNames() {
    return actionNames;
}

function GetNativeIdName() {
    return nativeIdName;
}

function SetNativeIdName(idName) {
    nativeIdName = idName;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.COMPLEMENT_BASE_URL = undefined;
exports.GlobalConfiguration = GlobalConfiguration;

var _config = __webpack_require__(0);

var _configuration = __webpack_require__(2);

var COMPLEMENT_BASE_URL = exports.COMPLEMENT_BASE_URL = "https://www.bry.com.br/downloads/extension/v2/complement";

function GlobalConfiguration() {
    (0, _config.SetLinuxNativeVersion)("1.0.0");
    (0, _config.SetWindowsNativeVersion)("1.0.0");
    (0, _config.SetMacNativeVersion)("1.0.0");

    (0, _config.SetExtensionFunctionPrefix)('bryweb'); // {bry}_xyz
    (0, _config.SetExtensionInternalNamespacePrefix)('BryWeb'); //{Bry}Extension.xyz

    (0, _configuration.SetNativeIdName)("com.bry.extension"); // Permite localizar o módulo nativo

    (0, _config.SetNativeUrl_x32_exe)('https://www.bry.com.br/downloads/extension/v2/windows/ExtensionModule-x32.exe');
    (0, _config.SetNativeUrl_x64_exe)('https://www.bry.com.br/downloads/extension/v2/windows/ExtensionModule.exe');
    (0, _config.SetNativeUrl_x64_rpm)('https://www.bry.com.br/downloads/extension/v2/linux/ExtensionModule.rpm');
    (0, _config.SetNativeUrl_x32_rpm)('https://www.bry.com.br/downloads/extension/v2/linux/ExtensionModule-x32.rpm');
    (0, _config.SetNativeUrl_x64_deb)('https://www.bry.com.br/downloads/extension/v2/linux/ExtensionModule.deb');
    (0, _config.SetNativeUrl_x32_deb)('https://www.bry.com.br/downloads/extension/v2/linux/ExtensionModule-x32.deb');
    (0, _config.SetNativeUrl_x64_mac)('https://www.bry.com.br/downloads/extension/v2/macos/ExtensionModule.pkg');

    var extensionActionNames = (0, _configuration.GetBaseActionNames)();
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_list_certificates');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_sign');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_get_certificate');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_mostrarDetalhes');
    extensionActionNames.push('is_installed_test');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_is_installed_test');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_cert_req_generate');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_cert_req_import');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_export_certificate');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_list_readers');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_get_finger_print');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_get_system_info');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_get_fingerprint_installed_list');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_get_complement_fingerprint_supportedlist');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_install_complement_fingerprint');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_is_finger_on');
    extensionActionNames.push((0, _config.GetExtensionFunctionPrefix)() + '_is_finger_off');

    (0, _configuration.SetActionNames)(extensionActionNames);
}

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SetInstalationSteps_firstStepScreenTitle_windows = SetInstalationSteps_firstStepScreenTitle_windows;
exports.GetInstalationSteps_firstStepScreenTitle_windows = GetInstalationSteps_firstStepScreenTitle_windows;
exports.SetInstalationSteps_firstStepScreenBody_windows = SetInstalationSteps_firstStepScreenBody_windows;
exports.GetInstalationSteps_firstStepScreenBody_windows = GetInstalationSteps_firstStepScreenBody_windows;
exports.SetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows = SetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows;
exports.GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows = GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows;
exports.SetInstalationSteps_secondStepScreenTitle = SetInstalationSteps_secondStepScreenTitle;
exports.GetInstalationSteps_secondStepScreenTitle = GetInstalationSteps_secondStepScreenTitle;
exports.SetInstalationSteps_secondStepScreenBody = SetInstalationSteps_secondStepScreenBody;
exports.GetInstalationSteps_secondStepScreenBody = GetInstalationSteps_secondStepScreenBody;
exports.SetInstalationSteps_thirdStepScreenTitle = SetInstalationSteps_thirdStepScreenTitle;
exports.GetInstalationSteps_thirdStepScreenTitle = GetInstalationSteps_thirdStepScreenTitle;
exports.SetInstalationSteps_thirdStepScreenBody = SetInstalationSteps_thirdStepScreenBody;
exports.GetInstalationSteps_thirdStepScreenBody = GetInstalationSteps_thirdStepScreenBody;
exports.SetInstalationSteps_secondStepScreenTitle_linux = SetInstalationSteps_secondStepScreenTitle_linux;
exports.GetInstalationSteps_secondStepScreenTitle_linux = GetInstalationSteps_secondStepScreenTitle_linux;
exports.SetInstalationSteps_secondStepScreenBody_linux = SetInstalationSteps_secondStepScreenBody_linux;
exports.GetInstalationSteps_secondStepScreenBody_linux = GetInstalationSteps_secondStepScreenBody_linux;
exports.SetInstalationSteps_thirdStepScreenTitle_linux = SetInstalationSteps_thirdStepScreenTitle_linux;
exports.GetInstalationSteps_thirdStepScreenTitle_linux = GetInstalationSteps_thirdStepScreenTitle_linux;
exports.SetInstalationSteps_thirdStepScreenBody_linux = SetInstalationSteps_thirdStepScreenBody_linux;
exports.GetInstalationSteps_thirdStepScreenBody_linux = GetInstalationSteps_thirdStepScreenBody_linux;
exports.SetInstalationSteps_secondStepScreenBody_macos = SetInstalationSteps_secondStepScreenBody_macos;
exports.GetInstalationSteps_secondStepScreenBody_macos = GetInstalationSteps_secondStepScreenBody_macos;
exports.SetInstalationSteps_notSupportedStepScreenTitle = SetInstalationSteps_notSupportedStepScreenTitle;
exports.GetInstalationSteps_notSupportedStepScreenTitle = GetInstalationSteps_notSupportedStepScreenTitle;
exports.SetInstalationSteps_notSupportedStepScreenBody = SetInstalationSteps_notSupportedStepScreenBody;
exports.GetInstalationSteps_notSupportedStepScreenBody = GetInstalationSteps_notSupportedStepScreenBody;
exports.SetInstalationSteps_firstStepScreenTitle_linux = SetInstalationSteps_firstStepScreenTitle_linux;
exports.GetInstalationSteps_firstStepScreenTitle_linux = GetInstalationSteps_firstStepScreenTitle_linux;
exports.SetInstalationSteps_firstStepScreenBody_linux = SetInstalationSteps_firstStepScreenBody_linux;
exports.GetInstalationSteps_firstStepScreenBody_linux = GetInstalationSteps_firstStepScreenBody_linux;
exports.SetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux = SetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux;
exports.GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux = GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux;
exports.SetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux = SetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux;
exports.GetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux = GetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux;
exports.SetDomainAuthorizationScreenBody = SetDomainAuthorizationScreenBody;
exports.GetDomainAuthorizationScreenBody = GetDomainAuthorizationScreenBody;
exports.SetDomainAuthorizationScreenTitle = SetDomainAuthorizationScreenTitle;
exports.GetDomainAuthorizationScreenTitle = GetDomainAuthorizationScreenTitle;
exports.SetDomainAuthorizationScreenBodyConfirmButtonColor = SetDomainAuthorizationScreenBodyConfirmButtonColor;
exports.GetDomainAuthorizationScreenBodyConfirmButtonColor = GetDomainAuthorizationScreenBodyConfirmButtonColor;
exports.SetDomainAuthorizationScreenBodyCancelButtonColor = SetDomainAuthorizationScreenBodyCancelButtonColor;
exports.GetDomainAuthorizationScreenBodyCancelButtonColor = GetDomainAuthorizationScreenBodyCancelButtonColor;
var instalationSteps_firstStepScreenTitle_windows = "<h4 style='font-size:19px;'><img style='height: 35px;'src='brand.png'/>&nbsp&nbspEXTENSÃO PARA ASSINATURA DIGITAL</h4>";
var instalationSteps_firstStepScreenBody_windows = "<br/>\n<h3 style=\"color:#333333; font-weight:500; padding-bottom:8px;\">A extens\xE3o foi adicionada.</h3>\n<h4 style=\"color:#333333;font-size:19px;\">Falta pouco! Siga os passos a seguir para realizar<br/> assinaturas digitais do seu navegador:</h4><br/><br/><br/>\n<small class=\"step\" style=\"color:#aaa;\">Passo 1 de 2</small>\n<h4 style=\"color:#333333; font-size:19px;\">Fa\xE7a download do instalador clicando no bot\xE3o abaixo:</h4>";
var instalationSteps_firstStepScreenBody_confirmButtonColor_windows = "#4F97DC";

var instalationSteps_firstStepScreenTitle_linux = "<h4 style='font-size:19px;'><img style='height: 35px;'src='brand.png'/>&nbsp&nbspEXTENSÃO PARA ASSINATURA DIGITAL</h4>";
var instalationSteps_firstStepScreenBody_linux = "<br/>\n<h3 style=\"color:#333333; font-weight:500; padding-bottom:8px;\">A extens\xE3o foi adicionada.</h3>\n<h4 style=\"color:#333333;font-size:19px;\">Falta pouco! Siga os passos a seguir para realizar<br/> assinaturas digitais do seu navegador:</h4><br/><br/><br/>\n<small class=\"step\" style=\"color:#aaa;\">Passo 1 de 2</small>\n<h4 style=\"color:#333333; font-size:19px;\">Fa\xE7a o download do pacote para a sua distribui\xE7\xE3o clicando num dos bot\xF5es abaixo:</h4>";
var instalationSteps_firstStepScreenBody_confirmButtonColor_linux = instalationSteps_firstStepScreenBody_confirmButtonColor_windows;
var instalationSteps_firstStepScreenBody_cancelButtonColor_linux = instalationSteps_firstStepScreenBody_confirmButtonColor_linux;

var instalationSteps_secondStepScreenTitle = instalationSteps_firstStepScreenTitle_windows;
var instalationSteps_secondStepScreenBody = "\n<br/><small class=\"step\" style=\"color:#aaa;\">Passo 2 de 2</small>\n<h4 style=\"color:#333333;\">Abra o arquivo baixado e siga as<br/> orienta\xE7\xF5es de instala\xE7\xE3o</h4><br/>\n<img width=\"40px\" src=\"loading.gif\"/><br/>\n<h4 style=\"color:#333333;font-size:19px;\">Aguardando instala\xE7\xE3o</h4>\n";

var instalationSteps_secondStepScreenTitle_linux = instalationSteps_firstStepScreenTitle_windows;
var instalationSteps_secondStepScreenBody_linux = "\n<br/><small class=\"step\" style=\"color:#aaa;\">Passo 2 de 2</small>\n<h4 style=\"color:#333333;\">Abra o arquivo baixado e siga as<br/> orienta\xE7\xF5es de instala\xE7\xE3o</h4><br/>\n<img width=\"40px\" src=\"loading.gif\"/><br/>\n<h4 style=\"color:#333333;font-size:19px;\">Aguardando instala\xE7\xE3o</h4>\n";

var instalationSteps_secondStepScreenBody_macos = "";

var instalationSteps_secondStepScreenChromeBody = "\n<br/><small class=\"step\" style=\"color:#aaa;\">Passo 2 de 2</small>\n<h4 style=\"color:#333333;\">Abra o arquivo baixado e siga as<br/> orienta\xE7\xF5es de instala\xE7\xE3o</h4><br/>\n<img width=\"40px\" src=\"loading.gif\"/><br/>\n<h4 style=\"color:#333333;font-size:19px;\">Aguardando instala\xE7\xE3o</h4>\n";

var instalationSteps_thirdStepScreenTitle = instalationSteps_firstStepScreenTitle_windows;
var instalationSteps_thirdStepScreenBody = "<br/>\n<p><img style=\"height: 50px;\" src=\"ok.png\"/></p>\n<h4 style=\"color:#aaa;font-size:19px;\">Pronto!</h4><br/>\n<h4 style=\"color:#333333; font-size:19px;\">Agora voc\xEA j\xE1 pode assinar seus documentos<br/> pelo navegador</h4>\n";

var instalationSteps_thirdStepScreenTitle_linux = instalationSteps_firstStepScreenTitle_windows;
var instalationSteps_thirdStepScreenBody_linux = "<br/>\n<p><img style=\"height: 50px;\" src=\"ok.png\"/></p>\n<h4 style=\"color:#aaa;font-size:19px;\">Pronto!</h4><br/>\n<h4 style=\"color:#333333; font-size:19px;\">Agora voc\xEA j\xE1 pode assinar seus documentos<br/> pelo navegador</h4>\n";

var instalationSteps_notSupportedStepScreenTitle = instalationSteps_firstStepScreenTitle_windows;
var instalationSteps_notSupportedStepScreenBody = "<br/>\n<h3 style=\"color:#333333; font-weight:500; padding-bottom:8px;\">A extens\xE3o foi adicionada.</h3>\n<h4 style=\"color:#333333;font-size:19px;\">Falta pouco! Siga os passos a seguir para realizar<br/> assinaturas digitais do seu navegador:</h4><br/><br/><br/>\n<p>O suporte para o esse sistema operacional ser\xE1 adicionado na pr\xF3xima vers\xE3o da extens\xE3o!</p>";

var domainAuthorizationScreenTitle = instalationSteps_firstStepScreenTitle_windows;
var domainAuthorizationScreenBody = "<h4 align=\"center\" style=\"color:#333333;font-weight: 500;\"> O domínio hostname está tentando gerar assinaturas. Você autoriza?</h4>";
var domainAuthorizationScreenBodyConfirmButtonColor = "#555";
var domainAuthorizationScreenBodyCancelButtonColor = "#4F97DC";

function SetInstalationSteps_firstStepScreenTitle_windows(step) {
    return instalationSteps_firstStepScreenTitle_windows = step;
}

function GetInstalationSteps_firstStepScreenTitle_windows() {
    return instalationSteps_firstStepScreenTitle_windows;
}

function SetInstalationSteps_firstStepScreenBody_windows(step) {
    return instalationSteps_firstStepScreenBody_windows = step;
}

function GetInstalationSteps_firstStepScreenBody_windows() {
    return instalationSteps_firstStepScreenBody_windows;
}

function SetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows(step) {
    instalationSteps_firstStepScreenBody_confirmButtonColor_windows = step;
}

function GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows() {
    return instalationSteps_firstStepScreenBody_confirmButtonColor_windows;
}

function SetInstalationSteps_secondStepScreenTitle(step) {
    return instalationSteps_secondStepScreenTitle = step;
}

function GetInstalationSteps_secondStepScreenTitle() {
    return instalationSteps_secondStepScreenTitle;
}

function SetInstalationSteps_secondStepScreenBody(step) {
    return instalationSteps_secondStepScreenBody = step;
}

function GetInstalationSteps_secondStepScreenBody() {
    return instalationSteps_secondStepScreenBody;
}

function SetInstalationSteps_thirdStepScreenTitle(step) {
    return instalationSteps_thirdStepScreenTitle = step;
}

function GetInstalationSteps_thirdStepScreenTitle() {
    return instalationSteps_thirdStepScreenTitle;
}

function SetInstalationSteps_thirdStepScreenBody(step) {
    return instalationSteps_thirdStepScreenBody = step;
}

function GetInstalationSteps_thirdStepScreenBody() {
    return instalationSteps_thirdStepScreenBody;
}

function SetInstalationSteps_secondStepScreenTitle_linux(step) {
    return instalationSteps_secondStepScreenTitle_linux = step;
}

function GetInstalationSteps_secondStepScreenTitle_linux() {
    return instalationSteps_secondStepScreenTitle_linux;
}

function SetInstalationSteps_secondStepScreenBody_linux(step) {
    return instalationSteps_secondStepScreenBody_linux = step;
}

function GetInstalationSteps_secondStepScreenBody_linux() {
    return instalationSteps_secondStepScreenBody_linux;
}

function SetInstalationSteps_thirdStepScreenTitle_linux(step) {
    return instalationSteps_thirdStepScreenTitle_linux = step;
}

function GetInstalationSteps_thirdStepScreenTitle_linux() {
    return instalationSteps_thirdStepScreenTitle_linux;
}

function SetInstalationSteps_thirdStepScreenBody_linux(step) {
    return instalationSteps_thirdStepScreenBody_linux = step;
}

function GetInstalationSteps_thirdStepScreenBody_linux() {
    return instalationSteps_thirdStepScreenBody_linux;
}

function SetInstalationSteps_secondStepScreenBody_macos(step) {
    return instalationSteps_secondStepScreenBody_macos = step;
}

function GetInstalationSteps_secondStepScreenBody_macos() {
    return instalationSteps_secondStepScreenBody_macos;
}

function SetInstalationSteps_notSupportedStepScreenTitle(step) {
    return instalationSteps_notSupportedStepScreenTitle = step;
}

function GetInstalationSteps_notSupportedStepScreenTitle() {
    return instalationSteps_notSupportedStepScreenTitle;
}

function SetInstalationSteps_notSupportedStepScreenBody(step) {
    return instalationSteps_notSupportedStepScreenBody = step;
}

function GetInstalationSteps_notSupportedStepScreenBody() {
    return instalationSteps_notSupportedStepScreenBody;
}

function SetInstalationSteps_firstStepScreenTitle_linux(step) {
    return instalationSteps_firstStepScreenTitle_linux = step;
}

function GetInstalationSteps_firstStepScreenTitle_linux() {
    return instalationSteps_firstStepScreenTitle_linux;
}

function SetInstalationSteps_firstStepScreenBody_linux(step) {
    return instalationSteps_firstStepScreenBody_linux = step;
}

function GetInstalationSteps_firstStepScreenBody_linux() {
    return instalationSteps_firstStepScreenBody_linux;
}

function SetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux(step) {
    instalationSteps_firstStepScreenBody_confirmButtonColor_linux = step;
}

function GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux() {
    return instalationSteps_firstStepScreenBody_confirmButtonColor_linux;
}

function SetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux(step) {
    instalationSteps_firstStepScreenBody_cancelButtonColor_linux = step;
}

function GetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux() {
    return instalationSteps_firstStepScreenBody_cancelButtonColor_linux;
}

function SetDomainAuthorizationScreenBody(step) {
    return domainAuthorizationScreenBody = step;
}

function GetDomainAuthorizationScreenBody() {
    return domainAuthorizationScreenBody;
}

function SetDomainAuthorizationScreenTitle(step) {
    return domainAuthorizationScreenTitle = step;
}

function GetDomainAuthorizationScreenTitle() {
    return domainAuthorizationScreenTitle;
}

function SetDomainAuthorizationScreenBodyConfirmButtonColor(step) {
    domainAuthorizationScreenBodyConfirmButtonColor = step;
}

function GetDomainAuthorizationScreenBodyConfirmButtonColor() {
    return domainAuthorizationScreenBodyConfirmButtonColor;
}

function SetDomainAuthorizationScreenBodyCancelButtonColor(step) {
    domainAuthorizationScreenBodyCancelButtonColor = step;
}

function GetDomainAuthorizationScreenBodyCancelButtonColor() {
    return domainAuthorizationScreenBodyCancelButtonColor;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InitializeBaseContentScript = InitializeBaseContentScript;
exports.executeInPage = executeInPage;
exports.sendResponse = sendResponse;
exports.GetNativeModuleInfo = GetNativeModuleInfo;
exports.VerifyDomainAuthorization = VerifyDomainAuthorization;
exports.FilterError = FilterError;

var _config = __webpack_require__(0);

var _configuration = __webpack_require__(5);

var _utilities = __webpack_require__(1);

var _downloadArrow = __webpack_require__(7);

var _downloadArrow2 = _interopRequireDefault(_downloadArrow);

var _sweetalert2Min = __webpack_require__(8);

var _sweetalert2Min2 = _interopRequireDefault(_sweetalert2Min);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InitializeBaseContentScript() {
    var browserFacade = (0, _utilities.GetBrowserFacade)();

    function getCertificates(control) {
        return new Promise(function (resolve, reject) {
            try {
                var json = {
                    action: (0, _config.GetExtensionFunctionPrefix)() + "_list_certificates",
                    control: control
                };

                browserFacade.runtime.sendMessage(JSON.stringify(json), function (data) {
                    if (data.action === (0, _config.GetExtensionFunctionPrefix)() + "_list_certificates") resolve(data);else reject(data);
                });
            } catch (error) {
                reject({ key: "extension.invalid.context", description: "Erro ao acessar o contexto da extensão. Se a extensão foi desabilitada e depois habilitada, favor recarregar a página." });
            }
        });
    }

    async function executeLooplistCertifificates() {
        var result = [];
        try {
            var itens = {};
            var control = {};

            do {
                itens = await getCertificates(control);
                control = itens.control;
                result = result.concat(itens.certificates);
            } while (itens.hasNext);
        } catch (error) {
            throw error;
        }

        return result;
    }
    /**
    * Esse evento é repassado para o background e tem a finalidade de listar os
    * certificados com chave privada instalada na máquina do usuário. Os certificados
    * listados através desse evento podem ser utilizados para assinatura digital pelo usuário.
    * @event content_script#bry_list_certificates
    * @memberOf content_script
    */
    document.addEventListener((0, _config.GetExtensionFunctionPrefix)() + "_list_certificates", function (event) {
        var detail = event.detail;
        executeLooplistCertifificates().then(function (certificates) {
            sendResponse((0, _config.GetExtensionFunctionPrefix)(), certificates, detail.resolveId);
        }).catch(function (data) {
            var verificarInstalacao = true;
            //a promise só retorna reject visto que o resolve é tratado como um reload da página, finalizando o escopo que disparou a promise
            FilterError(data, verificarInstalacao).catch(function (downloadCancelled) {
                if (downloadCancelled) {
                    //usuário cancelou. editar erro de cancelamentos
                    var error = {
                        key: "module.download.user.cancelled",
                        code: -3099,
                        description: "O usuário cancelou o download do Módulo da Extensão"
                    };
                } else {
                    var error = {
                        key: data.key,
                        code: data.code,
                        description: data.description
                    };
                }

                sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
            });
        });
    });

    /**
    * Evento que sinaliza para extensão que o usuário tem a intenção de fazer uma
    * assinatura PKCS#1 do dado passado junto desse evento. Os dados desse evento
    * serão repassados para o módulo {@link background} da extensão para que sejam repassados
    * para a parte nativa.
    *
    * @event content_script#bry_sign
    * @memberOf content_script
    */
    document.addEventListener((0, _config.GetExtensionFunctionPrefix)() + "_sign", function (event) {
        var detail = event.detail;

        var context = {
            hostname: window.location.hostname,
            domainAuthorizationScreenTitle: (0, _configuration.GetDomainAuthorizationScreenTitle)(),
            domainAuthorizationScreenBody: (0, _configuration.GetDomainAuthorizationScreenBody)(),
            acceptedPromptTittle: "Autorizado",
            acceptedPromptBody: "<h4 align=\"center\" style=\"color:#333333;font-weight: 500; font-family:Calibri;\"> O site <strong>" + window.location.hostname + "</strong> foi autorizado.",
            denyPromptTittle: "Não Autorizado",
            denyPromptBody: "<h4 align=\"center\" style=\"color:#333333;font-weight: 500; font-family:Calibri;\"> Você não autorizou o site <strong>" + window.location.hostname + "</strong>.",
            ignoreBrowserStore: false
        };

        //criar uma função para verificar o domínio
        VerifyDomainAuthorization(context).then(function (result) {
            if (result) {
                var json = JSON.parse(detail.input);
                json.action = (0, _config.GetExtensionFunctionPrefix)() + "_sign";
                json.certId = detail.idCertificado;
                browserFacade.runtime.sendMessage(JSON.stringify(json), function (data) {
                    if (data.action == (0, _config.GetExtensionFunctionPrefix)() + "_sign") {
                        var response = {
                            nonce: data.nonce,
                            assinaturas: data.assinaturas
                        };

                        sendResponse((0, _config.GetExtensionFunctionPrefix)(), response, detail.resolveId);
                    } else {
                        var verificarInstalacao = true;
                        //a promise só retorna reject visto que o resolve é tratado como um reload da página, finalizando o escopo que disparou a promise
                        FilterError(data, verificarInstalacao).catch(function (downloadCancelled) {
                            if (downloadCancelled) {
                                //usuário cancelou. editar erro de cancelamentos
                                var error = {
                                    key: "module.download.user.cancelled",
                                    code: -3099,
                                    description: "O usuário cancelou o download do Módulo da Extensão"
                                };
                            } else {
                                var error = {
                                    key: data.key,
                                    code: data.code,
                                    description: data.description
                                };
                            }

                            sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
                        });
                    }
                });
            } else {
                //domnínio não autorizado
                var error = {
                    key: "extension.authorization.canceled",
                    code: "1001",
                    description: "A autorização do domínio foi cancelada pelo usuário."
                };

                sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
            }
        }).catch(function (error) {
            //tratamento de erro
            sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
        });
    });

    /**
    * Evento utilizado para verificar a instalação da parte nativa. Acontece toda vez
    * que uma página é aberta. Caso a parte nativa não esteja instalada, o callback da
    * página será chamado com uma mensagem de erro que descreve a situação para que
    * se o programador da página que utiliza a extensão queira tratar a situação, ele o
    * possa fazer.
    * @event content_script#bry_verificarInstalacao
    * @memberOf content_script
    */
    document.addEventListener((0, _config.GetExtensionFunctionPrefix)() + "_verificarInstalacao", function (event) {
        var detail = event.detail;
        browserFacade.runtime.sendMessage('{"action":"' + (0, _config.GetExtensionFunctionPrefix)() + '_verificarInstalacao"}', function (data) {
            if (data.action == "is_installed_test" || data.action == (0, _config.GetExtensionFunctionPrefix)() + "_is_installed_test") {
                if (!(0, _utilities.IsVersionEqualOrGreaterThan)(data.version, data.os)) {
                    /*
                    * Cria uma mensagem de erro.
                    */
                    var error = {};
                    error.description = "O módulo da extensão precisa ser atualizado.";
                    error.code = -3001;
                    error.key = "signer.not.updated";

                    /*
                    * Chama o callback com a mensagem recem criada
                    */
                    sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
                } else {
                    var versionInfo = data.version;
                    sendResponse((0, _config.GetExtensionFunctionPrefix)(), versionInfo, detail.resolveId, true);
                }
            } else {
                var verificarInstalacao = false;
                FilterError(data, verificarInstalacao).catch(function () {
                    var error = {};
                    error.description = data.description;
                    error.code = data.code;
                    error.key = data.key;
                    sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
                });
            }
        });
    });

    document.addEventListener((0, _config.GetExtensionFunctionPrefix)() + "_prompt_install_native_module", function (event) {
        var verificarInstalacao = true;
        var detail = event.detail;
        detail.key = "signer.not.installed";
        FilterError(detail, verificarInstalacao).catch(function () {
            var error = {
                key: "module.download.user.cancelled",
                code: -3099,
                description: "O usuário cancelou o download do Módulo da Extensão."
            };

            sendResponse((0, _config.GetExtensionFunctionPrefix)(), error, detail.rejectId);
        });
    });

    if (!(0, _utilities.IsChrome)() && typeof window.wrappedJSObject !== "undefined") {
        var ExtensionVerify = {};
        window.wrappedJSObject[(0, _config.GetExtensionInternalNamespacePrefix)() + 'ExtensionVerify'] = cloneInto(ExtensionVerify, window, { cloneFunctions: true });
    }
}

/**
 * Executa o código passado por parâmetro no contexto da página do usuário da
 * extensão.
 *
 * @param {string} code   código que será executado no contexto da página do usuário.
 */


//import {initSweetAlert} from '../external-deps/sweetalert/sweetalert.min.js';
function executeInPage(code) {}

function sendResponse(prefix, data, id, notParse) {
    if ((0, _utilities.IsChrome)()) {
        var event = new CustomEvent(prefix + '_response', { detail: {
                response: data,
                id: id
            } });
        document.dispatchEvent(event);
    } else if (typeof window.wrappedJSObject !== "undefined") {
        if (notParse) window.wrappedJSObject[(0, _config.GetExtensionInternalNamespacePrefix)() + 'Extension'][id](data);else window.wrappedJSObject[(0, _config.GetExtensionInternalNamespacePrefix)() + 'Extension'][id](JSON.stringify(data));
    } else {
        var event = new CustomEvent(prefix + '_response', { detail: {
                response: data,
                id: id
            } });
        document.dispatchEvent(event);
    }
}

function GetNativeModuleInfo() {
    var browserFacade = (0, _utilities.GetBrowserFacade)();
    return new Promise(function (resolve) {
        browserFacade.runtime.sendMessage('{"action":"' + (0, _config.GetExtensionFunctionPrefix)() + '_verificarInstalacao"}', function (data) {
            resolve(data);
        });
    });
}

/**
* Esse evento informa que houve algum tipo de erro ao executar a chamada na
* parte nativa.
*
* @event content_script#bry_error
* @memberOf content_script
*/
function VerifyDomainAuthorization(context) {
    return new Promise(function (resolve) {
        var browserFacade = (0, _utilities.GetBrowserFacade)();
        try {
            browserFacade.storage.local.get(null, function (items) //This is an asynchronous function that returns a Promise. https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get
            {
                var alreadyIncluded = false;
                for (var key in items) {
                    if (context.hostname === items[key]) {
                        alreadyIncluded = true;
                    }
                }
                if (!context.ignoreBrowserStore && alreadyIncluded) {
                    resolve(true);
                } else //item nao está na store OU store está sendo ignorada
                    {
                        (0, _sweetalert2Min2.default)({
                            title: context.domainAuthorizationScreenTitle,
                            html: context.domainAuthorizationScreenBody,
                            width: '478px',
                            padding: 30,
                            confirmButtonColor: "#555",
                            confirmButtonText: '<span style="font-size:17px; font-family:Calibri; padding: 0px 10px 0px 10px;">Não autorizo</span>',
                            showConfirmButton: true,
                            cancelButtonColor: (0, _configuration.GetDomainAuthorizationScreenBodyConfirmButtonColor)(), //"#4F97DC",
                            cancelButtonText: '<span style="font-size:17px; font-family:Calibri; padding: 0px 10px 0px 10px;">Autorizo</span>',
                            confirmButtonClass: 'bry-btn-padding', // definido no bry.css, incluído pelo manifest
                            showCancelButton: true,
                            showCloseButton: false,
                            focusCancel: true,
                            focusConfirm: false,
                            showLoaderOnConfirm: false,
                            preConfirm: function preConfirm() {
                                //o que essa linha faz?
                                return new Promise(function (resolve) {
                                    resolve();
                                });
                            },
                            allowEscapeKey: true,
                            allowOutsideClick: false

                        }).then(function (result) {
                            if (result.value || result.dismiss && result.dismiss === _sweetalert2Min2.default.DismissReason.cancel) //pq tem "result.dismiss && result.dismiss" ??
                                {
                                    if (result.value) {
                                        (0, _sweetalert2Min2.default)({
                                            title: context.denyPromptTittle,
                                            html: context.denyPromptBody,
                                            width: '478px',
                                            type: "error",
                                            showConfirmButton: false,
                                            allowOutsideClick: false,
                                            timer: 1500,
                                            onClose: function onClose() {
                                                resolve(false);
                                            }
                                        });
                                    } else {
                                        if (!alreadyIncluded) {
                                            var toStore = {};
                                            toStore[context.hostname] = context.hostname;
                                            browserFacade.storage.local.set(toStore, function () {});
                                        }
                                        (0, _sweetalert2Min2.default)({
                                            title: context.acceptedPromptTittle,
                                            html: context.acceptedPromptBody,
                                            width: '478px',
                                            type: "success",
                                            showConfirmButton: false,
                                            allowOutsideClick: false,
                                            timer: 1500,
                                            onClose: function onClose() {
                                                resolve(true);
                                            }
                                        });
                                    }
                                }
                        });
                    }
            });
        } catch (error) {
            //{key: "extension.invalid.context", description: "Erro ao acessar o contexto da extensão. Se a extensão foi desabilitada e depois habilitada, favor recarregar a página."};
            resolve(false);
        }
    });
}

/**
 * Faz os testes sobre a mensagem de erro e garante que nenhum erro interno será
 * repassado ao usuário da extensão.
 * @param {Object} error   mensagem de erro
 */

function FilterError(error, verificarInstalacao) {
    return new Promise(function (resolve, reject) {
        var os = (0, _utilities.GetOS)();
        var arch = (0, _utilities.GetMachineArch)();
        if (error.key === "signer.not.installed" && verificarInstalacao) {
            if (os === "windows") {
                (0, _sweetalert2Min2.default)({
                    title: (0, _configuration.GetInstalationSteps_firstStepScreenTitle_windows)(),
                    html: (0, _configuration.GetInstalationSteps_firstStepScreenBody_windows)(),
                    width: '478px',
                    padding: 20,
                    confirmButtonColor: (0, _configuration.GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows)(),
                    confirmButtonText: '<span style="font-size:17px; font-family:Calibri; padding: 0px 15px 0px 15px;">BAIXAR</span>',
                    showCloseButton: true,
                    showConfirmButton: true,
                    focusConfirm: true,
                    showLoaderOnConfirm: true,
                    preConfirm: function preConfirm() {
                        return new Promise(function (resolve) {
                            if (arch == "x64") {
                                (0, _utilities.PromptDownload)((0, _config.GetNativeUrl_x64_exe)());
                            } else {
                                (0, _utilities.PromptDownload)((0, _config.GetNativeUrl_x32_exe)());
                            }
                            setTimeout(function () {
                                resolve();
                            }, 2500);
                        });
                    },
                    allowEscapeKey: true,
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result.value) {
                        var isChrome = (0, _utilities.IsChrome)();
                        (0, _sweetalert2Min2.default)({
                            title: (0, _configuration.GetInstalationSteps_secondStepScreenTitle)(),
                            html: (0, _configuration.GetInstalationSteps_secondStepScreenBody)(),
                            width: '478px',
                            showCloseButton: true,
                            showConfirmButton: false,
                            allowEscapeKey: true,
                            allowOutsideClick: false,
                            focusCancel: true,
                            cancelButtonColor: "#FFFFFF",
                            showCancelButton: true,
                            cancelButtonClass: "bry-btn-displayNone",
                            onOpen: function onOpen() {
                                // Gambi para remover o foco do botão fechar, fica um contorno estranho
                                var y = document.getElementsByClassName('bry-btn-displayNone');
                                var aNode = y[0];
                                if (aNode) {
                                    aNode.parentNode.removeChild(aNode);
                                }
                                // fim Gambi

                                if (isChrome) {
                                    // Configura movimentação da seta
                                    var arrowDiv = document.createElement("div");
                                    arrowDiv.id = "bry-download-arrow";
                                    arrowDiv.style.background = 'url(' + (0, _utilities.GetBrowserFacade)().runtime.getURL(_downloadArrow2.default) + ')';
                                    arrowDiv.style.animation = 'BryMoveUpDown 1500ms ease-in-out infinite';
                                    arrowDiv.style.position = 'absolute';
                                    arrowDiv.style.left = '30px';
                                    arrowDiv.style.bottom = '10px';
                                    arrowDiv.style.width = '114px';
                                    arrowDiv.style.height = '155px';
                                    arrowDiv.style.zIndex = '10000';
                                    document.body.appendChild(arrowDiv);
                                    // para cancelar deve-se executar document.getElementById("bry-download-arrow").style.display = "none";
                                }

                                var interval = setInterval(function () {
                                    GetNativeModuleInfo().then(function (nativeModuleInfo) {
                                        if (nativeModuleInfo.action && (nativeModuleInfo.action == "is_installed_test" || nativeModuleInfo.action == (0, _config.GetExtensionFunctionPrefix)() + "_is_installed_test")) {
                                            var clear = false;
                                            if (error.version != undefined) {
                                                if ((0, _utilities.IsVersionEqualOrGreaterThanInternal)(nativeModuleInfo.version, error.version)) {
                                                    clear = true;
                                                }
                                            } else {
                                                clear = true;
                                            }
                                            if (clear) {
                                                clearInterval(interval);
                                                _sweetalert2Min2.default.clickConfirm();
                                            }
                                        }
                                    });
                                }, 500);
                            }
                        }).then(function (result) {
                            var bryDownloadArrow = document.getElementById("bry-download-arrow");
                            if (bryDownloadArrow != undefined) {
                                bryDownloadArrow.parentNode.removeChild(bryDownloadArrow);
                            }

                            if (result && result.value) {
                                (0, _sweetalert2Min2.default)({
                                    title: (0, _configuration.GetInstalationSteps_thirdStepScreenTitle)(),
                                    html: (0, _configuration.GetInstalationSteps_thirdStepScreenBody)(),
                                    width: '478px',
                                    showConfirmButton: false,
                                    timer: 4000,
                                    allowEscapeKey: true,
                                    allowOutsideClick: false
                                }).then(function () {
                                    window.location.reload();
                                });
                            }
                        });
                    } else {
                        //clicou no X da janela pra download
                        reject(true);
                    }
                });
            } else if (os === "linux") {
                (0, _sweetalert2Min2.default)({
                    title: (0, _configuration.GetInstalationSteps_firstStepScreenTitle_linux)(),
                    html: (0, _configuration.GetInstalationSteps_firstStepScreenBody_linux)(),
                    width: '478px',
                    padding: 20,
                    confirmButtonColor: (0, _configuration.GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_linux)(),
                    confirmButtonText: '<span style="font-size:17px; font-family:Calibri; padding: 0px 10px 0px 10px;">BAIXAR .deb</span>',
                    showConfirmButton: true,
                    confirmButtonClass: 'bry-btn-padding', // definido no bry.css, incluído pelo manifest
                    cancelButtonColor: (0, _configuration.GetInstalationSteps_firstStepScreenBodyCancelButtonColor_linux)(),
                    cancelButtonText: '<span style="font-size:17px; font-family:Calibri; padding: 0px 10px 0px 10px;">BAIXAR .rpm</span>',
                    showCancelButton: true,
                    showCloseButton: true,
                    focusConfirm: true,
                    showLoaderOnConfirm: false,
                    preConfirm: function preConfirm() {
                        return new Promise(function (resolve) {
                            resolve();
                        });
                    },
                    allowEscapeKey: true,
                    allowOutsideClick: false
                }).then(function (result) {
                    //botao swal.DismissReason.cancel é o pro download RPM
                    if (result.value || result.dismiss && result.dismiss === _sweetalert2Min2.default.DismissReason.cancel) {
                        if (result.value) {
                            (0, _utilities.PromptDownload)(arch === "x64" ? (0, _config.GetNativeUrl_x64_deb)() : (0, _config.GetNativeUrl_x32_deb)());
                        } else {
                            (0, _utilities.PromptDownload)(arch === "x64" ? (0, _config.GetNativeUrl_x64_rpm)() : (0, _config.GetNativeUrl_x32_rpm)());
                        }
                        (0, _sweetalert2Min2.default)({
                            title: (0, _configuration.GetInstalationSteps_secondStepScreenTitle_linux)(),
                            html: (0, _configuration.GetInstalationSteps_secondStepScreenBody_linux)(),
                            width: '478px',
                            showCloseButton: true,
                            showConfirmButton: false,
                            allowEscapeKey: true,
                            allowOutsideClick: false,
                            focusCancel: true,
                            cancelButtonColor: "#FFFFFF",
                            showCancelButton: true,
                            cancelButtonClass: "bry-btn-displayNone",
                            onOpen: function onOpen() {
                                // Gambi para remover o foco do botão fechar, fica um contorno estranho
                                var y = document.getElementsByClassName('bry-btn-displayNone');
                                var aNode = y[0];
                                if (aNode) {
                                    aNode.parentNode.removeChild(aNode);
                                }
                                // fim Gambi

                                var interval = setInterval(function () {
                                    GetNativeModuleInfo().then(function (nativeModuleInfo) {
                                        if (nativeModuleInfo.action && (nativeModuleInfo.action == "is_installed_test" || nativeModuleInfo.action == (0, _config.GetExtensionFunctionPrefix)() + "_is_installed_test")) {
                                            var clear = false;
                                            if (error.version != undefined) {
                                                if ((0, _utilities.IsVersionEqualOrGreaterThanInternal)(nativeModuleInfo.version, error.version)) {
                                                    clear = true;
                                                }
                                            } else {
                                                clear = true;
                                            }
                                            if (clear) {
                                                clearInterval(interval);
                                                _sweetalert2Min2.default.clickConfirm();
                                            }
                                        }
                                    });
                                }, 500);
                            }
                        }).then(function (result) {
                            if (result && result.value) {
                                (0, _sweetalert2Min2.default)({
                                    title: (0, _configuration.GetInstalationSteps_thirdStepScreenTitle_linux)(),
                                    html: (0, _configuration.GetInstalationSteps_thirdStepScreenBody_linux)(),
                                    width: '478px',
                                    showConfirmButton: false,
                                    timer: 4000,
                                    allowEscapeKey: true,
                                    allowOutsideClick: false
                                }).then(function () {
                                    window.location.reload();
                                });
                            }
                        });
                    } else {
                        //clicou no X da janela pra download
                        reject(true);
                    }
                });
            } else if (os === "macos") {
                (0, _sweetalert2Min2.default)({
                    title: (0, _configuration.GetInstalationSteps_firstStepScreenTitle_windows)(),
                    html: (0, _configuration.GetInstalationSteps_firstStepScreenBody_windows)(),
                    width: '478px',
                    padding: 20,
                    confirmButtonColor: (0, _configuration.GetInstalationSteps_firstStepScreenBodyConfirmButtonColor_windows)(),
                    confirmButtonText: '<span style="font-size:17px; font-family:Calibri; padding: 0px 15px 0px 15px;">BAIXAR</span>',
                    showCloseButton: true,
                    showConfirmButton: true,
                    focusConfirm: true,
                    showLoaderOnConfirm: true,
                    preConfirm: function preConfirm() {
                        return new Promise(function (resolve) {
                            (0, _utilities.PromptDownload)((0, _config.GetNativeUrl_x64_mac)());
                            setTimeout(function () {
                                resolve();
                            }, 2500);
                        });
                    },
                    allowEscapeKey: true,
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result.value) {
                        var isChrome = (0, _utilities.IsChrome)();
                        (0, _sweetalert2Min2.default)({
                            title: (0, _configuration.GetInstalationSteps_secondStepScreenTitle)(),
                            html: (0, _configuration.GetInstalationSteps_secondStepScreenBody_macos)(),
                            width: '478px',
                            showCloseButton: true,
                            showConfirmButton: false,
                            allowEscapeKey: true,
                            allowOutsideClick: false,
                            focusCancel: true,
                            cancelButtonColor: "#FFFFFF",
                            showCancelButton: true,
                            cancelButtonClass: "bry-btn-displayNone",
                            onOpen: function onOpen() {
                                // Gambi para remover o foco do botão fechar, fica um contorno estranho
                                var y = document.getElementsByClassName('bry-btn-displayNone');
                                var aNode = y[0];
                                if (aNode) {
                                    aNode.parentNode.removeChild(aNode);
                                }
                                // fim Gambi

                                if (isChrome) {
                                    // Configura movimentação da seta
                                    var arrowDiv = document.createElement("div");
                                    arrowDiv.id = "bry-download-arrow";
                                    arrowDiv.style.background = 'url(' + (0, _utilities.GetBrowserFacade)().runtime.getURL(_downloadArrow2.default) + ')';
                                    arrowDiv.style.animation = 'BryMoveUpDown 1500ms ease-in-out infinite';
                                    arrowDiv.style.position = 'absolute';
                                    arrowDiv.style.left = '30px';
                                    arrowDiv.style.bottom = '10px';
                                    arrowDiv.style.width = '114px';
                                    arrowDiv.style.height = '155px';
                                    arrowDiv.style.zIndex = '10000';
                                    document.body.appendChild(arrowDiv);
                                    // para cancelar deve-se executar document.getElementById("bry-download-arrow").style.display = "none";
                                }
                                var interval = setInterval(function () {
                                    GetNativeModuleInfo().then(function (nativeModuleInfo) {
                                        if (nativeModuleInfo.action && (nativeModuleInfo.action == "is_installed_test" || nativeModuleInfo.action == (0, _config.GetExtensionFunctionPrefix)() + "_is_installed_test")) {
                                            var clear = false;
                                            if (error.version != undefined) {
                                                if ((0, _utilities.IsVersionEqualOrGreaterThanInternal)(nativeModuleInfo.version, error.version)) {
                                                    clear = true;
                                                }
                                            } else {
                                                clear = true;
                                            }
                                            if (clear) {
                                                clearInterval(interval);
                                                _sweetalert2Min2.default.clickConfirm();
                                            }
                                        }
                                    });
                                }, 500);
                            }
                        }).then(function (result) {
                            var bryDownloadArrow = document.getElementById("bry-download-arrow");
                            if (bryDownloadArrow != undefined) {
                                bryDownloadArrow.parentNode.removeChild(bryDownloadArrow);
                            }
                            if (result && result.value) {
                                (0, _sweetalert2Min2.default)({
                                    title: (0, _configuration.GetInstalationSteps_thirdStepScreenTitle)(),
                                    html: (0, _configuration.GetInstalationSteps_thirdStepScreenBody)(),
                                    width: '478px',
                                    showConfirmButton: false,
                                    timer: 4000,
                                    allowEscapeKey: true,
                                    allowOutsideClick: false
                                }).then(function () {
                                    //resolve();
                                    window.location.reload();
                                });
                            }
                        });
                    } else {
                        //clicou no X da janela pra download
                        reject(true);
                    }
                });
            }
        } else {
            reject();
        }
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "download-arrow.png";

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "brand.png";

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {}

module.exports = emptyObject;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (global) {
  var babelHelpers = global;

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var babelHelpers = __webpack_require__(15);
/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Tab constructor
 * @class
 */
var Tab = function (_React$Component) {
  babelHelpers.inherits(Tab, _React$Component);

  function Tab() {
    babelHelpers.classCallCheck(this, Tab);
    return babelHelpers.possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  babelHelpers.createClass(Tab, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Tab;
}(_react2.default.Component);

/** Define module API */


Tab.defaultProps = {
  value: null,
  label: '',
  onActive: null
};
exports.default = Tab;
module.exports = exports['default'];

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _configuration = __webpack_require__(29);

var _config = __webpack_require__(0);

var _config2 = __webpack_require__(3);

var _brand = __webpack_require__(9);

var _brand2 = _interopRequireDefault(_brand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _config2.GlobalConfiguration)(); // Configura prefixo, urls, ...

var CustomBrowserAction = function (_BrowserAction) {
    _inherits(CustomBrowserAction, _BrowserAction);

    function CustomBrowserAction(props) {
        _classCallCheck(this, CustomBrowserAction);

        return _possibleConstructorReturn(this, (CustomBrowserAction.__proto__ || Object.getPrototypeOf(CustomBrowserAction)).call(this, props));
    }

    _createClass(CustomBrowserAction, [{
        key: 'getMessageToInstallNativeModule',
        value: function getMessageToInstallNativeModule() {
            return _react2.default.createElement(
                'div',
                { className: 'mui-container bry-container', id: 'content-native-nao-instalado' },
                _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'center' } },
                    !this.state.loadingToVerifyPlatformOs && this.state.platformInfoOs == "win" ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h4',
                            { style: { fontSize: '19px', fontFamily: 'Calibri' }, className: 'bry-extension-header-image' },
                            _react2.default.createElement('img', { src: _brand2.default }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Extens\xE3o para assinatura digital'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            { style: { fontWeight: '500' } },
                            'A extens\xE3o foi adicionada.'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'bry-download-panel' },
                            _react2.default.createElement(
                                'h4',
                                { style: { fontSize: '19px', fontFamily: 'Calibri' } },
                                'Falta pouco!'
                            ),
                            _react2.default.createElement(
                                'h4',
                                { style: { fontSize: '19px', fontFamily: 'Calibri' } },
                                'Fa\xE7a download do instalador clicando no bot\xE3o abaixo:'
                            ),
                            this.state.platformInfoArch == "amd64" || this.state.platformInfoArch == "x86-64" ? _react2.default.createElement(
                                'div',
                                { id: 'download-windows' },
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x64_exe)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule-x64.exe", className: 'mui-btn mui-btn--primary bry-link-btn' },
                                    'Baixar'
                                )
                            ) : _react2.default.createElement(
                                'div',
                                { id: 'download-windows' },
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x32_exe)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.exe", className: 'mui-btn mui-btn--primary bry-link-btn' },
                                    'Baixar'
                                )
                            )
                        )
                    ) : !this.state.loadingToVerifyPlatformOs && this.state.platformInfoOs == "linux" ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h4',
                            { style: { fontSize: '16px', fontFamily: 'Calibri' }, className: 'bry-extension-header-image' },
                            _react2.default.createElement('img', { src: _brand2.default }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Extens\xE3o para assinatura digital'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            { style: { fontWeight: '500' } },
                            'A extens\xE3o foi adicionada.'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'bry-download-panel' },
                            _react2.default.createElement(
                                'h4',
                                { style: { fontSize: '19px', fontFamily: 'Calibri' } },
                                'Falta pouco!'
                            ),
                            _react2.default.createElement(
                                'h4',
                                { style: { fontSize: '17px', fontFamily: 'Calibri' } },
                                'Fa\xE7a o download do pacote para a sua distribui\xE7\xE3o clicando em um dos bot\xF5es abaixo:'
                            ),
                            this.state.platformInfoArch == "x86-64" ? _react2.default.createElement(
                                'div',
                                { id: 'download-linux' },
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x64_deb)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.deb", className: 'mui-btn mui-btn--primary bry-link-btn deb-button' },
                                    'Baixar .deb'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x64_rpm)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.rpm", className: 'mui-btn mui-btn--primary bry-link-btn rpm-button' },
                                    'Baixar .rpm'
                                )
                            ) : _react2.default.createElement(
                                'div',
                                { id: 'download-linux' },
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x32_deb)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.deb", className: 'mui-btn mui-btn--primary bry-link-btn deb-button' },
                                    'Baixar .deb'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x32_rpm)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.rpm", className: 'mui-btn mui-btn--primary bry-link-btn rpm-button' },
                                    'Baixar .rpm'
                                )
                            )
                        )
                    ) : !this.state.loadingToVerifyPlatformOs && this.state.platformInfoOs == "mac" ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h4',
                            { style: { fontSize: '19px', fontFamily: 'Calibri' }, className: 'bry-extension-header-image' },
                            _react2.default.createElement('img', { src: _brand2.default }),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Extens\xE3o para assinatura digital'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            { style: { fontWeight: '500' } },
                            'A extens\xE3o foi adicionada.'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'bry-download-panel' },
                            _react2.default.createElement(
                                'h4',
                                { style: { fontSize: '19px', fontFamily: 'Calibri' } },
                                'Falta pouco!'
                            ),
                            _react2.default.createElement(
                                'h4',
                                { style: { fontSize: '19px', fontFamily: 'Calibri' } },
                                'Fa\xE7a download do instalador clicando no bot\xE3o abaixo:'
                            ),
                            _react2.default.createElement(
                                'div',
                                { id: 'download-windows' },
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x64_mac)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.pkg", className: 'mui-btn mui-btn--primary bry-link-btn' },
                                    'Baixar'
                                )
                            )
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'bry-download-panel', style: { fontSize: '19px', fontFamily: 'Calibri' } },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Sistema operacional n\xE3o suportado.'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                !this.state.loadingToGetNativeModuleInfo && !this.state.nativeInstalled ? this.getMessageToInstallNativeModule() : null,
                _react2.default.createElement(
                    'div',
                    { className: 'mui-container', id: 'content-native-instalado' },
                    _react2.default.createElement(
                        'div',
                        { style: { textAlign: 'center', backgroundColor: '#ffffe6' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'alert', id: 'content-native-desatualizado', style: { display: 'none' } },
                            'H\xE1 uma atualiza\xE7\xE3o dispon\xEDvel para a extens\xE3o.',
                            _react2.default.createElement('br', null),
                            !this.state.loadingToVerifyPlatformOs && this.state.platformInfoOs == "win" ? _react2.default.createElement(
                                'div',
                                { id: 'update-windows' },
                                this.state.platformInfoArch == "amd64" || this.state.platformInfoArch == "x86-64" ? _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x64_exe)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.exe", className: 'mui-btn mui-btn--primary bry-link-btn' },
                                    'Baixar'
                                ) : _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x32_exe)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.exe", className: 'mui-btn mui-btn--primary bry-link-btn' },
                                    'Baixar'
                                )
                            ) : !this.state.loadingToVerifyPlatformOs && this.state.platformInfoOs == "linux" ? _react2.default.createElement(
                                'div',
                                null,
                                this.state.platformInfoArch == "x86-64" ? _react2.default.createElement(
                                    'div',
                                    { id: 'update-linux' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: (0, _config.GetNativeUrl_x64_deb)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.deb", className: 'mui-btn mui-btn--primary bry-link-btn deb-button' },
                                        'Baixar .deb'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: (0, _config.GetNativeUrl_x64_rpm)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.rpm", className: 'mui-btn mui-btn--primary bry-link-btn rpm-button' },
                                        'Baixar .rpm'
                                    )
                                ) : _react2.default.createElement(
                                    'div',
                                    { id: 'update-linux' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: (0, _config.GetNativeUrl_x32_deb)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.deb", className: 'mui-btn mui-btn--primary bry-link-btn deb-button' },
                                        'Baixar .deb'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        { href: (0, _config.GetNativeUrl_x32_rpm)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.rpm", className: 'mui-btn mui-btn--primary bry-link-btn rpm-button' },
                                        'Baixar .rpm'
                                    )
                                )
                            ) : !this.state.loadingToVerifyPlatformOs && this.state.platformInfoOs == "mac" ? _react2.default.createElement(
                                'div',
                                { id: 'update-windows' },
                                _react2.default.createElement(
                                    'a',
                                    { href: (0, _config.GetNativeUrl_x64_mac)(), target: '_blank', download: (0, _config.GetExtensionInternalNamespacePrefix)() + "ExtensionModule.pkg", className: 'mui-btn mui-btn--primary bry-link-btn' },
                                    'Baixar'
                                )
                            ) : _react2.default.createElement(
                                'div',
                                { className: 'bry-download-panel' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Sistema operacional n\xE3o suportado.'
                                )
                            )
                        )
                    ),
                    !this.state.loadingToGetNativeModuleInfo && this.state.nativeInstalled ? this.getTabs() : null
                )
            );
        }
    }]);

    return CustomBrowserAction;
}(_configuration.BrowserAction);

_reactDom2.default.render(_react2.default.createElement(CustomBrowserAction, null), document.getElementById('browser-action'));

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(27);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(28);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _tabs = __webpack_require__(30);

var _tabs2 = _interopRequireDefault(_tabs);

var _tab = __webpack_require__(16);

var _tab2 = _interopRequireDefault(_tab);

var _index = __webpack_require__(35);

var _contentScript = __webpack_require__(6);

var _utilities = __webpack_require__(1);

var _trash = __webpack_require__(36);

var _trash2 = _interopRequireDefault(_trash);

var _loading = __webpack_require__(37);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CertificatesTab = function (_React$Component) {
  _inherits(CertificatesTab, _React$Component);

  function CertificatesTab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CertificatesTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CertificatesTab.__proto__ || Object.getPrototypeOf(CertificatesTab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading: true,
      certificates: []
    }, _this.getCertificates = function () {
      (0, _index.ListCertificates)().then(function (certificates) {
        _this.setState({ certificates: certificates, loading: false });
      });
    }, _this.createCertificateCell = function () {
      return _this.state.certificates.map(function (certificate, index) {
        return _react2.default.createElement(
          'tr',
          { key: index },
          _react2.default.createElement(
            'td',
            { style: { fontFamily: 'Calibri' } },
            certificate.name
          ),
          _react2.default.createElement(
            'td',
            { style: { fontFamily: 'Calibri' } },
            certificate.expirationDate.substring(0, 10)
          )
        );
      });
    }, _this.getCertificatesTableContent = function () {
      if (_this.state.certificates && _this.state.certificates.length) {
        return _react2.default.createElement(
          'table',
          { className: 'mui-table bry-table', id: 'certificados-instalados-tabela-header' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { style: { fontFamily: 'Calibri' } },
                'Nome'
              ),
              _react2.default.createElement(
                'th',
                { style: { fontFamily: 'Calibri' } },
                'V\xE1lido at\xE9'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            { id: 'certificados-instalados-tabela' },
            _this.createCertificateCell()
          )
        );
      } else {
        if (!_this.state.loading) {
          return _react2.default.createElement(
            'div',
            { id: 'sem-certificados-instalados' },
            _react2.default.createElement(
              'p',
              null,
              'N\xE3o h\xE1 nenhum certificado cuja chave privada esteja instalada nesse computador.'
            )
          );
        } else {
          return _react2.default.createElement('img', { src: _loading2.default, style: { maxHeight: 20 } });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CertificatesTab, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getCertificates();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'certificados-instalados', className: 'mui-tabs__pane ' + (this.props.active ? 'mui--is-active' : ''), style: { maxHeight: 200, overflow: 'auto', marginTop: 15, marginBottom: 15 } },
        this.getCertificatesTableContent()
      );
    }
  }]);

  return CertificatesTab;
}(_react2.default.Component);

;

var AuthorizedDomainsTab = function (_React$Component2) {
  _inherits(AuthorizedDomainsTab, _React$Component2);

  function AuthorizedDomainsTab() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, AuthorizedDomainsTab);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = AuthorizedDomainsTab.__proto__ || Object.getPrototypeOf(AuthorizedDomainsTab)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
      dominios: [],
      activeTabHostnameToAuthorize: null
    }, _this2.getAuthorizedDomains = function () {
      (0, _index.ListAuthorizedDomains)().then(function (dominios) {
        _this2.setState({ dominios: dominios });
        _this2.verifyIfActiveTabHostnameIsAutorized(dominios);
      });
    }, _this2.handleRemoveAuthorizedDomainClick = function (dominio) {
      (0, _index.RemoveDomain)(dominio).then(function () {
        _this2.getAuthorizedDomains();
      });
    }, _this2.handleAuthorizeDomainClick = function (dominio) {
      (0, _index.AuthorizeDomain)(dominio).then(function () {
        _this2.setState({ activeTabHostnameToAuthorize: null });
        _this2.getAuthorizedDomains();
      });
    }, _this2.createThisDomainAuthorizationCell = function () {
      if (_this2.state.activeTabHostnameToAuthorize) {
        return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            'Voc\xEA autoriza o site ',
            _react2.default.createElement(
              'strong',
              null,
              _this2.state.activeTabHostnameToAuthorize
            ),
            ' ?'
          ),
          _react2.default.createElement(
            'td',
            { style: { textAlign: 'right' } },
            _react2.default.createElement(
              'a',
              { target: '_blank', onClick: function onClick() {
                  return _this2.handleAuthorizeDomainClick(_this2.state.activeTabHostnameToAuthorize);
                }, 'class': 'mui-btn mui-btn--primary bry-link-btn' },
              'Autorizo'
            )
          )
        );
      } else {
        return null;
      }
    }, _this2.createAuthorizedDomainCell = function () {
      return Object.keys(_this2.state.dominios).map(function (dominio, index) {
        return _react2.default.createElement(
          'tr',
          { key: index },
          _react2.default.createElement(
            'td',
            null,
            dominio
          ),
          _react2.default.createElement(
            'td',
            { style: { textAlign: 'right' } },
            _react2.default.createElement(
              'a',
              { className: 'bry-trash-can-button', onClick: function onClick() {
                  return _this2.handleRemoveAuthorizedDomainClick(dominio);
                } },
              _react2.default.createElement('img', { src: _trash2.default, style: { height: 25 } })
            )
          )
        );
      });
    }, _this2.getAuthorizedDomainsTableContent = function () {
      if (_this2.state.dominios && Object.keys(_this2.state.dominios).length) {
        return _react2.default.createElement(
          'table',
          { className: 'mui-table bry-table', id: 'dominios-autorizados-tabela-header' },
          _react2.default.createElement(
            'tbody',
            { id: 'dominios-autorizados-tabela' },
            _this2.createThisDomainAuthorizationCell(),
            _this2.createAuthorizedDomainCell()
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { style: { textAlign: 'center' } },
            'Nenhum site foi autorizado a utilizar a extens\xE3o ainda.'
          ),
          _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
              'tbody',
              null,
              _this2.createThisDomainAuthorizationCell()
            )
          )
        );
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(AuthorizedDomainsTab, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getAuthorizedDomains();
    }
  }, {
    key: 'verifyIfActiveTabHostnameIsAutorized',
    value: function verifyIfActiveTabHostnameIsAutorized(dominios) {
      var _this3 = this;

      (0, _utilities.GetBrowserFacade)().tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (tabs[0] && tabs[0].url && tabs[0].id) {
          var hostname = tabs[0].url.split("/")[2];
          var tabIdentification = tabs[0].id;

          var domainsToIgnore = ["newtab", "extensions", "", "downloads", "history"];
          if (!(domainsToIgnore.indexOf(hostname) > -1)) {
            var alreadyIncluded = false;
            for (var key in dominios) {
              if (hostname === dominios[key]) {
                alreadyIncluded = true;
              }
            }

            if (!alreadyIncluded) {
              _this3.setState({ activeTabHostnameToAuthorize: hostname });
            }
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { maxHeight: 200, overflow: 'auto', marginTop: 15, marginBottom: 15 } },
        this.getAuthorizedDomainsTableContent()
      );
    }
  }]);

  return AuthorizedDomainsTab;
}(_react2.default.Component);

;

var BrowserActionTabs = function (_React$Component3) {
  _inherits(BrowserActionTabs, _React$Component3);

  function BrowserActionTabs() {
    _classCallCheck(this, BrowserActionTabs);

    return _possibleConstructorReturn(this, (BrowserActionTabs.__proto__ || Object.getPrototypeOf(BrowserActionTabs)).apply(this, arguments));
  }

  _createClass(BrowserActionTabs, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _tabs2.default,
        { defaultSelectedIndex: 0, justified: true },
        this.props.showCertificateTab ? _react2.default.createElement(
          _tab2.default,
          { label: 'Certificados Instalados', onActive: this.onActive },
          _react2.default.createElement(CertificatesTab, { active: this.props.certificateTabIsActive })
        ) : null,
        this.props.showAuthorizedDomainsTab ? _react2.default.createElement(
          _tab2.default,
          { label: 'Sites Autorizados' },
          _react2.default.createElement(AuthorizedDomainsTab, { active: this.props.authorizedDomainsTabIsActive })
        ) : null
      );
    }
  }]);

  return BrowserActionTabs;
}(_react2.default.Component);

;

var BrowserAction = function (_React$Component4) {
  _inherits(BrowserAction, _React$Component4);

  function BrowserAction() {
    var _ref3;

    var _temp3, _this5, _ret3;

    _classCallCheck(this, BrowserAction);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_ref3 = BrowserAction.__proto__ || Object.getPrototypeOf(BrowserAction)).call.apply(_ref3, [this].concat(args))), _this5), _this5.state = {
      loadingToVerifyPlatformOs: true,
      loadingToGetNativeModuleInfo: true,
      nativeVersion: "",
      nativeInstalled: false,
      platformInfoOs: "",
      platformInfoArch: ""
    }, _this5.getTabs = function () {
      if (!_this5.state.loadingToVerifyPlatformOs) {
        return _react2.default.createElement(BrowserActionTabs, { showCertificateTab: _this5.state.platformInfoOs == "linux" ? false : true,
          certificateTabIsActive: _this5.state.platformInfoOs == "linux" ? false : true,
          showAuthorizedDomainsTab: true,
          authorizedDomainsTabIsActive: _this5.state.platformInfoOs == "linux" ? true : false });
      } else {
        return _react2.default.createElement('img', { src: _loading2.default, style: { maxHeight: 20 } });
      }
    }, _temp3), _possibleConstructorReturn(_this5, _ret3);
  }

  _createClass(BrowserAction, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this6 = this;

      (0, _contentScript.GetNativeModuleInfo)().then(function (nativeModuleInfo) {
        _this6.setState({ nativeInstalled: nativeModuleInfo.key && nativeModuleInfo.key == "signer.not.installed" ? false : true });
        _this6.setState({ nativeVersion: nativeModuleInfo.version ? nativeModuleInfo.version : "" });
        _this6.setState({ loadingToGetNativeModuleInfo: false });
      });

      (0, _utilities.GetBrowserFacade)().runtime.getPlatformInfo(function (platformInfo) {
        _this6.setState({ platformInfoOs: platformInfo.os,
          platformInfoArch: platformInfo.arch,
          loadingToVerifyPlatformOs: false });
      });
    }
  }]);

  return BrowserAction;
}(_react2.default.Component);

;

exports.BrowserAction = BrowserAction;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var babelHelpers = __webpack_require__(15);
/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

var _react2 = babelHelpers.interopRequireDefault(_react);

var _tab = __webpack_require__(16);

var _tab2 = babelHelpers.interopRequireDefault(_tab);

var _util = __webpack_require__(32);

var util = babelHelpers.interopRequireWildcard(_util);


var tabsBarClass = 'mui-tabs__bar',
    tabsBarJustifiedClass = 'mui-tabs__bar--justified',
    tabsPaneClass = 'mui-tabs__pane',
    isActiveClass = 'mui--is-active';

/**
 * Tabs constructor
 * @class
 */

var Tabs = function (_React$Component) {
  babelHelpers.inherits(Tabs, _React$Component);

  function Tabs(props) {
    babelHelpers.classCallCheck(this, Tabs);

    /*
     * The following code exists only to warn about deprecating props.initialSelectedIndex in favor of props.defaultSelectedIndex.
     * It can be removed once support for props.initialSelectedIndex is officially dropped.
     */
    var defaultSelectedIndex = void 0;
    if (typeof props.initialSelectedIndex === 'number') {
      defaultSelectedIndex = props.initialSelectedIndex;
      if (console && process && process.env && process.NODE_ENV !== 'production') {
        console.warn('MUICSS DEPRECATION WARNING: ' + 'property "initialSelectedIndex" on the muicss Tabs component is deprecated in favor of "defaultSelectedIndex". ' + 'It will be removed in a future release.');
      }
    } else {
      defaultSelectedIndex = props.defaultSelectedIndex;
    }
    /*
     * End deprecation warning
     */

    var _this = babelHelpers.possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _this.state = { currentSelectedIndex: typeof props.selectedIndex === 'number' ? props.selectedIndex : defaultSelectedIndex };
    return _this;
  }

  babelHelpers.createClass(Tabs, [{
    key: 'onClick',
    value: function onClick(i, tab, ev) {
      if (typeof this.props.selectedIndex === 'number' && i !== this.props.selectedIndex || i !== this.state.currentSelectedIndex) {
        this.setState({ currentSelectedIndex: i });

        // onActive callback
        if (tab.props.onActive) tab.props.onActive(tab);

        // onChange callback
        if (this.props.onChange) {
          this.props.onChange(i, tab.props.value, tab, ev);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          defaultSelectedIndex = _props.defaultSelectedIndex,
          initialSelectedIndex = _props.initialSelectedIndex,
          justified = _props.justified,
          selectedIndex = _props.selectedIndex,
          reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'defaultSelectedIndex', 'initialSelectedIndex', 'justified', 'selectedIndex']);


      var tabs = _react2.default.Children.toArray(children);
      var tabEls = [],
          paneEls = [],
          m = tabs.length,
          currentSelectedIndex = (typeof selectedIndex === 'number' ? selectedIndex : this.state.currentSelectedIndex) % m,
          isActive = void 0,
          item = void 0,
          cls = void 0,
          i = void 0;

      for (i = 0; i < m; i++) {
        item = tabs[i];

        // only accept MUITab elements
        if (item.type !== _tab2.default) util.raiseError('Expecting MUITab React Element');

        isActive = i === currentSelectedIndex ? true : false;

        // tab element
        tabEls.push(_react2.default.createElement(
          'li',
          { key: i, className: isActive ? isActiveClass : '' },
          _react2.default.createElement(
            'a',
            { onClick: this.onClick.bind(this, i, item) },
            item.props.label
          )
        ));

        // pane element
        cls = tabsPaneClass + ' ';
        if (isActive) cls += isActiveClass;

        paneEls.push(_react2.default.createElement(
          'div',
          { key: i, className: cls },
          item.props.children
        ));
      }

      cls = tabsBarClass;
      if (justified) cls += ' ' + tabsBarJustifiedClass;

      return _react2.default.createElement(
        'div',
        reactProps,
        _react2.default.createElement(
          'ul',
          { className: cls },
          tabEls
        ),
        paneEls
      );
    }
  }]);
  return Tabs;
}(_react2.default.Component);

/** Define module API */


Tabs.defaultProps = {
  className: '',
  defaultSelectedIndex: 0,
  /*
   * @deprecated
   */
  initialSelectedIndex: null,
  justified: false,
  onChange: null,
  selectedIndex: null
};
exports.default = Tabs;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(31)))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */




var config = __webpack_require__(33),
    jqLite = __webpack_require__(34),
    scrollLock = 0,
    scrollLockCls = 'mui-scroll-lock',
    scrollLockPos,
    scrollStyleEl,
    scrollEventHandler,
    _scrollBarWidth,
    _supportsPointerEvents;


scrollEventHandler = function(ev) {
  // stop propagation on window scroll events
  if (!ev.target.tagName) ev.stopImmediatePropagation();
}


/**
 * Logging function
 */
function logFn() {
  var win = window;
  
  if (config.debug && typeof win.console !== "undefined") {
    try {
      win.console.log.apply(win.console, arguments);
    } catch (a) {
      var e = Array.prototype.slice.call(arguments);
      win.console.log(e.join("\n"));
    }
  }
}


/**
 * Load CSS text in new stylesheet
 * @param {string} cssText - The css text.
 */
function loadStyleFn(cssText) {
  var doc = document,
      head;
  
  // copied from jQuery 
  head = doc.head ||
    doc.getElementsByTagName('head')[0] ||
    doc.documentElement;
  
  var e = doc.createElement('style');
  e.type = 'text/css';
  
  if (e.styleSheet) e.styleSheet.cssText = cssText;
  else e.appendChild(doc.createTextNode(cssText));
  
  // add to document
  head.insertBefore(e, head.firstChild);
  
  return e;
}


/**
 * Raise an error
 * @param {string} msg - The error message.
 */
function raiseErrorFn(msg, useConsole) {
  if (useConsole) {
    if (typeof console !== 'undefined') console.warn('MUI Warning: ' + msg);
  } else {
    throw new Error('MUI: ' + msg);
  }
}


/**
 * Convert Classname object, with class as key and true/false as value, to an
 * class string.
 * @param  {Object} classes The classes
 * @return {String}         class string
 */
function classNamesFn(classes) {
  var cs = '';
  for (var i in classes) {
    cs += (classes[i]) ? i + ' ' : '';
  }
  return cs.trim();
}


/**
 * Check if client supports pointer events.
 */
function supportsPointerEventsFn() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = (element.style.pointerEvents === 'auto');
  return _supportsPointerEvents;
}


/**
 * Create callback closure.
 * @param {Object} instance - The object instance.
 * @param {String} funcName - The name of the callback function.
 */
function callbackFn(instance, funcName) {
  return function() {instance[funcName].apply(instance, arguments);};
}


/**
 * Dispatch event.
 * @param {Element} element - The DOM element.
 * @param {String} eventType - The event type.
 * @param {Boolean} bubbles=true - If true, event bubbles.
 * @param {Boolean} cancelable=true = If true, event is cancelable
 * @param {Object} [data] - Data to add to event object
 */
function dispatchEventFn(element, eventType, bubbles, cancelable, data) {
  var ev = document.createEvent('HTMLEvents'),
      bubbles = (bubbles !== undefined) ? bubbles : true,
      cancelable = (cancelable !== undefined) ? cancelable : true,
      k;

  ev.initEvent(eventType, bubbles, cancelable);
  
  // add data to event object
  if (data) for (k in data) ev[k] = data[k];
  
  // dispatch
  if (element) element.dispatchEvent(ev);
  
  return ev;
}


/**
 * Turn on window scroll lock.
 */
function enableScrollLockFn() {
  // increment counter
  scrollLock += 1;
  
  // add lock
  if (scrollLock === 1) {
    var doc = document,
        win = window,
        htmlEl = doc.documentElement,
        bodyEl = doc.body,
        scrollBarWidth = getScrollBarWidth(),
        cssProps,
        cssStr,
        x;

    // define scroll lock class dynamically
    cssProps = ['overflow:hidden'];

    if (scrollBarWidth) {
      // scrollbar-y
      if (htmlEl.scrollHeight > htmlEl.clientHeight) {
        x = parseInt(jqLite.css(bodyEl, 'padding-right')) + scrollBarWidth;
        cssProps.push('padding-right:' + x + 'px');
      }
    
      // scrollbar-x
      if (htmlEl.scrollWidth > htmlEl.clientWidth) {
        x = parseInt(jqLite.css(bodyEl, 'padding-bottom')) + scrollBarWidth;
        cssProps.push('padding-bottom:' + x + 'px');
      }
    }

    // define css class dynamically
    cssStr = '.' + scrollLockCls + '{';
    cssStr += cssProps.join(' !important;') + ' !important;}';
    scrollStyleEl = loadStyleFn(cssStr);

    // cancel 'scroll' event listener callbacks
    jqLite.on(win, 'scroll', scrollEventHandler, true);

    // add scroll lock
    scrollLockPos = {left: jqLite.scrollLeft(win), top: jqLite.scrollTop(win)};
    jqLite.addClass(bodyEl, scrollLockCls);
  }
}


/**
 * Turn off window scroll lock.
 * @param {Boolean} resetPos - Reset scroll position to original value.
 */
function disableScrollLockFn(resetPos) {
  // ignore
  if (scrollLock === 0) return;

  // decrement counter
  scrollLock -= 1;

  // remove lock 
  if (scrollLock === 0) {
    // remove scroll lock and delete style element
    jqLite.removeClass(document.body, scrollLockCls);

    // restore scroll position
    if (resetPos) window.scrollTo(scrollLockPos.left, scrollLockPos.top);

    // restore scroll event listeners
    jqLite.off(window, 'scroll', scrollEventHandler, true);

    // delete style element (deferred for Firefox Quantum bugfix)
    setTimeout(function() {
      scrollStyleEl.parentNode.removeChild(scrollStyleEl);      
    }, 0);
  }
}

/**
 * Return scroll bar width.
 */
var getScrollBarWidth = function() {
  // check cache
  if (_scrollBarWidth !== undefined) return _scrollBarWidth;
  
  // calculate scroll bar width
  var doc = document,
      bodyEl = doc.body,
      el = doc.createElement('div');

  el.innerHTML = '<div style="width:50px;height:50px;position:absolute;' + 
    'left:-50px;top:-50px;overflow:auto;"><div style="width:1px;' + 
    'height:100px;"></div></div>';
  el = el.firstChild;
  bodyEl.appendChild(el);
  _scrollBarWidth = el.offsetWidth - el.clientWidth;
  bodyEl.removeChild(el);

  return _scrollBarWidth;
}


/**
 * requestAnimationFrame polyfilled
 * @param {Function} callback - The callback function
 */
function requestAnimationFrameFn(callback) {
  var fn = window.requestAnimationFrame;
  if (fn) fn(callback);
  else setTimeout(callback, 0);
}


/**
 * Define the module API
 */
module.exports = {
  /** Create callback closures */
  callback: callbackFn,
  
  /** Classnames object to string */
  classNames: classNamesFn,

  /** Disable scroll lock */
  disableScrollLock: disableScrollLockFn,

  /** Dispatch event */
  dispatchEvent: dispatchEventFn,
  
  /** Enable scroll lock */
  enableScrollLock: enableScrollLockFn,

  /** Log messages to the console when debug is turned on */
  log: logFn,

  /** Load CSS text as new stylesheet */
  loadStyle: loadStyleFn,

  /** Raise MUI error */
  raiseError: raiseErrorFn,

  /** Request animation frame */
  requestAnimationFrame: requestAnimationFrameFn,

  /** Support Pointer Events check */
  supportsPointerEvents: supportsPointerEventsFn
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * MUI config module
 * @module config
 */

/** Define module API */
module.exports = {
  /** Use debug mode */
  debug: true
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * MUI CSS/JS jqLite module
 * @module lib/jqLite
 */




/**
 * Add a class to an element.
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
function jqLiteAddClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i=0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
      existingClasses += cssClass + ' ';
    }
  }
  
  element.setAttribute('class', existingClasses.trim());
}


/**
 * Get or set CSS properties.
 * @param {Element} element - The DOM element.
 * @param {string} [name] - The property name.
 * @param {string} [value] - The property value.
 */
function jqLiteCss(element, name, value) {
  // Return full style object
  if (name === undefined) {
    return getComputedStyle(element);
  }

  var nameType = jqLiteType(name);

  // Set multiple values
  if (nameType === 'object') {
    for (var key in name) element.style[_camelCase(key)] = name[key];
    return;
  }

  // Set a single value
  if (nameType === 'string' && value !== undefined) {
    element.style[_camelCase(name)] = value;
  }

  var styleObj = getComputedStyle(element),
      isArray = (jqLiteType(name) === 'array');

  // Read single value
  if (!isArray) return _getCurrCssProp(element, name, styleObj);

  // Read multiple values
  var outObj = {},
      key;

  for (var i=0; i < name.length; i++) {
    key = name[i];
    outObj[key] = _getCurrCssProp(element, key, styleObj);
  }

  return outObj;
}


/**
 * Check if element has class.
 * @param {Element} element - The DOM element.
 * @param {string} cls - The class name string.
 */
function jqLiteHasClass(element, cls) {
  if (!cls || !element.getAttribute) return false;
  return (_getExistingClasses(element).indexOf(' ' + cls + ' ') > -1);
}


/**
 * Return the type of a variable.
 * @param {} somevar - The JavaScript variable.
 */
function jqLiteType(somevar) {
  // handle undefined
  if (somevar === undefined) return 'undefined';

  // handle others (of type [object <Type>])
  var typeStr = Object.prototype.toString.call(somevar);
  if (typeStr.indexOf('[object ') === 0) {
    return typeStr.slice(8, -1).toLowerCase();
  } else {
    throw new Error("MUI: Could not understand type: " + typeStr);
  }    
}


/**
 * Attach an event handler to a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOn(element, events, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  var cache = element._muiEventCache = element._muiEventCache || {};  

  events.split(' ').map(function(event) {
    // add to DOM
    element.addEventListener(event, callback, useCapture);

    // add to cache
    cache[event] = cache[event] || [];
    cache[event].push([callback, useCapture]);
  });
}


/**
 * Remove an event handler from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOff(element, events, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  // remove from cache
  var cache = element._muiEventCache = element._muiEventCache || {},
      argsList,
      args,
      i;

  events.split(' ').map(function(event) {
    argsList = cache[event] || [];

    i = argsList.length;
    while (i--) {
      args = argsList[i];

      // remove all events if callback is undefined
      if (callback === undefined ||
          (args[0] === callback && args[1] === useCapture)) {

        // remove from cache
        argsList.splice(i, 1);
        
        // remove from DOM
        element.removeEventListener(event, args[0], args[1]);
      }
    }
  });
}


/**
 * Attach an event hander which will only execute once per element per event
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOne(element, events, callback, useCapture) {
  events.split(' ').map(function(event) {
    jqLiteOn(element, event, function onFn(ev) {
      // execute callback
      if (callback) callback.apply(this, arguments);

      // remove wrapper
      jqLiteOff(element, event, onFn, useCapture);
    }, useCapture);
  });
}


/**
 * Get or set horizontal scroll position
 * @param {Element} element - The DOM element
 * @param {number} [value] - The scroll position
 */
function jqLiteScrollLeft(element, value) {
  var win = window;

  // get
  if (value === undefined) {
    if (element === win) {
      var docEl = document.documentElement;
      return (win.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0);
    } else {
      return element.scrollLeft;
    }
  }

  // set
  if (element === win) win.scrollTo(value, jqLiteScrollTop(win));
  else element.scrollLeft = value;
}


/**
 * Get or set vertical scroll position
 * @param {Element} element - The DOM element
 * @param {number} value - The scroll position
 */
function jqLiteScrollTop(element, value) {
  var win = window;

  // get
  if (value === undefined) {
    if (element === win) {
      var docEl = document.documentElement;
      return (win.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
    } else {
      return element.scrollTop;
    }
  }

  // set
  if (element === win) win.scrollTo(jqLiteScrollLeft(win), value);
  else element.scrollTop = value;
}


/**
 * Return object representing top/left offset and element height/width.
 * @param {Element} element - The DOM element.
 */
function jqLiteOffset(element) {
  var win = window,
      rect = element.getBoundingClientRect(),
      scrollTop = jqLiteScrollTop(win),
      scrollLeft = jqLiteScrollLeft(win);

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    height: rect.height,
    width: rect.width
  };
}


/**
 * Attach a callback to the DOM ready event listener
 * @param {Function} fn - The callback function.
 */
function jqLiteReady(fn) {
  var done = false,
      top = true,
      doc = document,
      win = doc.defaultView,
      root = doc.documentElement,
      add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
      rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
      pre = doc.addEventListener ? '' : 'on';

  var init = function(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') {
      return;
    }

    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  };

  var poll = function() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  };

  if (doc.readyState == 'complete') {
    fn.call(win, 'lazy');
  } else {
    if (doc.createEventObject && root.doScroll) {
      try { top = !win.frameElement; } catch(e) { }
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }
}


/**
 * Remove classes from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
function jqLiteRemoveClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;
  
  for (var i=0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    while (existingClasses.indexOf(' ' + cssClass + ' ') >= 0) {
      existingClasses = existingClasses.replace(' ' + cssClass + ' ', ' ');
    }
  }

  element.setAttribute('class', existingClasses.trim());
}


// ------------------------------
// Utilities
// ------------------------------
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
    MOZ_HACK_REGEXP = /^moz([A-Z])/,
    ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g;


function _getExistingClasses(element) {
  var classes = (element.getAttribute('class') || '').replace(/[\n\t]/g, '');
  return ' ' + classes + ' ';
}


function _camelCase(name) {
  return name.
    replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).
    replace(MOZ_HACK_REGEXP, 'Moz$1');
}


function _escapeRegExp(string) {
  return string.replace(ESCAPE_REGEXP, "\\$1");
}


function _getCurrCssProp(elem, name, computed) {
  var ret;

  // try computed style
  ret = computed.getPropertyValue(name);

  // try style attribute (if element is not attached to document)
  if (ret === '' && !elem.ownerDocument) ret = elem.style[_camelCase(name)];

  return ret;
}


/**
 * Module API
 */
module.exports = {
  /** Add classes */
  addClass: jqLiteAddClass,

  /** Get or set CSS properties */
  css: jqLiteCss,

  /** Check for class */
  hasClass: jqLiteHasClass,

  /** Remove event handlers */
  off: jqLiteOff,

  /** Return offset values */
  offset: jqLiteOffset,

  /** Add event handlers */
  on: jqLiteOn,

  /** Add an execute-once event handler */
  one: jqLiteOne,

  /** DOM ready event handler */
  ready: jqLiteReady,

  /** Remove classes */
  removeClass: jqLiteRemoveClass,

  /** Check JavaScript variable instance type */
  type: jqLiteType,

  /** Get or set horizontal scroll position */
  scrollLeft: jqLiteScrollLeft,

  /** Get or set vertical scroll position */
  scrollTop: jqLiteScrollTop
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListAuthorizedDomains = ListAuthorizedDomains;
exports.RemoveDomain = RemoveDomain;
exports.ListCertificates = ListCertificates;
exports.AuthorizeDomain = AuthorizeDomain;

var _utilities = __webpack_require__(1);

var _config = __webpack_require__(0);

function ListAuthorizedDomains() {
    var browserFacade = (0, _utilities.GetBrowserFacade)();
    return new Promise(function (resolve) {
        browserFacade.storage.local.get(null, function (items) {
            resolve(items);
        });
    });
}

function RemoveDomain(domain) {
    var browserFacade = (0, _utilities.GetBrowserFacade)();
    return new Promise(function (resolve) {
        browserFacade.storage.local.remove(domain, function () {
            resolve();
        });
    });
}

function ListCertificates() {
    var browserFacade = (0, _utilities.GetBrowserFacade)();
    return new Promise(function (resolve) {
        browserFacade.runtime.sendMessage('{"action":"' + (0, _config.GetExtensionFunctionPrefix)() + '_list_certificates"}', function (data) {
            if (data.action && data.action === (0, _config.GetExtensionFunctionPrefix)() + "_list_certificates") {
                resolve(data.certificates);
            } else {
                resolve([]);
            }
        });
    });
}

function AuthorizeDomain(domain) {
    var browserFacade = (0, _utilities.GetBrowserFacade)();
    return new Promise(function (resolve) {
        var toStore = {};
        toStore[domain] = domain;
        browserFacade.storage.local.set(toStore, function () {
            resolve();
        });
    });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "trash.png";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "loading.gif";

/***/ })
/******/ ]);