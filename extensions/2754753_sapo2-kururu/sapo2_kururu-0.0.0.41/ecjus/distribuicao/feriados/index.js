window.onload = ()=>{
    new HeaderShow('Feriados', MFt.$('header'));
    new Feriados();
};

class Feriados extends Tudo {
    constructor() {
        super();
        this.feriados = [];
        this.id_unidade = MFt.urlArgs().id_unidade;
        this.init();
    }

    get mp() {return 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';}

    async init() {
        this.feriados = await this.request_mf(this.mp, {task:'obter_feriados', id_unidade:this.id_unidade}, null, false);
        this.exibir_feriados();
        this.botao_inserir();
    }

    exibir_feriados() {
        const um = (f,t)=>{
            const tr = MFt.criaElem('tr', null, t);
            this.tds([
                '', f.ano, f.mes, f.dia, f.desc, ''
            ], tr);
        };
        MFt.clear(MFt.$('feriados'));
        if (this.feriados.length) {
            const tabela = MFt.criaElem('table', {
                style: {
                    fontSize: '14px'
                }
            }, MFt.$('feriados'));
            this.tds(['#', 'ANO', 'MÊS', "DIA", "DESCRIÇÃO", ''], MFt.criaElem('tr', null, tabela));
            console.log(this.feriados);
            for (let f of this.feriados) this.exibir_um_feriado(f.dia, f.mes, f.ano, f.desc, tabela);
        }
        else {
            MFt.$('feriados').innerText = 'Nenhum feriado registrado';
        }
    }

    exibir_um_feriado(dia, mes, ano, desc, tab) {
        const meses = ['', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        const tds = this.tds([
            '#',
            `${ano}`,
            `${meses[mes]}`,
            `${dia}`,
            `${desc}`,
            'excluir'
        ], MFt.criaElem('tr', null, tab));
        MFt.atribs(tds[tds.length - 1], {
            style: {
                color: '#CCC',
                cursor: 'pointer'
            }
        });
        tds[0].style.cursor = 'pointer';
        tds[0].onclick = ()=>{
            this.form_feriado(dia, mes, ano, desc);
        }
        tds[tds.length - 1].onclick = async ()=>{
            if (confirm('Deseja excluir feriado?')) {
                const res = await this.request_mf(this.mp, {
                    task: 'excluir_feriado',
                    dia: dia,
                    mes: mes,
                    ano: ano,
                    id_unidade: this.id_unidade
                });
                if (Object.prototype.toString.call(res) === '[object Array]') {
                    this.feriados = res;
                    this.exibir_feriados();
                }
            }
        }
    }


    botao_inserir() {
        MFt.clear(MFt.$('bt_novo_feriado'));
        const bt = new MFt.bt({
            value: 'Inserir',
            width: 100,
            height: 30,
            wrapper: MFt.$('bt_novo_feriado'),
            callback: ()=>{
                this.form_feriado();
            }
        });
    }

    form_feriado(_dia, _mes, _ano, _desc) {
        const pop = new PopUp(300, 142, null, null, form=>{
            const check = ()=>{
                const data = `${dia.value.trim()}.${mes.value.trim()}.${ano.value.trim()}`;
                const res = this.validaData(data);
                if (res && res.getFullYear() > 2020) bt2.disabled = !this.validaData(data);
            }
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Arial',
                    fontSize: '14px'
                }
            });
            MFt.criaElem('div', {innerText: 'INSERIR FERIADO', style:{fontWeight: 'bold', margin:'0 0 10px 0'}}, form.div);
            const wp2 = MFt.criaElem('div', {style:{margin:'0 0 10px 0'}}, form.div);
            MFt.criaElem('span', {innerText:'DIA: '}, wp2);
            const dia = MFt.criaElem('input', {type:'text', size:'3', style:{margin:'0 10px 0 0'}}, wp2);
            MFt.criaElem('span', {innerText:'MÊS: '}, wp2);
            const mes = MFt.criaElem('input', {type:'text', size:'3', style:{margin:'0 10px 0 0'}}, wp2);
            MFt.criaElem('span', {innerText:'ANO: '}, wp2);
            const ano = MFt.criaElem('input', {type:'text', size:'5'}, wp2);
            const wp3 = MFt.criaElem('div', {style:{margin:'0 0 10px 0'}}, form.div);
            MFt.criaElem('span', {innerText:'DESCRIÇÃO: '}, wp3);
            const desc = MFt.criaElem('input', {type:'text', style:{width:'200px'}}, wp3);
            const wp4 = MFt.criaElem('div', {style:{margin:'0 0 10px 0'}}, form.div);
            const bt2 = new MFt.bt({value:'Inserir', width:100, height:30, marginTop: '10px', wrapper:wp4, disabled:true, callback: async ()=>{
                    pop.aceitaEsc = false;
                    bt2.disabled = true;
                    const res = await this.request_mf(this.mp, {task:'inserir_feriado', dia:parseInt(dia.value.trim()), mes:parseInt(mes.value.trim()), ano:parseInt(ano.value.trim()), desc:desc.value.trim(), id_unidade:this.id_unidade}, null, false);
                    if (Object.prototype.toString.call(res) === '[object Array]') {
                        this.feriados = res;
                        this.exibir_feriados();
                    }
                    pop.closeWindow(pop);
                }
            });
            dia.value = _dia || '';
            mes.value = _mes || '';
            ano.value = _ano || '';
            desc.value = _desc || '';
            dia.oninput = mes.oninput = ano.oninput = check;
            dia.focus();
            check();
        });
        pop.iniciar(pop);
        pop.aceitaEsc = true;
    }
}
