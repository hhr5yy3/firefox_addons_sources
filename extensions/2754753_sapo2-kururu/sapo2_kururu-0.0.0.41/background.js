console.log('background worker.js');
/**
 * No Firefox, "chrome" precisa ser substituído por "browser"
 */
browser.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    console.log(msg);
    if (msg.from === 'content.js') {
        switch (msg.subject) {
            case 'super_onload':
                // browser.tabs.query({}, tabs=>{ // Investigo se há alguma tab do Sapiens aberta
                //     for(let t of tabs) {
                //         if (['super sapo', 'kururu'].some(d=>d===t.title.trim().toLowerCase())) {
                //             // console.log(tabs[i]); // Só para ver o conteúdo de Tab
                //             // browser.tabs.sendMessage(t.id, {from:'background.js', subject:'fill_field', value:msg.value});
                //             // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
                //             browser.tabs.reload(t.id);
                //             break;
                //         }
                //     }
                // });
                break;
            case 'reset_auth':
                console.log('%c========================NÃO É MAIS POSSÍVEL RESETAR O AUTH', 'color:red;');
                break;
            case 'abrir_tarefas':
                browser.tabs.query({}, tabs=> { // Investigo se há alguma tab do Sapiens aberta
                    console.group('NOMES DAS ABAS');
                    for(let t of tabs) {
                        console.log(t);
                    }
                    console.groupEnd();
                    if (!tabs.some(d=>d.title.trim().toLowerCase() === 'tarefas - kururu')) {
                        browser.tabs.create({
                            active: true,
                            url: '/tarefas2/tarefas2.html'
                        });
                    }
                });
            default:
                console.log(`Mensagem recebida de ${msg.from}, mas não reconhecida.`);
        }
    }
    // ==========================================================================================
    else if (msg.from === 'pagina_inicial') {
        switch (msg.subject) {
            case 'reload_super':
                browser.tabs.query({}, tabs=>{ // Investigo se há alguma tab do Sapiens aberta
                    for(let t of tabs) {
                        if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                            // browser.tabs.sendMessage(t.id, {from:'background.js', subject:'fill_field', value:msg.value});
                            // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
                            browser.tabs.reload(t.id);
                            break;
                        }
                    }
                });
                break;
            case 'autenticacao_backend':
                const token_original = localStorage.getItem('token_original');
                if (token_original) browser.tabs.sendMessage(sender.tab.id, {from:'background.js', subject:'autenticacao_backend', auth:token_original});
                else browser.tabs.query({}, tabs=>{ // Investigo se há alguma tab do Sapiens aberta
                    for(let t of tabs) {
                        if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                            // browser.tabs.sendMessage(t.id, {from:'background.js', subject:'fill_field', value:msg.value});
                            // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
                            browser.tabs.reload(t.id);
                            break;
                        }
                    }
                });
                break;
            default:
                console.log(`Mensagem recebida de ${msg.from}, mas não reconhecida.`);
        }
    }
    else if (msg === 'teste') {
        sendResponse('ok');
    }
    else if (msg === 'give_me_token') {
        browser.tabs.query({}, tabs=>{ // Investigo se há alguma tab do Super aberta
            for(let t of tabs) {
                if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                    // console.log(`background.js - Mensagem enviada para o Super: "${msg}"`);
                    browser.tabs.sendMessage(t.id, 'give_me_token', {}, resp=>{
                        console.group('background.js - RESPOSTA RECEBIDA DA PAGINA DO SUPER');
                        console.log(resp);
                        console.groupEnd();
                        console.group('background.js - TAB DO SUPER');
                        console.log(t);
                        console.groupEnd();
                        if (!resp) {
                            console.log('background.js recarregando página do "super"...');
                            browser.tabs.reload(t.id);
                        }
                        const dados = {
                            from: 'background.js',
                            task: 'take_the_token',
                            token: resp?.token || '',
                            expire: resp?.expire || '',
                            profile: resp?.profile || ''
                        };
                        console.log(sender);
                        if (sender?.tab) {
                            console.log('background.js - sender.tab existe');
                            console.log(sender.tab);
                            try {
                                browser.tabs.sendMessage(sender.tab.id, dados);
                            }
                            catch (e) {
                                console.log('ERRO - browser.tabs.sendMessage(sender.tab.id, dados);');
                                console.log(e);
                            }
                        }
                        else {
                            // A pequena página que se abre quando se clica no ícone da extensão não tem tab.id como numero
                            browser.tabs.query({}, tabs=> { // Investigo se há alguma tab do Super aberta
                                for(let t of tabs) {
                                    console.log(t);
                                }
                                browser.tabs.sendMessage(sender.id, dados);
                            });
                        }
                    });
                    // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
                    // browser.tabs.reload(t.id);
                    break;
                }
            }
        });
        sendResponse('background.js: Mensagem enviada ao content.js - Obtendo dados...');
    }
    else if (typeof msg === 'object') {
        switch (msg?.task) {
            case 'new_token':
                for(let t of tabs) {
                    if (t.url.startsWith('https://supersapiens.agu.gov.br/apps')) {
                        // console.log(`background.js - Mensagem enviada para o Super: "${msg}"`);
                        browser.tabs.sendMessage(t.id, msg, {}, resp=>{

                        });
                        // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
                        // browser.tabs.reload(t.id);
                        break;
                    }
                }
                break;
            default:
                console.log('background.js: tarefa desconhecida');
                console.log(msg);
        }
    }
});

// browser.webNavigation.onCompleted.addListener(() => {
//     console.info("The user has loaded my favorite website!");
// }, {
//     url: [
//         {
//             urlMatches: 'https://supersapiens.agu.gov.br/apps/painel',
//         },
//     ],
// });
//

/**
 * No Firefox, "browser" precisa ser substituído por "browser"
 */
// browser.webRequest.onSendHeaders.addListener(
//     d=>{
//         const sites = [
//             'https://supersapiensbackend.agu.gov.br',
//             'https://supersapiens.agu.gov.br'
//         ]
//         if (sites.filter(f=>d?.url.startsWith(f))) {
//             if (d?.requestHeaders?.length) {
//                 const tmp = d.requestHeaders.filter(d=>d.name.toLowerCase()==='authorization');
//                 if (tmp?.length) {
//                     if (tmp[0]?.value?.length > 300) { // Tem o JWT de 287 + "Bearer " caracteres que nao sei para que serve
//                         // Sempre que detectar o envio de um JWT envio uma mensagem para pagina_inicial.js para atualizar o localStorage token_original
//                         // O profile do Super tem um JWT que não é o mesmo da autenticação. E não sei pra que serve.
//                         // O único JWT que serve tem mais de 192 caracteres.
//                         const token_original = tmp[0].value;
//                         browser.tabs.query({}, tabs => { // Investigo se há alguma tab do Kururu aberta
//                             let kururu = false;
//                             for (let t of tabs) {
//                                 // console.log(t.title);
//                                 if (['super sapo', 'kururu'].some(d=>d===t.title.trim().toLowerCase())) {
//                                     kururu = true;
//                                     // browser.tabs.update(t.id, {highlighted: true}); // ativar a aba
//                                     // browser.tabs.reload(t.id); // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/reload
//                                     browser.tabs.sendMessage(t.id, {from:'background.js', subject:'token_original', auth:token_original});
//                                     break;
//                                 }
//                             }
//                             // if (!kururu) browser.tabs.create({url: `pagina_inicial.html`}); // nao abro nova aba porque ela deve ser aberta pelo usuario no icone
//                         });
//                     }
//                 }
//             }
//         }
//         else {
//             console.log(`%c${d?.url}`, 'color:blue;');
//         }
//     },
//     {urls: ["https://*.agu.gov.br/*"]},
//     ["requestHeaders"]
// );



