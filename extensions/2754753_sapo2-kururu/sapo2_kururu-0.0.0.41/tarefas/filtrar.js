class Filtrar extends Payloads {
    constructor(wp, pai) {
        super();
        Object.defineProperties(this, {
            pai:{get:()=>pai},
        });
        this.wrapper = undefined;
        this.init();
    }

    init() {
        this.wrapper = this.pai.open_quadro_opcoes(250, 'Filtrar Tarefas', 'rgb(160 237 255)');
    }
}