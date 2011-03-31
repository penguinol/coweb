define(["coweb/jsoe/ContextVectorTable","coweb/jsoe/ContextVector","coweb/jsoe/HistoryBuffer","coweb/jsoe/factory","coweb/jsoe/UpdateOperation","coweb/jsoe/InsertOperation","coweb/jsoe/DeleteOperation"],function(a,b,c,d){var e=function(d){this.siteId=d,this.cv=new b({count:d+1}),this.cvt=new a(this.cv,d),this.hb=new c};e.prototype.getState=function(){var a=this.cvt.getEquivalents(this.cv,this.siteId);return[this.cvt.getState(),this.hb.getState(),this.siteId,a]},e.prototype.setState=function(a){this.cvt.setState(a[0]),this.hb.setState(a[1]),this.cv=this.cvt.getContextVector(a[2]),this.cv=this.cv.copy(),this.cvt.updateWithContextVector(this.siteId,this.cv);var b=a[3];for(var c=0;c<b.length;c++)this.freezeSite(b[c])},e.prototype.copyContextVector=function(){return this.cv.copy()},e.prototype.createOp=function(a,c,e,f,g,h,i,j){var k;a?k={key:c,position:g,value:e,siteId:this.siteId,contextVector:this.copyContextVector()}:(i=new b({sites:i}),k={key:c,position:g,value:e,siteId:h,contextVector:i,order:j});return d.createOperationFromType(f,k)},e.prototype.push=function(a,b,c,d,e,f,g,h){var i=this.createOp(a,b,c,d,e,f,g,h);return a?this.pushLocalOp(i):this.pushRemoteOp(i)},e.prototype.pushLocalOp=function(a){this.cv.setSeqForSite(a.siteId,a.seqId),this.hb.addLocal(a);return a},e.prototype.pushRemoteOp=function(a){var b=null;if(this.hasProcessedOp(a)){this.hb.addRemote(a);return null}if(this.cv.equals(a.contextVector))b=a.copy();else{var c=this.cv.subtract(a.contextVector);a.immutable=!0,b=this._transform(a,c)}this.cv.setSeqForSite(a.siteId,a.seqId),this.hb.addRemote(a),this.cvt.updateWithOperation(a);return b},e.prototype.pushSync=function(a,b){this.cvt.updateWithContextVector(a,b)},e.prototype.pushSyncWithSites=function(a,c){var d=new b({state:c});this.pushSync(a,d)},e.prototype.purge=function(){if(this.getBufferSize()===0)return null;var a=this.cvt.getMinimumContextVector();if(a===null)return null;var b,c=this.cv.oldestDifference(a),d=this.hb.getOpsForDifference(c);while(d.length){var e=d.pop();if(b===undefined||e.compareByContext(b)===-1)c=this.cv.oldestDifference(e.contextVector),d=d.concat(this.hb.getOpsForDifference(c)),b=e}d=this.hb.getContextSortedOperations();for(var f=0;f<d.length;f++){var g=d[f];if(b===undefined||(b.siteId!==g.siteId||b.seqId!==g.seqId))this.hb.remove(g);else break}return a},e.prototype.getBufferSize=function(){return this.hb.getCount()},e.prototype.hasProcessedOp=function(a){var b=this.cv.getSeqForSite(a.siteId);return b>=a.seqId},e.prototype.freezeSite=function(a){this.cvt.updateWithContextVector(a,this.cv)},e.prototype.thawSite=function(a){if(a!==this.siteId){var b=this.cvt.getMinimumContextVector();b.growTo(a),this.cvt.updateWithContextVector(a,b)}},e.prototype._transform=function(a,b){var c=this.hb.getOpsForDifference(b);a=a.copy();for(var d=0;d<c.length;d++){var e=c[d];if(!a.contextVector.equals(e.contextVector)){var f=a.contextVector.subtract(e.contextVector),g=this._transform(e,f);if(g===null){a.contextVector.setSeqForSite(e.siteId,e.seqId);continue}e=g}a=a[e.transformMethod()](e);if(a===null)return null;a.contextVector.setSeqForSite(e.siteId,e.seqId)}return a};return e})