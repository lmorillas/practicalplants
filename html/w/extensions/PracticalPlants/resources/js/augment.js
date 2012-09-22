// augment.js JavaScript 1.8.5 methods for all, version: 0.4.2
// using snippets from Mozilla - https://developer.mozilla.org/en/JavaScript
// (c) 2011 Oliver Nightingale
//
//  Released under MIT license.
//
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
Array.prototype.every||(Array.prototype.every=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)if(e in b&&!a.call(d,b[e],e,b))return!1;return!0}),Array.prototype.filter||(Array.prototype.filter=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=[],e=arguments[1];for(var f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),Array.prototype.forEach||(Array.prototype.forEach=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)e in b&&a.call(d,b[e],e,b)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(c===0)return-1;var d=0;arguments.length>0&&(d=Number(arguments[1]),d!==d?d=0:d!==0&&d!==Infinity&&d!==-Infinity&&(d=(d>0||-1)*Math.floor(Math.abs(d))));if(d>=c)return-1;var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++)if(e in b&&b[e]===a)return e;return-1}),Array.isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"},Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(c===0)return-1;var d=c;arguments.length>1&&(d=Number(arguments[1]),d!==d?d=0:d!==0&&d!==Infinity&&d!==-Infinity&&(d=(d>0||-1)*Math.floor(Math.abs(d))));var e=d>=0?Math.min(d,c-1):c-Math.abs(d);for(;e>=0;e--)if(e in b&&b[e]===a)return e;return-1}),Array.prototype.map||(Array.prototype.map=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=new Array(c),e=arguments[1];for(var f=0;f<c;f++)f in b&&(d[f]=a.call(e,b[f],f,b));return d}),Array.prototype.reduce||(Array.prototype.reduce=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;if(c==0&&arguments.length==1)throw new TypeError;var d=0,e;if(arguments.length>=2)e=arguments[1];else do{if(d in b){e=b[d++];break}if(++d>=c)throw new TypeError}while(!0);while(d<c)d in b&&(e=a.call(undefined,e,b[d],d,b)),d++;return e}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;if(c===0&&arguments.length===1)throw new TypeError;var d=c-1,e;if(arguments.length>=2)e=arguments[1];else do{if(d in this){e=this[d--];break}if(--d<0)throw new TypeError}while(!0);while(d>=0)d in b&&(e=a.call(undefined,e,b[d],d,b)),d--;return e}),Array.prototype.some||(Array.prototype.some=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)if(e in b&&a.call(d,b[e],e,b))return!0;return!1}),Date.now||(Date.now=function(){return+(new Date)}),Date.prototype.toISOString||(Date.prototype.toISOString=function(){var a=function(b,c){return c=c||2,(b+="",b.length===c)?b:a("0"+b,c)};return function(){var b=this.getUTCFullYear();b=(b<0?"-":b>9999?"+":"")+("00000"+Math.abs(b)).slice(0<=b&&b<=9999?-4:-6);var c=[b,a(this.getUTCMonth()+1),a(this.getUTCDate())].join("-"),d=[a(this.getUTCHours()),a(this.getUTCMinutes()),a(this.getUTCSeconds())].join(":")+"."+a(this.getUTCMilliseconds(),3);return[c,d].join("T")+"Z"}}()),Date.prototype.toJSON||(Date.prototype.toJSON=Date.prototype.toJSON),Function.prototype.bind||(Function.prototype.bind=function(a){if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice,c=b.call(arguments,1),d=this,e=function(){},f=function(){if(e.prototype&&this instanceof e){var f=d.apply(new e,c.concat(b.call(arguments)));return Object(f)===f?f:d}return d.apply(a,c.concat(b.call(arguments)))};return e.prototype=d.prototype,f.prototype=new e,f}),function(){"use strict";var a=function(a){if(a!==Object(a))throw new TypeError("Object.getPrototypeOf called on non-object")};Object.getPrototypeOf||(typeof "test".__proto__=="object"?Object.getPrototypeOf=function(b){return a(b),b.__proto__}:Object.getPrototypeOf=function(b){return a(b),b.constructor.prototype})}(),Object.keys||(Object.keys=function(){var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if(typeof e!="object"&&typeof e!="function"||e===null)throw new TypeError("Object.keys called on non-object");var f=[];for(var g in e)a.call(e,g)&&f.push(g);if(b)for(var h=0;h<d;h++)a.call(e,c[h])&&f.push(c[h]);return f}}()),String.prototype.trim||(String.prototype.trim=function(){var a=/^\s+/,b=/\s+$/;return function(){return this.replace(a,"").replace(b,"")}}());