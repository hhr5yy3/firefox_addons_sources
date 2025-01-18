class ItemOpcao extends Payloads{
    _opcao; // Exemplo: {titulo: 'Exibir histórico de processos visualizados', desc: 'Apresenta a relação de NUPs visualizados no Sapo', icone: '/images/report01.png', func: ()=>this.exibir_historico_processos()}
    _wrapper;

    constructor(opcao, wrapper) {
        super();
        this._opcao = opcao;
        this._wrapper = wrapper;

        this.fontSize = 11;
        this.main_div = MFt.criaElem('div', {
            style: {
                minHeight: '30px',
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                alignItems: 'center',
                margin: '5px',
                padding: '5px 5px 5px 10px',
                justifyContent: 'left',
                overflowX: 'hidden',
                overflowY: 'hidden',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Syne Mono'
            }
        }, wrapper);
        this.sub_div_icone = MFt.criaElem('div', {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 5px 0 0'
            }
        }, this.main_div);
        this.sub_div_textos = MFt.criaElem('div', {
            style: {
                gridTemplateRows: 'auto auto'
            }
        }, this.main_div);
        this.dTitulo = MFt.criaElem('div', {
            style: {
                textAlign: 'left',
            }
        }, this.sub_div_textos);
        this.dDescricao = MFt.criaElem('div', {
            style: {
                textAlign: 'left',
                fontStyle: 'italic',
                color: '#969696'
            }
        }, this.sub_div_textos);
        if (this._opcao?.icone && typeof this._opcao.icone === "string") {
            const im = new Image(32, 32);
            im.onload = ()=>{
                this.sub_div_icone.appendChild(im);
            };
            im.src = this._opcao.icone;
        }
        MFt.criaElem('span', {
            innerText: `${this._opcao.titulo}`
        }, this.dTitulo);
        if (this._opcao.desc) {
            MFt.criaElem('span', {
                innerText: `${this._opcao.desc}`,
                style: {
                    margin: '0 0 0 15px'
                }
            }, this.dDescricao);
        }
        this.main_div.onmouseenter = ()=>this.main_div.style.background = '#ffe251';
        this.main_div.onmouseleave = ()=>this.main_div.style.background = 'rgba(255, 255, 255, 0.8)';
        this.main_div.onclick = ()=>{
            this._opcao.func();
        }
    }
}