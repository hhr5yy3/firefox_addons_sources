class RelatorioPecasVisualizadas extends Payloads {
    constructor() {
        super();
        this.pecas = [];
        this.allusers = [];
        this.pop = undefined;
        this.manoelpaz = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.init();
    }

    async init() {
        this.pop = new PopUp(800, 600, null, null, async form=>{
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            });
            form.div.innerText = 'Aguarde...';
            this.pecas = await this.request_mf(this.manoelpaz, {
                task: 'relatorio_pecas_visualizadas'
            });
            console.log(this.pecas);
            this.allusers = await this.request_mf(this.manoelpaz, {
                task: 'getallusers'
            });
            console.log(this.allusers);
            MFt.clear(form.div);
            const wrapper = MFt.criaElem('div', {
                style: {
                    height: '100%',
                    display: 'grid',
                    gridTemplateRows: '30px auto'
                }
            }, form.div);
            const w1 = MFt.criaElem('div', {}, wrapper);
            new HeaderShow('Documentos visualizados na pesquisa', w1, 'Titillium Web', '20px', "#111", "2px 2px 2px #CCC", "none");
            const w2 = MFt.criaElem('div', {
                style: {
                    height: '100%',
                    overflow: 'hidden auto'
                }
            }, wrapper);
            const tab = MFt.criaElem('table', {
                style: {
                    borderCollapse: 'collapse'
                }
            }, w2);
            let contador = 1;
            for(let r of this.pecas) {
                this.item_tabela(contador++, r, tab);
            }
        });
        this.pop.iniciar(this.pop);
        this.pop.aceitaEsc = this.pop.clicafora_sair = true;
    }

    item_tabela(index, dd, tab) {
        const tr = MFt.criaElem('tr', {}, tab);
        const td = (t, width, href)=>{
            if (!href) {
                const e = MFt.criaElem('td', {
                    innerText: t
                }, tr);
                if (Number.isInteger(width)) e.style.width = `${width}px`;
            }
            else {
                const cell = MFt.criaElem('td', null, tr);
                const a = MFt.criaElem('a', {
                    innerText: t,
                    href,
                    target: '_blank'
                }, cell);
            }
        };
        td(index.toString(), 50);
        td(this.date2normal(new Date(dd.datahora * 1000), true), 150);
        const user = this.id_2_nome(dd.idUsr);
        td(`${user.nome} (${user.id_super})`);
        td(dd.titulo, null, `/pesquisa/sapiensdoc.html?id=${dd.idComponente}&nome_peca=${dd.titulo}&registrar=nao`);
    }

    /**
     *
     * @param id
     * @returns {Object} {id_super, email, nome}
     */
    id_2_nome(id) {
        const res = this.allusers.filter(d=>d.id_super===id);
        return res[0];
    }
}