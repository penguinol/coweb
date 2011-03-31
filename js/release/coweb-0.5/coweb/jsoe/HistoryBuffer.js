define(["coweb/jsoe/factory","coweb/jsoe/Operation"],function(a,b){var c=function(){this.ops={},this.size=0};c.prototype.getState=function(){var a=[],b=0;for(var c in this.ops)this.ops.hasOwnProperty(c)&&(a[b]=this.ops[c].getState(),++b);return a},c.prototype.setState=function(b){this.size=0,this.ops={};for(var c=0;c<b.length;c++){var d=a.createOperationFromState(b[c]);this.addLocal(d)}},c.prototype.getOpsForDifference=function(a){var b=a.getHistoryBufferKeys(),c=[];for(var d=0,e=b.length;d<e;d++){var f=b[d],g=this.ops[f];if(g===undefined)throw new Error("missing op for context diff: i="+d+" key="+f+" keys="+b.toString());c.push(g)}c.sort(function(a,b){return a.compareByOrder(b)});return c},c.prototype.addLocal=function(b){var c=a.createHistoryKey(b.siteId,b.seqId);this.ops[c]=b,b.immutable=!0,++this.size},c.prototype.addRemote=function(b){var c=a.createHistoryKey(b.siteId,b.seqId),d=this.ops[c];if(b.order===null||b.order===undefined||b.order===Infinity)throw new Error("remote op missing total order");if(d){if(d.order!==Infinity)throw new Error("duplicate op in total order: old="+d.order+"new="+b.order);d.order=b.order}else this.ops[c]=b,b.immutable=!0,++this.size},c.prototype.remove=function(b){var c=a.createHistoryKey(b.siteId,b.seqId);b=this.ops[c],delete this.ops[c],b.immutable=!1,--this.size;return b},c.prototype.getCount=function(){return this.size},c.prototype.getContextSortedOperations=function(){var a=[];for(var b in this.ops)this.ops.hasOwnProperty(b)&&a.push(this.ops[b]);a.sort(function(a,b){return a.compareByContext(b)});return a};return c})