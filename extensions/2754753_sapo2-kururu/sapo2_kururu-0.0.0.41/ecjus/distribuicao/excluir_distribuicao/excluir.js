let mp = 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py';

window.onload = ()=>{
    new HeaderShow('Exclusão de Tarefas Distribuídas', MFt.$('header'));
    new Excluir();
};

class Excluir extends Tudo2 {
    constructor() {
        super();
        this.id_unidade = parseInt(MFt.urlArgs()['id_unidade']);
        this.usuario = this.profile;
        this.form_dia();
    }

    obter_usuario(cb) {
        this.sapiens_route(new Payloads().identidade(), (ds)=>{
            if (ds) {
                this.usuario = ds[0];
                cb();
            }
            else alert('Erro de comunicação com o Sapiens');
        });
    }

    form_dia() {
        let d1 = MFt.$('tarefas');
        MFt.clear(d1);
        let dia = this.campo_texto('DATA DA DISTRIBUIÇÃO', '', d1, 200);
        dia.focus();
        new MFt.bt({
            value: 'Excluir por Advogado',
            width: 180,
            height: 30,
            marginBottom: '15px',
            wrapper: MFt.criaElem('div', null, d1),
            callback: ()=>new Excluir2()
        });
        let seguir = ()=>{
            bt.disabled = true;
            let data = this.validaData(dia.value.trim());
            let hoje = new Date();
            let inicio = new Date(2020, 8, 1, 0, 0, 0, 0);
            hoje.setHours(23, 59, 59, 99);
            if (data && data <= hoje && data >= inicio) {
                this.buscar_distribuicoes(data, (dd)=>{
                    this.exibir_distribuicoes(data, dd);
                });
            }
            else {
                alert('A Data precisa estar entre 01/09/2020 e hoje');
                bt.disabled = false;
            }
        };
        let bt = new MFt.bt({
            value: 'Buscar',
            width: 100,
            height: 30,
            wrapper: MFt.criaElem('div', null, d1),
            callback: ()=>{
                seguir();
            }
        });
        dia.onkeydown = (e)=>{
            if (e.key === 'Enter') {
                e.stopPropagation();
                seguir();
            }
        }
    }

    buscar_distribuicoes(data, cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'obter_distribuicao_dia',
                id_unidade: this.id_unidade,
                data_hora_distribuicao: MFt.dates.date2sql(data)
            },
            callback: (dd)=>{
                if (dd && dd.ok) cb(dd.dados);
                else if (dd && dd.erro) alert(dd.erro);
                else alert('Falha de comunicação com o Servidor');
            }
        });
    }

    exibir_distribuicoes(data, dd) {
        let d1 = MFt.$('tarefas');
        MFt.clear(d1);
        MFt.criaElem('div', {
            innerText: `DISTRIBUIÇÃO DO DIA ${this.date2normal(data)}`,
            style: {
                fontWeight: 'bold'
            }
        }, d1);
        let tabela = MFt.criaElem('table', {}, d1);
        let tds = this.tds(['', 'NUP', 'ADVOGADO', 'P.INICIAL', 'CONCLUSÃO', 'AÇÃO'], MFt.criaElem('tr', null, tabela));
        let contador = 0;
        dd.forEach((d)=>{
            console.log(d);
            if (!d[25] && d[5]) {
                let campos = [
                    (++contador).toString(),
                    this.formatanup(d[5]),
                    d[24],
                    d[11] ? this.date2normal(this.validaData(d[11])) : '',
                    d[12] ? this.date2normal(this.validaData(d[12])) : '',
                    ''
                ];
                let tr = MFt.criaElem('tr', null, tabela);
                let tds = this.tds(campos, tr);
                tr.onmouseenter = ()=>{
                    tr.style.backgroundColor = "#FF7";
                };
                tr.onmouseleave = ()=>{
                    tr.style.backgroundColor = "transparent";
                };
                let excluir = MFt.criaElem('span', {
                    innerText: 'excluir',
                    style: {
                        color: 'red',
                        cursor: 'pointer'
                    }
                }, tds[5]);
                excluir.onclick = ()=>{
                    // excluir.parentNode.removeChild(excluir);
                    let pop = new PopUp(300, 120, null, null, form=>{
                        MFt.criaElem('div', {
                            innerText: `Confirma a exclusão da tarefa de ${d[24]}?`
                        }, form.div);
                        let cb_criar_doc = this.campo_checkbox('Criar documento de exclusão.', true, form.div);
                        let bt = new MFt.bt({
                            value: 'Sim',
                            wrapper: MFt.criaElem('div', null, form.div),
                            width: 100,
                            height: 30,
                            marginTop: '10px',
                            callback: ()=>{
                                if (cb_criar_doc.checked) {
                                    form.closeWindow(form);
                                    this.criar_documento(d);
                                }
                                else { // Excluir tarefa do manoelpaz e depois do Sapiens sem anexar qualquer documento no Sapiens
                                    form.div.innerText = 'Excluindo tarefa no Servidor...';
                                    this.xml_excluir_tarefa(d[28], ()=> {
                                        form.div.innerText = 'Excluindo tarefa no Sapiens...';
                                        this.sapiens_route_no_records(new Payloads().excluir_tarefa(d[1]), ds=>{
                                            if (ds) {
                                                form.div.innerText = 'Sucesso!';
                                                tds[5].innerText = 'excluida';
                                                setTimeout(()=>{
                                                    form.closeWindow(form);
                                                }, 1500);
                                            }
                                            else form.div.innerText = 'Erro!';
                                        });
                                    });
                                }
                            }
                        });
                    });
                    pop.iniciar(pop);
                    pop.aceitaEsc = true;
                    pop.clicafora_sair = true;
                    // if (confirm(`Deseja realmente excluir a tarefa criada para\n${d[24]}?`)) this.criar_documento(d);
                }
            }
        });
    }

    criar_documento(dados) {
        let d1 = MFt.$('tarefas');
        let d2 = MFt.$('botao');
        MFt.clear(d1);
        MFt.atribs(d1, {
            style: {
                fontFamily: 'Arial'
            }
        });
        MFt.criaElem('div', {
            innerText: `REGISTRO DE EXCLUSÃO DE TAREFA`,
            style: {
                fontWeight: 'bold'
            }
        }, d1);
        MFt.criaElem('div', {
            innerText: `NUP ${this.formatanup(dados[5])}`,
            style: {
                fontWeight: 'normal'
            }
        }, d1);
        MFt.criaElem('div', {
            innerText: `RESPONSÁVEL: ${dados[24]}`,
            style: {
                fontWeight: 'normal'
            }
        }, d1);
        MFt.criaElem('div', {
            innerText: `DATA DA DISTRIBUIÇÃO: ${this.date2normal(this.validaData(dados[11]))}`,
            style: {
                fontWeight: 'normal'
            }
        }, d1);
        MFt.criaElem('div', {
            innerText: `ID TAREFA SAPIENS: ${dados[1]}`,
            style: {
                fontWeight: 'normal'
            }
        }, d1);
        let motivo = MFt.criaElem('div', {
            innerText: `MOTIVO DA EXCLUSÃO: `,
            style: {
                fontWeight: 'normal'
            }
        }, d1, {
            contentEditable: true
        });
        motivo.onblur = ()=>{
            if (motivo.innerText.trim().length === 0) motivo.innerText = 'MOTIVO DA EXCLUSÃO: ';
        };
        MFt.criaElem('div', {
            innerText: `A distribuição aqui referida não será utilizada para fins de distribuições futuras, restando excluída da contagem de distribuições do responsável indicado.`,
            style: {
                fontWeight: 'normal',
                marginTop: '10px'
            }
        }, d1);
        MFt.criaElem('div', {
            innerText: `Brasília, ${this.date2normal(new Date())}.`,
            style: {
                fontWeight: 'normal',
                marginTop: '10px'
            }
        }, d1);
        let bt = new MFt.bt({
            value: 'Proceder',
            wrapper: d2,
            width: 100,
            height: 30,
            marginTop: '10px',
            callback: ()=>{
                this.selecionar_nup((nup, form)=>{
                    let log = t=>{MFt.criaElem('div', {innerText:t}, form.div)};
                    form.div.innerText = 'Excluindo tarefa...';
                    motivo.contentEditable = false;
                    this.xml_excluir_tarefa(dados[28], ()=>{ // Excluir tarefa no manoelpaz
                        MFt.clear(form.div);
                        log('Tarefa excluída no Banco de Dados');
                        log('Excluindo tarefa no Sapiens...');
                        this.sapiens_route_no_records(new Payloads().excluir_tarefa(dados[1]), ok=>{
                            if (ok) {
                                log('Tarefa excluída no Sapiens');
                            }
                            else {
                                log('Erro ao excluir tarefa do Sapiens');
                            }
                            log('Anexando documento...');
                            this.incluir_doc_sapiens(d1.innerHTML, nup, form, ()=>{
                                log('Documento anexado!');
                                setTimeout(()=>{
                                    location.reload();
                                }, 4000);
                            });
                        });
                    });
                });
            }
        });
    }

    xml_excluir_tarefa(rowid, cb) {
        MFt.xml({
            url: mp,
            get: {
                task: 'excluir_tarefa',
                id: rowid
            },
            callback: (dd)=>{
                if(dd && dd.ok) {
                    cb();
                }
                else if (dd && dd.erro) alert(dd.erro);
                else alert('Erro de comunicação ao excluir tarefa no Servidor');
            }
        });
    }

    incluir_doc_sapiens(inner, nup, form, cb) {
        let gerar_ticket = ()=>{
            let hoje = new Date();
            let ticket = MFt.dates.date2sql(hoje).replace(/:/g, '').replace(/-/g, '').replace(' ', '');
            return `${this.usuario.id}_${ticket}`;
        };
        let html = `<!DOCTYPE html><html lang="pt-BR"><header><meta charset="utf-8"/><style>body {font-family: 'Titillium Web', 'Arial', serif;font-size: 12px;} td {padding: 0 7px;} table{border-collapse: collapse;}</style></header><body>${inner}</body></html>`;
        console.log(html);
        gerar_ticket();
        if (this.validaNUP(nup)) {
            MFt.clear(form.div);
            form.div.innerText = `Anexando documento ao NUP ${this.formatanup(this.validaNUP(nup))}...`;
            this.sapiens_route(new Payloads().getIdPastaPeloNUP(this.validaNUP(nup.trim())), (ds)=>{
                if (ds) {
                    let id_pasta = ds[0].id;
                    this.xml({
                        url: `https://sapiens.agu.gov.br/upload_pasta?pasta=${id_pasta}&ticket_upload=${gerar_ticket()}&tipoDocumento=403`,
                        headers: {
                            'X-File-Name': 'relatorio.html',
                            'X-File-Size': new Blob([html]).size,
                            'X-File-Type': 'text/html',
                            'Content-type': 'application/binary'
                        },
                        justText: 1,
                        msg: html,
                        callback: (d)=>{
                            let ok;
                            try {
                                ok = JSON.parse(d);
                            }
                            catch{}
                            if (ok && ok.success) {
                                cb();
                            }
                            else if (ok && ok.message) alert(ok.message);
                        }
                    });
                } else alert('Erro de comunicação com o Sapiens');
            });
        } else {
            bt.disabled = false;
            alert('NUP inválido');
        }
    }

    selecionar_nup(cb) {
        let pop = new PopUp(300, 100, null, null, (form)=>{
            let nup = this.campo_texto('NUP DE DISTRIBUIÇÃO', '', form.div, 200);
            let bt = new MFt.bt({
                value: 'Selecionar',
                width: 100,
                height: 30,
                wrapper: MFt.criaElem('div', null, form.div),
                callback: ()=>{
                    bt.disabled = true;
                    pop.aceitaEsc = false;
                    pop.clicafora_sair = false;
                    if (this.validaNUP(nup.value.trim())) {
                        cb(this.validaNUP(nup.value.trim()), form);
                    }
                    else {
                        alert('NUP inválido!');
                        bt.disabled = false;
                    }
                }
            });
        });
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
        pop.iniciar(pop);
    }
}