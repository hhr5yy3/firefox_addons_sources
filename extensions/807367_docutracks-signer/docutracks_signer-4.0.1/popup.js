var docutracksSigner = {

    getAddonVersion: function () {
        return '4.0.1';
    },

    setVersionText: function () {
        var version = this.getAddonVersion();
        $('p:last').html('Έκδοση: ' + version);
    },

    AddAddonStamp: function () {
        var newDiv = document.createElement('div');
        newDiv.id = 'addon';
        var newContent = document.createElement('input');
        newContent.id = 'chromeAddoninstalled';
        newContent.type = 'hidden';
        newContent.value = 'sdsdsd';
        newDiv.appendChild(newContent);

        var currentDiv = document.getElementById('main-content');
        if (currentDiv != null) {
            document.body.insertBefore(newDiv, currentDiv);
        }
    },


};

var closeButton = document.getElementsByClassName('close');
if (closeButton[0]) {
    closeButton[0].onclick = function () { window.close(); };
}

document.addEventListener('DOMContentLoaded', function () {
    docutracksSigner.setVersionText();
    docutracksSigner.AddAddonStamp();

    window.addEventListener('signFileHash', function (event) {
        self.port.emit('signFileHashIndex', event.detail);
    }, false);
});
