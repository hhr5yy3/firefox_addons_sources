window.onload = function() {
    let pesquisa = new Pesquisar();
};


class Pesquisar {
    constructor() {
        this.server = 'https://manoelpaz.com';
        this.sapinho = 'https://manoelpaz.com/cgi-bin/sapinho_pesquisa/client.py';
        this.super_router = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        // this.acervoURL = 'http://172.17.24.250/cgi-bin/sapo/pesquisar';
        this.acervoURL = 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar';
        this.url_lista_advogados = undefined;
        this.URLPesquisa = undefined; // Vai ser definido em this.carregar_configuracao_pesquisa()
        this.mensagem();
        this.conjurs = [];
        this.dicas_pesquisa = {};
        this.nao_exibir_dica_pesquisa = false;
        this.filtro_conjurs = [];
        this.configuracao_pesquisa = undefined;
        this.regex_pecas = [ // This Regex is replaced with the one who comes from server
            "(parecer|nota|despacho|cota|nota juridica)\\s+[n\\.º]*\\s*[0-9]{0,5}/[0-9]{4}\\/*\\s*[a-zA-ZôÔçÇõÕ\\/\\-]+",
        ];
        this.legislacao = {}; // Vai armazenar os dados do filtro legislativo
        this.ano = new Date().getFullYear();
        this.inp_pesq = document.getElementById('termos_pesquisa');
        this.div_wrapper_compendio = document.getElementById('wrapper_compendio');
        this.div_resultados_compendio = document.getElementById('resultados_compendio');
        this.div_resultados = document.getElementById('resultados');
        this.div_status = document.getElementById('status_pesquisa');
        this.contador = 0;
        this.maximo_de_resultados_permitidos = 200;
        this.dados_compendio = {};
        this.autores = undefined;
        this.xml_consultoria = undefined;
        this.termos_retornados = '';
        this.img_pesquisando = new Image();
        this.img_pesquisando.src = 'images/bob.gif';
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
        this.obter_dados();
        this.div_autores();
        this.div_pesquisa_normativa();
        this.inp_pesq.onkeyup = (e) => {
            if (this.inp_pesq.value.trim().length === 0) this.nao_exibir_dica_pesquisa = false;
            let res = this.identificar_orgaos();
            this.exibir_lista_fitro_orgaos();
            if (e.key === 'Enter') {
                this.iniciar_pesquisa();
            }
        };
        this.inp_pesq.oninput = ()=>{
            const exps = [
                'parecer',
                'nota',
                'cota',
                'despacho',
                'informacoes',
                'referencial'
            ];
            if (exps.some(d=>this.ascii_mf(this.inp_pesq.value.toLowerCase()).indexOf(d) >= 0)) {
                this.show_dica_pesquisa('peca_juridica');
            }
            else {
                this.show_dica_pesquisa();
            }
        }
        this.inp_pesq.focus();
        this.checkurl();
    }

    exibir_lista_fitro_orgaos() {
        if (this.filtro_conjurs.length) {
            let l = [];
            for(let c of this.filtro_conjurs) l.push(c['nome']);
            MFt.$('filtro_orgaos').style.display = 'block';
            MFt.$('filtro_orgaos').innerText = `Resultados apenas em ${l.join(", ")}`;
        }
        else MFt.$('filtro_orgaos').style.display = 'none';
    }

    async checkurl() {
        this.inp_pesq.value = MFt.urlArgs()?.termos || '';
        await this.carregar_configuracao_pesquisa();
        if (MFt.urlArgs()?.termos) {
            //this.inp_pesq.value = MFt.urlArgs().termos;
            //await this.exibir_mensagem(); // POSSIBILIDADE DE PESQUISA NO COMPRASNET
            this.iniciar_pesquisa();
        }
    }

    async iniciar_pesquisa() {
        this.show_dica_pesquisa(); // clear tip
        this.nao_exibir_dica_pesquisa = false;
        await this.carregar_configuracao_pesquisa();
        if (this.inp_pesq.value.length === 0 && Object.keys(this.legislacao).length === 0 && (this?.filtro_advogado?.id === 0 || !this?.filtro_advogado?.id)) {
            alert("Critérios de pesquisa ausentes");
            return;
        }
        this.assinalar_inicio();
        if (this.xml_consultoria) this.xml_consultoria.abort();
        this.ano = new Date().getFullYear();
        this.total_resultados = 0;
        this.contador = 1;
        this.div_wrapper_compendio.style.display = 'none';
        MFt.clear(this.div_resultados_compendio);
        MFt.clear(this.div_resultados);
        this.bt_pesquisa.disabled = true;
        await this.pesquisar_consultoria_2();
    }

    async carregar_configuracao_pesquisa() {
        if (!this?.configuracao_pesquisa) this.configuracao_pesquisa = await this.request(this.super_router, {task:"arquivo", arquivo:"configuracao_pesquisa.json"});
        this.dicas_pesquisa = await this.request(this.super_router, {task:"arquivo", arquivo:"dicas_pesquisa.json"});
        this.URLPesquisa = this?.configuracao_pesquisa?.url_db ? this.configuracao_pesquisa.url_db : this.acervoURL;
        // TESTE
        // this.URLPesquisa = 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar_teste';
        // this.URLPesquisa = 'https://cgutec.dev/cgi-bin/k-pesquisar/pesquisar';
        this.url_lista_advogados = this?.configuracao_pesquisa?.url_lista_advogados || this.super_router;
        //this.url_lista_advogados = 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar';
        //this.url_lista_advogados = 'https://cgutec.dev/cgi-bin/k-pesquisar/pesquisar';
        if (this?.configuracao_pesquisa?.regex_pecas) this.regex_pecas = this.configuracao_pesquisa.regex_pecas;
    }

    async carregar_orgaos() {
        if (!this.conjurs.length) this.conjurs = await this.request(this.super_router, {task:"arquivo", arquivo:"conjurs.json"});
        this.conjurs.sort((a,b)=>b[1].length-a[1].length);
    }

    /**
     * Identifica os órgãos mencionados no campo de pesquisa
     * @returns {string}
     */
    identificar_orgaos() {
        this.filtro_conjurs = [];
        let val = this.ascii_mf(this.inp_pesq.value).toUpperCase();
        for(let r of this.regex_pecas) { // Evita que a citação a um órgão de consultoria feita na busca por uma peça específica seja tratada como filtro de consultoria
            const reg = new RegExp(r, "gi");
            if (reg.exec(val)) return val;
        }
        if (!this.conjurs.length) return;
        let indice;
        let conjurs = [];
        for(let c of this.conjurs) {
            indice = val.indexOf(c[1]);
            if (indice === 0 && (val.trim().length === c[1].length || val[c[1].length] === ' ')) {  // Precisa estar no final da string ou ter um espaço depois da sigla do órgão
                console.log('val.len =', val.trim().length, '    c[1].len =', c[1].length);
                conjurs.push({id:c[0], nome:c[1]});
                val = val.substring(c[1].length);
                continue;
            }
            indice = val.indexOf("" + c[1]); // A linha estava assim: "indice = val.indexOf(" " + c[1]);". Isso impedia a referência a duas unidades consecutivas quando não havia termo de pesquisa. Não sei porque coloquei o espaço.
            if (indice < 0) indice = val.indexOf("/" + c[1]);
            if (indice > 0 &&
                (val[indice - 1] === ' ') && // precisa ter um espaço antes da sigla, vez que a string não inicia com a sigla
                (val.trim().length === c[1].length + indice || val[indice + c[1].length] === ' ') // Precisa estar no final da string ou ter um espaço depois da sigla do órgão
            ) {
                conjurs.push({id:c[0], nome:c[1]});
                val = val.substring(0, indice) + val.substring(indice + c[1].length + 1);
            }
        }
        this.filtro_conjurs = conjurs;
        return val.trim()
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
            MFt.criaElem('p', {
                innerHTML: 'Nenhum resultado encontrado na base.'
            }, this.div_resultados);
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
                    if (dd?.ok && dd?.dados) rr(dd.dados);
                    else rr(dd);
                }
            };
            pp[method] = params;
            let xml = MFt.xml(pp);
        });
    }

    async pesquisar_consultoria_2() {
        await this.carregar_orgaos();
        this.identificar_orgaos();
        this.exibir_lista_fitro_orgaos();
        const conjurs = (()=>{
            if (!this.filtro_conjurs.length) return "";
            let ret = [];
            for(let r of this.filtro_conjurs) {
                ret.push(r['id']);
            }
            return ret.length ? JSON.stringify(ret) : "";
        })();
        const maxResultados = this.configuracao_pesquisa?.max_results || 400;
        const jwt = await this.request(this.super_router, {task: 'obterJWT'});
        let ano = new Date().getFullYear();
        let totalResultados = 0;
        for(let i = ano; i > 2013; i--) {
            let params = {
                task: 'pesquisar',
                termos: this.identificar_orgaos(),
                advogado: this.filtro_advogado?.id || "",
                ano: i.toString(),
                conjurs,
                max: maxResultados.toString(),
                jwt
            };
            if (this.legislacao?.tipo_normativo) params.legtip=this.legislacao.tipo_normativo;
            if (this.legislacao?.numero) params.legnum = this.legislacao.numero;
            if (this.legislacao?.artigo) params.legart = this.legislacao.artigo;
            if (this.legislacao?.inciso) params.leginc = this.legislacao.inciso;
            if (this.legislacao?.paragrafo) params.legpar = this.legislacao.paragrafo;
            let res = await this.request(this.URLPesquisa, params);
            if (!res) {
                alert("Erro interno!");
                this.finalizar_pesquisa(totalResultados);
                return;
            }
            this.bt_pesquisa.disabled = false;
            this.termos_retornados = res?.termos; // precisa estar antes de this.exibir_resultados()
            totalResultados += this.exibir_resultados(res, i);
            if (i === ano && res.termos) this.pesquisar_compendio(res.termos);
            if (res?.encerrar) break;
            if (totalResultados >= maxResultados) break;
        }
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
                    this.exibir_resultados(dados);
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

    exibir_resultados(dados, ano) { // exibir as pecas e os paragrafos
        let totalExibidos = dados.pecas.length ? 1 : 0; // vai retornar quantos pareceres foram exibidos na tela
        const existemParagrafosAssociados = d=>{
            //const id_peca = d[1];
            return pp.some(p=>p[0] === d[1]);
        };
        let dd = dados.pecas.sort((a,b)=>b[9] - a[9]);
        let pp = dados.paragrafos;
        let last_id_peca = 0;
        if (!dd) {
            alert("Erro interno. Tente novamente.");
            this.finalizar_pesquisa();
        }
        dd.forEach((d)=>{
            if (d[1] !== last_id_peca) {
                if (existemParagrafosAssociados(d) || dados?.outros) { // a chave "outros" indica que se trata de peça específica: tipo, número, ano, conjur. Sem isso, a peça não é exibida.
                    totalExibidos++;
                    let wrapper = MFt.criaElem('div', {
                        style: {
                            margin: '0',
                            padding: '0 0 20px 0',
                            borderBottom: '1px solid #DDD'
                        }
                    }, this.div_resultados, {
                        credo: 'credo!'
                    });
                    this.show_titulo(d, wrapper);
                    this.show_assunto(d, wrapper);
                    this.show_ementa(d, wrapper);
                    this.show_paragrafos(d[1], pp, wrapper);
                }
                else {
                    totalExibidos++;
                    let wrapper = MFt.criaElem('div', {
                        style: {
                            margin: '0',
                            padding: '0 0 20px 0',
                            borderBottom: '1px solid #DDD'
                        }
                    }, this.div_resultados, {
                        credo: 'credo!'
                    });
                    this.show_titulo(d, wrapper);
                    this.show_assunto(d, wrapper);
                    this.show_ementa(d, wrapper);
                    const ementa = (!Array.isArray(d) || (Array.isArray(d) && d.length < 8)) ? '' : d[7].trim();
                    if (ano && !ementa) {
                        this.show_um_paragrafo(d[1], ano, wrapper);
                    } // d[1] = id_peca
                }
            }
            last_id_peca = d[1];
        });
        return totalExibidos;
    }

    show_titulo(d, wrapper) {
        // console.log(d);
        if (Array.isArray(d) && d.length === 0) {
            return;
        }
        let titulo = `${d[2].substr(0,1).toUpperCase()}${d[2].substr(1)} n. ${d[3]}/${d[4]}/${d[5]}`;
        const nup = `${this.validaNUP(d[10]) ? this.formatanup(d[10]) : ''}`;
        const nuplink = (()=>{
            if (!nup) return;
            const link = MFt.criaElem('a', {
                href: `/visualizar_nup/index.html?nup=${d[10]}&cache=on`,
                innerText: nup,
                target: '_blank'
            });
            return link;
        })();
        let div_titulo = MFt.criaElem('div', {
            style: {
                fontFamily: '"Titillium Web", "Arial"'
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
            innerText: `${titulo}`, // Parecer num/ano/conjur
            style: {
                fontWeight: 'bold'
            }
        }, link1);
        if (nuplink) {
            const sp_nup = MFt.criaElem('span', {
                innerText: ' (',
                style: {
                    padding: '0 0 0 0px'
                }
            }, div_titulo);
            sp_nup.appendChild(nuplink);
            MFt.criaElem('span', {
                innerText: ') '
            }, sp_nup);
        }
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
            if (!Array.isArray(d) || (Array.isArray(d) && d.length < 8)) return;
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
                const texto = todos_pps[i][1];
                const inner = Destacar.doit_reduzir_texto(texto, this.termos_retornados);
                let p1 = MFt.criaElem('p', {
                    innerHTML: inner,
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
        this.div_wrapper_compendio.style.display = 'block';
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

    async obter_dados() {
        const elem = MFt.$('ecjus');
        const behave = elem=>{ // checkbox das unidades da CGU
            const t = this.inp_pesq;
            const v = elem.getAttribute('value');
            if (t.value.toLowerCase().indexOf(v.toLowerCase()) < 0) {
                t.value += ` ${v}`;
                t.focus();
                elem.checked = true;
            }
            else {
                elem.checked = false;
                const rx = new RegExp(`${v}`, 'gi');
                t.value = t.value.replace(rx, '').trim().replace(/ \s+/gi, ' ');
                t.focus();
            }
            this.identificar_orgaos();
            this.exibir_lista_fitro_orgaos();
        };
        const inserir = val=>{
            const sp1 = MFt.criaElem('span', {
                style: {
                    padding: '0 10px'
                }
            }, elem);
            const label = MFt.criaElem('label', {
                style: {
                    cursor: 'pointer',
                }
            }, sp1);
            const check = MFt.criaElem('input', {
                type: 'checkbox',
                style: {

                }
            }, label, {value: val.value});
            const span = MFt.criaElem('span', {
                innerText: val.nome,
                style: {

                }
            }, label);
            check.onclick = ()=>behave(check);
        };
        MFt.clear(elem);
        let tipos = await this.request_mf({task:'arquivo', arquivo:'unidades_pesquisa.json'}, this.super_router);
        if (tipos) tipos.forEach(t=>inserir(t));
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
                // console.log('prevent');
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

    div_autores() {
        const d1 = MFt.$('advogados_filtro');
        MFt.clear(d1);
        const label = MFt.criaElem('label', {
            style: {
                display: 'flex',
                alignItems: 'center',
            }
        }, d1);
        const check = MFt.criaElem('input', {
            type: 'checkbox'
        }, label);
        const s1 = MFt.criaElem('span', {
            innerText: ' Filtrar por Advogado',
            style: {
                cursor: 'pointer',
            }
        }, label);
        check.onchange = async ()=>{
            if (check.checked) {
                MFt.clear(d1);
                //if (!this.autores) this.autores = await this.request_mf({task:'autores'}, null, 'get', 'Obtendo lista...');
                if (!this.autores) this.autores = await this.request_mf({task:'arquivo', arquivo:'usuarios_pesquisa.json'}, this.url_lista_advogados, 'get', 'Obtendo lista...');
                this.autores = (()=>{
                    let autores = [];
                    this.autores.forEach(d=>{
                        autores.push([d[0], this.ascii_mf(d[1]).toLowerCase()]);
                    });
                    return autores;
                })();
                this.selecionar_advogado();
            }
        }
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
                this.inp_pesq.value = '';
            }
        });
        this.iniciar_pesquisa();
    }

    ascii_mf(s) {
        const a = 'áàâãéêíóõôúüçÁÀÂÃÉÊÍÓÕÔÚÜÇ';
        const b = 'aaaaeeiooouucAAAAEEIOOOUUC';
        for(let i = 0; i < a.length; i++) {
            const r = new RegExp(a[i], 'g');
            while (s.search(r) >= 0) s = s.replace(a[i], b[i]);
        }
        return s;
    }

    exibir_mensagem() {
        return new Promise(rr=>{
            const pop = new PopUp(320, 240, null, null, form=>{
                MFt.atribs(form.div, {
                    style: {
                        fontSize: '14px',
                        fontWeight: 'normal'
                    }
                });
                const d1 = MFt.criaElem('div', {
                    innerText: 'Pesquisa experimental em itens licitados. O processo de cada item licitado pode ser encontrado, o que permite localizar uma licitação semelhante a que está sendo examinada.',
                }, form.div);
                const d2 = MFt.criaElem('div', {

                }, form.div);
                const d3 = MFt.criaElem('div', {

                }, form.div);
                const bt = new MFt.bt({
                    value: "Sair",
                    wrapper: d3,
                    width: 120,
                    height: 30,
                    callback: ()=>{
                        form.closeWindow(form);
                        rr();
                    }
                })
                const a1 = MFt.criaElem('a', {
                    href: '/pesquisa_licitacoes/pesquisa_licitacoes.html',
                    innerText: 'Clique aqui para acessar'
                }, d2);
            });
            pop.iniciar(pop);
            pop.clicafora_sair = pop.aceitaEsc = false;
        });
    }

    exibir_mensagem() {
        return new Promise(rr=>{
            const pop = new PopUp(400, 280, null, null, form=>{
                MFt.atribs(form.div, {
                    style: {
                        fontSize: '16px',
                        fontWeight: 'normal'
                    }
                });
                const d0 = MFt.criaElem('div', {
                    innerText: 'Atenção',
                    style: {
                        fontFamily: 'Open Sans',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        textAlign: 'justify'
                    }
                }, form.div);
                const d1 = MFt.criaElem('div', {
                    innerText: 'Está em fase de testes uma busca em itens licitados. Procurar por um item licitado permite localizar um processo semelhante ao que está sendo examinado ou mesmo verificar se os preços praticados em um processo têm ou não sobrepreço.',
                    style: {
                        fontFamily: 'Open Sans',
                        marginBottom: '20px',
                        textAlign: 'justify'
                    }
                }, form.div);
                const d2 = MFt.criaElem('div', {
                    style: {
                        marginBottom: '40px'
                    }
                }, form.div);
                const d3 = MFt.criaElem('div', {
                    style: {
                        display: 'flex',
                        justifyContent: 'center'
                    }
                }, form.div);
                const bt = new MFt.bt({
                    value: "Ficar na pesquisa jurídica",
                    wrapper: d3,
                    width: 200,
                    height: 30,
                    callback: ()=>{
                        form.closeWindow(form);
                        rr();
                    }
                })
                const a1 = MFt.criaElem('a', {
                    href: '/pesquisa_licitacoes/pesquisa_licitacoes.html',
                    innerText: 'Clique aqui para acessar',
                    style: {
                        fontFamily: 'Open Sans',
                        fontSize: '14px'
                    }
                }, d2);
            });
            pop.iniciar(pop);
            pop.clicafora_sair = pop.aceitaEsc = false;
        });
    }

    criar_select(label, dados, elem) {
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: 'auto auto'
            }
        }, elem);
        MFt.criaElem('div', {
            innerText: label,
            style: {
                fontSize: '14px',
                padding: '0 0 5px 0'
            }
        }, d1);
        const dSel = MFt.criaElem('div', {
            style: {

            }
        }, d1);
        const sel = MFt.criaElem('select', {
            style: {
                height: '30px'
            }
        }, dSel);
        for(let d of dados) {
            MFt.criaElem('option', {
                innerText: d.nome,
            }, sel, {
                value: d.value,
            });
        }
        return sel;
    }

    criar_campo_texto(label, elem, width=100) {
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: 'auto auto'
            }
        }, elem);
        MFt.criaElem('div', {
            innerText: label,
            style: {
                fontSize: '14px',
                padding: '0 0 5px 0'
            }
        }, d1);
        const dInp = MFt.criaElem('div', {

        }, d1);
        const inp = MFt.criaElem('input', {
            style: {
                height: '30px',
                width: `${width || 100}px`,
                fontSize: '14px',
                borderRadius: '6px',
                padding: '0 5px',
                borderStyle: 'groove'
            }
        }, dInp);
        return inp;
    }

    async div_pesquisa_normativa() {
        await this.carregar_configuracao_pesquisa();
        const botaoLimpar = (elem, label="Limpar")=>{
            return new Promise(rr=>{
                const limparImage = new Image(20);
                limparImage.onload = ()=>{
                    const d1 = MFt.criaElem('div', {
                        style: {
                            display: 'grid',
                            gridTemplateRows: 'auto auto',
                            cursor: 'pointer'
                        }
                    }, elem);
                    const d2 = MFt.criaElem('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }, d1);
                    const d3 = MFt.criaElem('div', {
                        innerText: label,
                        style: {
                            fontSize: '10px',
                        }
                    }, d1);
                    d2.appendChild(limparImage);
                    rr(d1);
                };
                limparImage.src = "/images/cross_red.png";
            });
        };
        const numsPermitidos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Tab', 'ArrowLeft', 'ArrowRight', 'Backspace'];
        const artsPermitidos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', '-', 'Tab', 'ArrowLeft', 'ArrowRight', 'Backspace'];
        const incsPermitidos = ['i', 'v', 'x', 'c', 'l', 'I', 'V', 'X', 'C', 'L', 'Tab', 'ArrowLeft', 'ArrowRight', 'Backspace'];
        const wrapper = MFt.$("legislacao");
        MFt.clear(wrapper);
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'auto auto auto auto auto 30px',
                padding: '5px',
                margin: '10px 0',
                //margin: '5px',
                border: '1px solid #CCC',
                borderRadius: '6px',
                background: '#fff'
            }
        }, wrapper);
        const dTipo = MFt.criaElem('div', {

        }, d1);
        const dNumero = MFt.criaElem('div', {

        }, d1);
        const dArtigo = MFt.criaElem('div', {

        }, d1);
        const dInciso = MFt.criaElem('div', {

        }, d1);
        const dParagrafo = MFt.criaElem('div', {

        }, d1);
        const dLimpar = MFt.criaElem('div', {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        }, d1);
        const tiposNormas = [ // serve de backup caso não seja possível carregar a lista do servidor em this.configuracao_pesquisa
            {nome: '---', value: 0},
            {nome: 'Constituição', value: 19},
            {nome: 'Lei Complementar', value: 2},
            {nome: 'Lei Ordinária', value: 1},
            {nome: 'Medida Provisória', value: 11},
            {nome: 'Decreto-Lei', value: 3},
            {nome: 'Decreto', value: 4},
            {nome: 'Emenda Constitucional', value: 13},
            {nome: 'Súmula', value: 18},
            {nome: 'Ato Regimental', value: 12},
            {nome: 'Orientação Normativa', value: 9},
            {nome: 'Portaria', value: 5},
            {nome: 'Portaria Normativa', value: 8},
            {nome: 'ADPF', value: 15},
        ];
        console.log(this.configuracao_pesquisa);
        const sel = this.criar_select('Tipo Normativo', this.configuracao_pesquisa?.tipos_normas || tiposNormas, dTipo);
        const num = this.criar_campo_texto('Número', dNumero);
        const art = this.criar_campo_texto('Artigo', dArtigo);
        const inc = this.criar_campo_texto('Inciso', dInciso);
        const par = this.criar_campo_texto('Parágrafo', dParagrafo);
        const btLimpar = await botaoLimpar(dLimpar);
        const doLimpar = ()=>{
            sel.selectedIndex = 0;
            num.value = '';
            art.value = '';
            inc.value = '';
            par.value = '';
            this.legislacao = {};
        }
        btLimpar.onclick = ()=>{
            doLimpar();
            this.inp_pesq.value = '';
        };
        sel.onchange = ()=>{
            //if (sel.selectedIndex !== 0) this.inp_pesq.value = '';
            //else doLimpar();
            if (sel[sel.selectedIndex].value === '19') {
                num.value = '';
                this.legislacao.numero = '';
                art.focus();
            }
            num.disabled = sel[sel.selectedIndex].value === '19';
            if (sel.selectedIndex === 0) {
                this.legislacao = {};
                return;
            }
            this.legislacao.tipo_normativo = parseInt(sel[sel.selectedIndex].value);
            console.log(this.legislacao);
        }
        num.onkeydown = e=>{
            if (!numsPermitidos.some(d=>d===e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        art.onkeydown = e=>{
            if (!artsPermitidos.some(d=>d===e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        inc.onkeydown = e=>{
            if (!incsPermitidos.some(d=>d===e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        par.onkeydown = e=>{
            if (!numsPermitidos.some(d=>d===e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        num.oninput = ()=>{
            this.legislacao.numero = num.value.trim();
            //this.inp_pesq.value = '';
            console.log(this.legislacao);
        };
        art.oninput = ()=>{
            this.legislacao.artigo = art.value.trim();
            //this.inp_pesq.value = '';
            console.log(this.legislacao);
        };
        inc.oninput = ()=>{
            this.legislacao.inciso = inc.value.trim().toUpperCase();
            //this.inp_pesq.value = '';
            console.log(this.legislacao);
        };
        par.oninput = ()=>{
            this.legislacao.paragrafo = par.value.trim();
            //this.inp_pesq.value = '';
            console.log(this.legislacao);
        };
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

    show_um_paragrafo(id_peca, ano, wrapper, num=2) {
        if (!id_peca) return;
        const d1 = MFt.criaElem('div', {
            style: {
                fontStyle: 'italic',
                fontSize: '14px',
                fontFamily: 'Titillium Web',
            }
        }, wrapper);
        const s1 = MFt.criaElem('span', {
            innerText: 'Clique aqui para exibir o início do documento',
            style: {
                cursor: 'pointer'
            }
        }, d1);
        s1.onclick = async ()=>{
            MFt.clear(d1);
            const ampulheta = new Image(16);
            ampulheta.onload = ()=>{
                const s1 = MFt.criaElem('span', {}, d1);
                s1.appendChild(ampulheta);
                const s2 = MFt.criaElem('span', {
                    innerText: 'Aguarde...',
                    style: {
                        marginLeft: '10px'
                    }
                }, d1);
            }
            ampulheta.src = '/images/throbber_13.gif';
            const jwt = await this.request(this.super_router, {task: 'obterJWT'});
            const pars = await this.request(this.URLPesquisa, {
                task: 'primeiro',
                id_peca,
                ano,
                num,
                jwt
            });
            MFt.clear(d1);
            if (Array.isArray(pars) && pars.length) {
                for (let it of pars) {
                    MFt.criaElem('p', {
                        innerText: Array.isArray(it) && it.length ? it[1] : '',
                        style: {
                            margin: '0 0 5px 0',
                            textAlign: 'justify',
                            textIndent: '70px',
                            fontStyle: 'normal'
                        }
                    }, d1);
                }
            }
            else {
                MFt.criaElem('p', {
                    innerText: '-x-x-x-x-x-x-x-x-x-',
                    style: {
                        margin: '0 0 5px 0',
                        textAlign: 'justify',
                        textIndent: '70px',
                        fontStyle: 'normal'
                    }
                }, d1);
            }
        };
    }

    show_dica_pesquisa(key) {
        const tratarTxt = txt=>{
            const linhas = txt.split('\n');
            let html = '';
            for(let l of linhas) {
                if (l.trim().length) html += `<p>${l}</p>`;
                else html += '<p><br/></p>';
            }
            return html;
        }
        const elem = MFt.$('dica_pesquisa');
        MFt.clear(elem);
        if (this.nao_exibir_dica_pesquisa) return;
        if (!key || !this.dicas_pesquisa.hasOwnProperty(key)) {
            return;
        }
        const d1 = MFt.criaElem('div', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                width: Number.isInteger(this.dicas_pesquisa[key]?.width) ? `${this.dicas_pesquisa[key].width}px` : '200px',
                height: Number.isInteger(this.dicas_pesquisa[key]?.height) ? `${this.dicas_pesquisa[key].height}px` : '100px',
                position: 'relative',
                border: '1px solid #CCC',
                padding: '10px',
                backgroundColor: 'cornsilk',
                top: '36px',
                left: '10px',
                borderRadius: '6px',
                overflow: 'scroll',
            }
        }, elem);
        const d2 = MFt.criaElem('div', {
            style: {
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
            }
        }, d1);
        const d3 = MFt.criaElem('div', {
            innerHTML: tratarTxt(this.dicas_pesquisa[key]?.texto) || '',
            style: {

            }
        }, d1);
        const s1 = MFt.criaElem('span', {
            innerText: 'X',
            style: {
                cursor: 'pointer',
                position: 'relative',
                top: '-8px',
                right: '-3px',
                fontWeight: 'bold',
                color: 'red',
            }
        }, d2);
        s1.onclick = ()=>{
            MFt.clear(elem);
            this.nao_exibir_dica_pesquisa = true;
            this.inp_pesq.focus();
        }
    }
}
