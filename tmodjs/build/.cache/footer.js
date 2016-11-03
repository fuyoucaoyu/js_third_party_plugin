/*TMODJS:{"debug":true,"version":1,"md5":"6094d54cc25cb8a36057e522f603c2dc"}*/
template('footer',function($data,$filename
/**/) {
try{'use strict';var $utils=this,$helpers=$utils.$helpers,$line=0,time=$data.time,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div id="footer"> ';
$line=2;if(time){
$out+=' <p class=\'time\'>';
$line=3;$out+=$escape(time);
$out+='</p> ';
$line=4;}
$out+=' ';
$line=5;include('./copyright');
$out+=' </div>';
return new String($out);}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:'<div id="footer">\n{{if time}}\n	<p class=\'time\'>{{time}}</p>\n{{/if}}\n{{include \'./copyright\'}}\n</div>'.split(/\n/)[$line-1].replace(/^\s+/,'')};}
});