class ProgressoCircular {
    /**
     * Cria um circulo que é preenchido conforme o valor indicado em this.percentual, que pode variar entre 0 e 100.
     * @param diametro {Number} Diâmetro do círculo
     * @param fill {String} Cor de preenchimento. Pode ser nulo
     * @param stroke {String} Cor da borda. Poder ser nulo
     * @param main_div {HTMLElement} Pode ser nulo, quando será anexado depois com o this.append()
     */
    constructor(diametro, fill, stroke, main_div) {
        this._diametro = diametro;
        this.fill = fill || '#333';
        this.stroke = stroke || 'black';
        this.svg = MFt.criaElem('svg', null, main_div, {
            width : diametro,
            height : diametro
        });
        MFt.criaElem('circle', null, this.svg, {cx: this.raio, cy: this.raio, r: this.raio, fill: 'white', stroke: 'black', 'stroke-width': 0.2});
        this.arc1 = MFt.criaElem('path', null, this.svg, {
            fill : '#777',
            //stroke : stroke ? stroke : 'black',
            'stroke-width' : 1
        });
        this.circulo_final = MFt.criaElem('circle', null, this.svg, {cx: this.raio, cy: this.raio, r: this.raio, fill: 'transparent', stroke: 'black', 'stroke-width': 0.2});
        this._percentual = 0;
        this.large = 0;
        this.ampulheta = new Image(12, 12);
        this.ampulheta.onload = ()=>{
            this.desenhar();
        }
        this.ampulheta.src = '/images/throbber_13.gif'
    }

    get diametro() {return this._diametro;}

    get raio() {return this._diametro / 2;}

    set percentual(val) {
        if (typeof val === 'string' && !isNaN(val)) val = parseFloat(val);
        if (typeof val !== "number") {
            console.log(typeof val);
            console.trace();
            throw new Error('Valor precisa ser float/integer');
        }
        val = Math.min(99.9, val < 0 ? 0 : val);
        this._percentual = val;
        this.large = val > 50 ? 1 : 0;
        if (val < 100) this.circulo_final.setAttribute('fill', 'transparent'); // o circulo_final se sobrepoe ao circulo de progresso
        this.desenhar();
    }

    get percentual() {return this._percentual;}

    get angulo() {return parseFloat(((360 * (this.percentual / 100)) - 90).toFixed(2));}

    set cor(val) {
        if (val === undefined) {
            // console.log('%cCor definida para "undefined"', 'color:red;font-weight:bold;');
            // console.trace();
        }
        this.fill = val;
        this.circulo_final.setAttribute('fill', val || 'white');
        if (this.ampulheta.parentNode) this.ampulheta.parentNode.removeChild(this.ampulheta);
    }

    get cor() {return this.fill;}

    grau2rad(g){
        return (g * 3.1415927) / 180;
    }

    desenhar() {
        let c = this.coords;
        if (this.percentual > 0) {
            this.ampulheta?.parentNode?.removeChild(this.ampulheta);
            this.svg.style.display = 'block';
            //str = 'M ' + c.centro.x + ' ' + c.centro.y + ' L ' + c.p1.x + ' ' + c.p1.y + ' A ' + this.raio + ' ' + this.raio + ' 0 0 0 ' + c.p2.x + ' ' + c.p2.y + ' Z';
            const str = 'M' + c.p1.x + ' ' + c.p1.y + ' A ' + this.raio + ' ' + this.raio  + ' 0 ' + this.large + ' 1 ' + c.p2.x + ' ' + c.p2.y + ' L ' + this.raio + ' ' + this.raio + ' Z';
            this.arc1.setAttribute('d', str);
        }
        else {
            // this.svg.style.display = 'none';
        }
    }

    get coords() {
        const centro = {x: this.raio.toFixed(2).toString(), y : this.raio.toFixed(2).toString()};
        const p1 = {x : (this.raio * Math.cos(this.grau2rad(-90)) + this.raio).toFixed(2).toString(), y : (this.raio * Math.sin(this.grau2rad(-90)) + this.raio).toFixed(2).toString()};
        const p2 = {x : (this.raio * Math.cos(this.grau2rad(this.angulo)) + this.raio).toFixed(2).toString(), y : (this.raio * Math.sin(this.grau2rad(this.angulo)) + this.raio).toFixed(2).toString()};
        return {centro : centro, p1 : p1, p2 : p2};
    }

    append(elem) {
        const tipo = t=>Object.prototype.toString.call(t);
        if (!tipo(elem).startsWith('[object HTML')) {
            console.log(tipo(elem));
            console.trace();
            throw new Error('Elemento indicado não é HTML');
        }
        if (this.main_div?.parentNode !== elem) {
            this.main_div = elem;
            this.main_div.appendChild(this.svg);
        }
    }

    remove() {
        this.main_div.parentNode.removeChild(this.svg);
    }

    inicio_download() { // para quando o item eh clicado, mas ainda nao tem nem 1% de download
        this.svg.style.display = 'none';
        this.main_div.appendChild(this.ampulheta);
    }
}
