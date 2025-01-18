/**
 * OBS: MUITO EMBORA SEJA UMA ATIVIDADE CONSULTIVA QUE DEMANDE A INCLUSÃO DO COMPLEMENTO,
 * O SUPER (AO CONTRÁRIO DO SAPIENS) PERMITE O LANÇAMENTO DA ATIVIDADE SEM A INDICAÇÃO
 * DESSE COMPLEMENTO. VOU DEIXAR ASSIM, ENQUANTO O SUPER PERMITIR.
 */
class RegistrarAssessoramento extends Payloads {
    constructor(id_processo, reuniao=false) {
        super();
        this.id_processo = id_processo;
        this.reuniao = reuniao || false; // indica se é reunião de assessoramento (true) ou assessoramento informal (false)
        this.pop = undefined;
        this.id_tipo_tarefa = reuniao ? 1084 : 1544; // descricao: 1084 = "REALIZAR REUNIÃO DE ASSESSORAMENTO JURÍDICO", 1544 = "DEMANDA INFORMAL DE ASSESSORAMENTO JURÍDICO"
        this.id_tipo_atividade = reuniao ? 2999 : 2862; // descricao: 2999 = "REUNIÃO DE ASSESSORAMENTO JURÍDICO, REALIZAÇÃO", 2862 = "ASSESSORAMENTO INFORMAL, REALIZADO"
        this.id_tipo_peca = reuniao ? 22165 : 340; // MEMÓRIA DE REUNIÃO (para reunião de assessoramento) vs. TERMO EM BRANCO (para assessoramento informal)
        this.id_complemento_consultivo = 33; // ATIVIDADE FINALÍSTICA DO ASSESSORADO - ORIENTAÇÃO SOBRE ATIVIDADE FINALÍSTICA COM EFEITOS CONCRETOS
        this.nome_peca = reuniao ? 'MEMÓRIA DE REUNIÃO' : 'TERMO';
        this.xml = new RequestMF();
        this.anexarDocumentos = new AnexarDocumentos();
        this.init();
    }

    init() {
        this.pop = new PopUp(1200, 600, null, null, async form=>{
            const processo = await this.super_get(new RequestMF(), this.get_processo_info(this.id_processo), true, true);
            console.group('PROCESSO');
            console.log(processo);
            console.groupEnd();
            if (Number.isInteger(processo?.especieProcesso?.id)) {
                if (processo.especieProcesso.id !== 2) {
                    // 2 = "CONSULTIVO COMUM"

                }
            }
            const preview = new TextoSuper(this.nome_peca);
            MFt.atribs(form.div, {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Titillium Web'
                }
            });
            const d0 = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '610px auto',
                    height: '100%'
                }
            }, form.div);
            const wrapper_d1 = MFt.criaElem('div', {

            }, d0);
            const d1 = MFt.criaElem('div', {
                id: 'd1_registrar_assessoramento',
                style: {
                    paddding: '0 10px 0 0',
                }
            }, wrapper_d1);
            const dVisualizar = MFt.criaElem('div', {
                id: 'dVisualizar',
                style: {
                    width: '100%',
                    height: '100%',
                }
            }, d0);
            MFt.criaElem('div', {
                innerText: this.reuniao ? 'Registro de Reunião de Assessoramento' : 'Registro de Assessoramento Informal',
                style: {
                    fontWeight: 'bold'
                }
            }, d1);
            const d2 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 10px'
                }
            }, d1);
            const d3 = MFt.criaElem('div', {
                id: 'assessoramento_observacao',
                style: {
                    margin: '10px 0 0 10px'
                }
            }, d1);
            const d4 = MFt.criaElem('div', {
                id: 'assessoramento_texto_despacho',
                style: {
                    margin: '10px 0 0 10px'
                }
            }, d1);
            const d5 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 0px'
                }
            }, d1);
            const obs = this.make_text_area('OBSERVAÇÃO', d3, null, null);
            const texto = this.make_text_area('TEXTO DO DESPACHO', d4, null, 310);
            texto.oninput = ()=>atualizar_preview();
            //console.log(this.profile);
            let lotacoes = this.profile.colaborador.lotacoes.map(d=>{
                const nome = (d.setor.sigla ? `${d.setor.sigla}/${d.setor.unidade.sigla} - ` : '') + d.setor.nome.substr(0, 45)
                return {nome, value: d.setor.id, principal: d.principal ? 1 : 0};
            });
            lotacoes.sort((a, b)=>b.principal - a.principal);
            console.log(lotacoes);
            const sel = this.criar_select('Escolha a lotação', lotacoes, d2);
            sel.onchange = ()=>atualizar_preview();
            const obter_setor = ()=>{
                const id_setor = parseInt(sel[sel.selectedIndex].value);
                return this.profile.colaborador.lotacoes.find(d => d.setor.id === id_setor);
            }
            const quadro = MFt.criaElem('iframe', {
                srcdoc: preview.html_completo(texto.value, processo, obter_setor().setor, this.profile),
                style: {
                    height: '100%',
                    width: '100%',
                    border: 'none'
                }
            }, dVisualizar);
            let quadro_scrollY_pos = 0;
            let tempo = new Date();
            let okParaAtualizar = true; // Não vai disparar dois setTimeout se um anterior ainda não concluiu
            const atualizar_preview = ()=>{
                const setor = obter_setor().setor;
                //console.log(setor);
                if (new Date().valueOf() - tempo.valueOf() > 200) {
                    quadro_scrollY_pos = quadro.contentWindow.window.scrollY;
                }
                tempo = new Date();
                //console.log(quadro_scrollY_pos);
                quadro.srcdoc = preview.html_completo(texto.value, processo, setor, this.profile);
                ((top)=>{
                    if (okParaAtualizar) {
                        okParaAtualizar = false;
                        setTimeout(() => {
                            quadro.contentWindow.scrollTo({
                                top: top,
                                left: 0,
                                behavior: 'instant' // outra opcao: "smooth"
                            });
                            okParaAtualizar = true;
                        }, 30);
                    }
                })(quadro_scrollY_pos);
            }
            atualizar_preview();
            sel.style.fontFamily = 'Arial Narrow';
            const ok = new MFt.bt({
                value: 'Prosseguir',
                wrapper: d5,
                width: 120,
                height: 30,
                callback: async ()=>{
                    ok.disabled = true;
                    if (texto.value.trim().length === 0) {
                        alert('O texto do despacho precisa ser preenchido com algum conteúdo');
                        ok.disabled = false;
                        return;
                    }
                    const teste = await this.super_get(this.xml, this.get_unidade_pelo_id(1), true);
                    if (!Array.isArray(teste) && teste.length) {
                        alert("Login parece ter expirado no Super Sapiens");
                        ok.disabled = false;
                        return;
                    }
                    const id_setor = parseInt(sel[sel.selectedIndex].value);
                    await this.doit(d1, texto.value, obs.value, id_setor);
                }
            });
            const cancelar = new MFt.bt({
                value: 'Cancelar',
                wrapper: d5,
                width: 120,
                height: 30,
                marginLeft: '15px',
                callback: ()=>{
                    this.pop.closeWindow(this.pop);
                }
            });
            const instrucoes = new MFt.bt({
                value: 'Instruções',
                wrapper: d5,
                width: 120,
                height: 30,
                marginLeft: '15px',
                callback: ()=>{
                    this.instrucoes(d1);
                }
            });
            const anexos = new MFt.bt({
                value: 'Anexar Arquivos',
                wrapper: d5,
                width: 180,
                height: 30,
                marginLeft: '15px',
                callback: ()=>{
                    this.anexarDocumentos.init(this.pop.div);
                }
            });
        });
        this.pop.aceitaEsc = this.pop.clicafora_sair = false;
        this.pop.iniciar(this.pop);
    }

    make_text_area(label, elem, width, height) {
        width = width || 'calc(100% - 30px)';
        height = height || 50;
        MFt.criaElem('div', {
            innerText: label,
            style: {
                fontFamily: 'Arial Narrow',
                fontSize: '14px',
                fontWeight: 'bold'
            }
        }, elem)
        return MFt.criaElem('textarea', {
            style: {
                resize: 'none',
                border: '1px solid ##e9e6e6',
                outline: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                width,
                height: Number.isInteger(height) ? `${height}px` : height,
                padding: '10px',
                fontFamily: 'Arial Narrow',
                background: '#fffedf',
                textAlign: 'justify'
            }
        }, elem);
    }

    async doit(wrapper, texto, obs, id_setor) {
        const getDocID = (mm, cd)=>{
            // Percorre as minutas procurando em qual delas existe o componente digital indicado
            // Daí retorna o ID do documento
            for(let m of mm) {
                if (m?.componentesDigitais) {
                    const componentes = m.componentesDigitais;
                    if (componentes.some(d=>d.id === cd)) {
                        return m.id;
                    }
                }
            }
        };
        const d1 = wrapper.parentNode;
        const oldStyle = wrapper.style.display;
        wrapper.style.display = 'none';
        const prazo = this.calcular_prazo_2(1, [], new Date());
        let atividades = [];
        if (this.anexarDocumentos.arquivos.length) { // Precisa ser assim por conta da ordem de inserção dos elementos no DOM
            atividades = [
                await this.item_realizado('Criar tarefa', d1),
                await this.item_realizado('Obter dados complementares', d1),
                await this.item_realizado('Criar modelo', d1),
                await this.item_realizado('Upload de documentos', d1),
                await this.item_realizado('Lançar atividade / Encerrar a tarefa', d1),
            ];
        }
        else {
            atividades = [
                await this.item_realizado('Criar tarefa', d1),
                await this.item_realizado('Obter dados complementares', d1),
                await this.item_realizado('Criar modelo', d1),
                await this.item_realizado('Lançar atividade / Encerrar a tarefa', d1),
            ];
        }
        let tarefa = await this.super_get(this.xml, this.criar_tarefa(prazo.inicio, prazo.fim, 1, this.id_tipo_tarefa, this.id_processo, this.profile.id, id_setor, id_setor, obs.substring(0, 255)));
        console.log(tarefa);
        if (!tarefa?.id) {
            alert('Erro ao criar a tarefa');
            d1.parentNode.removeChild(d1);
            wrapper.style.display = oldStyle;
            return false;
        }
        atividades[0].fim();
        tarefa = await this.super_get(this.xml, this.get_tarefa(tarefa.id), true, true);
        if (!tarefa?.id) {
            alert('Erro ao obter dados complementares');
            d1.parentNode.removeChild(d1);
            wrapper.style.display = oldStyle;
            return false;
        }
        atividades[1].fim();
        console.log(tarefa);
        const orgaoCentral = await this.super_get(this.xml, this.get_unidade_pelo_id(tarefa.setorResponsavel.unidade.id), true, true);
        this.orgaoCentral = {nome: orgaoCentral?.modalidadeOrgaoCentral?.descricao || 'CONSULTORIA-GERAL DA UNIÃO', sigla: orgaoCentral?.modalidadeOrgaoCentral?.valor || 'CGU'};
        let novo_doc = new CriarDocumento(tarefa, this.nome_peca, this.id_tipo_peca, texto, null, null, null, null, this.orgaoCentral);
        const doc_criado = await novo_doc.init();
        console.log(doc_criado);
        if (!doc_criado?.id) {
            alert('Erro ao criar documento');
            d1.parentNode.removeChild(d1);
            wrapper.style.display = oldStyle;
            return false;
        }
        atividades[2].fim();
        let minutas = await this.super_get(this.xml, this.get_minutas(tarefa.id), true);
        console.log(minutas);
        const docID = getDocID(minutas, doc_criado.id);
        if (this.anexarDocumentos.arquivos.length) {
            console.log(this.anexarDocumentos.arquivos);
            const r = await this.anexarDocumentos.upload_arquivos(docID, atividades[3].elem);
            atividades[3].fim(); // Upload concluído
            console.log(r);
        }
        minutas = await this.super_get(this.xml, this.get_minutas(tarefa.id), true);
        if (!Array.isArray(minutas)) {
            await this.esperar(1000);
            minutas = this.super_get(this.xml, this.get_minutas(tarefa.id), true);
        }
        if (!Array.isArray(minutas)) {
            MFt.clear(d1);
            d1.innerText = `Erro de comunicação com o Super`;
            await this.esperar(2000);
            d1.parentNode.removeChild(d1);
            wrapper.style.display = oldStyle;
            return;
        }
        const ids_minutas = minutas.map(d=>d.id);
        const lancar = await this.super_get(this.xml, this.get_lancar_atividade_consultiva(new Date(), ids_minutas, this.id_tipo_atividade, tarefa.id, this.id_complemento_consultivo, this.profile.id, obs.substring(0, 255)));
        console.log(lancar);
        atividades[this.anexarDocumentos.arquivos.length ? 4 : 3].fim();
        this.registrar_evento(`${this.reuniao ? "Reunião de Assessoramento" : "Assessoramento Informal"} - NUP ${tarefa.processo.NUP}`).then(rr=>{
            console.log('Evento registrado');
        });
        const cancelar = new MFt.bt({
            value: 'Fechar',
            wrapper: d1,
            width: 120,
            height: 30,
            marginTop: '15px',
            callback: ()=>{
                this.pop.closeWindow(this.pop);
            }
        });
    }

    async item_realizado(label, elem) {
        const amp = new Image(16, 16);
        const certo = new Image(16, 16);
        await this.load_image(amp, '/images/throbber_13.gif');
        await this.load_image(certo, '/images/certo.png');
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: '20px auto'
            }
        }, elem);
        const s1 = MFt.criaElem('div', {}, d1);
        const s2 = MFt.criaElem('div', {
            innerText: label,
            style: {
                fontSize: '14px',
                fontFamily: 'Arial Narrow'
            }
        }, d1);
        s1.appendChild(amp);
        return {
            fim: ()=>{
                MFt.clear(s1);
                s1.appendChild(certo);
            },
            elem: s2, // Elemento onde vai aparecer a mensagem
        }
    }

    instrucoes(wrapper) {
        const display = wrapper.style.display;
        wrapper.style.display = 'none';
        const d1 = MFt.criaElem('div', {
            style: {
                fontSize: '14px',
                fontFamily: 'Titillium Web'
            }
        }, wrapper.parentNode);
        const print = (t, bold=false)=>{
            MFt.criaElem('div', {
                innerText: t,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Titillium Web',
                    fontWeight: bold ? 'bold' : 'normal',
                }
            }, d1);
        };
        print('1. Linhas iniciadas com "<p" ou "<h" são tratadas como HTML puro.');
        print('2. Linhas iniciadas com "*" que tenham texto adicional recebem o formato de citação - blockquote.');
        print('3. Linhas iniciadas com "*" sem nenhum texto adicional são inseridas como linhas em branco.');
        print('4. A expressão "[*]" no meio de um texto refere-se a nota de rodapé - footnote.');
        print('5. Linhas iniciadas com "[*]" seguidas de texto adicional são colocadas como notas de rodapé - footnote.');
        print('------');
        print('O fluxo utilizado segue as orientações da apresentação feita em 19.06.2023.', true);
        const divArq = MFt.criaElem('div', {
            innerText: 'Link para a apresentação ',
            style: {

            }
        }, d1);
        const linkArq = MFt.criaElem('a', {
            innerText: 'AQUI',
            href: 'https://manoelpaz.com/cgi-bin/savvy/publico.py?task=arquivo&id=196',
            target: '_blank',
            style: {

            }
        }, divArq);
        const bt = new MFt.bt({
            value: 'Retornar',
            wrapper: MFt.criaElem('div', {}, d1),
            width: 100,
            height: 30,
            marginTop: '15px',
            callback: ()=>{
                d1.parentNode.removeChild(d1);
                wrapper.style.display = display;
            }
        });
    }
}