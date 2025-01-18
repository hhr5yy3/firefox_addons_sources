class RequestMF {
    constructor() {
        this.xml = undefined;
    }

    doit(obj) {
        var i, max, fd, tentativas = 0;
        this.xml = new XMLHttpRequest();
        var url = '';
        if (!obj) throw('Parâmetros não definidos');
        if (!obj.maximoTentativas) obj.maximoTentativas = 1;
        if (obj && obj.url && typeof obj.url === 'string' && obj.url.length) {
            if (obj.url.substr(0,4) !== 'http') {
                url = MFt.server();
                if (obj.url.substr(0,1) === '/') url += obj.url;
                else url += '/' + obj.url;
            }
            else url = obj.url;
        }
        else throw ('URL não definida');
        if (obj && obj.responseType) this.xml.responseType = obj.responseType;
        const getpost = ()=>{
            if ('get' in obj && Object.prototype.toString.call(obj.get) === '[object Object]') {
                if (Object.keys(obj.get).length) url += '?'; // Assim o get pode estar vazio quando se quer apenas um arquivo no servidor
                for(i = 0, max = Object.keys(obj.get).length; i < max; i++) {
                    url += Object.keys(obj.get)[i] + '=' + encodeURIComponent(obj.get[Object.keys(obj.get)[i]]);
                    if (i < max - 1) url += '&';
                }
                this.xml.open('get', url);
            }
            else if ('delete' in obj && Object.prototype.toString.call(obj.delete) === '[object Object]') {
                if (Object.keys(obj.delete).length) url += '?'; // Assim o get pode estar vazio quando se quer apenas um arquivo no servidor
                for(i = 0, max = Object.keys(obj.delete).length; i < max; i++) {
                    url += Object.keys(obj.delete)[i] + '=' + encodeURIComponent(obj.delete[Object.keys(obj.delete)[i]]);
                    if (i < max - 1) url += '&';
                }
                this.xml.open('delete', url);
            }
            else if ('options' in obj && Object.prototype.toString.call(obj.options) === '[object Object]' && Object.keys(obj.options).length) {
                fd = new FormData();
                for(i in obj.options) {
                    if (obj.options.hasOwnProperty(i)) {
                        fd.append(i, obj.options[i])
                    }
                }
                this.xml.open('options', url);
            }
            else if ('post' in obj && Object.prototype.toString.call(obj.post) === '[object Object]' && Object.keys(obj.post).length) {
                fd = new FormData();
                for(i in obj.post) {
                    if (obj.post.hasOwnProperty(i)) {
                        fd.append(i, obj.post[i])
                    }
                }
                this.xml.open('post', url);
            }
            // No Super, tudo é enviado não como form-data, mas como JSON. Assim, tudo o que não é GET, é msg em JSON.
            else if (Object.prototype.toString.call(obj.msg) === '[object String]' || Object.prototype.toString.call(obj.msg) === '[object Blob]') {
                const method = (()=>{
                    if (obj.put) return 'PUT';
                    else if (obj.patch) return 'PATCH'; // O Super exige que este (PATCH) esteja em uppercase
                    else if (obj.delete) return 'DELETE';
                    else if (obj.options) return 'OPTIONS';
                    else return 'POST';
                })();
                this.xml.open(method, url);
            }
            else {
                console.trace();
                console.log(Object.prototype.toString.call(obj.msg));
                if (typeof obj.msg !== 'string') console.log('%cO parâmetro msg precisa ser uma string JSON', 'color:red;font-weight:bold;');
                throw new Error('Erro! GET/POST/MSG not defined!');
            }
        };
        getpost(); //////////////////////////////////----------------------- XML.OPEN(...) - ainda nao eh o xml.send()
        if (obj && obj.headers) {
            for(let h in obj.headers) {
                if (obj.headers.hasOwnProperty(h)) this.xml.setRequestHeader(h, obj.headers[h]);
            }
        }
        this.xml.onload = ev=>{
            if (ev instanceof ProgressEvent && ev.target.status !== 200) {
                let dados;
                try{dados=JSON.parse(ev.target.response)}
                catch (e) {}
                if (dados && typeof obj.callback === 'function') obj.callback(dados);
                else obj.callback(ev.target.response);
                return;
            }
            let dados;
            if (obj && (obj.justText || obj.responseType === 'blob')) { // obj.justText indica que quero apenas o responseText, e não dados no formato JSON
                if ('callback' in obj && Object.prototype.toString.call(obj.callback) === "[object Function]") {
                    if (obj.justText) obj.callback(ev.target.responseText);
                    else if (obj.responseType === 'blob') {
                        obj.callback(ev.target.response);
                    }
                }
            }
            else {
                try {
                    dados = JSON.parse(ev.target.responseText);
                }
                catch(err) {
                    console.trace();
                    console.log(ev.target.responseText);
                    if ('callback' in obj && Object.prototype.toString.call(obj.callback) === "[object Function]") {
                        obj.callback();
                    }
                }
                if (dados){
                    if ('callback' in obj && Object.prototype.toString.call(obj.callback) === "[object Function]") {
                        obj.callback(dados);
                    }
                    else throw('Callback ausente!');
                }
            }
        };
        this.xml.onprogress = e=>{
            if (typeof obj?.onprogresscb === 'function') obj.onprogresscb(e);
            // console.log('NAO EXISTE ON PROGRESS');
            // console.trace();
            // if ('onprogresscb' in obj && Object.prototype.toString.call(obj.onprogresscb) === "[object Function]") obj.onprogresscb(e);
        };
        this.xml.onerror = ev=>{
            if (tentativas < obj.maximoTentativas) {
                if (obj.errorCallback && typeof obj.errorCallback === 'function') {
                    obj.errorCallback({
                        maximoTentativas : obj.maximoTentativas,
                        tentativa : tentativas
                    });
                }
                tentativas++;
                if (Object.prototype.toString.call(obj.get) === '[object Object]') {
                    getpost();
                    this.xml.send();
                }
                else if (Object.prototype.toString.call(obj.post) === '[object Object]'){
                    getpost();
                    this.xml.send(fd);
                }
                else if (Object.prototype.toString.call(obj.msg) === '[object String]') {
                    // Caso a mensagem nao precisar ser tratada, como ocorre com o Sapiens
                    // Deve ser usado com obj.justText = 1
                    getpost();
                    this.xml.send(obj.msg);
                }
                else if (Object.prototype.toString.call(obj.msg) === '[object Blob]') {
                    this.xml.send(obj.msg);
                }
                else {
                    throw new Error("Nao foi especificado o metodo ou msg nao eh string");
                }
            }
            else {
                if (obj.errorCallback && typeof obj.errorCallback === 'function') {
                    obj.errorCallback({ // chama o errorCallback da função de chamada
                        maximoTentativas: obj.maximoTentativas,
                        tentativa: tentativas,
                        fim: true
                    });
                }
                else {
                    alert('errorCallback não definido como função');
                    throw new Error('errorCallback não definido como função');
                }
            }
        };
        tentativas++;
        if (Object.prototype.toString.call(obj.get) === '[object Object]') {
            try {this.xml.send();}
            catch (e) {
                console.log(e);
                console.log(this.xml);
                console.log(this.xml.responseText);
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else if (Object.prototype.toString.call(obj.post) === '[object Object]') {
            try {this.xml.send(fd);}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else if (Object.prototype.toString.call(obj.msg) === '[object String]') {
            // Caso a mensagem nao precisar ser tratada, como ocorre com o Sapiens
            // Deve ser usado com obj.justText = 1
            try {this.xml.send(obj.msg);}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else if (Object.prototype.toString.call(obj.msg) === '[object Blob]') {
            // Upload de arquivos para o Sapiens ou outro sistema que nao use o FormData para o envio de arquivos
            this.xml.setRequestHeader('X-File-Name', obj.filename);
            this.xml.setRequestHeader('X-File-Size', obj.msg.size);
            this.xml.setRequestHeader('X-File-Type', obj.msg.type);
            this.xml.setRequestHeader('Content-Type', 'application/binary');
            //xml.setRequestHeader('Content-Length', obj.msg.size); // considerado unsafe pelo browser que acrescenta essa chave por conta própria.
            // É assim que o Sapiens recebe documentos
            // A maneira tradicional é transformar um Blob em File e incluí-lo como um dos campos do FormData
            // Para isso, basta acrescentar dois campos no Blob:
            //       theBlob.lastModifiedDate = new Date();
            //       theBlob.name = fileName;
            try {this.xml.send(obj.msg);}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else {
            throw new Error("Nao foi especificado o metodo ou msg nao eh string");
        }
    }

    request(url, params, tipo='get') {
        return new Promise(rr=>{
            let ob = {
                url
            };
            switch (tipo) {
                case 'get':
                case 'GET':
                    ob.get = params;
                    break;
                case 'post':
                case 'POST':
                    ob.post = params;
                    break;
                default:
                    ob.get = params;
            }
            ob.callback = dd=>rr(dd);
            this.doit(ob);
        });
    }
}