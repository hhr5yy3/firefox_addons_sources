/*
 * code to help with repetitive tasks like
 *  - adding an option to a select
 *  - empty an element
 *  - select documentid
 *  - etc..
 * This does not want to be a replacement for jQUERY
 */
function i18n(messageName, substitutions){
	var ret=chrome.i18n.getMessage(messageName, substitutions);
	return typeof ret==='undefined'?'':ret;
}
function createElement(type, options){
	var e=$(document.createElement(type)).attr(options);
	return e;
}
function $(el){
	var e=el;
	if(typeof el==='string'){
		e=document.getElementById(el);
	}
	if(e){
		e.addOption=function (options){
			var d=this, o=new Option();
			for(var i in options){
				o[i]=options[i];
			}
			d.options.add(o);
			return this;
		};
		e.appendChildren=function (children){
			var d=this;
			for(var k in children){
				d.appendChild(children[k]);
			}
			return this;
		};
		e.attr=function (options){
			var d=this;
			if(typeof options==='string'){
				return d.hasAttribute(options)?d.getAttribute(options):undefined;
			}else{
				for(var i in options){
					switch(i){
						case 'addOption':
							d.addOption(options[i]);
							break;
						case 'addOptions':
							for(var k in options[i]){
								d.addOption(options[i][k]);
							}
							break;
						case 'appendChild':
							d.appendChild(options[i]);
							break;
						case 'appendChildren':
							for(var k in options[i]){
								d.appendChild(options[i][k]);
							}
							break;
						case 'data':
							d.data(options[i]);
							break;
						default:
							if(typeof options[i]==='object'){
								for(var k in options[i]){
									d[i][k]=(options[i][k]);
								}
							}else{
								d[i]=options[i];
							}
					}
				}
				return this;
			}
		};
		e.data=function (options){
			var d=this, ret;
			if(typeof options==='string'){
				ret=d.dataset[options];
			}else{
				for(var i in options){
					d.dataset[i]=options[i];
				}
				ret=this;
			}
			return ret;
		};
		e.empty=function (){
			var d=this;
			while(d.firstChild){
				d.removeChild(d.firstChild);
			}
			if(d.options&&d.nodeName&&d.nodeName.toLowerCase==='select'){
				d.options.length=0;
			}
			return this;
		};
		e.parent=function (){
			var d=this;
			var ret;
			if(d.parentNode){
				ret=d.parentNode;
			}
			return ret;
		};
		e.remove=function (){
			var d=this;
			if(d.parentNode){
				d.parentNode.removeChild(d);
			}
			return this;
		};
		e.removeAttr=function (attribute){
			var d=this;
			if(d.hasAttribute(attribute)){
				d.removeAttribute(attribute);
			}
			return this;
		};
	}
	return e;
}