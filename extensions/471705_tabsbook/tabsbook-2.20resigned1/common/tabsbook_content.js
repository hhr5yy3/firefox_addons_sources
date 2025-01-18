// 
// Если страница размещается в iframe страницы newtab, то не грузятся content скрипты других расширений.
// По этому отправляем сообщения через плагин который подргузился с назначением основного плагина
//
// У нас есть два канала отправки сообщений от расширения в контент скрипт:
// Стандартый и Через long connection

window.addEventListener("message", function(e) {z_tabsbook_content.onMessageFromPage(e);});
var z_tabsbook_content = {
    port : false,
    params : {},
    tabsbookExtStatus : false,
    onMessageFromPage : function(event) {
        var name = browser.runtime.getManifest().name;
     
        // Пришло сообщение о необъходимости update
        // Это сообщение может прийти как в два плагина так и только в newtab
        if(event.data.type == "force_update_extension") {
            if(name == "Tabsbook Newtab") {
                // текущий плагин newtab и так же на странице есть основной плагин, который получит такое же сообщение
                if($("#z_tabsbook_extension_installed_content").length)
                    browser.runtime.requestUpdateCheck(function(status, details) {});
                else {
                    // Основного плагина нет, отправляем ему отдельное сообщение
                    $this.sendMessageToExt({type: "z_tabsbook_force_update_extension"}, function(res) {
                        // После обновления основного плагина, обновляем newtab (текущий)
                        browser.runtime.requestUpdateCheck(function(status, details) {});
                    });
                }
            } else {
                browser.runtime.requestUpdateCheck(function(status, details) {});
            }
            return;
        }
        
        // Если текущий плагин newtab и на странице так же есть стандартный плагин, то пропускаем все сообщения от страницы
        if(name == "Tabsbook Newtab" && $("#z_tabsbook_extension_installed_content").length)
            return;
        
        var $this = z_tabsbook_content;
        // We only accept messages from ourselves
        if (event.source != window)
            return;
        if (event.data.src && (event.data.src == "FROM_PAGE")) {
            if(event.data.callback_name == undefined)
                event.data.callback_name = false;
            if(event.data.data == undefined)
                event.data.data = {};
            var data = event.data.data;
            
            var send_data = {type: "ztabsbook_" + event.data.type};
            var el;
            for(el in data)
                send_data[el] = data[el];
            $this.sendMessageToExt(send_data, function(res) {

                // Если есть обратная связь
                // Дополняем пришедшие данные данными из расширения
                
                var data = {data: {}};
                
                if(res && res["data"]) {
                    for(el in res.data) {
                        data.data[el] = res.data[el];
                    }
                }                
                // There is an error in Firefox when we try to copy data in res directly
                for(el in event.data) {
                    if(el != "data") {
                        data[el] = event.data[el];
                    }
                }
                for(el in event.data["data"]) {
                    data.data[el] = event.data.data[el];
                }
                
                if(res) {
                    $this.sendMessage(res.type, data);
                }
            });
        }
    },
    sendMessageToExt : function(message, sender_callback) {
        if(!sender_callback)
            sender_callback = function(res) {};
        browser.runtime.sendMessage({type: "ztabsbook_ext_destination"}, function(destination) {
            if(destination)
                browser.runtime.sendMessage(destination, message, sender_callback);
            else
                browser.runtime.sendMessage(message, sender_callback);
        });
    },
    
    // Отправка данных на страницу
    // data = {type: "my_type", src: "FROM_CONTENT_SCRIPT", callback_name: false, data: {some_data}}
    sendMessage : function(type, data) {
        data.type = type;
        data.src = "FROM_CONTENT_SCRIPT";
        
        //alert("POST MESSAGE: " + JSON.stringify(data));
        //alert(window.document.title);
        //console.log("location: " + document.location.href + "\ntitle: " + document.title + "\nchrome obj" + chrome );
        window.postMessage(data, "*");
    },
    // Добавление INPUT с версией расширения
    // Если мы находимся в Tabsbook Newtab и Tabsbook существует, но не подгружен, то есть сейчас newtab
    // Добавляем на страницу наличие основного плагина Tabsbook
    addInstalledInput : function() {
        var data = JSON.stringify({version: browser.runtime.getManifest().version});
        var name = browser.runtime.getManifest().name;
        
        var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("id", "z_tabsbook_extension_installed");
        
        if(name == "Tabsbook" || name == "Tabsbook Yandex Browser" || name == "Tabsbook закладки и экспресс панель") {
            $("body").append(input);
            $("#z_tabsbook_extension_installed").val(data);
            
            // Дополнительно добавляем флаг, который будет сигнализировать о том, чтобы второй плагин не получал сообщений
            // от страницы
            
            var input2 = document.createElement("input");
            input2.setAttribute("type", "hidden");
            input2.setAttribute("id", "z_tabsbook_extension_installed_content");
            $("body").append(input2);
        }
        
        if(name == "Tabsbook Newtab") {
            $("body").append(input);
            $("#z_tabsbook_newtab_extension_installed").val(data);
           
            // Add extension installed by default, because message from extension can be late
            $("body").append("<input id=\"z_tabsbook_extension_installed\" type=hidden />");
            $("#z_tabsbook_extension_installed").val(JSON.stringify({version: "999.999"}));
           
            if(this.tabsbookExtStatus) {
                if(this.tabsbookExtStatus.is_installed) {
                    if(this.tabsbookExtStatus.version) {
                        $("#z_tabsbook_extension_installed").val(JSON.stringify({version: this.tabsbookExtStatus.version}));
                    } else { // when extension is installed but not enabled
                        $("#z_tabsbook_extension_installed").remove();
                    }
                } else {
                    $("#z_tabsbook_extension_installed").remove();
                }
            }
        }
        // Теперь не отправляем сообщение отсюда, а отпарвляем со страницы сайта
        //browser.runtime.sendMessage({type: "ztabsbook_add_domain", domain: document.location.host});
    },
    connectToExtension : function(tab_id) {
        //alert("tab: " + tab_id);
        browser.runtime.sendMessage({type: "ztabsbook_ext_destination"}, function(destination) {
            if(destination)
                this.port = browser.runtime.connect(destination, {name: "tabsbook_content_script__" + tab_id});
            else
                this.port = browser.runtime.connect({name: "tabsbook_content_script__" + tab_id});
            port.onMessage.addListener(function(message) {
                //alert("message from extension: " + tab_id + " CONTENT: " + message);
                //console.log("MESSAGE FROM PORT");
                //z_tabsbook_content.onMessageFromExtension(message);
            });
        });        
    },
    onMessageFromExtension : function(message) {
        var type = message.type.split("__");
        if(type[0] == "ztabsbook_to_page") {
            z_tabsbook_content.sendMessage(type[1], message);
        }
    },
    getTabsbookExtStatus : function() {
        var $this = this;
        browser.runtime.sendMessage({type: "ztabsbook_get_tabsbook_ext_status"}, function(res) {
            //console.log("message");
            //console.log(res);
            $this.tabsbookExtStatus = res;
            if(!$this.tabsbookExtStatus.version) {
                $("#z_tabsbook_extension_installed").remove();
            } else {
                $("#z_tabsbook_extension_installed").val(JSON.stringify({version: $this.tabsbookExtStatus.version}));
            }
        });
    }
};

z_tabsbook_content.getTabsbookExtStatus();

/**
* Use DOMContenLoaded because ready function is called after ready function on page
* 
*/
document.addEventListener('DOMContentLoaded', function() {
    z_tabsbook_content.addInstalledInput();
}, false);

/*$(document).ready(function() {
    z_tabsbook_content.addInstalledInput();
});*/

z_tabsbook_content.sendMessageToExt({type: "ztabsbook_register_tab_for_messages"}, function(tab_id) {
    //z_tabsbook_content.connectToExtension(tab_id);
});

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    //console.log("MESSAGE FROM EXT");
    //console.log(message);
    z_tabsbook_content.onMessageFromExtension(message);
});