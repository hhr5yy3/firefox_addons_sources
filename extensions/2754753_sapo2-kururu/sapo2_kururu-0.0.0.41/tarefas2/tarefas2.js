const urlmpsuper = "https://manoelpaz.com/cgi-bin/agu/super/super";

window.onload = ()=>{
    let tarefas = undefined;
    localStorage.removeItem('token_original'); // para evitar um falso positivo ao se esperar o token original
    localStorage.removeItem('super_token'); // Retira o existente para atualizar
    localStorage.removeItem('token_expire'); // Retira o existente para atualizar
    localStorage.removeItem('super_profile');
    new Tarefas();
};

class Tarefas extends Payloads {
    constructor() {
        super();
        this.background = undefined;
        this.icones_tarefas = [];
        this.id_teste = MFt.urlArgs()['id'];
        this.verificando_novas_tarefas = false;
        this.janela_lancar_atividade_aberta = false; // Para impedir a atualização (recarregar a página) das tarefas enquanto a janela estiver aberta
        this.config = {}; // configurações gerais
        this.frog_sound = new Audio('/sounds/frog.oga'); // Carrega o arquivo de audio
        this.frog_sound.onended = e=>this.frog_sound.currentTime = 0;
        this.dicas_pesquisa = {};
        this.dicas_pesquisa_indice = 0;
        this.nao_exibir_dica_pesquisa = false;
        this.is_dica_pesquisa_showing = false;
        this.mensagens();
        this.init();
    }

    mensagens() {
        browser.runtime.onMessage.addListener((msg, sender, sendResponse)=> {
            console.log(msg);
            if (msg.task === 'recarregar_tarefas') {
                if (!this.verificando_novas_tarefas) this.inicializacao();
                //location.reload(); // Tentei o this.init(), mas quando se lança atividade aqui em tarefas2.js, dá erro na msggenerica.js porque não se fecha o PopUp antigo e esta página começa com um novo msggenerica.js
            }
        });
    }

    async init() {
        this.inicializacao();
        const atualizacao = setInterval(async ()=>{
            if (this.verificando_novas_tarefas) return;
            if (this.janela_lancar_atividade_aberta) {
                console.log('EVITANDO ATUALIZAR TAREFAS: janela lançar atividade está aberta', new Date());
                return;
            }
            if (await this.verificar_novas_tarefas()) {
                console.log(this.config);
                const volume = parseFloat(this?.config?.volume_sapo / 100) || .8;
                //console.log('VOLUME TAREFA: ', volume);
                //this.frog_sound.load();
                this.frog_sound.volume = volume;
                await this.frog_sound.play();
            }
        }, 15000);
    }

    async inicializacao(buscar_tarefas=true, novo_background=true) {
        document.body.innerText = 'Aguarde...';
        await (async ()=>{
            // Utilizado apenas para evitar ter que autenticar novamente no Super pelo super_log.py
            // O request do versiculo vai aparecer duas vezes, mas é o esperado, só para testar se está autenticado no sapo
            const xml = new RequestMF();
            const verso = await xml.request(urlmpsuper, {task:'get_versiculo'});
            if (!verso?.verso) {
                console.log('PRECISEI AUTENTICAR -------------------------');
                const res = await xml.request("https://manoelpaz.com/cgi-bin/agu/super/super_log.py", {auth: `${this.auth}`});
            }
        })();
        await this.obter_config();
        this.dicas_pesquisa = await this.request_mf(urlmpsuper, {task:"arquivo", arquivo:"dicas_pesquisa.json"});
        if (novo_background && !this.background) this.background = new Background();
        MFt.clear(document.body);
        PopUp.count = 0; // Do contrário, dá erro "já existe um popup ativo" porque um eventual popup que estivesse na tela não foi fechado com o PopUp.close_window()
        if (this.background instanceof Background) this.background.doit(novo_background);
        const xml = new RequestMF();
        let m1;
        if (PopUp.count === 0) m1 = new MsgGenerica('Esperando "Super"...', 200, 20);
        if (m1) m1.p1.style.fontFamily = 'Syne Mono';
        this.getVersao().then(versao => {
            if (this.versaoDesatualizada(versao?.version)) {
                alert('⚠️ Você precisa atualizar a extensão');
            }
        });
        this.request_mf(urlmpsuper, {task:"arquivo", arquivo:"icones.json"}).then(dd=>{
            this.icones_tarefas = dd;
            console.group('ICONES TAREFAS');
            console.log(this.icones_tarefas);
            console.groupEnd();
        });

        if (MFt.navegador() === 'firefox') await this.esperar_token();
        console.log(this.profile);
        if (!this.profile) {
            alert('Impossível continuar!');
            return;
        }
        if (!this.ascii_mf(this.profile.email).toLowerCase().endsWith("gov.br")) {
            alert("Sistema disponível apenas para emails gov.br");
            window.close();
            return;
        }
        if (buscar_tarefas) this.tarefas = await this.obter_tarefas_do_super();
        if (this?.config?.leitura_automatica) {
            this.leitura_automatica().then(()=>{
                //console.log('FIM LEITURA AUTOMÁTICA');
            });
        }
        if (this?.tarefas?.message && this?.tarefas?.code) {
            alert('Login no Super expirado');
            return;
        }
        try {
            if (m1) m1.closeWindow(m1);
        } catch {}
        const grupos = this.agrupar_tarefas();
        const header = MFt.criaElem('div', {
            style: {
                height: '40px',
                display: 'inline-grid',
                alignItems: 'center',
                gridTemplateColumns: '130px auto'
            }
        }, document.body, {
            header:''
        });
        const d_grupos = MFt.$('div_grupos') || MFt.criaElem('div', {
            id: 'div_grupos',
            style: {
                display: 'grid',
                gridAutoFlow: 'row',
                gridTemplateColumns: "auto auto auto auto"
            }
        }, document.body, {
            grupos:''
        });
        MFt.clear(d_grupos);
        const hs = new HeaderShow("Kururu", header, "Gruppo", 24, "#FFF", "#000 2px 2px 3px", "none");
        this.campo_pesquisar(header); // Campo de pesquisa de NUP e de pareceres ----------------------------
        const cGrupos = [];
        console.group("GRUPOS DE TAREFAS -----------------------");
        for(let g of grupos) {
            console.log(g);
            cGrupos.push(new Grupo(g, d_grupos, this.icones_tarefas, null, null, null, null, this));
        }
        console.groupEnd();
        const opcoes_ferramentas = [
            {titulo: 'Exibir histórico de eventos no Sapo', desc: 'Apresenta a relação de NUPs visualizados no Sapo', icone: '/images/report01.png', func: ()=>this.exibir_historico_processos()},
            {titulo: 'Exibir histórico de documentos visualizados', desc: 'Apresenta a relação de documentos abertos durante a pesquisa no Sapo', icone:'/images/docs02.png', func: ()=>this.exibir_historico_documentos()},
            {titulo: 'Lista das peças de referência', desc: 'Contém a relação das peças salvas pelo usuário seja na visualização de documentos na pesquisa ou na visualização de documentos do processo', icone:'/images/lista_01.png', func: ()=>this.relatorio_pecas_referencia()},
            {titulo: 'Ferramentas Gerenciais', desc: 'Utilidades para o acompanhamento da produtividade', icone: '/images/relatorio_gerencial.png', func: ()=>{this.ferramentas();}},
            {titulo: 'Configurações Gerais', desc: 'Configurações Gerais do Kururu', icone:'/images/gear_01.png', func: ()=>this.abrir_menu_configuracao()},
            {titulo: 'Criar Processo/NUP', desc: 'Cria um processo no Sapiens com um número novo ou a partir de dados preexistentes.', icone: '/images/docs01.png', func: ()=>this.criar_nup()},
            {titulo: 'Versão do Programa', desc: 'Indica a versão instalada da extensão', icone:'/images/sapo2_128.png', func: ()=>this.versao_extensao()},
        ]
        if (this.profile.id === 8499) {
            opcoes_ferramentas.push({
                titulo: 'Exibir documentos abertos em pesquisas',
                desc: 'Apresenta a relação de todos os documentos abertos após as pesquisas jurídicas',
                icone: '/images/computador_01.png',
                func: ()=>{this.relatorio_pecas_visualizadas()}
            });
        }
        cGrupos.push(new Grupo(null, d_grupos, null, opcoes_ferramentas, '/images/toolbox.png', 'Ferramentas', 450));
    }

    async obter_config() {
        this.config = await this.request_mf(urlmpsuper, {
            task: 'obter_configuracoes_gerais'
        });
        this.config = Array.isArray(this.config) && this.config.length ? JSON.parse(this.config[0]['dados']) : ConfiguracoesGerais.config_padrao;
        this.config = ConfiguracoesGerais.compatibilizar(this.config);
        if (this.profile.id !== 8499) this.config.leitura_automatica = false; // A opcao de leitura automatica so vale para um unico usuario
        console.group('CONFIGURACOES GERAIS');
        console.log(this.config);
        console.groupEnd();
        if (Number.isInteger(this?.config?.volume_sapo)) this.frog_sound.volume = (this?.config?.volume_sapo / 100);
    }

    agrupar_tarefas() {
        const grupos = [];
        const has_group = t=>{
            for(let g of grupos) {
                if (g.some(d=>d.especieTarefa.id === t.especieTarefa.id)) return g;
            }
        }
        if (!Array.isArray(this.tarefas)) {
            alert('Erro de comunicação');
            location.reload();
        }
        for(let t of this.tarefas) {
            const grupo = has_group(t);
            if (grupo) grupo.push(t);
            else grupos.push([t]);
        }
        return grupos;
    }

    async campo_pesquisar(elem) {
        let resultados = {
            tempo: undefined,
            dados: undefined
        };
        const reg = new RegExp('^[0-9\\/\\-\\.]{7,21}', 'g');
        const lupa = new Image(32, 32);
        const ampulheta = new Image(32, 32);
        const background = 'rgba(255, 255, 255, 0.9)';
        await this.load_image(lupa, '/images/lupa01.png');
        await this.load_image(ampulheta, '/images/throbber_13.gif');
        MFt.atribs(ampulheta, {
            style: {
                padding: '0 0 0 15px'
            }
        });
        const show = ()=>{
            MFt.clear(d2);
            const wrapper = MFt.criaElem('div', {
                style: {
                    height: 'calc(100% - 10px)',
                    width: '100%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    fontFamily: 'Syne Mono',
                    fontSize: '12px'
                }
            }, d2);
            if (resultados?.dados?.length === 0) {
                d2.style.height = '40px';
                wrapper.innerText = 'Não existe NUP com tal número';
                return;
            }
            for(let r of resultados.dados) {
                d2.style.height = '400px';
                const w1 = MFt.criaElem('div', {
                    style: {
                        padding: '3px 5px',
                        borderRadius: '3px',
                        background,
                        margin: '5px 5px',
                        cursor: 'pointer',
                        boxShadow: '1px 1px 1px #CCC',
                        width: 'calc(100% - 30px)',
                    }
                }, wrapper);
                const s1 = MFt.criaElem('span', {
                    innerText: `${r.NUPFormatado}${r?.titulo ? ` - ${r.titulo}`:''}`,
                    style: {

                    }
                }, w1);
                w1.onmouseenter = ()=>w1.style.background = '#FF0';
                w1.onmouseleave = ()=>w1.style.background = background;
                w1.onclick = ()=>{
                    window.open(`/visualizar_nup/index.html?nup=${r.NUPFormatado}&cache=on`);
                };
            }
        };
        const d1 = MFt.criaElem('div', {

        }, elem);
        const d_wrapper_input = MFt.criaElem('div', {
            id: 'd_wrapper_input',
            style: {
                display: 'grid',
                width: '410px',
                height: '35px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '3px',
                gridTemplateColumns: 'auto 45px',
                paddingLeft: '10px',
                alignItems: 'center'
            }
        }, d1);
        const d_input = MFt.criaElem('div', {
            id: 'd_input',
        }, d_wrapper_input);
        const d_lupa = MFt.criaElem('div', {
            id: 'd_lupa',
        }, d_wrapper_input);
        const in1 = MFt.criaElem('input', {
            type: 'text',
            id: 'input_pesquisa',
            placeholder: 'NUP ou termos de pesquisa...',
            style: {
                border: 'none',
                outline: 'none',
                borderBottom: '1px solid #CCC',
                background: 'transparent',
                width: '100%',
                height: '25px',
                fontSize: '15px',
                fontFamily: '"Syne Mono", cursive',
                boxShadow: '0 1px 0 #999',
                position: 'relative',
                top: '1px',
                padding: '0'
            }
        }, d_input);
        d_lupa.appendChild(lupa);
        const d_pesq = MFt.criaElem('div', {
            id: 'dica_pesquisa',
            style: {
                width: '0',
                height: '0',
            }
        }, d1);
        const d_wrapper_resultados_nup = MFt.criaElem('div', {
            id: 'd_wrapper_resultados_nup',
            style: {
                width: '0',
                height: '0',
            }
        }, d1);
        const d2 = MFt.criaElem('div', {
            id: 'resultados_nup',
            style: {
                position: 'relative',
                width: '470px',
                maxHeight: '400px',
                overflowY: 'scroll',
                overflowX: 'clip',
                borderRadius: '6px',
                background,
            }
        }, d_wrapper_resultados_nup);
        d2.style.zIndex = 0;
        MFt.atribs(lupa, {
            style: {
                padding: '0 5px',
                cursor: 'pointer'
            }
        });
        in1.oninput = async ()=>{
            const termos = in1.value.trim();
            if (termos.length === 0) {
                this.show_dica_pesquisa(d_pesq, null, true);
                this.is_dica_pesquisa_showing = false;
            }
            let rex = reg.exec(termos); // NAO SEI PORQUE, MAS SE EXECUTO O REGEX DUAS VEZES SOBRE A MESMA STRING DA DOIS RESULTADOS DIFERENTES
            // console.log('------------------------------');
            // console.log(termos);
            // console.log(rex);
            if (!rex) rex = reg.exec(termos);
            // console.log(rex);
            if (this.validaNUP(termos)) {
                window.open(`/visualizar_nup/index.html?nup=${this.sonumeros(in1.value)}&cache=on`);
                return;
            }
            // console.log('PESQUISAR 1');
            const val = rex?.input && this.sonumeros(termos).length >= 7;
            // if (reg.exec(in1.value.trim())?.input) console.log('---------------');
            if (val) {
                this.nao_exibir_dica_pesquisa = true;
                this.show_dica_pesquisa(d_pesq, null, true);
                // console.log('PESQUISAR 2');
                MFt.clear(d2);
                d2.style.height = '40px';
                d2.appendChild(ampulheta);
                // await this.esperar(100);
                // console.log('procurando...');
                const tempo = new Date();
                const xml = new RequestMF();
                const res = await this.super_get(xml, this.get_buscar_nup_menos_dados(termos, 50), true);
                if (!resultados.tempo || resultados.tempo < tempo.valueOf()) {
                    resultados.tempo = tempo.valueOf();
                    resultados.dados = res;
                    if (termos && in1.value.trim()) show();
                    else { // Para apagar os resultados quando se apagar o texto do campo
                        MFt.clear(d2);
                        d2.style.height = '0';
                    }
                }
            }
            else {
                MFt.clear(d2);
                d2.style.height = '0';
                if (termos.length) this.show_dica_pesquisa(d_pesq);
            }
        };
        const primeiros = num=>{
            const str = in1.value.trim();
            if (!str.length) return;
            for(let i = 0; i < str.length && i < num; i++)
                if (str.charCodeAt(i) >= '0' && str.charCodeAt(i) <= '9') return false;
            return true;
        }
        in1.onkeydown = e=>{
            if (primeiros(3) && e.key === 'Enter') {
                e.stopPropagation();
                e.preventDefault(e);
                this.show_dica_pesquisa(d_pesq, null, true);
                pesquisar();
            }
        }
        lupa.onclick = ()=>{
            if (primeiros(3) || in1.value.trim().length === 0) pesquisar();
        }
        const pesquisar = ()=>{
            if (in1.value.trim().length === 0) window.open(`/pesquisa/pesquisa_v3.html?cache=on`);
            else window.open(`/pesquisa/pesquisa_v3.html?termos=${encodeURIComponent(in1.value.trim())}&cache=on`);
        }
    }

    exibir_historico_processos() {
        const pop = new PopUp(640, 480, null, null, async form=>{
            form.div.style.fontFamily = 'Titillium Web';
            form.div.style.fontSize = '14px';
            form.div.innerText = 'Aguarde...';
            let historico = await this.request_mf(urlmpsuper, {
                task: 'get_historico'
            });
            console.log(historico);
            //for(let h of historico) console.log(h);
            if (Array.isArray(historico)) {
                for (let h of historico) {
                    const a = h.evento.match(/[0-9]{17}/);
                    if (a) {
                        let ref = `<a href="/visualizar_nup/index.html?nup=${a[0]}&cache=on" target="_blank">${this.formatanup(a[0])}</a>`;
                        h.evento = h.evento.replace(a[0], ref);
                    }
                }
            }
            MFt.clear(form.div);
            historico.sort((a,b)=>{
                const d1 = a.datahora;
                const d2 = b.datahora;
                return d2 - d1;
            });
            for(let h of historico) h.datahora = this.date2normal(new Date(h.datahora * 1000), true);
            MFt.criaElem('div', {
                innerText: 'Eventos no Sapo',
                style: {
                    fontWeight: 'bold',
                    margin: '0 0 15px 0'
                }
            }, form.div);
            const main_div = MFt.criaElem('div', {
                style: {
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '456px',
                }
            }, form.div);
            new CriarTabela(
                historico,
                [
                    {campo: 'datahora', titulo: 'Data'},
                    {campo: 'evento', titulo: 'Evento'},
                ],
                main_div,
                [160, 'auto'],
                true,
            );
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = true;
    }

    exibir_historico_documentos() {
        const abrir_doc = dados=>{
            console.log(dados);
            window.open(`/pesquisa/sapiensdoc.html?id=${dados.idComponente}&nome_peca=${encodeURIComponent(dados.titulo)}`);
        };
        const pop = new PopUp(640, 480, null, null, async form=>{
            form.div.style.fontFamily = 'Syne Mono';
            form.div.style.fontSize = '14px';
            form.div.innerText = 'Aguarde...';
            const historico = await this.request_mf(urlmpsuper, {
                task: 'get_docs_visulizados_pesquisa'
            });
            console.log(historico);
            MFt.clear(form.div);
            historico.sort((a,b)=>b.datahora - a.datahora);
            for(let h of historico) {
                const hora = new Date(h.datahora * 1000);
                h.datahora = this.date2normal(hora, true);
            }
            MFt.criaElem('div', {
                innerText: 'Documentos que foram visualizados durante as pesquisas',
                style: {
                    fontWeight: 'bold',
                    margin: '0 0 15px 0'
                }
            }, form.div);
            const main_div = MFt.criaElem('div', {
                style: {
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '456px',
                }
            }, form.div);
            new CriarTabela(
                historico,
                [
                    {campo: 'datahora', titulo: 'Data'},
                    {campo: 'titulo', titulo: 'Documento'},
                ],
                main_div,
                [160, 'auto'],
                true,
                dd=>abrir_doc(dd)
            );
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = true;
    }

    relatorio_tarefas_abertas() {
        window.open('/relatorios/tarefas_abertas/tarefas_abertas.html');
    }

    relatorio_pecas_referencia() {
        new ExibirPecasReferencia();
    }

    relatorio_pecas_visualizadas() {
        new RelatorioPecasVisualizadas();
    }

    async obter_tarefas_do_super() {
        const xml = new RequestMF();
        this.verificando_novas_tarefas = true;
        let tarefas = await this.super_get(xml, this.get_tarefas(this.id_teste || this.profile.id), true);
        if (tarefas?.message && tarefas?.code) {
            console.log('Login no Super expirado.');
            return tarefas;
        }
        let tarefas_compartilhadas = await this.super_get(xml, this.get_tarefas_compartilhadas(this.id_teste || this.profile.id), true);
        console.group('TAREFAS DO USUÁRIO');
        console.log(tarefas);
        console.groupEnd();
        if (Array.isArray(tarefas_compartilhadas) && tarefas_compartilhadas.length) {
            for(let t of tarefas_compartilhadas) t.kururu_compartilhada = true; // Para indicar que a tarefa é compartilhada
            console.group('TAREFAS COMPARTILHADAS');
            console.log(tarefas_compartilhadas);
            console.groupEnd();
            tarefas = tarefas.concat(tarefas_compartilhadas);
        }
        this.verificando_novas_tarefas = false;
        return tarefas;
    }

    async verificar_novas_tarefas() {
        let tarefas = await this.obter_tarefas_do_super();
        if (tarefas?.message) {
            if (tarefas?.message && tarefas.message.indexOf('Usuário bloqueado') === 0) {
                alert('Super Sapiens reclamou de uso excessivo do sistema');
                return;
            }
            alert('Login no Sapiens expirado');
            return;
        }
        if (!Array.isArray(tarefas)) return false; // Quando dá erro de comunicação, tarefa não é array
        for(let t of tarefas) {
            if (!this.tarefas.some(d=>d.id === t.id)) {
                this.tarefas = tarefas;
                console.log('NOVA TAREFA ENCONTRADA');
                this.inicializacao(false, false);
                return true;
            }
        }
        if (this.tarefas.length !== tarefas.length) {
            // Aqui houve supressão de uma tarefa. Não se toca som, mas se atualiza a tela.
            this.tarefas = tarefas;
            this.inicializacao(false, false);
        }
        console.log('Sem tarefa nova', new Date());
        return false;
    }

    abrir_menu_configuracao() {
        const pop = new PopUp(640, 480, null, null, form=>{
            MFt.atribs(form.div, {
                innerText: 'Aguarde...',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            });
            new ConfiguracoesGerais(form.div, this);
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = true;
    }

    async leitura_automatica() {
        const xml = new RequestMF();
        let count = 0;
        for(let t of this.tarefas) {
            if (!t?.kururu_compartilhada && !t?.dataHoraLeitura && t?.usuarioResponsavel?.id === this.profile.id) {
                count++;
                console.log(t);
                const res = await this.super_get(xml, this.patch_tarefa_lida(t.id));
                if (res?.message) {
                    console.group('LEITURA AUTOMATICA - ERRO');
                    console.log(t);
                    console.log(res.message);
                    console.groupEnd();
                }
                else {
                    console.group('LEITURA AUTOMATICA - OK');
                    console.log(t);
                    console.groupEnd();
                }
            }
        }
        console.log(`LEITURA AUTOMATICA - PROCESSOS: ${count}`);
    }

    ferramentas() {
        new Ferramentas();
    }

    show_dica_pesquisa(wrapper, key, clear=false) {
        const deslocTit = -10;
        let forceNew = false;
        wrapper = wrapper || MFt.$('dica_pesquisa');
        const tratarTxt = txt=>{
            const linhas = txt.split('\n');
            let html = '';
            for(let l of linhas) {
                if (l.trim().length) html += `<p style="padding: 0;margin: 0;">${l}</p>`;
                else html += '<p style="padding: 0;margin: 0;"><br/></p>';
            }
            return html;
        }
        if (clear) {
            if (wrapper instanceof HTMLElement) {
                MFt.clear(wrapper);
            }
            this.is_dica_pesquisa_showing = false;
            this.nao_exibir_dica_pesquisa = false;
            return;
        }
        if (this.nao_exibir_dica_pesquisa) return;
        if (!key) {
            const pecas = [
                'parecer',
                'cota',
                'nota',
                'despacho',
                'parecer referencial'
            ];
            if (pecas.some(d=>this.ascii_mf(MFt.$('input_pesquisa').value).toLowerCase().indexOf(d) >= 0)) {
                key = 'peca_juridica';
                forceNew = true;
            }
            else {
                const keys = Object.keys(this.dicas_pesquisa);
                this.dicas_pesquisa_indice = (this.dicas_pesquisa_indice + 1) % keys.length;
                key = keys[this.dicas_pesquisa_indice];
            }
        }
        if (!key || !this.dicas_pesquisa.hasOwnProperty(key)) {
            return;
        }
        if (this.is_dica_pesquisa_showing && !forceNew) return;
        this.is_dica_pesquisa_showing = true;
        forceNew = false;
        MFt.clear(wrapper);
        const d1 = MFt.criaElem('div', {
            style: {
                fontFamily: 'Titillium Web',
                fontSize: '14px',
                width: Number.isInteger(this.dicas_pesquisa[key]?.width) ? `${this.dicas_pesquisa[key].width}px` : '200px',
                height: Number.isInteger(this.dicas_pesquisa[key]?.height) ? `${this.dicas_pesquisa[key].height}px` : '100px',
                position: 'relative',
                border: '1px solid #CCC',
                padding: '10px',
                backgroundColor: 'cornsilk',
                top: '2px',
                left: '-5px',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateRows: '15px auto',
            }
        }, wrapper);
        const d2 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'auto 15px',
                alignItems: 'center',
                borderBottom: '1px solid #AAA',
            }
        }, d1);
        const d3 = MFt.criaElem('div', {
            innerHTML: tratarTxt(this.dicas_pesquisa[key]?.texto) || '',
            style: {
                top: 'px',
                overflow: 'scroll',
            }
        }, d1);
        const s0 = MFt.criaElem('div', {
            innerText: 'Dica de pesquisa',
            style: {
                fontWeight: 'bold',
                top: `${deslocTit}px`,
                position: 'relative',
            }
        }, d2);
        const s1 = MFt.criaElem('div', {
            innerText: 'X',
            style: {
                cursor: 'pointer',
                position: 'relative',
                top: `${deslocTit}px`,
                right: '-3px',
                fontWeight: 'bold',
                color: 'red',
            }
        }, d2);
        s1.onclick = ()=>{
            MFt.clear(wrapper);
            this.nao_exibir_dica_pesquisa = true;
            MFt.$('input_pesquisa').focus();
        }
    }

    versao_extensao() {
        const versaoTestes = vNet => {
            console.log('vNet', vNet);
            const vInstalada = browser.runtime.getManifest().version;
            console.log('vInstalada', vInstalada);
            const r1 = new RegExp('(\\d+).(\\d+).(\\d+).(\\d+)');
            if (r1.exec(vNet) && r1.exec(vInstalada)) {
                const v1 = r1.exec(vNet);
                const v2 = r1.exec(vInstalada);
                for(let i = 1; i < 5; i++) {
                    // console.log(i, v1[i], v2[i], parseInt(v1[i]) > parseInt(v2[i]));
                    if (parseInt(v1[i]) < parseInt(v2[i])) return true;
                }
            }
            return false;
        }
        const pop = new PopUp(400, 200, null, null, async form=>{
            const ver = browser.runtime.getManifest().version;
            const text = async (t, d) => {
                const d2 = MFt.criaElem('div', {
                    innerText: t,
                    style: {
                        padding: '0 0 0 20px',
                        opacity: '0',
                        transition: '0.5s'
                    }
                }, d);
                await this.esperar(50);
                d2.style.opacity = '1';
                await this.esperar(500);
            }
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '16px',
                    paddingBottom: '10px',
                }
            });
            const d1 = MFt.criaElem('div', {

            }, form.div);
            const d2 = MFt.criaElem('div', {

            }, form.div);
            const d3 = MFt.criaElem('div', {

            }, form.div);
            const hs = new HeaderShow(`Kururu`, d1, 'Gruppo', '24px', 'black','3px 3px 5px #AAA', 'none');
            const versaoAtual = await this.getVersao();
            console.log(versaoAtual);
            await text(`${this.versaoDesatualizada(versaoAtual?.version) ? '⚠️ Versão desatualizada! Atualize o programa.' : `✅ Versão instalada: ${ver} ${versaoTestes(versaoAtual?.version) ? '(Versão de Teste)' : ''}`}`, d2);
            await text('✅ ©2022 Manoel Paz e Silva Filho', d2);
            await text('✅ Desenvolvido sem qualquer acesso especial ao Super Sapiens.', d2);
            const bt = new MFt.bt({
                value: 'Fechar',
                width: 100,
                height: 30,
                wrapper: d3,
                marginTop: '20px',
                callback: ()=>{
                    form.closeWindow(form);
                }
            });
        });
        pop.iniciar(pop);
        pop.clicafora_sair = pop.aceitaEsc = true;
    }

    getVersao() {
        return new Promise(rr=>{
            const xml = MFt.xml({
                url: 'https://acervopessoal.org/cgi-bin/versao_kururu',
                get: {},
                justText: true,
                callback: e=>{
                    let versao;
                    try {
                        versao = JSON.parse(e);
                    }
                    catch {
                        rr({error:'Erro de JSON'});
                    }
                    if (versao) rr(versao);
                },
                errorCallback: e=>{
                    rr({error:'Erro de internet'});
                }
            });
        });
    }

    /**
     *
     * @param vNet {string} It needs to be in the following format "0.0.0.0"
     * @returns {boolean}
     */
    versaoDesatualizada(vNet) {
        if (!vNet) return false;
        const vInstalada = browser.runtime.getManifest().version;
        const r1 = new RegExp('(\\d+).(\\d+).(\\d+).(\\d+)');
        if (r1.exec(vNet) && r1.exec(vInstalada)) {
            const v1 = r1.exec(vNet);
            const v2 = r1.exec(vInstalada);
            for(let i = 1; i < 5; i++) {
                // console.log(i, v1[i], v2[i], parseInt(v1[i]) > parseInt(v2[i]));
                if (parseInt(v1[i]) > parseInt(v2[i])) return true;
            }
        }
        return false;
    }

    criar_nup() {
        new CriarNUP();
    }
}