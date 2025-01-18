window.onload = ()=>{
    new Textos();
};


class Textos extends Tudo {
    constructor() {
        super();
        this.div = MFt.$('wrapper');
        this.icon_trash;
        this.icon_edit;
        this.load_images();
    }

    async load_images() {
        this.icon_trash = await this.load_image('../../images/trash.png');
        this.icon_edit = await this.load_image('../../images/edit-icon.png');
        this.icon_trash.width = 20;
        this.icon_edit.width = 20;
        this.categorias = [];
        this.init();
    }

    async init() {
        this.div.innerText = 'Aguarde...';
        this.categorias = await this.request({task:'obter_categorias_textos'});
        const rowid = MFt.urlArgs().id_cat;
        const nome = MFt.urlArgs().nome;
        if (rowid && nome) this.show_lista_textos({rowid, nome});
        else this.show_categorias();
        window.onpopstate = ()=>this.init();
    }

    show_categorias() {
        MFt.clear(this.div);
        MFt.clear(MFt.$('header'));
        new HeaderShow('Textos Jurídicos - Lista de Categorias', MFt.$('header'));
        const div_cats = MFt.criaElem('div', {
            style: {

            }
        });
        const tabela = MFt.criaElem('table')
        if (this.categorias.length === 0) {
            MFt.criaElem('div', {
                innerText: 'Não existem categorias registradas'
            }, this.div);
        }
        else {
            MFt.appendElems(this.div, [div_cats, tabela]);
        }
        this.categorias.forEach((d,i)=>{
            this.show_uma_categoria(i, d, div_cats);
        });
        const bt = new MFt.bt({
            value: 'Adicionar Categoria',
            width: 150,
            height: 30,
            marginTop: '30px',
            wrapper: MFt.criaElem('div', null, this.div),
            callback: ()=>{
                this.adicionar_categoria();
            }
        });
    }

    show_uma_categoria(i, cat, t1) {
        console.log(cat);
        const tr = MFt.criaElem('tr', {style:{cursor:'pointer'}}, t1);
        const tds = this.tds([
            (i+1).toString(),
            cat.nome,
            '',
            ''
        ], tr);
        const trash = this.icon_trash.cloneNode();
        const edit = this.icon_edit.cloneNode();
        tds[2].appendChild(trash);
        tds[3].appendChild(edit);
        trash.onclick = e=>{this.apagar_categoria(cat.rowid, cat.nome); e.stopPropagation();};
        edit.onclick = e=>{this.adicionar_categoria(cat.rowid, cat.nome, cat.obs); e.stopPropagation();};
        MFt.atribs(tds, {style: {padding: '2px 7px', border: 'none'}});
        tr.onmouseenter = ()=>{
            tr.style.backgroundColor = '#FF9';
        };
        tr.onmouseleave = ()=>{
            tr.style.backgroundColor = 'transparent';
        };
        tr.onclick = ()=>{
            console.log(cat);
            history.pushState(null, null, `?id_cat=${cat.rowid}&nome=${encodeURIComponent(cat.nome)}`);
            this.show_lista_textos(cat);
        };
    }

    request(params, tipo='get') {
        return new Promise(rr=>{
            let pp = {
                url: 'https://manoelpaz.com/cgi-bin/agu/sapiens/titulos_html/router.py',
                callback: dd=>{
                    if (dd?.ok) rr(dd.dados);
                    else rr(false);
                },
                errorCallback: dd=>{
                    console.log(dd);
                    rr(false);
                }
            };
            if (tipo === 'get') pp.get = params;
            else pp.post = params;
            MFt.xml(pp);
        });
    }

    adicionar_categoria(o_rowid, o_nome, o_obs) {
        const pop = new PopUp(500, 180, null, null, form=>{
            const nome = this.campo_texto('NOME DA CATEGORIA', o_nome ?? '', form.div);
            const obs = this.campo_texto('COMENTÁRIO', o_obs ?? '', form.div);
            nome.focus();
            const bt = new MFt.bt({
                value: 'Adicionar',
                width: 100,
                height: 30,
                wrapper: MFt.criaElem('div', null, form.div),
                marginTop: '20px',
                callback: async ()=>{
                    if (!nome.value.trim()) return;
                    form.div.innerText = 'Salvando...';
                    let res = await this.salvar_categoria(nome.value, obs.value, o_rowid);
                    if (res === 'ok') {
                        form.closeWindow(form);
                        location.reload();
                    }
                    else {
                        form.div.innerText = 'Erro ao salvar!';
                        let nada = await this.esperar(1500);
                        location.reload();
                    }
                    console.log(res);
                }
            });
        });
        pop.iniciar(pop);
        pop.aceitaEsc = true;
        pop.clicafora_sair = true;
    }

    async salvar_categoria(nome, obs, rowid) {
        let params = {
            task: 'salvar_categoria',
            nome: nome.trim(),
            obs: obs.trim()
        };
        if (rowid) params.id = rowid;
        return await this.request(params);
    }

    esperar(ms) {
        return new Promise(rr=>{
            setTimeout(()=>{
                rr();
            }, ms);
        });
    }

    async show_lista_textos(cat) {
        console.log(cat);
        MFt.clear(MFt.$('header'));
        new HeaderShow(`Textos Jurídicos - Categoria: ${cat.nome}`, MFt.$('header'));
        this.div.innerText = 'Aguarde...';
        const textos = await this.request({task:'obter_textos', id:cat.rowid});
        console.log(textos);
        MFt.clear(this.div);
        if (textos.length) {
            const t1 = MFt.criaElem('table', null, MFt.criaElem('div', null, this.div));
            const tds = this.tds([
                '#', 'NOME', 'ROWID', ''
            ], t1);
            MFt.atribs(tds, {style:{fontWeight: 'bold', padding: '5px 10px'}});
            textos.forEach((d, i)=>{
                this.show_um_texto(i, d, t1);
            });
        }
        else {
            MFt.criaElem('div', {
                innerText: 'Não existem textos registrados para esta categoria'
            }, this.div);
        }
        new MFt.bt({
            value: 'Criar Novo Texto',
            width: 200,
            height: 30,
            marginTop: '20px',
            wrapper: MFt.criaElem('div', null, this.div),
            callback: ()=>{
                this.editar_texto(cat.rowid);
            }
        });
        new MFt.bt({
            value: 'Importar de outra categoria',
            width: 200,
            height: 30,
            marginTop: '20px',
            wrapper: MFt.criaElem('div', null, this.div),
            callback: ()=>{
                this.importar_texto();
            }
        });
    }

    show_um_texto(i, t, tabela) {
        // console.log(t);
        const tr = MFt.criaElem('tr', {style:{cursor:'pointer'}}, tabela);
        let tds = this.tds([
            (i+1).toString(),
            t.nome,
            t.rowid.toString(),
            ''
        ], tr);
        const apagar = this.icon_trash.cloneNode();
        tds[3].appendChild(apagar);
        apagar.onclick = e=>{this.apagar_texto(t.rowid); e.stopPropagation();};
        MFt.atribs(tds, {style:{padding: '5px 10px'}});
        tr.onmouseenter = ()=>{tr.style.backgroundColor='#FF9';};
        tr.onmouseleave = ()=>{tr.style.backgroundColor='transparent';};
        tr.onclick = ()=>{
           this.editar_texto(t.id_categoria, t);
        };
    }

    editar_texto(id_cat, tt) {
        const pop = new PopUp(800, 650, null, null,  form=>{
            let texto = '';
            let nome = '';
            const wrapper = MFt.criaElem('div', null, form.div);
            if (tt?.nome && tt?.texto) {
                texto = tt.texto;
                nome = tt.nome;
            }
            const e_nome = this.campo_texto('TÍTULO', nome, wrapper, 750);
            const e_texto = this.campo_texto('TEXTO JURÍDICO', texto, wrapper, 750, false, true);
            MFt.atribs(e_texto, {
                style: {
                    height: '400px',
                    padding: '15px 10px',
                    textAlign: 'justify'
                }
            });
            e_nome.focus();
            new MFt.bt({
                value: 'Salvar',
                wrapper: MFt.criaElem('div', null, wrapper),
                width: 100,
                height: 30,
                callback: async ()=>{
                    if (!e_nome.value.trim() || !e_texto.value.trim()) {
                        alert('Necessário preencher todos os campos.');
                        return;
                    }
                    let pp = {
                        task: 'salvar_texto',
                        texto: e_texto.value.trim(),
                        nome: e_nome.value.trim(),
                        id_categoria: id_cat
                    };
                    if (tt?.rowid) pp.id = tt.rowid;
                    wrapper.style.display = 'none';
                    const msg = MFt.criaElem('div', {innerText:'Aguarde...'});
                    form.div.insertBefore(msg, wrapper);
                    let res = await this.request(pp, 'post');
                    if (res) {
                        msg.innerText = 'Salvo!';
                        await this.esperar(500);
                        location.reload();
                    }
                    else {
                        msg.innerText = 'Erro ao salvar!';
                        await this.esperar(1500);
                        msg.parentNode.removeChild(msg);
                        wrapper.style.display = '';
                    }
                }
            });
            MFt.criaElem('div', {
                innerText: 'Obs.1: Linhas iniciadas com "<p" ou "<h" são tratadas como HTML puro.',
                style: {
                    margin: '10px 0 0 0',

                }
            }, wrapper);
            MFt.criaElem('div', {
                innerText: 'Obs.2: Linhas iniciadas com "*" (sem aspas) que tenham texto adicional recebem o formato de citação - blockquote.',
                style: {
                    margin: '0 0 0 0',
                }
            }, wrapper);
            MFt.criaElem('div', {
                innerText: 'Obs.3: Linhas iniciadas com "*" (sem aspas) sem nenhum texto adicional são inseridas como linhas em branco.',
                style: {
                    margin: '0 0 0 0',
                }
            }, wrapper);
            MFt.criaElem('div', {
                innerText: 'Obs.4: A expressão "[*]" (sem aspas) no meio de um texto refere-se a nota de rodapé - footnote.',
                style: {
                    margin: '0 0 0 0',
                }
            }, wrapper);
            MFt.criaElem('div', {
                innerText: 'Obs.5: Linhas iniciadas com "[*]" (sem aspas) com texto adicional são colocadas como notas de rodapé - footnote.',
                style: {
                    margin: '0 0 0 0',
                }
            }, wrapper);
        });
        pop.iniciar(pop);
        pop.clicafora_sair = true;
        // pop.aceitaEsc = true;
    }

    async apagar_categoria(rowid, nome) {
        if (confirm(`Deseja realmente apagar a Categoria ${nome}?`)) {
            let res = await this.request({
                task: 'apagar_categoria',
                id: rowid
            });
            if (res) location.reload();
            else alert('Algo de errado...');
        }
    }

    editar_categoria(rowid, nome, obs) {

    }

    load_image(src) {
        return new Promise(rr=>{
            const a = new Image();
            a.onload = rr(a);
            a.src = src;
        });
    }

    async apagar_texto(id) {
        if (confirm('Confirma apagar?')) {
            let res = await this.request({
                task: 'apagar_texto',
                id
            });
            if (res) location.reload();
            else alert('Erro!');
        }
    }

    importar_texto() {
        const pp = new PopUp(650, 500, null, null, async form=>{
            let importar; // {titulo:'', texto:''}
            const cats = await this.request({task:'obter_categorias_textos'});
            const id_cat = parseInt(MFt.urlArgs().id_cat);
            const d1 = MFt.criaElem('div', {
                style: {
                    fontFamily: 'Arial'
                }
            }, form.div);
            const d2 = MFt.criaElem('div', {
                style: {
                    fontFamily: 'Arial'
                }
            }, form.div);
            const d3 = MFt.criaElem('div', {
                style: {
                    fontFamily: 'Arial',
                    height: '300px',
                    overflow: 'hidden scroll',
                    background: '#FFe',
                    padding: '10px',
                    textAlign: 'justify'
                }
            }, form.div);
            const d4 = MFt.criaElem('div', {}, form.div);
            const bt = new MFt.bt({
                value: 'Importar',
                width: 100,
                height: 30,
                wrapper: d4,
                marginTop: '10px',
                disabled: true,
                callback: async ()=>{
                    d1.style.display = d2.style.display = d3.style.display = d4.style.display = 'none';
                    const mensagem = MFt.criaElem('div', {
                        innerText: 'Salvando...'
                    }, form.div);
                    let dados = {
                        task: 'salvar_texto',
                        texto: importar.texto.trim(),
                        nome: importar.titulo.trim(),
                        id_categoria: id_cat
                    };
                    const res = await this.request(dados, 'post');
                    if (res) {location.reload(); pp.closeWindow(pp); return;}
                    mensagem.innerText = 'Erro!';
                    await this.esperar(2000);
                    mensagem.remove();
                    d1.style.display = d2.style.display = d3.style.display = d4.style.display = 'block';
                }
            });
            const dd = cats.map(d=>{return {value:d.rowid, nome:d.nome}}).filter(d=>d.value!==id_cat);
            const sel1 = this.criar_select('CATEGORIA', [{value:0, nome:'---'}].concat(dd), d1);
            let textos;
            sel1.onchange = async ()=>{
                if (sel1.selectedIndex === 0) return;
                MFt.clear(d2);
                sel1.disabled = true;
                textos = await this.request({task:'obter_textos', id:sel1[sel1.selectedIndex].value});
                sel1.disabled = false;
                const tt = textos.map(d=>{return{value:d.rowid, nome:d.nome}});
                const sel2 = this.criar_select('TEXTOS', [{value:0, nome:'---'}].concat(tt), d2);
                sel2.onchange = ()=>{
                    if (sel2.selectedIndex === 0) {d3.innerText = ''; bt.disabled=true; return;}
                    bt.disabled = false;
                    const texto = textos.filter(d=>d.rowid === parseInt(sel2[sel2.selectedIndex].value));
                    console.log(texto);
                    d3.innerText = texto[0].texto;
                    importar = {titulo:texto[0].nome, texto:texto[0].texto};
                };
            };
        });
        pp.iniciar(pp);
        pp.clicafora_sair = true;
        pp.aceitaEsc = true;
    }
}