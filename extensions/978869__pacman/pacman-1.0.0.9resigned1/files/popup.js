let getLocalsMessage = (messagename) => { return chrome.i18n.getMessage(messagename); }

function GUILocalization(){
    document.querySelector('#help h2').textContent = getLocalsMessage("appLabelHelp");
    document.querySelector('#home .help-button').textContent = getLocalsMessage("appLabelHelp");
    document.querySelector('#panel .help-button').textContent = getLocalsMessage("appLabelHelp");

    document.querySelectorAll('#help tbody tr td')[0].textContent = getLocalsMessage("appLabelArrowLeft");
    document.querySelectorAll('#help tbody tr td')[1].textContent = getLocalsMessage("appLabelMoveLeft");
    document.querySelectorAll('#help tbody tr td')[2].textContent = getLocalsMessage("appLabelArrowRight");
    document.querySelectorAll('#help tbody tr td')[3].textContent = getLocalsMessage("appLabelMoveRight");
    document.querySelectorAll('#help tbody tr td')[4].textContent = getLocalsMessage("appLabelArrowDown");
    document.querySelectorAll('#help tbody tr td')[5].textContent = getLocalsMessage("appLabelMoveDown");
    document.querySelectorAll('#help tbody tr td')[6].textContent = getLocalsMessage("appLabelArrowUp");
    document.querySelectorAll('#help tbody tr td')[7].textContent = getLocalsMessage("appLabelMoveUp");

    document.querySelectorAll('#help tbody tr td')[10].textContent = getLocalsMessage("appLabelPause");

    document.querySelector('#highscore h2').textContent = getLocalsMessage("appLabelHighscore");

    document.querySelector('#presentation-titles').textContent = getLocalsMessage("appLabelCharName");
}

loadAllSound();

$(document).ready(function() {
    GUILocalization();

    HELP_TIMER = setInterval(() => {blinkHelp();}, HELP_DELAY);

    initHome();

    $(".sound").click(function(e) {
        e.stopPropagation();

        var sound = $(this).attr("data-sound");
        if (sound === "on") {
            $(".sound").attr("data-sound", "off");
            $(".sound").find("img").attr("src", "./files/img/sound-off.png");
            GROUP_SOUND.mute();
        } else {
            $(".sound").attr("data-sound", "on");
            $(".sound").find("img").attr("src", "./files/img/sound-on.png");
            GROUP_SOUND.unmute();
        }
    });

    $(".help-button, #help").click(function(e) {
        e.stopPropagation();
        if (!PACMAN_DEAD && !LOCK && !GAMEOVER) {
            if ($('#help').css("display") === "none") {
                $('#help').fadeIn("slow");
                $(".help-button").hide();
                if ($("#panel").css("display") !== "none") {
                    pauseGame();
                }
            } else {
                $('#help').fadeOut("slow");
                $(".help-button").show();
            }
        }
    });

    $("body").keyup(function(e) {
        KEYDOWN = false;
    });

    $("body").keydown(function(e) {
        if (HOME) {
            initGame(true);
        } else {
            KEYDOWN = true;
            if (PACMAN_DEAD && !LOCK) {
                erasePacman();
                resetPacman();
                drawPacman();

                eraseGhosts();
                resetGhosts();
                drawGhosts();
                moveGhosts();

                blinkSuperBubbles();

            } else if (e.keyCode >= 37 && e.keyCode <= 40 && !PAUSE && !PACMAN_DEAD && !LOCK) {
                if (e.keyCode === 39) {
                    movePacman(1);
                } else if (e.keyCode === 40) {
                    movePacman(2);
                } else if (e.keyCode === 37) {
                    movePacman(3);
                } else if (e.keyCode === 38) {
                    movePacman(4);
                }
            } else if (e.keyCode === 80 && !PACMAN_DEAD && !LOCK) {
                if (PAUSE) {
                    resumeGame();
                } else {
                    pauseGame();
                }
            } else if (GAMEOVER) {
                initHome();
            }
        }
    });
});