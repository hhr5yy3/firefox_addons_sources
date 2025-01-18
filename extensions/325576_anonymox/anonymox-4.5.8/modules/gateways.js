/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/
var base = base || {};

base.Gateways = (function () {
	var pub;
	var gatewayCache;

	const selfCheckDelay = 150;
	var selfCheckQueue = [];
	var selfCheckRunning = true;
	var selfCheckTimeout = setTimeout(processSelfcheckQueue, selfCheckDelay);

	function processSelfcheckQueue() {
		selfCheckRunning = true;
		if (selfCheckQueue.length > 0) {
			var next = selfCheckQueue.shift();
			base.Network.selfCheckGW(next);
			selfCheckTimeout = setTimeout(processSelfcheckQueue, selfCheckDelay);
		} else {
			selfCheckRunning = false;
		}
	}

	pub = {
		set list(gatewayList) {
			gatewayCache = gatewayList;

			base.Profiles.assignGateways();
			base.Tabs.refreshCache();

			for (const gateway of gatewayList) {
				pub.enqueueGWForSelfCheck(gateway);
			}
		},

		get list() {
			return gatewayCache;
		},

		enqueueGWForSelfCheck : function(gateway) {
			selfCheckQueue.push(gateway);
			if (!selfCheckRunning) {
				selfCheckTimeout = setTimeout(processSelfcheckQueue, selfCheckDelay);
			}
		},

		updateSelfcheckStatus : function(gateway, success, latency, direct) {

			if (!success) {
				if (direct) {
					gateway.selfcheckFailed = true;
					delete gateway.latency;
					base.Profiles.assignGateways();
				}
			}

			else {
				gateway.latency = latency;
				if (gateway.selfcheckFailed) {
					gateway.selfcheckFailed = false;
					base.Profiles.assignGateways();
				}
			}
		}
	};

	return pub;
})();
