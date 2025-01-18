window.onload = ()=>{
    new Temp();
};

class Temp extends Payloads {
    constructor(){
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id']);
        this.init();
    }

    async init() {
        await this.refresh_token();
        const dados = await this.super_get(this.get_unidade_pelo_id(this.id_unidade), true);
        this.exibir_ops(dados);
    }

    exibir_ops(dados) {
        new HeaderShow(`${dados[0].sigla}`, MFt.$('header'));
        let id = MFt.urlArgs()['id'];
        if (!id) {
            alert('Erro grave! Impossível continuar!');
            return;
        }
        let ops = [
            {nome:'Distribuição de Processos', link:`movimentacao_menu/movimentacao_menu.html?id_unidade=${this.id_unidade}`},
            {nome:'Saída de Processos', link:`saida/saida.html?id_unidade=${this.id_unidade}`},
            {nome:'Relatório de Distribuição', link:`relatorio/relatorio.html?id_unidade=${this.id_unidade}`},
            {nome:'Pesquisar Assunto', link:`pesquisar/pesquisar.html?id_unidade=${this.id_unidade}`},
            {nome:'Dados Complementares', link:`ecju/index_ecju.html?id=${this.id_unidade}`},
            {nome:'Advogados', link:`advogados/index_advogados.html?id=${this.id_unidade}`},
            {nome:'Distribuição Avulsa', link:`dist_avulsa/dist_avulsa.html?id_unidade=${this.id_unidade}`},
            {nome:'Compensação', link:`compensacao/compensacao.html?id_unidade=${this.id_unidade}`},
            // {nome:'Acertar Afastamentos (nao funciona)', link:`compensacao_tmp/compensacao.html?id_unidade=${this.id_unidade}`},
            {nome:'Sincronizacao de Processos', link:`sincronizacao/nup.html?id_unidade=${this.id_unidade}`},
            {nome:'Excluir Distribuição', link:`excluir_distribuicao/excluir.html?id_unidade=${this.id_unidade}`},
            {nome:'Modificar Retorno', link:`mudar_retorno/mudar_retorno.html?id_unidade=${this.id_unidade}`},
            {nome:'Feriados', link:`feriados/feriados.html?id_unidade=${this.id_unidade}`},
            {nome:'Tarefas Advogados', link:`tarefas/tarefas.html?id_unidade=${this.id_unidade}`},
            {nome:'Textos', link:'../textos/textos.html'}
        ];
        ops.forEach((d)=>{
            new MFt.bt({
                value: d.nome,
                wrapper: MFt.criaElem('div', {}, MFt.$('wrapper')),
                width: 300,
                height: 40,
                marginBottom: '15px',
                callback: ()=>{
                    location.href = d.link;
                }
            });
        });
    }
}
