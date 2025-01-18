class Grupo extends Payloads {
    _opcoes;
    _icone;
    _nome_grupo;
    _width;
    _tipos_icones;

    /**
     *
     * @param tarefas
     * @param wp
     * @param tipos_icones
     * @param opcoes
     * @param icone
     * @param nome_grupo
     * @param width
     * @param pai {Tarefas}
     */
    constructor(tarefas, wp, tipos_icones, opcoes, icone, nome_grupo, width, pai) {
        super();
        this._opcoes = opcoes;
        this._icone = icone;
        this._nome_grupo = nome_grupo;
        this._tipos_icones = tipos_icones; // Lista com ID da tarefa, o ícone correspondente e o título resumido
        this.icon_width = 80;
        this.icon_height = 80;
        this._width = width || 700;
        this.height = 700;
        this.pai = pai; // Referência a tarefas2.js
        console.group("PAI TAREFAS (grupo.js) ------------------------------------------------------ ");
        console.log(pai);
        console.log('this.pai instance of Tarefas =', this.pai instanceof Tarefas);
        if (!pai) console.trace();
        console.groupEnd();
        this.fontSize = 20;
        this.tarefas = tarefas;
        this.wp = wp;
        this.tipo = this.definir_tipo();
        this.icon = new Image(this.icon_width, this.icon_height);
        if (!Array.isArray(tarefas) && !nome_grupo && !icone) {
            const msg = "Erro ao criar Grupo. Informações inconsistentes.";
            console.trace();
            alert(msg);
            throw new Error(msg);
        }
        this.icon.onload = ()=>{
            // MUITO IMPORTANTE!
            // MUITO IMPORTANTE!
            // MUITO IMPORTANTE!
            // O arquivo do ícone deve existir. Do contrário, a tarefa não será carregada.
            if (tarefas) console.log(tarefas[0].especieTarefa.nome, tarefas[0].especieTarefa.id);
            this.init(); // Se for colocado fora daqui, há a chance de não apresentar tarefa nenhuma
        };
        this.icon.src = this.tipo.image;
    }

    init() {
        this.exibir_div();
    }

    exibir_div() {
        this.dMain = MFt.criaElem('div', {
            style: {
                margin: '10px',
                padding: '10px',
                textAlign: 'center',
            }
        }, this.wp, {wrapper: ''});
        this.dIcone = MFt.criaElem('div', {
            style: {
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer'
            }
        }, this.dMain, {div_icone:''});
        this.dIcone.appendChild(this.icon);
        const divTexto = MFt.criaElem('div', {
            style: {
                margin: '5px 0 0 0'
            }
        }, this.dMain);
        const spanTexto = MFt.criaElem('span', {
            innerText: `${this.tipo.titulo}${Array.isArray(this.tarefas) ? ': ' + this.tarefas.length : ''}`,
            style: {
                fontSize: `${this.fontSize}px`,
                fontFamily: '"Titillium Web", cursive',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '7px',
                textShadow: '2px 2px 2px rgba(255, 255, 255, 0.5)',
                // border: '2px solid black',
                padding: '3px 20px',
                boxShadow: '3px 3px 20px #333',
                border: '1px solid #333'
            }
        }, divTexto);
        this.dInfo = MFt.criaElem('div', {
            style: {
                width: '0',
                height: '0'
            }
        }, this.dIcone, {mais_info:''});
        this.dIcone.style.zIndex = 0;
        this.dInfo.style.zIndex = 'inherit';
        this.icon.onmouseenter = Grupo.ponte_exibir_info.bind(this);
    }

    static ponte_exibir_info() {
        this.limpar_resultados_nup();
        this.exibir_info();
    }

    limpar_resultados_nup() {
        MFt.clear(MFt.$('resultados_nup')); // Eh definido do metodo campo_pesquisar() de tarefas2.js
        MFt.atribs(MFt.$('resultados_nup'), {
            style: {
                height: '0'
            }
        });
    }

    exibir_info() {
        if (this.pai instanceof Tarefas) this.pai.show_dica_pesquisa(null, null, true); // clear searching tip
        else {
            MFt.clear(MFt.$('dica_pesquisa')); // since there's no this.pai to reference this.pai.show_dica_pesquisa() in order to clear searching tip, we use this line to force a cleansing
        }
        this.icon.onmouseenter = null;
        const icone_width = 64;
        let ultrapassou = this.icon.getBoundingClientRect().x + this.icon.getBoundingClientRect().width + this._width > window.innerWidth;
        const limpar = ()=>{ // retira os processos da tela
            this.dIcone.removeEventListener('mouseleave', limpar);
            MFt.clear(this.dInfo);
            this.icon.onmouseenter =  Grupo.ponte_exibir_info.bind(this);
        };
        // Faz desaparecer as opções quando o mouse sai -------------------------------------
        this.dIcone.addEventListener('mouseleave', limpar);
        MFt.clear(this.dInfo);
        const wrapper = MFt.criaElem('div', {
            style: {
                position: 'relative',
                width: `${this._width}px`,
                maxHeight: `${this.height}px`,
                border: '1px solid black',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.9)',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxShadow: '5px 5px 5px rgba(50,50,50,0.5)'

            }
        }, this.dInfo, {wrapper:''});
        if (ultrapassou) {
            wrapper.style.right = `${this._width + icone_width}px`
        }
        wrapper.style.zIndex = 'inherit';
        // --------------------------------------------------------
        if (Array.isArray(this.tarefas) && this.tarefas.length) {
            for (let i = 0; i < this.tarefas.length; i++) {
                const t = this.tarefas[i];
                new ItemTarefa(t, wrapper, i, this);
            }
        }
        else {
            for(let o of this._opcoes) {
                new ItemOpcao(o, wrapper);
            }
        }
    }

    definir_tipo() {
        if (typeof this._nome_grupo === "string" && typeof this._icone === "string" && this._nome_grupo && this._icone) {
            return {
                image: this._icone,
                titulo: this._nome_grupo
            }
        }
        const id = Array.isArray(this.tarefas) ? this.tarefas[0].especieTarefa.id : null;
        if (!Number.isInteger(id)) {
            alert("Erro no ID da tarefa ou nas especificações das opções do grupo.");
            throw new Error("Erro no ID da tarefa ou nas especificações das opções do grupo");
        }
        for(let icone of this._tipos_icones) {
            if (icone.caso === id) return icone;
        }
        return {
            image: '/images/iu-2.png',
            titulo: `${this.tarefas[0].especieTarefa.nome.substring(0,1)}${this.tarefas[0].especieTarefa.nome.toLowerCase().substring(1)}`
        };
    }
}