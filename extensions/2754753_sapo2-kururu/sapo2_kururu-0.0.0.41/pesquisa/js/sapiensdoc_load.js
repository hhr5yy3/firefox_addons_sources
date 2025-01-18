window.onload = function(){
    const id_comp = parseInt(MFt.urlArgs()?.id);
    const nome_peca = MFt.urlArgs()?.nome_peca;
    new ExibirDoc(id_comp, nome_peca);
};

class ExibirDoc extends Payloads {
    constructor(id_comp, nome_peca) {
        super();
        this.id_comp = id_comp;
        this.nome_peca = nome_peca;
        if (this.nome_peca) document.title = this.nome_peca;
        this.html = "";
        this.comp_digital = {};
        this.xml = new RequestMF();
        this.mpurl = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.iniciar();
    }

    async iniciar() {
        if (!Number.isInteger(this.id_comp)) {
            alert('Erro na URL. ID nao informado');
            window.close();
            return;
        }
        document.body.innerText = 'Carregando arquivo...';
        if (!MFt.urlArgs()?.registrar) { // A chave registrar vai indicar que não é para registrar a visualização no DB. Ver relatorio_pecas_visualizaas.js
            this.request_mf(this.mpurl, {
                task: 'set_docs_visulizados_pesquisa',
                idComponente: this.id_comp,
                titulo: this.nome_peca || ''
            }).then(dd => {
                console.log('Peça registrada');
                console.log(dd);
                console.log();
            });
        }
        this.comp_digital = await this.super_get(this.xml, this.get_componente(this.id_comp));
        //console.log(this.comp_digital);
        if (!this.comp_digital.id) {
            alert('Erro de comunicacao com o Super');
            window.close();
            return;
        }
        MFt.clear(document.body);
        const opcoes = [
            {label: 'Clonar Documento', exec: ()=>{this.clonar_doc();}},
            {label: 'Copiar link público', exec: ()=>{this.copiar_link_publico();}},
            {label: 'Copiar referência', exec: ()=>{this.copiar_referencia_link();}},
            {label: 'Salvar como peça de referência', exec: ()=>{this.salvar_peca()}},
            {label: 'Imprimir Documento', exec: ()=>{this.imprimir_peca()}},
            {label: 'Salvar HTML', exec: ()=>{this.salvar_html()}},
            {label: 'Assinar Documento', exec: ()=>{this.assinar_documento()}}
        ];
        if (this.profile.id === 8499) {
            opcoes.push(
                {label: 'Inserir no DB', exec: ()=>{this.inserir_db()}},
            );
        }
        console.group('COMP DIGITAL');
        console.log(this.comp_digital);
        console.groupEnd();
        if (this.comp_digital?.mimetype === 'text/html') {
            this.exibir_html(opcoes); // new ExibirHTML creates an iframe in order do show the document, but this way messes up the copy and paste to clipboard in Super Sapiens text editor. So that, I created a new form of showing the doc in order to allow a correct copy and paste process.
        }
        else {
            this.exibir = new ExibirHTML(this.comp_digital, document.body, opcoes, this.nome_peca);
        }
    }

    async clonar_doc() {
        const et = new ExibirTarefas();
        et.fontFamily = 'Arial Narrow';
        const tarefa = await et.obter_tarefa();
        console.log(tarefa);
        const clonar = new ClonarDocumentoPopUp(tarefa, this.id_comp);
        const res = clonar.iniciar();
    }

    async copiar_link_publico() {
        this.copiar_elemento(`https://sapiens.agu.gov.br/valida_publico?id=${this.comp_digital.id}`);
        const msg = new MsgGenerica("Link copiado para área de transferência", 300, 40);
        msg.p1.style.fontFamily = 'Patrick Hand';
        await this.esperar(2000);
        msg.closeWindow(msg)
    }

    async copiar_referencia_link() {
        this.copiar_elemento(`${this.nome_peca}`, `https://sapiens.agu.gov.br/valida_publico?id=${this.comp_digital.id}`);
        const msg = new MsgGenerica("Referência na área de transferência", 300, 40);
        msg.p1.style.fontFamily = 'Patrick Hand';
        await this.esperar(2000);
        msg.closeWindow(msg)
    }

    async salvar_peca() {
        new SalvarPeca(this.id_comp, this.nome_peca);
    }

    /**
     * Retorna o conteúdo de um componente digital em HTML.
     * A resposta ao request do componente digital deve ser encaminhada por completo para este método
     * @param compDigital
     * @returns {string}
     */
    html_from_conteudo(compDigital) {
        const dataFromConteudo = texto=>{
            const str_inicial = 'base64,';
            let inicio = texto.indexOf(str_inicial);
            if (inicio < 0) {
                alert('Dados corrompidos!');
                throw new Error('Dados corrompidos!');
            }
            const dados = texto.substr(inicio + str_inicial.length);
            // console.log(dados);
            // console.log('----------------------------');
            // console.log(btoa(dados));
            return base64DecToArr(dados);
        }
        return new TextDecoder().decode(dataFromConteudo(compDigital.conteudo));
    }

    imprimir_peca() {
        if (this.comp_digital.mimetype !== 'text/html') {
            alert('Opção disponível apenas para arquivos HTML');
            return;
        }
        const imp = window.open('../branco.html');
        imp.onload = ()=>{
            imp.document.body['innerHTML'] = this.html_from_conteudo(this.comp_digital);
            imp.print();
        };
    }

    salvar_html() {
        if (this.comp_digital.mimetype !== 'text/html') {
            alert('Opção disponível apenas para arquivos HTML');
            return;
        }
        const blob = new Blob([this.html_from_conteudo(this.comp_digital)], {type: 'text/html;charset=utf-8'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `peca_juridica_${this.comp_digital.id}.html`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    assinar_documento() {
        const pop = new PopUp(320, 240, null, null, async form=>{
            const assinar = async ss=>{
                pop.aceitaEsc = pop.clicafora_sair = false;
                wp.style.display = 'none';
                let d1 = MFt.criaElem('div', {
                    innerText: 'Assinando...',
                    style: {
                        fontSize: '16px'
                    }
                }, form.div);
                const xml = new RequestMF();
                const res = await this.super_get(xml, this.get_assinar_documento(this.id_comp, ss));
                console.log(res);
                if (res?.code >= 300) {
                    if (res?.message) {
                        d1.innerText = res.message;
                        pop.aceitaEsc = pop.clicafora_sair = true;
                        await this.esperar(3500);
                        d1.parentNode.removeChild(d1);
                        wp.style.display = 'block';
                        bt.disabled = false;
                        return;
                    }
                }
                d1.innerText = 'Documento devidamente assinado';
                this.registrar_evento(`Documento assinado (${this.id_comp}).`);
                await this.esperar(1500);
                pop.aceitaEsc = pop.clicafora_sair = true;
                location.reload();
            };
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            });
            const wp = MFt.criaElem('div', {

            }, form.div);
            const d0 = MFt.criaElem('div', {
                innerText: 'Assinar Documento',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #777',
                    paddingBottom: '5px',
                    marginBottom: '14px'
                }
            }, wp);
            const d1 = MFt.criaElem('d1', {
                innerText: 'Senha da Rede AGU',
                style: {
                    fontSize: '16px',
                    color: '#333'
                }
            }, wp);
            const d2 = MFt.criaElem('div', {

            }, wp);
            const d3 = MFt.criaElem('div', {

            }, wp);
            const i1 = MFt.criaElem('input', {
                type: 'password',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px',
                    background: 'linear-gradient(to right, rgb(255, 246, 218) 60%, rgb(255, 255, 255) 95%)',
                    border: 'none',
                    borderBottom: '1px solid #CCC',
                    outline: 'none'
                }
            }, d2);
            const bt = new MFt.bt({
                value: 'Assinar',
                width: 100,
                height: 30,
                wrapper: d3,
                marginTop: '15px',
                disabled: true,
                callback: ()=>{
                    if (i1.value.length) {
                        bt.disabled = true;
                        assinar(i1.value);
                    }
                }
            });
            i1.onkeydown = e=>{
                if (i1.value.length && e.key === 'Enter') {
                    bt.disabled = true;
                    assinar(i1.value);
                }
            };
            i1.oninput = ()=>bt.disabled = !i1.value.length;
            i1.focus();
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = true;
    }

    inserir_db() {
        const html = this.html_from_conteudo(this.comp_digital);
        const id_comp = this.comp_digital.id;
        const pop = new PopUp(300, 100, null, null, async form=>{
            const msg = MFt.criaElem('div', {
                innerText: 'Analisando...',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px',
                }
            }, form.div);
            const res = await Tudo2.request_mf_static('https://acervopessoal.org/cgi-bin/feed_pesquisa_agu/router.py', {
                task: 'feed_html',
                html,
                id_comp,
            }, 'post');
            console.group('ANÁLISE DE PEÇA');
            console.log(res);
            console.groupEnd();
            MFt.clear(msg);
            if (res?.conjur) {
                MFt.atribs(form.div, {
                    style: {
                        width: '500px',
                        height: '300px'
                    }
                });
                let campos = [
                    ['TIPO PEÇA', res?.tipo.toUpperCase()],
                    ['NÚMERO', res?.num.toString()],
                    ['ANO', res?.ano.toString()],
                    ['CONJUR', res?.conjur],
                    ['ASSUNTO', res?.assunto],
                ];
                this.exibirCampos(campos, msg);
                const dBts = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                    }
                }, msg);
                const bt = new MFt.bt({
                    value: 'Enviar ao DB',
                    width: '120px',
                    height: '30px',
                    wrapper: MFt.criaElem('div', {}, dBts),
                    callback: async ()=>{
                        MFt.clear(msg);
                        msg.innerText = 'Enviando dados...';
                        const jwt = await Tudo2.request_mf_static('https://manoelpaz.com/cgi-bin/agu/super/super', {
                            task: 'obterJWT'
                        });
                        const resSend = await Tudo2.request_mf_static('https://acervopessoal.org/cgi-bin/feed_pesquisa_agu/router.py', {
                            task: 'retrieve_and_save_data',
                            html,
                            id_comp,
                            jwt
                        }, 'post');
                        console.group('RESPONSE FROM SAVE FILE');
                        console.log(resSend);
                        console.groupEnd();
                        if (resSend?.id_sql) {
                            msg.innerText = 'Dados salvos';
                            await this.esperar(2000);
                            pop.closeWindow(pop);
                        }
                        else {
                            msg.innerText = `Erro ao salvar${resSend?.msg ? ': ' + resSend.msg : ''}`;
                            await this.esperar(2000);
                            pop.closeWindow(pop);
                        }
                    }
                });
                const btFechar = new MFt.bt({
                    value: 'Fechar',
                    width: '120px',
                    height: '30px',
                    wrapper: MFt.criaElem('div', {}, dBts),
                    callback: ()=>{
                        pop.closeWindow(pop);
                    }
                });
            }
            else {
                msg.innerText = 'Dados não identificados';
                await this.esperar(2000);
                pop.closeWindow(pop);
            }
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = false;
    }

    /**
     *
     * @param lista {Array} objeto com dois elementos que vao representar o label e o value
     * @param elemento {HTMLElement} local do DOM onde vai ser criado o campo
     */
    exibirCampos(lista, elemento) {
        for(let l of lista) {
            if (!Array.isArray(l)) continue; // Evita o que nao for Array
            if (!l.length) continue; // Evita arrays vazias
            const d1 = MFt.criaElem('div', {}, elemento);
            const s1 = MFt.criaElem('span', {
                innerText: l[0],
                style: {
                    fontWeight: 'bold'
                }
            }, d1);
            const s2 = MFt.criaElem('span', {innerText: ': '}, d1);
            const s3 = MFt.criaElem('span', {innerText: l[1]}, d1);
        }
    }

    async exibir_html(opcoes) {
        const html = (()=>{
           return this.extrair_html_from_base64(this.comp_digital)
        })();
        let body = (()=>{
            const html_low = html.toLowerCase();
            let inicio = html_low.indexOf('<body>');
            let fim = html_low.indexOf('</body>');
            if (inicio >= 0) {
                inicio += 6;
            }
            else {
                // Não existe <body>, procura </head>
                inicio = html_low.indexOf('</head>');
                if (inicio >= 0) {
                    inicio += 7;
                }
            }
            if (fim < 0) {
                // Não existe </body>, procura </html>
                fim = html_low.indexOf('</html>');
                if (fim < 0) {
                    fim = html_low.length; // aponta para o fim do arquivo, já que não existe a tag de fechamento do html
                }
            }
            return inicio >= 0 && fim >= 0 ? html.substring(inicio, fim) : 'erro';
        })();
        const qrcode = await this.getQRCode('https://manoelpaz.com/cgi-bin/qrcode/encode.py', {
            qr: `qr=https://sapiens.agu.gov.br/valida_publico?id=${this.comp_digital?.id}`,
            escala: 2,
            png: 1,
        });
        if (qrcode) body += `<div style="display:flex;"><img alt="Link de acesso público" src='${qrcode}'></img><div style="padding-top: 10px;">Link de acesso público ao documento.</div></div>`;
        MFt.atribs(document.body, {
            innerHTML: body,
        });
        const wrapper = MFt.criaElem('div', {
            style: {
                position: 'fixed',
                top: '1px',
                left: '30px',
                fontFamily: 'Arial Narrow'
            }
        }, document.body);
        const menu = new Menu(this, wrapper, 24, '/images/menu_red.png', opcoes);
    }

    getQRCode(url, get) {
        return new Promise(rr=>{
            const xml = MFt.xml({
                url,
                get,
                justText: true,
                callback: e=>{
                    rr(e);
                },
                errorCallback: e=>{
                    rr(false);
                }
            });
        })
    }
}