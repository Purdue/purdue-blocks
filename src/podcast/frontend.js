document.addEventListener("DOMContentLoaded", function() {
    var podShares=Array.prototype.slice.call(document.querySelectorAll(".purdue_podcast_controls_pause_share_share"), 0);
    const href=window.location.href
    var fbShares=Array.prototype.slice.call(document.querySelectorAll(".facebook_share_button"), 0);
    var inShares=Array.prototype.slice.call(document.querySelectorAll(".instagram_share_button"), 0);
    var twShares=Array.prototype.slice.call(document.querySelectorAll(".twitter_share_button"), 0);
    var emShares=Array.prototype.slice.call(document.querySelectorAll(".email_share_button"), 0);
    fbShares.forEach((fbShare)=>{
        fbShare.href='https://www.facebook.com/sharer/sharer.php?u='+href
    })
    inShares.forEach((inShare)=>{
        inShare.href='https://www.linkedin.com/sharing/share-offsite/?url='+href
    })
    twShares.forEach((twShare)=>{
        twShare.href='https://twitter.com/intent/tweet?text=%20'+href
    })
    emShares.forEach((emShare)=>{
        emShare.href='mailto:?subject=&body='+href
    })
    podShares.forEach((podShare)=>{
        podShare.addEventListener('click',()=>{
            podShare.nextElementSibling.style.display="flex"
        })
    })
    var podcloses=Array.prototype.slice.call(document.querySelectorAll(".podcast-modal-close"), 0);
    podcloses.forEach((podclose)=>{
        podclose.addEventListener('click',()=>{
            podclose.parentElement.style.display="none"
        })
    })
}
);
jQuery(".purdue_podcast_episode_player").length>0&&function() {
	var e=document.querySelectorAll(".purdue_podcast_episode_player"),
	t=[1,
	1.5,
	1.75,
	2,
	2.5];
	for(let i=0;
	i<e.length;
	i++) {
		var o=e[i],
		a=o.querySelector("audio"),
		n=o.querySelector("#play"),
		r=o.querySelector(".purdue_podcast_controls_black_timeline"),
		s=o.querySelector(".pcast-speed"),
		l=o.querySelector(".purdue_podcast_controls_black_volume"),
		d=o.querySelector(".purdue_podcast_controls_black_elapsed"),
		u=o.querySelector(".purdue_podcast_controls_black_total"),
		c=0,
		p=function(e) {
			var t=parseInt(e, 10),
			o=Math.floor(t/3600),
			a=Math.floor((t-3600*o)/60),
			n=t-3600*o-60*a;
			return o<10&&(o="0"+o),
			a<10&&(a="0"+a),
			n<10&&(n="0"+n),
			o+":"+a+":"+n
		}
		;
		a.addEventListener("loadedmetadata", function() {
			u.textContent=p(a.duration)
		}
		),
		a.addEventListener("timeupdate", function() {
			r.querySelector(".time_elapsed").style.width=100*a.currentTime/a.duration+"%", d.textContent=p(a.currentTime)
		}
		),
		n.addEventListener("click", function() {
			0==a.paused?(this.querySelector(".fa-pause").style.display="none", this.querySelector(".fa-play").style.display="block", a.pause()): (this.querySelector(".fa-play").style.display="none", this.querySelector(".fa-pause").style.display="block", a.play())
		}
		, !1),
		r.addEventListener("click", function(e) {
			a.currentTime=Math.floor(a.duration)*(e.offsetX/r.offsetWidth), this.querySelector(".time_elapsed").style.width=100*a.currentTime/a.duration+"%"
		}
		, !1),
		s.addEventListener("click", function() {
			return c=c+1<t.length?c+1: 0, a.playbackRate=t[c], this.textContent=t[c]+"x", !0
		}
		, !1),
		l.addEventListener("click", function() {
			a.muted?(a.muted=!1, this.querySelector(".podcast-volume").classList.remove("fa-volume-off"), this.querySelector(".podcast-volume").classList.add("fa-volume-up")): (a.muted=!0, this.querySelector(".podcast-volume").classList.remove("fa-volume-up"), this.querySelector(".podcast-volume").classList.add("fa-volume-off"))
		}
		, !1)
	}
}

(),
function(e, t, o) {
	function a(e) {
		var t=x.className,
		o=k._config.classPrefix||"";
		if(C&&(t=t.baseVal), k._config.enableJSClass) {
			var a=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");
			t=t.replace(a, "$1"+o+"js$2")
		}
		k._config.enableClasses&&(t+=" "+o+e.join(" "+o), C?x.className.baseVal=t:x.className=t)
	}
	function n(e, t) {
		return typeof e===t
	}
	function r() {
		var e,
		t,
		o,
		a,
		r,
		i,
		s;
		for(var l in b) {
			if(e=[], t=b[l], t.name&&(e.push(t.name.toLowerCase()), t.options&&t.options.aliases&&t.options.aliases.length))for(o=0;
			o<t.options.aliases.length;
			o++)e.push(t.options.aliases[o].toLowerCase());
			for(a=n(t.fn, "function")?t.fn(): t.fn, r=0;
			r<e.length;
			r++)i=e[r],
			s=i.split("."),
			1===s.length?k[s[0]]=a: (!k[s[0]]||k[s[0]]instanceof Boolean||(k[s[0]]=new Boolean(k[s[0]])), k[s[0]][s[1]]=a), g.push((a?"":"no-")+s.join("-"))
		}
	}
	function i() {
		return"function"!=typeof t.createElement?t.createElement(arguments[0]): C?t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]):t.createElement.apply(t, arguments)
	}
	function s(e, t) {
		if("object"==typeof e)for(var o in e)L(e, o)&&s(o, e[o]);
		else {
			e=e.toLowerCase();
			var n=e.split("."),
			r=k[n[0]];
			if(2==n.length&&(r=r[n[1]]), void 0!==r)return k;
			t="function"==typeof t?t(): t, 1==n.length?k[n[0]]=t:(!k[n[0]]||k[n[0]]instanceof Boolean||(k[n[0]]=new Boolean(k[n[0]])), k[n[0]][n[1]]=t), a([(t&&0!=t?"":"no-")+n.join("-")]), k._trigger(e, t)
		}
		return k
	}
	function l(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, t, o) {
			return t+o.toUpperCase()
		}
		).replace(/^-/, "")
	}
	function d(e, t) {
		return!!~(""+e).indexOf(t)
	}
	function u() {
		var e=t.body;
		return e||(e=i(C?"svg": "body"), e.fake=!0), e
	}
	function c(e, o, a, n) {
		var r,
		s,
		l,
		d,
		c="modernizr",
		p=i("div"),
		f=u();
		if(parseInt(a, 10))for(;
		a--;
		)l=i("div"),
		l.id=n?n[a]: c+(a+1), p.appendChild(l);
		return r=i("style"),
		r.type="text/css",
		r.id="s"+c,
		(f.fake?f: p).appendChild(r), f.appendChild(p), r.styleSheet?r.styleSheet.cssText=e:r.appendChild(t.createTextNode(e)), p.id=c, f.fake&&(f.style.background="", f.style.overflow="hidden", d=x.style.overflow, x.style.overflow="hidden", x.appendChild(f)), s=o(p, e), f.fake?(f.parentNode.removeChild(f), x.style.overflow=d, x.offsetHeight):p.parentNode.removeChild(p), !!s
	}
	function p(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}
	function f(e, t, o) {
		var a;
		for(var r in e)if(e[r]in t)return!1===o?e[r]: (a=t[e[r]], n(a, "function")?p(a, o||t):a);
		return!1
	}
	function _(e) {
		return e.replace(/([A-Z])/g, function(e, t) {
			return"-"+t.toLowerCase()
		}
		).replace(/^ms-/, "-ms-")
	}
	function m(t, a) {
		var n=t.length;
		if("CSS"in e&&"supports"in e.CSS) {
			for(;
			n--;
			)if(e.CSS.supports(_(t[n]), a))return!0;
			return!1
		}
		if("CSSSupportsRule"in e) {
			for(var r=[];
			n--;
			)r.push("("+_(t[n])+":"+a+")");
			return r=r.join(" or "),
			c("@supports ("+r+") { #modernizr { position: absolute; } }", function(e) {
				return"absolute"==getComputedStyle(e, null).position
			}
			)
		}
		return o
	}
	function h(e, t, a, r) {
		function s() {
			c&&(delete H.style, delete H.modElem)
		}
		if(r=!n(r, "undefined")&&r, !n(a, "undefined")) {
			var u=m(e, a);
			if(!n(u, "undefined"))return u
		}
		for(var c, p, f, _, h, v=["modernizr", "tspan"];
		!H.style;
		)c=!0,
		H.modElem=i(v.shift()),
		H.style=H.modElem.style;
		for(f=e.length, p=0;
		f>p;
		p++)if(_=e[p], h=H.style[_], d(_, "-")&&(_=l(_)), H.style[_]!==o) {
			if(r||n(a, "undefined"))return s(),
			"pfx"!=t||_;
			try {
				H.style[_]=a
			}
			catch(e) {}
			if(H.style[_]!=h)return s(),
			"pfx"!=t||_
		}
		return s(),
		!1
	}
	function v(e, t, o, a, r) {
		var i=e.charAt(0).toUpperCase()+e.slice(1),
		s=(e+" "+z.join(i+" ")+i).split(" ");
		return n(t, "string")||n(t, "undefined")?h(s, t, a, r): (s=(e+" "+A.join(i+" ")+i).split(" "), f(s, t, o))
	}
	function y(e, t, a) {
		return v(e, o, o, t, a)
	}
	var g=[],
	b=[],
	w= {
		_version:"3.0.0",
		_config: {
			classPrefix: "", enableClasses:!0, enableJSClass:!0, usePrefixes:!0
		}
		,
		_q:[],
		on:function(e, t) {
			var o=this;
			setTimeout(function() {
				t(o[e])
			}
			, 0)
		}
		,
		addTest:function(e, t, o) {
			b.push( {
				name: e, fn:t, options:o
			}
			)
		}
		,
		addAsyncTest:function(e) {
			b.push( {
				name: null, fn:e
			}
			)
		}
	}
	,
	k=function() {}
	;
	k.prototype=w,
	k=new k,
	k.addTest("cookies", function() {
		try {
			t.cookie="cookietest=1";
			var e=-1!=t.cookie.indexOf("cookietest=");
			return t.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
		}
		catch(e) {
			return!1
		}
	}
	),
	k.addTest("ie8compat", !e.addEventListener&&!!t.documentMode&&7===t.documentMode),
	k.addTest("serviceworker", "serviceWorker"in navigator),
	k.addTest("svg", !!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect),
	k.addTest("websockets", "WebSocket"in e&&2===e.WebSocket.CLOSING);
	var x=t.documentElement,
	C="svg"===x.nodeName.toLowerCase();
	k.addTest("canvas", function() {
		var e=i("canvas");
		return!(!e.getContext||!e.getContext("2d"))
	}
	),
	k.addTest("canvastext", function() {
		return!1!==k.canvas&&"function"==typeof i("canvas").getContext("2d").fillText
	}
	);
	var T=i("input"),
	S="search tel url email datetime date month week time datetime-local number range color".split(" "),
	j= {}
	;
	k.inputtypes=function(e) {
		for(var a, n, r, i=e.length, s=":)", l=0;
		i>l;
		l++)T.setAttribute("type", a=e[l]),
		r="text"!==T.type&&"style"in T,
		r&&(T.value=s, T.style.cssText="position:absolute;visibility:hidden;", /^range$/.test(a)&&T.style.WebkitAppearance!==o?(x.appendChild(T), n=t.defaultView, r=n.getComputedStyle&&"textfield"!==n.getComputedStyle(T, null).WebkitAppearance&&0!==T.offsetHeight, x.removeChild(T)): /^(search|tel)$/.test(a)||(r=/^(url|email|number)$/.test(a)?T.checkValidity&&!1===T.checkValidity():T.value!=s)), j[e[l]]=!!r;
		return j
	}
	(S),
	k.addTest("userdata", !!i("div").addBehavior),
	k.addTest("video", function() {
		var e=i("video"), t=!1;
		try {
			(t=!!e.canPlayType)&&(t=new Boolean(t), t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
		}
		catch(e) {}
		return t
	}
	),
 k.addTest("rgba", function() {
		var e=i("a").style;
		return e.cssText="background-color:rgba(150,255,150,.5)", (""+e.backgroundColor).indexOf("rgba")>-1
	}
	), k.addTest("placeholder", "placeholder"in i("input")&&"placeholder"in i("textarea")), k.addTest("inlinesvg", function() {
		var e=i("div");
		return e.innerHTML="<svg/>", "http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)
	}
	);
	var E=function(e) {
		function o(t, o) {
			var n;
			return!!t&&(o&&"string"!=typeof o||(o=i(o||"div")), t="on"+t, n=t in o, !n&&a&&(o.setAttribute||(o=i("div")), o.setAttribute(t, ""), n="function"==typeof o[t], o[t]!==e&&(o[t]=e), o.removeAttribute(t)), n)
		}
		var a=!("onblur"in t.documentElement);
		return o
	}
	();
	w.hasEvent=E, k.addTest("ambientlight", E("devicelight", e)), k.addTest("inputsearchevent", E("search"));
	var q=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];
	w._prefixes=q, k.addTest("csscalc", function() {
		var e="width:", t=i("a");
		return t.style.cssText=e+q.join("calc(10px);"+e), !!t.style.length
	}
	), k.addTest("cssgradients", function() {
		var e="background-image:", t="linear-gradient(left top,#9f9, white);", o=e+q.join(t+e).slice(0, -e.length);
		k._config.usePrefixes&&(o+=e+"-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");
		var a=i("a"), n=a.style;
		return n.cssText=o, (""+n.backgroundImage).indexOf("gradient")>-1
	}
	), k.addTest("opacity", function() {
		var e=i("a").style;
		return e.cssText=q.join("opacity:.55;"), /^0.55$/.test(e.opacity)
	}
	);
	var Q="CSS"in e&&"supports"in e.CSS, P="supportsCSS"in e;
	k.addTest("supports", Q||P);
	var L;
	!function() {
		var e= {}
		.hasOwnProperty;
		L=n(e, "undefined")||n(e.call, "undefined")?function(e, t) {
			return t in e&&n(e.constructor.prototype[t], "undefined")
		}
		:function(t, o) {
			return e.call(t, o)
		}
	}
	(), w._l= {}
	, w.on=function(e, t) {
		this._l[e]||(this._l[e]=[]), this._l[e].push(t), k.hasOwnProperty(e)&&setTimeout(function() {
			k._trigger(e, k[e])
		}
		, 0)
	}
	, w._trigger=function(e, t) {
		if(this._l[e]) {
			var o=this._l[e];
			setTimeout(function() {
				var e;
				for(e=0;
				e<o.length;
				e++)(0, o[e])(t)
			}
			, 0), delete this._l[e]
		}
	}
	, k._q.push(function() {
		w.addTest=s
	}
	), k.addTest("svgasimg", t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"));
	var R="Moz O ms Webkit", z=w._config.usePrefixes?R.split(" "):[];
	w._cssomPrefixes=z;
	var B=function(t) {
		var a, n=q.length, r=e.CSSRule;
		if(void 0===r)return o;
		if(!t)return!1;
		if(t=t.replace(/^@/, ""), (a=t.replace(/-/g, "_").toUpperCase()+"_RULE")in r)return"@"+t;
		for(var i=0;
		n>i;
		i++) {
			var s=q[i];
			if(s.toUpperCase()+"_"+a in r)return"@-"+s.toLowerCase()+"-"+t
		}
		return!1
	}
	;
	w.atRule=B;
	var A=w._config.usePrefixes?R.toLowerCase().split(" "):[];
	w._domPrefixes=A;
	var M=w.testStyles=c;
	k.addTest("touchevents", function() {
		var o;
		if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)o=!0;
		else {
			var a=["@media (", q.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			M(a, function(e) {
				o=9===e.offsetTop
			}
			)
		}
		return o
	}
	), k.addTest("checked", function() {
		return M("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(e) {
			var t=i("input");
			return t.setAttribute("type", "checkbox"), t.setAttribute("checked", "checked"), e.appendChild(t), 20===t.offsetLeft
		}
		)
	}
	), M("#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}", function(e) {
		var t, o=e.childNodes;
		t=o[0].offsetLeft<o[1].offsetLeft, k.addTest("displaytable", t, {
			aliases: ["display-table"]
		}
		)
	}
	, 2), function() {
		var e=navigator.userAgent, t=e.match(/applewebkit\/([0-9]+)/gi)&&parseFloat(RegExp.$1), o=e.match(/w(eb)?osbrowser/gi), a=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9, n=533>t&&e.match(/android/gi);
		return o||n||a
	}
	()?k.addTest("fontface", !1):M('@font-face {font-family:"font";src:url("https://")}', function(e, o) {
		var a=t.getElementById("smodernizr"), n=a.sheet||a.styleSheet, r=n?n.cssRules&&n.cssRules[0]?n.cssRules[0].cssText: n.cssText||"":"", i=/src/i.test(r)&&0===r.indexOf(o.split(" ")[0]);
		k.addTest("fontface", i)
	}
	), k.addTest("cssinvalid", function() {
		return M("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}", function(e) {
			var t=i("input");
			return t.required=!0, e.appendChild(t), t.clientWidth>10
		}
		)
	}
	), M("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(e) {
		k.addTest("lastchild", e.lastChild.offsetWidth>e.firstChild.offsetWidth)
	}
	, 2), M("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(e) {
		k.addTest("nthchild", function() {
			for(var t=e.getElementsByTagName("div"), o=!0, a=0;
			5>a;
			a++)o=o&&t[a].offsetWidth===a%2+1;
			return o
		}
		)
	}
	, 5);
	var I=function() {
		var t=e.matchMedia||e.msMatchMedia;
		return t?function(e) {
			var o=t(e);
			return o&&o.matches||!1
		}
		:function(t) {
			var o=!1;
			return c("@media "+t+" { #modernizr { position: absolute; } }", function(t) {
				o="absolute"==(e.getComputedStyle?e.getComputedStyle(t, null): t.currentStyle).position
			}
			), o
		}
	}
	();
	w.mq=I, k.addTest("mediaqueries", I("only all"));
	var N= {
		elem: i("modernizr")
	}
	;
	k._q.push(function() {
		delete N.elem
	}
	);
	var H= {
		style: N.elem.style
	}
	;
	k._q.unshift(function() {
		delete H.style
	}
	);
	var O=w.testProp=function(e, t, a) {
		return h([e], o, t, a)
	}
	;
	k.addTest("textshadow", O("textShadow", "1px 1px")), w.testAllProps=v, w.testAllProps=y, k.addTest("bgpositionxy", function() {
		return y("backgroundPositionX", "3px", !0)&&y("backgroundPositionY", "5px", !0)
	}
	), k.addTest("backgroundsize", y("backgroundSize", "100%", !0)), k.addTest("bgsizecover", y("backgroundSize", "cover")), k.addTest("borderimage", y("borderImage", "url() 1", !0)), k.addTest("borderradius", y("borderRadius", "0px", !0)), k.addTest("boxshadow", y("boxShadow", "1px 1px", !0)), k.addTest("boxsizing", y("boxSizing", "border-box", !0)&&(t.documentMode===o||t.documentMode>7)), k.addTest("flexbox", y("flexBasis", "1px", !0)), k.addTest("flexboxlegacy", y("boxDirection", "reverse", !0)), k.addTest("flexboxtweener", y("flexAlign", "end", !0)), k.addTest("flexwrap", y("flexWrap", "wrap", !0)), k.addAsyncTest(function() {
		function o() {
			function n() {
				try {
					var e=i("div"), o=i("span"), a=e.style, n=0, r=0, s=!1, l=t.body.firstElementChild||t.body.firstChild;
					return e.appendChild(o), o.innerHTML="Bacon ipsum dolor sit amet jerky velit in culpa hamburger et. Laborum dolor proident, enim dolore duis commodo et strip steak. Salami anim et, veniam consectetur dolore qui tenderloin jowl velit sirloin. Et ad culpa, fatback cillum jowl ball tip ham hock nulla short ribs pariatur aute. Pig pancetta ham bresaola, ut boudin nostrud commodo flank esse cow tongue culpa. Pork belly bresaola enim pig, ea consectetur nisi. Fugiat officia turkey, ea cow jowl pariatur ullamco proident do laborum velit sausage. Magna biltong sint tri-tip commodo sed bacon, esse proident aliquip. Ullamco ham sint fugiat, velit in enim sed mollit nulla cow ut adipisicing nostrud consectetur. Proident dolore beef ribs, laborum nostrud meatball ea laboris rump cupidatat labore culpa. Shankle minim beef, velit sint cupidatat fugiat tenderloin pig et ball tip. Ut cow fatback salami, bacon ball tip et in shank strip steak bresaola. In ut pork belly sed mollit tri-tip magna culpa veniam, short ribs qui in andouille ham consequat. Dolore bacon t-bone, velit short ribs enim strip steak nulla. Voluptate labore ut, biltong swine irure jerky. Cupidatat excepteur aliquip salami dolore. Ball tip strip steak in pork dolor. Ad in esse biltong. Dolore tenderloin exercitation ad pork loin t-bone, dolore in chicken ball tip qui pig. Ut culpa tongue, sint ribeye dolore ex shank voluptate hamburger. Jowl et tempor, boudin pork chop labore ham hock drumstick consectetur tri-tip elit swine meatball chicken ground round. Proident shankle mollit dolore. Shoulder ut duis t-bone quis reprehenderit. Meatloaf dolore minim strip steak, laboris ea aute bacon beef ribs elit shank in veniam drumstick qui. Ex laboris meatball cow tongue pork belly. Ea ball tip reprehenderit pig, sed fatback boudin dolore flank aliquip laboris eu quis. Beef ribs duis beef, cow corned beef adipisicing commodo nisi deserunt exercitation. Cillum dolor t-bone spare ribs, ham hock est sirloin. Brisket irure meatloaf in, boudin pork belly sirloin ball tip. Sirloin sint irure nisi nostrud aliqua. Nostrud nulla aute, enim officia culpa ham hock. Aliqua reprehenderit dolore sunt nostrud sausage, ea boudin pork loin ut t-bone ham tempor. Tri-tip et pancetta drumstick laborum. Ham hock magna do nostrud in proident. Ex ground round fatback, venison non ribeye in.", t.body.insertBefore(e, l), a.cssText="position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;", n=o.offsetHeight, r=o.offsetWidth, a.cssText="position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;"+q.join("hyphens:auto; "), s=o.offsetHeight!=n||o.offsetWidth!=r, t.body.removeChild(e), e.removeChild(o), s
				}
				catch(e) {
					return!1
				}
			}
			function r(e, o) {
				try {
					var a=i("div"), n=i("span"), r=a.style, s=0, l=!1, d=!1, u=!1, c=t.body.firstElementChild||t.body.firstChild;
					return r.cssText="position:absolute;top:0;left:0;overflow:visible;width:1.25em;", a.appendChild(n), t.body.insertBefore(a, c), n.innerHTML="mm", s=n.offsetHeight, n.innerHTML="m"+e+"m", d=n.offsetHeight>s, o?(n.innerHTML="m<br />m", s=n.offsetWidth, n.innerHTML="m"+e+"m", u=n.offsetWidth>s): u=!0, !0===d&&!0===u&&(l=!0), t.body.removeChild(a), a.removeChild(n), l
				}
				catch(e) {
					return!1
				}
			}
			function l(o) {
				try {
					var a, n=i("input"), r=i("div"), s="lebowski", l=!1, d=t.body.firstElementChild||t.body.firstChild;
					if(r.innerHTML=s+o+s, t.body.insertBefore(r, d), t.body.insertBefore(n, r), n.setSelectionRange?(n.focus(), n.setSelectionRange(0, 0)): n.createTextRange&&(a=n.createTextRange(), a.collapse(!0), a.moveEnd("character", 0), a.moveStart("character", 0), a.select()), e.find)l=e.find(s+s);
					else try {
						a=e.self.document.body.createTextRange(), l=a.findText(s+s)
					}
					catch(e) {
						l=!1
					}
					return t.body.removeChild(r), t.body.removeChild(n), l
				}
				catch(e) {
					return!1
				}
			}
			return t.body||t.getElementsByTagName("body")[0]?(s("csshyphens", function() {
				if(!y("hyphens", "auto", !0))return!1;
				try {
					return n()
				}
				catch(e) {
					return!1
				}
			}
			), s("softhyphens", function() {
				try {
					return r("­", !0)&&r("​", !1)
				}
				catch(e) {
					return!1
				}
			}
			), void s("softhyphensfind", function() {
				try {
					return l("­")&&l("​")
				}
				catch(e) {
					return!1
				}
			}
			)):void setTimeout(o, a)
		}
		var a=300;
		setTimeout(o, a)
	}
	), k.addTest("csstransforms", function() {
		return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform", "scale(1)", !0)
	}
	), k.addTest("csstransforms3d", function() {
		var e=!!y("perspective", "1px", !0), t=k._config.usePrefixes;
		if(e&&(!t||"webkitPerspective"in x.style)) {
			var o;
			k.supports?o="@supports (perspective: 1px)":(o="@media (transform-3d)", t&&(o+=",(-webkit-transform-3d)")), o+="{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}", M(o, function(t) {
				e=9===t.offsetLeft&&5===t.offsetHeight
			}
			)
		}
		return e
	}
	), k.addTest("preserve3d", y("transformStyle", "preserve-3d")), k.addTest("csstransitions", y("transition", "all", !0));
	var W=w.prefixed=function(e, t, o) {
		return 0===e.indexOf("@")?B(e): (-1!=e.indexOf("-")&&(e=l(e)), t?v(e, t, o):v(e, "pfx"))
	}
	;
	k.addTest("objectfit", !!W("objectFit"), {
		aliases: ["object-fit"]
	}
	), r(), a(g), delete w.addTest, delete w.addAsyncTest;
	for(var D=0;
	D<k._q.length;
	D++)k._q[D]();
	e.Modernizr=k
}

(window, document);