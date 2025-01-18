class ClonarComponenteDigital extends Payloads {
    constructor() {
        super();
        this.div = undefined;
        this.doc_criado = undefined;
        this.link_documento = undefined; // fornece o link completo do editor de textos para o documento criado e eh extraido de criar_documento.js
        this.xml = new RequestMF();
        if (!window.base64DecToArr) {
            const msg = 'O arquivo base64binary.js precisa estar declarado no HTML <script src="/shared/base64binary.js"></script>';
            alert(msg);
            throw new Error(msg);
        }
        try {
            CriarDocumento.teste();
        } catch (e) {
            const msg = 'O arquivo criar_documento.js precisa estar declarado no HTML <script src="/shared/criar_documento.js"></script>';
            alert(msg);
            throw new Error(e);
        }
        try {
            Paragrafos.teste();
        } catch (e) {
            const msg = 'O arquivo paragrafos.js precisa estar declarado no HTML <script src="/shared/paragrafos.js"></script>';
            alert(msg);
            throw new Error(e);
        }
    }

    async init(id_tarefa, id_comp, tipo_modelo, id_modelo) {
        if (!Number.isInteger(id_modelo)) {
            alert('id_modelo não é inteiro');
            return;
        }
        if (!tipo_modelo instanceof String) {
            alert('O nome do modelo é necessário.');
            return;
        }
        const componente = await this.super_get(this.xml, this.get_componente(id_comp));
        const tarefa = await this.super_get(this.xml, this.get_tarefa(id_tarefa), true);
        const processo = await this.super_get(this.xml, this.get_buscar_nup(tarefa.processo.NUP), true, true);
        const interessados = await this.super_get(this.xml, this.get_processo_interessados(tarefa.processo.id), true);
        const html = this.html_from_conteudo(componente);
        const body = this.extrair_body(html);
        const {paragrafos, notas_rodape} = this.listar_paragrafos_uteis(body); // O outerHTML das notas de rodapé estão em notas_rodape
        const html_final = (()=>{
            let ret = '';
            for(let p of paragrafos) ret += p.texto.replace(RegExp("\n", "g"), '').replace(RegExp("\r", "g"), "").trim();
            return ret;
        })();
        const orgaoCentral = await this.super_get(this.xml, this.get_unidade_pelo_id(tarefa.setorResponsavel.unidade.id), true, true);
        this.orgaoCentral = {nome: orgaoCentral?.modalidadeOrgaoCentral?.descricao || 'CONSULTORIA-GERAL DA UNIÃO', sigla: orgaoCentral?.modalidadeOrgaoCentral?.valor || 'CGU'};
        const doc = new CriarDocumento(tarefa, tipo_modelo, id_modelo, html_final, null, null, true, notas_rodape, this.orgaoCentral);
        const doc_criado = await doc.init();
        if (doc_criado) this.link_documento = await doc.link_documento();
        console.log(doc_criado);
        console.log(this.link_documento);
        return doc;
    }

    extrair_body(html) {
        // Retorna apenas a parte do body
        let re = new RegExp('<body>', 'gi');
        let inicio = re.exec(html);
        if (!inicio) {
            /**
             * Alguns HTML's não contém <body> o que levaria esta rotina a exibir o original
             * Daí... se o <body> não é encontrado, deve-se adotar o final de </head>
             */
            re = new RegExp('</head>', 'gi');
            inicio = re.exec(self.html);
            if (inicio) inicio.index++; // Para compensar com o tamanho de <body> que tem um elemento a menos
        }
        if (inicio) {
            inicio = inicio.index;
            re = new RegExp('</body>', 'gi');
            let fim = re.exec(html);
            if (fim?.index > inicio + 5) {
                fim = fim.index;
                console.group('INICIO E FIM ENCONTRADOS');
                console.log('Inicio', inicio);
                console.log('Fim', fim);
                console.log(html.substring(inicio + 6, fim));
                console.groupEnd();
                return html.substring(inicio + 6, fim);
            }
            else {
                /**
                 * Alguns documentos também não contêm </body>. Nesse caso, utiliza-se tudo até o final.
                 */
                console.group('FIM do </body> NAO ENCONTRADO. Retornando depois do <body> ate o fim do arquivo.');
                console.log(html.substring(inicio + 6));
                console.groupEnd();
                return html.substring(inicio + 6);
            }
        }
        else {
            console.group('INICIO E FIM NAO ENCONTRADOS - retornando o html original');
            console.log(html);
            console.groupEnd();
        }
        return html;
    }

    listar_paragrafos_uteis(body) {
        let outras_linhas = 0;
        let paragrafos = [];
        const incluir = elem => {
            // Informa que as linhas que contém o número do parecer não devem ser incluídas
            // As duas linhas seguintes ao do número do parecer também não devem ser incluídas
            let inicio_frases = [
                'INTERESSADOS: ',
                'ASSUNTOS: ',
                'ORIGEM: ',
                'NUP: '
            ];
            if (this.is_nome_peca(elem)) return false;
            if (this.is_data_por_extenso(elem)) return false;
            for(let j = 0; j < inicio_frases.length; j++) { // Exclui as linhas que comecem com... que fazem parte do cabeçalho do documento de origem.
                if (elem.innerText.trim().indexOf(inicio_frases[j]) === 0) {
                    return false;
                }
            }
            outras_linhas--;
            return !(outras_linhas >= 0);
        };
        const {paragrafos_html, notas_rodape} = this.extrair_paragrafos_v2(body);
        console.group('ANALISE DE PARAGRAFOS');
        for(let j = 0; j < paragrafos_html.length; j++) {
            const paragrafo = paragrafos_html[j];
            if (j > 10 || incluir(paragrafo)) {
                // O incluir() serve para retirar as referências ao parecer nas linhas iniciais.
                // Antes, havia um erro no Regex do incluir() que excluía linhas como: "O Parecer n. 075/2010/DECOR/CGU/AGU segue o mesmo raciocínio e propõe a seguinte solução (Item 83.4):"
                // Esse erro no Regex foi corrigido.
                // Porém, como o incluir() só interessa no início da peça, coloquei um limite de ação dele para as primeiras linhas.
                console.log(j, paragrafo.innerText);
                paragrafos.push({texto: paragrafo.outerHTML, classe: 'html'});
            }
        }
        console.groupEnd();
        this.div.parentNode.removeChild(this.div);
        return {
            paragrafos,
            notas_rodape,
        };
    }

    extrair_paragrafos(body) { // ************************************** ABANDONADO - VER A VERSAO 2
        this.div = MFt.criaElem('div', {
            innerHTML: body,
            style: {
                height: '300px',
                width: '300px',
                overflow: 'hidden',
                position: 'fixed',
                top: '0px',
                left: '0px',
            }
        }, document.body);
        const notas_rodape = () => {
            let htmls = [];
            let secs = this.div.getElementsByTagName('section');
            for(let i = 0; i < secs.length; i++) {
                if (secs[i].className === 'footnotes') {
                    htmls.push(secs[i].outerHTML);
                }
            }
            if (htmls.length > 1) {
                console.log('%cAlgo deve estar errado. Mais de uma seção de rodapé foi encontrada no documento.', 'color:red;font-weight:bold;');
                console.log(this.div.innerHTML);
                console.log();
            }
            if (htmls.length) return htmls[0];
            return '';
        };
        let hrCounter = 0;
        let itens = this.div.getElementsByTagName('*');
        let itensExportar = [];
        let exportar = false;

        for(var i = 0, maxi = itens.length; i < maxi; i++){
            if (false && itens[i].parentElement === this.div) {
                console.group("LOOP");
                console.log('exportar', exportar);
                console.log('itens[i]', itens[i]);
                console.log('itens[i].innerHTML', itens[i].innerHTML);
                console.log('this.div', this.div);
                console.log('itens[i].parentElement === this.div', itens[i].parentElement === this.div);
                console.log('hrCounter', hrCounter);
                console.groupEnd();
                alert('break');
            }
            if (exportar && itens[i].parentElement === this.div) {
                if (!['hr', 'HR'].some(d=>d===itens[i].tagName)) itensExportar.push(itens[i]);
            }
            if (['hr', 'HR'].some(d=>d===itens[i].tagName) && hrCounter < 2) {
                hrCounter++;
                exportar = !exportar;
            }
        }
        itensExportar.splice(itensExportar.length - 1, 1);
        return {
            paragrafos_html: itensExportar,
            notas_rodape: notas_rodape()
        };
    }

    /**
     * Versão aprimorada de "extrair_paragrafos()" que estava dando erro em documentos mal formatados
     * @param body {string} innerHTML de <body>
     * @returns {{notas_rodape: (*|string), paragrafos_html: *[]}}
     */
    extrair_paragrafos_v2(body) {
        this.div = MFt.criaElem('div', {
            innerHTML: body,
            style: {
                height: '300px',
                width: '300px',
                overflow: 'hidden',
                position: 'fixed',
                top: '0px',
                left: '0px',
            }
        }, document.body);
        const notas_rodape = () => {
            let htmls = [];
            let secs = this.div.getElementsByTagName('section');
            for(let i = 0; i < secs.length; i++) {
                if (secs[i].className === 'footnotes') {
                    htmls.push(secs[i].outerHTML);
                }
            }
            if (htmls.length > 1) {
                console.log('%cAlgo deve estar errado. Mais de uma seção de rodapé foi encontrada no documento.', 'color:red;font-weight:bold;');
                console.log(this.div.innerHTML);
                console.log();
            }
            if (htmls.length) return htmls[0];
            return '';
        };
        let hrCounter = 0;
        let itens = this.div.getElementsByTagName('*');
        let itensExportar = [];
        let exportar = false;
        for(let i = 0; i < itens.length; i++) {
            const it = itens[i];
            if (it.parentElement !== this.div) continue;
            // começa a incluir os itens a partir do elemento onde se encontra o nome da peça
            if (!exportar && this.is_nome_peca(it)) exportar = !exportar;
            if (this.encerrar_inclusao_de_paragrafos(it)) {
                // se chegou até as notas de rodapé ou à assinatura encerra a inclusão de itens porque o documento chegou ao fim
                break;
            }
            if (exportar) {
                if (i < itens.length - 1 && this.is_hr(it) && this.encerrar_inclusao_de_paragrafos(itens[i + 1])) {
                    break;
                }
                else {
                    itensExportar.push(it);
                }
            }
        }
        return {
            paragrafos_html: itensExportar,
            notas_rodape: notas_rodape()
        };
    }

    encerrar_inclusao_de_paragrafos(elem) {
        return this.is_foot_note(elem) || this.is_signature(elem) || this.is_final_part(elem);
    }

    is_nome_peca(elem) {
        const rgxs = [
            '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\/[A-Z\\-]+\\s*\\/\\w+\\/\\w+',
            '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+\\/\\w+',
            '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+',
            '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\Wªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+',
            // '^(ORIENTAÇÃO\\s*NORMATIVA\\s*AGU)\\sn[º\\.°]º*\\s*[0-9]*',
            // '^[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s\\w+\\/\\w+',
            // '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s[0-9]+\\/[0-9]+',
            // '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s[0-9]+\\/[0-9]+',
            // '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s\\w+' // Ex.: PORTARIA n. 00002
        ];
        for(let r of rgxs) {
            if (new RegExp(r, 'i').exec(elem.innerText.trim())) return true;
        }
        return false;
    }

    is_signature(elem) {
        if (elem.innerText.indexOf('Documento assinado eletronicamente') >= 0) return true;
        return false;
    }

    is_foot_note(elem) {
        if (['section', 'SECTION'].some(d=>d === elem.tag)) return true;
        return false;
    }

    is_final_part(elem) {
        // indica se o elemento é o que contem a frase "Atenção, a consulta ao processo eletrônico está disponível em https://supersapiens.agu.gov.br mediante o fornecimento do Número Único de Protocolo (NUP)..."
        if (
            elem.innerText.indexOf('a consulta ao processo eletrônico') >=0 ||
            elem.innerText.indexOf('Chave de acesso ao Processo') >= 0 // Quando o documento foi clonado e se esta clonando um clonado
        ) return true;
        return false;
    }

    is_hr(elem) {
        return ['hr', 'HR'].some(d=>d === elem.tagName);
    }

    is_data_por_extenso(elem) {
        let rxdata = [
            '^[\\w\\sç,á,é,í,ó,ú,à,ã,õ,â,ê,ô,ü,Ç,Á,É,Í,Ó,Ú,À,Ã,Õ,Â,Ê,Ô,Ü]+,\\s+[0-9º]{1,2}\\s+de\\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|outubro|novembro|dezembro)\\s+de\\s+[0-9]{4}'
        ];
        for(let i = 0; i < rxdata.length; i++) { // Exclui a data de produção do documento
            if (new RegExp(rxdata[i], 'i').exec(elem.innerText.trim())) {
                return true;
            }
        }
        return false;
    }
}