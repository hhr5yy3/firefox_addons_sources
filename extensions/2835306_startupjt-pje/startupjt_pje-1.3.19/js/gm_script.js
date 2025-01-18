// ==UserScript==
// @name         PJeGestão
// @namespace    CSJT
// @version      0.1
// @description  Adiciona ícone para acesso ao PJe Gestão dentro do PJe
// @author       lmachado@trt13.jus.br
// @match        https://*.jus.br/pjekz/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

function addStyle (cssStr) {
    var D               = document;
    var newNode         = D.createElement ('style');
    newNode.textContent = cssStr;

    var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (newNode);
}

function adicionaBotaoPJeGestao(menuLateralSelector) {
    addStyle ( `
    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 100px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      padding: 4px 0px;

      /* Position the tooltip */
      position: absolute;
      z-index: 1;
      top: 0px;
      left: 185%;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
  `);

    const menuLateral = document.querySelectorAll(menuLateralSelector);

    const pjeGestaoButton = $(`
<pje-item-menu-lateral>
  <div class="tooltip"><!---->
    <a href="https://${window.location.host}/pjegestao/painel-pendencias" target="_blank"
      name="PJe Gestão" aria-label="PJe Gestão">
      <span>
        <i aria-hidden="true" class="icone-menu fa fa-tachometer-alt ng-star-inserted" style="font-size: 32px;color:#ff0000;"></i><!----><!---->
      </span>
      <span class="tooltiptext">PJe Gestão</span>
    </a><!---->
  </div><!---->
</pje-item-menu-lateral>`);

    if (menuLateral) {
        menuLateral[0].prepend(pjeGestaoButton[0]);
    }
}

function exibePendenciasGestao(oj, responsavel) {
    $.ajax({
        url: `https://${window.location.host}/pjegestaors/api/pendencias/agrupadas?oj=${oj}&responsavel=${responsavel}`
    })
        .done(function(data) {
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total = total + data[i].total;
            }
            if (total > 0) {
                // if (window.confirm(`Você possui ${total} pendência(s) no PJe Gestão. Clique em OK para acessar o sistema!`)) {
                //     window.open(`https://${window.location.host}/pjegestao/painel-pendencias`, '_blank');
                // };

                // Recupera a data da última vez que a mensagem foi mostrada do cookie
                console.log(document.cookie.replace(/(?:(?:^|.*;\s*)ultimaVez\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
                var ultimaVezMostrado = new Date(document.cookie.replace(/(?:(?:^|.*;\s*)ultimaVezEGestao\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

                console.log(ultimaVezMostrado);
                console.log(new Date().toDateString() !== ultimaVezMostrado.toDateString());
                // Se o cookie não existir ou se a data atual for diferente da data armazenada no cookie
                if (!ultimaVezMostrado || new Date().toDateString() !== ultimaVezMostrado.toDateString()) {
                    // Atualiza a data no cookie para a data atual
                    var dataMostrandoPendencias = new Date();
                    dataMostrandoPendencias.setHours(23, 59, 59, 999); // Define o cookie para expirar no final do dia
                    document.cookie = "ultimaVezEGestao=" + new Date().toUTCString() + "; expires=" + dataMostrandoPendencias.toUTCString();

                    if (window.confirm(`Você possui ${total} pendência(s) no PJe Gestão. Clique em OK para acessar o sistema!`)) {
                        window.open(`https://${window.location.host}/pjegestao/painel-pendencias`, '_blank');
                    }
                }
            }
        })
        .error(function (data) {
            console.error("Não foi possível recuperar pendências do PJe Gestão! ");
        });
}

function parseCookie(cookie) {
    const cookieSplit = cookie.split(";");
    let ret = {};
    for (let i = 0; i < cookieSplit.length; i++) {
        const cKey = decodeURIComponent(cookieSplit[i].trim().split("=")[0]);
        const cValue = decodeURIComponent(cookieSplit[i].trim().split("=")[1]);
        ret[cKey] = cValue;
    }
    return ret;
}

function decodeAccessToken() {
    let cookies = parseCookie(document.cookie);
    const accessToken = cookies.access_token;
    if (accessToken) {
        var base64Url = accessToken.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}

function main() {
    console.log('Começando o PJeCorrige');
    'use strict';
    const menuLateralSelector = "body > pje-root > mat-sidenav-container > mat-sidenav-content > div > pje-menu-lateral > nav";
    waitForKeyElements(menuLateralSelector, function() {

        try {

            let decodedAccessToken = decodeAccessToken();
            if (decodedAccessToken && decodedAccessToken.instancia === 1) {
                adicionaBotaoPJeGestao(menuLateralSelector);
                exibePendenciasGestao(decodedAccessToken.orgaoJulgador.id, decodedAccessToken.id);
            }
        } catch(err) {
            console.error(err.message);
        }
    }, true);
};
//
// main();
