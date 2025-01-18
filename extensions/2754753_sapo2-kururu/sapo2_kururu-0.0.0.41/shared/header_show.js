class HeaderShow {
    _fontFamily;
    _fontSize;
    _color;
    _textShadow;
    _stroke;

    constructor (titulo, elemento, fontFamily, fontSize, color="#FFF", textShadow="3px 3px 4px #333", stroke="1px #535353") {
        this.titulo = titulo;
        this.elemento = elemento;
        this._fontFamily = fontFamily;
        this._color = color || "#FFF";
        this._textShadow = textShadow;
        this._stroke = stroke;
        this._fontSize = fontSize || '';
        this.item1 = undefined; // Elemento que vai ter o título
        this.init()
    }

    init() {
        this.item1 = MFt.criaElem('span', {
            innerHTML: this.titulo,
            style: {
                fontFamily: this._fontFamily || 'Gruppo',
                fontSize: (typeof this._fontSize === 'string' ? this._fontSize : `${this._fontSize}px`) || '24px',
                fontWeight : 'bold',
                textShadow : this._textShadow || '2px 2px 8px #CCC',
                marginLeft: '30px',
                transition: '0.5s',
                opacity : '0',
                webkitTextStroke: this._stroke || '0.7px rgba(255, 255, 255, 0.8)',
                color: this._color || 'rgb(72,72,72)'
            }
        }, this.elemento);
        var frames = 2;
        var waitFrame = ()=>{
            if (--frames) requestAnimationFrame(waitFrame);
            else {
                this.item1.style.marginLeft = '0px';
                this.item1.style.opacity = '1';
            }
        };
        requestAnimationFrame(waitFrame);
    }
}