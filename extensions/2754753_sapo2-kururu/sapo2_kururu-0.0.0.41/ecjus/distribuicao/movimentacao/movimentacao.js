let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';
const mp_c = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router';

window.onload = ()=>{
    new HeaderShow('Distribuição de Processos', MFt.$('header'));
    let mov = new Movimentacao();
};

class Movimentacao extends Payloads {
    constructor() {
        super();
        this.automatico = MFt.urlArgs()['automatico'] === 'sim';
        this.beep = new Audio('../../../images/beep.wav'); // Carrega o arquivo de audio
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.usuario = undefined;
        this.tarefas_entrada = [];
        this.tarefas_saida = [];
        this.feriados = [];
        this.advogados = [];
        this.id_protocolo = undefined;
        this.id_arquivo = undefined;
        this.id_saida = undefined;
        // ----------------------
        this.copy_icon = new Image();
        this.copy_icon.width = 15;
        this.copy_icon.height = 15;
        this.copy_icon.src = '../../../images/copy.png';
        // --
        this.registrar_afastamentos = undefined;
        this.setores_juridicos = []; // IDs dos setores juridicos
        this.setores_juridicos_nomes = []; // nomes correspondentes aos ids
        // this.analisar = new AnalisarTarefas();
        this.enviar_email_advs = undefined;
        this.usuario = undefined;
        this.id_saida = undefined;
        this.id_protocolo = undefined;
        this.tarefas_entrada = undefined;
        this.id_setores_unidade = undefined;
        this.init();
    }

    get prazo_advogado() {return 13;}

    async init() {
        // const prazo = this.calcular_prazo(5);
        // const ttt = await this.super_get(this.criar_tarefa(prazo.inicio, prazo.fim, 5, 203, 17180790, 8499, 216, 87461, 'teste observacao', 'teste_etiqueta'));
        // console.log(ttt);
        // const zzz = await this.super_get(this.obter_tarefas_pelo_id(ttt.id));
        // console.log(zzz);
        await super.init();
        await this.refresh_token();
        const setores = await this.super_get(this.get_setores(this.id_unidade), true);
        this.id_setores_unidade = setores.map(d=>d.id);
        this.enviar_email_advs = await this.enviar_email_advs_autorizados();
        this.feriados = await this.request_mf(mp_c, {task:'obter_feriados', id_unidade:this.id_unidade}, null, false);
        console.group('FERIADOS');
        console.log(this.feriados);
        console.groupEnd();
        console.log(this.enviar_email_advs);
        let msg = new MsgGenerica('Analisando dados', 250, 50);
        let tmp = await this.obter_setores_unidade();
        if (tmp) {
            this.id_saida = tmp.id_saida;
            this.id_protocolo = tmp.id_protocolo;
            this.setores_juridicos = tmp.setores_juridicos;
        }
        this.id_arquivo = await this.obter_setor_arquivo(this.id_unidade);
        this.tarefas_entrada = await this.obter_processos_entrando();
        console.log(this.tarefas_entrada);
        await this.exibir_entrada();
        msg.closeWindow(msg);
        if (this.tarefas_entrada.length) {
            this.registrar_afastamentos = new RegistrarAfastamentos(false, this.auth, this.profile);
            await this.registrar_afastamentos.init();
            this.advogados = this.registrar_afastamentos.advogados;
            this.selecionar_distribuir(); // Apresenta a janela de distribuicao
            new MFt.bt({
                value: 'Procurar prox. Adv',
                width: 150,
                height: 30,
                wrapper: MFt.$('opcoes'),
                callback: ()=>{
                    this.selecionar_distribuir();
                }
            });
            let bt2 = new MFt.bt({
                value: 'Advogados da e-CJU',
                wrapper: MFt.criaElem('div', null, MFt.$('opcoes')),
                width: 150,
                height: 30,
                marginTop: '10px',
                marginBottom: '10px',
                callback: ()=>{
                    this.form_selecionar_setor(id_setor=>{
                        this.proximo_adv(id_setor);
                    });
                }
            });
        }

        return;
        this.obter_identidade(()=>{
            this.obter_setores_unidade(()=>{
                this.obter_id_setor_arquivi(()=>{
                    this.obter_processos_entrando(()=>{
                        this.obter_processos_saindo(()=>{
                            // msg.msg = 'Verificando prevenção ou retorno';
                            this.exibir_entrada();
                            // this.exibir_saida();
                            msg.closeWindow(msg);
                            if (this.tarefas_entrada.length) this.registrar_afastamentos = new RegistrarAfastamentos(false, ()=>{this.selecionar_distribuir();});
                            console.log(this.setores_juridicos_nomes);
                            console.log(this.setores_juridicos);
                            console.log(`ID ARQUIVO: ${this.id_arquivo}`);
                            new MFt.bt({
                                value: 'Procurar prox. Adv',
                                width: 150,
                                height: 30,
                                wrapper: MFt.$('opcoes'),
                                callback: ()=>{
                                    this.selecionar_distribuir();
                                    // if (this.setores_juridicos.length > 1) {
                                    //     this.selecionar_setor();
                                    // }
                                    // else {
                                    //     this.procurar_advogados_para_distribuir(this.setores_juridicos[0], (dados)=>{
                                    //
                                    //     });
                                    // }
                                }
                            });
                            let bt2 = new MFt.bt({
                                value: 'Advogados da e-CJU',
                                wrapper: MFt.criaElem('div', null, MFt.$('opcoes')),
                                width: 150,
                                height: 30,
                                marginTop: '10px',
                                marginBottom: '10px',
                                callback: ()=>{
                                    this.form_selecionar_setor(id_setor=>{
                                        this.proximo_adv(id_setor);
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    }

    async obter_setor_arquivo(id) {
        const res = await this.super_get(this.get_setores(id), true);
        console.log(res);
        if (this.tipo(res) === '[object Array]') {
            const arquivo = res.filter(d=>d.nome==='ARQUIVO');
            if (arquivo?.length) return arquivo[0].id;
            console.log('%cSetor Arquivo não encontrado', 'color:red; font-weight: bold;');
            return false;
        }
    };

    async obter_setores_unidade() {
        return new Promise(rr=>{
            MFt.xml({
                url: mp_c,
                get: {
                    task: 'obter_ecjus_by_id',
                    id: this.id_unidade
                },
                callback: (d)=>{
                    if (d && d.ok) {
                        let juridicos;
                        try {juridicos = JSON.parse(d.dados[0][5]);}
                        catch {}
                        if (!juridicos) {
                            alert('Dados corrompidos');
                            rr(false);
                            return;
                        }
                        rr({
                            id_protocolo: d.dados[0][4],
                            id_saida: d.dados[0][3],
                            setores_juridicos: juridicos
                        });
                    }
                }
            });
        });
    }

    obter_identidade(cb) {
        this.sapiens_route(new Payloads().identidade(), (dados)=>{
            if (dados) {
                this.usuario = dados[0];
                cb();
            }
            else {
                alert('Erro de comunicação com o Sapiens');
            }
        });
    }

    async obter_processos_entrando() {
        const setores = await this.super_get(this.get_setores(this.id_unidade), true);
        let tmp = setores.filter(d=>d.nome==='PROTOCOLO');
        if (tmp?.length === 0) {
            alert('Erro ao obter os setores da Unidade');
            throw new Error('Erro ao obter os setores da Unidade');
        }
        const protocolo = tmp[0];
        tmp = await this.super_get(this.get_tarefas(null, 'administrativo'), true);
        return tmp.filter(d=>d.setorResponsavel.id===protocolo.id);
    }

    obter_processos_saindo(cb) {
        this.sapiens_route(new Payloads().getTarefasAbertasUsuario(this.usuario.id), (dados)=>{
            console.log(dados);
            let ret = [];
            if (dados) {
                dados.forEach((d)=>{
                    if (d.auditoriaDistribuicao) d.auditoriaDistribuicao = null;
                    if ((d.setorResponsavel_id === this.id_protocolo && MFt.inArray(d.setorOrigem_id, this.setores_juridicos)) || d.setorResponsavel_id === this.id_saida) {
                        // Aqui eu tenho uma tarefa aberta para o usuário do setor de protocolo que foi criado por um dos setores jurídicos ou está no setor de saída.
                        ret.push(d);
                    }
                });
            }
            this.tarefas_saida = ret;
            cb();
        });
    }

    async exibir_entrada() {
        let div_e = MFt.$('entrada');
        MFt.clear(div_e);
        MFt.criaElem('div', {
            innerText: 'PROCESSO NO PROTOCOLO DE ENTRADA',
            style: {
                fontWeight: 'bold',
                fontSize: '16px',
            }
        }, div_e);
        if (this.tarefas_entrada.length) {
            let tabela = MFt.criaElem('tabela', {
                style: {
                    borderCollapse: 'collapse'
                }
            }, div_e);
            this.tds(['#', 'NUP', 'ORIGEM', 'ASSUNTO', 'PREVENÇÃO'], MFt.criaElem('tr', null, tabela));
            let situacoes_afastamento_sapiens;
            for(let i = 0; i < this.tarefas_entrada.length; i++) {
                const t = this.tarefas_entrada[i];
                t.distribuir_manual = false;
                console.group('TAREFA');
                console.log(t);
                console.groupEnd();
                t.descricao = `${t.processo.titulo || ''}${t.processo.descricao ? ' - ' : ''}${t.processo.descricao || ''}`;
                let tds = this.tds([
                    (i+1).toString(),
                    '', // NUP
                    (t && t.setorOrigem) ? t.setorOrigem.unidade.sigla : `SAPIENS - DAR ANDAMENTO AO PROCESSO`,
                    t.descricao,
                    'aguarde...'
                ], MFt.criaElem('tr', null, tabela));
                tds[1].style.minWidth = '160px';
                // --------------- COPY
                if (true) { // Copiar número do NUP para o clipboard
                    MFt.clear(tds[1]);
                    let div_nup = MFt.criaElem('div', {
                        style: {
                            display: 'flex',
                            alignItems: 'center'
                        }
                    }, tds[1]);
                    MFt.criaElem('a', {
                        target: '_blank',
                        href: `../../../visualizar_nup/index.html?id_nup=${t.processo.id}`,
                        innerText: this.formatanup(t.processo.NUP)
                    }, div_nup);
                    let copy = this.copy_icon.cloneNode();
                    this.botao_copiar(div_nup, this.formatanup(t.processo.NUP));
                }
                if (!t.setorOrigem) {
                    console.group('SEM SETOR DE ORIGEM');
                    console.log(t);
                    console.groupEnd();
                }
                const prevencao = await this.verificar_prevencao(t.processo.id);
                if (prevencao?.tarefa && !prevencao?.verificar && prevencao?.tarefa?.dataHoraConclusaoPrazo) {
                    t.distribuir_manual = true;
                    const adv_id = prevencao.tarefa.usuarioResponsavel.id;
                    const adv_nome = prevencao.tarefa.usuarioResponsavel.nome;
                    MFt.clear(tds[4]);
                    if (!situacoes_afastamento_sapiens) situacoes_afastamento_sapiens = await this.super_get(this.get_usuarios_setor(prevencao.tarefa.setorResponsavel.id), true);
                    let situacao = situacoes_afastamento_sapiens.filter(d=>d.id === adv_id);
                    console.group(`SITUACAO - ${adv_nome}`);
                    console.log(situacao)
                    console.groupEnd();
                    let prev = MFt.criaElem('span', {
                        innerText: `${prevencao.tarefa.usuarioResponsavel.nome} ${prevencao.tempo ? ' - ' + prevencao.tempo.toString() + ' dias' : '?????????'}`,
                        style: {
                            cursor: situacao[0].isDisponivel ? 'pointer' : 'auto',
                            color: 'blue',
                            textDecoration: situacao[0].isDisponivel ? 'auto' : 'line-through'
                        }
                    }, tds[4]);
                    if (situacao[0].isDisponivel) prev.onclick = ()=>{
                        prev.style.color = '#CCC';
                        prev.onclick = null;
                        this.distribuir_prevencao(prevencao.tarefa, t, tds[4]);
                    };
                }
                else if (prevencao?.tarefa && !prevencao?.verificar && !prevencao?.tarefa?.dataHoraConclusaoPrazo) {
                    // Aqui ja existe tarefa aberta no mesmo processo para o Advogado
                    t.distribuir_manual = true;
                    const tt = prevencao.tempo <= 0 ? `Restam ainda ${Math.abs(prevencao.tempo)} dias de prazo.` : `Atraso de ${prevencao.tempo} dias.`;
                    MFt.clear(tds[4]);
                    tds[4].innerText = `Já existe tarefa aberta para ${prevencao.tarefa.usuarioResponsavel.nome}. ${tt}`
                }
                else if (prevencao?.verificar) {
                    t.distribuir_manual = true;
                    MFt.clear(tds[4]);
                    tds[4].innerText = `Possível prevenção para ${prevencao.tarefa.usuarioResponsavel.nome}`
                }
                else {
                    tds[4].innerText = 'sem prevenção';
                    tds[4].style.color = '#DDD';
                }
            }
        }
        else {
            MFt.criaElem('div', {
                innerText: 'Não existem processos no protocolo de entrada',
                style: {
                    fontSize: '16px'
                }
            }, div_e);
            const bt = new MFt.bt({
                value: 'Lista de Saldo',
                wrapper: MFt.criaElem('div', null, MFt.$('opcoes')),
                width: 150,
                height: 30,
                marginTop: '10px',
                marginBottom: '10px',
                callback: ()=>{
                    this.form_selecionar_setor(id_setor=>{
                        this.proximo_adv(id_setor);
                    });
                }
            });
            if (this.automatico) {
                const contador = MFt.criaElem('div', {
                    style: {
                        fontSize: '16px'
                    }
                }, div_e);
                for (let i = 60; i > 0; i--) {
                    contador.innerText = `Em ${i}s a página será reiniciada`;
                    await this.esperar(1000);
                }
                location.reload();
            }
        }
    }

    exibir_saida() {
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
            this.tarefas_saida.forEach((t, i) => {
                let tds = this.tds([
                    (i+1).toString(),
                    '',
                    'buscando...',
                    t.processo.descricao,
                    '---',
                    ''
                ], MFt.criaElem('tr', null, tabela));
                MFt.criaElem('a', {
                    href: `../../../tela_processo.html?nup=${t.processo.NUP}`,
                    target: '_blank',
                    innerText: this.formatanup(t.processo.NUP)
                }, tds[1]);
                this.sapiens_route(new Payloads().getTarefas(t.processo.id), (d_tarefas)=>{
                    if (d_tarefas) {
                        MFt.clear(tds[2]);
                        let origens = this.descobrir_origem(d_tarefas);
                        if (origens.length === 0 || origens.length > 1) {
                            if (origens.length === 0) {
                                tds[2].innerText = 'sem origem';
                                // todo: select CJUs
                                this.enviar_cju(t.setorResponsavel_id, t.processo.id, t.id, t.processo.NUP, tds[2]);
                            }
                            else tds[2].innerText = 'origem dupla';
                        }
                        else {
                            let unidade_origem_sigla = origens[0].setorOrigem.unidade.sigla;
                            let bt_tramitar = MFt.criaElem('span', {
                                innerText: `${unidade_origem_sigla}`,
                                style: {
                                    cursor: 'pointer',
                                    color: 'blue',
                                    fontWeight: 'bold'
                                }
                            }, tds[2]);
                            bt_tramitar.onclick = ()=>{
                                MFt.clear(tds[2]);
                                tds[2].innerText = 'Tramitando';
                                this.sapiens_route(new Payloads().getSetores(origens[0].setorOrigem.unidade_id), (ds)=>{
                                    if (ds) {
                                        console.group('SETORES DA UNIDADE DE ORIGEM');
                                        console.log(ds);
                                        console.groupEnd();
                                        for(let i = 0; i < ds.length; i++) {  // encontra o protocolo na unidade de origem
                                            if (ds[i].ativo && ds[i].nome === 'PROTOCOLO') {
                                                this.tramitar_retorno(ds[i].id, t.setorResponsavel_id, t.processo.id, t.id, unidade_origem_sigla, t.processo.NUP);
                                                break;
                                            }
                                        }
                                    }
                                    else alert('Falha de comunicação com o Sapiens');
                                });
                            };
                            MFt.criaElem('span', {
                                innerText: 'teste',

                            }, tds[5]).onclick = ()=>{
                                this.descobrir_dados_mp(t.processo.NUP, ()=>{

                                });
                            };
                        }
                    }
                    else {
                        alert(`Falha de comunicação com o Sapiens - NUP ${this.formatanup(t.processo.NUP)}`);
                    }
                });
            });
        }
        else {
            MFt.criaElem('div', {
                innerText: 'Não existem processos no protocolo de saída',
                style: {

                }
            }, div_s);
        }
    }

    /**
     * Retorna uma lista com os dados Sapiens dos advogados aptos a receberem processo em um setor
     * Nessa lista, constam ainda os dados sobre a distribuicao para eles
     * @param setor
     */
    async procurar_advogados_para_distribuir(setor) {
        let raw_lista_adv = await this.super_get(this.get_usuarios_setor(setor), true);
        console.log(raw_lista_adv);
        const advogados = new AdvogadosAptos2(raw_lista_adv, this.id_unidade, setor);
        await advogados.init();
        console.log(advogados);
        return advogados.advs;
    }

    consultar_registro_afastamento(id_adv, rodada, id_setor, cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'consultar_afastamento',
                id_usuario_entrada: id_adv,
                rodada_distribuicao: rodada,
                id_setor: id_setor
            },
            callback: (dd)=>{
                if (dd && dd.ok) {
                    cb(dd.dados);
                }
                else if (dd && dd.erro) alert(dd.erro);
                else alert('Erro desconhecido com o servidor');
            }
        })
    }

    /**
     * Cria a tarefa no Sapiens e faz o registro no MP
     * @param tarefa
     * @param adv
     * @param rodada
     * @param id_setor {Number} ID do setor para onde a tarefa vai
     * @param form {PopUp}
     * @param obs
     * @param retorno
     * @param prevencao
     */
    async distribuir_xml (tarefa, adv, rodada, id_setor, form, obs, retorno, prevencao) {
        // let data_hora_distribuicao = MFt.dates.date2sql(new Date());
        if (!form instanceof PopUp) throw new Error('Form não é instância de PopUp');
        if (typeof obs === 'string') obs = obs.trim();
        obs = obs || null;
        const prazo = this.calcular_prazo_2(this.prazo_advogado, this.feriados);
        let res = await this.super_get(this.criar_tarefa(
            prazo.inicio,
            prazo.fim,
            this.prazo_advogado,
            131, // Elaborar manifestação jurídica consultiva
            tarefa.processo.id,
            adv.id,
            tarefa.setorResponsavel.id,
            id_setor,
            obs
        ));
        console.log(res);
        // ------------------------------------------
        MFt.clear(form.div);
        form.div.innerText = 'Tarefa criada! Criando registro...';
        let id_tarefa = res.id;
        let assunto = tarefa.descricao ? tarefa.descricao.trim() : '---';
        console.log(this.setores_juridicos_nomes);
        let nome_setor = (()=>{
            for(let i = 0; i < this.setores_juridicos.length; i++) {
                if (id_setor === this.setores_juridicos[i]) return this.setores_juridicos_nomes[i];
            }
            return '---';
        })();
        let dados = {
            task:'registrar_tarefa',
            id_tarefa_criada:id_tarefa,
            id_tarefa_criada_especie:131,
            nome_tarefa_criada:"ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA",
            rodada_distribuicao:rodada,
            nup:this.validaNUP(tarefa.processo.NUP),
            assunto:this.ascii_mf(assunto),
            id_setor,
            nome_setor:nome_setor,
            id_unidade:this.id_unidade,
            nome_unidade:this.ascii_mf(tarefa.setorResponsavel.unidade.nome),
            data_hora_distribuicao:res.dataHoraDistribuicao.replace('T', ' '),
            data_hora_conclusao_atividade:null,
            direcionada:null,
            motivo_direcionamento:null,
            prevencao: prevencao ? 1 : null,
            retorno: retorno ? 1 : null,
            id_cju_origem:tarefa.setorOrigem.unidade.id,
            sigla_cju_origem:tarefa.setorOrigem.unidade.sigla,
            orgao_consulente:'---', // TODO: IMPLEMENTAR DEPOIS this.ascii_mf(tarefa.processo.interessados[0].pessoa.nome),
            origem_direta:0,
            nome_usuario_entrada:adv.nome,
            id_usuario_entrada:adv.id,
            valor: tarefa.processo.valorEconomico ? parseInt(tarefa.processo.valorEconomico * 100) : 0, // no Sapiens o valor eh sem o digito, no Super eh float
            excluido:null
        };
        console.log(dados);
        res = await this.request_mf(mp, dados);
        console.log(res);
        return res;
    };

    selecionar_distribuir() {
        const ascii_mf = s=>{
            const a = 'áàâãéêíóõôúüçÁÀÂÃÉÊÍÓÕÚÜÇ';
            const b = 'aaaaeeiooouucAAAAEEIOOUUC';
            for(let i = 0; i < a.length; i++) {
                const r = new RegExp(a[i], 'g');
                while (s.search(r) >= 0) s = s.replace(a[i], b[i]);
            }
            return s;
        };
        let pop = new PopUp(410, 400, null, null, async form=>{
            let div = MFt.criaElem('div', {
                innerText: 'Aguarde...',
                style: {

                }
            }, form.div);
            let tmp = await this.super_get(this.get_setores(this.id_unidade), true);
            const setores = (()=>{ // Este valor é usado mais em baixo em criar_form() que inicia o formulário
                let ret = [];
                for(let t of tmp) {
                    if (this.setores_juridicos.some(d=>d===tmp.id)) ret.push(t.nome);
                }
                return ret;
            })();
            // ------------------------------------
            let distribuir_form = async (aptos, setor) => {
                console.log(aptos);
                // console.log(this.tarefas_entrada);
                MFt.clear(form.div);
                /**
                 * Devolve o primeiro adv encontrado com pontuação zero na última rodada.
                 * Se não houver, cria mais uma rodada e subtrai 1 da pontuacao de todos, retornando o primeiro da lista
                 * @returns {Object}
                 */
                let proximo = async (cb) => {
                    let rodada = aptos[0].rodadas.length - 1;
                    /**
                     * Retorna o primeiro adv com pontuação zero na última rodada
                     * @returns {*}
                     */
                    let pp = async () => {
                        for (let i = 0; i < aptos.length; i++) {
                            let afastado = this.buscar_dados_afastamento(aptos[i].id);
                            console.log('%cAFASTADO ----------------------', afastado ? 'color:red;' : 'color:black;', aptos[i].nome, !(!afastado));
                            if (afastado && !aptos[i].afastamento_na_rodada_registrado) { // Aqui o próximo advogado da lista está afastado e preciso registrar o afastamento dele
                                afastado.id_unidade = this.id_unidade;
                                afastado.id_setor = setor;
                                const res = await this.super_get(this.get_unidade_pelo_id(setor), true);
                                afastado.nome_setor = res[0].nome;
                                console.log(afastado);
                                this.registrar_afastamentos.enviar_afastamentos_individual(afastado, form); // Daqui ele nao volta mais, ele recarrega a pagina
                                return false;
                            }
                            if (aptos[i].rodadas[rodada] <= 0 && !afastado) {
                                return aptos[i];
                            } else if (afastado) aptos[i].rodadas[rodada] = 1;
                        }
                    };
                    let adv = await pp();
                    console.log(adv);
                    if (adv) return adv;
                    else if (adv === false) return; // quando ele retorna exatamente o false eh porque houve a necessidade de registrar um afastamento
                    else { // acrescenta mais uma rodada com zero pra todos
                        for (let i = 0; i < aptos.length; i++) {
                            aptos[i].rodadas.push(aptos[i].rodadas[aptos[i].rodadas.length - 1] - 1); // Aqui faz a subtracao
                        }
                        rodada = aptos[0].rodadas.length - 1; // necessario antes de chamar o pp()
                        return pp();
                    }
                };

                console.log('==========================================');
                console.log(aptos);
                console.log('==========================================');
                let adv = await proximo(); // ENCONTRA O PROXIMO ADVOGADO
                if (!adv) {
                    console.log('proximo() encontrou um adv afastado que nao tem registro de afastamento.');
                    return;
                }
                let afastado = this.buscar_dados_afastamento(adv.id);
                if (afastado && !adv.afastamento_na_rodada_registrado) { // Aqui o próximo advogado da lista está afastado e preciso registrar o afastamento dele
                    this.registrar_afastamentos.enviar_afastamentos_individual(afastado, form); // Daqui ele nao volta mais, ele recarrega a pagina
                } else { // Aqui o próximo advogado da lista não está afastado
                    // pop.div.style.width = '600px';
                    // pop.div.style.height = '200px';
                    this.beep.play();
                    if (this.tarefas_entrada.length === 0) {
                        form.closeWindow(form);
                        return;
                    }
                    let info = MFt.criaElem('div', {
                        innerText: `Criar tarefa para ${adv.nome.substr(0, 35)}?`
                    }, form.div);
                    let nup_info = MFt.criaElem('div', {}, form.div);
                    MFt.criaElem('a', {
                        innerText: `NUP: ${this.formatanup(this.tarefas_entrada[0].processo.NUP)}`,
                        href: `/visualizar_nup/index.html?id_nup=${this.tarefas_entrada[0].processo.id}`,
                        target: '_blank',
                        style: {
                            cursor: 'pointer'
                        }
                    }, nup_info);
                    const copy = this.copy_icon.cloneNode();
                    nup_info.appendChild(copy);
                    MFt.atribs(copy, {
                        style: {
                            cursor: 'pointer',
                            margin: '0 0 0 10px'
                        }
                    });
                    const assunto_texto = `${this.tarefas_entrada[0].processo.titulo || ''}${this.tarefas_entrada[0].processo.descricao ? ' - ' : ''}${this.tarefas_entrada[0].processo.descricao || ''}`;
                    let obs = this.campo_texto('OBSERVAÇÃO', this.tarefas_entrada[0].observacao || '', form.div, 400);
                    let etiqueta = this.campo_texto('ETIQUETA', this.tarefas_entrada[0].postIt || '', form.div, 400, true);
                    let assunto = this.campo_texto('ASSUNTO', assunto_texto, form.div, 400, false, true, {
                        height: '97px',
                        style: {
                            border: '1px solid #CCC',
                            borderRadius: '6px'
                        }
                    });
                    obs.onblur = () => {
                        obs.value = obs.value.trim()
                    };
                    etiqueta.onblur = () => {
                        etiqueta.value = etiqueta.value.trim()
                    };
                    copy.onmousedown = () => {
                        copy.style.transform = 'scale(0.8)';
                    };
                    copy.onmouseup = () => {
                        this.copiar_elemento(`${this.formatanup(this.tarefas_entrada[0].processo.NUP)}`);
                        copy.style.transform = 'scale(1)';
                    };
                    let bt = new MFt.bt({
                        value: 'Prosseguir',
                        width: 150,
                        height: 30,
                        wrapper: MFt.criaElem('div', {}, form.div),
                        callback: async () => {
                            pop.aceitaEsc = false;
                            pop.clicafora_sair = false;
                            bt.disabled = true;
                            const tarefa = this.tarefas_entrada[0];
                            const nup = tarefa.processo.NUP;
                            const email = adv.email; // 'manoel.paz@agu.gov.br';
                            const titulo_nup = tarefa.processo.titulo;
                            const desc_nup = tarefa.processo.descricao;
                            this.tarefas_entrada[0].descricao = assunto.value.trim();
                            console.log(tarefa);
                            console.log(adv);
                            console.log(adv?.rodadas?.length);
                            console.log(setor);
                            console.log(obs.value);
                            let res = await this.distribuir_xml(tarefa, adv, adv.rodadas.length, setor, form, obs.value.trim());
                            if (!res) {
                                form.div.innerText = 'Problema ao se criar a tarefa e o registro dela no MP';
                                throw new Error('Problema ao se criar a tarefa e o registro dela no MP');
                            }
                            res = await this.super_get(this.lancar_atividade(new Date(), [], 2, tarefa.id, this.profile.id));
                            if (!res) {
                                form.div.innerText = 'Problema ao se lançar a atividade';
                                throw new Error('Problema ao se lançar a atividade');
                            }
                            console.log('Atividade lançada!');
                            if (this.enviar_email_advs.some(d => d === adv.id)) {
                                form.div.innerText = 'Atividade Criada... Enviando e-mail...';
                                const interessados = await this.super_get(this.get_processo_interessados(tarefa.processo.id), true);
                                if (Array.isArray(interessados)) {
                                    console.log(interessados);
                                    const orgao = interessados.map(d=>d.pessoa.nome).join('; ');
                                    let res = await this.enviar_email(nup, email, titulo_nup, desc_nup, '', obs.value, orgao, 'Original', this.calcular_prazo_2(this.prazo_advogado, this.feriados).fim);
                                    form.div.innerText = 'Email enviado... Tudo feito!';
                                }
                            } else {
                                form.div.innerText = 'Não há instrução para e-mail... Tudo feito!';
                            }
                            await this.esperar(2000);
                            location.reload();
                        }
                    });
                    // Prazo final da distribuição sem prevenção
                    MFt.criaElem('div', {
                        innerText: `Prazo: ${this.date2normal(this.calcular_prazo(this.prazo_advogado, this.feriados).inicio)} a ${this.date2normal(this.calcular_prazo(this.prazo_advogado, this.feriados).fim)}`,
                        style: {
                            fontSize: '14px',
                            margin: '10px 0 0 0'
                        }
                    }, form.div);
                    if (this.automatico && !this.tarefas_entrada[0].distribuir_manual) {
                        obs.value = '';
                        etiqueta.value = '';
                        bt.bt.dispatchEvent(new Event('mouseup'));
                    }
                }
            };
            // ------------------------------------
            let criar_form = async setores=>{ // CRIAR FORMULÁRIO SETOR -----------------
                if (setores.length > 1) {
                    MFt.clear(div);
                    let d1 = MFt.criaElem('div', {
                        innerText: 'Selecione o setor',
                        style: {}
                    }, div);
                    let sel = MFt.criaSelect(setores, {}, MFt.criaElem('div', {}, MFt.criaElem('div', {
                        style: {
                            margin: '0 0 15px 0'
                        }
                    }, div)));
                    let bt = new MFt.bt({
                        value: 'Selecionar',
                        width: 100,
                        height: 30,
                        wrapper: div,
                        callback: () => {
                            MFt.clear(div);
                            let segundos = 0;
                            div.innerText = 'Aguarde...';
                            let setor = this.setores_juridicos[sel.selectedIndex];
                            this.lancar_afastamentos(setor, div, (cb) => { // TODO: ???
                                let timer = setInterval(() => {
                                    if (segundos === 30) div.innerText = `Aguarde só mais um pouco...`;
                                    else if (segundos === 60) div.innerText = `Algo errado não está certo.`;
                                    segundos++;
                                }, 1000);
                                distribuir_form(this.advogados, setor);

                            });
                        }
                    });
                }
                else {
                    let setor = this.setores_juridicos[0];
                    let segundos = 0;
                    let timer = setInterval(() => {
                        if (segundos === 30) div.innerText = `Aguarde só mais um pouco...`;
                        else if (segundos === 60) div.innerText = `Algo errado não está certo.`;
                        segundos++;
                    }, 1000);
                    this.advogados = await this.incluir_info_afastamento_rodada(this.advogados, setor);
                    clearInterval(timer);
                    console.log(this.advogados);
                    distribuir_form(this.advogados, setor);
                }
            };
            // ------------------------------------

            // ------------------------------------
            criar_form(setores);
        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    async incluir_info_afastamento_rodada(aptos, id_setor) {
        const rodada = aptos[0].rodadas.length;
        const dd = await this.request_mf(mp, {
            task: 'consultar_afastamento_lote',
            ids_usuarios: JSON.stringify(aptos.map(d=>d.id)),
            id_setor: id_setor,
            rodada_distribuicao: rodada
        });
        for (let i = 0; i < aptos.length; i++) {
            aptos[i].afastamento_na_rodada_registrado = !(!dd[0][aptos[i].id].length);
        }
        return aptos;
        // return new Promise(async rr=>{
        //     let rodada = aptos[0].rodadas.length;
        //
        //     this.xml_associado(mp, 'consultar_afastamento_lote', {
        //         ids_usuarios: JSON.stringify(aptos.map(d=>d.id)),
        //         id_setor: id_setor,
        //         rodada_distribuicao: rodada
        //     }, dd => {
        //         for (let i = 0; i < aptos.length; i++) {
        //             aptos[i].afastamento_na_rodada_registrado = !(!dd[0][aptos[i].id].length);
        //         }
        //         cb(aptos);
        //     });
        // });
    }

    /**
     * Cria uma tarefa para o protocolo da CJU de origem.
     * Cria uma tarefa para o Arquivo.
     * Lança uma atividade de tarefa feita
     * Atualiza o registro em manoelpaz
     */
    tramitar_retorno(id_setor_destino, id_setor_origem, id_pasta, id_tarefa, unidade_origem_sigla, nup) {
        let id_tipo_tarefa = 1144; // DEVOLVER PROCESSO ADMINISTRATIVO
        let id_tipo_tarefa_arquivo = 964; // PUBLICAR DOCUMENTO
        let id_tipo_atividade_devolucao = 1782; // PROCESSO ADMINISTRATIVO, DEVOLVIDO
        let obs_arquivo = 'Registrar cópia da peça jurídica no SharePoint';
        let final_prazo = this.calcular_prazo(1, new Date(), this.feriados);
        let pop = new PopUp(200, 80, null, null, (form)=>{
            let atualizar_paz = ()=>{

            };
            form.div.innerText = `Criando tarefa à ${unidade_origem_sigla}...`;
            // SAPIENS ----------------------------------
            this.sapiens_route_completo(new Payloads().criaTarefaDistAutomatica(id_setor_destino, id_setor_origem, id_pasta, id_tipo_tarefa, final_prazo), (res)=>{
                if (!res) {
                    alert('Erro com o Sapiens (1)');
                    console.log(res);
                    return;
                }
                if (res && res.erro) {
                    if (res.erro[0].processo.index('já se encontra em Tramitação') < 0) {
                        alert('Erro não esperado no Sapiens');
                        console.log(res);
                        return;
                    }
                }
                form.div.innerText = 'Criando tarefa para o arquivo...';
                // SAPIENS ----------------------------------
                console.log(this.id_arquivo);
                console.log(id_setor_origem);
                console.log(id_pasta);
                console.log(id_tipo_tarefa_arquivo);
                console.log(final_prazo);
                console.log(obs_arquivo);
                this.sapiens_route(new Payloads().criaTarefaDistAutomaticaSemTramitar(this.id_arquivo, id_setor_origem, id_pasta, id_tipo_tarefa_arquivo, final_prazo, obs_arquivo), (res)=>{
                    if (!res) {
                        alert('Erro com o Sapiens (2)');
                        console.log(res);
                        return;
                    }
                    form.div.innerText = 'Lançando a atividade...';
                    // SAPIENS ----------------------------------
                    this.sapiens_route(new Payloads().criarAtividade(id_tipo_atividade_devolucao, id_setor_origem, this.usuario.id, id_tarefa), (res)=>{
                        if (!res) {
                            alert('Erro com o Sapiens (3)');
                            console.log(res);
                            return;
                        }
                        form.div.innerText = 'Atualizando registro no servidor';
                        this.descobrir_dados_mp(nup, (dados)=>{
                            this.atualizar_dados_mp(dados, ()=>{
                                form.div.innerText = 'Feito!';
                                setTimeout(()=>{
                                    pop.closeWindow(pop);
                                    location.reload();
                                }, 1500);
                            });
                        });
                    });
                });
            });
        });
        pop.iniciar(pop);
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
                        alert(`Algo errado. Não encontrei tarefa aberta no NUP ${this.formatanup(nup)}`);
                        return;
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
                            if (!id_atividade_adv) alert('Nenhuma atividade encerrou a tarefa');
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
                                                    else alert('Erro ao obter a juntadas no Sapiens');
                                                });
                                            }
                                            else alert('Não foi possível obter o NUP');
                                        })
                                    }
                                    else alert('Impossível obter o NUP no Sapiens');
                                });
                            }
                        }
                        else alert('Erro com o Sapiens');
                    });
                }
                else if (dd && dd.erro) alert(dd.erro);
            }
        });
    }

    atualizar_dados_mp(dados, cb) {
        let get = {
            task: 'atualizar_distribuicao',
            id_tarefa_criada: dados.id_tarefa_adv,
            id_componente_digital: dados.id_componente_digital,
            data_hora_conclusao_atividade: dados.data_hora_conclusao_atividade,
            id_atividade: dados.id_atividade_adv
        };
        console.log(get);
        MFt.xml({
            url: mp,
            get: get,
            callback: (d)=>{
                if (d && d.ok) {
                    cb();
                    // dados.mp_atualizado = true;
                }
                else if (d && d.erro) alert(`${d.erro} - ${this.formatanup(dados.dados[5])}`);
                else alert('Falha com o MP')
            }
        });
    }

    /**
     * Recebe a tarefa que indica a prevenção do Advogado e faz a distribuição
     * @param tarefa_prevencao {Object} Tarefa que indica a prevenção do Advogado
     * @param tarefa_aberta {Object} Tarefa de distribuir processo recebida no Protocolo
     * @param elem {HTMLElement}
     */
    distribuir_prevencao(tarefa_prevencao, tarefa_aberta, elem) {
        console.log(tarefa_aberta);
        let pop = new PopUp(400, 330, null, null, (form)=>{
            MFt.criaElem('div', {
                innerText: `ADVOGADO: ${tarefa_prevencao.usuarioResponsavel.nome.length > 30 ? tarefa_prevencao.usuarioResponsavel.nome.substr(0,30) + '...':tarefa_prevencao.usuarioResponsavel.nome}`,
                style: {
                    fontSize: '14px'
                }
            }, form.div);
            let div_nup = MFt.criaElem('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                }
            }, form.div);
            MFt.criaElem('a', {
                innerText: `NUP: ${this.formatanup(tarefa_prevencao.processo.NUP)}`,
                href: `../../../visualizar_nup/index.html?id_nup=${tarefa_prevencao.processo.id}`,
                target: '_blank',
                style: {

                }
            }, div_nup);
            this.botao_copiar(div_nup, this.formatanup(tarefa_prevencao.processo.NUP));
            let tipos = [
                {value: '', nome: '---'},
                {value: 'Retorno simples', nome: 'RETORNO SIMPLES'},
                {value: 'Prevenção', nome: 'PREVENÇÃO'}
            ];
            let tipo_prevencao = this.criar_select('TIPO DE RETORNO', tipos, form.div);
            let campo_obs = this.campo_texto('Observação', tarefa_aberta.observacao || '', form.div);
            let campo_etiqueta = this.campo_texto('Etiqueta', tarefa_aberta.postIt || '', form.div);
            MFt.criaElem('div', {
                innerText: `Prazo: ${this.date2normal(this.calcular_prazo_2(this.prazo_advogado, this.feriados).inicio)} a ${this.date2normal(this.calcular_prazo_2(this.prazo_advogado, this.feriados).fim)}`,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }, form.div);
            let bt = new MFt.bt({
                value: 'Distribuir',
                wrapper: MFt.criaElem('div', null, form.div),
                width: 120,
                height: 30,
                marginTop: '15px',
                callback: async ()=>{
                    bt.disabled = true;
                    if (tipo_prevencao.selectedIndex === 0) {
                        alert('Você precisa escolher um tipo');
                        bt.disabled = false;
                        return;
                    }
                    pop.aceitaEsc = false;
                    pop.clicafora_sair = false;
                    console.log(tarefa_prevencao);
                    const setor = tarefa_prevencao.setorResponsavel.id;
                    const nup = tarefa_prevencao.processo.NUP;
                    const titulo_nup = tarefa_prevencao.processo.titulo;
                    const desc_nup = tarefa_prevencao.processo.descricao;
                    console.log(`SETOR: ${setor}`);
                    bt.value = 'Analisando...';
                    campo_obs.disabled = true;
                    campo_etiqueta.disabled = true;
                    tipo_prevencao.disabled = true;
                    // let advs = await this.super_get(this.get_usuarios_setor(setor), true);
                    let advs = await this.procurar_advogados_para_distribuir(setor);
                    let prevencao = tipo_prevencao.selectedIndex === 2;
                    let retorno = tipo_prevencao.selectedIndex === 1;
                    let rodada = advs[0].rodadas.length; // TODO: codigo incongruente, advs nao contem rodadas
                    console.log(advs);
                    console.log(tarefa_prevencao);
                    let adv = (()=>{
                        for(let i = 0; i < advs.length; i++) if (advs[i].id === tarefa_prevencao.usuarioResponsavel.id) return advs[i];
                    })();
                    console.log(tarefa_prevencao);
                    console.log(advs);
                    console.log(rodada);
                    console.log(adv);
                    console.log(tarefa_aberta);
                    console.log(`Setor: ${setor}`);
                    let res = await this.distribuir_xml(tarefa_aberta, adv, adv.rodadas.length, setor, form, campo_obs.value.trim(), retorno, prevencao);
                    console.log(res);
                    if (!res) {
                        form.div.innerText = 'Problema ao se criar a tarefa';
                        throw new Error('Problema ao se criar a tarefa');
                    }
                    form.div.innerText = 'Registro efetuado! Lançando atividade...';
                    console.log(tarefa_aberta.id);
                    res = await this.super_get(this.lancar_atividade(new Date(), [], 2, tarefa_aberta.id, this.profile.id));
                    if (!res) {
                        form.div.innerText = 'Problema ao se lançar a atividade';
                        throw new Error('Problema ao se lançar a atividade');
                    }
                    console.log('Atividade lançada!');
                    if (this.enviar_email_advs.some(d=>d===adv.id)) {
                        form.div.innerText = 'Atividade Criada... Enviando e-mail...';
                        const interessados = await this.super_get(this.get_processo_interessados(tarefa_prevencao.processo.id), true);
                        if (Array.isArray(interessados)) {
                            const prevencao = tipo_prevencao[tipo_prevencao.selectedIndex].value;
                            console.log(interessados);
                            console.log(tipo_prevencao[tipo_prevencao.selectedIndex].value);
                            const orgao = interessados.map(d=>d.pessoa.nome).join('; ');
                            let res = await this.enviar_email(nup, adv.email, titulo_nup, desc_nup, '', campo_obs.value.trim(), orgao, prevencao, this.calcular_prazo_2(this.prazo_advogado, this.feriados).fim);
                            form.div.innerText = 'Email enviado... Tudo feito!';
                        }
                    }
                    else {
                        form.div.innerText = 'Não há instrução para e-mail... Tudo feito!';
                    }
                    await this.esperar(2000);
                    MFt.clear(form.div);
                    const reiniciar = new MFt.bt({
                        value: 'Próxima distribuição automática',
                        width: 250,
                        height: 30,
                        marginBottom: '15px',
                        wrapper: MFt.criaElem('div', null, form.div),
                        callback: ()=>{
                            location.reload();
                        }
                    });
                    const fechar = new MFt.bt({
                        value: 'Apenas fechar esta janela',
                        width: 250,
                        height: 30,
                        marginBottom: '15px',
                        wrapper: MFt.criaElem('div', null, form.div),
                        callback: ()=>{
                            form.closeWindow(form);
                        }
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
    xml_distribuir(t, adv, rodada, setor, retorno, prevencao, observacao, etiqueta, form, cb) {
        console.log(t);
        console.log(adv);
        console.log(rodada);
        console.log(setor);
        console.log('RETORNO:', retorno);
        console.log('PREVENÇÃO:', prevencao);
        let data_hora_distribuicao = MFt.dates.date2sql(new Date());
        this.sapiens_route(new Payloads().NUP_PastaCompleta(t.processo.id), (ds)=>{
            if (ds) {
                console.log(ds[0]);
                let nup = ds[0];
                this.sapiens_route(new Payloads().criarTarefa(
                    setor,
                    t.setorResponsavel_id,
                    t.processo.id,
                    adv.id,
                    131, // Elaborar manifestação jurídica consultiva
                    this.calcular_prazo(this.prazo_advogado, new Date(), this.feriados),
                    observacao,
                    false,
                    null,
                    null,
                    etiqueta
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
                        console.group('TAREFA');
                        console.log(t);
                        console.groupEnd();
                        let dados = {
                            task:'registrar_tarefa',
                            id_tarefa_criada:id_tarefa,
                            id_tarefa_criada_especie:131,
                            nome_tarefa_criada:"ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA",
                            rodada_distribuicao:rodada,
                            nup:this.validaNUP(t.processo.NUP),
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
                                    alert(dados.erro);
                                }
                                else {
                                    alert('Erro de comunicação com o MP');
                                }
                            }
                        });
                    }
                    else {
                        form.div.innerText = 'Erro de comunicação com o Sapiens';
                    }
                });
            }
            else alert('Erro ao obter a pasta no Sapiens');
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
            else alert('Erro ao lançar a atividade');
        });
    }

    proximo_adv(id_setor) {
        let pop = new PopUp(500, 400, null, null, async form=>{
            form.div.innerText = 'Obtendo dados...';
            const advogados = await this.procurar_advogados_para_distribuir(this.setores_juridicos[0]);
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
     * @param tarefas
     * @returns {Array}
     */
    descobrir_origem(tarefas) {
        this.organizar_por_data('criadoEm', tarefas);
        let origens = [];
        for(let i = 0; i < tarefas.length; i++) {
            tarefas[i].auditoriaDistribuicao = null;
            if (tarefas[i].setorOrigem) {
                if (tarefas[i].setorOrigem.unidade.sigla.indexOf('CJU') === 0) {
                    origens.push(tarefas[i]);
                    break;
                }
            }
            else if (tarefas.setorResponsavel) {
                if (tarefas[i].setorResponsavel.unidade.sigla.indexOf('CJU') === 0) {
                    origens.push(tarefas[i]);
                    break;
                }
            }
        }
        console.group(`TAREFAS NUP: ${this.formatanup(tarefas[0].processo.NUP)}`);
        console.log(tarefas);
        console.groupEnd();
        console.group(`TAREFA SELECIONADA - NUP: ${this.formatanup(tarefas[0].processo.NUP)}`);
        console.log(origens);
        console.groupEnd();
        return origens;
    }

    enviar_cju(id_setorResponsavel, id_pasta, id_tarefa, nup, td) {
        this.sapiens_route(new Payloads().getTodasUnidades(), ds=>{
            if (ds) {
                MFt.clear(td);
                let cjus = [];
                ds.forEach((d)=>{
                    if (d.sigla.indexOf('CJU') === 0) cjus.push(d);
                });
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
                    let id_unidade = sel[sel.selectedIndex].getAttribute('id_unidade');
                    let pop = new PopUp(300, 80, null, null, form=>{
                        let msg = MFt.criaElem('div', {
                            innerText: `Confirma o retorno para a ${sigla} (${id_unidade})?`
                        }, form.div);
                        let bt = new MFt.bt({
                            value: 'Enviar',
                            wrapper: MFt.criaElem('div', null, form.div),
                            width: 120,
                            height: 30,
                            marginTop: '10px',
                            callback: ()=>{
                                bt.disabled = true;
                                pop.clicafora_sair = false;
                                pop.aceitaEsc = false;
                                msg.innerText = `Enviando para a ${sigla}...`;
                                this.encontrar_protocolo(id_unidade, protocolo=>{
                                    console.log(protocolo);
                                    pop.closeWindow(pop);
                                    this.tramitar_retorno(protocolo.id, id_setorResponsavel, id_pasta, id_tarefa, sigla, nup);
                                });
                            }
                        });
                    });
                    pop.aceitaEsc = true;
                    pop.clicafora_sair = true;
                    pop.iniciar(pop);
                };
            }
            else alert('Erro ao obter unidades no Sapiens');
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

    botao_copiar(elem, texto) {
        let copy = this.copy_icon.cloneNode();
        MFt.atribs(copy, {
            style: {
                marginLeft: '10px',
                cursor: 'pointer'
            }
        });
        elem.appendChild(copy);
        copy.onmousedown = (e) => {
            copy.style.transform = 'scale(0.8)';
            e.stopPropagation();
        };
        copy.onmouseup = (e) => {
            copy.style.transform = 'scale(1)';
            this.copiar_elemento(texto);
            e.stopPropagation();
        };
        copy.onclick = (e) => {
            e.stopPropagation();
        };
    }

    /**
     *
     * @param nup {String}
     * @param email {String}
     * @param titulo_nup {String}
     * @param desc_nup {String}
     * @param etiqueta {String}
     * @param obs {String}
     * @param orgao {String}
     * @param tipo_distribuicao {String}
     * @param prazo_final {Date}
     * @return {Promise<any>}
     */
    enviar_email(nup, email, titulo_nup, desc_nup, etiqueta, obs, orgao, tipo_distribuicao, prazo_final) {
        return new Promise(ret=>{
            let texto = `Este e-mail não deve ser respondido.\nTrata-se da comunicação da distribuição do Processo ${this.formatanup(nup)} no Sistema Sapiens.\nTítulo Sapiens: ${titulo_nup?titulo_nup:''}\nDescrição Sapiens: ${desc_nup?desc_nup:''}\n`;
            let html = `<html lang="pt-BR"><body><p><b>Este e-mail não deve ser respondido</b>.</p><p>Trata-se da comunicação da distribuição do Processo <b>${this.formatanup(nup)}</b> no Sistema Sapiens.</p><p>Título Sapiens: ${titulo_nup?titulo_nup:''}</p><p>Descrição Sapiens: ${desc_nup?desc_nup:''}</p>`;
            if (orgao) {
                html += `<p>Órgão: ${orgao}</p>`;
                texto += `Órgão: ${orgao}\n`;
            }
            if (etiqueta) {
                html += `<p>Etiqueta Sapiens: ${etiqueta}</p>`;
                texto += `Etiqueta Sapiens: ${etiqueta}\n`;
            }
            if (obs) {
                html += `<p>Observação Sapiens: ${obs}</p>`;
                texto += `Observação Sapiens: ${obs}\n`;
            }
            if (tipo_distribuicao) {
                html += `<p>Tipo de distribuição: ${tipo_distribuicao}</p>`;
                texto += `Tipo de distribuição: ${tipo_distribuicao}\n`;
            }
            if (prazo_final instanceof Date){
                html += `<p>Prazo: ${this.date2normal(prazo_final)}, calculado com base na Lei n. 9.784, de 1999.</p>`;
                texto += `Prazo: ${this.date2normal(prazo_final)}, calculado com base na Lei n. 9.784, de 1999\n`;
            }
            html += '<br/><p>Atenciosamente,</p><br/><p>Manoel Paz</p></body></html>';
            texto += '\nAtenciosamente,\nManoel Paz';
            let xml = MFt.xml({
                url: 'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/router.py',
                get: {
                    task: 'enviar_email',
                    subject: `Distribuição Processual - NUP ${this.formatanup(nup)}`,
                    dest: email,
                    texto: texto,
                    html: html
                },
                callback: dd=>{
                    console.log(dd);
                    if (dd && dd.ok) {
                        ret(dd);
                    }
                    else return false;
                },
                onError: er=>{
                    console.log(er);
                    ret(false);
                }
            });
        });
    }

    enviar_email_advs_autorizados() {
        return new Promise(ret=>{
            MFt.xml({
                url: mp_c,//'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/router.py',
                get: {
                    task: 'autorizados_email_tarefa',
                },
                callback: dd=>{
                    if (dd && dd.ok) {
                        ret(dd.dados);
                    }
                    else {
                        console.log('ERRO EM ADVOGADOS AUTORIZADOS A RECEBER EMAIL');
                        console.log(dd);
                        ret(false);
                    }
                },
                onError: er=>{
                    console.log('ERRO EM ADVOGADOS AUTORIZADOS A RECEBER EMAIL');
                    console.log(er);
                    ret(false);
                }
            });
        });
    }

    async obter_advogados() {
        let advs = [];
        for(let id of this.setores_juridicos) {
            let tmp = await this.super_get(this.get_usuarios_setor(id), true);
            if (this.tipo(tmp) === '[object Array]') for(let t of tmp) if (!advs.some(d=>d.id===t.id)) advs.push(t);
        }
        return advs;
    }

    async verificar_prevencao(id_processo, advogados) {
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
                tarefas.sort((a,b)=>this.valida_data_hora(a.criadoEm) - this.valida_data_hora(b.criadoEm));
                mais_recente = tarefas[tarefas.length - 1];
            }
            if (mais_recente) {
                let hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                let fim = (()=>{
                    let ret;
                    if (mais_recente.dataHoraConclusaoPrazo) {
                        ret = this.valida_data_hora(mais_recente.dataHoraConclusaoPrazo);
                    }
                    else {
                        ret = this.valida_data_hora(mais_recente.dataHoraFinalPrazo);
                    }
                    ret.setHours(0,0,0,0);
                    return ret;
                })();
                let tempo_decorrido = parseInt((hoje-fim)/(1000*24*3600));
                return {tarefa:mais_recente, tempo:tempo_decorrido};
            }
        };
        let ja_passou_na_unidade = async tarefas=>{
            console.group('EXAMINANDO PASSAGEM PELA E-CJU');
            for(let t of tarefas) {
                if (this.id_setores_unidade.some(d=>d===t.setorResponsavel.id) && !['PROTOCOLO', 'SAÍDA', 'ARQUIVO'].some(d=>t.setorResponsavel.nome===d)) {
                    console.group('TAREFA PASSOU PELA E-CJU');
                    console.log(t);
                    console.groupEnd();
                    console.groupEnd();
                    return {tarefa:t, verificar:true};
                }
            }
            console.groupEnd();
            console.log('________________________________________________');
            return false;
        };
        let verificar = async ()=>{ // Aqui se coordena toda a pesquisa.
            let ret = [];
            let tarefas = [];
            let offset = 0;
            do {
                let tmp = await this.super_get(this.get_tarefas_processo(id_processo, offset));
                if (this.tipo(tmp?.entities) === '[object Array]') {
                    tarefas = tarefas.concat(tmp.entities);
                    offset += tmp.entities.length;
                }
                else {
                    alert('Erro ao obter tarefas');
                    console.log(tmp);
                    throw new Error('Erro ao obter tarefas');
                }
            } while (tarefas.length < tmp.total);
            for(let t of tarefas) if (this.setores_juridicos.some(d=>d === t.setorResponsavel.id) && this.advogados.some(d=>d.id===t.usuarioResponsavel.id)) ret.push(t);
            let adv = prevento(ret);
            if (adv) {
                console.log(`Ha prevencao no NUP ${this.formatanup(adv.tarefa.processo.NUP)}`);
                console.log(adv.tarefa);
                return adv;
            }
            else return ja_passou_na_unidade(tarefas);
        };
        // ----------------------------------------------------------------------------
        // ----------------------------------------------------------------------------
        // ----------------------------------------------------------------------------
        if (this.advogados.length === 0) {
            this.advogados = await this.obter_advogados();
            return verificar();
        }
        else {
            return verificar();
        }
    }

    ascii_mf(s) {
        const a = 'áàâãéêíóôõúüçÁÀÂÃÉÊÍÓÕÚÜÇ';
        const b = 'aaaaeeiooouucAAAAEEIOOUUC';
        for(let i = 0; i < a.length; i++) {
            const r = new RegExp(a[i], 'g');
            while (s.search(r) >= 0) s = s.replace(a[i], b[i]);
        }
        return s;
    }
}
