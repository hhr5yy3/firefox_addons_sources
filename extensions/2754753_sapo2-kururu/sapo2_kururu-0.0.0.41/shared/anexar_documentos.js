class AnexarDocumentos extends Payloads {
    constructor() {
        super();
        this.arquivos = []; // Aponta para os arquivos que devem ser anexados
    }

    /**
     * ANEXAR DOCUMENTOS COM MINUTA
     * Wrapper corresponde ao elemento onde os arquivos para upload vão ser exibidos.
     * A classe vai dar um display="none" em todos os elementos existentes em um div
     * E vai se exibir lá. Ao final vai voltar o diplay de todos os elementos.
     */
    init(wrapper) {
        this.wrapper = wrapper;
        this.filhos = (()=>{
            let ret = [];
            for(let son of Array.from(wrapper.childNodes)) {
                console.log(son);
                console.log(getComputedStyle(son));
                ret.push({
                    node: son,
                    display: getComputedStyle(son).display
                });
                son.style.display = 'none';
            }
            return ret;
        })();
        this.maindiv = MFt.criaElem('div', {
            style: {
                gridTemplateRows: '40px auto 40px'
            }
        }, this.wrapper);
        this.exibir_tudo();
    }

    exibir_tudo() {
        MFt.clear(this.maindiv);
        const divheader = MFt.criaElem('div', {
            style: {
                margin: '0 0 5px 0',
                padding: '0 0 5px 0',
                borderBottom: '1px solid #777'
            }
        }, this.maindiv);
        this.divfiles = MFt.criaElem('div', {
            style: {
                maxHeight: '400px',
                overflowX: 'hidden',
                overflowY: 'scroll'
            }
        }, this.maindiv);
        this.divbotoes = MFt.criaElem('div', {

        }, this.maindiv);
        new HeaderShow("Arquivos para anexar", divheader, "Titillium Web", "20px", "#222", "none", "none");
        this.exibirTodosArquivos(this.divfiles);
        this.exibirbotoes(this.divbotoes);
    }

    exibirTodosArquivos(wrapper) {
        MFt.clear(wrapper);
        let contador = 0;
        for(let f of this.arquivos) {
            this.exibirUmArquivo(++contador, f, wrapper);
        }
        if (this.arquivos.length === 0) {
            wrapper.innerText = 'Sem arquivos para anexar';
        }
    }

    exibirUmArquivo(indice, arquivo, wrapper) {
        const d1 = MFt.criaElem('div', {
            style: {
                height: '40px',
                margin: '5px',
                padding: '5px',
                border: '1px solid #CCC',
                borderRadius: '6px',
                display: 'grid',
                gridTemplateColumns: '30px auto 30px',
                maxHeight: '400px',
                overflowX: 'hidden',
                overflowY: 'scroll'
            }
        }, wrapper);
        const d2 = MFt.criaElem('div', {
            innerText: `${indice.toString()}`,
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '5px',
                paddingRight: '5px',
                borderRight: '1px solid #CCC'
            }
        }, d1);
        console.log(arquivo);
        const d3 = MFt.criaElem('div', {
            innerText: `${arquivo.name}`,
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        }, d1);
        const d4 = MFt.criaElem('div', {
            style: {
                alignItems: 'center',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateRows: 'auto auto'
            }
        }, d1);
        const excluirIcon = new Image(20);
        excluirIcon.onload = ()=>{
            const s1 = MFt.criaElem('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }, d4);
            const s2 = MFt.criaElem('div', {
                innerText: 'Excluir',
                style: {
                    fontFamily: 'Titillium Web',
                    fontSize: '12px',
                }
            }, d4);
            s1.appendChild(excluirIcon);
        };
        excluirIcon.src = "/images/cross_red.png";
        d4.onclick = ()=>{
            this.arquivos.splice(indice - 1, 1);
            this.exibir_tudo();
        }
    }

    exibirbotoes(wrapper) {
        const d1 = MFt.criaElem('div', {
            style: {
                gridTemplateColumns: 'auto auto auto auto',
                marginTop: '20px'
            }
        }, wrapper);
        const inserir = new MFt.bt({
            value: 'Novo Arquivo',
            width: 120,
            height: 30,
            wrapper: d1,
            callback: ()=>{
                this.novoarquivo();
            }
        });
        const retornar = new MFt.bt({
            value: 'Retornar',
            width: 120,
            height: 30,
            marginLeft: '30px',
            wrapper: d1,
            callback: ()=>{
                this.ocultar();
            }
        });
    }

    ocultar() {
        MFt.clear(this.maindiv);
        this.maindiv.parentNode.removeChild(this.maindiv);
        for(let e of this.filhos) {
            e.node.style.display = e.display;
        }
    }

    async novoarquivo() {
        const tiposPermitidos = ["application/pdf"];
        let inp = MFt.criaElem('input', {
            type: 'file',
            accept: 'application/pdf', // ,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // PDF, DOCX, JPG ou JPEG, PNG, XLSX
            style: {
                //width: '1px',
                //height: '1px',
                //opacity: '0.1',
                position: 'absolute',
                top: '0',
                left: '0',
                display: 'none'
            }
        }, this.maindiv);
        inp.click();
        inp.onchange = e=>{
            const arquivo = e.target.files[0];
            if (!tiposPermitidos.some(d=>arquivo.type===d)) {
                alert("Tipo de arquivo não permitido");
                this.exibirTodosArquivos(this.divfiles);
                return;
            }
            if (arquivo.size > 9999999) {
                console.log(arquivo);
                alert("Tamanho do arquivo excede ao máximo permitido !");
                this.exibirTodosArquivos(this.divfiles);
                return;
            }
            if (this.arquivos.some(d=>d.name === arquivo.name)) {
                alert("Arquivo já se encontra na lista para upload !");
                this.exibirTodosArquivos(this.divfiles);
                return;
            }
            this.arquivos.push(arquivo);
            this.exibirTodosArquivos(this.divfiles);
        };
    }

    async tobase64(input_file) {
        return new Promise(rr=>{
            let reader = new FileReader();
            reader.onload = e=>{
                let u8 = new Uint8Array(e.target.result);
                let base64 = "";
                for(let i of u8) base64 += String.fromCharCode(i); // deve ter uma maneira mais eficiente de fazer isso
                //console.log(btoa(base64));
                //this.super_get(new RequestMF(), this.upload_file(arquivo, base64, ));
                rr(`data:${input_file.type};base64,` + btoa(base64));
            };
            reader.readAsArrayBuffer(input_file);
        });
    }

    async upload_arquivos(id_documento, elem) { // Deve ser chamado pela função que contem a instância de AnexarDocumento()
        const xml = new RequestMF();
        let cont = 0;
        if (elem) {
            elem.innerText = `Upload ${cont}/${this.arquivos.length}`;
        }
        for(let i of this.arquivos) {
            let b64 = await this.tobase64(i);
            // console.group("CONTEUDO");
            // console.log(b64);
            // console.groupEnd();
            const res = await this.super_get(xml, this.upload_file(i, b64, id_documento));
            if (elem) {
                elem.innerText = `Upload ${++cont} / ${this.arquivos.length}`;
            }
            console.log(res);
        }
    }
}