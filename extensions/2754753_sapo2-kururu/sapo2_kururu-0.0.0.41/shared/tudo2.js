/**
 * Classe em construção. Vai ser gradativamente adaptada para o Super Sapiens (Sapiens 2).
 * API do Super em https://supersapiensbackend.agu.gov.br/api/doc/
 */
class Tudo2 {
    constructor() {
        this.get_token_from_super_cb(res=>{
            if (res?.token && res?.expire && res?.profile) {
                this.token = res.token;
                this.token_expire = res.expire;
                this.profile = res.profile;
            }
        });
    }

    /**
     * Pergunta à página do Super qual o token e a validade dele e o profile
     * @returns {Promise<unknown>}
     */
    get_token_from_super_promise() {
        return new Promise(rr=>{
            let atendido = false;
            const timeout = setTimeout(()=>{ // define o tempo máximo para ter o token
                if (!atendido) rr(false);
            }, 200);
            if (location.href.startsWith("https://supersapiens")) { // chamada veio do content.js
                clearTimeout(timeout);
                atendido = true;
                const token = localStorage.getItem('token');
                const expire = parseInt(localStorage.getItem('exp'));
                const profile = localStorage.getItem('userProfile');
                rr({
                    token, expire, profile
                });
            }
            else { // chamada veio de alguma pagina da extensao
                const navegador = MFt.navegador() === 'firefox' ? browser : chrome;
                if (navegador?.tabs) navegador.tabs.query({}, tabs => { // Investigo se há alguma tab do Super aberta
                    for (let t of tabs) {
                        if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                            navegador.tabs.sendMessage(t.id, 'give_me_token', {}, resp => {
                                if (resp?.token) {
                                    clearTimeout(timeout);
                                    atendido = true;
                                    rr(resp);
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    get_token_from_super_cb(cb) {
        let atendido = false;
        setTimeout(()=>{
            if (!atendido) cb(false);
        }, 200);
        const navegador = MFt.navegador() === 'firefox' ? browser : chrome;
        if (navegador?.tabs) navegador.tabs.query({}, tabs=> { // Investigo se há alguma tab do Super aberta
            for(let t of tabs) {
                if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                    navegador.tabs.sendMessage(t.id, 'give_me_token', {}, resp => {
                        if (resp?.token) {
                            atendido = true;
                            cb(resp);
                        }
                    });
                }
            }
        });
    }

    set profile(val) {
        let dados;
        try {dados = JSON.parse(val);}
        catch {}
        if (!dados) {
            alert('Profile inválido!');
            console.log(val);
            throw new Error('Profile inválido!');
        }
        localStorage.setItem('profile', val);
    }

    get profile() {
        return localStorage.getItem('profile');
    }

    id_tab_super() {
        return new Promise(rr=>{
            let id_tab_super;
            chrome.tabs.query({}, tabs=>{ // Investigo se há alguma tab do Super aberta
                for(let t of tabs) {
                    if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                        id_tab_super = t.id;
                        console.log(id_tab_super);
                        rr(id_tab_super);
                        break;
                    }
                }
                if (!id_tab_super) rr(false);
            });
        });
    }

    set auth(val) {
        if (typeof val === 'string') {
            localStorage.setItem('super_token', val);
        }
        else if (typeof localStorage.getItem('super_token') === "string") this._auth = localStorage.getItem('super_token');
        else throw new Error('Autenticação JWT é inválida');
    }
    get auth() {
        // Linha abaixo para quando funcionar no content.js
        if (location.href.startsWith("https://supersapiens.agu.gov.br/") && typeof localStorage.getItem('token') === "string") return localStorage.getItem('super_token');
        // linha abaixo para quando funcionar na extensao
        if (typeof localStorage.getItem('super_token') === "string") return localStorage.getItem('super_token');
        return undefined;
    }

    set token(val) {
        if (!val) {
            alert('Login expirado!');
            throw new Error('Login expirado!');
        }
        localStorage.setItem('super_token', val.indexOf('Bearer ') === 0 ? val : `Bearer ${val}`);
    }
    get token() {return localStorage.getItem('super_token')};

    esperar_token() {
        return new Promise(rr=>{
            let tempo_max = 15;
            const timer = setInterval(()=>{
                if (this.is_token_valido) {
                    clearInterval(timer);
                    rr(true);
                }
                else if (--tempo_max === 0) rr(false);
            }, 1000);
        });
    }

    /**
     * Informa se o token que esta em localStorage eh valido
     * @returns {boolean}
     */
    get is_token_valido() {
        const minutos_antes = 1;
        const val = localStorage.getItem('token_expire');
        if (typeof val === "string" && Number.isInteger(parseInt(val))) {
            let validade;
            try {validade = new Date(parseInt(val));}
            catch (e) {}
            if (validade instanceof Date) {
                const agora = new Date().valueOf();
                const isValido = validade - agora > minutos_antes * 60 * 1000; // XX minutos antes do fim da validade

                console.log(`%cTOKEN VALIDO: ${isValido} - ${validade.toLocaleTimeString()}`, 'color:blue;');
                return isValido;
            }
            return false;
        }
        return false;
    }

    set token_expire(val) {
        if (!Number.isInteger(val)) throw new Error('valor nao integer');
        if (val % 1000) val *= 1000; // O tempo fornecido pelo Super nao tem milisegundos... se eu esquecer ele corrige
        let tmp;
        try {tmp = new Date(val);}
        catch (e) {
            alert('Valor de Data inválido');
            throw new Error('Valor de Data inválido');
        }
        if (tmp) localStorage.setItem('token_expire', val);
    }

    get token_expire() {
        const val = localStorage.getItem('token_expire');
        if (typeof val === "string" && Number.isInteger(parseInt(val))) return new Date(parseInt(val));
    }

    get last_first() {
        return {
            get: (target, prop, receiver) => {
                if (prop === 'last' && Object.prototype.toString.call(target) === '[object Array]') return target[target.length - 1];
                else if (prop === 'first' && Object.prototype.toString.call(target) === '[object Array]') return target[0];
                else return Reflect.get(target, prop);
            }
        }
    }

    get super_server() {return 'https://supersapiensbackend.agu.gov.br'}

    url_mp(rest) {
        if (!rest) console.trace();
        try {
            return this.super_server + (rest.startsWith('/') || this.super_server.endsWith('/') ? '' : '/') + rest;
        }
        catch (e) {console.log(e); this.erro_fatal('Erro na variavel rest.\nEm regra ocorre quando o parâmetro de super_get() está errado.');}
    }

    /**
     * Faz get, post e put no Super. Todos os parâmetros do GET devem estar em pp.params.
     * Se nao houver token JWT valido, renova o JWT antes.
     * Os parametros de post e put devem estar dentro de um dicionario post ou put
     * O Super sempre usa parâmetros na URL como se fosse um get, embora faca um post/put.
     * Nesse caso, os parâmetros do post devem estar em pp.params.post/put e já devem estar como JSON.
     * @param xml {RequestMF} Instancia de RequestMF para poder ter o xml para poder cancelar depois, se for o caso
     * @param pp {Object} com a parte do URL da API Rest do Super em "url" e os parâmetros em "params"
     * @param just_entities {Boolean} Serve apenas para limitar os entities, deixando de fora o "total"
     * @param first {Boolean} Se just_entitities==true && first==true retorna apenas o conteúdo do primeiro item
     * @param progress {Function} chamada durante o progresso do download/upload
     * @returns {Promise<Object>}
     */
    async super_get(xml, pp, just_entities=false, first=false, progress) {
        if (!(xml instanceof RequestMF)) {
            alert('Primeiro parâmetro passado não é um RequestMF');
            return;
        }
        if (typeof pp !== 'object') {
            alert('Parâmetro 2 não contém um objeto válido');
            return;
        }
        // Cada chamada ao Super eh precedida de verificacao da validade do token JWT
        // para evitar loop infinito verifico se a chamada ao super_get nao vem de refresh_token()
        // console.log(pp.url);
        if (!this.is_token_valido && pp?.url?.indexOf('refresh_token') < 0) {
            // se o token perder a validade solicito o token da própria página do super
            console.group('SOLICITANDO TOKEN DA PAGINA DO SUPER...');
            const res = await this.get_token_from_super_promise();
            // console.log('TOKEN OBTIDO');
            // console.log(res);
            // console.groupEnd();
            if (res?.token && res?.expire && res?.profile) {
                this.token = res.token;
                this.token_expire = res.expire;
                this.profile = res.profile;
            }
            if (!this.is_token_valido) {
                // Se até mesmo o token da página do super for inválido (<1min para expirar), solicito novo token do servidor
                // refresh_token() também atualiza o token na página do super.
                await this.refresh_token();
            }
        }
        return new Promise(rr=>{
            if (pp?.params?.post || pp?.params?.put || pp?.params?.patch || pp?.params?.delete || pp?.params?.options) {
                const msg = pp?.params?.post || pp?.params?.put || pp?.params?.patch || pp?.params?.delete || pp?.params?.options;
                const put = !(!pp?.params?.put);
                const patch = !(!pp?.params?.patch);
                const deletar = !(!pp?.params?.delete);
                const options = !(!pp?.params?.options);
                if (pp?.params?.post) delete pp.params.post;
                else if (pp?.params?.patch) delete pp.params.patch;
                else if (pp?.params?.put) delete pp.params.put;
                else if (pp?.params?.delete) delete pp.params.delete;
                else if (pp?.params?.options) delete pp.params.options;
                let url = this.url_mp(pp.url); // acrescenta no início da url o https://supersapiensbackend.agu.gov.br
                if (Object.keys(pp.params).length) { // Tudo o que estiver ligado a raiz de params vai para a URL
                    url += '?';
                    let itens = [];
                    for(let i in pp.params) {
                        if (!pp.params.hasOwnProperty(i)) continue;
                        // console.log(`${i}=${pp.params[i]}`);
                        itens.push(`${i}=${encodeURIComponent(pp.params[i])}`);
                    }
                    url += itens.join('&');
                    for(let i of Object.keys(pp.params)) {
                        delete pp.params[i];
                    }
                }

                xml.doit({
                    url,
                    headers: {'authorization': this.auth},
                    msg,
                    put,
                    patch,
                    delete: deletar,
                    options,
                    callback: d=>{
                        if (d?.entities && just_entities && first) {if (d.entities.length) rr(d.entities[0]); else rr([]);}
                        else if (d?.entities && just_entities) rr(d.entities);
                        else {
                            rr(d);
                        } // Normalmente retorna um objeto com {entities: [], total: integer, às vezes só retorna um object, como na criação de tarefa}
                    },
                    errorCallback: d=>{
                        if (d?.tentativa) console.log(`%cErro de Comunicacao. Tentativas: ${d.tentativa}`, 'color:red;');
                        rr(false);
                    },
                    onprogresscb: e=>{
                        if (typeof progress === 'function') progress(e);
                    }
                });
            }
            else { // Para os GETs
                let ob = {
                    url: this.url_mp(pp.url),
                    headers: {'authorization': this.auth},
                    callback: d=>{
                        if (d?.entities && just_entities && first) {if (d.entities.length) rr(d.entities[0]); else rr([]);}
                        else if (d?.entities && just_entities) rr(d.entities);
                        else rr(d); // Normalmente retorna um objeto com {entities: [], total: integer}
                    },
                    errorCallback: d=>{
                        if (d?.tentativa) console.log(`%cErro de Comunicacao. Tentativas: ${d.tentativa}`, 'color:red;');
                        rr(false);
                    },
                    onprogresscb: e=>{
                        if (typeof progress === 'function') progress(e);
                    }
                };
                // if (pp?.params?.delete) ob.delete = pp.params.delete;
                ob.get = pp?.params || {};
                xml.doit(ob);
            }
        });
    }

    /**
     * Renova o Token JWT e coloca o valor dele em localStorage junto com o tempo de validade
     * @returns {Promise<void>}
     */
    async refresh_token() {
        if (!this.is_token_valido) {
            console.log('TOKEN inválido');
            const xml = new RequestMF();
            let res = await this.super_get(xml, {url: '/auth/refresh_token'}); // obter novo JWT ou novo Token
            const status = res?.code || res?.status;
            if (status >= 400 && status <= 499) {
                console.log(`%cStatus Code: ${status}`, 'color:red;font-weight:bold;');
                console.log('%ctudo2.js Não foi possível renovar o JWT', 'color:red;');
                alert(`Login expirado.\n${res?.message || ''}\nRefaça o login no Super.`);
                close();
                return;
            }
            chrome.runtime.sendMessage({
                task: 'new_token',
                token: res.token,
                expire: res.exp
            }, bg=>{
                console.group('background.js responsta a new_token');
                console.log(bg);
                console.groupEnd();
            });
            console.log(`%cObtido novo token ${new Date().toLocaleTimeString()} %cValido ate ${new Date(res.exp*1000).toLocaleTimeString()}`, 'color:blue;', 'color:green;font-weight:bold;');
            this.token = res.token;
            this.token_expire = res.exp * 1000;
        }
        console.log(`%cPedido de refresh_token negado - Token ainda no prazo de validade... ${this.token_expire.toLocaleString()}`, 'color:blue;font-weight:bold;');
    }

    /**
     * Retorna dados apenas se tudo for ok
     * @param msg
     * @param cb
     */
    sapiens_route(msg, cb) {
        MFt.xml({
            url: 'https://sapiens.agu.gov.br/route',
            msg: msg,
            callback: d=>{
                cb(this.extrair_dados(d));
            },
            onerrorCallback: d=>{
                if (d?.tentativa) console.log(`%cErro de Comunicacao. Tentativas: ${d.tentativa}`, 'color:red;');
                cb(false);
            }
        });
    };

    /**
     * Utiliza o JWT armazenado no localStorage e retorna o profile se o JWT for valido no Super
     * @return {Promise<any>}
     */
    static verificar_login = ()=>{
        return new Promise(rr=>{
            const token = localStorage.getItem('super_token');
            if (!token) {rr(false); return;}
            Tudo2.xml_static({
                url: 'https://supersapiensbackend.agu.gov.br/profile',
                headers: {'authorization': token},
                get: {},
                callback: dd=>{
                    if (dd?.code === 401 && dd?.message?.toLowerCase()?.indexOf('expired') >= 0) {
                        console.group('TOKEN EXPIRADO');
                        console.log(token);
                        console.groupEnd();
                        alert('Sessão com o Super expirada');
                        document.body.innerText = 'Sessão com o Super expirada';
                    }
                    else {
                        if (dd?.id && dd?.jwt) rr({
                            profile: dd,
                            token
                        });
                        else throw new Error('Algo deu errado!');
                    }
                },
                onerrorCallback: ee=>{
                    alert('Verifique sua conxão de Internet');
                    document.body.innerText = 'Erro de conexão';
                    rr(false);
                }
            });
        });
    };

    /**
     * Não se espera qualquer registro, mas apenas se a operação foi bem sucedida, como na exclusão de tarefa
     * @param msg
     * @param cb {function} Returns Bool
     */
    sapiens_route_no_records(msg, cb) {
        MFt.xml({
            url: 'https://sapiens.agu.gov.br/route',
            msg: msg,
            callback: j=>{
                let tipo = (o) => {
                    return Object.prototype.toString.call(o);
                };
                if (tipo(j) === '[object Array]' && j.length && j[0].result && j[0].result.success) {
                    cb(true);
                }
                else cb(false);
            }
        });
    };

    /**
     * Retorna erro se houver erro.
     * @param msg
     * @param cb {Function} Retorna um object com a chave 'dados' quando dá tudo certo e a chave 'erro' quando dá erro
     */
    sapiens_route_completo(msg, cb) {
        let extrair_dados = (j)=> {
            let tipo = (o) => {
                return Object.prototype.toString.call(o);
            };
            if (tipo(j) === '[object Array]' && j.length && j[0].result && j[0].result.success && j[0].result.records && j[0].result.records) {
                return {ok:'ok', dados: j[0].result.records, tudo:j};
            }
            else {
                console.group('ERRO NO SAPIENS');
                console.log(j);
                console.groupEnd();
                if (tipo(j) !== '[object Array]') return {erro:['Erro de comunicação (tudo.js)']};
                if (tipo(j[0].result) === '[object Array]') return {erro:j[0].result[0].erros};
                else {
                    console.log(j);
                    return {erro:['Erro nao especificado do Sapiens (tudo.js)']};
                }
            }
        };
        MFt.xml({
            url: 'https://sapiens.agu.gov.br/route',
            msg: msg,
            callback: (d)=>{
                cb(extrair_dados(d));
            }
        });
    };

    /**
     * Retorna erro se houver erro.
     * @param msg
     * @param cb {Function} Retorna um object com a chave 'dados' quando dá tudo certo e a chave 'erro' quando dá erro
     */
    sapiens_route_completo_async(msg, cb) {
        return new Promise(rr=>{
            let extrair_dados = (j)=> {
                let tipo = o => Object.prototype.toString.call(o);
                if (tipo(j) === '[object Array]' && j.length && j[0].result && j[0].result.success && j[0].result.records && j[0].result.records) {
                    return {ok:'ok', dados: j[0].result.records, tudo:j};
                }
                else {
                    console.group('ERRO NO SAPIENS');
                    console.log(j);
                    console.groupEnd();
                    if (tipo(j[0].result) === '[object Array]') return {erro:j[0].result[0].erros};
                    else {
                        console.log(j);
                        return {erro:['Erro nao especificado do Sapiens']};
                    }
                }
            };
            MFt.xml({
                url: 'https://sapiens.agu.gov.br/route',
                msg: msg,
                callback: d=>{
                    rr(extrair_dados(d));
                    // const dados = extrair_dados(d);
                    // if (dados && dados.ok) rr(dados.dados);
                    // else if (dados && dados.erro) {
                    //     rr(dados.erro);
                    // }
                    // else rr(false);
                },
                onerror: ()=>{
                    rr({erro:'Erro de conexao'});
                }
            });
        });
    };

    tds(dd, tr, html_elem='td', styleOps={}) {
        let ret = [];
        dd.forEach((d)=>{
            const novo = MFt.criaElem(html_elem, {
                innerText: d,
                style: {
                    border: '1px solid #CCC'
                }
            }, tr);
            for(let key of Object.keys(styleOps)) {
                novo.style[key] = styleOps[key];
            }
            ret.push(novo);
        });
        return ret;
    };

    tipo(o) {
        return Object.prototype.toString.call(o);
    }

    tipo_static(o) {
        return Object.prototype.toString.call(o);
    }

    extrair_dados(j) {
        let tipo = (o) => {
            return Object.prototype.toString.call(o);
        };
        if (tipo(j) === '[object Array]' && j.length && j[0].result && j[0].result.success && j[0].result.records && j[0].result.records.length) {
            return j[0].result.records;
        }
    }

    formatanup (n){
        var tmp = n;
        var limpa = function (numero) {
            if (!numero?.length) {
                alert('Erro com o numero do NUP');
                return;
            }
            // Retira os caracteres "." "/" "-", mas deixa o dígito verificador da string
            let temp = '';
            for (let i = 0; i < numero.length; i++) if ((numero[i] >= '0') && (numero[i] <= '9')) temp += numero[i];
            return temp;
        };
        n = limpa(n);
        switch(n.length) {
            case 17:
                tmp = n.substr(0,5) + '.';
                tmp += n.substr(5, 6) + '/';
                tmp += n.substr(11, 4) + '-';
                tmp += n.substr(15, 2);
                break;
            case 15: // ex.: 10768.001156/86-05
                tmp = n.substr(0,5) + '.';
                tmp += n.substr(5, 6) + '/';
                tmp += n.substr(11, 2) + '-';
                tmp += n.substr(13, 2);
                break;
            default:
                tmp = n;
        }
        return tmp;
    };

    criar_select(label, dados, wrapper, classname) {
        let caixa = MFt.criaElem('div', {
            style: {
                fontSize: '12px',
                fontWeight: 'bold'
            },
        }, wrapper);
        MFt.criaElem('div', {
            innerText: label
        }, caixa);
        let sel = MFt.criaElem('select', {

        }, MFt.criaElem('div', {

        }, caixa));
        if (classname) {
            sel.className = classname;
            caixa.className = classname;
        }
        else {
            caixa.style.padding = '0 10px 10px 10px';
            caixa.style.margin = '10px 0';
            caixa.style.border = '1px solid #CCC';
            caixa.style.borderRadius = '6px';
        }
        dados.forEach((a)=>{
            let op = MFt.criaElem('option', {
                innerText: a.nome
            }, sel);
            let keys = Object.keys(a);
            keys.forEach((k)=>{
                if (k !== 'nome') {
                    op.setAttribute(k, a[k]);
                }
            });
        });
        return sel;
    }

    selecionar_setor_juridico(cb) {
        let selecionar = (setores_juridicos) => {
            let pop = new PopUp(500, 150, null, null, (form) => {
                let itens = [];
                setores_juridicos.forEach((s) => {
                    itens.push({value: s.id, nome: s.nome});
                });
                MFt.criaElem('div', {innerText: 'Selecione o setor jurídico'}, form.div);
                let sel = this.criar_select('Setor', itens, form.div, 'selecionar_setor');
                let bt = new MFt.bt({
                    value: 'Selecionar',
                    wrapper: MFt.criaElem('div', null, form.div),
                    width: 100,
                    height: 30,
                    marginTop: '10px',
                    callback: () => {
                        pop.closeWindow(pop);
                        cb(setores_juridicos[sel.selectedIndex]);
                    }
                });
            });
            pop.iniciar(pop);
        };
        this.obter_setores_juridicos(setores=>{
            if (setores.length > 1) {
                selecionar();
            }
            else cb(setores[0]);
        });
    }

    /**
     * Transforma uma data e hora no formato MySQL para o Date() do Javascript
     * @param o {String} String no formado AAAA-MM-DD HH:MM:SS
     * @returns {Date}
     */
    data_selecionada(o) {
        // console.log(o);
        let ano = parseInt(o.substr(0,4));
        let mes = parseInt(o.substr(5,2)) - 1;
        let dia = parseInt(o.substr(8,2));
        return new Date(ano, mes, dia, 0, 0, 0, 0);
    };

    /**
     * Recebe um Date() e devolve no formato DD/MM/AAAA
     * @param d {Date}
     * @param comhora {boolean} se true devolve no formato DD/MM/AAAA HH:MM:SS
     * @returns {string}
     */
    date2normal(d, comhora=false) {
        if (!(d instanceof Date)) {
            console.trace();
            console.log(d);
            throw 'Valor passado nao eh um Date()';
        }
        let pad = (s)=>{
            return s.toString().length === 1 ? '0' + s.toString() : s.toString();
        };
        return comhora ? `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` : `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
    }

    bisexto(ano) {
        if (typeof ano === "number" || (typeof ano === "string" && !isNaN(ano))) {
            ano = parseInt(ano);
        }
        else throw new Error('Ano nao numero');
        if (ano % 4 > 0) return false;
        if (ano % 100 !== 0) return true;
        if (ano % 400 === 0) return true;
        else return false;
    };

    /**
     * Recebe um Date() e devolve no formato AAAA-MM-DDTHH:MM:SS
     * @param d {Date}
     * @returns {string}
     */
    date2super(d) {
        let pad = s=>s.toString().length === 1 ? '0' + s.toString() : s.toString();
        return `${pad(d.getFullYear())}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getMinutes())}`;
    }

    /**
     *
     * @param ano
     * @param mes {number} 0 = janeiro, 11 = dezembro
     * @returns {number|number}
     */
    totalDeDiasDoAnoMes(ano, mes) {
        let bisexto = (ano) => {
            if (typeof ano === "number" || (typeof ano === "string" && !isNaN(ano))) {
                ano = parseInt(ano);
            }
            else throw new Error('Ano nao numero');
            if (ano % 4 > 0) return false;
            if (ano % 100 !== 0) return true;
            if (ano % 400 === 0) return true;
            else return false;
        };
        return [31, bisexto(ano) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes];
    }

    /**
     *
     * @param d String
     * @returns {*} Retorna false se a data for invalida ou uma Date() com a data se valida
     */
    validaData(d) {
        let bisexto = (ano) => {
            if (typeof ano === "number" || (typeof ano === "string" && !isNaN(ano))) {
                ano = parseInt(ano);
            }
            else throw new Error('Ano nao numero');
            if (ano % 4 > 0) return false;
            if (ano % 100 !== 0) return true;
            if (ano % 400 === 0) return true;
            else return false;
        };
        // ______________________________________________________________
        let dia, mes, ano;
        if (typeof d === 'string') d = d.trim();
        else throw new Error('Parâmetro precisa ser string no seguinte formato DD/MM/AAAA ou AAAA/MM/DD');
        d = d.replace('T', ' ');
        let rex = new RegExp('^([0-9]{1,2})[\\/\\-\\.]{1}([0-9]{1,2})[\\/\\-\\.]{1}([0-9]{4})');
        let res = rex.exec(d);
        if (res) {
            dia = parseInt(res[1]);
            mes = parseInt(res[2]);
            ano = parseInt(res[3]);
        }
        else {
            // Se nao der no formato DD/MM/AAAA tenta no formato AAAA/MM/DD
            rex = new RegExp('^([0-9]{4})[\\/\\-\\.]{1}([0-9]{1,2})[\\/\\-\\.]{1}([0-9]{1,2})');
            res = rex.exec(d);
            if (res) {
                dia = parseInt(res[3]);
                mes = parseInt(res[2]);
                ano = parseInt(res[1]);
            }
        }
        if (dia && mes && ano) {
            let dias = [31, bisexto(ano) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (dia > 0 && dia <= dias[mes - 1] && mes > 0 && mes <= 12 && ano > 0) return new Date(ano, mes - 1, dia, 0, 0, 0, 0);
            else return false;
        }
        else return false;
    }

    /**
     * Valida uma data e hora no formato mysql
     * @param d {String}
     * returns {Date}
     */
    valida_data_hora(d) {
        if (typeof d !== 'string') throw new Error('Parâmetro passado não é string');
        d = d.replace('T', ' ');
        let p1 = d.split(' ')[0];
        let p2 = d.split(' ')[1];
        let data = this.validaData(p1);
        if (data) {
            let hora = parseInt(p2.substr(0, 2));
            let minuto = parseInt(p2.substr(3, 2));
            let segundo = parseInt(p2.substr(6, 2));
            if (hora >= 0 && hora <= 23 && minuto >= 0 && minuto <= 59 && segundo >= 0 && segundo <= 59) {
                data.setHours(hora, minuto, segundo, 0);
                return data
            }
        }
    }

    /**
     * Valida uma data e hora no formato mysql
     * @param d {String}
     * returns {Date}
     */
    valida_data_hora_BRASIL(d) {
        if (typeof d !== 'string') throw new Error('Parâmetro passado não é string');
        d = d.replace('T', ' ');
        let p1 = d.split(' ')[0];
        let p2 = d.split(' ')[1];
        let data = this.validaData(p1);
        if (data) {
            let hora = parseInt(p2.substr(0, 2));
            let minuto = parseInt(p2.substr(3, 2));
            let segundo = parseInt(p2.substr(6, 2));
            if (hora >= 0 && hora <= 23 && minuto >= 0 && minuto <= 59 && segundo >= 0 && segundo <= 59) {
                data.setHours(hora, minuto, segundo, 0);
                return data
            }
        }
    }

    /**
     * Retorna um Date do último dia do ano e mês indicados
     * @param ano {Number}
     * @param mes {Number} Meses entre 1 e 12
     * @returns {Date}
     */
    ultimo_dia_mes(ano, mes) {
        let bisexto = (ano) => {
            if (typeof ano === "number" || (typeof ano === "string" && !isNaN(ano))) {
                ano = parseInt(ano);
            }
            else throw new Error('Ano nao numero');
            if (ano % 4 > 0) return false;
            if (ano % 100 !== 0) return true;
            if (ano % 400 === 0) return true;
            else return false;
        };
        let dias = [31, bisexto(ano) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return new Date(ano, mes - 1, dias[mes-1], 23, 59, 59, 99);
    }

    formatCPFCNPJ(t){
        if (typeof t !== 'string') return '';
        if (t.length === 11) return `${t.substr(0,3)}.${t.substr(3,3)}.${t.substr(6,3)}-${t.substr(9,2)}`;
        else if (t.length === 14) return `${t.substr(0,3)}.${t.substr(3,3)}.${t.substr(6,3)}/${t.substr(9,4)}-${t.substr(11,1)}`;
        else return t;
    };

    campo_checkbox(titulo, valor, wrapper, attr, estilo) {
        let d1 = MFt.criaElem('div', {
            style: {
                margin: '0 5px 5px 0',
                // padding: '0 7px',
                border: '1px solid #CCC',
                borderRadius: '6px',
                display: 'flex',
                alignContent: 'center'
            }
        }, wrapper);
        if (estilo) {
            let keys = Object.keys(estilo);
            keys.forEach((k)=>{
                d1.style[k] = estilo[k];
            });
        }
        const label = MFt.criaElem('label', {
            style: {
                cursor: 'pointer',
            }
        }, d1);
        let ch = MFt.criaElem('input', {
            type: 'checkbox',
        }, label, attr);
        ch.checked = !(!valor);
        let span = MFt.criaElem('span', {
            innerText: titulo,
            style: {
                marginLeft: '7px'
            }
        }, label);
        return ch;
    }

    campo_checkbox_2(label, valor, wrapper, attr, estilo) {
        let d1 = MFt.criaElem('label', {
            style: {
                margin: '0 5px 5px 0',
                // padding: '0 7px',
                border: '1px solid #CCC',
                borderRadius: '6px',
                display: 'flex',
                alignContent: 'center',
                cursor: 'pointer',
                backgroundColor: 'white',
            }
        }, wrapper);
        if (estilo) {
            let keys = Object.keys(estilo);
            keys.forEach((k)=>{
                d1.style[k] = estilo[k];
            });
        }
        let ch = MFt.criaElem('input', {
            type: 'checkbox',
        }, d1, attr);
        ch.checked = !(!valor);
        let span = MFt.criaElem('span', {
            innerText: label,
            style: {
                marginLeft: '7px',
                fontWeight: 'bold',
            }
        }, d1);
        return ch;
    }

    /**
     * Cria um campo texto com um label
     * @param txt {String} label
     * @param valor {String} valor predefinido do campo
     * @param wrapper {HTMLElement} local onde o campo vai ser inserido
     * @param width {Number} largura do elemento input
     * @param disabled {Boolean} Se vai estar ou nao desabilitado
     * @param textarea {Boolean} Se o elemento input vai ser um textarea
     * @param opcoes {Object} parametros diversos para o div
     * @return {HTMLInputElement|HTMLTextAreaElement}
     */
    campo_texto(txt, valor, wrapper, width, disabled=false, textarea=false, opcoes, style_textarea) {
        width = (()=>{
            if(width && Object.prototype.toString.call(width) === '[object Number]') {
                return `${width}px`;
            }
            else return width;
        })();
        let d1 = MFt.criaElem('div', {
            style: {
                marginBottom: opcoes && opcoes.marginBottom ? (isNaN(opcoes.marginBottom) ? opcoes.marginBottom : opcoes.marginBottom + 'px') : '15px'
            }
        }, wrapper);
        let label = MFt.criaElem('div', {
            innerText: txt,
            style: {
                fontSize: '12px',
                fontWeight: 'bold'
            }
        }, d1);
        let d1_sub = MFt.criaElem('div', {
            style: {
                border: opcoes && opcoes.height ? '0' : '1px solid #CCC',
                borderRadius: '6px',
                padding: '0 5px',
                width: width ? width : 'calc(100% - 10px)'
            }
        }, d1);
        let inp = (()=>{
            if (textarea) {
                let height = (()=>{
                    if (opcoes && opcoes.height) {
                        if (Object.prototype.toString.call(opcoes.height) === '[object Number]') {
                            return `${opcoes.height}px`;
                        }
                        else return opcoes.height;
                    }
                    else return '30px';
                })();
                if (opcoes?.style) MFt.atribs(d1_sub, {style:opcoes.style});
                const ret = MFt.criaElem('textarea', {
                    value: valor,
                    style: {
                        outline: 'none',
                        border: 'none',
                        width: 'calc(100% - 10px)',
                        height: height,
                        fontSize: '16px',
                        resize: 'none',
                        backgroundColor: 'transparent'
                    }
                }, d1_sub);
                if (typeof style_textarea === 'object') {
                    for(let o in style_textarea) if (style_textarea.hasOwnProperty(o)) ret.style[o] = style_textarea[o];
                }
                return ret;
            }
            else return MFt.criaElem('input', {
                type: 'text',
                value: valor,
                style: {
                    outline: 'none',
                    border: 'none',
                    width: 'calc(100% - 10px)',
                    height: '30px',
                    fontSize: '16px',
                    backgroundColor: 'transparent',
                    textAlign: opcoes ? opcoes.textAlign || 'left' : 'left'
                }
            }, d1_sub);
        })();
        inp.disabled = disabled;
        return inp;
    }

    /**
     *
     * @param nup {string}
     * @returns {string} String vazia se der erro. String com o NUP so com numeros se ok
     */
    validaNUP(nup) {
        // Ver http://www.comprasnet.gov.br/legislacao/portarias/p03_03.htm
        // Valida NUPs de 15, 17 e 21 numeros
        // Retorna o numero do NUP so com numeros se tudo ok
        // Retorna False para NUP nao valido
        // OBSERVAÇÃO: O SAPIENS TEM NUPS INVÁLIDOS COMO O 21200.000231/2016-02 CUJO DV DEVERIA SER 11
        // Calculadora oficial do Gov Federal: https://www.gov.br/economia/pt-br/assuntos/processo-eletronico-nacional/conteudo/numero-unico-de-protocolo-nup/calculadora-do-digito-verificador-do-nup
        let tmp = '';
        let acumula = 0;
        let digito1;
        let digito2;
        let j = 2;
        if (typeof nup !== 'string') return False
        if (nup.length > 0) {
            for (let i of nup) if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].some(d => d === i)) tmp += i;
            const nupOriginalSoNumeros = tmp;
            if ([15, 17, 21].some(d => d === tmp.length)) {
                tmp = tmp.substring(0, tmp.length - 2);
                for (let i = tmp.length - 1; i > -1; i--) {
                    acumula += parseInt(tmp[i]) * j++;
                }
                digito1 = 11 - (acumula % 11);
                if (digito1 > 9) digito1 -= 10;
                tmp += digito1.toString();
                j = 2;
                acumula = 0;
                for (let i = tmp.length - 1; i > -1; i--) {
                    acumula += parseInt(tmp[i]) * j++;
                }
                digito2 = 11 - (acumula % 11);
                if (digito2 > 9) digito2 -= 10;
                tmp += digito2.toString();
                console.log(`DV de ${nupOriginalSoNumeros.substring(0, nupOriginalSoNumeros.length - 2)}: ${digito1}${digito2}`);
                return tmp === nupOriginalSoNumeros ? tmp : false;
            }
        }
        return false;
    }

    xml(obj) {
        var self = this;
        var i, max, fd, tentativas = 0;
        var xml = new XMLHttpRequest();
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
        if (obj && obj.responseType) xml.responseType = obj.responseType;
        const getpost = ()=>{
            if ('get' in obj && Object.prototype.toString.call(obj.get) === '[object Object]') {
                if (Object.keys(obj.get).length) url += '?'; // Assim o get pode estar vazio quando se quer apenas um arquivo no servidor
                for(i = 0, max = Object.keys(obj.get).length; i < max; i++) {
                    url += Object.keys(obj.get)[i] + '=' + encodeURIComponent(obj.get[Object.keys(obj.get)[i]]);
                    if (i < max - 1) url += '&';
                }
                xml.open('get', url);
            }
            else if ('delete' in obj && Object.prototype.toString.call(obj.delete) === '[object Object]') {
                if (Object.keys(obj.get).length) url += '?'; // Assim o get pode estar vazio quando se quer apenas um arquivo no servidor
                for(i = 0, max = Object.keys(obj.get).length; i < max; i++) {
                    url += Object.keys(obj.get)[i] + '=' + encodeURIComponent(obj.get[Object.keys(obj.get)[i]]);
                    if (i < max - 1) url += '&';
                }
                xml.open('delete', url);
            }
            else if ('post' in obj && Object.prototype.toString.call(obj.post) === '[object Object]' && Object.keys(obj.post).length) {
                fd = new FormData();
                for(i in obj.post) {
                    if (obj.post.hasOwnProperty(i)) {
                        fd.append(i, obj.post[i])
                    }
                }
                xml.open('post', url);
            }
            // No Super, tudo é enviado não como form-data, mas como JSON. Assim, tudo o que não é GET, é msg em JSON.
            else if (Object.prototype.toString.call(obj.msg) === '[object String]' || Object.prototype.toString.call(obj.msg) === '[object Blob]') {
                const method = (()=>{
                    if (obj.put) return 'PUT';
                    else if (obj.patch) return 'PATCH'; // O Super exige que este (PATCH) esteja em uppercase
                    else if (obj.delete) return 'DELETE'; // O Super exige que este (PATCH) esteja em uppercase
                    else return 'POST';
                })();
                xml.open(method, url);
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
                if (obj.headers.hasOwnProperty(h)) xml.setRequestHeader(h, obj.headers[h]);
            }
        }
        xml.onload = ev=>{
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
        xml.onprogress = e=>{
            if ('onprogresscb' in obj && Object.prototype.toString.call(obj.onprogresscb) === "[object Function]") obj.onprogresscb(e);
        };
        xml.onerror = ev=>{
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
                    xml.send();
                }
                else if (Object.prototype.toString.call(obj.post) === '[object Object]'){
                    getpost();
                    xml.send(fd);
                }
                else if (Object.prototype.toString.call(obj.msg) === '[object String]') {
                    // Caso a mensagem nao precisar ser tratada, como ocorre com o Sapiens
                    // Deve ser usado com obj.justText = 1
                    getpost();
                    xml.send(obj.msg);
                }
                else if (Object.prototype.toString.call(obj.msg) === '[object Blob]') {
                    xml.send(obj.msg);
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
            try {xml.send();}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else if (Object.prototype.toString.call(obj.post) === '[object Object]') {
            try {xml.send(fd);}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else if (Object.prototype.toString.call(obj.msg) === '[object String]') {
            // Caso a mensagem nao precisar ser tratada, como ocorre com o Sapiens
            // Deve ser usado com obj.justText = 1
            try {xml.send(obj.msg);}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else if (Object.prototype.toString.call(obj.msg) === '[object Blob]') {
            // Upload de arquivos para o Sapiens ou outro sistema que nao use o FormData para o envio de arquivos
            xml.setRequestHeader('X-File-Name', obj.filename);
            xml.setRequestHeader('X-File-Size', obj.msg.size);
            xml.setRequestHeader('X-File-Type', obj.msg.type);
            xml.setRequestHeader('Content-Type', 'application/binary');
            //xml.setRequestHeader('Content-Length', obj.msg.size); // considerado unsafe pelo browser que acrescenta essa chave por conta própria.
            // É assim que o Sapiens recebe documentos
            // A maneira tradicional é transformar um Blob em File e incluí-lo como um dos campos do FormData
            // Para isso, basta acrescentar dois campos no Blob:
            //       theBlob.lastModifiedDate = new Date();
            //       theBlob.name = fileName;
            try {xml.send(obj.msg);}
            catch (e) {
                alert('Erro de comunicação com o "Super"');
                throw e;
            }
        }
        else {
            throw new Error("Nao foi especificado o metodo ou msg nao eh string");
        }
        return xml;
    }

    static xml_static(obj) {
        var self = this;
        var i, max, fd, tentativas = 0;
        var xml = new XMLHttpRequest();
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
        if (obj && obj.responseType) xml.responseType = obj.responseType;
        var getpost = function(){
            if ('get' in obj && Object.prototype.toString.call(obj.get) === '[object Object]') {
                if (Object.keys(obj.get).length) url += '?'; // Assim o get pode estar vazio quando se quer apenas um arquivo no servidor
                for(i = 0, max = Object.keys(obj.get).length; i < max; i++) {
                    url += Object.keys(obj.get)[i] + '=' + encodeURIComponent(obj.get[Object.keys(obj.get)[i]]);
                    if (i < max - 1) url += '&';
                }
                xml.open('get', url);
            }
            else if ('post' in obj && Object.prototype.toString.call(obj.post) === '[object Object]' && Object.keys(obj.post).length) {
                fd = new FormData();
                for(i in obj.post) {
                    if (obj.post.hasOwnProperty(i)) {
                        fd.append(i, obj.post[i])
                    }
                }
                xml.open('post', url);
            }
            else if (Object.prototype.toString.call(obj.msg) === '[object String]' || Object.prototype.toString.call(obj.msg) === '[object Blob]') {
                xml.open('post', url);
            }
            else {
                console.trace();
                console.log(Object.prototype.toString.call(obj.msg));
                throw new Error('Erro! GET/POST/MSG not defined!');
            }
        };
        getpost(); //////////////////////////////////----------------------- XML.OPEN(...)
        if (obj && obj.headers) {
            for(let h in obj.headers) {
                if (obj.headers.hasOwnProperty(h)) xml.setRequestHeader(h, obj.headers[h]);
            }
        }
        xml.onload = function(){
            var dados;
            if (obj && (obj.justText || obj.responseType === 'blob')) { // obj.justText indica que quero apenas o responseText, e não dados no formato JSON
                if ('callback' in obj && Object.prototype.toString.call(obj.callback) === "[object Function]") {
                    if (obj.justText) obj.callback.bind(self)(this.responseText);
                    else if (obj.responseType === 'blob') {
                        obj.callback.bind(self)(this.response);
                    }
                }
            }
            else {
                try {
                    dados = JSON.parse(this.responseText);
                }
                catch(err) {
                    console.trace();
                    console.log(this.responseText);
                    if ('callback' in obj && Object.prototype.toString.call(obj.callback) === "[object Function]") {
                        obj.callback.bind(self)();
                    }
                }
                if (dados){
                    if ('callback' in obj && Object.prototype.toString.call(obj.callback) === "[object Function]") {
                        obj.callback.bind(self)(dados);
                    }
                    else throw('Callback ausente!');
                }
            }
        };
        xml.onprogress = function(e){
            if ('onprogresscb' in obj && Object.prototype.toString.call(obj.onprogresscb) === "[object Function]") onprogresscb.bind(self)(e);
        };
        xml.onerror = function(){
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
                    xml.send();
                }
                else if (Object.prototype.toString.call(obj.post) === '[object Object]'){
                    getpost();
                    xml.send(fd);
                }
                else if (Object.prototype.toString.call(obj.msg) === '[object String]') {
                    // Caso a mensagem nao precisar ser tratada, como ocorre com o Sapiens
                    // Deve ser usado com obj.justText = 1
                    getpost();
                    xml.send(obj.msg);
                }
                else if (Object.prototype.toString.call(obj.msg) === '[object Blob]') {
                    xml.send(obj.msg);
                }
                else {
                    throw new Error("Nao foi especificado o metodo ou msg nao eh string");
                }
            }
            else {
                obj.errorCallback({
                    maximoTentativas : obj.maximoTentativas,
                    tentativa : tentativas,
                    fim : true
                });
            }
        };
        tentativas++;
        if (Object.prototype.toString.call(obj.get) === '[object Object]') {
            xml.send();
        }
        else if (Object.prototype.toString.call(obj.post) === '[object Object]') {
            xml.send(fd);
        }
        else if (Object.prototype.toString.call(obj.msg) === '[object String]') {
            // Caso a mensagem nao precisar ser tratada, como ocorre com o Sapiens
            // Deve ser usado com obj.justText = 1
            xml.send(obj.msg);
        }
        else if (Object.prototype.toString.call(obj.msg) === '[object Blob]') {
            // Upload de arquivos para o Sapiens ou outro sistema que nao use o FormData para o envio de arquivos
            xml.setRequestHeader('X-File-Name', obj.filename);
            xml.setRequestHeader('X-File-Size', obj.msg.size);
            xml.setRequestHeader('X-File-Type', obj.msg.type);
            xml.setRequestHeader('Content-Type', 'application/binary');
            //xml.setRequestHeader('Content-Length', obj.msg.size); // considerado unsafe pelo browser que acrescenta essa chave por conta própria.
            // É assim que o Sapiens recebe documentos
            // A maneira tradicional é transformar um Blob em File e incluí-lo como um dos campos do FormData
            // Para isso, basta acrescentar dois campos no Blob:
            //       theBlob.lastModifiedDate = new Date();
            //       theBlob.name = fileName;
            xml.send(obj.msg);
        }
        else {
            throw new Error("Nao foi especificado o metodo ou msg nao eh string");
        }
        return xml;
    }

    async copiar_clipboard(plainText) { // NÃO FUNCIONA - MAS TEM DOCUMENTAÇÃO EM https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
        //console.log(navigator.clipboard);
        //const type = 'text/html;charset=utf-8';
        //const blob = new Blob([innerText], {type});
        //const data = [new ClipboardItem({ [type]: blob })];
        //await navigator.clipboard.write(data);
        try {
            await navigator.clipboard.writeText(plainText);
        }
        catch (e) {
            alert('Erro ao escrever no Clipboard');
            console.error(e.msg);
        }
        //const data = new ClipboardItem({ [type]: blob });
        //const data = new Blob(['<div>test</div>'], {type : 'text/html'});
        //await navigator.clipboard.write(data);
    }

    async copiar_elemento(texto, url, innerHTML) {
        console.log(navigator.clipboard);
        if (innerHTML) {
            await this.copiar_clipboard(innerHTML);
            return;
        }
        let link;
        const criarElemento = ()=>{
            return new Promise(rr=>{
                let link, span2, div;
                if (MFt.navegador() === 'firefox') { // FIREFOX
                    div = MFt.criaElem('div', {
                        style: {
                            width: '0',
                            height: '0',
                            position: 'fixed',
                            top: '0px',
                            left: '0px',
                            backgroundColor: '#FFF',
                            overflow: 'hidden'
                        }
                    }, document.body);
                    link = MFt.criaElem('span', {
                        innerHTML: innerHTML
                    }, div);
                    span2 = MFt.criaElem('span', {
                        innerHTML: ' '
                    }, div);
                }
                else { // CHROME
                    div = MFt.criaElem('p', {
                        style: {
                            width: '300',
                            height: '30',
                            position: 'fixed',
                            top: '0px',
                            left: '0px',
                            backgroundColor: '#FFF',
                            overflow: 'hidden'
                            // opacity: '0'
                        }
                    }, document.body);
                    link = MFt.criaElem('span', {
                        innerHTML: innerHTML,
                        style: {
                            backgroundColor: '#FFF',
                        }
                    }, div);
                    span2 = MFt.criaElem('span', {
                        innerHTML: ' ',
                        style: {
                            backgroundColor: '#FFF',
                        }
                    }, div);
                }
                setTimeout(()=>{
                    window.getSelection().removeAllRanges();
                    let range = document.createRange();
                    range.setStartBefore(link);
                    range.setEnd(span2, 1);
                    window.getSelection().addRange(range);
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();
                    div.parentNode.removeChild(div);
                    rr();
                }, 60);
            });
        }
        const criarTexto = ()=>{
            return new Promise(rr=>{
                if (MFt.navegador() === 'firefox') {
                    let div = MFt.criaElem('div', {
                        style: {
                            width: '0',
                            height: '0',
                            position: 'fixed',
                            top: '0px',
                            left: '0px',
                            overflow: 'hidden'
                        }
                    }, document.body);
                    let span = MFt.criaElem('span', {
                        innerText: url ? '' : texto
                    }, div);
                    if (url) {
                        link = MFt.criaElem('a', {
                            href: url,
                            target: '_blank',
                            innerText: texto
                        }, div);
                    } else {
                        link = MFt.criaElem('span', {
                            innerText: texto
                        }, div);
                    }
                    let span2 = MFt.criaElem('span', {
                        innerHTML: ' '
                    }, div);
                    setTimeout(()=>{
                        window.getSelection().removeAllRanges();
                        let range = document.createRange();
                        range.setStartBefore(link); // Essa foi a única maneira que encontrei para copiar certo.
                        range.setEnd(span2, 1);
                        window.getSelection().addRange(range);
                        document.execCommand("copy");
                        window.getSelection().removeAllRanges();
                        setTimeout(() => {
                            // Parece que execComand é asyn, por isso o timeout
                            div.parentNode.removeChild(div);
                        }, 300);
                        rr();
                    }, 60);
                }
                else {
                    let div = MFt.criaElem('p', {
                        style: {
                            width: '300',
                            height: '30',
                            position: 'fixed',
                            top: '0px',
                            left: '0px',
                            overflow: 'hidden'
                            // opacity: '0'
                        }
                    }, document.body);
                    if (url) {
                        link = MFt.criaElem('a', {
                            href: url,
                            target: '_blank',
                            innerText: texto,
                            style: {
                                backgroundColor: 'transparent'
                            }
                        }, div);
                    } else {
                        link = MFt.criaElem('span', {
                            innerText: texto,
                            style: {
                                backgroundColor: 'white'
                            }
                        }, div);
                    }
                    let span2 = MFt.criaElem('span', {
                        innerHTML: '&ensp;'
                    }, div);
                    setTimeout(()=>{
                        window.getSelection().removeAllRanges();
                        let range = document.createRange();
                        range.setStartBefore(link);
                        range.setEnd(span2, 1);
                        window.getSelection().addRange(range);
                        document.execCommand('copy');
                        window.getSelection().removeAllRanges();
                        div.parentNode.removeChild(div);
                    }, 60);
                }
            });
        }

        if (innerHTML) await criarElemento();
        else await criarTexto();
    }

    /**
     * Faz um XML_HTTPRequest e tenta associar os dados se os campos forem informados
     * @param url
     * @param tarefa
     * @param dados
     * @param cb
     */
    xml_associado(url, tarefa, dados, cb) {
        dados.task = tarefa;
        MFt.xml({
            url: url,
            get : dados,
            callback: dd=>{
                if (dd && dd.ok) {
                    if (dd.campos) cb(this.associar(dd.dados, dd.campos));
                    else cb(dd.dados);
                }
                else if (dd && dd.erro) alert(dd.erro);
                else {
                    console.group('XML ASSOCIADO');
                    console.log(`TAREFA: ${tarefa}`);
                    console.log(dados);
                    console.groupEnd();
                }
            }
        });
    }

    /**
     * Pega uma array com o nome dos campos e associa a array com os dados recebidos do servidor
     * @param dados
     * @param campos
     * @returns {[]|*[]}
     */
    associar(dados, campos) {
        let ret = [];
        if (dados.length === 0) return [];
        if (dados[0].length !== campos.length) {
            console.log(dados);
            console.log(campos);
            console.log(dados.length, '!==', campos.length);
            throw new Error('Quantidade de campos informados não corresponde aos dados recebidos');
        }
        dados.forEach((dd)=>{
            let tmp = {};
            for(let i = 0; i < campos.length; i++) {
                tmp[campos[i]] = dd[i];
            }
            ret.push(tmp);
        });
        return ret;
    }

    /**
     * Cria um arquivo HTML a partir do outerHTML do elemento indicado
     * @param elem {HTMLElement}
     * @param nup {String}
     * @param usuario {Object}
     * @param cb {Function}
     */
    upload_html_sapiens(elem, nup, usuario, cb) {
        let gerar_ticket = () => {
            let hoje = new Date();
            let ticket = MFt.dates.date2sql(hoje).replace(/:/g, '').replace(/-/g, '').replace(' ', '');
            return `${usuario.id}_${ticket}`;
        };
        let inner = elem.innerHTML;
        let html = `<!DOCTYPE html><html lang="pt-BR"><header><meta charset="utf-8"/><style>body {font-family: 'Titillium Web', 'Arial Narrow', 'Arial', serif;font-size: 10px;} td {padding: 0 7px;} table{border-collapse: collapse;}</style></header><body>${inner}</body></html>`;
        console.log(html);
        console.log(gerar_ticket());
        if (this.validaNUP(nup)) {
            this.sapiens_route(new Payloads().getIdPastaPeloNUP(this.validaNUP(nup.trim())), (ds) => {
                if (ds) {
                    let id_pasta = ds[0].id;
                    this.xml({
                        url: `https://sapiens.agu.gov.br/upload_pasta?pasta=${id_pasta}&ticket_upload=${gerar_ticket()}&tipoDocumento=403`,
                        headers: {
                            'X-File-Name': 'relatorio.html',
                            'X-File-Size': new Blob([html]).size,
                            'X-File-Type': 'text/html',
                            'Content-type': 'application/binary'
                        },
                        justText: 1,
                        msg: html,
                        callback: (d) => {
                            let ok;
                            try {
                                ok = JSON.parse(d);
                            } catch {
                            }
                            if (ok && ok.success) {
                                cb(true);
                            } else if (ok && ok.message) alert(ok.message);
                            else alert('Erro de upload do documento no Sapiens');
                        }
                    });
                } else alert('Erro ao obter o ID do NUP no Sapiens');
            });
        } else throw new Error('Erro no NUP');
    }

    femea(st) {
        if (!st) return true;
        st = this.ascii_mf(st).toLowerCase();
        const partes = st.split(' ');
        let termo = partes[0];
        if (!isNaN(partes[0].substr(0,1))) termo = partes[1];
        var femininos = [
            'consultoria',
            'consultoria-geral',
            'superintendencia',
            'uniao',
            'unidade',
            'subsecretaria',
            'subdiretoria',
            'segunda',
            'secretaria-geral',
            'secretaria-executiva',
            'secretaria',
            'prefeitura',
            'policlinica',
            'ouvidoria',
            'odontoclinica',
            'fundacao',
            'fazenda',
            'estacao',
            'escola',
            'diretoria',
            'diretoria-geral',
            'direcao',
            'delegacia',
            'coudelaria',
            'controladoria',
            'controladoria-geral',
            'consultoria',
            'companhia',
            'comissao',
            'cinemateca',
            'capitania',
            'caixa',
            'brigada',
            'biblioteca',
            'bateria',
            'base',
            'agencia',
            'advocacia-geral',
            'academia',

            'maria', 'francislea', 'joelia', 'luciana', 'marcela', 'monica', 'patricia', 'rafaela', 'silvia', 'stephanie', 'teresa',
            'ana', 'ingrid', 'aline', 'luzia', 'vanessa', 'keila', 'queila', 'rute', 'elaine', 'eline', 'tirza', 'giovanna', 'giovana',
            'taise', 'gabriela', 'flavia', 'fernanda'

        ];
        return femininos.some(d=>st.indexOf(d) === 0);
    };

    /**
     * Retorna um innerHTML de parágrafo do tipo Sapiens
     * @param txt {string}
     * @param classe {string}
     * @param tipo {string} Para predefinir algum tipo de elemento específico tal como o H1, H2, H3...
     * @return {string}
     */
    par(txt, classe, tipo='') {
        if (txt) classe = classe || 'numerado';
        txt = txt || '</br>';
        let tmp = '';
        try {
            if (tipo) {
                tmp += `<${tipo}>${(txt || '')}</${tipo}>`;
            } else if (classe === 'citacao' || classe === 'blockquote') {
                tmp += '<blockquote>' + (txt || '') + '</blockquote>';
            } else if (classe && (classe.toLowerCase() === 'h1' || classe.toLowerCase() === 'h2')) {
                tmp += `<${classe}>${(txt || '')}</${classe}>`;
            } else if (classe === 'html') {
                tmp += txt; // Neste caso, o conteúdo informado já é HTML puro
            } else {
                if (classe) tmp += '<p class="' + classe + '">';
                else tmp += '<p>';
                if (txt) tmp += txt || '';
                else tmp += '&nbsp;';
                tmp += '</p>';
            }
        }
        catch (e) {
            console.trace();
            console.log(classe);
            throw e;
        }
        return tmp;
    };

    lista2texto(m, upper, obj) {
        var tmp = '', separador = ['(', ')'];
        if (obj && obj.separador) separador = obj.separador;
        var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z'];
        if (m.length === 1) return m[0];
        else {
            for(var i = 0, max = m.length; i < max; i++) {
                if (obj && obj.letras) tmp += separador[0] + letras[i] + separador[1] + ' ';
                tmp += m[i];
                if (i < max - 2 && max > 2) tmp += ', ';
                if (i === max - 2) tmp += (upper ? ' E ' : ' e ');
            }
        }
        return tmp;
    }


    /**
     * Recebe uma array de strings ou uma string e retorna como uma citação para o editor do Sapiens
     * @param arr
     * @return {string}
     */
    citacao(arr){
        var ret = '';
        if (Object.prototype.toString.call(arr) === '[object Array]') {
            for(var i = 0, max = arr.length; i < max; i++){
                ret += this.par(
                    arr[i],
                    'citacao'
                );
            }
        }
        else if(Object.prototype.toString.call(arr) === '[object String]') {
            ret += this.par(
                arr,
                'citacao'
            );
        }
        return ret;
    };

    brasao(){
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAIAAABI9cZ8AAAACXBIWXMAAAsUAAALFAFS3jpnAAAcf0lEQVR4nMXbebxVYxcH8BMXmechM4VQvIlIhkhRkVS4DTJGUqSJilRCwm3QYEylUqSklFmUyJR5njPPU2Z6v/bSfnfn3qvb4PPuP85n332e/Tzrt9Zv/dZ69j63YNGiRbl/5zBzuXLlTjzxxNNPP71WrVrxZ/rtn3/+ucoqq3z44Yfnn3/+zTffnPftyj0K/qV5HYx++umnP/vss8cff7xfv34zZ878448/Vl111VyCH8JOnTrts88+0E6YMKGwsPDfs2RFQaYR+P333wsK8mfr2bNnjRo1Fi5c+O2333bv3v2kk07aZZddjPziiy+mT5/+9ddfP//88zVr1iwqKjr00EM322yz7L1Zj6xgkFcUpOV79erVqlWrzTfffP3118/aB9JBBx200047TZ06dauttlpttdWuv/764447TmzLly+/5ppr/vrrr88++6wBm2yyyfHHH//QQw9l8Xz//feiPXDgwIsuumgFjVwJdBUloRAcUN97771zzjkHwssuuwyYRo0aGfDmm2/WrVt37bXX/umnn7bccssPPvjg888/32CDDeAx5qOPPqpUqdL8+fOxer/99jN+4sSJTi644AKO4K8Vt3CFQCLe22+/fcABB3To0GHy5Mn33HPPk08+ufHGG4uPsBxyyCEwGyZiwvXpp5/usccep512miQcNmwYojoBEuZ9990XV3v06NGmTRucHzx48Jw5c/bee2+RJ0vDhw9v167d/w0kgwC48sorBwwYQFrWWWedjh07vvvuu0yXaU888QRsX331VZUqVcR23XXX9acY4iQM22+/PQrQVayuXbu2i9JyzJgxTpDcgC222AJ4V2688cYVMXJFQTqaN2/OzS+88IKAqBa33Xbb+++/f8QRRyDnwQcfDLxoO/ntt9+YfvLJJ9OhPffcc9SoUUzffffdhZfAvvTSS6+//vpRRx3VoEGDevXqNW7cONgxZMgQAwQfR8wgq/8PIJ955hkw1Il33nkH1FdfffWbb76RdcB07dr1yCOPvPzyy6+44gphVA8hwc/69evLt6FDh86ePZtQ9e3b99xzz7333nulNCS33367wN5yyy3iTIouvvji/fff/8ADD7zhhhtAXW47ywRS9qPW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";
    };

    html_base() {
        return '<!DOCTYPE html>\n' +
            '<html lang="pt-BR">\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '    <!-- Criado com auxilio de computador -->\n' +
            '    <style type="text/css">\n' +
            '        p { text-indent: 25mm; text-align: justify; font-family:"Times New Roman, Times, serif"; font-size: 11pt; margin-top: 0; margin-bottom: 0.2em; line-height: 1.2em; }\n' +
            '        body { font-family:"Times New Roman, Times, serif"; font-size: 11pt; counter-reset: H1 numerado; margin-top: 5%; margin-right: auto; margin-left: auto; max-width: 210mm; line-height: 1.2em; }\n' +
            '        h1:before { content: counter(H1) ". "; counter-increment: H1; display: inline-block; width: 25mm; }\n' +
            '        h1 { counter-reset: H2; font-family:"Times New Roman, Times, serif"; font-size: 11pt; text-align: justify; font-weight: bold; text-transform: uppercase; margin-top: 0; margin-bottom: 0.2em; line-height: 1.2em; }\n' +
            '        h2:before { content: counter(H1) "." counter(H2) " "; counter-increment: H2; display: inline-block; width: 25mm; }\n' +
            '        h2 { font-family:"Times New Roman, Times, serif"; font-size: 11pt; text-align: justify; font-weight: bold; margin-top: 0; margin-bottom: 0.2em; line-height: 1.2em; }\n' +
            '        p.numerado:before { content: counter(numerado) ". "; counter-increment: numerado; display: inline-block; width: 25mm; font-weight: normal; }\n' +
            '        p.numerado { text-indent: 0mm; text-align: justify; font-family:"Times New Roman, Times, serif"; font-size: 11pt; margin-top: 0; margin-bottom: 0.2em; line-height: 1.2em; font-weight: normal; }\n' +
            '        img { max-width: 185mm; }\n' +
            '        table { border-width: 1px; border-spacing: 2px; border-color: black; border-collapse: collapse; font-size: 11pt; max-width: 210mm; }\n' +
            '        table th { border-width: 1px; padding: 2px; border-color: black; font-size: 11pt; }\n' +
            '        table td { border-width: 1px; padding: 2px; border-color: black; font-size: 11pt; }\n' +
            '        table td p { text-align: justify; text-indent: 0mm; }\n' +
            '        ul { font-family:"Times New Roman, Times, serif"; font-size: 11pt; text-align: justify; list-style-type: circle; margin-left: 18mm; }\n' +
            '        ol { font-family:"Times New Roman, Times, serif"; font-size: 11pt; text-align: justify; margin-left: 18mm; }\n' +
            '        blockquote { font-family:"Times New Roman, Times, serif"; font-size: 10pt; text-align: justify; padding-left: 40mm; padding-right: 0mm; margin-top: 0; margin-bottom: 0.2em; margin-right: 0mm; }\n' +
            '        .centralizado { text-align:center; text-indent: 0; }\n' +
            '        .direita { text-align:right; text-indent: 0; }\n' +
            '        .esquerda { text-align: left; text-indent: 0; }\n' +
            '        p span.cke_widget_inline { text-indent: 0mm !important; }\n' +
            '        section ol { font-family:"Times New Roman, Times, serif"; margin-left: 2mm !important; }\n' +
            '        section.footnotes { margin-top: 4.2mm; padding-top: 2.2mm; }\n' +
            '        span[data-service] { /* Styles */ background-color: yellow; font-family:"Courier"; }\n' +
            '    </style>\n' +
            '</head>\n' +
            '<body>\n' +
            '';
    }

    corrigir_nome(nome) {
        // Basicamente retira o nome "UNIÃO" que está no início do nome dos órgãos
        const rex = new RegExp("^\\s*(UNIÃO|uniao)\\s*\-\\s*", "gi");
        return nome.replace(rex, "");
        /*
        var ops = ['UNIÃO - ', 'UNIÃO-', 'UNIÃO '];
        for(var i = 0, max = ops.length; i < max; i++) {
            if (nome.indexOf(ops[i]) === 0) {
                return nome.substring(ops[i].length);
            }
        }
        return nome;
         */
    }

    cabecalho(tarefa){
        var ano = new Date().getFullYear();
        var p = '<p class="centralizado"><img src="';
        p += this.brasao() + '"/><br />';
        p += '<strong>ADVOCACIA-GERAL DA UNIÃO</strong><br />';
        p += `CONSULTORIA-GERAL DA UNIÃO<br />`;
        p += tarefa.setorResponsavel.unidade.nome + '<br /></p>';
        p += '<hr />';
        // DESPACHO N. ***(...)
        p += `<p class="esquerda"><strong>PARECER N. XXX/${ano.toString()}/${tarefa.setorResponsavel.sigla}/${tarefa.setorResponsavel.unidade.sigla}/CGU/AGU</strong></p>`;
        p += '<p class="esquerda">PROCESSO N. ' + this.formatanup(tarefa.pasta.NUP) + '</p>';
        p += '<p class="esquerda">ORIGEM: ' + this.corrigir_nome(tarefa.pasta_completa.procedencia.nome) + '</p>';
        //p += '<p class="esquerda">ASSUNTO: </p>';
        return p;
    }

    encontrar_tarefa(id_pasta, id_tarefa, cb) {
        let page = 1;
        let regs = [];
        let limit = 500;
        let dentro = rs=>{
            for(let i = 0; i < rs.length; i++) {
                if (rs[i].id === id_tarefa) {
                    console.log(`TAREFA ENCONTRADA: ID ${id_tarefa}`);
                    console.log(rs[i]);
                    return true;
                }
            }
            return false;
        };
        let doit = ()=>{
            this.sapiens_route_completo(new Payloads().getTarefas(id_pasta, page, limit), res=>{
                if(res && res.ok) {
                    for(let i = 0; i < res.dados.length; i++) regs.push(res.dados[i]); // Nao sei porque .concat nao funcionou
                    page++;
                    // console.log(regs);
                    // console.log(regs.length, res.tudo[0].result.total);
                    if (dentro(res.dados)) {
                        cb(true);
                    }
                    else {
                        if (regs.length < res.tudo[0].result.total) doit();
                    }
                }
                else {
                    console.log(`FALHA AO PROCURAR A TAREFA ID ${id_tarefa} NA PASTA ID ${id_pasta}`);
                    cb(false);
                }
            });
        };
        doit();
    }

    encontrar_tarefa_async(id_pasta, id_tarefa, cb) {
        return new Promise(rr=>{
            let page = 1;
            let regs = [];
            let limit = 500;
            let dentro = rs=>{
                for(let i = 0; i < rs.length; i++) {
                    if (rs[i].id === id_tarefa) {
                        console.log(`TAREFA ENCONTRADA: ID ${id_tarefa}`);
                        console.log(rs[i]);
                        return true;
                    }
                }
                return false;
            };
            let doit = ()=>{
                this.sapiens_route_completo(new Payloads().getTarefas(id_pasta, page, limit), res=>{
                    if(res && res.ok) {
                        for(let i = 0; i < res.dados.length; i++) regs.push(res.dados[i]); // Nao sei porque .concat nao funcionou
                        page++;
                        if (dentro(res.dados)) {
                            rr(true);
                        }
                        else {
                            if (regs.length < res.tudo[0].result.total) doit();
                        }
                    }
                    else {
                        console.log(`FALHA AO PROCURAR A TAREFA ID ${id_tarefa} NA PASTA ID ${id_pasta}`);
                        rr(false);
                    }
                });
            };
            doit();
        });
    }

    /**
     * Cria uma tarefa no Sapiens e verifica se a tarefa foi efetivamente criada. Retorna um callback com true, se tudo for ok.
     * @param setorResponsavelID {Number}
     * @param setorOrigemID {Number}
     * @param nup {String}
     * @param advID {Number}
     * @param tipoTarefaID {Number}
     * @param finalPrazo {Date}
     * @param obs {String} Opcional
     * @param urgente {String} Opcional
     * @param inicioPrazo {Date} Opcional
     * @param postIt {String} Opcional
     * @param tramitar
     * @param cb {Function} Retorna TRUE se deu certo.
     */
    criar_tarefa_e_conferir(setorResponsavelID, setorOrigemID, nup, advID, tipoTarefaID, finalPrazo, obs, urgente, inicioPrazo, postIt, tramitar, cb) {
        let id_pasta, id_tarefa;
        if (this.validaNUP(nup)) {
            nup = this.validaNUP(nup);
        }
        else {
            console.log('ERRO: NUP INVALIDO!');
            cb(false);
        }
        this.sapiens_route(new Payloads().getIdPastaPeloNUP(nup), pasta=>{
            if (pasta) {
                id_pasta = pasta[0].id;
            }
            else {
                console.log('ERRO AO SE OBTER O ID DA PASTA');
                cb(false);
                return;
            }
            this.sapiens_route_completo(new Payloads().criaTarefaDistAutomatica(
                setorResponsavelID, setorOrigemID, id_pasta, tipoTarefaID, finalPrazo, obs, urgente, postIt, tramitar, advID,
            ), res=>{
                if (res) {
                    console.log(res);
                    if (res.ok && res.dados[0].id) {
                        id_tarefa = res.dados[0].id;
                        console.log(`CONFERINDO TAREFA CRIADA, ID: ${id_tarefa}`);
                        this.encontrar_tarefa(id_pasta, id_tarefa, res=>{
                            if (res) {
                                cb(true);
                            }
                        });
                    }
                }
                else {
                    console.log('TAREFA NAO CRIADA');
                    cb(false);
                }
            });
        });

    }

    // TODO: excluir esta funcao no Super
    async criar_tarefa_e_conferir_async(setorResponsavelID, setorOrigemID, nup, advID, tipoTarefaID, finalPrazo, obs, urgente, inicioPrazo, postIt, tramitar, cb) {
        let id_pasta, id_tarefa;
        if (this.validaNUP(nup)) {
            nup = this.validaNUP(nup);
        }
        else {
            console.log('ERRO: NUP INVALIDO!');
            return {erro:'NUP Invalido'};
        }
        let res_pasta = await this.sapiens_route_completo_async(new Payloads().getIdPastaPeloNUP(nup));
        if (!res_pasta || !res_pasta.ok) return {erro:'ID da Pasta nao encontrado'};
        const pasta = res_pasta.dados;
        if (pasta) {
            id_pasta = pasta[0].id;
        }
        else {
            console.log('ERRO AO SE OBTER O ID DA PASTA');
            return {erro:'Erro ao se obter o ID da Pasta'};
        }
        let res = await this.sapiens_route_completo_async(new Payloads().criaTarefaDistAutomatica(
            setorResponsavelID, setorOrigemID, id_pasta, tipoTarefaID, finalPrazo, obs, urgente, postIt, tramitar, advID,
        ));
        if (res) {
            console.log(res);
            if (res.ok && res.dados[0].id) {
                id_tarefa = res.dados[0].id;
                console.log(`CONFERINDO TAREFA CRIADA (ASYNC), ID: ${id_tarefa}`);
                let tarefa_encontrada = await this.encontrar_tarefa_async(id_pasta, id_tarefa);
                return tarefa_encontrada ? {'ok':'ok'} : {erro:'Tarefa nao encontrada'};
            }
        }
        else {
            console.log('TAREFA NAO CRIADA');
            return {erro:'Tarefa nao criada'};
        }
    }

    get(params, cb) {
        MFt.xml({
            url: this.mp,
            get: params,
            callback: dados=>{
                if (dados && dados.ok) {
                    cb(dados.dados);
                }
                else if (dados && dados.erro) {
                    alert(dados.erro);
                    cb(false);
                }
                else {
                    console.log(params);
                    alert('Erro desconhecido');
                    cb(false);
                }
            }
        });
    }

    /**
     * Transforma número no formato moeda sem o R$
     * @param num
     * @returns {string}
     */
    num2real(num) {
        const adicionar_pontos = ss=>{
            for(let i = ss.length - 3; i >= 0; i -= 3) {
                if (i < ss.length && i) {
                    ss = ss.substr(0,i) + '.' + ss.substr(i);
                }
            }
            return ss;
        };
        let valor = num.toFixed(2);
        let pp = valor.split('.');
        return adicionar_pontos(pp[0])  + ',' + pp[1];
    }

    string2float(num) {
        let exp = num.toString().trim().replaceAll(/\./g, '').replaceAll(/,/g, '.');
        let val = parseFloat(exp);
        return Number.isNaN(val) ? NaN : val;
    }

    sonumeros(s) {
        let ret = '';
        for(let i = 0; i < s.length; i++) {
            if (s[i] >= '0' && s[i] <= '9') ret += s[i];
        }
        return ret;
    }

    conferirCPF(s) {
        if (typeof s !== 'string') return '';
        let cpf = this.sonumeros(s);
        let soma = 0;
        if (cpf.length !== 11 && cpf.length !== 14) return false;
        const tamanho = cpf.length;
        for(let i = 0; i < tamanho - 2; i++) {
            soma += parseInt(cpf[i]) * ((tamanho - 1) - i);
        }
        let d1 = (()=>{
            if (soma % 11 < 2) return 0;
            else return 11 - (soma % 11);
        })();
        if (d1 === 10) d1 = 0;
        let tmp = cpf.substring(0, tamanho - 1);
        soma = 0;
        for(let i = 0; i < tamanho - 1; i++) {
            soma += parseInt(cpf[i]) * (tamanho - i);
        }
        let d2 = (()=>{
            if (soma % 11 < 2) return 0;
            else return 11 - (soma % 11);
        })();
        console.log('CPF DV:', d1.toString() + d2.toString());
        return cpf === (cpf.substring(0, tamanho - 2) + d1.toString() + d2.toString());
    }

    conferirCNPJ(s) {
        if (typeof s !== 'string') return '';
        let cnpj = this.sonumeros(s);
        let soma = 0;
        if (cnpj.length !== 14) return false;
        const tamanho = cnpj.length;
        const m1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const m2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        for(let i = 0; i < m1.length; i++) {
            soma += m1[i] * parseInt(cnpj[i]);
        }
        let d1 = (()=>{
            const resto = soma % 11;
            if (resto < 2) return 0;
            else return 11 - resto;
        })();
        if (d1 === 10) d1 = 0;
        soma = 0;
        for(let i = 0; i < m2.length; i++) {
            soma += m2[i] * parseInt(cnpj[i]);
        }
        let d2 = (()=>{
            const resto = soma % 11;
            if (resto < 2) return 0;
            else return 11 - resto;
        })();
        console.log('CNPJ DV:', d1.toString() + d2.toString());
        return cnpj === (cnpj.substring(0, tamanho - 2) + d1.toString() + d2.toString());
    }

    /**
     * Formata CPF e CNPJ
     * @param s
     * @returns {string}
     */
    formatarCPF(s) {
        if (typeof s !== 'string') return '';
        s = this.sonumeros(s);
        if (s.length === 11) {
            return `${s.substring(0, 3)}.${s.substring(3, 6)}.${s.substring(6, 9)}-${s.substring(9, 12)}`;
        }
        else if (s.length === 14) { // CNPJ
            const t = s.length;
            let cnpj = s.substring(0, 2) + '.';
            cnpj += s.substring(2, 5) + '.';
            cnpj += s.substring(5, 8) + '/';
            cnpj += s.substring(8, 12) + '-';
            cnpj += s.substring(12, 14);
            return cnpj;
        }
        return 'ERRO CPF/CNPJ';
    }

    relacao_texto(itens) {
        let ret = '';
        itens.forEach((d, i)=>{
            ret += d;
            if (i === itens.length - 2) ret += ' e ';
            else if (i < itens.length - 1) ret += ', ';
        });
        return ret;
    }

    ascii_mf(s) {
        if (typeof s !== 'string') {
            console.trace();
            console.log('%cascii_mf() - parametro passado nao string', 'color: red; font-weight: bold;');
            return s;
        }
        const a = 'áàâãéêíóõôúüçÁÀÂÃÉÊÍÓÕÔÚÜÇ';
        const b = 'aaaaeeiooouucAAAAEEIOOOUUC';
        for(let i = 0; i < a.length; i++) {
            const r = new RegExp(a[i], 'g');
            while (s.search(r) >= 0) s = s.replace(a[i], b[i]);
        }
        return s;
    }

    /**
     * Faz um request com a opção de receber o nome dos campos na key campos e devolve uma array de dicionário.
     * @param url
     * @param params
     * @param method
     * @param aviso
     * @param alertaErro {Boolean} Emite um alert() quando há um erro ou não
     * @returns {Promise<unknown>}
     */
    request_mf(url, params, method='get', aviso=false, alertaErro=true) {
        /*
        Os dados podem vir com os valores e os campos em duas arrays diferentes das seguintes maneiras:
        {
            ok: "ok",
            dados: [ [dado1, dado2, dado3, ...], [dado1, dado2, dado3, ...], ...]
            campos: [campo1, campo2, ...]
        }
        ou ----------------------------------------------
        {
            ok: "ok",
            dados: {
                dados: [ [dado1, dado2, dado3, ...], [dado1, dado2, dado3, ...], ...],
                campos: [campo1, campo2, ...]
            }
        }
        Explicacao: essa segunda forma eh para aproveitar o envio de arquivo do super no backend
        Obviamente que dados podem vir como objeto, exemplo:
        {
            ok: "ok",
            dados: {nome: "abc", idade: 99}
        }
         */
        return new Promise(rr=>{
            const msg = aviso ? new MsgGenerica('Aguarde...', 100, 50) : false;
            let obj = {
                url: url,
                callback: dd=>{
                    if (msg) msg.closeWindow(msg);

                    //console.log(dd);
                    if (dd?.ok && Array.isArray(dd?.dados?.dados) && Array.isArray(dd?.dados?.campos)) {
                        rr(dd.dados.dados.map(d=>{
                            let ret = {};
                            for(let i = 0; i < dd.dados.campos.length; i++) ret[dd.dados.campos[i]] = d[i];
                            return ret;
                        }));
                    }
                    else if (dd?.ok && dd?.dados && !Array.isArray(dd?.campos)) rr(dd.dados);
                    else if (dd?.ok && Array.isArray(dd?.campos) && Array.isArray(dd?.dados)) {
                        rr(dd.dados.map(d=>{
                            let ret = {};
                            for(let i = 0; i < dd.campos.length; i++) ret[dd.campos[i]] = d[i];
                            return ret;
                        }));
                    }
                    else if (dd?.ok) rr(true);
                    else if (dd?.erro) {
                        if (alertaErro) {
                            alert(dd.erro);
                        }
                        rr(false);}
                    else {
                        if (alertaErro) {
                            alert('Erro desconhecido!');
                        }
                        console.group('ERRO DESCONHECIDO DE REQUEST');
                        console.trace();
                        console.groupEnd();
                        rr(false);
                    }
                },
                errorCallback: e=>{
                    if (alertaErro) alert('Erro de conexão!');
                    console.group('ERRO DE CONEXAO');
                    console.log(e);
                    console.groupEnd();
                    rr(false)
                }
            };
            if (method === 'post') obj.post = params;
            else obj.get = params || '';
            MFt.xml(obj);
        });
    }

    /**
     * Faz um request com a opção de receber o nome dos campos na key campos e devolve uma array de dicionário.
     * @param url
     * @param params
     * @param method
     * @param aviso
     * @param throwError Trigger an error when there is some network problem
     * @param timeout
     * @param timeout
     * @param avisoErro
     * @returns {Promise<unknown>}
     */
    static request_mf_static(url, params, method='get', aviso=false, throwError=false, timeout=120000, avisoErro=true) {
        return new Promise(rr=>{
            const msg = aviso ? new MsgGenerica('Aguarde...', 100, 50) : false;
            let obj = {
                url: url,
                timeout,
                callback: dd=>{
                    if (msg) msg.closeWindow(msg);
                    if (dd?.ok && !dd?.campos) rr(dd.dados);
                    else if (dd?.ok && dd?.campos && dd?.dados) {
                        rr(dd.dados.map(d=>{
                            let ret = {};
                            for(let i = 0; i < dd.campos.length; i++) ret[dd.campos[i]] = d[i];
                            return ret;
                        }));
                    }
                    else if (dd?.erro) {alert(dd.erro); rr(false);}
                    else {
                        if (throwError) {
                            throw new Error('Erro de rede');
                        }
                        else {
                            if (avisoErro) alert('Erro desconhecido!');
                            rr(false);
                        }
                    }
                },
                errorCallback: e=>{
                    alert('Erro de conexão!');
                    console.log(e);
                    rr(false)
                },
                ontimeout: ()=>{
                    console.warn('Timeout');
                    rr(false);
                }
            };
            if (method === 'post') obj.post = params;
            else obj.get = params || '';
            MFt.xml(obj);
        });
    }

    request_sapiens(msg, aviso=true) {
        return new Promise(rr=>{
            const box = aviso ? new MsgGenerica('Aguarde Sapiens...', 100, 50) : false;
            this.sapiens_route(msg, dd=>{
                if (box) box.closeWindow(msg);
                rr(dd);
            });
        });
    }

    incluir_doc_sapiens(inner, nup, id_user, cb) {
        let gerar_ticket = ()=>{
            let hoje = new Date();
            let ticket = MFt.dates.date2sql(hoje).replace(/:/g, '').replace(/-/g, '').replace(' ', '');
            return `${id_user}_${ticket}`;
        };
        let html = `<!DOCTYPE html><html lang="pt-BR"><header><meta charset="utf-8"/><style>body {font-family: 'Arial', serif;font-size: 12px;} td {padding: 0 7px;} table{border-collapse: collapse;}</style></header><body>${inner}</body></html>`;
        if (this.validaNUP(nup)) {
            this.sapiens_route(new Payloads().getIdPastaPeloNUP(this.validaNUP(nup.trim())), (ds)=>{
                if (ds) {
                    let id_pasta = ds[0].id;
                    this.xml({
                        url: `https://sapiens.agu.gov.br/upload_pasta?pasta=${id_pasta}&ticket_upload=${gerar_ticket()}&tipoDocumento=403`,
                        headers: {
                            'X-File-Name': 'relatorio.html',
                            'X-File-Size': new Blob([html]).size,
                            'X-File-Type': 'text/html',
                            'Content-type': 'application/binary'
                        },
                        justText: 1,
                        msg: html,
                        callback: (d)=>{
                            let ok;
                            try {
                                ok = JSON.parse(d);
                            }
                            catch{}
                            if (ok && ok.success) {
                                cb();
                            }
                            else if (ok && ok.message) alert(ok.message);
                        }
                    });
                } else alert('Erro de comunicação com o Sapiens');
            });
        } else {
            alert('NUP inválido');
        }
    }

    esperar(ms) {
        return new Promise(rr=>{
            setTimeout(()=>{
                rr(true);
            }, ms);
        });
    }

    static esperar_static(ms) {
        return new Promise(rr=>{
            setTimeout(()=>{
                rr(true);
            }, ms);
        });
    }

    /**
     * @param dias {Number}
     * @param inicio {Date}
     * @param feriados {Array} Cada item deve ser um dict com ANO, mes e dia, tal como feriadosNacionaisFixos, abaixo
     * @returns {{Date, Date}}
     */
    calcular_prazo(dias, feriados=[], inicio=new Date()) {
        inicio = inicio || new Date();
        let primeiroDiaUtil;
        let final;
        const feriadosNacionaisFixos = [
            {dia:1, mes:1}, // Confraternização Universal
            {dia:21, mes:4}, // Tiradentes
            {dia:1, mes:5}, // Dia Mundial do Trabalho
            {dia:7, mes:9}, // Independência do Brasil
            {dia:12, mes:10}, // Nossa Senhora Aparecida
            // {dia:28, mes:10}, // Dia do Servidor Público
            {dia:2, mes:11}, // Finados
            {dia:15, mes:11}, // Proclamação da República
            {dia:25, mes:12}, // Natal
        ];
        const inFeriadosSabadoDomingo = data=>{
            // Verifica se a data está dentro dos feriados nacionais fixos, dos informados no MySQL, sábado ou domingo
            data.setHours(0, 0, 0, 0);
            if (data.getDay() === 0 || data.getDay() === 6) return true;
            return feriadosNacionaisFixos.some(d=>d.mes===data.getMonth()+1 && d.dia===data.getDate()) ||
                feriados.some(f=>f.ano===data.getFullYear() && f.mes===data.getMonth()+1 && f.dia===data.getDate());
        };
        if (isNaN(dias)) throw new Error("Dias precisa ser número");
        if (dias < 1) throw new Error("Precisa ser > 0");
        inicio.setHours(0, 0, 0, 0);
        // Encontra o primeiro dia do prazo
        while(primeiroDiaUtil === undefined){
            inicio = new Date(inicio.getTime() + (1000 * 3600 * 24)); // Soma +1 dia
            inicio.setHours(0, 0, 0, 0);
            if (!inFeriadosSabadoDomingo(inicio)) {
                dias--;
                primeiroDiaUtil = true;
            }
        }
        // Soma os dias restantes à data do primeiro dia do prazo
        final = new Date(inicio.getTime() + (1000 * 3600 * 24 * dias)); // É a data final do prazo. Mas se cair em feriado, sábado ou domingo tem que ser prorrogado para o dia útil seguinte
        // Encontra o final do prazo, porque o prazo final não pode cair em dia não útil
        while(inFeriadosSabadoDomingo(final)){
            final = new Date(final.getTime() + (1000 * 3600 * 24)); // Soma +1 dia
            final.setHours(0, 0, 0, 0);
        }
        final.setHours(23, 59, 59, 999); // 23:59:59:999 do dia final
        return {inicio, fim:final};
    }

    /**
     * @param dias
     * @param feriados {Array} Cada item deve ser um dict com ano, mes e dia, tal como feriadosNacionaisFixos, abaixo
     * @param inicio {Date}
     * @returns {{Date, Date}} inicio e fim
     */
    calcular_prazo_2(dias, feriados=[], inicio=new Date()) {
        inicio = inicio || new Date();
        let ano = new Date().getFullYear();
        let primeiroDiaUtil;
        let final;
        const feriadosNacionaisFixos = [
            {dia:1, mes:1}, // Confraternização Universal
            {dia:21, mes:4}, // Tiradentes
            {dia:1, mes:5}, // Dia Mundial do Trabalho
            {dia:7, mes:9}, // Independência do Brasil
            {dia:12, mes:10}, // Nossa Senhora Aparecida
            // {dia:28, mes:10}, // Dia do Servidor Público
            {dia:2, mes:11}, // Finados
            {dia:15, mes:11}, // Proclamação da República
            {dia:25, mes:12}, // Natal
        ];
        const inFeriadosSabadoDomingo = data=>{
            // Verifica se a data está dentro dos feriados nacionais fixos, dos informados no MySQL, sábado ou domingo
            data.setHours(0, 0, 0, 0);
            if (data.getDay() === 0 || data.getDay() === 6) return true;
            return feriadosNacionaisFixos.some(d=>d.mes===data.getMonth()+1 && d.dia===data.getDate()) ||
                feriados.some(f=>f.ano===data.getFullYear() && f.mes===data.getMonth()+1 && f.dia===data.getDate());
        };
        if (isNaN(dias)) throw new Error("Dias precisa ser número");
        if (dias < 1) throw new Error("Precisa ser > 0");
        inicio.setHours(0, 0, 0, 0);
        // Encontra o primeiro dia do prazo
        while(primeiroDiaUtil === undefined){
            inicio = new Date(inicio.getTime() + (1000 * 3600 * 24)); // Soma +1 dia
            inicio.setHours(0, 0, 0, 0);
            if (!inFeriadosSabadoDomingo(inicio)) {
                dias--;
                primeiroDiaUtil = true;
            }
        }
        // Soma os dias restantes à data do primeiro dia do prazo
        final = new Date(inicio.getTime() + (1000 * 3600 * 24 * dias)); // É a data final do prazo. Mas se cair em feriado, sábado ou domingo tem que ser prorrogado para o dia útil seguinte
        // Encontra o final do prazo, porque o prazo final não pode cair em dia não útil
        while(inFeriadosSabadoDomingo(final)){
            final = new Date(final.getTime() + (1000 * 3600 * 24)); // Soma +1 dia
            final.setHours(0, 0, 0, 0);
        }
        final.setHours(23, 59, 59, 999); // 23:59:59:999 do dia final
        return {inicio, fim:final};
    }

    /**
     * Retorna string no formato hexadecimal, ex.: #12abef
     * @param r {number} menor que 256
     * @param g {number} menor que 256
     * @param b {number} menor que 256
     * @returns {string}
     */
    rbg2hex(r, g, b) {
        const hex = i=>{
            if (!Number.isInteger(i)) throw new Error('Parâmetro não é número inteiro');
            if (i > 255) throw new Error('Parâmetro maior que 255');
            const str = Number(i).toString(16);
            return str.length === 1 ? "0" + str : str;
        };
        return `#${hex(r)}${hex(g)}${hex(b)}`;
    }

    /**
     * Verifica se a string passada corresponde a um número hexadecimal no padrão de seis dígitos iniciado com "#"
     * @param hex {string}
     * @returns {boolean}
     */
    isHexRGB(hex) {
        if (typeof hex !== 'string') return false;
        return hex.search(/^#[a-f0-9]{6}$/gi) === 0;
    }

    /**
     * Retorna uma array de dicionarios para ser utilizado em buscas no Super
     * @param termos {String}
     * @param campo {String} campo do SQL a pesquisar, ex.: nome, sigla...
     * @returns {{nome: string}[]}
     */
    separar_termos(termos, campo="nome") {
        if (typeof termos !== 'string') {
            alert('Termos não é string.');
            throw new Error('Termos não é string');
        }
        return termos.split(' ').map(d=> {
            const c = {};
            c[campo] = `like:%${d}%`;
            return c;
        });
    }

    erro_fatal(msg) {
        alert(msg);
        throw new Error(msg);
    }

    show_item(label, valor, elem) {
        const d1 = MFt.criaElem('div', {}, elem);
        const s1 = MFt.criaElem('span', {
            innerText: label,
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                margin: "0 5px 0 0"
            }
        }, d1);
        const s2 = MFt.criaElem('span', {
            innerText: valor,
            style: {
                fontSize: '14px'
            }
        }, d1);
        return {d1, s1, s2};
    }

    criar_input_normal(label, wp, width) {
        const d1 = MFt.criaElem('div', {
            style: {
                height: '30px',
                display: 'flex',
                alignItems: 'baseline',
                padding: '5px 10px'
            }
        }, wp);
        const span = MFt.criaElem('span', {
            innerText: label,
            style: {
                margin: '0 5px 0 0',
                fontWeight: 'bold'
            }
        }, d1);
        const inp = MFt.criaElem('input', {
            type: 'text',
            style: {
                outline: 'none',
                border: 'none',
                borderBottom: '1px solid #CCC',
                width: width || "100%",
                fontSize: 'inherit',
                fontFamily: 'inherit',
                padding: '5px 5px'
            }
        }, d1);
        return inp;
    }

    criar_elem_prazo(elem) {
        MFt.atribs(elem, {
            style: {
                padding: '5px 10px',
                height: '30px'
            }
        });
        const dlabel = MFt.criaElem('div', {
            innerText: 'PRAZO EM DIAS: ',
            style: {
                display: 'inline-block',
                fontWeight: 'bold'
            }
        }, elem);
        const inp = MFt.criaElem('input', {
            type: 'text',
            style: {
                outline: 'none',
                border: 'none',
                borderBottom: '1px solid #CCC',
                width: '30px',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                padding: '5px 5px'
            }
        }, elem);
        inp.value = '5';
        const ddata = MFt.criaElem('div', {
            style: {
                display: 'inline-block',
                margin: '0 0 0 10px',
                fontWeight: 'bold'
            }
        }, elem);
        inp.onkeydown = e=>{
            if (['ArrowLeft', 'ArrowRight', 'Delete'].some(d=>e.key === d)) {
                console.log('nada');
                return true;
            }
            if (inp.value.length > 1 && e.key !== 'Backspace') {
                e.stopPropagation();
                e.preventDefault(e);
            }
            if (e.key === 'ArrowUp') {
                if (inp.value.length === 0) {
                    inp.value = '1';
                    show_data();
                }
                else {
                    let val = parseInt(inp.value);
                    val++;
                    if (val > 99) val = 99;
                    inp.value = val.toString();
                    show_data();
                }
                return;
            }
            if (e.key === 'ArrowDown') {
                if (inp.value.length === 0) {
                    inp.value = '1';
                    show_data();
                }
                else {
                    let val = parseInt(inp.value);
                    val--;
                    if (val < 1) val = 1;
                    inp.value = val.toString();
                    show_data();
                }
                return;
            }
            if (!['1','2','3','4','5','6','7','8','9','0', 'Backspace'].some(d=>e.key===d)) {
                e.stopPropagation();
                e.preventDefault(e);
            }
        };
        const show_data = ()=>{
            if (inp.value.length) ddata.innerText = `${this.date2normal(this.calcular_prazo_2(parseInt(inp.value)).fim)}`;
            else ddata.innerText = '---';
        };
        inp.oninput = ()=>{show_data()};
        show_data();
        return inp;
    }

    load_image(img, src) {
        return new Promise(rr=>{
            img.onload = ()=>{
                rr();
            };
            img.src = src;
        });
    }

    async anexarImagem(pathImagem, elemHTML, width=16, height=16) {
        return new Promise(rr=>{
            const img = new Image(width, height);
            img.onload = ()=>{
                elemHTML.appendChild(img);
            };
            img.src = pathImagem;
        });
    }

    reduzir_nomes(nome) {
        const vedados = ['de', 'da', 'das', 'dos', 'com'];
        const pp = nome.split(' ');
        let partes = [];
        let final = [];
        let total = 0;
        for(let p of pp) {
            if (this.ascii_mf(p).length >= 3 && !vedados.some(d=>d===this.ascii_mf(p).toLowerCase())) partes.push(p);
            // if (partes.length === 2) break;
        }
        if (partes.length > 0) final.push(partes[0]);
        if (partes.length > 1) final.push(partes[1]);
        if (partes.length > 2) final.push(partes[partes.length - 1]);
        // partes.push(pp[pp.length - 1]);
        return final.join(" ");
    };

    async enviar_mensagem(janelas, tarefa) {
        console.log('Enviar Mensagem -----------------------', janelas, tarefa);
        const navegador = MFt.navegador() === 'firefox' ? browser : chrome;
        if (false && location.href.startsWith("https://supersapiens")) { // chamada veio do content.js
            // todo: ainda vou decidir se faço algo aqui...
        }
        else if (navegador) {  // chamada veio de alguma pagina da extensao
            navegador.tabs.query({}, tabs=>{ // Investigo se há alguma tab do Sapiens aberta
                for(let t of tabs) {
                    if (janelas.some(d=>d.trim().toLowerCase()===t.title.trim().toLowerCase())) {
                        navegador.tabs.sendMessage(t.id, {task:tarefa});
                        // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
                        // browser.tabs.reload(t.id);
                        // break;
                    }
                }
            });
        }
    }

    async registrar_evento(evento) {
        const url_kururu = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.request_mf(url_kururu, {
            task: 'set_historico',
            evento
        }).then(rr=>{
            console.group("Registro de evento --------------------");
            console.log(rr);
            console.groupEnd();
        });
    }

    /**
     * Fornece todas as juntadas do processo dado.
     * @param id_processo
     * @param elem
     * @param criadoPor {boolean} Indica se a pesquisa no Super vai conter as informacoes sobre o autor ou nao, ja que custa mais ter que inclui-las
     * @returns {Promise<*[]|boolean>}
     */
    async obter_juntadas(id_processo, elem, criadoPor=false) {
        let xml = new RequestMF();
        let total = 0;
        let maximo = 100_000_000;
        let juntadas = [];
        while(juntadas.length < maximo) {
            const tempo = new Date();
            const res = await this.super_get(xml, this.get_juntadas(id_processo, juntadas.length, null, this.num_bloco_juntadas, criadoPor));
            if (res?.entities) {
                maximo = res.total;
                juntadas = juntadas.concat(res.entities);
            }
            else {
                alert('Erro de comunicação com o Super');
                return false;
            }
            const lapso = (new Date() - tempo) / 1000; // em segundos
            const docs_por_seg = (res.entities.length / lapso).toFixed(2);
            if (elem instanceof HTMLElement) elem.innerText = `Obtendo ${juntadas.length}/${maximo} entradas. ${docs_por_seg}docs/seg.`;
        }
        return juntadas;
    }

    criar_link_doc(tarefa, documento_id, componente_id, assinado=false, minuta) {
        const tipoTarefa = (()=>{
            switch (tarefa.especieTarefa.generoTarefa.id) {
                // Talvez aqui existam outros tipos de gêneros que devem ser incluídos
                case 2:
                    return 'consultivo';
                case 3:
                    return 'administrativo';
                case 7:
                    return 'judicial';
                default:
                    return 'consultivo';
            }
        })();
        // Parece que o Super está mudando a API, porque já foram várias versões de URL. As versões ultrapassadas estão comentadas.
        const nome_peca = minuta?.tipoDocumento?.nome && minuta?.numeroUnicoDocumentoFormatado ? `${minuta.tipoDocumento.nome} n. ${minuta.numeroUnicoDocumentoFormatado}` : '';
        return assinado ?
            `/pesquisa/sapiensdoc.html?id=${componente_id}&nome_peca=${nome_peca}` :
            `https://supersapiens.agu.gov.br/apps/tarefas/${tipoTarefa}/minhas-tarefas/entrada/tarefa/${tarefa.id}/documento/${documento_id}/(componente-digital/${componente_id}/editor/ckeditor//sidebar:editar/atividade${tipoTarefa === 'consultivo' ? '-consultivo' : ''})`;
        //return `https://supersapiens.agu.gov.br/apps/tarefas/${tipoTarefa}/minhas-tarefas/entrada/tarefa/${tarefa.id}/processo/${tarefa.processo.id}/visualizar/default/documento/${documento_id}`;
        //return `https://supersapiens.agu.gov.br/apps/tarefas/${tipoTarefa}/minhas-tarefas/entrada/tarefa/${tarefa.id}/processo/${tarefa.processo.id}/visualizar/default/documento/${documento_id}/(componente-digital/${componente_id}/editor/ckeditor//sidebar:editar/atividade)`;
    }

    /**
     * Serve para esconder um wrapper, exibir as intruções no lugar e depois voltar o wrapper
     * @param wr
     * @param texto
     * @param style
     * @param exibir_bt
     * @param tempo
     */
    async exibir_instrucoes(wr, texto, style, exibir_bt=true, tempo=1800) {
        const display = getComputedStyle(wr).display;
        const new_wrapper = MFt.criaElem('div', {

        }, wr.parentNode);
        wr.style.display = 'none';
        const divtexto = MFt.criaElem('div', {
            innerHTML: texto || 'Ainda não constam informações sobre',
            style: {
                fontSize: '14px',
                margin: '0 0 10px 0'
            }
        }, new_wrapper);
        if (typeof style === 'object') for(let o in style) if (style.hasOwnProperty(o)) divtexto.style[o] = style[o];
        if (exibir_bt) {
            const bt = new MFt.bt({
                value: 'Voltar',
                width: 100,
                height: 30,
                wrapper: MFt.criaElem('div', {}, new_wrapper),
                callback: () => {
                    new_wrapper.parentNode.removeChild(new_wrapper);
                    wr.style.display = display;
                }
            });
        }
        else {
            await this.esperar(Number.isInteger(tempo) ? tempo : 1800);
            new_wrapper.parentNode.removeChild(new_wrapper);
            wr.style.display = display;
        }
    }

    /**
     * Retira caracteres especiais de strings a fim de evitar problema com o upload de arquivos no Super
     * @param nome
     * @returns {string}
     */
    consertar_nome_arquivo(nome) {
        const a = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '(', ')', '.', ','
        ];
        let nome_retorno = '';
        for(let i of nome) nome_retorno += a.some(d=>d===i) ? i : '_';
        return nome_retorno;
    }

    exibirCampo(label, valor, elem, cor='black', bold=false) {
        if (!(elem instanceof HTMLElement)) {
            throw new Error("Não foi atribuído um elemento do DOM à variável elem");
        }
        MFt.criaElem('span', {
            innerText: `${label}:`,
            style: {
                fontWeight: 'bold',
                marginRight: '7px'
            }
        }, elem);
        MFt.criaElem('span', {
            innerText: valor,
            style: {
                fontWeight: bold ? 'bold' : 'normal',
                color: cor,
            }
        }, elem);
    }

    /**
     * Extrai o conteúdo de um HTML do Super Sapiens sob a forma de Uint8Array
     * @param texto
     * @returns {Uint8Array}
     */
    extract_data_from_conteudo(texto) {
        const str_inicial = 'base64,';
        let inicio = texto.indexOf(str_inicial);
        if (inicio < 0) {
            alert('Dados corrompidos!');
            throw new Error('Dados corrompidos!');
        }
        const dados = texto.substr(inicio + str_inicial.length);
        // console.log(dados);
        // console.log('----------------------------');
        // console.log(btoa(dados));
        return base64DecToArr(dados);
    }

    /**
     * Retorna o HTML de um documento do Super Sapiens sob a forma de texto
     * @param response_super
     * @returns {string}
     */
    extrair_html_from_base64(response_super) {
        const res = this.extract_data_from_conteudo(response_super.conteudo);
        return new TextDecoder().decode(res);
    }
}





































class Crono {
    constructor() {
        this.inicio = new Date();
    }

    get tempo() {
        return parseFloat(((new Date().valueOf() - this.inicio.valueOf()) / 1000).toFixed(3));
    }


}
