window.onload = ()=>{
    new HeaderShow('Menu de Distribuição', MFt.$('header'));
    const id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
    console.log(id_unidade);
    const wp = MFt.$('wrapper');
    const d_style = {
        display: 'flex',
        alignItems: 'center'
    }
    const d1 = MFt.criaElem('div', {style:d_style}, wp);
    const d2 = MFt.criaElem('div', {style:d_style}, wp);
    const d3 = MFt.criaElem('div', null, wp);
    const c1 = MFt.criaElem('input', {
        type: 'checkbox'
    }, d1);
    const c2 = MFt.criaElem('input', {
        type: 'checkbox'
    }, d2);
    MFt.criaElem('span', {
        innerText: 'Distribuição automática'
    }, d1);
    MFt.criaElem('span', {
        innerText: 'Usar cache de afastamentos'
    }, d2);
    const bt = new MFt.bt({
        value: 'Página de distribuição',
        width: 200,
        height: 30,
        marginTop: '20px',
        wrapper: d3,
        callback: ()=>{
            location.href = `../movimentacao/movimentacao.html?id_unidade=${id_unidade}${c1.checked ? '&automatico=sim':''}${c2.checked ? '&usar_cache_afastamentos=sim':''}`;
        }
    });
};