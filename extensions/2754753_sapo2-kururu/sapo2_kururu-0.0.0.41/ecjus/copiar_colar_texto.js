class CopiarColarTexto {
    static copiar(innerHTML) {
        let link;
        let div = MFt.criaElem('div', {
            innerHTML: innerHTML,
            style: {
                width: (MFt.navegador() === 'firefox' || MFt.navegador() === 'safari') ? '0' : '300px',
                height: (MFt.navegador() === 'firefox' || MFt.navegador() === 'safari') ? '0' : '30px',
                position: 'fixed',
                top: '0px',
                left: '0px',
                overflow: 'hidden'
            }
        }, document.body);
        const start = MFt.criaElem('span');
        const end = MFt.criaElem('span');
        div.insertBefore(start, div.firstChild);
        div.appendChild(end);
        window.getSelection().removeAllRanges();
        let range = document.createRange();
        range.setStart(start, 0); // Essa foi a única maneira que encontrei para copiar certo.
        range.setEnd(end, 0);
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        setTimeout(() => {
            // Parece que execComand é async, por isso o timeout
            div.parentNode.removeChild(div);
        }, 300);
    }
}