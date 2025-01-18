    function requestVideoQualitySizeChange(event) {
        var f = document.getElementsByTagName("select")[0];
        var player_type = f.options[f.selectedIndex].getAttribute("value");
        chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
            chrome.tabs.sendRequest(tabs[0].id, { action: 'player_type_change', 'player_type': player_type }, function(response) {
                //foo
            });
        });
        savePlayerType(player_type);
    }

    function savePlayerType(player_type) {
        chrome.extension.sendRequest({ 'action': 'playertype_save', 'player_type': player_type },
            function(o) {
                //foo
            }
        );
    }

    function adjustOptions(player_type) {
        var a, si;
        a = document.getElementsByTagName("select")[0];
        for (var i = 0; i < a.length; i++) {
            if (a[i].getAttribute("value") == player_type) {
                si = i;
                break;
            }
        }
        a.selectedIndex = si;
        document.getElementsByTagName("select")[0].addEventListener("change", requestVideoQualitySizeChange, true);
    }

    function askPlayerType() {
        chrome.extension.sendRequest({ 'action': 'playertype_ask' },
            function(o) {
                adjustOptions(o['player_type']);
            }
        );
    }

    document.addEventListener("DOMContentLoaded",function(event){
        document.getElementById("owindow").addEventListener("click",function(event){
            event.preventDefault();
            chrome.runtime.sendMessage({ 'action': 'gkn_ask_popup' },
                function(o) {
                    //foo
                }
            );           
        },false);;
    },false);
