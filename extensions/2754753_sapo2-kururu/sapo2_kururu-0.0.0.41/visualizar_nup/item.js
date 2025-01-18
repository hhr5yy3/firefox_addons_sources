class Item extends Payloads {
    constructor(comp, anot, elem, pai_seqs) {
        super();
        this.docAtivo = pai_seqs.juntada?.ativo;
        this.comp = comp;
        this.anot = anot;
        this.elem = elem;
        this.pai_seqs = pai_seqs; // Faz referencia a Classe Seqs que criou esta instancia de Item
        this.downloading = false;
        this._div_titulo = MFt.criaElem('div', {style:{cursor: 'pointer'}});
        this.progresso = new ProgressoCircular(10, anot ? AnotacoesCores.cores[anot.cor] : null, '#999');
        this.main_div = this.sub_div1 = this.sub_div2 = undefined;
        this.sub_div1_style = {
            margin: this.comp.vinculado ? '0 5px 0 20px' : '0 5px 0 5px',
            padding: '2px 0 2px 5px',
            display: 'grid',
            gridTemplateColumns: '16px 20px 20px auto', // local dos icones
            gridTemplateRows: 'auto',
            alignItems: 'center',
            fontFamily: 'Titillium Web',
            fontSize: '14px',
            marginBottom: '3px',
            border: '1px solid transparent',
            borderRadius: '4px'
        }
        this.item_selecionado = false; // Vai indicar se o item está ou não selecionado
        this.cor_emaecimento = '#CCC';
        this.backgroundColorSelecionado = '#C5F4FF';
        this.backgroundColorNaoSelecionado = 'transparent';
        this.backgroundColorHover = '#fdfdb7';
        this.backgroundColorEstado = this.backgroundColorNaoSelecionado; // Guarda a cor que deve ser exibida no background
        this.avaliar_inserir_nome_automatico_feito = false;
        this.xml = new RequestMF();
        this.copy_icon = new Image(16);
        this.load_image(this.copy_icon, '/images/copy.png');
        this.info_icon = new Image(16);
        this.info_icon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgOTYgOTYwIDk2MCIgd2lkdGg9IjQ4Ij48cGF0aCBkPSJNNDUzIDc3Nmg2MFY1MzZoLTYwdjI0MFptMjYuOTgyLTMxNHExNC4wMTggMCAyMy41MTgtOS4yVDUxMyA0MzBxMC0xNC40NS05LjQ4Mi0yNC4yMjUtOS40ODMtOS43NzUtMjMuNS05Ljc3NS0xNC4wMTggMC0yMy41MTggOS43NzVUNDQ3IDQzMHEwIDEzLjYgOS40ODIgMjIuOCA5LjQ4MyA5LjIgMjMuNSA5LjJabS4yODQgNTE0cS04Mi43MzQgMC0xNTUuNS0zMS41dC0xMjcuMjY2LTg2cS01NC41LTU0LjUtODYtMTI3LjM0MVE4MCA2NTguMzE5IDgwIDU3NS41cTAtODIuODE5IDMxLjUtMTU1LjY1OVExNDMgMzQ3IDE5Ny41IDI5M3QxMjcuMzQxLTg1LjVRMzk3LjY4MSAxNzYgNDgwLjUgMTc2cTgyLjgxOSAwIDE1NS42NTkgMzEuNVE3MDkgMjM5IDc2MyAyOTN0ODUuNSAxMjdRODgwIDQ5MyA4ODAgNTc1LjczNHEwIDgyLjczNC0zMS41IDE1NS41VDc2MyA4NTguMzE2cS01NCA1NC4zMTYtMTI3IDg2UTU2MyA5NzYgNDgwLjI2NiA5NzZabS4yMzQtNjBRNjIyIDkxNiA3MjEgODE2LjV0OTktMjQxUTgyMCA0MzQgNzIxLjE4OCAzMzUgNjIyLjM3NSAyMzYgNDgwIDIzNnEtMTQxIDAtMjQwLjUgOTguODEyUTE0MCA0MzMuNjI1IDE0MCA1NzZxMCAxNDEgOTkuNSAyNDAuNXQyNDEgOTkuNVptLS41LTM0MFoiLz48L3N2Zz4=';
        this.icon_ampulheta = new Image(16);
        this.icon_ampulheta.src = '/images/throbber_13.gif';
        this.exibir();
    }

    set backgroundColor(val) {
        if (this.sub_div1 instanceof HTMLElement) this.sub_div1.style.backgroundColor = val;
    }

    esmaecer() {
        if (!this?.anot?.rowid && this.pai_seqs.pai.esmaecer_itens_sem_titulo) {
            this._div_titulo.style.color = this.cor_emaecimento;
        }
    }

    get titulo() {return this.anot?.titulo;}
    set titulo(val) {
        /*
        A partir da versão 1.8 o Super contém um campo com o número do documento (parecer/despacho...) apenas para os documentos HTML produzidos a partir dessa versão do Super.
        O que eu fazia antes era que a inclusão de um novo título só era possível se antes fosse gravado no Banco de Dados.
        Com essa alteração do Super, se eu continuar assim vou ferrar com o número de requisições no DB.
        Então, se o Super tiver o número, vou só exibir o número sem fazer qualquer gravação no DB.
        Se não tiver o número, quando o HTML for aberto, será feita a leitura do texto e se houver o padrão ele será enviado ao DB.
        Se for enviado um título para cá sem a correspondente existência da anotação, cria-se uma anotação provisória sem registro no DB, só para exibir o título fornecido pelo Super >=1.8
         */
        if (typeof val === 'string' && val.trim().length && !this.anot) {
            this.anot = {
                cor: this?.anot?.cor || null,
                id_comp: this.comp.id,
                pagina: this?.anot?.pagina || null,
                rowid: this?.anot?.rowid || null,
                texto_html: this?.anot?.texto_html || null,
                texto_txt: this?.anot?.texto_txt || null,
                titulo: val
            };
            this._div_titulo.innerText = this.docAtivo ? this.titulo : (this.titulo + ' (Desentranhado)');
            this.esmaecer();
        }
        else if (typeof val === 'string' && val.trim().length && this.anot) {
            this.anot.titulo = val;
            this._div_titulo.innerText = this.docAtivo ? val : (val + ' (Desentranhado)');
        }
        if (!this.docAtivo) {
            this._div_titulo.style.fontStyle = 'italic';
            this._div_titulo.style.color = "#AAA";
            this._div_titulo.style.textDecoration = 'line-through';

        }
    }

    async click(d1, selecionar=true, perguntar_erro=false) {
        // console.log(`CLICK - ${this.titulo}`);
        const TEMPO_MAXIMO_ENTRE_PACOTES = 30; // Em segundos
        const inicio_download = new Date();
        let ultimo_pedaco_recebido = new Date();
        let ultimo_percentual;
        let timer_monitorar;
        let cancelar_download_flag = false;
        if (selecionar) {
            this.backgroundColor = this.backgroundColorEstado = this.backgroundColorSelecionado;
            this.item_selecionado = true;
        }
        const finalizar_trabalhos = ()=>{
            // console.log(`FINALIZAR - ${this.titulo}`);
            // console.group();
            // console.trace();
            // console.groupEnd();
            // console.log(`%c${this.titulo} finalizado em ${((inicio_download.valueOf()/1000) / (new Date().valueOf() / 1000)).toFixed(3)}s`, 'color:blue');
            cancelar_download_flag = true;
            if (timer_problema) clearInterval(timer_problema);
            this.downloading = false;
            if (this.pai_seqs.comp_download_progress[this.comp.id] === 100) {
                if (this.xml.xml) {
                    if (this.xml.xml.status >= 200 && this.xml.xml.status < 300) {
                        return;
                    }
                    else {
                        console.log(this.xml.xml.status);
                        console.log(this.xml.xml.statusText);
                        console.log(this.xml.readyState);
                    }
                }
                console.log(`%cDownload completo - ${this.titulo}`, 'color:green');
                return;
            }
            this.pai_seqs.comp_download_progress[this.comp.id] = undefined; // Mais a baixo existe um if sobre esse valor para decidir se devo iniciar o download ou so fazer o monitoramento do download ja iniciado
            if (this.xml.xml) {
                console.log(this.xml.xml.status);
                console.log(this.xml.xml.statusText);
                console.log(this.xml.readyState);
                console.log(`%cAbort ${this.titulo}`, 'color:red');
                this.xml.xml.abort();
            }
        };
        const verificar_problema_download = ()=>{
            const tempo_parcial = (new Date().valueOf() - ultimo_pedaco_recebido.valueOf()) / 1000;
            // console.log(`${this.titulo} - ${tempo_parcial}`, ultimo_percentual, this?.progresso?.percentual);
            if (this.pai_seqs.componentes[this.comp.id]) {
                // console.log(`CLEAR INTERVAL timer problema - ${this.titulo}`);
                clearInterval(timer_problema);
                return;
            }
            if (ultimo_percentual !== this?.progresso?.percentual) {
                ultimo_pedaco_recebido = new Date();
                ultimo_percentual = this?.progresso?.percentual;
                return;
            }
            if (tempo_parcial > TEMPO_MAXIMO_ENTRE_PACOTES) {
                if (perguntar_erro) {
                    if (confirm(`Problema com o download de componente - ${this.titulo}\nDeseja tentar novamente?`)) {
                        finalizar_trabalhos();
                        this.click(d1, selecionar);
                    } else {
                        ultimo_pedaco_recebido = new Date();
                    }
                }
                else {
                    // console.log('tempo_parcial > TEMPO_MAXIMO_ENTRE_PACOTES', tempo_parcial, TEMPO_MAXIMO_ENTRE_PACOTES);
                    finalizar_trabalhos();
                    console.log(this);
                    this.click(d1);
                }
            }
        };
        const timer_problema = this.pai_seqs.componentes[this.comp.id] ? null : setInterval(verificar_problema_download, 1000);
        d1 = d1 || this.sub_div1;
        const exibir_progresso = e=>{
            // if (this.titulo.startsWith('Memorial')) console.log(`%c${this.titulo}`, 'color:green'); // debug
            const comp_id = parseInt(this.pai_seqs.tela_direita.getAttribute('comp_id'));
            let perc = parseFloat((((e.loaded/this.comp.tamanho) * 100) - 30).toFixed(2));
            perc = perc < 0 ? 0 : (perc > 100 ? 100 : perc);
            this.progresso.percentual = perc;
            this.pai_seqs.comp_download_progress[this.comp.id] = perc;
            if (comp_id !== this.comp.id) return;
            MFt.clear(this.pai_seqs.tela_direita);
            MFt.criaElem('div', {
                innerText: `Carregando... (${perc}%)`,
                style: {
                    fontSize: '20px',
                    margin: '10px'
                }
            }, this.pai_seqs.tela_direita);
        };
        const monitorar_download = ()=>{
            return new Promise(rr=>{
                let tempo = 0;
                const interval = 500;
                const max_tempo = 120 * 1000; // segundos
                timer_monitorar = setInterval(()=>{
                    if (cancelar_download_flag) {
                        clearInterval(timer_monitorar);
                        rr(false);
                        return;
                    }
                    if (this.pai_seqs.comp_download_progress[this.comp.id] === 100 && this.pai_seqs.componentes[this.comp.id]) {
                        clearInterval(timer_monitorar);
                        rr(this.pai_seqs.componentes[this.comp.id]);
                    }
                    else {
                        // console.log(this.pai_seqs.comp_download_progress);
                        this.progresso.percentual = this.pai_seqs.comp_download_progress[this.comp.id];
                        const comp_id = parseInt(this.pai_seqs.tela_direita.getAttribute('comp_id'));
                        if (comp_id === this.comp.id) {
                            MFt.clear(this.pai_seqs.tela_direita);
                            MFt.criaElem('div', {
                                innerText: `Carregando... (${this.pai_seqs.comp_download_progress[this.comp.id]}%)`,
                                style: {
                                    fontSize: '20px',
                                    margin: '10px'
                                }
                            }, this.pai_seqs.tela_direita);
                        }
                        tempo += interval;
                        if (interval >= max_tempo) {
                            if (timer_problema) clearInterval(timer_problema);
                            clearInterval(timer_monitorar);
                            rr(false);
                        }
                    }
                }, 500);
            });
        };
        if (selecionar) d1.dispatchEvent(new Event('on_desmarcar_todos', {"bubbles":true, "cancelable":false}));
        if (selecionar) d1.style.background = 'rgba(200,255,200,0.44)';
        // Marca o elemento com o ID do componente a fim de que apenas o último documento que foi clicado seja exibido na tela.
        // Se o usuário clicar em dois documentos diferentes embora os dois estejam carregando ao mesmo tempo apenas o último que foi clicado será exibido.
        if (selecionar) this.pai_seqs.tela_direita.setAttribute('comp_id', this.comp.id.toString());
        if (selecionar) this.pai_seqs.tela_direita.setAttribute('comp_id_pagina', this?.anot?.pagina);
        // console.log(`TELA DIREITA COMP_ID: ${this.pai_seqs.tela_direita.getAttribute('comp_id')}, COMP_ID_PAGINA: ${this.pai_seqs.tela_direita.getAttribute('comp_id_pagina')}`);
        if (this.downloading) return;
        const d_adesivo = d1.getElementsByClassName('adesivo');
        this.progresso.append(d_adesivo[0]);
        if (!this.pai_seqs.componentes[this.comp.id]) { // Se não existe o arquivo do componente em this.pai_seqs...
            this.progresso.inicio_download();
            if (selecionar) MFt.clear(this.pai_seqs.tela_direita);
            if (selecionar) MFt.criaElem('div', {
                innerText: 'Carregando...',
                style: {
                    fontSize: '20px',
                    margin: '10px'
                }
            }, this.pai_seqs.tela_direita);
            this.downloading = true;
            // Download -----------------------------------------------------------
            let res;
            if (this.pai_seqs.comp_download_progress[this.comp.id] === undefined) {
                this.pai_seqs.comp_download_progress[this.comp.id] = 0; // Indica a todos os itens que este componente digital ja esta sendo baixado
                // DOWNLOAD iniciado aqui ----------------------------------------------**********************************
                res = await this.super_get(this.xml, this.get_componente(this.comp.id), null, null, exibir_progresso);
            }
            else { // DOWNLOAD ja foi iniciado em chamada anterior, preciso apenas monitorar
                res = await monitorar_download();
            } // Aqui o componente digital ja esta sendo baixado por outro item
            if (res === false) return; // Quando se cancela o download (apos 60 segundos sem mudanca do percentual de download) res vai ser falso
            this.progresso.cor = this?.anot?.cor ? AnotacoesCores.cores[this.anot.cor] || 'white' : 'white';
            if (!res) {
                delete this.pai_seqs.componentes[this.comp.id];
                alert('Não foi possível obter o componente digital.');
                return;
            }
            this.pai_seqs.comp_download_progress[this.comp.id] = 100;
            this.pai_seqs.componentes[this.comp.id] = res;
            finalizar_trabalhos();
            this.avaliar_inserir_nome_automatico();
        }
        const comp_id = parseInt(this.pai_seqs.tela_direita.getAttribute('comp_id'));
        const pag = this.pai_seqs.tela_direita.getAttribute('comp_id_pagina');
        if (this.comp.id === comp_id && pag === `${this?.anot?.pagina}` && selecionar) {
            this.exibir_componente(this.pai_seqs.componentes[this.comp.id], this?.anot?.pagina);
            this.progresso.cor = this?.anot?.cor ? AnotacoesCores.cores[this.anot.cor] || 'white' : 'white';
        }
    }

    async right_click(d1) {
        if (this.downloading) return;
        console.log(d1.parentNode);
        console.log(this.pai_seqs.tela_direita);
        const comp_id_1 = d1.parentNode.getAttribute('comp_id');
        const comp_id_2 = this.pai_seqs.tela_direita.getAttribute('comp_id');
        const pg1 = d1.parentNode.getAttribute('pagina');
        const pg2 = this.pai_seqs.tela_direita.getAttribute('comp_id_pagina');
        console.log(`d1.comp_id: ${comp_id_1}, tela_direita.comp_id: ${comp_id_2}`);
        console.log(`d1.pagina: ${pg1}, tela_direta.pagina: ${pg2}`)
        if ((comp_id_1 !== comp_id_2 || !comp_id_2) || (pg1 !== pg2)) { // abandonei este aqui. Só faz o efeito de exibir o documento se não houver documento sendo exibido
            // Só chama o colocar o documento na tela se se tratar de outro componente digital ou de outra pagina no componente digital
            // ... ou se não houver documento exibido na this.pai_seqs.tela_direta
            //console.log('click');
            //await this.click(d1);
        }
        if (!comp_id_2) { // Somente exibe o documento clicado com botão direito se não houver documento já sendo exibido
            console.log('click');
            console.log(typeof comp_id_2);
            await this.click(d1);
        }
        console.log(this.comp.mimetype);
        this.pai_seqs.anotar(this.comp.id, this?.anot?.pagina, this.titulo, this?.anot?.texto_html ? this.html_2_txt(this.anot.texto_html) : this?.anot?.texto_txt, this.anot?.cor, this.comp.mimetype);
        // else this.pai_seqs.anotar(this.comp.id, null, null, null, null, this.comp.mimetype);
    }

    exibir() {
        if (this.pai_seqs.vinculado) console.log(comp);
        this.main_div = MFt.criaElem('div', {

        }, this.elem, {
            comp_id: this.comp.id,
            pagina: this.anot?.pagina || 'null' // o null serve para a comparação em right_click() para não recarregar o pdf ou o html que já está sendo exibido
        });
        this.sub_div1 = MFt.criaElem('div', {
            style: this.sub_div1_style
        }, this.main_div);
        this.sub_div2 = MFt.criaElem('div', {
            style: {
                height: '0'
            }
        }, this.main_div);
        const nome_exibir = (()=>{
            if (this?.comp?.tipoDocumento) return this?.anot?.titulo ? this.anot.titulo : ((this.comp?.numeroUnicoDocumentoFormatado && this?.comp?.tipoDocumento?.nome ? `${this.comp.tipoDocumento.nome} n. ${this.comp?.numeroUnicoDocumentoFormatado}` : null) || `${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}`);
            else {
                console.log(this.comp);
                return "DESENTRANHADO";
            }
        })();
        if (this.comp?.numeroUnicoDocumentoFormatado) this.avaliar_inserir_nome_automatico_feito = true; // Não procura mais qual o nome do documento
        this.avaliar_inserir_nome_automatico();
        const s1 = MFt.criaElem('div', { // Icone do progresso de download
            style: {
                width: '17px',
                margin: '0 3px 0 0',
                display: 'inline-block',
                overflow: 'hidden',
                position: 'relative',
                top: '-3px'
            }
        }, this.sub_div1);
        const s2 = MFt.criaElem('div', { // Icone de Copy
            style: {
                width: '20px',
                margin: '0 3px 0 0',
                display: 'inline-block',
                overflow: 'hidden',
                cursor: 'pointer'
            }
        }, this.sub_div1);
        const s3 = MFt.criaElem('div', { // Icone de Info da juntada
            style: {
                width: '20px',
                margin: '0 3px 0 0',
                display: 'inline-block',
                overflow: 'hidden',
                cursor: 'pointer'
            }
        }, this.sub_div1);
        s2.appendChild(this.copy_icon);
        s3.appendChild(this.info_icon);
        s2.onclick = async ()=>{
            //this.copiar_elemento(null, null, `${this.anot.titulo} (<a href="https://sapiens.agu.gov.br/documento/${this.anot.id_comp}${this?.anot?.pagina ? '#page=' + this.anot.pagina.toString() : ''}" target="_blank">Seq. ${this.pai_seqs.juntada.numeracaoSequencial}, ${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}${this?.anot?.pagina ? ', pag.' + this.anot.pagina.toString() : ''}</a>)`);
            // TODO: Verificar porque o copiar colar não está funcionando
            // this.copiar_elemento(null, null, `${this.anot.titulo} (Seq. ${this.pai_seqs.juntada.numeracaoSequencial}, ${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}${this?.anot?.pagina ? ', pag.' + this.anot.pagina.toString() : ''})`);
            const complemento = (()=>{
                return this.pai_seqs?.itens?.length > 1 ? `, ${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}${this?.anot?.pagina ? ', pág.' + this.anot.pagina.toString() : ''}` : '';
            })();
            this.copiar_clipboard(`(Seq. ${this.pai_seqs.juntada.numeracaoSequencial}${complemento})`);
            const m = new MsgGenerica('Referência copiada', 200, 30);
            m.p1.style.fontFamily = 'Titillium Web';
            await this.esperar(1000);
            m.closeWindow(m);
        };
        s2.oncontextmenu = async e=>{
            e.preventDefault();
            e.stopPropagation();
            const existemVinculados = (()=>{
                //console.group('existem vinculados logica');
                //console.log('this.pai_seqs?.juntada?.documento?.vinculacoesDocumentos', this.pai_seqs?.juntada?.documento?.vinculacoesDocumentos);
                //console.log('this.pai_seqs.juntada.documento?.componentesDigitais?.length > 1)', this.pai_seqs.juntada.documento?.componentesDigitais?.length);
                //console.groupEnd();
                if (
                    !Array.isArray(this.pai_seqs?.juntada?.documento?.vinculacoesDocumentos)
                ) return false;
                return this.pai_seqs.juntada.documento.vinculacoesDocumentos?.length > 0 ||
                    this.pai_seqs.juntada.documento?.componentesDigitais?.length > 1;
            })();
            const haOutroItemNaMesmaNumeracaoSequencial = ()=>{
                //console.group('ITEM PAI_SEQS');
                //console.log(this.pai_seqs);
                //console.log('Comps digitais:', this.pai_seqs?.juntada?.documento?.componentesDigitais?.length);
                //console.groupEnd();
                //if (Array.isArray(this.pai_seqs?.juntada?.documento?.componentesDigitais)) return this.pai_seqs?.juntada?.documento?.componentesDigitais.length > 1;
                //console.group('Logica haOutroItemNaMesmaNumeracaoSequencial');
                //console.log('this.pai_seqs.itens.length > 1', this.pai_seqs.itens.length > 1, this.pai_seqs.itens.length);
                //console.log('this !== this.pai_seqs.itens[0]', this !== this.pai_seqs.itens[0]);
                //console.log('existemVinculados', existemVinculados);
                //console.groupEnd();
                return this.pai_seqs.itens.length > 1 && this !== this.pai_seqs.itens[0] && existemVinculados;
            }
            const complemento = (()=>{
                const nomeOriginal = `${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}`;
                const part1 = haOutroItemNaMesmaNumeracaoSequencial() ? `, ${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada !== this.comp.tipoDocumento.nome ? this.comp.numeracao_sequencial_calculada : ''}` : '';
                const part2 = `${this?.anot?.pagina && this?.comp?.mimetype === 'application/pdf' && this?.anot?.pagina > 1 ? ', pág.' + this.anot.pagina.toString() : ''}`;
                return this.anot.titulo !== nomeOriginal ? part1 + part2 : '';
            })();
            //const complemento = (()=>{
            //    return this.pai_seqs?.itens?.length > 1 ? `${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}${this?.anot?.pagina ? ', pág.' + this.anot.pagina.toString() : ''}` : '';
            //})();
            //console.log('COMPLEMENTO', complemento);
            const value = `${this.anot.titulo} (Seq. ${this.pai_seqs.juntada.numeracaoSequencial}${complemento || ''})`;
            this.copiar_clipboard(value);
            const m = new MsgGenerica('Título e referência copiados', 200, 30);
            m.p1.style.fontFamily = 'Titillium Web';
            await this.esperar(1000);
            m.closeWindow(m);
        }
        s3.onclick = ()=>this.info_juntada(this?.pai_seqs?.juntada?.id, this.comp.id);
        this.pai_seqs.dicas.push(new Dica(this.copy_icon, 'Copiar Título ou clique c/ botão direito para copiar título e referência.'));
        this.progresso.append(s1);
        this.progresso.cor = !isNaN(this.anot?.cor) ? AnotacoesCores.get_cor(parseInt(this.anot.cor)) : 'transparent';
        s1.className = 'adesivo';
        this._div_titulo.setAttribute('comp_id', this.comp.id);
        if (this.anot) this._div_titulo.setAttribute('pagina', this.anot.pagina);
        this.sub_div1.appendChild(this._div_titulo);
        const div_anot = MFt.criaElem('div', {
            innerText: this?.anot?.texto_txt || '',
            style: {
                background: '#FFF',
                borderRadius: '6px',
                border: '1px solid #CCC',
                display: 'none',
                position: 'relative',
                zIndex: '2',
                padding: '5px 10px',
                textAlign: 'justify',
                margin: '0 15px 0 5px',
                boxShadow: '3px 3px 6px #BBB',
                transition: '0.5s easy-in',
                //gridColumn: '1/4' // Faz com que o elemento ocupe as colunas 1, 2 e 3 do grid.
            }
        }, this.sub_div2);
        // div_anot.style.zIndex = '2'
        this.titulo = nome_exibir;
        //this.dica = new Dica(this._div_titulo, `Seq. ${this.pai_seqs.juntada.numeracaoSequencial}, ${this.comp.tipoDocumento.nome} ${this.comp.numeracao_sequencial_calculada}${this?.anot?.pagina ? ', pag.' + this.anot.pagina.toString() : ''}`, -8, -5);
        this.pai_seqs.dicas.push(this.dica);
        window.addEventListener('on_desmarcar_todos', e=>{
            if (e.target !== this.sub_div1) {
                this.backgroundColor = this.backgroundColorEstado = this.backgroundColorNaoSelecionado;
                this.sub_div1.style.background = this.backgroundColor;
                this.item_selecionado = false;
            }
        });
        this._div_titulo.oncontextmenu = e=>{
            e.preventDefault();
            e.stopPropagation();
            this.right_click(this.sub_div1);
        }
        this._div_titulo.onclick = e=>{
            console.log(e);
            this.click(this.sub_div1);
            this.pai_seqs.pai.add_historico_item_visualizado(this);
        }
        // ------------------------ MOUSE ENTER / LEAVE
        this.sub_div1.onmouseenter = ()=>{
            this.backgroundColor = this.backgroundColorHover;
        }
        this.sub_div1.onmouseleave = ()=>{
            this.backgroundColor = this.backgroundColorEstado;
            this.sub_div1.style.border = '1px solid transparent';
        }
        s1.onmouseenter = ()=>{
            if (this?.anot?.texto_txt) div_anot.style.display = 'block';
        }
        s1.onmouseleave = ()=>{
            if (this?.anot?.texto_txt) div_anot.style.display = 'none';
        }
        const comp_id = parseInt(this.pai_seqs.tela_direita.getAttribute('comp_id'));
        const comp_id_pagina = parseInt(this.pai_seqs.tela_direita.getAttribute('comp_id_pagina'));
        // console.log(`COMP_ID: ${comp_id}, COMP_ID_PAGINA: ${comp_id_pagina}, ${this?.anot?.pagina}`);
        if (comp_id === this.comp.id && comp_id_pagina === this?.anot?.pagina) {
            this.backgroundColorEstado = this.backgroundColor = this.backgroundColorSelecionado;
        }
    }

    exibir_componente(arquivo, page=1) {
        page = page || 1;
        let binary_data, doc, d1, d2;
        MFt.clear(this.pai_seqs.tela_direita);

        const _URL = window.URL || window.webkitURL;
        let iframe = MFt.criaElem('iframe', {
            style: {
                height: '100%',
                width: '100%',
                border: 'none'
            }
        });
        switch(arquivo.mimetype){ // Exibe o PDF ou o HTML
            case "application/pdf":
                MFt.clear(this.pai_seqs.tela_direita);
                this.blob = new Blob([this.extract_data_from_conteudo(arquivo.conteudo)], { type: 'application/pdf',  });
                doc = _URL.createObjectURL(this.blob);
                iframe.onload = ()=>{
                    var link = doc.toString();
                    // console.log(link);
                    if (link.indexOf('#page=') > 0) {
                        link = doc.toString().substr(0, doc.toString().indexOf('#page='));
                    }
                    iframe.contentWindow.location.href = link + `#page=${page}`;
                    // da erro de cross-origin no Firefox // iframe.contentWindow.location.reload();
                };
                iframe.src = doc;
                this.pai_seqs.tela_direita.appendChild(iframe);
                this.pai_seqs.tela_direita.setAttribute('identificador', this.comp.id); // Serve para dizer se o item ainda está selecionado quando terminar de carregar
                iframe.focus();
                // self.anotarIframe(self.dir);
                break;
            case "text/html":
                this.pai_seqs.tela_direita.setAttribute('identificador', this.comp.id); // Serve para dizer se o item ainda está selecionado quando terminar de carregar
                MFt.clear(this.pai_seqs.tela_direita);
                // PARA OBTER O TEXTO DO HTML EM UTF-8, NECESSÁRIO SEGUIR AS DUAS LINHAS ABAIXO. MAS O IFRAME PODE SER CRIADO APENAS INDICANDO O SRC= AO CONTEUDO, PORQUE O NAVEGADOR ENTENDE
                // const res = this.extract_data_from_conteudo(comp.conteudo);
                // const td = new TextDecoder().decode(res);
                d1 = MFt.criaElem('div', { // iframe vai ser uma DIV
                    id: 'local_do_iframe',
                    style : {
                        margin : '5px',
                        overflow : 'hidden',
                        overflowX : 'hidden',
                        paddingLeft : '30px',
                        paddingRight : '0px',
                        height : 'calc(100% - 20px)'
                    }
                }, this.pai_seqs.tela_direita, {substituto_iframe:''});
                iframe.src = arquivo.conteudo;
                d1.appendChild(iframe);
                this.avaliar_inserir_nome_automatico();
                break;
            case 'image/png':
            case 'image/jpeg':
                this.pai_seqs.tela_direita.setAttribute('identificador', this.comp.id); // Serve para dizer se o item ainda está selecionado quando terminar de carregar
                MFt.clear(this.pai_seqs.tela_direita);
                d1 = MFt.criaElem('div', {
                    style : {
                        margin : '5px',
                        overflow : 'scroll',
                        overflowX : 'hidden',
                        paddingLeft : '30px',
                        paddingRight : '30px',
                        height : 'calc(100% - 10px)'
                    }
                }, this.pai_seqs.tela_direita);
                let img = new Image();
                // extrair o nome da imagem que vem incluída em arquivo.conteúdo e que impede a exibição da imagem
                // Exemplo: "data:image/jpeg;name=01-07-22#NF95#ARTUR-HOTEL#200-00.JPEG;charset=utf-8;base64,/9j/4A..."
                // A parte do "name=..." precisa ser excluída porque os browsers não entendem
                img.src = this.extract_name_from_source_image_base64(arquivo.conteudo);
                img.style.width = 'calc(100% - 10px)';
                d1.appendChild(img);
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                break;
            default:
            //this.disc['innerHTML'] = this.comp.mimetype;
        }
        // this.botao_anotar();
        this.menu_doc();
    }

    /**
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
     * Recebe o texto em html e devolve o tipo e numero da peca juridica, se for uma.
     * @returns {string}
     * @param comp
     */
    analisar_tipo_peca(comp) {
        const tempo = new Date();
        const res = this.extract_data_from_conteudo(comp);
        let html = new TextDecoder().decode(res);
        let tmp = html.indexOf('data:image'); // Aqui é o primeiro sinal após o brasão da república
        if (tmp > 0) {
            const tmp2 = html.indexOf('>', tmp);
            html = html.substr(tmp2 + 1, 1000); // Limito a 1000 caracteres depois do brasão para acelerar o código
        }
        else {
            tmp = html.indexOf('<body>');
            if (tmp > 0) {
                html = html.substr(tmp + 6, 5000);
                // Quando é certidão de arquivamento, existe essa tag abaixo que fica dando erro, mas sem atrapalhar o programa
                html = html.replace('<img src="/images/sapiens_cinza.png"/>', '');
            }
            else {
                // console.log('NAO ENCONTRADO O BODY ----------------------------');
                // console.log(html);
            }
        }
        var rgxs = [ // SEMELHANTE AO QUE EXISTE EM encontrar_peca_juntada.js SÓ QUE SEM OS GRUPOS
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/\\s*[\\w\\-ªº]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[a-z\\-]+\\s*\\/\\s*[a-z\\-]+', // PARECER n. 00680 / 2020 / NUCJUR / E-CJU / AQUISIÇÕES / CGU / AGU    e variações
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]\\s*([0-9]+\\s*\\/\\s*[0-9]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+)', // COM a sigla do advogado, Exemplo: COTA n. 00008/2022/SCPS/NUCJUR/E-CJU/PATRIMÔNIO/CGU/AGU
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\/[A-ZÇÕÔ\\-]+\\s*\\/[\\w\\-]+\\/\\w+',
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+\\/\\w+',
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+',
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\Wªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+',
            '^\\s*(ORIENTAÇÃO\\s*NORMATIVA\\s*AGU)\\sn[º\\.°]º*\\s*[0-9]*',
            '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\sn*\\.*º*\\s\\w+\\/\\w+',
            '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\sn*\\.*º*\\s[0-9]+\\/[0-9]+',
            '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\sn*\\.*º*\\s[0-9]+\\/[0-9]+',
            '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ]+\\sn*\\.*º*\\s\\w+' // Ex.: PORTARIA n. 00002
        ];
        let div = MFt.criaElem('div', {
            innerHTML: html
        });
        var ps = div.getElementsByTagName('p');
        for(let i = 0, maxi = Math.min(ps.length, 20); i < maxi; i++){
            let texto = ps[i].textContent;
            for(let j = 0, maxj = rgxs.length; j < maxj; j++) {
                var tmpRE = new RegExp(rgxs[j], 'i');
                let res = tmpRE.exec(texto);
                if (res) {
                    console.log(`Analisar Tipo Peca: ${new Date().valueOf() - tempo.valueOf()}ms`);
                    return res[0].trim();
                }
            }
        }
        return '';
    }

    avaliar_inserir_nome_automatico() {
        // console.log('AVALIAR_INSERIR_NOME_AUTOMATICO ----------------------');
        // console.log(this.comp);
        const tempo = new Date();
        const inserir_anotacao_em_pai_seqs_anotacoes = anotacao=>{
            // primeiro procura saber se já existe a anotação pelo id_comp
            // não precisa procurar por página porque aqui só trata de html
            console.group('INSERIR_ANOTACAO_EM_PAI_ANOTACOES()');
            console.log('this.pai_seqs antes');
            console.log(this.pai_seqs);
            if (this.pai_seqs.pai.anotacoes.filter(d=>d.id_comp === anotacao.id_comp)) {
                for(let i = 0; i < this.pai_seqs.pai.anotacoes.length; i++) {
                    const nota = this.pai_seqs.pai.anotacoes[i];
                    if (nota.id_comp === anotacao.id_comp) {
                        this.pai_seqs.pai.anotacoes[i] = anotacao;
                        break;
                    }
                }
            }
            else this.pai_seqs.pai.anotacoes.push(anotacao);
            console.groupEnd();
        };
        let dados = undefined;
        if (!this?.anot?.rowid) {  // Existe anotação, mas não veio do DB porque não tem rowid. O rowid vai sinalizar se a peça já teve o seu título editado ou não.
            const arquivo = this.pai_seqs.componentes[this.comp.id];
            const titulo = arquivo?.conteudo ? this.analisar_tipo_peca(arquivo?.conteudo) : undefined;
            if (titulo) { // Deu para ler o conteudo do componente digital
                // request sem esperar o resultado
                // console.log(titulo);
                this.titulo = titulo;
                dados = {
                    titulo,
                    nup: this.validaNUP(this.pai_seqs.processo.NUP),
                    id_proc: this.pai_seqs.processo.id,
                    id_comp: this.comp.id,
                };
            }
            else {
                const tipo_doc = this.comp?.tipoDocumento?.nome;
                const numeracao = this.comp?.numeroUnicoDocumentoFormatado;
                if (tipo_doc && numeracao) {
                    this.titulo = `${tipo_doc} n. ${numeracao}`;
                    dados = {
                        titulo: this.titulo,
                        nup: this.validaNUP(this.pai_seqs.processo.NUP),
                        id_proc: this.pai_seqs.processo.id,
                        id_comp: this.comp.id,
                    };
                    if (this?.anot?.cor) dados.cor = this?.anot?.cor;
                }
                // console.log(tipo_doc);
                // console.log(numeracao);
                // console.log(this.titulo);
                // console.log(dados);
            }
        }
        if (dados && dados?.titulo && dados?.titulo !== 'undefined' && !this.avaliar_inserir_nome_automatico_feito) {
            this.titulo = dados.titulo;
            this.avaliar_inserir_nome_automatico_feito = true;
            this.alimentar_db_pecas(dados).then(rr=>{
                console.group(`alimentar_db_pecas -> rr`);
                console.log(rr);
                console.log("THIS -------------------------------");
                console.log(this);
                console.groupEnd();
                if (Number.isInteger(rr?.rowid)) {
                    this.anot = dados;
                    inserir_anotacao_em_pai_seqs_anotacoes(dados);
                } // Evita que seja feito um novo request de inserir o titulo no DB
            });
        }
        // const tempoAnalise = new Date().valueOf() - tempo.valueOf();
        // console.log(`Avaliar Inserir Nome Automatico: ${tempoAnalise}ms`);
        // if (tempoAnalise > 200) console.trace();
    }

    async alimentar_db_pecas(dd) {
        const tempo = new Date();
        const url = 'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/super.py';
        dd.task = 'set_titulo';
        dd.token = this.auth;
        const res = await this.request_mf(url, dd);
        console.group('Resultado de alimentar_db_pecas');
        console.log(res);
        console.log(`Tempo: ${new Date().valueOf() - tempo.valueOf()}ms`);
        console.groupEnd();
        return res;
    }

    botao_anotar() {
        const wrapper = MFt.criaElem('div', {
            style: {
                position: 'absolute',
                top: '1px',
                left: '1px'
            }
        }, this.pai_seqs.pai.telas.telaDireita);
        const bt = new MFt.bt({
            value: 'Anotar',
            width: 80,
            height: 20,
            wrapper,
            callback: ()=>{
                // this.pai_seqs.anotar(this.comp.id, this?.anot?.pagina, this.titulo, this?.anot?.texto_html ? this.html_2_txt(this.anot.texto_html) : this?.anot?.texto_txt, this.anot?.cor, this.comp.mimetype);
                if (this.comp.mimetype === 'application/pdf') this.pai_seqs.anotar(this.comp.id, null, null, null, null, this.comp.mimetype);
                else this.pai_seqs.anotar(this.comp.id, this?.anot?.pagina, this.titulo, this?.anot?.texto_html ? this.html_2_txt(this.anot.texto_html) : this?.anot?.texto_txt, this.anot?.cor, this.comp.mimetype);
            }
        })
    }

    menu_doc() {
        const wrapper = MFt.criaElem('div', {
            style: {
                position: 'absolute',
                top: '1px',
                left: '1px',
            }
        }, this.pai_seqs.pai.telas.telaDireita);
        let ops = [
            {label: 'Anotar', exec: ()=>{this.anotar();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMTYwLTQwMHYtODBoMjgwdjgwSDE2MFptMC0xNjB2LTgwaDQ0MHY4MEgxNjBabTAtMTYwdi04MGg0NDB2ODBIMTYwWm0zNjAgNTYwdi0xMjNsMjIxLTIyMHE5LTkgMjAtMTN0MjItNHExMiAwIDIzIDQuNXQyMCAxMy41bDM3IDM3cTggOSAxMi41IDIwdDQuNSAyMnEwIDExLTQgMjIuNVQ4NjMtMzgwTDY0My0xNjBINTIwWm0zMDAtMjYzLTM3LTM3IDM3IDM3Wk01ODAtMjIwaDM4bDEyMS0xMjItMTgtMTktMTktMTgtMTIyIDEyMXYzOFptMTQxLTE0MS0xOS0xOCAzNyAzNy0xOC0xOVoiLz48L3N2Zz4='},
        ];
        if (this.comp.mimetype === 'text/html') {
            ops.push({label: 'Clonar documento como minuta', exec: ()=>{this.clonar_doc();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNzYwLTIwMEgzMjBxLTMzIDAtNTYuNS0yMy41VDI0MC0yODB2LTU2MHEwLTMzIDIzLjUtNTYuNVQzMjAtOTIwaDI4MGwyNDAgMjQwdjQwMHEwIDMzLTIzLjUgNTYuNVQ3NjAtMjAwWk01NjAtNjQwdi0yMDBIMzIwdjU2MGg0NDB2LTM2MEg1NjBaTTE2MC00MHEtMzMgMC01Ni41LTIzLjVUODAtMTIwdi01NjBoODB2NTYwaDQ0MHY4MEgxNjBabTE2MC04MDB2MjAwLTIwMCA1NjAtNTYwWiIvPjwvc3ZnPg=='});
            ops.push({label: 'Copiar link público', exec: ()=>{this.copiar_link_publico();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDAtMzYwdi0yNDBoNjB2ODBoODB2LTgwaDYwdjI0MGgtNjB2LTEwMGgtODB2MTAwSDQwWm0zMDAgMHYtMTgwaC02MHYtNjBoMTgwdjYwaC02MHYxODBoLTYwWm0yMjAgMHYtMTgwaC02MHYtNjBoMTgwdjYwaC02MHYxODBoLTYwWm0xNjAgMHYtMjQwaDE0MHEyNCAwIDQyIDE4dDE4IDQydjQwcTAgMjQtMTggNDJ0LTQyIDE4aC04MHY4MGgtNjBabTYwLTE0MGg4MHYtNDBoLTgwdjQwWiIvPjwvc3ZnPg=='});
            ops.push({label: 'Copiar Referência + Link', exec: ()=>{this.copiar_referencia_link();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDQwLTI4MEgyODBxLTgzIDAtMTQxLjUtNTguNVQ4MC00ODBxMC04MyA1OC41LTE0MS41VDI4MC02ODBoMTYwdjgwSDI4MHEtNTAgMC04NSAzNXQtMzUgODVxMCA1MCAzNSA4NXQ4NSAzNWgxNjB2ODBaTTMyMC00NDB2LTgwaDMyMHY4MEgzMjBabTIwMCAxNjB2LTgwaDE2MHE1MCAwIDg1LTM1dDM1LTg1cTAtNTAtMzUtODV0LTg1LTM1SDUyMHYtODBoMTYwcTgzIDAgMTQxLjUgNTguNVQ4ODAtNDgwcTAgODMtNTguNSAxNDEuNVQ2ODAtMjgwSDUyMFoiLz48L3N2Zz4='});
            ops.push({label: 'Salvar peça como referência', exec: ()=>{new SalvarPeca(this.comp.id, this.anot.titulo)}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMjAwLTEyMHEtMzMgMC01Ni41LTIzLjVUMTIwLTIwMHYtNTYwcTAtMzMgMjMuNS01Ni41VDIwMC04NDBoNDgwbDE2MCAxNjB2MjEycS0xOS04LTM5LjUtMTAuNXQtNDAuNS41di0xNjlMNjQ3LTc2MEgyMDB2NTYwaDI0MHY4MEgyMDBabTAtNjQwdjU2MC01NjBaTTUyMC00MHYtMTIzbDIyMS0yMjBxOS05IDIwLTEzdDIyLTRxMTIgMCAyMyA0LjV0MjAgMTMuNWwzNyAzN3E4IDkgMTIuNSAyMHQ0LjUgMjJxMCAxMS00IDIyLjVUODYzLTI2MEw2NDMtNDBINTIwWm0zMDAtMjYzLTM3LTM3IDM3IDM3Wk01ODAtMTAwaDM4bDEyMS0xMjItMTgtMTktMTktMTgtMTIyIDEyMXYzOFptMTQxLTE0MS0xOS0xOCAzNyAzNy0xOC0xOVpNMjQwLTU2MGgzNjB2LTE2MEgyNDB2MTYwWm0yNDAgMzIwaDRsMTE2LTExNXYtNXEwLTUwLTM1LTg1dC04NS0zNXEtNTAgMC04NSAzNXQtMzUgODVxMCA1MCAzNSA4NXQ4NSAzNVoiLz48L3N2Zz4='});
            ops.push({label: 'Visualizar para assinar', exec: ()=>{this.visualizar_para_assinar();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNTYzLTQ5MXE3My01NCAxMTQtMTE4LjVUNzE4LTczOHEwLTMyLTEwLjUtNDdUNjc5LTgwMHEtNDcgMC04MyA3OS41VDU2MC01NDFxMCAxNCAuNSAyNi41VDU2My00OTFaTTEyMC0xMjB2LTgwaDgwdjgwaC04MFptMTYwIDB2LTgwaDgwdjgwaC04MFptMTYwIDB2LTgwaDgwdjgwaC04MFptMTYwIDB2LTgwaDgwdjgwaC04MFptMTYwIDB2LTgwaDgwdjgwaC04MFpNMTM2LTI4MGwtNTYtNTYgNjQtNjQtNjQtNjQgNTYtNTYgNjQgNjQgNjQtNjQgNTYgNTYtNjQgNjQgNjQgNjQtNTYgNTYtNjQtNjQtNjQgNjRabTQ4Mi00MHEtMzAgMC01NS0xMS41VDUyMC0zNjlxLTI1IDE0LTUxLjUgMjVUNDE0LTMyMmwtMjgtNzVxMjgtMTAgNTMuNS0yMS41VDQ4OS00NDNxLTUtMjItNy41LTQ4dC0yLjUtNTZxMC0xNDQgNTctMjM4LjVUNjc5LTg4MHE1MiAwIDg1IDM4LjVUNzk3LTczNHEwIDg2LTU0LjUgMTcwVDU5MS00MTNxNyA3IDE0LjUgMTAuNVQ2MjEtMzk5cTI2IDAgNjAuNS0zM3Q2Mi41LTg3bDczIDM0cS03IDE3LTExIDQxdDEgNDJxMTAtNSAyMy41LTE3dDI3LjUtMzBsNjMgNDlxLTI2IDM2LTYwIDU4dC02MyAyMnEtMjEgMC0zNy41LTEyLjVUNzMzLTM3MXEtMjggMjUtNTcgMzh0LTU4IDEzWiIvPjwvc3ZnPg=='});
            ops.push({label: 'Imprimir', exec: ()=>{this.imprimir_peca();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNjQwLTY0MHYtMTIwSDMyMHYxMjBoLTgwdi0yMDBoNDgwdjIwMGgtODBabS00ODAgODBoNjQwLTY0MFptNTYwIDEwMHExNyAwIDI4LjUtMTEuNVQ3NjAtNTAwcTAtMTctMTEuNS0yOC41VDcyMC01NDBxLTE3IDAtMjguNSAxMS41VDY4MC01MDBxMCAxNyAxMS41IDI4LjVUNzIwLTQ2MFptLTgwIDI2MHYtMTYwSDMyMHYxNjBoMzIwWm04MCA4MEgyNDB2LTE2MEg4MHYtMjQwcTAtNTEgMzUtODUuNXQ4NS0zNC41aDU2MHE1MSAwIDg1LjUgMzQuNVQ4ODAtNTIwdjI0MEg3MjB2MTYwWm04MC0yNDB2LTE2MHEwLTE3LTExLjUtMjguNVQ3NjAtNTYwSDIwMHEtMTcgMC0yOC41IDExLjVUMTYwLTUyMHYxNjBoODB2LTgwaDQ4MHY4MGg4MFoiLz48L3N2Zz4='});
            if (this.profile.id === 8499) {
                ops.push({label: 'Inserir no DB', exec: ()=>{this.inserir_db();}, icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDgwLTEyMHEtMTUxIDAtMjU1LjUtNDYuNVQxMjAtMjgwdi00MDBxMC02NiAxMDUuNS0xMTNUNDgwLTg0MHExNDkgMCAyNTQuNSA0N1Q4NDAtNjgwdjQwMHEwIDY3LTEwNC41IDExMy41VDQ4MC0xMjBabTAtNDc5cTg5IDAgMTc5LTI1LjVUNzYwLTY3OXEtMTEtMjktMTAwLjUtNTVUNDgwLTc2MHEtOTEgMC0xNzguNSAyNS41VDIwMC02NzlxMTQgMzAgMTAxLjUgNTVUNDgwLTU5OVptMCAxOTlxNDIgMCA4MS00dDc0LjUtMTEuNXEzNS41LTcuNSA2Ny0xOC41dDU3LjUtMjV2LTEyMHEtMjYgMTQtNTcuNSAyNXQtNjcgMTguNVE2MDAtNTI4IDU2MS01MjR0LTgxIDRxLTQyIDAtODItNHQtNzUuNS0xMS41UTI4Ny01NDMgMjU2LTU1NHQtNTYtMjV2MTIwcTI1IDE0IDU2IDI1dDY2LjUgMTguNVEzNTgtNDA4IDM5OC00MDR0ODIgNFptMCAyMDBxNDYgMCA5My41LTd0ODcuNS0xOC41cTQwLTExLjUgNjctMjZ0MzItMjkuNXYtOThxLTI2IDE0LTU3LjUgMjV0LTY3IDE4LjVRNjAwLTMyOCA1NjEtMzI0dC04MSA0cS00MiAwLTgyLTR0LTc1LjUtMTEuNVEyODctMzQzIDI1Ni0zNTR0LTU2LTI1djk5cTUgMTUgMzEuNSAyOXQ2Ni41IDI1LjVxNDAgMTEuNSA4OCAxOC41dDk0IDdaIi8+PC9zdmc+'});
            }
        }
        const menu = new Menu(this, wrapper, 20, '/images/menu_red.png', ops, 'MENU DO DOCUMENTO');
    }

    anotar() {
        // Bookmark do Super vai aqui e está na classe TelaAnotacao (tela_anotacao.js), mas quem faz o gerenciamento é marcadores_atualizar.js
        if (this.comp.mimetype === 'application/pdf') this.pai_seqs.anotar(this.comp.id, null, null, null, null, this.comp.mimetype);
        else this.pai_seqs.anotar(this.comp.id, this?.anot?.pagina, this.titulo, this?.anot?.texto_html ? this.html_2_txt(this.anot.texto_html) : this?.anot?.texto_txt, this.anot?.cor, this.comp.mimetype);
    }

    html_2_txt(html) {
        const d1 = MFt.criaElem('div', {innerHTML: html});
        const elems = d1.childNodes;
        let texto = '';
        for(let e of elems) texto += e.innerText + '\n';
        return texto;
    }

    async clonar_doc() {
        const pop_tarefas = new ExibirTarefas();
        const tarefa = await pop_tarefas.iniciar();
        console.log(tarefa);
        const pp = new ClonarDocumentoPopUp(tarefa, this.comp.id);
        pp.iniciar();
    }

    async copiar_link_publico() {
        this.copiar_elemento(`https://sapiens.agu.gov.br/valida_publico?id=${this.comp.id}`);
        const msg = new MsgGenerica("Link copiado para área de transferência", 300, 40);
        await this.esperar(2000);
        this.registrar_evento(`Copiado link público: ${this?.anot?.titulo} (${this.comp.id}).`);
        msg.closeWindow(msg)
    }

    async copiar_referencia_link() {
        this.copiar_elemento(`${this.titulo} (NUP ${this.formatanup(this.pai_seqs.processo.NUP)}, Seq. ${this.pai_seqs.juntada.numeracaoSequencial})`, `https://sapiens.agu.gov.br/valida_publico?id=${this.comp.id}`);
        const msg = new MsgGenerica("Referência na área de transferência", 300, 40);
        await this.esperar(2000);
        msg.closeWindow(msg)
    }

    imprimir_peca() {
        if (this.comp.mimetype !== 'text/html') {
            alert('Opção disponível apenas para arquivos HTML');
            return;
        }
        const imp = window.open('../branco.html');
        imp.onload = ()=>{
            imp.document.body['innerHTML'] = this.html_from_conteudo(this.pai_seqs.componentes[this.comp.id]);
            if (this?.anot?.titulo) imp.document.title = this.anot.titulo;
            imp.print();
        };
    }

    visualizar_para_assinar() {
        if (this.comp.mimetype !== 'text/html') {
            alert('Opção disponível apenas para arquivos HTML');
            return;
        }
        let imp;
        if (this?.anot?.titulo) imp = window.open(`/pesquisa/sapiensdoc.html?id=${this.comp.id}&nome_peca=${this.anot.titulo}`);
        else imp = window.open(`/pesquisa/sapiensdoc.html?id=${this.comp.id}`);
        this.registrar_evento(`Visualizar para assinar: ${this?.anot?.titulo} (${this.comp.id}).`);
    }

    /**
     * Extrair o nome da imagem que vem incluída em arquivo.conteúdo e que impede a exibição da imagem
     * Exemplo: "data:image/jpeg;name=01-07-22#NF95#ARTUR-HOTEL#200-00.JPEG;charset=utf-8;base64,/9j/4A..."
     * A parte do "name=..." precisa ser excluída porque os browsers não entendem
     */
    extract_name_from_source_image_base64(src) {
       const re = new RegExp("(name=[\\w\\W]+);charset=");
       let res;
       if ((res = re.exec(src))) {
           const novo = src.replace(res[1], "");
           return novo;
       }
       else return src;
    }

    info_juntada(juntadaID, compDigitalID) {
        const pop = new PopUp(800, 470, null, null, async form=>{
            form.div.innerText = 'Aguarde...';
            const req = new RequestMF();
            const juntada = await this.super_get(req, this.get_juntada_pelo_id(juntadaID), true, true);
            console.group(`item.js - info_juntada() - Juntada ID: ${juntadaID}, Comp. Digital ID: ${compDigitalID}`);
            console.log(juntada);
            if (typeof juntada === 'object') {
                const newdiv = div=>{
                    return MFt.criaElem('div', {}, div || d1);
                }
                const secao = (titulo, elem)=>{
                    if (!(elem instanceof HTMLElement)) throw new Error("elem deveria ser HTMLElement");
                    MFt.criaElem('div', {
                        innerText: titulo,
                        style: {
                            fontWeight: 'bold',
                            padding: '5px',
                            backgroundColor: 'rgb(236,236,236)',
                        }
                    }, elem);
                }
                MFt.clear(form.div);
                const d0 = MFt.criaElem('div', {
                    style: {
                        fontFamily: 'Titillium Web',
                        fontSize: '16px',
                        height: '100%',
                        overflowY: 'scroll',
                    }
                }, form.div);
                const d1 = MFt.criaElem('div', {
                    style: {
                        fontFamily: 'Titillium Web',
                        fontSize: '16px'
                    }
                }, d0);
                const d2 = MFt.criaElem('div', {
                    style: {
                        fontFamily: 'Titillium Web',
                        fontSize: '16px'
                    }
                }, d0);
                MFt.criaElem('div', {
                    innerText: 'Informações sobre a juntada',
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        padding: '5px',
                        background: 'rgb(236, 236, 236)'
                    }
                }, d1);
                this.exibirCampo('ID', (juntada?.id).toString(), newdiv());
                this.exibirCampo('Descrição', juntada?.descricao, newdiv());
                this.exibirCampo('Tipo', juntada?.documento?.tipoDocumento?.nome, newdiv());
                if (juntada?.documento?.numeroUnicoDocumentoFormatado) this.exibirCampo('Número Único Formatado', juntada.documento.numeroUnicoDocumentoFormatado, newdiv());
                this.exibirCampo('Juntado por', `${juntada?.criadoPor?.nome} (${juntada?.criadoPor?.id})`, newdiv());
                this.exibirCampo('Juntado em', this.date2normal(this.valida_data_hora(juntada?.criadoEm), true), newdiv());
                if (juntada?.numeracaoSequencial) this.exibirCampo('Numeração Sequencial', juntada?.numeracaoSequencial.toString(), newdiv());
                const divComponentes = MFt.criaElem('div', {
                    style: {
                        marginLeft: '30px'
                    }
                }, d1);
                // Since I got "juntada" the "componenteDigital" can be either in "juntada.documento.componentesDigitais" or in "juntada.documento.vinculacoesDocumentos[XX].documentoVinculado.componentesDigitais[XX]"
                if (Array.isArray(juntada?.documento?.componentesDigitais) && juntada.documento.componentesDigitais.find(d=>d.id === compDigitalID)) {
                    switch (juntada?.documento?.componentesDigitais?.length) {
                        case 0:
                            secao('Nenhum componente digital juntado', divComponentes);
                            break;
                        case 1:
                            secao('Componente Digital Juntado', divComponentes);
                            break;
                        default:
                            secao('Componentes Digitais Juntados', divComponentes);
                    }
                    if (juntada?.documento?.componentesDigitais?.length) {
                        let cc = 1;
                        for (let cd of juntada.documento.componentesDigitais) {
                            if (juntada?.documento?.componentesDigitais?.length > 1) {
                                MFt.criaElem('div', {
                                    innerText: `Componente Digital n. ${cc++}`,
                                    style: {
                                        fontWeight: 'bold',
                                        borderBottom: '1ps dotted #333'
                                    }
                                }, d2);
                            }
                            this.exibirCampo('ID', cd.id.toString(), newdiv(divComponentes));
                            this.exibirCampo('Assinado', cd?.assinado ? 'SIM' : 'NÃO', newdiv(divComponentes));
                            if (this.valida_data_hora(cd?.atualizadoEm || '') instanceof Date) this.exibirCampo('Finalizado em', this.date2normal(this.valida_data_hora(cd.atualizadoEm), true), newdiv(divComponentes));
                            if (this.valida_data_hora(cd?.dataHoraLockEdicao || '') instanceof Date) this.exibirCampo('Bloqueado em', this.date2normal(this.valida_data_hora(cd.dataHoraLockEdicao), true), newdiv(divComponentes));
                            this.exibirCampo('Tipo', cd?.mimetype, newdiv(divComponentes));
                            if (cd?.fileName) this.exibirCampo('Nome do Arquivo', cd.fileName, newdiv(divComponentes));
                            // Falha do Super porque exibe o CPF do criador do Componente digital na chave usernameLockEdicao. Essa falha esta desde o Sapiens 1
                            this.exibirCampo('Autor', `${cd?.criadoPor?.nome} (${cd?.criadoPor?.id})`, newdiv(divComponentes));
                        }
                    }
                }
                // Now we search the compDigitalID in juntada.documento.vinculacoesDocumentos[XX].documentoVinculado.componentesDigitais[XX] -----------------
                else if (Array.isArray(juntada?.documento?.vinculacoesDocumentos) && juntada.documento.vinculacoesDocumentos.length) {
                    for(let vd of juntada.documento.vinculacoesDocumentos) {
                        let cc = 0;
                        for(let cd of vd.documentoVinculado.componentesDigitais) {
                            cc++;
                            if (cd.id === compDigitalID) {
                                if (cc === 1) secao('Componente Digital Juntado', divComponentes);
                                this.exibirCampo('ID', cd.id.toString(), newdiv(divComponentes));
                                this.exibirCampo('Assinado', cd?.assinado ? 'SIM' : 'NÃO', newdiv(divComponentes));
                                if (this.valida_data_hora(cd?.atualizadoEm || '') instanceof Date) this.exibirCampo('Finalizado em', this.date2normal(this.valida_data_hora(cd.atualizadoEm), true), newdiv(divComponentes));
                                if (this.valida_data_hora(cd?.dataHoraLockEdicao || '') instanceof Date) this.exibirCampo('Bloqueado em', this.date2normal(this.valida_data_hora(cd.dataHoraLockEdicao), true), newdiv(divComponentes));
                                this.exibirCampo('Tipo', cd?.mimetype, newdiv(divComponentes));
                                if (cd?.fileName) this.exibirCampo('Nome do Arquivo', cd.fileName, newdiv(divComponentes));
                                // Falha do Super porque exibe o CPF do criador do Componente digital na chave usernameLockEdicao. Essa falha esta desde o Sapiens 1
                                if (cd?.criadoPor?.nome) this.exibirCampo('Autor', `${cd?.criadoPor?.nome} (${cd?.criadoPor?.id})`, newdiv(divComponentes));
                            }
                        }
                    }
                }
                const bt = new MFt.bt({
                    value: 'Examinar outros componentes juntados no mesmo ato',
                    width: 500,
                    height: 30,
                    wrapper: d2,
                    callback: async ()=>{
                        await this.exibir_componentes_juntados(juntada, d2);
                    }
                });
            }
            else {
                form.div.innerText = 'Erro!';
            }
            console.groupEnd();
        });
        pop.clicafora_sair = pop.aceitaEsc = true;
        pop.iniciar(pop);
    }

    /**
     * Apresenta todos os componentes digitais juntados pelo usuario na juntada indicada
     * @param juntada
     * @param elem
     * @returns {Promise<void>}
     */
    async exibir_componentes_juntados(juntada, elem) {
        const secao = (titulo, elem)=>{
            if (!(elem instanceof HTMLElement)) throw new Error("elem deveria ser HTMLElement");
            MFt.criaElem('div', {
                innerText: titulo,
                style: {
                    fontWeight: 'bold',
                    padding: '5px',
                    backgroundColor: 'rgb(236,236,236)',
                }
            }, elem);
        }
        elem.innerText = 'Aguarde...';
        elem.appendChild(this.icon_ampulheta.cloneNode());
        if (!(elem instanceof HTMLElement)) throw new Error('Elem deveria ser HTMLElement');
        const juntadas = await this.obter_juntadas(juntada.volume.processo.id, elem, true);
        if (!(elem instanceof HTMLElement)) return; // O usuario pode cancelar a operacao
        MFt.clear(elem);
        console.log(juntadas);
        const momentoJuntada = this.valida_data_hora(juntada?.atualizadoEm);
        if (!momentoJuntada) {
            elem.innerText = `Nada encontrado`;
            return;
        }
        const juntFiltradas = juntadas.filter(d=>{
            const momentoD = this.valida_data_hora(d?.atualizadoEm);
            const dif = Math.abs(momentoJuntada.valueOf() - momentoD.valueOf());
            const tempoMaximoEntreJuntadas = 3000; // em ms
            //console.log(dif);
            return dif < tempoMaximoEntreJuntadas && d?.criadoPor.id === juntada?.criadoPor.id && juntada.id > d.id;
        });
        console.group('Juntadas realizadas no mesmo momento pelo mesmo usuario');
        console.log(juntFiltradas);
        console.groupEnd();
        MFt.clear(elem);
        secao(juntFiltradas.length ? 'Outras juntadas decorrentes da juntada' : 'Não existem outros documentos decorrentes e anteriores a esta juntada', elem);
        MFt.atribs(elem, {
            style: {
                marginLeft: '50px'
            }
        });
        let ii = 1;
        const nn = elem=>{
            return MFt.criaElem('div', {

            }, elem);
        }
        for(let jj of juntFiltradas) {
            const h1 = MFt.criaElem('div', {

            }, nn(elem));
            this.exibirCampo('Sequencial', jj?.numeracaoSequencial.toString(), h1);
            MFt.criaElem('span', {
                innerText: ', ',
                style: {

                }
            }, h1);
            this.exibirCampo('Juntada ID', jj?.id.toString(), h1);
            let kk = 1;
            for(let cd of jj?.documento?.componentesDigitais) {
                const d1 = MFt.criaElem('div', {

                }, elem);
                const tit = MFt.criaElem('div', {
                    innerText: `Componente Digital ${kk++}`,
                    style: {
                        fontWeight: 'bold',
                    }
                }, d1);
                const desc = MFt.criaElem('div', {
                    style: {
                        borderLeft: '1px dotted #333',
                        borderBottom: '1px dashed #333',
                        marginLeft: '20px',
                        marginBottom: '10px',
                        paddingBottom: '10px',
                        paddingLeft: '15px',
                    }
                }, d1);
                this.exibirCampo('ID', `${cd?.id}`, nn(desc));
                this.exibirCampo('Autor', `${cd?.criadoPor?.nome} (${cd?.criadoPor.id})`, nn(desc));
                this.exibirCampo('Doc. finalizado em', this.date2normal(this.valida_data_hora(cd?.dataHoraLockEdicao), true), nn(desc));
            }
        }
    }

    /**
     *
     * @param lista {Array} objeto com dois elementos que vao representar o label e o value
     * @param elemento {HTMLElement} local do DOM onde vai ser criado o campo
     */
    exibirCampos(lista, elemento) {
        for(let l of lista) {
            if (!Array.isArray(l)) continue; // Evita o que nao for Array
            if (!l.length) continue; // Evita arrays vazias
            const d1 = MFt.criaElem('div', {}, elemento);
            const s1 = MFt.criaElem('span', {
                innerText: l[0],
                style: {
                    fontWeight: 'bold'
                }
            }, d1);
            const s2 = MFt.criaElem('span', {innerText: ': '}, d1);
            const s3 = MFt.criaElem('span', {innerText: l[1]}, d1);
        }
    }

    async inserir_db() {
        const html = this.html_from_conteudo(this.pai_seqs.componentes[this.comp.id]);
        const id_comp = this.comp.id;
        const pop = new PopUp(300, 100, null, null, async form=>{
            const msg = MFt.criaElem('div', {
                innerText: 'Analisando...',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px',
                }
            }, form.div);
            const res = await Tudo2.request_mf_static('https://acervopessoal.org/cgi-bin/feed_pesquisa_agu/router.py', {
                task: 'feed_html',
                html,
                id_comp,
            }, 'post');
            console.group('ANÁLISE DE PEÇA');
            console.log(res);
            console.groupEnd();
            MFt.clear(msg);
            if (res?.conjur) {
                MFt.atribs(form.div, {
                    style: {
                        width: '500px',
                        height: '300px'
                    }
                });
                let campos = [
                    ['TIPO PEÇA', res?.tipo.toUpperCase()],
                    ['NÚMERO', res?.num.toString()],
                    ['ANO', res?.ano.toString()],
                    ['CONJUR', res?.conjur],
                    ['ASSUNTO', res?.assunto],
                ];
                this.exibirCampos(campos, msg);
                const dBts = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                    }
                }, msg);
                const bt = new MFt.bt({
                    value: 'Enviar ao DB',
                    width: '120px',
                    height: '30px',
                    wrapper: MFt.criaElem('div', {}, dBts),
                    callback: async ()=>{
                        MFt.clear(msg);
                        msg.innerText = 'Enviando dados...';
                        const jwt = await Tudo2.request_mf_static('https://manoelpaz.com/cgi-bin/agu/super/super', {
                            task: 'obterJWT'
                        });
                        const resSend = await Tudo2.request_mf_static('https://acervopessoal.org/cgi-bin/feed_pesquisa_agu/router.py', {
                            task: 'retrieve_and_save_data',
                            html,
                            id_comp,
                            jwt
                        }, 'post');
                        console.group('RESPONSE FROM SAVE FILE');
                        console.log(resSend);
                        console.groupEnd();
                        if (resSend?.id_sql) {
                            msg.innerText = 'Dados salvos';
                            await this.esperar(2000);
                            pop.closeWindow(pop);
                        }
                        else {
                            msg.innerText = `Erro ao salvar${resSend?.msg ? ': ' + resSend.msg : ''}`;
                            await this.esperar(2000);
                            pop.closeWindow(pop);
                        }
                    }
                });
                const btFechar = new MFt.bt({
                    value: 'Fechar',
                    width: '120px',
                    height: '30px',
                    wrapper: MFt.criaElem('div', {}, dBts),
                    callback: ()=>{
                        pop.closeWindow(pop);
                    }
                });
            }
            else {
                msg.innerText = 'Dados não identificados';
                await this.esperar(2000);
                pop.closeWindow(pop);
            }
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = false;
    }
}