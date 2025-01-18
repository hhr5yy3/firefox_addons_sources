class AdmissibilidadeControlador {
    constructor() {
        console.log("construindo AdmissibilidadeControlador");
        this.repositorio = new AdmissibilidadeRepositorio();
    }

    acrescentarBotaoAdmissibilidade(menuLateralSelector) {
        // Adicionar um botão na página
        const botaoAdmissibilidadeElement = document.createElement("button");
        this.acrescentarTratamentoClickBotaoAdmissibilidade(botaoAdmissibilidadeElement);
        this.configurarBotaoAdmissibilidade(botaoAdmissibilidadeElement);
        this.acrescentarBotaoAvaliacao(botaoAdmissibilidadeElement, menuLateralSelector);
        if (this.isNoSAO()) {
            this.acrescentarEstrelas(botaoAdmissibilidadeElement);
        }
        return botaoAdmissibilidadeElement;
    }

    acrescentarTratamentoClickBotaoAdmissibilidade(botaoAdmissibilidadeElement) {
        if (this.isNoPJe()) {
            botaoAdmissibilidadeElement.addEventListener("click", () => {
                this.repositorio.incrementarContadorAcesso();
                this.redirecionarParaSAO();
            });
        }
        if (this.isNoSAO()) {
            botaoAdmissibilidadeElement.addEventListener("click", () => {
            });
        }
    }

    acrescentarBotaoAvaliacao(botaoAdmissibilidadeElement, menuLateralSelector) {
        // <pje-item-menu-lateral _ngcontent-iqn-c319="" _nghost-iqn-c242="" class="ng-star-inserted"><div _ngcontent-iqn-c242="" class="container-item-menu ng-star-inserted"><!----><button _ngcontent-iqn-c242="" mat-button="" mattooltipposition="right" role="link" class="mat-focus-indicator mat-tooltip-trigger item-menu mat-button mat-button-base" accesskey="h" name="Meu Painel" aria-label="Meu Painel"><span class="mat-button-wrapper"><i _ngcontent-iqn-c242="" aria-hidden="true" class="icone-menu fa fa-user ng-star-inserted"></i><!----><!----></span><span matripple="" class="mat-ripple mat-button-ripple"></span><span class="mat-button-focus-overlay"></span></button><!----></div><!----></pje-item-menu-lateral>
        const elementItemMenuLateral = document.createElement('pje-item-menu-lateral');
        elementItemMenuLateral.className = 'ng-star-inserted';
        elementItemMenuLateral.appendChild(botaoAdmissibilidadeElement);

        const spanRippleElement = document.createElement("span");
        spanRippleElement.setAttribute("class", "mat-ripple mat-button-ripple");
        const spanButtonFocusElement = document.createElement("span");
        spanButtonFocusElement.setAttribute("class", "mat-button-focus-overlay");

        const spanElement = document.createElement("span");
        spanElement.setAttribute("class", "mat-button-wrapper");
        const iElement = document.createElement("i");
        // iElement.setAttribute("class", "icone-menu fa fa-check-square-o ng-star-inserted");
        iElement.setAttribute("class", "icone-menu fas fa-tasks fa-lg ng-star-inserted");
        iElement.setAttribute("style", "color: red; font-size: 32px;");
        iElement.setAttribute("arial-label", "Admissibilidade");
        iElement.setAttribute("alt", "Admissibilidade");
        iElement.setAttribute("title", "Admissibilidade");

        spanElement.appendChild(iElement);
        botaoAdmissibilidadeElement.appendChild(spanElement);
        botaoAdmissibilidadeElement.appendChild(spanRippleElement);
        botaoAdmissibilidadeElement.appendChild(spanButtonFocusElement);

        if (this.isNoPJe()) {
            const menuLateral = document.querySelectorAll(menuLateralSelector);
            if (menuLateral) {
                menuLateral[0].prepend(elementItemMenuLateral);
            }
        }

        if (this.isNoSAO()) {
            const elementoAInserirBotao = document.querySelector(this.definirClasseOndeInserirBotao());
            if (elementoAInserirBotao) {
                elementoAInserirBotao.appendChild(elementItemMenuLateral);
            }
        }
    }

    configurarBotaoAdmissibilidade(botaoAdmissibilidadeElement) {
        botaoAdmissibilidadeElement.setAttribute("class", "mat-focus-indicator mat-tooltip-trigger item-menu mat-button mat-button-base");
        botaoAdmissibilidadeElement.setAttribute("mat-button", "");
        botaoAdmissibilidadeElement.setAttribute("mattooltipposition", "right");
        botaoAdmissibilidadeElement.setAttribute("role", "link");
        botaoAdmissibilidadeElement.setAttribute("name", "PJe-Admissibilidade");
        botaoAdmissibilidadeElement.setAttribute("id", "btnPJe");
        botaoAdmissibilidadeElement.setAttribute("alt", "Admissibilidade");
        botaoAdmissibilidadeElement.setAttribute("aria-label", "PJe Admissibilidade");
        botaoAdmissibilidadeElement.setAttribute("accesskey", "undefined");
    }

    redirecionarParaSAO() {
        const dominioPje = window.location.hostname;
        // Abrir a URL
        setTimeout(() => {
            const novaAba = window.open(`https://${dominioPje}/pjeadmissibilidade/dashboard`, '_blank');
            // setTimeout(() => novaAba.location.reload(), 500);
        }, 100);
    }

    acrescentarEstrelas(botaoAdmissibilidadeElement) {
        const avaliacaoContainer = document.createElement("div");
        avaliacaoContainer.className = "avaliacao";
        botaoAdmissibilidadeElement.appendChild(avaliacaoContainer);

        const estrelas = [];

        for (let i = 1; i <= 5; i++) {
            const estrela = document.createElement("span");
            estrela.className = "star";
            estrela.setAttribute("data-value", i);
            estrela.innerText = "☆";

            estrela.addEventListener("mouseover", () => {
                updateStars(i);
            });

            estrela.addEventListener("mouseout", () => {
                updateStars(selectedValue);
            });

            estrela.addEventListener("click", () => {
                selectedValue = i;
                console.log("Classificação selecionada:", selectedValue);
                this.repositorio.contarAvaliacaoEstrelas(selectedValue);
            });

            estrelas.push(estrela);
            avaliacaoContainer.appendChild(estrela);
        }
        // Criação do input para as melhorias
        this.acrescentarInputSugestoes(avaliacaoContainer);

// Função para atualizar a exibição das estrelas ao passar o mouse sobre elas
        function updateStars(mouseOverValue) {
            estrelas.forEach((star, index) => {
                if (index < mouseOverValue) {
                    star.innerText = "★";
                } else {
                    star.innerText = "☆";
                }
            });
        }

        let selectedValue = 0;

        botaoAdmissibilidadeElement.addEventListener("mouseover", () => {
            avaliacaoContainer.style.display = "block";
        });

        botaoAdmissibilidadeElement.addEventListener("mouseout", () => {
            avaliacaoContainer.style.display = "none";
        });

    }

    acrescentarInputSugestoes(avaliacaoContainer) {
        if (this.isNoSAO()) {
            const br = document.createElement("br");
            avaliacaoContainer.appendChild(br);
            const inputMelhoriasElement = document.createElement("input");
            inputMelhoriasElement.type = "text";
            inputMelhoriasElement.placeholder = "Sugestões/elogios";
            inputMelhoriasElement.className = "input-melhorias";
            inputMelhoriasElement.style.width = "100px";
            inputMelhoriasElement.style.height = "39px";
            inputMelhoriasElement.classList.add("mat-input");

            const botaoEnviarElement = document.createElement("button");
            botaoEnviarElement.innerText = "Enviar";
            botaoEnviarElement.classList.add(...['mat-button', 'mat-raised-button']);
            botaoEnviarElement.addEventListener("click", (event) => {
                event.preventDefault();
                this.repositorio.enviarSugestao(inputMelhoriasElement.value);
                inputMelhoriasElement.value = "";
            });

            avaliacaoContainer.appendChild(inputMelhoriasElement);
            avaliacaoContainer.appendChild(botaoEnviarElement);
        }
    }

    definirClasseOndeInserirBotao() {
        console.log('está no pje ou admissibilidade?');
        if (this.isNoPJe()) {
            console.log('está no pje');
            return '.menu-lateral';
        } else if (this.isNoSAO()) {
            console.log('está em admissibilidade?');
            // TODO remover esse comentário e linha abaixo return '.titulo-consulta';
            return '.separador';
        }
    }

    isNoPJe() {
        const dominio = window.location.href;
        return dominio.includes('/pjekz');
    }

    isNoSAO() {
        console.log('testando se está no admissibilidade');
        const dominio = window.location.href;
        return dominio.includes('/pjeadmissibilidade/');
    }

    getNomeConsultaPorGrau() {
        const tokenJson = getTokenJson();
        if (tokenJson.instancia == 1) {
            return 'AD01';
        }
        return 'AD02';
    }

}
