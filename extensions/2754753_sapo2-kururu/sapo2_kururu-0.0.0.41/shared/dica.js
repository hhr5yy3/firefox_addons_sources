class Dica {

    constructor(elem, msg, desloc_x, desloc_y=-15, move=false, fontFamily, fontSize, func_extra, background, boxshadow, color, borderwidth, borderstyle) {
        this.elem = elem;
        this.msg = msg;
        this.desloc_x = desloc_x || 0;
        this.desloc_y = desloc_y || 0;
        this.background = background === undefined || background === null ? '#fcfcfc' : background;
        this.boxshadow = boxshadow === undefined || boxshadow === null ? '2px 2px 5px #ccc' : boxshadow;
        this.color = color || 'black';
        this.borderwidth = borderwidth === undefined || borderwidth === null ? 1 : borderwidth;
        this.borderstyle = borderstyle === undefined || borderstyle === null ? 'solid #CCC' : borderstyle;
        if (!Number.isInteger(this.borderwidth)) {
            throw new Error("Borderwidth precisa ser inteiro");
        }
        this.move = move;
        this.fontFamily = fontFamily || 'Arial Narrow';
        this.fontSize = fontSize || '14px';
        this.monitorar = false;
        this.tip_elem = undefined;
        this.func_extra = func_extra;
        this.__className = 'dica_mf';
        if (Array.from(elem.childNodes).length) {
            console.log(`%cO elemento indicado - em regra - nao pode ter filhos - ${elem}`, 'color:red;');
        }
        this.iniciar();
    }

    iniciar() {
        const mm = e=>{
            this.mouse_move(e);
        };
        this.elem.addEventListener('mouseover', e=>{
            const tip_height = 15;
            const pad_top = 5;
            const pad_left = 5;
            const pageYoffset = MFt.navegador() === 'safari' ? window.pageYOffset : document.documentElement.scrollTop;
            if (typeof this.func_extra === 'function') this.func_extra();
            this.monitorar = true;
            if (this.move) window.addEventListener('mousemove', mm);
            const atr = this.elem.getBoundingClientRect();
            const x_neg = 0, y_neg = 0;
            const rect = e.target.getBoundingClientRect();
            this.tip_elem = MFt.criaElem('span', {
                innerHTML: this.msg,
                style: {
                    height: `${tip_height}px`,
                    padding: `${pad_top}px ${pad_left}px`,
                    border: `${this.borderwidth}px ${this.borderstyle}`,
                    borderRadius: '3px',
                    backgroundColor: this.background,
                    position: 'fixed',
                    fontFamily: this.fontFamily,
                    fontSize: this.fontSize,
                    boxShadow: this.boxshadow,
                    color: this.color,
                    // transition: '0.5s',
                }
            }, document.body);
            if (!this.move) {
                MFt.atribs(this.tip_elem, {
                    style: {
                        left: `${rect.x + this.desloc_x}px`,
                        top: `${rect.y - (tip_height + pad_top + pad_left + this.borderwidth) + this.desloc_y}px`
                    }
                });
            }
            else {
                MFt.atribs(this.tip_elem, {
                    style: {
                        left: `${e.pageX + this.desloc_x}px`,
                        top: `${e.pageY + this.desloc_y - pageYoffset}px`
                    }
                });
            }
            this.tip_elem.className = this.__className;
            this.tip_elem.style.zIndex = 3;
        });
        this.elem.addEventListener('mouseleave', ()=>{
            this.monitorar = false;
            window.removeEventListener('mousemove', mm);
            let nodes = document.body.getElementsByClassName(this.__className);
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }
        });
    }

    mouse_move(e) {
        const pageYoffset = MFt.navegador() === 'safari' ? window.pageYOffset : document.documentElement.scrollTop;
        this.tip_elem.style.left = `${this.desloc_x + e.pageX}px`;
        this.tip_elem.style.top = `${this.desloc_y + e.pageY - pageYoffset}px`;
    }
}