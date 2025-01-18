/**
 * Classe Request, utilisé par VLC.HTTP
 * VLC.HTTP a été créé afin d'être réutilisable sur Node.JS par exemple
 */
class Request {
    constructor(options) {
        options = Object.assign({
            username: "",
            method: 'GET'
        }, options);
        this.options = options;
    }
    execute() { return new Promise((success, error) => {
        var xhr = new XMLHttpRequest();
        var url = this.options.url;
        var data = "";
        if (this.options.params) {
            for (var name in this.options.params) {
                if (data != "") {
                    data += "&";
                }
                data += encodeURIComponent(name)+"="+encodeURIComponent(this.options.params[name]);
            }
        }
        if (this.options.method == 'GET' && data.length) {
            if (url.indexOf("?") > -1) {
                if (url.substr(-1) != "&" && url.substr(-1) != "?") {
                    url += "&"
                }
            } else {
                url += "?";
            }
            url += data;
        }
        xhr.open(this.options.method, url, true);
        if (this.options.language) {
            xhr.setRequestHeader("Accept-Language", this.options.language);
        }
        if (this.options.password) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("Authorization", 'Basic ' + btoa(this.options.username+':'+this.options.password));
        }
        xhr.onload = (e) => {
            if (xhr.status !== 200) {
                error({event: e, xhr: xhr});
            } else {
                var response = xhr.responseText;
                if (this.options.returns && this.options.returns === "JSON") {
                    try {
                        response = JSON.parse(response);
                    } catch(e) {

                    }

                }
                success(response);
            }
        };
        xhr.onerror = function (err) {
            error({event: err, xhr: xhr});
        }
        xhr.send();
    }); }
}
