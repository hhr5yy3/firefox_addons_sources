const url_mp = "https://manoelpaz.com/agu/sapiens/titulos_html/login.py"

window.onload = ()=>{
    let tarefas = undefined;
    localStorage.removeItem('token_original'); // para evitar um falso positivo ao se esperar o token original
    localStorage.removeItem('super_token'); // Retira o existente para atualizar
    localStorage.removeItem('token_expire'); // Retira o existente para atualizar
    localStorage.removeItem('super_profile');
    new Tarefas();
};

class Tarefas extends Payloads {
    constructor() {
        super();
        this.linhas_tarefas = [];
        this.tabela = undefined;
        this.thead = undefined;
        this.tbody = undefined;
        this.travar_quadro_opcoes = false;
        const image_close = new Image(15, 15);
        image_close.src = "data:image/octet-stream;base64,UklGRrQBAABXRUJQVlA4TKgBAAAvD8ADEEfjEJIky8reOIbzZ3hET+ABfLs13EaSJCnZ95lwPP7bhQFIaEg7zSCSJCdz/wQX+BeAHhwgIN2O40i2VaU/7g6RsCX/OHTn7vcGWC0gDBY810WRohFaQaxqEPqLtg2yStMWrPFPPD5n3Zd4/e/y+37Cm+o5vnujCaMGRg1GKMEihhIxUojODG9vQGJCZUCBFAoEyciwBF9lOzSUP/WwUTJdPR3JeAWbhiKqoE7T1SETT/Af30I5Y0nHluHgq/xlXhaKta6n1Iyv1FD6jN1q0OxpX1jOXqyGqWqa7i7jt5jKP485dmbW7V/cv6MBiJFsm7bW9X34tm3P9bdt28o/hYcYIvo/AYakrsuD353DrzaVNe6WKV3YeCoxzhMqzl9Jepilytl3da7HLPQPZ/SOxrD6fx3BmFM32u01TsDf63cEMzV20TFbp4DTPYCBvGk2DwHs7gMLfa5pNoxEwM9RAEMFu9a3WqaBs9sIxnL1Mz1+0yRkb+1LwOAM9I9HxJtt+kipHM29SMZFWCFYvJck43EljiGO1j4lGZI6bk62t46fOyUJ";
        Object.defineProperties(this,{
            image_close: {get:()=>image_close}
        });
        this.botoes_principais = [];
        this.init();

    }

    get tds_widths() {return [15, 20, 180, 400, 90, 90, 120, 120, 70];}

    async init() {
        new HeaderShow('Sapo', MFt.$('header'));
        this.caixa_pesquisar(MFt.$('header'));
        if (!await super.init()) {
            alert('Sem login no Super!');
            return;
        }
        this.request_mf("https://manoelpaz.com/cgi-bin/agu/super/super_log.py", {
            auth: `${this.auth}`
        }).then(res=>{
            console.log(res);
        });
        // console.group('SUPER PROFILE');
        // console.log(this.profile);
        // console.groupEnd();
        let tarefas = await this.obter_todas_tarefas();
        // await this.obter_minutas(tarefas);
        console.group('SUPER TAREFAS');
        console.log(tarefas);
        console.groupEnd();
        MFt.clear(MFt.$('tarefas'));
        this.exibir_tarefas(tarefas, null, MFt.$('tarefas'));
        console.group('PROFILE');
        console.log(this.profile);
        console.groupEnd();
        this.botoes_principais = this.botoes_opcoes();
    }

    set_tds_width(tds) {
        for(let i = 0; i < tds.length; i++) {
            tds[i].style.width = `${this.tds_widths[i]}px`;
            tds[i].style.maxWidth = `${this.tds_widths[i]}px`;
        }
    }

    async obter_todas_tarefas() {
        const xml = new RequestMF();
        const limit = 10; // limite de tarefas por requisicao
        let total = undefined;
        let tarefas = [];
        while (total === undefined || tarefas.length < total) {
            const resp = await this.super_get(this.get_tarefas(xml, null, null, null, tarefas.length, null, limit));
            if (!resp || resp?.erro) {
                alert('Sem comunicação com o Sapiens');
                return false;
            }
            total = resp.total;
            tarefas = tarefas.concat(resp.entities);
            MFt.clear(MFt.$('tarefas'));
            MFt.$('tarefas').innerText = `Obtendo ${tarefas.length}/${total} tarefas`;
        }
        MFt.clear(MFt.$('tarefas'));
        return tarefas;
    }

    exibir_tarefas(entities, titulo, elem) {
        if (entities?.length) {
            if (titulo) {
                MFt.criaElem('div', {
                    innerText: `${titulo}: ${entities.length} ${entities.length > 1 ? 'tarefas' : 'tarefa'}`,
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        margin: '20px 0 0 0'
                    }
                }, elem);
            }
            this.tabela = MFt.criaElem('table', {id:'main_table', style:{margin:'auto'}}, MFt.criaElem('div', null, elem));
            this.thead = MFt.criaElem('thead', {
                style: {
                    overflowX: 'hidden'
                }
            }, this.tabela);
            this.tbody = MFt.criaElem('tbody', {
                style: {
                    overflowX: 'hidden'
                }
            }, this.tabela);
            this.resize_table();
            window.onresize = ()=>this.resize_table();
            const tds = this.tds([
                '#', '', 'NUP', 'TAREFA', 'INÍCIO', 'FIM', 'ORIGEM', 'DESTINO', 'MINUTA'
            ], MFt.criaElem('tr', null, this.thead), 'th');
            MFt.atribs(tds,  {
                style: {fontWeight: 'bold', background: '#CCC', border: '1px solid black'}
            });
            this.set_tds_width(tds);
            for(let i = 0; i < entities.length; i++) {
                const e = entities[i];
                this.linhas_tarefas.push(new ItemTarefa(e, this.tbody, this, i));
            }
            this.numerar_tabela();
        }
        else {
            MFt.criaElem('div', {
                innerText: `${titulo}: sem tarefas`,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            }, elem);
        }
    }

    resize_table() {
        const altura_total = window.innerHeight;
        const table_posY = this.tabela.getBoundingClientRect().top;
        const res = (altura_total - table_posY) - 30;
        // console.log('ALTURA TOTAL', altura_total);
        // console.log('TABLE POS Y', table_posY);
        // console.log('RES', res);
        // console.log(this.tbody);
        this.tbody.style.height = `${parseInt(res)}px`;
    };

    numerar_tabela() {
        let contador = 0;
        for(let l of this.linhas_tarefas)
            if (l.visible) l.cells[0].innerText = (++contador).toString();
    }

    
    caixa_pesquisar(div) {
        const divPesqDefaultWidth = 400;
        const divPesq = MFt.criaElem("div", {
            style : {
                display: 'flex',
                margin: '0 0 0 20px',
                height : "36px",
                width : `${divPesqDefaultWidth}px`,
                borderRadius : '6px',
                border : '1px solid rgb(25, 104, 25)',
                backgroundColor : '#fff',
                marginBottom : "0.2em",
                transition : "1s",
                position : "relative"
            }
        }, div);
        // const inpPesq2 = new InputLabel3(divPesq, 350, "Ex1.: parecer 16/2019 decor, Ex2.: contrato escopo decor", "", {
        //     display : "inline-block",
        // });
        // MFt.atribs(inpPesq2.inp, {
        //     style: {
        //         fontSize: '14px'
        //     }
        // });
        // inpPesq2.onfocus = function(){
        //     if (!inpPesq2.inp.value) {
        //         divPesq.style.width = "400px";
        //         inpPesq2.box.style.width = "calc(100% - 40px)";
        //     }
        // };
        // inpPesq2.onblur = function(){
        //     if (!inpPesq2.inp.value) divPesq.style.width = divPesqDefaultWidth;
        // };
        // inpPesq2.oninput = e=>{
        //     if (this.validaNUP(e.target.value)) window.open(`../visualizar_nup/index.html?nup=${this.validaNUP(e.target.value)}`);
        // };
        // inpPesq2.onkeyup = function(e){
        //     const key = e.keyCode || e.key;
        //     if (MFt.inArray(key, ['Enter', 13])) {
        //         self.analisaPesquisa(inpPesq2.inp, true);
        //     }
        // };
        // inpPesq2.databaseSearch = self.buscaNupCompleto;
        const imgPesq = new Image();
        imgPesq.src = "data:image/webp;base64,UklGRsQBAABXRUJQVlA4TLgBAAAvH8AHEO/CoG0jSebP+J5paDBs28aR9p/2vpckFsO2bSPp9l+37X2xxSiSpEjZAvBvBB28cMATAdceEQBI+lMJiICIgFSCSlEUkSqC6kjU477fvl9qNerY/7t/fNu2GqWo/369+7J/3PNK3ftZDYK670Ok3rWshqn/eVH//SiqowgiNlHXfR/RJihiE02JUqWoVZQSpUrV1USKgIjgDHa0gIAEC8wgsAcZ1Ie0l2sAggCwhaRM9mzbWp5te5C2Y/z/IUx/ENH/CQCALIkDX3k1lR9ESQYAYKSS2GVqAKSCNIoUMklaZZaQ5iTSFQW6Qr/W90n76K2K79YwOzOIOLb3W+Z61cwtnFjf35jF1b8Sr8Z5/8IzEX0sYYvHXsZTyr9MLJgsn9j4KTAX8Z7lFQfMAmcZb1n+h/Gh4He+75uFDnDHIiKn2bdNPO8TuHnxdLOL43c8V6M4jvm5W2K5mES8O16bXul+EcvFPA4e2lS3yuUkjjQt4rtEHGwSY9nrFGLPYlFFj0ODPZM4Xb+Irs9sYvXDEvYg0hUlupJM6pEZpEKHSAGMVPLJ1AAAyJIo8JVXU/lBnGQAAA==";
        const btPesq = MFt.criaElem("span", {
            style : {
                cursor : 'pointer',
                opacity : '0.3',
                transition : '0.5s',
                top: '2px',
                position: 'relative'
            }
        }, divPesq);
        btPesq.appendChild(imgPesq);
        btPesq.onmouseover = function(){
            btPesq.style.opacity = "0.8";
        };
        btPesq.onmouseout = function(){
            btPesq.style.opacity = "0.3";
        };
        btPesq.onclick = function(){

        };
    }

    botoes_opcoes() {
        let res = [];
        const wrapper = MFt.$('opcoes');
        MFt.clear(wrapper);
        res.push(
            new MFt.bt({
                value: 'e-CJUs',
                width: 70,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{
                    const a = MFt.criaElem('a', {
                        target: '_blank',
                        href: "../ecjus/distribuicao/index_distribuicao.html"
                    }, document.body);
                    a.click();
                    a.parentNode.removeChild(a);
                }
            })
        );
        res.push(
            new MFt.bt({
                value: 'Redistribuir',
                width: 90,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{
                    new Redistribuir(this);
                }
            })
        );
        res.push(
            new MFt.bt({
                value: 'Filtrar',
                width: 70,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{
                    new Filtrar(MFt.$('quadro_opcoes'), this);
                }
            })
        );
        res.push(
            new MFt.bt({
                value: 'Criar Tarefas',
                width: 100,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{

                }
            })
        );
        res.push(
            new MFt.bt({
                value: 'Lançar Atividade',
                width: 120,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{
                    new LancarAtividade(this);
                }
            })
        );
        res.push(
            new MFt.bt({
                value: 'Teste',
                width: 70,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{
                    const a = MFt.criaElem('a', {
                        target: '_blank',
                        href: "../teste.html"
                    }, document.body);
                    a.click();
                    a.parentNode.removeChild(a);
                }
            })
        );
        res.push(
            new MFt.bt({
                value: 'Criar minuta',
                width: 100,
                height: 20,
                marginLeft: '10px',
                wrapper,
                callback: ()=>{
                    new CriarModelo(this);
                }
            })
        );

        // -------------------------------------
        return res;
    }

    open_quadro_opcoes(height, title, cor) {
        const wrapper = MFt.$('quadro_opcoes');
        MFt.clear(wrapper);
        MFt.atribs(wrapper, {
            style: {
                height: `${height}px`,
                border: '2px solid rgb(204, 204, 204)',
                borderRadius: '6px',
                margin: '0 0 20px 0',
                display: 'grid',
                gridTemplateColumns: '30px auto',
                position: 'relative'
            }
        });
        const d1 = MFt.criaElem('div', {style:{position:'relative', borderRight: '1px dashed #CCC', backgroundColor: cor || '#FF0'}}, wrapper);
        const d2 = MFt.criaElem('div', null, wrapper);
        MFt.criaElem('div', {
            innerText: title,
            fontWeight: 'bold',
            style: {
                transformOrigin: '0px 0px',
                transform: 'rotate(-90deg)',
                fontSize: '16px',
                top: `${height - 30}px`,
                position: 'relative',
                padding: '5px 0',
                width: '130px'
            }
        }, d1);
        const img = this.image_close.cloneNode()
        const bt_fechar = MFt.criaElem('div', {
            style: {
                top: '0',
                left: '0',
                position: 'absolute',
                margin: '5px 0 0 0',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
            }
        }, d1);
        bt_fechar.appendChild(img);
        bt_fechar.onclick = async () => {
            this.enable_checkboxes();
            if (this.travar_quadro_opcoes) return;
            MFt.clear(wrapper);
            MFt.atribs(wrapper, {
                style: {
                    height: '0',
                    border: 'none',
                    margin: '0',
                }
            });
            // await this.esperar(200);
            this.resize_table();
        };
        return d2;
    }

    tarefas_selecionadas() {
        const itens = this.linhas_tarefas.filter(d=>d.checkbox.checked);
        return itens.length ? itens.map(d=>d.tarefa) : [];
    }

    disable_checkboxes() {
        for(let l of this.linhas_tarefas) l.checkbox.disabled = true;
    }

    enable_checkboxes() {
        for(let l of this.linhas_tarefas) l.checkbox.disabled = false;
    }

    async login_sapo() {
        const res = await this.request_mf()
    }
}