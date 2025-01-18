window.onload = ()=>{
    new HeaderShow('Teste de cálculo de prazo', MFt.$('header'));
    new Ctarefa();
};

class Ctarefa extends Tudo {
    constructor() {
        super();
        this.id_unidade = MFt.urlArgs().id_unidade;
        this.init();
    }

    get mp() {return 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';}

    async init() {
        const feriados = await this.request_mf(this.mp, {task:'obter_feriados', id_unidade:this.id_unidade});
        console.log(feriados);
        MFt.criaElem('div', {innerText:`${this.calcular_prazo(10, new Date(2021, 6, 30))}`}, MFt.$('form'));
        MFt.criaElem('div', {innerText:`${this.calcular_prazo(10, new Date(2021, 6, 30), feriados)}`}, MFt.$('form'));
    }
}
