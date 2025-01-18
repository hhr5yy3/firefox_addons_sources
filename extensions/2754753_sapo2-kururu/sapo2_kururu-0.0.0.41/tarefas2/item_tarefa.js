class ItemTarefa extends Payloads {
    /**
     *
     * @param tarefa
     * @param wrapper
     * @param indice
     * @param pai {Grupo}
     */
    constructor(tarefa, wrapper, indice, pai) {
        super();
        this.fontSize = 11;
        this.tarefa = tarefa;
        console.group('TAREFA');
        console.log(tarefa);
        console.groupEnd();
        this.wrapper = wrapper;
        this.indice = indice;
        this.pai = pai; // referência a grupo.js
        console.group('PAI GRUPO (item_tarefa.js)------------------------------------------');
        console.log(this.pai);
        console.log('instanceof Grupo =', this.pai instanceof Grupo);
        console.groupEnd();
        this.dica_desloc_x = 25;
        this.dica_desloc_y = 0;
        this.tarefas_selecionadas = ()=>[this.tarefa]; // para o criar_modelo.js
        this.main_div = MFt.criaElem('div', {
            style: {
                minHeight: '30px',
                display: 'grid',
                gridTemplateColumns: '10px 20px 550px', // tamanho da coluna de informações do processo
                gridTemplateRows: 'auto auto',
                alignItems: 'center',
                margin: '5px 0',
                padding: '5px',
                justifyContent: 'left',
                overflowX: 'hidden',
                overflowY: 'hidden',
                cursor: 'default',
                fontFamily: 'Syne Mono'
            }
        }, wrapper);
        this.dIndice = MFt.criaElem('div', {

        }, this.main_div);
        this.dCheck = MFt.criaElem('div', {

        }, this.main_div);
        this.dDados = MFt.criaElem('div', {
            style: {
                cursor: 'pointer'
            }
        }, this.main_div);
        this.dPrazo = MFt.criaElem('div', {

        }, this.main_div);
        this.dOpcoes = MFt.criaElem('div', {
            style: {
                width: '30px',
                display: 'grid',
                margin: '0 0 0 15px',
                gridTemplateColumns: '40px 40px 40px 40px 40px 40px 40px', // NÚMERO DE COLUNAS NOS ÍCONES DE OPÇÕES
                gridTemplateRows: 'auto auto',
                gridAutoFlow: "row",
                minWidth: '64px'
                // background: '#FEE'
            }
        }, this.main_div);
        this.checkbox = MFt.criaElem('input', {type: 'checkbox'});
        this.checkbox.disabled = true;
        this.main_div.onmouseenter = ()=>this.main_div.style.background = '#ffe251';
        this.main_div.onmouseleave = ()=>this.main_div.style.background = 'rgba(255, 255, 255, 0.8)';
        this.ampulheta = new Image(32, 32);
        this.ampulheta.onload = ()=>this.init();
        this.ampulheta.src = '/images/throbber_13.gif';
    }

    init() {
        this.exibir_indice();
        this.exibir_checkbox();
        this.exibir_dados_basicos();
        // Ícones de opções são incluídos aqui -------------------------
        this.icone_observacao(this.dOpcoes);
        this.editar_doc(this.dOpcoes); // com icone modelo e icone de lancar tarefa
        this.excluir_tarefa(this.dOpcoes);
        this.informacoes_tarefa(this.dOpcoes);
        this.interessados_processo(this.dOpcoes);
    }

    exibir_indice() {
        const width = 20;
        MFt.clear(this.dIndice);
        const s1 = MFt.criaElem('span', {
            innerText: `${this.indice + 1}`,
            style: {
                width: `${width}px`,
                fontSize: `${this.fontSize}px`,
                cursor: 'default'
            }
        }, this.dIndice);
    }

    exibir_checkbox() {
        const width = 20;
        MFt.clear(this.dCheck);
        this.dCheck.appendChild(this.checkbox);
        MFt.atribs(this.dCheck, {
            style: {
                width: `${width}px`,
                fontSize: `${this.fontSize}px`
            }
        });
    }

    exibir_dados_basicos() {
        const width = 560;
        const campo = (label, valor, elem, texto, cor, classe) => {
            const w = MFt.criaElem('div', {

            }, elem);
            const l = MFt.criaElem('span', {
                innerText: label,
                style: {
                    fontWeight: 'bold',
                    fontSize: `${this.fontSize}px`,
                    margin: '0 5px 0 0'
                }
            }, w);
            const v = MFt.criaElem('span', {
                innerText: valor,
                style: {
                    fontWeight: 'normal',
                    fontSize: `${this.fontSize}px`,
                    margin: '0 0 0 0'
                }
            }, w);
            if (texto) {
                const t = MFt.criaElem('span', {
                    innerText: texto,
                    style: {
                        color: cor || 'black',
                        fontWeight: 'normal',
                        fontSize: `${this.fontSize}px`,
                        margin: '0 0 0 10px'
                    }
                }, w);
                if (classe) t.className = classe;
            }
        }
        MFt.clear(this.dDados);
        const d1 = MFt.criaElem('div', {
            style: {
                width: 'auto', //`${width}px`,
                textAlign: 'left',
                fontSize: `${this.fontSize}px`
            }
        }, this.dDados);
        d1.onclick = ()=>window.open(`/visualizar_nup/index.html?id_nup=${this.tarefa.processo.id}&tarefa_id=${this.tarefa.id}&especie_tarefa_id=${this.tarefa.especieTarefa.id}&cache=on`);
        campo('TÍTULO:', this.tarefa.processo.titulo, d1);
        if (this.tarefa?.processo?.descricao) campo('DESCRIÇÃO:', this.tarefa.processo.descricao, d1);
        if (this.tarefa?.processo?.procedencia?.nome) campo('ORIGEM:', this.corrigir_nome(this.tarefa.processo.procedencia.nome), d1);
        campo('NUP:', this.formatanup(this.tarefa.processo.NUP), d1);
        const aviso_prazo = (()=>{
            const hoje = new Date().setHours(0,0,0,0);
            const fim = this.valida_data_hora(this.tarefa.dataHoraFinalPrazo).setHours(0,0,0,0);
            const dif = MFt.dates.daydiff(hoje, fim);
            if (dif === 0) return {texto: 'Prazo vence hoje', cor: 'red'};
            if (dif === 1) return {texto: 'Prazo vence amanhã', cor: 'green'};
            return dif < 0 ?{texto: `Prazo vencido há ${Math.abs(dif)} dias`, cor: 'red'} : {texto: `Prazo vence em ${dif} dias`, cor: 'black'};
        })();
        campo('PRAZO:', this.date2normal(this.valida_data_hora(this.tarefa.dataHoraFinalPrazo)), d1, aviso_prazo.texto, aviso_prazo.cor);
        if (this.tarefa.kururu_compartilhada) {
            let etiqueta_tarefa_compartilhada = this?.tarefa?.vinculacoesEtiquetas ? this.tarefa.vinculacoesEtiquetas.filter(d=>d.etiqueta.nome==="COMPARTILHADA") : undefined;
            etiqueta_tarefa_compartilhada = Array.isArray(etiqueta_tarefa_compartilhada) && etiqueta_tarefa_compartilhada.length ? etiqueta_tarefa_compartilhada[0] : undefined;
            if (etiqueta_tarefa_compartilhada) {
                campo("TAREFA COMPARTILHADA EM", this.date2normal(this.valida_data_hora(etiqueta_tarefa_compartilhada.criadoEm), true), d1, 'TAREFA COMPARTILHADA', 'red', 'blink_orange');
            }
            else {
                campo("TAREFA COMPARTILHADA EM", this.date2normal(this.valida_data_hora(this.tarefa.atualizadoEm), true), d1, 'TAREFA COMPARTILHADA', 'red', 'blink_orange');
            }
        }
        if (this.tarefa?.observacao) campo('OBSERVAÇÃO:', this.tarefa.observacao, d1);
    }

    icone_observacao(elem) {
        const note = new Image(32, 32);
        note.onload = ()=>{
            const d1 = MFt.criaElem('div', {

            }, elem);
            d1.appendChild(note);
            note.style.cursor = 'pointer';
            new Dica(note, 'Editar Observação', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
            note.onclick = ()=>{
                const ed = new EditarObservacao();
                const res = ed.editar(this.tarefa);

            }
        };
        note.src = '/images/note.png';
    }

    editar_doc(elem) { // Botão da tarefa
        const icon = new Image(32, 32);
        const d1 = MFt.criaElem('div', {

        }, elem);
        d1.appendChild(this.ampulheta.cloneNode());
        icon.onload = async ()=>{
            if (true) { // Icone lancar atividade
                const icone_atividade = new Image(32, 32);
                icone_atividade.onload = ()=>{
                    const dLancarAtividade = MFt.criaElem('div', {

                    }, elem);
                    dLancarAtividade.appendChild(icone_atividade);
                    icone_atividade.style.cursor = 'pointer';
                    new Dica(icone_atividade, 'Lançar Atividade', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
                    icone_atividade.onclick = async ()=>{
                        console.group('LANCAR ATIVIDADE');
                        console.log(this.tarefa);
                        console.groupEnd();
                        if (this.tarefa?.kururu_compartilhada) {
                            alert('Tarefas compartilhadas só podem ser encerradas no Super');
                            return;
                        }
                        const la = new LancarAtividade(this, '', false);
                        //console.log('this.pai=', this?.pai);
                        //console.log('this.pai.pai=', this?.pai?.pai);
                        if (this?.pai instanceof Grupo && this?.pai?.pai instanceof Tarefas) {
                            this.pai.pai.janela_lancar_atividade_aberta = true;
                            console.log('tarefas.janela_lancar_atividade_aberta =', this.pai.pai.janela_lancar_atividade_aberta);
                        }
                        const rr = await la.init();
                        if (this?.pai instanceof Grupo && this?.pai?.pai instanceof Tarefas) {
                            this.pai.pai.janela_lancar_atividade_aberta = false;
                            console.log('tarefas.janela_lancar_atividade_aberta =', this.pai.pai.janela_lancar_atividade_aberta);
                        }
                    }
                };
                icone_atividade.src = "/images/lancar_atividade.png";
            }
            const xml = new RequestMF();
            let minutas = await this.super_get(xml, this.get_minutas(this.tarefa.id), true);
            if (!minutas || !Array.isArray(minutas)) {
                minutas = await this.procurar_minuta_meio_alternativo();
            }
            console.log(minutas);
            if (Array.isArray(minutas) && minutas.length) { // existem minutas
                MFt.clear(d1);
                d1.appendChild(icon);
                icon.style.cursor = 'pointer';
                new Dica(icon, 'Abrir Minuta', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
                if (minutas.length === 1) {
                    console.log(this.tarefa);
                    const m = minutas[0];
                    const url = this.criar_link_doc(this.tarefa, m.id, m.componentesDigitais[0].id, m?.assinado, m);
                    icon.onclick = ()=>{window.open(url);};
                }
                else {
                    // existem duas ou mais minutos
                    icon.onclick = ()=>this.excluir_minuta(minutas);
                }
                const icon_doc_gerenciar = new Image(32, 32);
                await this.load_image(icon_doc_gerenciar, "/images/doc_gear.png");
                MFt.criaElem('div', {

                }, elem).appendChild(icon_doc_gerenciar);
                icon_doc_gerenciar.style.cursor = 'pointer';
                new Dica(icon_doc_gerenciar, 'Excluir Minuta', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
                icon_doc_gerenciar.onclick = ()=>{this.excluir_minuta(minutas);}
            }
            else { // Somente se nao houver minuta na tarefa eh que o icone de criar modelo vai aparecer
                const icon_model = new Image(32, 32);
                icon_model.onload = ()=>{
                    MFt.clear(d1);
                    d1.appendChild(icon_model);
                    icon_model.style.cursor = 'pointer';
                    new Dica(icon_model, 'Criar Minuta', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
                    icon_model.onclick = ()=>{
                        const ed = new CriarModelo(this);
                        // const res = ed.editar(this.tarefa);

                    }
                };
                icon_model.src = '/images/doc_novo.png';
            }
        };
        icon.src = '/images/doc.png';
    }

    open_quadro_opcoes(height, titulo) { // PopUp do lançar atividade
        //console.log('ITEM TAREFA.JS LINHA 252');
        const pop = new PopUp(1200, height, null, null, form=>{

        });
        pop.header = titulo;
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = true;
        return pop;
    }

    excluir_minuta(minutas) {
        console.log(minutas);
        let lista_minutas = [];
        let del_bt;

        const item_minuta = (m,e)=>{
            const wrapper = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '35px auto',
                    gridTemplateRows: 'auto',
                    // marginBottom: '5px',
                    paddingBottom: '10px',
                    paddingTop: '10px',
                    borderBottom: '1px solid #CCC',
                }
            }, e);
            const div_check = MFt.criaElem('div', {
                style: {
                    margin: '0 5px',
                    display: 'flex',
                    alignItems: 'center'
                }
            }, wrapper);
            const check = MFt.criaElem('input', {
                type: 'checkbox'
            }, div_check);
            const subwrapper = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto',
                    gridTemplateRows: 'auto auto auto',
                }
            }, wrapper);
            const titulo = MFt.criaElem('div', {
                style: {
                    fontSize: '16px',
                    color: '#333'
                }
            }, subwrapper);
            const criadoem = MFt.criaElem('div', {
                innerText: `- Criado em ${this.date2normal(this.valida_data_hora(m.criadoEm), true)}`,
                style: {
                    marginLeft: '20px',
                    color: '#777'
                }
            }, subwrapper);
            const atualizadoem = MFt.criaElem('div', {
                innerText: (()=>{
                    let atualizadoEm = Array.isArray(m?.componentesDigitais) && m.componentesDigitais.length ? m.componentesDigitais[0].atualizadoEm : m.atualizadoEm;
                    return `${this.valida_data_hora(m.criadoEm).valueOf() !== this.valida_data_hora(atualizadoEm).valueOf() ? `- Atualizado em ${this.date2normal(this.valida_data_hora(atualizadoEm), true)}` : '- Nunca editado'}`;
                })(),
                style: {
                    marginLeft: '20px',
                    color: '#777'
                }
            }, subwrapper);
            const link = MFt.criaElem('a', {
                innerText: `${m.tipoDocumento.nome} ${m.numeroUnicoDocumentoFormatado ? `n. ${m.numeroUnicoDocumentoFormatado}` : ''}`,
                href: this.criar_link_doc(this.tarefa, m.id, m.componentesDigitais[0].id), // `https://supersapiens.agu.gov.br/apps/tarefas/consultivo/minhas-tarefas/entrada/tarefa/${this.tarefa.id}/processo/${this.tarefa.processo.id}/visualizar/0-0/documento/${m.id}/(componente-digital/${m.componentesDigitais[0].id}/editor/ckeditor//sidebar:editar/atividade)`,
                target: '_blank',
                style: {
                    textDecorationStyle: 'none',
                    textDecorationColor: 'none'
                }
            }, titulo);
            check.onchange = ()=>{
                if (check.checked) lista_minutas.push(m);
                else lista_minutas = lista_minutas.filter(d=>d.componentesDigitais[0].id !== m.componentesDigitais[0].id);
                del_bt.disabled = !lista_minutas.length;
                console.log(lista_minutas);
            }
            wrapper.onmouseenter = ()=>{
                wrapper.style.background = `rgba(0,0,0,0.1)`;
            }
            wrapper.onmouseleave = ()=>{
                wrapper.style.background = `rgba(0,0,0,0)`;
            }
        };

        const excluir = async ()=>{
            const amp = new Image(15, 15);
            const ok = new Image(15, 15);
            this.load_image(amp, '/images/throbber_13.gif');
            this.load_image(ok, '/images/certo.png');
            const item = mi=>{
                const d1 = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '25px auto',
                        gridTemplateRows: 'auto auto',
                        margin: '5px 0 5px 20px',
                        fontSize: '16px',
                    }
                }, pop.div);
                const d2 = MFt.criaElem('div', {}, d1);
                const d3 = MFt.criaElem('div', {
                    innerText: `${mi.tipoDocumento.nome} ${mi.numeroUnicoDocumentoFormatado ? `n. ${mi.numeroUnicoDocumentoFormatado}` : ''}`,
                    style: {
                        color: '#333'
                    }
                }, d1);
                return {
                    iniciar: ()=>{
                        d2.appendChild(amp);
                    },
                    ok: ()=>{
                        MFt.clear(d2);
                        d2.appendChild(ok);
                    }
                }
            };
            pop.aceitaEsc = pop.clicafora_sair = false;
            MFt.clear(pop.div);
            MFt.atribs(pop.div, {
                style: {
                    fontFamily: 'Syne Mono'
                }
            });
            const label = MFt.criaElem('div', {
                innerText: 'Excluindo...',
                style: {
                    margin: '0 0 5px 0',
                    padding: '0 0 5px 0',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            }, pop.div);
            for(let m of lista_minutas) {
                const i = item(m);
                i.iniciar();
                const xml = new RequestMF();
                const res = await this.super_get(xml, this.apagar_minuta(m.id));
                console.log(res);
                // apagar
                // await this.esperar(2000);
                i.ok();
            }
            label.innerText = `Tudo feito!`;
            pop.aceitaEsc = pop.clicafora_sair = true;
        }

        const pop = new PopUp(400, 300, null, null, form=>{
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Titillium Web'
                }
            });
            const d1 = MFt.criaElem('div', {
                style: {
                    padding: '0 0 5px 0',
                    margin: '0 0 5px 0',
                    borderBottom: '1px solid #CCC',
                    borderRadius: '6px',
                }
            }, form.div);
            const d2 = MFt.criaElem('div', {
                style: {
                    height: 'calc(100% - 70px)',
                    border: '1px solid #CCC',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    background: 'cornsilk'
                }
            }, form.div);
            const d3 = MFt.criaElem('div', {}, form.div);
            const s1 = MFt.criaElem('span', {
                innerText: 'Selecione os documentos',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                }
            }, d1);
            for(let m of minutas) {
                console.log(m);
                item_minuta(m, d2);
            }
            // item_minuta(minutas[0], d2);
            del_bt = new MFt.bt({
                value: 'Excluir',
                wrapper: d3,
                width: 100,
                height: 30,
                disabled: true,
                marginTop: '10px',
                callback: ()=>{excluir();}
            });
        });
        pop.aceitaEsc = pop.clicafora_sair = true;
        pop.iniciar(pop);
    }


    excluir_tarefa(elem) {
        const xml = new RequestMF();
        const icone = new Image(32, 32);
        icone.onload = ()=>{
            const d1 = MFt.criaElem('div', {

            }, elem);
            d1.appendChild(icone);
            icone.style.cursor = 'pointer';
            new Dica(icone, 'Excluir tarefa', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
            icone.onclick = async ()=>{
                if (confirm("Confirma a exclusão da tarefa?")) {
                    const m = new MsgGenerica("Excluindo tarefa...", 250, 30);
                    // m.p1.style.fontFamily = 'Syne Mono';
                    const res = await this.super_get(xml, this.delete_tarefa(this.tarefa.id));
                    if (res) {
                        m.msg = "Registrando evento...";
                        await this.registrar_evento(`Exclusão Tarefa ID ${this.tarefa.id}, NUP ${this.tarefa.processo.NUP}`);
                        m.msg = "Tarefa excluída.";
                        await this.esperar(2000);
                        location.reload();
                    }
                    else {
                        m.msg = "Erro na exclusão da tarefa!";
                        await this.esperar(2000);
                    }
                    m.closeWindow(m);
                }
            }
        };
        icone.src = '/images/lixeira_01.png';
    }

    informacoes_tarefa(elem) {
        const icone = new Image(32, 32);
        icone.onload = ()=>{
            const d1 = MFt.criaElem('div', {

            }, elem);
            d1.appendChild(icone);
            icone.style.cursor = 'pointer';
            new Dica(icone, 'Informações', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
            icone.onclick = ()=>{
                new InfoTarefa(this.tarefa);
            }
        };
        icone.src = '/images/info.png';
    }

    async procurar_minuta_meio_alternativo() {
        let minutas = [];
        let xml = new RequestMF();
        console.log('Procurando minutas por API alternativa');
        let tmp_resp = await this.super_get(xml, this.get_minutas_alternativo(this.tarefa.id), true);
        console.log(tmp_resp);
        if (Array.isArray(tmp_resp) && tmp_resp.length && Array.isArray(tmp_resp[0]?.vinculacoesEtiquetas)) {
            let dd = [];
            for(let v of tmp_resp[0].vinculacoesEtiquetas) {
                console.log(v);
                let dadosMinuta;
                try {
                    dadosMinuta = JSON.parse(v?.objectContext);
                } catch {}
                console.log(dadosMinuta);
                if (dadosMinuta) dd.push(dadosMinuta);
            }
            for(let d of dd) {
                let ret = {
                    componentesDigitais: []
                };
                for(let c of d.componentesDigitaisId) {
                    ret.componentesDigitais.push({
                        id: c
                    });
                }
                minutas.push(ret);
            }
        }
        return minutas;
    }

    interessados_processo(dOpcoes) {
        const icone = new Image(32, 32);
        icone.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjQiPjxwYXRoIGQ9Ik00MC0xNjB2LTExMnEwLTM0IDE3LjUtNjIuNVQxMDQtMzc4cTYyLTMxIDEyNi00Ni41VDM2MC00NDBxNjYgMCAxMzAgMTUuNVQ2MTYtMzc4cTI5IDE1IDQ2LjUgNDMuNVQ2ODAtMjcydjExMkg0MFptNzIwIDB2LTEyMHEwLTQ0LTI0LjUtODQuNVQ2NjYtNDM0cTUxIDYgOTYgMjAuNXQ4NCAzNS41cTM2IDIwIDU1IDQ0LjV0MTkgNTMuNXYxMjBINzYwWk0zNjAtNDgwcS02NiAwLTExMy00N3QtNDctMTEzcTAtNjYgNDctMTEzdDExMy00N3E2NiAwIDExMyA0N3Q0NyAxMTNxMCA2Ni00NyAxMTN0LTExMyA0N1ptNDAwLTE2MHEwIDY2LTQ3IDExM3QtMTEzIDQ3cS0xMSAwLTI4LTIuNXQtMjgtNS41cTI3LTMyIDQxLjUtNzF0MTQuNS04MXEwLTQyLTE0LjUtODFUNTQ0LTc5MnExNC01IDI4LTYuNXQyOC0xLjVxNjYgMCAxMTMgNDd0NDcgMTEzWk0xMjAtMjQwaDQ4MHYtMzJxMC0xMS01LjUtMjBUNTgwLTMwNnEtNTQtMjctMTA5LTQwLjVUMzYwLTM2MHEtNTYgMC0xMTEgMTMuNVQxNDAtMzA2cS05IDUtMTQuNSAxNHQtNS41IDIwdjMyWm0yNDAtMzIwcTMzIDAgNTYuNS0yMy41VDQ0MC02NDBxMC0zMy0yMy41LTU2LjVUMzYwLTcyMHEtMzMgMC01Ni41IDIzLjVUMjgwLTY0MHEwIDMzIDIzLjUgNTYuNVQzNjAtNTYwWm0wIDMyMFptMC00MDBaIi8+PC9zdmc+';
        const d1 = MFt.criaElem('div', {

        }, dOpcoes);
        d1.appendChild(icone);
        icone.style.cursor = 'pointer';
        new Dica(icone, 'Interessados', this.dica_desloc_x, this.dica_desloc_y, false, null, null, null, 'rgba(255, 255, 255, 0.8)', 'none', null, 0);
        icone.onclick = ()=>{
            new Interessados(this.tarefa.processo.NUP);
        }
    }
}