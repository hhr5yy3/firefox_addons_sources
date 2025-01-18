class RegistrarReuniao extends Payloads {
    constructor(id_processo) {
        super();
        this.id_processo = id_processo;
        this.xml = new RequestMF();
        this.init();
    }

    init() {
        const estilo_textarea = {
            resize: 'none',
            width: 'calc(100% - 20px)',
            fontFamily: 'Arial Narrow',
            background: '#fffec7',
            borderRadius: '6px',
            padding: '10px',
            outline: 'none',
            fontSize: '16px',
            border: '1px solid #CCC'
        };
        const pop = new PopUp(700, 500, null, null, async form=>{
            MFt.atribs(form.div, {
                style: {
                    fontSize: '16px',
                    fontFamily: 'Arial Narrow'
                }
            });
            const amp = new Image(16, 16);
            const certo = new Image(16, 16);
            await this.load_image(amp, '/images/throbber_13.gif');
            await this.load_image(certo, '/images/certo.png');
            const estilo1 = {
                display: 'grid',
                gridTemplateColumns: '40px auto'
            };
            const d1 = MFt.criaElem('div', {

            }, form.div);
            MFt.criaElem('div', {
                innerText: 'O procedimento consiste nos seguintes passos:',
                style: {
                    fontWeight: 'bold'
                }
            }, d1);
            const d2 = MFt.criaElem('div', {
                style: estilo1,
            }, d1);
            const d3 = MFt.criaElem('div', {
                style: estilo1,
            }, d1);
            const d4 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 10px'
                }
            }, d1);
            const d5 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 10px'
                }
            }, d1);
            const d6 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 10px'
                }
            }, d1);
            const d7 = MFt.criaElem('div', {
                style: {
                    margin: '10px 0 0 0px'
                }
            }, d1);
            MFt.criaElem('div', {
                innerText: 'OBSERVAÇÃO DA ATIVIDADE (opcional)',
                style: {
                    fontFamily: 'Arial Narrow',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }, d6)
            const obs = MFt.criaElem('textarea', {
                style: estilo_textarea
            }, d6);
            MFt.criaElem('div', {
                innerText: 'TEXTO DO DESPACHO (opcional)',
                style: {
                    fontFamily: 'Arial Narrow',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }, d5)
            const despacho = MFt.criaElem('textarea', {
                style: estilo_textarea
            }, d5);
            despacho.style.height = '150px';
            obs.style.height = '80px';
            console.log(this.profile.colaborador);
            let lotacoes = this.profile.colaborador.lotacoes.map(d=>{
                const nome = (d.setor.sigla ? `${d.setor.sigla}/${d.setor.unidade.sigla} - ` : '') + d.setor.nome.substr(0, 45)
                return {nome, value: d.setor.id, principal: d.principal ? 1 : 0};
            });
            lotacoes.sort((a, b)=>b.principal - a.principal);
            console.log(lotacoes);
            const sel = this.criar_select('Escolha a lotação', lotacoes, d4);
            sel.style.fontFamily = 'Arial Narrow';
            const sd1 = MFt.criaElem('div', {
                innerText: '-',
                style: {
                    textAlign: 'center'
                }
            }, d2);
            const sd2 = MFt.criaElem('div', {
                innerText: '-',
                style: {
                    textAlign: 'center'
                }
            }, d3);
            MFt.criaElem('span', {
                innerText: 'Criar a tarefa de "Participar de Reunião de Trabalho Interna" no presente processo'
            }, d2);
            MFt.criaElem('span', {
                innerText: 'Lançar a atividade "Reunião de Trabalho Interna, Participação".'
            }, d3);
            const sb1 = MFt.criaElem('span', null, d7);
            const sb2 = MFt.criaElem('span', null, d7);
            const cancelar = new MFt.bt({
                value: 'Cancelar',
                wrapper: sb2,
                width: 120,
                height: 30,
                marginLeft: '15px',
                callback: ()=>{
                    form.closeWindow(form);
                }
            });
            const ok = new MFt.bt({
                value: 'Prosseguir',
                wrapper: sb1,
                width: 120,
                height: 30,
                callback: async ()=>{
                    MFt.clear(sd1);
                    MFt.clear(sd2);
                    sd1.appendChild(amp.cloneNode());
                    sd2.appendChild(amp.cloneNode());
                    obs.disabled = despacho.disabled = ok.disabled = cancelar.disabled = true;
                    const teste = await this.super_get(this.xml, this.get_unidade_pelo_id(1), true);
                    if (!Array.isArray(teste) && teste.length) {
                        alert("Login parece ter expirado no Super Sapiens");
                        obs.disabled = despacho.disabled = ok.disabled = cancelar.disabled = false;
                        return;
                    }
                    const lotacao = parseInt(sel[sel.selectedIndex].value);
                    const prazo = this.calcular_prazo_2(1, [], new Date());
                    console.log(lotacao);
                    console.log(this.calcular_prazo_2(1, [], new Date()));
                    let tarefa = await this.super_get(this.xml, this.criar_tarefa(prazo.inicio, prazo.fim, 1, 342, this.id_processo, this.profile.id, lotacao, lotacao, obs.value.substr(0, 255)));
                    console.log(tarefa);
                    if (!tarefa) {
                        console.log("Erro na primeira tentativa. Esperando 5 segundos.");
                        await this.esperar(5000);
                        console.log("Tentando novamente.");
                        tarefa = await this.super_get(this.xml, this.criar_tarefa(prazo.inicio, prazo.fim, 1, 342, this.id_processo, this.profile.id, lotacao, lotacao, obs.value.substr(0, 255)))
                    }
                    if (!tarefa) {
                        alert('Não foi possível criar Tarefa no Super.');
                        obs.disabled = despacho.disabled = ok.disabled = cancelar.disabled = false;
                        return;
                    }
                    MFt.clear(sd1);
                    sd1.appendChild(certo.cloneNode());
                    tarefa = await this.super_get(this.xml, this.get_tarefa(tarefa.id), true, true);
                    if (despacho.value.trim()) {
                        const orgaoCentral = await this.super_get(this.xml, this.get_unidade_pelo_id(tarefa.setorResponsavel.unidade.id), true, true);
                        this.orgaoCentral = {nome: orgaoCentral?.modalidadeOrgaoCentral?.descricao || 'CONSULTORIA-GERAL DA UNIÃO', sigla: orgaoCentral?.modalidadeOrgaoCentral?.valor || 'CGU'};
                        let documento = new CriarDocumento(tarefa, 'despacho', null, despacho.value, null, null, null, null, this.orgaoCentral);
                        let resDoc = await documento.init();
                    }
                    let minutas = await this.super_get(this.xml, this.get_minutas(tarefa.id), true);
                    minutas = minutas ? minutas.map(d=>d.id) : [];
                    const atividade = await this.super_get(this.xml, this.lancar_atividade(new Date(), minutas, 499, tarefa.id, this.profile.id, obs.value.substr(0, 255))); // "REUNIÃO DE TRABALHO INTERNA, REALIZAÇÃO DE"
                    MFt.clear(sd2);
                    sd2.appendChild(certo.cloneNode());
                    MFt.clear(d7);
                    const fechar = new MFt.bt({
                        value: 'Fechar',
                        wrapper: d7,
                        width: 120,
                        height: 30,
                        marginLeft: '15px',
                        callback: ()=>{
                            form.closeWindow(form);
                        }
                    });
                }
            });
        });
        pop.aceitaEsc = pop.clicafora_sair = false;
        pop.iniciar(pop);
    }
}