class SelecionarSetor extends Payloads {
    constructor() {
        super();
        this.xml = new RequestMF();
        this.setores_unidade = [];
    }

    iniciar() {
        return new Promise(rr=>{
            const pop = new PopUp(800, 300, null, null, async form=>{
                MFt.atribs(form.div, {
                    style: {
                        fontFamily: 'Titillium Web',
                        fontSize: '14px'
                    }
                })
                const res = await this.formulario(form);
                rr(res);
            });
            pop.iniciar(pop);
            pop.aceitaEsc = pop.clicafora_sair = false;
        });
    }

    formulario(form) {
        return new Promise(rr=>{
            const wp = MFt.criaElem('div', {

            }, form.div);
            const d_unidade = MFt.criaElem('div', {

            }, wp)
            const d_setor = MFt.criaElem('div', {

            }, wp);
            const d_mesAno = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    margin: '10px 0',
                    padding: '10px 0'
                }
            }, wp);
            const d_botaoOk = MFt.criaElem('div', {

            }, wp);
            this.inp_unidade = new InputMF('UNIDADE:', d_unidade, async (termos, identificador)=>{
                const r1 = await this.super_get(this.xml, this.get_unidades(termos), true);
                const r2 = (()=>{
                    let r = [];
                    /*
                    Se uma tarefa está sendo criada entre setores de uma mesma unidade, permite-se a seleção de qualquer setor dentro daquela unidade.
                    Mas se é entre unidades diferentes, o setor protocolo é selecionado automaticamente após a seleção da unidade.
                    Quero permitir que o usuário selecione o setor de origem dentro da Unidade Destino e que o programa corrija esse erro do usuário (que eu já cometi).
                     */
                    if (!this.setores_unidade.length) return r;
                    for(let s of this.setores_unidade) {
                        if (this.pesquisarTexto(termos, s.sigla)) r.push({id: s.id, nome: s.nome, tudo:s.unidade, id_swap: s.unidade.id, nome_swap: s.unidade.nome});
                        else if (this.pesquisarTexto(termos, s.nome)) r.push({id: s.id, nome: s.nome, tudo:s.unidade, id_swap: s.unidade.id, nome_swap: s.unidade.nome});
                    }
                    return r;
                })();
                if (r1 || r2.length) {
                    const dados = r2.concat(r1.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}}));
                    console.log(dados);
                    return {dados, identificador};
                }
                // if (r1) {
                //     const dados = r1.map(d=>{return {id:d.id, nome:`${d.nome}`, tudo: d}});
                //     return {dados, identificador};
                // }
                return {dados: [], identificador};
            }, null, null);
            this.inp_setor = new InputMF('SETOR:', d_setor, async (termos, identificador)=>{
                const res = await this.super_get(this.xml, this.get_buscar_setor(termos, this.inp_unidade.id), true);
                if (res) {
                    if (this.inp_setor.value.split(' ').length === 1) { // Quando se coloca uma unica palavra, se essa bater com a sigla do setor apenas esse item vai ser exibido
                        const unico = res.filter(d=>{
                            console.log(`${this.ascii_mf(d.sigla.trim()).toUpperCase()} === ${this.ascii_mf(this.inp_setor.value.trim()).toUpperCase()}`);
                            return this.ascii_mf(d.sigla.trim()).toUpperCase() === this.ascii_mf(this.inp_setor.value.trim()).toUpperCase();
                        });
                        console.log(unico);
                        console.log(unico.length);
                        if (unico.length === 1) return {dados: [{id: unico[0].id, nome: `${unico[0]?.sigla ? `${unico[0]?.sigla} - `: ''}${unico[0].nome}`, tudo: unico}], identificador};
                        else {
                            const dados = res.map(d=>{return {id:d.id, nome:`${d?.sigla?`${d.sigla} - `:''}${d.nome}`, tudo: d}});
                            return {dados, identificador};
                        }
                    }
                    else {
                        const dados = res.map(d=>{return {id:d.id, nome:`${d?.sigla?`${d.sigla} - `:''}${d.nome}`, tudo: d}});
                        return {dados, identificador};
                    }
                }
                return {dados: [], identificador};
            }, null, null);
            // ------------------------------------------------------------------------------------------------------
            this.inp_unidade.focus();
            const anos = (()=>{
                let ret = [];
                let anoAtual = new Date().getFullYear();
                for(; anoAtual > 2013; anoAtual--) {
                    ret.push({nome: anoAtual.toString(), value: anoAtual.toString()});
                }
                return ret;
            })();
            const meses = (()=>{
                let ret = [];
                const mm = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                for(let i = 1; i < 13; i++) {
                    ret.push({nome: mm[i - 1], value: i.toString()});
                }
                return ret;
            })();
            const selecionaMesAtual = elem_sel=>{
                elem_sel.selectedIndex = Math.max(0, new Date().getMonth());
            };
            this.sel_ano = this.criar_select('ANO', anos, d_mesAno);
            this.sel_mes = this.criar_select('MÊS', meses, d_mesAno);
            selecionaMesAtual(this.sel_mes);
            this.inp_unidade.oninput = ()=>{
                console.log('inp')
                this.inp_setor.clear();
                // this.inp_setor.item.id não é zerado com o this.inp_setor_clear()
                // this.inp_setor.id é zerado com o this.inp_setor_clear
            }
            this.inp_unidade.onchange = async ()=>{
                console.group("UNIDADE ONCHANGE");
                console.log(`ID: ${this.inp_unidade.item.tudo.id}`);
                console.groupEnd(`this.inp_unidade.id: ${this.inp_unidade.id}`);
                const setores = async (identificador) => {
                    const res = await this.super_get(this.xml, this.get_setores(this.inp_unidade.item.tudo.id), true);
                    const dados = res.map(d => {
                        return {id: d.id, nome: `${d?.sigla ? `${d.sigla} - ` : ''}${d.nome}`, tudo: d}
                    });
                    return {dados, identificador};
                };
                this.inp_setor.clear();
                this.inp_setor.focus();
                this.inp_setor.set_options(setores);
            }
            const bt = new MFt.bt({
                value: 'OK',
                width: 100,
                height: 30,
                marginTop: '60px',
                wrapper: d_botaoOk,
                callback: ()=>{
                    const ret = {
                        unidade: this.inp_unidade.item,
                        setor: this.inp_setor.item,
                        ano: parseInt(this.sel_ano[this.sel_ano.selectedIndex].value),
                        mes: parseInt(this.sel_mes[this.sel_mes.selectedIndex].value)
                    };
                    if (this.inp_unidade.id && this.inp_setor.id) {
                        // this.inp_setor.item.id não é zerado com o this.inp_setor_clear()
                        // this.inp_setor.id é zerado com o this.inp_setor_clear
                        form.closeWindow(form);
                        rr(ret);
                    }
                }
            })
        });
    }

    pesquisarTexto(textoMenor, textoMaior) { // retorna verdadeiro se todas as palavras do textoMenor estao tambem no textoMaior
        const itensTexto = textoMenor.split(" ");
        let achados = 0;
        textoMaior = this.ascii_mf(textoMaior).toLowerCase();
        for(let i of itensTexto) if (textoMaior.indexOf(this.ascii_mf(i).toLowerCase()) >= 0) achados++;
        return achados === itensTexto.length;
    };
}