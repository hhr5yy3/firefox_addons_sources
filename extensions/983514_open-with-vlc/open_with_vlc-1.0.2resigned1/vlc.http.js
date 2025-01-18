/**
 * Gestion de VLC via l'interface HTTP
 *
 * Classe utilisant une classe Request a définir selon le langage (JavaScript/NodeJS)
 */
class VLCHTTP {

    constructor(options, RequestClass) {
        options = Object.assign({}, {
            baseURL: "http://localhost",
            port: 8080
        }, options);
        this._options = options;
        this._Request = RequestClass;
    }

    open(link) {
        return this.request({
            url: "requests/status.json",
            params: {
                command: "in_play",
                input: link
            }
        });
    }
    fullscreen() {
        return this.request({
            url: "requests/status.json",
            params: {
                command: "fullscreen"
            }
        });
    }
    stop() {
        return this.request({
            url: "requests/status.json",
            params: {
                command: "pl_stop"
            }
        });
    }

    getCurrentItemInfo() {
        return this.request({
            url: "requests/status.json"
        });
    }

    setAudioSource(index) {
        return this.request({
            url: "requests/status.json",
            params: {
                command: "video_track",
                val: index
            }
        });
    }

    getAudioSourcesFrom(data) {
        var audioSources = [];
        if (data.information && data.information.category) {
            for (var name in data.information.category) {
                if (name !== "meta") {
                    var dataSource = data.information.category[name];
                    if (dataSource["Type_"] == "Audio") {
                        var regex = /([0-9]+)/i;
                        var values = regex.exec(name);
                        var num = parseInt(values[1]);
                        var texts = [];
                        for (var nameData in dataSource) {
                            if (nameData != "Type_") {
                                texts.push(dataSource[nameData]);
                            }
                        }
                        dataSource.index = num;
                        dataSource.text = texts.join(" ");
                        audioSources.push(dataSource);
                    }
                }
            }

        }
        return audioSources;
    }


    request(options) {
        options = Object.assign({
            language: null,
            params: null,
            returns: "JSON",
            url: null
        }, options);
        var req = new Request({
            url: this._options.baseURL+":"+this._options.port+"/"+options.url,
            params: options.params,
            password: this._options.password,
            language: options.language,
            returns: options.returns
        });
        return req.execute();
    }
}
