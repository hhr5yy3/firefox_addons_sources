window.onload = ()=>{
    const texto = 'Em cumprimento ao disposto no art. 131 da CRFB/88, no art. 11 da Lei Complementar nº 73/1993, no art. 8º-F da Lei nº 9.028/1995 e no art. 19 do Ato Regimental nº 05/2007, da Advocacia-Geral da União, a Base Aérea de Natal encaminha a esta e-CJU Residual - Consultoria Jurídica da União o processo em referência para análise de minuta de “Acordo de Cooperação Técnica” a ser celebrado entre o Centro de Lançamento da Barreira do Inferno (CLBI), órgão do Comando da Aeronáutica, e a Prefeitura Municipal de Parnamirin.';
    // const destacado = Destacar.doit(texto, 'acordo cooperacao tecnica');
    const campo = MFt.criaElem('input', {
        style: {
            width: '400px',
            height: '30px',
            borderRadius: '4px',
        }
    }, document.body);
    campo.focus();
    const divTexto = MFt.criaElem('div', {
        innerText: texto,
        style: {
            margin: '20px',
        }
    }, document.body);
    campo.oninput = ()=>{
        divTexto["innerHTML"] = Destacar.doit(texto, campo.value.trim());
    }
}