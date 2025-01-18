(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';class c{get(a,b){browser.storage.local.get(a).then(b,()=>b(null))}set(a){browser.storage.local.set(a)}};{var d=new c;const a=new URLSearchParams(window.location.search),b=(parseInt(a.get("authuser"),10)||"0")+"";d.set({authuser:b})};}).call(this);
