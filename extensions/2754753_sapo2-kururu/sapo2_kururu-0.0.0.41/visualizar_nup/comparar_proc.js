class CompararProcesso extends Payloads {
    _pai;

    constructor(pai) {
        super();
        this._pai = pai;
        this.janela = undefined;
        this.id_processo = this._pai.processo.id;
        this.juntadas = [];
        this.texto_base = 'Verificando atualidade dos dados...';
        this.altura_base = '50px';
        this.exibindo_explicacoes = false; // flag para indicar que as explicações estão sendo exibidas para não fechar a janelinha
        this.deveria_fechar = false; // indica se a atualização já terminou e que após o usuário clicar em "ok" já pode fechar a janelinha
        this.tamanhoPagina = 50;
        this.init();
    }

    async init() {
        this.texto_explicacao = await this.request_mf('https://manoelpaz.com/cgi-bin/agu/super/super', {task: 'arquivo', arquivo: 'explica_atual_juntadas.json'});
        // console.log(this.texto_explicacao);
        this.janela = await this._janela();
        // console.log(this.janela);
        // console.log(MFt.$('span_icon_atualizar_juntadas'));
        // console.log(this.juntadas);
        this.janela.icon_info.onclick = ()=>this.explicacao();
        this.juntadas = await this.obter_juntadas_local(this.janela.msg2);
        this.comparar();
    }

    _janela() {
        return (async ()=>{
            const icon_info = new Image(15);
            await this.load_image(icon_info, "/images/info.svg");
            const jan = MFt.criaElem('div', {
                style: {
                    position: 'fixed',
                    padding: '0 10px',
                    top: '43px',
                    right: '10px',
                    width: '220px',
                    height: this.altura_base,
                    borderRadius: '6px',
                    border: '1px solid #CCC',
                    boxShadow: '2px 2px 2px #333',
                    background: '#fdfdce',
                    display: 'grid',
                    gridTemplateRows: 'auto auto',
                    zIndex: '1',
                    alignContent: 'start'
                }
            }, document.body);
            const subjan = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto 15px',
                    alignItems: 'center'
                }
            }, jan);
            const msg1 = MFt.criaElem('div', {
                innerText: this.texto_base,
                style: {
                    fontFamily: 'Patrick Hand'
                }
            }, subjan);
            const spanicon = MFt.criaElem('div', {id:'span_icon_atualizar_juntadas', style: {display: 'flex'}}, subjan);
            spanicon.appendChild(icon_info);
            MFt.atribs(icon_info, {
                style: {
                    cursor: 'pointer'
                }
            });
            const msg2 = MFt.criaElem('div', {
                style: {
                    fontFamily: 'Patrick Hand'
                }
            }, jan);
            return {jan, msg1, msg2, icon_info, subjan, spanicon};
        })();
    }

    async obter_juntadas_local(elem) {
        let wr, p1, p2, p3;
        let tempo = new Date();
        if (elem instanceof HTMLElement) {
            wr = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '40px 100px auto'
                }
            }, elem);
            p1 = MFt.criaElem('div', null, wr);
            p2 = MFt.criaElem('div', null, wr);
            p3 = MFt.criaElem('div', null, wr);
        }
        const correcao_tempo = 1.6;
        let xml = new RequestMF();
        let total = 0;
        let maximo = 100_000_000;
        let juntadas = [];
        while(juntadas.length < maximo) {
            const res = await this.super_get(xml, this.get_juntadas(this.id_processo, juntadas.length, null, this.tamanhoPagina));
            if (res?.entities) {
                maximo = res.total;
                juntadas = juntadas.concat(res.entities);
            }
            else {
                alert('Erro de comunicação com o Super');
                return false;
            }
            const lapso = (new Date() - tempo) / 1000; // em segundos
            const docs_por_seg = (juntadas.length / lapso).toFixed(1);
            let tempo_restante = (maximo - juntadas.length) / parseFloat(docs_por_seg);
            tempo_restante = (()=>{
                let ret = parseInt(tempo_restante * correcao_tempo);
                return ret > 60 ? `${parseInt(ret/60)}m:${ret%60}s` : `${ret}s`;
            })();
            if (wr) {
                p1.innerText = `${((juntadas.length/maximo) * 100).toFixed(0)}%`; // ${juntadas.length}/${maximo}
                p2.innerText = `${docs_por_seg}docs/seg.`;
                p3.innerText = `ETA: ${tempo_restante}`;
            }
        }
        return juntadas;
    }

    async comparar() {
        let juntadas_diferentes_indice = [];
        if (this.juntadas.length === this._pai.processo.juntadas.length) { // Verificar se cada juntada tem o mesmo id
            let juntadas_identicas = true;
            let vinculacoes_identicas = true;
            for(let i = 0; i < this.juntadas.length; i++) {
                if (
                    this.juntadas[i].id !== this._pai.processo.juntadas[i].id &&
                    this.juntadas[i].documento.id === this._pai.processo.juntadas[i].documento.id
                ) {
                    juntadas_identicas = false;
                    break;
                }
                else {
                    if (
                        this.juntadas[i]?.documento?.vinculacoesDocumentos &&
                        this._pai.processo.juntadas[i]?.documento?.vinculacoesDocumentos &&
                        this.juntadas[i].documento.vinculacoesDocumentos.length === this._pai.processo.juntadas[i].documento.vinculacoesDocumentos.length
                    ) {
                        for(let j = 0; j < this.juntadas[i].documento.vinculacoesDocumentos.length; j++) {
                            const a = this.juntadas[i].documento.vinculacoesDocumentos[j];
                            const b = this._pai.processo.juntadas[i].documento.vinculacoesDocumentos[j];
                            if (a.id !== b.id) {
                                vinculacoes_identicas = false;
                                break;
                            }
                        }
                    }
                }
                if (!juntadas_identicas || !vinculacoes_identicas) {
                    juntadas_diferentes_indice.push(i);
                    console.group(`JUNTADA ${i} DIFERENTE ---------------`);
                    if (!juntadas_identicas) console.log('JUNTADAS DIFERENTES');
                    if (!vinculacoes_identicas) console.log('VINCULACOES DIFERENTES');
                    console.groupEnd();
                }
            }
            console.log(juntadas_diferentes_indice);
            if (juntadas_diferentes_indice.length === 0) {
                this.janela.msg1.innerText = 'Processo sem alteração';
                this.janela.msg2.innerText = '';
                this.janela.jan.style.height = this.altura_base;
                const tempo = new Crono();
                await this._pai.gravar_cache_arvore_juntadas(this.juntadas);
                console.log(`TEMPO PARA GRAVAR CACHE DO PROCESSO: ${tempo.tempo}s`);
                await this.esperar(10000);
                this.deveria_fechar = true;
                if (!this.exibindo_explicacoes) this.fechar_janelinha();
            }
            else {
                console.log('PROCESSOS DIFERENTES');
                this._pai.refrescar_arvore(this.juntadas);
            }
        }
        else { // Numero de juntadas diferente
            let mensagem = 'Novos documentos foram juntados ao processo';
            if (!Array.isArray(this.juntadas) || (Array.isArray(this.juntadas) && this.juntadas.length === 0)) {
                console.log('ERRO AO OBTER JUNTADAS DO SUPER');
                mensagem = 'Erro ao obter os dados do Super!';
            }
            console.log('NUMERO DE JUNTADAS DIFERENTE');
            console.log(this._pai);
            this.janela.msg1.innerText = mensagem;
            this.janela.msg2.innerText = '';
            if (Array.isArray(this.juntadas) && this.juntadas.length) {
                this._pai.refrescar_arvore(this.juntadas);
                console.log(this.juntadas.length);
                this.janela.jan.style.height = this.altura_base;
                const tempo = new Crono();
                await this._pai.gravar_cache_arvore_juntadas(this.juntadas);
                console.log(`TEMPO PARA GRAVAR CACHE DO PROCESSO: ${tempo.tempo}s`);
                await this.esperar(10000);
                this.deveria_fechar = true;
                if (!this.exibindo_explicacoes) this.fechar_janelinha();
            }
        }
    }

    explicacao() {
        this.exibindo_explicacoes = true;
        console.log('explicacao');
        this.janela.jan.style.height = '300px';
        this.janela.msg1.innerText = this.texto_explicacao || '???';
        this.janela.icon_info.style.display = 'none';

        const bt = new MFt.bt({
            value: 'ok',
            width: 25,
            height: 20,
            fontSize: '14px',
            wrapper: MFt.criaElem('div', {style: {textAlign: 'right'}}, this.janela.msg1),
            callback: ()=>{
                this.janela.msg1.innerText = this.texto_base;
                this.janela.jan.style.height = this.altura_base;
                this.janela.icon_info.style.display = 'block';
                this.exibindo_explicacoes = false;
                if (this.deveria_fechar) this.fechar_janelinha();
            }
        });
        MFt.criaElem('div', {
            style: {
                padding: '0 0 5px',
                margin: '0 0 5px',
                borderBottom: '1px solid #CCC'
            }
        }, this.janela.msg1);
    }

    fechar_janelinha() {
        this.janela.jan.parentNode.removeChild(this.janela.jan);
    }
}