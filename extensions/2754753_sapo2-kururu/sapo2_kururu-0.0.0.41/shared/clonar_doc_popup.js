class ClonarDocumentoPopUp extends Payloads {
    constructor(tarefa, id_comp_digital) {
        super();
        this.tarefa = tarefa;
        this.id_comp_digital = id_comp_digital;
        this.verificar();
        this.pop = undefined;
    }

    verificar() {
        if (!this.tarefa?.id) {
            alert('Tarefa não válida');
            throw new Error('Tarefa não válida');
        }
        if (!Number.isInteger(this.id_comp_digital)) {
            alert('ID do componente digital nao é válido');
            throw new Error("ID do componente digital nao é válido");
        }
    }

    iniciar() {
        this.verificar();
        this.pop = new PopUp(600, 400, null, null, async form=>{
            MFt.atribs(form.div, {
                style: {
                    fontSize: '15px',
                    fontFamily: 'Abel'
                }
            });
            const wrapper = MFt.criaElem('div', {

            }, form.div);
            const d1 = MFt.criaElem('div', {
                style: {
                    margin: '0 0 15px 0',
                }
            }, wrapper);
            const s1 = MFt.criaElem('span', {
                innerText: 'Tipo de Documento: ',
                style: {
                    fontWeight: 'bold',
                }
            }, d1);
            let dadosPecas = [
                {nome: '---', nome_peca: '', value: 0},
                {nome: 'Despacho', nome_peca: 'DESPACHO',  value: 1},
                {nome: 'Nota', nome_peca: 'NOTA', value: 2},
                {nome: 'Cota', nome_peca: 'COTA', value: 3},
                {nome: 'Parecer', nome_peca: 'PARECER', value: 5},
                {nome: 'Ata', nome_peca: 'ATA', value: 2159},
                {nome: 'Termo', nome_peca: 'TERMO', value: 340},
                {nome: 'Info. em MS', nome_peca: 'INFORMAÇÕES EM MANDADO DE SEGURANÇA', value: 2122},
                {nome: 'Pauta', nome_peca: 'PAUTA', value: 80871},
            ];
            // Substitui a relação de peças original pela que vem do Servidor -----------------------------
            const dadosPecasServidor = await this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
                task: 'arquivo',
                arquivo: 'modelos_clonar_docs.json'
            });
            if (Array.isArray(dadosPecasServidor) && dadosPecasServidor.length) {
                dadosPecas = dadosPecasServidor;
            }
            const s2 = MFt.criaElem('select', {
                style: {
                    fontFamily: 'Abel, Arial, serif',
                    fontSize: '15px'
                }
            }, d1);
            for(let d of dadosPecas) {
                MFt.criaElem('option', {
                    innerText: d.nome,
                }, s2, {
                    nome_peca: d.nome_peca,
                    value: d.value
                });
            }
            s2.onchange = ()=>{
                if (s2.selectedIndex === 0) return;
                const nome_modelo = s2[s2.selectedIndex].innerText;
                const id_modelo = parseInt(s2[s2.selectedIndex].getAttribute('value'));
                this.clonar(nome_modelo, id_modelo);
            };
        });
        this.pop.aceitaEsc = this.pop.clicafora_sair = true;
        this.pop.iniciar(this.pop);
    }

    async clonar(nome_modelo, id_modelo) {
        const print = (texto, img)=>{
            const d1 = MFt.criaElem('div', {

            }, this.pop.div);
            if (img instanceof Image) {
                d1.appendChild(img);
                img.style.margin = '0 5px 0 0';
            }
            MFt.criaElem('span', {
                innerText: texto
            }, d1);
        }
        this.pop.aceitaEsc = this.pop.clicafora_sair = false;
        MFt.clear(this.pop.div);
        const amp = new Image(15, 15);
        await this.load_image(amp, '/images/throbber_13.gif');
        print(`Criando ${nome_modelo} no NUP ${this.formatanup(this.tarefa.processo.NUP)}...`, amp);
        const clone = new ClonarComponenteDigital();
        const doc = await clone.init(this.tarefa.id, this.id_comp_digital, nome_modelo, id_modelo);
        const link = await doc.link_documento();
        if (link) {
            MFt.clear(this.pop.div);
            print('Documento criado com sucesso!');
            try {
                await this.registrar_evento(`Documento clonado. ${nome_modelo} ${this.formatanup(this.tarefa.processo.NUP)} (${this.id_comp_digital})`);
            } catch (e){console.log(e);}
            const wp = MFt.criaElem('div', {

            }, this.pop.div);
            MFt.criaElem('div', {
                innerText: `Deseja abrir o documento criado?`,
                style: {

                }
            }, wp);
            const d1 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 0'
                }
            }, wp);
            new MFt.bt({
                value: 'Sim',
                wrapper: d1,
                width: 100,
                height: 30,
                callback: ()=>{
                    window.open(link);
                    this.pop.closeWindow(this.pop);
                }
            });
            new MFt.bt({
                value: 'Não',
                wrapper: d1,
                width: 100,
                height: 30,
                marginLeft: '20px',
                callback: ()=>this.pop.closeWindow(this.pop)
            });
        }
    }
}