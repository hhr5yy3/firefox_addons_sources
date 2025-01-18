let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Verificar NUP', MFt.$('header'));
    new Nup();
};


class Nup extends Tudo {
    constructor() {
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.tarefas_todas = [];
        this.usuario;
        this.setores_usuario = [];
        this.tabela_principal = undefined;
        this.copy_icon = new Image();
        this.copy_icon.width = 15;
        this.copy_icon.height = 15;
        this.copy_icon.onload = ()=>{
            this.init();
        };
        this.copy_icon.src = '../../../images/copy.png';
    }

    obter_usuario(cb) {
        this.sapiens_route(new Payloads().identidade(), (ds)=>{
            if (ds) {
                console.log(ds);
                for(let i = 0; i < ds.length; i++) {
                    let lotacoes = ds[i].colaborador.lotacoes;
                    let lotacoes_na_unidade = [];
                    for(let j = 0; j < lotacoes.length; j++) {
                        if (lotacoes[j].setor.unidade.id === this.id_unidade) {
                            lotacoes_na_unidade.push(lotacoes[j].setor);
                        }
                    }
                    this.setores_usuario = lotacoes_na_unidade;
                    cb();
                }
            }
            else alert('Falha com o Sapiens');
        });
    }

    init(){
        this.obter_usuario(()=>{
            this.obter_tarefas_abertas_mp(()=>{
                this.exibir_tarefas();
                // this.iniciar_atualizacao();
                this.atualizar_loop(()=>{
                    this.form_filtrar();
                });
            });
        });
    }

    iniciar_atualizacao(ta) {
        let id_coordenacao = (()=>{
            for(let i = 0; i < this.setores_usuario.length; i++) {
                if (this.setores_usuario[i].nome.indexOf('COORDENA') === 0) return this.setores_usuario[i];
            }
            return this.setores_usuario[0];
        })();
        let msg = new MsgGenerica('Obtendo dados...', 200, 70);
        this.atualizar(ta, ()=>{
            msg.msg = 'Abrindo tarefa ao arquivo para juntar documentos no SharePoint';
            this.obter_arquivo_unidade((arquivo) => {
                let setorResponsavelID = arquivo.id;
                let setorOrigemID = id_coordenacao();
                let pastaID = ta.juntada.documentoJuntado.pasta_id;
                let idTipoTarefa = 964;
                let finalPrazo = this.calcular_prazo(1);
                let obs = 'Arquivar PDF da peça jurídica no SharePoint';
                this.sapiens_route(new Payloads().criaTarefaDistAutomaticaSemTramitar(setorResponsavelID, setorOrigemID, pastaID, idTipoTarefa, finalPrazo, obs), (ds) => {
                    l.tarefa_criada = true;
                    let total = 0;
                    lista.forEach((z) => {
                        if (z.tarefa_criada) total++;
                    });
                    if (total === lista.length) {
                        msg.msg = 'Atualizando registros no MP';
                        msg.aceitaEsc = true;
                        total = 0;
                        lista.forEach((l) => {
                            this.atualizar_dados_mp(l, () => {
                                lista.forEach((z) => {
                                    if (z.mp_atualizado) total++;
                                });
                                if (total === lista.length) {
                                    msg.msg = 'Tudo feito!';
                                }
                            });
                        });
                    }
                });
            });
        });
    }

    calcular_prazo (dias){
        let hoje = new Date();
        hoje.setHours(0,0,0,0);
        return MFt.dates.addDays(hoje, dias);
    };

    obter_tarefas_abertas_mp(cb){
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_toda_distribuicao',//'obter_tarefas_abertas',
                id_unidade: this.id_unidade
            },
            callback: (dd)=>{
                if (dd && dd.ok) {
                    dd.dados.forEach((d)=>{
                        this.tarefas_todas.push({
                            tarefa: d,
                            td_nup: undefined,
                            td_conclusao: undefined,
                            td_peca: undefined,
                            td_acao: undefined
                        });
                    });
                    cb();
                }
                else if (dd && dd.erro) alert(dd.erro);
                else alert('Falha de comunicação com o MP');
            }
        });
    }

    nao_atualizado(ta) {
        // 5=nup, 1=id_tarefa, 12=data_hora_conclusao_atividade, 28=uso_futuro_1 (afastamentos)
        return ta.tarefa[5] && ta.tarefa[1] && !ta.tarefa[12] && !ta.tarefa[28];
    }

    nao_afastamento(ta) {
        // 5=nup, 28=afastamento
        return ta.tarefa[5] && !ta.tarefa[28];
    }

    exibir_tarefas(){
        let d1 = MFt.$('tarefas');
        MFt.clear(d1);
        this.tabela_principal = MFt.criaElem('table', {
            style: {
                borderCollapse: 'collapse'
            }
        }, d1);
        let tds = this.tds(['', 'NUP', 'ADVOGADO', 'ABERTURA', 'CONCLUSAO', 'PEÇA JURÍDICA', 'ORIGEM', 'AÇÃO'], MFt.criaElem('tr', null, this.tabela_principal));
        MFt.atribs(tds, {style:{fontWeight:'bold'}});
        let contador = 0;
        console.log(this.tarefas_todas);
        this.tarefas_todas.forEach((ta, i)=>{
            /*
                'rodada_distribuicao',  # 0
                'id_tarefa_criada',  # 1
                'id_tarefa_criada_especie',  # 2
                'nome_tarefa_criada',  # 3
                'rodada_distribuicao',  # 4
                'nup',  # 5
                'assunto',  # 6
                'id_setor',  # 7
                'nome_setor',  # 8
                'id_unidade',  # 9
                'nome_unidade',  # 10
                'data_hora_distribuicao',  # 11
                'data_hora_conclusao_atividade',  # 12
                'data_hora_envio_saida',  # 13
                'direcionada',  # 14
                'motivo_direcionamento',  # 15
                'prevencao',  # 16
                'retorno',  # 17
                'id_cju_origem',  # 18
                'sigla_cju_origem',  # 19
                'orgao_consulente',  # 20
                'origem_direta',  # 21
                'valor',  # 22
                'id_usuario_entrada',  # 23 id sapiens do advogado reponsável pela tarefa
                'nome_usuario_entrada'  # 24
                'id_atividade', # 25
                'id_componente_digital', # 26
                'observacao', # 27
                'uso_futuro_1' # 28 - situacoes de afastamento
             */
            if (this.nao_afastamento(ta)) {
                let tr = MFt.criaElem('tr', null, this.tabela_principal);
                tds = this.tds([
                    (++contador).toString(),
                    '',
                    ta.tarefa[24],
                    this.date2normal(MFt.dates.mysql2jsdate(ta.tarefa[11])),
                    ta.tarefa[12] ? this.date2normal(MFt.dates.mysql2jsdate(ta.tarefa[12])) : '...',
                    '',
                    ta.tarefa[19],
                    ''
                ], tr);
                ta['td_conclusao'] = tds[4];
                ta['td_peca'] = tds[5];
                ta['td_acao'] = tds[7];
                tr.onmouseenter = ()=>{
                    tr.style.backgroundColor = '#FFD';
                };
                tr.onmouseleave = ()=>{
                    tr.style.backgroundColor = 'transparent';
                };
                let td1_div = MFt.criaElem('div', {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    }
                }, tds[1]);
                MFt.criaElem('a', {
                    target: '_blank',
                    href: `../../../tela_processo.html?nup=${ta.tarefa[5]}`,
                    innerText: this.formatanup(ta.tarefa[5])
                }, td1_div);
                let copy = this.copy_icon.cloneNode(true);
                MFt.atribs(copy, {
                    style: {
                        marginLeft: '10px',
                        cursor: 'pointer'
                    }
                });
                td1_div.appendChild(copy);
                copy.onmousedown = (e)=>{
                    copy.style.transform = 'scale(0.8)';
                    e.stopPropagation();
                };
                copy.onmouseup = (e)=>{
                    copy.style.transform = 'scale(1)';
                    this.copiar_elemento(this.formatanup(ta.tarefa[5]));
                    e.stopPropagation();
                };
                copy.onclick = (e)=>{
                    e.stopPropagation();
                };
                // copy.onclick = ()=>{
                //     this.copiar_elemento(this.formatanup(ta.tarefa[5]));
                // };
                if (ta.tarefa[26]) {
                    MFt.criaElem('a', {
                        target: '_blank',
                        href: `https://sapiens.agu.gov.br/documento/${ta.tarefa[26]}`,
                        innerText: 'exibir'
                    }, tds[5]);
                }
            }
        });
    }

    atualizar_loop(cb) {
        let indice = 0;
        let pendentes = [];
        this.tarefas_todas.forEach((d)=>{
            if (this.nao_atualizado(d)) {
                pendentes.push(d);
            }
        });
        let msg = new MsgGenerica(`Verificando ${pendentes.length - indice} processos...`, 200, 50);
        let laco = ()=>{
            if (indice < pendentes.length) {
                let tarefa = pendentes[indice];
                this.atualizar(tarefa, ()=> {
                    indice++;
                    msg.msg = `Verificando ${pendentes.length - indice} processos...`;
                    laco();
                });
            }
            else {
                msg.closeWindow(msg);
                cb();
            }
        };
        laco();
    }

    atualizar(dados, cb) {
        this.obter_atividade(dados, ()=>{
            if (dados.atividades.length) {
                console.log(dados);
                this.obter_juntadas(dados.tarefa[5], dados.tarefa[23], dados.atividades[0], (juntadas)=>{
                    if (juntadas.length) {
                        if (juntadas.length > 1) {
                            for(let i = 0; i < juntadas.length; i++) {
                                if (juntadas[i].tipoDocumento && juntadas[i].tipoDocumento.nome === 'PARECER') {
                                    dados.juntada = juntadas[i];
                                    break;
                                }
                            }
                        }
                        else {
                            dados.juntada = juntadas[0];
                        }
                        if (!dados.juntada) dados.juntada = juntadas[0]; // Quando existem diversas juntadas e nenhuma delas é parecer, junta-se a primeira do dia em que foi lançada a atividade.
                    }
                    else dados.juntada = null;
                    if (dados.juntada) {
                        MFt.criaElem('a', {
                            href: dados.juntada ? `https://sapiens.agu.gov.br/documento/${dados.juntada.documentoJuntado.componentesDigitais[0].id}` : 'sem peça',
                            innerText: dados.juntada ? 'visualizar' : 'sem peça',
                            target: '_blank'
                        }, dados.td_peca);
                    }
                    if (!dados.tarefa[12]) {  // data_hora_conclusao_atividade
                        let sinc = MFt.criaElem('div', {
                            innerText: 'sinc.',
                            style: {
                                cursor: 'pointer',
                                color: 'red'
                            }
                        }, dados.td_acao);
                        sinc.onclick = ()=>{
                            let msg = new MsgGenerica('Atualizando...', 200, 50);
                            this.atualizar_dados_mp(dados, ()=>{
                                msg.msg='Atualizado!';
                                setTimeout(()=>{msg.closeWindow(msg);sinc.parentNode.removeChild(sinc);}, 1500);
                            });
                        };
                    }
                });
            }
            cb();
        });
    }

    obter_atividade(tarefa_aberta, cb) {
        let id_tarefa = tarefa_aberta.tarefa[1];
        MFt.clear(tarefa_aberta.td_conclusao);
        MFt.clear(tarefa_aberta.td_peca);
        this.sapiens_route(new Payloads().buscarAtividadePelaTarefa(id_tarefa), (ds)=>{
            if (ds) {
                // console.group(`NUP: ${this.formatanup(tarefa_aberta.dados[5])}`);
                // console.log(ds);
                // console.groupEnd();
                tarefa_aberta['atividades'] = ds;
                let tarefa_encerrada = false;
                let atividades = ds;
                for(let i = 0; i < atividades.length; i++) {
                    if (atividades[i].encerraTarefa) {
                        tarefa_aberta.atividade_final = atividades[i];
                        tarefa_encerrada = true;
                        break;
                    }
                }
                if (tarefa_encerrada) {
                    MFt.criaElem('span', {
                        innerText: this.date2normal(MFt.dates.mysql2jsdate(ds[0].dataHoraConclusao.date)),
                        style: {
                            color: 'black'
                        }
                    }, tarefa_aberta.td_conclusao);
                }
                else {
                    MFt.criaElem('span', {
                        innerText: `Atividade lançada em ${this.date2normal(MFt.dates.mysql2jsdate(ds[0].dataHoraConclusao.date))}, mas tarefa ainda aberta`,
                        style: {
                            color: 'black'
                        }
                    }, tarefa_aberta.td_conclusao);
                }

            }
            else {
                MFt.criaElem('span', {
                    innerText: 'aberta',
                    style: {
                        color: 'green'
                    }
                }, tarefa_aberta.td_conclusao);
                tarefa_aberta['atividades'] = [];
            }
            cb();
        });
    }

    /**
     * Retorna por callback as juntadas feitas pelo usuário no dia do lançamento da atividade
     * @param nup {string}
     * @param id_usuario {number}
     * @param atividade {Object}
     * @param cb {function}
     */
    obter_juntadas(nup, id_usuario, atividade, cb) {
        let id_pasta;
        this.sapiens_route(new Payloads().getIdPastaPeloNUP(nup), (ds)=>{
            if (ds) {
                id_pasta = ds[0].id;
                // console.log(`ID PASTA: ${id_pasta}`);
                this.sapiens_route(new Payloads().NUP_PastaCompleta(id_pasta), (ds)=>{
                    if (ds) {
                        this.sapiens_route(new Payloads().getJuntadas(ds[0].volumes[0].id), (ds)=>{
                            let pecas = [];
                            if (ds) {
                                // Procura por todas as juntadas feitas pelo usuário no dia do lançamento da atividade
                                let hoje_inicio = MFt.dates.mysql2jsdate(atividade.criadoEm.date).setHours(0,0,0,0);
                                let hoje_fim = MFt.dates.mysql2jsdate(atividade.criadoEm.date).setHours(23,59,59,0);
                                ds.forEach((d)=>{
                                    if (d.criadoPor_id === id_usuario) {
                                        let hora_juntada = MFt.dates.mysql2jsdate(d.criadoEm.date);
                                        if (hoje_inicio <= hora_juntada && hora_juntada <= hoje_fim) {
                                            pecas.push(d);
                                        }
                                    }
                                });
                            }
                            else alert(`Erro ao obter juntadas do NUP ${this.formatanup(nup)}`);
                            cb(pecas);
                        });
                    } else alert ('Falha ao obter volumes do NUP ' + this.formatanup(nup));
                });
            }
            else alert(`Falha na obtenção do NUP ${this.formatanup(nup)}`);
        });
    }

    /**
     * Retorna por callback o setor de arquivo da unidade
     * @param cb
     */
    obter_arquivo_unidade(cb) {
        this.sapiens_route(new Payloads().getSetores(this.id_unidade), (ds)=>{
            if (ds) {
                let arquivo;
                for(let i = 0; i < ds.length; i++) {
                    if (ds[i].nome === 'ARQUIVO') {
                        arquivo = ds[i];
                        break;
                    }
                }
                cb(arquivo);
            }
            else alert('Falha com o Sapiens');
        })
    }

    atualizar_dados_mp(dados, cb) {
        let get = {
            task: 'atualizar_distribuicao',
            id_tarefa_criada: dados.tarefa[1],
            id_componente_digital: dados.juntada.documentoJuntado.componentesDigitais[0].id,
            data_hora_conclusao_atividade: MFt.dates.date2sql(this.valida_data_hora(dados.atividade_final.dataHoraConclusao.date)),
            id_atividade: dados.atividade_final.id
        };
        console.log(get);
        MFt.xml({
            url: mp,
            get: get,
            callback: (d)=>{
                if (d && d.ok) {
                    cb();
                    dados.mp_atualizado = true;
                }
                else if (d && d.erro) alert(`${d.erro} - ${this.formatanup(dados.dados[5])}`);
                else alert('Falha com o MP')
            }
        });
    }

    form_filtrar() {
        let d1 = MFt.$('filtro');
        let trabalhando = false;
        MFt.clear(d1);
        let filtro = this.campo_texto('FILTRAR POR NOME', '', d1, 400);
        filtro.onkeydown = (e)=>{
            e.stopPropagation();
            if (e.key === 'Enter') {
                if (trabalhando) return;
                else {
                    trabalhando = true;
                    this.ocultar_tr(filtro.value.trim());
                    trabalhando = false;
                }
            }
        };
    }

    /**
     * Oculta tr que não contenha o nome indicado na td[2] ou exibe todas as trs quando não vem nome nenhum
     * @param nome
     */
    ocultar_tr(nome) {
        let trs = this.tabela_principal.getElementsByTagName('tr');
        for (let i = 1; i < trs.length; i++) {
            let tds = trs[i].getElementsByTagName('td');
            trs[i].style.display = '';
        }
        if (nome) {
            for (let i = 1; i < trs.length; i++) {
                let tds = trs[i].getElementsByTagName('td');
                let rex = new RegExp(nome, 'gi');
                let res = rex.exec(tds[2].innerText);
                if (!res) trs[i].style.display = 'none';
            }
        }
    }

}