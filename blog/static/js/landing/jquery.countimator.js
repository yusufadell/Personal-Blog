(function($,window){"use strict";var
pluginName='countimator',defaults={count:0,value:null,min:null,max:0,duration:1000,countSelector:'.counter-count',maxSelector:'.counter-max',template:null,engine:null,animateOnInit:true,animateOnAppear:true,decimals:0,decimalDelimiter:'.',thousandDelimiter:null,pad:false,style:null,start:function(){},step:function(step){},complete:function(){}},formatNumber=function(number,decimals,decimalDelimiter,thousandDelimiter){decimals=isNaN(decimals=Math.abs(decimals))?2:decimals;decimalDelimiter=typeof decimalDelimiter==='undefined'?".":decimalDelimiter;thousandDelimiter=typeof thousandDelimiter==='undefined'?",":thousandDelimiter;thousandDelimiter=typeof thousandDelimiter==='string'?thousandDelimiter:"";var
s=number<0?"-":"",n=Math.abs(+number||0).toFixed(decimals),i=String(parseInt(n)),j=(i.length>3?i.length%3:0);return s+(j?i.substr(0,j)+thousandDelimiter:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+thousandDelimiter)+(decimals?decimalDelimiter+Math.abs(n-i).toFixed(decimals).slice(2):"");},pad=function(number,length){var str=''+number;while(str.length<length){str='0'+str;}
return str;},textNodes=function(parent){return $(parent).contents().filter(function(){return this.nodeType===3;});},inView=function(elem){var
$elem=$(elem),$window=$(window),docViewTop=$window.scrollTop(),docViewBottom=docViewTop+$window.height(),elemTop=$elem.offset().top,elemBottom=elemTop+$elem.height();return((elemBottom<=docViewBottom)&&(elemTop>=docViewTop));},requestAnimationFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};function Countimator(element,options){var
instance=this,$element=$(element),animating=false,startTime,startCount;options=$.extend({},defaults,options,$element.data());function init(){var
value=getValue(),count=getCount(),countNode,max=getMax(),maxNode,script;if(!count){countNode=getCountNode();if(countNode){if(typeof options.value!=='number'){options.value=countNode.nodeValue;}else{options.count=countNode.nodeValue;}}}
if(!max){maxNode=getMaxNode();if(maxNode){options.max=maxNode.nodeValue;}}
script=$element.find("script[type*='text/x-']");if(script.length){options.template=script.html();script.remove();}
$(window).on('resize',function(){resize.call(instance);});function scrollListener(){if(options.animateOnInit&&options.animateOnAppear&&inView(element)){$(window).off('scroll touchmove',scrollListener);start.call(instance);}}
$(window).on('scroll touchmove',scrollListener);if(options.animateOnInit){if(options.animateOnAppear&&inView(element)){options.count=typeof count==='number'?count:0;start.call(instance);}else{render.call(this);}}else{options.count=getValue();render.call(this);}
resize.call(this);}
function setOption(name,value){var
old=options[name];options[name]=value;switch(name){case 'value':if(old===value){return;}
if(typeof old!=='number'){options['count']=value;render.call(this);}else{options['count']=old;start();}
break;}}
function getMin(){var
min=parseFloat(options.min);return isNaN(min)?0:min;}
function getMax(){var
max=parseFloat(options.max);return isNaN(max)?0:max;}
function getValue(){var
max=getMax(),min=getMin(),count=getCount(),value=parseFloat(options.value);if(isNaN(value)){value=min;}
return value;}
function getCount(){var
max=getMax(),min=getMin(),count=parseFloat(options.count);if(isNaN(count)){count=min;}
return count;}
function resize(){}
function getCountNode(count){var
countElement=$element.find(options.countSelector)[0];if(!countElement){countElement=$element.find("*").last().siblings().addBack()[0];}
return textNodes(countElement||element)[0];}
function getMaxNode(count){var
maxElement=$element.find(options.maxSelector)[0];if(maxElement){return textNodes(maxElement)[0];}
return null;}
function getFormattedValue(value){var
decimals=options.decimals,decimalDelimiter=options.decimalDelimiter,thousandDelimiter=options.thousandDelimiter,string=formatNumber(value,decimals,decimalDelimiter,thousandDelimiter);string=pad(string,options.pad);return string;}
function render(){var
max=getMax(),min=getMin(),value=getValue(),count=getCount(),formattedCount=getFormattedValue(count),formattedValue=getFormattedValue(value),formattedMax=getFormattedValue(max),formattedMin=getFormattedValue(min),engine=options.engine||typeof window['Handlebars']!=='undefined'?window['Handlebars']:null,template=options.template,string,div,$template,tmpl,tmplData,nodeList,countNode,maxNode,style;try{$template=$(options.template);template=$template.length&&$template[0].innerHTML||template;}catch(e){}
if(engine&&template){tmpl=engine.compile(template);if(tmpl){tmplData=$.extend({},options,{count:formattedCount,value:formattedValue,max:formattedMax,min:formattedMin});string=tmpl(tmplData);}
div=document.createElement('div');div.innerHTML=string;nodeList=div.childNodes;$(element).contents().remove();$(element).append(nodeList);}else{countNode=getCountNode();if(countNode){countNode.nodeValue=formattedCount;}
maxNode=getMaxNode();if(maxNode){maxNode.nodeValue=formattedMax;}
if(!countNode&&!maxNode){element.innerHTML=formattedCount;}}
if(options.style){style=$.fn[pluginName].getStyle(options.style);if(style&&style.render){style.render.call(element,count,options);}}}
function animate(value){options.value=value;if(!animating){start();}}
function start(){if(!animating){startTime=new Date().getTime();startCount=getCount();animating=true;if(typeof options.start==='function'){options.start.call(element);}
requestAnimationFrame(step);}}
function step(){var
duration=options.duration,max=getMax(),value=getValue(),currentTime=new Date().getTime(),endTime=startTime+duration,currentStep=Math.min((duration-(endTime-currentTime))/duration,1),count=startCount+currentStep*(value-startCount);options.count=count;render.call(this);if(typeof options.step==='function'){options.step.call(element,count,options);}
if(currentStep<1&&animating){requestAnimationFrame(step);}else{stop.call(this);}}
function stop(){animating=false;if(typeof options.complete==='function'){options.complete.call(element);}}
this.resize=function(){resize.call(this);};this.animate=function(value){animate.call(this,value);};this.setOptions=function(opts){var old=this.getOptions();$.extend(true,options,opts);if(options.value!==old.value){start();}};this.getOptions=function(){return $.extend(true,{},options);};init.call(this);}
$.fn[pluginName]=function(options){return this.each(function(){var
opts=$.extend(true,{},options),countimator=$(this).data(pluginName);if(!countimator){$(this).data(pluginName,new Countimator(this,opts));}else{countimator.setOptions(opts);}
return $(this);});};(function(){var
styles={};$.fn[pluginName].registerStyle=function(name,def){styles[name]=def;};$.fn[pluginName].getStyle=function(name){return styles[name];};})();})(jQuery,window);