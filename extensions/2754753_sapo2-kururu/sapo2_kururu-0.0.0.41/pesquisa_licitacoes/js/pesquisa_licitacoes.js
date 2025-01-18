window.onload = function() {
    let pesquisa = new Pesquisar();
};


class Pesquisar extends Payloads {
    constructor() {
        super();
        this.server = 'https://manoelpaz.com';
        this.sapinho = 'https://manoelpaz.com/cgi-bin/sapinho_pesquisa/client.py';
        this.super_router = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.portalweb = 'https://acervopessoal.org/cgi-bin/portal/portalweb';
        // this.acervoURL = 'http://172.17.24.250/cgi-bin/sapo/pesquisar';
        this.acervoURL = 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar';
        this.acervoURL_py = 'https://acervopessoal.org/cgi-bin/pesquisar/teste_pesquisar_http.py';
        this.mensagem();
        this.filtro_conjurs = [];
        this.configuracao_pesquisa = undefined;
        this.ano = new Date().getFullYear();
        this.inp_pesq = document.getElementById('termos_pesquisa');
        this.wrapper_resultados = document.getElementById('wrapper_resultados');
        this.div_status = document.getElementById('status_pesquisa');
        this.contador = 0;
        this.maximo_de_resultados_permitidos = 200;
        this.dados_compendio = {};
        this.autores = undefined;
        this.xml_consultoria = undefined;
        this.termos_retornados = '';
        this.img_pesquisando = new Image();
        this.img_pesquisando.src = 'images/bob.gif';
        this.ampulheta = new Image(32);
        this.ampulheta.src = "/images/throbber_13.gif";
        this.bt_pesquisa = new MFt.bt({
            value: 'Ok',
            wrapper: document.getElementById('bt_pesquisar'),
            width: '40px',
            height: '30px',
            marginLeft: '5px',
            callback: (e)=>{
                this.iniciar_pesquisa();
            }
        });
        this.inp_pesq.onkeyup = (e) => {
            if (e.key === 'Enter') {
                this.iniciar_pesquisa();
            }
        };
        this.inp_pesq.focus();
        this.checkurl();
    }

    async checkurl() {
        if (Array.isArray(this?.profile?.roles)) {
            if (!this.profile.roles.some(d=>d==="ROLE_ADVOGADO_DA_UNIAO")) {
                alert("Pesquisa restrita apenas a Advogados");
                window.close();
            }
        }
        else {
            alert("Erro interno!");
            window.close();
        }
        if (MFt.urlArgs().termos) {
            this.inp_pesq.value = MFt.urlArgs().termos;
            this.iniciar_pesquisa();
        }
    }

    async iniciar_pesquisa() {
        if (this.inp_pesq.value.length === 0) return;
        this.assinalar_inicio();
        if (this.xml_consultoria) this.xml_consultoria.abort();
        this.total_resultados = 0;
        this.contador = 1;
        MFt.clear(this.wrapper_resultados);
        this.bt_pesquisa.disabled = true;
        await this.pesquisar_consultoria_2();
    }

    assinalar_inicio() {
        MFt.clear(this.div_status);
        let d1 = MFt.criaElem('div', {

        }, this.div_status);
        this.img_pesquisando.height = 60;
        this.img_pesquisando.width = 60;
        d1.appendChild(this.img_pesquisando);
        d1.style.textAlign = 'center';
    }

    finalizar_pesquisa(totalResultados) {
        MFt.clear(this.div_status);
        this.bt_pesquisa.disabled = false;
        if (totalResultados === 0) {
            // MFt.criaElem('p', {
            //     innerText: 'Nenhum resultado encontrado na base.'
            // }, this.wrapper_resultados);
        }
    }

    pesquisar_outro_ano(total) {
        this.ano--;
        if (this.ano > 2013) {
            this.pesquisar_consultoria();
        }
        else this.finalizar_pesquisa();
    }

    async request(url, params, method='get') {
        return new Promise(rr=>{
            let pp = {
                url,
                callback: dd=>{
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
                    else if (dd?.erro) {rr(dd);}
                    else {alert('Erro desconhecido!'); rr(false);}
                }
            };
            pp[method] = params;
            let xml = MFt.xml(pp);
        });
    }

    async pesquisar_consultoria_2() {
        // const maxResultados = this.configuracao_pesquisa?.max_results || 400;
        const jwt = await this.request(this.super_router, {task: 'obterJWT'});
        let totalResultados = 0;
        let res = await this.request(this.portalweb, {
            task: 'pesquisar',
            termos: this.inp_pesq.value,
            jwt
        });
        this.exibir_resultados(res);
        this.finalizar_pesquisa(totalResultados);
    }

    pesquisar_consultoria(cb) {
        this.xml_consultoria = MFt.xml({
            url: this.sapinho,
            get: {
                task: 'pesquisar',
                termos: this.inp_pesq.value,
                advogado: this.filtro_advogado?.id || 0,
                ano: this.ano
            },
            callback: (dados)=>{
                this.bt_pesquisa.disabled = false;
                console.log(dados);
                if (dados && dados.ok) {
                    this.total_resultados += dados.pecas.length;
                    console.log('TOTAL DE PEÇAS ENCONTRADAS:', this.total_resultados);
                    if (!dados.encerrar) {
                        if (cb) cb(dados.termos);
                        if (this.total_resultados < this.maximo_de_resultados_permitidos) {
                            this.pesquisar_outro_ano();
                        }
                        else {
                            this.finalizar_pesquisa();
                        }
                        this.termos_retornados = dados.termos || '';
                    }
                    else {
                        this.finalizar_pesquisa();
                    }
                    this.show_consultoria(dados);
                }
                else {
                    alert('Erro de comunicação! Servidor desligado?');
                }
            }
        });
    }

    pesquisar_compendio(termos) {
        if (termos) {
            MFt.xml({
                url: this.server + '/cgi-bin/savvy/publico.py',
                get: {
                    task: 'todas_noticias',
                    sempre_exibr: 0,
                    termos: termos
                },
                callback: (d) => {
                    if (d && d.ok) {
                        this.dados_compendio = d.dados;
                        this.show_compendio();
                    }
                }
            });
        }
    }

    show_consultoria(dados) {
        let dd = dados.pecas.sort((a,b)=>b[9] - a[9]);
        let pp = dados.paragrafos;
        let last_id_peca = 0;
        if (!dd) {
            alert("Erro interno. Tente novamente.");
            this.finalizar_pesquisa();
        }
        dd.forEach((d)=>{
            if (d[1] !== last_id_peca) {
                let wrapper = MFt.criaElem('div', {
                    style: {
                        margin: '0',
                        padding: '0 0 20px 0',
                        borderBottom: '1px solid #DDD'
                    }
                }, this.wrapper_resultados, {
                    credo: 'credo!'
                });
                this.show_titulo(d, wrapper);
                this.show_assunto(d, wrapper);
                this.show_ementa(d, wrapper);
                this.show_paragrafos(d[1], pp, wrapper);
            }
            last_id_peca = d[1];
        });
    }

    show_titulo(d, wrapper) {
        let titulo = `${d[2].substr(0,1).toUpperCase()}${d[2].substr(1)} n. ${d[3]}/${d[4]}/${d[5]}`;
        let div_titulo = MFt.criaElem('div', {
            style: {
                fontFamily: '"Arial"'
            }
        }, wrapper);
        MFt.criaElem('span', {
            innerText: this.contador.toString() + ') ',
            style: {
                color: '#555'
            }
        }, div_titulo);
        this.contador++;
        let link1 = MFt.criaElem('a', {
            // href: `https://sapiens.agu.gov.br/documento/${d[9]}`,
            href: `../pesquisa/sapiensdoc.html?id=${d[9]}&nome_peca=${encodeURIComponent(titulo)}`,
            target: '_blank'
        }, div_titulo);
        let sp_1 = MFt.criaElem('span', {
            innerHTML: `<b>${titulo}</b>   `  // Parecer num/ano/conjur
        }, link1);
        let sp_2 = MFt.criaElem('span', {
            innerHTML: d[6] ? ` - ${d[6] ? d[6].toUpperCase() : ''}` : '',
            style: {
                fontSize: '14px'
            }
        }, div_titulo);
    }

    show_assunto(d, wrapper) {
        if (d[8]) {
            let div_assunto = MFt.criaElem('div', {
                style: {
                    fontSize: '13px',
                    fontWeight: 'normal',
                    textAlign: 'justify',
                    padding: '1px 7px',
                    borderBottom: '1px dashed #CCC',
                    fontFamily: '"Open Sans", "Arial"'
                }
            }, wrapper);
            MFt.criaElem('span', {
                innerHTML: `<b>ASSUNTO</b>: <i>${d[8]}</i>`
            }, div_assunto);
        }
    }

    show_ementa(d, wrapper) {
        if (d) {
            let div_ementa = MFt.criaElem('div', {
                style: {
                    marginLeft: '300px'
                }
            }, wrapper);
            let pp = d[7].split('\n');
            pp.forEach((d) => {
                MFt.criaElem('p', {
                    innerText: `${d}`,
                    style: {
                        margin: '0',
                        textAlign: 'justify'
                    }
                }, div_ementa);
            });
        }
    }

    show_paragrafos(id_peca, todos_pps, wrapper) {
        for(let i = 0; i < todos_pps.length; i++) {
            if (todos_pps[i][0] === id_peca) {
                let p1 = MFt.criaElem('p', {
                    innerHTML: Destacar.doit(todos_pps[i][1], this.termos_retornados),
                    style: {
                        margin: '0 0 5px 0',
                        textAlign: 'justify',
                        textIndent: '70px'
                    }
                }, wrapper);
            }
        }
    }

    show_compendio() {
        if (this.dados_compendio.noticias.length === 0) return;
        this.dados_compendio.noticias.forEach((d) => {
            let wrapper = MFt.criaElem('div', {
                style: {
                    paddingBottom: '20px'
                }
            }, this.div_resultados_compendio);
            let a = MFt.criaElem('a', {
                href: `${this.server}/cgi-bin/savvy/um.py?id=${d.id}`,
                target: '_blank'
            }, wrapper);
            let p_titulo = MFt.criaElem('p', {
                innerText: d.titulo,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }, a);
            let p_subtitulo = MFt.criaElem('p', {
                innerText: d.subtitulo,
                style: {
                    fontSize: '12px'
                }
            }, wrapper);
        });
    };

    mensagem() {
        MFt.xml({
            url: `${this.server}/cgi-bin/agu/sapiens/mensagem_pesquisa.py`,
            get: {},
            callback: texto=>{
                if (texto) MFt.$('mensagem_pesquisa')['innerHTML'] = texto.msg || '';
            }
        });
    }

    preventDefault(e) {
        console.log('prevent');
        e.preventDefault(e);
    }

    keyDown(e) {
        let keys = []; //[38, 40]; // ATENÇÃO: IMPEDIR O FUNCIONAMENTO DAS TECLAS PRA CIMA E PRA BAIXO AFETA OS ELEMENTOS TEXTAREA E OS COM contenteditable = "true"
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                e.preventDefault(e);
                return;
            }
        }
    };

    request_mf(params, url, tipo='get', msg='Aguarde') {
        url = url || 'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/router.py';
        let cortina = (onoff=true)=>{
            const preventDefault = e=>{
                console.log('prevent');
                e.preventDefault(e);
            };
            const keyDown = e=> {
                let keys = []; //[38, 40]; // ATENÇÃO: IMPEDIR O FUNCIONAMENTO DAS TECLAS PRA CIMA E PRA BAIXO AFETA OS ELEMENTOS TEXTAREA E OS COM contenteditable = "true"
                for (var i = keys.length; i--;) {
                    if (e.keyCode === keys[i]) {
                        e.preventDefault(e);
                        return;
                    }
                }
            };
            const lockWheel = ()=>{
                window.addEventListener('DOMMouseScroll', preventDefault, false);
                window.addEventListener('keydown', keyDown, false);
            };
            const releaseWheel = ()=>{
                console.log('release whell');
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
                window.removeEventListener('keydown', keyDown, false);
            };
            if (!onoff) {
                let pano = MFt.$('div_pano');
                document.body.style.overflow = '';
                if (pano.parentNode) pano.parentNode.removeChild(pano);
                releaseWheel();
                return;
            }
            let tmp;
            document.body.style.overflow = 'hidden';
            let pano = MFt.$('div_pano') || MFt.criaElem('div', {id:'div_pano'});
            MFt.atribs(pano.style, {
                backgroundColor : 'rgba(0,0,0,0.3)',
                top : '0px',
                left : '0px',
                bottom : '0px',
                right : '0px',
                position : 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            });
            pano.style.zIndex = 99;
            let div_box = MFt.criaElem('div', {
                style: {
                    width: '300px',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '6px',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px #000'
                }
            }, pano);
            let div_msg = MFt.criaElem('div', {
                innerText: msg,
                style: {
                    position: 'relative',
                    top: '-3px',
                    fontSize: '18px',
                    fontStyle: 'Arial',
                    fontWeight: 'normal',
                    color: '#000',
                    textShadow: '0 0 1px #DDD'
                }
            }, div_box);
            if (!pano.parentNode) document.body.appendChild(pano);
            lockWheel();
        };
        return new Promise(rr=>{
            cortina();
            let req = {
                url: url,
                callback: dd=>{
                    cortina(false);
                    if (dd?.ok) {
                        rr(dd.dados);
                    }
                    else {
                        if (dd?.erro) {
                            alert(dd.erro);
                        }
                        console.log(req);
                        alert('Erro de comunicação');
                        rr(false);
                    }
                },
                errorCallback: ee=>{
                    cortina(false);
                    console.log(ee);
                    rr(false);
                }
            };
            if (tipo === 'post') req.post = params;
            else req.get = params;
            let xml = MFt.xml(req);
        });
    }

    selecionar_advogado() {
        const d2_height = 30;
        const d1 = MFt.$('advogados_filtro');
        MFt.clear(d1);
        d1.style.position = 'relative';
        d1.style.display = '';
        d1.style.height = '15px';
        MFt.criaElem('span', {
            innerText: 'Selecionar Advogado: ',
            style: {
                margin: '0 10px 0 0'
            }
        }, d1);
        const termos = MFt.criaElem('input', {
            type: 'text',
            style: {
                height: '20px',
                width: '300px'
            }
        }, d1);
        const d2 = MFt.criaElem('div', {
            style: {
                top: '2px',
                left: '130px',
                width: '306px',
                padding: '5px',
                height: `${d2_height}px`,
                overflow: 'scroll',
                overflowX: 'hidden',
                border: '1px solid #000',
                background: 'white',
                position: 'relative',
                boxShadow: '3px 3px 3px #CCC',
                display: 'none'
            }
        }, d1);
        const show = dd=>{
            if (dd.length) {
                MFt.clear(d2);
                MFt.atribs(d2, {
                    style: {
                        minHeight: `${d2_height}px`,
                        maxHeight: `300px`,
                        height: 'auto',
                        display: ''
                    }
                });
                dd.forEach(d=>{
                    let op1 = MFt.criaElem('div', {
                        innerText: `${d[1].toUpperCase()}`,
                        style: {
                            padding: '5px 5px',
                            cursor: 'pointer'
                        }
                    }, d2);
                    op1.setAttribute('id_sapiens', dd[0]);
                    op1.onmouseenter = ()=>{
                        op1.style.backgroundColor = '#FF0';
                    };
                    op1.onmouseleave = ()=>{
                        op1.style.backgroundColor = '#FFF';
                    };
                    op1.onclick = ()=>{
                        this.fixar_advogado(d);
                    };
                });
            }
            else {
                MFt.clear(d2);
                MFt.atribs(d2, {
                    style: {
                        // height: `${d2_height}px`
                        display: 'none'
                    }
                });
                // d2.innerText = 'Sem resultados...';
            }
        };
        termos.focus();
        termos.oninput = ()=>{
            if (termos.value.trim().length > 3) {
                if (this.worker_procurar) this.worker_procurar.terminate();
                this.worker_procurar = new Worker('js/worker_procurar.js');
                this.worker_procurar.postMessage({
                    termos: this.ascii_mf(termos.value.trim().toLowerCase()),
                    lista: this.autores
                });
                this.worker_procurar.onmessage = dd => {
                    show(dd.data);
                };
            }
            else show([]);
        };

    }

    fixar_advogado(d) {
        const d1 = MFt.$('advogados_filtro');
        MFt.clear(d1);
        MFt.criaElem('span', {
            innerText: `Filtro de Advogado: ${d[1].toUpperCase()}`
        }, d1);
        this.filtro_advogado = {id:d[0], nome:d[1]};
        const bt = new MFt.bt({
            value: "Limpar",
            width: 100,
            height: 20,
            marginLeft: '15px',
            wrapper: d1,
            callback: ()=>{
                this.div_autores();
                this.filtro_advogado = undefined;
                this.iniciar_pesquisa();
            }
        });
        this.iniciar_pesquisa();
    }

    ascii_mf(s) {
        const a = 'áàâãéêíóõúüçÁÀÂÃÉÊÍÓÕÚÜÇ';
        const b = 'aaaaeeioouucAAAAEEIOOUUC';
        for(let i = 0; i < a.length; i++) {
            const r = new RegExp(a[i], 'g');
            while (s.search(r) >= 0) s = s.replace(a[i], b[i]);
        }
        return s;
    }

    exibir_resultados(dd) {
        if (dd.length === 0) {
            this.wrapper_resultados.innerText = "Nenhum resultado encontrado";
            return;
        }
        MFt.clear(this.wrapper_resultados);
        for(let d of dd) {
            this.item_resultado(d);
        }
    }

    /**
     *
     * @param nup {string}
     * @returns {string} String vazia se der erro. String com o NUP so com numeros se ok
     */
    validaNUP(nup) {
        // Valida NUPs de 15, 17 e 21 numeros
        // Retorna o numero do NUP so com numeros se tudo ok
        // Retorna False para NUP nao valido
        let tmp = '';
        let acumula = 0;
        let digito1;
        let digito2;
        let j = 2;
        if (typeof nup !== 'string') return '';
        if (nup.length > 0) {
            for (let i of nup) if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].some(d => d === i)) tmp += i;
            if ([15, 17, 21].some(d => d === tmp.length)) {
                const max = tmp.length - 2;
                for (let i = max - 1; i > -1; i--) acumula += parseInt(tmp[i]) * j++;
                digito1 = 11 - (acumula % 11);
                if (digito1 > 9) digito1 -= 10;
                if (`${digito1}` === tmp[max]) {
                    j = 2;
                    acumula = 0;
                    for (let i = max; i > -1; i--) acumula += parseInt(tmp[i]) * j++;
                    digito2 = 11 - (acumula % 11);
                    if (digito2 > 9) digito2 -= 10;
                    if (`${digito2}` === tmp[tmp.length - 1]) return tmp; // retorna só os números(sem ponto, traço e barra)
                }
            }
        }
        return '';
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

    item_resultado(dd) {
        let jaClicou = false;
        const campo = (nome, val, elem, existeNUPSapiens)=>{
            const d = MFt.criaElem('div', {
                style: {
                    fontSize: '14px'
                }
            }, elem);
            const s1 = MFt.criaElem('span', {
                innerText: `${nome}: `,
                style: {
                    fontWeight: 'bold',
                    fontSize: '14px'
                }
            }, d);
            if (this.validaNUP(val) && existeNUPSapiens.length) {
                const s2 = MFt.criaElem('span', {}, d);
                const a1 = MFt.criaElem('a', {
                    href: `/visualizar_nup/index.html?nup=${this.validaNUP(val)}&cache=on`,
                    target: '_blank',
                    innerText: this.formatanup(val)
                }, s2);
                MFt.criaElem('span', {innerText: ' Clique no NUP para abrir o processo'}, s2);
            }
            else {
                const texto = this.validaNUP(val) ? ' Processo não existe no Super ' : ' Número inválido no Gov. Federal ';
                const s2 = MFt.criaElem('span', {
                    innerText: `${this.validaNUP(val) ? this.formatanup(val) : val}`,
                    style: {
                        fontWeight: 'normal',
                        fontSize: '14px',
                    }
                }, d);
                const s3 = MFt.criaElem('span', {
                    innerText: `${nome === "PROCESSO" ? texto : ''}`,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }
                }, d);
            }
            return d;
        };
        const d1 = MFt.criaElem('div', {
            style: {
                pading: '10px 20px',
                margin: '10px 10px 30px 10px'
                //gridTemplateColumns: 'auto auto auto auto'
            }
        }, this.wrapper_resultados);
        campo("DESCRIÇÃO", dd.descricao, d1);
        campo("COMPLEMENTO", dd.descComplementarItemCompra, d1);
        campo("UNIDADE", dd.descUnidadeFornecimento, d1);
        campo("QUANTIDADE", dd.quantidade.toString(), d1);
        campo("VALOR TOTAL", dd.valor, d1);
        campo("VALOR UNITÁRIO", this.valor_valido(dd.valor) ? this.num2real((this.valor_valido(dd.valor) / dd.quantidade)) : "Erro no valor", d1);
        const info = campo("Clique aqui informações sobre a licitação", "", d1);
        info.style.cursor = 'pointer';
        info.onclick = async ()=>{
            if (jaClicou) return;
            jaClicou = true;
            MFt.clear(info);
            info.appendChild(this.ampulheta.cloneNode());
            const jwt = await this.request(this.super_router, {task: 'obterJWT'});
            let res = await this.request(this.portalweb, {task: 'obter_licitacao', jwt, sk: dd.skCompra});
            jaClicou = false;
            if (!Array.isArray(res) || (Array.isArray(res) && res.length === 0)) {
                info.innerText = "Erro ao obter os dados da licitação.";
                return;
            }
            res = res[0];
            console.log(res);
            // Verifica se NUP existe no Super ---------------------
            let existeNUPSapiens;
            if (res?.processo && this.validaNUP(res.processo)) {
                existeNUPSapiens = await this.super_get(new RequestMF(), this.get_id_processo(res.processo), true);
                console.log(existeNUPSapiens);
            }
            // -----------------------------------------------------
            MFt.clear(info);
            info.onclick = null;
            info.style.cursor = 'default';
            info.style.marginLeft = '80px';
            MFt.atribs(info, {
                style: {
                    paddingLeft: '20px',
                    marginLeft: '80px',
                    borderLeft: '1px solid #CCC'
                }
            });
            MFt.clear(info);
            campo("ÓRGÃO SUPERIOR", res.orgaoSuperior, info);
            campo("VINCULAÇÃO", res.orgaoEntidadeVinculada, info);
            campo("UNIDADE GESTORA", res.unidadeGestora, info);
            campo("OBJETO", res.objeto, info);
            campo("NÚMERO", res.numeroLicitacao, info);
            campo("MODALIDADE", res.modalidade, info);
            campo("PROCESSO", res.processo, info, existeNUPSapiens);
            campo("SITUAÇÃO", res.situacao, info);
            campo("DATA DA ABERTURA", res.dataAbertura, info);
            campo("DATA RESULTADO/COMPRA", res.dataResultadoCompra, info);
            campo("INSTRUMENTO LEGAL", res.instrumentoLegal, info);
        }
    }

    /**
     * Transforma número para o formato moeda sem o R$
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

    /**
     * Verifica se um valor está no formato válido, ex.: 100.000,00 ou 1000,00
     * @param val
     * @returns {boolean|number} Falso se errado ou o número float se certo
     */
    valor_valido(val) {
        let howmany = regex=>{
            let total = 0, res;
            do {
                res = regex.exec(val);
                if (res) total++
            } while (res);
            return total;
        }
        val = val.replace('R$', '');
        val = val.replace('r$', '');
        if (val.length > 18) return false;
        if (howmany(/,/g) > 1) return false;
        if (howmany(/\.\d{2}\./g)) return false;
        if (howmany(/\.\d{2},/g)) return false;
        if (howmany(/\.\d{2}$/g)) return false;
        val = val.replace(/\./g, '');
        let p1, p2;
        if (howmany(/,/g)) {
            p1 = val.split(',')[0];
            p2 = val.split(',')[1].substr(0,2);
        }
        else {
            p1 = val;
            p2 = '00';
        }
        return parseFloat(`${p1}.${p2}`);
    }
}
