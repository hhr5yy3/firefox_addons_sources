/**
 * Exemplo:
 * O Identificador precisa sempre voltar no return
    this.inp_atividade = new InputMF('ATIVIDADE:', d_unidade, async (termos, identificador)=>{
        const res = await this.obter_atividade(termos);
        if (res) {
            const dados = res.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
            return {dados, identificador};
        }
        return {dados: [], identificador};
    }, null, null);

 * Para já ter as opções antes mesmo de se digitar algo no campo, use o seguinte exemplo:
 *
    let opcoesCache; // Para fazer apenas um request dos dados
    const getOpcoes = async (termos)=>{
        return await this.super_get(this.xml, this.getModalidadeInteressado(termos), true);
    };
    const opcoes = async (identificador)=>{
        let res = Array.isArray(opcoesCache) ? opcoesCache : await this.super_get(this.xml, this.getModalidadeInteressado(), true);
        opcoesCache = res;
        if (res) {
            const dados = res.map(d=>{return {id:d.id, nome: d.valor, tudo: d}});
            return {dados, identificador};
        }
        return {dados: [], identificador};
    };
    const modalidade = new InputMF('MODALIDADE:', MFt.criaElem('div', {}, dPessoa), async (termos, identificador)=>{
        const res = await getOpcoes(termos);
        if (res) {
            const dados = res.map(d=>{return {id:d.id, nome: d.valor, tudo: d}});
            return {dados, identificador};
         }
         return {dados: [], identificador};
     });
     modalidade.set_options(opcoes);
 */
class InputMF {
    constructor(label, wrapper, func, id, nome, sel_func, size_px) {
        let _ultima_requisicao = 0;
        const _maxHeight = 200;
        const dw = MFt.criaElem('div', {
            style: {
                height: '33px',
                display: 'flex',
                alignItems: 'baseline'
            }
        }, wrapper, {div_wrapper:''});
        const dlabel = MFt.criaElem('div', {
            innerText: label,
            style: {
                margin: '0 5px 0 0',
                fontWeight: 'bold'
            }
        }, dw, {div_label:''});
        const dcampo = MFt.criaElem('div', {
            style: {
                width: '100%',
                display: 'block'
            }
        }, dw, {wrapper_campo:''});
        const d1 = MFt.criaElem('div', {
            style: {
                // border: '1px solid'
            }
        }, dcampo, {d1:''});
        const d2 = MFt.criaElem('div', {
            style: {
                // border: '1px solid'
                // height: '0',
                maxHeight: `${_maxHeight}px`,
                overflowX: 'hidden',
                overflowY: 'auto',
                padding: '0 15px 10px 15px',
                marginBottom: '15px',
                background: 'transparent'
            }
        }, dcampo, {d2:''});
        MFt.atribs(wrapper, {
            style: {
                padding: '5px 10px'
            }
        });
        const inp = MFt.criaElem('input', {
            type: 'text',
            style: {
                outline: 'none',
                border: 'none',
                borderBottom: '1px solid #CCC',
                width: '100%',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                padding: '5px 5px'
            }
        }, d1);
        if (Number.isInteger(size_px)) {
            // dw.style.width = `${size_px}px`;
            dcampo.style.width = 'auto';
            inp.style.width = `${size_px}px`;
        }
        const ampulheta = new Image(30, 30);
        ampulheta.src = 'https://manoelpaz.com/images/throbber_13.gif';
        ampulheta.style.width = '30px';
        ampulheta.style.height = '30px';
        const arrow = new Image(15, 15);
        arrow.src = 'https://manoelpaz.com/images/arrow_down_2.webp';
        MFt.atribs(arrow, {
            style: {
                width: '15px',
                height: '15px'
            }
        });
        inp.oninput = e=>this.handle(e);
        inp.onblur = e=>{
            dcampo.style.height = '0px';
            if (!this.id) {
                inp.value = '';
            }
            else if (this.nome.trim() === inp.value.trim()) this.onclick({id: this.id, nome: this.nome.trim()});
            setTimeout(()=>{
                this.clear_d2();
                dcampo.style.zIndex = 1;
                dcampo.style.height = '0px';
                MFt.clear(d2);
                d2.style.background = 'transparent';
                if (typeof this.onchange === 'function') this.onchange();
            }, 200);
        };
        Object.defineProperties(this, {
            ampulheta: {get: ()=>ampulheta},
            arrow : {get : ()=>arrow},
            d1: {get: ()=>d1},
            d2: {get: ()=>d2},
            dcampo: {get: ()=>dcampo},
            disabled: {
                get: ()=>inp.disabled,
                set: val=>inp.disabled = !(!val)
            },
            elem_inp: {get: ()=>inp},
            func: {get: ()=>func},
            identificador : {
                get : ()=>_ultima_requisicao,
                set: (val)=>_ultima_requisicao=val
            },
            id: {
                get: ()=>id,
                set: val=>{
                    id = val;
                }
            },
            inp: {
                get: ()=>inp.value,
                set: val=>inp.value = val.trim()
            },
            label: {get: ()=>label},
            maxHeight: {get: ()=>_maxHeight},
            nome: {
                get: ()=>this.inp.trim(),
                set: val=>this.inp = val.trim()
            },
            sel_func: {get: ()=>sel_func},
            value: {get: ()=>this.elem_inp.value},
            wp: {get: ()=>wrapper},
        });
        // ----------------------------------------------------------------------
        if (id && Number.isInteger(id) && nome && nome.trim()) {
            this.id = id;
            this.nome = nome.trim();
        }

    }

    handle(e, func_dados) {
        if (e.key !== 'Enter') this.id = undefined;
        this.clear_d2();
        if (this.inp.trim().length > 2 || typeof func_dados === 'function') {
            this.dcampo.style.zIndex = 3;
            this.d2.appendChild(this.ampulheta);
            this.identificador = new Date().valueOf(); // O identificador é sempre atualizado com o date da última requisição. Assim, apenas a última requisição é exibida e são evitadas as respostas atrasadas.
            if (typeof func_dados === 'function') {
                func_dados(this.identificador).then(rr=>{
                    console.log(rr.identificador, this.identificador);
                    if (this.identificador === rr.identificador) { // Apenas a última requisição é exibida
                        console.log(rr);
                        console.log(rr.identificador, this.identificador);
                        this.clear_d2();
                        this.exibir_resultados(rr);
                    }
                });
            }
            else this.func(this.inp.trim(), this.identificador).then(rr=>{
                if (this.identificador === rr.identificador) { // Apenas a última requisição é exibida
                    this.clear_d2();
                    this.exibir_resultados(rr);
                }
            });
        }
        if (typeof this.oninput === 'function') this.oninput();
    }

    exibir_resultados(rr) {
        // Aqui vem da funcao que eh alimentada na criacao da classe.
        console.log(rr);
        this.set_style_d2();
        if (rr?.dados?.length) {
            for (let r of rr.dados) {
                this.criar_item(r, this.d2);
            }
            this.dcampo.style.height = `${Math.min(this.dcampo.scrollHeight, this.maxHeight)}px`;
        }
        else this.nenhum_resultado(this.d2);
    }

    criar_item(item, wp) {
        wp.style.background = 'rgb(233, 233, 233)';
        const d1 = MFt.criaElem('div', {
            style: {
                padding: '10px',
                margin: '5px 0',
                border: '1px solid #333',
                borderRadius: '6px',
                cursor: 'pointer',
                background: '#FFF'
            }
        }, wp, {
            id: `${item.id}`,
            nome: `${item.nome}`
        });
        const label = MFt.criaElem('div', {
            innerText: `${item.nome}`
        }, d1);
        d1.onmouseenter = ()=>d1.style.background = '#ffffa5';
        d1.onmouseleave = ()=>d1.style.background = '#FFF';
        d1.onclick = ()=>{
            this.item = item;
            console.log(this.item);
            this.onclick(item);
            this.clear_d2();
            this.d2.style.background = 'transparent';
        }
    }

    nenhum_resultado(wp) {
        wp.style.background = 'rgb(233, 233, 233)';
        const d1 = MFt.criaElem('div', {
            style: {
                padding: '10px',
                margin: '5px 0',
                border: '1px solid #333',
                borderRadius: '6px',
                background: '#FFF'
            }
        }, wp);
        const label = MFt.criaElem('div', {
            innerText: 'NENHUM RESULTADO!'
        }, d1);
    }

    focus() {
        this.elem_inp.focus();
    }

    onclick(item) {
        if (item?.id_swap && item?.nome_swap) {
            let tmp = item.id;
            item.id = item.id_swap;
            item.id_swap = tmp;
            tmp = item.nome;
            item.nome = item.nome_swap;
            item.nome_swap = tmp;
        }
        this.dcampo.style.zIndex = 1;
        this.inp = item.nome;
        this.id = item.id;
        console.log(this);
        if (typeof this.sel_func === 'function') this.sel_func(this);
        if (typeof this.onchange === 'function') this.onchange(this);
    }

    clear() {
        this.inp = '';
        this.id = undefined;
    }

    set_options(func_dados) {
        MFt.atribs(this.elem_inp, {
            style: {
                width: `calc(100% - (${this.arrow.width * 2}px)`
            }
        });
        const span_arrow = MFt.criaElem('span', {
            style: {
                position: 'relative',
                top: '8px'
            }
        }, this.d1);
        span_arrow.appendChild(this.arrow);
        MFt.atribs(span_arrow, {
            style: {
                cursor: 'pointer'
            }
        });
        span_arrow.onclick = ()=>{
            console.log('click arrow');
            this.handle({key: ""}, func_dados);
        }
        this.handle({key: ""}, func_dados);
    }

    clear_options() { // exluir a setinha com as opcoes
        if (this.arrow?.parentNode) {
            if (this?.arrow?.parentNode?.parentNode?.removeChild) this.arrow.parentNode.parentNode.removeChild(this.arrow.parentNode); // Melhor deixar assim...
            MFt.atribs(this.elem_inp, {
                style: {
                    width: '100%'
                }
            });
        }
    }

    set_style_d2() {
        this.d2.style.borderLeft = '1px solid black';
        this.d2.style.borderRight = '1px solid black';
        this.d2.style.borderBottom = '1px solid black';
        this.d2.style.borderRadius = '0 0 6px 6px';
    }

    clear_d2() {
        this.d2.style.border = '0';
        this.d2.style.background = 'transparent';
        this.dcampo.style.height = '0';
        MFt.clear(this.d2);
    }
}