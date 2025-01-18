class UsucapiaoCota extends Payloads {
    constructor() {
        super();
    }

    /**
     *
     * @param nome
     * @param minuta
     * @param tarefa Opcional. Objeto com a tarefa recebida do Super. Talvez as informacoes sobre o orgao de origem estejam aqui. Se nao, o id_processo sera utilizado para buscar essas informacoes
     * @param campos {Object} precedido_artigo e artigo_uppercase sao opcionais, Ex.: [{identificador: "###NUMERO_CONTRATO" : valor: "03/2020", precedido_artigo: false, artigo_uppercase: false}, {identificador: "###INTERESSADOS", valor: ["abc", "def"], precedido_artigo: false, artigo_uppercase: false}]
     * @returns {Promise<void>}
     */
    async init(nome, minuta, tarefa, campos) {
        const xml = new RequestMF();
        this.nome = nome;
        this.minuta = minuta;
        this.tarefa = tarefa;
        this.campos = campos;
        this.html = extrair_HTML_do_conteudo(minuta.conteudo); // dependencia: /shared/base64binary.js
        this.interessados = await this.super_get(xml, this.get_processo_interessados(this.tarefa.processo.id), true);
        const lista_nomes = this.interessados.map(d=>d.pessoa.nome);
        this.num_peca = this.extrair_numero_peca();
        this.data = this.extrair_data();
        this.campos =  [
            {identificador: '###DATA', valor: this.date2normal(this.validaData(this.tarefa.dataHoraInicioPrazo)), precedido_artigo: false, artigo_uppercase: false},
            {identificador: '###INTERESSADOS', valor: lista_nomes},
            {identificador: '#REIVINDICAR', valor: lista_nomes.length > 1 ? 'reivindicam' : 'reivindica'}
        ];
        const textos = await this.request_mf('https://manoelpaz.com/cgi-bin/agu/modelos/textos_edicao/routerc', {task:'obter_textos', id:5});
        this.paragrafos = new Paragrafos(this.tarefa, textos, this.interessados, this.campos);
        this.paragrafos.cabecalho(this.tarefa, this.nome, this.num_peca);
        this.paragrafos.pars();
        this.paragrafos.pars();
        this.paragrafos.pars(364); // ID do texto de usucapiao contido no link https://manoelpaz.com/compendio/modelos
        this.paragrafos.finalizar_html(this.data);
        return this.paragrafos.html;
    }
    
    extrair_numero_peca() {
        let ano = new Date().getFullYear().toString();
        let re = new RegExp("[0-9]{5}\\/" + ano);
        let raw = re.exec(this.html)[0];
        let tmp = raw.split('/');
        const num = parseInt(tmp[0]).toString();
        tmp = ['', '00', '0', ''];
        const numpeca = tmp[Math.min(num.length, 3)] + num;
        return `${numpeca}/${ano}/${this.tarefa.setorResponsavel.sigla}/${this.tarefa.setorResponsavel.unidade.sigla}/CGU/AGU`;
    }

    extrair_data() {
        let ano = new Date().getFullYear().toString();
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let dia = new Date().getDate().toString().length > 1 ? new Date().getDate().toString() : '0' + new Date().getDate().toString();
        if (parseInt(dia) === 1) dia = '1º';
        let mes = meses[new Date().getMonth()];
        const re = new RegExp('>([A-Za-z\\sçáéíóúàãõâêôüÇÁÉÍÓÚÀÃÕÂÊÔÜ]*),\\s[0-9]{1,2}\\sde\\s[A-Za-z\\sçáéíóúàãõâêôüÇÁÉÍÓÚÀÃÕÂÊÔÜ]{4,9}\\sde\\s[0-9]{4}.<');
        let txtdata = re.exec(this.html);
        if (txtdata && txtdata.length > 0) return `${txtdata[1]}, ${dia} de ${mes} de ${ano}.`;
        return `${dia} de ${mes} de ${ano}.`;
    }
}