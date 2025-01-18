class TextoSuper {
    /**
     * Cria um texto formatado para o Super Sapiens
     * O Conteúdo do <body> é incluído em this.html ou obtido em this.texto_final().
     * O HTML inteiro é fornecido pelo this.html_completo()
     * Deve-se invocar ou this.texto_final() ou this.html_completo() para se obter o texto.
     */
    constructor(nome_peca='despacho') {
        this.nome_peca = nome_peca;
        this.footnotes = [];
        this.campos = []; // {[Object]} precedido_artigo e artigo_uppercase sao opcionais, Ex.: [{identificador: "###NUMERO_CONTRATO" : valor: "03/2020", precedido_artigo: false, artigo_uppercase: false}, {identificador: "###INTERESSADOS", valor: ["abc", "def"], precedido_artigo: false, artigo_uppercase: false}]
        this.num_footnote = 1; // indice para colocar em cada uma das footnotes
        this.html = '';
        this.outerHTML_rodape = ''; // Quando se clona uma peça, as notas de rodapé vêm como HTML do original
    }

    /**
     * Cria vários parágrafos a partir de um texto do DB
     * Se o parágrafo comecar com "*", o texto vai ser considerado uma citação
     * @param id {Number|String} Índice do texto no DB ou um texto em HTML
     * @param logica {Boolean} se verdadeiro retorna o texto indicado, falso retorna ""
     */
    pars(id, logica=true) {
        if (!logica) return "";
        let ret = '';
        let estilo = 'numerado';
        if (!id) {
            this.html += '<p class="esquerda"><br/></p>';
            return;
        }
        let pp = typeof id != 'number' && isNaN(id) ? id.split('\n') : this.tt(id).split('\n');
        pp = this.substituir_campos(pp);
        pp.forEach(d=>{
            d = d.trim();
            if (d && d.search(/^\[\*\]/) === -1) {
                const char0 = d.substr(0,1) === '*' ? d.substr(0,1) : d.substr(0,2);
                switch(char0) {
                    case '*': // Se o primeiro caractere de uma linha for um *, considera-se uma citação
                        d = d.substr(1);
                        if (d.length === 0) d = '&ensp;';
                        estilo = 'citacao';
                        break;
                    case '<h': // Se o primeiro caractere de uma linha for um <p ou <h ou <t, o texto vai ser inserido como html puro
                    case '<p':
                    case '<t': // para <table>
                        estilo = 'html';
                        break;
                    default:
                        estilo = 'numerado';
                }
                ret += this._par(d, estilo);
            }
            else if (d) {
                this.adicionar_footnote(d);
            }
        });
        this.html += ret;
    }

    adicionar_footnote(txt) {
        txt = txt.replace('[*]', '').trim();
        this.footnotes.push(txt);
    }

    resetar_footnotes() {
        this.footnotes = [];
        this.resetar_num_footnote();
    }

    /**
     * Retorna um innerHTML de parágrafo do tipo Sapiens
     * @param txt {string}
     * @param classe {string}
     * @param tipo {string} Para predefinir algum tipo de elemento específico tal como o H1, H2, H3...
     * @return {string}
     */
    _par(txt, classe, tipo='') {
        if (txt) classe = classe || 'numerado';
        txt = txt || '</br>';
        let tmp = '';
        try {
            if (tipo) {
                tmp += `<${tipo}>${(txt || '')}</${tipo}>`;
            } else if (classe === 'citacao' || classe === 'blockquote') {
                tmp += '<blockquote>' + (txt || '') + '</blockquote>';
            } else if (classe && (classe.toLowerCase() === 'h1' || classe.toLowerCase() === 'h2')) {
                tmp += `<${classe}>${(txt || '')}</${classe}>`;
            } else if (classe === 'html') {
                tmp += txt; // Neste caso, o conteúdo informado já é HTML puro
            } else {
                if (classe) tmp += '<p class="' + classe + '">';
                else tmp += '<p>';
                if (txt) tmp += txt || '';
                else tmp += '&nbsp;';
                tmp += '</p>';
            }
        }
        catch (e) {
            console.trace();
            console.log(classe);
            throw e;
        }
        return this.processar_footnote(tmp);
    };

    processar_footnote(html) {
        let s;
        while ((s = html.indexOf('[*]')) >= 0) {
            html = `${html.substr(0, s)}<sup data-footnote-id="a${this.num_footnote}"><a href="#footnote-${this.num_footnote}" id="footnote-marker-${this.num_footnote}-1" rel="footnote">[${this.num_footnote}]</a></sup>${html.substr(s + 3)}`;
            this.num_footnote++;
        }
        return html;
    }

    /**
     * Retorna o texto de this.textos pela id fornecida que corresponde à rowid
     * @param id
     */
    tt(id) {
        if (!id) {
            console.log('Chamada sem ID');
            return '';
        }
        let ret = this.textos.find(i=> {
            return i.rowid === id;
        });
        if (!ret) {
            console.log(`%cERRO! ID ${id} não encontrado! --------------------------`, 'color:red');
            return '';
        }
        return ret.texto;
    }

    /**
     *
     * @param tarefa {Object} Tal como obtido do Super
     * @param nome_peca {String} Nome da peca, pode estar tudo em lower case
     * @param num_peca {Number | String} Numero da peca
     */
    cabecalho(nome_peca, num_peca) {
        // console.log(tarefa);
        let p = '<p class="centralizado"><img src="';
        p += this.brasao() + '"/><br />';
        p += '<strong>ADVOCACIA-GERAL DA UNIÃO</strong><br />';
        p += 'CONSULTORIA-GERAL DA UNIÃO<br />';
        //console.group("SETOR RESPONSAVEL");
        //console.log(this.setorResponsavel);
        //console.groupEnd();
        if (this.setorResponsavel.unidade.nome !== 'CONSULTORIA-GERAL DA UNIÃO') p += this.setorResponsavel.unidade.nome + '<br />'; // quando a unidade esta dentro da CGU
        p += this.setorResponsavel.nome + '<br /></p>';
        p += '<hr />';
        p += `<p class="esquerda"><strong>${nome_peca.toUpperCase()} n. <span data-method="numeroDocumento" data-options="" data-service="sapiens_administrativo.template_renderer">${num_peca}</span></strong></p>`;
        p += `<p class="esquerda"><strong>PROCESSO</strong> <span data-method="nup" data-options="" data-service="sapiens_administrativo.template_renderer">${this.formatanup(this.processo.NUP)}</span></p>`;
        /*
        if (Array.isArray(this.interessados) && this.interessados.length)
            p += `<p class="esquerda">ORIGEM: ${this.corrigeOrigem(this.interessados[0].pessoa.nome)}</p>`;

         */
        this.html += p;
    }

    brasao(){
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAIAAABI9cZ8AAAACXBIWXMAAAsUAAALFAFS3jpnAAAcf0lEQVR4nMXbebxVYxcH8BMXmechM4VQvIlIhkhRkVS4DTJGUqSJilRCwm3QYEylUqSklFmUyJR5njPPU2Z6v/bSfnfn3qvb4PPuP85n332e/Tzrt9Zv/dZ69j63YNGiRbl/5zBzuXLlTjzxxNNPP71WrVrxZ/rtn3/+ucoqq3z44Yfnn3/+zTffnPftyj0K/qV5HYx++umnP/vss8cff7xfv34zZ878448/Vl111VyCH8JOnTrts88+0E6YMKGwsPDfs2RFQaYR+P333wsK8mfr2bNnjRo1Fi5c+O2333bv3v2kk07aZZddjPziiy+mT5/+9ddfP//88zVr1iwqKjr00EM322yz7L1Zj6xgkFcUpOV79erVqlWrzTfffP3118/aB9JBBx200047TZ06dauttlpttdWuv/764447TmzLly+/5ppr/vrrr88++6wBm2yyyfHHH//QQw9l8Xz//feiPXDgwIsuumgFjVwJdBUloRAcUN97771zzjkHwssuuwyYRo0aGfDmm2/WrVt37bXX/umnn7bccssPPvjg888/32CDDeAx5qOPPqpUqdL8+fOxer/99jN+4sSJTi644AKO4K8Vt3CFQCLe22+/fcABB3To0GHy5Mn33HPPk08+ufHGG4uPsBxyyCEwGyZiwvXpp5/usccep512miQcNmwYojoBEuZ9990XV3v06NGmTRucHzx48Jw5c/bee2+RJ0vDhw9v167d/w0kgwC48sorBwwYQFrWWWedjh07vvvuu0yXaU888QRsX331VZUqVcR23XXX9acY4iQM22+/PQrQVayuXbu2i9JyzJgxTpDcgC222AJ4V2688cYVMXJFQTqaN2/OzS+88IKAqBa33Xbb+++/f8QRRyDnwQcfDLxoO/ntt9+YfvLJJ9OhPffcc9SoUUzffffdhZfAvvTSS6+//vpRRx3VoEGDevXqNW7cONgxZMgQAwQfR8wgq/8PIJ955hkw1Il33nkH1FdfffWbb76RdcB07dr1yCOPvPzyy6+44gphVA8hwc/69evLt6FDh86ePZtQ9e3b99xzz7333nulNCS33367wN5yyy3iTIouvvji/fff/8ADD7zhhhtAXW47ywRS9qPW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";
    };

    corrigeOrigem(nome) {
        var ops = ['UNIÃO - ', 'UNIÃO-', 'UNIÃO ', 'MG/EXÉRCITO/'];
        for(var i = 0, max = ops.length; i < max; i++) {
            if (nome.indexOf(ops[i]) === 0) {
                return nome.substr(ops[i].length);
            }
        }
        return nome;
    }

    /**
     *
     */
    finalizar_html() {
        const hoje = new Date();
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        this.html += this._par();
        this.html += `<p class="direita">..., ${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}</p>`;
        this.html += this._par();
        this.usuarioResponsavel.assinaturaHTML.split('\n').forEach((d, i)=>{
            if (i === 0) this.html += this._par(`${d}`, 'centralizado');
            else this.html += this._par(d, 'centralizado');
        });
        this.html += this._par();
        if (this?.processo?.chaveAcesso) this.html += `<hr/><p class="esquerda">Chave de acesso ao Processo: ${this.processo.chaveAcesso} - https://supersapiens.agu.gov.br</p>`;
        this.inserir_footnote();

    }

    inserir_footnote() {
        let ret = '';
        if (this.footnotes.length && typeof this.outerHTML_rodape === "string" && this.outerHTML_rodape.trim()) {
            alert("Duplicidade de footnotes em pragrafos.js\nIgnorando os footnotes em HMTL.");
        }
        if (this.footnotes.length) {
            ret = '<div><section class="footnotes">';
            ret += '<header><p>Notas</p></header>'; //ret += '<header><p>Notas</p></header>';
            ret += '<ol>';
            this.footnotes.forEach((d, i)=>{
                ret += `<li id="footnote-${i + 1}" data-footnote-id="a${i + 1}"><sup><a href="#footnote-marker-${i + 1}-1">^</a> </sup><cite>${d}</cite></li>`;
            });
            ret += '</ol>';
            ret += '</section></div>';
        }
        else if (typeof this.outerHTML_rodape === "string" && this.outerHTML_rodape.trim()) ret += this.outerHTML_rodape;
        this.html += ret;
    }

    formatanup (n){
        var tmp = n;
        var limpa = function (numero) {
            if (!numero?.length) {
                alert('Erro com o numero do NUP');
                return;
            }
            // Retira os caracteres "." "/" "-", mas deixa o dígito verificador da string
            let temp = '';
            for (let i = 0; i < numero.length; i++) if ((numero[i] >= '0') && (numero[i] <= '9')) temp += numero[i];
            return temp;
        };
        n = limpa(n);
        switch(n.length) {
            case 17:
                tmp = n.substr(0,5) + '.';
                tmp += n.substr(5, 6) + '/';
                tmp += n.substr(11, 4) + '-';
                tmp += n.substr(15, 2);
                break;
            case 15: // ex.: 10768.001156/86-05
                tmp = n.substr(0,5) + '.';
                tmp += n.substr(5, 6) + '/';
                tmp += n.substr(11, 2) + '-';
                tmp += n.substr(13, 2);
                break;
            default:
                tmp = n;
        }
        return tmp;
    };

    resetar_num_footnote() {
        this.num_footnote = 1;
    }

    /**
     * Substitui o identificador dos campos pelos valores indicados
     * @param pp
     */
    substituir_campos(pp) {
        let ret = [];
        for(let p of pp) {
            if (this.campos.length) {
                for (let c of this.campos) {
                    if (Array.isArray(c.valor)) {
                        p = p.replace(c.identificador, this.enumerar(c.valor));
                    } else {
                        if (c?.precedido_artigo) {
                            p = p.replace(c.identificador, `${this.femea(c.valor) ? (c?.artigo_uppercase ? 'A' : 'a') : (c?.artigo_uppercase ? 'O' : 'o')} ${c.valor}`);
                        }
                        else {
                            p = p.replace(c.identificador, c.valor);
                        }
                    }
                }
            }
            ret.push(p);
        }
        return ret;
    }

    femea(st) {
        if (!st) return true;
        var partes = st.split(' ');
        var inArray = function(e, ar) {
            for (var i = 0; i < ar.length; i++) {
                if (e === ar[i]) return true;
            }
            return false;
        };
        var termo = partes[0];
        if (!isNaN(partes[0].substr(0,1))) termo = partes[1];
        var masculinos = [
            'ministério',
            'tribunal',
            'sétimo',
            'serviço',
            'primeiro',
            'segundo',
            'terceiro',
            'quarto',
            'quinto',
            'sexto',
            'sétimo',
            'oitavo',
            'nono',
            'sanatório',
            'parque',
            'ordinariado',
            'núcleo',
            'navio-escola',
            'navio-aeródromo',
            'museu',
            'laboratório',
            'instituto',
            'ii',
            'hospital',
            'grupo',
            'grupamento',
            'gabinete',
            'fundo',
            'estado-maior',
            'estabelecimento',
            'escritório',
            'depósito',
            'departamento',
            'conselho',
            'comando',
            'comando-geral',
            'comando-em-chefe',
            'colégio',
            'centro',
            'campo',
            'batalhão',
            'batalhão-escola',
            'arsenal',

            'andre', 'andré', 'antonio', 'adriano', 'bruno', 'celso', 'daniel', 'gilson', 'jose', 'josé', 'leandro', 'luciano',
            'marcelo', 'reginaldo', 'tiago', 'manoel', 'antônio', 'carlos', 'raimundo', 'mateus', 'francisco',
            'benedito', 'luís', 'luiz', 'joão', 'joao', 'adão', 'abraão', 'temístocles', 'valdemiro',
            'cláudio', 'claudio', 'rodrigo'
        ];
        var femininos = [
            'consultoria',
            'consultoria-geral',
            'superintendência',
            'união',
            'unidade',
            'subsecretaria',
            'subdiretoria',
            'segunda',
            'secretaria-geral',
            'secretaria-executiva',
            'secretaria',
            'prefeitura',
            'policlínica',
            'ouvidoria',
            'odontoclínica',
            'fundação',
            'fazenda',
            'estação',
            'escola',
            'diretoria',
            'diretoria-geral',
            'direção',
            'delegacia',
            'coudelaria',
            'controladoria',
            'controladoria-geral',
            'consultoria',
            'companhia',
            'comissão',
            'cinemateca',
            'capitania',
            'caixa',
            'brigada',
            'biblioteca',
            'bateria',
            'base',
            'agência',
            'advocacia-geral',
            'academia',

            'francisléa', 'francislea', 'joelia', 'joélia', 'luciana', 'marcela', 'mônica', 'monica', 'patricia', 'patrícia', 'rafaela', 'silvia', 'sílvia', 'stephanie', 'stéphanie', 'teresa'
        ];
        return inArray(termo.toLowerCase(), femininos);
    };

    enumerar(itens) {
        let ret = '';
        itens.forEach((d, i)=>{
            ret += d;
            if (i === itens.length - 2) ret += ' e ';
            else if (i < itens.length - 1) ret += ', ';
        });
        return ret;
    }

    appendHTML(html) {
        this.html += html;
    }

    /**
     *
     * @param raw_text {String} Texto que será dividido por linhas e vai gerar o texto final
     */
    texto_final(raw_text, processo, setorResponsavel, profile) {
        this.processo = processo;
        this.setorResponsavel = setorResponsavel;
        this.usuarioResponsavel = {
            assinaturaHTML: profile.assinaturaHTML
        };
        this.footnotes = [];
        this.num_footnote = 1;
        this.profile = profile;
        this.html = '';
        const linhas = raw_text.split('\n');
        const num_peca = setorResponsavel.unidade.modalidadeOrgaoCentral.valor === setorResponsavel.unidade.sigla ?
            `XXX/${setorResponsavel?.sigla}/${setorResponsavel?.unidade?.modalidadeOrgaoCentral?.valor}/AGU` :
            `XXX/${setorResponsavel?.sigla}/${setorResponsavel?.unidade?.sigla}/${setorResponsavel?.unidade?.modalidadeOrgaoCentral?.valor}/AGU`;
        this.cabecalho(this.nome_peca, num_peca);
        this.pars(); // Linha em branco
        this.pars(); // Linha em branco
        for(let l of linhas) {
            if (l.trim()) this.pars(l);
        }
        this.finalizar_html();
        return this.html;
    }

    html_completo(raw_text, processo, setorResponsavel, profile) {
        let html = '<!DOCTYPE HTML><html><head>';
        const style = '<style> p {text-indent: 25mm;text-align: justify;font-family: "Calibri, sans-serif";font-size: 11pt;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;} body {font-family: "Calibri, sans-serif";font-size: 11pt;counter-reset: H1 numerado;margin-top: 5%;margin-right: auto;margin-left: auto;max-width: 210mm;line-height: 1.2em;} h1:before {content: counter(H1) ". ";counter-increment: H1;display: inline-block;width: 25mm;} h1 {counter-reset: H2;font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;font-weight: bold;text-transform: uppercase;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;} h2:before {content: counter(H1) "." counter(H2) " ";counter-increment: H2;display: inline-block;width: 25mm;} h2 {font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;font-weight: bold;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;} p.numerado:before {content: counter(numerado) ". ";counter-increment: numerado;display: inline-block;width: 25mm;font-weight: normal;} p.numerado {text-indent: 0mm;text-align: justify;font-family: "Calibri, sans-serif";font-size: 11pt;margin-top: 0;margin-bottom: 0.2em;line-height: 1.2em;font-weight: normal;} img {max-width: 160mm;} table {border-width: 1px;border-spacing: 2px;border-color: black;border-collapse: collapse;font-size: 11pt;max-width: 160mm;word-break: break-word;} table th {border-width: 1px;padding: 2px;border-color: black;font-size: 11pt;} table td {border-width: 1px;padding: 2px;border-color: black;font-size: 11pt;} table td p {text-align: justify;text-indent: 0mm;} ul {font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;list-style-type: circle;margin-left: 18mm;} ol {font-family: "Calibri, sans-serif";font-size: 11pt;text-align: justify;margin-left: 18mm;} blockquote {font-family: "Calibri, sans-serif";font-size: 10pt;text-align: justify;padding-left: 40mm;padding-right: 0mm;margin-top: 0;margin-bottom: 0.2em;margin-right: 0mm;} .centralizado {text-align: center;text-indent: 0;} .direita {text-align: right;text-indent: 0;} .esquerda {text-align: left;text-indent: 0;} p span.cke_widget_inline {text-indent: 0mm !important;} section ol {font-family: "Calibri, sans-serif";margin-left: 2mm !important;} section.footnotes {margin-top: 4.2mm;padding-top: 2.2mm;}</style>';
        html += style;
        html += '</head><body>';
        html += this.texto_final(raw_text, processo, setorResponsavel, profile);
        html += '</body></html>';
        return html;
    }
}