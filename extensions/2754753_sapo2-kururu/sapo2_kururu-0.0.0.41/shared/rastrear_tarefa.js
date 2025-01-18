class RastrearTarefa extends Payloads {
    constructor(tarefa, wrapper) {
        super();
        this.tarefa = tarefa;
        this.wrapper = wrapper;
        this.xml = new RequestMF();
        this.inicializar();
    }

    async inicializar() {
        MFt.clear(this.wrapper);
        MFt.atribs(this.wrapper, {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px'
            }
        });
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: '150px 80px 30px',
                alignItems: 'center'
            }
        }, this.wrapper);
        MFt.criaElem('div', {
            innerText: 'Consultando o "Super"...'
        }, d1);
        const img = new Image(16, 16);
        img.onload = ()=>{
            MFt.criaElem('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center'
                }
            }, d1).appendChild(img);
        }
        img.src = '/images/throbber_13.gif';
        this.todasTarefas = await this.obterTodasTarefas(MFt.criaElem('div', null, d1));
        console.log(this.todasTarefas);
        MFt.clear(this.wrapper);
        this.todasTarefas.sort((a, b)=>{
            // Organiza as tarefas por data de criacao em ordem ascendente
            return this.valida_data_hora(a.criadoEm).valueOf() - this.valida_data_hora(b.criadoEm).valueOf();
        });
        const wrapperCabecalho = MFt.criaElem('div', {
            style: {
                overflowX: 'hidden',
                overflowY: 'hidden',
                borderBottom: '1px solid #CCC',
                paddingBottom: '5px',
                marginBottom: '5px'
            }
        }, this.wrapper);
        const wrapperTarefas = MFt.criaElem('div', {
            style: {
                height: '400px',
                overflowX: 'hidden',
                overflowY: 'auto'
            }
        }, this.wrapper);
        this.cabecalhoProcesso(wrapperCabecalho);
        this.rastrear(wrapperTarefas);
    }

    async obterTodasTarefas(elem) {
        let total = 0;
        let tarefas = [];
        let offset = 0;
        while (total === 0 || tarefas.length < total) {
            const bloco = await this.super_get(this.xml, this.obter_historico_eventos(this.tarefa.processo.id, tarefas.length));
            if (!bloco?.total || !bloco?.entities) {
                await this.msgErro('Erro de comunicação com o Super');
                return;
            }
            total = bloco.total;
            tarefas = tarefas.concat(bloco.entities);
            elem.innerText = `(${tarefas.length}/${total})`;
        }
        return tarefas;
    }

    cabecalhoProcesso(wrapper) {
        const t = this.todasTarefas[0];
        const d1 = MFt.criaElem('div', null, wrapper);
        this.exibirCampo('Processo', this.formatanup(t.processo.NUP), MFt.criaElem('div', null, d1));
        this.exibirCampo('Título',t?.processo?.titulo || '???', MFt.criaElem('div', null, d1));
        this.exibirCampo('Descrição', t?.processo?.descricao || '---', MFt.criaElem('div', null, d1));
    }

    exibirCampo(label, valor, elem) {
        if (!elem instanceof HTMLElement) {
            throw new Error("Não foi atribuído um elemento do DOM à variável elem");
        }
        MFt.criaElem('span', {
            innerText: `${label}:`,
            style: {
                fontWeight: 'bold',
                marginRight: '7px'
            }
        }, elem);
        MFt.criaElem('span', {
            innerText: valor,
            style: {
                fontWeight: 'normal',
            }
        }, elem);
    }

    rastrear(wp) {
        const indiceTarefa = (()=>{
            for(let i = 0; i < this.todasTarefas.length; i++) if (this.todasTarefas[i].id === this.tarefa.id) return i;
            return undefined;
        })();
        if (!indiceTarefa) {
            wp.innerText = 'Erro ao rastrear a tarefa.';
            return;
        }

    }
}