class Comuns extends Payloads {
    constructor(auth, profile) {
        super(auth, profile);
        this.mp_fast = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router';
    }

    async init() {
        await super.init();
    }

    /**
     * Retorna apenas os setores juridicos da unidade com os dados deles extraidos do Sapiens
     */
    async obter_setores_juridicos(id_unidade) {
        let dados = await this.request_mf(mp_c, {
            task: 'obter_ecjus_by_id',
            id: this.id_unidade
        });
        console.log(dados);
        let ids_setores_juridicos = JSON.parse(dados[0].ids_setores_juridicos);
        if (ids_setores_juridicos.length > 1) {
            alert('Programa não está preparado para mais de 1 setor jurídico por unidade');
            throw new Error('Programa não está preparado para mais de 1 setor jurídico por unidade');
        }
        let d_s = await this.super_get(this.get_setores(id_unidade), true);
        return d_s.filter(d=>ids_setores_juridicos.some(e=>e===d.id));
    }

    /**
     *
     * @param setores {array<object>}
     * @returns {Promise<{advs_afastados: *[], advs: *[]}>}
     */
    async obter_afastamentos_sapiens(setores) {
        const buscar_afastamento_atual = afs=>{
            console.log(afs);
            let af = {};
            let hoje = new Date();
            hoje.setHours(0,0,0,0);
            for(let a of afs) {
                const inicio = this.validaData(a.dataInicio);
                const fim = this.validaData(a.dataFim);
                const inicio_bloqueio = this.validaData(a.dataInicioBloqueio);
                const fim_bloqueio = this.validaData(a.dataFimBloqueio);
                if (inicio <= hoje && fim >= hoje) {
                    a['motivo'] = `Sapiens ${a['modalidadeAfastamento']['valor']} - ${this.date2normal(inicio)} a ${this.date2normal(fim)}`;
                    af = a;
                    break;
                }
                else if (inicio_bloqueio <= hoje && fim_bloqueio >= hoje) {
                    a['motivo'] = `Sapiens ${a['modalidadeAfastamento']['valor']} (bloqueio) - ${this.date2normal(inicio_bloqueio)} a ${this.date2normal(fim_bloqueio)}`;
                    af = a;
                    break;
                }
            }
            return af;
        };
        const usar_cache_afastamentos = MFt.urlArgs().usar_cache_afastamentos === 'sim';
        const cache = id=>{
            for(let c of cache_afastamentos) {
                if (c.colaborador_id === id) {
                    let dados;
                    try {dados = JSON.parse(c.dados)}
                    catch {}
                    return dados;
                }
            }
        };
        let advs = [];
        let advs_afastados = [];
        for(let s of setores) {
            let tmp = await this.super_get(this.get_usuarios_setor(s.id), true);
            advs = advs.concat(tmp);
            advs_afastados = advs_afastados.concat(tmp.filter(d=>!d.isDisponivel));
        }
        const advs_afastados_mp = await this.request_mf(this.mp_fast, {
            task: 'obter_afastamentos_do_dia_lote',
            ids: JSON.stringify(advs.map(d=>d.id))
        });
        const colaboradores_ids = JSON.stringify(advs_afastados.map(d=>d.colaborador.id));
        // console.log(colaboradores_ids);
        const cache_afastamentos = usar_cache_afastamentos ?
            // await this.request_mf(mp, {task:'get_afastamentos_dia_sapiens', data: MFt.dates.date2sql(new Date()), ids: colaboradores_ids}) :
            await this.request_mf(this.mp_fast, {task:'get_afastamentos_dia_sapiens', data: MFt.dates.date2sql(new Date()), ids: colaboradores_ids}) :
            false;
        console.log('CACHE AFASTAMENTOS:');
        console.log(cache_afastamentos);
        // advs_afastados_mp contém uma lista na mesma ordem de advs
        // A linha abaixo insere para cada item em advs a array de afastamentos que está em advs_afastados_mp
        for(let i = 0; i < advs.length; i++) advs[i].afastamentos = advs_afastados_mp[i];
        console.group("ADVS________________________________________________");
        console.log(advs_afastados_mp);
        console.log(advs);
        console.groupEnd();
        for(let ad of advs_afastados) {
            let afastamentos;
            if (cache_afastamentos) {
                afastamentos = cache(ad.colaborador.id);
                if (afastamentos) console.log('USANDO CACHE');
                if (!afastamentos) { // Caso der erro no JSON busca-se no Super
                    afastamentos = await this.super_get(this.get_afastamentos(ad.colaborador.id), true);
                    if (afastamentos) await this.request_mf(mp, {task: 'set_afastamentos_dia_sapiens', data: MFt.dates.date2sql(new Date()), colaborador_id: ad.colaborador.id, dados: JSON.stringify(afastamentos)}, 'post');
                }
            }
            else { // Quando o cache nao esta habilitado
                afastamentos = await this.super_get(this.get_afastamentos(ad.colaborador.id), true);
                if (afastamentos) await this.request_mf(mp, {task:'set_afastamentos_dia_sapiens', data: MFt.dates.date2sql(new Date()), colaborador_id: ad.colaborador.id, dados: JSON.stringify(afastamentos)}, 'post');
            }
            ad.afastamento_sapiens = buscar_afastamento_atual(afastamentos);
        }
        return {advs, advs_afastados, advs_afastados_mp};
    }

    /**
     * Calcula o prazo administrativo (não judicial) pelas regras da Lei n. 9784, de 1999.
     * @param dias
     * @param feriados {Array} Cada item deve ser um dict com ANO, mes e dia, tal como feriadosNacionaisFixos, abaixo
     * @param inicio {Date}
     * @returns {{Date, Date}} inicio e fim
     */
    calcular_prazo(dias, feriados=[], inicio=new Date()) {
        inicio = inicio || new Date();
        let ano = new Date().getFullYear();
        let primeiroDiaUtil;
        let final;
        const feriadosNacionaisFixos = [
            {dia:1, mes:1}, // Confraternização Universal
            {dia:21, mes:4}, // Tiradentes
            {dia:1, mes:5}, // Dia Mundial do Trabalho
            {dia:7, mes:9}, // Independência do Brasil
            {dia:12, mes:10}, // Nossa Senhora Aparecida
            // {dia:28, mes:10}, // Dia do Servidor Público
            {dia:2, mes:11}, // Finados
            {dia:15, mes:11}, // Proclamação da República
            {dia:25, mes:12}, // Natal
        ];
        const inFeriadosSabadoDomingo = data=>{
            // Verifica se a data está dentro dos feriados nacionais fixos, dos informados no MySQL, sábado ou domingo
            data.setHours(0, 0, 0, 0);
            if (data.getDay() === 0 || data.getDay() === 6) return true;
            return feriadosNacionaisFixos.some(d=>d.mes===data.getMonth()+1 && d.dia===data.getDate()) ||
                feriados.some(f=>f.ano===data.getFullYear() && f.mes===data.getMonth()+1 && f.dia===data.getDate());
        };
        if (isNaN(dias)) throw new Error("Dias precisa ser número");
        if (dias < 1) throw new Error("Precisa ser > 0");
        inicio.setHours(0, 0, 0, 0);
        // Encontra o primeiro dia do prazo
        while(primeiroDiaUtil === undefined){
            inicio = new Date(inicio.getTime() + (1000 * 3600 * 24)); // Soma +1 dia
            inicio.setHours(0, 0, 0, 0);
            if (!inFeriadosSabadoDomingo(inicio)) {
                dias--;
                primeiroDiaUtil = true;
            }
        }
        // Soma os dias restantes à data do primeiro dia do prazo
        final = new Date(inicio.getTime() + (1000 * 3600 * 24 * dias)); // É a data final do prazo. Mas se cair em feriado, sábado ou domingo tem que ser prorrogado para o dia útil seguinte
        // Encontra o final do prazo, porque o prazo final não pode cair em dia não útil
        while(inFeriadosSabadoDomingo(final)){
            final = new Date(final.getTime() + (1000 * 3600 * 24)); // Soma +1 dia
            final.setHours(0, 0, 0, 0);
        }
        final.setHours(23, 59, 59, 999); // 23:59:59:999 do dia final
        return {inicio, fim:final};
    }
}