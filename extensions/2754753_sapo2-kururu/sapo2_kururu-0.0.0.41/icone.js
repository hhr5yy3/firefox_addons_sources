let recarregar = false;

window.onload = ()=>{
    const d1 = MFt.criaElem('div', {
        innerText: 'Sem conexão com o "Super"',
        style: {
            color: 'red',
            fontWeight: 'bold',
            height: "20px"
        }
    }, document.body);
    const b1 = new MFt.bt({
        value: 'Iniciar Kururu',
        width: 150,
        height: 30,
        marginTop: '13px',
        disabled: true,
        wrapper: MFt.criaElem('div', {
            style: {
                textAlign: 'center'
            }
        }, document.body),
        callback: ()=>{
            window.open('tarefas2/tarefas2.html');
            close();
        }
    });

    const is_background_ativo = () => {
        return new Promise(rr=>{
            chrome.runtime.sendMessage('teste', res=>{
                rr(res);
            });
        });
    };

    const is_content_ativo = ()=>{
        return new Promise(rr=>{
            let atendido = false;
            setTimeout(()=>{
                if (!atendido) rr(false);
            }, 200);
            chrome.tabs.query({}, tabs=> { // Investigo se há alguma tab do Super aberta
                for(let t of tabs) {
                    if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                        chrome.tabs.sendMessage(t.id, 'give_me_token', {}, resp => {
                            if (resp?.token) {
                                atendido = true;
                                rr(resp);
                            }
                        });
                    }
                }
            });
        });
    };

    const check = setInterval(async ()=>{
        if (await is_background_ativo() && await is_content_ativo()) {
            MFt.clear(d1);
            b1.disabled = false;
            clearInterval(check);
        }
        else {
            d1.innerText = `RECARREGUE A PÁGINA DO SUPER`;
            d1.style.color = 'red';
        }
    }, 500);
};