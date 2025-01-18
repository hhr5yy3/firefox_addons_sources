let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Modificar Retornos', MFt.$('header'));
    let mov = new MudarRetorno();
};



class MudarRetorno extends Tudo {
    constructor() {
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.setor_juridico = undefined;
        this.usuario = undefined;
        this.obter_dados_usuario(ds=>{
            this.usuario = ds;
            this.selecionar_setor_juridico(sj=>{
                this.setor_juridico = sj;
                this.selecionar_adv(this.setor_juridico, MFt.$('wrapper'), adv=>{
                    this.obter_exibir_selecionar_retornos(adv, this.setor_juridico, MFt.$('wrapper'), dd=>{
                        console.log(dd);
                    });
                });
            });
        });
    }

    obter_dados_usuario(cb) {
        this.sapiens_route(new Payloads().identidade(), ds=>{
            if (ds) {
                cb(ds[0]);
            }
            else alert('Erro no Sapiens');
        });
    }

    selecionar_adv(setor_juridico, elem, cb) {
        MFt.clear(elem);
        elem.innerText = 'Aguarde...';
        this.sapiens_route(new Payloads().getUsuariosJSON(this.setor_juridico.id), dd=>{
            if (dd) {
                let dados = [{nome:'---', value:0}];
                dd.forEach((d)=>{
                    dados.push({nome:d.nome, value:d.id});
                });
                MFt.clear(elem);
                let sel = this.criar_select('SELECIONE O ADVOGADO', dados, elem, 'selecao');
                sel.onchange = ()=>{
                    if (sel.selectedIndex) {
                        cb(dd[sel.selectedIndex - 1]);
                    }
                }
            }
            else alert('Erro com o Sapiens');
        });
    }

    obter_exibir_selecionar_retornos(adv, setor, elem, cb) {
        MFt.clear(elem);
        elem.innerText = 'Aguarde...';
        this.xml_associado(mp, 'obter_retornos', {id: adv.id, id_setor: setor.id}, dd=>{
            console.log(dd);
            console.log(setor);
            MFt.clear(elem);
            MFt.criaElem('div', {
                innerText: `SETOR: ${setor.nome}`,
                style: {
                    fontWeight: 'bold'
                }
            }, elem);
            MFt.criaElem('div', {
                innerText: `ADVOGADO(A): ${adv.nome}`,
                style: {
                    fontWeight: 'bold'
                }
            }, elem);
            if (dd.length) {
                let contador = 0;
                let tabela = MFt.criaElem('table', null, elem);
                let tds = this.tds(['', 'NUP', 'DISTRIBUIÇÃO', 'TIPO DE RETORNO', ''], MFt.criaElem('tr', null, tabela));
                MFt.atribs(tds, {style:{fontWeight: 'bold'}});
                dd.forEach((d)=>{
                    contador++;
                    let tds = this.tds([
                        contador.toString(),
                        '',
                        this.date2normal(this.valida_data_hora(d.data_hora_distribuicao)),
                        d.retorno || d.prevencao ? (d.retorno ? 'RETORNO SIMPLES' : 'PREVENÇÃO') : 'DIST. NORMAL',
                        ''
                    ], MFt.criaElem('tr', null, tabela));
                    let modificar = MFt.criaElem('span', {
                        innerText: 'modificar',
                        style: {
                            cursor: 'pointer',
                            color: '#e70'
                        }
                    }, tds[4]);
                    MFt.criaElem('a', {
                        href: `../../../tela_processo.html?nup=${d.nup}`,
                        innerText: this.formatanup(d.nup),
                        target: '_blank'
                    }, tds[1]);
                    modificar.onclick = ()=>{
                        this.form_mudar(d, d.retorno, d.prevencao);
                    };
                });
            }
            else {
                MFt.clear(elem);
                elem.innerText = `Sem retornos ou prevenções para ${adv.nome}`;
            }
        });
    }

    form_mudar(dados, retorno, prevencao) {
        let xml_alterar = (cb)=>{
            MFt.xml({
                url: mp,
                get: {
                    task: 'alterar_retorno',
                    id: dados.id_usuario_entrada,
                    rowid: dados.rowid,
                    id_setor: dados.id_setor,
                    retorno: dados.retorno ? null : 1,
                    prevencao: dados.prevencao ? null : 1
                },
                callback: (dd)=>{
                    if (dd && dd.ok) {
                        cb();
                    }
                    else if (dd && dd.erro) alert(dd.erro);
                    else alert('Erro de comunicacao com o Servidor');
                }
            })
        };
        let make_doc = (motivo)=>{
            let elem = MFt.$('doc');
            MFt.clear(elem);
            MFt.criaElem('p', {
                innerText: `Registra-se a modificação do tipo de distribuição feita em relação ao Processo n. ${this.formatanup(dados.nup)}, cuja abertura de tarefa no Sistema de Processo Eletrônico Sapiens ocorreu em ${this.date2normal(this.valida_data_hora(dados.data_hora_distribuicao))}.`,
                style: {margin:'0', padding: '0', textAlign:'justify', fontSize:'14px'}
            }, elem);
            if (dados.retorno) {
                MFt.criaElem('p', {
                    innerText: `Referido processo foi inicialmente distribuído como simples retorno sem efeitos sobre o quantitativo de processos, nos termos dos arts. 17 e 18 do Regimento Interno da e-CJU. Com a presente modificação, a distribuição passa a ser considerada como prevenção, contando para os fins previstos no art. 15 do Regimento Interno.`,
                    style: {margin:'0', padding: '0', textAlign:'justify', fontSize:'14px'}
                }, elem);
            }
            else if (dados.prevencao) {
                MFt.criaElem('p', {
                    innerText: `Referido processo foi inicialmente distribuído como prevenção com efeitos sobre o quantitativo de processos nos termos do art. 15 do Regimento Interno da e-CJU. Com a modificação, a presente distribuição passa a ser considerada como simples retorno, não sendo utilizada para a contagem do número de processos distribuídos, nos termos dos arts. 17 e 18 do Regimento Interno.`,
                    style: {margin:'0', padding: '0', textAlign:'justify', fontSize:'14px'}
                }, elem);
            }
            else throw new Error('Não foi identificado o tipo de distribuição');
            MFt.criaElem('p', {
                innerText: `NUP: ${this.formatanup(dados.nup)}`,
                style: {margin:'0', padding: '0', fontSize:'14px'}
            }, elem);
            MFt.criaElem('p', {
                innerText: `DATA DA DISTRIBUIÇÃO: ${this.date2normal(this.valida_data_hora(dados.data_hora_distribuicao))}`,
                style: {margin:'0', padding: '0', fontSize:'14px'}
            }, elem);
            MFt.criaElem('p', {
                innerText: `RESPONSÁVEL: ${dados.nome_usuario_entrada}`,
                style: {margin:'0', padding: '0', fontSize:'14px'}
            }, elem);
            MFt.criaElem('p', {
                innerText: `CONVERSÃO: ${retorno?'de RETORNO para PREVENÇÃO':'de PREVENÇÃO para RETORNO'}`,
                style: {margin:'0', padding: '0', fontSize:'14px'}
            }, elem);
            MFt.criaElem('p', {
                innerText: `DATA DA MODIFICAÇÃO: ${this.date2normal(new Date())}`,
                style: {margin:'0', padding: '0', fontSize:'14px'}
            }, elem);
            MFt.criaElem('p', {
                innerText: `MOTIVO: ${motivo}`,
                style: {margin:'0', padding: '0', fontSize:'14px'}
            }, elem);
        };
        let pop = new PopUp(500, 217, null, null, form=>{
            MFt.criaElem('div', {
                innerText: `NUP ${this.formatanup(dados.nup)}`,
                style: {
                    fontWeight: 'bold'
                }
            }, form.div);
            MFt.criaElem('div', {
                innerText: `Mudar de ${retorno?'RETORNO':'PREVENÇÃO'} para ${prevencao?'RETORNO':'PREVENÇÃO'}?`,
                style: {
                    fontWeight: 'bold'
                }
            }, form.div);
            let motivo = this.campo_texto('MOTIVO', '', form.div, null, null, null, {marginBottom:5});
            let nup = this.campo_texto('NUP DE REGISTRO DA DISTRIBUIÇÃO', '', form.div, null, null, null, {marginBottom:5});
            let check_criar_doc = this.campo_checkbox('Criar Documento no Sapiens', true, form.div);
            check_criar_doc.onchange = ()=>{
                motivo.disabled = nup.disabled = !check_criar_doc.checked;
            };
            motivo.focus();
            nup.onblur = ()=>{if (this.validaNUP(nup.value)) nup.value = this.formatanup(nup.value)};
            let d1 = MFt.criaElem('div', null, form.div);
            let sim = new MFt.bt({
                value: 'SIM',
                width: 100,
                height: 30,
                wrapper: d1,
                // marginTop: '10px',
                callback: ()=>{
                    if (check_criar_doc.checked && !this.validaNUP(nup.value)) {
                        alert('Erro no NUP');
                        return;
                    }
                    if (check_criar_doc.checked && motivo.value.length < 6) {
                        alert('Erro no motivo');
                        return;
                    }
                    sim.disabled = true;
                    pop.aceitaEsc = false;
                    pop.clicafora_sair = false;
                    MFt.clear(form.div);
                    form.div.innerText = 'Promovendo a alteração...';
                    xml_alterar(()=>{
                        if (check_criar_doc.checked) {
                            form.div.innerText = 'Registrando no Sapiens...';
                            make_doc(motivo.value.trim());
                            let elem = MFt.$('doc');
                            this.upload_html_sapiens(elem, nup.value, this.usuario, res => {
                                if (res) {
                                    form.div.innerText = 'Tudo ok!';
                                    setTimeout(() => {
                                        location.reload();
                                    }, 2000);
                                } else {
                                    form.div.innerText = 'Erro no upload do documento.';
                                }
                            });
                        }
                        else {
                            form.div.innerText = 'Tudo ok!';
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        }
                    });
                }
            });
            let nao = new MFt.bt({
                value: 'NÃO',
                width: 100,
                height: 30,
                wrapper: d1,
                // marginTop: '10px',
                marginLeft: '15px',
                callback: ()=>{
                    form.closeWindow(form);
                }
            });
        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }
}
