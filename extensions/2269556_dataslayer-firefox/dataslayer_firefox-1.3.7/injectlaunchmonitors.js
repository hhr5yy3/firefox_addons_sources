var launchMonitorScript = `
console.log('** dataslayer: injecting Launch monitors **');
window._satellite = window._satellite || {};
window._satellite._monitors = window._satellite._monitors || [];
window._satellite._monitors.push({
  ruleTriggered: function(e) {
    window.parent.postMessage(
      {
        type: 'dataslayer_launchruletriggered',
        url: window == window.parent ? window.location.href : 'iframe',
        data: JSON.parse(JSON.stringify(e.rule)),
      },
      '*'
    );
  },
  ruleCompleted: function(e) {
    // console.log('** dataslayer: Launch rule completed **', e.rule);
    var rule = JSON.parse(JSON.stringify(e.rule));
    var sendRule = function() {
        if (window.dataslayer) {
            window.parent.postMessage(
                {
                    type: 'dataslayer_launchrulecompleted',
                    url: window == window.parent ? window.location.href : 'iframe',
                    data: rule,
                },
                '*'
            );       
            // console.log('** dataslayer: posted rule '+rule+'**'); 
        } else {
            if (document.readyState === 'complete') {
                // console.log('** dataslayer: giving up on launch **');
                window._dataslayerQueue = window._dataslayerQueue || [];
                window._dataslayerQueue.push({
                  type: 'dataslayer_launchrulecompleted',
                  url: window == window.parent ? window.location.href : 'iframe',
                  data: rule,
                });
                return;
            } else {
                // console.log('** dataslayer: waiting 250ms to repost rule **');
                window.setTimeout(sendRule, 250);
            }
        }
    }
    sendRule();
    if (
      window._satellite &&
      window._satellite._container &&
      window._satellite._container.dataElements
    ) {
      var elementNames = Object.keys(
        window._satellite._container.dataElements
      ).sort(function(a, b) {
        var nameA = a.toUpperCase();
        var nameB = b.toUpperCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });

      let launchElements = {};

      for (var i = 0; i < elementNames.length; i++) {
        var newElement = JSON.parse(
          JSON.stringify(
            window._satellite._container.dataElements[elementNames[i]]
          )
        );
  
        let cleanValue = window._satellite.getVar(elementNames[i]);
        if (typeof cleanValue === 'function') {
          cleanValue = '(function)';
        } else if (
          typeof cleanValue === 'object' &&
          typeof cleanValue.then === 'function'
        ) {
          cleanValue = '(Promise)';
        }
        launchElements[elementNames[i]] = cleanValue;
        // launchElements.push({
        //   key: elementNames[i],
        //   value: cleanValue,
        //   element: newElement,
        // });
      }
      try {
        window.parent.postMessage(
          {
            type: 'dataslayer_launchdataelements',
            data: 'found',
            url: window == window.parent ? window.location.href : 'iframe',
            elements: launchElements
          },
          '*'
        );
      } catch (e) {
        console.warn(e);
      }
  
    }
  },
  ruleConditionFailed: function(e) {
    window.parent.postMessage(
      {
        type: 'dataslayer_launchrulefailed',
        url: window == window.parent ? window.location.href : 'iframe',
        data: JSON.parse(JSON.stringify(e.rule)),
      },
      '*'
    );
  },
});
`;

if (!document.querySelector('#dataslayerLaunchMonitors')) {
  if (/html/i.test(document.contentType)) {
    var dsLaunchMonitors = document.createElement('script');
    dsLaunchMonitors.id = 'dataslayerLaunchMonitors';
    //dsLaunchMonitors.type = 'text/javascript';
    dsLaunchMonitors.textContent = launchMonitorScript;
    if (document.head) {
      document.head.appendChild(dsLaunchMonitors);
    } else {
      var dsLaunchMonitorTimer = window.setInterval(() => {
        if (document.head) {
          document.head.appendChild(dsLaunchMonitors);
          window.clearInterval(dsLaunchMonitorTimer);
        } else if (document.readyState === 'complete') {
          window.clearInterval(dsLaunchMonitorTimer);
        }
      }, 50);
    }
  }
}
