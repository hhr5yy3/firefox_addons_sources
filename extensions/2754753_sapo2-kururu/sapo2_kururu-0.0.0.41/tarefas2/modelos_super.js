class ModelosSuper extends Payloads {
    constructor(criar_modelo, div, tarefas) {
        super();
        this.criar_modelo = criar_modelo;
        this.div = div;
        MFt.clear(this.div);
        this.xml = new RequestMF();
        this.tarefas = tarefas;
        console.group('tarefas modelos_super.js');
        console.log(tarefas);
        console.groupEnd();
        this.init();
    }

    async init() {
        const wrapper = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '50px auto auto',
            }
        }, this.div);
        const d1 = MFt.criaElem('div', {
            innerText: 'Modelos do SuperSapiens disponíveis para o usuário',
            style: {
                fontSize: '22px',
                fontFamily: 'Titillium Web',
                fontWeight: 'bold',
                padding: '0 0 10px 0',
                margin: '0 0 10px 0',
                borderBottom: '1px solid #AAA',
            }
        }, wrapper);
        const d2 = MFt.criaElem('div', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
            }
        }, wrapper);
        const d3 = MFt.criaElem('div', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
            }
        }, wrapper);
        const d4 = MFt.criaElem('div', {
            style: {
                marginTop: '15px',
                fontFamily: 'Titillium Web',
                fontSize: '14px',
            }
        }, wrapper);
        const d5 = MFt.criaElem('div', {
            style: {
                marginTop: '15px',
                fontFamily: 'Titillium Web',
                fontSize: '14px',
            }
        }, wrapper);
        const voltar = new MFt.bt({
            value: 'Voltar',
            width: 120,
            height: 30,
            marginTop: '30px',
            wrapper: MFt.criaElem('div', null, d5),
            callback: ()=>{
                this.criar_modelo.init2(this.div);
            }
        });
        const obter_atividade = async termos => {
            console.group('PROFILE');
            console.log(this.profile);
            console.groupEnd();
            let radioButton = document.querySelector('input[name="opcoesRadio"]:checked');
            let selectedValue = radioButton ? radioButton.value : null;
            let valor = selectedValue === 'Pesquisa Ampla' ? '' : selectedValue;
            console.group('RADIO ---------------');
            console.log(selectedValue, valor);
            console.groupEnd();
            return await this.super_get(this.xml, this.get_modelos(termos, valor), true);
        }
        const d_atividade = MFt.criaElem('div', {style:{}}, d2);
        const d_opcoes = MFt.criaElem('div', {style:{paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid #AAA'}}, d2);
        const inp_modelo = new InputMF('MODELO:', d_atividade, async (termos, identificador)=>{
            const res = await obter_atividade(termos);
            //console.group('MODELOS');
            //console.log(res);
            //console.groupEnd();
            if (res) {
                const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                return {dados, identificador};
            }
            return {dados: [], identificador};
        }, null, null);
        inp_modelo.elem_inp.placeholder = 'Ex.: ecju, cpuc, cju, engenharia, scom, etc...';
        const opRadioOnChange = ()=>{
            inp_modelo.clear();
            MFt.clear(d3);
            MFt.clear(d4);
            inp_modelo.focus();
        }
        const opRadio = this.criarRadio(['Pesquisa Ampla', 'Nacional', 'Unidade', 'Setor', 'Individual', 'Em Branco'], 'opcoesRadio', d_opcoes, opRadioOnChange);
        inp_modelo.onchange = e=>{
            MFt.clear(d4);
            console.group('inp_modelo');
            console.log(inp_modelo);
            console.groupEnd();
            MFt.clear(d3);
            if (Number.isInteger(inp_modelo.id) && Number.isInteger(inp_modelo?.item?.tudo?.documento?.tipoDocumento.id)) {
                this.show_dados_comp(inp_modelo.item.tudo, d3);
                const bt = new MFt.bt({
                    value: 'Criar Minuta',
                    width: 120,
                    height: 30,
                    wrapper: d4,
                    callback: async () => {
                        console.log(inp_modelo);
                        this.criar_modelo.pop.clicafora_sair = this.criar_modelo.pop.aceitaEsc = false;
                        MFt.clear(d2);
                        MFt.clear(d3);
                        MFt.clear(d4);
                        const w1 = MFt.criaElem('div', {

                        }, d2);
                        const s1 = MFt.criaElem('div', {
                            innerText: 'Criando minuta... ',
                            style: {
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                            }
                        }, d2);
                        const img1 = new Image(24);
                        img1.onload = ()=>{
                            s1.appendChild(img1);
                        }
                        img1.src = '/images/throbber_13.gif';
                        img1.style.marginLeft = '10px';
                        //const minuta = await this.super_get(this.xml, this.criar_minuta(this.tarefas[0].id, null, inp_modelo.item.tudo.modalidadeModelo.id));
                        const componente_modelo = await this.super_get(this.xml, this.get_componente_digital(inp_modelo.item.tudo.documento.componentesDigitais[0].id));
                        const html_modelo = this.html_completo(extrair_HTML_do_conteudo(componente_modelo.conteudo));
                        const orgaoCentral = await this.super_get(this.xml, this.get_unidade_pelo_id(this.tarefas[0].setorResponsavel.unidade.id), true, true);
                        this.orgaoCentral = {nome: orgaoCentral?.modalidadeOrgaoCentral?.descricao || 'CONSULTORIA-GERAL DA UNIÃO', sigla: orgaoCentral?.modalidadeOrgaoCentral?.valor || 'CGU'};
                        // alert(`${orgaoCentral?.modalidadeOrgaoCentral?.descricao}`);
                        const novo_documento = new CriarDocumento(this.tarefas[0], inp_modelo.item.tudo.documento.tipoDocumento.nome, this.converter_tipo_doc(inp_modelo.item.tudo.id), html_modelo, null, null, true, null, this.orgaoCentral);
                        const doc_criado = await novo_documento.init();
                        const link_documento = doc_criado ? await novo_documento.link_documento() : null;
                        console.group('modelos_super.js');
                        console.log(link_documento);
                        console.groupEnd();
                        if (!link_documento) {
                            d2.innerText = 'Erro na criação da minuta! Pressione ESC para sair.';
                            d2.style.color = 'red';
                            this.criar_modelo.pop.clicafora_sair = this.criar_modelo.pop.aceitaEsc = true;
                            return;
                        }
                        s1.innerText = 'Abrindo editor do Super...';
                        s1.appendChild(img1);
                        window.open(link_documento);
                        setTimeout(()=>{
                            this.criar_modelo.pop.closeWindow(this.criar_modelo.pop);
                        }, 1000);
                    }
                });
                const btView = new MFt.bt({
                    value: 'Visualizar',
                    wrapper: d4,
                    width: 120,
                    height: 30,
                    marginLeft: '15px',
                    callback: async ()=>{
                        btView.disabled = true;
                        const html = await this.super_get(this.xml, this.get_componente_digital(inp_modelo.item.tudo.documento.componentesDigitais[0].id));
                        btView.disabled = false;
                        //console.group('HTML');
                        //console.log(extrair_HTML_do_conteudo(html.conteudo));
                        //console.groupEnd();
                        const html_modelo = this.html_completo(extrair_HTML_do_conteudo(html.conteudo));
                        this.blob = new Blob([html_modelo], { type: 'text/html',  });
                        const _URL = window.URL || window.webkitURL;
                        const doc = _URL.createObjectURL(this.blob);
                        window.open(doc);
                    }
                });
            }
            else {
                MFt.clear(d4);
            }
        }
        inp_modelo.oninput = e=> {
            if (!Number.isInteger(inp_modelo.id)) {
                MFt.clear(d3);
                MFt.clear(d4);
            }
        }
        inp_modelo.focus();
    }

    html_completo(inner_html) {
        let html = '<!DOCTYPE HTML><html><head>';
        const style = '<style> p {text-indent: 25mm;text-align: justify;font-family: "Calibri, sans-serif";font-size: 11pt;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;} body {font-family: "Calibri, sans-serif";font-size: 11pt;counter-reset: H1 numerado;margin-top: 5%;margin-right: auto;margin-left: auto;max-width: 210mm;line-height: 1.2em;} h1:before {content: counter(H1) ". ";counter-increment: H1;display: inline-block;width: 25mm;} h1 {counter-reset: H2;font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;font-weight: bold;text-transform: uppercase;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;} h2:before {content: counter(H1) "." counter(H2) " ";counter-increment: H2;display: inline-block;width: 25mm;} h2 {font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;font-weight: bold;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;} p.numerado:before {content: counter(numerado) ". ";counter-increment: numerado;display: inline-block;width: 25mm;font-weight: normal;} p.numerado {text-indent: 0mm;text-align: justify;font-family: "Calibri, sans-serif";font-size: 11pt;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;font-weight: normal;} img {max-width: 160mm;} table {border-width: 1px;border-spacing: 2px;border-color: black;border-collapse: collapse;font-size: 11pt;max-width: 160mm;word-break: break-word;} table th {border-width: 1px;padding: 2px;border-color: black;font-size: 11pt;} table td {border-width: 1px;padding: 2px;border-color: black;font-size: 11pt;} table td p {text-align: justify;text-indent: 0mm;} ul {font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;list-style-type: circle;margin-left: 18mm;} ol {font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;margin-left: 18mm;} blockquote {font-family: "Calibri, sans-serif";font-size: 10pt;text-align: justify;padding-left: 40mm;padding-right: 0mm;margin-top: 0;margin-bottom: 0.2em;margin-right: 0mm;} .centralizado {text-align: center;text-indent: 0;} .direita {text-align: right;text-indent: 0;} .esquerda {text-align: left;text-indent: 0;} p span.cke_widget_inline {text-indent: 0mm !important;} section ol {font-family: "Calibri, sans-serif";margin-left: 2mm !important;} section.footnotes {margin-top: 4.2mm;padding-top: 2.2mm;}</style>';
        html += style;
        html += '</head><body>';
        html += inner_html;
        html += '</body></html>';
        return html;
    }


    show_dados_comp(dd, div) {
        // console.group('SHOW DADOS COMP');
        // console.log(dd);
        // console.groupEnd();
        const field = (label, val)=>{
            const d1 = MFt.criaElem('div', {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px'
                }
            }, div);
            const s1 = MFt.criaElem('span', {
                innerText: label,
                style: {
                    fontWeight: 'bold',
                }
            }, d1);
            const s2 = MFt.criaElem('span', {
                innerText: val,
                style: {
                    fontWeight: 'normal',
                }
            }, d1);
        }
        const autor = dd?.documento?.criadoPor?.nome || '---';
        const data = this.validaData(dd?.documento?.criadoEm);
        MFt.clear(div);
        field('AUTOR: ', autor);
        field('DATA DA CRIAÇÃO: ', data instanceof Date ? this.date2normal(data) : '---');
        if (Array.isArray(dd?.vinculacoesModelos)) {
            for(let mm of dd.vinculacoesModelos) {
                if (mm?.unidade?.sigla) field('UNIDADE: ', mm.unidade.sigla);
            }
            for(let mm of dd.vinculacoesModelos) {
                if (mm?.especieSetor?.nome) field('ESPÉCIE: ', mm.especieSetor.nome);
            }
        }
        if (dd?.documento?.tipoDocumento?.nome) {
            field('TIPO DOCUMENTO: ', `${dd?.documento?.tipoDocumento?.nome} (${dd?.id}/${dd?.documento?.tipoDocumento?.id})`);
        }
    }

    converter_tipo_doc(id) {
        let ret = id;
        switch (id) {
            case 33: // modelo de parecer que demanda conteudo
                ret = 5; // modelo de parecer sem conteudo
                break;
            case 15:
                ret = 3; // Cota sem conteúdo
                break;
            case 30:
                ret = 2; // no content "nota"
                break;
            case 26:
                ret = 2122; // no content "informações em mandado de seguranca"
                break;
            case 1045:
                ret = 1045; // Despacho de aprovação
                break;
            case 96:
                ret = 96; // petição em branco
                break;
            case 63:
                ret = 63; // termo de reuniao
                break;
            case 89:
                ret = 89; // embargos de declaracao
                break;
            // default:
                //ret = 1; // despacho sem conteudo
        }
        //alert(`Converter tipo: ${id} -> ${ret}`);
        return ret;
    }

    criarRadio(labels, name, elem, onchange) {
        /*
        var radioButton = document.querySelector('input[name="yourRadioName"]:checked');
        var selectedValue = radioButton ? radioButton.value : null;
         */
        if (!Array.isArray(labels)) throw new Error('labels precisa ser array');
        const radios = [];
        const d1= MFt.criaElem('div', {}, elem);
        for(let label of labels) {
            const eLabel= MFt.criaElem('label', {
                style: {
                    cursor: 'pointer',
                    marginRight: '20px',
                }
            }, d1);
            const i1 = MFt.criaElem('input', {
                type: 'radio',
                value: label,
                name,
            }, eLabel);
            if (!radios.length) i1.checked = true;
            radios.push(i1);
            i1.onchange = onchange;
            const s1 = MFt.criaElem('span', {
                innerText: label,
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px',
                    marginLeft: '5px',
                }
            }, eLabel);
        }
        return radios;
    }
}