function onPlayerStateChange() {
	1==player.getPlayerState()?(jQuery("#play").find(".purdue_video_controls_pause_share_play_border").find(".fa-pause").removeClass("hidden"), jQuery("#play").find(".purdue_video_controls_pause_share_play_border").find(".fa-play").addClass("hidden"), time_elapsed=setInterval(function() {
		var e=new Date(null);
		e.setSeconds(player.getCurrentTime());
		var t=e.toISOString().substr(11, 8);
		jQuery(".purdue_video_controls_black_elapsed").text(t);
		var o=100*player.getCurrentTime()/player.getDuration();
		o+="%", jQuery(".purdue_video_controls_black_timeline").find(".time_elapsed").css("width", o)
	}
	, 300), state=1):(clearInterval(time_elapsed), time_elapsed=0, jQuery("#play").find(".purdue_video_controls_pause_share_play_border").find(".fa-pause").addClass("hidden"), jQuery("#play").find(".purdue_video_controls_pause_share_play_border").find(".fa-play").removeClass("hidden"), state=0)
}

function onPlayerReady(e) {
	var t=new Date(null);
	t.setSeconds(player.getDuration());
	var o=t.toISOString().substr(11, 8);
	jQuery(".purdue_video_controls_black_total").text(o),
	jQuery(".purdue_video_controls_black_elapsed").text("00:00:00"),
	jQuery("#play").on("click", function() {
		0==state?(player.playVideo(), jQuery(this).find(".purdue_video_controls_pause_share_play_border").find(".fa-pause").removeClass("hidden"), jQuery(this).find(".purdue_video_controls_pause_share_play_border").find(".fa-play").addClass("hidden"), state=1): (player.pauseVideo(), jQuery(this).find(".purdue_video_controls_pause_share_play_border").find(".fa-pause").addClass("hidden"), jQuery(this).find(".purdue_video_controls_pause_share_play_border").find(".fa-play").removeClass("hidden"), state=0)
	}
	),
	jQuery(".purdue_video_controls_black_volume").on("click", function() {
		player.isMuted()?(player.unMute(), jQuery(".purdue_video_controls_black_volume").find(".fa-volume-mute").addClass("hidden"), jQuery(".purdue_video_controls_black_volume").find(".fa-volume-up").removeClass("hidden")): (player.mute(), jQuery(".purdue_video_controls_black_volume").find(".fa-volume-mute").removeClass("hidden"), jQuery(".purdue_video_controls_black_volume").find(".fa-volume-up").addClass("hidden"))
	}
	),
	jQuery(".purdue_video_controls_black_fullscreen").click(function() {
		var e=document.getElementById("player");
		e.requestFullscreen?e.requestFullscreen(): e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen()
	}
	),
	jQuery(".purdue_video_controls_black_timeline").on("mouseup touchend", function(e) {
		var t=jQuery(".purdue_video_controls_black_timeline").offset(), o=e.clientX, a=Math.round(o-t.left), n=Math.round(a*player.getDuration()/jQuery(".purdue_video_controls_black_timeline").width());
		jQuery(".purdue_video_controls_black_timeline").find(".time_elapsed").css("width", a), player.seekTo(n)
	}
	),
	jQuery(".purdue_video_controls_pause_share_share").click(function() {
		jQuery(".modal").addClass("is-active"), selectText("share_text")
	}
	),
	jQuery(".modal").find(".modal-close").click(function() {
		jQuery(".modal").removeClass("is-active")
	}
	),
	jQuery(".modal").find(".modal-background").click(function() {
		jQuery(".modal").removeClass("is-active")
	}
	)
}

function selectText(e) {
	if(e=document.getElementById(e), document.body.createTextRange) {
		const t=document.body.createTextRange();
		t.moveToElementText(e),
		t.select()
	}
	else if(window.getSelection) {
		const o=window.getSelection(),
		t=document.createRange();
		t.selectNodeContents(e),
		o.removeAllRanges(),
		o.addRange(t)
	}
	else console.warn("Could not select text in node: Unsupported browser.")
}

function showModal(e) {
	document.getElementById(e).style.display="flex"
}

function closeModal(e) {
	document.getElementById(e).style.display="none"
}

if(jQuery("#player").length>0) {
	var player,
	state=0,
	time_elapsed,
	tag=document.createElement("script");
	tag.src="https://www.youtube.com/player_api";
	var firstScriptTag=document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    let checkYT = setInterval(function () {
        if(typeof YT !== 'undefined'&&YT.loaded){
             player=new YT.Player( "player", {
                events: { 
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange 
                }
            });             
           clearInterval(checkYT);
        }
    }, 100);
    checkYT;
}
