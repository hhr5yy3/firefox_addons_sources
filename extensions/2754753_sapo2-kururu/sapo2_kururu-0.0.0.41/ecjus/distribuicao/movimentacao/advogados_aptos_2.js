class AdvogadosAptos2 extends Tudo2 {
    /**
     * Retorna por meio de Promise a relação de advogados apta a receber processos com os respectivos créditos processuais para a mais recente rodada
     * @param lista_advs {Object[]} Lista de advogados de um setor tal como vêm do Sapiens + a chave afastamentos com a relação de afastamento do mp
     * @param id_unidade {Number}
     * @param id_setor {Number}
     */
    constructor(lista_advs, id_unidade, id_setor) {
        super();
        this.advs = lista_advs;
        this.advs_aptos = [];  // this.advs_aptos não tem mais nenhum efeito na distribuição. Todos os afastamentos estão em registrar_afastamentos.js
        this.id_unidade = id_unidade;
        this.id_setor = id_setor;
        this.toda_distribuicao = [];
        this.mp_afastamentos = undefined;
        // A inicialização em .init() tem que ser manual após criar a instância
    }

    get mp() {return 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';}
    get mp_fast() {return 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router';}

    async init() {
        // Qualquer um que tenha motivo de afastamento seja no Super seja no MP vai ser retirado abaixo
        this.mp_afastamentos = await this.request_mf(this.mp_fast, {task: 'obter_afastamentos_em_lote', ids: JSON.stringify(this.advs.map(d=>d.id))});
        console.log(this.mp_afastamentos);
        for(let i = 0; i < this.advs.length; i++) {
            this.advs[i].afastamentos = this.mp_afastamentos[i].filter(d=>{
                if (d[5]) return true;
                return this.is_hoje(d[2], d[3]);
            });
        }
        this.advs_aptos = this.advs.filter(d=>d.isDisponivel && d.afastamentos.length === 0);
        console.group('ADVOGADOS');
        console.log(this.advs);
        console.groupEnd();
        console.group('ADVOGADOS ATIVOS');
        console.log(this.advs_aptos);  // this.advs_aptos não tem mais nenhum efeito na distribuição. Todos os afastamentos estão em registrar_afastamentos.js
        console.groupEnd();
        this.toda_distribuicao = await Tudo2.request_mf_static(this.mp_fast, {
            task: 'obter_toda_distribuicao',
            id_unidade: this.id_unidade
        });
        this.calcular_creditos(this.toda_distribuicao);
        // this.advs contém todos os advogados ativos com créditos calculados.
    }

    /**
     *
     * @param d1 {String} Formato de Data
     * @param d2 {String} Formato de Data
     * @returns {boolean}
     */
    is_hoje(d1, d2) {
        const hoje = new Date();
        const inicio = this.validaData(d1);
        const fim = this.validaData(d2);
        return hoje >= inicio && hoje <= fim;
    }

    /**
     * Coloca em cada advogado a quantidade de processos já recebida por rodada, fazendo a transposição do excesso de distribuição para a rodada seguinte.
     * Adiciona um campo Array "rodada" em que cada valor corresponde ao "crédito" obtido pelo advogado: ex.: rodada[0] = 1, representa a quantidade de processos recebida na rodada 1.
     * ESTA CONTAGEM NÃO CONSIDERA OS RETORNOS r[17]
     * @param dist
     */
    calcular_creditos(dist) {
        console.group('CALCULAR CREDITOS');
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
        const existir_rodada = rodada=>dist.some(d=>d.rodada_distribuicao===rodada);
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

    /**
     * Faz um request com a opção de receber o nome dos campos na key campos e devolve uma array de dicionário.
     * @param url
     * @param params
     * @param method
     * @param aviso
     * @returns {Promise<object>}
     */
    request_mf(url, params, method='get', aviso=false) {
        return new Promise(rr=>{
            const msg = aviso ? new MsgGenerica('Aguarde...', 100, 50) : false;
            let obj = {
                url: url,
                callback: dd=>{
                    if (msg) msg.closeWindow(msg);
                    if (dd?.ok && !dd?.campos) rr(dd.dados);
                    else if (dd?.ok && dd?.campos && dd?.dados) {
                        rr(dd.dados.map(d=>{
                            let ret = {};
                            for(let i = 0; i < dd.campos.length; i++) ret[dd.campos[i]] = d[i];
                            return ret;
                        }));
                    }
                    else if (dd?.erro) {alert(dd.erro); rr(false);}
                    else {alert('Erro desconhecido!'); rr(false);}
                },
                errorCallback: e=>{
                    alert('Erro de conexão!');
                    console.log(e);
                    rr(false)
                }
            };
            console.log(params);
            if (method === 'post') obj.post = params;
            else obj.get = params || '';
            MFt.xml(obj);
        });
    }
}
