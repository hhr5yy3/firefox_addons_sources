class RelatorioTarefasAbertas extends Payloads {
    constructor() {
        super();
        this.wrapper = undefined;
        this.max_setores_por_unidade = 10;
        this.xml = new RequestMF();
    }

    async init(wrapper) {
        this.wrapper = wrapper;
        MFt.clear(this.wrapper);
        this.wrapper.style.fontFamily = 'Patrick Hand';
        this.wrapper.innerText = 'Aguarde...';
        // console.log(this.profile);
        if (!this?.profile?.coordenadores?.length) {
            alert('Usuário não é Coordenador de Unidade');
            return;
        }
        const setor_selecionado = await this.selecionar_unidade();
        let setores;
        try {
            setores = await this.super_get(this.xml, this.get_setores(setor_selecionado.setor.unidade.id), true);
        } catch (e) {
            alert('Super indisponível!');
            this.wrapper.innerText = 'Super indisponível!';
            return;
        }
        if (setores.length > this.max_setores_por_unidade) {
            console.log(`%cA unidade a qual pertence o setor selecionado tem mais de ${this.max_setores_por_unidade}. O relatório será exclusivamente do setor e não da unidade a qual pertence.`, 'color:red;');
            setores = [setor_selecionado.setor];
        }
        this.wrapper.innerText = 'Obtendo nomes de usuários...';
        let usuarios = await this.obter_usuarios(setores);
        for (let i = 0; i < usuarios.length; i++) {
            this.wrapper.innerText = `Obtendo tarefas de usuários: ${i + 1}/${usuarios.length}`;
            try {
                usuarios[i].tarefas = await this.obter_todas_tarefas(usuarios[i].id);
            } catch (e) {
                alert('Super indisponível!');
                this.wrapper.innerText = 'Super indisponível!';
                return;
            }
        }
        console.log(usuarios[0]);
        usuarios.sort((a,b)=>this.comparaNomes(a.nome, b.nome));
        MFt.clear(this.wrapper);
        for(let u of usuarios) this.exibir_tarefas_usuarios(u, this.wrapper);
    }

    async selecionar_unidade() {
        return new Promise(dd=>{
            const pop = new PopUp(570, 100, null, null, async form=>{
                const falta_perfil = async ()=>{
                    form.div.innerText = 'Para utilizar esta funcionalidade você precisa ter o perfil de coodenador em alguma unidade de lotação.';
                    await this.esperar(7000);
                    window.close();
                }
                console.log("PROFILE ====================================");
                console.log(this.profile);
                if (this.profile?.coordenadores) console.log(this.profile.coordenadores);
                else console.log("NAO EXISTE A CHAVE COORDENADORES");
                if (!Array.isArray(this?.profile?.coordenadores)) {falta_perfil(); return;}
                if (this.profile.coordenadores.length === 0) {falta_perfil(); return;}
                for(let c of this.profile.coordenadores) console.log(c);
                const dados = [{id: 0, nome: '---'}].concat(this.profile.coordenadores.map(d=>{
                    return {id: d.id, nome: `${d?.setor?.unidade?.sigla ? (d.setor.unidade.sigla + " - ") : ''}${d?.setor?.sigla ? d.setor.sigla : ''}`};
                }));
                const sel = this.criar_select('Selecione a unidade', dados, form.div);
                sel.onchange = ()=>{
                    const setor_id = sel[sel.selectedIndex].id;
                    pop.closeWindow(pop);
                    dd(this.profile.coordenadores.filter(d=>d.id === parseInt(setor_id))[0]);
                }
            });
            pop.clicafora_sair = pop.aceitaEsc = false;
            pop.iniciar(pop);
        });
    }

    async obter_usuarios(setores) {
        let ret = [];
        for(let s of setores) {
            const usuarios = await this.super_get(this.xml, this.get_usuarios_setor(s.id), true);
            for(let u of usuarios) if (!ret.some(d=>d.id === u.id)) {
                u.setor = s;
                ret.push(u);
            }
        }
        return ret;
    }

    async obter_todas_tarefas(id) {
        let recebidos = 0;
        let tarefas = [];
        let total = 100000000;
        for(let offset = 0; offset < total; offset += recebidos) {
            const res = await this.super_get(this.xml, this.get_tarefas(id, null, false, offset), true);
            recebidos = res.length;
            tarefas = tarefas.concat(res);
            total = res.total;
            console.log(tarefas.length, recebidos);
        }
        return tarefas;
    }

    exibir_tarefas_usuarios(dd, elem) {
        console.log(dd);
        const d1 = MFt.criaElem('div', {
            style: {
                margin: '0 0 20px 0',
                padding: '0 0 20px 0',
                borderBottom: '1px solid #CCC'
            }
        }, elem);
        const label = MFt.criaElem('div', {

        }, d1);
        MFt.criaElem('span', {
            innerText: this.femea(dd.nome) ? 'Usuária: ' : 'Usuário: ',
            style: {
                fontWeight: 'bold'
            }
        }, label);
        MFt.criaElem('span', {
            innerText: dd.nome,
            style: {

            }
        }, label);
        if (!dd?.isDisponivel) {
            MFt.criaElem('span', {
                innerText: this.femea(dd.nome) ? ' (afastada)' : ' (afastado)',
                style: {

                }
            }, label);
        }
        else {
            MFt.criaElem('span', {
                innerText: ` (${dd.id})`,
                style: {

                }
            }, label);
        }
        if (dd.tarefas.length === 0) {
            MFt.criaElem('div', {
                innerText: `Não existem tarefas em aberto no presente momento - ${this.date2normal(new Date(), true)}`
            }, d1);
            return;
        }
        let dadosTabela = [];
        for(let t of dd.tarefas) {
            // console.log(t);
            const corprazo = (()=>{
                if (t?.dataHoraInicioPrazo && t?.dataHoraFinalPrazo) {
                    let fim = this.valida_data_hora(t?.dataHoraFinalPrazo);
                    let hoje = new Date();
                    fim.setHours(23, 59, 59, 999);
                    hoje.setHours(23, 59, 59, 999);
                    // console.log(this.date2normal(fim, true), this.date2normal(hoje, true), fim.valueOf(), hoje.valueOf(), fim.valueOf() - hoje.valueOf() > 0 ? "black" : "red");
                    return fim.valueOf() - hoje.valueOf() < 0 ? "red" : "black";
                }
                return "black";
            })();
            const dias = (()=>{
                let inicio = this.valida_data_hora(t?.dataHoraInicioPrazo);
                let hoje = new Date();
                inicio.setHours(0, 0, 0, 0);
                hoje.setHours(0, 0, 0, 0);
                return ((hoje.valueOf() - inicio.valueOf()) / 1000) / 86400;
            })();
            dadosTabela.push({
                nup:`<span style="color:${corprazo}">${this.formatanup(t.processo.NUP)}</span>`,
                id: `<span style="color:${corprazo}">${t.id}</span>`,
                especie: `<span style="color:${corprazo}">${t.especieTarefa.nome}</span>`,
                distribuicao: t?.dataHoraDistribuicao ? `<span style="color:${corprazo}">${this.date2normal(this.valida_data_hora(t.dataHoraDistribuicao), true)}</span>` : '---',
                inicioprazo: t?.dataHoraInicioPrazo ? `<span style="color:${corprazo}">${this.date2normal(this.valida_data_hora(t.dataHoraInicioPrazo), true)}</span>` : '---',
                finalprazo: t?.dataHoraFinalPrazo ? `<span style="color:${corprazo}">${this.date2normal(this.valida_data_hora(t.dataHoraFinalPrazo), true)}</span>` : '---',
                leitura: t?.dataHoraLeitura ? `<span style="color:${corprazo}">${this.date2normal(this.valida_data_hora(t.dataHoraLeitura), true)}</span>` : '---',
                dias: `<span style="color:${corprazo}">${dias}</span>`,
                setorResponsavel: `<span style="color:${corprazo}">${t.setorResponsavel.unidade.sigla}/${t.setorResponsavel.sigla}</span>`
            });
        }
        const tabela = new CriarTabela(
            dadosTabela,
            [
                {campo: "nup", titulo: "NUP"},
                {campo: "id", titulo: 'ID'},
                {campo: "especie", titulo: "ESPÉCIE"},
                {campo: "distribuicao", titulo: "DISTRIBUIÇÃO"},
                {campo: "inicioprazo", titulo: "INÍCIO"},
                {campo: 'finalprazo', titulo: "FIM"},
                {campo: "leitura", titulo: "LEITURA"},
                {campo: "dias", titulo: "DIAS"},
                {campo: "setorResponsavel", titulo: "SETOR"},
            ],
            MFt.criaElem('div', {
                style: {

                }
            }, d1),
            [166, 90, 300, 155, 155, 155, 155, 40, 155],
            true
        );
    }

    comparaNomes(a, b) {
        a = this.ascii_mf(a).toLowerCase();
        b = this.ascii_mf(b).toLowerCase();
        if (a == b) return 0;
        return a > b;
    }
}