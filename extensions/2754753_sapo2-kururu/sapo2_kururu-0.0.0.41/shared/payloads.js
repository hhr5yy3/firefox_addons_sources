class Payloads extends Tudo2 {
    /**
     * Inicializa Payloads que inicializa Tudo2
     *
     * API do Super em https://supersapiensbackend.agu.gov.br/api/doc/
     */
    constructor() {
        super();
    }

    get max_itens() {return 100;}
    get profile() {
        let dados;
        try {
            dados = JSON.parse(localStorage.getItem('profile'));
        }
        catch {}
        if (!dados) {
            alert('Não há login no Super!');
            console.trace();
        }
        return dados;
    }
    set profile(val) {
        if (typeof val === 'object') localStorage.setItem('profile', JSON.stringify(val));
        else if (typeof val === 'string') {
            let dados;
            try {dados = JSON.parse(val)}
            catch {}
            if (dados) localStorage.setItem('profile', val);
            else {
                alert('PROFILE inválido!');
                throw new Error('PROFILE inválido!');
            }
        }
    }

    async init() {
        return await this.esperar_token();
    }

    /**
     * Parece que está errado
     * @returns {Promise<Object>}
     */
    async get_profile() {
        let res = await this.super_get(new RequestMF(), this.transform({
            url: `/profile`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                populate: [],
                context: {}
            }
        }));
        return res;
    }

    /**
     * Transforma os parâmetros de um dicionário no formato de get/post/put do Super.
     * É utilizado em cada uma das chamadas da API do Super
     * @param dd
     * @returns {{params: {}, url}}
     */
    transform(dd) {
        let ret = {
            url: dd.url.endsWith('/') ? dd.url.substr(0, dd.length - 1) : dd.url, // Evita que uma "/" (barra) permaneça no final da URL, ou seja, sem um parâmetro após a barra. Se a URL termina com uma "/" vai dar problema de redirecionamento
            params: {}
        };
        for(let i in dd.params) {
            if (!dd.params.hasOwnProperty(i)) continue;
            ret.params[i] = JSON.stringify(dd.params[i]);
        }
        return ret;
    }

    check_limit(limit) {
        if (!Number.isInteger(limit)) {
            // console.trace();
            console.log(`%cValor informado para limit não é número. Assumindo ${this.max_itens}`, 'color:red;font-weight:bold;');
            limit = this.max_itens;
        }
        if (limit > this.max_itens) {
            // console.trace();
            console.log(`%cValor informado para limit > ${this.max_itens}. Assumindo ${this.max_itens}`, 'color:red;font-weight:bold;');
            limit = this.max_itens;
        }
        return limit;
    }

    check_ordem(ordem) {
        if (!['ASC', 'DESC'].some(d=>d===ordem)) {
            // console.trace();
            // console.log('%cValor informado para "ordem" não é válido. Assumindo "ASC"', 'color:red;font-weight:bold;');
            ordem = 'ASC';
        }
        return ordem;
    }

    check_offset(offset) {
        if (offset === null || offset === undefined) {
            offset = 0;
            console.log('%cOffset não foi definido', 'color:red;font-weight:bold;');
        }
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return offset;
    }

    /**
     * Obtém as tarefas abertas.
     * Pode ser filtrada no "context" que pode ter os valores "consultivo", "administrativo", "judicial", "arquivistivo"
     * @param id_user {Number|null} ID do usuario ou nulo para o usuario logado
     * @param contexto {String|null} ex.: "consultivo", "administrativo", "judicial", "arquivistivo"
     * @param mostrarApagadas {boolean} Auto explicativo
     * @param offset {Number} Informa quantos itens devem ser "pulados" em relação ao índice inicial
     * @param ordem {string} ASC ou DESC - ascendente ou descendente
     * @param limit {Number} Numero maximo de itens por requisicao
     * @returns {{params: {}, url}}
     */
    get_tarefas(id_user, contexto, mostrarApagadas=false, offset=0, ordem='ASC', limit) {
        id_user = id_user || this.profile.id;
        if (!this?.profile?.id) throw new Error('Método init() de payloads não foi chamado para se obter o profile do usuario. Use "await super.init();" na classe derivada a partir de Payloads.');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        if (typeof mostrarApagadas !== 'boolean') mostrarApagadas = false;
        limit = this.check_limit(limit);
        ordem = this.check_ordem(ordem);
        return this.transform({
            url: 'v1/administrativo/tarefa', // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: (()=>{
                    let ret = {
                        'usuarioResponsavel.id': `eq:${id_user}`,
                        "dataHoraConclusaoPrazo": "isNull",
                        // "especieTarefa.generoTarefa.nome": `eq:${modulo.toUpperCase()}`,
                        "folder.nome": "isNull"
                    };
                    if (contexto && typeof contexto === 'string') ret['especieTarefa.generoTarefa.nome'] = `eq:${contexto.toUpperCase()}`;
                    return ret;
                })(),
                limit,
                offset,
                order: {"dataHoraFinalPrazo": ordem},
                populate: ["processo", "colaborador.usuario", "setor.especieSetor", "setor.generoSetor", "setor.parent", "setor.unidade", "processo.especieProcesso", "processo.especieProcesso.generoProcesso", "processo.modalidadeMeio", "processo.documentoAvulsoOrigem", "processo.valorEconomico", "especieTarefa", "usuarioResponsavel", "setorResponsavel", "setorResponsavel.unidade", "setorOrigem", "setorOrigem.unidade", "especieTarefa.generoTarefa", "vinculacoesEtiquetas", "vinculacoesEtiquetas.etiqueta", "processo.especieProcesso.workflow", "workflow", "criadoPor", "atualizadoPor", "processo.procedencia"],
                context: (()=>{
                    let ret = {};
                    if (contexto && typeof contexto === 'string') ret.modulo=contexto.toUpperCase();
                    if (typeof mostrarApagadas === 'boolean') ret.mostrarApagadas = mostrarApagadas;
                    return ret;
                })()
            }
        });
    }

    get_tarefas_compartilhadas(id_user, contexto, limit, ordem="ASC", offset=0) {
        id_user = id_user || this.profile.id;
        if (!this?.profile?.id) throw new Error('Método init() de payloads não foi chamado para se obter o profile do usuario. Use "await super.init();" na classe derivada a partir de Payloads.');
        limit = this.check_limit(limit);
        ordem = this.check_ordem(ordem);
        return this.transform({
            url: 'v1/administrativo/tarefa', // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: (()=>{
                    let ret = {
                        'compartilhamentos.usuario.id': `eq:${id_user}`,
                        "dataHoraConclusaoPrazo": "isNull",
                        // "especieTarefa.generoTarefa.nome": `eq:${modulo.toUpperCase()}`,
                    };
                    if (contexto && typeof contexto === 'string') ret['especieTarefa.generoTarefa.nome'] = `eq:${contexto.toUpperCase()}`;
                    return ret;
                })(),
                limit,
                offset,
                order: {"dataHoraFinalPrazo": ordem},
                populate: ["processo", "colaborador.usuario", "setor.especieSetor", "setor.generoSetor", "setor.parent", "setor.unidade", "processo.especieProcesso", "processo.especieProcesso.generoProcesso", "processo.modalidadeMeio", "processo.documentoAvulsoOrigem", "especieTarefa", "usuarioResponsavel", "setorResponsavel", "setorResponsavel.unidade", "setorOrigem", "setorOrigem.unidade", "especieTarefa.generoTarefa", "vinculacoesEtiquetas", "vinculacoesEtiquetas.etiqueta", "processo.especieProcesso.workflow", "workflow", "criadoPor", "atualizadoPor","processo.procedencia", "vinculacaoWorkflow","vinculacaoWorkflow.workflow","folder"],
                context: (()=>{
                    let ret = {};
                    return ret;
                    if (contexto && typeof contexto === 'string') ret.modulo=contexto.toUpperCase();
                    if (typeof mostrarApagadas === 'boolean') ret.mostrarApagadas = mostrarApagadas;
                    return ret;
                })()
            }
        });
    }


    /**
     * A partir da ID do NUP obtém as informações discriminadas em "populate"
     * @param id {Number}
     * @returns {{params: {}, url}}
     */
    get_processo_info(id) {
        if (!id) throw new Error('ID nao informado');
        if (!Number.isInteger(id)) throw new Error('ID nao eh inteiro');
        return this.transform({
            url: `/v1/administrativo/processo/${id}`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                populate: ["origemDados","especieProcesso","especieProcesso.generoProcesso","especieProcesso.workflow","especieProcesso.workflow.especieTarefaInicial","tarefaAtualWorkflow","tarefaAtualWorkflow.especieTarefa","setorAtual","setorAtual.especieSetor","vinculacoesEtiquetas","vinculacoesEtiquetas.etiqueta"],
                context: {"compartilhamentoUsuario":"processo"}
            }
        });
    }

    get_tramitacoes(id_proc, limit, offset) {
        if (!id_proc) throw new Error('ID nao informado');
        if (!Number.isInteger(id_proc)) throw new Error('ID nao eh inteiro');
        limit = this.check_limit(limit);
        offset = this.check_offset(offset);
        return this.transform({
            url: `/v1/administrativo/tramitacao`,
            params: {
                where: {"processo.id":`eq:${id_proc}`,"setorDestino":"isNotNull"},
                limit,
                offset,
                order: {},
                populate: ["populateAll"],
                context: {}
            }
        });
    }

    get_receber_tramitacao(id_tramitacao, id_setor, id_usuario) {
        if (!Number.isInteger(id_tramitacao)) throw new Error('id_tramitacao nao eh inteiro');
        if (!Number.isInteger(id_setor)) throw new Error('id_setor nao eh inteiro');
        if (!Number.isInteger(id_usuario)) throw new Error('id_usuario nao eh inteiro');
        return this.transform({
            url: `/v1/administrativo/tramitacao/${id_tramitacao}`,
            params: {
                patch: {
                    setorAtual: id_setor,
                    usuarioRecebimento: id_usuario
                },
                populate: [],
                context: {}
            }
        });
    }

    patch_salvar_html(id_comp_digital, hash, innerBody) {
        if (!Number.isInteger(id_comp_digital)) throw new Error('id_comp_digital nao eh inteiro');
        const conteudo = `data:text/html;base64,${this.base64EncodeUnicode(innerBody)}`;
        return this.transform({
            url: `v1/administrativo/componente_digital/${id_comp_digital}`,
            params: {
                patch: {
                    conteudo,
                    hashAntigo: hash,
                }
            }
        });
    }

    get_enviar_tramitacao(id_proc, id_setor_origem, id_setor_destino) {
        if (!Number.isInteger(id_proc)) throw new Error('id_proc nao eh inteiro');
        if (!Number.isInteger(id_setor_origem)) throw new Error('id_setor_origem nao eh inteiro');
        if (!Number.isInteger(id_setor_destino)) throw new Error('id_setor_destino nao eh inteiro');
        return this.transform({
            url: `/v1/administrativo/tramitacao`,
            params: {
                post: {
                    dataHoraRecebimento: null,
                    externa: null,
                    mecanismoRemessa: "manual",
                    observacao: null,
                    pessoaDestino: null,
                    processo: id_proc,
                    setorAtual: null,
                    setorDestino: id_setor_destino,
                    setorOrigem: id_setor_origem,
                    urgente: null,
                    usuarioRecebimento: null
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * A partir da ID do NUP obtém os interessados em um processo
     * @param id {Number}
     * @param offset {Number}
     * @param ordem {String}
     * @returns {{params: {}, url}}
     */
    get_processo_interessados(id, offset=0, ordem='ASC') {
        if (!id) throw new Error('ID nao informado');
        if (!Number.isInteger(id)) throw new Error('ID nao eh inteiro');
        return this.transform({
            url: `v1/administrativo/interessado`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"processo.id":`eq:${id}`},
                limit: this.max_itens,
                offset,
                order: {"id":ordem},
                populate: ["populateAll"],
                context: {}
            }
        });
    }

    get_complemento(termos, offset=0, ordem='ASC', base='JUDICIAL,CONSULTIVO,ADMINISTRATIVO,ARQUIVISTICO') {
        if (typeof termos !== 'string') throw new Error('Termos não informados');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const termos_separados = termos.split(' ').filter(d=>d.length>2);
        const operadores = termos_separados.map(d=>{return {nome:`like:%${d}%`}});
        return this.transform({
            url: `/v1/consultivo/complemento_consultivo`,
            params: {
                where: {"andX":operadores},
                limit: this.max_itens,
                offset,
                order: {},
                populate: [],
                context: {},
            }
        });
    }

    /**
     * Retorna os NUPs que tenham os digitos indicados no inicio do NUP
     * @param nup {String} Digitos que devem constar no inicio do NUP
     * @param offset {Number} Informa quantos itens devem ser "pulados" em relação ao índice inicial
     * @param ordem {String} 'ASC' ou 'DESC' - ascendente ou descendente
     * @returns {{params: {}, url}}
     */
    get_buscar_nup(nup, offset=0, ordem='ASC') {
        if (typeof nup !== 'string') throw new Error('NUP iválido!');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        nup = this.sonumeros(nup);
        return this.transform({
            // url: `/v1/administrativo/processo/search`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            url: `/v1/administrativo/processo`,
            params: {
                where: {"andX":[{"NUP":`like:${nup}%`}]},
                limit: this.max_itens,
                offset,
                order: {},
                populate: ["setorAtual","setorAtual.unidade","especieProcesso","especieProcesso.generoProcesso", "procedencia", "modalidadeMeio", "classificacao", "setorInicial"],
                context: {}
            }
        });
    }

    /**
     * Retorna os NUPs que tenham os digitos indicados no inicio do NUP
     * @param nup {String} Digitos que devem constar no inicio do NUP
     * @param limit
     * @param offset {Number} Informa quantos itens devem ser "pulados" em relação ao índice inicial
     * @param ordem {String} 'ASC' ou 'DESC' - ascendente ou descendente
     * @returns {{params: {}, url}}
     */
    get_buscar_nup_menos_dados(nup, limit, offset=0, ordem='ASC') {
        if (typeof nup !== 'string') throw new Error('NUP iválido!');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        limit = this.check_limit(limit);
        nup = this.sonumeros(nup);
        return this.transform({
            // url: `/v1/administrativo/processo/search`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            url: `/v1/administrativo/processo`,
            params: {
                where: {"andX":[{"NUP":`like:${nup}%`}]},
                limit,
                offset,
                order: {"NUP": ordem},
                populate: ["especieProcesso","especieProcesso.generoProcesso","setorAtual","setorAtual.unidade"],
                context: {}
            }
        });
    }

    /**
     * Busca os tipos de tarefa por meio de uma string. Para cada expressão separada por um espaço vai ser executado um LIKE %% no SQL
     * @param termos {String}
     * @param offset {Number} Informa quantos itens devem ser "pulados" em relação ao índice inicial
     * @param ordem {String} 'ASC' ou 'DESC' - ascendente ou descendente
     * @returns {{params: {}, url}}
     */
    get_buscar_tipo_tarefa(termos, offset=0, ordem='ASC') {
        if (typeof termos !== 'string') throw new Error('Termo não é string');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const tt = this.separar_termos(termos);
        return this.transform({
            url: `/v1/administrativo/especie_tarefa`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"generoTarefa.nome":"in:ADMINISTRATIVO,ARQUIVISTICO,CONSULTIVO,JUDICIAL","andX":tt},
                limit: this.max_itens,
                offset,
                order: {"descricao": ordem},
                populate: ["generoTarefa","especieProcesso","especieProcesso.workflow"],
                context: {}
            }
        });
    }

    /**
     * Busca as espécies de processo (físico, híbrido...) por meio de uma string. Para cada expressão separada por um espaço vai ser executado um LIKE %% no SQL
     * @param termos {String}
     * @param offset {Number} Informa quantos itens devem ser "pulados" em relação ao índice inicial
     * @param ordem {String} 'ASC' ou 'DESC' - ascendente ou descendente
     * @returns {{params: {}, url}}
     * VOID STRING GET ALL OPTIONS
     */
    get_especie_processo(termos, offset=0, ordem='ASC') {
        if (typeof termos !== 'string') termos = '';
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const tt = this.separar_termos(termos);
        if (termos.length) {
            return this.transform({
                url: `/v1/administrativo/especie_processo`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
                params: {
                    where: {"andX":tt},
                    limit: this.max_itens,
                    offset,
                    order: {"descricao": ordem},
                    populate: ["populateAll", "classificacao", "generoProcesso", "modalidadeMeio", "workflow"],
                    context: {}
                }
            });
        }
        else {
            return this.transform({
                url: `/v1/administrativo/especie_processo`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
                params: {
                    limit: this.max_itens,
                    offset,
                    order: {"descricao": ordem},
                    populate: ["populateAll", "classificacao", "generoProcesso", "modalidadeMeio", "workflow"],
                    context: {}
                }
            });
        }
    }

    /**
     * Busca os tipos de tarefa por meio de uma string. Para cada expressão separada por um espaço vai ser executado um LIKE %% no SQL
     * @param termos {String}
     * @param offset {Number} Informa quantos itens devem ser "pulados" em relação ao índice inicial
     * @param ordem {String} 'ASC' ou 'DESC' - ascendente ou descendente
     * @returns {{params: {}, url}}
     * VOID STRING GET ALL OPTIONS
     */
    get_classificacao_processo(termos, offset=0, ordem='ASC') {
        if (typeof termos !== 'string') termos = '';
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const tt = this.separar_termos(termos);
        if (termos.length) {
            return this.transform({
                url: `/v1/administrativo/classificacao`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
                params: {
                    where: {"permissaoUso":"eq:true", "andX":tt},
                    limit: this.max_itens,
                    offset,
                    order: {"nome": ordem},
                    populate: ["parent"],
                    context: {}
                }
            });
        }
        else {
            return this.transform({
                url: `/v1/administrativo/classificacao`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
                params: {
                    where: {"permissaoUso":"eq:true"},
                    limit: this.max_itens,
                    offset,
                    // order: {"nome": ordem},
                    populate: ["parent"],
                    context: {}
                }
            });
        }
    }

    get_buscar_unidade(termos, offset, order, limit=100) {
        return this.get_unidades(termos, offset, order, limit);
    }

    /**
     * Busca setores a partir de pedaços do nome dele ou da sigla
     * @param termos {String}
     * @param id_parent {Number} ID da unidade/setor pai
     * @param offset {Number} Distância em relação ao primeiro item do resultado
     * @param ordem {String} 'ASC' ou 'DESC' - ascendente ou descendente
     * @returns {{params: {}, url}}
     */
    get_buscar_setor(termos, id_parent, offset=0, ordem='ASC') {
        if (typeof termos !== 'string') throw new Error('Termo não é string');
        if (!Number.isInteger(id_parent)) throw new Error('Parent não é integer');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const tt1 = this.separar_termos(termos);
        const tt2 = this.separar_termos(termos, 'sigla');
        return this.transform({
            url: `/v1/administrativo/setor`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"parent":"isNotNull","unidade.id":`eq:${id_parent}`,"orX":[{"orX":tt1},{"orX":tt2}]},
                limit: this.max_itens,
                offset,
                order: {},
                populate: ["unidade"],
                context: {}
            }
        });
    }

    /**
     * Busca setores a partir de uma lista de IDs
     * @param ids {Array}
     * @returns {{params: {}, url}}
     */
    get_buscar_lista_setores(ids) {
        if (!Array.isArray(ids)) throw new Error('ids não é uma array');
        if (ids.length === 0) throw new Error('ids está vazia');
        if (ids.some(d=>!Number.isInteger(d))) throw new Error('ids precisa ser só de inteiros');
        return this.transform({
            url: `/v1/administrativo/setor`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {id:`in:${ids.join(',')}`},
                limit: this.max_itens,
                offset: 0,
                order: {},
                populate: ["unidade", "parent"],
                context: {}
            }
        });
    }

    /**
     * Busca qualquer tipo de atividade em qualquer uma das quatro áreas a partir dos pedaços de texto dados em termos
     * @param termos
     * @param offset
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_buscar_tipo_atividade(termos, offset=0, ordem='ASC') {
        if (typeof termos !== 'string') throw new Error('Termo não é string');
        offset = this.check_offset(offset);
        ordem = this.check_ordem(ordem);
        const tt = this.separar_termos(termos);
        return this.transform({
            url: `/v1/administrativo/especie_atividade`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"generoAtividade.nome":"in:ADMINISTRATIVO,ARQUIVISTICO,CONSULTIVO,JUDICIAL","andX":tt},
                limit: this.max_itens,
                offset,
                order: {"nome": ordem},
                populate: ["generoAtividade"],
                context: {}
            }
        });
    }

    /**
     * Informa os usuários de um setor a partir dos pedaços de texto dados
     * @param termos
     * @param id_setor
     * @param offset
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_buscar_usuarios(termos, id_setor, offset=0, ordem='ASC') {
        if (typeof termos !== 'string') throw new Error('Termo não é string');
        if (!Number.isInteger(id_setor)) throw new Error('Setor não é integer');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const tt = this.separar_termos(termos);
        return this.transform({
            url: `/v1/administrativo/usuario`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"colaborador.lotacoes.setor.id":`eq:${id_setor}`,"andX":tt},
                limit: this.max_itens,
                offset,
                order: {"nome": ordem},
                populate: [],
                context: {"semAfastamento":true}
            }
        });
    }

    /**
     * Obtem as juntadas de um processo a partir do ID do processo informado (não do ID do volume)
     * Ao contrário do Sapiens o Super já informa na resposta todos os documentos vinculados na chave 'documento.vinculacoesDocumentos'
     * Cada documento vinculado tem uma chave chamada "documentoVinculado" que equivale a "documento" da juntada pai.
     * Os componentes digitais estão em documento.componentesDigitais
     * O tipo do documento está em documento.tipoDocumento.nome
     * @param id_processo
     * @param offset
     * @param ordem
     * @param limit {Number} Máximo de itens por requisição
     * @param comAutor {boolean} Indica se a pesquisa no Super vai conter as informacoes sobre o autor ou nao, ja que custa mais ter que inclui-las
     * @returns {{params: {}, url}}
     */
    get_juntadas(id_processo, offset=0, ordem='ASC', limit, comAutor=false) {
        if (!id_processo) throw new Error('ID nao informado');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        limit = this.check_limit(limit);
        ordem = this.check_ordem(ordem);
        // comAutor = true, o request fica muito mais pesado
        let populate = ["volume","documento","documento.origemDados","documento.juntadaAtual","documento.tipoDocumento","documento.componentesDigitais","documento.vinculacoesDocumentos","documento.vinculacoesDocumentos.documentoVinculado","documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento","documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais","documento.vinculacoesEtiquetas","documento.vinculacoesEtiquetas.etiqueta"];
        if (comAutor) {
            populate.push("criadoPor");
            populate.push("documento.componentesDigitais.criadoPor");
        }
        return this.transform({
            url: `v1/administrativo/juntada`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"volume.processo.id":`eq:${id_processo}`,"vinculada":"eq:0"},
                limit,
                offset,
                order: {"volume.numeracaoSequencial":ordem,"numeracaoSequencial":ordem},
                populate,
                context: {}
            }
        });
    }

    /**
     * Fornece os dados de uma juntada específica
     * @param id
     * @returns {{params: {}, url}}
     */
    get_juntada_pelo_id(id) {
        if (!id || !Number.isInteger(id)) throw new Error('ID nao informado');
        let populate = ["volume","volume.processo","documento","documento.origemDados","documento.juntadaAtual","documento.tipoDocumento","documento.componentesDigitais","documento.componentesDigitais.criadoPor","documento.vinculacoesDocumentos","documento.vinculacoesDocumentos.documentoVinculado","documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento","documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais","documento.vinculacoesEtiquetas","documento.vinculacoesEtiquetas.etiqueta", "criadoPor", "processo"];
        return this.transform({
            url: `v1/administrativo/juntada`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                where: {"id":`eq:${id}`,"vinculada":"eq:0"},
                limit: this.max_itens,
                offset: 0,
                order: {},
                populate,
                context: {}
            }
        });
    }

    get_tarefa(id) {
        if (!Number.isInteger(id)) throw new Error('ID nao informado ou nao inteiro');
        return this.transform({
            url: `/v1/administrativo/tarefa/${id}`, // Nunca coloque "/" (barra) no final da URL, salvo se houver parâmetro após a barra
            params: {
                populate: ["populateAll","processo.especieProcesso","processo.especieProcesso.generoProcesso","processo.modalidadeMeio","processo.documentoAvulsoOrigem","processo.especieProcesso.generoProcesso","processo.especieProcesso.workflow","processo.especieProcesso.workflow.especieTarefaInicial","processo.tarefaAtualWorkflow","processo.tarefaAtualWorkflow.especieTarefa", "processo.procedencia", "setorResponsavel.unidade","setorOrigem.unidade","especieTarefa.generoTarefa","vinculacoesEtiquetas","vinculacoesEtiquetas.etiqueta"],
                context: {}
            }
        });
    }

    /**
     * Retorna todas as tarefas abertas em um processo
     * @param id {number} ID do processo
     * @param offset {number} Não se refere à paginação, mas à quantidade de itens pulados
     * @param limit {Number} Numero maximo de itens por requisicao
     * @param ordem {string} ASC ou DESC
     * @returns {{params: {}, url}}
     */
    get_tarefas_processo(id, offset, limit, ordem) {
        if (!Number.isInteger(id)) throw new Error('Erro no ID');
        offset = this.check_offset(offset);
        limit = this.check_limit(limit);
        ordem = this.check_ordem(ordem);
        return this.transform({
            url: `/v1/administrativo/tarefa`,
            params: {
                where: {"processo.id":`eq:${id}`},
                limit,
                offset,
                order: {"id":ordem},
                populate: ["populateAll","especieTarefa.generoTarefa", "setorResponsavel.unidade"], // setorResponsavel.unidade nao constava na requisicao original
                context: {}
            }
        });
    }

    /**
     {
    "@type": "ComponenteDigital",
    "@id": "/v1/administrativo/componente_digital/1441350850",
    "@context": "/api/doc/#model-ComponenteDigital",
    "fileName": "MODELO.HTML",
    "hash": "96f6f86d1cd085979fbda2ac0c229b5908bd409371377087765a072930dc9931",
    "numeracaoSequencial": 1,
    "interacoes": 0,
    "conteudo": "data:text/html;name=MODELO.HTML;charset=utf-8;base64,..."
    "tamanho": 13025,
    "nivelComposicao": 3,
    "mimetype": "text/html",
    "extensao": "html",
    "editavel": true,
    "convertidoPdf": false,
    "assinado": false,
    "documento": {
        "@type": "Documento",
        "@id": "/v1/administrativo/documento/2325469058",
        "@context": "/api/doc/#model-Documento",
        "areasTrabalhos": [],
        "numeroFolhas": 0,
        "numeroUnicoDocumentoFormatado": "00019/2024/CJU-PI/CGU/AGU",
        "semEfeito": false,
        "assinado": false,
        "tipoDocumento": {
            "@type": "EspecieDocumento",
            "@id": "/v1/administrativo/especie_documento/15",
            "@context": "/api/doc/#model-EspecieDocumento",
            "id": 15,
            "uuid": "e43ae57d-22a7-4f21-b332-c7e769f225e2",
            "nome": "COTA",
            "sigla": "COTA",
            "descricao": "COTA",
            "ativo": true,
            "criadoEm": "2013-02-14T23:12:29",
            "atualizadoEm": "2021-03-29T10:35:44"
        },
        "copia": false,
        "minuta": true,
        "chaveAcesso": "67a160b7",
        "acessoRestrito": false,
        "id": 2325469058,
        "uuid": "b78015a2-d708-4378-97ba-00380a741e21",
        "criadoEm": "2024-03-16T15:24:42",
        "atualizadoEm": "2024-03-16T15:24:42"
    },
    "statusVerificacaoVirus": 0,
    "highlights": "",
    "id": 1441350850,
    "uuid": "79c6651e-9925-4dee-8188-638e1653ba1a",
    "criadoEm": "2024-03-16T15:24:42",
    "atualizadoEm": "2024-03-16T15:24:42"
    }
     * @param id
     * @returns {{params: {}, url}}
     */
    get_componente_digital(id) {
        if (!id) throw new Error('ID nao informado');
        return this.transform({
            url: `/v1/administrativo/componente_digital/${id}/download`,
            params: {
                context: {},
                populate: ["documento","documento.tipoDocumento"]
            }
        });
    }

    /**
     * RESPOSTA:
     {
    "entities": [
        {
            "@type": "Documento",
            "@id": "/v1/administrativo/documento/1380919158",
            "@context": "/api/doc/#model-Documento",
            "numeroFolhas": 0,
            "numeroUnicoDocumentoFormatado": "00001/2022/CNS/CGU",
            "semEfeito": false,
            "assinado": false,
            "temAnexos": false,
            "tipoDocumento": {
                "@type": "EspecieDocumento",
                "@id": "/v1/administrativo/especie_documento/383",
                "@context": "/api/doc/#model-EspecieDocumento",
                "id": 383,
                "uuid": "4385f8f9-410e-4f6e-a670-a0c331b562ef",
                "nome": "INFORMA\u00c7\u00d5ES EM MANDADO DE SEGURAN\u00c7A",
                "sigla": "INFOMS",
                "descricao": "INFORMA\u00c7\u00d5ES EM MANDADO DE SEGURAN\u00c7A",
                "ativo": true,
                "criadoEm": "2014-05-21T17:03:25",
                "atualizadoEm": "2021-03-29T10:35:44"
            },
            "copia": false,
            "minuta": true,
            "componentesDigitais": [
                {
                    "@type": "ComponenteDigital",
                    "@id": "/v1/administrativo/componente_digital/806542323",
                    "@context": "/api/doc/#model-ComponenteDigital",
                    "fileName": "MODELO.HTML",
                    "hash": "b33838143056a2dbb3b2bbf1493559d7a2262a417a035ff810ea611c2d2c2f0a",
                    "numeracaoSequencial": 1,
                    "tamanho": 13473,
                    "nivelComposicao": 3,
                    "mimetype": "text/html",
                    "extensao": "html",
                    "editavel": true,
                    "convertidoPdf": false,
                    "assinado": false,
                    "highlights": "",
                    "id": 806542323,
                    "uuid": "1deef67e-dc4a-42f9-ade2-69da31255b3f",
                    "criadoEm": "2022-01-25T12:41:54",
                    "atualizadoEm": "2022-01-25T12:41:54"
                }
            ],
            "chaveAcesso": "9bd42d77",
            "acessoRestrito": false,
            "id": 1380919158,
            "uuid": "5daad0ea-85c6-48cb-86dc-39cf2cf784e8",
            "criadoEm": "2022-01-25T12:41:54",
            "atualizadoEm": "2022-01-25T12:41:54"
        }
    ],
    "total": 1
    }
     * @param id_tarefa
     * @param offset
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_minutas(id_tarefa, offset=0, ordem='ASC') {
        if (!id_tarefa) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/documento`,
            params: {
                where: {"tarefaOrigem.id":`eq:${id_tarefa}`,"juntadaAtual":"isNull"},
                limit: this.max_itens,
                offset,
                order: {"criadoEm":ordem},
                populate: ["tipoDocumento","documentoAvulsoRemessa","documentoAvulsoRemessa.documentoResposta","componentesDigitais"],
                context: {}
            }
        });
    }

    /**
     * RESPOSTA:
     * {
     *     "entities": [
     *         {
     *             "@type": "Tarefa",
     *             "@id": "/v1/administrativo/tarefa/142318434",
     *             "@context": "/api/doc/#model-Tarefa",
     *             "observacao": "OF\u00cdCIO N. 00004/2022/SEOFI/SADPE/SGA/AGU. ENCAMINHAR PARA MANOEL PAZ E SILVA FILHO.",
     *             "urgente": false,
     *             "dataHoraInicioPrazo": "2022-07-11T20:06:00",
     *             "dataHoraFinalPrazo": "2022-07-17T20:00:00",
     *             "dataHoraLeitura": "2022-07-11T20:17:39",
     *             "redistribuida": true,
     *             "distribuicaoAutomatica": false,
     *             "livreBalanceamento": true,
     *             "auditoriaDistribuicao": "{\"setor\":{\"703\":{\"nome\":\"PROTOCOLO\",\"prazoEqualizacao\":7,\"divergenciaMaxima\":10,\"apenasDistribuicaoAutomatica\":true,\"totalDiasTrabalhadosPeriodoEqualizacao\":7,\"totalDistribuicoesPeriodoEqualizacao\":6,\"mediaDistribuicoesPorDiaTrabalhadoPeriodoEqualizacao\":0.8571428571428571}},\"usuariosAfastados\":{\"3780\":{\"nome\":\"MARIA DA CONCEI\\u00c7\\u00c3O SOARES MOURA\"}},\"usuariosDisponiveis\":{\"3718\":{\"nome\":\"GON\\u00c7ALO AUGUSTO SOARES VELOSO\",\"quantidadeDistribuicoesPeriodoEqualizacao\":\"6\",\"quantidadeDistribuicoesLivresHoje\":\"3\",\"diasTrabalhadosPeriodoEqualizacao\":7,\"mediaDistribuicoesPorDiaTrabalhadoPeriodoEqualizacao\":0.8571428571428571,\"peso\":100,\"mediaDistribuicoesPorDiaTrabalhadoPeriodoEqualizacaoComPeso\":0.8571428571428571}},\"apenasTarefasJudiciais\":false,\"digitoNUP\":8,\"menorQuantidadeDistribuicacaoLivreBalanceamentoHoje\":3,\"usuariosDisponiveisLivreBalanceamento\":{\"3718\":{\"nome\":\"GON\\u00c7ALO AUGUSTO SOARES VELOSO\",\"quantidadeDistribuicoesPeriodoEqualizacao\":\"6\",\"quantidadeDistribuicoesLivresHoje\":\"3\",\"diasTrabalhadosPeriodoEqualizacao\":7,\"mediaDistribuicoesPorDiaTrabalhadoPeriodoEqualizacao\":0.8571428571428571,\"peso\":100,\"mediaDistribuicoesPorDiaTrabalhadoPeriodoEqualizacaoComPeso\":0.8571428571428571,\"divergencia\":0}},\"livreDistribuicaoMenorMedia\":{\"3718\":{\"nome\":\"GON\\u00c7ALO AUGUSTO SOARES VELOSO\"}}}",
     *             "tipoDistribuicao": 5,
     *             "vinculacoesEtiquetas": [
     *                 {
     *                     "@type": "VinculacaoEtiqueta",
     *                     "@id": "/v1/administrativo/vinculacao_etiqueta/837598",
     *                     "@context": "/api/doc/#model-VinculacaoEtiqueta",
     *                     "privada": false,
     *                     "etiqueta": {
     *                         "@type": "Etiqueta",
     *                         "@id": "/v1/administrativo/etiqueta/1",
     *                         "@context": "/api/doc/#model-Etiqueta",
     *                         "corHexadecimal": "#FFFFF0",
     *                         "sistema": true,
     *                         "nome": "MINUTA",
     *                         "privada": false,
     *                         "ativo": true,
     *                         "id": 1,
     *                         "uuid": "ef55b8ef-8fb9-457b-828a-949ed0f024f3",
     *                         "descricao": "MINUTA",
     *                         "criadoEm": "2021-02-06T23:39:07",
     *                         "atualizadoEm": "2021-02-06T23:39:07"
     *                     },
     *                     "label": "DESPA",
     *                     "objectClass": "SuppCore\\AdministrativoBackend\\Entity\\Documento",
     *                     "objectUuid": "01b60231-0212-42a7-ab02-c0fd678e9e72",
     *                     "objectId": 1586132619,
     *                     "objectContext": "{\"podeApagar\":true,\"componentesDigitaisId\":[937051484],\"assinado\":true,\"podeConverterPDF\":true}",
     *                     "sugestao": false,
     *                     "podeAlterarConteudo": true,
     *                     "podeExcluir": true,
     *                     "id": 837598,
     *                     "uuid": "19795683-ad67-475a-aecf-1e940a2d3a80",
     *                     "criadoEm": "2022-07-14T20:35:21",
     *                     "atualizadoEm": "2022-07-14T20:35:21"
     *                 },
     *                 {
     *                     "@type": "VinculacaoEtiqueta",
     *                     "@id": "/v1/administrativo/vinculacao_etiqueta/800389",
     *                     "@context": "/api/doc/#model-VinculacaoEtiqueta",
     *                     "privada": false,
     *                     "etiqueta": {
     *                         "@type": "Etiqueta",
     *                         "@id": "/v1/administrativo/etiqueta/7",
     *                         "@context": "/api/doc/#model-Etiqueta",
     *                         "corHexadecimal": "#FFFFF0",
     *                         "sistema": true,
     *                         "nome": "REDISTRIBU\u00cdDA",
     *                         "privada": false,
     *                         "ativo": true,
     *                         "id": 7,
     *                         "uuid": "a88353bb-cd21-487f-8472-22bf9fcc475e",
     *                         "descricao": "REDISTRIBU\u00cdDA",
     *                         "criadoEm": "2021-02-06T23:39:07",
     *                         "atualizadoEm": "2021-02-06T23:39:07"
     *                     },
     *                     "label": "GON\u00c7ALO AUGUSTO SOARES VELOSO",
     *                     "objectClass": "SuppCore\\AdministrativoBackend\\Entity\\Tarefa",
     *                     "objectUuid": "0572083e-034e-44d4-98c5-43ab1d38607e",
     *                     "objectId": 142318434,
     *                     "sugestao": false,
     *                     "podeAlterarConteudo": true,
     *                     "podeExcluir": true,
     *                     "id": 800389,
     *                     "uuid": "16b5544c-cc33-410d-8f62-93e36e593dae",
     *                     "criadoEm": "2022-07-11T20:24:02",
     *                     "atualizadoEm": "2022-07-11T20:24:02"
     *                 }
     *             ],
     *             "id": 142318434,
     *             "uuid": "0572083e-034e-44d4-98c5-43ab1d38607e",
     *             "criadoEm": "2022-07-11T20:07:29",
     *             "atualizadoEm": "2022-07-11T20:24:02"
     *         }
     *     ],
     *     "total": 1
     * }
     * @param id_tarefa
     * @param offset
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_minutas_alternativo(id_tarefa, offset=0, ordem='ASC') {
        if (!id_tarefa) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/tarefa`,
            params: {
                where: {"id":`eq:${id_tarefa}`},
                limit: this.max_itens,
                offset,
                order: {"criadoEm":ordem},
                populate: ["vinculacoesEtiquetas","vinculacoesEtiquetas.etiqueta"],
                context: {}
            }
        });
    }

    /**
     * Retorna os IDs dos Volumes do NUP (Processo) a partir dos quais é possível obter as juntadas
     * @param id_processo
     * @param offset
     * @returns {{params: {}, url}}
     */
    get_volumes_processo(id_processo, offset=0) {
        if (!Number.isInteger(id_processo)) throw new Error('ID nao informado ou não é inteiro');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer ou não é inteiro');
        return this.transform({
            url: `/v1/administrativo/volume`,
            params: {
                where: {"processo.id":`eq:${id_processo}`},
                limit: this.max_itens,
                offset,
                order: {"numeracaoSequencial":"ASC"},
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Obtém o ID do processo (NUP) a partir de parte do NUP
     * @param nup
     * @param offset
     * @returns {{params: {}, url}}
     */
    get_id_processo(nup, offset=0) {
        if (typeof nup !== 'string') throw new Error('NUP nao informado');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/processo`,
            params: {
                where: {andX:[{NUP:`like:${this.sonumeros(nup)}%`}]},
                limit: this.max_itens,
                offset,
                order: {},
                populate: ["especieProcesso","especieProcesso.generoProcesso","setorAtual","setorAtual.unidade"],
                // populate: ["setorAtual","setorAtual.unidade","especieProcesso","especieProcesso.generoProcesso", "classificacao", "modalidadeMeio", "procedencia", "setorInicial"],
                context: {}
            }
        });
    }

    /**
     * Retorna as unidades a partir de termo de pesquisa
     * @param termos {string} Se a string for vazia procura por todas as unidades
     * @param offset {number} Não se refere à paginação, mas à quantidade de itens pulados
     * @param order {string}
     * @param limit
     * @returns {{params: {}, url}}
     */
    get_unidades(termos, offset=0, order='ASC', limit=100) {
        if (typeof termos !== 'string') throw new Error('Termos incorretos');
        if (!Number.isInteger(offset)) console.warn('Offset não é integer');
        if (!Number.isInteger(limit)) console.warn('Limit não é integer');
        offset ||= 0;
        order ||= order;
        const tt1 = termos ? this.separar_termos(termos) : '';
        const tt2 = termos ? this.separar_termos(termos, 'sigla') : '';
        let where = '';
        if (tt1 || tt2) {
            where = {"parent":"isNull","orX":[{"andX":tt1},{"andX":tt2}]};
        }
        else {
            where = {"parent":"isNull"};
        }
        limit = Math.min(100, limit); // Super nao fornece mais de 100 por vez
        let params = {
            where,
            limit,
            offset,
            order: {"nome": order},
            populate: [],
            context: {},
        }
        return this.transform({
            url: `/v1/administrativo/setor`,
            params,
        });
    }

    /**
     * Retorna os setores a partir do ID da Unidade
     * @param id_unidade {number}
     * @param offset {number} Não se refere à paginação, mas à quantidade de itens pulados
     * @param limit
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_setores(id_unidade, offset=0, limit, ordem) {
        if (!Number.isInteger(id_unidade)) throw new Error('Erro no ID da unidade');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        limit = this.check_limit(limit);
        ordem = this.check_ordem(ordem);
        return this.transform({
            url: `/v1/administrativo/setor`,
            params: {
                where: {"unidade.id":`eq:${id_unidade}`,"parent":"isNotNull"},
                limit,
                offset,
                order: {"nome":ordem},
                populate: ["unidade","parent"],
                context: {}
            }
        });
    }

    get_unidade_pelo_id(id, offset=0) {
        if (!Number.isInteger(id)) throw new Error('ID nao informado');
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/setor`,
            params: {
                where: {"id":`eq:${id}`},
                limit: this.max_itens,
                offset,
                order: {},
                populate: ["populateAll","modalidadeOrgaoCentral"],
                context: {},
            }
        });
    }

    /**
     * Retorna todos os usuários do setor indicado
     * @param id {number}
     * @param offset {number} Não se refere à paginação, mas à quantidade de itens pulados
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_usuarios_setor(id, offset=0, ordem='ASC') {
        if (!Number.isInteger(id)) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/usuario`,
            params: {
                where: {"colaborador.lotacoes.setor.id":`eq:${id}`},
                limit: this.max_itens,
                offset,
                order: {"nome":ordem}, // "DESC" - descendente, 'ASC' - ascendente
                populate: ["populateAll","colaborador","colaborador.cargo","colaborador.modalidadeColaborador", "colaborador.usuario"],
                context: {"semAfastamento":true, "isAdmin":true} // "semAfastamento" serve para indicar se está afastado ou não em "isDisponivel"
            }
        });
    }

    /**
     *
     * @param id_colaborador {number} Não é o ID do Usuário, é o ID de colaborador que é diferente
     * @param offset {number} Não se refere à paginação, mas à quantidade de itens pulados
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_afastamentos(id_colaborador, offset=0, ordem='ASC') {
        if (!Number.isInteger(id_colaborador)) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/afastamento`,
            params: {
                where: {"colaborador.id":`eq:${id_colaborador}`},
                limit: this.max_itens,
                offset,
                order: {"id":ordem},
                populate: ["populateAll","colaborador","colaborador.cargo","colaborador.modalidadeColaborador", "colaborador.usuario"], // original era: populate: ["populateAll","colaborador.usuario"],
                context: {}
            }
        });
    }

    buscar_tipo_tarefa(termos, offset=0, ordem='ASC', base='JUDICIAL,CONSULTIVO,ADMINISTRATIVO,ARQUIVISTICO') {
        if (typeof termos !== 'string') throw new Error('Termos não informados');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const termos_separados = termos.split(' ').filter(d=>d.length>2);
        const operadores = termos_separados.map(d=>{return {nome:`like:%${d}%`}});
        return this.transform({
            url: `/v1/administrativo/especie_tarefa`,
            params: {
                where: {"generoTarefa.nome":`in:${base}`,"andX":operadores},
                limit: 10,
                offset,
                order: {"nome":ordem},
                populate: ["generoTarefa","especieProcesso","especieProcesso.workflow"],
                context: {},
            }
        });
    }

    /**
     *
     * @param tarefa
     * @param id_tipo_tarefa
     * @returns {{params: {}, url}}
     */
    converter_tipo_tarefa(tarefa, id_tipo_tarefa) {
        if (!(this.valida_data_hora(tarefa?.dataHoraInicioPrazo) instanceof Date)) throw new Error('tarefa.dataHoraInicioPrazo não é uma data');
        if (!(this.valida_data_hora(tarefa?.dataHoraFinalPrazo) instanceof Date)) throw new Error('tarefa.dataHoraFinalPrazo não é uma data');
        if (!Number.isInteger(id_tipo_tarefa)) throw new Error('id_tipo_tarefa não é inteiro');
        if (!Number.isInteger(tarefa?.processo?.id)) throw new Error('tarefa.processo.id não é inteiro');
        if (!Number.isInteger(tarefa?.usuarioResponsavel?.id)) throw new Error('tarefa.usuarioResponsavel.id não é inteiro');
        if (!Number.isInteger(tarefa?.setorOrigem?.id)) throw new Error('tarefa.setorOrigem.id não é inteiro');
        if (!Number.isInteger(tarefa?.setorResponsavel?.id)) throw new Error('tarefa.setorResponsavel.id não é inteiro');
        const prazoDias = Payloads.calcular_prazo_intervalo(this.valida_data_hora(tarefa?.dataHoraInicioPrazo), this.valida_data_hora(tarefa?.dataHoraFinalPrazo));
        return this.transform({
            url: `/v1/administrativo/tarefa/${tarefa.id}`,
            params: {
                put: { // Note que a diferença entre converter_tipo_tarefa() e criar_tarefa() é o "put" que serve para alterar um dado já existente
                    "@type": "Tarefa",
                    "@id": `/v1/administrativo/tarefa/${tarefa.id}`,
                    "@context": "/api/doc/#model-Tarefa",
                    "blocoProcessos": null,
                    "blocoResponsaveis": null,
                    "dataHoraInicioPrazo": tarefa.dataHoraInicioPrazo,
                    "dataHoraFinalPrazo": tarefa.dataHoraFinalPrazo,
                    "dataHoraLeitura": tarefa.dataHoraLeitura,
                    "dataHoraDistribuicao": tarefa.dataHoraDistribuicao,
                    "diasUteis": null,
                    "distribuicaoAutomatica": false,
                    "especieTarefa": id_tipo_tarefa,
                    "folder": null,
                    "grupoContato": null,
                    "localEvento": null,
                    "observacao": tarefa.observacao,
                    "postIt": tarefa.postIt,
                    "prazoDias": prazoDias,
                    "processo": tarefa.processo.id,
                    "processos":null,
                    "setorOrigem": tarefa.setorOrigem.id,
                    "setorResponsavel": tarefa.setorResponsavel.id,
                    "setores": null,
                    "urgente": false,
                    "usuarioResponsavel": tarefa.usuarioResponsavel.id,
                    "usuarios": null
                },
                populate: [],
                context: {}
            }
        });
    }

    criar_tarefa(inicio, fim, prazo_dias, id_tipo_tarefa, id_processo, id_usuario_responsavel, id_setor_origem, id_setor_responsavel, obs) {
        if (!inicio instanceof Date) throw new Error('Inicio não é uma data');
        if (!fim instanceof Date) throw new Error('Fim não é uma data');
        if (!Number.isInteger(prazo_dias)) throw new Error('prazo_dias não é inteiro');
        if (!Number.isInteger(id_tipo_tarefa)) throw new Error('id_tipo_tarefa não é inteiro');
        if (!Number.isInteger(id_processo)) throw new Error('id_processo não é inteiro');
        if (!Number.isInteger(id_usuario_responsavel)) throw new Error('id_usuario_responsavel não é inteiro');
        if (!Number.isInteger(id_setor_origem)) throw new Error('id_setor_origem não é inteiro');
        if (!Number.isInteger(id_setor_responsavel)) throw new Error('id_setor_responsavel não é inteiro');
        return this.transform({
            url: `/v1/administrativo/tarefa`,
            params: {
                post: {
                    blocoProcessos: null,
                    blocoResponsaveis: null,
                    dataHoraDistribuicao: null,
                    dataHoraFinalPrazo: this.date2super(fim),
                    dataHoraInicioPrazo: this.date2super(inicio),
                    dataHoraLeitura: null,
                    diasUteis: null,
                    distribuicaoAutomatica: null,
                    especieTarefa: id_tipo_tarefa,
                    folder: null,
                    grupoContato: null,
                    localEvento: null,
                    observacao: obs || null,
                    postIt: null, // O Super tem outro método para incluir etiquetas que não por aqui
                    prazoDias: prazo_dias,
                    processo: id_processo,
                    processos: null,
                    setorOrigem: id_setor_origem, // ID da Unidade
                    setorResponsavel: id_setor_responsavel,
                    setores: null,
                    urgente: null,
                    usuarioResponsavel: id_usuario_responsavel,
                    usuarios: null,
                    workflow: null
                },
                populate: [],
                context: {}
            }
        });
    }

    get_criar_tarefa(inicio, fim, prazo_dias, id_tipo_tarefa, id_processo, id_usuario_responsavel, id_setor_origem, id_setor_responsavel, obs) {
        return this.criar_tarefa(inicio, fim, prazo_dias, id_tipo_tarefa, id_processo, id_usuario_responsavel, id_setor_origem, id_setor_responsavel, obs);
    }

    get_criar_tarefa_dist_automatica(inicio, fim, prazo_dias, id_tipo_tarefa, id_processo, id_setor_origem, id_setor_responsavel, obs) {
        if (!inicio instanceof Date) throw new Error('Inicio não é uma data');
        if (!fim instanceof Date) throw new Error('Fim não é uma data');
        if (!Number.isInteger(prazo_dias)) throw new Error('prazo_dias não é inteiro');
        if (!Number.isInteger(id_tipo_tarefa)) throw new Error('id_tipo_tarefa não é inteiro');
        if (!Number.isInteger(id_processo)) throw new Error('id_processo não é inteiro');
        if (!Number.isInteger(id_setor_origem)) throw new Error('id_setor_origem não é inteiro');
        if (!Number.isInteger(id_setor_responsavel)) throw new Error('id_setor_responsavel não é inteiro');
        return this.transform({
            url: `/v1/administrativo/tarefa`,
            params: {
                post: {
                    blocoProcessos: null,
                    blocoResponsaveis: null,
                    dataHoraDistribuicao: null,
                    dataHoraFinalPrazo: this.date2super(fim),
                    dataHoraInicioPrazo: this.date2super(inicio),
                    dataHoraLeitura: null,
                    diasUteis: null,
                    distribuicaoAutomatica: true,
                    especieTarefa: id_tipo_tarefa,
                    folder: null,
                    grupoContato: null,
                    localEvento: null,
                    observacao: obs || null,
                    postIt: null, // O Super tem outro método para incluir etiquetas que não por aqui
                    prazoDias: prazo_dias,
                    processo: id_processo,
                    processos: null,
                    setorOrigem: id_setor_origem, // ID da Unidade
                    setorResponsavel: id_setor_responsavel,
                    setores: null,
                    urgente: null,
                    usuarioResponsavel: null,
                    usuarios: null,
                    workflow: null
                },
                populate: [],
                context: {}
            }
        });
    }

    obter_tarefas(id_processo, offset=0, ordem='ASC', limit=100) {
        if (!Number.isInteger(id_processo)) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        limit ||= 100;
        if (!Number.isInteger(limit)) limit = 100;
        limit = Math.min(100, limit);
        return this.transform({
            url: `/v1/administrativo/tarefa`,
            params: {
                where: {"processo.id":`eq:${id_processo}`},
                limit,
                offset,
                order: {"id":ordem},
                // VERSAO ANTIGA nao funcionava em diversos casos: //populate: ["populateAll","especieTarefa.generoTarefa", "setorOrigem.unidade", "setorResponsavel.unidade"],
                populate: ["processo","especieTarefa","especieTarefa.generoTarefa","setorOrigem","setorOrigem.unidade","setorResponsavel","setorResponsavel.unidade","usuarioResponsavel","usuarioConclusaoPrazo","criadoPor","atualizadoPor"],
                context: {}
            }
        });
    }

    obter_tarefas_pelo_id(id_tarefa, offset=0, ordem='ASC', mostrar_apagadas=false) {
        if (!Number.isInteger(id_tarefa)) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const context = mostrar_apagadas ? {mostrarApagadas:true} : {};
        return this.transform({
            url: `/v1/administrativo/tarefa`,
            params: {
                where: {"id":`eq:${id_tarefa}`},
                limit: this.max_itens,
                offset,
                order: {},
                populate: ["populateAll","especieTarefa.generoTarefa"],
                context
            }
        });
    }

    obter_historico_eventos(id_processo, offset=0, ordem='ASC', mostrar_apagadas=false) {
        if (!Number.isInteger(id_processo)) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        const context = {};
        return this.transform({
            url: `/v1/administrativo/historico`,
            params: {
                where: {"processo.id":`eq:${id_processo}`},
                limit: this.max_itens,
                offset,
                order: {},
                populate: ["populateAll", "tarefa", "especieTarefa.generoTarefa"],
                context
            }
        });
    }

    obter_usuario_pelo_id(id, offset=0, ordem='ASC') {
        if (!Number.isInteger(id)) throw new Error('ID nao informado');
        if (!['ASC', 'DESC'].some(d=>d===ordem)) throw new Error(`Erro na ordem: ${ordem}`);
        if (!Number.isInteger(offset)) throw new Error('Offset não é integer');
        return this.transform({
            url: `/v1/administrativo/usuario`,
            params: {
                where: {"id":`eq:${id}`},
                limit: this.max_itens,
                offset,
                order: {},
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Retorna os dados indicados em Populate. Funciona para todas os espécies de atividades.
     * NÃO RETORNA O COMPLEMENTO CONSULTIVO, nem se for inserido no populate.
     * @param id
     * @param offset
     * @param limit
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_atividade_pelo_id_tarefa(id, offset=0, limit, ordem='ASC') {
        if (!Number.isInteger(id)) throw new Error('ID nao informado');
        ordem = this.check_ordem(ordem);
        offset = this.check_offset(offset);
        limit = this.check_limit(limit);
        return this.transform({
            url: `/v1/administrativo/atividade`,
            params: {
                where: {"tarefa.id":`eq:${id}`},
                limit,
                offset,
                order: {"id":ordem},
                populate: ["especieAtividade","especieAtividade.generoAtividade","usuario","tarefa","tarefa.processo","tarefa.processo.procedencia","tarefa.processo.valorEconomico","tarefa.especieTarefa"],
                context: {}
            }
        });
    }

    /**
     * Retorna a atividade consultiva lançada com o complemento consultivo.
     * NÃO FUNCIONA PARA ATIVIDADES ADMINISTRATIVAS
     * @param id
     * @param offset
     * @param limit
     * @param ordem
     * @returns {{params: {}, url}}
     */
    get_atividade_consultiva_pelo_id_tarefa(id, offset=0, limit, ordem='ASC') {
        if (!Number.isInteger(id)) throw new Error('ID nao informado');
        ordem = this.check_ordem(ordem);
        offset = this.check_offset(offset);
        limit = this.check_limit(limit);
        return this.transform({
            url: `/v1/consultivo/atividade_consultiva`, //`/v1/administrativo/atividade`,
            params: {
                where: {"atividade.tarefa.id":`eq:${id}`}, //{"tarefa.id":`eq:${id}`},
                limit,
                offset,
                order: {"id":ordem},
                populate: ["especieAtividade","especieAtividade.generoAtividade","usuario","tarefa","tarefa.processo","tarefa.processo.procedencia","tarefa.processo.valorEconomico","tarefa.especieTarefa","complementoConsultivo"],
                context: {}
            }
        });
    }

    get_componente(id) {
        if (!Number.isInteger(id)) throw new Error('ID nao informado');
        return this.transform({
            url: `/v1/administrativo/componente_digital/${id}/download`,
            params: {
                context: {}
            }
        });
    }

    lancar_atividade(data_conclusao, docs, id_tipo_atividade, id_tarefa, id_usuario, obs) {
        if (!data_conclusao instanceof Date) throw new Error('data_conclusao não é uma data');
        if (!Array.isArray(docs)) throw new Error('docs não é array');
        if (!Number.isInteger(id_tipo_atividade)) throw new Error('id_tipo_atividade não é inteiro');
        if (!Number.isInteger(id_tarefa)) throw new Error('id_tarefa não é inteiro');
        if (!Number.isInteger(id_usuario)) throw new Error('id_usuario não é inteiro');
        return this.transform({
            url: `/v1/administrativo/atividade`,
            params: {
                post: {
                    dataHoraConclusao: this.date2super(data_conclusao),
                    destinacaoMinutas: "juntar",
                    documento: null,
                    documentos: docs,
                    encerraTarefa: true,
                    especieAtividade: id_tipo_atividade,
                    observacao: obs || null,
                    respostaDocumentoAvulso: null,
                    setor: null,
                    setorAprovacao: null,
                    tarefa: id_tarefa,
                    usuario: id_usuario,
                    usuarioAprovacao: null
                },
                populate: [],
                context: {}
            }
        });
    }

    get_lancar_atividade(data_conclusao, docs, id_tipo_atividade, id_tarefa, id_usuario, obs) {
        return this.lancar_atividade(data_conclusao, docs, id_tipo_atividade, id_tarefa, id_usuario, obs);
    }

    get_lancar_atividade_consultiva(data_conclusao, docs, id_tipo_atividade, id_tarefa, id_complemento_consultivo, id_usuario, obs) {
        if (!data_conclusao instanceof Date) throw new Error('data_conclusao não é uma data');
        if (!Array.isArray(docs)) throw new Error('docs não é array');
        if (!Number.isInteger(id_tipo_atividade)) throw new Error('id_tipo_atividade não é inteiro');
        if (!Number.isInteger(id_tarefa)) throw new Error('id_tarefa não é inteiro');
        if (!Number.isInteger(id_usuario)) throw new Error('id_usuario não é inteiro');
        if (!Number.isInteger(id_complemento_consultivo)) throw new Error('id_complemento_consultivo não é inteiro');
        return this.transform({
            url: '/v1/consultivo/atividade_consultiva',
            params: {
                post: {
                    complementoConsultivo: id_complemento_consultivo,
                    dataHoraConclusao: this.date2super(data_conclusao),
                    destinacaoMinutas: "juntar",
                    documento: null,
                    documentos: docs,
                    encerraTarefa: true,
                    especieAtividade: id_tipo_atividade,
                    observacao: obs || null,
                    respostaDocumentoAvulso: null,
                    setor: null,
                    setorAprovacao: null,
                    tarefa: id_tarefa,
                    usuario: id_usuario,
                    usuarioAprovacao: null
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * ATENÇÃO! AINDA NÃO FUNCIONA NO SUPER - EU ACHO QUE FALTA INDICAR O NÚMERO DA TAREFA
     * @param nome
     * @param descricao
     * @param corHexadecimal
     * @returns {{params: {}, url}}
     */
    inserir_etiqueta_tarefa(nome, descricao, corHexadecimal) {
        if (typeof nome !== 'string') throw new Error('Nome não é string');
        if (typeof descricao !== 'string') descricao = nome;
        if (nome.length > 20 || descricao.length > 20) throw new Error('Nome ou Descrição maior que 20 caracteres');
        if (!this.isHexRGB(corHexadecimal)) corHexadecimal = '#a9aab3';
        return this.transform({
            url: `/v1/administrativo/etiqueta`,
            params: {
                post: {
                    ativo: true,
                    corHexadecimal,
                    descricao,
                    modalidadeEtiqueta: null,
                    modalidadeOrgaoCentral: null,
                    nome,
                    setor: null,
                    sistema: false,
                    unidade: null,
                    usuario: null
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * OS DADOS ORIGINAIS SÃO OBTIDOS COM BUSCAR NUP
     * @param NUP
     * @param id_nup
     * @param classificacao
     * @param especieProcesso
     * @param modalidadeMeio
     * @param procedencia
     * @param semValorEconomico
     * @param setorAtual
     * @param setorInicial
     * @param tipoProtocolo
     * @param titulo
     * @param descricao
     * @param unidadeArquivistica
     * @param visibilidadeExterna
     * @returns {{params: {}, url}}
     */
    editar_processo(NUP, id_nup, classificacao, especieProcesso, modalidadeMeio, procedencia, semValorEconomico, setorAtual, setorInicial, tipoProtocolo, titulo, descricao, unidadeArquivistica, visibilidadeExterna) {
        NUP = this.validaNUP(NUP);
        if (!NUP) throw new Error('NUP inválido');
        if (!Number.isInteger(id_nup)) throw new Error('id_nup não é inteiro');
        if (!Number.isInteger(classificacao)) throw new Error('classificacao não é inteiro');
        if (!Number.isInteger(especieProcesso)) throw new Error('especieProcesso não é inteiro');
        if (!Number.isInteger(modalidadeMeio)) throw new Error('modalidadeMeio não é inteiro');
        if (!Number.isInteger(procedencia)) throw new Error('procedencia não é inteiro');
        if (typeof semValorEconomico !== 'boolean') throw new Error('semValorEconomico não é boolean');
        if (!Number.isInteger(setorAtual)) throw new Error('setorAtual não é inteiro');
        if (!Number.isInteger(setorInicial)) throw new Error('setorInicial não é inteiro');
        if (!Number.isInteger(tipoProtocolo)) throw new Error('tipoProtocolo não é inteiro');
        if (!Number.isInteger(unidadeArquivistica)) throw new Error('unidadeArquivistica não é inteiro');
        if (typeof visibilidadeExterna !== 'boolean') throw new Error('visibilidadeExterna não é boolean');
        if (typeof titulo !== 'string') throw new Error('titulo não é string');
        if (typeof descricao !== 'string') descricao = null;
        if (titulo.length > 255) throw new Error('Titulo maior que 255 caracteres');
        return this.transform({
            url: `/v1/administrativo/processo/${id_nup}`,
            params: {
                put: {
                    NUP,
                    alterarChave: false,
                    classificacao,
                    configuracaoNup: null,
                    dataHoraAbertura: null,
                    dataHoraDesarquivamento: null,
                    dataHoraPrazoResposta: null,
                    descricao,
                    especieProcesso,
                    lembreteArquivista: null,
                    localizador: null,
                    modalidadeFase: null,
                    modalidadeMeio,
                    nupInvalido: null,
                    outroNumero: null,
                    procedencia,
                    processoOrigem: null,
                    protocoloEletronico: null,
                    requerimento: null,
                    semValorEconomico,
                    setorAtual,
                    setorInicial,
                    temProcessoOrigem: null,
                    tipoProtocolo,
                    titulo,
                    unidadeArquivistica,
                    validaNup: null,
                    visibilidadeExterna
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * OS DADOS ORIGINAIS SÃO OBTIDOS COM BUSCAR NUP
     * @param NUP If new NUP it must be null
     * @param classificacao
     * @param dataHoraAbertura
     * @param especieProcesso
     * @param modalidadeMeio
     * @param procedencia
     * @param semValorEconomico
     * @param setorAtual
     * @param titulo
     * @param valorEconomico
     * @returns {{params: {}, url}}
     * RESPONSE: ------------------------------------------------
     * @type    "Processo"
     * @id    "/v1/administrativo/processo/41060226"
     * @context    "/api/doc/#model-Processo"
     * unidadeArquivistica	1
     * tipoProtocolo	1
     * semValorEconomico	false
     * protocoloEletronico	false
     * NUP	"00456000340202468"
     * NUPFormatado	"00456.000340/2024-68"
     * visibilidadeExterna	false
     * dataHoraAbertura	"2024-08-13T15:41:33"
     * titulo	"DEMARCAÇÃO ÁREA DA UNIÃO CAJUEIRO DA PRAIA E BARRA GRANDE - DATA SANTANA"
     * outroNumero	"17339.000016/97-72"
     * chaveAcesso	"a0446cab"
     * acessoRestrito	false
     * hasBookmark	false
     * hasFundamentacaoRestricao	false
     * id	41060226
     * uuid	"5390e199-731b-490d-835d-7269302a6284"
     * criadoEm	"2024-08-13T15:41:33"
     * atualizadoEm	"2024-08-13T15:41:33"
     */
    post_criar_processo(classificacao, dataHoraAbertura, especieProcesso, modalidadeMeio, NUP, procedencia, semValorEconomico, setorAtual, titulo, valorEconomico) {
        if (NUP) {
            NUP = this.validaNUP(NUP);
            if (!NUP) throw new Error('NUP inválido');
        }
        if (!(dataHoraAbertura instanceof Date)) throw new Error('dataHoraAbertura não é Date()');
        if (!Number.isInteger(classificacao)) throw new Error('classificacao não é inteiro');
        if (!Number.isInteger(especieProcesso)) throw new Error('especieProcesso não é inteiro');
        if (!Number.isInteger(modalidadeMeio)) throw new Error('modalidadeMeio não é inteiro');
        if (!Number.isInteger(procedencia)) throw new Error('procedencia não é inteiro');
        if (typeof semValorEconomico !== 'boolean') throw new Error('semValorEconomico não é boolean');
        if (!Number.isInteger(setorAtual)) throw new Error('setorAtual não é inteiro');
        if (typeof titulo !== 'string') throw new Error('titulo não é string');
        if (titulo.length > 255) throw new Error('Titulo maior que 255 caracteres');
        if (!semValorEconomico && !valorEconomico) throw new Error("valorEconomico deveria ter valor não nulo");
        if (!semValorEconomico && valorEconomico && typeof valorEconomico !== 'number') throw new Error("valorEconomico deveria ser numero");
        return this.transform({
            url: `/v1/administrativo/processo`,
            params: {
                post: {
                    alterarChave: null,
                    classificacao,
                    configuracaoNup: null,
                    dadosRequerimento: null,
                    dataHoraAbertura: this.date2super(dataHoraAbertura), // null if new NUP
                    dataHoraDesarquivamento: null,
                    dataHoraPrazoResposta: null,
                    descricao: null,
                    emTramitacaoExterna: null,
                    especieProcesso,
                    hasFundamentacaoRestricao: null,
                    lembreteArquivista: null,
                    localizador: null,
                    modalidadeFase: null,
                    modalidadeMeio,
                    NUP: NUP || null, // null when new NUP
                    nupInvalido: null,
                    outroNumero: null,
                    procedencia,
                    processoOrigem: null,
                    processoOrigemIncluirDocumentos: null,
                    protocoloEletronico: null,
                    requerimento: null,
                    semValorEconomico: semValorEconomico || null,
                    setorAtual,
                    setorInicial: null,
                    temProcessoOrigem: false,
                    tipoProtocolo: NUP ? 2 : 1, // 1 if new NUP????
                    titulo: titulo.trim(),
                    unidadeArquivistica: 1,
                    validaNup: null,
                    valorEconomico: typeof valorEconomico === 'number' ? valorEconomico.fixed(2) : null,
                    visibilidadeExterna: null,
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Faz o Upload de um arquivo HTML ao Super. Esse arquivo nao pode ter <script>
     * @param id_processo {Number} ID do Processo, não o ID do Volume
     * @param html {String} texto com o HTML NÃO CODIFICADO
     * @param nome {String} texto opcional com o nome do arquivo
     * @returns {{params: {}, url}}
     * O resultado do request dá um status 201 e deve retornar algo como isso:
     @context: "/api/doc/#model-ComponenteDigital"
     @id: "/v1/administrativo/componente_digital/763908223"
     @type: "ComponenteDigital"
     assinado: false
     atualizadoEm: "2021-11-10T19:08:59"
     conteudo: "data:text/html;name=DOCUMENTO.HTML;charset=UTF-8;base64,PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0icHQtQlIiPjxoZWFkZXI+PHN0eWxlPmJvZHkge2ZvbnQtZmFtaWx5OiAnVGl0aWxsaXVtIFdlYicsICdBcmlhbCcsIHNlcmlmO2ZvbnQtc2l6ZTogMTBweDt9IHRkIHtwYWRkaW5nOiAwIDdweDt9IHRhYmxle2JvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7fTwvc3R5bGU+PC9oZWFkZXI+PGJvZHk+PGRpdj7DocOpw63Ds8O6PC9kaXY+PC9ib2R5PjwvaHRtbD4="
     convertidoPdf: false
     criadoEm: "2021-11-10T19:08:59"
     editavel: false
     extensao: "html"
     fileName: "DOCUMENTO.HTML"
     hash: "538dc1e0ee6f114549793cb41d4151e7896d6a178903a6d27c59e0a5bc2b0aed"
     highlights: ""
     id: 763908223
     mimetype: "text/html"
     nivelComposicao: 0
     numeracaoSequencial: 1
     tamanho: 253
     uuid: "0c56ed4c-7abb-4212-9be2-9ebe4a36e093"
     */
    get_upload_html(id_processo, html, nome) {
        if (!Number.isInteger(id_processo)) throw new Error('id_processo não é inteiro');
        if (!html || typeof html !== 'string') throw new Error('HTML inválido');
        nome = nome || 'documento.html';
        let tamanho = new Blob([html]).size;
        const texto_codificado = this.codificar_texto_base64(html);
        return this.transform({
            url: `/v1/administrativo/componente_digital`,
            params: {
                post: {
                    chaveInibidor: null,
                    conteudo: `data:text/html;base64,${texto_codificado}`,
                    convertidoPdf: null,
                    dataHoraLockEdicao: null,
                    dataHoraSoftwareCriacao: null,
                    documento: null,
                    documentoAvulsoOrigem: null,
                    documentoAvulsoOrigemBloco: null,
                    documentoOrigem: null,
                    editavel: null,
                    extensao: null,
                    fileName: nome,
                    hash: null,
                    mimetype: "text/html",
                    modalidadeAlvoInibidor: null,
                    modalidadeTipoInibidor: null,
                    modelo: null,
                    nivelComposicao: null,
                    numeracaoSequencial: null,
                    processoOrigem: id_processo,
                    softwareCriacao: null,
                    tamanho,
                    tarefaOrigem: null,
                    tarefaOrigemBloco: null,
                    tipoDocumento: null,
                    usernameLockEdicao: null,
                    versaoSoftwareCriacao: null
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Só existem três meios quando escrito este código: físico, eletrônico e híbrido
     * @returns {{params: {}, url}}
     */
    get_modalidade_meio_processos() {
        return this.transform({
            url: `/v1/administrativo/modalidade_meio`,
            params: {
                where: {},
                limit: this.max_itens,
                offset: 0,
                order: {},
                populate: [],
                context: {},
            }
        });
    }

    /**
     * Obtém os mesmos dados exibidos na parte de dados básicos do processo
     * @param id_proc {Number}
     * @returns {{params: {}, url}}
     */
    get_dados_basicos_proc(id_proc) {
        if (!Number.isInteger(id_proc)) this.erro_fatal('ID do processo precisa ser numero');
        return this.transform({
            url: `/v1/administrativo/processo/${id_proc}`,
            params: {
                populate: ["populateAll","especieProcesso.generoProcesso","setorAtual.unidade","setorAtual.especieSetor"],
                context: {}
            }
        });
    }

    /**
     * Atualiza chaves específicas nos dados básicos do NUP.
     * LEMBRE-SE de que esta função é autônoma e não precisa estar dentro de um this.super_get()
     * Lembre-se de que ela precisa de AWAIT
     * Chaves permitidas: 'modalidadeMeio', 'semValorEconomico', 'setorAtual', 'setorInicial', 'tipoProtocolo', 'titulo', 'descricao' e 'visibilidadeExterna'
     * @param nup {String}
     * @param o {Object} Chaves e valores a alterar.
     * @returns {Promise<Object>}
     */
    async get_atualizar_nup(nup, o) {
        console.log(this);
        nup = this.validaNUP(nup);
        if (!nup) this.erro_fatal('NUP inválido');
        const proc = await this.super_get(this.get_id_processo(nup), true, true);
        console.log(proc);
        if (!proc) this.erro_fatal('Não foi possível obter os dados básicos processo.');
        const chaves_necessarias = ['NUP', 'alterarChave', 'classificacao', 'configuracaoNup', 'dataHoraAbertura', 'dataHoraDesarquivamento', 'dataHoraPrazoResposta', 'descricao', 'especieProcesso', 'lembreteArquivista', 'localizador', 'modalidadeFase', 'modalidadeMeio', 'nupInvalido', 'outroNumero', 'procedencia', 'processoOrigem', 'protocoloEletronico', 'requerimento', 'semValorEconomico', 'setorAtual', 'setorInicial', 'temProcessoOrigem', 'tipoProtocolo', 'titulo', 'unidadeArquivistica', 'validaNup', 'visibilidadeExterna'];
        let dados = {};
        const keys = Object.keys(o);
        for(let k of keys) {
            switch (k) {
                case 'modalidadeMeio':
                    if (![1,2,3].some(d=>d===o[k])) this.erro_fatal('modalidadeMeio com valor invalido');
                    dados[k] = o[k];
                    break;
                case 'semValorEconomico':
                    if (typeof o[k] !== "boolean") this.erro_fatal('_semValorEconomico nao boolean');
                    dados[k] = o[k];
                    break;
                case 'setorAtual':
                    if (!Number.isInteger(o[k])) this.erro_fatal('setorAtual nao numero');
                    dados[k] = o[k];
                    break;
                case 'setorInicial':
                    if (!Number.isInteger(o[k])) this.erro_fatal('setorInicial nao numero');
                    dados[k] = o[k];
                    break;
                case 'tipoProtocolo':
                    if (!Number.isInteger(o[k])) this.erro_fatal('setorIntipoProtocoloicial nao numero');
                    dados[k] = o[k];
                    break;
                case 'titulo':
                    if (typeof o[k] !== 'string') this.erro_fatal('titulo nao string');
                    if (!o[k]) this.erro_fatal('titulo vazio');
                    if (o[k].length > 255) this.erro_fatal('titulo > 255');
                    dados[k] = o[k];
                    break;
                case 'descricao':
                    if (typeof o[k] !== 'string') this.erro_fatal('descricao nao string');
                    if (o[k].length > 255) this.erro_fatal('descricao > 255');
                    dados[k] = o[k];
                    break;
                case 'visibilidadeExterna':
                    if (typeof o[k] !== "boolean") this.erro_fatal('visibilidadeExterna nao boolean');
                    dados[k] = o[k];
                    break;
                default:
                    console.log(`%cChave não prevista na função "${k}"`, 'color:red;font-weight:bold;');
            }
        }
        for(let c of chaves_necessarias) if (!dados[c]) dados[c] = proc[c] === undefined ? null : proc[c];
        if (!Number.isInteger(dados.modalidadeMeio)) dados.modalidadeMeio = proc.modalidadeMeio.id;
        if (!Number.isInteger(dados.setorAtual)) dados.setorAtual = proc.setorAtual.id;
        if (!Number.isInteger(dados.setorInicial)) dados.setorInicial = proc.setorInicial.id;
        // console.log(dados);
        const res = await this.super_get(this.editar_processo(
            dados.NUP,
            proc.id,
            dados.classificacao.id,
            dados.especieProcesso.id,
            dados.modalidadeMeio, // 1 = Fisico, 2 = Eletronico (nao admite tramitacao) e 3 = Hibrido
            dados.procedencia.id,
            dados.semValorEconomico,
            dados.setorAtual,
            dados.setorInicial,
            dados.tipoProtocolo,
            dados.titulo,
            dados.descricao,
            dados.unidadeArquivistica,
            dados.visibilidadeExterna
        ));
        // console.log(res);
        return res;
    }


    codificar_texto_base64(texto) {
        let aMyUTF8Input, retorno;
        try {
            aMyUTF8Input = strToUTF8Arr(texto);
            retorno = base64EncArr(aMyUTF8Input);
        }
        catch (e) {
            alert('base64binary.js precisa estar no HTML como <script>');
            throw new Error('Biblioteca inexistente');
        }
        return retorno;
    }

    /**
     * O documento eh editado no link https://supersapiens.agu.gov.br/apps/tarefas/consultivo/minhas-tarefas/entrada/tarefa/124123566/processo/14576829/visualizar/0-0/documento/1380885199/(componente-digital/806523202/editor/ckeditor//sidebar:editar/atividade)
     * O numero do documento para gerar o link eh obtido com o get_minutas() e eh o ID da entity onde esta o componente digital
     * E gerou a seguinte resposta:
     {
    "@type": "ComponenteDigital",
    "@id": "/v1/administrativo/componente_digital/806523202",
    "@context": "/api/doc/#model-ComponenteDigital",
    "fileName": "MODELO.HTML",
    "hash": "fe0870188f1922470e01d06d04c9e4215fcfc27698afd05409d158bbf63420c5",
    "numeracaoSequencial": 1,
    "conteudo": "data:text/html;name=MODELO.HTML;charset=utf-8;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9InB0Ij4KPGhlYWQ+CiAgICAKICAgIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+CiAgICAgICAgcCB7CiAgICAgICAgICAgIHRleHQtaW5kZW50OiAyNW1tOwogICAgICAgICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OwogICAgICAgICAgICBmb250LWZhbWlseTogIkNhbGlicmksIHNhbnMtc2VyaWYiOwogICAgICAgICAgICBmb250LXNpemU6IDExcHQ7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7CiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuMmVtOwogICAgICAgICAgICBsaW5lLWhlaWdodDogMS4yZW07CiAgICAgICAgfQoKICAgICAgICBib2R5IHsKICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJDYWxpYnJpLCBzYW5zLXNlcmlmIjsKICAgICAgICAgICAgZm9udC1zaXplOiAxMXB0OwogICAgICAgICAgICBjb3VudGVyLXJlc2V0OiBIMSBudW1lcmFkbzsKICAgICAgICAgICAgbWFyZ2luLXRvcDogNSU7CiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogYXV0bzsKICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87CiAgICAgICAgICAgIG1heC13aWR0aDogMjEwbW07CiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjJlbTsKICAgICAgICB9CgogICAgICAgIGgxOmJlZm9yZSB7CiAgICAgICAgICAgIGNvbnRlbnQ6IGNvdW50ZXIoSDEpICIuICI7CiAgICAgICAgICAgIGNvdW50ZXItaW5jcmVtZW50OiBIMTsKICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgICAgICAgICB3aWR0aDogMjVtbTsKICAgICAgICB9CgogICAgICAgIGgxIHsKICAgICAgICAgICAgY291bnRlci1yZXNldDogSDI7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAiQ2FsaWJyaSwgc2Fucy1zZXJpZiI7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFwdDsKICAgICAgICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTsKICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7CiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7CiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuMmVtOwogICAgICAgICAgICBsaW5lLWhlaWdodDogMS4yZW07CiAgICAgICAgfQoKICAgICAgICBoMjpiZWZvcmUgewogICAgICAgICAgICBjb250ZW50OiBjb3VudGVyKEgxKSAiLiIgY291bnRlcihIMikgIiAiOwogICAgICAgICAgICBjb3VudGVyLWluY3JlbWVudDogSDI7CiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgICAgICAgICAgd2lkdGg6IDI1bW07CiAgICAgICAgfQoKICAgICAgICBoMiB7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAiQ2FsaWJyaSwgc2Fucy1zZXJpZiI7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFwdDsKICAgICAgICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTsKICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7CiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuMmVtOwogICAgICAgICAgICBsaW5lLWhlaWdodDogMS4yZW07CiAgICAgICAgfQoKICAgICAgICBwLm51bWVyYWRvOmJlZm9yZSB7CiAgICAgICAgICAgIGNvbnRlbnQ6IGNvdW50ZXIobnVtZXJhZG8pICIuICI7CiAgICAgICAgICAgIGNvdW50ZXItaW5jcmVtZW50OiBudW1lcmFkbzsKICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgICAgICAgICB3aWR0aDogMjVtbTsKICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsKICAgICAgICB9CgogICAgICAgIHAubnVtZXJhZG8gewogICAgICAgICAgICB0ZXh0LWluZGVudDogMG1tOwogICAgICAgICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OwogICAgICAgICAgICBmb250LWZhbWlseTogIkNhbGlicmksIHNhbnMtc2VyaWYiOwogICAgICAgICAgICBmb250LXNpemU6IDExcHQ7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7CiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuMmVtOwogICAgICAgICAgICBsaW5lLWhlaWdodDogMS4yZW07CiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7CiAgICAgICAgfQoKICAgICAgICBpbWcgewogICAgICAgICAgICBtYXgtd2lkdGg6IDE2MG1tOwogICAgICAgIH0KCiAgICAgICAgdGFibGUgewogICAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDsKICAgICAgICAgICAgYm9yZGVyLXNwYWNpbmc6IDJweDsKICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiBibGFjazsKICAgICAgICAgICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKICAgICAgICAgICAgZm9udC1zaXplOiAxMXB0OwogICAgICAgICAgICBtYXgtd2lkdGg6IDE2MG1tOwogICAgICAgICAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkOwogICAgICAgIH0KCiAgICAgICAgdGFibGUgdGggewogICAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDsKICAgICAgICAgICAgcGFkZGluZzogMnB4OwogICAgICAgICAgICBib3JkZXItY29sb3I6IGJsYWNrOwogICAgICAgICAgICBmb250LXNpemU6IDExcHQ7CiAgICAgICAgfQoKICAgICAgICB0YWJsZSB0ZCB7CiAgICAgICAgICAgIGJvcmRlci13aWR0aDogMXB4OwogICAgICAgICAgICBwYWRkaW5nOiAycHg7CiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFwdDsKICAgICAgICB9CgogICAgICAgIHRhYmxlIHRkIHAgewogICAgICAgICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OwogICAgICAgICAgICB0ZXh0LWluZGVudDogMG1tOwogICAgICAgIH0KCiAgICAgICAgdWwgewogICAgICAgICAgICBmb250LWZhbWlseTogIkNhbGlicmksIHNhbnMtc2VyaWYiOwogICAgICAgICAgICBmb250LXNpemU6IDExcHQ7CiAgICAgICAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7CiAgICAgICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogY2lyY2xlOwogICAgICAgICAgICBtYXJnaW4tbGVmdDogMThtbTsKICAgICAgICB9CgogICAgICAgIG9sIHsKICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJDYWxpYnJpLCBzYW5zLXNlcmlmIjsKICAgICAgICAgICAgZm9udC1zaXplOiAxMXB0OwogICAgICAgICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OwogICAgICAgICAgICBtYXJnaW4tbGVmdDogMThtbTsKICAgICAgICB9CgogICAgICAgIGJsb2NrcXVvdGUgewogICAgICAgICAgICBmb250LWZhbWlseTogIkNhbGlicmksIHNhbnMtc2VyaWYiOwogICAgICAgICAgICBmb250LXNpemU6IDEwcHQ7CiAgICAgICAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7CiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNDBtbTsKICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMG1tOwogICAgICAgICAgICBtYXJnaW4tdG9wOiAwOwogICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjJlbTsKICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwbW07CiAgICAgICAgfQoKICAgICAgICAuY2VudHJhbGl6YWRvIHsKICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICAgICAgICB0ZXh0LWluZGVudDogMDsKICAgICAgICB9CgogICAgICAgIC5kaXJlaXRhIHsKICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7CiAgICAgICAgICAgIHRleHQtaW5kZW50OiAwOwogICAgICAgIH0KCiAgICAgICAgLmVzcXVlcmRhIHsKICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDsKICAgICAgICAgICAgdGV4dC1pbmRlbnQ6IDA7CiAgICAgICAgfQoKICAgICAgICBwIHNwYW4uY2tlX3dpZGdldF9pbmxpbmUgewogICAgICAgICAgICB0ZXh0LWluZGVudDogMG1tICFpbXBvcnRhbnQ7CiAgICAgICAgfQoKICAgICAgICBzZWN0aW9uIG9sIHsKICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJDYWxpYnJpLCBzYW5zLXNlcmlmIjsKICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDJtbSAhaW1wb3J0YW50OwogICAgICAgIH0KCiAgICAgICAgc2VjdGlvbi5mb290bm90ZXMgewogICAgICAgICAgICBtYXJnaW4tdG9wOiA0LjJtbTsKICAgICAgICAgICAgcGFkZGluZy10b3A6IDIuMm1tOwogICAgICAgIH0KCiAgICAgICAgc3BhbltkYXRhLXNlcnZpY2VdIHsgLyogU3R5bGVzICovCiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdzsKICAgICAgICAgICAgZm9udC1mYW1pbHk6ICJDb3VyaWVyIjsKICAgICAgICB9PC9zdHlsZT4KPC9oZWFkPgo8Ym9keT4KICAgIDxwIGNsYXNzPSJjZW50cmFsaXphZG8iPjxpbWcgc3JjPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURBQUFBQXdDQVlBQUFCWEF2bUhBQUFYZFVsRVFWUm9nYldhZDFnVVo5Zkd4eG82bHRoalJRU1JKazBVeGQ1THhCSmpRVVJBUlFFYlV1eUlBdEpaaW9Jb2lBMlFEaXBpd3hJTklvcW9nQ0lZTkRHSkpaYllnSjM1Zlg4czhpYXY1a3Zlcnp6TDdzVzFNN3R6N3VmY3A4eDlWdUEvV2hJU2NpVEV4cWNjSkFrVWY0aFNBNklvSWtyMXlDV1FhRUFDSktrQmtKQ0xFaUlpU0EwMDBJRDQ4WU9TOUorWjhZY2wvQ2NuaThpUmtFQ1NJMG4xU05KSFFBMU41N3grOFlpYTJ3ZW9yLy9RK0k3aTJPdFh2MUo3TTVxNnVuZUlnQUtoSEVtU0FEa0tKUC9QQUQ1dWRZTlVUejMxZjdxbUpJblVOOENOYkFlcVQxdHlQbWNMZGZYdmVQTHdBUStydjZlMGNBZTNVclNvdlhNRUpKRTZRSlJFQlJnUkd2Lzcvd1VnSVlJa0l0S0ErUFlOTndyWDh1U25XM3lvZTRVa2lkU1dwM0U5YlRMWGN3WndQWGN1RjdJV2NUdGJtK0xqOWx4S21VblZDVE8rejdUanpkTXFHa1E1OWU5ZVVuUDNMTGUrMy9iSExmcS9BNkNncHdpU2hPSUJDbmZEL2JJOGJtWlpVNVF4aTZLOFdUd3NTZUJhMmt5S2p5L25idDVRTG1aOHcrM0RCcHd3VnFFb1l6UUYrNmR6NGNBRVN2Sys1ZGlSTmR6K1BvSXJHYk1veVpuRzllTlRlZkhrQVNBMnhvNzhZMmo5TGFTLzhZQ2tlSXFBS0lFa2dnVDFZajNYQ29Nb3pSN0dyYXpCRk9jNmszMWtNb01kK3BHYjlnMkZTVGJjUERtSU16WmRpSm5XaGN1ZXZiaHgwSmVjVkgveWQwL2s2cDQ0OGhLKzVXcm1YQjRjcytKcTFuUit1bis2a1VvSzQ4VlBEUDg4eGY2V1F2VkkxRXNmcUgvL08rL3FYdlBod3l0ZVB2K0pPNWx6T1gxMEFVVlpVemg5ZURSdGxwaWh2R0FBbWpZOXlVK2V6czNBRG5pTjdVM3drUzdjWE5xZWd1aEJUSjQzbnBDUThVeHhIVXhHM05la3h0aXpYYmFJdy91bWs1SzhpbWUvL2Nycjl5K28vL0NHdWcrdi81UWNwUDhaQURraUluWHZuMU4yWWhFbEJhdTVlbXcxWlNkY2tPMmVnTEd0TG9kanhtTHVaSUNTa3pHYWF3ZlJjZVVRamdhWmNHRmhGN3A2RGlMaVdBZHFndFFvV05lVjdNTmhMSEtiaTVHakdiYnJSNUFmdDQ3cEs0Wmk0RzNNQ0E5TGx2bk5waVRmbVZ1bkYxTnl6bGRodUNSdjRzSi9Ea0NFQmttazd0MFRycWZQcHZ6WUNMN1AvSnFUbVRiMDhUSkZiWVVwSFJZWm8vNk5EdXBMaldodFo4QVVGejF1eHZYR1pab09RdkF3d2srMGg2ZnRPVHRLaFN2cGxod0pYSWw3NEF5c3ZLMFl2ZEtFK0pqeHRGaWlqL0pHVTVUc0J4SVVOcFQ3K1dPNGRzcnREd0RFdjh4Uy84QUQ4UDd0VHhTbVRLQXNZeHEzY29jU0hqYWVEdDlvMDI3OVNOU1hHdEIrcVJuV1N3YVR0R3NNWjFKSGNHSlllNHpXbVNLRUR5WDhXRWZnQ3lwODJwSS9zejE3ZDgxaWpwMFp3NzdwU0Q5WEE0YTdtS08wMFFvTkwwdVUzQzJ3WHExTlpaNE5sM0kzTk82aCtOL0c4ZC9HZ0FoOGVQTWpKdy9QNVBqK3FkaXZ0c0IxZ1Q3cUMvcWp0dEljVFdjTFd0cnFzZDdYakV1SFIxQzJ2UXZlWS9RUW9rY2doQTRqUE9kTG9CbmlCM1V1ak5TZ1VEYVJqS2l4YkFxd1pKTDdFUHE0bUtDMHlScU5sUllvdVpqUmZmTXdnb09zS2NwZjFWVGhRZnpMYXYzZkF2amhoekxLejZ6bjJyRk4yUHBZMFdXdENiMUc5TUNqVHljc3JIdlN6RkdQNXZaNkRGaXF5NTZJY1Z6Y3E4MEYweDZvZTJveE1rNFh6K042WEM3dXpKdkhiZmkxdGlXUDg5VzU5RzBIQ21LSGtMUjdBb1lyOUdtMXNEL3RISTFwdTlnQ0RSY2pPdmhZbytxc3k4RkRjN2lSdjVLS29oaWUvbG9EMEZpMS93YUFYQktSSkxpUU9ZMGIyU000bFRhWDNNTWpVVjJzaDhaS0U3cXNzR1RwVEVQR2Z0MkR3MUhXN0FzZVNjSCtLUnlQR1VyK3BtN0VlL2REVnJRRXUxUS8rZ1VkUWl2d0lIM0Q5ckVxZlRWN3NxYVI2OWFOVEZrUDhxS0c0dUV6bE40YmhxTTZvei9xRG5xb3pkZEh5ZEdJTDVZYU1jckxtRnQ1czdpUk9aSGlYR3V1bnR6d0R6MGdLWUxsZG5FeTVibVRHT3hwZ0o3ckFKVGN6VkJhUEpBV2E0WWdMRE9pN1ZJRGJBT00yUlZpd0lsb2ZaSVA2ckwwcUJlakVrNmdHWEtOSlFldjA4M3ZNbWxscnhnY2VRbWJ4RHQwQ0M3R092RVEyM1Bua1I3Zm01VmJkVEh4MXFmWFRndlVGK3NqVE8rRnF2MUFXcnVhbys1b1JNV3AyWlRsREtjMGZUYVBIOS8vZXdBU0lJb2lpQkp2ZjZ0bXYydzQ3Ynl0VWZVMm9kbmNuaGl1N0lObjdFQnkwdlE0dmxtYmpERnRPVFpRbmRwQ2MzcUc3a0pZZDRLNDg5V1lCZVJqR1o2SWE0b2JFUVd1TEUzd3BudGdPdlAzWE9UcitCSTZic3hqVXZ3V3JnVjI0YlNsSnJsek5EaStXNGRqbWZyWXlYVDRha1VmbW5ub0V1UnZ4czE4ZTg0Yy9Qb3ZhZjZKQjBTcEFSRjQvbXNWK2NuakNQZnZUWnBuYjI2dDdrS0ZYUmV1akZmbTBrUWxTamRvVXB1a1R2R3h2dlFPUFlCdVJCRzdydHhuWUlnZkczS1dzeUxGQTR2b1ZMckZwR0srL3pBdWFWNnNPYm9FcTRna1R0NTlqTERwUEE2SjY1bTZUcHVaQzh4d21kQ0gwSUZkT1RtcEo3ZWNlbkRHclJmNW0zVW9UZXpGclVKUDNyNzlvQWhvU2RIZXlCdlQ2aWNBUG9aSmRWazAzNFZwY2NGWWs3Z0pYVWlKNnNEYnFuWlFwd1lvUTBNTFhyeFdZY1lCTDJZbm5HZCtRaEZqWTFiam1CV015czR6SkplL0l1emNmVm9IbGlESUhpSElma1F6L0N5dTZaNzA5ZzlsVFdvcFJySXplSjJZVEV2WkVJU28wUWk3UmlQNFd0SGRXWTl0MjdUSXMvcVMwNVBhYy95Z0NjOS9PUE1IKytSTmhuNEM0T1hMWDdoVXNJeVMvRFZjVEo3RTFmaStIQjdjQTEwZmMvcUc5U0x3ZEc5K2Vkb1JVQ0xuZ2c2OUE4NmlJN3ZJaENnLzdOSmpFRUlmb0J4WlNWSlJEVTlldjZhRjd5V0VtQjhSSWgvUVhQWUFJYlNjM1pkWG91MTNBQzNaZHhnRnB6TDlvQTVDc0NYZGd3MVpuZG1EbXRmZEtFM29TdUdZOXN6MzdzbVdvTmxVSEhPanVEQ0VocnAzaUpMVWxKSCtCS0MrL2gwVloxZFFuV2xNWmQ0d1BJSkdZV1d2eDVrRWJTTEdkS1NUMzJDRXNPRzBETEpnc0c4YmZNK3RaVjUyTFZQRGMvSEljME1JdmszenFIczBqNnFpZzZ3WUlmQW1MV1RsTkl1cW9MbXNtcGFSZDJnZDlRUE50eGNRY05JSjM5d3l1b1pYc09ma09FcnV0WUgzU2lCdlJVMm1LbWNtYWhLWWFFZ3paeE82Mk9wUWxXL0tnenc5bmxSbE5sSkYvbmtQdkhyNWtLSmNkNjVrejJOT2tBV3RscGt5MWFvVEphNDkyVFdtQjUyMldDTkVEZWZiWkNNbXg4dFllTFNTQ2VGQmpEc2tRNUE5cExtc0NpRzZGa0ZXZ3hENUE4MGpheENpcWhGQ3k3SExyQ0RoK3hvNlJqekU5cUFQRTZKVG1KRlNqblB5VWhxZUNVQnJxclBWS1Z2UUdmY0FYUVE3YmRUV0RLS05jejhPSnk0bU5YTW5raWdoTnFiNnp3SUFxQ25QNFZUNkxKUWMrcU8reWhUTFdick1zKzVNL282K3hCdDJRbjNyWUdLLzAwZDl4Mm1HeVM0U2RzNlpkaEVuRVNJZklzZ2UwRUpXaVJCVlEwdFpGVXBobFFqQnR4RkM3K0djZVpQcW41L1FLN29TOC9oOXVLWkZZQngwRnJPNFNIaXJ3c1BqN1NrY3BJS1hqelpLYXcxUjMyR082akp6dnB6Um43NWV3Nm1vTFcrc3pnMS9IUU9TQ0c5RVdMRENrblllZzFGMUdvaUdpd1Vxam1ZWTJmYmxWbEovQXN5NmsxTnN3QmRiQ25IWVg4VFJpM05vNVgrTmpySTdkSWl0b3Btc1d1R0ppQWY0NWwxbTY2bEtoUEI3cUlSZnAvbk9hd2d4OTlEYmZSajNyQUJjRGhlakU1Ykl3M1IxenB1cmNTaHpBTUpDTGRwc0hrb3JOM05VdGx1aWJqK0FYczZqZWZQdUxVaHk2aEdiR3UzUGVxQ2lOSWVPQzNWUWNqSkd6ZDBFVFNkajFGWU1STjNCR0IybjNweHk3VWIxL3A1MDhEL0o0S2pyYkQrOWhON0J1Und0ZmNDeDhocUVvTHNJVWRXMENMdkR6T1F5clBiZG9MbXNtbWF5QnpTTHJFYVFQV0xZbnIzTVQ0cGtYSHd4UTBNaktQZnV6SG1aTnJidStyUjJOVUYxdFNsS2dTTlFYVzJPbW0xL0JubVA0TGZuMWNESFc1dS9pSUhIajI1VG5Ec2ZSNy9KZkxGa0FLMDlCNkhwYm9IS1VnTTBYQWZSdzhPQXRIQWpLdkw2TUNJdWpOakMrNHlUQldDVEhNYW8rREpHSjF5blZVUUZ6U0ovb0xtc2htYVI5MmdXWHROby9IMkV5QnFFcUVmWUgvQmkyN0V6VEkyOXlwcFVSeTRrOXVKNG5Ea0hrb2J6eFNvVGxOMHQwVmhqZ3JyYklGck43c3ZaTkFkS3ovcFI5K0UxOHNZYnhVOEFpR0lEUDVUR2NqdC9ETmV6RERGZlB4RE5WYVo4dWNTQ3pnN0dhRGlic2RSbElQa0prd254N2tMd2VSZVVmYTlpRkhrV2o3UWx0QWd2UXdqN0VTR3lHaUdxaG1aUmxUU0xla2pyOE51MGlMcEhzOGhhaE1oSGZCbDZrZzNaTHVnRUYvSkZRQWtKK1NOSkR6SmhnNDhGL3I2ejZmaXRMdXB1SnFqNEQwYlp5WWlGM2hZOE9tVkNhZVlnWGo2NjNxaEJmYmFRU1R6NTlSNjNMdnBSbERLSjd6TG00Ymx0Qk5ORzljTmRxelB6NXBqUjExa1AyM1htUlBxWmtuZlVITlBZVThSZXJxRmZ3QTdtSmdjZ2hOOURpSzVHaUs2aWVWUU5YMFpYc09kU0JSTVNTaEhDSHFJU2VZbXRXY3ZSOTA5bTQ2bGFCdTJLcHppbE84ZGlSckhFMnhLdE9Ub01XVGtFVFFkRDlCZjJwNGVkTVN1Mmo2WG12RDFWTjlQNVVQZXVVVXo3VEIxUWFGWWlEWFZ2K1BXSHl4UW5qMkxmd2JrWTJ4bmoxYnNqRmhQNm9yTEpISlZ2RFlsSjB1UENqSGFzVEZ1Tml0OFZMdGY4aXNPQmpUaWt1U3V5VHZoUE5JdXNwVTNZSFhKSzd6Tmkxem5Vb3dyWm5PWE16UGhvOHU2OVFHM25hVEtPVGVEQy9DNWs3aDFBRDA4ejJpNHl3R1R4QURUV1d0RngyeUM2ZnFPRjNRWnpIRGJaS2NRdzNpdlkvM2tQZkJRUFJWNysvcHFwSzZjd2Q0c3BLcXVIME1GaklKMjlScVBxMko4V1R1WUVKL1Rud2xBMTdwWDNRUzh5Z3BGN3JtSVJmcEdaTWY1c3lsN005TVFBdEdScGRJMDZqbjVRTEk1SE4rQ1I1c1M4K0dSNitSY3lQTzR5QzFKWFllRGRod3RqT3BHYllNWlhYbWFvMnhtaXV0YVUxbXROVVBNZWdwcUxHYTBXOUtmOFVjMi9kdmtQNnhNS2ljaVJSSW4zYjM5ajdqcHJsSnlNYWVzNUJPVTF4cWl1TkVITnpvaVdLNHc1ZkdRQVYwZXBJTldyY1BkdVY4WWRqR0RPMFVxNkJsNGs4R1FadG5zakNTMEl3RGwzSS82bkF2azZNb0ZOQmVWTU9WS0RibmdCYzlNOEdYdkFFTTJRVWVTWmQrQjYzZ2o2TFRlazdZTCtxSzAxUThObE1GKzQ2aU1zSG9EcjFpa0s2LzdKRFkxQ3ZwQnorM0lpc2JGajZPZzVBaVUzWFZRM0RVRmpyUm5LNnl4UmRlblBRZDhCM0hCUUJiRWwxRFVuSXIwbjNpY2M2Unh4bXI1aGw1bVdWTXFPL0hLNlJkMG0rRlE1bllNdTB5L29PN1FqOW5DNlpDUVRZenNqUkk1RUtkeWFkT3R1N1BmdFE4Zk40Mmk3MEJqbDRKR29yalJBelhNdzl0c3MrQzdQaGdkVmx6OHgvck1BUGdaSFNjRWlKanIzUTgzUmlMYk9KcWd0TTBKajdSQlVYWTNwNEQyUTlQbmRxZkJWQnJFRkp5cTZJZmlaMFM3WWlIVjVSdXpNbjQvVnpuQTZCeWZUSWVRNFBRTVNtUjZ4bGV3TGczbDBYNU9HTjYyNC8yTjcxSGNhSThTTUlIUkNYOUkzOUtQTE1oT1VuUHFqdm1ZZ2JkY09SWDNoQU5xNzZXT3pZUUJaUnpiL0c0VStGOFFvbERFa2VQYjBIbGRLTHpFdllpbkNmQzFhT3cya3hheStkSnlnamNQWFhTa2NwY0hkWkhWcW5tanlaWWdlUXN3b21vZU9ZdWlpL2tTTWJzTzkwSFpVZm0vRG5jdGJxU2dZeUsyMTdiaXhUSTFuRjVWQmJBMzFMZGwxc1N2TlpDTnhzK25MK1hWYTlKamNDK1VkdzFCYmEwRjdSMU9VbHhqU3ltNEF3ZGw3ZWZ6c2NXTUJFeHMxMm44RDBNUXZDZXFocWR0N1gvZWVPN1dWN0F5YVFGYlNQTDZlMEpzcDgzcFNZS3JPNDdJdVREblNEeUZ5TkZZcmpJZ2UwcFhyamwwcDI5ZUgzSWplM0M0OXpZMlNhNXpOY09kc25DNTNnbnB3YmFvbVYrMDFlWEpMQTJqTDJMMDlHZTFvVEx4ZEp6cTRtNkxxUFp6V0xrYTBkalpFK1p2K1JCN2JUMTFkWFdQeHFxZGVWQWpNSDVWYVFaSWs1SEtGUHYvaTllOWtuTDJrT0JrNUloSU52S2YrM1ZPSzgrWlRrak9Ea0ZocnhtM1dvV0NJT3ZzdjlFRnJ0UWt4NHp0eGVreGJMdTQzWUpIZmNsUjhNaG0yMVpjSE5kY29LYjNEcFJQYjZlOFhpOXFPTkh6ajUzSjZleCtPRzZsUjZxV0p2TFk3bzFacmNYUkdOem92N29mcXlvSFliRE5oeS9aWmlQTGZtOGhTRC96ODZpWDVsMG9BYUJEckVVVVJRUkxoaDUrZmtIeWxramQxOVN4TExhSHlsNWVOWHBHREtQTCsvVk5TRXhaUmtqV0pIVHVIczN4akg4Nlp0U2QrUm04S0hYc1I3Tm9WaTIzNmZMVnFHcHArRjdBSVM2WFhsZ1JLeWl1NWNlTUdzclJrdWdTZTRhdkFjMmdFNUdQaU9ZeUptL1NKWE5PZEs4NWR5WjNXaGJNTHZxTG5hbDNjZ2l3NWxUU0RvaFBiQVRseVNWSjBuNktJUzFZWlJiVXYrT25GSzdLSzdsQlgzNEFnOGg0QXh3T1gwTjU5a3o2N2I5QXJySmc2c1I3a1VDODE4T0x0ZTdxN2hORnArVll5RW13NGtXakt2V2h0Rm0vb1NwL0ZmZG0wYVRoRHRnMm5sZGNnQm5pTTVNVCtCZlQwVHliOTlrTktyOTNHSnZNdVk0UENLVWlkZ3E3emVOUVc2YUc2WEk4T1R2cm8yMnNUNHQ2Um41TzFDQW9ZUXZZQlc5b3M4V0xremlRRjR4c2JuL3o3djZEazl6M2pqOXloUjJneGw2c2VJMHFTd2dPaXFPQ1RTWFFSUW9TaWo3SGFkWVUzY2tYWk5ndzdoNmJzSW1ydWU5RnlqK1pXOFI2bUx0ZER3OGtFVlo4aHFIaFowTVpXRjdVRkE5QllZOEhXVUZ0YWJEdEg5cTBIRkYrN3lleXMyL1RkbkV4aTdEVGFPeHFoWXErRHVwYzF5ajdEVVBZd3BZV0hGVk45QnJBN0pRUVRqeVJVZHh4SENLL0VOYlVZZ0ZzL3YwRFljZ1ZoMTBPRTBGb0N6cFEyTWtSRUVKRWo1d055VWVUQmk5L3BGMTJDRUgyZm5tRW44Y3RPb3ZxWDU3VDBQNDlIK2hLQ01pYlRaMHNJMHlQenVIbk9oOENJa1hSek5rUjlzUUVxU3d5WjdtZkFuSzNHdUc3dXg1N0FzZVRPdHVXVSsyekM1ODRoTzhrS041OWhyTmlwVHo4WEhWUldHS1BzWm95U2h3bmQxdzBrTmllRjBhRTVqSlZ0WUczQ1pBWkVIcUwvN2xMTzNQMkpUcEhsQ0pIM0VVTHY0SlJaMldROFNJb3NKRFdKa0JLRlZZL3BHbktlWmZ1V3N5eG1LbVBEc3JuNjVDV3ovUmF5N2RCUS9BK1BZY211R1F4Wjc0L1orbG0wWFdLSWlwY0pYN2dhTW1iSENIckVGOUl4NGpMV1RuNFVCL2ZrMVFNVll1MkhvaFY4SEkyb0MwellFODN3NWRvMG02bE5HMmRkRm5pUHc5REJodDYrUi9CS3RtVno1a1JDVWl3Wkh4VEwyZHBudEErOWloRDFBQ0dpQXB0RDEzbjMvZ04xZnlnSG56UnpBS2Z2UG1SUWNEZzJzUnV4VFhKblNsZ2djVVhWekpMdFlFbnlha0tPakNUMmlCV1RkdnVqdXltQnJSbFpYS3UrUjg2NVlNYktRbkErNkVhSTkzU0s3RHRSZnJBOTJYUDZzU1BCamtVSjY1a1g3c0tMTjVVOGV2YUtuWGtuc1FoTnd5WEZoYkREZzltZmJzU2FHQnVXSHN3a3VMQUt3YmVJNXBFL0k4aXFHQlYzblZmdjZ3SDVuMFpQbnhHMkZPWGkwdDJuVE55WHh0WjlscXlKSGN1aytFUUNjODZ4TU9FaXRydmRpYzRaVGxEeUtCYkhPVEZsMTNxbVJrVGhsaGJEOW4zekNkdzFtNEF3ZjhMY3R4THZIVVNzZnlpeVBWdnhqWmpNenYxemNFZ3B3Q1lzSEljOWRvellGVWhZM2dTOGt5WXhkcnNuMDZMUDRuNDBCZldRc3dpUnRRaEJON0JOdTgyYmR4LzRxRktMb3RRMHNmbTBGNUpFUkxsRUhRMDhlZk9XbWRGSldJVUY0aFU3RmMrOWs5Q1JwZERWL1FCdDFrWmdGZVNGNzVFWkxBcWJ4cjVzUzRaSCs3SnU3MUEyeDB3aEpHTTZxL2JZNG5IUUM1dmdOV3paTzQzZ2RHdDhFa1l6WjY4cjlnZGRpYzB3WTB2T0N0cnR5RVJsYVFoOXZlSllHdWZFbm5RRFZtY3NvN1YvR2NFWHEvalFJUDVMYWhjLzNreitoUWYrTlkzNk9KZVU0MU5ZeXV4d1Q4SVBXQkMwVDQrWlVTdnBGcENKeXJJNFZGMmo2YlVsa3NtN3RxSVRITU9HVkh2Y29tWVFsMjdBcG4xRDJaMHprdkJVWSthR0xDRHg5RlEySm80blBQdHJ1dm9jcGZ2V0dKb3QyNDNxbWxUR0pSMWkyZTV2T1pDbGhlZWV5Y3dLOE9IeVQ2OCs1ZmUvcmI4WnMwcU5lUmkrZi9DY29MTUZUTjNoU3REQlFjU2tXZUlVWThmaUdBYzZyd2xFYVgwbUxUeVBZZVczaDZUeldld3FUR1hMMFFqV0pTVVNuQmZIeHF4c2ZQTlAwc2s3QmNIck9LMDJGOUJ5MDJrV1I3bXlQbU1CMnNIUnpJaHlZMFdjRDNzdlhPSnBuYUlyUm14VVFmOWlTdk8zWTFhcGNVWXNJbEV2UXZYVFYzaG5uV1hFOWxXc2lKdE0yQ0ZMNGpOTW1Sd2JqQkJlalh2R1ZRQWFSSkVIdFk5NC91SUZUMTg4bzA0dThzdXJkM1NQS0VLSXFLVzVyQVlockpvZFdaTlpHaktWR2J2aVNDeXE0T1hidXFZUnErTGFINjJYLzA4QUtFUWtSZHkvQjdtYytqOThVWFJCS1dhQkozRkk5TVk4OGlqQ3puSlNpeXViUG5tdnFvSW5Qei9qMXljL0F5S3ZQN3hqM0lHYnRJNjRUL3ZZZTJqRjNXTjgrRW1LYW41cE1oUHA5eWF1aTAzdlNwK1pHLzlEQUg4WVZQMUwzdjYzSGFsNi9vNzh5dDg0ZEsySzN4dEVFQlhIbnYvMmpJZTFEL253b2ZHSEg1TEVqUitmY2VCNkxkZHFuL0hxemRzL1hVYXhQcVpKc2VtQTlGZjgrV2NBL2haZTQydURvZ1dYUzQxN3BraDNpazczNHhtS1Y3RnBFLzczNjc4QTYyaXh6S0FOaFVjQUFBQUFTVVZPUks1Q1lJST0iIC8+PGJyPkFEVk9DQUNJQS1HRVJBTCBEQSBVTknDg088YnI+Q09OU1VMVE9SSUEtR0VSQUwgREEgVU5Jw4NPPGJyPkPDgk1BUkEgTkFDSU9OQUwgIERFIFNVU1RFTlRBQklMSURBREUgLSBDTlMvREVDT1IvQ0dVPGhyIC8+PC9wPjxwIGNsYXNzPSJjZW50cmFsaXphZG8iPjx1PjxzdHJvbmc+UEFSRUNFUiBuLiAwMDAwMS8yMDIyL0NOUy9DR1U8L3N0cm9uZz48L3U+PC9wPjxwPsKgPC9wPjxwIGNsYXNzPSJlc3F1ZXJkYSI+PHN0cm9uZz5OVVA6IDAwNjg4LjAwMDcyMy8yMDE5LTQ1PC9zdHJvbmc+PC9wPjxwIGNsYXNzPSJlc3F1ZXJkYSI+PHN0cm9uZz5JTlRFUkVTU0FET1M6IERFQ09SPC9zdHJvbmc+PC9wPjxwIGNsYXNzPSJlc3F1ZXJkYSI+PHN0cm9uZz5BU1NVTlRPUzogVU5JREFERSBERSBDT05TRVJWQcOHw4NPIERBIE5BVFVSRVpBPC9zdHJvbmc+PC9wPjxwPsKgPC9wPjxibG9ja3F1b3RlPkVNRU5UQTo8L2Jsb2NrcXVvdGU+PHA+wqA8L3A+PHAgY2xhc3M9Im51bWVyYWRvIj5FbSBicmFuY28uLi48L3A+PHA+wqA8L3A+PHA+w4AgY29uc2lkZXJhw6fDo28gc3VwZXJpb3IuPC9wPjxwPsKgPC9wPjxwPkJyYXPDrWxpYSwgMjUgZGUgamFuZWlybyBkZSAyMDIyLjwvcD48cD7CoDwvcD48cD48cCBjbGFzcz0iY2VudHJhbGl6YWRvIj48Yj5NQU5PRUwgUEFaIEUgU0lMVkEgRklMSE88L2I+PC9wPjxwIGNsYXNzPSJjZW50cmFsaXphZG8iPkFEVk9HQURPIERBIFVOScODTzwvcD48cCBjbGFzcz0iY2VudHJhbGl6YWRvIj5DT09SREVOQURPUjwvcD48L3A+PHA+PGhyPkF0ZW7Dp8OjbywgYSBjb25zdWx0YSBhbyBwcm9jZXNzbyBlbGV0csO0bmljbyBlc3TDoSBkaXNwb27DrXZlbCBlbSBodHRwczovL3N1cGVyc2FwaWVucy5hZ3UuZ292LmJyIG1lZGlhbnRlIG8gZm9ybmVjaW1lbnRvIGRvIE7Dum1lcm8gw5puaWNvIGRlIFByb3RvY29sbyAoTlVQKSAwMDY4ODAwMDcyMzIwMTk0NSBlIGRhIGNoYXZlIGRlIGFjZXNzbyAyNjllNzhlNDwvcD4KPC9ib2R5Pgo8L2h0bWw+Cg==",
    "tamanho": 13372,
    "nivelComposicao": 3,
    "mimetype": "text/html",
    "extensao": "html",
    "editavel": true,
    "convertidoPdf": false,
    "assinado": false,
    "highlights": "",
    "id": 806523202,
    "uuid": "dc940e35-985b-43b0-9208-66270bad646b",
    "criadoEm": "2022-01-25T12:12:08",
    "atualizadoEm": "2022-01-25T12:12:08"
    }
     * @param id_tarefa
     * @param tipo {String} So deve ser usado quando nao definido o id_modelo. Serve para dizer qual o tipo de peca juridica, se despacho, nota, cota, ata, termo ou informacoes
     * @param id_modelo {Number} Se definido o id_modelo, ele vai ignorar o que estiver em tipo
     * @returns {{params: {}, url}}
     */
    criar_minuta(id_tarefa, tipo="parecer", id_modelo=null) {
        /*
        parecer, id = 5
        nota, id = 2
        nota juridica, id = 27890
        cota, id = 3
        ata, id = 2159
        termo, id = 340
        informacoes em mandado de seguranca, id = 2122
        memória de reunião, id = 22165
         */
        if (!id_modelo) // So vai utilizar o tipo se nao houver antes a definicao do id_modelo de peca em String
            switch (tipo) {
                case 'despacho':
                    id_modelo = 1;
                    break;
                case 'nota':
                    id_modelo = 2;
                    break;
                case 'cota':
                    id_modelo = 3;
                    break;
                case 'ata':
                    id_modelo = 2159;
                    break;
                case 'termo':
                    id_modelo = 340;
                    break;
                case 'informacoes':
                case 'informações':
                    id_modelo = 2122;
                    break;
                default:
                    id_modelo = 5; // Parecer
            }
        if (!Number.isInteger(id_tarefa)) throw new Error('id_tarefa nao eh inteiro');
        if (!Number.isInteger(id_modelo)) throw new Error('id_modelo nao eh inteiro');
        return this.transform({
            url: `/v1/administrativo/componente_digital`,
            params: {
                post: {
                    "fileName":"MODELO EM BRANCO.html",
                    "hash":null,
                    "numeracaoSequencial":null,
                    "conteudo":null,
                    "tamanho":null,
                    "nivelComposicao":null,
                    "softwareCriacao":null,
                    "chaveInibidor":null,
                    "dataHoraSoftwareCriacao":null,
                    "versaoSoftwareCriacao":null,
                    "mimetype":null,
                    "dataHoraLockEdicao":null,
                    "usernameLockEdicao":null,
                    "extensao":null,
                    "processoOrigem":null,
                    "documentoOrigem":null,
                    "tarefaOrigem":id_tarefa,
                    "documentoAvulsoOrigem":null,
                    "editavel":null,
                    "convertidoPdf":null,
                    "modalidadeAlvoInibidor":null,
                    "modalidadeTipoInibidor":null,
                    "modelo":id_modelo,
                    "documento":null,
                    "tipoDocumento":null
                },
                populate: [],
                context: {}
            }
        });
    }

    salvar_componente_digital(id_comp, html, hash_antigo) {
        if (!Number.isInteger(id_comp)) throw new Error('id_comp nao eh inteiro');
        return this.transform({
            url: `v1/administrativo/componente_digital/${id_comp}`,
            params: {
                patch: {
                    "conteudo": `data:text/html;base64,${atob(html)}`, // btoa só funciona bem com strings de tamanho de 8 bits, como o UTF-8.
                    "hashAntigo": hash_antigo
                }
            }
        });
    }

    /**
     * É para ser usado com uma tarefa alterada já recebida do servidor.
     * RESPOSTA DO SERVIDOR:
     {
        "@type": "Tarefa",
        "@id": "/v1/administrativo/tarefa/127535197",
        "@context": "/api/doc/#model-Tarefa",
        "observacao": "OBS",
        "urgente": false,
        "dataHoraInicioPrazo": "2022-02-03T16:00:00",
        "dataHoraFinalPrazo": "2022-02-08T20:00:00",
        "redistribuida": false,
        "distribuicaoAutomatica": false,
        "livreBalanceamento": false,
        "tipoDistribuicao": 0,
        "id": 127535197,
        "uuid": "b33e9db4-233e-4d6a-b30e-26b87994dfed",
        "criadoEm": "2022-02-03T15:28:17",
        "atualizadoEm": "2022-02-04T14:12:18"
    }
     * @param tarefa
     * @returns {{params: {}, url}}
     */
    put_editar_tarefa(tarefa) {
        if (!Number.isInteger(tarefa?.processo?.id)) throw new Error("tarefa.processo.id nao eh numero");
        if (!Number.isInteger(tarefa?.usuarioResponsavel?.id)) throw new Error("tarefa.usuarioResponsavel.id nao eh numero");
        if (!Number.isInteger(tarefa?.setorOrigem?.id)) throw new Error("tarefa.setorOrigem.id nao eh numero");
        if (!Number.isInteger(tarefa?.setorResponsavel?.id)) throw new Error("tarefa.setorResponsavel.id nao eh numero");
        if (!this.valida_data_hora(tarefa?.dataHoraInicioPrazo)) throw new Error("tarefa.dataHoraInicioPrazo invalido");
        if (!this.valida_data_hora(tarefa?.dataHoraFinalPrazo)) throw new Error("tarefa.dataHoraFinalPrazo invalido");
        const inicio = this.valida_data_hora(tarefa?.dataHoraInicioPrazo);
        const fim = this.valida_data_hora(tarefa?.dataHoraFinalPrazo);
        inicio.setHours(0,0,0,0);
        fim.setHours(0,0,0,0);
        const prazoDias = MFt.dates.daydiff(inicio, fim);
        return this.transform({
            url: `/v1/administrativo/tarefa/${tarefa.id}`,
            params: {
                put: {
                    "postIt":tarefa?.postIt || null,
                    "urgente":!(!tarefa.urgente),
                    "observacao":tarefa.observacao || "",
                    "localEvento":null,
                    "dataHoraInicioPrazo":tarefa.dataHoraInicioPrazo,
                    "dataHoraFinalPrazo":tarefa.dataHoraFinalPrazo,
                    "dataHoraLeitura":null,
                    "dataHoraDistribuicao":null,
                    "processo":tarefa.processo.id,
                    "workflow":null,
                    "especieTarefa":tarefa.especieTarefa.id,
                    "usuarioResponsavel":tarefa.usuarioResponsavel.id,
                    "setorOrigem":tarefa.setorOrigem.id,
                    "setorResponsavel":tarefa.setorResponsavel.id,
                    "distribuicaoAutomatica":!(!tarefa.distribuicaoAutomatica),
                    "folder":null,
                    "diasUteis":null,
                    prazoDias,
                    "blocoProcessos":null,
                    "processos":null,
                    "blocoResponsaveis":null,
                    "grupoContato":null,
                    "usuarios":null,
                    "setores":null
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Obtém os mesmos dados exibidos na parte de dados básicos do processo
     * @param id_minuta {Number}
     * @returns {{params: {}, url}}
     */
    apagar_minuta(id_minuta) {
        if (!Number.isInteger(id_minuta)) this.erro_fatal('ID da minuta precisa ser numero');
        return this.transform({
            url: `/v1/administrativo/documento/${id_minuta}`,
            params: {
                delete: {

                },
                context: {}
            }
        });
    }

    /**
     * PRECISA DO base64binary.js
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
            if (!window?.base64DecToArr) {
                throw new Error("Para html_from_conteudo() funcionar, é necessário o base64binary.js");
            }
            return base64DecToArr(dados);
        }
        if (typeof compDigital?.conteudo !== 'string') {
            console.group('ERRO NO CONTEUDO DO COMPONENTE DIGITAL');
            console.error(compDigital);
            console.groupEnd();
            return '';
        }
        return new TextDecoder().decode(dataFromConteudo(compDigital.conteudo));
    }

    base64EncodeUnicode(str) {
        /*
        A conversão para Base64 funciona bem com o btoa(), só que essa função não funciona em alguns HTMLs com problemas de caracteres codificados errados. Por isso, preciso usar esta. Tem uma explicação sobre este código nas minhas anotações.
         */
        const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        });
        return btoa(utf8Bytes);
    }

    /**
     * CRIA UM MARCADOR EM UM PDF
     * @param nome
     * @param descricao
     * @param pagina
     * @param id_comp
     * @param id_proc
     * @param id_juntada
     * @param corHexadecimal
     * @returns {{params: {}, url}}
     *
     * RETORNO DO SUPER:
     {@type: "Bookmark", @id: "/v1/administrativo/bookmark/1081", @context: "/api/doc/#model-Bookmark",…}
     @context: "/api/doc/#model-Bookmark"
     @id: "/v1/administrativo/bookmark/1081"
     @type: "Bookmark"
     atualizadoEm: "2022-03-22T13:47:19"
     componenteDigital: {@type: "ComponenteDigital", @id: "/v1/administrativo/componente_digital/837876590",…}
     corHexadecimal: "#2196F3"
     criadoEm: "2022-03-22T13:47:19"
     id: 1081
     juntada: {@type: "Juntada", @id: "/v1/administrativo/juntada/1414806827", @context: "/api/doc/#model-Juntada",…}
     nome: "JUSTIFICATIVAS TÉCNICAS RELEVANTES"
     pagina: 66
     uuid: "d3b4e749-c497-46db-8b8d-d8ce49592776"
     */
    post_criar_marcador(nome, descricao, pagina, id_comp, id_proc, id_juntada, corHexadecimal="#2196F3") {
        if (!Number.isInteger(pagina)) throw new Error('Erro pagina');
        if (!Number.isInteger(id_comp)) throw new Error('Erro id_comp');
        if (!Number.isInteger(id_proc)) throw new Error('Erro id_proc');
        if (!Number.isInteger(id_juntada)) throw new Error('Erro id_juntada');
        if (typeof corHexadecimal !== 'string' || !corHexadecimal) throw new Error('Erro cor');
        if (typeof nome !== 'string' || !nome) throw new Error('Erro nome');
        if (!descricao) descricao = '';
        return this.transform({
            url: `/v1/administrativo/bookmark`,
            params: {
                post: {
                    nome,
                    descricao,
                    pagina,
                    componenteDigital:id_comp,
                    processo:id_proc,
                    juntada: id_juntada,
                    usuario:null,
                    corHexadecimal
                },
                populate: ["componenteDigital","juntada"],
                context: {}
            }
        });
    }

    /**
     * APOS APAGAR, SE FOR REESCREVER O MARCADOR, DÊ UM TEMPO PARA QUE OCORRA A ALTERAÇÃO NO BANCO DE DADOS DO SUPER
     * @param id_marcador
     * @returns {{params: {}, url}}
     * RESPOSTA DO SERVIDOR:
     @context: "/api/doc/#model-Bookmark"
     @id: "/v1/administrativo/bookmark/1166"
     @type: "Bookmark"
     apagadoEm: "2022-03-22T14:54:47"
     atualizadoEm: "2022-03-22T14:48:05"
     corHexadecimal: "#FAFAFA"
     criadoEm: "2022-03-22T14:48:05"
     id: 1166
     nome: "Conformidade Ambiental"
     pagina: 197
     uuid: "727a72cd-dbc3-4871-8c09-d05fcf9eb41e"
     */
    delete_marcador(id_marcador) {
        if (!Number.isInteger(id_marcador)) throw new Error('Erro id_marcador');
        return this.transform({
            url: `/v1/administrativo/bookmark/${id_marcador}`,
            params: {
                delete: {},
                context: {}
            }
        });
    }

    /**
     *
     * @param id_proc
     * @returns {{params: {}, url}}
     * RESPOSTA DO SERVIDOR:
     @context: "/api/doc/#model-Bookmark"
     @id: "/v1/administrativo/bookmark/1081"
     @type: "Bookmark"
     atualizadoEm: "2022-03-22T13:47:19"
     componenteDigital: {@type: "ComponenteDigital", @id: "/v1/administrativo/componente_digital/837876590",…}
     corHexadecimal: "#2196F3"
     criadoEm: "2022-03-22T13:47:19"
     id: 1081
     juntada: {@type: "Juntada", @id: "/v1/administrativo/juntada/1414806827", @context: "/api/doc/#model-Juntada",…}
     nome: "JUSTIFICATIVAS TÉCNICAS RELEVANTES"
     pagina: 66
     uuid: "d3b4e749-c497-46db-8b8d-d8ce49592776"
     */
    get_marcadores(id_proc) {
        if (!Number.isInteger(id_proc)) throw new Error('Erro id_proc');
        return this.transform({
            url: `/v1/administrativo/bookmark`,
            params: {
                where: {"processo.id":`eq:${id_proc}`},
                limit: 500,
                offset: 0,
                order: {"juntada.numeracaoSequencial":"DESC","pagina":"ASC"},
                populate: ["juntada","componenteDigital"],
                context: {},
            }
        });
    }

    /**
     * NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA NAO FUNCIONA
     * @param id_proc
     * @param pagina
     * @param id_juntada
     * @param id_comp
     * @returns {{params: {}, url}}
     * RESPOSTA DO SERVIDOR:
     {"message":"No mapping found for field 'juntada' on class 'SuppCore\\AdministrativoBackend\\Entity\\Bookmark'.","code":400,"status":400}
     */
    get_marcador_especifico(id_proc, pagina, id_juntada, id_comp) {
        console.log(id_proc, pagina, id_juntada, id_comp);
        if (!Number.isInteger(id_proc)) throw new Error('Erro id_proc');
        if (!Number.isInteger(pagina)) throw new Error('Erro pagina');
        if (!Number.isInteger(id_juntada)) throw new Error('Erro id_juntada');
        if (!Number.isInteger(id_comp)) throw new Error('Erro id_comp');
        return this.transform({
            url: `/v1/administrativo/bookmark`,
            params: {
                where: {"processo.id":`eq:${id_proc}`, "pagina":`eq:${pagina}`, "juntada":`eq:${id_juntada}`, "componente":`eq:${id_comp}`},
                limit: 500,
                offset: 0,
                order: {},
                populate: ["juntada","componenteDigital"],
                context: {},
            }
        });
    }

    delete_tarefa(id_tarefa) {
        if (!Number.isInteger(id_tarefa)) throw new Error('Erro ID Tarefa');
        return this.transform({
            url: `/v1/administrativo/tarefa/${id_tarefa}`,
            params: {
                delete: {

                },
                context: {}
            }
        });
    }

    patch_tarefa_lida(id_tarefa) {
        if (!Number.isInteger(id_tarefa)) throw new Error('Erro ID Tarefa');
        return this.transform({
            url: `/v1/administrativo/tarefa/${id_tarefa}/toggle_lida`,
            params: {
                patch: {

                },
                context: {}
            }
        });
    }

    get_tipo_documento(termos, offset=0, limit=this.max_itens) {
        termos = termos || '';
        const termos_separados = termos.split(' ').filter(d=>d.length>2);
        const operadores = termos_separados.map(d=>{return {nome:`like:%${d}%`}});
        let retorno = {
            url: `/v1/administrativo/tipo_documento`,
            params: {
                options: {

                },
                limit,
                offset,
                order: {},
                populate: [],
                context: {},
            }
        };
        if (termos_separados.length) {
            retorno.params.options.where = {"andX":operadores};
        }
        else {
            retorno.params.options.where = {"id":"gt:0"}; // greater than zero
        }
        return this.transform(retorno);
    }

    /**
     * Serve para o upload de um input.file, mas o conteúdo já precisa estar em base64 e
     * precisa-se de um documento de origem para vincular.
     * @param file input.files[0]
     * @param base64 Conteúdo do arquivo em base64
     * @param documentoOrigem id do documento para vincular no Super
     * @param tipoDocumento tipo de documento no Super. 403=ANEXO
     * @returns {{params: {}, url}}
     */
    upload_file(file, base64, documentoOrigem, tipoDocumento=403) {
        const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
        if (Object.prototype.toString.call(file) !== '[object File]') {
            alert("Parâmetro passado não é arquvo");
            throw "Parâmetro passado não é arquivo";
        }
        if (!Number.isInteger(documentoOrigem)) {
            alert("Documento de origem ID não é inteiro");
            throw "Documento de origem ID não é inteiro";
        }
        if (!tiposPermitidos.some(d=>file.type === d)) {
            alert("Arquivo não é do tipo permitido");
            throw "Arquivo não é do tipo permitido";
        }
        if (file.size > 9999999) {
            alert("Arquivo excede tamanho máximo permitido");
            throw "Arquivo excede tamanho máximo permitido";
        }
        let retorno = {
            url: `/v1/administrativo/componente_digital`,
            params: {
                post: {
                    chaveInibidor: null,
                    componenteDigitalOrigem: null,
                    conteudo: base64,
                    convertidoPdf: null,
                    dataHoraLockEdicao: null,
                    dataHoraSoftwareCriacao: null,
                    documento: null,
                    documentoAvulsoOrigem: null,
                    documentoAvulsoOrigemBloco: null,
                    documentoOrigem: documentoOrigem,
                    editavel: null,
                    fileName: this.consertar_nome_arquivo(file.name),
                    hash: null,
                    mimetype: file.type,
                    modalidadeAlvoInibidor: null,
                    modalidadeTipoInibidor: null,
                    modelo: null,
                    nivelComposicao: null,
                    numeracaoSequencial: null,
                    processoOrigem: null,
                    softwareCriacao: null,
                    tamanho: file.size,
                    tarefaOrigem: null,
                    tarefaOrigemBloco: null,
                    tipoDocumento: tipoDocumento,
                    usernameLockEdicao: null,
                    versaoSoftwareCriacao: null
                },
                populate: ["documento", "documento.tipoDocumento"],
            }
        };
        return this.transform(retorno);
    }

    /**
     * Apaga um relatório espepcífico a partir do seu ID
     * @param id_relatorio {Number}
     * @returns {{params: {}, url}}
     */
    apagar_relatorio(id_relatorio) {
        if (!Number.isInteger(id_relatorio)) this.erro_fatal('ID do relatorio precisa ser numero');
        return this.transform({
            url: `/v1/administrativo/relatorio/${id_relatorio}`,
            params: {
                delete: {

                },
                context: {}
            }
        });
    }

    /**
     *
     * @param id_setor {Number}
     * @param dataInicio {Date}
     * @param dataFim {Date}
     * @returns {{params: {}, url}}
     */
    get_relatorio_tarefas_distribuidas_para_setor(id_setor, dataInicio, dataFim) {
        /*
        Gênero: Operacional, Espécie: Tarefas, Tipo Relatório: Tarefas Distribuídas para um setor em um período de tempo (detalhado)
        EXEMPLO DE RESPOSTA:
        {
            "@type": "Relatorio",
            "@id": "/v1/administrativo/relatorio/2962323",
            "@context": "/api/doc/#model-Relatorio",
            "id": 2962323,
            "uuid": "bf1fc320-2b7d-4dfe-9dc2-f13a9d380073",
            "criadoEm": "2022-11-03T15:53:59",
            "atualizadoEm": "2022-11-03T15:53:59"
        }

        PARTE DO POST QUE NÃO PRECISA SE ENCONTRA ABAIXO
        generoRelatorio: {
                        nome: "OPERACIONAL",
                        descricao: "OPERACIONAL",
                        especiesRelatorios: null,
                        "@type": "GeneroRelatorio",
                        "@id": "/v1/administrativo/genero_relatorio/3",
                        "@context": "/api/doc/#model-GeneroRelatorio",
                        uuid: "359ca159-3a2b-4111-a1a0-00d98cf0f64b",
                        ativo: true,
                        criadoEm: "2013-10-18T15:00:17",
                        atualizadoEm: "2013-10-18T15:00:17"
                    },
                    especieRelatorio: {
                        "nome":"TAREFAS",
                        "ativo":true,
                        "descricao":"TAREFA",
                        "generoRelatorio":null,
                        "@type":"EspecieRelatorio",
                        "@id":"/v1/administrativo/especie_relatorio/2",
                        "@context":"/api/doc/#model-EspecieRelatorio",
                        "uuid":"266e0e8e-5ada-4243-b3b3-0694bfdba38d",
                        "criadoEm":"2013-11-05T11:33:23",
                        "atualizadoEm":"2013-11-05T11:33:23"
                    },
                    unidade: {
                        "especieSetor":null,
                        "generoSetor":null,
                        "ativo":true,
                        "modalidadeOrgaoCentral":null,
                        "endereco":null,
                        "email":null,
                        "sigla":"CJU-PI",
                        "unidade":null,
                        "parent":null,
                        "unidadePai":null,
                        "municipio":null,
                        "prefixoNUP":"00456",
                        "sequenciaInicialNUP":1000,
                        "gerenciamento":null,
                        "apenasProtocolo":true,
                        "numeracaoDocumentoUnidade":true,
                        "apenasDistribuidor":false,
                        "distribuicaoCentena":false,
                        "prazoEqualizacao":7,
                        "divergenciaMaxima":10,
                        "apenasDistribuicaoAutomatica":true,
                        "comPrevencaoRelativa":true,
                        "hasChild":true,
                        "children":null,
                        "expandable":null,
                        "level":null,
                        "@type":"setor",
                        "@id":"/v1/administrativo/setor/216",
                        "@context":"/api/doc/#model-setor",
                        "expansable":true,
                        "nome":"CONSULTORIA JURÍDICA DA UNIÃO NO ESTADO DO PIAUÍ"
                    }
         */
        if (!Number.isInteger(id_setor)) throw new Error("ID Setor nao numero");
        if (!(dataInicio instanceof Date)) throw new Error("Data Inicio nao Date()");
        if (!(dataFim instanceof Date)) throw new Error("Data Fim nao Date()");
        const dataHoraInicio = this.date2super(dataInicio);
        const dataHoraFim = this.date2super(dataFim)
        const jsonParametros = JSON.stringify({
            "setor":{
                "name":"setor",
                "value":id_setor,
                "type":"entity",
                "class":"SuppCore\\AdministrativoBackend\\Entity\\Setor",
                "getter":"getNome"
            },
            "dataHoraInicio":{
                "name":"dataHoraInicio",
                "value":dataHoraInicio,
                "type":"dateTime"
            },
            "dataHoraFim":{
                "name":"dataHoraFim",
                "value":dataHoraFim,
                "type":"dateTime"
            }
        });
        let retorno = {
            url: `/v1/administrativo/relatorio`,
            params: {
                post: {
                    dataHoraFim: null,
                    dataHoraInicio: null,
                    documento: null,
                    formato: "html",
                    observacao: null,
                    parametros: jsonParametros,
                    setor: null,
                    status: null,
                    tipoRelatorio: 367,

                },
                populate: ["populateAll","documento","documento.tipoDocumento","documento.componentesDigitais","documento.vinculacoesDocumentos","documento.vinculacoesDocumentos.documentoVinculado","documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento","documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais","vinculacoesEtiquetas","vinculacoesEtiquetas.etiqueta"],
                context: {},
            }
        };
        return this.transform(retorno);
    }

    /**
     * OBSERVAÇÃO: NECESSÁRIO ESPERAR UM TEMPO APÓS A SOLICITAÇÃO DE CRIAÇÃO DO RELATÓRIO, DO CONTRÁRIO O DOCUMENTO NÃO É INFORMADO
     * Fornece os detalhes de um relatório, tal como o Componente Digital para se ter acesso ao conteúdo
     * @param id_relatorio
     * @returns {{params: {}, url}}
     */
    get_relatorio_info(id_relatorio) {
        if (!Number.isInteger(id_relatorio)) throw new Error('Erro id_relatorio');
        return this.transform({
            url: `/v1/administrativo/relatorio/${id_relatorio}`,
            params: {
                populate: ["populateAll","documento","documento.tipoDocumento","documento.componentesDigitais","documento.vinculacoesDocumentos","documento.vinculacoesDocumentos.documentoVinculado","documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento","documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais","vinculacoesEtiquetas","vinculacoesEtiquetas.etiqueta"],
                context: {},
                order: {}
            }
        });
    }

    get_assinar_documento(id_comp, senha) {
        if (!Number.isInteger(id_comp)) {
            alert("Erro no ID do Componente Digital");
            throw "Erro no ID do Componente Digital";
        }
        if (!senha) {
            alert("Senha vazia");
            throw "Senha vazia";
        }
        let retorno = {
            url: `/v1/administrativo/assinatura`,
            params: {
                post: {
                    algoritmoHash: 'A1',
                    assinadoPor: null,
                    assinatura: 'A1',
                    cadeiaCertificadoPEM: 'A1',
                    cadeiaCertificadoPkiPath: 'A1',
                    componenteDigital: id_comp,
                    dataHoraAssinatura: null,
                    plainPassword: `Idap://${senha}` // Uso da senha de autenticação da Rede AGU
                    /*
                     Quando se usa a senha interna do Super, a "key" deve ser enviada assim:
                     plainPassword: `interno://${senha}` // Uso da senha do próprio Super
                     */
                },
                populate: [],
                context: {},
            }
        };
        return this.transform(retorno);
    }

    /**
     * Calcula a quantidade de dias entre duas datas
     * @param d1 {Date} Inicio
     * @param d2 {Date} Fim
     * @returns {number}
     */
    static calcular_prazo_intervalo(d1, d2) {
        const diff = (first, second)=>{
            let f = new Date(first.valueOf());
            let s = new Date(second.valueOf());
            f.setUTCHours(0,0,0);
            s.setUTCHours(0,0,0);
            return Math.round((s-f)/(1000*60*60*24));
        }
        if (!(d1 instanceof Date)) throw new Error("d1 nao instancia de Date()");
        if (!(d2 instanceof Date)) throw new Error("d2 nao instancia de Date()");
        return diff(d1, d2);
    }


    /**
     {
     "entities": [
     {
     "@type": "Modelo",
     "@id": "/v1/administrativo/modelo/664559",
     "@context": "/api/doc/#model-Modelo",
     "modalidadeModelo": {
     "@type": "ModalidadeModelo",
     "@id": "/v1/administrativo/modalidade_modelo/3",
     "@context": "/api/doc/#model-ModalidadeModelo",
     "id": 3,
     "uuid": "b251322e-7e2b-4ca6-b663-bd9ad7c871f6",
     "valor": "LOCAL",
     "descricao": "LOCAL",
     "ativo": true,
     "criadoEm": "2021-02-06T23:39:07",
     "atualizadoEm": "2021-02-06T23:39:07"
     },
     "documento": {
     "@type": "Documento",
     "@id": "/v1/administrativo/documento/2106902722",
     "@context": "/api/doc/#model-Documento",
     "areasTrabalhos": [],
     "numeroFolhas": 0,
     "semEfeito": false,
     "assinado": false,
     "tipoDocumento": {
     "@type": "EspecieDocumento",
     "@id": "/v1/administrativo/especie_documento/33",
     "@context": "/api/doc/#model-EspecieDocumento",
     "id": 33,
     "uuid": "d32654e0-f804-4e40-813d-4241967f0d9a",
     "nome": "PARECER",
     "sigla": "PAREC",
     "descricao": "PARECER",
     "ativo": true,
     "criadoEm": "2013-02-14T23:12:29",
     "atualizadoEm": "2021-03-29T10:35:44"
     },
     "copia": false,
     "minuta": true,
     "componentesDigitais": [
     {
     "@type": "ComponenteDigital",
     "@id": "/v1/administrativo/componente_digital/1288130783",
     "@context": "/api/doc/#model-ComponenteDigital",
     "fileName": "PARECER.HTML",
     "hash": "2abcd684f588c9e7e76505472944bd43d7ed69732dfa9d0b83679b50211b9bba",
     "numeracaoSequencial": 1,
     "interacoes": 2535,
     "tamanho": 19,
     "nivelComposicao": 3,
     "mimetype": "text/html",
     "dataHoraLockEdicao": "2023-10-17T15:27:41",
     "usernameLockEdicao": "01533023050",
     "extensao": "html",
     "editavel": true,
     "convertidoPdf": false,
     "assinado": false,
     "statusVerificacaoVirus": 0,
     "highlights": "",
     "id": 1288130783,
     "uuid": "1f51b831-55d5-4727-84d5-7663ccb40608",
     "criadoEm": "2023-09-22T11:07:57",
     "atualizadoEm": "2023-10-17T15:27:41"
     }
     ],
     "chaveAcesso": "6adb4c69",
     "acessoRestrito": false,
     "id": 2106902722,
     "uuid": "5253a0f9-de84-4e59-be0e-0ca06ba3dbb2",
     "criadoEm": "2023-09-22T11:07:57",
     "atualizadoEm": "2023-09-22T11:07:57",
     "criadoPor": {
     "@type": "Usuario",
     "@id": "/v1/administrativo/usuario/5645",
     "@context": "/api/doc/#model-Usuario",
     "username": "01533******",
     "nome": "CHARLON LUIS ZALEWSKI",
     "assinaturaHTML": "CHARLON LUIS ZALEWSKI\nAdvogado da Uni\u00e3o \nConsultor Jur\u00eddico da Uni\u00e3o em Santa Catarina\nCoordenador da e-CJU Engenharia\n[charlon.zalewski@agu.gov.br]",
     "email": "charlon.zalewski@agu.gov.br",
     "enabled": true,
     "nivelAcesso": 1,
     "roles": [],
     "coordenadores": [],
     "validado": true,
     "reset": false,
     "isDisponivel": true,
     "passwordAtualizadoEm": "2023-01-11T08:59:52",
     "id": 5645,
     "uuid": "69a063b7-2d21-4c4d-8d3f-77c434b72462",
     "atualizadoEm": "2023-12-26T19:30:55"
     }
     },
     "highlights": "",
     "vinculacoesModelos": [
     {
     "@type": "VinculacaoModelo",
     "@id": "/v1/administrativo/vinculacao_modelo/475897",
     "@context": "/api/doc/#model-VinculacaoModelo",
     "especieSetor": {
     "@type": "EspecieSetor",
     "@id": "/v1/administrativo/especie_setor/36",
     "@context": "/api/doc/#model-EspecieSetor",
     "id": 36,
     "uuid": "f89095e7-db2b-4246-b23b-faab7acfe290",
     "nome": "LICITA\u00c7\u00d5ES, CONTRATOS E PATRIM\u00d4NIO P\u00daBLICO",
     "descricao": "LICITA\u00c7\u00d5ES, CONTRATOS E PATRIM\u00d4NIO P\u00daBLICO",
     "ativo": true,
     "criadoEm": "2013-02-14T23:11:43",
     "atualizadoEm": "2021-05-24T12:00:46"
     },
     "id": 475897,
     "uuid": "712673ed-32e9-469a-b539-32e6cf74b593",
     "criadoEm": "2023-10-14T13:18:16",
     "atualizadoEm": "2023-10-14T13:18:16"
     },
     {
     "@type": "VinculacaoModelo",
     "@id": "/v1/administrativo/vinculacao_modelo/437839",
     "@context": "/api/doc/#model-VinculacaoModelo",
     "unidade": {
     "@type": "setor",
     "@id": "/v1/administrativo/setor/87459",
     "@context": "/api/doc/#model-setor",
     "ativo": true,
     "sigla": "E-CJU/ENGENHARIA",
     "expansable": true,
     "prefixoNUP": "00688",
     "sequenciaInicialNUP": 1,
     "divergenciaMaxima": 25,
     "gerenciamento": true,
     "apenasProtocolo": true,
     "numeracaoDocumentoUnidade": true,
     "apenasDistribuidor": false,
     "distribuicaoCentena": false,
     "prazoEqualizacao": 7,
     "apenasDistribuicaoAutomatica": true,
     "comPrevencaoRelativa": true,
     "hasChild": true,
     "id": 87459,
     "uuid": "dcc0dcc0-5e6f-4c12-bb0f-346721d1c57b",
     "nome": "CONSULTORIA JUR\u00cdDICA DA UNI\u00c3O ESPECIALIZADA VIRTUAL DE OBRAS E SERVI\u00c7OS DE ENGENHARIA",
     "criadoEm": "2020-06-05T17:57:57",
     "atualizadoEm": "2024-01-03T14:17:19"
     },
     "id": 437839,
     "uuid": "55514951-bc2a-4736-b600-e69b3f4a660d",
     "criadoEm": "2023-09-22T11:07:57",
     "atualizadoEm": "2023-09-22T11:07:57"
     }
     ],
     "ativo": true,
     "id": 664559,
     "uuid": "68557d88-5a94-4d4e-a875-87bc3bd93dc3",
     "nome": "PARECER LICITA\u00c7\u00c3O OBRAS OU SERVI\u00c7OS DE ENGENHARIA - PREG\u00c3O OU CONCORR\u00caNCIA - LEI 14133 V1 (ECJU_ENG)",
     "descricao": "N\u00c3O ABRANGE ESPECIFICIDADES DE MANUTEN\u00c7\u00c3O PREDIAL",
     "criadoEm": "2023-09-22T11:07:57",
     "atualizadoEm": "2023-10-17T15:17:37"
     },
     ...
     ],
     "total": 5
     }
     * Pesquisa por toda a base de modelos do SuperSapiens a partir dos termos dados
     * @param termos
     * @param valor {string} Valores: INDIVIDUAL, UNIDADE, SETOR, EM BRANCO, NACIONAL
     * @param limit
     * @returns {{params: {}, url}}
     */
    get_modelos(termos, valor, limit=100) {
        if (termos.trim().length === 0) throw new Error('Sem termos de pesquisa');
        const partes = termos.split(' ');
        const andX = (()=>{
            let ret = [];
            for(let p of partes) {
                ret.push({"nome":`like:%${p}%`});
            }
            return ret;
        })();
        if (valor) {
            console.group('PESQUISA DE MODELOS');
            console.log(`TIPO: ${valor}`);
            console.log(this.profile);
            const unidades = (()=>{
                let ret = [];
                if (!Array.isArray(this?.profile?.colaborador?.lotacoes)) return '';
                for(let indice in this.profile.colaborador.lotacoes) {
                    const lotacao = this.profile.colaborador.lotacoes[indice];
                    if (Number.isInteger(lotacao?.setor?.unidade?.id)) ret.push(lotacao?.setor?.unidade?.id);
                }
                return ret.join(',');
            })();
            const especieSetor = (()=>{
                let ret = [];
                if (!Array.isArray(this?.profile?.colaborador?.lotacoes)) return '';
                for(let indice in this.profile.colaborador.lotacoes) { // this.profile.colaborador.lotacoes is array like, but is considered an Object
                    const lotacao = this.profile.colaborador.lotacoes[indice];
                    if (Number.isInteger(lotacao?.setor?.especieSetor?.id)) ret.push(lotacao?.setor?.especieSetor?.id);
                }
                return ret.join(',');
            })();
            switch (valor.toLowerCase()) {
                case 'individual':
                    andX.push({
                        "modalidadeModelo.valor":`eq:${valor.toUpperCase()}`,
                        "vinculacoesModelos.usuario.id":`eq:${this.profile.id}`
                    });
                    break;
                case 'unidade':
                    andX.push({
                        "modalidadeModelo.valor":`eq:LOCAL`,
                        "vinculacoesModelos.unidade.id":`in:${unidades}`
                    });
                    break;
                case 'setor':
                    andX.push({
                        "modalidadeModelo.valor":`eq:LOCAL}`,
                        "vinculacoesModelos.setor.unidade.id":`in:${unidades}`,
                        "vinculacoesModelos.setor.especieSetor.id":`in:${especieSetor}`
                    });
                    break;
                case 'em branco':
                    andX.push({
                        "modalidadeModelo.valor":`eq:EM BRANCO`
                    });
                    break;
                case 'nacional':
                    andX.push({
                        "modalidadeModelo.valor":`eq:NACIONAL`,
                        "vinculacoesModelos.modalidadeOrgaoCentral.valor":"in:SGA,EAGU,CGU,CGU,PGF",
                        "vinculacoesModelos.especieSetor.id":`in:${especieSetor}`
                    });
                    break;
                default:
                    console.groupEnd();
                    throw new Error('Caso indefinido em get_modelos()');
            }
            console.groupEnd();
        }
        return this.transform({
            url: `/v1/administrativo/modelo/search`,
            params: {
                where: {"andX":andX}, //where: {"andX":[{"nome":`like:%${termos}%`}]},
                limit,
                offset: 0,
                order: {},
                populate: ["documento","documento.tipoDocumento","documento.componentesDigitais","documento.criadoPor","modalidadeModelo","vinculacoesModelos","vinculacoesModelos.unidade","vinculacoesModelos.especieSetor"],
                context: {},
            }
        });
    }

    getTiposQualificacaoPessoas() {
        return this.transform({
            url: `/v1/administrativo/modalidade_qualificacao_pessoa`,
            params: {
                populate: [],
                context: {},
                order: {},
                where: {},
                limit: 100,
                offset: 0,
            }
        });
    }

    getBuscarPessoaCPF(cpf) {
        cpf = this.sonumeros(cpf);
        if (!this.conferirCPF(cpf) && !this.conferirCNPJ(cpf)) throw new Error('Campo CPF');
        return this.transform({
            url: `/v1/administrativo/pessoa/search`,
            params: {
                populate: ["populateAll"],
                context: {},
                order: {},
                where: {"andX":[{"numeroDocumentoPrincipal":`eq:${cpf}`}]},
                limit: 10,
                offset: 0,
            }
        });
    }

    /**
     * Obtém as modalidades pelas quais uma pessoa se vincula a um processo, ex.: requerente, requerido, interessado...
     * @param termos
     * @returns {{params: {}, url}}
     */
    getModalidadeInteressado(termos) {
        if (termos) {
            const tt = this.separar_termos(termos, "valor");
            return this.transform({
                url: `/v1/administrativo/modalidade_interessado`,
                params: {
                    populate: [],
                    context: {},
                    order: {},
                    where: {andX: tt},
                    limit: 100,
                    offset: 0,
                }
            });
        }
        else {
            return this.transform({
                url: `/v1/administrativo/modalidade_interessado`,
                params: {
                    populate: [],
                    context: {},
                    order: {},
                    where: {},
                    limit: 100,
                    offset: 0,
                }
            });
        }
    }

    /**
     * Obtém as QUALIFICAÇÕES de uma pessoa, ex.: pessoa física, pessoa jurídica, órgão de representação...
     * @param termos
     * @returns {{params: {}, url}}
     */
    getQualificacaoPessoa(termos) {
        if (termos) {
            const tt = this.separar_termos(termos, "valor");
            return this.transform({
                url: `/v1/administrativo/modalidade_qualificacao_pessoa`,
                params: {
                    populate: [],
                    context: {},
                    order: {},
                    where: {andX: tt},
                    limit: 100,
                    offset: 0,
                }
            });
        }
        else {
            return this.transform({
                url: `/v1/administrativo/modalidade_qualificacao_pessoa`,
                params: {
                    populate: [],
                    context: {},
                    order: {},
                    where: {},
                    limit: 100,
                    offset: 0,
                }
            });
        }
    }

    /**
     * Adiciona uma pessoa a um processo sob alguma modalidade, ex: requerente, requerido etc...
     * @param id_proc
     * @param id_pessoa
     * @param id_modalidade
     * @returns {{params: {}, url}}
     * {
     *     "@type": "Interessado",
     *     "@id": "/v1/administrativo/interessado/128845163",
     *     "@context": "/api/doc/#model-Interessado",
     *     "id": 128845163,
     *     "uuid": "c9e3a9b0-1b4b-48f7-a928-7587f675f803",
     *     "criadoEm": "2024-05-09T16:58:56",
     *     "atualizadoEm": "2024-05-09T16:58:56"
     * }
     */
    postAdicionarPessoaProcesso(id_proc, id_pessoa, id_modalidade) {
        if (!Number.isInteger(id_proc)) throw new Error('id_proc nao eh inteiro');
        if (!Number.isInteger(id_pessoa)) throw new Error('id_pessoa nao eh inteiro');
        if (!Number.isInteger(id_modalidade)) throw new Error('id_modalidade nao eh inteiro');
        return this.transform({
            url: `/v1/administrativo/interessado`,
            params: {
                post: {
                    modalidadeInteressado: id_modalidade,
                    pessoa: id_pessoa,
                    processo: id_proc,
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Salva uma pessoa no Banco de Dados do Super
     * @dados {object}
     * @returns {{params: {}, url}}
     * Resposta do Backend
     * {
     *     "@type": "Pessoa",
     *     "@id": "/v1/administrativo/pessoa/39853930",
     *     "@context": "/api/doc/#model-Pessoa",
     *     "pessoaValidada": false,
     *     "pessoaConveniada": false,
     *     "nome": "NOME DA PESSOA REGISTRADA",
     *     "numeroDocumentoPrincipal": "NUMERO DO CPF OU CNPJ",
     *     "id": 39853930,
     *     "uuid": "b60085f7-73dd-4aae-8abe-14b5245685e1",
     *     "criadoEm": "2024-05-09T15:02:57",
     *     "atualizadoEm": "2024-05-09T15:02:57"
     * }
     */
    postSalvarPessoa(dados) {
        if (!(dados?.modalidadeQualificacaoPessoa > 0)) throw new Error('Ausente qualificação da pessoa a ser salva');
        let cpf = this.sonumeros(dados?.numeroDocumentoPrincipal || '');
        if (!cpf || !this.conferirCPF(cpf)) throw new Error('Campo CPF/CNPJ inválido');
        if (typeof dados?.nome !== 'string') throw new Error('Nome da pessoa ausente ao salvar');
        if (dados.nome.trim().length === 0) throw new Error('Nome da pessoa vazio');
        return this.transform({
            url: `/v1/administrativo/pessoa`,
            params: {
                post: {
                    contato: dados?.contato || null,
                    dataNascimento: dados?.dataNascimento || null,
                    dataObito: dados?.dataObito || null,
                    modalidadeGeneroPessoa: dados?.modalidadeGeneroPessoa || null,
                    modalidadeQualificacaoPessoa: dados?.modalidadeQualificacaoPessoa || null,
                    nacionalidade: dados?.nacionalidade || null,
                    naturalidade: dados?.naturalidade || null,
                    nome: dados?.nome || null,
                    nomeGenitor: dados?.nomeGenitor || null,
                    nomeGenitora: dados?.nomeGenitora || null,
                    numeroDocumentoPrincipal: cpf || null,
                    pessoaConveniada: dados?.pessoaConveniada || null,
                    pessoaValidada: dados?.pessoaValidada || null,
                    profissao: dados?.profissao || null,
                },
                populate: [],
                context: {}
            }
        });
    }

    /**
     * Procura por um interessado já cadastrado no SuperSapiens
     * Ao contrário do Super que procura a sequência inteira da string dada, eu procuro a existência de cada palavra separada
     * @param termos
     * @returns {{params: {}, url}}
     */
    getPessoa(termos) {
        const tt = this.separar_termos(termos, "nome");
        return this.transform({
            url: `/v1/administrativo/pessoa/search`,
            params: {
                populate: ["populateAll"],
                context: {},
                order: {},
                where: {andX: tt},
                limit: 100,
                offset: 0,
            }
        });
    }

    /**
     * Exclui um interessado de um processo a partir do ID dele no processo
     * @param id_interessado {Number}
     * @returns {{params: {}, url}}
     */
    deleteInteressadoProcesso(id_interessado) {
        if (!Number.isInteger(id_interessado)) this.erro_fatal('ID do interessado precisa ser numero');
        return this.transform({
            url: `/v1/administrativo/interessado/${id_interessado}`,
            params: {
                delete: {

                },
                context: {}
            }
        });
    }
}