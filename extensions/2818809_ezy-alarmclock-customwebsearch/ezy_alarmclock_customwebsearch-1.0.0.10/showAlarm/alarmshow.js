document.addEventListener('DOMContentLoaded', function () {

    storageReplacer.init().then(function () {
        if (storageReplacer.getLocalStorageItem('currentAlarm') !== undefined) {

            var currentAlarm = JSON.parse(storageReplacer.getLocalStorageItem('currentAlarm'));
            if (currentAlarm !== undefined) {
                const audioElem = document.getElementById('audio');
                if (currentAlarm.soundStatus === "true") {
                    audioElem.src = '../sounds/' + currentAlarm.sound;
                    audioElem.play();
                }
                const snoozeTime = currentAlarm.snooze;
                if (snoozeTime !== false) {
                    const btnSnoozeElem = document.getElementById('snoozeBtn');
                    btnSnoozeElem.style.display = 'block';
                    btnSnoozeElem.addEventListener('click', function () {
                        let futureTime = new Date().getTime() + 5 * 60 * 1000;
                        chrome.alarms.create('snooze' + currentAlarm.id.toString(),
                            {when: futureTime});
                        CloseCurrentWindow();
                    });
                    setTimeout(function () {
                        audioElem.pause();
                    }, 60000);
                }
                else {
                    const btnSnoozeElem = document.getElementById('snoozeBtn');
                    btnSnoozeElem.disabled = true;
                    btnSnoozeElem.style.backgroundColor = '#ffa45a'; // Set the background color to gray
                    btnSnoozeElem.style.color = '#666666'; // Set the text color to a darker gray
                    btnSnoozeElem.style.cursor = 'not-allowed'; // Change the cursor to 'not-allowed'
                    setTimeout(function () {
                        audioElem.pause();
                    }, 60000);
                }
                document.getElementById('cancelBtn').addEventListener('click', function () {
                    DisbleAlarm(currentAlarm.id);

                });

                if (currentAlarm.name.length > 0)
                    document.querySelector('.alarmName').innerText = currentAlarm.name;

                const hours = currentAlarm.hours > 12 ? currentAlarm.hours - 12 : currentAlarm.hours;
                const period = currentAlarm.hours >= 12 ? 'PM' : 'AM';

                document.querySelector('.alarmTime').innerText = ('00' + hours).slice(-2) + ':' + ('00' + currentAlarm.minutes).slice(-2) + ' ' + period;

                storageReplacer.setLocalStorageItem('currentAlarm', '');
            }

        }
    })


});

window.addEventListener('resize', () => {
    window.resizeTo(500, 400);
});


function DisbleAlarm(id) {
    var turnOffId = [];
    if (storageReplacer.getLocalStorageItem('TurnOffId') !== undefined)
        turnOffId = storageReplacer.getLocalStorageItem('TurnOffId');
    turnOffId.push(id);
    storageReplacer.setLocalStorageItem('TurnOffId', turnOffId);
    CloseCurrentWindow();
}

function CloseCurrentWindow() {
    chrome.windows.getCurrent(currentWindow => {
        chrome.windows.remove(currentWindow.id);
    });
}




