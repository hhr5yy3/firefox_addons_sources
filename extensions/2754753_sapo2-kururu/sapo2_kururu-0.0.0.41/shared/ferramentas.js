class Ferramentas extends Payloads {
    constructor() {
        super();
        this.opcoes = [
            // Maximo de 12 opcoes
            {titulo: 'Relatório Mensal Detalhado', desc: 'Atividades de um setor em um determinado mês', icone: '/images/adotar.png', link: '/relatorios/mensal_detalhado/index.html'},
            {titulo: 'Relatório de Tarefas Abertas', desc: 'Tarefas abertas do setor coordenado', icone: '/images/adotar.png', link: '/relatorios/tarefas_abertas/tarefas_abertas.html'},
        ];

        this.pop;
        this.iniciar();
    }

    async iniciar() {
        this.pop = new PopUp(640, 480, null, null, form=>{
            MFt.atribs(form.div, {
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            });
            const wp = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '150px 150px 150px 150px',
                    gridTemplateRows: '200px 200px 200px'
                }
            }, form.div);
            if (this.profile.id === 8499) { // Manoel Paz
                const novasOps = [
                    {titulo: 'Relatório em Lote', desc: 'Extração de dados por lista de setores e período', icone: '/images/typewriter001.png', link: '/relatorios/relatorio_lote/relatorio_lote.html'},
                    {titulo: 'Pesquisas-Diária .CSV', desc: 'Estatística diária das pesquisas', icone: '/images/lista_01.png', link: 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar?task=estatisticas_dia&inicio=2022-08-01 00:00:00'},
                    {titulo: 'Pesquisas-Mensal .CSV', desc: 'Estatística mensal das pesquisas', icone: '/images/lista_01.png', link: 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar?task=estatisticas_mes&inicio=2022-08-01 00:00:00'},
                    {titulo: 'Pesquisas-Semanal .CSV', desc: 'Estatística semanal das pesquisas', icone: '/images/lista_01.png', link: 'https://acervopessoal.org/cgi-bin/pesquisar/pesquisar?task=estatisticas_semana&inicio=2022-08-01 00:00:00'},
                ];
                for(let n of novasOps) {
                    this.opcoes.push(n);
                }
            }
            for(let o of this.opcoes) {
                this.criar_icone(wp, o);
            }
        });
        this.pop.iniciar(this.pop);
        this.pop.aceitaEsc = this.pop.clicafora_sair = true;
    }

    async criar_icone(wp, opcao) {
        const d1Hover = '#f4ffe5';
        const d1Normal = 'rgb(250, 250, 250)';
        const d1 = MFt.criaElem('div', {
            style: {
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '13px',
                padding: '6px',
                margin: '0 10px 10px 0',
                border: '1px solid rgb(138,138,138)',
                overflow: 'hidden',
                background: d1Normal,
                boxShadow: '3px 3px 1px #ddd'
            }
        }, wp);
        const icon = new Image(64, 64);
        await this.load_image(icon, opcao.icone);
        d1.appendChild(icon);
        MFt.criaElem('div', {
            innerText: opcao.titulo,
            style: {
                fontWeight: 'bold'
            }
        }, d1);
        MFt.criaElem('div', {
            innerText: opcao?.desc || '',
            style: {
                fontSize: '12px',
                fontStyle: 'italic',
                color: 'rgb(100,100,100)',
            }
        }, d1);
        d1.onclick = ()=>{
            this.pop.closeWindow(this.pop);
            window.open(opcao.link);
        };
        d1.onmouseenter = ()=>d1.style.background = d1Hover;
        d1.onmouseleave = ()=>d1.style.background = d1Normal;
    }
}