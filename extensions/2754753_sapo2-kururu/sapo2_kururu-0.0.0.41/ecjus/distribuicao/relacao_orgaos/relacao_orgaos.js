window.onload = ()=>{
    new HeaderShow('Relação de Órgãos Assessorados', MFt.$('header'));
    new RelacaoOrgaos();
};



class RelacaoOrgaos extends Tudo {
    constructor() {
        super();
        this.wrapper = MFt.criaElem('div', null, MFt.$('corpo'));
        this.div_menu = MFt.criaElem('div', null, this.wrapper);
        this.div_res = MFt.criaElem('div', null, this.wrapper);
        this.import_icon = new Image();
        this.import_icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQElEQVRYCe1XTWgTQRTuJm0aNUYlIO3FH0igEkL+wYpgkVbsqVYUr4KHiqciHsRTURQvUjx4EHsQQYQGpKFgEER68CK1SSFGPITSiyQX04QeYmqS9XvTnWU6JG2yu3pyYHbmvZn3vW/fm52ZVXqEEo1Gh1RVvd9sNi9AfUgY6rSbs9lsT9Lp9EsYqJ0Y2fmkeDw+Wq/XP4OAHzon13fZHoX9xODgYH+xWPzYia1Ck7xeb7/L5frFDRRFSQJoDW1Hb6HZhWBzXsB4nMlk7kHeFaOXDNxu9xWEndkihNcQwnkmdPEIhUK3MF0nADJ3w+Fwz14kbOQDzi9pvhpwntD6phuNxCMAsUi3AmQEEOr92iCFa9eQtQIhHSLXaDW2FwlGoJVhtzq73f4JNtt5lIx3I2EZgeXl5Rz8vpN866JG4rKu0DqWESC81dXVCaTzObo/UDd5hY6lBySmoNtR2FewQ2NOaGLV35Qh8IUsQDeBelIeszQCMjiXeQS4LLb/hIDoUO7/J/BXIjAyMkKHWdvdT0yD5QSw4scqlUopEolcFR2161v2GeKte+H4AW04qD1Y+b52TkW9JQT8fr+rXC6/B/AZAfwwTsPjmszPml7SbW1tbeZyuRKNmU4BblHHHA7HOrBE53TC3kEk1rV6kZyhnCC5r6/vJ4iMksIUAeR5Eo7WAOohsG4KbF4gcg7DKcCbn200Gm+7cSrNPVCr1RQzERiSAA2JhgmsrKzMYaV/MOR124hdfAwTIAycfGO4Cd02QgLkn+Xz+ZrhNcCd4g45i/WQwmJMY2Ht43q0X1Azgsy7KpzPgzy7tpsmQKhIx/fx8fEjhUIhC5FtQIjMAsg95F7btaZSIIKmUqmaz+c7hbd7RXpEg25ErOCbfxMMBqvYpr9yHW/lCHR0gHBjuU0kEnT1uh4IBKY9Ho9OAGRcIEYHlEO24RGgfFGx0Z7OesYfajab3VhaWqoTxPDwMK2Lc9QHiTy1YmEEnE7nU02pYE8vxWKxsZmZGU5OnN9xn+yxU56uVqvfYHSQDEHgtQyghxx5mkOobsgTrJLhfBH/oJNamnRY/e8Yf7OLAwMDGxjhB4c+yYLOLP6Yp5LJ5G8Z6w90kCBD4e80VgAAAABJRU5ErkJggg==';
        this.lista_orgaos = [];
        this.init();
    }

    get url() {return 'https://manoelpaz.com/cgi-bin/ecjus_distribuicao/router.py'}

    async init() {
        this.div_res.innerText = 'Obtendo dados...';
        let nups = await this.request_mf(this.url, {task: 'relacao_orgaos'});
        let cod_orgaos = {};
        let cod_orgaos_sem_cju = {};
        this.div_res.innerText = 'Organizando...';
        for(let n of nups) {
            if (n[0] && !cod_orgaos[n[0].substr(0,5)]) {
                const cod = n[0].substr(0,5);
                if (n[1] && n[1].trim().search(/cju/gi) === 0) cod_orgaos[cod] = {cju:n[1].trim(), nup_exemplo:n[0].trim()};
            }
        }
        for(let n of nups) {
            if (n[0] && !cod_orgaos[n[0].substr(0,5)]) {
                const cod = n[0].substr(0,5);
                if (n[1]) cod_orgaos_sem_cju[cod] = {cju:n[1].trim(), nup_exemplo:n[0].trim()};
            }
        }
        // console.log(cod_orgaos_sem_cju);
        if (Object.keys(cod_orgaos_sem_cju).length === 0) {
            this.div_res.innerText = 'Todos os órgãos têm CJU';
        }
        else {
            for(let k of Object.keys(cod_orgaos_sem_cju)) {
                cod_orgaos[k] = {cju:null, nup_exemplo:cod_orgaos_sem_cju[k].nup_exemplo};
            }
        }
        // console.log(cod_orgaos);
        this.sincronizar(cod_orgaos);
    }

    async sincronizar(dados) {
        const ajustar_nome = n=>{
            let r = n.replace(/^\s*união\s*\-\s*/gi, '');
            r = r.replace(/^\s*uniao\s*\-\s*/gi, '');
            r = r.replace(/^\s*ministério da defesa\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/aeronautica\/\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/exército\/\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/mapa\/\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/ms\/\/dsei\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/dpf\/\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/ms\/\s*\-\s*/gi, '');
            r = r.replace(/^\s*mg\/mj\/dprf\/\s*\-\s*/gi, '');
            return r.trim();
        };
        this.div_res.innerText = 'Sincronizando dados';
        let dados_registrados = await this.request_mf(this.url, {task: 'obter_orgaos_contatos'}, 'get', false);
        const keys = Object.keys(dados);
        for(let i = 0; i < keys.length; i++) {
            this.div_res.innerText = `Sincronizando dados (${i+1}/${keys.length})`;
            if (!dados_registrados.find(d=>d.cod===keys[i])) {
                let pastaID;
                while (!pastaID) {
                    pastaID = await this.request_sapiens(new Payloads().getIdPastaPeloNUP(dados[keys[i]].nup_exemplo), false);
                }
                let dict = {
                    task: 'inserir_orgaos_contatos',
                    cod: keys[i],
                    cju: dados[keys[i]].cju,
                    nup_exemplo: dados[keys[i]].nup_exemplo
                };
                if (pastaID?.length && pastaID[0]?.interessados?.length && pastaID[0].interessados[0].pessoa.nome) dict.nome = ajustar_nome(pastaID[0].interessados[0].pessoa.nome);
                let res = await this.request_mf(this.url, dict, 'get', false);
            }
        }
        this.lista_orgaos = await this.request_mf(this.url, {task:'obter_orgaos_contatos'});
        this.exibir_menu();
        MFt.clear(this.div_res);
    }

    exibir_menu() {
        const itens = [
            {label: 'Exibir Pedido', action: ()=>{this.exibir_pedidos();}},
            {label: 'Exibir Formulários', action: ()=>{this.exibir_dados();}},
            {label: 'Exibir Tabela', action: ()=>{this.exibir_tabela();}},
        ];
        for(let i of itens) {
            let span_item = MFt.criaElem('span', {
                innerText: i.label,
                style: {
                    borderLeft: '1px solid #CCC',
                    borderRight: '1px solid #CCC',
                    padding: '5px 20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                }
            }, this.div_menu);
            span_item.onclick = ()=>{
                i.action();
            }
        }
    }

    exibir_dados() {
        MFt.clear(this.div_res);
        for(let o of this.lista_orgaos) {
            this.formulario(o, this.div_res);
        }
    }

    exibir_pedidos() {
        MFt.clear(this.div_res);
        let ultima_cju = '';
        let bloco;
        const fim = elem=>{
            MFt.criaElem('p', {innerHTML: '</br>'}, elem);
            MFt.criaElem('p', {innerText: 'Atenciosamente,'}, elem);
            MFt.criaElem('p', {innerText: 'Manoel Paz'}, elem);
            MFt.criaElem('p', {innerText: 'Coordenador da e-CJU/Engenharia'}, elem);
        }
        for(let o of this.lista_orgaos) {
            if (ultima_cju !== o.cju) {
                ultima_cju = o.cju;
                let copiar = this.import_icon.cloneNode();
                MFt.criaElem('div', null, this.div_res).appendChild(copiar);
                MFt.atribs(copiar, {
                    style: {
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                    }
                });
                if (bloco) {
                    fim(bloco);
                }
                bloco = MFt.criaElem('div', {
                    style: {
                        fontFamily: 'Arial',
                        fontSize: '14px',
                        padding: '20px 0',
                        borderBottom: '1px solid #ccc'
                    }
                }, this.div_res);
                ((bb)=>{
                    copiar.onclick = ()=>CopiarColarTexto.copiar(bb.innerHTML);
                })(bloco);
                MFt.criaElem('p', {
                    innerText: `Prezado(a) Consultor(a) da ${o.cju}`
                }, bloco);
                MFt.criaElem('p', {
                    innerHTML: 'Com a finalidade de atender demanda da Corregedoria-Geral da AGU, solicito de V. Exa. o obséquio de informar, <b>até o dia 19/07/2021</b>, o (1) o nome do titular, (2) o e-mail e (3) o telefone de contato de cada um dos órgãos abaixo elencados que são assessorados por essa Consultoria.'
                }, bloco);
                MFt.criaElem('p', {innerHTML: '</br>'}, bloco);
            }
            MFt.criaElem('p', {
                innerText: `-- ${o.nome}`
            }, bloco);
        }
        fim();
    }

    formulario(dd, elem) {
        const wp = MFt.criaElem('div', {
            style: {
                padding: '20px 0',
                borderBottom: '1px solid #333'
            }
        }, elem);
        const cod = this.campo_texto('CÓDIGO', dd.cod, wp, 70, true);
        const cju = this.campo_texto('CJU', dd.cju, wp, 80, !(!dd.cju));
        const nome = this.campo_texto('NOME DO ÓRGÃO', dd.nome, wp, 800);
        const titular = this.campo_texto('TITULAR', dd.titular_nome, wp, 600);
        const endereco = this.campo_texto('ENDEREÇO', dd.endereco, wp, 600);
        const telefone = this.campo_texto('TELEFONE', dd.telefone, wp, 600);
        const email = this.campo_texto('E-MAIL', dd.email, wp, 600);
        const nup = MFt.criaElem('a', {
            innerText: `NUP EXEMPLO: ${this.formatanup(dd.nup_exemplo)}`,
            href: `../../../tela_processo.html?nup=${dd.nup_exemplo}`,
            target: '_blank'
        }, MFt.criaElem('div', {
            style: {

            }
        }, wp));
        cod.onblur = cju.onblur = nome.onblur = titular.onblur = endereco.onblur = telefone.onblur = email.onblur = async e => {
            if (nome.value.trim().length > 256) {alert('Valor de nome do órgão excede'); return;}
            if (titular.value.trim().length > 256) {alert('Valor do titular do órgão excede'); return;}
            if (endereco.value.trim().length > 512) {alert('Valor do endereço do órgão excede'); return;}
            if (telefone.value.trim().length > 256) {alert('Valor do telefone do órgão excede'); return;}
            if (titular.value.trim().length > 100) {alert('Valor do e-mail do órgão excede'); return;}
            if (document.activeElement === e.target) {
                console.log('BLUR - Mesmo elemento');
                return;
            }
            console.log('Gravando...');
            cju.value = cju.value.trim().toUpperCase();
            if (cju.value.search(/cju\-[a-z]{2,3}/gi) !== 0) {
                alert('CJU inválida!');
                return;
            }
            try {
                let res = await this.request_mf(this.url, {
                    task: 'inserir_orgaos_contatos',
                    cod: cod.value,
                    cju: cju.value.trim().toUpperCase(),
                    nome: this.ascii_mf(nome.value.trim()),
                    titular_nome: this.ascii_mf(titular.value.trim()),
                    endereco: this.ascii_mf(endereco.value.trim()),
                    telefone: this.ascii_mf(telefone.value.trim()),
                    email: this.ascii_mf(email.value.trim()),
                    nup_exemplo: dd.nup_exemplo
                }, 'get', false);
            }
            catch (e) {

            }
            console.log('Gravado.');
        }
    }

    mesmo_nome(n1, n2) {
        let nome1 = this.ascii_mf(n1).toLowerCase();
        let nome2 = this.ascii_mf(n2).toLowerCase();
        const sn1 = nome1.match(/[0-9a-z]+/gi);
        const sn2 = nome2.match(/[0-9a-z]+/gi);
        for(let p of sn1) if (!sn2.find(d=>p===d)) return false;
        return true;
    }

    async exibir_tabela() {
        const num_procs = cod=>dists.filter(d=>d[0].indexOf(cod) === 0).length;
        MFt.clear(this.div_res);
        this.div_res.innerText = 'Aguarde...';
        let orgaos = await this.request_mf(this.url, {task: 'obter_orgaos_contatos'});
        let dists = await this.request_mf(this.url, {task: 'obter_todas_distribuicoes'});  // nup, cju, valor em inteiro
        this.div_res.innerText = 'Agrupando...';
        let contador = 0;
        let listados = [];
        for(let o of orgaos) {
            if (!o.nome || !o.cju) continue;
            const ja_listado = (()=>{
                for(let n of listados) if (this.mesmo_nome(o.nome, n.nome) && o.cju.toLowerCase() === n.cju.toLowerCase()) return n;
                return false;
            })();
            if (ja_listado) {
                ja_listado.codigos.push(o.cod);
                ja_listado.num_procs += num_procs(o.cod);
            }
            else {
                contador++;
                listados.push({
                    codigos: [o.cod],
                    num_procs: num_procs(o.cod),
                    cju: o.cju,
                    nome: o.nome,
                    titular_nome: o.titular_nome,
                    email: o.email,
                    endereco: o.endereco,
                    nup_exemplo: o.nup_exemplo,
                    rowid: o.rowid,
                    telefone: o.telefone,
                });
            }
        }
        MFt.clear(this.div_res);
        const t1 = MFt.criaElem('table', {
            style: {
                borderCollapse: 'collapse',
                margin: '30px 0 0 0'
            }
        }, this.div_res);
        contador = 0;
        let tds = this.tds(['#', 'CJU', 'ÓRGÃO', 'CONTATO/TITULAR', 'NUM. PROCESSOS', 'CÓDIGOS'], MFt.criaElem('tr', null, t1));
        MFt.atribs(tds,{
            style: {
                textAlign: 'center',
                fontWeight: 'bold'
            }
        });
        listados.sort((a,b)=>b.num_procs - a.num_procs);
        for(let l of listados) {
            tds = this.tds([
                `${++contador}`,
                `${l.cju}`,
                `${l.nome}`,
                '',
                `${l.num_procs}`,
                `${this.relacao_texto(l.codigos)}`
            ], MFt.criaElem('tr', null, t1));
            tds[0].style.textAlign = 'center';
            MFt.atribs(tds, {
                style: {
                    padding: '0 5px'
                }
            })
            const ct = tds[3];
            MFt.criaElem('p', {
                innerText: `${l.titular_nome || 'Não informado pela CJU'}`
            }, ct);
            MFt.criaElem('p', {
                innerText: `Telefone: ${l.telefone || 'Não informado pela CJU'}`
            }, ct);
            MFt.criaElem('p', {
                innerText: `E-mail: ${l.email || 'Não informado pela CJU'}`
            }, ct);
        }
        console.log(contador, orgaos.length);
    }
}