class CriarNUP extends Payloads {
    constructor(wrapper) {
        super();
        this.wrapper = wrapper;
        this.popup = undefined;
        if (!(this instanceof HTMLElement)) {
            this.popup = new PopUp(800, 600, null, null, form=>{
                this.wrapper = form.div;
            });
            this.popup.iniciar(this.popup);
        }
        this.xml = new RequestMF();
        this.inicializar();
    }

    async inicializar() {
        MFt.clear(this.wrapper);
        MFt.atribs(this.wrapper, {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
            }
        });
        const d1 = MFt.criaElem('div', {
            style: {
                height: '100%',
                display: "grid",
                gridTemplateRows: '50px auto',
            }
        }, this.wrapper);
        // ------------------------------------------------------------------------------
        const validar_valor = num=>{
            let exp = num.toString().trim().replaceAll(/\./g, '').replaceAll(/,/g, '.');
            let val = parseFloat(exp);
            return !Number.isNaN(val);
        }
        const validar_form = ()=>{
            bt_criar_nup.disabled = true;
            if (!checknup.checked && !this.validaNUP(inpnup.value.trim())) {
                div_aviso.innerText = 'Erro no NUP';
                return false;
            }
            if (!Number.isInteger(classificaInput.id) && classificaInput.id > 0) {
                div_aviso.innerText = 'Erro na classificacao';
                return false;
            }
            if (!Number.isInteger(procedenciaInput.id) && procedenciaInput.id > 0) {
                div_aviso.innerText = 'Erro na procedencia';
                return false;
            }
            const options_sel_especie = Array.from(sel_especie.options);
            const options_sel_meio_proc = Array.from(sel_meio_proc.options);
            const options_sel_setor = Array.from(sel_setor.options);
            if (options_sel_especie.length > 1 && sel_especie.selectedIndex === 0) {
                div_aviso.innerText = 'Erro na especie';
                return false;
            }
            if (options_sel_meio_proc.length > 1 && sel_meio_proc.selectedIndex === 0) {
                div_aviso.innerText = 'Erro no meio do processo';
                return false;
            }
            if (options_sel_setor.length > 1 && sel_setor.selectedIndex === 0) {
                div_aviso.innerText = 'Erro no setor';
                return false;
            }
            if (!check_valor.checked && (!validar_valor(inpvalor.value) || this.string2float(inpvalor.value) === 0.0)) {
                div_aviso.innerText = 'Erro no valor (1)';
                return false;
            }
            if (titulo_textarea.value.trim().length === 0) {
                div_aviso.innerText = 'Sem titulo';
                return false;
            }
            if (titulo_textarea.value.trim().length > 250) {
                div_aviso.innerText = 'Titulo grande demais';
                return false;
            }
            div_aviso.innerText = '';
            bt_criar_nup.disabled = false;
        }
        // ------------------------------------------------------------------------------
        const titulo = MFt.criaElem('div', {
            innerText: 'Criar novo NUP',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'Titillium Web',
                borderBottom: '1px solid #AAA',
                paddingBottom: '5px',
                marginBottom: '5px',
            }
        }, d1);
        const divform = MFt.criaElem('div', {
            style: {
                height: '100%',
            }
        }, d1);
        const divnup = MFt.criaElem('div', {

        }, divform);
        const labelnup = MFt.criaElem('span', {
            innerText: 'NUP: ',
            style: {

            }
        }, divnup);
        const inpnup = MFt.criaElem('input', {
            type: 'text',
            style: {
                outline: 'none',
                width: '200px',
                padding: '5px',
                border: '1px solid #AAA',
                borderRadius: '4px',
                marginLeft: '5px',
            }
        }, divnup);
        inpnup.onblur = ()=>{
            const nup = this.validaNUP(inpnup.value);
            if (nup) {
                inpnup.value = this.formatanup(nup);
            }
        }
        inpnup.oninput = ()=>validar_form();
        const labelchecknup = MFt.criaElem('label', {
            style: {
                cursor: 'pointer',
                marginLeft: '20px',
            }
        }, divnup);
        const checknup = MFt.criaElem('input', {
            type: 'checkbox',
            style: {
                marginLeft: '5px',
            }
        }, labelchecknup);
        checknup.onchange = ()=>{
            if (checknup.checked) {
                inpnup.value = '';
                inpnup.disabled = true;
            }
            else {
                inpnup.value = '';
                inpnup.disabled = false;
            }
        }
        MFt.criaElem('span', {
            innerText: 'Número automático do NUP',
        }, labelchecknup);
        inpnup.focus();
        // CLASSIFICAÇÃO ----------------------------------------------------------------------------
        const div_classsifica = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                padding: '5px',
                borderRadius: '4px',
                marginTop: '5px',
            }
        }, divform);
        MFt.criaElem('div', {
            innerText: 'CLASSIFICAÇÃO DO PROCESSO: ',
            style: {
                fontWeight: 'bold',
            }
        }, div_classsifica);
        const div_classifica_sub = MFt.criaElem('div', {

        }, div_classsifica);
        const get_classifica = async termos=>{
            return await this.super_get(this.xml, this.get_classificacao_processo(termos), true);
        }
        let classificaInput = new InputMF('', div_classifica_sub, async (termos, identificador) =>{
            const res = await get_classifica(termos);
            console.group('CLASSIFICA');
            console.log(res);
            console.groupEnd();
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome: d.nome, tudo: d}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, null, null, validar_form);
        // PROCEDÊNCIA ----------------------------------------------------------------------------
        const divprocede = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                borderRadius: '4px',
                padding: '5px',
                margin: '5px 0 5px 0',
            }
        }, divform);
        MFt.criaElem('div', {
            innerText: 'PROCEDÊNCIA',
            style: {
                fontWeight: 'bold',
            }
        }, divprocede);
        const divprocede_sub = MFt.criaElem('div', {}, divprocede);
        const getPessoa = async termos => {
            return await this.super_get(this.xml, this.getPessoa(termos), true);
        }
        const getEspecieProc = async termos => {
            return await this.super_get(this.xml, this.get_especie_processo(termos), true);
        }
        let procedenciaInput = new InputMF('', divprocede_sub, async (termos, identificador) =>{
            const res = await getPessoa(termos);
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome: d.nome, tudo: d}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, null, null, validar_form);
        // ESPÉCIE PROCESSO ----------------------------------------------------------------------------
        const especiesDeProcessos = await this.super_get(this.xml, this.get_especie_processo(), true);
        console.log(especiesDeProcessos);
        const divEspProc = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                padding: '5px',
                borderRadius: '4px',
            }
        }, divform);
        MFt.criaElem('span', {
            innerText: 'ESPÉCIE DO PROCESSO: ',
            style: {
                fontWeight: 'bold',
            }
        }, divEspProc);
        const divEspProc_sel = MFt.criaElem('span', {

        }, divEspProc);
        const sel_especie = MFt.criaElem('select', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                width: '290px',
            }
        }, divEspProc_sel);
        MFt.criaElem('option', {
            innerText: '---',
            value: '0'
        }, sel_especie);
        for(let i of especiesDeProcessos) {
            MFt.criaElem('option', {
                innerText: `${i?.nome}`,
                value: `${i?.id}`
            }, sel_especie);
        }
        sel_especie.onchange = ()=>validar_form();
        // MODALIDADE MEIO PROCESSO ----------------------------------------------------------------------------
        const modalidades_meio_processo = await this.super_get(this.xml, this.get_modalidade_meio_processos(), true);
        console.log(modalidades_meio_processo);
        const div_meio_proc = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                padding: '5px',
                borderRadius: '4px',
                marginTop: '5px',
            }
        }, divform);
        MFt.criaElem('span', {
            innerText: 'MEIO DO PROCESSO: ',
            style: {
                fontWeight: 'bold',
            }
        }, div_meio_proc);
        const sel_meio_proc = MFt.criaElem('select', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                width: '290px',
            }
        }, div_meio_proc);
        MFt.criaElem('option', {
            innerText: '---',
            value: '0'
        }, sel_meio_proc);
        for(let i of modalidades_meio_processo) {
            MFt.criaElem('option', {
                innerText: `${i?.descricao}`,
                value: `${i?.id}`
            }, sel_meio_proc);
        }
        sel_meio_proc.onchange = ()=>validar_form();
        // SETOR RESPONSÁVEL -------------------------------------------------
        const div_setor_responsavel = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                borderRadius: '4px',
                padding: '5px',
                margin: '5px 0 5px 0',
            }
        }, divform);
        MFt.criaElem('span', {
            innerText: 'SETOR RESPONSÁVEL: ',
            style: {
                fontWeight: 'bold',
            }
        }, div_setor_responsavel);
        const div_setor_responsavel_sub = MFt.criaElem('span', {}, div_setor_responsavel);
        console.group('setor responsavel');
        console.log(this.profile);
        console.groupEnd();
        const lista_setores = this.profile.colaborador.lotacoes.map(d=>d.setor.id);
        const setores = await this.super_get(this.xml, this.get_buscar_lista_setores(lista_setores), true);
        console.group('INFORMAÇÕES SOBRE SETORES DE LOTAÇÃO');
        console.log(setores);
        console.groupEnd();
        const sel_setor = MFt.criaElem('select', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                width: '500px',
            }
        }, div_setor_responsavel_sub);
        if (Array.isArray(setores) && setores.length > 1) {
            MFt.criaElem('option', {
                innerText: `---`,
                value: `0`,
            }, sel_setor);
        }
        for(let i of setores) {
            MFt.criaElem('option', {
                innerText: `${i.nome} - ${i.unidade.sigla}`,
                value: `${i.id}`,
            }, sel_setor);
        }
        sel_setor.onchange = ()=>validar_form();
        // VALOR -------------------------------------------------------------
        const divvalor = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                borderRadius: '4px',
                padding: '5px',
                margin: '5px 0 5px 0',
            }
        }, divform);
        MFt.criaElem('span', {
            innerText: 'VALOR: ',
            style: {
                fontWeight: 'bold',
            }
        }, divvalor);
        const divvalor_sub = MFt.criaElem('span', {}, divvalor);
        const inpvalor = MFt.criaElem('input', {
            type: 'text',
            style: {
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                fontFamily: 'Titillium Web',
                width: '200px',
                borderBottom: '1px solid #AAA',
            }
        }, divvalor_sub);
        const labelvalor = MFt.criaElem('label', {
            style: {
                cursor: 'pointer',
                marginLeft: '20px',
            }
        }, divvalor_sub);
        const check_valor = MFt.criaElem('input', {
            type: 'checkbox',
            style: {
                marginRight: '5px',
            }
        }, labelvalor);
        check_valor.onchange = ()=>{
            validar_form();
            inpvalor.disabled = check_valor.checked;
        }
        MFt.criaElem('span', {
            innerText: 'Sem valor declarado',
            style: {

            }
        }, labelvalor);
        inpvalor.onblur = ()=>{
            let exp = inpvalor.value.toString().trim().replaceAll(/\./g, '').replaceAll(/,/g, '.');
            let val = parseFloat(exp);
            if (!Number.isNaN(val) && validar_valor(val)) {
                inpvalor.value = this.num2real(val);
            }
            validar_form();
        }
        // TITULO ------------------------------------------------------------
        const div_titulo = MFt.criaElem('div', {
            style: {
                border: '1px solid #AAA',
                borderRadius: '4px',
                padding: '5px',
                margin: '5px 0 5px 0',
            }
        }, divform);
        MFt.criaElem('span', {
            innerText: 'TÍTULO: ',
            style: {
                fontWeight: 'bold',
            }
        }, div_titulo);
        let max_letras_titulo = 250;
        const contador_titulo = MFt.criaElem('span', {
            innerText: `${max_letras_titulo} caracteres restantes`,
            style: {
                margin: '0 0 0 20px',
            }
        }, div_titulo);
        const div_titulo_sub = MFt.criaElem('div', {}, div_titulo);
        const titulo_textarea = MFt.criaElem('textarea', {
            style: {
                width: 'calc(100% - 10px)',
                height: '80px',
                outline: 'none',
                border: '1px solid #AAA',
                borderRadius: '4px',
                padding: '5px',
                resize: 'none',
                fontFamily: 'Titillium Web',
                fontSize: '16px',
            }
        }, div_titulo_sub);
        titulo_textarea.oninput = ()=>{
            let remaining = max_letras_titulo - titulo_textarea.value.trim().length;
            contador_titulo.innerText = `${remaining} caracteres restantes `;
            contador_titulo.style.color = remaining < 0 ? 'red' : 'black';
            contador_titulo.style.fontWeight = remaining < 0 ? 'bold' : 'normal';
            validar_form();
        }
        // BOTÕES -------------------------------------------------------
        const div_botoes = MFt.criaElem('div', {
            style: {
                margin: '10px 0 0 0',
            }
        }, divform);
        const bt_criar_nup = new MFt.bt({
            value: 'Criar NUP',
            width: 120,
            height: 30,
            wrapper: div_botoes,
            disabled: true,
            callback: async ()=>{
                if (this.popup instanceof PopUp) {
                    this.popup.aceitaEsc = this.popup.clicafora_sair = false;
                }
                d1.style.display = 'none';
                const w1 = MFt.criaElem('div', {

                }, this.wrapper);
                const msg1 = MFt.criaElem('div', {
                    innerText: 'Criando NUP... ',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '16px',
                    }
                }, w1);
                const s1 = MFt.criaElem('span', {}, msg1);
                const img = new Image(24);
                img.onload = ()=>{msg1.appendChild(s1);}
                img.src = '/images/throbber_13.gif';
                const certo = new Image(24);
                certo.src = '/images/certo.png';
                const res = await this.super_get(this.xml, this.post_criar_processo(
                    classificaInput.id,
                    new Date(),
                    parseInt(sel_especie[sel_especie.selectedIndex].value),
                    parseInt(sel_meio_proc[sel_meio_proc.selectedIndex].value),
                    inpnup.value.trim() ? inpnup.value.trim() : null,
                    procedenciaInput.id,
                    check_valor.checked,
                    parseInt(sel_setor[sel_setor.selectedIndex].value),
                    titulo_textarea.value.trim() ? titulo_textarea.value.trim() : null,
                    inpvalor.value ? this.string2float(inpvalor.value) : null,
                ));
                if (Number.isInteger(res?.id)) {
                    MFt.clear(s1);
                    s1.appendChild(certo);
                    MFt.criaElem('a', {
                        innerText: `${res?.NUPFormatado}`,
                        href: `/visualizar_nup/index.html?nup=${res?.NUP}&cache=on`,
                        target: '_blank',
                        style: {
                           marginLeft: '20px',
                        }
                    }, s1);
                    // criar tarefa
                    const setor_id = parseInt(sel_setor[sel_setor.selectedIndex].value);
                    // adotar providencias administrativas
                    const msg2 = MFt.criaElem('div', {
                        innerText: 'Criando tarefa no processo ',
                        style: {
                            fontSize: '16px',
                        }
                    }, w1);
                    const s2 = MFt.criaElem('span', {}, msg2);
                    s2.appendChild(img);
                    const prazo_dias = 5;
                    const {inicio, fim} = this.calcular_prazo_2(prazo_dias);
                    const res_criar_tarefa = await this.super_get(this.xml, this.criar_tarefa(inicio, fim, prazo_dias, 84, res.id, this.profile.id, setor_id, setor_id));
                    MFt.clear(s2);
                    if (Number.isInteger(res_criar_tarefa?.id)) {
                        s2.appendChild(certo.cloneNode());
                    }
                    else {
                        s2.innerText = 'Não foi possível criar tarefa';
                        s2.style.color = 'red';
                    }
                    const btSair = new MFt.bt({
                        value: 'Sair',
                        wrapper: MFt.criaElem('div', {}, w1),
                        width: 100,
                        height: 30,
                        marginTop: '10px',
                        callback: ()=>{
                            if (this.popup instanceof PopUp) {
                                this.popup.closeWindow(this.popup);
                            }
                        }
                    })
                    if (this.popup instanceof PopUp) {
                        this.popup.aceitaEsc = this.popup.clicafora_sair = true;
                    }
                }
                else {
                    MFt.clear(msg1);
                    msg1.style.color = 'red';
                    if (res?.message) {
                        msg1.innerText = res.message;
                    }
                    else {
                        msg1.innerText = 'Um erro não identificado ocorreu';
                    }
                    const voltar = new MFt.bt({
                        value: 'Voltar',
                        wrapper: MFt.criaElem('div', {}, w1),
                        width: 100,
                        height: 30,
                        callback: ()=>{
                            w1.parentNode.removeChild(w1);
                            d1.style.display = 'grid';
                        }
                    });
                }
            }
        });
        if (this.popup instanceof PopUp) {
            const bt_cancelar = new MFt.bt({
                value: 'Cancelar',
                width: 120,
                height: 30,
                wrapper: div_botoes,
                marginLeft: '20px',
                callback: () => {
                    this.popup.closeWindow(this.popup);
                }
            });
        }
        const div_aviso = MFt.criaElem('span', {
            style: {
                margin: '0 0 0 20px',
            }
        }, div_botoes);
    }
}