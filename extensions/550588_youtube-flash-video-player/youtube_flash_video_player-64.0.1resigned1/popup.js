    var Opt = {
        requestVideoQualitySizeChange: function(event) {
            var f = document.getElementsByTagName("select")[0];
            var player_type = f.options[f.selectedIndex].getAttribute("value");
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'player_type_change', 'player_type': player_type }, function(response) {
                    //foo
                });
            });
            Opt.savePlayerType(player_type);
        },
        savePlayerType: function(player_type) {
            chrome.runtime.sendMessage({ 'action': 'playertype_save', 'player_type': player_type },
                function(o) {
                    //foo
                }
            );
        },
        adjustOptions: function(player_type) {
            var a, si;
            a = document.getElementsByTagName("select")[0];
            for (var i = 0; i < a.length; i++) {
                if (a[i].getAttribute("value") == player_type) {
                    si = i;
                    break;
                }
            }
            a.selectedIndex = si;
            document.getElementsByTagName("select")[0].addEventListener("change", Opt.requestVideoQualitySizeChange, true);
        },
        askPlayerType: function() {
            chrome.runtime.sendMessage({ 'action': 'playertype_ask' },
                function(o) {
                    Opt.adjustOptions(o['player_type']);
                }
            );
        }
    }

    $(document).ready(function() {
        Opt.askPlayerType();
    });