/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
const fsPreferences={storage:{},init:function(b){chrome.storage.onChanged.addListener(function(a,c){if("local"===c){c=Object.keys(a);for(var d of c)this.storage[d]=a[d].newValue}}.bind(this));chrome.storage.local.get(null,function(a){this.storage=a;b&&b()}.bind(this))},setOption:function(b,a){var c={};c[b]=a;chrome.storage.local.set(c);this.storage[b]=a},getOption:function(b,a){return"undefined"===typeof this.storage[b]?a:this.storage[b]}};
