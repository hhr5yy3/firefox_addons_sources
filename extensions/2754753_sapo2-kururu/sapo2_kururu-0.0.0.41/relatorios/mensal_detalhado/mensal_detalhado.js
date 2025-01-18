window.onload = ()=>{
    new MensalDetalhado();
};

class MensalDetalhado extends Payloads {
    constructor() {
        super();
        this.unidade = undefined;
        this.setor = undefined;
        this.ano = undefined; // Integer
        this.mes = undefined; // Integer 1..12
        this.dadosRelatorio = undefined; // Vai conter todos os dados obtidos do Super
        this.flagFeedDB = false;
        this.numFilesFedDB = 0;
        this.listFilesSentDB = []; // used in feedDB() to keep track of files sent
        /*
        Estrutura de this.dadosRelatorio apos coletar tudo
        {
  "id_tarefa": 153386921,
  "nup": "64061010296202259",
  "usuario": "ISMAEL SOARES PEREIRA DE SOUZA",
  "inicio": "2022-11-01T03:00:00.000Z",
  "fim": "2022-11-15T23:00:00.000Z",
  "tipo_tarefa": "ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA",
  "atividadeFromCache": true,
  "id_atividade": 164386993,
  "atividade_especie_nome": "CONSULTA, ELABORAÇÃO DE MANIFESTAÇÃO JURÍDICA DE EFEITOS RESTRITOS",
  "atividade_especie_id": 2983,
  "usuario_id": 1701,
  "usuario_atividade": "ISMAEL SOARES PEREIRA DE SOUZA",
  "atividade_conclusao": "2022-11-20T22:57:57.000Z",
  "processo_id": 31514177,
  "processo_titulo": "PREGÃO ELETRÔNICO PARA AQUISIÇÃO DE GÁS LIQUEFEITO DE PETRÓLEO",
  "processo_desc": "AQUISIÇÃO DE GÁS DE LIQUEFEITO DE PETRÓLEO (13KG E 45KG)",
  "processo_chaveacesso": "407b572e",
  "atividade": {
    "id": 164386993,
    "dataHoraConclusao": "20/11/2022 19:57:57",
    "criadoEm": "20/11/2022 19:57:57",
    "especieAtividade": {
      "id": 2983,
      "nome": "CONSULTA, ELABORAÇÃO DE MANIFESTAÇÃO JURÍDICA DE EFEITOS RESTRITOS"
    },
    "tarefa": {
      "id": 153386921,
      "dataHoraDistribuicao": "01/11/2022 08:31:58",
      "dataHoraConclusaoPrazo": "20/11/2022 19:57:34",
      "dataHoraInicioPrazo": "01/11/2022 08:33:55",
      "dataHoraFinalPrazo": "15/11/2022 20:00:00",
      "especieTarefa": {
        "id": 131,
        "nome": "ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA"
      },
      "processo": {
        "id": 31514177,
        "nup": "64061010296202259",
        "descricao": "AQUISIÇÃO DE GÁS DE LIQUEFEITO DE PETRÓLEO (13KG E 45KG)",
        "titulo": "PREGÃO ELETRÔNICO PARA AQUISIÇÃO DE GÁS LIQUEFEITO DE PETRÓLEO",
        "chaveAcesso": "407b572e",
        "procedencia": {
          "nome": "UNIÃO - 22º BATALHÃO DE INFANTARIA DO EXÉRCITO BRASILEIRO NO TOCANTINS - EXÉRCITO/TO",
          "id": 20307
        }
      }
    },
    "usuario": {
      "nome": "ISMAEL SOARES PEREIRA DE SOUZA",
      "id": 1701
    }
  },
  "elemento_atividade": {},
  "tarefa_datahora_distribuicao": "2022-11-01T11:31:58.000Z",
  "tarefa_datahora_fim_prazo": "2022-11-15T23:00:00.000Z",
  "tarefa_datahora_conclusao_prazo": "2022-11-20T22:57:34.000Z",
  "tarefa_datahora_inicio_prazo": "2022-11-01T11:33:55.000Z",
  "tarefa_datahora_leitura": null,
  "tarefa": {
    "id": 153386921,
    "dataHoraDistribuicao": "01/11/2022 08:31:58",
    "dataHoraConclusaoPrazo": "20/11/2022 19:57:34",
    "dataHoraInicioPrazo": "01/11/2022 08:33:55",
    "dataHoraFinalPrazo": "15/11/2022 20:00:00",
    "especieTarefa": {
      "id": 131,
      "nome": "ELABORAR MANIFESTAÇÃO JURÍDICA CONSULTIVA"
    },
    "processo": {
      "id": 31514177,
      "nup": "64061010296202259",
      "descricao": "AQUISIÇÃO DE GÁS DE LIQUEFEITO DE PETRÓLEO (13KG E 45KG)",
      "titulo": "PREGÃO ELETRÔNICO PARA AQUISIÇÃO DE GÁS LIQUEFEITO DE PETRÓLEO",
      "chaveAcesso": "407b572e",
      "procedencia": {
        "nome": "UNIÃO - 22º BATALHÃO DE INFANTARIA DO EXÉRCITO BRASILEIRO NO TOCANTINS - EXÉRCITO/TO",
        "id": 20307
      }
    }
  },
  "procedencia": "UNIÃO - 22º BATALHÃO DE INFANTARIA DO EXÉRCITO BRASILEIRO NO TOCANTINS - EXÉRCITO/TO",
  "procedencia_id": 20307,
  "buscarPeca": true
}
         */
        this.tabela_principal = undefined;
        this.local_filtros = undefined;
        this.local_tabela = undefined;
        this.local_unidade_setor = undefined;
        this.local_afastamentos = undefined;
        this.filtros = {
            id_usuario: [],
            id_especie_tarefa: [],
            id_especie_atividade: [],
            id_procedencia: []
        };
        this.lista_usuarios = undefined; // id e nome
        this.lista_especies_tarefas = undefined; // id e nome
        this.lista_especies_atividades = undefined; // id e nome
        this.lista_procedencias = undefined; // id e nome
        this.popTotalProcessados = undefined;
        this.logTotalProcessados = undefined;
        this.mpURL = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.xml = new RequestMF();
        this.inicio();
    }

    async inicio() {
        this.local_filtros = MFt.criaElem('div', {
            style: {
                display: 'flex',
                flexDirection: 'horizontal'
            }
        }, document.body);
        this.local_unidade_setor = MFt.criaElem('div', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px'
            }
        }, document.body);
        this.local_tabela = MFt.criaElem('div', {
            style: {
                fontSize: '14px',
                fontFamily: 'Titillium Web'
            }
        }, document.body);
        this.local_afastamentos = MFt.criaElem('div', {
            style: {
                fontSize: '14px',
                fontFamily: 'Titillium Web'
            }
        }, document.body);

        let res = undefined; // {ano: 2023, mes: 1..12, setor: {id: 3810, nome: '...'}, unidade: {id: 216, nome: '...'}}
        const urlInt = val=>{
            let ret = MFt.urlArgs().hasOwnProperty(val) ? parseInt(MFt.urlArgs()[val]) : undefined;
            ret = parseInt(ret);
            return ret;
        };
        /*
         VERIFICA SE JÁ EXISTE A UNIDADE, O SETOR, O MÊS E O ANO DE BUSCA ----------------------------------------------
         */
        if (urlInt('setor') && urlInt('ano') && urlInt('mes')) {
            const dados = await this.obter_dados_setor(urlInt('setor'));
            console.group(`DADOS SETOR ${urlInt('setor')}`);
            console.log(dados);
            console.groupEnd();
            if (dados) {
                this.unidade = dados.unidade;
                this.setor = dados.setor;
                this.ano = urlInt('ano');
                this.mes = urlInt('mes');
            }
            else {
                console.warn('NENHUMA INFORMACAO FOI OBTIDA DO SETOR', urlInt('setor'));
                await this.esperar(2000);
                this.buscar_proximo_relatorio(); // Vai para o item seguinte
            }
            if (Number.isInteger(urlInt('indice'))) {
                let setores = undefined;
                try {
                    setores = JSON.parse(MFt.urlArgs()?.ids);
                } catch {}
                if (Array.isArray(setores) && setores.length) {
                    document.title = `${urlInt('indice') + 1}/${setores.length} ${document.title}`;
                }
            }
        }
        if (!this.unidade || !this.setor || !this.ano || !this.mes) {
            const sel = new SelecionarSetor();
            res = await sel.iniciar();
            console.group('RESPOSTA DO FORMULARIO');
            console.log(res);
            console.groupEnd();
            // -----------------
            this.unidade = res.unidade;
            this.setor = res.setor;
            this.ano = res.ano;
            this.mes = res.mes;
        }
        let relatorioID;
        while (true) {
            this.local_tabela.innerText = 'Gerando relatório...';
            relatorioID = await this.super_get(this.xml, this.get_relatorio_tarefas_distribuidas_para_setor(
                this.setor.id,
                this.primeiro_dia_mes(this.mes, this.ano),
                this.ultimo_dia_mes(this.ano, this.mes)
            ));
            console.group('REQUEST RELATORIO ID')
            console.log(relatorioID);
            console.groupEnd();
            if (relatorioID && relatorioID?.message?.startsWith("Usuário bloqueado")) {
                for(let tempo = 300; tempo > 0; tempo--) {
                    this.local_tabela.innerText = `Usuário foi bloqueado pelo Sapiens. Esperando ${tempo}s...`;
                    await this.esperar(1000);
                }
            }
            else {
                break;
            }
        }
        let contador = 100;
        let relatorioDOC;
        const inicioDaEspera = new Date();
        const tempoMaximoDeEsperaEmSegundos = 120;
        this.local_tabela.innerText = 'Esperando relatório ser disponibilizado...';
        do {
            await this.esperar(5000); // É necessário esperar um pouco para o documento ser produzido, do contrário a resposta vem sem a chave "documento"
            relatorioDOC = await this.super_get(this.xml, this.get_relatorio_info(relatorioID.id));
            const agora = new Date();
            const tempo = agora.valueOf() - inicioDaEspera.valueOf();
            console.log('Tempo esperando', tempo);
            this.local_tabela.innerText = `Esperando relatório ser disponibilizado... (${(tempo/1000).toFixed(1)}s)`;
            if (tempo > tempoMaximoDeEsperaEmSegundos * 1000) {
                this.local_tabela.innerText = 'Relatório não foi produzido em tempo hábil. Reiniciando...';
                location.reload();
            }
        } while (!relatorioDOC?.documento && contador-- > 0);
        if (!relatorioDOC?.documento?.componentesDigitais) {
            alert('Problema de acesso ao Super Sapiens');
            return;
        }
        const componenteDigitalID = relatorioDOC.documento.componentesDigitais[0].id;
        let documento;
        let contDoc = 0;
        while (!documento?.conteudo) {
            this.local_tabela.innerText = `Esperando componente digital... (${contDoc})`;
            documento = await this.super_get(this.xml, this.get_componente_digital(componenteDigitalID));
            if (!documento?.conteudo) {
                console.group("ERRO AO OBTER DOCUMENTO.CONTEUDO");
                console.log(documento);
                console.groupEnd();
                if (documento?.message?.startsWith("Usuário bloqueado")) {
                    for(let ii = 180; ii > 0; ii--) {
                        this.local_tabela.innerText = `Esperando fim do bloqueio do Super... (${ii})`;
                        await this.esperar(1000);
                    }
                }
                await this.esperar(1000);
            }
        }
        const html = this.html_from_conteudo(documento);
        this.local_tabela.innerText = 'Analisando relatório...';
        const apagarRelatorio = await this.super_get(this.xml, this.apagar_relatorio(relatorioDOC.id));
        console.log('APAGAR RELATORIO');
        console.log(apagarRelatorio);
        console.groupEnd();
        this.dadosRelatorio = this.analisarRelatorioHTML(html);
        MFt.clear(this.local_tabela);
        if (this.profile.id === 8499) {
            this.flagFeedDB = await this.popFeedDB();
            if (this.flagFeedDB) console.warn('Alimentação do DB ativada');
        }
        this.popTotalProcessados = new PopUp(200, 100, null, null, async form=>{
            form.div.style.fontFamily = 'Titillium Web';
            form.div.style.fontSize = '14px';
            form.div.innerText = 'Aguarde...';
            /////////////////////////////////////////////////////////////////////////////////////////////
            await this.coletar_dados_complementares(MFt.criaElem('div', null, this.local_tabela));
            this.filtrar_interface(this.local_filtros, 'Usuários', this.lista_usuarios, 'nome', 300);
            this.filtrar_interface(this.local_filtros, 'Tarefas', this.lista_especies_tarefas, 'nome', 300);
            this.filtrar_interface(this.local_filtros, 'Atividades', this.lista_especies_atividades, 'id', 300);
            this.filtrar_interface(this.local_filtros, 'Procedência', this.lista_procedencias, 'id', 400);
            this.exibir_unidade_setor();
            this.exibir_afastamentos();
        });
        this.logTotalProcessados = (totalProcessados, total) => {
            if (Number.isInteger(totalProcessados)) {
                if (this.popTotalProcessados?.div) this.popTotalProcessados.div.innerText = `${totalProcessados}/${total || this.dadosRelatorio.length}`;
            }
            else {
                if (this.popTotalProcessados?.div) this.popTotalProcessados.div.innerText = totalProcessados;
            }
        };
        this.popTotalProcessados.iniciar(this.popTotalProcessados);
        this.popTotalProcessados.aceitaEsc = this.popTotalProcessados.clicafora_sair = false;
        //console.log(documento);
        //console.log(html);
    }

    primeiro_dia_mes(mes, ano) {
        return new Date(ano, mes - 1, 1, 0, 0, 0, 0);
    }

    /**
     * Retorna os dados do relatório a partir da html fornecida
     * @param html {string}
     */
    analisarRelatorioHTML(html) {
        let innerTable = html.substring(html.indexOf('<table>') + '<table>'.length, html.indexOf('</table>'));
        let table = MFt.criaElem('table', {
            innerHTML: innerTable,
            style: {
                borderCollapse: 'collapse'
                // display: 'none'
            }
        });
        let tbody = table.getElementsByTagName('tbody')[0];
        let trs = table.getElementsByTagName('tr');
        let dadosRelatorio = [];
        for(let i = 1; i < trs.length; i++) {
            let tds = trs[i].getElementsByTagName('td');
            if (tds.length === 0) tds = trs[i].getElementsByTagName('th');
            /*
            console.group('DADOS RELATORIO ------------------------------------------');
            console.log('ID', tds[0].innerText.trim());
            console.log('NUP', tds[1].innerText.trim());
            console.log('USUARIO', tds[2].innerText.trim());
            console.log('INICIO', tds[3].innerText.trim());
            console.log('FIM', tds[4].innerText.trim());
            console.log('TIPO', tds[5].innerText.trim());
            console.groupEnd();
             */
            dadosRelatorio.push({
                id_tarefa:parseInt(tds[0].innerText.trim()),
                nup:tds[1].innerText.trim(),
                usuario: tds[2].innerText.trim(),
                inicio: this.valida_data_hora(tds[3].innerText.trim()),
                fim: this.valida_data_hora(tds[4].innerText.trim()),
                tipo_tarefa: tds[5].innerText.trim()
            });
        }
        dadosRelatorio.sort((a,b)=>{
            return a.inicio.valueOf() > b.inicio.valueOf();
        });
        return dadosRelatorio;
    }

    async coletar_dados_complementares(wrapper, from_sapiens=true){
        const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let nao_em = (tipo)=>{ // exclui as tarefas que começam com os termos abaixo
            let casos = [
                //'TOMAR',
                //'PARTICIPAR',
                //'DAR ANDAMENTO',
                //'ADOTAR PROVID'
            ];
            for(let i = 0; i < casos.length; i++) {
                if (tipo.indexOf(casos[i]) === 0) return false;
            }
            return true;
        };
        MFt.clear(wrapper);
        MFt.criaElem('div', {
            innerText: `UNIDADE: ${this.unidade.nome}`,
            style: {
                fontFamily: 'Titillium Web',
                fontWeight: 'bold',
                fontSize: '14px'
            }
        }, wrapper);
        MFt.criaElem('div', {
            innerText: `SETOR: ${this.setor.nome}`,
            style: {
                fontFamily: 'Titillium Web',
                fontWeight: 'normal',
                fontSize: '14px'
            }
        }, wrapper);
        MFt.criaElem('div', {
            innerText: `PERÍODO: ${meses[this.mes]}/${this.ano.toString()}`,
            style: {
                fontFamily: 'Titillium Web',
                fontWeight: 'normal',
                fontSize: '14px'
            }
        }, wrapper);
        this.tabela_principal = MFt.criaElem('table', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px'
            }
        }, MFt.criaElem('div', {}, wrapper));
        let tds = this.tds(['#', 'ID TAREFA', 'NUP', 'NOME', 'P.INICIAL', 'P.FINAL', 'CONCLUSAO', 'TEMPO', 'ID ATIVIDADE', 'PECA JURÍDICA', 'TAREFA', 'ATIVIDADE'], MFt.criaElem('tr', null, this.tabela_principal));
        const td_abrir_abas = ((x)=>{
            return x;
        })(tds[0]);
        /**
         * LOOP DE PEGAR ATIVIDADES
         * @type {number}
         */
        let contador = 0; // Contador não corresponde ao "i" do loop
        const atividadesCache = await (async ()=>{
            const idsTarefas = this.dadosRelatorio.map(d=>d.id_tarefa);
            const res = await this.request_mf(this.mpURL, {
                task: 'obter_registro_tarefa_atividade',
                lista_ids: JSON.stringify(idsTarefas)
            }, 'post'); // Precisa ser POST porque a lista de ids pode ser MUITO grande como no Ministério da Educação
            return res;
        })();
        const obterAtividadeDoCache = id_tarefa=>{
            const reg = atividadesCache.find(d=>d.id_tarefa === id_tarefa);
            return this.converterDados(reg);
        };
        console.group('ATIVIDADES CACHE');
        console.log(atividadesCache);
        console.groupEnd();
        //
        //
        //
        //
        //
        //
        //
        // ENCONTRAR TODAS AS ATIVIDADES ------------------------------------------------------
        for(let i = 0; i < this.dadosRelatorio.length; i++) {
            let d = this.dadosRelatorio[i];
            console.group('TAREFA FROM RELATORIO');
            console.log(d);
            console.groupEnd();
            if (nao_em(d.tipo_tarefa)) {
                let campos = [
                    (++contador).toString(),
                    d.id_tarefa.toString(),
                    this.formatanup(d.nup),
                    '',
                    this.date2normal(d.inicio),
                    '',
                    'buscando...',
                    '',
                    'buscando...',
                    'buscando...',
                    d.tipo_tarefa.length > 30 ? `${d.tipo_tarefa.substring(0, 30)}...` : d.tipo_tarefa ,
                    ''
                ];
                let tds = this.tds(campos, MFt.criaElem('tr', null, this.tabela_principal));
                let usuario_div = MFt.criaElem('div', {style:{display: 'flex', alignItems: 'center'}}, tds[3]);
                let usuario_span = MFt.criaElem('span', {innerText:d.usuario, style:{margin: '0 5px 0 0'}}, usuario_div);
                if (d.tipo_tarefa.indexOf('ELABORAR MANIFESTAÇÃO') < 0) tds[10].style.color = '#555';
                tds[2].style.minWidth = '159px';


                MFt.criaElem('span', {
                    innerText: d?.fim ? this.date2normal(d.fim) : 'sem prazo',
                    style: {
                        //color: new Date() > d.fim ? 'red' : 'black'
                    }
                }, tds[5]);
                let atividade = obterAtividadeDoCache(d.id_tarefa);
                if (!atividade) {
                    while(true) {
                        // PARA EVITAR SER BLOQUEADO, FAZ-SE A DIMINUIÇÃO DO NÚMERO DE REQUISIÇÕES POR SEGUNDO
                        // Em uma situação estudada foram 1267 requsuições em 372 segundos e aí veio o bloqueio por 15 min.
                        // Nesse caso, foi uma média de 3,4 requisições por segundo
                        // Achei que 0,9s por requisição deve ser um valor seguro para evitar o bloqueio e não ter perda de rendimento com a versão pé em baixo
                        // Vamos testar... (27.05.2023)
                        const tempoMinimoEntreRequisicoes = this.dadosRelatorio.length > 500 ? 900 : 0; // em milisegundos. Só é acionado nos casos com mais de 500 tarefas
                        const inicio = new Date();
                        atividade = await this.super_get(this.xml, this.get_atividade_pelo_id_tarefa(d.id_tarefa));
                        const lapso = new Date().valueOf() - inicio.valueOf();
                        const diferencaTempo = tempoMinimoEntreRequisicoes - lapso;
                        if (diferencaTempo > 0) {
                            await this.esperar(diferencaTempo);
                        }
                        // --------------------------------------------------------------------------------------------------------------
                        if (atividade?.message && atividade.message.indexOf('Usuário bloqueado') === 0) {
                            await this.esperarBloqueioSuper((3 * 60) + 1);
                        } else if (atividade?.message) {
                            // algo deu errado, ignora a tarefa
                            break;
                        } else if (Array.isArray(atividade?.entities)) {
                            atividade = atividade.entities.length ? atividade.entities[0] : [];
                            break;
                        } else {
                            atividade = undefined;
                        }
                    } // fim do while(true) ---------------------------------------------
                }
                else {
                    d.atividadeFromCache = true;
                }
                this.logTotalProcessados(`${i + 1}/${this.dadosRelatorio.length} Tarefas`);
                console.group('ATIVIDADE');
                console.log(atividade);
                console.groupEnd();
                MFt.clear(tds[6]);
                MFt.clear(tds[8]);
                if (atividade?.usuario) {
                    usuario_span.setAttribute('id_usuario', atividade.usuario.id);
                    usuario_span.style.cursor = 'pointer';
                    usuario_span.onclick = () => { // FILTRAR FILTRAR FILTRAR FILTRAR FILTRAR FILTRAR FILTRAR FILTRAR
                        this.exibir_um_so({
                            id:atividade.usuario.id, nome:d.usuario
                        });
                    };
                }
                else {
                    //usuario_span.style.fontStyle = 'italic';
                }
                console.group('ATIVIDADE');
                console.log(atividade);
                console.groupEnd();
                if (atividade?.especieAtividade) {
                    d.id_atividade = atividade.id;
                    d.id_tarefa = atividade.tarefa.id;
                    d.atividade_especie_nome = atividade.especieAtividade.nome;
                    d.atividade_especie_id = atividade.especieAtividade.id;
                    d.usuario_id = atividade.usuario.id;
                    d.usuario_atividade = atividade.usuario.nome;
                    d.atividade_conclusao = this.valida_data_hora(atividade.dataHoraConclusao);
                    d.processo_id = atividade.tarefa.processo.id;
                    d.processo_titulo = atividade?.tarefa?.processo?.titulo || ''; // valores nao aparecem nos processos sigilosos
                    d.processo_desc = atividade?.tarefa?.processo?.descricao || '';  // valores nao aparecem nos processos sigilosos
                    d.processo_chaveacesso = atividade?.tarefa?.processo?.chaveAcesso || '';  // valores nao aparecem nos processos sigilosos
                    d.atividade = atividade;
                    d.elemento_atividade = tds[9];
                    d.tarefa_datahora_distribuicao = atividade?.tarefa?.dataHoraDistribuicao ? this.valida_data_hora(atividade.tarefa.dataHoraDistribuicao) : null;
                    d.tarefa_datahora_fim_prazo = atividade.tarefa.dataHoraFinalPrazo ? this.valida_data_hora(atividade.tarefa.dataHoraFinalPrazo) : this.valida_data_hora(atividade?.tarefa?.dataHoraConclusaoPrazo); // Para as tarefas sem prazo, se concluidas, utiliza-se como fim de prazo a data da conclusao da atividade/tarefa.
                    d.tarefa_datahora_conclusao_prazo = atividade?.tarefa?.dataHoraConclusaoPrazo ? this.valida_data_hora(atividade.tarefa.dataHoraConclusaoPrazo) : 0; // Algumas tarefas têm atividade lançada que NÃO encerram a tarefa e não têm o "dataHoraConclusaoPrazo". Não posso colocar null porque a API exige esse item como número.
                    d.tarefa_datahora_inicio_prazo = this.valida_data_hora(atividade.tarefa.dataHoraInicioPrazo);
                    d.tarefa_datahora_leitura = atividade?.tarefa?.dataHoraLeitura ? this.valida_data_hora(atividade.tarefa.dataHoraLeitura) : null;
                    d.tarefa = atividade.tarefa;
                    if (d?.tarefa?.processo?.acessoNegado) {

                    }
                    else {
                        if (atividade?.tarefa?.processo?.procedencia?.nome && atividade?.tarefa?.processo?.procedencia?.id) {
                            d.procedencia = atividade.tarefa.processo.procedencia.nome;
                            d.procedencia_id = atividade.tarefa.processo.procedencia.id;
                        }
                    }
                    tds[11].innerText = atividade.especieAtividade.nome.length > 30 ? `${atividade.especieAtividade.nome.substring(0, 30)}...` : atividade.especieAtividade.nome;
                    MFt.criaElem('span', {
                        innerHTML: this.date2normal(this.valida_data_hora(atividade.criadoEm)),
                        style: {
                            color: 'blue'
                        }
                    }, tds[6]);
                    MFt.criaElem('span', {
                        innerHTML: atividade.id.toString(),
                        style: {
                            color: 'black'
                        }
                    }, tds[8]);
                    // -----------------------
                    let dia = 1000 * 24 * 3600;
                    let inicio = d.inicio.setHours(0,0,0,0);
                    let fim = this.valida_data_hora(atividade.criadoEm).setHours(0,0,0,0);
                    let dias = Math.floor(parseFloat(fim - inicio) / dia);
                    let sp1 = MFt.criaElem('span', {
                        innerHTML: dias.toString(),
                        style: {
                            color: dias > 13 ? 'red' : 'black'
                        }
                    }, tds[7]);
                    tds[7].style.textAlign = 'center';
                    // -------------------------------------------------------
                    d.buscarPeca = true; // indica ao programa que a peça deste item de this.dadosRelatorio deve ser buscada
                    /*
                    atividadesParaBuscarPeca.push({
                        atividade,
                        registro: d,
                        elemento: tds[9] // td da peca juridca
                    });
                    */
                }
                else {
                    let dia = 1000 * 24 * 3600;
                    let inicio = d.inicio.setHours(0,0,0,0);
                    let fim = new Date().setHours(0,0,0,0);
                    let dias = Math.floor(parseFloat(fim - inicio) / dia);
                    MFt.criaElem('span', {
                        innerHTML: `aberta (${dias})`,
                        style: {
                            color: 'green'
                        }
                    }, tds[6]);
                    MFt.clear(tds[9]);
                }
            }
        }
        // Ir atras das pecas juridicas
        //
        //
        //
        //
        //
        //
        //
        console.log('PROCEDIMENTO PARA ENCONTRAR PECAS JURIDICAS ---------------------------------------');
        const encontrarPecas = new EncontrarPecaJuntada();
        encontrarPecas.logBloqueadoSuper = this.logTotalProcessados;
        const dadosParaBuscar = this.dadosRelatorio.filter(d=>d?.buscarPeca);
        const ampulheta = new Image(20);
        await this.load_image(ampulheta, '/images/throbber_13.gif');
        console.log('imagem carregada');
        let contadorDadosParaBuscar = 0;
        for(let at of dadosParaBuscar) {
            const exibirProgresso = (examinados, total)=>{
                MFt.clear(at.elemento_atividade);
                const d1 = MFt.criaElem('div', {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                    }
                }, at.elemento_atividade);
                MFt.criaElem('span', {
                    innerText: `${examinados}/${total}`,
                    style: {
                        margin: '0 10px 0 0'
                    }
                }, d1);
                d1.appendChild(ampulheta);
            }
            const tp = data=>{
                return parseInt(data.valueOf() / 1000);
            }
            encontrarPecas.log = exibirProgresso;
            exibirProgresso(0,0);
            const peca = this.encontrarPecaCache(at.atividade, atividadesCache) || await encontrarPecas.encontrar_v2(at.atividade);
            this.logTotalProcessados(`${++contadorDadosParaBuscar}/${dadosParaBuscar.length} Peças`);

            // Dados para salvar no DB
            const dbMP = {
                task: 'salvar_registro_tarefa_atividade',
                especie_atividade: at.atividade_especie_nome,
                especie_atividade_id: at.atividade.especieAtividade.id,
                especie_tarefa: at.tarefa.especieTarefa.nome,
                especie_tarefa_id: at.tarefa.especieTarefa.id,
                usuario: at.usuario,
                usuario_id: at.usuario_id,
                processo: at.nup,
                processo_id: at.processo_id,
                processo_chave_acesso: at?.processo_chaveacesso || '', // Esse valor é omitido em sigilosos
                processo_titulo: at.processo_titulo || '', // Esse valor é omitido em sigilosos
                processo_descricao: at.processo_desc || '', // Esse valor é omitido em sigilosos
                processo_valor: at.tarefa?.processo?.valorEconomico ? (parseInt(at.tarefa.processo.valorEconomico * 100)) : '', // Esse valor é omitido em sigilosos
                tarefa_id: at.id_tarefa,
                tarefa_datahora_criacao: tp(this.valida_data_hora(at.tarefa?.dataHoraDistribuicao || at.tarefa?.criadoEm)),
                tarefa_datahora_inicio_prazo: at.tarefa?.dataHoraInicioPrazo ? tp(this.valida_data_hora(at.tarefa.dataHoraInicioPrazo)) : '',
                datahora_fim_prazo: at.tarefa?.dataHoraFinalPrazo ? tp(this.valida_data_hora(at.tarefa.dataHoraFinalPrazo)) : '',
                // ATENÇÃO: A API nao aceita tarefa_datahora_conclusao com nulo, vazio ou data anterior à criacao do Sapiens. Por isso, todos eles vao ficar marcados como 2014-01-01T00:00:00. Isso porque algumas tarefas ficam abertas mesmo após o lançamento da atividade.
                tarefa_datahora_conclusao: at.tarefa?.dataHoraConclusaoPrazo ? tp(this.valida_data_hora(at.tarefa.dataHoraConclusaoPrazo)) : 1388545200,
                atividade_id: at.id_atividade,
                atividade_datahora: tp(at.atividade_conclusao),
                unidade: this.unidade.nome,
                unidade_id: this.unidade.id,
                setor: this.setor.nome,
                setor_id: this.setor.id,
                //tipo_documento: peca.tipo_doc,
                //tipo_documento_id: peca.tipo_doc_id,
                //componente_digital_id: peca.id_comp.id,
                //numero_doc: peca.numeroUnicoDocumentoFormatado,
                //juntada_id: peca.juntada.id,
                procedencia: at?.procedencia || '', // Valor omitido nos sigilosos
                procedencia_id: at?.procedencia_id || '', // Valor omitido nos sigilosos
            };
            const verificar_dbMP = ()=>{
                const listaTempos = [
                    'tarefa_datahora_criacao',
                    'tarefa_datahora_inicio_prazo',
                    'datahora_fim_prazo',
                    'tarefa_datahora_conclusao',
                    'atividade_datahora',
                ]
                const timestampMinimo = 1357009200; // É o valor que se encontra no Backend 01.01.2013
                for(let item of listaTempos) {
                    if (dbMP[item] < timestampMinimo) {
                        console.warn(`${item} < ${timestampMinimo}`);
                        dbMP[item] = timestampMinimo;
                    }
                }
            }
            if (peca?.comp) {
                if (this.flagFeedDB && false) {
                    // Avoids to send the file for while
                    if (false) {
                        this.feedDB(peca.comp.id).then(dd => {
                            if (dd) {
                                console.log(`FEED DB ${this.numFilesFedDB}/${this.listFilesSentDB.length}`);
                            }
                        });
                    }
                    else {
                        const dd = await this.feedDB(peca.comp.id);
                        if (dd) {
                            console.log(`%cFEED DB de Pesquisa ${this.numFilesFedDB}/${this.listFilesSentDB.length}`, 'color:orange;');
                        }
                    }
                }
                const innerText = (() => {
                    if (peca.numeroUnicoDocumentoFormatado) {
                        const ret = `${peca.tipo_doc} n. ${peca.numeroUnicoDocumentoFormatado}`;
                        return ret.length < 31 ? ret : `${ret.substring(0, 31)}...`;
                    } else return peca.tipo_doc;
                })();
                MFt.clear(at.elemento_atividade);
                const link = MFt.criaElem('a', {
                    href: (()=>{
                        console.group('LINK PECA ---------------');
                        console.log(peca);
                        console.groupEnd();
                        let ref = `/pesquisa/sapiensdoc.html?id=${peca.comp.id}`;
                        if (peca.numeroUnicoDocumentoFormatado) {
                            const tmp = encodeURIComponent(`${peca.tipo_doc} n. ${peca.numeroUnicoDocumentoFormatado}`);
                            ref += `&nome_peca=${tmp}`;
                        }
                        return ref;
                    })(),
                    innerText,
                    target: '_blank',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Titillium Web'
                    }
                }, at.elemento_atividade);
                console.group('DADOS BRUTOS');
                console.log(at);
                console.groupEnd();
                if (peca?.cache) {
                    console.log('PECA EXISTENTE NO CACHE', `${peca.tipo_doc} n. ${peca.numeroUnicoDocumentoFormatado}`);
                }
                else {
                    dbMP.tipo_documento = peca.tipo_doc;
                    dbMP.tipo_documento_id = peca.tipo_doc_id;
                    dbMP.componente_digital_id = peca.comp.id;
                    dbMP.numero_doc = peca.numeroUnicoDocumentoFormatado;
                    dbMP.juntada_id = peca.juntada.id;
                    for(let dd of this.dadosRelatorio) {
                        //console.log(dd.id_tarefa, dbMP.tarefa_id);
                        if (dd.id_tarefa === dbMP.tarefa_id) {
                            if (dd?.atividade) { // Para ser compativel com converterDados() e exibir_registros()
                                dd.atividade.peca_juridica = {
                                    id_comp: dbMP.componente_digital_id,
                                    num_doc: dbMP?.numero_doc || '',
                                    tipo_doc: dbMP.tipo_documento,
                                    id_tipo_doc: dbMP.tipo_documento_id,
                                    id_juntada: dbMP.juntada_id,
                                };
                            }
                            break;
                        }
                    }
                    //-------------------------------------------------------------------
                    // Enviar para o banco de dados - salvar dados
                    while (true) {
                        console.group('ALIMENTANDO DB de TAREFA-ATIVIDADE');
                        console.log(dbMP);
                        let res;
                        verificar_dbMP();
                        try {
                            res = await this.request_mf(this.mpURL, dbMP, 'get', false, false);
                        } catch {}
                        console.log('Resposta do servidor');
                        console.log(res);
                        console.groupEnd();
                        if (res) break;
                        console.log('Erro ao alimentar DB', new Date());
                        await this.esperar('1000');
                    }
                }
            }
            else {
                at.elemento_atividade.innerText = 'Sem peça';
                if (dbMP?.tarefa_datahora_conclusao && !at.atividadeFromCache) {
                    // Enviar para o banco de dados - salvar dados
                    console.log('NAO ENVIAR - SEM PECA');
                    console.log(dbMP);
                    let res = false;
                    verificar_dbMP();
                    while (!res) {
                        res = await this.request_mf(this.mpURL, dbMP, 'get', false, false);
                        if (!res) {
                            console.warn('Erro ao enviar dados ao MP');
                            await this.esperar(2000);
                        }
                    }
                }
            }
        }
        console.log(this.dadosRelatorio);
        this.lista_usuarios = (()=>{
            let ret = [];
            for(let u of this.dadosRelatorio) {
                if (!ret.some(d=>{
                    return d.nome === u.usuario; // Nao posso usar o id do usuario porque ele so aparece nas tarefas concluidas
                })) {
                    ret.push({
                        id: u.usuario_id,
                        nome: u.usuario,
                        selecionado: false, // Vai indicar se deve ser filtrado por este item
                    });
                }
            }
            ret.sort((a,b)=>{
                return this.ascii_mf(a.nome) > this.ascii_mf(b.nome);
            });
            return ret;
        })();
        this.lista_especies_tarefas = (()=>{
            let ret = [];
            for(let u of this.dadosRelatorio) {
                if (!u?.tipo_tarefa) {
                    console.group('SEM NOME DE TAREFA');
                    console.log(u);
                    console.groupEnd();
                }
                if (u?.tipo_tarefa && !ret.some(d=>{
                    return d.nome === u.tipo_tarefa; // Nao posso usar u?.tarefa?.especieTarefa?.nome porque ele so aparece nas tarefas concluidas
                })) {
                    ret.push({
                        id: u?.tipo_tarefa?.especieTarefa?.id,
                        nome: u?.tipo_tarefa,
                        selecionado: false, // Vai indicar se deve ser filtrado por este item
                    });
                }
            }
            ret.sort((a,b)=>{
                return this.ascii_mf(a.nome) > this.ascii_mf(b.nome);
            });
            return ret;
        })();
        this.lista_especies_atividades = (()=>{
            let ret = [];
            for(let u of this.dadosRelatorio) {
                if (u?.atividade_especie_id &&!ret.some(d=>{
                    return d.id === u.atividade_especie_id;
                })) {
                    ret.push({
                        id: u.atividade_especie_id,
                        nome: u.atividade_especie_nome,
                        selecionado: false, // Vai indicar se deve ser filtrado por este item
                    });
                }
            }
            ret.sort((a,b)=>{
                return this.ascii_mf(a.nome) > this.ascii_mf(b.nome);
            });
            return ret;
        })();
        this.lista_procedencias = (()=>{
            let ret = [];
            for(let u of this.dadosRelatorio) {
                if (u?.procedencia_id && !ret.some(d=>{
                    return d.id === u.procedencia_id;
                })) {
                    ret.push({
                        id: u.procedencia_id,
                        nome: u.procedencia,
                        selecionado: false, // Vai indicar se deve ser filtrado por este item
                    });
                }
            }
            ret.sort((a,b)=>{
                return this.ascii_mf(a.nome) > this.ascii_mf(b.nome);
            });
            return ret;
        })();
        console.log(this.lista_usuarios);
        console.log(this.lista_procedencias);
        console.log(this.lista_especies_tarefas);
        console.log(this.lista_especies_atividades);
        if (this.flagFeedDB) {
            await this.esperar_envio_pecas_db(this.popTotalProcessados);
        }
        await this.exibir_registros();
        this.popTotalProcessados.closeWindow(this.popTotalProcessados);
        this.buscar_proximo_relatorio(); // processar em lote
    }

    converterDados(reg) {
        console.group('CONVERTER DADOS');
        console.log(reg);
        console.groupEnd();
        if (!reg) return undefined;
        let atividade = {};
        atividade.id = reg.id_atividade;
        atividade.dataHoraConclusao =  this.date2normal(new Date(reg.atividade_datahora * 1000), true);
        atividade.criadoEm =  this.date2normal(new Date(reg.atividade_datahora * 1000), true);
        atividade.especieAtividade = {
            id: reg.id_especie_atividade,
            nome: reg.especie_atividade
        };
        atividade.tarefa = {
            id: reg.id_tarefa,
            dataHoraDistribuicao: this.date2normal(new Date(reg.tarefa_distribuicao * 1000), true),
            dataHoraConclusaoPrazo: this.date2normal(new Date(reg.tarefa_conclusao_prazo * 1000), true),
            dataHoraInicioPrazo:  this.date2normal(new Date(reg.tarefa_inicio_prazo * 1000), true),
            dataHoraFinalPrazo:  this.date2normal(new Date(reg.tarefa_final_prazo * 1000), true),
            especieTarefa: {
                id: reg.id_especie_tarefa,
                nome: reg.especie_tarefa
            },
            processo: {
                id: reg.id_processo,
                nup: reg.processo,
                descricao: reg?.processo_descricao || null,
                titulo: reg?.processo_titulo || null,
                chaveAcesso: reg?.chaveacesso || null,
                procedencia: {
                    nome: reg?.procedencia || null,
                    id: reg?.id_procedencia || null
                },
            }
        }
        atividade.usuario = {
            nome: reg.usuario,
            id: reg.id_usuario,
        };
        if (reg?.id_comp) {
            atividade.peca_juridica = {
                id_comp: reg.id_comp,
                num_doc: reg?.num_doc || '',
                tipo_doc: reg.tipo_doc,
                id_tipo_doc: reg.id_tipo_doc,
                id_juntada: reg.id_juntada
            }
        }
        return atividade;
    };

    encontrarPecaCache(atividade, atividadesCache) {
        const reg = atividadesCache.find(d=>d.id_atividade === atividade.id);
        if (!reg) return undefined; // Aqui nao ha atividade porque a tarefa ainda nao foi concluida
        if (reg?.id_comp) { // Aqui ha atividade e a tarefa foi concluida
            return { // Aqui a tarefa foi concluida com a producao de uma peca
                numeroUnicoDocumentoFormatado: reg.num_doc,
                tipo_doc: reg.tipo_doc,
                id_comp: { // id_comp quando vem do sapiens sao todos os dados do componente digital, como so preciso do id...
                    id: reg.id_comp
                },
                cache: true
            };
        }
        else { // Aqui a atividade foi concluida sem a producao de peca
            return {
                cache: true
            };
        }
    }

    esperarBloqueioSuper(segundos) {
        return new Promise(rr=>{
            const timer1 = setInterval(() => {
                segundos--;
                this.logTotalProcessados(`Bloqueado pelo Super. Liberação em ${segundos}s`);
                if (segundos === 0) {
                    clearInterval(timer1);
                    rr();
                }
            }, 1000);
        });
    }

    filtrar_interface(wp, titulo, filtro, key_filtro, width=300) {
        //console.group('FILTRAR INTERFACE');
        //console.log('Titulo', titulo);
        //console.log('Filtro', filtro);
        //console.log('Key Filtro', key_filtro);
        //console.log('Width', width);
        //console.groupEnd();
        const d1 = MFt.criaElem('div', {
            style: {
                //display: 'grid',
                //gridTemplateRows: '37px auto',
                padding: '0 5px',
                margin: '0 5px 15px 0',
                height: '35px',
                //overflow: 'hidden',
                //overflowX: 'hidden'
            }
        }, wp);
        const d2 = MFt.criaElem('div', {
            innerText: `Filtro por ${titulo}`,
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '5px 10px',
                border: '2px solid #777',
                width: `${width}px`
            }
        }, d1);
        const caixa_itens = MFt.criaElem('div', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                position: 'relative',
                top: '0',
                left: '0',
                maxHeight: '400px',
                overflowX: 'hidden',
                overflowY: 'auto',
                background: '#fff5c4',
                border: '1px solid #333',
                borderTop: '0',
                padding: '10px 10px 10px 10px',
                borderRadius: '0 0 6px 6px',
                display: 'none'
            }
        }, d1);
        if (Array.isArray(filtro)) {
            if (!filtro.length) {
                caixa_itens.innerText = 'Sem elementos para filtrar';
                return;
            }
            for(let f of filtro) {
                const itemDiv = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: '25px auto',
                        fontFamily: 'Titillium Web',
                        fontSize: '14px',
                        //background: '#FFF'
                    }
                }, caixa_itens);
                const check = MFt.criaElem('input', {
                    type: 'checkbox',
                    value: f[key_filtro].toString(),
                    style: {

                    }
                }, MFt.criaElem('div', null, itemDiv));
                const nome = MFt.criaElem('div', {
                    innerText: `${this.corrigir_nome(f.nome)}`
                }, itemDiv);
                check.onchange = ()=>{
                    f.selecionado = check.checked;
                    console.log(filtro);
                    this.exibir_registros();
                };
            }
            d1.onmouseenter = e=>{
                caixa_itens.style.display = 'block';
            };
            d1.onmouseleave = e=>{
                caixa_itens.style.display = 'none';
            };
        }
    }

    exibir_unidade_setor() {
        const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        MFt.clear(this.local_unidade_setor);
        const d1 = MFt.criaElem('div', {

        }, this.local_unidade_setor);
        const d2 = MFt.criaElem('div', {

        }, this.local_unidade_setor);
        const d3 = MFt.criaElem('div', {

        }, this.local_unidade_setor);
        const sp = (t, e, bold=false)=>{
            MFt.criaElem('span', {
                innerText: t,
                style: {
                    fontWeight: 'bold'
                }
            }, e);
        };
        sp('UNIDADE: ', d1, true);
        sp(this.unidade.nome, d1, false);
        sp('SETOR: ', d2, true);
        sp(this.setor.nome, d2, false);
        sp('PERÍODO: ', d3, true);
        sp(`${meses[this.mes]}/${this.ano}`, d3, true);
    }

    async exibir_registros() {
        let dados = this.filtrar_registros();
        MFt.clear(this.local_tabela);
        if (dados.length === 0) {
            MFt.criaElem('div', {
                innerText: 'Os filtros utilizados não geraram registros',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px',
                }
            }, this.local_tabela);
            return;
        }
        const tabela = MFt.criaElem('table', {

        }, this.local_tabela);
        const colunas = ['#', 'ID TAREFA', 'NUP', 'NOME', 'CRIAÇÃO TAREFA', 'INICIO PRAZO', 'PRAZO TAREFA', 'CONCLUSÃO', 'TEMPO', 'ID ATIVIDADE', 'PEÇA JURÍDICA', 'TAREFA', 'ATIVIDADE', 'PROCEDÊNCIA'];
        const tr = MFt.criaElem('tr', {}, tabela);
        const diffDias = (inicio, fim)=>{
            //console.log(inicio, fim);
            const dia = 1000 * 24 * 3600;
            if (!(inicio instanceof Date)) {
                inicio = this.valida_data_hora(inicio);
            }
            if (!fim) fim = new Date();
            if (!(fim instanceof Date)) {
                fim = this.valida_data_hora(fim);
            }
            inicio.setHours(0,0,0,0);
            fim.setHours(0,0,0,0);
            return Math.floor(parseFloat(fim - inicio) / dia);
        };
        this.tds(colunas, tr);
        for(let i = 0; i < dados.length; i++) {
            const d = dados[i];
            //console.group('DADOS exibir');
            //console.log(d);
            //console.groupEnd();
            const tr = MFt.criaElem('tr', null, tabela);
            //console.log(d);
            const tempoTotal = diffDias(d?.tarefa_datahora_inicio_prazo || d?.inicio, d?.tarefa_datahora_conclusao_prazo);
            const linkPeca = await (async ()=>{
                if (d?.atividade?.peca_juridica && d?.atividade?.peca_juridica?.id_comp) {
                    if (true) {
                        this.feedDB(d.atividade.peca_juridica.id_comp).then(dd => {
                            if (dd) {
                                console.log(`FEED DB ${this.numFilesFedDB}/${this.listFilesSentDB.length}`);
                            }
                        });
                    }
                    else {
                        const dd = await this.feedDB(d.atividade.peca_juridica.id_comp);
                        if (dd) {
                            console.log(`%cFEED DB ${this.numFilesFedDB}/${this.listFilesSentDB.length}`, 'color:green;');
                        }
                    }
                    let ref = `/pesquisa/sapiensdoc.html?id=${d.atividade.peca_juridica.id_comp}`;
                    const nome = `${d?.atividade.peca_juridica.tipo_doc}${d?.atividade?.peca_juridica?.num_doc ? ' n. ' : ''}${d?.atividade?.peca_juridica?.num_doc || ''}`;
                    if (d?.atividade?.peca_juridica?.num_doc) {
                        ref += `&nome_peca=${encodeURIComponent(nome)}`;
                    }
                    return MFt.criaElem('a', {
                        href: ref,
                        target: '_blank',
                        innerText: nome
                    });
                }
                return MFt.criaElem('span');
            })();
            const linkProcesso = nup=>{
                return MFt.criaElem('a', {
                    innerText: this.formatanup(nup),
                    target: '_blank',
                    href: `/visualizar_nup/index.html?nup=${nup}&cache=on`,
                    style: {
                        //fontFa
                    }
                });
            }
            const tds = this.tds([
                (i + 1).toString(), // indice
                d.id_tarefa.toString(),
                this.formatanup(d.nup),
                d.usuario,
                this.date2normal(d?.tarefa_datahora_distribuicao || d?.inicio),
                d?.tarefa_datahora_inicio_prazo ? this.date2normal(d.tarefa_datahora_inicio_prazo) : '',
                d?.tarefa_datahora_fim_prazo ? this.date2normal(d.tarefa_datahora_fim_prazo) : '',
                d?.tarefa_datahora_conclusao_prazo ? this.date2normal(d.tarefa_datahora_conclusao_prazo) : 'Em aberto',
                tempoTotal.toString(),
                d?.atividade_id || '',
                '',
                d.tipo_tarefa,
                d?.atividade_especie_nome || '',
                d?.procedencia ? this.corrigir_nome(d.procedencia) : ''
            ], tr);
            if (!d?.tarefa_datahora_conclusao_prazo) tds[7].style.color = 'green';
            MFt.clear(tds[2]); tds[2].append(linkProcesso(d.nup)); // Link para o NUP
            tds[10].appendChild(linkPeca);
            if (d?.tarefa_datahora_conclusao_prazo) {
                if (d.tarefa_datahora_conclusao_prazo > d?.tarefa_datahora_fim_prazo) {
                    tds[7].style.color = 'red'; // Data
                    tds[8].style.color = 'red'; // Tempo em dias
                }
            }
        }
        if (this.flagFeedDB) {
            await this.esperar_envio_pecas_db(this.popTotalProcessados);
        }
    }

    filtrar_registros() {
        let dados = this.dadosRelatorio;
        //console.log(dados);
        const relFiltro = (lista, key)=>{
            let ret = [];
            for(let l of lista) {
                if (l.selecionado) {
                    const o = {};
                    o[key] = l[key];
                    ret.push(o);
                }
            }
            return ret;
        };
        const filtrar = (keyMenor, keyMaior, rel)=>{
            return dados.filter(d=>{
                return rel.some(e=>{
                    return e[keyMenor] === d[keyMaior];
                });
            });
        };
        console.log(this.lista_procedencias);
        const relUsuarios = relFiltro(this.lista_usuarios, 'nome');
        const relProcedencia = relFiltro(this.lista_procedencias, 'id');
        const relAtividades = relFiltro(this.lista_especies_atividades, 'id');
        const relTarefas = relFiltro(this.lista_especies_tarefas, 'nome');
        //console.log(relUsuarios);
        //console.log(relProcedencia);
        //console.log(relAtividades);
        //console.log(relTarefas);
        if (relUsuarios.length) dados = filtrar('nome', 'usuario', relUsuarios);
        if (relProcedencia.length) dados = filtrar('id', 'procedencia_id', relProcedencia);
        if (relAtividades.length) dados = filtrar('id', 'atividade_especie_id', relAtividades);
        if (relTarefas.length) dados = filtrar('nome', 'tipo_tarefa', relTarefas);
        console.log(dados);
        return dados;
    }

    afastado_no_mes(afastamentos) {
        const inicio = new Date(this.ano, this.mes - 1, 1, 0, 0, 0, 0);
        const fim = new Date(this.ano, this.mes - 1, this.totalDeDiasDoAnoMes(this.ano, this.mes - 1), 23, 59, 59, 999);
        let ret = [];
        for(let a of afastamentos) {
            const bloqueioInicio = this.valida_data_hora(a.dataInicioBloqueio);
            const bloqueioFim = this.valida_data_hora(a.dataFimBloqueio);
            const afastamentoInicio = this.valida_data_hora(a.dataInicio);
            const afastamentoFim = this.valida_data_hora(a.dataFim);
            if ([[bloqueioInicio, bloqueioFim], [afastamentoInicio, afastamentoFim]].some(d=>{
                return (d[0].valueOf() <= fim && d[0].valueOf() >= inicio);
            })) {
                ret.push(a);
            }
        }
        return ret;
    }

    async exibir_afastamentos() {
        const listarAfastamentos = aa=>{
            let ret = '';
            for(let a of aa) {
                if (ret) ret += '    -     ';
                ret += `${a?.modalidadeAfastamento?.descricao}, Bloqueio de ${this.date2normal(this.valida_data_hora(a.dataInicioBloqueio))} a ${this.date2normal(this.valida_data_hora(a.dataFimBloqueio))} - Afastamento de ${this.date2normal(this.valida_data_hora(a.dataInicio))} a ${this.date2normal(this.valida_data_hora(a.dataFim))}`;
            }
            return ret;
        };
        const criarLinha = (i, u, e)=>{
            const tds = this.tds([
                i.toString(),
                u.colaborador.usuario.nome,
                listarAfastamentos(this.afastado_no_mes(u.afastamentos)),
            ], e);
        };
        MFt.clear(this.local_afastamentos);
        MFt.atribs(this.local_afastamentos, {
            style: {
                margin: '20px 0',
                padding: '20px 0'
            }
        });
        MFt.criaElem('span', {
            innerText: 'Obtendo dados de afastamento...',
            style: {
                fontSize: '14px',
                fontFamily: 'Titillium Web'
            }
        }, this.local_afastamentos);
        const img = new Image(18);
        img.onload = ()=>{
            this.local_afastamentos.appendChild(img);
        };
        img.src = '/images/throbber_13.gif';
        const relUsuarios = await this.super_get(this.xml, this.get_usuarios_setor(this.setor.id), true);
        for(let u of relUsuarios) {
            u.afastamentos = await this.super_get(this.xml, this.get_afastamentos(u.colaborador.id, 0, 'DESC'), true);
        }
        console.group('AFASTAMENTOS ----------------');
        console.log(relUsuarios);
        console.groupEnd();
        MFt.clear(this.local_afastamentos);
        const tabela = MFt.criaElem('table', {
            style: {
                borderCollapse: 'collapse'
            }
        }, this.local_afastamentos);
        const tds = this.tds(['#', 'Usuário', 'Afastamento'], MFt.criaElem('tr', null, tabela));
        for(let td of tds) MFt.atribs(td, {style:{fontWeight: 'bold'}});
        let i = 0;
        for(let u of relUsuarios) {
            criarLinha(++i, u, MFt.criaElem('tr', null, tabela));
        }
    }

    async obter_dados_setor(id) {
        const xml = new RequestMF();
        /*
        const tmp = await this.super_get(xml, this.get_unidade_pelo_id(id));
        console.group('mensal_detalhado.js - obter_dados_setor()');
        console.log(tmp);
        console.groupEnd();
         */
        const dados = await this.super_get(xml, this.get_unidade_pelo_id(id), true, true);
        console.log(dados);
        return dados?.id ? {
            setor: {
                id: dados.id,
                nome: dados.nome,
                sigla: dados.sigla,
            },
            unidade: {
                id: dados.unidade.id,
                nome: dados.unidade.nome,
                sigla: dados.unidade.sigla,
            }
        } : false;
    }

    buscar_proximo_relatorio() {
        const url = val=>{ // retorna undefined ou NaN
            let ret = MFt.urlArgs().hasOwnProperty(val) ? parseInt(MFt.urlArgs()[val]) : undefined;
            ret = parseInt(ret);
            return ret;
        };
        const idsSetores = (()=>{ // Retorna a array de setores se existente na URL ou falso
            const rawJSON = MFt.urlArgs()?.ids;
            if (!rawJSON) return false;
            let ids = undefined;
            try {
                ids = JSON.parse(rawJSON);
            } catch {}
            return Array.isArray(ids) && ids?.length && Number.isInteger(ids[0]) ? ids : false;
        })();
        /*
        Preciso de 7 valores para continuar o relatório em lote:
        setor {Number}
        mes {Number} 1..12
        ano {Number}
        ano_final {Number}
        mes_final {Number} De 1..12
        indice {Number} Índice de idsSetores que está sendo analisado e começa com ZERO
        ids {JSON de Array<Number>} JSON com os ids em Array
         */
        const obterNovaData = (mes, ano, mes_final, ano_final) => {
            const agora = new Date();
            if (mes > 12 || ano > agora.getFullYear() || (ano === agora.getFullYear() && mes > agora.getMonth())) return false;
            if (ano < ano_final) {
                mes++;
                if (mes > 12) {
                    mes = 1;
                    ano++;
                }
                return {mes, ano};
            }
            else if (ano === ano_final) {
                if (mes < mes_final) {
                    mes++;
                    if (mes > 12) return false;
                    return {mes, ano};
                }
            }
            return false;
        };
        /*  TESTE DE obterNovaData()
        (()=>{
            let mes = 1, ano = 2020, mes_final = 10, ano_final = 2024;
            let novaData;
            let debug = 1;
            do {
                novaData = obterNovaData(mes, ano, mes_final, ano_final);
                console.log(novaData);
                mes = novaData.mes;
                ano = novaData.ano;
                debug++;
                if (debug > 1000) {
                    alert('LOOP INFINITO');
                    break;
                }
            } while(novaData);
        })();
        alert('---------------------');

         */
        if (url('setor') && url('mes') && url('ano') && url('ano_final') && url('mes_final') && !isNaN(url('indice')) && idsSetores) {
            console.log('RELATORIO EM LOTE - PROCURANDO NOVO MES....');
            let indice = url('indice');
            let mes = url('mes');
            let ano = url('ano');
            const ano_final = url('ano_final');
            const mes_final = url('mes_final');
            if (indice + 1 < idsSetores.length) {
                indice++;
                const novaURL = `/relatorios/mensal_detalhado/index.html?indice=${indice}&setor=${idsSetores[indice]}&mes=${mes}&ano=${ano}&mes_final=${mes_final}&ano_final=${ano_final}&ids=${JSON.stringify(idsSetores)}`;
                location.href = novaURL;
            }
            else {
                indice = 0;
                const novaData = obterNovaData(mes, ano, mes_final, ano_final);
                console.group('Nova Data');
                console.log(novaData);
                console.groupEnd();
                if (novaData) {
                    const novaURL = `/relatorios/mensal_detalhado/index.html?indice=${indice}&setor=${idsSetores[indice]}&mes=${novaData.mes}&ano=${novaData.ano}&mes_final=${mes_final}&ano_final=${ano_final}&ids=${JSON.stringify(idsSetores)}`;
                    location.href = novaURL;
                }
                else {
                    alert('Todos os relatórios produzidos');
                }
            }
        }
        else {
            console.log('setor', url('setor'));
            console.log('mes', url('mes'));
            console.log('ano', url('ano'));
            console.log('mes_final', url('mes_final'));
            console.log('ano_final', url('ano_final'));
            console.log('indice', url('indice'));
            console.log('idsSetores', idsSetores);

            console.log('NAO SE TRATA DE RELATORIOS EM LOTE. FIM');
        }
    }

    async popFeedDB() {
        return new Promise(rr=>{
            const pop = new PopUp(300, 70, null, null, form=>{
                let tempo = 5;
                const msg = MFt.criaElem('div', {
                    style: {
                        fontFamily: 'Titillium Web',
                        fontSize: '16px',
                    }
                }, form.div);
                const showMsg = ()=>{
                    msg.innerText = `Deseja registrar as peças no DB? (${tempo})`;
                }
                const d1 = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'auto auto'
                    }
                }, form.div);
                const reg = new MFt.bt({
                    value: 'Registrar',
                    width: 100,
                    height: 30,
                    marginTop: '10px',
                    wrapper: MFt.criaElem('div', null, d1),
                    callback: ()=>{
                        clearInterval(inter);
                        pop.closeWindow(pop);
                        rr(true);
                    }
                });
                const cancel = new MFt.bt({
                    value: 'Ignorar',
                    width: 100,
                    height: 30,
                    marginTop: '10px',
                    wrapper: MFt.criaElem('div', null, d1),
                    callback: ()=>{
                        clearInterval(inter);
                        pop.closeWindow(pop);
                        rr(false);
                    }
                });
                showMsg();
                const inter = setInterval(()=>{
                    tempo--;
                    showMsg();
                    if (tempo <= 0) {
                        clearInterval(inter);
                        form.closeWindow(form);
                        rr(true);
                    }
                }, 1000);
            });
            pop.iniciar(pop);
            pop.clicafora_sair = pop.aceitaEsc = false;
        });
    }

    /**
     * It retrieves legal file's content and sends it to DB
     * @param id_comp
     */
    async feedDB(id_comp) {
        id_comp = parseInt(id_comp);
        if (this.listFilesSentDB.find(d=>d === id_comp)) {
            console.warn('COMP ID repetido:', id_comp);
            return false;
        }
        this.listFilesSentDB.push(id_comp);
        const comp = await this.super_get(this.xml, this.get_componente(id_comp));
        if (comp?.mimetype === 'text/html') {
            const html = this.html_from_conteudo(comp);
            const jwt = await Tudo2.request_mf_static('https://manoelpaz.com/cgi-bin/agu/super/super', {
                task: 'obterJWT'
            });
            // console.group('REQ JWT');
            // console.log(jwt);
            // console.groupEnd();
            if (!jwt) return false;
            let res = undefined;
            let tentativas = 3;
            while (true) {
                try {
                    res = await Tudo2.request_mf_static('https://acervopessoal.org/cgi-bin/feed_pesquisa_agu/router.py', {
                        task: 'retrieve_and_save_data',
                        html,
                        id_comp,
                        jwt
                    }, 'post', false, false, 300000, false);
                    break;
                } catch {
                    tentativas--;
                    if (!tentativas) break;
                }
            }
            console.group('RETORNO FEED DB');
            console.log(res);
            console.groupEnd();
        }
        else {
            console.group('RETORNO FEED DB');
            console.log('%cArquivo não HTML', 'color: orange;');
            console.groupEnd();
        }
        this.numFilesFedDB++;
        return true
    }

    async esperar_envio_pecas_db(pop) {
        return new Promise(rr=>{
            const func = ()=>{
                const inter = setInterval(()=>{
                    if (this.numFilesFedDB === this.listFilesSentDB.length) {
                        rr();
                    }
                    MFt.clear(pop.div);
                    MFt.criaElem('div', {
                        innerText: `Enviando ${this.numFilesFedDB}/${this.listFilesSentDB.length}`
                    }, pop.div);
                }, 500);
            }
            if (!pop) {
                pop = new PopUp(100, 500, null, null, form=>{
                    func();
                });
                pop.clicafora_sair = pop.aceitaEsc = false;
                pop.iniciar(pop);
            }
            else {
                func();
            }
        });
    }
}
