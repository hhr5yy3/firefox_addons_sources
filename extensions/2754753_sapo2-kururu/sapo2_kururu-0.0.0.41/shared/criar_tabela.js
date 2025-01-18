class CriarTabela {
    _dados; // Array com objetos
    _titulos;
    _wrapper;
    _larguras;
    _func;
    _numerada;
    _td_style;

    /**
     *
     * @param dados {Object[]}
     * @param titulos {Object[]} [{campo: 'blablabla', titulo: 'Blablabla'}, ...];
     * @param wrapper {HTMLElement}
     * @param larguras {string|number[]}
     * @param numerada {boolean}
     * @param func {Function} Que será chamada quando a linha for clicada e para onde serão enviados os dados da linha/row
     * @param td_style {Object} Estilos que estarao dentro de style. O padrao eh: {verticalAlign: 'top', padding: '0 10px 0 0'}
     */
    constructor(dados, titulos, wrapper, larguras, numerada, func, td_style) {
        this._dados = dados;
        this._td_style = td_style || {verticalAlign: 'top'};
        this._titulos = titulos || [];
        this._wrapper = wrapper;
        this._larguras = larguras || [];
        this._func = func;
        this._tdclass = '';
        this._trclass = '';
        this._tableclass = '';
        this._numerada = numerada || false;
        this.tabela = MFt.criaElem('table', {
            style: {
                borderCollapse: 'collapse',
                //fontFamily: 'Syne Mono',
                fontSize: '14px'
            }
        }, this._wrapper);
        this.thead = MFt.criaElem('thead', null, this.tabela);
        this.tbody = MFt.criaElem('tbody', null, this.tabela);
        this.cabecalho();
        for(let i = 0; i < this._dados.length; i++) this.criar_linhas(this._dados[i], i + 1);
    }

    set tdclass(val) {
        this._tdclass = val;
        if (val) this.set_classe('td', val);
    }

    set trclass(val) {
        this._trclass = val;
        if (val) this.set_classe('td', val);
    }

    set tableclass(val) {
        this._tableclass = val;
        if (val) this.tabela.className = val;
    }

    set_classe(tag, nome1, nome2) {
        const lista = this.tbody.getElementsByTagName('tag').toArray();
        if (!nome2) for(let l of lista) l.className = nome;
        else {
            let even = false;
            for(let l of lista) {
                l.className = even ? nome1 : nome2;
                even = !even;
            }
        }
    }

    cabecalho() {
        const tr = MFt.criaElem('tr', null, this.thead);
        if (!this._titulos?.length) {
            const campos = Object.keys(this._dados[0]);
            this._titulos = [];
            for(let c of campos) {
                const t = {campo: c, titulo: c};
                this._titulos.push(t);
            }
        }
        if (this._numerada) this._titulos = [{campo: null, titulo: '#'}].concat(this._titulos);
        let deslocamento = this._numerada ? 1 : 0;
        for (let i = 0; i < this._titulos.length; i++) {
            const t = this._titulos[i];
            if (this._numerada && i === 0) {
                this.criar_head_cell(t, tr, 20);
                continue;
            }
            this.criar_head_cell(t, tr, i - deslocamento < this._larguras.length ? this._larguras[i - deslocamento] : 'auto');
        }
        return tr;
    }

    criar_linhas(dd, indice) {
        const tr = MFt.criaElem('tr', null, this.tbody);
        for(let i = 0; i < this._titulos.length; i++) {
            const t = this._titulos[i];
            if (i === 0 && this._numerada) {
                const td = MFt.criaElem('td', {innerText: `${indice}`, style: {padding: '0 10px 0 0'}}, tr);
                for(let s in this._td_style) if (this._td_style.hasOwnProperty(s)) td.style[s] = this._td_style[s];
            }
            else this.criar_cell(dd[t.campo], tr);
        }
        if (typeof this._func === "function") {
            tr.style.cursor = 'pointer';
            tr.onclick = ee=>{
                this._func(dd);
            }
        }
    }

    criar_cell(valor, tr) {
        const r =MFt.criaElem('td', {
            innerHTML: `${valor}`
        }, tr);
        for(let s in this._td_style) if (this._td_style.hasOwnProperty(s)) r.style[s] = this._td_style[s];
        return r;
    }

    /**
     *
     * @param t
     * @param tr
     * @param largura {string|number|null} Opcional, pode ser um número, uma unidade ou null/undefined
     * @return {HTMLElement}
     */
    criar_head_cell(t, tr, largura) {
        return MFt.criaElem('td', {
            innerText: `${t.titulo}`,
            style: {
                // textAlign: 'center',
                fontWeight: 'bold',
                width: (()=>{
                    let ret = '';
                    if (!isNaN(largura)) ret = `${largura}px`;
                    else if(largura) ret = largura;
                    else ret = 'auto';
                    return ret;
                })()
            }
        }, tr);
    }
}