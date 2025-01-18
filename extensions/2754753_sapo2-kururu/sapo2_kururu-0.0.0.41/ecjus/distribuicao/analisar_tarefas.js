class AnalisarTarefas extends Tudo {
    constructor() {
        super();
        this.nup = undefined;
        this.id_pasta = undefined;
        this.tarefas = [];
        this.advogados = [];
    }

    init(nup, cb) {
        this.nup = nup;
        this.obter_pasta(()=>{
            this.obter_tarefas(()=>{
                cb();
            });
        });
    }

    obter_pasta(cb) {
        this.sapiens_route(new Payloads().getIdPastaPeloNUP(this.nup), (dados)=>{
            if(dados) {
                this.id_pasta = dados[0].id;
                cb();
            }
            else {
                alert('Falha com o Sapiens');
            }
        });
    }

    obter_tarefas(cb) {
        this.sapiens_route(new Payloads().getTarefas(this.id_pasta), (dados)=>{
            if (dados) {
                let ret = [];
                dados.forEach((d)=>{
                    if (d.auditoriaDistribuicao) d.auditoriaDistribuicao = null;
                    ret.push(d);
                });
                this.tarefas = ret;
                cb();
            }
            else {
                alert('Falha de comunicação com o Sapiens');
            }
        });
    }

    obter_advogados(setores, cb) {
        let indice = 0;
        let ids_advs = [];
        let advs = [];
        let obter = ()=>{
            this.sapiens_route(new Payloads().usuariosSetor(setores[indice]), (dados)=>{
                if (dados) {
                    dados.forEach((d)=>{
                        if (!MFt.inArray(d.id, ids_advs)) {
                            advs.push(d);
                            ids_advs.push(d.id);
                        }
                    });
                    indice++;
                    if (indice < setores.length) obter();
                    else cb(advs);
                }
                else {
                    alert('Erro de comunicação com o Sapiens (setores)');
                }
            });
        };
        obter();
    }

    /**
     * Retorna por Callback a tarefa que indica um advogado como prevento e o tempo desde a conclusão da tarefa
     * @param id_pasta
     * @param setores_juridicos
     * @param cb
     */
    verificar_prevencao_old(id_pasta, setores_juridicos, id_unidade, cb) {
        // const afastado = (adv_id, cb) => {
        //     // this.get(new Payloads().us)
        // };
        // -----------------------------------------------
        /**
         * Retorna true if exists a lawyer from sectors
         * @param t {Object} Tarefa
         * @returns {{tarefa: *, tempo: number}}
         */
        let encontrar_adv = t=>{
            // Descobre se o adv da tarefa está em um setor jurídico e retorna o nome
            let tarefas_advs = []; // vai acumulando as tarefas que já passaram pelos advs dos setores jurídicos
            for(let i = 0; i < this.advogados.length; i++) {
                if (this.advogados[i].id === t.usuarioResponsavel_id) {
                    return true;
                }
            }
            return false;
        };
        let prevento = tarefas=>{
            console.log(tarefas);
            // Agora, procura a mais recente tarefa
            let mais_recente;
            if (tarefas.length === 1) mais_recente = tarefas[0];
            else if (tarefas.length > 1) {
                for(let i = 0; i < tarefas.length - 1; i++) {
                    let d1 = this.valida_data_hora(tarefas[i].criadoEm.date);
                    for(let j = 0; j < tarefas.length; j++) {
                        let d2 = this.valida_data_hora(tarefas[i].criadoEm.date);
                        if (d1 > d2) {
                            let tmp = tarefas[i];
                            tarefas[i] = tarefas[j];
                            tarefas[j] = tmp;
                        }
                    }
                }
                mais_recente = tarefas[tarefas.length - 1];
            }
            if (mais_recente) {
                let hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                let fim = (()=>{
                    let ret;
                    if (mais_recente.dataHoraConclusaoPrazo) {
                        ret = this.valida_data_hora(mais_recente.dataHoraConclusaoPrazo.date);
                    }
                    else {
                        ret = this.valida_data_hora(mais_recente.dataHoraFinalPrazo.date);
                    }
                    ret.setHours(0,0,0,0);
                    return ret;
                })();
                let tempo_decorrido = parseInt((hoje-fim)/(1000*24*3600));
                return {tarefa:mais_recente, tempo:tempo_decorrido};
            }
        };
        let ja_passou_na_unidade = tarefas=>{
            console.group('EXAMINANDO PASSAGEM PELA E-CJU');
            for(let i = 0; i < tarefas.length; i++) {
                console.log(`tarefas[i].setorResponsavel.unidade_id ${tarefas[i].setorResponsavel.unidade_id} - ${id_unidade}`);
                if (tarefas[i].setorResponsavel && tarefas[i].setorResponsavel.unidade_id === id_unidade && !MFt.inArray(tarefas[i].setorResponsavel.nome, ['PROTOCOLO', 'SAÍDA', 'ARQUIVO'])) {
                    console.group('TAREFA PASSOU PELA E-CJU');
                    console.log(tarefas[i]);
                    console.groupEnd();
                    console.groupEnd();
                    return {tarefa:tarefas[i], verificar:true};
                }
            }
            console.groupEnd();
            console.log('________________________________________________');
        };
        let verificar = ()=>{ // Aqui se coordena toda a pesquisa.
            this.sapiens_route(new Payloads().getTarefas(id_pasta), (dados)=>{
                if (dados) {
                    console.group(`TAREFAS - EXAMINANDO PREVENCAO ${this.formatanup(dados[0].pasta.NUP)}`);
                    console.log(dados);
                    console.groupEnd();
                    let ret = [];
                    dados.forEach((t)=>{
                        if (t.auditoriaDistribuicao) t.auditoriaDistribuicao = null;
                        if (MFt.inArray(t.setorResponsavel_id, setores_juridicos)) {
                            if (encontrar_adv(t)) ret.push(t);
                        }
                    });
                    let adv = prevento(ret);
                    if (adv) {
                        console.log(`Ha prevencao no NUP ${this.formatanup(adv.tarefa.pasta.NUP)}`);
                        console.log(adv.tarefa);
                        cb(adv);
                    }
                    else cb(ja_passou_na_unidade(dados));
                }
                else {
                    alert('Falha de comunicação com o Sapiens');
                }
            });
        };
        if (this.advogados.length === 0) {
            this.obter_advogados(setores_juridicos, (dados)=>{
                this.advogados = dados;
                verificar();
            });
        }
        else {
            verificar();
        }

    }
}