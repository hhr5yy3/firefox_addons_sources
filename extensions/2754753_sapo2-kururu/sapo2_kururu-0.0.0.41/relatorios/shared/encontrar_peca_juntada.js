class EncontrarPecaJuntada extends Payloads {
    constructor() {
        super();
        this._log = undefined;
        this._logBloqueadoSuper = undefined;
        this.xml = new RequestMF();
        this.cacheJuntadasDoProcesso = {}; // A chave vai ser o ID do processo e o conteudo vai ser a array de juntadas
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
    }

    set log(func) {
        if (typeof func !== 'function') {
            console.trace();
            throw new Error('Parametro passado nao eh funcao');
        }
        this._log = func;
    }

    set logBloqueadoSuper(func) {
        if (typeof func !== 'function') {
            console.trace();
            throw new Error('Parametro passado para logBloqueadoSuper nao eh funcao');
        }
        this._logBloqueadoSuper = func;
    }

    async esperarBloqueioSuper(segundos) {
        return new Promise(rr=>{
            const timer1 = setInterval(() => {
                segundos--;
                this._logBloqueadoSuper(`Bloqueado pelo Super... Liberação em ${segundos}s`);
                if (segundos === 0) {
                    clearInterval(timer1);
                    rr();
                }
            }, 1000);
        });
    }

    async encontrar_v2(atividade) {
        /*
        atividade precisa ter a chave tarefa.processo
         */
        let totalJuntadas = 1_000_000; // O valor de totalJuntadas vai ser atualizado a cada request
        let totalEntities = 0;
        let id_componente_peca = 0;
        let todasJuntadas = [];
        let componenteDigitalFinal = {
            atividade,
            tipo_doc: '',
            tipo_doc_id: null,
            numeroUnicoDocumentoFormatado: '',
            juntada: undefined,
            id_comp: 0,
            datahora: 0, // Number.integer timestamp
            id_comp_encontrado: false, // vai indicar que não precisa mais procurar porque a peça juntada está com datahora muito próximo ao lançamento da atividade
        }
        // ----------------------------------------------------------------------------------------------------------------------
        // Obtenho todas as juntadas com os respectivos componentes digitais e autores ------------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------
        if (this.cacheJuntadasDoProcesso.hasOwnProperty(atividade.tarefa.processo.id.toString())) {
            todasJuntadas = this.cacheJuntadasDoProcesso[atividade.tarefa.processo.id];
            totalJuntadas = totalEntities = todasJuntadas.length;
            console.group(`USANDO O CACHE DO PROCESSO ${atividade.tarefa.processo.NUPFormatado}`);
            console.log(todasJuntadas);
            console.groupEnd();
            //await this.esperar(1000);
        }
        else {
            while (totalEntities < totalJuntadas) { // Obs. Ja vi processos com totalJuntadas === 0
                if (!atividade?.tarefa?.processo) throw new Error("Atividade recebida nao segue o padrao dos dados");
                let pacote = await this.super_get(this.xml, this.get_juntadas(atividade.tarefa.processo.id, totalEntities, "DESC", 100, true));
                while (!pacote?.entities && pacote?.message && pacote?.message.indexOf('Usuário bloqueado') === 0) {
                    console.group('PACOTE DEPOIS DO BLOQUEIO');
                    console.log(pacote.entities);
                    console.groupEnd();
                    console.group('PACOTE MESSAGE');
                    console.log(pacote?.message);
                    console.log('IndexOf', pacote?.message.indexOf('Usuário bloqueado'));
                    console.groupEnd();
                    console.error(pacote.message);
                    if (this._logBloqueadoSuper) {
                        await this.esperarBloqueioSuper((15 * 60) + 10);
                        pacote = await this.super_get(this.xml, this.get_juntadas(atividade.tarefa.processo.id, totalEntities, "DESC", 100, true));
                    } else {
                        break;
                    }
                }
                if (!pacote?.entities && pacote?.message && pacote.message.indexOf('Usuário bloqueado') < 0) {
                    console.error('RESPOSTA DO SUPER FORA DO PADRAO');
                    console.trace();
                    // MANIPULAR QUANDO HOUVER ERRO DE COMUNICAÇÃO E REPETIR A OPERAÇÃO
                    return undefined;
                }
                if (!Array.isArray(pacote?.entities)) {
                    console.error('pacote.entities não veio - erro de comunicação', new Date());
                    this.esperar(1000);
                    continue;
                }
                totalJuntadas = pacote.total;
                totalEntities += pacote.entities.length;
                todasJuntadas = todasJuntadas.concat(pacote.entities);
                if (this._log) {
                    this._log(totalEntities, totalJuntadas);
                }
            }
        }
        if (Array.isArray(todasJuntadas) && todasJuntadas.length && !this.cacheJuntadasDoProcesso.hasOwnProperty(atividade.tarefa.processo.id.toString())) {
            this.cacheJuntadasDoProcesso[atividade.tarefa.processo.id] = todasJuntadas;
        }
        // Procuro o componente digital feito pelo autor da atividade que tenha "atualizadoEm" bem proximo da data de lancamento da atividade
        const maxDiferencaTempo = 8000; // Em ms
        const atividadeConclusao = this.valida_data_hora(atividade?.dataHoraConclusao);
        const atividadeAtualizadoEm = this.valida_data_hora(atividade?.atualizadoEm);
        const componenteNoIntervalo = comp=>{
            // NEM SEMPRE, mas ordinariamente o "dataHoraLockEdicao" e o "atualizadoEm" do componente digital ficam em algum momento entre a Conclusao da atividade e a Atualizacao da atividade
            // Vou considerar o componente digital localizado entre a Conclusao e a Atualizacao da Atividade
            // Sendo que ORDINARIAMENTE a Conclusao da Atividade vem antes da Atualizacao da Atividade
            const componenteDataHoraLockEdicao = this.valida_data_hora(comp?.dataHoraLockEdicao || '');
            const componenteAtualizadoEm = this.valida_data_hora(comp?.atualizadoEm || '');
            const atividadeJanelaInicio = atividadeConclusao.valueOf();
            const atividadeJanelaFim = atividadeAtualizadoEm.valueOf();
            if (componenteDataHoraLockEdicao instanceof Date) {
                const ts = componenteDataHoraLockEdicao.valueOf();
                if (ts >= atividadeJanelaInicio && ts <= atividadeJanelaFim) return true;
            }
            if (componenteAtualizadoEm instanceof Date) {
                const ts = componenteAtualizadoEm.valueOf();
                if (ts >= atividadeJanelaInicio && ts <= atividadeJanelaFim) return true;
            }
            // Existem diversos casos em que o "dataHoraLockEdicao" e o "atualizadoEm" não estão no intervalo
            // Só que estão MUITO próximos da atividade.
            // Nesses casos, PARECE que o componente tem a "dataHoraLockEdicao" e o "atualizadoEm" em momento anterior à "dataHoraConclusao" e à "atualizadoEm" da atividade.
            // Vou retornar true para os componentes com "dataHoraLockEdicao" ou com o "atualizadoEm" anteriores em tantos segundos conforme definido em maxSegundos
            const maxSegundos = 70; // Ja vi casos com 61 segundos
            if (componenteDataHoraLockEdicao instanceof Date) {
                const ts = componenteDataHoraLockEdicao.valueOf();
                const dif1 = atividadeJanelaInicio - ts;
                const dif2 = atividadeJanelaFim - ts;
                //console.log(`componenteDataHoraLockEdicao ${dif1} ${dif2}`);
                if (
                    (dif1 >= 0 && dif1 <= maxSegundos * 1000) ||
                    (dif2 >= 0 && dif2 <= maxSegundos * 1000)
                ) return true;
            }
            if (componenteAtualizadoEm instanceof Date) {
                const ts = componenteAtualizadoEm.valueOf();
                const dif1 = atividadeJanelaInicio - ts;
                const dif2 = atividadeJanelaFim - ts;
                //console.log(`componenteAtualizadoEm ${dif1} ${dif2}`);
                if (
                    (dif1 >= 0 && dif1 <= maxSegundos * 1000) ||
                    (dif2 >= 0 && dif2 <= maxSegundos * 1000)
                ) return true;
            }
            return false;
        }
        const usuarioIdentico = cd=>{
            if (cd?.criadoPor?.id === atividade?.usuario?.id) return true;
            // Existem componentes digitais que não têm a chave "criadoPor", mas que foram criados pelo usuario responsável pela atividade
            // Para esses é possível conferir os 5 primeiro digitos do CPF em atividade.usuario.username com o CPF completo em "usernameLockEdicao" do componente digital
            // A outra alternativa seria bem mais cara do ponto de vista de programação de ler a peça e procurar pelo nome do advogado na assinatura digital (se houver)
            // Na assinatura consta assim: "Documento assinado eletronicamente por NOME-DO-ADVOGADO..."
            // O nome do advogado pode ser obtido em atividade.usuario.nome
            // Fico com a opção de conferir os cinco primeiros dígitos do CPF
            // Acho que é falha do Sapiens não aparecer a chave "criadoPor" em alguns componentes digitais
            if (!Number.isInteger(cd?.criadoPor?.id)) {
                const cincoDigitosCPF = typeof atividade?.usuario?.username === 'string' ? atividade.usuario.username.substring(0, 5) : false;
                //console.log(`             CPF: ${cincoDigitosCPF} / ${typeof cd?.usernameLockEdicao === 'string' ? cd.usernameLockEdicao.substring(0, 5) : undefined}`, typeof cd?.usernameLockEdicao === 'string' ? cd.usernameLockEdicao.substring(0, 5) === cincoDigitosCPF : false);
                if (cincoDigitosCPF && typeof cd?.usernameLockEdicao === 'string' && cd.usernameLockEdicao.substring(0, 5) === cincoDigitosCPF) return true;
            }
            return false;
        }
        console.group(`ATIVIDADE - ${atividade?.tarefa?.processo?.NUPFormatado} -------------------------------------------------`);
        console.log(atividade);
        console.groupEnd();
        let sairLoopFor = false;
        /**
         * Coleta todos os componentes digitais do processo
         * EM CADA UM DELES ACRESCENTA A CHAVE JUNTADA PARA SE REFERIR À JUNTADA AO QUAL O COMPONENTE SE REFERE
         * @type {*[]}
         */
        const todosComponentes = (()=>{
            let ret = [];
            for(let juntada of todasJuntadas) {
                if (Array.isArray(juntada?.documento?.componentesDigitais)) {
                    for(let comp of juntada.documento.componentesDigitais) {
                        comp.juntada = juntada;
                        ret.push(comp);
                    }
                }
                if (Array.isArray(juntada?.documento?.vinculacoesDocumentos)) { // Para os documentos vinculados
                    for (let vinc of juntada.documento.vinculacoesDocumentos) {
                        if (Array.isArray(vinc?.documentoVinculado?.componentesDigitais)) {
                            for (let comp of vinc.documentoVinculado.componentesDigitais) {
                                comp.juntada = juntada;
                                ret.push(comp);
                            }
                        }
                    }
                }
            }
            return ret;
        })();
        const encontrarCDPorCorrespondencia = ()=> {
            // -------------------------------------------------------------------------
            // Encontrar Componente Digital por correspondência direta (atividade e componente estão com datas extremamente próximas)
            // -------------------------------------------------------------------------
            for(let cd of todosComponentes) {
                const conclusaoComponente = this.valida_data_hora(cd?.dataHoraLockEdicao || cd?.atualizadoEm);
                if (!(conclusaoComponente instanceof Date) || !(atividadeConclusao instanceof Date)) {
                    if (!(conclusaoComponente instanceof Date)) {
                        console.log('Conclusao Componente nao eh date');
                        console.log(conclusaoComponente);
                    }
                    if (!(atividadeConclusao instanceof Date)) {
                        console.log('Conclusao Atividade nao eh date');
                        console.log(atividadeConclusao);
                    }
                    continue;
                }
                const dif = Math.abs(conclusaoComponente.valueOf() - atividadeConclusao.valueOf());
                /*
                if (usuarioIdentico(cd) && dif < 86400 * 10 * 1000) { // 10 dias
                    console.group('JUNTADA');
                    console.log(juntada);
                    console.groupEnd();
                    console.group('COMPONENTE DIGITAL');
                    console.log(cd);
                    console.groupEnd();
                    console.log(`                  Diferenca: ${dif} ${(dif/1000/86400).toFixed(2)} dias, atividade.usuario.id=${atividade?.usuario?.id}, CD criadoPor=${cd?.criadoPor?.id}`, atividade?.usuario?.id === cd?.criadoPor?.id, componenteNoIntervalo(cd));
                }
                 */
                if (usuarioIdentico(cd) && componenteNoIntervalo(cd)) {
                    return cd;
                }
                // retorna undefined se nao encontra nada
            }
        }
        const lapso = cd=>{
            // Calcula o tempo entre a conclusao da atividade usando "dataHoraLockEdicao" ou o "atualizadoEm" do componente (o que for mais proximo) e o "atualizadoEm" da atividade
            // retorna o tempo em segundos
            const componenteDataHoraLockEdicao = this.valida_data_hora(cd?.dataHoraLockEdicao || '');
            const componenteAtualizadoEm = this.valida_data_hora(cd?.atualizadoEm || '');
            const atividadeJanelaFim = atividadeAtualizadoEm.valueOf();
            let lapso1 = 1_000_000_000;
            let lapso2 = 1_000_000_000;
            if (componenteDataHoraLockEdicao instanceof Date) {
                const ts = componenteDataHoraLockEdicao.valueOf();
                lapso1 = Math.abs(ts - atividadeJanelaFim) / 1000;
            }
            if (componenteAtualizadoEm instanceof Date) {
                const ts = componenteAtualizadoEm.valueOf();
                lapso2 = Math.abs(ts - componenteAtualizadoEm) / 1000;
            }
            return Math.min(lapso1, lapso2);
        }
        const encontrarCDPorProximidade = (maxHoras= 120)=>{ // 120 = 5 dias
            let cdMaisProximo = null;
            let distancia = 1_000_000_000;
            const maxTempo = maxHoras * 60 * 60;
            for(let cd of todosComponentes) {
                const lap = lapso(cd);
                if (usuarioIdentico(cd) && lap < distancia && lap < maxTempo) {
                    distancia = lap;
                    cdMaisProximo = cd;
                }
            }
            return cdMaisProximo;
        }
        let compDigitalEncontrado = encontrarCDPorCorrespondencia();
        if (!compDigitalEncontrado) compDigitalEncontrado = encontrarCDPorProximidade();
        if (compDigitalEncontrado) {
            componenteDigitalFinal.tipo_doc = compDigitalEncontrado.juntada?.documento?.tipoDocumento?.nome;
            componenteDigitalFinal.tipo_doc_id = compDigitalEncontrado.juntada?.documento?.tipoDocumento?.id;
            componenteDigitalFinal.numeroUnicoDocumentoFormatado = compDigitalEncontrado.juntada?.documento?.numeroUnicoDocumentoFormatado || '';
            componenteDigitalFinal.juntada = compDigitalEncontrado.juntada;
            componenteDigitalFinal.comp = compDigitalEncontrado; // Nao eh apenas o id_comp
            componenteDigitalFinal.datahora = parseInt(this.valida_data_hora(compDigitalEncontrado.atualizadoEm).valueOf() / 1000);
            componenteDigitalFinal.id_comp_encontrado = true;
        }
        if (componenteDigitalFinal?.comp?.id && !componenteDigitalFinal?.numeroUnicoDocumentoFormatado) {
            const {tipo: tipoDoc, num: numeroFormatado} = await this.extrair_numero_do_texto(componenteDigitalFinal.comp.id);
            console.group('DEDUÇÃO DO TIPO E DO NÚMERO DO DOCUMENTO ----------------------------------------');
            console.log(`TIPO: ${tipoDoc}, NUM: ${numeroFormatado}`);
            console.groupEnd();
            //await this.esperar(5000);
            if (tipoDoc && numeroFormatado) {
                componenteDigitalFinal.tipo_doc = tipoDoc;
                componenteDigitalFinal.numeroUnicoDocumentoFormatado = numeroFormatado;
            }
        }
        console.group('RETORNO');
        console.log(componenteDigitalFinal);
        console.groupEnd();
        return componenteDigitalFinal;
    }

    /**
     * DEPRECADA
     */
    analisarJuntadas(atividade, bloco, componente_mais_proximo) {
        const maximoJanela = 30 * 60 * 1000; // 30 min
        for(let juntada of bloco) {
            if (!juntada?.criadoEm || ! atividade?.criadoEm) {
                return undefined;
            }
            const juntadaCriadaEm = this.valida_data_hora(juntada.criadoEm);
            const atividadeCriadaEm = this.valida_data_hora(atividade.criadoEm);
            const diff1 = Math.abs(juntadaCriadaEm.valueOf() - atividadeCriadaEm.valueOf()); // Tempo entre a atividade e a juntada que está sendo analisada
            const diff2 = Math.abs(componente_mais_proximo.datahora - atividadeCriadaEm.valueOf()); // Tempo entre a atividade e o componente mais próximo encontrado
            const compDigital = this.encontrarComponenteDigitalNaJuntada(juntada);
            //console.log('DIFF1:', diff1, '    DIFF2:', diff2, '   DIFF1 < DIFF2:', diff1 < diff2);
            if (diff1 < diff2 && compDigital && juntada?.criadoPor?.id === atividade.usuario.id && diff1 < maximoJanela) {
                componente_mais_proximo.datahora = juntadaCriadaEm.valueOf();
                componente_mais_proximo.datapeca = juntadaCriadaEm;
                componente_mais_proximo.dataatividade = this.valida_data_hora(atividade.criadoEm);
                componente_mais_proximo.id_comp = compDigital;
                componente_mais_proximo.tipo_doc = juntada.documento.tipoDocumento.nome;
                componente_mais_proximo.tipo_doc_id = juntada.documento.tipoDocumento.id;
                componente_mais_proximo.numeroUnicoDocumentoFormatado = juntada?.documento?.numeroUnicoDocumentoFormatado || '';
                componente_mais_proximo.id_comp_encontrado = Math.abs(this.valida_data_hora(atividade.criadoEm).valueOf() - this.valida_data_hora(juntada.criadoEm).valueOf()) < 30;
                componente_mais_proximo.juntada = juntada;
            }
        }
        return componente_mais_proximo;
    }

    encontrarComponenteDigitalNaJuntada(juntada) { // Nao se pesquisa em documentos vinculados
        if (Array.isArray(juntada?.documento?.componentesDigitais) && juntada.documento.componentesDigitais.length) {
            // Existe um ou mais componentes digitais na juntada
            return juntada.documento.componentesDigitais[0];
        }
        return false;
    }

    async extrair_numero_do_texto(id_comp) {
        if (!Number.isInteger(id_comp)) return ''; // throw new Error("id_comp precisa ser um número")ç
        const comp = await this.super_get(this.xml, this.get_componente_digital(id_comp));
        console.group('COMPONENTE DIGITAL');
        console.log(comp);
        console.groupEnd();
        console.log(this.analisar_tipo_peca(comp));
        return this.analisar_tipo_peca(comp);
    }

    extract_data_from_conteudo(texto) {  // REPETE AQUELE QUE EXISTE EM ITEM.JS
        const str_inicial = 'base64,';
        let inicio = texto.indexOf(str_inicial);
        if (inicio < 0) {
            alert('Dados corrompidos!');
            throw new Error('Dados corrompidos!');
        }
        const dados = texto.substring(inicio + str_inicial.length);
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

    existeNumeroEAno(texto) {
        for(let i = 0, maxi = Math.min(ps.length, 20); i < maxi; i++){
            for(let j = 0, maxj = this.rgxs.length; j < maxj; j++) {
                var tmpRE = new RegExp(this.rgxs[j], 'i');
                let res = tmpRE.exec(texto);
                if (res) {
                    return {tipo: res[1].trim(), num: res[2].trim()};
                }
            }
        }
        return false;
    }

}