class Redistribuir extends Payloads {
    constructor(pai) {
        super();
        Object.defineProperties(this, {
            pai:{get:()=>pai},
            tarefas:{get:()=>pai.tarefas_selecionadas()},
        });
        this.wrapper = undefined;
        if (this.tarefas?.length > 0) this.init();
        else {
            const msg = new MsgGenerica('Nenhuma tarefa selecionada', 240, 22, null, null);
            msg.div.style.fontSize = '16px';
            setTimeout(()=>msg.closeWindow(msg), 1500);
        }
    }

    init() {
        const tem_lotacao = id=>this.profile.colaborador.lotacoes.map(d=>d.setor.unidade.id).some(d=>id === d);
        const validar = ()=>{
            if (this.inp_unidade.id && this.inp_setor.id && this.inp_user.id) return true;
            return !!(this.inp_unidade.id && this.inp_setor.id && this.inp_setor.nome.indexOf("PROTOCOLO") >= 0);
        };
        this.pai.disable_checkboxes();
        this.wrapper = this.pai.open_quadro_opcoes(200, 'Redistribuir');
        this.wrapper.style.fontFamily = 'Courier New';
        const container = MFt.criaElem('div', null, this.wrapper);
        const unidade_id = this.tarefas?.length === 1 ? this.tarefas[0].setorResponsavel.unidade.id : null;
        const nome = this.tarefas?.length === 1 ? `${this.tarefas[0].setorResponsavel.unidade.sigla} - ${this.tarefas[0].setorResponsavel.unidade.nome}` : null;
        const d_unidade = MFt.criaElem('div', {style:{fontSize:'16px'}}, container)
        const d_setor = MFt.criaElem('div', {style:{fontSize:'16px'}}, container)
        const d_usuario = MFt.criaElem('div', {style:{fontSize:'16px'}}, container)
        this.inp_unidade = new InputMF('UNIDADE:', d_unidade, async (termos, identificador)=>{
            const res = await this.obter_unidade(termos)
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome:`${d.sigla} - ${d.nome}`}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, unidade_id, nome, ()=>{
            this.inp_setor.focus();
        });
        this.inp_setor = new InputMF('SETOR:', d_setor, async (termos, identificador)=>{
            const res = this.inp_unidade.id ? await this.obter_setores(termos, this.inp_unidade.id) : null;
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome:`${d.sigla} - ${d.nome}`}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        });
        this.inp_user = new InputMF('USUÁRIO:', d_usuario, async (termos, identificador)=>{
            const res = this.inp_setor.id ? await this.obter_usuarios(termos, this.inp_setor.id) : null;
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`}});
                return {dados, identificador};
            }
            return {dados:[], identificador};
        });
        this.inp_user.disabled = true;
        this.inp_unidade.onchange = async ()=>{
            bt_redis.disabled = !validar();
            this.inp_user.clear();
            this.inp_setor.clear();
            const ids_unidades = this.profile.colaborador.lotacoes.map(d=>d.setor.unidade.id);
            if (tem_lotacao(this.inp_unidade.id)) { // Usuario tambem tem lotacao na unidade de destino
                this.inp_setor.disabled = false;
                this.inp_setor.clear();
                this.inp_setor.focus();
            }
            else {
                this.inp_user.disabled = true;
                const res = await this.super_get(this.get_buscar_setor("PROTOCOLO", this.inp_unidade.id), true, true);
                this.inp_setor.id = res.id;
                this.inp_setor.nome = res.nome;
                this.inp_unidade.disabled = false;
                this.inp_setor.disabled = this.inp_user.disabled = true;
            }
        }
        this.inp_setor.onchange = ()=>{
            bt_redis.disabled = !validar();
            console.log("tem lotacao", tem_lotacao(this.inp_unidade.id));
            console.log("ID setor", this.inp_setor.id);
            if (tem_lotacao(this.inp_unidade.id)) {
                this.inp_user.disabled = false;
                this.inp_user.focus();
            }
            else {
                this.inp_user.disabled = true;
            }
        };
        this.inp_unidade.focus();
        this.inp_unidade.oninput = ()=>{
            this.inp_setor.clear();
            this.inp_user.clear();
        }
        this.inp_setor.oninput = ()=>this.inp_user.clear();
        this.inp_user.onchange = ()=>{
            bt_redis.disabled = !validar();
        }
        const bt_redis = new MFt.bt({
            value: 'Redistribuir',
            width: 150,
            height: 30,
            marginTop: '20px',
            marginLeft: '20px',
            disabled: false,
            wrapper: MFt.criaElem('div', null, container),
            callback: ()=>{
                this.redistribuir(this.inp_unidade.id, this.inp_setor.id, this.inp_user.id, container);
            }
        });
    }

    async obter_unidade(termos) {
        return await this.super_get(this.get_unidades(termos), true);
    }

    async obter_setores(termos, id_unidade) {
        return await this.super_get(this.get_buscar_setor(termos, id_unidade), true);
    }

    async obter_usuarios(termos, id_setor) {
        return await this.super_get(this.get_buscar_usuarios(termos, id_setor), true);
    }

    async redistribuir(id_unidade, id_setor, id_usuario, wrapper) {
        wrapper.style.display = 'none';
        const wp = MFt.criaElem('div', {
            style: {
                height: '150px',
                overflowX: 'hidden',
                overflowY: 'scroll',
                fontSize: '14px'
            }
        }, this.wrapper);
        MFt.criaElem('div', {
            innerText: 'Redistribuindo processos',
            style: {fontWeight: "bold", margin: '5px 0 0 10px'}
        }, wp);
        for(let t of this.tarefas) {
            console.log(t);
            const d1 = MFt.criaElem('div', {

            }, wp);
            const s1 = MFt.criaElem('div', {
                innerText: `Redistribuindo NUP ${this.formatanup(t.processo.NUP)}`,
                style: {
                    margin: '0 5px 0 10px'
                }
            }, d1);
            //const res = await this.esperar(1000);
            const dataHoraFinalPrazo = this.valida_data_hora(t.dataHoraFinalPrazo);
            const dataHoraInicioPrazo = this.valida_data_hora(t.dataHoraInicioPrazo);
            const distribuicaoAutomatica = false;
            const especieTarefa = t.especieTarefa.id;
            const prazoDias = (()=>{
                let agora = new Date();
                agora.setHours(0, 0, 0, 0, 0);
                let fim = this.valida_data_hora(t.dataHoraFinalPrazo);
                fim.setHours(0,0,0,0);
                return MFt.dates.daydiff(agora, fim);
            })();
            const processo = t.processo.id;
            const setorOrigem = t.setorResponsavel.id;
            const setorResponsavel = id_setor;
            const urgente = false;
            const res = await this.super_get(this.criar_tarefa(dataHoraInicioPrazo, dataHoraFinalPrazo, prazoDias, especieTarefa, processo, id_usuario, setorOrigem, setorResponsavel));
            console.log(res);
            if (res?.message) {
                const s2 = MFt.criaElem('div', {
                    innerText: `${res.message}`,
                    style: {
                        fontWeight: 'bold',
                        color: 'red',
                        margin: '0 0 10px 30px'
                    }
                }, d1);
            }
            else {
                const s2 = MFt.criaElem('div', {
                    innerText: `Redistribuiçao Ok`,
                    style: {
                        fontWeight: 'bold',
                        color: 'green',
                        margin: '0 0 10px 30px'
                    }
                }, d1);
            }
        }
    }
}