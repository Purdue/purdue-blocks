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

(window, document);