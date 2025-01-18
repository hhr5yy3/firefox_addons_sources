var SBPOptions = {
    isMac: false,
    saveOptions: function(event) {
        localStorage["pspath"] = document.getElementById("exe-path-textbox").value;
    },
    getDefaultPath: function() {
        if (localStorage["os"] == "win") {
            return SBPOptions.defaultPaths.win;
        } else if (localStorage["os"] == "mac") {
            return SBPOptions.defaultPaths.mac;
        } else if (localStorage["os"] == "linux") {
            return SBPOptions.defaultPaths.linux;
        }
    },
    defaultPaths: {
        "win": "C:\\Program Files\\Adobe\\Adobe Photoshop CC 2014\\Photoshop.exe",
        "mac": "/Applications/Adobe Photoshop CC/Adobe Photoshop CC.app",
        "linux": "/usr/bin/photoshop"
    }
}

function init() {

    $(function() {

        $('#save-button').on('click', function(evt) {
            if (localStorage["os"] == "win") {
                if (document.getElementById("exe-path-textbox").value.search(/Photoshop\.exe$/) != -1) {
                    SBPOptions.saveOptions(event);
                    $('#myModal').modal('show');
                } else $('#myModal2').modal('show');
            } else if (localStorage["os"] == "mac") {
                if (document.getElementById("exe-path-textbox").value.search(/\.app$/) != -1) {
                    SBPOptions.saveOptions(event);
                    $('#myModal').modal('show');
                } else $('#myModal2').modal('show');
            } else if (localStorage["os"] == "linux") {
                if (document.getElementById("exe-path-textbox").value.search(/photoshop$/) != -1) {
                    SBPOptions.saveOptions(event);
                    $('#myModal').modal('show');
                } else $('#myModal2').modal('show');
            }
        });

        document.getElementById("exe-path-textbox").value = localStorage["pspath"] ? localStorage["pspath"] : SBPOptions.getDefaultPath();

        document.getElementById("win_exe_path").appendChild(document.createTextNode(SBPOptions.defaultPaths.win));
        document.getElementById("mac_exe_path").appendChild(document.createTextNode(SBPOptions.defaultPaths.mac));
        document.getElementById("linux_exe_path").appendChild(document.createTextNode(SBPOptions.defaultPaths.linux));

    })

}

init();