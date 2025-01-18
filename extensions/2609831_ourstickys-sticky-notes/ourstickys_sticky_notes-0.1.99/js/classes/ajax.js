var __ajax={
	_options: {
		headers: {},
		method: 'GET',
		responseType: 'json',
		params: {},
		onload: function (data){},
		onerror: function (data){}
	},
	method: function (m){
		this._options['method']=m;
		return this;
	},
	responseType: function (r){
		this._options['responseType']=r;
		return this;
	},
	headers: function (h){
		this._options['headers']=h;
		return this;
	},
	params: function (p){
		this._options['params']=p;
		return this;
	},
	open: function (url, callback, status){
		var req=new XMLHttpRequest();
		var onload=this._options['onload'];
		var onerror=this._options['onerror'];
		if(typeof callback==='function'){
			onload=callback;
			onerror=callback;
		}
		req.open(this._options['method'], url, true);
		req.responseType=this._options['responseType'];
		req.onload=function (r){
			onload(this.response, r);
		};
		req.onerror=function (r){
			onerror(this.response, r);
		};
		if(Object.keys(this._options['headers']).length>0){
			var h=this._options['headers'];
			for(var i in h){
				req.setRequestHeader(i, h[i]);
			}
		}
		if(Object.keys(this._options['params']).length>0){
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			req.send(JSON.stringify(this._options['params']));
		}else{
			req.send();
		}
		return this;
	}
};