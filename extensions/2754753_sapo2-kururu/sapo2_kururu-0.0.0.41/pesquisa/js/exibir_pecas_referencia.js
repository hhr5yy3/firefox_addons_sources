class ExibirPecasReferencia extends Payloads {
    _wrapper;

    constructor(wrapper) {
        super();
        this._wrapper = wrapper;
        this.dados = [];
        this.url_mp = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.lixeira = new Image(32);
        this.lixeira.src = "/images/lixeira_02.png";
        this.div_rel = MFt.criaElem('div', {style:{height: '558px', overflow: 'hidden scroll'}});
        this.init();
    }

    async init() {
        const info_icon = new Image(20);
        info_icon.style.cursor = 'pointer';
        await this.load_image(info_icon, "/images/info.svg");
        const instrucoes = await this.request_mf(this.url_mp, {task: 'arquivo', arquivo: 'instrucoes_rel_pecas.json'});
        if (!(this._wrapper instanceof HTMLElement)) {
            this.pop = new PopUp(800, 600, null, null, form=>{
                this._wrapper = MFt.criaElem('div', null, form.div);
                this._wrapper.innerText = 'Aguarde...';
            });
            this.pop.aceitaEsc = this.pop.clicafora_sair = false;
            this.pop.iniciar(this.pop);
        }
        this.dados = await this.request_mf(this.url_mp, {task: 'obter_pecas_referencia'});
        this.pop.aceitaEsc = this.pop.clicafora_sair = true;
        if (Array.isArray(this.dados) && this.dados.length) {
            MFt.clear(this._wrapper);
            const divheader = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '300px auto 30px',
                    fontSize: '16px',
                    fontFamily: 'Inconsolata',
                    margin: '0 0 5px 0',
                    padding: '0 0 5px 0',
                    borderBottom: '1px solid #CCC'
                }
            }, this._wrapper);
            MFt.criaElem('div', {
                innerText: 'Relação de peças de referência salvas',
            }, divheader);
            this.motor_filtro(divheader);
            const div_info = MFt.criaElem('div', {style:{textAlign: 'right'}}, divheader);
            div_info.appendChild(info_icon);
            info_icon.onclick = ()=>this.exibir_instrucoes(this._wrapper, instrucoes, {fontFamily: 'Inconsolata', fontSize: '18px'});
            this._wrapper.appendChild(this.div_rel);
            this.exibir_dados();
        }
        else {
            MFt.clear(this._wrapper);
            const main_div = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '40px auto'
                }
            }, this._wrapper);
            main_div.appendChild(info_icon);
            MFt.criaElem('span', {
                innerHTML: 'Não existem peças registradas pelo usuário<br/><br/>Clique fora da janela para sair.',
                style: {
                    fontFamily: 'Inconsolata',
                    fontSize: '16px'
                }
            }, main_div);
            this.pop.aceitaEsc = this.pop.clicafora_sair = true;
            info_icon.onclick = ()=>this.exibir_instrucoes(this._wrapper, instrucoes, {fontFamily: 'Inconsolata', fontSize: '18px'});
        }
    }

    exibir_dados(termos="") {
        MFt.clear(this.div_rel);
        const dados_filtrados = this.filtrar_dados(termos);
        for(let i = 0; i < dados_filtrados.length; i++) {
            const d = dados_filtrados[i];
            this.item(i + 1, d, this.div_rel);
        }
    }

    item(indice, dd, div) {
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: '30px 700px 30px',
                alignItems: 'center',
                fontFamily: 'Inconsolata',
                padding: '5px 0',
                margin: '0 0 5px 0'
            }
        }, div);
        const s1 = MFt.criaElem('div', {
            innerText: `${indice}`,
            style: {

            }
        }, d1);
        const s2 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: 'auto auto auto',
                cursor: 'pointer'
            }
        }, d1);
        const s3 = MFt.criaElem('div', { // Icone da lixeira -----------------------
            style: {
                cursor: 'pointer'
            }
        }, d1);
        const dTitulo = MFt.criaElem('div', {
            innerText: `${dd.titulo}`,
            style: {
                fontWeight: 'bold'
            }
        }, s2);
        const dReferencia = MFt.criaElem('div', {
            innerText: `${dd.ref}`,
            style: {
                margin: '0 0 0 30px'
            }
        }, s2);
        const dObs = MFt.criaElem('div', {
            innerText: `${dd.obs}`,
            style: {
                margin: '0 0 0 30px',
                fontStyle: 'italic'
            }
        }, s2);
        const lixeira_clone = this.lixeira.cloneNode();
        s3.appendChild(lixeira_clone);
        s2.onmouseenter = ()=>{
            d1.style.background = '#ffffad';
        };
        s2.onmouseleave = ()=>{
            d1.style.background = '#FFFFFF';
        };
        s2.onclick = ()=>{
            if (this.pop) this.pop.closeWindow(this.pop);
            window.open(`/pesquisa/sapiensdoc.html?id=${dd.id_comp}&nome_peca=${dd.ref}`)
        };
        lixeira_clone.onclick = async ()=>{
            this.dados = await this.apagar_item(dd.id_comp);
        }
    }

    filtrar_dados(termos) {
        const tt = termos.split(' ').map(d=>this.ascii_mf(d).toLowerCase());
        return this.dados.filter(d=>{
            if (!termos.trim() || termos.length < 3) return true;
            if (tt.some(t=>this.ascii_mf(d.titulo).toLowerCase().indexOf(t) >= 0)) return true;
            if (tt.some(t=>this.ascii_mf(d.ref).toLowerCase().indexOf(t) >= 0)) return true;
            return tt.some(t=>this.ascii_mf(d.obs).toLowerCase().indexOf(t) >= 0);
        });
    }

    motor_filtro(divheader) {
        const d1 = MFt.criaElem('div', {
            style: {
                textAlign: 'right'
            }
        }, divheader);
        const s1 = MFt.criaElem('span', {
            innerText: 'Filtro: '
        }, d1);
        const s2 = MFt.criaElem('span', null, d1);
        const i1 = MFt.criaElem('input', {
            type: 'text',
            style: {
                outline: 'none',
                border: 'none',
                borderBottom: '1px solid #CCC',
                padding: '0 0 3px 0',
                margin: '0 0 3px 0',
                width: '200px',
                fontFamily: 'Patrick Hand'
            }
        }, s2);
        i1.oninput = ()=>{
            this.exibir_dados(i1.value.trim());
        }
    }

    async apagar_item(id_comp) {
        if (confirm('Realmente deseja excluir o registro?')) {
            const des = this.pop.bloquear(this.pop, 'Excluindo registro...');
            this.dados = await this.request_mf(this.url_mp, {
                task: 'excluir_peca_referencia',
                id_comp
            });
            des();
            this.exibir_dados();
        }
    }
}