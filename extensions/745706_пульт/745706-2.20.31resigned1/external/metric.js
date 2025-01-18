(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Metric"] = factory();
	else
		root["Amigo"] = root["Amigo"] || {}, root["Amigo"]["Metric"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ServiceFactory = __webpack_require__(1);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _Metric = __webpack_require__(2);

	var _Metric2 = _interopRequireDefault(_Metric);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _ServiceFactory2.default)(_Metric2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = ServiceFactory;
	var bind = Function.prototype.bind;

	function ServiceFactory(Service) {
	    return {
	        create: function create() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            var Klass = bind.apply(Service, [null].concat(args));

	            return new Klass();
	        },
	        destroy: function destroy(service) {
	            return service.destroy();
	        }
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _MetricMaster = __webpack_require__(3);

	var _MetricMaster2 = _interopRequireDefault(_MetricMaster);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _MetricMaster2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Metric;

	var _global = __webpack_require__(4);

	var _extend = __webpack_require__(5);

	var _extend2 = _interopRequireDefault(_extend);

	var _inherits = __webpack_require__(6);

	var _inherits2 = _interopRequireDefault(_inherits);

	var _Metric = __webpack_require__(7);

	var _Metric2 = _interopRequireDefault(_Metric);

	var _MetricService = __webpack_require__(11);

	var _MetricService2 = _interopRequireDefault(_MetricService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Metric(description) {
	    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var metricOptions = (0, _extend2.default)({}, {
	        name: name,
	        extension: _global.id,
	        description: description
	    }, options);

	    this.service = new _MetricService2.default(metricOptions);

	    _Metric2.default.call(this, description);
	}

	(0, _inherits2.default)(Metric, _Metric2.default, {
	    destroy: function destroy() {
	        return this.service.destroy();
	    },
	    sendData: function sendData(data) {
	        return this.service.collect(data);
	    },
	    sendNow: function sendNow() {
	        return this.service.sendNow();
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var runtime = chrome.runtime;

	var _runtime$getManifest = runtime.getManifest(),
	    app = _runtime$getManifest.app,
	    ver = _runtime$getManifest.version;

	var version = exports.version = ver;
	var handshakeMessage = exports.handshakeMessage = '¡Hola!';
	var masterPluginId = exports.masterPluginId = 'eeecheimdlkopnpajfcdmacgkjlkcmji';

	var id = exports.id = runtime.id;
	var isApp = exports.isApp = app !== undefined;
	var isExtension = exports.isExtension = !isApp;
	var isMaster = exports.isMaster = id === masterPluginId;

	var production = exports.production = (false);
	var development = exports.development = (true);

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (target, source) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;

		for (var index = 1, key; index in arguments; ++index) {
			source = arguments[index];

			for (key in source) {
				if (hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (Klass, Super, properties) {
	    copyProperties(Klass, Super);

	    var Proto = Klass.prototype = Object.create(Super.prototype, {
	        constructor: {
	            value: Klass,
	            writable: false
	        }
	    });

	    copyProperties(Proto, properties);

	    return Proto;
	};

	function copyProperty(dest, src, property) {
	    if (src.hasOwnProperty(property)) {
	        var obj = Object.getOwnPropertyDescriptor(src, property);

	        if (typeof obj.get === 'function') {
	            dest.__defineGetter__(property, obj.get);
	        }

	        if (typeof obj.set === 'function') {
	            dest.__defineSetter__(property, obj.set);
	        }

	        if ('value' in obj) {
	            dest[property] = obj.value;
	        }
	    }
	}

	function copyProperties(dest, src) {
	    if (src != null) {
	        for (var property in src) {
	            copyProperty(dest, src, property);
	        }
	    }
	}

	/**
	 * Функция наследования (расширяет прототип функциями суперкласса).
	 * @param {Function} Klass Расширяемый класс.
	 * @param {Function} Super Суперкласс.
	 * @param {Object?} Методы прототипа.
	 * @return {Object} Прототип Klass
	 * @example
	 *   var Proto = utils.inherits(Twitter, SocialNetwork, { // prototype methods });
	 */

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Metric;

	var _array = __webpack_require__(8);

	var _types = __webpack_require__(9);

	var _types2 = _interopRequireDefault(_types);

	var _DataHandlers = __webpack_require__(10);

	var _DataHandlers2 = _interopRequireDefault(_DataHandlers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _labels = Symbol('_labels');

	/**
	 * @ngdoc function
	 * @name Amigo.Metric.create
	 * @param {Object} description Описание метрик
	 * @return {Object} Набор функций для отправки метрик
	 *
	 * @description
	 *
	 *
	 * @example
	   ```js
	   var metric = Amigo.Metric.create({
	       click: {
	           params: ['net']
	       },
	       click_notification: {
	           params: { count_accounts: 1 }
	       },
	       statics: {
	           constant: { type: 'static' }
	       },
	   });

	   metric.click(network.id);
	   metric.click_notification({ count_accounts: accounts.count });
	   metric.statics(); // sends type=static
	   ```
	 */
	function Metric(description) {
	    var _this = this;

	    if (!_types2.default.isObject(description)) {
	        throw new Error("Metric description must be an object.");
	    }

	    this.description = description;
	    this[_labels] = [];

	    Object.keys(description).forEach(function (label) {
	        _this[label] = _this.createMethod(label, description[label]);
	        _this[_labels].push(label);
	    });

	    new _DataHandlers2.default(this, 'beforeSend');
	}

	Metric.prototype = {
	    createMethod: function createMethod(label, desc) {
	        var _this2 = this;

	        var bindParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	        var params = desc.params || [];
	        var constant = desc.constant || {};
	        var params_as_array = params instanceof Array; // параметры будут переданы аргументами к методу

	        if (constant.type == null) {
	            constant.type = 'click';
	        }

	        if (constant.label == null) {
	            constant.label = label;
	        }

	        var method = function method() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            var keys = [],
	                values = [];
	            var array_args = args[0],
	                options = args[1];


	            function saveKeyValue(key, value) {
	                keys.push(key);
	                values.push(value);
	            }

	            // save constants
	            Object.keys(constant).forEach(function (key) {
	                saveKeyValue(key, constant[key]);
	            });

	            // save args
	            if (params_as_array) {
	                var index = 0;

	                params.forEach(function (key) {
	                    var arg = bindParams[key] || args[index++];
	                    saveKeyValue(key, arg);
	                });
	            } else {
	                Object.keys(params).forEach(function (key) {
	                    var arg = array_args[key];

	                    if (arg == null) {
	                        arg = bindParams[key];
	                    }

	                    saveKeyValue(key, arg);
	                });
	            }

	            var resolveValues = function resolveValues(resolvedValues) {
	                var data = (0, _array.object)(keys, resolvedValues);

	                if (options && options.skip_before_send) {
	                    // пропустить обработчики
	                    return _this2.sendData(data);
	                } else {
	                    return _this2.beforeSend.run(data).then(function (data) {
	                        return _this2.sendData(data);
	                    });
	                }
	            };

	            var hasPromises = values.some(function (value) {
	                return value instanceof Promise;
	            });

	            if (hasPromises) {
	                return Promise.all(values).then(resolveValues);
	            } else {
	                return resolveValues(values);
	            }
	        };

	        method.toString = function () {
	            return JSON.stringify(desc);
	        };

	        return method;
	    },
	    destroy: function destroy() {},
	    sendData: function sendData(data) {
	        throw new Error('Metric: abstract method');
	    },
	    bindParams: function bindParams(params, methodNames) {
	        var _this3 = this;

	        var inheritor = Object.create(this);

	        (methodNames || this[_labels]).forEach(function (label) {
	            inheritor[label] = _this3.createMethod(label, _this3.description[label], params);
	        });

	        return inheritor;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.asyncForeach = asyncForeach;
	exports.toArray = toArray;
	exports.uniq = uniq;
	exports.splitIntoChunks = splitIntoChunks;
	exports.intersect = intersect;
	exports.diff = diff;
	exports.move = move;
	exports.remove = remove;
	exports.object = object;
	var objToString = {}.toString;
	var slice = Array.prototype.slice;

	/**
	 * Обрабатывает каждый элемент массива асинхронно, сохраняя при этом последовательность обработки.
	 * @param {Array} items Массив.
	 * @param {Function} item_callback Обработчик элемента.
	 * @param {Function?} final_callback Финальный обработчик.
	 * @example
	 * asyncForeach([1, 2, 3], function(item, index, next_cb) {
	 *     console.log(item);
	 *     setTimeout(next_cb, 100);
	 * }, function() {
	 *     console.log('end');
	 * });
	 *
	 * => 1
	 * => 2
	 * => 3
	 * => "end"
	 */
	function asyncForeach(items, item_callback, final_callback) {
	    return new Promise(function (resolve) {
	        var index = 0;
	        var length = items.length;

	        function inner() {
	            if (index < length) {
	                item_callback(items[index], index++, inner);
	            } else {
	                if (final_callback instanceof Function) {
	                    final_callback();
	                }

	                resolve();
	            }
	        }

	        inner();
	    });
	}

	function toArray(value) {
	    switch (objToString.call(value)) {
	        case '[object Array]':
	            return value;

	        case '[object Arguments]':
	            return slice.call(value);

	        case '[object Null]':
	        case '[object Undefined]':
	            return [];
	    }

	    return [value];
	}

	/**
	 * Возвращает список уникальных элементов.
	 */
	function uniq(array) {
	    return array.filter(function (item, i, arr) {
	        return arr.indexOf(item) === i;
	    });
	}

	function splitIntoChunks(arr, chunkSize) {
	    if (arr == null) {
	        return;
	    }

	    chunkSize = chunkSize || arr.length;

	    var chunks = [];

	    for (var i = 0, n = arr.length; i < n;) {
	        var j = i + chunkSize;
	        var chunk = arr.slice(i, j);

	        chunks.push(chunk);
	        i = j;
	    }

	    return chunks;
	}

	/**
	 * Возвращает пересечение двух массивов.
	 */
	function intersect(one, two, compareFunc) {
	    return one.filter(function (oneItem) {
	        if (compareFunc) {
	            return two.some(function (twoItem) {
	                return compareFunc(oneItem, twoItem);
	            });
	        } else {
	            return two.indexOf(oneItem) !== -1;
	        }
	    });
	}

	/**
	 * Возвращает разницу между двумя массивами.
	 */
	function diff(one, two, compareFunc) {
	    return one.filter(function (oneItem) {
	        if (compareFunc) {
	            return !two.some(function (twoItem) {
	                return compareFunc(oneItem, twoItem);
	            });
	        } else {
	            return two.indexOf(oneItem) === -1;
	        }
	    });
	}

	/**
	 * Перемещает элемент с одной позиции на другую
	 * @param {array} array Массив
	 * @param {number} from Индекс, откуда переместить элементы
	 * @param {number} to Индекс, куда переместить элементы
	 */
	function move(array, from, to) {
	    array.splice(to, 0, array.splice(from, 1)[0]);
	    return array;
	}

	/**
	 * Удаляет элемент из массива.
	 * @param {array} array Массив
	 * @param {щиоусе} шеуь Элемент
	 */
	function remove(array, item) {
	    var index = array.indexOf(item);

	    if (index !== -1) {
	        return array.splice(index, 1);
	    }

	    return [];
	}

	/**
	 * Создает объект из двух массивов.
	 * @param {array} keys Массив ключей
	 * @param {array} values Массив значений
	 * @return {object}
	 */
	function object(keys, values) {
	    var data = {};

	    values.forEach(function (value, i) {
	        data[keys[i]] = value;
	    });

	    return data;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var class2type = {};
	var toString = class2type.toString;
	var standard = 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ');

	function type(obj) {
	    return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
	}

	var types = {
	    standard: standard,

	    type: type,

	    isNull: function isNull(obj) {
	        return obj === null;
	    },
	    isUndefined: function isUndefined(obj) {
	        return obj === undefined;
	    }
	};

	standard.forEach(function (name) {
	    var lowerName = name.toLowerCase();

	    class2type['[object ' + name + ']'] = lowerName;

	    types['is' + name] = function (obj) {
	        return type(obj) === lowerName;
	    };
	});

	module.exports = types;
	exports.default = types;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = DataHandlers;

	var _array = __webpack_require__(8);

	function DataHandlers(object, handlerName) {
	    var _this = this;

	    this.__handlers = [];

	    if (object !== undefined) {
	        object.__defineGetter__(handlerName, function () {
	            return _this;
	        });

	        object.__defineSetter__(handlerName, function (func) {
	            _this.addHandler(func);
	        });
	    }
	}

	DataHandlers.prototype = {
	    run: function run(data) {
	        return (0, _array.asyncForeach)(this.__handlers, function (handler, index, resolve) {
	            var resolveData = function resolveData() {
	                var keys = Object.keys(data);
	                var values = keys.map(function (key) {
	                    return data[key];
	                });

	                return Promise.all(values).then(function (resolvedValues) {
	                    keys.forEach(function (key, i) {
	                        data[key] = resolvedValues[i];
	                    });

	                    resolve();
	                });
	            };

	            var handlerData = handler(data);
	            Promise.all([handlerData]).then(resolveData);
	        }).then(function () {
	            return data;
	        });
	    },
	    addHandler: function addHandler(func) {
	        this.__handlers.push(func);
	    },
	    removeHandler: function removeHandler(func) {
	        (0, _array.remove)(this.__handlers, func);
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = MetricService;

	var _emitter = __webpack_require__(12);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _eventer = __webpack_require__(19);

	var _eventer2 = _interopRequireDefault(_eventer);

	var _strings = __webpack_require__(14);

	var _app = __webpack_require__(20);

	var _logger2 = __webpack_require__(22);

	var _logger3 = _interopRequireDefault(_logger2);

	var _Sender = __webpack_require__(28);

	var _Sender2 = _interopRequireDefault(_Sender);

	var _Collector = __webpack_require__(31);

	var _Collector2 = _interopRequireDefault(_Collector);

	var _ToJSON = __webpack_require__(32);

	var _ToJSON2 = _interopRequireDefault(_ToJSON);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function MetricService(options) {
	    var _this = this;

	    (0, _emitter2.default)(this, this.emitTypes);

	    options = options || {};

	    this.id = (0, _strings.guid)();
	    this.collector = options.collector || new _Collector2.default();
	    this.sender = options.sender || new _Sender2.default({
	        id_extension: options.extension,
	        v_extension: options.v_extension
	    });

	    if (options.name) {
	        this.name = options.name;
	    }

	    if (options.timeout) {
	        this.timeout = options.timeout;
	    }

	    if (options.tryCount) {
	        this.tryCount = options.tryCount;
	    }

	    if (options.tryTimeout) {
	        this.tryTimeout = options.tryTimeout;
	    }

	    if (options.dummy) {
	        this.dummy = options.dummy;
	    }

	    this.packCount = 0;
	    this.description = options.description || {};

	    this.startInterval();

	    _app.onUnload.add(function () {
	        return _this.stop();
	    });
	}

	var Proto = MetricService.prototype = {
	    // Dummy send
	    dummy: false,

	    // Имя метрики (для логирования)
	    name: 'undefined',

	    // Интервал с которым отправлять метрику
	    timeout: 5 * 60 * 1000,

	    // Число попыток для отправки метрики
	    tryCount: 5,

	    // Интервал с которым пытаться отправить метрику
	    tryTimeout: 1 * 60 * 1000,

	    emitTypes: ['stop', 'failed', 'try'],

	    collect: function collect(data) {
	        var item = this.collector.collect(data);
	        var desc = this.description[data.label];

	        this.logger('\n' + JSON.stringify(item));
	        _eventer2.default.emit('metric:collect', this, item, desc);

	        return item;
	    },
	    sendNow: function sendNow(sync) {
	        var data = this.collector.flush();
	        return this.send(data, sync);
	    },
	    send: function send(data, sync) {
	        var _this2 = this;

	        if (this.dummy) {
	            return Promise.resolve(null);
	        } else {
	            return this.sender.send(data, sync).then(function (pack) {
	                _eventer2.default.emit('metric:send', _this2, data, pack);
	                return pack;
	            });
	        }
	    },
	    stop: function stop() {
	        this.stopInterval();
	        return this.sendNow(true);
	    },
	    destroy: function destroy() {
	        return this.stop();
	    },
	    startInterval: function startInterval() {
	        var _this3 = this;

	        var periodicalSend = function periodicalSend() {
	            var packNum = _this3.packCount + 1;
	            _this3.packCount++;

	            var data = _this3.collector.flush();

	            var send = function send(count, sync, callback) {
	                callback = callback || function () {};

	                var attempt = 'Attempt ' + count + ' of ' + _this3.tryCount + '. Pack ' + packNum;
	                _this3.logger(attempt + ' sending...');

	                _this3.send(data, sync).then(function (pack) {
	                    if (pack === null) {
	                        if (_this3.dummy) {
	                            _this3.logger('Dummy send.');
	                        } else {
	                            _this3.logger(attempt + ' empty. Nothing to send.');
	                        }
	                    } else {
	                        _this3.logger(attempt + ' sended.\nPack:\n' + pack + '\n');
	                    }
	                    callback();
	                }).catch(function () {
	                    _this3.logger(attempt + ' sending error.');
	                    tryToSend(count);
	                    callback();
	                });
	            };

	            var tryToSend = function tryToSend(count) {
	                if (count++ === _this3.tryCount) {
	                    _this3.logger('Pack ' + packNum + ' failed to send. No more attempts.');
	                    _this3.emit('failed', data);
	                    return;
	                }

	                var timeout = setTimeout(function () {
	                    send(count, false, function () {
	                        _this3.off('stop', clearTryTimeout);
	                    });
	                }, _this3.tryTimeout);

	                var clearTryTimeout = function clearTryTimeout() {
	                    clearTimeout(timeout);

	                    // last try to send synchronously
	                    send(count, true);
	                };

	                _this3.on('stop', clearTryTimeout);
	                _this3.emit('try', data);
	            };

	            send(1);
	        };

	        this.sendInterval = setInterval(periodicalSend, this.timeout);
	    },
	    stopInterval: function stopInterval() {
	        clearInterval(this.sendInterval);
	        this.emit('stop');
	    },
	    toString: function toString() {
	        return 'Metric ' + this.name + ':' + this.id;
	    },
	    logger: function logger(message) {
	        (0, _logger3.default)(this + '. ' + message);
	    }
	};

	_ToJSON2.default.create(Proto, ['emitterTypes']);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _asyncExec = __webpack_require__(13);

	var _asyncExec2 = _interopRequireDefault(_asyncExec);

	var _types = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _emitterTypes = Symbol('_emitterTypes');
	var _onceCallbacks = Symbol('_onceCallbacks');

	function getArgs(args) {
	    var len = args.length - 1;
	    var result = new Array(len);

	    for (var i = 0; i < len; i++) {
	        result[i] = args[i + 1];
	    }

	    return result;
	}

	/*
	 * Emitter
	 * Добавляет к экземпляру класса возможность подписываться на сообщения от экземпляра.
	 * Позволяет разделить обработчики ответов.
	 *
	 * Пример:
	 *   http.get(url, function(res) {
	 *      console.log(res);
	 *   }).on('error', function(err) {
	 *      console.log(err);
	 *   });
	 *
	 *   var HTTP = function() {
	 *      utils.emitter(this); // <-- необходимый вызов для подключения функций
	 *
	 *      this.get = function(url, callback) {
	 *          var self = this;
	 *
	 *          this.getAsync(url, function(error, result) {
	 *              if (error) {
	 *                  self.emit('error', error, result, someParam); // <-- эмитирует ошибку, callback не будет вызван
	 *              } else {
	 *                  callback(result);
	 *              }
	 *          });
	 *
	 *          return this; // <-- необходимо возвращать себя
	 *      };
	 *   };
	 */

	function Listener() {
	    this.callbacks = [];
	    this[_onceCallbacks] = new Map();
	}

	Listener.prototype = {
	    on: function on(callback) {
	        var _this = this;

	        this.callbacks.push(callback);

	        return function () {
	            _this.off(callback);
	            return callback;
	        };
	    },
	    once: function once(callback) {
	        var unwatch = void 0;
	        var onceCallbacks = this[_onceCallbacks];

	        var inner = function inner() {
	            unwatch();
	            callback.apply(null, arguments);
	            onceCallbacks.delete(inner);
	        };

	        onceCallbacks.set(inner, callback);

	        return unwatch = this.on(inner);
	    },
	    off: function off(callback) {
	        var _this2 = this;

	        var callbacks = this.callbacks;

	        if ((0, _types.isFunction)(callback)) {
	            this.callbacks = callbacks.filter(function (listener) {
	                return !_this2.isSameCallback(listener, callback);
	            });
	        } else {
	            callbacks.length = 0;
	        }
	    },
	    has: function has(callback) {
	        var _this3 = this;

	        var callbacks = this.callbacks;

	        if (callback) {
	            return callbacks.some(function (listener) {
	                return _this3.isSameCallback(listener, callback);
	            });
	        }

	        return callbacks.length > 0;
	    },
	    emit: function emit(args) {
	        this.callbacks.forEach(function (callback) {
	            if (callback) {
	                callback.apply(null, args);
	            }
	        });
	    },
	    isSameCallback: function isSameCallback(listener, callback) {
	        return listener === callback || this[_onceCallbacks].get(listener) === callback;
	    }
	};

	var emitter = function emitter(instance, types) {
	    types = types || [];

	    var wildcard = '*'; // любой тип события
	    var emitterTypes = instance[_emitterTypes];

	    if (emitterTypes) {
	        if (emitterTypes !== wildcard) {
	            if (types === wildcard) {
	                // добавляется '*'
	                instance[_emitterTypes] = wildcard;
	            } else {
	                instance[_emitterTypes] = emitterTypes.concat(types);
	            }
	        }
	    } else {
	        (function () {
	            var listeners = new Map();

	            instance[_emitterTypes] = types;

	            var getListenerByType = function getListenerByType(type) {
	                if (listeners.has(type)) {
	                    return listeners.get(type);
	                } else {
	                    var listener = new Listener();
	                    listeners.set(type, listener);
	                    return listener;
	                }
	            };

	            var checkEmitType = function (type) {
	                var types = this[_emitterTypes];
	                var typesLength = types.length;

	                for (var i = 0; i < typesLength; i++) {
	                    var testType = types[i];

	                    if (testType === type) {
	                        // string
	                        return false;
	                    } else if (testType.test && testType.test(type)) {
	                        // regexp
	                        return false;
	                    }
	                }

	                return true;
	            }.bind(instance);

	            /**
	             * Посылает сообщение.
	             * @param {String} type Тип сообщения.
	             * @param {...*} args Параметры сообщения.
	             */
	            instance.emit = function (type /* args */) {
	                if (this[_emitterTypes] !== wildcard && checkEmitType(type)) {
	                    var klass = this.constructor.name;
	                    var message = 'utils.emitter: ' + klass + ' - unknown emit type "' + type + '". ';

	                    if (this[_emitterTypes].length === 0) {
	                        message += 'Types list not defined.';
	                    } else {
	                        message += 'Known types are: "' + types.join(', ') + '".';
	                    }

	                    if (emitter.strict) {
	                        throw new Error(message);
	                    } else {
	                        console.warn(message);
	                    }
	                }

	                getListenerByType(type).emit(getArgs(arguments));
	            };

	            instance.emitAsync = function () {
	                var _this4 = this,
	                    _arguments = arguments;

	                (0, _asyncExec2.default)(function () {
	                    _this4.emit.apply(_this4, _arguments);
	                });
	            };

	            instance.watch = function (type, callback) {
	                return getListenerByType(type).on(callback);
	            };

	            /**
	             * Подписывается на сообщение.
	             * @param {String} type Тип сообщения.
	             * @param {Function} callback Функция-обработчик сообщения.
	             * @return {this}
	             */
	            instance.on = function (type, callback) {
	                this.watch(type, callback);
	                return this;
	            };

	            instance.watchOnce = function (type, callback) {
	                return getListenerByType(type).once(callback);
	            };

	            /**
	             * Подписывается на сообщение и удаляет обработчик из подписчиков.
	             * @param {String} type Тип сообщения.
	             * @param {Function} callback Функция-обработчик сообщения.
	             * @return {this}
	             */
	            instance.once = function (type, callback) {
	                this.watchOnce(type, callback);
	                return this;
	            };

	            /**
	             * Отписывается от приема сообщений.
	             * @param {String?} type Тип сообщения.
	             * @param {Function?} callback Функция-обработчик сообщения.
	             * @return {this}
	             */
	            instance.off = function (type, callback) {
	                if (type == null) {
	                    listeners.clear();
	                } else {
	                    getListenerByType(type).off(callback);
	                }

	                return this;
	            };

	            /**
	             * Проверяет, что есть подписчик на прием сообщений.
	             * @param {String} type Тип сообщения.
	             * @param {Function?} callback Функция-обработчик сообщения.
	             * @return {Boolean}
	             */
	            instance.has = function (type, callback) {
	                return getListenerByType(type).has(callback);
	            };
	        })();
	    }

	    return instance;
	};

	// Строгий режим: при проверках выдает исключение
	emitter.strict = false;

	exports.default = emitter;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = asyncExec;

	var _strings = __webpack_require__(14);

	var timeouts = [];
	var messageName = (0, _strings.uuid)();

	function asyncExec(fn) {
	    timeouts.push(fn);
	    window.postMessage(messageName, '*');
	}

	window.addEventListener('message', function handleMessage(event) {
	    if (event.source === window && event.data === messageName) {
	        event.stopPropagation();

	        var fn = timeouts.shift();
	        if (fn !== undefined) {
	            fn();
	        }
	    }
	}, true);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.plural = undefined;
	exports.repeat = repeat;
	exports.trim = trim;
	exports.normalize = normalize;
	exports.guid = guid;
	exports.uuid = uuid;
	exports.format = format;
	exports.plural_t = plural_t;
	exports.pluralForm = pluralForm;
	exports.pluralForm_t = pluralForm_t;
	exports.genderForm = genderForm;
	exports.nl2br = nl2br;
	exports.toRegExp = toRegExp;
	exports.escapeHTML = escapeHTML;
	exports.unescapeHTML = unescapeHTML;
	exports.escapeEntities = escapeEntities;
	exports.textToHTML = textToHTML;
	exports.htmlToText = htmlToText;
	exports.truncate = truncate;
	exports.encodeUrl = encodeUrl;

	var _i18n = __webpack_require__(15);

	var _i18n2 = _interopRequireDefault(_i18n);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EMPTY = ''; /* global document */

	var NormalizeRegexp = /[\s\xA0]+/g;
	var TrimRegexp = /(^[\s\xA0]+|[\s\xA0]+$)/g;
	var FormatRegexp = /\{(\w+)\}/g;
	var EscapeRegexp = /([\|\!\[\]\^\$\(\)\{\}\+\=\?\.\*\\])/g;
	var NLRegexp = /\r\n|\n|\r/g;

	var stringFromCharCode = String.fromCharCode;

	var EscapeHTMLRe = /[&<>\"\']/g;
	var EscapeEntitiesRe = /[\s\S]/g;
	var EscapeHTMLReplacer = function EscapeHTMLReplacer(c) {
	    switch (c) {
	        case '<':
	            return '&lt;';
	        case '>':
	            return '&gt;';
	        case '"':
	            return '&quot;';
	        case "'":
	            return "&apos;";
	        case '&':
	            return '&amp;';
	    }

	    return '&#' + c.charCodeAt(0) + ';';
	};

	var UnescapeHTMLRe = /(&(lt|gt|quot|apos|amp|#\d+);|.)/gi;
	var UnescapeHTMLReplacer = function UnescapeHTMLReplacer(_, symbol, code) {
	    switch (code) {
	        case 'lt':
	            return '<';
	        case 'gt':
	            return '>';
	        case 'quot':
	            return '"';
	        case 'apos':
	            return "'";
	        case 'amp':
	            return '&';
	    }

	    if (code) {
	        return stringFromCharCode(code.substring(1));
	    }

	    return symbol;
	};

	function textOrEmpty(text) {
	    return text || EMPTY;
	}

	function randomChars() {
	    return ((1 + Math.random()) * 0x3fffffff | 0).toString(36);
	}

	// Русский
	var ru = _i18n2.default.lang === 'ru';

	// For GUID
	var guid_counter = 0;
	var guid_prefix = 'id-' + randomChars() + '-' + randomChars() + '-';

	/**
	 * Повторяет строку.
	 * @param {String} str строка
	 * @param {Number} count число повторений
	 * @return {String} строка повторенная n раз
	 * @example
	 * strings.repeat("foobar", 3);
	 * // -> "foobarfoobarfoobar"
	 *
	 * strings.repeat("foo", 0);
	 * // -> ""
	 */
	function repeat(str, count) {
	    if (count < 1) {
	        return EMPTY;
	    }

	    return new Array(count + 1).join(str);
	}

	/**
	 * Удаляет начальные и конечные пробельные символы.
	 * @param {String} str строка
	 * @return {String} строка с удаленными пробелами
	 * @example
	 * "   foo  \n" -> "foo"
	 */
	function trim(str) {
	    return textOrEmpty(str).replace(TrimRegexp, EMPTY);
	}

	/**
	 * Удаляет лишние пробельные символы.
	 * @param {String} str строка
	 * @return {String} строка с удаленными пробелами
	 * @example
	 * "   foo  baz   \n" -> "foo baz"
	 */
	function normalize(str) {
	    return this.trim(str).replace(NormalizeRegexp, ' ');
	}

	/**
	 * Генерирует GUID.
	 * @return {String} GUID.
	 */
	function guid() {
	    return guid_prefix + ++guid_counter;
	}

	/**
	 * Генерирует UUID.
	 * @return {String} UUID.
	 */
	function uuid() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = Math.random() * 16 | 0,
	            v = c == 'x' ? r : r & 0x3 | 0x8;
	        return v.toString(16);
	    });
	}

	/**
	 * Выводит строку по заданому формату.
	 * @param {String} format строка
	 * @return {Object} data объект с данными
	 * @example
	 * strings.format("{n} дней", {n: 10});
	 * // -> "10 дней"
	 */
	function format(fmt, data) {
	    return fmt.replace(FormatRegexp, function (_, expr) {
	        return data.hasOwnProperty(expr) ? data[expr] : EMPTY;
	    });
	}

	/**
	 * Позволяет выводить число с разными формами слова.
	 * @param {Number} number число
	 * @param {Array} forms список форм слова (формы: 1, 2, 5, 0)
	 * @return {String} число с формой слова
	 * @example
	 * var forms = ['{n} письмо', '{n} письма', '{n} писем', 'писем нет'];
	 * strings.plural(0, forms);
	 * // -> 'писем нет'
	 *
	 * strings.plural(1, forms);
	 * // -> '1 письмо'
	 *
	 * strings.plural(2, forms);
	 * // -> '2 письма'
	 *
	 * strings.plural(5, forms);
	 * // -> '5 писем'
	 *
	 * strings.plural(5, forms, true);
	 * // -> '<span>5</span> писем'
	 */
	function formatWithHTML(num, form, html) {
	    return format(form, { n: html ? '<span>' + num + '</span>' : num });
	}

	var plural = exports.plural = function () {
	    if (ru) {
	        return function (num, forms, html) {
	            var res = 2;
	            var num_10 = num % 10;
	            var num_100 = num % 100;

	            if (num === 0) {
	                // если задана форма для нулевого значения, то выводим только его
	                if (forms[3]) {
	                    res = 3;
	                }
	            } else {
	                if (num_100 < 5 || num_100 > 20) {
	                    if (num_10 === 1) {
	                        res = 0;
	                    } else {
	                        if (num_10 >= 2 && num_10 <= 4) {
	                            res = 1;
	                        }
	                    }
	                }
	            }

	            return formatWithHTML(num, forms[res], html);
	        };
	    } else {
	        return function (num, forms, html) {
	            var res = 1;

	            if (num === 0) {
	                if (forms[2]) {
	                    res = 2;
	                }
	            } else {
	                if (num === 1) {
	                    res = 0;
	                }
	            }

	            return formatWithHTML(num, forms[res], html);
	        };
	    }
	}();

	/**
	 * Вызывает plural и передает формы слова полученные из строки вида "... | ... | ..."
	 */
	function plural_t(num, t_key, html) {
	    var forms = _i18n2.default.ta(t_key);
	    return plural(num, forms, html);
	}

	/**
	 * Множественная или единственная форма в зависимости от числа.
	 * @param {Number} number число
	 * @param {Array} forms список форм слова (формы: 1, 2, 0)
	 * @return {String} форма слова/выражения
	 */
	function pluralForm(number, forms) {
	    if (forms[2] && number === 0) {
	        return forms[2];
	    }

	    return number > 1 ? forms[1] : forms[0];
	}

	function pluralForm_t(number, t_key) {
	    var forms = _i18n2.default.ta(t_key);
	    return pluralForm(number, forms);
	}

	/**
	 * Форма слова в зависимости от рода
	 * @param {Boolean} is_male мужской род
	 * @return {String} t_key ключ для используемых форм
	 */
	function genderForm(is_male, t_key) {
	    var forms = _i18n2.default.ta(t_key);
	    var result = forms[0];

	    if (ru && !is_male) {
	        result = forms[1] || result + 'а';
	    }

	    return result;
	}

	/**
	 * Заменяет переносы в тексте на перенос HTML.
	 * @param {String} text
	 * @return {String}
	 */
	function nl2br(text) {
	    return text.replace(/\r/g, EMPTY).replace(/\n/g, '<br>');
	}

	/**
	 * Экранирует в строке спец. символы RegExp.
	 * @param {String} text
	 * @return {String}
	 * @example
	 *   "{1}" -> "\{1\}"
	 */
	function toRegExp(text) {
	    return text.replace(EscapeRegexp, "\\$1");
	}

	/**
	 * Возвращает строку для вставки в HTML-код.
	 * Используется для записи в innerHTML.
	 * @param {String} string строка
	 * @return {String} преобразованная строка
	 * @example
	 * "&lt;foo>" -> "&amp;lt;foo&amp;gt;"
	 */
	function escapeHTML(text) {
	    return textOrEmpty(text).replace(EscapeHTMLRe, EscapeHTMLReplacer);
	}

	/**
	 * Функция обратная escapeHTML.
	 * @param {String} string строка
	 * @return {String} преобразованная строка
	 * @example
	 * "&amp;lt;foo&amp;gt;" -> "&lt;foo>"
	 */
	function unescapeHTML(text) {
	    return textOrEmpty(text).replace(UnescapeHTMLRe, UnescapeHTMLReplacer);
	}

	/**
	 * Html-представление символов (&#xxxx;)
	 * @param {String} string строка
	 * @return {String} преобразованная строка
	 * @example
	 * "a1" -> "&#97;&#49;"
	 */
	function escapeEntities(text) {
	    return textOrEmpty(text).replace(EscapeEntitiesRe, EscapeHTMLReplacer);
	}

	/**
	 * Представляет текст в формате html
	 * @param {String} string строка
	 * @paran {Boolean} boolean добавлять <br> в конец строки. По умолчанию true
	 * @return {DocumentFragment} фрагмент документа
	 */
	function textToHTML(text, lastBr) {
	    if (lastBr === undefined) {
	        lastBr = true;
	    }

	    var buffer = document.createDocumentFragment();

	    if (text != null) {
	        var br = document.createElement('br');
	        var lines = textOrEmpty(text).split(/\n/g);
	        var lineCount = lines.length;

	        lines.forEach(function (line, index) {
	            var text = document.createTextNode(line);

	            buffer.appendChild(text);

	            if (index < lineCount - 1 || lastBr) {
	                buffer.appendChild(br.cloneNode());
	            }
	        });
	    }

	    return buffer;
	}

	/**
	 * Представляет html в текст
	 * @param {String} string HTML
	 * @return {String} строка
	 */
	function htmlToText(html) {
	    var elem = document.createElement('div');
	    elem.innerHTML = textOrEmpty(html);
	    return elem.innerText;
	}

	/**
	 * Обрезает текст до определенной длины
	 * @param {String} text строка
	 * @param {Number?} count максимальный размер
	 * @param {String?} hellip '...'
	 * @return {String} обрезанная строка
	 */
	function truncate(text, count, hellip) {
	    count = count || 40;
	    hellip = hellip || '…';

	    var counter = count;
	    var result = [];
	    var lines = textOrEmpty(text).split(NLRegexp);

	    for (var i = 0, l = lines.length; i < l; i++) {
	        var line = lines[i];
	        var len = line.length;

	        if (counter >= len) {
	            result.push(line);
	            counter -= len;
	        } else {
	            result.push(line.substr(0, counter) + hellip);
	            break;
	        }
	    }

	    return result.join('\n');
	}

	function encodeUrl(url) {
	    var hasEncodedChars = new RegExp('%[0-9A-F]{2}', 'ig').test(url);
	    var hasSpecialChars = new RegExp('[{};]+', 'ig').test(url);

	    var dontEncode = hasEncodedChars && !hasSpecialChars;

	    return dontEncode ? url : encodeURI(url);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _i18nFactory = __webpack_require__(16);

	var _i18nFactory2 = _interopRequireDefault(_i18nFactory);

	var _messages = __webpack_require__(18);

	var _messages2 = _interopRequireDefault(_messages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getMessage(key) {
	    try {
	        return _messages2.default[key].message;
	    } catch (e) {
	        return '';
	    }
	}

	exports.default = (0, _i18nFactory2.default)(getMessage, 'ru');

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (getMessage, lang) {
	    var REGEX_I18N_MSG_REPLACER = function REGEX_I18N_MSG_REPLACER(_, key) {
	        return getMessage(key);
	    };

	    function replaceMsg(str) {
	        return str.replace(REGEX_I18N_MSG, REGEX_I18N_MSG_REPLACER);
	    }

	    function replaceText(node, msg) {
	        return document.createTextNode(replaceMsg(msg));
	    }

	    function replaceHtml(node, msg) {
	        var span = document.createElement('span');
	        span.innerHTML = replaceMsg(msg);
	        return span;
	    }

	    function replaceNode(node, html) {
	        var replacer = html ? replaceHtml : replaceText;
	        new _Spider2.default(node, replacer).process(REGEX_I18N_MSG);
	    }

	    return {
	        t: getMessage,

	        /**
	         * Заменяет __MSG_...__ в тексте.
	         *
	         * @param {String} str
	         */
	        replaceMsg: replaceMsg,

	        replaceNode: replaceNode,

	        replaceOnPage: function replaceOnPage() {
	            var title = document.querySelector('title');
	            if (title) {
	                replaceNode(title, false);
	            }
	            replaceNode(document.body, true);
	        },
	        ta: function ta(key) {
	            return splitToArray(this.t(key));
	        },


	        /**
	         * Текущий язык браузера.
	         */
	        lang: function (language) {
	            try {
	                return language.match(/^../)[0];
	            } catch (e) {
	                return DEFAULT_LANG;
	            }
	        }(lang)
	    };
	};

	var _Spider = __webpack_require__(17);

	var _Spider2 = _interopRequireDefault(_Spider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var REGEX_SPLIT_ARRAY = /\s*\|\s*/; /* global document */

	var REGEX_I18N_MSG = /__MSG_(\w+)__/g;
	var DEFAULT_LANG = 'ru';

	function splitToArray(str) {
	    return str.split(REGEX_SPLIT_ARRAY);
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Spider;
	/* global document, Node, NodeFilter */

	var doc = document;

	function Spider(content, action) {
	    this.content = content;
	    this.action = action;
	}

	Spider.process = function (content, replacer) {
	    new Spider(content, replacer.handler).process(replacer.regexp);
	};

	Spider.prototype = {
	    process: function process(regex) {
	        this.process_recurse(this.content, regex);
	    },


	    process_recurse: function () {
	        if (doc.createTreeWalker) {
	            var SHOW_TEXT = NodeFilter.SHOW_TEXT;

	            return function (node, regex) {
	                var walker = doc.createTreeWalker(node, SHOW_TEXT, null, false);

	                while (walker.nextNode()) {
	                    walker.currentNode = this.process_text_node(walker.currentNode, regex);
	                }
	            };
	        } else {
	            var TEXT_NODE = Node.TEXT_NODE;

	            return function (node, regex) {
	                if (node.nodeType === TEXT_NODE) {
	                    this.process_text_node(node, regex);
	                } else if (node.hasChildNodes()) {
	                    var i,
	                        childNodes = node.childNodes,
	                        l = childNodes.length,
	                        childs = new Array(l);

	                    for (i = 0; i < l; i++) {
	                        childs[i] = childNodes[i];
	                    }

	                    for (i = 0, l = childs.length; i < l; i++) {
	                        this.process_recurse(childs[i], regex);
	                    }
	                }
	            };
	        }
	    }(),

	    process_text_node: function process_text_node(node, regex) {
	        var current = node;

	        while (node) {
	            var text = node.data;
	            var match = regex.exec(text);

	            if (match) {
	                var obj = this.get_processed_fragment(node, text, match);

	                if (obj) {
	                    var fragment = obj.node;
	                    var last = obj.last;

	                    current = last || fragment.lastChild;

	                    node.parentNode.replaceChild(fragment, node);
	                    node = last;

	                    continue;
	                }
	            }

	            break;
	        }

	        return current;
	    },
	    get_processed_fragment: function get_processed_fragment(node, text, match) {
	        var index = match.index;
	        var len = match[0].length;

	        var center = text.substr(index, len);
	        var result = this.action(node, center, match);

	        if (result) {
	            var textNode;
	            var fragment = doc.createDocumentFragment();
	            var last = null;

	            if (index > 0) {
	                var left = text.substring(0, index);
	                textNode = doc.createTextNode(left);
	                fragment.appendChild(textNode);
	            }

	            fragment.appendChild(result);

	            var right = text.substring(index + len);
	            if (right.length > 0) {
	                textNode = doc.createTextNode(right);
	                last = fragment.appendChild(textNode);
	            }

	            return {
	                node: fragment, // фрагмент, который нужно заменить
	                last: last // остаток, который нужно обработать
	            };
	        }

	        return result;
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
		"connect": {
			"message": "Подключить"
		},
		"reconnect": {
			"message": "Переподключить"
		},
		"connecting": {
			"message": "Подключение…"
		},
		"disable": {
			"message": "Отключить"
		},
		"enable": {
			"message": "Включить"
		},
		"close": {
			"message": "Закрыть"
		},
		"disconnect_all_networks": {
			"message": "Выйти из всех сетей"
		},
		"disconnect_network": {
			"message": "Отключить «$1»"
		},
		"connect_network": {
			"message": "«$1» – подключить"
		},
		"disable_network": {
			"message": "«$1» – офлайн"
		},
		"enable_network": {
			"message": "«$1» – онлайн"
		},
		"network_auth": {
			"message": "Авторизация в социальной сети."
		},
		"network_connecting": {
			"message": "Подключение к социальной сети…"
		},
		"network_disconnected": {
			"message": "Социальная сеть отключена."
		},
		"network_tab_message": {
			"message": "В новом окне откроется сайт социальной сети, на котором вам необходимо авторизоваться."
		},
		"network_offline": {
			"message": "Нет соединения с соцсетью."
		},
		"interrupt_auth": {
			"message": "Прервать авторизацию"
		},
		"incognito_title": {
			"message": "Амиго в режиме инкогнито"
		},
		"ok_name": {
			"message": "Одноклассники"
		},
		"mm_name": {
			"message": "Мой Мир"
		},
		"tw_name": {
			"message": "Twitter"
		},
		"fb_name": {
			"message": "Facebook"
		},
		"vk_name": {
			"message": "ВКонтакте"
		},
		"forms_day": {
			"message": "{n} день | {n} дня | {n} дней | нет",
			"description": "Для переводчика: это формы слова в русском - 1 день, 2 дня, 5 дней, [опциональный текст для 0]. Для английского 3 формы: 1 day, 2..n - days, [optional for nothing]"
		},
		"date_weekdays": {
			"message": "воскресенье | понедельник | вторник | среда | четверг | пятница | суббота"
		},
		"date_weekdays_short": {
			"message": "вск | пнд | втр | срд | чтв | птн | сбт"
		},
		"date_months": {
			"message": "января | февраля | марта | апреля | мая | июня | июля | августа | сентября | октября | ноября | декабря"
		},
		"date_months_short": {
			"message": "янв | фев | мар | апр | май | июн | июл | авг | сен | окт | ноя | дек"
		},
		"date_ago": {
			"message": "назад"
		},
		"date_realtime_sec": {
			"message": "{n} сек | {n} сек | {n} сек | сейчас",
			"description": "Для переводчика: в англ. '{n}s | {n}s | now'"
		},
		"date_realtime_min": {
			"message": "{n} мин | {n} мин | {n} мин"
		},
		"date_realtime_hour": {
			"message": "{n} час | {n} часа | {n} часов"
		},
		"date_fulltime_format": {
			"message": "{dd}.{mm}.{y} {HH}:{MM}"
		},
		"date_shorttime_format": {
			"message": "{HH}:{MM}"
		},
		"date_datetime_format": {
			"message": "{d} {mn} {yy} года, {HH}:{MM}"
		},
		"date_datetime_day_format": {
			"message": "{d} {mn}"
		}
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _emitter = __webpack_require__(12);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _emitter2.default)({}, '*'); // see emitter api

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.onBeforeUnload = exports.onUnload = undefined;

	var _global = __webpack_require__(4);

	var _func = __webpack_require__(21);

	var onUnload_add = void 0;
	var onUnload_remove = void 0;

	var onBeforeUnload_add = void 0;
	var onBeforeUnload_remove = void 0;

	if (_global.isApp) {
	    (function () {
	        var emptyWindow = {
	            addListener: _func.empty,
	            removeListener: _func.empty
	        };

	        var appWindowOnClosed = function appWindowOnClosed() {
	            try {
	                return chrome.app.window.current().onClosed;
	            } catch (e) {
	                return emptyWindow;
	            }
	        };

	        onBeforeUnload_add = onUnload_add = function onUnload_add(callback) {
	            appWindowOnClosed().addListener(callback);
	        };

	        onBeforeUnload_remove = onUnload_remove = function onUnload_remove(callback) {
	            appWindowOnClosed().removeListener(callback);
	        };
	    })();
	} else {
	    onUnload_add = function onUnload_add(callback) {
	        window.addEventListener('unload', callback);
	    };

	    onUnload_remove = function onUnload_remove(callback) {
	        window.removeEventListener('unload', callback);
	    };

	    onBeforeUnload_add = function onBeforeUnload_add(callback) {
	        window.addEventListener('beforeunload', callback);
	    };

	    onBeforeUnload_remove = function onBeforeUnload_remove(callback) {
	        window.removeEventListener('beforeunload', callback);
	    };
	}

	var onUnload = exports.onUnload = {
	    add: onUnload_add,
	    remove: onUnload_remove
	};

	var onBeforeUnload = exports.onBeforeUnload = {
	    add: onBeforeUnload_add,
	    remove: onBeforeUnload_remove
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.empty = empty;
	exports.success = success;
	exports.fail = fail;
	exports.nullify = nullify;
	exports.identity = identity;
	exports.once = once;
	function empty() {
	    /* empty func */
	}

	function success() {
	    return true;
	}

	function fail() {
	    return false;
	}

	function nullify() {
	    return null;
	}

	exports.null = nullify;
	function identity(data) {
	    return data;
	}

	function once(fn) {
	    var result = void 0,
	        called = false;

	    return function () {
	        if (called) {
	            return result;
	        } else {
	            called = true;
	            return result = fn.apply(this, arguments);
	        }
	    };
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(23);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _logger2.default)('metric', 'json');

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (module, outputType) {
	    var name = '__' + module + '_log';
	    var color = get_next_color_index();
	    var module_name = '%c' + module;
	    var color_style = 'color: ' + color;

	    var storageKey = name + '_logging';
	    var json = outputType === 'json';
	    var is_logging = false;

	    function info() {
	        Console.info(module_name, color_style, 'logging ' + (is_logging ? 'on' : 'off'));
	    }

	    function getLogging() {
	        return _asyncLocalStorage2.default.get(storageKey).then(function (items) {
	            is_logging = Boolean(items[storageKey]);
	            return is_logging;
	        });
	    }

	    getLogging().then(function (value) {
	        if (value) {
	            info();
	        }
	    });

	    // Вызов metric в консоли включает/выключает логирование
	    window.__defineGetter__(name, function () {
	        getLogging().then(function (value) {
	            if (value) {
	                _asyncLocalStorage2.default.remove(storageKey);
	            } else {
	                var _value = {};
	                _value[storageKey] = true;
	                _asyncLocalStorage2.default.set(_value);
	            }

	            is_logging = !value;
	            info();
	        });
	    });

	    return function (data, prefix) {
	        if (is_logging) {
	            if (typeof data === 'object' && json) {
	                data = JSON.stringify(data);
	            }

	            var args = [data];

	            if (prefix) {
	                args.unshift(prefix + ':');
	            }

	            args.unshift(color_style);
	            args.unshift(module_name);

	            Console.log.apply(Console, args);
	        }
	    };
	};

	var _asyncLocalStorage = __webpack_require__(24);

	var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Console = console;
	var log_colors = '669966 6666CC CC6666 660099 FF3300'.split(' ');

	var next_color_index = 0;

	function get_next_color_index() {
	    if (next_color_index > log_colors.length) {
	        next_color_index = 0;
	    }

	    var next_color = '#' + log_colors[next_color_index];
	    next_color_index++;

	    return next_color;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _global = __webpack_require__(4);

	var _jsStorageAdapter = __webpack_require__(25);

	var _jsStorageAdapter2 = _interopRequireDefault(_jsStorageAdapter);

	var _chromeStorageAdapter = __webpack_require__(26);

	var _chromeStorageAdapter2 = _interopRequireDefault(_chromeStorageAdapter);

	var _asyncLocalStorageAdapter = __webpack_require__(27);

	var _asyncLocalStorageAdapter2 = _interopRequireDefault(_asyncLocalStorageAdapter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global localStorage */

	var asyncLocalStorage;

	function showInfo(info) {
	    if (true) {
	        console.info('asyncLocalStorage uses ' + info);
	    }
	}

	if (_global.isApp) {
	    try {
	        asyncLocalStorage = (0, _chromeStorageAdapter2.default)();
	        showInfo('chromeStorageAdapter');
	    } catch (chromeStorageEx) {
	        console.info('"storage" permission required to use chrome.storage');

	        asyncLocalStorage = (0, _jsStorageAdapter2.default)();
	        showInfo('jsStorageAdapter');
	    }
	} else {
	    try {
	        // try
	        var _ = localStorage;
	        asyncLocalStorage = (0, _asyncLocalStorageAdapter2.default)();
	        showInfo('asyncLocalStorageAdapter');
	    } catch (localStorageEx) {
	        asyncLocalStorage = (0, _jsStorageAdapter2.default)();
	        showInfo('jsStorageAdapter');
	    }
	}

	exports.default = asyncLocalStorage;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = jsStorageAdapter;

	var _array = __webpack_require__(8);

	function jsStorageAdapter() {
	    var storage = {};
	    var exports = {};

	    var makePromise = function makePromise(func, args) {
	        return new Promise(function (resolve, reject) {
	            try {
	                resolve(func.apply(null, args));
	            } catch (e) {
	                reject(e);
	            }
	        });
	    };

	    var funcs = {
	        get: function get(keys) {
	            var result = {};

	            (0, _array.toArray)(keys).forEach(function (key) {
	                var value = storage[key];

	                if (value === undefined) {
	                    return;
	                }

	                result[key] = storage[key];
	            });

	            return result;
	        },
	        set: function set(items) {
	            Object.keys(items).forEach(function (key) {
	                var value = items[key];

	                if (value === undefined) {
	                    // ignore undefined values
	                    return;
	                }

	                storage[key] = value;
	            });
	        },
	        remove: function remove(keys) {
	            (0, _array.toArray)(keys).forEach(function (key) {
	                delete storage[key];
	            });
	        },
	        clear: function clear() {
	            storage = {};
	        }
	    };

	    ['get', 'set', 'remove', 'clear'].forEach(function (method) {
	        exports[method] = function () {
	            return makePromise(funcs[method], arguments);
	        };
	    });

	    return exports;
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = chromeStorageAdapter;
	/* global chrome */

	function chromeStorageAdapter() {
	    var exports = {};
	    var runtime = chrome.runtime;
	    var storage = chrome.storage.local;

	    function makePromise(method, args) {
	        return new Promise(function (resolve, reject) {
	            args.push(function (data) {
	                var err = runtime.lastError;

	                if (err) {
	                    reject(err);
	                } else {
	                    resolve(data);
	                }
	            });

	            try {
	                storage[method].apply(storage, args);
	            } catch (e) {
	                reject(e);
	            }
	        });
	    }

	    ['get', 'set', 'remove', 'clear'].forEach(function (method) {
	        exports[method] = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            return makePromise(method, args);
	        };
	    });

	    return exports;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = asyncLocalStorageAdapter;

	var _array = __webpack_require__(8);

	function asyncLocalStorageAdapter() {
	    var storage = localStorage;
	    var exports = {};

	    var makePromise = function makePromise(func, args) {
	        return new Promise(function (resolve, reject) {
	            try {
	                resolve(func.apply(null, args));
	            } catch (e) {
	                reject(e);
	            }
	        });
	    };

	    var funcs = {
	        get: function get(keys) {
	            var result = {};

	            (0, _array.toArray)(keys).forEach(function (key) {
	                var value = storage.getItem(key);

	                if (value == null) {
	                    return;
	                }

	                result[key] = JSON.parse(value);
	            });

	            return result;
	        },
	        set: function set(items) {
	            Object.keys(items).forEach(function (key) {
	                var value = items[key];

	                if (value === undefined) {
	                    // ignore undefined values
	                    return;
	                }

	                storage.setItem(key, JSON.stringify(value));
	            });
	        },
	        remove: function remove(keys) {
	            (0, _array.toArray)(keys).forEach(function (key) {
	                storage.removeItem(key);
	            });
	        },
	        clear: function clear() {
	            storage.clear();
	        }
	    };

	    ['get', 'set', 'remove', 'clear'].forEach(function (method) {
	        exports[method] = function () {
	            return makePromise(funcs[method], arguments);
	        };
	    });

	    return exports;
	} /* global localStorage */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Sender;

	var _uri = __webpack_require__(29);

	var _clientParamsPromise = __webpack_require__(30);

	var _clientParamsPromise2 = _interopRequireDefault(_clientParamsPromise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global XMLHttpRequest, navigator */

	function Sender(options) {
	    var _this = this;

	    options = options || {};

	    if (options.url) {
	        this.url = options.url;
	    }

	    if (options.method) {
	        this.method = options.method;
	    }

	    if (options.v_extension) {
	        this.v_extension = options.v_extension;
	    }

	    if (options.id_extension) {
	        this.id_extension = options.id_extension;
	    }

	    // Кешируем URL, чтобы отправить синхронный пакет в конце браузерной сессии
	    this.urlToSend().then(function (url) {
	        _this.urlToSendCached = url;
	    });
	}

	Sender.prototype = {
	    url: 'http://s.amigo.mail.ru/sid.408',
	    method: 'POST',
	    v_extension: null,

	    urlToSend: function urlToSend() {
	        var _this2 = this;

	        return _clientParamsPromise2.default.then(function () {
	            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            var urlParams = {};

	            Object.keys(params).forEach(function (key) {
	                urlParams[key] = params[key] || 'undefined';
	            });

	            if (_this2.v_extension) {
	                urlParams.v_extension = _this2.v_extension;
	            }

	            if (_this2.id_extension) {
	                urlParams.id_extension = _this2.id_extension;
	            }

	            return _this2.url + '?' + (0, _uri.encodeParams)(urlParams);
	        });
	    },
	    pack: function pack(data) {
	        var entries = data.map(function (obj) {
	            return Object.keys(obj).filter(function (prop) {
	                return prop !== 'metric_id';
	            }) // свойство, которое не следует отправлять
	            .map(function (prop) {
	                return prop + ':' + obj[prop];
	            }) // <key>:<value>
	            .join('\t');
	        } // <key1>:<value1>\t<key2>:<value2>\t...<keyN>:<valueN>
	        );

	        return 'null\n' + entries.join('\n');
	    },
	    request: function request(url, pack, async, onload, onerror) {
	        var xhr = new XMLHttpRequest();

	        xhr.onload = onload;
	        xhr.onerror = onerror;

	        xhr.open(this.method, url, true);
	        xhr.send(pack);

	        return xhr;
	    },
	    send: function send(data, sync) {
	        var _this3 = this;

	        if (data.length === 0) {
	            return Promise.resolve(null);
	        }

	        var pack = this.pack(data);

	        if (sync) {
	            // синхронный пакет в конце сессии
	            var url = this.urlToSendCached;

	            if (navigator.sendBeacon) {
	                navigator.sendBeacon(url, pack);
	            } else {
	                this.request(url, pack, false);
	            }

	            return Promise.resolve(pack);
	        } else {
	            return this.urlToSend().then(function (url) {
	                return new Promise(function (resolve, reject) {
	                    var xhr = _this3.request(url, pack, true, function () {
	                        var status = xhr.status;

	                        if (status >= 200 && status < 400) {
	                            resolve(pack);
	                        } else {
	                            reject(data);
	                        }
	                    }, function () {
	                        reject(data);
	                    });
	                });
	            });
	        }
	    }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.uriRegExpGlobal = exports.uriRegExp = exports.uriMatcher = undefined;
	exports.toURI = toURI;
	exports.fromURI = fromURI;
	exports.decodeParams = decodeParams;
	exports.encodeParams = encodeParams;
	exports.parse = parse;
	exports.testStrictUri = testStrictUri;
	exports.testProtocol = testProtocol;

	var _types = __webpack_require__(9);

	function getURIRegExp() {
	    function iCaseRegexp(str) {
	        return str.replace(/./g, function (c) {
	            return '[' + c + c.toUpperCase() + ']';
	        });
	    }

	    var punct = ",;:!'.";
	    var letters = "a-zA-Z\u0400-\u04FF\\d\\-"; // latin + cyrillic + numbers
	    var symbols = letters + "\\/\\$\\^\\{\\}%&=~+*_@";
	    var reserved = "(?:[" + symbols + "]|[" + punct + "](?=[" + symbols + "]))*";
	    var scheme = "(\\w+:\\/\\/)?";

	    var classic_domain = '[a-zA-Z]{2,8}';
	    var int_domains = ['рф', 'қаз', 'укр'].map(iCaseRegexp).join('|'); // [рР][фФ]|...
	    var idn_domains = '[xX][nN]--[a-zA-Z\\d]+';
	    var root_domain = [idn_domains, classic_domain, int_domains].join('|');
	    var domain = "((?:[" + letters + "]+\\.)+(?:(?:" + root_domain + ")(?::\\d+)?))";

	    var path = "(\\/" + reserved + ")?";
	    var query = "(?:\\?(" + reserved + "))?";
	    var fragment = "(?:#(" + reserved + "))?";

	    return scheme + domain + path + query + fragment;
	}

	var uri = getURIRegExp();
	var strictUriRegExp = new RegExp('^' + uri + '$');

	/**
	 * Uri matcher for RegExp
	 */
	var uriMatcher = exports.uriMatcher = uri;

	/**
	 * Uri regExp
	 */
	var uriRegExp = exports.uriRegExp = new RegExp(uri);

	/**
	 * Uri regExp (g)
	 */
	var uriRegExpGlobal = exports.uriRegExpGlobal = new RegExp(uri, 'g');

	/**
	 * Encodes a value according to the RFC3986 specification.
	 * @param {String} val The string to encode.
	 */
	function toURI(val) {
	    return encodeURIComponent(val).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
	}

	/**
	 * Decodes a string that has been encoded according to RFC3986.
	 * @param {String} val The string to decode.
	 */
	function fromURI(val) {
	    return decodeURIComponent(val);
	}

	/**
	 * Deserialize a URL-encoded string to an object.
	 * @param {String} queryString The URL-encoded to deserialize.
	 */
	function decodeParams(queryString) {
	    var params = {};

	    if (typeof queryString === 'string') {
	        queryString = queryString.trim();

	        var decodedQueryString = fromURI(queryString);
	        var parts = decodedQueryString.split('&');

	        parts.forEach(function (part) {
	            var equalSingPos = part.indexOf('=');
	            var key = part.slice(0, equalSingPos);

	            if (key !== '') {
	                params[key] = part.slice(equalSingPos + 1);
	            }
	        });
	    }

	    return params;
	}

	function param(name, value) {
	    if (value == null) {
	        return null;
	    }

	    if (typeof value === 'string') {
	        value = toURI(value);
	        return toURI(name) + (value ? '=' + value : '');
	    }

	    if (value instanceof Array) {
	        return value.map(function (value) {
	            return param(name, value);
	        });
	    }

	    return param(name, String(value));
	}

	/**
	 * Serialize a object to URL-encoded string.
	 * @return {String} queryString The URL-encoded string.
	 */
	function encodeParams(data) {
	    if (data == null) {
	        return '';
	    }

	    if ((0, _types.isObject)(data) || (0, _types.isArray)(data)) {
	        var _ret = function () {
	            var pairs = [];

	            Object.keys(data).forEach(function (key) {
	                var value = param(key, data[key]);

	                if ((0, _types.isArray)(value)) {
	                    pairs = pairs.concat(value);
	                } else {
	                    pairs.push(value);
	                }
	            });

	            return {
	                v: pairs.filter(function (val) {
	                    return val;
	                }).join('&').replace(/%20/g, '+')
	            };
	        }();

	        if (typeof _ret === "object") return _ret.v;
	    } else {
	        return param(data, '');
	    }
	}

	function parse(str) {
	    var matches = (str || '').match(uriRegExp) || [];

	    return {
	        href: matches[0],
	        proto: matches[1] || '',
	        domain: matches[2] || '',
	        path: matches[3] || '',
	        query: matches[4] || '',
	        hash: matches[5] || ''
	    };
	}

	function testStrictUri(uri) {
	    return strictUriRegExp.test(uri);
	}

	function testProtocol(uri, protocols) {
	    protocols = protocols || ['http'];

	    var matcher = protocols.join('|');
	    var regexp = new RegExp("^\\s*[" + matcher + "]+:\\/\\/");

	    return regexp.test(uri);
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _global = __webpack_require__(4);

	var _array = __webpack_require__(8);

	/* global navigator */

	/*
	    Возвращает параметры передаваемые в URL запроса к статистике:
	    http://s.amigo.mail.ru/sid.408?aid=84D541D7-8DA5-489B-A920-454F2D095686&rfr=social&v_chrome=32.0.1715.109&v_extension=0.16.0

	    Если какой-то параметр не удалось получить, то в качестве значения этого параметра возвращается undefined.
	*/

	var amigo = chrome.amigo;

	var executors = {
	    v_browser: function v_browser(resolve, reject) {
	        var match = navigator.userAgent.match(/((Chrome|Gecko)\/[^\s]+) (\w+\/[^\s]+)/);
	        var name = match[3];

	        if (name && name.indexOf('Safari') === 0) {
	            // Chrome
	            name = match[1];
	        }

	        resolve(name);
	    },

	    v_chrome: function v_chrome(resolve, reject) {
	        try {
	            resolve(/chrome\/(\S*)/i.exec(navigator.appVersion)[1]);
	        } catch (e) {
	            reject(new Error('Chrome version undefined'));
	        }
	    },

	    v_extension: function v_extension(resolve, reject) {
	        resolve(_global.version);
	    },

	    rfr: function rfr(resolve, reject) {
	        amigo.GetRfr(function (rfr) {
	            if (rfr != null) {
	                resolve(rfr);
	            } else {
	                reject(new Error('GetRfr returns null value'));
	            }
	        });
	    },

	    aid: function aid(resolve, reject) {
	        amigo.GetGuid(function (guid) {
	            if (guid != null) {
	                resolve(guid.replace(/[{}]/g, ''));
	            } else {
	                reject(new Error('GetGuid returns null value'));
	            }
	        });
	    }
	};

	var keys = Object.keys(executors);
	var promises = keys.map(function (key) {
	    return new Promise(executors[key]).catch(function (e) {
	        return null;
	    });
	});

	exports.default = Promise.all(promises).then(function (values) {
	    return (0, _array.object)(keys, values);
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Collector;

	var _strings = __webpack_require__(14);

	function Collector() {
	    this.buffer = [];
	    this.start_time = Date.now();
	    this.session_id = (0, _strings.uuid)();
	}

	Collector.prototype = {
	    get session_time() {
	        return Math.floor((Date.now() - this.start_time) / 1000);
	    },

	    collect: function collect(data) {
	        var item = {};

	        for (var i in data) {
	            if (data.hasOwnProperty(i)) {
	                item[i] = data[i];
	            }
	        }

	        item.session = this.session_time;
	        item.session_id = this.session_id;
	        item.metric_id = (0, _strings.uuid)();

	        this.buffer.push(item);

	        return item;
	    },
	    flush: function flush() {
	        var data = this.buffer;
	        this.buffer = [];
	        return data;
	    }
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.create = create;
	function create(object, excludeKeys) {
	    excludeKeys = excludeKeys || [];

	    object.toJSON = function () {
	        var _this = this;

	        var json = {};

	        Object.keys(this).filter(function (key) {
	            return excludeKeys.indexOf(key) === -1;
	        }).forEach(function (key) {
	            json[key] = _this[key];
	        });

	        return json;
	    };
	}

	exports.default = {
	    create: create
	};

/***/ }
/******/ ])
});
;