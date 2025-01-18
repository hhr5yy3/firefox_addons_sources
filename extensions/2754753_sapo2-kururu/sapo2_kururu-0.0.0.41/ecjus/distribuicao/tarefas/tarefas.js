window.onload = ()=>{
    new HeaderShow('Menu de Distribuição', MFt.$('header'));
    const id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
    console.log(id_unidade);
    const wp = MFt.$('wrapper');
    new Tarefas();


};

class Tarefas extends Payloads {
    constructor() {
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.wp = MFt.$('wrapper');
        this.setor = undefined;
        this.usuarios = undefined;
        this.init();
    }

    async init() {
        this.setor = await this.escolher_setor(this.wp);
        this.wp.innerText = 'Aguarde...';
        this.usuarios = await this.super_get(this.get_usuarios_setor(this.setor.id), true);
        const lista = MFt.criaElem('div', null, this.wp);
        for(let u of this.usuarios) {
            const area = MFt.criaElem('div', {
                style: {
                    margin: '0 0 20px 0'
                }
            }, lista);
            this.exibir_tarefas_usuario(u, area);
        }
    }

    async escolher_setor(wp) {
        return new Promise(async rr=>{
            const setores = await this.super_get(this.get_setores(this.id_unidade), true);
            MFt.clear(wp);
            const dados = [{nome:'---', id:0}].concat(setores.map(d=>{return {nome:d.nome, value:d.id};}));
            const setor = this.criar_select('Escolha o setor:', dados, wp);
            setor.onchange = ()=>{
                if (setor.selectedIndex > 0) {
                    MFt.clear(wp);
                    rr({id:parseInt(setor[setor.selectedIndex].value), nome:setor[setor.selectedIndex].innerText});
                }
            }
        });
    }

    async exibir_tarefas_usuario(user, wp) {
        MFt.criaElem('div', {
            innerText: `${user.colaborador.usuario.nome}`,
            style: {
                fontWeight: 'bold'
            }
        }, wp);
        const tarefas = await this.super_get(this.get_tarefas(user.id), true);
        const tab = MFt.criaElem('table', null, wp);
        let tds = this.tds(['#', 'NUP', 'TAREFA', 'INICIO', 'FIM', 'ORIGEM', 'SETOR'], MFt.criaElem('tr', null, tab));
        MFt.atribs(tds, {
            style: {
                background: '#CCC'
            }
        });
        tds[1].style.minWidth = '160px';
        let c = 0;
        for(let t of tarefas) {
            // console.log(t);
            if (typeof t.dataHoraDistribuicao !== 'string') console.log(t);
            tds = this.tds([
                `${++c}`,
                `${this.formatanup(t.processo.NUP)}`,
                `${t.especieTarefa.nome}`,
                `${t.dataHoraDistribuicao ? this.date2normal(this.valida_data_hora(t.dataHoraDistribuicao)) : this.date2normal(this.valida_data_hora(t.dataHoraInicioPrazo))}`,
                `${this.date2normal(this.valida_data_hora(t.dataHoraFinalPrazo))}`,
                `${t.setorOrigem ? t.setorOrigem.sigla + ', ' + t.setorOrigem.unidade.sigla : 'Sapiens'}`,
                `${t.setorResponsavel.sigla}, ${t.setorResponsavel.unidade.sigla}`
            ], MFt.criaElem('tr', null, tab));
        }
    }
}