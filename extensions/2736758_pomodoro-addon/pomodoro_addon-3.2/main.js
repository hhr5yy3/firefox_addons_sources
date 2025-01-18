 /**
 * On écoute les clics sur les boutons et on envoie
 * un message approprié au script de contenu dans la page
 */
    alarmKey = "PomodoroAlarm";
    pomodoroBlock = document.querySelector("#content1");
    optionBlock = document.querySelector("#content2");
    creditsBlock = document.querySelector("#content3");
    helpBlock = document.querySelector("#content4");
    pomodoroInput = document.querySelector("input[name='pomodoro-time']");
    breakInput = document.querySelector("input[name='break-time']");
    volumeInput = document.querySelector("#volume");
    alarmInput = document.querySelector("#alarm");
    translateInput = document.querySelector("#langue");
    sessionMaxInput = document.querySelector("input[name='pomodoro-session']");
    autoStartInput = document.querySelector("#autoStart");

    
   sessionShow = document.querySelector("#session-done");
   sessionMaxShow = document.querySelector("#session-total");
   pomodoroNotif = "pomodoro-notif";
   timerHorloge = document.querySelector("#timer");
   showChrono = document.querySelector("#show-chrono");
   sessionPosition = document.querySelector("#cycle-part");
   timerContent = document.querySelector("#timer-content");
   tooltiptextPlay = document.querySelector("#play-tooltip");

   let alarmAudio = document.createElement('audio');

   var browser = browser || chrome
// 
sessionMaxShow.textContent = localStorage.getItem("sessionMax");
sessionShow.textContent = localStorage.getItem("sessionCount");
darkTheme = localStorage.getItem("dark");

// var discoverTitle = document.querySelector("#discover-title");
// var discoverDesc = document.querySelector("#discover-desc");
// var discoverImg = document.querySelector("#discover-image");
// var discoverContent = document.querySelector("#discover-content");
// var discoverLink = document.querySelector("#discover-title-link");

// var nextBtn = document.querySelector("#suivant-discover");
// var prevBtn = document.querySelector("#precedent-discover");
var pomodoroBtn = document.querySelector("#pomodoro-btn");
var optionsBtn = document.querySelector("#option-btn");
var creditBtn = document.querySelector("#credit-btn");
var helpBtn = document.querySelector("#help-btn");
// var bgImage = document.querySelector("#discover-content");
var durationWork = document.querySelector("#duration-work");
var durationBreak = document.querySelector("#duration-break");

function updateStorage() {
    durationBreak.textContent = localStorage.getItem("dureeSmallBreak");
    durationWork.textContent = localStorage.getItem("dureePomodoro");
    sessionMax = localStorage.getItem("sessionMax");
    sessionMaxShow.textContent = localStorage.getItem("sessionMax");
    pomodoroInput.value = localStorage.getItem("dureePomodoro");
    breakInput.value = localStorage.getItem("dureeSmallBreak");
    alarmInput.value = localStorage.getItem("alarmSong");
    volumeInput.value = localStorage.getItem("volume");
    timerEnCours = localStorage.getItem("timerEnCours");
    autoStartInput.value = localStorage.getItem("StartNextCycleAuto")
    // console.log("updatestorage > timerEnCours"+timerEnCours);
    
    sessionCount = localStorage.getItem("sessionCount");
    countAlarm = localStorage.getItem("countAlarm");
    minPomo = localStorage.getItem("dureePomodoro");
    minPause = localStorage.getItem("dureeSmallBreak");
    secPomo = 0;
    secPause = 0;
    min =  localStorage.getItem("min");
    sec =  localStorage.getItem("sec");
    t = localStorage.getItem("t");
    pomodoroBtn.classList.contains("active") ? null : pomodoroBtn.classList.add("active");
    // console.log("updatestorage > min "+min);
    // console.log("updatestorage > sec "+sec);
    if ( localStorage.getItem("timerEnCours") === "false") {
        // showChrono.textContent = pomodoroInput.value+":0";
        if(Number(sessionShow.textContent) >= Number(sessionMaxShow.textContent)){
            
            min = pomodoroInput.value;
            sec = 0;
            // sessionCount = 0;
            sessionShow.textContent = sessionCount;
            localStorage.setItem("min", min);
            localStorage.setItem("sec", sec);
            localStorage.setItem("sessionCount", sessionCount);
            showChrono.textContent = getNumberInTwoPos(pomodoroInput.value)+":00";
        }else {
            if(min !== null){
                showChrono.textContent = getNumberInTwoPos(min)+":"+getNumberInTwoPos(sec);
                // console.log( "updatestorage elseif > min "+min);
                // console.log("updatestorage elseif > sec "+sec);
                if(countAlarm % 2 == 0){
                    !timerContent.classList.contains("break-color") ? timerContent.classList.add("break-color") : null;
                    sessionPosition.textContent = "Break Time";
                    timerContent.classList.contains("pomodoro-color") ? sessionPosition.classList.remove("pomodoro-color") : null ;
                }
                else{
                    !timerContent.classList.contains("pomodoro-color") ? timerContent.classList.add("pomodoro-color") : null;
                    sessionPosition.textContent !="pomodori" ? sessionPosition.textContent ="pomodori" : null;
                    timerContent.classList.contains("break-color") ? timerContent.classList.remove("break-color") : null ;
                } 
            }else{
                if(localStorage.getItem("min") == null)
                    showChrono.textContent = getNumberInTwoPos(pomodoroInput.value)+":00";
                else
                    showChrono.textContent = getNumberInTwoPos(localStorage.getItem("min"))+":"+getNumberInTwoPos(localStorage.getItem("sec"));
                // console.log("updatestorage else1else > min "+min);
                // console.log("updatestorage else1else > sec "+sec);
                if(countAlarm % 2 == 0){
                    !timerContent.classList.contains("break-color") ? timerContent.classList.add("break-color") : null;
                    sessionPosition.textContent = "Break Time";
                    timerContent.classList.contains("pomodoro-color") ? sessionPosition.classList.remove("pomodoro-color") : null ;
                }
                else{
                    !timerContent.classList.contains("pomodoro-color") ? timerContent.classList.add("pomodoro-color") : null;
                    sessionPosition.textContent !="pomodori" ? sessionPosition.textContent ="pomodori" : null;
                    timerContent.classList.contains("break-color") ? timerContent.classList.remove("break-color") : null ;
                }
            }
           
        }
    }else{
        if (typeof min !== "undefined"){
            if(Number(sessionShow.textContent) >= Number(sessionMaxShow.textContent)){
                min = pomodoroInput.value;
                sec = 0;
                // sessionCount = 0;
                sessionShow.textContent = sessionCount;
                localStorage.setItem("min", min);
                localStorage.setItem("sec", sec);
                localStorage.setItem("sessionCount", sessionCount);
                showChrono.textContent = getNumberInTwoPos(pomodoroInput.value)+":00";
                timerEnCours = "false";
                localStorage.setItem("timerEnCours", timerEnCours);
                // console.log("updatestorage undefine > min "+min);
                // console.log("updatestorage undefined > sec "+sec);
            } else {
                min = localStorage.getItem("min");
                sec = localStorage.getItem("sec");
                showChrono.textContent = getNumberInTwoPos(localStorage.getItem("min"))+":"+getNumberInTwoPos(localStorage.getItem("sec")); 
                if(countAlarm % 2 == 0){
                    // console.log("updatestorage > countAlarm pair "+ countAlarm);
                    minPause = min;
                    secPause = sec;
                    // discoverTitle.style.cssText = "pointer-events: none; opacity: 0.5;";
                }
                else{
                    // console.log("updatestorage > countAlarm inpair "+ countAlarm);
                    minPomo = min;
                    secPomo =  sec;
                } 
                // console.log("updatestorage else2 > min "+min);
                // console.log("updatestorage else2 > sec "+sec);
                if(sessionMaxShow.textContent != sessionShow.textContent){
                    document.querySelector("#play-img").src="../icons/ci_pause-circle-filled.png";
                    tooltiptextPlay.textContent = "Pause round";
                    if(countAlarm % 2 == 0){
                        !timerContent.classList.contains("break-color") ? timerContent.classList.add("break-color") : null;
                        sessionPosition.textContent = "Break Time";
                        timerContent.classList.contains("pomodoro-color") ? sessionPosition.classList.remove("pomodoro-color") : null ;
                    }
                    else{
                        !timerContent.classList.contains("pomodoro-color") ? timerContent.classList.add("pomodoro-color") : null;
                        sessionPosition.textContent !="pomodori" ? sessionPosition.textContent ="pomodori" : null;
                        timerContent.classList.contains("break-color") ? timerContent.classList.remove("break-color") : null ;
                    }
                    // showTimer();
                    // startAlarm(min, sec);
                }
                
            }
            
        }
       
    }
    //show in right lang
    var lang = localStorage.getItem("lang");
    
    var dispoLang = ["en", "fr", "ru"];
    var collection = document.getElementsByClassName("translate-" + lang);
    for (let index = 0; index < collection.length; index++) {
        if (collection[index].classList.contains("hidden")) {
            collection[index].classList.remove("hidden");
            if (collection[index].tagName == "SPAN" || collection[index].classList.contains("form-label")) {
                collection[index].classList.add("d-block");
                collection[index].classList.add("w-150");
                collection[index].classList.add("text-left");
            }
        }
        for (let i = 0; i < dispoLang.length; i++) {
            if (dispoLang[i] != lang) {
                var collection2 = document.getElementsByClassName("translate-" + dispoLang[i]);
                for (let index = 0; index < collection2.length; index++) {
                    if (!collection2[index].classList.contains("hidden")) {
                        collection2[index].classList.add("hidden");
                        if (collection2[index].tagName == "SPAN" || collection2[index].classList.contains("form-label")) {
                            collection2[index].classList.remove("d-block");
                            collection2[index].classList.remove("w-150");
                            collection2[index].classList.remove("text-left");
                        }

                    }
                }
           }
            
        }
        // console.log(collection[index].classList)
    }

    //dark theme
    if (darkTheme === "true") {
        document.getElementById("body").classList.remove("body");
        document.getElementById("body").classList.add("body-dark");
        document.getElementById("input-switch-theme").checked = true;
        document.querySelector("#bottom").classList.remove("bottom");
        document.querySelector("#bottom").classList.add("bottom-dark");
    } else {
        document.getElementById("body").classList.add("body");
        document.getElementById("body").classList.remove("body-dark");
        document.getElementById("input-switch-theme").checked = false;
        document.querySelector("#bottom").classList.remove("bottom-dark");
        document.querySelector("#bottom").classList.add("bottom");
    }
    
} 

updateStorage();


function switchMode(mode) {
    // document.getElementById("second-circle").style.width = "130px";
    switch (mode) {
        case "break":
            timerContent.classList.add("break-color");
            showChrono.textContent = getNumberInTwoPos(localStorage.getItem("dureeSmallBreak")) + ":00";
            sessionPosition.textContent = "Break Time";
            timerContent.classList.contains("pomodoro-color") ? sessionPosition.classList.remove("pomodoro-color") : null ;
            min = localStorage.getItem("dureeSmallBreak");
            sec = 0;
            localStorage.setItem("sec", sec);
            localStorage.setItem("min", min);
            // discoverLink.style.cssText = "pointer-events: pointer; opacity: 1;";
            // if(resultat.hasOwnProperty(discoverPosition)){
            //     var obj = resultat[discoverPosition] ;
            //     // discoverLink.setAttribute("href", obj["link"]);
            // }
            notifyBackgroundPage(true);
            // startAlarm(min, sec);
            break;
        case "work":
            timerContent.classList.add("pomodoro-color");
            sessionPosition.textContent ="pomodori";
            timerContent.classList.contains("break-color") ? timerContent.classList.remove("break-color") : null ;
            min = localStorage.getItem("dureePomodoro");
            sec = 0;
            localStorage.setItem("sec", sec);
            localStorage.setItem("min", min);
            // discoverLink.style.cssText = "pointer-events: none; opacity: 0.5;";
            // discoverLink.removeAttribute("href");
            notifyBackgroundPage(true);
            // startAlarm(min, sec);
            break;
        default:
            break;
    }
}


function handleResponse(message) {
    if(typeof(message) != "undefined" ){
        min = message.min;
        sec = message.sec;
        // localStorage.setItem("min", min) ;
        // localStorage.setItem("sec", sec);
        showTimer();
        
    }
    // console.log("handleR > min", localStorage.getItem("min"));
    // console.log("handleR > sec", localStorage.getItem("sec"));
    
    
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  var sending;
  function notifyBackgroundPage(continuer) {
    if(continuer){
        if(chrome){
            chrome.runtime.sendMessage({
                    continue: true,
                    min: localStorage.getItem("min"),
                    sec: localStorage.getItem("sec"),
                }, handleResponse);
        } else if(browser){
            sending= browser.runtime.sendMessage({
                continue: true,
                min: localStorage.getItem("min"),
                sec: localStorage.getItem("sec"),
            });
            sending.then(handleResponse, handleError); 
        }
        
    } else {
        if(chrome){
            chrome.runtime.sendMessage({
                    continue: false,
                    min: localStorage.getItem("min"),
                    sec: localStorage.getItem("sec"),
                }, handleResponse);
        } else if(browser){
            sending= browser.runtime.sendMessage({
                continue: false,
                min: localStorage.getItem("min"),
                sec: localStorage.getItem("sec")
            });
            sending.then(handleResponse, handleError); 
        }
       

        // clearInterval(localStorage.getItem("t"));
    }   
    // console.log("notify > min 2", localStorage.getItem("min"));
    // console.log("notify > sec", localStorage.getItem("sec"));
    
  }
  
// var tmpS = localStorage.getItem("sec");
// var tmpM = localStorage.getItem("min");
  window.addEventListener("storage", () => {
    if (localStorage.getItem("timerEnCours") === "true") {
        showTimer();

        // if (tmpM == localStorage.getItem("dureeSmallBreak") || tmpM == localStorage.getItem("dureePomodoro") && tmpS == "0") {
        //     document.getElementById("second-circle").style.width = "130px";
        // } 
        // if (tmpS != localStorage.getItem("sec") || tmpM != localStorage.getItem("min")) {
        //     tmpS = localStorage.getItem("sec");
        //     tmpM = localStorage.getItem("min");
        //     let sizeVal = 0;
        //     if (timerContent.classList.contains("break-color")) {
        //         sizeVal = document.getElementById("second-circle").offsetWidth - Math.round(130 / (parseInt(localStorage.getItem("dureeSmallBreak")) * 60)) ;
        //     } else {
        //         sizeVal = document.getElementById("second-circle").offsetWidth - Math.round(130 / (parseInt(localStorage.getItem("dureePomodoro")) * 60)) ;
        //     }
        //     // console.log(document.getElementById("second-circle").offsetHeight+" val " +sizeVal);
            // document.getElementById("second-circle").style.width = sizeVal+"px";
        //     document.getElementById("second-circle").style.height =  sizeVal+"px";
        // }
        
      
      }
  });

function pauseAlarm(min, sec) {
    clearTimeout(localStorage.getItem("t"));
    notifyBackgroundPage(false);
  
}

var resultat = Array(), ResLength;
// var discoverPosition = 0;



// async function getDisc() {
   
//     //TODO Ajax for getting data from serveur
//     $.getJSON({url: "https://pomodoro-rest-api-ledoc.herokuapp.com/api/discoveries?page=1", success: function(result){
//         $.each(result, function (key, val) {
//             resultat.push(val);

//         });
//             showDiscover();

//         ResLength = resultat.length;
//     }});

    
// }
// function showDiscover() {
//     if(ResLength != 0){
//         var obj =  resultat[discoverPosition];
//         // console.log(obj.get("img").url().url());
//         // console.log(obj["titleEn"]);
//         discoverTitle.textContent = obj["titleEn"];

//         discoverDesc.textContent = obj["descriptionEn"];
//         switch (obj["categorieEn"]) {
//             case "Music":
//                 discoverContent.style.backgroundImage = "url('../icons/music.jpg')";
//                 break;
//             case "art":
//                 discoverContent.style.backgroundImage = "url('../icons/art.jpg')";
//                 break;
//             case "Game":
//                 discoverContent.style.backgroundImage = "url('../icons/game.jpg')";
//                 break;
//             case "photograpy":
//                 discoverContent.style.backgroundImage = "url('../icons/photography.jpg')";
//                 break;
//             case "folk229":
//                 discoverContent.style.backgroundImage = "url('../icons/folk.jpg')";
//                 break;
//             case "funny":
//                 discoverContent.style.backgroundImage = "url('../icons/funny.jpg')";
//                 break;
//             case "design":
//                 discoverContent.style.backgroundImage = "url('../icons/design.jpg')";
//                 break;
//             case "innovation":
//                 discoverContent.style.backgroundImage = "url('../icons/innovation.jpg')";
//                 break;
//             case "dance":
//                 discoverContent.style.backgroundImage = "url('../icons/dance.jpg')";
//                 break;
//             case "Benin":
//                 discoverContent.style.backgroundImage = "url('../icons/benin.jpg')";
//             case "technology":
//                 discoverContent.style.backgroundImage = "url('../icons/technology.jpg')";
//                 break;
//             default:
//                 break;
//         }
//         if(countAlarm % 2 != 0){
//             // discoverTitle.removeAttribute("href");
//             discoverLink.removeAttribute("href");
//         }
//         else{
//             discoverLink.setAttribute("href", obj["link"]);
//         }
//         if(!resultat.hasOwnProperty(discoverPosition+1))
//            nextBtn.disabled=true;
//         else{
//             nextBtn.disabled=false;
//         }
//         if(!resultat.hasOwnProperty(discoverPosition-1))
//             prevBtn.disabled=true;
//         else{
//             prevBtn.disabled=false;
//         }
//     }
// }

//  function nextShowDiscover() {
//     discoverPosition+=1;
//     if (resultat.hasOwnProperty((discoverPosition))) {
//          showDiscover();
       
//     }   
// }

//  function prevShowDiscover() {
//     discoverPosition -=1;
//     if (resultat.hasOwnProperty((discoverPosition))) {
//          showDiscover();
//     }
// }
//      getDisc();


    function showTimer() {
        showChrono.textContent = getNumberInTwoPos(localStorage.getItem("min")) +":"+getNumberInTwoPos(localStorage.getItem("sec"));
        if(Number(localStorage.getItem("countAlarm")) % 2 == 0){
            !timerContent.classList.contains("break-color") ? timerContent.classList.add("break-color") : null;
            sessionPosition.textContent = "Break Time";
            timerContent.classList.contains("pomodoro-color") ? sessionPosition.classList.remove("pomodoro-color") : null ;
         
            sessionShow.textContent = localStorage.getItem("sessionCount");
            // discoverLink.style.cssText = "pointer-events: pointer; opacity: 1;";
            // if(typeof resultat !== "undefined" && resultat.hasOwnProperty(discoverPosition)){
            //     var obj = resultat[discoverPosition] ;
            //     // discoverLink.setAttribute("href", obj["link"]);
            // }
        }
        else{
            !timerContent.classList.contains("pomodoro-color") ? timerContent.classList.add("pomodoro-color") : null;
            sessionPosition.textContent !="pomodori" ? sessionPosition.textContent ="pomodori" : null;
            timerContent.classList.contains("break-color") ? timerContent.classList.remove("break-color") : null ;
            // minPomo = min;
            // secPomo = sec;
            sessionShow.textContent = localStorage.getItem("sessionCount");
            // discoverLink.style.cssText = "pointer-events: none; opacity: 0.5;";
            // discoverLink.removeAttribute("href");
        }
         console.log("test no??");
          let sizeVal = document.getElementById("second-circle").style.width - 130 / (parseInt(localStorage.getItem("dureePomodoro"))) * 60;
                document.getElementById("second-circle").style.width = sizeVal;
                document.getElementById("second-circle").style.height = sizeVal;
    } 

    optionBlock.style = "display: none";
    document.addEventListener("click", (e) => {
        // console.log(e.target)
        if(e.target.id == "pomodoro-btn" || e.target.id == "home-icon" ){
            optionBlock.style = "display: none;";
            pomodoroBlock.style = "display: block;";
            creditsBlock.style = "display: none;";
            helpBlock.style = "display: none;";
            pomodoroBtn.classList.contains("active") ? null : pomodoroBtn.classList.add("active");
            optionsBtn.classList.contains("active") ? optionsBtn.classList.remove("active") : null;
            creditBtn.classList.contains("active") ? creditBtn.classList.remove("active") : null;
            helpBtn.classList.contains("active") ? helpBtn.classList.remove("active") : null ;

        }
        else if (e.target.id == "option-btn"  || e.target.id == "setting-icon" ){
            pomodoroBlock.style = "display: none;";
            optionBlock.style = "display: block;";
            creditsBlock.style = "display:  none;";
            helpBlock.style = "display: none;";
            pomodoroBtn.classList.contains("active") ? pomodoroBtn.classList.remove("active") : null;
            optionsBtn.classList.contains("active") ? null : optionsBtn.classList.add("active") ;
            creditBtn.classList.contains("active") ? creditBtn.classList.remove("active") : null;
            helpBtn.classList.contains("active") ? helpBtn.classList.remove("active") : null;

        }
        else if(e.target.id == "credit-btn"  || e.target.id == "info-icon" ){
            pomodoroBlock.style = "display: none;";
            optionBlock.style = "display: none;";
            creditsBlock.style = "display: block;";
            helpBlock.style = "display: none;";
            pomodoroBtn.classList.contains("active") ? pomodoroBtn.classList.remove("active") : null;
            optionsBtn.classList.contains("active") ? optionsBtn.classList.remove("active") : null ;
            creditBtn.classList.contains("active") ? null : creditBtn.classList.add("active");
            helpBtn.classList.contains("active") ? helpBtn.classList.remove("active") : null;

        }
        else if(e.target.id == "help-btn"  || e.target.id == "quiz-icon" ){
            pomodoroBlock.style = "display: none;";
            optionBlock.style = "display: none;";
            creditsBlock.style = "display: none;";
            helpBlock.style = "display: block;";
            pomodoroBtn.classList.contains("active") ? pomodoroBtn.classList.remove("active") : null;
            optionsBtn.classList.contains("active") ? optionsBtn.classList.remove("active") : null ;
            creditBtn.classList.contains("active") ? creditBtn.classList.remove("active") : null;
            helpBtn.classList.contains("active") ? null : helpBtn.classList.add("active");
        }
        else if(e.target.id=="share-btn"){
            var copyText = document.querySelector("#share-text");
            navigator.clipboard.writeText(copyText.textContent);
            alert("Share message copied");

        }
        else if(e.target.id=="play" || e.target.id=="play-img"){
            //appel de la fonction alarm
            // console.log("timerEnCours "+timerEnCours);
            if(localStorage.getItem("timerEnCours") === "false"){
               
                // console.log("SessionShow "+sessionShow.textContent);
                // console.log("SessionMaxShow "+sessionMaxShow.textContent);
                if(sessionShow.textContent == sessionMaxShow.textContent){
                    sessionCount = 0;
                    localStorage.setItem("sessionCount", sessionCount);
                    sessionShow.textContent = sessionCount;
                }
       
                if(localStorage.getItem("min") === "null" && localStorage.getItem("sec") === "null"){
                    if(countAlarm % 2 == 0){
                        console.log("countAlarm pair");
                        min = minPause 
                        sec = secPause  
                    }
                    else{
                        console.log("countAlarm inpair "+ countAlarm);
                        min = minPomo;
                        sec = secPomo;
                    }
                    localStorage.setItem("min", min);
                    localStorage.setItem("sec", sec);
                }
             
                notifyBackgroundPage(true);
                
                timerEnCours = "true";
                localStorage.setItem("timerEnCours", timerEnCours);
                showChrono.classList.contains("pauseAnim") ? showChrono.classList.remove("pauseAnim") : null;
                timerHorloge.classList.contains("pausedTimer") ? timerHorloge.classList.remove("pausedTimer") : null;
                sessionPosition.classList.contains("pauseAnim") ? sessionPosition.classList.remove("pauseAnim") : null;
                document.querySelector("#play-img").src="../icons/ci_pause-circle-filled.png";
                tooltiptextPlay.textContent = "Pause round";
            }
            else{
                // pauseAlarm(localStorage.getItem("min"), localStorage.getItem("sec"));
                notifyBackgroundPage(false);
                timerEnCours = "false";
                localStorage.setItem("timerEnCours", timerEnCours);
                showChrono.classList.add("pauseAnim");
                timerHorloge.classList.add("pausedTimer");
                sessionPosition.classList.add("pauseAnim");
                tooltiptextPlay.textContent = "Start timer";
                document.querySelector("#play-img").src="../icons/play.png";
            }
            
        }
        else if (e.target.id == "next-round" || e.target.id == "next-round-img") {
            
            countAlarm = Number(localStorage.getItem("countAlarm")) + 1;
           
            localStorage.setItem("countAlarm", countAlarm);
            if(Number(localStorage.getItem("countAlarm")) % 2 == 0){
                localStorage.setItem("min", breakInput.value);
            } else {
                sessionCount = localStorage.getItem("sessionCount");
                sessionCount = Number(sessionCount) + 1;
                sessionMaxi = Number(localStorage.getItem("sessionMax"));
                if (sessionCount >= sessionMaxi) {
                    sessionCount = 0;
                }
                localStorage.setItem("sessionCount", sessionCount);
                localStorage.setItem("min", pomodoroInput.value);
            }
            localStorage.setItem("sec", 0);
            if(localStorage.getItem("timerEnCours") === "true"){
                timerEnCours = "false";
                localStorage.setItem("timerEnCours", timerEnCours);
                showChrono.classList.add("pauseAnim");
                timerHorloge.classList.add("pausedTimer");
                sessionPosition.classList.add("pauseAnim");
                tooltiptextPlay.textContent = "Start timer";
                document.querySelector("#play-img").src="../icons/play.png";
            }
            console.log("next min>"+localStorage.getItem("min"));
            console.log("next sec>"+localStorage.getItem("sec"));
            clearTimeout(localStorage.getItem("t"))
            notifyBackgroundPage(false);
            showTimer();
        }
        // else if(e.target.id=="suivant-discover"){
        //     nextShowDiscover(); 
        // }
        // else if(e.target.id == "precedent-discover"){
        //     prevShowDiscover();
        // }
        else if (e.target.id == "input-switch-theme") {
            console.log("switch thme");
            if (darkTheme === "true") {
                document.getElementById("body").classList.add("body");
                document.getElementById("body").classList.remove("body-dark");
                document.querySelector("#bottom").classList.remove("bottom-dark");
                document.querySelector("#bottom").classList.add("bottom")
                e.target.checked = false;
            } else {
                document.getElementById("body").classList.remove("body");
                document.getElementById("body").classList.add("body-dark");
                document.querySelector("#bottom").classList.add("bottom-dark");
                document.querySelector("#bottom").classList.remove("bottom");
                e.target.checked = true;
            }   
            localStorage.setItem("dark", darkTheme === "true" ? false : true);
            darkTheme = localStorage.getItem("dark");
        }
        else if (e.target.id == "reload" || e.target.id == "reload-img"){
            clearTimeout(localStorage.getItem("t"));
            notifyBackgroundPage(false);
            timerEnCours = "false";
            localStorage.setItem("timerEnCours", timerEnCours);
            countAlarm = 1;
            localStorage.setItem("countAlarm", countAlarm);
            minPomo = localStorage.getItem("dureePomodoro");
            secPomo = 0;
            min = minute = minPomo;
            sec = seconde = secPomo;
            localStorage.setItem("sec", sec);
            localStorage.setItem("min", min);
            showChrono.textContent = getNumberInTwoPos(minPomo) + ":00";
            sessionShow.textContent = "0";
            timerContent.classList.contains("break-color") ? timerContent.classList.remove("break-color") : null;
            timerContent.classList.add("pomodoro-color");
            sessionPosition.textContent = "pomodori";
            tooltiptextPlay.textContent = "Start timer";
            document.querySelector("#play-img").src = "../icons/play.png";
            browser.browserAction.setBadgeText({ text: null });
            localStorage.setItem("sessionCount", 0);
            showChrono.classList.contains("pauseAnim") ? showChrono.classList.remove("pauseAnim") : null;
            sessionPosition.classList.contains("pauseAnim") ? sessionPosition.classList.remove("pauseAnim") : null;

        }
        else {
             console.log(e.target.id);
            return 0;
        } 
    });
    document.addEventListener("change", (e) => {
        //Changement du champ pomodoro-timer
        if (e.target.name == "pomodoro-time") {
            durationWork.textContent = e.target.value;
            if(timerEnCours === "false"){
                console.log(((Number(e.target.value))));
                // Verification si le champ contien un char
                if(Number(e.target.value) !== 0){
                    showChrono.textContent = getNumberInTwoPos(e.target.value) + ":00";
                    minPomo = pomodoroInput.value;
                    localStorage.setItem("dureePomodoro", minPomo);
                    localStorage.setItem("min", minPomo);
                    localStorage.setItem("sec", 0);

                } else {
                    e.target.classList.add("border-danger");
                }
            }else {
                if(Number(e.target.value) !== 0){
                    localStorage.setItem("dureePomodoro", pomodoroInput.value);
                    e.target.classList.contains("border-danger") ? e.target.classList.remove("border-danger") : null;
                } else {
                    e.target.classList.add("border-danger");
                }
            }
        } //Changement du champ break timer
        else if (e.target.name == "break-time") {
            durationBreak.textContent = e.target.value;
            if(timerEnCours === "false"){
                // Verification si le champ contien un char
                if(Number(e.target.value) !== 0){
                    minPause = breakInput.value;
                    localStorage.setItem("dureeSmallBreak", minPause);
                    e.target.classList.contains("border-danger") ? e.target.classList.remove("border-danger") : null;
                } else {
                    e.target.classList.add("border-danger");
                }

            }else{
                if(Number(e.target.value) !== 0){
                    localStorage.setItem("dureeSmallBreak", breakInput.value);
                    e.target.classList.contains("border-danger") ? e.target.classList.remove("border-danger") : null;
                } else {
                    e.target.classList.add("border-danger");
                }
            }
            
        }//Changement du champ alarm song
        else if(e.target.name == "alarm") {
            localStorage.setItem("alarmSong", alarmInput.value);
        } else if(e.target.name == "pomodoro-volume"){
            // Verification si le champ contien un char
            if(Number(e.target.value) !== 0 && Number(e.target.value) <= 100){
                localStorage.setItem("volume", alarmAudio.volume);
                e.target.classList.contains("border-danger") ? e.target.classList.remove("border-danger") : null;
            } else {
                e.target.classList.add("border-danger");
            }
            
        } else if(e.target.name == "autoStart"){
            localStorage.setItem("StartNextCycleAuto", autoStartInput.value);
        } else if (e.target.name == "langue") {
            console.log(translateInput.value);
            localStorage.setItem("lang", e.target.value);
            var lang = localStorage.getItem("lang");
            var dispoLang = ["en", "fr", "ru"];
            var collection = document.getElementsByClassName("translate-" + lang);
            for (let index = 0; index < collection.length; index++) {
                if (collection[index].classList.contains("hidden")) {
                    collection[index].classList.remove("hidden");
                    if (collection[index].tagName == "SPAN"  || collection[index].classList.contains("form-label")) {
                        collection[index].classList.add("d-block");
                        collection[index].classList.add("w-150");
                        collection[index].classList.add("text-left");
                    }
                }
                for (let i = 0; i < dispoLang.length; i++) {
                    if (dispoLang[i] != lang) {
                        var collection2 = document.getElementsByClassName("translate-" + dispoLang[i]);
                        for (let index = 0; index < collection2.length; index++) {
                            if (!collection2[index].classList.contains("hidden")) {
                                collection2[index].classList.add("hidden");
                                if (collection2[index].tagName == "SPAN" || collection2[index].classList.contains("form-label")) {
                                    collection2[index].classList.remove("d-block");
                                    collection2[index].classList.remove("w-150");
                                    collection2[index].classList.remove("text-left");
                                }
                            }
                        }
                }
                    
                }
                // console.log(collection[index].classList)
                
            } 
        } else if (e.target.name == "pomodoro-session") {
            localStorage.setItem("sessionMax", e.target.value);
            sessionMaxShow.textContent = localStorage.getItem("sessionMax");

            
        }   

        


    });

function getNumberInTwoPos(n) {
    let v = parseInt(n);
    if (v < 10) {
        return "0" + n;
    } else {
        return n;
    }
}
 

     


