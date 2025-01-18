class SalvarPeca extends Payloads {
    _id_comp;
    _titulo;
    _wrapper;

    constructor(id_comp, titulo, wrapper) {
        super();
        this._id_comp = id_comp;
        this._titulo = titulo;
        this._wrapper = wrapper;
        this.pop = undefined;
        if (!(this._wrapper instanceof HTMLElement)) {
            this.pop = new PopUp(500, 330, null, null, form=>{
                this._wrapper = form.div;
            });
            this.pop.iniciar(this.pop);
            this.pop.aceitaEsc = this.pop.clicafora_sair = true;
        }
        this.formulario();
    }

    async formulario() {
        const MAXCAMPOS = 255;
        const info = new Image(16);
        this.load_image(info, "/images/info.svg");
        MFt.atribs(info, {
            style: {
                padding: '0 0 6px 5px',
                cursor: 'pointer'
            }
        });
        MFt.atribs(this._wrapper, {
            style: {
                fontSize: '14px',
                fontFamily: 'Patrick Hand'
            }
        });
        const wr = MFt.criaElem('div', {

        }, this._wrapper);
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #CCC',
                padding: '0 0 5px 0',
                margin: '0 0 10px 0'
            }
        }, wr);
        MFt.criaElem('span', {
            innerText: "Incluir na relação de peças de referência",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                fontFamily: 'Patrick Hand',
                margin: '0 0 10px 0',
                textShadow: '2px 2px 2px #CCC'
            }
        }, d1);
        d1.appendChild(info);
        const d2 = MFt.criaElem('div', {
            style: {
                fontFamily: 'Patrick Hand',
                fontSize: '16px'
            }
        }, wr);
        const titulo = this.campo_texto('Título', '', d2, 485);
        const referencia = this.campo_texto('Referência', this._titulo || '', d2, 485);
        const obs = this.campo_texto('Observação', '', d2, 485, false, true, {
            height: 70,
            style: {
                background: '#fffcd8',
                border: '1px solid #999',
                boxshadow: '2px 2px 2px #AAA'
            }
        }, {
            fontFamily: 'Patrick Hand',
            fontSize: '18px'
        });
        titulo.onkeydown = e=>analisar_maximo(e);
        referencia.onkeydown = e=>analisar_maximo(e);
        obs.onkeydown = e=>analisar_maximo(e);
        // ---------------------------------------------------------------------
        titulo.onpaste = e=>analisar_paste(e);
        referencia.onpaste = e=>analisar_paste(e);
        obs.onpaste = e=>analisar_paste(e);
        const analisar_paste = e=>{
            const texto = e.clipboardData.getData('text/plain');
            if (e.target.value.length + texto.length > MAXCAMPOS) {
                e.preventDefault();
                e.stopPropagation();
                alert(`O texto não pode ter mais de ${MAXCAMPOS} digitos.`);
            }
        }
        const analisar_maximo = e=>{
            const lista = ['Shift', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape', 'Alt', 'Control', 'Meta'];
            if (e.ctrlKey || e.metaKey) {
                // console.log(e);
                // if (e.key === 'v') {
                //     e.stopPropagation();
                //     e.preventDefault();
                // }
                return;
            }
            if (e.target.value.length > MAXCAMPOS && !lista.some(d=>e.key === d)) {
                alert(`O texto não pode ter mais de ${MAXCAMPOS} digitos (keyup)`);
                e.preventDefault();
                e.stopPropagation();
            }
        }
        titulo.focus();
        const btsalvar = new MFt.bt({
            value: 'Salvar',
            width: 100,
            height: 30,
            wrapper: MFt.criaElem('div', {}, d2),
            callback: async ()=>{
                if (this.pop) {
                    if (!titulo.value.trim()) {
                        alert('A peça precisa de um título');
                        titulo.focus();
                        return;
                    }
                    if (obs.value.length > MAXCAMPOS) {
                        alert(`O texto de observação não pode ter mais de ${MAXCAMPOS} digitos`);
                        return;
                    }
                    if (titulo.value.length > MAXCAMPOS) {
                        alert(`O texto de título não pode ter mais de ${MAXCAMPOS} digitos`);
                        return;
                    }
                    if (referencia.value.length > MAXCAMPOS) {
                        alert(`O texto de referência não pode ter mais de ${MAXCAMPOS} digitos`);
                        return;
                    }
                    const des = this.pop.bloquear(this.pop, 'Salvando...');
                    if (await this.request_salvar(this._id_comp, titulo.value, referencia.value, obs.value)) {
                        des();
                        this.pop.closeWindow(this.pop);
                    }
                    des();
                }
                else {
                    await this.exibir_instrucoes(wr, 'Salvando...', {fontSize: '16px'},false, 2000);
                    MFt.clear(this._wrapper);
                }
            }
        });
        info.onclick = ()=>this.exibir_instrucoes(wr, 'A peça salva vai constar em uma relação pessoal e exclusiva de peças que podem ser utilizadas como referência para consulta ou para a produção de novos pareceres.', {fontSize: '16px'});
    }

    async request_salvar(id_comp, titulo, ref, obs) {
        titulo = titulo.trim();
        ref = ref.trim();
        obs = obs.trim();
        const url = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        return await this.request_mf(url, {
            task: 'salvar_peca_referencia',
            id_comp,
            titulo,
            ref,
            obs
        });
    }
}