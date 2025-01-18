class Interessados extends Payloads {
    constructor(nup, popup) {
        super();
        if (!this.validaNUP(nup)) {
            throw new Error("NUP inválido em Interessados");
        }
        this.nup = this.validaNUP(nup);
        if (popup && !(popup instanceof PopUp)) {
            throw new Error("Popup inválido em Interessados");
        }
        if (!popup) {
            this.popup = new PopUp(800, 727, null, null, form=>{
                MFt.atribs(form.div, {
                    style: {
                        fontFamily: 'Titillium Web',
                        fontSize: '14px',
                    }
                });
                this.iniciar();
            });
            this.popup.iniciar(this.popup);
            this.popup.aceitaEsc = this.popup.clicafora_sair = true;
        }
    }

    async iniciar() {
        this.xml = new RequestMF();
        MFt.clear(this.popup.div);
        const dTemp = MFt.criaElem('div', {
            innerText: 'Obtendo dados do processo...',
        }, this.popup.div);
        dTemp.className = 'blink_opacity';
        this.modalidadesPessoas = await this.super_get(this.xml, this.getTiposQualificacaoPessoas(), true);
        this.processo = await this.super_get(this.xml, this.get_buscar_nup(this.nup), true, true);
        if (!Number.isInteger(this?.processo?.id)) {
            MFt.clear(this.popup.div);
            MFt.criaElem('div', {
                innerText: 'Erro ao obter dados do processo',
            }, this.popup.div);
            new MFt.bt({
                value: 'Fechar',
                wrapper: this.popup.div,
                width: 100,
                height: 30,
                marginTop: '20px',
                callback: ()=>{
                    this.popup.closeWindow(this.popup);
                }
            });
        }
        this.interessados = await this.super_get(this.xml, this.get_processo_interessados(this.processo.id), true);
        console.group('INTERESSADOS');
        console.log(this.interessados);
        console.groupEnd();
        MFt.clear(this.popup.div);
        this.wrapper = MFt.criaElem('div', {
            style: {
                height: '100%',
                display: 'grid',
                gridTemplateRows: '200px auto 50px',
            }
        }, this.popup.div);
        this.divListaInteressados = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '40px auto',
            }
        }, this.wrapper);
        this.divEdicao = MFt.criaElem('div', {

        }, this.wrapper);
        this.divBtReset = MFt.criaElem('div', {

        }, this.wrapper);
        this.listarInteressados();
        this.adicionarInteressado();
        this.adicionarBtReset();
    }

    listarInteressados() {
        const wp = this.divListaInteressados;
        MFt.criaElem('div', {
            innerText: `Lista de interessados- NUP ${this.formatanup(this.nup)}`,
            style: {
                fontSize: '24px',
                borderBottom: '1px solid #AAA',
                marginBottom: '5px',
                paddingBottom: '5px'
            }
        }, wp);
        this.dLista = MFt.criaElem('div', {
            style: {
                height: '100%',
                border: '1px solid #AAA',
                borderRadius: '5px',
                padding: '5px',
                margin: 'none',
                overflow: 'hidden scroll'
            }
        }, wp);
        for(let i = 0; i < this.interessados.length; i++) {
            new Interessado(this.dLista, this.divEdicao, this.interessados[i], this);
        }
    }

    async resetListaInteressados(interessados) {
        MFt.clear(this.dLista);
        const dTmp = MFt.criaElem('div', {
            innerText: 'Aguardando "Super"...'
        }, this.dLista);
        dTmp.className = 'blink_opacity';
        this.interessados = interessados ? interessados : await this.super_get(this.xml, this.get_processo_interessados(this.processo.id), true);
        MFt.clear(this.dLista);
        console.group('INTERESSADOS - RELOAD');
        console.log(this.interessados);
        console.groupEnd();
        for(let i = 0; i < this.interessados.length; i++) {
            new Interessado(this.dLista, this.divEdicao, this.interessados[i], this);
        }
    }

    adicionarInteressado() {
        const wp = this.divEdicao;
        MFt.atribs(wp, {
            style: {
                border: '1px solid #AAA',
                padding: '5px',
                marginTop: '22px',
                borderRadius: '10px',
                overflow: 'hidden',
            }
        });
        MFt.clear(wp);
        const box = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '30px 50px 50px 20px auto auto 40px', // Titulo, CPF, Nome, 'Pesquisando...', Modalidade, Qualificação, Botão Fechar
            }
        }, wp);
        const dTitulo = MFt.criaElem('div', {
            innerText: 'Adicionar Interessado',
            style: {
                backgroundColor: '#DDD',
                height: '30px',
                top: '-10px',
                position: 'relative',
                left: '-5px',
                paddingLeft: '20px',
                paddingTop: '4px',
                display: 'flex',
                fontSize: '20px',
                fontWeight: 'bold',
                width: '110%',
            }
        }, box);
        const cpfInput = this.campo_texto('CPF/CNPJ', '', MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: '200px 30px',
            }
        }, box), 200);
        const dNome = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '10px auto',
                marginTop: '10px',
            }
        }, box);
        const dNomeLabel = MFt.criaElem('div', {
            innerText: 'NOME',
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
            }
        }, dNome);
        const dNomeInput = MFt.criaElem('div', {

        }, dNome);
        const eventNameSelected = ()=>{
            console.log('NOME SELECIONADO')
            cpfInput.value = '---';
            cpfInput.disabled = true;
            showModalidade(false);
        }
        const getPessoa = async termos => {
            return await this.super_get(this.xml, this.getPessoa(termos), true);
        }
        let nomeInput = new InputMF('', dNomeInput, async (termos, identificador) =>{
            const res = await getPessoa(termos);
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome: d.nome, tudo: d}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, null, null, eventNameSelected);
        nomeInput.onchange = ()=>{
            if (!Number.isInteger(nomeInput.id)) MFt.clear(dModalidade);
        }
        const dPesquisando = MFt.criaElem('div', {
            // Para aparecer o nome "pesquisando..."
        }, box);
        const dModalidade = MFt.criaElem('div', {
            // ex.: requerente, requerido, acusado...
        }, box);
        const dQualificacao = MFt.criaElem('div', {
            // Ex.: pessoa física, jurídica, autoridade, órgão de representação
        }, box);
        const dBt = MFt.criaElem('div', {

        }, box);
        cpfInput.style.textAlign = 'right';
        const dLupaCPF = MFt.criaElem('div', {
            style: {
                marginLeft: '10px',
                display: 'flex'
            }
        }, cpfInput.parentNode);
        const lupaSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNzg0LTEyMCA1MzItMzcycS0zMCAyNC02OSAzOHQtODMgMTRxLTEwOSAwLTE4NC41LTc1LjVUMTIwLTU4MHEwLTEwOSA3NS41LTE4NC41VDM4MC04NDBxMTA5IDAgMTg0LjUgNzUuNVQ2NDAtNTgwcTAgNDQtMTQgODN0LTM4IDY5bDI1MiAyNTItNTYgNTZaTTM4MC00MDBxNzUgMCAxMjcuNS01Mi41VDU2MC01ODBxMC03NS01Mi41LTEyNy41VDM4MC03NjBxLTc1IDAtMTI3LjUgNTIuNVQyMDAtNTgwcTAgNzUgNTIuNSAxMjcuNVQzODAtNDAwWiIvPjwvc3ZnPg==';
        const lupa1 = new Image(32);
        lupa1.src = lupaSrc;
        MFt.atribs(cpfInput.parentNode, {
            style: {
                marginLeft: '10px',
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: '200px 30px',
            }
        });
        dLupaCPF.appendChild(lupa1);
        lupa1.style.cursor = 'pointer';
        let searching = false;
        //-----------------------------------------------------------------------------------------------
        const doCPFSearch = async ()=>{
            if (cpfInput.disabled) return;
            MFt.clear(dPesquisando);
            if (!this.conferirCPF(cpfInput.value.trim()) && !this.conferirCNPJ(cpfInput.value)) {
                alert('CPF/CNPJ inválido!');
                return;
            }
            let cpf = this.sonumeros(cpfInput.value.trim());
            cpfInput.value = this.formatarCPF(cpf);
            if (searching) return;
            this.popup.aceitaEsc = this.popup.clicafora_sair = false;
            searching = true;
            cpfInput.disabled = true;
            dPesquisando.innerText = 'Procurando...';
            dPesquisando.className = 'blink_opacity';
            const pessoas = await this.super_get(this.xml, this.getBuscarPessoaCPF(cpf), true);
            MFt.clear(dPesquisando);
            this.popup.aceitaEsc = this.popup.clicafora_sair = true;
            searching = false;
            if (Array.isArray(pessoas) && pessoas.length === 0) {
                cpfInput.focus();
                cpfInput.disabled = true;
                MFt.clear(dNome);
                MFt.clear(dModalidade);
                MFt.clear(dBt);
                nomeInput = this.campo_texto('NOME', '', dNome, 500);
                nomeInput.focus();
                MFt.atribs(nomeInput.parentNode, {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '515px 50px',
                        alignItems: 'center',
                    }
                });
                const btOk = new MFt.bt({
                    value: 'Ok',
                    width: 30,
                    height: 30,
                    wrapper: nomeInput.parentNode,
                    callback: ()=>{
                        if (nomeInput.value.trim().length < 1) return;
                        showModalidade(true);
                    }
                });
            }
            if (!Array.isArray(pessoas)) {
                alert('Erro na comunicação com o Super');
                cpfInput.disabled = false;
                cpfInput.focus();
                return;
            }
            if (pessoas.length) {
                cpfInput.disabled = false;
                const pessoa = pessoas[0];
                nomeInput.id = pessoa.id;
                nomeInput.nome = pessoa.nome;
                showModalidade(false);
            }
        }
        const showModalidade = (criarNovaPessoa=false) => {
            // const iNome = this.campo_texto('NOME', pessoa.nome, MFt.criaElem('div', {}, dPessoa));
            // iNome.disabled = true;
            MFt.clear(dModalidade);
            let opcoesModalidadeCache;
            let opcoesQualificacaoCache;
            const getOpcoesQualificacao = async (termos)=>{
                return  await this.super_get(this.xml, this.getQualificacaoPessoa(termos), true);
            };
            const opsQualificacao = async (identificador)=>{
                let res = Array.isArray(opcoesQualificacaoCache) ? opcoesQualificacaoCache : await this.super_get(this.xml, this.getQualificacaoPessoa(), true);
                opcoesQualificacaoCache = res;
                if (res) {
                    const dados = res.map(d=>{return {id:d.id, nome: d.valor, tudo: d}});
                    return {dados, identificador};
                }
                return {dados: [], identificador};
            };
            const getOpcoesModalidade = async (termos)=>{
                return  await this.super_get(this.xml, this.getModalidadeInteressado(termos), true);
            };
            const opsModalidade = async (identificador)=>{
                let res = Array.isArray(opcoesModalidadeCache) ? opcoesModalidadeCache : await this.super_get(this.xml, this.getModalidadeInteressado(), true);
                opcoesModalidadeCache = res;
                if (res) {
                    const dados = res.map(d=>{return {id:d.id, nome: d.valor, tudo: d}});
                    return {dados, identificador};
                }
                return {dados: [], identificador};
            };
            const eventModalidade = ()=>{
                if (modalidade.identificador) {
                    MFt.clear(dBt);
                    const bt = new MFt.bt({
                        value: criarNovaPessoa ? 'Criar Nova Pessoa e Adicionar ao Processo' : 'Adicionar ao Processo Pessoa Selecionada',
                        width: 324,
                        height: 30,
                        wrapper: dBt,
                        marginTop: '10px',
                        callback: async ()=>{
                            if (criarNovaPessoa) {
                                if (!(cpfInput instanceof HTMLInputElement)) {
                                    alert('Erro geral no CPF');
                                    return;
                                }
                                if (!(nomeInput instanceof HTMLInputElement)) {
                                    alert('Erro geral no nome da pessoa');
                                    return;
                                }
                                if (!this.conferirCPF(this.sonumeros(cpfInput.value))) {
                                    alert('Erro no CPF/CNPJ informado');
                                    return;
                                }
                                if (!nomeInput.value.trim()) {
                                    alert('Nome da pessoa não pode estar vazio');
                                    return;
                                }
                                if (!Number.isInteger(modalidade.id)) {
                                    alert('Erro: É necessário indicar a modalidade da pessoa (pólo ativo, passivo...)');
                                    return;
                                }
                                if (!Number.isInteger(qualificacao.id)) {
                                    alert('Erro: É necessário indicar a qualificação da pessoa (pessoa física, pessoa jurídica...)');
                                    return;
                                }
                                this.popup.aceitaEsc = this.popup.clicafora_sair = false;
                                nomeInput.disabled = true;
                                cpfInput.disabled = true;
                                modalidade.disabled = true;
                                searching = true;
                                const dadosPessoa = {
                                    nome: nomeInput.value.trim(),
                                    numeroDocumentoPrincipal: this.sonumeros(cpfInput.value),
                                    modalidadeQualificacaoPessoa: modalidade.id,
                                }
                                MFt.clear(dBt);
                                const d1 = MFt.criaElem('div', {
                                    //innerText: 'Inserindo pessoa no Super Sapiens...',
                                    style: {
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'left',
                                        flexDirection: 'column'
                                    }
                                }, dBt);
                                const d1_1 = MFt.criaElem('div', {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                    }
                                }, d1);
                                const ampulheta = new Image(24);
                                MFt.atribs(ampulheta, {style: {width: '24px', height: '24px', marginRight: '5px'}});
                                ampulheta.src = '/images/throbber_13.gif';
                                d1_1.appendChild(ampulheta.cloneNode());
                                d1_1.appendChild(document.createTextNode('Inserindo pessoa no Super Sapiens...'));
                                const resInserirPessoa = await this.super_get(this.xml, this.postSalvarPessoa(dadosPessoa));
                                if (!Number.isInteger(resInserirPessoa?.id)) {
                                    MFt.clear(d1_1);
                                    const iconError = new Image(24);
                                    MFt.atribs(iconError, {style: {width: '24px', height: '24px', marginRight: '5px'}});
                                    iconError.src = '/images/erro01.png';
                                    d1_1.appendChild(iconError);
                                    MFt.criaElem('div', {innerText: 'Erro ao criar pessoa!'}, d1_1);
                                    this.popup.aceitaEsc = this.popup.clicafora_sair = true;
                                    qualificacao.disabled = false;
                                    MFt.clear(dQualificacao);
                                    MFt.clear(dModalidade);
                                    d1.parentNode.removeChild(d1);
                                    nomeInput.disabled = false;
                                    cpfInput.disabled = false;
                                    alert(`Não foi possível inserir a pessoa no Super!${resInserirPessoa?.message ? `\n${resInserirPessoa.message}` : ''}`);
                                    return;
                                }
                                else {
                                    MFt.clear(d1_1);
                                    const certo1 = new Image(24);
                                    certo1.src = '/images/certo.png';
                                    MFt.atribs(certo1, {style:{width: '24px', height: '24px', marginRight: '5px'}});
                                    d1_1.appendChild(certo1);
                                    MFt.criaElem('span', {innerText: 'Pessoa criada no Super Sapiens'}, d1_1);
                                    const d1_2 = MFt.criaElem('div', {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                        }
                                    }, d1);
                                    d1_2.appendChild(ampulheta.cloneNode());
                                    MFt.criaElem('div', {innerText: 'Vinculando pessoa ao processo...'}, d1_2);
                                    const resVincularPessoa = await this.super_get(this.xml, this.postAdicionarPessoaProcesso(this.processo.id, resInserirPessoa.id, modalidade.id));
                                    // ---
                                    await this.resetListaInteressados();
                                }
                                nomeInput.disabled = false;
                                cpfInput.disabled = false;
                                searching = false;
                                if (nomeInput instanceof InputMF) nomeInput.clear();
                                cpfInput.value = '';
                                d1.parentNode.removeChild(d1);
                                MFt.clear(dModalidade);
                                this.popup.aceitaEsc = this.popup.clicafora_sair = true;
                            }
                            else {
                                if (!Number.isInteger(modalidade.id)) {
                                    alert('Erro: É necessário indicar a modalidade da pessoa (pólo ativo, passivo...)');
                                    return;
                                }
                                if (!Number.isInteger(nomeInput.id)) {
                                    alert('Erro: Pessoa não indicada');
                                    return;
                                }
                                nomeInput.disabled = true;
                                cpfInput.disabled = true;
                                modalidade.disabled = true;
                                searching = true;
                                MFt.clear(dBt);
                                MFt.clear(dQualificacao);
                                MFt.clear(dModalidade);
                                const d1 = MFt.criaElem('div', {
                                    innerText: 'Vinculando pessoa ao processo...',
                                    style: {
                                        fontSize: '14px'
                                    }
                                }, dBt);
                                d1.className = 'blink_opacity';
                                await this.super_get(this.xml, this.postAdicionarPessoaProcesso(this.processo.id, nomeInput.id, modalidade.id));
                                await this.resetListaInteressados();
                                cpfInput.disabled = false;
                                searching = false;
                                MFt.clear(dNomeInput);
                                nomeInput = new InputMF('', dNomeInput, async (termos, identificador) =>{
                                    const res = await getPessoa(termos);
                                    if (res) {
                                        const dados = res.map(d=>{return {id:d.id, nome: d.nome, tudo: d}});
                                        return {dados, identificador};
                                    }
                                    return {dados: [], identificador};
                                }, null, null, eventNameSelected);
                                nomeInput.onchange = ()=>{
                                    if (!Number.isInteger(nomeInput.id)) MFt.clear(dModalidade);
                                }
                                nomeInput.disabled = false;
                                cpfInput.value = '';
                                d1.parentNode.removeChild(d1);
                                MFt.clear(dModalidade);
                                MFt.clear(dQualificacao);
                                this.popup.aceitaEsc = this.popup.clicafora_sair = true;
                            }
                        }
                    });
                }
            }
            const modalidade = new InputMF('', MFt.criaElem('div', {}, dModalidade), async (termos, identificador)=>{
                const res = await getOpcoesModalidade(termos);
                if (res) {
                    const dados = res.map(d=>{return {id:d.id, nome: d.valor, tudo: d}});
                    return {dados, identificador};
                }
                return {dados: [], identificador};
            }, null, null, eventModalidade);
            modalidade.clear();
            modalidade.set_options(opsModalidade);
            modalidade.onchange = () => {
                if (criarNovaPessoa) qualificacao.set_options(opsQualificacao);
            }
            let qualificacao;
            if (criarNovaPessoa) {
                qualificacao = new InputMF('', MFt.criaElem('div', {}, dQualificacao), async (termos, identificador) => {
                    const res = await getOpcoesQualificacao(termos);
                    if (res) {
                        const dados = res.map(d => {
                            return {id: d.id, nome: d.valor, tudo: d}
                        });
                        return {dados, identificador};
                    }
                    return {dados: [], identificador};
                });
            }
        }
        lupa1.onclick = ()=>doCPFSearch();

    }

    adicionarBtReset() {
        const btLimpar = new MFt.bt({
            value: 'Limpar Campos',
            width: 150,
            height: 30,
            wrapper: this.divBtReset,
            callback: async ()=>{
                btLimpar.disabled = true;
                this.adicionarInteressado();
                await this.resetListaInteressados();
                btLimpar.disabled = false;
            }
        });
        const btFechar = new MFt.bt({
            value: 'Fechar',
            width: 150,
            height: 30,
            marginLeft: '15px',
            wrapper: this.divBtReset,
            callback: ()=>{
                this.popup.closeWindow(this.popup);
            }
        });
    }
}


class Interessado extends Payloads {
    constructor(divLista, divEdicao, interessado, pai) {
        super();
        this.divLista = divLista;
        this.divEdicao = divEdicao;
        this.interessado = interessado;
        this.pai = pai;
        console.group('INTERESSADO');
        console.log(interessado);
        console.log(interessado.modalidadeInteressado.valor);
        console.groupEnd();
        this.iniciar();
    }

    iniciar() {
        const dMain = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: '310px 140px 270px 30px', // nome, cpf, modalidade, icon delete
                padding: '5px 5px',
                margin: '5px 5px',
                borderRadius: '5px',
                border: '1px solid #AAA',
                cursor: 'pointer',
                alignItems: 'center',
                minHeight: '38px',
            }
        }, this.divLista);
        const dNome = MFt.criaElem('div', {
            innerText: this.interessado?.pessoa?.nome,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
            }
        }, dMain);
        console.group("CONFERIR CPF");
        console.log('CPF: ', this.conferirCPF(this.interessado?.pessoa?.numeroDocumentoPrincipal));
        console.log('CNPJ: ', this.conferirCNPJ(this.interessado?.pessoa?.numeroDocumentoPrincipal));
        console.trace();
        console.groupEnd();
        const dCPF = MFt.criaElem('div', {
            innerText: this.formatarCPF(this.interessado.pessoa.numeroDocumentoPrincipal),
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center'
            }
        }, dMain);
        const dModal = MFt.criaElem('div', {
            innerText: this.interessado?.modalidadeInteressado?.valor,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
            }
        }, dMain);
        const dIcon = MFt.criaElem('div', {

        }, dMain);
        const iDel = new Image(32);
        iDel.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMjgwLTEyMHEtMzMgMC01Ni41LTIzLjVUMjAwLTIwMHYtNTIwaC00MHYtODBoMjAwdi00MGgyNDB2NDBoMjAwdjgwaC00MHY1MjBxMCAzMy0yMy41IDU2LjVUNjgwLTEyMEgyODBabTQwMC02MDBIMjgwdjUyMGg0MDB2LTUyMFpNMzYwLTI4MGg4MHYtMzYwaC04MHYzNjBabTE2MCAwaDgwdi0zNjBoLTgwdjM2MFpNMjgwLTcyMHY1MjAtNTIwWiIvPjwvc3ZnPg==';
        iDel.style.cursor = 'pointer';
        iDel.onclick = async ()=>{
            dNome.className = 'blink_opacity'
            MFt.clear(dNome);
            MFt.clear(dCPF);
            MFt.clear(dModal);
            MFt.clear(dIcon);
            dNome.innerText = 'Excluindo...';
            const xml = new RequestMF();
            const res = this.super_get(xml, this.deleteInteressadoProcesso(this.interessado.id));
            console.group('EXCLUIR INTERESSADO PROCESSO');
            console.log(res);
            console.groupEnd();
            await this.esperar(1000); // Necessário para evitar que o cache do Super devolva os mesmos dados de antes do delete
            const interessados = await this.super_get(xml, this.get_processo_interessados(this.pai.processo.id), true);
            await this.pai.resetListaInteressados(interessados);
        }
        dIcon.appendChild(iDel);

        dMain.onmouseenter = ()=>{
            dMain.style.backgroundColor = '#fffecf';
        }
        dMain.onmouseleave = ()=>{
            dMain.style.backgroundColor = 'white';
        }
    }

    editarInteressado() {
        MFt.clear(this.divEdicao);
        MFt.atribs(this.divEdicao, {
            style: {
                border: '1px solid #AAA',
                padding: '5px',
                marginTop: '22px',
                borderRadius: '10px'
            }
        });

    }
}