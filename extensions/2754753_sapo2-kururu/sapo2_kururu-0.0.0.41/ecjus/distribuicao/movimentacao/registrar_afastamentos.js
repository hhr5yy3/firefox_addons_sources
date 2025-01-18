class RegistrarAfastamentos extends Comuns {
    constructor(enviar_automatico=false, auth, profile) {
        super(auth, profile);
        this.automatico = MFt.urlArgs()['automatico'] === 'sim';
        this.beep = new Audio('../../../images/beep.wav'); // Carrega o arquivo de audio
        this.enviar_automatico = enviar_automatico;
        this.unidade = {};
        this.id_unidade = parseInt(MFt.urlArgs().id_unidade);
        this.advogados = [];
        this.advs_afastados_sapiens = [];
        this.advs_afastados_mp = [];
        this.dados_afastamentos = [];
        this.setores_juridicos = [];
        this.rodada_atual = 0;
        this.todos_dados_coletados = false;
    }

    async init() {
        return new Promise(async rr=>{
            await super.init();
            const pop = new PopUp(500, 100, null, null, async form=>{
                console.log('POPUP Obtendo dados de afastamento ABERTO');
                form.div.innerText = 'Obtendo dados da unidade...';
                this.unidade = await this.super_get(this.get_unidade_pelo_id(this.id_unidade), true, true);
                form.div.innerText = 'Obtendo setores jurídicos...';
                this.setores_juridicos = await this.obter_setores_juridicos(this.id_unidade);
                console.log(this.setores_juridicos);
                form.div.innerText = 'Obtendo afastamentos...';
                let tmp = await this.obter_afastamentos_sapiens(this.setores_juridicos);
                this.advogados = tmp.advs;
                this.advs_afastados_sapiens = tmp.advs_afastados;
                this.advs_afastados_mp = tmp.advs_afastados_mp;
                form.div.innerText = 'Obtendo advogados para distribuir...';
                this.advogados = await this.procurar_advogados_para_distribuir(this.advogados, this.id_unidade);
                this.rodada_atual = this.advogados[0].rodadas.length;
                if (this.rodada_encerrada(this.advogados)) this.rodada_atual++;
                console.log(`%cRODADA ATUAL: ${this.rodada_atual}`, 'font-weight: bold;');
                this.dados_afastamentos = await this.preparar_dados();
                this.todos_dados_coletados = true;
                if (this.enviar_automatico) {
                    this.enviar_afastamentos(() => {
                        form.div.innerText = 'Afastamentos registrados.';
                        setTimeout(() => {
                            form.closeWindow(form);
                            console.log('POPUP Obtendo dados de afastamento FECHADO');
                        }, 1000);
                    });
                }
                else {
                    form.closeWindow(form);
                    console.log('POPUP Obtendo dados de afastamento FECHADO');
                    rr(true);
                }
                return;
                this.obter_nome_unidade(()=>{
                    this.obter_setores_juridicos(setores=>{
                        this.setores_juridicos = setores;
                        this.obter_afastamentos_sapiens(setores, ()=>{
                            this.obter_motivos_afastamentos_sapiens(()=>{
                                console.group('SAPIENS: AFASTAMENTOS');
                                console.log(this.advs_afastados_sapiens);
                                console.groupEnd();
                                this.obter_afastamentos_mp(()=>{
                                    console.log(this.advs_afastados_mp);
                                    this.procurar_advogados_para_distribuir(setores[0].id, advs_aptos=>{
                                        this.rodada_atual = advs_aptos[0].rodadas.length;
                                        if (this.rodada_encerrada(advs_aptos)) this.rodada_atual++;
                                        console.log('RODADA ATUAL:', this.rodada_atual);
                                        this.preparar_dados();
                                        this.todos_dados_coletados = true;
                                        if (this.enviar_automatico) {
                                            this.enviar_afastamentos(() => {
                                                MFt.clear(this.form.div);
                                                this.form.div.innerText = 'Afastamentos registrados.';
                                                setTimeout(() => {
                                                    this.form.closeWindow(this.form);
                                                }, 1000);
                                            });
                                        }
                                        else {
                                            this.form.closeWindow(this.form);
                                            if (typeof cb === 'function') cb();
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
            pop.iniciar(pop);
        });
    }


    obter_nome_unidade(cb) {
        this.sapiens_route(new Payloads().getUnidadeID(this.id_unidade), ds=>{
            if (ds) {
                this.unidade = ds[0];
                cb();
            }
            else alert('Erro ao obter o nome da unidade no Sapiens');
        })
    }

    /**
     * Povoa a lista dos advogados com as informações sobre afastamento
     * Nessa lista, constam ainda os dados sobre a distribuicao para eles
     * @param raw_lista_adv {Object[]}
     * @param id_unidade {number}
     * @return {Array<Object>}
     */
    async procurar_advogados_para_distribuir(raw_lista_adv, id_unidade){
        if (this.tipo(raw_lista_adv) !== '[object Array]') throw new Error('Tipo errado');
        const adv_apt = new AdvogadosAptos2(raw_lista_adv, id_unidade);
        await adv_apt.init();
        return adv_apt.advs;
    }

    /**
     * Recebe os advogados aptos de "procurar_advogados_para_distribuir" e diz se a rodada esta completa ou nao
     * @param advs_aptos {Array}
     * @returns {boolean}
     */
    rodada_encerrada(advs_aptos) {
       let retorno = true;
       for(let i = 0; i < advs_aptos.length; i++) {
           if (advs_aptos[i].rodadas[advs_aptos[i].rodadas.length - 1] < 1) {
               retorno = false;
               break;
           }
       }
       return retorno;
    }

    async preparar_dados() {
        console.log(this.advs_afastados_sapiens);
        let dados = [];
        let h = new Date();
        let pad = s=>{
            return '00'.substr(0, 2 - s.toString().length) + s.toString();
        };
        let hoje = `${h.getFullYear()}-${pad(h.getMonth() + 1)}-${pad(h.getDate())} 00:00:00`;
        let get_dados = id_adv=>{
            for(let i = 0; i < this.advogados.length; i++) {
                if (this.advogados[i].id === id_adv) return {
                    rodada_distribuicao: this.rodada_atual,
                    id_usuario_entrada: this.advogados[i].id,
                    id_unidade: parseInt(this.id_unidade),
                    id_setor: this.setores_juridicos[0].id,
                    nome_usuario_entrada: this.advogados[i].nome,
                    nome_unidade: this.unidade.nome,
                    nome_setor: this.setores_juridicos[0].nome,
                    nup: null,
                    uso_futuro_1: 8, // Sapiens
                    data_hora_distribuicao: hoje
                };
            }
            alert('Erro!');
            throw new Error('Advogado nao encotrado na lista, mas deveria estar');
        };
        for(let as of this.advs_afastados_sapiens) {
            let afast_super = await this.super_get(this.get_afastamentos(as.colaborador.id), true);
            console.log(afast_super);
            dados.push({
                rodada_distribuicao: this.rodada_atual,
                id_usuario_entrada: as.id,
                id_unidade: parseInt(as.id_unidade),
                id_setor: as.id_setor,
                nome_usuario_entrada: as.nome,
                nome_unidade: this.unidade.nome,
                nome_setor: as.nome_setor,
                nup: null,
                observacao: as.afastamento_sapiens.motivo,
                uso_futuro_1: 1, // Sapiens
                data_hora_distribuicao: hoje
            });
        }
        const advs_afastados_mp_tmp = this.advs_afastados_mp.filter(d=>d.length);
        for(let i = 0; i < advs_afastados_mp_tmp.length; i++) {
            let tmp = get_dados(advs_afastados_mp_tmp[i][0][1]);
            tmp.observacao = advs_afastados_mp_tmp[i][0][4];
            dados.push(tmp);
        }
        return dados;
    }

    enviar_afastamentos(cb) {
        let i = 0;
        MFt.clear(this.form.div);
        let enviar = ()=>{
            this.form.div.innerText = `${this.dados_afastamentos[i].nome_usuario_entrada} (${i+1}/${this.dados_afastamentos.length})`;
            this.xml_registrar_compensacao(this.dados_afastamentos[i], ()=>{
                i++;
                if (i < this.dados_afastamentos.length) enviar();
                else cb();
            });
        };
        if (this.dados_afastamentos.length) enviar();
        else cb();
    }

    enviar_afastamentos_individual(dados, form) {
        let enviar = ()=>{
            MFt.clear(form.div);
            MFt.criaElem('div', {
                innerText: 'Registrando afastamento de:'
            }, form.div);
            MFt.criaElem('div', {
                innerHTML: dados.nome_usuario_entrada,
                style: {fontWeight: 'bold'}
            }, form.div);
            this.xml_registrar_compensacao(dados, ()=>{
                MFt.criaElem('div', {
                    innerHTML: 'Afastamento registrado',
                    style: {fontWeight: 'bold', color: 'blue'}
                }, form.div);
                setTimeout(()=>{
                    // form.closeWindow(form);
                    location.reload();
                }, 1000);
            });
        };
        let perguntar = ()=>{
            this.beep.play();
            MFt.clear(form.div);
            MFt.criaElem('div', {
                innerText: 'Registro o afastamento de'
            }, form.div);
            MFt.criaElem('div', {
                innerHTML: `${dados.nome_usuario_entrada} ?`,
                style: {fontWeight: 'bold'}
            }, form.div);
            let d1 = MFt.criaElem('div', {

            }, form.div);
            let sim = new MFt.bt({
                value: 'Sim',
                width: 100,
                height: 30,
                wrapper: d1,
                callback: ()=>{
                    enviar();
                }
            });
            let nao = new MFt.bt({
                value: 'Depois',
                width: 100,
                height: 30,
                marginLeft: '15px',
                wrapper: d1,
                callback: ()=>{
                    form.closeWindow(form);
                }
            });
        };
        if (!form) {
            let form = new PopUp(400, 80, null, null, tmp_form=>{
                form = tmp_form;
                if (!this.automatico) perguntar();
                else enviar();
            });
        }
        else {
            if (!this.automatico) perguntar();
            else enviar();
        }

    }

    xml_registrar_compensacao(dados, cb){
        dados.task = 'registrar_compensacao_com_rodada';
        MFt.xml({
            url: mp,
            get: dados,
            callback: (d)=>{
                if (d && d.ok) {
                    console.log(d);
                    cb();
                }
                else if (d && d.erro) alert(d.erro);
                else alert('Falha de comunicação com o Servidor');
            }
        });
    }

}