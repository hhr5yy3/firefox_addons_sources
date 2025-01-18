class ExibirHTML extends Payloads {
    /**
     *
     * @param componente {Object} Componente Digital completo como vindo do Super
     * @param wrapper {HTMLElement} Elemento onde vai aparecer o documento
     * @param ops {Array<Object>} Opcoes do Menu. Exemplo: [ {label: 'Clonar Documento', exec: ()=>{this.clonar_doc();}} ]
     * @param nomePeca {string} Opcional para ser exibido no titulo do documento
     */
    constructor(componente, wrapper, ops, nomePeca) {
        super();
        this.comp_digital = componente;
        this.wrapper = wrapper;
        this.ops = ops;
        this.iframe = MFt.criaElem('iframe');
        this.nomePeca = nomePeca;
        this.rgxs = [ // SEMELHANTE AO QUE EXISTE EM item.js SÓ QUE COM DOIS GRUPOS
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*(\\w+\\s*\\/\\s*[\\w\\-ªº]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[a-z\\-]+\\s*\\/\\s*[a-z\\-]+)', // PARECER n. 00680 / 2020 / NUCJUR / E-CJU / AQUISIÇÕES / CGU / AGU    e variações
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]\\s*([0-9]+\\s*\\/\\s*[0-9]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+)', // COM a sigla do advogado, Exemplo: COTA n. 00008/2022/SCPS/NUCJUR/E-CJU/PATRIMÔNIO/CGU/AGU
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*(\\w+\\s*\\/\\s*[\\w\\-ªº]+\\s*\\/\\s*[A-Z\\-]+\\/\\s*[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\\-]+\\s*\\/\\s*[\\w\\-]+\\/\\s*\\w+)',
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*(\\w+\\s*\\/\\s*[\\w\\-ªº]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*\\s*\\w+\\/\\s*\\w+)',
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*(\\w+\\s*\\/\\s*[\\w\\-ªº]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*\\s*\\w+)',
            '^\\s*(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|OFÍCIO\\-CIRCULAR|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*(\\w+\\s*\\/\\s*[\\w\\Wªº]+\\s*\\/\\s*[A-Z\\-]+\\s*\\/\\s*\\s*\\w+)',
            '^\\s*(ORIENTAÇÃO\\s*NORMATIVA\\s*AGU)\\sn[º\\.°]º*\\s*([0-9]*)',
            '^\\s*([\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+)\\sn*\\.*º*\\s(\\w+\\/\\s*\\w+)',
            '^\\s*([\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+)\\sn*\\.*º*\\s([0-9]+\\/\\s*[0-9]+)',
            '^\\s*([\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+)\\s[\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+\\sn*\\.*º*\\s([0-9]+\\/\\s*[0-9]+)',
            '^\\s*([\\wáéíóúÁÉÍÓÚãõÃÕôÔçÇ\-]+)\\sn*\\.*º*\\s(\\w+)' // Ex.: PORTARIA n. 00002
        ];
        this.iniciar();
    }

    get iframe_document() {
        return this.iframe.contentWindow.document;
    }
    
    async iniciar() {
        this.menu_icon = new Image(15, 15);
        await this.load_image(this.menu_icon, "/images/menu_red.png");
        this.exibir_componente();
    }

    exibir_componente() {
        let binary_data, doc, d1, d2;
        const _URL = window.URL || window.webkitURL;
        this.iframe = MFt.criaElem('iframe', {
            style: {
                height: '100%',
                width: '100%',
                border: 'none'
            }
        });
        switch(this.comp_digital.mimetype){ // Exibe o PDF ou o HTML
            case "application/pdf":
                MFt.clear(document.body);
                window.open(this.comp_digital.conteudo);
                window.close();
                break;
            case "text/html":
                this.wrapper.setAttribute('identificador', this.comp_digital.id); // Serve para dizer se o item ainda está selecionado quando terminar de carregar
                MFt.clear(this.wrapper);
                // PARA OBTER O TEXTO DO HTML EM UTF-8, NECESSÁRIO SEGUIR AS DUAS LINHAS ABAIXO. MAS O IFRAME PODE SER CRIADO APENAS INDICANDO O SRC= AO CONTEUDO, PORQUE O NAVEGADOR ENTENDE
                // const res = this.extract_data_from_conteudo(comp.conteudo);
                // const td = new TextDecoder().decode(res);
                d1 = MFt.criaElem('div', { // iframe vai ser uma DIV
                    id: 'local_do_iframe',
                    style : {
                        margin : '5px',
                        overflow : 'hidden',
                        overflowX : 'hidden',
                        paddingLeft : '0px',
                        paddingRight : '0px',
                        width: 'calc(100% + 30px)'
                    }
                }, this.wrapper, {substituto_iframe:''});
                if (this.wrapper === document.body) {
                    const redimensionar = ()=>{
                        const dim = getComputedStyle(document.body);
                        const body_margins = parseFloat(dim.marginTop) + parseFloat(dim.marginBottom);
                        const body_paddings = parseFloat(dim.paddingTop) + parseFloat(dim.paddingBottom);
                        const body_borders = parseFloat(dim.borderTopWidth) + parseFloat(dim.borderBottomWidth);
                        const total = body_margins + body_paddings + body_borders;
                        d1.style.height = `${window.innerHeight - total}px`;
                    }
                    redimensionar();
                    window.onresize = ()=>{
                        redimensionar();
                    }
                }
                else d1.style.height = 'calc(100% - 20px)';
                this.iframe.onload = ()=>{
                    console.log(this.iframe.contentWindow.document);
                }
                const html = this.html_from_conteudo(this.comp_digital);
                this.iframe.srcdoc = html;
                if (!this.nomePeca) {
                    const {tipo : tipoDoc, num : num} = this.analisar_tipo_peca(this.comp_digital);
                    console.log(`TIPODOC: ${tipoDoc}`);
                    console.log(`NUM: ${num}`);
                    document.title = `${tipoDoc} n. ${num}`;
                }

                // this.iframe.src = this.comp_digital.conteudo; // Não pude usar esta linha porque dava problema de cross-origin
                d1.appendChild(this.iframe);
                break;
            case 'image/png':
            case 'image/jpeg':
                this.wrapper.setAttribute('identificador', this.comp.id); // Serve para dizer se o item ainda está selecionado quando terminar de carregar
                MFt.clear(this.wrapper);
                d1 = MFt.criaElem('div', {
                    style : {
                        margin : '5px',
                        overflow : 'scroll',
                        overflowX : 'hidden',
                        paddingLeft : '30px',
                        paddingRight : '30px',
                        height : 'calc(100% - 10px)'
                    }
                }, this.wrapper);
                let img = new Image();
                img.src = this.comp_digital.conteudo;
                img.style.width = 'calc(100% - 10px)';
                d1.appendChild(img);
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                break;
            default:
            //this.disc['innerHTML'] = this.comp.mimetype;
        }
        this.menu_doc();
    }

    menu_doc() {
        const wrapper = MFt.criaElem('div', {
            style: {
                position: 'fixed',
                top: '1px',
                left: '30px',
                fontFamily: 'Arial Narrow'
            }
        }, this.wrapper);
        const menu = new Menu(this, wrapper, 24, '/images/menu_red.png', this.ops);
    }

    /**
     * @param texto
     * @returns {Uint8Array}
     */
    extract_data_from_conteudo(texto) {
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

    /**
     * Recebe o texto em html e devolve o tipo e numero da peca juridica, se for uma.
     * @returns {string : string}
     * @param comp
     */
    analisar_tipo_peca(comp) { // SEMELHANTE AQUELE QUE EXISTE EM ITEM.JS SÓ QUE RETORNA DIFERENTE
        const erros = {
            'parcer': 'PARECER',
        };
        if (comp.mimetype !== 'text/html') return {tipo: '', num: ''};
        let html = this.html_from_conteudo(comp);
        let tmp = html.indexOf('data:image'); // Aqui é o primeiro sinal após o brasão da república
        if (tmp > 0) {
            const tmp2 = html.indexOf('>', tmp);
            html = html.substr(tmp2 + 1, 1000); // Limito a 1000 caracteres depois do brasão para acelerar o código
        }
        else {
            tmp = html.indexOf('<body>');
            if (tmp > 0) {
                html = html.substr(tmp + 6, 5000);
                // Quando é certidão de arquivamento, existe essa tag abaixo que fica dando erro, mas sem atrapalhar o programa
                html = html.replace('<img src="/images/sapiens_cinza.png"/>', '');
            }
            else {
                // console.log('NAO ENCONTRADO O BODY ----------------------------');
                // console.log(html);
            }
        }

        let div = MFt.criaElem('div', {
            innerHTML: html
        });
        var ps = div.getElementsByTagName('p');
        for(let i = 0, maxi = Math.min(ps.length, 20); i < maxi; i++){
            let texto = ps[i].textContent;
            for(let j = 0, maxj = this.rgxs.length; j < maxj; j++) {
                var tmpRE = new RegExp(this.rgxs[j], 'i');
                let res = tmpRE.exec(texto);
                if (res) {
                    let tipo = res[1].trim();
                    let num = res[2].replace(/\s+/gi, '');
                    if (erros.hasOwnProperty(tipo.toLowerCase())) {
                        const newStr = res.input.replace(tipo, erros[tipo.toLowerCase()]);
                        for(let k = 0; k < this.rgxs.length; k++) { // repete os regexs do inicio
                            const rx1 = new RegExp(this.rgxs[k], 'i');
                            const r = rx1.exec(newStr);
                            if (r) {
                                console.log(`HOUVE SUBSTITUICAO DE ERRO - ${res.input} - ${newStr} - ${tipo} -> ${erros[tipo.toLowerCase()]}`);
                                tipo = r[1].trim();
                                num = r[2].replace(/\s+/gi, '');
                                break;
                            }
                        }
                    }
                    console.group(`REGEXP ${j}`);
                    console.log(res);
                    console.log({tipo: tipo, num: num});
                    console.groupEnd();
                    //alert('Analisar');
                    return {tipo: tipo, num: num}; // replace para retirar os espaços, assim: 00005/2022 / NUCJUR / E-CJU / PATRIMÔNIO / CGU / AGU    --->    00005/2022/NUCJUR/E-CJU/PATRIMÔNIO/CGU/AGU
                }
            }
        }
        return {tipo: '', num: ''};
    }
}