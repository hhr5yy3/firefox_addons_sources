window.onload = ()=>{
    new VisualizarNUP();
};

class VisualizarNUP extends Payloads {
    constructor() {
        super();
        this.id_nup = parseInt(MFt.urlArgs().id_nup);
        this.nup = MFt.urlArgs().nup;
        this.cache = MFt.urlArgs().cache;
        this.tarefa_id = parseInt(MFt.urlArgs()?.tarefa_id);
        this.especie_tarefa_id = parseInt(MFt.urlArgs().especie_tarefa_id);
        this.tarefa = undefined;
        this.processo = undefined;
        this.telas = undefined;
        this.anotacoes = [];
        this.historico_itens_visualizados = [];
        this.historico_itens_visualizados_ocultar = false;
        this.div_lista_historico = undefined; // show itens of this.historico_itens_visualizados
        this.seqs = []; // Instancias de Seqs
        this._tipos_docs = [];
        this.juntadas_a_partir_do_cache = false; // Flag para dizer de onde vieram as informacoes das juntadas
        this.mp = 'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/super.py';
        this.mp_fast = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.div_tela_esq = undefined;
        this.esmaecer_itens_sem_titulo = false;
        this.clipboardTexts = []; // All OCR's contents will be here
        this.tela_topo = MFt.criaElem('div', {
            style: {
                padding: '0 5px',
                display: 'flex',
                alignItems: 'center'
            }
        });
        this.div_arvore = MFt.criaElem('div', {
            id: 'div_arvore',
            style: {
                height: 'calc(100% - 90px)',
                overflowX: 'hidden',
                overflowY: 'auto'
            }
        });

        this.marcadores_para_atualizar = new MarcadoresAtualizar();
        this.casos_arquivos_excluidos_relatorio = [];
        this.atalho_anotacao();

        this.init();
    }

    get num_bloco_juntadas() {return 100;}

    get tipos_docs() {return Array.isArray(this._tipos_docs) ? this._tipos_docs : []}

    async init() {
        window.addEventListener('mousedown', VisualizarNUP.mousedown_historico); // it needs to be in this.telas.onAfterResize() also
        let xml = new RequestMF();
        this.request_mf(this.mp_fast, {task:'arquivo', arquivo:'regex_docs_excluidos.json'}).then(dd=>{this.casos_arquivos_excluidos_relatorio = dd;});
        console.log(this.casos_arquivos_excluidos_relatorio);
        const cache_proc = await (async ()=>{
            if (this.cache !== "on") return undefined;
            const inicio = new Date();
            let proc_info;
            // console.log('THIS.ID_NUP', this.id_nup);
            if (this.id_nup) {
                console.log('Obtendo Proc Info a partir do cache e do ID NUP');
                proc_info = await this.obter_cache_proc_info(this.id_nup);
            }
            else if (this.nup && this.validaNUP(this.nup)) {
                console.log('Obtendo Proc Info a partir do cache e do NUP');
                proc_info = await this.obter_cache_proc_info(null, this.nup);
            }
            const fim = new Date();
            console.log(`TEMPO PARA OBTER PROC INFO: ${fim.valueOf() - inicio.valueOf()}ms`);
            return proc_info;
        })();
        const cache_tarefa = await (async ()=>{
            if (this.cache !== "on") return undefined;
            const inicio = new Date();
            let tarefa_info;
            if (!isNaN(this.tarefa_id)) tarefa_info = await this.obter_cache_tarefa(parseInt(this.tarefa_id));
            else return undefined;
            const fim = new Date();
            if (tarefa_info) console.log(`TEMPO PARA OBTER TAREFA DO CACHE: ${fim.valueOf() - inicio.valueOf()}ms`);
            return tarefa_info;
        })();
        console.log(cache_proc);
        if (cache_proc) {
            this.id_nup = cache_proc.id;
            this.processo = cache_proc;
        }
        if (cache_tarefa) this.tarefa = cache_tarefa;
        if (!this.processo && !this.id_nup && this.nup && this.validaNUP(this.nup)) {
            const res = await this.super_get(xml, this.get_id_processo(this.validaNUP(this.nup)), true, true);
            if (typeof res === 'string' && res.indexOf('504 Gateway') > 0) {
                alert('SuperSapiens parece estar indisponível');
                location.reload();
                return;
            }
            console.log(res);
            if (res) this.id_nup = res.id;
        }
        if (!this.id_nup) { this.processo_nao_existe(); return; }
        if (!this.processo) {
            this.processo = await this.super_get(xml, this.get_processo_info(this.id_nup));
            if (this?.processo?.acessoRestrito || this?.processo?.acessoNegado) { // sigilo, restrito, reservado
                alert('Processo com acesso restrito deve ser aberto exclusivamente no Super');
                window.close();
            }
            this.gravar_cache_proc_info(this.processo);
        }
        if (!isNaN(this.tarefa_id) && !this.tarefa) {
            this.tarefa = await this.super_get(xml, this.get_tarefa(this.tarefa_id), true, true);
            if (this.tarefa && !this?.tarefa?.dataHoraLeitura && this.profile.id === this?.tarefa?.usuarioResponsavel?.id) {
                const leitura = await this.super_get(xml, this.patch_tarefa_lida(this.tarefa_id));
                if (leitura?.dataHoraLeitura) this.tarefa.dataHoraLeitura = leitura.dataHoraLeitura;
            }
            // dataHoraLeitura precisa estar no cache para evitar futuros requests de patch_tarefa_lida()
            this.gravar_cache_tarefa(this.tarefa);
        }
        if (this.tarefa) {
            if (this.tarefa && !this?.tarefa.dataHoraLeitura && this.profile.id === this.tarefa.usuarioResponsavel.id) {
                // só lança a tag de tarefa lida se o usuário for o mesmo responsável pela tarefa
                this.super_get(xml, this.patch_tarefa_lida(this.tarefa_id)).then(dd=>{
                    console.group('TAREFA LIDA');
                    console.log(dd);
                    console.groupEnd();
                });
            }
            console.group('TAREFA -----------------------');
            console.log(this.tarefa);
            console.groupEnd();
        }
        if (!this.processo) {
            alert('Erro de comunicacao!');
            location.reload();
            return;
        }
        document.title = this.formatanup(this.processo.NUP);
        console.group("PROCESSO ----------------");
        console.log(this.processo);
        console.groupEnd();
        // OPCAO DE NAO REGISTRAR O EVENTO ------------------------------------------------------------------
        // Se a chave "registrar" estiver na URL nao registra o evento, ou seja, não faz o log do evento
        if (!MFt.urlArgs()?.registrar) this.registrar_evento(`Visualizacao NUP ${this.processo.NUP}${this?.processo?.titulo ? ` (${this.processo.titulo})` : ''}`);
        this.nup = this.processo.NUP; // Usado no gerar_relatorio()
        document.body.innerText = 'Esperando o "Super" fornecer as juntadas...';
        let juntadas;
        let datahora_cache_juntadas;
        if (this.cache === 'on') {
            const agora = new Date();
            const dados = await this.obter_cache_arvore_juntadas(this.processo.id);
            console.log(dados);
            console.log(`TEMPO PARA OBTER JUNTADAS DO CACHE: ${new Date().valueOf() - agora.valueOf()}ms`);
            if (typeof dados === 'object') {
                datahora_cache_juntadas = new Date(dados.datahora * 1000);
                juntadas = Array.isArray(dados.juntadas) && dados.juntadas.length ? dados.juntadas : undefined;
                console.log(`DATAHORA DO CACHE: ${datahora_cache_juntadas} -------------------------`);
                this.juntadas_a_partir_do_cache = !(!juntadas);
            }
        }
        if (!juntadas) {
            juntadas = await this.obter_juntadas(this.processo.id, document.body);
            this.gravar_cache_arvore_juntadas(juntadas);
        }
        // console.group('JUNTADAS -------------------------');
        // for(let j of juntadas) console.log(j);
        // console.groupEnd();
        console.log(juntadas);
        if (!juntadas) this.erro_fatal('Impossível obter juntadas');
        this.processo.juntadas = juntadas;
        console.group('PROCESSO');
        console.log(this.processo);
        console.groupEnd();
        document.body.innerText = 'Esperando as anotações do processo...';
        this.anotacoes = await this.carregar_anotacoes();
        this.reparar_erro_string_pagina();
        console.log(this.anotacoes);
        let div_arvore_scroll = 0;
        this.telas = new Telas(document.body, 3);
        this.telas.init(this.telas);
        this.telas.telaTopo.appendChild(this.tela_topo);
        this.telas.telaTopo.style.display = 'grid';
        this.telas.telaTopo.style.gridTemplateColumns = 'auto 320px'; // Botao historico vai aqui
        this.telas.telaTopo.style.alignItems = 'center';
        this.criar_bt_historico_itens_visualizados();
        this.telas.telaEsquerda.appendChild(this.div_arvore);
        this.telas.onBeforeResize = (width, height) =>{
            console.log('onBeforeResize');
            const d = MFt.$('div_arvore');
            div_arvore_scroll = d.scrollTop;
        }
        this.telas.onAfterResize = (width, height) => {
            console.log('onAfterResize');
            MFt.$('div_arvore').scroll(0, div_arvore_scroll);
            this.criar_bt_historico_itens_visualizados();
            this.show_historico_itens_visualizados(true);
            VisualizarNUP.mouse_leave_historico();
            window.addEventListener('mousedown', VisualizarNUP.mousedown_historico);
        }
        MFt.atribs(this.telas.telaTopo, {
            style: {
                background: 'url("/images/frogs_pattern.jpg")',
                backgroundAttachment: 'initial',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center top'
            }
        });
        const hs = new HeaderShow(`${this.formatanup(this.processo.NUP)}`, this.tela_topo, 'Titillium Web', 20, "#111", null, "0");
        this.preparar_copiar_nup(hs);
        const menu = new Menu(this, MFt.criaElem('div', {
            style: {
                margin: '0 0 0 20px',
            }
        }, this.tela_topo), 32, null, null, 'MENU DO PROCESSO');
        menu.add_opcao('Copiar NUP', ()=>this.copiar_nup(), 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMzYwLTI0MHEtMzMgMC01Ni41LTIzLjVUMjgwLTMyMHYtNDgwcTAtMzMgMjMuNS01Ni41VDM2MC04ODBoMzYwcTMzIDAgNTYuNSAyMy41VDgwMC04MDB2NDgwcTAgMzMtMjMuNSA1Ni41VDcyMC0yNDBIMzYwWm0wLTgwaDM2MHYtNDgwSDM2MHY0ODBaTTIwMC04MHEtMzMgMC01Ni41LTIzLjVUMTIwLTE2MHYtNTYwaDgwdjU2MGg0NDB2ODBIMjAwWm0xNjAtMjQwdi00ODAgNDgwWiIvPjwvc3ZnPg==');
        if (this.nup || this.id_nup) {
            menu.add_opcao('Histórico de Tarefas', ()=>this.historico_tarefas(), 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDgwLTEyMHEtMTM4IDAtMjQwLjUtOTEuNVQxMjItNDQwaDgycTE0IDEwNCA5Mi41IDE3MlQ0ODAtMjAwcTExNyAwIDE5OC41LTgxLjVUNzYwLTQ4MHEwLTExNy04MS41LTE5OC41VDQ4MC03NjBxLTY5IDAtMTI5IDMydC0xMDEgODhoMTEwdjgwSDEyMHYtMjQwaDgwdjk0cTUxLTY0IDEyNC41LTk5VDQ4MC04NDBxNzUgMCAxNDAuNSAyOC41dDExNCA3N3E0OC41IDQ4LjUgNzcgMTE0VDg0MC00ODBxMCA3NS0yOC41IDE0MC41dC03NyAxMTRxLTQ4LjUgNDguNS0xMTQgNzdUNDgwLTEyMFptMTEyLTE5Mkw0NDAtNDY0di0yMTZoODB2MTg0bDEyOCAxMjgtNTYgNTZaIi8+PC9zdmc+');
        }
        if (this.tarefa_id) {
            menu.add_opcao('Detalhes da tarefa', ()=>this.detalhes_tarefa(), 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDQwLTI4MGg4MHYtMjQwaC04MHYyNDBabTQwLTMyMHExNyAwIDI4LjUtMTEuNVQ1MjAtNjQwcTAtMTctMTEuNS0yOC41VDQ4MC02ODBxLTE3IDAtMjguNSAxMS41VDQ0MC02NDBxMCAxNyAxMS41IDI4LjVUNDgwLTYwMFptMCA1MjBxLTgzIDAtMTU2LTMxLjVUMTk3LTE5N3EtNTQtNTQtODUuNS0xMjdUODAtNDgwcTAtODMgMzEuNS0xNTZUMTk3LTc2M3E1NC01NCAxMjctODUuNVQ0ODAtODgwcTgzIDAgMTU2IDMxLjVUNzYzLTc2M3E1NCA1NCA4NS41IDEyN1Q4ODAtNDgwcTAgODMtMzEuNSAxNTZUNzYzLTE5N3EtNTQgNTQtMTI3IDg1LjVUNDgwLTgwWm0wLTgwcTEzNCAwIDIyNy05M3Q5My0yMjdxMC0xMzQtOTMtMjI3dC0yMjctOTNxLTEzNCAwLTIyNyA5M3QtOTMgMjI3cTAgMTM0IDkzIDIyN3QyMjcgOTNabTAtMzIwWiIvPjwvc3ZnPg==');
        }
        if (this.tarefa_id && this?.id_nup) {
            menu.add_opcao('Detalhes do Processo', ()=>this.detalhes_processo(), 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMTYwLTEyMHEtMzMgMC01Ni41LTIzLjVUODAtMjAwdi02NDBsNjcgNjcgNjYtNjcgNjcgNjcgNjctNjcgNjYgNjcgNjctNjcgNjcgNjcgNjYtNjcgNjcgNjcgNjctNjcgNjYgNjcgNjctNjd2NjQwcTAgMzMtMjMuNSA1Ni41VDgwMC0xMjBIMTYwWm0wLTgwaDI4MHYtMjQwSDE2MHYyNDBabTM2MCAwaDI4MHYtODBINTIwdjgwWm0wLTE2MGgyODB2LTgwSDUyMHY4MFpNMTYwLTUyMGg2NDB2LTEyMEgxNjB2MTIwWiIvPjwvc3ZnPg==');
        }
        if (this.processo?.NUP) {
            menu.add_opcao('Partes do Processo', ()=>this.partes_processo(), 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMC0yNDB2LTYzcTAtNDMgNDQtNzB0MTE2LTI3cTEzIDAgMjUgLjV0MjMgMi41cS0xNCAyMS0yMSA0NHQtNyA0OHY2NUgwWm0yNDAgMHYtNjVxMC0zMiAxNy41LTU4LjVUMzA3LTQxMHEzMi0yMCA3Ni41LTMwdDk2LjUtMTBxNTMgMCA5Ny41IDEwdDc2LjUgMzBxMzIgMjAgNDkgNDYuNXQxNyA1OC41djY1SDI0MFptNTQwIDB2LTY1cTAtMjYtNi41LTQ5VDc1NC0zOTdxMTEtMiAyMi41LTIuNXQyMy41LS41cTcyIDAgMTE2IDI2LjV0NDQgNzAuNXY2M0g3ODBabS00NTUtODBoMzExcS0xMC0yMC01NS41LTM1VDQ4MC0zNzBxLTU1IDAtMTAwLjUgMTVUMzI1LTMyMFpNMTYwLTQ0MHEtMzMgMC01Ni41LTIzLjVUODAtNTIwcTAtMzQgMjMuNS01N3Q1Ni41LTIzcTM0IDAgNTcgMjN0MjMgNTdxMCAzMy0yMyA1Ni41VDE2MC00NDBabTY0MCAwcS0zMyAwLTU2LjUtMjMuNVQ3MjAtNTIwcTAtMzQgMjMuNS01N3Q1Ni41LTIzcTM0IDAgNTcgMjN0MjMgNTdxMCAzMy0yMyA1Ni41VDgwMC00NDBabS0zMjAtNDBxLTUwIDAtODUtMzV0LTM1LTg1cTAtNTEgMzUtODUuNXQ4NS0zNC41cTUxIDAgODUuNSAzNC41VDYwMC02MDBxMCA1MC0zNC41IDg1VDQ4MC00ODBabTAtODBxMTcgMCAyOC41LTExLjVUNTIwLTYwMHEwLTE3LTExLjUtMjguNVQ0ODAtNjQwcS0xNyAwLTI4LjUgMTEuNVQ0NDAtNjAwcTAgMTcgMTEuNSAyOC41VDQ4MC01NjBabTEgMjQwWm0tMS0yODBaIi8+PC9zdmc+');
        }
        menu.add_opcao('OCR da Tela', e=>this.ocr_clipboard(e), 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMzIwLTEyMHYtODBoODB2LTgwSDE2MHEtMzMgMC01Ni41LTIzLjVUODAtMzYwdi00MDBxMC0zMyAyMy41LTU2LjVUMTYwLTg0MGg2NDBxMzMgMCA1Ni41IDIzLjVUODgwLTc2MHY0MDBxMCAzMy0yMy41IDU2LjVUODAwLTI4MEg1NjB2ODBoODB2ODBIMzIwWk0xNjAtMzYwaDY0MHYtNDAwSDE2MHY0MDBabTAgMHYtNDAwIDQwMFoiLz48L3N2Zz4=');
        this.habililtar_ocr();
        if (this.profile.id === 8499) {
            menu.add_opcao('Refresh Doc Tree', ()=>{
                menu.clear();
                this.refrescar_arvore()
            }, 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNjAwLTEyMHYtMTIwSDQ0MHYtNDAwaC04MHYxMjBIODB2LTMyMGgyODB2MTIwaDI0MHYtMTIwaDI4MHYzMjBINjAwdi0xMjBoLTgwdjMyMGg4MHYtMTIwaDI4MHYzMjBINjAwWk0xNjAtNzYwdjE2MC0xNjBabTUyMCA0MDB2MTYwLTE2MFptMC00MDB2MTYwLTE2MFptMCAxNjBoMTIwdi0xNjBINjgwdjE2MFptMCA0MDBoMTIwdi0xNjBINjgwdjE2MFpNMTYwLTYwMGgxMjB2LTE2MEgxNjB2MTYwWiIvPjwvc3ZnPg==');
        }
        // AS DEMAIS OPÇÕES DO MENU ESTÃO DENTRO DA PRÓPRIA CLASSE MENU --------------------------------
        this._tipos_docs = await this.request_mf(this.mp_fast, {task:'get_exemplos_titulos'});
        // this._tipos_docs = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/router.py", {task:'tipos_docs'});
        this.criar_elem_tipos_docs();
        MFt.atribs(this.telas.telaEsquerda, {
            style: {
                // background: '#FFFCE0',
                background: 'url("/images/papel_parede_01.jpg")',
            }
        });
        this.div_tela_esq = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '40px 40px',
                gridTemplateColumns: '140px 140px',
                marginTop: '20px',
                height: '100%',
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'auto'
            }
        }, this.telas.telaEsquerda);
        this.refrescar_arvore();
        // for(let indice = 0; indice < this.processo.juntadas.length; indice++) {
        //     this.seqs.push(new Seqs(this, indice, this.div_tela_esq, this.telas.telaDireita));
        // }
        this.botao_baixar_tudo(); // baixar tudo
        this.botao_gerar_relatorio(); // gerar relatorio relatório
        this.botao_esmaecer();
        if (this.especie_tarefa_id === 84) this.botao_dar_ciencia(); // Tomar ciencia
        if (datahora_cache_juntadas) this.avisar_juntadas_cache(datahora_cache_juntadas);
        if (this.cache === 'on' && this.juntadas_a_partir_do_cache) new CompararProcesso(this);
    }

    preparar_copiar_nup(hs) {
        hs.item1.style.cursor = 'pointer';
        hs.item1.onclick = ()=>{
            this.copiar_clipboard(`${this.formatanup(this.processo.NUP)}`).then(()=>{
                console.log("NUP copiado");
            });
            const pop = new PopUp(100, 30, null, null, form=>{
                MFt.atribs(form.div, {
                    innerText: 'NUP copiado',
                    style: {
                        fontFamily: 'Titillium Web',
                        textAlign: 'center'
                    }
                });
                setTimeout(()=>{
                    pop.closeWindow(pop);
                }, 1000);
            });
            pop.iniciar(pop);
            pop.clicafora_sair = pop.aceitaEsc = true;
        };
    }

    obter_todos_ids_componentes() {
        let ids = [];
        if (!this?.processo?.juntadas || !Array.isArray(this?.processo?.juntadas)) return ids;
        for(let j of this.processo.juntadas) {
            if (Array.isArray(j?.documento?.componentesDigitais))
                for(let cd of j.documento.componentesDigitais) ids.push(cd.id);
            const vds = j?.documento?.vinculacoesDocumentos;
            if (vds) {
                for(let vd of vds) if (Array.isArray(vd.documentoVinculado.componentesDigitais)) for(let cd of vd.documentoVinculado.componentesDigitais) ids.push(cd.id);
            }
        }
        return ids;
    }

    async carregar_anotacoes() {
        return await this.request_mf(this.mp_fast, {
            task: 'get_titulos',
            ids: JSON.stringify(this.obter_todos_ids_componentes()),
            // token: this.token
        }, 'post');
    }

    incluir_nova_anotacao(dd) {
        const campos_obrigatorios = ['cor', 'id_comp', 'pagina', 'rowid', 'texto_txt', 'titulo'];
        const tem_todos = campos_obrigatorios.every(d=>Object.keys(dd).some(e=>d===e));
        if (!tem_todos) {
            alert('Dados informados não contêm todos os campos obrigatórios.');
            console.error(dd);
            console.log('Campos Obrigatorios', campos_obrigatorios);
            throw new Error('Dados informados não contêm todos os campos obrigatórios');
        }
        // this.anotacoes = this.anotacoes.filter(d=>!(d.id_comp === dd.id_comp && d.pagina === d.pagina));
        // const anotacao_existente = this.anotacoes.some(d=>d.id_comp === dd.id_comp && d.pagina === dd.pagina);
        // if (anotacao_existente) { // boolean
        //     console.log('ANOTACAO EXISTENTE - ATUALIZAR');
        let anotacao_existente = false;
        for(let i = 0; i < this.anotacoes.length; i++) {
            const d = this.anotacoes[i];
            if (d.id_comp === dd.id_comp && d.pagina === dd.pagina) {
                anotacao_existente = true;
                this.anotacoes[i] = dd;
                break;
            }
        }
        if (!anotacao_existente) this.anotacoes.push(dd);
    }

    botao_baixar_tudo() {
        const bt = new MFt.bt({
            value: 'Baixar Tudo',
            width: 130,
            height: 30,
            wrapper: MFt.criaElem('div', null, this.div_tela_esq),
            callback: ()=>{
                bt.disabled = true;
                this.baixar_tudo();
            }
        })
    }

    botao_esmaecer() {
        const esmaecer = ()=>{
            for(let s of this.seqs) {
                for(let i of s.itens) {
                    i.esmaecer();
                }
            }
        }
        const bt = new MFt.bt({
            value: "Esmaecer",
            width: 130,
            height: 30,
            wrapper: MFt.criaElem('div', null, this.div_tela_esq),
            callback: ()=>{
                this.esmaecer_itens_sem_titulo = true;
                esmaecer();
                bt.disabled = true;
            }
        });
    }

    botao_gerar_relatorio() {
        const bt = new MFt.bt({
            value: 'Gerar Relatório',
            width: 130,
            height: 30,
            wrapper: MFt.criaElem('div', null, this.div_tela_esq),
            callback: ()=>{
                //bt.disabled = true;
                this.gerar_relatorio()
            }
        })
    }

    baixar_tudo() {
        const max_num_downloads = 3;
        const width = MFt.navegador() === 'firefox' ? 425 : 320;
        const height = MFt.navegador() === 'firefox' ? 84 : 78;
        const p1 = new PopUp(width, height, null, null, async form => {
            let itens = [];
            for (let s of this.seqs)
                for (let i of s.itens)
                    itens.push(i);
            MFt.criaElem('div', {
                innerText: `Os arquivos serão armazenados temporariamente neste computador.`
            }, form.div);
            let contador = 1;
            const msg = MFt.criaElem('div', {innerText: '&ensp;', style:{minWidth: '21px'}}, form.div);
            new MFt.bt({
                value: 'Examinar processo enquanto baixa arquivos',
                width: 300,
                height: 30,
                wrapper: MFt.criaElem('div', {style:{textAlign: 'center'}}, form.div),
                callback: ()=>form.closeWindow(form)
            });
            const inter = setInterval(()=>{
                let itens = [];
                for(let s of this.seqs) itens = itens.concat(s.itens);
                const not_downloading = itens.filter(d=>!d.downloading && !d.pai_seqs.componentes[d.comp.id]);
                const downloading = itens.filter(d=>d.downloading);
                const downloaded = itens.filter(d=>d.pai_seqs.componentes[d.comp.id]);
                for(let i = downloading.length; i < max_num_downloads; i++) {
                    // Simula-se um clique nos itens até o máximo de downloads simultâneos
                    if (not_downloading[i - downloading.length]?.click) not_downloading[i - downloading.length].click(null, false);
                }
                msg.innerText = `${downloaded.length} de ${itens.length} baixados`;
                // console.log(`${downloaded.length} de ${itens.length} baixados. Baixando ${downloading.length}`);
                if (downloaded.length === itens.length) {
                    console.log('Todos os componentes baixados');
                    clearInterval(inter);
                    if (form) try{form.closeWindow(form);} catch{}
                }
            }, 500);
        });
        p1.clicafora_sair = false;
        p1.aceitaEsc = false;
        p1.iniciar(p1);
    }

    async gerar_relatorio() {
        const situacoesExclusao = t=>{ // Itens que não devem entrar no relatório
            for(let c of this.casos_arquivos_excluidos_relatorio) {
                const r = new RegExp(c, 'gi');
                if (r.exec(t)) return true;
            }
            return false;
        }
        const haOutroItemNaMesmaNumeracaoSequencial = item=>{
            console.group('ITEM PAI_SEQS');
            console.log(item);
            console.log('Comps digitais:', item.pai_seqs?.juntada?.documento?.componentesDigitais?.length);
            console.groupEnd();
            if (Array.isArray(item.pai_seqs?.juntada?.documento?.componentesDigitais)) return item.pai_seqs?.juntada?.documento?.componentesDigitais.length > 1;
            return itens.filter(d=>d.pai_seqs.juntada.numeracaoSequencial === item.pai_seqs.juntada.numeracaoSequencial).length > 1;
        }
        const complemento = item=>{
            const part1 = haOutroItemNaMesmaNumeracaoSequencial(item) ? `, ${item.comp.tipoDocumento.nome} ${item.comp.numeracao_sequencial_calculada}` : '';
            const part2 = `${item?.anot?.pagina && item?.comp?.mimetype === 'application/pdf' && item?.anot?.pagina > 1 ? ', pág.' + item.anot.pagina.toString() : ''}`;
            return part1 + part2;
        }
        let html = '<div id="tudo" style="margin:auto; width: 800px;">';
        let itens = [];
        for (let s of this.seqs)
            itens = itens.concat(s.itens.filter(d=>{
                return !situacoesExclusao(d?.anot?.titulo);
            }));
        if (itens.length === 0) {
            html += '<p>Não existe relatório para ser exibido.</p>'
        }
        else {
            html += '<p style="font-size: 16px;font-weight: bold;">RELATÓRIO RESUMIDO (para ser incluído na peça jurídica)</p>';
            for(let item of itens) {
                //console.log(item);
                //if (item?.anot?.titulo) html += `<p>${item.anot.titulo} <a href="https://sapiens.agu.gov.br/documento/${item.anot.id_comp}${item?.anot?.pagina ? '#page=' + item.anot.pagina.toString() : ''}" target="_blank">(Seq. ${item.pai_seqs.juntada.numeracaoSequencial}, ${item.comp.tipoDocumento.nome} ${item.comp.numeracao_sequencial_calculada}${item?.anot?.pagina ? ', pag.' + item.anot.pagina.toString() : ''})</a></p>`;
                // O Super ganhou a funcionalidade de exibir componentes digitais específicos, mas não tem como exibir uma página específica do componente. Mesmo assim, eu deixo o #page= para uso futuro.
                if (item?.anot?.titulo) html += `<p>${item.anot.titulo} <a href="https://supersapiens.agu.gov.br/apps/processo/${this.processo.id}/visualizar/${item?.pai_seqs?.juntada?.id}-${item.anot.id_comp}${item?.anot?.pagina ? '#page=' + item.anot.pagina.toString() : ''}" target="_blank">(Seq. ${item.pai_seqs.juntada.numeracaoSequencial}${complemento(item)})</a></p>`;
            }
            html += '<p><br/></p>\n  <p><br/></p>\n  <p><br/></p>\n';
            html += '<p><b>ANOTAÇÕES COMPLETAS</b></p>';
            html += '<div id="anotacoes_completas"></div>';
        }
        const url = "../branco.html";
        const myReport = window.open(url);
        myReport.onload = async page => {
            MFt.atribs(myReport.document.body, {
                style: {
                    fontFamily: 'Titillium Web'
                }
            });
            myReport.document.title = `Relatório ${this.formatanup(this.nup)}`;
            let divs = myReport.document.body.getElementsByTagName('div');
            console.log(divs);
            Array.from(divs).filter(d=>d.id === 'conteudo')[0].innerHTML = html;
            divs = myReport.document.body.getElementsByTagName('div');
            const div_anotacoes_completas = Array.from(divs).filter(d=>d.id === 'anotacoes_completas')[0];
            console.log(div_anotacoes_completas);
            for(let item of itens) {
                if (item?.anot?.titulo) {
                    const wrapper = MFt.criaElem('div', {
                        style: {
                            margin: '0 0 20px 0'
                        }
                    }, div_anotacoes_completas);
                    MFt.criaElem('p', {
                        innerHTML: `${item.anot.titulo} <a href="https://sapiens.agu.gov.br/documento/${item.anot.id_comp}${item?.anot?.pagina ? '#page=' + item.anot.pagina.toString() : ''}" target="_blank">(Seq. ${item.pai_seqs.juntada.numeracaoSequencial}${complemento(item)})</a>`,
                        style: {
                            margin: '0',
                            padding: '0'
                        }
                    }, wrapper);
                    if (item?.anot?.texto_txt) {
                        for (let a of item.anot.texto_txt.split('\n')) {
                            MFt.criaElem('p', {
                                innerText: a.length ? a : '<br/>',
                                style: {
                                    margin: '0 0 0 50px',
                                    padding: '0'
                                }
                            }, wrapper);
                        }
                    }
                }
            }
        };

        // ----------------------------------------------------------------------------


    }

    criar_elem_tipos_docs() {
        let dl = MFt.criaElem('datalist', {id:'tipos_docs'}, document.body);
        for(let d of this.tipos_docs) MFt.criaElem('option', {value:d}, dl);
        console.log(dl);
        return dl;
    }

    botao_topo(text) {
        const mouse_fora = '2px 2px 5px #777';
        const mouse_dentro = '1px 1px 1px #DDD';
        MFt.criaElem('div', {
            style: {
                width: '1px',
                borderLeft: '1px solid #CCC',
                height: '25px',
                margin: '0 15px'
            }
        }, this.tela_topo);
        const bt = MFt.criaElem('div', {
            innerText: text,
            style: {
                textShadow: mouse_fora,
                fontSize: '16px',
                cursor: 'pointer',
                transitionDuration: '0.3s'
            }
        }, this.tela_topo);
        bt.onmouseenter = ()=>bt.style.textShadow = mouse_dentro;
        bt.onmouseleave = ()=>bt.style.textShadow = mouse_fora;
        return bt;
    }

    botao_dar_ciencia() {
        const bt = this.botao_topo('Dar Ciência');
        bt.onclick = ()=>{
            
        }
    }

    processo_nao_existe() {
        document.body.innerText = 'Processo não encontrado no Super';
        MFt.atribs(document.body, {
            style: {
                fontSize: '16px',
                fontWeight: 'bold'
            }
        });
    }

    tarefas_selecionadas() {
        return [this.tarefa] || [];
    }

    /**
     * O DB esta informando o numero da pagina como string e eu preciso corrigir isso
     */
    reparar_erro_string_pagina() {
        if (Array.isArray(this.anotacoes)) for(let t of this.anotacoes) {
            if (typeof t.pagina === 'string' && !isNaN(t.pagina)) t.pagina = parseInt(t.pagina);
        }
    }

    async copiar_nup() {
        this.copiar_clipboard(`${this.formatanup(this.processo.NUP)} `);
        //this.copiar_elemento(`${this.formatanup(this.processo.NUP)}`);
        const msg = new MsgGenerica("NUP na área de transferência", 300, 40);
        await this.esperar(1500);
        msg.closeWindow(msg)
    }

    async gravar_cache_arvore_juntadas(juntadas) {
        if (!Array.isArray(juntadas) || (Array.isArray(juntadas) && juntadas.length === 0)) {
            alert('Erro de comunicação com o Super.\nVerifique se seu login está ativo.');
            return;
        }
        if (this?.processo?.acessoRestrito || this?.processo?.acessoNegado) {
            console.log("%cProcesso de acesso restrito. Sem gravação de cache (juntadas).", "color:red;font-weight: bold;");
            return;
        }
        const filtro = dd=>{
            if (!dd?.documento?.tipoDocumento) {
                console.log(dd);
            }
            let ret = {
                id: dd.id,
                ativo: dd.ativo,
                numeracaoSequencial: dd.numeracaoSequencial,
                documento: {
                    id: dd.documento.id,
                    componentesDigitais: [],
                },
                volume: {
                    id: dd.volume.id,
                    numeracaoSequencial: dd.volume.numeracaoSequencial
                }
            }
            if (dd?.documento?.temAnexos) ret.documento.temAnexos = dd.documento.temAnexos; // Nem sempre presente nas juntadas (docs desentranhados), Ex.: 00688.000723/2019-45
            if (dd?.documento?.juntadaAtual?.descricao) {
                ret.documento.juntadaAtual = {
                    descricao: dd.documento.juntadaAtual.descricao
                };
            } // Para os processos judiciais, vai conter o evento
            if (dd?.documento?.tipoDocumento) { // Nem sempre presente nas juntadas (docs desentranhados), Ex.: 00688.000723/2019-45
                ret.documento.tipoDocumento = {};
                if (dd.documento.tipoDocumento?.id) ret.documento.tipoDocumento.id = dd.documento.tipoDocumento.id;
                if (dd.documento.tipoDocumento?.nome) ret.documento.tipoDocumento.nome = dd.documento.tipoDocumento.nome;
                if (dd.documento.tipoDocumento?.sigla) ret.documento.tipoDocumento.sigla = dd.documento.tipoDocumento.sigla;
                if (dd.documento.tipoDocumento?.descricao) ret.documento.tipoDocumento.descricao = dd.documento.tipoDocumento.descricao;
            }
            if (dd?.documento?.numeroUnicoDocumentoFormatado) {
                ret.documento.numeroUnicoDocumentoFormatado = dd.documento.numeroUnicoDocumentoFormatado;
            }
            if (dd?.documento?.vinculacoesDocumentos) {
                ret.documento.vinculacoesDocumentos = [];
                for(let dv of dd.documento.vinculacoesDocumentos) {
                    let r2 = {
                        id: dv.id,
                        documentoVinculado: {
                            id: dv.documentoVinculado.id,
                            componentesDigitais: [],
                            tipoDocumento: {
                                id: dv.documentoVinculado.tipoDocumento.id,
                                nome: dv.documentoVinculado.tipoDocumento.nome,
                                sigla: dv.documentoVinculado.tipoDocumento.sigla,
                                descricao: dv.documentoVinculado.tipoDocumento.descricao
                            }
                        }
                    }
                    for(let cd of dv.documentoVinculado.componentesDigitais) {
                        r2.documentoVinculado.componentesDigitais.push({
                            id: cd.id,
                            fileName: cd.fileName,
                            mimetype: cd.mimetype,
                            nivelComposicao: cd.nivelComposicao,
                            numeracaoSequencial: cd.numeracaoSequencial,
                            tamanho: cd.tamanho
                        });
                    }
                    if (dv?.documento?.numeroUnicoDocumentoFormatado) {
                        r2.documento.numeroUnicoDocumentoFormatado = dv.documento.numeroUnicoDocumentoFormatado;
                    }
                    ret.documento.vinculacoesDocumentos.push(r2);
                }
            }
            if (Array.isArray(dd.documento?.componentesDigitais)) {
                for(let k = 0; k < dd.documento.componentesDigitais.length; k++) {
                    const cd = dd.documento.componentesDigitais[k];
                    ret.documento.componentesDigitais.push({
                        id: cd.id,
                        fileName: cd.fileName,
                        mimetype: cd.mimetype,
                        nivelComposicao: cd.nivelComposicao,
                        numeracaoSequencial: cd.numeracaoSequencial,
                        tamanho: cd.tamanho,
                    });
                }
            }
            return ret;
        }
        let enviar = [];
        for(let j of juntadas) enviar.push(filtro(j));
        console.group('DADOS ENVIADOS PARA O CACHE ---------------------');
        console.log(enviar);
        console.groupEnd();
        const res = await this.request_mf(this.mp_fast, {
            task: 'gravar_cache_arvore_juntadas',
            id_proc: this.processo.id,
            nup: this.processo.NUP,
            dados: JSON.stringify(enviar)
        }, 'post');
        console.log(res);
        if (Array.isArray(res)) console.log(JSON.parse(res[0][0]));
    }

    async gravar_cache_proc_info(dados) {
        if (dados?.acessoRestrito) {
            console.log("%cProcesso de acesso restrito. Sem gravação de cache (info).", "color:red;font-weight: bold;");
            return;
        }
        let enviar = {
            id: dados.id,
            NUP: dados.NUP,
            chaveAcesso: dados.chaveAcesso,
            titulo: dados.titulo,
            especieProcesso: {
                id: dados?.especieProcesso?.id,
                nome: dados?.especieProcesso?.nome,
                generoProcesso: {
                    id: dados?.especieProcesso?.generoProcesso?.id,
                    nome: dados?.especieProcesso?.generoProcesso?.nome,
                }
            },
        }
        const res = await this.request_mf(this.mp_fast, {
            task: 'gravar_cache_proc_info',
            id: enviar.id,
            nup: enviar.NUP,
            dados: JSON.stringify(enviar)
        }, 'post');
        console.group("CACHE PROCESSO -----------------------");
        console.log(res);
        console.groupEnd();
    }

    async gravar_cache_tarefa(tarefa) {
        if (tarefa?.acessoRestrito) {
            console.log("%cProcesso de acesso restrito. Sem gravação de cache (tarefa).", "color:red;font-weight: bold;");
            return;
        }
        let enviar = {
            id: tarefa.id,
            atualizadoEm: tarefa?.atualizadoEm,
            criadoEm: tarefa?.criadoEm,
            dataHoraFinalPrazo: tarefa?.dataHoraFinalPrazo,
            dataHoraInicioPrazo: tarefa?.dataHoraInicioPrazo,
            dataHoraLeitura: tarefa?.dataHoraLeitura,
            especieTarefa: {
                id: tarefa.especieTarefa.id,
                nome: tarefa.especieTarefa.nome,
                generoTarefa: {
                    id: tarefa.especieTarefa.generoTarefa.id,
                    nome: tarefa.especieTarefa.generoTarefa.nome
                }
            },
            usuarioResponsavel: {
                id: tarefa.usuarioResponsavel.id,
                nome: tarefa.usuarioResponsavel.nome,
                assinaturaHTML: tarefa.usuarioResponsavel.assinaturaHTML
            },
            setorResponsavel: {
                id: tarefa.setorResponsavel.id,
                nome: tarefa.setorResponsavel.nome,
                sigla: tarefa.setorResponsavel.sigla,
                unidade: {
                    id: tarefa.setorResponsavel.unidade.id,
                    nome: tarefa.setorResponsavel.unidade.nome,
                    sigla: tarefa.setorResponsavel.unidade.sigla
                }
            },
            observacao: tarefa.observacao,
            processo: {
                id: tarefa?.processo?.id,
                NUP: tarefa?.processo?.NUP,
                chaveAcesso: tarefa?.processo?.chaveAcesso,
                titulo: tarefa?.processo?.titulo,
                especieProcesso: {
                    id: tarefa?.processo?.especieProcesso?.id,
                    nome: tarefa?.processo?.especieProcesso?.nome,
                    generoProcesso: {
                        id: tarefa?.processo?.especieProcesso?.generoProcesso?.id,
                        nome: tarefa?.processo?.especieProcesso?.generoProcesso?.nome
                    }
                }
            }
        }
        console.log(JSON.stringify(enviar));
        const res = await this.request_mf(this.mp_fast, {
            task: 'gravar_cache_tarefa',
            id: enviar.id,
            nup: enviar.processo.NUP,
            id_proc: this.processo.id,
            dados: JSON.stringify(enviar)
        }, 'post');
        console.group("GRAVAR CACHE TAREFA -------------------");
        console.log(res);
        console.groupEnd();
    }

    async obter_cache_proc_info(id, nup) {
        // Parei de usar o cache do processo para evitar abrir processos reservados
        return undefined;
        let res;
        if (id) res = await this.request_mf(this.mp_fast, {
            task: 'obter_cache_proc_info',
            id
        });
        else if (nup) res = await this.request_mf(this.mp_fast, {
            task: 'obter_cache_proc_info',
            nup: this.sonumeros(nup)
        });
        else {
            throw new Error("NEM ID NEM NUP INDICADOS")
        }
        console.group("CACHE PROC INFO RESPOSTA -------------------");
        console.log(res);
        console.groupEnd();
        if (Array.isArray(res) && res.length && res[0]?.json) {
            let ret;
            try {
                ret = JSON.parse(res[0].json);
            }
            catch {
                console.log("%cErro no JSON dos dados do processo em cache.", "color:red;font-weight:bold;");
            }
            return ret;
        }
    }

    async obter_cache_tarefa(id) {
        console.log(`ID Tarefa: ${id}`);
        const res = await this.request_mf(this.mp_fast, {
            task: 'obter_cache_tarefa',
            id
        });
        console.group("CACHE TAREFA RESPOSTA -------------------");
        console.log(res);
        console.groupEnd();
        if (Array.isArray(res) && res.length && res[0]?.json) {
            let ret;
            try {
                ret = JSON.parse(res[0].json);
            }
            catch {
                console.log("%cErro no JSON dos dados da tarefa em cache.", "color:red;font-weight:bold;");
            }
            return ret;
        }
    }

    async obter_cache_arvore_juntadas(id_proc) {
        console.log(`ID Processo: ${id_proc}`);
        const res = await this.request_mf(this.mp_fast, {
            task: 'obter_cache_arvore_juntadas',
            id_proc
        });
        console.group("CACHE ARVORE JUNTADAS RESPOSTA -------------------");
        console.log(res);
        console.groupEnd();
        if (Array.isArray(res) && res.length && res[0]?.json) {
            let ret;
            try {
                ret = JSON.parse(res[0].json);
            }
            catch {
                console.log("%cErro no JSON dos dados das juntadas em cache.", "color:red;font-weight:bold;");
            }
            return {juntadas: ret, datahora: res[0].datahora};
        }
    }

    avisar_juntadas_cache(datahora) {
        const pop = new PopUp(400, 120, null, null, form=>{
            form.div.style.fontFamily = 'Titillium Web';
            const aviso = `AVISO: A árvore de documentos é um retrato do proceso em ${this.date2normal(datahora, true)}. Saiba mais no quadro no canto superior direito da tela.`;
            MFt.criaElem('div', {
                innerText: aviso,
                style: {
                    margin: '0 0 15px 0'
                }
            }, form.div);
            const d1 = MFt.criaElem('div', {
                style: {textAlign: 'center'}
            }, form.div);
            const btContinuar = new MFt.bt({
                value: 'Continuar',
                width: 120,
                height: 30,
                wrapper: d1,
                marginRight: '20px',
                callback: ()=>{
                    pop.closeWindow(pop);
                }
            });
        });
        pop.aceitaEsc = pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    async juntar_documento() {
        // let xml = new RequestMF();
        // let tipos = [];
        // let max = 1_000_000;
        // const crono = new Crono();
        // while(tipos.length < max) {
        //     const res = await this.super_get(xml, this.get_tipo_documento('', tipos.length));
        //     tipos = tipos.concat(res.entities);
        //     max = res.total;
        // }
        // console.log(`TEMPO PARA OBTER OS TIPOS DE DOCUMENTOS NO SUPER: ${crono.tempo}s`)
        // const tt = tipos.map(d=>{
        //     return [d.id, d.nome, d.sigla];
        // });
        // const ret = {
        //     dados: tt,
        //     campos: ["id", "nome", "sigla"]
        // };
        // console.log(ret);
        // console.log(JSON.stringify(ret));
        new JuntarDocumentos(this.processo.id);
    }

    async refrescar_arvore(juntadas) {
        console.group('refrescar_arvore');
        console.log(`Número de juntadas: ${juntadas?.length || this.processo.juntadas.length}`);
        console.log(`Número de anotações antes do reload: ${this.anotacoes?.length}`);
        if (juntadas) this.processo.juntadas = juntadas;
        this.anotacoes = await this.carregar_anotacoes();
        console.log(`Número de anotações após reload: ${this.anotacoes?.length}`);
        console.groupEnd();
        if (this.seqs.length === 0) {
            for (let indice = 0; indice < this.processo.juntadas.length; indice++) {
                this.seqs.push(new Seqs(this, indice, this.div_arvore, this.telas.telaDireita));
            }
        }
        else {
            for (let indice = 0; indice < this.processo.juntadas.length; indice++) {
                if (indice < this.seqs.length) {
                    this.seqs[indice].indice = indice;
                    MFt.clear(this.seqs[indice].div);
                    this.seqs[indice].init();
                }
                else {
                    this.seqs.push(new Seqs(this, indice, this.div_arvore, this.telas.telaDireita));
                }
            }
        }
        console.group('THIS.SEQS');
        console.log(this.seqs);
        console.groupEnd();
        if (Array.isArray(this.seqs) && this.seqs.length === 1) {
            if (Array.isArray(this.seqs[0].itens) && this.seqs[0].itens.length === 1) {
                const item = this.seqs[0].itens[0];
                item.click(item.elem);
            }
        }
    }

    async historico_tarefas() {
        if (!this.id_nup) {
            const res = await this.super_get(new RequestMF(), this.get_id_processo(this.sonumeros(this.nup)), true);
            if (Array.isArray(res) && res.length) this.id_nup = res[0];
            else {
                alert('Não foi possível obter informações sobre as tarefas');
                return;
            }
        }
        const pop = new PopUp(800, 600, null, null, form=>{
            new HistoricoTarefas(form.div, this.id_nup, this.tarefa_id || undefined);
        });
        pop.iniciar(pop);
        pop.clicafora_sair = pop.aceitaEsc = true;
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

    exibirTarefa(t, elem) {
        console.log(t);
        const d1 = MFt.criaElem('div', {
            style: {
                marginBottom: '10px',
            }
        }, elem);
        if (t.id === this.idTarefa) {
            d1.style.background = "#eaf4fd";
        }
        if (t?.setorOrigem && t?.setorResponsavel) {
            this.exibirCampo('Origem/Destino', `${t.setorOrigem.sigla}/${t.setorOrigem?.unidade?.sigla || ''} ⇢ ${t.setorResponsavel.sigla}/${t.setorResponsavel?.unidade?.sigla || ''}`, MFt.criaElem('div', null, d1));
        }
        else if (t?.setorResponsavel) {
            this.exibirCampo('Rementente/Destinatário', `??? ⇢ ${t.setorResponsavel.sigla}/${t.setorResponsavel?.unidade?.sigla || ''}`, MFt.criaElem('div', null, d1));
        }
        else {
            this.exibirCampo('De', `??? ⇢ ???`, MFt.criaElem('div', null, d1));
        }
        let {tarefaAtrasada, msgTarefa, corTarefa} = (()=>{
            if (!t?.dataHoraFinalPrazo) return {
                tarefaAtrasada: false,
                msgTarefa: 'Tarefa não tem prazo',
                corTarefa: 'black'
            };
            if (t?.dataHoraConclusaoPrazo) {
                const ta = this.valida_data_hora(t.dataHoraFinalPrazo) < this.valida_data_hora(t.dataHoraConclusaoPrazo);
                return {
                    tarefaAtrasada: ta,
                    msgTarefa: this.date2normal(this.valida_data_hora(t.dataHoraConclusaoPrazo), true) + (ta ? ` - Tarefa concluída após o prazo` : ` - Tarefa concluída dentro do prazo`),
                    corTarefa: ta ? 'red' : 'black'
                };
            }
            const ta = this.valida_data_hora(t.dataHoraFinalPrazo) < new Date();
            return {
                tarefaAtrasada: ta,
                msgTarefa: this.date2normal(this.valida_data_hora(t.dataHoraFinalPrazo), true) + (ta ? ` - Prazo de conclusão esgotado` : ` - Prazo de conclusão em aberto`),
                corTarefa: ta ? 'red' : 'black'
            };
        })();
        this.exibirCampo('De', `${t?.criadoPor?.nome || '???'} ⇢ ${t?.usuarioResponsavel?.nome || '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Início prazo', `${t?.dataHoraInicioPrazo ? this.date2normal(this.valida_data_hora(t.dataHoraInicioPrazo), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Fim prazo', `${t?.dataHoraFinalPrazo ? this.date2normal(this.valida_data_hora(t.dataHoraFinalPrazo), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Leitura do Processo', `${t?.dataHoraLeitura ? this.date2normal(this.valida_data_hora(t.dataHoraLeitura), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Distribuição automática', `${t.hasOwnProperty("distribuicaoAutomatica") ? (t.distribuicaoAutomatica ? 'Sim' : 'Não') : '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Tarefa', `${t.hasOwnProperty("especieTarefa") ? t.especieTarefa.nome : '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Gênero', `${t.hasOwnProperty("especieTarefa") && t.especieTarefa.hasOwnProperty("generoTarefa") ? t.especieTarefa.generoTarefa.nome : '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Conclusão', `${msgTarefa}`, MFt.criaElem('div', null, d1), corTarefa);
        if (t?.usuarioConclusaoPrazo?.nome) {
            this.exibirCampo('Concluído por', `${t.usuarioConclusaoPrazo.nome}`, MFt.criaElem('div', null, d1));
        }
        if (t?.redistribuida) {
            this.exibirCampo('Tarefa redistribuída', `${t?.usuarioConclusaoPrazo?.nome ? 'Sim' : `${t?.atualizadoPor?.nome ? t.atualizadoPor.nome + ` (${this.date2normal(this.valida_data_hora(t.atualizadoEm), true)})` : ''}`}`, MFt.criaElem('div', null, d1));
        }
        this.exibirCampo('Obs.', `${t?.observacao ? t.observacao : 'Nenhuma observação'}`, MFt.criaElem('div', null, d1));
    }

    async detalhes_tarefa() {
        const pop = new PopUp(640, 480, null, null, async form=>{
            MFt.atribs(form.div, {
                innerText: 'Aguarde...',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            });
            this.tarefa = await this.super_get(new RequestMF(), this.get_tarefa(this.tarefa_id), true, true);
            console.log(this.tarefa);
            MFt.clear(form.div);
            pop.aceitaEsc = pop.clicafora_sair = true;
            this.exibirTarefa(this.tarefa, form.div);
        });
        pop.iniciar(pop);
    }

    atalho_anotacao() { // NÃO FUNCIONA SE O PDF ESTÁ SELECIONADO - PRECISO ESTUDAR MELHOR -  Habilita a tecla de atalho para a janela de anotação do processo
        const evento = e=>{
            if (e.key === 'a' && e.ctrlKey && false) {
                e.stopPropagation();
                e.preventDefault();
                console.log(e);
                for(let seq of this.seqs) {
                    for(let item of seq.itens) {
                        if (item.item_selecionado) {
                            console.log(item);
                            if (item.comp.mimetype === 'application/pdf') seq.anotar(item.comp.id, null, null, null, null, item.comp.mimetype);
                            else seq.anotar(item.comp.id, item?.anot?.pagina, item.titulo, item?.anot?.texto_html ? item.html_2_txt(item.anot.texto_html) : item?.anot?.texto_txt, item.anot?.cor, item.comp.mimetype);
                        }
                    }
                }
            }
        };
        window.addEventListener('keydown', evento);
    }

    async detalhes_processo() {
        const tarefa = await this.super_get(new RequestMF(), this.get_tarefa(this.tarefa_id), true, true);
        const info = new InfoTarefa(tarefa);
    }

    partes_processo() {
        new Interessados(this.processo.NUP);
    }

    async handleClipboardPNG(event) {
        let items = (event.clipboardData || window.clipboardData).items;
        let blob = undefined;

        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
            if (items[i].type.indexOf("image/png") === 0) {
                blob = items[i].getAsFile();
                break;
            }
        }
        console.log(blob);
        if (blob !== undefined) {
            let msg;
            if (!PopUp.count) msg = new MsgGenerica("Fazendo OCR da área de transferência (clipboard)", 300, 80);
            const clipboard_title = MFt.$('conteudo_clipboard_title', msg);
            const innertext_clibboard_title = clipboard_title?.innerText;
            if (innertext_clibboard_title) {
                clipboard_title.innerText = 'Fazendo o OCR da imagem...';
                const ampulheta = new Image(24);
                ampulheta.onload = ()=>{clipboard_title.appendChild(ampulheta);}
                ampulheta.src = '/images/throbber_13.gif';
            }
            const jwt = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
                task: 'obterJWT',
            });
            let reader = new FileReader();
            reader.onload = function(event) {
                console.log(event.target.result); // This is the base64 image url
            };
            // reader.readAsDataURL(blob); // mostra o arquivo no formato base64: data:image/png;base64,iVBO......
            let url = 'https://acervopessoal.org/cgi-bin/teste/ocr_kururu';
            let formData = new FormData();
            formData.append('file', blob, 'filename.png');
            formData.append('task', 'ocr');
            formData.append('jwt', jwt);
            let rawJSON;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });
                console.group('OCR');
                console.log(response);
                rawJSON = await response.text();
                console.log(rawJSON);
                console.groupEnd();
            }
            catch {
                console.error("Erro de comunicação com o servidor");
            }
            let dados;
            try {
                dados =  typeof rawJSON === 'string' ? JSON.parse(rawJSON) : undefined;
            }
            catch {}
            if (!dados) {
                if (msg) msg.msg = "⚠️ Erro de comunicação com o servidor";
                else clipboard_title.innerText = '⚠️ Erro de comunicação com o servidor';
            }
            else {
                if (dados?.dados?.erro) {
                    if (msg) msg.msg = dados.dados.erro;
                }
                else {
                    if (dados?.dados?.texto ===  '') {
                        if (msg) msg.msg = '⚠️ Nenhum texto reconhecido no OCR';
                        else clipboard_title.innerText = '⚠️ Nenhum texto reconhecido no OCR';
                    }
                    else {
                        await this.copiar_clipboard(dados.dados.texto);
                        this.clipboardTexts.push(dados.dados.texto);
                        this.show_clipboard_contents();
                        if (msg) msg.msg = "✅ OCR concluído e texto foi inserido na área de transferência (clipboard).";
                        else clipboard_title.innerText = '✅ OCR concluído!';
                        this.registrar_evento(`OCR de tela realizado ${this.nup}`);
                    }
                }
            }
            setTimeout(()=>{
                if (msg) msg.closeWindow(msg);
                if (innertext_clibboard_title) {
                    clipboard_title.innerText = innertext_clibboard_title;
                }
            }, 2000);
        }
        else {
            if (PopUp.count > 0) return;
            const msg = new MsgGenerica("Não foi possível fazer o OCR porque não foi copiada nenhuma imagem. Veja as instruções em \"OCR da Tela\".", 300, 80);
            setTimeout(()=>{
                msg.closeWindow(msg);
            }, 3500);
        }
    }

    habililtar_ocr() {
        window.addEventListener('paste', async (event) => {
            await this.handleClipboardPNG(event);
        });
    }

    ocr_clipboard(e) {
        console.group(`NAVEGADOR`);
        console.log(window.navigator.userAgent);
        console.groupEnd();

        const windows_text = '<b>Para fazer o OCR de texto da tela do computador basta colar um print da tela na área de texto desta janela.</b><br/>Ou...<br/>(1) Pressione ao mesmo tempo as teclas "Windows", "Shift" e "S".<br/>(2) Selecione a área a ser objeto do OCR.<br/>(3) Clique na aba verde no Kururu (lado direito do ícone do Menu).<br/>(4) Pressione ao mesmo tempo as teclas "Control" e "V".<br/>Note que o "print" da tela pode vir de qualquer outro programa, a exemplo do Adobe PDF.';
        const mac_text = '<b>Para fazer o OCR de texto da tela do computador basta colar um print da tela na área de texto desta janela.</b><br/>Ou...<br/>(1) Pressione ao mesmo tempo as teclas "Command", "Shift" e "5".<br/>(2) Selecione a área a ser objeto do OCR.<br/>(3) Clique em "Opções" e selecione "Clipboard"<br/>(4) Clique na aba verde no Kururu  (lado direito do ícone do Menu).<br/>(5) Pressione ao mesmo tempo as teclas "Command" e "V".<br/>Note que o "print" da tela pode vir de qualquer outro programa, a exemplo do Preview.';
        const linux_text = '<b>Para fazer o OCR de texto da tela do computador basta colar um print da tela na área de texto desta janela.</b><br/>(1) Utilize o aplicativo Screenshot.<br/>(2) Copie para a área de trabalho.<br/>(3) Clique na aba verde no Kururu (lado direito do ícone do Menu).<br/>(4) Pressione ao mesmo tempo as teclas "Control" e "V".<br/>Note que o "print" da tela pode vir de qualquer outro programa, a exemplo do Document Viewer.';
        const explicacao = (()=>{
            if (window.navigator.userAgent.toLowerCase().indexOf('linux') >= 0) return linux_text;
            else if (window.navigator.userAgent.toLowerCase().indexOf('macintosh') >= 0) return mac_text;
            else return windows_text;
        })();
        const explain = (div, wp)=>{
            const displayWp = wp.style.display;
            wp.style.display = 'none';
            const wpExplain = MFt.criaElem('div', {
                style: {
                    height: '100%',
                    display: 'grid',
                    gridTemplateRows: 'auto 40px'
                }
            }, div);
            const tt = MFt.criaElem('div', {
                innerHTML: explicacao,
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px'
                }
            }, wpExplain);
            const div_bt = MFt.criaElem('div', {

            }, wpExplain);
            const bf = new MFt.bt({
                value: 'Voltar',
                wrapper: div_bt,
                width: 120,
                height: 30,
                callback: ()=>{
                    MFt.clear(wpExplain);
                    wp.style.display = displayWp;
                    const textareaPng = MFt.$('textarea_png');
                    if (textareaPng) {
                        textareaPng.focus();
                    }
                }
            });
        }
        const showClipboard = div=>{
            MFt.clear(div);
            const wp = MFt.criaElem('div', {
                style: {
                    height: '100%',
                    display: 'grid',
                    gridTemplateRows: '40px auto 40px'
                }
            }, div);
            const tit = MFt.criaElem('div', {
                innerText: 'Conteúdo do Clipboard',
                id: 'conteudo_clipboard_title',
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '23px',
                    fontFamily: 'Titillium Web',
                }
            }, wp);
            const divTxt = MFt.criaElem('div', {
                id: 'div_all_clipboards_contents',
                style: {
                    height: 'calc(100% - 12px)',
                    border: '1px solid #AAA',
                    borderRadius: '5px',
                    backgroundColor: '#fffff0',
                    overflow: 'hidden scroll',
                    padding: '5px 10px',
                }
            }, wp);
            this.show_clipboard_contents();
            const divBts = MFt.criaElem('div', {
                style: {
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }
            }, wp);
            const btExplain = new MFt.bt({
                value: 'Instruções',
                width: 120,
                height: 30,
                wrapper: divBts,
                callback: ()=>{
                    explain(div, wp);
                }
            });
            const btFechar = new MFt.bt({
                value: 'Fechar Janela',
                width: 120,
                height: 30,
                wrapper: divBts,
                marginLeft: '20px',
                callback: ()=>{
                    pop.closeWindow(pop);
                }
            });
        }
        const pop = new PopUp(640, 480, null, null, async form=>{
            showClipboard(form.div);
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = false;
    }

    show_clipboard_contents() {
        const divTxt = MFt.$('div_all_clipboards_contents');
        if (!(divTxt instanceof HTMLDivElement)) {
            console.error('Não encontrei "div_all_clipboards_contents" como DIV');
            return;
        }
        MFt.clear(divTxt);
        if (Array.isArray(this.clipboardTexts) && this.clipboardTexts.length) {
            for (let ocr of this.clipboardTexts) {
                const bloco = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'auto 45px',
                        alignItems: 'center',
                    }
                }, divTxt);
                const oc = MFt.criaElem('div', {
                    innerText: ocr,
                    style: {
                        padding: '5px 10px',
                        border: '1px solid #AAA',
                        borderRadius: '5px',
                        backgroundColor: '#ffffff',
                        marginBottom: '5px',
                    }
                }, bloco);
                const divImg = MFt.criaElem('div', {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                    }
                }, bloco);
                const imgCopy = new Image(32);
                imgCopy.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNTk4NUUxIj48cGF0aCBkPSJNMzYwLTI0MHEtMzMgMC01Ni41LTIzLjVUMjgwLTMyMHYtNDgwcTAtMzMgMjMuNS01Ni41VDM2MC04ODBoMzYwcTMzIDAgNTYuNSAyMy41VDgwMC04MDB2NDgwcTAgMzMtMjMuNSA1Ni41VDcyMC0yNDBIMzYwWm0wLTgwaDM2MHYtNDgwSDM2MHY0ODBaTTIwMC04MHEtMzMgMC01Ni41LTIzLjVUMTIwLTE2MHYtNTYwaDgwdjU2MGg0NDB2ODBIMjAwWm0xNjAtMjQwdi00ODAgNDgwWiIvPjwvc3ZnPg==';
                divImg.appendChild(imgCopy);
                imgCopy.style.cursor = 'pointer';
                imgCopy.onclick = ()=>{
                    this.copiar_clipboard(ocr).then(dd=>{

                    }).catch(ee=>{
                        console.error(ee);
                        console.error('Erro ao copiar o conteúdo do OCR');
                    });
                    imgCopy.className = 'blink_opacity';
                    setTimeout(()=>{imgCopy.className = ''}, 500);
                }
                if (ocr === this.clipboardTexts[this.clipboardTexts.length - 1]) {
                    bloco.scrollIntoView(false);
                }
            }
        }
        else {
            divTxt.innerText = 'Nenhum OCR feito para ser exibido aqui.';
        }
    }

    add_historico_item_visualizado(item) {
        // chamado por item.js
        if (!(item instanceof Item)) {
            console.error('Item passado para add_historico_item_visualizado não é da Classe Item');
            return;
        }
        this.historico_itens_visualizados.push(item);
        this.show_historico_itens_visualizados();
    }

    criar_bt_historico_itens_visualizados() {
        this.box_historico = this?.box_historico instanceof HTMLElement ?
            this.box_historico :
            MFt.criaElem('div', {
            id: 'box_historico',
            style: {
                position: 'fixed',
                right: '0',
                top: '0px',
                display: 'block',
                height: '0px',
                // border: '1px solid blue',
                // gridTemplateRows: 'auto 1px',
            }
        });
        this.box_historico.style.zIndex = '10';
        document.body.appendChild(this.box_historico);
        this.div_lista_historico = MFt.criaElem('div', {
            id: 'lista_historico',
            style: {
                position: 'absolute',
                top: '0px',
                right: '0',
                border: '1px solid #CCC',
                borderRadius: '4px',
                backgroundColor: 'white',
                boxShadow: '0px 0px 3px #ccc',
                padding: '2px',
            }
        }, this.box_historico);
    }

    static last_pos_right_historico = undefined;

    static last_pos_top_historico = undefined;

    static drag_historico(e) {
        const box = MFt.$('box_historico');
        const des_top = e.clientY - VisualizarNUP.last_pos_top_historico;
        const des_right = e.clientX - VisualizarNUP.last_pos_right_historico;
        let right = parseInt(getComputedStyle(box).getPropertyValue('right'));
        let top = parseInt(getComputedStyle(box).getPropertyValue('top'));
        console.group('MOUSE MOVE');
        // console.log(`New left: ${right}, Old left: ${last_pos_right}, New Top: ${top}, Old Top: ${last_pos_top}, Des Left: ${des_right}, Des Top: ${des_top}, ClientX: ${e.clientX}, ClientY: ${e.clientY}`);
        // console.log(`Right: ${right}, Des Right: ${des_right}, New Right: ${right + des_right}`);
        console.log(`Top: ${top}, Des top: ${des_top}, New Top: ${top + des_top}`);
        console.log(box);
        console.groupEnd();
        VisualizarNUP.last_pos_right_historico = e.clientX;
        VisualizarNUP.last_pos_top_historico = e.clientY;
        box.style.right = `${Math.min(innerWidth - 30, right - des_right)}px`;
        box.style.top = `${Math.max(0, top + des_top)}px`;
    }

    static drag_cancel_historico(e) {
        console.group('MOUSE UP');
        console.log(e);
        console.groupEnd();
        window.removeEventListener('mousemove', VisualizarNUP.drag_historico);
        window.removeEventListener('mouseup', VisualizarNUP.drag_cancel_historico);
        const cortina_historico = MFt.$('cortina_historico');
        if (cortina_historico instanceof HTMLElement) document.body.removeChild(cortina_historico);
        //window.removeEventListener('mousedown', VisualizarNUP.move_historico);
    }

    static mouse_leave_historico(e) {
        console.group('MOUSE LEAVE');
        console.log(e);
        console.groupEnd();
        VisualizarNUP.drag_cancel_historico(e);
        MFt.$('box_historico').removeEventListener('mouseleave', VisualizarNUP.mouse_leave_historico);
    }

    static mousedown_historico (e){
        if (e.target.id !== 'historico_arrows') {
            console.log('Não é o historico_arrows', e.target);
            return;
        }
        e.preventDefault();
        const cortina_historico = MFt.criaElem('div', {
            // if mouse goes over an iframe it loses its binding with window. So that I need to put an new HTMLElement over the iframe in order to not lose the binding.
            id: 'cortina_historico',
            style: {
                position: 'fixed',
                top: '0',
                left: '0',
                width: `${window.innerWidth}px`,
                height: '100vh',
                backgroundColor: 'rgba(200, 200, 200, 0.8)',
            }
        }, document.body);
        cortina_historico.style.zIndex = '1';
        VisualizarNUP.last_pos_right_historico = e.clientX;
        VisualizarNUP.last_pos_top_historico = e.clientY;
        console.group('MOUSE DOWN');
        console.log(e);
        console.log(`Mouse Left: ${VisualizarNUP.last_pos_right_historico}, Mouse Top: ${VisualizarNUP.last_pos_top_historico}`);
        console.groupEnd();
        window.addEventListener('mousemove', VisualizarNUP.drag_historico);
        window.addEventListener('mouseup', VisualizarNUP.drag_cancel_historico);
        // MFt.$('box_historico').addEventListener('mouseleave', VisualizarNUP.mouse_leave_historico);
    }

    show_historico_itens_visualizados(flag_mouse_enter=true) {
        // When this.telas redraws flag_mouse_enter needs to be set true. This is done in this.telas.onAfterResize()
        MFt.clear(this.div_lista_historico);
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '20px auto',
                maxHeight: '300px',
                width: '300px',
                padding: '5px',
                // border: '1px solid #CCC',
                // backgroundColor: 'white',
            }
        }, this.div_lista_historico);
        const dCheckbox = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'auto 30px',
            }
        }, d1);
        const dLista = MFt.criaElem('div', {
            name: 'div_lista_docs',
            style: {
                maxHeight: '270px',
                overflowY: 'scroll',
                boxShadow: '0 0 5px #AAA',
                padding: '5px',
                marginTop: '4px',
                borderRadius: '10px 10px 10px 10px',
                backgroundColor: '#F7FFF2',
                display: this.historico_itens_visualizados_ocultar ? 'none' : 'block',
                // flexDirection: 'column'
            }
        }, this.div_lista_historico);
        // this.div_lista_historico.insertBefore(dLista, d1);
        const check = this.campo_checkbox_2('Ocultar histórico de visualização', this.historico_itens_visualizados_ocultar, dCheckbox);
        const move_list = MFt.criaElem('div', {

        }, dCheckbox);
        const arrows = new Image(24);
        arrows.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDgwLTgwIDMxMC0yNTBsNTctNTcgNzMgNzN2LTE2Nmg4MHYxNjVsNzItNzMgNTggNThMNDgwLTgwWk0yNTAtMzEwIDgwLTQ4MGwxNjktMTY5IDU3IDU3LTcyIDcyaDE2NnY4MEgyMzVsNzMgNzItNTggNThabTQ2MCAwLTU3LTU3IDczLTczSDU2MHYtODBoMTY1bC03My03MiA1OC01OCAxNzAgMTcwLTE3MCAxNzBaTTQ0MC01NjB2LTE2NmwtNzMgNzMtNTctNTcgMTcwLTE3MCAxNzAgMTcwLTU3IDU3LTczLTczdjE2NmgtODBaIi8+PC9zdmc+";
        move_list.appendChild(arrows);
        arrows.style.cursor = 'pointer';
        arrows.id = 'historico_arrows';
        const mouse_enter_leave = ()=>{
            this.historico_itens_visualizados_ocultar = check.checked;
            //this.div_lista_historico.style.display = this.historico_itens_visualizados_ocultar ? 'none' : 'block';
            dLista.style.display = this.historico_itens_visualizados_ocultar ? 'none' : 'block';
            if (true || this.historico_itens_visualizados_ocultar) {
                this.box_historico.onmouseenter = ()=>{
                    console.log('ON MOUSE ENTER, this.historico_itens_visualizados_ocultar =',this.historico_itens_visualizados_ocultar);
                    if (this.historico_itens_visualizados_ocultar) {
                        //this.div_lista_historico.style.display = 'block';
                        dLista.style.display = 'block';
                    }
                }
                this.box_historico.onmouseleave = ()=>{
                    console.log('ON MOUSE LEAVE, this.historico_itens_visualizados_ocultar =',this.historico_itens_visualizados_ocultar);
                    if (this.historico_itens_visualizados_ocultar) {
                        // this.div_lista_historico.style.display = 'none';
                        dLista.style.display = 'none';
                    }
                }
            }
        }
        check.onclick = ()=>{
            mouse_enter_leave();
        }
        if (flag_mouse_enter) mouse_enter_leave();
        const colorLeave = '#FFFFDD';
        const colorEnter =  '#FFFFAA';
        const borderLeave = '1px solid #CCC';
        const borderEnter = '1px solid #AAA';
        for(let item of this.historico_itens_visualizados) {
            const box = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '20px auto',
                }
            }, dLista);
            const divCircle = MFt.criaElem('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                }
            }, box);
            const circle = new PaletaCores(divCircle, 15, item?.anot?.cor || 0, null, false);
            const it = MFt.criaElem('div', {
                innerText: `${item.titulo}`,
                style: {
                    marginTop: '7px',
                    cursor: 'pointer',
                    padding: '3px 10px',
                    border: borderLeave,
                    borderRadius: '5px',
                    backgroundColor: colorLeave,
                }
            }, box);
            it.onmouseenter = () => {
                it.style.backgroundColor = colorEnter;
                it.style.border = borderEnter;
            }
            it.onmouseleave = () => {
                it.style.backgroundColor = colorLeave;
                it.style.border = borderLeave;
            }
            it.onclick = ()=>{
                console.group('ITEM CLICADO');
                console.log(item);
                console.groupEnd();
                //item._div_titulo.click();
                item.click(item.sub_div1); // in order to avoid new insertion of the same item into the list
                item.sub_div1.scrollIntoView(false);
                const box = MFt.$('div_arvore');
                if (box instanceof HTMLElement) {
                    const heightBox = box.getBoundingClientRect()?.height;
                    console.group('item.sub_div1');
                    console.log(item.sub_div1.getBoundingClientRect());
                    console.groupEnd();
                    if (Number.isInteger(heightBox)) {
                        const itemPosY = item.sub_div1.getBoundingClientRect().y;
                        const middle = parseInt(heightBox / 2);
                        if (itemPosY > middle) {
                            box.scrollBy(0, middle);
                        }
                    }
                    console.group('Wrapper Box');
                    console.log(box);
                    console.log(box.getBoundingClientRect());
                    console.groupEnd();
                }
                console.group('DIV do Item');
                console.log(item.sub_div1);
                console.groupEnd();
            }
        }
        //console.log(dLista.childNodes[dLista.childNodes.length - 1]);
        if (Array.from(dLista.childNodes).length) {
            dLista.childNodes[dLista.childNodes.length - 1].scrollIntoView(false);
        } // points to the last item inserted
    }
}