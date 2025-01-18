class LancarAtividade extends Payloads {
    constructor(pai, msg='', iniciarAutomatico=true) {
        console.log('lancar_atividade.js - init()');
        super();
        this.ampulheta = new Image(30, 30);
        this.ampulheta.src = 'https://manoelpaz.com/images/throbber_13.gif';
        this.ampulheta.style.width = this.ampulheta.style.height = '30px';
        this.pai = pai;
        this.msg = msg || '';
        this.wrapper = undefined;
        this.tarefas = pai.tarefas_selecionadas();
        this.rel_usuarios = []; // relacao de usuarios que irao receber as tarefas
        this.setores_unidade = [];
        this.xml = new RequestMF();
        if (this.tarefas?.length > 0) {
            if (iniciarAutomatico) this.init();
        }
        else {
            const msg = new MsgGenerica('Nenhuma tarefa selecionada', 240, 22, null, null);
            msg.div.style.fontSize = '16px';
            setTimeout(()=>msg.closeWindow(msg), 1500);
        }
        Object.defineProperties(this, {
            mp_url: {get: ()=>'https://manoelpaz.com/cgi-bin/agu/super/super'}
        });
    }

    init() {
        return new Promise(async rr=>{
            console.log(this.tarefas);
            if (this.pai.disable_checkboxes) this.pai.disable_checkboxes();
            this.pop = this.pai.open_quadro_opcoes(640, 'Lançar Atividade');
            this.pop.aceitaEsc = this.pop.clicafora_sair = false;
            this.wrapper = this.pop.div;
            this.wrapper.style.fontFamily = 'Titillium Web,Patrick Hand,Muli,Helvetica Neue,Arial,sans-serif';
            if (Number.isInteger(this.tarefas[0].especieTarefa.generoTarefa.id) && this.tarefas[0].especieTarefa.generoTarefa.id !== 2) {
                if (confirm('Deseja converter a tarefa em Consultiva?')) {
                    this.pop.div.innerText = 'Convertendo em tarefa consultiva...';
                    const res = await this.super_get(new RequestMF(), this.converter_tipo_tarefa(this.tarefas[0], 131));
                    console.log(res);
                    if (Number.isInteger(res?.id)) {
                        this.pop.div.innerText = 'OK!';
                        await this.esperar(1000);
                    }
                    else {
                        this.pop.div.innerText = 'Tarefa não convertida. Não será possível lançar atividade consultiva.';
                        await this.esperar(2000);
                    }
                    MFt.clear(this.pop.div);
                }
            }
            this.setores_unidade = await this.super_get(this.xml, this.get_setores(this.tarefas[0].setorResponsavel.unidade.id), true);
            const tempTarefas = await this.super_get(this.xml, this.get_tarefa(this.tarefas[0].id), true);
            if (Number.isInteger(tempTarefas?.id)) this.tarefas[0] = tempTarefas;
            MFt.clear(this.wrapper);
            //
            let desbloquear;
            if (this.pai?.pop instanceof PopUp) {
                // Se o pai tiver criado um PopUp e fornecido a area dele, vale-se do desbloquear para esperar os dados de sugestao de preenchimento
                desbloquear = this.pai.pop.bloquear(this.pai.pop, "Aguarde...");
            }
            const esta_logado = await this.super_get(new RequestMF(), this.get_complemento("srp"), true);
            console.log(esta_logado);
            if (!Array.isArray(esta_logado)) {
                this.wrapper.innerText = "Parece não haver login válido no Super.";
                console.log(`Exp: ${localStorage.getItem("exp")}`);
                console.log(`localBrowserExp: ${localStorage.getItem("localBrowserExp")}`);
                console.log(`token_expire: ${localStorage.getItem("token_expire")}`);
                return;
            }
            this.sugestao_de_preenchimento(this.tarefas[0]).then(sugestao=>{
                console.group("DADOS SUGERIDOS");
                console.log(sugestao);
                console.log(!isNaN(sugestao?.idSetorDestino));
                console.log(isNaN(sugestao?.idSetorDestino));
                console.log(sugestao?.idSetorDestino);
                console.groupEnd();
                if (!sugestao) {
                    console.warn('Nao houve sugestao de atividade');
                    // return;
                }
                if (!isNaN(sugestao?.idTipoAtividade)) {
                    this.inp_atividade.inp = sugestao.nomeTipoAtividade;
                    this.inp_atividade.id = parseInt(sugestao.idTipoAtividade);
                }
                if (sugestao?.idComplemento) {
                    this.inp_complemento.inp = sugestao.nomeComplemento;
                    this.inp_complemento.id = parseInt(sugestao.idComplemento);
                    this.inp_complemento.disabled = false;
                }
                if (!isNaN(sugestao?.idTipoTarefa)) {
                    this.inp_tarefa.inp = sugestao.nomeTipoTarefa;
                    this.inp_tarefa.id = parseInt(sugestao.idTipoTarefa);
                }
                if (!isNaN(sugestao?.idUnidade)) {
                    this.inp_unidade.inp = sugestao.nomeUnidade;
                    this.inp_unidade.id = parseInt(sugestao.idUnidade);
                }
                if (sugestao?.idSetorDestino && !isNaN(sugestao?.idSetorDestino)) {
                    this.inp_setor.inp = sugestao.nomeSetor;
                    this.inp_setor.id = parseInt(sugestao.idSetorDestino);
                    this.inp_setor.disabled = false;
                    this.rel_usuarios = [];
                    MFt.clear(d_usuarios);
                    this.exibir_usuarios(d_usuarios, this.inp_setor.id);
                }
                if (sugestao?.prazo) {
                    this.inp_prazo_dias.value = sugestao.prazo.toString();
                }
                this.verificar_dados();
                if (desbloquear) desbloquear();
            });
            const pesquisarTexto = (textoMenor, textoMaior) => { // retorna verdadeiro se todas as palavras do textoMenor estao tambem no textoMaior
                const itensTexto = textoMenor.split(" ");
                let achados = 0;
                textoMaior = this.ascii_mf(textoMaior).toLowerCase();
                for(let i of itensTexto) if (textoMaior.indexOf(this.ascii_mf(i).toLowerCase()) >= 0) achados++;
                return achados === itensTexto.length;
            };
            const d0 = MFt.criaElem('div', null, this.wrapper);
            // Titulo da JANELA --------------------------------------------------------------
            if (this.msg && typeof this.msg === 'object' && this.msg?.msg) {
                const m = MFt.criaElem('div', {innerText: this.msg.msg}, d0);
                console.log("====================================================");
                if (this.msg?.style && typeof this.msg.style === 'object') MFt.atribs(m, {style:this.msg.style});
                //console.log(this.msg.style);
                //console.log(typeof this.msg.style);
            }
            // -------------------------------------------------------------------------------
            const d1 = MFt.criaElem('div', null, this.wrapper);
            const unidade_id = this.tarefas?.length === 1 ? this.tarefas[0].setorResponsavel.unidade.id : null;
            const nome = this.tarefas?.length === 1 ? `${this.tarefas[0].setorResponsavel.unidade.sigla} - ${this.tarefas[0].setorResponsavel.unidade.nome}` : null;
            const d_atividade = MFt.criaElem('div', {style:{}}, d1);
            const d_complemento = MFt.criaElem('div', {style:{}}, d1);
            const d_observacao = MFt.criaElem('div', {style:{}}, d1);
            const d_separador = MFt.criaElem('div', {style:{display: "flex", justifyContent: "center"}}, d1);
            const d_tarefa = MFt.criaElem('div', {style:{}}, d1, {nome: 'd_tarefa'});
            const d_unidade = MFt.criaElem('div', {style:{}}, d1);
            const d_setor = MFt.criaElem('div', {style:{}}, d1);
            const d_obs_tarefa = MFt.criaElem('div', {style:{}}, d1);
            const d_usuarios = MFt.criaElem('div', {style:{}}, d1);
            const d_prazo = MFt.criaElem('div', {style:{}}, d1);
            this.inp_atividade = new InputMF('ATIVIDADE:', d_atividade, async (termos, identificador)=>{
                const res = await this.obter_atividade(termos);
                if (res) {
                    const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                    return {dados, identificador};
                }
                return {dados: [], identificador};
            }, null, null);
            this.inp_complemento = new InputMF('COMPLEMENTO:', d_complemento, async (termos, identificador)=>{
                const res = this.inp_atividade.id ? await this.super_get(this.xml, this.get_complemento(termos), true) : null;
                if (res) {
                    const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                    return {dados, identificador};
                }
                return {dados: [], identificador};
            });
            this.inp_observacao = this.criar_input_normal('OBSERVAÇÃO:', d_observacao);
            this.inp_complemento.disabled = true;
            // this.inp_atividade.focus();
            this.inp_atividade.oninput = ()=>{
                this.inp_complemento.clear();
                this.verificar_dados();
            };
            this.inp_atividade.onchange = (t)=>{
                if (this.inp_atividade.item?.tudo?.generoAtividade?.nome === 'CONSULTIVO') {
                    this.inp_complemento.disabled = false;
                    // this.inp_complemento.focus();
                }
                else {
                    if (!this.inp_complemento.id) this.inp_complemento.disabled = true; // O if foi colocado para as situações em que o computador sugere, porque nesse caso não há o this.inp_atividade.item?.tudo?.generoAtividade?.nome
                    // this.inp_observacao.focus();
                }
                this.verificar_dados();
            };
            MFt.criaElem('div', {
                style: {
                    border: 'none',
                    borderBottom: "2px dashed #FCC",
                    width: '95%',
                    padding: "5px 0"
                }
            }, d_separador);
            this.inp_tarefa = new InputMF('TAREFA:', d_tarefa, async (termos, identificador)=>{
                const res = await this.super_get(this.xml, this.get_buscar_tipo_tarefa(termos), true);
                if (res) {
                    const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                    return {dados, identificador};
                }
                return {dados: [], identificador};
            }, null, null);
            this.inp_unidade = new InputMF('UNIDADE:', d_tarefa, async (termos, identificador)=>{
                const r1 = await this.super_get(this.xml, this.get_unidades(termos), true);
                const r2 = (()=>{
                    let r = [];
                    /*
                    Se uma tarefa está sendo criada entre setores de uma mesma unidade, permite-se a seleção de qualquer setor dentro daquela unidade.
                    Mas se é entre unidades diferentes, o setor protocolo é selecionado automaticamente após a seleção da unidade.
                    Quero permitir que o usuário selecione o setor de origem dentro da Unidade Destino e que o programa corrija esse erro do usuário (que eu já cometi).
                     */
                    if (!this.setores_unidade.length) return r;
                    for(let s of this.setores_unidade) {
                        if (pesquisarTexto(termos, s.sigla)) r.push({id: s.id, nome: s.nome, tudo:s.unidade, id_swap: s.unidade.id, nome_swap: s.unidade.nome});
                        else if (pesquisarTexto(termos, s.nome)) r.push({id: s.id, nome: s.nome, tudo:s.unidade, id_swap: s.unidade.id, nome_swap: s.unidade.nome});
                    }
                    return r;
                })();
                if (r1 || r2.length) {
                    const dados = r2.concat(r1.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}}));
                    console.log(dados);
                    return {dados, identificador};
                }
                // if (r1) {
                //     const dados = r1.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                //     return {dados, identificador};
                // }
                return {dados: [], identificador};
            }, null, null);
            this.inp_setor = new InputMF('SETOR:', d_tarefa, async (termos, identificador)=>{
                const res = await this.super_get(this.xml, this.get_buscar_setor(termos, this.inp_unidade.id), true);
                if (res) {
                    if (this.inp_setor.value.split(' ').length === 1) { // Quando se coloca uma unica palavra, se essa bater com a sigla do setor apenas esse item vai ser exibido
                        const unico = res.filter(d=>{
                            console.log(`${this.ascii_mf(d.sigla.trim()).toUpperCase()} === ${this.ascii_mf(this.inp_setor.value.trim()).toUpperCase()}`);
                            return this.ascii_mf(d.sigla.trim()).toUpperCase() === this.ascii_mf(this.inp_setor.value.trim()).toUpperCase();
                        });
                        console.log(unico);
                        console.log(unico.length);
                        if (unico.length === 1) return {dados: [{id: unico[0].id, nome: `${unico[0]?.sigla ? `${unico[0]?.sigla} - `: ''}${unico[0].nome}`, tudo: unico}], identificador};
                        else {
                            const dados = res.map(d=>{return {id:d.id, nome:`${d?.sigla?`${d.sigla} - `:''}${d.nome}`, tudo: d}});
                            return {dados, identificador};
                        }
                    }
                    else {
                        const dados = res.map(d=>{return {id:d.id, nome:`${d?.sigla?`${d.sigla} - `:''}${d.nome}`, tudo: d}});
                        return {dados, identificador};
                    }
                }
                return {dados: [], identificador};
            }, null, null);
            this.inp_obs_tarefa = this.criar_input_normal("OBSERVAÇÃO:", d_obs_tarefa);
            this.inp_prazo_dias = this.criar_elem_prazo(d_prazo);
            this.inp_setor.disabled = true;
            this.inp_tarefa.onchange = ()=>this.verificar_dados();
            this.inp_complemento.onchange = ()=>this.verificar_dados();
            this.inp_unidade.oninput = ()=>{
                MFt.clear(d_usuarios);
                this.inp_setor.clear();
                this.verificar_dados();
            };
            this.inp_setor.oninput = ()=>{
                MFt.clear(d_usuarios);
                this.verificar_dados();
            };
            this.inp_unidade.onchange = async ()=>{
                this.rel_usuarios = [];
                console.log('THIS.INP_UNIDADE.ONCHANGE');
                MFt.clear(d_usuarios);
                console.log(this.profile.colaborador.lotacoes);
                const ids_unidades = this.profile.colaborador.lotacoes.map(d=>d.setor.unidade.id);
                console.log('IDs UNIDADES: ', ids_unidades);
                const distribuicao_interna = (()=>{
                    return this.tarefas[0].setorResponsavel.unidade.id === this?.inp_unidade?.item?.tudo?.id;
                })();
                if (this?.inp_unidade?.item?.tudo?.id && distribuicao_interna) { // Quando o usuario tambem tem lotacao na unidade selecionada
                    this.inp_setor.disabled = false;
                    if (this.inp_unidade?.item?.id_swap && this.inp_unidade?.item?.nome_swap) { // Aqui o programa seleciona automaticamente o setor a partir do erro do usuário no campo iDestino
                        this.inp_setor.id = this.inp_unidade.item.id_swap;
                        this.inp_setor.nome = this.inp_unidade.item.nome_swap;
                        this.inp_setor.disabled = true;
                        if (this.inp_setor?.id) {
                            this.exibir_usuarios(d_usuarios, this.inp_setor.id);
                            this.inp_unidade.disabled = this.inp_tarefa.disabled = false;
                        }
                    }
                    else {
                        const setores = async (identificador) => {
                            const res = await this.super_get(this.xml, this.get_setores(this.inp_unidade.item.tudo.id), true);
                            const dados = res.map(d => {
                                return {id: d.id, nome: `${d?.sigla ? `${d.sigla} - ` : ''}${d.nome}`, tudo: d}
                            });
                            return {dados, identificador};
                        };
                        this.inp_setor.clear();
                        // this.inp_setor.focus();
                        this.inp_setor.set_options(setores);
                    }
                }
                else if (this?.inp_unidade?.item?.tudo?.id) { // Quando o usuario nao tem lotacao na unidade selecionada, considero que o processo so pode ir pelo protocolo
                    this.inp_unidade.disabled = this.inp_tarefa.disabled = true;
                    this.inp_setor.clear_options();
                    const res = await this.super_get(this.xml, this.get_buscar_setor("PROTOCOLO", this.inp_unidade.id), true, true);
                    this.inp_setor.id = res.id;
                    this.inp_setor.nome = res.nome;
                    this.inp_setor.disabled = true;
                    this.exibir_usuarios(d_usuarios, this.inp_setor.id);
                    this.inp_unidade.disabled = this.inp_tarefa.disabled = false;
                }
                this.verificar_dados();
            };
            this.inp_setor.onchange = ()=>{
                this.rel_usuarios = [];
                MFt.clear(d_usuarios);
                this.exibir_usuarios(d_usuarios, this.inp_setor.id);
                this.verificar_dados();
            };
            const div_botoes = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto auto'
                }
            }, d1);
            this.bt_lancamento = new MFt.bt({
                value: 'Apenas Lançar Atividade', // Este valor muda conforme o caso
                width: 285,
                height: 30,
                marginTop: '20px',
                marginLeft: '20px',
                disabled: true,
                wrapper: MFt.criaElem('div', null, div_botoes),
                callback: async ()=>{
                    this.pop.aceitaEsc = this.pop.clicafora_sair = false;
                    console.log(this.inp_unidade.id, this.inp_setor.id, this.rel_usuarios, this.tarefas);
                    console.log(this.profile.id);
                    btCancelar.disabled = true;
                    this.lancar_atividade_criar_tarefas(this.inp_atividade.id, this.inp_complemento.id, this.inp_observacao.value, this.rel_usuarios, this.tarefas, this.inp_unidade.id, this.inp_setor.id, this.inp_tarefa.id, this.inp_obs_tarefa.value, parseInt(this.inp_prazo_dias.value), this.profile.id, d1);
                    for(let tt of this.tarefas) {
                        console.log(tt);
                        const minutas = await this.super_get(this.xml, this.get_minutas(tt.id), true);
                        const temMinuta = Array.isArray(minutas) && minutas.length;
                        const params = {
                            task: 'set_historico_atividades',
                            id_usr: this.profile.id,
                            id_tipo_atividade: this.inp_atividade.id,
                            nome_atividade: this.inp_atividade.value,
                            id_complemento: this.inp_complemento.id || '',
                            nome_complemento: this.inp_complemento.value.trim(),
                            id_tipo_tarefa: this.inp_tarefa.id || '',
                            nome_tipo_tarefa: this.inp_tarefa.value || '',
                            id_unidade: this.inp_unidade.id || '',
                            nome_unidade: this.inp_unidade.value || '',
                            id_setor: this.inp_setor.id || '',
                            nome_setor: this.inp_setor.value || '',
                            prazo: parseInt(this.inp_prazo_dias.value) || '',
                            id_setor_origem: tt?.setorOrigem?.id || '0', // Tarefas podem ser criadas pelo proprio Super sem origem
                            id_setor_responsavel: tt.setorResponsavel.id || '',
                            id_unidade_origem: tt?.setorOrigem?.unidade?.id || '0', // Tarefas podem ser criadas pelo proprio Super sem origem
                            inicio_nup: tt.processo.NUP.substring(0,5),
                            id_tipo_tarefa_original: tt.especieTarefa.id, // --------------
                            id_genero_tarefa: tt.especieTarefa.generoTarefa.id,
                            nup: tt.processo.NUP,
                            temMinuta,
                        };
                        // console.log(params);
                        const res = await this.request_mf(this.mp_url, params, 'post');
                        // console.log(res);
                    }
                    rr();
                }
            });
            const btCancelar = new MFt.bt({
                value: 'Cancelar',
                width: 120,
                height: 30,
                wrapper: MFt.criaElem('div', null, div_botoes),
                callback: ()=>{
                    this.pop.closeWindow(this.pop);
                    rr();
                }
            });
        });
    }

    async obter_atividade(termos) {
        return await this.super_get(this.xml, this.get_buscar_tipo_atividade(termos), true);
    }

    async exibir_usuarios(wp, id_setor) {
        MFt.clear(wp);
        const d1 = MFt.criaElem('div', {
            style: {
                margin: '0 0 0 20px'
            }
        }, wp);
        MFt.criaElem('div', {
            innerText: "USUÁRIOS: ",
            style: {fontWeight: "bold"}
        }, d1);
        const d3 = MFt.criaElem('div', {
            style: {
                border: '1px solid #CCC',
                padding: "10px 10px 10px 5px",
                margin: '0 40px 0 20px',
                height: "180px",
                borderRadius: "4px",
                display: "flex",
                flexFlow: "column",
                flexWrap: "wrap",
                overflowY: 'hidden',
                overflowX: 'auto',
                width: '90%'
            }
        }, d1);
        MFt.atribs(wp, {
            style: {
                border: 'none',
                padding: "0px",
                margin: "0px"
            }
        });
        d3.appendChild(this.ampulheta);
        const res = await this.super_get(this.xml, this.get_usuarios_setor(id_setor), true);
        console.log(res);
        MFt.clear(d3);
        if (res) {
            let users = [{
                id: 0,
                nome: 'Distribuição automática'
            }];
            users = users.concat(res.map(d=>{return {id: d.id, nome: d.nome, afastado: !d.isDisponivel};}));
            for(let u of users) {
                const dd = MFt.criaElem('div', null, d3);
                const check = MFt.criaElem('input', {
                    type: "checkbox",
                    style: {
                        margin: "0 2px 0 5px"
                    }
                }, dd, {value: u.id});
                check.disabled = u.afastado;
                const s1 = MFt.criaElem('span', {
                    innerText: `${(u.id ? this.reduzir_nomes(u.nome) : u.nome)}${u.afastado ? " (AFASTADO)" : ""}`, // não reduzir nome quando for distribuição automática
                    style: {
                        cursor: "pointer",
                        marginLeft: "5px",
                        color: u.afastado ? "#BBB" : "#000"
                    }
                }, dd);
                s1.onclick = ()=>check.click();
                check.onclick = ()=>{
                    if (check.getAttribute("value") === "0") {
                        if (check.checked) {
                            for (let c of Array.from(d3.getElementsByTagName("input"))) {
                                if (c !== check) c.checked = false;
                            }
                            this.rel_usuarios = [];
                            this.rel_usuarios.push(0);
                        }
                        else this.rel_usuarios = this.rel_usuarios.filter(d=>d !== 0); // retira o 0 da relacao de usuario que vao receber a tarefa
                    }
                    else {
                        for(let c of Array.from(d3.getElementsByTagName("input"))) {
                            if (c.getAttribute("value") === "0") {
                                c.checked = false;
                                break;
                            }
                        }
                        if (check.checked) {
                            this.rel_usuarios = this.rel_usuarios.filter(d=>d !== 0); // retira o 0 da relacao de usuario que vao receber a tarefa
                            this.rel_usuarios.push(parseInt(check.getAttribute('value')));
                        }
                        else {
                            this.rel_usuarios = this.rel_usuarios.filter(d=>d !== parseInt(check.getAttribute("value")));
                        }
                    }
                    console.group("RELACAO DE USUARIOS");
                    for(let u of this.rel_usuarios) {
                        console.log(u);
                    }
                    console.groupEnd();
                    this.verificar_dados();
                };
            }
        }
        else {
            d3.innerText = "Sem usuários no setor!";
        }
    }

    verificar_dados() {
        console.group('VERIFICAR DADOS');
        console.log('this.inp_atividade.id', this.inp_atividade.id);
        console.log('this.inp_complemento.id', this.inp_complemento.id);
        console.log('this.inp_tarefa.id', this.inp_tarefa.id);
        console.log('this.inp_unidade.id', this.inp_unidade.id);
        console.log('this.inp_setor.id', this.inp_setor.id);
        console.log(this.rel_usuarios);
        console.groupEnd();
        this.bt_lancamento.disabled = true;
        if (this.inp_atividade.id && this.inp_complemento.disabled && (!this.inp_tarefa.id || !this.inp_unidade.id || !this.inp_setor)) {
            this.bt_lancamento.value = 'Apenas Lançar Atividade';
            this.bt_lancamento.disabled = false;
            return;
        }
        if (this.inp_atividade.id && this.inp_complemento.disabled === false && this.inp_complemento.id && (!this.inp_tarefa.id || !this.inp_unidade.id || !this.inp_setor)) {
            this.bt_lancamento.value = 'Apenas Lançar Atividade';
            this.bt_lancamento.disabled = false;
            return;
        }
        if (this.inp_atividade.id && this.inp_complemento.disabled && this.inp_tarefa.id && this.inp_unidade.id && this.inp_setor && this.rel_usuarios.length) {
            this.bt_lancamento.value = 'Lançar Atividade e Criar Tarefa';
            this.bt_lancamento.disabled = false;
            return;
        }
        if (this.inp_atividade.id && this.inp_complemento.disabled === false && this.inp_complemento.id && this.inp_tarefa.id && this.inp_unidade.id && this.inp_setor && this.rel_usuarios.length) {
            this.bt_lancamento.value = 'Lançar Atividade e Criar Tarefa';
            this.bt_lancamento.disabled = false;
            return;
        }
        console.log(this.inp_tarefa.id && (!Array.isArray(this.rel_usuarios) || !this?.rel_usuarios?.length));
        if (this.inp_tarefa.id && (!Array.isArray(this.rel_usuarios) || !this?.rel_usuarios?.length)) {
            this.bt_lancamento.disabled = true;
            return;
        }
        this.bt_lancamento.disabled = true;
    }

    lancar_atividade_criar_tarefas(id_atividade, id_complemento, obs_atividade, id_usuarios, tarefas, id_unidade, id_setor, id_tipo_tarefa, obs_tarefa, prazo_dias, id_usr, wrapper) {
        const main_div = wrapper.parentNode;
        const doit = async ()=>{
            const data_inicial = new Date();
            const data_final = this.calcular_prazo_2(prazo_dias).fim;
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            data_final.setHours(0,0,0,0); // apenas para calcular a diferenca
            prazo_dias = MFt.dates.daydiff(hoje, data_final);
            data_final.setHours(23, 59, 59, 0); // ultimo minuto do dia do prazo
            MFt.clear(main_div);
            const tabela = MFt.criaElem('table', {
                style: {
                    fontSize: '14px',
                    margin: '20px'
                }
            }, main_div);
            const tds = this.tds(['#', 'NUP', 'ATIVIDADE LANÇADA', 'TAREFAS CRIADAS'], MFt.criaElem('tr', null, tabela));
            MFt.atribs(tds, {
                style: {
                    padding: '3px 5px'
                }
            });
            const itens = [];
            for(let i = 0; i < tarefas.length; i++) {
                const t = tarefas[i];
                const minutas = await this.super_get(this.xml, this.get_minutas(t.id), true);
                const atividade = {
                    id_atividade,
                    id_complemento,
                    obs_atividade,
                    minutas,
                    tarefa: t
                };
                itens.push(new ItemAtividadeTarefa(i + 1, t, tabela, id_usuarios, atividade, minutas));
                // const item = itens[itens.length - 1];
            }
            for(let i of itens) {
                let res;
                for (let u of this.rel_usuarios) {
                    const tmp = {
                        data_inicial,
                        data_final,
                        prazo_dias,
                        id_tipo_tarefa,
                        id_processo: i.atividade.tarefa.processo.id,
                        id_usuario_responsavel: u,
                        id_setor_origem: i.atividade.tarefa.setorResponsavel.id,
                        id_setor_destino: id_setor,
                        obs_tarefa
                    };
                    console.log(tmp);
                    if (u === 0) {
                        res = await this.super_get(this.xml, this.get_criar_tarefa_dist_automatica(data_inicial, data_final, prazo_dias, id_tipo_tarefa, i.atividade.tarefa.processo.id, i.atividade.tarefa.setorResponsavel.id, id_setor, obs_tarefa));
                    }
                    else {
                        res = await this.super_get(this.xml, this.criar_tarefa(data_inicial, data_final, prazo_dias, id_tipo_tarefa, i.atividade.tarefa.processo.id, u, i.atividade.tarefa.setorResponsavel.id, id_setor, obs_tarefa));
                    }
                    if (!res) {
                        await this.esperar(5000);
                        res = await this.super_get(this.xml, this.criar_tarefa(data_inicial, data_final, prazo_dias, id_tipo_tarefa, i.atividade.tarefa.processo.id, u, i.atividade.tarefa.setorResponsavel.id, id_setor, obs_tarefa));
                        if (!res) {
                            alert('Erro de internet. Impossível continuar.');
                            return;
                        }
                    }
                    i.tarefa_criada();
                    this.request_mf(this.mp_url, {
                        task: 'set_historico',
                        evento: `Tarefa criada no NUP ${i.tarefa.processo.NUP}.`
                    });
                }
                const tmp = {
                    conclusao: new Date(),
                    minutas: i.atividade.minutas,
                    id_atividade,
                    id_tarefa: i.tarefa.id,
                    id_usr: this.profile.id,
                    obs_atividade
                };
                console.log(tmp);
                const minutas = i.atividade.minutas.map(d=>d.id);
                if (id_complemento && i.tarefa?.especieTarefa?.generoTarefa?.id === 2) { // 2 = Tarefa do genero consultivo
                    res = await this.super_get(this.xml, this.get_lancar_atividade_consultiva(new Date(), minutas, id_atividade, i.tarefa.id, id_complemento, this.profile.id, obs_atividade));
                }
                else {
                    res = await this.super_get(this.xml, this.lancar_atividade(new Date(), minutas, id_atividade, i.tarefa.id, this.profile.id, obs_atividade));
                }
                // res = await this.esperar(1000);
                if (!res) {
                    await this.esperar(5000);
                    if (id_complemento) {
                        res = await this.super_get(this.xml, this.get_lancar_atividade_consultiva(new Date(), minutas, id_atividade, i.tarefa.id, id_complemento, this.profile.id, obs_atividade));
                    }
                    else {
                        res = await this.super_get(this.xml, this.lancar_atividade(new Date(), minutas, id_atividade, i.tarefa.id, this.profile.id, obs_atividade));
                    }
                }
                if (!res) {
                    alert('Erro de internet no lançamento da atividade!\nImpossível continuar.');
                    break;
                }
                i.atividade_lancada();
                this.request_mf(this.mp_url, {
                    task: 'set_historico',
                    evento: `Atividade lançada no NUP ${i.tarefa.processo.NUP}.`
                });
            }
        };
        // ---------------------------------------------
        if (tarefas.length > 1) {
            wrapper.style.display = 'none';
            MFt.criaElem('div', {
                innerText: `Confirma a criação de tarefas em ${tarefas.length} processos?`,
                style: {
                    fontSize: '16px',
                    margin: '20px'
                }
            }, main_div);
            const d2 = MFt.criaElem('div', null, main_div);
            new MFt.bt({
                value: 'Sim',
                wrapper: d2,
                height: 30,
                width: 50,
                marginLeft: '20px',
                callback: ()=>{
                    main_div.innerText = 'Aguarde...';
                    doit()
                }
            });
            new MFt.bt({
                value: 'Não',
                wrapper: d2,
                height: 30,
                width: 50,
                marginLeft: '20px',
                callback: ()=>{
                    MFt.clear(main_div);
                    MFt.criaElem('div', {
                        innerText: 'Nenhuma atividade ou tarefa criada. Pode fechar a janela.'
                    }, main_div);
                }
            });
        }
        else doit();
    }

    /**
     *
     * @param tarefa_para_encerrar {Object} Tarefa como recebida do Super
     * @returns {Promise<*>}
     */
    async sugestao_de_preenchimento(tarefa_para_encerrar) {
        let sugestao_final;
        console.log(tarefa_para_encerrar);
        const inicioNup = nup=>{
            const n = this.validaNUP(nup);
            if (!n) throw new Error(`NUP invalido: ${nup}`);
            return parseInt(n.slice(0, 5));
        }
        const calcular_grau = tt=>{
            let retorno = tt;
            tt.grauSemelhanca = 0;
            // if (!tt.idTipoTarefa || !tt.nomeTipoTarefa) return retorno;
            if (tarefa_para_encerrar.especieTarefa.id === tt.idTipoTarefaOriginal) {
                retorno.grauSemelhanca += 25;
            }
            if (tarefa_para_encerrar?.setorOrigem?.id === tt.idSetorOrigem) {
                retorno.grauSemelhanca += 25;
            }
            if (tarefa_para_encerrar.setorResponsavel.id === tt.idSetorResponsavel) {
                retorno.grauSemelhanca += 25;
            }
            if (inicioNup(tarefa_para_encerrar.processo.NUP) === tt.inicioNup) {
                retorno.grauSemelhanca += 50;
            }
            if (tarefa_para_encerrar.especieTarefa.generoTarefa.id === tt.idGeneroTarefa) {
                retorno.grauSemelhanca += 25;
            }
            return retorno;
        }
        const url = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        const xml = new RequestMF();
        // TODO: Quero ver se implemento a sugestão de atividade e tarefa no servidor -------------------------------
        sugestao_final = await this.request_mf(url, {
            task: 'sugestao_tarefa_atividade',
            tarefa: JSON.stringify({
                id: tarefa_para_encerrar?.id,
                nup: tarefa_para_encerrar?.processo.NUP,
                id_especie: tarefa_para_encerrar?.especieTarefa?.id,
                id_genero: tarefa_para_encerrar?.especieTarefa?.generoTarefa?.id,
                id_setor_origem: tarefa_para_encerrar?.setorOrigem?.id,
                id_unidade_origem: tarefa_para_encerrar?.setorOrigem?.unidade?.id,
                id_setor_responsavel: tarefa_para_encerrar?.setorResponsavel?.id,
                id_unidade_setor_responsavel: tarefa_para_encerrar?.setorResponsavel?.unidade?.id
            }),
        });
        console.group("SUGESTAO SERVIDOR");
        console.log(sugestao_final);
        console.groupEnd();
        if (typeof sugestao_final === 'object' && Object.keys(sugestao_final).length) return sugestao_final;
        // -----------------------------------------------------------------------------------------------------------
        // A partir daqui solicita-se o histórico de dados do servidor para fazer o cálculo local
        // porque o servidor não retornou resultado útil.
        sugestao_final = undefined;
        const tarefas_atividades = await this.request_mf(url, {
            task: 'get_historico_atividades',
            dias: 365
        });
        // console.group('HISTORICO DE ATIVIDADES');
        // console.log(tarefas_atividades);
        // console.groupEnd();
        let graus = [];
        for(let t of tarefas_atividades) {
            graus.push(calcular_grau(t));
        }
        graus.sort((a,b)=>b.grauSemelhanca-a.grauSemelhanca);
        console.log(graus);
        if (Array.isArray(graus) && graus.length) {
            const todas_opcoes = graus.filter(d=>d.grauSemelhanca >= graus[0].grauSemelhanca);
            console.group('OPCOES =============================');
            console.log(todas_opcoes);
            console.groupEnd();
            let casos = {};
            for(let t of todas_opcoes) {
                if (!(t.idTipoAtividade.toString() in casos)) casos[t.idTipoAtividade.toString()] = [];
                casos[t.idTipoAtividade.toString()].push(t);
            }
            console.log(casos);
            let sugestoes_atividades;
            for(let c in casos) {
                if (casos.hasOwnProperty(c)) {
                    if (!sugestoes_atividades) {
                        sugestoes_atividades = casos[c];
                        continue;
                    }
                    if (casos[c].length > sugestoes_atividades.length) sugestoes_atividades = casos[c];
                }
            }
            let sugestoes_tarefas = {};
            console.log(sugestoes_atividades);
            for(let t of sugestoes_atividades) {
                const idTipoTarefa = isNaN(parseInt(t.idTipoTarefa)) ? "0" : parseInt(t.idTipoTarefa).toString();
                if (!(idTipoTarefa in sugestoes_tarefas)) sugestoes_tarefas[idTipoTarefa] = [];
                sugestoes_tarefas[idTipoTarefa].push(t);
            }
            console.log(sugestoes_tarefas);
            for(let c in sugestoes_tarefas) {
                if (sugestoes_tarefas.hasOwnProperty(c)) {
                    if (!sugestao_final) {
                        sugestao_final = sugestoes_tarefas[c];
                        continue;
                    }
                    if (sugestoes_tarefas[c].length > sugestao_final.length) sugestao_final = sugestoes_tarefas[c];
                }
            }
            console.log(sugestao_final);
            if (Array.isArray(sugestao_final)) sugestao_final = sugestao_final[0]; // Todos os itens da Array devem ser iguais.
            return sugestao_final;
        }
    }
}























class ItemAtividadeTarefa extends Tudo2 {
    constructor(indice, tarefa, tabela, usuarios, atividade, minutas) {
        super();
        this.indice = indice;
        this.tarefa = tarefa;
        this.tabela = tabela;
        this.usuarios = usuarios;
        this.atividade = atividade;
        this.minutas = minutas;
        this.ampulheta = new Image(15, 15);
        this.ampulheta.style.width = this.ampulheta.style.height = '30px';
        this.ampulheta.src = 'https://manoelpaz.com/images/throbber_13.gif';
        this.certo = new Image(15, 15);
        this.certo.src = 'https://manoelpaz.com/images/certo.png';
        this.num_tarefas_criadas = 0;
        this.init();
    }

    init() {
        const tr = MFt.criaElem('tr', null, this.tabela);
        this.td1 = MFt.criaElem('td', {
            innerText: `${this.indice}`,
            style: {
                textAlign: 'center',
                padding: '3px 5px'
            }
        }, tr);
        this.td2 = MFt.criaElem('td', {
            style: {
                padding: '3px 5px'
            }
        }, tr);
        this.td3 = MFt.criaElem('td', {
            style: {
                textAlign: 'center',
                padding: '3px 5px'
            }
        }, tr);
        this.td4 = MFt.criaElem('td', {
            innerText: `${this.usuarios.length ? '...':'sem tarefa'}`,
            style: {
                textAlign: 'center',
                padding: '3px 5px'
            }
        }, tr);
        this.td2.innerText = `${this.formatanup(this.tarefa.processo.NUP)}`;
        if (this.usuarios.length) {
            MFt.clear(this.td4);
            const cloneAmp = this.ampulheta.cloneNode(true);
            cloneAmp.style.width = cloneAmp.style.height = '30px';
            this.td4.appendChild(cloneAmp);
        }
        const cloneAmp = this.ampulheta.cloneNode(true);
        cloneAmp.style.width = cloneAmp.style.height = '30px';
        this.td3.appendChild(cloneAmp);
    }

    atividade_lancada() {
        MFt.clear(this.td3);
        const cloned = this.certo.cloneNode();
        cloned.style.width = '30px';
        cloned.style.height = '30px';
        this.td3.appendChild(cloned);
        this.enviar_mensagem(['tarefas - kururu'], 'recarregar_tarefas');
    }

    tarefa_criada() {
        this.num_tarefas_criadas++;
        this.td4.innerText = `${this.num_tarefas_criadas}/${this.usuarios.length}`;
    }
}