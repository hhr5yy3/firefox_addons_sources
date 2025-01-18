let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    let id = MFt.urlArgs()['id'];
    if (!id) {
        alert('Erro grave!');
        return;
    }
    new ECJUEditor(id);
};

class ECJUEditor extends Tudo {
    constructor(id){
        super();
        this.id = id;
        this.ecju = {};
        this.sapiens_route(new Payloads().getUnidadeID(this.id), (dados)=>{
            if (dados && Object.prototype.toString.call(dados) === '[object Array]' && dados.length) {
                this.ecju = dados[0];
                new HeaderShow(`Dados complementares da ${this.ecju.sigla}`, MFt.$('header'));
                MFt.xml({
                    url: mp,
                    get: {
                        task: 'obter_ecjus_by_id',
                        id: this.id
                    },
                    callback: (dados)=>{
                        if (dados && dados.ok) {
                            dados = dados.dados.length ? dados.dados[0] : dados;
                            this.ecju = dados.length ? {
                                nome: dados[0],
                                sigla: dados[1],
                                id_unidade: dados[2],
                                id_setor_saida: dados[3],
                                id_setor_protocolo: dados[4],
                                ids_setores_juridicos: dados[5]
                            } : {
                                nome: this.ecju.nome,
                                sigla: this.ecju.sigla,
                                id_unidade: this.ecju.id,
                                id_setor_saida: null,
                                id_setor_protocolo: null,
                                ids_setores_juridicos: "[]"
                            };
                            this.sapiens_route(new Payloads().getSetores(this.ecju.id_unidade), (dados)=>{
                                if (dados) {
                                    let opcoes = (()=>{
                                        let ret = [];
                                        dados.forEach((d)=>{
                                            ret.push({nome:d.nome, value:d.id});
                                        });
                                        return ret;
                                    })();
                                    this.formulario(opcoes, opcoes, opcoes);
                                    new MFt.bt({
                                        value: 'Salvar',
                                        width: 100,
                                        height: 40,
                                        marginTop: '20px',
                                        fontSize: '16px',
                                        wrapper: MFt.$('botao_salvar'),
                                        callback: ()=>{
                                            this.salvar();
                                        }
                                    });
                                }
                                else {
                                    alert('Erro setores!');
                                }
                            });
                        } else {
                            alert('Erro!');
                            location.reload();
                        }
                    }
                });
            }
            else {
                alert('eCJU Inexistente');
            }
        });
    }

    formulario(opcoes_protocolo, opcoes_saida, opcoes_juridicos){
        MFt.clear(MFt.$('wrapper'));
        let div1 = MFt.criaElem('div', {

        }, MFt.$('wrapper'));
        let dados = [
            {label: 'Nome da Consultoria', rel: this.ecju, campo:'nome', type: 'text', width: 800, fontSize: 16, disabled: true},
            {label: 'Sigla', rel: this.ecju, campo:'sigla', type: 'text', width: 800, fontSize: 16, disabled: true},
            {label: '', rel: this.ecju, campo:'id_unidade', type:'text', hidden: true, disabled: true},
            {label: 'Setor de Protocolo', rel: this.ecju, campo:'id_setor_protocolo', type: 'select', opcoes: opcoes_protocolo},
            {label: 'Setor de Saída', rel: this.ecju, campo:'id_setor_saida', type: 'select', opcoes: opcoes_saida},
            {label: 'Setores Jurídicos', rel: this.ecju, campo:'ids_setores_juridicos', type: 'multi_select', opcoes: opcoes_juridicos}
        ];
        let criar_campo_input = (conf)=>{
            let fora = MFt.criaElem('div', {
                style: {
                    marginTop: conf.marginTop ? `${conf.marginTop}px` : '5px',
                    marginBottom: conf.marginBottom ? `${conf.marginBottom}px` : '5px',
                    marginLeft: conf.marginLeft ? `${conf.marginLeft}px` : '5px',
                    marginRight: conf.marginRight ? `${conf.marginRight}px` : '5px',
                }
            }, div1);
            let dentro = undefined;
            if (conf.hidden !== true) {
                MFt.criaElem('div', {
                    innerText: conf.label,
                    style: {}
                }, fora);
                dentro = MFt.criaElem('div', {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        padding: '2px 5px',
                        border: conf.type === 'text' ? '1px solid #BBB' : 'none',
                        borderRadius: '4px'
                    }
                }, fora);
            }
            if (conf.type === 'text') {
                let inp_elem = MFt.criaElem('input', {
                    type: 'text',
                    style: {
                        width: conf.width ? `${conf.width}px` : '300px',
                        height: conf.height ? `${conf.height}px` : '30px',
                        fontSize: conf.fontSize ? `${conf.fontSize}px` : '16px',
                        backgroundColor: conf.disabled === true ? 'white' : '',
                        border: 'none',
                        outline: 'none'
                    }
                }, conf.hidden !== true ? dentro : fora);
                if (conf.hidden) inp_elem.hidden = true;
                inp_elem.disabled = !!conf.disabled;
                inp_elem.value = conf.rel[conf.campo];
                inp_elem.oninput = ()=>{
                    conf.rel[conf.campo] = inp_elem.value;
                };
            }
            else if (conf.type === 'select') {
                let sel = MFt.criaElem('select', {
                    style: {
                        fontSize: conf.fontSize ? `${conf.fontSize}px` : '16px'
                    }
                }, dentro);
                MFt.criaElem('option', {
                    innerText: '---'
                }, sel);
                conf.opcoes.forEach((d, i)=>{
                    let valor = d.value && isNaN(d.value) ? d.value : parseInt(d.value);
                    MFt.criaElem('option', {
                        innerText: d.nome,
                    }, sel, {
                        value: d.value.toString()
                    });
                    if (conf.rel[conf.campo] === d.value) {
                        sel.selectedIndex = i + 1;
                    }
                });
                sel.onchange = ()=>{
                    let value = sel[sel.selectedIndex].getAttribute('value');
                    if (value && !isNaN(value)) {
                        conf.rel[conf.campo] = parseInt(value);
                    }
                    else {
                        conf.rel[conf.campo] = value;
                    }
                    console.log(this.ecju);
                };
            }
            else if (conf.type === 'multi_select') {
                let ids = JSON.parse(conf.rel[conf.campo]);
                let itens = MFt.criaElem('div', {
                    style: {
                        cursor: 'pointer',
                        transition: '1s',
                        marginLeft: '20px'
                    }
                }, dentro);
                let opcoes = MFt.criaElem('div', {
                    style: {
                        marginLeft: '20px'
                    }
                }, dentro);
                let show_itens = ()=>{
                    if (ids.length) {
                        let contador = 0;
                        for (let i = 0; i < conf.opcoes.length; i++) {
                            if (MFt.inArray(conf.opcoes[i].value, ids)) {
                                contador++;
                                MFt.criaElem('div', {
                                    innerText: `${contador}. ${conf.opcoes[i].nome}`,
                                    style: {}
                                }, itens);
                            }
                        }
                    } else {
                        MFt.clear(itens);
                        MFt.criaElem('span', {
                            innerText: 'Escolher setores',
                            style: {
                                color: '#CCC'
                            }
                        }, itens);
                    }
                };
                show_itens();
                itens.onclick = (e)=>{
                    MFt.clear(itens);
                    MFt.clear(opcoes);
                    MFt.atribs(opcoes, {
                        style: {
                            border: '1px solid #CCC',
                            padding: '3px 15px',
                            borderRadius: '6px'
                        }
                    });
                    conf.opcoes.forEach((d) => {
                        console.log(d);
                        let valor = d.value && isNaN(d.value) ? d.value : parseInt(d.value);
                        let d1 = MFt.criaElem('div', {}, opcoes);
                        let check = MFt.criaElem('input', {
                            type: 'checkbox'
                        }, d1, {
                            value: d.value.toString()
                        });
                        MFt.criaElem('span', {
                            innerText: d.nome,
                            style: {
                                marginLeft: '10px'
                            }
                        }, d1);
                        if (MFt.inArray(valor, ids)) check.checked = true;
                        check.onchange = (e)=>{
                            let valor = e.target.getAttribute('value');
                            valor = valor && isNaN(valor) ? valor : parseInt(valor);
                            if (e.target.checked) {
                                if (!MFt.inArray(valor, ids)) {
                                    ids.push(valor);
                                    conf.rel[conf.campo] = JSON.stringify(ids);
                                }
                            }
                            else {
                                if (MFt.inArray(valor, ids)) {
                                    for(let i = 0; i < ids.length; i++) {
                                        if (ids[i] === valor) {
                                            ids.splice(i, 1);
                                            break;
                                        }
                                    }
                                    conf.rel[conf.campo] = JSON.stringify(ids);
                                }
                            }
                            console.log(conf.rel);
                        };
                    });
                    let fechar = MFt.criaElem('div', {
                        innerText: 'Fechar',
                        style: {
                            cursor: 'pointer'
                        }
                    }, opcoes);
                    fechar.onclick = ()=>{
                        MFt.clear(opcoes);
                        MFt.atribs(opcoes, {
                            style: {
                                border: 'none',
                                padding: '0',
                                borderRadius: '0'
                            }
                        });
                        show_itens();
                    };
                };
            }
        };
        dados.forEach((d)=>{
            criar_campo_input(d);
        });
    }

    selecionar(lista, cb){
        let pop = new PopUp(500, 700, null, null, (form)=>{
            let ja_adicionados = [];
            let div1 = MFt.criaElem('div', {

            }, form.div);
            lista.forEach((d)=>{
                if (MFt.inArray(d.id, ja_adicionados)) return;
                let row = MFt.criaElem('div', {

                }, div1);
                let span_check = MFt.criaElem('span', {

                }, row);
                let check = MFt.criaElem('input', {
                    type: 'checkbox',
                    className: 'selecionar_checkbox',
                }, span_check, {
                    id_sapiens: d.id.toString(),
                    nome: d.nome
                });
                let span_nome = MFt.criaElem('span', {
                    innerText: d.nome
                }, row);
            });
            let div2 = MFt.criaElem('div', {

            }, form.div);
            new MFt.bt({
                value: 'Salvar',
                width: 80,
                height: 30,
                marginRight: '20px',
                wrapper: div2,
                callback: ()=>{
                    let checks = div1.getElementsByClassName('selecionar_checkbox');
                    let selecionados = [];
                    for(let i = 0; i < checks.length; i++) {
                        if (checks[i].checked) {
                            selecionados.push({
                                nome: checks[i].getAttribute('nome'),
                                id: checks[i].getAttribute('id_sapiens')
                            });
                        }
                    }
                    cb(selecionados);
                }
            });
        });
        pop.clicafora_sair = true;
        pop.aceitaEsc = true;
        pop.iniciar(pop);
    }

    salvar(){
        if (this.ecju.nome.trim().length && this.ecju.sigla.trim().length && this.ecju.id_setor_protocolo && this.ecju.id_setor_saida && this.ecju.id_unidade) {
            let setores = undefined;
            try {
                setores = JSON.parse(this.ecju.ids_setores_juridicos);
            }
            catch (e) {

            }
            if (setores.length) {
                let msg = new MsgGenerica('Salvando...', 300, 80, null, null);
                console.log(this.ecju);
                MFt.xml({
                    url: mp,
                    get: {
                        task: 'incluir_ecju',
                        nome: this.ecju.nome,
                        sigla: this.ecju.sigla,
                        id_unidade: this.ecju.id_unidade,
                        id_setor_saida: this.ecju.id_setor_saida,
                        id_setor_protocolo: this.ecju.id_setor_protocolo,
                        ids_servidores_autorizados: this.ecju.ids_servidores_autorizados,
                        ids_setores_juridicos: this.ecju.ids_setores_juridicos,
                    },
                    callback: (dados)=>{
                        console.log(dados);
                        if (dados && dados.ok) {
                            msg.msg = 'Tudo salvo!';
                            setTimeout(()=>{
                                msg.closeWindow(msg);
                                location.href = `../sub_menu.html?id=${this.ecju.id_unidade}`
                            }, 2000);
                        }
                        else if (dados && dados.erro) {
                            msg.msg = dados.erro;
                            setTimeout(()=>{
                                msg.closeWindow(msg);
                            }, 3000);
                        }
                        else {
                            msg.msg = 'Erro desconhecido';
                            setTimeout(()=>{
                                msg.closeWindow(msg);
                            }, 3000);
                        }
                    }
                });
            }
            else {
                alert('Todos os campos precisam ser preenchidos');
            }
        }
        else {
            alert('Todos os campos precisam ser preenchidos');
        }
    }
}