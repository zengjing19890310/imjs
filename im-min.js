(function(g){function q(a,c){var b=this;b.file=a;b.state=1;b.dependencies=c||[];b.factory=r;b.exports=null;b._on={};b.on=function(a,c){b._on[a]=b._on[a]||[];c?b._on[a].push(c):f(b._on[a],function(a){a.call(b)})};b.on("load",function(){b.state=h.LOADED;b.loadDependencies(function(){b.state=h.COMPILING;b.compile.apply(b,n.call(arguments))})});setTimeout(function(){b.loadScript()},1)}var r=void 0,n=[].slice,f=[].forEach?function(a,c){a.forEach(c)}:function(a,c){for(var b=0,d=a.length;b<d;b++)c(a[b],
b,a)},s=function(a,c){for(var b in c)a[b]=c[b];return a},m=function(a,c){var b={}.toString,b=null===a?"null":"undefined"==typeof a&&"undefined"||b.call(a).slice(8,-1).toLowerCase();return c?b===c:b},p=function(a,c){if("console"in g)console[c||"log"](a)},j={normalize:function(a){var c="";a=a.replace(/^\w+:\/\/\/?/,function(a){c=a;return""});if(-1===a.indexOf("."))return c+a;for(var b=a.split("/"),d=[],e,f=0;f<b.length;f++)if(e=b[f],""!=e)if(".."===e){if(0===d.length)throw Error("The path is invalid: "+
a);d.pop()}else"."!==e&&d.push(e);return c+d.join("/").replace(":80/","/")},dirname:function(a){return!a.match(/\//)?"./":a.replace(/\/[^\/]+\/?$/g,"")},isAP:function(a){return!!a.match(/^\w+:\/\//)}},h={LOADING:1,SAVED:2,LOADED:3,COMPILING:4,COMPILED:5},t={tag:"?t="+ +new Date},u=function(){var a=document;if(a.currentScript)return a.currentScript.src;for(var a=a.getElementsByTagName("script"),c=a.length-1;-1<c;c--)if("interactive"===a[c].readyState)return a[c].src;var b;try{arguments.length()}catch(d){b=
d.stack||g.opera&&((d+"").match(/of linked script \S+/g)||[]).join(" ")}b=b.split(/[@ ]/g).pop();return b.replace(/(:\d+)?:\d+(\s)?$/i,"")},k=u(),v=(location.href+"").replace(/(\?|#).*$/i,""),k=j.isAP(k)?k:j.dirname(v)+"/"+k;s(q.prototype,{loadScript:function(){var a=document,c=this,b=a.getElementsByTagName("head")[0]||a.documentElement,d=a.createElement("script");d.type="text/javascript";d.async=!0;d.src=this.file;d.onerror=function(){p("Imjs: load file "+c.file+" error! ","error");l.remove(c.file)};
d.onload=d.onreadystatechange=function(){if(!d.readyState||/loaded|complete/.test(d.readyState))c.on("load"),d&&(d.onerror=d.onload=d.onreadystatechange=null),b&&d.parentNode&&b.removeChild(d),d=r};b.insertBefore(d,b.firstChild)},compile:function(){var a=this.factory;this.exports=m(a,"function")?a.apply(this,n.call(arguments)):a;this.state=h.COMPILED;this.on("compile")},loadDependencies:function(a){l.load(this.dependencies,a)}});var l={data:{},set:function(a,c){this.data[a]=c},get:function(a){return this.data[a]},
remove:function(a){delete this.data[a]},exports:function(a){var c=this,b=[];f(a,function(a){a=c.get(a);b.push(a&&a.exports)});return b},isComplete:function(a){var c=this,b=1;f(a,function(a){a=c.data[a];if(!a||a.state<h.COMPILED)b=0});return b},realpaths:function(a){var c=[];m(a,"array")||(a=[a]);f(a,function(a){a=(a||"").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"");j.isAP(a)||(a=j.normalize(j.dirname(k)+"/"+a));c.push(a)});return c},load:function(a,c){var b=this;a=b.realpaths(a);f(a,function(b,c){/\.js$/.test(b)||
(b+=".js");a[c]=b+""+t.tag});0==a.length?c():f(a,function(d){var e=b.get(d);e||(e=new q(d),b.set(d,e));if(5>e.state)e.on("compile",function(){b.isComplete(a)&&c.apply(null,b.exports(a))});else b.isComplete(a)&&c.apply(null,b.exports(a))})}};g.define=function(a,c){var b=u(),d=l.get(b),e=arguments;d?(1==e.length&&m(a,"function")?(c=a,d.dependencies=[]):d.dependencies=a||[],d.factory=c,d.state=h.SAVED,d.on("save")):p("Can't find module:"+b,"error")};g.require=function(a,c){1<arguments.length?l.load(a||
[],function(){c.apply(this,n.call(arguments))}):m(a,"function")&&a()};g.Im={modules:l.data,im:"1.0",log:p,config:function(a){return s(t,a||{})}}})(this);
