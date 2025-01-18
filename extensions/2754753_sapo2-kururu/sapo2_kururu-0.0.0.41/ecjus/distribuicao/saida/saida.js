let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Retorno de Processos (Saída)', MFt.$('header'));
    let mov = new Movimentacao();
};

class Movimentacao extends Payloads {
    constructor() {
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.usuario = undefined;
        this.tarefas_saida = [];
        this.id_protocolo = undefined;
        this.id_arquivo = undefined;
        this.id_saida = undefined;
        this.init();
    }

    get mp_fast() {return 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router';}

    async init() {
        let msg = new MsgGenerica('Analisando dados...', 250, 50);
        this.setores_juridicos = await this.obter_setores_unidade();
        this.id_arquivo = await this.obter_id_setor('ARQUIVO');
        this.id_saida = await this.obter_id_setor('SAÍDA');
        this.id_protocolo = await this.obter_id_setor('PROTOCOLO');
        this.tarefas_saida = await this.obter_processos_saindo();
        await this.exibir_saida();
        msg.closeWindow(msg);
        this.bot();
    }

    async obter_id_setor(nome) {
        const res = await this.super_get(this.get_setores(this.id_unidade), true);
        if (!res) {
            alert('Tudo errado!');
            throw new Error('Tudo errado!');
        }
        for(let r of res) if (r?.nome === nome) return r.id;
    };

    async obter_setores_unidade() {
        const res = await this.request_mf(this.mp_fast, {
            task: 'obter_ecjus_by_id',
            id: this.id_unidade
        });
        console.log(res);
        let juridicos;
        try {
            juridicos = JSON.parse(res[0]["ids_setores_juridicos"]);
        }
        catch {}
        if (juridicos) {
            return juridicos;
        }
        else {
            alert('Dados corrompidos');
        }
    }

    obter_identidade(cb) {
        this.sapiens_route(new Payloads().identidade(), dados=>{
            if (dados) {
                this.usuario = dados[0];
                cb();
            }
            else {
                this.reiniciar_tudo(30, 'Erro ao se obter identidade no Sapiens');
            }
        });
    }

    async obter_processos_saindo() {
        const abertas = await this.super_get(this.get_tarefas(this.profile.id), true);
        if (!abertas) {
            alert('Erro ao obter tarefas abertas!');
            throw new Error('Erro ao obter tarefas abertas!');
        }
        console.log([this.id_protocolo, this.id_saida]);
        const filtradas = abertas.filter(d=>{
            console.log(d);
            // 1a condição: estar no setor SAÍDA. E só pode estar no SAÍDA se vier da própria e-CJU
            // 2a condição: estar no PROTOCOLO. Mas aí é necessário que ele tenha vindo de algum setor jurídico.
            return this.id_saida === d.setorResponsavel.id || (this.setores_juridicos.some(e=>e===d?.setorOrigem?.id) && d.setorResponsavel.id === this.id_protocolo);
        });

        return filtradas;
    }

    async exibir_saida() {
        let div_s = MFt.$('saida');
        MFt.clear(div_s);
        MFt.criaElem('div', {
            innerText: 'PROCESSO NO PROTOCOLO DE SAÍDA',
            style: {
                fontWeight: 'bold',
                fontSize: '16px',
            }
        }, div_s);
        if (this.tarefas_saida.length) {
            let tabela = MFt.criaElem('tabela', {
                style: {
                    borderCollapse: 'collapse'
                }
            }, div_s);
            this.tds(['', 'NUP', 'ORIGEM', 'ASSUNTO', 'PREVENÇÃO', ''], MFt.criaElem('tr', null, tabela));
            for(let i = 0; i < this.tarefas_saida.length; i++) {
                const t = this.tarefas_saida[i];
                console.log(t);
                let tds = this.tds([
                    (i+1).toString(),
                    '',
                    'buscando...',
                    `${t.processo.titulo}${t.processo.descricao? ' - ' + t.processo.descricao : ''}`,
                    '---',
                    ''
                ], MFt.criaElem('tr', null, tabela));
                MFt.criaElem('a', {
                    href: `../../../visualizar_nup/index.html?id_nup=${t.processo.id}`,
                    target: '_blank',
                    innerText: this.formatanup(t.processo.NUP)
                }, tds[1]);
                tds[1].style.minWidth = '150px';
                let origem = await this.descobrir_origem(t.processo.id);
                MFt.clear(tds[2]);
                if (origem.length === 0) {
                    tds[2].innerText = 'sem origem';
                    // Selecionar CJU destino
                    console.group('TAREFA');
                    console.log(t);
                    console.groupEnd();
                    this.enviar_cju(t, t.setorResponsavel_id, t.processo.id, t.processo.NUP, tds[2]);
                }
                else {
                    let unidade_origem_sigla = origem.sigla;
                    t.unidade_origem_sigla = unidade_origem_sigla;
                    t.elem_HTML = tds[5];
                    MFt.clear(tds[2]);
                    MFt.criaElem('span', {
                        innerText: `${unidade_origem_sigla}`
                    }, tds[2]);
                    t['tramitar_retorno'] = await this.descobrir_protocolo(t, origem.id, unidade_origem_sigla, tds[5]);
                    if (!t?.tramitar_retorno) {
                        console.log('ERRO AO OBTER SETOR DE ORIGEM');
                        console.log(origem);
                        // this.reiniciar_tudo(30, 'Erro ao obter setor de origem');
                    }
                    let bt_tramitar = MFt.criaElem('span', {
                        innerText: `Tramitar`,
                        style: {
                            cursor: 'pointer',
                            color: 'blue',
                            fontWeight: 'bold'
                        }
                    }, tds[5]);
                    bt_tramitar.onclick = async ()=>{
                        MFt.clear(tds[5]);
                        tds[5].innerText = 'Tramitando';
                        console.log(t);

                        let res = await this.tramitar_retorno(t);
                        tds[5].innerText = res ? 'Enviado' : 'Problema';

                    };
                }
            }
        }
        else {
            MFt.criaElem('div', {
                innerText: 'Não existem processos no protocolo de saída',
                style: {

                }
            }, div_s);
        }
    }

    async encontrar_dados_parecer(tarefa) {
        console.log(tarefa);
        const tarefas_proc = await this.super_get(this.get_tarefas_processo(tarefa.processo.id, 0, 50, 'DESC'), true);
        let tarefa_ecju = tarefas_proc.filter(d=>d?.setorResponsavel.unidade.id === this.id_unidade && d.especieTarefa.id === 131 && d.dataHoraConclusaoPrazo); // So tarefas concluidas e de Elaborar manifestacao juridico consultiva
        tarefa_ecju.sort((a,b)=>b.id-a.id); // Do fim para o comeco
        tarefa_ecju = tarefa_ecju?.length ? tarefa_ecju[0] : false;
        console.log(tarefa_ecju);
        if (!tarefa_ecju) {console.log('%cErro na tarefa_ecju!', 'color:red;'); return false;}
        let atividade = await this.super_get(this.get_atividade_pelo_id_tarefa(tarefa_ecju.id), true);
        if (Array.isArray(atividade)) {
            atividade = atividade.filter(d=>d.encerraTarefa);
            atividade = atividade.length ? atividade[0] : undefined;
        }
        if (!atividade) {console.log('%cErro na atividade!', 'color:red;'); console.log(atividade); return false;}
        let juntadas = await this.super_get(this.get_juntadas(tarefa_ecju.processo.id, 0, 'DESC', 50), true);
        juntadas.filter(d=>d.autor === tarefa_ecju.usuarioResponsavel.nome);
        if (!juntadas.length) {console.log('%cErro nas juntadas!', 'color:red;'); console.log(juntadas); return false;}
        const retorno = {
            id_tarefa_criada: tarefa_ecju.id,
            id_componente_digital: juntadas[0].documento.componentesDigitais[0].id,
            data_hora_conclusao_atividade: MFt.dates.date2sql(this.valida_data_hora(tarefa_ecju.dataHoraConclusaoPrazo)),
            id_atividade: atividade.id
        };
        console.log(retorno);
        return retorno;
    }

    /**
     * Retorna uma lista com os dados Sapiens dos advogados aptos a receberem processo em um setor
     * Nessa lista, constam ainda os dados sobre a distribuicao para eles
     * @param setor
     * @param cb
     */
    procurar_advogados_para_distribuir(setor, cb){
        let distribuicoes;
        let raw_lista_adv;
        let obter_lista_advs = (cb)=>{
            this.sapiens_route(new Payloads().getUsuariosJSON(setor), (dados)=>{
                if (dados) {
                    console.log(dados);
                    cb(dados);
                }
                else alert('Falha de comunicação com o Sapiens');
            });
        };
        let obter_advogados_aptos = (cb)=>{
            let aps = new AdvogadosAptos(raw_lista_adv, this.id_unidade, setor, (advs)=>{
                cb(advs);
            });
        };
        obter_lista_advs((lista)=>{
            raw_lista_adv = lista;
            obter_advogados_aptos((aptos)=>{
                cb(aptos);
            });
        });
    }

    selecionar_distribuir() {
        let pop = new PopUp(450, 100, null, null, (form)=>{
            let div = MFt.criaElem('div', {
                innerText: 'Aguarde...',
                style: {

                }
            }, form.div);
            this.sapiens_route(new Payloads().getSetores(this.id_unidade), (d)=>{
                if (d) {
                    let setores = [];
                    console.log(this.setores_juridicos);
                    console.log(d);
                    for(let i = 0; i < this.setores_juridicos.length; i++) {
                        for(let j = 0; j < d.length; j++) {
                            if (d[j].id === this.setores_juridicos[i]) {
                                setores.push(d[j].nome);
                            }
                        }
                    }
                    criar_form(setores); // CHAMA CRIAR_FORM -------------------
                }
                else {
                    alert('Problemas com o Sapiens');
                }
            });
            // ------------------------------------

            // ------------------------------------
            let distribuir_xml = (t, adv, rodada, setor, cb)=>{
                let data_hora_distribuicao = MFt.dates.date2sql(new Date());
                this.sapiens_route(new Payloads().criarTarefa(
                    setor,
                    t.setorResponsavel_id,
                    t.pasta.id,
                    adv.id,
                    131, // Elaborar manifestação jurídica consultiva
                    this.calcular_prazo(13),
                    '',
                    false,
                    null,
                    null,
                    'e-CJU Engenharia'
                ), (dados_sapiens)=>{
                    if (dados_sapiens) {
                        console.log(dados_sapiens);
                        MFt.clear(form.div);
                        form.div.innerText = 'Tarefa criada! Criando registro...';
                        let id_tarefa = dados_sapiens[0].id;
                        let assunto = t.descricao ? t.descricao.trim() : '---';
                        let nome_setor = (()=>{
                            for(let i = 0; i < this.setores_juridicos.length; i++) {
                                if (setor === this.setores_juridicos[i]) return this.setores_juridicos_nomes[i];
                            }
                            return '---';
                        })();
                        let dados = {
                            task:'registrar_tarefa',
                            id_tarefa_criada:id_tarefa,
                            id_tarefa_criada_especie:131,
                            nome_tarefa_criada:"ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA",
                            rodada_distribuicao:rodada,
                            nup:this.validaNUP(t.pasta.NUP),
                            assunto:assunto,
                            id_setor:setor,
                            nome_setor:nome_setor,
                            id_unidade:this.id_unidade,
                            nome_unidade:t.setorResponsavel.unidade.nome,
                            data_hora_distribuicao:data_hora_distribuicao,
                            data_hora_conclusao_atividade:null,
                            direcionada:null,
                            motivo_direcionamento:null,
                            prevencao:null,
                            retorno:null,
                            id_cju_origem:t.setorOrigem.unidade.id,
                            sigla_cju_origem:t.setorOrigem.unidade.sigla,
                            orgao_consulente:t.pasta.interessados[0].pessoa.nome,
                            origem_direta:0,
                            nome_usuario_entrada:adv.nome,
                            id_usuario_entrada:adv.id,
                            valor:this.valor_processo ? this.valor_processo : 0, // do jeito que vem no Sapiens, sem casas decimais, o valor original vem sempre multiplicado por 100
                            excluido:null
                        };
                        console.log(dados);
                        MFt.xml({
                            url: mp,
                            post: dados,
                            callback: (dados)=>{
                                console.log(dados);
                                if (dados && dados.ok) {
                                    form.div.innerText = 'Registro efetuado! Lançando atividade...';
                                    cb();
                                }
                                else if (dados && dados.erro) {
                                    this.reiniciar_tudo(30, dados.erro);
                                }
                                else {
                                    this.reiniciar_tudo(30,'Erro de comunicação com o MP');
                                }
                            }
                        });
                    }
                    else {
                        this.reiniciar_tudo(30, 'Erro de comunicacao com o Sapiens ao se criar tarefa');
                    }
                });
            };
            // ------------------------------------
            let distribuir_form = (aptos, setor)=>{
                console.log(this.tarefas_entrada);
                MFt.clear(form.div);
                /**
                 * Devolve o primeiro adv encontrado com pontuação zero na última rodada.
                 * Se não houver, cria mais uma rodada e aponta 0 para todos, retornando o primeiro da lista
                 * @returns {Object}
                 */
                let proximo = ()=>{
                    let rodada = aptos[0].rodadas.length - 1;
                    /**
                     * Retorna o primeiro adv com pontuação zero na última rodada
                     * @returns {*}
                     */
                    let pp = ()=>{
                        for(let i = 0; i < aptos.length; i++) {
                            if (aptos[i].rodadas[rodada] <= 0) return aptos[i];
                        }
                    };
                    let adv = pp();
                    if (adv) return adv;
                    else { // acrescenta mais uma rodada com zero pra todos
                        for(let i = 0; i < aptos.length; i++) {
                            aptos[i].rodadas.push(0);
                        }
                        rodada = aptos[0].rodadas.length - 1;
                        return pp();
                    }
                };
                let adv = proximo();
                // todo: A lista de advogados tem que estar completa, incluindo os afastados, no metodo this.buscar_dados_afastamento()
                let afastado = this.buscar_dados_afastamento(adv.id);
                if (afastado) { // Aqui o próximo advogado da lista está afastado e preciso registrar o afastamento dele
                    this.registrar_afastamentos.enviar_afastamentos_individual(afastado, form); // Daqui ele nao volta mais, ele recarrega a pagina
                }
                else { // Aqui o próximo advogado da lista não está afastado
                    // pop.div.style.width = '600px';
                    // pop.div.style.height = '200px';
                    let info = MFt.criaElem('div', {
                        innerText: `Criar tarefa para ${adv.nome.substr(0,35)}?`
                    }, form.div);
                    let nup_info = MFt.criaElem('div', {
                        innerText: `${this.formatanup(this.tarefas_entrada[0].pasta.NUP)}`,
                        style: {
                            cursor: 'pointer'
                        }
                    }, form.div);
                    nup_info.onclick = () => {
                        this.copiar_elemento(`${this.formatanup(this.tarefas_entrada[0].pasta.NUP)}`);
                        nup_info.innerText = 'copiado';
                        setTimeout(() => {
                            nup_info.innerText = `${this.formatanup(this.tarefas_entrada[0].pasta.NUP)}`;
                        }, 200);
                    };
                    let bt = new MFt.bt({
                        value: 'Prosseguir',
                        width: 150,
                        height: 30,
                        wrapper: MFt.criaElem('div', {}, form.div),
                        callback: () => {
                            pop.aceitaEsc = false;
                            pop.clicafora_sair = false;
                            bt.disabled = true;
                            distribuir_xml(this.tarefas_entrada[0], adv, adv.rodadas.length, setor, () => {
                                console.log('Criação da tarefa e registro ok!');
                                let t = this.tarefas_entrada[0];
                                this.sapiens_route(new Payloads().criarAtividade(
                                    2,
                                    this.id_protocolo,
                                    this.usuario.id,
                                    t.id
                                ), (d) => {
                                    if (d) {
                                        console.log('Atividade lançada!');
                                        MFt.clear(form.div);
                                        form.div.innerText = 'Tudo feito!';
                                        setTimeout(() => {
                                            location.reload();
                                        }, 1000);
                                    }
                                });
                            });
                        }
                    });
                }
            };
            // ------------------------------------
            let criar_form = setores=>{ // CRIAR FORMULÁRIO SETOR -----------------
                MFt.clear(div);
                let d1 = MFt.criaElem('div', {
                    innerText: 'Selecione o setor',
                    style: {

                    }
                }, div);
                let sel = MFt.criaSelect(setores, {}, MFt.criaElem('div', {

                }, MFt.criaElem('div', {
                    style: {
                        margin: '0 0 15px 0'
                    }
                }, div)));
                let bt = new MFt.bt({
                    value: 'Selecionar',
                    width: 100,
                    height: 30,
                    wrapper: div,
                    callback: ()=>{
                        MFt.clear(div);
                        let segundos = 0;
                        div.innerText = 'Aguarde...';
                        let setor = this.setores_juridicos[sel.selectedIndex];
                        this.lancar_afastamentos(setor, div, (cb)=>{ // TODO: ainda tenho que criar o lancamento automático dos afastamentos
                            let timer = setInterval(()=>{
                                if (segundos === 30) div.innerText = `Aguarde só mais um pouco...`;
                                else if (segundos === 60) div.innerText = `Algo errado não está certo.`;
                            }, 1000);
                            this.procurar_advogados_para_distribuir(setor, (aptos)=>{
                                clearInterval(timer);
                                div.innerText = `Quase lá...`;
                                distribuir_form(aptos, setor);
                            });
                        });
                    }
                });
            };
        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    calcular_prazo (dias){
        let hoje = new Date();
        hoje.setHours(0,0,0,0);
        return MFt.dates.addDays(hoje, dias);
    };

    /**
     * Cria uma tarefa para o protocolo da CJU de origem.
     * Cria uma tarefa para o Arquivo.
     * Lança uma atividade de tarefa feita
     * Atualiza o registro em manoelpaz
     */
    tramitar_retorno(tarefa) {
        return new Promise(rr=>{
            const prazo_dias = 1;
            const dados = tarefa.tramitar_retorno;
            let id_setor_destino = dados.id_setor_destino;
            let id_setor_origem = dados.id_setor_origem;
            let id_pasta = dados.id_pasta;
            let id_tarefa = dados.id_tarefa;
            let unidade_origem_sigla = dados.unidade_origem_sigla;
            const id_processo = dados.id_processo;
            let nup = dados.nup;
            let id_tipo_tarefa = 1144; // DEVOLVER PROCESSO ADMINISTRATIVO
            let id_tipo_tarefa_arquivo = 964; // PUBLICAR DOCUMENTO
            let id_tipo_atividade_devolucao = 1782; // PROCESSO ADMINISTRATIVO, DEVOLVIDO
            let obs_arquivo = 'Registrar cópia da peça jurídica no SharePoint';
            let final_prazo = this.calcular_prazo(prazo_dias);
            const erro = (msg, res)=>{
                console.group('RESPOSTA SUPER');
                console.log(res);
                console.groupEnd();
                alert(msg);
                rr(false);
            }
            let pop = new PopUp(300, 80, null, null, async form=> {
                // ------------ VERIFICAR SE EXISTE TRAMITACAO NAO RECEBIDA
                form.div.innerText = 'Verificando tramitações...';
                let tramitacoes = await this.super_get(this.get_tramitacoes(tarefa.processo.id), true);
                tramitacoes.sort((a,b)=>a.id - b.id);
                console.log(tramitacoes);
                const nao_recebidas = tramitacoes.filter(d=>!d.dataHoraRecebimento);
                console.log(nao_recebidas);
                let res;
                if (nao_recebidas.length > 1) { // Até onde eu sei, esta situação não pode ocorrer no Super/Sapiens
                    form.div.innerText = `Existem ${nao_recebidas.length} tramitações em aberto.`;
                    return;
                }
                if (nao_recebidas.length) { // Só recebe se o processo tem tramitações não recebidas
                    if (![this.id_saida, this.id_protocolo].some(d => d === nao_recebidas[0].setorDestino.id)) {
                        form.div.innerText = 'Existe tramitação aberta, mas não se destina a esta e-CJU. Continuando...';
                        await this.esperar(2000);
                    }
                    else {
                        form.div.innerText = 'Recebendo processo...';
                        const recebimento = await this.super_get(this.get_receber_tramitacao(nao_recebidas[0].id, nao_recebidas[0].setorDestino.id, this.profile.id));
                        console.log(recebimento);
                        form.div.innerText = 'Tornando o processo híbrido';
                        res = await this.get_atualizar_nup(tarefa.processo.NUP, {
                            modalidadeMeio: 3, // Hibrido
                            // setorAtual:id_setor_destino
                        });
                        if (!res.id) {
                            form.div.innerText = 'Erro ao tornar processo híbrido!';
                            return;
                        }
                        form.div.innerText = 'Criando tramitação à CJU de origem...';
                        res = await this.super_get(this.get_enviar_tramitacao(tarefa.processo.id, nao_recebidas[0].setorDestino.id, id_setor_destino));
                        console.log(res);
                    }
                }
                // --------------------------------------------------
                form.div.innerText = `Criando tarefa à ${unidade_origem_sigla}: ${this.formatanup(nup)}...`;
                // Tarefa de retorno
                res = await this.super_get(this.get_criar_tarefa_dist_automatica(new Date(), final_prazo, prazo_dias, id_tipo_tarefa, id_processo, id_setor_origem, id_setor_destino));
                if (!res?.id) erro('Erro ao se criar a tarefa de retorno', res);
                form.div.innerText = 'Criando tarefa de publicação...';
                // Tarefa para o arquivo sem tramitar
                res = await this.super_get(this.get_criar_tarefa_dist_automatica(new Date(), final_prazo, prazo_dias, id_tipo_tarefa_arquivo, id_processo, id_setor_origem, this.id_arquivo, obs_arquivo));
                if (!res?.id) erro('Erro ao se criar a tarefa de publicação', res);
                form.div.innerText = 'Lançando atividade...';
                res = await this.super_get(this.get_lancar_atividade(new Date(), [], id_tipo_atividade_devolucao, id_tarefa, this.profile.id));
                if (!res?.id) erro('Erro ao se lançar a atividade', res);
                form.div.innerText = 'Obtendo dados do parecer...';
                const parecer = await this.encontrar_dados_parecer(tarefa);
                // --------------------------------------------
                form.div.innerText = 'Atualizando localização do processo...';
                res = await this.get_atualizar_nup(tarefa.processo.NUP, {setorAtual: id_setor_destino});
                if (!res?.id) erro('Erro ao atualizar local do processo', res);
                // --------------------------------------------
                if (parecer) {
                    form.div.innerText = 'Atualizando MP...';
                    res = await this.atualizar_dados_mp(parecer);
                    form.div.innerText = res ? 'Tudo feito!' : 'Erro ao atualizar MP!';
                }
                else {
                    form.div.innerText = 'Sem informações sobre a peça jurídica';
                }
                await this.esperar(1500);
                pop.closeWindow(pop);
                rr(true);
            });
            pop.iniciar(pop);
        });
    }

    lancar_afastamentos(id_setor, div, cb){
        cb();
    }

    /**
     * Organiza das mais antigas para as mais novas por último
     * @param campo_nome {string}
     * @param lista {Array}
     */
    organizar_por_data(campo_nome, lista) {
        for(let i = 0; i < lista.length - 1; i++) {
            let di = this.valida_data_hora(lista[i][campo_nome].date);
            for(let j = i + 1; j < lista.length; j++) {
                let dj = this.valida_data_hora(lista[j][campo_nome].date);
                if (di > dj) {
                    let tmp = lista[j];
                    lista[j] = lista[i];
                    lista[i] = tmp;
                }
            }
        }
    }


    descobrir_dados_mp(nup, cb) {
        let id_tarefa_adv;
        let id_atividade_adv;
        let id_componente_digital;
        let data_hora_conclusao_atividade;
        let id_volume;
        let id_usuario;
        let atividade;
        let pecas_juntadas = [];
        let juntada_da_atividade;
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_distribuicao_aberta_com_nup',
                nup: this.validaNUP(nup),
                id_unidade: this.id_unidade
            },
            callback: (dd)=>{
                if (dd && dd.ok) {
                    console.log(dd);
                    if (dd.dados.length === 0) {
                        console.log(`Algo errado. Não encontrei tarefa aberta no NUP ${this.formatanup(nup)}`);
                        cb(false);
                    }
                    id_tarefa_adv = dd.dados[0][0];
                    console.log(`ID TAREFA ADV: ${id_tarefa_adv}`);
                    this.sapiens_route_completo(new Payloads().buscarAtividadePelaTarefa(id_tarefa_adv), (ds)=>{
                        if (ds.ok) {
                            for(let i = 0; i < ds.dados.length; i++) {
                                if (ds.dados[i].encerraTarefa) {
                                    id_atividade_adv = ds.dados[i].id;
                                    data_hora_conclusao_atividade = ds.dados[i].criadoEm.date;
                                    id_usuario = ds.dados[i].usuario_id;
                                    atividade = ds.dados[i];
                                    break;
                                }
                            }
                            if (!id_atividade_adv) {
                                console.log('Nenhuma atividade encerrou a tarefa');
                                cb(false);
                            }
                            else {
                                console.log(`ID ATIVIDADE: ${id_atividade_adv}`);
                                console.log(`CONCLUSAO: ${data_hora_conclusao_atividade}`);
                                console.log(`ID USUARIO: ${id_usuario}`);
                                console.log(ds.dados);
                                this.sapiens_route_completo(new Payloads().getIdPastaPeloNUP(this.validaNUP(nup)), (ds)=>{
                                    if (ds && ds.ok) {
                                        let id_pasta = ds.dados[0].id;
                                        console.log(`ID PASTA: ${id_pasta}`);
                                        this.sapiens_route_completo(new Payloads().NUP_PastaCompleta(id_pasta), (ds)=>{
                                            if (ds && ds.ok) {
                                                id_volume = ds.dados[0].volumes[0].id;
                                                this.sapiens_route_completo(new Payloads().getJuntadas(id_volume), (ds)=>{
                                                    if (ds && ds.ok) {
                                                        let hoje_inicio = MFt.dates.mysql2jsdate(atividade.criadoEm.date).setHours(0,0,0,0);
                                                        let hoje_fim = MFt.dates.mysql2jsdate(atividade.criadoEm.date).setHours(23,59,59,0);
                                                        ds.dados.forEach((d)=>{
                                                            if (d.criadoPor_id === id_usuario) {
                                                                let hora_juntada = MFt.dates.mysql2jsdate(d.criadoEm.date);
                                                                if (hoje_inicio <= hora_juntada && hora_juntada <= hoje_fim) {
                                                                    pecas_juntadas.push(d);
                                                                }
                                                            }
                                                        });
                                                        console.log('PECAS JUNTADAS PELO ADV');
                                                        console.log(pecas_juntadas);
                                                        if (pecas_juntadas.length) {
                                                            if (pecas_juntadas.length > 1) {
                                                                for(let i = 0; i < pecas_juntadas.length; i++) {
                                                                    if (pecas_juntadas[i].documentoJuntado.tipoDocumento && pecas_juntadas[i].documentoJuntado.tipoDocumento.nome === 'PARECER') {
                                                                        juntada_da_atividade = pecas_juntadas[i];
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                juntada_da_atividade = pecas_juntadas[0];
                                                            }
                                                            if (!juntada_da_atividade) juntada_da_atividade = pecas_juntadas[0];
                                                            id_componente_digital = juntada_da_atividade.documentoJuntado.componentesDigitais[0].id;
                                                            console.log(`ID COMPONENTE DIGITAL: ${id_componente_digital}`);
                                                            cb({
                                                                id_tarefa_adv: id_tarefa_adv,
                                                                id_atividade_adv: id_atividade_adv,
                                                                id_componente_digital: id_componente_digital,
                                                                data_hora_conclusao_atividade: data_hora_conclusao_atividade,
                                                            });
                                                        }
                                                        else alert(`NÃO EXISTE PEÇA JUNTADA`);
                                                    }
                                                    else {
                                                        this.reiniciar_tudo(30, 'Erro ao obter a juntadas no Sapiens');
                                                    }
                                                });
                                            }
                                            else this.reiniciar_tudo(30,'Não foi possível obter o NUP');
                                        })
                                    }
                                    else this.reiniciar_tudo(30, 'Impossível obter o NUP no Sapiens');
                                });
                            }
                        }
                        else this.reiniciar_tudo(30, 'Erro com o Sapiens');
                    });
                }
                else if (dd && dd.erro) this.reiniciar_tudo(30, dd.erro);
            }
        });
    }

    async atualizar_dados_mp(dados) {
        let get = {
            task: 'atualizar_distribuicao',
            id_tarefa_criada: dados.id_tarefa_criada,
            id_componente_digital: dados.id_componente_digital,
            data_hora_conclusao_atividade: dados.data_hora_conclusao_atividade,
            id_atividade: dados.id_atividade
        };
        const res = await this.request_mf(mp, get);
        return res;
    }

    /**
     * Recebe a tarefa que indica a prevenção do Advogado e faz a distribuição
     * @param tarefa_prevencao {Object} Tarefa que indica a prevenção do Advogado
     * @param tarefa_aberta {Object} Tarefa de distribuir processo recebida no Protocolo
     */
    distribuir_prevencao(tarefa_prevencao, tarefa_aberta) {
        let pop = new PopUp(400, 150, null, null, (form)=>{
            MFt.criaElem('div', {
                innerText: `ADVOGADO: ${tarefa_prevencao.usuarioResponsavel.nome}`,
                style: {

                }
            }, form.div);
            MFt.criaElem('div', {
                innerText: `NUP: ${this.formatanup(tarefa_prevencao.pasta.NUP)}`,
                style: {

                }
            }, form.div);
            let tipos = [
                {value: '', nome: '---'},
                {value: '', nome: 'RETORNO SIMPLES'},
                {value: '', nome: 'PREVENÇÃO'}
            ];
            let tipo_prevencao = this.criar_select('TIPO DE RETORNO', tipos, form.div);
            let bt = new MFt.bt({
                value: 'Distribuir',
                wrapper: MFt.criaElem('div', null, form.div),
                width: 120,
                height: 30,
                marginTop: '15px',
                callback: ()=>{
                    bt.disabled = true;
                    if (tipo_prevencao.selectedIndex === 0) {
                        alert('Você precisa escolher um tipo');
                        bt.disabled = false;
                        return;
                    }
                    pop.aceitaEsc = false;
                    pop.clicafora_sair = false;
                    console.log(tarefa_prevencao);
                    console.log(tarefa_prevencao.setorResponsavel.id);
                    bt.value = 'Analisando...';
                    this.procurar_advogados_para_distribuir(tarefa_prevencao.setorResponsavel.id, (advs)=>{
                        console.log(advs);
                        let prevencao = tipo_prevencao.selectedIndex === 2;
                        let retorno = tipo_prevencao.selectedIndex === 1;
                        let rodada = advs[0].rodadas.length;
                        let adv = (()=>{
                            for(let i = 0; i < advs.length; i++) {
                                if (advs[i].id === tarefa_prevencao.usuarioResponsavel_id) return advs[i];
                            }
                        })();
                        this.xml_distribuir(tarefa_prevencao, adv, rodada, tarefa_prevencao.setorResponsavel.id, retorno, prevencao,  form,()=>{
                            this.xml_lancar_atividade(tarefa_aberta, ()=>{
                                form.div.innerText = 'Tudo pronto!';
                            });
                        });
                    });
                }
            });
        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    /**
     *
     * @param t {Object} Tarefa como obtido do Sapiens
     * @param adv {Object} Advogado como obtido do Sapiens
     * @param rodada {number} Número da rodada/siclo de distribuição
     * @param setor {number} ID do Setor para onde se cria a tarefa
     * @param retorno {boolean}
     * @param prevencao {boolean}
     * @param form {HTMLElement} Formulário do PopUp
     * @param cb {function} Callback
     */
    xml_distribuir(t, adv, rodada, setor, retorno, prevencao, form, cb) {
        console.log(t);
        console.log(adv);
        console.log(rodada);
        console.log(setor);
        console.log('RETORNO:', retorno);
        console.log('PREVENÇÃO:', prevencao);
        let data_hora_distribuicao = MFt.dates.date2sql(new Date());
        this.sapiens_route(new Payloads().NUP_PastaCompleta(t.pasta.id), (ds)=>{
            if (ds) {
                console.log(ds[0]);
                let nup = ds[0];
                this.sapiens_route(new Payloads().criarTarefa(
                    setor,
                    t.setorResponsavel_id,
                    t.pasta.id,
                    adv.id,
                    131, // Elaborar manifestação jurídica consultiva
                    this.calcular_prazo(13),
                    '',
                    false,
                    null,
                    null,
                    'e-CJU Engenharia'
                ), (dados_sapiens)=>{
                    if (dados_sapiens) {
                        console.log(dados_sapiens);
                        MFt.clear(form.div);
                        form.div.innerText = 'Tarefa criada! Criando registro...';
                        let id_tarefa = dados_sapiens[0].id;
                        let assunto = t.descricao ? t.descricao.trim() : '---';
                        let nome_setor = (()=>{
                            for(let i = 0; i < this.setores_juridicos.length; i++) {
                                if (setor === this.setores_juridicos[i]) return this.setores_juridicos_nomes[i];
                            }
                            return '---';
                        })();
                        let dados = {
                            task:'registrar_tarefa',
                            id_tarefa_criada:id_tarefa,
                            id_tarefa_criada_especie:131,
                            nome_tarefa_criada:"ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA",
                            rodada_distribuicao:rodada,
                            nup:this.validaNUP(t.pasta.NUP),
                            assunto:assunto,
                            id_setor:setor,
                            nome_setor:nome_setor,
                            id_unidade:this.id_unidade,
                            nome_unidade:t.setorResponsavel.unidade.nome,
                            data_hora_distribuicao:data_hora_distribuicao,
                            data_hora_conclusao_atividade:null,
                            direcionada:null,
                            motivo_direcionamento:null,
                            prevencao:prevencao ? 1 : null,
                            retorno:retorno ? 1 : null,
                            id_cju_origem:t.setorOrigem.unidade.id,
                            sigla_cju_origem:t.setorOrigem.unidade.sigla,
                            orgao_consulente:nup.interessados[0].pessoa.nome,
                            origem_direta:0,
                            nome_usuario_entrada:adv.nome,
                            id_usuario_entrada:adv.id,
                            valor:this.valor_processo ? this.valor_processo : 0, // do jeito que vem no Sapiens, sem casas decimais, o valor original vem sempre multiplicado por 100
                            excluido:null
                        };
                        console.log(dados);
                        MFt.xml({
                            url: mp,
                            post: dados,
                            callback: (dados)=>{
                                console.log(dados);
                                if (dados && dados.ok) {
                                    form.div.innerText = 'Registro efetuado! Lançando atividade...';
                                    cb();
                                }
                                else if (dados && dados.erro) {
                                    this.reiniciar_tudo(30, dados.erro);
                                }
                                else {
                                    this.reiniciar_tudo(30, 'Erro de comunicação com o MP');
                                }
                            }
                        });
                    }
                    else {
                        form.div.innerText = 'Erro de comunicação com o Sapiens';
                    }
                });
            }
            else this.reiniciar_tudo(30,'Erro ao obter a pasta no Sapiens');
        });
    }

    /**
     * Lança uma tarefa
     * @param t {Object} Tarefa qual recebida do Sapiens
     * @param cb {function} Callback
     */
    xml_lancar_atividade(t, cb) {
        this.sapiens_route(new Payloads().criarAtividade(
            2,
            this.id_protocolo,
            this.usuario.id,
            t.id
        ), (d)=>{
            if (d) {
                cb();
            }
            else this.reiniciar_tudo(30, 'Erro ao lançar a atividade');
        });
    }

    proximo_adv(id_setor) {
        let pop = new PopUp(500, 700, null, null, form=>{
            form.div.innerText = 'Obtendo dados...';
            this.procurar_advogados_para_distribuir(this.setores_juridicos[0], advogados=>{
                MFt.clear(form.div);
                let d1 = MFt.criaElem('div', {
                    style: {
                        height: '100%',
                        overflow: 'scroll',
                        scrollBehavior: 'auto'
                    }
                }, form.div);
                MFt.criaElem('div', {
                    innerText: `CICLO: ${advogados[0].rodadas.length}`
                }, d1);
                let tabela = MFt.criaElem('table', {}, MFt.criaElem('div', null, d1));
                let tds = this.tds(['','NOME', 'PROCESSOS'], MFt.criaElem('tr', null, tabela));
                MFt.atribs(tds, {style:{textAlign:'center', fontWeight:'bold'}});
                let contador = 0;
                advogados.forEach((a)=>{
                    let campos = [
                        (++contador).toString(),
                        a.nome,
                        a.rodadas[a.rodadas.length - 1].toString()
                    ];
                    let tds = this.tds(campos, MFt.criaElem('tr', null, tabela));
                });
            });
        });
        pop.iniciar(pop);
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
    }

    form_selecionar_setor(cb) {
        if (this.setores_juridicos.length > 1) {
            let pop = new PopUp(300, 100, null, null, form => {
                let setores = (() => {
                    let ret = [];
                    for (let i = 0; i < this.setores_juridicos.length; i++) {
                        console.log(this.setores_juridicos[i]);
                        console.log(this.setores_juridicos_nomes[i]);
                        ret.push({
                            value: this.setores_juridicos[i],
                            nome: this.setores_juridicos_nomes[i]
                        });
                    }
                    return ret;
                })();

                let sel = this.criar_select('SETOR', setores, form.div);
                let bt = new MFt.bt({
                    value: 'Selecionar',
                    width: 100,
                    height: 30,
                    marginTop: '10px',
                    wrapper: MFt.criaElem('div', null, form.div),
                    callback: () => {
                        pop.closeWindow(pop);
                        cb(sel[sel.selectedIndex].value);
                    }
                });
            });
            pop.aceitaEsc = true;
            pop.iniciar(pop);
        }
        else cb(this.setores_juridicos[0]);
    }

    /**
     * Encontra a CJU de onde o processo veio
     * @returns {Array}
     * @param id_pasta
     */
    async descobrir_origem(id_pasta) {
        let tarefas = await this.super_get(this.get_tarefas_processo(id_pasta, 0, 500), true);
        tarefas.sort((a,b)=>a.id - b.id);
        const origens = tarefas.filter(d=>d.setorResponsavel.unidade.sigla.indexOf('CJU') === 0);
        console.group('TAREFAS DO PROCESSO e UNIDADE SELECIONADA');
        console.log(tarefas);
        console.log(origens[0]);
        console.groupEnd();
        return origens.length ? origens[0].setorResponsavel.unidade : [];
    }

    async descobrir_protocolo(tarefa, id_unidade, unidade_origem_sigla, elem) {
        const resp = await this.super_get(this.get_setores(id_unidade, 0, 100), true);
        if (!resp) {
            alert('Erro ao obter setores!');
            throw new Error('Erro ao obter setores!');
        }
        let pro = resp.filter(d=>d.nome === 'PROTOCOLO');
        if (pro.length) {
            pro = pro[0];
            return {
                id_setor_destino:pro.id,
                id_setor_origem:tarefa.setorResponsavel.id,
                id_pasta:tarefa.processo.id,
                id_tarefa:tarefa.id,
                unidade_origem_sigla,
                nup:tarefa.processo.NUP,
                id_processo: tarefa.processo.id,
                elem
            };
        }
        return false;
    }

    /**
     * Envio manual para uma CJU
     * @param tarefa
     * @param id_setorResponsavel
     * @param id_pasta
     * @param nup
     * @param td
     */
    async enviar_cju(tarefa, id_setorResponsavel, id_pasta, nup, td) {
        const todas_unidades = await this.super_get(this.get_unidades('consultoria juridica uniao'), true);
        console.log(todas_unidades);
        const cjus = todas_unidades.filter(d=>d.sigla.startsWith('CJU-'));
        if (!todas_unidades) return;
        td.innerText = '';
        let sel = MFt.criaElem('select', {
            style: {
                fontSize: '12px'
            }
        }, td);
        let option = MFt.criaElem('option', {
            innerText: '---'
        }, sel);
        cjus.forEach((d)=>{
            let option = MFt.criaElem('option', {
                innerText: d.sigla
            }, sel, {
                id_unidade: d.id,
                sigla_unidade: d.sigla
            });
        });
        sel.onchange = e=>{
            let sigla = sel[sel.selectedIndex].getAttribute('sigla_unidade');
            let id_unidade = parseInt(sel[sel.selectedIndex].getAttribute('id_unidade'));
            let pop = new PopUp(300, 80, null, null, form=>{
                let msg = MFt.criaElem('div', {
                    innerText: `Confirma o retorno para a ${sigla}?`
                }, form.div);
                let bt = new MFt.bt({
                    value: 'Enviar',
                    wrapper: MFt.criaElem('div', null, form.div),
                    width: 120,
                    height: 30,
                    marginTop: '10px',
                    callback: async () => {
                        sel.disabled = true;
                        bt.disabled = true;
                        pop.clicafora_sair = false;
                        pop.aceitaEsc = false;
                        msg.innerText = `Enviando para a ${sigla}...`;
                        tarefa['tramitar_retorno'] = await this.descobrir_protocolo(tarefa, id_unidade, sigla, msg);
                        console.log(tarefa);
                        pop.closeWindow(pop);
                        let res = await this.tramitar_retorno(tarefa);
                        console.log(res);
                    }
                });
            });
            pop.aceitaEsc = true;
            pop.clicafora_sair = true;
            pop.iniciar(pop);
        };
        return;
        this.sapiens_route(new Payloads().getTodasUnidades(), ds=>{
            if (ds) {
                MFt.clear(td);
                let cjus = [];
                ds.forEach((d)=>{
                    if (d.sigla.indexOf('CJU') === 0) cjus.push(d);
                });


            }
            else this.reiniciar_tudo(30,'Erro ao obter unidades no Sapiens');
        });
    }

    encontrar_protocolo(id_unidade, cb) {
        this.sapiens_route(new Payloads().getSetores(id_unidade), (ds)=>{
            if (ds) {
                console.group('SETORES DA UNIDADE DE ORIGEM');
                console.log(ds);
                console.groupEnd();
                let protocolo = {};
                for(let i = 0; i < ds.length; i++) {  // encontra o protocolo na unidade de origem
                    if (ds[i].ativo && ds[i].nome === 'PROTOCOLO') {
                        protocolo = ds[i];
                        break;
                    }
                }
                if (Object.keys(protocolo).length) {
                    cb(protocolo);
                }
                else alert('Unidade sem protocolo;')
            }
            else alert('Falha de comunicação com o Sapiens');
        });
    }

    buscar_dados_afastamento(id_adv) {
        let afastamentos = this.registrar_afastamentos.dados_afastamentos;
        for(let i = 0; i < afastamentos.length; i++) {
            if (afastamentos[i].id_usuario_entrada === id_adv) {
                return afastamentos[i];
            }
        }
    }

    bot() {
        let indice = 0;
        let tempo = 10;
        let timer;
        let retornos = [];
        const obter_retornos = ()=>{
            let ret = [];
            for(let i = 0; i < this.tarefas_saida.length; i++) {
                if (this.tarefas_saida[i].tramitar_retorno) ret.push(this.tarefas_saida[i].tramitar_retorno);
            }
            return ret;
        };
        const simular = (dados, cb)=>{
            setTimeout(()=>{
                cb();
            }, 7000);
        };
        const tramitar = (cb)=>{
            let doit = ()=>{
                retornos[indice].elem.innerText = 'Tramitando...';
                console.log(retornos[indice]);
                console.log(`Tramitando ${this.formatanup(retornos[indice].nup)} para ${retornos[indice].unidade_origem_sigla}`);
                this.tramitar_retorno(retornos[indice], ()=>{
                    retornos[indice].elem.innerText = 'Tramitado';
                    indice++;
                    if (indice < retornos.length) doit();
                    else cb();
                });
            };
            doit();
        };
        const automatizar = async ()=>{
            for(let i = 0; i < this.tarefas_saida.length; i++) {
                const t = this.tarefas_saida[i];
                t.elem_HTML.innerText = 'Tramitando...';
                let res = await this.tramitar_retorno(t);
                t.elem_HTML.innerText = res ? 'OK' : 'Erro!'
                console.log(res);
            }
            if (this.tarefas_saida.length === 0) {
                const form = new PopUp(300, 80, null, null, form=>{
                    MFt.criaElem('div', {innerText:`Sem processo para retornar.`}, form.div);
                    tempo = 60; // Tempo em segundos para recarregar a página quando não existem mais processos para serem retornados
                    timer = setInterval(()=>{
                        tempo--;
                        if (tempo < 1) {
                            clearInterval(timer);
                            location.reload();
                        }
                        MFt.clear(form.div);
                        MFt.criaElem('div', {innerText:`Sem processo para retornar.`}, form.div);
                        MFt.criaElem('div', {innerText:`Atualização da página em ${tempo} ${tempo > 1 ? 'segundos':'segundo'}.`}, form.div);
                    }, 1000);
                });
                form.iniciar(form);
                form.aceitaEsc = true;
                form.clicafora_sair = true;
            }
            else location.reload();
        };
        let pop = new PopUp(400, 80, null, null, form=>{
            let d1 = MFt.criaElem('div', null, form.div);
            d1.innerText = `Tramitação automática será ativada em ${tempo} ${tempo > 1 ? 'segundos':'segundo'}`;
            timer = setInterval(()=>{
                tempo--;
                if (tempo < 1) {
                    clearInterval(timer);
                    form.closeWindow(form);
                    automatizar();
                }
                else d1.innerText = `Tramitação automática será ativada em ${tempo} ${tempo > 1 ? 'segundos':'segundo'}`;
            }, 1000);
            new MFt.bt({
                value: 'Cancelar',
                width: 100,
                height: 30,
                marginTop: '10px',
                wrapper: MFt.criaElem('div', null, form.div),
                callback: ()=>{
                    clearInterval(timer);
                    pop.closeWindow(pop);
                }
            })
        });
        pop.iniciar(pop);
    }

    reiniciar_tudo(segundos, msg='') {
        MFt.clear(document.body);
        document.body.innerText = `${msg}! Recarregando em ${segundos}...`;
        let clock = setInterval(()=>{
            segundos--;
            document.body.innerText = `${msg}! Recarregando em ${segundos}...`;
            if (segundos <= 0) {
                clearInterval(clock);
                location.reload();
            }
        }, 1000);
    }

    async mudar_modalidade_tipo_processo(id_processo) {
        if (!Number.isInteger(id_processo)) this.erro_fatal('ID do processo precisa ser numero');
        const info = await this.super_get(this.get_processo_info(id_processo));
        if (!info) this.erro_fatal('Não foi possível obter as informações do processo');
        console.log(info);
    }
}
