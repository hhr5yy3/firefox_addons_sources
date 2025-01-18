/*
Este content.js vai ser incluído em toda página que comece com https://supersapiens.agu.gov.br
Este content.js vai apenas fornecer o token JWT que se encontra em localStorage()
O ponto principal está em quem chamar este content.js.
Porque só pode chamar este content.js quando a página estiver ultrapassado a parte do login
E todas as páginas após o login começam com https://supersapiens.agu.gov.br/app/*
É o que acontece com icone.js.
Verifique o manifest.json tem a seguinte configuração:
"content_scripts": [
    {
      "run_at": "document_idle",
      "matches": ["https://supersapiens.agu.gov.br/*"],
      "js": ["content.js"]
    }
],

Não posso colocar o "matches" para "https://supersapiens.agu.gov.br/app/*" porque após o login...
...não há redirecionamento de página, mas um history.pushState(), que não dispara o document_idle.
Daí só recarregando "https://supersapiens.agu.gov.br/app/*" a página para disparar o "document_idle".
 */
console.log('content.js -', new Date());
const navegador = MFt.navegador() === "firefox" ? browser : chrome;


const request_mf = (url, params, method='get')=>{
    return new Promise(rr=>{
        let pp = {
            url,
            callback: dd=>{
                if (dd?.ok === "ok" && dd?.dados) {
                    rr(dd.dados);
                }
                else if (dd?.erro) {
                    console.group("Erro informado pelo servidor");
                    console.log(dd.erro);
                    console.groupEnd();
                    rr(false);
                }
                else {
                    console.group("Erro nao especificado");
                    console.log(dd);
                    console.groupEnd();
                    rr(false);
                }
            },
            errorCallback: dd=>{
                console.group("ERRO na resposta:");
                console.log(dd);
                console.groupEnd();
                rr(false);
            }
        };
        pp[method] = params;
        MFt.xml(pp);
    });
}

let regex_monitor_editor = [
    // O monitoramento se a página é ou não página com o editor de textos extrai as strings do regex do servidor
    // Caso não seja possível extrair os dados de lá, são usados os abaixo como padrão
    "componente-digital/([0-9]+)/editor/ckeditor",
    "minhas-tarefas/entrada/tarefa/([0-9]+)/processo/([0-9]+)/visualizar/default/documento/([0-9]+)",
    "/tarefa/([0-9]+)/processo/([0-9]+)/"
];

// O nome da classe do elemento onde o botão vai ser inserido é obtido do servidor
// Caso não seja possível extrair a string de lá, a string abaixo é usada como padrão
let classe_elemento_botao_criar_tarefa = "documentos-vinculados mb-4 ng-tns-c[0-9]{3}-[0-9]{3}";

let timerMonitorEditor = undefined;

const formatarnup = n => {
    var tmp = n;
    var limpa = function (numero) {
        if (!numero?.length) {
            alert('Erro com o numero do NUP');
            return;
        }
        // Retira os caracteres "." "/" "-", mas deixa o dígito verificador da string
        let temp = '';
        for (let i = 0; i < numero.length; i++) if ((numero[i] >= '0') && (numero[i] <= '9')) temp += numero[i];
        return temp;
    };
    n = limpa(n);
    switch(n.length) {
        case 17:
            tmp = n.substr(0,5) + '.';
            tmp += n.substr(5, 6) + '/';
            tmp += n.substr(11, 4) + '-';
            tmp += n.substr(15, 2);
            break;
        case 15: // ex.: 10768.001156/86-05
            tmp = n.substr(0,5) + '.';
            tmp += n.substr(5, 6) + '/';
            tmp += n.substr(11, 2) + '-';
            tmp += n.substr(13, 2);
            break;
        default:
            tmp = n;
    }
    return tmp;
};

const esperarElemento = async classe=>{
    let partes = classe.split(' ');
    let baseClass = Array.isArray(partes) && partes.length ? partes[0] : undefined;
    return new Promise(rr=>{
        let interval = setInterval(()=>{
            if (!baseClass) rr(undefined);
            let elems = Array.from(document.body.getElementsByClassName(baseClass));
            // console.log(baseClass);
            // console.log(elems);
            const rx = new RegExp(classe);
            for(let a of elems) console.log(a.className);
            let elemento = elems.find(d=>rx.exec(d.className));
            // console.log(elemento);
            if (elemento instanceof HTMLElement) {
                clearInterval(interval);
                rr(elemento);
            }
        }, 1000);
    });
}

const incluirBotaoLancarAtividade = async ()=>{
    const id_bt = "bt_lancar_atividade_criar_tarefa";
    if (document.getElementById(id_bt)) return;
    let idTarefa = (()=>{
        const r0 = new RegExp('entrada/tarefa/([0-9]+)/processo/([0-9]+)');
        const r1 = new RegExp('/tarefa/([0-9]+)/');
        const res1 = r1.exec(location.href);
        // const r2 = new RegExp('/processo/([0-9]+)/');
        // const res2 = r2.exec(location.href);
        // if (Array.isArray(res)) return {idTarefa: parseInt(res[1]), idProcesso: parseInt(res[2])};
        if (Array.isArray(res1)) return parseInt(res1[1]);
        return undefined;
    })();
    if (!idTarefa) {
        console.log("%cID da Tarefa não encontrado", "color:red;");
        return;
    }
    // console.log(`ID Processo: ${idProcesso}, ID Tarefa: ${idTarefa}`);
    const payloads = new Payloads();
    const xml = new RequestMF();
    let tarefa = await payloads.super_get(xml, payloads.get_tarefa(idTarefa));
    console.log(tarefa);
    console.log("Esperando elemento HTML...");
    let elemento = await esperarElemento(classe_elemento_botao_criar_tarefa);
    console.group("Elemento HTML encontrado")
    console.log(elemento);
    const wrapper = elemento;
    console.groupEnd();
    let bt = new MFt.bt({
        value: 'Lançar atividade e Criar Tarefa',
        width: 250,
        height: 30,
        wrapper: MFt.criaElem('div', {style: {textAlign: 'center'}}, wrapper),
        callback: ()=>{
            let pai = {
                tarefas_selecionadas: ()=> {
                    return [tarefa];
                },
                open_quadro_opcoes: (height, titulo)=>{
                    const pop = new PopUp(1200, height, null, null, form=>{
                        form.div.innerText = 'Aguarde...';
                    });
                    pop.header = titulo;
                    pop.iniciar(pop);
                    pop.aceitaEsc = pop.clicafora_sair = true;
                    return pop;
                }
            };
            new LancarAtividade(pai, {
                msg: `Kururu - ${formatarnup(tarefa.processo.NUP)}`,
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 2px rgb(182,183,183)',
                    background: 'rgb(236,236,236)',
                    padding: '5px',
                    borderBottom: '1px solid #aaa'
                }
            });
        }
    });
    bt.bt.style.fontFamily = "Muli,Helvetica Neue,Arial,sans-serif";
    bt.bt.id = id_bt;
    console.log(bt);
};


const monitorEditor = async ()=>{
    // console.log('MONITOR EDITOR');
    for(let r of regex_monitor_editor) {
        const regex = new RegExp(r);
        const res = regex.exec(location.href);
        // console.log(res);
        // console.log(r);
        if (Array.isArray(res)) {
            clearInterval(timerMonitorEditor);
            // console.log('Monitor do Editor desativado');
            await incluirBotaoLancarAtividade();
        }
    }
};


if (navegador?.runtime) {
    navegador.runtime.sendMessage(null, {
        // O serviceworker (background.js) desativa depois de um tempo.
        // Enviar uma mensagem para ele parece ser necessário para reativá-lo. Não sei... ???
        // Não dá para confiar no onSendHeaders.addListener()
        from: 'content.js',
        subject: 'super_onload',
    });

    navegador.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
        console.log('Mensagem recebida em content.js:', msg);
        if (msg === 'give_me_token') {
            const token = localStorage.getItem('token');
            const expire = parseInt(localStorage.getItem('exp'));
            const profile = localStorage.getItem('userProfile');
            // console.log({
            //     token, expire, profile
            // });
            sendResponse({
                token, expire, profile
            });
        }
        else if (typeof msg === 'object') {
            switch (msg?.task) {
                case 'new_token':
                    const token = msg.token;
                    const expire = msg.expire;
                    if (token) localStorage.setItem('token', token);
                    if (expire) localStorage.setItem('exp', expire);
                    sendResponse(`content.js: Tarefa "${msg.task}" ok!`);
                    break;
                default:
                    sendResponse(`content.js: Tarefa "${msg.task}" desconhecida!`);
                    console.log('content.js: tarefa desconhecida');
                    console.log(msg);
            }
        }
    });

    setTimeout(async ()=>{
        // No content.js não se pode fazer um await global.
        // É o equivalente a fazer um await dentro de um constructor()
        // Por isso, criei este timeout
        let resp = await request_mf("https://manoelpaz.com/cgi-bin/agu/super/super", {
            task: "arquivo",
            arquivo: "configuracao_content.json",
        });
        if (Array.isArray(resp?.regex_monitor_editor)) {
            // O monitoramento se a página é ou não página com o editor de textos extrai as strings do regex do servidor
            regex_monitor_editor = resp.regex_monitor_editor;
            console.log(regex_monitor_editor);
        }
        if (resp?.classe_elemento_botao_criar_tarefa) {
            // O nome da classe do elemento onde o botão vai ser inserido é obtido do servidor
            classe_elemento_botao_criar_tarefa = resp.classe_elemento_botao_criar_tarefa;
        }
    }, 100);

    timerMonitorEditor = setInterval(async ()=>{
        if (regex_monitor_editor) await monitorEditor();
    }, 1000);

    // Inicializacao automatica do Kururu
    setTimeout(async ()=>{ // Precisei colocar em um timeout para poder utilizar o async
        const resp = await request_mf('https://manoelpaz.com/cgi-bin/agu/super/super', {
            task: 'obter_configuracoes_gerais'
        });
        const config = (()=>{
            if (!Array.isArray(resp)) return {};
            if (!resp.length) return {};
            let dados;
            try {
                dados = JSON.parse(resp[0]);
            } catch {}
            return dados || {};
        })();
        if (config?.inicio_automatico) {
            const inicio_automatico_interval = setInterval(()=>{
                if (location.href.startsWith('https://supersapiens.agu.gov.br/apps')) { // Verifico se o Super Sapiens entrou dentro do interval
                    const token = localStorage.getItem('token');
                    const expire = parseInt(localStorage.getItem('exp'));
                    const profile = localStorage.getItem('userProfile');
                    if (token && profile) { // Se existe token e profile, encerra o interval e envia uma mensagem para o background.js para ele abrir uma pagina
                        clearInterval(inicio_automatico_interval);
                        // O window.open nao funciona para abrir link nenhum
                        // Não fnuciona: window.open('/tarefas2/tarefas2.html');
                        // Também não adianta tentar usar o browser.tabs.query() ou o browser.tabs.create()
                        // Solução: usar o sendMessage para o background.js
                        navegador.runtime.sendMessage(null, {
                            // O serviceworker (background.js) desativa depois de um tempo no Chrome
                            // Enviar uma mensagem para ele parece ser necessário para reativá-lo. Não sei... ???
                            // Não dá para confiar no onSendHeaders.addListener()
                            from: 'content.js',
                            subject: 'abrir_tarefas',
                        });
                    }
                }
            }, 500);
        }
    }, 100);
}