(function () {
    var component = {};

    component.namespace = 'postila';

    component.domHTML = null;
    component.iterationCount = 0;
    component.iteration = 0;

    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.preparePageForScreenshot) {
            //document.documentElement.classList.add('postila_screenshot__page');

            component.domHTML = document.documentElement;
            component.iterationCount = 0;
            component.iteration = 0;

            component.pageHeight = component.domHTML.scrollHeight;
            component.pageWidth = window.innerWidth;
            component.screenHeight = window.innerHeight;
            component.scrollPosition = window.pageYOffset;

            /*component.iterationCount = Math.ceil(component.pageHeight / component.screenHeight);

            //setTimeout(function () {
                window.scrollTo(0, 0);
                component.domHTML.style.transform = 'translateY(0)';
            //}, 10);
            */

            sendResponse({
                width: component.pageWidth,
                height: component.pageHeight,
                screenHeight: component.screenHeight,
                scrollPosition: component.scrollPosition
            });
        }

        /*if (msg.prepareNextPageArea) {
            //component.domHTML.style.transform = 'translateY(-' + component.iteration * component.screenHeight + 'px)';
            window.scrollTo(0, component.iteration * component.screenHeight);

            console.info('screenshot', component.iteration * component.screenHeight);

            if (component.iteration > 0 && component.iterationCount == 1) {
                console.info('send end');
                chrome.runtime.sendMessage({
                    screenshot: 'end'
                });

                component.domHTML.style.transform = '';
            } else {
                console.info('send add');
                chrome.runtime.sendMessage({
                    screenshot: 'add'
                });
            }

            component.iteration++;
            component.iterationCount--;
        }*/
    });

})();
