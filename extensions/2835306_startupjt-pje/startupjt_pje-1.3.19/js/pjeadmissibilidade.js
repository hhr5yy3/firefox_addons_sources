console.log('Iniciando PJe-Admissibilidade e PJe-Gestão.');

const listaTRTsAdmissibilidade = ['trt13', 'trt7', 'trt20'];
const listaTRTsGestao = ['trt5', 'trt13', 'trt6', 'trt18', 'trt19'];
const paginasOndeInserirIcones = ['lista-processos', 'meu-painel'];
const paginaDetalheProcesso = 'detalhe';
const tarefasAInserirIcone = ['Triagem', 'Análise', 'Análise de Gabinete',  'Analisar despacho',
    'Assinar despacho', 'Analisar decisão', 'Assinar decisão', 'Minutar voto', 'Conclusão ao magistrado',
    'Análise de recurso interno', 'Remeter ao 2o Grau', 'Elaborar decisão', 'Aguardando prazo',
    'Cumprimento de Providências'];


const menuLateralSelector = "body > pje-root > mat-sidenav-container > mat-sidenav-content > div > pje-menu-lateral > nav";

let controlador = undefined;

let primeiroAcessoSAO = isPrimeiroAcessoSAO();

function isPrimeiroAcessoSAO() {
    const cookies = document.cookie.split("; ");
    const tokenSAO = cookies.find(cookie => cookie.startsWith('access_token_sao='));
    if (tokenSAO) {
        return false;
    }
    return true;
}

waitForKeyElements(menuLateralSelector, function (elements) {
    const url = window.location.href;

    // PJe-Admissibilidade
    if (listaTRTsAdmissibilidade.some(trt => window.location.href.includes(trt))) {
        controlador = new AdmissibilidadeControlador();
        controlador.acrescentarBotaoAdmissibilidade(menuLateralSelector);
        configurarObservadorPaginaInserirIcones();
    }

    // PJe-Gestão
    if (listaTRTsGestao.some(trt => window.location.href.includes(trt))) {
        main();
    }
});

//detalhes do processo
const menuLateralDetalhes = "body > pje-root > mat-sidenav-container > mat-sidenav-content > div > div > pje-historico";
waitForKeyElements(menuLateralDetalhes, function (elements) {
    const url = window.location.href;

    if (listaTRTsAdmissibilidade.some(trt => window.location.href.includes(trt)) && url.includes(paginaDetalheProcesso)) {
        controlador = new AdmissibilidadeControlador();
        acrescentarBotaoAdmissibilidadeDetalhesProcesso();
    }
});

const menuLateralSelectorAdmissibilidade = "body > pje-app-root > div > pje-app-execucao > div > div > execucao";
if (window.location.href.includes('pjeadmissibilidade')) {
    console.log('Iniciando PJe-Admissibilidade.');
    waitForKeyElements(menuLateralSelectorAdmissibilidade, function () {
        const url = window.location.href;
        console.log('Iniciou pjeadmissibilidade.');
        // PJe-Admissibilidade
        if (listaTRTsAdmissibilidade.some(trt => window.location.href.includes(trt))) {
            controlador = new AdmissibilidadeControlador();
            controlador.acrescentarBotaoAdmissibilidade(menuLateralSelectorAdmissibilidade);
        }
    });
}

function inserirIconesAdmissibilidade(linhasTabela, tarefasAInserirIcone, dominioPje, ehPaginaMeuPainel) {
    const NOME_CONSULTA = controlador.getNomeConsultaPorGrau();

    for (const tr of linhasTabela) {
        let nrProc = '';
        if (ehPaginaMeuPainel) {
            //página meu-painel
            // pegar os elementos filhos de tr que seja a.mat-tooltip-trigger.link.processo
            let elementoComNumeroProcesso = Array.from(tr.querySelectorAll('b')).find(child => child.innerText.includes('.5.'));
            if (elementoComNumeroProcesso) {
                nrProc = elementoComNumeroProcesso.innerText.split(' ')[1];
            }
        } else {
            // página lista-processos
            nrProc = tr.children[1].getElementsByTagName('pje-descricao-processo')[0].children[1].innerText;
        }

        const areaIconesAdmissibilidade = document.createElement('span');
        const linkConsultaAdmissibilidadeElement = document.createElement('a');
        linkConsultaAdmissibilidadeElement.href = `https://${dominioPje}/pjeadmissibilidade/execucao/SAO13-${NOME_CONSULTA}?SAO13-NUM_PROC_NULL=${nrProc}`;
        linkConsultaAdmissibilidadeElement.target = "_blank";
        linkConsultaAdmissibilidadeElement.innerHTML = '<i class="fas fa-tasks pje-admissibilidade" title="Admissibilidade" aria-label="Admissibilidade" style="color: rgb(245, 24, 0);"></i>';

        linkConsultaAdmissibilidadeElement.addEventListener('click', function(event) {
            event.preventDefault();
            configuraClickBotaoConsultaProcesso(linkConsultaAdmissibilidadeElement.href, dominioPje);
            // controlador.repositorio.incrementarContadorAcesso();
            // window.open(linkConsultaAdmissibilidadeElement.href);
        });

        const ajudaElement = document.createElement('a');
        ajudaElement.href = "https://sites.google.com/trt13.jus.br/pje-admissibilidade";
        ajudaElement.target = "_blank";
        ajudaElement.innerHTML = '<i class="fas fa-question" title="Ajuda Admissibilidade" aria-label="Ajuda Admissibilidade" style="color: rgb(245, 24, 0); margin-left: 3px;"></i>'

        const espacoElement = document.createTextNode("  "); // dois espaços

        areaIconesAdmissibilidade.appendChild(linkConsultaAdmissibilidadeElement);
        areaIconesAdmissibilidade.appendChild(espacoElement);
        areaIconesAdmissibilidade.appendChild(ajudaElement);
        tr.children[1].children[0].appendChild(areaIconesAdmissibilidade);
    }
}

function configurarObservadorPaginaInserirIcones() {

    const dominioPje = window.location.hostname;

    var observadorMudancaTabelaPJe = new MutationObserver(function (mutation) {
        const paginaAtual = window.location.href;
        // página detalhes do processo
        if (paginasOndeInserirIcones.some(pagina => paginaAtual.includes(pagina))) {
            if (mutation.length > 0)
                for (const mutationRecord of mutation) {
                    if (mutationRecord.target.tagName == 'TBODY') {
                        const linhasTabela = mutationRecord.target.children;
                        const todasLinhasProcessos = Array.from(linhasTabela);
                        const linhasProcessosComTarefa = Array.from(linhasTabela).filter(linha => {
                            const tarefa = Array.from(linha.querySelectorAll('span'))
                                .find(span => tarefasAInserirIcone.some(tarefa => span.textContent.toLowerCase()
                                    .includes(tarefa.toLowerCase())));
                            return tarefa;
                        });

                        let linhasTabelasAInserirIcones = linhasProcessosComTarefa;
                        // meu-painel -> processos do usuario logado
                        let ehPaginaMeuPainel = false;
                        if (paginaAtual.includes(paginasOndeInserirIcones[1])) {
                            linhasTabelasAInserirIcones = todasLinhasProcessos;
                            ehPaginaMeuPainel = true;
                        }

                        inserirIconesAdmissibilidade(linhasTabelasAInserirIcones, tarefasAInserirIcone, dominioPje, ehPaginaMeuPainel);
                        break;
                    }
                }
        }
    });

    observadorMudancaTabelaPJe.observe(document, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
}

function configuraClickBotaoConsultaProcesso(linkParaConsulta, dominioPje) {
    if (!primeiroAcessoSAO) {
        window.open(linkParaConsulta);
    } else {
        // Abre a URL para pegar o token
        let janelaParaPegarToken = window.open(`https://${dominioPje}/pjeadmissibilidade/execucao/SAO13-AD01`);
        setTimeout(function () {
            primeiroAcessoSAO = false;
            janelaParaPegarToken.location.href = linkParaConsulta;
        }, 400);
    }
}

function acrescentarBotaoAdmissibilidadeDetalhesProcesso() {
    const NOME_CONSULTA = controlador.getNomeConsultaPorGrau();
    const dominioPje = window.location.hostname;
    // Adicionar um botão na página
    const botaoAdmissibilidadeElement = document.createElement("button");
    botaoAdmissibilidadeElement.classList = 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base';
    botaoAdmissibilidadeElement.innerHTML = '<span class="mat-button-wrapper">' +
        '<i class="fas fa-tasks fa-lg icone-sozinho ng-star-inserted pje-admissibilidade" title="Admissibilidade" aria-label="Admissibilidade" style="color: rgb(245, 24, 0);"></i></span>';
    const nrProc = document.getElementsByTagName('pje-descricao-processo')[0].children[1].innerText;

    const linkParaConsulta = `https://${dominioPje}/pjeadmissibilidade/execucao/SAO13-${NOME_CONSULTA}?SAO13-NUM_PROC_NULL=${nrProc}`;

    botaoAdmissibilidadeElement.addEventListener('click', function(event) {
        controlador.repositorio.incrementarContadorAcesso();
        configuraClickBotaoConsultaProcesso(linkParaConsulta, dominioPje);
    });
    document.querySelector(".tl-favoritos-right").appendChild(botaoAdmissibilidadeElement);

    return botaoAdmissibilidadeElement;
}

function getTokenJson() {
    const token = getToken('access_token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getToken(nomeToken) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === nomeToken) {
            return value;
        }
    }
    return null;
}
