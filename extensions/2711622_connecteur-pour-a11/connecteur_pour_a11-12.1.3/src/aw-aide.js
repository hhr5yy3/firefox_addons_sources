/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2024 Druide informatique inc. */

document.onreadystatechange = () => {
    if (document.body != null && !document.getElementById("antidote_connecteur")) {
        var undiv = document.createElement('div');
        undiv.setAttribute("id", "antidote_connecteur");
        undiv.setAttribute("style", "display: none;");
        document.body.appendChild(undiv);
    }
}
