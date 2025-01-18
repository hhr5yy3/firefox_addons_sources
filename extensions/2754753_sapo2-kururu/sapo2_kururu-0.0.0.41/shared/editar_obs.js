class EditarObservacao extends Payloads {
    constructor() {
        super();
    }

    async editar(tarefa) {
        return new Promise(rr=>{
            const alterar_obs = async texto => {
                const tarefa_editada = (()=>{
                    let o = {};
                    for(let c in tarefa) if (tarefa.hasOwnProperty(c)) o[c] = tarefa[c];
                    return o;
                })();
                tarefa_editada.observacao = texto;
                const xml = new RequestMF();
                const res = await this.super_get(xml, this.put_editar_tarefa(tarefa_editada));
                if (res?.id) {
                    tarefa.observacao = texto.toUpperCase();
                    return true;
                }
                return false;
            };
            const p1 = new PopUp(505, 130, null, null, async form=>{
                const label = 'OBS.:'
                const d1 = MFt.criaElem('div', {
                    style: {

                    }
                }, form.div);
                const d2 = MFt.criaElem('div', {
                    style: {
                        marginTop: '10px'
                    }
                }, form.div);
                const s1 = MFt.criaElem('span', {
                    innerText: label,
                    style: {

                    }
                }, d1);
                const i1 = MFt.criaElem('textarea', {
                    value: tarefa.observacao,
                    style: {
                        width: '500px',
                        height: '60px',
                        resize: 'none',
                        border: '1px solid rgb(240, 240, 196)',
                        background: 'rgb(255, 255, 211)',
                        outline: 'none'
                    }
                }, d1);
                i1.onkeydown = e=>{
                    if (e.key === 'Enter') {
                        e.preventDefault(e);
                        e.stopPropagation();
                    }
                }
                i1.oninput = ()=>{
                    if (i1.length > 255) alert('O máximo permitido é de 255 digitos.');
                };
                const salvar = new MFt.bt({
                    value: 'Salvar',
                    width: 80,
                    height: 30,
                    wrapper: d2,
                    callback: async ()=>{
                        MFt.clear(form.div);
                        MFt.criaElem('div', {
                            innerText: 'Atualizando...'
                        }, form.div);
                        const res = await alterar_obs(i1.value.substr(0,255));
                        MFt.criaElem('div', {
                            innerText: res ? 'Ok!' : 'Erro!',
                            style: {
                                color: res ? 'green' : 'red',
                                fontWeight: 'bold'
                            }
                        }, form.div);
                        await this.esperar(res ? 500 : 3000);
                        form.closeWindow(form);
                        rr(res);
                    }
                });
                const cancelar = new MFt.bt({
                    value: 'Cancelar',
                    width: 80,
                    height: 30,
                    marginLeft: '30px',
                    wrapper: d2,
                    callback: ()=>{
                        form.closeWindow(form);
                        rr(false);
                    }
                });
                i1.focus();
            });
            p1.iniciar(p1);
        });
    }
}
