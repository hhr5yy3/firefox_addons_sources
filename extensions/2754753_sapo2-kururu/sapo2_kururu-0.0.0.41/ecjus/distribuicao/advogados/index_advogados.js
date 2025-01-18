let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    if (!MFt.urlArgs().id) {
        alert('Erro!');
    }
    else {
        new Advogados();
    }
};

class Advogados extends Tudo {
    constructor() {
        super();
        this.ecju = {};
        this.setores = [];
        this.advogados = [];
        this.id_unidade = MFt.urlArgs()['id'];
        this.id_setor = undefined;
        this.obter_dados_iniciais(()=>{
            this.obter_advogados(()=>{
                MFt.$('mensagem').innerText = 'Obtendo afastamentos...';
                this.obter_afastamentos_sapiens(()=>{
                    this.obter_afastamentos_mp(()=>{
                        this.obter_info_advs_mp(()=>{
                            this.show_advs();
                            this.show_afastamentos();
                        });
                    })
                });
            });
        });
    }

    obter_afastamentos_sapiens(cb) {
        let indice = 0;
        let obter = ()=>{
            this.sapiens_route(new Payloads().afastamentos(this.advogados[indice].colaborador_id), (dados)=>{
                if (dados) {
                    this.advogados[indice].afastamentos_sapiens = dados;
                }
                else {
                    console.log(`${this.advogados[indice].nome.trim()} sem registros de afastamentos no Sapiens.`);
                    this.advogados[indice].afastamentos_sapiens = [];
                }
                indice++;
                if (indice < this.advogados.length) obter();
                else {
                    console.log(this.advogados);
                    cb();
                }
            });
        };
        obter();
    }

    obter_afastamentos_mp(cb) {
        let indice = 0;
        let obter = ()=>{
            MFt.xml({
                url: mp,
                get: {
                    task: 'obter_afastamentos',
                    id_usuario: this.advogados[indice].id
                },
                callback: (dados)=>{
                    // 0=rowid, 1=id_usuario, 2=inicio, 3=fim, 4=motivo, 5=indeterminado, 6=obs
                    if (dados && dados.dados) {
                        this.advogados[indice]['afastamentos'] = dados.dados; // tudo vai para this.advogados
                        indice++;
                        if (indice < this.advogados.length) {
                            obter();
                        }
                        else cb(true);
                    }
                    else if (dados && dados.erro) {
                        alert(dados.erro);
                    }
                    else {
                        alert('Falha de comunicação');
                    }
                }
            });
        };
        obter();
    }

    obter_dados_iniciais(cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_ecjus_by_id',
                id: MFt.urlArgs()['id']
            },
            callback: (d1)=>{
                if (d1 && d1.ok) {
                    if (d1.dados.length) {
                        this.ecju = {
                            nome: d1.dados[0][0],
                            sigla: d1.dados[0][1],
                            id_unidade: d1.dados[0][2],
                            id_setor_saida: d1.dados[0][3],
                            id_setor_protocolo: d1.dados[0][4],
                            ids_setores_juridicos: d1.dados[0][5]
                        };
                        try {
                            this.ecju.ids_setores_juridicos = JSON.parse(this.ecju.ids_setores_juridicos);
                        }
                        catch (e) {

                        }
                    }
                    if (this.ecju.ids_setores_juridicos && this.ecju.ids_setores_juridicos.length) {
                        this.sapiens_route(new Payloads().getUnidadeID(this.ecju.id_unidade), (dados)=> {
                            if (dados && Object.prototype.toString.call(dados) === '[object Array]' && dados.length) {
                                new HeaderShow(`Advogados da ${dados[0].sigla}`, MFt.$('header'));
                                this.sapiens_route(new Payloads().getSetores(this.ecju.id_unidade), (dados)=>{
                                    if (dados && dados.length) {
                                        dados.forEach((d) => {
                                            if (MFt.inArray(d.id, this.ecju.ids_setores_juridicos)) {
                                                this.setores.push(d);
                                            }
                                        });
                                        cb();
                                    }
                                    else {
                                        alert('Não existem setores na unidade ou falha de comunicação com o Sapiens.');
                                    }
                                });
                            }
                            else {
                                alert('Erro! Recarregue.');
                            }
                        });
                    }
                    else {
                        let msg = new MsgGenerica('Primeiro é necessário indicar os setores jurídicos', 200, 60);
                        setTimeout(()=>{
                            msg.closeWindow(msg);
                            location.href = `../ecju/index_ecju.html?id=${MFt.urlArgs().id}`
                        }, 2500);
                    }
                }
            }
        });
    }

    obter_advogados(cb) {
        let setores_completos = 0;
        let indice = 0;
        let lista_ids_advs = [];
        let obter = ()=>{
            let id_setor = this.setores[indice].id;
            this.id_setor = id_setor;
            this.sapiens_route(new Payloads().getUsuariosJSON(id_setor), (dados)=>{
                console.log(dados);
                if (dados && dados.length) {
                    dados.forEach((d)=>{
                        d['id_setor'] = id_setor;
                        this.advogados.push(d);
                        if (MFt.inArray(d.id, lista_ids_advs)) {
                            alert(`Um mesmo advogado não pode estar em dois setores de distribuição.\nProcesso encerrado.\n${d.nome}`);
                            location.href = '../index_distribuicao.html';
                        }
                        lista_ids_advs.push(d.id);
                    });
                    console.log(this.advogados);
                    indice++;
                    if (indice < this.setores.length) obter();
                    else cb();
                }
                else if (dados && dados.length === 0) {
                    cb();
                }
                else {
                    alert('Problemas de comunicação com o Sapiens.');
                }
            });
        };
        obter();
    }

    obter_info_advs_mp(cb) {
        let indice = 0;
        let span_msg = MFt.criaElem('span', null, MFt.$('mensagem'));
        let get_adv_mp = i=>{
            MFt.xml({
                url: mp,
                get: {
                    task: 'obter_advogado_by_id',
                    id_usuario: this.advogados[i].id
                },
                callback: (info) => {
                    if (info && info.ok) {
                        if (info.dados.length) {
                            this.advogados[i]['id_cidade'] = info.dados[3];
                            this.advogados[i]['id_setor'] = this.id_setor; // Se um adv estiver em duas e-CJUs diferentes da problema pegar do info.dados
                            this.advogados[i]['id_unidade'] = this.id_unidade; // Se um adv estiver em duas e-CJUs diferentes da problema pegar do info.dados
                            this.advogados[i]['credito_processual'] = info.dados[6];
                            this.advogados[i]['percentual_carga'] = info.dados[7];
                            passo();
                        }
                        else {
                            this.salvar_advogado(
                                this.advogados[i].id,
                                this.advogados[i].colaborador_id,
                                null,
                                this.advogados[i].id_setor,
                                this.id_unidade,
                                0,
                                100,
                                this.advogados[i].nome,
                                passo
                            );
                            this.advogados[i]['credito_processual'] = 0;
                            this.advogados[i]['percentual_carga'] = 100;
                        }
                    }
                    else if (info && info.erro) {
                        throw new Error(info.erro);
                    }
                    else throw new Error('Erro desconhecido em get_adv_mp');
                }
            });
        };
        let passo = ()=>{
            span_msg.innerText = `(${this.advogados.length - indice})`;
            if (indice < this.advogados.length) {
                get_adv_mp(indice++);
            }
            else {
                cb(true);
            }
        };
        passo();
    }

    salvar_advogado(id_usuario, id_colaborador, id_cidade, id_setor, id_unidade, credito_processual, percentual_carga, nome, cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'inserir_advogado',
                id_usuario: id_usuario,
                id_colaborador: id_colaborador,
                id_cidade: id_cidade,
                id_setor: id_setor,
                id_unidade: id_unidade,
                credito_processual: credito_processual,
                percentual_carga: percentual_carga,
                nome: nome
            },
            callback: (dados)=>{
                if (dados && dados.ok) {
                    cb(true);
                }
                else {
                    if (dados && dados.erro) {
                        alert(dados.erro);
                    }
                    else {
                        alert('Erro desconhecido.');
                    }
                }
            }
        });
    }

    show_advs() {
        let setores = (()=>{
            let sets = [];
            let sets_completo = [];
            for(let i = 0; i < this.advogados.length; i++) {
                if (!MFt.inArray(this.advogados[i].id_setor, sets)) {
                    let nome_setor = (()=>{
                        for(let j = 0; j < this.setores.length; j++) {
                            if (this.setores[j].id === this.advogados[i].id_setor) return this.setores[j].nome;
                        }
                    })();
                    sets.push(this.advogados[i].id_setor);
                    sets_completo.push({nome:nome_setor, id:this.advogados[i].id_setor});
                }
            }
            return sets_completo;
        })();
        let d1 = MFt.$('advogados');
        MFt.clear(d1);
        MFt.clear(MFt.$('mensagem'));
        for(let i = 0; i < setores.length; i++) {
            MFt.criaElem('span', {
                innerText: setores[i].nome,
                style: {

                }
            }, MFt.criaElem('div', {
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            }, d1));
            let tabela = MFt.criaElem('table', {
                style: {
                    borderCollapse: 'collapse'
                }
            }, d1);
            let campos = ['', 'NOME', 'AFASTAMENTO', 'PROCS', 'CARGA'];
            let tds = this.tds(campos, MFt.criaElem('tr',{},tabela));
            MFt.atribs(tds, {
                style: {
                    padding: '0 10px',
                    fontWeight: 'bold'
                }
            });
            let contador = 0;
            for(let j = 0; j < this.advogados.length; j++) {
                console.log(this.advogados[j]);
                if (this.advogados[j].id_setor === setores[i].id) {
                    campos = [
                        (++contador).toString(),
                        '',
                        '---',
                        `${this.advogados[j].credito_processual}`,
                        `${this.advogados[j].percentual_carga}%`
                    ];
                    tds = this.tds(campos, MFt.criaElem('tr', {}, tabela));
                    MFt.criaElem('a', {
                        innerText: this.advogados[j].nome,
                        href: `editar_advogado.html?id_adv=${this.advogados[j].id}&id_setor=${this.advogados[j].id_setor}&id_unidade=${this.advogados[j].id_unidade}`,
                        target: '_blank'
                    }, tds[1]);
                    MFt.atribs(tds, {
                        style: {
                            textAlign: 'center',
                            padding: '0 7px'
                        }
                    });
                    tds[1].style.textAlign = 'left';
                    this.analisar_afastamento(this.advogados[j], tds[2]);
                }
            }
        }
    }

    analisar_afastamento(advogado, td) {
        let analisar_caso = ()=>{
            let afs = advogado.afastamentos;
            for(let i = 0; i < afs.length; i++) {
                if (afs[i][5]) { // situação de prazo indeterminado
                    td.innerText = 'Sim (Extra)';
                    return;
                }
            }
            let hoje = new Date();
            hoje.setHours(0,0,0,0);
            for(let i = 0; i < afs.length; i++) {
                if (afs[i][2] && afs[i][3]) {
                    let inicio = MFt.dates.mysql2jsdate(afs[i][2]);
                    let fim = MFt.dates.mysql2jsdate(afs[i][3]);
                    if (inicio && fim) {
                        if (inicio <= hoje && fim >= hoje) {
                            td.innerText = 'Sim (Extra)';
                            break;
                        }
                    }
                }
            }
        };
        if (advogado.estaAfastado) {
            td.innerText = 'SIM (Sapiens)';
        }
        else {
            analisar_caso();
        }
    }

    show_afastamentos() {
        let lista = [];
        let advogados = this.advogados;
        console.log(advogados);
        for(let i = 0; i < advogados.length; i++) {
            let adv = advogados[i];
            if (adv.estaAfastado) {  // Sapiens
                let afss = advogados[i].afastamentos_sapiens;
                // console.log(afss.length);
                let hoje = new Date();
                hoje.setHours(0,0,0,0);
                for(let j = 0; j < afss.length; j++) {
                    let inicio = this.validaData(afss[j].dataInicio.date.split(' ')[0]);
                    let fim = this.validaData(afss[j].dataFim.date.split(' ')[0]);
                    let inicio_bloqueio = this.validaData(afss[j].dataInicioBloqueio.date.split(' ')[0]);
                    let fim_bloqueio = this.validaData(afss[j].dataFimBloqueio.date.split(' ')[0]);
                    // console.group('AFASTS');
                    // console.log(inicio);
                    // console.log(fim);
                    // console.log(inicio_bloqueio);
                    // console.log(fim_bloqueio);
                    // console.groupEnd();
                    if (inicio <= hoje && fim >= hoje) {
                        lista.push({
                            id_usuario: adv.id,
                            nome: adv.nome,
                            id_setor: adv.id_setor,
                            id_unidade: adv.id_unidade,
                            inicio: this.date2normal(inicio),
                            fim: this.date2normal(fim),
                            motivo: `Sapiens ${afss[j]['modalidadeAfastamento']['descricao']} - ${this.date2normal(inicio)} a ${this.date2normal(fim)}`,
                            permanente: false,
                            uso_futuro_1: 1  // 1=Sapiens
                        });
                    }
                    else if (inicio_bloqueio <= hoje && fim_bloqueio >= hoje) {
                        lista.push({
                            id_usuario: adv.id,
                            nome: adv.nome,
                            id_setor: adv.id_setor,
                            id_unidade: adv.id_unidade,
                            inicio: this.date2normal(inicio_bloqueio),
                            fim: this.date2normal(fim_bloqueio),
                            motivo: `Sapiens ${afss[j]['modalidadeAfastamento']['descricao']} (bloqueio) - ${this.date2normal(inicio_bloqueio)} a ${this.date2normal(fim_bloqueio)}`,
                            permanente: false,
                            uso_futuro_1: 1  // 1=Sapiens
                        });
                    }
                }
            }
            else {  // Nao Sapiens
                let afs = adv.afastamentos;
                let indeterminado = false;
                for(let j = 0; j < afs.length; j++) {
                    if (afs[j][5]) { // situação de prazo indeterminado
                        indeterminado = true;
                        lista.push({
                            id_usuario: adv.id,
                            nome: adv.nome,
                            id_setor: adv.id_setor,
                            id_unidade: adv.id_unidade,
                            inicio: undefined,
                            fim: undefined,
                            permanente: true,
                            motivo: afs[j][4],
                            uso_futuro_1: 8  // 8=Outros
                        });
                    }
                }
                if (!indeterminado) {
                    let hoje = new Date();
                    hoje.setHours(0, 0, 0, 0);
                    for (let j = 0; j < afs.length; j++) {
                        if (afs[j][2] && afs[j][3]) {
                            let inicio = MFt.dates.mysql2jsdate(afs[j][2]);
                            let fim = MFt.dates.mysql2jsdate(afs[j][3]);
                            if (inicio && fim) {
                                if (inicio <= hoje && fim >= hoje) {
                                    lista.push({
                                        id_usuario: adv.id,
                                        nome: adv.nome,
                                        id_setor: adv.id_setor,
                                        id_unidade: adv.id_unidade,
                                        inicio: this.date2normal(inicio),
                                        fim: this.date2normal(fim),
                                        motivo: afs[j][4],
                                        permanente: false,
                                        uso_futuro_1: 8  // 8=Outros
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        let div_adv = MFt.$('afastamentos');
        MFt.criaElem('div', {
            innerText: 'AFASTAMENTOS:',
            style: {
                fontWeight: 'bold'
            }
        }, div_adv);
        let d1 = MFt.criaElem('div', {

        }, div_adv);
        let tabela = MFt.criaElem('table', {
            style: {
                borderCollapse: 'collapse'
            }
        }, d1);
        let tds = this.tds(['', 'NOME', 'INICIO', 'FIM', 'MOTIVO', ''], MFt.criaElem('tr', null, tabela));
        MFt.atribs(tds, {
            style: {
                padding: '0 7px'
            }
        });
        lista.forEach((d, i)=>{
            let campos = [
                (i+1).toString(),
                d.nome,
                d.inicio ? d.inicio : '---',
                d.fim ? d.fim : '---',
                d.motivo,
                ''
            ];
            let tds = this.tds(campos, MFt.criaElem('tr', null, tabela));
            MFt.atribs(tds, {
                style: {
                    padding: '0 7px'
                }
            });
            let registrar = MFt.criaElem('span', {
                innerText: 'registrar',
                style: {
                    cursor: 'pointer',
                    color: 'blue'
                }
            }, tds[5]);
            registrar.onclick = ()=>{
                alert('Os afastamentos são registrados de forma automática na página de movimentação');
                registrar.parentNode.removeChild(registrar);
                let msg = new MsgGenerica('Avaliando dados...', 200, 50);
                this.setor_advogado(d.id_unidade, d.id_setor, (setor)=>{
                    d.setor_nome = setor.nome;
                    this.unidade_advogado(d.id_unidade, (unidade)=>{
                        d.unidade_nome = unidade.nome;
                        this.ja_existe_compensacao(d.id_usuario, d.id_unidade, d.id_setor, MFt.dates.date2sql(new Date()), (dd)=>{
                            if (dd.length) {
                                msg.msg = 'Já existe registro de compensação para o dia';
                                setTimeout(()=>{
                                    msg.closeWindow(msg);
                                }, 1500);
                            }
                            else {
                                msg.msg = 'Registrando...';
                                this.registrar_compensacao(d.id_usuario, d.id_unidade, d.id_setor, d.nome, d.unidade_nome, d.setor_nome, null, d.motivo, d.uso_futuro_1, new Date(), ()=>{
                                    msg.msg = 'Tudo feito!';
                                    setTimeout(()=>{
                                        msg.closeWindow(msg);
                                    }, 1500);
                                });
                            }
                        });
                    });
                });
            };
        });
    }

    setor_advogado(id_unidade, id_setor, cb) {
        this.sapiens_route(new Payloads().getSetores(id_unidade), (ds)=>{
            if (ds) {
                let ret;
                for(let i = 0; i < ds.length; i++) {
                    if (ds[i].id === id_setor) {
                        ret = ds[i];
                        break;
                    }
                }
                cb(ret);
            }
            else alert('Erro com o Sapiens ao obter o Setor');
        });
    }

    unidade_advogado(id_unidade, cb) {
        this.sapiens_route(new Payloads().getUnidadeID(id_unidade), (ds)=>{
            if (ds) {
                cb(ds[0]);
            }
            else alert('Erro com o Sapiens ao obter a Unidade');
        });
    }

    ja_existe_compensacao(usuario, unidade, setor, data, cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'buscar_compensacao',
                id_usuario_entrada: usuario,
                id_unidade: unidade,
                id_setor: setor,
                data_hora_distribuicao: data
            },
            callback: (dd)=>{
                if (dd && dd.ok) {
                    cb(dd.dados);
                }
                else if (dd && dd.erro) alert(dd.erro);
                else alert('Falha de comunicação com o Servidor');
            }
        });
    }

    registrar_compensacao(id_usuario, id_unidade, id_setor, usuario_nome, unidade_nome, setor_nome, nup, obs, sapiens_outros, data, cb){
        let get = {
            task: 'registrar_compensacao',
            id_usuario_entrada: id_usuario,
            nome_usuario_entrada: usuario_nome,
            id_unidade:id_unidade,
            id_setor:id_setor,
            nome_unidade: unidade_nome,
            nome_setor: setor_nome,
            nup: nup,
            observacao: obs,
            uso_futuro_1: sapiens_outros,
            data_hora_distribuicao: MFt.dates.date2sql(data),
        };
        console.log(get);
        MFt.xml({
            url: mp,
            get: get,
            callback: (d)=>{
                if (d && d.ok) {
                    cb();
                }
                else if (d && d.erro) alert(d.erro);
                else alert('Falha de comunicação com MP');
            }
        });
    }
}