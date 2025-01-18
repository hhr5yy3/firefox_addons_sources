class TelaNovaTarefa extends Payloads {
    constructor(id_proc) {
        super();
        this.id_proc = id_proc;
        this.processo = undefined;
        this.pop = undefined;
        this.ampulheta = new Image(15, 15);
        this.ampulheta.src = '../images/throbber_13.gif';
        this.certo = new Image(15, 15);
        this.errado = new Image(25, 25);
        this.certo.src = '../images/certo.png';
        this.errado.src = '../images/erro01.png';
        this.rel_usuarios = [];
        this.setores_unidade = []; // Vai ser carregado com os nomes de todos os setores da UNIDADE-MÃE do SETOR, após o usuário selecionar o SETOR de origem no primeiro campo
        this.xml = new RequestMF();
        this.init();
    }

    async init() {
        this.pop = new PopUp(800, 600, null, null, form=>{

        });
        this.pop.iniciar(this.pop);
        this.pop.div.innerText = 'Aguarde...';
        this.pop.clicafora_sair = this.pop.aceitaEsc = true;
        MFt.atribs(this.pop.div, {
            style: {
                fontFamily: '"Roboto Mono", "Arial Narrow", serif',
                fontSize: '14px'
            }
        });
        this.processo = await this.super_get(this.xml, this.get_dados_basicos_proc(this.id_proc), true, true);
        if (!this.processo) {
            alert('Nao foi possivel obter os dados basicos do processo');
            return;
        }
        this.formulario();
    }

    formulario() {
        const pesquisarTexto = (textoMenor, textoMaior) => { // retorna verdadeiro se todas as palavras do textoMenor estao tambem no textoMaior
            const itensTexto = textoMenor.split(" ");
            let achados = 0;
            textoMaior = this.ascii_mf(textoMaior).toLowerCase();
            for(let i of itensTexto) if (textoMaior.indexOf(this.ascii_mf(i).toLowerCase()) >= 0) achados++;
            return achados === itensTexto.length;
        }
        MFt.clear(this.pop.div);
        this.show_item('PROCESSO:', this.formatanup(this.processo.NUP), this.pop.div);
        this.show_item('LOCALIZAÇÃO:', `${this.processo.setorAtual.nome}/${this.processo.setorAtual.unidade.sigla}`, this.pop.div);
        const d_origem = MFt.criaElem('div', null, this.pop.div);
        const d_tarefa = MFt.criaElem('div', null, this.pop.div);
        const d_unidade = MFt.criaElem('div', null, this.pop.div);
        const d_setor = MFt.criaElem('div', null, this.pop.div);
        const d_obs_tarefa = MFt.criaElem('div', null, this.pop.div);
        const d_usuarios = MFt.criaElem('div', null, this.pop.div);
        const d_prazo = MFt.criaElem('div', null, this.pop.div);
        const d_botao = MFt.criaElem('div', null, this.pop.div);
        const iTarefa = new InputMF('TAREFA:', d_tarefa, async (termos, identificador)=>{
            const res = await this.super_get(this.xml, this.get_buscar_tipo_tarefa(termos), true);
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, null, null);
        const iDestino = new InputMF('DESTINO:', d_tarefa, async (termos, identificador)=>{
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
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, null, null);
        const iSetor = new InputMF('SETOR:', d_tarefa, async (termos, identificador)=>{
            const res = await this.super_get(this.xml, this.get_buscar_setor(termos, iDestino.id), true);
            if (res) {
                if (iSetor.value.split(' ').length === 1) { // Quando se coloca uma unica palavra, se essa bater com a sigla do setor apenas esse item vai ser exibido
                    const unico = res.filter(d=>{
                        console.log(`${this.ascii_mf(d.sigla.trim()).toUpperCase()} === ${this.ascii_mf(iSetor.value.trim()).toUpperCase()}`);
                        return this.ascii_mf(d.sigla.trim()).toUpperCase() === this.ascii_mf(iSetor.value.trim()).toUpperCase();
                    });
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
        const iObs = this.criar_input_normal("OBSERVAÇÃO:", d_obs_tarefa);
        const iOrigem = new InputMF('ORIGEM:', d_origem, async (termos, identificador)=>{
            // const res = await this.super_get(this.get_buscar_setor(termos, iUnidade.id), true);
            const res = this.profile.colaborador.lotacoes.map(d=>d.setor);
            if (res) {
                if (iSetor.value.split(' ').length === 1) { // Quando se coloca uma unica palavra, se essa bater com a sigla do setor apenas esse item vai ser exibido
                    const unico = res.filter(d=>{
                        // console.log(`${this.ascii_mf(d.sigla.trim()).toUpperCase()} === ${this.ascii_mf(iOrigem.value.trim()).toUpperCase()}`);
                        return this.ascii_mf(d.sigla.trim()).toUpperCase() === this.ascii_mf(iOrigem.value.trim()).toUpperCase();
                    });
                    if (unico.length === 1) return {dados: [{id: unico[0].id, nome: `${unico[0]?.sigla ? `${unico[0]?.sigla} - `: ''}${unico[0].nome} - ${unico[0].unidade.sigla}`, tudo: unico}], identificador};
                    else {
                        const origem = this.ascii_mf(iOrigem.value.trim()).toLowerCase();
                        let tmp = res.filter(d=>
                            this.ascii_mf(d.sigla).toLowerCase().indexOf(origem) >= 0 ||
                            this.ascii_mf(d.nome).toLowerCase().indexOf(origem) >= 0 ||
                            this.ascii_mf(d.unidade.nome).toLowerCase().indexOf(origem) >= 0 ||
                            this.ascii_mf(d.unidade.sigla).toLowerCase().indexOf(origem) >= 0
                        );
                        console.log(tmp);
                        const dados = tmp.map(d=>{return {id:d.id, nome:`${d?.sigla?`${d.sigla} - `:''}${d.nome} - ${d.unidade.sigla}`, tudo: d}});
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
        const iPrazo = this.criar_elem_prazo(d_prazo);
        iOrigem.set_options(async (identificador)=>{
            const res = this.profile.colaborador.lotacoes.map(d=>d.setor);
            const dados = res.map(d=>{return {id:d.id, nome:`${d?.sigla?`${d.sigla} - `:''}${d.nome} - ${d.unidade.sigla}`, tudo: d}});
            return {dados, identificador};
        });
        iDestino.oninput = ()=>{
            iSetor.clear();
            MFt.clear(d_usuarios);
            this.rel_usuarios = [];
        };
        iDestino.onchange = async ()=>{
            console.log("UNIDADE ONCHANGE");
            this.rel_usuarios = [];
            const unidade_origem = iOrigem?.item?.tudo?.unidade?.id;
            console.log(unidade_origem);
            console.log(iDestino.id);
            if (iDestino.id === unidade_origem) { // Quando o usuario tambem tem lotacao na unidade selecionada
                /*
                Quando na UNIDADE Destino o usuário tiver colocado e selecionado o nome de algum SETOR dentro da UNIDADE de origem, o programa vai colocar em...
                ...iDestino.item as chaves id_swap e nome_swap com o ID e o Nome do setor e em .id o ID da Unidade de Origem e em .nome o Nome da Unidade de origem.
                 */
                if (iDestino?.item?.id_swap && iDestino?.item?.nome_swap) { // Aqui o programa seleciona automaticamente o setor a partir do erro do usuário no campo iDestino
                    iSetor.id = iDestino.item.id_swap;
                    iSetor.nome = iDestino.item.nome_swap;
                    iSetor.disabled = true;
                    if (iSetor?.id) {
                        this.exibir_usuarios(d_usuarios, iSetor.id);
                        iDestino.disabled = iTarefa.disabled = false;
                    }
                }
                else {
                    iSetor.disabled = false;
                    const setores = async (identificador) => {
                        const res = await this.super_get(this.xml, this.get_setores(iDestino.item.tudo.id), true);
                        const dados = res.map(d => {
                            return {id: d.id, nome: `${d?.sigla ? `${d.sigla} - ` : ''}${d.nome}`, tudo: d}
                        });
                        return {dados, identificador};
                    };
                    iSetor.clear();
                    iSetor.focus();
                    iSetor.set_options(setores);
                }
            }
            else { // Quando o usuario nao tem lotacao na unidade selecionada, considero que o processo so pode ir pelo protocolo
                // iDestino.disabled = iTarefa.disabled = true;
                iSetor.clear_options();
                if (!iDestino?.id) return;
                const res = await this.super_get(this.xml, this.get_buscar_setor("PROTOCOLO", iDestino.id), true, true);
                iSetor.id = res.id;
                iSetor.nome = res.nome;
                iSetor.disabled = true;
                if (iSetor?.id) {
                    this.exibir_usuarios(d_usuarios, iSetor.id);
                    iDestino.disabled = iTarefa.disabled = false;
                }
            }
            iSetor.onchange = ()=>{
                if (iSetor?.id) {
                    this.exibir_usuarios(d_usuarios, iSetor.id);
                    this.rel_usuarios = [];
                }
            }
        };
        iOrigem.onchange = async ()=>{
            this.setores_unidade = [];
            if (iOrigem?.item?.tudo?.unidade?.id) {
                const desbloquear = this.pop.bloquear(this.pop, "Aguarde...");
                iOrigem.disabled = true;
                iDestino.disabled = true;
                iTarefa.disabled = true;
                iSetor.disabled = true;
                this.setores_unidade = await this.super_get(this.xml, this.get_setores(iOrigem?.item?.tudo?.unidade?.id), true);
                iOrigem.disabled = false;
                iDestino.disabled = false;
                iTarefa.disabled = false;
                iSetor.disabled = false;
                desbloquear();
            }
            iDestino.clear();
            iSetor.clear();
            this.rel_usuarios = [];
            MFt.clear(d_usuarios);
        }
        iSetor.onchange = ()=>{
            this.rel_usuarios = [];
        }
        const tudoOk = ()=>{
            bt.disabled = !(iTarefa.id && iDestino.id && iSetor.id && this.rel_usuarios.length);
        }
        const timer = setInterval(tudoOk, 200);
        const bt = new MFt.bt({
            value: 'Criar Tarefa',
            width: 150,
            height: 30,
            wrapper: d_botao,
            marginTop: '30px',
            disabled: true,
            callback: ()=>{
                clearInterval(timer);
                this.proceder_criar_tarefas(iTarefa.id, iDestino.id, iSetor.id, iOrigem.id, parseInt(iPrazo.value), iObs.value);
            }
        });
    }

    async exibir_usuarios(wp, id_setor) {
        const HEIGHT = 140;
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
                height: `${HEIGHT}px`,
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
                console.log(u);
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
                };
            }
        }
        else {
            d3.innerText = "Sem usuários no setor!";
        }
    }

    async proceder_criar_tarefas(id_tipo_tarefa, id_unidade, id_setor, id_setor_origem, prazo, obs) {
        MFt.clear(this.pop.div);
        this.pop.aceitaEsc = this.pop.clicafora_sair = false;
        console.log(this.rel_usuarios);
        const tabela = MFt.criaElem('table', null, this.pop.div);
        let tds = this.tds([
            '#', 'USUÁRIO', 'TAREFA CRIADA'
        ], MFt.criaElem('tr', null, tabela));
        let dados = [];
        for(let i = 0; i < this.rel_usuarios.length; i++) {
            const usr = this.rel_usuarios[i];
            tds = this.tds([
                (i+1).toString(),
                usr.toString(),
                ''
            ], MFt.criaElem('tr', null, tabela));
            dados.push({
                id_tipo_tarefa,
                id_unidade,
                id_setor,
                id_setor_origem,
                prazo,
                obs,
                id_usr: usr,
                td: tds[2]
            });
            tds[2].appendChild(this.ampulheta.cloneNode());
            tds[2].style.textAlign = 'center';
        }
        for(let d of dados) {
            const data_inicial = new Date();
            const data_final = this.calcular_prazo_2(d.prazo).fim;
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            data_final.setHours(0,0,0,0); // apenas para calcular a diferenca
            const prazo_dias = MFt.dates.daydiff(hoje, data_final);
            data_final.setHours(23, 59, 59, 0); // ultimo minuto do dia do prazo
            const res = await this.super_get(this.xml, this.criar_tarefa(data_inicial, data_final, prazo_dias, d.id_tipo_tarefa, this.processo.id, d.id_usr, d.id_setor_origem, d.id_setor, d.obs));
            console.log(res);
            if (!res?.message) {
                this.registrar_evento(`Tarefa criada no NUP ${this.formatanup(this.processo.NUP)}`);
                this.enviar_mensagem(['tarefas - kururu'], 'recarregar_tarefas');
                MFt.clear(d.td);
                d.td.appendChild(this.certo.cloneNode());
            }
            else {
                MFt.clear(d.td);
                const w1 = MFt.criaElem('div', {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    }
                }, d.td);
                const w2 = MFt.criaElem('div', {
                    style: {
                        margin: '0 10px 0 0'
                    }
                }, w1);
                const w3 = MFt.criaElem('div', {
                    innerText: res.message,
                    style: {
                        textAlign: 'left'
                    }
                }, w1);
                w2.appendChild(this.errado.cloneNode());
            }
        }
        this.pop.aceitaEsc = this.pop.clicafora_sair = true;
        this.enviar_mensagem(['tarefas - kururu', 'recarregar_tarefas']);
    }
}