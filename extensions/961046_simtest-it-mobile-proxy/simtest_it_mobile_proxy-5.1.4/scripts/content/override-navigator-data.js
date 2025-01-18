(function(){


    /**
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener(request => {
        var message = JSON.parse(request)
        if (message.command === "content-changeUaLang") {
            overrideNavigatorData(message.navigatorDataSet)
        }
    });

    function overrideNavigatorData(navigatorDataSetIn) {
        // Override navigator properties of the current frame
        var data = JSON.stringify(navigatorDataSetIn);

        var actualCode = '(' + function (navigatorDataSet) {
            'use strict';
            var navigator = window.navigator;
            var modifiedNavigator;
            if ('userAgent' in Navigator.prototype) {
                // Chrome 43+ moved all properties from navigator to the prototype,
                // so we have to modify the prototype instead of navigator.
                modifiedNavigator = Navigator.prototype;

            } else {
                // Chrome 42- defined the property on navigator.
                modifiedNavigator = Object.create(navigator);
                Object.defineProperty(window, 'navigator', {
                    value: modifiedNavigator,
                    configurable: false,
                    enumerable: false,
                    writable: false
                });
            }

            if (navigatorDataSet.userAgent != "") {

                Object.defineProperty(modifiedNavigator, 'userAgent', {
                        value: navigatorDataSet.userAgent,
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }
                );
            }
            if (navigatorDataSet.language != ""){

                Object.defineProperty(modifiedNavigator, 'language', {
                        value: navigatorDataSet.language,
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }
                );
            }
            if (navigatorDataSet.languages && navigatorDataSet.languages.length > 0){

                Object.defineProperty(modifiedNavigator, 'languages', {
                        value: navigatorDataSet.languages,
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }
                );
            }

        } + ')('+data+');';

        var s = document.createElement('script');
        s.textContent = actualCode;
        document.documentElement.appendChild(s);
        s.remove();

    }
})()