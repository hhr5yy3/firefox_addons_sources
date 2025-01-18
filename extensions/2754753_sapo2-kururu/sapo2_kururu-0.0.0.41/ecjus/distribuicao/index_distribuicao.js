window.onload = ()=>{
    new HeaderShow('e-CJU Distribuição - Menu Principal', MFt.$('header'));
    MFt.criaElem('div', {
        innerText: 'Obtendo dados do Sapiens...',
        style: {
            fontSize: '16px'
        }
    }, MFt.$('wrapper'));
    let principal = new Principal();
};

class Principal extends Payloads {
    constructor(){
        super();
        this.ecjus = undefined;
        this.init();
        // this.obter_ecjus(()=>{
        //     this.criar_menu();
        // });
    }

    async init() {
        this.ecjus = await this.super_get(this.get_unidades('especializada virtual'), true);
        this.criar_menu();
    }

    criar_menu(){
        MFt.clear(MFt.$('wrapper'));
        let wrapper = MFt.criaElem('div', {

        }, MFt.$('wrapper'));
        this.ecjus.forEach((d)=>{
            new MFt.bt({
                value: d.sigla,
                width: 200,
                height: 80,
                marginRight: '10px',
                marginBottom: '10px',
                wrapper: wrapper,
                callback: ()=>{
                    location.href = `sub_menu.html?id=${d.id}`;
                }
            });
        });
    }
}