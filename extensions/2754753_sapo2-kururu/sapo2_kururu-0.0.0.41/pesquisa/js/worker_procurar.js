
onmessage = (dd)=>{
    const termos = dd.data.termos;
    const lista = dd.data.lista;

    if (!termos || !lista) {
        console.log(dd);
        throw new Error('Parametros incorretos');
    }

    val = termos.trim();
    words = val.split(' ');
    let itens = [];
    if (words.length && val.length > 3) {
        itens = lista.filter(d=>{
            let encontrados = 0;
            words.forEach(e=>{
                if (d[1].indexOf(e) >= 0) encontrados++;
            });
            return encontrados === words.length;
        });
    }
    postMessage(itens);
};
