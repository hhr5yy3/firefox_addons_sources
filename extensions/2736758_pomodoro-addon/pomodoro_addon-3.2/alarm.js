if (window.hasRun) {
    process.exit(1)
  }
window.hasRun = true;
var browser = browser || chrome
let optionBlock ;
let pomodoroInput ;
let breakInput ;
let Input ;
let alarmInput ;
let sessionShow ;
let sessionMaxShow ;
let pomodoroNotif;

let sessionMax = 4;
let timerHorloge ;
let showChrono ;
let sessionPosition ;
let timerContent ;
let tooltiptextPlay;
let darkTheme;

let timerEnCours = "false";
let sessionCount = 0;

let countAlarm;
let minPomo;
let minPause;
let secPomo;
let secPause;
let t, min, sec;
let alarmAudio;
let autoStart = "true";


let sendResponseBg, views, continueScript;
var breakNotificationTitle = {
    "en" : "Time to take break",
    "fr" : "C'est l'heure de la pause",
    "ru" : "пора на перерыв"
};
var breakNotificationMessage = {
    "en" : "It's time to take a break. Open the add-on, to see some distractions during your break time.",
    "fr" : "C'est l'heure de la pause. Ouvrez l'extension pour voir quelques distractions",
    "ru" : "Настало время перерыва. Откройте расширение, чтобы увидеть некоторые отвлекающие факторы"
};
var longBreakNotificationTitle = {
    "en" : "Time to take a long break",
    "fr" : "C'est l'heure de la grande pause",
    "ru" : "Пришло время для большого перерыва"
};
var longBreakNotificationMessage = {
    "en" : "It's time to take a long break. Open the add-on, to see some distractions during your break time.",
    "fr" : "C'est l'heure de la grande pause. Ouvrez l'extension pour voir quelques distractions",
    "ru" : "Пришло время большого перерыва. Откройте расширение, чтобы увидеть некоторые отвлекающие факторы"
};

var endOflongBreakTitle = {
    "en" : "Congratulation!!!",
    "fr" : "Félicitation",
    "ru" : "Поздравления"
}
var endOflongBreakMessage = {
    "en" : "You finish a hard cycle. Start another cycle ?",
    "fr" : "Vous avez un cycle! Désirez-vous un nouveau cycle ?",
    "ru" : "У тебя есть цикл! Хотите новый цикл?"
}
var workNotificationTitle = {
    "en" : "Time to go back to work",
    "fr" : "C'est l'heure du travail",
    "ru" : "пора на работу"
};

var workNotificationMessage = {
    "en" : "It's time to go back to work dude.",
    "fr" : "C'est l'heure du retourner au travail bg",
    "ru" : "Пришло время вернуться к работе"
};


// console.log("it's background first");
// localStorage.setItem(Date.now(), 0);

function populateStorage() {
    sessionCount = 0;
    timerEnCours = "false";
    countAlarm = 1;
    localStorage.setItem("sessionMax", 4);
    localStorage.setItem("dureePomodoro", 25);
    localStorage.setItem("dureeSmallBreak", 5);
    localStorage.setItem("alarmSong", "data-scan.wav");
    localStorage.setItem("volume", 25);
    localStorage.setItem("StartNextCycleAuto", autoStart);
    localStorage.setItem("timerEnCours", timerEnCours);
    localStorage.setItem("sessionCount", sessionCount);
    localStorage.setItem("countAlarm", countAlarm);
    localStorage.setItem("t",t);
    localStorage.setItem("min", 25);
    localStorage.setItem("sec", 0);
    localStorage.setItem("lang", "en");
    localStorage.setItem("dark", true);
    // localStorage.setItem("pomodorotimer", localStorage.getItem("dureePomodoro"));
    
    
}

if(!localStorage.getItem("sessionMax")){
    populateStorage()
}
function startAlarm(minute, seconde) {
  
    if(typeof(continueScript) != "undefined" ){
        if(continueScript){
            min = minute;
            sec = seconde;
            countAlarm = Number(localStorage.getItem("countAlarm"));
            sessionCount = localStorage.getItem("sessionCount");
            // console.log("min="+min+" sec="+sec);
            if(seconde == 0 && minute > 0){
                seconde = 59;
                // console.log("Alarm min = "+ min)
                minute -= 1;
            }
            else if(seconde > 0) {
                seconde -=1;
            }
            
            if(countAlarm % 2 == 0){
             
                minPause = minute;
                secPause = seconde;
                browser.browserAction.setBadgeBackgroundColor({color: "#23a089"});
            }
            else{
                minPomo = minute;
                secPomo = seconde;
                browser.browserAction.setBadgeBackgroundColor({color: "#DD2E44"});
            }
            min = minute;
            sec = seconde;
            if(min != 0)
                browser.browserAction.setBadgeText({text: min+"mn"});
            else
                browser.browserAction.setBadgeText({text: sec+"s"});
            localStorage.setItem("min", min);
            localStorage.setItem("sec", sec);
            sendResponseBg({min: min, sec: sec});
            // views = browser.runtime.getViews;
            // console.log(views)

            // console.log("background test"+(document.querySelector("#show-chrono")));

            if(min == 0 && sec == 0){
                // showChrono.textContent = min +":"+sec;
                if (localStorage.getItem("min") !== "undefined") {
                    countAlarm++;
                    localStorage.setItem("countAlarm", countAlarm);
                    // console.log("session alarm > "+ sessionCount);
                    if(countAlarm % 2 == 0){
                        sessionMax = localStorage.getItem("sessionMax")
                        if(sessionCount < sessionMax){
                            console.log("finishWork");
                            alarmAudio = new Audio("song/"+localStorage.getItem("alarmSong"));
                            // alarmAudio.playbackRate = 0.5;
                            var lang = localStorage.getItem("lang");
                            var minTemp = localStorage.getItem(Date.now());
                            alarmAudio.volume =Number(localStorage.getItem("volume"))/100;
                            alarmAudio.play();
                            browser.notifications.create(pomodoroNotif, {
                                "type": "basic",
                                "iconUrl": browser.runtime.getURL("icons/pomodoro-48.png"),
                                "title": breakNotificationTitle[lang],
                                "message": breakNotificationMessage[lang]
                            });
                            browser.browserAction.onClicked.addListener(() => {
                                var clearing = browser.notifications.clear(pomodoroNotif);
                                clearing.then(() => {
                                    alarmAudio.pause();
                                });
                            });
                                switchMode("break");
                        } else {
                            // sessionCount >= 3 ? sessionCount++ : null;
                            // localStorage.setItem("sessionCount", sessionCount);
                           
                            // sessionShow.textContent = sessionCount;
                            // console.log("countAr=larm break > "+ countAlarm);
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
                            var lang = localStorage.getItem("lang");
                            alarmAudio = new Audio("song/"+localStorage.getItem("alarmSong"));
                            // alarmAudio.playbackRate = 0.5;
                            alarmAudio.volume =localStorage.getItem("volume")/100;
                            alarmAudio.play();
                            browser.notifications.create(pomodoroNotif, {
                                "type": "basic",
                                "iconUrl": browser.runtime.getURL("icons/pomodoro-48.png"),
                                "title": longBreakNotificationTitle[lang],
                                "message": longBreakNotificationMessage[lang]
                            });
                            browser.browserAction.onClicked.addListener(() => {
                                var clearing = browser.notifications.clear(pomodoroNotif);
                                clearing.then(() => {
                                    alarmAudio.pause();
                                });
                            });
                            clearTimeout(localStorage.getItem("t"));
                            return 1;
                        }
                        
                    } else {
                        sessionCount++;
                        localStorage.setItem("sessionCount", sessionCount);
                        var lang = localStorage.getItem("lang");
                        sessionMax = localStorage.getItem("sessionMax")
                        if(sessionCount < sessionMax){
                            // console.log("finishBreak");
                            min = minute = localStorage.getItem("dureeSmallBreak");
                            sec = seconde = 0;
                            localStorage.setItem("sec", sec);
                            localStorage.setItem("min", min);
                            alarmAudio = new Audio("song/"+localStorage.getItem("alarmSong"));
                            // alarmAudio.playbackRate = 0.5;
                            alarmAudio.volume =Number(localStorage.getItem("volume"))/100;
                            alarmAudio.play();
                            browser.notifications.create(pomodoroNotif, {
                                "type": "basic",
                                "iconUrl": browser.runtime.getURL("icons/pomodoro-48.png"),
                                "title": workNotificationTitle[lang],
                                "message": workNotificationMessage[lang]
                            });
                            browser.browserAction.onClicked.addListener(() => {
                                var clearing = browser.notifications.clear(pomodoroNotif);
                                clearing.then(() => {
                                    alarmAudio.pause();
                                });
                            });
                            switchMode("work");
                        }else {
                            timerEnCours = "false";
                            countAlarm = 1;
                            localStorage.setItem("timerEnCours", timerEnCours);
                            localStorage.setItem("countAlarm", countAlarm);
                            minPomo = localStorage.getItem("dureePomodoro");
                            secPomo = 0;
                            min = minute = minPomo;
                            sec = seconde = secPomo;
                            localStorage.setItem("sec", sec);
                            localStorage.setItem("min", min);
                            // console.log("countArlarm work > "+ countAlarm);
                            alarmAudio = new Audio("song/"+localStorage.getItem("alarmSong"));
                            // alarmAudio.playbackRate = 0.5;
                            var lang = localStorage.getItem("lang");
                            alarmAudio.volume =Number(localStorage.getItem("volume"))/100;
                            alarmAudio.play();
                            browser.notifications.create(pomodoroNotif, {
                                "type": "basic",
                                "iconUrl": browser.runtime.getURL("icons/pomodoro-48.png"),
                                "title": longBreakNotificationTitle[lang],
                                "message": longBreakNotificationMessage[lang]
                            });
                            browser.browserAction.onClicked.addListener(() => {
                                var clearing = browser.notifications.clear(pomodoroNotif);
                                clearing.then(() => {
                                    alarmAudio.pause();
                                });
                            });
                            clearTimeout(localStorage.getItem("t"));
                            return 1;
                        }
                    }
                }
                
            }
            else{
                
                t = setTimeout(startAlarm, 1000, minute, seconde);
                localStorage.setItem("t", t);
                

            }
        } else{
           
            // localStorage.setItem("sec", sec);
            // localStorage.setItem("min", min);
            clearTimeout(localStorage.getItem("t"));
            return 1;
        }
    } else {
        // localStorage.setItem("sec", sec);
        // localStorage.setItem("min", min);
        clearTimeout(localStorage.getItem("t"));
        return 1;
    }
    
}

function switchMode(mode) {
    switch (mode) {
        case "break":
            min = localStorage.getItem("dureeSmallBreak");
            sec = 0;
            localStorage.setItem("sec", sec);
            localStorage.setItem("min", min);
            if(localStorage.getItem("StartNextCycleAuto") === "true")
                startAlarm(min, sec);
            else {
                continueScript = false;
                timerEnCours = "false";
                localStorage.setItem("timerEnCours", timerEnCours);
            }
                
            break;
        case "work":
            min = localStorage.getItem("dureePomodoro");
            sec = 0;
            localStorage.setItem("sec", sec);
            localStorage.setItem("min", min);
            if(localStorage.getItem("StartNextCycleAuto") === "true")
                startAlarm(min, sec);
                else {
                    continueScript = false;
                    timerEnCours = "false";
                    localStorage.setItem("timerEnCours", timerEnCours);
                }
            break;
        default:
            break;
    }
}


function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script");
    sendResponseBg = sendResponse;
    if(request.continue){
        continueScript = true;
        startAlarm(request.min, request.sec);
    }else {
        continueScript = false;
        // clearTimeout(localStorage.getItem("t"));
    }
    // console.log("alarm > min", localStorage.getItem("min"));
    // console.log("alarm > sec", localStorage.getItem("sec"));
    
  }

  browser.runtime.onMessage.addListener(handleMessage);
 

// browser.tabs.executeScript({file: "content_scripts/../alarm.js"});