class PaletaCores {

    constructor(wrapper, width=15, cor=0, onchange, on_mouse_enter=true) {
        this.wrapper = wrapper;
        this.width = width;
        this.__cor = cor;
        this.onchange = onchange;
        this.tipos_cores = AnotacoesCores.cores;
        this.__padding = 3;
        this.on_mouse_enter = on_mouse_enter; // if true the drop-down color menu will appear
        this.main_div = MFt.criaElem('div', {
            style: {
                width: `${this.width}px`,
                height: `${this.width}px`,
                display: 'inline-block',
                alignItems: 'center',
                background: 'white',
                position: 'relative'
            }
        }, this.wrapper);
        this.d1 = MFt.criaElem('div', {
            style: {
                width: `${this.width}px`,
                height: `${this.width + (this.padding * 2)}px`,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'clip',
                transition: '0.25s'
            }
        }, this.main_div);
        this.main_icon = this.icone_svg(this.cor);
        this.init();
    }

    get cor() {return this.__cor;}
    set cor(val) {
        this.__cor = val % this.tipos_cores.length;
        this.main_icon.setAttribute('fill', this.tipos_cores[this.__cor]);
    }
    get padding() {return this.__padding;}

    init() {
        for(let i = 0; i < this.tipos_cores.length; i++) {
            const icon = this.icone_div(i);
            icon.onclick = e=>{
                const old_color = this.cor;
                this.cor = parseInt(icon.getAttribute('cor'));
                if (typeof this.onchange === 'function' && old_color !== this.cor) this.onchange();
            }
        }
        if (this.on_mouse_enter) {
            this.d1.onmouseenter = () => {
                if (!this.d1.getAttribute('offsetheight')) this.d1.setAttribute('offsetheight', this.d1.offsetHeight.toString());
                this.d1.style.height = `${this.d1.scrollHeight}px`;
            };
            this.d1.onmouseleave = () => this.d1.style.height = `${this.d1.getAttribute('offsetheight')}px`;
        }
    }

    icone_svg(cor) {
        const div = MFt.criaElem('div', {
            style: {
                width: `${this.width + 20}px`,
                height: `${this.width}px`,
                padding: `${this.padding}px 0`,
                cursor: this.on_mouse_enter ? 'pointer' : 'normal',
            }
        }, this.d1);
        const svg = MFt.criaElem('svg', null, div, {
            width: this.width,
            height: this.width,
        });
        const tam = parseFloat(((this.width / 2) - 1).toFixed(2));
        const circle = MFt.criaElem('circle', null, svg, {
            cx: tam + 0.5,
            cy: tam + 0.5,
            r: tam,
            fill: this.tipos_cores[cor % this.tipos_cores.length],
            stroke: '#444',
            'stroke-width': 0.8,
            cor,
        });
        return circle;
    }

    icone_div(cor) {
        const div = MFt.criaElem('div', {
            style: {
                width: `${this.width * 3}px`,
                height: `${this.width}px`,
                padding: `${this.padding}px 0`,
                cursor: 'pointer'
            }
        }, this.d1);
        const square = MFt.criaElem('div', {
            style: {
                background: this.tipos_cores[cor % this.tipos_cores.length],
                border: '1px solid #666',
                width: `${this.width * 3}px`,
                height: `${this.width}px`,
                boxShadow: '2px 2px 2px #ccc'
            }
        }, div, {
            cor
        });
        return square;
    }
}