var buttons = require('sdk/ui/button/action');
var cm = require('sdk/context-menu');
var pm = require('sdk/page-mod');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var {ChromeWorker} = require('chrome');

/*
 * Add the local file viewer button
 */
var button = buttons.ActionButton({
    id: 'free-visio-viewer',
    label: 'Free Visio Viewer by Lucidchart',
    icon: {
        '16': self.data.url('img/chart_appicon_16.png'),
        '32': self.data.url('img/chart_appicon_32.png'),
        '64': self.data.url('img/chart_appicon_64.png')
    },
    onClick: handleClick
});

function handleClick(state) {
    tabs.open(self.data.url('free_visio_viewer.html'));
}

/*
 * Page scripts cannot CORS. Accordingly, we need to use a content script
 * to make the CORS request to convert the Visio file.
 */
pm.PageMod({
    include: self.data.url('free_visio_viewer.html'),
    contentScriptFile: [self.data.url('js/local-file-viewer-content-script.js')],
    contentScriptWhen: 'ready',
    onAttach: function(worker) {
        worker.port.on('conversionSuccess', function(viewerUrl) {
            tabs.open(viewerUrl);
        });
    }
});

/*
 * When the extension is installed, open the local file upload page
 */
exports.main = function(options, callbacks) {
    if (options.loadReason === 'install') {
        tabs.open(self.data.url('free_visio_viewer.html'));
    }
};
