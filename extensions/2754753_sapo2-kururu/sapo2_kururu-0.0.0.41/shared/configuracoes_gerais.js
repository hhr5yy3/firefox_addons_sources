class ConfiguracoesGerais extends Payloads {
    constructor(wrapper, classe_mae) {
        super();
        this.mpurl = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.config = {};
        this.wrapper = wrapper;
        this.classe_mae = classe_mae;
        this.frog_sound = new Audio('/sounds/frog.oga');
        this.wp = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateRows: '45px auto auto auto auto'
            }
        });
        this.controles = [];
        console.group('CLASSE MAE');
        console.log(this.classe_mae);
        console.groupEnd();
        this.iniciar();
    }

    static get config_padrao() {
        return {
            volume_sapo: 80,
            leitura_automatica: false,
            inicio_automatico: false,
        }
    }

    async iniciar() {
        const config_padrao = {
            volume_sapo: 80,
            leitura_automatica: false,
            inicio_automatico: false,
        };
        this.frog_sound.onended = e=>this.frog_sound.currentTime = 0;
        this.config = await this.request_mf(this.mpurl, {
            task: 'obter_configuracoes_gerais'
        });
        this.config = Array.isArray(this.config) && this.config.length ? JSON.parse(this.config[0]['dados']) : config_padrao;
        this.config = ConfiguracoesGerais.compatibilizar(this.config);
        console.log(this.config);
        MFt.clear(this.wrapper);
        this.wrapper.appendChild(this.wp);
        this.header();
        this.controles.push(this.volume_sapo());
        if (this.profile.id === 8499) {
            // Nao apresenta a leitura automatica para outros usuarios
            this.controles.push(this.leitura_automatica());
        }
        this.controles.push(this.inicio_automatico());
    }

    static compatibilizar(val) {
        for(let i in ConfiguracoesGerais.config_padrao) {
            if (ConfiguracoesGerais.config_padrao.hasOwnProperty(i) && !val.hasOwnProperty(i)) val[i] = ConfiguracoesGerais.config_padrao[i];
        }
        return val; // eu sei que da pra retornar como referencia, mas preferi assim
    }

    header() {
        const d = MFt.criaElem('div', {
            style: {
                border: 'none',
                borderBottom: '1px solid #CCC',
                paddingBottom: '5px',
                marginBottom: '10px'
            }
        }, this.wp);
        new HeaderShow('Configurações', d, 'Titillium Web', '20px', '#111', '2px 2px 2px #CCC', 'none');
    }

    volume_sapo() {
        const d1 = MFt.criaElem('div', {
            style: {
                height: '40px',
                display: 'grid',
                gridTemplateColumns: '260px auto',
                fontSize: '16px',
                alignItems: 'center'
            }
        }, this.wp);
        const d2 = MFt.criaElem('div', {
            innerText: 'Volume de aviso de nova tarefa:',
            style: {

            }
        }, d1);
        const i1 = MFt.criaElem('input', {
            type: 'range',
            min: '0',
            max: '100',
            value: Number.isInteger(this.config?.volume_sapo) ? this.config.volume_sapo.toFixed(0) : 80
        }, d1);
        i1.onmouseup = async e=>{
            if (this.config.volume_sapo !== parseInt(i1.value)) {
                this.frog_sound.volume = parseFloat(i1.value / 100);
                this.frog_sound.load(); // Para parar a execução do som
                this.frog_sound.currentTime = 0;
                this.frog_sound.play();
                this.config.volume_sapo = parseInt(i1.value);
                const res = await this.salvar_dados();
                console.log(`Novo Volume: ${parseInt(i1.value)}`);
            }
        }
        return i1;
    }

    leitura_automatica() {
        const d1 = MFt.criaElem('div', {
            style: {
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
                fontFamily: 'Titillium Web'
            }
        }, this.wp);
        const i1 = MFt.criaElem('input', {
            type: 'checkbox',
            style: {
                marginRight: '10px'
            }
        }, d1);
        i1.checked = this.config?.leitura_automatica || false;
        const d2 = MFt.criaElem('span', {
            innerText: 'Leitura Automática de Processos'
        }, d1);
        i1.onchange = async ()=>{
            this.config.leitura_automatica = i1.checked;
            await this.salvar_dados();
        };
        return i1;
    }

    inicio_automatico() {
        const d1 = MFt.criaElem('div', {
            style: {
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
                fontFamily: 'Titillium Web'
            }
        }, this.wp);
        const i1 = MFt.criaElem('input', {
            type: 'checkbox',
            style: {
                marginRight: '10px'
            }
        }, d1);
        i1.checked = this.config?.inicio_automatico || false;
        const d2 = MFt.criaElem('span', {
            innerText: 'Início automático do Kururu'
        }, d1);
        i1.onchange = async ()=>{
            this.config.inicio_automatico = i1.checked;
            await this.salvar_dados();
        };
        return i1; // Para o checkbox ficar disabilitado quando os dados estiverem sendo salvos
    }

    async salvar_dados() {
        this.bloquear_controles(true);
        if (Number.isInteger(this?.classe_mae?.config?.volume_sapo)) {
            this.classe_mae.volume_sapo = this.config.volume_sapo;
            console.log('NOVO VOLUME SALVO: ', this.classe_mae.volume_sapo);
        }
        const res = await this.request_mf(this.mpurl, {
            task: 'salvar_configuracoes_gerais',
            dados: JSON.stringify(this.config)
        });
        if (res?.erro) {
            alert(res.erro);
        }
        this.bloquear_controles(false);
    }

    bloquear_controles(s=true) {
        for(let c of this.controles) c.disabled = s;
    }
}