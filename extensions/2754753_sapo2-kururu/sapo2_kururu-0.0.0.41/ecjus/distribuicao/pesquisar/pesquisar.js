let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new Pesquisar();
};

class Pesquisar extends Tudo {
    constructor() {
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.header(()=>{
            this.form_pesquisar();
        });
    }

    header(cb) {
        this.sapiens_route(new Payloads().getUnidadeID(this.id_unidade), (ds)=>{
            if (ds) {
                new HeaderShow(`Pesquisar - ${ds[0].sigla}`, MFt.$('header'));
                cb();
            }
            else alert('Erro com o Sapiens');
        });
    }

    form_pesquisar() {
        let d1 = MFt.$('form_pesquisar');
        MFt.clear(d1);
        let termos = this.campo_texto('Termos de pesquisa', '', d1, 400);
        termos.focus();
        termos.onkeydown = (e)=>{
            if (e.key === 'Enter') {
                if (termos.value.trim().length) {
                    MFt.$('resultados').innerText = 'Aguarde...';
                    termos.disabled = true;
                    this.xml_pesquisar(this.ascii_mf(termos.value.trim()), (dd)=>{
                        termos.disabled = false;
                        console.log(dd);
                        if (dd && dd.ok) {
                            this.exibir_resultados(dd.dados);
                        }
                        else if (dd && dd.erro) {
                            alert(dd.erro);
                        }
                        else alert('Erro de comunicação');
                    });
                }
            }
        }
        termos.oninput = ()=>{
            let nup;
            if ((nup = this.validaNUP(termos.value))) {
                MFt.$('resultados').innerText = 'Aguarde...';
                termos.value = this.formatanup(nup);
                termos.disabled = true;
                this.xml_pesquisar(nup, (dd)=>{
                    termos.disabled = false;
                    console.log(dd);
                    if (dd && dd.ok) {
                        this.exibir_resultados(dd.dados);
                    }
                    else if (dd && dd.erro) {
                        alert(dd.erro);
                    }
                    else alert('Erro de comunicação');
                });
            }
        }
    }

    xml_pesquisar(termos, cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'pesquisar_distribuicao',
                id_unidade: this.id_unidade,
                termos: termos
            },
            callback: (dd)=>{
                cb(dd);
            }
        });
    }

    exibir_resultados(dd) {
        let d1 = MFt.$('resultados');
        MFt.clear(d1);
        if (dd.length) {
            let tabela = MFt.criaElem('table', {}, d1);
            let tds = this.tds(['', 'NUP', 'ASSUNTO', 'CONSULENTE', 'ADVOGADO', 'PEÇA', 'ENTRADA', 'CONCLUSÃO'], MFt.criaElem('tr', null, tabela));
            console.log(dd);
            dd.forEach((d, i) => {
                console.log(d);
                let tds = this.tds([
                    (i + 1).toString(),
                    '',
                    d[1],
                    d[10],
                    d[11],
                    '', // peça d[8]
                    this.date2normal(this.valida_data_hora(d[6])),
                    d[7] ? this.date2normal(this.valida_data_hora(d[7])) : ''
                ], MFt.criaElem('tr', null, tabela));
                tds[1].style.minWidth = '140px';
                MFt.criaElem('a', {
                    href: `../../../tela_processo.html?nup=${d[0]}`,
                    innerText: this.formatanup(d[0]),
                    target: '_blank'
                }, tds[1]);
                MFt.criaElem('a', {
                    innerText: d[8] ? 'exibir' : '',
                    target: '_blank',
                    href: d[8] ? `https://sapiens.agu.gov.br/documento/${d[8]}` : ''
                }, tds[5]);
            });
        }
        else {
            d1.innerText = 'Nenhum resultado encontrado';
        }
    }
}