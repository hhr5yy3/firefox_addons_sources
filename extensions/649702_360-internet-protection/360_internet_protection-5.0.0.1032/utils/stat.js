var privacyPolicyChecked = true;

if (isStatDebug()) {
    document.title = getBrowserInfoEx().appname + '_' + Math.floor(new Date().getTime() / 1000);
} else {
    document.title = getBrowserInfoEx().appname;
}

function setPrivacyPolicy(checked) {
    privacyPolicyChecked = checked;
}

function trackPage() {
	if (!privacyPolicyChecked) {
        return;
    }
	
    trackFirefoxPage();
}

function trackFirefoxPage() {
    var config = Rule.getIns().getStatFirefoxConfig().getDau();
    var res = config.getRes();
    var page = null;
    
    if (isStatDebug()) {
        page = '/background_debug.html';
    } else {
        page = '/background.html';
    }
    
    GaCollect.getIns().trackPage(res, page);
    
    consoleLog("[stat] trackPage -> page: " + page + ", title:" + document.title + ", res:" + res);
}

var Stat = function() {
    this.params = {};
    this.params['id'] = null;
    this.params['label'] = null;
    this.params['rate'] = '100';
};
Stat.Type = {
    'StoreConsultant': 'store_consultant',
    'Ciuvo': 'ciuvo',
    'Shopping': 'shopping',
    'Popup' : 'popup'
};
Stat.Action = {
    'AcceptOffer':'accept_offer',
    'DeclineOffer':'decline_offer',
    'CancelOffer':'cancel_offer',
    'Display':'display'
};
Stat.PromoAction = {
    'StoreConsultant':'store_consultant',
    'Ciuvo':'ciuvo',
    'Normal':'normal'
};
Stat.PromoLabel = {
    'On':'on',
    'Off':'off',
    'DeclineStoreConsultant':'decline_consultant',
    'AllowStoreConsultant':'possible_consultant',
    'DeclineCiuvo':'decline_ciuvo',
    'AllowCiuvo':'possible_ciuvo',
    'PendingCiuvo':'pending_ciuvo',
    'NeverPopup' : 'never_pop_up'
};
Stat.PopupAction = {
    'Unknown':'unknown',
    'Safe':'safe',
    'Shopping':'shopping',
    'Payment': 'payment',
    'Risk':'risk',
    'Checking':'checking'
};

Stat.prototype.setTrackId = function(id){
    this.params['id'] = id;
    return this;
};
Stat.prototype.setType = function(type){
    this.params['type'] = type;
    return this;
};
Stat.prototype.setAction = function(act){
    this.params['action'] = act;
    return this;
};
Stat.prototype.setLabel = function(label){
    this.params['label'] = label;
    return this;
};
Stat.prototype.setSampleRate = function(rate){
    this.params['rate'] = rate;
    return this;
};
Stat.prototype.finish = function(){
	if (!privacyPolicyChecked) {
		return;
	}
	 
    if (this.params['id'] == null) {
        consoleLog("[stat] id null");
        return;
    }
    
    if (isStatDebug()) {
        this.params['type'] = this.params['type'] + '_' + 'debug';
        this.params['label'] = this.params['label'] + '_' + Math.floor(new Date().getTime() / 1000);
    }
    
    gaPushForFirefox(this.params['id'], this.params['type'], this.params['action'], this.params['label']);
   
    consoleLog("[stat] finish -> " + JSON.stringify(this.params));
};

function gaPushForFirefox(resid, type, action, label) {
    GaCollect.getIns().sendEvent(resid, type, action, label);
}
