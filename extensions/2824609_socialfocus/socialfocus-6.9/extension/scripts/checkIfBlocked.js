// MARK: - Check if Need to Block

function checkIfBlockedByPassword() {
  browser.storage.local.get(
    getConst.passwordLockingIsActiveData,
    function (obj) {
      const data = obj[getConst.passwordLockingIsActiveData] ?? false;

      if (data) {
        showScreen("passwordUnlockingScreen");
      } else {
        showScreen("mainScreen");
      }
    }
  );
}

function startTimer(totalSeconds, actionCallback) {
  let secondsElapsed = 0;

  const timerInterval = setInterval(function () {
    if (secondsElapsed >= totalSeconds) {
      clearInterval(timerInterval); // Stop the timer when N seconds have elapsed
    } else {
      secondsElapsed++;
      actionCallback(secondsElapsed);
    }
  }, 1000);
}

function checkIfBlockedByOpeningTimer() {
  browser.storage.local.get(
    [
      getConst.openingTimerIsActiveData,
      getConst.openingTimerValueData,
      getConst.openingTimerMessageData,
    ],
    function (obj) {
      const openingTimerIsActive =
        obj[getConst.openingTimerIsActiveData] ?? false;
      const openingTimerValue = obj[getConst.openingTimerValueData] ?? 1;
      const openingTimerMessage = obj[getConst.openingTimerMessageData] ?? "";

      if (openingTimerIsActive == true) {
        if (openingTimerMessage == "") {
          queryById("openingTimerMessageDisplay").style.display = "none";
          queryById("openingTimerMessageDisplay").innerHTML = "";
        } else {
          queryById("openingTimerMessageDisplay").style.display = "block";
          queryById("openingTimerMessageDisplay").innerHTML =
            openingTimerMessage;
        }

        queryById("openingTimerLeftSeconds").innerHTML = openingTimerValue;

        showScreen("openingTimerWaitScreen");

        startTimer(openingTimerValue, function (secondsElapsed) {
          const leftSeconds = openingTimerValue - secondsElapsed;

          if (leftSeconds == 0) {
            otherChecks();
          } else {
            queryById("openingTimerLeftSeconds").innerHTML = leftSeconds;
          }
        });
      }
    }
  );
}

// MARK: - Life Cycle

function otherChecks() {
  checkIfBlockedByPassword();
}

function checkIfNeedToBlockExtension() {
  browser.storage.local.get(
    [getConst.openingTimerIsActiveData],
    function (obj) {
      const openingTimerIsActive =
        obj[getConst.openingTimerIsActiveData] ?? false;

      if (openingTimerIsActive == true) {
        checkIfBlockedByOpeningTimer();
      } else {
        otherChecks();
      }
    }
  );
}

checkIfNeedToBlockExtension();
