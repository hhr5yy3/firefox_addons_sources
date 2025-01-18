class Background {
    constructor() {
        this.esperandoVersiculo = false;
        this.xml = new RequestMF();
        this.url = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.image_url = 'https://manoelpaz.com/backgrounds/iu-36.jpeg';
        this.lista = [];
        this.init();
    }

    limpar() {
        const elems = document.body.getElementsByClassName('versiculo');
        for(let e of elems) {
            if (e?.parentNode) e.parentNode.removeChild(e);
        }
    }

    async init() {
        this.lista = await this.xml.request(this.url, {task: "arquivo", arquivo:"background_images.json"});
        if (this.lista?.ok) this.lista = this.lista.dados;
        MFt.atribs(document.body, {
            style: {
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                transition: '0.5s'
            }
        });
        const timer = setInterval(this.doit.bind(this), 60 * 1000);
    }

    async doit(nova_imagem=true) {
        if (this.esperandoVersiculo) return;
        this.esperandoVersiculo = true;
        let verso = await this.xml.request('https://manoelpaz.com/cgi-bin/versos/verses', {task:'fornecer_verso_aleatorio'});
        if (verso?.dados) verso = verso.dados;
        if (!verso?.width) verso.width = 500;
        if (!verso?.height) verso.height = 300;
        if (!verso?.fontsize) verso.fontsize = 36;
        if (!verso?.fontstyle) verso.fontstyle = 'italic';
        if (!verso?.fontfamily) verso.fontfamily = 'FreeSerif, serif';
        if (!verso.dark) verso.dark = {"color": "#FFF", "bordercolor": "transparent", "shadowcolor": "#000", "boxshadow": "3px 3px 4px"};
        if (!verso?.light) verso.light = {"color": "#000", "bordercolor": "#FFF", "shadowcolor": "#EEE", "boxshadow": "3px 3px 4px"};
        console.group('VERSO');
        console.log(verso);
        console.groupEnd();
        if (!this.lista?.length) this.lista = await this.xml.request(this.url, {task: "arquivo", arquivo:"background_images.json"});
        if (this.lista?.ok) this.lista = this.lista.dados;
        this.esperandoVersiculo = false;
        let image;
        if (nova_imagem) {
            if (this.lista?.length) {
                const indice = Math.min(Math.round(Math.random() * this.lista.length), this.lista.length - 1);
                image = this.lista[indice];
                this.image_url = image.nome;
            }
            document.body.style.backgroundImage = `url('${this.image_url}')`;
        }
        if (verso) {
            this.limpar();
            const wrapper = MFt.criaElem('div', {
                className: 'versiculo',
                style: {
                    width: `${verso.width}px`,
                    fontSize: `${verso.fontsize}px`,
                    fontFamily: verso.fontfamily || "serif",
                    fontStyle: verso.fontstyle || "normal",
                    bottom: '0',
                    display: 'grid',
                    gridTemplateColumns: `${verso.width}px`,
                    gridTemplateRows: `auto auto`,
                    right: '0',
                    padding: '0 20px 20px 0',
                    position: 'fixed',
                    // ---- Impedir de selecionar
                    webkitUserSelect : 'none',
                    mozUserSelect : 'none',
                    msUserSelect : 'none',
                    userSelect : 'none',
                    zIndex: '-1'
                }
            }, document.body);
            const div_verso = MFt.criaElem('div', {
                innerText: verso.verso
            }, wrapper);
            const div_referencia = MFt.criaElem('div', {
                innerText: verso.ref,
                style: {
                    width: `${verso.width}px`,
                    fontSize: `${verso.fontsize - 10}px`,
                    fontFamily: verso.fontfamily || "serif",
                    fontStyle: verso.fontstyle || "normal",
                    textAlign: 'right'
                }
            }, wrapper);
            if (image?.light) {
                div_verso.style.textShadow = `${verso?.light?.boxshadow} ${verso?.light?.shadowcolor}`;
                div_verso.style.color = verso?.light?.color;
                div_referencia.style.textShadow = `${verso?.light?.boxshadow} ${verso?.light.shadowcolor}`;
                div_referencia.style.color = verso?.light?.color || 'white';
            }
            else {
                div_verso.style.textShadow = `${verso.dark.boxshadow} ${verso.dark.shadowcolor}`;
                div_verso.style.color = verso.dark.color;
                div_referencia.style.textShadow = `${verso.dark.boxshadow} ${verso.dark.shadowcolor}`;
                div_referencia.style.color = verso.dark.color;
            }
        }
    }
}