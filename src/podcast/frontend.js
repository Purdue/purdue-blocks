import { FocusTrap } from "@justpie/focustrap";

document.addEventListener("DOMContentLoaded", function() {
    var podShares=Array.prototype.slice.call(document.querySelectorAll(".purdue_podcast_controls_pause_share_share"), 0);
    const href=window.location.href
    var fbShares=Array.prototype.slice.call(document.querySelectorAll(".facebook_share_button"), 0);
    var inShares=Array.prototype.slice.call(document.querySelectorAll(".instagram_share_button"), 0);
    var twShares=Array.prototype.slice.call(document.querySelectorAll(".twitter_share_button"), 0);
    var emShares=Array.prototype.slice.call(document.querySelectorAll(".email_share_button"), 0);
	let windowContainer = document.querySelector('html');
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
			windowContainer.classList.add('no-scroll-page');
            podShare.nextElementSibling.style.display="flex"
			const focusTrap = new FocusTrap(podShare.nextElementSibling);
        })

		podShare.nextElementSibling.addEventListener('keydown', (e) => {
                    if (e.key !== 'Escape') return;
                    podShare.focus();
					podShare.nextElementSibling.style.display="none";
					windowContainer.classList.remove('no-scroll-page');
                })
    })
    var podcloses=Array.prototype.slice.call(document.querySelectorAll(".podcast-modal-close"), 0);
    podcloses.forEach((podclose)=>{
        podclose.addEventListener('click',()=>{
            podclose.parentElement.style.display="none"
			podclose.parentElement.querySelector(".purdue_podcast_controls_pause_share_share").focus();
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
		audio=o.querySelector("audio"),
		play=o.querySelector("#play"),
		timeline=o.querySelector(".purdue_podcast_controls_black_timeline"),
		speed=o.querySelector(".pcast-speed"),
		volume=o.querySelector(".purdue_podcast_controls_black_volume"),
		elapsed=o.querySelector(".purdue_podcast_controls_black_elapsed"),
		total=o.querySelector(".purdue_podcast_controls_black_total"),
		c=0,
		timeElapsedStatus=o.querySelector(".purdue_podcast_black_status_eplayed"),
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
		audio.addEventListener("loadedmetadata", function() {
			total.textContent=p(audio.duration)
		}
		),
		audio.addEventListener("timeupdate", function() {
			timeline.querySelector(".time_elapsed").style.width=100*audio.currentTime/audio.duration+"%", elapsed.textContent=p(audio.currentTime)
		}
		),
		audio.addEventListener("ended", function() {
			play.querySelector(".fa-pause").style.display="none", play.querySelector(".fa-play").style.display="block", play.setAttribute("aria-label", "Play Audio"), audio.pause(), audio.currentTime=0, timeline.querySelector(".time_elapsed").style.width=0, elapsed.textContent="00:00:00", document.getElementById("podcast-status").textContent="NOW PAUSED", timeElapsedStatus.textContent="Audio ended at "+p(audio.duration)
		}	
		),
		play.addEventListener("click", function() {
			0==audio.paused?(this.querySelector(".fa-pause").style.display="none", this.querySelector(".fa-play").style.display="block", this.setAttribute("aria-label", "Play Audio"), audio.pause()): (this.querySelector(".fa-play").style.display="none", this.querySelector(".fa-pause").style.display="block", this.setAttribute("aria-label", "Pause Audio"), audio.play())

			0==audio.paused?document.getElementById("podcast-status").textContent="NOW PLAYING": document.getElementById("podcast-status").textContent="NOW PAUSED"

			0==audio.paused?timeElapsedStatus.textContent="Audio playing at "+p(audio.currentTime): timeElapsedStatus.textContent="Audio paused at "+p(audio.currentTime)

		}
		, !1),
		timeline.addEventListener("click", function(e) {
			audio.currentTime=Math.floor(audio.duration)*(e.offsetX/timeline.offsetWidth), this.querySelector(".time_elapsed").style.width=100*audio.currentTime/audio.duration+"%";

			timeElapsedStatus.textContent=""+p(audio.currentTime);
		}
		, !1),
		speed.addEventListener("click", function() {
			return c=c+1<t.length?c+1: 0, audio.playbackRate=t[c], this.textContent=t[c]+"x", this.setAttribute("aria-label", "Playback speed, currently "+t[c]+"x"), !0
		}
		, !1),
		volume.addEventListener("click", function() {
			audio.muted?(audio.muted=!1, this.querySelector(".podcast-volume").classList.remove("fa-volume-off"), this.querySelector(".podcast-volume").classList.add("fa-volume-up")): (audio.muted=!0, this.querySelector(".podcast-volume").classList.remove("fa-volume-up"), this.querySelector(".podcast-volume").classList.add("fa-volume-off"))
		}
		, !1)
	}
}

(),

(window, document);