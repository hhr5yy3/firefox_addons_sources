class Seqs extends Payloads {
    constructor(pai, indice, wrapper, tela_direita) {
        super();
        this.blob;
        this.pai = pai;
        this.indice = indice;
        this.wrapper = wrapper;
        this.tela_direita = tela_direita;
        this.dicas = []; // Registro de todos os textos que aparecem sobre os componentes digitais quando o mouse passa por cima. Eles precisam ser retirados quando se faz a atualização da sequência
        this.juntada = this.pai.processo.juntadas[this.indice];
        this.div = MFt.criaElem('div', {
            style: {
                marginBottom: '5px',
                borderBottom: '1px solid #EEE',
                padding: '0 0 20px'
            }
        }, this.wrapper, {
            'sequencial': this.juntada.numeracaoSequencial.toString()
        });
        //console.log(this.juntada);
        this.componentes = {}; // armazenar em cache os componentes ja baixados
        this.comp_download_progress = {}; // Indica os componentes que estao em download e o progresso deles para evitar que dois itens facam o download do mesmo componente quando clicados simultaneamente
        this.vinculacoes = []; // armazenar novas instancias de Seqs para os documentos vinculados
        this.itens = []; // Cada item que vai ser clicado com um componente digital
        this.init();
    }

    get processo() {return this.pai.processo}

    init() {
        // this.div_num_sequencia.innerText = `Seq. ${this.juntada.numeracaoSequencial}`;
        this.div_num_sequencia = MFt.criaElem('div', {
            innerText: `Seq. ${this.juntada.numeracaoSequencial}`,
            style: {
                position: 'relative',
                top: '-16px',
                margin: '0 0 0 220px',
                background: 'transparent',
                fontFamily: 'Syne Mono',
                fontSize: '15px',
                height: '0',
                color: '#BBB'
            }
        }, this.div);
        this.itens = []; // apos TelaAnotacao.doit() esta rotina eh chamada. Se os itens nao forem zerados todos os itens serao duplicados
        const comps = (()=>{
            let ret = [];
            if (Array.isArray(this.juntada.documento.componentesDigitais))
                for(let cd of this.juntada.documento.componentesDigitais) {
                    cd.tipoDocumento = this.juntada.documento.tipoDocumento;
                    if (this.juntada?.documento?.numeroUnicoDocumentoFormatado) cd.numeroUnicoDocumentoFormatado = this.juntada?.documento?.numeroUnicoDocumentoFormatado;
                    ret.push(cd);
                }
            if (this?.juntada?.documento?.vinculacoesDocumentos?.length) { // Existem documentos vinculados
                // console.group('VINCULACOES DOCUMENTOS');
                // console.log(this.juntada.documento.vinculacoesDocumentos);
                // console.groupEnd();
                for(let vd of this.juntada.documento.vinculacoesDocumentos) {
                    if (Array.isArray(vd?.documentoVinculado?.componentesDigitais)) {
                        for (let cd of vd.documentoVinculado.componentesDigitais) {
                            cd.tipoDocumento = vd.documentoVinculado.tipoDocumento;
                            /*
                            O Super só dá o Número do Parecer/Nota/Cota/etc no documento raiz e esse número se estente para todos os outros documentos vinculados.
                            Se um despacho é vinculado a um parecer, todos os vinculados vão receber o numeroUnicoDocumentoFormatado do parecer, que é a peça raiz.
                            Não dá pra usar esse número nos vinculados porque vai causar erro.
                            Por isso, não o insiro nas informações que serão passadas aos Itens (new Item()).
                            Nesses casos, a visualização vai confiar exclusivamente na avaliação do conteúdo ou no que tiver sido anotado pelo usuário.
                             */
                            cd.vinculado = true;
                            ret.push(cd);
                        }
                    }
                    else {
                        console.group('%cDOCUMENTO VINCULADO NÃO TEM COMPONENTES DIGITAIS', 'color:red;');
                        console.log(vd);
                        console.groupEnd();
                    }
                }
            }
            return ret;
        })();
        /**
         * Em cada sequencia, cada componente digital vai ser comparado com o conteudo das anotacoes.
         * Se nao houve nenhuma anotacao no componente digital, sera criado uma instancia de Item() que tera a informacao do componente
         * Se houver alguma anotacao para o componente digital, para cada anotacao sera criado uma instancia de Item() que tera a informacao do componente e da anotacao respectiva
         * Se nao houver nenhuma anotacao para a pagina 1 do componente digital, sera criado uma instancia de Item() com a informacao do componente, mas sem a anotacao
         * A chave "numeracaoSequencial" nao significa nada para a exibicao do documento. Ela precisa ser calculada de acordo com a posicao dela na sequencia de arquivos, sendo o documento raiz o numero 1.
         */
        let numeracao_sequencial_calculada = 1;
        for(let c of comps) {
            c.numeracao_sequencial_calculada = numeracao_sequencial_calculada++;
            let anotacoes = this.pai.anotacoes.filter(d=>d.id_comp === c.id);
            if (anotacoes.length) {
                anotacoes.sort((a, b) => a.pagina - b.pagina);
                if (!anotacoes.some(d=>parseInt(d.pagina)===1) && c.mimetype === 'application/pdf') {
                    // I need to use parseInt() above because d.pagina comes as string
                    this.itens.push(new Item(c, null, this.div, this));
                }
                for (let a of anotacoes) {
                    this.itens.push(new Item(c, a, this.div, this));
                }
            }
            else this.itens.push(new Item(c, null, this.div, this));
        }
        if (comps.length === 0) {
            this.exibir_evento();
        }
    }

    async anotar(id_comp, pag, titulo, texto, cor, mimetype) {
        const id_proc = this.processo.id;
        const nup = this.processo.NUP;
        const ta = new TelaAnotacao(id_comp, pag, id_proc, nup, titulo, texto, cor, mimetype, this.juntada, this);
        const res = await ta.doit();
        if (res) {
            MFt.clear(this.div);
            // A linha abaixo inclui o novo item na sequencia
            this.pai.incluir_nova_anotacao(res);
            // A linha abaixo faz a sequencia inteira se redesenhar
            this.init();
        }
    }

    exibir_evento() {
        MFt.criaElem('div', {
            innerText: this?.juntada?.documento?.juntadaAtual?.descricao || this?.juntada?.descricao,
            style: {
                color: '#CCC',
                margin: '0 0 0 30px'
            }
        }, this.div);
    }

    remover_anotacao(id_comp, pagina) {
        console.log(this.pai.anotacoes);
        this.pai.anotacoes = this.pai.anotacoes.filter(d=>{
            return d.id_comp !== id_comp || d.pagina !== pagina;
        });
        MFt.clear(this.div);
        this.init();
    }
}