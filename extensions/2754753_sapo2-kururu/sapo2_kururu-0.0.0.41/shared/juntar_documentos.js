class JuntarDocumentos extends Payloads {
    constructor(id_proc) {
        super();
        this.id_proc = id_proc;
        if (!Number.isInteger(this.id_proc)) {
            alert('ID do processo ausente');
            return;
        }
        this.main_url = 'https://manoelpaz.com/cgi-bin/agu/super/super';
        this.lista_arquivos = []; // Lista de itens da classe ItemArquivo
        this.padrao_grid_rows = '20px 400px auto 30px 30px';
        this.padrao_pading = '0 10px 0px 10px';
        this.init();
    }

    async init() {
        this.icon_upload = new Image(22);
        await this.load_image(this.icon_upload, '/images/upload01.png');
        this.pop = new PopUp(900, 480, null, null, async form=>{
            MFt.atribs(form.div, {
                innerText: 'Aguarde...',
                style: {
                    fontFamily: 'Patrick Hand',
                    fontSize: '16px'
                }
            });
            const crono = new Crono();
            this.tipos_docs = await this.request_mf(this.main_url, {task: 'arquivo', arquivo: 'tipos_documentos.json'});
            console.log(`TEMPO PARA OBTER TIPOS DE DOCUMENTOS: ${crono.tempo}s  ------------------------`);
            console.log(this.tipos_docs);
            MFt.clear(form.div);
            this.div_header = MFt.criaElem('div', {
                style: {
                    width: 'calc(100% - 35px)',
                    border: '1px solid #333',
                    borderRadius: '6px 6px 0 0',
                    padding: this.padrao_pading,
                    display: 'grid',
                    gridTemplateColumns: this.padrao_grid_rows
                }
            }, form.div);
            this.div_arquivos = MFt.criaElem('div', {
                style: {
                    width: 'calc(100% - 15px)',
                    height: '380px',
                    borderColor: '#333',
                    borderWidth: '0 1px 1px 1px',
                    borderStyle: 'solid',
                    borderRadius: '0 0 6px 6px',
                    overflow: 'hidden auto',
                    fontFamily: 'Titillium Web',
                    fontSize: '14px'
                }
            }, form.div);
            const div_botoes = MFt.criaElem('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    margin: '10px 0 0 0'
                }
            }, form.div);
            // -----------------
            MFt.criaElem('div', {innerText: '#', style: {alignItems: 'center', textAlign: 'center', borderRight: '1px solid #CCC'}}, this.div_header);
            MFt.criaElem('div', {innerText: 'NOME DO ARQUIVO', style: {alignItems: 'center', textAlign: 'center', borderRight: '1px solid #CCC'}}, this.div_header);
            MFt.criaElem('div', {innerText: 'TIPO DO ARQUIVO', style: {alignItems: 'center', textAlign: 'center', borderRight: '1px solid #CCC'}}, this.div_header);
            // -----------------
            const d1 = MFt.criaElem('div', null, div_botoes);
            const labelFile = MFt.criaElem('label', {
                style: {
                    width: '150px',
                    height: '30px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }
            }, d1, {
                for: 'bt_file_upload', // Vai fazer com que o elemento seja integrante do 'bt_file_upload', de modo que se clicar nele, estara clicando no "bt_file_upload"
            });
            labelFile.appendChild(this.icon_upload);
            const btFile = MFt.criaElem('input', {
                type: 'file',
                id: 'bt_file_upload',
                style: {
                    display: 'none'
                }
            }, d1, {
                multiple: '' // Permite multiplos arquivos
            });
            MFt.atribs(this.icon_upload, {
                style: {
                    padding: '0 5px 0 0'
                }
            });
            MFt.criaElem('span', {innerText: 'Selecionar Arquivos'}, labelFile);
            btFile.onchange = e=>{
                this.gerenciar_novos_arquivos(btFile.files);
            }
        });
        this.pop.clicafora_sair = this.pop.aceitaEsc = true;
        this.pop.iniciar(this.pop);
    }

    gerenciar_novos_arquivos(files) {
        files = Array.from(files).filter(d=>{return ['application/pdf',].filter(e=>d.type === e).length;});
        for(let f of files) {
            if (this.lista_arquivos.length === 0 || !this.lista_arquivos.some(d=>d.file.name === f.name)) {
                this.lista_arquivos.push(new ItemArquivo(this, this.div_arquivos, f, this.padrao_grid_rows));
            }
        }
        this.exibir_arquivos();
    }

    exibir_arquivos() {
        MFt.clear(this.div_arquivos);
        const cores = ['rgb(209, 234, 255)', 'rgb(230, 242, 253)'];
        for(let i = 0; i < this.lista_arquivos.length; i++) this.lista_arquivos[i].exibir(i + 1, cores[i % cores.length]);
    }
}

class ItemArquivo {
    constructor(pai, wrapper, file, padrao_grid) {
        this.pai = pai;
        this.wrapper = wrapper;
        this.file = file;
        this.padrao_grid = padrao_grid;
        this.icon_aviso = new Image(22);
        this.icon_aviso.src = '/images/erro01.png';
        console.log(file);
    }

    exibir(indice, cor) {
        const d1 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: this.padrao_grid,
                padding: this.pai.padrao_pading,
                border: 'none',
                borderBottom: '1px solid #CCC',
                margin: '0',
                background: cor,
            }
        }, this.wrapper);
        const div_indice = MFt.criaElem('div', {
            innerText: `${indice}`,
            style: {
                borderRight: '1px solid #CCC'
            }
        }, d1);
        const div_name = MFt.criaElem('div', {
            innerText: `${this.file.name}`,
            style: {
                borderRight: '1px solid #CCC',
                padding: '0 10px 0 10px'
            }
        }, d1);
        const div_tipo = MFt.criaElem('div', {

        }, d1);
        const div_excluir = MFt.criaElem('div', {

        }, d1);
        const div_aviso = MFt.criaElem('div', {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }, d1);
        if (this.file.size > 10_000_000) {
            const icon = this.icon_aviso.cloneNode();
            MFt.atribs(icon, {
                style: {
                    cursor: 'pointer'
                }
            });
            div_aviso.appendChild(icon);
            icon.onclick = ()=>{
                alert('Para ser enviado, o arquivo será dividido em partes de até 10Mb.\nEsse é um procedimento demorado.');
            }
        }



    }
}