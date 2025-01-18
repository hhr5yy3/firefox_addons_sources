let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Distribuição Avulsa', MFt.$('header'));
    let da = new DistribuicaoAvulsa();
};

class DistribuicaoAvulsa extends Tudo {
    constructor() {
        super();
        this.id_unidade = MFt.urlArgs()['id_unidade'];
        this.setores_juridicos = [];
        this.analisar = undefined;
        this.cju_origem_id = undefined;
        this.cju_origem_sigla = undefined;
        this.orgao_consulente = undefined;
        this.valor_processo = undefined;
        this.nup = undefined;
        this.protocolo_id = undefined;
        this.saida_id = undefined;
        if (!this.id_unidade) {
            alert('Erro na URL');
            return;
        }
        this.obter_setores_juridicos(()=>{
            if (this.setores_juridicos.length === 0) {
                alert('É necessário escolher os setores jurídicos antes.');
                location.href = '../index_distribuicao.html';
            }
            this.form_nup();
        });
    }

    form_nup() {
        let pop = new PopUp(350, 120, null, null, (form)=>{
            let d1 = MFt.criaElem('div', {

            }, form.div);
            MFt.criaElem('div', {
                innerText: 'Este procedimento só serve para registro de tarefa já criada no Sapiens.',
                style: {
                    margin: '0 0 5px 0'
                }
            }, d1);
            let nup = this.campo_texto('NUP', '', d1, 190);
            nup.focus();
            nup.oninput = ()=>{
                let num = this.validaNUP(nup.value.trim());
                if (num) {
                    this.nup = num;
                    MFt.clear(form.div);
                    MFt.criaElem('div', {
                        innerText: 'Analisando NUP',
                        style: {

                        }
                    }, form.div);
                    this.analisar = new AnalisarTarefas();
                    this.analisar.init(num, ()=>{
                        pop.closeWindow(pop);
                        this.encontrar_origem();
                        this.obter_orgao_consulente(()=>{
                            this.exibir_tarefas();
                        });
                    });
                }
            }
        });
        pop.iniciar(pop);
    }

    depois() {
        this.tarefas = [];
        this.id_usuario = undefined;
        this.sapiens_route(new Payloads().identidade(), (dados)=>{
            if (dados) {
                this.id_usuario = dados[0].id;
                this.obter_processos((dados)=>{
                    console.log(dados);
                });
            }
            else {
                alert('Erro de comunicação com o Sapiens');
            }
        });
    }

    obter_processos(cb) {
        this.sapiens_route(new Payloads().getTarefasAbertasUsuario(this.id_usuario), (dados)=>{
            if (dados) {
                let retorno = [];
                dados.forEach((d)=>{
                    if (d.auditoriaDistribuicao) d.auditoriaDistribuicao = null;
                    if (d.especieTarefa && d.especieTarefa.id === 123) {
                        retorno.push(d);
                    }
                });
                cb(retorno);
            }
            else {
                alert('Falha de comunicação com o Sapiens!');
            }
        });
    }

    exibir_tarefas() {
        let criar_bt = (id_array, td)=>{
            let bt = MFt.criaElem('span', {
                innerText: 'registrar',
                style: {
                    color: '#999',
                    cursor: 'pointer'
                }
            }, td, {
                id_array: id_array.toString()
            });
            bt.onclick = ()=>{
                let id = parseInt(bt.getAttribute('id_array'));
                let msg = new MsgGenerica('Buscando dados...', 170, 40);
                this.buscar_tarefa(id, (dados)=>{
                    if (dados.length) {
                        msg.msg = 'Tarefa já consta no Banco de Dados';
                    }
                    else {
                        let ultima_rodada = undefined;
                        msg.closeWindow(msg);
                        MFt.xml({
                            url: mp,
                            get: {
                                task: 'obter_total_rodadas'
                            },
                            callback: dd=>{
                                ultima_rodada = dd.dados[0];
                                this.registrar_tarefa_form(id, ultima_rodada);
                            }
                        });
                    }
                });
            };
        };
        let wrapper = MFt.$('tarefas');
        MFt.clear(wrapper);
        let d1 = MFt.criaElem('div', {
            innerText: `Selecione uma das tarefas do NUP ${this.formatanup(this.nup)}`,
            style: {
                fontSize: '14px'
            }
        }, wrapper);
        let d2 = MFt.criaElem('div', {

        }, wrapper);
        let tabela = MFt.criaElem('tabela', {
            style: {
                borderCollapse: 'collapse',
                fontSize: '14px'
            }
        }, d2);
        let tds = this.tds(['', 'DATA CRIAÇÃO', 'PRAZO FINAL', 'RESPONSÁVEL', 'CONCLUÍDA', ''], MFt.criaElem('tr', null, tabela));
        this.analisar.tarefas.forEach((d, i)=>{
            let contador = 1;
            if (MFt.inArray(d.setorResponsavel_id, this.setores_juridicos)) {
                console.group('TAREFA CONSIDERADA');
                console.log(d);
                console.groupEnd();
                let campos = [
                    contador.toString(),
                    this.date2normal(this.validaData(d.dataHoraInicioPrazo.date)),
                    this.date2normal(this.validaData(d.dataHoraFinalPrazo.date)),
                    d.usuarioResponsavel.nome,
                    d.dataHoraConclusaoPrazo ? this.date2normal(this.valida_data_hora(d.dataHoraConclusaoPrazo.date)) : '',
                    ''
                ];
                tds = this.tds(campos, MFt.criaElem('tr', null, tabela));
                criar_bt(i, tds[5]);
                contador++;
            }
            else console.log(d);
        });
    }

    obter_setores_juridicos(cb){
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_ecjus_by_id',
                id: this.id_unidade
            },
            callback: (dados)=>{
                // 0=nome, 1=sigla, 2=id_unidade, 3=id_setor_saida, 4=id_setor_protocolo, 5=ids_setores_juridicos
                if (dados && dados.ok && Object.prototype.toString.call(dados.dados) === '[object Array]' && dados.dados.length) {
                    let setores;
                    try {
                        setores = JSON.parse(dados.dados[0][5]);
                    }
                    catch {

                    }
                    if (setores) {
                        this.setores_juridicos = setores;
                        this.protocolo_id = dados.dados[0][4];
                        this.saida_id = dados.dados[0][3];
                        cb();
                    }
                    else alert('Falha na comunicação com MP!');
                }
                else {
                    alert('Os setores jurídicos precisam ser definidos antes.');
                    location.href = '../index_distribuicao.html';
                }
            }
        });
    }

    buscar_tarefa(indice, cb){
        let id_tarefa = this.analisar.tarefas[indice].id;
        MFt.xml({
            url: mp,
            get: {
                task: 'buscar_tarefa_pelo_id',
                id: id_tarefa
            },
            callback: (dados)=>{
                if (dados && dados.ok) {
                    console.log(dados);
                    cb(dados.dados);
                }
                else if (dados && dados.erro) {
                    alert(dados.erro);
                }
                else {
                    alert('Falha de comunicação com MP');
                }
            }
        });
    }

    registrar_tarefa_form(id_array, ultima_rodada) {
        let pop = new PopUp(650, 420, null, null, (form)=>{
            let d1 = MFt.criaElem('div', {
                style: {

                }
            }, form.div);
            console.log(this.analisar.tarefas[id_array]);
            let assunto_texto = (()=>{
                let ret = '';
                if (this.analisar.tarefas[id_array].pasta.descricao) ret = this.analisar.tarefas[id_array].pasta.descricao.trim();
                else if (this.analisar.tarefas[id_array].pasta.titulo) ret = this.analisar.tarefas[id_array].pasta.titulo.trim();
                return ret;
            })();
            let rodada = this.campo_texto('CICLO DE DISTRIBUIÇÃO N.', ultima_rodada.toString(), d1, 40);
            let div_assunto = MFt.criaElem('div', {
                style: {
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    padding: '0 7px'
                }
            }, d1);
            let assunto = this.campo_texto('ASSUNTO', assunto_texto, div_assunto, 582, false, true, {
                height: 100
            });
            let d2 = MFt.criaElem('div', {
                style: {
                    marginTop: '10px',
                }
            }, form.div);
            let d3 = MFt.criaElem('div', {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '10px',
                    height: '90px'
                }
            }, form.div);
            let direcionada = this.campo_checkbox('Distribuição direcionada', 0, d3, null, {
                width: '200px',
                display: 'inline-block'
            });
            let motivo_direcionada = this.campo_texto('MOTIVO DIRECIONAMENTO', '', d3, 500);
            let retorno = this.campo_checkbox('Retorno', 0, d2, null, {width:'200px'});
            let prevencao = this.campo_checkbox('Prevenção', 0, d2, null, {width:'200px'});
            let salvar = new MFt.bt({
                value: 'Salvar',
                width: 70,
                height: 30,
                marginTop: '10px',
                wrapper: form.div,
                callback: ()=>{
                    if (motivo_direcionada.value.trim().length === 0 && direcionada.checked) {
                        alert('Necessário informar o motivo do direcionamento');
                    }
                    else {
                        let t = this.analisar.tarefas[id_array];
                        let dados = {
                            task:'registrar_tarefa',
                            id_tarefa_criada:t.id,
                            id_tarefa_criada_especie:t.especieTarefa_id,
                            nome_tarefa_criada:t.especieTarefa.descricao,
                            rodada_distribuicao:parseInt(rodada.value.trim()),
                            nup:this.validaNUP(this.nup),
                            assunto:assunto.value.trim(),
                            id_setor:t.setorResponsavel_id,
                            nome_setor:t.setorResponsavel.nome,
                            id_unidade:this.id_unidade,
                            nome_unidade:t.setorResponsavel.unidade.nome,
                            data_hora_distribuicao:t.dataHoraInicioPrazo ? t.dataHoraInicioPrazo.date : null,
                            data_hora_conclusao_atividade:t.dataHoraConclusaoPrazo ? t.dataHoraConclusaoPrazo.date : null,
                            direcionada:direcionada.checked ? 1 : null,
                            motivo_direcionamento:motivo_direcionada.value.trim(),
                            prevencao:prevencao.checked ? 1 : null,
                            retorno:retorno.checked ? 1 : null,
                            id_cju_origem:this.cju_origem_id,
                            sigla_cju_origem:this.cju_origem_sigla,
                            orgao_consulente:this.orgao_consulente,
                            origem_direta:0,
                            nome_usuario_entrada:t.usuarioResponsavel.nome,
                            id_usuario_entrada:t.usuarioResponsavel_id,
                            valor:this.valor_processo ? this.valor_processo : 0, // do jeito que vem no Sapiens, sem casas decimais, o valor original vem sempre multiplicado por 100
                            excluido:null
                        }
                        console.log(dados);
                        this.registrar_tarefa(dados, (d)=>{
                            MFt.clear(form.div);
                            MFt.criaElem('div', {
                                innerText: 'Registro realizado'
                            }, form.div);
                            setTimeout(()=>{
                                location.reload();
                            }, 2000);
                        });
                    }
                }
            });
            retorno.onchange = ()=>{
                if (retorno.checked) {
                    prevencao.checked = false;
                    direcionada.checked = false;
                }
            };
            prevencao.onchange = ()=>{
                if (prevencao.checked) {
                    retorno.checked = false;
                    direcionada.checked = false;
                }
            };
            direcionada.onchange = ()=>{
                if (direcionada.checked) {
                    prevencao.checked = false;
                    retorno.checked = false;
                }
            }
        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    registrar_tarefa(dados, cb) {
        MFt.xml({
            url: mp,
            post: dados,
            callback: (dados)=>{
                console.log(dados);
                if (dados && dados.ok) {
                    cb();
                }
                else if (dados && dados.erro) {
                    alert(dados.erro);
                }
                else {
                    alert('Erro de comunicação com o MP')
                }
            }
        });
    }

    encontrar_origem() {
        let ordenar = ()=>{
            for(let i = 0; i < tarefas_possiveis.length - 1; i++) {
                let d1 = this.valida_data_hora(tarefas_possiveis[i].criadoEm.date);
                for(let j = 0; j < tarefas_possiveis.length; j++) {
                    let d2 = this.valida_data_hora(tarefas_possiveis[j].criadoEm.date);
                    if (d1 > d2) {
                        let tmp = tarefas_possiveis[i];
                        tarefas_possiveis[i] = tarefas_possiveis[j];
                        tarefas_possiveis[j] = tmp;
                    }
                }
            }
        };
        let t = this.analisar.tarefas;
        let tarefas_possiveis = [];
        for(let i = 0; i < t.length; i++) {
            if (t[i].setorResponsavel_id === this.protocolo_id) {
                tarefas_possiveis.push(t[i]);
            }
        }
        if (tarefas_possiveis.length > 1) {
            ordenar();
        }
        this.cju_origem_id = tarefas_possiveis[tarefas_possiveis.length - 1].setorOrigem_id;
        this.cju_origem_sigla = tarefas_possiveis[tarefas_possiveis.length - 1].setorOrigem.unidade.sigla;
        this.valor_processo = tarefas_possiveis[tarefas_possiveis.length - 1].pasta.valorEconomico;
    }

    obter_orgao_consulente(cb) {
        let id_pasta = this.analisar.tarefas[0].pasta_id;
        this.sapiens_route(new Payloads().NUP_PastaCompleta(id_pasta), (dados)=>{
            if (dados) {
                this.orgao_consulente = dados[0].procedencia.nome;
                console.log(this.orgao_consulente);
                cb();
            }
            else {
                alert('Erro de comunicação com o Sapiens');
            }
        });
    }
}