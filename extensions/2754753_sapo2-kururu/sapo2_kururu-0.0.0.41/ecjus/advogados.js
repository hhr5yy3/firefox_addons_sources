class Advogados extends Tudo {
    constructor(id_unidade, id_setor, nome_unidade, nome_setor) {
        super();
        this.id_unidade = id_unidade;
        this.id_setor = id_setor;
        this.nome_unidade = nome_unidade;
        this.nome_setor = nome_setor;
        this.mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';
        this.advogados = [];
    }

    /**
     * Devolve a lista de advogados afastados de um setor
     * @param id_setor {Number}
     * @param cb {Function}
     */
    obter_advogados_afastados_sapiens(id_setor, cb){
        this.sapiens_route(new Payloads().getUsuariosJSON(id_setor), (ds)=>{
            let ret = [];
            if (ds) {
                this.advogados = ds;
                ds.forEach((a)=>{
                    if (a.estaAfastado) {
                        ret.push({
                            id_usuario_entrada: a.id,
                            nome_usuario_entrada: a.nome,
                            id_unidade: this.id_unidade,
                            nome_unidade: this.nome_unidade,
                            id_setor: this.id_setor,
                            nome_setor: this.nome_setor,
                            observacao: "Afastamento extraído do Sapiens",
                            data_hora_distribuicao: MFt.dates.date2sql(new Date().setHours(0,0,0,0)),
                            uso_futuro_1: 1 // 8=Sapiens
                        });
                    }
                });
                cb(ret);
            }
            else alert('Falha de comunicação com o Sapiens');
        });
    }

    obter_advogados_afastados_hoje_mp(id_setor) {
        let lista = [];
        let find_nome = (id_adv, advogados) => {
            for(let i = 0; i < advogados.length; i++) {
                if (advogados[i].id === id_adv) return advogado[i];
            }
        }
        this.sapiens_route(new Payloads().getUsuariosJSON(id_setor), (ds)=>{
            if (ds) {
                let advogados = ds;
                let ids = [];
                advogados.forEach((a)=>{ids.push(a.id);});
                MFt.xml({
                    url: this.mp,
                    get: {
                        task: 'obter_afastamentos_em_lote',
                        ids: JSON.stringify(ids),
                        callback: (dd)=>{ // dd contem a lista de todos os afastamentos dos advogados do setor (da lista)
                            dd.forEach((d)=>{
                                if (d[4] === 1) lista.push({ // Coloca na lista dos afastados - afastamento indeterminado
                                    id_usuario_entrada: d[0],
                                    nome_usuario_entrada: find_nome(d[0], advogados),
                                    id_unidade: this.id_unidade,
                                    nome_unidade: this.nome_unidade,
                                    id_setor: this.id_setor,
                                    nome_setor: this.nome_setor,
                                    observacao: d[3],
                                    data_hora_distribuicao: MFt.dates.date2sql(new Date().setHours(0,0,0,0)),
                                    uso_futuro_1: 8 // 8=OUTROS
                                });
                                else {
                                    let hoje = new Date();
                                    let inicio = this.valida_data_hora(d[1]);
                                    let fim = this.valida_data_hora(d[2]);
                                    hoje.setHours(0, 0, 0, 0);
                                    inicio.setHours(0, 0, 0, 0);
                                    fim.setHours(23, 59, 59, 0);
                                    if (hoje >= inicio && hoje <= fim) {
                                        lista.push({ // Coloca na lista dos afastados
                                            id_usuario_entrada: d[0],
                                            nome_usuario_entrada: find_nome(d[0], advogados),
                                            id_unidade: this.id_unidade,
                                            nome_unidade: this.nome_unidade,
                                            id_setor: this.id_setor,
                                            nome_setor: this.nome_setor,
                                            observacao: d[3],
                                            data_hora_distribuicao: MFt.dates.date2sql(new Date().setHours(0,0,0,0)),
                                            uso_futuro_1: 8 // 8=OUTROS
                                        });
                                    }
                                }
                                cb(lista);
                            })
                        }
                    }
                });
            }
            else alert('Falha de comunicação com o Sapiens');
        });
    }
}