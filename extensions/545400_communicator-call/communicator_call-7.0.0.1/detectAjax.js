var _send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function() {
    var callback = this.onreadystatechange;
    this.onreadystatechange = function() {         
         if (this.readyState == 4) {
             window.dispatchEvent(new CustomEvent("refreshClickToDial", {data: 'refresh click to dial'}));
         }
         if (callback !== null)
         	callback.apply(this, arguments);
    }
    if (_send !== null)
    	_send.apply(this, arguments);
}