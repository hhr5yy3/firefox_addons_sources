window.onload = ()=>{
    new HeaderShow('Relatórios em Lote', MFt.$('header'), 'Titillium Web', '20px', '#222', '2px 2px 4px #BBB');
    new RelatorioLote();
};

class RelatorioLote extends Payloads {
    constructor() {
        super();
        this.consultorias = [];
        this.unidades = [];
        this.mes_inicial;
        this.ano_inicial;
        this.mes_final;
        this.ano_final;
        this.meses = ['---', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        this.anos = (()=>{
            const hoje = new Date();
            let ret = [];
            for(let i = 2014; i <= hoje.getFullYear(); i++) ret.push(i);
            return ret;
        })();
        this.selecionados = {};
        this.request = new RequestMF();
        this.iconUpload = new Image(32);
        this.iconUpload.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgOTYgOTYwIDk2MCIgd2lkdGg9IjQ4Ij48cGF0aCBkPSJNNDUyIDg1NGg2MFY2NTNsODIgODIgNDItNDItMTU2LTE1Mi0xNTQgMTU0IDQyIDQyIDg0LTg0djIwMVpNMjIwIDk3NnEtMjQgMC00Mi0xOHQtMTgtNDJWMjM2cTAtMjQgMTgtNDJ0NDItMThoMzYxbDIxOSAyMTl2NTIxcTAgMjQtMTggNDJ0LTQyIDE4SDIyMFptMzMxLTU1NFYyMzZIMjIwdjY4MGg1MjBWNDIySDU1MVpNMjIwIDIzNnYxODYtMTg2IDY4MC02ODBaIi8+PC9zdmc+';
        this.init();
    }

    async init() {
        const msg = new MsgGenerica('Obtendo dados...', 200, 40);
        this.consultorias = await this.obter_unidades_agu();
        msg.closeWindow(msg);
        const dados = (()=>{
            let ret = [{nome:'---', value: 0}];
            //let ids = [];
            this.consultorias.forEach(d=>{
                ret.push({nome:d.nome, value: d.id});
                //ids.push(d.id);
            });
            return ret;
        })();
        const meses = (()=>{
            let ret = [];
            this.meses.forEach((d, i)=>ret.push({nome:d, value:i}));
            return ret;
        })();
        const anos = (()=>{
            let ret = [];
            this.anos.forEach(d=>ret.push({nome:d.toString(), value:d}));
            return ret;
        })();
        const sel_mes_inicial = this.criar_select('MÊS INICIAL', meses, MFt.$('mes_inicial'), 'sel_mes');
        const sel_ano_inicial = this.criar_select('ANO INICIAL', anos, MFt.$('ano_inicial'), 'sel_mes');
        const sel_mes_final = this.criar_select('MÊS FINAL', meses, MFt.$('mes_final'), 'sel_mes');
        const sel_ano_final = this.criar_select('ANO FINAL', anos, MFt.$('ano_final'), 'sel_mes');
        const sel_con = this.criar_select('UNIDADE', dados, MFt.$('unidades'), 'sel_mes');
        sel_ano_inicial.selectedIndex = sel_ano_inicial.length - 1;
        sel_ano_final.selectedIndex = sel_ano_final.length - 1;
        this.ano_inicial = parseInt(sel_ano_inicial[sel_ano_inicial.selectedIndex].value);
        this.mes_inicial = parseInt(sel_mes_inicial[sel_mes_inicial.selectedIndex].value);
        this.ano_final = parseInt(sel_ano_inicial[sel_ano_inicial.selectedIndex].value);
        this.mes_final = parseInt(sel_mes_inicial[sel_mes_inicial.selectedIndex].value);
        sel_mes_inicial.onchange = ()=>this.mes_inicial = parseInt(sel_mes_inicial[sel_mes_inicial.selectedIndex].value);
        sel_ano_inicial.onchange = ()=>this.ano_inicial = parseInt(sel_ano_inicial[sel_ano_inicial.selectedIndex].value);
        sel_mes_final.onchange = ()=>this.mes_final = parseInt(sel_mes_final[sel_mes_final.selectedIndex].value);
        sel_ano_final.onchange = ()=>this.ano_final = parseInt(sel_ano_final[sel_ano_final.selectedIndex].value);
        sel_con.onchange = async ()=>{
            if (sel_mes_inicial.selectedIndex === 0 || sel_ano_inicial.selectedIndex === 0) {
                alert('É necessário selecionar o mês inicial e o ano inicial antes de escolher os setores.');
                sel_con.selectedIndex = 0;
                return;
            }
            sel_mes_inicial.disabled = sel_ano_inicial.disabled = true;
            if (sel_con.selectedIndex) {
                await this.exibir_consultorias(parseInt(sel_con[sel_con.selectedIndex].value), sel_con[sel_con.selectedIndex].innerText, sel_con);
            }
            else {
                MFt.atribs(MFt.$('consultorias'), {
                    style: {
                        border: 'none'
                    }
                });
                MFt.clear(MFt.$('consultorias'));
            }
        };




        const labelFile = MFt.criaElem('label', {
            style: {
                width: '150px',
                height: '30px',
                border: '1px solid #CCC',
                borderRadius: '6px',
                padding: '5px 10px',
                margin: '10px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
            }
        }, MFt.$('bt_carregar'), {
            for: 'bt_file_json', // Vai fazer com que o elemento seja integrante do 'bt_file_json', de modo que se clicar nele, estara clicando no "bt_file_json"
        });
        labelFile.appendChild(this.iconUpload);
        MFt.criaElem('div', {
            innerText: 'Carregar Lista',
            style: {

            }
        }, labelFile);
        const bt_carregar = MFt.criaElem('input', {
            type: 'file',
            accept: 'application/json',
            id: 'bt_file_json',
            style: {
                width: '150px',
                height: '30px',
                margin: '10px 0 0 0',
                display: 'none',
            }
        }, MFt.$('bt_carregar'));
        bt_carregar.onchange = e=>{
            let reader = new FileReader();
            reader.onload = ev=>{
                let dados;
                try { dados = JSON.parse(ev.target.result);}
                catch(e){console.log('Erro no JSON');}
                if (dados && this.verificar_dados(dados)) {
                    this.selecionados = dados;
                    this.exibir_selecionados();
                    MFt.clear(bt_carregar.parentNode);
                }
                else {
                    alert('Arquivo Inválido');
                }
            };
            // reader.readAsArrayBuffer(inp.files[0]);
            reader.readAsText(bt_carregar.files[0]);
        };
    }

    req_sapiens(params) {
        return new Promise(rr=>{
            this.sapiens_route(params, dd=>{
                if (dd) rr(dd);
                else rr(false);
            });
        });
    }

    static todasConsultoriasPayload(termos, page=1) {
        if (termos === undefined) termos = 'CONSULTORIA';
        const js = {
            "action":"SapiensMain_Setor",
            "method":"getSetor",
            "data":[
                {
                    "fetch":[],
                    "filter":[
                        {
                            "property":"parent",
                            "value":"isNull"
                        }
                    ],
                    "query":termos,
                    "page":page,
                    "start":0,
                    "limit":500
                }
            ],
            "type":"rpc",
            "tid":10
        };
        return JSON.stringify(js);
    }

    async exibir_consultorias(id_unidade, nome_unidade, sel_elem) {
        sel_elem.disabled = true;
        const wrapper = MFt.$('consultorias');
        const consultorias = await this.super_get(this.request, this.get_setores(id_unidade), true);
        const do_check = (id, nome) => {
            const d1 = MFt.criaElem('div', {
                style: {
                    // maxWidth: '700px'
                }
            }, wrapper);
            const s1 = MFt.criaElem('span', null, d1);
            const check = MFt.criaElem('input', {
                type: 'checkbox',
                style: {
                    margin: '0 10px 0 0'
                }
            }, s1);
            const s2 = MFt.criaElem('span', {
                innerText: `${nome}`,
                style: {

                }
            }, s1);
            if (this.selecionados[id]) check.checked = true;
            check.onchange = ()=>{
                if (check.checked) {
                    if (!this.selecionados[id]) {
                        this.selecionados[id] = {nome: nome, unidade: nome_unidade};
                    }
                }
                else {
                    if (this.selecionados[id]) {
                        delete this.selecionados[id];
                    }
                }
                this.exibir_selecionados();
            }
        };
        sel_elem.disabled = false;
        MFt.clear(wrapper);
        MFt.atribs(wrapper, {
            style: {
                padding: '5px',
                margin: '10px 0',
                border: '1px solid #777',
                borderRadius: '6px',
                maxWidth: '900px',
                maxHeight: '600px',
                overflow: 'scroll'
            }
        });
        if (consultorias) consultorias.forEach(d=>{
            do_check(d.id, d.nome);
        });
        else do_check(id_unidade, nome_unidade);

    }

    exibir_selecionados() {
        const wrapper = MFt.$('selecionados');
        MFt.clear(wrapper);
        MFt.clear(MFt.$('bt_relatorio'));
        MFt.clear(MFt.$('bt_salvar'));
        MFt.atribs(wrapper, {
            style: {
                margin: '15px 0 0 0',
                padding: '15px 0 0 0',
                borderTop: '1px solid #999'
            }
        });
        const t1 = MFt.criaElem('table', null, wrapper);
        const criar_item = (obj, i)=>{
            let tr = MFt.criaElem('tr', null, t1);
            this.tds([
                (i+1).toString(),
                `${obj.unidade} - ${obj.nome}`
            ], MFt.criaElem('tr', null, t1));
        };
        let cc = 0;
        let sels = [];
        for(let i in this.selecionados) {
            if (this.selecionados[i].hasOwnProperty('nome') && this.selecionados[i].hasOwnProperty('unidade')) {
                sels.push({nome:this.selecionados[i].nome, unidade:this.selecionados[i].unidade});
            }
        }
        if (sels.length) {
            this.tds(['#', 'NOME'], MFt.criaElem('tr', null, t1));
            sels.forEach((d,i)=>criar_item(d, i));
            MFt.clear(MFt.$('bt_relatorio'));
            const bt_gerar = new MFt.bt({
                value: 'Gerar Relatórios',
                width: 200,
                height: 30,
                marginTop: '15px',
                wrapper: MFt.$('bt_relatorio'),
                callback: ()=>{
                    if (!this.mes_inicial || !this.mes_final) {
                        alert('Datas precisam ser preenchidas');
                        return;
                    }
                    if ((this.ano_final < this.ano_inicial) || (this.ano_final === this.ano_inicial && this.mes_final < this.mes_inicial)){
                        alert('Data final menor que a inicial');
                        return;
                    }
                    const idsSetores = (()=>{
                        let ret = [];
                        for(let i in this.selecionados) {
                            if (!Number.isInteger(parseInt(i))) {
                                alert('Erro com os IDs dos setores');
                                console.log(this.selecionados);
                                return;
                            }
                            ret.push(parseInt(i));
                        }
                        return ret;
                    })();
                    console.log('setor', idsSetores[0]);
                    console.log('mes_inicial', this.mes_inicial);
                    console.log('ano_inicial', this.ano_inicial);
                    console.log('mes_final', this.mes_final);
                    console.log('ano_final', this.ano_final);
                    console.log('indice', 0);
                    console.log('idsSetores', idsSetores);
                    const novaURL = `/relatorios/mensal_detalhado/index.html?indice=0&setor=${idsSetores[0]}&mes=${this.mes_inicial}&ano=${this.ano_inicial}&mes_final=${this.mes_final}&ano_final=${this.ano_final}&ids=${JSON.stringify(idsSetores)}`;
                    console.log(novaURL);
                    location.href = novaURL;
                }
            });
            const bt_salvar = new MFt.bt({
                value: 'Salvar Lista',
                width: 200,
                height: 30,
                marginTop: '15px',
                wrapper: MFt.$('bt_salvar'),
                callback: ()=>{
                    this.salvar();
                }
            });
        }
    }

    salvar() {
        const blob = new Blob([JSON.stringify(this.selecionados)], {type: 'text/json;charset=utf-8'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    carregar() {

    }

    verificar_dados(dd) {
        if (Object.prototype.toString.call(dd) !== '[object Object]') return false;
        let cc = 0;
        for(let i in dd) {
            if (dd.hasOwnProperty(i)) {
                cc++;
                let num;
                try{num=parseInt(i)}
                catch(e){console.log('Chave nao é número')}
                if (!num) return false;
                if (Object.prototype.toString.call(dd[i]) !== '[object Object]') return false;
                const chaves = Object.keys(dd[i]);
                if (chaves.length !== 2 || !dd[i].nome || !dd[i].unidade) return false;
            }
        }
        return !(!cc);
    }

    async obter_unidades_agu() {
        let unidades = [];
        let totalEntities = 1_000_000;
        let offsetRequest = 0;
        while (unidades.length < totalEntities) {
            const bloco = await this.super_get(this.request, this.get_buscar_unidade('', offsetRequest));
            if (Array.isArray(bloco?.entities) && Number.isInteger(bloco?.total)) {
                unidades = unidades.concat(bloco.entities);
                offsetRequest = unidades.length;
                totalEntities = bloco.total;
            }
            else {
                break;
            }
        }
        unidades.forEach((d, i)=>console.log(i, d));
        return unidades;
    }
}