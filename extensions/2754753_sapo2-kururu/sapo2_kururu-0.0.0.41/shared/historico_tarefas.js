class HistoricoTarefas extends Payloads {
    constructor(wrapper, idProcesso, idTarefa) {
        super();
        this.wrapper = wrapper;
        this.idProcesso = idProcesso;
        this.idTarefa = idTarefa; // opcional
        this.xml = new RequestMF();
        this.todasTarefas = [];
        this.inicializar();
    }

    async inicializar() {
        MFt.clear(this.wrapper);
        MFt.atribs(this.wrapper, {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px'
            }
        });
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: '150px 80px 30px',
                alignItems: 'center'
            }
        }, this.wrapper);
        MFt.criaElem('div', {
            innerText: 'Consultando o "Super"...'
        }, d1);
        const img = new Image(16, 16);
        img.onload = ()=>{
            MFt.criaElem('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center'
                }
            }, d1).appendChild(img);
        }
        img.src = '/images/throbber_13.gif';
        this.todasTarefas = await this.obterTodasTarefas(MFt.criaElem('div', null, d1));
        console.log(this.todasTarefas);
        MFt.clear(this.wrapper);
        this.todasTarefas.sort((a, b)=>{
            // Organiza as tarefas por data de criacao em ordem ascendente
            return this.valida_data_hora(a.criadoEm).valueOf() - this.valida_data_hora(b.criadoEm).valueOf();
        });
        const container = MFt.criaElem('div', {
            style: {
                height: '100%',
                display: 'grid',
                gridTemplateRows: '100px auto 50px',
            }
        }, this.wrapper);
        const wrapperCabecalho = MFt.criaElem('div', {
            style: {
                overflowX: 'hidden',
                overflowY: 'hidden',
                borderBottom: '1px solid #CCC',
                paddingBottom: '5px',
                marginBottom: '5px'
            }
        }, container);
        const wrapperTarefas = MFt.criaElem('div', {
            style: {
                overflowX: 'hidden',
                overflowY: 'auto'
            }
        }, container);
        let dataUltimaTarefa = undefined;
        let wp = undefined;
        this.cabecalhoProcesso(wrapperCabecalho);
        if (this.todasTarefas.length === 0) {
            MFt.criaElem('div', {
                innerText: 'Não existem tarefas no processo mencionado',
                style: {
                    fontWeight: 'bold'
                }
            }, wrapperGlobal);
            return;
        }
        for(let t of this.todasTarefas) {
            const criadoEm = this.valida_data_hora(t.criadoEm).setHours(0,0,0,0);
            wp =  criadoEm !== dataUltimaTarefa ? this.criaDivNovaData(t, wrapperTarefas) : wp;
            this.exibirTarefa(t, wp);
            dataUltimaTarefa = this.valida_data_hora(t.criadoEm).setHours(0,0,0,0);
        }
    }

    cabecalhoProcesso(wrapper) {
        const t = this.todasTarefas[0];
        const d1 = MFt.criaElem('div', null, wrapper);
        this.exibirCampo('Processo', this.formatanup(t.processo.NUP), MFt.criaElem('div', null, d1));
        this.exibirCampo('Título',t?.processo?.titulo || '???', MFt.criaElem('div', null, d1));
        this.exibirCampo('Descrição', t?.processo?.descricao || '---', MFt.criaElem('div', null, d1));
    }

    async obterTodasTarefas(elem) {
        let total = 0;
        let tarefas = [];
        let offset = 0;
        while (total === 0 || tarefas.length < total) {
            const bloco = await this.super_get(this.xml, this.obter_tarefas(this.idProcesso, tarefas.length, 'ASC', 50));
            if (!bloco?.total || !bloco?.entities) {
                await this.msgErro('Erro de comunicação com o Super');
                return;
            }
            total = bloco.total;
            tarefas = tarefas.concat(bloco.entities);
            elem.innerText = `(${tarefas.length}/${total})`;
        }
        return tarefas;
    }

    async msgErro(msg) {
        MFt.clear(this.wrapper);
        this.wrapper.innerText = msg;
        await this.anexarImagem('/images/erro01.png', this.wrapper);
    }

    exibirTarefa(t, elem) {
        //console.log(t);
        const d1 = MFt.criaElem('div', {
            style: {
                marginBottom: '10px',
            }
        }, elem);
        if (t.id === this.idTarefa) {
            d1.style.background = "#eaf4fd";
        }
        if (t?.setorOrigem && t?.setorResponsavel) {
            this.exibirCampo('Origem/Destino', `${t.setorOrigem.sigla}/${t.setorOrigem?.unidade?.sigla || ''} (${t?.setorOrigem?.id}/${t?.setorOrigem?.unidade?.id || ''}) ⇢ ${t.setorResponsavel.sigla}/${t.setorResponsavel?.unidade?.sigla || ''} (${t?.setorResponsavel?.id}/${t?.setorResponsavel?.unidade?.id})`, MFt.criaElem('div', null, d1));
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
        this.exibirCampo('Tarefa criada por', `${t?.criadoPor?.nome || '???'}${t?.criadoPor?.id ? ` (${t.criadoPor.id})` : ''} para ${t?.usuarioResponsavel?.nome || '???'}${t?.usuarioResponsavel?.id ? `(${t.usuarioResponsavel.id})` : ''}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('ID', `${t?.id || '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Criada em', `${t?.criadoEm ? this.date2normal(this.valida_data_hora(t.criadoEm), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Início prazo', `${t?.dataHoraInicioPrazo ? this.date2normal(this.valida_data_hora(t.dataHoraInicioPrazo), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Fim prazo', `${t?.dataHoraFinalPrazo ? this.date2normal(this.valida_data_hora(t.dataHoraFinalPrazo), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Leitura do Processo', `${t?.dataHoraLeitura ? this.date2normal(this.valida_data_hora(t.dataHoraLeitura), true) : '---'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Distribuição automática', `${t.hasOwnProperty("distribuicaoAutomatica") ? (t.distribuicaoAutomatica ? 'Sim' : 'Não') : '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Tarefa', `${t.hasOwnProperty("especieTarefa") ? `${t?.especieTarefa?.nome} (${t?.especieTarefa?.id})` : '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Gênero', `${t.hasOwnProperty("especieTarefa") && t.especieTarefa.hasOwnProperty("generoTarefa") ? `${t?.especieTarefa?.generoTarefa?.nome} (${t?.especieTarefa?.generoTarefa?.id})` : '???'}`, MFt.criaElem('div', null, d1));
        this.exibirCampo('Conclusão', `${msgTarefa}`, MFt.criaElem('div', null, d1), corTarefa);
        if (t?.usuarioConclusaoPrazo?.nome) {
            this.exibirCampo('Concluído por', `${t.usuarioConclusaoPrazo.nome}`, MFt.criaElem('div', null, d1));
        }
        if (t?.redistribuida) {
            this.exibirCampo('Tarefa redistribuída', `${t?.usuarioConclusaoPrazo?.nome ? 'Sim' : `${t?.atualizadoPor?.nome ? t.atualizadoPor.nome + ` (${this.date2normal(this.valida_data_hora(t.atualizadoEm), true)})` : ''}`}`, MFt.criaElem('div', null, d1));
        }
        this.exibirCampo('Obs.', `${t?.observacao ? t.observacao : 'Nenhuma observação'}`, MFt.criaElem('div', null, d1));
        if (t?.usuarioConclusaoPrazo?.nome) {
            const divAtividade = MFt.criaElem('div', {
                style: {
                    margin: '0 0 10px 30px'
                }
            }, d1);
            const btAtividade = new MFt.bt({
                value: 'Ver atividade lançada',
                width: 200,
                height: 30,
                wrapper: divAtividade,
                callback: () => {
                    this.exibir_atividade_lancada(t, divAtividade);
                }
            });
        }
    }

    criaDivNovaData(tarefa, elem) {
        const d1 = MFt.criaElem('div', {
            style: {

            }
        }, elem);
        const dData = MFt.criaElem('div', {
            innerText: this.date2normal(this.valida_data_hora(tarefa.criadoEm)),
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'blue',
                background: '#ECECEC',
                padding: '3px 6px'
            }
        }, d1);
        return MFt.criaElem('div', {
            id: 'areaTarefas',
            style: {
                margin: '0 0 70px 20px'
            }
        }, d1);
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

    async exibir_atividade_lancada(tarefa, div) {
        if (!(div instanceof HTMLElement)) throw new Error("DIV não é elemento HTML");
        if (!Number.isInteger(tarefa?.id)) throw new Error("Tarefa.ID não é Inteiro");
        const newdiv = ()=>{return MFt.criaElem('div', null, d1);}
        MFt.clear(div);
        const d1 = MFt.criaElem('div', {
            innerText: 'Aguarde...',
            style: {
                alignItems: 'center'
            }
        }, div);
        const img = new Image(16, 16);
        img.onload = ()=>{
            d1.appendChild(img);
        }
        img.src = '/images/throbber_13.gif';
        console.group('TAREFA');
        console.log(tarefa);
        console.groupEnd();
        const req = new RequestMF();
        let res;
        let atividadeErrada = false;
        if (tarefa?.especieTarefa?.generoTarefa?.id === 2) { // tarefa consultiva
            res = await this.super_get(req, this.get_atividade_consultiva_pelo_id_tarefa(tarefa.id), true, true);
        }
        else {
            res = await this.super_get(req, this.get_atividade_pelo_id_tarefa(tarefa.id), true, true);
        }
        if (tarefa?.especieTarefa?.generoTarefa?.id === 2 && Array.isArray(res) && res.length === 0) {
            res = await this.super_get(req, this.get_atividade_pelo_id_tarefa(tarefa.id), true, true);
            if (Array.isArray(res) && res.length) {
                atividadeErrada = true;
            }
        }
        console.group(atividadeErrada ? 'TAREFA CONSULTIVA ONDE FOI LANCADA ATIVIDADE ADMINISTRATIVA' : 'ATIVIDADE RETORNADA');
        console.log(res);
        console.groupEnd();
        MFt.clear(d1);
        if (res?.especieAtividade) {
            this.exibirCampo('Atividade lançada por', res.usuario.nome, newdiv());
            this.exibirCampo('Tipo', res?.especieAtividade?.nome ? `${res.especieAtividade.nome} (${res.especieAtividade.id})` : '', newdiv());
            this.exibirCampo('Atividade ID', (res?.id).toString(), newdiv());
            if (Number.isInteger(res?.complementoConsultivo?.id)) {
                this.exibirCampo('Complemento Consultivo', res?.complementoConsultivo?.nome ? `${res?.complementoConsultivo?.nome} (${res.complementoConsultivo.id})` : '', newdiv());
            }
            this.exibirCampo('Lançada em', this.date2normal(this.valida_data_hora(res?.criadoEm), true), newdiv());
            this.exibirCampo('Encerrou a tarefa', res?.encerraTarefa ? 'SIM' : 'NÃO', newdiv());
            if (atividadeErrada) {
                this.exibirCampo('Tarefa Consultiva encerrada com atividade administrativa', 'SIM');
            }
            // ----------------------------------------------
            const divTarefaOriginal = MFt.criaElem('div', {
                style: {
                    margin: '0 0 10px 30px'
                }
            }, d1);
            const btTarefa = new MFt.bt({
                value: 'Ver tarefa original',
                width: 200,
                height: 30,
                wrapper: divTarefaOriginal,
                callback: () => {
                    this.exibir_tarefa_original(tarefa, divTarefaOriginal);
                }
            });
        }
        else {
            this.exibirCampo('', 'Nenhum registro de atividade no Super Sapiens', newdiv(), 'rgb(255, 143, 0)', true);
        }
    }

    /**
     * O objetivo desta função é descobrir qual a tarefa que foi encerrada imediatamente antes da tarefa criada que foi passada
     * De modo que o autor da tarefa passada para a função é o que encerrou a tarefa que se pretende descobrir
     * Ou seja, a tarefa desconhecida foi encerrada pelo autor imediatamente antes da tarefa que ele cricou e que é conhecida na função
     * @param tarefa
     * @param div
     */
    exibir_tarefa_original(tarefa, div) {
        if (!(div instanceof HTMLElement)) throw new Error("DIV não é elemento HTML");
        if (!Number.isInteger(tarefa?.id)) throw new Error("Tarefa.ID não é Inteiro");
        console.log(tarefa);
        // Qual a outra tarefa com data de encerramento mais próxima da data de criação da tarefa informada e encerrada pelo autor da tarefa dada?
        const aMaisProxima = (t1, t2)=>{
            // retorna a tarefa mais próxima da data de autortarefa
            if (!t1 || !t2) return t1 || t2;
            const t1Timestamp = t1?.dataHoraConclusaoPrazo ? this.valida_data_hora(t1?.dataHoraConclusaoPrazo).valueOf() : 0;
            const t2Timestamp = t2?.dataHoraConclusaoPrazo ? this.valida_data_hora(t2?.dataHoraConclusaoPrazo).valueOf() : 0;
            const timestamp = autortarefa.data.valueOf();
            return t1Timestamp - timestamp < t2Timestamp - timestamp ? t1 : t2;
        };
        const autortarefa = { // Tarefa conhecida e criada pelo autor
            id: tarefa.criadoPor.id,
            nome: tarefa.criadoPor.nome,
            data: this.valida_data_hora(tarefa.criadoEm)
        };
        console.group('Autor Tarefa Conhecida');
        console.log(autortarefa);
        console.groupEnd();
        const tarefasEncerradasPeloAutor = this.todasTarefas.filter(d=>{
            // Retorna apenas as tarefas encerradas pelo autor cuja datahora de conclusao do prazo seja inferior ao da tarefa que se conhece
            const conclusao = d?.dataHoraConclusaoPrazo ? this.valida_data_hora(d.dataHoraConclusaoPrazo) : undefined;
            const menor = conclusao instanceof Date ? conclusao.valueOf() <= autortarefa.data.valueOf() : false;
            if (d?.usuarioConclusaoPrazo?.id === autortarefa.id && conclusao && menor) return true;
        });
        let tarefaFinal = undefined;
        MFt.clear(div);
        const d1 = MFt.criaElem('div', {
            innerText: 'TAREFA ANTERIOR (por dedução)',
            style: {
                fontWeight: 'bold',
                padding: '5px',
                background: 'rgb(236, 236, 236)',
            }
        }, div);
        const d2 = MFt.criaElem('div', {

        }, div);
        if (tarefasEncerradasPeloAutor.length === 0) {
            d2.innerText = 'Não existe tarefa anterior que tenha originado a presente tarefa';
            return;
        }
        for(let tt of tarefasEncerradasPeloAutor) {
            tarefaFinal = aMaisProxima(tt, tarefaFinal);
        }
        console.group('Tarefa mais proxima encontrada');
        console.log(tarefaFinal);
        console.groupEnd();
        this.exibirTarefa(tarefaFinal, d2, false);
    }
}