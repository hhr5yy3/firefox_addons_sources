let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Editar Advogado', MFt.$('header'));
    let adv = new Advogado();
};

class Advogado extends Tudo {
    constructor() {
        super();
        this.div_adv = MFt.$('adv');
        this.id_user = parseInt(MFt.urlArgs()['id_adv']);
        this.id_setor = parseInt(MFt.urlArgs()['id_setor']);
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.advogado = undefined;
        this.afastamentos = undefined;
        if (!this.id_user || !this.id_setor || !this.id_unidade) {
            alert('Impossível continuar sem o ID do Advogado ou o ID do Setor');
            return;
        }
        this.dados_adv_sapiens((dados)=>{
            console.log(dados);
            this.advogado = dados;
            this.obter_afastamentos((dados)=>{
                this.afastamentos = dados;
                this.dados_adv_mp((dados)=>{
                    if (dados.length === 0) {
                        // preencher com o padrão
                        this.advogado['credito_processual'] = 0;
                        this.advogado['percentual_carga'] = 100;  // 100% de carga
                        this.advogado['motivo_carga'] = null;
                        this.salvar_advogado((res)=>{

                        });
                    }
                    else {
                        this.advogado['credito_processual'] = dados[6];
                        this.advogado['percentual_carga'] = dados[7];
                        this.advogado['motivo_carga'] = dados[8];
                    }
                    this.form_adv();
                    this.form_afastamentos();
                });
            });
        });
    }

    dados_adv_sapiens(cb) {
        this.sapiens_route(new Payloads().usuariosSetor(this.id_setor), (dados)=>{
            if (dados && dados.length) {
                let retorno = undefined;
                for(let i = 0; i < dados.length; i++) {
                    if (dados[i].id === this.id_user) {
                        retorno = dados[i];
                        break;
                    }
                }
                cb(retorno);
            }
            else {
                alert('Erro! Recarregue a página.');
            }
        });
    }

    dados_adv_mp(cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_advogado_by_id',
                id_usuario: this.id_user
            },
            callback: (dados) => {
                // 0=id_usuario, 1=id_colaborador, 2=nome, 3=id_cidade, 4=id_setor, 5=id_unidade, 6=credito_processual, 7=percentual_carga, 8=motivo_carga, 9=nome_cidade
                if (dados && dados.ok) {
                    cb(dados.dados);
                }
                else if (dados && dados.erro) {
                    alert(dados.erro);
                }
                else {
                    alert('Erro desconhecido!');
                }
            }
        });
    }

    obter_afastamentos(cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_afastamentos',
                id_usuario: this.id_user
            },
            callback: (dados) => {
                if (dados && dados.ok) {
                    cb(dados.dados);
                }
                else if (dados && dados.erro) {
                    alert(dados.erro);
                }
                else {
                    alert('Erro desconhecido!');
                }
            }
        });
    }

    salvar_advogado(cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'inserir_advogado',
                id_usuario: this.advogado.id,
                id_colaborador: this.advogado.colaborador_id,
                id_cidade: undefined,
                id_setor: this.id_setor,
                id_unidade: this.id_unidade,
                credito_processual: this.advogado.credito_processual,
                percentual_carga: this.advogado.percentual_carga,
                motivo_carga: this.advogado.motivo_carga,
                nome: this.advogado.nome
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

    campo(txt, valor, wrapper, width, disabled=false, textarea=false, opcoes) {
        width = (()=>{
            if(width && Object.prototype.toString.call(width) === '[object Number]') {
                return `${width}px`;
            }
            else return width;
        })();
        let d1 = MFt.criaElem('div', {
            style: {
                marginBottom: '15px'
            }
        }, wrapper);
        let label = MFt.criaElem('div', {
            innerText: txt,
            style: {
                fontSize: '12px',
                fontWeight: 'bold'
            }
        }, d1);
        let d1_sub = MFt.criaElem('div', {
            style: {
                border: opcoes && opcoes.height ? '0' : '1px solid #CCC',
                borderRadius: '6px',
                padding: '0 5px',
                width: width ? width : 'calc(100% - 10px)'
            }
        }, d1);
        let inp = (()=>{
            if (textarea) {
                let height = (()=>{
                    if (opcoes && opcoes.height) {
                        if (Object.prototype.toString.call(opcoes.height) === '[object Number]') {
                            return `${opcoes.height}px`;
                        }
                        else return opcoes.height;
                    }
                    else return '30px';
                })();
                return MFt.criaElem('textarea', {
                    value: valor,
                    style: {
                        outline: 'none',
                        border: 'none',
                        width: 'calc(100% - 10px)',
                        height: height,
                        fontSize: '16px',
                        resize: 'none',
                        backgroundColor: 'transparent'
                    }
                }, d1_sub);
            }
            else return MFt.criaElem('input', {
                type: 'text',
                value: valor,
                style: {
                    outline: 'none',
                    border: 'none',
                    width: 'calc(100% - 10px)',
                    height: '30px',
                    fontSize: '16px',
                    backgroundColor: 'transparent'
                }
            }, d1_sub);
        })();
        inp.disabled = disabled;
        return inp;
    }

    form_adv() {
        let d_form = MFt.$('form_adv');
        MFt.clear(d_form);
        let nome = this.campo('NOME', this.advogado.nome, d_form, null, true);
        let credito = this.campo('CRÉDITO PROCESSUAL', this.advogado.credito_processual.toString(), d_form, 50, true);
        let carga = this.campo('CARGA PROCESSUAL', this.advogado.percentual_carga.toString(), d_form, 50, true);
        new MFt.bt({
            value: 'Modificar Carga',
            width: 130,
            height: 30,
            wrapper: MFt.criaElem('div', {

            }, d_form),
            callback: ()=>{
                this.modificar_carga();
            }
        });
    }

    form_afastamentos() {
        let d_form = MFt.$('form_afastamentos');
        let d_afast = MFt.criaElem('div', {

        }, d_form);
        let d_bt_incluir = MFt.criaElem('div', {
            style: {
                marginTop: '20px'
            }
        }, d_form);
        let d_bt_zerar = MFt.criaElem('div', {
            style: {
                marginTop: '20px'
            }
        }, d_form);
        let d_bt_excluir_afastamentos = MFt.criaElem('div', {
            style: {
                marginTop: '20px'
            }
        }, d_form);
        let bt_adicionar = new MFt.bt({
            value: 'Adicionar afastamento',
            width: 200,
            height: 30,
            wrapper: d_bt_incluir,
            callback: ()=>{
                this.adicionar_periodo();
            }
        });
        let bt_zerar = new MFt.bt({
            value: 'Zerar Défict',
            width: 200,
            height: 30,
            wrapper: d_bt_excluir_afastamentos,
            callback: ()=>{
                this.zerar_defict();
            }
        });
        let bt_excluir_afastamentos = new MFt.bt({
            value: 'Excluir Afastamentos',
            width: 200,
            height: 30,
            wrapper: d_bt_zerar,
            callback: ()=>{
                window.open(`../excluir_afastamento/index.html?id_adv=${this.id_user}&id_setor=${this.id_setor}&id_unidade=${this.id_unidade}`, '_blank');
            }
        });
        if (this.afastamentos.length === 0) {
            MFt.clear(d_afast);
            MFt.criaElem('p', {
                innerText: 'Sem afastamentos extraordinários',
                style: {
                    color: '#333'
                }
            }, d_afast);
            return;
        }
        this.exibir_afastamentos(d_afast);
    }

    adicionar_periodo(){
        let pop = new PopUp(600, 220, null, null, (form)=>{
            MFt.atribs(form.div, {
                style: {
                    fontFamily: "'Titillium Web', 'Arial', serif"
                }
            });
            let d1 = MFt.criaElem('div', {
                style: {
                    display: 'flex'
                }
            }, form.div);
            let div_datas = MFt.criaElem('div', {
                style: {
                    width: '150px',
                    margin: '0 5px',
                    padding: '0 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px'
                }
            }, d1);
            let div_direita = MFt.criaElem('div', {
                style: {
                    width: '450px',
                    margin: '0 5px',
                    display: 'flex',
                    flexDirection: 'column',
                }
            }, d1);
            let div_motivo = MFt.criaElem('div',{
                style: {
                    width: '420px',
                    height: '100px',
                    border: '1px solid #CCC',
                    borderRadius: '6px'
                }
            }, div_direita);
            let div_permantente = MFt.criaElem('div', {
                style: {
                    width: '420px',
                    height: '30px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    marginTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                }
            }, div_direita, {teste:'teste'});
            let div_salvar = MFt.criaElem('div', {

            }, form.div);
            let inicio = this.campo('Data inicial', '', div_datas, 100, false);
            let fim = this.campo('Data final', '', div_datas, 100);
            let motivo = this.campo('Motivo do afastamento', '', div_motivo, null, false, true, {height: 76});
            let permantente = MFt.criaElem('input', {
                type: 'checkbox',
                style: {
                    margin: '0 5px 0 10px'
                }
            }, div_permantente);
            MFt.criaElem('span', {
                innerText: 'Afastamento por prazo indefinido'
            }, div_permantente);
            permantente.onchange = ()=>{
                if (permantente.checked) {
                    inicio.value = fim.value = '---';
                    inicio.disabled = fim.disabled = true;
                }
                else {
                    inicio.value = fim.value = '';
                    inicio.disabled = fim.disabled = false;
                }
            }
            let bt_salvar = new MFt.bt({
                value: 'Salvar',
                width: 100,
                height: 30,
                marginTop: '20px',
                marginLeft: '5px',
                wrapper: div_salvar,
                callback: ()=>{
                    if (this.validaData(inicio.value) && this.validaData(fim.value) && motivo.value.trim()) {
                        let hoje = new Date();
                        hoje.setHours(0, 0, 0, 0);
                        let data_inicial = this.validaData(inicio.value.trim());
                        let data_final = this.validaData(fim.value.trim());
                        if (data_final < hoje) {
                            alert('A data final de afastamento precisa ser hoje ou futura');
                            return;
                        }
                        bt_salvar.disabled = true;
                        this.salvar_afastamento(
                            data_inicial,
                            data_final,
                            motivo.value.trim(),
                            permantente.checked ? 1 : 0,
                            null,
                            bt_salvar
                        );
                    }
                    else if (permantente.checked && motivo.value.trim()) {
                        bt_salvar.disabled = true;
                        this.salvar_afastamento(
                            null,
                            null,
                            motivo.value.trim(),
                            permantente.checked ? 1 : 0,
                            null,
                            bt_salvar
                        );
                    }
                    else {
                        alert('Dados incorretos.');
                    }
                }
            });
        });
        pop.header = 'Adicionar período de afastamento'
        pop.aceitaEsc = true;
        pop.iniciar(pop);
    }

    salvar_afastamento(inicio, fim, motivo, indeterminado, obs, bt) {
        console.log('salvar_afast.')
        MFt.xml({
            url: mp,
            post: {
                task: 'salvar_afastamento',
                id_usuario: this.id_user,
                data_inicial: inicio ? MFt.dates.date2sql(inicio) : null,
                data_final: fim ? MFt.dates.date2sql(fim) : null,
                motivo: motivo,
                indeterminado: indeterminado,
                observacao: obs
            },
            callback: (dados)=>{
                bt.disabled = false;
                if (dados && dados.ok) {
                    location.reload();
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

    exibir_afastamentos(d1){
        let sem_borda = e=>{
            MFt.atribs(e, {
                style: {
                    borderRight: '0',
                    borderTop: '0',
                    borderBottom: '0'
                }
            });
        };
        let date_br = s=>{
            return `${s.substr(8,2)}/${s.substr(5,2)}/${s.substr(0,4)}`;
        }
        let excluir = id=>{
            MFt.xml({
                url: mp,
                get: {
                    task: 'excluir_afastamento',
                    rowid: id
                },
                callback: (dados) =>{
                    if (dados && dados.ok) {
                        location.reload();
                    }
                    else {
                        if (dados && dados.erro) {
                            alert(dados.erro);
                        }
                        else {
                            alert('Erro de comunicação!');
                        }
                    }
                }
            });
        };
        let bt_excluir = (e, id)=>{
            let s1 = MFt.criaElem('span', {
                innerText: 'excluir',
                style: {
                    cursor: 'pointer',
                    color: '#CCC'
                }
            }, e, {rowid:id, excluindo:'nao'});
            s1.onclick = (e)=>{
                if (confirm('Confirma a exclusão?')) {
                    let rowid = parseInt(e.target.getAttribute('rowid'));
                    let excluindo = e.target.getAttribute('excluindo');
                    if (excluindo === 'nao') excluir(rowid);
                }
            };
        };
        let table = MFt.criaElem('table', {
            style: {
                borderCollapse: 'collapse'
            }
        }, d1);
        let campos = ['MOTIVO', 'INÍCIO', 'FIM', 'PRAZO INDETERMINADO', ''];
        let tds = this.tds(campos, MFt.criaElem('tr', {}, table));
        sem_borda(tds[4]);
        MFt.atribs(tds, {style:{fontWeight: 'bold', padding: '0 5px'}});
        this.afastamentos.forEach((d)=>{
            // 0=rowid, 1=id_user, 2=inicio, 3=fim, 4=motivo, 5=indeterminado, 6=observacao
            campos = d[5] ? [d[4], '---', '---', 'SIM', ''] : [d[4], date_br(d[2]), date_br(d[3]), '', ''];
            tds = this.tds(campos, MFt.criaElem('tr', {}, table));
            MFt.atribs(tds, {
                style: {
                    padding: '0 5px'
                }
            });
            sem_borda(tds[4]);
            bt_excluir(tds[4], d[0]);
        });
    }

    modificar_carga() {
        let pop = new PopUp(416, 175, null, null, (form)=>{
            let d1 = MFt.criaElem('div', null, form.div);
            let carga = this.campo('Carga Processual', this.advogado.percentual_carga.toString(), d1, 50, false, false);
            let motivo = this.campo('Motivo', this.advogado.motivo_carga ? this.advogado.motivo_carga : '', d1, 400);
            let bt = new MFt.bt({
                value: 'Salvar',
                width: 80,
                height: 30,
                wrapper: MFt.criaElem('div', {

                }, d1),
                callback: ()=>{
                    bt.disabled = true;
                    let valor_carga = carga.value.trim() && !isNaN(carga.value.trim()) ? parseInt(carga.value.trim()) : false;
                    if (valor_carga < 100 && motivo.value.trim().length === 0) {
                        alert('É necessário especificar o motivo da redução de carga');
                        bt.disabled = false;
                    }
                    else if (valor_carga === 100 || (valor_carga < 100 && valor_carga > 0 && motivo.value.trim().length > 3)) {
                        MFt.xml({
                            url: mp,
                            get: {
                                task: 'salvar_carga_processual',
                                id_usuario: this.advogado.id,
                                percentual_carga: valor_carga,
                                motivo_carga: motivo.value.trim()
                            },
                            callback: (dados)=>{
                                if (dados && dados.ok) {
                                    location.reload();
                                }
                                else if (dados && dados.erro) {
                                    alert(dados.erro);
                                    bt.disabled = false;
                                }
                                else {
                                    alert('Problemas de comunicação');
                                    bt.disabled = false;
                                }
                            }
                        });
                    }
                    else {
                        alert('É necessário ter um motivo para a redução de carga.');
                    }
                }
            });

        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }

    zerar_defict() {
        let obter_ultima_rodada = (cb)=>{
            MFt.xml({
                url: mp,
                get: {
                    task: 'obter_total_rodadas'
                },
                callback: dd=>{
                    if (dd && dd.ok) {
                        cb(dd.dados);
                    }
                    else if (dd && dd.erro) alert(dd.erro);
                    else alert('Erro ao obter rodadas');
                }
            });
        };
        let zerar_xml = (rodada, cb)=>{
            MFt.xml({
                url: mp,
                get: {
                    task: 'zerar_rodadas',
                    ultima_rodada: rodada,
                    id_unidade: this.id_unidade,
                    id_setor: this.id_setor,
                    id_adv: this.advogado.id
                },
                callback: dd=>{
                    if (dd && dd.ok) {
                        cb(dd.dados);
                    }
                    else if (dd && dd.erro) alert(dd.erro);
                    else alert('Erro ao zerar rodadas');
                }
            });
        };
        let pop = new PopUp(400, 200, null, null, form=> {
            MFt.atribs(form.div, {
                style: {
                    fontSize: '14px'
                }
            });
            form.div.innerText = 'Obtendo dados...';
            obter_ultima_rodada(ultima_rodada=> {
                console.log(this.advogado);
                MFt.clear(form.div);
                MFt.criaElem('div', {
                    innerText: 'Cria uma compensação em todos os ciclos de distribuição até o ciclo indicado.'
                }, form.div);
                MFt.criaElem('div', {
                    innerText: `Último ciclo de distribuição: ${ultima_rodada}`
                }, form.div);
                MFt.criaElem('div', {
                    innerText: `Advogado: ${this.advogado.nome}`
                }, form.div);
                let ultimo = this.campo('Indique o último ciclo a zerar', '', form.div, 'calc(100%-10px)');
                let bt = new MFt.bt({
                    value: 'Zerar',
                    width: 100,
                    height: 30,
                    wrapper: MFt.criaElem('div', null, form.div),
                    callback: ()=>{
                        let ciclo = 0;
                        try {
                            ciclo = parseInt(ultimo.value);
                        } catch (e) {}
                        if (!ciclo) {return;}
                        bt.disabled = true;
                        ultimo.disabled = true;
                        bt.value = 'Zerando...';
                        zerar_xml(ciclo, total=>{
                            form.div.innerText = `Total de compensações feitas: ${total}`;
                            setTimeout(()=>{
                                form.closeWindow(form);
                            }, 2000);
                        });
                    }
                });
            });
        });
        pop.iniciar(pop);
        pop.clicafora_sair = true;
        pop.aceitaEsc = true;
    }
}