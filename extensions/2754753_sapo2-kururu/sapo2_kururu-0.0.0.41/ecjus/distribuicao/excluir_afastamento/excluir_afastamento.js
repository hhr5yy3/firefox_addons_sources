let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Exclusão de Tarefas Distribuídas', MFt.$('header'));
    MFt.$('obs').style.color = '#222';
    new ExcluirAfastamento();
};

class ExcluirAfastamento extends Tudo {
    constructor() {
        super();
        this.id_user = parseInt(MFt.urlArgs()['id_adv']);
        this.id_setor = parseInt(MFt.urlArgs()['id_setor']);
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.d_afast = MFt.$('afastamentos');
        this.afastamentos = [];
        this.itens_para_excluir = [];
        this.bt_minuta;
        this.usuario;
        this.init();
    }

    async init() {
        this.usuario = await this.request_sapiens(new Payloads().identidade(), false);
        console.log(this.usuario);
        this.afastamentos = await this.request_mf(mp, {
            task: 'obter_afastamentos_da_distribuicao',
            id_adv: this.id_user,
            id_setor: this.id_setor,
            id_unidade: this.id_unidade
        });
        MFt.clear(MFt.$('bt_minuta'));
        this.bt_minuta = new MFt.bt({
            value: 'Apresentar Minuta',
            wrapper: MFt.$('bt_minuta'),
            width: 150,
            marginBottom: '10px',
            height: 30,
            disabled: true,
            callback: ()=>{
                this.apresentar_minuta();
            }
        });
        this.exibir_afastamentos();
    }

    exibir_afastamentos() {
        MFt.clear(this.d_afast);
        for(let a of this.afastamentos) {
            this.item_afastamento(a, this.d_afast);
        }
    }

    item_afastamento(aa, elem) {
        const d1 = MFt.criaElem('div', {
            style: {
                borderBottom: '1px solid #ccc',
                padding: '5px 0',
                margin: '5px 0',
                display: 'flex',
                alignItems: 'center'
            }
        }, elem);
        const cb = MFt.criaElem('input', {
            type: 'checkbox',
            style: {
                margin: '0 10px 0 20px'
            }
        }, d1, {rowid:aa.rowid.toString()});
        MFt.criaElem('span', {
            innerText: this.date2normal(this.valida_data_hora(aa.data_hora_distribuicao)),
            style: {
                margin: '0 10px 0 0'
            }
        }, d1);
        MFt.criaElem('span', {
            innerText: aa.observacao,
            style: {
                margin: '0 10px 0 0'
            }
        }, d1);
        MFt.criaElem('span', {
            innerText: `Rodada: ${aa.rodada_distribuicao}`,
            style: {
                margin: '0 10px 0 0'
            }
        }, d1);
        cb.onchange = ()=> {
            if (cb.checked) {
                this.itens_para_excluir.push(aa);
                this.bt_minuta.disabled = false;
            }
            else this.excluir_da_relacao(aa);
        };
    }

    excluir_da_relacao(aa) {
        let index = (()=>{
            for(let i = 0; i < this.itens_para_excluir.length; i++) {
                if (this.itens_para_excluir[i].rowid === aa.rowid) return i;
            }
        })();
        this.itens_para_excluir.splice(index, 1);
        this.bt_minuta.disabled = !this.itens_para_excluir.length;
    }

    apresentar_minuta() {
        const d1 = MFt.$('afastamentos');
        MFt.clear(d1);
        MFt.clear(MFt.$('bt_minuta'));
        const bt = new MFt.bt({
            value: 'Lançar Registros',
            width: 150,
            height: 30,
            wrapper: MFt.criaElem('div', null, MFt.$('bt_minuta')),
            callback: ()=>{
                const pp = new PopUp(350, 150, null, null, form=>{
                    MFt.atribs(form.div, {style:{fontFamily: 'Arial', fontSize: '14px'}});
                    const nup = this.campo_texto(juntar.checked ? 'NUP' : 'Indique o NUP, mas não haverá juntada', '', MFt.criaElem('div', null, form.div), 200);
                    nup.focus();
                    nup.oninput = async () => {
                        if (this.validaNUP(nup.value)) {
                            nup.value = this.validaNUP(nup.value);
                            nup.disabled = true;
                            pp.aceitaEsc = false;
                            pp.clicafora_sair = false;
                            MFt.clear(form.div);
                            let cc = 0;
                            for (let aa of this.itens_para_excluir) {
                                form.div.innerText = `${++cc}/${this.itens_para_excluir.length} - Excluindo registro ${aa.rowid} do ciclo ${aa.rodada_distribuicao} - ${this.date2normal(this.valida_data_hora(aa.data_hora_distribuicao))}`
                                let res = await this.request_mf(mp, {
                                    task: 'excluir_afastamentos_da_distribuicao',
                                    id: aa.rowid
                                }, null, false);
                                console.log(res);
                                if (!res) {
                                    alert('Erro desconhecido.\nProcesso encerrado.\nRecarregue a página.')
                                    location.reload();
                                    return;
                                }
                            }
                            if (juntar.checked) {
                                form.div.innerText = 'Inserindo documento no Sapiens...';
                                this.incluir_doc_sapiens(d1.innerHTML, nup.value, this.usuario.id, () => {
                                    form.div.innerText = 'Documento anexado.';
                                    setTimeout(() => {
                                        location.reload();
                                    }, 4000);
                                });
                            }
                            else {
                                form.div.innerText = 'Procedimento finalizado.';
                                setTimeout(() => {
                                    location.reload();
                                }, 4000);
                            }
                        }
                    }
                });
                pp.iniciar(pp);
                pp.aceitaEsc = true;
                pp.clicafora_sair = true;
            }
        });
        const juntar = this.campo_checkbox('Juntar documento no Sapiens', true, MFt.criaElem('div', null, MFt.$('bt_minuta')), null, {
            border: '0px',
            margin: '10px 0 5px 0',
            padding: '0 0 5px 0',
            borderBottom: '1px solid #ccc'
        });
        MFt.atribs('afastamentos', {
            style: {
                fontFamily: 'Arial',
                fontSize: '14px'
            }
        });
        MFt.criaElem('p', {
            innerText: `Considerando que houve erro no registro do afastamento ${this.femea(this.itens_para_excluir[0].nome) ? 'da Dra.':'do Dr.'} ${this.itens_para_excluir[0].nome}, são tornados sem efeito os seguintes registros que indicam as datas onde deveria ter ocorrido a distribuição de processo:`
        }, d1);
        for(let a of this.itens_para_excluir) {
            MFt.criaElem('p', {
                innerText: `Ciclo ${a.rodada_distribuicao}; Data: ${this.date2normal(this.valida_data_hora(a.data_hora_distribuicao))}${a.observacao && a.observacao !== 'undefined' ? '; Motivo do afastamento: ' + a.observacao : ''}`,
                style: {
                    textIndent: '30px'
                }
            }, d1);
        }
        MFt.criaElem('p', {
            innerText: `Assim, a ausência de distribuição nos ciclos e datas acima indicados será compensada nas distribuições futuras.`
        }, d1);
        MFt.criaElem('p', {
            innerText: `COORDENAÇÃO DA E-CJU/ENGENHARIA - Em ${this.date2normal(new Date())}`
        }, d1);
    }
}