/*TMODJS:{"debug":true,"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^\/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^\/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:1*/
    template("copyright", "(c) 2013"), /*v:1*/
    template("footer", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), time = $data.time, $escape = $utils.$escape, include = function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }, $out = "";
            return $out += '<div id="footer"> ', $line = 2, time && ($out += " <p class='time'>", 
            $line = 3, $out += $escape(time), $out += "</p> ", $line = 4), $out += " ", $line = 5, 
            include("./copyright"), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: "<div id=\"footer\">\n{{if time}}\n	<p class='time'>{{time}}</p>\n{{/if}}\n{{include './copyright'}}\n</div>".split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    }), /*v:1*/
    template("header", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), include = function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }, $out = "";
            return $out += ' <div id="header"> ', $line = 3, include("./logo"), $out += ' <ul id="nav"> <li><a href="http://www.qq.com">首页</a></li> <li><a href="http://news.qq.com/">新闻</a></li> <li><a href="http://pp.qq.com/">图片</a></li> <li><a href="http://mil.qq.com/">军事</a></li> </ul> </div>  ', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<!-- 头部 开始 -->\n<div id="header">\n	{{include \'./logo\'}}\n	<ul id="nav">\n	    <li><a href="http://www.qq.com">首页</a></li>\n	    <li><a href="http://news.qq.com/">新闻</a></li>\n	    <li><a href="http://pp.qq.com/">图片</a></li>\n	    <li><a href="http://mil.qq.com/">军事</a></li>\n	</ul>\n</div>\n<!-- 头部 结束 --> '.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    }), /*v:1*/
    template("logo", ' <h1 id="logo"> <a href="http://www.qq.com"> <img width=\'134\' height=\'44\' src="http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png" alt="腾讯网" /> </a> </h1> '), 
    /*v:12*/
    template("main", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), include = function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }, $escape = $utils.$escape, title = $data.title, $each = $utils.$each, list = $data.list, $out = ($data.$value, 
            $data.$index, "");
            return $out += " ", $line = 2, include("./header"), $out += ' <div id="main"> <h3>', 
            $line = 5, $out += $escape(title), $out += "</h3> <ul> ", $line = 7, $each(list, function($value) {
                $out += ' <li><a href="', $line = 8, $out += $escape($value.url), $out += '">', 
                $line = 8, $out += $escape($value.title), $out += "</a></li> ", $line = 9;
            }), $out += " </ul> </div> ", $line = 13, include("./footer"), $out += " ", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: "\n    {{include './header'}}\n\n    <div id=\"main\">\n        <h3>{{title}}</h3>\n        <ul>\n            {{each list}}\n            <li><a href=\"{{$value.url}}\">{{$value.title}}</a></li>\n            {{/each}}\n        </ul>\n    </div>\n\n    {{include './footer'}} ".split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();