class ObterAfastamentos extends Payloads {
    constructor(id_unidade, id_setor){
        super();
        this.id_unidade = id_unidade;
        this.id_setor = id_setor;
        this.advogados = [];
        this.data_selecionada = undefined;
        this.lista_afastados = [];
    }

    /**
     *
     * @param data {Date} Data para procurar todos os afastamentos
     */
    async iniciar(data) {
        this.data_selecionada = data; // Date()
        console.log(this.data_selecionada);
        this.advogados = await this.super_get(this.get_usuarios_setor(this.id_setor), true);
        await this.obter_afastamentos_sapiens();
        await this.obter_afastamentos_mp();
        console.log(this.advogados);
        this.lista_afastados = this.calcular_lista_afastados();
        return this.lista_afastados;
    }

    async obter_afastamentos_sapiens() {
        for(let a of this.advogados) {
            a['afastamentos_sapiens'] = await this.super_get(this.get_afastamentos(a.colaborador.id), true);
        }
    }

    async obter_afastamentos_mp() {
        const url = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';
        const afast = await this.request_mf(url, {
            task: 'obter_afastamentos_do_dia_especifico_lote',
            ids: JSON.stringify(this.advogados.map(d=>d.id)),
            data: MFt.dates.date2sql(new Date())
        });
        for(let i = 0; i < this.advogados.length; i++) this.advogados[i]['afastamentos'] = afast[i];
    }

    calcular_lista_afastados() {
        let lista = [];
        let advogados = this.advogados;
        console.log(advogados);
        for(let i = 0; i < advogados.length; i++) {
            let adv = advogados[i];
            if (!adv.isDisponivel) {  // Afastado Super
                let afss = advogados[i].afastamentos_sapiens;
                console.log(afss.length);
                let hoje = this.data_selecionada;
                hoje.setHours(0,0,0,0);
                for(let j = 0; j < afss.length; j++) {
                    let inicio = this.validaData(afss[j].dataInicio.split('T')[0]);
                    let fim = this.validaData(afss[j].dataFim.split('T')[0]);
                    let inicio_bloqueio = this.validaData(afss[j].dataInicioBloqueio.split('T')[0]);
                    let fim_bloqueio = this.validaData(afss[j].dataFimBloqueio.split('T')[0]);
                    if (inicio <= hoje && fim >= hoje) {
                        lista.push({
                            id_usuario: adv.id,
                            nome: adv.nome,
                            id_setor: adv.id_setor,
                            id_unidade: adv.id_unidade,
                            inicio: this.date2normal(inicio),
                            fim: this.date2normal(fim),
                            motivo: `Sapiens ${afss[j]['modalidadeAfastamento']['descricao']} - ${this.date2normal(inicio)} a ${this.date2normal(fim)}`,
                            permanente: false,
                            uso_futuro_1: 1  // 1=Sapiens
                        });
                    }
                    else if (inicio_bloqueio <= hoje && fim_bloqueio >= hoje) {
                        lista.push({
                            id_usuario: adv.id,
                            nome: adv.nome,
                            id_setor: adv.id_setor,
                            id_unidade: adv.id_unidade,
                            inicio: this.date2normal(inicio_bloqueio),
                            fim: this.date2normal(fim_bloqueio),
                            motivo: `Sapiens ${afss[j]['modalidadeAfastamento']['descricao']} (bloqueio) - ${this.date2normal(inicio_bloqueio)} a ${this.date2normal(fim_bloqueio)}`,
                            permanente: false,
                            uso_futuro_1: 1  // 1=Sapiens
                        });
                    }
                }
            }
            else {  // Nao Sapiens
                let afs = adv.afastamentos;
                let indeterminado = false;
                for(let j = 0; j < afs.length; j++) {
                    if (afs[j][5]) { // situação de prazo indeterminado
                        indeterminado = true;
                        lista.push({
                            id_usuario: adv.id,
                            nome: adv.nome,
                            id_setor: adv.id_setor,
                            id_unidade: adv.id_unidade,
                            inicio: undefined,
                            fim: undefined,
                            permanente: true,
                            motivo: afs[j][4],
                            uso_futuro_1: 8  // 8=Outros
                        });
                    }
                }
                if (!indeterminado) {
                    let hoje = this.data_selecionada;
                    hoje.setHours(0, 0, 0, 0);
                    for (let j = 0; j < afs.length; j++) {
                        if (afs[j][2] && afs[j][3]) {
                            let inicio = MFt.dates.mysql2jsdate(afs[j][2]);
                            let fim = MFt.dates.mysql2jsdate(afs[j][3]);
                            if (inicio && fim) {
                                if (inicio <= hoje && fim >= hoje) {
                                    lista.push({
                                        id_usuario: adv.id,
                                        nome: adv.nome,
                                        id_setor: adv.id_setor,
                                        id_unidade: adv.id_unidade,
                                        inicio: this.date2normal(inicio),
                                        fim: this.date2normal(fim),
                                        motivo: afs[j][4],
                                        permanente: false,
                                        uso_futuro_1: 8  // 8=Outros
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        return lista;
    }
}