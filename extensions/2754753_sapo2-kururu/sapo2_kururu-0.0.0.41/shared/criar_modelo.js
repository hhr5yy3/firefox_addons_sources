class CriarModelo extends Payloads {
    constructor(pai) {
        super();
        this.pai = pai;
        this.tarefas = pai.tarefas_selecionadas();
        this.pop = undefined;
        this.ampulheta = new Image(15, 15);
        this.ampulheta.src = '../images/throbber_13.gif';
        this.certo = new Image(15, 15);
        this.certo.src = '../images/certo.png';
        this.jwtKururu = undefined;
        // Novos modelos podem ser acrescidos no arquivo modelos_parecer.json no servidor
        /*
        Existem duas formas como os dados podem estar dispostos no arquivo modelos_parecer.json
        A primeira para documentos em branco do Sapiens:
            {
                nome: "Notícia Crime",
                nome_peca: "NOTÍCIA CRIME",
                value: 10948
            }

        A segunda, para modelos dinâmicos por formulário:
            {
                "nome": "Parecer Obras (dinâmico)",
                "link": "https://manoelpaz.com/cgi-bin/agu/modelos/js_upload.py?task=html_task&pag=obras01"
            }
        No segundo modo, esta Classe acrescenta algumas informações adicionais, como o ID da Tarefa (id_tarefa),
        o jwt de autenticação no manoelpaz.com (jwt) e o token jwt do supersapiens (jwt_super) para o amanuense.
        Todos os itens estão em uma array json.
         */
        this.modelos = [
            {
                titulo: "Modelos em Branco",
                "setor_exclusivo": null,
                "usuario_exclusivo": null,
                lista: [
                    {nome: 'Despacho ', nome_peca: 'DESPACHO',  value: 1},
                    {nome: 'Nota', nome_peca: 'NOTA', value: 2},
                    {nome: 'Cota', nome_peca: 'COTA', value: 3},
                    {nome: 'Parecer', nome_peca: 'PARECER', value: 5},
                    {nome: 'Ata', nome_peca: 'ATA', value: 2159},
                    {nome: 'Termo', nome_peca: 'TERMO', value: 340},
                    {nome: 'Info. em MS', nome_peca: 'INFORMAÇÕES EM MANDADO DE SEGURANÇA', value: 2122},
                    {nome: 'Pauta', nome_peca: 'PAUTA', value: 80871},
                ]
            }
        ];
        if (this.tarefas?.length > 0) {
            this.init1();
        }
        else {
            const msg = new MsgGenerica('Nenhuma tarefa selecionada', 240, 22, null, null);
            msg.div.style.fontSize = '16px';
            setTimeout(()=>msg.closeWindow(msg), 1500);
        }
    }

    init1() {
        this.pop = new PopUp(800, 600, null, null, async form=>{
            const d1 = MFt.criaElem('div', {
                innerText: 'Aguardando "Amanuense"...',
                style: {
                    fontFamily: 'Titillium Web',
                    overflowY: 'scroll',
                    overflowX: 'none',
                    height: 'calc(100% - 30px)',
                }
            }, form.div);
            // Obtém dados do servidor sobre modelos adicionais ----------------------------------
            this.modelos_backend = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
                task: 'arquivo',
                arquivo: 'modelos_parecer_v2.json'
            });
            this.modelos_explicacao = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
                task: 'arquivo',
                arquivo: 'modelos_explicacao.json'
            });
            this.jwtKururu = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
                task: 'obterJWT',
            });
            this.meusModelosAmanuense = await this.request_mf("https://acervopessoal.org/cgi-bin/dkalq/dkalq", {
                task: 'meus_modelos_pelo_kururu',
                jwt: this.jwtKururu
            });
            console.group('MEUS MODELOS - AMANUENSE');
            console.log(this.meusModelosAmanuense);
            console.groupEnd();
            MFt.clear(d1);
            this.init2(d1);
        });
        this.pop.header = 'Modelos';
        this.pop.iniciar(this.pop);
        this.pop.aceitaEsc = true;
        this.pop.clicafora_sair = true;
    }

    init2(div) {
        MFt.clear(div);
        const wp = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: 'auto auto auto auto'
            }
        }, div);
        const btAmanuense = this.criar_opcao('Amanuense', wp, this.modelos_explicacao?.explicacoes?.amanuense || '');
        const btBranco = this.criar_opcao('Parecer, Nota e Cota em Branco', wp, this.modelos_explicacao?.explicacoes?.em_branco || '');
        const btPesquisar = this.criar_opcao('Pesquisar em Modelos', wp, this.modelos_explicacao?.explicacoes?.pesquisar || '');
        btAmanuense.onclick = ()=>{
            this.boxAmanuense(div, this.modelos_backend, this.meusModelosAmanuense);
        }
        btBranco.onclick = ()=>{
            this.boxAmanuense(div, this.modelos_backend, this.meusModelosAmanuense, true);
        }
        btPesquisar.onclick = ()=>{
            new ModelosSuper(this, div, this.tarefas);
        }
        const fechar = new MFt.bt({
            value: 'Fechar',
            width: 120,
            height: 30,
            marginTop: '30px',
            wrapper: MFt.criaElem('div', null, wp),
            callback: ()=>{
                this.pop.closeWindow(this.pop);
            }
        });
    }

    isUsuarioNoSetor(id_setor) {
        console.log(this.profile);
        return false;
    }

    criar_div_modelo(modelos, div) {
        const criarBox = (modelo, elem)=>{
            const backColor = 'rgb(255,227,194)';
            const d1 = this.criar_box_botao(modelo.nome, elem);
            d1.onmouseenter = ()=>{
                d1.style.backgroundColor = 'rgb(243,206,177)';
            };
            d1.onmouseleave = ()=>{
                d1.style.backgroundColor = backColor;
            };
            d1.onclick = async ()=>{
                this.pop.aceitaEsc = this.pop.clicafora_sair = false;
                if (modelo?.link) { // Quando a minuta vai ser gerada por um link externo, preciso adicionar o JWT do Kururu para a versão 1 dos modelos por formulário, e o JWT do Super para a versão 2
                    MFt.clear(div);
                    div.innerText = 'Preparando dados...';
                    await this.salvarTarefaBackend();
                    const padLeft = 'Bearer ';
                    let token = localStorage.getItem('super_token');
                    if (token.startsWith(padLeft)) token = token.substring(padLeft.length); // Sem o Bearer do início
                    let complemento = `&nup=${this.tarefas[0].processo.NUP}&id_tarefa=${this.tarefas[0].id}&jwt=${this.jwtKururu}` + (token ? `&jwt_super=${token}` : '');
                    const linkFinal = modelo.link + complemento;
                    window.open(linkFinal);
                    this.pop.closeWindow(this.pop);
                }
                else {
                    this.elaborar_minuta(this.pop.div, modelo.nome_peca, modelo.value, null);
                }
            }
        };
        const d1 = MFt.criaElem('div', {
            style: {
                padding: '10px',
                borderBottom: '1px solid #AAA',
            }
        }, div);
        const dTitulo = MFt.criaElem('div', {
            innerText: modelos?.titulo || '---',
            style: {
                fontWeight: 'bold',
            }
        }, d1);
        const dTipos = MFt.criaElem('div', {
            style: {
                display: 'flex',
                flexWrap: 'wrap',
            }
        }, d1);
        for(let m of modelos.lista) {
            criarBox(m, dTipos);
        }
    }

    criar_box_botao(label, elem) {
        const backColor = 'rgb(255,227,194)';
        const d1 = MFt.criaElem('div', {
            innerText: label,
            style: {
                display: 'flex',
                padding: '10px',
                margin: '3px 10px 0 0',
                width: '150px',
                height: '70px',
                border: '1px solid #AAA',
                borderRadius: '6px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: backColor,
                transition: '0.2s',
            }
        }, elem);
        d1.onmouseenter = ()=>{
            d1.style.backgroundColor = 'rgb(243,206,177)';
        };
        d1.onmouseleave = ()=>{
            d1.style.backgroundColor = backColor;
        };
        return d1;
    }

    criar_opcao(label, elem, texto) {
        const wrapper = MFt.criaElem('div', {
            style: {
                minHeight: '150px',
            }
        }, elem);
        const boxBt = MFt.criaElem('div', {
            style: {
                float: 'left'
            }
        }, wrapper);
        const boxTexto = MFt.criaElem('div', {
            innerText: texto,
            style: {
                textAlign: 'justify'
            }
        }, wrapper);
        return this.criar_box_botao(label, boxBt);
    }

    elaborar_minuta(elem, nome_peca, id_tipo_peca, id_classe_modelo) {
        MFt.clear(elem);
        const doit = async ()=>{
            MFt.clear(elem);
            MFt.atribs(elem, {
                style: {
                    fontFamily: 'Titillium Web',
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }
            });
            const tabela = MFt.criaElem('table', {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px',
                    margin: '20px',
                    borderCollapse: 'collapse'
                }
            }, elem);
            const tds = this.tds(['#', 'NUP', 'MINUTA CRIADA'], MFt.criaElem('tr', null, tabela), 'td', {padding: '0 5px'});
            for(let i = 0; i < this.tarefas.length; i++) {
                const tarefaLocal = this.tarefas[i];
                let tds = this.tds([
                    (i+1).toString(),
                    this.formatanup(tarefaLocal.processo.NUP),
                    ''
                ], MFt.criaElem('tr', null, tabela), 'td', {padding: '0 5px'});
                tds[2].appendChild(this.ampulheta.cloneNode());
                tds[2].style.textAlign = 'center';
                const xml = new RequestMF();
                const minuta = await this.super_get(xml, this.criar_minuta(tarefaLocal.id, nome_peca, id_tipo_peca));
                if (!minuta?.id) {
                    this.pop.div.innerText = 'Erro na criação da minuta!';
                    this.pop.div.style.color = 'red';
                    new MFt.bt({
                        value: 'Entendi',
                        wrapper: MFt.criaElem('div', null, this.pop.div),
                        width: 100,
                        height: 30,
                        marginTop: '20px',
                        callback: ()=>this.pop.closeWindow(this.pop)
                    });
                }
                if (id_classe_modelo && !isNaN(id_classe_modelo)) {
                    const id = parseInt(id_classe_modelo);
                    console.log(id);
                    if (Number.isInteger(id)) {
                        const body = await this.modelos[id].classe.init(nome_peca, minuta, tarefaLocal); // O novo texto deve ser obtido aqui
                        const res = await this.super_get(xml, this.patch_salvar_html(minuta.id, minuta.hash, body));
                    }
                }
                console.log(minuta);
                if (this.tarefas.length === 1) {
                    const doc = await this.super_get(xml, this.get_minutas(tarefaLocal.id), true);
                    const ref = doc[doc.length - 1];
                    const tarefa = this.tarefas[0];
                    const url = this.criar_link_doc(tarefaLocal, ref.id, minuta.id);
                    console.log(url);
                    window.open(url);
                }
                MFt.clear(tds[2]);
                tds[2].appendChild(this.certo.cloneNode());
            }
            // TODO: ATUALIZAR AS INFORMACOES DO ITEM DA TAREFA ONDE FOI CRIADA A MINUTA
            this.pop.aceitaEsc = this.pop.clicafora_sair = true;
        };
        // ---------------------------------------------
        if (this.tarefas.length > 1) {
            MFt.criaElem('div', {
                innerText: `Confirma a criação de tarefas em ${this.tarefas.length} processos?`,
                style: {
                    fontSize: '16px',
                    margin: '20px'
                }
            }, elem);
            const d2 = MFt.criaElem('div', null, elem);
            new MFt.bt({
                value: 'Sim',
                wrapper: d2,
                height: 30,
                width: 50,
                marginLeft: '20px',
                callback: ()=>{
                    elem.innerText = 'Aguarde...';
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
                    this.pop.closeWindow(this.pop);
                }
            });
        }
        else doit();
    }

    async salvarTarefaBackend() {
        const tarefa = await this.super_get(new RequestMF(), this.get_tarefa(this.tarefas[0].id));
        const resSalvar = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
            task: 'salvar_tarefa_json',
            dados: JSON.stringify(tarefa),
            id_tarefa: this.tarefas[0].id
        }, 'post');
        console.group("RESPOSTA DOS DADOS DA TAREFA SALVOS NO BACKEND");
        console.log(resSalvar);
        console.groupEnd();
    }

    inserirModelosAmanuense(meusModelosAmanuense) {
        this.modelos = [{
            "titulo": "Meus Modelos - Amanuense",
            "setor_exclusivo": null,
            "usuario_exclusivo": null,
            "lista": (()=>{
                let ret = [];
                for(let m of meusModelosAmanuense) {
                    ret.push({
                        nome: m.nome.substring(0, 50),
                        link: `https://acervopessoal.org/cgi-bin/dkalq/dkalq?visual_id=${m.rowid}`
                    });
                }
                return ret;
            })()
        }].concat(this.modelos);
    }

    boxAmanuense(div, modelos_backend, meusModelosAmanuense, emBranco=false) {
        MFt.clear(div);
        if (Array.isArray(modelos_backend) && modelos_backend.length) {
            this.modelos = modelos_backend;
        }
        if (Array.isArray(meusModelosAmanuense) && meusModelosAmanuense.length) {
            this.inserirModelosAmanuense(meusModelosAmanuense);
        }
        for(let m of this.modelos) {
            if (!emBranco && m?.titulo === 'Modelos em Branco') continue;
            else if (emBranco && m?.titulo !== 'Modelos em Branco') continue;
            console.log(m);
            if (Number.isInteger(m.setor_exclusivo) && this.isUsuarioNoSetor(m.setor_exclusivo)) {
                // Para setor exclusivo
                console.log('Para setor exclusivo');
                this.criar_div_modelo(m, div);
            }
            else if (Number.isInteger(m.usuario_exclusivo) && this.profile.id === m.usuario_exclusivo) {
                // Para usuario exclusivo
                console.log('Para usuário exclusivo');
                this.criar_div_modelo(m, div);
            }
            else if (!Number.isInteger(m.usuario_exclusivo) && !Number.isInteger(m.setor_exclusivo)) {
                console.log('Para todos');
                this.criar_div_modelo(m, div);
            }
        }
        const voltar = new MFt.bt({
            value: 'Voltar',
            width: 120,
            height: 30,
            marginTop: '30px',
            wrapper: MFt.criaElem('div', null, div),
            callback: ()=>{
                this.init2(div);
            }
        });
    }

    boxEmBranco(div) {

    }

    boxModelosPesquisar(div) {

    }
}