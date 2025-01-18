let arrayQualis = new Array(9).fill(0);

let setTitle = new Set();

let mapYears = new Map();

let inputPtA1 = "<input type='number' id='ptA1' name='pt' class='pt' value='100' />";
let inputPtA2 = "<input type='number' id='ptA2' name='pt' class='pt' value='85' />";
let inputPtA3 = "<input type='number' id='ptA3' name='pt' class='pt' value='70' />";
let inputPtA4 = "<input type='number' id='ptA4' name='pt' class='pt' value='55' />";
let inputPtB1 = "<input type='number' id='ptB1' name='pt' class='pt' value='40' />";
let inputPtB2 = "<input type='number' id='ptB2' name='pt' class='pt' value='25' />";
let inputPtB3 = "<input type='number' id='ptB3' name='pt' class='pt' value='10' />";
let inputPtB4 = "<input type='number' id='ptB4' name='pt' class='pt' value='5' />";
let inputPtC  = "<input type='number' id='ptC'  name='pt' class='pt' value='1' />";
let inputTotalA1 = "<input type='text' id='ptTotalA1' name='subtotal' class='pt-subtotal' value='' disabled />";
let inputTotalA2 = "<input type='text' id='ptTotalA2' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalA3 = "<input type='text' id='ptTotalA3' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalA4 = "<input type='text' id='ptTotalA4' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalB1 = "<input type='text' id='ptTotalB1' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalB2 = "<input type='text' id='ptTotalB2' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalB3 = "<input type='text' id='ptTotalB3' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalB4 = "<input type='text' id='ptTotalB4' name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotalC  = "<input type='text' id='ptTotalC'  name='subtotal' class='pt-subtotal' value='' disabled/>";
let inputTotal = "<input type='text' id='ptTotal' class='pt-total' value='' disabled/>";

// The "journals" map is declared into qualisMap.js file.

function initApp() {
//    document.body.style.border = "5px solid blue";

    var divArticle = document.getElementById('artigos-completos').getElementsByClassName('artigo-completo');

    for (let i = 0; i < divArticle.length; i++) {
        var divArticleParsed = new DOMParser().parseFromString(divArticle[i].innerHTML, "text/html");
        
        var info = divArticleParsed.getElementsByClassName('citacoes');
        if (info.length === 0) {
           info = divArticleParsed.getElementsByClassName('citado');
        }
        var spans = divArticleParsed.getElementsByClassName('informacao-artigo');
        var year = spans[spans.length-1].innerHTML;
//        console.log(divArticle[i]);
        var issn = getIssn(info[0].getAttribute('cvuri'));
        var title = getTitle(info[0].getAttribute('cvuri'));
        if( (! setTitle.has(title)) && title != null ) {
            setTitle.add(title);
            var qualis = journals.get(issn);
//            console.log(divArticle[i].getElementsByClassName('layout-cell layout-cell-11'));
            divArticle[i].getElementsByClassName('layout-cell layout-cell-11')[0].insertAdjacentHTML("beforeend", "<b class='label-citacoes'>Qualis (ISSN: "+issn.replace(/.{4}/g, '$&-').slice(0, -1)+")<sub>2020</sub>: "+qualis+" </b>");
            score(qualis, year, 5);
        }
    }
    
}

function getIssn(uri) {
    var uriParams = new URLSearchParams(uri);
    var issn = uriParams.get('issn');
    
    return issn !== undefined ? issn : "undefined";
}
function getTitle(uri) {
    var uriParams = new URLSearchParams(uri);
    var title = uriParams.get('titulo');
    return title !== undefined ? title : "undefined";
}

function insertAfterEveryN(str, char, n) {
  const result = str.split('').reduce((accumulator, current, index) => {
    if (index % n === 1) {
      return accumulator + current + char;
    }

    return accumulator + current;
  }, '');

  return result;
}

//function getPaperYearPub(text) {
//    return text.data.substr(-6, 6).replace(".","").trim();
//}

function score(qualis, yearPub, lastYears) {
    const d = new Date();
    let yearNow = d.getFullYear();

    if (yearPub >= yearNow-lastYears) {
        qualis == "A1" ? arrayQualis[0]++ : null;
        qualis == "A2" ? arrayQualis[1]++ : null;
        qualis == "A3" ? arrayQualis[2]++ : null;
        qualis == "A4" ? arrayQualis[3]++ : null;
        qualis == "B1" ? arrayQualis[4]++ : null;
        qualis == "B2" ? arrayQualis[5]++ : null;
        qualis == "B3" ? arrayQualis[6]++ : null;
        qualis == "B4" ? arrayQualis[7]++ : null;
        qualis == "C"  ? arrayQualis[8]++ : null;
    }
    
}

function calcPointing() {
    let fieldsPt = document.getElementsByName("pt");
    let fieldsSubtotal = document.getElementsByName("subtotal");
    let fieldTotal = document.getElementById("ptTotal");
    let total = 0;
    let i = 0;

    fieldsPt.forEach(e => {
        let point = e.value * arrayQualis[i];
        fieldsSubtotal[i].value = point;
        total += point;
        i = i + 1;
    });

    if (fieldTotal != null) {
        fieldTotal.value = total;
    }
    
}

function tableScore() {
    var divArticleTitle = document.getElementsByClassName('artigo-completo');

    if (divArticleTitle.length > 0) {    
        var scoreTable = " <table>";
        scoreTable += "<tr><th>Qualis/ Pontuação</th><td>A1"+"<br/>"+inputPtA1+
            "</td><td>A2"+"<br/>"+inputPtA2+
            "</td><td>A3"+"<br/>"+inputPtA3+
            "</td><td>A4"+"<br/>"+inputPtA4+
            "</td><td>B1"+"<br/>"+inputPtB1+
            "</td><td>B2"+"<br/>"+inputPtB2+
            "</td><td>B3"+"<br/>"+inputPtB3+
            "</td><td>B4"+"<br/>"+inputPtB4+
            "</td><td>C&nbsp;"+"<br/>"+inputPtC+
            "</td></tr>";
        scoreTable += "<tr><th>Quantidade</th>"+
            "<td>"+arrayQualis[0]+"</td>"+"<td>"+arrayQualis[1]+"</td>"+"<td>"+arrayQualis[2]+"</td>"+"<td>"+arrayQualis[3]+"</td>";
        scoreTable += "<td>"+arrayQualis[4]+"</td>"+"<td>"+arrayQualis[5]+"</td>"+"<td>"+arrayQualis[6]+"</td>"+"<td>"+arrayQualis[7]+"</td>";
        scoreTable += "<td>"+arrayQualis[8]+"</td></tr>";

        scoreTable += "<tr><th>Pontuação</th>"+
            "<td>"+inputTotalA1+"</td>"+
            "<td>"+inputTotalA2+"</td>"+
            "<td>"+inputTotalA3+"</td>"+
            "<td>"+inputTotalA4+"</td>"+
            "<td>"+inputTotalB1+"</td>"+
            "<td>"+inputTotalB2+"</td>"+
            "<td>"+inputTotalB3+"</td>"+
            "<td>"+inputTotalB4+"</td>"+
            "<td>"+inputTotalC+"</td>"+
        "</tr>";

        scoreTable += "<tr><th>Total</th>"+
            "<td colspan='9' style='text-align:left'>"+inputTotal+"</td>"+
        "</tr>";

        scoreTable += " </table> ";
        
        var layoutScore = "<div class='artigo-completo'>";
        layoutScore += "<div class='layout-cell-6'><div class='sub_tit_form'>";
        layoutScore += "<a href='https://sucupira.capes.gov.br/sucupira/public/consultas/coleta/veiculoPublicacaoQualis/listaConsultaGeralPeriodicos.jsf' target='_blank'>";
        layoutScore += "<br/><br/>Qualis<sub>2020</sub> Sucupira nos últimos 5 anos:";
        layoutScore += "</a>";
        layoutScore += "<div>"+scoreTable+"</div>";
        layoutScore += "</div></div><div>";
        
        divArticleTitle[0].insertAdjacentHTML("beforebegin", layoutScore);
    }

}

function addBlurEvents() {
    let fieldsPt = document.getElementsByName("pt");
    fieldsPt.forEach(e => {
        e.addEventListener('blur', calcPointing);
        e.addEventListener('change', calcPointing);
    });
}

function loadingSucupiraData() {
    var divArticleTitle = document.getElementsByClassName('artigo-completo');
    divArticleTitle[0].insertAdjacentHTML("beforebegin", "<p id='loadingSucupira'>Carregando dados do Sucupira...</p>");
}

function callFunctions() {
    initApp();
    tableScore();
    calcPointing();
    addBlurEvents();
}

function loadAll() {
    if (document.readyState === "complete") {
        setTimeout(function() {
            initApp();
            tableScore();
            calcPointing();
            addBlurEvents();
        }, 5000);
    } else {
        setTimeout(function() {
            loadAll();
        }, 1000);
    }
}

loadAll();



//document.onreadystatechange = function () { 
//    if (document.readyState === "complete") {
//        setTimeout(function() {
//            initApp();
//            tableScore();
//            calcPointing();
//            addBlurEvents();
//        }, 5000);
//    }
//};



