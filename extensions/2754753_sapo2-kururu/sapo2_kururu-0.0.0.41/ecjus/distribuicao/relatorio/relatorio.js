let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Relatório de distribuição', MFt.$('header'));
    new Relatorio();
};

class Relatorio extends Payloads {
    constructor() {
        super();
        this.usuario = undefined;
        this.unidade = undefined;
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.id_setor = undefined;
        this.setor_selecionado = undefined;
        this.setores_juridicos = [];
        this.data_selecionada = undefined;
        this.grupos_ciclos = [];
        this.init();
        return;
        this.obter_identidade(()=>{
            this.obter_unidade(()=>{
                this.selecionar_setor(()=>{
                    this.form_periodo((dis, dia)=>{
                        console.log(dis);
                        let grupos = this.obter_grupos(dis);
                        this.exibir_header();
                        Object.keys(grupos).forEach((k)=>{
                            if (k !== 'null') this.exibir_dists(k, grupos[k]);
                        });
                        this.exibir_afastamentos(dia, ()=>{
                            this.exportar_sapiens();
                        });
                    });
                });
            });
        });
    }

    async init() {
        if (await !this.is_token_valido) {
            alert('Sem token');
            return;
        }
        this.unidade = await this.super_get(this.get_unidade_pelo_id(this.id_unidade), true, true);
        this.setores_juridicos = await this.super_get(this.get_setores(this.id_unidade), true);
        this.setor_selecionado = await this.selecionar_setor();
        this.form_periodo(async (dis, dia)=>{
            console.log(dis);
            this.data_selecionada = dia;
            console.log(dia);
            let grupos = this.obter_grupos(dis);
            this.exibir_header();
            Object.keys(grupos).forEach((k)=>{
                if (k !== 'null') this.exibir_dists(k, grupos[k]);
            });
            await this.exibir_afastamentos(dia);
            this.exportar_sapiens();
        });
    }

    obter_grupos(dd) {
        let gps = {};
        dd.forEach((d)=>{
            if (!gps[d[0]]) gps[d[0]] = [];
            gps[d[0]].push(d);
        });
        return gps;
    }

    obter_unidade(cb) {
        this.sapiens_route(new Payloads().getUnidadeID(this.id_unidade), (ds)=>{
            if (ds) {
                this.unidade = ds[0];
                cb();
            }
            else alert('Falha de comunicação com o Sapiens');
        });
    }

    obter_identidade(cb) {
        this.sapiens_route(new Payloads().identidade(), (ds)=>{
            if (ds) {
                this.usuario = ds[0];
                cb();
            }
            else alert('Falha de comunicação com o Sapiens');
        });
    }

    selecionar_setor() {
        return new Promise(rr=>{
            let pop = new PopUp(500, 150, null, null, (form)=>{
                let itens = [];
                this.setores_juridicos.forEach((s)=>{
                    itens.push({value:s.id, nome:s.nome});
                });
                MFt.criaElem('div', {innerText:'Selecione o setor jurídico'}, form.div);
                let sel = this.criar_select('Setor', itens, form.div, 'selecionar_setor');
                let bt = new MFt.bt({
                    value: 'Selecionar',
                    wrapper: MFt.criaElem('div', null, form.div),
                    width: 100,
                    height: 30,
                    callback: ()=>{
                        this.id_setor = this.setores_juridicos[sel.selectedIndex].id;
                        pop.closeWindow(pop);
                        rr(this.setores_juridicos[sel.selectedIndex]);
                    }
                });
            });
            pop.iniciar(pop);
        });
    }

    form_periodo(cb) {
        let proceder = ()=>{
            bt.disabled = true;
            let dia = this.validaData(data.value.trim());
            if (dia) {
                // MFt.clear(d1);
                MFt.xml({
                    url: mp,
                    get: {
                        task: 'obter_distribuicao_dia',
                        id_unidade: this.id_unidade,
                        id_setor: this.id_setor,
                        data_hora_distribuicao: MFt.dates.date2sql(this.validaData(data.value.trim()))
                    },
                    callback: (dd)=>{
                        console.log(dd);
                        if (dd && dd.ok) {
                            this.data_selecionada = dia;
                            console.log(dia);
                            cb(dd.dados, dia);
                        }
                        else if (dd && dd.erro) alert(dd.erro);
                        else alert('Falha de comunicação com o servidor');
                    }
                });
            }
            else {
                alert('Data inválida');
                bt.disabled = false;
            }
        };
        let d1 = MFt.$('dists');
        MFt.clear(d1);
        const tmp_data = (()=>{
            const a = new Date();
            return `${a.getDate()}.${a.getMonth()+1}.${a.getFullYear()}`
        })();
        let data = this.campo_texto('Data da distribuição', tmp_data, d1, 200);
        data.focus();
        data.onkeydown = (e)=>{
            if (e.key === 'Enter') {
                e.preventDefault(e);
                e.stopPropagation();
                proceder();
            }
        };
        let bt = new MFt.bt({
            value: 'Buscar',
            wrapper: d1,
            width: 100,
            height: 30,
            callback: ()=>{
                proceder();
            }
        });
    }

    exibir_header() {
        let d1 = MFt.$('dists');
        MFt.clear(d1);
        MFt.criaElem('p', {
            innerText: `${this.unidade.nome}`,
            style: {
                fontWeight: 'bold'
            }
        }, d1);
        MFt.criaElem('p', {
            innerText: `SETOR: ${this.setor_selecionado.nome}`,
            style: {

            }
        }, d1);
        MFt.criaElem('p', {
            innerText: `DISTRIBUIÇÃO: ${this.date2normal(this.data_selecionada)}`,
            style: {

            }
        }, d1);
    }

    exibir_dists(ciclo, dd) {
        console.log(ciclo);
        let ret = [];
        let nova_lista = (()=>{
            dd.forEach((d)=> {
                if (!d[25]) {
                    ret.push(d);
                }
            });
        })();
        if (ret.length) {
            let d1 = MFt.$('dists');
            MFt.criaElem('p', {
                innerText: `CICLO: ${ciclo}`,
                style: {
                    margin: '20px 0 0 0'
                }
            }, d1);
            let tabela = MFt.criaElem('table', {}, d1);
            let tds = this.tds(['', 'CICLO', 'DATA', 'NUP', 'ADVOGADO', 'ORIGEM', 'RETORNO', 'PREVENÇÃO'], MFt.criaElem('tr', null, tabela));
            MFt.atribs(tds, {style:{fontWeight: 'bold'}});
            let contador = 0;
            ret.forEach((d, i)=>{
                if (!d[25]) {
                    console.log(this.valida_data_hora(d[11]));
                    contador++;
                    tds = this.tds([
                        contador.toString(),
                        d[0].toString(),
                        d[11] ? this.date2normal(this.valida_data_hora(d[11])) : '---',
                        d[5] ? this.formatanup(d[5]) : '---',
                        d[24],
                        d[19] || '---',
                        d[17] ? 'SIM' : '',
                        d[16] ? 'SIM' : ''
                    ], MFt.criaElem('tr', null, tabela));
                }
            });
        }
    }

    /**
     *
     * @param dia {Date} Dia para procurar os afastamentos
     */
    async exibir_afastamentos(dia) {
        let d1 = MFt.$('dists');
        let p1 = MFt.criaElem('p', {
            innerText: `Aguardando dados dos afastamentos`,
            style: {
                margin: '20px 0 0 0'
            }
        }, d1);
        let afast = new ObterAfastamentos(this.id_unidade, this.id_setor);
        await afast.iniciar(this.data_selecionada);
        if (afast.lista_afastados.length) {
            p1.innerText = 'AFASTAMENTOS:';
            let tabela = MFt.criaElem('table', {}, d1);
            let tds = this.tds(['', 'ADVOGADO', 'EVENTO'], MFt.criaElem('tr', null, tabela));
            MFt.atribs(tds, {style:{fontWeight: 'bold'}});
            afast.lista_afastados.forEach((a, i)=>{
                console.log(a);
                tds = this.tds([
                    (i+1).toString(),
                    a.nome,
                    a.motivo
                ], MFt.criaElem('tr', null, tabela));
            });
            this.exibir_todos_advs(afast.advogados, d1);
        }
        else {
            p1.innerText = 'Não existem afastamentos de advogados para o dia.'
        }
    }

    exibir_todos_advs(advs, elem) {
        let p1 = MFt.criaElem('p', {
            innerText: `Lista completa de advogados do setor`,
            style: {
                margin: '20px 0 0 0'
            }
        }, elem);
        let tabela = MFt.criaElem('table', {}, elem);
        let tds = this.tds(['', 'ADVOGADO'], MFt.criaElem('tr', null, tabela));
        MFt.atribs(tds, {style:{fontWeight: 'bold'}});
        advs.forEach((a, i)=>{
            console.log(a);
            tds = this.tds([
                (i+1).toString(),
                a.nome,
            ], MFt.criaElem('tr', null, tabela));
        });
    }

    exportar_sapiens(){ // Anexa um HTML direto no Sapiens no processo indicado
        let d1 = MFt.$('exportar');
        let bt = new MFt.bt({
            value: 'Exportar',
            wrapper: d1,
            width: 100,
            height: 30,
            callback: ()=>{
                bt.disabled = true;
                let pop = new PopUp(250, 110, null, null, (form)=>{
                    MFt.atribs(form.div, {
                        style: {
                            fontSize: '14px'
                        }
                    });
                    let nup = this.campo_texto('NUP PARA JUNTADA', '', form.div, 200);
                    nup.focus();
                    let bt_nup = new MFt.bt({
                        value: 'Prosseguir',
                        wrapper: form.div,
                        width: 100,
                        height: 30,
                        callback: async ()=>{
                            bt_nup.disabled = true;
                            let inner = MFt.$('dists').innerHTML;
                            let html = `<!DOCTYPE html><html lang="pt-BR"><header><meta charset="utf-8"/><style>body {font-family: 'Titillium Web', 'Arial', serif;font-size: 10px;} td {padding: 0 7px;} table{border-collapse: collapse;}</style></header><body>${inner}</body></html>`;
                            console.log(html);
                            if (this.validaNUP(nup.value)) {
                                MFt.clear(form.div);
                                form.div.innerText = `Anexando relatório ao NUP ${this.formatanup(this.validaNUP(nup.value))}...`;
                                const processo = await this.super_get(this.get_id_processo(this.validaNUP(nup.value)), true, true);
                                if (!processo) {
                                    alert('Erro ao se obter o ID do Processo');
                                    throw new Error('Erro ao se obter o ID do Processo');
                                }
                                let res = await this.super_get(this.get_upload_html(processo.id, html));
                                if (!res?.id) {
                                    alert('Upload falhou');
                                }
                                form.div.innerText = `Tudo ok!`;
                            } else {
                                alert('NUP inválido');
                                bt.disabled = false;
                            }
                        }
                    })
                });
                pop.aceitaEsc = true;
                pop.iniciar(pop);
            }
        });
    }
}
