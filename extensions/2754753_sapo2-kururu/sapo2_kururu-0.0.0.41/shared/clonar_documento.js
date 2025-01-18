/**
 * ESTA CLASSE NÃO ESTÁ SENDO USADA. NO LUGAR DELA USA-SE CLONAR_DOC_POPUP.JS
 */

class ClonarDocumento extends Payloads {
    constructor(tarefa) {
        super();
        this.tarefa = tarefa;
        this.init();
    }

    criar_documento() {
        let incluir = (el) => {
            // Informa que as linhas que contém o número do parecer não devem ser incluídas
            // As duas linhas seguintes ao do número do parecer também não devem ser incluídas
            let rgxs = [
                '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\/[A-Z\\-]+\\s*\\/\\w+\\/\\w+',
                '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+\\/\\w+',
                '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\-ªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+',
                '^(PARECER\\-PLENÁRIO|PARECER|TERMO|NOTA|COTA|DESPACHO|INFORMAÇÃO|INFORMAÇÕES|OFÍCIO|MEMORANDO[\\s\\-]+CIRCULAR|DESPACHO\\sDE\\sAPROVAÇÃO|NOTA\\sJURÍDICA|CERTIDÃO|ATA\\sPOSICIONAL|MEMORANDO|ATA|APOSTILA|PLANO\\sDE\\sTRABALHO|PEDIDO\\sDE\\sCOMPRA\/CONTRATAÇÃO|DECLARAÇÃO|DESPACHO\\s+DO\\s+CONSULTOR[\\-\\s]+GERAL\\s+DA\\s+UNIÃO||PARECER\\s+DE\\s+FORÇA\\s+EXECUTÓRIA)\\sn[º\\.]º*\\s*\\w+\\s*\\/[\\w\\Wªº]+\\s*\\/[A-Z\\-]+\\s*\\/\\w+',
                // '^(ORIENTAÇÃO\\s*NORMATIVA\\s*AGU)\\sn[º\\.°]º*\\s*[0-9]*',
                // '^[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s\\w+\\/\\w+',
                // '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s[0-9]+\\/[0-9]+',
                // '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\s[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s[0-9]+\\/[0-9]+',
                // '^\\s*[\\wáéíóúÁÉÍÓÚãõÃÕçÇ]+\\sn*\\.*º*\\s\\w+' // Ex.: PORTARIA n. 00002
            ];
            let rxdata = [
                '^[\\w\\sç,á,é,í,ó,ú,à,ã,õ,â,ê,ô,ü,Ç,Á,É,Í,Ó,Ú,À,Ã,Õ,Â,Ê,Ô,Ü]+,\\s+[0-9º]{1,2}\\s+de\\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|outubro|novembro|dezembro)\\s+de\\s+[0-9]{4}'
            ];
            let inicio_frases = [
                'INTERESSADOS: ',
                'ASSUNTOS: '
            ];
            for(let i = 0; i < rgxs.length; i++) { // Exclui a linha com referência ao parecer e prepara para excluir as duas seguintes
                if (new RegExp(rgxs[i], 'i').exec(el.innerText.trim())) {
                    outras_linhas = 2;
                    return false;
                }
            }
            for(let i = 0; i < rxdata.length; i++) { // Exclui a data de produção do documento
                if (new RegExp(rxdata[i], 'i').exec(el.innerText.trim())) {
                    return false;
                }
            }
            for(let j = 0; j < inicio_frases.length; j++) { // Exclui as linhas que comecem com... que fazem parte do cabeçalho do documento de origem.
                if (el.innerText.trim().indexOf(inicio_frases[j]) === 0) {
                    return false;
                }
            }
            outras_linhas--;
            return !(outras_linhas >= 0);
        };
        /**
         * @returns {Array.<String>} elementos HTML
         */
        let notas_rodape = () => {
            let htmls = [];
            let secs = document.getElementsByTagName('section');
            for(let i = 0; i < secs.length; i++) {
                if (secs[i].className === 'footnotes') {
                    htmls.push(secs[i].outerHTML);
                }
            }
            return htmls;
        };
        /**
         * @returns {Array}
         */
        let itensParecerOriginal = () => {
            let hrCounter = 0;
            let itens = self.teor.getElementsByTagName('*');
            let itensExportar = [];
            let exportar = false;
            for(var i = 0, maxi = itens.length; i < maxi; i++){
                if (exportar && itens[i].parentElement === self.teor) {
                    if (!MFt.inArray(itens[i].tagName, ['hr', 'HR'])) itensExportar.push(itens[i]);
                }
                if (MFt.inArray(itens[i].tagName, ['hr', 'HR']) && hrCounter < 2) {
                    hrCounter++;
                    exportar = !exportar;
                }
            }
            itensExportar.splice(itensExportar.length - 1, 1);
            return itensExportar;
        };
        let outras_linhas = 0;
        var self = this;
        var tarefa = self.openTasks[indiceInterno];
        //console.log(tarefa);
        var paragrafos = [];
        let paragrafos_html = itensParecerOriginal();
        var pop = new PopUp(600, 100, null, null, function(){
            var wrapper = MFt.criaElem('div', null, pop.div);
            var d1 = MFt.criaElem('div', {
                innerHTML : '<b>Tipo de Documento</b> ',
                style : {
                    fontFamily : 'Arial',
                    fontSize : '12px'
                }
            }, wrapper);
            var tipo = MFt.criaSelect(['Parecer', 'Nota', 'Cota', 'Despacho', 'Termo', 'Ata', 'Informacoes'], {
                style : {
                    fontFamily: 'Arial',
                    fontSize: '12px'
                }
            }, d1);
            var d2 = MFt.criaElem('div', {
                style : {
                    fontFamily : 'Arial',
                    fontSize : '12px',
                    marginTop : '10px'
                }
            }, wrapper);
            var bt1 = new MFt.bt({
                value : 'Criar Minuta',
                width : 150,
                height : 20,
                fontFamily : 'Arial',
                fontSize : '14px',
                marginTop : '10px',
                wrapper : d2,
                callback : function(){
                    bt1.disabled = true;
                    tipo.disabled = true;
                    MFt.clear(d2);
                    new AvisoIcone('Aguardando Sapiens...', d2);
                    for(var j = 0, maxj = paragrafos_html.length; j < maxj; j++){
                        if (j > 10 || incluir(paragrafos_html[j])) {
                            // O incluir() serve para retirar as referências ao parecer nas linhas iniciais.
                            // Antes, havia um erro no Regex do incluir() que excluía linhas como: "O Parecer n. 075/2010/DECOR/CGU/AGU segue o mesmo raciocínio e propõe a seguinte solução (Item 83.4):"
                            // Esse erro no Regex foi corrigido.
                            // Porém, como o incluir() só interessa no início da peça, coloquei um limite de ação dele para as primeiras linhas.
                            paragrafos.push({texto: paragrafos_html[j].outerHTML, classe: 'html'});
                        }
                    }
                    //console.log(self.user);
                    var pj = new PecaJuridica(self.openTasks[indiceInterno].pasta, self.openTasks[indiceInterno].id, tipo.options[tipo.selectedIndex]['innerHTML'].toLowerCase(), paragrafos, function(d){
                        //console.log(d);
                        //console.log(pj);
                        window.open('https://sapiens.agu.gov.br/editor?d=' + pj.documento_id + '&c=' + pj.componenteDigital);
                        pop.closeWindow(pop);
                        self.divOps.style.height = self.tamInicialBotao + 'px';
                    }, notas_rodape());
                }
            });
        });
        pop.clicafora_sair = true;
        pop.aceitaEsc = true;
        pop.init(pop);
    };
}