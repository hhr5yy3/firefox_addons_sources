class ExibirTarefas extends Payloads {
    constructor() {
        super();
        this.fontFamily = 'Arial Narrow';
    }

    iniciar() {
        return this.obter_tarefa();
    }

    obter_tarefa() {
        return new Promise(rr=>{
            const item = (tarefa, wrapper, form)=>{
                const print = (texto, img)=>{
                    const d1 = MFt.criaElem('div', {

                    }, form.div);
                    if (img instanceof Image) {
                        d1.appendChild(img);
                        img.style.margin = '0 5px 0 0';
                    }
                    MFt.criaElem('span', {
                        innerText: texto
                    }, d1);
                }
                const pack = MFt.criaElem('div', {
                    style: {
                        padding: '5px',
                        margin: '2px 0',
                        borderRadius: '4px',
                        transition: '0.3s',
                        cursor: 'pointer',
                        border: '1px solid #FFF'
                    }
                }, wrapper);
                const d1 = MFt.criaElem('div', {

                }, pack);
                const d2 = MFt.criaElem('div', {

                }, pack);
                const s1 = MFt.criaElem('span', {
                    innerText: `${this.formatanup(tarefa.processo.NUP)}, ${tarefa.especieTarefa.nome.substr(0, 50)}${tarefa.especieTarefa.nome.length > 50 ? '...':''}`,
                }, d1);
                const s2 = MFt.criaElem('span', {
                    innerText: `${tarefa.processo.titulo.substr(0,200)}`,
                    style: {
                        color: '#7f7f7f',
                        margin: '0 0 0 20px'
                    }
                }, d2);
                pack.onmouseenter = ()=>{
                    pack.style.background = '#FFA';
                    pack.style.border = '1px solid #333';
                }
                pack.onmouseleave = ()=>{
                    pack.style.background = '#FFF';
                    pack.style.border = '1px solid #FFF';
                }
                pack.onclick = ()=>{
                    form.closeWindow(form);
                    rr(tarefa);
                }
            };
            const pop = new PopUp(600, 400, null, null, async form=>{
                MFt.atribs(form.div, {
                    style: {
                        fontSize: '15px'
                    }
                });
                if (this.fontFamily) form.div.style.fontFamily = this.fontFamily;
                form.div.innerText = 'Aguarde...';
                const xml = new RequestMF();
                const tarefas = await this.super_get(xml, this.get_tarefas(this.profile.id), true);
                MFt.clear(form.div);
                const wrapper = MFt.criaElem('div', {
                    style: {
                        display: 'grid',
                        gridTemplateRows: '20px auto',
                        height: '100%'
                    }
                }, form.div);
                const d2 = MFt.criaElem('div', {
                    innerText: 'Selecione a tarefa:',
                    style: {
                        fontWeight: 'bold'
                    }
                }, wrapper);
                const d3 = MFt.criaElem('div', {
                    style: {
                        //height: '300px',
                        overflowX: 'hidden',
                        overflowY: 'auto'
                    }
                }, wrapper);
                for(let t of tarefas) {
                    item(t, d3, form);
                }
            });
            pop.aceitaEsc = pop.clicafora_sair = true;
            pop.iniciar(pop);
        });
    }
}