/*TMODJS:{"debug":true,"version":12,"md5":"f019c431a271f73efb4133745bdf2b87"}*/
template('main',function($data,$filename
/**/) {
try{'use strict';var $utils=this,$helpers=$utils.$helpers,$line=0,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$escape=$utils.$escape,title=$data.title,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$out='';$out+=' ';
$line=2;include('./header');
$out+=' <div id="main"> <h3>';
$line=5;$out+=$escape(title);
$out+='</h3> <ul> ';
$line=7;$each(list,function($value,$index){
$out+=' <li><a href="';
$line=8;$out+=$escape($value.url);
$out+='">';
$line=8;$out+=$escape($value.title);
$out+='</a></li> ';
$line=9;});
$out+=' </ul> </div> ';
$line=13;include('./footer');
$out+=' ';
return new String($out);}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:'\n    {{include \'./header\'}}\n\n    <div id="main">\n        <h3>{{title}}</h3>\n        <ul>\n            {{each list}}\n            <li><a href="{{$value.url}}">{{$value.title}}</a></li>\n            {{/each}}\n        </ul>\n    </div>\n\n    {{include \'./footer\'}} '.split(/\n/)[$line-1].replace(/^\s+/,'')};}
});