var ErrorActions = (function() {
  const counter = 0;
  // var timer = [0, 1000, 2000, 3000, 4000];
  let timer = 0;
  let eaUnreadErrList= {};
  let setTime;
  let handleFirstCalled = false;
  let timerId;
  /*
  function intervalReset(){
    if(Date.now() - setTime >= 7200000){
      counter = 0;
      setTime = Date.now();
    }
    setTimeout(intervalReset, 7210000);
  }
  */
  function runTimer() {
    if (_.size(eaUnreadErrList) > 0) {
      ErrorActions.handleIntervalError();
    }
    timerId = setTimeout(runTimer, timer*60000);
  }
  gEvents.on('init', function(argument) {
    Prefs.on('change:errorAction.enabled change:active', function(e) {
      if (!(Prefs.get('errorAction.enabled') && Prefs.get('active') )) {
        clearTimeout(timerId);
        NotifyPopup.clearErrorGroup();
      } else {
        handleFirstCalled = false;
      }
    });
    eaUnreadErrList = Prefs.get('eaUnreadErrList', {});
    timer = Prefs.get('errorAction.interval');
  });
  return {
    handleError: function(sieve, err) {
      const minCount = parseInt(Prefs.get('errorAction.minCount', 3));
      if (err.count === minCount) {
        eaUnreadErrList[sieve.id] = Date.now();
        Prefs.set('eaUnreadErrList', eaUnreadErrList);
      }
      // condition passes when user enables notifications and first error occurs
      if (Prefs.get('errorAction.enabled') && Prefs.get('active') && (!handleFirstCalled && err.count >= minCount)) {
        if (!_.isEmpty(eaUnreadErrList)) {
          this.handleFirstError(sieve, err);
        }
        runTimer();
      }
    },
    handleFirstError: function(sieve, err) {
      NotifyAudio.play({
        config: {
          tone: Prefs.get('errorAction.sound') || '/skin/media/buzzer.ogg',
        },
      });
      handleFirstCalled = true;
    },

    handleIntervalError: function() {
      SieveStore.find({
        // XXX Users only need notifications for monitors that are ON.
        'state.in': [C.STATE_READY],
        'err.ne': '$null',
        // 'ts_view.lt': { name: 'ts_data', type: 'field' }
      }, {
        only: ['id', 'ts', 'name', 'err'],
        order: ['-ts_mod'],
      }, function(err, result) {
        if (err) {
          DBG && console.error('Failed to schedule.');
          // XXX Severe error, unilkely to happen.
        } else {
          if (result && result.count > 0) {
            const resultList = _.filter(result.data, function(sieve) {
              return eaUnreadErrList[sieve.id];
            });

            if (_.size(resultList) > 0) {
              NotifyPopup.showErrorGroup(resultList);
              /*
                setTime = Date.now();
                if(!notificationCalled){
                  intervalReset();
                }
                notificationCalled = true;
                */
            }
          }
        }
      });
    },

    clearErrorUnreadList: function(argument) {
      NotifyPopup.clearErrorGroup();
      eaUnreadErrList = {};
      Prefs.set('eaUnreadErrList', {});
    },
  };
})();
