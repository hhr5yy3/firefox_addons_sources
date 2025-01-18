class ItemTarefa extends Payloads {
    constructor(tarefa, tbody, pai, indice) {
        super();
        this._backcolor = '#FFF';
        this.tarefa = tarefa;
        this.tbody = tbody;
        this.pai = pai;
        this.checkbox = MFt.criaElem('input', {type:'checkbox'});
        this.tr = MFt.criaElem('tr', {style:{background:this.back_normal}}, tbody);
        this.cells = undefined;
        this.indice = indice;
        this.draw();
    }

    get cor_normal() {return '#FFF'}
    get cor_selecionado() {return 'rgb(235 245 238)'}
    get cor_mouseouver() {return '#FF9'}
    get backcolor() {return this._backcolor}
    set backcolor(val) {this._backcolor = val}
    get visible() {return getComputedStyle(this.tr).visibility === 'visible';};
    set visible(val) {this.tr.style.visibility = val ? 'visible' : 'collapse';}

    draw() {
        MFt.clear(this.tr);
        this.cells = [];
        this.cells = this.tds([
            '', // indice
            '', // checkbox
            this.formatanup(this.tarefa?.processo?.NUP),
            '', //`${tarefa?.especieTarefa?.descricao}`,
            `${this.date2normal(this.valida_data_hora(this.tarefa?.dataHoraInicioPrazo))}`,
            `${this.date2normal(this.valida_data_hora(this.tarefa?.dataHoraFinalPrazo))}`,
            `${this.tarefa?.setorOrigem?.sigla || "SAPIENS"}${this.tarefa?.setorOrigem?.unidade ? "/" + this.tarefa?.setorOrigem?.unidade.sigla : ''}`,
            `${this.tarefa.setorResponsavel.sigla}/${this.tarefa?.setorResponsavel?.unidade ? this.tarefa?.setorResponsavel?.unidade.sigla : ''}`,
            '',
        ], this.tr);
        this.pai.set_tds_width(this.cells);
        this.cells[1].appendChild(this.checkbox);
        MFt.atribs(this.cells, {style:{fontSize:'14px'}});
        MFt.atribs([this.cells[4], this.cells[5], this.cells[6]], {
            style: {
                textAlign: 'right'
            }
        });
        this.exibir_tarefa_e_obs(this.cells[3]);
        this.link_nup(this.cells[2]);
        this.link_minuta(this.cells[8]);
        this.tr.onmouseenter = ()=>this.tr.style.background = this.checkbox.disabled ? this.backcolor : this.cor_mouseouver;
        this.tr.onmouseleave = ()=>this.tr.style.background = this.backcolor;
        this.checkbox.onchange = ()=>this.backcolor = this.checkbox.checked ? this.cor_selecionado : this.cor_normal;
    };

    exibir_tarefa_e_obs(elem) {
        MFt.clear(elem);
        const wp = MFt.criaElem('div', null, elem);
        MFt.criaElem('div', {
            innerText: this.tarefa.especieTarefa.descricao
        }, wp);
        if (this.tarefa?.postIt || this.tarefa?.observacao) {
            const etiqueta = this.tarefa?.postIt || '';
            const obs = this.tarefa?.observacao || '';
            MFt.criaElem('div', {
                innerText: `${etiqueta ? etiqueta + ' - ' : ''}${obs}`,
                style: {
                    margin: '0 0 0 20px',
                    color: '#CCC'
                }
            }, wp);
        }
    }

    botao_obs(elem) {
        const s1 = MFt.criaElem('span', {
            style: {
                margin: '0 5px 0 0',
                opacity: '0.5',
                cursor: 'pointer'
            }
        }, elem);
        const im = new Image(15, 15);
        im.onload = ()=>{
            s1.appendChild(im);
            new Dica(im, 'Editar observação', 10, 0);
            s1.onclick = async ()=>{
                const editar = new EditarObservacao();
                const res = await editar.editar(this.tarefa);
                if (res) this.exibir_tarefa_e_obs(this.cells[3]);
            }
        };
        im.src = '/images/label.png';
    }

    link_nup(elem) {
        MFt.clear(elem);
        const wrapper = MFt.criaElem('div', {}, elem);
        const d1 = MFt.criaElem('div', {}, wrapper);
        this.botao_obs(d1);
        const link = MFt.criaElem('a', {
            innerText: `${this.formatanup(this.tarefa.processo.NUP)}`,
            href: `/visualizar_nup/index.html?id_nup=${this.tarefa.processo.id}&tarefa_id=${this.tarefa.id}&especie_tarefa_id=${this.tarefa.especieTarefa.id}`,
            target: '_blank'
        }, d1);
    }

    async link_minuta(elem) {
        const procurar_minutas = async () => {
            MFt.clear(elem);
            MFt.criaElem('div', {
                innerText: 'Verificando...',
                style: {
                    fontSize: '8px'
                }
            }, elem);
            elem.innerText = 'Verificando...';
            const minutas = await this.super_get(this.get_minutas(this.tarefa.id), true);
            if (!minutas.length) {
                elem.innerText = '---';
                elem.style.textAlign = 'center';
                return;
            }
            console.log(minutas);
            MFt.clear(elem);
            for(let m of minutas) {
                const d1 = MFt.criaElem('div', {
                    style: {
                        textAlign: 'center'
                    }
                }, elem);
                const s1 = MFt.criaElem('span', {
                    innerText: `${m?.tipoDocumento?.sigla}`,
                    style: {
                        padding: '2px 5px',
                        cursor: 'pointer',
                        border: '1px solid #CCC',
                        borderRadius: '4px'
                    }
                }, d1);
                s1.onclick = ()=>{
                    window.open(`https://supersapiens.agu.gov.br/apps/tarefas/consultivo/minhas-tarefas/entrada/tarefa/${this.tarefa.id}/processo/${this.tarefa.processo.id}/visualizar/0-0/documento/${m.id}/(componente-digital/${m.componentesDigitais[0].id}/editor/ckeditor//sidebar:editar/atividade-consultivo)`);
                };
            }
        };
        const tmp_func = ()=>{
            elem.removeEventListener('click', tmp_func);
            procurar_minutas();
        };
        if (this.indice < 16) procurar_minutas();
        else {
            elem.innerText = 'verificar';
            elem.style.cursor = 'pointer';
            elem.addEventListener('click', tmp_func, false);
        }
    }
}