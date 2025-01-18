const isDebug = true;

function debug(isDebug, toDisplay) {
    if (isDebug)
        console.log(toDisplay);
}

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {

    //Accès au manifest
    var manifestData = chrome.runtime.getManifest();
    debug(isDebug, "Version de l'extension : " + manifestData.version);
    debug(isDebug, data);
    // VARIABLES
    var logo = "https://admin.opence.fr/partenaires/img/logo_extension.png";
    var couleur_bandeau = "#3F3F3F";
    var couleur_button_bandeau = "#ed3a7e";

    var url = window.location.href;
    var activation_extension = url.indexOf('extension');
    if (activation_extension !== -1) {
        createCookie("CCE", "1", 1);
    }
    if (typeof data !== "boolean") {
        var is_a_cookie = lireCookie("CCE");
        var come_with_link = lireCookie("display_modal");
        debug(isDebug, "Is a cookie : " + is_a_cookie);
        if (is_a_cookie == null && come_with_link == null) {
            /////////////////////////////////////////////////////////////////////////////////// Script jQuery
            debug(isDebug, "on prépare le bandeau car il n'y a pas de cookie et on ne vient pas d'un site opence ou du site actuel");
            var html = document.getElementsByTagName('head')[0].outerHTML;
            var position = html.indexOf("jquery");
            if (position === -1) {
                debug(isDebug, "On intègre jquery car il n'est pas présent sur cette page");
                /*var jquery = document.createElement('script');
                jquery.src = "https://code.jquery.com/jquery-2.0.3.js";
                jquery.integrity = "sha256-lCf+LfUffUxr81+W0ZFpcU0LQyuZ3Bj0F2DQNCxTgSI=";
                jquery.crossOrigin = "anonymous";
                document.getElementsByTagName('head')[0].append(jquery);*/
            }
            /////////////////////////////////////////////////////////////////////////////////// Création elements
            debug(isDebug, "On va créer les élement du bandeau");
            var img = document.createElement('img');
            var button = document.createElement('button');
            var exit = document.createElement('span');

            var bandeau = document.createElement('div');
            var zone_bouton_voir = document.createElement('div');
            var bandeau_blanc = document.createElement('div');
            ////////////////////////////////////////////////////////////////////////////////////// Exit button
            exit.classList.add('extension_exit');
            exit.style.right = 0;
            exit.style.top = "5px";

            exit.style.position = "absolute";
            exit.style.position += "!important";
            exit.style.font = "italic small-caps bold 12px/2";
            exit.style.borderRadius = "4px";
            exit.style.border = "2px solid #fff";
            exit.classList.add('exit');
            exit.style.color = "#fff";
            exit.style.padding = "0px 8px"
            exit.style.marginRight = "15px";
            exit.style.marginTop = "13px";
            exit.style.textAlign = "right";
            exit.className = "exit_span";
            exit.style.fontSize = "16px";
            exit.style.cursor = "pointer";
            exit.innerText = "X";
            //////////////////////////////////////////////////////////////////////////////////// VOIR Bannière Bouton
            button.type = "button";
            button.className = "btn_go";
            button.style.bottom = "5px";
            button.textContent = "VOIR";
            button.style.padding = "0";
            button.style.boxShadow = "unset";
            button.style.width = "80px";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5px";
            button.style.border = "2px solid #ed3a7e";
            button.style.background = couleur_button_bandeau;
            button.style.color = "#fff";
            button.style.font = "bold 12px Verdana";
            button.style.cssFloat = "unset";
            button.style.height = "34px";
            button.style.marginTop = "3px";
            ////////////////////////////////////////////////////////////////////////////////////// Zone VOIR Bouton
            zone_bouton_voir.style.textAlign = "center";
            zone_bouton_voir.style.width = "100%";
            zone_bouton_voir.appendChild(button);
            //////////////////////////////////////////////////////////////////////////////////// Logo CCE
            img.src = logo;
            img.style.width = "75px";
            img.style.height = "70px";
            img.style.marginLeft = "15px";
            img.style.marginBottom = "45px";
            img.style.top = "2px";
            img.style.left = "0px";
            img.style.position = "absolute";
            img.style.zIndex = "1";
            img.style.borderRadius = "200px";
            //////////////////////////////////////////////////////////////////////////////////// Bandeau DOM
            bandeau.classList.add('extension1');
            var detection = "";
            detection = "Offre détectée : " + data['titre'] + " ";
            debug(isDebug, "La detection de l'offre = " + detection);
            if (data['achat_solidaire'] == 1) {
                debug(isDebug, "On est dans le cas d'un achat solidaire");
                bandeau.textContent = "Faites grimper la cagnotte des achats solidaires, ça ne vous coûte qu’un seul clic !";
            } else if (data['pertinence'] == "1") {
                debug(isDebug, "On est sur de la pertinence 1");
                if (data['reduction'].length === 0) {
                    debug(isDebug, "Il n'y a pas de valeur de réduction disponible dans le tableau");
                    bandeau.textContent = "Profitez immédiatement d'une remise CCE chez ce partenaire !";
                } else {
                    debug(isDebug, "Il y a une valeur de réduction disponible dans le tableau");
                    if (data['reduction'].includes('jusqu')) {
                        debug(isDebug, "On a detecté le mot clé jusqu dans la valeur réduction");
                        bandeau.textContent = "Profitez immédiatement d'une réduction " + data['reduction'] + " de remise grâce à votre CE !";
                    } else {
                        debug(isDebug, "On n'a pas détecté le mot clé jusqu dans la valeur réduction");
                        if (data['reduction'].includes('prix')) {
                            debug(isDebug, "On a detecté le mot clé prix dans la valeur réduction");
                            bandeau.textContent = "Profitez immédiatement d'un " + data['reduction'];
                        } else {
                            debug(isDebug, "On n'a pas détecté le mot clé prix dans la valeur reduction");
                            if (data['reduction'].includes('cumulable')) {
                                debug(isDebug, "On a détecté le mot clé cumulable dans la valeur réduction");
                                bandeau.textContent = "Profitez immédiatement d'une remise de " + data['reduction'] + " grâce à votre CE ! ";
                            } else {
                                debug(isDebug, "On n'a pas détecte le mot clé cumulable dans la veleur réduction");
                                bandeau.textContent = "Profitez immédiatement de " + data['reduction'] + " de remise grâce à votre CE !";

                            }
                        }
                    }
                }
            } else {
                if (data['pertinence'] == "2" || data['pertinence'] == "3") {
                    debug(isDebug, "On a une pertinence de : " + data["pertinence"]);
                    detection = "Offre détectée : " + data['titre'] + " ";
                    debug(isDebug, "Detection = " + detection);
                    if (data['reduction'].length === 0) {
                        debug(isDebug, "Il n'y a pas de valeur de réduction disponible dans le tableau");
                        bandeau.textContent = "Nous avons peut-être détecté une remise CCE valable chez ce partenaire";
                    } else {
                        debug(isDebug, "Il y a une valeur de réduction disponible dans le tableau");
                        if (data['reduction'].includes('jusqu')) {
                            debug(isDebug, "On a detecté le mot clé jusqu dans la valeur réduction");
                            bandeau.textContent = "Nous avons peut-être détecté une remise CCE allant " + data['reduction'] + " valable chez ce partenaire";
                        } else {
                            debug(isDebug, "On n'a pas détecté le mot clé jusqu dans la valeur réduction");
                            bandeau.textContent = "Nous avons peut-être détecté une remise CCE de " + data['reduction'] + " valable chez ce partenaire";
                        }
                    }
                    button.textContent = "VOIR";
                    button.style.height = "34px";
                }
            }
            debug(isDebug, "Le text présent dans le bandeau = " + bandeau.textContent);
            bandeau_blanc.classList.add('extension_background_blanc');

            bandeau_blanc.style.height = "";
            bandeau_blanc.style.zIndex = 10000001;
            bandeau_blanc.style.top = "0px";
            bandeau_blanc.style.lineHeight = "30px";
            bandeau_blanc.style.background = "#ffffff";
            bandeau_blanc.style.width = '100%';
            bandeau_blanc.style.display = 'block';
            bandeau_blanc.style.position = "fixed";
            bandeau_blanc.style.height = '75px';
            bandeau.style.textAlign = "center";

            bandeau.style.position = "fixed";
            bandeau.style.zIndex = 10000002;
            bandeau.style.textTransform = "none";
            bandeau.style.top = "0px";
            bandeau.style.lineHeight = "30px";
            bandeau.style.background = couleur_bandeau;
            bandeau.style.width = '100%';
            bandeau.style.display = 'block';
            bandeau.style.height = '75px';
            bandeau.style.opacity = "0.99";
            bandeau.style.fontSize = "16px";
            bandeau.style.textAlign = "center";
            bandeau.style.fontFamily = "'Source Sans Pro' , sans-serif";
            bandeau.style.color = "white";
            bandeau.style.fontWeight = "normal";
            bandeau.style.wordSpacing = "normal";
            bandeau.style.letterSpacing = "normal";

            var http_referer = null;
            var actual_location = null;
            var urlParams = null;

            debug(isDebug, window.location.search);
            debug(isDebug, document.referrer);
            debug(isDebug, window.location.href);

            if(window.location.search != null && window.location.search != "")
                urlParams = new URLSearchParams(window.location.search);

            if (document.referrer != null && document.referrer != "")
                http_referer = new URL(document.referrer);
            debug(isDebug, "Le http referer = " + http_referer);

            if (window.location.href != null && window.location.href != "")
                actual_location = new URL(window.location.href);
            debug(isDebug, "L'url actuelle = " + actual_location);

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", "https://application.opence.fr/extension/have_activated_on_url?url_non_formatee=" + encodeURIComponent(http_referer), false); // false for synchronous request
            xmlHttp.send(null);
            var haveActivate = xmlHttp.responseText;
            if (haveActivate == "true")
                return;

            if ((urlParams == null || !urlParams.has('from_cce')) &&
                (http_referer == null ||
                    (actual_location != null &&
                        !http_referer.host.includes("opence.fr") &&
                        !http_referer.host.includes("couleurce.fr") &&
                        !http_referer.host.includes("couleurce.com") &&
                        !http_referer.host.includes("couleur.fr") &&
                        !http_referer.host.includes(actual_location.host) &&
                        !actual_location.host.includes("couleur.") &&
                        !actual_location.host.includes("cce.") &&
                        !actual_location.host.includes("couleurce") &&
                        !actual_location.host.includes("opence") &&
                        !actual_location.host.includes("couleur-ce")
                ))) {
                //////////////////////////////////////////////////////////////////////////////////// ADD TO DOM
                debug(isDebug, "L'http refer ne comporte pas opence.fr dedans ni ne comporte l'url actuelle");
                bandeau.appendChild(img);
                bandeau.appendChild(exit);
                exit.onclick = function () {
                    createCookie("CCE", "1", 1);
                    onClick_exit(bandeau, bandeau_blanc)
                };
                button.onclick = function () {
                    onClick_go(data, detection);
                };

                img.onclick = function () {
                    onClick_goCCE()
                };
                bandeau.appendChild(zone_bouton_voir);
                document.getElementsByTagName('body')[0].prepend(bandeau);
                document.getElementsByTagName('body')[0].prepend(bandeau_blanc);
                var exit_button = document.getElementsByClassName('exit_span');
                exit_button.clientHeight = "50px";
                exit_button.clientWidth = "50px";
                if (typeof data['notification'] !== 'undefined' && data['notification'].length > 0) {
                    debug(isDebug, "la valeur notification dans le tableau est défini et sa longueur est supérieure à 0");
                    create_notification(bandeau, data);
                }
            }
        }
    }
});

async function haveAlreadyActivateOnThisUrl(url) {
    return await fetch("https://application.opence.fr/extension/have_activated_on_url?url_non_formatee=" + encodeURIComponent(url), { mode: 'no-cors'});
}

debug(isDebug, "On est dans le fichier background.js");

function onClick_exit(bandeau,bandeau_blanc) {
    debug(isDebug, "on est dans la fonction onClick_exit");
    bandeau.style.display = "none";
    bandeau_blanc.style.display = "none";
}
function onClick_exit_more(bandeau) {
    debug(isDebug, "on est dans la fonction onClick_exit_more");
    bandeau.style.display = "none";
}

function onClick_go(data , detection) {

   var visible = document.getElementById('modal_popup');
    debug(isDebug, "on est dans la fonction onClick_go");
   if(visible == null) {
       debug(isDebug, "Il n'y avait pas de modal_popup");
       var extension = document.getElementsByClassName('extension1')[0];
       var container = document.createElement('div');
       var header = document.createElement('div');
       var span = document.createElement('span');
       var body = document.createElement('div');
       var footer = document.createElement('div');

       container.classList.add('modal_content');
       container.setAttribute("id", 'modal_popup');
       header.classList.add('modal_header');
       span.classList.add('modal_close');
       body.classList.add('modal_body');
       footer.classList.add('modal_footer');
       span.style.border = "2px solid #fff";
       span.className = "exit_more";
       span.style.float = "right";
       span.style.display = "inline-block";
       span.style.display = "table-cell";
       span.style.fontSize = "15px";
       span.style.borderRadius = "4px";
       span.innerText = "X";
       span.style.padding = "0px 8px";
       span.style.cursor = "pointer";
       span.style.color = "white";

       //////////////////////////////////////////////// Container
       body.style.minHeight = "121px";
       body.style.fontSize = "16px";
       body.style.fontWeight = "normal";
       body.style.letterSpacing = "normal";
       body.style.wordSpacing = "normal";
       body.style.textAlign = "center";
       container.style.position = "fixed";
       container.style.backgroundColor = "#fefefe";
       container.style.margin = "auto";
       container.style.left = "0";
       container.style.right = "0";
       container.style.padding = "0";
       container.style.width = "490px";
       container.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)";
       container.style.marginTop = "80px";
       container.style.zIndex = "10000100"; //10000001
       //////////////////////////////////////////////// Footer
       footer.style.padding = "2px 16px";
       footer.style.backgroundColor = "#3f3f3f";
       footer.style.color = "white";
       footer.style.height = "38px";

       footer.style.fontFamily = "'Source Sans Pro' , sans-serif";
       //////////////////////////////////////////////// Body
       body.style.padding = "12px 16px";
       body.style.textTransform = "none";

       var modalite = data['modalite'].toString();
       data['modalite'] = modalite.replace("ci-dessus","ci-dessous");

       if (detection.length > 0) {
           debug(isDebug, "On as une détection avec une longueur supérieur à 0");
           body.innerHTML += "<div style='width: 100%;margin-bottom: 10px;'><strong><b>" + detection + "</b></strong></div>";
       }
       if (data['pass'] == 1) {
           debug(isDebug, "on a dans le tableau pass == 1");
           body.innerHTML += data['modalite'].replace('PASS Avantages', 'PASS AVANTAGES (à télécharger sur le site internet du CE , offre ' + data['titre'] + ', onglet "Pièce à fournir)"');
       } else {
           debug(isDebug, "on n'a pas dans le tableau de pass == 1");
           if (data['commande'] == 1 || data['lien'].toString().indexOf("http://reducce.fr") != -1 || data['lien'] == "http://") {
               debug(isDebug, "on as dans le tableau commande == 1, ou  le lien qui contient l'adresse de reducce ou le lien qui contient http://");
               body.innerHTML += '<div style=\'width: 100%;margin-top: 30px; font-family: Source Sans Pro, sans-serif; \'>Pour profiter de cette remise , vous devez effectuer votre commande sur le site du CE !</div>';
           } else {
               debug(isDebug, "On a dans le tableau commande != 1 et le lien en contient ni l'adresse de reducce ni http://");
               body.innerHTML += "<div style='width: 100%; '>" + data['modalite'] + "</div>";
           }
       }

       if (data['lien'] != "http://") {
           debug(isDebug, "le lien contient http://");
           //if (data['lien'].indexOf("http://www.reducce.fr") != 0 && detection.length <= 0 && data['commande'] != 1 || data['pass'] == 1) {
           if (data['lien'].indexOf("http://www.reducce.fr") != 0 && data['commande'] != 1 || data['pass'] == 1) {
               debug(isDebug, "le lien ne contient pas l'adresse du site de reducce et commande != 1 ou il y a dans le tableau pass == 1");
               body.innerHTML += "<div style='width: 100%'><button class='go_part' style='cursor: pointer; background-color: #ED3B76; float:inherit; height: inherit; font-size: 16px!important; margin-bottom: 10px; padding-bottom: 4px; color:#ffffff; border-radius : 4px; margin-top: 25px; margin-bottom: 25px; border: 2px solid #ED3B76;color:#ffffff;padding: 8px; font-family: \"Source Sans Pro\", sans-serif'>Accéder au partenaire</button></div>"
           }
       }

       if ((data['modalite'].length > 300 || data['descriptif'].length > 300) && body.textContent.length > 300) {
           debug(isDebug, "la valeur modalite dans le tableau est supérieur à 300 ou la valeur descriptif dans le tableau est supérieur à 300 le tout avec un body de longeur supérieur à 300");
           body.style.overflowY = "scroll";
       }

       body.style.fontFamily = "'Source Sans Pro' , sans-serif";
       body.style.color = "black";
       /////////////////////////////////////////////// Header
       header.style.padding = "7px 16px";
       header.style.backgroundColor = "#3f3f3f";
       header.style.color = "white!important";
       header.style.textAlign = "center";
       header.style.fontSize = "16px";
       header.innerHTML = "<label class='label_extension_more' style='color:white!important; text-transform:none;letter-spacing: normal;font-weight: normal; font-size: 16px; float: inherit;display: inherit;text-decoration: none; font-family: Source Sans Pro, sans-serif'>&nbsp;</label>";
       header.style.fontFamily = "'Source Sans Pro' , sans-serif";
       /////////////////////////////////////////////// Span
       span.onclick = function () {
           onClick_exit_more(container);
       };
       container.append(body);
       header.prepend(span);
       container.prepend(header);
       container.append(footer);
       extension.after(container);

       var button_part = document.getElementsByClassName('go_part')[0];

       if(button_part !== undefined) {
           debug(isDebug, "Si le bouton est différent de undefined");
           button_part.onclick = function () {
               //window.location.href = data['lien'];
               createCookie("display_modal", "false", 1);
               window.open(data['lien'], '_blank');
           }
       }

       var button_exit_more = document.getElementsByClassName('exit_more')[0];
       button_exit_more.style.float = "right";
       button_exit_more.style.display = "table-cell";
       button_exit_more.style.fontSize = "15px";
       button_exit_more.style.cursor = "pointer";
       button_exit_more.style.color = "white";
   }else{
       debug(isDebug, "Il y a modal_popup");
       visible.style.display = "block";
   }
}

function onClick_goCCE() {
    debug(isDebug, "On est dans la fonction onClick_goCCE");
    window.open('https://www.couleurce.com');
}

function create_notification(bandeau , notification) {
    debug(isDebug, "On est dans la fonction create_notification");
    debug(isDebug, "create_notification");
    debug(isDebug, notification);
    var extension = document.getElementsByClassName('extension1')[0];
    var container = document.createElement('div');
    var header = document.createElement('div');
    var span = document.createElement('span');
    var body = document.createElement('div');
    var footer = document.createElement('div');

    container.classList.add('modal_content');
    header.classList.add('modal_header');

    body.classList.add('modal_body');
    footer.classList.add('modal_footer');

    header.style.padding = "7px 16px";
    header.style.backgroundColor = "#489BDA";
    header.style.color = "white!important";
    header.style.textAlign = "center";
    header.style.fontSize = "16px";
    header.innerHTML = "<label class='label_extension_more'>Une nouvelle notification !</label>";
    header.style.fontFamily = "'Source Sans Pro' , sans-serif";

    body.innerHTML = notification['notification'][0]['libelle'];
    body.style.fontFamily = "'Source Sans Pro' , sans-serif";
    body.style.color = "black";
    body.style.textAlign = "center";
    body.style.fontSize = "16px";

    container.style.position = "absolute";
    container.style.backgroundColor = "#fefefe";
    container.style.margin = "auto";
    container.style.left = "0";
    container.style.right = "0";
    container.style.padding = "0";
    container.style.width = "490px";
    container.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)";
    container.style.marginTop = "50px";
    container.style.right = "37%";

    footer.style.padding = "12px 16px";
    footer.style.backgroundColor = "#489BDA";
    footer.style.color = "white";
    footer.innerHTML = "<button class='go_part' style='background-color: #FF9900; border-color: #eea236'>J'ai compris</button>";
    footer.style.fontFamily = "'Source Sans Pro' , sans-serif";
    footer.onclick = function() {onClick_exit_more(container);};

    container.append(body);
    container.prepend(header);
    container.append(footer);

    extension.after(container);
}


// Cookies

function createCookie(nom , valeur , jours)
{
    debug(isDebug, "On est dans la fonction createCookie");
    // Le nombre de jour spécifié
    if(jours) {
        debug(isDebug, "on a la variable jour = " + jours);
        var date = new Date();
        //Converti le nombre de jours en millisecondes
        date.setTime(date.getTime()+(jours*24*60*60*1000));
        var expire = "; expires="+date.toUTCString();
        expire = expire.replace('GMT' , 'UTC');
    } else {
        debug(isDebug, "la variable jour n'est pas défini ou = 0");
        var expire = "";
    }
    var test = nom+"="+valeur+expire+"; path=/";
    document.cookie = nom+"="+valeur+expire+"; path=/";
}

function lireCookie(nom) {
    debug(isDebug, "On est dans la fonction lireCookie");
    // On ajoute le signe égale virgule au nom pour la recherche
    var nom2 = nom + "=";
    // Array contenant tous les cookies
    var arrCookies = document.cookie.split(';');
    // On cherche le cookie dans l'array
    debug(isDebug, "On va parcourir les cookies");
    for(var i = 0 ; i < arrCookies.length; i++) {
        var a = arrCookies[i];
        // Suppression de l'espace
        while(a.charAt(0) == ' ') {
            a  = a.substring(1 , a.length);
        }
        if(a.indexOf(nom2) == 0) {
            debug(isDebug, "on a trouve le cookie qu'on voulait on exit donc la fonction en le retournant");
            return a.substring(nom2.length, a.length);
        }

    }
    // Sinon aucun cookie trouvé
    return null;
}

function supprimerCookie(nom , valeur)
{
    debug(isDebug, "On est dans la fonction supprimer cookie");
    // Suppression d'un cookie
    createCookie(nom , valeur , -1);
}

