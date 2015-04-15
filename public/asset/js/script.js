$(function(){

	if ( $('form').length > 0 ) {

		form.init( $('form') );

		$('form').submit(function(e){

			e.preventDefault();
			form.submit();
		});
	}
});

var lib = lib || {};

lib.namespace = function(ns_string) {
    var parts = ns_string.split('.'),
        parent = lib,
        i;
    if (parts[0] === "lib") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i++) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};


(function($) {
    "use strict";
    var tmpl = function(str, data) {
        var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str)) : new Function(tmpl.arg + ',tmpl', "var _e=tmpl.encode" + tmpl.helper + ",_s='" +
            str.replace(tmpl.regexp, tmpl.func) + "';return _s;");
        return data ? f(data, tmpl) : function(data) {
            return f(data, tmpl);
        };
    };
    tmpl.cache = {};
    tmpl.load = function(id) {
        return document.getElementById(id).innerHTML;
    };
    tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
    tmpl.func = function(s, p1, p2, p3, p4, p5) {
        if (p1) {
            return {
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                " ": " "
            }[p1] || "\\" + p1;
        }
        if (p2) {
            if (p2 === "=") {
                return "'+_e(" + p3 + ")+'";
            }
            return "'+(" + p3 + "==null?'':" + p3 + ")+'";
        }
        if (p4) {
            return "';";
        }
        if (p5) {
            return "_s+='";
        }
    };
    tmpl.encReg = /[<>&"'\x00]/g;
    tmpl.encMap = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;",
        "'": "&#39;"
    };
    tmpl.encode = function(s) {
        return (s == null ? "" : "" + s).replace(tmpl.encReg, function(c) {
            return tmpl.encMap[c] || "";
        });
    };
    tmpl.arg = "o";
    tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" + ",include=function(s,d){_s+=tmpl(s,d);}";
    if (typeof define === "function" && define.amd) {
        define(function() {
            return tmpl;
        });
    } else {
        $.tmpl = tmpl;
    }
}(lib));


lib.log = function(o) {
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        alert(o);
        return;
    }
    var e = new Error();
    if (e.stack) {
        console.log("Callstack:\n" + e.stack.split("\n").slice(2).join("\n"));
    }
    console.log(o);
};


lib.event = (function() {
    var callbacks = {};
    return {
        register: function(event, fn) {
            if (typeof callbacks[event] === "undefined") {
                callbacks[event] = [];
            }
            callbacks[event].push(fn);
        },
        registerOne: function(event, fn) {
            fn.one = true;
            lib.event.register(event, fn);
        },
        trigger: function(event) {
            if (typeof callbacks[event] === "undefined") {
                return;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            callbacks[event].forEach(function(fn, key) {
                if (typeof fn === "function") {
                    fn.apply(null, args);
                    if (fn.one) delete(callbacks[event][key]);

                }
            });
        }
    }
})();


lib.loading = (function(){

	var ll = lib.tmpl('<div id="loading-spinner">\
		<svg class="spinner" width="20px" height="20px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\
		   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\
		</svg>\
		<span class="text">{%= o.text %}</span>\
	</div>');

    return {
		'show' : function(text){
			text = (typeof text == 'undefined') ? '\u8cc7\u6599\u8655\u7406\u4e2d\uff0c\u8acb\u7a0d\u5019\u002e\u002e\u002e' : text;
			$('body').append( ll({text:text}) );

			$('#loading-spinner').css('width',
				Math.max(100, parseInt($('#loading-spinner .text').width(), 10) + 80)
			);
		},

		'hide' : function(){
			$('#loading-spinner').remove();
		}
	}
})();




/*
var ui = ui || {};


ui.modal = (function() {

    return {

        close: function() {
			$('body').css('overflow', 'auto');
			bootbox.hideAll();
		},

		html : function(title, html, _w, _h) {

			if (!_w) _w = 640;
			if (!_h) _h = 640;

			if ( $(window).width() < _w ) _w = $(window).width() - 20;
			if ( $(window).height() < _h ) _h = $(window).width();

			var _option = new Array();

			_option.width	= _w;
			_option.height	= _h;

			bootbox.dialog({
				title: title,
				message:html,
				onShow : function(){
					var initModalHeight	 = _option.height + 60;
					var userScreenHeight = $( window ).height();

					if (initModalHeight > userScreenHeight)
						$('.modal-dialog').css('overflow', 'auto');
					else {
						$('.modal-dialog').css('margin-top', (userScreenHeight / 2) - (initModalHeight/2));
					}

					$('.bootbox-body').css({width : '100%', height : '100%'});
					$('.modal-body').css({width : _w, height : _h, 'overflow':'auto'});

					$.Evt('modal.show').publish();

					return false;
				},
				onEscape : function(){
					$('body').css('overflow', 'auto');
					$.Evt('modal.close').publish();
				}
			});

			$('body').css('overflow', 'hidden');
		},

        show : function(title, _url, _w, _h) {

			var content = $('<iframe>', { src : _url,
				frameborder	: 0, css : {'border' : 0, 'width' : '100%', 'height' : '100%'}
			});

			var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

			if (!_w) _w = 640;
			if (!_h) _h = 640;

			var _option = new Array();

			_option.width	= _w;
			_option.height	= _h;

			bootbox.dialog({
				title: title,
				message:content,
				onShow : function(){
					var initModalHeight	 = _option.height + 60;
					var userScreenHeight = $( window ).height();

					if (initModalHeight > userScreenHeight)
						$('.modal-dialog').css('overflow', 'auto');
					else {
						$('.modal-dialog').css('margin-top', (userScreenHeight / 2) - (initModalHeight/2));
					}

					$('.bootbox-body').css({width : '100%', height : '100%'});
					$('.modal-body').css({width : _w, height : _h, 'overflow':'auto'});

					if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {
						content.wrap(function() {
							var $this = $(this);

							return $('<div />',{
									'class' : 'overflow-scrolling',
									'css' : {'width': 'auto','height': _h}
								}
							);
						});
					}

					$.Evt('modal.show').publish();

					return false;
				},
				onEscape : function(){
					$('body').css('overflow', 'auto');
					$.Evt('modal.close').publish();
				}
			});


			$('body').css('overflow', 'hidden');
        },
    }}
());


*/