class Menu extends Payloads {
    constructor(pai, wp, iconWidth=32, url_icone, opcoes, titulo) {
        super();
        this.pai = pai;
        this.wp = wp;
        this.icon = new Image(iconWidth || 32);
        this.url_icone = url_icone || "/images/menu.png";
        this.titulo = titulo;
        this.pop = undefined; // Para aqueles que chamarem o open_quadro_opcoes(), this.pop vai se referir ao PopUp()
        this.opcoes = opcoes || [
            {label: "Criar Tarefa", exec: ()=>this.nova_tarefa(), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDgwLTgwcS04MyAwLTE1Ni0zMS41VDE5Ny0xOTdxLTU0LTU0LTg1LjUtMTI3VDgwLTQ4MHEwLTgzIDMxLjUtMTU2VDE5Ny03NjNxNTQtNTQgMTI3LTg1LjVUNDgwLTg4MHE2NSAwIDEyMyAxOXQxMDcgNTNsLTU4IDU5cS0zOC0yNC04MS0zNy41VDQ4MC04MDBxLTEzMyAwLTIyNi41IDkzLjVUMTYwLTQ4MHEwIDEzMyA5My41IDIyNi41VDQ4MC0xNjBxMzIgMCA2Mi02dDU4LTE3bDYwIDYxcS00MSAyMC04NiAzMXQtOTQgMTFabTI4MC04MHYtMTIwSDY0MHYtODBoMTIwdi0xMjBoODB2MTIwaDEyMHY4MEg4NDB2MTIwaC04MFpNNDI0LTI5NiAyNTQtNDY2bDU2LTU2IDExNCAxMTQgNDAwLTQwMSA1NiA1Ni00NTYgNDU3WiIvPjwvc3ZnPg=='},
            {label: "Assessoramento Informal", exec: ()=>this.registrar_reuniao_assessoramento(false), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMjYwLTcyMHEtMzMgMC01Ni41LTIzLjVUMTgwLTgwMHEwLTMzIDIzLjUtNTYuNVQyNjAtODgwcTMzIDAgNTYuNSAyMy41VDM0MC04MDBxMCAzMy0yMy41IDU2LjVUMjYwLTcyMFptNDIwIDIwMHEtMjUgMC00Mi41LTE3LjVUNjIwLTU4MHEwLTI1IDE3LjUtNDIuNVQ2ODAtNjQwcTI1IDAgNDIuNSAxNy41VDc0MC01ODBxMCAyNS0xNy41IDQyLjVUNjgwLTUyMFpNMTgwLTgwdi0yODBoLTYwdi0yNDBxMC0zMyAyMy41LTU2LjVUMjAwLTY4MGgxMjBxMjIgMCA0MCAxMC41dDI5IDI5LjVsMTQzIDI0NyA0MS02MXE4LTEyIDIxLjUtMTl0MjguNS03aDExN3EyNSAwIDQyLjUgMTcuNVQ4MDAtNDIwdjE0MGgtNDB2MjAwSDYwMHYtMjg0bC0zMSA0NGgtODhMMzgwLTQ5NnY0MTZIMTgwWiIvPjwvc3ZnPg=='},
            {label: "Reunião de Assessoramento", exec: ()=>this.registrar_reuniao_assessoramento(true), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDAtMTYwdi0xNjBxMC0zNCAyMy41LTU3dDU2LjUtMjNoMTMxcTIwIDAgMzggMTB0MjkgMjdxMjkgMzkgNzEuNSA2MXQ5MC41IDIycTQ5IDAgOTEuNS0yMnQ3MC41LTYxcTEzLTE3IDMwLjUtMjd0MzYuNS0xMGgxMzFxMzQgMCA1NyAyM3QyMyA1N3YxNjBINjQwdi05MXEtMzUgMjUtNzUuNSAzOFQ0ODAtMjAwcS00MyAwLTg0LTEzLjVUMzIwLTI1MnY5Mkg0MFptNDQwLTE2MHEtMzggMC03Mi0xNy41VDM1MS0zODZxLTE3LTI1LTQyLjUtMzkuNVQyNTMtNDQwcTIyLTM3IDkzLTU4LjVUNDgwLTUyMHE2MyAwIDEzNCAyMS41dDkzIDU4LjVxLTI5IDAtNTUgMTQuNVQ2MDktMzg2cS0yMiAzMi01NiA0OXQtNzMgMTdaTTE2MC00NDBxLTUwIDAtODUtMzV0LTM1LTg1cTAtNTEgMzUtODUuNXQ4NS0zNC41cTUxIDAgODUuNSAzNC41VDI4MC01NjBxMCA1MC0zNC41IDg1VDE2MC00NDBabTY0MCAwcS01MCAwLTg1LTM1dC0zNS04NXEwLTUxIDM1LTg1LjV0ODUtMzQuNXE1MSAwIDg1LjUgMzQuNVQ5MjAtNTYwcTAgNTAtMzQuNSA4NVQ4MDAtNDQwWk00ODAtNTYwcS01MCAwLTg1LTM1dC0zNS04NXEwLTUxIDM1LTg1LjV0ODUtMzQuNXE1MSAwIDg1LjUgMzQuNVQ2MDAtNjgwcTAgNTAtMzQuNSA4NVQ0ODAtNTYwWiIvPjwvc3ZnPg=='},
            {label: "Reunião de Trabalho", exec: ()=>this.registrar_reuniao_trabalho(), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJtMTYwLTQxOSAxMDEtMTAxLTEwMS0xMDFMNTktNTIwbDEwMSAxMDFabTU0MC0yMSAxMDAtMTYwIDEwMCAxNjBINzAwWm0tMjIwLTQwcS01MCAwLTg1LTM1dC0zNS04NXEwLTUxIDM1LTg1LjV0ODUtMzQuNXE1MSAwIDg1LjUgMzQuNVQ2MDAtNjAwcTAgNTAtMzQuNSA4NVQ0ODAtNDgwWm0wLTE2MHEtMTcgMC0yOC41IDExLjVUNDQwLTYwMHEwIDE3IDExLjUgMjguNVQ0ODAtNTYwcTE3IDAgMjguNS0xMS41VDUyMC02MDBxMC0xNy0xMS41LTI4LjVUNDgwLTY0MFptMCA0MFpNMC0yNDB2LTYzcTAtNDQgNDQuNS03MC41VDE2MC00MDBxMTMgMCAyNSAuNXQyMyAyLjVxLTE0IDIwLTIxIDQzdC03IDQ5djY1SDBabTI0MCAwdi02NXEwLTY1IDY2LjUtMTA1VDQ4MC00NTBxMTA4IDAgMTc0IDQwdDY2IDEwNXY2NUgyNDBabTU2MC0xNjBxNzIgMCAxMTYgMjYuNXQ0NCA3MC41djYzSDc4MHYtNjVxMC0yNi02LjUtNDlUNzU0LTM5N3ExMS0yIDIyLjUtMi41dDIzLjUtLjVabS0zMjAgMzBxLTU3IDAtMTAyIDE1dC01MyAzNWgzMTFxLTktMjAtNTMuNS0zNVQ0ODAtMzcwWm0wIDUwWiIvPjwvc3ZnPg=='},
        ];
        if (this.pai.tarefa) {
            this.opcoes.push({label: "Criar Documento", exec: ()=>this.criar_modelo(), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNMzIwLTI0MGgzMjB2LTgwSDMyMHY4MFptMC0xNjBoMzIwdi04MEgzMjB2ODBaTTI0MC04MHEtMzMgMC01Ni41LTIzLjVUMTYwLTE2MHYtNjQwcTAtMzMgMjMuNS01Ni41VDI0MC04ODBoMzIwbDI0MCAyNDB2NDgwcTAgMzMtMjMuNSA1Ni41VDcyMC04MEgyNDBabTI4MC01MjB2LTIwMEgyNDB2NjQwaDQ4MHYtNDQwSDUyMFpNMjQwLTgwMHYyMDAtMjAwIDY0MC02NDBaIi8+PC9zdmc+'});
            this.opcoes.push({label: "Lançar Atividade", exec: ()=>this.lancar_atividade_local(), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJtMjE2LTE2MC01Ni01NiAzODQtMzg0SDQ0MHY4MGgtODB2LTE2MGgyMzNxMTYgMCAzMSA2dDI2IDE3bDEyMCAxMTlxMjcgMjcgNjYgNDJ0ODQgMTZ2ODBxLTYyIDAtMTEyLjUtMTlUNzE4LTQ3NmwtNDAtNDItODggODggOTAgOTAtMjYyIDE1MS00MC02OSAxNzItOTktNjgtNjgtMjY2IDI2NVptLTk2LTI4MHYtODBoMjAwdjgwSDEyMFpNNDAtNTYwdi04MGgyMDB2ODBINDBabTczOS04MHEtMzMgMC01Ny0yMy41VDY5OC03MjBxMC0zMyAyNC01Ni41dDU3LTIzLjVxMzMgMCA1NyAyMy41dDI0IDU2LjVxMCAzMy0yNCA1Ni41VDc3OS02NDBabS02NTktNDB2LTgwaDIwMHY4MEgxMjBaIi8+PC9zdmc+'})
        }
        if (this.pai.especie_tarefa_id === 203) {
            this.opcoes.push({label: 'Apenas dar ciência', exec: ()=>this.apenas_dar_ciencia(), icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjNWY2MzY4Ij48cGF0aCBkPSJNNDQwLTQwMGg4MHYtMjgwaC04MHYyODBabTEyMC02MGg4MHYtMTgwaC04MHYxODBabS0yNDAtMjBoODB2LTE2MGgtODB2MTYwWk0yNDAtODB2LTE3MnEtNTctNTItODguNS0xMjEuNVQxMjAtNTIwcTAtMTUwIDEwNS0yNTV0MjU1LTEwNXExMjUgMCAyMjEuNSA3My41VDgyNy02MTVsNTIgMjA1cTUgMTktNyAzNC41VDg0MC0zNjBoLTgwdjEyMHEwIDMzLTIzLjUgNTYuNVQ2ODAtMTYwaC04MHY4MGgtODB2LTE2MGgxNjB2LTIwMGgxMDhsLTM4LTE1NXEtMjMtOTEtOTgtMTQ4dC0xNzItNTdxLTExNiAwLTE5OCA4MXQtODIgMTk3cTAgNjAgMjQuNSAxMTR0NjkuNSA5NmwyNiAyNHYyMDhoLTgwWm0yNTQtMzYwWiIvPjwvc3ZnPg=='});
        }
        this.div_icon_menu = undefined; // where the menu icon will be
        this.div_opcoes = undefined; // where the options will be
        this.icon.onload = ()=>{this.init();};
        this.icon.src = this.url_icone;
    }

    init() {
        MFt.clear(this.wp);
        MFt.atribs(this.icone, {
            style: {
                position: 'relative',
                top: '5px',
                cursor: 'pointer'
            }
        });
        const d0 = MFt.criaElem('div', {
            style: {
                height: '33px',
                width: `${this.icon.width}px`,
            }
        }, this.wp, {d0:''});
        this.div_icon_menu = MFt.criaElem('div', {
            style: {
                width: `${this.icon.width}px`,
                height: d0.style.height,
                display: 'flex',
                alignItems: 'center'
            }
        }, d0, {local_do_icone:''});
        this.div_opcoes = MFt.criaElem('div', {
            style: {
                maxWidth: '33px',
                position: 'relative',
                top: '-8px'
            }
        }, d0, {div_das_opcoes:''});
        this.div_icon_menu.appendChild(this.icon);
        const enter = ()=>{
            this.div_icon_menu.removeEventListener('mouseenter', enter);
            const dOp = MFt.criaElem('div', {
                style: {
                    minWidth: '200px',
                    background: 'cornsilk',
                    padding: '5px 10px',
                    margin: '5px 0',
                    border: '1px solid #777',
                    borderRadius: '6px',
                    boxShadow: '5px 5px 5px #CCC'
                }
            }, this.div_opcoes, {div_com_os_items:''});
            if (this.titulo) {
                const titulo = MFt.criaElem('div', {
                    innerText: this.titulo || '',
                    style: {
                        fontWeight: 'bold',
                        fontSize: '14px',
                        padding: '0 0 5px 0',
                        margin: '0 0 5px 0',
                        borderBottom: '1px solid #CCC'
                    }
                }, dOp);
            }
            for(let o of this.opcoes) this._add_opcao(o, dOp);
            d0.onmouseleave = ()=>{
                MFt.clear(this.div_opcoes);
                this.div_icon_menu.addEventListener('mouseenter', enter);
            };
        };
        this.div_icon_menu.addEventListener('mouseenter', enter);
    }

    clear() {
        MFt.clear(this.div_opcoes);
    }

    add_opcao(label, exec, icon=undefined) {
        this.opcoes.push({label, exec, icon});
    }

    _add_opcao(o, elem) {
        const d0 = MFt.criaElem('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'auto auto',

                padding: '5px',
                margin: '0 0 5px 0',
                border: '1px solid #CCC',
                borderRadius: '6px',
                cursor: 'pointer',
                // display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                background: '#FFF',
                fontSize: '15px'
            }
        }, elem);
        const div_img = MFt.criaElem('div', {
            style: {
                display: 'flex',
                alignItems: 'center',
                width: '0'
            }
        }, d0);
        const d1 = MFt.criaElem('div', {
            style: {

            }
        }, d0);
        if (o?.icon instanceof Image) {
            o.icon.style.width = '20px';
            o.icon.style.height = '20px';
            div_img.appendChild(o.icon);
            div_img.style.width = '20px';
            div_img.style.marginRight = '5px';
        }
        else if (typeof o?.icon === 'string') {
            const img = new Image(20);
            img.src = o.icon;
            img.style.width = '20px';
            img.style.height = '20px';
            div_img.appendChild(img);
            div_img.style.width = '20px';
            div_img.style.marginRight = '5px';
        }
        const s1 = MFt.criaElem('span', {
            innerText: o.label,
            style: {
                textSize: '14px',
                // fontWeight: 'bold',
                // fontFamily: 'Titillium Web'
            }
        }, d1);
        d0.onmouseenter = ()=>{
            d0.style.background = '#FF9';
            d0.style.boxShadow = '0 0 5px #AAA';
        };
        d0.onmouseleave = ()=>{
            d0.style.background = '#FFF';
            d0.style.boxShadow = 'none';
        };
        d0.onclick = e=>{
            o.exec(e);
        }
    }

    nova_tarefa() {
        new TelaNovaTarefa(this.pai.processo.id);
    }

    registrar_reuniao_assessoramento(reuniao_assessoramento=false) {
        new RegistrarAssessoramento(this.pai.processo.id, reuniao_assessoramento);
    }

    registrar_reuniao_trabalho() {
        new RegistrarReuniao(this.pai.processo.id); // registrar_reuniao.js
    }

    apenas_dar_ciencia() {
        if (!confirm("Confirma Dar Ciência?")) return;
        const pop = new PopUp(270, 30, null, null, async form=>{
            form.div.innerText = 'Dando ciência (obtendo minutas)...';
            const xml = new RequestMF();
            let minutas = await this.super_get(xml, this.get_minutas(parseInt(this.pai.tarefa_id)), true);
            if (!minutas) {
                alert('Erro de comunicação');
                form.closeWindow(form);
            }
            if (minutas.length) minutas = minutas.map(d=>d.id);
            form.div.innerText = 'Dando ciência (lançando atividade)...';
            const res = await this.super_get(xml, this.lancar_atividade(new Date(), minutas, 117, parseInt(this.pai.tarefa_id), this.profile.id, '')); // 117 = "CIÊNCIA, APOSIÇÃO DE"
            if (res) form.div.innerText = 'Tudo Ok!';
            this.registrar_evento(`Ciência dada no NUP ${this.pai.processo.NUP}`);
            this.enviar_mensagem(['tarefas - kururu'], 'recarregar_tarefas');
            await this.esperar(1000);
            form.closeWindow(form);
        });
        pop.iniciar(pop);
        pop.aceitaEsc = pop.clicafora_sair = false;
    }

    criar_modelo() {
        new CriarModelo(this.pai);
    }

    lancar_atividade_local() {
        new LancarAtividade(this);
    }

    open_quadro_opcoes(height, titulo) {
        this.pop = new PopUp(1200, height, null, null, form=>{
            form.div.innerText = 'Aguarde...';
        });
        this.pop.header = titulo;
        this.pop.iniciar(this.pop);
        this.pop.aceitaEsc = this.pop.clicafora_sair = true;
        return this.pop;
    }

    tarefas_selecionadas() {
        return [this.pai.tarefa];
    }
}