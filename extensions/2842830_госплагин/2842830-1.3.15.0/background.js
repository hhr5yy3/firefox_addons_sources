﻿import { meta } from "/includes/meta.js"

import '/includes/error_handler.js'
import "/includes/base64.js"

let background = (function () {
    const _ID = "gosuslugi.plugin.extension.background";
    const _EOF = "-1";
    
    const _HANDSHAKE_MESSAGE  = { "id": _ID, "node": "", "error": "", "mode": "", "module": { "type": "system", "version": "0.0.0.0" }, "method": { "type": "handshake",  "data": "handshake", "result": "" }, "meta": { "format": { "type": "message", "version": "0.0.0.0", "category": "plugin" }, "content": { "type": "application/json", "charset": "utf8", "transferEncoding": "" }, "routes": [], "userAgent": "", "chunk": "", "chunks": "" } };
    const _CONFIG_MESSAGE     = { "id": _ID, "node": "", "error": "", "mode": "", "module": { "type": "system", "version": "0.0.0.0" }, "method": { "type": "config",     "data": "",          "result": "" }, "meta": { "format": { "type": "message", "version": "0.0.0.0", "category": "plugin" }, "content": { "type": "application/json", "charset": "utf8", "transferEncoding": "" }, "routes": [], "userAgent": "", "chunk": "", "chunks": "" } };
    const _STYLE_MESSAGE      = { "id": _ID, "node": "", "error": "", "mode": "", "module": { "type": "system", "version": "0.0.0.0" }, "method": { "type": "style",      "data": "",          "result": "" }, "meta": { "format": { "type": "message", "version": "0.0.0.0", "category": "plugin" }, "content": { "type": "application/json", "charset": "utf8", "transferEncoding": "" }, "routes": [], "userAgent": "", "chunk": "", "chunks": "" } };

    const _OS = function () {
        let userAgent = navigator.userAgent.toLowerCase(),
            macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
            windowsPlatforms = /(win32|win64|windows|wince)/i,
            iosPlatforms = /(iphone|ipad|ipod)/i;

        if (macosPlatforms.test(userAgent)) return "macos";
        if (iosPlatforms.test(userAgent)) return "ios";
        if (windowsPlatforms.test(userAgent)) return "windows";
        if (/android/.test(userAgent)) return "android";

        return "linux";
    }();

    const _BROWSER = function () {
        let result = "undefined";

        let userAgent = navigator.userAgent.toLowerCase();
		
        if (userAgent.includes('safari') && userAgent.includes('mac') && !userAgent.includes('chrome')) {
            result = "safari";
        }
        else if (userAgent.includes('chrome') || userAgent.includes('edge')) {
            result = "chrome";
        }
		else if (userAgent.includes('yabrowser')) {
            result = "opera";
        }
        else if (userAgent.includes('mozilla')) {
            result = "mozilla";
        }

        return result;
    }();

    const _META = JSON.parse(meta);

    const _LINK = _META.find(item => 
      item.format.type === _OS && item.format.category === "link"
    )?.data;

    const _CHUNK_SUPPORT_MINIMUM_EXTENSION_VERSION = _META.find(item => 
      item.format.type === "chunk" && item.format.category === "version"
    )?.data;

    const _MAX_CHUNKS_COUNT_FOR_DISCONNECT = +_META.find(item => 
      item.format.type === "chunkCountForDisconnect" && item.format.category === "alarm"
    )?.data;

    const _CHROME_MINIMUM_NOTIFICATION_PROMISE_VERSION = +_META.find(item => 
      item.format.type === "chromeMinimumNotificationPromise" && item.format.category === "version"
    )?.data;
    
    const _ALARM_MINUTES = +_META.find(item => 
      item.format.type === "minutes" && item.format.category === "alarm"
    )?.data;

    const _PROTOCOL_USER_STATE = 1000;

    const _PROTOCOL_STATES = Object.freeze({
        CONNECTING:                           0,
        OPEN:                                 1,
        CLOSING:                              2,
        CLOSED:                               3,

        UNINITIALIZED: _PROTOCOL_USER_STATE + 1,
        LOST:          _PROTOCOL_USER_STATE + 2
    });

    let alarmMinutes = _ALARM_MINUTES;

    let ignoredIds = new Set();

    let chunksCounter = "0";

    let _handle = null;

    let _state = _PROTOCOL_STATES.UNINITIALIZED;

    let _chunks = {};
    let _messages = {};

    let _base64_transform_if = function( message, encode = true ) {
        try
        {
            const transferEncoding = message.meta.content.transferEncoding;
            const operationPrefix = encode ? "encode to" : "decode from";

            if (transferEncoding) {
                if (transferEncoding == "base64") {
                    const messageData = message.mode == "debug" ? JSON.stringify(message) : message.id;
                    const operationMessage = _ID + " " + operationPrefix + " : " + messageData;

                    console.info(operationMessage);

                    if( encode ) message.method.data   = Base64.encode(message.method.data  );
                    else         message.method.result = Base64.decode(message.method.result);
                }
            }
        }
        catch (e) {
            message.error = _ID + ":\ncontent transfer encoding failed, reason:\n" + e.result;
        }
    };

    let _protocol_state_to_string = function (state) {
        const STATES = {
            [_PROTOCOL_STATES.CONNECTING]:    'CONNECTING',
            [_PROTOCOL_STATES.OPEN]:          'OPEN',
            [_PROTOCOL_STATES.CLOSING]:       'CLOSING',
            [_PROTOCOL_STATES.CLOSED]:        'CLOSED',
            [_PROTOCOL_STATES.UNINITIALIZED]: 'UNINITIALIZED',
            [_PROTOCOL_STATES.LOST]:          'LOST',
        };
        return STATES[state] || String(state);
    };

    let _protocol_switch_state = function (protocol, prev, current) {
        if( prev != current ) {
            console.info(protocol + " switch state" + 
                " from: " + _protocol_state_to_string(prev) + 
                " to: "   + _protocol_state_to_string(current));

            /*
                todo: 
                    оставлено для отладки
            */
            /*
            switch (current) {
                case _PROTOCOL_STATES.OPEN: 
                    _notify('info', `${_protocol.format().type} соединение установлено`);
                    break;
                case _PROTOCOL_STATES.LOST: 
                    if (prev == _PROTOCOL_STATES.OPEN) _notify('info', `${_protocol.format().type} соединение прервано`);
                    else if (prev != _PROTOCOL_STATES.UNINITIALIZED) _notify('error', `ошибка установки ${_protocol.format().type} соединения`);
                    break;
                case _PROTOCOL_STATES.UNINITIALIZED: 
                    if (prev == _PROTOCOL_STATES.CONNECTING) _notify('error', `ошибка установки ${_protocol.format().type} соединения`);                    else                               
                    break;
                default:;
            };
            */

            prev = current;
        }

        return prev;
    };

    let _join = function(message){

              if( !message.meta.hasOwnProperty( "chunks" ) || message.meta.chunks == "" || message.meta.chunks == "1" ) {
                 if (message.mode == "debug") console.info(_ID + " join missed, id: " + message.id + ", chunks: " + message.meta.chunks);
                 return message;
              }

              if( !_chunks.hasOwnProperty( message.id ) ) {
                 _chunks[ message.id  ] = [];
              }

             _chunks[message.id].push(message.method.result);

             if (_chunks[message.id].length === parseInt(message.meta.chunks, 10)) {

                  let chunks = message.meta.chunks;
                  let result = _chunks[message.id].join("");

                  delete _chunks[message.id];

                  message.meta.chunk = "";
                  message.meta.chunks = "";
                  message.method.result = result;

                  if (message.mode == "debug") console.info(_ID + " join finished, id: " + message.id + ", chunks: " + chunks);

                  return message;
             }

             if (message.mode == "debug") console.info(_ID + " join pushed, id: " + message.id + ", chunk: " + message.meta.chunk + ", chunks: " + message.meta.chunks);

             return null;
        };

    let nmh = (function () {
        const _ID = "trust.plugin.extension.nmh";

        const _HOST = "firefox.gosuslugi.plugin";
        const _OBSOLETE_HOST = "gosuslugi.plugin";
        const _CONFLICT_HOST = "firefox.trust.plugin";
        const _OBSOLETE_CONFLICT_HOST = "trust.plugin";

        const _MAXIMUM_MESSAGE_SIZE = 1024 * 1024;
        const _MAXIMUM_MESSAGE_SIZE_HINT = _MAXIMUM_MESSAGE_SIZE - 10 * 1024;

        let _host = _HOST;

        let _code_to_protocol_state = function (code) {
            switch (code) {
                case error_handler.CODES.PROTOCOL_NATIVE_HOST_LOST:      return _PROTOCOL_STATES.LOST;
                case error_handler.CODES.PROTOCOL_NATIVE_HOST_NOT_FOUND: return _PROTOCOL_STATES.UNINITIALIZED;
                default:                                                 return _PROTOCOL_STATES.CLOSED;
            };
        };

        let _connected = function () {
            return !!_handle;
        };

        let _connect = function () {
            if (_connected()) {
                // nothing to do
            }
            else {
                console.info(_ID + " try connect to " + _host);

                _state = _protocol_switch_state(_ID, _state, _PROTOCOL_STATES.CONNECTING);
                _handle = browser.runtime.connectNative(_host);
                _messages = {};
                
                if (_connected()) {
                    _handle.onMessage.addListener(function (message) {

                        _state = _protocol_switch_state(_ID, _state, _PROTOCOL_STATES.OPEN);
                        delete _messages[message.id];

                        if (message.mode == "debug") console.info(_ID + " responce: " + JSON.stringify(message));
                        else console.info(_ID + " responce id: " + message.id);

                        let result = _join(message);

                        if (!!result) {
                            _base64_transform_if(result, false);
                            background.responce(result);
                        }
                    });
                    _handle.onDisconnect.addListener(function () {
                        _disconnect();
                    });
                };
            }
        };

        let _disconnect = function () {    
            if (_connected()) {

                const lastError = 
                       browser.runtime.lastError?.message
                    || browser.runtime.lastError;

                const code = error_handler.text_to_code(lastError);

                console.info(_ID + " nmh connection interrupted" + (lastError ? ", reason: " + lastError : ""));
                _state = _protocol_switch_state(_ID, _state, _code_to_protocol_state(code));

                Object.entries(_messages).forEach(([_, message]) => {
                    error_handler.set_message_error(message,code);
                    _responce(message);
                });

                _handle.disconnect();
                _handle = null;

                _messages = {};
                _chunks = {};
            }
            else {
                console.info(_ID + " allready disconnected");
            }
          };

        let _post = function (message) {
            if (_connected()) {
                if (message.mode == "debug") console.info(_ID + " send: " + JSON.stringify(message));
                else console.info(_ID + " send id: " + message.id);

                _handle.postMessage(message);
                message.method.data = null;
                _messages[message.id] = message;
            }
            else {
                throw "<b>connection error</b>";
            }
        };

        return {
            name: function() {
                return _ID;
            },

            format: function() {
                return { "category": "protocol", "type": "nmh", "description": _HOST, "version": ""};
            },

            connect: function() {
                return _connect();
            },

            connected: function() {
                return _connected();
            },

            init: function () {
                browser.runtime.sendNativeMessage(_host, _HANDSHAKE_MESSAGE, function (responce) {
                    if (browser.runtime.lastError) {
                        browser.runtime.sendNativeMessage(_OBSOLETE_HOST, _HANDSHAKE_MESSAGE, function (responce) {
                            if (browser.runtime.lastError) {
                                _actualize("install");
                            }
                            else {
                                _host = _OBSOLETE_HOST;
                                _actualize("load");
                            }
                        });
                    }
                    else {
                        _actualize("load");
                    }
                });                 
            },

            post: function (message) {
                try {
                    let meta = message.meta;
                    let type = message.method.type;
                    let firstChunk = !meta || ['1', '', undefined].includes(meta.chunk);
                    let skip = (!firstChunk && !_connected()) || ("disconnect" == type);

                    if( skip ) {
                        message.method.data = null;
                        _messages[message.id] = message;

                        _disconnect();                        
                    }
                    else {
                        _connect();
                        
                        if ("connect" == type) {
                            // nothing to do
                        }
                        else {
                            _post(message);
                        }
                    }
                }
                catch (e) {
                    console.warn(_ID + " " + e.message);
                }
            },
            disconnect: function () {
                _disconnect();
            }
        };
    })();
    
    let ws = ( function() {
          const _ID = "gosuslugi.plugin.extension.ws";

          let _url = _META.find(item => 
            item.format.type === "ws" && item.format.category === "protocol"
          )?.data;

          let _actualized = false;

          let _websocket_to_protocol_state = function (state) {
                const STATES = {
                    [WebSocket.CONNECTING]: _PROTOCOL_STATES.CONNECTING,
                    [WebSocket.OPEN]:       _PROTOCOL_STATES.OPEN,
                    [WebSocket.CLOSING]:    _PROTOCOL_STATES.CLOSING,
                    [WebSocket.CLOSED]:     _PROTOCOL_STATES.CLOSED,
                };
                return STATES[state] ?? _PROTOCOL_STATES.UNINITIALIZED;
          };
 
          let _connected = function() {
               let result =  !!_handle;

               if( result ) {
                    result = _handle.readyState === WebSocket.OPEN || 
                             _handle.readyState === WebSocket.CONNECTING;
               }

               return result;
          };

          let _connect = function() {
               if( _connected() ) {
                    // nothing to do
               }
               else {
                    console.info(_ID + " try connect to " + "_host" + ", " + _url );

                    _state = _protocol_switch_state(_ID, _state, _PROTOCOL_STATES.CONNECTING);
                    _handle = new WebSocket( _url );

                    _handle.onopen = function() {
                        if (!_actualized) {
                            _actualized = true;
                            _actualize("load");
                        };

                         _state = _protocol_switch_state(_ID, _state, _websocket_to_protocol_state(_handle.readyState));

                        Object.entries(_messages).forEach(([_, message]) => {
                            _handle.send( JSON.stringify(message) );
                        });

                        _messages = {};
                    };

                    _handle.onmessage = function( event ) {
                         
                          let message = JSON.parse( event.data );

                          if (message.mode == "debug") console.info(_ID + " responce: " + JSON.stringify(message));
                          else                         console.info(_ID + " responce id: " + message.id);

                          _base64_transform_if(message, false);
                          background.responce( message );
                    };

                    _handle.onclose = function( event ) {
                        console.log(_ID + ` connection closed: wasClean=${event.wasClean} code=${event.code} reason=${event.reason}`);

                        _state = _protocol_switch_state(_ID, _state, _PROTOCOL_STATES.LOST);

                        _disconnect();
                    };

                    _handle.onerror = function( error ) {
                         if( _connected() ) {
                            console.warn( _ID + " error: " + error.message );
                        }
                        else {
                            if (!_actualized) {
                                _actualized = true;
                                _actualize("install");
                            };

                            Object.entries(_messages).forEach(([_, message]) => {
                                error_handler.set_message_error(message, error_handler.CODES.PROTOCOL_WEB_SOCKET_NOT_FOUND);
                                _responce(message);
                            });

                            _messages = {};

                            _state = _protocol_switch_state(_ID, _state, _PROTOCOL_STATES.UNINITIALIZED);
                        }
                    };
               }
          };

          let _disconnect = function () {
               if (_connected()) {
                    console.info(_ID + " disconnect");

                    _handle.send(_EOF);
                    _handle.close();
                    _handle = null;

                    _state = _protocol_switch_state(_ID, _state, _PROTOCOL_STATES.UNINITIALIZED);

                    _chunks = {};
               }
               else {
                    console.info(_ID + " allready disconnect");
               }           
            if (browser.runtime.lastError) {
                const message = browser.runtime.lastError.message || browser.runtime.lastError;
                console.warn(message);
            }
          };

          let _post = function( message ) {
               if (_connected()) {  
                    if( _handle.readyState === WebSocket.OPEN ){
                         if (message.mode == "debug") console.info(_ID + " send: " + JSON.stringify(message));
                         else                         console.info(_ID + " send id: " + message.id);

                         _handle.send( JSON.stringify(message) );

                    } else {
                          if (message.mode == "debug") console.info(_ID + " queueing : " + JSON.stringify(message));
                          else                         console.info(_ID + " queueing id: " + message.id);

                         _messages[message.id] = message;                 
                    }
               }
               else {
                    throw ( _ID + " connection error" );
               } 
          };

          return  {
                name: function() {
                    return _ID;
                },

                format: function() {
                    return { "category": "protocol", "type": "ws", "description": _url, "version": ""};
                },

                connect: function() {
                    return _connect();
                },

                connected: function() {
                    return _connected();
                },

                disconnect: function() {
                    return _disconnect();
                },

                init: function() {
                    browser.alarms.create(_ID, { periodInMinutes: alarmMinutes });
                    browser.alarms.onAlarm.addListener(function (alarm) {
                        // empty call, just for keeping extension active
                    }); 

                    _connect();
                },

                post: function(message) {
                    return _post(message);
                }
          };
     })();   

     let _protocol = (() => {
        let result = _OS === "macos" ? "ws" : "nmh";

        const trueValues = new Set([true, "1", "true", "TRUE"]);
        const protocols = _META.filter(item => item.format.category === "protocol");

        result = (1 === protocols.length)
            ? protocols[0].format.type
            : protocols.find(item => trueValues.has(item.default))?.format.type || result;

        console.info(`${_ID} set active protocol: ${result}`);

        return result === "ws" ? ws : nmh;
    })();

    let _extensionVersion = "";
    let _programVersion = "";

    let _minSupportedVersion = "";

    let _ban = false;
    let _chunkUnsupportedVersion = false;

    let _cloneMessage = function (message) {
        return JSON.parse(JSON.stringify(message));       
    }

    let _compareVersions = function (lhs, rhs) {
        if (lhs === rhs) {
            return 0;
        }
        const lhsNumbers = lhs.split(".").map(Number);
        const rhsNumbers = rhs.split(".").map(Number);
        const lhsNumbersLength = lhsNumbers.length;
        const rhsNumbersLength = rhsNumbers.length;
        const minLength = Math.min(lhsNumbersLength, rhsNumbersLength);
        for (let i = 0; i < minLength; i++) {
            if (lhsNumbers[i] !== rhsNumbers[i]) {
                return lhsNumbers[i] > rhsNumbers[i] ? 1 : -1;
            }
        }
        return lhsNumbersLength - rhsNumbersLength;
    };

    let _obsoleteVersion = function () {
        return _programVersion.length && _extensionVersion.length && (_programVersion != _extensionVersion);
    };

    let _unsupportedVersion = function () {
        return _obsoleteVersion() && (_compareVersions(_programVersion, _minSupportedVersion) < 0);
    };

    let _chromePromiseVersion = function () {
        const userAgent = navigator.userAgent.toLowerCase();
        const chromeField = "chrome/";
        const chromePosition = userAgent.indexOf(chromeField) + chromeField.length;
        const maxVersionPosition = userAgent.indexOf(".", chromePosition);
        return Number(userAgent.substring(chromePosition, maxVersionPosition)) >= _CHROME_MINIMUM_NOTIFICATION_PROMISE_VERSION;
    };

    let _request = function (message) {

        const { id, module, method, meta } = message;
        const mandatory = method.type == "config";
        const type = method?.type;
        const chunk = meta?.chunk;
        const chunks = meta?.chunks;
        if( chunks != -1 ) {
             chunksCounter = Number(chunksCounter) + Number(chunks);
        }
        const first = ['1', ''].includes(chunk);
        
        if( first ) {
            _ban = Boolean(_unsupportedVersion());
            _chunkUnsupportedVersion = !!_programVersion.length && _compareVersions(_programVersion, _CHUNK_SUPPORT_MINIMUM_EXTENSION_VERSION) < 0;
            ignoredIds.delete( id );

        } else if( ignoredIds.has( id ) ) {
            return;
        }

        const unsupportedChunks = _chunkUnsupportedVersion && type?.startsWith('signature') && !['1', ''].includes(chunks);

        if( unsupportedChunks ) {
            ignoredIds.add( id );            
        }

        if (_ban && !mandatory) {

            console.warn(_ID + " cancelled message id: " + id +
                ", ban: " + _ban +
                ", mandatory: " + mandatory +
                ", programVersion: " + _programVersion +
                ", extensionVersion: " + _extensionVersion +
                ", minSupportedVersion: " + _minSupportedVersion);

            error_handler.set_message_error(message, null, "Работа Госплагина невозможна. Обновите версию приложения");

            _responce(message);
            _notify('unsupportedVersion');
        }
        else if( !!unsupportedChunks ) {
            console.warn(_ID + " cancelled message id: " + id +
                ", programVersion: " + _programVersion +
                ", minChunkSupportedVersion: " + _CHUNK_SUPPORT_MINIMUM_EXTENSION_VERSION);

            error_handler.set_message_error(message, null, "Данный режим подписи недоступен. Обновите версию приложения");

            _responce(message);
            _notify('unsupportedChunks');
        }
        else {
            if (message.mode == "debug") console.info(_ID + " send to host message: " + JSON.stringify(message));
            else console.info(_ID + " send to host message id: " + id);

            _notify('beginSend', message);
            _notify('beginSign', message);

            _post(message);
        }
    };

    let _responce = function (message) {

        const id = message.id;

        if( ignoredIds.has( id ) ) {
            return;
        }

        if( message.error != "" ) {
            ignoredIds.add( id );
        }

        const methodType = message.method.type;

        if (methodType == "config") {
            if (message.error && message.error.length) {
                // nothing to do
            }
            else {
                let result = JSON.parse(message.method.result);

                result.some(function (each) {
                    if (each.type == "core") {

                        _programVersion = each.format.version;

                        console.info(_ID + " actualized program info, programVersion: " + _programVersion);

                        if (_unsupportedVersion()) _notify('unsupportedVersion');
                        else if (_obsoleteVersion()) _notify('upgrade');

                        return true;
                    }
                    return false;
                });
            }
        } else if (methodType == "style") {
            if (message.error && message.error.length) {
                // nothing to do
            }
            else {
                let result = JSON.parse(message.method.result);
                let stylesheet = result.content;

                if (result.contentEncoding == "base64") {
                    stylesheet = Base64.decode(stylesheet);
                }

                browser.storage.local.set({ style: stylesheet });

                console.info(_ID + " actualized program stylesheet: " + stylesheet);
            }
        } else if (methodType.startsWith( "signature" ) ) {
            if( chunksCounter > _MAX_CHUNKS_COUNT_FOR_DISCONNECT ) {
                chunksCounter=0;

                if( _protocol == nmh ) {
                    _protocol.disconnect();
                }
            }            
        }
        
        if (message.node == "") {
            if (message.mode == "debug") console.info(_ID + " send to popup message: " + JSON.stringify(message));
            else console.info(_ID + " send to popup message id: " + id);
            browser.runtime.sendMessage(message, (result) => { if (browser.runtime.lastError) { } });
        } else {
            if (message.mode == "debug") console.info(_ID + " send to tab message, tab id: " + message.node + ", message: " + JSON.stringify(message));
            else console.info(_ID + " send to tab message, tab id: " + message.node + ", message id: " + id);

            _notify('endSign', message);

            try {
                browser.tabs.sendMessage(+message.node, message);
            } catch (error) {
                error_handler.parse_message_error(message, error);
                browser.tabs.sendMessage(+message.node, message);
            }
        }
    };

    let _notify = function (reason, message) {

        /*
            избегаем флуда сообщений
              возможно будут сценарии когда необходимо добавить reason = "reset" для очистки _notify[] и
              уведомлять пользователя о необходимости обновить веб-страницу
        */
        if (typeof _notify[reason] === 'undefined' || !!message) {
            _notify[reason] = reason;

            const { method, meta } = message || {};
            const type = method?.type;
            const chunk = meta?.chunk;
            const chunks = meta?.chunks;

            const signatureReasons = ['beginSend', 'beginSign', 'endSign'].includes(reason);
            const signatureMethod = type?.startsWith('signature')
                && ['1', '', chunks].includes(chunk);

            /*
                избегаем флуда сообщений при подписании чанками
            */
            if (!signatureMethod && signatureReasons) {
                return;
            }

            let options = {
                type: 'basic',
                iconUrl: 'img/logo/logo_64x64.png',
                title: 'Госплагин',
                message: "",
                priority: 2,
                requireInteraction: true,
            };

            switch (reason) {
                case 'beginSend':
                case 'beginSign':
                case 'endSign':                    
                    const first = ( chunk == '1' ) || ( chunk == '' ); 
                    const last = chunk == chunks;
                    const send = !!message.method.data;

                    const beginSend =  send && first;
                    const beginSign =  send && last;
                    const endSign   = !send && last;

                    options.requireInteraction = false;

                    if      ( beginSend && ( 'beginSend' == reason ) ) options.message = "Передача данных";
                    else if ( beginSign && ( 'beginSign' == reason ) ) options.message = "Начат процесс подписания файла";
                    else if ( endSign   && ( 'endSign'   == reason ) ) {
                         if ( !!message.method.result ) { options.message = "Процесс подписания файла завершен";     }
                         else                           { options.message = message.error; options.title = "Ошибка"; }                    
                    };                    
                    break;
                case 'upgrade':
                    options.message = "Ваша версия Госплагин устарела. Рекомендуется установить новую версию приложения";
                    options.buttons = [{ title: "Скачать обновление" }];
                    break;
                case 'install':
                    options.message = "Для полноценной работы Госплагин необходима установка приложения";
                    options.buttons = [{ title: "Скачать приложение" }];
                    break;
                case 'conflict':
                    options.message = "Работа расширения невозможна. Используется несовместимый узел";
                    break;
                case 'unsupportedVersion':
                    options.message = "Работа Госплагин невозможна. Обновите версию приложения";
                    options.buttons = [{ title: "Скачать обновление" }];
                    break;
                case 'unsupportedChunks':
                    options.message = "Данный режим подписи недоступен. Обновите версию приложения";
                    options.buttons = [{ title: "Скачать обновление" }];
                    break;
                case 'error':
                    console.warn(`${_ID} ${message}`);
                    options.message = message;
                    options.title = "Ошибка";
                    break;
                case 'info':
                    console.info(`${_ID} ${message}`);
                    options.message = message;
                    options.title = "Cообщение";
                    break;

                case 'update':
                    /*
                         игнорируем, тк
                              формируется не только при обновлении расширения, 
                              но также при включении / отключении
                         обновление проверяем через upgrade 
                              при получении версии из нативного приложения
                    */
                    break;
                default:;
            };

            /*
                browser.notifications не поддержан в safari         
            */
            if ("safari" == _BROWSER) {
                return;
            }
            
            /*
                 ограничения по браузерам касающиеся набора полей для options
                 https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications/NotificationOptions
            */
            if ('mozilla' == _BROWSER) {
                if ('upgrade' == reason) {
                    options.message = "Ваша версия Госплагин устарела.\nНажмите на окно, чтобы скачать новую версию приложения";
                }
                if ('install' == reason) {
                    options.message = "Для работы Госплагин необходима установка приложения.\nНажмите на окно, чтобы скачать приложение";
                }
                else if ('unsupportedVersion' == reason) {
                    options.message = options.message + ".\nНажмите на окно, чтобы скачать обновление";
                }
                else if ('unsupportedChunks' == reason) {
                    options.message = options.message + ".\nНажмите на окно, чтобы скачать обновление";
                }

                delete options['buttons'];
                delete options['requireInteraction'];
            }

            if ("linux" == _OS) {
                delete options['priority'];
                delete options['requireInteraction'];
            }

            (async () => {
                if (options.message) {
                    const notificationId = await new Promise((resolve) => {
                        browser.storage.local.get(['notificationId'], (result) => {
                            resolve(result.notificationId || null);
                        });
                    });

                    if (notificationId) {
                        await new Promise((resolve) => {
                            browser.notifications.clear(notificationId, resolve);
                        });
                    }

                    const callback = notificationId => {
                        browser.notifications.onButtonClicked.addListener((id) => {
                            if (id === notificationId) {
                                const unsupported = ('mozilla' === _BROWSER) && ('conflict' === reason);
                                const ignore = !!message;

                                if (!unsupported && !ignore) {
                                    browser.tabs.create({ url: _LINK });
                                }
                            }
                        });

                        browser.storage.local.set({ notificationId: notificationId });
                    };

                    const usePromise = ('chrome' !== _BROWSER || _chromePromiseVersion());
                    const notificationOptions = usePromise ? [options] : ["", options];

                    browser.notifications.create(...notificationOptions).then?.(callback) || callback();
                }
            })();
        }
    };

    let _actualize = function (reason) {

        _extensionVersion = _META.find(item => 
          item.format.type === "release" && item.format.category === "version"
        )?.data;
        _minSupportedVersion = _META.find(item => 
          item.format.type === "min" && item.format.category === "version"
        )?.data;

        console.info(_ID + " actualized extension info, reason: " + reason + ", release version: " + _extensionVersion + ", min version: " + _minSupportedVersion);

        _notify(reason);

        const updateData = {"link": _LINK, "release": _extensionVersion, "min": _minSupportedVersion };
        browser.storage.local.set({ install: { reason: reason, update: JSON.stringify(updateData) } });

        _post(_CONFIG_MESSAGE);
    };

    let _post = function(message) {
        try {
             let type = message.method.type;
             let protocol = _protocol.format();

            (message.meta ??= {}).protocol ??= {};
             message.meta.protocol = protocol; 

             if ("disconnect" == type) {
                _protocol.disconnect();
             }
             else if("protocol" == type) {
                message.method.result = JSON.stringify({ type: protocol.type, host: protocol.description, state: _protocol_state_to_string(_state) });
                _responce(message);                       
             } else {
                _protocol.connect();

                if ("connect" == type) {
                   // nothing to do
                } else {
                    _base64_transform_if(message, true);

                    if (message.mode == "debug") console.info(_ID + " send: " + JSON.stringify(message));
                    else console.info(_ID + " send id: " + message.id);

                    _protocol.post(message);
                }
            } 
        }
        catch( e ) {
            _notify('error', e.message ? e.message : e );

            error_handler.parse_message_error(message, e);

            _responce(message);
        }
    };

    let _init = function () {

        browser.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                let message = request;
                if (sender.tab) {
                    message.node = sender.tab.id.toString();
                } else {
                    message.node = "";
                }
                _request(message);
                sendResponse(null);
               }
        );

        browser.runtime.onInstalled.addListener(
            function (details) {
                try {
                    if ('install' != details.reason) {
                        _actualize(details.reason);
                    }
                    return true;
                }
                catch (e) {
                    console.warn(_ID + " " + e.message);
                }
            }
        );

        _protocol.init();
    };

    _init();

    return {
        request: function (message) {
            _request(message);
        },

        responce: function (message) {
            _responce(message);
        }
    }
})();