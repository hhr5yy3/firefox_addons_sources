class TelaAnotacao extends Payloads {
    constructor(id_comp, pag, id_proc, nup, titulo, anotacao, cor, mimetype, juntada, pai) {
        super();
        this.main_url = 'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/super.py';
        this.id_comp = id_comp;
        this.pag = pag;
        this.id_proc = id_proc;
        this.nup = nup;
        this.titulo = titulo || ''; // Necessario para o processo de comparacao em is_diferente()
        this.anotacao = anotacao || ''; // Necessario para o processo de comparacao em is_diferente()
        this.cor = cor || 0; // NÃO DEVE SER USADO PARA OBTER A COR ATUAL DA ANOTAÇÃO. PARA A COR ATUAL USE: this.icone.cor. Esta propriedade é necessaria para o processo de comparacao em is_diferente()
        this.mimetype = mimetype;
        this.juntada = juntada;
        this.pai = pai;
        this.icone = undefined;
    }

    get height() {return Number.isInteger(this.pag) || this.mimetype === "application/pdf" ? 580 : 578}

    doit() {
        const smallWindow = parseInt(getComputedStyle(document.body).width) <= 1366;
        const sizes = smallWindow ?
            { // SMALL
                w: 640, // janela width
                h: 480, // janela height
                i: 450, // input width
                tw: 600, // TextArea Width
                th: 250, // TextArea Height

            } :
            { // NORMAL
                w: 758,
                h: 580,
                i: 570, // input width
                tw: 704, // TextArea Width
                th: 350, // TextArea Height
            };
        return new Promise(rr=>{
            const pp = new PopUp(sizes.w, sizes.h, null, null, form=>{
                let ultimo_elemento_editado = undefined; // Vai servir para indicar qual o elemento onde estava o foco antes do clique de movimentar o PopUp
                const is_valido = ()=>{
                    return (this.mimetype === 'application/pdf') ?
                        titulo.value.trim() && Number.isInteger(parseInt(pagina.value.trim())) :
                        !(!titulo.value.trim());
                };
                const is_diferente = ()=>{
                    // console.log(`COR: ${this.icone.cor}, ${this.cor}`);
                    // console.log(`TITULO: ${titulo.value.trim()}, ${this.titulo.trim()}`);
                    // console.log(`ANOTACOES: ${anotacoes.value.trim()}, ${this?.anotacao?.trim()}`);
                    // console.log(`PAGINA: ${this.pag}, ${Number.isInteger(parseInt(pagina?.value?.trim())) ? parseInt(pagina?.value?.trim()) : null}`);
                    return this.icone.cor !== this.cor ||
                        (titulo?.value.trim() || '') !== this.titulo.trim() ||
                        (anotacoes?.value.trim() || '') !== this.anotacao.trim() ||
                        (Number.isInteger(parseInt(pagina?.value?.trim())) ? parseInt(pagina?.value?.trim()) : null) !== this.pag;
                };
                const verificar = ()=>bt_salvar.disabled = !(is_valido() && is_diferente());
                //MFt.clear(form.div);
                MFt.atribs(form.div, {
                    style: {
                        fontFamily: '"Titillium Web", "Arial"',
                        fontSize: '14px',
                        paddingLeft: '40px'
                    }
                });
                // --------------------------------------------------------------------------
                // MOVIMENTAÇÃO DA JANEJA ---------------------------------------------------
                const header = MFt.criaElem('div', {
                    innerText: '...',
                    style: {
                        width: '100%',
                        height: '26px',
                        background: '#EEE',
                        padding: '5px 10px',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'grab',
                        userSelect: 'none' // Não permite a seleção do texto
                    }
                }, form.div);
                header.onmousedown = e=>{
                    console.log(e);
                    header.style.cursor = 'grabbing';
                    header.innerText = 'Mova o mouse lentamente...';
                    const clear_move = ()=>{
                        window.onmousemove = null;
                        header.style.cursor = 'grab';
                        if (['[object HTMLInputElement]', '[object HTMLTextAreaElement]'].some(d=>d===Object.prototype.toString.call(ultimo_elemento_editado))) {
                            ultimo_elemento_editado.focus();
                        }
                        window.onmouseup = null;
                        // Depois de mouseup esta chamada não pode estar registrada
                        form.div.onmouseleave = null;
                        header.innerText = '...';
                    }
                    window.onmousemove = e=>{ // O contexto precisa ser window porque o mouse pode sair do contexto do elemento header
                        const bounds = form.div.getBoundingClientRect();
                        const posX = bounds.left + e.movementX;
                        const posY = bounds.top + e.movementY;
                        if (getComputedStyle(form.div).margin === 'auto') {
                            form.div.style.margin = '0'; // Necessário retirar para o browser não tentar centralizar a janela
                            form.div.style.top = `${bounds.top}px`;
                            form.div.style.left = `${bounds.left}px`;
                            // Retira o esmaecimento de fundo e permite o mouse scroll
                            form.pano.style.display = 'none';
                            window.removeEventListener('DOMMouseScroll', form.preventDefault, false);
                            window.removeEventListener('keydown', form.keyDown, false);
                        }
                        //console.log('X:', posX, 'LIMITE X:', window.screen.width - (bounds.width / 4));
                        if (posX > (-bounds.width + 100) && posX < (window.screen.width - (bounds.width / 4)) && posY > 0) {
                            form.div.style.left = `${posX}px`;
                            form.div.style.top = `${posY}px`;
                            form.div.style.transition = 'none';
                        }

                    }
                    window.onmouseup = e=>{
                        //console.group('ON MOUSE UP ------------------------------------');
                        //console.log(e);
                        //console.groupEnd();
                        // O contexto precisa ser window porque o mouse pode sair do contexto do elemento header
                        clear_move();
                    };
                    form.div.onmouseleave = e=>{
                        console.group('ON MOUSE LEAVE ------------------------------------');
                        console.log(e);
                        console.groupEnd();
                        clear_move();
                    }
                };
                // --------------------------------------------------------------------------
                let pagina;
                if (Number.isInteger(this.pag) || this.mimetype === 'application/pdf') { // Arquivos PDF ---------------------
                    const d2 = MFt.criaElem('div', {
                        style: {
                            padding: '10px 0',
                            margin: '10px 0 0 0 ',
                        }
                    }, form.div); // pagina
                    MFt.criaElem('span', {
                        innerText: 'Página: ',
                        style: {
                            fontWeight: 'bold',
                            userSelect : 'none',
                        }
                    }, d2);
                    pagina = MFt.criaElem('input', {
                        type: 'text',
                        value: Number.isInteger(this?.pag) && this.pag > 0 ? this.pag.toString() : '',
                        style: {
                            width: '170px',
                            border: '0',
                            borderBottom: '1px dotted #CCC',
                            outline: 'none',
                            fontFamily: '"Titillium Web", "Arial"',
                            fontSize: '14px'
                        }
                    }, d2);
                    pagina.onkeyup = verificar;
                    pagina.disabled = Number.isInteger(this?.pag) && this.pag > 0; // Impedir que o numero da pagina seja alterado
                    pagina.focus();
                }
                const d1 = MFt.criaElem('div', {
                    style: {
                        left: '-17px',
                        position: 'relative',
                        marginTop: this.mimetype !== 'application/pdf' ? '20px' : '0', // Quando não é PDF o elemento que indica a página e o espaço ausente precisa ser compensado para que o elemento header apareça normalmente
                        userSelect : 'none',
                    }
                }, form.div);
                this.icone = new PaletaCores(d1, 15, this.cor || 0, ()=>verificar());
                this.icone.main_div.style.marginRight = '7px';
                this.icone.main_div.style.top = '3px';
                MFt.criaElem('span', {
                    innerText: 'Título do documento: ',
                    style: {
                        fontWeight: 'bold',
                        userSelect : 'none',
                    }
                }, d1);
                const titulo = MFt.criaElem('input', {
                    type: 'text',
                    value: this.titulo,
                    style: {
                        width: `${sizes.i}px`,
                        marginLeft: '10px',
                        border: '0',
                        borderBottom: '1px dotted #CCC',
                        outline: 'none',
                        fontFamily: '"Titillium Web", "Arial"',
                        fontSize: '14px'
                    }
                }, d1, {list:'tipos_docs'});
                titulo.onblur = ()=>ultimo_elemento_editado = titulo;
                // Titulo focus()
                if (this.mimetype !== 'application/pdf' || pagina?.disabled) titulo.focus();
                let d3 = MFt.criaElem('div', {}, form.div);
                MFt.criaElem('p', {
                    innerText: 'Anotações:',
                    style: {
                        fontFamily: '"Titillium Web", "Arial"',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        userSelect: 'none'
                    }
                }, d3);
                const anotacoes = MFt.criaElem('textarea', {
                    value: this.anotacao,
                    style: {
                        width: `${sizes.tw}px`,
                        height: `${sizes.th}px`,
                        resize: 'none',
                        border: 'none',
                        outline: 'none',
                        fontFamily: '"Titillium Web", "Arial"',
                        fontSize: '14px',
                        paddingLeft: '15px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        marginLeft: '15px',
                        marginBottom: '20px',
                        borderLeft: '1px dotted #CCC',
                        backgroundColor: '#fffcf1',
                        boxShadow: '2px 2px 7px #dfdcd0',
                        textAlign: 'justify'
                    }
                }, d3);
                anotacoes.onblur = ()=>ultimo_elemento_editado = anotacoes;
                // ------------------------------------------------------------------------------------------
                // SALVAR -----------------------------------------------------------------------------------
                // ------------------------------------------------------------------------------------------
                const salvar = async ()=>{
                    console.log('SALVAR ---------------------------------');
                    if (bt_salvar.disabled) return;
                    bt_salvar.disabled = true;
                    let dados_marcador = undefined;
                    if (marcador?.checked) {
                        dados_marcador = {
                            nome: titulo.value.trim(),
                            descricao: '',
                            juntada: this.juntada.id,
                            processo: this.id_proc,
                            componente: this.id_comp,
                            cor: AnotacoesCores.cores[this.icone.cor],
                            pagina: (()=>{
                                let ret = undefined;
                                if (isNaN(pagina.value.trim())) {
                                    alert('Erro no numero da pagina');
                                    return false;
                                }
                                try{
                                    ret = parseInt(pagina.value.trim());
                                }
                                catch (e) {
                                    alert('Erro de parseInt no numero da pagina');
                                    return false;
                                }
                                return ret;
                            })()
                        }
                    }
                    const res = await this.salvar(this.id_comp, titulo.value.trim(), anotacoes.value.trim(), (pagina ? parseInt(pagina.value.trim()) : null), this.icone.cor, this.id_proc, this.nup, form, dados_marcador, this.titulo.trim() !== titulo.value.trim() || this.cor !== this.icone.cor);
                    if (res) {
                        form.closeWindow(form);
                        rr(res); // retorna a seqs.js -> anotar()
                    }
                    bt_salvar.disabled = false;
                };
                let marcador = undefined;
                if (this.mimetype === "application/pdf") {
                    const div_marcador = MFt.criaElem('div', {}, form.div);
                    marcador = this.campo_checkbox('Inserir marcador no Super', true, div_marcador, null, {
                        border: 'none',
                        margin: '0 0 5px 0'
                    });
                    marcador.onchange = ()=>{
                        console.log({
                            nome: titulo.value.trim(),
                            descricao: '',
                            juntada: this.juntada.id,
                            processo: this.id_proc,
                            componente: this.id_comp,
                            cor: AnotacoesCores.cores[this.cor],
                            pagina: (()=>{
                                let ret = undefined;
                                if (isNaN(pagina.value.trim())) {
                                    alert('Erro no numero da pagina');
                                    return false;
                                }
                                try{
                                    ret = parseInt(pagina.value.trim());
                                }
                                catch (e) {
                                    alert('Erro de parseInt no numero da pagina');
                                    return false;
                                }
                                return ret;
                            })()
                        });
                    }
                }
                const div_salvar = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '120px 120px 120px 120px'
                    }
                }, form.div);
                const bt_salvar = new MFt.bt({
                    value: 'Salvar',
                    width: 100,
                    height: 27,
                    disabled: true,
                    wrapper: div_salvar,
                    callback: ()=>salvar()
                });
                const bt_excluir = new MFt.bt({
                    value: 'Excluir',
                    width: 100,
                    height: 27,
                    disabled: !this.pag,
                    wrapper: div_salvar,
                    callback: async ()=>{
                        if (!confirm("Confirma a exclusão?")) return;
                        let res;
                        const des = form.bloquear(form, "Excluindo...");
                        const super_marcadores = await this.super_get(new RequestMF(), this.get_marcadores(this.id_proc), true);
                        const marcador = super_marcadores.filter(d=>this.id_comp === d.componenteDigital.id && d.pagina);
                        console.log(super_marcadores);
                        console.log(marcador);
                        if (marcador.length === 1) res = await this.super_get(new RequestMF(), this.delete_marcador(marcador[0].id));
                        console.log(res);
                        res = await this.request_mf(this.main_url, {
                            task: 'apagar_titulo',
                            id_comp: this.id_comp,
                            pagina: this.pag,
                            token: this.token
                        });
                        console.log(res);
                        this.pai.remover_anotacao(this.id_comp, this.pag);
                        des();
                        form.closeWindow(form);
                        rr(false);
                    }
                });
                const bt_cancelar = new MFt.bt({
                    value: 'Cancelar',
                    width: 100,
                    height: 27,
                    disabled: false,
                    wrapper: div_salvar,
                    callback: async ()=>{
                        form.closeWindow(form);
                        rr(false);
                    }
                });
                titulo.onkeyup = verificar;
                anotacoes.onkeyup = verificar;
                titulo.onkeydown = e=>{if (e.key === 'Enter') salvar();};
                verificar();
                const transparencia = MFt.criaElem('div', {
                    innerText: 'Transparência',
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '29px',
                        marginLeft: '0px',
                        border: '1px dotted #CCC',
                        padding: '0 10px',
                        borderRadius: '7px'
                    }
                }, div_salvar);
                transparencia.onmouseenter = (e) => {
                    form.div.style.opacity = 0;
                };
                transparencia.onmouseleave = (e) => {
                    form.div.style.opacity = 1;
                };
                let div_obs = MFt.criaElem('div', {}, form.div);
                MFt.criaElem('p', {
                    innerText: 'Obs.: Todas as anotações feitas aqui estarão disponíveis aos outros usuários.',
                    style: {
                        fontFamily: '"Titillium Web", "Arial"',
                        fontSize: '14px',
                        marginTop: '20px'
                    }
                }, div_obs);
            });
            // ----------------------------- Fim do formulario
            pp.iniciar(pp);
            pp.aceitaEsc = true;
        });
    }

    async salvar(id_comp, titulo, anotacao, pagina, cor, id_proc, nup, form, dados_marcador, atualizar_super) {
        form.aceitaEsc = false;
        form.clicafora_sair = false;
        const mask = MFt.criaElem('div', {
            style: {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                padding: '20px',
                background: 'white'
            }
        }, form.div);
        const msg = MFt.criaElem('div', {
            innerText: 'Salvando...'
        }, mask);
        const url = this.main_url;
        let tempo = new Date();
        const res = await this.request_mf(url, {
            task: 'set_titulo',
            id_comp,
            titulo,
            desc_txt: anotacao,
            pagina,
            cor,
            id_proc,
            nup,
            token: this.token
        }, 'post');
        // await this.esperar(2000);
        // const res = 'ok';
        console.log(res);
        console.log(dados_marcador);
        console.log(`ANOTACAO CRIADA EM MANOELPAZ - ${(((new Date()).valueOf()/1000) - (tempo.valueOf()/1000)).toFixed(3)}ms -------------------------------------------`);
        // MFt.clear(mask);
        // MFt.criaElem('div', {
        //     innerText: 'Marcador...'
        // }, mask);
        tempo = new Date();
        if (dados_marcador && atualizar_super) { // Só tenta atualizar no Super se houver modificação do título ou da cor
            MFt.clear(mask);
            MFt.criaElem('div', {
                innerText: 'Atualizando marcador...'
            }, mask);
            //console.log('Atualizando marcador', new Date());
            //console.log(this.pai);
            // Adiciona o marcador à lista de marcadores que devem ser incluídos no Processo no Super
            // É que preciso de um gerenciador porque o Super não permite atualização do marcador e apagar o marcador para depois inserir um novo no mesmo lugar tem efeito retardado no DB.
            // Nao se espera o resultado da adicao do novo marcador
            this.pai.pai.marcadores_para_atualizar.adicionar_marcador(dados_marcador);
        }
        console.log(`Tempo de Atualizar marcador: ${new Date().valueOf() - tempo}ms`);
        tempo = new Date();
        if (res?.rowid) {
            this.pai.tela_direita.setAttribute('comp_id_pagina', pagina); // Para que o novo item criado apareça selecionado após a criação, o que ocorre em item.js exibir()
            mask.parentNode.removeChild(mask);
            form.aceitaEsc = true;
            form.clicafora_sair = true;
            console.log(`Tempo de tela direita: ${new Date().valueOf() - tempo}ms`);
            return {
                rowid: res.rowid,
                id_comp,
                titulo,
                texto_txt: anotacao,
                pagina,
                cor,
                id_proc,
                nup
            };
        }
        else {
            msg.innerText = `Erro ao salvar os dados!`;
            await (()=>{
                return new Promise(rr=>{
                    const wrapper = MFt.criaElem('div', null, mask);
                    new MFt.bt({
                        value: 'Ok',
                        width: 100,
                        height: 30,
                        marginTop: '10px',
                        wrapper,
                        callback: ()=>{
                            mask.parentNode.removeChild(mask);
                            form.aceitaEsc = true;
                            form.clicafora_sair = true;
                            rr();
                        }
                    });
                })
            })();
        }
        return false;
    }
}