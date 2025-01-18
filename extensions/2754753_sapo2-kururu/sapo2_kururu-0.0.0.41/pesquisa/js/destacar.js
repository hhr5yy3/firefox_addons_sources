class Destacar {
    constructor() {

    }

    static get paleta_cores() {
        return [
            '#FF0',
            '#12ff00',
            '#00fbff',
            'rgba(255, 0, 206, 0.73)',
            '#cbcbcb',
            '#ffacb1',
            '#d5d5ff'
        ];
    }

    static criar_atomo(c) {
        switch(c) {
            case 'a':
            case 'A':
            case 'Á':
            case 'á':
            case 'ã':
            case 'Ã':
                return '[áaAÁãÃâÂ]{1}';
            case 'e':
            case 'E':
            case 'É':
            case 'é':
            case 'ê':
            case 'Ê':
                return '[éeÉEêÊ]{1}';
            case 'i':
            case 'I':
            case 'Í':
            case 'í':
                return '[íiÍI]{1}';
            case 'o':
            case 'O':
            case 'Ó':
            case 'ó':
            case 'õ':
            case 'Õ':
            case 'ô':
            case 'Ô':
                return '[óoÓOõÕôÔ]{1}';
            case 'u':
            case 'U':
            case 'Ú':
            case 'ú':
            case 'ü':
            case 'Ü':
                return '[úuÚUüÜ]{1}';
            case 'c':
            case 'Ç':
            case 'ç':
                return '[çÇcC]{1}';
            case '.':
            case '-':
            case '+':
            case '*':
            case '^':
                return '\\' + c;
            default:
                return c;
        }
    }

    static criar_regex(palavra) {
        let str_rex = '';
        for(let i =0; i < palavra.length; i++) {
            str_rex += Destacar.criar_atomo(palavra[i]);
        }
        return str_rex;
    }

    static organizar_palavras(termos) {
        let expressoes = [];
        const rex = [
            /([áàãâéêíóõôúç\*\w]+)/i
        ];
        const extrairEntreAspas = ()=>{
            const itens = termos.match(/"[a-z0-9áàãâéêíóõôúç.\w\s,;\/-]*"/gi);
            termos = termos.replace(/"[a-z0-9áàãâéêíóõôúç.\w\s,;\/-]*"/gi, '');
            termos = termos.replace(/\s{2,5}/gi, ' ');
            if (Array.isArray(itens)) {
                for(let i of itens) {
                    expressoes.push(i.replace(/"/gi, ''));
                }
            }
        }
        extrairEntreAspas();
        const inicio = new Date();
        const tempoMaximo = 10;
        for(let r of rex) {
            while (termos) {
                let res;
                if ((res = r.exec(termos))) {
                    termos = termos.replace(res[0], '').trim();
                    expressoes.push(res[0].replace(/\*/gi, ''));
                }
                else {
                    break;
                }
                const agora = new Date();
                if (agora.valueOf() - inicio.valueOf() > tempoMaximo) {
                    // em tese este bloco nunca deve ser executado
                    console.log(`%cLOOP INFINITO > ${tempoMaximo}ms`, 'color:red');
                    break;
                }
            }
        }
        let palavras = expressoes;
        if (palavras.length > 1) palavras.sort((a,b)=>b.length-a.length);
        return palavras;
    }

    static doit_reduzir_texto(texto, termos, tag_inicial, paleta_cores) {
        paleta_cores = paleta_cores || Destacar.paleta_cores;
        const max_palavras = 200;
        let palavras = Destacar.organizar_palavras(termos);
        const obter_trechos = ()=>{
            let trechos = [];
            for(let i = 0; i < palavras.length; i++) {
                if (palavras[i].length > 2) {
                    let indice = 0;
                    do {
                        let rex = new RegExp(Destacar.criar_regex(palavras[i]), 'gi');
                        let palavra = rex.exec(texto.substring(indice));
                        if (palavra && palavra.length && palavra[0]) {
                            trechos.push({
                                start: indice + palavra.index,
                                end: indice + palavra.index + palavra[0].length,
                                color: paleta_cores[i % paleta_cores.length]
                            })
                            indice += palavra.index + palavra[0].length;
                        }
                        else {
                            break;
                        }
                    } while (true);
                }
            }
            trechos.sort((a,b)=>a.start > b.start);
            return trechos;
        }
        const obter_segs = trechos=>{
            let i = 0;
            let segs = [];
            let indice = 0;
            while (i < trechos.length) {
                if (indice === trechos[i].start) {
                    segs.push(trechos[i]);
                    indice = trechos[i].end;
                    i++;
                }
                else {
                    segs.push({
                        start: indice,
                        end: trechos[i].start,
                        color: null
                    });
                    indice = trechos[i].start;
                }
            }
            if (indice < texto.length) {
                segs.push({
                    start: indice,
                    end: texto.length,
                    color: null
                });
            }
            return segs;
        }
        const segs = obter_segs(obter_trechos());
        const reduzir = texto=>{
            const partes = texto.split(' ').filter(d=>d.length);
            if (partes.length <= max_palavras) return texto;
            const half = parseInt((max_palavras / 2).toFixed(0));
            const seg1 = partes.slice(0,half).join(' ');
            const seg2 = partes.slice(partes.length - half, partes.length).join(' ');
            return `${texto.startsWith(' ') ? ' ' : ''}${seg1} <span style="font-style: italic;color:red;">{...}</span> ${seg2}${texto.endsWith(' ') ? ' ' : ''}`;
        }
        let texto_final = '';
        for(let i = 0; i < segs.length; i++) {
            let s = segs[i];
            const subtexto = texto.substring(s.start, s.end);
            if (s.color) {
                texto_final += `<span style="background-color: ${s.color}">${texto.substring(s.start, s.end)}</span>`;
            }
            else {
                texto_final += reduzir(subtexto);
            }
        }
        // return `${texto_final}<br/><br/><span style="font-style: italic;border:1px solid black;">${texto}</span>`
        return texto_final;
    }

    static doit(texto, termos, tag_inicial, paleta_cores) {
        const tag_final = '</span>';
        let palavras = Destacar.organizar_palavras(termos);
        paleta_cores = paleta_cores || Destacar.paleta_cores;
        for(let i = 0; i < palavras.length; i++) {
            tag_inicial = tag_inicial || `<span style="background-color:${paleta_cores[i % paleta_cores.length]}">`;
            if (palavras[i].length > 2) {
                let indice = 0;
                do {
                    let rex = new RegExp(Destacar.criar_regex(palavras[i]), 'gi');
                    let palavra = rex.exec(texto.substring(indice));
                    if (palavra && palavra.length && palavra[0]) {
                        let tmp_texto = texto.substring(0, indice + palavra.index);
                        tmp_texto += tag_inicial;
                        tmp_texto += texto.substring(indice + palavra.index, indice + palavra.index + palavra[0].length);
                        tmp_texto += tag_final;
                        tmp_texto += texto.substring(indice + palavra.index + palavra[0].length);
                        texto = tmp_texto;
                        indice += (palavra.index + tag_inicial.length + palavra[0].length + tag_final.length);
                    }
                    else {
                        break;
                    }
                } while (true);
            }
            tag_inicial = ''; // para resetar o tag_inicial para ela assumir novo valor logo depois do for
        }
        return texto;
    }
}