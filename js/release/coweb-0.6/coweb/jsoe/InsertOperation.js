define(["coweb/jsoe/Operation","coweb/jsoe/factory"],function(a,b){var c=function(b){this.type="insert",a.call(this,b)};c.prototype=new a,c.prototype.constructor=c,b.registerOperationForType("insert",c),c.prototype.transformMethod=function(){return"transformWithInsert"},c.prototype.transformWithUpdate=function(a){return this},c.prototype.transformWithInsert=function(a){if(this.key!==a.key)return this;(this.position>a.position||this.position===a.position&&this.siteId<=a.siteId)&&++this.position;return this},c.prototype.transformWithDelete=function(a){if(this.key!==a.key)return this;this.position>a.position&&--this.position;return this};return c})