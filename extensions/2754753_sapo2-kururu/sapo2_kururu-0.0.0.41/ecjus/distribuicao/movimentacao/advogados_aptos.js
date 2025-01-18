class AdvogadosAptos extends Tudo {
    /**
     * Retorna por meio de callback a relação de advogados apta a receber processos com os respectivos créditos processuais para a mais recente rodada
     * @param lista_advs {Array} Lista de advogados de um setor tal como vêm do Sapiens
     * @param id_unidade {Number}
     * @param id_setor {Number}
     * @param cb {Function} Callback
     */
    constructor(lista_advs, id_unidade, id_setor, cb) {
        super();
        this.advs = lista_advs;
        this.advs_aptos = [];  // this.advs_aptos não tem mais nenhum efeito na distribuição. Todos os afastamentos estão em registrar_afastamentos.js
        this.id_unidade = id_unidade;
        this.id_setor = id_setor;
        this.toda_distribuicao = [];
        this.cb = cb;
        this.init();
    }

    init() {
        this.retirar_afastados_sapiens();
        this.obter_afastamentos_mp(()=>{
            this.retirar_afastados_mp();
            console.group('ADVOGADOS');
            console.log(this.advs);
            console.groupEnd();
            console.group('ADVOGADOS ATIVOS');
            console.log(this.advs_aptos);  // this.advs_aptos não tem mais nenhum efeito na distribuição. Todos os afastamentos estão em registrar_afastamentos.js
            console.groupEnd();
            this.obter_dados_dist(d=>{
                this.toda_distribuicao = d;
                this.calcular_creditos(d);
                this.cb(this.advs); // retorna os advogados ativos e com créditos calculados.
            });
        });
    }

    retirar_afastados_sapiens() {
        this.advs.forEach((d)=>{
            if (!d.estaAfastado) {
                this.advs_aptos.push(d);
            }
        });
    }

    obter_afastamentos_mp(cb) {
        let indice = 0;
        let obter_lote = ()=>{
            let ids = (()=>{
                let ret = [];
                this.advs.forEach((d)=>{
                    ret.push(d.id);
                });
                return ret;
            })();
            MFt.xml({
                url: mp,
                get: {
                    task: 'obter_afastamentos_em_lote',
                    ids: JSON.stringify(ids)
                },
                callback: (dd)=>{
                    console.log(dd);
                    for(let i = 0; i < this.advs.length; i++) {
                        this.advs[i].afastamentos = dd.dados[i];
                        console.log(i, this.advs[i].email);
                        console.log(this.advs[i].afastamentos);
                    }
                    cb(true);
                }
            });
        };
        let obter = ()=>{ // versao abandonada
            MFt.xml({
                url: mp,
                get: {
                    task: 'obter_afastamentos',
                    id_usuario: this.advs[indice].id
                },
                callback: (dados)=>{
                    // 0=rowid, 1=id_usuario, 2=inicio, 3=fim, 4=motivo, 5=indeterminado, 6=obs
                    if (dados && dados.dados) {
                        this.advs[indice]['afastamentos'] = dados.dados; // tudo vai para this.advogados
                        console.log('Afastamentos:', indice, '/', this.advs.length);
                        indice++;
                        if (indice < this.advs.length) {
                            obter();
                        }
                        else {
                            for(let i = 0; i < this.advs.length; i++) {
                                console.log(i, this.advs[i].email);
                                console.log(this.advs[i].afastamentos);
                            }
                            cb(true);
                        }
                    }
                    else if (dados && dados.erro) {
                        alert(dados.erro);
                    }
                    else {
                        alert('Falha de comunicação');
                    }
                }
            });
        };
        obter_lote();
    }

    retirar_afastados_mp(){
        let ja_incluidos = [];
        /**
         * Verifica se está afastado por prazo indeterminado
         * @param a {Object} Advogado
         * @returns {boolean} Se o advogado está afastado por prazo indeterminado
         */
        let esta_afastado_ind = (a)=>{
            let afs = a.afastamentos;
            for(let j = 0; j < afs.length; j++) {
                if (afs[j][5]) { // situação de prazo indeterminado
                    return true;
                }
            }
            return false;
        };
        /**
         * Verifica os casos de afastamentos temporários e indica se está afastado agora.
         * @param a {Object} Advogado
         * returns {boolean} true = afastado, false = ativo
         */
        let esta_afastado_agora = a=>{
            let afs = a.afastamentos;
            let hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            for (let j = 0; j < afs.length; j++) {
                if (afs[j][2] && afs[j][3]) {
                    let inicio = MFt.dates.mysql2jsdate(afs[j][2]);
                    let fim = MFt.dates.mysql2jsdate(afs[j][3]);
                    // console.log('INICIO');
                    // console.log(inicio);
                    // console.log('FIM');
                    // console.log(fim);
                    // console.log('HOJE');
                    // console.log(hoje);
                    if (inicio && fim) {
                        if (inicio <= hoje && fim >= hoje) {
                            // console.log('retorna-se true');
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        // -------------------------------------------
        this.advs_aptos = [];
        this.advs.forEach((a)=>{
            if (!esta_afastado_agora(a) && !esta_afastado_ind(a) && !a.estaAfastado) {
                if (!MFt.inArray(a.id, ja_incluidos)) {
                    this.advs_aptos.push(a);
                    ja_incluidos.push(a.id);
                }
            }
            else {
                console.log(`${a.nome} nao incluido nos advs aptos`);
            }
        });
    }

    obter_dados_dist(cb) {
        this.xml_associado(mp, 'obter_toda_distribuicao', {
            id_unidade: this.id_unidade
        }, d=>{
            cb(d);
        });
    }

    /**
     * Coloca em cada advogado a quantidade de processos já recebida por rodada, fazendo a transposição do excesso de distribuição para a rodada seguinte.
     * Adiciona um campo Array "rodada" em que cada valor corresponde ao "crédito" obtido pelo advogado: ex.: rodada[0] = 1, representa a quantidade de processos recebida na rodada 1.
     * ESTA CONTAGEM NÃO CONSIDERA OS RETORNOS r[17]
     * @param dist
     */
    calcular_creditos(dist) {
        console.group('CALCULAR CREDITOS');
        // console.log(dist);
        /**
         * Retorna o número de processos registrados para o Advogado na rodada indicada
         * @param rodada {Number}
         * @param id_adv {Number}
         * @returns {Number}
         */
        let num_procs_recebidos = (rodada, id_adv)=>{
            let contador = 0;
            dist.forEach((r)=>{
                if (r.id_usuario_entrada === id_adv && rodada === r.rodada_distribuicao && !r.retorno) { // r[17] = não pode ser retorno, retorno não conta
                    // if (id_adv === 7605) console.log(r);
                    contador++;
                }
            });
            if (id_adv === 7605) console.log(`Jose RODADA: ${rodada}, ADV_ID: ${id_adv}, CONTADOR: ${contador}`);
            return contador;
        };
        /**
         * Indica se uma determinada rodada existe no banco de dados.
         * @param rodada
         * @returns {boolean}
         */
        let existir_rodada = rodada=>{
            for(let i = 0; i < dist.length; i++) {
                // console.log(dist[i]);
                if (dist[i].rodada_distribuicao === rodada) return true;
            }
            return false;
        };
        /**
         * Coloca em this.advs um item chamado rodadas. Para cada item na Array, haverá um número com a indicação da quantidade de processos recebidos.
         * Ex.: retorno[0] = 1, significa que o Adv recebeu 1 processo na rodada 1 (indice 0 = rodada 1)
         */
        let lancar_processos = ()=>{
            for(let i = 0; i < this.advs.length; i++) {
                let rodada = 1;
                this.advs[i].rodadas = [];
                while (existir_rodada(rodada)) {
                    this.advs[i].rodadas[rodada - 1] = num_procs_recebidos(rodada, this.advs[i].id);
                    // if (this.advs[i].id === 6114) {
                    //     console.log(`${this.advs[i].nome}, RODADA: ${rodada}, NUM PROCS RECEBIDOS: ${num_procs_recebidos(rodada, this.advs[i].id)}`);
                    // }
                    rodada++;
                }
            }
        };
        let obter_ultima_rodada = ()=>{
            let ultima = 1;
            dist.forEach((d)=>{
                if (d.rodada_distribuicao > ultima) ultima = d.rodada_distribuicao;
            });
            return ultima;
        };
        /**
         * Passa para a rodada seguinte o excesso ou a deficiência de distribuição da rodada
         */
        let balancear_quantitativo = ()=>{
            this.advs.forEach((a)=>{
                for(let i = 0; i < a.rodadas.length - 1; i++) {
                    // if (a.id === 6707) {
                    //     a.rodadas.forEach((r)=>{
                    //         console.log(r, new Date());
                    //     });
                    //     console.log('--------------');
                    // }
                    a.rodadas[i]--;
                    a.rodadas[i + 1] += a.rodadas[i];
                    a.rodadas[i] = 0;
                }
                if (a.id === 7605) {
                    console.log('Jose');
                    console.log(a);
                }
            });
        };
        // ----------------------------------
        lancar_processos();
        balancear_quantitativo();
        console.groupEnd();
    }
}
