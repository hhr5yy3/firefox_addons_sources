class Excluir2 extends Payloads {
    constructor() {
        super();
        this.mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';
        this.usuario = undefined;
        this.feriados = [];
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.init();
    }

    async init() {
        let d1 = MFt.$('tarefas');
        MFt.clear(d1);
        MFt.criaElem('div', {innerText: 'Obtendo feriados...'}, d1);
        this.feriados = await this.request_mf(this.mp, {task:'obter_feriados', id_unidade:this.id_unidade});
        MFt.clear(d1);
        MFt.criaElem('div', {innerText: 'Obtendo setores...'}, d1);
        let res = await this.super_get(this.get_setores(this.id_unidade), true);
        const setores = [{id:0, nome:'---'}].concat(res);
        if (!setores) {
            MFt.criaElem('div', {innerText: 'Erro ao obter setores do Sapiens'}, d1);
            alert('Erro ao obter setores do Sapiens');
            return;
        }
        MFt.clear(d1);
        let sel_setor = this.criar_select('Selecione o Setor', setores.map(d=>{return{id:d.id, nome:d.nome};}), MFt.criaElem('div', null, d1));
        sel_setor.onchange = async e=>{
            const setor = parseInt(e.target[e.target.selectedIndex].getAttribute('id'));
            MFt.clear(d1);
            MFt.criaElem('div', {innerText: 'Obtendo advogados'}, d1);
            res = await this.super_get(this.get_usuarios_setor(setor), true);
            if (!res) {
                alert('Erro ao obter advogados no Sapiens');
                MFt.criaElem('div', {innerText: 'Erro ao obter advogados no Sapiens'}, d1);
                return;
            }
            const advs = [{id:0, nome:'---'}].concat(res);
            let sel_adv = this.criar_select('Selecione o Advogado', advs.map(d=>{return{id:d.id, nome:d.nome};}), MFt.criaElem('div', null, d1));
            sel_adv.onchange = async e=>{
                const id_adv = parseInt(e.target[e.target.selectedIndex].getAttribute('id'));
                const adv_nome = e.target[e.target.selectedIndex].innerText;
                MFt.clear(d1);
                MFt.criaElem('div', {innerText: 'Obtendo tarefas...'}, d1);
                let res = await this.request_mf(this.mp, {task:'obter_distribuicao_nao_concluida', id_unidade:this.id_unidade, id_setor:setor, id_adv:id_adv});
                if (!res) {
                    alert('Erro ao obter dados de distribuição!');
                    return;
                }
                this.exibir_processos(this.id_unidade, setor, id_adv, adv_nome, res);
            }
        };

    }

    async exibir_processos(id_unidade, id_setor, id_adv, adv_nome, procs) {
        MFt.clear(MFt.$('tarefas'));
        const d0 = MFt.criaElem('div', {

        }, MFt.$('tarefas'));
        const d1 = MFt.criaElem('div', {
            style: {
                height: '600px',
                overflowX: 'hidden',
                overflowY: 'auto'
            }
        }, MFt.$('tarefas'));
        const d2 = MFt.criaElem('div', {

        }, MFt.$('tarefas'));
        MFt.criaElem('div', {
            innerText: adv_nome,
            style: {
                margin: '10px 0 0 0',
                fontSize: '16px',
                fontWeight: 'bold'
            }
        }, d0);
        const t1 = MFt.criaElem('table', null, d1);
        let tds = this.tds(['#', 'NUP', 'DISTRIBUIÇÃO', 'PRAZO FINAL', 'ATRASO', 'ORGAO', 'ASSUNTO', 'OBS'], MFt.criaElem('tr', null, t1));
        MFt.atribs(tds, {
            style: {
                background: '#DDD',
                fontWeight: 'bold',
                textAlign: 'center'
            }
        });
        tds[1].style.minWidth = '145px';
        const cor_atrasado_normal = '#fff0f0';
        const cor_atrasado_forte = '#f6bbbb';
        const cor_destaque = '#FF0';
        let checks = [];
        for(let p of procs) {
            console.log(p);
            const tarefa = await this.super_get(this.obter_tarefas_pelo_id(p.id_tarefa_criada, 0, 'ASC', true), true, true);
            console.log(tarefa);
            const inicio = this.valida_data_hora(p.data_hora_distribuicao);
            const prazo = this.calcular_prazo_2(13, this.feriados, inicio);
            const dif = MFt.dates.daydiff(prazo.fim, new Date());
            let tr = MFt.criaElem('tr', null, t1);
            tds = this.tds([
                '',
                `${this.formatanup(p.nup)}`,
                `${this.date2normal(inicio)}`,
                `${this.date2normal(prazo.fim)}`,
                `${dif > 0 ? dif : 'No prazo'}`,
                p.orgao_consulente,
                p.assunto,
                (()=>{
                    if (!tarefa) return 'Tarefa não existe no Sapiens';
                    else if (tarefa?.dataHoraConclusaoPrazo) return 'Tarefa já concluída';
                    else if (tarefa?.apagadoEm) return `Tarefa excluída em ${this.date2normal(this.validaData(tarefa.apagadoEm))}`;
                })()
            ], tr);
            if (dif > 0) {
                tr.style.background = '#FEE';
                tr.setAttribute('cor_fundo', cor_atrasado_normal);
                tr.setAttribute('atrasado', 'true');
            }
            tds[4].style.textAlign = 'center';
            tr.onmouseenter = ()=>tr.style.background = tr.getAttribute('atrasado') ? cor_atrasado_forte : cor_destaque;
            tr.onmouseleave = ()=>tr.style.background = tr.getAttribute('atrasado') ? cor_atrasado_normal : 'transparent';
            checks.push(MFt.criaElem('input', {
                type: 'checkbox',
            }, tds[0], {
                id_tarefa: p.id_tarefa_criada,
                nup: p.nup
            }));
            if ((!tarefa) || !(!tarefa?.dataHoraConclusaoPrazo) || !(!tarefa?.apagadoEm)) {
                checks[checks.length - 1].disabled = true;
                MFt.atribs(tds, {
                    style: {
                        color: 'rgb(255 156 156)'
                    }
                });
            }
        }
        // -------------------------------------
        // BOTAO EXCLUIR
        const bt_excluir = new MFt.bt({
            value: 'Excluir Tarefas',
            width: 150,
            height: 30,
            marginTop: '10px',
            wrapper: d2,
            disabled: true,
            callback: ()=>{
                this.verificar(checks.filter(d=>d.checked));
            }
        });
    }

    verificar(cc) {
        console.log(cc);
        console.log(cc.length);
        const msg = new MsgGenerica('Verificando se tarefas estão abertas...', 400, 200);
        let erros = [];
        let finalizados = 0;
        const inicio = new Date();
        for(let c of cc) {
            const id_tarefa = parseInt(c.getAttribute('id_tarefa'));
            this.sapiens_route_completo(new Payloads().getTarefaPeloID(id_tarefa), cb=>{
                finalizados++;
                console.log(cb);
                if (cb?.ok) {
                    if (cb.dados.length === 0) {} // sem atividade lancada na tarefa
                }
                else {
                    erros.push(`Erro no NUP ${this.formatanup(c.getAttribute('nup'))}`);
                }
            });
        }
        const timer = setInterval(()=>{
            const lapso = (new Date() - inicio) / 1000;
            if (finalizados >= cc.length) {
                clearInterval(timer);
                if (erros.length) {
                    MFt.clear(msg.div);
                    const d_tmp = MFt.criaElem('div', {
                        style: {
                            height: '200px',
                            overflowX: 'hidden',
                            overflowY: 'auto'
                        }
                    }, msg.div);
                    for(let e of erros) {
                        MFt.criaElem('div', {
                            innerText: e
                        }, d_tmp);
                    }
                }
                else { // Tudo ok
                    // TODO: CRIAR DOCUMENTO DE EXCLUSAO, EXCLUIR AS TAREFAS E RECOLOCAR NO PROTOCOLO
                }
            }
            if (lapso > 100) {
                clearInterval(timer);
                alert('Impossivel continuar... Timeout!');
            }
        }, 500);
    }

    excluir() {
        if (confirm('Cria documento de exclusão?')) {

        }
    }



}