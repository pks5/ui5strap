/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./_Batch","./_Helper"],function(q,_,a){"use strict";var f={"Content-Type":"application/json;charset=UTF-8;IEEE754Compatible=true"},p={"Accept":"application/json;odata.metadata=minimal;IEEE754Compatible=true"},P={"Accept":"application/json;odata.metadata=minimal;IEEE754Compatible=true","OData-MaxVersion":"4.0","OData-Version":"4.0","X-CSRF-Token":"Fetch"};function d(r,G){var b=r.mBatchQueue[G];if(b[0].length===0&&b.length===1){delete r.mBatchQueue[G];}}function g(h){var r;h=h.toLowerCase();for(r in this.headers){if(r.toLowerCase()===h){return this.headers[r];}}}function R(s,h,Q){this.mBatchQueue={};this.mHeaders=h||{};this.sQueryParams=a.buildQuery(Q);this.oSecurityTokenPromise=null;this.sServiceUrl=s;}R.prototype.cancelPatch=function(G){var b=this.mBatchQueue[G],e=new Error("Group '"+G+"' canceled"),c,i;if(!b){return;}e.canceled=true;c=b[0];b[0]=[];for(i=c.length-1;i>=0;i--){if(c[i].method==="PATCH"){c[i].$reject(e);}else{b[0].push(c[i]);}}d(this,G);};R.prototype.getServiceUrl=function(){return this.sServiceUrl;};R.prototype.hasPendingChanges=function(){var b,c,G,i;for(G in this.mBatchQueue){b=this.mBatchQueue[G];c=b[0];for(i=0;i<c.length;i++){if(c[i].method==="PATCH"){return true;}}}return false;};R.prototype.refreshSecurityToken=function(){var t=this;if(!this.oSecurityTokenPromise){this.oSecurityTokenPromise=new Promise(function(r,b){q.ajax(t.sServiceUrl+t.sQueryParams,{method:"HEAD",headers:{"X-CSRF-Token":"Fetch"}}).then(function(D,T,j){t.mHeaders["X-CSRF-Token"]=j.getResponseHeader("X-CSRF-Token");t.oSecurityTokenPromise=null;r();},function(j,T,e){t.oSecurityTokenPromise=null;b(a.createError(j));});});}return this.oSecurityTokenPromise;};R.prototype.removePatch=function(o){var b,c,e,G,i;for(G in this.mBatchQueue){b=this.mBatchQueue[G];c=b[0];for(i=0;i<c.length;i++){if(c[i].$promise===o){e=new Error();e.canceled=true;c[i].$reject(e);c.splice(i,1);d(this,G);return;}}}};R.prototype.request=function(m,r,G,h,o,i){var t=this,b,I=r==="$batch",s,c,e;G=G||"$direct";if(I){b=_.serializeBatchRequest(o);s=b.body;}else{s=JSON.stringify(o);if(G!=="$direct"){c=new Promise(function(j,k){var l=t.mBatchQueue[G];if(!l){l=t.mBatchQueue[G]=[[]];}e={method:m,url:r,headers:q.extend({},p,t.mHeaders,h,f),body:s,$reject:k,$resolve:j};if(m==="GET"){l.push(e);}else{l[0].push(e);}});e.$promise=c;return c;}}return new Promise(function(j,k){q.ajax(t.sServiceUrl+r+(I?t.sQueryParams:""),{data:s,headers:q.extend({},P,t.mHeaders,h,I?b.headers:f),method:m}).then(function(o,T,l){t.mHeaders["X-CSRF-Token"]=l.getResponseHeader("X-CSRF-Token")||t.mHeaders["X-CSRF-Token"];if(I){o=_.deserializeBatchResponse(l.getResponseHeader("Content-Type"),o);}j(o);},function(l,T,E){var C=l.getResponseHeader("X-CSRF-Token");if(!i&&l.status===403&&C&&C.toLowerCase()==="required"){t.refreshSecurityToken().then(function(){j(t.request(m,r,G,h,o,true));},k);}else{k(a.createError(l));}});});};R.prototype.submitBatch=function(G){var c=[],o,r=this.mBatchQueue[G];function v(r,b){var C;r.forEach(function(e,i){var E,h=b[i];if(Array.isArray(e)){v(e,h);}else if(h){if(h.status>=400){h.getResponseHeader=g;C=a.createError(h);e.$reject(C);}else{e.$resolve(JSON.parse(h.responseText));}}else{E=new Error("HTTP request was not processed because the previous request failed");E.cause=C;e.$reject(E);}});}if(!r){return Promise.resolve();}delete this.mBatchQueue[G];r[0].forEach(function(C){if(o&&o.method==="PATCH"&&C.method==="PATCH"&&o.url===C.url&&q.sap.equal(o.headers,C.headers)){o.body=JSON.stringify(q.extend(JSON.parse(o.body),JSON.parse(C.body)));C.$resolve(o.$promise);}else{c.push(C);o=C;}});if(c.length===0){r.splice(0,1);}else if(c.length===1){r[0]=c[0];}else{r[0]=c;}return this.request("POST","$batch",undefined,undefined,r).then(v.bind(null,r)).catch(function(e){var b=new Error("HTTP request was not processed because $batch failed");function h(r){r.forEach(function(i){if(Array.isArray(i)){h(i);}else{i.$reject(b);}});}b.cause=e;h(r);throw e;});};return{create:function(s,h,Q){return new R(s,h,Q);}};},false);