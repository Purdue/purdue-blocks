const largeStory=[...document.querySelectorAll(".pu-large-image")]
const wH=window.innerHeight;
window.addEventListener('scroll', () => {
    if(largeStory&&largeStory.length>0){
        largeStory.forEach((t)=>{
            const thisTop = t.getBoundingClientRect().top;
            if(thisTop<=wH*0.5){
                t.classList.add('animate')
            }
        })
    }
})
//Lightbox 
let lightboxPlayers=[]
if(largeStory&&largeStory.length>0){
    largeStory.forEach((t)=>{
        const button = t.querySelector(".pu-lightbox-button");
        if(button){
            const lightbox = t.querySelector(".pu-lightbox");
            button.addEventListener("click", ()=>{
                lightbox.classList.add("modal-open")
                const window = document.querySelector('html')         
                window.classList.add('no-scroll-page')
            })
        }
        const closeButton = t.querySelector('.modal--close-button');
        const video = t.querySelector('video')
        if(video){
            closeButton.addEventListener("click", ()=>{
                video.pause();
            })
        }
        const youtube=t.querySelector('.pu-lightbox-youtube')
        if(youtube){
            let url="https://www.youtube.com/player_api"
            if(document.querySelectorAll(`script[src="${url}"]`).length === 0){
                let tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                let firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
            if(youtube.src.indexOf("enablejsapi=1")===-1){
                youtube.src=youtube.src+"?enablejsapi=1"
            }
            let checkYT = setInterval(function () {
                if(typeof YT !== 'undefined'&&YT.loaded){
                     let lightboxPlayer=new YT.Player( youtube.id, {
                        events: { 
                            'onReady': function(e){
                                closeButton.addEventListener("click", ()=>{
                                    lightboxPlayer.pauseVideo()
                                })                              
                            }
                        }
                    });   
                    lightboxPlayers.push({
                        "id" :youtube.id,
                        "player" : lightboxPlayer
                    });          
                   clearInterval(checkYT);
                }
            }, 100);
            checkYT;
        }
        //close modal code in profile-gallery block        
    })
}

