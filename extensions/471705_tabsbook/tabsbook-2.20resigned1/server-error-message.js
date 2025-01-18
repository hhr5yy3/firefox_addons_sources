/*
* Make request to check_connection.php by AJAX
* If connection fails show error message
* Error message contains iframe with link to tabsbook.de which checks connection through german servers and displays
* error details.
* 
*/
z_connection_error = {
    deny : false, // When site is loaded it set this flag to true throw message in newtab.js and in popup.js through removeErrorMessage

    checkConnection: function() {
        var _this = this;

        this.request('https://www.tabsbook.ru/___ajax___/check_connection.php?' + new Date().getTime(), function(a) {}, function(xhr) {
            // By request we get error-message.html content add add it to body
            setTimeout(function() { // TO prevent appearing bad connection when another site is entered or tabsbook is disabled and default page is shown
                /**
                * In firefox embed HTML as string is forbidden
                * add hidden error message html in popup.html and newtab.html
                */
                document.getElementById("b-error-message").style.display = "block";
                var params = "?src=ff-ext";
                var error_frame = document.getElementById("z_connection_frame");
                error_frame.setAttribute("src", error_frame.getAttribute("zsrc") + params + "&" + new Date().getTime());
                /*return;
            
                _this.request(browser.extension.getURL('error-message.html'), function(message) {
                    if(_this.deny) {
                        return;
                    }
                    // Check for double call
                    if(document.getElementById("z_connection_frame")) {
                        return;
                    }
                    var div = document.createElement('div');
                    div.setAttribute("id", "b-error-message"); // set id to delete message from express panel if it is loaded
                    div.innerHTML = message;
                    document.body.appendChild(div);
                    var error_frame = document.getElementById("z_connection_frame");
                    
                    if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent) || /OPR\/(\d+\.\d+)/.test(navigator.userAgent))
                        var params = "?src=opera-ext";
                    else
                        var params = "?src=chrome-ext";
                    
                    error_frame.setAttribute("src", error_frame.getAttribute("zsrc") + params + "&" + new Date().getTime());
                });*/
            }, 400);
            
        });
    },

    // Called from popup.js in newtab.js code just repeated
    removeErrorMessage: function() {
        this.deny = true;
        $("#b-error-message").remove();
    },

    request: function (url, callback, errorCallback) {
        var xhr = new XMLHttpRequest();
        try {
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4)
                    return;

                if (xhr.status != 200 && xhr.status != 304) {
                    errorCallback(xhr);
                    errorCallback = null; // set null to prevent double start on xhr onerror
                    return;
                }

                if (xhr.responseText) {
                    callback(xhr.responseText);
                }
            }

            xhr.onerror = function(error) {
                if (errorCallback) errorCallback(error);
            };

            xhr.open("GET", url, true);
            xhr.timeout = 5000;
            xhr.send(null);
        } catch(e) {
            errorCallback(xhr);
            console.error(e);
        }
    }
};

z_connection_error.checkConnection();


