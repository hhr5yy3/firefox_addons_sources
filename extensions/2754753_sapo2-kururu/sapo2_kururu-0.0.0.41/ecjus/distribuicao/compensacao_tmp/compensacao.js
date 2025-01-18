let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Compensação de Atividades', MFt.$('header'));
    new Compensacao();
};

class Compensacao extends Tudo {
    constructor(props) {
        super(props);
        this.unidade = undefined;
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.id_setor = undefined;
        this.setores_juridicos = [];
        this.advogados = [];
        this.obter_nome_unidade(()=>{
            this.form_setor(()=>{
                this.selecionar_adv();
            });
        });
    }

    obter_nome_unidade(cb){
        this.sapiens_route(new Payloads().getUnidadeID(this.id_unidade), (ds)=>{
            if (ds) {
                this.unidade = ds[0];
                cb();
            }
            else alert('Falha de comunicação com o Sapiens');
        });
    }

    form_setor(cb) {
        let pop = new PopUp(250, 100, null, null, (form)=>{
            form.div.innerText = 'Aguarde...';
            this.obter_setores_juridicos((setores)=>{
                MFt.clear(form.div);
                MFt.criaElem('div', {
                    innerText: 'Selecione o setor'
                }, form.div);
                this.setores_juridicos = setores;
                let sel = MFt.criaElem('select', {
                    style: {
                        fontSize: '14px'
                    }
                }, MFt.criaElem('div', {
                    style: {
                        padding: '0 7px',
                        marginBottom: '10px'
                    }
                }, form.div));
                for(let i = 0; i < this.setores_juridicos.length; i++) {
                    MFt.criaElem('option', {
                        innerText: this.setores_juridicos[i].nome
                    }, sel);
                }
                let bt = new MFt.bt({
                    value: 'Selecionar',
                    wrapper: MFt.criaElem('div', {}, form.div),
                    width: 80,
                    height: 30,
                    callback: ()=>{
                        MFt.clear(form.div);
                        form.div.innerText = 'Obtendo relação de advogados...';
                        this.sapiens_route(new Payloads().getUsuariosJSON(this.setores_juridicos[sel.selectedIndex].id), (ds)=>{
                            if (ds) {
                                this.id_setor = this.setores_juridicos[sel.selectedIndex].id;
                                this.advogados = ds;
                                pop.closeWindow(pop);
                                cb();
                            }
                            else {
                                alert('Falha de comunicação com o Sapiens');
                            }
                        });
                    }
                });
            });
        });
        pop.iniciar(pop);
    }

    form_compensacao() {
        let form = MFt.$('form');
        MFt.clear(form);
        // ---------------------- ADVOGADOS
        let op_advs = (()=>{
            let ret = [{value:0, nome:'---'}];
            this.advogados.forEach((a)=>{
                ret.push({value: a.id, nome:a.nome});
            });
            return ret;
        })();
        let sel_adv = this.criar_select('Selecione o Advogado', op_advs, form, 'selecao');
        // ---------------------- MOTIVO
        let motivos = [
            {value:1, nome:'SAPIENS'},
            {value:2, nome:'REUNIÃO'},
            {value:4, nome:'NOVO ADOGADO NO SETOR'},
            {value:8, nome:'OUTROS'}
        ];
        let sel_motivo = this.criar_select('Selecione o motivo do afastamento', motivos, form, 'selecao');
        // ---------------------- DATA
        let data = this.campo_texto('Selecione a data do afastamento', '', form, 120);
        // ---------------------- NUP
        let nup = this.campo_texto('Informe o NUP onde o evento está registrado', '', form, 250);
        // ---------------------- OBS
        let obs = this.campo_texto('Observações', '', form, 600);
        // ----------------------
        data.value = this.date2normal(new Date());
        let bt = new MFt.bt({
            value: 'Registrar',
            width: 120,
            height: 30,
            wrapper: form,
            callback: ()=>{
                bt.disabled = true;
                let data_date = this.validaData(data.value.trim());
                let advogado = sel_adv.selectedIndex > 0 ? this.advogados[sel_adv.selectedIndex - 1] : undefined;
                let setor = (()=>{
                    for(let i = 0; i < this.setores_juridicos.length; i++) {
                        if (this.setores_juridicos[i].id === this.id_setor) return this.setores_juridicos[i];
                    }
                })();
                let numnup = this.validaNUP(nup.value.trim()) || '';
                if (!numnup && nup.value.trim().length) {
                    alert('NUP inválido');
                    bt.disabled = false;
                    return;
                }
                if (!data_date) {
                    alert('Data inválida!');
                    bt.disabled = false;
                    return;
                }
                if (MFt.inArray(data_date.getDay(), [0, 6])) {
                    alert('Não é possível registrar em dia de sábado ou domingo');
                    bt.disabled = false;
                    return;
                }
                if (!obs.value.trim()) {
                    alert('É necessário preencher o campo Observação');
                    bt.disabled = false;
                    return;
                }
                if (!advogado) {
                    alert('Selecione um Advogado');
                    bt.disabled = false;
                    return;
                }
                if (!confirm(`Deseja criar compensação para ${advogado.nome}`)) {
                    bt.disabled = false;
                    return;
                }
                this.registrar_compensacao(advogado, this.unidade, setor, numnup, obs.value.trim(), sel_motivo[sel_motivo.selectedIndex].value, data_date, (res)=>{
                    bt.disabled = false;
                });
            }
        });
        MFt.$('footer').innerText = 'Cada compensação equivale a um processo. A data precisa se referir a uma data em que já se iniciou a distribuição. ' +
            'Caso a data seja passada, esse crédito será levado em consideração para os cálculos futuros. Não pode existir, porém, compensação com data futura ' +
            'relativa a evento que ainda não ocorreu. O sistema também está bloqueado para registrar mais de uma compensação por dia.';
    }

    registrar_compensacao(usuario, unidade, setor, nup, obs, motivo, data, cb){
        let get = {
            task: 'registrar_compensacao',
            id_usuario_entrada: usuario.id,
            nome_usuario_entrada: usuario.nome,
            id_unidade:this.unidade.id,
            id_setor:setor.id,
            nome_unidade: this.unidade.nome,
            nome_setor: setor.nome,
            nup: nup,
            observacao: obs,
            uso_futuro_1: motivo,
            data_hora_distribuicao: MFt.dates.date2sql(data),
        };
        MFt.xml({
            url: mp,
            get: get,
            callback: (d)=>{
                if (d && d.ok) {
                    console.log(d);
                    let msg = new MsgGenerica('Registrado!', 150, 40);
                    setTimeout(()=>{msg.closeWindow(msg);}, 1500);
                }
                else if (d && d.erro) alert(d.erro);
                else alert('Falha de comunicação com MP');
                cb();
            }
        });
    }

    selecionar_adv() {
        let form = MFt.$('form');
        MFt.clear(form);
        // ---------------------- ADVOGADOS
        let op_advs = (()=>{
            let ret = [{value:0, nome:'---'}];
            this.advogados.forEach((a)=>{
                ret.push({value: a.id, nome:a.nome});
            });
            return ret;
        })();
        let sel_adv = this.criar_select('Selecione o Advogado', op_advs, form, 'selecao');
        let div_afastamentos = MFt.criaElem('div', {
            style: {
                marginTop: '10px'
            }
        }, form);
        sel_adv.onchange = ()=>{
            if (sel_adv.selectedIndex) {
                div_afastamentos.innerText = 'Buscando dados...';
                this.exibir_afastamentos(div_afastamentos, parseInt(sel_adv[sel_adv.selectedIndex].value))
            }
        }
    }

    exibir_afastamentos(elem, id_adv) {
        MFt.clear(elem);
        elem.innerText = 'Buscando dados...';
        MFt.xml({
            url: mp,
            get: {
                task: 'buscar_compensacao_adv',
                id: id_adv
            },
            callback: dd=>{
                console.log(dd);
                if (dd && dd.ok) {

                }
                else if (dd && dd.erro) alert(dd.erro);
                else alert('Erro não especificado com o Servidor');
            }
        });
    }

}