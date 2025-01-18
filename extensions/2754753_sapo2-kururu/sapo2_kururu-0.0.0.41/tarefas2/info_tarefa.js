class InfoTarefa extends Payloads {
    constructor(tarefa) {
        super();
        this.tarefa = tarefa;
        this.init();
    }

    init() {
        const pop = new PopUp(670, 600, null, null, form=>{
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            });
            const desbloquear = form.bloquear(form, "Consultando Super...");
            const wrapper = MFt.criaElem("div", {
                style: {
                    height: '565px',
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }
            }, form.div);
            this.info_processo(wrapper);
            this.info_tarefa(wrapper);
            this.botoesAdicionais(form.div);
            desbloquear();
            console.log(this.tarefa);
        });
        pop.aceitaEsc = pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    info_processo(elem) {
        const proc = this.tarefa.processo;
        console.group('PROCESSO');
        console.log(proc);
        console.groupEnd();
        const d1 = this.criarArea("PROCESSO", elem);
        let dados = [
            ["NUP", proc.NUPFormatado],
            ["Chave de Acesso", proc.chaveAcesso],
            ["Data da Criação", this.date2normal(this.valida_data_hora(proc.criadoEm))],
            ["Descrição", proc.descricao],
            ["Espécie", proc.especieProcesso.descricao],
            ["Gênero", proc.especieProcesso.generoProcesso.descricao],
            ["Procedência", this.tarefa.processo.procedencia.nome],
        ];
        this.exibirCampos(dados, d1);
    }

    info_tarefa(elem) {
        const d1 = this.criarArea('TAREFA', elem);
        console.log(this.tarefa);
        const compartilhada = (()=>{
            if (this.tarefa?.kururu_compartilhada) {
                let etiqueta_tarefa_compartilhada = this?.tarefa?.vinculacoesEtiquetas ? this.tarefa.vinculacoesEtiquetas.filter(d=>d.etiqueta.nome==="COMPARTILHADA") : undefined;
                etiqueta_tarefa_compartilhada = Array.isArray(etiqueta_tarefa_compartilhada) && etiqueta_tarefa_compartilhada.length ? etiqueta_tarefa_compartilhada[0] : undefined;
                return etiqueta_tarefa_compartilhada ? {
                    criadoEm: etiqueta_tarefa_compartilhada.criadoEm
                } : {
                    criadoEm: this.tarefa.atualizadoEm
                };
            }
            return undefined;
        })();
        let dados = [
            ["ID", this.tarefa?.id.toString()],
            ["Distribuição", this.date2normal(this.valida_data_hora(this.tarefa?.dataHoraDistribuicao || this.tarefa?.criadoEm), true)],
            ["Automática", this.tarefa.distribuicaoAutomatica ? "SIM" : "NÃO"],
            ["Início do prazo", this.date2normal(this.valida_data_hora(this.tarefa.dataHoraInicioPrazo), true)],
            this.tarefa?.dataHoraFinalPrazo ? ["Fim do prazo", this.date2normal(this.valida_data_hora(this.tarefa.dataHoraFinalPrazo), true)] : [],
            ["Leitura do processo", this.tarefa?.dataHoraLeitura ? `SIM - ${this.date2normal(this.valida_data_hora(this.tarefa.dataHoraLeitura), true)}` : 'Processo ainda não aberto pelo responsável'],
            ["Gênero da tarefa", this.tarefa.especieTarefa.generoTarefa.nome],
            ["Espécie da tarefa", this.tarefa.especieTarefa.nome],
            ["Origem", `${this?.tarefa?.setorOrigem?.nome || '???'} - ${this?.tarefa?.setorOrigem?.unidade?.sigla || '???'}`],
            ["Tarefa criada por", this.tarefa?.criadoPor ? `${this.tarefa.criadoPor.nome} (${this.tarefa.criadoPor?.email || '---'}${this.tarefa?.criadoPor?.id ? ` - ${this.tarefa.criadoPor.id}` : ''})` : '---'],
            ["Observação", this?.tarefa?.observacao || '---'],
        ];
        if (compartilhada) {
            dados.push(["Compartilhada em", this.date2normal(this.valida_data_hora(compartilhada.criadoEm), true)]);
            if (!this?.tarefa?.redistribuida) {
                dados.push(["Atualizada por", this.tarefa?.atualizadoPor?.nome ? `${this.tarefa.atualizadoPor.nome} (${this.tarefa?.atualizadoPor?.email || '---'})` : '---']);
                dados.push(["Atualizada em", this.tarefa?.atualizadoEm ? this.date2normal(this.valida_data_hora(this.tarefa.atualizadoEm), true) : '---']);
            }
        }
        if (this?.tarefa?.redistribuida) {
            dados.push(["Redistribuída", "SIM"]);
            dados.push(["Atualizada por", this.tarefa?.atualizadoPor?.nome ? `${this.tarefa.atualizadoPor.nome} (${this.tarefa?.atualizadoPor?.email || '---'})` : '---']);
            dados.push(["Atualizada em", this.tarefa?.atualizadoEm ? this.date2normal(this.valida_data_hora(this.tarefa.atualizadoEm), true) : '---']);
        }
        else {
            dados.push(["Redistribuída", "NÃO"]);
        }

        this.exibirCampos(dados, d1);
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

    criarArea(label, wrapper) {
        const d1 = MFt.criaElem('div', {
            style: {
                marginBottom: '20px'
            }

        }, wrapper);
        MFt.criaElem('div', {
            innerText: label,
            style: {
                fontWeight: 'bold`'
            }
        }, d1);
        return MFt.criaElem('div', {
            style: {
                marginLeft: '25px'
            }
        }, d1);
    }

    botoesAdicionais(div) {
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'auto auto auto auto'
            }
        }, div);
        this.botaoHistoricoTarefas(d1, div, this.tarefa.id);
        this.botaoHistoricoEventos(d1, div, this.tarefa.id);
        this.botaoRastrear(d1, div, this.tarefa.id);
    }

    botaoHistoricoTarefas(d1, div, idTarefa) {
        const bt = new MFt.bt({
            value: "Histórico de Tarefas",
            width: 150,
            height: 30,
            wrapper: d1,
            callback: ()=>{
                new HistoricoTarefas(div, this.tarefa.processo.id, idTarefa);
            }
        });
    }

    botaoHistoricoEventos(d1, div, idTarefa) {
        const bt = new MFt.bt({
            value: "Histórico de Eventos",
            width: 150,
            height: 30,
            wrapper: d1,
            callback: ()=>{
                new HistoricoEventos(this.tarefa, div);
            }
        });
    }

    botaoRastrear(d1, div, idTarefa) {
        return;
        const bt = new MFt.bt({
            value: "Rastrear Tarefa",
            width: 150,
            height: 30,
            wrapper: d1,
            callback: ()=>{
                new RastrearTarefa(this.tarefa, div);
            }
        });
    }
}