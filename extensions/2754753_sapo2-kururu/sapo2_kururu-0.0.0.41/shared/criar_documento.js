/**
 * Cria um documento vinculado a uma tarefa e atualiza esse documento com o texto dado
 * A criacao de uma instancia da classe nao produz o documento
 * É NECESSÁRIO CHAMAR INIT() PARA QUE SE TENHA UM await e VALOR DE RETORNO POSITIVO OU NEGATIVO SOBRE A CRIAÇÃO DA MINUTA ATUALIZADA
 */
class CriarDocumento extends Payloads {
    _outerHTML_rodape;
    /**
     *
     * @param tarefa {Object} tarefa tal como obtido do Sapiens, mas PRECISA TER O setorResponsavel no Objeto
     * @param nome_peca {string} nome da tarefa. tanto faz se em maiuscula ou minuscula porque vai ter o upperCase() sempre
     * @param id_tipo_peca {Number} numero do tipo da peca juridica modelo
     * @param texto {String | Number | [Number]} texto com as tags (ex.: <p, *, etc...) previstas em pars() ou a sequencia de IDs de uma categoria de modelo do manoel paz
     * @param campos {[Object]} precedido_artigo e artigo_uppercase sao opcionais, Ex.: [{identificador: "###NUMERO_CONTRATO" : valor: "03/2020", precedido_artigo: false, artigo_uppercase: false}, {identificador: "###INTERESSADOS", valor: ["abc", "def"], precedido_artigo: false, artigo_uppercase: false}]
     * @param id_modelos_manoel {Number} ID do modelo de peca juridica armazenado em compendio/modelos do manoel paz.
     * @param justHTML
     * @param outerHTML_rodape {string}
     * @param orgaoCentral {Object} {nome: '...', sigla: '...'}
     */
    constructor(tarefa, nome_peca, id_tipo_peca, texto, campos, id_modelos_manoel, justHTML=false, outerHTML_rodape, orgaoCentral) {
        super();
        this.tarefa = tarefa;
        this.nome_peca = nome_peca;
        this.id_tipo_peca = id_tipo_peca; // Conforme consta em Payloads.criar_minuta(), o id_tipo_peca só será usado se não houver sido designada o nome da peça
        this.texto = texto;
        this._outerHTML_rodape = outerHTML_rodape;
        this.campos = campos || [];
        this.id_modelos_manoel = id_modelos_manoel;
        this.justHTML = justHTML;
        this.doc_criado = undefined;
        this.orgaoCentral = orgaoCentral || {nome: 'CONSULTORIA-GERAL DA UNIÃO', sigla: 'CGU'};
        this.xml = new RequestMF();
    }

    async init() {
        if (this.justHTML && typeof this.texto !== 'string') alert('O Texto foi enviado como HTML puro, mas não é string.');
        // const orgaoSuperior = await this.super_get(this.xml, this.get_unidade_pelo_id(this.tarefa?.setorResponsavel?.unidade?.id));
        // console.group('ORGAO SUPERIOR');
        // console.log(orgaoSuperior);
        // console.groupEnd();
        // alert('ORGAO SUPERIOR');
        const minuta = await this.elaborar_minuta();
        if (!minuta) return false;
        this.doc_criado = await this.atualizar_minuta(minuta);
        return this.doc_criado;
    }

    async elaborar_minuta(id_tipo_peca) {
        const minuta = await this.super_get(this.xml, this.criar_minuta(this.tarefa.id, null, this.id_tipo_peca));
        if (!minuta?.id) {
            alert('Erro na criacao da minuta em branco!');
            return false;
        }
        if (!this.nome_peca) {
            const dados_minuta = await this.super_get(this.xml, this.get_componente_digital(minuta.id));
            console.group('CRIAR DOCUMENTO');
            console.log(dados_minuta);
            console.groupEnd();
            if (typeof dados_minuta?.documento?.tipoDocumento?.nome === "string") this.nome_peca = dados_minuta.documento.tipoDocumento.nome;
            else alert('Não foi especificado o nome do Documento');
        }
        return minuta;
    }

    async atualizar_minuta(minuta) {
        const html = extrair_HTML_do_conteudo(minuta.conteudo);
        const num_peca = this.extrair_numero_peca(html);
        const data = this.extrair_data(html);
        let textos = [];
        if (this.id_modelos_manoel) textos = await this.request_mf('https://manoelpaz.com/cgi-bin/agu/modelos/textos_edicao/routerc', {task:'obter_textos', id: this.id_modelos_manoel});
        let interessados = await this.super_get(this.xml, this.get_processo_interessados(this.tarefa.processo.id), true);
        this.paragrafos = new Paragrafos(this.tarefa, textos, interessados, this.campos);
        this.paragrafos.outerHTML_rodape = this._outerHTML_rodape; // Para inserir as notas de rodapé da clonagem de uma peça
        this.paragrafos.cabecalho(this.tarefa, this.nome_peca, num_peca);
        this.paragrafos.pars(); // Linha em branco
        this.paragrafos.pars(); // Linha em branco
        if (this.justHTML && typeof this.texto === 'string') this.paragrafos.appendHTML(this.texto);
        else if (Array.isArray(this.texto)) for(let t of this.texto) this.paragrafos.pars(t);
        else if (Number.isInteger(this.texto)) this.paragrafos.pars(this.texto); // ID do texto de usucapiao contido no link https://manoelpaz.com/compendio/modelos
        else this.paragrafos.pars(this.texto);
        this.paragrafos.finalizar_html(data);
        this.doc_criado = await this.super_get(this.xml, this.patch_salvar_html(minuta.id, minuta.hash, this.paragrafos.html));
        return this.doc_criado;
    }

    extrair_numero_peca(html) {
        let ano = new Date().getFullYear().toString();
        let re = new RegExp("[0-9]{5}\\/" + ano);
        let raw = re.exec(html)[0];
        let tmp = raw.split('/');
        const num = parseInt(tmp[0]).toString();
        tmp = ['', '00', '0', ''];
        const numpeca = tmp[Math.min(num.length, 3)] + num;
        console.group("CRIAR DOCUMENTO");
        console.log(this.tarefa);
        console.groupEnd();
        if (this?.tarefa?.setorResponsavel?.numeracaoDocumentoUnidade === true || this?.tarefa?.setorResponsavel?.unidade?.numeracaoDocumentoUnidade === true) {
            console.group('Setor Responsavel');
            console.log(this.tarefa?.setorResponsavel);
            console.log('Setor responsável com numeração única. Excluindo o nome do setor');
            console.groupEnd();
            return `${numpeca}/${ano}/${this.tarefa.setorResponsavel.unidade.sigla}/${this.orgaoCentral.sigla}/AGU`;
        }
        else {
            console.group('Setor Responsavel');
            console.log('Não há numeração única na Unidade. Incluindo o nome do setor');
            console.log(this.tarefa?.setorResponsavel);
            console.groupEnd();
            return `${numpeca}/${ano}/${this.tarefa.setorResponsavel.sigla}/${this.tarefa.setorResponsavel.unidade.sigla}/${this.orgaoCentral.sigla}/AGU`;
        }
    }

    extrair_data(html) {
        let ano = new Date().getFullYear().toString();
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let dia = new Date().getDate().toString().length > 1 ? new Date().getDate().toString() : '0' + new Date().getDate().toString();
        if (parseInt(dia) === 1) dia = '1º';
        let mes = meses[new Date().getMonth()];
        const re = new RegExp('>([A-Za-z\\sçáéíóúàãõâêôüÇÁÉÍÓÚÀÃÕÂÊÔÜ]*),\\s[0-9]{1,2}\\sde\\s[A-Za-z\\sçáéíóúàãõâêôüÇÁÉÍÓÚÀÃÕÂÊÔÜ]{4,9}\\sde\\s[0-9]{4}.<');
        let txtdata = re.exec(html);
        if (txtdata && txtdata.length > 0) return `${txtdata[1]}, ${dia} de ${mes} de ${ano}.`;
        return `${dia} de ${mes} de ${ano}.`;
    }

    /**
     * Fornece o link completo para o editor de textos do Super para edicao do documento criado
     * @returns {string}
     */
    async link_documento() {
        if (this.doc_criado && this.tarefa?.id) {
            const minutas = await this.super_get(this.xml, this.get_minutas(this.tarefa.id), true);
            console.log(minutas);
            const {comp_digital_id, processo_id, documento_id} = (()=>{
                const minuta = minutas.filter(d=>Array.isArray(d?.componentesDigitais) && d?.componentesDigitais?.length && d.componentesDigitais[0].id === this.doc_criado.id);
                console.log(minuta);
                return {
                    comp_digital_id: this.doc_criado.id,
                    processo_id: this.tarefa.processo.id,
                    documento_id: minuta[0].id
                }
            })();
            return this.criar_link_doc(this.tarefa, documento_id, comp_digital_id);
            //return `https://supersapiens.agu.gov.br/apps/tarefas/consultivo/minhas-tarefas/entrada/tarefa/124123566/processo/${processo_id}/visualizar/0-0/documento/${documento_id}/(componente-digital/${comp_digital_id}/editor/ckeditor//sidebar:editar/atividade)`
        }
    }

    static teste(){
        return true;
    }
}